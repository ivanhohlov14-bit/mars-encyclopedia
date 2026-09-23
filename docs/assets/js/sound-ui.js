// ============================================================
// sound-ui.js — v2 VIP
// Плавающая панель звуков + автоопределение темы статьи
// - Поддержка ОБОИХ источников: marsSound (плеер) + marsAmbient (сцены)
// - FAB поднят выше stars-toggle (bottom: 210px)
// - Синхронизация .sound-active + aria-pressed
// - ES5, ESC, aria-expanded, keyboard
// - color-mix заменён на safe fallback
// - Улучшен detectTheme (заголовок + первые 5000 знаков)
// - SPA + MutationObserver
// ============================================================
(function() {
    'use strict';

    if (window.__marsSoundUiLoaded) return;
    window.__marsSoundUiLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var FAB_ID = 'sound-fab';
    var PANEL_ID = 'sound-panel';
    var STYLE_ID = 'sound-ui-style';
    var VOLUME_KEY = 'mars_sound_volume';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🎧 sound-ui:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        return window.innerWidth <= 768;
    }

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function lsGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }

    // ============================================================
    // 🎯 Получить «единый» источник звуков
    // Поддерживает оба: marsSound (пресеты плеера) и marsAmbient (сцены)
    // ============================================================
    function getSoundSource() {
        // 1. marsAmbient (sound-engine v2) — приоритет для сцен
        if (window.marsAmbient && window.marsAmbient.scenes) {
            return { api: window.marsAmbient, scenes: window.marsAmbient.scenes, type: 'ambient' };
        }
        // 2. marsSound (sound-engine v1 или алиас)
        if (window.marsSound && window.marsSound.scenes) {
            return { api: window.marsSound, scenes: window.marsSound.scenes, type: 'ambient' };
        }
        // 3. marsSound с пресетами (sound-synth v2) — оборачиваем
        if (window.marsSound && window.marsSound.presets && window.marsSound.labels) {
            var presets = {};
            var presetsList = window.marsSound.presets;
            var labels = window.marsSound.labels;
            var sceneMeta = {
                calm:     { icon: '🌊', color: '#3498db' },
                ocean:    { icon: '🌊', color: '#2980b9' },
                storm:    { icon: '⛈️', color: '#8e44ad' },
                gulls:    { icon: '🕊️', color: '#16a085' },
                deep:     { icon: '🐋', color: '#2c3e50' },
                freezing: { icon: '❄️', color: '#95a5a6' }
            };
            for (var i = 0; i < presetsList.length; i++) {
                var id = presetsList[i];
                var meta = sceneMeta[id] || { icon: '🎵', color: '#6C63FF' };
                presets[id] = {
                    name: labels[id] || id,
                    icon: meta.icon,
                    color: meta.color,
                    preset: id
                };
            }
            return { api: window.marsSound, scenes: presets, type: 'preset' };
        }
        return null;
    }

    // ============================================================
    // 🔍 Автоопределение темы
    // ============================================================
    var THEME_KEYWORDS = {
        sea:     ['море', 'моря', 'морск', 'океан', 'прибой', 'волн', 'эритрейск', 'ацидали', 'залив', 'берег'],
        fire:    ['огон', 'огня', 'пламя', 'пожар', 'вулкан', 'лав', 'пепел'],
        wind:    ['ветер', 'ветр', 'бур', 'шторм', 'ураган', 'вихр'],
        cave:    ['пещер', 'подземн', 'храм', 'грот', 'туннел', 'фарсид'],
        forest:  ['лес', 'дерев', 'роща', 'растен', 'флор'],
        market:  ['рынок', 'торг', 'купц', 'базар', 'лавк'],
        storm:   ['бур', 'гроз', 'молни', 'шторм'],
        space:   ['космос', 'звезд', 'звёзд', 'планет', 'орбит', 'галакт', 'небо', 'астроном'],
        calm:    ['спокойн', 'тишин', 'покой'],
        deep:    ['глубин', 'глубок', 'дно'],
        freezing: ['замерза', 'лед', 'льд', 'холод', 'мороз'],
        gulls:   ['чайк', 'птиц']
    };

    function detectTheme() {
        var title = (document.title || '').toLowerCase();
        var h1El = document.querySelector('h1');
        var h1 = h1El ? h1El.textContent.toLowerCase() : '';

        var contentEl = document.querySelector('.md-content__inner, .rst-content, article, .document');
        var body = contentEl ? contentEl.textContent.substring(0, 5000).toLowerCase() : '';

        var text = title + ' ' + h1 + ' ' + body;
        var best = null;
        var bestScore = 0;

        for (var sceneId in THEME_KEYWORDS) {
            if (!Object.prototype.hasOwnProperty.call(THEME_KEYWORDS, sceneId)) continue;
            var kws = THEME_KEYWORDS[sceneId];
            var score = 0;

            for (var i = 0; i < kws.length; i++) {
                var kw = kws[i];
                // Без regex — просто indexOf (безопасно с любыми символами)
                var idx = 0;
                var count = 0;
                while ((idx = text.indexOf(kw, idx)) !== -1 && count < 20) {
                    count++;
                    idx += kw.length;
                }
                score += count;
            }
            // Бонус за заголовок
            for (var j = 0; j < kws.length; j++) {
                if (title.indexOf(kws[j]) !== -1) score += 5;
                if (h1.indexOf(kws[j]) !== -1) score += 3;
            }
            if (score > bestScore) {
                bestScore = score;
                best = sceneId;
            }
        }
        return bestScore >= 2 ? best : null;
    }

    // ============================================================
    // 🎨 CSS
    // ============================================================
    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            /* ===== FAB — поднят выше stars-toggle ===== */
            #${FAB_ID} {
                position: fixed;
                bottom: calc(210px + env(safe-area-inset-bottom, 0px));
                right: calc(20px + env(safe-area-inset-right, 0px));
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                border: 2px solid #4a3fd9;
                color: #fff;
                font-size: 1.4rem;
                cursor: pointer;
                z-index: 9999987;
                box-shadow: 0 8px 24px rgba(108,99,255,0.55);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s;
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
                font-family: inherit;
            }
            #${FAB_ID}:hover {
                transform: scale(1.08);
                box-shadow: 0 12px 32px rgba(108,99,255,0.75);
            }
            #${FAB_ID}:focus-visible {
                outline: 2px solid #fff;
                outline-offset: 3px;
            }
            #${FAB_ID}.sp-fab-active {
                background: linear-gradient(135deg, #4a3fd9, #6C63FF);
                transform: rotate(90deg);
            }

            /* ===== PANEL ===== */
            #${PANEL_ID} {
                position: fixed;
                bottom: calc(276px + env(safe-area-inset-bottom, 0px));
                right: calc(20px + env(safe-area-inset-right, 0px));
                width: 320px;
                max-width: calc(100vw - 32px);
                background: linear-gradient(135deg, #1a1a2e, #252550);
                border: 2px solid rgba(108,99,255,0.5);
                border-radius: 18px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.6);
                z-index: 9999986;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(.95);
                transition: all .3s cubic-bezier(.16,1,.3,1);
                overflow: hidden;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
                max-height: calc(100vh - 320px);
                display: flex;
                flex-direction: column;
            }
            #${PANEL_ID}.sp-open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }

            .sp-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 16px;
                background: rgba(108,99,255,.15);
                border-bottom: 1px solid rgba(108,99,255,.3);
                color: #fff;
                font-weight: 800;
                font-size: .92rem;
                letter-spacing: .5px;
                flex-shrink: 0;
            }
            .sp-close {
                background: none;
                border: none;
                color: #A29BFE;
                font-size: 1.1rem;
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 6px;
                font-family: inherit;
                transition: all .2s;
            }
            .sp-close:hover {
                background: rgba(162,155,254,.2);
                color: #fff;
            }

            .sp-list {
                padding: 8px;
                overflow-y: auto;
                flex: 1;
                min-height: 0;
            }

            /* ===== ITEM ===== */
            .sp-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                width: 100%;
                border: 1px solid transparent;
                border-radius: 12px;
                background: transparent;
                color: #fff;
                cursor: pointer;
                font-family: inherit;
                font-size: .92rem;
                text-align: left;
                transition: all .2s;
                margin-bottom: 4px;
                position: relative;
            }
            .sp-item:hover { background: rgba(108,99,255,.18); }
            .sp-item:focus-visible {
                outline: 2px solid #A29BFE;
                outline-offset: -2px;
            }
            .sp-item.sound-active {
                background: rgba(108,99,255,.25);
                border-color: var(--c, #6C63FF);
            }
            .sp-item-icon {
                font-size: 1.6rem;
                width: 32px;
                text-align: center;
                flex-shrink: 0;
            }
            .sp-item-name {
                flex: 1;
                font-weight: 700;
            }
            .sp-item-eq {
                display: none;
                gap: 2px;
                align-items: flex-end;
                height: 14px;
                width: 16px;
                flex-shrink: 0;
            }
            .sp-item.sound-active .sp-item-eq { display: flex; }
            .sp-item-eq span {
                width: 2px;
                background: var(--c, #6C63FF);
                border-radius: 1px;
                animation: sp-eq .8s ease-in-out infinite alternate;
            }
            .sp-item-eq span:nth-child(1) { height: 40%; animation-delay: 0s; }
            .sp-item-eq span:nth-child(2) { height: 100%; animation-delay: .15s; }
            .sp-item-eq span:nth-child(3) { height: 60%; animation-delay: .3s; }
            @keyframes sp-eq {
                from { transform: scaleY(.4); }
                to   { transform: scaleY(1); }
            }

            /* ===== SUGGEST ===== */
            .sp-suggest {
                padding: 10px;
                background: linear-gradient(135deg, rgba(108,99,255,.2), rgba(162,155,254,.1));
                border: 1px solid rgba(162,155,254,.3);
                border-radius: 12px;
                margin-bottom: 8px;
            }
            .sp-suggest-title {
                font-size: .72rem;
                color: #A29BFE;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
                font-weight: 700;
            }
            .sp-suggest-btn {
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;
                padding: 12px;
                background: var(--c, #6C63FF);
                color: #fff;
                border: none;
                border-radius: 10px;
                font-family: inherit;
                font-size: .95rem;
                font-weight: 800;
                cursor: pointer;
                transition: transform .2s, box-shadow .2s;
                box-shadow: 0 6px 16px rgba(108,99,255,.4);
                text-align: left;
            }
            .sp-suggest-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 24px rgba(108,99,255,.6);
            }
            .sp-suggest-btn.sound-active {
                outline: 3px solid rgba(255,255,255,.5);
                outline-offset: 2px;
            }

            /* ===== FOOTER ===== */
            .sp-footer {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 14px;
                background: rgba(0,0,0,.25);
                border-top: 1px solid rgba(108,99,255,.3);
                flex-shrink: 0;
            }
            .sp-vol {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #A29BFE;
                font-size: .85rem;
            }
            .sp-vol input[type="range"] {
                flex: 1;
                accent-color: #6C63FF;
                min-width: 0;
            }
            .sp-stop {
                padding: 6px 12px;
                background: rgba(231,76,60,.2);
                color: #ff8888;
                border: 1px solid rgba(231,76,60,.4);
                border-radius: 8px;
                font-size: .8rem;
                font-weight: 700;
                cursor: pointer;
                font-family: inherit;
                transition: all .2s;
                white-space: nowrap;
            }
            .sp-stop:hover {
                background: rgba(231,76,60,.35);
                color: #fff;
            }

            /* Мобильный */
            @media (max-width: 768px) {
                #${FAB_ID} {
                    bottom: calc(210px + env(safe-area-inset-bottom, 0px));
                    right: calc(16px + env(safe-area-inset-right, 0px));
                    width: 56px;
                    height: 56px;
                }
                #${PANEL_ID} {
                    bottom: calc(276px + env(safe-area-inset-bottom, 0px));
                    right: calc(16px + env(safe-area-inset-right, 0px));
                    width: calc(100vw - 32px);
                }
            }

            @media (prefers-reduced-motion: reduce) {
                #${FAB_ID},
                #${PANEL_ID},
                .sp-item,
                .sp-suggest-btn { transition: none !important; }
                .sp-item-eq span { animation: none !important; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🎯 Кнопка + панель
    // ============================================================
    var isOpen = false;
    var soundSource = null;

    function createSoundButton() {
        if (document.getElementById(FAB_ID)) return;

        var source = getSoundSource();
        if (!source) {
            log('нет источника звука — панель не создаём');
            return;
        }
        soundSource = source;

        // FAB
        var btn = document.createElement('button');
        btn.id = FAB_ID;
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Звуки Марса');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', PANEL_ID);
        btn.innerHTML = '🎧';
        btn.addEventListener('click', togglePanel);

        // Panel
        var panel = document.createElement('div');
        panel.id = PANEL_ID;
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Панель звуков');

        panel.innerHTML =
            '<div class="sp-header">' +
                '<span>🎧 Звуки Марса</span>' +
                '<button class="sp-close" type="button" aria-label="Закрыть">✕</button>' +
            '</div>' +
            '<div class="sp-list"></div>' +
            '<div class="sp-footer">' +
                '<label class="sp-vol">' +
                    '<span>🔊</span>' +
                    '<input type="range" id="sp-volume" min="0" max="100" value="50" aria-label="Громкость">' +
                '</label>' +
                '<button type="button" id="sp-stop" class="sp-stop">⏹ Стоп</button>' +
            '</div>';

        document.body.appendChild(btn);
        document.body.appendChild(panel);

        // Обработчики
        panel.querySelector('.sp-close').addEventListener('click', closePanel);

        document.getElementById('sp-stop').addEventListener('click', function() {
            if (soundSource && soundSource.api && soundSource.api.stop) {
                soundSource.api.stop();
                updateActiveItems(null);
            }
        });

        var volInput = document.getElementById('sp-volume');
        var savedVol = lsGet(VOLUME_KEY);
        if (savedVol !== null) {
            volInput.value = savedVol;
        }

        volInput.addEventListener('input', function() {
            var v = this.value / 100;
            lsSet(VOLUME_KEY, this.value);
            if (soundSource && soundSource.api && soundSource.api.volume) {
                soundSource.api.volume(v);
            }
        });

        // Применяем сохранённую громкость
        if (savedVol !== null && soundSource.api.volume) {
            try { soundSource.api.volume(savedVol / 100); } catch(e) {}
        }

        renderSoundList();
        renderSuggested();

        // Escape закрывает
        document.addEventListener('keydown', onGlobalKeydown);
    }

    function renderSoundList() {
        var list = document.querySelector('#' + PANEL_ID + ' .sp-list');
        if (!list || !soundSource) return;

        var scenes = soundSource.scenes;
        var html = '';
        for (var id in scenes) {
            if (!Object.prototype.hasOwnProperty.call(scenes, id)) continue;
            var s = scenes[id];
            html += '<button type="button" class="sp-item" data-sound="' + escapeAttr(id) + '" style="--c:' + escapeAttr(s.color || '#6C63FF') + ';" aria-pressed="false">' +
                '<span class="sp-item-icon">' + escapeHtml(s.icon || '🎵') + '</span>' +
                '<span class="sp-item-name">' + escapeHtml(s.name || id) + '</span>' +
                '<span class="sp-item-eq" aria-hidden="true"><span></span><span></span><span></span></span>' +
                '</button>';
        }
        list.innerHTML = html;

        // Обработчики — через делегирование
        list.addEventListener('click', onItemClick);
    }

    function onItemClick(e) {
        var btn = e.target.closest && e.target.closest('.sp-item');
        if (!btn) return;
        var id = btn.dataset.sound;
        if (!id || !soundSource) return;

        var isActive = btn.classList.contains('sound-active');

        if (isActive) {
            if (soundSource.api.stop) soundSource.api.stop();
            updateActiveItems(null);
        } else {
            if (soundSource.api.play) soundSource.api.play(id);
            updateActiveItems(id);
            vibrate(15);
        }
    }

    function renderSuggested() {
        var suggested = detectTheme();
        if (!suggested || !soundSource) return;

        var scenes = soundSource.scenes;
        if (!scenes[suggested]) return;

        var panel = document.getElementById(PANEL_ID);
        var list = panel ? panel.querySelector('.sp-list') : null;
        if (!list) return;

        // Удаляем старую подсказку
        var old = list.querySelector('.sp-suggest');
        if (old) old.remove();

        var scene = scenes[suggested];

        var hint = document.createElement('div');
        hint.className = 'sp-suggest';
        hint.innerHTML =
            '<div class="sp-suggest-title">✨ Подходит для этой статьи</div>' +
            '<button type="button" class="sp-suggest-btn" data-sound="' + escapeAttr(suggested) + '" style="--c:' + escapeAttr(scene.color || '#6C63FF') + ';">' +
                '<span style="font-size:1.4rem;">' + escapeHtml(scene.icon || '🎵') + '</span>' +
                '<span>Услышать ' + escapeHtml((scene.name || suggested).toLowerCase()) + '</span>' +
            '</button>';

        list.insertBefore(hint, list.firstChild);

        hint.querySelector('.sp-suggest-btn').addEventListener('click', function() {
            var id = this.dataset.sound;
            if (this.classList.contains('sound-active')) {
                if (soundSource.api.stop) soundSource.api.stop();
                updateActiveItems(null);
            } else {
                if (soundSource.api.play) soundSource.api.play(id);
                updateActiveItems(id);
                vibrate(15);
            }
        });
    }

    function updateActiveItems(activeId) {
        var panel = document.getElementById(PANEL_ID);
        if (!panel) return;

        var all = panel.querySelectorAll('[data-sound]');
        for (var i = 0; i < all.length; i++) {
            var el = all[i];
            var isActive = el.dataset.sound === activeId;
            el.classList.toggle('sound-active', isActive);
            if (el.classList.contains('sp-item')) {
                el.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            }
        }
    }

    // ============================================================
    // 🎚️ Открыть / закрыть
    // ============================================================
    function togglePanel() {
        if (isOpen) closePanel();
        else openPanel();
    }

    function openPanel() {
        var panel = document.getElementById(PANEL_ID);
        var fab = document.getElementById(FAB_ID);
        if (!panel || !fab) return;

        isOpen = true;
        panel.classList.add('sp-open');
        fab.classList.add('sp-fab-active');
        fab.innerHTML = '✕';
        fab.setAttribute('aria-expanded', 'true');

        // Обновляем активные — вдруг кто-то снаружи переключил
        if (soundSource && soundSource.api.currentScene) {
            try {
                var cur = soundSource.api.currentScene();
                updateActiveItems(cur);
            } catch(e) {}
        }
    }

    function closePanel() {
        var panel = document.getElementById(PANEL_ID);
        var fab = document.getElementById(FAB_ID);
        if (!panel || !fab) return;

        isOpen = false;
        panel.classList.remove('sp-open');
        fab.classList.remove('sp-fab-active');
        fab.innerHTML = '🎧';
        fab.setAttribute('aria-expanded', 'false');
        fab.focus && fab.focus();
    }

    function onGlobalKeydown(e) {
        if (e.key === 'Escape' && isOpen) {
            closePanel();
        }
    }

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }
    function escapeAttr(s) {
        return String(s || '').replace(/['"\\<>]/g, function(m) {
            return { "'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e' }[m];
        });
    }
    function vibrate(ms) {
        if (!isMobile()) return;
        try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e) {}
    }

    // ============================================================
    // 🚫 Исключения
    // ============================================================
    function isExcluded() {
        var path = window.location.pathname || '/';
        if (path.indexOf('/secret') === 0) return true;
        if (path.indexOf('/login') === 0) return true;
        if (path.indexOf('/register') === 0) return true;
        return false;
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    var initAttempts = 0;
    var MAX_ATTEMPTS = 15;

    function init() {
        if (isExcluded()) {
            log('страница исключена');
            return;
        }

        // Если источник ещё не готов — попробуем позже
        if (!getSoundSource()) {
            initAttempts++;
            if (initAttempts < MAX_ATTEMPTS) {
                setTimeout(init, 400);
            } else {
                log('источник звука не найден за', MAX_ATTEMPTS, 'попыток');
            }
            return;
        }

        injectStyles();
        createSoundButton();
        log('v2 VIP готов');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 500); });
    } else {
        setTimeout(init, 500);
    }

    // ============================================================
    // 🔄 SPA — обновляем подсказку при переходе
    // ============================================================
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                setTimeout(function() {
                    // Обновляем подсказку + активные
                    if (document.getElementById(PANEL_ID)) {
                        renderSuggested();
                    } else {
                        initAttempts = 0;
                        init();
                    }
                }, 300);
            });
        } catch(e) {}
    } else {
        // Fallback — MutationObserver на смену URL
        var lastUrl = location.href;
        setInterval(function() {
            if (location.href === lastUrl) return;
            lastUrl = location.href;
            setTimeout(function() {
                if (document.getElementById(PANEL_ID)) {
                    renderSuggested();
                }
            }, 300);
        }, 1200);
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsSoundUI = {
        open: openPanel,
        close: closePanel,
        toggle: togglePanel,
        isOpen: function() { return isOpen; },
        detectTheme: detectTheme,
        refresh: function() {
            renderSoundList();
            renderSuggested();
        },
        // Синхронизировать активные элементы (вызывать из вне)
        syncActive: updateActiveItems
    };

    log('v2 VIP загружен');
})();
