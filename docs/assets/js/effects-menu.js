// ============================================================
// effects-menu.js — VIP v15 (ФИНАЛ)
// ПК: кнопка слева от профиля
// Мобильный: кнопка внизу справа
// Звуки: тогглы = звёзды (длинный), меню = мягкий (не пищит)
// ============================================================

(function() {
    'use strict';

    var IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

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

    var menuBtn = null;
    var panel = null;
    var isOpen = false;

    // ============================================================
    // 🔊 ЗВУК
    // ============================================================
    var audioCtx = null;

    function getAudioCtx() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) { return null; }
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(function() {});
        return audioCtx;
    }

    // ВКЛ эффекта — звук звёзд (220 → 554 Гц, 5 нот, 1.6 сек)
    function soundEffectOn() {
        var c = getAudioCtx();
        if (!c) return;
        var t = c.currentTime;
        [220, 277.18, 329.63, 440, 554.37].forEach(function(f, i) {
            var o = c.createOscillator(), g = c.createGain();
            o.type = 'sine';
            o.frequency.value = f;
            var s = t + i * 0.13;
            g.gain.setValueAtTime(0, s);
            g.gain.linearRampToValueAtTime(0.12, s + 0.04);
            g.gain.exponentialRampToValueAtTime(0.001, s + 1.6);
            o.connect(g); g.connect(c.destination);
            o.start(s); o.stop(s + 1.6);
        });
    }

    // ВЫКЛ эффекта — глиссандо
    function soundEffectOff() {
        var c = getAudioCtx();
        if (!c) return;
        var o = c.createOscillator(), g = c.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(554.37, c.currentTime);
        o.frequency.exponentialRampToValueAtTime(110, c.currentTime + 0.9);
        g.gain.setValueAtTime(0.1, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.9);
        o.connect(g); g.connect(c.destination);
        o.start(); o.stop(c.currentTime + 0.9);
    }

    // МЕНЮ — открытие (мягкая мелодия G5 → B5 → D6)
    function soundMenuOpen() {
        var c = getAudioCtx();
        if (!c) return;
        var t = c.currentTime;
        [783.99, 987.77, 1174.66].forEach(function(f, i) {
            var o = c.createOscillator(), g = c.createGain();
            o.type = 'sine';
            o.frequency.value = f;
            var s = t + i * 0.07;
            g.gain.setValueAtTime(0, s);
            g.gain.linearRampToValueAtTime(0.05, s + 0.03);
            g.gain.exponentialRampToValueAtTime(0.001, s + 0.35);
            o.connect(g); g.connect(c.destination);
            o.start(s); o.stop(s + 0.35);
        });
    }

    // МЕНЮ — закрытие (D6 → B5 → G5)
    function soundMenuClose() {
        var c = getAudioCtx();
        if (!c) return;
        var t = c.currentTime;
        [1174.66, 987.77, 783.99].forEach(function(f, i) {
            var o = c.createOscillator(), g = c.createGain();
            o.type = 'sine';
            o.frequency.value = f;
            var s = t + i * 0.07;
            g.gain.setValueAtTime(0, s);
            g.gain.linearRampToValueAtTime(0.05, s + 0.03);
            g.gain.exponentialRampToValueAtTime(0.001, s + 0.3);
            o.connect(g); g.connect(c.destination);
            o.start(s); o.stop(s + 0.3);
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
    // 🔍 ПОИСК ПРОФИЛЯ
    // ============================================================
    function findProfileContainer() {
        var sels = [
            '#auth-btn-container',
            '#auth-button',
            '.auth-button',
            '.mars-auth-button',
            '#mars-auth-button',
            '.user-button',
            '#user-button',
            '[data-auth-button]'
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
    // 📌 ПОЗИЦИОНИРОВАНИЕ
    // ============================================================
    var GAP = 16;
    var BTN_SIZE = 40;

    function placeButton() {
        if (!menuBtn) return;

        // 📱 МОБИЛЬНЫЙ: внизу справа (не перекрывает шапку)
        if (IS_MOBILE || window.innerWidth < 768) {
            menuBtn.style.position = 'fixed';
            menuBtn.style.top = 'auto';
            menuBtn.style.bottom = 'calc(90px + env(safe-area-inset-bottom, 0px))';
            menuBtn.style.right = 'calc(20px + env(safe-area-inset-right, 0px))';
            menuBtn.style.left = 'auto';
            menuBtn.style.transform = 'none';
            menuBtn.style.zIndex = '9999999';
            menuBtn.style.width = '48px';
            menuBtn.style.height = '48px';
            return;
        }

        // 🖥 ПК: слева от профиля
        var profile = findProfileContainer();

        if (!profile) {
            menuBtn.style.position = 'fixed';
            menuBtn.style.top = '12px';
            menuBtn.style.left = 'auto';
            menuBtn.style.right = '16px';
            menuBtn.style.bottom = 'auto';
            menuBtn.style.transform = 'none';
            menuBtn.style.zIndex = '9999999';
            return;
        }

        var r = profile.getBoundingClientRect();
        if (r.width === 0 || r.left === 0) return;

        var buttonLeft = r.left - GAP - BTN_SIZE;

        menuBtn.style.position = 'fixed';
        menuBtn.style.top = (r.top + r.height / 2) + 'px';
        menuBtn.style.left = buttonLeft + 'px';
        menuBtn.style.right = 'auto';
        menuBtn.style.bottom = 'auto';
        menuBtn.style.transform = 'translateY(-50%)';
        menuBtn.style.zIndex = '9999999';
        menuBtn.style.width = BTN_SIZE + 'px';
        menuBtn.style.height = BTN_SIZE + 'px';
    }

    // ============================================================
    // 📌 СОЗДАНИЕ UI
    // ============================================================
    function createMenu() {
        if (document.getElementById('effects-menu-btn')) return;

        menuBtn = document.createElement('button');
        menuBtn.id = 'effects-menu-btn';
        menuBtn.setAttribute('aria-label', 'Эффекты сайта');
        menuBtn.setAttribute('title', 'Эффекты сайта');
        menuBtn.innerHTML = '<span class="em-btn-icon">✨</span>';
        menuBtn.onclick = toggleMenu;
        document.body.appendChild(menuBtn);

        panel = document.createElement('div');
        panel.id = 'effects-menu-panel';
        panel.innerHTML =
            '<div class="em-bg"></div>' +
            '<div class="em-header">' +
                '<span>✨ Эффекты сайта</span>' +
                '<button class="em-close" aria-label="Закрыть">✕</button>' +
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
        [100, 250, 500, 800, 1200, 2000, 3500, 5000].forEach(function(ms) {
            setTimeout(placeButton, ms);
        });

        window.addEventListener('resize', placeButton);
        window.addEventListener('scroll', placeButton, { passive: true });

        setInterval(placeButton, 1500);
        setInterval(updateButtonColor, 2000);
        updateButtonColor();
    }

    function updateButtonColor() {
        if (!menuBtn) return;
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
    // 📋 СПИСОК
    // ============================================================
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
                var wasOn = opt.isOn();
                clickOldButton(opt.selector);
                if (wasOn) soundEffectOff();
                else soundEffectOn();
                try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}
                setTimeout(renderList, 80);
            };
        });
    }

    // ============================================================
    // 🎛️ ОТКРЫТИЕ / ЗАКРЫТИЕ
    // ============================================================
    function toggleMenu() { isOpen ? closeMenu() : openMenu(); }

    function openMenu() {
        isOpen = true;
        if (menuBtn) {
            var r = menuBtn.getBoundingClientRect();

            if (IS_MOBILE || window.innerWidth < 768) {
                // Мобильный — панель над кнопкой
                panel.style.top = 'auto';
                panel.style.bottom = (window.innerHeight - r.top + 8) + 'px';
                panel.style.left = '8px';
                panel.style.right = '8px';
                panel.style.width = 'auto';
            } else {
                // ПК — панель под кнопкой
                panel.style.top = (r.bottom + 8) + 'px';
                panel.style.bottom = 'auto';
                panel.style.left = Math.max(8, Math.min(r.left, window.innerWidth - 308)) + 'px';
                panel.style.right = 'auto';
                panel.style.width = '300px';
            }
        }
        panel.classList.add('em-open');
        menuBtn.classList.add('em-active');
        soundMenuOpen();
        try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}
    }

    function closeMenu() {
        isOpen = false;
        panel.classList.remove('em-open');
        menuBtn.classList.remove('em-active');
        soundMenuClose();
    }

    // ============================================================
    // 🎨 СТИЛИ
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
            '    transition: box-shadow 0.25s;',
            '    -webkit-tap-highlight-color: transparent;',
            '    z-index: 9999999;',
            '    overflow: hidden;',
            '    isolation: isolate;',
            '    box-sizing: border-box;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
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
            '    max-width: calc(100vw - 24px);',
            '    background: #1a1a2e;',
            '    border: 2px solid rgba(108, 99, 255, 0.5);',
            '    border-radius: 18px;',
            '    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);',
            '    z-index: 9999998;',
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

            /* Мобильная адаптация */
            '@media (max-width: 700px) {',
            '    #effects-menu-btn {',
            '        width: 48px;',
            '        height: 48px;',
            '        font-size: 1.3rem;',
            '    }',
            '    #effects-menu-panel {',
            '        border-radius: 16px;',
            '    }',
            '    .em-header {',
            '        padding: 12px 14px;',
            '        font-size: 0.88rem;',
            '    }',
            '    .em-item {',
            '        padding: 10px;',
            '    }',
            '    .em-item-icon {',
            '        font-size: 1.4rem;',
            '        width: 28px;',
            '    }',
            '    .em-item-title {',
            '        font-size: 0.85rem;',
            '    }',
            '    .em-item-desc {',
            '        font-size: 0.68rem;',
            '    }',
            '}'
        ].join('\n');
        document.head.appendChild(s);
    }

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function init() {
        hideOldButtons();
        addStyles();
        setTimeout(createMenu, 700);
        setTimeout(function() {
            if (!document.getElementById('effects-menu-btn')) createMenu();
        }, 1800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('✨ Меню эффектов VIP v15 загружено | Мобильный: ' + IS_MOBILE);
})();
