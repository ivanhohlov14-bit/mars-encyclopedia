// accordion-menu.js — просто скрывает статьи в разделах (v2)
(function() {
    'use strict';

    // Новый ключ — сбрасывает старое состояние
    var STORAGE_KEY = 'mars_menu_open_v2';

    var openSections = {};
    try {
        openSections = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch(e) { openSections = {}; }

    // ============================================================
    // ПОИСК МЕНЮ
    // ============================================================
    function findNav() {
        var nav = document.querySelector('.md-sidebar--primary .md-nav--primary');
        if (nav) return { el: nav, type: 'material' };

        var menu = document.querySelector('.wy-menu-vertical');
        if (menu) return { el: menu, type: 'readthedocs' };

        return null;
    }

    // ============================================================
    // MATERIAL
    // ============================================================
    function processMaterial(nav) {
        var topItems = nav.querySelectorAll(':scope > .md-nav__list > .md-nav__item');

        topItems.forEach(function(item) {
            var nested = item.querySelector(':scope > .md-nav');
            if (!nested) return;

            item.classList.add('mars-section');

            var label = item.querySelector(':scope > .md-nav__link');
            if (!label) return;

            var sectionId = label.getAttribute('for') || label.textContent.trim();

            // Скрываем input-чекбокс
            var toggle = item.querySelector(':scope > input.md-nav__toggle');
            if (toggle) toggle.style.display = 'none';

            // ⚠️ НЕ автооткрываем. Только сохранённое состояние.
            var isOpen = openSections[sectionId] === true;
            item.classList.toggle('mars-open', isOpen);

            // Клик — раскрыть/закрыть
            label.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                item.classList.toggle('mars-open');
                openSections[sectionId] = item.classList.contains('mars-open');
                saveState();
                try { if (navigator.vibrate) navigator.vibrate(10); } catch(err) {}
            };
        });
    }

    // ============================================================
    // READ THE DOCS
    // ============================================================
    function processReadTheDocs(nav) {
        var topItems = nav.querySelectorAll(':scope > ul > li.toctree-l1');

        topItems.forEach(function(item) {
            var sublist = item.querySelector(':scope > ul');
            if (!sublist) return;

            item.classList.add('mars-section');

            var label = item.querySelector(':scope > a');
            if (!label) return;

            var sectionId = label.textContent.trim();

            var isOpen = openSections[sectionId] === true;
            item.classList.toggle('mars-open', isOpen);

            label.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                item.classList.toggle('mars-open');
                openSections[sectionId] = item.classList.contains('mars-open');
                saveState();
                try { if (navigator.vibrate) navigator.vibrate(10); } catch(err) {}
            };
        });
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(openSections));
        } catch(e) {}
    }

    // ============================================================
    // СТИЛИ
    // ============================================================
    function addStyles() {
        if (document.getElementById('accordion-menu-style')) return;
        var style = document.createElement('style');
        style.id = 'accordion-menu-style';
        style.textContent = `
            /* ==== СКРЫТИЕ/ПОКАЗ ПОДМЕНЮ ==== */
            .mars-section > .md-nav,
            .mars-section > nav.md-nav,
            .mars-section > ul {
                display: none;
            }

            .mars-section.mars-open > .md-nav,
            .mars-section.mars-open > nav.md-nav,
            .mars-section.mars-open > ul {
                display: block;
            }

            /* ==== СКРЫТИЕ ЧЕКБОКСОВ ==== */
            .mars-section > input.md-nav__toggle {
                display: none !important;
            }

            /* ==== СТРЕЛКА-ИНДИКАТОР (минимальная) ==== */
            .mars-section > .md-nav__link::after,
            .mars-section > a.md-nav__link::after,
            .mars-section > a.reference::after,
            .mars-section > a::after {
                content: '▶';
                font-size: 0.7em;
                float: right;
                transition: transform 0.2s;
                opacity: 0.5;
            }

            .mars-section.mars-open > .md-nav__link::after,
            .mars-section.mars-open > a.md-nav__link::after,
            .mars-section.mars-open > a.reference::after,
            .mars-section.mars-open > a::after {
                transform: rotate(90deg);
            }

            .mars-section > .md-nav__link,
            .mars-section > a.md-nav__link,
            .mars-section > a.reference,
            .mars-section > a {
                cursor: pointer;
            }

            /* ============================================================
               🎯 СКРЫТИЕ КРАТКОЙ ИНФЫ О СТАТЬЕ
               ============================================================ */
            /* Только на ПК. На мобильном оставляем — там важна кнопка "назад" */
            @media (min-width: 769px) {
                /* Заголовок текущего раздела над меню */
                .md-sidebar--primary .md-nav__title:not([for="__drawer"]) {
                    display: none !important;
                }

                /* Материал иногда показывает вложенный заголовок */
                .md-sidebar--primary .md-nav .md-nav__title:not([for="__drawer"]) {
                    display: none !important;
                }
            }

            /* Если это Read the Docs — скрываем подпись под пунктом */
            .wy-menu-vertical .headerlink,
            .wy-menu-vertical small.caption-text {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // ОБНОВЛЕНИЕ ПРИ ПЕРЕХОДАХ
    // ============================================================
    function setupObserver() {
        var lastNav = null;
        setInterval(function() {
            var nav = findNav();
            if (nav && nav.el !== lastNav) {
                lastNav = nav.el;
                if (nav.type === 'material') processMaterial(nav.el);
                else processReadTheDocs(nav.el);
            }
        }, 500);
    }

    // ============================================================
    // ОДНОРАЗОВЫЙ СБРОС СТАРОГО СОСТОЯНИЯ
    // ============================================================
    function resetOldState() {
        try {
            // Удаляем старое состояние от прошлой версии
            if (localStorage.getItem('mars_menu_open')) {
                localStorage.removeItem('mars_menu_open');
                console.log('🧹 Старое состояние меню сброшено');
            }
        } catch(e) {}
    }

    // ============================================================
    // СТАРТ
    // ============================================================
    function init() {
        resetOldState();
        addStyles();

        setTimeout(function() {
            var nav = findNav();
            if (!nav) {
                setTimeout(init, 800);
                return;
            }
            if (nav.type === 'material') processMaterial(nav.el);
            else processReadTheDocs(nav.el);
            setupObserver();
            console.log('📋 Аккордеон-меню v2: активно (' + nav.type + ')');
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
