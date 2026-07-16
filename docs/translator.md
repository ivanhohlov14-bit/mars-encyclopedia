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
  <button onclick="toggleGlyphs()" class="secondary" id="glyphToggle">🔮 Иероглифы</button>
</div>
  <div id="output">
    <div class="result" id="translation">Здесь появится перевод...</div>
    <div class="gloss" id="gloss"></div>
  </div>
  <div class="footer">
  © 2026 Mnemis. Все права защищены. 
  <a href="/license" target="_blank">Лицензия CC BY-NC-ND</a>
</div>
</div>

<script>
// ============================================================
// 0. ПОЛНЫЙ ВСТРОЕННЫЙ СЛОВАРЬ (БОЛЕЕ 500 СЛОВ)
// ============================================================
const LEXICON_DATA = {
  // ============================================================
  // 1. МЕСТОИМЕНИЯ (все падежи)
  // ============================================================
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

  // ============================================================
  // 2. СУЩЕСТВИТЕЛЬНЫЕ (основные)
  // ============================================================
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
  "камень": { root: "ghar", pos: "noun" },
  "камня": { root: "ghar", pos: "noun" },
  "камни": { root: "ghar", pos: "noun" },
  "тень": { root: "ghōl", pos: "noun" },
  "тени": { root: "ghōl", pos: "noun" },
  "родина": { root: "ariya", pos: "noun" },
  "свет": { root: "dzēn", pos: "noun" },
  "знание": { root: "tsan", pos: "noun" },
  "знания": { root: "tsan", pos: "noun" },
  "гибель": { root: "mōrkhō", pos: "noun" },
  "кухня": { root: "ōkhsen", pos: "noun" },
  "дверь": { root: "tōkh", pos: "noun" },
  "двери": { root: "tōkh", pos: "noun" },
  "порог": { root: "tōkhsen", pos: "noun" },
  "стена": { root: "gharōkh", pos: "noun" },
  "стены": { root: "gharōkh", pos: "noun" },
  "север": { root: "khūr", pos: "noun" },
  "ткань": { root: "thōl", pos: "noun" },
  "одежда": { root: "thōlīn", pos: "noun" },
  "шерсть": { root: "kharm", pos: "noun" },
  "плащ": { root: "kharmīn", pos: "noun" },
  "пояс": { root: "sūk", pos: "noun" },
  "предки": { root: "xalmar", pos: "noun" },
  "год": { root: "amār", pos: "noun" },
  "года": { root: "amār", pos: "noun" },
  "лет": { root: "amār", pos: "noun" },
  "солнце": { root: "khō", pos: "noun" },
  "обсерватория": { root: "dzensen", pos: "noun" },
  "вулкан": { root: "khōsen", pos: "noun" },
  "крепость": { root: "gharokh", pos: "noun" },
  "окхасен": { root: "Okhasen", pos: "noun" },
  "ксанф": { root: "Ksanf", pos: "noun" },
  "город": { root: "okh", pos: "noun" },
  "города": { root: "okh", pos: "noun" },
  "городу": { root: "okh", pos: "noun" },
  "городом": { root: "okh", pos: "noun" },
  "городе": { root: "okh", pos: "noun" },
  "побережье": { root: "ākhasen", pos: "noun" },
  "побережья": { root: "ākhasen", pos: "noun" },
  "побережью": { root: "ākhasen", pos: "noun" },
  "побережьем": { root: "ākhasen", pos: "noun" },
  "пустыня": { root: "xalkōl", pos: "noun" },
  "пустыни": { root: "xalkōl", pos: "noun" },
  "пустыню": { root: "xalkōl", pos: "noun" },
  "пустыней": { root: "xalkōl", pos: "noun" },
  "пустыне": { root: "xalkōl", pos: "noun" },
  "музыка": { root: "sōlmar", pos: "noun" },
  "музыку": { root: "sōlmar", pos: "noun" },
  "музыки": { root: "sōlmar", pos: "noun" },
  "музыкой": { root: "sōlmar", pos: "noun" },
  "струна": { root: "thōl", pos: "noun" },
  "струны": { root: "thōl", pos: "noun" },
  "струн": { root: "thōl", pos: "noun" },
  "металл": { root: "khōs", pos: "noun" },
  "металла": { root: "khōs", pos: "noun" },
  "металлу": { root: "khōs", pos: "noun" },
  "металлом": { root: "khōs", pos: "noun" },
  "металле": { root: "khōs", pos: "noun" },
  "порт": { root: "sen", pos: "noun" },
  "порта": { root: "sen", pos: "noun" },
  "порту": { root: "sen", pos: "noun" },
  "портом": { root: "sen", pos: "noun" },
  "порте": { root: "sen", pos: "noun" },
  "глина": { root: "sur", pos: "noun" },
  "глины": { root: "sur", pos: "noun" },
  "глине": { root: "sur", pos: "noun" },
  "глину": { root: "sur", pos: "noun" },
  "глиной": { root: "sur", pos: "noun" },
  "глиняных": { root: "sur", pos: "noun" },
  "табличка": { root: "lān", pos: "noun" },
  "таблички": { root: "lān", pos: "noun" },
  "табличек": { root: "lān", pos: "noun" },
  "табличках": { root: "lān", pos: "noun" },
  "табличку": { root: "lān", pos: "noun" },
  "храм": { root: "sen", pos: "noun" },
  "храма": { root: "sen", pos: "noun" },
  "храме": { root: "sen", pos: "noun" },
  "историк": { root: "xalur", pos: "noun" },
  "историка": { root: "xalur", pos: "noun" },
  "писец": { root: "khalur", pos: "noun" },
  "писца": { root: "khalur", pos: "noun" },
  "хранитель": { root: "lānīn", pos: "noun" },
  "хранителя": { root: "lānīn", pos: "noun" },
  "архив": { root: "lānsen", pos: "noun" },
  "архива": { root: "lānsen", pos: "noun" },
  "архиве": { root: "lānsen", pos: "noun" },
  "история": { root: "lānkhō", pos: "noun" },
  "истории": { root: "lānkhō", pos: "noun" },
  "география": { root: "kōlkhō", pos: "noun" },
  "географии": { root: "kōlkhō", pos: "noun" },
  "культура": { root: "xalmar", pos: "noun" },
  "культуры": { root: "xalmar", pos: "noun" },
  "народ": { root: "mārīn", pos: "noun" },
  "народы": { root: "mārīnān", pos: "noun" },
  "персонаж": { root: "mārīn", pos: "noun" },
  "персонажи": { root: "mārīnān", pos: "noun" },
  "событие": { root: "thal", pos: "noun" },
  "события": { root: "thal", pos: "noun" },
  "артефакт": { root: "gharokh", pos: "noun" },
  "артефакты": { root: "gharokh", pos: "noun" },
  "книга": { root: "kitab", pos: "noun" },
  "книги": { root: "kitab", pos: "noun" },
  "книгу": { root: "kitab", pos: "noun" },
  "книг": { root: "kitab", pos: "noun" },
  "книгах": { root: "kitab", pos: "noun" },
  "телескоп": { root: "dzenur", pos: "noun" },
  "телескопа": { root: "dzenur", pos: "noun" },
  "имя": { root: "nām", pos: "noun" },
  "имени": { root: "nām", pos: "noun" },
  "имена": { root: "nām", pos: "noun" },
  "вселенная": { root: "dzenlān", pos: "noun" },
  "вселенной": { root: "dzenlān", pos: "noun" },
  "письмо": { root: "khalur", pos: "noun" },
  "письма": { root: "khalur", pos: "noun" },
  "пыль": { root: "sur", pos: "noun" },
  "пыли": { root: "sur", pos: "noun" },
  "энциклопедия": { root: "tsankhō", pos: "noun" },
  "энциклопедии": { root: "tsankhō", pos: "noun" },
  "ресурс": { root: "lān", pos: "noun" },
  "ресурсы": { root: "lān", pos: "noun" },
  "цикл": { root: "amār", pos: "noun" },
  "цикла": { root: "amār", pos: "noun" },
  "роман": { root: "thal", pos: "noun" },
  "романов": { root: "thal", pos: "noun" },
  "автор": { root: "khalur", pos: "noun" },
  "автора": { root: "khalur", pos: "noun" },
  "наука": { root: "tsankhō", pos: "noun" },
  "науки": { root: "tsankhō", pos: "noun" },
  "исследование": { root: "xur", pos: "noun" },
  "исследования": { root: "xur", pos: "noun" },
  "знаний": { root: "tsan", pos: "noun" },
  "материалы": { root: "lān", pos: "noun" },
  "высота": { root: "dzenur", pos: "noun" },
  "высоты": { root: "dzenur", pos: "noun" },
  "высотой": { root: "dzenur", pos: "noun" },
  "высоту": { root: "dzenur", pos: "noun" },
  "низина": { root: "kōlur", pos: "noun" },
  "низины": { root: "kōlur", pos: "noun" },
  "низиной": { root: "kōlur", pos: "noun" },
  "низину": { root: "kōlur", pos: "noun" },
  "грусть": { root: "mōrmar", pos: "noun" },
  "грусти": { root: "mōrmar", pos: "noun" },
  "грустью": { root: "mōrmar", pos: "noun" },
  "помощь": { root: "lānīn", pos: "noun" },
  "помощи": { root: "lānīn", pos: "noun" },
  "помощью": { root: "lānīn", pos: "noun" },
  "покой": { root: "nōkh", pos: "noun" },
  "покоя": { root: "nōkh", pos: "noun" },
  "покоем": { root: "nōkh", pos: "noun" },
  "убежище": { root: "ānsen", pos: "noun" },
  "убежищу": { root: "ānsen", pos: "noun" },
  "убежищем": { root: "ānsen", pos: "noun" },
  "убежища": { root: "ānsen", pos: "noun" },

  // ============================================================
  // 2.1 НОВЫЕ ФИЛОСОФСКИЕ ПОНЯТИЯ
  // ============================================================
  // МАЛО (корень "hōr" — песчинка)
  "мало": { root: "hōr", pos: "adv" },
  "малая": { root: "hōr", pos: "adv" },
  "малый": { root: "hōr", pos: "adv" },
  "малое": { root: "hōr", pos: "adv" },
  "малые": { root: "hōr", pos: "adv" },
  "маленький": { root: "hōr", pos: "adj" },
  "маленькая": { root: "hōr", pos: "adj" },
  "маленькое": { root: "hōr", pos: "adj" },
  "маленькие": { root: "hōr", pos: "adj" },
  "малого": { root: "hōr", pos: "adj" },
  "малому": { root: "hōr", pos: "adj" },
  "малым": { root: "hōr", pos: "adj" },
  "малой": { root: "hōr", pos: "adj" },
  "маленьким": { root: "hōr", pos: "adj" },
  "маленькими": { root: "hōr", pos: "adj" },
  "маленьких": { root: "hōr", pos: "adj" },

  // КОНЕЦ (корень "rak" — граница)
  "конец": { root: "rak", pos: "noun" },
  "конца": { root: "rak", pos: "noun" },
  "концу": { root: "rak", pos: "noun" },
  "концом": { root: "rak", pos: "noun" },
  "конце": { root: "rak", pos: "noun" },
  "концы": { root: "rak", pos: "noun" },
  "концов": { root: "rak", pos: "noun" },
  "конечный": { root: "rak", pos: "adj" },
  "конечная": { root: "rak", pos: "adj" },
  "конечное": { root: "rak", pos: "adj" },
  "конечные": { root: "rak", pos: "adj" },

  // НАЧАЛО (корень "khān" — родник)
  "начало": { root: "khān", pos: "noun" },
  "начала": { root: "khān", pos: "noun" },
  "началу": { root: "khān", pos: "noun" },
  "началом": { root: "khān", pos: "noun" },
  "начале": { root: "khān", pos: "noun" },
  "начал": { root: "khān", pos: "noun" },
  "начальный": { root: "khān", pos: "adj" },
  "начальная": { root: "khān", pos: "adj" },
  "начальное": { root: "khān", pos: "adj" },
  "начальные": { root: "khān", pos: "adj" },

  // МНОГО (корень "sūr" — изобилие)
  "много": { root: "sūr", pos: "adv" },
  "множество": { root: "sūr", pos: "noun" },
  "множества": { root: "sūr", pos: "noun" },

  // ОГРОМНЫЙ (sūr + hōr)
  "огромный": { root: "sūrhōr", pos: "adj" },
  "огромная": { root: "sūrhōr", pos: "adj" },
  "огромное": { root: "sūrhōr", pos: "adj" },
  "огромные": { root: "sūrhōr", pos: "adj" },
  "огромного": { root: "sūrhōr", pos: "adj" },
  "огромному": { root: "sūrhōr", pos: "adj" },
  "огромным": { root: "sūrhōr", pos: "adj" },
  "огромной": { root: "sūrhōr", pos: "adj" },

  // БЕСКОНЕЧНЫЙ (ān + rak)
  "бесконечный": { root: "ānrak", pos: "adj" },
  "бесконечная": { root: "ānrak", pos: "adj" },
  "бесконечное": { root: "ānrak", pos: "adj" },
  "бесконечные": { root: "ānrak", pos: "adj" },

  // ВОЗВРАЩЕНИЕ (thalān)
  "возвращение": { root: "thalān", pos: "noun" },
  "возвращения": { root: "thalān", pos: "noun" },
  "возвращению": { root: "thalān", pos: "noun" },
  "возвращением": { root: "thalān", pos: "noun" },
  "возвращении": { root: "thalān", pos: "noun" },

  // ============================================================
  // 2.2 ЦВЕТА (улучшенная этимология)
  // ============================================================
  "красный": { root: "khōn", pos: "adj" },
  "красная": { root: "khōn", pos: "adj" },
  "красное": { root: "khōn", pos: "adj" },
  "красные": { root: "khōn", pos: "adj" },
  "красного": { root: "khōn", pos: "adj" },
  "красному": { root: "khōn", pos: "adj" },
  "красным": { root: "khōn", pos: "adj" },

  "синий": { root: "ākhan", pos: "adj" },
  "синяя": { root: "ākhan", pos: "adj" },
  "синее": { root: "ākhan", pos: "adj" },
  "синие": { root: "ākhan", pos: "adj" },

  "голубой": { root: "dzenān", pos: "adj" },
  "голубая": { root: "dzenān", pos: "adj" },
  "голубое": { root: "dzenān", pos: "adj" },
  "голубые": { root: "dzenān", pos: "adj" },

  "зелёный": { root: "marn", pos: "adj" },
  "зелёная": { root: "marn", pos: "adj" },
  "зелёное": { root: "marn", pos: "adj" },
  "зелёные": { root: "marn", pos: "adj" },

  "жёлтый": { root: "dzenk", pos: "adj" },
  "жёлтая": { root: "dzenk", pos: "adj" },
  "жёлтое": { root: "dzenk", pos: "adj" },
  "жёлтые": { root: "dzenk", pos: "adj" },

  "белый": { root: "lānk", pos: "adj" },
  "белая": { root: "lānk", pos: "adj" },
  "белое": { root: "lānk", pos: "adj" },
  "белые": { root: "lānk", pos: "adj" },

  "чёрный": { root: "kōln", pos: "adj" },
  "чёрная": { root: "kōln", pos: "adj" },
  "чёрное": { root: "kōln", pos: "adj" },
  "чёрные": { root: "kōln", pos: "adj" },

  "фиолетовый": { root: "xaln", pos: "adj" },
  "фиолетовая": { root: "xaln", pos: "adj" },
  "фиолетовое": { root: "xaln", pos: "adj" },
  "фиолетовые": { root: "xaln", pos: "adj" },

  "оранжевый": { root: "khōsenk", pos: "adj" },
  "оранжевая": { root: "khōsenk", pos: "adj" },
  "оранжевое": { root: "khōsenk", pos: "adj" },
  "оранжевые": { root: "khōsenk", pos: "adj" },

  "розовый": { root: "sōln", pos: "adj" },
  "розовая": { root: "sōln", pos: "adj" },
  "розовое": { root: "sōln", pos: "adj" },
  "розовые": { root: "sōln", pos: "adj" },

  "коричневый": { root: "gharn", pos: "adj" },
  "коричневая": { root: "gharn", pos: "adj" },
  "коричневое": { root: "gharn", pos: "adj" },
  "коричневые": { root: "gharn", pos: "adj" },

  "серый": { root: "xalkōln", pos: "adj" },
  "серая": { root: "xalkōln", pos: "adj" },
  "серое": { root: "xalkōln", pos: "adj" },
  "серые": { root: "xalkōln", pos: "adj" },

  // ============================================================
  // 2.3 ЧИСЛИТЕЛЬНЫЕ (двадцатеричная система)
  // ============================================================
  "один": { root: "on", pos: "num" },
  "одна": { root: "on", pos: "num" },
  "одно": { root: "on", pos: "num" },
  "одни": { root: "on", pos: "num" },
  "два": { root: "dōn", pos: "num" },
  "две": { root: "dōn", pos: "num" },
  "три": { root: "tren", pos: "num" },
  "четыре": { root: "khen", pos: "num" },
  "пять": { root: "phin", pos: "num" },
  "шесть": { root: "kōl-dzen", pos: "num" },
  "семь": { root: "thōl", pos: "num" },
  "восемь": { root: "ākha-thōl", pos: "num" },
  "девять": { root: "khan-thōl", pos: "num" },
  "десять": { root: "dzen-on", pos: "num" },
  "двадцать": { root: "dzen-dōn", pos: "num" },
  "сто": { root: "dzen-phin", pos: "num" },

  // ============================================================
  // 2.4 НЕДОСТАЮЩИЕ ФИЛОСОФСКИЕ ПОНЯТИЯ
  // ============================================================
  "правда": { root: "thaltsan", pos: "noun" },
  "правды": { root: "thaltsan", pos: "noun" },
  "правдой": { root: "thaltsan", pos: "noun" },
  "ложь": { root: "ānthaltsan", pos: "noun" },
  "лжи": { root: "ānthaltsan", pos: "noun" },
  "ложью": { root: "ānthaltsan", pos: "noun" },
  "надежда": { root: "lānthōl", pos: "noun" },
  "надежды": { root: "lānthōl", pos: "noun" },
  "надеждой": { root: "lānthōl", pos: "noun" },
  "вера": { root: "khalmar", pos: "noun" },
  "веры": { root: "khalmar", pos: "noun" },
  "верой": { root: "khalmar", pos: "noun" },
  "свобода": { root: "nurariya", pos: "noun" },
  "свободы": { root: "nurariya", pos: "noun" },
  "свободой": { root: "nurariya", pos: "noun" },
  "справедливость": { root: "aritsan", pos: "noun" },
  "справедливости": { root: "aritsan", pos: "noun" },
  "деревня": { root: "hōrokh", pos: "noun" },
  "деревни": { root: "hōrokh", pos: "noun" },
  "деревней": { root: "hōrokh", pos: "noun" },
  "мир (отсутствие войны)": { root: "nōkh", pos: "noun" },
  "мира": { root: "nōkh", pos: "noun" },
  "миром": { root: "nōkh", pos: "noun" },
  "война": { root: "mōrkhō", pos: "noun" },
  "войны": { root: "mōrkhō", pos: "noun" },
  "войной": { root: "mōrkhō", pos: "noun" },
  "трон": { root: "rogen", pos: "noun" },
  "троне": { root: "rogen", pos: "noun" },
  "трону": { root: "rogen", pos: "noun" },
  "трона": { root: "rogen", pos: "noun" },
  // ============================================================
  // 3. ПРИЛАГАТЕЛЬНЫЕ (основные)
  // ============================================================
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
  "живой": { root: "mar", pos: "adj" },
  "жива": { root: "mar", pos: "adj" },
  "живо": { root: "mar", pos: "adj" },
  "живы": { root: "mar", pos: "adj" },
  "жив": { root: "mar", pos: "adj" },
  "красивый": { root: "suf", pos: "adj" },
  "красивая": { root: "suf", pos: "adj" },
  "красивое": { root: "suf", pos: "adj" },
  "красивые": { root: "suf", pos: "adj" },
  "прекрасный": { root: "suf", pos: "adj" },
  "прекрасная": { root: "suf", pos: "adj" },
  "прекрасное": { root: "suf", pos: "adj" },
  "прекрасные": { root: "suf", pos: "adj" },
  "металлический": { root: "khōsīn", pos: "adj" },
  "металлическая": { root: "khōsīn", pos: "adj" },
  "металлическое": { root: "khōsīn", pos: "adj" },
  "металлические": { root: "khōsīn", pos: "adj" },
  "подземный": { root: "kōl", pos: "adj" },
  "подземная": { root: "kōl", pos: "adj" },
  "подземное": { root: "kōl", pos: "adj" },
  "подземном": { root: "kōl", pos: "adj" },
  "главный": { root: "ari", pos: "adj" },
  "главная": { root: "ari", pos: "adj" },
  "главное": { root: "ari", pos: "adj" },
  "плодородный": { root: "mar", pos: "adj" },
  "плодородная": { root: "mar", pos: "adj" },
  "плодородное": { root: "mar", pos: "adj" },
  "плодородные": { root: "mar", pos: "adj" },
  "независимый": { root: "ari", pos: "adj" },
  "независимая": { root: "ari", pos: "adj" },
  "независимое": { root: "ari", pos: "adj" },
  "справочный": { root: "tsan", pos: "adj" },
  "справочная": { root: "tsan", pos: "adj" },
  "справочное": { root: "tsan", pos: "adj" },
  "посвящённый": { root: "lān", pos: "adj" },
  "посвящённая": { root: "lān", pos: "adj" },
  "посвящённое": { root: "lān", pos: "adj" },
  "звёздный": { root: "dzen", pos: "adj" },
  "звёздная": { root: "dzen", pos: "adj" },
  "звёздное": { root: "dzen", pos: "adj" },
  "звёздном": { root: "dzen", pos: "adj" },
  "звёздную": { root: "dzen", pos: "adj" },
  "голубокровный": { root: "ākhazān", pos: "adj" },
  "голубокровная": { root: "ākhazān", pos: "adj" },
  "голубокровное": { root: "ākhazān", pos: "adj" },
  "голубокровные": { root: "ākhazān", pos: "adj" },
  "шестипалый": { root: "khōrap", pos: "adj" },
  "шестипалая": { root: "khōrap", pos: "adj" },
  "шестипалое": { root: "khōrap", pos: "adj" },
  "шестипалые": { root: "khōrap", pos: "adj" },
  "шестипалых": { root: "khōrap", pos: "adj" },
  "чуждый": { root: "kōl", pos: "adj" },
  "чужая": { root: "kōl", pos: "adj" },
  "чужое": { root: "kōl", pos: "adj" },
  "чужие": { root: "kōl", pos: "adj" },
  "суровый": { root: "khōsen", pos: "adj" },
  "суровая": { root: "khōsen", pos: "adj" },
  "суровое": { root: "khōsen", pos: "adj" },
  "суровые": { root: "khōsen", pos: "adj" },
  "священный": { root: "lānīn", pos: "adj" },
  "священная": { root: "lānīn", pos: "adj" },
  "священное": { root: "lānīn", pos: "adj" },
  "священные": { root: "lānīn", pos: "adj" },
  "добрый": { root: "suf", pos: "adj" },
  "добрая": { root: "suf", pos: "adj" },
  "доброе": { root: "suf", pos: "adj" },
  "доброй": { root: "suf", pos: "adj" },
  "добрую": { root: "suf", pos: "adj" },
  "добрым": { root: "suf", pos: "adj" },
  "добрыми": { root: "suf", pos: "adj" },
  "добрых": { root: "suf", pos: "adj" },
  "яркий": { root: "dzēn", pos: "adj" },
  "яркая": { root: "dzēn", pos: "adj" },
  "яркое": { root: "dzēn", pos: "adj" },
  "ярким": { root: "dzēn", pos: "adj" },
  "яркими": { root: "dzēn", pos: "adj" },
  "ярких": { root: "dzēn", pos: "adj" },
  "жаркий": { root: "khō", pos: "adj" },
  "жаркая": { root: "khō", pos: "adj" },
  "жаркое": { root: "khō", pos: "adj" },
  "жарким": { root: "khō", pos: "adj" },
  "жаркими": { root: "khō", pos: "adj" },
  "жарких": { root: "khō", pos: "adj" },
  "мёртвый": { root: "mōr", pos: "adj" },
  "мёртвая": { root: "mōr", pos: "adj" },
  "мёртвое": { root: "mōr", pos: "adj" },
  "мёртвые": { root: "mōr", pos: "adj" },
  "мёртвой": { root: "mōr", pos: "adj" },
  "мёртвым": { root: "mōr", pos: "adj" },

  // ============================================================
  // 4. ГЛАГОЛЫ (все основные формы)
  // ============================================================
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
  "выжить": { root: "marlān", pos: "verb" },
  "выживу": { root: "marlān", pos: "verb" },
  "выживешь": { root: "marlān", pos: "verb" },
  "выживет": { root: "marlān", pos: "verb" },
  "выживем": { root: "marlān", pos: "verb" },
  "выживете": { root: "marlān", pos: "verb" },
  "выживут": { root: "marlān", pos: "verb" },
  "выжил": { root: "marlān", pos: "verb" },
  "выжила": { root: "marlān", pos: "verb" },
  "выжили": { root: "marlān", pos: "verb" },
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
  "полететь": { root: "zalur", pos: "verb" },
  "полечу": { root: "zalur", pos: "verb" },
  "полетишь": { root: "zalur", pos: "verb" },
  "полетит": { root: "zalur", pos: "verb" },
  "полетим": { root: "zalur", pos: "verb" },
  "полетите": { root: "zalur", pos: "verb" },
  "полетят": { root: "zalur", pos: "verb" },
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
  "пойти": { root: "nur", pos: "verb" },
  "пойду": { root: "nur", pos: "verb" },
  "пойдёшь": { root: "nur", pos: "verb" },
  "пойдёт": { root: "nur", pos: "verb" },
  "пойдём": { root: "nur", pos: "verb" },
  "пойдёте": { root: "nur", pos: "verb" },
  "пойдут": { root: "nur", pos: "verb" },
  "пошёл": { root: "nur", pos: "verb" },
  "пошла": { root: "nur", pos: "verb" },
  "пошли": { root: "nur", pos: "verb" },
  "быть": { root: "sen", pos: "verb" },
  "есть": { root: "sen", pos: "verb" },
  "был": { root: "sen", pos: "verb" },
  "была": { root: "sen", pos: "verb" },
  "было": { root: "sen", pos: "verb" },
  "были": { root: "sen", pos: "verb" },
  "думать": { root: "tsanur", pos: "verb" },
  "думаю": { root: "tsanur", pos: "verb" },
  "думаешь": { root: "tsanur", pos: "verb" },
  "думает": { root: "tsanur", pos: "verb" },
  "думаем": { root: "tsanur", pos: "verb" },
  "думаете": { root: "tsanur", pos: "verb" },
  "думают": { root: "tsanur", pos: "verb" },
  "думал": { root: "tsanur", pos: "verb" },
  "думала": { root: "tsanur", pos: "verb" },
  "думали": { root: "tsanur", pos: "verb" },
  "понимать": { root: "tsanlān", pos: "verb" },
  "понимаю": { root: "tsanlān", pos: "verb" },
  "понимаешь": { root: "tsanlān", pos: "verb" },
  "понимает": { root: "tsanlān", pos: "verb" },
  "понимаем": { root: "tsanlān", pos: "verb" },
  "понимаете": { root: "tsanlān", pos: "verb" },
  "понимают": { root: "tsanlān", pos: "verb" },
  "понимал": { root: "tsanlān", pos: "verb" },
  "понимала": { root: "tsanlān", pos: "verb" },
  "понимали": { root: "tsanlān", pos: "verb" },
  "бежать": { root: "nurkhō", pos: "verb" },
  "бегу": { root: "nurkhō", pos: "verb" },
  "бежишь": { root: "nurkhō", pos: "verb" },
  "бежит": { root: "nurkhō", pos: "verb" },
  "бежим": { root: "nurkhō", pos: "verb" },
  "бежите": { root: "nurkhō", pos: "verb" },
  "бегут": { root: "nurkhō", pos: "verb" },
  "бежал": { root: "nurkhō", pos: "verb" },
  "бежала": { root: "nurkhō", pos: "verb" },
  "бежали": { root: "nurkhō", pos: "verb" },
  "стоять": { root: "okhsen", pos: "verb" },
  "стою": { root: "okhsen", pos: "verb" },
  "стоишь": { root: "okhsen", pos: "verb" },
  "стоит": { root: "okhsen", pos: "verb" },
  "стоим": { root: "okhsen", pos: "verb" },
  "стоите": { root: "okhsen", pos: "verb" },
  "стоят": { root: "okhsen", pos: "verb" },
  "стоял": { root: "okhsen", pos: "verb" },
  "стояла": { root: "okhsen", pos: "verb" },
  "стояли": { root: "okhsen", pos: "verb" },
  "лежать": { root: "marlān", pos: "verb" },
  "лежу": { root: "marlān", pos: "verb" },
  "лежишь": { root: "marlān", pos: "verb" },
  "лежит": { root: "marlān", pos: "verb" },
  "лежим": { root: "marlān", pos: "verb" },
  "лежите": { root: "marlān", pos: "verb" },
  "лежат": { root: "marlān", pos: "verb" },
  "лежал": { root: "marlān", pos: "verb" },
  "лежала": { root: "marlān", pos: "verb" },
  "лежали": { root: "marlān", pos: "verb" },
  "строить": { root: "okhar", pos: "verb" },
  "строю": { root: "okhar", pos: "verb" },
  "строишь": { root: "okhar", pos: "verb" },
  "строит": { root: "okhar", pos: "verb" },
  "строим": { root: "okhar", pos: "verb" },
  "строите": { root: "okhar", pos: "verb" },
  "строят": { root: "okhar", pos: "verb" },
  "строил": { root: "okhar", pos: "verb" },
  "строила": { root: "okhar", pos: "verb" },
  "строили": { root: "okhar", pos: "verb" },
  "построить": { root: "okhar", pos: "verb" },
  "построю": { root: "okhar", pos: "verb" },
  "построишь": { root: "okhar", pos: "verb" },
  "построит": { root: "okhar", pos: "verb" },
  "построим": { root: "okhar", pos: "verb" },
  "построите": { root: "okhar", pos: "verb" },
  "построят": { root: "okhar", pos: "verb" },
  "построил": { root: "okhar", pos: "verb" },
  "построила": { root: "okhar", pos: "verb" },
  "построили": { root: "okhar", pos: "verb" },
  "разрушать": { root: "mōrkhō", pos: "verb" },
  "разрушаю": { root: "mōrkhō", pos: "verb" },
  "разрушаешь": { root: "mōrkhō", pos: "verb" },
  "разрушает": { root: "mōrkhō", pos: "verb" },
  "разрушаем": { root: "mōrkhō", pos: "verb" },
  "разрушаете": { root: "mōrkhō", pos: "verb" },
  "разрушают": { root: "mōrkhō", pos: "verb" },
  "разрушал": { root: "mōrkhō", pos: "verb" },
  "разрушала": { root: "mōrkhō", pos: "verb" },
  "разрушали": { root: "mōrkhō", pos: "verb" },
  "создавать": { root: "khalur", pos: "verb" },
  "создаю": { root: "khalur", pos: "verb" },
  "создаёшь": { root: "khalur", pos: "verb" },
  "создаёт": { root: "khalur", pos: "verb" },
  "создаём": { root: "khalur", pos: "verb" },
  "создаёте": { root: "khalur", pos: "verb" },
  "создают": { root: "khalur", pos: "verb" },
  "создавал": { root: "khalur", pos: "verb" },
  "создавала": { root: "khalur", pos: "verb" },
  "создавали": { root: "khalur", pos: "verb" },
  "расти": { root: "marūr", pos: "verb" },
  "расту": { root: "marūr", pos: "verb" },
  "растёшь": { root: "marūr", pos: "verb" },
  "растёт": { root: "marūr", pos: "verb" },
  "растём": { root: "marūr", pos: "verb" },
  "растёте": { root: "marūr", pos: "verb" },
  "растут": { root: "marūr", pos: "verb" },
  "рос": { root: "marūr", pos: "verb" },
  "росла": { root: "marūr", pos: "verb" },
  "росли": { root: "marūr", pos: "verb" },
  "падать": { root: "kōlur", pos: "verb" },
  "падаю": { root: "kōlur", pos: "verb" },
  "падаешь": { root: "kōlur", pos: "verb" },
  "падает": { root: "kōlur", pos: "verb" },
  "падаем": { root: "kōlur", pos: "verb" },
  "падаете": { root: "kōlur", pos: "verb" },
  "падают": { root: "kōlur", pos: "verb" },
  "падал": { root: "kōlur", pos: "verb" },
  "падала": { root: "kōlur", pos: "verb" },
  "падали": { root: "kōlur", pos: "verb" },
  "подниматься": { root: "dzenur", pos: "verb" },
  "поднимаюсь": { root: "dzenur", pos: "verb" },
  "поднимаешься": { root: "dzenur", pos: "verb" },
  "поднимается": { root: "dzenur", pos: "verb" },
  "поднимаемся": { root: "dzenur", pos: "verb" },
  "поднимаетесь": { root: "dzenur", pos: "verb" },
  "поднимаются": { root: "dzenur", pos: "verb" },
  "поднимался": { root: "dzenur", pos: "verb" },
  "поднималась": { root: "dzenur", pos: "verb" },
  "поднимались": { root: "dzenur", pos: "verb" },
  "спускаться": { root: "kōlur", pos: "verb" },
  "спускаюсь": { root: "kōlur", pos: "verb" },
  "спускаешься": { root: "kōlur", pos: "verb" },
  "спускается": { root: "kōlur", pos: "verb" },
  "спускаемся": { root: "kōlur", pos: "verb" },
  "спускаетесь": { root: "kōlur", pos: "verb" },
  "спускаются": { root: "kōlur", pos: "verb" },
  "спускался": { root: "kōlur", pos: "verb" },
  "спускалась": { root: "kōlur", pos: "verb" },
  "спускались": { root: "kōlur", pos: "verb" },
  "открывать": { root: "tōkhur", pos: "verb" },
  "открываю": { root: "tōkhur", pos: "verb" },
  "открываешь": { root: "tōkhur", pos: "verb" },
  "открывает": { root: "tōkhur", pos: "verb" },
  "открываем": { root: "tōkhur", pos: "verb" },
  "открываете": { root: "tōkhur", pos: "verb" },
  "открывают": { root: "tōkhur", pos: "verb" },
  "открывал": { root: "tōkhur", pos: "verb" },
  "открывала": { root: "tōkhur", pos: "verb" },
  "открывали": { root: "tōkhur", pos: "verb" },
  "закрывать": { root: "tōkhur", pos: "verb" },
  "закрываю": { root: "tōkhur", pos: "verb" },
  "закрываешь": { root: "tōkhur", pos: "verb" },
  "закрывает": { root: "tōkhur", pos: "verb" },
  "закрываем": { root: "tōkhur", pos: "verb" },
  "закрываете": { root: "tōkhur", pos: "verb" },
  "закрывают": { root: "tōkhur", pos: "verb" },
  "закрывал": { root: "tōkhur", pos: "verb" },
  "закрывала": { root: "tōkhur", pos: "verb" },
  "закрывали": { root: "tōkhur", pos: "verb" },
  "видеть": { root: "thal", pos: "verb" },
  "вижу": { root: "thal", pos: "verb" },
  "видишь": { root: "thal", pos: "verb" },
  "видит": { root: "thal", pos: "verb" },
  "видим": { root: "thal", pos: "verb" },
  "видите": { root: "thal", pos: "verb" },
  "видят": { root: "thal", pos: "verb" },
  "видел": { root: "thal", pos: "verb" },
  "видела": { root: "thal", pos: "verb" },
  "видели": { root: "thal", pos: "verb" },
  "увидеть": { root: "thal", pos: "verb" },
  "увидел": { root: "thal", pos: "verb" },
  "увидела": { root: "thal", pos: "verb" },
  "увидели": { root: "thal", pos: "verb" },
  "слышать": { root: "thal", pos: "verb" },
  "слышу": { root: "thal", pos: "verb" },
  "слышишь": { root: "thal", pos: "verb" },
  "слышит": { root: "thal", pos: "verb" },
  "слышим": { root: "thal", pos: "verb" },
  "слышите": { root: "thal", pos: "verb" },
  "слышат": { root: "thal", pos: "verb" },
  "слышал": { root: "thal", pos: "verb" },
  "слышала": { root: "thal", pos: "verb" },
  "слышали": { root: "thal", pos: "verb" },
  "слушать": { root: "thal", pos: "verb" },
  "слушаю": { root: "thal", pos: "verb" },
  "слушаешь": { root: "thal", pos: "verb" },
  "слушает": { root: "thal", pos: "verb" },
  "слушаем": { root: "thal", pos: "verb" },
  "слушаете": { root: "thal", pos: "verb" },
  "слушают": { root: "thal", pos: "verb" },
  "слушал": { root: "thal", pos: "verb" },
  "слушала": { root: "thal", pos: "verb" },
  "слушали": { root: "thal", pos: "verb" },
  "брать": { root: "khōs", pos: "verb" },
  "беру": { root: "khōs", pos: "verb" },
  "берёшь": { root: "khōs", pos: "verb" },
  "берёт": { root: "khōs", pos: "verb" },
  "берём": { root: "khōs", pos: "verb" },
  "берёте": { root: "khōs", pos: "verb" },
  "берут": { root: "khōs", pos: "verb" },
  "брал": { root: "khōs", pos: "verb" },
  "брала": { root: "khōs", pos: "verb" },
  "брали": { root: "khōs", pos: "verb" },
  "давать": { root: "rōg", pos: "verb" },
  "даю": { root: "rōg", pos: "verb" },
  "даёшь": { root: "rōg", pos: "verb" },
  "даёт": { root: "rōg", pos: "verb" },
  "даём": { root: "rōg", pos: "verb" },
  "даёте": { root: "rōg", pos: "verb" },
  "дают": { root: "rōg", pos: "verb" },
  "давал": { root: "rōg", pos: "verb" },
  "давала": { root: "rōg", pos: "verb" },
  "давали": { root: "rōg", pos: "verb" },
  "получать": { root: "sen", pos: "verb" },
  "получаю": { root: "sen", pos: "verb" },
  "получаешь": { root: "sen", pos: "verb" },
  "получает": { root: "sen", pos: "verb" },
  "получаем": { root: "sen", pos: "verb" },
  "получаете": { root: "sen", pos: "verb" },
  "получают": { root: "sen", pos: "verb" },
  "получал": { root: "sen", pos: "verb" },
  "получала": { root: "sen", pos: "verb" },
  "получали": { root: "sen", pos: "verb" },
  "танцевать": { root: "thalur", pos: "verb" },
  "танцую": { root: "thalur", pos: "verb" },
  "танцуешь": { root: "thalur", pos: "verb" },
  "танцует": { root: "thalur", pos: "verb" },
  "танцуем": { root: "thalur", pos: "verb" },
  "танцуете": { root: "thalur", pos: "verb" },
  "танцуют": { root: "thalur", pos: "verb" },
  "танцевал": { root: "thalur", pos: "verb" },
  "танцевала": { root: "thalur", pos: "verb" },
  "танцевали": { root: "thalur", pos: "verb" },
  "петь": { root: "zalkhō", pos: "verb" },
  "пою": { root: "zalkhō", pos: "verb" },
  "поёшь": { root: "zalkhō", pos: "verb" },
  "поёт": { root: "zalkhō", pos: "verb" },
  "поём": { root: "zalkhō", pos: "verb" },
  "поёте": { root: "zalkhō", pos: "verb" },
  "поют": { root: "zalkhō", pos: "verb" },
  "пел": { root: "zalkhō", pos: "verb" },
  "пела": { root: "zalkhō", pos: "verb" },
  "пели": { root: "zalkhō", pos: "verb" },
  "путешествовать": { root: "nur", pos: "verb" },
  "путешествую": { root: "nur", pos: "verb" },
  "путешествуешь": { root: "nur", pos: "verb" },
  "путешествует": { root: "nur", pos: "verb" },
  "путешествуем": { root: "nur", pos: "verb" },
  "путешествуете": { root: "nur", pos: "verb" },
  "путешествуют": { root: "nur", pos: "verb" },
  "путешествовал": { root: "nur", pos: "verb" },
  "путешествовала": { root: "nur", pos: "verb" },
  "путешествовали": { root: "nur", pos: "verb" },
  "менять": { root: "khalur", pos: "verb" },
  "меняю": { root: "khalur", pos: "verb" },
  "меняешь": { root: "khalur", pos: "verb" },
  "меняет": { root: "khalur", pos: "verb" },
  "меняем": { root: "khalur", pos: "verb" },
  "меняете": { root: "khalur", pos: "verb" },
  "меняют": { root: "khalur", pos: "verb" },
  "менял": { root: "khalur", pos: "verb" },
  "меняла": { root: "khalur", pos: "verb" },
  "меняли": { root: "khalur", pos: "verb" },
  "начинать": { root: "khan", pos: "verb" },
  "начинаю": { root: "khan", pos: "verb" },
  "начинаешь": { root: "khan", pos: "verb" },
  "начинает": { root: "khan", pos: "verb" },
  "начинаем": { root: "khan", pos: "verb" },
  "начинаете": { root: "khan", pos: "verb" },
  "начинают": { root: "khan", pos: "verb" },
  "начинал": { root: "khan", pos: "verb" },
  "начинала": { root: "khan", pos: "verb" },
  "начинали": { root: "khan", pos: "verb" },
  "заканчивать": { root: "mōr", pos: "verb" },
  "заканчиваю": { root: "mōr", pos: "verb" },
  "заканчиваешь": { root: "mōr", pos: "verb" },
  "заканчивает": { root: "mōr", pos: "verb" },
  "заканчиваем": { root: "mōr", pos: "verb" },
  "заканчиваете": { root: "mōr", pos: "verb" },
  "заканчивают": { root: "mōr", pos: "verb" },
  "заканчивал": { root: "mōr", pos: "verb" },
  "заканчивала": { root: "mōr", pos: "verb" },
  "заканчивали": { root: "mōr", pos: "verb" },
  "отдыхать": { root: "sūl", pos: "verb" },
  "отдыхаю": { root: "sūl", pos: "verb" },
  "отдыхаешь": { root: "sūl", pos: "verb" },
  "отдыхает": { root: "sūl", pos: "verb" },
  "отдыхаем": { root: "sūl", pos: "verb" },
  "отдыхаете": { root: "sūl", pos: "verb" },
  "отдыхают": { root: "sūl", pos: "verb" },
  "отдыхал": { root: "sūl", pos: "verb" },
  "отдыхала": { root: "sūl", pos: "verb" },
  "отдыхали": { root: "sūl", pos: "verb" },
  "спать": { root: "sūl", pos: "verb" },
  "сплю": { root: "sūl", pos: "verb" },
  "спишь": { root: "sūl", pos: "verb" },
  "спит": { root: "sūl", pos: "verb" },
  "спим": { root: "sūl", pos: "verb" },
  "спите": { root: "sūl", pos: "verb" },
  "спят": { root: "sūl", pos: "verb" },
  "спал": { root: "sūl", pos: "verb" },
  "спала": { root: "sūl", pos: "verb" },
  "спали": { root: "sūl", pos: "verb" },
  "посмотреть": { root: "thal", pos: "verb" },
  "посмотрю": { root: "thal", pos: "verb" },
  "посмотришь": { root: "thal", pos: "verb" },
  "посмотрит": { root: "thal", pos: "verb" },
  "посмотрим": { root: "thal", pos: "verb" },
  "посмотрите": { root: "thal", pos: "verb" },
  "посмотрят": { root: "thal", pos: "verb" },
  "посмотрел": { root: "thal", pos: "verb" },
  "посмотрела": { root: "thal", pos: "verb" },
  "посмотрели": { root: "thal", pos: "verb" },
  "купить": { root: "xur", pos: "verb" },
  "куплю": { root: "xur", pos: "verb" },
  "купишь": { root: "xur", pos: "verb" },
  "купит": { root: "xur", pos: "verb" },
  "купим": { root: "xur", pos: "verb" },
  "купите": { root: "xur", pos: "verb" },
  "купят": { root: "xur", pos: "verb" },
  "купил": { root: "xur", pos: "verb" },
  "купила": { root: "xur", pos: "verb" },
  "купили": { root: "xur", pos: "verb" },
  "рисовать": { root: "thalur", pos: "verb" },
  "рисую": { root: "thalur", pos: "verb" },
  "рисуешь": { root: "thalur", pos: "verb" },
  "рисует": { root: "thalur", pos: "verb" },
  "рисуем": { root: "thalur", pos: "verb" },
  "рисуете": { root: "thalur", pos: "verb" },
  "рисуют": { root: "thalur", pos: "verb" },
  "рисовал": { root: "thalur", pos: "verb" },
  "рисовала": { root: "thalur", pos: "verb" },
  "рисовали": { root: "thalur", pos: "verb" },
  "писать": { root: "khōs", pos: "verb" },
  "пишу": { root: "khōs", pos: "verb" },
  "пишешь": { root: "khōs", pos: "verb" },
  "пишет": { root: "khōs", pos: "verb" },
  "пишем": { root: "khōs", pos: "verb" },
  "пишете": { root: "khōs", pos: "verb" },
  "пишут": { root: "khōs", pos: "verb" },
  "писал": { root: "khōs", pos: "verb" },
  "писала": { root: "khōs", pos: "verb" },
  "писали": { root: "khōs", pos: "verb" },
  "сохранить": { root: "lān", pos: "verb" },
  "сохраню": { root: "lān", pos: "verb" },
  "сохранишь": { root: "lān", pos: "verb" },
  "сохранит": { root: "lān", pos: "verb" },
  "сохраним": { root: "lān", pos: "verb" },
  "сохраните": { root: "lān", pos: "verb" },
  "сохранят": { root: "lān", pos: "verb" },
  "сохранил": { root: "lān", pos: "verb" },
  "сохранила": { root: "lān", pos: "verb" },
  "сохранили": { root: "lān", pos: "verb" },
  "спасти": { root: "lānīn", pos: "verb" },
  "спасу": { root: "lānīn", pos: "verb" },
  "спасёшь": { root: "lānīn", pos: "verb" },
  "спасёт": { root: "lānīn", pos: "verb" },
  "спасём": { root: "lānīn", pos: "verb" },
  "спасёте": { root: "lānīn", pos: "verb" },
  "спасут": { root: "lānīn", pos: "verb" },
  "спас": { root: "lānīn", pos: "verb" },
  "спасла": { root: "lānīn", pos: "verb" },
  "спасли": { root: "lānīn", pos: "verb" },
  "расшифровать": { root: "tsanlān", pos: "verb" },
  "расшифрую": { root: "tsanlān", pos: "verb" },
  "расшифруешь": { root: "tsanlān", pos: "verb" },
  "расшифрует": { root: "tsanlān", pos: "verb" },
  "расшифруем": { root: "tsanlān", pos: "verb" },
  "расшифруете": { root: "tsanlān", pos: "verb" },
  "расшифруют": { root: "tsanlān", pos: "verb" },
  "расшифровал": { root: "tsanlān", pos: "verb" },
  "расшифровала": { root: "tsanlān", pos: "verb" },
  "расшифровали": { root: "tsanlān", pos: "verb" },
  "систематизировать": { root: "tsanlān", pos: "verb" },
  "систематизирую": { root: "tsanlān", pos: "verb" },
  "систематизируешь": { root: "tsanlān", pos: "verb" },
  "систематизирует": { root: "tsanlān", pos: "verb" },
  "систематизируем": { root: "tsanlān", pos: "verb" },
  "систематизируете": { root: "tsanlān", pos: "verb" },
  "систематизируют": { root: "tsanlān", pos: "verb" },
  "систематизировал": { root: "tsanlān", pos: "verb" },
  "систематизировала": { root: "tsanlān", pos: "verb" },
  "систематизировали": { root: "tsanlān", pos: "verb" },
  "записать": { root: "rak", pos: "verb" },
  "запишу": { root: "rak", pos: "verb" },
  "запишешь": { root: "rak", pos: "verb" },
  "запишет": { root: "rak", pos: "verb" },
  "запишем": { root: "rak", pos: "verb" },
  "запишете": { root: "rak", pos: "verb" },
  "запишут": { root: "rak", pos: "verb" },
  "записал": { root: "rak", pos: "verb" },
  "записала": { root: "rak", pos: "verb" },
  "записали": { root: "rak", pos: "verb" },
  "хотеть": { root: "nūr", pos: "verb" },
  "хочу": { root: "nūr", pos: "verb" },
  "хочешь": { root: "nūr", pos: "verb" },
  "хочет": { root: "nūr", pos: "verb" },
  "хотим": { root: "nūr", pos: "verb" },
  "хотите": { root: "nūr", pos: "verb" },
  "хотят": { root: "nūr", pos: "verb" },
  "хотел": { root: "nūr", pos: "verb" },
  "хотела": { root: "nūr", pos: "verb" },
  "хотели": { root: "nūr", pos: "verb" },
  "сделать": { root: "khalur", pos: "verb" },
  "сделаю": { root: "khalur", pos: "verb" },
  "сделаешь": { root: "khalur", pos: "verb" },
  "сделает": { root: "khalur", pos: "verb" },
  "сделаем": { root: "khalur", pos: "verb" },
  "сделаете": { root: "khalur", pos: "verb" },
  "сделают": { root: "khalur", pos: "verb" },
  "сделал": { root: "khalur", pos: "verb" },
  "сделала": { root: "khalur", pos: "verb" },
  "сделали": { root: "khalur", pos: "verb" },
  "делать": { root: "khalur", pos: "verb" },
  "делаю": { root: "khalur", pos: "verb" },
  "делаешь": { root: "khalur", pos: "verb" },
  "делает": { root: "khalur", pos: "verb" },
  "делаем": { root: "khalur", pos: "verb" },
  "делаете": { root: "khalur", pos: "verb" },
  "делают": { root: "khalur", pos: "verb" },
  "делал": { root: "khalur", pos: "verb" },
  "делала": { root: "khalur", pos: "verb" },
  "делали": { root: "khalur", pos: "verb" },
  "посвятить": { root: "lān", pos: "verb" },
  "посвятил": { root: "lān", pos: "verb" },
  "посвятила": { root: "lān", pos: "verb" },
  "посвятили": { root: "lān", pos: "verb" },
  "возвращаться": { root: "thalān", pos: "verb" },
  "возвращаюсь": { root: "thalān", pos: "verb" },
  "возвращаешься": { root: "thalān", pos: "verb" },
  "возвращается": { root: "thalān", pos: "verb" },
  "возвращаемся": { root: "thalān", pos: "verb" },
  "возвращаетесь": { root: "thalān", pos: "verb" },
  "возвращаются": { root: "thalān", pos: "verb" },
  "возвращался": { root: "thalān", pos: "verb" },
  "возвращалась": { root: "thalān", pos: "verb" },
  "возвращались": { root: "thalān", pos: "verb" },
  "вернуться": { root: "thalān", pos: "verb" },
  "вернусь": { root: "thalān", pos: "verb" },
  "вернёшься": { root: "thalān", pos: "verb" },
  "вернётся": { root: "thalān", pos: "verb" },
  "вернёмся": { root: "thalān", pos: "verb" },
  "вернётесь": { root: "thalān", pos: "verb" },
  "вернутся": { root: "thalān", pos: "verb" },
  "вернулся": { root: "thalān", pos: "verb" },
  "вернулась": { root: "thalān", pos: "verb" },
  "вернулись": { root: "thalān", pos: "verb" },

  // ============================================================
  // 4.1 ЕДА И БЫТ
  // ============================================================
  "есть (принимать пищу)": { root: "ōkhar", pos: "verb" },
  "ем": { root: "ōkhar", pos: "verb" },
  "ешь": { root: "ōkhar", pos: "verb" },
  "ест": { root: "ōkhar", pos: "verb" },
  "едим": { root: "ōkhar", pos: "verb" },
  "едят": { root: "ōkhar", pos: "verb" },
  "ел": { root: "ōkhar", pos: "verb" },
  "ела": { root: "ōkhar", pos: "verb" },
  "ели": { root: "ōkhar", pos: "verb" },

  // ============================================================
  // 5. НАРЕЧИЯ И СОЮЗЫ
  // ============================================================
  "и": { root: "un", pos: "conj" },
  "но": { root: "kan", pos: "conj" },
  "когда": { root: "tsen", pos: "conj" },
  "потому что": { root: "tal", pos: "conj" },
  "а": { root: "un", pos: "conj" },
  "также": { root: "un", pos: "conj" },
  "не": { root: "ān", pos: "particle" },
  "нет": { root: "ān", pos: "particle" },
  "сегодня": { root: "sōl", pos: "noun" },
  "завтра": { root: "dzenur", pos: "noun" },
  "вчера": { root: "lānur", pos: "noun" },
  "вместе": { root: "tō", pos: "adv" },
  "очень": { root: "suf", pos: "adv" },
  "там": { root: "sen", pos: "adv" },
  "более": { root: "suf", pos: "adv" },
  "впервые": { root: "on", pos: "adv" },
  "всегда": { root: "sen", pos: "adv" },
  "никогда": { root: "ān", pos: "adv" },
  "теперь": { root: "amār", pos: "adv" },
  "потом": { root: "amār", pos: "adv" },
  "раньше": { root: "xal", pos: "adv" },
  "позже": { root: "khal", pos: "adv" },
  "далеко": { root: "dzenur", pos: "adv" },
  "близко": { root: "kōl", pos: "adv" },
  "внутри": { root: "kōl", pos: "adv" },
  "снаружи": { root: "dzen", pos: "adv" },

  // ============================================================
  // 6. МЕСТОИМЕНИЯ (дополнительные)
  // ============================================================
  "это": { root: "thal", pos: "pron" },
  "этого": { root: "thal", pos: "pron" },
  "этому": { root: "thal", pos: "pron" },
  "этим": { root: "thal", pos: "pron" },
  "этом": { root: "thal", pos: "pron" },
  "этой": { root: "thal", pos: "pron" },
  "эти": { root: "thal", pos: "pron" },
  "этих": { root: "thal", pos: "pron" },
  "все": { root: "tō", pos: "pron" },
  "всего": { root: "tō", pos: "pron" },
  "всем": { root: "tō", pos: "pron" },
  "всеми": { root: "tō", pos: "pron" },
  "всех": { root: "tō", pos: "pron" },
  "свой": { root: "an", pos: "pron" },
  "своя": { root: "an", pos: "pron" },
  "своё": { root: "an", pos: "pron" },
  "свою": { root: "an", pos: "pron" },
  "свои": { root: "an", pos: "pron" },
  "своих": { root: "an", pos: "pron" },

  // ============================================================
  // 7. ВОПРОСИТЕЛЬНЫЕ СЛОВА
  // ============================================================
  "куда": { root: "nur", pos: "adv" },
  "куда?": { root: "nur", pos: "adv" },

  // ============================================================
  // 8. ГЕОГРАФИЧЕСКИЕ НАЗВАНИЯ
  // ============================================================
  "ацидалийское море": { root: "Acidalia", pos: "noun" },
  "фарсида": { root: "Khōsen", pos: "noun" },
  "эллада": { root: "Ellada", pos: "noun" },
  "утопия": { root: "Utopiya", pos: "noun" },
  "утопии": { root: "Utopiya", pos: "noun" },
  "утопию": { root: "Utopiya", pos: "noun" },
  "утопией": { root: "Utopiya", pos: "noun" },
  "аравия": { root: "Aravia", pos: "noun" },
  "аравии": { root: "Aravia", pos: "noun" },
  "аравию": { root: "Aravia", pos: "noun" },
  "окхасен": { root: "Okhasen", pos: "noun" },
  "роген-ария": { root: "Rogen-Ariya", pos: "noun" },
  "ксанф": { root: "Ksanf", pos: "noun" },
  "долина маринера": { root: "Valles", pos: "noun" },
  "олимп": { root: "Olympus", pos: "noun" },
  "эритрея": { root: "Eritreya", pos: "noun" },
  "эритреи": { root: "Eritreya", pos: "noun" },
  "эритрею": { root: "Eritreya", pos: "noun" },
  "эритреей": { root: "Eritreya", pos: "noun" },
  "эдем": { root: "Eden", pos: "noun" },
  "эдема": { root: "Eden", pos: "noun" },
  "эдему": { root: "Eden", pos: "noun" },
  "эдемом": { root: "Eden", pos: "noun" },
  "эдеме": { root: "Eden", pos: "noun" },
  "тарсис": { root: "Tarsis", pos: "noun" },
  "тарсиса": { root: "Tarsis", pos: "noun" },
  "эллос": { root: "Ellos", pos: "noun" },
  "эллоса": { root: "Ellos", pos: "noun" },
  "эллосе": { root: "Ellos", pos: "noun" },
  "сирения": { root: "Sirenia", pos: "noun" },
  "сирении": { root: "Sirenia", pos: "noun" },
  "сирению": { root: "Sirenia", pos: "noun" },
  "сиренией": { root: "Sirenia", pos: "noun" },

  // ============================================================
  // 9. БОГИ
  // ============================================================
  "араксис": { root: "Araksis", pos: "noun" },
  "кхо": { root: "Kho", pos: "noun" },
  "акха": { root: "Akha", pos: "noun" },
  "акхи": { root: "Akha", pos: "noun" },
  "акхе": { root: "Akha", pos: "noun" },
  "акху": { root: "Akha", pos: "noun" },
  "акхой": { root: "Akha", pos: "noun" },

  // ============================================================
  // 10. ИМЕНА СОБСТВЕННЫЕ
  // ============================================================
  "иван": { root: "Ivan", pos: "noun" },
  "ивана": { root: "Ivan", pos: "noun" },
  "ивану": { root: "Ivan", pos: "noun" },
  "Мнемис": { root: "Lānsur", pos: "noun" },
  "Mnemis": { root: "Lānsur", pos: "noun" },
  "талин": { root: "Talīn", pos: "noun" },
  "хевсур": { root: "Khevsur", pos: "noun" },
  "йарра": { root: "Yarra", pos: "noun" },
  "элла": { root: "Ella", pos: "noun" },
  "аратан": { root: "Aratan", pos: "noun" },
  "араш": { root: "Arash", pos: "noun" },
  "араша": { root: "Arash", pos: "noun" },
  "арашу": { root: "Arash", pos: "noun" },
  "арашем": { root: "Arash", pos: "noun" },
  "араше": { root: "Arash", pos: "noun" },
  "кан": { root: "Kan", pos: "noun" },
  "кана": { root: "Kan", pos: "noun" },
  "кану": { root: "Kan", pos: "noun" },
  "каном": { root: "Kan", pos: "noun" },
  "кане": { root: "Kan", pos: "noun" },
  "сарум": { root: "Sarum", pos: "noun" },
  "сарума": { root: "Sarum", pos: "noun" },
  "саруму": { root: "Sarum", pos: "noun" },
  "сарумом": { root: "Sarum", pos: "noun" },
  "саруме": { root: "Sarum", pos: "noun" },
  "сарум великий": { root: "Sarum", pos: "noun" },

  // ============================================================
  // 11. ТЕРМИНЫ И ПОНЯТИЯ
  // ============================================================
  "исход": { root: "Iskhod", pos: "noun" },
  "исхода": { root: "Iskhod", pos: "noun" },
  "исходу": { root: "Iskhod", pos: "noun" },
  "исходом": { root: "Iskhod", pos: "noun" },
  "исходе": { root: "Iskhod", pos: "noun" },
  "ковчег": { root: "Kovcheg", pos: "noun" },
  "ковчега": { root: "Kovcheg", pos: "noun" },
  "ковчегу": { root: "Kovcheg", pos: "noun" },
  "ковчегом": { root: "Kovcheg", pos: "noun" },
  "ковчеге": { root: "Kovcheg", pos: "noun" },
  "ковчеги": { root: "Kovcheg", pos: "noun" },
  "ковчегов": { root: "Kovcheg", pos: "noun" },
  "космодром": { root: "Kosmodrom", pos: "noun" },
  "космодрома": { root: "Kosmodrom", pos: "noun" },
  "космодрому": { root: "Kosmodrom", pos: "noun" },
  "космодромом": { root: "Kosmodrom", pos: "noun" },
  "космодроме": { root: "Kosmodrom", pos: "noun" },
  "пират": { root: "Pirat", pos: "noun" },
  "пирата": { root: "Pirat", pos: "noun" },
  "пирату": { root: "Pirat", pos: "noun" },
  "пиратом": { root: "Pirat", pos: "noun" },
  "пираты": { root: "Pirat", pos: "noun" },
  "пиратов": { root: "Pirat", pos: "noun" },
  "пророчество": { root: "Prorochestvo", pos: "noun" },
  "пророчества": { root: "Prorochestvo", pos: "noun" },
  "пророчеству": { root: "Prorochestvo", pos: "noun" },
  "пророчеством": { root: "Prorochestvo", pos: "noun" },
  "пророчестве": { root: "Prorochestvo", pos: "noun" },
  "легенда": { root: "Legenda", pos: "noun" },
  "легенды": { root: "Legenda", pos: "noun" },
  "легенде": { root: "Legenda", pos: "noun" },
  "легенд": { root: "Legenda", pos: "noun" },
  "миф": { root: "Mif", pos: "noun" },
  "мифа": { root: "Mif", pos: "noun" },
  "мифу": { root: "Mif", pos: "noun" },
  "мифом": { root: "Mif", pos: "noun" },
  "мифе": { root: "Mif", pos: "noun" },
  "мифы": { root: "Mif", pos: "noun" },
  "мифов": { root: "Mif", pos: "noun" },
  "цель": { root: "thali", pos: "noun" },
  "цели": { root: "thali", pos: "noun" },
  "целью": { root: "thali", pos: "noun" },
  "змея": { root: "ksanfi", pos: "noun" },
  "змеи": { root: "ksanfi", pos: "noun" },
  "змеёй": { root: "ksanfi", pos: "noun" },
  "голос": { root: "Ar", pos: "noun" },
  "голосом": { root: "Ar", pos: "noun" },
  "голоса": { root: "Ar", pos: "noun" },
  "голосу": { root: "Ar", pos: "noun" },
  "голосе": { root: "Ar", pos: "noun" },
  "звёздная обсерватория": { root: "Dzenthalsen", pos: "noun" },
  "звёздной обсерватории": { root: "Dzenthalsen", pos: "noun" },
  "эпоха умирания": { root: "mōr", pos: "noun" },
  "эпохи умирания": { root: "mōr", pos: "noun" },
  "астронавигатор": { root: "dzenurīn", pos: "noun" },
  "астронавигатора": { root: "dzenurīn", pos: "noun" },
  "карта": { root: "thala", pos: "noun" },
  "карте": { root: "thala", pos: "noun" },
  "карту": { root: "thala", pos: "noun" },
  "картой": { root: "thala", pos: "noun" },
  "небо": { root: "sura", pos: "noun" },
  "неба": { root: "sura", pos: "noun" },
  "небу": { root: "sura", pos: "noun" },
  "небе": { root: "sura", pos: "noun" },
  "небесный": { root: "sura", pos: "adj" },
  "небесная": { root: "sura", pos: "adj" },

  // ============================================================
  // 12. ДИАЛЕКТЫ
  // ============================================================
  "южный": { root: "ellada", pos: "adj" },
  "элладский": { root: "ellada", pos: "adj" },
  "по-элладски": { root: "ellada", pos: "adv" },
  "западный": { root: "utopia", pos: "adj" },
  "утопийский": { root: "utopia", pos: "adj" },
  "по-утопийски": { root: "utopia", pos: "adv" },
  "центральный": { root: "okhasen", pos: "adj" },
  "окхасенский": { root: "okhasen", pos: "adj" },

  // ============================================================
  // 13. ФРАЗЫ (целые выражения)
  // ============================================================
  "привет": { root: "Mar dzen", pos: "phrase" },
  "здравствуй": { root: "Mar dzen", pos: "phrase" },
  "здравствуйте": { root: "Mar dzen", pos: "phrase" },
  "добрый день": { root: "Mar dzen", pos: "phrase" },
  "доброе утро": { root: "Mar dzen", pos: "phrase" },
  "добрый вечер": { root: "Mar dzen", pos: "phrase" },
  "ответ на приветствие": { root: "Dzen thal", pos: "phrase" },
  "и тебе здравствовать": { root: "Dzen thal", pos: "phrase" },
  "прощай": { root: "Lān mar", pos: "phrase" },
  "прощайте": { root: "Ariya lān", pos: "phrase" },
  "до свидания": { root: "Lān mar", pos: "phrase" },
  "до встречи": { root: "Lān mar", pos: "phrase" },
  "очень приятно": { root: "Tsan lān", pos: "phrase" },
  "рад познакомиться": { root: "Tsan lān", pos: "phrase" },
  "спасибо": { root: "Tsan lān", pos: "phrase" },
  "благодарю": { root: "Tsan lān", pos: "phrase" },
  "пожалуйста": { root: "Marzān thal", pos: "phrase" },
  "будь здоров": { root: "Marzān thal", pos: "phrase" },
  "удачи": { root: "Marzān thal", pos: "phrase" },
  "глина помнит": { root: "Lān sur", pos: "phrase" },
  "письмо из красной пыли": { root: "Khalur khō sur", pos: "phrase" },
  "марсианская энциклопедия": { root: "Tsankhō Marzān", pos: "phrase" },
  "красная пыль": { root: "Khō sur", pos: "phrase" },
  "город помнит море": { root: "Okh sen ākha", pos: "phrase" },
  "смотри на звёзды и помни жизнь": { root: "Thal dzen, un lān mar", pos: "phrase" },
  "река помнит": { root: "Ksanf lān", pos: "phrase" },
  "город смотрит на море": { root: "Okh ākha thal", pos: "phrase" },
  "звезда смотрит": { root: "Dzen thal", pos: "phrase" },
  "звезда умирает": { root: "Dzen mōr", pos: "phrase" },
  "звезда умирает, глина помнит": { root: "Dzen mōr, lān sur", pos: "phrase" },
  "волна смотрит": { root: "Ākha thal", pos: "phrase" },
  "волна смотрит, земля смотрит": { root: "Ākha thal, kōl thal", pos: "phrase" },
  "звезда смотрит, огонь смотрит": { root: "Dzen thal, khō thal", pos: "phrase" },
  "марсиане идут, идут, идут": { root: "Marzān nur, nur, nur", pos: "phrase" },
  "глина помнит, помнит, помнит": { root: "Lān sur, lān sur, lān sur", pos: "phrase" },
  "хлеб — это тоже память": { root: "Kōl-mar lān sen", pos: "phrase" },
  "это памятник": { root: "Tan lān sur", pos: "phrase" },
  "пусть твоя память рассыплется": { root: "Tan lān sur ān", pos: "phrase" },
  "пусть ты забудешь дорогу домой": { root: "Tan okh thal ān", pos: "phrase" },
  "глина помнит, звезда умирает": { root: "Lān sur, dzen mōr", pos: "phrase" },
  "ночь звезда": { root: "Nōkh dzen", pos: "phrase" },
  "звезда ночь": { root: "Dzen nōkh", pos: "phrase" },
  "завтра будет новый день": { root: "Khal sōl dzenur", pos: "phrase" },
  "новый день начнётся": { root: "Khal sōl khān", pos: "phrase" },
    // ============================================================
  // 14. НОВЫЕ ФРАЗЫ И ТОПОНИМЫ (добавлено 28.06.2026)
  // ============================================================

  // === ГЕОГРАФИЧЕСКИЕ ОБЪЕКТЫ ===
  // Пещеры под Фарсидой — место последнего убежища Хевсура
  "пещеры под фарсидой": { root: "Khō-ān-sen", pos: "phrase" },
  "пещер под фарсидой": { root: "Khō-ān-sen", pos: "phrase" },
  "пещерах под фарсидой": { root: "Khō-ān-sen", pos: "phrase" },

  // Огненный рубеж — граница, где огонь встречается с пустотой
  "огненный рубеж": { root: "Khō-ān-sen", pos: "phrase" },
  "огненного рубежа": { root: "Khō-ān-sen", pos: "phrase" },
  "огненном рубеже": { root: "Khō-ān-sen", pos: "phrase" },

  // Город-порт, город у воды — древнее название Окхасена
  "город у воды": { root: "Okh-sen", pos: "phrase" },
  "города у воды": { root: "Okh-sen", pos: "phrase" },

  // === ИМЕНА ПЕРСОНАЖЕЙ С ЭТИМОЛОГИЕЙ ===
  // Алира — "та, что танцует в ветре"
  "алира": { root: "Alira", pos: "noun" },
  "алиры": { root: "Alira", pos: "noun" },
  "алиру": { root: "Alira", pos: "noun" },
  "алирой": { root: "Alira", pos: "noun" },
  "алире": { root: "Alira", pos: "noun" },
  "алира (этимология)": { root: "ta zalthal", pos: "phrase" },

  // Аратан — "тот, кто видит дальше"
  "аратан": { root: "Aratan", pos: "noun" },
  "аратана": { root: "Aratan", pos: "noun" },
  "аратану": { root: "Aratan", pos: "noun" },
  "аратаном": { root: "Aratan", pos: "noun" },
  "аратане": { root: "Aratan", pos: "noun" },
  "аратан (этимология)": { root: "la dzen thalsuf", pos: "phrase" },

  // Йарра — "та, кто видит корень"
  "йарра": { root: "Yarra", pos: "noun" },
  "йарры": { root: "Yarra", pos: "noun" },
  "йарре": { root: "Yarra", pos: "noun" },
  "йарру": { root: "Yarra", pos: "noun" },
  "йаррой": { root: "Yarra", pos: "noun" },
  "йарра (этимология)": { root: "ta kōl thal", pos: "phrase" },

  // Совия — "та, чей голос помнит"
  "совия": { root: "Soviya", pos: "noun" },
  "совии": { root: "Soviya", pos: "noun" },
  "совию": { root: "Soviya", pos: "noun" },
  "совией": { root: "Soviya", pos: "noun" },
  "совии": { root: "Soviya", pos: "noun" },
  "совия (этимология)": { root: "ta ar lān", pos: "phrase" },

  // Ксанф — извилистый, змеевидный (от древнего корня)
  "ксанф": { root: "Ksanf", pos: "noun" },
  "ксанфа": { root: "Ksanf", pos: "noun" },
  "ксанфу": { root: "Ksanf", pos: "noun" },
  "ксанфом": { root: "Ksanf", pos: "noun" },
  "ксанфе": { root: "Ksanf", pos: "noun" },
  "ксанф (этимология)": { root: "ksanfi", pos: "adj" },

  // Мор-тхал — "время умирания воды"
  "мор тхал": { root: "Mōr-thal", pos: "phrase" },
  "мор тхала": { root: "Mōr-thal", pos: "phrase" },
  "мор тхалу": { root: "Mōr-thal", pos: "phrase" },
  "мор тхалом": { root: "Mōr-thal", pos: "phrase" },
  "мор тхале": { root: "Mōr-thal", pos: "phrase" },
  // ============================================================
  // 15. НОВЫЕ СЛОВА (быт, наука, философия) — добавлено 28.06.2026
  // ============================================================

  // === ГЛАГОЛЫ (новые) ===
  // Оставлять — "откладывать, не забирать"
  "оставлять": { root: "ānxur", pos: "verb" },
  "оставляю": { root: "ānxur", pos: "verb" },
  "оставляешь": { root: "ānxur", pos: "verb" },
  "оставляет": { root: "ānxur", pos: "verb" },
  "оставляем": { root: "ānxur", pos: "verb" },
  "оставляете": { root: "ānxur", pos: "verb" },
  "оставляют": { root: "ānxur", pos: "verb" },
  "оставил": { root: "ānxur", pos: "verb" },
  "оставила": { root: "ānxur", pos: "verb" },
  "оставили": { root: "ānxur", pos: "verb" },

  // Сокращать — "делать короче"
  "сокращать": { root: "hōr-khalur", pos: "verb" },
  "сокращаю": { root: "hōr-khalur", pos: "verb" },
  "сокращаешь": { root: "hōr-khalur", pos: "verb" },
  "сокращает": { root: "hōr-khalur", pos: "verb" },
  "сокращаем": { root: "hōr-khalur", pos: "verb" },
  "сокращаете": { root: "hōr-khalur", pos: "verb" },
  "сокращают": { root: "hōr-khalur", pos: "verb" },
  "сократил": { root: "hōr-khalur", pos: "verb" },
  "сократила": { root: "hōr-khalur", pos: "verb" },
  "сократили": { root: "hōr-khalur", pos: "verb" },

  // Похищать — "уносить силой"
  "похищать": { root: "khōs-nur", pos: "verb" },
  "похищаю": { root: "khōs-nur", pos: "verb" },
  "похищаешь": { root: "khōs-nur", pos: "verb" },
  "похищает": { root: "khōs-nur", pos: "verb" },
  "похищаем": { root: "khōs-nur", pos: "verb" },
  "похищаете": { root: "khōs-nur", pos: "verb" },
  "похищают": { root: "khōs-nur", pos: "verb" },
  "похитил": { root: "khōs-nur", pos: "verb" },
  "похитила": { root: "khōs-nur", pos: "verb" },
  "похитили": { root: "khōs-nur", pos: "verb" },

  // Отменять — "аннулировать, делать недействительным"
  "отменять": { root: "ān-khalur", pos: "verb" },
  "отменяю": { root: "ān-khalur", pos: "verb" },
  "отменяешь": { root: "ān-khalur", pos: "verb" },
  "отменяет": { root: "ān-khalur", pos: "verb" },
  "отменяем": { root: "ān-khalur", pos: "verb" },
  "отменяете": { root: "ān-khalur", pos: "verb" },
  "отменяют": { root: "ān-khalur", pos: "verb" },
  "отменил": { root: "ān-khalur", pos: "verb" },
  "отменила": { root: "ān-khalur", pos: "verb" },
  "отменили": { root: "ān-khalur", pos: "verb" },

  // Ускорять — "увеличивать скорость"
  "ускорять": { root: "nur-khō", pos: "verb" },
  "ускоряю": { root: "nur-khō", pos: "verb" },
  "ускоряешь": { root: "nur-khō", pos: "verb" },
  "ускоряет": { root: "nur-khō", pos: "verb" },
  "ускоряем": { root: "nur-khō", pos: "verb" },
  "ускоряете": { root: "nur-khō", pos: "verb" },
  "ускоряют": { root: "nur-khō", pos: "verb" },
  "ускорил": { root: "nur-khō", pos: "verb" },
  "ускорила": { root: "nur-khō", pos: "verb" },
  "ускорили": { root: "nur-khō", pos: "verb" },

  // Принимать — "соглашаться, получать"
  "принимать": { root: "khōs-tsan", pos: "verb" },
  "принимаю": { root: "khōs-tsan", pos: "verb" },
  "принимаешь": { root: "khōs-tsan", pos: "verb" },
  "принимает": { root: "khōs-tsan", pos: "verb" },
  "принимаем": { root: "khōs-tsan", pos: "verb" },
  "принимаете": { root: "khōs-tsan", pos: "verb" },
  "принимают": { root: "khōs-tsan", pos: "verb" },
  "принял": { root: "khōs-tsan", pos: "verb" },
  "приняла": { root: "khōs-tsan", pos: "verb" },
  "приняли": { root: "khōs-tsan", pos: "verb" },

  // Получить доступ — "получить право войти"
  "получить доступ": { root: "nur-sen", pos: "verb" },
  "получаю доступ": { root: "nur-sen", pos: "verb" },
  "получаешь доступ": { root: "nur-sen", pos: "verb" },
  "получает доступ": { root: "nur-sen", pos: "verb" },
  "получаем доступ": { root: "nur-sen", pos: "verb" },
  "получаете доступ": { root: "nur-sen", pos: "verb" },
  "получают доступ": { root: "nur-sen", pos: "verb" },
  "получил доступ": { root: "nur-sen", pos: "verb" },
  "получила доступ": { root: "nur-sen", pos: "verb" },
  "получили доступ": { root: "nur-sen", pos: "verb" },

  // Достигать — "доходить до цели"
  "достигать": { root: "thal-dzen", pos: "verb" },
  "достигаю": { root: "thal-dzen", pos: "verb" },
  "достигаешь": { root: "thal-dzen", pos: "verb" },
  "достигает": { root: "thal-dzen", pos: "verb" },
  "достигаем": { root: "thal-dzen", pos: "verb" },
  "достигаете": { root: "thal-dzen", pos: "verb" },
  "достигают": { root: "thal-dzen", pos: "verb" },
  "достиг": { root: "thal-dzen", pos: "verb" },
  "достигла": { root: "thal-dzen", pos: "verb" },
  "достигли": { root: "thal-dzen", pos: "verb" },

  // Действовать — "совершать действие"
  "действовать": { root: "khalur", pos: "verb" },
  "действую": { root: "khalur", pos: "verb" },
  "действуешь": { root: "khalur", pos: "verb" },
  "действует": { root: "khalur", pos: "verb" },
  "действуем": { root: "khalur", pos: "verb" },
  "действуете": { root: "khalur", pos: "verb" },
  "действуют": { root: "khalur", pos: "verb" },
  "действовал": { root: "khalur", pos: "verb" },
  "действовала": { root: "khalur", pos: "verb" },
  "действовали": { root: "khalur", pos: "verb" },

  // Складывать — "математическое действие +"
  "складывать": { root: "un-mar", pos: "verb" },
  "складываю": { root: "un-mar", pos: "verb" },
  "складываешь": { root: "un-mar", pos: "verb" },
  "складывает": { root: "un-mar", pos: "verb" },
  "складываем": { root: "un-mar", pos: "verb" },
  "складываете": { root: "un-mar", pos: "verb" },
  "складывают": { root: "un-mar", pos: "verb" },
  "сложил": { root: "un-mar", pos: "verb" },
  "сложила": { root: "un-mar", pos: "verb" },
  "сложили": { root: "un-mar", pos: "verb" },

  // Вычитать — "математическое действие -"
  "вычитать": { root: "ān-mar", pos: "verb" },
  "вычитаю": { root: "ān-mar", pos: "verb" },
  "вычитаешь": { root: "ān-mar", pos: "verb" },
  "вычитает": { root: "ān-mar", pos: "verb" },
  "вычитаем": { root: "ān-mar", pos: "verb" },
  "вычитаете": { root: "ān-mar", pos: "verb" },
  "вычитают": { root: "ān-mar", pos: "verb" },
  "вычел": { root: "ān-mar", pos: "verb" },
  "вычла": { root: "ān-mar", pos: "verb" },
  "вычли": { root: "ān-mar", pos: "verb" },

  // Умножать — "математическое действие ×"
  "умножать": { root: "sūr-mar", pos: "verb" },
  "умножаю": { root: "sūr-mar", pos: "verb" },
  "умножаешь": { root: "sūr-mar", pos: "verb" },
  "умножает": { root: "sūr-mar", pos: "verb" },
  "умножаем": { root: "sūr-mar", pos: "verb" },
  "умножаете": { root: "sūr-mar", pos: "verb" },
  "умножают": { root: "sūr-mar", pos: "verb" },
  "умножил": { root: "sūr-mar", pos: "verb" },
  "умножила": { root: "sūr-mar", pos: "verb" },
  "умножили": { root: "sūr-mar", pos: "verb" },

  // Делить — "математическое действие ÷"
  "делить": { root: "hōr-mar", pos: "verb" },
  "делю": { root: "hōr-mar", pos: "verb" },
  "делишь": { root: "hōr-mar", pos: "verb" },
  "делит": { root: "hōr-mar", pos: "verb" },
  "делим": { root: "hōr-mar", pos: "verb" },
  "делите": { root: "hōr-mar", pos: "verb" },
  "делят": { root: "hōr-mar", pos: "verb" },
  "делил": { root: "hōr-mar", pos: "verb" },
  "делила": { root: "hōr-mar", pos: "verb" },
  "делили": { root: "hōr-mar", pos: "verb" },

  // Обвинять — "возлагать вину"
  "обвинять": { root: "mōr-tsan", pos: "verb" },
  "обвиняю": { root: "mōr-tsan", pos: "verb" },
  "обвиняешь": { root: "mōr-tsan", pos: "verb" },
  "обвиняет": { root: "mōr-tsan", pos: "verb" },
  "обвиняем": { root: "mōr-tsan", pos: "verb" },
  "обвиняете": { root: "mōr-tsan", pos: "verb" },
  "обвиняют": { root: "mōr-tsan", pos: "verb" },
  "обвинил": { root: "mōr-tsan", pos: "verb" },
  "обвинила": { root: "mōr-tsan", pos: "verb" },
  "обвинили": { root: "mōr-tsan", pos: "verb" },

  // Болеть — "испытывать боль"
  "болеть": { root: "mōr-mar", pos: "verb" },
  "болею": { root: "mōr-mar", pos: "verb" },
  "болеешь": { root: "mōr-mar", pos: "verb" },
  "болеет": { root: "mōr-mar", pos: "verb" },
  "болеем": { root: "mōr-mar", pos: "verb" },
  "болеете": { root: "mōr-mar", pos: "verb" },
  "болеют": { root: "mōr-mar", pos: "verb" },
  "болел": { root: "mōr-mar", pos: "verb" },
  "болела": { root: "mōr-mar", pos: "verb" },
  "болели": { root: "mōr-mar", pos: "verb" },

  // Сопровождать — "идти вместе"
  "сопровождать": { root: "nur-tō", pos: "verb" },
  "сопровождаю": { root: "nur-tō", pos: "verb" },
  "сопровождаешь": { root: "nur-tō", pos: "verb" },
  "сопровождает": { root: "nur-tō", pos: "verb" },
  "сопровождаем": { root: "nur-tō", pos: "verb" },
  "сопровождаете": { root: "nur-tō", pos: "verb" },
  "сопровождают": { root: "nur-tō", pos: "verb" },
  "сопровождал": { root: "nur-tō", pos: "verb" },
  "сопровождала": { root: "nur-tō", pos: "verb" },
  "сопровождали": { root: "nur-tō", pos: "verb" },

  // === СУЩЕСТВИТЕЛЬНЫЕ (новые) ===
  // Живот — часть тела
  "живот": { root: "marlā", pos: "noun" },
  "живота": { root: "marlā", pos: "noun" },
  "животу": { root: "marlā", pos: "noun" },
  "животом": { root: "marlā", pos: "noun" },
  "животе": { root: "marlā", pos: "noun" },

  // Способность — возможность делать что-либо
  "способность": { root: "xur-tsan", pos: "noun" },
  "способности": { root: "xur-tsan", pos: "noun" },
  "способностью": { root: "xur-tsan", pos: "noun" },

  // Отмена — аннулирование
  "отмена": { root: "ān-khalur", pos: "noun" },
  "отмены": { root: "ān-khalur", pos: "noun" },
  "отменой": { root: "ān-khalur", pos: "noun" },

  // Абсцесс — гнойное воспаление
  "абсцесс": { root: "mōr-khōs", pos: "noun" },
  "абсцесса": { root: "mōr-khōs", pos: "noun" },
  "абсцессу": { root: "mōr-khōs", pos: "noun" },

  // Отсутствие — недостаток, нехватка
  "отсутствие": { root: "ān-sen", pos: "noun" },
  "отсутствия": { root: "ān-sen", pos: "noun" },
  "отсутствию": { root: "ān-sen", pos: "noun" },

  // Ускорение — увеличение скорости
  "ускорение": { root: "nur-khō", pos: "noun" },
  "ускорения": { root: "nur-khō", pos: "noun" },
  "ускорению": { root: "nur-khō", pos: "noun" },

  // Доступ — право войти
  "доступ": { root: "nur-sen", pos: "noun" },
  "доступа": { root: "nur-sen", pos: "noun" },
  "доступу": { root: "nur-sen", pos: "noun" },

  // Отделение — часть, секция
  "отделение": { root: "hōr-sen", pos: "noun" },
  "отделения": { root: "hōr-sen", pos: "noun" },
  "отделению": { root: "hōr-sen", pos: "noun" },

  // Помещение — комната, пространство
  "помещение": { root: "okh-sen", pos: "noun" },
  "помещения": { root: "okh-sen", pos: "noun" },
  "помещению": { root: "okh-sen", pos: "noun" },

  // Сопровождение — действие идущего вместе
  "сопровождение": { root: "nur-tō", pos: "noun" },
  "сопровождения": { root: "nur-tō", pos: "noun" },
  "сопровождению": { root: "nur-tō", pos: "noun" },

  // Сообщник — тот, кто действует вместе
  "сообщник": { root: "nur-tō-īn", pos: "noun" },
  "сообщника": { root: "nur-tō-īn", pos: "noun" },
  "сообщнику": { root: "nur-tō-īn", pos: "noun" },

  // Отчёт — документ с информацией
  "отчёт": { root: "sur-thal", pos: "noun" },
  "отчёта": { root: "sur-thal", pos: "noun" },
  "отчёту": { root: "sur-thal", pos: "noun" },
  "отчет": { root: "sur-thal", pos: "noun" },
  "отчета": { root: "sur-thal", pos: "noun" },

  // Достоверность — степень правдивости
  "достоверность": { root: "thal-tsan", pos: "noun" },
  "достоверности": { root: "thal-tsan", pos: "noun" },

  // Обвинение — обвинительный акт
  "обвинение": { root: "mōr-tsan", pos: "noun" },
  "обвинения": { root: "mōr-tsan", pos: "noun" },
  "обвинению": { root: "mōr-tsan", pos: "noun" },

  // Болезнь — состояние боли
  "болезнь": { root: "mōr-mar", pos: "noun" },
  "болезни": { root: "mōr-mar", pos: "noun" },
  "болезнью": { root: "mōr-mar", pos: "noun" },

  // Боль — неприятное ощущение
  "боль": { root: "mōr", pos: "noun" },
  "боли": { root: "mōr", pos: "noun" },
  "болью": { root: "mōr", pos: "noun" },

  // Достижение — результат достигнутой цели
  "достижение": { root: "thal-dzen", pos: "noun" },
  "достижения": { root: "thal-dzen", pos: "noun" },
  "достижению": { root: "thal-dzen", pos: "noun" },

  // Кислота — агрессивная жидкость
  "кислота": { root: "mōr-ākha", pos: "noun" },
  "кислоты": { root: "mōr-ākha", pos: "noun" },
  "кислотой": { root: "mōr-ākha", pos: "noun" },

  // Признание — акт признания
  "признание": { root: "khōs-tsan", pos: "noun" },
  "признания": { root: "khōs-tsan", pos: "noun" },
  "признанию": { root: "khōs-tsan", pos: "noun" },

  // Исполнитель — тот, кто действует
  "исполнитель": { root: "khalur-īn", pos: "noun" },
  "исполнителя": { root: "khalur-īn", pos: "noun" },
  "исполнителю": { root: "khalur-īn", pos: "noun" },

  // Академия — учебное заведение
  "академия": { root: "tsan-sen", pos: "noun" },
  "академии": { root: "tsan-sen", pos: "noun" },
  "академию": { root: "tsan-sen", pos: "noun" },

  // Учебный год — период обучения
  "учебный год": { root: "tsan-amār", pos: "noun" },
  "учебного года": { root: "tsan-amār", pos: "noun" },

  // Аксессуар — дополнительный предмет
  "аксессуар": { root: "hōr-khōs", pos: "noun" },
  "аксессуара": { root: "hōr-khōs", pos: "noun" },
  "аксессуару": { root: "hōr-khōs", pos: "noun" },

  // === ПРИЛАГАТЕЛЬНЫЕ (новые) ===
  // Способный — имеющий способность
  "способный": { root: "xur-tsan", pos: "adj" },
  "способная": { root: "xur-tsan", pos: "adj" },
  "способное": { root: "xur-tsan", pos: "adj" },
  "способные": { root: "xur-tsan", pos: "adj" },
  "способного": { root: "xur-tsan", pos: "adj" },
  "способным": { root: "xur-tsan", pos: "adj" },

  // Приемлемый — соответствующий требованиям
  "приемлемый": { root: "khōs-tsan", pos: "adj" },
  "приемлемая": { root: "khōs-tsan", pos: "adj" },
  "приемлемое": { root: "khōs-tsan", pos: "adj" },
  "приемлемые": { root: "khōs-tsan", pos: "adj" },

  // Доступный — открытый для использования
  "доступный": { root: "nur-sen", pos: "adj" },
  "доступная": { root: "nur-sen", pos: "adj" },
  "доступное": { root: "nur-sen", pos: "adj" },
  "доступные": { root: "nur-sen", pos: "adj" },
  "доступного": { root: "nur-sen", pos: "adj" },
  "доступным": { root: "nur-sen", pos: "adj" },

  // Ответственный — несущий ответственность
  "ответственный": { root: "lān-īn", pos: "adj" },
  "ответственная": { root: "lān-īn", pos: "adj" },
  "ответственное": { root: "lān-īn", pos: "adj" },
  "ответственные": { root: "lān-īn", pos: "adj" },

  // Точный — правильный, верный
  "точный": { root: "thal-tsan", pos: "adj" },
  "точная": { root: "thal-tsan", pos: "adj" },
  "точное": { root: "thal-tsan", pos: "adj" },
  "точные": { root: "thal-tsan", pos: "adj" },
  "точного": { root: "thal-tsan", pos: "adj" },
  "точным": { root: "thal-tsan", pos: "adj" },

  // Патологический — болезненный, ненормальный
  "патологический": { root: "mōr-mar", pos: "adj" },
  "патологическая": { root: "mōr-mar", pos: "adj" },
  "патологическое": { root: "mōr-mar", pos: "adj" },
  "патологические": { root: "mōr-mar", pos: "adj" },

  // Отсутствующий — тот, кого нет
  "отсутствующий": { root: "ān-sen", pos: "adj" },
  "отсутствующая": { root: "ān-sen", pos: "adj" },
  "отсутствующее": { root: "ān-sen", pos: "adj" },
  "отсутствующие": { root: "ān-sen", pos: "adj" },

  // Рассеянный — невнимательный, разбросанный
  "рассеянный": { root: "hōr-thal", pos: "adj" },
  "рассеянная": { root: "hōr-thal", pos: "adj" },
  "рассеянное": { root: "hōr-thal", pos: "adj" },
  "рассеянные": { root: "hōr-thal", pos: "adj" },

  // Совершенный — идеальный, полный
  "совершенный": { root: "suf-tsan", pos: "adj" },
  "совершенная": { root: "suf-tsan", pos: "adj" },
  "совершенное": { root: "suf-tsan", pos: "adj" },
  "совершенные": { root: "suf-tsan", pos: "adj" },

  // Абстрактный — отвлечённый
  "абстрактный": { root: "thal-lān", pos: "adj" },
  "абстрактная": { root: "thal-lān", pos: "adj" },
  "абстрактное": { root: "thal-lān", pos: "adj" },
  "абстрактные": { root: "thal-lān", pos: "adj" },

  // Абсурдный — нелепый, бессмысленный
  "абсурдный": { root: "ān-tsan", pos: "adj" },
  "абсурдная": { root: "ān-tsan", pos: "adj" },
  "абсурдное": { root: "ān-tsan", pos: "adj" },
  "абсурдные": { root: "ān-tsan", pos: "adj" },

  // Академический — относящийся к академии
  "академический": { root: "tsan-sen", pos: "adj" },
  "академическая": { root: "tsan-sen", pos: "adj" },
  "академическое": { root: "tsan-sen", pos: "adj" },
  "академические": { root: "tsan-sen", pos: "adj" },

  // Внезапный — неожиданный
  "внезапный": { root: "ān-thal", pos: "adj" },
  "внезапная": { root: "ān-thal", pos: "adj" },
  "внезапное": { root: "ān-thal", pos: "adj" },
  "внезапные": { root: "ān-thal", pos: "adj" },

  // Случайный — непреднамеренный
  "случайный": { root: "hōr-thal", pos: "adj" },
  "случайная": { root: "hōr-thal", pos: "adj" },
  "случайное": { root: "hōr-thal", pos: "adj" },
  "случайные": { root: "hōr-thal", pos: "adj" },

  // === НАРЕЧИЯ (новые) ===
  "внезапно": { root: "ān-thal", pos: "adv" },
  "точно": { root: "thal-tsan", pos: "adv" },
  "случайно": { root: "hōr-thal", pos: "adv" },
  "совершенно": { root: "suf-tsan", pos: "adv" },

  // === ПРЕДЛОГИ (новые) ===
  "около": { root: "kōl-sen", pos: "prep" },
  "над": { root: "dzen-sen", pos: "prep" },
  "за границей": { root: "rak-sen", pos: "prep" },

  // === СОЮЗЫ (новые) ===
  "через": { root: "thal-sen", pos: "conj" },

  // === КОНСТРУКЦИИ ===
  "педаль газа": { root: "nur-khō", pos: "phrase" },
  "педали газа": { root: "nur-khō", pos: "phrase" },
  "несчастный случай": { root: "ān-thal-mōr", pos: "phrase" },
  "несчастного случая": { root: "ān-thal-mōr", pos: "phrase" },
  "вместить": { root: "okh-sen", pos: "verb" },
  "вмещаю": { root: "okh-sen", pos: "verb" },
  "вмещаешь": { root: "okh-sen", pos: "verb" },
  "вмещает": { root: "okh-sen", pos: "verb" },
  "вмещаем": { root: "okh-sen", pos: "verb" },
  "вмещаете": { root: "okh-sen", pos: "verb" },
  "вмещают": { root: "okh-sen", pos: "verb" },
  "вместил": { root: "okh-sen", pos: "verb" },
  "вместила": { root: "okh-sen", pos: "verb" },
  "вместили": { root: "okh-sen", pos: "verb" },

  "соответственно": { root: "un-thal", pos: "adv" },
  "аккуратный": { root: "thal-tsan", pos: "adj" },
  "аккуратная": { root: "thal-tsan", pos: "adj" },
  "аккуратное": { root: "thal-tsan", pos: "adj" },
  "аккуратные": { root: "thal-tsan", pos: "adj" },
  
  // === ДОПОЛНИТЕЛЬНЫЕ ВАРИАНТЫ НАПИСАНИЯ ===
  "пещеры под фарсидой": { root: "Khō-ān-sen", pos: "phrase" },
  "пещер под фарсидой": { root: "Khō-ān-sen", pos: "phrase" }
};

