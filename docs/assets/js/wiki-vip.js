// wiki-vip.js — интерактив для статей энциклопедии
(function() {
    'use strict';

    function init() {
        // 1. Прогресс чтения
        initReadingProgress();
        // 2. Timeline — появление при скролле
        initTimeline();
        // 3. FAQ аккордеон
        initFAQ();
        // 4. Быстрая загрузка картинок
        optimizeImages();
    }

    // ============================================================
    // 📊 ПРОГРЕСС ЧТЕНИЯ
    // ============================================================
    function initReadingProgress() {
        if (document.querySelector('.wiki-progress')) return;
        var bar = document.createElement('div');
        bar.className = 'wiki-progress';
        document.body.appendChild(bar);

        var ticking = false;
        window.addEventListener('scroll', function() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function() {
                var h = document.documentElement.scrollHeight - window.innerHeight;
                var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
                bar.style.width = Math.min(pct, 100) + '%';
                ticking = false;
            });
        }, { passive: true });
    }

    // ============================================================
    // 📅 TIMELINE
    // ============================================================
    function initTimeline() {
        var items = document.querySelectorAll('.wiki-timeline-item');
        if (!items.length) return;

        if (!('IntersectionObserver' in window)) {
            items.forEach(function(el) { el.classList.add('visible'); });
            return;
        }

        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var idx = Array.prototype.indexOf.call(items, entry.target);
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, idx * 80);
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -50px 0px' });

        items.forEach(function(el) { io.observe(el); });
    }

    // ============================================================
    // ❓ FAQ АККОРДЕОН
    // ============================================================
    function initFAQ() {
        document.querySelectorAll('.wiki-faq-q').forEach(function(q) {
            q.onclick = function() {
                var item = q.parentElement;
                item.classList.toggle('open');
            };
        });
    }

    // ============================================================
    // 🖼️ БЫСТРАЯ ЗАГРУЗКА КАРТИНОК
    // ============================================================
    function optimizeImages() {
        document.querySelectorAll('.wiki-content img, .wiki-infobox img').forEach(function(img) {
            if (!img.loading) img.loading = 'lazy';
            if (!img.decoding) img.decoding = 'async';
            // Первая картинка — приоритет
            if (img.getBoundingClientRect().top < window.innerHeight) {
                img.loading = 'eager';
                img.fetchPriority = 'high';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
