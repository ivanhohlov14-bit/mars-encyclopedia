// accordion-menu.js — v10 для Read the Docs
(function() {
    'use strict';

    // ============================================================
    // ПРИВЯЗКА КЛИКОВ
    // ============================================================
    function bindClicks() {
        var menu = document.querySelector('.wy-menu-vertical');
        if (!menu) return 0;

        var lis = menu.querySelectorAll('li');
        var count = 0;

        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            if (li.dataset.marsBound === '1') continue;

            // Есть подменю?
            var ul = li.querySelector(':scope > ul');
            if (!ul) continue;

            li.dataset.marsBound = '1';
            li.classList.add('mars-has-sub');
            count++;

            // Слушаем клик на li — сработает от любого места строки
            li.addEventListener('click', function(e) {

                // Клик внутри раскрытого подменю → пропускаем (это клик по статье)
                var t = e.target;
                while (t && t !== li) {
                    if (t.tagName === 'UL') return;
                    t = t.parentElement;
                }

                // Ctrl / Cmd / Shift → даём перейти по ссылке
                if (e.ctrlKey || e.metaKey || e.shiftKey) return;

                // Иначе — переключаем раздел
                e.preventDefault();
                e.stopPropagation();

                li.classList.toggle('mars-open');

                try { if (navigator.vibrate) navigator.vibrate(8); } catch(err) {}
            }, true);
        }

        return count;
    }

    // ============================================================
    // СТРАХОВКА: на всякий случай снимаем mars-open со всех
    // (если тема сама поставила при загрузке)
    // ============================================================
    function closeAll() {
        var menu = document.querySelector('.wy-menu-vertical');
        if (!menu) return;
        var open = menu.querySelectorAll('li.mars-open');
        for (var i = 0; i < open.length; i++) {
            // НЕ трогаем, если пользователь уже открыл
            if (open[i].dataset.marsUserOpen === '1') continue;
            open[i].classList.remove('mars-open');
        }
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        var n = bindClicks();
        console.log('📋 v10: привязано разделов: ' + n);

        setTimeout(bindClicks, 300);
        setTimeout(bindClicks, 900);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
