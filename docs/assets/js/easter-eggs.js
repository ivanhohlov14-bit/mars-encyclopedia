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
    let starsCanvas = null;
    let starsAnimFrame = null;

    function initStarField() {
        const enabled = localStorage.getItem(STARS_KEY) === 'true';
        if (enabled) createStarField(false);
        createStarsToggle();
    }

    function createStarField(playSound) {
        if (starsCanvas) return;

        document.body.classList.add('mars-stars-on');
        document.documentElement.classList.add('mars-stars-on');

        if (playSound === true) playStarsSound();

        starsCanvas = document.createElement('canvas');
        starsCanvas.id = 'mars-stars-canvas';
        starsCanvas.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 1;
        `;
        document.body.appendChild(starsCanvas);

        const ctx = starsCanvas.getContext('2d');
        let stars = [];
        let shootingStars = [];

        function resize() {
            starsCanvas.width = window.innerWidth;
            starsCanvas.height = window.innerHeight;
            stars = [];
            const count = Math.floor((window.innerWidth * window.innerHeight) / 6000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * starsCanvas.width,
                    y: Math.random() * starsCanvas.height,
                    r: Math.random() * 1.8 + 0.4,
                    alpha: Math.random() * 0.7 + 0.3,
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

            stars.forEach(s => {
                s.twinkle += s.speed;
                const alpha = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
                if (s.r > 1) {
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(162, 155, 254, ${alpha * 0.15})`;
                    ctx.fill();
                }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            });

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

        console.log('🌟 Звёздное небо включено');
    }

    function removeStarField() {
        document.body.classList.remove('mars-stars-on');
        document.documentElement.classList.remove('mars-stars-on');

        if (starsAnimFrame) {
            cancelAnimationFrame(starsAnimFrame);
            starsAnimFrame = null;
        }
        if (starsCanvas) {
            const canvas = starsCanvas;
            canvas.style.opacity = '0';
            setTimeout(() => {
                if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
            }, 300);
            starsCanvas = null;
        }
        console.log('⭐ Звёздное небо выключено');
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
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid #6C63FF;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 99999;
            box-shadow: 0 8px 24px rgba(108,99,255,0.5);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) translateY(-3px)';
            btn.style.boxShadow = '0 12px 32px rgba(108,99,255,0.7)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) translateY(0)';
            btn.style.boxShadow = '0 8px 24px rgba(108,99,255,0.5)';
        });

        btn.addEventListener('click', () => {
            const currentlyEnabled = localStorage.getItem(STARS_KEY) === 'true';
            if (currentlyEnabled) {
                localStorage.setItem(STARS_KEY, 'false');
                removeStarField();
                playStarsOffSound();
                btn.innerHTML = '⭐';
                btn.title = 'Включить звёздное небо';
            } else {
                localStorage.setItem(STARS_KEY, 'true');
                createStarField(true);
                btn.innerHTML = '🌟';
                btn.title = 'Выключить звёздное небо';
            }
        });

        document.body.appendChild(btn);
    }

    // ============================================================
    // 🎵 КОСМИЧЕСКИЕ ЗВУКИ
    // ============================================================
    function playStarsSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;

            // Восходящее арпеджио — «звёзды зажигаются»
            const notes = [220, 277.18, 329.63, 440, 554.37];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;

                const t = now + i * 0.13;
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t);
                osc.stop(t + 1.6);
            });

            // Мерцание — высокий тихий слой
            const shimmer = ctx.createOscillator();
            const shimmerGain = ctx.createGain();
            shimmer.type = 'triangle';
            shimmer.frequency.setValueAtTime(880, now);
            shimmer.frequency.linearRampToValueAtTime(1760, now + 1.5);
            shimmerGain.gain.setValueAtTime(0, now);
            shimmerGain.gain.linearRampToValueAtTime(0.045, now + 0.3);
            shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 2);
            shimmer.connect(shimmerGain);
            shimmerGain.connect(ctx.destination);
            shimmer.start(now);
            shimmer.stop(now + 2);
        } catch(e) {}
    }

    function playStarsOffSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(554.37, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.9);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.9);
        } catch(e) {}
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
               