// ============================================================
// 1. ЗАГРУЗКА СЛОВАРЯ (ТОЛЬКО ВСТРОЕННЫЙ)
// ============================================================
let lexicon = {};
let showGlyphs = false;

// Принудительно загружаем встроенный словарь
function loadBuiltin() {
  lexicon = LEXICON_DATA;
  document.getElementById('translation').textContent = '✅ Словарь загружен (встроенный, ' + Object.keys(lexicon).length + ' слов). Введите текст.';
  document.getElementById('translation').className = 'result';
  console.log('Встроенный словарь загружен, слов:', Object.keys(lexicon).length);
}

loadBuiltin();

// Дополнительно пробуем загрузить внешний для расширения (но не заменяем встроенный)
fetch('/mars-encyclopedia/assets/dictionary.json')
  .then(response => {
    if (!response.ok) throw new Error('External dict not found');
    return response.json();
  })
  .then(data => {
    if (data.lexicon && typeof data.lexicon === 'object') {
      // Дополняем встроенный словарь внешними словами (если есть)
      Object.assign(lexicon, data.lexicon);
      document.getElementById('translation').textContent = '✅ Словарь расширен внешним (' + Object.keys(lexicon).length + ' слов).';
    }
  })
  .catch(err => {
    console.log('Внешний словарь не загружен, использую только встроенный.');
  });

