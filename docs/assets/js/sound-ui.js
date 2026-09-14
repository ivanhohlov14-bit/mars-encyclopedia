// sound-ui.js — UI для звуков: плавающая панель + автоопределение
(function() {
    'use strict';

    // ============================================================
    // 🔍 АВТООПРЕДЕЛЕНИЕ ТЕМЫ СТАТЬИ
    // ============================================================
    const THEME_KEYWORDS = {
        sea: ['море', 'моря', 'морю', 'морск', 'океан', 'прибой', 'волн', 'эритрейск', 'ацидали', 'залив', 'берег'],
        fire: ['огон', 'огня', 'пламя', 'пожар', 'вулкан', 'лав', 'пепел', 'горел', 'сожж'],
        wind: ['ветер', 'ветр', 'бур', 'шторм', 'ураган', 'вихр'],
        cave: ['пещер', 'пещер', 'подземн', 'храм', 'грот', 'туннел', 'фарсид'],
        forest: ['лес', 'дерев', 'роща', 'растен', 'флор'],
        market: ['рынок', 'торг', 'купц', 'базар', 'лавк', 'цен'],
        storm: ['бур', 'гроз', 'молни', 'шторм', 'ураган'],
        space: ['космос', 'звезд', 'звёзд', 'планет', 'орбит', 'галакт', 'небо', 'астроном']
    };

    function detectTheme() {
        const title = (document.title || '').toLowerCase();
        const h1 = (document.querySelector('h1') ? document.querySelector('h1').textContent : '').toLowerCase();
        const body = (document.querySelector('.md-content__inner, .rst-content, article, .document') || document.body).textContent.substring(0, 2000).toLowerCase();
        const text = (title + ' ' + h1 + ' ' + body).toLowerCase();

        let best = null;
        let bestScore = 0;

        for (const sceneId in THEME_KEYWORDS) {
            let score = 0;
            THEME_KEYWORDS[sceneId].forEach(kw => {
                const matches = text.match(new RegExp(kw, 'g'));
                if (matches) score += matches.length;
            });
            // Бонус за совпадение в заголовке
            THEME_KEYWORDS[sceneId].forEach(kw => {
                if (title.indexOf(kw) !== -1) score += 5;
                if (h1.indexOf(kw) !== -1) score += 3;
            });
            if (score > bestScore) {
                bestScore = score;
                best = sceneId;
            }
        }

        return bestScore >= 2 ? best : null;
    }

    // ============================================================
    // 🎧 ПЛАВАЮЩАЯ КНОПКА
    // ============================================================
    function createSoundButton() {
        if (document.getElementById('sound-fab')) return;

        const btn = document.createElement('button');
        btn.id = 'sound-fab';
        btn.setAttribute('aria-label', 'Звуки Марса');
        btn.innerHTML = '🎧';
        btn.onclick = togglePanel;
        document.body.appendChild(btn);

        const panel = document.createElement('div');
        panel.id = 'sound-panel';
        panel.innerHTML = `
            <div class="sp-header">
                <span>🎧 Звуки Марса</span>
                <button class="sp-close" aria-label="Закрыть">✕</button>
            </div>
            <div class="sp-list"></div>
            <div class="sp-footer">
                <label class="sp-vol">
                    <span>🔊</span>
                    <input type="range" id="sp-volume" min="0" max="100" value="50">
                </label>
                <button id="sp-stop" class="sp-stop">⏹ Стоп</button>
            </div>
        `;
        document.body.appendChild(panel);

        panel.querySelector('.sp-close').onclick = closePanel;
        document.getElementById('sp-stop').onclick = function() {
            if (window.marsSound) window.marsSound.stop();
        };
        document.getElementById('sp-volume').oninput = function() {
            if (window.marsSound) window.marsSound.volume(this.value / 100);
        };

        renderSoundList();
        renderSuggested();
    }

    function renderSoundList() {
        const list = document.querySelector('#sound-panel .sp-list');
        if (!list || !window.marsSound) return;

        const scenes = window.marsSound.scenes;
        list.innerHTML = Object.keys(scenes).map(id => {
            const s = scenes[id];
            return `
                <button class="sp-item" data-sound="${id}" style="--c: ${s.color};">
                    <span class="sp-item-icon">${s.icon}</span>
                    <span class="sp-item-name">${s.name}</span>
                    <span class="sp-item-eq"><span></span><span></span><span></span></span>
                </button>
            `;
        }).join('');

        list.querySelectorAll('.sp-item').forEach(btn => {
            btn.onclick = function() {
                const id = btn.dataset.sound;
                if (btn.classList.contains('sound-active')) {
                    window.marsSound.stop();
                } else {
                    window.marsSound.play(id);
                    try { if (navigator.vibrate) navigator.vibrate(15); } catch(e) {}
                }
            };
        });
    }

    // Подсказка — рекомендуем звук по теме статьи
    function renderSuggested() {
        const suggested = detectTheme();
        if (!suggested || !window.marsSound) return;

        const panel = document.getElementById('sound-panel');
        if (!panel) return;

        const scene = window.marsSound.scenes[suggested];
        const hint = document.createElement('div');
        hint.className = 'sp-suggest';
        hint.innerHTML = `
            <div class="sp-suggest-title">✨ Подходит для этой статьи</div>
            <button class="sp-suggest-btn" data-sound="${suggested}" style="--c: ${scene.color};">
                <span style="font-size:1.4rem;">${scene.icon}</span>
                <span>Услышать ${scene.name.toLowerCase()}</span>
            </button>
        `;
        panel.querySelector('.sp-list').insertBefore(hint, panel.querySelector('.sp-list').firstChild);

        hint.querySelector('.sp-suggest-btn').onclick = function() {
            const id = this.dataset.sound;
            if (this.classList.contains('sound-active')) {
                window.marsSound.stop();
            } else {
                window.marsSound.play(id);
                // Авто-закрытие панели через 1.5 сек
                setTimeout(() => {
                    document.querySelectorAll('.sp-item, .sp-suggest-btn').forEach(b => {
                        b.classList.toggle('sound-active', b.dataset.sound === id);
                    });
                }, 100);
                try { if (navigator.vibrate) navigator.vibrate(15); } catch(e) {}
            }
        };
    }

    // ============================================================
    // 🎚️ ОТКРЫТЬ / ЗАКРЫТЬ
    // ============================================================
    let isOpen = false;
    function togglePanel() {
        const panel = document.getElementById('sound-panel');
        const fab = document.getElementById('sound-fab');
        if (!panel) return;
        isOpen = !isOpen;
        panel.classList.toggle('sp-open', isOpen);
        fab.classList.toggle('sp-fab-active', isOpen);
        fab.innerHTML = isOpen ? '✕' : '🎧';
    }

    function closePanel() {
        isOpen = false;
        const panel = document.getElementById('sound-panel');
        const fab = document.getElementById('sound-fab');
        if (panel) panel.classList.remove('sp-open');
        if (fab) {
            fab.classList.remove('sp-fab-active');
            fab.innerHTML = '🎧';
        }
    }

    // ============================================================
    // 🎨 СТИЛИ
    // ============================================================
    function addStyles() {
        const style = document.createElement('style');
        style.id = 'sound-ui-style';
        style.textContent = `
            /* ==== FAB ==== */
            #sound-fab {
                position: fixed;
                bottom: 148px;
                right: 20px;
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                border: 2px solid #4a3fd9;
                color: #fff;
                font-size: 1.4rem;
                cursor: pointer;
                z-index: 99999;
                box-shadow: 0 8px 24px rgba(108,99,255,0.55);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
            }
            #sound-fab:hover {
                transform: scale(1.08);
                box-shadow: 0 12px 32px rgba(108,99,255,0.75);
            }
            #sound-fab.sp-fab-active {
                background: linear-gradient(135deg, #4a3fd9, #6C63FF);
                transform: rotate(90deg);
            }

            /* ==== PANEL ==== */
            #sound-panel {
                position: fixed;
                bottom: 212px;
                right: 20px;
                width: 300px;
                max-width: calc(100vw - 32px);
                background: linear-gradient(135deg, #1a1a2e, #252550);
                border: 2px solid rgba(108,99,255,0.5);
                border-radius: 18px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.6);
                z-index: 99998;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                overflow: hidden;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
            }
            #sound-panel.sp-open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }

            .sp-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 16px;
                background: rgba(108,99,255,0.15);
                border-bottom: 1px solid rgba(108,99,255,0.3);
                color: #fff;
                font-weight: 800;
                font-size: 0.92rem;
                letter-spacing: 0.5px;
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
            }
            .sp-close:hover {
                background: rgba(162,155,254,0.2);
                color: #fff;
            }

            .sp-list {
                padding: 8px;
                max-height: 50vh;
                overflow-y: auto;
            }

            /* ==== ITEM ==== */
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
                font-size: 0.92rem;
                text-align: left;
                transition: all 0.2s;
                margin-bottom: 4px;
                position: relative;
            }
            .sp-item:hover {
                background: rgba(108,99,255,0.18);
            }
            .sp-item.sound-active {
                background: rgba(108,99,255,0.25);
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
            }
            .sp-item.sound-active .sp-item-eq {
                display: flex;
            }
            .sp-item-eq span {
                width: 2px;
                background: var(--c, #6C63FF);
                border-radius: 1px;
                animation: sp-eq 0.8s ease-in-out infinite alternate;
            }
            .sp-item-eq span:nth-child(1) { height: 40%; animation-delay: 0s; }
            .sp-item-eq span:nth-child(2) { height: 100%; animation-delay: 0.15s; }
            .sp-item-eq span:nth-child(3) { height: 60%; animation-delay: 0.3s; }

            @keyframes sp-eq {
                from { transform: scaleY(0.4); }
                to { transform: scaleY(1); }
            }

            /* ==== SUGGEST ==== */
            .sp-suggest {
                padding: 10px;
                background: linear-gradient(135deg, rgba(108,99,255,0.2), rgba(162,155,254,0.1));
                border: 1px solid rgba(162,155,254,0.3);
                border-radius: 12px;
                margin-bottom: 8px;
            }
            .sp-suggest-title {
                font-size: 0.72rem;
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
                background: linear-gradient(135deg, var(--c, #6C63FF), color-mix(in srgb, var(--c, #6C63FF) 60%, white));
                color: #fff;
                border: none;
                border-radius: 10px;
                font-family: inherit;
                font-size: 0.95rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 6px 16px rgba(108,99,255,0.4);
            }
            .sp-suggest-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 24px rgba(108,99,255,0.6);
            }
            .sp-suggest-btn.sound-active {
                outline: 3px solid rgba(255,255,255,0.5);
                outline-offset: 2px;
            }

            /* ==== FOOTER ==== */
            .sp-footer {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 14px;
                background: rgba(0,0,0,0.25);
                border-top: 1px solid rgba(108,99,255,0.3);
            }
            .sp-vol {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #A29BFE;
            }
            .sp-vol input[type="range"] {
                flex: 1;
                accent-color: #6C63FF;
            }
            .sp-stop {
                padding: 6px 12px;
                background: rgba(231,76,60,0.2);
                color: #ff8888;
                border: 1px solid rgba(231,76,60,0.4);
                border-radius: 8px;
                font-size: 0.8rem;
                font-weight: 700;
                cursor: pointer;
                font-family: inherit;
                transition: all 0.2s;
            }
            .sp-stop:hover {
                background: rgba(231,76,60,0.35);
                color: #fff;
            }

            @media (max-width: 768px) {
                #sound-fab {
                    bottom: calc(140px + env(safe-area-inset-bottom, 0px));
                    right: calc(16px + env(safe-area-inset-right, 0px));
                    width: 56px;
                    height: 56px;
                }
                #sound-panel {
                    bottom: calc(210px + env(safe-area-inset-bottom, 0px));
                    right: calc(16px + env(safe-area-inset-right, 0px));
                    width: calc(100vw - 32px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function init() {
        // Не на служебных страницах
        var path = window.location.pathname;
        if (path.indexOf('/secret') !== -1 || path.indexOf('/login') !== -1) return;

        addStyles();
        setTimeout(createSoundButton, 400);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
