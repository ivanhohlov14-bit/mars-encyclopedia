// ============================================================
// wikipedia-footer.js — ФИНАЛ v8 (тёмный футер как в профиле)
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

    var skipPages = ['/secret/', '/secret-2/', '/login/', '/signup/'];
    var path = window.location.pathname;
    for (var i = 0; i < skipPages.length; i++) {
        if (path.indexOf(skipPages[i]) === 0) return;
    }

    function hexToRgb(hex) {
        var c = (hex || '#3498db').replace('#', '');
        if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
        var n = parseInt(c, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    function detectColor() {
        try {
            var s = localStorage.getItem(STORAGE_KEY);
            if (s && /^#[0-9a-fA-F]{3,8}$/.test(s)) return s;
        } catch(e) {}
        try {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key && key.indexOf('pf_cache_') === 0) {
                    try {
                        var c = JSON.parse(localStorage.getItem(key));
                        if (c && c.currentProfile && c.currentProfile.kingdom) {
                            var col = KINGDOM_COLORS[c.currentProfile.kingdom];
                            if (col) {
                                try { localStorage.setItem(STORAGE_KEY, col); } catch(e) {}
                                return col;
                            }
                        }
                    } catch(e) {}
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
        root.setAttribute('data-kingdom-color', color);
    }

    function injectStyles() {
        if (document.getElementById('wiki-footer-styles')) return;
        var style = document.createElement('style');
        style.id = 'wiki-footer-styles';
        style.textContent = `
/* ============================================
   WIKIPEDIA FOOTER — тёмный, как hero профиля
   ============================================ */
.wiki-footer {
    position: relative;
    margin: 64px 0 32px 0;
    padding: 32px 36px 28px;
    border-radius: 20px;
    font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.88rem;
    line-height: 1.7;
    color: #d4d4e8;
    overflow: hidden;
    clear: both;
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 40%, #4a2a3a 100%);
    box-shadow: 0 8px 32px -8px rgba(var(--wf-rgb, 52,152,219), 0.5),
                0 0 60px -20px rgba(var(--wf-rgb, 52,152,219), 0.3);
    border: 1px solid rgba(var(--wf-rgb, 52,152,219), 0.3);
}

/* Свечение в углу — как в hero профиля */
.wiki-footer::before {
    content: '';
    position: absolute;
    top: -50%; right: -10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(var(--wf-rgb, 52,152,219), 0.3), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: wfGlow 8s ease-in-out infinite;
}

@keyframes wfGlow {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    50% { transform: translate(-20px, 20px) scale(1.1); opacity: 1; }
}

/* Верхняя цветная полоса с анимацией */
.wiki-footer::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg,
        var(--wf-color) 0%,
        rgba(var(--wf-rgb), 0.3) 50%,
        var(--wf-color) 100%);
    background-size: 200% 100%;
    animation: wfBar 6s linear infinite;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 0 20px rgba(var(--wf-rgb), 0.7);
}

@keyframes wfBar {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
}

.wiki-footer p {
    position: relative;
    z-index: 1;
    margin: 0 0 14px 0;
    color: rgba(212, 212, 232, 0.85);
    line-height: 1.75;
}

.wiki-footer-brand {
    padding-bottom: 16px;
    margin-bottom: 18px !important;
    border-bottom: 1px dashed rgba(var(--wf-rgb), 0.3);
    color: rgba(224, 224, 238, 0.95) !important;
}

.wiki-footer-brand strong { color: #ffffff; font-weight: 800; }
.wiki-footer-brand em {
    color: var(--wf-color);
    font-style: italic;
    font-weight: 700;
}

.wiki-footer a {
    color: var(--wf-color);
    text-decoration: none;
    font-weight: 700;
    border-bottom: 1px solid transparent;
    transition: all 0.2s;
}

.wiki-footer a:hover {
    border-bottom-color: var(--wf-color);
    color: #ffffff;
}

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
    background: rgba(var(--wf-rgb), 0.15);
    border: 1px solid rgba(var(--wf-rgb), 0.4);
    border-radius: 20px;
    color: var(--wf-color) !important;
    font-size: 0.85rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    border-bottom: none !important;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.wiki-footer-links a:hover {
    background: rgba(var(--wf-rgb), 0.35);
    border-color: var(--wf-color);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -4px rgba(var(--wf-rgb), 0.6);
    color: #ffffff !important;
}

@media (max-width: 600px) {
    .wiki-footer { padding: 24px 20px 20px; margin: 40px 0 24px 0; border-radius: 14px; }
    .wiki-footer-links a { padding: 6px 12px; font-size: 0.78rem; }
}
`;
        document.head.appendChild(style);
    }

    function createFooter() {
        var footer = document.createElement('div');
        footer.className = 'wiki-footer';
        footer.id = 'wiki-footer-block';
        footer.setAttribute('role', 'contentinfo');
        footer.innerHTML =
            '<p>Материалы «Марсианской энциклопедии» доступны по лицензии ' +
            '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru" target="_blank" rel="noopener">' +
            'Creative Commons «Attribution-NonCommercial-NoDerivs» (BY-NC-ND) 4.0</a>. ' +
            'Отдельные элементы могут иметь собственные условия использования — ' +
            'подробнее см. <a href="/license/">Условия использования</a>.</p>' +
            '<p class="wiki-footer-brand"><strong>Марсианская энциклопедия</strong>® — ' +
            'научно-художественный справочный проект по вселенной цикла романов ' +
            '<em>«Письмо из Красной пыли»</em>. ' +
            'Реконструкция истории Марса в Эпоху Умирания, основанная на научных данных ' +
            'и художественной концепции автора.</p>' +
            '<div class="wiki-footer-links">' +
            '<a href="/privacy/">Политика конфиденциальности</a>' +
            '<a href="/about/">Описание проекта</a>' +
            '<a href="/contact/">Связаться с нами</a>' +
            '<a href="/code-of-conduct/">Кодекс поведения</a>' +
            '<a href="/statistics/">Статистика</a>' +
            '</div>';
        return footer;
    }

    function findContainer() {
        var rst = document.querySelector('.rst-content');
        if (rst && rst.parentElement) return rst.parentElement;
        var wy = document.querySelector('.wy-nav-content');
        if (wy) return wy;
        return document.body;
    }

    function placeFooter() {
        var footer = document.getElementById('wiki-footer-block');
        var container = findContainer();

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

    function refresh() {
        var color = detectColor();
        applyColor(color);
        return color;
    }

    function init() {
        injectStyles();
        refresh();
        placeFooter();

        // Несколько раз при загрузке
        setTimeout(function() { refresh(); placeFooter(); }, 300);
        setTimeout(function() { refresh(); placeFooter(); }, 1000);
        setTimeout(function() { refresh(); placeFooter(); }, 2500);

        // Mutation observer — держим футер внизу
        var observer = new MutationObserver(function() {
            placeFooter();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Следим за сменой URL (readthedocs SPA)
        var lastUrl = location.href;
        setInterval(function() {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                var old = document.getElementById('wiki-footer-block');
                if (old) old.remove();
                setTimeout(function() { refresh(); placeFooter(); }, 300);
                setTimeout(placeFooter, 1000);
            }
        }, 500);

        // Проверяем цвет раз в 5 секунд (без спама в консоль)
        var lastColor = detectColor();
        setInterval(function() {
            var current = detectColor();
            if (current !== lastColor) {
                lastColor = current;
                applyColor(current);
            }
        }, 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('📄 wikipedia-footer v8: активен');
})();