// ============================================================
// 2. ЛЕММАТИЗАЦИЯ
// ============================================================
function normalize(word) {
  return word.toLowerCase().replace(/ё/g, 'е');
}

// Дополнительная лемматизация для глаголов (если их нет в словаре)
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
  "шёл": "идти", "шла": "идти", "шли": "идти",
  "полетел": "лететь", "полетела": "лететь", "полетели": "лететь",
  "плыл": "плыть", "плыла": "плыть", "плыли": "плыть",
  "рисовать": "thalur", "рисую": "thalur", "рисуешь": "thalur",
  "рисует": "thalur", "рисуем": "thalur", "рисуете": "thalur",
  "рисуют": "thalur", "рисовал": "thalur", "рисовала": "thalur",
  "рисовали": "thalur", "картина": "thalrak", "картины": "thalrak",
  "ем": "есть", "ешь": "есть", "ест": "есть", "едим": "есть", "едят": "есть",
  "ел": "есть", "ела": "есть", "ели": "есть",
  "полететь": "zalur", "полечу": "zalur", "полетишь": "zalur", "полетит": "zalur",
  "полетим": "zalur", "полетите": "zalur", "полетят": "zalur", "слушаю": "слушать",
  "слушаешь": "слушать", "слушает": "слушать", "слушаем": "слушать", "слушаете": "слушать",
  "слушают": "слушать", "слушал": "слушать", "слушала": "слушать", "слушали": "слушать",
  "посвятил": "посвятить", "посвятила": "посвятить", "посвятили": "посвятить",
  "увидел": "увидеть", "увидела": "увидеть", "увидели": "увидеть",
  "систематизирует": "систематизировать", "посмотрю": "посмотреть", 
  "посмотришь": "посмотреть", "посмотрит": "посмотреть", "посмотрим": "посмотреть",
  "посмотрите": "посмотреть", "посмотрят": "посмотреть", "посмотрел": "посмотреть",
  "посмотрела": "посмотреть", "посмотрели": "посмотреть", "пойду": "пойти",
  "пойдёшь": "пойти", "пойдёт": "пойти", "пойдём": "пойти", "пойдёте": "пойти",
  "пойдут": "пойти", "пошёл": "пойти", "пошла": "пойти", "пошли": "пойти", "куплю": "купить",
  "купишь": "купить", "купит": "купить", "купим": "купить", "купите": "купить", "купят": "купить",
  "купил": "купить", "купила": "купить", "купили": "купить"
};

