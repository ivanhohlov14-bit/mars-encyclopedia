// ============================================================
// auto-categories.js — v3 VIP
// Категории статей внизу статьи (перед комментариями)
// - Вставка ПЕРЕД комментариями / лайками
// - Относительные ссылки (работает на localhost/проде/preview)
// - CSS встроен
// - Retry если контент ещё не отрисован
// - Поддержка MkDocs Material (document$)
// - Safe от prototype pollution
// - Escape данных, dedupe, анимация
// - Публичное API: window.marsAutoCategories.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsAutoCategoriesLoaded) return;
    window.__marsAutoCategoriesLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var BLOCK_ID = 'auto-categories';
    var CATEGORIES_PATH = '/categories/';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🏷️ categories:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 📚 Словарь категорий
    // ============================================================
    var CATEGORY_MAP = {
        'history':     'История',
        'geography':   'География',
        'astronomy':   'Астрономия',
        'people':      'Персоналии',
        'mythology':   'Мифология',
        'biology':     'Биология',
        'terms':       'Термины',
        'books':       'Книги',
        'lists':       'Избранные списки',
        'science':     'Наука',
        'game':        'Игра',
        'periodization':      'Периодизация',
        'timeline':           'Хронология',
        'epokha-osnovaniya':  'Эпоха Основания',
        'epokha-rascveta':    'Эпоха Расцвета',
        'epokha-umiraniya':   'Эпоха Умирания',
        'iskhod':             'Исход',
        'pirate-kingdom':     'Пиратское королевство',
        'myths':              'Мифы и легенды',
        'edem':               'Эдем',
        'arkadia-history':    'Аркадия',
        'serpentida-history': 'Серпентида',
        'hellas-history':     'Эллада',
        'kimeria-history':    'Кимерия',
        'eritrea-history':    'Эритрея',
        'utopia-history':     'Утопия',
        'eridania-history':   'Эридания',
        'khong-history':      'Кхонг',
        'avsonia-history':    'Авсония',
        'acidalia-sea':       'Ацидалийское море',
        'okhasen':            'Окхасен',
        'rogen-aria':         'Роген-Ария',
        'farsida':            'Фарсида',
        'farsida-caves':      'Пещеры Фарсиды',
        'ksanf-river':        'Река Ксанф',
        'eritreya':           'Эритрея',
        'utopiya':            'Утопия',
        'tarsis':             'Тарсис',
        'noviy-okhasen':      'Новый Окхасен',
        'akademiya-okhasena': 'Академия Окхасена',
        'mars-sky':        'Небо Марса',
        'phobos-deimos':   'Фобос и Деймос',
        'earth':           'Земля',
        'earth-as-target': 'Земля как цель',
        'hevsur':    'Хевсур',
        'talin':     'Талин',
        'ella':      'Элла',
        'yarra':     'Йарра',
        'alira':     'Алира',
        'aratan-iii':'Аратан III',
        'irayina':   'Ирайна',
        'miran':     'Миран',
        'kharan':    'Харан',
        'soviya':    'Совия',
        'arash':     'Араш',
        'kan':       'Кан',
        'eden-kings':       'Короли Эдема',
        'ksanf-pirates':    'Пиратские короли Ксанфа',
        'serpentida-kings': 'Короли Серпентиды',
        'hellas-rulers':    'Правители Эллады',
        'arkadia-princes':  'Держатели ветра',
        'utopia-admirals':  'Адмиралы Утопии',
        'khong-masters':    'Мастера Кхонга',
        'great-scribes':    'Великие писцы',
        'index':    'Обзор',
        'lan-sur':  'Lān sur',
        'tablichki':'Таблички',
        'gemotsianin': 'Гемоцианин',
        'geology':  'Геология',
        'kho':      'Кхо',
        'akha':     'Акха',
        'araksis':  'Араксис',
        'prorochestvo-kharana': 'Пророчество Харана'
    };

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('auto-categories-style')) return;
        var s = document.createElement('style');
        s.id = 'auto-categories-style';
        s.textContent = `
            #${BLOCK_ID} {
                margin: 40px 0 24px 0;
                padding: 16px 20px;
                background: linear-gradient(135deg, rgba(108,99,255,.05), rgba(162,155,254,.02));
                border: 1px solid rgba(108,99,255,.18);
                border-radius: 16px;
                animation: catFadeIn .45s cubic-bezier(.16,1,.3,1) both;
            }
            @keyframes catFadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            #${BLOCK_ID} .cat-header {
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #${BLOCK_ID} .cat-label {
                font-size: .72rem;
                text-transform: uppercase;
                letter-spacing: 1.2px;
                font-weight: 800;
                color: #6C63FF;
            }
            #${BLOCK_ID} .cat-label::before {
                content: '🏷️';
                margin-right: 6px;
                font-size: .9rem;
            }
            #${BLOCK_ID} .cat-chips {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            #${BLOCK_ID} .cat-chip {
                display: inline-flex;
                align-items: center;
                padding: 6px 14px;
                background: #fff;
                border: 1.5px solid rgba(108,99,255,.25);
                border-radius: 20px;
                color: #4a4a68;
                font-size: .82rem;
                font-weight: 700;
                text-decoration: none !important;
                transition: all .25s cubic-bezier(.16,1,.3,1);
                font-family: inherit;
                line-height: 1.2;
                -webkit-tap-highlight-color: transparent;
                cursor: pointer;
            }
            #${BLOCK_ID} .cat-chip:hover {
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff;
                border-color: #6C63FF;
                transform: translateY(-2px);
                box-shadow: 0 8px 18px -4px rgba(108,99,255,.45);
            }
            #${BLOCK_ID} .cat-chip:active {
                transform: translateY(0) scale(.97);
            }

            /* Тёмная тема */
            body.mars-stars-on #${BLOCK_ID} {
                background: linear-gradient(135deg, rgba(108,99,255,.12), rgba(162,155,254,.04));
                border-color: rgba(162,155,254,.25);
            }
            body.mars-stars-on #${BLOCK_ID} .cat-chip {
                background: rgba(255,255,255,.06);
                border-color: rgba(162,155,254,.35);
                color: #d0d0e8;
            }
            body.mars-stars-on #${BLOCK_ID} .cat-chip:hover {
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff;
            }

            /* Мобильный */
            @media (max-width: 600px) {
                #${BLOCK_ID} { padding: 12px 14px; margin: 28px 0 18px 0; }
                #${BLOCK_ID} .cat-chip { padding: 5px 11px; font-size: .76rem; }
                #${BLOCK_ID} .cat-label { font-size: .68rem; }
            }

            @media (prefers-reduced-motion: reduce) {
                #${BLOCK_ID}, #${BLOCK_ID} .cat-chip {
                    animation: none !important;
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🔍 Разбор URL → категории
    // ============================================================
    function getCategoriesFromURL() {
        var path = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
        var categories = [];
        var seen = Object.create(null);

        for (var i = 0; i < path.length; i++) {
            var segment = path[i];
            if (!segment) continue;
            if (Object.prototype.hasOwnProperty.call(CATEGORY_MAP, segment)) {
                var name = CATEGORY_MAP[segment];
                if (!seen[name]) {
                    categories.push({ name: name, slug: segment });
                    seen[name] = true;
                }
            }
        }
        return categories;
    }

    // ============================================================
    // 🎯 Найти контентную область
    // ============================================================
    function getContentRoot() {
        return document.querySelector('.md-content__inner') ||
               document.querySelector('.rst-content') ||
               document.querySelector('article') ||
               document.querySelector('.document') ||
               null;
    }

    // ============================================================
    // 🎯 Найти КУДА вставить блок — в самый низ статьи,
    //    но ПЕРЕД комментариями / лайками / hr-разделителем
    // ============================================================
    function findInsertTarget(content) {
        // 1. Разделитель комментариев (comments-loader.js)
        var commentsHr = document.getElementById('comments-loader-hr');
        if (commentsHr && commentsHr.parentNode) return commentsHr;

        // 2. Заголовок комментариев
        var commentsHeading = document.getElementById('comments-loader-heading');
        if (commentsHeading && commentsHeading.parentNode) return commentsHeading;

        // 3. Контейнер комментариев
        var commentsContainer = document.getElementById('comments-container');
        if (commentsContainer && commentsContainer.parentNode) return commentsContainer;

        // 4. Виджет лайков (article-tools.js)
        var articleTools = document.getElementById('article-tools-widget');
        if (articleTools && articleTools.parentNode) return articleTools;

        // 5. Если ничего нет — возвращаем null → блок уйдёт в конец контента
        return null;
    }

    // ============================================================
    // 🖼️ Рендер блока
    // ============================================================
    function renderCategories() {
        var content = getContentRoot();
        if (!content) return false;

        var old = document.getElementById(BLOCK_ID);
        if (old) old.remove();

        var categories = getCategoriesFromURL();
        if (!categories.length) {
            log('категорий не найдено в пути');
            return true;
        }

        // Базовый URL категорий (учитываем <base> MkDocs)
        var baseUrl = CATEGORIES_PATH;
        var baseTag = document.querySelector('base');
        if (baseTag && baseTag.href) {
            try {
                var basePath = new URL(baseTag.href).pathname;
                if (basePath && basePath !== '/') {
                    baseUrl = basePath.replace(/\/$/, '') + CATEGORIES_PATH;
                }
            } catch(e) {}
        }

        var html = '<div class="cat-inner">';
        html += '<div class="cat-header"><span class="cat-label">Категории</span></div>';
        html += '<div class="cat-chips">';
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            var href = baseUrl + '#' + encodeURIComponent(cat.slug);
            html += '<a class="cat-chip" href="' + escapeHtml(href) + '" data-segment="' + escapeHtml(cat.slug) + '">' +
                    escapeHtml(cat.name) +
                    '</a>';
        }
        html += '</div></div>';

        var block = document.createElement('div');
        block.id = BLOCK_ID;
        block.innerHTML = html;

        // 🎯 Вставляем ПЕРЕД комментариями/лайками
        var target = findInsertTarget(content);
        try {
            if (target) {
                target.parentNode.insertBefore(block, target);
                log('вставлен перед', target.id || target.className);
            } else {
                content.appendChild(block);
                log('вставлен в конец content');
            }
        } catch(e) {
            // Fallback на случай, если target исчез
            content.appendChild(block);
        }

        log('отрисовано категорий:', categories.length);
        return true;
    }

    // ============================================================
    // 🔄 Запуск с retry
    // ============================================================
    var _retryTimer = null;
    var _retryCount = 0;
    var MAX_RETRIES = 10;

    function run() {
        var ok = renderCategories();
        if (ok) {
            if (_retryTimer) { clearTimeout(_retryTimer); _retryTimer = null; }
            _retryCount = 0;
            return;
        }
        if (_retryCount++ > MAX_RETRIES) return;
        if (_retryTimer) clearTimeout(_retryTimer);
        _retryTimer = setTimeout(function() {
            _retryTimer = null;
            run();
        }, 400);
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    function init() {
        injectStyles();

        // Обычная загрузка
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(run, 100);
            });
        } else {
            setTimeout(run, 100);
        }

        // Ещё раз позже — на случай если комментарии подгрузились
        // после нас (тогда блок переедет вниз перед ними)
        setTimeout(run, 1500);
        setTimeout(run, 3500);

        // MkDocs Material SPA
        if (typeof document$ !== 'undefined' && document$.subscribe) {
            try {
                document$.subscribe(function() {
                    _retryCount = 0;
                    setTimeout(run, 150);
                });
            } catch(e) {}
        }

        // MutationObserver — если comments-loader вставит свой hr позже
        if (typeof MutationObserver !== 'undefined') {
            var obs = new MutationObserver(function(mutations) {
                // Ищем появление comments-loader-hr или comments-container
                var needRerender = false;
                for (var i = 0; i < mutations.length; i++) {
                    var m = mutations[i];
                    if (!m.addedNodes || !m.addedNodes.length) continue;
                    for (var j = 0; j < m.addedNodes.length; j++) {
                        var n = m.addedNodes[j];
                        if (n.nodeType !== 1) continue;
                        if (n.id === 'comments-loader-hr' ||
                            n.id === 'comments-container' ||
                            n.id === 'article-tools-widget') {
                            needRerender = true;
                            break;
                        }
                    }
                    if (needRerender) break;
                }
                if (needRerender) {
                    clearTimeout(init._obsT);
                    init._obsT = setTimeout(run, 200);
                }
            });
            try {
                obs.observe(document.body, { childList: true, subtree: true });
                // Auto-disconnect через 15 сек
                setTimeout(function() { try { obs.disconnect(); } catch(e) {} }, 15000);
            } catch(e) {}
        }
    }

    init();

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsAutoCategories = {
        refresh: run,
        getCategories: getCategoriesFromURL,
        remove: function() {
            var el = document.getElementById(BLOCK_ID);
            if (el) el.remove();
        }
    };

    if (DEBUG) console.log('✅ auto-categories.js v3 VIP загружен');
})();
