// ============================================================
// wikipedia-footer.js — FINAL v11
// ============================================================

(function() {
    'use strict';

    var DEFAULT_COLOR = '#3498db';
    var STORAGE_KEY = 'mars_kingdom_color';

    var KINGDOM_COLORS = {
        'Аркадия': '#D4A574', 'Ксанф': '#3D3D3D', 'Эдем': '#F4A460',
        'Эридания': '#F5D76E', 'Кхонг': '#A9A9A9', 'Авсония': '#87CEEB',
        'Кимерия': '#B19CD9', 'Серпентида': '#E57373', 'Эритрей': '#64B5F6',
        'Утопия': '#4DD0E1', 'Эллада': '#FF8A65', 'Аливасото': '#81C784'
    };

    var skip = ['/secret/', '/secret-2/', '/login/', '/signup/'];
    for (var i = 0; i < skip.length; i++) {
        if (location.pathname.indexOf(skip[i]) === 0) return;
    }

    function hexToRgb(hex) {
        var c = (hex || DEFAULT_COLOR).replace('#', '');
        if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
        var n = parseInt(c, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    function getColor() {
        try {
            var s = localStorage.getItem(STORAGE_KEY);
            if (s && /^#[0-9a-fA-F]{6}$/.test(s)) return s;
        } catch(e) {}
        try {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key && key.indexOf('pf_cache_') === 0) {
                    var cache = JSON.parse(localStorage.getItem(key));
                    if (cache && cache.currentProfile && cache.currentProfile.kingdom) {
                        var col = KINGDOM_COLORS[cache.currentProfile.kingdom];
                        if (col) {
                            try { localStorage.setItem(STORAGE_KEY, col); } catch(e) {}
                            return col;
                        }
                    }
                }
            }
        } catch(e) {}
        return DEFAULT_COLOR;
    }

    function applyColor(color) {
        var rgb = hexToRgb(color);
        var root = document.documentElement;
        root.style.setProperty('--wf-color', color);
        root.style.setProperty('--wf-rgb', rgb.r + ',' + rgb.g + ',' + rgb.b);
    }

    function injectStyles() {
        if (document.getElementById('wf-styles')) return;
        var s = document.createElement('style');
        s.id = 'wf-styles';
        s.textContent = `

/* ============================================================
   WIKIPEDIA FOOTER — светлый фон + медленное переливание
   ============================================================ */

.wiki-footer {
    position: relative;
    margin: 60px 0 30px;
    padding: 30px 34px 26px;
    border-radius: 18px;
    font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.88rem;
    line-height: 1.7;
    color: #333;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(var(--wf-rgb, 52,152,219), 0.3);
    box-shadow: 0 6px 24px -6px rgba(var(--wf-rgb, 52,152,219), 0.25);
}

/* Фон — очень медленное переливание волной */
.wiki-footer::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(
        120deg,
        #ffffff 0%,
        #ffffff 15%,
        rgba(var(--wf-rgb, 52,152,219), 0.22) 35%,
        rgba(var(--wf-rgb, 52,152,219), 0.08) 50%,
        rgba(var(--wf-rgb, 52,152,219), 0.22) 65%,
        #ffffff 85%,
        #ffffff 100%
    );
    background-size: 300% 300%;
    animation: wfSlowWave 60s ease-in-out infinite;
}

@keyframes wfSlowWave {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Верхняя полоса — цвета королевства, тоже медленно переливается */
.wiki-footer::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(
        90deg,
        var(--wf-color, #3498db) 0%,
        rgba(var(--wf-rgb, 52,152,219), 0.4) 20%,
        var(--wf-color, #3498db) 35%,
        rgba(var(--wf-rgb, 52,152,219), 0.7) 50%,
        var(--wf-color, #3498db) 65%,
        rgba(var(--wf-rgb, 52,152,219), 0.4) 80%,
        var(--wf-color, #3498db) 100%
    );
    background-size: 300% 100%;
    animation: wfBarWave 45s ease-in-out infinite;
    box-shadow:
        0 0 12px rgba(var(--wf-rgb, 52,152,219), 0.5),
        inset 0 -2px 6px rgba(0, 0, 0, 0.1);
}

@keyframes wfBarWave {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Контент */
.wiki-footer > * { position: relative; z-index: 1; }

.wiki-footer p {
    margin: 0 0 14px;
    color: #444;
    line-height: 1.75;
}

.wiki-footer-brand {
    padding-bottom: 14px;
    margin-bottom: 16px !important;
    border-bottom: 1px dashed rgba(var(--wf-rgb, 52,152,219), 0.4);
    color: #2a2a3a !important;
}

.wiki-footer-brand strong { color: #1a1a2e; font-weight: 800; }
.wiki-footer-brand em {
    color: var(--wf-color, #3498db);
    font-style: italic;
    font-weight: 700;
}

.wiki-footer a {
    color: var(--wf-color, #3498db);
    text-decoration: none;
    font-weight: 700;
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s;
}
.wiki-footer a:hover { border-bottom-color: var(--wf-color, #3498db); }

.wiki-footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 16px;
    margin-top: 4px;
    border-top: 1px dashed rgba(var(--wf-rgb, 52,152,219), 0.4);
}

.wiki-footer-links a {
    display: inline-block;
    padding: 8px 16px;
    background: rgba(var(--wf-rgb, 52,152,219), 0.12);
    border: 1px solid rgba(var(--wf-rgb, 52,152,219), 0.4);
    border-radius: 20px;
    color: #2a2a3a !important;
    font-size: 0.85rem;
    font-weight: 700;
    text-decoration: none;
    border-bottom: none !important;
    transition: all 0.3s ease;
}
.wiki-footer-links a:hover {
    background: rgba(var(--wf-rgb, 52,152,219), 0.25);
    border-color: var(--wf-color, #3498db);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px -4px rgba(var(--wf-rgb, 52,152,219), 0.5);
    color: #000 !important;
}

/* ============================================================
   ТЁМНАЯ ТЕМА
   ============================================================ */
html body.mars-stars-on .wiki-footer { color: #d4d4e8; }
html body.mars-stars-on .wiki-footer::before {
    background: linear-gradient(
        120deg,
        #1e1e2e 0%,
        #1e1e2e 15%,
        rgba(var(--wf-rgb, 52,152,219), 0.18) 35%,
        rgba(var(--wf-rgb, 52,152,219), 0.06) 50%,
        rgba(var(--wf-rgb, 52,152,219), 0.18) 65%,
        #1e1e2e 85%,
        #1e1e2e 100%
    );
    background-size: 300% 300%;
}
html body.mars-stars-on .wiki-footer p { color: #c8c8dc !important; }
html body.mars-stars-on .wiki-footer-brand {
    color: #e0e0ee !important;
    border-bottom-color: rgba(var(--wf-rgb, 52,152,219), 0.5) !important;
}
html body.mars-stars-on .wiki-footer-brand strong { color: #fff !important; }
html body.mars-stars-on .wiki-footer-links a {
    background: rgba(var(--wf-rgb, 52,152,219), 0.15) !important;
    color: #e0e0ee !important;
}
html body.mars-stars-on .wiki-footer-links a:hover {
    background: rgba(var(--wf-rgb, 52,152,219), 0.3) !important;
    color: #fff !important;
}

@media (max-width: 600px) {
    .wiki-footer { padding: 22px 18px; margin: 40px 0 20px; border-radius: 14px; }
    .wiki-footer-links a { padding: 6px 12px; font-size: 0.78rem; }
}

/* Уважение к настройкам ОС — если юзер отключил анимации */
@media (prefers-reduced-motion: reduce) {
    .wiki-footer::before,
    .wiki-footer::after { animation: none; }
}
`;
        document.head.appendChild(s);
    }

    function createFooter() {
        var f = document.createElement('div');
        f.className = 'wiki-footer';
        f.id = 'wiki-footer-block';
        f.innerHTML =
            '<p>Материалы «Марсианской энциклопедии» доступны по лицензии ' +
            '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru" target="_blank">' +
            'Creative Commons «Attribution-NonCommercial-NoDerivs» (BY-NC-ND) 4.0</a>. ' +
            'Отдельные элементы могут иметь собственные условия использования — ' +
            'подробнее см. <a href="/license/">Условия использования</a>.</p>' +
            '<p class="wiki-footer-brand"><strong>Марсианская энциклопедия</strong>® — ' +
            'научно-художественный справочный проект по вселенной цикла романов ' +
            '<em>«Письмо из Красной пыли»</em>. Реконструкция истории Марса ' +
            'в Эпоху Умирания, основанная на научных данных и художественной концепции автора.</p>' +
            '<div class="wiki-footer-links">' +
            '<a href="/privacy/">Политика конфиденциальности</a>' +
            '<a href="/about/">Описание проекта</a>' +
            '<a href="/contact/">Связаться с нами</a>' +
            '<a href="/code-of-conduct/">Кодекс поведения</a>' +
            '<a href="/statistics/">Статистика</a>' +
            '</div>';
        return f;
    }

    function findContainer() {
        var rst = document.querySelector('.rst-content');
        if (rst && rst.parentElement) return rst.parentElement;
        return document.querySelector('.wy-nav-content') || document.body;
    }

    function placeFooter() {
        var f = document.getElementById('wiki-footer-block');
        var c = findContainer();
        if (!f) {
            c.appendChild(createFooter());
            return;
        }
        if (f.parentElement !== c || c.lastElementChild !== f) {
            c.appendChild(f);
        }
    }

    function start() {
        applyColor(getColor());
        injectStyles();
        placeFooter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    setTimeout(start, 500);
    setTimeout(placeFooter, 1500);

    var lastUrl = location.href;
    setInterval(function() {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            var old = document.getElementById('wiki-footer-block');
            if (old) old.remove();
            setTimeout(start, 200);
            setTimeout(placeFooter, 800);
        }
    }, 600);
})();
