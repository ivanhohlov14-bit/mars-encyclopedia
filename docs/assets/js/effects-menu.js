// ============================================================
// effects-menu.js — VIP v2
// Кнопка рядом с профилем + плавные звуки + анимация цвета
// ============================================================

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
    // 🔊 ЗВУКИ — Web Audio API (мягкие, с ревербом)
    // ============================================================
    var audioCtx = null;
    var reverbNode = null;

    function getAudioCtx() {
        if (audioCtx) return audioCtx;
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            // Готовим реверб
            var rate = audioCtx.sampleRate;
            var length = rate * 1.2;
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
            wet.gain.value = 0.35;
            reverbNode.connect(wet);
            wet.connect(audioCtx.destination);
        } catch (e) {}
        return audioCtx;
    }

    // Универсальный тон с ревербом
    function playTone(freq, opts) {
        opts = opts || {};
        var c = getAudioCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var duration = opts.duration || 0.3;
        var volume = opts.volume || 0.08;
        var type = opts.type || 'sine';
        var slideTo = opts.slideTo || null;
        var delay = opts.delay || 0;
        var filterFreq = opts.filter || 2000;

        var t = c.currentTime + delay;
        var osc = c.createOscillator();
        var gain = c.createGain();
        var filter = c.createBiquadFilter();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        if (slideTo) {
            osc.frequency.exponentialRampToValueAtTime(slideTo, t + duration);
        }

        filter.type = 'lowpass';
        filter.frequency.value = filterFreq;
        filter.Q.value = 0.7;

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(volume, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

        var dry = c.createGain();
        dry.gain.value = 0.7;
        var wet = c.createGain();
        wet.gain.value = 0.4;

        osc.connect(filter);
        filter.connect(dry);
        dry.connect(c.destination);

        if (reverbNode) {
            filter.connect(wet);
            wet.connect(reverbNode);
        }

        osc.start(t);
        osc.stop(t + duration + 0.1);
    }

    // 🔊 ЗВУКИ ДЕЙСТВИЙ

    // Открытие меню — мягкий «взлёт»
    function soundOpen() {
        playTone(320, { duration: 0.35, volume: 0.07, type: 'sine', slideTo: 640, filter: 2500 });
        playTone(160, { duration: 0.4, volume: 0.04, type: 'sine', slideTo: 320, filter: 1500, delay: 0.02 });
    }

    // Закрытие меню — мягкий «спуск»
    function soundClose() {
        playTone(640, { duration: 0.32, volume: 0.07, type: 'sine', slideTo: 320, filter: 2500 });
    }

    // Включение опции — приятный «динь» (два тона)
    function soundToggleOn() {
        playTone(523.25, { duration: 0.5, volume: 0.09, type: 'sine', filter: 3500 }); // C5
        playTone(783.99, { duration: 0.6, volume: 0.07, type: 'sine', filter: 4000, delay: 0.06 }); // G5
    }

    // Выключение опции — мягкий «тук»
    function soundToggleOff() {
        playTone(392, { duration: 0.4, volume: 0.08, type: 'sine', filter: 2500 }); // G4
        playTone(261.63, { duration: 0.5, volume: 0.06, type: 'sine', filter: 2000, delay: 0.05 }); // C4
    }

    // ============================================================
    // 🎨 СКРЫТИЕ СТАРЫХ КНОПОК
    // ============================================================
    function hideOldButtons() {
        var style = document.createElement('style');
        style.id = 'effects-menu-hide-old';
        style.textContent = [
            '#mars-stars-toggle,',
            '#martian-toggle,',
            '#scroll-mode-toggle {',
            '    display: none !important;',
            '}'
        ].join('\n');
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
        // Пробуем разные варианты
        var selectors = [
            '#auth-button',
            '.auth-button',
            '#auth-btn',
            '.auth-btn',
            '[data-auth-button]',
            '.mars-auth-button',
            '.user-button',
            '#user-button',
            '.profile-button',
            '#profile-button',
            '.nav-user',
            '.header-user'
        ];

        for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i]);
            if (el) return el;
        }
        return null;
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
        menuBtn.innerHTML = '<span class="em-btn-icon">✨</span><span class="em-btn-text">Эффекты</span>';
        menuBtn.onclick = toggleMenu;

        // Находим кнопку профиля
        var profileBtn = findProfileButton();

        if (profileBtn) {
            // Кнопка-обёртка, куда вставляем рядом
            var parent = profileBtn.parentElement;
            if (parent) {
                // Вставляем ПЕРЕД кнопкой профиля
                parent.insertBefore(menuBtn, profileBtn);
                menuBtn.classList.add('em-inline');
                console.log('✨ Кнопка эффектов вставлена рядом с профилем');
            } else {
                document.body.appendChild(menuBtn);
                menuBtn.classList.add('em-floating');
            }
        } else {
            // Не нашли — плавающая в правом верхнем углу
            document.body.appendChild(menuBtn);
            menuBtn.classList.add('em-floating');
            console.log('✨ Кнопка эффектов: плавающая в углу (кнопка профиля не найдена)');
        }

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

        // Обновляем цвет кнопки при изменении профиля
        setInterval(updateButtonColor, 2000);
        updateButtonColor();
    }

    // ============================================================
    // 🎨 ЦВЕТ КНОПКИ ИЗ ПРОФИЛЯ
    // ============================================================
    function updateButtonColor() {
        if (!menuBtn) return;

        // Читаем цвет из CSS-переменной (её ставит футер)
        var color = getComputedStyle(document.documentElement)
            .getPropertyValue('--wf-color').trim();

        if (color && /^#[0-9a-fA-F]{6}$/.test(color)) {
            menuBtn.style.setProperty('--em-color', color);
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

                // 🔊 Звук
                if (wasOn) soundToggleOff();
                else soundToggleOn();

                try { if (navigator.vibrate) navigator.vibrate(10); } catch(e) {}

                setTimeout(renderList, 80);
            };
        });
    }

    // ============================================================
    // 🎛️ УПРАВЛЕНИЕ МЕНЮ
    // ============================================================
    function toggleMenu() {
        if (isOpen) closeMenu();
        else openMenu();
    }

    function openMenu() {
        isOpen = true;
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
            '/* ===== Кнопка "Эффекты" ===== */',
            '#effects-menu-btn {',
            '    position: relative;',
            '    display: inline-flex;',
            '    align-items: center;',
            '    gap: 8px;',
            '    padding: 8px 16px;',
            '    height: 40px;',
            '    border-radius: 12px;',
            '    background: linear-gradient(135deg, #1a1a2e 0%, #252550 100%);',
            '    border: 1.5px solid rgba(108, 99, 255, 0.4);',
            '    color: #e8e8f0;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '    font-size: 0.88rem;',
            '    font-weight: 700;',
            '    cursor: pointer;',
            '    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);',
            '    transition: transform 0.25s, box-shadow 0.25s;',
            '    overflow: hidden;',
            '    white-space: nowrap;',
            '    -webkit-tap-highlight-color: transparent;',
            '    isolation: isolate;',
            '}',

            '/* Анимированный градиентный фон */',
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
            '    opacity: 0.6;',
            '}',

            '/* Когда выбран цвет профиля — используем его */',
            '#effects-menu-btn.em-colored::before {',
            '    background: linear-gradient(120deg,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.25) 0%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.08) 25%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.35) 50%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.08) 75%,',
            '        rgba(var(--wf-rgb, 108,99,255), 0.25) 100%);',
            '    opacity: 0.9;',
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
            '    transform: translateY(-2px);',
            '    box-shadow: 0 8px 20px rgba(108, 99, 255, 0.4);',
            '}',

            '#effects-menu-btn.em-active {',
            '    border-color: rgba(162, 155, 254, 0.7);',
            '    box-shadow: 0 8px 20px rgba(108, 99, 255, 0.5);',
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

            '/* Плавающая (если профиль не найден) */',
            '#effects-menu-btn.em-floating {',
            '    position: fixed;',
            '    top: 12px;',
            '    right: 90px;',
            '    z-index: 9999;',
            '}',

            '/* На мобильном — скрыть текст */',
            '@media (max-width: 700px) {',
            '    #effects-menu-btn {',
            '        padding: 8px 10px;',
            '        height: 36px;',
            '    }',
            '    #effects-menu-btn .em-btn-text {',
            '        display: none;',
            '    }',
            '    #effects-menu-btn.em-floating {',
            '        top: 10px;',
            '        right: 70px;',
            '    }',
            '}',

            '/* ===== Панель меню ===== */',
            '#effects-menu-panel {',
            '    position: fixed;',
            '    top: 64px;',
            '    right: 20px;',
            '    width: 300px;',
            '    max-width: calc(100vw - 32px);',
            '    background: linear-gradient(135deg, #1a1a2e, #252550);',
            '    border: 2px solid rgba(108, 99, 255, 0.5);',
            '    border-radius: 18px;',
            '    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);',
            '    z-index: 99998;',
            '    opacity: 0;',
            '    visibility: hidden;',
            '    transform: translateY(-10px) scale(0.95);',
            '    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);',
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
            '    transition: all 0.2s;',
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
            '    transition: all 0.2s;',
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
            '    transition: all 0.2s;',
            '}',
            '.em-item.em-on .em-item-state {',
            '    color: #27ae60;',
            '}',

            '/* Мобильная панель */',
            '@media (max-width: 700px) {',
            '    #effects-menu-panel {',
            '        top: 56px;',
            '        right: 8px;',
            '        left: 8px;',
            '        width: auto;',
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

        // Ждём, пока все скрипты создадут кнопки
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

    console.log('✨ Меню эффектов VIP v2 загружено');
})();
