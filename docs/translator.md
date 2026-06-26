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
    <div class="gloss" id="debug" style="display:none;"></div>
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
  // Группа "смотреть"
  "смотрю": "смотреть",
  "смотришь": "смотреть",
  "смотрит": "смотреть",
  "смотрим": "смотреть",
  "смотрите": "смотреть",
  "смотрят": "смотреть",
  "смотрел": "смотреть",
  "смотрела": "смотреть",
  "смотрели": "смотреть",
  // Группа "помнить"
  "помню": "помнить",
  "помнишь": "помнить",
  "помнит": "помнить",
  "помним": "помнить",
  "помните": "помнить",
  "помнят": "помнить",
  "помнил": "помнить",
  "помнила": "помнить",
  "помнили": "помнить",
  // Группа "знать"
  "знаю": "знать",
  "знаешь": "знать",
  "знает": "знать",
  "знаем": "знать",
  "знаете": "знать",
  "знают": "знать",
  "знал": "знать",
  "знала": "знать",
  "знали": "знать",
  // Группа "умирать"
  "умираю": "умирать",
  "умираешь": "умирать",
  "умирает": "умирать",
  "умираем": "умирать",
  "умираете": "умирать",
  "умирают": "умирать",
  "умирал": "умирать",
  "умирала": "умирать",
  "умирали": "умирать",
  // Группа "готовить"
  "готовлю": "готовить",
  "готовишь": "готовить",
  "готовит": "готовить",
  "готовим": "готовить",
  "готовите": "готовить",
  "готовят": "готовить",
  "готовил": "готовить",
  "готовила": "готовить",
  "готовили": "готовить",
  // Группа "мечтать"
  "мечтаю": "мечтать",
  "мечтаешь": "мечтать",
  "мечтает": "мечтать",
  "мечтаем": "мечтать",
  "мечтаете": "мечтать",
  "мечтают": "мечтать",
  "мечтал": "мечтать",
  "мечтала": "мечтать",
  "мечтали": "мечтать",
  // Группа "говорить"
  "говорю": "говорить",
  "говоришь": "говорить",
  "говорит": "говорить",
  "говорим": "говорить",
  "говорите": "говорить",
  "говорят": "говорить",
  "говорил": "говорить",
  "говорила": "говорить",
  "говорили": "говорить",
  // Группа "сидеть"
  "сижу": "сидеть",
  "сидишь": "сидеть",
  "сидит": "сидеть",
  "сидим": "сидеть",
  "сидите": "сидеть",
  "сидят": "сидеть",
  "сидел": "сидеть",
  "сидела": "сидеть",
  "сидели": "сидеть",
  // Группа "хотеть"
  "хочу": "хотеть",
  "хочешь": "хотеть",
  "хочет": "хотеть",
  "хотим": "хотеть",
  "хотите": "хотеть",
  "хотят": "хотеть",
  "хотел": "хотеть",
  "хотела": "хотеть",
  "хотели": "хотеть",
  // Группа "трудиться"
  "тружусь": "трудиться",
  "трудишься": "трудиться",
  "трудится": "трудиться",
  "трудимся": "трудиться",
  "трудитесь": "трудиться",
  "трудятся": "трудиться",
  "трудился": "трудиться",
  "трудилась": "трудиться",
  "трудились": "трудиться",
  // Группа "желать"
  "желаю": "желать",
  "желаешь": "желать",
  "желает": "желать",
  "желаем": "желать",
  "желаете": "желать",
  "желают": "желать",
  "желал": "желать",
  "желала": "желать",
  "желали": "желать",
  // Группа "рассказывать"
  "рассказываю": "рассказывать",
  "рассказываешь": "рассказывать",
  "рассказывает": "рассказывать",
  "рассказываем": "рассказывать",
  "рассказываете": "рассказывать",
  "рассказывают": "рассказывать",
  "рассказывал": "рассказывать",
  "рассказывала": "рассказывать",
  "рассказывали": "рассказывать",
  // Группа "учить"
  "учу": "учить",
  "учишь": "учить",
  "учит": "учить",
  "учим": "учить",
  "учите": "учить",
  "учат": "учить",
  "учил": "учить",
  "учила": "учить",
  "учили": "учить",
  // Группа "искать"
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
  // Проверяем в словарях
  if (verbLemmas[word]) return verbLemmas[word];
  if (nounLemmas[word]) return nounLemmas[word];
  // Если слово заканчивается на "ться" → убираем "ся" и добавляем "ть" (упрощённо)
  if (word.endsWith('ться')) {
    return word.slice(0, -4) + 'ть';
  }
  // Если оканчивается на "ся" → убираем "ся"
  if (word.endsWith('ся')) {
    const stem = word.slice(0, -2);
    // Проверяем, есть ли такой инфинитив в словаре, если нет, возвращаем как есть
    // Упрощённо: если основа заканчивается на "а", "и", "е", то добавляем "ть"
    if (stem.endsWith('а') || stem.endsWith('и') || stem.endsWith('е')) {
      return stem + 'ть';
    }
    return stem;
  }
  // Возвращаем исходное слово, если не нашли
  return word;
}

