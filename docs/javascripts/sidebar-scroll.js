// ============================================================
// sidebar-scroll.js — v2 VIP
// Сохраняет позицию меню + плавный скролл к заголовку + подсветка активной статьи
// - Safe storage (localStorage fallback на sessionStorage)
// - Pathname match без endsWith (нет ложных срабатываний)
// - Поддержка MkDocs Material (.md-nav) + RTD (.wy-menu-vertical)
// - Подсветка через CSS-класс + родительский трейл
// - Уважает prefers-reduced-motion
// - Не теряет позицию при быстрой перезагрузке
// - Публичное API: window.marsSidebar.*
// ============================================================
(function() {
    'use strict';

    if (window.__sidebarScrollLoaded) return;
    window.__sidebarScrollLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var STORAGE_KEY = 'mars_sidebar_scroll';
    var RESTORE_DELAYS = [100, 400, 900];    // попытки восстановления
    var ACTIVE_COLOR = '#6C63FF';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['📚 sidebar:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 💾 Safe storage — если sessionStorage заблокирован, идём в localStorage
    // ============================================================
    function getStorage() {
        try {
            sessionStorage.setItem('__t', '1');
            sessionStorage.removeItem('__t');
            return sessionStorage;
        } catch(e) {
            try { return localStorage; } catch(e2) { return null; }
        }
    }

    var STORAGE = getStorage();

    function storageGet(key) {
        if (!STORAGE) return null;
        try { return STORAGE.getItem(key); } catch(e) { return null; }
    }

    function storageSet(key, val) {
        if (!STORAGE) return;
        try { STORAGE.setItem(key, val); } catch(e) {}
    }

    // ============================================================
    // 🎨 Стили для подсветки активной статьи
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mars-sidebar-style')) return;
        var s = document.createElement('style');
        s.id = 'mars-sidebar-style';
        s.textContent = `
            .mars-active-link {
                color: ${ACTIVE_COLOR} !important;
                font-weight: 600 !important;
            }
            .mars-active-parent {
                border-left: 3px solid ${ACTIVE_COLOR} !important;
                background: rgba(108, 99, 255, 0.08) !important;
            }
            .mars-active-parent-trail > a {
                color: ${ACTIVE_COLOR} !important;
            }
            /* Плавный скролл если юзер не отключил анимации */
            @media (prefers-reduced-motion: no-preference) {
                html { scroll-behavior: smooth; }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🔍 Поиск сайдбара (RTD + Material)
    // ============================================================
    function getSidebar() {
        return document.querySelector('.wy-nav-side') ||      // readthedocs
               document.querySelector('.md-sidebar--primary') || // Material
               null;
    }

    function getSidebarLinks() {
        // Собираем ссылки из обоих вариантов
        var links = [];
        var sels = ['.wy-menu-vertical a', '.md-nav__link'];
        sels.forEach(function(sel) {
            document.querySelectorAll(sel).forEach(function(a) { links.push(a); });
        });
        return links;
    }

    // ============================================================
    // 💾 Сохранение позиции меню
    // ============================================================
    var _saveTimer = null;

    function saveScrollPosition() {
        var sidebar = getSidebar();
        if (!sidebar) return;
        if (_saveTimer) return;
        _saveTimer = setTimeout(function() {
            _saveTimer = null;
            try {
                storageSet(STORAGE_KEY, String(sidebar.scrollTop));
                log('сохранено:', sidebar.scrollTop);
            } catch(e) {}
        }, 100);
    }

    function attachSaveOnClick() {
        document.addEventListener('click', function(e) {
            var t = e.target;
            if (!t || !t.closest) return;
            var link = t.closest('a');
            if (!link) return;

            var sidebar = getSidebar();
            if (!sidebar) return;
            if (!sidebar.contains(link)) return;

            var href = link.getAttribute('href');
            if (!href || href.indexOf('http') === 0 || href.charAt(0) === '#') return;

            saveScrollPosition();
        }, true);

        // Дополнительно: сохраняем при скролле самого меню
        var sidebar = getSidebar();
        if (sidebar) {
            var scrollTimeout = null;
            sidebar.addEventListener('scroll', function() {
                if (scrollTimeout) clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    try {
                        storageSet(STORAGE_KEY, String(sidebar.scrollTop));
                    } catch(e) {}
                }, 200);
            }, { passive: true });
        }
    }

    // ============================================================
    // 🔄 Восстановление позиции меню (несколько попыток)
    // ============================================================
    function restoreScrollPosition() {
        var saved = storageGet(STORAGE_KEY);
        if (saved == null) return;

        var value = parseInt(saved, 10);
        if (isNaN(value) || value < 0) return;

        var attempt = 0;

        function tryRestore() {
            var sidebar = getSidebar();
            if (!sidebar) {
                if (++attempt < RESTORE_DELAYS.length) {
                    setTimeout(tryRestore, RESTORE_DELAYS[attempt]);
                }
                return;
            }

            // Проверяем что сайдбар уже отрендерился (есть высота)
            var scrollHeight = sidebar.scrollHeight || 0;
            var clientHeight = sidebar.clientHeight || 0;

            if (scrollHeight <= clientHeight && ++attempt < RESTORE_DELAYS.length) {
                setTimeout(tryRestore, RESTORE_DELAYS[attempt]);
                return;
            }

            try {
                sidebar.scrollTop = value;
                log('восстановлено:', value);
            } catch(e) {}
        }

        setTimeout(tryRestore, RESTORE_DELAYS[0]);
    }

    // ============================================================
    // ⚓ Плавный скролл к якорю
    // ============================================================
    function scrollToHash() {
        if (!window.location.hash || window.location.hash.length < 2) return;

        var id = window.location.hash.slice(1);
        // Безопасный селектор — экранируем спецсимволы
        var target = null;
        try {
            target = document.getElementById(id);
        } catch(e) {}

        if (!target) {
            try {
                target = document.querySelector(window.location.hash);
            } catch(e) {}
        }

        if (!target) return;

        // Уважаем reduced-motion
        var reduced = false;
        try {
            reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) {}

        setTimeout(function() {
            try {
                target.scrollIntoView({
                    behavior: reduced ? 'auto' : 'smooth',
                    block: 'start'
                });
            } catch(e) {
                // Старые браузеры не поддерживают опции
                try { target.scrollIntoView(true); } catch(e2) {}
            }
        }, 500);
    }

    // ============================================================
    // ✨ Подсветка активной статьи
    // ============================================================
    function normalizePath(p) {
        if (!p) return '';
        // Убираем trailing slash, decode, схлопываем //
        try { p = decodeURIComponent(p); } catch(e) {}
        p = p.replace(/\/+/g, '/');
        p = p.replace(/\/$/, '');
        return p;
    }

    function highlightActiveArticle() {
        var currentPath = normalizePath(window.location.pathname);
        if (!currentPath) return;

        var links = getSidebarLinks();
        var matched = null;

        // Ищем наиболее точное совпадение (не endsWith — проверяем полный путь)
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            var href = a.getAttribute('href');
            if (!href || href.charAt(0) === '#') continue;
            if (href.indexOf('http') === 0) continue;

            var linkPath;
            try {
                // Резолвим относительно базы чтобы получить абсолютный путь
                var url = new URL(href, window.location.origin);
                linkPath = normalizePath(url.pathname);
            } catch(e) {
                linkPath = normalizePath(href);
            }

            if (linkPath === currentPath) {
                matched = a;
                break;
            }
        }

        if (!matched) return;

        matched.classList.add('mars-active-link');

        // Подсвечиваем родителей-цепочку
        var parent = matched.closest('li');
        var depth = 0;
        while (parent && depth < 5) {
            parent.classList.add('mars-active-parent');
            var parentLink = parent.querySelector(':scope > a');
            if (parentLink && parentLink !== matched) {
                parentLink.parentElement.classList.add('mars-active-parent-trail');
            }
            parent = parent.parentElement ? parent.parentElement.closest('li') : null;
            depth++;
        }

        // Автопрокрутка сайдбара к активной ссылке (если она вне видимости)
        try {
            var sidebar = getSidebar();
            if (sidebar && matched.scrollIntoView) {
                var rect = matched.getBoundingClientRect();
                var sbRect = sidebar.getBoundingClientRect();
                if (rect.top < sbRect.top || rect.bottom > sbRect.bottom) {
                    matched.scrollIntoView({ block: 'center', behavior: 'auto' });
                }
            }
        } catch(e) {}

        log('активная статья:', currentPath);
    }

    // ============================================================
    // 🚀 Инициализация
    // ============================================================
    function init() {
        injectStyles();
        attachSaveOnClick();
        restoreScrollPosition();
        scrollToHash();
        highlightActiveArticle();

        // Реагируем на изменение hash без перезагрузки
        window.addEventListener('hashchange', scrollToHash);
    }

    // Гарантированный запуск — независимо от readyState
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsSidebar = {
        save: saveScrollPosition,
        restore: restoreScrollPosition,
        highlight: highlightActiveArticle,
        scrollToHash: scrollToHash,
        clear: function() {
            if (STORAGE) {
                try { STORAGE.removeItem(STORAGE_KEY); } catch(e) {}
            }
        }
    };

    if (DEBUG) console.log('✅ sidebar-scroll.js v2 VIP загружен');
})();
