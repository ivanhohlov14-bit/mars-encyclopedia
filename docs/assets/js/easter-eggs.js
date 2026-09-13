// easter-eggs.js — пасхалки и эффекты сайта
(function() {
    'use strict';

    const STORAGE_KEY = 'mars_secret_unlocked';
    const STARS_KEY = 'mars_stars_enabled';

    const IS_MOBILE =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    function getBasePath() {
        return window.location.pathname.replace(/\/[^\/]*\/?$/, '') || '';
    }

    function vibrate(pattern) {
        try { if (navigator.vibrate) navigator.vibrate(pattern); } catch(e) {}
    }

    // ============================================================
    // 🔊 АУДИО
    // ============================================================
    let audioCtx = null;
    function getAudioCtx() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            } catch(e) { return null; }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(function(){});
        }
        return audioCtx;
    }

    function unlockAudioOnFirstTouch() {
        const unlock = function() {
            const ctx = getAudioCtx();
            if (ctx && ctx.state === 'suspended') ctx.resume();
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('click', unlock);
        };
        document.addEventListener('touchstart', unlock, { passive: true });
        document.addEventListener('click', unlock);
    }

    // ============================================================
    // 1. КУРСОР-ПЛАНЕТА МАРС (только ПК)
    // ============================================================
    function initMarsCursor() {
        if (IS_MOBILE) return;

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
            planet.style.cssText = 'position:fixed;left:' + (e.clientX - 20) + 'px;top:' + (e.clientY - 20) + 'px;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 35% 35%, #e74c3c, #c0392b 50%, #7f1d1d 100%);box-shadow:0 0 20px rgba(231,76,60,0.8), 0 0 40px rgba(231,76,60,0.4);pointer-events:none;z-index:99999;animation:marsClickPop 0.6s ease-out forwards;';
            document.body.appendChild(planet);
            setTimeout(function() { planet.remove(); }, 600);
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
        starsCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:1;';
        document.body.appendChild(starsCanvas);

        const ctx = starsCanvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.5 : 2);
        let stars = [];
        let shootingStars = [];

        function resize() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            starsCanvas.width = w * dpr;
            starsCanvas.height = h * dpr;
            starsCanvas.style.width = w + 'px';
            starsCanvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            stars = [];
            const divisor = IS_MOBILE ? 15000 : 6000;
            const count = Math.floor((w * h) / divisor);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 1.8 + 0.4,
                    alpha: Math.random() * 0.7 + 0.3,
                    speed: Math.random() * 0.02 + 0.005,
                    twinkle: Math.random() * Math.PI * 2
                });
            }
        }

        function spawnShootingStar() {
            shootingStars.push({
                x: Math.random() * window.innerWidth * 0.8,
                y: -50,
                len: 80 + Math.random() * 100,
                speed: 6 + Math.random() * 8,
                angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
                life: 1
            });
        }

        function draw() {
            if (!starsCanvas) return;
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            stars.forEach(function(s) {
                s.twinkle += s.speed;
                const alpha = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
                if (s.r > 1) {
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(162, 155, 254, ' + (alpha * 0.15) + ')';
                    ctx.fill();
                }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
                ctx.fill();
            });

            shootingStars = shootingStars.filter(function(ss) { return ss.life > 0; });
            shootingStars.forEach(function(ss) {
                ss.x += Math.cos(ss.angle) * ss.speed;
                ss.y += Math.sin(ss.angle) * ss.speed;
                ss.life -= 0.01;

                const tailX = ss.x - Math.cos(ss.angle) * ss.len;
                const tailY = ss.y - Math.sin(ss.angle) * ss.len;

                const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                grad.addColorStop(1, 'rgba(255, 255, 200, ' + ss.life + ')');

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(ss.x, ss.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 200, ' + ss.life + ')';
                ctx.fill();
            });

            starsAnimFrame = requestAnimationFrame(draw);
        }

        function loopShootingStars() {
            if (!starsCanvas) return;
            setTimeout(function() {
                if (starsCanvas) {
                    spawnShootingStar();
                    loopShootingStars();
                }
            }, 4000 + Math.random() * 6000);
        }

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('orientationchange', function() { setTimeout(resize, 200); });
        draw();
        loopShootingStars();
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
            setTimeout(function() {
                if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
            }, 300);
            starsCanvas = null;
        }
    }

    function createStarsToggle() {
        if (document.getElementById('mars-stars-toggle')) return;

        const btn = document.createElement('button');
        btn.id = 'mars-stars-toggle';
        btn.setAttribute('aria-label', 'Звёздное небо');
        const enabled = localStorage.getItem(STARS_KEY) === 'true';
        btn.innerHTML = enabled ? '🌟' : '⭐';

        const size = IS_MOBILE ? 56 : 52;
        const bottom = IS_MOBILE ? 'calc(80px + env(safe-area-inset-bottom, 0px))' : '90px';
        const right = IS_MOBILE ? 'calc(16px + env(safe-area-inset-right, 0px))' : '20px';

        btn.style.cssText = 'position:fixed;bottom:' + bottom + ';right:' + right + ';width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(135deg, #1a1a2e, #16213e);border:2px solid #6C63FF;color:#fff;font-size:' + (IS_MOBILE ? '1.6rem' : '1.5rem') + ';cursor:pointer;z-index:99999;box-shadow:0 8px 24px rgba(108,99,255,0.5);transition:transform 0.2s, box-shadow 0.2s;display:flex;align-items:center;justify-content:center;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent;';

        if (!IS_MOBILE) {
            btn.addEventListener('mouseenter', function() {
                btn.style.transform = 'scale(1.1) translateY(-3px)';
                btn.style.boxShadow = '0 12px 32px rgba(108,99,255,0.7)';
            });
            btn.addEventListener('mouseleave', function() {
                btn.style.transform = 'scale(1) translateY(0)';
                btn.style.boxShadow = '0 8px 24px rgba(108,99,255,0.5)';
            });
        }

        let lastTap = 0;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const now = Date.now();
            if (now - lastTap < 400) return;
            lastTap = now;

            vibrate(20);

            const currentlyEnabled = localStorage.getItem(STARS_KEY) === 'true';
            if (currentlyEnabled) {
                localStorage.setItem(STARS_KEY, 'false');
                removeStarField();
                playStarsOffSound();
                btn.innerHTML = '⭐';
            } else {
                localStorage.setItem(STARS_KEY, 'true');
                createStarField(true);
                btn.innerHTML = '🌟';
            }
        });

        document.body.appendChild(btn);
    }

    // ============================================================
    // 🎵 ЗВУКИ
    // ============================================================
    function playStarsSound() {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const now = ctx.currentTime;

        [220, 277.18, 329.63, 440, 554.37].forEach(function(freq, i) {
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
    }

    function playStarsOffSound() {
        const ctx = getAudioCtx();
        if (!ctx) return;
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
        let touchStartCount = 0;
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length === 3) {
                touchStartY = e.touches[0].clientY;
                touchStartCount = 3;
            }
        }, { passive: true });
        document.addEventListener('touchend', function(e) {
            if (touchStartCount === 3 && e.changedTouches.length >= 1) {
                const endY = e.changedTouches[0].clientY;
                if (touchStartY - endY > 100) {
                    vibrate(50);
                    triggerMeteorShower();
                }
            }
            touchStartCount = 0;
        }, { passive: true });

        if (IS_MOBILE) {
            let longPressTimer = null;
            const headerSelectors = ['.md-header', '.wy-nav-top', 'header', '.md-header__title', '.md-header__topic'];

            function attachLongPress(el) {
                if (!el || el.dataset.lansurAttached) return;
                el.dataset.lansurAttached = 'true';

                el.addEventListener('touchstart', function() {
                    longPressTimer = setTimeout(function() {
                        longPressTimer = null;
                        vibrate([30, 50, 30]);
                        triggerMeteorShower();
                    }, 1500);
                }, { passive: true });

                ['touchend', 'touchmove', 'touchcancel'].forEach(function(evt) {
                    el.addEventListener(evt, function() {
                        if (longPressTimer) {
                            clearTimeout(longPressTimer);
                            longPressTimer = null;
                        }
                    }, { passive: true });
                });
            }

            setTimeout(function() {
                headerSelectors.forEach(function(sel) {
                    document.querySelectorAll(sel).forEach(attachLongPress);
                });
            }, 500);
        }
    }

    function triggerMeteorShower() {
        localStorage.setItem(STORAGE_KEY, 'true');
        playEasterSound();

        const meteorCount = IS_MOBILE ? 18 : 40;
        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99998;overflow:hidden;';
        document.body.appendChild(container);

        for (let i = 0; i < meteorCount; i++) {
            setTimeout(function() { createMeteor(container); }, i * (IS_MOBILE ? 130 : 80));
        }

        showEasterText();
        setTimeout(function() { container.remove(); }, 8000);
    }

    function createMeteor(container) {
        const meteor = document.createElement('div');
        const startX = Math.random() * window.innerWidth * 1.2 - window.innerWidth * 0.1;
        const startY = -100 - Math.random() * 200;
        const duration = 1.5 + Math.random() * 1.5;
        const size = 3 + Math.random() * 4;

        meteor.style.cssText = 'position:absolute;left:' + startX + 'px;top:' + startY + 'px;width:' + size + 'px;height:' + size + 'px;background:#fff;border-radius:50%;box-shadow:0 0 ' + (size * 3) + 'px ' + size + 'px rgba(255,255,255,0.9), 0 0 ' + (size * 6) + 'px ' + (size * 2) + 'px rgba(255,200,100,0.6);animation:meteorFall ' + duration + 's linear forwards;';

        const tail = document.createElement('div');
        tail.style.cssText = 'position:absolute;top:50%;right:0;width:' + (50 + Math.random() * 80) + 'px;height:2px;background:linear-gradient(270deg, rgba(255,255,255,0.9), rgba(255,200,100,0.6), transparent);transform:translateY(-50%);border-radius:2px;';
        meteor.appendChild(tail);
        container.appendChild(meteor);
    }

    function showEasterText() {
        const text = document.createElement('div');
        text.style.cssText = 'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);font-size:clamp(2rem, 8vw, 5rem);font-weight:900;color:#fff;text-shadow:0 0 20px #6C63FF, 0 0 40px #6C63FF, 0 0 60px #e74c3c, 0 4px 8px rgba(0,0,0,0.5);letter-spacing:8px;z-index:99999;pointer-events:none;animation:easterTextIn 4s ease-out forwards;font-family:Georgia, serif;white-space:nowrap;';
        text.textContent = 'LĀN SUR';
        document.body.appendChild(text);

        const subtitle = document.createElement('div');
        subtitle.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:clamp(0.9rem, 3vw, 1.4rem);font-weight:600;color:#A29BFE;text-shadow:0 0 20px rgba(162,155,254,0.8);letter-spacing:4px;z-index:99999;pointer-events:none;animation:easterTextIn 4s ease-out 0.3s forwards;opacity:0;';
        subtitle.textContent = '— ГЛИНА ПОМНИТ —';
        document.body.appendChild(subtitle);

        setTimeout(function() {
            text.remove();
            subtitle.remove();
        }, 4500);

        const unlock = document.createElement('div');
        unlock.id = 'secret-unlock-banner';
        unlock.style.cssText = 'position:fixed;top:' + (IS_MOBILE ? '12px' : '20px') + ';left:50%;transform:translateX(-50%);z-index:999999;background:linear-gradient(135deg, #6C63FF, #A29BFE);color:#fff;padding:' + (IS_MOBILE ? '12px 18px' : '16px 28px') + ';border-radius:50px;font-size:' + (IS_MOBILE ? '0.85rem' : '1rem') + ';font-weight:800;letter-spacing:1px;box-shadow:0 20px 60px rgba(108,99,255,0.6), 0 0 40px rgba(108,99,255,0.4);animation:secretBannerIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);display:flex;align-items:center;gap:' + (IS_MOBILE ? '8px' : '14px') + ';cursor:pointer;user-select:none;max-width:calc(100vw - 24px);touch-action:manipulation;-webkit-tap-highlight-color:transparent;';
        unlock.innerHTML = '<span style="font-size:1.4rem;">🗝️</span><span>Секретная страница открыта!</span><span style="background:rgba(255,255,255,0.25);padding:6px 12px;border-radius:30px;font-size:0.8rem;white-space:nowrap;">Перейти →</span>';

        unlock.addEventListener('click', function(e) {
            e.preventDefault();
            vibrate(20);
            window.location.href = getBasePath() + '/secret/';
        });

        document.body.appendChild(unlock);

        setTimeout(function() {
            if (unlock.parentNode) {
                unlock.style.transition = 'all 0.5s';
                unlock.style.opacity = '0';
                unlock.style.transform = 'translate(-50%, -30px)';
                setTimeout(function() { unlock.remove(); }, 500);
            }
        }, IS_MOBILE ? 25000 : 20000);
    }

    function playEasterSound() {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach(function(freq, i) {
            setTimeout(function() {
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
    }

    // ============================================================
    // 4. МАРСИАНСКИЕ ПОСЛОВИЦЫ
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
        const TAP_WINDOW = IS_MOBILE ? 550 : 450;

        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' ||
                e.target.closest('a') || e.target.closest('button') ||
                e.target.closest('nav') || e.target.closest('header') ||
                e.target.closest('#mars-stars-toggle') ||
                e.target.closest('#mobile-register-btn') ||
                e.target.closest('.md-sidebar') ||
                e.target.closest('.wy-nav-side')) {
                return;
            }

            clickCount++;

            if (clickTimer) clearTimeout(clickTimer);

            if (clickCount >= 3) {
                clickCount = 0;
                vibrate(30);
                showProverb();
            } else {
                clickTimer = setTimeout(function() {
                    clickCount = 0;
                }, TAP_WINDOW);
            }
        });
    }

    function showProverb() {
        const proverb = PROVERBS[Math.floor(Math.random() * PROVERBS.length)];

        const popup = document.createElement('div');
        popup.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.8);background:linear-gradient(135deg, #1a1a2e, #16213e);color:#fff;padding:' + (IS_MOBILE ? '24px 22px' : '32px 40px') + ';border-radius:20px;border:2px solid #6C63FF;box-shadow:0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(108,99,255,0.4);z-index:999999;text-align:center;max-width:calc(100vw - 32px);opacity:0;transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);pointer-events:none;';

        popup.innerHTML = '<div style="font-size:0.75rem;color:#A29BFE;letter-spacing:3px;margin-bottom:12px;">МАРСИАНСКАЯ МУДРОСТЬ</div>' +
            '<div style="font-size:' + (IS_MOBILE ? '1.2rem' : '1.5rem') + ';font-weight:900;font-family:Georgia, serif;letter-spacing:2px;color:#fff;margin-bottom:12px;">' + proverb.martian + '</div>' +
            '<div style="font-size:0.9rem;color:#A29BFE;font-style:italic;">' + proverb.russian + '</div>';

        document.body.appendChild(popup);

        requestAnimationFrame(function() {
            popup.style.opacity = '1';
            popup.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        setTimeout(function() {
            popup.style.opacity = '0';
            popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(function() { popup.remove(); }, 400);
        }, 3500);
    }

    // ============================================================
    // 5. СЕЗОННЫЙ ЭФФЕКТ
    // ============================================================
    function initSeasonalEffect() {
        const month = new Date().getMonth();
        let emoji, count;

        if (month === 11 || month === 0 || month === 1) {
            emoji = '❄️'; count = 25;
        } else if (month >= 2 && month <= 4) {
            emoji = '🌸'; count = 20;
        } else if (month >= 5 && month <= 7) {
            emoji = '☀️'; count = 15;
        } else {
            emoji = '🍂'; count = 25;
        }

        if (IS_MOBILE) count = Math.max(6, Math.floor(count / 2));

        const todayKey = 'seasonal_' + new Date().toDateString();
        if (sessionStorage.getItem(todayKey)) return;

        setTimeout(function() {
            if (sessionStorage.getItem(todayKey)) return;
            sessionStorage.setItem(todayKey, 'true');
            showSeasonalEffect(emoji, count);
        }, 3000);
    }

    function showSeasonalEffect(emoji, count) {
        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;';
        document.body.appendChild(container);

        for (let i = 0; i < count; i++) {
            setTimeout(function() {
                const particle = document.createElement('div');
                const startX = Math.random() * window.innerWidth;
                const duration = 6 + Math.random() * 5;
                const size = 14 + Math.random() * 10;
                const sway = Math.random() * 100 - 50;
                const rotSpeed = Math.random() * 360 + 180;

                particle.style.cssText = 'position:absolute;top:-50px;left:' + startX + 'px;font-size:' + size + 'px;opacity:0.85;will-change:transform;animation:seasonalFall ' + duration + 's linear forwards;--sway:' + sway + 'px;--rot:' + rotSpeed + 'deg;';
                particle.textContent = emoji;

                container.appendChild(particle);

                setTimeout(function() { particle.remove(); }, duration * 1000 + 100);
            }, i * (IS_MOBILE ? 350 : 200));
        }

        setTimeout(function() { container.remove(); }, 14000);
    }

    // ============================================================
    // 6. АНИМАЦИИ + ТЁМНАЯ ТЕМА
    // ============================================================
    function addAnimations() {
        if (document.getElementById('mars-anim-style')) return;
        const style = document.createElement('style');
        style.id = 'mars-anim-style';
        const vh = window.innerHeight;
        const vw = window.innerWidth;

        style.textContent = `
            @keyframes meteorFall {
                0% { transform: translate(0, 0) rotate(45deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translate(${vw * 0.6}px, ${vh * 1.1}px) rotate(45deg); opacity: 0; }
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
                100% { transform: translate(var(--sway), ${vh + 100}px) rotate(var(--rot)); opacity: 0; }
            }

            html body.mars-stars-on {
                background-color: #0a0a14 !important;
                background-image:
                    radial-gradient(ellipse at top, #1a1a2e 0%, transparent 60%),
                    radial-gradient(ellipse at bottom, #16213e 0%, transparent 60%) !important;
                background-attachment: fixed !important;
                --md-default-bg-color: #0a0a14 !important;
                --md-default-bg-color--light: #15152a !important;
                --md-default-bg-color--lighter: #1a1a2e !important;
                --md-default-fg-color: #e0e0f0 !important;
                --md-default-fg-color--light: #b0b0c8 !important;
                --md-default-fg-color--lighter: #8888a8 !important;
                --md-typeset-color: #e0e0f0 !important;
                --md-typeset-a-color: #A29BFE !important;
                --md-code-bg-color: #15152a !important;
                --md-code-fg-color: #A29BFE !important;
            }

            html body.mars-stars-on .wy-nav-side,
            html body.mars-stars-on .md-sidebar,
            html body.mars-stars-on .md-sidebar--primary,
            html body.mars-stars-on .wy-side-nav-search,
            html body.mars-stars-on .md-nav,
            html body.mars-stars-on .md-nav__list,
            html body.mars-stars-on .md-nav__item {
                background-color: #000000 !important;
                background-image: none !important;
            }

            html body.mars-stars-on .wy-nav-side,
            html body.mars-stars-on .md-sidebar--primary {
                border-right: 1px solid rgba(108, 99, 255, 0.35) !important;
            }

            html body.mars-stars-on .wy-menu-vertical a,
            html body.mars-stars-on .wy-menu-vertical span,
            html body.mars-stars-on .wy-menu-vertical li,
            html body.mars-stars-on .wy-menu-vertical header,
            html body.mars-stars-on .wy-menu-vertical .caption,
            html body.mars-stars-on .md-nav__link,
            html body.mars-stars-on .md-nav__title,
            html body.mars-stars-on .md-nav__item > a,
            html body.mars-stars-on .md-nav__item > span,
            html body.mars-stars-on .md-nav__item--nested > .md-nav__link {
                background-color: transparent !important;
                color: #ffffff !important;
            }

            html body.mars-stars-on .wy-menu-vertical a:hover,
            html body.mars-stars-on .md-nav__link:hover {
                color: #A29BFE !important;
                background-color: rgba(108, 99, 255, 0.18) !important;
            }

            html body.mars-stars-on .wy-menu-vertical li.current > a,
            html body.mars-stars-on .wy-menu-vertical li.current > a:hover,
            html body.mars-stars-on .md-nav__link--active,
            html body.mars-stars-on .md-nav__item .md-nav__link--active {
                color: #A29BFE !important;
                background-color: rgba(108, 99, 255, 0.28) !important;
                border-left: 3px solid #6C63FF !important;
                font-weight: 700 !important;
            }

            html body.mars-stars-on .wy-side-nav-search,
            html body.mars-stars-on .md-search__inner,
            html body.mars-stars-on .md-search__form {
                background-color: #000000 !important;
            }

            html body.mars-stars-on .wy-side-nav-search input,
            html body.mars-stars-on .md-search__input {
                background-color: rgba(255, 255, 255, 0.08) !important;
                color: #ffffff !important;
                border: 1px solid rgba(108, 99, 255, 0.4) !important;
            }

            html body.mars-stars-on .wy-side-nav-search input::placeholder,
            html body.mars-stars-on .md-search__input::placeholder {
                color: #9999bb !important;
            }

            html body.mars-stars-on .wy-side-nav-search > a,
            html body.mars-stars-on .wy-side-nav-search > div.version,
            html body.mars-stars-on .wy-side-nav-search .icon {
                color: #ffffff !important;
            }

            html body.mars-stars-on .md-nav__title,
            html body.mars-stars-on .md-nav__title[for="__drawer"] {
                background-color: #000000 !important;
                color: #ffffff !important;
                box-shadow: none !important;
            }

            html body.mars-stars-on .md-content,
            html body.mars-stars-on .md-content__inner,
            html body.mars-stars-on .rst-content,
            html body.mars-stars-on .wy-nav-content,
            html body.mars-stars-on .wy-nav-content-wrap,
            html body.mars-stars-on .document,
            html body.mars-stars-on .section,
            html body.mars-stars-on article,
            html body.mars-stars-on .md-typeset {
                background-color: #0f0f1e !important;
                color: #e0e0f0 !important;
            }

            html body.mars-stars-on table,
            html body.mars-stars-on table.docutils,
            html body.mars-stars-on .rst-content table,
            html body.mars-stars-on .rst-content table.docutils,
            html body.mars-stars-on .wy-table,
            html body.mars-stars-on .wy-table-responsive,
            html body.mars-stars-on .wy-table-responsive table,
            html body.mars-stars-on .md-typeset table:not([class]),
            html body.mars-stars-on .md-typeset table {
                background-color: #14142a !important;
                color: #e0e0f0 !important;
                border: 1px solid rgba(108, 99, 255, 0.35) !important;
                border-collapse: collapse !important;
            }

            html body.mars-stars-on table th,
            html body.mars-stars-on table.docutils th,
            html body.mars-stars-on .wy-table th,
            html body.mars-stars-on .wy-table-responsive th,
            html body.mars-stars-on .md-typeset table th {
                background-color: #252550 !important;
                color: #ffffff !important;
                border: 1px solid rgba(108, 99, 255, 0.45) !important;
                font-weight: 700 !important;
            }

            html body.mars-stars-on table td,
            html body.mars-stars-on table.docutils td,
            html body.mars-stars-on .wy-table td,
            html body.mars-stars-on .wy-table-responsive td,
            html body.mars-stars-on .md-typeset table td {
                background-color: #14142a !important;
                color: #d4d4e4 !important;
                border: 1px solid rgba(108, 99, 255, 0.2) !important;
            }

            html body.mars-stars-on table tbody tr:nth-child(even) td,
            html body.mars-stars-on .wy-table tbody tr:nth-child(even) td {
                background-color: #1a1a30 !important;
            }

            html body.mars-stars-on table tbody tr:hover td {
                background-color: rgba(108, 99, 255, 0.18) !important;
            }

            html body.mars-stars-on .infobox,
            html body.mars-stars-on .infobox-table,
            html body.mars-stars-on table.infobox,
            html body.mars-stars-on .wiki-infobox,
            html body.mars-stars-on .md-typeset .infobox,
            html body.mars-stars-on div[class*="infobox"],
            html body.mars-stars-on table[class*="infobox"],
            html body.mars-stars-on aside[class*="infobox"],
            html body.mars-stars-on section[class*="infobox"] {
                background-color: #14142a !important;
                color: #e0e0f0 !important;
                border: 2px solid rgba(108, 99, 255, 0.45) !important;
            }

            html body.mars-stars-on .infobox th,
            html body.mars-stars-on .infobox td,
            html body.mars-stars-on table.infobox th,
            html body.mars-stars-on table.infobox td,
            html body.mars-stars-on div[class*="infobox"] th,
            html body.mars-stars-on div[class*="infobox"] td,
            html body.mars-stars-on div[class*="infobox"] > div,
            html body.mars-stars-on table[class*="infobox"] th,
            html body.mars-stars-on table[class*="infobox"] td,
            html body.mars-stars-on aside[class*="infobox"] > * {
                background-color: #1c1c38 !important;
                color: #e0e0f0 !important;
                border-color: rgba(108, 99, 255, 0.25) !important;
            }

            html body.mars-stars-on .infobox th,
            html body.mars-stars-on table.infobox th,
            html body.mars-stars-on div[class*="infobox"] th,
            html body.mars-stars-on table[class*="infobox"] th,
            html body.mars-stars-on .infobox-title,
            html body.mars-stars-on .infobox caption {
                background-color: #252550 !important;
                color: #ffffff !important;
                font-weight: 700 !important;
            }

            html body.mars-stars-on h1,
            html body.mars-stars-on h2,
            html body.mars-stars-on h3,
            html body.mars-stars-on h4,
            html body.mars-stars-on h5,
            html body.mars-stars-on h6,
            html body.mars-stars-on .md-typeset h1,
            html body.mars-stars-on .md-typeset h2,
            html body.mars-stars-on .md-typeset h3 {
                color: #f0f0ff !important;
                border-bottom-color: rgba(108, 99, 255, 0.3) !important;
            }

            html body.mars-stars-on p,
            html body.mars-stars-on li,
            html body.mars-stars-on dd,
            html body.mars-stars-on dt,
            html body.mars-stars-on label {
                color: #d4d4e4 !important;
            }

            html body.mars-stars-on a {
                color: #A29BFE !important;
            }

            html body.mars-stars-on a:hover {
                color: #6C63FF !important;
            }

            html body.mars-stars-on strong,
            html body.mars-stars-on b {
                color: #ffffff !important;
            }

            html body.mars-stars-on blockquote {
                background-color: rgba(20, 20, 40, 0.6) !important;
                border-left: 4px solid #6C63FF !important;
                color: #d4d4e4 !important;
            }

            html body.mars-stars-on code,
            html body.mars-stars-on pre,
            html body.mars-stars-on .highlight,
            html body.mars-stars-on .md-typeset code {
                background-color: #15152a !important;
                color: #A29BFE !important;
                border: 1px solid rgba(108, 99, 255, 0.25) !important;
            }

            html body.mars-stars-on .admonition,
            html body.mars-stars-on .note,
            html body.mars-stars-on .warning,
            html body.mars-stars-on .tip,
            html body.mars-stars-on .info,
            html body.mars-stars-on .md-typeset .admonition {
                background-color: #1a1a30 !important;
                border-color: rgba(108, 99, 255, 0.35) !important;
                color: #d4d4e4 !important;
            }

            html body.mars-stars-on .admonition-title,
            html body.mars-stars-on .admonition > .admonition-title {
                background-color: rgba(108, 99, 255, 0.3) !important;
                color: #ffffff !important;
            }

            html body.mars-stars-on .md-header,
            html body.mars-stars-on .wy-nav-top,
            html body.mars-stars-on .md-header__inner {
                background-color: #050510 !important;
                border-bottom: 1px solid rgba(108, 99, 255, 0.3) !important;
            }

            html body.mars-stars-on .md-header__title,
            html body.mars-stars-on .md-header-nav__title,
            html body.mars-stars-on .wy-nav-top a,
            html body.mars-stars-on .md-header__topic {
                color: #ffffff !important;
            }

            html body.mars-stars-on .pf-card,
            html body.mars-stars-on .pf-quick-card,
            html body.mars-stars-on .pf-ach,
            html body.mars-stars-on .pf-note,
            html body.mars-stars-on .pf-tabs,
            html body.mars-stars-on .pf-note-form,
            html body.mars-stars-on .pf-stat,
            html body.mars-stars-on .pf-day,
            html body.mars-stars-on .pf-history-item {
                background: #14142a !important;
                border-color: rgba(108, 99, 255, 0.35) !important;
                color: #e0e0f0 !important;
            }

            html body.mars-stars-on .pf-card-title,
            html body.mars-stars-on .pf-quick-title,
            html body.mars-stars-on .pf-ach-name,
            html body.mars-stars-on .pf-note-title {
                color: #e0e0f0 !important;
            }

            html body.mars-stars-on .pf-tab {
                color: #9999bb !important;
            }

            html body.mars-stars-on button,
            html body.mars-stars-on .md-button,
            html body.mars-stars-on input[type="submit"],
            html body.mars-stars-on input[type="button"],
            html body.mars-stars-on .pf-btn {
                touch-action: manipulation !important;
                -webkit-tap-highlight-color: transparent;
                cursor: pointer !important;
            }

            html body.mars-stars-on button:active,
            html body.mars-stars-on .md-button:active,
            html body.mars-stars-on .pf-btn:active {
                transform: scale(0.97) !important;
            }

            html body.mars-stars-on input,
            html body.mars-stars-on textarea,
            html body.mars-stars-on select {
                background-color: #15152a !important;
                color: #e0e0f0 !important;
                border-color: rgba(108, 99, 255, 0.35) !important;
                font-size: 16px !important;
                -webkit-appearance: none;
                appearance: none;
            }

            html body.mars-stars-on input::placeholder,
            html body.mars-stars-on textarea::placeholder {
                color: #666688 !important;
            }

            body,
            .md-content,
            .wy-nav-content,
            .md-header,
            .wy-nav-side,
            .md-nav,
            table,
            table th,
            table td {
                transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
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
        initProverbs();
        initSeasonalEffect();
        unlockAudioOnFirstTouch();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
