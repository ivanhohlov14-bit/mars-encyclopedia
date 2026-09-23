// ============================================================
// mobile.js — v2 VIP
// Мобильные фиксы: шапка, drawer, доп. кнопка (только если нет auth-button)
// - НЕ дублирует auth-button.js (проверяет #auth-btn-container)
// - Дебаунс reset() — было 3× на клик → стало 1×
// - Уважает prefers-reduced-motion
// - Safe storage, единый стиль с VIP-палитрой
// - Публичное API: window.marsMobile.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsMobileLoaded) return;
    window.__marsMobileLoaded = true;

    // ============================================================
    // 📱 Определение
    // ============================================================
    function detectMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 1 && window.innerWidth < 1024) return true;
        return window.innerWidth < 768;
    }

    var IS_MOBILE = detectMobile();
    if (!IS_MOBILE) {
        console.log('ℹ️ mobile.js: не мобильный — выход');
        return;
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var CONFIG = {
        loginUrl:   '/login/',
        profileUrl: '/profile/',
        loginText:  'Войти',
        profileText:'Профиль',
        hideOnPages: ['/secret/', '/secret-2/', '/login/']
    };

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function vibrate(p) {
        try { if (navigator.vibrate) navigator.vibrate(p); } catch(e) {}
    }

    function debounce(fn, wait) {
        var t = null;
        return function() {
            var args = arguments, ctx = this;
            if (t) clearTimeout(t);
            t = setTimeout(function() { t = null; fn.apply(ctx, args); }, wait);
        };
    }

    function isHiddenPage() {
        var path = window.location.pathname;
        for (var i = 0; i < CONFIG.hideOnPages.length; i++) {
            if (path.indexOf(CONFIG.hideOnPages[i]) !== -1) return true;
        }
        return false;
    }

    // ============================================================
    // 🎨 Стили (один раз, с ID)
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mars-mobile-style')) return;
        var s = document.createElement('style');
        s.id = 'mars-mobile-style';
        s.textContent = `
            /* ===== Кнопка (только если нет auth-button) ===== */
            #mobile-register-btn {
                position: fixed !important;
                top: calc(8px + env(safe-area-inset-top, 0px)) !important;
                right: calc(10px + env(safe-area-inset-right, 0px)) !important;
                z-index: 99980 !important;
                padding: 8px 14px !important;
                background: linear-gradient(135deg, #6C63FF, #A29BFE) !important;
                color: #fff !important;
                border-radius: 18px !important;
                font-size: 0.85rem !important;
                font-weight: 800 !important;
                text-decoration: none !important;
                box-shadow: 0 4px 14px rgba(108,99,255,0.55) !important;
                display: inline-block !important;
                font-family: inherit !important;
                letter-spacing: 0.3px !important;
                touch-action: manipulation !important;
                -webkit-tap-highlight-color: transparent !important;
                white-space: nowrap !important;
                line-height: 1.2 !important;
                box-sizing: border-box !important;
                min-width: 70px !important;
                text-align: center !important;
                transition: transform .2s cubic-bezier(.16,1,.3,1),
                            box-shadow .2s ease !important;
            }
            #mobile-register-btn:active {
                transform: scale(.94) !important;
                box-shadow: 0 2px 8px rgba(108,99,255,0.7) !important;
            }

            /* ===== Заголовок сайта — ужимаем, чтобы не наезжал ===== */
            @media screen and (max-width: 1024px) {
                .md-header__title,
                .md-header-nav__title,
                .md-header__topic,
                .md-header__title .md-header__topic,
                .wy-nav-top .title,
                .wy-nav-top > a:not(.icon):not(.menu-toggle) {
                    font-size: 0.95rem !important;
                    letter-spacing: -0.2px !important;
                    padding-right: 90px !important;
                    max-width: calc(100vw - 110px) !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                    line-height: 1.2 !important;
                }
            }
            @media screen and (max-width: 600px) {
                .md-header__title,
                .md-header-nav__title,
                .md-header__topic,
                .md-header__title .md-header__topic,
                .wy-nav-top .title,
                .wy-nav-top > a:not(.icon):not(.menu-toggle) {
                    font-size: 0.82rem !important;
                    padding-right: 85px !important;
                    max-width: calc(100vw - 105px) !important;
                }
            }
            @media screen and (max-width: 400px) {
                .md-header__title,
                .md-header-nav__title,
                .md-header__topic,
                .md-header__title .md-header__topic,
                .wy-nav-top .title,
                .wy-nav-top > a:not(.icon):not(.menu-toggle) {
                    font-size: 0.72rem !important;
                    padding-right: 80px !important;
                    max-width: calc(100vw - 100px) !important;
                }
                #mobile-register-btn {
                    padding: 7px 10px !important;
                    font-size: 0.78rem !important;
                    min-width: 62px !important;
                }
            }

            /* Тёмная тема */
            html body.mars-stars-on .md-header__title,
            html body.mars-stars-on .md-header__topic,
            html body.mars-stars-on .md-header-nav__title {
                color: #fff !important;
            }

            @media (prefers-reduced-motion: reduce) {
                #mobile-register-btn {
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 👤 Кнопка «Войти / Профиль» (только если auth-button не отработал)
    // ============================================================
    function initMobileRegisterButton() {
        if (document.getElementById('mobile-register-btn')) return false;
        if (isHiddenPage()) return false;

        // 🛑 ГЛАВНОЕ: если auth-button.js уже вставил свою кнопку — не дублируем
        if (document.getElementById('auth-btn-container')) return false;
        if (document.getElementById('auth-button')) return false;

        var onProfile = window.location.pathname.indexOf('/profile/') !== -1;
        var targetUrl = onProfile ? CONFIG.profileUrl : CONFIG.loginUrl;
        var labelText = onProfile ? CONFIG.profileText : CONFIG.loginText;

        var btn = document.createElement('a');
        btn.id = 'mobile-register-btn';
        btn.href = targetUrl;
        btn.setAttribute('aria-label', labelText);
        btn.textContent = labelText;

        // Вибрация при тапе
        btn.addEventListener('touchstart', function() { vibrate(10); }, { passive: true });

        document.body.appendChild(btn);
        console.log('👤 mobile.js: своя кнопка →', targetUrl);
        return true;
    }

    // ============================================================
    // 🍔 Reset drawer (дебаунс — было 3× на клик, стало 1×)
    // ============================================================
    function resetDrawer() {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        var menuOpen =
            document.querySelector('.wy-nav-side.shift') ||
            document.querySelector('.md-sidebar--primary[data-md-state="active"]') ||
            document.querySelector('.md-overlay[data-md-state="active"]') ||
            document.querySelector('.md-toggle--drawer:checked');
        if (menuOpen) return;

        var sels = [
            '.wy-nav-content-wrap', '.wy-nav-content',
            '.md-container', '.md-main', '.md-main__inner',
            '.md-content', '.md-content__inner'
        ];
        sels.forEach(function(sel) {
            document.querySelectorAll(sel).forEach(function(el) {
                el.style.transform = '';
                el.style.marginLeft = '';
                el.style.paddingLeft = '';
            });
        });

        var sideNav = document.querySelector('.wy-nav-side');
        if (sideNav && !sideNav.classList.contains('shift')) {
            document.querySelectorAll('.wy-nav-content-wrap.shift').forEach(function(el) {
                el.classList.remove('shift');
            });
        }

        var hasOverlay = document.querySelector('.md-overlay[data-md-state="active"]');
        if (!hasOverlay) {
            document.querySelectorAll('.md-sidebar--primary[data-md-state="active"]').forEach(function(el) {
                el.removeAttribute('data-md-state');
            });
            document.querySelectorAll('.md-nav--primary[data-md-state="active"]').forEach(function(el) {
                el.removeAttribute('data-md-state');
            });
        }

        document.body.classList.remove('md-scroll-lock');
        if (document.body.style.position === 'fixed') {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        }
    }

    var resetDebounced = debounce(resetDrawer, 120);

    function fixMobileDrawer() {
        // Клик — один вызов с дебаунсом
        document.addEventListener('click', function(e) {
            var insideMenu = e.target.closest('.wy-nav-side, .md-sidebar--primary, .md-sidebar');
            var isHamburger = e.target.closest('.wy-nav-top, .md-header__button, .md-header__button[for="__drawer"], label[for="__drawer"], label[for="__toc"]');
            var isMenuLink = e.target.closest('.wy-menu-vertical a, .md-nav__link');
            var isOverlay = e.target.closest('.md-overlay, .wy-overlay');

            if (isMenuLink || isOverlay || (!insideMenu && !isHamburger)) {
                resetDebounced();
            }
        }, true);

        // Esc закрывает меню + сбрасывает скролл
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                var drawerToggle = document.querySelector('.md-toggle--drawer');
                if (drawerToggle) drawerToggle.checked = false;
                resetDebounced();
            }
        });

        // Наблюдаем за сменой классов/стилей — но не дублируем с debounce
        try {
            var observer = new MutationObserver(function() {
                var menuOpen =
                    document.querySelector('.wy-nav-side.shift') ||
                    document.querySelector('.md-sidebar--primary[data-md-state="active"]') ||
                    document.querySelector('.md-overlay[data-md-state="active"]');
                if (!menuOpen) resetDebounced();
            });
            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['class', 'style'],
                subtree: true
            });

            // Auto-disconnect через 60 сек — страница скорее всего уже устоялась
            setTimeout(function() {
                try { observer.disconnect(); } catch(e) {}
            }, 60000);
        } catch(e) {}

        // Начальный сброс
        setTimeout(resetDrawer, 500);

        // Resize + orientationchange — дебаунс
        var onResize = debounce(resetDrawer, 200);
        window.addEventListener('orientationchange', function() { setTimeout(resetDrawer, 300); });
        window.addEventListener('resize', onResize);
    }

    // ============================================================
    // 👀 Реакция на сессию — если залогинился в другой вкладке,
    // заменяем «Войти» на «Профиль»
    // ============================================================
    function watchSession() {
        window.addEventListener('storage', function(e) {
            if (e.key && (e.key.indexOf('sb-') === 0 || e.key.indexOf('mars-auth') === 0)) {
                var btn = document.getElementById('mobile-register-btn');
                if (!btn) return;
                var sessionPresent = !!(
                    (function() {
                        try {
                            for (var i = 0; i < localStorage.length; i++) {
                                var k = localStorage.key(i);
                                if (k && k.indexOf('sb-') === 0 && k.indexOf('-auth-token') > 0) return true;
                            }
                        } catch(err) {}
                        return false;
                    })()
                );
                if (sessionPresent && btn.href.indexOf('/profile/') === -1) {
                    btn.href = CONFIG.profileUrl;
                    btn.textContent = CONFIG.profileText;
                }
            }
        });
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function init() {
        injectStyles();

        // Пробуем создать свою кнопку — с ретраем, вдруг auth-button появится позже
        var created = initMobileRegisterButton();
        if (!created) {
            var tries = 0;
            var iv = setInterval(function() {
                tries++;
                if (initMobileRegisterButton() || tries > 12) {
                    clearInterval(iv);
                }
            }, 500);
        }

        fixMobileDrawer();
        watchSession();

        console.log('📱 mobile.js v2 VIP активен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsMobile = {
        isMobile: function() { return IS_MOBILE; },
        resetDrawer: resetDrawer,
        vibrate: vibrate
    };

    console.log('✅ mobile.js v2 VIP загружен');
})();
