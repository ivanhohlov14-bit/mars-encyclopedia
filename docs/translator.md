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
  // === МЕСТОИМЕНИЯ (все падежи) ===
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

  // === СУЩЕСТВИТЕЛЬНЫЕ ===
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

  // === ПРИЛАГАТЕЛЬНЫЕ ===
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

  // === ГЛАГОЛЫ (все формы) ===
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

  // === СОЮЗЫ И ЧАСТИЦЫ ===
  "и": { root: "un", pos: "conj" },
  "но": { root: "kan", pos: "conj" },
  "когда": { root: "tsen", pos: "conj" },
  "потому что": { root: "tal", pos: "conj" },
  "не": { root: "ān", pos: "particle" },
  "нет": { root: "ān", pos: "particle" },
    // === НОВЫЕ СЛОВА (добавлено для устранения ошибок) ===
  "живой": { root: "mar", pos: "adj" },
  "жива": { root: "mar", pos: "adj" },
  "живо": { root: "mar", pos: "adj" },
  "живы": { root: "mar", pos: "adj" },
  "жив": { root: "mar", pos: "adj" },
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
  "это": { root: "thal", pos: "pron" },
  "этого": { root: "thal", pos: "pron" },
  "этому": { root: "thal", pos: "pron" },
  "этим": { root: "thal", pos: "pron" },
  "этом": { root: "thal", pos: "pron" },
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
  // === ДОПОЛНИТЕЛЬНЫЕ СЛОВА (спал, этом, рисовать, картины, море, тихий, пишу) ===
  "спал": { root: "sūl", pos: "verb" },
  "спала": { root: "sūl", pos: "verb" },
  "спали": { root: "sūl", pos: "verb" },
  "этом": { root: "thal", pos: "pron" },
  "этой": { root: "thal", pos: "pron" },
  "эти": { root: "thal", pos: "pron" },
  "этих": { root: "thal", pos: "pron" },
  "этим": { root: "thal", pos: "pron" },
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
  "картины": { root: "thalrak", pos: "noun" },
  "картина": { root: "thalrak", pos: "noun" },
  "море": { root: "ākha", pos: "noun" },
  "моря": { root: "ākha", pos: "noun" },
  "морю": { root: "ākha", pos: "noun" },
  "морем": { root: "ākha", pos: "noun" },
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
    // === НОВЫЕ СЛОВА (планеты, космос, корабли, эмоции и пр.) ===
  "марс": { root: "Mars", pos: "noun" },
  "планета": { root: "planeta", pos: "noun" },
  "планеты": { root: "planeta", pos: "noun" },
  "планет": { root: "planeta", pos: "noun" },
  "космос": { root: "kosmos", pos: "noun" },
  "ракета": { root: "raketa", pos: "noun" },
  "ракеты": { root: "raketa", pos: "noun" },
  "ракет": { root: "raketa", pos: "noun" },
  "корабль": { root: "korabl", pos: "noun" },
  "корабли": { root: "korablān", pos: "noun" },
  "кораблей": { root: "korablān", pos: "noun" },
  "корабля": { root: "korabl", pos: "noun" },
  "море": { root: "ākha", pos: "noun" },
  "моря": { root: "ākha", pos: "noun" },
  "морю": { root: "ākha", pos: "noun" },
  "морем": { root: "ākha", pos: "noun" },
  "море": { root: "ākha", pos: "noun" },
  "все": { root: "tō", pos: "pron" },
  "всего": { root: "tō", pos: "pron" },
  "всем": { root: "tō", pos: "pron" },
  "всеми": { root: "tō", pos: "pron" },
  "всех": { root: "tō", pos: "pron" },
  "плодородный": { root: "mar", pos: "adj" },
  "плодородная": { root: "mar", pos: "adj" },
  "плодородное": { root: "mar", pos: "adj" },
  "плодородные": { root: "mar", pos: "adj" },
  "плодородными": { root: "mar", pos: "adj" },
  "тихий": { root: "nōkh", pos: "adj" },
  "тихая": { root: "nōkh", pos: "adj" },
  "тихое": { root: "nōkh", pos: "adj" },
  "тихие": { root: "nōkh", pos: "adj" },
  "тихим": { root: "nōkh", pos: "adj" },
  "аравия": { root: "Aravia", pos: "noun" },
  "аравии": { root: "Aravia", pos: "noun" },
  "аравию": { root: "Aravia", pos: "noun" },
  "ацидалийский": { root: "Acidalia", pos: "adj" },
  "ацидалийская": { root: "Acidalia", pos: "adj" },
  "ацидалийское": { root: "Acidalia", pos: "adj" },
  "ацидалийскому": { root: "Acidalia", pos: "adj" },
  "ацидалийские": { root: "Acidalia", pos: "adj" },
   // === НОВЫЕ СЛОВА (добавлено по запросу) ===
  // Вопросительные слова
  "куда": { root: "nur", pos: "adv" },
  "куда?": { root: "nur", pos: "adv" },
  // Прилагательные
  "прекрасный": { root: "suf", pos: "adj" },
  "прекрасная": { root: "suf", pos: "adj" },
  "прекрасное": { root: "suf", pos: "adj" },
  "прекрасные": { root: "suf", pos: "adj" },
  "погода": { root: "zal", pos: "noun" },
  "погоды": { root: "zal", pos: "noun" },
  // Глаголы и существительные для энциклопедии
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
  "марс (планета)": { root: "Mars", pos: "noun" },
  "эпоха умирания": { root: "mōr", pos: "noun" },
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
  "книгах": { root: "kitab", pos: "noun" },
  "материалы": { root: "lān", pos: "noun" },
  "основаны": { root: "sen", pos: "verb" },
  "глиняные таблички": { root: "sur", pos: "noun" },
  "глиняных табличках": { root: "sur", pos: "noun" },
  "найденных": { root: "thal", pos: "verb" },
  "историком": { root: "xal", pos: "noun" },
  "подземном храме": { root: "okh", pos: "noun" },
  "долины": { root: "thalōk", pos: "noun" },
  "ксанфа": { root: "Ksanf", pos: "noun" },
  "поздних": { root: "xal", pos: "adj" },
  "записях": { root: "lān", pos: "noun" },
  "академии": { root: "tsankhō", pos: "noun" },
  "окхасена": { root: "Okhasen", pos: "noun" },
  // Существительные для науки
  "наука": { root: "tsankhō", pos: "noun" },
  "науки": { root: "tsankhō", pos: "noun" },
  "исследование": { root: "xur", pos: "noun" },
  "исследования": { root: "xur", pos: "noun" },
  "знания": { root: "tsan", pos: "noun" },
  // === ПРИВЕТСТВИЯ И ФОРМУЛЫ ВЕЖЛИВОСТИ (из Свитка Ж) ===
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
  // === ЕДА И БЫТ (из Свитка Ж) ===
  "есть (принимать пищу)": { root: "ōkhar", pos: "verb" },
  "ем": { root: "ōkhar", pos: "verb" },
  "ешь": { root: "ōkhar", pos: "verb" },
  "ест": { root: "ōkhar", pos: "verb" },
  "едим": { root: "ōkhar", pos: "verb" },
  "едят": { root: "ōkhar", pos: "verb" },
  "ел": { root: "ōkhar", pos: "verb" },
  "ела": { root: "ōkhar", pos: "verb" },
  "ели": { root: "ōkhar", pos: "verb" },
  "сегодня": { root: "sōl", pos: "noun" },
  "завтра": { root: "dzenur", pos: "noun" },
  "вчера": { root: "lānur", pos: "noun" },
  "красивый": { root: "suf", pos: "adj" },
  "красивая": { root: "suf", pos: "adj" },
  "красивое": { root: "suf", pos: "adj" },
  "красивые": { root: "suf", pos: "adj" },
  "ракета": { root: "raketa", pos: "noun" },
  "ракеты": { root: "raketa", pos: "noun" },
  "ракету": { root: "raketa", pos: "noun" },
  "корабль": { root: "korabl", pos: "noun" },
  "корабли": { root: "korablān", pos: "noun" },
  // === ИМЕНА СОБСТВЕННЫЕ ===
  "иван": { root: "Ivan", pos: "noun" },
  "ивана": { root: "Ivan", pos: "noun" },
  "ивану": { root: "Ivan", pos: "noun" },
  "Мнемис": {root: "Lānsur", pos: "noun"},
  "Mnemis": {root: "Lānsur", pos: "noun"},
  "талин": { root: "Talīn", pos: "noun" },
  "хевсур": { root: "Khevsur", pos: "noun" },
  "йарра": { root: "Yarra", pos: "noun" },
  "элла": { root: "Ella", pos: "noun" },
  "аратан": { root: "Aratan", pos: "noun" },
    // === ГЕОГРАФИЧЕСКИЕ НАЗВАНИЯ ===
  "ацидалийское море": { root: "Acidalia", pos: "noun" },
  "фарсида": { root: "Khōsen", pos: "noun" },
  "эллада": { root: "Ellada", pos: "noun" },
  "утопия": { root: "Kōl-ghar", pos: "noun" },
  "аравия": { root: "Aravia", pos: "noun" },
  "окхасен": { root: "Okhasen", pos: "noun" },
  "роген-ария": { root: "Rogen-Ariya", pos: "noun" },
  "ксанф": { root: "Ksanf", pos: "noun" },
  "долина маринера": { root: "Valles", pos: "noun" },
  "олимп": { root: "Olympus", pos: "noun" },
