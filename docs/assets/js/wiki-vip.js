// ============================================================
// wiki-vip.js — v2 VIP
// Интерактив для статей: прогресс чтения, timeline, FAQ, lazy-images
// - Timeline через замыкание (без O(n²))
// - FAQ через делегирование (не перезаписывает onclick)
// - Оптимизация картинок батчем (без layout-thrashing)
// - Прогресс-бар только на статьях
// - document$ + MutationObserver для SPA
// - prefers-reduced-motion
// - Публичное API: window.marsWikiVip.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsWikiVipLoaded) return;
    window.__marsWikiVipLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var DEBUG = false;
    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['📖 wiki-vip:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    var REDUCED_MOTION = prefersReducedMotion();

    // ============================================================
    // 🚫 Не для служебных страниц
    // ============================================================
    var EXCLUDE_PATHS = [
        '/', '/index/', '/profile/', '/login/', '/register/',
        '/stats/', '/game/', '/moderator/', '/profile-view/',
        '/bookmarks/', '/top/', '/feed/', '/achievements/',
        '/quests/', '/quest-map/', '/forum/', '/guilds/',
        '/horoscope/', '/scrolls/', '/categories/',
        '/en/', '/en/index/'
    ];

    function isExcluded() {
        var path = (window.location.pathname || '/').replace(/\/$/, '') || '/';
        for (var i = 0; i < EXCLUDE_PATHS.length; i++) {
            var ex = EXCLUDE_PATHS[i].replace(/\/$/, '') || '/';
            if (path === ex) return true;
        }
        return false;
    }

    // ============================================================
    // 📊 ПРОГРЕСС ЧТЕНИЯ
    // ============================================================
    var progressBar = null;
    var progressTicking = false;

    function initReadingProgress() {
        if (document.querySelector('.wiki-progress')) {
            progressBar = document.querySelector('.wiki-progress');
            return;
        }

        progressBar = document.createElement('div');
        progressBar.className = 'wiki-progress';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-label', 'Прогресс чтения');

        // Стиль встроен — не зависим от extra.css
        progressBar.style.cssText =
            'position:fixed;top:0;left:0;height:3px;width:0;' +
            'background:linear-gradient(90deg,#6C63FF,#A29BFE,#6C63FF);' +
            'background-size:200% auto;' +
            'z-index:9999988;pointer-events:none;' +
            'box-shadow:0 0 10px rgba(108,99,255,.6);' +
            'transition:width .1s linear;';

        document.body.appendChild(progressBar);

        window.addEventListener('scroll', onProgressScroll, { passive: true });
        // Первый расчёт
        onProgressScroll();
    }

    function onProgressScroll() {
        if (progressTicking || !progressBar) return;
        progressTicking = true;
        requestAnimationFrame(function() {
            progressTicking = false;
            var h = document.documentElement.scrollHeight - window.innerHeight;
            var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
            progressBar.style.width = Math.min(pct, 100).toFixed(2) + '%';
        });
    }

    function destroyProgress() {
        if (progressBar) {
            window.removeEventListener('scroll', onProgressScroll);
            if (progressBar.parentNode) progressBar.remove();
            progressBar = null;
        }
    }

    // ============================================================
    // 📅 TIMELINE — плавное появление
    // ============================================================
    var timelineObserver = null;

    function initTimeline() {
        var items = document.querySelectorAll('.wiki-timeline-item:not([data-wv-observed])');
        if (!items.length) return;

        // Без IntersectionObserver — показываем всё сразу
        if (!('IntersectionObserver' in window) || REDUCED_MOTION) {
            Array.prototype.forEach.call(items, function(el) {
                el.classList.add('visible');
                el.dataset.wvObserved = '1';
            });
            return;
        }

        if (!timelineObserver) {
            timelineObserver = new IntersectionObserver(function(entries) {
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (!entry.isIntersecting) continue;

                    var el = entry.target;
                    var idx = parseInt(el.dataset.wvIndex || '0', 10);

                    setTimeout(function() {
                        el.classList.add('visible');
                    }, idx * 80);

                    timelineObserver.unobserve(el);
                }
            }, { rootMargin: '0px 0px -50px 0px' });
        }

        // ✅ Используем замыкание — не O(n²), как было с indexOf
        Array.prototype.forEach.call(items, function(el, idx) {
            el.dataset.wvObserved = '1';
            el.dataset.wvIndex = String(idx);
            timelineObserver.observe(el);
        });
    }

    // ============================================================
    // ❓ FAQ — делегирование событий
    // ============================================================
    var faqBound = false;

    function initFAQ() {
        if (faqBound) return;
        faqBound = true;

        // ✅ Один обработчик на документ — не перезаписывает onclick
        document.addEventListener('click', function(e) {
            var q = e.target.closest && e.target.closest('.wiki-faq-q');
            if (!q) return;
            var item = q.parentElement;
            if (!item) return;
            item.classList.toggle('open');

            // ARIA
            var isOpen = item.classList.contains('open');
            q.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Инициализация ARIA на существующих
        document.querySelectorAll('.wiki-faq-q').forEach(function(q) {
            if (q.getAttribute('aria-expanded') === null) {
                q.setAttribute('aria-expanded', 'false');
                q.setAttribute('role', 'button');
                q.setAttribute('tabindex', '0');
            }
        });

        // Клавиатура — Space / Enter
        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            var q = e.target.closest && e.target.closest('.wiki-faq-q');
            if (!q) return;
            e.preventDefault();
            q.click();
        });
    }

    // ============================================================
    // 🖼️ КАРТИНКИ — пакетно, без layout-thrashing
    // ============================================================
    function optimizeImages() {
        // Картинки, которые ещё не обработаны
        var imgs = document.querySelectorAll(
            '.wiki-content img:not([data-wv-img]), .wiki-infobox img:not([data-wv-img])'
        );
        if (!imgs.length) return;

        // 1. Читаем все позиции ЗА ОДИН ПРОХОД (без чередования с записью)
        var vh = window.innerHeight;
        var rects = [];
        for (var i = 0; i < imgs.length; i++) {
            rects.push(imgs[i].getBoundingClientRect());
        }

        // 2. Применяем стили — тоже одним проходом
        for (var j = 0; j < imgs.length; j++) {
            var img = imgs[j];
            img.dataset.wvImg = '1';

            var isAboveFold = rects[j].top < vh && rects[j].bottom > 0;

            if (isAboveFold && j === 0) {
                // Только первая картинка сверху — eager
                img.loading = 'eager';
                try { img.fetchPriority = 'high'; } catch(e) {}
            } else {
                if (!img.hasAttribute('loading')) img.loading = 'lazy';
                if (!img.hasAttribute('decoding')) img.decoding = 'async';
                try { img.fetchPriority = 'low'; } catch(e) {}
            }
        }
    }

    // ============================================================
    // 🔄 Обработка динамики
    // ============================================================
    var mo = null;
    var moTimer = null;

    function initMutationObserver() {
        if (typeof MutationObserver === 'undefined') return;
        if (mo) return;

        mo = new MutationObserver(function(mutations) {
            if (moTimer) return;
            moTimer = setTimeout(function() {
                moTimer = null;
                // Перезапускаем только то, что могло измениться
                initTimeline();
                initFAQ();
                optimizeImages();
            }, 300);
        });

        try {
            mo.observe(document.body, { childList: true, subtree: true });
            // Auto-disconnect через 30 сек
            setTimeout(function() {
                if (mo) {
                    try { mo.disconnect(); } catch(e) {}
                    mo = null;
                    log('mutation observer отключён');
                }
            }, 30000);
        } catch(e) {}
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    var started = false;

    function init() {
        if (isExcluded()) {
            log('служебная страница — выход');
            return;
        }
        if (started) return;
        started = true;

        // 1. Прогресс чтения
        initReadingProgress();

        // 2. Timeline
        initTimeline();

        // 3. FAQ
        initFAQ();

        // 4. Картинки — после небольшой задержки (шрифты успеют)
        setTimeout(optimizeImages, 100);

        // 5. MutationObserver
        if (document.body) {
            initMutationObserver();
        } else {
            document.addEventListener('DOMContentLoaded', initMutationObserver);
        }

        log('v2 VIP активен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🔄 MkDocs Material SPA
    // ============================================================
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                started = false;
                destroyProgress();
                setTimeout(init, 150);
            });
        } catch(e) {}
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsWikiVip = {
        refresh: function() {
            initTimeline();
            initFAQ();
            optimizeImages();
        },
        progress: {
            show: function() {
                if (!progressBar) initReadingProgress();
            },
            hide: destroyProgress
        }
    };

    log('v2 VIP загружен');
})();