// ============================================================
// СЛОВАРЬ ИЕРОГЛИФОВ (целые слова → символы)
// ============================================================
const MARTIAN_GLYPHS = {
  // === ОСНОВНЫЕ КОРНИ (ваши иероглифы) ===
  "ākha": "〰",   // вода (три волнистые линии)
  "okh": "⌂",       // дом
  "kōl": "✦",       // земля (почва)
  "khō": "★",       // огонь (круг с пятью отрезками как звезда)
  "mar": "⊙",       // жизнь (круг с горизонтальным овалом внутри)
  "lān": "∞",       // память (знак бесконечности)
  "thal": "┤",      // смотреть (вертикальная палка с двумя округлыми линиями)
  "rōg": "▲",       // король (вертикальный треугольник с палкой, как флажок)
  "khan": "¢",     // река (палка вертикальная с буквой "С" в ней)
  "sen": "P",       // место (символ похож на букву Р, но с несоприкасающейся линией)
  "īn": "Λ",        // суффикс мужского рода (треугольник без нижней линии)
  "dzen": "✦",      // звезда (можно использовать другой символ, если хотите)
  
  // === СУФФИКСЫ ===
  "zān": "◉",      // вариант множественного числа
  "ur": "↗",       // причастие
  
  // === ЧАСТИЦЫ ===
  "nu": "≡",       // прошедшее время
  "shu": "≠",      // будущее время
  "ān": "✖",       // отрицание (повтор, но ок)
  "kha": "ɉ",      // вопрос
  "rak": "ϔ",     // пассив
  "thu": "҉",     // косвенная речь
  
  // === СОЮЗЫ ===
  "un": "Ⴕ",      // и
  "kan": "‖",     // но
  "tsen": "‽",    // когда
  "tal": "‡",    // потому что
};

