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
// 0. ВСТРОЕННЫЙ ПОЛНЫЙ СЛОВАРЬ (РАБОТАЕТ БЕЗ ВНЕШНЕГО ФАЙЛА)
// ============================================================
const BUILTIN_LEXICON = {
  // Местоимения (все падежи)
  "я": { root: "an", pos: "pron" },
  "меня": { root: "an", pos: "pron" },
  "мне": { root: "an", pos: "pron" },
  "мой": { root: "an", pos: "pron" },
  "моя": { root: "an", pos: "pron" },
  "моё": { root: "an", pos: "pron" },
  "мои": { root: "an", pos: "pron" },
  "ты": { root: "ta", pos: "pron" },
  "тебя": { root: "ta", pos: "pron" },
  "тебе": { root: "ta", pos: "pron" },
  "твой": { root: "ta", pos: "pron" },
  "твоя": { root: "ta", pos: "pron" },
  "твоё": { root: "ta", pos: "pron" },
  "твои": { root: "ta", pos: "pron" },
  "он": { root: "la", pos: "pron" },
  "она": { root: "la", pos: "pron" },
  "оно": { root: "la", pos: "pron" },
  "его": { root: "la", pos: "pron" },
  "ей": { root: "la", pos: "pron" },
  "им": { root: "la", pos: "pron" },
  "её": { root: "la", pos: "pron" },
  "их": { root: "lanān", pos: "pron" },
  "мы": { root: "anān", pos: "pron" },
  "нас": { root: "anān", pos: "pron" },
  "нам": { root: "anān", pos: "pron" },
  "нами": { root: "anān", pos: "pron" },
  "вы": { root: "tanān", pos: "pron" },
  "вас": { root: "tanān", pos: "pron" },
  "вам": { root: "tanān", pos: "pron" },
  "вами": { root: "tanān", pos: "pron" },
  "они": { root: "lanān", pos: "pron" },
  // Существительные
  "вода": { root: "ākha", pos: "noun" },
  "воды": { root: "ākha", pos: "noun" },
  "воде": { root: "ākha", pos: "noun" },
  "воду": { root: "ākha", pos: "noun" },
  "водой": { root: "ākha", pos: "noun" },
  "вод": { root: "ākha", pos: "noun" },
  "звезда": { root: "dzen", pos: "noun" },
  "звезды": { root: "dzen", pos: "noun" },
  "звезде": { root: "dzen", pos: "noun" },
  "звезду": { root: "dzen", pos: "noun" },
  "звездой": { root: "dzen", pos: "noun" },
  "звёзды": { root: "dzen", pos: "noun" },
  "звёзд": { root: "dzen", pos: "noun" },
  "звезд": { root: "dzen", pos: "noun" },
  "земля": { root: "kōl", pos: "noun" },
  "земли": { root: "kōl", pos: "noun" },
  "земле": { root: "kōl", pos: "noun" },
  "землю": { root: "kōl", pos: "noun" },
  "землёй": { root: "kōl", pos: "noun" },
  "земель": { root: "kōl", pos: "noun" },
  "река": { root: "khan", pos: "noun" },
  "реки": { root: "khan", pos: "noun" },
  "реке": { root: "khan", pos: "noun" },
  "реку": { root: "khan", pos: "noun" },
  "рекой": { root: "khan", pos: "noun" },
  "рек": { root: "khan", pos: "noun" },
  "огонь": { root: "khō", pos: "noun" },
  "огня": { root: "khō", pos: "noun" },
  "огню": { root: "khō", pos: "noun" },
  "огнём": { root: "khō", pos: "noun" },
  "огни": { root: "khō", pos: "noun" },
  "жизнь": { root: "mar", pos: "noun" },
  "жизни": { root: "mar", pos: "noun" },
  "жизнью": { root: "mar", pos: "noun" },
  "смерть": { root: "mōr", pos: "noun" },
  "смерти": { root: "mōr", pos: "noun" },
  "смертью": { root: "mōr", pos: "noun" },
  "память": { root: "lān", pos: "noun" },
  "памяти": { root: "lān", pos: "noun" },
  "памятью": { root: "lān", pos: "noun" },
  "дом": { root: "okh", pos: "noun" },
  "дома": { root: "okh", pos: "noun" },
  "дому": { root: "okh", pos: "noun" },
  "домом": { root: "okh", pos: "noun" },
  "доме": { root: "okh", pos: "noun" },
  "домов": { root: "okh", pos: "noun" },
  "король": { root: "rōg", pos: "noun" },
  "короля": { root: "rōg", pos: "noun" },
  "королю": { root: "rōg", pos: "noun" },
  "королём": { root: "rōg", pos: "noun" },
  "короли": { root: "rōg", pos: "noun" },
  "место": { root: "sen", pos: "noun" },
  "места": { root: "sen", pos: "noun" },
  "мест": { root: "sen", pos: "noun" },
  "человек": { root: "mārīn", pos: "noun" },
  "человека": { root: "mārīn", pos: "noun" },
  "человеку": { root: "mārīn", pos: "noun" },
  "человеком": { root: "mārīn", pos: "noun" },
  "человеке": { root: "mārīn", pos: "noun" },
  "люди": { root: "mārīnān", pos: "noun" },
  "людей": { root: "mārīnān", pos: "noun" },
  "марсиане": { root: "marzān", pos: "noun" },
  "марсиан": { root: "marzān", pos: "noun" },
  "марсианин": { root: "marzān", pos: "noun" },
  "марсианина": { root: "marzān", pos: "noun" },
  "марсианину": { root: "marzān", pos: "noun" },
  "стол": { root: "xar", pos: "noun" },
  "стола": { root: "xar", pos: "noun" },
  "столу": { root: "xar", pos: "noun" },
  "столом": { root: "xar", pos: "noun" },
  "столы": { root: "xar", pos: "noun" },
  "стул": { root: "xarshū", pos: "noun" },
  "стула": { root: "xarshū", pos: "noun" },
  "стульев": { root: "xarshū", pos: "noun" },
  "стулья": { root: "xarshū", pos: "noun" },
  "кровать": { root: "marlā", pos: "noun" },
  "кровати": { root: "marlā", pos: "noun" },
  "хлеб": { root: "marthō", pos: "noun" },
  "хлеба": { root: "marthō", pos: "noun" },
  "суп": { root: "dzenkhō", pos: "noun" },
  "супа": { root: "dzenkhō", pos: "noun" },
  "мясо": { root: "xarōk", pos: "noun" },
  "мяса": { root: "xarōk", pos: "noun" },
  "гора": { root: "dūr", pos: "noun" },
  "горы": { root: "dūr", pos: "noun" },
  "гор": { root: "dūr", pos: "noun" },
  "лес": { root: "xōl", pos: "noun" },
  "леса": { root: "xōl", pos: "noun" },
  "лесов": { root: "xōl", pos: "noun" },
  "поле": { root: "thalōk", pos: "noun" },
  "поля": { root: "thalōk", pos: "noun" },
  "дождь": { root: "ākhadzen", pos: "noun" },
  "дождя": { root: "ākhadzen", pos: "noun" },
  "буря": { root: "zalkhō", pos: "noun" },
  "бури": { root: "zalkhō", pos: "noun" },
  "радость": { root: "thalmar", pos: "noun" },
  "радости": { root: "thalmar", pos: "noun" },
  "печаль": { root: "mōrmar", pos: "noun" },
  "печали": { root: "mōrmar", pos: "noun" },
  "любовь": { root: "lānmar", pos: "noun" },
  "любви": { root: "lānmar", pos: "noun" },
  "страх": { root: "ghōlmar", pos: "noun" },
  "страха": { root: "ghōlmar", pos: "noun" },
  "гнев": { root: "khanmar", pos: "noun" },
  "гнева": { root: "khanmar", pos: "noun" },
  "желание": { root: "nūrmar", pos: "noun" },
  "желания": { root: "nūrmar", pos: "noun" },
  "работа": { root: "xurmarān", pos: "noun" },
  "работы": { root: "xurmarān", pos: "noun" },
  "ночь": { root: "nōkh", pos: "noun" },
  "ночи": { root: "nōkh", pos: "noun" },
  "день": { root: "sōl", pos: "noun" },
  "дня": { root: "sōl", pos: "noun" },
  "дни": { root: "sōl", pos: "noun" },
  "зверь": { root: "khōr", pos: "noun" },
  "зверя": { root: "khōr", pos: "noun" },
  "звери": { root: "khōr", pos: "noun" },
  "рыба": { root: "ākhakhōr", pos: "noun" },
  "рыбы": { root: "ākhakhōr", pos: "noun" },
  "птица": { root: "zalakhōr", pos: "noun" },
  "птицы": { root: "zalakhōr", pos: "noun" },
  // Прилагательные
  "избранный": { root: "ari", pos: "adj" },
  "избранная": { root: "ari", pos: "adj" },
  "избранное": { root: "ari", pos: "adj" },
  "избранные": { root: "ari", pos: "adj" },
  "великий": { root: "suf", pos: "adj" },
  "великая": { root: "suf", pos: "adj" },
  "великое": { root: "suf", pos: "adj" },
  "великие": { root: "suf", pos: "adj" },
  "древний": { root: "xal", pos: "adj" },
  "древняя": { root: "xal", pos: "adj" },
  "древнее": { root: "xal", pos: "adj" },
  "древние": { root: "xal", pos: "adj" },
  "мудрый": { root: "yar", pos: "adj" },
  "мудрая": { root: "yar", pos: "adj" },
  "мудрое": { root: "yar", pos: "adj" },
  "мудрые": { root: "yar", pos: "adj" },
  "новый": { root: "khal", pos: "adj" },
  "новая": { root: "khal", pos: "adj" },
  "новое": { root: "khal", pos: "adj" },
  "новые": { root: "khal", pos: "adj" },
  "старый": { root: "xal", pos: "adj" },
  "старая": { root: "xal", pos: "adj" },
  "старое": { root: "xal", pos: "adj" },
  "старые": { root: "xal", pos: "adj" },
  // Глаголы (все формы)
  "смотреть": { root: "thal", pos: "verb" },
  "смотрю": { root: "thal", pos: "verb" },
  "смотришь": { root: "thal", pos: "verb" },
  "смотрит": { root: "thal", pos: "verb" },
  "смотрим": { root: "thal", pos: "verb" },
  "смотрите": { root: "thal", pos: "verb" },
  "смотрят": { root: "thal", pos: "verb" },
  "смотрел": { root: "thal", pos: "verb" },
  "смотрела": { root: "thal", pos: "verb" },
  "смотрели": { root: "thal", pos: "verb" },
  "помнить": { root: "lān", pos: "verb" },
  "помню": { root: "lān", pos: "verb" },
  "помнишь": { root: "lān", pos: "verb" },
  "помнит": { root: "lān", pos: "verb" },
  "помним": { root: "lān", pos: "verb" },
  "помните": { root: "lān", pos: "verb" },
  "помнят": { root: "lān", pos: "verb" },
  "помнил": { root: "lān", pos: "verb" },
  "помнила": { root: "lān", pos: "verb" },
  "помнили": { root: "lān", pos: "verb" },
  "знать": { root: "tsan", pos: "verb" },
  "знаю": { root: "tsan", pos: "verb" },
  "знаешь": { root: "tsan", pos: "verb" },
  "знает": { root: "tsan", pos: "verb" },
  "знаем": { root: "tsan", pos: "verb" },
  "знаете": { root: "tsan", pos: "verb" },
  "знают": { root: "tsan", pos: "verb" },
  "знал": { root: "tsan", pos: "verb" },
  "знала": { root: "tsan", pos: "verb" },
  "знали": { root: "tsan", pos: "verb" },
  "умирать": { root: "mōr", pos: "verb" },
  "умираю": { root: "mōr", pos: "verb" },
  "умираешь": { root: "mōr", pos: "verb" },
  "умирает": { root: "mōr", pos: "verb" },
  "умираем": { root: "mōr", pos: "verb" },
  "умираете": { root: "mōr", pos: "verb" },
  "умирают": { root: "mōr", pos: "verb" },
  "умирал": { root: "mōr", pos: "verb" },
  "умирала": { root: "mōr", pos: "verb" },
  "умирали": { root: "mōr", pos: "verb" },
  "жить": { root: "marlān", pos: "verb" },
  "живу": { root: "marlān", pos: "verb" },
  "живёшь": { root: "marlān", pos: "verb" },
  "живёт": { root: "marlān", pos: "verb" },
  "живём": { root: "marlān", pos: "verb" },
  "живёте": { root: "marlān", pos: "verb" },
  "живут": { root: "marlān", pos: "verb" },
  "жил": { root: "marlān", pos: "verb" },
  "жила": { root: "marlān", pos: "verb" },
  "жили": { root: "marlān", pos: "verb" },
  "пить": { root: "khōr", pos: "verb" },
  "пью": { root: "khōr", pos: "verb" },
  "пьёшь": { root: "khōr", pos: "verb" },
  "пьёт": { root: "khōr", pos: "verb" },
  "пьём": { root: "khōr", pos: "verb" },
  "пьёте": { root: "khōr", pos: "verb" },
  "пьют": { root: "khōr", pos: "verb" },
  "пил": { root: "khōr", pos: "verb" },
  "пила": { root: "khōr", pos: "verb" },
  "пили": { root: "khōr", pos: "verb" },
  "играть": { root: "thalur", pos: "verb" },
  "играю": { root: "thalur", pos: "verb" },
  "играешь": { root: "thalur", pos: "verb" },
  "играет": { root: "thalur", pos: "verb" },
  "играем": { root: "thalur", pos: "verb" },
  "играете": { root: "thalur", pos: "verb" },
  "играют": { root: "thalur", pos: "verb" },
  "играл": { root: "thalur", pos: "verb" },
  "играла": { root: "thalur", pos: "verb" },
  "играли": { root: "thalur", pos: "verb" },
  "летать": { root: "zalur", pos: "verb" },
  "летаю": { root: "zalur", pos: "verb" },
  "летаешь": { root: "zalur", pos: "verb" },
  "летает": { root: "zalur", pos: "verb" },
  "летаем": { root: "zalur", pos: "verb" },
  "летаете": { root: "zalur", pos: "verb" },
  "летают": { root: "zalur", pos: "verb" },
  "летал": { root: "zalur", pos: "verb" },
  "летала": { root: "zalur", pos: "verb" },
  "летали": { root: "zalur", pos: "verb" },
  "говорить": { root: "thalthu", pos: "verb" },
  "говорю": { root: "thalthu", pos: "verb" },
  "говоришь": { root: "thalthu", pos: "verb" },
  "говорит": { root: "thalthu", pos: "verb" },
  "говорим": { root: "thalthu", pos: "verb" },
  "говорите": { root: "thalthu", pos: "verb" },
  "говорят": { root: "thalthu", pos: "verb" },
  "говорил": { root: "thalthu", pos: "verb" },
  "говорила": { root: "thalthu", pos: "verb" },
  "говорили": { root: "thalthu", pos: "verb" },
  "любить": { root: "lānmar", pos: "verb" },
  "люблю": { root: "lānmar", pos: "verb" },
  "любишь": { root: "lānmar", pos: "verb" },
  "любит": { root: "lānmar", pos: "verb" },
  "любим": { root: "lānmar", pos: "verb" },
  "любите": { root: "lānmar", pos: "verb" },
  "любят": { root: "lānmar", pos: "verb" },
  "любил": { root: "lānmar", pos: "verb" },
  "любила": { root: "lānmar", pos: "verb" },
  "любили": { root: "lānmar", pos: "verb" },
  "работать": { root: "xurmar", pos: "verb" },
  "работаю": { root: "xurmar", pos: "verb" },
  "работаешь": { root: "xurmar", pos: "verb" },
  "работает": { root: "xurmar", pos: "verb" },
  "работаем": { root: "xurmar", pos: "verb" },
  "работаете": { root: "xurmar", pos: "verb" },
  "работают": { root: "xurmar", pos: "verb" },
  "работал": { root: "xurmar", pos: "verb" },
  "работала": { root: "xurmar", pos: "verb" },
  "работали": { root: "xurmar", pos: "verb" },
  "идти": { root: "nur", pos: "verb" },
  "иду": { root: "nur", pos: "verb" },
  "идёшь": { root: "nur", pos: "verb" },
  "идёт": { root: "nur", pos: "verb" },
  "идём": { root: "nur", pos: "verb" },
  "идёте": { root: "nur", pos: "verb" },
  "идут": { root: "nur", pos: "verb" },
  "шёл": { root: "nur", pos: "verb" },
  "шла": { root: "nur", pos: "verb" },
  "шли": { root: "nur", pos: "verb" },
  "быть": { root: "sen", pos: "verb" },
  "есть": { root: "sen", pos: "verb" },
  "был": { root: "sen", pos: "verb" },
  "была": { root: "sen", pos: "verb" },
  "было": { root: "sen", pos: "verb" },
  "были": { root: "sen", pos: "verb" },
  // Союзы и частицы
  "и": { root: "un", pos: "conj" },
  "но": { root: "kan", pos: "conj" },
  "когда": { root: "tsen", pos: "conj" },
  "потому что": { root: "tal", pos: "conj" },
  "не": { root: "ān", pos: "particle" },
  "нет": { root: "ān", pos: "particle" }
};

