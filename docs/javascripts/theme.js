// ============================================================
// theme.js — v2 VIP
// Переключение светлой/тёмной темы
// - Синхронизация с mars-stars-on (звёзды в тёмной теме)
// - Учёт системной темы (prefers-color-scheme)
// - Safe storage + событие mars-theme-change
// - Кнопка в сайдбаре или фиксированная (fallback)
// - SPA через document$ + auto-disconnect
// - Публичное API: window.marsTheme.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsThemeLoaded) return;
    window.__marsThemeLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var STORAGE_KEY = 'mars-theme';
    var BTN_ID = 'mars-theme-toggle';
    var DARK_CLASS = 'mars-stars-on';   // тот же, что в easter-eggs.js
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🎨 theme:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function lsGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }

    // ============================================================
    // 🌓 Определение темы
    // ============================================================
    function getSystemTheme() {
        try {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        } catch(e) {}
        return 'light';
    }

    function getStoredTheme() {
        var stored = lsGet(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') return stored;
        return getSystemTheme();  // системная — если пользователь не выбирал
    }

    // ============================================================
    // 🎨 Применение темы
    // ============================================================
    function applyTheme(theme, opts) {
        opts = opts || {};

        var isDark = theme === 'dark';

        // 1. data-theme атрибут (для CSS селекторов [data-theme="dark"])
        document.documentElement.setAttribute('data-theme', theme);
        if (document.body) {
            document.body.setAttribute('data-theme', theme);
        }

        // 2. Синхронизация с классом mars-stars-on
        //    (используется во многих CSS: wikipedia-footer, wiki-vip, etc.)
        if (isDark) {
            document.documentElement.classList.add(DARK_CLASS);
            if (document.body) document.body.classList.add(DARK_CLASS);
        } else {
            document.documentElement.classList.remove(DARK_CLASS);
            if (document.body) document.body.classList.remove(DARK_CLASS);
        }

        // 3. Синхронизация со звёздами (easter-eggs.js)
        if (isDark && window.marsEasterEggs) {
            try {
                // Если звёзды не включены — включаем
                if (typeof window.marsEasterEggs.isStarsOn === 'function' && !window.marsEasterEggs.isStarsOn()) {
                    // НЕ через API — чтобы не перезаписать localStorage
                    // Просто создаём canvas если его нет
                    if (!document.getElementById('mars-stars-canvas')) {
                        // easter-eggs сам добавит классы
                        lsSet('mars_stars_enabled', 'true');
                        if (typeof window.marsEasterEggs.starsOn === 'function') {
                            window.marsEasterEggs.starsOn();
                        }
                    }
                }
            } catch(e) {}
        } else if (!isDark && window.marsEasterEggs) {
            try {
                if (typeof window.marsEasterEggs.isStarsOn === 'function' && window.marsEasterEggs.isStarsOn()) {
                    lsSet('mars_stars_enabled', 'false');
                    if (typeof window.marsEasterEggs.starsOff === 'function') {
                        window.marsEasterEggs.starsOff();
                    }
                }
            } catch(e) {}
        }

        // 4. Обновляем кнопку
        updateButton(theme);

        // 5. Событие для других скриптов
        try {
            window.dispatchEvent(new CustomEvent('mars-theme-change', {
                detail: { theme: theme, isDark: isDark }
            }));
        } catch(e) {}

        log('тема:', theme);
    }

    function setTheme(theme) {
        lsSet(STORAGE_KEY, theme);
        applyTheme(theme);
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        return next;
    }

    // ============================================================
    // 🖱️ Кнопка
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mars-theme-style')) return;
        var s = document.createElement('style');
        s.id = 'mars-theme-style';
        s.textContent = `
            #${BTN_ID} {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                width: calc(100% - 24px);
                margin: 12px auto;
                padding: 9px 14px;
                background: rgba(108, 99, 255, 0.12);
                color: #4a4a68;
                border: 1.5px solid rgba(108, 99, 255, 0.35);
                border-radius: 10px;
                cursor: pointer;
                font-family: inherit;
                font-size: 0.82rem;
                font-weight: 700;
                transition: all .25s cubic-bezier(.16,1,.3,1);
                -webkit-tap-highlight-color: transparent;
            }
            #${BTN_ID}:hover {
                background: rgba(108, 99, 255, 0.22);
                border-color: #6C63FF;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px -4px rgba(108, 99, 255, 0.4);
            }
            #${BTN_ID}:active {
                transform: translateY(0) scale(.97);
            }

            /* Тёмная тема */
            html[data-theme="dark"] #${BTN_ID},
            body.${DARK_CLASS} #${BTN_ID} {
                background: rgba(162, 155, 254, 0.15);
                color: #d0d0e8;
                border-color: rgba(162, 155, 254, 0.4);
            }
            html[data-theme="dark"] #${BTN_ID}:hover,
            body.${DARK_CLASS} #${BTN_ID}:hover {
                background: rgba(162, 155, 254, 0.28);
                border-color: #A29BFE;
                color: #fff;
            }

            /* Фиксированная кнопка (fallback) */
            #${BTN_ID}.fixed {
                position: fixed;
                bottom: calc(210px + env(safe-area-inset-bottom, 0px));
                right: 20px;
                width: 48px;
                height: 48px;
                padding: 0;
                border-radius: 50%;
                font-size: 1.3rem;
                margin: 0;
                z-index: 9999989;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff;
                border: none;
                box-shadow: 0 8px 24px rgba(108, 99, 255, 0.5);
            }
            #${BTN_ID}.fixed:hover {
                transform: translateY(-3px) scale(1.05);
            }

            @media (prefers-reduced-motion: reduce) {
                #${BTN_ID} { transition: none !important; }
            }
        `;
        document.head.appendChild(s);
    }

    function updateButton(theme) {
        var btn = document.getElementById(BTN_ID);
        if (!btn) return;
        var isDark = theme === 'dark';

        // Если это компактная фиксированная — иконка
        if (btn.classList.contains('fixed')) {
            btn.textContent = isDark ? '☀️' : '🌙';
            btn.setAttribute('aria-label', isDark ? 'Светлая тема' : 'Тёмная тема');
            btn.title = isDark ? 'Светлая тема' : 'Тёмная тема';
        } else {
            btn.innerHTML = (isDark ? '☀️' : '🌙') +
                '<span>' + (isDark ? 'Светлая тема' : 'Тёмная тема') + '</span>';
        }
    }

    function createToggleButton() {
        if (document.getElementById(BTN_ID)) return;
        if (document.getElementById('theme-toggle')) return;    // уже есть чужая
        if (document.querySelector('.wy-toggle-theme')) return; // уже есть в readthedocs

        injectStyles();

        var btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.type = 'button';

        var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        updateButton(currentTheme);

        btn.addEventListener('click', function() {
            toggleTheme();
        });

        // Куда вставить?
        var sidebar = document.querySelector('.wy-nav-side .wy-menu-vertical') ||
                      document.querySelector('.wy-nav-side') ||
                      document.querySelector('.md-nav--primary .md-nav__list');

        if (sidebar) {
            // В сайдбар
            if (sidebar.tagName === 'UL') {
                var li = document.createElement('li');
                li.className = 'md-nav__item';
                li.style.listStyle = 'none';
                li.appendChild(btn);
                sidebar.appendChild(li);
            } else {
                sidebar.appendChild(btn);
            }
            log('кнопка в сайдбаре');
        } else {
            // Fallback — фиксированная кнопка (как у stars-toggle)
            btn.classList.add('fixed');
            document.body.appendChild(btn);
            log('кнопка fixed (fallback)');
        }
    }

    // ============================================================
    // 🎯 Инициализация
    // ============================================================
    // 1️⃣ Ставим атрибут СРАЗУ — до DOMContentLoaded (без FOUC)
    var initialTheme = getStoredTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);
    if (initialTheme === 'dark') {
        document.documentElement.classList.add(DARK_CLASS);
    }

    // 2️⃣ Слушаем системную тему — только если пользователь не выбирал
    try {
        if (window.matchMedia) {
            var mq = window.matchMedia('(prefers-color-scheme: dark)');
            var listener = function(e) {
                // Не переопределяем пользовательский выбор
                if (lsGet(STORAGE_KEY)) return;
                applyTheme(e.matches ? 'dark' : 'light');
            };
            if (mq.addEventListener) mq.addEventListener('change', listener);
            else if (mq.addListener) mq.addListener(listener);
        }
    } catch(e) {}

    // 3️⃣ Полное применение после DOMContentLoaded
    function init() {
        // Применяем на body
        if (document.body) {
            document.body.setAttribute('data-theme', initialTheme);
            if (initialTheme === 'dark') {
                document.body.classList.add(DARK_CLASS);
            }
        }

        // Ждём easter-eggs.js чтобы синхронизировать звёзды
        setTimeout(function() {
            // Синхронизируем со звёздами
            if (initialTheme === 'dark' && window.marsEasterEggs) {
                try {
                    if (!document.getElementById('mars-stars-canvas') && !document.body.classList.contains(DARK_CLASS)) {
                        document.body.classList.add(DARK_CLASS);
                    }
                } catch(e) {}
            }
        }, 500);

        createToggleButton();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 4️⃣ SPA-переходы
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                // Переприменяем тему — вдруг body пересоздали
                var t = document.documentElement.getAttribute('data-theme') || initialTheme;
                if (document.body) {
                    document.body.setAttribute('data-theme', t);
                    document.body.classList.toggle(DARK_CLASS, t === 'dark');
                }
                // Пересоздаём кнопку если её нет
                setTimeout(function() {
                    if (!document.getElementById(BTN_ID) &&
                        !document.getElementById('theme-toggle') &&
                        !document.querySelector('.wy-toggle-theme')) {
                        createToggleButton();
                    }
                }, 300);
            });
        } catch(e) {}
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsTheme = {
        set: setTheme,
        get: function() {
            return document.documentElement.getAttribute('data-theme') || 'light';
        },
        toggle: toggleTheme,
        isDark: function() {
            return document.documentElement.getAttribute('data-theme') === 'dark';
        },
        reset: function() {
            try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
            applyTheme(getSystemTheme());
        }
    };

    log('v2 VIP загружен, тема:', initialTheme);
})();
