// ============================================================
// easter-eggs.js — v3 VIP
// Пасхалки, звёзды, метеоры, пословицы, сезоны
// - 🆕 Fix: AudioContext создаётся ТОЛЬКО после user gesture
// - 🆕 Fix: starsOn({silent:true}) для инициализации без звука
// - 🆕 Fix: проверка существующего canvas / кнопки
// - 🆕 Fix: pagehide → cleanup
// - 🆕 Fix: prefers-reduced-motion
// - 🆕 Fix: не конфликтует с vip-cursor.js
// - 🆕 Fix: кнопка звёзд выше effects-menu (bottom: 150px)
// - 🆕 Fix: debounce resize, auto-disconnect
// - Публичное API: window.marsEasterEggs.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsEasterEggsLoaded) return;
    window.__marsEasterEggsLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var DEBUG = false;
    var STORAGE_KEY = 'mars_secret_unlocked';
    var STARS_KEY = 'mars_stars_enabled';

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🎬 easter:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 1 && window.innerWidth < 1024) return true;
        return false;
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    var IS_MOBILE = isMobile();
    var REDUCED_MOTION = prefersReducedMotion();

    function vibrate(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch(e) {} }

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function safeLS_get(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function safeLS_set(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }
    function safeSS_get(k) { try { return sessionStorage.getItem(k); } catch(e) { return null; } }
    function safeSS_set(k, v) { try { sessionStorage.setItem(k, v); } catch(e) {} }

    // ============================================================
    // 🔗 Правильный путь к секретной странице
    // ============================================================
    function getSecretUrl() {
        try {
            var links = document.querySelectorAll('a[href*="secret"]');
            for (var i = 0; i < links.length; i++) {
                var href = links[i].getAttribute('href');
                if (href && href.indexOf('secret') !== -1 && href.indexOf('javascript:') !== 0) {
                    return links[i].href;
                }
            }
        } catch(e) {}

        try {
            var baseTag = document.querySelector('base');
            if (baseTag && baseTag.href) {
                return new URL('secret/', baseTag.href).href;
            }
        } catch(e) {}

        return window.location.origin + '/secret/';
    }

    // ============================================================
    // 🔊 АУДИО — КРИТИЧНО: не создаём до user gesture
    // ============================================================
    var audioCtx = null;
    var audioUnlocked = false;

    /**
     * Возвращает AudioContext только если он уже разблокирован.
     * Иначе null — это предотвращает Chrome warnings.
     */
    function getAudioCtx() {
        if (!audioUnlocked) return null;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume().catch(function(){});
            }
        } catch(e) { return null; }
        return audioCtx;
    }

    /**
     * Разблокирует AudioContext после первого взаимодействия пользователя.
     * Вешается один раз на touchstart/click/keydown.
     */
    function unlockAudioOnce() {
        if (audioUnlocked) return;

        function un() {
            try {
                if (!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }
                if (audioCtx && audioCtx.state === 'suspended') {
                    audioCtx.resume().catch(function(){});
                }
                audioUnlocked = true;
                log('AudioContext разблокирован');
            } catch(e) {
                log('unlock error:', e.message);
            }
            document.removeEventListener('touchstart', un);
            document.removeEventListener('click', un);
            document.removeEventListener('keydown', un);
        }

        document.addEventListener('touchstart', un, { passive: true });
        document.addEventListener('click', un, { passive: true });
        document.addEventListener('keydown', un, { passive: true });
    }

    // ============================================================
    // 🖱️ КУРСОР — только если vip-cursor.js НЕ подключён
    // ============================================================
    function initCursor() {
        if (IS_MOBILE) return;
        if (window.__vipCursorLoaded || window.marsVipCursor) {
            log('vip-cursor активен, CSS-курсор не ставим');
            return;
        }
        if (document.getElementById('easter-cursor-style')) return;

        var s = document.createElement('style');
        s.id = 'easter-cursor-style';
        s.textContent = '*{cursor:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><radialGradient id="mg" cx="35%" cy="35%"><stop offset="0%" stop-color="%23e74c3c"/><stop offset="100%" stop-color="%237f1d1d"/></radialGradient></defs><circle cx="16" cy="16" r="12" fill="url(%23mg)" stroke="%234a1010" stroke-width="1"/><ellipse cx="11" cy="12" rx="3" ry="2" fill="%23922b1f" opacity="0.6"/><ellipse cx="20" cy="18" rx="4" ry="2.5" fill="%23922b1f" opacity="0.5"/></svg>\') 16 16,auto !important;}a,button,.md-nav__link{cursor:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><defs><radialGradient id="mg2" cx="35%" cy="35%"><stop offset="0%" stop-color="%23f39c12"/><stop offset="100%" stop-color="%23c0392b"/></radialGradient></defs><circle cx="18" cy="18" r="14" fill="url(%23mg2)" stroke="%23a04000" stroke-width="1.5"/></svg>\') 18 18,pointer !important;}input,textarea{cursor:text !important;}';
        document.head.appendChild(s);
    }

    // ============================================================
    // ⭐ ЗВЁЗДЫ
    // ============================================================
    var starsCanvas = null;
    var starsRAF = null;
    var starsResizeHandler = null;
    var starsShotTimer = null;
    var starsCtx = null;
    var starsData = [];
    var shotsData = [];
    var starsResizeTimer = null;

    function initStars() {
        // 🆕 Проверка: canvas уже может быть создан другим скриптом
        if (document.getElementById('mars-stars-canvas')) {
            log('canvas уже существует — не создаём');
            createToggle();
            return;
        }

        if (safeLS_get(STARS_KEY) === 'true') {
            // 🆕 silent: true — не играем звук при загрузке
            createStars(false);
        }
        createToggle();
    }

    function createStars(playSound) {
        if (starsCanvas) return;
        // 🆕 Двойная проверка canvas
        if (document.getElementById('mars-stars-canvas')) return;

        document.body.classList.add('mars-stars-on');
        document.documentElement.classList.add('mars-stars-on');

        if (playSound) playStarsOn();

        starsCanvas = document.createElement('canvas');
        starsCanvas.id = 'mars-stars-canvas';
        starsCanvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;';
        document.body.appendChild(starsCanvas);

        starsCtx = starsCanvas.getContext('2d');
        var dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.5 : 2);

        function resize() {
            if (!starsCanvas || !starsCtx) return;
            var w = window.innerWidth, h = window.innerHeight;
            starsCanvas.width = w * dpr;
            starsCanvas.height = h * dpr;
            starsCanvas.style.width = w + 'px';
            starsCanvas.style.height = h + 'px';
            starsCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

            starsData = [];
            var n = Math.floor((w * h) / (IS_MOBILE ? 15000 : 6000));
            for (var i = 0; i < n; i++) {
                starsData.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 1.8 + 0.4,
                    a: Math.random() * 0.7 + 0.3,
                    sp: Math.random() * 0.02 + 0.005,
                    tw: Math.random() * 6.28
                });
            }
        }

        function spawnShot() {
            shotsData.push({
                x: Math.random() * window.innerWidth * 0.8,
                y: -50,
                len: 80 + Math.random() * 100,
                sp: 6 + Math.random() * 8,
                ang: 0.785 + (Math.random() * 0.2 - 0.1),
                life: 1
            });
        }

        function draw() {
            if (!starsCanvas || !starsCtx) return;

            var w = window.innerWidth, h = window.innerHeight;
            starsCtx.clearRect(0, 0, w, h);

            for (var i = 0; i < starsData.length; i++) {
                var s = starsData[i];
                s.tw += s.sp;
                var al = s.a * (0.5 + 0.5 * Math.sin(s.tw));

                if (s.r > 1) {
                    starsCtx.beginPath();
                    starsCtx.arc(s.x, s.y, s.r * 3, 0, 6.28);
                    starsCtx.fillStyle = 'rgba(162,155,254,' + (al * 0.15) + ')';
                    starsCtx.fill();
                }
                starsCtx.beginPath();
                starsCtx.arc(s.x, s.y, s.r, 0, 6.28);
                starsCtx.fillStyle = 'rgba(255,255,255,' + al + ')';
                starsCtx.fill();
            }

            shotsData = shotsData.filter(function(x) { return x.life > 0; });
            for (var j = 0; j < shotsData.length; j++) {
                var sh = shotsData[j];
                sh.x += Math.cos(sh.ang) * sh.sp;
                sh.y += Math.sin(sh.ang) * sh.sp;
                sh.life -= 0.01;

                var tx = sh.x - Math.cos(sh.ang) * sh.len;
                var ty = sh.y - Math.sin(sh.ang) * sh.len;
                var g = starsCtx.createLinearGradient(tx, ty, sh.x, sh.y);
                g.addColorStop(0, 'rgba(255,255,255,0)');
                g.addColorStop(1, 'rgba(255,255,200,' + sh.life + ')');
                starsCtx.beginPath();
                starsCtx.moveTo(tx, ty);
                starsCtx.lineTo(sh.x, sh.y);
                starsCtx.strokeStyle = g;
                starsCtx.lineWidth = 2;
                starsCtx.stroke();
            }

            starsRAF = requestAnimationFrame(draw);
        }

        function loopShots() {
            if (!starsCanvas) return;
            starsShotTimer = setTimeout(function() {
                if (starsCanvas) {
                    spawnShot();
                    loopShots();
                }
            }, 4000 + Math.random() * 6000);
        }

        resize();

        starsResizeHandler = function() {
            if (starsResizeTimer) clearTimeout(starsResizeTimer);
            starsResizeTimer = setTimeout(function() { starsResizeTimer = null; resize(); }, 200);
        };
        window.addEventListener('resize', starsResizeHandler, { passive: true });

        draw();
        if (!REDUCED_MOTION) loopShots();
    }

    function removeStars() {
        document.body.classList.remove('mars-stars-on');
        document.documentElement.classList.remove('mars-stars-on');

        if (starsResizeHandler) {
            window.removeEventListener('resize', starsResizeHandler);
            starsResizeHandler = null;
        }
        if (starsResizeTimer) {
            clearTimeout(starsResizeTimer);
            starsResizeTimer = null;
        }
        if (starsRAF) {
            cancelAnimationFrame(starsRAF);
            starsRAF = null;
        }
        if (starsShotTimer) {
            clearTimeout(starsShotTimer);
            starsShotTimer = null;
        }

        if (starsCanvas) {
            var c = starsCanvas;
            c.style.transition = 'opacity .3s ease';
            c.style.opacity = '0';
            setTimeout(function() {
                if (c.parentNode) c.parentNode.removeChild(c);
            }, 300);
            starsCanvas = null;
            starsCtx = null;
            starsData = [];
            shotsData = [];
        }
    }

    function createToggle() {
        if (document.getElementById('mars-stars-toggle')) return;

        var btn = document.createElement('button');
        btn.id = 'mars-stars-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Звёздное небо');
        btn.setAttribute('aria-pressed', safeLS_get(STARS_KEY) === 'true' ? 'true' : 'false');

        var on = safeLS_get(STARS_KEY) === 'true';
        btn.textContent = on ? '🌟' : '⭐';

        var size = IS_MOBILE ? 52 : 48;
        btn.style.cssText =
            'position:fixed;' +
            'bottom:calc(150px + env(safe-area-inset-bottom,0px));' +
            'right:calc(20px + env(safe-area-inset-right,0px));' +
            'width:' + size + 'px;height:' + size + 'px;' +
            'border-radius:50%;' +
            'background:linear-gradient(135deg,#1a1a2e,#16213e);' +
            'border:2px solid #6C63FF;color:#fff;' +
            'font-size:' + (IS_MOBILE ? '1.5' : '1.4') + 'rem;' +
            'cursor:pointer;z-index:9999988;' +
            'box-shadow:0 8px 24px rgba(108,99,255,0.5);' +
            'display:flex;align-items:center;justify-content:center;' +
            'padding:0;touch-action:manipulation;' +
            '-webkit-tap-highlight-color:transparent;' +
            'transition:transform .25s cubic-bezier(.16,1,.3,1);';

        var last = 0;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var now = Date.now();
            if (now - last < 400) return;
            last = now;
            vibrate(20);

            // 🆕 Разблокируем аудио при первом клике (user gesture)
            if (!audioUnlocked) {
                try {
                    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
                    audioUnlocked = true;
                } catch(e) {}
            }

            if (safeLS_get(STARS_KEY) === 'true') {
                safeLS_set(STARS_KEY, 'false');
                removeStars();
                playStarsOff();
                btn.textContent = '⭐';
                btn.setAttribute('aria-pressed', 'false');
            } else {
                safeLS_set(STARS_KEY, 'true');
                createStars(true);
                btn.textContent = '🌟';
                btn.setAttribute('aria-pressed', 'true');
            }
        });
        document.body.appendChild(btn);
    }

    // ============================================================
    // 🔊 ЗВУКИ (все проверяют audioUnlocked)
    // ============================================================
    function playStarsOn() {
        if (REDUCED_MOTION) return;
        if (!audioUnlocked) return; // 🆕 защита от warning
        var c = getAudioCtx(); if (!c) return;
        var t = c.currentTime;
        [220, 277.18, 329.63, 440, 554.37].forEach(function(f, i) {
            try {
                var o = c.createOscillator(), g = c.createGain();
                o.type = 'sine';
                o.frequency.value = f;
                var s = t + i * 0.13;
                g.gain.setValueAtTime(0, s);
                g.gain.linearRampToValueAtTime(0.12, s + 0.04);
                g.gain.exponentialRampToValueAtTime(0.001, s + 1.6);
                o.connect(g); g.connect(c.destination);
                o.start(s); o.stop(s + 1.6);
            } catch(e) {}
        });
    }

    function playStarsOff() {
        if (!audioUnlocked) return; // 🆕
        var c = getAudioCtx(); if (!c) return;
        try {
            var o = c.createOscillator(), g = c.createGain();
            o.type = 'sine';
            o.frequency.setValueAtTime(554.37, c.currentTime);
            o.frequency.exponentialRampToValueAtTime(110, c.currentTime + 0.9);
            g.gain.setValueAtTime(0.1, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.9);
            o.connect(g); g.connect(c.destination);
            o.start(); o.stop(c.currentTime + 0.9);
        } catch(e) {}
    }

    function playEaster() {
        if (!audioUnlocked) return; // 🆕
        var c = getAudioCtx(); if (!c) return;
        [261.63, 329.63, 392, 523.25].forEach(function(f, i) {
            setTimeout(function() {
                try {
                    var o = c.createOscillator(), g = c.createGain();
                    o.type = 'triangle';
                    o.frequency.value = f;
                    g.gain.setValueAtTime(0.15, c.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.8);
                    o.connect(g); g.connect(c.destination);
                    o.start(); o.stop(c.currentTime + 0.8);
                } catch(e) {}
            }, i * 120);
        });
    }

    // ============================================================
    // 🎁 ЛАНСУР (пасхалка)
    // ============================================================
    function initEaster() {
        var buf = '';
        var SECRET = 'LANSUR';

        document.addEventListener('keydown', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (!e.key || e.key.length !== 1) return;

            buf += e.key.toUpperCase();
            if (buf.length > SECRET.length) buf = buf.slice(-SECRET.length);
            if (buf === SECRET) {
                buf = '';
                triggerMeteor();
            }
        });

        // Мобильный жест — 3 пальца вниз
        var tY = 0, tC = 0;
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length === 3) { tY = e.touches[0].clientY; tC = 3; }
        }, { passive: true });
        document.addEventListener('touchend', function(e) {
            if (tC === 3 && e.changedTouches && e.changedTouches[0]) {
                if (tY - e.changedTouches[0].clientY > 100) {
                    vibrate(50);
                    triggerMeteor();
                }
            }
            tC = 0;
        }, { passive: true });

        // Мобильный long-press на шапке
        if (IS_MOBILE) {
            var lt = null;
            var sels = ['.md-header', '.wy-nav-top', 'header', '.md-header__title'];
            function attach(el) {
                if (!el || el.dataset.lansur) return;
                el.dataset.lansur = '1';
                el.addEventListener('touchstart', function() {
                    lt = setTimeout(function() {
                        lt = null;
                        vibrate([30, 50, 30]);
                        triggerMeteor();
                    }, 1500);
                }, { passive: true });
                ['touchend', 'touchmove', 'touchcancel'].forEach(function(ev) {
                    el.addEventListener(ev, function() {
                        if (lt) { clearTimeout(lt); lt = null; }
                    }, { passive: true });
                });
            }
            setTimeout(function() {
                sels.forEach(function(s) {
                    document.querySelectorAll(s).forEach(attach);
                });
            }, 500);
        }
    }

    function triggerMeteor() {
        safeLS_set(STORAGE_KEY, 'true');
        playEaster();

        var n = REDUCED_MOTION ? 5 : (IS_MOBILE ? 18 : 40);
        var c = document.createElement('div');
        c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99998;overflow:hidden;';
        document.body.appendChild(c);

        for (var i = 0; i < n; i++) {
            (function(idx) {
                setTimeout(function() { createMeteor(c); }, idx * (IS_MOBILE ? 130 : 80));
            })(i);
        }

        showText();
        setTimeout(function() {
            if (c.parentNode) c.parentNode.removeChild(c);
        }, 8000);
    }

    function createMeteor(c) {
        var m = document.createElement('div');
        var sx = Math.random() * window.innerWidth * 1.2 - window.innerWidth * 0.1;
        var sy = -100 - Math.random() * 200;
        var dur = 1.5 + Math.random() * 1.5;
        var sz = 3 + Math.random() * 4;

        m.style.cssText =
            'position:absolute;' +
            'left:' + sx + 'px;top:' + sy + 'px;' +
            'width:' + sz + 'px;height:' + sz + 'px;' +
            'background:#fff;border-radius:50%;' +
            'box-shadow:0 0 ' + (sz * 3) + 'px ' + sz + 'px rgba(255,255,255,0.9),' +
            '0 0 ' + (sz * 6) + 'px ' + (sz * 2) + 'px rgba(255,200,100,0.6);' +
            'animation:meteorFall ' + dur + 's linear forwards;';

        var tail = document.createElement('div');
        tail.style.cssText =
            'position:absolute;top:50%;right:0;' +
            'width:' + (50 + Math.random() * 80) + 'px;height:2px;' +
            'background:linear-gradient(270deg,rgba(255,255,255,0.9),rgba(255,200,100,0.6),transparent);' +
            'transform:translateY(-50%);border-radius:2px;';
        m.appendChild(tail);
        c.appendChild(m);
    }

    function showText() {
        var t = document.createElement('div');
        t.style.cssText =
            'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);' +
            'font-size:clamp(2rem,8vw,5rem);font-weight:900;color:#fff;' +
            'text-shadow:0 0 20px #6C63FF,0 0 40px #6C63FF,0 0 60px #e74c3c;' +
            'letter-spacing:8px;z-index:99999;pointer-events:none;' +
            'animation:easterTextIn 4s ease-out forwards;' +
            'font-family:Georgia,serif;white-space:nowrap;';
        t.textContent = 'LĀN SUR';
        document.body.appendChild(t);

        var s = document.createElement('div');
        s.style.cssText =
            'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
            'font-size:clamp(0.9rem,3vw,1.4rem);font-weight:600;color:#A29BFE;' +
            'text-shadow:0 0 20px rgba(162,155,254,0.8);' +
            'letter-spacing:4px;z-index:99999;pointer-events:none;' +
            'animation:easterTextIn 4s ease-out 0.3s forwards;opacity:0;';
        s.textContent = '— ГЛИНА ПОМНИТ —';
        document.body.appendChild(s);

        setTimeout(function() {
            if (t.parentNode) t.remove();
            if (s.parentNode) s.remove();
        }, 4500);

        var u = document.createElement('div');
        u.style.cssText =
            'position:fixed;top:' + (IS_MOBILE ? '12px' : '20px') + ';left:50%;' +
            'transform:translateX(-50%);z-index:999999;' +
            'background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;' +
            'padding:' + (IS_MOBILE ? '12px 18px' : '16px 28px') + ';' +
            'border-radius:50px;' +
            'font-size:' + (IS_MOBILE ? '0.85rem' : '1rem') + ';' +
            'font-weight:800;' +
            'box-shadow:0 20px 60px rgba(108,99,255,0.6);' +
            'display:flex;align-items:center;gap:12px;cursor:pointer;' +
            'max-width:calc(100vw - 24px);' +
            'transition:opacity .5s ease, transform .25s ease;';
        u.innerHTML =
            '<span style="font-size:1.4rem;">🗝️</span>' +
            '<span>Секретная страница открыта!</span>' +
            '<span style="background:rgba(255,255,255,0.25);padding:6px 12px;border-radius:30px;font-size:0.8rem;">Перейти →</span>';

        u.addEventListener('click', function(e) {
            e.preventDefault();
            vibrate(20);
            window.location.href = getSecretUrl();
        });
        document.body.appendChild(u);

        setTimeout(function() {
            if (u.parentNode) {
                u.style.opacity = '0';
                setTimeout(function() { if (u.parentNode) u.remove(); }, 500);
            }
        }, IS_MOBILE ? 25000 : 20000);
    }

    // ============================================================
    // 📜 ПОСЛОВИЦЫ
    // ============================================================
    var PROVERBS = [
        { m: 'Lān sur.', r: 'Глина помнит.' },
        { m: 'Ākha kōl lān.', r: 'Вода помнит землю.' },
        { m: 'Dzen thal, mar mōr ān.', r: 'Смотри на звёзды — жизнь не умирает.' },
        { m: 'Khō mōr, dzen mōr, lān ān mōr.', r: 'Огонь умирает, звёзды умирают, память — нет.' },
        { m: 'Marzān dzen thal.', r: 'Марсиане смотрят на звёзды.' },
        { m: 'Ariya mar lān.', r: 'Помни жизнь избранных.' },
        { m: 'Kōl ghar, dzen suf.', r: 'Земля — камень, звезда — велика.' },
        { m: 'Xalmar dzen thal nu.', r: 'Древние смотрели на звёзды.' },
        { m: 'Tsen mar mōr, lān mar.', r: 'Когда жизнь умирает, память живёт.' },
        { m: 'Rōg okh thal.', r: 'Король смотрит на свой дом.' }
    ];

    var PROVERB_EXCLUDE = 'a,button,input,textarea,select,nav,header,' +
        '#mars-stars-toggle,#mobile-register-btn,#vip-cursor,' +
        '#scroll-mode-toggle,#martian-toggle,.effects-menu-btn,' +
        '.md-sidebar,.wy-nav-side,.pf-btn,.pf-tab,.pf-card,' +
        '[data-metrika-goal],.ld-modal,[id^="ld-"],[id^="qs-"]';

    function initProverbs() {
        var cnt = 0, timer = null;
        var WINDOW = IS_MOBILE ? 550 : 450;

        document.addEventListener('click', function(e) {
            if (!e.target || !e.target.closest) return;
            if (e.target.closest(PROVERB_EXCLUDE)) return;
            if (e.target.classList && (
                e.target.classList.contains('vip-spark') ||
                e.target.classList.contains('vip-cursor-ripple') ||
                e.target.classList.contains('mars-xp-particle')
            )) return;

            cnt++;
            if (timer) clearTimeout(timer);
            if (cnt >= 3) {
                cnt = 0;
                vibrate(30);
                showProverb();
            } else {
                timer = setTimeout(function() { cnt = 0; }, WINDOW);
            }
        });
    }

    function showProverb() {
        var p = PROVERBS[Math.floor(Math.random() * PROVERBS.length)];
        var el = document.createElement('div');
        el.style.cssText =
            'position:fixed;top:50%;left:50%;' +
            'transform:translate(-50%,-50%) scale(0.8);' +
            'background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;' +
            'padding:' + (IS_MOBILE ? '24px 22px' : '32px 40px') + ';' +
            'border-radius:20px;border:2px solid #6C63FF;' +
            'box-shadow:0 30px 80px rgba(0,0,0,0.6),0 0 60px rgba(108,99,255,0.4);' +
            'z-index:999999;text-align:center;' +
            'max-width:calc(100vw - 32px);' +
            'opacity:0;pointer-events:none;' +
            'transition:all 0.4s cubic-bezier(0.16,1,0.3,1);';

        el.innerHTML =
            '<div style="font-size:0.75rem;color:#A29BFE;letter-spacing:3px;margin-bottom:12px;">МАРСИАНСКАЯ МУДРОСТЬ</div>' +
            '<div style="font-size:' + (IS_MOBILE ? '1.2rem' : '1.5rem') + ';font-weight:900;font-family:Georgia,serif;letter-spacing:2px;color:#fff;margin-bottom:12px;">' + p.m + '</div>' +
            '<div style="font-size:0.9rem;color:#A29BFE;font-style:italic;">' + p.r + '</div>';

        document.body.appendChild(el);

        requestAnimationFrame(function() {
            el.style.opacity = '1';
            el.style.transform = 'translate(-50%,-50%) scale(1)';
        });

        setTimeout(function() {
            el.style.opacity = '0';
            el.style.transform = 'translate(-50%,-50%) scale(0.8)';
            setTimeout(function() { if (el.parentNode) el.remove(); }, 400);
        }, 3500);
    }

    // ============================================================
    // 🍂 СЕЗОНЫ
    // ============================================================
    function initSeasons() {
        if (REDUCED_MOTION) return;

        var mo = new Date().getMonth(), em, n;
        if (mo === 11 || mo === 0 || mo === 1) { em = '❄️'; n = 25; }
        else if (mo >= 2 && mo <= 4) { em = '🌸'; n = 20; }
        else if (mo >= 5 && mo <= 7) { em = '☀️'; n = 15; }
        else { em = '🍂'; n = 25; }
        if (IS_MOBILE) n = Math.max(6, Math.floor(n / 2));

        var key = 'seasonal_' + new Date().toDateString();
        if (safeSS_get(key)) return;

        setTimeout(function() {
            if (safeSS_get(key)) return;
            safeSS_set(key, 'true');
            showSeason(em, n);
        }, 3000);
    }

    function showSeason(em, n) {
        var c = document.createElement('div');
        c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;';
        document.body.appendChild(c);

        for (var i = 0; i < n; i++) {
            (function(idx) {
                setTimeout(function() {
                    var p = document.createElement('div');
                    var x = Math.random() * window.innerWidth;
                    var d = 6 + Math.random() * 5;
                    var s = 14 + Math.random() * 10;
                    var sw = Math.random() * 100 - 50;
                    var rot = Math.random() * 360 + 180;
                    p.style.cssText =
                        'position:absolute;top:-50px;left:' + x + 'px;' +
                        'font-size:' + s + 'px;opacity:0.85;' +
                        'animation:seasonalFall ' + d + 's linear forwards;' +
                        '--sway:' + sw + 'px;--rot:' + rot + 'deg;';
                    p.textContent = em;
                    c.appendChild(p);
                    setTimeout(function() { if (p.parentNode) p.remove(); }, d * 1000 + 100);
                }, idx * (IS_MOBILE ? 350 : 200));
            })(i);
        }
        setTimeout(function() { if (c.parentNode) c.remove(); }, 14000);
    }

    // ============================================================
    // 🎬 KEYFRAMES
    // ============================================================
    function addKeyframes() {
        if (document.getElementById('mars-keyframes')) return;
        var s = document.createElement('style');
        s.id = 'mars-keyframes';
        var vh = window.innerHeight, vw = window.innerWidth;

        s.textContent =
            '@keyframes meteorFall{' +
                '0%{transform:translate(0,0) rotate(45deg);opacity:0}' +
                '10%{opacity:1}90%{opacity:1}' +
                '100%{transform:translate(' + (vw * 0.6) + 'px,' + (vh * 1.1) + 'px) rotate(45deg);opacity:0}' +
            '}' +
            '@keyframes easterTextIn{' +
                '0%{opacity:0;transform:translate(-50%,-50%) scale(0.5)}' +
                '30%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}' +
                '70%{opacity:1;transform:translate(-50%,-50%) scale(1)}' +
                '100%{opacity:0;transform:translate(-50%,-50%) scale(1.3)}' +
            '}' +
            '@keyframes seasonalFall{' +
                '0%{transform:translate(0,0) rotate(0deg);opacity:0}' +
                '10%{opacity:0.9}' +
                '100%{transform:translate(var(--sway),' + (vh + 100) + 'px) rotate(var(--rot));opacity:0}' +
            '}';
        document.head.appendChild(s);
    }

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function init() {
        addKeyframes();
        initCursor();
        initStars();
        initEaster();
        initProverbs();
        initSeasons();
        unlockAudioOnce();
        log('загружены');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 🆕 Cleanup при уходе со страницы
    window.addEventListener('pagehide', function() {
        if (starsRAF) { cancelAnimationFrame(starsRAF); starsRAF = null; }
    });

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsEasterEggs = {
        trigger: triggerMeteor,
        proverb: showProverb,

        /**
         * Включить звёзды.
         * @param {Object} opts - {silent: true} — без звука (для инициализации)
         */
        starsOn: function(opts) {
            opts = opts || {};
            safeLS_set(STARS_KEY, 'true');
            createStars(!opts.silent); // silent=true → playSound=false
            var btn = document.getElementById('mars-stars-toggle');
            if (btn) {
                btn.textContent = '🌟';
                btn.setAttribute('aria-pressed', 'true');
            }
        },

        starsOff: function() {
            safeLS_set(STARS_KEY, 'false');
            removeStars();
            var btn = document.getElementById('mars-stars-toggle');
            if (btn) {
                btn.textContent = '⭐';
                btn.setAttribute('aria-pressed', 'false');
            }
        },

        isStarsOn: function() { return safeLS_get(STARS_KEY) === 'true'; },

        // 🆕 Debug
        isAudioUnlocked: function() { return audioUnlocked; }
    };

    if (DEBUG) console.log('✅ easter-eggs.js v3 VIP загружен');
})();
