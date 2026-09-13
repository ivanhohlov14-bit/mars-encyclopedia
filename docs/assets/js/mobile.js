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
    // 🔧 НАСТРОЙКИ — URL'ы от корня домена mars-wiki.ru
    // ============================================================
    var CONFIG = {
        loginUrl:   '/login/',      // ← просто /login/
        profileUrl: '/profile/',    // ← просто /profile/
        loginText: 'Войти',
        profileText: 'Профиль',
        loginIcon: '👤',
        profileIcon: '👤',
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

        // Скрываем на некоторых страницах
        for (var i = 0; i < CONFIG.hideOnPages.length; i++) {
            if (path.indexOf(CONFIG.hideOnPages[i]) !== -1) return;
        }

        var onProfile = path.indexOf('/profile/') !== -1;

        // ✅ ПРОСТО АБСОЛЮТНЫЙ URL — никакого base path
        var targetUrl = onProfile ? CONFIG.profileUrl : CONFIG.loginUrl;
        var labelText = onProfile ? CONFIG.profileText : CONFIG.loginText;
        var iconChar  = onProfile ? CONFIG.profileIcon : CONFIG.loginIcon;

        var btn = document.createElement('a');
        btn.id = 'mobile-register-btn';
        btn.href = targetUrl;
        btn.setAttribute('aria-label', labelText);
        btn.innerHTML = '<span class="mrbtn-icon">' + iconChar + '</span>' +
                        '<span class="mrbtn-text">' + labelText + '</span>';

        btn.style.cssText =
            'position:fixed;' +
            'top:calc(8px + env(safe-area-inset-top,0px));' +
            'right:calc(10px + env(safe-area-inset-right,0px));' +
            'z-index:99998;' +
            'height:36px;' +
            'padding:0 12px;' +
            'background:linear-gradient(135deg,#6C63FF,#A29BFE);' +
            'color:#ffffff !important;' +
            'border-radius:18px;' +
            'font-size:0.82rem;' +
            'font-weight:800;' +
            'text-decoration:none !important;' +
            'box-shadow:0 4px 14px rgba(108,99,255,0.55);' +
            'display:inline-flex;' +
            'align-items:center;' +
            'gap:5px;' +
            'font-family:inherit;' +
            'letter-spacing:0.2px;' +
            'touch-action:manipulation;' +
            '-webkit-tap-highlight-color:transparent;' +
            'transition:transform 0.15s ease, box-shadow 0.15s ease;' +
            'white-space:nowrap;' +
            'line-height:1;' +
            'box-sizing:border-box;';

        btn.addEventListener('touchstart', function() {
            btn.style.transform = 'scale(0.94)';
            btn.style.boxShadow = '0 2px 8px rgba(108,99,255,0.7)';
        }, { passive: true });

        btn.addEventListener('touchend', function() {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 4px 14px rgba(108,99,255,0.55)';
        }, { passive: true });

        btn.addEventListener('click', function() {
            vibrate(15);
        });

        document.body.appendChild(btn);

        // CSS: отступ у заголовка, адаптив кнопки
        var style = document.createElement('style');
        style.id = 'mobile-register-style';
        style.textContent = `
            @media screen and (max-width: 1024px) {
                .md-header__title,
                .md-header-nav__title,
                .wy-nav-top .title,
                .wy-nav-top > a:not(.icon):not(.menu-toggle) {
                    padding-right: 100px !important;
                    max-width: calc(100vw - 120px) !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                }
                .md-header__topic,
                .md-header__title .md-header__topic,
                .md-header-nav__title,
                .wy-nav-top .title {
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                    max-width: 100% !important;
                }
                #mobile-register-btn .mrbtn-icon { font-size: 0.95rem; line-height: 1; }
                #mobile-register-btn .mrbtn-text { font-size: 0.8rem; line-height: 1; }
            }
            @media (max-width: 400px) {
                #mobile-register-btn { padding: 0 10px !important; }
                #mobile-register-btn .mrbtn-text { display: none !important; }
                #mobile-register-btn .mrbtn-icon { font-size: 1.15rem !important; }
                .md-header__title,
                .md-header-nav__title,
                .wy-nav-top .title,
                .wy-nav-top > a:not(.icon):not(.menu-toggle) {
                    padding-right: 70px !important;
                    max-width: calc(100vw - 90px) !important;
                }
            }
        `;
        document.head.appendChild(style);
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
