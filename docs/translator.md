---
title: Марсианский переводчик
---

<style>
  .translator-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-family: 'Segoe UI', Roboto, sans-serif;
  }
  h2 {
    margin-top: 0;
    color: #1a3b5c;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .hint {
    background: #e4edf7;
    padding: 14px 18px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 14px;
    border-left: 5px solid #2a5c8a;
    line-height: 1.5;
  }
  textarea {
    width: 100%;
    height: 140px;
    padding: 14px;
    font-size: 16px;
    border: 2px solid #ccd7e6;
    border-radius: 8px;
    resize: vertical;
    box-sizing: border-box;
    font-family: inherit;
  }
  textarea:focus {
    border-color: #2a5c8a;
    outline: none;
    box-shadow: 0 0 0 3px rgba(42,92,138,0.2);
  }
  .buttons {
    margin: 18px 0;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .buttons button {
    padding: 12px 28px;
    background: #2a5c8a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s;
  }
  .buttons button:hover {
    background: #1d4370;
    transform: translateY(-1px);
  }
  .buttons button.secondary {
    background: #6c7a8a;
  }
  .buttons button.secondary:hover {
    background: #5a6777;
  }
  #output {
    margin-top: 20px;
  }
  .result {
    padding: 18px 22px;
    background: white;
    border-left: 6px solid #2a5c8a;
    border-radius: 8px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 18px;
    line-height: 1.7;
    min-height: 60px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  }
  .gloss {
    color: #444;
    font-style: italic;
    margin-top: 10px;
    font-size: 14px;
    background: #f0f4f8;
    padding: 10px 16px;
    border-radius: 6px;
    border-left: 3px solid #b0c4de;
  }
  .footer {
    margin-top: 25px;
    font-size: 13px;
    color: #777;
    text-align: center;
    border-top: 1px solid #e0e6ed;
    padding-top: 15px;
  }
  .error {
    color: #c0392b;
  }
</style>

<div class="translator-container">
  <h2>🌌 Переводчик на марсианский язык</h2>
  <div class="hint">
    <strong>Как пользоваться:</strong> Введите предложение на русском. Переводчик сам найдёт правильные формы.
    <br>• Поддерживаются падежи, числа, времена, отрицание, вопросы, модальность.
    <br>• Предлоги игнорируются. Прилагательные ставятся после существительных.
    <br>• <kbd>Ctrl</kbd>+<kbd>Enter</kbd> — быстрый перевод.
  </div>
  <textarea id="inputText" placeholder="Например: Марсиане смотрят на звёзды."></textarea>
  <div class="buttons">
    <button onclick="translateText()">🔄 Перевести</button>
    <button onclick="clearAll()" class="secondary">🗑 Очистить</button>
  </div>
  <div id="output">
    <div class="result" id="translation">Здесь появится перевод...</div>
    <div class="gloss" id="gloss"></div>
  </div>
  <div class="footer">
    Автор языка: <strong>Mnemis</strong> • Вселенная «Письмо из Красной пыли» • Все права защищены
  </div>
</div>

<script>
// ============================================================
// 1. ЗАГРУЗКА СЛОВАРЯ
// ============================================================
let lexicon = {};
let particles = {};
let suffixes = {};

fetch('/mars-encyclopedia/assets/dictionary.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => {
    lexicon = data.lexicon;
    particles = data.particles;
    suffixes = data.suffixes;
    document.getElementById('translation').textContent = '✅ Словарь загружен (' + Object.keys(lexicon).length + ' слов). Введите текст.';
    document.getElementById('translation').className = 'result';
  })
  .catch(error => {
    document.getElementById('translation').textContent = '❌ Ошибка загрузки словаря. Проверьте путь /assets/dictionary.json';
    document.getElementById('translation').className = 'result error';
    console.error(error);
  });

// ============================================================
// 2. ПРОСТАЯ ЛЕММАТИЗАЦИЯ (только нормализация)
// ============================================================
function normalize(word) {
  return word.toLowerCase().replace(/ё/g, 'е');
}

// Поиск в словаре с учётом нормализации
function findInLexicon(word) {
  const norm = normalize(word);
  if (lexicon[norm]) {
    return { found: true, entry: lexicon[norm], lemma: norm };
  }
  // Если не найдено, пробуем убрать окончание "ы", "и", "а" для возможных падежных форм
  // (но в словаре уже есть большинство форм, это запасной вариант)
  if (norm.endsWith('ы') && norm.length > 2) {
    const try1 = norm.slice(0, -1) + 'а';
    if (lexicon[try1]) return { found: true, entry: lexicon[try1], lemma: try1 };
  }
  if (norm.endsWith('и') && norm.length > 2) {
    const try2 = norm.slice(0, -1) + 'а';
    if (lexicon[try2]) return { found: true, entry: lexicon[try2], lemma: try2 };
  }
  return { found: false };
}

