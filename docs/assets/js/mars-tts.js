// ============================================================
// mars-tts.js — v2 VIP
// Озвучка марсианских слов через Web Speech API
// - Экспорт window.marsTTS (для sound-engine) + window.marsSpeak (совместимость)
// - Иконка 🔊 через CSS ::after (не копится)
// - MutationObserver с debounce + auto-disconnect
// - Правый клик — только по API (не перехватываем глобально)
// - Правильный порядок replace (долгие диграфы первыми)
// - Очередь + cancel при скрытии вкладки
// - ES5, DEBUG, API
// ============================================================
(function() {
    'use strict';

    if (window.__marsTtsLoaded) return;
    window.__marsTtsLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var DEBUG = false;
    var STYLE_ID = 'mars-tts-style';
    var OBSERVER_TIMEOUT = 30000;
    var DEBOUNCE_MS = 300;
    var MARTIAN_REGEX = /[āōūēī]/;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🔊 tts:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 🚫 Проверка поддержки
    // ============================================================
    if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance !== 'function') {
        log('Web Speech API не поддерживается');
        // Заглушка API
        window.marsTTS = {
            speak: function() {},
            stop: function() {},
            isSupported: function() { return false; }
        };
        window.marsSpeak = function() {};
        return;
    }

    // ============================================================
    // 🔤 Транслитерация — ДЛИННЫЕ ДИГРАФЫ ПЕРВЫМИ
    // Порядок критичен: kh → х, ПОТОМ k → к, иначе получим «кх»
    // ============================================================
    var TRANSLIT_RULES = [
        // 3-символьные
        ['shch', 'щ'],
        // Диакритика — макроны
        ['ā', 'аа'], ['ō', 'оо'], ['ū', 'уу'], ['ē', 'ее'], ['ī', 'ии'],
        // Диграфы
        ['kh', 'х'], ['gh', 'г'], ['dz', 'дз'], ['ts', 'ц'],
        ['th', 'т'], ['sh', 'ш'], ['ch', 'ч'], ['zh', 'ж'],
        // Односимвольные
        ['r','р'], ['l','л'], ['m','м'], ['n','н'],
        ['p','п'], ['b','б'], ['v','в'], ['f','ф'],
        ['s','с'], ['z','з'], ['d','д'], ['t','т'],
        ['g','г'], ['k','к'], ['h','х'],
        ['a','а'], ['o','о'], ['u','у'], ['e','е'], ['i','и'], ['y','й'],
        ['x','кс'], ['c','к'], ['j','й'], ['q','к'], ['w','в']
    ];

    function toSpeechText(text) {
        if (!text) return '';
        var s = String(text).toLowerCase();
        for (var i = 0; i < TRANSLIT_RULES.length; i++) {
            var pair = TRANSLIT_RULES[i];
            // Пропускаем если в тексте нет источника
            if (s.indexOf(pair[0]) === -1) continue;
            s = s.split(pair[0]).join(pair[1]);
        }
        // Восстанавливаем первую букву в верхний регистр (для интонации)
        if (text.charAt(0) && text.charAt(0) === text.charAt(0).toUpperCase()) {
            s = s.charAt(0).toUpperCase() + s.slice(1);
        }
        return s;
    }

    // ============================================================
    // 🎙️ Голоса
    // ============================================================
    var voices = [];
    var ruVoice = null;

    function loadVoices() {
        try {
            voices = speechSynthesis.getVoices() || [];
            ruVoice = null;
            for (var i = 0; i < voices.length; i++) {
                var v = voices[i];
                if (v && v.lang && v.lang.toLowerCase().indexOf('ru') === 0) {
                    ruVoice = v;
                    break;
                }
            }
            log('голосов:', voices.length, '| ru:', ruVoice ? ruVoice.name : 'нет');
        } catch(e) {}
    }

    // Первая попытка + подписка на событие
    loadVoices();
    if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
        speechSynthesis.addEventListener('voiceschanged', loadVoices);
    }

    // ============================================================
    // 🔊 Произношение с очередью
    // ============================================================
    var isSpeaking = false;
    var currentText = '';

    function speak(text, opts) {
        opts = opts || {};
        if (!text) return;

        // Отменяем предыдущее, если не queue
        if (!opts.queue) {
            try { speechSynthesis.cancel(); } catch(e) {}
        }

        var cleanText = toSpeechText(text);
        if (!cleanText) return;

        var utter;
        try {
            utter = new SpeechSynthesisUtterance(cleanText);
        } catch(e) {
            log('Utterance error:', e.message);
            return;
        }

        if (ruVoice) utter.voice = ruVoice;
        utter.lang = 'ru-RU';
        utter.rate = opts.rate || 0.85;
        utter.pitch = opts.pitch || 0.9;
        utter.volume = (opts.volume !== undefined) ? opts.volume : 1;

        utter.onstart = function() {
            isSpeaking = true;
            currentText = text;
            log('произношу:', cleanText);
        };
        utter.onend = function() {
            isSpeaking = false;
            currentText = '';
        };
        utter.onerror = function(e) {
            isSpeaking = false;
            currentText = '';
            log('utter error:', e && e.error);
        };

        try {
            speechSynthesis.speak(utter);
        } catch(e) {
            log('speak error:', e.message);
        }
    }

    function stop() {
        try { speechSynthesis.cancel(); } catch(e) {}
        isSpeaking = false;
        currentText = '';
    }

    function isSpeakingNow() {
        try {
            return speechSynthesis.speaking || isSpeaking;
        } catch(e) { return isSpeaking; }
    }

    // ============================================================
    // 🎨 Стили иконки через CSS (не копится в DOM)
    // ============================================================
    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var s = document.createElement('style');
        s.id = STYLE_ID;
        s.textContent = `
            [data-tts-attached] {
                cursor: pointer;
                position: relative;
            }
            [data-tts-attached]::after {
                content: '🔊';
                font-size: 0.75em;
                opacity: 0.45;
                margin-left: 4px;
                transition: opacity .2s;
                pointer-events: none;
                display: inline-block;
            }
            [data-tts-attached]:hover::after {
                opacity: 0.9;
            }
            [data-tts-attached].tts-speaking::after {
                opacity: 1;
                animation: ttsPulse .8s ease-in-out infinite;
            }
            @keyframes ttsPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.25); }
            }

            /* Элементы с озвучкой — плавная подсветка при наведении */
            [data-tts-attached]:hover {
                background: rgba(108, 99, 255, 0.08);
                border-radius: 3px;
            }

            @media (prefers-reduced-motion: reduce) {
                [data-tts-attached]::after,
                [data-tts-attached].tts-speaking::after {
                    animation: none !important;
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🎯 Привязка к марсианским словам
    // ============================================================
    // Селекторы — ТОЛЬКО явные маркеры, без `code`/`em` (слишком широко)
    var ATTACH_SELECTORS = [
        '.martian-word',
        '[data-martian]',
        '.mars-term',
        '.lan-sur',
        '[lang="mr"]',
        '[data-lang="mr"]'
    ].join(',');

    function attachSpeakers(root) {
        if (!root || !root.querySelectorAll) return;
        var elements = root.querySelectorAll(ATTACH_SELECTORS);

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.dataset.ttsAttached) continue;
            if (el.dataset.ttsDisabled === '1') continue;

            // Проверяем что внутри реально марсианский текст
            var text = (el.textContent || '').trim();
            if (!text || !MARTIAN_REGEX.test(text)) continue;

            el.dataset.ttsAttached = '1';
            el.setAttribute('role', 'button');
            el.setAttribute('tabindex', '0');
            el.setAttribute('title', 'Нажми, чтобы услышать');

            // Клик — через делегирование, но для конкретного элемента проще так
            el.addEventListener('click', onWordClick);
            el.addEventListener('keydown', onWordKeydown);
        }
    }

    function onWordClick(e) {
        var el = e.currentTarget;
        if (!el) return;
        // Не срабатываем если клик по ссылке внутри
        if (e.target.tagName === 'A') return;
        e.preventDefault();
        e.stopPropagation();
        speakWord(el);
    }

    function onWordKeydown(e) {
        if (e.key !== ' ' && e.key !== 'Enter') return;
        e.preventDefault();
        speakWord(e.currentTarget);
    }

    function speakWord(el) {
        if (!el) return;
        var text = (el.textContent || '').trim();
        if (!text) return;

        // Убираем эмодзи из текста если вдруг попали
        text = text.replace(/🔊/g, '').trim();

        speak(text);

        el.classList.add('tts-speaking');
        setTimeout(function() {
            el.classList.remove('tts-speaking');
        }, 2000);
    }

    // ============================================================
    // 🖱️ Правый клик — ОПЦИОНАЛЬНО (по умолчанию выключено)
    // ============================================================
    var rightClickEnabled = false;

    function onContextMenu(e) {
        if (!rightClickEnabled) return;
        var sel = '';
        try { sel = (window.getSelection() || {}).toString().trim(); } catch(err) {}
        if (!sel) return;
        e.preventDefault();
        speak(sel);
    }

    function enableRightClick() {
        if (rightClickEnabled) return;
        rightClickEnabled = true;
        document.addEventListener('contextmenu', onContextMenu);
    }

    function disableRightClick() {
        if (!rightClickEnabled) return;
        rightClickEnabled = false;
        document.removeEventListener('contextmenu', onContextMenu);
    }

    // ============================================================
    // 🔄 MutationObserver с debounce + auto-disconnect
    // ============================================================
    var mo = null;
    var moTimer = null;

    function startObserver() {
        if (typeof MutationObserver === 'undefined') return;
        if (mo) return;

        mo = new MutationObserver(function(mutations) {
            if (moTimer) return;
            moTimer = setTimeout(function() {
                moTimer = null;
                // Проверяем — есть ли вообще новые марсианские слова
                var hasNew = false;
                for (var i = 0; i < mutations.length && !hasNew; i++) {
                    var m = mutations[i];
                    if (!m.addedNodes || !m.addedNodes.length) continue;
                    for (var j = 0; j < m.addedNodes.length; j++) {
                        var n = m.addedNodes[j];
                        if (n.nodeType !== 1) continue;
                        if (n.matches && n.matches(ATTACH_SELECTORS) && !n.dataset.ttsAttached) {
                            hasNew = true;
                            break;
                        }
                        if (n.querySelector && n.querySelector(ATTACH_SELECTORS)) {
                            hasNew = true;
                            break;
                        }
                    }
                }
                if (hasNew) attachSpeakers(document.body);
            }, DEBOUNCE_MS);
        });

        try {
            mo.observe(document.body, { childList: true, subtree: true });
            setTimeout(function() {
                if (mo) { try { mo.disconnect(); } catch(e) {} mo = null; }
                log('observer отключён');
            }, OBSERVER_TIMEOUT);
        } catch(e) {}
    }

    // ============================================================
    // 👁️ Отмена при скрытии вкладки
    // ============================================================
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) stop();
    });

    // Отмена при уходе со страницы
    window.addEventListener('pagehide', stop);
    window.addEventListener('beforeunload', stop);

    // ============================================================
    // 🚀 Init
    // ============================================================
    function init() {
        injectStyles();
        attachSpeakers(document.body);

        if (document.body) {
            startObserver();
        } else {
            document.addEventListener('DOMContentLoaded', startObserver);
        }

        log('v2 VIP активен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🔄 SPA-переходы
    // ============================================================
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                stop();
                setTimeout(function() {
                    attachSpeakers(document.body);
                }, 300);
            });
        } catch(e) {}
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    // window.marsTTS — основной (sound-engine.js ищет именно его)
    window.marsTTS = {
        speak: speak,
        stop: stop,
        isSpeaking: isSpeakingNow,
        isSupported: function() { return true; },
        toSpeechText: toSpeechText,
        attach: function(root) { attachSpeakers(root || document.body); },
        detach: function() {
            document.querySelectorAll('[data-tts-attached]').forEach(function(el) {
                el.removeEventListener('click', onWordClick);
                el.removeEventListener('keydown', onWordKeydown);
                el.removeAttribute('data-tts-attached');
                el.removeAttribute('role');
                el.removeAttribute('tabindex');
                el.removeAttribute('title');
            });
        },
        enableRightClick: enableRightClick,
        disableRightClick: disableRightClick
    };

    // window.marsSpeak — алиас для обратной совместимости
    window.marsSpeak = speak;

    log('v2 VIP загружен');
})();
