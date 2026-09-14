// accordion-menu.js — просто и надёжно (v4)
(function() {
    'use strict';

    // ============================================================
    // НАХОДИМ ГЛАВНОЕ МЕНЮ
    // ============================================================
    function getRootNav() {
        // Material
        var mat = document.querySelector('.md-sidebar--primary .md-nav--primary');
        if (mat) return { el: mat, type: 'material' };

        // Read the Docs
        var rtd = document.querySelector('.wy-menu-vertical');
        if (rtd) return { el: rtd, type: 'readthedocs' };

        return null;
    }

    // ============================================================
    // ПОЛУЧАЕМ ВЕРХНИЕ ПУНКТЫ МЕНЮ (только первый уровень)
    // ============================================================
    function getTopItems(root, type) {
        if (type === 'material') {
            // Прямые дети списка
            var list = root.querySelector(':scope > .md-nav__list');
            if (!list) return [];
            return Array.from(list.querySelector(':scope > .md-nav__item'));
        } else {
            // Read the Docs: ul > li.toctree-l1
            var ul = root.querySelector(':scope > ul') || root.querySelector('ul');
            if (!ul) return [];
            return Array.from(ul.querySelector(':scope > li'));
        }
    }

    // ============================================================
    // ПРОВЕРЯЕМ, ЕСТЬ ЛИ У ПУНКТА ПОДМЕНЮ
    // ============================================================
    function hasSubmenu(item, type) {
        if (type === 'material') {
            return !!item.querySelector(':scope > .md-nav');
        } else {
            return !!item.querySelector(':scope > ul');
        }
    }

    // ============================================================
    // НАХОДИМ КЛИКАБЕЛЬНЫЙ ЗАГОЛОВОК
    // ============================================================
    function getLabel(item, type) {
        if (type === 'material') {
            return item.querySelector(':scope > .md-nav__link') ||
                   item.querySelector(':scope > label.md-nav__link');
        } else {
            return item.querySelector(':scope > a');
        }
    }

    // ============================================================
    // ОБРАБОТКА
    // ============================================================
    function process() {
        var root = getRootNav();
        if (!root) return false;

        var items = getTopItems(root.el, root.type);
        if (!items.length) return false;

        var counter = 0;

        items.forEach(function(item, index) {
            // Уже обработан?
            if (item.dataset.marsProcessed === '1') return;

            // Есть ли подменю?
            if (!hasSubmenu(item, root.type)) {
                item.dataset.marsProcessed = '1';
                return;
            }

            // Находим заголовок
            var label = getLabel(item, root.type);
            if (!label) return;

            // Помечаем
            item.dataset.marsProcessed = '1';
            item.classList.add('mars-section');
            item.dataset.marsIndex = index;

            // Скрываем чекбокс Material
            var toggle = item.querySelector(':scope > input.md-nav__toggle');
            if (toggle) {
                toggle.style.cssText = 'display:none !important;';
                toggle.checked = false;
            }

            // Начальное состояние — ЗАКРЫТО (без чтения localStorage)
            item.classList.remove('mars-open');

            // Клик по заголовку
            label.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                // Тоглим только ЭТОТ раздел
                item.classList.toggle('mars-open');
                try { if (navigator.vibrate) navigator.vibrate(10); } catch(err) {}
            }, true);

            counter++;
        });

        // Скрываем краткую инфу о статье
        hideSidebarTitle();

        if (counter > 0) {
            console.log('📋 Обработано разделов: ' + counter);
        }
        return true;
    }

    // ============================================================
    // СКРЫТИЕ ЗАГОЛОВКА НАД МЕНЮ
    // ============================================================
    function hideSidebarTitle() {
        // Material: заголовок раздела в сайдбаре (НЕ drawer для мобильного)
        var titles = document.querySelectorAll('.md-sidebar--primary .md-nav__title');
        titles.forEach(function(el) {
            if (el.getAttribute('for') === '__drawer') return;
            if (el.closest('[for="__drawer"]')) return;
            el.style.cssText = 'display:none !important;';
        });

        // Read the Docs: caption над меню
        document.querySelectorAll('.wy-menu-vertical > p.caption').forEach(function(el) {
            // Оставляем captions — они разделяют разделы
        });
    }

    // ============================================================
    // СТИЛИ
    // ============================================================
    function addStyles() {
        if (document.getElementById('accordion-menu-style')) return;
        var style = document.createElement('style');
        style.id = 'accordion-menu-style';
        style.textContent = `
            /* ============================================================
               СКРЫТИЕ ПОДМЕНЮ (только верхний уровень)
               ============================================================ */
            .md-nav__item.mars-section:not(.mars-open) > .md-nav {
                display: none !important;
            }
            .md-nav__item.mars-section.mars-open > .md-nav {
                display: block !important;
            }

            li.mars-section:not(.mars-open) > ul {
                display: none !important;
            }
            li.mars-section.mars-open > ul {
                display: block !important;
            }

            /* Скрываем чекбоксы */
            .mars-section > input.md-nav__toggle {
                display: none !important;
            }

            /* ============================================================
               СТРЕЛКА
               ============================================================ */
            .mars-section > .md-nav__link::after,
            .mars-section > label.md-nav__link::after,
            .mars-section > a::after {
                content: '▶';
                display: inline-block;
                font-size: 0.7em;
                float: right;
                margin-left: 8px;
                opacity: 0.5;
                transition: transform 0.2s;
                pointer-events: none;
            }

            .mars-section.mars-open > .md-nav__link::after,
            .mars-section.mars-open > label.md-nav__link::after,
            .mars-section.mars-open > a::after {
                transform: rotate(90deg);
            }

            /* Курсор */
            .mars-section > .md-nav__link,
            .mars-section > label.md-nav__link,
            .mars-section > a {
                cursor: pointer;
            }

            /* ============================================================
               СКРЫТИЕ КРАТКОЙ ИНФЫ О СТАТЬЕ (только ПК)
               ============================================================ */
            @media (min-width: 769px) {
                .md-sidebar--primary .md-nav__title:not([for="__drawer"]) {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // СБРОС ЛЮБОГО СТАРОГО СОСТОЯНИЯ
    // ============================================================
    function clearOldState() {
        try {
            localStorage.removeItem('mars_menu_open');
            localStorage.removeItem('mars_menu_open_v2');
            localStorage.removeItem('mars_menu_v3');
        } catch(e) {}
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function start() {
        addStyles();
        clearOldState();

        var attempts = 0;
        var timer = setInterval(function() {
            attempts++;
            var ok = process();
            if (ok || attempts > 30) {
                clearInterval(timer);
                if (ok) console.log('📋 Аккордеон-меню v4: активно');
            }
        }, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