// ============================================================
// 3. ОСНОВНАЯ ЛОГИКА ПЕРЕВОДА
// ============================================================

// Предлоги, которые игнорируем
const PREPOSITIONS = ['на', 'в', 'у', 'к', 'от', 'из', 'для', 'без', 'через', 'по', 'о', 'об', 'с', 'со', 'за', 'под', 'над', 'перед', 'между', 'возле', 'около'];

// Определение множественного числа по русскому окончанию
function isRussianPlural(word) {
  const w = word.toLowerCase();
  // Окончания множественного числа: ы, и, а, я (для имён сущ.)
  if (w.endsWith('ы') || w.endsWith('и') || w.endsWith('а') || w.endsWith('я')) {
    // Исключения: слова на "мя" (время, имя) – не множественное
    if (w.endsWith('мя')) return false;
    // Слова на "ка" могут быть ед.ч. (рука) – проверяем по словарю, но упростим
    // Если в словаре есть форма множественного числа, то true
    // Мы можем проверить, есть ли лемма, и если лемма отличается
    const lemma = lemmatizeRussian(w);
    // Если лемма не равна слову, значит это форма, возможно множественное
    if (lemma !== w) {
      // Проверяем, есть ли лемма в словаре
      if (lexicon[lemma]) return true;
    }
  }
  return false;
}

// Определение прилагательных – у них окончания -ый, -ий, -ой, -ая, -яя, -ое, -ее, -ые, -ие
function isRussianAdjective(word) {
  const w = word.toLowerCase();
  return /[ая]я$/.test(w) || /[оы]й$/.test(w) || /ий$/.test(w) || /ое$/.test(w) || /ее$/.test(w) || /ые$/.test(w) || /ие$/.test(w);
}

// Определение глагола в прошедшем времени (оканчивается на -л, -ла, -ли, -ло)
function isRussianPastTense(word) {
  const w = word.toLowerCase();
  return w.endsWith('л') || w.endsWith('ла') || w.endsWith('ли') || w.endsWith('ло');
}

