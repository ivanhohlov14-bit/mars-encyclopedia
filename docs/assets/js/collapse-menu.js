// collapse-menu.js — сворачивает названия в левом меню
(function() {
    'use strict';

    var STORAGE_KEY = 'mars_menu_collapsed';
    var IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    // По умолчанию меню свёрнуто
    var isCollapsed = localStorage.getItem(STORAGE_KEY) !== 'false';

    // ============================================================
    // КНОПКА ПЕРЕКЛЮЧЕНИЯ
    // ============================================================
    function createToggle() {
        if (document.getElementById('menu-collapse-toggle')) return;

        var btn = document.createElement('button');
        btn.id = 'menu-collapse-toggle';
        btn.setAttribute('aria-label', 'Свернуть/развернуть меню');
        btn.innerHTML = isCollapsed ? '▶' : '◀';
        btn.title = isCollapsed ? 'Развернуть меню' : 'Свернуть меню';

        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            setCollapsed(!isCollapsed);
            try { if (navigator.vibrate) navigator.vibrate(15); } catch(err) {}
        };

        // Кнопка вставляется в сайдбар
        var sidebar = document.querySelector('.wy-nav-side, .md-sidebar--primary');
        if (sidebar) {
            sidebar.appendChild(btn);
        } else {
            // Если сайдбара ещё нет — вставляем в body (появится при загрузке)
            setTimeout(createToggle, 500);
        }
    }

    // ============================================================
    // УПРАВЛЕНИЕ СОСТОЯНИЕМ
    // ============================================================
    function setCollapsed(collapsed) {
        isCollapsed = collapsed;
        localStorage.setItem(STORAGE_KEY, collapsed ? 'true' : 'false');
        applyState();

        var btn = document.getElementById('menu-collapse-toggle');
        if (btn) {
            btn.innerHTML = collapsed ? '▶' : '◀';
            btn.title = collapsed ? 'Развернуть меню' : 'Свернуть меню';
        }
    }

    function applyState() {
        var html = document.documentElement;
        var body = document.body;

        if (isCollapsed) {
            html.classList.add('mars-menu-collapsed');
            body.classList.add('mars-menu-collapsed');
        } else {
            html.classList.remove('mars-menu-collapsed');
            body.classList.remove('mars-menu-collapsed');
        }
    }

    // ============================================================
    // 🎨 СТИЛИ
    // ============================================================
    function addStyles() {
        if (document.getElementById('collapse-menu-style')) return;
        var style = document.createElement('style');
        style.id = 'collapse-menu-style';
        style.textContent = `
            /* ============================================================
               🎯 СВЁРНУТОЕ МЕНЮ
               ============================================================ */
            html.mars-menu-collapsed .wy-nav-side,
            html.mars-menu-collapsed .md-sidebar--primary {
                width: 56px !important;
                min-width: 56px !important;
                max-width: 56px !important;
                overflow: hidden !important;
                transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            html.mars-menu-collapsed .wy-nav-side:hover,
            html.mars-menu-collapsed .md-sidebar--primary:hover {
                width: 260px !important;
                min-width: 260px !important;
                max-width: 260px !important;
                overflow-y: auto !important;
                box-shadow: 4px 0 24px rgba(0,0,0,0.35) !important;
                z-index: 100 !important;
            }

            /* Скрываем длинные названия */
            html.mars-menu-collapsed .wy-menu-vertical a,
            html.mars-menu-collapsed .wy-menu-vertical li,
            html.mars-menu-collapsed .md-nav__link,
            html.mars-menu-collapsed .md-nav__title,
            html.mars-menu-collapsed .md-nav__item,
            html.mars-menu-collapsed .caption,
            html.mars-menu-collapsed .wy-menu-vertical header {
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }

            /* Обычное состояние — текст обрезается */
            html.mars-menu-collapsed .wy-menu-vertical a,
            html.mars-menu-collapsed .md-nav__link {
                padding-left: 14px !important;
                padding-right: 4px !important;
                font-size: 0 !important;
                position: relative !important;
            }

            /* При наведении — текст возвращается */
            html.mars-menu-collapsed .wy-nav-side:hover .wy-menu-vertical a,
            html.mars-menu-collapsed .wy-nav-side:hover .md-nav__link,
            html.mars-menu-collapsed .md-sidebar--primary:hover .md-nav__link {
                font-size: inherit !important;
                padding-left: 20px !important;
            }

            /* Иконка-заменитель в свёрнутом виде — точка или эмодзи из текста */
            html.mars-menu-collapsed .wy-menu-vertical a::before,
            html.mars-menu-collapsed .md-nav__link::before {
                content: '●' !important;
                font-size: 0.9rem !important;
                color: #6C63FF !important;
                display: inline-block !important;
                margin-right: 0 !important;
                transition: all 0.3s !important;
            }

            /* При наведении точку убираем */
            html.mars-menu-collapsed .wy-nav-side:hover .wy-menu-vertical a::before,
            html.mars-menu-collapsed .wy-nav-side:hover .md-nav__link::before,
            html.mars-menu-collapsed .md-sidebar--primary:hover .md-nav__link::before {
                display: none !important;
            }

            /* Активная статья — крупная точка */
            html.mars-menu-collapsed .wy-menu-vertical li.current > a::before,
            html.mars-menu-collapsed .md-nav__link--active::before {
                content: '◆' !important;
                color: #f39c12 !important;
                font-size: 1rem !important;
            }

            /* Заголовки разделов */
            html.mars-menu-collapsed .caption,
            html.mars-menu-collapsed .md-nav__title {
                font-size: 0 !important;
                padding: 8px 0 !important;
                border-bottom: 1px solid rgba(108,99,255,0.2) !important;
                margin: 8px 0 !important;
            }

            /* Поиск в меню */
            html.mars-menu-collapsed .wy-side-nav-search,
            html.mars-menu-collapsed .md-search__form {
                padding: 8px !important;
            }
            html.mars-menu-collapsed .wy-side-nav-search input,
            html.mars-menu-collapsed .md-search__input {
                font-size: 0 !important;
                padding: 10px !important;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236C63FF'%3E%3Cpath d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: center;
                background-size: 20px;
                text-indent: -9999px;
            }
            html.mars-menu-collapsed .md-sidebar--primary:hover .md-search__input,
            html.mars-menu-collapsed .wy-nav-side:hover .wy-side-nav-search input {
                font-size: inherit !important;
                background-image: none !important;
                text-indent: 0 !important;
                padding-left: 40px !important;
            }

            /* Кнопка переключения */
            #menu-collapse-toggle {
                position: absolute;
                top: 12px;
                right: 8px;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                border: 2px solid #4a3fd9;
                color: #fff;
                font-size: 0.8rem;
                font-weight: 900;
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                box-shadow: 0 4px 12px rgba(108,99,255,0.5);
                transition: transform 0.2s, box-shadow 0.2s;
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
            }
            #menu-collapse-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 18px rgba(108,99,255,0.7);
            }

            /* Тёмная тема — совместимость */
            html body.mars-stars-on.mars-menu-collapsed .wy-nav-side,
            html body.mars-stars-on.mars-menu-collapsed .md-sidebar--primary {
                background-color: #000 !important;
            }
            html body.mars-stars-on .wy-menu-vertical a::before,
            html body.mars-stars-on .md-nav__link::before {
                color: #A29BFE !important;
            }
            html body.mars-stars-on .wy-menu-vertical li.current > a::before,
            html body.mars-stars-on .md-nav__link--active::before {
                color: #f39c12 !important;
            }

            /* Мобильная версия — не сворачиваем, там своё меню */
            @media (max-width: 768px) {
                html.mars-menu-collapsed .wy-nav-side,
                html.mars-menu-collapsed .md-sidebar--primary {
                    width: 100% !important;
                    min-width: 100% !important;
                    max-width: 100% !important;
                }
                html.mars-menu-collapsed .wy-menu-vertical a::before,
                html.mars-menu-collapsed .md-nav__link::before {
                    display: none !important;
                }
                html.mars-menu-collapsed .wy-menu-vertical a,
                html.mars-menu-collapsed .md-nav__link {
                    font-size: inherit !important;
                    padding-left: 20px !important;
                }
                #menu-collapse-toggle {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function init() {
        addStyles();
        applyState();
        // Ждём, пока тема создаст сайдбар
        setTimeout(createToggle, 600);
        setTimeout(function() {
            if (!document.getElementById('menu-collapse-toggle')) createToggle();
        }, 1500);

        console.log('📋 Меню: ' + (isCollapsed ? 'свёрнуто' : 'развёрнуто'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