// ============================================================
// МАРСИАНСКИЙ АЛФАВИТ (буквы → символы)
// ============================================================
const MARTIAN_ALPHABET = {
  // Согласные
  'm': '▭•••',       // прямоугольник с 3 точками внутри
  'n': '▭••',       // прямоугольник с 2 точками (нужен другой символ)
  'r': '⊙',        // кружок с точкой по середине
  'l': '○',        // круг пустой (прозрачный)
  'k': '▷',        // перевёрнутый треугольник (вершина в правой стороне)
  'g': '◁',        // перевёрнутый треугольник (вершина в левой стороне)
  'kh': '△',       // нормальный треугольник
  'gh': '▽',       // перевёрнутый треугольник (вершина внизу)
  't': '|',        // вертикальная палка
  'd': '—',        // горизонтальная палка
  'ts': '✖',       // крестик
  'dz': 'ⴕ',       // католический крест
  'th': '/',       // наклонная палка
  'f': 'Ꙙ',       // наклонная палка (другая сторона)
  'x': '♢',        // ромб
  's': 'Ꝉ',        // пока стандартная
  'z': 'I',        // пока стандартная
  'p': 'p',        // пока стандартная
  'b': 'b',        // пока стандартная
  'v': 'v',        // пока стандартная
  'w': 'ꬷ',        // пока стандартная
  'y': 'Y',        // пока стандартная
  'c': 'ꝇ',        // пока стандартная
  'j': '꜡',        // пока стандартная
  'q': 'Ꚛ',        // пока стандартная
  
  // Гласные (будут накладываться поверх согласных)
  'a': '՚',        // как запятая сверху символа
  'ā': '¬',        // как символ приставки
  'o': 'ᵕ',        // перевёрнутая скобка, похожа на "U"
  'ō': 'ᵔ',        // перевёрнутая буква U
  'u': '°',        // одна короткая линия
  'ū': 'ˉˉ',       // две вертикальные короткие линии
  'i': '↯',        // сложный символ
  'e': 'Ƨ',        // символ похож на отзеркаленную F
  'ē': 'Ƨ̱',        // отзеркаленная F с палкой по середине
};
// ============================================================
// ПРЕОБРАЗОВАНИЕ В ИЕРОГЛИФЫ
// ============================================================
function toGlyphs(text) {
  // Разбиваем текст на слова
  const words = text.split(' ');
  const result = [];
  
  for (let word of words) {
    // 1. Проверяем, есть ли точное совпадение в словаре иероглифов
    if (MARTIAN_GLYPHS[word]) {
      result.push(MARTIAN_GLYPHS[word]);
      continue;
    }
    
    // 2. Если точного совпадения нет, транслитерируем по буквам
    let glyphWord = '';
    let i = 0;
    while (i < word.length) {
      // Проверяем двухбуквенные сочетания (kh, gh, th, dz, ts)
      const twoChars = word.substring(i, i + 2);
      if (twoChars in MARTIAN_ALPHABET) {
        glyphWord += MARTIAN_ALPHABET[twoChars];
        i += 2;
      } else {
        // Проверяем одиночные буквы
        const char = word.charAt(i);
        if (char in MARTIAN_ALPHABET) {
          glyphWord += MARTIAN_ALPHABET[char];
        } else {
          // Если символ не найден, оставляем букву как есть
          glyphWord += char;
        }
        i++;
      }
    }
    result.push(glyphWord);
  }
  return result.join(' ');
}
  
