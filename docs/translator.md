---
title: Марсианский переводчик
---

<style>
  .translator-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
  .buttons {
    margin: 15px 0;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .buttons button {
    padding: 10px 20px;
    background: #2a5c8a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  .buttons button:hover {
    background: #1d4370;
  }
  .result {
    margin-top: 20px;
    padding: 15px;
    background: white;
    border-left: 4px solid #2a5c8a;
    border-radius: 4px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .gloss {
    color: #555;
    font-style: italic;
    margin-top: 5px;
    font-size: 14px;
  }
</style>

<div class="translator-container">
  <h2>🌌 Переводчик на марсианский язык</h2>
  <p>Введите текст на русском (слова в начальной форме, предложения простые).</p>
  <textarea id="inputText" placeholder="Например: Марсиане смотрят на звёзды."></textarea>
  <div class="buttons">
    <button onclick="translateText()">Перевести</button>
    <button onclick="clearAll()">Очистить</button>
  </div>
  <div id="output">
    <div class="result" id="translation">Здесь появится перевод...</div>
    <div class="gloss" id="gloss"></div>
  </div>
</div>

<script>
  // Загружаем словарь
  let lexicon = {};
  let particles = {};
  let suffixes = {};

  fetch('/assets/dictionary.json')
    .then(response => response.json())
    .then(data => {
      lexicon = data.lexicon;
      particles = data.particles;
      suffixes = data.suffixes;
      console.log('Словарь загружен');
    })
    .catch(error => {
      console.error('Ошибка загрузки словаря:', error);
      document.getElementById('translation').textContent = 'Не удалось загрузить словарь. Проверьте путь к файлу.';
    });

  // Основная функция перевода
  function translateText() {
    const input = document.getElementById('inputText').value.trim();
    if (!input) {
      document.getElementById('translation').textContent = 'Введите текст для перевода.';
      document.getElementById('gloss').textContent = '';
      return;
    }

    // Простейшая токенизация: разбиваем по пробелам и знакам препинания
    // Для начала будем работать со словами, игнорируя пунктуацию (можно улучшить позже)
    const words = input.split(/\s+/).filter(w => w.length > 0);
    
    // Определяем части речи и ищем корни
    let martianWords = [];
    let wordPos = [];
    let unknownWords = [];

    words.forEach(word => {
      const lower = word.toLowerCase().replace(/[^а-яa-z]/gi, '');
      if (lexicon[lower]) {
        const entry = lexicon[lower];
        martianWords.push(entry.root);
        wordPos.push(entry.pos);
      } else {
        // Если слова нет в словаре, оставляем как есть (или можно обернуть в звёздочки)
        martianWords.push(word);
        wordPos.push('unknown');
        unknownWords.push(word);
      }
    });

    // Теперь начинаем строить марсианское предложение
    // Определим, есть ли глагол (verb) и где он
    let verbIndex = wordPos.indexOf('verb');
    if (verbIndex === -1) {
      // Если глагола нет, возможно, это именное предложение (сущ+сущ)
      // Просто меняем порядок SOV? Но для простоты оставим как есть.
      // Но мы можем попытаться переставить: подлежащее (первое) + остальные + сказуемое (если есть)
      // В именных предложениях сказуемого нет, просто ставим прилагательные после существительных.
      // Пока оставим без перестановки, но позже можно улучшить.
    }

    // Базовая перестановка для SOV: подлежащее (первое слово) + дополнения (все кроме глагола) + глагол (последним)
    // Это очень упрощённо, но для начала сойдёт.
    let subject = [];
    let objects = [];
    let verb = '';

    // Для простоты: если есть глагол, берём его, а всё что до него — подлежащее, всё что после — дополнения
    // Но в русском языке порядок SVO, поэтому подлежащее обычно первое, глагол после него, затем дополнение.
    // Нам нужно: подлежащее + дополнение + глагол.
    // Значит, если verbIndex != -1, то подлежащее — слова до verbIndex, дополнение — слова после verbIndex.
    // Но учтём, что могут быть предлоги и т.д. — упростим.

    if (verbIndex !== -1) {
      subject = martianWords.slice(0, verbIndex);
      verb = martianWords[verbIndex];
      objects = martianWords.slice(verbIndex + 1);
    } else {
      // Нет глагола — просто собираем все слова в порядке SOV? Но без глагола это не имеет смысла.
      // Оставим исходный порядок.
      subject = martianWords;
    }

    // Теперь собираем предложение: subject + objects + verb
    let resultWords = [];
    if (verb) {
      resultWords = resultWords.concat(subject, objects, verb);
    } else {
      resultWords = martianWords; // fallback
    }

    // Применяем суффикс множественного числа к существительным, если в русском тексте было множественное число
    // Мы не определяем число автоматически, поэтому пока пропустим.
    // Но для теста "Марсиане" — это "marzān", где "mar" + "zān". Мы добавим простую эвристику: если слово заканчивается на "е" или "и" (мн.ч.), но это ненадёжно.
    // Можно позже добавить логику.

    // Простой фикс: если в русском тексте есть слово "марсиане", мы заменим на "marzān"? Но это уже есть в словаре?
    // В словаре "марсиане" нет, есть "марсианин"? Нет. Мы можем добавить отдельно.
    // Поэтому пока оставим как есть.

    // Собираем итоговую строку
    let translation = resultWords.join(' ');

    // Добавляем обработку отрицания: если в тексте есть "не" или "нет", ставим "ān" после глагола
    if (input.includes('не') || input.includes('нет')) {
      // Найдём глагол в translation и поставим после него "ān"
      // Это грубо, но для примера
      if (verb) {
        // Найдём позицию глагола в resultWords
        const verbPos = resultWords.indexOf(verb);
        if (verbPos !== -1 && verbPos < resultWords.length - 1) {
          // Вставим "ān" после глагола
          resultWords.splice(verbPos + 1, 0, 'ān');
          translation = resultWords.join(' ');
        }
      }
    }

    // Вопрос: если есть вопросительный знак, добавляем "kha" в конце
    if (input.includes('?')) {
      translation += ' kha';
    }

    // Прошедшее время: если есть слово "был", "была", "смотрел" (окончание -л) — добавить "nu"
    if (input.includes('смотрел') || input.includes('помнил') || input.includes('был') || input.includes('была')) {
      // Найдём глагол и вставим после него "nu"
      if (verb) {
        const verbPos = resultWords.indexOf(verb);
        if (verbPos !== -1 && verbPos < resultWords.length - 1) {
          resultWords.splice(verbPos + 1, 0, 'nu');
          translation = resultWords.join(' ');
        }
      }
    }

    // Будущее время: если есть слово "буду", "будет" и т.д. — добавить "shu" после глагола
    if (input.includes('буду') || input.includes('будет') || input.includes('будут')) {
      if (verb) {
        const verbPos = resultWords.indexOf(verb);
        if (verbPos !== -1 && verbPos < resultWords.length - 1) {
          resultWords.splice(verbPos + 1, 0, 'shu');
          translation = resultWords.join(' ');
        }
      }
    }

    // Выводим результат
    document.getElementById('translation').textContent = translation;

    // Показываем подстрочный перевод (глоссирование) — просто перечисляем слова
    let glossText = 'Подстрочник: ' + resultWords.map((w, i) => {
      // Попробуем найти русский эквивалент в словаре
      for (let key in lexicon) {
        if (lexicon[key].root === w) {
          return key;
        }
      }
      return w;
    }).join(' ');
    document.getElementById('gloss').textContent = glossText;

    if (unknownWords.length > 0) {
      document.getElementById('gloss').textContent += ' (неизвестные: ' + unknownWords.join(', ') + ')';
    }
  }

  function clearAll() {
    document.getElementById('inputText').value = '';
    document.getElementById('translation').textContent = 'Здесь появится перевод...';
    document.getElementById('gloss').textContent = '';
  }
</script>
  function clearAll() {
    document.getElementById('inputText').value = '';
    document.getElementById('translation').textContent = 'Здесь появится перевод...';
    document.getElementById('gloss').textContent = '';
  }
</script>
