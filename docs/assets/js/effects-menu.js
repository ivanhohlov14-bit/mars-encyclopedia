// ============================================================
// effects-menu.js — VIP v8
// Все тогглы = один красивый звук (ноты)
// Меню = свой звук (ноты)
// Кнопка — позиционирование через right
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 🎵 НОТЫ
    // ============================================================
    var N = {
        C5: 523.25, D5: 587.33, E5: 659.25,
        G5: 783.99, A5: 880.00, B5: 987.77,
        C6: 1046.50, D6: 1174.66, E6: 1318.51
    };

    // ============================================================
    // 🎯 ОПЦИИ
    // ============================================================
    var OPTIONS = [
        { id: 'stars',    icon: '⭐', iconOn: '🌟', title: 'Звёздное небо',
          desc: 'Тёмная космическая тема + мерцающие звёзды',
          selector: '#mars-stars-toggle',
          isOn: function() { return localStorage.getItem('mars_stars_enabled') === 'true'; } },
        { id: 'martian',  icon: '📖', iconOn: '🪐', title: 'Марсианский язык',
          desc: 'Перевести статьи на древний марсианский',
          selector: '#martian-toggle',
          isOn: function() { return localStorage.getItem('mars_lang_mode') === 'mr'; } },
        { id: 'scroll',   icon: '📜', iconOn: '📖', title: 'Режим свитка',
          desc: 'Древний пергамент вместо обычного фона',
          selector: '#scroll-mode-toggle',
          isOn: function() { return localStorage.getItem('mars_scroll_mode') === 'true'; } }
    ];

    var menuBtn = null;
    var panel = null;
    var isOpen = false;

    // ============================================================
    // 🔊 ЗВУКОВОЙ ДВИЖОК — чистый sine, без реверба
    // ============================================================
    var audioCtx = null;

    function getAudioCtx() {
        if (audioCtx) return audioCtx;
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {}
        return audioCtx;
    }

    // Одна чистая нота
    function playNote(freq, opts) {
        opts = opts || {};
        var c = getAudioCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var duration = opts.duration || 0.22;
        var volume = opts.volume || 0.05;
        var delay = opts.delay || 0;
        var filterFreq = opts.filter || 1400;

        var t = c.currentTime + delay;
        var osc = c.createOscillator();
        var gain = c.createGain();
        var filter = c.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        filter.type = 'lowpass';
        filter.frequency.value = filterFreq;
        filter.Q.value = 0.5;

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(volume, t + 0.025);
        gain.gain.linearRampToValueAtTime(0, t + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(c.destination);

        osc.start(t);
        osc.stop(t + duration + 0.02);
    }

    // ============================================================
    // 🎼 ЗВУК ДЛЯ ВСЕХ ТОГГЛОВ — красивый «мажорный аккорд»
    // ============================================================

    // ВКЛЮЧЕНИЕ любого эффекта — восходящее трезвучие + октава
    // C5 → E5 → G5 → C6
    function soundEffectOn() {
        playNote(N.C5, { duration: 0.22, volume: 0.05, delay: 0.00, filter: 1200 });
        playNote(N.E5, { duration: 0.22, volume: 0.05, delay: 0.07, filter: 1300 });
        playNote(N.G5, { duration: 0.22, volume: 0.05, delay: 0.14, filter: 1400 });
        playNote(N.C6, { duration: 0.30, volume: 0.05, delay: 0.21, filter: 1500 });
    }

    // ВЫКЛЮЧЕНИЕ любого эффекта — нисходящее (обратное)
    // C6 → G5 → E5 → C5
    function soundEffectOff() {
        playNote(N.C6, { duration: 0.20, volume: 0.05, delay: 0.00, filter: 1500 });
        playNote(N.G5, { duration: 0.20, volume: 0.05, delay: 0.07, filter: 1400 });
        playNote(N.E5, { duration: 0.20, volume: 0.05, delay: 0.14, filter: 1300 });
        playNote(N.C5, { duration: 0.28, volume: 0.05, delay: 0.21, filter: 1200 });
    }

    // ============================================================
    // 🎼 ЗВУК ТОЛЬКО ДЛЯ ОТКРЫТИЯ/ЗАКРЫТИЯ МЕНЮ
    // ============================================================

    // Открытие меню — высокий «взлёт»
    // G5 → B5 → D6
    function soundMenuOpen() {
        playNote(N.G5, { duration: 0.18, volume: 0.045, delay: 0.00, filter: 1500 });
        playNote(N.B5, { duration: 0.18, volume: 0.045, delay: 0.06, filter: 1600 });
        playNote(N.D6, { duration: 0.24, volume: 0.045, delay: 0.12, filter: 1700 });
    }

    // Закрытие меню — «спуск»
    // D6 → B5 → G5
    function soundMenuClose() {
        playNote(N.D6, { duration: 0.16, volume: 0.045, delay: 0.00, filter: 1700 });
        playNote(N.B5, { duration: 0.16, volume: 0.045, delay: 0.06, filter: 1600 });
        playNote(N.G5, { duration: 0.22, volume: 0.045, delay: 0.12, filter: 1500 });
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
            '#scroll-mode-toggle { display: none !important; }';
        document.head.appendChild(s);
    }

    function clickOldButton(sel) {
        var b = document.querySelector(sel);
        if (b) b.click();
    }

    // ============================================================
    // 🔍 ПОИСК КНОПКИ ПРОФИЛЯ
    // ============================================================
    function findProfileButton() {
        var sels = [
            '#auth-button', '.auth-button',
            '.mars-auth-button', '#mars-auth-button',
            '#auth-btn', '.auth-btn',
            '.user-button', '#user-button',
            '[data-auth-button]',
            'a[href="/profile/"]', 'a[href*="/profile/"]'
        ];
        for (var i = 0; i < sels.length; i++) {
            var el = document.querySelector(sels[i]);
            if (el && el.offsetParent !== null) return el;
        }
        return null;
    }

    // Ищем иконку/аватар внутри кнопки профиля
    function findProfileIcon(btn) {
        if (!btn) return null;
        return btn.querySelector('img, svg, [class*="avatar"], [class*="icon"]');
    }

    // ============================================================
    // 📌 ПОЗИЦИОНИРОВАНИЕ — через RIGHT, надёжно
    // ============================================================
    var GAP = 12; // отступ между "Эффекты" и иконкой профиля (px)

    function placeButton() {
        if (!menuBtn) return;

        var profile = findProfileButton();
        if (!profile) {
            menuBtn.style.position = 'fixed';
            menuBtn.style.top = '12px';
            menuBtn.style.right = '16px';
            menuBtn.style.left = 'auto';
            menuBtn.style.zIndex = '9999999';
            return;
        }

        // Целимся по ИКОНКЕ внутри кнопки профиля
        var icon = findProfileIcon(profile);
        var anchor = icon || profile;
        var r = anchor.getBoundingClientRect();
        if (r.width === 0 || r.left === 0) return;

        // Сбрасываем возможные inline-стили
        menuBtn.style.position = 'fixed';
        menuBtn.style.left = 'auto';
        menuBtn.style.zIndex = '9999999';
        menuBtn.style.top = (r.top + r.height / 2) + 'px';
        menuBtn.style.transform = 'translateY(-50%)';
        menuBtn.style.height = Math.max(36, Math.min(40, r.height)) + 'px';

        // 🎯 КЛЮЧЕВОЙ МОМЕНТ: привязываем ПРАВЫЙ край кнопки
        // к ЛЕВОМУ краю иконки профиля с отступом GAP
        var rightOffset = window.innerWidth - r.left + GAP;
        menuBtn.style.right = rightOffset + 'px';
    }

    // ============================================================
    // 📌 СОЗДАНИЕ UI
    // ============================================================
    function createMenu() {
        if (document.getElementById('effects-menu-btn')) return;

        menuBtn = document.createElement('button');
        menuBtn.id = 'effects-menu-btn';
        menuBtn.setAttribute('aria-label', 'Эффекты сайта');
        menuBtn.innerHTML =
            '<span class="em-btn-icon">✨</span>' +
            '<span class="em-btn-text">Эффекты</span>';
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

        // Много раз — чтобы точно поймать момент отрисовки шапки
        placeButton();
        [100, 250, 500, 800, 1200, 2000, 3500, 5000].forEach(function(ms) {
            setTimeout(placeButton, ms);
        });

        window.addEventListener('resize', placeButton);
        window.addEventListener('scroll', placeButton, { passive: true });

        setInterval(placeButton, 1000);
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
    // 📋 РЕНДЕР СПИСКА
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

                // 🎵 ВСЕ ТОГГЛЫ ЗВУЧАТ ОДИНАКОВО
                if (wasOn) soundEffectOff();
                else soundEffectOn();

                try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}
                setTimeout(renderList, 80);
            };
        });
    }

    // ============================================================
    // 🎛️ УПРАВЛЕНИЕ
    // ============================================================
    function toggleMenu() { isOpen ? closeMenu() : openMenu(); }

    function openMenu() {
        isOpen = true;
        if (menuBtn) {
            var r = menuBtn.getBoundingClientRect();
            panel.style.top = (r.bottom + 8) + 'px';
            var panelWidth = 300;
            var panelRight = Math.max(8, window.innerWidth - r.right);
            panel.style.right = panelRight + 'px';
            panel.style.left = 'auto';
        }
        panel.classList.add('em-open');
        menuBtn.classList.add('em-active');
        soundMenuOpen(); // ← только для меню
        try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}
    }

    function closeMenu() {
        isOpen = false;
        panel.classList.remove('em-open');
        menuBtn.classList.remove('em-active');
        soundMenuClose(); // ← только для меню
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
            '    gap: 6px;',
            '    padding: 0 14px;',
            '    height: 40px;',
            '    border-radius: 20px;',
            '    background: linear-gradient(135deg, #1a1a2e 0%, #252550 100%);',
            '    border: 1.5px solid rgba(108, 99, 255, 0.4);',
            '    color: #e8e8f0;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '    font-size: 0.88rem;',
            '    font-weight: 700;',
            '    cursor: pointer;',
            '    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);',
            '    transition: box-shadow 0.25s;',
            '    overflow: hidden;',
            '    white-space: nowrap;',
            '    -webkit-tap-highlight-color: transparent;',
            '    isolation: isolate;',
            '    box-sizing: border-box;',
            '    z-index: 9999999;',
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
            '    font-size: 1rem;',
            '    line-height: 1;',
            '    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);',
            '}',
            '#effects-menu-btn.em-active .em-btn-icon {',
            '    transform: rotate(90deg) scale(1.1);',
            '}',
            '#effects-menu-btn .em-btn-text {',
            '    font-size: 0.82rem;',
            '    letter-spacing: 0.3px;',
            '}',
            '@media (max-width: 700px) {',
            '    #effects-menu-btn {',
            '        padding: 0 12px;',
            '        height: 36px;',
            '    }',
            '    #effects-menu-btn .em-btn-text { display: none; }',
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
            '@media (max-width: 700px) {',
            '    #effects-menu-panel {',
            '        right: 8px !important;',
            '        left: 8px !important;',
            '        width: auto !important;',
            '        max-width: none;',
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

    console.log('✨ Меню эффектов VIP v8 загружено');
})();
