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

  // ПРАВИЛЬНЫЙ ПУТЬ (относительно корня сайта)
  fetch('/mars-encyclopedia/assets/dictionary.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      lexicon = data.lexicon;
      particles = data.particles;
      suffixes = data.suffixes;
      console.log('Словарь загружен');
      document.getElementById('translation').textContent = 'Словарь загружен! Введите текст для перевода.';
    })
    .catch(error => {
      console.error('Ошибка загрузки словаря:', error);
      document.getElementById('translation').textContent = 'Ошибка: не удалось загрузить словарь. Проверьте, что файл dictionary.json лежит в папке assets/.';
    });

  function translateText() {
    const input = document.getElementById('inputText').value.trim();
    if (!input) {
      document.getElementById('translation').textContent = 'Введите текст для перевода.';
      document.getElementById('gloss').textContent = '';
      return;
    }

    // Разбиваем на слова
    const words = input.split(/\s+/).filter(w => w.length > 0);
    
    let martianWords = [];
    let wordPos = [];
    let unknownWords = [];

    words.forEach(word => {
      // Убираем знаки препинания и приводим к НИЖНЕМУ РЕГИСТРУ
      const clean = word.toLowerCase().replace(/[^а-яa-z]/gi, '');
      if (lexicon[clean]) {
        const entry = lexicon[clean];
        martianWords.push(entry.root);
        wordPos.push(entry.pos);
      } else {
        martianWords.push(word);
        wordPos.push('unknown');
        unknownWords.push(word);
      }
    });

    // Ищем глагол
    let verbIndex = wordPos.indexOf('verb');
    let subject = [];
    let objects = [];
    let verb = '';

    if (verbIndex !== -1) {
      subject = martianWords.slice(0, verbIndex);
      verb = martianWords[verbIndex];
      objects = martianWords.slice(verbIndex + 1);
    } else {
      subject = martianWords;
    }

    // Собираем в порядке SOV
    let resultWords = [];
    if (verb) {
      resultWords = resultWords.concat(subject, objects, verb);
    } else {
      resultWords = martianWords;
    }

    // Отрицание
    if (input.includes('не') || input.includes('нет')) {
      if (verb) {
        const verbPos = resultWords.indexOf(verb);
        if (verbPos !== -1 && verbPos < resultWords.length - 1) {
          resultWords.splice(verbPos + 1, 0, 'ān');
        }
      }
    }

    // Вопрос
    if (input.includes('?')) {
      resultWords.push('kha');
    }

    // Прошедшее время
    if (input.includes('смотрел') || input.includes('помнил') || 
        input.includes('был') || input.includes('была') ||
        input.includes('умирал')) {
      if (verb) {
        const verbPos = resultWords.indexOf(verb);
        if (verbPos !== -1 && verbPos < resultWords.length - 1) {
          resultWords.splice(verbPos + 1, 0, 'nu');
        }
      }
    }

    // Будущее время
    if (input.includes('буду') || input.includes('будет') || input.includes('будут')) {
      if (verb) {
        const verbPos = resultWords.indexOf(verb);
        if (verbPos !== -1 && verbPos < resultWords.length - 1) {
          resultWords.splice(verbPos + 1, 0, 'shu');
        }
      }
    }

    let translation = resultWords.join(' ');

    document.getElementById('translation').textContent = translation;

    // Подстрочник
    let glossText = 'Подстрочник: ' + resultWords.map((w, i) => {
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
