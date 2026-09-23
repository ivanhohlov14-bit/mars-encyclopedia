// mobile-smooth.js v2 — мягкая оптимизация без отключения анимаций
(function() {
    'use strict';

    var isMobile = window.innerWidth <= 768 ||
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) return;

    console.log('[mobile-smooth] 📱 Мягкая оптимизация');

    // ═══════════════════════════════════════════════════════════
    // 1. Помечаем body
    // ═══════════════════════════════════════════════════════════
    document.documentElement.classList.add('is-mobile-smooth');

    // ═══════════════════════════════════════════════════════════
    // 2. Пауза off-screen анимаций (не отключение — пауза!)
    // ═══════════════════════════════════════════════════════════
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                // Пауза, а не отключение — вернётся при появлении
                entry.target.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
            });
        }, { rootMargin: '200px' });

        // Наблюдаем за большими блоками
        var observeBigBlocks = function() {
            document.querySelectorAll(
                '.pf-hero, .vip-banner, .lg-hero, .quote-vip, ' +
                '.timeline-item, .pf-card, .infobox-vip, .table-vip, ' +
                '.interpretation-item, .pf-note'
            ).forEach(function(el) {
                if (!el.dataset.smoothObserved) {
                    el.dataset.smoothObserved = '1';
                    io.observe(el);
                }
            });
        };

        observeBigBlocks();
        setTimeout(observeBigBlocks, 1000);
        setTimeout(observeBigBlocks, 3000);
    }

    // ═══════════════════════════════════════════════════════════
    // 3. Пауза анимаций на скрытой вкладке (не отключение)
    // ═══════════════════════════════════════════════════════════
    document.addEventListener('visibilitychange', function() {
        var all = document.querySelectorAll('*');
        var state = document.hidden ? 'paused' : '';
        // Проходим только по реально анимированным
        document.querySelectorAll(
            '.pf-hero, .pf-hero::before, .pf-hero::after, ' +
            '.vip-banner, .lg-hero, .lg-logo, .lg-logo-orbit, ' +
            '.pf-avatar-wrap, .pf-avatar-ring, .pf-mod-badge'
        ).forEach(function(el) {
            el.style.animationPlayState = state;
        });
    });

    // ═══════════════════════════════════════════════════════════
    // 4. Throttle скролла
    // ═══════════════════════════════════════════════════════════
    var scrollRaf = false;
    window.addEventListener('scroll', function() {
        if (scrollRaf) return;
        scrollRaf = true;
        requestAnimationFrame(function() { scrollRaf = false; });
    }, { passive: true });

    // ═══════════════════════════════════════════════════════════
    // 5. Останавливаем setInterval на невидимой вкладке
    // ═══════════════════════════════════════════════════════════
    var _origSetInterval = window.setInterval;
    window.setInterval = function(fn, ms) {
        var id = _origSetInterval.call(window, function() {
            // Если вкладка скрыта и интервал частый — пропускаем
            if (document.hidden && ms < 1000) return;
            fn.apply(this, arguments);
        }, ms);
        return id;
    };

    // ═══════════════════════════════════════════════════════════
    // 6. Точка Curiosity — замедляем SVG-анимации
    // ═══════════════════════════════════════════════════════════
    setTimeout(function() {
        document.querySelectorAll('svg circle, svg .pulse, .curiosity-dot, .mars-map-dot, [class*="curiosity"]').forEach(function(el) {
            // Замедляем в 2 раза, а не отключаем
            el.querySelectorAll('animate, animateTransform').forEach(function(a) {
                var dur = a.getAttribute('dur');
                if (dur) {
                    // Парсим "2s" → "4s"
                    var match = dur.match(/^([\d.]+)(s|ms)?$/);
                    if (match) {
                        var val = parseFloat(match[1]);
                        var unit = match[2] || 's';
                        a.setAttribute('dur', (val * 2.5) + unit);
                    }
                }
            });
            // Если CSS-анимация — замедляем
            var cs = getComputedStyle(el);
            if (cs.animationName && cs.animationName !== 'none') {
                el.style.animationDuration = '4s';
            }
        });
    }, 1000);

    // ═══════════════════════════════════════════════════════════
    // 7. FPS-монитор — только помечаем, не отключаем
    // ═══════════════════════════════════════════════════════════
    var frameCount = 0;
    var lastTime = performance.now();
    var lowFpsCount = 0;

    function checkFPS(now) {
        frameCount++;
        if (now - lastTime >= 1000) {
            var fps = frameCount;
            frameCount = 0;
            lastTime = now;

            if (fps < 30) {
                lowFpsCount++;
                if (lowFpsCount >= 3) {
                    console.warn('[mobile-smooth] ⚠️ FPS стабильно низкий — мягкий режим');
                    document.documentElement.classList.add('soft-mode');
                    addSoftModeStyle();
                }
            } else {
                lowFpsCount = 0;
            }
        }
        requestAnimationFrame(checkFPS);
    }
    requestAnimationFrame(checkFPS);

    // Мягкий режим — только замедление, НЕ отключение
    function addSoftModeStyle() {
        if (document.getElementById('soft-mode-style')) return;
        var st = document.createElement('style');
        st.id = 'soft-mode-style';
        st.textContent = `
            .soft-mode .pf-hero::before,
            .soft-mode .pf-hero::after,
            .soft-mode .lg-hero::before,
            .soft-mode .lg-hero::after,
            .soft-mode .lg-logo,
            .soft-mode .lg-logo-orbit,
            .soft-mode .pf-avatar-ring {
                animation-duration: 25s !important;
            }
            .soft-mode * {
                transition-duration: .15s !important;
            }
        `;
        document.head.appendChild(st);
    }

    // ═══════════════════════════════════════════════════════════
    // 8. Repaint после загрузки
    // ═══════════════════════════════════════════════════════════
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.style.transform = 'translateZ(0)';
            requestAnimationFrame(function() {
                document.body.style.transform = '';
            });
        }, 500);
    });

    console.log('[mobile-smooth] ✅ Готово (мягкий режим)');
})();
