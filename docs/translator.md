---
title: Марсианский переводчик
---

<style>
  .translator-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    font-family: 'Segoe UI', sans-serif;
  }
  h2 {
    margin-top: 0;
    color: #1d4370;
  }
  .hint {
    background: #eef5ff;
    padding: 12px 16px;
    border-radius: 6px;
    margin-bottom: 18px;
    font-size: 14px;
    border-left: 4px solid #2a5c8a;
  }
  textarea {
    width: 100%;
    height: 120px;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    resize: vertical;
    box-sizing: border-box;
  }
  .buttons {
    margin: 15px 0;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .buttons button {
    padding: 10px 24px;
    background: #2a5c8a;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.2s;
  }
  .buttons button:hover {
    background: #1d4370;
  }
  .buttons button.secondary {
    background: #6c757d;
  }
  .buttons button.secondary:hover {
    background: #5a6268;
  }
  #output {
    margin-top: 20px;
  }
  .result {
    padding: 16px;
    background: white;
    border-left: 6px solid #2a5c8a;
    border-radius: 6px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 18px;
    line-height: 1.6;
    min-height: 50px;
  }
  .gloss {
    color: #555;
    font-style: italic;
    margin-top: 8px;
    font-size: 14px;
    background: #f0f0f0;
    padding: 8px 12px;
    border-radius: 4px;
  }
  .footer {
    margin-top: 20px;
    font-size: 12px;
    color: #777;
    text-align: center;
  }
  .error {
    color: #d9534f;
  }
</style>

<div class="translator-container">
  <h2>🌌 Переводчик на марсианский язык</h2>
  <div class="hint">
    <strong>Как пользоваться:</strong> Вводите предложения на русском. Переводчик сам приведёт слова к начальной форме, определит множественное число, время, отрицание, вопрос и модальность.
    <br>Примеры: <code>Марсиане смотрят на звёзды.</code> → <code>Marzān dzen thal.</code>
  </div>
  <textarea id="inputText" placeholder="Введите текст для перевода..."></textarea>
  <div class="buttons">
    <button onclick="translateText()">🔄 Перевести</button>
    <button onclick="clearAll()" class="secondary">🗑 Очистить</button>
  </div>
  <div id="output">
    <div class="result" id="translation">Здесь появится перевод...</div>
    <div class="gloss" id="gloss"></div>
  </div>
  <div class="footer">Автор языка: Mnemis • Вселенная «Письмо из Красной пыли»</div>
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
    document.getElementById('translation').textContent = '✅ Словарь загружен! Введите текст для перевода.';
    console.log('Словарь загружен, количество слов:', Object.keys(lexicon).length);
  })
  .catch(error => {
    console.error('Ошибка загрузки словаря:', error);
    document.getElementById('translation').textContent = '❌ Не удалось загрузить словарь. Проверьте путь к файлу.';
    document.getElementById('translation').className = 'result error';
  });

// ============================================================
// 2. ЛЕММАТИЗАЦИЯ (приведение к начальной форме)
// ============================================================

