// ============================================================
// lazy-images.js — v2 VIP
// Отложенная загрузка изображений + приоритет LCP
// - WeakSet вместо data-атрибута (быстрее, не пишет в DOM)
// - Правильный LCP: только 1 eager-картинка
// - IntersectionObserver с rootMargin
// - decode() перед показом (без "прыжков")
// - Retry для динамических картинок
// - Auto-disconnect observer через 30 сек
// - Публичное API: window.marsLazyImages.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsLazyImagesLoaded) return;
    window.__marsLazyImagesLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var CONFIG = {
        rootMargin: '300px',         // за сколько px до входа начинать грузить
        eagerThreshold: 400,         // px от верха — считать "выше сгиба"
        onlyFirstEager: true,        // только 1 картинка выше сгиба получает eager
        observerTimeoutMs: 30000,    // auto-disconnect observer
        DEBUG: false
    };

    function log() {
        if (!CONFIG.DEBUG) return;
        try { console.log.apply(console, ['🖼️ lazy:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 📦 Состояние
    // ============================================================
    var processed = new WeakSet();
    var eagerAssigned = false;
    var observer = null;

    // ============================================================
    // 🔍 Обработка одной картинки
    // ============================================================
    function processImage(img) {
        if (!img || img.tagName !== 'IMG') return;
        if (processed.has(img)) return;
        processed.add(img);

        // Уже с явными атрибутами — не трогаем
        var hasExplicitLoading = img.hasAttribute('loading');
        var hasDataSrc = img.hasAttribute('data-src');

        // Eager для первой картинки выше сгиба (LCP)
        if (CONFIG.onlyFirstEager && !eagerAssigned && !hasExplicitLoading) {
            var rect = img.getBoundingClientRect();
            if (rect.top < CONFIG.eagerThreshold && rect.top > -rect.height) {
                img.loading = 'eager';
                img.fetchPriority = 'high';
                try { img.decoding = 'sync'; } catch(e) {}
                eagerAssigned = true;
                log('eager:', img.src || img.alt || '(no src)');
                return;
            }
        }

        // Всё остальное — lazy
        if (!img.loading) img.loading = 'lazy';
        if (!img.decoding) img.decoding = 'async';
        try { img.fetchPriority = 'low'; } catch(e) {}

        // Если есть data-src — ставим observer
        if (hasDataSrc && observer) {
            try { observer.observe(img); } catch(e) {}
        }
    }

    // ============================================================
    // 🎯 Пакетная обработка
    // ============================================================
    function processAll(root) {
        var scope = root || document;
        var imgs = scope.querySelectorAll ? scope.querySelectorAll('img') : [];
        for (var i = 0; i < imgs.length; i++) {
            processImage(imgs[i]);
        }
    }

    // ============================================================
    // 👁️ IntersectionObserver
    // ============================================================
    function initObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: грузим всё сразу
            log('IO недоступен — грузим data-src сразу');
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                if (!img.src && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            return;
        }

        observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (!entry.isIntersecting) continue;

                var img = entry.target;

                if (img.dataset && img.dataset.src && !img.src) {
                    var src = img.dataset.src;
                    img.removeAttribute('data-src');

                    // Плавно: сначала грузим, потом показываем
                    var tmp = new Image();
                    tmp.onload = function() {
                        img.src = src;
                        img.classList.add('mars-img-loaded');
                    };
                    tmp.onerror = function() {
                        img.src = src;
                    };
                    tmp.src = src;

                    // decode() — если браузер поддерживает
                    if (typeof tmp.decode === 'function') {
                        tmp.decode().catch(function() {}).then(function() {
                            if (!img.src) img.src = src;
                        });
                    }
                }

                try { observer.unobserve(img); } catch(e) {}
            }
        }, {
            rootMargin: CONFIG.rootMargin,
            threshold: 0.01
        });

        // Наблюдаем за всеми data-src
        document.querySelectorAll('img[data-src]').forEach(function(img) {
            try { observer.observe(img); } catch(e) {}
        });

        // Auto-disconnect
        setTimeout(function() {
            if (observer) {
                try { observer.disconnect(); } catch(e) {}
                observer = null;
                log('observer отключён (timeout)');
            }
        }, CONFIG.observerTimeoutMs);
    }

    // ============================================================
    // 🔄 MutationObserver — для динамических картинок
    // ============================================================
    var mo = null;
    var moTimer = null;

    function initMutationObserver() {
        if (typeof MutationObserver === 'undefined') return;

        mo = new MutationObserver(function(mutations) {
            // Debounce — чтобы не обрабатывать каждую мутацию
            if (moTimer) return;
            moTimer = setTimeout(function() {
                moTimer = null;
                var found = false;
                for (var i = 0; i < mutations.length && !found; i++) {
                    var m = mutations[i];
                    if (!m.addedNodes || !m.addedNodes.length) continue;
                    for (var j = 0; j < m.addedNodes.length; j++) {
                        var n = m.addedNodes[j];
                        if (n.nodeType !== 1) continue;
                        if (n.tagName === 'IMG' || (n.querySelector && n.querySelector('img'))) {
                            found = true;
                            break;
                        }
                    }
                }
                if (found) processAll(document);
            }, 250);
        });

        try {
            mo.observe(document.body, { childList: true, subtree: true });
            // Auto-disconnect через 60 сек
            setTimeout(function() {
                if (mo) {
                    try { mo.disconnect(); } catch(e) {}
                    mo = null;
                    log('mutation observer отключён');
                }
            }, 60000);
        } catch(e) {}
    }

    // ============================================================
    // 🎨 CSS — плавное появление
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mars-lazy-style')) return;
        var s = document.createElement('style');
        s.id = 'mars-lazy-style';
        s.textContent = `
            img[data-src] {
                opacity: 0.4;
                transition: opacity 0.3s ease;
            }
            img.mars-img-loaded {
                opacity: 1;
            }
            @media (prefers-reduced-motion: reduce) {
                img[data-src], img.mars-img-loaded {
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function init() {
        injectStyles();
        initObserver();
        processAll(document);

        // Обработать после того как всё загрузилось (для поздних картинок)
        window.addEventListener('load', function() {
            processAll(document);
        }, { once: true });

        // MutationObserver для динамики
        if (document.body) {
            initMutationObserver();
        } else {
            document.addEventListener('DOMContentLoaded', initMutationObserver);
        }

        log('загружен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsLazyImages = {
        refresh: function() { processAll(document); },
        process: processImage,
        count: function() {
            return document.querySelectorAll('img[data-src]').length;
        }
    };

    if (CONFIG.DEBUG) console.log('✅ lazy-images.js v2 VIP загружен');
})();
