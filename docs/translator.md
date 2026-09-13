---
title: Марсианский переводчик
---

<style>
  .translator-container {
    max-width: 950px; margin: 0 auto; padding: 20px;
    background: #f5f7fa; border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-family: 'Segoe UI', Roboto, sans-serif;
  }
  h2 { margin-top: 0; color: #1a3b5c; display: flex; align-items: center; gap: 10px; }
  .hint {
    background: #e4edf7; padding: 14px 18px; border-radius: 8px;
    margin-bottom: 20px; font-size: 14px; border-left: 5px solid #2a5c8a; line-height: 1.5;
  }
  textarea {
    width: 100%; height: 140px; padding: 14px; font-size: 16px;
    border: 2px solid #ccd7e6; border-radius: 8px; resize: vertical;
    box-sizing: border-box; font-family: inherit;
  }
  textarea:focus { border-color: #2a5c8a; outline: none; box-shadow: 0 0 0 3px rgba(42,92,138,0.2); }
  .buttons { margin: 18px 0; display: flex; gap: 12px; flex-wrap: wrap; }
  .buttons button {
    padding: 12px 28px; background: #2a5c8a; color: white; border: none;
    border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;
    transition: all 0.2s;
  }
  .buttons button:hover { background: #1d4370; transform: translateY(-1px); }
  .buttons button.secondary { background: #6c7a8a; }
  .buttons button.secondary:hover { background: #5a6777; }
  #output { margin-top: 20px; }
  .result {
    padding: 18px 22px; background: white; border-left: 6px solid #2a5c8a;
    border-radius: 8px; white-space: pre-wrap; word-wrap: break-word;
    font-size: 18px; line-height: 1.7; min-height: 60px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  }
  .gloss {
    color: #444; font-style: italic; margin-top: 10px; font-size: 14px;
    background: #f0f4f8; padding: 10px 16px; border-radius: 6px;
    border-left: 3px solid #b0c4de;
  }
  .footer {
    margin-top: 25px; font-size: 13px; color: #777; text-align: center;
    border-top: 1px solid #e0e6ed; padding-top: 15px;
  }
</style>

<div class="translator-container">
  <h2>🪐 Переводчик на марсианский язык</h2>
  <div class="hint">
    <strong>Как пользоваться:</strong> Введите предложение на русском. Переводчик найдёт слова в словаре или сгенерирует их автоматически.
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
// 0. ПОЛНЫЙ ВСТРОЕННЫЙ СЛОВАРЬ (ТВОЙ)
// ============================================================
const LEXICON_DATA = {
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
  "рубеж": { root: "rak", pos: "noun" },
  "граница": { root: "rak", pos: "noun" },
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
  "точка": { root: "tokha", pos: "noun" },
  "точки": { root: "tokha", pos: "noun" },
  "точке": { root: "tokha", pos: "noun" },
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
  "побережье": { root: "ākhasen", pos: "noun" },
  "пустыня": { root: "xalkōl", pos: "noun" },
  "пустыни": { root: "xalkōl", pos: "noun" },
  "музыка": { root: "sōlmar", pos: "noun" },
  "струна": { root: "thōl", pos: "noun" },
  "струны": { root: "thōl", pos: "noun" },
  "металл": { root: "khōs", pos: "noun" },
  "металла": { root: "khōs", pos: "noun" },
  "порт": { root: "sen", pos: "noun" },
  "глина": { root: "sur", pos: "noun" },
  "глины": { root: "sur", pos: "noun" },
  "глине": { root: "sur", pos: "noun" },
  "глину": { root: "sur", pos: "noun" },
  "табличка": { root: "lān", pos: "noun" },
  "таблички": { root: "lān", pos: "noun" },
  "храм": { root: "sen", pos: "noun" },
  "храма": { root: "sen", pos: "noun" },
  "историк": { root: "xalur", pos: "noun" },
  "писец": { root: "khalur", pos: "noun" },
  "хранитель": { root: "lānīn", pos: "noun" },
  "архив": { root: "lānsen", pos: "noun" },
  "история": { root: "lānkhō", pos: "noun" },
  "истории": { root: "lānkhō", pos: "noun" },
  "география": { root: "kōlkhō", pos: "noun" },
  "культура": { root: "xalmar", pos: "noun" },
  "народ": { root: "mārīn", pos: "noun" },
  "народы": { root: "mārīnān", pos: "noun" },
  "персонаж": { root: "mārīn", pos: "noun" },
  "событие": { root: "thal", pos: "noun" },
  "артефакт": { root: "gharokh", pos: "noun" },
  "страж": { root: "strah", pos: "noun" },
  "книга": { root: "kitab", pos: "noun" },
  "книги": { root: "kitab", pos: "noun" },
  "телескоп": { root: "dzenur", pos: "noun" },
  "имя": { root: "nām", pos: "noun" },
  "имена": { root: "nām", pos: "noun" },
  "вселенная": { root: "dzenlān", pos: "noun" },
  "письмо": { root: "khalur", pos: "noun" },
  "пыль": { root: "sur", pos: "noun" },
  "энциклопедия": { root: "tsankhō", pos: "noun" },
  "ресурс": { root: "lān", pos: "noun" },
  "цикл": { root: "amār", pos: "noun" },
  "роман": { root: "thal", pos: "noun" },
  "автор": { root: "khalur", pos: "noun" },
  "наука": { root: "tsankhō", pos: "noun" },
  "исследование": { root: "xur", pos: "noun" },
  "высота": { root: "dzenur", pos: "noun" },
  "низина": { root: "kōlur", pos: "noun" },
  "грусть": { root: "mōrmar", pos: "noun" },
  "помощь": { root: "lānīn", pos: "noun" },
  "покой": { root: "nōkh", pos: "noun" },
  "убежище": { root: "ānsen", pos: "noun" },
  "акха-дзен": { root: "Ākha-dzen", pos: "noun" },
  "кол-хан": { root: "Kōl-khan", pos: "noun" },
  "дзен-акха": { root: "Dzen-ākha", pos: "noun" },
  "хосен": { root: "Khōsen", pos: "noun" },
  "мар-дзен": { root: "Mar-dzen", pos: "noun" },
  "ария-мар": { root: "Ariya-mar", pos: "noun" },
  "зал-акха": { root: "Zal-ākha", pos: "noun" },
  "тал-хо": { root: "Thal-khō", pos: "noun" },
  "кол-гар": { root: "Kōl-ghar", pos: "noun" },
  "мор-акха": { root: "Mōr-ākha", pos: "noun" },
  "дзен-кол": { root: "Dzen-kōl", pos: "noun" },
  "хал-мар": { root: "Xal-mar", pos: "noun" },
  "лан-сен": { root: "Lān-sen", pos: "noun" },
  "хо-мор": { root: "Khō-mōr", pos: "noun" },
  "акха-мор": { root: "Ākha-mōr", pos: "noun" },
  "кол-суф": { root: "Kōl-suf", pos: "noun" },
  "дзен-тал": { root: "Dzen-thal", pos: "noun" },
  "гол-акха": { root: "Ghōl-ākha", pos: "noun" },
  "рог-ари": { root: "Rōg-ari", pos: "noun" },
  "мар-лан": { root: "Mar-lān", pos: "noun" },
  "ксанф-суф": { root: "Ksanf-suf", pos: "noun" },
  "яр-ох": { root: "Yar-okh", pos: "noun" },

  "мало": { root: "hōr", pos: "adv" },
  "малый": { root: "hōr", pos: "adj" },
  "маленький": { root: "hōr", pos: "adj" },
  "маленькая": { root: "hōr", pos: "adj" },
  "маленькое": { root: "hōr", pos: "adj" },
  "маленькие": { root: "hōr", pos: "adj" },

  "конец": { root: "rak", pos: "noun" },
  "конца": { root: "rak", pos: "noun" },
  "конечный": { root: "rak", pos: "adj" },
  "который": { root: "ku", pos: "pron" },
  "которого": { root: "ku", pos: "pron" },
  "которому": { root: "ku", pos: "pron" },
  "которым": { root: "ku", pos: "pron" },
  "которой": { root: "ku", pos: "pron" },
  "умирающий": { root: "mōr", pos: "adj" },
  "умирающая": { root: "mōr", pos: "adj" },
  "Деймос": { root: "Deimos", pos: "noun" },
  "Марса": { root: "Mars", pos: "noun" },
  "Марсу": { root: "Mars", pos: "noun" },
  "Фобос": { root: "Phobos", pos: "noun" },
  "Фобоса": { root: "Phobos", pos: "noun" },
  "является": { root: "sen", pos: "verb" },
  "одним": { root: "on", pos: "num" },
  "одной": { root: "on", pos: "num" },
  "одно": { root: "on", pos: "num" },
  "самых": { root: "suf", pos: "adv" },
  "спутник": { root: "dzenkhōr", pos: "noun" },
  "спутники": { root: "dzenkhōr", pos: "noun" },
  "Солнечной": { root: "sufdzen", pos: "noun" },
  "системе": { root: "sen", pos: "noun" },
  "Среднее": { root: "mar", pos: "adj" },
  "расстояние": { root: "nurrak", pos: "noun" },
  "составляет": { root: "sen", pos: "verb" },
  "марсианский": { root: "marzān", pos: "adj" },
  "марсианская": { root: "marzān", pos: "adj" },
  "марсианские": { root: "marzān", pos: "adj" },
  "марсианской": { root: "marzān", pos: "adj" },
  "марсианского": { root: "marzān", pos: "adj" },
  "марсианским": { root: "marzān", pos: "adj" },
  "марсианскому": { root: "marzān", pos: "adj" },
  "марсианском": { root: "marzān", pos: "adj" },
  "марсианскую": { root: "marzān", pos: "adj" },
  "марсианскими": { root: "marzān", pos: "adj" },
  "марсианских": { root: "marzān", pos: "adj" },
  "занимал": { root: "okhsen", pos: "verb" },
  "особое": { root: "on", pos: "adj" },
  "движение": { root: "nur", pos: "noun" },
  "пройти": { root: "nur", pos: "verb" },
  "проходить": { root: "nur", pos: "verb" },
  "прошёл": { root: "nur", pos: "verb" },
  "прошла": { root: "nur", pos: "verb" },
  "библиотека": { root: "lan-sen", pos: "noun" },
  "библиотеки": { root: "lan-sen", pos: "noun" },
  "восток": { root: "dzenur", pos: "noun" },
  "востоке": { root: "dzenur", pos: "noun" },
  "заход": { root: "khōmōr", pos: "noun" },
  "стрела": { root: "stralk", pos: "noun" },
  "стрелы": { root: "stralk", pos: "noun" },
  "взгляд": { root: "thal", pos: "noun" },
  "взгляды": { root: "thal", pos: "noun" },
  "длящееся": { root: "nur", pos: "verb" },
  "двух": { root: "dōn", pos: "num" },
  "суток": { root: "sōl", pos: "noun" },
  "породило": { root: "khalur", pos: "verb" },
  "считался": { root: "thal", pos: "verb" },
  "символ": { root: "dzen", pos: "noun" },
  "символом": { root: "dzen", pos: "noun" },
  "терпения": { root: "nōkh", pos: "noun" },
  "отличие": { root: "kan", pos: "conj" },
  "стремительного": { root: "nurkhō", pos: "adj" },
  "разрушительного": { root: "mōrkhō", pos: "adj" },
  "Астрономы": { root: "dzenthalsen", pos: "noun" },
  "использовали": { root: "xur", pos: "verb" },
  "календарных": { root: "sōlamār", pos: "adj" },
  "расчётов": { root: "tsan", pos: "noun" },
  "связывали": { root: "thal", pos: "verb" },
  "богиня": { root: "Akha", pos: "noun" },
  "богиней": { root: "Akha", pos: "noun" },
  "кратер": { root: "kolters", pos: "noun" },
  "кратеры": { root: "kolters", pos: "noun" },
  "Стикни": { root: "Stickney", pos: "noun" },
  "серебряный": { root: "kug-babbar", pos: "adj" },
  "танец": { root: "thalur", pos: "noun" },
  "танца": { root: "thalur", pos: "noun" },
  "танцы": { root: "thalur", pos: "noun" },
  "танцевать": { root: "thalur", pos: "verb" },
  "танцую": { root: "thalur", pos: "verb" },
  "танцует": { root: "thalur", pos: "verb" },
  "танцуют": { root: "thalur", pos: "verb" },
  "плясать": { root: "thalur", pos: "verb" },
  "основание": { root: "othal", pos: "noun" },
  "основал": { root: "othal", pos: "verb" },
  "основала": { root: "othal", pos: "verb" },
  "основали": { root: "othal", pos: "verb" },
  "основать": { root: "othal", pos: "verb" },
  "основатель": { root: "othaln", pos: "noun" },
  "основа": { root: "othaln", pos: "noun" },
  "рассвет": { root: "khonur", pos: "noun" },
  "расцвет": { root: "khonur", pos: "noun" },
  "процветание": { root: "khonuri", pos: "noun" },
  "начало": { root: "khān", pos: "noun" },
  "начала": { root: "khān", pos: "noun" },
  "начал": { root: "khān", pos: "verb" },
  "много": { root: "sūr", pos: "adv" },
  "множество": { root: "sūr", pos: "noun" },
  "огромный": { root: "sūrhōr", pos: "adj" },
  "огромная": { root: "sūrhōr", pos: "adj" },
  "застывшая": { root: "okhasing", pos: "adj" },
  "быстрее": { root: "bystr", pos: "adv" },
  "ждёт": { root: "zhal", pos: "verb" },
  "ждать": { root: "zhal", pos: "verb" },
  "оставляя": { root: "ānxur", pos: "verb" },
  "собой": { root: "an", pos: "pron" },
  "слёз": { root: "ākhas", pos: "noun" },
  "бесконечный": { root: "ānrak", pos: "adj" },
  "водный": { root: "ākha", pos: "adj" },
  "водяной": { root: "ākha", pos: "adj" },
  "возвращение": { root: "thalān", pos: "noun" },

  "красный": { root: "khōn", pos: "adj" },
  "красная": { root: "khōn", pos: "adj" },
  "красное": { root: "khōn", pos: "adj" },
  "синий": { root: "ākhan", pos: "adj" },
  "голубой": { root: "ākhān", pos: "adj" },
  "зелёный": { root: "marn", pos: "adj" },
  "жёлтый": { root: "dzenk", pos: "adj" },
  "белый": { root: "lānk", pos: "adj" },
  "чёрный": { root: "kōln", pos: "adj" },
  "фиолетовый": { root: "xaln", pos: "adj" },
  "оранжевый": { root: "khōsenk", pos: "adj" },
  "розовый": { root: "sōln", pos: "adj" },
  "коричневый": { root: "gharn", pos: "adj" },
  "серый": { root: "xalkōln", pos: "adj" },

  "один": { root: "on", pos: "num" },
  "одна": { root: "on", pos: "num" },
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

  "правда": { root: "thaltsan", pos: "noun" },
  "ложь": { root: "ānthaltsan", pos: "noun" },
  "надежда": { root: "lānthōl", pos: "noun" },
  "вера": { root: "khalmar", pos: "noun" },
  "свобода": { root: "nurariya", pos: "noun" },
  "справедливость": { root: "aritsan", pos: "noun" },
  "деревня": { root: "hōrokh", pos: "noun" },
  "мир": { root: "nōkh", pos: "noun" },
  "война": { root: "mōrkhō", pos: "noun" },
  "трон": { root: "rogen", pos: "noun" },
  "движется": { root: "nur", pos: "verb" },
  "двигаться": { root: "nur", pos: "verb" },
  "как": { root: "khas", pos: "conj" },
  "кто": { root: "ku", pos: "pron" },
  "что": { root: "sha", pos: "pron" },
  "иллюзия": { root: "lānthal", pos: "noun" },

  "избранный": { root: "ari", pos: "adj" },
  "великий": { root: "suf", pos: "adj" },
  "великая": { root: "suf", pos: "adj" },
  "великое": { root: "suf", pos: "adj" },
  "древний": { root: "xal", pos: "adj" },
  "древняя": { root: "xal", pos: "adj" },
  "мудрый": { root: "yar", pos: "adj" },
  "новый": { root: "khal", pos: "adj" },
  "новая": { root: "khal", pos: "adj" },
  "новое": { root: "khal", pos: "adj" },
  "новые": { root: "khal", pos: "adj" },
  "старый": { root: "xal", pos: "adj" },
  "старая": { root: "xal", pos: "adj" },
  "живой": { root: "mar", pos: "adj" },
  "жива": { root: "mar", pos: "adj" },
  "красивый": { root: "suf", pos: "adj" },
  "прекрасный": { root: "suf", pos: "adj" },
  "металлический": { root: "khōsīn", pos: "adj" },
  "подземный": { root: "kōl", pos: "adj" },
  "главный": { root: "ari", pos: "adj" },
  "плодородный": { root: "mar", pos: "adj" },
  "независимый": { root: "ari", pos: "adj" },
  "справочный": { root: "tsan", pos: "adj" },
  "огненный": { root: "khō", pos: "adj" },
  "звёздный": { root: "dzen", pos: "adj" },
  "звёздная": { root: "dzen", pos: "adj" },
  "звёздное": { root: "dzen", pos: "adj" },
  "голубокровный": { root: "ākhazān", pos: "adj" },
  "шестипалый": { root: "khōrap", pos: "adj" },
  "чуждый": { root: "kōld", pos: "adj" },
  "земной": { root: "kōl", pos: "adj" },
  "суровый": { root: "khōsen", pos: "adj" },
  "священный": { root: "lānīn", pos: "adj" },
  "добрый": { root: "suf", pos: "adj" },
  "яркий": { root: "dzēn", pos: "adj" },
  "жаркий": { root: "khō", pos: "adj" },
  "мёртвый": { root: "mōr", pos: "adj" },

  "смотреть": { root: "thal", pos: "verb" },
  "смотрю": { root: "thal", pos: "verb" },
  "смотрит": { root: "thal", pos: "verb" },
  "смотрят": { root: "thal", pos: "verb" },
  "смотрел": { root: "thal", pos: "verb" },
  "помнить": { root: "lān", pos: "verb" },
  "помню": { root: "lān", pos: "verb" },
  "помнит": { root: "lān", pos: "verb" },
  "помнят": { root: "lān", pos: "verb" },
  "помнил": { root: "lān", pos: "verb" },
  "знать": { root: "tsan", pos: "verb" },
  "знаю": { root: "tsan", pos: "verb" },
  "знает": { root: "tsan", pos: "verb" },
  "знают": { root: "tsan", pos: "verb" },
  "знал": { root: "tsan", pos: "verb" },
  "умирать": { root: "mōr", pos: "verb" },
  "умирает": { root: "mōr", pos: "verb" },
  "умирают": { root: "mōr", pos: "verb" },
  "умирал": { root: "mōr", pos: "verb" },
  "жить": { root: "marlān", pos: "verb" },
  "живу": { root: "marlān", pos: "verb" },
  "живёт": { root: "marlān", pos: "verb" },
  "живут": { root: "marlān", pos: "verb" },
  "жил": { root: "marlān", pos: "verb" },
  "выжить": { root: "marlān", pos: "verb" },
  "пить": { root: "khōr", pos: "verb" },
  "пьёт": { root: "khōr", pos: "verb" },
  "пьют": { root: "khōr", pos: "verb" },
  "играть": { root: "thalur", pos: "verb" },
  "играет": { root: "thalur", pos: "verb" },
  "играют": { root: "thalur", pos: "verb" },
  "летать": { root: "zalur", pos: "verb" },
  "летает": { root: "zalur", pos: "verb" },
  "летают": { root: "zalur", pos: "verb" },
  "полететь": { root: "zalur", pos: "verb" },
  "говорить": { root: "thalthu", pos: "verb" },
  "говорит": { root: "thalthu", pos: "verb" },
  "говорят": { root: "thalthu", pos: "verb" },
  "говорил": { root: "thalthu", pos: "verb" },
  "любить": { root: "lānmar", pos: "verb" },
  "любит": { root: "lānmar", pos: "verb" },
  "любят": { root: "lānmar", pos: "verb" },
  "любил": { root: "lānmar", pos: "verb" },
  "работать": { root: "xurmar", pos: "verb" },
  "работает": { root: "xurmar", pos: "verb" },
  "работают": { root: "xurmar", pos: "verb" },
  "работал": { root: "xurmar", pos: "verb" },
  "идти": { root: "nur", pos: "verb" },
  "иду": { root: "nur", pos: "verb" },
  "идёт": { root: "nur", pos: "verb" },
  "идут": { root: "nur", pos: "verb" },
  "шёл": { root: "nur", pos: "verb" },
  "пойти": { root: "nur", pos: "verb" },
  "пойду": { root: "nur", pos: "verb" },
  "пойдёт": { root: "nur", pos: "verb" },
  "пойдут": { root: "nur", pos: "verb" },
  "пошёл": { root: "nur", pos: "verb" },
  "быть": { root: "sen", pos: "verb" },
  "есть": { root: "sen", pos: "verb" },
  "был": { root: "sen", pos: "verb" },
  "была": { root: "sen", pos: "verb" },
  "было": { root: "sen", pos: "verb" },
  "были": { root: "sen", pos: "verb" },
  "думать": { root: "tsanur", pos: "verb" },
  "думает": { root: "tsanur", pos: "verb" },
  "думают": { root: "tsanur", pos: "verb" },
  "понимать": { root: "tsanlān", pos: "verb" },
  "понимает": { root: "tsanlān", pos: "verb" },
  "понимают": { root: "tsanlān", pos: "verb" },
  "бежать": { root: "nurkhō", pos: "verb" },
  "бежит": { root: "nurkhō", pos: "verb" },
  "бегут": { root: "nurkhō", pos: "verb" },
  "стоять": { root: "okhsen", pos: "verb" },
  "стоит": { root: "okhsen", pos: "verb" },
  "стоят": { root: "okhsen", pos: "verb" },
  "стоял": { root: "okhsen", pos: "verb" },
  "лежать": { root: "marlān", pos: "verb" },
  "лежит": { root: "marlān", pos: "verb" },
  "лежат": { root: "marlān", pos: "verb" },
  "строить": { root: "okhar", pos: "verb" },
  "строит": { root: "okhar", pos: "verb" },
  "строят": { root: "okhar", pos: "verb" },
  "построить": { root: "okhar", pos: "verb" },
  "построил": { root: "okhar", pos: "verb" },
  "построили": { root: "okhar", pos: "verb" },
  "разрушать": { root: "mōrkhō", pos: "verb" },
  "разрушает": { root: "mōrkhō", pos: "verb" },
  "создавать": { root: "khalur", pos: "verb" },
  "создаёт": { root: "khalur", pos: "verb" },
  "создают": { root: "khalur", pos: "verb" },
  "создал": { root: "khalur", pos: "verb" },
  "создали": { root: "khalur", pos: "verb" },
  "расти": { root: "marūr", pos: "verb" },
  "растёт": { root: "marūr", pos: "verb" },
  "растут": { root: "marūr", pos: "verb" },
  "падать": { root: "kōlur", pos: "verb" },
  "падает": { root: "kōlur", pos: "verb" },
  "падают": { root: "kōlur", pos: "verb" },
  "подниматься": { root: "dzenur", pos: "verb" },
  "поднимается": { root: "dzenur", pos: "verb" },
  "спускаться": { root: "kōlur", pos: "verb" },
  "спускается": { root: "kōlur", pos: "verb" },
  "открывать": { root: "tōkhur", pos: "verb" },
  "открывает": { root: "tōkhur", pos: "verb" },
  "закрывать": { root: "tōkhur", pos: "verb" },
  "закрывает": { root: "tōkhur", pos: "verb" },
  "видеть": { root: "thal", pos: "verb" },
  "видит": { root: "thal", pos: "verb" },
  "видят": { root: "thal", pos: "verb" },
  "видел": { root: "thal", pos: "verb" },
  "слышать": { root: "thal", pos: "verb" },
  "слышит": { root: "thal", pos: "verb" },
  "слышал": { root: "thal", pos: "verb" },
  "слушать": { root: "thal", pos: "verb" },
  "слушает": { root: "thal", pos: "verb" },
  "брать": { root: "khōs", pos: "verb" },
  "берёт": { root: "khōs", pos: "verb" },
  "берут": { root: "khōs", pos: "verb" },
  "давать": { root: "rōg", pos: "verb" },
  "даёт": { root: "rōg", pos: "verb" },
  "дают": { root: "rōg", pos: "verb" },
  "получать": { root: "sen", pos: "verb" },
  "получает": { root: "sen", pos: "verb" },
  "получают": { root: "sen", pos: "verb" },
  "петь": { root: "zalkhō", pos: "verb" },
  "поёт": { root: "zalkhō", pos: "verb" },
  "поют": { root: "zalkhō", pos: "verb" },
  "путешествовать": { root: "nur", pos: "verb" },
  "менять": { root: "khalur", pos: "verb" },
  "меняет": { root: "khalur", pos: "verb" },
  "начинать": { root: "khan", pos: "verb" },
  "начинает": { root: "khan", pos: "verb" },
  "начинают": { root: "khan", pos: "verb" },
  "заканчивать": { root: "mōr", pos: "verb" },
  "отдыхать": { root: "sūl", pos: "verb" },
  "спать": { root: "sūl", pos: "verb" },
  "спит": { root: "sūl", pos: "verb" },
  "спят": { root: "sūl", pos: "verb" },
  "посмотреть": { root: "thal", pos: "verb" },
  "купить": { root: "xur", pos: "verb" },
  "купил": { root: "xur", pos: "verb" },
  "рисовать": { root: "thalur", pos: "verb" },
  "рисует": { root: "thalur", pos: "verb" },
  "писать": { root: "khōs", pos: "verb" },
  "пишет": { root: "khōs", pos: "verb" },
  "писал": { root: "khōs", pos: "verb" },
  "сохранить": { root: "lān", pos: "verb" },
  "спасти": { root: "lānīn", pos: "verb" },
  "расшифровать": { root: "tsanlān", pos: "verb" },
  "записать": { root: "rak", pos: "verb" },
  "записал": { root: "rak", pos: "verb" },
  "хотеть": { root: "nūr", pos: "verb" },
  "хочу": { root: "nūr", pos: "verb" },
  "хочет": { root: "nūr", pos: "verb" },
  "хотят": { root: "nūr", pos: "verb" },
  "сделать": { root: "khalur", pos: "verb" },
  "сделал": { root: "khalur", pos: "verb" },
  "делать": { root: "khalur", pos: "verb" },
  "делает": { root: "khalur", pos: "verb" },
  "делают": { root: "khalur", pos: "verb" },
  "возвращаться": { root: "thalān", pos: "verb" },
  "вернуться": { root: "thalān", pos: "verb" },

  "и": { root: "un", pos: "conj" },
  "но": { root: "kan", pos: "conj" },
  "когда": { root: "tsen", pos: "conj" },
  "не": { root: "ān", pos: "particle" },
  "нет": { root: "ān", pos: "particle" },
  "сегодня": { root: "sōl", pos: "noun" },
  "завтра": { root: "dzenur", pos: "noun" },
  "вчера": { root: "lānur", pos: "noun" },
  "вместе": { root: "tō", pos: "adv" },
  "очень": { root: "suf", pos: "adv" },
  "всегда": { root: "sen", pos: "adv" },
  "никогда": { root: "ān", pos: "adv" },
  "теперь": { root: "amār", pos: "adv" },
  "потом": { root: "amār", pos: "adv" },
  "далеко": { root: "dzenur", pos: "adv" },
  "близко": { root: "kōl", pos: "adv" },
  "внутри": { root: "kōl", pos: "adv" },
  "снаружи": { root: "dzen", pos: "adv" },

  "это": { root: "thal", pos: "pron" },
  "этот": { root: "thalon", pos: "pron" },
  "эта": { root: "thalon", pos: "pron" },
  "эти": { root: "thalon", pos: "pron" },
  "тот": { root: "tan", pos: "pron" },
  "та": { root: "tan", pos: "pron" },
  "те": { root: "tan", pos: "pron" },
  "каждый": { root: "ontō", pos: "pron" },
  "никто": { root: "ān-on", pos: "pron" },
  "все": { root: "tō", pos: "pron" },
  "всех": { root: "tō", pos: "pron" },
  "свой": { root: "an", pos: "pron" },
  "своя": { root: "an", pos: "pron" },
  "своё": { root: "an", pos: "pron" },
  "свою": { root: "an", pos: "pron" },
  "свои": { root: "an", pos: "pron" },
  "куда": { root: "nur", pos: "adv" },

  "ацидалийское море": { root: "Acidalia", pos: "noun" },
  "фарсида": { root: "Khōsen", pos: "noun" },
  "фарсиды": { root: "Khōsen", pos: "noun" },
  "фарсиду": { root: "Khōsen", pos: "noun" },
  "фарсидой": { root: "Khōsen", pos: "noun" },
  "фарсиде": { root: "Khōsen", pos: "noun" },
  "эллада": { root: "Ellada", pos: "noun" },
  "эллады": { root: "Ellada", pos: "noun" },
  "элладу": { root: "Ellada", pos: "noun" },
  "элладой": { root: "Ellada", pos: "noun" },
  "элладе": { root: "Ellada", pos: "noun" },
  "утопия": { root: "Utopiya", pos: "noun" },
  "утопии": { root: "Utopiya", pos: "noun" },
  "утопию": { root: "Utopiya", pos: "noun" },
  "утопией": { root: "Utopiya", pos: "noun" },
  "аравия": { root: "Aravia", pos: "noun" },
  "аравии": { root: "Aravia", pos: "noun" },
  "аравию": { root: "Aravia", pos: "noun" },
  "роген-ария": { root: "Rogen-Ariya", pos: "noun" },
  "ксанфа": { root: "Ksanf", pos: "noun" },
  "ксанфу": { root: "Ksanf", pos: "noun" },
  "ксанфе": { root: "Ksanf", pos: "noun" },
  "ксанфом": { root: "Ksanf", pos: "noun" },
  "долина маринера": { root: "Valles", pos: "noun" },
  "олимп": { root: "Olympus", pos: "noun" },
  "эритрея": { root: "Eritreya", pos: "noun" },
  "эритреи": { root: "Eritreya", pos: "noun" },
  "эритрею": { root: "Eritreya", pos: "noun" },
  "эритреей": { root: "Eritreya", pos: "noun" },
  "эритрее": { root: "Eritreya", pos: "noun" },
  "эдем": { root: "Eden", pos: "noun" },
  "эдема": { root: "Eden", pos: "noun" },
  "эдему": { root: "Eden", pos: "noun" },
  "эдемом": { root: "Eden", pos: "noun" },
  "эдеме": { root: "Eden", pos: "noun" },
  "тарсис": { root: "Tarsis", pos: "noun" },
  "тарсиса": { root: "Tarsis", pos: "noun" },
  "тарсисом": { root: "Tarsis", pos: "noun" },
  "эллос": { root: "Ellos", pos: "noun" },
  "эллоса": { root: "Ellos", pos: "noun" },
  "эллосе": { root: "Ellos", pos: "noun" },
  "сирения": { root: "Sirenia", pos: "noun" },
  "сирении": { root: "Sirenia", pos: "noun" },
  "сирению": { root: "Sirenia", pos: "noun" },
  "сиренией": { root: "Sirenia", pos: "noun" },

  "араксис": { root: "Araksis", pos: "noun" },
  "кхо": { root: "Kho", pos: "noun" },
  "акха": { root: "Akha", pos: "noun" },
  "акхи": { root: "Akha", pos: "noun" },
  "акхе": { root: "Akha", pos: "noun" },
  "акху": { root: "Akha", pos: "noun" },
  "акхой": { root: "Akha", pos: "noun" },

  "иван": { root: "Ivan", pos: "noun" },
  "ивана": { root: "Ivan", pos: "noun" },
  "ивану": { root: "Ivan", pos: "noun" },
  "Мнемис": { root: "Lānsur", pos: "noun" },
  "Mnemis": { root: "Lānsur", pos: "noun" },
  "талин": { root: "Talīn", pos: "noun" },
  "талина": { root: "Talīn", pos: "noun" },
  "талину": { root: "Talīn", pos: "noun" },
  "талином": { root: "Talīn", pos: "noun" },
  "хевсур": { root: "Khevsur", pos: "noun" },
  "хевсура": { root: "Khevsur", pos: "noun" },
  "хевсуру": { root: "Khevsur", pos: "noun" },
  "хевсуром": { root: "Khevsur", pos: "noun" },
  "йарра": { root: "Yarra", pos: "noun" },
  "йарры": { root: "Yarra", pos: "noun" },
  "йарру": { root: "Yarra", pos: "noun" },
  "йаррой": { root: "Yarra", pos: "noun" },
  "элла": { root: "Ella", pos: "noun" },
  "аратан": { root: "Aratan", pos: "noun" },
  "аратана": { root: "Aratan", pos: "noun" },
  "аратану": { root: "Aratan", pos: "noun" },
  "аратаном": { root: "Aratan", pos: "noun" },
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
  "алира": { root: "Alira", pos: "noun" },
  "алиры": { root: "Alira", pos: "noun" },
  "алиру": { root: "Alira", pos: "noun" },
  "алирой": { root: "Alira", pos: "noun" },
  "алире": { root: "Alira", pos: "noun" },
  "совия": { root: "Soviya", pos: "noun" },
  "совии": { root: "Soviya", pos: "noun" },
  "совию": { root: "Soviya", pos: "noun" },
  "совией": { root: "Soviya", pos: "noun" },

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
  "легенда": { root: "Legenda", pos: "noun" },
  "легенды": { root: "Legenda", pos: "noun" },
  "легенде": { root: "Legenda", pos: "noun" },
  "миф": { root: "Mif", pos: "noun" },
  "мифа": { root: "Mif", pos: "noun" },
  "мифу": { root: "Mif", pos: "noun" },
  "мифом": { root: "Mif", pos: "noun" },
  "мифе": { root: "Mif", pos: "noun" },
  "мифы": { root: "Mif", pos: "noun" },
  "цель": { root: "thali", pos: "noun" },
  "цели": { root: "thali", pos: "noun" },
  "змея": { root: "ksanfi", pos: "noun" },
  "змеи": { root: "ksanfi", pos: "noun" },
  "голос": { root: "Ar", pos: "noun" },
  "голосом": { root: "Ar", pos: "noun" },
  "голоса": { root: "Ar", pos: "noun" },
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
  "море": { root: "thal", pos: "noun" },
  "моря": { root: "thal", pos: "noun" },
  "морю": { root: "thal", pos: "noun" },
  "морем": { root: "thal", pos: "noun" },

  "южный": { root: "ellada", pos: "adj" },
  "элладский": { root: "ellada", pos: "adj" },
  "западный": { root: "utopia", pos: "adj" },
  "утопийский": { root: "utopia", pos: "adj" },
  "центральный": { root: "okhasen", pos: "adj" },
  "окхасенский": { root: "okhasen", pos: "adj" },

  "привет": { root: "Mar dzen", pos: "phrase" },
  "здравствуй": { root: "Mar dzen", pos: "phrase" },
  "здравствуйте": { root: "Mar dzen", pos: "phrase" },
  "добрый день": { root: "Mar dzen", pos: "phrase" },
  "прощай": { root: "Lān mar", pos: "phrase" },
  "прощайте": { root: "Ariya lān", pos: "phrase" },
  "до свидания": { root: "Lān mar", pos: "phrase" },
  "спасибо": { root: "Tsan lān", pos: "phrase" },
  "благодарю": { root: "Tsan lān", pos: "phrase" },
  "пожалуйста": { root: "Marzān thal", pos: "phrase" },
  "удачи": { root: "Marzān thal", pos: "phrase" },
  "глина помнит": { root: "Lān sur", pos: "phrase" },
  "письмо из красной пыли": { root: "Khalur khō sur", pos: "phrase" },
  "марсианская энциклопедия": { root: "Tsankhō Marzān", pos: "phrase" },
  "красная пыль": { root: "Khō sur", pos: "phrase" },
  "звезда смотрит": { root: "Dzen thal", pos: "phrase" },
  "звезда умирает": { root: "Dzen mōr", pos: "phrase" },
  "звезда умирает, глина помнит": { root: "Dzen mōr, lān sur", pos: "phrase" },

  "оставлять": { root: "ānxur", pos: "verb" },
  "оставил": { root: "ānxur", pos: "verb" },
  "оставила": { root: "ānxur", pos: "verb" },
  "оставили": { root: "ānxur", pos: "verb" },
  "сокращать": { root: "hōr-khalur", pos: "verb" },
  "похищать": { root: "khōs-nur", pos: "verb" },
  "отменять": { root: "ān-khalur", pos: "verb" },
  "ускорять": { root: "nur-khō", pos: "verb" },
  "принимать": { root: "khōs-tsan", pos: "verb" },
  "принимает": { root: "khōs-tsan", pos: "verb" },
  "принял": { root: "khōs-tsan", pos: "verb" },
  "приняли": { root: "khōs-tsan", pos: "verb" },
  "достигать": { root: "thal-dzen", pos: "verb" },
  "достигает": { root: "thal-dzen", pos: "verb" },
  "достиг": { root: "thal-dzen", pos: "verb" },
  "достигли": { root: "thal-dzen", pos: "verb" },
  "действовать": { root: "khalur", pos: "verb" },
  "складывать": { root: "un-mar", pos: "verb" },
  "вычитать": { root: "ān-mar", pos: "verb" },
  "умножать": { root: "sūr-mar", pos: "verb" },
  "делить": { root: "hōr-mar", pos: "verb" },
  "обвинять": { root: "mōr-tsan", pos: "verb" },
  "болеть": { root: "mōr-mar", pos: "verb" },
  "сопровождать": { root: "nur-tō", pos: "verb" },

  "способность": { root: "xur-tsan", pos: "noun" },
  "отмена": { root: "ān-khalur", pos: "noun" },
  "отсутствие": { root: "ān-sen", pos: "noun" },
  "ускорение": { root: "nur-khō", pos: "noun" },
  "доступ": { root: "nur-sen", pos: "noun" },
  "отделение": { root: "hōr-sen", pos: "noun" },
  "помещение": { root: "okh-sen", pos: "noun" },
  "сопровождение": { root: "nur-tō", pos: "noun" },
  "сообщник": { root: "nur-tō-īn", pos: "noun" },
  "отчёт": { root: "sur-thal", pos: "noun" },
  "отчет": { root: "sur-thal", pos: "noun" },
  "достоверность": { root: "thal-tsan", pos: "noun" },
  "обвинение": { root: "mōr-tsan", pos: "noun" },
  "болезнь": { root: "mōr-mar", pos: "noun" },
  "боль": { root: "mōr", pos: "noun" },
  "достижение": { root: "thal-dzen", pos: "noun" },
  "кислота": { root: "mōr-ākha", pos: "noun" },
  "признание": { root: "khōs-tsan", pos: "noun" },
  "исполнитель": { root: "khalur-īn", pos: "noun" },
  "академия": { root: "tsan-sen", pos: "noun" },
  "академии": { root: "tsan-sen", pos: "noun" },
  "академию": { root: "tsan-sen", pos: "noun" },
  "академией": { root: "tsan-sen", pos: "noun" },

  "способный": { root: "xur-tsan", pos: "adj" },
  "приемлемый": { root: "khōs-tsan", pos: "adj" },
  "доступный": { root: "nur-sen", pos: "adj" },
  "ответственный": { root: "lān-īn", pos: "adj" },
  "точный": { root: "thal-tsan", pos: "adj" },
  "точная": { root: "thal-tsan", pos: "adj" },
  "патологический": { root: "mōr-mar", pos: "adj" },
  "отсутствующий": { root: "ān-sen", pos: "adj" },
  "совершенный": { root: "suf-tsan", pos: "adj" },
  "абстрактный": { root: "thal-lān", pos: "adj" },
  "абсурдный": { root: "ān-tsan", pos: "adj" },
  "академический": { root: "tsan-sen", pos: "adj" },
  "внезапный": { root: "ān-thal", pos: "adj" },
  "случайный": { root: "hōr-thal", pos: "adj" },

  "внезапно": { root: "ān-thal", pos: "adv" },
  "точно": { root: "thal-tsan", pos: "adv" },
  "случайно": { root: "hōr-thal", pos: "adv" },
  "совершенно": { root: "suf-tsan", pos: "adv" },

  "ветер": { root: "zal", pos: "noun" },
  "ветра": { root: "zal", pos: "noun" },
  "ветром": { root: "zal", pos: "noun" },
  "песок": { root: "xal", pos: "noun" },
  "песка": { root: "xal", pos: "noun" },
  "соль": { root: "hem", pos: "noun" },
  "соли": { root: "hem", pos: "noun" },
  "океан": { root: "ākhasuf", pos: "noun" },
  "океана": { root: "ākhasuf", pos: "noun" },
  "берег": { root: "kōlākha", pos: "noun" },
  "берега": { root: "kōlākha", pos: "noun" },
  "берегу": { root: "kōlākha", pos: "noun" },
  "волна": { root: "volna", pos: "noun" },
  "волны": { root: "volna", pos: "noun" },
  "прилив": { root: "ākhanur", pos: "noun" },
  "отлив": { root: "ākhamōr", pos: "noun" },
  "облако": { root: "oblako", pos: "noun" },
  "облака": { root: "oblako", pos: "noun" },
  "туман": { root: "tuman", pos: "noun" },
  "снег": { root: "sneg", pos: "noun" },
  "лёд": { root: "led", pos: "noun" },
  "льда": { root: "led", pos: "noun" },
  "гром": { root: "grom", pos: "noun" },
  "молния": { root: "molniya", pos: "noun" },

  "планета": { root: "dzenkōl", pos: "noun" },
  "планеты": { root: "dzenkōl", pos: "noun" },
  "планету": { root: "dzenkōl", pos: "noun" },
  "планете": { root: "dzenkōl", pos: "noun" },
  "орбита": { root: "dzennur", pos: "noun" },
  "орбиты": { root: "dzennur", pos: "noun" },
  "комета": { root: "khōdzen", pos: "noun" },
  "астероид": { root: "ghardzen", pos: "noun" },
  "галактика": { root: "sūrdzen", pos: "noun" },
  "туманность": { root: "ākhadzen", pos: "noun" },
  "созвездие": { root: "dzenrak", pos: "noun" },

  "сухой": { root: "sukh", pos: "adj" },
  "влажный": { root: "vlaž", pos: "adj" },
  "глубокий": { root: "glub", pos: "adj" },
  "мелкий": { root: "mel", pos: "adj" },
  "мягкий": { root: "myagk", pos: "adj" },
  "твёрдый": { root: "tverd", pos: "adj" },
  "острый": { root: "ostr", pos: "adj" },
  "высокий": { root: "vys", pos: "adj" },
  "низкий": { root: "niz", pos: "adj" },
  "чистый": { root: "chist", pos: "adj" },
  "тяжёлый": { root: "tyazh", pos: "adj" },
  "лёгкий": { root: "lyogk", pos: "adj" },
  "быстрый": { root: "bystr", pos: "adj" },
  "медленный": { root: "medl", pos: "adj" },

  "дуть": { root: "dut", pos: "verb" },
  "лить": { root: "lit", pos: "verb" },
  "ползти": { root: "polzt", pos: "verb" },
  "прыгать": { root: "pryg", pos: "verb" },
  "плавать": { root: "plav", pos: "verb" },
  "нырять": { root: "nyr", pos: "verb" },
  "кружить": { root: "kruzh", pos: "verb" },
  "вращаться": { root: "vrasch", pos: "verb" },
  "вращается": { root: "vrasch", pos: "verb" },
  "отражать": { root: "otrazh", pos: "verb" },
  "отражает": { root: "otrazh", pos: "verb" },
  "сиять": { root: "siyat", pos: "verb" },
  "сияет": { root: "siyat", pos: "verb" },
  "мерцать": { root: "merts", pos: "verb" },
  "мерцает": { root: "merts", pos: "verb" },
  "светить": { root: "svet", pos: "verb" },
  "светит": { root: "svet", pos: "verb" },
  "тушить": { root: "tush", pos: "verb" },
  "течь": { root: "tech", pos: "verb" },
  "течёт": { root: "tech", pos: "verb" },

  "сорок": { root: "khen-dzen-on", pos: "num" },
  "пятьдесят": { root: "phin-dzen-on", pos: "num" },
  "тысяча": { root: "thos", pos: "num" },
  "миллион": { root: "mil", pos: "num" },

  "глава": { root: "lānrak", pos: "noun" },
  "главы": { root: "lānrak", pos: "noun" },
  "страница": { root: "surrak", pos: "noun" },
  "страницы": { root: "surrak", pos: "noun" },
  "строка": { root: "thōlrak", pos: "noun" },
  "строки": { root: "thōlrak", pos: "noun" },
  "буква": { root: "tsanrak", pos: "noun" },
  "буквы": { root: "tsanrak", pos: "noun" },
  "алфавит": { root: "tsanrakān", pos: "noun" },
  "рукопись": { root: "khōsur", pos: "noun" },
  "пергамент": { root: "kōlsur", pos: "noun" },
  "чернила": { root: "ākhasur", pos: "noun" },

  "корабль": { root: "ākhanur", pos: "noun" },
  "корабля": { root: "ākhanur", pos: "noun" },
  "корабли": { root: "ākhanur", pos: "noun" },
  "кораблей": { root: "ākhanur", pos: "noun" },
  "парус": { root: "zalnur", pos: "noun" },
  "якорь": { root: "kōlān", pos: "noun" },
  "мачта": { root: "dzenur", pos: "noun" },
  "капитан": { root: "rōgākha", pos: "noun" },
  "моряк": { root: "ākhīn", pos: "noun" },
  "остров": { root: "kōlhōr", pos: "noun" },
  "острова": { root: "kōlhōr", pos: "noun" },

  "судьба": { root: "thalān", pos: "noun" },
  "судьбы": { root: "thalān", pos: "noun" },
  "рок": { root: "rakthal", pos: "noun" },
  "случай": { root: "hōrthal", pos: "noun" },
  "время": { root: "amār", pos: "noun" },
  "времени": { root: "amār", pos: "noun" },
  "пространство": { root: "dzenkōl", pos: "noun" },
  "материя": { root: "kōlsur", pos: "noun" },
  "дух": { root: "khōlān", pos: "noun" },
  "идея": { root: "thaltsan", pos: "noun" },
  "форма": { root: "surrak", pos: "noun" },

  "утро": { root: "dzēn", pos: "noun" },
  "вечер": { root: "khōl", pos: "noun" },
  "полдень": { root: "sōldzen", pos: "noun" },
  "полночь": { root: "nōkhdzen", pos: "noun" },
  "закат": { root: "khōmōr", pos: "noun" },
  "восход": { root: "khōmar", pos: "noun" },
  "туча": { root: "oblako", pos: "noun" },
  "роса": { root: "ākhalān", pos: "noun" },
  "иней": { root: "kōlmōr", pos: "noun" },
  "град": { root: "gharkhō", pos: "noun" },

  "сверкать": { root: "dzenur", pos: "verb" },
  "искриться": { root: "khōdzen", pos: "verb" },
  "плыть": { root: "ākhaur", pos: "verb" },
  "полоть": { root: "marur", pos: "verb" },
  "жарить": { root: "khōur", pos: "verb" },
  "варить": { root: "ākhaur", pos: "verb" },

  "план": { root: "tsanur", pos: "noun" },
  "проект": { root: "khalur", pos: "noun" },
  "колония": { root: "mārsen", pos: "noun" },
  "колонии": { root: "mārsen", pos: "noun" },
  "база": { root: "okhsen", pos: "noun" },
  "станция": { root: "senur", pos: "noun" },

  "царь": { root: "lugal", pos: "noun" },
  "царя": { root: "lugal", pos: "noun" },
  "царица": { root: "lugal", pos: "noun" },
  "жрец": { root: "en", pos: "noun" },
  "жреца": { root: "en", pos: "noun" },
  "жрица": { root: "en", pos: "noun" },
  "жрицы": { root: "en", pos: "noun" },
  "владыка": { root: "en", pos: "noun" },
  "святыня": { root: "e", pos: "noun" },
  "алтарь": { root: "e", pos: "noun" },
  "алтаря": { root: "e", pos: "noun" },
  "жертва": { root: "dingir", pos: "noun" },
  "жертвы": { root: "dingir", pos: "noun" },
  "поток": { root: "id", pos: "noun" },
  "ручей": { root: "id", pos: "noun" },
  "канал": { root: "id", pos: "noun" },
  "каналы": { root: "id", pos: "noun" },
  "золото": { root: "kug", pos: "noun" },
  "серебро": { root: "kug-babbar", pos: "noun" },
  "медь": { root: "urud", pos: "noun" },
  "меди": { root: "urud", pos: "noun" },
  "железо": { root: "anbar", pos: "noun" },
  "железа": { root: "anbar", pos: "noun" },
  "раб": { root: "arad", pos: "noun" },
  "раба": { root: "arad", pos: "noun" },
  "рабыня": { root: "arad", pos: "noun" },
  "свободный": { root: "lugal", pos: "adj" },
  "воин": { root: "ur", pos: "noun" },
  "воины": { root: "ur", pos: "noun" },
  "воинов": { root: "ur", pos: "noun" },
  "охотник": { root: "ur", pos: "noun" },
  "рыбак": { root: "id", pos: "noun" },
  "рыбаки": { root: "id", pos: "noun" },
  "месяц": { root: "dzen", pos: "noun" },
  "неделя": { root: "thōl", pos: "noun" },
  "час": { root: "dzen", pos: "noun" },
  "часа": { root: "dzen", pos: "noun" },
  "минута": { root: "khō", pos: "noun" },
  "секунда": { root: "lān", pos: "noun" },

  "божество": { root: "netjer", pos: "noun" },
  "пророк": { root: "hery", pos: "noun" },
  "гробница": { root: "per-djet", pos: "noun" },
  "мумия": { root: "sah", pos: "noun" },
  "нил": { root: "iteru", pos: "noun" },
  "оазис": { root: "wahat", pos: "noun" },
  "папирус": { root: "wadj", pos: "noun" },
  "лотос": { root: "seshen", pos: "noun" },
  "крокодил": { root: "msh", pos: "noun" },
  "иероглиф": { root: "medu-netjer", pos: "noun" },
  "иероглифы": { root: "medu-netjer", pos: "noun" },
  "свиток": { root: "medjat", pos: "noun" },
  "свитки": { root: "medjat", pos: "noun" },
  "правитель": { root: "heqa", pos: "noun" },
  "правителя": { root: "heqa", pos: "noun" },
  "везир": { root: "taty", pos: "noun" },
  "судья": { root: "maat", pos: "noun" },
  "закон": { root: "hepu", pos: "noun" },
  "законы": { root: "hepu", pos: "noun" },
  "пирамида": { root: "mr", pos: "noun" },
  "пирамиды": { root: "mr", pos: "noun" },
  "обелиск": { root: "tekhen", pos: "noun" },
  "колонна": { root: "djed", pos: "noun" },
  "колонны": { root: "djed", pos: "noun" },
  "дворец": { root: "per-aat", pos: "noun" },
  "наводнение": { root: "akhet", pos: "noun" },
  "засуха": { root: "shemu", pos: "noun" },
  "засухи": { root: "shemu", pos: "noun" },
  "урожай": { root: "peret", pos: "noun" },
  "рождение": { root: "mes", pos: "noun" },
  "народ": { root: "rekhyt", pos: "noun" },
  "чужой": { root: "khas", pos: "adj" },
  "родной": { root: "ta", pos: "adj" },
  "юг": { root: "resy", pos: "noun" },
  "запад": { root: "imenty", pos: "noun" },

  "учитель": { root: "tsanīn", pos: "noun" },
  "учителя": { root: "tsanīn", pos: "noun" },
  "наставник": { root: "tsanīn", pos: "noun" },
  "ученик": { root: "tsanān", pos: "noun" },
  "ученика": { root: "tsanān", pos: "noun" },
  "ученица": { root: "tsanān", pos: "noun" },
  "врач": { root: "marlān", pos: "noun" },
  "врача": { root: "marlān", pos: "noun" },
  "целитель": { root: "marlān", pos: "noun" },
  "кузнец": { root: "khōsīn", pos: "noun" },
  "строитель": { root: "okharīn", pos: "noun" },
  "земледелец": { root: "marīn", pos: "noun" },
  "поэт": { root: "thalīn", pos: "noun" },
  "поэта": { root: "thalīn", pos: "noun" },
  "поэтесса": { root: "thalīn", pos: "noun" },
  "певец": { root: "zalkhōīn", pos: "noun" },
  "певица": { root: "zalkhōīn", pos: "noun" },

  "нож": { root: "khōsrak", pos: "noun" },
  "ножа": { root: "khōsrak", pos: "noun" },
  "топор": { root: "khōsūr", pos: "noun" },
  "молот": { root: "gharur", pos: "noun" },
  "пила": { root: "khōsthal", pos: "noun" },
  "игла": { root: "thōlrak", pos: "noun" },
  "иглы": { root: "thōlrak", pos: "noun" },
  "верёвка": { root: "zalthōl", pos: "noun" },
  "корзина": { root: "kōlrak", pos: "noun" },
  "кувшин": { root: "ākharak", pos: "noun" },
  "чаша": { root: "khōrak", pos: "noun" },
  "тарелка": { root: "surrak", pos: "noun" },
  "ложка": { root: "ākhanur", pos: "noun" },
  "свеча": { root: "khōlān", pos: "noun" },
  "факел": { root: "khōnur", pos: "noun" },
  "рубаха": { root: "thōlīn", pos: "noun" },
  "штаны": { root: "nurthōl", pos: "noun" },
  "сапоги": { root: "kōlnur", pos: "noun" },
  "шляпа": { root: "dzenīn", pos: "noun" },
  "перчатка": { root: "khōsīn", pos: "noun" },
  "фрукты": { root: "marōk", pos: "noun" },
  "овощи": { root: "kōlmar", pos: "noun" },
  "ягоды": { root: "hōrmar", pos: "noun" },
  "молоко": { root: "lānkōl", pos: "noun" },
  "мёд": { root: "dzenkōl", pos: "noun" },
  "сыр": { root: "lānmar", pos: "noun" },
  "конь": { root: "nurkhōr", pos: "noun" },
  "лошадь": { root: "nurkhōr", pos: "noun" },
  "собака": { root: "kōlkhōr", pos: "noun" },
  "волк": { root: "mōrkhōr", pos: "noun" },
  "олень": { root: "dzenkhōr", pos: "noun" },

  "кровь": { root: "marlān", pos: "noun" },
  "крови": { root: "marlān", pos: "noun" },
  "удивление": { root: "ānthal", pos: "noun" },
  "интерес": { root: "thalnur", pos: "noun" },
  "скука": { root: "ānmar", pos: "noun" },
  "усталость": { root: "nōkhmar", pos: "noun" },
  "голод": { root: "mōrmar", pos: "noun" },
  "жажда": { root: "mōrākha", pos: "noun" },

  "храбрый": { root: "khōrīn", pos: "adj" },
  "трусливый": { root: "ānkhōr", pos: "adj" },
  "умный": { root: "tsanīn", pos: "adj" },
  "глупый": { root: "āntsan", pos: "adj" },
  "богатый": { root: "sūrkōl", pos: "adj" },
  "бедный": { root: "hōrkōl", pos: "adj" },

  "сундук": { root: "okharak", pos: "noun" },
  "шкаф": { root: "thōlrak", pos: "noun" },
  "зеркало": { root: "thalrak", pos: "noun" },
  "ковёр": { root: "kōlthōl", pos: "noun" },
  "мудрость": { root: "yartsan", pos: "noun" },
  "сомнение": { root: "ānkhalmar", pos: "noun" },
  "цветок": { root: "mardzen", pos: "noun" },
  "трава": { root: "kōlmar", pos: "noun" },
  "зерно": { root: "khōmar", pos: "noun" },
  "дерево": { root: "gis", pos: "noun" },
  "деревья": { root: "gis", pos: "noun" },

  "вдруг": { root: "ānthal", pos: "adv" },
  "постепенно": { root: "kōlnur", pos: "adv" },
  "быстро": { root: "bystr", pos: "adv" },
  "тихо": { root: "nōkh", pos: "adv" },
  "громко": { root: "khō", pos: "adv" },
  "аккуратно": { root: "thaltsan", pos: "adv" },

  "разбить": { root: "rakz", pos: "verb" },
  "разбил": { root: "rakz", pos: "verb" },
  "бить": { root: "bit", pos: "verb" },
  "бьёт": { root: "bit", pos: "verb" },
  "ударять": { root: "udar", pos: "verb" },
  "ударить": { root: "udar", pos: "verb" },
  "ударил": { root: "udar", pos: "verb" },
  "стукать": { root: "stuk", pos: "verb" },
  "стукнуть": { root: "stuk", pos: "verb" },
  "стучать": { root: "stuk", pos: "verb" },
  "стук": { root: "stuk", pos: "noun" },

  "лён": { root: "lānkōl", pos: "noun" },
  "рана": { root: "mōrrak", pos: "noun" },
  "крыша": { root: "dzenokh", pos: "noun" },
  "пол": { root: "kōlokh", pos: "noun" },
  "окно": { root: "dzentōkh", pos: "noun" },
  "сосед": { root: "kōlsen", pos: "noun" },
  "сила": { root: "khōlān", pos: "noun" },
  "силы": { root: "khōlān", pos: "noun" },
  "смысл": { root: "thaltsan", pos: "noun" },
  "чудо": { root: "ānthal", pos: "noun" },
  "тайна": { root: "nōkhlān", pos: "noun" },

  "пахнуть": { root: "khōlān", pos: "verb" },
  "звенеть": { root: "dzenur", pos: "verb" },
  "шептать": { root: "nōkhthal", pos: "verb" },
  "кричать": { root: "khōthal", pos: "verb" },
  "молчать": { root: "ānthal", pos: "verb" },
  "вспоминать": { root: "lānthal", pos: "verb" },
  "забывать": { root: "ānlān", pos: "verb" },
  "верить": { root: "khalmar", pos: "verb" },
  "надеяться": { root: "lānthōl", pos: "verb" },
  "бояться": { root: "ghōlmar", pos: "verb" },

  "след": { root: "kōlnur", pos: "noun" },
  "слава": { root: "lānkhō", pos: "noun" },
  "беда": { root: "mōrthal", pos: "noun" },
  "победа": { root: "marlān", pos: "noun" },
  "поражение": { root: "mōrlān", pos: "noun" }
};

// ============================================================
// 1. ИНИЦИАЛИЗАЦИЯ
// ============================================================
let lexicon = LEXICON_DATA;
let showGlyphs = false;

// ============================================================
// 2. ЛЕММАТИЗАЦИЯ
// ============================================================
function normalize(word) {
  return word.toLowerCase().replace(/ё/g, 'е');
}

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
  "рисую": "thalur", "рисуешь": "thalur", "рисует": "thalur",
  "рисуем": "thalur", "рисуете": "thalur", "рисуют": "thalur",
  "рисовал": "thalur", "рисовала": "thalur", "рисовали": "thalur",
  "ем": "есть", "ешь": "есть", "ест": "есть",
  "едим": "есть", "едят": "есть", "ел": "есть",
  "ела": "есть", "ели": "есть",
  "полечу": "zalur", "полетишь": "zalur", "полетит": "zalur",
  "полетим": "zalur", "полетите": "zalur", "полетят": "zalur",
  "слушаю": "слушать", "слушаешь": "слушать", "слушает": "слушать",
  "слушаем": "слушать", "слушаете": "слушать", "слушают": "слушать",
  "слушал": "слушать", "слушала": "слушать", "слушали": "слушать",
  "посвятил": "посвятить", "посвятила": "посвятить", "посвятили": "посвятить",
  "увидел": "увидеть", "увидела": "увидеть", "увидели": "увидеть",
  "систематизирует": "систематизировать",
  "посмотрю": "посмотреть", "посмотришь": "посмотреть",
  "посмотрит": "посмотреть", "посмотрим": "посмотреть",
  "посмотрите": "посмотреть", "посмотрят": "посмотреть",
  "посмотрел": "посмотреть", "посмотрела": "посмотреть",
  "посмотрели": "посмотреть",
  "пойду": "пойти", "пойдёшь": "пойти", "пойдёт": "пойти",
  "пойдём": "пойти", "пойдёте": "пойти", "пойдут": "пойти",
  "пошёл": "пойти", "пошла": "пойти", "пошли": "пойти",
  "куплю": "купить", "купишь": "купить", "купит": "купить",
  "купим": "купить", "купите": "купить", "купят": "купить",
  "купил": "купить", "купила": "купить", "купили": "купить"
};

// ============================================================
// 3. МОРФЕМЫ для автогенерации
// ============================================================
const MORPHEMES = {
  'вод':'ākha','аква':'ākha','земл':'kōl','терр':'kōl','грунт':'kōl',
  'огн':'khō','план':'khō','звезд':'dzen','звёзд':'dzen','косм':'dzen','астр':'dzen','неб':'dzen',
  'жизн':'mar','био':'mar','смерт':'mōr','мер':'mōr','гиб':'mōr',
  'памят':'lān','помн':'lān','зна':'lān','дом':'okh','город':'okh','посел':'okh',
  'корол':'rōg','царь':'rōg','правит':'rōg','власт':'rōg',
  'мест':'sen','помещ':'sen','здан':'sen','храм':'sen',
  'человек':'mārīn','люд':'mārīn','марсиан':'marzān','марс':'marzān',
  'камн':'ghar','камен':'ghar','гор':'ghar','скал':'ghar',
  'тен':'ghōl','мрак':'ghōl','тьм':'ghōl',
  'свет':'dzēn','ярк':'dzēn','сия':'dzēn',
  'знан':'tsan','наук':'tsan','учен':'tsan','мудр':'tsan',
  'хран':'lānīn','защит':'lānīn','глин':'sur','пыл':'sur','пес':'sur',
  'движ':'nur','путь':'nur','дорог':'nur','ход':'nur',
  'смотр':'thal','гляд':'thal','вид':'thal','наблюд':'thal',
  'говор':'thal','реч':'thal','язык':'thal',
  'велик':'suf','огромн':'suf','больш':'suf',
  'древ':'xal','стар':'xal','предк':'xal',
  'нов':'khal','молод':'khal','умн':'yar',
  'избран':'ari','главн':'ari','хорош':'suf','добр':'suf','красив':'suf',
  'жив':'mar','мертв':'mōr',
  'ветер':'zal','ветр':'zal','океан':'ākhasuf','мор':'thal',
  'берег':'kōlākha','побереж':'kōlākha','волн':'ākha',
  'облак':'oblako','туч':'oblako','туман':'tuman','снег':'sneg',
  'льд':'led','лед':'led','гром':'grom','молни':'khōdzen',
  'пламя':'khō','пламен':'khō','холод':'mōr','мороз':'mōr',
  'жар':'khō','зной':'khō','тепл':'khō',
  'правд':'thaltsan','истин':'thaltsan','лож':'ānthaltsan',
  'надежд':'lānthōl','вер':'khalmar','свобод':'nurariya',
  'справедлив':'aritsan','сил':'khōlān','мощ':'khōlān',
  'смысл':'thaltsan','чуд':'ānthal','тайн':'nōkhlān','секрет':'nōkhlān',
  'войн':'mōrkhō','мир':'nōkh','покой':'nōkh',
  'год':'amār','лет':'amār','цикл':'amār','дн':'sōl','день':'sōl',
  'ноч':'nōkh','утр':'dzēn','вечер':'khōl','врем':'amār','эпох':'amār',
  'друг':'tō','брат':'tō','союз':'tō','враг':'ān',
  'воин':'ur','солдат':'ur','бойц':'ur','пират':'khōsīn','разбой':'khōsīn',
  'купец':'xur','торгов':'xur','жрец':'en','пророк':'hery',
  'учит':'tsanīn','настав':'tsanīn','стро':'okhar','созда':'khalur','дела':'khalur',
  'разруш':'mōrkhō','уничтож':'mōrkhō','писа':'khōs','пиш':'khōs','запис':'khōs',
  'чита':'thal','игра':'thalur','петь':'zalkhō','танц':'thalur',
  'люб':'lānmar','бо':'ghōlmar','дума':'tsanur','поним':'tsanlān',
  'слуша':'thal','откры':'tōkhur','закры':'tōkhur',
  'академ':'tsan-sen','библиот':'lan-sen','обсерв':'dzensen',
  'государ':'rāk','истори':'lānkhō','культур':'xalmar','религ':'khalmar',
  'экономик':'xur','политик':'rāk','территор':'kōl','област':'kōl',
  'поверхн':'kōl','атмосфер':'dzen','температ':'khō','климат':'khō',
  'континент':'kōl','материк':'kōl','остров':'kōlhōr',
  'полуостров':'kōlhōr','пролив':'kōlākha','залив':'ākha',
  'река':'khan','канал':'khan','озеро':'ākha','водоем':'ākha',
  'планета':'dzenkōl','спутник':'dzenkhōr','орбит':'dzennur',
  'комета':'khōdzen','астероид':'ghardzen','галактик':'sūrdzen',
  'солнц':'khō','луна':'mōr','светил':'dzēn',
  'деревн':'hōrokh','народ':'mārīnān','племя':'mārīnān',
  'землян':'kōlmārīn','император':'rōg','правител':'rōg',
  'раб':'arad','богат':'sūrkōl','бедн':'hōrkōl',
  'растен':'kōlmar','животн':'khōr','птиц':'zalakhōr','рыб':'ākhakhōr',
  'млекопит':'khōr','насеком':'khōr','черв':'khōr','моллюск':'ākhakhōr',
  'цвет':'dzēn','красн':'khōn','син':'ākhan','зелен':'marn',
  'желт':'dzenk','бел':'lānk','черн':'kōln','сер':'xalkōln',
  'мал':'hōr','длин':'sūr','коротк':'hōr',
  'сильн':'khōlān','слабн':'ānkhōlān','быстр':'nurkhō','медл':'kōlnur',
  'умн':'tsanīn','глуп':'āntsan','старин':'xal','современ':'khal',
  'перв':'khān','последн':'mōr','начал':'khān','конец':'rak',
  'плох':'ān','зл':'ān','дать':'rōg','взять':'khōs',
  'идти':'nur','бежать':'nurkhō','говорить':'thalthu','молчать':'ānthal',
  'плакать':'ākhaur','смеяться':'thalmar','бояться':'ghōlmar',
  'думать':'tsanur','знать':'tsan','помнить':'lān','забыть':'ānlān',
  'жить':'marlān','умирать':'mōr','родить':'khalur',
  'видеть':'thal','слышать':'thal','чувствовать':'thal'
};

const ENDINGS = [
  'иями','иях','ией','иям','ием','ами','ями','ах','ях','ой','ей',
  'ые','ие','ыми','ими','ого','его','ому','ему','ая','яя','ое','ее',
  'ый','ий','ов','ев','ьи','ам','ям','ом','ем',
  'ать','ять','еть','ить','ыть','уть','оть','ти','чь',
  'аю','яю','ею','ую','ию','аешь','яешь','еешь','уешь','иешь',
  'ает','яет','еет','ует','иет','аем','яем','еем','уем','ием',
  'аете','яете','еете','уете','иете','ают','яют','еют','уют','иют',
  'ал','ял','ел','ил','ыл','ул','ол',
  'ала','яла','ела','ила','ыла','ула','ола',
  'али','яли','ели','или','ыли','ули','оли',
  'ись','ться','тся','шься','мся','тесь','атся','ятся','ется','ится',
  'ы','и','а','я','у','ю','е','о','ь','й'
];

const TRANS_MAP = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};

function translit(w) {
  let r = '';
  for (let i = 0; i < w.length; i++) r += TRANS_MAP[w[i]] || w[i];
  return r;
}

function stylize(w) {
  w = w.replace(/aa/g,'ā').replace(/oo/g,'ō').replace(/uu/g,'ū').replace(/ee/g,'ē').replace(/ii/g,'ī');
  if (w.endsWith('a')) w = w.slice(0,-1)+'ā';
  else if (w.endsWith('o')) w = w.slice(0,-1)+'ō';
  else if (w.endsWith('u')) w = w.slice(0,-1)+'ū';
  if (w.length > 10) w = w.slice(0,10);
  return w;
}

function findMorpheme(w) {
  let best = null, bestLen = 0;
  for (let m in MORPHEMES) {
    if (w.indexOf(m) === 0 && m.length > bestLen) { best = MORPHEMES[m]; bestLen = m.length; }
  }
  if (best) return best;
  for (let m2 in MORPHEMES) {
    if (m2.length >= 4 && w.indexOf(m2) !== -1) return MORPHEMES[m2];
  }
  return null;
}

function stripEndings(w) {
  for (let i = 0; i < ENDINGS.length; i++) {
    const e = ENDINGS[i];
    if (w.length > e.length + 2 && w.slice(-e.length) === e) return w.slice(0, -e.length);
  }
  return w;
}

function generateRoot(word) {
  const stem = stripEndings(word);
  const mars = findMorpheme(stem) || findMorpheme(word);
  if (mars) return mars;
  return stylize(translit(stem));
}

function findInLexicon(word) {
  const norm = normalize(word);
  if (lexicon[norm]) return { found: true, entry: lexicon[norm], lemma: norm };
  if (VERB_LEMMAS[norm]) {
    const inf = VERB_LEMMAS[norm];
    if (lexicon[inf]) return { found: true, entry: lexicon[inf], lemma: inf };
  }
  for (let i = 0; i < ENDINGS.length; i++) {
    const e = ENDINGS[i];
    if (norm.length > e.length + 2 && norm.slice(-e.length) === e) {
      const stem = norm.slice(0, -e.length);
      const variants = [stem, stem+'а', stem+'я', stem+'о', stem+'е', stem+'ь',
                        stem+'ий', stem+'ия', stem+'ие', stem+'ость', stem+'ние',
                        stem+'ение', stem+'ать', stem+'ять', stem+'еть', stem+'ить',
                        stem+'ыть', stem+'уть', stem+'ти', stem+'чь'];
      for (const v of variants) {
        if (lexicon[v]) return { found: true, entry: lexicon[v], lemma: v };
      }
    }
  }
  return { found: false };
}

// ============================================================
// 4. ИЕРОГЛИФЫ — ТВОИ СИМВОЛЫ
// ============================================================
const MARTIAN_GLYPHS = {
  "ākha": "〰", "okh": "⌂", "kōl": "✦", "khō": "★", "mar": "⊙", "lān": "∞",
  "thal": "┤", "rōg": "▲", "khan": "¢", "sen": "P", "īn": "Λ", "dzen": "✦",
  "sur": "☰", "zal": "↯", "xar": "⨯", "ghar": "◆", "nur": "➤", "tsan": "✧",
  "khal": "◈", "xal": "◉", "suf": "⬡", "ari": "⏣", "mōr": "✖",
  "zān": "◉", "ur": "↗", "nu": "≡", "shu": "≠", "ān": "✖", "kha": "ɉ",
  "rak": "ϔ", "thu": "҉", "un": "Ⴕ", "kan": "‖", "tsen": "‽", "tal": "‡"
};

const MARTIAN_ALPHABET = {
  'm': '▭•••','n': '▭••','r': '⊙','l': '○','k': '▷','g': '◁','kh': '△','gh': '▽',
  't': '|','d': '—','ts': '✖','dz': 'ⴕ','th': '/','f': 'Ꙙ','x': '♢',
  's': 'Ꝉ','z': 'I','p': 'p','b': 'b','v': 'v','w': 'ꬷ','y': 'Y','c': 'ꝇ',
  'j': '꜡','q': 'Ꚛ','a': '՚','ā': '¬','o': 'ᵕ','ō': 'ᵔ','u': '°','ū': 'ˉˉ',
  'i': '↯','e': 'Ƨ','ē': 'Ƨ̱'
};

function toGlyphs(text) {
  if (!text) return '';
  return text.split(' ').map(word => {
    if (!word) return '';
    const lower = word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (MARTIAN_GLYPHS[lower]) return MARTIAN_GLYPHS[lower];
    let out = '', i = 0;
    while (i < word.length) {
      const two = word.substr(i, 2).toLowerCase();
      if (MARTIAN_ALPHABET[two]) { out += MARTIAN_ALPHABET[two]; i += 2; }
      else {
        const c = word[i].toLowerCase();
        out += MARTIAN_ALPHABET[c] || c;
        i++;
      }
    }
    return out;
  }).join(' ');
}

// ============================================================
// 5. ФРАЗЫ
// ============================================================
function checkPhrases(text) {
  const lower = text.toLowerCase();
  const phraseMap = {
    "привет": "Mar dzen", "здравствуй": "Mar dzen", "здравствуйте": "Mar dzen",
    "добрый день": "Mar dzen", "до свидания": "Lān mar", "прощай": "Lān mar",
    "прощайте": "Ariya lān", "очень приятно": "Tsan lān", "спасибо": "Tsan lān",
    "глина помнит": "Lān sur", "письмо из красной пыли": "Khalur khō sur",
    "марсианская энциклопедия": "Tsankhō Marzān", "красная пыль": "Khō sur",
    "мнемис": "Lānīn"
  };
  for (let key in phraseMap) {
    if (lower.indexOf(key) !== -1) return { found: true, translation: phraseMap[key] };
  }
  return { found: false };
}

// ============================================================
// 6. ПЕРЕКЛЮЧЕНИЕ ИЕРОГЛИФОВ
// ============================================================
function toggleGlyphs() {
  showGlyphs = !showGlyphs;
  const button = document.getElementById('glyphToggle');
  if (showGlyphs) {
    button.textContent = '📝 Латиница';
    button.style.background = '#e67e22';
  } else {
    button.textContent = '🔮 Иероглифы';
    button.style.background = '#6c7a8a';
  }
  const input = document.getElementById('inputText').value.trim();
  if (input) translateText();
}

// ============================================================
// 7. ОСНОВНОЙ ПЕРЕВОД
// ============================================================
const PREPOSITIONS = ['на','в','у','к','от','из','для','без','через','по','о','об','с','со','за','под','над','перед','между','возле','около','мимо','вокруг'];

function translateText() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    document.getElementById('translation').textContent = 'Введите текст для перевода.';
    document.getElementById('gloss').textContent = '';
    return;
  }

  const phraseResult = checkPhrases(input);
  if (phraseResult.found) {
    document.getElementById('translation').textContent = phraseResult.translation;
    document.getElementById('gloss').textContent = 'Подстрочник: ' + phraseResult.translation;
    return;
  }

  const rawWords = input.split(/\s+/).filter(w => w.length > 0);
  let processed = [], unknown = [];

  rawWords.forEach(w => {
    const clean = w.replace(/[^а-яa-zё]/gi, '').toLowerCase();
    if (PREPOSITIONS.indexOf(clean) !== -1) return;

    const result = findInLexicon(clean);
    if (result.found) {
      processed.push({
        word: w,
        root: result.entry.root,
        pos: result.entry.pos,
        plural: false,
        adj: result.entry.pos === 'adj'
      });
    } else {
      const generated = generateRoot(normalize(clean));
      processed.push({
        word: w,
        root: generated,
        pos: 'generated',
        plural: false,
        adj: false
      });
      unknown.push(w + '→' + generated);
    }
  });

  if (processed.length === 0) {
    document.getElementById('translation').textContent = 'Нет слов для перевода.';
    document.getElementById('gloss').textContent = '';
    return;
  }

  let verb = null, verbIdx = -1;
  for (let i = 0; i < processed.length; i++) {
    if (processed[i].pos === 'verb') { verbIdx = i; verb = processed[i]; break; }
  }
  let subject = verbIdx !== -1 ? processed.slice(0, verbIdx) : processed;
  let objects = verbIdx !== -1 ? processed.slice(verbIdx + 1) : [];

  let resultWords = [];
  subject.forEach(w => resultWords.push(w.root));
  objects.forEach(w => resultWords.push(w.root));
  if (verb) resultWords.push(verb.root);

  const lowerInput = input.toLowerCase();

  const hasNeg = rawWords.some(w => {
    const c = w.replace(/[^а-яa-zё]/gi,'').toLowerCase();
    return c === 'не' || c === 'нет';
  });
  if (hasNeg && verb) {
    const idx = resultWords.indexOf(verb.root);
    if (idx !== -1) resultWords.splice(idx + 1, 0, 'ān');
  }

  if (input.indexOf('?') !== -1) resultWords.push('kha');

  const hasPast = lowerInput.indexOf('был') !== -1 || lowerInput.indexOf('была') !== -1 || lowerInput.indexOf('были') !== -1;
  if (hasPast && verb) {
    const idx = resultWords.indexOf(verb.root);
    if (idx !== -1) {
      let p = idx + 1;
      if (resultWords[p] === 'ān') p++;
      resultWords.splice(p, 0, 'nu');
    }
  }

  if ((lowerInput.indexOf('будет') !== -1 || lowerInput.indexOf('будут') !== -1) && verb) {
    const idx = resultWords.indexOf(verb.root);
    if (idx !== -1) {
      let p = idx + 1;
      if (resultWords[p] === 'ān') p++;
      resultWords.splice(p, 0, 'shu');
    }
  }

  const modalMap = {
    'могу':'xan','можешь':'xan','может':'xan','можем':'xan','можете':'xan','могут':'xan',
    'хочу':'shar','хочешь':'shar','хочет':'shar','хотим':'shar','хотите':'shar','хотят':'shar',
    'должен':'mun','должна':'mun','должно':'mun','должны':'mun'
  };
  for (let k in modalMap) {
    if (lowerInput.indexOf(k) !== -1 && verb) {
      const idx = resultWords.indexOf(verb.root);
      if (idx !== -1) resultWords[idx] = verb.root + modalMap[k];
      break;
    }
  }

  const translation = resultWords.join(' ');

  if (showGlyphs) {
    document.getElementById('translation').textContent = toGlyphs(translation);
    document.getElementById('gloss').textContent = 'Латиница: ' + translation;
  } else {
    document.getElementById('translation').textContent = translation;
  }

  let glossText = 'Подстрочник: ' + processed.map(p => p.word + '→' + p.root).join(' ');
  if (unknown.length > 0) glossText += '\n🆕 Авто-сгенерировано: ' + unknown.length;
  document.getElementById('gloss').textContent = glossText;
  document.getElementById('translation').className = 'result';
}

function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('translation').textContent = 'Здесь появится перевод...';
  document.getElementById('translation').className = 'result';
  document.getElementById('gloss').textContent = '';
}

// ============================================================
// 8. ЭКСПОРТ В WINDOW (ЧТОБЫ onclick РАБОТАЛИ)
// ============================================================
window.translateText = translateText;
window.clearAll = clearAll;
window.toggleGlyphs = toggleGlyphs;

// Ctrl+Enter
document.getElementById('inputText').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) translateText();
});

console.log('🪐 Переводчик готов. Слов в словаре: ' + Object.keys(lexicon).length);
</script>