// Основная функция перевода
function translateText() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    document.getElementById('translation').textContent = 'Введите текст для перевода.';
    document.getElementById('gloss').textContent = '';
    return;
  }

  // 1. Токенизация
  const words = input.split(/\s+/).filter(w => w.length > 0);
  
  // 2. Обработка каждого слова
  let processedWords = []; // массив объектов { original, clean, lemma, pos, root, plural, adj }
  let unknownWords = [];

  words.forEach(word => {
    // Очищаем от знаков препинания
    const clean = word.toLowerCase().replace(/[^а-яa-z]/gi, '');
    if (PREPOSITIONS.includes(clean)) {
      // Игнорируем предлоги
      return;
    }

    // Лемматизация
    let lemma = lemmatizeRussian(clean);
    // Если лемма не найдена в словаре, попробуем использовать исходное clean
    if (!lexicon[lemma]) {
      // Если исходное слово есть в словаре, используем его
      if (lexicon[clean]) {
        lemma = clean;
      } else {
        // Пытаемся отсечь окончание для множественного числа
        // Например, "звёзды" -> "звезда"
        if (clean.endsWith('ы') && clean.length > 1) {
          const singular = clean.slice(0, -1) + 'а';
          if (lexicon[singular]) {
            lemma = singular;
          }
        }
        // Если всё ещё нет, помечаем как неизвестное
        if (!lexicon[lemma]) {
          unknownWords.push(word);
          processedWords.push({
            original: word,
            clean: clean,
            lemma: null,
            pos: 'unknown',
            root: word, // оставляем как есть
            plural: false,
            adj: false
          });
          return;
        }
      }
    }

    // Теперь lemma точно есть в словаре
    const entry = lexicon[lemma];
    let pos = entry.pos;
    let root = entry.root;

    // Определяем, является ли слово множественным числом
    let plural = false;
    if (pos === 'noun' || pos === 'adj') {
      // Проверяем, есть ли окончание множественного числа в исходном слове
      if (isRussianPlural(clean)) {
        plural = true;
      }
    }

    // Определяем прилагательное (для перестановки)
    let adj = false;
    if (pos === 'adj') {
      adj = true;
    }

    processedWords.push({
      original: word,
      clean: clean,
      lemma: lemma,
      pos: pos,
      root: root,
      plural: plural,
      adj: adj
    });
  });

  // 3. Построение марсианского предложения

  // Разделяем на подлежащее, дополнение и сказуемое (глагол)
  let subject = [];
  let objects = [];
  let verb = null;

  // Найдём глагол (первый глагол)
  let verbIndex = processedWords.findIndex(w => w.pos === 'verb');
  if (verbIndex !== -1) {
    verb = processedWords[verbIndex];
    subject = processedWords.slice(0, verbIndex);
    objects = processedWords.slice(verbIndex + 1);
  } else {
    // Если глагола нет, считаем все слова подлежащим (именное предложение)
    subject = processedWords;
  }

  // 4. Сборка результата в порядке SOV

  let resultWords = [];

  // Сначала подлежащее (существительные и прилагательные)
  // Прилагательные должны стоять после существительных в марсианском
  // Отделим существительные от прилагательных в подлежащем
  let nounsSubj = subject.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let adjSubj = subject.filter(w => w.pos === 'adj');
  // Объединяем: сначала существительные, потом прилагательные (но по правилам марсианского прилагательное после существительного)
  // Однако если есть несколько существительных и прилагательных, нужно ставить прилагательное после того существительного, к которому оно относится.
  // Упрощённо: все существительные, потом все прилагательные.
  let subjWords = [];
  // Сначала существительные
  nounsSubj.forEach(w => {
    let word = w.root;
    if (w.plural) {
      // Добавляем суффикс множественного числа
      word = applyPlural(word);
    }
    subjWords.push(word);
  });
  // Потом прилагательные (если они были в подлежащем)
  adjSubj.forEach(w => {
    let word = w.root;
    // Прилагательные не изменяются по числам в марсианском (пока)
    subjWords.push(word);
  });

  // Дополнения (объекты) – аналогично
  let nounsObj = objects.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let adjObj = objects.filter(w => w.pos === 'adj');
  let objWords = [];
  nounsObj.forEach(w => {
    let word = w.root;
    if (w.plural) {
      word = applyPlural(word);
    }
    objWords.push(word);
  });
  adjObj.forEach(w => {
    objWords.push(w.root);
  });

  // Глагол
  let verbWord = verb ? verb.root : null;
  let verbPlural = verb ? verb.plural : false; // глаголы не изменяются по числам в марсианском

  // Теперь собираем финальный порядок: subject + objects + verb
  let finalWords = subjWords.concat(objWords);
  if (verbWord) {
    finalWords.push(verbWord);
  }

  // 5. Добавление грамматических частиц

  // Определяем время, отрицание, вопрос и т.д. по исходному тексту
  const lowerInput = input.toLowerCase();

  // Отрицание (если есть "не" или "нет")
  if (lowerInput.includes('не') || lowerInput.includes('нет')) {
    // Находим позицию глагола в finalWords
    if (verbWord) {
      const verbIdx = finalWords.indexOf(verbWord);
      if (verbIdx !== -1 && verbIdx < finalWords.length) {
        // Вставляем "ān" после глагола
        finalWords.splice(verbIdx + 1, 0, 'ān');
      }
    }
  }

  // Вопрос
  if (input.includes('?')) {
    finalWords.push('kha');
  }

  // Прошедшее время (если есть глагол в прошедшем времени или слова "был", "была")
  const hasPastMarker = lowerInput.includes('был') || lowerInput.includes('была') || lowerInput.includes('были');
  const hasPastVerb = processedWords.some(w => w.pos === 'verb' && isRussianPastTense(w.clean));
  if (hasPastMarker || hasPastVerb) {
    if (verbWord) {
      const verbIdx = finalWords.indexOf(verbWord);
      if (verbIdx !== -1 && verbIdx < finalWords.length) {
        // Вставляем "nu" после глагола (перед отрицанием, если есть)
        // Проверяем, не вставлен ли уже ān
        const nextWord = finalWords[verbIdx + 1];
        if (nextWord === 'ān') {
          // Вставляем после ān
          finalWords.splice(verbIdx + 2, 0, 'nu');
        } else {
          finalWords.splice(verbIdx + 1, 0, 'nu');
        }
      }
    }
  }

  // Будущее время (если есть "буду", "будет", "будут")
  if (lowerInput.includes('буду') || lowerInput.includes('будет') || lowerInput.includes('будут')) {
    if (verbWord) {
      const verbIdx = finalWords.indexOf(verbWord);
      if (verbIdx !== -1 && verbIdx < finalWords.length) {
        // Вставляем "shu" после глагола (перед отрицанием, если есть)
        const nextWord = finalWords[verbIdx + 1];
        if (nextWord === 'ān') {
          finalWords.splice(verbIdx + 2, 0, 'shu');
        } else {
          finalWords.splice(verbIdx + 1, 0, 'shu');
        }
      }
    }
  }

  // Модальные глаголы (могу, хочешь, должен)
  const modalMap = {
    'могу': 'xan',
    'можешь': 'xan',
    'может': 'xan',
    'можем': 'xan',
    'можете': 'xan',
    'могут': 'xan',
    'хочу': 'shar',
    'хочешь': 'shar',
    'хочет': 'shar',
    'хотим': 'shar',
    'хотите': 'shar',
    'хотят': 'shar',
    'должен': 'mun',
    'должна': 'mun',
    'должны': 'mun',
    'должно': 'mun'
  };
  let modalSuffix = null;
  for (let key in modalMap) {
    if (lowerInput.includes(key)) {
      modalSuffix = modalMap[key];
      break;
    }
  }
  if (modalSuffix && verbWord) {
    // Добавляем суффикс к глаголу (присоединяем к корню)
    const verbIdx = finalWords.indexOf(verbWord);
    if (verbIdx !== -1) {
      finalWords[verbIdx] = verbWord + modalSuffix;
    }
  }

  // Сослагательное наклонение (если есть "бы" или "чтобы")
  if (lowerInput.includes('бы') || lowerInput.includes('чтобы')) {
    if (verbWord) {
      const verbIdx = finalWords.indexOf(verbWord);
      if (verbIdx !== -1) {
        // Вставляем "kha" перед глаголом
        finalWords.splice(verbIdx, 0, 'kha');
      }
    }
  }

  // Пассивный залог (если есть "был" + глагол в прош. вр. или "было")
  // Упрощённо: если есть "был" и есть глагол, добавляем "rak" после глагола
  if (lowerInput.includes('был') || lowerInput.includes('была') || lowerInput.includes('были')) {
    // Проверяем, есть ли глагол (кроме "был")
    const hasOtherVerb = processedWords.some(w => w.pos === 'verb' && w.clean !== 'был' && w.clean !== 'была' && w.clean !== 'были');
    if (hasOtherVerb && verbWord) {
      const verbIdx = finalWords.indexOf(verbWord);
      if (verbIdx !== -1 && verbIdx < finalWords.length) {
        // Вставляем "rak" после глагола (или после отрицания/времени)
        // Найдём позицию после глагола, но перед возможными частицами
        let insertPos = verbIdx + 1;
        // Пропускаем уже вставленные частицы (ān, nu, shu)
        while (insertPos < finalWords.length && ['ān', 'nu', 'shu'].includes(finalWords[insertPos])) {
          insertPos++;
        }
        finalWords.splice(insertPos, 0, 'rak');
      }
    }
  }

  // Эвокативы (упрощённо)
  if (lowerInput.includes('вижу') || lowerInput.includes('наблюдаю')) {
    // Добавляем -ra к глаголу
    if (verbWord) {
      const verbIdx = finalWords.indexOf(verbWord);
      if (verbIdx !== -1) {
        finalWords[verbIdx] = verbWord + 'ra';
      }
    }
  } else if (lowerInput.includes('говорят') || lowerInput.includes('рассказывают')) {
    if (verbWord) {
      const verbIdx = finalWords.indexOf(verbWord);
      if (verbIdx !== -1) {
        finalWords[verbIdx] = verbWord + 'ma';
      }
    }
  } else if (lowerInput.includes('должно быть') || lowerInput.includes('вероятно')) {
    if (verbWord) {
      const verbIdx = finalWords.indexOf(verbWord);
      if (verbIdx !== -1) {
        finalWords[verbIdx] = verbWord + 'la';
      }
    }
  }

  // 6. Формирование финальной строки
  let translation = finalWords.join(' ');

  // 7. Вывод результата
  document.getElementById('translation').textContent = translation;

  // Подстрочник (глосса)
  let glossText = 'Подстрочник: ' + finalWords.map((w, i) => {
    // Ищем русское слово по корню
    for (let key in lexicon) {
      if (lexicon[key].root === w) {
        return key;
      }
    }
    // Если это частица, покажем её название
    if (w === 'ān') return 'отрицание';
    if (w === 'nu') return 'прош. вр.';
    if (w === 'shu') return 'буд. вр.';
    if (w === 'kha') return 'вопрос';
    if (w === 'rak') return 'пассив';
    if (w === 'xan') return 'могу';
    if (w === 'shar') return 'хочу';
    if (w === 'mun') return 'должен';
    return w;
  }).join(' ');
  document.getElementById('gloss').textContent = glossText;

  if (unknownWords.length > 0) {
    document.getElementById('gloss').textContent += ' (⚠️ неизвестные: ' + unknownWords.join(', ') + ')';
  }

  // Показываем отладочную информацию (скрыто)
  // document.getElementById('debug').textContent = 'DEBUG: ' + JSON.stringify(processedWords, null, 2);
}

// ============================================================
// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

function applyPlural(root) {
  // Правила: после гласной добавляем -zān, после согласной -ān
  // Проверяем последний символ корня
  if (!root) return root;
  const lastChar = root.charAt(root.length - 1);
  // Гласные: a, ā, o, ō, u, ū, e, i (но у нас в основном a, o, u)
  const vowels = ['a', 'ā', 'o', 'ō', 'u', 'ū', 'e', 'i'];
  if (vowels.includes(lastChar.toLowerCase())) {
    return root + 'zān';
  } else {
    return root + 'ān';
  }
}

function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('translation').textContent = 'Здесь появится перевод...';
  document.getElementById('translation').className = 'result';
  document.getElementById('gloss').textContent = '';
}

// ============================================================
// 5. ДОПОЛНИТЕЛЬНО: обработка ошибок и улучшения
// ============================================================
// Добавляем возможность перевода по нажатию Ctrl+Enter
document.getElementById('inputText').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    translateText();
  }
});
</script>
