// easter-eggs.js — пасхалки и эффекты сайта (mobile-aware v2)
(function() {
    'use strict';

    const STORAGE_KEY = 'mars_secret_unlocked';
    const STARS_KEY = 'mars_stars_enabled';

    // ============================================================
    // 📱 ОПРЕДЕЛЕНИЕ МОБИЛЬНОГО
    // ============================================================
    const IS_MOBILE =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    // ============================================================
    // 🔗 БАЗОВЫЙ ПУТЬ
    // ============================================================
    function getBasePath() {
        return window.location.pathname.replace(/\/[^\/]*$/, '/').replace(/\/$/, '');
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
            audioCtx.resume().catch(() => {});
        }
        return audioCtx;
    }

    function unlockAudioOnFirstTouch() {
        const unlock = () => {
            const ctx = getAudioCtx();
            if (ctx && ctx.state === 'suspended') ctx.resume();
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('click', unlock);
        };
        document.addEventListener('touchstart', unlock, { passive: true });
        document.addEventListener('click', unlock);
    }

    function showToast(text, color) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            left: 50%;
            bottom: calc(24px + env(safe-area-inset-bottom, 0px));
            transform: translateX(-50%) translateY(20px);
            background: ${color || '#6C63FF'};
            color: #fff;
            padding: 12px 20px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 700;
            z-index: 9999999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            opacity: 0;
            transition: all 0.3s;
            max-width: 90vw;
            text-align: center;
            pointer-events: none;
            font-family: inherit;
        `;
        toast.textContent = text;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    function vibrate(pattern) {
        try {
            if (navigator.vibrate) navigator.vibrate(pattern);
        } catch(e) {}
    }

    // ============================================================
    // 🎯 ФИКС МОБИЛЬНОГО МЕНЮ (Read the Docs + Material)
    // ============================================================
    function fixMobileDrawer() {
        if (!IS_MOBILE) return;

        // Сброс сдвига контента
        function resetContentShift() {
            // Убираем overflow у body/html
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // Снимаем сдвиги со всех возможных контейнеров
            const selectors = [
                '.wy-nav-content-wrap',
                '.wy-nav-content',
                '.md-container',
                '.md-main',
                '.md-main__inner',
                '.md-content',
                '.md-content__inner'
            ];

            selectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => {
                    // Не трогаем, если элемент всё ещё в активном состоянии меню
                    const insideMenu = el.closest('.wy-nav-side.shift, .md-sidebar--primary[data-md-state="active"]');
                    if (insideMenu) return;

                    el.style.transform = '';
                    el.style.marginLeft = '';
                    el.style.paddingLeft = '';
                });
            });

            // Read the Docs: класс .shift на content-wrap
            document.querySelectorAll('.wy-nav-content-wrap.shift').forEach(el => {
                const sideNav = document.querySelector('.wy-nav-side');
                if (!sideNav || !sideNav.classList.contains('shift')) {
                    el.classList.remove('shift');
                }
            });

            // Material: снимаем активные состояния
            document.querySelectorAll('.md-sidebar--primary[data-md-state="active"]').forEach(el => {
                // Если drawer закрыт (нет overlay), снимаем состояние
                const hasOverlay = document.querySelector('.md-overlay[data-md-state="active"]');
                if (!hasOverlay) {
                    el.removeAttribute('data-md-state');
                }
            });
        }

        // 1. Клик вне меню или по ссылке в меню — сбрасываем через паузу
        document.addEventListener('click', function(e) {
            const insideMenu = e.target.closest('.wy-nav-side, .md-sidebar--primary');
            const isHamburger = e.target.closest('.wy-nav-top, .md-header__button, .md-header__button[for="__drawer"]');
            const isMenuLink = e.target.closest('.wy-menu-vertical a, .md-nav__link');
            const isOverlay = e.target.closest('.md-overlay, .wy-overlay');

            // Если клик был по ссылке в меню или по оверлею — сбрасываем через паузу
            if (isMenuLink || isOverlay || (!insideMenu && !isHamburger)) {
                setTimeout(resetContentShift, 80);
                setTimeout(resetContentShift, 350); // на случай медленной анимации
            }
        }, true);

        // 2. Наблюдаем за изменениями классов на body/sidebar
        const observer = new MutationObserver(() => {
            const sideNav = document.querySelector('.wy-nav-side, .md-sidebar--primary');
            const overlay = document.querySelector('.md-overlay[data-md-state="active"]');
            if (!sideNav) return;

            const isShifted =
                sideNav.classList.contains('shift') ||
                sideNav.hasAttribute('data-md-state') ||
                overlay;

            if (!isShifted) {
                setTimeout(resetContentShift, 100);
            }
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class', 'style'],
            subtree: true
        });

        // 3. После загрузки страницы тоже сбросим
        setTimeout(resetContentShift, 500);
        window.addEventListener('orientationchange', () => setTimeout(resetContentShift, 300));
    }

    // ============================================================
    // 👤 МОБИЛЬНАЯ КНОПКА РЕГИСТРАЦИИ (правый верхний угол)
    // ============================================================
    function initMobileRegisterButton() {
        if (!IS_MOBILE) return;
        if (document.getElementById('mobile-register-btn')) return;

        // Не показываем на страницах /secret/, /secret-2/
        if (/\/secret(-2)?\//.test(window.location.pathname)) return;

        const base = getBasePath();
        const isProfilePage = /\/profile\//.test(window.location.pathname);

        const btn = document.createElement('a');
        btn.id = 'mobile-register-btn';
        btn.href = base + '/profile/';
        btn.innerHTML = isProfilePage ? '👤 Профиль' : '👤 Войти';
        btn.setAttribute('aria-label', 'Регистрация или вход');

        btn.style.cssText = `
            position: fixed;
            top: calc(8px + env(safe-area-inset-top, 0px));
            right: calc(10px + env(safe-area-inset-right, 0px));
            z-index: 99998;
            padding: 8px 14px;
            background: linear-gradient(135deg, #6C63FF, #A29BFE);
            color: #ffffff;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 6px 20px rgba(108, 99, 255, 0.55);
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: inherit;
            letter-spacing: 0.3px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            transition: transform 0.15s ease;
            white-space: nowrap;
            max-width: 60vw;
            overflow: hidden;
            text-overflow: ellipsis;
        `;

        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.95)';
        }, { passive: true });
        btn.addEventListener('touchend', () => {
            btn.style.transform = 'scale(1)';
        }, { passive: true });
        btn.addEventListener('click', () => {
            vibrate(15);
        });

        document.body.appendChild(btn);
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
            }, 4000 + Math.random() * 6000);
        }

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('orientationchange', () => setTimeout(resize, 200));
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
            setTimeout(() => {
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

        btn.style.cssText = `
            position: fixed;
            bottom: ${bottom};
            right: ${right};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid #6C63FF;
            color: #fff;
            font-size: ${IS_MOBILE ? '1.6rem' : '1.5rem'};
            cursor: pointer;
            z-index: 99999;
            box-shadow: 0 8px 24px rgba(108,99,255,0.5);
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
        `;

        if (!IS_MOBILE) {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.1) translateY(-3px)';
                btn.style.boxShadow = '0 12px 32px rgba(108,99,255,0.7)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1) translateY(0)';
                btn.style.boxShadow = '0 8px 24px rgba(108,99,255,0.5)';
            });
        }

        let lastTap = 0;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const now = Date.now();
            if (now - lastTap < 400) return;
            lastTap = now;

            vibrate(20);

            const currentlyEnabled = localStorage.getItem(STARS_KEY) === 'true';
            if (currentlyEnabled) {
                localStorage.setItem(STARS_KEY, 'false');
                removeSta