// ============================================================
// 1. ЗАГРУЗКА СЛОВАРЯ (сначала пробуем внешний, если нет — встроенный)
// ============================================================
let lexicon = {};
let particles = {};
let suffixes = {};

function loadBuiltinLexicon() {
  lexicon = BUILTIN_LEXICON;
  particles = {};
  suffixes = {};
  document.getElementById('translation').textContent = '✅ Словарь загружен (встроенный, ' + Object.keys(lexicon).length + ' слов). Введите текст.';
  document.getElementById('translation').className = 'result';
}

fetch('/mars-encyclopedia/assets/dictionary.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => {
    lexicon = data.lexicon;
    particles = data.particles || {};
    suffixes = data.suffixes || {};
    document.getElementById('translation').textContent = '✅ Словарь загружен (внешний, ' + Object.keys(lexicon).length + ' слов). Введите текст.';
    document.getElementById('translation').className = 'result';
  })
  .catch(error => {
    console.warn('Внешний словарь не загружен, использую встроенный:', error);
    loadBuiltinLexicon();
  });

// ============================================================
// 2. УЛУЧШЕННАЯ ЛЕММАТИЗАЦИЯ
// ============================================================
function normalize(word) {
  return word.toLowerCase().replace(/ё/g, 'е');
}

// Словарь соответствий личных форм глаголов → инфинитив (для тех, кто не в словаре)
const VERB_LEMMAS = {
  "смотрю": "смотреть", "смотришь": "смотреть", "смотрит": "смотреть",
  "смотрим": "смотреть", "смотрите": "смотреть", "смотрят": "смотреть",
  "смотрел": "смотреть", "смотрела": "смотреть", "смотрели": "смотреть",
  "помню": "помнить", "помнишь": "помнить", "помнит": "помнить",
  "помним": "помнить", "помните": "помнить", "помнят": "помнить",
  "помнил": "помнить", "помнила": "помнить", "помнили": "помнить",
  "знаю": "знать", "знаешь": "знать", "знает": "знать",
  "знаем": "знать", "знаете": "знать", "знают": "знать",
  "знал": "знать", "знала": "знать", "знали": "знать",
  "умираю": "умирать", "умираешь": "умирать", "умирает": "умирать",
  "умираем": "умирать", "умираете": "умирать", "умирают": "умирать",
  "умирал": "умирать", "умирала": "умирать", "умирали": "умирать",
  "живу": "жить", "живёшь": "жить", "живёт": "жить",
  "живём": "жить", "живёте": "жить", "живут": "жить",
  "жил": "жить", "жила": "жить", "жили": "жить",
  "пью": "пить", "пьёшь": "пить", "пьёт": "пить",
  "пьём": "пить", "пьёте": "пить", "пьют": "пить",
  "пил": "пить", "пила": "пить", "пили": "пить",
  "играю": "играть", "играешь": "играть", "играет": "играть",
  "играем": "играть", "играете": "играть", "играют": "играть",
  "играл": "играть", "играла": "играть", "играли": "играть",
  "летаю": "летать", "летаешь": "летать", "летает": "летать",
  "летаем": "летать", "летаете": "летать", "летают": "летать",
  "летал": "летать", "летала": "летать", "летали": "летать",
  "говорю": "говорить", "говоришь": "говорить", "говорит": "говорить",
  "говорим": "говорить", "говорите": "говорить", "говорят": "говорить",
  "говорил": "говорить", "говорила": "говорить", "говорили": "говорить",
  "люблю": "любить", "любишь": "любить", "любит": "любить",
  "любим": "любить", "любите": "любить", "любят": "любить",
  "любил": "любить", "любила": "любить", "любили": "любить",
  "работаю": "работать", "работаешь": "работать", "работает": "работать",
  "работаем": "работать", "работаете": "работать", "работают": "работать",
  "работал": "работать", "работала": "работать", "работали": "работать",
  "иду": "идти", "идёшь": "идти", "идёт": "идти",
  "идём": "идти", "идёте": "идти", "идут": "идти",
  "шёл": "идти", "шла": "идти", "шли": "идти"
};

