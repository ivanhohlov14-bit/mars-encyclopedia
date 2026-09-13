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
// ПЕРЕВОДЧИК С АВТО-ГЕНЕРАЦИЕЙ СЛОВ
// ============================================================
(function() {
  'use strict';

  // Словарь из martian-lexicon.js
  var lexicon = window.MARTIAN_LEXICON || {};
  var VERB_LEMMAS = window.MARTIAN_VERB_LEMMAS || {};
  var PREPOSITIONS = window.MARTIAN_PREPOSITIONS || ['на','в','у','к','от','из','для','без','через','по','о','об','с','со','за','под','над','перед','между','возле','около','мимо','вокруг'];
  var showGlyphs = false;

  // ============================================================
  // 🧬 МОРФЕМЫ — для генерации корней
  // ============================================================
  var MORPHEMES = {
    'вод':'ākha','аква':'ākha','земл':'kōl','терр':'kōl','грунт':'kōl',
    'огн':'khō','план':'khō','звезд':'dzen','звёзд':'dzen','косм':'dzen','астр':'dzen','неб':'dzen',
    'жизн':'mar','био':'mar','смерт':'mōr','мер':'mōr','гиб':'mōr',
    'памят':'lān','помн':'lān','зна':'lān',
    'дом':'okh','город':'okh','посел':'okh',
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
    'нов':'khal','молод':'khal','мудр':'yar','умн':'yar',
    'избран':'ari','главн':'ari','хорош':'suf','добр':'suf','красив':'suf',
    'жив':'mar','мёртв':'mōr','мертв':'mōr',
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

  var ENDINGS = [
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

  var TRANS_MAP = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};

  function translit(w) {
    var r = '';
    for (var i = 0; i < w.length; i++) r += TRANS_MAP[w[i]] || w[i];
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
    var best = null, bestLen = 0;
    for (var m in MORPHEMES) {
      if (w.indexOf(m) === 0 && m.length > bestLen) { best = MORPHEMES[m]; bestLen = m.length; }
    }
    if (best) return best;
    for (var m2 in MORPHEMES) {
      if (m2.length >= 4 && w.indexOf(m2) !== -1) return MORPHEMES[m2];
    }
    return null;
  }

  function stripEndings(w) {
    for (var i = 0; i < ENDINGS.length; i++) {
      var e = ENDINGS[i];
      if (w.length > e.length + 2 && w.slice(-e.length) === e) return w.slice(0, -e.length);
    }
    return w;
  }

  function generateRoot(word) {
    var stem = stripEndings(word);
    var mars = findMorpheme(stem) || findMorpheme(word);
    if (mars) return mars;
    return stylize(translit(stem));
  }

  function normalize(word) {
    return word.toLowerCase().replace(/ё/g, 'е');
  }

  function findInLexicon(word) {
    var norm = normalize(word);
    if (lexicon[norm]) return { found: true, entry: lexicon[norm] };
    if (VERB_LEMMAS[norm] && lexicon[VERB_LEMMAS[norm]]) {
      return { found: true, entry: lexicon[VERB_LEMMAS[norm]] };
    }
    for (var i = 0; i < ENDINGS.length; i++) {
      var e = ENDINGS[i];
      if (norm.length > e.length + 2 && norm.slice(-e.length) === e) {
        var stem = norm.slice(0, -e.length);
        var variants = [stem, stem+'а', stem+'я', stem+'о', stem+'е', stem+'ь',
                        stem+'ий', stem+'ия', stem+'ие', stem+'ость', stem+'ние',
                        stem+'ение', stem+'ать', stem+'ять', stem+'еть', stem+'ить',
                        stem+'ыть', stem+'уть', stem+'ти', stem+'чь'];
        for (var j = 0; j < variants.length; j++) {
          if (lexicon[variants[j]]) return { found: true, entry: lexicon[variants[j]] };
        }
      }
    }
    return { found: false };
  }

  // ============================================================
  // 🎨 ИЕРОГЛИФЫ
  // ============================================================
  var MARTIAN_GLYPHS = {
    'ākha':'〰','okh':'⌂','kōl':'✦','khō':'★','mar':'⊙','lān':'∞',
    'thal':'┤','rōg':'▲','khan':'¢','sen':'P','dzen':'✦','sur':'☰',
    'zal':'↯','ghar':'◆','nur':'➤','tsan':'✧','khal':'◈','xal':'◉',
    'suf':'⬡','ari':'⏣','mōr':'✖'
  };

  var MARTIAN_ALPHABET = {
    'm':'▭•••','n':'▭••','r':'⊙','l':'○','k':'▷','g':'◁','kh':'△','gh':'▽',
    't':'|','d':'—','ts':'✖','dz':'ⴕ','th':'/','f':'Ꙙ','x':'♢',
    's':'Ꝉ','z':'I','p':'p','b':'b','v':'v','a':'՚','ā':'¬','o':'ᵕ','ō':'ᵔ',
    'u':'°','ū':'ˉˉ','i':'↯','e':'Ƨ','ē':'Ƨ̱'
  };

  function toGlyphs(text) {
    if (!text) return '';
    return text.split(' ').map(function(word) {
      if (!word) return '';
      var lower = word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (MARTIAN_GLYPHS[lower]) return MARTIAN_GLYPHS[lower];
      var out = '', i = 0;
      while (i < word.length) {
        var two = word.substr(i, 2).toLowerCase();
        if (MARTIAN_ALPHABET[two]) { out += MARTIAN_ALPHABET[two]; i += 2; }
        else {
          var c = word[i].toLowerCase();
          out += MARTIAN_ALPHABET[c] || c;
          i++;
        }
      }
      return out;
    }).join(' ');
  }

  // ============================================================
  // 📖 ФРАЗЫ
  // ============================================================
  function checkPhrases(text) {
    var lower = text.toLowerCase();
    var phraseMap = {
      'привет':'Mar dzen','здравствуй':'Mar dzen','здравствуйте':'Mar dzen',
      'добрый день':'Mar dzen','до свидания':'Lān mar','прощай':'Lān mar',
      'прощайте':'Ariya lān','очень приятно':'Tsan lān','спасибо':'Tsan lān',
      'глина помнит':'Lān sur','письмо из красной пыли':'Khalur khō sur',
      'марсианская энциклопедия':'Tsankhō Marzān','красная пыль':'Khō sur','мнемис':'Lānīn'
    };
    for (var key in phraseMap) {
      if (lower.indexOf(key) !== -1) return { found: true, translation: phraseMap[key] };
    }
    return { found: false };
  }

  // ============================================================
  // 🎯 ГЛАВНАЯ ФУНКЦИЯ ПЕРЕВОДА
  // ============================================================
  function translateText() {
    var input = document.getElementById('inputText').value.trim();
    var translationEl = document.getElementById('translation');
    var glossEl = document.getElementById('gloss');

    if (!input) {
      translationEl.textContent = 'Введите текст для перевода.';
      glossEl.textContent = '';
      return;
    }

    var phraseResult = checkPhrases(input);
    if (phraseResult.found) {
      translationEl.textContent = phraseResult.translation;
      glossEl.textContent = 'Подстрочник: ' + phraseResult.translation;
      return;
    }

    var rawWords = input.split(/\s+/).filter(function(w) { return w.length > 0; });
    var processed = [], unknown = [];

    rawWords.forEach(function(w) {
      var clean = w.replace(/[^а-яa-zё]/gi, '').toLowerCase();
      if (PREPOSITIONS.indexOf(clean) !== -1) return;

      var result = findInLexicon(clean);
      if (result.found) {
        processed.push({
          word: w,
          root: result.entry.root,
          pos: result.entry.pos,
          plural: false,
          adj: result.entry.pos === 'adj'
        });
      } else {
        var generated = generateRoot(normalize(clean));
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
      translationEl.textContent = 'Нет слов для перевода.';
      glossEl.textContent = '';
      return;
    }

    // Разделение на подлежащее и дополнение
    var verb = null, verbIdx = -1;
    for (var i = 0; i < processed.length; i++) {
      if (processed[i].pos === 'verb') { verbIdx = i; verb = processed[i]; break; }
    }
    var subject = verbIdx !== -1 ? processed.slice(0, verbIdx) : processed;
    var objects = verbIdx !== -1 ? processed.slice(verbIdx + 1) : [];

    var resultWords = [];

    subject.forEach(function(w) { resultWords.push(w.root); });
    objects.forEach(function(w) { resultWords.push(w.root); });
    if (verb) resultWords.push(verb.root);

    var lowerInput = input.toLowerCase();

    // Отрицание
    var hasNeg = rawWords.some(function(w) {
      var c = w.replace(/[^а-яa-zё]/gi,'').toLowerCase();
      return c === 'не' || c === 'нет';
    });
    if (hasNeg && verb) {
      var idx = resultWords.indexOf(verb.root);
      if (idx !== -1) resultWords.splice(idx + 1, 0, 'ān');
    }

    // Вопрос
    if (input.indexOf('?') !== -1) resultWords.push('kha');

    // Прошедшее
    var hasPast = lowerInput.indexOf('был') !== -1 || lowerInput.indexOf('была') !== -1 || lowerInput.indexOf('были') !== -1;
    if (hasPast && verb) {
      var idx2 = resultWords.indexOf(verb.root);
      if (idx2 !== -1) {
        var p = idx2 + 1;
        if (resultWords[p] === 'ān') p++;
        resultWords.splice(p, 0, 'nu');
      }
    }

    // Будущее
    if ((lowerInput.indexOf('будет') !== -1 || lowerInput.indexOf('будут') !== -1) && verb) {
      var idx3 = resultWords.indexOf(verb.root);
      if (idx3 !== -1) {
        var p2 = idx3 + 1;
        if (resultWords[p2] === 'ān') p2++;
        resultWords.splice(p2, 0, 'shu');
      }
    }

    // Модальность
    var modalMap = {
      'могу':'xan','можешь':'xan','может':'xan','можем':'xan','можете':'xan','могут':'xan',
      'хочу':'shar','хочешь':'shar','хочет':'shar','хотим':'shar','хотите':'shar','хотят':'shar',
      'должен':'mun','должна':'mun','должно':'mun','должны':'mun'
    };
    for (var k in modalMap) {
      if (lowerInput.indexOf(k) !== -1 && verb) {
        var idx4 = resultWords.indexOf(verb.root);
        if (idx4 !== -1) resultWords[idx4] = verb.root + modalMap[k];
        break;
      }
    }

    // Вывод
    var translation = resultWords.join(' ');

    if (showGlyphs) {
      translationEl.textContent = toGlyphs(translation);
      glossEl.textContent = 'Латиница: ' + translation;
    } else {
      translationEl.textContent = translation;
    }

    // Подстрочник
    var glossText = 'Подстрочник: ' + processed.map(function(p) {
      return p.word + '→' + p.root;
    }).join(' ');
    if (unknown.length > 0) {
      glossText += '\n🆕 Авто-сгенерировано: ' + unknown.length + ' из ' + processed.length;
    }
    glossEl.textContent = glossText;
    translationEl.className = 'result';
  }

  function clearAll() {
    document.getElementById('inputText').value = '';
    document.getElementById('translation').textContent = 'Здесь появится перевод...';
    document.getElementById('translation').className = 'result';
    document.getElementById('gloss').textContent = '';
  }

  function toggleGlyphs() {
    showGlyphs = !showGlyphs;
    var button = document.getElementById('glyphToggle');
    if (showGlyphs) {
      button.textContent = '📝 Латиница';
      button.style.background = '#e67e22';
    } else {
      button.textContent = '🔮 Иероглифы';
      button.style.background = '#6c7a8a';
    }
    var input = document.getElementById('inputText').value.trim();
    if (input) translateText();
  }

  // ============================================================
  // 🌐 ЭКСПОРТ В WINDOW (чтобы onclick работали!)
  // ============================================================
  window.translateText = translateText;
  window.clearAll = clearAll;
  window.toggleGlyphs = toggleGlyphs;

  // Ctrl+Enter
  document.getElementById('inputText').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) translateText();
  });

  console.log('🪐 Переводчик загружен. Слов в словаре:', Object.keys(lexicon).length);
})();
</script>
