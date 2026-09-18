// ============================================================
// wikipedia-footer.js — ФИНАЛЬНАЯ версия для темы readthedocs
// ============================================================

(function() {
    'use strict';

    var DEFAULT_COLOR = '#3498db';
    var STORAGE_KEY = 'mars_kingdom_color';

    var KINGDOM_COLORS = {
        'Аркадия':    '#D4A574',
        'Ксанф':      '#3D3D3D',
        'Эдем':       '#F4A460',
        'Эридания':   '#F5D76E',
        'Кхонг':      '#A9A9A9',
        'Авсония':    '#87CEEB',
        'Кимерия':    '#B19CD9',
        'Серпентида': '#E57373',
        'Эритрей':    '#64B5F6',
        'Утопия':     '#4DD0E1',
        'Эллада':     '#FF8A65',
        'Аливасото':  '#81C784'
    };

    var CONFIG = {
        licenseNote:
            'Материалы «Марсианской энциклопедии» доступны по лицензии ' +
            '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru" target="_blank" rel="noopener">' +
            'Creative Commons «Attribution-NonCommercial-NoDerivs» (BY-NC-ND) 4.0</a>. ' +
            'Отдельные элементы могут иметь собственные условия использования — ' +
            'подробнее см. <a href="/license/">Условия использования</a>.',

        brandNote:
            '<strong>Марсианская энциклопедия</strong>® — научно-художественный справочный проект ' +
            'по вселенной цикла романов <em>«Письмо из Красной пыли»</em>. ' +
            'Реконструкция истории Марса в Эпоху Умирания, основанная на научных данных ' +
            'и художественной концепции автора.',

        links: [
            { text: 'Политика конфиденциальности', href: '/privacy/' },
            { text: 'Описание проекта', href: '/about/' },
            { text: 'Связаться с нами', href: '/contact/' },
            { text: 'Кодекс поведения', href: '/code-of-conduct/' },
            { text: 'Статистика', href: '/statistics/' }
        ],

        skipPages: ['/secret/', '/secret-2/', '/login/', '/signup/']
    };

    var path = window.location.pathname;
    for (var i = 0; i < CONFIG.skipPages.length; i++) {
        if (path.indexOf(CONFIG.skipPages[i]) === 0) return;
    }

    // ============================================================
    // 🎨 ЦВЕТОВЫЕ УТИЛИТЫ
    // ============================================================
    function hexToRgb(hex) {
        if (!hex) return { r: 52, g: 152, b: 219 };
        var c = hex.replace('#', '');
        if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
        var n = parseInt(c, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(function(x) {
            var h = Math.max(0, Math.min(255, Math.round(x))).toString(16);
            return h.length === 1 ? '0' + h : h;
        }).join('');
    }

    function mixWith(color, target, amount) {
        var c = hexToRgb(color);
        var t = hexToRgb(target);
        return rgbToHex(
            c.r + (t.r - c.r) * amount,
            c.g + (t.g - c.g) * amount,
            c.b + (t.b - c.b) * amount
        );
    }

    function lighten(color, amount) {
        return mixWith(color, '#ffffff', amount);
    }

    function darken(color, amount) {
        return mixWith(color, '#000000', amount);
    }

    function isDark(hex) {
        var rgb = hexToRgb(hex);
        return (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) < 100;
    }

    // ============================================================
    // 🔍 ПОИСК ЦВЕТА ПРОФИЛЯ (без спама в консоль)
    // ============================================================
    function detectKingdomColor() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved && /^#[0-9a-fA-F]{3,8}$/.test(saved)) return saved;
        } catch(e) {}

        try {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key && key.indexOf('pf_cache_') === 0) {
                    try {
                        var cached = JSON.parse(localStorage.getItem(key));
                        if (cached && cached.currentProfile && cached.currentProfile.kingdom) {
                            var k = cached.currentProfile.kingdom;
                            if (KINGDOM_COLORS[k]) {
                                try { localStorage.setItem(STORAGE_KEY, KINGDOM_COLORS[k]); } catch(e) {}
                                return KINGDOM_COLORS[k];
                            }
                        }
                    } catch(e) {}
                }
            }
        } catch(e) {}

        try {
            var fromAttr = document.documentElement.getAttribute('data-kingdom-color');
            if (fromAttr && /^#[0-9a-fA-F]{3,8}$/.test(fromAttr)) return fromAttr;
        } catch(e) {}

        try {
            var fromCss = getComputedStyle(document.documentElement)
                .getPropertyValue('--kingdom-color').trim();
            if (fromCss && /^#[0-9a-fA-F]{3,8}$/.test(fromCss) &&
                fromCss !== '#6C63FF' && fromCss !== '#3498db') {
                return fromCss;
            }
        } catch(e) {}

        return DEFAULT_COLOR;
    }

    // ============================================================
    // 🎨 ИНЖЕКЦИЯ CSS-ПЕРЕМЕННЫХ (умный подход для тёмных цветов)
    // ============================================================
    function injectColorVariables(color) {
        var root = document.documentElement;
        var dark = isDark(color);

        root.style.setProperty('--wf-primary', color);
        root.style.setProperty('--wf-light',
            lighten(color, dark ? 0.15 : 0.25));
        root.style.setProperty('--wf-lighter',
            lighten(color, dark ? 0.45 : 0.55));
        root.style.setProperty('--wf-soft',
            lighten(color, dark ? 0.72 : 0.78));
        root.style.setProperty('--wf-dark',
            darken(color, dark ? 0.05 : 0.15));
        root.style.setProperty('--wf-darker',
            darken(color, dark ? 0.2 : 0.35));

        var rgb = hexToRgb(color);
        root.style.setProperty('--wf-rgb', rgb.r + ',' + rgb.g + ',' + rgb.b);
    }

    // ============================================================
    // 💉 СТИЛИ
    // ============================================================
    function injectStyles() {
        if (document.getElementById('wiki-footer-styles')) return;

        var style = document.createElement('style');
        style.id = 'wiki-footer-styles';
        style.textContent = [
            '.wiki-footer {',
            '  position: relative;',
            '  margin: 64px 0 32px 0;',
            '  padding: 32px 36px 28px;',
            '  border-radius: 20px;',
            '  font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '  font-size: 0.88rem;',
            '  line-height: 1.7;',
            '  color: #444;',
            '  overflow: hidden;',
            '  clear: both;',
            '  width: 100%;',
            '  box-sizing: border-box;',
            '  box-shadow: 0 8px 32px -8px rgba(var(--wf-rgb, 52,152,219), 0.35);',
            '  isolation: isolate;',
            '  border: 1px solid rgba(var(--wf-rgb, 52,152,219), 0.25);',
            '}',

            '.wiki-footer::before {',
            '  content: "";',
            '  position: absolute;',
            '  inset: -50%;',
            '  z-index: -2;',
            '  background: linear-gradient(135deg,',
            '    var(--wf-lighter, #e8f4fb) 0%,',
            '    var(--wf-soft, #f4fafd) 25%,',
            '    var(--wf-lighter, #e8f4fb) 50%,',
            '    var(--wf-soft, #f4fafd) 75%,',
            '    var(--wf-lighter, #e8f4fb) 100%);',
            '  background-size: 300% 300%;',
            '  animation: wfGradientShift 18s ease infinite;',
            '}',

            '@keyframes wfGradientShift {',
            '  0% { background-position: 0% 50%; }',
            '  50% { background-position: 100% 50%; }',
            '  100% { background-position: 0% 50%; }',
            '}',

            '.wiki-footer::after {',
            '  content: "";',
            '  position: absolute;',
            '  top: 0; left: 0; right: 0;',
            '  height: 4px;',
            '  background: linear-gradient(90deg,',
            '    var(--wf-primary, #3498db) 0%,',
            '    var(--wf-light, #5dade2) 25%,',
            '    var(--wf-primary, #3498db) 50%,',
            '    var(--wf-light, #5dade2) 75%,',
            '    var(--wf-primary, #3498db) 100%);',
            '  background-size: 200% 100%;',
            '  animation: wfTopBarShift 8s linear infinite;',
            '  border-radius: 20px 20px 0 0;',
            '  box-shadow: 0 0 20px rgba(var(--wf-rgb, 52,152,219), 0.6);',
            '}',

            '@keyframes wfTopBarShift {',
            '  0% { background-position: 0% 50%; }',
            '  100% { background-position: 200% 50%; }',
            '}',

            '.wiki-footer p {',
            '  position: relative;',
            '  z-index: 1;',
            '  margin: 0 0 14px 0;',
            '  color: #4a4a5a;',
            '  line-height: 1.75;',
            '}',

            '.wiki-footer-brand {',
            '  padding-bottom: 16px;',
            '  margin-bottom: 18px !important;',
            '  border-bottom: 1px dashed rgba(var(--wf-rgb, 52,152,219), 0.3);',
            '  color: #3a3a4a !important;',
            '}',

            '.wiki-footer-brand strong { color: var(--wf-dark, #1e5a7a); font-weight: 800; }',
            '.wiki-footer-brand em { color: var(--wf-dark, #1e5a7a); font-style: italic; font-weight: 700; }',

            '.wiki-footer a {',
            '  color: var(--wf-dark, #1e5a7a);',
            '  text-decoration: none;',
            '  font-weight: 700;',
            '  border-bottom: 1px solid transparent;',
            '  transition: all 0.2s;',
            '}',

            '.wiki-footer a:hover { border-bottom-color: var(--wf-dark, #1e5a7a); }',

            '.wiki-footer-links {',
            '  position: relative;',
            '  z-index: 1;',
            '  display: flex;',
            '  flex-wrap: wrap;',
            '  gap: 8px;',
            '  align-items: center;',
            '  padding-top: 18px;',
            '  margin-top: 4px;',
            '  border-top: 1px dashed rgba(var(--wf-rgb, 52,152,219), 0.3);',
            '}',

            '.wiki-footer-links a {',
            '  display: inline-block;',
            '  padding: 8px 16px;',
            '  background: rgba(var(--wf-rgb, 52,152,219), 0.12);',
            '  border: 1px solid rgba(var(--wf-rgb, 52,152,219), 0.35);',
            '  border-radius: 20px;',
            '  color: var(--wf-dark, #1e5a7a) !important;',
            '  font-size: 0.85rem;',
            '  font-weight: 700;',
            '  text-decoration: none;',
            '  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);',
            '  border-bottom: none !important;',
            '  backdrop-filter: blur(4px);',
            '  -webkit-backdrop-filter: blur(4px);',
            '}',

            '.wiki-footer-links a:hover {',
            '  background: rgba(var(--wf-rgb, 52,152,219), 0.25);',
            '  border-color: var(--wf-primary, #3498db);',
            '  transform: translateY(-2px);',
            '  box-shadow: 0 8px 20px -4px rgba(var(--wf-rgb, 52,152,219), 0.5);',
            '  color: var(--wf-darker, #0e3347) !important;',
            '}',

            'html body.mars-stars-on .wiki-footer {',
            '  color: #d4d4e8;',
            '  border-color: rgba(var(--wf-rgb, 52,152,219), 0.5);',
            '}',

            'html body.mars-stars-on .wiki-footer::before {',
            '  background: linear-gradient(135deg,',
            '    rgba(20, 15, 35, 0.92) 0%,',
            '    rgba(var(--wf-rgb, 52,152,219), 0.18) 50%,',
            '    rgba(20, 15, 35, 0.92) 100%);',
            '  background-size: 300% 300%;',
            '}',

            'html body.mars-stars-on .wiki-footer p { color: #c8c8dc !important; }',
            'html body.mars-stars-on .wiki-footer-brand { color: #e0e0ee !important; border-bottom-color: rgba(var(--wf-rgb, 52,152,219), 0.4) !important; }',
            'html body.mars-stars-on .wiki-footer-brand strong { color: #ffffff !important; }',
            'html body.mars-stars-on .wiki-footer-brand em { color: var(--wf-light, #5dade2) !important; }',
            'html body.mars-stars-on .wiki-footer a { color: var(--wf-light, #5dade2) !important; }',
            'html body.mars-stars-on .wiki-footer-links { border-top-color: rgba(var(--wf-rgb, 52,152,219), 0.4) !important; }',
            'html body.mars-stars-on .wiki-footer-links a {',
            '  background: rgba(var(--wf-rgb, 52,152,219), 0.15) !important;',
            '  border-color: rgba(var(--wf-rgb, 52,152,219), 0.4) !important;',
            '  color: var(--wf-light, #5dade2) !important;',
            '}',
            'html body.mars-stars-on .wiki-footer-links a:hover {',
            '  background: rgba(var(--wf-rgb, 52,152,219), 0.3) !important;',
            '  border-color: var(--wf-light, #5dade2) !important;',
            '  color: #ffffff !important;',
            '}',

            '@media (max-width: 600px) {',
            '  .wiki-footer { padding: 24px 20px 20px; margin: 40px 0 24px 0; border-radius: 14px; }',
            '  .wiki-footer-links a { padding: 6px 12px; font-size: 0.78rem; }',
            '}'
        ].join('\n');

        document.head.appendChild(style);
    }

    // ============================================================
    // 📄 СОЗДАНИЕ ФУТЕРА
    // ============================================================
    function createFooter() {
        var footer = document.createElement('div');
        footer.className = 'wiki-footer';
        footer.id = 'wiki-footer-block';
        footer.setAttribute('role', 'contentinfo');

        var html = '<p>' + CONFIG.licenseNote + '</p>';
        html += '<p class="wiki-footer-brand">' + CONFIG.brandNote + '</p>';
        html += '<div class="wiki-footer-links">';
        CONFIG.links.forEach(function(link) {
            html += '<a href="' + link.href + '">' + link.text + '</a>';
        });
        html += '</div>';

        footer.innerHTML = html;
        return footer;
    }

    // ============================================================
    // 🔍 КОНТЕЙНЕР ДЛЯ ВСТАВКИ (readthedocs специфика)
    // ============================================================
    function findContentContainer() {
        // В readthedocs комментарии вставляются в .wy-nav-content (родитель .rst-content)
        var rst = document.querySelector('.rst-content');
        if (rst && rst.parentElement) {
            return rst.parentElement;
        }

        var wy = document.querySelector('.wy-nav-content');
        if (wy) return wy;

        return document.body;
    }

    // ============================================================
    // 📍 ВСТАВКА ФУТЕРА В САМЫЙ НИЗ
    // ============================================================
    function enforceFooterAtBottom() {
        var footer = document.getElementById('wiki-footer-block');
        var container = findContentContainer();

        if (!footer) {
            footer = createFooter();
            container.appendChild(footer);
            return;
        }

        if (footer.parentElement !== container) {
            if (footer.parentNode) footer.parentNode.removeChild(footer);
            container.appendChild(footer);
            return;
        }

        if (container.lastElementChild !== footer) {
            container.appendChild(footer);
        }
    }

    // ============================================================
    // 🎨 ОБНОВИТЬ ЦВЕТ
    // ============================================================
    function refreshColor() {
        var color = detectKingdomColor();
        injectColorVariables(color);
        document.documentElement.setAttribute('data-kingdom-color', color);
        document.documentElement.style.setProperty('--kingdom-color', color);
        return color;
    }

    // ============================================================
    // 👀 MUTATION OBSERVER
    // ============================================================
    var observer = null;
    var lastRun = 0;
    var DEBOUNCE_MS = 100;

    function startObserver() {
        if (observer) observer.disconnect();

        observer = new MutationObserver(function(mutations) {
            var onlyFooterChanges = true;
            for (var i = 0; i < mutations.length; i++) {
                var target = mutations[i].target;
                if (target && target.closest && target.closest('.wiki-footer')) continue;
                onlyFooterChanges = false;
                break;
            }
            if (onlyFooterChanges) return;

            var now = Date.now();
            if (now - lastRun < DEBOUNCE_MS) return;
            lastRun = now;

            enforceFooterAtBottom();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // ============================================================
    // 🔄 СЛЕЖЕНИЕ ЗА ЦВЕТОМ
    // ============================================================
    function watchColorChanges() {
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) refreshColor();
        });

        var lastColor = null;
        setInterval(function() {
            var current = detectKingdomColor();
            if (current !== lastColor) {
                lastColor = current;
                refreshColor();
                console.log('🎨 Цвет обновлён:', current);
            }
        }, 3000);
    }

    // ============================================================
    // 🔄 СЛЕЖЕНИЕ ЗА СМЕНОЙ URL (для readthedocs)
    // ============================================================
    function watchUrlChanges() {
        var lastUrl = location.href;

        setInterval(function() {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                console.log('📄 Переход на:', lastUrl);

                // Удаляем старый футер
                var old = document.getElementById('wiki-footer-block');
                if (old) old.remove();

                // Пересоздаём на новой странице
                setTimeout(function() {
                    refreshColor();
                    enforceFooterAtBottom();
                }, 300);
                setTimeout(enforceFooterAtBottom, 800);
                setTimeout(enforceFooterAtBottom, 1500);
            }
        }, 400);
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    function init() {
        injectStyles();
        refreshColor();
        enforceFooterAtBottom();

        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 100);
        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 300);
        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 800);
        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 1500);

        startObserver();
        watchColorChanges();
        watchUrlChanges();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Отладка
    window.wfRefreshColor = refreshColor;
    window.wfDetectColor = detectKingdomColor;

    console.log('📄 wikipedia-footer v7: активен');
})();
