// ============================================================
// martian-mode.js — марсианский язык с авто-генерацией слов
// ============================================================

(function() {
    'use strict';

    var MARTIAN_KEY = 'mars_lang_mode';
    var INTRO_KEY = 'mars_intro_shown';
    var isMartian = localStorage.getItem(MARTIAN_KEY) === 'mr';
    var originals = new WeakMap();

    // ============================================================
    // 🧬 МОРФЕМЫ — для генерации корней
    // ============================================================
    var MORPHEMES = {
        // Природа
        'вод': 'ākha', 'аква': 'ākha',
        'земл': 'kōl', 'терр': 'kōl', 'грунт': 'kōl',
        'огн': 'khō', 'план': 'khō',
        'звезд': 'dzen', 'звёзд': 'dzen', 'косм': 'dzen', 'астр': 'dzen', 'неб': 'dzen',
        'жизн': 'mar', 'био': 'mar',
        'смерт': 'mōr', 'мер': 'mōr', 'гиб': 'mōr',
        'памят': 'lān', 'помн': 'lān', 'зна': 'lān',
        'дом': 'okh', 'город': 'okh', 'посел': 'okh',
        'корол': 'rōg', 'царь': 'rōg', 'правит': 'rōg', 'власт': 'rōg',
        'мест': 'sen', 'помещ': 'sen', 'здан': 'sen', 'храм': 'sen',
        'человек': 'mārīn', 'люд': 'mārīn',
        'марсиан': 'marzān', 'марс': 'marzān',
        'камн': 'ghar', 'камен': 'ghar', 'гор': 'ghar', 'скал': 'ghar',
        'тен': 'ghōl', 'мрак': 'ghōl', 'тьм': 'ghōl',
        'свет': 'dzēn', 'ярк': 'dzēn', 'сия': 'dzēn',
        'знан': 'tsan', 'наук': 'tsan', 'учен': 'tsan', 'мудр': 'tsan',
        'хран': 'lānīn', 'защит': 'lānīn',
        'глин': 'sur', 'пыл': 'sur', 'пес': 'sur',
        'движ': 'nur', 'путь': 'nur', 'дорог': 'nur', 'ход': 'nur',
        'смотр': 'thal', 'гляд': 'thal', 'вид': 'thal', 'наблюд': 'thal',
        'говор': 'thal', 'реч': 'thal', 'язык': 'thal',
        'велик': 'suf', 'огромн': 'suf', 'больш': 'suf',
        'древ': 'xal', 'стар': 'xal', 'предк': 'xal',
        'нов': 'khal', 'молод': 'khal',
        'мудр': 'yar', 'умн': 'yar',
        'избран': 'ari', 'главн': 'ari',
        'хорош': 'suf', 'добр': 'suf', 'красив': 'suf', 'светл': 'suf',
        'живой': 'mar', 'жив': 'mar',
        'мёртв': 'mōr', 'мертв': 'mōr',
        'ветер': 'zal', 'ветр': 'zal',
        'океан': 'ākhasuf', 'мор': 'thal',
        'берег': 'kōlākha', 'побереж': 'kōlākha',
        'волн': 'ākha',
        'облак': 'oblako', 'туч': 'oblako',
        'туман': 'tuman',
        'снег': 'sneg',
        'льд': 'led', 'лед': 'led',
        'гром': 'grom',
        'молни': 'khōdzen',
        'пламя': 'khō', 'пламен': 'khō',
        'холод': 'mōr', 'мороз': 'mōr',
        'жар': 'khō', 'зной': 'khō', 'тепл': 'khō',
        // Абстракции
        'правд': 'thaltsan', 'истин': 'thaltsan',
        'лож': 'ānthaltsan',
        'надежд': 'lānthōl',
        'вер': 'khalmar',
        'свобод': 'nurariya',
        'справедлив': 'aritsan',
        'сил': 'khōlān', 'мощ': 'khōlān',
        'смысл': 'thaltsan',
        'чуд': 'ānthal',
        'тайн': 'nōkhlān', 'секрет': 'nōkhlān',
        'войн': 'mōrkhō',
        'мир': 'nōkh', 'покой': 'nōkh',
        // Время
        'год': 'amār', 'лет': 'amār', 'цикл': 'amār',
        'дн': 'sōl', 'день': 'sōl',
        'ноч': 'nōkh',
        'утр': 'dzēn', 'вечер': 'khōl',
        'врем': 'amār', 'эпох': 'amār',
        // Люди
        'друг': 'tō', 'брат': 'tō', 'союз': 'tō',
        'враг': 'ān',
        'воин': 'ur', 'солдат': 'ur', 'бойц': 'ur',
        'пират': 'khōsīn', 'разбой': 'khōsīn',
        'купец': 'xur', 'торгов': 'xur',
        'жрец': 'en', 'пророк': 'hery',
        'учен': 'tsanīn', 'учит': 'tsanīn', 'настав': 'tsanīn',
        'король': 'rōg', 'императ': 'rōg',
        // Действия
        'стро': 'okhar', 'созда': 'khalur', 'дела': 'khalur',
        'разруш': 'mōrkhō', 'уничтож': 'mōrkhō',
        'писа': 'khōs', 'пиш': 'khōs', 'запис': 'khōs',
        'чита': 'thal',
        'игра': 'thalur',
        'петь': 'zalkhō',
        'танц': 'thalur',
        'люб': 'lānmar',
        'бо': 'ghōlmar',
        'дума': 'tsanur',
        'поним': 'tsanlān',
        'слуша': 'thal',
        'откры': 'tōkhur',
        'закры': 'tōkhur',
        // Географические
        'академ': 'tsan-sen',
        'библиот': 'lan-sen',
        'обсерв': 'dzensen',
        'универс': 'tsan-sen',
        'лаборат': 'tsan-sen'
    };

    // ============================================================
    // 🔚 РУССКИЕ ОКОНЧАНИЯ (для морфологического разбора)
    // ============================================================
    var ENDINGS = [
        // Длинные сначала
        'иями','иях','ией','иям','ием','иями',
        'ами','ями','ах','ях','ой','ей','ые','ие','ыми','ими',
        'ого','его','ому','ему','ая','яя','ое','ее','ый','ий',
        'ов','ев','ий','ьи','ам','ям','ом','ем',
        // Глагольные
        'ать','ять','еть','ить','ыть','уть','оть','ти','чь',
        'аю','яю','ею','ую','ию','аешь','яешь','еешь','уешь','иешь',
        'ает','яет','еет','ует','иет','аем','яем','еем','уем','ием',
        'аете','яете','еете','уете','иете','ают','яют','еют','уют','иют',
        'ал','ял','ел','ил','ыл','ул','ол',
        'ала','яла','ела','ила','ыла','ула','ола',
        'али','яли','ели','или','ыли','ули','оли',
        'ись','ться','тся','шься','мся','тесь','атся','ятся','ется','ится',
        // Короткие в конце
        'ы','и','а','я','у','ю','е','о','ь','й'
    ];

    // ============================================================
    // 🎨 СТИЛИЗАЦИЯ
    // ============================================================
    var TRANS_MAP = {
        'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e',
        'ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m',
        'н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u',
        'ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch',
        'ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
    };

    function translit(word) {
        var r = '';
        for (var i = 0; i < word.length; i++) {
            r += TRANS_MAP[word[i]] || word[i];
        }
        return r;
    }

    function stylize(word) {
        // Макроны (долгота)
        word = word.replace(/aa/g, 'ā').replace(/oo/g, 'ō').replace(/uu/g, 'ū')
                   .replace(/ee/g, 'ē').replace(/ii/g, 'ī');
        // Финальная гласная → долгая
        if (word.endsWith('a')) word = word.slice(0, -1) + 'ā';
        else if (word.endsWith('o')) word = word.slice(0, -1) + 'ō';
        else if (word.endsWith('u')) word = word.slice(0, -1) + 'ū';
        // Обрезаем если длинное
        if (word.length > 10) word = word.slice(0, 10);
        return word;
    }

    function transliterate(word) {
        var result = '';
        for (var i = 0; i < word.length; i++) {
            var ch = word[i].toLowerCase();
            result += ALPHABET[ch] || ch;
        }
        if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
        return result;
    }

    // ============================================================
    // 🧠 ГЕНЕРАЦИЯ КОРНЯ для неизвестного слова
    // ============================================================
    function generateRoot(word) {
        var stem = stripEndings(word);
        // 1. Ищем морфему
        var mars = findMorpheme(stem) || findMorpheme(word);
        if (mars) return mars;
        // 2. Транслитерация + стилизация
        return stylize(translit(stem));
    }

    function findMorpheme(word) {
        // Ищем самое длинное совпадение начала
        var best = null, bestLen = 0;
        for (var m in MORPHEMES) {
            if (word.indexOf(m) === 0 && m.length > bestLen) {
                best = MORPHEMES[m];
                bestLen = m.length;
            }
        }
        if (best) return best;
        // Ищем в середине (для сложных слов)
        for (var m2 in MORPHEMES) {
            if (m2.length >= 4 && word.indexOf(m2) !== -1) {
                return MORPHEMES[m2];
            }
        }
        return null;
    }

    function stripEndings(word) {
        for (var i = 0; i < ENDINGS.length; i++) {
            var e = ENDINGS[i];
            if (word.length > e.length + 2 && word.slice(-e.length) === e) {
                return word.slice(0, -e.length);
            }
        }
        return word;
    }

    // ============================================================
    // 📚 СЛОВАРЬ
    // ============================================================
    function getLexicon() { return window.MARTIAN_LEXICON || {}; }
    function getVerbLemmas() { return window.MARTIAN_VERB_LEMMAS || {}; }
    function getPrepositions() { return window.MARTIAN_PREPOSITIONS || []; }

    function normalize(word) {
        return word.toLowerCase().replace(/ё/g, 'е');
    }

    // ============================================================
    // 🔍 ПОИСК В СЛОВАРЕ (улучшенная морфология)
    // ============================================================
    function findInLexicon(word) {
        var lexicon = getLexicon();
        var verbLemmas = getVerbLemmas();
        var norm = normalize(word);

        // 1. Прямое совпадение
        if (lexicon[norm]) return { found: true, entry: lexicon[norm] };

        // 2. Леммы глаголов
        if (verbLemmas[norm] && lexicon[verbLemmas[norm]]) {
            return { found: true, entry: lexicon[verbLemmas[norm]] };
        }

        // 3. Систематический морфологический разбор
        for (var i = 0; i < ENDINGS.length; i++) {
            var e = ENDINGS[i];
            if (norm.length > e.length + 2 && norm.slice(-e.length) === e) {
                var stem = norm.slice(0, -e.length);
                // Пробуем разные варианты окончания
                var variants = [
                    stem, stem + 'а', stem + 'я', stem + 'о', stem + 'е',
                    stem + 'ь', stem + 'ий', stem + 'ия', stem + 'ие',
                    stem + 'ость', stem + 'ние', stem + 'ение', stem + 'ать',
                    stem + 'ять', stem + 'еть', stem + 'ить', stem + 'ыть',
                    stem + 'уть', stem + 'ти', stem + 'чь'
                ];
                for (var j = 0; j < variants.length; j++) {
                    if (lexicon[variants[j]]) {
                        return { found: true, entry: lexicon[variants[j]] };
                    }
                }
            }
        }

        return { found: false };
    }

    // ============================================================
    // 🔤 ПЕРЕВОД ОДНОГО СЛОВА
    // ============================================================
    function translateWord(word) {
        var result = findInLexicon(word);

        if (result.found) {
            var root = result.entry.root;
            if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
                return root.charAt(0).toUpperCase() + root.slice(1);
            }
            return root;
        }

        // Не нашли — генерируем
        var generated = generateRoot(normalize(word));
        if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
            return generated.charAt(0).toUpperCase() + generated.slice(1);
        }
        return generated;
    }

    function translateText(text) {
        if (!text) return text;
        var preps = getPrepositions();
        return text.replace(/[А-Яа-яЁё]+/g, function(word) {
            var norm = normalize(word);
            if (preps.indexOf(norm) !== -1) return '';
            return translateWord(word);
        }).replace(/\s+/g, ' ').trim();
    }

    // ============================================================
    // 📖 ПЕРЕВОД СТРАНИЦЫ
    // ============================================================
    function translatePage() {
        if (!getLexicon() || Object.keys(getLexicon()).length === 0) {
            console.warn('🪐 Словарь пуст');
            return;
        }
        var root = document.querySelector('.md-content__inner, .rst-content, article, .document') || document.body;
        walkAndTranslate(root);
        document.documentElement.setAttribute('data-martian', 'on');
    }

    function walkAndTranslate(node) {
        if (node.nodeType === 1) {
            var tag = node.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' ||
                tag === 'PRE' || tag === 'INPUT' || tag === 'TEXTAREA') return;
            if (node.classList && (
                node.classList.contains('lang-switcher-block') ||
                node.classList.contains('martian-toggle') ||
                node.id === 'martian-intro'
            )) return;
        }

        if (node.nodeType === 3) {
            var original = node.nodeValue;
            if (!original || !original.trim()) return;
            if (!originals.has(node)) originals.set(node, original);
            var source = originals.get(node);
            node.nodeValue = isMartian ? translateText(source) : source;
            return;
        }

        for (var i = 0; i < node.childNodes.length; i++) {
            walkAndTranslate(node.childNodes[i]);
        }
    }

    function restorePage() {
        var root = document.querySelector('.md-content__inner, .rst-content, article, .document') || document.body;
        walkAndTranslate(root);
        document.documentElement.removeAttribute('data-martian');
    }

    // ============================================================
    // 🎬 ИНТРО
    // ============================================================
    function showIntro() {
        if (localStorage.getItem(INTRO_KEY) === 'true') return;
        var overlay = document.createElement('div');
        overlay.id = 'martian-intro';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a14 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:24px;text-align:center;color:#fff;font-family:Georgia,serif;';
        overlay.innerHTML =
            '<div style="font-size:4rem;margin-bottom:20px;">🪐</div>' +
            '<div style="font-size:0.85rem;letter-spacing:6px;color:#A29BFE;margin-bottom:16px;">KŌL MARZĀN</div>' +
            '<div style="font-size:2rem;font-weight:900;letter-spacing:4px;color:#fff;text-shadow:0 0 20px #6C63FF;margin-bottom:8px;">LĀN SUR</div>' +
            '<div style="font-size:1.1rem;color:#A29BFE;font-style:italic;margin-bottom:24px;">— глина помнит —</div>' +
            '<div style="font-size:0.95rem;color:#b0b0c8;max-width:480px;line-height:1.7;margin-bottom:32px;">Ты входишь в мир Марса. Текст статей теперь на древнем языке.</div>' +
            '<button id="martian-intro-ok" style="padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:30px;font-size:1rem;font-weight:800;cursor:pointer;font-family:inherit;letter-spacing:1px;box-shadow:0 12px 32px rgba(108,99,255,0.5);">Войти в мир →</button>';
        document.body.appendChild(overlay);
        document.getElementById('martian-intro-ok').onclick = function() {
            localStorage.setItem(INTRO_KEY, 'true');
            overlay.remove();
        };
    }

    // ============================================================
    // 🎚️ ПЕРЕКЛЮЧЕНИЕ
    // ============================================================
    function setLanguage(lang) {
        isMartian = (lang === 'mr');
        localStorage.setItem(MARTIAN_KEY, lang);
        if (isMartian) {
            showIntro();
            translatePage();
            updateButton('🪐');
        } else {
            restorePage();
            updateButton('📖');
        }
    }

    function toggleLanguage() {
        setLanguage(isMartian ? 'ru' : 'mr');
    }

    // ============================================================
    // 🔘 КНОПКА
    // ============================================================
    function createToggleButton() {
        if (document.getElementById('martian-toggle')) return;
        var btn = document.createElement('button');
        btn.id = 'martian-toggle';
        btn.innerHTML = isMartian ? '🪐' : '📖';

        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var size = isMobile ? 56 : 52;
        var bottom = isMobile ? 'calc(148px + env(safe-area-inset-bottom,0px))' : '148px';
        var right = isMobile ? 'calc(16px + env(safe-area-inset-right,0px))' : '20px';

        btn.style.cssText = 'position:fixed;bottom:' + bottom + ';right:' + right +
            ';width:' + size + 'px;height:' + size + 'px;border-radius:50%;' +
            'background:linear-gradient(135deg,#4a1010,#7f1d1d);border:2px solid #e74c3c;' +
            'color:#fff;font-size:' + (isMobile ? '1.6' : '1.5') + 'rem;cursor:pointer;' +
            'z-index:99999;box-shadow:0 8px 24px rgba(231,76,60,0.5);' +
            'display:flex;align-items:center;justify-content:center;padding:0;' +
            'touch-action:manipulation;-webkit-tap-highlight-color:transparent;';

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            try { if (navigator.vibrate) navigator.vibrate(20); } catch(err) {}
            toggleLanguage();
        });
        document.body.appendChild(btn);
    }

    function updateButton(symbol) {
        var btn = document.getElementById('martian-toggle');
        if (btn) btn.innerHTML = symbol;
    }

    function init() {
        createToggleButton();
        if (isMartian) {
            setTimeout(function() {
                translatePage();
                updateButton('🪐');
            }, 400);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.martianMode = {
        on: function() { setLanguage('mr'); },
        off: function() { setLanguage('ru'); },
        toggle: toggleLanguage
    };
})();
