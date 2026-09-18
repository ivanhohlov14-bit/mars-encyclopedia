// ============================================================
// effects-menu.js — VIP v4
// Ноты вместо частот + кнопка сбоку от профиля
// ============================================================

(function() {
    'use strict';

    var IS_MOBILE =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    // ============================================================
    // 🎵 НОТЫ
    // ============================================================
    var N = {
        C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
        C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
        C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
        C6: 1046.50, D6: 1174.66, E6: 1318.51, G6: 1567.98
    };

    // ============================================================
    // 🎯 ОПЦИИ
    // ============================================================
    var OPTIONS = [
        {
            id: 'stars',
            icon: '⭐', iconOn: '🌟',
            title: 'Звёздное небо',
            desc: 'Тёмная космическая тема + мерцающие звёзды',
            selector: '#mars-stars-toggle',
            isOn: function() { return localStorage.getItem('mars_stars_enabled') === 'true'; }
        },
        {
            id: 'martian',
            icon: '📖', iconOn: '🪐',
            title: 'Марсианский язык',
            desc: 'Перевести статьи на древний марсианский',
            selector: '#martian-toggle',
            isOn: function() { return localStorage.getItem('mars_lang_mode') === 'mr'; }
        },
        {
            id: 'scroll',
            icon: '📜', iconOn: '📖',
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
    // 🔊 WEB AUDIO + РЕВЕРБ
    // ============================================================
    var audioCtx = null;
    var reverbNode = null;

    function getAudioCtx() {
        if (audioCtx) return audioCtx;
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            var rate = audioCtx.sampleRate;
            var length = rate * 1.6;
            var impulse = audioCtx.createBuffer(2, length, rate);
            for (var ch = 0; ch < 2; ch++) {
                var data = impulse.getChannelData(ch);
                for (var i = 0; i < length; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
                }
            }
            reverbNode = audioCtx.createConvolver();
            reverbNode.buffer = impulse;
            var wet = audioCtx.createGain();
            wet.gain.value = 0.4;
            reverbNode.connect(wet);
            wet.connect(audioCtx.destination);
        } catch (e) {}
        return audioCtx;
    }

    // Одна нота с мягкой обёрткой и ревербом
    function playNote(freq, opts) {
        opts = opts || {};
        var c = getAudioCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var duration = opts.duration || 0.5;
        var volume = opts.volume || 0.08;
        var type = opts.type || 'sine';
        var delay = opts.delay || 0;
        var filterFreq = opts.filter || 3000;
        var reverbMix = opts.reverb !== undefined ? opts.reverb : 0.4;

        var t = c.currentTime + delay;
        var osc = c.createOscillator();
        var gain = c.createGain();
        var filter = c.createBiquadFilter();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);

        filter.type = 'lowpass';
        filter.frequency.value = filterFreq;
        filter.Q.value = 0.7;

        // Мягкая атака + плавное затухание
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(volume, t + 0.03);
        gain.gain.setValueAtTime(volume, t + duration * 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

        var dry = c.createGain();
        dry.gain.value = 1 - reverbMix;
        var wet = c.createGain();
        wet.gain.value = reverbMix;

        osc.connect(filter);
        filter.connect(dry);
        dry.connect(c.destination);
        if (reverbNode) {
            filter.connect(wet);
            wet.connect(reverbNode);
        }

        osc.start(t);
        osc.stop(t + duration + 0.05);
    }

    // ============================================================
    // 🎼 КРАСИВЫЕ ЗВУКОВЫЕ КОМБИНАЦИИ
    // ============================================================

    // Открытие — восходящее мажорное трезвучие (C5 → E5 → G5)
    function soundOpen() {
        playNote(N.C5, { duration: 0.5, volume: 0.07, type: 'sine', delay: 0,    filter: 3500 });
        playNote(N.E5, { duration: 0.5, volume: 0.06, type: 'sine', delay: 0.05, filter: 4000 });
        playNote(N.G5, { duration: 0.6, volume: 0.05, type: 'sine', delay: 0.10, filter: 4500 });
    }

    // Закрытие — нисходящее (G5 → E5 → C5)
    function soundClose() {
        playNote(N.G5, { duration: 0.4, volume: 0.06, type: 'sine', delay: 0,    filter: 4000 });
        playNote(N.E5, { duration: 0.4, volume: 0.06, type: 'sine', delay: 0.05, filter: 3500 });
        playNote(N.C5, { duration: 0.5, volume: 0.07, type: 'sine', delay: 0.10, filter: 3000 });
    }

    // Включение — восходящая терция + октава (C5 → E5 → C6)
    function soundToggleOn() {
        playNote(N.C5, { duration: 0.4, volume: 0.08, type: 'sine', delay: 0,    filter: 3500 });
        playNote(N.E5, { duration: 0.4, volume: 0.07, type: 'sine', delay: 0.06, filter: 4000 });
        playNote(N.C6, { duration: 0.5, volume: 0.06, type: 'sine', delay: 0.12, filter: 4500 });
    }

    // Выключение — нисходящая (C6 → E5 → C5)
    function soundToggleOff() {
        playNote(N.C6, { duration: 0.35, volume: 0.06, type: 'sine', delay: 0,    filter: 4500 });
        playNote(N.E5, { duration: 0.35, volume: 0.07, type: 'sine', delay: 0.06, filter: 4000 });
        playNote(N.C5, { duration: 0.5,  volume: 0.08, type: 'sine', delay: 0.12, filter: 3000 });
    }

    // ============================================================
    // 🎨 СКРЫТИЕ СТАРЫХ КНОПОК
    // ============================================================
    function hideOldButtons() {
        var style = document.createElement('style');
        style.id = 'effects-menu-hide-old';
        style.textContent =
            '#mars-stars-toggle,\n' +
            '#martian-toggle,\n' +
            '#scroll-mode-toggle { display: none !important; }';
        document.head.appendChild(style);
    }

    function clickOldButton(selector) {
        var btn = document.querySelector(selector);
        if (btn) btn.click();
    }

    // ============================================================
    // 🔍 ПОИСК КНОПКИ ПРОФИЛЯ
    // ============================================================
    function findProfileButton() {
        var selectors = [
            '#auth-button',
            '.auth-button',
            '.mars-auth-button',
            '#mars-auth-button',
            '#auth-btn',
            '.auth-btn',
            '.user-button',
            '#user-button',
            '[data-auth-button]',
            'a[href="/profile/"]',
            'a[href*="/profile/"]'
        ];
        for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i]);
            if (el && el.offsetParent !== null) return el; // только видимые
        }
        return null;
    }

    // ============================================================
    // 📌 РАЗМЕЩЕНИЕ КНОПКИ — СБОКУ ОТ ПРОФИЛЯ
    // ============================================================
    function placeButton() {
        if (!menuBtn) return;

        var profile = findProfileButton();

        if (!profile) {
            // Не нашли — фиксируем в углу
            menuBtn.style.position = 'fixed';
            menuBtn.style.top = '12px';
            menuBtn.style.right = '90px';
            menuBtn.style.left = 'auto';
            menuBtn.style.zIndex = '9999999';
            menuBtn.classList.add('em-floating');
            return;
        }

        menuBtn.classList.remove('em-floating');

        var r = profile.getBoundingClientRect();
        if (r.width === 0) return; // скрыт

        // Ставим СЛЕВА от профиля
        menuBtn.style.position = 'fixed';
        menuBtn.style.top = (r.top + r.height / 2) + 'px';
        menuBtn.style.transform = 'translateY(-50%)';
        menuBtn.style.height = Math.max(36, Math.min(44, r.height)) + 'px';
        menuBtn.style.right = (window.innerWidth - r.left + 8) + 'px';
        menuBtn.style.left = 'auto';
        menuBtn.style.zIndex = '9999999';
        menuBtn.style.marginRight = '0';
    }

    // ============================================================
    // 📌 СОЗДАНИЕ UI
    // ============================================================
    function createMenu() {
        if (document.getElementById('effects-menu-btn')) return;

        menuBtn = document.createElement('button');
        menuBtn.id = 'effects-menu-btn';
        menuBtn.setAttribute('aria-label', 'Эффекты сайта');
        menuBtn.innerHTML = '<span class="em-btn-icon">✨</span><span class="em-btn-text">Эффекты</span>';
        menuBtn.onclick = toggleMenu;

        // ВСЕГДА вешаем на body — потом двигаем через fixed
        document.body.appendChild(menuBtn);
        menuBtn.classList.add('em-fixed');

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

        // Размещаем кнопку + обновляем при изменениях
        placeButton();
        setTimeout(placeButton, 300);
        setTimeout(placeButton, 1000);
        setTimeout(placeButton, 2000);

        window.addEventListener('resize', placeButton);
        window.addEventListener('scroll', placeButton, { passive: true });
        setInterval(placeButton, 1500);

        // Цвет из профиля
        setInterval(updateButtonColor, 2000);
        updateButtonColor();
    }

    function updateButtonColor() {
        if (!menuBtn) return;
        var color = getComputedStyle(document.documentElement)
            .getPropertyValue('--wf-color').trim();
        if (color && /^#[0-9a-fA-F]{6}$/.test(color)) {
            menuBtn.classList.add('em-colored');
        } else {
            menuBtn.classList.remove('em-colored');
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

                if (wasOn) soundToggleOff();
                else soundToggleOn();

                try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}
                setTimeout(renderList, 80);
            };
        });
    }

    // ============================================================
    // 🎛️ УПРАВЛЕНИЕ
    // ============================================================
    function toggleMenu() {
        if (isOpen) closeMenu();
        else openMenu();
    }

    function openMenu() {
        isOpen = true;
        // Панель — под кнопкой
        if (menuBtn) {
            var r = menuBtn.getBoundingClientRect();
            panel.style.top = (r.bottom + 8) + 'px';
            var rightOffset = window.innerWidth - r.right;
            panel.style.right = rightOffset + 'px';
        }
        panel.classList.add('em-open');
        menuBtn.classList.add('em-active');
        soundOpen();
        try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}
    }

    function closeMenu() {
        isOpen = false;
        panel.classList.remove('em-open');
        menuBtn.classList.remove('em-active');
        soundClose();
    }

    // ============================================================
    // 🎨 СТИЛИ
    // ============================================================
    function addStyles() {
        var style = document.createElement('style');
        style.id = 'effects-menu-style';
        style.textContent = [
            '/* ===== КНОПКА "ЭФФЕКТЫ" ===== */',
            '#effects-menu-btn {',
            '    display: inline-flex;',
            '    align-items: center;',
            '    gap: 8px;',
            '    padding: 0 16px;',
            '    height: 40px;',
            '    min-width: 110px;',
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

            '/* Плавающая (fallback) */',
            '#effects-menu-btn.em-floating {',
            '    position: fixed !important;',
            '    top: 12px !important;',
            '    right: 90px !important;',
            '}',

            '/* Мобильный */',
            '@media (max-width: 700px) {',
            '    #effects-menu-btn {',
            '        padding: 0 12px;',
            '        height: 36px;',
            '        min-width: auto;',
            '    }',
            '    #effects-menu-btn .em-btn-text {',
            '        display: none;',
            '    }',
            '}',

            '/* ===== ПАНЕЛЬ ===== */',
            '#effects-menu-panel {',
            '    position: fixed;',
            '    width: 300px;',
            '    max-width: calc(100vw - 24px);',
            '    background: linear-gradient(135deg, #1a1a2e, #252550);',
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
            '}',
            '#effects-menu-panel.em-open {',
            '    opacity: 1;',
            '    visibility: visible;',
            '    transform: translateY(0) scale(1);',
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
            '    letter-spacing: 0.5px;',
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

            '.em-list {',
            '    padding: 8px;',
            '}',
            '.em-item {',
            '    display: flex;',
            '    align-items: center;',
            '    gap: 12px;',
            '    padding: 12px;',
            '    border-radius: 12px;',
            '    cursor: pointer;',
            '    transition: background 0.2s;',
            '    margin-bottom: 4px;',
            '    border: 1px solid transparent;',
            '}',
            '.em-item:hover {',
            '    background: rgba(108, 99, 255, 0.18);',
            '}',
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
            '.em-item-body {',
            '    flex: 1;',
            '    min-width: 0;',
            '}',
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
            '.em-item.em-on .em-item-desc {',
            '    color: #A29BFE;',
            '}',
            '.em-item-state {',
            '    font-size: 1rem;',
            '    color: #666688;',
            '    font-weight: 800;',
            '    flex-shrink: 0;',
            '}',
            '.em-item.em-on .em-item-state {',
            '    color: #27ae60;',
            '}',

            '@media (max-width: 700px) {',
            '    #effects-menu-panel {',
            '        right: 8px !important;',
            '        left: 8px !important;',
            '        width: auto !important;',
            '        max-width: none;',
            '    }',
            '}'
        ].join('\n');
        document.head.appendChild(style);
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

    console.log('✨ Меню эффектов VIP v4 загружено');
})();
