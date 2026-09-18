// ============================================================
// wikipedia-footer.js — VIP-футер с анимированным градиентом
// Цвет берётся из профиля пользователя ГАРАНТИРОВАННО
// ============================================================

(function() {
    'use strict';

    var DEFAULT_COLOR = '#3498db';
    var STORAGE_KEY = 'mars_kingdom_color';

    // Все цвета королевств
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

        contentSelectors: [
            '.md-content__inner',
            '.rst-content .section',
            '.rst-content',
            '.wy-nav-content',
            'article',
            '.document',
            'main'
        ],

        skipPages: ['/secret/', '/secret-2/', '/login/', '/signup/']
    };

    var path = window.location.pathname;
    for (var i = 0; i < CONFIG.skipPages.length; i++) {
        if (path.indexOf(CONFIG.skipPages[i]) === 0) return;
    }

    // ============================================================
    // 🎨 ГЕНЕРАЦИЯ ПАЛИТРЫ ИЗ ОДНОГО ЦВЕТА
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
        // amount: 0 = только color, 1 = только target
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

    // ============================================================
    // 🔍 ГАРАНТИРОВАННЫЙ ПОИСК ЦВЕТА
    // ============================================================
    function detectKingdomColor() {
        // 1) Прямо из localStorage
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved && /^#[0-9a-fA-F]{3,8}$/.test(saved)) {
                console.log('🎨 Цвет из localStorage:', saved);
                return saved;
            }
        } catch(e) {}

        // 2) Из кэша профиля
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
                                console.log('🎨 Цвет из кэша профиля:', k, '→', KINGDOM_COLORS[k]);
                                return KINGDOM_COLORS[k];
                            }
                        }
                    } catch(e) {}
                }
            }
        } catch(e) {}

        // 3) Из DOM — ищем data-атрибут
        try {
            var fromAttr = document.documentElement.getAttribute('data-kingdom-color');
            if (fromAttr && /^#[0-9a-fA-F]{3,8}$/.test(fromAttr)) {
                console.log('🎨 Цвет из data-атрибута:', fromAttr);
                return fromAttr;
            }
        } catch(e) {}

        // 4) Из CSS-переменной
        try {
            var fromCss = getComputedStyle(document.documentElement)
                .getPropertyValue('--kingdom-color').trim();
            if (fromCss && /^#[0-9a-fA-F]{3,8}$/.test(fromCss) &&
                fromCss !== '#6C63FF' && fromCss !== '#3498db') {
                console.log('🎨 Цвет из CSS-переменной:', fromCss);
                return fromCss;
            }
        } catch(e) {}

        console.log('🎨 Цвет по умолчанию:', DEFAULT_COLOR);
        return DEFAULT_COLOR;
    }

    // ============================================================
    // 💉 ИНЖЕКЦИЯ КОМПОНЕНТОВ ЦВЕТА
    // ============================================================
    function injectColorVariables(color) {
        var root = document.documentElement;
        root.style.setProperty('--wf-primary', color);
        root.style.setProperty('--wf-light', lighten(color, 0.35));
        root.style.setProperty('--wf-lighter', lighten(color, 0.7));
        root.style.setProperty('--wf-soft', lighten(color, 0.85));
        root.style.setProperty('--wf-dark', darken(color, 0.2));
        root.style.setProperty('--wf-darker', darken(color, 0.4));
        root.style.setProperty('--wf-rgb', (function(c){
            var rgb = hexToRgb(c);
            return rgb.r + ',' + rgb.g + ',' + rgb.b;
        })(color));
    }

    // ============================================================
    // 🎨 СТИЛИ С АНИМИРОВАННЫМ ГРАДИЕНТОМ
    // ============================================================
    function injectStyles() {
        if (document.getElementById('wiki-footer-styles')) return;

        var style = document.createElement('style');
        style.id = 'wiki-footer-styles';
        style.textContent = `
/* ==== КОНТЕЙНЕР ФУТЕРА ==== */
.wiki-footer {
    position: relative;
    margin: 64px 0 32px 0;
    padding: 32px 36px 28px;
    border-radius: 20px;
    font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.88rem;
    line-height: 1.7;
    color: #444;
    overflow: hidden;
    clear: both;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 8px 32px -8px rgba(var(--wf-rgb), 0.35);
    isolation: isolate;
    border: 1px solid rgba(var(--wf-rgb), 0.25);
}

/* ==== АНИМИРОВАННЫЙ ГРАДИЕНТНЫЙ ФОН ==== */
.wiki-footer::before {
    content: '';
    position: absolute;
    inset: -50%;
    z-index: -2;
    background: linear-gradient(
        135deg,
        var(--wf-lighter) 0%,
        var(--wf-soft) 25%,
        var(--wf-lighter) 50%,
        var(--wf-soft) 75%,
        var(--wf-lighter) 100%
    );
    background-size: 300% 300%;
    animation: wfGradientShift 18s ease infinite;
}

@keyframes wfGradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* ==== ВЕРХНЯЯ ЦВЕТНАЯ ПОЛОСА С БЛЕСКОМ ==== */
.wiki-footer::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(
        90deg,
        var(--wf-primary) 0%,
        var(--wf-light) 25%,
        var(--wf-primary) 50%,
        var(--wf-light) 75%,
        var(--wf-primary) 100%
    );
    background-size: 200% 100%;
    animation: wfTopBarShift 8s linear infinite;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 0 20px rgba(var(--wf-rgb), 0.6);
}

@keyframes wfTopBarShift {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
}

/* ==== МЯГКОЕ СВЕЧЕНИЕ В УГЛУ ==== */
.wiki-footer > p:first-child::after {
    content: '';
    position: absolute;
    top: -200px; right: -100px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(var(--wf-rgb), 0.15), transparent 70%);
    pointer-events: none;
    z-index: -1;
}

/* ==== ТЕКСТ ==== */
.wiki-footer p {
    position: relative;
    z-index: 1;
    margin: 0 0 14px 0;
    color: #4a4a5a;
    line-height: 1.75;
}

.wiki-footer-brand {
    padding-bottom: 16px;
    margin-bottom: 18px !important;
    border-bottom: 1px dashed rgba(var(--wf-rgb), 0.3);
    color: #3a3a4a !important;
}

.wiki-footer-brand strong {
    color: var(--wf-dark);
    font-weight: 800;
}

.wiki-footer-brand em {
    color: var(--wf-dark);
    font-style: italic;
    font-weight: 700;
}

/* ==== ССЫЛКИ В ТЕКСТЕ ==== */
.wiki-footer a {
    color: var(--wf-dark);
    text-decoration: none;
    font-weight: 700;
    border-bottom: 1px solid transparent;
    transition: all 0.2s;
}

.wiki-footer a:hover {
    border-bottom-color: var(--wf-dark);
}

/* ==== БЛОК ССЫЛОК ==== */
.wiki-footer-links {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    padding-top: 18px;
    margin-top: 4px;
    border-top: 1px dashed rgba(var(--wf-rgb), 0.3);
}

.wiki-footer-links a {
    display: inline-block;
    padding: 8px 16px;
    background: rgba(var(--wf-rgb), 0.12);
    border: 1px solid rgba(var(--wf-rgb), 0.35);
    border-radius: 20px;
    color: var(--wf-dark) !important;
    font-size: 0.85rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    border-bottom: none !important;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

.wiki-footer-links a:hover {
    background: rgba(var(--wf-rgb), 0.25);
    border-color: var(--wf-primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -4px rgba(var(--wf-rgb), 0.5);
    color: var(--wf-darker) !important;
}

/* ============================================
   🌌 ТЁМНАЯ ТЕМА
   ============================================ */
html body.mars-stars-on .wiki-footer {
    color: #d4d4e8;
    border-color: rgba(var(--wf-rgb), 0.5);
    box-shadow: 0 8px 40px -8px rgba(var(--wf-rgb), 0.4);
}

html body.mars-stars-on .wiki-footer::before {
    background: linear-gradient(
        135deg,
        rgba(20, 15, 35, 0.92) 0%,
        rgba(var(--wf-rgb), 0.18) 50%,
        rgba(20, 15, 35, 0.92) 100%
    );
    background-size: 300% 300%;
}

html body.mars-stars-on .wiki-footer::after {
    background: linear-gradient(
        90deg,
        var(--wf-primary) 0%,
        var(--wf-light) 50%,
        var(--wf-primary) 100%
    );
    background-size: 200% 100%;
    box-shadow: 0 0 24px rgba(var(--wf-rgb), 0.8);
}

html body.mars-stars-on .wiki-footer p {
    color: #c8c8dc !important;
}

html body.mars-stars-on .wiki-footer-brand {
    color: #e0e0ee !important;
    border-bottom-color: rgba(var(--wf-rgb), 0.4) !important;
}

html body.mars-stars-on .wiki-footer-brand strong {
    color: #ffffff !important;
}

html body.mars-stars-on .wiki-footer-brand em {
    color: var(--wf-light) !important;
}

html body.mars-stars-on .wiki-footer a {
    color: var(--wf-light) !important;
}

html body.mars-stars-on .wiki-footer-links {
    border-top-color: rgba(var(--wf-rgb), 0.4) !important;
}

html body.mars-stars-on .wiki-footer-links a {
    background: rgba(var(--wf-rgb), 0.15) !important;
    border-color: rgba(var(--wf-rgb), 0.4) !important;
    color: var(--wf-light) !important;
}

html body.mars-stars-on .wiki-footer-links a:hover {
    background: rgba(var(--wf-rgb), 0.3) !important;
    border-color: var(--wf-light) !important;
    color: #ffffff !important;
    box-shadow: 0 8px 24px -4px rgba(var(--wf-rgb), 0.6);
}

/* ============================================
   📱 МОБИЛЬНЫЙ
   ============================================ */
@media (max-width: 600px) {
    .wiki-footer {
        padding: 24px 20px 20px;
        margin: 40px 0 24px 0;
        border-radius: 14px;
    }
    .wiki-footer-links a {
        padding: 6px 12px;
        font-size: 0.78rem;
    }
}
`;
        document.head.appendChild(style);
    }

    // ============================================================
    // СОЗДАНИЕ ФУТЕРА
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
    // ПОИСК КОНТЕЙНЕРА
    // ============================================================
    function findContentContainer() {
        var rst = document.querySelector('.rst-content');
        if (rst && rst.parentElement) {
            return rst.parentElement;
        }
        for (var i = 0; i < CONFIG.contentSelectors.length; i++) {
            var el = document.querySelector(CONFIG.contentSelectors[i]);
            if (el && el.children.length > 0) return el;
        }
        return document.body;
    }

    // ============================================================
    // ПЕРЕНЕСТИ ФУТЕР В КОНЕЦ
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
    // 🎨 ОБНОВИТЬ ЦВЕТ (применяем каждый раз при загрузке и изменении)
    // ============================================================
    function refreshColor() {
        var color = detectKingdomColor();
        injectColorVariables(color);
        document.documentElement.setAttribute('data-kingdom-color', color);
        document.documentElement.style.setProperty('--kingdom-color', color);
        return color;
    }

    // ============================================================
    // MUTATION OBSERVER
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
    // 🎧 СЛЕЖЕНИЕ ЗА ИЗМЕНЕНИЯМИ ЦВЕТА
    // ============================================================
    function watchColorChanges() {
        // Изменения из других вкладок
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
                refreshColor();
            }
        });

        // Опрос каждую секунду — если что-то изменилось
        var lastColor = null;
        setInterval(function() {
            var current = detectKingdomColor();
            if (current !== lastColor) {
                lastColor = current;
                refreshColor();
            }
        }, 1000);
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        injectStyles();

        // 🎨 Применяем цвет СРАЗУ
        refreshColor();
        console.log('🎨 wikipedia-footer: цвет =', detectKingdomColor());

        enforceFooterAtBottom();

        // Повторные вызовы при загрузке
        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 100);
        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 300);
        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 800);
        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 1500);
        setTimeout(function() { refreshColor(); enforceFooterAtBottom(); }, 3000);

        startObserver();
        watchColorChanges();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // SPA
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function() {
            setTimeout(function() {
                refreshColor();
                var old = document.getElementById('wiki-footer-block');
                if (old) old.remove();
                enforceFooterAtBottom();
                startObserver();
            }, 300);
        });
    }

    // Отладка
    window.wfRefreshColor = refreshColor;
    window.wfDetectColor = detectKingdomColor;

    console.log('📄 wikipedia-footer v6: активен');
})();
