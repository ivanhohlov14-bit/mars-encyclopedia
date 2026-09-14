// accordion-menu.js — универсальное решение (v5)
(function() {
    'use strict';

    // ============================================================
    // ЖДЁМ ЗАГРУЗКУ И НАХОДИМ МЕНЮ
    // ============================================================
    function findMenuUl() {
        // Read the Docs
        var rtd = document.querySelector('.wy-menu-vertical ul');
        if (rtd) return rtd;

        // Material (первый список в сайдбаре)
        var mat = document.querySelector('.md-sidebar--primary nav ul');
        if (mat) return mat;

        var mat2 = document.querySelector('.md-sidebar--primary ul');
        if (mat2) return mat2;

        return null;
    }

    // ============================================================
    // ОБХОДИМ ВСЕ <li> И ИЩЕМ ТЕ, У КОТОРЫХ ЕСТЬ ВНУТРЕННИЙ <ul>
    // ============================================================
    function processAllLi() {
        var menuUl = findMenuUl();
        if (!menuUl) return 0;

        // Только ПРЯМЫЕ дети верхнего ul
        var topLis = [];
        for (var i = 0; i < menuUl.children.length; i++) {
            if (menuUl.children[i].tagName === 'LI') {
                topLis.push(menuUl.children[i]);
            }
        }

        var count = 0;

        topLis.forEach(function(li) {
            if (li.dataset.marsDone === '1') return;

            // Ищем ВНУТРЕННИЙ <ul>
            var innerUl = null;
            for (var j = 0; j < li.children.length; j++) {
                if (li.children[j].tagName === 'UL') {
                    innerUl = li.children[j];
                    break;
                }
            }

            // Нет подменю — это просто ссылка, пропускаем
            if (!innerUl) {
                li.dataset.marsDone = '1';
                return;
            }

            // Ищем ссылку-заголовок
            var link = null;
            for (var k = 0; k < li.children.length; k++) {
                if (li.children[k].tagName === 'A') {
                    link = li.children[k];
                    break;
                }
            }

            if (!link) {
                // Material часто использует label вместо a
                for (var m = 0; m < li.children.length; m++) {
                    if (li.children[m].tagName === 'LABEL') {
                        link = li.children[m];
                        break;
                    }
                }
            }

            if (!link) return;

            // Помечаем
            li.dataset.marsDone = '1';
            li.classList.add('mars-section');

            // Скрываем чекбоксы
            for (var n = 0; n < li.children.length; n++) {
                if (li.children[n].tagName === 'INPUT') {
                    li.children[n].style.cssText = 'display:none !important;';
                    li.children[n].checked = false;
                }
            }

            // Закрыто по умолчанию
            li.classList.remove('mars-open');

            // Перехватываем клик
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                li.classList.toggle('mars-open');
            }, true);

            count++;
        });

        return count;
    }

    // ============================================================
    // СКРЫТИЕ КРАТКОЙ ИНФЫ
    // ============================================================
    function hideSidebarTitle() {
        // Material — заголовок "МЕНЮ" и надпись текущей статьи
        var titles = document.querySelectorAll('.md-sidebar--primary .md-nav__title');
        for (var i = 0; i < titles.length; i++) {
            var t = titles[i];
            if (t.getAttribute('for') === '__drawer') continue;
            t.style.cssText = 'display:none !important;';
        }

        // Также скрываем .md-nav__source (ссылка "просмотр источника")
        var sources = document.querySelectorAll('.md-sidebar--primary .md-nav__source');
        for (var j = 0; j < sources.length; j++) {
            sources[j].style.cssText = 'display:none !important;';
        }
    }

    // ============================================================
    // СТИЛИ
    // ============================================================
    function addStyle() {
        if (document.getElementById('accordion-css')) return;
        var s = document.createElement('style');
        s.id = 'accordion-css';
        s.textContent = `
            /* Прячем внутренние UL у закрытых разделов */
            li.mars-section:not(.mars-open) > ul {
                display: none !important;
            }
            li.mars-section.mars-open > ul {
                display: block !important;
            }

            /* Стрелка */
            li.mars-section > a::after,
            li.mars-section > label::after {
                content: ' ▶';
                font-size: 0.7em;
                opacity: 0.5;
                transition: transform 0.2s;
                display: inline-block;
            }
            li.mars-section.mars-open > a::after,
            li.mars-section.mars-open > label::after {
                transform: rotate(90deg);
            }

            /* Курсор */
            li.mars-section > a,
            li.mars-section > label {
                cursor: pointer;
            }

            /* Скрываем чекбоксы Material */
            li.mars-section > input[type="checkbox"] {
                display: none !important;
            }

            /* Скрываем заголовок над меню (только ПК) */
            @media (min-width: 769px) {
                .md-sidebar--primary .md-nav__title:not([for="__drawer"]) {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // СБРОС СТАРОГО
    // ============================================================
    function clearOld() {
        try {
            localStorage.removeItem('mars_menu_open');
            localStorage.removeItem('mars_menu_open_v2');
            localStorage.removeItem('mars_menu_v3');
            localStorage.removeItem('mars_menu_v4');
        } catch(e) {}
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function start() {
        addStyle();
        clearOld();

        var attempts = 0;
        var timer = setInterval(function() {
            attempts++;
            var count = processAllLi();
            hideSidebarTitle();

            if (count > 0) {
                clearInterval(timer);
                console.log('📋 v5: обработано разделов — ' + count);
                // Ещё раз через секунду на случай, если меню перерисуется
                setTimeout(function() {
                    processAllLi();
                    hideSidebarTitle();
                }, 1000);
            } else if (attempts > 30) {
                clearInterval(timer);
                console.warn('📋 v5: меню не найдено. Проверь F12 → Console → structure()');
            }
        }, 300);
    }

    // Глобальная функция для диагностики
    window.structure = function() {
        var menuUl = findMenuUl();
        if (!menuUl) {
            console.log('❌ Меню не найдено');
            return;
        }
        console.log('✅ Меню найдено:', menuUl);
        console.log('Верхних пунктов LI:', menuUl.children.length);
        for (var i = 0; i < Math.min(5, menuUl.children.length); i++) {
            var li = menuUl.children[i];
            console.log('LI #' + i + ':', {
                html: li.outerHTML.substring(0, 300),
                children: Array.from(li.children).map(function(c) { return c.tagName; })
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
