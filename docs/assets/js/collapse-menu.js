// accordion-menu.js — v6 (чистый, без конфликтов с Material)
(function() {
    'use strict';

    // Чистим весь старый мусор
    try {
        ['mars_menu_open','mars_menu_open_v2','mars_menu_v3','mars_menu_v4','mars_menu_v5','mars_menu_v6']
            .forEach(function(k) { localStorage.removeItem(k); });
    } catch(e) {}

    // ============================================================
    // СВОРАЧИВАЕМ ВСЕ СЕКЦИИ (используем чекбоксы Material)
    // ============================================================
    function collapseAll() {
        var toggles = document.querySelectorAll('input.md-nav__toggle');
        for (var i = 0; i < toggles.length; i++) {
            // Снимаем галочку → Material сам скроет вложенный список
            toggles[i].checked = false;
        }
    }

    // ============================================================
    // СКРЫВАЕМ КРАТКУЮ ИНФУ О СТАТЬЕ (заголовок над меню)
    // ============================================================
    function hideSidebarTitle() {
        var titles = document.querySelectorAll('.md-sidebar--primary .md-nav__title');
        for (var i = 0; i < titles.length; i++) {
            var t = titles[i];
            if (t.getAttribute('for') === '__drawer') continue;
            t.style.setProperty('display', 'none', 'important');
        }
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        collapseAll();
        hideSidebarTitle();

        // Повторяем несколько раз — Material может перерисовать меню
        setTimeout(function() { collapseAll(); hideSidebarTitle(); }, 200);
        setTimeout(function() { collapseAll(); hideSidebarTitle(); }, 600);
        setTimeout(function() { collapseAll(); hideSidebarTitle(); }, 1200);

        console.log('📋 Меню: все секции свёрнуты');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Material SPA: при переходе по ссылке тоже сворачиваем
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function() {
            setTimeout(function() {
                collapseAll();
                hideSidebarTitle();
            }, 100);
        });
    }
})();
