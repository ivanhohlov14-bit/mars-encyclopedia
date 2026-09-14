// accordion-menu.js — v11 (использует свой класс .mars-open)
(function() {
    'use strict';

    function bind() {
        var menu = document.querySelector('.wy-menu-vertical');
        if (!menu) return 0;

        var count = 0;
        var lis = menu.querySelectorAll('li');

        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            if (li.dataset.marsBound === '1') continue;

            // Есть ли подменю?
            var ul = li.querySelector(':scope > ul');
            if (!ul) continue;

            // Есть ли ссылка-заголовок?
            var a = li.querySelector(':scope > a');
            if (!a) continue;

            li.dataset.marsBound = '1';

            // При загрузке — ВСЕГДА закрыто (снимаем возможный .current)
            li.classList.remove('mars-open');

            // Клик по ссылке — переключаем раздел
            a.addEventListener('click', function(e) {
                // Ctrl / Cmd / Shift — переход по ссылке
                if (e.ctrlKey || e.metaKey || e.shiftKey) return;

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                li.classList.toggle('mars-open');

                try { if (navigator.vibrate) navigator.vibrate(8); } catch(err) {}
            }, true);

            count++;
        }
        return count;
    }

    function init() {
        var n = bind();
        console.log('📋 v11: привязано разделов: ' + n);

        setTimeout(bind, 200);
        setTimeout(bind, 600);
        setTimeout(bind, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
