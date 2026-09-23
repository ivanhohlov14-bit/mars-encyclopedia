// ============================================================
// intro.js — v2 VIP
// Кинематографичное интро при первом входе
// - Показывается 1 раз за 7 дней (или 1 раз за сессию если debug)
// - Reduced-motion: без анимаций для слабых устройств
// - Preload + requestIdleCallback: не блокирует рендер
// - Safe storage: работает даже при заблокированном localStorage
// - Mobile-friendly: оптимизация под 60 FPS
// - Публичное API: window.marsIntro.show() / .close()
// ============================================================
(function() {
    'use strict';

    if (window.__marsIntroLoaded) return;
    window.__marsIntroLoaded = true;

    // ============================================================
    // ⚙️ Настройки
    // ============================================================
    var SHOW_EVERY_DAYS = 7;
    var INTRO_DURATION = 5500;
    var STORAGE_KEY = 'mars_intro_shown_v2';
    var SESSION_KEY = 'mars_intro_session';

    // ============================================================
    // 📦 Safe storage (безопасно если localStorage заблокирован)
    // ============================================================
    function safeGet(key) {
        try { return localStorage.getItem(key); } catch(e) { return null; }
    }
    function safeSet(key, val) {
        try { localStorage.setItem(key, val); return true; } catch(e) { return false; }
    }
    function sessionGet(key) {
        try { return sessionStorage.getItem(key); } catch(e) { return null; }
    }
    function sessionSet(key, val) {
        try { sessionStorage.setItem(key, val); return true; } catch(e) { return false; }
    }

    // ============================================================
    // 🎯 Проверка: показывать ли интро
    // ============================================================
    function shouldShow() {
        // Не показываем если уже показывали в этой сессии
        if (sessionGet(SESSION_KEY) === '1') return false;

        var raw = safeGet(STORAGE_KEY);
        if (!raw) return true;

        try {
            var lastDate = new Date(raw);
            if (isNaN(lastDate.getTime())) return true; // битая дата
            var diffDays = (Date.now() - lastDate.getTime()) / 86400000;
            return diffDays >= SHOW_EVERY_DAYS;
        } catch(e) {
            return true;
        }
    }

    function markShown() {
        safeSet(STORAGE_KEY, new Date().toISOString());
        sessionSet(SESSION_KEY, '1');
    }

    // ============================================================
    // ♿ Reduced motion
    // ============================================================
    function prefersReducedMotion() {
        try {
            return window.matchMedia &&
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    // ============================================================
    // 📱 Мобильный
    // ============================================================
    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 1 && window.innerWidth < 1024) return true;
        return window.innerWidth < 768;
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mars-intro-styles')) return;
        var s = document.createElement('style');
        s.id = 'mars-intro-styles';
        s.textContent = `
            #mars-intro-overlay {
                position: fixed;
                inset: 0;
                z-index: 999999;
                background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a14 60%, #000 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                font-family: 'Segoe UI', -apple-system, sans-serif;
                animation: marsIntroFadeIn 0.8s ease;
                transition: opacity 0.9s ease, transform 0.9s ease;
                will-change: opacity, transform;
            }
            #mars-intro-overlay.closing {
                opacity: 0;
                transform: scale(1.08);
                pointer-events: none;
            }
            #mars-intro-overlay.closing * {
                animation-play-state: paused !important;
            }

            @keyframes marsIntroFadeIn { from { opacity: 0; } to { opacity: 1; } }

            /* Звёзды */
            .mars-intro-stars {
                position: absolute;
                inset: 0;
                overflow: hidden;
                contain: strict;
            }
            .mars-intro-star {
                position: absolute;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.8);
                animation: marsStarTwinkle 2s ease-in-out infinite;
                opacity: 0;
                will-change: opacity, transform;
            }
            @keyframes marsStarTwinkle {
                0%, 100% { opacity: 0.2; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
            }

            /* Падающие звёзды */
            .mars-intro-meteor {
                position: absolute;
                width: 2px;
                height: 2px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.9);
                animation: marsMeteorFall 2s linear infinite;
                opacity: 0;
                will-change: transform, opacity;
            }
            .mars-intro-meteor::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 80px;
                height: 1px;
                background: linear-gradient(270deg, #fff, transparent);
                transform: translateX(-80px);
                opacity: 0.6;
            }
            @keyframes marsMeteorFall {
                0% { opacity: 0; transform: translate(0, 0); }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; transform: translate(300px, 300px); }
            }

            /* Контент */
            .mars-intro-content {
                position: relative;
                z-index: 10;
                text-align: center;
                padding: 20px;
                max-width: 500px;
                animation: marsContentAppear 1.2s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes marsContentAppear {
                from { opacity: 0; transform: translateY(40px) scale(0.9); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }

            /* Планета */
            .mars-intro-logo {
                margin-bottom: 32px;
                position: relative;
                height: 160px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .mars-intro-planet {
                position: relative;
                width: 130px;
                height: 130px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #e74c3c 0%, #c0392b 40%, #7f1d1d 80%, #4a1010 100%);
                box-shadow:
                    inset -15px -15px 40px rgba(0, 0, 0, 0.6),
                    inset 10px 10px 30px rgba(255, 150, 100, 0.15),
                    0 0 60px 10px rgba(231, 76, 60, 0.4),
                    0 0 120px 30px rgba(231, 76, 60, 0.2);
                animation:
                    marsPlanetSpin 20s linear infinite,
                    marsPlanetFloat 4s ease-in-out infinite;
                overflow: hidden;
                will-change: transform;
            }
            .mars-intro-planet::before {
                content: '';
                position: absolute;
                inset: 0;
                background:
                    radial-gradient(ellipse 15px 8px at 25% 35%, rgba(180, 80, 60, 0.6), transparent),
                    radial-gradient(ellipse 20px 12px at 65% 50%, rgba(180, 80, 60, 0.5), transparent),
                    radial-gradient(ellipse 10px 6px at 40% 70%, rgba(180, 80, 60, 0.5), transparent),
                    radial-gradient(ellipse 25px 15px at 75% 25%, rgba(180, 80, 60, 0.4), transparent),
                    radial-gradient(ellipse 12px 8px at 15% 65%, rgba(180, 80, 60, 0.4), transparent);
                animation: marsSurfaceScroll 20s linear infinite;
            }
            @keyframes marsPlanetSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
            @keyframes marsSurfaceScroll { from { transform: translateX(0); } to { transform: translateX(-30px); } }
            @keyframes marsPlanetFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }

            .mars-intro-planet-ring {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 220px;
                height: 220px;
                border-radius: 50%;
                border: 1px solid rgba(243, 156, 18, 0.3);
                transform: translate(-50%, -50%) rotateX(75deg);
                box-shadow: 0 0 30px rgba(243, 156, 18, 0.2);
                animation: marsRingSpin 15s linear infinite;
            }
            .mars-intro-planet-ring::before {
                content: '';
                position: absolute;
                inset: 10px;
                border-radius: 50%;
                border: 1px dashed rgba(243, 156, 18, 0.2);
            }
            @keyframes marsRingSpin {
                from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0); }
                to { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
            }

            .mars-intro-planet-glow {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(231, 76, 60, 0.4), transparent 70%);
                transform: translate(-50%, -50%);
                animation: marsGlowPulse 3s ease-in-out infinite;
                z-index: -1;
            }
            @keyframes marsGlowPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
                50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
            }

            /* Заголовки */
            .mars-intro-title {
                font-size: 2.8rem;
                font-weight: 200;
                letter-spacing: 12px;
                text-transform: uppercase;
                color: #fff;
                margin: 0 0 4px 0;
                text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
                animation: marsTitleAppear 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
            }
            .mars-intro-title2 {
                font-size: 2rem;
                font-weight: 800;
                letter-spacing: 6px;
                text-transform: uppercase;
                background: linear-gradient(135deg, #e74c3c, #f39c12, #e74c3c);
                background-size: 200% 100%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin: 0 0 24px 0;
                animation:
                    marsTitleAppear 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both,
                    marsGradientShift 3s ease-in-out infinite;
            }
            @keyframes marsTitleAppear {
                from { opacity: 0; transform: translateY(20px); filter: blur(8px); }
                to { opacity: 1; transform: translateY(0); filter: blur(0); }
            }
            @keyframes marsGradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            .mars-intro-tagline {
                font-size: 1rem;
                color: rgba(255, 255, 255, 0.6);
                letter-spacing: 3px;
                font-style: italic;
                margin: 0 0 40px 0;
                animation: marsTitleAppear 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both;
            }

            /* Лоадер */
            .mars-intro-loader {
                width: 220px;
                height: 3px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                margin: 0 auto 32px;
                overflow: hidden;
                position: relative;
                animation: marsTitleAppear 1s ease 1.4s both;
            }
            .mars-intro-loader-bar {
                height: 100%;
                width: 0;
                background: linear-gradient(90deg, #e74c3c, #f39c12, #e74c3c);
                background-size: 200% 100%;
                border-radius: 3px;
                animation:
                    marsLoaderFill 4s cubic-bezier(0.4, 0, 0.2, 1) 1.6s forwards,
                    marsGradientShift 2s ease-in-out infinite;
                box-shadow: 0 0 12px rgba(243, 156, 18, 0.6);
            }
            @keyframes marsLoaderFill {
                0% { width: 0; }
                100% { width: 100%; }
            }

            /* Кнопка */
            .mars-intro-skip {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 10px 28px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 30px;
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.85rem;
                font-weight: 600;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: inherit;
                animation: marsTitleAppear 1s ease 2s both;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                -webkit-tap-highlight-color: transparent;
            }
            .mars-intro-skip:hover,
            .mars-intro-skip:focus-visible {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
                border-color: rgba(255, 255, 255, 0.4);
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                outline: none;
            }
            .mars-intro-skip:active {
                transform: translateY(0) scale(0.98);
            }

            /* Мобильный */
            @media (max-width: 600px) {
                .mars-intro-title { font-size: 1.9rem; letter-spacing: 8px; }
                .mars-intro-title2 { font-size: 1.4rem; letter-spacing: 4px; }
                .mars-intro-tagline { font-size: 0.85rem; letter-spacing: 2px; margin-bottom: 30px; }
                .mars-intro-planet { width: 100px; height: 100px; }
                .mars-intro-planet-ring { width: 180px; height: 180px; }
                .mars-intro-planet-glow { width: 160px; height: 160px; }
                .mars-intro-logo { height: 130px; margin-bottom: 24px; }
                .mars-intro-loader { width: 180px; }
            }

            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                #mars-intro-overlay,
                #mars-intro-overlay * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                .mars-intro-star,
                .mars-intro-meteor { display: none !important; }
                .mars-intro-loader-bar { width: 100% !important; }
            }

            /* Тёмная тема — уже тёмная, но на всякий */
            body.mars-stars-on #mars-intro-overlay {
                background: radial-gradient(ellipse at center, #0a0a14 0%, #000 100%);
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🌌 Создание интро
    // ============================================================
    function createIntro() {
        var intro = document.createElement('div');
        intro.id = 'mars-intro-overlay';
        intro.setAttribute('role', 'dialog');
        intro.setAttribute('aria-label', 'Добро пожаловать');
        intro.innerHTML =
            '<div class="mars-intro-stars" id="mars-intro-stars"></div>' +
            '<div class="mars-intro-content">' +
            '  <div class="mars-intro-logo">' +
            '    <div class="mars-intro-planet-glow"></div>' +
            '    <div class="mars-intro-planet">' +
            '      <div class="mars-intro-planet-ring"></div>' +
            '    </div>' +
            '  </div>' +
            '  <h1 class="mars-intro-title">Марсианская</h1>' +
            '  <h2 class="mars-intro-title2">Энциклопедия</h2>' +
            '  <p class="mars-intro-tagline">Lān sur · Глина помнит</p>' +
            '  <div class="mars-intro-loader"><div class="mars-intro-loader-bar"></div></div>' +
            '  <button class="mars-intro-skip" type="button" id="mars-intro-skip">Пропустить →</button>' +
            '</div>';
        return intro;
    }

    // ============================================================
    // ✨ Наполнение звёзд
    // ============================================================
    function fillStars(container) {
        var mobile = isMobile();
        var reduced = prefersReducedMotion();

        // Меньше звёзд на мобильном для FPS
        var starsCount = reduced ? 0 : (mobile ? 50 : 120);
        var meteorCount = reduced ? 0 : (mobile ? 2 : 6);

        var frag = document.createDocumentFragment();

        for (var i = 0; i < starsCount; i++) {
            var star = document.createElement('div');
            star.className = 'mars-intro-star';
            star.style.left = (Math.random() * 100).toFixed(2) + '%';
            star.style.top = (Math.random() * 100).toFixed(2) + '%';
            star.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
            star.style.animationDuration = (1.5 + Math.random() * 3).toFixed(2) + 's';
            var size = (1 + Math.random() * 2.5).toFixed(1);
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            frag.appendChild(star);
        }

        for (var j = 0; j < meteorCount; j++) {
            var meteor = document.createElement('div');
            meteor.className = 'mars-intro-meteor';
            meteor.style.left = (Math.random() * 80 + 10).toFixed(1) + '%';
            meteor.style.top = (Math.random() * 40).toFixed(1) + '%';
            meteor.style.animationDelay = (0.3 + Math.random() * 2).toFixed(2) + 's';
            frag.appendChild(meteor);
        }

        container.appendChild(frag);
    }

    // ============================================================
    // 🚀 Запуск
    // ============================================================
    var _closeTimer = null;
    var _escHandler = null;

    function runIntro() {
        if (!shouldShow()) return;
        if (document.getElementById('mars-intro-overlay')) return;

        injectStyles();

        var intro = createIntro();
        document.body.appendChild(intro);

        // Блокируем скролл с сохранением значения
        var prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Звёзды
        var starsContainer = document.getElementById('mars-intro-stars');
        if (starsContainer) fillStars(starsContainer);

        // Кнопка "Пропустить"
        var skipBtn = document.getElementById('mars-intro-skip');
        if (skipBtn) skipBtn.onclick = function(e) {
            e.stopPropagation();
            closeIntro(prevOverflow);
        };

        // Клик по фону
        intro.addEventListener('click', function(e) {
            if (e.target === intro) closeIntro(prevOverflow);
        });

        // Esc
        _escHandler = function(e) {
            if (e.key === 'Escape') {
                closeIntro(prevOverflow);
            }
        };
        document.addEventListener('keydown', _escHandler);

        // Автозакрытие
        _closeTimer = setTimeout(function() {
            closeIntro(prevOverflow);
        }, INTRO_DURATION);

        // Помечаем сразу — если закроют, не покажется заново
        markShown();
    }

    // ============================================================
    // 🛑 Закрытие
    // ============================================================
    function closeIntro(prevOverflow) {
        var intro = document.getElementById('mars-intro-overlay');
        if (!intro) return;

        if (_closeTimer) { clearTimeout(_closeTimer); _closeTimer = null; }
        if (_escHandler) {
            document.removeEventListener('keydown', _escHandler);
            _escHandler = null;
        }

        intro.classList.add('closing');
        document.body.style.overflow = prevOverflow || '';

        // Через 900мс (после анимации) удаляем
        setTimeout(function() {
            if (intro.parentNode) intro.parentNode.removeChild(intro);
        }, 950);
    }

    // ============================================================
    // 🎯 Инициализация
    // ============================================================
    function init() {
        // Не показываем если это iframe или preview
        if (window.self !== window.top) return;
        // Не показываем при предзагрузке
        if (document.visibilityState === 'prerender') return;

        // Используем requestIdleCallback чтобы не блокировать рендер
        var start = function() {
            // Небольшая задержка для стабильности
            setTimeout(runIntro, 300);
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', start);
        } else if ('requestIdleCallback' in window) {
            requestIdleCallback(start, { timeout: 1500 });
        } else {
            start();
        }
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsIntro = {
        show: function(force) {
            if (force) {
                // Сброс флага
                try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
                try { sessionStorage.removeItem(SESSION_KEY); } catch(e) {}
            }
            runIntro();
        },
        close: function() {
            closeIntro();
        },
        wasShown: function() {
            return safeGet(STORAGE_KEY) !== null;
        },
        reset: function() {
            try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
            try { sessionStorage.removeItem(SESSION_KEY); } catch(e) {}
        }
    };

    // Старый API для совместимости
    window.marsIntroClose = function() {
        closeIntro();
    };

    // ============================================================
    // 🚀 Старт
    // ============================================================
    init();

    console.log('✅ intro.js v2 VIP загружен');
})();
