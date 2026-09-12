// easter-eggs.js — пасхалки и эффекты сайта (полная версия)
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
    // 2. ЗВЁЗДНЫЙ ФОН (с тёмной темой)
    // ============================================================
    let starsCanvas = null;
    let starsAnimFrame = null;

    function initStarField() {
        const enabled = localStorage.getItem(STARS_KEY) === 'true';
        if (enabled) createStarField();
        createStarsToggle();
    }

    function createStarField() {
        if (starsCanvas) return;

        // Добавляем класс тёмной темы
        document.body.classList.add('mars-stars-on');
        document.documentElement.classList.add('mars-stars-on');

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
                // Свечение
                if (s.r > 1) {
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(162, 155, 254, ${alpha * 0.15})`;
                    ctx.fill();
                }
                // Звезда
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
        // Убираем тёмную тему
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
    // 4. ЛЕТАЮЩИЙ АСТРОНАВТ
    // ============================================================
    function initAstronaut() {
        if (localStorage.getItem(STARS_KEY) !== 'true') return;

        function spawnAstronaut() {
            if (localStorage.getItem(STARS_KEY) !== 'true') return;

            const astro = document.createElement('div');
            const fromLeft = Math.random() > 0.5;
            const duration = 25 + Math.random() * 15;
            const top = 15 + Math.random() * 60;

            astro.style.cssText = `
                position: fixed;
                top: ${top}%;
                ${fromLeft ? 'left: -80px;' : 'right: -80px;'}
                font-size: 2.5rem;
                z-index: 1;
                pointer-events: none;
                opacity: 0.7;
                filter: drop-shadow(0 0 10px rgba(255,255,255,0.6));
            `;
            astro.textContent = '🚀';
            document.body.appendChild(astro);

            const distance = window.innerWidth + 160;
            let start = null;

            function fly(now) {
                if (!start) start = now;
                const elapsed = now - start;
                const progress = Math.min(elapsed / (duration * 1000), 1);

                const x = fromLeft
                    ? -80 + distance * progress
                    : -80 + distance * (1 - progress);

                const y = Math.sin(progress * Math.PI * 2) * 20;

                astro.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${fromLeft ? '-15deg' : '15deg'})`;

                if (progress < 1) {
                    requestAnimationFrame(fly);
                } else {
                    astro.remove();
                }
            }

            requestAnimationFrame(fly);
        }

        setTimeout(() => {
            spawnAstronaut();
            setInterval(spawnAstronaut, 60000 + Math.random() * 30000);
        }, 30000);

        console.log('🚀 Астронавт готов к запуску');
    }

    // ============================================================
    // 5. МАРСИАНСКИЕ ПОСЛОВИЦЫ (тройной клик)
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
    // 6. СЕЗОННЫЙ ЭФФЕКТ
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
    // 7. ОБЩИЕ АНИМАЦИИ
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

            /* ============================================================
               ТЁМНАЯ ТЕМА ЗВЁЗДНОГО НЕБА
               ============================================================ */
            html.mars-stars-on,
            body.mars-stars-on {
                background: linear-gradient(180deg, #0a0a14 0%, #15152a 50%, #1a1a2e 100%) !important;
                background-attachment: fixed !important;
            }

            body.mars-stars-on .md-content,
            body.mars-stars-on .rst-content,
            body.mars-stars-on .wy-nav-content,
            body.mars-stars-on .md-content__inner,
            body.mars-stars-on .document,
            body.mars-stars-on .section {
                background-color: rgba(15, 15, 30, 0.75) !important;
                color: #d4d4e4 !important;
            }

            body.mars-stars-on .wy-nav-side,
            body.mars-stars-on .md-sidebar,
            body.mars-stars-on .wy-side-nav-search {
                background-color: rgba(10, 10, 25, 0.9) !important;
            }

            body.mars-stars-on .wy-menu-vertical li a,
            body.mars-stars-on .md-nav__link,
            body.mars-stars-on .md-nav__title {
                color: #c4c4d4 !important;
            }

            body.mars-stars-on .wy-menu-vertical li a:hover,
            body.mars-stars-on .md-nav__link:hover {
                color: #A29BFE !important;
                background-color: rgba(108, 99, 255, 0.15) !important;
            }

            body.mars-stars-on .wy-menu-vertical li.current > a,
            body.mars-stars-on .md-nav__link--active {
                color: #A29BFE !important;
                background-color: rgba(108, 99, 255, 0.2) !important;
            }

            body.mars-stars-on .md-header,
            body.mars-stars-on .wy-nav-top {
                background-color: rgba(10, 10, 25, 0.9) !important;
                border-bottom: 1px solid rgba(108, 99, 255, 0.3) !important;
            }

            body.mars-stars-on h1,
            body.mars-stars-on h2,
            body.mars-stars-on h3,
            body.mars-stars-on h4,
            body.mars-stars-on h5,
            body.mars-stars-on h6 {
                color: #f0f0ff !important;
            }

            body.mars-stars-on p,
            body.mars-stars-on li,
            body.mars-stars-on span,
            body.mars-stars-on td,
            body.mars-stars-on th,
            body.mars-stars-on div {
                color: #d4d4e4 !important;
            }

            body.mars-stars-on a {
                color: #A29BFE !important;
            }

            body.mars-stars-on a:hover {
                color: #6C63FF !important;
            }

            body.mars-stars-on table {
                background-color: rgba(20, 20, 40, 0.6) !important;
            }

            body.mars-stars-on th {
                background-color: rgba(108, 99, 255, 0.2) !important;
                color: #f0f0ff !important;
            }

            body.mars-stars-on td {
                border-color: rgba(108, 99, 255, 0.15) !important;
            }

            body.mars-stars-on code,
            body.mars-stars-on pre {
                background-color: rgba(20, 20, 40, 0.8) !important;
                color: #A29BFE !important;
                border: 1px solid rgba(108, 99, 255, 0.2) !important;
            }

            body.mars-stars-on .admonition {
                background-color: rgba(20, 20, 40, 0.6) !important;
                border-color: rgba(108, 99, 255, 0.3) !important;
            }

            body.mars-stars-on .pf-card,
            body.mars-stars-on .pf-quick-card,
            body.mars-stars-on .pf-ach,
            body.mars-stars-on .pf-note,
            body.mars-stars-on .pf-tabs,
            body.mars-stars-on .pf-note-form,
            body.mars-stars-on .pf-stat,
            body.mars-stars-on .pf-day,
            body.mars-stars-on .pf-history-item {
                background: rgba(20, 20, 40, 0.85) !important;
                border-color: rgba(108, 99, 255, 0.3) !important;
            }

            body.mars-stars-on .pf-card-title,
            body.mars-stars-on .pf-quick-title,
            body.mars-stars-on .pf-ach-name,
            body.mars-stars-on .pf-note-title {
                color: #e0e0e0 !important;
            }

            body.mars-stars-on .pf-tab {
                color: #aaa !important;
            }

            body.mars-stars-on input,
            body.mars-stars-on textarea,
            body.mars-stars-on select {
                background-color: rgba(20, 20, 40, 0.6) !important;
                color: #e0e0e0 !important;
                border-color: rgba(108, 99, 255, 0.3) !important;
            }

            body.mars-stars-on input::placeholder,
            body.mars-stars-on textarea::placeholder {
                color: #666688 !important;
            }

            body,
            .md-content,
            .wy-nav-content,
            .md-header,
            .wy-nav-side {
                transition: background-color 0.5s ease, color 0.5s ease;
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
        initStarField();
        initEasterEgg();
        initAstronaut();
        initProverbs();
        initSeasonalEffect();

        console.log('%c🎬 Easter eggs готовы!', 'color: #6C63FF; font-size: 14px; font-weight: bold;');
        console.log('%c☄️  Набери "LANSUR" → секретная страница', 'color: #f39c12;');
        console.log('%c🌟  Кнопка ⭐ в углу → звёздное небо', 'color: #A29BFE;');
        console.log('%c💬  Тройной клик по пустому месту → пословица', 'color: #27ae60;');
        console.log('%c🚀  Астронавт прилетит через 30 секунд (если звёзды включены)', 'color: #e74c3c;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
