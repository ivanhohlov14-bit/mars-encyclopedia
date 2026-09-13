// ============================================================
// wikipedia-footer.js — добавляет футер в стиле Wikipedia
// на каждую страницу сайта
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 🔧 НАСТРОЙКИ — измени под себя
    // ============================================================
   var CONFIG = {
    siteName: 'Марсианская энциклопедия',

    // Первый абзац — про лицензию
    licenseNote:
        'Материалы «Марсианской энциклопедии» доступны по лицензии ' +
        'Creative Commons «Attribution-NonCommercial-NoDerivs» (BY-NC-ND) 4.0. ' +
        'Отдельные элементы могут иметь собственные условия использования — ' +
        'подробнее см. <a href="/license/">Условия использования</a>.',

    // Второй абзац — про проект
    brandNote:
        '<strong>Марсианская энциклопедия</strong>® — научно-художественный справочный проект ' +
        'по вселенной цикла романов «Письмо из Красной пыли». ' +
        'Реконструкция истории Марса в Эпоху Умирания, основанная на научных данных ' +
        'и художественной концепции автора. Мир принадлежит <strong>Mnemis</strong>.',
        // Ссылки в футере (название → ссылка)
        links: [
            { text: 'Политика конфиденциальности', href: '/privacy/' },
            { text: 'Описание проекта', href: '/about/' },
            { text: 'Связаться с нами', href: '/contact/' },
            { text: 'Кодекс поведения', href: '/code-of-conduct/' },
            { text: 'Статистика', href: '/statistics/' },
        ],

        // Куда вставлять футер (селекторы — первый найденный)
        targetSelectors: [
            '.md-content__inner',
            '.rst-content',
            '.wy-nav-content',
            'article',
            '.document'
        ]
    };

    // ============================================================
    // ПРОВЕРКА — не на служебных страницах
    // ============================================================
    var path = window.location.pathname;
    var skipPages = ['/secret/', '/secret-2/', '/login/'];
    for (var i = 0; i < skipPages.length; i++) {
        if (path.indexOf(skipPages[i]) !== -1) return;
    }

    // ============================================================
    // СОЗДАНИЕ ФУТЕРА
    // ============================================================
    function createFooter() {
        var footer = document.createElement('div');
        footer.className = 'wiki-footer';
        footer.setAttribute('role', 'contentinfo');

        var html = '';

        // Абзац про лицензию
        if (CONFIG.licenseNote) {
            html += '<p>' + CONFIG.licenseNote + '</p>';
        }

        // Бренд
        if (CONFIG.brandNote) {
            html += '<p class="wiki-footer-brand">' + CONFIG.brandNote + '</p>';
        }

        // Ссылки
        if (CONFIG.links && CONFIG.links.length) {
            html += '<div class="wiki-footer-links">';
            CONFIG.links.forEach(function(link, idx) {
                if (idx > 0) html += '<span style="color:transparent;border:none;padding:0;">·</span>';
                html += '<a href="' + link.href + '">' + link.text + '</a>';
            });
            html += '</div>';
        }

        footer.innerHTML = html;
        return footer;
    }

    // ============================================================
    // ПОИСК КОНТЕЙНЕРА ДЛЯ ВСТАВКИ
    // ============================================================
    function findTarget() {
        for (var i = 0; i < CONFIG.targetSelectors.length; i++) {
            var el = document.querySelector(CONFIG.targetSelectors[i]);
            if (el) return el;
        }
        return null;
    }

    // ============================================================
    // ВСТАВКА
    // ============================================================
    function insertFooter() {
        // Уже вставлен?
        if (document.querySelector('.wiki-footer')) return;

        var target = findTarget();
        if (!target) {
            // Если не нашли — в конец body
            target = document.body;
        }

        var footer = createFooter();
        target.appendChild(footer);
    }

    // ============================================================
    // ЗАПУСК (с небольшой задержкой, чтобы тема успела отрисоваться)
    // ============================================================
    function init() {
        // Вставляем через 500мс после загрузки — когда DOM точно готов
        setTimeout(insertFooter, 500);

        // На случай динамической перерисовки темы (например, drawer toggle)
        // Проверяем ещё раз через 2 сек
        setTimeout(function() {
            if (!document.querySelector('.wiki-footer')) insertFooter();
        }, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('📄 wikipedia-footer: активен');
})();