function findInLexicon(word) {
  const norm = normalize(word);
  // Точное совпадение
  if (lexicon[norm]) {
    return { found: true, entry: lexicon[norm], lemma: norm };
  }
  // Лемматизация глагола
  if (VERB_LEMMAS[norm]) {
    const inf = VERB_LEMMAS[norm];
    if (lexicon[inf]) {
      return { found: true, entry: lexicon[inf], lemma: inf };
    }
  }
  // Убираем окончания для существительных (падежи)
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
  return { found: false };
}
  
// ============================================================
// 2.5 ОБРАБОТКА ФРАЗ-ПРИВЕТСТВИЙ
// ============================================================
function checkPhrases(text) {
  const lower = text.toLowerCase();
  const phraseMap = {
    "привет": "Mar dzen",
    "здравствуй": "Mar dzen",
    "здравствуйте": "Mar dzen",
    "добрый день": "Mar dzen",
    "до свидания": "Lān mar",
    "прощай": "Lān mar",
    "прощайте": "Ariya lān",
    "очень приятно": "Tsan lān",
    "спасибо": "Tsan lān",
    "глина помнит": "Lān sur",
    "письмо из красной пыли": "Khalur khō sur",
    "марсианская энциклопедия": "Tsankhō Marzān",
    "красная пыль": "Khō sur",
    "мнемис": "Lānīn"
  };
  for (let key in phraseMap) {
    if (lower.includes(key)) {
      return { found: true, translation: phraseMap[key] };
    }
  }
  return { found: false };
}

