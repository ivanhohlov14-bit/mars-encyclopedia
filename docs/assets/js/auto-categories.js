// auto-categories.js — категории статей (v4, без emoji)
(function() {
    'use strict';

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
    // ПОЛУЧИТЬ КАТЕГОРИИ ИЗ URL
    // ============================================================
    function getCategoriesFromURL() {
        var path = window.location.pathname
            .replace(/^\/|\/$/g, '')
            .split('/');
        var categories = [];
        var seen = {};

        for (var i = 0; i < path.length; i++) {
            var segment = path[i];
            if (!segment) continue;
            var name = CATEGORY_MAP[segment];
            if (name && !seen[name]) {
                categories.push({ name: name, slug: segment });
                seen[name] = true;
            }
        }
        return categories;
    }

    // ============================================================
    // ОТРИСОВАТЬ БЛОК
    // ============================================================
    function renderCategories() {
        var content = document.querySelector('.md-content__inner, .rst-content, article, .document');
        if (!content) return;

        var old = document.getElementById('auto-categories');
        if (old) old.remove();

        var categories = getCategoriesFromURL();
        if (!categories.length) return;

        var block = document.createElement('div');
        block.id = 'auto-categories';

        var html = '<div class="cat-inner">';
        html += '<div class="cat-header"><span class="cat-label">Категории</span></div>';
        html += '<div class="cat-chips">';

        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            // ✅ Ссылка на страницу категорий с якорем
            html += '<a class="cat-chip" href="https://mars-wiki.ru/categories/#' + encodeURIComponent(cat.slug) + '">';
            html += cat.name;
            html += '</a>';
        }

        html += '</div></div>';
        block.innerHTML = html;
        content.appendChild(block);
    }

    function run() {
        renderCategories();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function() {
            setTimeout(run, 100);
        });
    }
})();
