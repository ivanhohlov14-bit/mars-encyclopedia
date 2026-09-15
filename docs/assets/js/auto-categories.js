// auto-categories.js — категории статей (VIP v3)
(function() {
    'use strict';

    // ============================================================
    // 🗺️ СЛОВАРЬ КАТЕГОРИЙ
    // ============================================================
    var CATEGORY_MAP = {
        // Разделы верхнего уровня
        'history':     { name: 'История',     icon: '📜' },
        'geography':   { name: 'География',   icon: '🗺️' },
        'astronomy':   { name: 'Астрономия',  icon: '🔭' },
        'people':      { name: 'Персоналии',  icon: '👤' },
        'mythology':   { name: 'Мифология',   icon: '🛕' },
        'biology':     { name: 'Биология',    icon: '🧬' },
        'terms':       { name: 'Термины',     icon: '📖' },
        'books':       { name: 'Книги',       icon: '📚' },
        'lists':       { name: 'Избранные списки', icon: '⭐' },
        'science':     { name: 'Наука',       icon: '🔬' },
        'game':        { name: 'Игра',        icon: '🎮' },

        // История
        'periodization':      { name: 'Периодизация', icon: '📅' },
        'timeline':           { name: 'Хронология',    icon: '⏳' },
        'epokha-osnovaniya':  { name: 'Эпоха Основания', icon: '🌱' },
        'epokha-rascveta':    { name: 'Эпоха Расцвета',  icon: '☀️' },
        'epokha-umiraniya':   { name: 'Эпоха Умирания',  icon: '🌑' },
        'iskhod':             { name: 'Исход',          icon: '🚀' },
        'pirate-kingdom':     { name: 'Пиратское королевство', icon: '🏴‍☠️' },
        'myths':              { name: 'Мифы и легенды', icon: '✨' },
        'edem':               { name: 'Эдем',           icon: '🏛️' },
        'arkadia-history':    { name: 'Аркадия',        icon: '⛰️' },
        'serpentida-history': { name: 'Серпентида',     icon: '🐍' },
        'hellas-history':     { name: 'Эллада',         icon: '🏺' },
        'kimeria-history':    { name: 'Кимерия',        icon: '🏹' },
        'eritrea-history':    { name: 'Эритрея',        icon: '⚓' },
        'utopia-history':     { name: 'Утопия',         icon: '🌊' },
        'eridania-history':   { name: 'Эридания',       icon: '💎' },
        'khong-history':      { name: 'Кхонг',          icon: '⛏️' },
        'avsonia-history':    { name: 'Авсония',        icon: '🐟' },

        // География
        'acidalia-sea':       { name: 'Ацидалийское море', icon: '🌊' },
        'okhasen':            { name: 'Окхасен',        icon: '🏙️' },
        'rogen-aria':         { name: 'Роген-Ария',     icon: '🏛️' },
        'farsida':            { name: 'Фарсида',        icon: '🏔️' },
        'farsida-caves':      { name: 'Пещеры Фарсиды', icon: '🕳️' },
        'ksanf-river':        { name: 'Река Ксанф',     icon: '🌊' },
        'eritreya':           { name: 'Эритрея',        icon: '⚓' },
        'utopiya':            { name: 'Утопия',         icon: '🌊' },
        'tarsis':             { name: 'Тарсис',         icon: '🗺️' },
        'noviy-okhasen':      { name: 'Новый Окхасен',  icon: '🏙️' },
        'akademiya-okhasena': { name: 'Академия Окхасена', icon: '📚' },

        // Астрономия
        'mars-sky':        { name: 'Небо Марса',   icon: '🌌' },
        'phobos-deimos':   { name: 'Фобос и Деймос', icon: '🌙' },
        'earth':           { name: 'Земля',        icon: '🌍' },
        'earth-as-target': { name: 'Земля как цель', icon: '🎯' },

        // Персоналии
        'hevsur':    { name: 'Хевсур',     icon: '📜' },
        'talin':     { name: 'Талин',      icon: '⭐' },
        'ella':      { name: 'Элла',       icon: '🔬' },
        'yarra':     { name: 'Йарра',      icon: '✨' },
        'alira':     { name: 'Алира',      icon: '👤' },
        'aratan-iii':{ name: 'Аратан III', icon: '👑' },
        'irayina':   { name: 'Ирайна',     icon: '🧬' },
        'miran':     { name: 'Миран',      icon: '⚙️' },
        'kharan':    { name: 'Харан',      icon: '🔮' },
        'soviya':    { name: 'Совия',      icon: '🎵' },
        'arash':     { name: 'Араш',       icon: '⚔️' },
        'kan':       { name: 'Кан',        icon: '👤' },

        // Избранные списки
        'eden-kings':       { name: 'Короли Эдема',         icon: '👑' },
        'ksanf-pirates':    { name: 'Пиратские короли Ксанфа', icon: '🏴‍☠️' },
        'serpentida-kings': { name: 'Короли Серпентиды',    icon: '🐍' },
        'hellas-rulers':    { name: 'Правители Эллады',     icon: '🏺' },
        'arkadia-princes':  { name: 'Держатели ветра',      icon: '⛰️' },
        'utopia-admirals':  { name: 'Адмиралы Утопии',      icon: '⚓' },
        'khong-masters':    { name: 'Мастера Кхонга',       icon: '⛏️' },
        'great-scribes':    { name: 'Великие писцы',        icon: '📜' },

        // Прочее
        'index':    { name: 'Обзор',           icon: '📄' },
        'lan-sur':  { name: 'Lān sur',         icon: '🗣️' },
        'tablichki':{ name: 'Таблички',        icon: '📋' },
        'gemotsianin': { name: 'Гемоцианин',   icon: '🧪' },
        'geology':  { name: 'Геология',        icon: '🪨' },
        'kho':      { name: 'Кхо',             icon: '🔥' },
        'akha':     { name: 'Акха',            icon: '💧' },
        'araksis':  { name: 'Араксис',         icon: '⭐' },
        'prorochestvo-kharana': { name: 'Пророчество Харана', icon: '🔮' }
    };

    // ============================================================
    // 🔍 ПОЛУЧИТЬ КАТЕГОРИИ ИЗ URL
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
            var cat = CATEGORY_MAP[segment];
            if (cat && !seen[cat.name]) {
                categories.push(cat);
                seen[cat.name] = true;
            }
        }
        return categories;
    }

    // ============================================================
    // 🛡️ ЗАЩИТА ОТ СТАРОГО КЭША
    // ============================================================
    function removeOldLinks() {
        var oldBlock = document.getElementById('auto-categories');
        if (!oldBlock) return;

        // Находим все ссылки и заменяем на span
        var links = oldBlock.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            var span = document.createElement('span');
            span.className = 'cat-chip';
            span.textContent = a.textContent;
            a.parentNode.replaceChild(span, a);
        }
    }

    // ============================================================
    // 🎨 ОТРИСОВАТЬ БЛОК КАТЕГОРИЙ
    // ============================================================
    function renderCategories() {
        var content = document.querySelector('.md-content__inner, .rst-content, article, .document');
        if (!content) return;

        // Сначала чистим старое
        var old = document.getElementById('auto-categories');
        if (old) old.remove();

        var categories = getCategoriesFromURL();
        if (!categories.length) return;

        // Создаём контейнер
        var block = document.createElement('div');
        block.id = 'auto-categories';

        // Собираем HTML
        var html = '<div class="cat-inner">';
        html += '<div class="cat-header">';
        html += '<span class="cat-icon">📂</span>';
        html += '<span class="cat-label">Категории</span>';
        html += '</div>';
        html += '<div class="cat-chips">';

        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            // ⚠️ SPAN, а не ссылка — нет 404
            html += '<span class="cat-chip" data-cat="' + cat.name + '">';
            html += '<span class="chip-icon">' + cat.icon + '</span>';
            html += '<span class="chip-name">' + cat.name + '</span>';
            html += '</span>';
        }

        html += '</div>';
        html += '</div>';

        block.innerHTML = html;
        content.appendChild(block);
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    function run() {
        removeOldLinks();
        renderCategories();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    // SPA (MkDocs Material instant loading)
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function() {
            setTimeout(run, 100);
        });
    }
})();
