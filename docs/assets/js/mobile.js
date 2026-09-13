// ============================================================
// mobile.js — мобильные фиксы для сайта
// Подключается отдельно в mkdocs.yml
// На ПК вообще не делает ничего (сразу выходит)
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 📱 ПРОВЕРКА: только мобильные
    // ============================================================
    const IS_MOBILE =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    if (!IS_MOBILE) return; // на ПК ничего не делаем

    // ============================================================
    // 🔧 НАСТРОЙКИ (меняй под себя)
    // ============================================================
    const CONFIG = {
        registerUrl: '/profile/',      // куда ведёт кнопка регистрации
        registerText: '👤 Войти',      // текст на главной и др. страницах
        registerTextOnProfile: '👤 Профиль', // текст на самой странице профиля
        hideOnPages: ['/secret/', '/secret-2/'] // где не показывать кнопку
    };

    // ============================================================
    // 🔗 БАЗОВЫЙ ПУТЬ (для GitHub Pages / подпапок)
    // ============================================================
    function getBasePath() {
        // Пример: /mars-encyclopedia/some-page/ → /mars-encyclopedia
        const path = window.location.pathname;
        // Если URL заканчивается на /something/ или /something.html
        // Убираем последний сегмент
        return path.replace(/\/[^\/]*\/?$/, '') || '';
    }

    // ============================================================
    // 📳 ВИБРАЦИЯ (если поддерживается)
    // ============================================================
    function vibrate(pattern) {
        try {
            if (navigator.vibrate) navigator.vibrate(pattern);
        } catch(e) {}
    }

    // ============================================================
    // 👤 КНОПКА РЕГИСТРАЦИИ (правый верхний угол)
    // ============================================================
    function initMobileRegisterButton() {
        if (document.getElementById('mobile-register-btn')) return;

        // Проверяем, не скрыта ли кнопка на этой странице
        const path = window.location.pathname;
        for (const hide of CONFIG.hideOnPages) {
            if (path.indexOf(hide) !== -1) return;
        }

        const base = getBasePath();
        const fullUrl = base + CONFIG.registerUrl;
        const isProfilePage = path.indexOf(CONFIG.registerUrl) !== -1;

        const btn = document.createElement('a');
        btn.id = 'mobile-register-btn';
        btn.href = fullUrl;
        btn.setAttribute('aria-label', 'Регистрация / Профиль');
        btn.innerHTML = isProfilePage ? CONFIG.registerTextOnProfile : CONFIG.registerText;

        // 🎨 Стили с учётом safe-area (не уезжает под чёлку iPhone)
        btn.style.cssText = `
            position: fixed;
            top: calc(8px + env(safe-area-inset-top, 0px));
            right: calc(10px + env(safe-area-inset-right, 0px));
            z-index: 99998;
            padding: 8px 14px;
            background: linear-gradient(135deg, #6C63FF, #A29BFE);
            color: #ffffff !important;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 6px 20px rgba(108, 99, 255, 0.55);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: inherit;
            letter-spacing: 0.3px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            transition: transform 0.15s ease;
            white-space: nowrap;
            max-width: 55vw;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
        `;

        // Отклик на тап
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.95)';
        }, { passive: true });

        btn.addEventListener('touchend', () => {
            btn.style.transform = 'scale(1)';
        }, { passive: true });

        btn.addEventListener('click', () => {
            vibrate(15);
        });

        document.body.appendChild(btn);

        console.log('👤 Мобильная кнопка регистрации добавлена →', fullUrl);
    }

    // ============================================================
    // 🍔 ФИКС МОБИЛЬНОГО МЕНЮ (drawer)
    // Проблема: после закрытия меню контент остаётся сжатым
    // ============================================================
    function fixMobileDrawer() {
        // Сбрасываем все возможные сдвиги/классы от темы
        function resetContentShift() {
            // 1. Убираем overflow у body/html
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // 2. Убираем сдвиги с контейнеров (Read the Docs + Material)
            const containerSelectors = [
                '.wy-nav-content-wrap',
                '.wy-nav-content',
                '.md-container',
                '.md-main',
                '.md-main__inner',
                '.md-content',
                '.md-content__inner'
            ];

            containerSelectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => {
                    // Не трогаем, если меню всё ещё открыто
                    const menuOpen =
                        document.querySelector('.wy-nav-side.shift') ||
                        document.querySelector('.md-sidebar--primary[data-md-state="active"]') ||
                        document.querySelector('.md-overlay[data-md-state="active"]');
                    if (menuOpen) return;

                    el.style.transform = '';
                    el.style.marginLeft = '';
                    el.style.paddingLeft = '';
                });
            });

            // 3. Read the Docs: убираем класс .shift если меню закрыто
            const sideNav = document.querySelector('.wy-nav-side');
            if (sideNav && !sideNav.classList.contains('shift')) {
                document.querySelectorAll('.wy-nav-content-wrap.shift').forEach(el => {
                    el.classList.remove('shift');
                });
            }

            // 4. Material: убираем активное состояние drawer
            const hasOverlay = document.querySelector('.md-overlay[data-md-state="active"]');
            if (!hasOverlay) {
                document.querySelectorAll('.md-sidebar--primary[data-md-state="active"]').forEach(el => {
                    el.removeAttribute('data-md-state');
                });
            }
        }

        // Отслеживаем клики
        document.addEventListener('click', function(e) {
            const insideMenu = e.target.closest('.wy-nav-side, .md-sidebar--primary, .md-sidebar');
            const isHamburger = e.target.closest('.wy-nav-top, .md-header__button, .md-header__button[for="__drawer"], .md-header__button[for="__toc"]');
            const isMenuLink = e.target.closest('.wy-menu-vertical a, .md-nav__link');
            const isOverlay = e.target.closest('.md-overlay, .wy-overlay');

            // Если клик по ссылке в меню / оверлею / вне меню — сбрасываем
            if (isMenuLink || isOverlay || (!insideMenu && !isHamburger)) {
                // Двойная задержка — на случай анимации закрытия
                setTimeout(resetContentShift, 80);
                setTimeout(resetContentShift, 350);
            }
        }, true);

        // MutationObserver — следим за классами/стилями на body и sidebar
        try {
            const observer = new MutationObserver(() => {
                const menuOpen =
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

        // При загрузке и повороте экрана — тоже сброс
        setTimeout(resetContentShift, 500);
        window.addEventListener('orientationchange', () => setTimeout(resetContentShift, 300));

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
