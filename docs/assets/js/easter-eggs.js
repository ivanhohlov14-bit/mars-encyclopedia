// easter-eggs.js — пасхалки и эффекты сайта
(function() {
    'use strict';

    const STORAGE_KEY = 'mars_secret_unlocked';

    // ============================================================
    // 1. КУРСОР-ПЛАНЕТА МАРС
    // ============================================================
    function initMarsCursor() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        if (isMobile) return;

        const style = document.createElement('style');
        style.textContent = `
            * {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><radialGradient id="mg" cx="35%" cy="35%"><stop offset="0%" stop-color="%23e74c3c"/><stop offset="50%" stop-color="%23c0392b"/><stop offset="100%" stop-color="%237f1d1d"/></radialGradient></defs><circle cx="16" cy="16" r="12" fill="url(%23mg)" stroke="%234a1010" stroke-width="1"/><ellipse cx="11" cy="12" rx="3" ry="2" fill="%23922b1f" opacity="0.6"/><ellipse cx="20" cy="18" rx="4" ry="2.5" fill="%23922b1f" opacity="0.5"/><ellipse cx="14" cy="22" rx="2" ry="1.5" fill="%23922b1f" opacity="0.5"/><circle cx="16" cy="16" r="12" fill="none" stroke="%23f39c12" stroke-width="0.5" opacity="0.5"/></svg>') 16 16, auto !important;
            }
            a, button, .md-nav__link, [role="button"] {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><defs><radialGradient id="mg2" cx="35%" cy="35%"><stop offset="0%" stop-color="%23f39c12"/><stop offset="50%" stop-color="%23e67e22"/><stop offset="100%" stop-color="%23c0392b"/></radialGradient></defs><circle cx="18" cy="18" r="14" fill="url(%23mg2)" stroke="%23a04000" stroke-width="1.5"/><ellipse cx="13" cy="13" rx="3" ry="2" fill="%23d35400" opacity="0.6"/><ellipse cx="22" cy="20" rx="4" ry="2.5" fill="%23d35400" opacity="0.5"/><circle cx="18" cy="18" r="14" fill="none" stroke="%23ffd700" stroke-width="1" opacity="0.7"/></svg>') 18 18, pointer !important;
            }
            input, textarea { cursor: text !important; }
        `;
        document.head.appendChild(style);

        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            const planet = document.createElement('div');
            planet.style.cssText = `
                position: fixed;
                left: ${e.clientX - 20}px;
                top: ${e.clientY - 20}px;
                width: 40px; height: 40px;
                border-radius: 50%;
                background: radial-gradient(circle at 35% 35%, #e74c3c, #c0392b 50%, #7f1d1d 100%);
                box-shadow: 0 0 20px rgba(231,76,60,0.8), 0 0 40px rgba(231,76,60,0.4);
                pointer-events: none;
                z-index: 99999;
                animation: marsClickPop 0.6s ease-out forwards;
            `;
            document.body.appendChild(planet);
            setTimeout(() => planet.remove(), 600);
        });
    }

    // ============================================================
    // 2. ПАСХАЛКА "LANSUR"
    // ============================================================
    function initEasterEgg() {
        let buffer = '';
        const SECRET = 'LANSUR';

        document.addEventListener('keydown', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            buffer += e.key.toUpperCase();
            if (buffer.length > SECRET.length) {
                buffer = buffer.slice(-SECRET.length);
            }

            if (buffer === SECRET) {
                buffer = '';
                triggerMeteorShower();
            }
        });

        // 3 пальца вверх — для мобильных
        let touchStartY = 0;
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length === 3) touchStartY = e.touches[0].clientY;
        });
        document.addEventListener('touchend', function(e) {
            if (e.changedTouches.length === 3 && touchStartY) {
                const endY = e.changedTouches[0].clientY;
                if (touchStartY - endY > 100) triggerMeteorShower();
                touchStartY = 0;
            }
        });
    }

    function triggerMeteorShower() {
        console.log('☄️ Пасхалка активирована! LĀN SUR!');

        localStorage.setItem(STORAGE_KEY, 'true');

        playEasterSound();

        const meteorCount = 40;
        const container = document.createElement('div');
        container.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:99998;overflow:hidden;`;
        document.body.appendChild(container);

        for (let i = 0; i < meteorCount; i++) {
            setTimeout(() => createMeteor(container), i * 80);
        }

        showEasterText();
        setTimeout(() => container.remove(), 8000);
    }

    function createMeteor(container) {
        const meteor = document.createElement('div');
        const startX = Math.random() * window.innerWidth * 1.2 - window.innerWidth * 0.1;
        const startY = -100 - Math.random() * 200;
        const duration = 1.5 + Math.random() * 1.5;
        const size = 3 + Math.random() * 4;

        meteor.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: ${startY}px;
            width: ${size}px;
            height: ${size}px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 0 ${size * 3}px ${size}px rgba(255,255,255,0.9),
                        0 0 ${size * 6}px ${size * 2}px rgba(255,200,100,0.6);
            animation: meteorFall ${duration}s linear forwards;
        `;

        const tail = document.createElement('div');
        tail.style.cssText = `
            position: absolute;
            top: 50%; right: 0;
            width: ${50 + Math.random() * 80}px;
            height: 2px;
            background: linear-gradient(270deg, rgba(255,255,255,0.9), rgba(255,200,100,0.6), transparent);
            transform: translateY(-50%);
            border-radius: 2px;
        `;
        meteor.appendChild(tail);
        container.appendChild(meteor);
    }

    function showEasterText() {
        const text = document.createElement('div');
        text.style.cssText = `
            position: fixed; top: 40%; left: 50%;
            transform: translate(-50%, -50%);
            font-size: clamp(2rem, 8vw, 5rem);
            font-weight: 900;
            color: #fff;
            text-shadow: 0 0 20px #6C63FF, 0 0 40px #6C63FF, 0 0 60px #e74c3c, 0 4px 8px rgba(0,0,0,0.5);
            letter-spacing: 8px;
            z-index: 99999;
            pointer-events: none;
            animation: easterTextIn 4s ease-out forwards;
            font-family: 'Georgia', serif;
            white-space: nowrap;
        `;
        text.textContent = 'LĀN SUR';
        document.body.appendChild(text);

        const subtitle = document.createElement('div');
        subtitle.style.cssText = `
            position: fixed; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            font-size: clamp(0.9rem, 3vw, 1.4rem);
            font-weight: 600;
            color: #A29BFE;
            text-shadow: 0 0 20px rgba(162,155,254,0.8);
            letter-spacing: 4px;
            z-index: 99999;
            pointer-events: none;
            animation: easterTextIn 4s ease-out 0.3s forwards;
            opacity: 0;
        `;
        subtitle.textContent = '— ГЛИНА ПОМНИТ —';
        document.body.appendChild(subtitle);

        setTimeout(() => {
            text.remove();
            subtitle.remove();
        }, 4500);

        // ============================================================
        // КЛИКАБЕЛЬНАЯ ПЛАШКА СО ССЫЛКОЙ (20 секунд)
        // ============================================================
        const unlock = document.createElement('div');
        unlock.id = 'secret-unlock-banner';
        unlock.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999999;
            background: linear-gradient(135deg, #6C63FF, #A29BFE);
            color: #fff;
            padding: 16px 28px;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 800;
            letter-spacing: 1px;
            box-shadow: 0 20px 60px rgba(108,99,255,0.6), 0 0 40px rgba(108,99,255,0.4);
            animation: secretBannerIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            gap: 14px;
            cursor: pointer;
            text-decoration: none;
            user-select: none;
            max-width: 90vw;
        `;
        unlock.innerHTML = `
            <span style="font-size: 1.6rem; animation: secFloat 2s ease-in-out infinite;">🗝️</span>
            <span>Открыта секретная страница!</span>
            <span style="background: rgba(255,255,255,0.25); padding: 6px 14px; border-radius: 30px; font-size: 0.85rem; white-space: nowrap;">Перейти →</span>
        `;
        unlock.onclick = function() {
            window.location.href = '/secret/';
        };

        document.body.appendChild(unlock);

        setTimeout(() => {
            if (unlock.parentNode) {
                unlock.style.transition = 'all 0.5s';
                unlock.style.opacity = '0';
                unlock.style.transform = 'translate(-50%, -30px)';
                setTimeout(() => unlock.remove(), 500);
            }
        }, 20000);
    }

    function playEasterSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [261.63, 329.63, 392.00, 523.25];
            notes.forEach((freq, i) => {
                setTimeout(() => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.8);
                }, i * 120);
            });
        } catch(e) {}
    }

    // ============================================================
    // 3. МАРСИАНСКИЕ ПОСЛОВИЦЫ (тройной клик)
    // ============================================================
    const PROVERBS = [
        { martian: 'Lān sur.', russian: 'Глина помнит.' },
        { martian: 'Ākha kōl lān.', russian: 'Вода помнит землю.' },
        { martian: 'Dzen thal, mar mōr ān.', russian: 'Смотри на звёзды — жизнь не умирает.' },
        { martian: 'Khō mōr, dzen mōr, lān ān mōr.', russian: 'Огонь умирает, звёзды умирают, память — нет.' },
        { martian: 'Marzān dzen thal.', russian: 'Марсиане смотрят на звёзды.' },
        { martian: 'Ariya mar lān.', russian: 'Помни жизнь избранных.' },
        { martian: 'Kōl ghar, dzen suf.', russian: 'Земля — камень, звезда — велика.' },
        { martian: 'Xalmar dzen thal nu.', russian: 'Древние смотрели на звёзды.' },
        { martian: 'Tsen mar mōr, lān mar.', russian: 'Когда жизнь умирает, память живёт.' },
        { martian: 'Rōg okh thal.', russian: 'Король смотрит на свой дом.' }
    ];

    function initProverbs() {
        let clickCount = 0;
        let clickTimer = null;

        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' ||
                e.target.closest('a') || e.target.closest('button') ||
                e.target.closest('nav') || e.target.closest('header')) {
                return;
            }

            clickCount++;

            if (clickTimer) clearTimeout(clickTimer);

            if (clickCount >= 3) {
                clickCount = 0;
                showProverb();
            } else {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 600);
            }
        });
    }

    function showProverb() {
        const proverb = PROVERBS[Math.floor(Math.random() * PROVERBS.length)];

        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: #fff;
            padding: 32px 40px;
            border-radius: 20px;
            border: 2px solid #6C63FF;
            box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(108,99,255,0.4);
            z-index: 999999;
            text-align: center;
            max-width: 90vw;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
        `;
        popup.innerHTML = `
            <div style="font-size: 0.8rem; color: #A29BFE; letter-spacing: 3px; margin-bottom: 12px;">МАРСИАНСКАЯ МУДРОСТЬ</div>
            <div style="font-size: 1.5rem; font-weight: 900; font-family: 'Georgia', serif; letter-spacing: 2px; color: #fff; margin-bottom: 12px;">${proverb.martian}</div>
            <div style="font-size: 0.95rem; color: #A29BFE; font-style: italic;">${proverb.russian}</div>
        `;
        document.body.appendChild(popup);

        requestAnimationFrame(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        setTimeout(() => {
            popup.style.opacity = '0';
            popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => popup.remove(), 400);
        }, 3500);
    }

    // ============================================================
    // 4. СЕЗОННЫЙ ЭФФЕКТ
    // ============================================================
    function initSeasonalEffect() {
        const month = new Date().getMonth();
        let emoji, count;

        if (month === 11 || month === 0 || month === 1) {
            emoji = '❄️';
            count = 25;
        } else if (month >= 2 && month <= 4) {
            emoji = '🌸';
            count = 20;
        } else if (month >= 5 && month <= 7) {
            emoji = '☀️';
            count = 15;
        } else {
            emoji = '🍂';
            count = 25;
        }

        const todayKey = 'seasonal_' + new Date().toDateString();
        if (sessionStorage.getItem(todayKey)) return;

        setTimeout(() => {
            if (sessionStorage.getItem(todayKey)) return;
            sessionStorage.setItem(todayKey, 'true');
            showSeasonalEffect(emoji, count);
        }, 3000);
    }

    function showSeasonalEffect(emoji, count) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9998;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const startX = Math.random() * window.innerWidth;
                const duration = 5 + Math.random() * 5;
                const size = 14 + Math.random() * 10;
                const sway = Math.random() * 100 - 50;
                const rotSpeed = Math.random() * 360 + 180;

                particle.style.cssText = `
                    position: absolute;
                    top: -50px;
                    left: ${startX}px;
                    font-size: ${size}px;
                    opacity: 0.85;
                    animation: seasonalFall ${duration}s linear forwards;
                    --sway: ${sway}px;
                    --rot: ${rotSpeed}deg;
                `;
                particle.textContent = emoji;

                container.appendChild(particle);

                setTimeout(() => particle.remove(), duration * 1000 + 100);
            }, i * 200);
        }

        setTimeout(() => container.remove(), 12000);
    }

    // ============================================================
    // 5. АНИМАЦИИ
    // ============================================================
    function addAnimations() {
        if (document.getElementById('mars-anim-style')) return;
        const style = document.createElement('style');
        style.id = 'mars-anim-style';
        style.textContent = `
            @keyframes meteorFall {
                0% { transform: translate(0, 0) rotate(45deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translate(${window.innerWidth * 0.6}px, ${window.innerHeight * 1.1}px) rotate(45deg); opacity: 0; }
            }
            @keyframes marsClickPop {
                0% { transform: scale(0.5); opacity: 1; }
                100% { transform: scale(3); opacity: 0; }
            }
            @keyframes easterTextIn {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                30% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.3); }
            }
            @keyframes secretBannerIn {
                from { opacity: 0; transform: translate(-50%, -30px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
            @keyframes secFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            @keyframes seasonalFall {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
                10% { opacity: 0.9; }
                100% { transform: translate(var(--sway), ${window.innerHeight + 100}px) rotate(var(--rot)); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        addAnimations();
        initMarsCursor();
        initEasterEgg();
        initProverbs();
        initSeasonalEffect();

        // Убираем старые следы звёзд (если остались)
        try {
            localStorage.removeItem('mars_stars_enabled');
            document.body.classList.remove('mars-stars-on');
            document.documentElement.classList.remove('mars-stars-on');
            const oldCanvas = document.getElementById('mars-stars-canvas');
            if (oldCanvas) oldCanvas.remove();
            const oldBtn = document.getElementById('mars-stars-toggle');
            if (oldBtn) oldBtn.remove();
        } catch(e) {}

        console.log('%c🎬 Easter eggs готовы!', 'color: #6C63FF; font-size: 14px; font-weight: bold;');
        console.log('%c☄️  Набери "LANSUR" → секретная страница', 'color: #f39c12;');
        console.log('%c💬  Тройной клик по пустому месту → пословица', 'color: #27ae60;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
