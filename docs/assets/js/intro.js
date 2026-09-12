// intro.js — кинематографичное интро при первом входе
(function() {
    'use strict';

    // ============================================================
    // НАСТРОЙКИ
    // ============================================================
    const SHOW_EVERY_DAYS = 7;           // Показывать раз в 7 дней
    const INTRO_DURATION = 5500;         // Общая длительность (мс)
    const STORAGE_KEY = 'mars_intro_shown';

    // ============================================================
    // Проверка: показывать ли интро
    // ============================================================
    function shouldShowIntro() {
        try {
            const lastShown = localStorage.getItem(STORAGE_KEY);
            if (!lastShown) return true;

            const lastDate = new Date(lastShown);
            const now = new Date();
            const diffDays = (now - lastDate) / (1000 * 60 * 60 * 24);

            return diffDays >= SHOW_EVERY_DAYS;
        } catch (e) {
            return false;
        }
    }

    function markShown() {
        try {
            localStorage.setItem(STORAGE_KEY, new Date().toISOString());
        } catch (e) {}
    }

    // ============================================================
    // Создание интро
    // ============================================================
    function createIntro() {
        const intro = document.createElement('div');
        intro.id = 'mars-intro-overlay';
        intro.innerHTML = `
            <div class="mars-intro-stars"></div>
            <div class="mars-intro-content">
                <div class="mars-intro-logo">
                    <div class="mars-intro-planet">
                        <div class="mars-intro-planet-glow"></div>
                        <div class="mars-intro-planet-surface"></div>
                        <div class="mars-intro-planet-ring"></div>
                    </div>
                </div>
                <h1 class="mars-intro-title">Марсианская</h1>
                <h2 class="mars-intro-title2">Энциклопедия</h2>
                <p class="mars-intro-tagline">Lān sur · Глина помнит</p>
                <div class="mars-intro-loader">
                    <div class="mars-intro-loader-bar"></div>
                </div>
                <button class="mars-intro-skip" onclick="window.marsIntroClose()">
                    Пропустить →
                </button>
            </div>
        `;
        return intro;
    }

    // ============================================================
    // Запуск
    // ============================================================
    function runIntro() {
        if (!shouldShowIntro()) return;
        if (document.getElementById('mars-intro-overlay')) return;

        // Создаём overlay
        const intro = createIntro();
        document.body.appendChild(intro);
        document.body.style.overflow = 'hidden';

        // Генерируем звёзды
        const starsContainer = intro.querySelector('.mars-intro-stars');
        const starsCount = 120;
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'mars-intro-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (1.5 + Math.random() * 3) + 's';
            const size = 1 + Math.random() * 2.5;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            starsContainer.appendChild(star);
        }

        // Генерируем падающие звёзды
        for (let i = 0; i < 6; i++) {
            const meteor = document.createElement('div');
            meteor.className = 'mars-intro-meteor';
            meteor.style.left = Math.random() * 80 + 10 + '%';
            meteor.style.top = Math.random() * 40 + '%';
            meteor.style.animationDelay = (0.3 + Math.random() * 2) + 's';
            starsContainer.appendChild(meteor);
        }

        // Автозакрытие
        const closeTimer = setTimeout(() => {
            window.marsIntroClose();
        }, INTRO_DURATION);

        // Клик по фону — закрыть
        intro.addEventListener('click', (e) => {
            if (e.target === intro) {
                clearTimeout(closeTimer);
                window.marsIntroClose();
            }
        });

        // Esc — закрыть
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                clearTimeout(closeTimer);
                window.marsIntroClose();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Помечаем как показанное
        markShown();
    }

    // ============================================================
    // Закрытие
    // ============================================================
    window.marsIntroClose = function() {
        const intro = document.getElementById('mars-intro-overlay');
        if (!intro) return;

        intro.classList.add('closing');
        document.body.style.overflow = '';

        setTimeout(() => {
            intro.remove();
        }, 900);
    };

    // ============================================================
    // Инициализация
    // ============================================================
    function init() {
        // Ждём загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(runIntro, 300);
            });
        } else {
            setTimeout(runIntro, 300);
        }
    }

    // CSS стили (вставляются один раз)
    if (!document.getElementById('mars-intro-styles')) {
        const style = document.createElement('style');
        style.id = 'mars-intro-styles';
        style.textContent = `
            /* ============================================================
               MARS INTRO — КИНЕМАТОГРАФИЧНОЕ ИНТРО
               ============================================================ */
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
            }

            #mars-intro-overlay.closing {
                opacity: 0;
                transform: scale(1.08);
                pointer-events: none;
            }

            @keyframes marsIntroFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            /* Звёзды */
            .mars-intro-stars {
                position: absolute;
                inset: 0;
                overflow: hidden;
            }

            .mars-intro-star {
                position: absolute;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.8);
                animation: marsStarTwinkle 2s ease-in-out infinite;
                opacity: 0;
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

            /* Логотип-планета */
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
                animation: marsPlanetSpin 20s linear infinite, marsPlanetFloat 4s ease-in-out infinite;
                overflow: hidden;
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

            @keyframes marsPlanetSpin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes marsSurfaceScroll {
                from { transform: translateX(0); }
                to { transform: translateX(-30px); }
            }

            @keyframes marsPlanetFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }

            /* Кольцо */
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
                from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); }
                to { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
            }

            /* Свечение */
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

            /* Кнопка "Пропустить" */
            .mars-intro-skip {
                display: inline-block;
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
            }

            .mars-intro-skip:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
                border-color: rgba(255, 255, 255, 0.4);
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            }

            /* Адаптив */
            @media (max-width: 600px) {
                .mars-intro-title { font-size: 1.9rem; letter-spacing: 8px; }
                .mars-intro-title2 { font-size: 1.4rem; letter-spacing: 4px; }
                .mars-intro-tagline { font-size: 0.85rem; letter-spacing: 2px; }
                .mars-intro-planet { width: 100px; height: 100px; }
                .mars-intro-planet-ring { width: 180px; height: 180px; }
                .mars-intro-planet-glow { width: 160px; height: 160px; }
                .mars-intro-logo { height: 130px; margin-bottom: 24px; }
                .mars-intro-loader { width: 180px; }
            }
        `;
        document.head.appendChild(style);
    }

    // Запуск
    init();
})();
