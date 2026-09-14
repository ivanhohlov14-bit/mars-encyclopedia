// accordion-menu.js — v9 для Read the Docs
(function() {
    'use strict';

    // ============================================================
    // ТОГГЛ РАЗДЕЛА
    // ============================================================
    function toggle(li) {
        var isOpen = li.getAttribute('aria-expanded') === 'true';
        li.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    }

    // ============================================================
    // ЗАКРЫТЬ ВСЁ ПРИ ЗАГРУЗКЕ
    // ============================================================
    function closeAll() {
        var menu = document.querySelector('.wy-menu-vertical');
        if (!menu) return 0;

        var count = 0;
        var open = menu.querySelectorAll('li[aria-expanded="true"]');
        for (var i = 0; i < open.length; i++) {
            open[i].setAttribute('aria-expanded', 'false');
            count++;
        }

        // Убираем класс .current (он делает ссылку жирной)
        var cur = menu.querySelectorAll('li.current');
        for (var j = 0; j < cur.length; j++) {
            cur[j].classList.remove('current');
        }
        return count;
    }

    // ============================================================
    // КЛИК ПО ВСЕЙ СТРОКЕ
    // ============================================================
    function bindClicks() {
        var menu = document.querySelector('.wy-menu-vertical');
        if (!menu) return;

        var lis = menu.querySelectorAll('li[aria-expanded]');
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            if (li.dataset.marsBound === '1') continue;

            var a = li.querySelector(':scope > a');
            if (!a) continue;

            li.dataset.marsBound = '1';

            a.addEventListener('click', function(e) {
                // Ctrl/Cmd/Shift = перейти по ссылке (для продвинутых)
                if (e.ctrlKey || e.metaKey || e.shiftKey) return;

                // Есть ли подменю?
                var ul = li.querySelector(':scope > ul');
                if (!ul) return;

                // Иначе — переключаем раздел
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                toggle(li);
            }, true);
        }
    }

    // ============================================================
    // СТИЛИ
    // ============================================================
    function addStyles() {
        if (document.getElementById('accordion-v9-css')) return;
        var s = document.createElement('style');
        s.id = 'accordion-v9-css';
        s.textContent = `
            /* ==== СКРЫТИЕ/ПОКАЗ ПО aria-expanded ==== */
            .wy-menu-vertical li[aria-expanded="false"] > ul {
                display: none !important;
            }
            .wy-menu-vertical li[aria-expanded="true"] > ul {
                display: block !important;
            }

            /* ==== УБИРАЕМ ЖИРНЫЙ ШРИФТ ==== */
            .wy-menu-vertical li > a,
            .wy-menu-vertical li > label,
            .wy-menu-vertical li.current > a,
            .wy-menu-vertical li.current > label,
            .wy-menu-vertical li a:visited,
            .wy-menu-vertical li a:hover {
                font-weight: normal !important;
            }

            /* ==== УБИРАЕМ РОДНОЙ КРЕСТИК-КНОПКУ ==== */
            .wy-menu-vertical .toctree-expand {
                display: none !important;
            }

            /* ==== СВОЯ СТРЕЛКА СПРАВА ==== */
            .wy-menu-vertical li[aria-expanded] > a {
                position: relative;
                padding-right: 24px !important;
            }
            .wy-menu-vertical li[aria-expanded] > a::after {
                content: '\\25B8'; /* ▸ */
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 0.85em;
                opacity: 0.55;
                transition: transform 0.2s;
                pointer-events: none;
            }
            .wy-menu-vertical li[aria-expanded="true"] > a::after {
                transform: translateY(-50%) rotate(90deg);
                opacity: 0.9;
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        addStyles();
        closeAll();
        bindClicks();

        setTimeout(function() { closeAll(); bindClicks(); }, 300);
        setTimeout(function() { closeAll(); bindClicks(); }, 900);

        console.log('📋 v9 RTD: меню готово');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