// === ДИАЛЕКТЫ (замена русских диалектов) ===
  "южный": { root: "ellada", pos: "adj" },
  "элладский": { root: "ellada", pos: "adj" },
  "по-элладски": { root: "ellada", pos: "adv" },
  "западный": { root: "utopia", pos: "adj" },
  "утопийский": { root: "utopia", pos: "adj" },
  "по-утопийски": { root: "utopia", pos: "adv" },
  "центральный": { root: "okhasen", pos: "adj" },
  "окхасенский": { root: "okhasen", pos: "adj" },
   // === НОВЫЕ СЛОВА (добавлено по запросу) ===
  // Существительные
  "книга": { root: "kitab", pos: "noun" },
  "книги": { root: "kitab", pos: "noun" },
  "книгу": { root: "kitab", pos: "noun" },
  "книг": { root: "kitab", pos: "noun" },
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
  "красный": { root: "khō", pos: "adj" },
  "красная": { root: "khō", pos: "adj" },
  "красное": { root: "khō", pos: "adj" },
  "красной": { root: "khō", pos: "adj" },
  "красную": { root: "khō", pos: "adj" },
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
  // Прилагательные
  "добрый": { root: "suf", pos: "adj" },
  "добрая": { root: "suf", pos: "adj" },
  "доброе": { root: "suf", pos: "adj" },
  "яркий": { root: "dzēn", pos: "adj" },
  "яркая": { root: "dzēn", pos: "adj" },
  "яркое": { root: "dzēn", pos: "adj" },
  "яркую": { root: "dzēn", pos: "adj" },
  "красивый": { root: "suf", pos: "adj" },
  "красивая": { root: "suf", pos: "adj" },
  "красивое": { root: "suf", pos: "adj" },
  "красивую": { root: "suf", pos: "adj" },
  "независимый": { root: "ari", pos: "adj" },
  "независимая": { root: "ari", pos: "adj" },
  "независимое": { root: "ari", pos: "adj" },
  "справочный": { root: "tsan", pos: "adj" },
  "справочная": { root: "tsan", pos: "adj" },
  "справочное": { root: "tsan", pos: "adj" },
  "посвящённый": { root: "lān", pos: "adj" },
  "посвящённая": { root: "lān", pos: "adj" },
  "посвящённое": { root: "lān", pos: "adj" },
  // === НОВЫЕ СЛОВА ДЛЯ СЛОЖНЫХ ТЕКСТОВ (добавлено по запросу) ===
  // Существительные
  "порт": { root: "port", pos: "noun" },
  "порта": { root: "port", pos: "noun" },
  "порту": { root: "port", pos: "noun" },
  "портом": { root: "port", pos: "noun" },
  "порте": { root: "port", pos: "noun" },
  "глина": { root: "sur", pos: "noun" },
  "глины": { root: "sur", pos: "noun" },
  "глине": { root: "sur", pos: "noun" },
  "глину": { root: "sur", pos: "noun" },
  "глиной": { root: "sur", pos: "noun" },
  "глиняных": { root: "sur", pos: "noun" }, // форма мн.ч. род.п.
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
  "сбор": { root: "xur", pos: "noun" },
  "сбора": { root: "xur", pos: "noun" },
  "сбору": { root: "xur", pos: "noun" },
  "сохранение": { root: "lān", pos: "noun" },
  "сохранения": { root: "lān", pos: "noun" },
  "сохранению": { root: "lān", pos: "noun" },
  "знаний": { root: "tsan", pos: "noun" },
  "астронавигатор": { root: "dzenurīn", pos: "noun" },
  "астронавигатора": { root: "dzenurīn", pos: "noun" },
  "год": { root: "amār", pos: "noun" }, // уже есть, но добавим падеж
  "года": { root: "amār", pos: "noun" },
  "году": { root: "amār", pos: "noun" },
  "годы": { root: "amār", pos: "noun" },
  // Прилагательные
  "подземный": { root: "kōl", pos: "adj" },
  "подземная": { root: "kōl", pos: "adj" },
  "подземное": { root: "kōl", pos: "adj" },
  "подземном": { root: "kōl", pos: "adj" },
  "главный": { root: "ari", pos: "adj" },
  "главная": { root: "ari", pos: "adj" },
  "главное": { root: "ari", pos: "adj" },
  // Глаголы (формы)
  "посвятить": { root: "lān", pos: "verb" },
  "посвятил": { root: "lān", pos: "verb" },
  "посвятила": { root: "lān", pos: "verb" },
  "посвятили": { root: "lān", pos: "verb" },
  "увидеть": { root: "thal", pos: "verb" },
  "увидел": { root: "thal", pos: "verb" },
  "увидела": { root: "thal", pos: "verb" },
  "увидели": { root: "thal", pos: "verb" },
  "систематизировать": { root: "tsan", pos: "verb" },
  "систематизирует": { root: "tsan", pos: "verb" },
  // Союзы и наречия
  "а": { root: "un", pos: "conj" },
  "также": { root: "un", pos: "conj" },
  "более": { root: "suf", pos: "adv" },
  "впервые": { root: "on", pos: "adv" },
  // Местоимения
  "свой": { root: "an", pos: "pron" },
  "своя": { root: "an", pos: "pron" },
  "своё": { root: "an", pos: "pron" },
  "свою": { root: "an", pos: "pron" },
  "свои": { root: "an", pos: "pron" },
  "своих": { root: "an", pos: "pron" },
  // Глаголы (инфинитивы и формы)
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
   // === НОВЫЕ СЛОВА (добавлено 26.06.2026) ===
  // Прилагательные (падежные формы)
  "доброй": { root: "suf", pos: "adj" },
  "добрую": { root: "suf", pos: "adj" },
  "добрым": { root: "suf", pos: "adj" },
  "добрыми": { root: "suf", pos: "adj" },
  "добрых": { root: "suf", pos: "adj" },
  "ярким": { root: "dzēn", pos: "adj" },
  "яркими": { root: "dzēn", pos: "adj" },
  "ярких": { root: "dzēn", pos: "adj" },
  "красивым": { root: "suf", pos: "adj" },
  "красивыми": { root: "suf", pos: "adj" },
  "красивых": { root: "suf", pos: "adj" },
  "жарким": { root: "khō", pos: "adj" },
  "жаркими": { root: "khō", pos: "adj" },
  "жарких": { root: "khō", pos: "adj" },
  "мёртвой": { root: "mōr", pos: "adj" },
  "мёртвую": { root: "mōr", pos: "adj" },
  "мёртвым": { root: "mōr", pos: "adj" },
  "мёртвыми": { root: "mōr", pos: "adj" },
  "мёртвых": { root: "mōr", pos: "adj" },
  // Существительные (новые)
  "город": { root: "okhsen", pos: "noun" },
  "города": { root: "okhsen", pos: "noun" },
  "городу": { root: "okhsen", pos: "noun" },
  "городом": { root: "okhsen", pos: "noun" },
  "городе": { root: "okhsen", pos: "noun" },
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
  "струнам": { root: "thōl", pos: "noun" },
  "струнами": { root: "thōl", pos: "noun" },
  "струнах": { root: "thōl", pos: "noun" },
  "металл": { root: "khōs", pos: "noun" },
  "металла": { root: "khōs", pos: "noun" },
  "металлу": { root: "khōs", pos: "noun" },
  "металлом": { root: "khōs", pos: "noun" },
  "металле": { root: "khōs", pos: "noun" },
  "металлический": { root: "khōsīn", pos: "adj" },
  "металлическая": { root: "khōsīn", pos: "adj" },
  "металлическое": { root: "khōsīn", pos: "adj" },
  "металлические": { root: "khōsīn", pos: "adj" },
  "металлических": { root: "khōsīn", pos: "adj" },
  "металлическим": { root: "khōsīn", pos: "adj" },
  "металлическими": { root: "khōsīn", pos: "adj" },
  // Наречия и союзы
  "вместе": { root: "tō", pos: "adv" },
  "очень": { root: "suf", pos: "adv" },
  "там": { root: "sen", pos: "adv" },
  "много": { root: "suf", pos: "adv" },
  // Глаголы (дополнительные формы)
  "полететь": { root: "zalur", pos: "verb" },
  "полечу": { root: "zalur", pos: "verb" },
  "полетишь": { root: "zalur", pos: "verb" },
  "полетит": { root: "zalur", pos: "verb" },
  "полетим": { root: "zalur", pos: "verb" },
  "полетите": { root: "zalur", pos: "verb" },
  "полетят": { root: "zalur", pos: "verb" },
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
  // Особое слово: "русский" как древний язык
  "русский": { root: "xaltsan", pos: "adj" },
  "русская": { root: "xaltsan", pos: "adj" },
  "русское": { root: "xaltsan", pos: "adj" },
  "русском": { root: "xaltsan", pos: "adj" },
  "русском (язык)": { root: "xaltsan", pos: "noun" },
   "язык": { root: "tsan", pos: "noun" },
  "языка": { root: "tsan", pos: "noun" },
  "языку": { root: "tsan", pos: "noun" },
  "языком": { root: "tsan", pos: "noun" },
  "вода-море": {root: "ākha-thal", pos: "noun"},
  "трон": {root:"rogen", pos: "noun"},
  "трону": {root:"rogen", pos: "noun"},
  "троне": {root:"rogen", pos: "noun"},
  "у воды":{root:"aria", pos: "noun"},
  "звёздная": {root:"dzen", pos: "adj"},
  "звёздный": {root:"dzen", pos: "adj"},
  "звёздное": {root:"dzen", pos: "adj"},
  "звёздном": {root:"dzen", pos: "adj"},
  "звёздную": {root:"dzen", pos: "adj"},
  "звёздное": {root:"dzen", pos: "adj"},
  "карта": {root:"thala", pos: "noun"},
  "карте": {root:"thala", pos: "noun"},
  "карту": {root:"thala", pos: "noun"},
  "картой": {root:"thala", pos: "noun"},
  "небо": {root:"sura", pos: "noun"},
  "неба": {root:"sura", pos: "noun"},
  "небу": {root:"sura", pos: "noun"},
  "небе": {root:"sura", pos: "noun"},
  "небой": {root:"sura", pos: "noun"},
  "небесный": {root:"sura", pos: "noun"},
  "небесная": {root:"sura", pos: "noun"}
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