// ============================================================
// ПЕРЕКЛЮЧЕНИЕ РЕЖИМА ИЕРОГЛИФОВ
// ============================================================
function toggleGlyphs() {
  showGlyphs = !showGlyphs;
  const button = document.getElementById('glyphToggle');
  if (showGlyphs) {
    button.textContent = '📝 Латиница';
    button.style.background = '#e67e22';
    document.getElementById('translation').classList.add('glyph-mode');
  } else {
    button.textContent = '🔮 Иероглифы';
    button.style.background = '#6c7a8a';
    document.getElementById('translation').classList.remove('glyph-mode');
  }
  // Если есть текст, обновляем перевод
  const input = document.getElementById('inputText').value.trim();
  if (input) {
    translateText();
  }
}
  
// ============================================================
// 3. ОСНОВНАЯ ЛОГИКА ПЕРЕВОДА
// ============================================================
const PREPOSITIONS = ['на','в','у','к','от','из','для','без','через','по','о','об','с','со','за','под','над','перед','между','возле','около','мимо','вокруг'];
const PLURAL_WORDS = [
  'звёзды','звезды','звёзд','звезд','воды','вод','реки','рек','горы','гор',
  'люди','людей','марсиане','марсиан','дома','домов','столы','столов','стулья','стульев',
  'кровати','кроватей','леса','лесов','поля','полей','дети','детей','глаза','глаз'
];

function translateText() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    document.getElementById('translation').textContent = 'Введите текст для перевода.';
    document.getElementById('gloss').textContent = '';
    return;
  }
// ============================================================
  // ПРОВЕРКА НА ФРАЗЫ-ПРИВЕТСТВИЯ
  // ============================================================
  const phraseResult = checkPhrases(input);
  if (phraseResult.found) {
    document.getElementById('translation').textContent = phraseResult.translation;
    document.getElementById('gloss').textContent = 'Подстрочник: ' + phraseResult.translation;
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
 // Проверяем отдельные слова "не" и "нет" среди всех токенов
const hasNegation = rawWords.some(w => {
  const clean = w.replace(/[^а-яa-zё]/gi, '').toLowerCase();
  return clean === 'не' || clean === 'нет';
});
if (hasNegation) {
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
  // === ВЫВОД ПЕРЕВОДА (с поддержкой иероглифов) ===
  if (showGlyphs) {
    const glyphTranslation = toGlyphs(translation);
    document.getElementById('translation').textContent = glyphTranslation;
    document.getElementById('gloss').textContent = 'Латиница: ' + translation;
  } else {
    document.getElementById('translation').textContent = translation;
    // Восстанавливаем обычный подстрочник
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
