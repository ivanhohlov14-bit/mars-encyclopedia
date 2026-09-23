// ============================================================
// accordion-menu.js — v2 VIP
// Аккордеон в сайдбаре + сохранение + авто-раскрытие активного
// - Делегирование клика (capture phase)
// - Сохранение раскрытых разделов в localStorage
// - Авто-раскрытие раздела с текущей статьёй
// - Плавная анимация через max-height
// - CSS встроен (был потерян)
// - Поддержка RTD (.wy-menu-vertical) + Material (.md-nav)
// - Публичное API: window.marsAccordion.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsAccordionLoaded) return;
    window.__marsAccordionLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var CONFIG = {
        storageKey: 'mars_accordion_open',
        menuSel: '.wy-menu-vertical, .md-nav--primary',
        linkSel: '.wy-menu-vertical a, .md-nav__link',
        autoOpenActive: true,        // раскрыть раздел с текущей статьёй
        rememberState: true,         // запоминать раскрытые разделы
        animationMs: 300,
        DEBUG: false
    };

    function log() {
        if (!CONFIG.DEBUG) return;
        try { console.log.apply(console, ['📋 accordion:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function safeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function safeSet(k, v) { try { localStorage.setItem(k, v); return true; } catch(e) { return false; } }

    function loadState() {
        if (!CONFIG.rememberState) return {};
        try {
            var raw = safeGet(CONFIG.storageKey);
            if (!raw) return {};
            var obj = JSON.parse(raw);
            return (obj && typeof obj === 'object') ? obj : {};
        } catch(e) { return {}; }
    }

    function saveState(state) {
        if (!CONFIG.rememberState) return;
        try { safeSet(CONFIG.storageKey, JSON.stringify(state)); } catch(e) {}
    }

    // ============================================================
    // 🎨 Стили (раньше их вообще не было)
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mars-accordion-style')) return;
        var s = document.createElement('style');
        s.id = 'mars-accordion-style';
        s.textContent = `
            /* Скрываем подменю через max-height (для анимации) */
            .wy-menu-vertical li > ul {
                overflow: hidden;
                max-height: 0;
                transition: max-height ${CONFIG.animationMs}ms cubic-bezier(.16,1,.3,1),
                            opacity ${CONFIG.animationMs}ms ease,
                            padding ${CONFIG.animationMs}ms ease;
                opacity: 0;
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }
            .wy-menu-vertical li.mars-open > ul {
                max-height: 4000px;
                opacity: 1;
            }

            /* Разделы с подменю */
            .wy-menu-vertical li.mars-has-sub > a {
                position: relative;
                padding-right: 32px !important;
                font-weight: 600;
                cursor: pointer;
            }
            .wy-menu-vertical li.mars-has-sub > a::after {
                content: '▸';
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                font-size: .85rem;
                color: #999;
                transition: transform ${CONFIG.animationMs}ms cubic-bezier(.16,1,.3,1),
                            color ${CONFIG.animationMs}ms ease;
                pointer-events: none;
                line-height: 1;
            }
            .wy-menu-vertical li.mars-has-sub.mars-open > a::after {
                transform: translateY(-50%) rotate(90deg);
                color: #6C63FF;
            }
            .wy-menu-vertical li.mars-has-sub.mars-open > a {
                color: #6C63FF;
            }

            /* Тёмная тема */
            body.mars-stars-on .wy-menu-vertical li.mars-has-sub > a::after { color: #888; }
            body.mars-stars-on .wy-menu-vertical li.mars-has-sub.mars-open > a,
            body.mars-stars-on .wy-menu-vertical li.mars-has-sub.mars-open > a::after {
                color: #A29BFE;
            }

            /* Material Design */
            .md-nav--primary .md-nav__item--nested > .md-nav__link::after {
                content: '▸';
                display: inline-block;
                margin-left: auto;
                transition: transform ${CONFIG.animationMs}ms cubic-bezier(.16,1,.3,1);
                color: #999;
            }
            .md-nav--primary .md-nav__item--nested.mars-open > .md-nav__link::after {
                transform: rotate(90deg);
                color: #6C63FF;
            }
            .md-nav--primary .md-nav__item--nested > .md-nav {
                overflow: hidden;
                max-height: 0;
                opacity: 0;
                transition: max-height ${CONFIG.animationMs}ms cubic-bezier(.16,1,.3,1),
                            opacity ${CONFIG.animationMs}ms ease;
            }
            .md-nav--primary .md-nav__item--nested.mars-open > .md-nav {
                max-height: 4000px;
                opacity: 1;
            }

            @media (prefers-reduced-motion: reduce) {
                .wy-menu-vertical li > ul,
                .wy-menu-vertical li.mars-has-sub > a::after,
                .md-nav--primary .md-nav__item--nested > .md-nav,
                .md-nav--primary .md-nav__item--nested > .md-nav__link::after {
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🔍 Пометить разделы с подменю
    // ============================================================
    function markSections() {
        // RTD
        var rtd = document.querySelector('.wy-menu-vertical');
        if (rtd) {
            var lis = rtd.querySelectorAll('li');
            for (var i = 0; i < lis.length; i++) {
                if (lis[i].querySelector(':scope > ul')) {
                    lis[i].classList.add('mars-has-sub');
                } else {
                    lis[i].classList.remove('mars-has-sub');
                }
            }
        }
        // Material
        var md = document.querySelectorAll('.md-nav--primary .md-nav__item--nested');
        md.forEach(function(el) { el.classList.add('mars-has-sub'); });
    }

    // ============================================================
    // 🆔 Уникальный ключ раздела (для хранения состояния)
    // ============================================================
    function getSectionKey(li) {
        var a = li.querySelector(':scope > a');
        if (!a) return null;
        var href = a.getAttribute('href') || '';
        var text = (a.textContent || '').trim().slice(0, 40);
        // Ключ = href + text — уникально для каждого раздела
        return (href || '') + '|' + text;
    }

    // ============================================================
    // 💾 Сохранение / восстановление раскрытых
    // ============================================================
    function persistOpenState() {
        var state = {};
        var rtd = document.querySelectorAll('.wy-menu-vertical li.mars-has-sub');
        rtd.forEach(function(li) {
            var key = getSectionKey(li);
            if (!key) return;
            if (li.classList.contains('mars-open')) state[key] = 1;
        });
        saveState(state);
    }

    function restoreOpenState() {
        if (!CONFIG.rememberState) return;
        var state = loadState();
        var keys = Object.keys(state);
        if (!keys.length) return;

        var rtd = document.querySelectorAll('.wy-menu-vertical li.mars-has-sub');
        rtd.forEach(function(li) {
            var key = getSectionKey(li);
            if (key && state[key]) {
                li.classList.add('mars-open');
            }
        });
    }

    // ============================================================
    // ⭐ Авто-раскрытие активного раздела
    // ============================================================
    function normalizePath(p) {
        if (!p) return '';
        try { p = decodeURIComponent(p); } catch(e) {}
        p = p.replace(/\/+/g, '/').replace(/\/$/, '');
        return p;
    }

    function autoOpenActive() {
        if (!CONFIG.autoOpenActive) return;

        var currentPath = normalizePath(window.location.pathname);
        if (!currentPath) return;

        var links = document.querySelectorAll('.wy-menu-vertical a');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            var href = a.getAttribute('href');
            if (!href || href.charAt(0) === '#' || href.indexOf('http') === 0) continue;

            var linkPath;
            try {
                linkPath = normalizePath(new URL(href, window.location.origin).pathname);
            } catch(e) { linkPath = normalizePath(href); }

            if (linkPath === currentPath) {
                // Нашли активную ссылку — раскрываем всех родителей
                var parent = a.closest('li');
                while (parent) {
                    if (parent.classList.contains('mars-has-sub')) {
                        parent.classList.add('mars-open');
                    }
                    var prevLi = parent.parentElement;
                    parent = prevLi ? prevLi.closest('li') : null;
                }
                log('активный раздел раскрыт');
                break;
            }
        }
    }

    // ============================================================
    // 🖱️ Обработчик клика (capture phase)
    // ============================================================
    function onMenuClick(e) {
        var a = e.target.closest && e.target.closest(CONFIG.linkSel);
        if (!a) return;

        // Проверяем что это в нашем меню
        if (!a.closest(CONFIG.menuSel)) return;

        // Ищем LI
        var li = a.parentElement;
        if (!li || li.tagName !== 'LI') {
            // Material: ссылка может быть обёрнута в label
            li = a.closest('li');
            if (!li) return;
        }

        // Есть ли подменю?
        var submenu = li.querySelector(':scope > ul') ||
                      li.querySelector(':scope > .md-nav');
        if (!submenu) return;

        // Модификаторы — пропускаем
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        // Средняя кнопка мыши — пропускаем
        if (e.button !== undefined && e.button !== 0) return;

        // Перехватываем
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();

        // Тоггл
        var wasOpen = li.classList.contains('mars-open');
        li.classList.toggle('mars-open');

        // Вибрация
        try { if (navigator.vibrate) navigator.vibrate(8); } catch(err) {}

        // Сохраняем состояние
        if (CONFIG.rememberState) {
            setTimeout(persistOpenState, 50);
        }

        log(wasOpen ? 'закрыт' : 'открыт');
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    function init() {
        injectStyles();
        markSections();
        restoreOpenState();
        autoOpenActive();

        // Делегирование клика (capture, чтобы перехватить раньше других)
        document.addEventListener('click', onMenuClick, true);

        // Повторные попытки для динамически подгружаемого меню
        setTimeout(function() {
            markSections();
            restoreOpenState();
        }, 500);

        setTimeout(markSections, 1500);

        // MutationObserver — если меню перестроилось (например при переходе)
        if (typeof MutationObserver !== 'undefined') {
            var obs = new MutationObserver(function(mutations) {
                var need = false;
                for (var i = 0; i < mutations.length; i++) {
                    var m = mutations[i];
                    if (m.addedNodes && m.addedNodes.length) {
                        for (var j = 0; j < m.addedNodes.length; j++) {
                            var n = m.addedNodes[j];
                            if (n.nodeType === 1 && (
                                (n.classList && n.classList.contains('wy-menu-vertical')) ||
                                (n.querySelector && n.querySelector('.wy-menu-vertical'))
                            )) {
                                need = true;
                                break;
                            }
                        }
                    }
                    if (need) break;
                }
                if (need) {
                    clearTimeout(init._t);
                    init._t = setTimeout(function() {
                        markSections();
                        restoreOpenState();
                        autoOpenActive();
                    }, 200);
                }
            });
            try {
                obs.observe(document.body, { childList: true, subtree: true });
                // Auto-disconnect через 30 сек
                setTimeout(function() { try { obs.disconnect(); } catch(e) {} }, 30000);
            } catch(e) {}
        }

        log('v2 VIP инициализирован');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsAccordion = {
        openAll: function() {
            document.querySelectorAll('.wy-menu-vertical li.mars-has-sub').forEach(function(li) {
                li.classList.add('mars-open');
            });
            persistOpenState();
        },
        closeAll: function() {
            document.querySelectorAll('.wy-menu-vertical li.mars-open').forEach(function(li) {
                li.classList.remove('mars-open');
            });
            persistOpenState();
        },
        clear: function() {
            try { localStorage.removeItem(CONFIG.storageKey); } catch(e) {}
        },
        refresh: function() {
            markSections();
            restoreOpenState();
            autoOpenActive();
        }
    };

    if (CONFIG.DEBUG) console.log('✅ accordion-menu.js v2 VIP загружен');
})();
