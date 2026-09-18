// ============================================================
// vip-loader.js — крутая анимация загрузки
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 🔧 НАСТРОЙКА — выбери тип загрузчика
    // ============================================================
    var LOADER_TYPE = 'planet'; // 'planet' | 'rocket' | 'tablet' | 'dust'
    var SHOW_TIME = 800;        // минимум миллисекунд показа (чтобы не мигало)
    // ============================================================

    var startTime = Date.now();
    var loader = null;

    // ============================================================
    // СТИЛИ
    // ============================================================
    function injectStyles() {
        if (document.getElementById('vip-loader-styles')) return;
        var style = document.createElement('style');
        style.id = 'vip-loader-styles';
        style.textContent = `
            .vip-loader-overlay {
                position: fixed;
                inset: 0;
                z-index: 999999;
                background: radial-gradient(circle at 30% 30%, #1a1a2e 0%, #0f0f1e 60%, #2a1030 100%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 32px;
                transition: opacity 0.5s ease, visibility 0.5s ease;
                opacity: 1;
                visibility: visible;
            }
            .vip-loader-overlay.hide {
                opacity: 0;
                visibility: hidden;
            }
            .vip-loader-text {
                font-family: 'Georgia', serif;
                font-size: 0.85rem;
                letter-spacing: 6px;
                color: rgba(162, 155, 254, 0.8);
                text-transform: uppercase;
                animation: vipPulse 1.5s ease-in-out infinite;
            }
            @keyframes vipPulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }

            /* ============================================
               🪐 ПЛАНЕТА МАРС
               ============================================ */
            .vip-planet-wrap {
                position: relative;
                width: 160px;
                height: 160px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .vip-planet {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: radial-gradient(circle at 32% 32%, #e74c3c 0%, #b83a2a 35%, #7a1f10 70%, #4a0a0a 100%);
                box-shadow: 
                    0 0 60px rgba(231, 76, 60, 0.6),
                    0 0 120px rgba(231, 76, 60, 0.3),
                    inset -20px -20px 50px rgba(0, 0, 0, 0.7);
                animation: vipPlanetSpin 6s linear infinite;
                position: relative;
                overflow: hidden;
            }
            .vip-planet::before {
                content: '';
                position: absolute;
                inset: 0;
                background: 
                    radial-gradient(circle at 20% 70%, rgba(255,180,120,0.35), transparent 30%),
                    radial-gradient(circle at 70% 30%, rgba(255,140,90,0.25), transparent 40%),
                    radial-gradient(circle at 40% 50%, rgba(0,0,0,0.4), transparent 25%);
                border-radius: 50%;
            }
            .vip-planet::after {
                content: '';
                position: absolute;
                top: -50%; left: 0; right: 0; bottom: 0;
                background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%);
                border-radius: 50%;
            }
            @keyframes vipPlanetSpin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* Луна (Фобос) — вращается вокруг планеты */
            .vip-moon {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #fff, #888);
                box-shadow: 0 0 16px rgba(255,255,255,0.7);
                animation: vipMoonOrbit 3s linear infinite;
            }
            @keyframes vipMoonOrbit {
                from { transform: translate(-50%, -50%) rotate(0deg) translateX(85px) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg) translateX(85px) rotate(-360deg); }
            }

            /* Второй спутник — Деймос */
            .vip-moon.vip-moon-2 {
                width: 10px;
                height: 10px;
                animation: vipMoonOrbit2 5s linear infinite;
                background: radial-gradient(circle at 30% 30%, #ddd, #666);
                box-shadow: 0 0 12px rgba(200,200,200,0.6);
            }
            @keyframes vipMoonOrbit2 {
                from { transform: translate(-50%, -50%) rotate(180deg) translateX(115px) rotate(-180deg); }
                to { transform: translate(-50%, -50%) rotate(540deg) translateX(115px) rotate(-540deg); }
            }

            /* ============================================
               🚀 РАКЕТА
               ============================================ */
            .vip-rocket-wrap {
                position: relative;
                width: 120px;
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .vip-rocket {
                font-size: 80px;
                animation: vipRocketFloat 1.2s ease-in-out infinite;
                filter: drop-shadow(0 0 24px rgba(231,76,60,0.8));
                transform: rotate(-45deg);
            }
            @keyframes vipRocketFloat {
                0%, 100% { transform: rotate(-45deg) translate(0, 0); }
                50% { transform: rotate(-45deg) translate(8px, -8px); }
            }
            .vip-rocket-flame {
                position: absolute;
                top: 130px;
                left: 50%;
                transform: translateX(-50%);
                width: 20px;
                height: 60px;
                background: linear-gradient(180deg, #fff 0%, #ffcc00 20%, #e74c3c 60%, transparent 100%);
                border-radius: 50% 50% 30% 30%;
                filter: blur(6px);
                animation: vipFlame 0.15s ease-in-out infinite alternate;
            }
            @keyframes vipFlame {
                from { transform: translateX(-50%) scaleY(1) scaleX(1); opacity: 0.9; }
                to { transform: translateX(-50%) scaleY(1.2) scaleX(0.85); opacity: 1; }
            }

            /* ============================================
               📜 ГЛИНЯНАЯ ТАБЛИЧКА
               ============================================ */
            .vip-tablet-wrap {
                position: relative;
                width: 140px;
                height: 140px;
                display: flex;
                align-items: center;
                justify-content: center;
                perspective: 600px;
            }
            .vip-tablet {
                width: 100px;
                height: 100px;
                background: linear-gradient(135deg, #d4a574 0%, #b8854a 50%, #8b6330 100%);
                border-radius: 12px;
                box-shadow: 
                    0 20px 40px rgba(0,0,0,0.5),
                    inset 0 2px 8px rgba(255,255,255,0.3),
                    inset 0 -4px 12px rgba(0,0,0,0.3);
                animation: vipTabletSpin 2.5s ease-in-out infinite;
                position: relative;
                overflow: hidden;
            }
            .vip-tablet::before,
            .vip-tablet::after {
                content: '';
                position: absolute;
                left: 15%;
                right: 15%;
                height: 3px;
                background: rgba(90, 60, 30, 0.5);
                border-radius: 2px;
            }
            .vip-tablet::before {
                top: 25%;
                box-shadow: 
                    0 12px 0 rgba(90,60,30,0.5),
                    0 24px 0 rgba(90,60,30,0.5),
                    0 36px 0 rgba(90,60,30,0.5);
            }
            .vip-tablet::after {
                top: 40%;
                left: 60%;
                right: 20%;
                height: 2px;
                box-shadow: 0 8px 0 rgba(90,60,30,0.5);
            }
            @keyframes vipTabletSpin {
                0%, 100% { transform: rotateY(0deg); }
                50% { transform: rotateY(180deg); }
            }

            /* ============================================
               ✨ ПЫЛЬ (простой пульс)
               ============================================ */
            .vip-dust-wrap {
                display: flex;
                gap: 12px;
                align-items: center;
            }
            .vip-dust-dot {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: radial-gradient(circle, #e74c3c, #8b1a1a);
                box-shadow: 0 0 16px rgba(231,76,60,0.8);
                animation: vipDustBounce 1s ease-in-out infinite;
            }
            .vip-dust-dot:nth-child(2) { animation-delay: 0.15s; background: radial-gradient(circle, #f39c12, #b86f00); }
            .vip-dust-dot:nth-child(3) { animation-delay: 0.3s; background: radial-gradient(circle, #A29BFE, #6C63FF); }
            @keyframes vipDustBounce {
                0%, 100% { transform: translateY(0); opacity: 0.5; }
                50% { transform: translateY(-20px); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // СОЗДАНИЕ HTML ЗАГРУЗЧИКА
    // ============================================================
    function createLoader() {
        var overlay = document.createElement('div');
        overlay.className = 'vip-loader-overlay';
        overlay.id = 'vip-loader';

        var inner = '';

        if (LOADER_TYPE === 'planet') {
            inner = `
                <div class="vip-planet-wrap">
                    <div class="vip-planet"></div>
                    <div class="vip-moon"></div>
                    <div class="vip-moon vip-moon-2"></div>
                </div>
                <div class="vip-loader-text">Загрузка Марса</div>
            `;
        } else if (LOADER_TYPE === 'rocket') {
            inner = `
                <div class="vip-rocket-wrap">
                    <div class="vip-rocket">🚀</div>
                    <div class="vip-rocket-flame"></div>
                </div>
                <div class="vip-loader-text">Полёт к Марсу</div>
            `;
        } else if (LOADER_TYPE === 'tablet') {
            inner = `
                <div class="vip-tablet-wrap">
                    <div class="vip-tablet"></div>
                </div>
                <div class="vip-loader-text">Глина помнит</div>
            `;
        } else {
            inner = `
                <div class="vip-dust-wrap">
                    <div class="vip-dust-dot"></div>
                    <div class="vip-dust-dot"></div>
                    <div class="vip-dust-dot"></div>
                </div>
                <div class="vip-loader-text">Загрузка</div>
            `;
        }

        overlay.innerHTML = inner;
        return overlay;
    }

    // ============================================================
    // ПОКАЗАТЬ / СКРЫТЬ
    // ============================================================
    function showLoader() {
        injectStyles();
        if (document.getElementById('vip-loader')) return;
        loader = createLoader();
        document.body.appendChild(loader);
    }

    function hideLoader() {
        if (!loader) return;

        var elapsed = Date.now() - startTime;
        var wait = Math.max(0, SHOW_TIME - elapsed);

        setTimeout(function() {
            loader.classList.add('hide');
            setTimeout(function() {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                    loader = null;
                }
            }, 500);
        }, wait);
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    showLoader();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoader);
    } else {
        hideLoader();
    }

    window.addEventListener('load', hideLoader);

    // На случай, если что-то долго грузится — скрыть через 3 сек максимум
    setTimeout(hideLoader, 3000);

    console.log('🎬 vip-loader: ' + LOADER_TYPE);
})();