// Словарь исключений для глаголов (форма → инфинитив)
const verbLemmas = {
  "смотрю": "смотреть",
  "смотришь": "смотреть",
  "смотрит": "смотреть",
  "смотрим": "смотреть",
  "смотрите": "смотреть",
  "смотрят": "смотреть",
  "смотрел": "смотреть",
  "смотрела": "смотреть",
  "смотрели": "смотреть",
  "помню": "помнить",
  "помнишь": "помнить",
  "помнит": "помнить",
  "помним": "помнить",
  "помните": "помнить",
  "помнят": "помнить",
  "помнил": "помнить",
  "помнила": "помнить",
  "помнили": "помнить",
  "знаю": "знать",
  "знаешь": "знать",
  "знает": "знать",
  "знаем": "знать",
  "знаете": "знать",
  "знают": "знать",
  "знал": "знать",
  "знала": "знать",
  "знали": "знать",
  "умираю": "умирать",
  "умираешь": "умирать",
  "умирает": "умирать",
  "умираем": "умирать",
  "умираете": "умирать",
  "умирают": "умирать",
  "умирал": "умирать",
  "умирала": "умирать",
  "умирали": "умирать",
  "готовлю": "готовить",
  "готовишь": "готовить",
  "готовит": "готовить",
  "готовим": "готовить",
  "готовите": "готовить",
  "готовят": "готовить",
  "готовил": "готовить",
  "готовила": "готовить",
  "готовили": "готовить",
  "мечтаю": "мечтать",
  "мечтаешь": "мечтать",
  "мечтает": "мечтать",
  "мечтаем": "мечтать",
  "мечтаете": "мечтать",
  "мечтают": "мечтать",
  "мечтал": "мечтать",
  "мечтала": "мечтать",
  "мечтали": "мечтать",
  "говорю": "говорить",
  "говоришь": "говорить",
  "говорит": "говорить",
  "говорим": "говорить",
  "говорите": "говорить",
  "говорят": "говорить",
  "говорил": "говорить",
  "говорила": "говорить",
  "говорили": "говорить",
  "сижу": "сидеть",
  "сидишь": "сидеть",
  "сидит": "сидеть",
  "сидим": "сидеть",
  "сидите": "сидеть",
  "сидят": "сидеть",
  "сидел": "сидеть",
  "сидела": "сидеть",
  "сидели": "сидеть",
  "хочу": "хотеть",
  "хочешь": "хотеть",
  "хочет": "хотеть",
  "хотим": "хотеть",
  "хотите": "хотеть",
  "хотят": "хотеть",
  "хотел": "хотеть",
  "хотела": "хотеть",
  "хотели": "хотеть",
  "тружусь": "трудиться",
  "трудишься": "трудиться",
  "трудится": "трудиться",
  "трудимся": "трудиться",
  "трудитесь": "трудиться",
  "трудятся": "трудиться",
  "трудился": "трудиться",
  "трудилась": "трудиться",
  "трудились": "трудиться",
  "желаю": "желать",
  "желаешь": "желать",
  "желает": "желать",
  "желаем": "желать",
  "желаете": "желать",
  "желают": "желать",
  "желал": "желать",
  "желала": "желать",
  "желали": "желать",
  "рассказываю": "рассказывать",
  "рассказываешь": "рассказывать",
  "рассказывает": "рассказывать",
  "рассказываем": "рассказывать",
  "рассказываете": "рассказывать",
  "рассказывают": "рассказывать",
  "рассказывал": "рассказывать",
  "рассказывала": "рассказывать",
  "рассказывали": "рассказывать",
  "учу": "учить",
  "учишь": "учить",
  "учит": "учить",
  "учим": "учить",
  "учите": "учить",
  "учат": "учить",
  "учил": "учить",
  "учила": "учить",
  "учили": "учить",
  "ищу": "искать",
  "ищешь": "искать",
  "ищет": "искать",
  "ищем": "искать",
  "ищете": "искать",
  "ищут": "искать",
  "искал": "искать",
  "искала": "искать",
  "искали": "искать"
};

// Словарь для существительных (падежи, множественное число)
const nounLemmas = {
  "звёзды": "звезда",
  "звёзд": "звезда",
  "звезды": "звезда",
  "звезд": "звезда",
  "звезде": "звезда",
  "звезду": "звезда",
  "звездой": "звезда",
  "воды": "вода",
  "вод": "вода",
  "воде": "вода",
  "воду": "вода",
  "водой": "вода",
  "реки": "река",
  "рек": "река",
  "реке": "река",
  "реку": "река",
  "рекой": "река",
  "горы": "гора",
  "гор": "гора",
  "горе": "гора",
  "гору": "гора",
  "горой": "гора",
  "люди": "человек",
  "людей": "человек",
  "человеку": "человек",
  "человеком": "человек",
  "человеке": "человек",
  "дома": "дом",
  "домов": "дом",
  "дому": "дом",
  "домом": "дом",
  "доме": "дом",
  "столы": "стол",
  "столов": "стол",
  "столу": "стол",
  "столом": "стол",
  "столе": "стол",
  "стулья": "стул",
  "стульев": "стул",
  "стулу": "стул",
  "стулом": "стул",
  "стуле": "стул",
  "кровати": "кровать",
  "кроватей": "кровать",
  "кровати": "кровать",
  "кроватью": "кровать",
  "кровати": "кровать"
};

function lemmatizeRussian(word) {
  if (verbLemmas[word]) return verbLemmas[word];
  if (nounLemmas[word]) return nounLemmas[word];
  // Упрощённое правило для глаголов на -ться и -ся
  if (word.endsWith('ться')) return word.slice(0, -4) + 'ть';
  if (word.endsWith('ся')) {
    const stem = word.slice(0, -2);
    if (stem.endsWith('а') || stem.endsWith('и') || stem.endsWith('е')) return stem + 'ть';
    return stem;
  }
  return word;
}

