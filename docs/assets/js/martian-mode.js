// ============================================================
// martian-mode.js — v2 VIP
// Марсианский язык с авто-генерацией слов
// - Правильный position кнопки (над effects-menu, ниже QR)
// - Safe storage + retry при отсутствии словаря
// - MutationObserver → переводит динамический контент
// - VIP-интро с анимациями
// - Idle-обработка больших страниц
// - Публичное API: window.martianMode.*
// ============================================================
(function() {
    'use strict';

    if (window.__martianModeLoaded) return;
    window.__martianModeLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var MARTIAN_KEY = 'mars_lang_mode';
    var INTRO_KEY = 'mars_intro_martian_shown';
    var BTN_ID = 'martian-toggle';
    var INTRO_ID = 'martian-intro';
    var MAX_TRANSLATE_MS = 15000; // таймаут перевода больших страниц

    // ============================================================
    // 📦 Safe storage
    // ============================================================
    function safeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function safeSet(k, v) { try { localStorage.setItem(k, v); return true; } catch(e) { return false; } }
    function safeRemove(k) { try { localStorage.removeItem(k); } catch(e) {} }

    var isMartian = safeGet(MARTIAN_KEY) === 'mr';

    // ============================================================
    // 🧠 Кэш оригинальных текстов
    // ============================================================
    var originals = new WeakMap();

    // ============================================================
    // 🔤 Алфавит для транслитерации
    // ============================================================
    var ALPHABET = {
        'а':'ā','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e',
        'ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m',
        'н':'n','о':'ō','п':'p','р':'r','с':'s','т':'t','у':'ū',
        'ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch',
        'ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
    };

    var TRANS_MAP = {
        'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e',
        'ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m',
        'н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u',
        'ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch',
        'ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
    };

    // ============================================================
    // 🧬 Морфемы
    // ============================================================
    var MORPHEMES = {
        // Природа
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
        'хран':'lānīn','защит':'lānīn',
        'глин':'sur','пыл':'sur','пес':'sur',
        'движ':'nur','путь':'nur','дорог':'nur','ход':'nur',
        'смотр':'thal','гляд':'thal','вид':'thal','наблюд':'thal',
        'говор':'thal','реч':'thal','язык':'thal',
        'велик':'suf','огромн':'suf','больш':'suf',
        'древ':'xal','стар':'xal','предк':'xal',
        'нов':'khal','молод':'khal','умн':'yar',
        'избран':'ari','главн':'ari','хорош':'suf','добр':'suf','красив':'suf','светл':'suf',
        'живой':'mar','жив':'mar','мёртв':'mōr','мертв':'mōr',
        'ветер':'zal','ветр':'zal','океан':'ākhasuf','мор':'thal',
        'берег':'kōlākha','побереж':'kōlākha','волн':'ākha',
        'облак':'oblako','туч':'oblako','туман':'tuman',
        'снег':'sneg','льд':'led','лед':'led','гром':'grom','молни':'khōdzen',
        'пламя':'khō','пламен':'khō','холод':'mōr','мороз':'mōr','жар':'khō','зной':'khō','тепл':'khō',
        // Абстракции
        'правд':'thaltsan','истин':'thaltsan','лож':'ānthaltsan',
        'надежд':'lānthōl','вер':'khalmar','свобод':'nurariya','справедлив':'aritsan',
        'сил':'khōlān','мощ':'khōlān','смысл':'thaltsan','чуд':'ānthal',
        'тайн':'nōkhlān','секрет':'nōkhlān','войн':'mōrkhō','мир':'nōkh','покой':'nōkh',
        // Время
        'год':'amār','лет':'amār','цикл':'amār','дн':'sōl','день':'sōl',
        'ноч':'nōkh','утр':'dzēn','вечер':'khōl','врем':'amār','эпох':'amār',
        // Люди
        'друг':'tō','брат':'tō','союз':'tō','враг':'ān',
        'воин':'ur','солдат':'ur','бойц':'ur','пират':'khōsīn','разбой':'khōsīn',
        'купец':'xur','торгов':'xur','жрец':'en','пророк':'hery',
        'учен':'tsanīn','учит':'tsanīn','настав':'tsanīn','король':'rōg','императ':'rōg',
        // Действия
        'стро':'okhar','созда':'khalur','дела':'khalur','разруш':'mōrkhō','уничтож':'mōrkhō',
        'писа':'khōs','пиш':'khōs','запис':'khōs','чита':'thal','игра':'thalur',
        'петь':'zalkhō','танц':'thalur','люб':'lānmar','бо':'ghōlmar',
        'дума':'tsanur','поним':'tsanlān','слуша':'thal','откры':'tōkhur','закры':'tōkhur'
    };

    // ============================================================
    // 🔚 Окончания
    // ============================================================
    var ENDINGS = [
        'иями','иях','ией','иям','ием','ами','ями','ах','ях','ой','ей','ые','ие','ыми','ими',
        'ого','его','ому','ему','ая','яя','ое','ее','ый','ий','ов','ев','ьи','ам','ям','ом','ем',
        'ать','ять','еть','ить','ыть','уть','оть','ти','чь',
        'аю','яю','ею','ую','ию','аешь','яешь','еешь','уешь','иешь',
        'ает','яет','еет','ует','иет','аем','яем','еем','уем','ием',
        'аете','яете','еете','уете','иете','ают','яют','еют','уют','иют',
        'ал','ял','ел','ил','ыл','ул','ол','ала','яла','ела','ила','ыла','ула','ола',
        'али','яли','ели','или','ыли','ули','оли','ись','ться','тся','шься','мся','тесь','атся','ятся','ется','ится',
        'ы','и','а','я','у','ю','е','о','ь','й'
    ];

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function translit(word) {
        var r = '';
        for (var i = 0; i < word.length; i++) r += TRANS_MAP[word[i]] || word[i];
        return r;
    }

    function stylize(word) {
        word = word.replace(/aa/g, 'ā').replace(/oo/g, 'ō').replace(/uu/g, 'ū')
                   .replace(/ee/g, 'ē').replace(/ii/g, 'ī');
        if (word.endsWith('a')) word = word.slice(0, -1) + 'ā';
        else if (word.endsWith('o')) word = word.slice(0, -1) + 'ō';
        else if (word.endsWith('u')) word = word.slice(0, -1) + 'ū';
        if (word.length > 10) word = word.slice(0, 10);
        return word;
    }

    function transliterate(word) {
        var result = '';
        for (var i = 0; i < word.length; i++) {
            var ch = word[i].toLowerCase();
            result += ALPHABET[ch] || ch;
        }
        if (word.length && word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
        return result;
    }

    function normalize(word) {
        return word.toLowerCase().replace(/ё/g, 'е');
    }

    function getLexicon() { return window.MARTIAN_LEXICON || {}; }
    function getVerbLemmas() { return window.MARTIAN_VERB_LEMMAS || {}; }
    function getPrepositions() { return window.MARTIAN_PREPOSITIONS || []; }

    function isLexiconReady() {
        var lex = getLexicon();
        return lex && typeof lex === 'object' && Object.keys(lex).length > 0;
    }

    // ============================================================
    // 🧠 Генерация корня
    // ============================================================
    function generateRoot(word) {
        var stem = stripEndings(word);
        var mars = findMorpheme(stem) || findMorpheme(word);
        if (mars) return mars;
        return stylize(translit(stem));
    }

    function findMorpheme(word) {
        var best = null, bestLen = 0;
        for (var m in MORPHEMES) {
            if (word.indexOf(m) === 0 && m.length > bestLen) {
                best = MORPHEMES[m];
                bestLen = m.length;
            }
        }
        if (best) return best;
        for (var m2 in MORPHEMES) {
            if (m2.length >= 4 && word.indexOf(m2) !== -1) return MORPHEMES[m2];
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
    // 🔍 Поиск в словаре
    // ============================================================
    function findInLexicon(word) {
        var lexicon = getLexicon();
        var verbLemmas = getVerbLemmas();
        var norm = normalize(word);

        if (lexicon[norm]) return { found: true, entry: lexicon[norm] };
        if (verbLemmas[norm] && lexicon[verbLemmas[norm]]) {
            return { found: true, entry: lexicon[verbLemmas[norm]] };
        }

        for (var i = 0; i < ENDINGS.length; i++) {
            var e = ENDINGS[i];
            if (norm.length > e.length + 2 && norm.slice(-e.length) === e) {
                var stem = norm.slice(0, -e.length);
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
    // 🔤 Перевод
    // ============================================================
    function translateWord(word) {
        var result = findInLexicon(word);
        var root;

        if (result.found) root = result.entry.root;
        else root = generateRoot(normalize(word));

        if (word.length && word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
            return root.charAt(0).toUpperCase() + root.slice(1);
        }
        return root;
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
    // 📖 Обход DOM и перевод
    // ============================================================
    function isSkippableNode(node) {
        if (node.nodeType !== 1) return false;
        var tag = node.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' ||
            tag === 'PRE' || tag === 'INPUT' || tag === 'TEXTAREA' ||
            tag === 'BUTTON') return true;
        if (node.id === BTN_ID || node.id === INTRO_ID) return true;
        if (node.classList) {
            if (node.classList.contains('lang-switcher-block') ||
                node.classList.contains('martian-toggle') ||
                node.classList.contains('pf-tab') ||
                node.classList.contains('pf-btn') ||
                node.classList.contains('pf-modal') ||
                node.classList.contains('pf-toast') ||
                node.classList.contains('effects-menu-btn')) return true;
        }
        return false;
    }

    function walkAndTranslate(root) {
        if (!root) return;
        var stack = [root];
        var startTime = Date.now();

        while (stack.length) {
            if (Date.now() - startTime > MAX_TRANSLATE_MS) {
                console.warn('🪐 martian-mode: таймаут перевода');
                break;
            }
            var node = stack.pop();
            if (!node) continue;

            if (isSkippableNode(node)) continue;

            if (node.nodeType === 3) {
                var original = node.nodeValue;
                if (!original || !original.trim()) continue;
                if (!originals.has(node)) originals.set(node, original);
                var source = originals.get(node);
                node.nodeValue = isMartian ? translateText(source) : source;
                continue;
            }

            if (node.childNodes && node.childNodes.length) {
                for (var i = node.childNodes.length - 1; i >= 0; i--) {
                    stack.push(node.childNodes[i]);
                }
            }
        }
    }

    function getContentRoot() {
        return document.querySelector('.md-content__inner') ||
               document.querySelector('.rst-content') ||
               document.querySelector('article') ||
               document.querySelector('.document') ||
               document.body;
    }

    function translatePage() {
        if (!isLexiconReady()) return false;
        walkAndTranslate(getContentRoot());
        document.documentElement.setAttribute('data-martian', 'on');
        return true;
    }

    function restorePage() {
        walkAndTranslate(getContentRoot());
        document.documentElement.removeAttribute('data-martian');
    }

    // ============================================================
    // 🎬 VIP-интро
    // ============================================================
    function injectIntroStyles() {
        if (document.getElementById('martian-intro-style')) return;
        var s = document.createElement('style');
        s.id = 'martian-intro-style';
        s.textContent = `
            @keyframes miFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes miZoomIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
            @keyframes miFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            @keyframes miShine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
            @keyframes miPulse { 0%, 100% { transform: scale(1); opacity: .9; } 50% { transform: scale(1.06); opacity: 1; } }
            @keyframes miGlow { 0%, 100% { text-shadow: 0 0 20px #6C63FF, 0 0 40px #A29BFE; } 50% { text-shadow: 0 0 40px #A29BFE, 0 0 80px #6C63FF; } }

            #${INTRO_ID} {
                position: fixed;
                inset: 0;
                z-index: 9999999;
                background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a14 60%, #000 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 24px;
                text-align: center;
                color: #fff;
                font-family: 'Georgia', serif;
                animation: miFadeIn .5s ease;
                transition: opacity .5s;
                overflow: hidden;
            }
            #${INTRO_ID}.closing {
                opacity: 0;
                pointer-events: none;
            }
            #${INTRO_ID}::before {
                content: '';
                position: absolute;
                inset: 0;
                background:
                    radial-gradient(2px 2px at 20% 30%, #fff, transparent),
                    radial-gradient(1px 1px at 40% 70%, #fff, transparent),
                    radial-gradient(1.5px 1.5px at 60% 20%, #fff, transparent),
                    radial-gradient(1px 1px at 80% 60%, #fff, transparent),
                    radial-gradient(2px 2px at 90% 40%, #fff, transparent);
                opacity: .5;
                animation: miFloat 8s ease-in-out infinite;
            }
            .mi-planet {
                font-size: 5rem;
                margin-bottom: 20px;
                display: inline-block;
                filter: drop-shadow(0 0 30px #6C63FF) drop-shadow(0 0 60px #A29BFE);
                animation: miFloat 3.5s ease-in-out infinite, miPulse 3s ease-in-out infinite;
            }
            .mi-lang {
                font-size: .85rem;
                letter-spacing: 6px;
                color: #A29BFE;
                margin-bottom: 16px;
                animation: miZoomIn .6s ease .2s both;
            }
            .mi-title {
                font-size: 2.4rem;
                font-weight: 900;
                letter-spacing: 6px;
                color: #fff;
                margin-bottom: 10px;
                animation: miZoomIn .8s ease .4s both, miGlow 3s ease-in-out infinite;
                background: linear-gradient(90deg, #fff, #A29BFE, #fff);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .mi-sub {
                font-size: 1.1rem;
                color: #A29BFE;
                font-style: italic;
                margin-bottom: 26px;
                animation: miZoomIn .8s ease .6s both;
            }
            .mi-desc {
                font-size: .95rem;
                color: #b0b0c8;
                max-width: 480px;
                line-height: 1.7;
                margin-bottom: 32px;
                animation: miZoomIn .8s ease .8s both;
            }
            .mi-btn {
                padding: 14px 34px;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff;
                border: none;
                border-radius: 30px;
                font-size: 1rem;
                font-weight: 800;
                cursor: pointer;
                font-family: inherit;
                letter-spacing: 1px;
                box-shadow: 0 12px 32px rgba(108, 99, 255, .5);
                transition: all .3s;
                animation: miZoomIn .6s ease 1s both;
                -webkit-tap-highlight-color: transparent;
            }
            .mi-btn:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(108, 99, 255, .7); }
            .mi-btn:active { transform: translateY(0) scale(.98); }

            @media (max-width: 600px) {
                .mi-planet { font-size: 4rem; }
                .mi-title { font-size: 1.7rem; letter-spacing: 4px; }
                .mi-sub { font-size: .95rem; }
                .mi-desc { font-size: .88rem; }
                .mi-btn { padding: 12px 26px; font-size: .92rem; }
            }

            @media (prefers-reduced-motion: reduce) {
                #${INTRO_ID} * { animation: none !important; }
            }
        `;
        document.head.appendChild(s);
    }

    function showIntro() {
        if (safeGet(INTRO_KEY) === 'true') return;
        if (document.getElementById(INTRO_ID)) return;
        injectIntroStyles();

        var overlay = document.createElement('div');
        overlay.id = INTRO_ID;
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', 'Марсианский режим включён');
        overlay.innerHTML =
            '<div class="mi-planet">🪐</div>' +
            '<div class="mi-lang">KŌL MARZĀN</div>' +
            '<div class="mi-title">LĀN SUR</div>' +
            '<div class="mi-sub">— глина помнит —</div>' +
            '<div class="mi-desc">Ты входишь в мир Марса. Все статьи теперь на древнем языке.</div>' +
            '<button class="mi-btn" id="mi-ok" type="button">Войти в мир →</button>';

        document.body.appendChild(overlay);
        var prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        function close() {
            overlay.classList.add('closing');
            document.body.style.overflow = prevOverflow || '';
            safeSet(INTRO_KEY, 'true');
            setTimeout(function() { overlay.remove(); }, 500);
            document.removeEventListener('keydown', escHandler);
        }

        function escHandler(e) {
            if (e.key === 'Escape') close();
        }
        document.addEventListener('keydown', escHandler);

        overlay.querySelector('#mi-ok').onclick = close;
        overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    }

    // ============================================================
    // 🔘 Кнопка-переключатель
    // ============================================================
    function positionButton(btn) {
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                       navigator.maxTouchPoints > 1 && window.innerWidth < 1024;
        var size = isMobile ? 52 : 48;

        // 📱 Мобильный — слева от кнопки effects (которая внизу справа)
        // effects-menu: bottom: 90px + safe-area, right: 20px
        // qr-scanner: если есть, ниже
        // Ставим martian-toggle: bottom: 90px, right: 84px (слева от effects)
        if (isMobile) {
            btn.style.cssText = 'position:fixed;bottom:calc(90px + env(safe-area-inset-bottom,0px));right:calc(84px + env(safe-area-inset-right,0px));' +
                'width:' + size + 'px;height:' + size + 'px;border-radius:50%;' +
                'background:linear-gradient(135deg,#4a1010,#7f1d1d);border:2px solid #e74c3c;' +
                'color:#fff;font-size:1.4rem;cursor:pointer;' +
                'z-index:9999992;box-shadow:0 8px 24px rgba(231,76,60,0.5);' +
                'display:flex;align-items:center;justify-content:center;padding:0;' +
                'touch-action:manipulation;-webkit-tap-highlight-color:transparent;' +
                'transition:transform .25s, box-shadow .25s;';
        } else {
            // 🖥 ПК — тоже слева от effects (effects под профилем)
            btn.style.cssText = 'position:fixed;bottom:calc(90px + env(safe-area-inset-bottom,0px));right:calc(84px + env(safe-area-inset-right,0px));' +
                'width:' + size + 'px;height:' + size + 'px;border-radius:50%;' +
                'background:linear-gradient(135deg,#4a1010,#7f1d1d);border:2px solid #e74c3c;' +
                'color:#fff;font-size:1.3rem;cursor:pointer;' +
                'z-index:9999992;box-shadow:0 8px 24px rgba(231,76,60,0.5);' +
                'display:flex;align-items:center;justify-content:center;padding:0;' +
                'transition:transform .25s, box-shadow .25s;';
        }

        btn.onmouseenter = function() {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
            btn.style.boxShadow = '0 14px 32px rgba(231,76,60,0.65)';
        };
        btn.onmouseleave = function() {
            btn.style.transform = '';
            btn.style.boxShadow = '0 8px 24px rgba(231,76,60,0.5)';
        };
    }

    function createToggleButton() {
        if (document.getElementById(BTN_ID)) return;
        var btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Переключить язык');
        btn.setAttribute('title', isMartian ? 'Вернуть русский' : 'Перевести на марсианский');
        btn.innerHTML = isMartian ? '🪐' : '📖';
        positionButton(btn);

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            try { if (navigator.vibrate) navigator.vibrate(20); } catch(err) {}
            toggleLanguage();
        });

        document.body.appendChild(btn);
    }

    function updateButton(symbol) {
        var btn = document.getElementById(BTN_ID);
        if (btn) {
            btn.innerHTML = symbol;
            btn.setAttribute('title', isMartian ? 'Вернуть русский' : 'Перевести на марсианский');
        }
    }

    // ============================================================
    // 🎚️ Переключение языка
    // ============================================================
    function setLanguage(lang) {
        isMartian = (lang === 'mr');
        safeSet(MARTIAN_KEY, lang);
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
    // 👀 MutationObserver — переводим динамический контент
    // ============================================================
    var _observer = null;
    var _obsTimer = null;

    function startObserver() {
        if (!isMartian) return;
        if (_observer) return;

        _observer = new MutationObserver(function() {
            clearTimeout(_obsTimer);
            _obsTimer = setTimeout(function() {
                if (!isMartian) return;
                walkAndTranslate(getContentRoot());
            }, 300);
        });

        try {
            _observer.observe(document.body, { childList: true, subtree: true });
        } catch(e) {}
    }

    function stopObserver() {
        if (_observer) {
            try { _observer.disconnect(); } catch(e) {}
            _observer = null;
        }
    }

    // ============================================================
    // 🚀 Инициализация
    // ============================================================
    function init() {
        createToggleButton();

        if (isMartian) {
            // Ждём словарь (до 10 секунд)
            var tries = 0;
            var iv = setInterval(function() {
                tries++;
                if (isLexiconReady()) {
                    clearInterval(iv);
                    translatePage();
                    startObserver();
                } else if (tries > 40) {
                    clearInterval(iv);
                    console.warn('🪐 martian-mode: словарь не загрузился');
                }
            }, 250);
        }
    }

    // При переключении — старт/стоп observer
    var _origSetLang = setLanguage;
    setLanguage = function(lang) {
        _origSetLang(lang);
        if (lang === 'mr') startObserver();
        else stopObserver();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.martianMode = {
        on: function() { setLanguage('mr'); },
        off: function() { setLanguage('ru'); },
        toggle: toggleLanguage,
        isOn: function() { return isMartian; },
        resetIntro: function() { safeRemove(INTRO_KEY); },
        retranslate: function() { if (isMartian) walkAndTranslate(getContentRoot()); }
    };

    // Старая глобальная функция для совместимости
    window.martianToggle = toggleLanguage;

    console.log('✅ martian-mode.js v2 VIP загружен');
})();
