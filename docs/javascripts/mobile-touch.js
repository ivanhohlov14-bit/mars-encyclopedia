// ============================================================
// mobile-touch.js — v2 VIP
// Оптимизация тач-взаимодействия на мобильных
// ============================================================
(function() {
    'use strict';

    if (window.__marsMobileTouchLoaded) return;
    window.__marsMobileTouchLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var CONFIG = {
        touchClassMs: 180,
        scrollVar: '--scroll-y',
        DEBUG: false
    };

    function log() {
        if (!CONFIG.DEBUG) return;
        try { console.log.apply(console, ['👆 touch:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 0 && window.innerWidth <= 768) return true;
        return window.innerWidth <= 768;
    }

    if (!isMobile()) {
        log('не мобильный — выход');
        return;
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mars-mobile-touch-style')) return;
        var s = document.createElement('style');
        s.id = 'mars-mobile-touch-style';
        s.textContent = `
            .mars-touching {
                opacity: 0.72;
                transition: opacity 0.08s ease-out;
            }

            @media (hover: none) and (pointer: coarse) {
                .pf-quick-card:hover,
                .pf-card:hover,
                .pf-timer-card:hover,
                .pf-ach:hover,
                .pf-note:hover,
                .pf-notif:hover,
                .pf-friend:hover,
                .pf-btn:hover,
                .pf-tab:hover,
                .pf-mypage-tile:hover,
                .pf-mypage-action:hover,
                .pf-device-link-btn:hover,
                .cat-chip:hover {
                    transform: none !important;
                    filter: none !important;
                }
                .pf-quick-card:hover,
                .pf-card:hover,
                .pf-timer-card:hover {
                    box-shadow: 0 4px 16px rgba(0,0,0,.05) !important;
                }
                .pf-btn:hover,
                .pf-device-link-btn:hover {
                    box-shadow: 0 6px 16px -4px rgba(108,99,255,.4) !important;
                }
            }

            html { -webkit-tap-highlight-color: transparent; }
            button, a, [role="button"] {
                -webkit-tap-highlight-color: transparent;
                touch-action: manipulation;
            }
            input, textarea, select { -webkit-tap-highlight-color: transparent; }

            @media (prefers-reduced-motion: reduce) {
                .mars-touching { transition: none !important; }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 👆 Tap feedback
    // ============================================================
    var activeTouchEl = null;
    var clearTimer = null;

    function clearTouching() {
        if (clearTimer) { clearTimeout(clearTimer); clearTimer = null; }
        if (activeTouchEl) {
            activeTouchEl.classList.remove('mars-touching');
            activeTouchEl = null;
        }
    }

    function onTouchStart(e) {
        if (!e.touches || e.touches.length !== 1) return;

        clearTouching();

        var el = e.target;
        if (!el || el.nodeType !== 1) return;

        var target = el.closest && el.closest(
            'a, button, [role="button"], .pf-btn, .pf-tab, ' +
            '.pf-quick-card, .pf-mypage-tile, .pf-mypage-action, ' +
            '.cat-chip, .lang-link, .md-nav__link, .wy-menu-vertical a, ' +
            '.pf-note-btn, .pf-device-link-btn'
        );
        if (!target) return;

        activeTouchEl = target;
        target.classList.add('mars-touching');

        clearTimer = setTimeout(clearTouching, CONFIG.touchClassMs);
    }

    function onTouchMove() {
        clearTouching();
    }

    function onTouchEnd() {
        if (clearTimer) clearTimeout(clearTimer);
        clearTimer = setTimeout(clearTouching, 40);
    }

    function attachTouch() {
        document.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('touchmove', onTouchMove, { passive: true });
        document.addEventListener('touchend', onTouchEnd, { passive: true });
        document.addEventListener('touchcancel', onTouchEnd, { passive: true });
    }

    // ============================================================
    // 🖱️ Passive touchstart-заглушка (убирает 300ms задержку)
    // ============================================================
    function killClickDelay() {
        document.addEventListener('touchstart', function() {}, { passive: true });
    }

    // ============================================================
    // 📜 Scroll-оптимизация через rAF
    // ============================================================
    var scrollTick = false;
    var lastScrollY = -1;

    function onScroll() {
        if (scrollTick) return;
        scrollTick = true;
        requestAnimationFrame(function() {
            scrollTick = false;
            var y = window.scrollY;
            if (y === lastScrollY) return;
            lastScrollY = y;
            try {
                document.documentElement.style.setProperty(CONFIG.scrollVar, y + 'px');
            } catch(e) {}
        });
    }

    function attachScroll() {
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ============================================================
    // 👁️ Пауза touch-фидбека при скрытой вкладке
    // ============================================================
    function onVisibilityChange() {
        if (document.hidden) clearTouching();
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function init() {
        injectStyles();
        killClickDelay();
        attachTouch();
        attachScroll();
        document.addEventListener('visibilitychange', onVisibilityChange);
        log('включено');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsMobileTouch = {
        isMobile: isMobile(),
        clearTouching: clearTouching,
        destroy: function() {
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
            document.removeEventListener('touchcancel', onTouchEnd);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            clearTouching();
        }
    };
})();
