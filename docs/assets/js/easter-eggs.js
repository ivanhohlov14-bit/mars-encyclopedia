// easter-eggs.js — пасхалки (короткая версия, CSS вынесен отдельно)
(function() {
    'use strict';

    var STORAGE_KEY = 'mars_secret_unlocked';
    var STARS_KEY = 'mars_stars_enabled';
    var IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    function getBasePath() {
        return window.location.pathname.replace(/\/[^\/]*\/?$/, '') || '';
    }
    function vibrate(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch(e) {} }

    // ============ АУДИО ============
    var audioCtx = null;
    function getAudioCtx() {
        if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; } }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
        return audioCtx;
    }
    function unlockAudio() {
        function un() {
            var c = getAudioCtx();
            if (c && c.state === 'suspended') c.resume();
            document.removeEventListener('touchstart', un);
            document.removeEventListener('click', un);
        }
        document.addEventListener('touchstart', un, { passive: true });
        document.addEventListener('click', un);
    }

    // ============ КУРСОР ============
    function initCursor() {
        if (IS_MOBILE) return;
        var s = document.createElement('style');
        s.textContent = '*{cursor:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><radialGradient id="mg" cx="35%" cy="35%"><stop offset="0%" stop-color="%23e74c3c"/><stop offset="100%" stop-color="%237f1d1d"/></radialGradient></defs><circle cx="16" cy="16" r="12" fill="url(%23mg)" stroke="%234a1010" stroke-width="1"/><ellipse cx="11" cy="12" rx="3" ry="2" fill="%23922b1f" opacity="0.6"/><ellipse cx="20" cy="18" rx="4" ry="2.5" fill="%23922b1f" opacity="0.5"/></svg>\') 16 16,auto !important;}a,button,.md-nav__link{cursor:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><defs><radialGradient id="mg2" cx="35%" cy="35%"><stop offset="0%" stop-color="%23f39c12"/><stop offset="100%" stop-color="%23c0392b"/></radialGradient></defs><circle cx="18" cy="18" r="14" fill="url(%23mg2)" stroke="%23a04000" stroke-width="1.5"/></svg>\') 18 18,pointer !important;}input,textarea{cursor:text !important;}';
        document.head.appendChild(s);
    }

    // ============ ЗВЁЗДЫ ============
    var starsCanvas = null, starsRAF = null;

    function initStars() {
        if (localStorage.getItem(STARS_KEY) === 'true') createStars(false);
        createToggle();
    }

    function createStars(play) {
        if (starsCanvas) return;
        document.body.classList.add('mars-stars-on');
        document.documentElement.classList.add('mars-stars-on');
        if (play) playStarsOn();

        starsCanvas = document.createElement('canvas');
        starsCanvas.id = 'mars-stars-canvas';
        starsCanvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;';
        document.body.appendChild(starsCanvas);

        var ctx = starsCanvas.getContext('2d');
        var dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.5 : 2);
        var stars = [], shots = [];

        function resize() {
            var w = window.innerWidth, h = window.innerHeight;
            starsCanvas.width = w * dpr; starsCanvas.height = h * dpr;
            starsCanvas.style.width = w + 'px'; starsCanvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            stars = [];
            var n = Math.floor((w * h) / (IS_MOBILE ? 15000 : 6000));
            for (var i = 0; i < n; i++) {
                stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.4, a: Math.random() * 0.7 + 0.3, sp: Math.random() * 0.02 + 0.005, tw: Math.random() * 6.28 });
            }
        }
        function spawnShot() {
            shots.push({ x: Math.random() * window.innerWidth * 0.8, y: -50, len: 80 + Math.random() * 100, sp: 6 + Math.random() * 8, ang: 0.785 + (Math.random() * 0.2 - 0.1), life: 1 });
        }
        function draw() {
            if (!starsCanvas) return;
            var w = window.innerWidth, h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);
            for (var i = 0; i < stars.length; i++) {
                var s = stars[i];
                s.tw += s.sp;
                var al = s.a * (0.5 + 0.5 * Math.sin(s.tw));
                if (s.r > 1) { ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3, 0, 6.28); ctx.fillStyle = 'rgba(162,155,254,' + (al * 0.15) + ')'; ctx.fill(); }
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fillStyle = 'rgba(255,255,255,' + al + ')'; ctx.fill();
            }
            shots = shots.filter(function(x) { return x.life > 0; });
            for (var j = 0; j < shots.length; j++) {
                var sh = shots[j];
                sh.x += Math.cos(sh.ang) * sh.sp; sh.y += Math.sin(sh.ang) * sh.sp; sh.life -= 0.01;
                var tx = sh.x - Math.cos(sh.ang) * sh.len, ty = sh.y - Math.sin(sh.ang) * sh.len;
                var g = ctx.createLinearGradient(tx, ty, sh.x, sh.y);
                g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,200,' + sh.life + ')');
                ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(sh.x, sh.y); ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.stroke();
            }
            starsRAF = requestAnimationFrame(draw);
        }
        function loopShots() {
            if (!starsCanvas) return;
            setTimeout(function() { if (starsCanvas) { spawnShot(); loopShots(); } }, 4000 + Math.random() * 6000);
        }
        resize();
        window.addEventListener('resize', resize);
        draw(); loopShots();
    }

    function removeStars() {
        document.body.classList.remove('mars-stars-on');
        document.documentElement.classList.remove('mars-stars-on');
        if (starsRAF) { cancelAnimationFrame(starsRAF); starsRAF = null; }
        if (starsCanvas) { var c = starsCanvas; c.style.opacity = '0'; setTimeout(function() { if (c.parentNode) c.parentNode.removeChild(c); }, 300); starsCanvas = null; }
    }

    function createToggle() {
        if (document.getElementById('mars-stars-toggle')) return;
        var btn = document.createElement('button');
        btn.id = 'mars-stars-toggle';
        btn.setAttribute('aria-label', 'Звёздное небо');
        var on = localStorage.getItem(STARS_KEY) === 'true';
        btn.innerHTML = on ? '🌟' : '⭐';
        var size = IS_MOBILE ? 56 : 52;
        var bottom = IS_MOBILE ? 'calc(80px + env(safe-area-inset-bottom,0px))' : '90px';
        var right = IS_MOBILE ? 'calc(16px + env(safe-area-inset-right,0px))' : '20px';
        btn.style.cssText = 'position:fixed;bottom:' + bottom + ';right:' + right + ';width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:linear-gradient(135deg,#1a1a2e,#16213e);border:2px solid #6C63FF;color:#fff;font-size:' + (IS_MOBILE ? '1.6' : '1.5') + 'rem;cursor:pointer;z-index:99999;box-shadow:0 8px 24px rgba(108,99,255,0.5);display:flex;align-items:center;justify-content:center;padding:0;touch-action:manipulation;';

        var last = 0;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var now = Date.now(); if (now - last < 400) return; last = now;
            vibrate(20);
            if (localStorage.getItem(STARS_KEY) === 'true') {
                localStorage.setItem(STARS_KEY, 'false');
                removeStars(); playStarsOff(); btn.innerHTML = '⭐';
            } else {
                localStorage.setItem(STARS_KEY, 'true');
                createStars(true); btn.innerHTML = '🌟';
            }
        });
        document.body.appendChild(btn);
    }

    // ============ ЗВУКИ ============
    function playStarsOn() {
        var c = getAudioCtx(); if (!c) return;
        var t = c.currentTime;
        [220, 277.18, 329.63, 440, 554.37].forEach(function(f, i) {
            var o = c.createOscillator(), g = c.createGain();
            o.type = 'sine'; o.frequency.value = f;
            var s = t + i * 0.13;
            g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(0.12, s + 0.04); g.gain.exponentialRampToValueAtTime(0.001, s + 1.6);
            o.connect(g); g.connect(c.destination); o.start(s); o.stop(s + 1.6);
        });
    }
    function playStarsOff() {
        var c = getAudioCtx(); if (!c) return;
        var o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(554.37, c.currentTime); o.frequency.exponentialRampToValueAtTime(110, c.currentTime + 0.9);
        g.gain.setValueAtTime(0.1, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.9);
        o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.9);
    }
    function playEaster() {
        var c = getAudioCtx(); if (!c) return;
        [261.63, 329.63, 392, 523.25].forEach(function(f, i) {
            setTimeout(function() {
                var o = c.createOscillator(), g = c.createGain();
                o.type = 'triangle'; o.frequency.value = f;
                g.gain.setValueAtTime(0.15, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.8);
                o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.8);
            }, i * 120);
        });
    }

    // ============ LANSUR ============
    function initEaster() {
        var buf = '', SECRET = 'LANSUR';
        document.addEventListener('keydown', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            buf += e.key.toUpperCase();
            if (buf.length > SECRET.length) buf = buf.slice(-SECRET.length);
            if (buf === SECRET) { buf = ''; triggerMeteor(); }
        });

        var tY = 0, tC = 0;
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length === 3) { tY = e.touches[0].clientY; tC = 3; }
        }, { passive: true });
        document.addEventListener('touchend', function(e) {
            if (tC === 3) { if (tY - e.changedTouches[0].clientY > 100) { vibrate(50); triggerMeteor(); } }
            tC = 0;
        }, { passive: true });

        if (IS_MOBILE) {
            var lt = null;
            var sels = ['.md-header', '.wy-nav-top', 'header', '.md-header__title'];
            function attach(el) {
                if (!el || el.dataset.lansur) return;
                el.dataset.lansur = '1';
                el.addEventListener('touchstart', function() {
                    lt = setTimeout(function() { lt = null; vibrate([30, 50, 30]); triggerMeteor(); }, 1500);
                }, { passive: true });
                ['touchend', 'touchmove', 'touchcancel'].forEach(function(ev) {
                    el.addEventListener(ev, function() { if (lt) { clearTimeout(lt); lt = null; } }, { passive: true });
                });
            }
            setTimeout(function() { sels.forEach(function(s) { document.querySelectorAll(s).forEach(attach); }); }, 500);
        }
    }

    function triggerMeteor() {
        localStorage.setItem(STORAGE_KEY, 'true');
        playEaster();
        var n = IS_MOBILE ? 18 : 40;
        var c = document.createElement('div');
        c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99998;overflow:hidden;';
        document.body.appendChild(c);
        for (var i = 0; i < n; i++) setTimeout((function() { return function() { createMeteor(c); }; })(), i * (IS_MOBILE ? 130 : 80));
        showText();
        setTimeout(function() { c.remove(); }, 8000);
    }

    function createMeteor(c) {
        var m = document.createElement('div');
        var sx = Math.random() * window.innerWidth * 1.2 - window.innerWidth * 0.1;
        var sy = -100 - Math.random() * 200;
        var dur = 1.5 + Math.random() * 1.5;
        var sz = 3 + Math.random() * 4;
        m.style.cssText = 'position:absolute;left:' + sx + 'px;top:' + sy + 'px;width:' + sz + 'px;height:' + sz + 'px;background:#fff;border-radius:50%;box-shadow:0 0 ' + (sz * 3) + 'px ' + sz + 'px rgba(255,255,255,0.9),0 0 ' + (sz * 6) + 'px ' + (sz * 2) + 'px rgba(255,200,100,0.6);animation:meteorFall ' + dur + 's linear forwards;';
        var tail = document.createElement('div');
        tail.style.cssText = 'position:absolute;top:50%;right:0;width:' + (50 + Math.random() * 80) + 'px;height:2px;background:linear-gradient(270deg,rgba(255,255,255,0.9),rgba(255,200,100,0.6),transparent);transform:translateY(-50%);border-radius:2px;';
        m.appendChild(tail); c.appendChild(m);
    }

    function showText() {
        var t = document.createElement('div');
        t.style.cssText = 'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);font-size:clamp(2rem,8vw,5rem);font-weight:900;color:#fff;text-shadow:0 0 20px #6C63FF,0 0 40px #6C63FF,0 0 60px #e74c3c;letter-spacing:8px;z-index:99999;pointer-events:none;animation:easterTextIn 4s ease-out forwards;font-family:Georgia,serif;white-space:nowrap;';
        t.textContent = 'LĀN SUR';
        document.body.appendChild(t);

        var s = document.createElement('div');
        s.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:clamp(0.9rem,3vw,1.4rem);font-weight:600;color:#A29BFE;text-shadow:0 0 20px rgba(162,155,254,0.8);letter-spacing:4px;z-index:99999;pointer-events:none;animation:easterTextIn 4s ease-out 0.3s forwards;opacity:0;';
        s.textContent = '— ГЛИНА ПОМНИТ —';
        document.body.appendChild(s);

        setTimeout(function() { t.remove(); s.remove(); }, 4500);

        var u = document.createElement('div');
        u.style.cssText = 'position:fixed;top:' + (IS_MOBILE ? '12px' : '20px') + ';left:50%;transform:translateX(-50%);z-index:999999;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;padding:' + (IS_MOBILE ? '12px 18px' : '16px 28px') + ';border-radius:50px;font-size:' + (IS_MOBILE ? '0.85rem' : '1rem') + ';font-weight:800;box-shadow:0 20px 60px rgba(108,99,255,0.6);display:flex;align-items:center;gap:12px;cursor:pointer;max-width:calc(100vw - 24px);';
        u.innerHTML = '<span style="font-size:1.4rem;">🗝️</span><span>Секретная страница открыта!</span><span style="background:rgba(255,255,255,0.25);padding:6px 12px;border-radius:30px;font-size:0.8rem;">Перейти →</span>';
        u.addEventListener('click', function(e) { e.preventDefault(); vibrate(20); window.location.href = getBasePath() + '/secret/'; });
        document.body.appendChild(u);

        setTimeout(function() {
            if (u.parentNode) { u.style.transition = 'all 0.5s'; u.style.opacity = '0'; setTimeout(function() { u.remove(); }, 500); }
        }, IS_MOBILE ? 25000 : 20000);
    }

    // ============ ПОСЛОВИЦЫ ============
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

    function initProverbs() {
        var cnt = 0, timer = null, WINDOW = IS_MOBILE ? 550 : 450;
        document.addEventListener('click', function(e) {
            if (e.target.closest('a,button,input,textarea,nav,header,#mars-stars-toggle,#mobile-register-btn,.md-sidebar,.wy-nav-side')) return;
            cnt++;
            if (timer) clearTimeout(timer);
            if (cnt >= 3) { cnt = 0; vibrate(30); showProverb(); }
            else timer = setTimeout(function() { cnt = 0; }, WINDOW);
        });
    }

    function showProverb() {
        var p = PROVERBS[Math.floor(Math.random() * PROVERBS.length)];
        var el = document.createElement('div');
        el.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.8);background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;padding:' + (IS_MOBILE ? '24px 22px' : '32px 40px') + ';border-radius:20px;border:2px solid #6C63FF;box-shadow:0 30px 80px rgba(0,0,0,0.6),0 0 60px rgba(108,99,255,0.4);z-index:999999;text-align:center;max-width:calc(100vw - 32px);opacity:0;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;';
        el.innerHTML = '<div style="font-size:0.75rem;color:#A29BFE;letter-spacing:3px;margin-bottom:12px;">МАРСИАНСКАЯ МУДРОСТЬ</div>' +
            '<div style="font-size:' + (IS_MOBILE ? '1.2rem' : '1.5rem') + ';font-weight:900;font-family:Georgia,serif;letter-spacing:2px;color:#fff;margin-bottom:12px;">' + p.m + '</div>' +
            '<div style="font-size:0.9rem;color:#A29BFE;font-style:italic;">' + p.r + '</div>';
        document.body.appendChild(el);
        requestAnimationFrame(function() { el.style.opacity = '1'; el.style.transform = 'translate(-50%,-50%) scale(1)'; });
        setTimeout(function() {
            el.style.opacity = '0'; el.style.transform = 'translate(-50%,-50%) scale(0.8)';
            setTimeout(function() { el.remove(); }, 400);
        }, 3500);
    }

    // ============ СЕЗОНЫ ============
    function initSeasons() {
        var mo = new Date().getMonth(), em, n;
        if (mo === 11 || mo === 0 || mo === 1) { em = '❄️'; n = 25; }
        else if (mo >= 2 && mo <= 4) { em = '🌸'; n = 20; }
        else if (mo >= 5 && mo <= 7) { em = '☀️'; n = 15; }
        else { em = '🍂'; n = 25; }
        if (IS_MOBILE) n = Math.max(6, Math.floor(n / 2));
        var key = 'seasonal_' + new Date().toDateString();
        if (sessionStorage.getItem(key)) return;
        setTimeout(function() {
            if (sessionStorage.getItem(key)) return;
            sessionStorage.setItem(key, 'true');
            showSeason(em, n);
        }, 3000);
    }

    function showSeason(em, n) {
        var c = document.createElement('div');
        c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;';
        document.body.appendChild(c);
        for (var i = 0; i < n; i++) {
            (function() {
                setTimeout(function() {
                    var p = document.createElement('div');
                    var x = Math.random() * window.innerWidth, d = 6 + Math.random() * 5, s = 14 + Math.random() * 10;
                    var sw = Math.random() * 100 - 50, rot = Math.random() * 360 + 180;
                    p.style.cssText = 'position:absolute;top:-50px;left:' + x + 'px;font-size:' + s + 'px;opacity:0.85;animation:seasonalFall ' + d + 's linear forwards;--sway:' + sw + 'px;--rot:' + rot + 'deg;';
                    p.textContent = em;
                    c.appendChild(p);
                    setTimeout(function() { p.remove(); }, d * 1000 + 100);
                }, i * (IS_MOBILE ? 350 : 200));
            })();
        }
        setTimeout(function() { c.remove(); }, 14000);
    }

    // ============ КЛЮЧЕВЫЕ КАДРЫ ============
    function addKeyframes() {
        if (document.getElementById('mars-keyframes')) return;
        var s = document.createElement('style');
        s.id = 'mars-keyframes';
        var vh = window.innerHeight, vw = window.innerWidth;
        s.textContent =
            '@keyframes meteorFall{0%{transform:translate(0,0) rotate(45deg);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translate(' + vw * 0.6 + 'px,' + vh * 1.1 + 'px) rotate(45deg);opacity:0}}' +
            '@keyframes easterTextIn{0%{opacity:0;transform:translate(-50%,-50%) scale(0.5)}30%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}70%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.3)}}' +
            '@keyframes seasonalFall{0%{transform:translate(0,0) rotate(0deg);opacity:0}10%{opacity:0.9}100%{transform:translate(var(--sway),' + (vh + 100) + 'px) rotate(var(--rot));opacity:0}}';
        document.head.appendChild(s);
    }

    // ============ СТАРТ ============
    function init() {
        addKeyframes();
        initCursor();
        initStars();
        initEaster();
        initProverbs();
        initSeasons();
        unlockAudio();
        console.log('%c🎬 Easter eggs загружены', 'color:#6C63FF;font-weight:bold;');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
