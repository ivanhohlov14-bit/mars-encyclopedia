// ============================================================
// effects-menu.js — VIP v16
// - Мягкие звуки (громкость убавлена в 3-4 раза)
// - Авто-скрытие при открытии модалок (scrolls, profile и т.д.)
// - Одна кнопка на телефоне (bottom-right, safe-area)
// - Надёжная инициализация с ретраями
// - Не ломается при SPA-переходах
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 🎯 ОПЦИИ
    // ============================================================
    var OPTIONS = [
        { id: 'stars', icon: '⭐', iconOn: '🌟', title: 'Звёздное небо',
          desc: 'Тёмная космическая тема + мерцающие звёзды',
          selector: '#mars-stars-toggle',
          isOn: function() { return localStorage.getItem('mars_stars_enabled') === 'true'; } },
        { id: 'martian', icon: '📖', iconOn: '🪐', title: 'Марсианский язык',
          desc: 'Перевести статьи на древний марсианский',
          selector: '#martian-toggle',
          isOn: function() { return localStorage.getItem('mars_lang_mode') === 'mr'; } },
        { id: 'scroll', icon: '📜', iconOn: '📖', title: 'Режим свитка',
          desc: 'Древний пергамент вместо обычного фона',
          selector: '#scroll-mode-toggle',
          isOn: function() { return localStorage.getItem('mars_scroll_mode') === 'true'; } }
    ];

    // Классы, при которых меню автоматически скрывается
    var HIDE_ON_CLASSES = [
        'scr-modal-open'   // модалка свитков
    ];

    // ============================================================
    // 📱 Определение мобильного
    // ============================================================
    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 1 && window.innerWidth < 1024) return true;
        return window.innerWidth < 768;
    }

    // ============================================================
    // 🔊 ЗВУК — мягкий, приглушённый
    // ============================================================
    var audioCtx = null;

    function getAudioCtx() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) { return null; }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(function() {});
        }
        return audioCtx;
    }

    function playTone(freq, startTime, duration, volume) {
        var c = getAudioCtx();
        if (!c) return;
        var o = c.createOscillator();
        var g = c.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, startTime);
        g.gain.linearRampToValueAtTime(volume, startTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0005, startTime + duration);
        o.connect(g);
        g.connect(c.destination);
        o.start(startTime);
        o.stop(startTime + duration);
    }

    // ВКЛ — восходящие ноты (тихо)
    function soundEffectOn() {
        var c = getAudioCtx();
        if (!c) return;
        var t = c.currentTime;
        [220, 277.18, 329.63, 440, 554.37].forEach(function(f, i) {
            playTone(f, t + i * 0.14, 1.4, 0.035); // было 0.12 → стало 0.035
        });
    }

    // ВЫКЛ — нисходящее глиссандо (тихо)
    function soundEffectOff() {
        var c = getAudioCtx();
        if (!c) return;
        var o = c.createOscillator(), g = c.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(554.37, c.currentTime);
        o.frequency.exponentialRampToValueAtTime(110, c.currentTime + 0.8);
        g.gain.setValueAtTime(0, c.currentTime);
        g.gain.linearRampToValueAtTime(0.03, c.currentTime + 0.05); // тише
        g.gain.exponentialRampToValueAtTime(0.0005, c.currentTime + 0.8);
        o.connect(g);
        g.connect(c.destination);
        o.start();
        o.stop(c.currentTime + 0.8);
    }

    // МЕНЮ ОТКРЫТИЕ — мягкие ноты (очень тихо)
    function soundMenuOpen() {
        var c = getAudioCtx();
        if (!c) return;
        var t = c.currentTime;
        [783.99, 987.77, 1174.66].forEach(function(f, i) {
            playTone(f, t + i * 0.08, 0.3, 0.018); // было 0.05 → 0.018
        });
    }

    // МЕНЮ ЗАКРЫТИЕ
    function soundMenuClose() {
        var c = getAudioCtx();
        if (!c) return;
        var t = c.currentTime;
        [1174.66, 987.77, 783.99].forEach(function(f, i) {
            playTone(f, t + i * 0.08, 0.28, 0.018);
        });
    }

    // ============================================================
    // 🎨 СКРЫТИЕ СТАРЫХ КНОПОК
    // ============================================================
    function hideOldButtons() {
        if (document.getElementById('effects-menu-hide-old')) return;
        var s = document.createElement('style');
        s.id = 'effects-menu-hide-old';
        s.textContent =
            '#mars-stars-toggle,\n' +
            '#martian-toggle,\n' +
            '#scroll-mode-toggle {\n' +
            '    display: none !important;\n' +
            '}';
        document.head.appendChild(s);
    }

    function clickOldButton(sel) {
        var b = document.querySelector(sel);
        if (b) b.click();
    }

    // ============================================================
    // 🔍 Поиск контейнера профиля
    // ============================================================
    function findProfileContainer() {
        var sels = [
            '#auth-btn-container',
            '#auth-button',
            '.auth-button',
            '.mars-auth-button',
            '#mars-auth-button'
        ];
        for (var i = 0; i < sels.length; i++) {
            var el = document.querySelector(sels[i]);
            if (!el) continue;
            var r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) return el;
        }
        return null;
    }

    // ============================================================
    // 📌 Позиционирование
    // ============================================================
    var BTN_SIZE_DESKTOP = 40;
    var BTN_SIZE_MOBILE = 48;
    var GAP = 16;

    function placeButton() {
        if (!menuBtn) return;

        // 📱 МОБИЛЬНЫЙ
        if (isMobile()) {
            menuBtn.style.position = 'fixed';
            menuBtn.style.top = 'auto';
            menuBtn.style.bottom = 'calc(90px + env(safe-area-inset-bottom, 0px))';
            menuBtn.style.right = 'calc(20px + env(safe-area-inset-right, 0px))';
            menuBtn.style.left = 'auto';
            menuBtn.style.transform = 'none';
            menuBtn.style.zIndex = '9999990';
            menuBtn.style.width = BTN_SIZE_MOBILE + 'px';
            menuBtn.style.height = BTN_SIZE_MOBILE + 'px';
            return;
        }

        // 🖥 ПК — слева от профиля
        var profile = findProfileContainer();

        if (!profile) {
            menuBtn.style.position = 'fixed';
            menuBtn.style.top = '12px';
            menuBtn.style.left = 'auto';
            menuBtn.style.right = '16px';
            menuBtn.style.bottom = 'auto';
            menuBtn.style.transform = 'none';
            menuBtn.style.zIndex = '9999990';
            menuBtn.style.width = BTN_SIZE_DESKTOP + 'px';
            menuBtn.style.height = BTN_SIZE_DESKTOP + 'px';
            return;
        }

        var r = profile.getBoundingClientRect();
        if (r.width === 0 || r.left === 0) return;

        var buttonLeft = r.left - GAP - BTN_SIZE_DESKTOP;

        menuBtn.style.position = 'fixed';
        menuBtn.style.top = (r.top + r.height / 2) + 'px';
        menuBtn.style.left = buttonLeft + 'px';
        menuBtn.style.right = 'auto';
        menuBtn.style.bottom = 'auto';
        menuBtn.style.transform = 'translateY(-50%)';
        menuBtn.style.zIndex = '9999990';
        menuBtn.style.width = BTN_SIZE_DESKTOP + 'px';
        menuBtn.style.height = BTN_SIZE_DESKTOP + 'px';
    }

    // ============================================================
    // 📌 Создание UI
    // ============================================================
    var menuBtn = null;
    var panel = null;
    var isOpen = false;
    var hiddenByModal = false;

    function createMenu() {
        if (document.getElementById('effects-menu-btn')) return;

        menuBtn = document.createElement('button');
        menuBtn.id = 'effects-menu-btn';
        menuBtn.type = 'button';
        menuBtn.setAttribute('aria-label', 'Эффекты сайта');
        menuBtn.innerHTML = '<span class="em-btn-icon">✨</span>';
        menuBtn.onclick = toggleMenu;
        document.body.appendChild(menuBtn);

        panel = document.createElement('div');
        panel.id = 'effects-menu-panel';
        panel.innerHTML =
            '<div class="em-bg"></div>' +
            '<div class="em-header">' +
                '<span>✨ Эффекты сайта</span>' +
                '<button class="em-close" type="button" aria-label="Закрыть">✕</button>' +
            '</div>' +
            '<div class="em-list"></div>';
        document.body.appendChild(panel);
        panel.querySelector('.em-close').onclick = closeMenu;

        document.addEventListener('click', function(e) {
            if (!isOpen) return;
            if (e.target.closest('#effects-menu-panel')) return;
            if (e.target.closest('#effects-menu-btn')) return;
            closeMenu();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) closeMenu();
        });

        renderList();

        placeButton();
        [100, 300, 600, 1000, 1800, 3000].forEach(function(ms) {
            setTimeout(placeButton, ms);
        });

        window.addEventListener('resize', placeButton);
        window.addEventListener('scroll', placeButton, { passive: true });

        setInterval(placeButton, 2000);
        setInterval(updateButtonColor, 2500);
        updateButtonColor();
    }

    function updateButtonColor() {
        if (!menuBtn || !panel) return;
        var color = getComputedStyle(document.documentElement)
            .getPropertyValue('--wf-color').trim();
        if (color && /^#[0-9a-fA-F]{6}$/.test(color)) {
            menuBtn.classList.add('em-colored');
            panel.classList.add('em-colored');
        } else {
            menuBtn.classList.remove('em-colored');
            panel.classList.remove('em-colored');
        }
    }

    // ============================================================
    // 👁️ СЛЕЖЕНИЕ ЗА МОДАЛКАМИ
    // ============================================================
    function checkModalState() {
        var isModalOpen = false;
        for (var i = 0; i < HIDE_ON_CLASSES.length; i++) {
            if (document.body.classList.contains(HIDE_ON_CLASSES[i])) {
                isModalOpen = true;
                break;
            }
        }
        // Дополнительно: любая открытая модалка свитков/профиля
        if (document.querySelector('.scr-reader-overlay, .scr-finale-overlay')) {
            isModalOpen = true;
        }

        if (isModalOpen && !hiddenByModal) {
            hiddenByModal = true;
            if (isOpen) closeMenu();
            if (menuBtn) menuBtn.classList.add('em-hidden');
            if (panel) panel.classList.add('em-hidden');
        } else if (!isModalOpen && hiddenByModal) {
            hiddenByModal = false;
            if (menuBtn) menuBtn.classList.remove('em-hidden');
            if (panel) panel.classList.remove('em-hidden');
        }
    }

    function startModalWatcher() {
        // MutationObserver на body
        if (typeof MutationObserver !== 'undefined') {
            var obs = new MutationObserver(checkModalState);
            obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });

            // Плюс следим за добавлением/удалением оверлеев
            var obs2 = new MutationObserver(checkModalState);
            obs2.observe(document.body, { childList: true, subtree: false });
        }
        setInterval(checkModalState, 800);
        checkModalState();
    }

    // ============================================================
    // 📋 Список опций
    // ============================================================
    function renderList() {
        if (!panel) return;
        var list = panel.querySelector('.em-list');
        if (!list) return;
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
                var wasOn = opt.isOn();
                clickOldButton(opt.selector);
                if (wasOn) soundEffectOff();
                else soundEffectOn();
                try { if (navigator.vibrate) navigator.vibrate(8); } catch(e) {}
                setTimeout(renderList, 120);
            };
        });
    }

    // ============================================================
    // 🎛️ Открытие / закрытие
    // ============================================================
    function toggleMenu() {
        if (hiddenByModal) return;
        isOpen ? closeMenu() : openMenu();
    }

    function openMenu() {
        if (!panel || !menuBtn) return;
        if (hiddenByModal) return;

        isOpen = true;
        var r = menuBtn.getBoundingClientRect();

        if (isMobile()) {
            panel.style.top = 'auto';
            panel.style.bottom = (window.innerHeight - r.top + 8) + 'px';
            panel.style.left = '8px';
            panel.style.right = '8px';
            panel.style.width = 'auto';
        } else {
            panel.style.top = (r.bottom + 8) + 'px';
            panel.style.bottom = 'auto';
            panel.style.left = Math.max(8, Math.min(r.left, window.innerWidth - 308)) + 'px';
            panel.style.right = 'auto';
            panel.style.width = '300px';
        }
        panel.classList.add('em-open');
        menuBtn.classList.add('em-active');
        soundMenuOpen();
        try { if (navigator.vibrate) navigator.vibrate(8); } catch(e) {}
    }

    function closeMenu() {
        if (!panel || !menuBtn) return;
        isOpen = false;
        panel.classList.remove('em-open');
        menuBtn.classList.remove('em-active');
        soundMenuClose();
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function addStyles() {
        if (document.getElementById('effects-menu-style')) return;
        var s = document.createElement('style');
        s.id = 'effects-menu-style';
        s.textContent = [
            '#effects-menu-btn {',
            '    display: inline-flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '    padding: 0;',
            '    width: 40px;',
            '    height: 40px;',
            '    border-radius: 50%;',
            '    background: linear-gradient(135deg, #1a1a2e 0%, #252550 100%);',
            '    border: 1.5px solid rgba(108, 99, 255, 0.4);',
            '    color: #e8e8f0;',
            '    font-size: 1.2rem;',
            '    cursor: pointer;',
            '    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);',
            '    transition: box-shadow 0.25s, opacity 0.3s, transform 0.3s;',
            '    -webkit-tap-highlight-color: transparent;',
            '    z-index: 9999990;',
            '    overflow: hidden;',
            '    isolation: isolate;',
            '    box-sizing: border-box;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '}',
            '#effects-menu-btn.em-hidden {',
            '    opacity: 0 !important;',
            '    pointer-events: none !important;',
            '    transform: scale(0.7) !important;',
            '}',
            '#effects-menu-btn::before {',
            '    content: "";',
            '    position: absolute;',
            '    inset: 0;',
            '    z-index: -1;',
            '    background: linear-gradient(120deg,',
            '        rgba(108, 99, 255, 0.15) 0%,',
            '        rgba(162, 155, 254, 0.05) 25%,',
            '        rgba(108, 99, 255, 0.25) 50%,',
            '        rgba(162, 155, 254, 0.05) 75%,',
            '        rgba(108, 99, 255, 0.15) 100%);',
            '    background-size: 300% 300%;',
            '    animation: emShift 25s ease-in-out infinite;',
            '    opacity: 0.7;',
            '}',
            '#effects-menu-btn.em-colored::before {',
            '    background: linear-gradient(120deg,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.28) 0%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.08) 25%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.38) 50%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.08) 75%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.28) 100%);',
            '    opacity: 0.95;',
            '}',
            '#effects-menu-btn.em-colored {',
            '    border-color: rgba(var(--wf-rgb, 108,99,255), 0.55);',
            '}',
            '@keyframes emShift {',
            '    0% { background-position: 0% 50%; }',
            '    50% { background-position: 100% 50%; }',
            '    100% { background-position: 0% 50%; }',
            '}',
            '#effects-menu-btn:hover {',
            '    box-shadow: 0 8px 20px rgba(108, 99, 255, 0.5);',
            '}',
            '#effects-menu-btn.em-active {',
            '    border-color: rgba(162, 155, 254, 0.75);',
            '    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.25);',
            '}',
            '#effects-menu-btn .em-btn-icon {',
            '    font-size: 1.15rem;',
            '    line-height: 1;',
            '    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);',
            '    display: block;',
            '}',
            '#effects-menu-btn.em-active .em-btn-icon {',
            '    transform: rotate(90deg) scale(1.1);',
            '}',

            '#effects-menu-panel {',
            '    position: fixed;',
            '    width: 300px;',
            '    max-width: calc(100vw - 16px);',
            '    background: #1a1a2e;',
            '    border: 2px solid rgba(108, 99, 255, 0.5);',
            '    border-radius: 18px;',
            '    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);',
            '    z-index: 9999991;',
            '    opacity: 0;',
            '    visibility: hidden;',
            '    transform: translateY(-10px) scale(0.95);',
            '    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;',
            '    overflow: hidden;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '    isolation: isolate;',
            '}',
            '#effects-menu-panel.em-open {',
            '    opacity: 1;',
            '    visibility: visible;',
            '    transform: translateY(0) scale(1);',
            '}',
            '#effects-menu-panel.em-hidden {',
            '    opacity: 0 !important;',
            '    visibility: hidden !important;',
            '    pointer-events: none !important;',
            '}',
            '#effects-menu-panel .em-bg {',
            '    position: absolute;',
            '    inset: 0;',
            '    z-index: -1;',
            '    background: linear-gradient(120deg,',
            '        #1a1a2e 0%,',
            '        #252550 25%,',
            '        rgba(108, 99, 255, 0.18) 50%,',
            '        #252550 75%,',
            '        #1a1a2e 100%);',
            '    background-size: 300% 300%;',
            '    animation: emPanelShift 35s ease-in-out infinite;',
            '}',
            '@keyframes emPanelShift {',
            '    0% { background-position: 0% 50%; }',
            '    50% { background-position: 100% 50%; }',
            '    100% { background-position: 0% 50%; }',
            '}',
            '#effects-menu-panel.em-colored .em-bg {',
            '    background: linear-gradient(120deg,',
            '        #1a1a2e 0%,',
            '        #252550 25%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.28) 50%,',
            '        #252550 75%,',
            '        #1a1a2e 100%);',
            '    background-size: 300% 300%;',
            '}',
            '.em-header {',
            '    display: flex;',
            '    justify-content: space-between;',
            '    align-items: center;',
            '    padding: 14px 16px;',
            '    background: rgba(108, 99, 255, 0.15);',
            '    border-bottom: 1px solid rgba(108, 99, 255, 0.3);',
            '    color: #fff;',
            '    font-weight: 800;',
            '    font-size: 0.92rem;',
            '}',
            '.em-close {',
            '    background: none;',
            '    border: none;',
            '    color: #A29BFE;',
            '    font-size: 1.1rem;',
            '    cursor: pointer;',
            '    padding: 4px 8px;',
            '    border-radius: 6px;',
            '    font-family: inherit;',
            '}',
            '.em-close:hover {',
            '    background: rgba(162, 155, 254, 0.2);',
            '    color: #fff;',
            '}',
            '.em-list { padding: 8px; }',
            '.em-item {',
            '    display: flex;',
            '    align-items: center;',
            '    gap: 12px;',
            '    padding: 12px;',
            '    border-radius: 12px;',
            '    cursor: pointer;',
            '    margin-bottom: 4px;',
            '    border: 1px solid transparent;',
            '    transition: background 0.2s;',
            '}',
            '.em-item:hover { background: rgba(108, 99, 255, 0.18); }',
            '.em-item.em-on {',
            '    background: rgba(108, 99, 255, 0.25);',
            '    border-color: rgba(162, 155, 254, 0.4);',
            '}',
            '.em-item-icon {',
            '    font-size: 1.6rem;',
            '    line-height: 1;',
            '    flex-shrink: 0;',
            '    width: 32px;',
            '    text-align: center;',
            '}',
            '.em-item-body { flex: 1; min-width: 0; }',
            '.em-item-title {',
            '    font-size: 0.9rem;',
            '    font-weight: 700;',
            '    color: #fff;',
            '    margin-bottom: 2px;',
            '}',
            '.em-item-desc {',
            '    font-size: 0.72rem;',
            '    color: #9999bb;',
            '    line-height: 1.35;',
            '}',
            '.em-item.em-on .em-item-desc { color: #A29BFE; }',
            '.em-item-state {',
            '    font-size: 1rem;',
            '    color: #666688;',
            '    font-weight: 800;',
            '    flex-shrink: 0;',
            '}',
            '.em-item.em-on .em-item-state { color: #27ae60; }',

            '@media (max-width: 700px) {',
            '    #effects-menu-btn {',
            '        width: 48px !important;',
            '        height: 48px !important;',
            '        font-size: 1.3rem;',
            '    }',
            '    #effects-menu-panel {',
            '        border-radius: 16px;',
            '    }',
            '    .em-header { padding: 12px 14px; font-size: 0.88rem; }',
            '    .em-item { padding: 10px; }',
            '    .em-item-icon { font-size: 1.4rem; width: 28px; }',
            '    .em-item-title { font-size: 0.85rem; }',
            '    .em-item-desc { font-size: 0.68rem; }',
            '}'
        ].join('\n');
        document.head.appendChild(s);
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function init() {
        hideOldButtons();
        addStyles();
        createMenu();
        startModalWatcher();
    }

    // Надёжный запуск с несколькими попытками
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // На случай если DOM ещё не готов
    setTimeout(function() {
        if (!document.getElementById('effects-menu-btn')) init();
    }, 800);
    setTimeout(function() {
        if (!document.getElementById('effects-menu-btn')) init();
    }, 2000);

    // При переходах (SPA-like)
    window.addEventListener('pageshow', function() {
        if (!document.getElementById('effects-menu-btn')) init();
        placeButton();
    });

    console.log('✨ Меню эффектов VIP v16 загружено');
})();
