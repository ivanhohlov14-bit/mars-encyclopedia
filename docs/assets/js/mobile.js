// ============================================================
// mobile.js — мобильные фиксы и кнопка регистрации
// Работает только на телефонах. На ПК ничего не делает.
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 📱 ПРОВЕРКА: только мобильные
    // ============================================================
    var IS_MOBILE =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    if (!IS_MOBILE) return;

    // ============================================================
    // 🔧 НАСТРОЙКИ
    // ============================================================
    var CONFIG = {
        registerUrl: '/login/',             // куда ведёт кнопка «Войти»
        profileUrl: '/profile/',            // куда ведёт, если уже на профиле
        registerText: 'Войти',
        registerTextOnProfile: 'Профиль',
        registerIcon: '👤',
        hideOnPages: ['/secret/', '/secret-2/', '/login/']
    };

    // ============================================================
    // 🔗 БАЗОВЫЙ ПУТЬ (для GitHub Pages в подпапке)
    // ============================================================
    function getBasePath() {
        return window.location.pathname.replace(/\/[^\/]*\/?$/, '') || '';
    }

    // ============================================================
    // 📳 ВИБРАЦИЯ
    // ============================================================
    function vibrate(pattern) {
        try {
            if (navigator.vibrate) navigator.vibrate(pattern);
        } catch(e) {}
    }

    // ============================================================
    // 👤 КНОПКА РЕГИСТРАЦИИ (правый верхний угол, не перекрывает заголовок)
    // ============================================================
    function initMobileRegisterButton() {
        if (document.getElementById('mobile-register-btn')) return;

        var path = window.location.pathname;

        // Скрываем на некоторых страницах
        for (var i = 0; i < CONFIG.hideOnPages.length; i++) {
            if (path.indexOf(CONFIG.hideOnPages[i]) !== -1) return;
        }

        var base = getBasePath();
        var onProfile = path.indexOf(CONFIG.profileUrl) !== -1;
        var targetUrl = base + (onProfile ? CONFIG.profileUrl : CONFIG.registerUrl);
        var labelText = onProfile ? CONFIG.registerTextOnProfile : CONFIG.registerText;

        var btn = document.createElement('a');
        btn.id = 'mobile-register-btn';
        btn.href = targetUrl;
        btn.setAttribute('aria-label', onProfile ? 'Профиль' : 'Войти');
        btn.innerHTML = '<span class="mrbtn-icon">' + CONFIG.registerIcon + '</span>' +
                        '<span class="mrbtn-text">' + labelText + '</span>';

        // Стили — компактные, с safe-area для iPhone
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

        // Добавляем CSS для отступа названия (чтобы кнопка не перекрывала заголовок)
        var style = document.createElement('style');
        style.id = 'mobile-register-style';
        style.textContent = `
            @media screen and (max-width: 1024px) {
                /* Отступ справа у заголовка — чтобы название не заезжало под кнопку */
                .md-header__title,
                .md-header-nav__title,
                .wy-nav-top .title,
                .wy-nav-top > a:not(.icon):not(.menu-toggle) {
                    padding-right: 110px !important;
                    max-width: calc(100vw - 130px) !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                }

                /* Само название — обрезаем многоточием если не влезает */
                .md-header__topic,
                .md-header__title .md-header__topic,
                .md-header-nav__title,
                .wy-nav-top .title {
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                    max-width: 100% !important;
                }

                /* Иконка и текст кнопки */
                #mobile-register-btn .mrbtn-icon {
                    font-size: 0.95rem;
                    line-height: 1;
                }
                #mobile-register-btn .mrbtn-text {
                    font-size: 0.8rem;
                    line-height: 1;
                }

                /* На очень узких экранах — показываем только иконку */
                @media (max-width: 380px) {
                    #mobile-register-btn {
                        padding: 0 10px !important;
                    }
                    #mobile-register-btn .mrbtn-text {
                        display: none !important;
                    }
                    #mobile-register-btn .mrbtn-icon {
                        font-size: 1.1rem !important;
                    }
                    .md-header__title,
                    .md-header-nav__title,
                    .wy-nav-top .title,
                    .wy-nav-top > a:not(.icon):not(.menu-toggle) {
                        padding-right: 70px !important;
                        max-width: calc(100vw - 90px) !important;
                    }
                }
            }
        `;
        document.head.appendChild(style);

        console.log('👤 Кнопка регистрации добавлена →', targetUrl);
    }

    // ============================================================
    // 🍔 ФИКС МОБИЛЬНОГО МЕНЮ (drawer)
    // ============================================================
    function fixMobileDrawer() {
        function resetContentShift() {
            // 1. Убираем overflow
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // 2. Проверяем, открыто ли меню
            var menuOpen =
                document.querySelector('.wy-nav-side.shift') ||
                document.querySelector('.md-sidebar--primary[data-md-state="active"]') ||
                document.querySelector('.md-overlay[data-md-state="active"]') ||
                document.querySelector('.md-toggle--drawer:checked');
            if (menuOpen) return;

            // 3. Сбрасываем сдвиги у контейнеров
            var selectors = [
                '.wy-nav-content-wrap',
                '.wy-nav-content',
                '.md-container',
                '.md-main',
                '.md-main__inner',
                '.md-content',
                '.md-content__inner'
            ];
            selectors.forEach(function(sel) {
                document.querySelectorAll(sel).forEach(function(el) {
                    el.style.transform = '';
                    el.style.marginLeft = '';
                    el.style.paddingLeft = '';
                });
            });

            // 4. Read the Docs: убираем класс shift
            var sideNav = document.querySelector('.wy-nav-side');
            if (sideNav && !sideNav.classList.contains('shift')) {
                document.querySelectorAll('.wy-nav-content-wrap.shift').forEach(function(el) {
                    el.classList.remove('shift');
                });
            }

            // 5. Material: снимаем активные состояния
            var hasOverlay = document.querySelector('.md-overlay[data-md-state="active"]');
            if (!hasOverlay) {
                document.querySelectorAll('.md-sidebar--primary[data-md-state="active"]').forEach(function(el) {
                    el.removeAttribute('data-md-state');
                });
                document.querySelectorAll('.md-nav--primary[data-md-state="active"]').forEach(function(el) {
                    el.removeAttribute('data-md-state');
                });
            }

            // 6. Убираем блокировку скролла у body если меню закрыто
            if (!menuOpen) {
                document.body.classList.remove('md-scroll-lock');
                if (document.body.style.position === 'fixed') {
                    document.body.style.position = '';
                    document.body.style.top = '';
                    document.body.style.width = '';
                }
            }
        }

        // Клики
        document.addEventListener('click', function(e) {
            var insideMenu = e.target.closest('.wy-nav-side, .md-sidebar--primary, .md-sidebar');
            var isHamburger = e.target.closest('.wy-nav-top, .md-header__button, .md-header__button[for="__drawer"], .md-header__button[for="__toc"], label[for="__drawer"], label[for="__toc"]');
            var isMenuLink = e.target.closest('.wy-menu-vertical a, .md-nav__link');
            var isOverlay = e.target.closest('.md-overlay, .wy-overlay');

            if (isMenuLink || isOverlay || (!insideMenu && !isHamburger)) {
                setTimeout(resetContentShift, 80);
                setTimeout(resetContentShift, 350);
                setTimeout(resetContentShift, 700);
            }
        }, true);

        // MutationObserver
        try {
            var observer = new MutationObserver(function() {
                var menuOpen =
                    document.querySelector('.wy-nav-side.shift') ||
                    document.querySelector('.md-sidebar--primary[data-md-state="active"]') ||
                    document.querySelector('.md-overlay[data-md-state="active"]');
                if (!menuOpen) {
                    setTimeout(resetContentShift, 100);
                }
            });
            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['class', 'style'],
                subtree: true
            });
        } catch(e) {}

        // При загрузке и повороте — сброс
        setTimeout(resetContentShift, 500);
        window.addEventListener('orientationchange', function() {
            setTimeout(resetContentShift, 300);
        });

        // При смене размера окна (например, поворот планшета)
        window.addEventListener('resize', function() {
            setTimeout(resetContentShift, 200);
        });

        console.log('🍔 Фикс мобильного меню активен');
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    function init() {
        initMobileRegisterButton();
        fixMobileDrawer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