// ============================================================
// 3. ОСНОВНАЯ ЛОГИКА ПЕРЕВОДА
// ============================================================

const PREPOSITIONS = ['на', 'в', 'у', 'к', 'от', 'из', 'для', 'без', 'через', 'по', 'о', 'об', 'с', 'со', 'за', 'под', 'над', 'перед', 'между', 'возле', 'около'];

function isRussianPlural(word) {
  const w = word.toLowerCase();
  if (w.endsWith('ы') || w.endsWith('и') || w.endsWith('а') || w.endsWith('я')) {
    if (w.endsWith('мя')) return false;
    const lemma = lemmatizeRussian(w);
    if (lemma !== w && lexicon[lemma]) return true;
  }
  return false;
}

function isRussianAdjective(word) {
  const w = word.toLowerCase();
  return /[ая]я$/.test(w) || /[оы]й$/.test(w) || /ий$/.test(w) || /ое$/.test(w) || /ее$/.test(w) || /ые$/.test(w) || /ие$/.test(w);
}

function isRussianPastTense(word) {
  const w = word.toLowerCase();
  return w.endsWith('л') || w.endsWith('ла') || w.endsWith('ли') || w.endsWith('ло');
}

function applyPlural(root) {
  if (!root) return root;
  const lastChar = root.charAt(root.length - 1);
  const vowels = ['a', 'ā', 'o', 'ō', 'u', 'ū', 'e', 'i'];
  if (vowels.includes(lastChar.toLowerCase())) {
    return root + 'zān';
  } else {
    return root + 'ān';
  }
}

