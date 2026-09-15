// auto-categories.js — автоматические категории внизу страницы (в стиле Википедии)
(function() {
    'use strict';

    // ============================================================
    // СЛОВАРЬ КАТЕГОРИЙ ПО ПУТЯМ
    // ============================================================
    const CATEGORY_MAP = {
        // Разделы
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

        // История
        'periodization': 'Периодизация',
        'timeline':      'Хронология',
        'epokha-osnovaniya': 'Эпоха Основания',
        'epokha-rascveta':   'Эпоха Расцвета',
        'epokha-umiraniya':  'Эпоха Умирания',
        'iskhod':            'Исход',
        'pirate-kingdom':    'Пиратское королевство',
        'myths':             'Мифы и легенды',
        'edem':              'Эдем',
        'arkadia-history':   'Аркадия',
        'serpentida-history':'Серпентида',
        'hellas-history':    'Эллада',
        'kimeria-history':   'Кимерия',
        'eritrea-history':   'Эритрея',
        'utopia-history':    'Утопия',
        'eridania-history':  'Эридания',
        'khong-history':     'Кхонг',
        'avsonia-history':   'Авсония',

        // География
        'acidalia-sea':    'Ацидалийское море',
        'okhasen':         'Окхасен',
        'rogen-aria':      'Роген-Ария',
        'farsida':         'Фарсида',
        'farsida-caves':   'Пещеры Фарсиды',
        'ksanf-river':     'Река Ксанф',
        'eritreya':        'Эритрея',
        'utopiya':         'Утопия',
        'tarsis':          'Тарсис',
        'noviy-okhasen':   'Новый Окхасен',
        'akademiya-okhasena': 'Академия Окхасена',

        // Астрономия
        'mars-sky':        'Небо Марса',
        'phobos-deimos':   'Фобос и Деймос',
        'earth':           'Земля',
        'earth-as-target': 'Земля как цель',

        // Люди
        'hevsur':          'Хевсур',
        'talin':           'Талин',
        'ella':            'Элла',
        'yarra':           'Йарра',
        'alira':           'Алира',
        'aratan-iii':      'Аратан III',
        'irayina':         'Ирайна',
        'miran':           'Миран',
        'kharan':          'Харан',
        'soviya':          'Совия',
        'arash':           'Араш',
        'kan':             'Кан',

        // Списки
        'eden-kings':      'Короли Эдема',
        'ksanf-pirates':   'Пиратские короли Ксанфа',
        'serpentida-kings':'Короли Серпентиды',
        'hellas-rulers':   'Правители Эллады',
        'arkadia-princes': 'Держатели ветра',
        'utopia-admirals': 'Адмиралы Утопии',
        'khong-masters':   'Мастера Кхонга',
        'great-scribes':   'Великие писцы',
        'index':           'Обзор',

        // Термины и прочее
        'lan-sur':         'Lān sur',
        'tablichki':       'Таблички',
        'gemotsianin':     'Гемоцианин',
        'geology':         'Геология',
        'kho':             'Кхо',
        'akha':            'Акха',
        'araksis':         'Араксис',
        'prorochestvo-kharana': 'Пророчество Харана',
        'acidalia-sea':    'Ацидалийское море'
    };

    // ============================================================
    // ПОЛУЧИТЬ КАТЕГОРИИ ИЗ URL
    // ============================================================
    function getCategoriesFromURL() {
        const path = window.location.pathname
            .replace(/^\/|\/$/g, '')  // убрать слеши
            .split('/');
        const categories = [];
        const seen = new Set();

        path.forEach(segment => {
            if (!segment) return;
            const cat = CATEGORY_MAP[segment];
            if (cat && !seen.has(cat)) {
                categories.push(cat);
                seen.add(cat);
            }
        });

        return categories;
    }

    // ============================================================
    // ОТРИСОВАТЬ БЛОК КАТЕГОРИЙ
    // ============================================================
    function renderCategories() {
        // Ищем контент-область
        const content = document.querySelector('.md-content__inner, .rst-content, article, .document');
        if (!content) return;

        const categories = getCategoriesFromURL();
        if (!categories.length) return;

        // Убираем старый блок, если есть
        const old = document.getElementById('auto-categories');
        if (old) old.remove();

        // Создаём блок
        const block = document.createElement('div');
        block.id = 'auto-categories';
        block.style.cssText = `
            margin-top: 40px;
            padding: 14px 18px;
            background: var(--block-bg, #f8f9fa);
            border: 1px solid #c8ccd1;
            border-radius: 8px;
            font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.9rem;
            line-height: 1.7;
        `;

        let html = '<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">';
        html += '<span style="color:#888; font-weight:600; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.5px;">Категории:</span>';

        categories.forEach((cat, i) => {
            html += `<a href="/category/${encodeURIComponent(cat.toLowerCase())}/" style="
                display: inline-block;
                padding: 3px 10px;
                background: rgba(108,99,255,0.1);
                border: 1px solid rgba(108,99,255,0.3);
                border-radius: 14px;
                color: #6C63FF;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.85rem;
                transition: all 0.2s;
            " onmouseover="this.style.background='rgba(108,99,255,0.2)'" onmouseout="this.style.background='rgba(108,99,255,0.1)'">${cat}</a>`;
        });

        html += '</div>';
        block.innerHTML = html;
        content.appendChild(block);
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderCategories);
    } else {
        renderCategories();
    }

    // SPA (Material instant loading)
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function() {
            setTimeout(renderCategories, 200);
        });
    }
})();
