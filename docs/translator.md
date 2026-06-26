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
// 2. ЛЕММАТИЗАЦИЯ (все формы глаголов и существительных)
// ============================================================

// Мы добавили в словарь все формы, поэтому лемматизация почти не нужна,
// но оставляем для страховки (преобразование ё→е, окончания)
function normalize(word) {
  return word.toLowerCase().replace(/ё/g, 'е');
}

// Основная функция поиска в словаре с учётом ё
function findInLexicon(word) {
  const norm = normalize(word);
  if (lexicon[norm]) return { found: true, entry: lexicon[norm], lemma: norm };
  // Пробуем убрать окончания (для нестандартных форм)
  // Например, "звёзды" -> "звезда" уже есть в словаре, но если вдруг нет
  // Попробуем отсечь "ы", "и", "а" и т.д.
  if (norm.endsWith('ы') && norm.length > 2) {
    const try1 = norm.slice(0, -1) + 'а';
    if (lexicon[try1]) return { found: true, entry: lexicon[try1], lemma: try1 };
  }
  if (norm.endsWith('и') && norm.length > 2) {
    const try2 = norm.slice(0, -1) + 'а';
    if (lexicon[try2]) return { found: true, entry: lexicon[try2], lemma: try2 };
  }
  if (norm.endsWith('е') && norm.length > 2) {
    const try3 = norm.slice(0, -1) + 'о';
    if (lexicon[try3]) return { found: true, entry: lexicon[try3], lemma: try3 };
  }
  // Если не нашли, возвращаем null
  return { found: false };
}

// ============================================================
// 3. ОСНОВНАЯ ЛОГИКА ПЕРЕВОДА
// ============================================================