function findInLexicon(word) {
  const norm = normalize(word);
  // Сначала ищем точное совпадение
  if (lexicon[norm]) {
    return { found: true, entry: lexicon[norm], lemma: norm };
  }
  // Пробуем привести глагол к инфинитиву
  if (VERB_LEMMAS[norm]) {
    const inf = VERB_LEMMAS[norm];
    if (lexicon[inf]) {
      return { found: true, entry: lexicon[inf], lemma: inf };
    }
  }
  // Убираем окончания существительных (падежи)
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
  // Если не нашли, возвращаем false
  return { found: false };
}

// ============================================================
// 3. ОСНОВНАЯ ЛОГИКА ПЕРЕВОДА
// ============================================================
const PREPOSITIONS = ['на', 'в', 'у', 'к', 'от', 'из', 'для', 'без', 'через', 'по', 'о', 'об', 'с', 'со', 'за', 'под', 'над', 'перед', 'между', 'возле', 'около', 'мимо', 'вокруг'];
const PLURAL_WORDS = [
  'звёзды','звезды','звёзд','звезд',
  'воды','вод','реки','рек','горы','гор',
  'люди','людей','марсиане','марсиан',
  'дома','домов','столы','столов','стулья','стульев',
  'кровати','кроватей','леса','лесов','поля','полей',
  'дети','детей','глаза','глаз'
];

