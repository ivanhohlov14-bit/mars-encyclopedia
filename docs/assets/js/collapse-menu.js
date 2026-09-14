// accordion-menu.js — v7 (жёсткое скрытие через inline style)
(function() {
    'use strict';

    // Чистим ВСЁ старое
    try {
        Object.keys(localStorage).forEach(function(k) {
            if (k.indexOf('__nav_') === 0 || k.indexOf('mars_') === 0) {
                localStorage.removeItem(k);
            }
        });
    } catch(e) {}

    // ============================================================
    // НАЙТИ ВСЕ ПУНКТЫ С ПОДМЕНЮ
    // ============================================================
    function findAllSections() {
        var result = [];

        // Material
        document.querySelectorAll('.md-sidebar--primary .md-nav__item--nested').forEach(function(item) {
            var nav = item.querySelector(':scope > .md-nav');
            if (nav) result.push({ item: item, submenu: nav, theme: 'material' });
        });

        // Read the Docs
        document.querySelectorAll('.wy-menu-vertical li').forEach(function(li) {
            var ul = li.querySelector(':scope > ul');
            if (ul) result.push({ item: li, submenu: ul, theme: 'rtd' });
        });

        return result;
    }

    // ============================================================
    // СКРЫТЬ ВСЕ ПОДМЕНЮ
    // ============================================================
    function hideAll() {
        findAllSections().forEach(function(s) {
            // Прячем через inline style — сильнее любого CSS
            s.submenu.style.setProperty('display', 'none', 'important');
            s.item.classList.remove('mars-open');
        });
    }

    // ============================================================
    // ПРИВЯЗАТЬ КЛИКИ
    // ============================================================
    function bindClicks() {
        findAllSections().forEach(function(s) {
            if (s.item.dataset.marsBound === '1') return;
            s.item.dataset.marsBound = '1';

            // Ищем кликабельный заголовок
            var link = s.item.querySelector(':scope > .md-nav__link') ||
                       s.item.querySelector(':scope > label.md-nav__link') ||
                       s.item.querySelector(':scope > a');

            if (!link) return;

            // Полностью подавляем родной обработчик
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                var isOpen = s.item.classList.toggle('mars-open');
                s.submenu.style.setProperty(
                    'display',
                    isOpen ? 'block' : 'none',
                    'important'
                );

                try { if (navigator.vibrate) navigator.vibrate(10); } catch(err) {}
            }, true);

            // Также блокируем клик по чекбоксу (Material)
            var toggle = s.item.querySelector(':scope > input.md-nav__toggle');
            if (toggle) {
                toggle.checked = false;
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle.checked = false;
                }, true);
            }
        });
    }

    // ============================================================
    // СКРЫТЬ ЗАГОЛОВОК НАД МЕНЮ
    // ============================================================
    function hideTitle() {
        document.querySelectorAll(
            '.md-sidebar--primary .md-nav__title, .wy-nav-side .wy-menu-vertical p.caption'
        ).forEach(function(el) {
            if (el.getAttribute('for') === '__drawer') return;
            // Не трогаем сами названия разделов-ссылки
            if (el.tagName === 'P' && el.textContent && el.textContent.length > 30) {
                el.style.setProperty('display', 'none', 'important');
            }
            if (el.classList.contains('md-nav__title')) {
                el.style.setProperty('display', 'none', 'important');
            }
        });
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    var didInit = false;

    function run() {
        // При ПЕРВОМ запуске — скрываем всё
        if (!didInit) {
            hideAll();
            didInit = true;
        }
        bindClicks();
        hideTitle();
    }

    function start() {
        run();
        // Повторяем несколько раз, пока Material дорисует
        setTimeout(run, 200);
        setTimeout(run, 500);
        setTimeout(run, 1000);
        setTimeout(run, 2000);
        console.log('📋 v7: меню обработано');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    // SPA (Material instant loading)
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function() {
            setTimeout(function() {
                bindClicks();
                hideTitle();
            }, 150);
        });
    }
})();
