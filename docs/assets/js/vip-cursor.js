// ============================================================
// vip-cursor.js — v6 "Trail Mars"
// Маленький Марс + видимый шлейф
// ============================================================
(function() {
    'use strict';

    if (window.__vipCursorLoaded) return;
    window.__vipCursorLoaded = true;

    function isTouchDevice() {
        if ('ontouchstart' in window && navigator.maxTouchPoints > 1) return true;
        if (navigator.maxTouchPoints > 1 && window.innerWidth < 1024) return true;
        return false;
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    if (isTouchDevice()) return;

    var REDUCED_MOTION = prefersReducedMotion();

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var CONFIG = {
        cursorSize: 22,
        cursorSizeHover: 28,

        // ⚡ СКОРОСТЬ — чем выше, тем резче следует за мышью
        followSpeed: 0.85,        // было 0.5, теперь почти моментально
        scaleSpeed: 0.28,

        colorDark: '#7f1d1d',
        colorMid: '#c0392b',
        colorLight: '#e74c3c',
        colorHighlight: '#ff9060',
        ringColor: 'rgba(243, 156, 18, 0.45)',

        // ✨ ШЛЕЙФ — мини-Марсы позади
        trailEnabled: !REDUCED_MOTION,
        trailSize: 10,            // размер мини-Марса
        trailLife: 900,           // мс — сколько живёт
        trailMax: 28,             // максимум одновременно
        trailMinDist: 6,          // минимальная дистанция между точками шлейфа

        // ✨ СПАРКИ — искры как раньше, но крупнее
        sparksEnabled: !REDUCED_MOTION,
        sparkSize: 4,
        sparkLife: 1100,
        sparkMax: 24,
        sparkMinDist: 12,

        hoverTargets: 'a, button, .pf-btn, .pf-tab, .pf-quick-card, .pf-mypage-action, [role="button"], .wy-menu-vertical a, .md-nav__link, input, textarea, select',
        posKey: 'mars_cursor_pos',
        fallbackShowMs: 1500,
        saveThrottleMs: 250
    };

    // ============================================================
    // 💾 Позиция
    // ============================================================
    function loadPos() {
        try {
            var raw = sessionStorage.getItem(CONFIG.posKey);
            if (!raw) return null;
            var p = JSON.parse(raw);
            if (p && typeof p.x === 'number' && typeof p.y === 'number'
                && p.x > 0 && p.y > 0
                && p.x < window.innerWidth + 100 && p.y < window.innerHeight + 100) return p;
        } catch(e) {}
        return null;
    }

    var _saveTimer = null;
    function savePos(x, y) {
        if (_saveTimer) return;
        _saveTimer = setTimeout(function() {
            _saveTimer = null;
            try { sessionStorage.setItem(CONFIG.posKey, JSON.stringify({ x: x, y: y })); } catch(e) {}
        }, CONFIG.saveThrottleMs);
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('vip-cursor-style')) return;
        var s = document.createElement('style');
        s.id = 'vip-cursor-style';
        s.textContent = `
            body.vip-cursor-on,
            body.vip-cursor-on * { cursor: none !important; }
            body.vip-cursor-on input,
            body.vip-cursor-on textarea,
            body.vip-cursor-on select,
            body.vip-cursor-on [contenteditable="true"] { cursor: text !important; }

            /* ========== КУРСОР ========== */
            #vip-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: ${CONFIG.cursorSize}px;
                height: ${CONFIG.cursorSize}px;
                pointer-events: none;
                z-index: 2147483646;
                transform: translate3d(-200px,-200px,0) translate(-50%,-50%);
                will-change: transform;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%,
                    ${CONFIG.colorHighlight} 0%,
                    ${CONFIG.colorLight} 22%,
                    ${CONFIG.colorMid} 55%,
                    ${CONFIG.colorDark} 100%);
                box-shadow:
                    0 0 10px rgba(231, 76, 60, 0.55),
                    0 0 22px rgba(231, 76, 60, 0.3),
                    0 0 44px rgba(231, 76, 60, 0.15),
                    inset -3px -3px 6px rgba(0, 0, 0, 0.55),
                    inset 2px 2px 5px rgba(255, 150, 100, 0.3);
                transition: opacity .2s ease, box-shadow .2s ease;
                opacity: 0;
            }
            #vip-cursor.ready { opacity: 1; }

            #vip-cursor::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background:
                    radial-gradient(ellipse 3px 2px at 25% 30%, rgba(120,40,20,.75), transparent 70%),
                    radial-gradient(ellipse 4px 3px at 65% 55%, rgba(120,40,20,.65), transparent 70%),
                    radial-gradient(ellipse 2.5px 2px at 40% 75%, rgba(120,40,20,.6), transparent 70%),
                    radial-gradient(ellipse 3.5px 2.5px at 70% 25%, rgba(120,40,20,.55), transparent 70%);
                animation: marsSpin 14s linear infinite;
            }

            #vip-cursor::after {
                content: '';
                position: absolute;
                top: 50%; left: 50%;
                width: calc(100% + 10px);
                height: calc(100% + 10px);
                border-radius: 50%;
                border: 1px dashed ${CONFIG.ringColor};
                transform: translate(-50%,-50%) rotateX(72deg);
                animation: marsRingSpin 9s linear infinite;
                pointer-events: none;
            }

            @keyframes marsSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
            @keyframes marsRingSpin {
                from { transform: translate(-50%,-50%) rotateX(72deg) rotateZ(0); }
                to   { transform: translate(-50%,-50%) rotateX(72deg) rotateZ(360deg); }
            }

            #vip-cursor.hover {
                box-shadow:
                    0 0 14px rgba(231,76,60,.8),
                    0 0 28px rgba(231,76,60,.5),
                    0 0 56px rgba(231,76,60,.25),
                    inset -3px -3px 6px rgba(0,0,0,.55),
                    inset 2px 2px 5px rgba(255,150,100,.4);
            }
            #vip-cursor.hover::after {
                border-color: rgba(243,156,18,.75);
                border-width: 1.5px;
            }
            #vip-cursor.click {
                box-shadow:
                    0 0 18px rgba(243,156,18,.95),
                    0 0 36px rgba(243,156,18,.55),
                    0 0 72px rgba(243,156,18,.3),
                    inset -4px -4px 8px rgba(0,0,0,.6);
            }

            /* ========== ШЛЕЙФ (мини-Марсы) ========== */
            .vip-trail {
                position: fixed;
                top: 0; left: 0;
                width: ${CONFIG.trailSize}px;
                height: ${CONFIG.trailSize}px;
                pointer-events: none;
                z-index: 2147483644;
                border-radius: 50%;
                background: radial-gradient(circle at 35% 35%,
                    ${CONFIG.colorHighlight} 0%,
                    ${CONFIG.colorLight} 25%,
                    ${CONFIG.colorMid} 60%,
                    ${CONFIG.colorDark} 100%);
                box-shadow:
                    0 0 8px rgba(231,76,60,.6),
                    0 0 16px rgba(231,76,60,.35);
                will-change: transform, opacity;
            }

            /* ========== СПАРКИ (искры) ========== */
            .vip-spark {
                position: fixed;
                top: 0; left: 0;
                width: ${CONFIG.sparkSize}px;
                height: ${CONFIG.sparkSize}px;
                background: ${CONFIG.colorHighlight};
                border-radius: 50%;
                pointer-events: none;
                z-index: 2147483645;
                will-change: transform, opacity;
                box-shadow: 0 0 10px ${CONFIG.colorHighlight};
            }

            @media (prefers-reduced-motion: reduce) {
                #vip-cursor, #vip-cursor::before, #vip-cursor::after {
                    animation: none !important;
                    transition: none !important;
                }
                .vip-spark, .vip-trail { display: none !important; }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🖱️ Состояние
    // ============================================================
    var cursor = null;
    var mouseX = -200, mouseY = -200;
    var cursorX = -200, cursorY = -200;
    var targetScale = 1;
    var currentScale = 1;
    var rafId = null;
    var isActive = true;
    var isVisible = false;

    var hoveredEl = null;
    var fallbackTimer = null;

    // Шлейф
    var trailCount = 0;
    var lastTrailX = 0, lastTrailY = 0;
    var trailPool = [];

    // Спарки
    var sparkCount = 0;
    var lastSparkX = 0, lastSparkY = 0;
    var lastMoveX = 0, lastMoveY = 0;
    var sparkPool = [];

    function showCursor(x, y) {
        if (!cursor || isVisible) return;
        isVisible = true;
        cursorX = mouseX = lastMoveX = lastTrailX = lastSparkX = x;
        cursorY = mouseY = lastMoveY = lastTrailY = lastSparkY = y;

        var prevTrans = cursor.style.transition;
        cursor.style.transition = 'none';
        cursor.style.transform =
            'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%) scale(1)';
        cursor.classList.add('ready');
        void cursor.offsetWidth;
        cursor.style.transition = prevTrans || '';
    }

    // ============================================================
    // 🌫️ ШЛЕЙФ — мини-Марсы позади
    // ============================================================
    function getTrail() {
        if (trailPool.length > 0) return trailPool.pop();
        var t = document.createElement('div');
        t.className = 'vip-trail';
        return t;
    }

    function releaseTrail(el) {
        el.remove();
        if (trailPool.length < 40) trailPool.push(el);
    }

    function spawnTrail(x, y) {
        if (!CONFIG.trailEnabled) return;
        if (trailCount >= CONFIG.trailMax) return;

        var dx = x - lastTrailX;
        var dy = y - lastTrailY;
        if (Math.sqrt(dx * dx + dy * dy) < CONFIG.trailMinDist) return;

        lastTrailX = x;
        lastTrailY = y;
        trailCount++;

        var t = getTrail();
        t.style.transition = 'none';
        t.style.opacity = '0.7';
        t.style.transform = 'translate3d(' + (x - CONFIG.trailSize / 2) + 'px,' + (y - CONFIG.trailSize / 2) + 'px,0) scale(1)';
        document.body.appendChild(t);

        void t.offsetWidth;

        var life = CONFIG.trailLife;
        t.style.transition = 'transform ' + life + 'ms ease-out, opacity ' + life + 'ms ease-out';
        // Улетает чуть назад и уменьшается
        t.style.transform =
            'translate3d(' +
                (x - CONFIG.trailSize / 2 - dx * 1.5) + 'px,' +
                (y - CONFIG.trailSize / 2 - dy * 1.5) + 'px,0) scale(0.2)';
        t.style.opacity = '0';

        setTimeout(function() {
            releaseTrail(t);
            trailCount--;
        }, life);
    }

    // ============================================================
    // ✨ СПАРКИ
    // ============================================================
    function getSpark() {
        if (sparkPool.length > 0) return sparkPool.pop();
        var s = document.createElement('div');
        s.className = 'vip-spark';
        return s;
    }

    function releaseSpark(el) {
        el.remove();
        if (sparkPool.length < 40) sparkPool.push(el);
    }

    function spawnSpark(x, y, dx, dy) {
        if (!CONFIG.sparksEnabled) return;
        if (sparkCount >= CONFIG.sparkMax) return;

        var sdx = x - lastSparkX;
        var sdy = y - lastSparkY;
        if (Math.sqrt(sdx * sdx + sdy * sdy) < CONFIG.sparkMinDist) return;

        lastSparkX = x;
        lastSparkY = y;
        sparkCount++;

        var s = getSpark();
        s.style.transition = 'none';
        s.style.opacity = '1';
        s.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(1)';
        document.body.appendChild(s);

        void s.offsetWidth;

        var life = CONFIG.sparkLife;
        s.style.transition = 'transform ' + life + 'ms cubic-bezier(.16,1,.3,1), opacity ' + life + 'ms ease-out';
        s.style.transform =
            'translate3d(' + (x - dx * 3) + 'px,' + (y - dy * 3) + 'px,0) scale(0)';
        s.style.opacity = '0';

        setTimeout(function() {
            releaseSpark(s);
            sparkCount--;
        }, life);
    }

    // ============================================================
    // 🔄 RAF
    // ============================================================
    function tick() {
        if (!isActive) { rafId = null; return; }

        if (isVisible) {
            // ⚡ Более резкое следование
            cursorX += (mouseX - cursorX) * CONFIG.followSpeed;
            cursorY += (mouseY - cursorY) * CONFIG.followSpeed;
        }

        currentScale += (targetScale - currentScale) * CONFIG.scaleSpeed;

        if (cursor && isVisible) {
            cursor.style.transform =
                'translate3d(' + cursorX.toFixed(2) + 'px,' + cursorY.toFixed(2) + 'px,0) translate(-50%,-50%) scale(' + currentScale.toFixed(3) + ')';
        }

        if (isVisible) {
            var dx = mouseX - lastMoveX;
            var dy = mouseY - lastMoveY;
            var speed = Math.sqrt(dx * dx + dy * dy);
            if (speed > 1.5) {
                // Шлейф — на каждое движение
                spawnTrail(mouseX, mouseY);
                // Спарки — только на быстрых движениях
                if (speed > 6) spawnSpark(mouseX, mouseY, dx, dy);
                lastMoveX = mouseX;
                lastMoveY = mouseY;
            }
        }

        rafId = requestAnimationFrame(tick);
    }

    function startLoop() {
        if (rafId == null && isActive) rafId = requestAnimationFrame(tick);
    }

    // ============================================================
    // 🖱️ Обработчики
    // ============================================================
    function onMouseMove(e) {
        if (!isVisible) {
            if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = null; }
            showCursor(e.clientX, e.clientY);
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
        savePos(mouseX, mouseY);

        var hover = e.target && e.target.closest && e.target.closest(CONFIG.hoverTargets);
        if (hover !== hoveredEl) {
            hoveredEl = hover;
            if (cursor) {
                cursor.classList.toggle('hover', !!hover);
                targetScale = hover ? (CONFIG.cursorSizeHover / CONFIG.cursorSize) : 1;
            }
        }
    }

    function onMouseDown() {
        if (!cursor || !isVisible) return;
        cursor.classList.add('click');
        targetScale = 0.85;
    }

    function onMouseUp() {
        if (!cursor || !isVisible) return;
        cursor.classList.remove('click');
        targetScale = hoveredEl ? (CONFIG.cursorSizeHover / CONFIG.cursorSize) : 1;
    }

    function onMouseLeaveDoc() {
        if (cursor) cursor.classList.remove('ready');
        isVisible = false;
    }

    function onMouseEnterDoc(e) {
        if (!isVisible && e.clientX > 0 && e.clientY > 0) showCursor(e.clientX, e.clientY);
    }

    function onVisibilityChange() {
        isActive = !document.hidden;
        if (isActive) startLoop();
        else if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    function init() {
        injectStyles();

        cursor = document.createElement('div');
        cursor.id = 'vip-cursor';
        document.body.appendChild(cursor);
        document.body.classList.add('vip-cursor-on');

        var saved = loadPos();
        if (saved) {
            showCursor(saved.x, saved.y);
        } else {
            fallbackTimer = setTimeout(function() {
                if (!isVisible) showCursor(window.innerWidth / 2, window.innerHeight / 2);
            }, CONFIG.fallbackShowMs);
        }

        document.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mousedown', onMouseDown, { passive: true });
        document.addEventListener('mouseup', onMouseUp, { passive: true });
        document.addEventListener('mouseleave', onMouseLeaveDoc);
        document.addEventListener('mouseenter', onMouseEnterDoc);
        document.addEventListener('visibilitychange', onVisibilityChange);

        startLoop();
        console.log('🪐 vip-cursor v6 Trail Mars активен');
    }

    // ============================================================
    // 🛑 Destroy
    // ============================================================
    function destroy() {
        isActive = false;
        if (fallbackTimer) clearTimeout(fallbackTimer);
        if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseleave', onMouseLeaveDoc);
        document.removeEventListener('mouseenter', onMouseEnterDoc);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (cursor && cursor.parentNode) cursor.remove();
        document.body.classList.remove('vip-cursor-on');
        document.querySelectorAll('.vip-spark, .vip-trail').forEach(function(el) { el.remove(); });
        cursor = null;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.marsVipCursor = {
        destroy: destroy,
        isActive: function() { return isActive; }
    };
})();
