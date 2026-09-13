// ============================================================
// mobile.js — мобильные фиксы и кнопка регистрации
// ============================================================

(function() {
    'use strict';

    var IS_MOBILE =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    if (!IS_MOBILE) return;

    // ============================================================
    // 🔧 НАСТРОЙКИ
    // ============================================================
    var CONFIG = {
        loginUrl:   '/login/',
        profileUrl: '/profile/',
        loginText: 'Войти',
        profileText: 'Профиль',
        hideOnPages: ['/secret/', '/secret-2/', '/login/']
    };

    function vibrate(p) {
        try { if (navigator.vibrate) navigator.vibrate(p); } catch(e) {}
    }

    // ============================================================
    // 👤 КНОПКА «ВОЙТИ / ПРОФИЛЬ»
    // ============================================================
    function initMobileRegisterButton() {
        if (document.getElementById('mobile-register-btn')) return;

        var path = window.location.pathname;
        for (var i = 0; i < CONFIG.hideOnPages.length; i++) {
            if (path.indexOf(CONFIG.hideOnPages[i]) !== -1) return;
        }

        var onProfile = path.indexOf('/profile/') !== -1;
        var targetUrl = onProfile ? CONFIG.profileUrl : CONFIG.loginUrl;
        var labelText = onProfile ? CONFIG.profileText : CONFIG.loginText;

        var btn = document.createElement('a');
        btn.id = 'mobile-register-btn';
        btn.href = targetUrl;
        btn.setAttribute('aria-label', labelText);
        // ✅ Только текст, без иконки — надёжнее
        btn.textContent = labelText;

        document.body.appendChild(btn);

        // CSS через отдельный style, чтобы правила точно применились
        var style = document.createElement('style');
        style.id = 'mobile-register-style';
        style.textContent = `
            /* ==========================================================
               КНОПКА «ВОЙТИ» — правый верхний угол
               ========================================================== */
            #mobile-register-btn {
                position: fixed !important;
                top: calc(8px + env(safe-area-inset-top, 0px)) !important;
                right: calc(10px + env(safe-area-inset-right, 0px)) !important;
                z-index: 99998 !important;
                padding: 8px 14px !important;
                background: linear-gradient(135deg, #6C63FF, #A29BFE) !important;
                color: #ffffff !important;
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
            }
            #mobile-register-btn:active {
                transform: scale(0.94) !important;
                box-shadow: 0 2px 8px rgba(108,99,255,0.7) !important;
            }

            /* ==========================================================
               ШАПКА САЙТА — уменьшаем шрифт, чтобы поместился заголовок
               ========================================================== */
            @media screen and (max-width: 1024px) {
                /* Заголовок сайта — уменьшаем шрифт, чтобы влезло название */
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

                /* Ещё меньше на средних экранах */
                @media (max-width: 600px) {
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

                /* Совсем маленькие экраны — ещё мельче */
                @media (max-width: 400px) {
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
            }

            /* На тёмной теме — кнопка и заголовок белые */
            html body.mars-stars-on .md-header__title,
            html body.mars-stars-on .md-header__topic,
            html body.mars-stars-on .md-header-nav__title {
                color: #ffffff !important;
            }
        `;
        document.head.appendChild(style);

        console.log('👤 Кнопка «Войти» →', targetUrl);
    }

    // ============================================================
    // 🍔 ФИКС МОБИЛЬНОГО МЕНЮ
    // ============================================================
    function fixMobileDrawer() {
        function reset() {
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

        document.addEventListener('click', function(e) {
            var insideMenu = e.target.closest('.wy-nav-side, .md-sidebar--primary, .md-sidebar');
            var isHamburger = e.target.closest('.wy-nav-top, .md-header__button, .md-header__button[for="__drawer"], label[for="__drawer"], label[for="__toc"]');
            var isMenuLink = e.target.closest('.wy-menu-vertical a, .md-nav__link');
            var isOverlay = e.target.closest('.md-overlay, .wy-overlay');

            if (isMenuLink || isOverlay || (!insideMenu && !isHamburger)) {
                setTimeout(reset, 80);
                setTimeout(reset, 350);
                setTimeout(reset, 700);
            }
        }, true);

        try {
            var observer = new MutationObserver(function() {
                var menuOpen =
                    document.querySelector('.wy-nav-side.shift') ||
                    document.querySelector('.md-sidebar--primary[data-md-state="active"]') ||
                    document.querySelector('.md-overlay[data-md-state="active"]');
                if (!menuOpen) setTimeout(reset, 100);
            });
            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['class', 'style'],
                subtree: true
            });
        } catch(e) {}

        setTimeout(reset, 500);
        window.addEventListener('orientationchange', function() { setTimeout(reset, 300); });
        window.addEventListener('resize', function() { setTimeout(reset, 200); });
    }

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function init() {
        initMobileRegisterButton();
        fixMobileDrawer();
        console.log('📱 mobile.js: активен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