function translateText() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    document.getElementById('translation').textContent = 'Введите текст для перевода.';
    document.getElementById('gloss').textContent = '';
    return;
  }

  const words = input.split(/\s+/).filter(w => w.length > 0);
  let processedWords = [];
  let unknownWords = [];

  words.forEach(word => {
    const clean = word.toLowerCase().replace(/[^а-яa-z]/gi, '');
    if (PREPOSITIONS.includes(clean)) return;

    let lemma = lemmatizeRussian(clean);
    if (!lexicon[lemma]) {
      if (lexicon[clean]) {
        lemma = clean;
      } else {
        // Пробуем убрать окончание для существительных мн.ч.
        if (clean.endsWith('ы') && clean.length > 1) {
          const singular = clean.slice(0, -1) + 'а';
          if (lexicon[singular]) lemma = singular;
        }
        if (!lexicon[lemma]) {
          unknownWords.push(word);
          processedWords.push({ original: word, clean, lemma: null, pos: 'unknown', root: word, plural: false });
          return;
        }
      }
    }

    const entry = lexicon[lemma];
    let plural = false;
    if (entry.pos === 'noun' || entry.pos === 'adj') {
      if (isRussianPlural(clean)) plural = true;
    }
    let adj = false;
    if (entry.pos === 'adj') adj = true;

    processedWords.push({
      original: word,
      clean,
      lemma,
      pos: entry.pos,
      root: entry.root,
      plural,
      adj
    });
  });

  // Найти глагол
  let verbIndex = processedWords.findIndex(w => w.pos === 'verb');
  let subject = [];
  let objects = [];
  let verb = null;

  if (verbIndex !== -1) {
    verb = processedWords[verbIndex];
    subject = processedWords.slice(0, verbIndex);
    objects = processedWords.slice(verbIndex + 1);
  } else {
    subject = processedWords;
  }

  // Сборка SOV
  let finalWords = [];

  // Подлежащее
  let subjNouns = subject.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let subjAdj = subject.filter(w => w.pos === 'adj');
  subjNouns.forEach(w => {
    let word = w.root;
    if (w.plural) word = applyPlural(word);
    finalWords.push(word);
  });
  subjAdj.forEach(w => finalWords.push(w.root));

  // Дополнение
  let objNouns = objects.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let objAdj = objects.filter(w => w.pos === 'adj');
  objNouns.forEach(w => {
    let word = w.root;
    if (w.plural) word = applyPlural(word);
    finalWords.push(word);
  });
  objAdj.forEach(w => finalWords.push(w.root));

  // Глагол
  if (verb) {
    finalWords.push(verb.root);
  }

  // Грамматические частицы
  const lowerInput = input.toLowerCase();

  // Отрицание
  if (lowerInput.includes('не') || lowerInput.includes('нет')) {
    if (verb) {
      const idx = finalWords.indexOf(verb.root);
      if (idx !== -1 && idx < finalWords.length - 1) {
        finalWords.splice(idx + 1, 0, 'ān');
      }
    }
  }

  // Вопрос
  if (input.includes('?')) {
    finalWords.push('kha');
  }

  // Прошедшее время
  const hasPastMarker = lowerInput.includes('был') || lowerInput.includes('была') || lowerInput.includes('были');
  const hasPastVerb = processedWords.some(w => w.pos === 'verb' && isRussianPastTense(w.clean));
  if (hasPastMarker || hasPastVerb) {
    if (verb) {
      const idx = finalWords.indexOf(verb.root);
      if (idx !== -1 && idx < finalWords.length - 1) {
        const next = finalWords[idx + 1];
        if (next === 'ān') finalWords.splice(idx + 2, 0, 'nu');
        else finalWords.splice(idx + 1, 0, 'nu');
      }
    }
  }

  // Будущее
  if (lowerInput.includes('буду') || lowerInput.includes('будет') || lowerInput.includes('будут')) {
    if (verb) {
      const idx = finalWords.indexOf(verb.root);
      if (idx !== -1 && idx < finalWords.length - 1) {
        const next = finalWords[idx + 1];
        if (next === 'ān') finalWords.splice(idx + 2, 0, 'shu');
        else finalWords.splice(idx + 1, 0, 'shu');
      }
    }
  }

  // Модальность
  const modalMap = {
    'могу': 'xan', 'можешь': 'xan', 'может': 'xan', 'можем': 'xan', 'можете': 'xan', 'могут': 'xan',
    'хочу': 'shar', 'хочешь': 'shar', 'хочет': 'shar', 'хотим': 'shar', 'хотите': 'shar', 'хотят': 'shar',
    'должен': 'mun', 'должна': 'mun', 'должны': 'mun', 'должно': 'mun'
  };
  let modalSuffix = null;
  for (let key in modalMap) {
    if (lowerInput.includes(key)) { modalSuffix = modalMap[key]; break; }
  }
  if (modalSuffix && verb) {
    const idx = finalWords.indexOf(verb.root);
    if (idx !== -1) finalWords[idx] = verb.root + modalSuffix;
  }

  // Сослагательное
  if (lowerInput.includes('бы') || lowerInput.includes('чтобы')) {
    if (verb) {
      const idx = finalWords.indexOf(verb.root);
      if (idx !== -1) finalWords.splice(idx, 0, 'kha');
    }
  }

  // Пассив
  if (lowerInput.includes('был') || lowerInput.includes('была') || lowerInput.includes('были')) {
    const hasOtherVerb = processedWords.some(w => w.pos === 'verb' && !['был','была','были'].includes(w.clean));
    if (hasOtherVerb && verb) {
      const idx = finalWords.indexOf(verb.root);
      if (idx !== -1 && idx < finalWords.length - 1) {
        let pos = idx + 1;
        while (pos < finalWords.length && ['ān','nu','shu'].includes(finalWords[pos])) pos++;
        finalWords.splice(pos, 0, 'rak');
      }
    }
  }

  let translation = finalWords.join(' ');
  document.getElementById('translation').textContent = translation;

  // Подстрочник
  let glossText = 'Подстрочник: ' + finalWords.map(w => {
    for (let key in lexicon) {
      if (lexicon[key].root === w) return key;
    }
    if (w === 'ān') return 'отрицание';
    if (w === 'nu') return 'прош.вр.';
    if (w === 'shu') return 'буд.вр.';
    if (w === 'kha') return 'вопрос';
    if (w === 'rak') return 'пассив';
    return w;
  }).join(' ');
  if (unknownWords.length > 0) {
    glossText += ' (⚠️ неизвестные: ' + unknownWords.join(', ') + ')';
  }
  document.getElementById('gloss').textContent = glossText;
}

function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('translation').textContent = 'Здесь появится перевод...';
  document.getElementById('gloss').textContent = '';
}

document.getElementById('inputText').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) translateText();
});
</script>
