// accordion-menu.js — скрывает статьи в разделах (v3, force)
(function() {
    'use strict';

    var STORAGE_KEY = 'mars_menu_v3';
    var openSections = {};
    try {
        openSections = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch(e) { openSections = {}; }

    // ============================================================
    // ПОИСК ВСЕХ МЕНЮ
    // ============================================================
    function findNavs() {
        var navs = [];
        // Material
        var m1 = document.querySelector('.md-sidebar--primary .md-nav--primary');
        if (m1) navs.push({ el: m1, type: 'material' });
        // Read the Docs
        var r1 = document.querySelector('.wy-menu-vertical');
        if (r1) navs.push({ el: r1, type: 'readthedocs' });
        return navs;
    }

    // ============================================================
    // ОБРАБОТКА ОДНОГО ПУНКТА С ПОДМЕНЮ
    // ============================================================
    function processItem(item, type) {
        if (item.dataset.marsDone) return;
        item.dataset.marsDone = '1';

        // Ищем подменю (любой вложенный список/навигация)
        var nested = null;
        if (type === 'material') {
            nested = item.querySelector(':scope > .md-nav');
        } else {
            nested = item.querySelector(':scope > ul');
        }
        if (!nested) {
            // Снимаем флаг — там нет подменю
            delete item.dataset.marsDone;
            return;
        }

        // Находим кликабельный заголовок
        var label = null;
        if (type === 'material') {
            label = item.querySelector(':scope > .md-nav__link') ||
                    item.querySelector(':scope > label.md-nav__link');
        } else {
            label = item.querySelector(':scope > a');
        }
        if (!label) {
            delete item.dataset.marsDone;
            return;
        }

        item.classList.add('mars-section');

        // Скрываем чекбоксы Material
        var toggle = item.querySelector(':scope > input.md-nav__toggle');
        if (toggle) toggle.style.cssText = 'display:none !important;position:absolute;left:-9999px;';

        // Ключ раздела
        var sectionId = label.getAttribute('for') ||
                        label.textContent.trim().substring(0, 50) ||
                        'section_' + Math.random();

        // Восстанавливаем сохранённое состояние
        if (openSections[sectionId] === true) {
            item.classList.add('mars-open');
        }

        // Перехватываем клик
        label.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var isOpen = item.classList.toggle('mars-open');
            openSections[sectionId] = isOpen;
            saveState();
            try { if (navigator.vibrate) navigator.vibrate(10); } catch(err) {}
        }, true);

        // Также перехватываем change на чекбоксе (Material)
        if (toggle) {
            toggle.addEventListener('change', function(e) {
                e.stopPropagation();
                item.classList.toggle('mars-open', toggle.checked);
                openSections[sectionId] = toggle.checked;
                saveState();
            }, true);
        }
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(openSections));
        } catch(e) {}
    }

    // ============================================================
    // ОБРАБОТКА ВСЕГО МЕНЮ
    // ============================================================
    function processAll() {
        var navs = findNavs();
        var count = 0;

        navs.forEach(function(nav) {
            if (nav.type === 'material') {
                // ВСЕ пункты меню с подменю
                nav.el.querySelectorAll('.md-nav__item').forEach(function(item) {
                    var hasNested = item.querySelector(':scope > .md-nav');
                    if (hasNested) {
                        processItem(item, 'material');
                        count++;
                    }
                });
            } else if (nav.type === 'readthedocs') {
                nav.el.querySelectorAll('li.toctree-l1, li.toctree-l2, li.toctree-l3').forEach(function(item) {
                    var hasNested = item.querySelector(':scope > ul');
                    if (hasNested) {
                        processItem(item, 'readthedocs');
                        count++;
                    }
                });
            }
        });

        // Скрываем заголовок над меню (краткая инфа о статье)
        hideSidebarTitle();

        return count;
    }

    // ============================================================
    // СКРЫТИЕ КРАТКОЙ ИНФЫ О СТАТЬЕ
    // ============================================================
    function hideSidebarTitle() {
        // Material: заголовок раздела в сайдбаре
        document.querySelectorAll('.md-sidebar--primary .md-nav__title').forEach(function(el) {
            // Не трогаем drawer-заголовок (для мобильного)
            if (el.getAttribute('for') === '__drawer') return;
            el.style.cssText = 'display:none !important;';
        });

        // Материал также может показывать заголовок текущей страницы
        document.querySelectorAll('.md-sidebar--primary .md-nav > .md-nav__title').forEach(function(el) {
            if (el.getAttribute('for') === '__drawer') return;
            el.style.cssText = 'display:none !important;';
        });

        // Read the Docs: ищем "current" заголовок
        document.querySelectorAll('.wy-menu-vertical .current').forEach(function(el) {
            // Не трогаем сами ссылки, только caption
        });
    }

    // ============================================================
    // СТИЛИ — только скрытие подменю, БЕЗ цвета/шрифтов
    // ============================================================
    function addStyles() {
        if (document.getElementById('accordion-menu-style')) return;
        var style = document.createElement('style');
        style.id = 'accordion-menu-style';
        style.textContent = `
            /* ============================================================
               СКРЫТИЕ ПОДМЕНЮ У ЗАКРЫТЫХ РАЗДЕЛОВ
               ============================================================ */
            .mars-section:not(.mars-open) > .md-nav,
            .mars-section:not(.mars-open) > nav.md-nav,
            .mars-section:not(.mars-open) > ul,
            .mars-section:not(.mars-open) > ul.subnav {
                display: none !important;
            }

            /* Открытый раздел — подменю видно */
            .mars-section.mars-open > .md-nav,
            .mars-section.mars-open > nav.md-nav,
            .mars-section.mars-open > ul,
            .mars-section.mars-open > ul.subnav {
                display: block !important;
            }

            /* Скрываем чекбоксы */
            .mars-section > input.md-nav__toggle {
                display: none !important;
            }

            /* ============================================================
               СТРЕЛКА ▶ / ▼
               ============================================================ */
            .mars-section > .md-nav__link::after,
            .mars-section > label.md-nav__link::after,
            .mars-section > a.md-nav__link::after,
            .mars-section > a.reference::after,
            .mars-section > a::after {
                content: '▶' !important;
                display: inline-block !important;
                font-size: 0.7em !important;
                float: right !important;
                margin-left: 6px !important;
                opacity: 0.5 !important;
                transition: transform 0.2s !important;
                color: inherit !important;
            }

            .mars-section.mars-open > .md-nav__link::after,
            .mars-section.mars-open > label.md-nav__link::after,
            .mars-section.mars-open > a.md-nav__link::after,
            .mars-section.mars-open > a.reference::after,
            .mars-section.mars-open > a::after {
                transform: rotate(90deg) !important;
            }

            /* ============================================================
               СКРЫТИЕ КРАТКОЙ ИНФЫ О СТАТЬЕ
               ============================================================ */
            /* ПК: заголовок текущей статьи над меню */
            @media (min-width: 769px) {
                .md-sidebar--primary .md-nav__title:not([for="__drawer"]) {
                    display: none !important;
                }
                .md-sidebar--primary .md-nav--primary > .md-nav__title:not([for="__drawer"]) {
                    display: none !important;
                }
            }

            /* Read the Docs: подпись под пунктом */
            .wy-menu-vertical .caption-text small {
                display: none !important;
            }
            .wy-menu-vertical a.current small {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // НАБЛЮДАТЕЛЬ ЗА МЕНЮ
    // ============================================================
    function setupObserver() {
        var lastCount = -1;
        setInterval(function() {
            var navs = findNavs();
            if (!navs.length) return;
            var c = processAll();
            if (c !== lastCount) {
                lastCount = c;
                console.log('📋 Разделов обработано: ' + c);
            }
        }, 400);
    }

    // ============================================================
    // ОДНОРАЗОВЫЙ СБРОС СТАРОГО СОСТОЯНИЯ
    // ============================================================
    function resetOld() {
        try {
            localStorage.removeItem('mars_menu_open');
            localStorage.removeItem('mars_menu_open_v2');
        } catch(e) {}
    }

    // ============================================================
    // СТАРТ
    // ============================================================
    function init() {
        resetOld();
        addStyles();
        setTimeout(function() {
            processAll();
            setupObserver();
            console.log('📋 Аккордеон-меню v3: активно');
        }, 400);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
