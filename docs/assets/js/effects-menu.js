// effects-menu.js — объединённое меню эффектов
(function() {
    'use strict';

    var IS_MOBILE =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    // ============================================================
    // 🎯 ОПЦИИ МЕНЮ
    // ============================================================
    var OPTIONS = [
        {
            id: 'stars',
            icon: '⭐',
            iconOn: '🌟',
            title: 'Звёздное небо',
            desc: 'Тёмная космическая тема + мерцающие звёзды',
            selector: '#mars-stars-toggle',
            isOn: function() { return localStorage.getItem('mars_stars_enabled') === 'true'; }
        },
        {
            id: 'martian',
            icon: '📖',
            iconOn: '🪐',
            title: 'Марсианский язык',
            desc: 'Перевести статьи на древний марсианский',
            selector: '#martian-toggle',
            isOn: function() { return localStorage.getItem('mars_lang_mode') === 'mr'; }
        },
        {
            id: 'scroll',
            icon: '📜',
            iconOn: '📖',
            title: 'Режим свитка',
            desc: 'Древний пергамент вместо обычного фона',
            selector: '#scroll-mode-toggle',
            isOn: function() { return localStorage.getItem('mars_scroll_mode') === 'true'; }
        }
    ];

    var menuBtn = null;
    var panel = null;
    var isOpen = false;

    // ============================================================
    // СКРЫВАЕМ СТАРЫЕ КНОПКИ (но их функционал остаётся)
    // ============================================================
    function hideOldButtons() {
        var style = document.createElement('style');
        style.id = 'effects-menu-hide-old';
        style.textContent = `
            #mars-stars-toggle,
            #martian-toggle,
            #scroll-mode-toggle {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    function clickOldButton(selector) {
        var btn = document.querySelector(selector);
        if (btn) btn.click();
    }

    // ============================================================
    // СОЗДАНИЕ UI
    // ============================================================
    function createMenu() {
        if (document.getElementById('effects-menu-btn')) return;

        // Главная кнопка
        menuBtn = document.createElement('button');
        menuBtn.id = 'effects-menu-btn';
        menuBtn.setAttribute('aria-label', 'Эффекты сайта');
        menuBtn.innerHTML = '✨';
        menuBtn.onclick = toggleMenu;
        document.body.appendChild(menuBtn);

        // Панель
        panel = document.createElement('div');
        panel.id = 'effects-menu-panel';
        panel.innerHTML =
            '<div class="em-header">' +
                '<span>✨ Эффекты сайта</span>' +
                '<button class="em-close" aria-label="Закрыть">✕</button>' +
            '</div>' +
            '<div class="em-list"></div>';
        document.body.appendChild(panel);

        panel.querySelector('.em-close').onclick = closeMenu;

        // Клик вне — закрыть
        document.addEventListener('click', function(e) {
            if (!isOpen) return;
            if (e.target.closest('#effects-menu-panel')) return;
            if (e.target.closest('#effects-menu-btn')) return;
            closeMenu();
        });

        // Escape — закрыть
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) closeMenu();
        });

        renderList();
    }

    function renderList() {
        var list = panel.querySelector('.em-list');
        list.innerHTML = OPTIONS.map(function(opt) {
            var on = opt.isOn();
            return (
                '<div class="em-item ' + (on ? 'em-on' : '') + '" data-id="' + opt.id + '">' +
                    '<div class="em-item-icon">' + (on ? opt.iconOn : opt.icon) + '</div>' +
                    '<div class="em-item-body">' +
                        '<div class="em-item-title">' + opt.title + '</div>' +
                        '<div class="em-item-desc">' + opt.desc + '</div>' +
                    '</div>' +
                    '<div class="em-item-state">' + (on ? '✓' : '○') + '</div>' +
                '</div>'
            );
        }).join('');

        list.querySelectorAll('.em-item').forEach(function(item) {
            item.onclick = function() {
                var opt = OPTIONS.find(function(o) { return o.id === item.dataset.id; });
                if (!opt) return;
                clickOldButton(opt.selector);
                try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}
                // Обновляем UI с небольшой задержкой (чтобы localStorage успел обновиться)
                setTimeout(renderList, 60);
            };
        });
    }

    function toggleMenu() {
        if (isOpen) closeMenu();
        else openMenu();
    }

    function openMenu() {
        isOpen = true;
        panel.classList.add('em-open');
        menuBtn.classList.add('em-active');
        menuBtn.innerHTML = '✕';
        try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}
    }

    function closeMenu() {
        isOpen = false;
        panel.classList.remove('em-open');
        menuBtn.classList.remove('em-active');
        menuBtn.innerHTML = '✨';
    }

    // ============================================================
    // СТИЛИ
    // ============================================================
    function addStyles() {
        var style = document.createElement('style');
        style.id = 'effects-menu-style';
        style.textContent = `
            /* ==== Главная кнопка ✨ ==== */
            #effects-menu-btn {
                position: fixed;
                bottom: ${IS_MOBILE ? 'calc(80px + env(safe-area-inset-bottom,0px))' : '90px'};
                right: ${IS_MOBILE ? 'calc(16px + env(safe-area-inset-right,0px))' : '20px'};
                width: ${IS_MOBILE ? '56px' : '52px'};
                height: ${IS_MOBILE ? '56px' : '52px'};
                border-radius: 50%;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                border: 2px solid #4a3fd9;
                color: #fff;
                font-size: ${IS_MOBILE ? '1.5rem' : '1.4rem'};
                cursor: pointer;
                z-index: 99999;
                box-shadow: 0 8px 24px rgba(108, 99, 255, 0.55);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
            }
            #effects-menu-btn:hover {
                transform: scale(1.08);
                box-shadow: 0 12px 32px rgba(108, 99, 255, 0.75);
            }
            #effects-menu-btn.em-active {
                background: linear-gradient(135deg, #4a3fd9, #6C63FF);
                transform: rotate(90deg);
            }

            /* ==== Панель ==== */
            #effects-menu-panel {
                position: fixed;
                bottom: ${IS_MOBILE ? 'calc(144px + env(safe-area-inset-bottom,0px))' : '152px'};
                right: ${IS_MOBILE ? 'calc(16px + env(safe-area-inset-right,0px))' : '20px'};
                width: 300px;
                max-width: calc(100vw - 32px);
                background: linear-gradient(135deg, #1a1a2e, #252550);
                border: 2px solid rgba(108, 99, 255, 0.5);
                border-radius: 18px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
                z-index: 99998;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                overflow: hidden;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
            }
            #effects-menu-panel.em-open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }

            .em-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 16px;
                background: rgba(108, 99, 255, 0.15);
                border-bottom: 1px solid rgba(108, 99, 255, 0.3);
                color: #fff;
                font-weight: 800;
                font-size: 0.92rem;
                letter-spacing: 0.5px;
            }
            .em-close {
                background: none;
                border: none;
                color: #A29BFE;
                font-size: 1.1rem;
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 6px;
                transition: all 0.2s;
                font-family: inherit;
            }
            .em-close:hover {
                background: rgba(162, 155, 254, 0.2);
                color: #fff;
            }

            .em-list {
                padding: 8px;
            }
            .em-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s;
                margin-bottom: 4px;
                border: 1px solid transparent;
            }
            .em-item:hover {
                background: rgba(108, 99, 255, 0.18);
            }
            .em-item.em-on {
                background: rgba(108, 99, 255, 0.25);
                border-color: rgba(162, 155, 254, 0.4);
            }
            .em-item-icon {
                font-size: 1.6rem;
                line-height: 1;
                flex-shrink: 0;
                width: 32px;
                text-align: center;
            }
            .em-item-body {
                flex: 1;
                min-width: 0;
            }
            .em-item-title {
                font-size: 0.9rem;
                font-weight: 700;
                color: #fff;
                margin-bottom: 2px;
            }
            .em-item-desc {
                font-size: 0.72rem;
                color: #9999bb;
                line-height: 1.35;
            }
            .em-item.em-on .em-item-desc {
                color: #A29BFE;
            }
            .em-item-state {
                font-size: 1rem;
                color: #666688;
                font-weight: 800;
                flex-shrink: 0;
                transition: all 0.2s;
            }
            .em-item.em-on .em-item-state {
                color: #27ae60;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function init() {
        hideOldButtons();
        addStyles();
        // Ждём, пока все скрипты создадут свои кнопки
        setTimeout(createMenu, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('✨ Меню эффектов активно');
})();
