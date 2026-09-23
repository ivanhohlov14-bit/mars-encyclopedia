// ============================================================
// wikipedia-footer.js — FINAL v16
// - Цвет королевства из БД (Supabase) + кэш
// - Кнопка «Поддержать проект» в ряду ссылок футера
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // CONFIG
    // ============================================================
    var DEFAULT_COLOR = '#3498db';
    var STORAGE_KEY = 'mars_kingdom_color';
    var DONATE_URL = 'https://pay.cloudtips.ru/p/14549541';
    var FOOTER_ID = 'wiki-footer-block';
    var STYLES_ID = 'wf-styles';

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

    // ============================================================
    // UTILS
    // ============================================================
    function hexToRgb(hex) {
        var c = (hex || DEFAULT_COLOR).replace('#', '');
        if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
        var n = parseInt(c, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    function getCachedColor() {
        try {
            var s = localStorage.getItem(STORAGE_KEY);
            if (s && /^#[0-9a-fA-F]{6}$/.test(s)) return s;
        } catch(e) {}
        return null;
    }

    function applyColor(color) {
        var rgb = hexToRgb(color);
        var root = document.documentElement;
        root.style.setProperty('--wf-color', color);
        root.style.setProperty('--wf-rgb', rgb.r + ',' + rgb.g + ',' + rgb.b);
    }

    // ============================================================
    // FETCH: цвет королевства из БД
    // ============================================================
    async function fetchColorFromDB() {
        try {
            var sb = window.supabaseClient;
            if (!sb) return null;

            var sessionRes = await sb.auth.getSession();
            var user = sessionRes && sessionRes.data && sessionRes.data.session
                ? sessionRes.data.session.user : null;
            if (!user) return null;

            var res = await sb.from('profiles')
                .select('kingdom')
                .eq('user_id', user.id)
                .single();

            if (res.error || !res.data || !res.data.kingdom) return null;

            var kingdom = res.data.kingdom;
            var color = KINGDOM_COLORS[kingdom];
            if (!color) return null;

            try { localStorage.setItem(STORAGE_KEY, color); } catch(e) {}
            console.log('🎨 Цвет из БД:', kingdom, '→', color);
            return color;
        } catch(e) {
            console.warn('🎨 Ошибка запроса цвета:', e);
            return null;
        }
    }

    // ============================================================
    // STYLES
    // ============================================================
    function injectStyles() {
        if (document.getElementById(STYLES_ID)) return;
        var s = document.createElement('style');
        s.id = STYLES_ID;
        s.textContent = `

/* ========== BASE ========== */
.wiki-footer {
    position: relative;
    margin: 60px 0 30px;
    padding: 28px 32px 24px;
    border-radius: 18px;
    font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.88rem;
    line-height: 1.7;
    color: #333;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(var(--wf-rgb, 52,152,219), 0.3);
    box-shadow:
        0 6px 24px -6px rgba(var(--wf-rgb, 52,152,219), 0.25),
        0 0 0 1px rgba(255,255,255,.6) inset;
    contain: layout style;
}

/* WAVE BACKGROUND */
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

/* TOP BAR */
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

.wiki-footer > * { position: relative; z-index: 1; }

/* TEXT */
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

/* LINKS */
.wiki-footer a {
    color: var(--wf-color, #3498db);
    text-decoration: none;
    font-weight: 700;
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s;
}
.wiki-footer a:hover { border-bottom-color: var(--wf-color, #3498db); }

/* ========== FOOTER LINKS ROW ========== */
.wiki-footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 16px;
    margin-top: 4px;
    align-items: center;
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

/* ========== DONATE BUTTON (в ряду с ссылками) ========== */
.wf-donate-btn {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 16px !important;
    background: var(--wf-color, #3498db) !important;
    color: #fff !important;
    border-radius: 20px !important;
    font-weight: 700 !important;
    font-size: 0.85rem !important;
    letter-spacing: 0.2px;
    text-decoration: none !important;
    border: 1px solid var(--wf-color, #3498db) !important;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(var(--wf-rgb, 52,152,219), 0.3);
    -webkit-tap-highlight-color: transparent;
    margin-left: auto;
}
.wf-donate-btn:hover {
    filter: brightness(1.12);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px -4px rgba(var(--wf-rgb, 52,152,219), 0.55);
    color: #fff !important;
    border-bottom: 1px solid var(--wf-color, #3498db) !important;
}
.wf-donate-btn:active {
    transform: translateY(0);
}
.wf-donate-icon {
    font-size: 0.95rem;
    line-height: 1;
}

/* ========== DARK THEME ========== */
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

/* ========== MOBILE ========== */
@media (max-width: 600px) {
    .wiki-footer { padding: 22px 18px 18px; margin: 40px 0 20px; border-radius: 14px; }
    .wiki-footer-links { gap: 6px; }
    .wiki-footer-links a { padding: 7px 13px; font-size: 0.78rem; }
    .wf-donate-btn {
        padding: 7px 14px !important;
        font-size: 0.78rem !important;
        margin-left: 0;
        width: 100%;
        margin-top: 4px;
    }
}

/* ========== REDUCED MOTION ========== */
@media (prefers-reduced-motion: reduce) {
    .wiki-footer::before,
    .wiki-footer::after { animation: none !important; }
    .wiki-footer-links a,
    .wf-donate-btn { transition: none !important; }
}
`;
        document.head.appendChild(s);
    }

    // ============================================================
    // FOOTER HTML
    // ============================================================
    function createFooter() {
        var f = document.createElement('div');
        f.className = 'wiki-footer';
        f.id = FOOTER_ID;

        var html = '';
        html += '<p><strong>Авторские материалы</strong> «Марсианской энциклопедии» доступны по лицензии ' +
                '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru" target="_blank" rel="noopener">' +
                'Creative Commons «Attribution-NonCommercial-NoDerivs» (BY-NC-ND) 4.0</a>. ' +
                'Отдельные элементы могут иметь собственные условия использования — ' +
                'подробнее см. <a href="/license/">Условия использования</a>.</p>';

        html += '<p class="wiki-footer-brand"><strong>Марсианская энциклопедия</strong> — ' +
                'научно-художественный справочный проект по вселенной цикла романов ' +
                '<em>«Письмо из Красной пыли»</em>. Реконструкция истории Марса ' +
                'в Эпоху Умирания, основанная на научных данных и художественной концепции автора.</p>';

        // Кнопка доната — последняя в ряду ссылок
        html += '<div class="wiki-footer-links">' +
                '<a href="/privacy/">Политика конфиденциальности</a>' +
                '<a href="/about/">Описание проекта</a>' +
                '<a href="/contact/">Связаться с нами</a>' +
                '<a href="/code-of-conduct/">Кодекс поведения</a>' +
                '<a href="/statistics/">Статистика</a>' +
                '<a class="wf-donate-btn" href="' + DONATE_URL + '" target="_blank" rel="noopener">' +
                '❤️ Поддержать проект' +
                '</a>' +
                '</div>';

        f.innerHTML = html;
        return f;
    }

    // ============================================================
    // PLACEMENT
    // ============================================================
    function findContainer() {
        var rst = document.querySelector('.rst-content');
        if (rst && rst.parentElement) return rst.parentElement;
        return document.querySelector('.wy-nav-content') || document.body;
    }

    function placeFooter() {
        var f = document.getElementById(FOOTER_ID);
        var c = findContainer();
        if (!f) {
            c.appendChild(createFooter());
            return;
        }
        if (f.parentElement !== c || c.lastElementChild !== f) {
            c.appendChild(f);
        }
    }

    // ============================================================
    // START
    // ============================================================
    async function start() {
        var cached = getCachedColor();
        if (cached) applyColor(cached);

        injectStyles();
        placeFooter();

        var fresh = await fetchColorFromDB();
        if (fresh && fresh !== cached) {
            applyColor(fresh);
            console.log('🎨 Цвет обновлён:', fresh);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    setTimeout(placeFooter, 800);
    setTimeout(placeFooter, 1800);

    // Смена страницы (readthedocs)
    var lastUrl = location.href;
    setInterval(function() {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            var old = document.getElementById(FOOTER_ID);
            if (old) old.remove();
            setTimeout(placeFooter, 200);
            setTimeout(placeFooter, 800);
        }
    }, 600);

    // ============================================================
    // DEBUG
    // ============================================================
    window.wfDebug = async function() {
        console.log('📦 localStorage:', localStorage.getItem(STORAGE_KEY));
        console.log('🌐 CSS --wf-color:', getComputedStyle(document.documentElement).getPropertyValue('--wf-color'));
        console.log('🌐 CSS --wf-rgb:', getComputedStyle(document.documentElement).getPropertyValue('--wf-rgb'));
        console.log('💛 Donate URL:', DONATE_URL);
        var fresh = await fetchColorFromDB();
        console.log('🔥 Из БД:', fresh);
        if (fresh) applyColor(fresh);
        return fresh;
    };

    window.wfReset = function() {
        try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
        location.reload();
    };
})();
