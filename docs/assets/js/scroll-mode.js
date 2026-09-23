// ============================================================
// scroll-mode.js — v2 VIP
// Режим "древний свиток"
// - Применяет класс ДО рендера (нет вспышки)
// - Safe storage
// - Позиция кнопки не конфликтует с effects/martian
// - Reduced-motion
// - Публичное API
// ============================================================
(function() {
    'use strict';

    if (window.__scrollModeLoaded) return;
    window.__scrollModeLoaded = true;

    var KEY = 'mars_scroll_mode';
    var BTN_ID = 'scroll-mode-toggle';

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function safeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function safeSet(k, v) { try { localStorage.setItem(k, v); return true; } catch(e) { return false; } }

    function isActive() { return safeGet(KEY) === 'true'; }

    // ============================================================
    // ⚡ Применяем класс СРАЗУ — до рендера DOM
    // Это убирает "вспышку" обычного вида при загрузке
    // ============================================================
    if (isActive()) {
        document.documentElement.classList.add('scroll-mode');
        // body может быть ещё не доступен — ставим после
        if (document.body) {
            document.body.classList.add('scroll-mode');
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                document.body.classList.add('scroll-mode');
            }, { once: true });
        }
    }

    // ============================================================
    // 🎨 Стили кнопки
    // ============================================================
    function injectStyles() {
        if (document.getElementById('scroll-mode-style')) return;
        var s = document.createElement('style');
        s.id = 'scroll-mode-style';
        s.textContent = `
            #${BTN_ID} {
                position: fixed;
                bottom: calc(90px + env(safe-area-inset-bottom, 0px));
                right: calc(20px + env(safe-area-inset-right, 0px));
                width: 52px;
                height: 52px;
                border-radius: 50%;
                border: 2px solid #b08d57;
                background: linear-gradient(135deg, #f5e6c8, #e8d4a8);
                color: #5c3d1e;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 9999991;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                box-shadow:
                    0 8px 24px rgba(176, 141, 87, 0.45),
                    inset 0 2px 4px rgba(255, 255, 255, 0.6);
                transition: transform .25s cubic-bezier(.16,1,.3,1),
                            box-shadow .25s ease,
                            background .25s ease;
                -webkit-tap-highlight-color: transparent;
                touch-action: manipulation;
                font-family: inherit;
            }
            #${BTN_ID}:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow:
                    0 14px 32px rgba(176, 141, 87, 0.6),
                    inset 0 2px 4px rgba(255, 255, 255, 0.6);
            }
            #${BTN_ID}:active {
                transform: translateY(0) scale(.96);
            }

            /* Если включён режим свитка — другой цвет */
            html.scroll-mode #${BTN_ID} {
                background: linear-gradient(135deg, #d4a373, #b08d57);
                color: #fff;
                border-color: #8b6f47;
            }

            /* Тёмная тема */
            body.mars-stars-on #${BTN_ID} {
                box-shadow:
                    0 8px 24px rgba(176, 141, 87, 0.7),
                    0 0 40px rgba(255, 200, 100, 0.3),
                    inset 0 2px 4px rgba(255, 255, 255, 0.2);
            }

            /* Мобильный — поменьше */
            @media (max-width: 600px) {
                #${BTN_ID} {
                    width: 46px;
                    height: 46px;
                    font-size: 1.3rem;
                    bottom: calc(150px + env(safe-area-inset-bottom, 0px));
                }
            }

            @media (prefers-reduced-motion: reduce) {
                #${BTN_ID} { transition: none !important; }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🔘 Кнопка
    // ============================================================
    var toggleBtn = null;

    function updateButton() {
        if (!toggleBtn) return;
        var active = isActive();
        toggleBtn.textContent = active ? '📖' : '📜';
        toggleBtn.title = active ? 'Обычный режим' : 'Режим свитка';
        toggleBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }

    function createToggle() {
        if (document.getElementById(BTN_ID)) {
            toggleBtn = document.getElementById(BTN_ID);
            return;
        }
        toggleBtn = document.createElement('button');
        toggleBtn.id = BTN_ID;
        toggleBtn.type = 'button';
        toggleBtn.setAttribute('aria-label', 'Режим свитка');
        toggleBtn.onclick = function() {
            var active = isActive();
            safeSet(KEY, active ? 'false' : 'true');
            document.documentElement.classList.toggle('scroll-mode', !active);
            document.body.classList.toggle('scroll-mode', !active);
            updateButton();
            try { if (navigator.vibrate) navigator.vibrate(15); } catch(e) {}
        };
        document.body.appendChild(toggleBtn);
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    function init() {
        injectStyles();
        createToggle();
        updateButton();
        console.log('📜 scroll-mode v2 VIP готов');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsScrollMode = {
        isActive: isActive,
        on: function() { safeSet(KEY, 'true'); document.documentElement.classList.add('scroll-mode'); document.body.classList.add('scroll-mode'); updateButton(); },
        off: function() { safeSet(KEY, 'false'); document.documentElement.classList.remove('scroll-mode'); document.body.classList.remove('scroll-mode'); updateButton(); },
        toggle: function() { toggleBtn && toggleBtn.click(); }
    };
})();
