// accordion-menu.js — v8 для Read the Docs
(function() {
    'use strict';

    // ============================================================
    // СВОРАЧИВАЕМ ВСЁ ЧЕРЕЗ aria-expanded (родной механизм RTD)
    // ============================================================
    function collapseAll() {
        var menu = document.querySelector('.wy-menu-vertical');
        if (!menu) return 0;

        var count = 0;
        // Все li, у которых есть подменю
        var lis = menu.querySelectorAll('li[aria-expanded]');

        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            li.setAttribute('aria-expanded', 'false');

            // Прячем вложенный ul
            var ul = li.querySelector(':scope > ul');
            if (ul) {
                ul.style.setProperty('display', 'none', 'important');
                ul.setAttribute('aria-expanded', 'false');
                count++;
            }
        }
        return count;
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        var c = collapseAll();
        console.log('📋 v8 RTD: свёрнуто ' + c + ' разделов');

        // Повторяем несколько раз, пока тема рисует меню
        setTimeout(collapseAll, 150);
        setTimeout(collapseAll, 400);
        setTimeout(collapseAll, 900);
        setTimeout(collapseAll, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
