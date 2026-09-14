// accordion-menu.js — v12 (делегирование, ловит клик на любом уровне)
(function() {
    'use strict';

    // ============================================================
    // ОДИН ГЛОБАЛЬНЫЙ ОБРАБОТЧИК — ловит все клики на меню
    // ============================================================
    document.addEventListener('click', function(e) {
        // Ищем ближайший <a> внутри меню
        var a = e.target.closest('.wy-menu-vertical a');
        if (!a) return;

        // Это вложенная ссылка (статья), не заголовок раздела?
        var li = a.parentElement;
        if (!li || li.tagName !== 'LI') return;

        // Есть ли у этого li подменю?
        var submenu = li.querySelector(':scope > ul');
        if (!submenu) return;  // Обычная статья — не мешаем

        // Ctrl / Cmd / Shift — даём перейти по ссылке
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;

        // Перехватываем клик
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Переключаем
        li.classList.toggle('mars-open');

        try { if (navigator.vibrate) navigator.vibrate(8); } catch(err) {}
    }, true);  // ← capture phase = сработает ПЕРВЫМ

    // ============================================================
    // ПОМЕТКА РАЗДЕЛОВ ПРИ ЗАГРУЗКЕ
    // ============================================================
    function markSections() {
        var menu = document.querySelector('.wy-menu-vertical');
        if (!menu) return;
        var lis = menu.querySelectorAll('li');
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].querySelector(':scope > ul')) {
                lis[i].classList.add('mars-has-sub');
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', markSections);
    } else {
        markSections();
    }
    setTimeout(markSections, 300);
    setTimeout(markSections, 1000);

    console.log('📋 v12: делегирование установлено');
})();
