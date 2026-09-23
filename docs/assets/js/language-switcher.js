// ============================================================
// language-switcher.js — v2 VIP
// Блок «Другие языки» в сайдбаре через Яндекс.Переводчик
// - Collapsible на мобильном (свёрнут по умолчанию)
// - Память последнего языка (localStorage)
// - Метрика кликов (marsMetrika, если подключена)
// - document$ + MutationObserver с auto-disconnect
// - Fallback флагов (Windows-совместимые)
// - Escape данных, try/catch, safe storage
// - Публичное API: window.marsLanguageSwitcher.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsLangSwitcherLoaded) return;
    window.__marsLangSwitcherLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var CONFIG = {
        SOURCE_LANG: 'ru',
        STORAGE_KEY: 'mars_lang_switcher_collapsed',
        LAST_LANG_KEY: 'mars_last_lang',
        COLLAPSE_ON_MOBILE: true,      // свёрнут по умолчанию на ≤768px
        REMEMBER_LAST: true,           // подсветить последний язык
        DEBUG: false
    };

    function log() {
        if (!CONFIG.DEBUG) return;
        try { console.log.apply(console, ['🌐 lang:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function safeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function safeSet(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }

    // ============================================================
    // 🌍 Языки
    // ============================================================
    var LANGUAGES = [
        { code: 'en', flag: '🇬🇧', name: 'English' },
        { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
        { code: 'fr', flag: '🇫🇷', name: 'Français' },
        { code: 'es', flag: '🇪🇸', name: 'Español' },
        { code: 'it', flag: '🇮🇹', name: 'Italiano' },
        { code: 'pl', flag: '🇵🇱', name: 'Polski' },
        { code: 'pt', flag: '🇵🇹', name: 'Português' },
        { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
        { code: 'zh', flag: '🇨🇳', name: '中文' },
        { code: 'ja', flag: '🇯🇵', name: '日本語' },
        { code: 'ko', flag: '🇰🇷', name: '한국어' },
        { code: 'ar', flag: '🇸🇦', name: 'العربية' }
    ];

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        return window.innerWidth <= 768;
    }

    // ============================================================
    // 🔗 URL переводчика
    // ============================================================
    function makeTranslateUrl(targetLang) {
        try {
            var fullUrl = window.location.href;
            var encoded = encodeURIComponent(fullUrl);
            return 'https://translate.yandex.ru/translate?url=' + encoded +
                   '&lang=' + CONFIG.SOURCE_LANG + '-' + targetLang;
        } catch(e) {
            return 'https://translate.yandex.ru/';
        }
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('lang-switcher-style')) return;
        var style = document.createElement('style');
        style.id = 'lang-switcher-style';
        style.textContent = `
            .lang-switcher-block {
                margin: 14px 0 8px 0;
                padding: 12px 0 0 0;
                border-top: 1px solid rgba(160, 160, 180, 0.2);
                list-style: none;
                font-family: inherit;
            }

            /* Заголовок-кнопка (кликабельный для collapse) */
            .lang-title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                font-size: 0.72rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #6C63FF;
                padding: 0 12px 10px 12px;
                opacity: 0.95;
                background: transparent;
                border: none;
                width: 100%;
                cursor: pointer;
                font-family: inherit;
                -webkit-tap-highlight-color: transparent;
                transition: opacity .2s ease;
            }
            .lang-title:hover { opacity: 1; }
            .lang-title-icon {
                transition: transform .3s cubic-bezier(.16,1,.3,1);
                font-size: .7rem;
                opacity: .7;
            }
            .lang-switcher-block.collapsed .lang-title-icon {
                transform: rotate(-90deg);
            }

            /* Список */
            .lang-list {
                list-style: none;
                margin: 0;
                padding: 0;
                overflow: hidden;
                max-height: 800px;
                opacity: 1;
                transition: max-height .35s cubic-bezier(.16,1,.3,1),
                            opacity .25s ease;
            }
            .lang-switcher-block.collapsed .lang-list {
                max-height: 0;
                opacity: 0;
            }

            .lang-list li {
                margin: 0;
                padding: 0;
                list-style: none;
            }

            .lang-link {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 7px 12px;
                color: #333 !important;
                text-decoration: none !important;
                border-bottom: none !important;
                font-size: 0.85rem;
                font-weight: 500;
                transition: all 0.2s ease;
                border-radius: 4px;
                line-height: 1.3;
                -webkit-tap-highlight-color: transparent;
            }
            .lang-link:hover,
            .lang-link:focus-visible {
                background: rgba(108, 99, 255, 0.1);
                color: #6C63FF !important;
                transform: translateX(2px);
                outline: none;
            }

            /* Последний использованный язык */
            .lang-link.is-last {
                background: rgba(108, 99, 255, 0.08);
                font-weight: 700;
            }
            .lang-link.is-last::after {
                content: '•';
                margin-left: auto;
                color: #6C63FF;
                font-size: 1.3rem;
                line-height: 0;
            }

            .lang-flag {
                font-size: 1.05rem;
                line-height: 1;
                flex-shrink: 0;
                /* Fallback для Windows: используем EmojiOne-совместимый шрифт */
                font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji',
                             'EmojiOne Color', 'Android Emoji', sans-serif;
                font-variant-emoji: emoji;
            }
            .lang-name {
                flex: 1;
                line-height: 1.3;
            }

            /* Тёмная тема */
            html body.mars-stars-on .lang-switcher-block {
                border-top-color: rgba(108, 99, 255, 0.25);
            }
            html body.mars-stars-on .lang-title {
                color: #A29BFE;
            }
            html body.mars-stars-on .lang-link {
                color: #d4d4e4 !important;
            }
            html body.mars-stars-on .lang-link:hover,
            html body.mars-stars-on .lang-link:focus-visible {
                background: rgba(108, 99, 255, 0.25);
                color: #A29BFE !important;
            }
            html body.mars-stars-on .lang-link.is-last {
                background: rgba(108, 99, 255, 0.2);
            }

            /* Мобильный */
            @media (max-width: 1024px) {
                .lang-switcher-block {
                    margin: 12px 8px;
                }
                .lang-link {
                    padding: 10px 12px;
                    font-size: 0.9rem;
                }
                .lang-flag { font-size: 1.15rem; }
                .lang-title {
                    font-size: 0.75rem;
                    padding: 0 12px 12px 12px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .lang-title-icon,
                .lang-list,
                .lang-link {
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🏗️ Построение блока
    // ============================================================
    function createLanguageBlock() {
        var block = document.createElement('div');
        block.className = 'lang-switcher-block';

        var lastLang = CONFIG.REMEMBER_LAST ? safeGet(CONFIG.LAST_LANG_KEY) : null;

        var html = '';
        html += '<button type="button" class="lang-title" aria-expanded="true" aria-controls="lang-list-main">';
        html +=   '<span>🌐 Другие языки</span>';
        html +=   '<span class="lang-title-icon">▼</span>';
        html += '</button>';
        html += '<ul class="lang-list" id="lang-list-main">';

        LANGUAGES.forEach(function(lang) {
            var cls = 'lang-link' + (lang.code === lastLang ? ' is-last' : '');
            html += '<li>';
            html +=   '<a href="' + escapeHtml(makeTranslateUrl(lang.code)) + '"';
            html +=      ' target="_blank" rel="noopener noreferrer"';
            html +=      ' class="' + cls + '"';
            html +=      ' data-lang="' + escapeHtml(lang.code) + '">';
            html +=     '<span class="lang-flag" aria-hidden="true">' + lang.flag + '</span>';
            html +=     '<span class="lang-name">' + escapeHtml(lang.name) + '</span>';
            html +=   '</a>';
            html += '</li>';
        });

        html += '</ul>';
        block.innerHTML = html;

        // Клик по заголовку — collapse/expand
        var title = block.querySelector('.lang-title');
        if (title) {
            title.onclick = function() {
                var collapsed = block.classList.toggle('collapsed');
                title.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
                safeSet(CONFIG.STORAGE_KEY, collapsed ? '1' : '0');
                log('collapse:', collapsed);
            };
        }

        // Клик по языку — запоминаем + метрика
        block.querySelectorAll('.lang-link').forEach(function(link) {
            link.addEventListener('click', function() {
                var code = link.getAttribute('data-lang');
                if (CONFIG.REMEMBER_LAST && code) {
                    safeSet(CONFIG.LAST_LANG_KEY, code);
                    block.querySelectorAll('.lang-link').forEach(function(l) {
                        l.classList.toggle('is-last', l.getAttribute('data-lang') === code);
                    });
                }
                // Метрика
                if (window.marsMetrika && typeof window.marsMetrika.reachGoal === 'function') {
                    try {
                        window.marsMetrika.reachGoal('language_switch', { lang: code });
                    } catch(e) {}
                }
                log('выбран язык:', code);
            });
        });

        // Применяем сохранённое состояние collapse
        var collapsedState = safeGet(CONFIG.STORAGE_KEY);
        if (collapsedState === '1') {
            block.classList.add('collapsed');
            if (title) title.setAttribute('aria-expanded', 'false');
        } else if (collapsedState === null && CONFIG.COLLAPSE_ON_MOBILE && isMobile()) {
            // Первый визит + мобильный → свёрнут
            block.classList.add('collapsed');
            if (title) title.setAttribute('aria-expanded', 'false');
            safeSet(CONFIG.STORAGE_KEY, '1');
        }

        return block;
    }

    // ============================================================
    // 📥 Вставка в сайдбар
    // ============================================================
    function insertIntoSidebar() {
        if (document.querySelector('.lang-switcher-block')) return true;

        var navList = document.querySelector('.md-nav--primary .md-nav__list') ||
                      document.querySelector('.md-sidebar--primary .md-nav__list');
        var sidebar = document.querySelector('.wy-nav-side .wy-menu-vertical') ||
                      document.querySelector('.wy-menu-vertical') ||
                      document.querySelector('.wy-nav-side');

        if (!navList && !sidebar) return false;

        var block = createLanguageBlock();

        try {
            if (navList) {
                var li = document.createElement('li');
                li.className = 'md-nav__item';
                li.style.listStyle = 'none';
                li.appendChild(block);
                navList.appendChild(li);
            } else {
                sidebar.appendChild(block);
            }
            return true;
        } catch(e) {
            console.warn('🌐 lang-switcher insert error:', e.message);
            return false;
        }
    }

    // ============================================================
    // 🚀 Init с retry + document$ + observer
    // ============================================================
    var _retryTimer = null;
    var _attempts = 0;
    var MAX_ATTEMPTS = 20;

    function tryInsert() {
        if (insertIntoSidebar()) {
            _attempts = 0;
            if (_retryTimer) { clearTimeout(_retryTimer); _retryTimer = null; }
            log('блок вставлен');
            return true;
        }
        _attempts++;
        if (_attempts > MAX_ATTEMPTS) {
            log('не удалось вставить (лимит попыток)');
            return true;
        }
        if (_retryTimer) clearTimeout(_retryTimer);
        _retryTimer = setTimeout(tryInsert, 300);
        return false;
    }

    function init() {
        injectStyles();
        tryInsert();

        // Material SPA-переходы
        if (typeof document$ !== 'undefined' && document$.subscribe) {
            try {
                document$.subscribe(function() {
                    setTimeout(tryInsert, 150);
                });
            } catch(e) {}
        }

        // Observer — если сайдбар перерисовался
        if (typeof MutationObserver !== 'undefined') {
            var obs = new MutationObserver(function() {
                if (document.querySelector('.lang-switcher-block')) return;
                var navList = document.querySelector('.md-nav--primary .md-nav__list') ||
                              document.querySelector('.wy-menu-vertical');
                if (navList) {
                    clearTimeout(init._t);
                    init._t = setTimeout(tryInsert, 200);
                }
            });
            try {
                obs.observe(document.body, { childList: true, subtree: true });
                setTimeout(function() { try { obs.disconnect(); } catch(e) {} }, 20000);
            } catch(e) {}
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsLanguageSwitcher = {
        refresh: tryInsert,
        collapse: function() {
            var b = document.querySelector('.lang-switcher-block');
            if (b) b.classList.add('collapsed');
        },
        expand: function() {
            var b = document.querySelector('.lang-switcher-block');
            if (b) b.classList.remove('collapsed');
        },
        resetMemory: function() {
            try { localStorage.removeItem(CONFIG.LAST_LANG_KEY); } catch(e) {}
            try { localStorage.removeItem(CONFIG.STORAGE_KEY); } catch(e) {}
        }
    };

    if (CONFIG.DEBUG) console.log('✅ language-switcher.js v2 VIP загружен');
})();
