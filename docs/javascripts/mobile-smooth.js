// mobile-smooth.js — управление анимациями и рендером на мобильных
(function() {
    'use strict';

    var isMobile = window.innerWidth <= 768 ||
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) return;

    console.log('[mobile-smooth] 📱 Оптимизация анимаций');

    // ═══════════════════════════════════════════════════════════
    // 1. Помечаем body → CSS знает, что это мобильный
    // ═══════════════════════════════════════════════════════════
    document.documentElement.classList.add('is-mobile-lite');

    // ═══════════════════════════════════════════════════════════
    // 2. Пауза анимаций когда вкладка неактивна
    // ═══════════════════════════════════════════════════════════
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.documentElement.classList.add('animations-paused');
        } else {
            document.documentElement.classList.remove('animations-paused');
        }
    });

    // ═══════════════════════════════════════════════════════════
    // 3. Останавливаем анимации у off-screen элементов
    // ═══════════════════════════════════════════════════════════
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = '';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, { rootMargin: '100px' });

        // Наблюдаем за анимированными элементами
        setTimeout(function() {
            document.querySelectorAll(
                '.pf-hero, .vip-banner, .lg-hero, .quote-vip, ' +
                '.timeline-item, .pf-card, .pf-timer-card, .pf-note, ' +
                '.pf-ach, .pf-notif, .interpretation-item, .infobox-vip'
            ).forEach(function(el) {
                io.observe(el);
            });
        }, 500);
    }

    // ═══════════════════════════════════════════════════════════
    // 4. Throttle скролла и ресайза до 60 FPS
    // ═══════════════════════════════════════════════════════════
    var scrollRaf = false;
    window.addEventListener('scroll', function() {
        if (scrollRaf) return;
        scrollRaf = true;
        requestAnimationFrame(function() {
            scrollRaf = false;
        });
    }, { passive: true });

    // ═══════════════════════════════════════════════════════════
    // 5. Останавливаем тяжёлые setInterval на невидимой вкладке
    // ═══════════════════════════════════════════════════════════
    var _origSetInterval = window.setInterval;
    window.setInterval = function(fn, ms) {
        // Останавливаем, если интервал < 1 сек и вкладка скрыта
        var id = _origSetInterval.call(window, function() {
            if (ms < 1000 && document.hidden) return;
            fn.apply(this, arguments);
        }, ms);
        return id;
    };

    // ═══════════════════════════════════════════════════════════
    // 6. Точка Curiosity на карте — упрощаем анимацию
    // ═══════════════════════════════════════════════════════════
    setTimeout(function() {
        // Находим элементы карты с анимацией
        document.querySelectorAll('svg circle, svg .pulse, .curiosity-dot, .mars-map-dot').forEach(function(dot) {
            // Отключаем SVG-анимации
            dot.querySelectorAll('animate, animateTransform').forEach(function(a) {
                a.setAttribute('dur', '5s'); // замедляем в 3 раза
            });
            // Отключаем CSS-анимации
            dot.style.animation = 'none';
            dot.style.willChange = 'auto';
        });
    }, 1000);

    // ═══════════════════════════════════════════════════════════
    // 7. Помечаем элементы, которые используют box-shadow в анимации
    // ═══════════════════════════════════════════════════════════
    setTimeout(function() {
        document.querySelectorAll('[class*="glow"], [class*="pulse"]').forEach(function(el) {
            el.style.animation = 'none';
        });
    }, 800);

    // ═══════════════════════════════════════════════════════════
    // 8. Следим за FPS — если проседает, отключаем ещё больше
    // ═══════════════════════════════════════════════════════════
    var frameCount = 0;
    var lastTime = performance.now();
    function checkFPS(now) {
        frameCount++;
        if (now - lastTime >= 1000) {
            var fps = frameCount;
            frameCount = 0;
            lastTime = now;

            if (fps < 40) {
                console.warn('[mobile-smooth] ⚠️ FPS упал до ' + fps + ' — экстренный режим');
                document.documentElement.classList.add('ultra-lite');

                // Отключаем абсолютно все анимации
                var style = document.getElementById('ultra-lite-style');
                if (!style) {
                    style = document.createElement('style');
                    style.id = 'ultra-lite-style';
                    style.textContent = `
                        .ultra-lite *,
                        .ultra-lite *::before,
                        .ultra-lite *::after {
                            animation: none !important;
                            transition: none !important;
                            box-shadow: none !important;
                        }
                        .ultra-lite .pf-hero::before,
                        .ultra-lite .pf-hero::after,
                        .ultra-lite .vip-banner::before,
                        .ultra-lite .vip-banner::after {
                            display: none !important;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }
        requestAnimationFrame(checkFPS);
    }
    requestAnimationFrame(checkFPS);

    // ═══════════════════════════════════════════════════════════
    // 9. Принудительный repaint после загрузки (фикс «залипания»)
    // ═══════════════════════════════════════════════════════════
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.style.transform = 'translateZ(0)';
            requestAnimationFrame(function() {
                document.body.style.transform = '';
            });
        }, 500);
    });

    // ═══════════════════════════════════════════════════════════
    // 10. Убираем «hover-залипание» после тапа
    // ═══════════════════════════════════════════════════════════
    document.addEventListener('touchstart', function(e) {
        var el = e.target;
        while (el && el !== document.body) {
            if (el.classList && el.classList.contains('pf-tab')) {
                break;
            }
            el = el.parentElement;
        }
    }, { passive: true });

    console.log('[mobile-smooth] ✅ Готово. CSS-класс is-mobile-lite добавлен');
})();
