// easter-eggs.js — пасхалки и эффекты сайта
(function() {
    'use strict';

    const STORAGE_KEY = 'mars_secret_unlocked';
    const STARS_KEY = 'mars_stars_enabled';

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
    // 2. ЗВЁЗДНЫЙ ФОН
    // ============================================================
    function initStarField() {
        const enabled = localStorage.getItem(STARS_KEY) === 'true';
        if (enabled) createStarField();
        // Кнопка создаётся всегда
        createStarsToggle();
    }

    let starsCanvas = null;
    let starsAnimFrame = null;

    function createStarField() {
        if (starsCanvas) return;

        starsCanvas = document.createElement('canvas');
        starsCanvas.id = 'mars-stars-canvas';
        starsCanvas.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.9;
            transition: opacity 0.5s;
        `;
        document.body.insertBefore(starsCanvas, document.body.firstChild);

        const ctx = starsCanvas.getContext('2d');
        let stars = [];
        let shootingStars = [];

        function resize() {
            starsCanvas.width = window.innerWidth;
            starsCanvas.height = window.innerHeight;
            stars = [];
            const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * starsCanvas.width,
                    y: Math.random() * starsCanvas.height,
                    r: Math.random() * 1.5 + 0.3,
                    alpha: Math.random() * 0.6 + 0.4,
                    speed: Math.random() * 0.02 + 0.005,
                    twinkle: Math.random() * Math.PI * 2
                });
            }
        }

        function spawnShootingStar() {
            shootingStars.push({
                x: Math.random() * starsCanvas.width * 0.8,
                y: -50,
                len: 80 + Math.random() * 100,
                speed: 6 + Math.random() * 8,
                angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
                life: 1
            });
        }

        function draw() {
            if (!starsCanvas) return;
            ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

            // Обычные звёзды
            stars.forEach(s => {
                s.twinkle += s.speed;
                const alpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            });

            // Падающие звёзды
            shootingStars = shootingStars.filter(ss => ss.life > 0);
            shootingStars.forEach(ss => {
                ss.x += Math.cos(ss.angle) * ss.speed;
                ss.y += Math.sin(ss.angle) * ss.speed;
                ss.life -= 0.01;

                const tailX = ss.x - Math.cos(ss.angle) * ss.len;
                const tailY = ss.y - Math.sin(ss.angle) * ss.len;

                const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                grad.addColorStop(1, `rgba(255, 255, 200, ${ss.life})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(ss.x, ss.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 200, ${ss.life})`;
                ctx.fill();
            });

            starsAnimFrame = requestAnimationFrame(draw);
        }

        function loopShootingStars() {
            if (!starsCanvas) return;
            setTimeout(() => {
                if (starsCanvas) {
                    spawnShootingStar();
                    loopShootingStars();
                }
            }, 3000 + Math.random() * 5000);
        }

        resize();
        window.addEventListener('resize', resize);
        draw();
        loopShootingStars();
    }

    function removeStarField() {
        if (starsAnimFrame) {
            cancelAnimationFrame(starsAnimFrame);
            starsAnimFrame = null;
        }
        if (starsCanvas) {
            starsCanvas.style.opacity = '0';
            const canvas = starsCanvas;
            setTimeout(() => {
                if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
            }, 500);
            starsCanvas = null;
        }
    }

    function createStarsToggle() {
        if (document.getElementById('mars-stars-toggle')) return;

        const btn = document.createElement('button');
        btn.id = 'mars-stars-toggle';
        const enabled = localStorage.getItem(STARS_KEY) === 'true';
        btn.innerHTML = enabled ? '🌟' : '⭐';
        btn.title = enabled ? 'Выключить звёздное небо' : 'Включить звёздное небо';
        btn.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid #6C63FF;
            color: #fff;
            font-size: 1.3rem;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 8px 24px rgba(108,99,255,0.4);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) translateY(-3px)';
            btn.style.boxShadow = '0 12px 32px rgba(108,99,255,0.6)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) translateY(0)';
            btn.style.boxShadow = '0 8px 24px rgba(108,99,255,0.4)';
        });

        btn.addEventListener('click', () => {
            const currentlyEnabled = localStorage.getItem(STARS_KEY) === 'true';
            if (currentlyEnabled) {
                localStorage.setItem(STARS_KEY, 'false');
                removeStarField();
                btn.innerHTML = '⭐';
                btn.title = 'Включить звёздное небо';
            } else {
                localStorage.setItem(STARS_KEY, 'true');
                createStarField();
                btn.innerHTML = '🌟';
                btn.title = 'Выключить звёздное небо';
            }
        });

        document.body.appendChild(btn);
    }

    // ============================================================
    // 3. ПАСХАЛКА "LANSUR"
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

        // Разблокируем секретную страницу
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

    function addMeteorAnimation() {
        if (document.getElementById('meteor-anim-style')) return;
        const style = document.createElement('style');
        style.id = 'meteor-anim-style';
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
        `;
        document.head.appendChild(style);
    }

    function showEasterText() {
        const text = document.createElement('div');
        text.style.cssText = `
            position: fixed; top: 50%; left: 50%;
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
            position: fixed; top: 60%; left: 50%;
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

        const hint = document.createElement('div');
        hint.style.cssText = `
            position: fixed; top: 70%; left: 50%;
            transform: translate(-50%, -50%);
            font-size: clamp(0.75rem, 2.5vw, 0.95rem);
            font-weight: 600;
            color: #f39c12;
            text-shadow: 0 0 15px rgba(243,156,18,0.9);
            letter-spacing: 2px;
            z-index: 99999;
            pointer-events: none;
            animation: easterTextIn 5s ease-out 0.6s forwards;
            opacity: 0;
        `;
        hint.innerHTML = '✨ Открыта страница: <a href="/secret/" style="color: #fff; text-decoration: underline; pointer-events: auto; cursor: pointer;">/secret/</a>';
        document.body.appendChild(hint);

        setTimeout(() => {
            text.remove();
            subtitle.remove();
            hint.remove();
        }, 5500);
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
    // ЗАПУСК
    // ============================================================
    function init() {
        addMeteorAnimation();
        initMarsCursor();
        initStarField();
        initEasterEgg();
        console.log('🎬 Easter eggs готовы. Набери "LANSUR" для сюрприза!');
        console.log('🌟 Звёздный фон:', localStorage.getItem(STARS_KEY) === 'true' ? 'включён' : 'выключен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
