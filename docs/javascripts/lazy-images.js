// lazy-images.js — отложенная загрузка всех картинок
(function() {
    'use strict';

    // Все картинки на странице получают lazy (кроме первой в шапке)
    function applyLazy() {
        document.querySelectorAll('img:not([data-lazy-ready])').forEach(function(img) {
            img.setAttribute('data-lazy-ready', '1');
            if (!img.loading) img.loading = 'lazy';
            if (!img.decoding) img.decoding = 'async';
            // Первая картинка — eager (для LCP)
            if (img.getBoundingClientRect().top < window.innerHeight) {
                img.loading = 'eager';
                img.fetchPriority = 'high';
            }
        });
    }

    // IntersectionObserver — грузим только когда видно
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    if (img.dataset.src && !img.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    io.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });

        setTimeout(function() {
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                io.observe(img);
            });
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyLazy);
    } else {
        applyLazy();
    }

    // После динамических вставок (комментарии, профиль)
    var mo = new MutationObserver(function() { applyLazy(); });
    setTimeout(function() {
        if (document.body) {
            mo.observe(document.body, { childList: true, subtree: true });
        }
    }, 1000);
})();