// ============================================================
// 3. ОСНОВНАЯ ЛОГИКА ПЕРЕВОДА
// ============================================================

const PREPOSITIONS = ['на', 'в', 'у', 'к', 'от', 'из', 'для', 'без', 'через', 'по', 'о', 'об', 'с', 'со', 'за', 'под', 'над', 'перед', 'между', 'возле', 'около', 'мимо', 'вокруг'];

// Список слов, которые точно являются множественным числом (чтобы не путаться с окончаниями)
const PLURAL_WORDS = [
  'звёзды','звезды','звёзд','звезд',
  'воды','вод',
  'реки','рек',
  'горы','гор',
  'люди','людей',
  'марсиане','марсиан',
  'дома','домов',
  'столы','столов',
  'стулья','стульев',
  'кровати','кроватей',
  'леса','лесов',
  'поля','полей',
  'дети','детей',
  'глаза','глаз'
];

function translateText() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    document.getElementById('translation').textContent = 'Введите текст для перевода.';
    document.getElementById('gloss').textContent = '';
    return;
  }

  // Разбиваем на слова
  const rawWords = input.split(/\s+/).filter(w => w.length > 0);
  let processed = []; // { word, root, pos, plural, adj }
  let unknown = [];

  rawWords.forEach(w => {
    // Очищаем от знаков препинания
    const clean = w.replace(/[^а-яa-zё]/gi, '').toLowerCase();
    // Пропускаем предлоги
    if (PREPOSITIONS.includes(clean)) return;

    const result = findInLexicon(clean);
    if (result.found) {
      const entry = result.entry;
      let root = entry.root;
      let pos = entry.pos;

      // Определяем множественное число
      let plural = false;
      if (pos === 'noun' || pos === 'adj') {
        // Если корень уже заканчивается на -ān, считаем множественным
        if (root.endsWith('ān')) {
          plural = true;
        } else {
          // Проверяем по списку явных множественных форм
          if (PLURAL_WORDS.includes(clean)) {
            plural = true;
          }
        }
      }

      let adj = (pos === 'adj');
      processed.push({ word: w, root: root, pos: pos, plural: plural, adj: adj });
    } else {
      unknown.push(w);
      // Если слово не найдено, сохраняем его как есть (но оно не переведётся)
      processed.push({ word: w, root: w, pos: 'unknown', plural: false, adj: false });
    }
  });

  // Если после фильтрации предлогов не осталось слов, выходим
  if (processed.length === 0) {
    document.getElementById('translation').textContent = 'Нет слов для перевода (только предлоги).';
    document.getElementById('gloss').textContent = '';
    return;
  }

  // Разделяем на подлежащее, дополнение, глагол
  let subject = [];
  let objects = [];
  let verb = null;
  let verbIdx = -1;

  // Ищем первый глагол
  for (let i = 0; i < processed.length; i++) {
    if (processed[i].pos === 'verb') {
      verbIdx = i;
      verb = processed[i];
      break;
    }
  }

  if (verbIdx !== -1) {
    subject = processed.slice(0, verbIdx);
    objects = processed.slice(verbIdx + 1);
  } else {
    // Если глагола нет, считаем всё подлежащим (именное предложение)
    subject = processed;
  }

  // Собираем марсианские слова в порядке SOV
  let resultWords = [];

  function addWord(wordObj) {
    let root = wordObj.root;
    // Если это существительное/прилагательное, и оно множественное, и корень не оканчивается на -ān, добавляем суффикс
    if (wordObj.plural && (wordObj.pos === 'noun' || wordObj.pos === 'adj') && !root.endsWith('ān')) {
      const last = root.charAt(root.length - 1);
      const vowels = ['a','ā','o','ō','u','ū','e','i'];
      if (vowels.includes(last.toLowerCase())) {
        root += 'zān';
      } else {
        root += 'ān';
      }
    }
    resultWords.push(root);
  }

  // Подлежащее: сначала существительные/местоимения, потом прилагательные
  let subjNouns = subject.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let subjAdjs = subject.filter(w => w.pos === 'adj');
  subjNouns.forEach(w => addWord(w));
  subjAdjs.forEach(w => addWord(w));

  // Дополнение: сначала существительные/местоимения, потом прилагательные
  let objNouns = objects.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let objAdjs = objects.filter(w => w.pos === 'adj');
  objNouns.forEach(w => addWord(w));
  objAdjs.forEach(w => addWord(w));

  // Глагол
  if (verb) {
    resultWords.push(verb.root);
  }

  // ============================================================
  // 4. ГРАММАТИЧЕСКИЕ ЧАСТИЦЫ
  // ============================================================

  const lowerInput = input.toLowerCase();

  // Отрицание
  if (lowerInput.includes('не') || lowerInput.includes('нет')) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1 && idx < resultWords.length) {
        resultWords.splice(idx + 1, 0, 'ān');
      }
    }
  }

  // Вопрос
  if (input.includes('?')) {
    resultWords.push('kha');
  }

  // Прошедшее время
  const hasPastMarker = lowerInput.includes('был') || lowerInput.includes('была') || lowerInput.includes('были');
  const hasPastVerb = processed.some(w => w.pos === 'verb' && (w.word.endsWith('л') || w.word.endsWith('ла') || w.word.endsWith('ли') || w.word.endsWith('ло')));
  if (hasPastMarker || hasPastVerb) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) {
        let insertPos = idx + 1;
        if (resultWords[insertPos] === 'ān') insertPos++;
        resultWords.splice(insertPos, 0, 'nu');
      }
    }
  }

  // Будущее время
  if (lowerInput.includes('буду') || lowerInput.includes('будет') || lowerInput.includes('будут')) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) {
        let insertPos = idx + 1;
        if (resultWords[insertPos] === 'ān') insertPos++;
        resultWords.splice(insertPos, 0, 'shu');
      }
    }
  }

  // Модальные глаголы
  const modalMap = {
    'могу': 'xan', 'можешь': 'xan', 'может': 'xan', 'можем': 'xan', 'можете': 'xan', 'могут': 'xan',
    'хочу': 'shar', 'хочешь': 'shar', 'хочет': 'shar', 'хотим': 'shar', 'хотите': 'shar', 'хотят': 'shar',
    'должен': 'mun', 'должна': 'mun', 'должно': 'mun', 'должны': 'mun'
  };
  let modalSuffix = null;
  for (let key in modalMap) {
    if (lowerInput.includes(key)) { modalSuffix = modalMap[key]; break; }
  }
  if (modalSuffix && verb) {
    const idx = resultWords.indexOf(verb.root);
    if (idx !== -1) {
      resultWords[idx] = verb.root + modalSuffix;
    }
  }

  // Сослагательное наклонение
  if (lowerInput.includes('бы') || lowerInput.includes('чтобы')) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) {
        resultWords.splice(idx, 0, 'kha');
      }
    }
  }

  // Пассив (если есть "был" + глагол, кроме самого "был")
  if (lowerInput.includes('был') || lowerInput.includes('была') || lowerInput.includes('были')) {
    const hasOtherVerb = processed.some(w => w.pos === 'verb' && !['был','была','были','было'].includes(w.word));
    if (hasOtherVerb && verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) {
        let insertPos = idx + 1;
        while (insertPos < resultWords.length && ['ān','nu','shu'].includes(resultWords[insertPos])) insertPos++;
        resultWords.splice(insertPos, 0, 'rak');
      }
    }
  }

  // Эвокативы (упрощённо)
  if (lowerInput.includes('вижу') || lowerInput.includes('наблюдаю')) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) resultWords[idx] = verb.root + 'ra';
    }
  } else if (lowerInput.includes('говорят') || lowerInput.includes('рассказывают')) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) resultWords[idx] = verb.root + 'ma';
    }
  } else if (lowerInput.includes('должно быть') || lowerInput.includes('вероятно')) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) resultWords[idx] = verb.root + 'la';
    }
  }

  // ============================================================
  // 5. ВЫВОД РЕЗУЛЬТАТА
  // ============================================================

  let translation = resultWords.join(' ');
  document.getElementById('translation').textContent = translation;
  document.getElementById('translation').className = 'result';

  // Подстрочник
  let glossParts = resultWords.map(w => {
    for (let key in lexicon) {
      if (lexicon[key].root === w) return key;
    }
    if (w === 'ān') return 'отриц.';
    if (w === 'nu') return 'прош.';
    if (w === 'shu') return 'буд.';
    if (w === 'kha') return 'вопрос';
    if (w === 'rak') return 'пассив';
    return w;
  });
  let glossText = 'Подстрочник: ' + glossParts.join(' ');
  if (unknown.length > 0) {
    glossText += ' ⚠️ неизвестные: ' + unknown.join(', ');
  }
  document.getElementById('gloss').textContent = glossText;
}

// ============================================================
// 6. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================
function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('translation').textContent = 'Здесь появится перевод...';
  document.getElementById('translation').className = 'result';
  document.getElementById('gloss').textContent = '';
}

// Горячая клавиша Ctrl+Enter
document.getElementById('inputText').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    translateText();
  }
});
</script>