const PREPOSITIONS = ['на', 'в', 'у', 'к', 'от', 'из', 'для', 'без', 'через', 'по', 'о', 'об', 'с', 'со', 'за', 'под', 'над', 'перед', 'между', 'возле', 'около', 'мимо', 'вокруг'];

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
    const clean = w.replace(/[^а-яa-zё]/gi, '').toLowerCase();
    if (PREPOSITIONS.includes(clean)) return; // пропускаем предлоги

    const result = findInLexicon(clean);
    if (result.found) {
      const entry = result.entry;
      let root = entry.root;
      let pos = entry.pos;
      // Определяем множественное число (если слово заканчивается на ы, и, а, я, но не является исключением)
      let plural = false;
      if (pos === 'noun' || pos === 'adj') {
        // Если в словаре уже есть форма множественного числа, она будет с суффиксом, но мы не можем определить.
        // Проверим, содержит ли clean окончание мн.ч. (условно)
        if (clean.endsWith('ы') || clean.endsWith('и') || clean.endsWith('а') || clean.endsWith('я')) {
          // Исключим слова, которые в ед.ч. оканчиваются на "я" (земля) – они не всегда мн.ч.
          if (!(clean.endsWith('ля') || clean.endsWith('ня') || clean.endsWith('ся'))) {
            plural = true;
          }
        }
        // Для "звёзды" – точно мн.ч.
        if (clean === 'звёзды' || clean === 'звезды' || clean === 'звёзд' || clean === 'звезд') plural = true;
        if (clean === 'воды' || clean === 'вод') plural = true;
        if (clean === 'реки' || clean === 'рек') plural = true;
        if (clean === 'горы' || clean === 'гор') plural = true;
        if (clean === 'люди' || clean === 'людей') plural = true;
        if (clean === 'марсиане' || clean === 'марсиан') plural = true;
        if (clean === 'дома' || clean === 'домов') plural = true; // но "дома" может быть и ед.ч. в род.п., но упростим
        if (clean === 'столы' || clean === 'столов') plural = true;
        if (clean === 'стулья' || clean === 'стульев') plural = true;
        if (clean === 'кровати' || clean === 'кроватей') plural = true;
        if (clean === 'леса' || clean === 'лесов') plural = true;
        if (clean === 'поля' || clean === 'полей') plural = true;
        if (clean === 'дети' || clean === 'детей') plural = true;
        if (clean === 'глаза' || clean === 'глаз' && clean !== 'глаз'? ) // "глаз" может быть ед.ч. род.п. и мн.ч.
        // Для простоты будем считать, что если слово имеет окончание мн.ч. и оно есть в словаре как отдельное слово, то plural = true
        // Но у нас в словаре есть и формы мн.ч. с корнем + суффикс, например "марсиане" уже имеет root "marzān" (без суффикса, т.к. мы забили)
        // Поэтому проще: если clean заканчивается на "е" (мн.ч. им.п.) или "и" (мн.ч. им.п.) для некоторых слов
        // Мы просто оставим логику, которая определяет множественное число по наличию суффикса в корне, но так как мы добавили все формы, 
        // то root уже содержит суффикс, поэтому plural не нужен? Но для единообразия оставим.
        // В марсианском множественное число образуется добавлением -ān/-zān, если нет готового корня.
        // Если слово имеет специальный корень для множественного числа (например, "люди" -> "mārīnān"), то мы его и возьмём.
        // В нашем словаре для "люди" корень "mārīnān" – это уже множественное. Так что plural нам не нужен.
        // Поэтому будем считать, что если root уже содержит суффикс множественного числа (заканчивается на "ān"), то plural = true
        if (root.endsWith('ān')) plural = true;
        else {
          // Проверим, есть ли в словаре форма множественного числа с тем же корнем
          // Мы не будем это делать, потому что словарь уже содержит все формы.
          // Поэтому установим plural = false, если не обнаружено иное.
        }
      }
      // Определяем прилагательное
      let adj = (pos === 'adj');
      processed.push({ word: w, root: root, pos: pos, plural: plural, adj: adj });
    } else {
      unknown.push(w);
      // Если не найдено, оставляем слово как есть (но в марсианском не переведётся)
      processed.push({ word: w, root: w, pos: 'unknown', plural: false, adj: false });
    }
  });

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

  // Собираем марсианские слова
  let resultWords = [];

  // Функция добавления слова с учётом множественного числа
  function addWord(wordObj) {
    let root = wordObj.root;
    // Если это существительное и оно множественное, но корень уже содержит суффикс, ничего не делаем
    // Если корень не содержит суффикс и plural=true, добавляем суффикс
    if (wordObj.plural && (wordObj.pos === 'noun' || wordObj.pos === 'adj') && !root.endsWith('ān')) {
      // Проверяем последнюю букву
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

  // Добавляем существительные из подлежащего (без прилагательных, их позже)
  let subjNouns = subject.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let subjAdjs = subject.filter(w => w.pos === 'adj');
  subjNouns.forEach(w => addWord(w));
  // Прилагательные ставим после существительных
  subjAdjs.forEach(w => addWord(w));

  // Добавляем объекты: сначала существительные, потом прилагательные
  let objNouns = objects.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let objAdjs = objects.filter(w => w.pos === 'adj');
  objNouns.forEach(w => addWord(w));
  objAdjs.forEach(w => addWord(w));

  // Добавляем глагол (если есть)
  if (verb) {
    let verbRoot = verb.root;
    // Проверяем модальность, время и т.д. позже
    resultWords.push(verbRoot);
  }

  // Теперь добавляем грамматические частицы

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

  // Прошедшее время (есть в тексте "был", "была", или глагол на -л)
  const hasPastMarker = lowerInput.includes('был') || lowerInput.includes('была') || lowerInput.includes('были');
  const hasPastVerb = processed.some(w => w.pos === 'verb' && (w.word.endsWith('л') || w.word.endsWith('ла') || w.word.endsWith('ли') || w.word.endsWith('ло')));
  if (hasPastMarker || hasPastVerb) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) {
        // Вставляем "nu" после глагола, но перед отрицанием, если есть
        let insertPos = idx + 1;
        if (resultWords[insertPos] === 'ān') insertPos++;
        resultWords.splice(insertPos, 0, 'nu');
      }
    }
  }

  // Будущее время (есть "буду", "будет", "будут")
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

  // Модальные глаголы (могу, хочешь, должен)
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

  // Сослагательное наклонение (если есть "бы" или "чтобы")
  if (lowerInput.includes('бы') || lowerInput.includes('чтобы')) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) {
        resultWords.splice(idx, 0, 'kha');
      }
    }
  }

  // Пассив (если есть "был" + глагол, кроме "был")
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

  // Собираем финальную строку
  let translation = resultWords.join(' ');

  // Выводим результат
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
// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
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