function translateText() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    document.getElementById('translation').textContent = 'Введите текст для перевода.';
    document.getElementById('gloss').textContent = '';
    return;
  }

  const rawWords = input.split(/\s+/).filter(w => w.length > 0);
  let processed = [];
  let unknown = [];

  rawWords.forEach(w => {
    const clean = w.replace(/[^а-яa-zё]/gi, '').toLowerCase();
    if (PREPOSITIONS.includes(clean)) return;

    const result = findInLexicon(clean);
    if (result.found) {
      const entry = result.entry;
      let root = entry.root;
      let pos = entry.pos;
      let plural = false;
      if (pos === 'noun' || pos === 'adj') {
        if (root.endsWith('ān')) plural = true;
        else if (PLURAL_WORDS.includes(clean)) plural = true;
      }
      let adj = (pos === 'adj');
      processed.push({ word: w, root: root, pos: pos, plural: plural, adj: adj });
    } else {
      unknown.push(w);
      processed.push({ word: w, root: w, pos: 'unknown', plural: false, adj: false });
    }
  });

  if (processed.length === 0) {
    document.getElementById('translation').textContent = 'Нет слов для перевода (только предлоги).';
    document.getElementById('gloss').textContent = '';
    return;
  }

  // Разделение на подлежащее, дополнение, глагол
  let subject = [], objects = [], verb = null, verbIdx = -1;
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
    subject = processed;
  }

  let resultWords = [];

  function addWord(wordObj) {
    let root = wordObj.root;
    if (wordObj.plural && (wordObj.pos === 'noun' || wordObj.pos === 'adj') && !root.endsWith('ān')) {
      const last = root.charAt(root.length - 1);
      const vowels = ['a','ā','o','ō','u','ū','e','i'];
      if (vowels.includes(last.toLowerCase())) root += 'zān';
      else root += 'ān';
    }
    resultWords.push(root);
  }

  let subjNouns = subject.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let subjAdjs = subject.filter(w => w.pos === 'adj');
  subjNouns.forEach(w => addWord(w));
  subjAdjs.forEach(w => addWord(w));

  let objNouns = objects.filter(w => w.pos === 'noun' || w.pos === 'pron');
  let objAdjs = objects.filter(w => w.pos === 'adj');
  objNouns.forEach(w => addWord(w));
  objAdjs.forEach(w => addWord(w));

  if (verb) resultWords.push(verb.root);

  // Грамматические частицы
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
  if (input.includes('?')) resultWords.push('kha');

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
    if (idx !== -1) resultWords[idx] = verb.root + modalSuffix;
  }

  // Сослагательное наклонение
  if (lowerInput.includes('бы') || lowerInput.includes('чтобы')) {
    if (verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) resultWords.splice(idx, 0, 'kha');
    }
  }

  // Пассив
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

  // Эвокативы
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

  // Вывод
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
  if (unknown.length > 0) glossText += ' ⚠️ неизвестные: ' + unknown.join(', ');
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

document.getElementById('inputText').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) translateText();
});
</script>
