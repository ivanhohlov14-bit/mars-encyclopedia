// ============================================================
// sidebar-toggle.js — v2 VIP
// Кнопка скрытия/показа сайдбара на ПК
// - Слайд-кнопка (двигается с сайдбаром)
// - Не наезжает на меню
// - z-index выше effects/vip-cursor
// - CSS :hover вместо JS-обработчиков
// - Поддержка Material (.md-sidebar--primary)
// - Правильная ширина сайдбара (не хардкод -300px)
// - prefers-reduced-motion
// - Публичное API: window.marsSidebarToggle.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsSidebarToggleLoaded) return;
    window.__marsSidebarToggleLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var STATE_KEY = 'mars-sidebar-hidden';
    var BTN_ID = 'sidebar-toggle-btn';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['📂 sidebar-toggle:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 📱 Определение ПК
    // ============================================================
    function isDesktop() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return false;
        try {
            if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return false;
        } catch(e) {}
        return window.innerWidth > 768;
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    var REDUCED_MOTION = prefersReducedMotion();

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function getSavedState() {
        try { return localStorage.getItem(STATE_KEY) === '1'; } catch(e) { return false; }
    }
    function saveState(hidden) {
        try { localStorage.setItem(STATE_KEY, hidden ? '1' : '0'); } catch(e) {}
    }

    // ============================================================
    // 🔍 Поиск сайдбара
    // ============================================================
    function getSidebar() {
        return document.querySelector('.wy-nav-side') ||           // RTD
               document.querySelector('.md-sidebar--primary') ||   // Material
               null;
    }

    function getSidebarWidth() {
        var sb = getSidebar();
        if (!sb) return 300;
        var w = sb.offsetWidth || sb.getBoundingClientRect().width || 300;
        return Math.round(w);
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('sidebar-toggle-style')) return;
        var s = document.createElement('style');
        s.id = 'sidebar-toggle-style';
        s.textContent = `
            #${BTN_ID} {
                position: fixed;
                left: 14px;
                top: 14px;
                z-index: 9999990;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff;
                border: none;
                border-radius: 20px;
                padding: 8px 16px;
                font-size: 13px;
                font-weight: 700;
                font-family: inherit;
                cursor: pointer;
                box-shadow: 0 4px 16px rgba(108,99,255,0.35);
                transition: all 0.25s cubic-bezier(.16,1,.3,1),
                            left 0.3s cubic-bezier(.16,1,.3,1);
                opacity: 0.55;
                -webkit-tap-highlight-color: transparent;
                user-select: none;
            }
            #${BTN_ID}:hover,
            #${BTN_ID}:focus-visible {
                opacity: 1;
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(108,99,255,0.5);
                outline: none;
            }
            #${BTN_ID}:active {
                transform: translateY(0) scale(.97);
            }

            /* Когда сайдбар ВИДЕН — кнопка уезжает к его правому краю */
            body:not(.sidebar-hidden) #${BTN_ID} {
                left: calc(14px + var(--mars-sb-width, 300px));
                opacity: 0.35;
            }
            body:not(.sidebar-hidden) #${BTN_ID}:hover {
                opacity: 1;
            }

            /* Когда СКРЫТ — кнопка у левого края */
            body.sidebar-hidden #${BTN_ID} {
                left: 14px;
                opacity: 0.75;
            }

            /* Тёмная тема */
            body.mars-stars-on #${BTN_ID} {
                box-shadow: 0 4px 16px rgba(108,99,255,0.55),
                            0 0 24px rgba(108,99,255,0.25);
            }

            /* Анимация открытия/закрытия сайдбара — ставим тут, не inline */
            body.mars-sidebar-anim .wy-nav-side,
            body.mars-sidebar-anim .md-sidebar--primary {
                transition: margin-left 0.3s cubic-bezier(.16,1,.3,1),
                            transform 0.3s cubic-bezier(.16,1,.3,1) !important;
            }

            /* Скрытие сайдбара */
            body.sidebar-hidden .wy-nav-side,
            body.sidebar-hidden .md-sidebar--primary {
                margin-left: calc(-1 * var(--mars-sb-width, 300px));
            }

            /* Контент сдвигается влево когда сайдбар скрыт */
            body.sidebar-hidden .wy-nav-content-wrap,
            body.sidebar-hidden .md-container {
                margin-left: 0 !important;
            }

            @media (prefers-reduced-motion: reduce) {
                #${BTN_ID},
                body.mars-sidebar-anim .wy-nav-side,
                body.mars-sidebar-anim .md-sidebar--primary {
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🚀 INIT
    // ============================================================
    function init() {
        if (!isDesktop()) {
            log('не ПК — выход');
            return;
        }

        var sidebar = getSidebar();
        if (!sidebar) {
            log('сайдбар не найден');
            return;
        }

        if (document.getElementById(BTN_ID)) return;

        injectStyles();

        // Устанавливаем CSS-переменную с реальной шириной сайдбара
        var sbWidth = getSidebarWidth();
        document.documentElement.style.setProperty('--mars-sb-width', sbWidth + 'px');
        log('ширина сайдбара:', sbWidth + 'px');

        // Включаем анимацию (только если не reduced-motion)
        if (!REDUCED_MOTION) {
            document.body.classList.add('mars-sidebar-anim');
        }

        // ============ Кнопка ============
        var btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Скрыть/показать меню');

        // ============ Состояние ============
        var isHidden = getSavedState();

        function applyState(hidden) {
            isHidden = hidden;
            saveState(hidden);

            document.body.classList.toggle('sidebar-hidden', hidden);

            if (hidden) {
                btn.textContent = '☰ Меню';
                btn.setAttribute('aria-pressed', 'true');
                btn.title = 'Показать меню';
            } else {
                btn.textContent = '◀ Скрыть';
                btn.setAttribute('aria-pressed', 'false');
                btn.title = 'Скрыть меню';
            }
        }

        // Применяем без мигания — сразу (CSS уже готов)
        applyState(isHidden);

        // ============ Клик ============
        btn.addEventListener('click', function() {
            applyState(!isHidden);
            log('новое состояние:', isHidden ? 'скрыто' : 'показано');
        });

        // ============ Куда вставить ============
        var authBtn = document.getElementById('auth-btn-container');
        if (authBtn && authBtn.parentElement === document.body) {
            document.body.insertBefore(btn, authBtn);
        } else {
            document.body.appendChild(btn);
        }

        // ============ Ресайз — обновление ширины и режима ============
        var resizeTimer = null;
        window.addEventListener('resize', function() {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (!isDesktop()) {
                    // Ушли на мобильный
                    btn.style.display = 'none';
                    document.body.classList.remove('sidebar-hidden');
                } else {
                    btn.style.display = '';
                    // Обновляем ширину (могла измениться если пользователь зумил)
                    var w = getSidebarWidth();
                    document.documentElement.style.setProperty('--mars-sb-width', w + 'px');
                    // Восстанавливаем состояние
                    applyState(getSavedState());
                }
            }, 250);
        }, { passive: true });

        // ============ Escape ============
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !isHidden) {
                applyState(true);
            }
        });

        log('готово, состояние:', isHidden ? 'скрыто' : 'показано');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsSidebarToggle = {
        hide: function() {
            var btn = document.getElementById(BTN_ID);
            if (btn) btn.click();
        },
        show: function() {
            var btn = document.getElementById(BTN_ID);
            if (btn && document.body.classList.contains('sidebar-hidden')) btn.click();
        },
        toggle: function() {
            var btn = document.getElementById(BTN_ID);
            if (btn) btn.click();
        },
        isHidden: function() {
            return document.body.classList.contains('sidebar-hidden');
        },
        reset: function() {
            try { localStorage.removeItem(STATE_KEY); } catch(e) {}
        }
    };

    if (DEBUG) console.log('✅ sidebar-toggle.js v2 VIP загружен');
})();
