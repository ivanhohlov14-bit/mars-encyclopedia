// ============================================================
// vip-cursor.js — v4 "Mars Mini"
// Маленький Марс 22px, без прыжка в центр при загрузке
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
    // ⚙️ Конфиг — компактный Марс
    // ============================================================
    var CONFIG = {
        cursorSize: 22,              // ⬅ уменьшено с 44
        cursorSizeHover: 28,         // ⬅ 28 вместо 56
        colorDark: '#7f1d1d',
        colorMid: '#c0392b',
        colorLight: '#e74c3c',
        colorHighlight: '#ff9060',
        ringColor: 'rgba(243, 156, 18, 0.45)',
        sparkColor: '#ff9060',
        sparkSize: 3,
        sparkLife: 700,
        sparkMax: 20,
        sparkSpawnDistance: 10,
        sparksEnabled: !REDUCED_MOTION,
        hoverTargets: 'a, button, .pf-btn, .pf-tab, .pf-quick-card, .pf-mypage-action, [role="button"], .wy-menu-vertical a, .md-nav__link, input, textarea, select',
        posKey: 'mars_cursor_pos'
    };

    // ============================================================
    // 💾 Последняя позиция мыши (между страницами)
    // ============================================================
    function loadPos() {
        try {
            var raw = sessionStorage.getItem(CONFIG.posKey);
            if (!raw) return null;
            var p = JSON.parse(raw);
            if (p && typeof p.x === 'number' && typeof p.y === 'number') return p;
        } catch(e) {}
        return null;
    }
    function savePos(x, y) {
        try { sessionStorage.setItem(CONFIG.posKey, JSON.stringify({ x: x, y: y })); } catch(e) {}
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

            #vip-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: ${CONFIG.cursorSize}px;
                height: ${CONFIG.cursorSize}px;
                pointer-events: none;
                z-index: 2147483646;
                transform: translate3d(-200px, -200px, 0) translate(-50%, -50%);
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
                transition: width .2s cubic-bezier(.16,1,.3,1),
                            height .2s cubic-bezier(.16,1,.3,1),
                            box-shadow .2s ease;
                opacity: 0;
            }
            #vip-cursor.ready { opacity: 1; }

            /* Кратеры */
            #vip-cursor::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background:
                    radial-gradient(ellipse 3px 2px at 25% 30%, rgba(120, 40, 20, 0.75), transparent 70%),
                    radial-gradient(ellipse 4px 3px at 65% 55%, rgba(120, 40, 20, 0.65), transparent 70%),
                    radial-gradient(ellipse 2.5px 2px at 40% 75%, rgba(120, 40, 20, 0.6), transparent 70%),
                    radial-gradient(ellipse 3.5px 2.5px at 70% 25%, rgba(120, 40, 20, 0.55), transparent 70%);
                animation: marsSpin 14s linear infinite;
            }

            /* Кольцо-орбита */
            #vip-cursor::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: calc(100% + 10px);
                height: calc(100% + 10px);
                border-radius: 50%;
                border: 1px dashed ${CONFIG.ringColor};
                transform: translate(-50%, -50%) rotateX(72deg);
                animation: marsRingSpin 9s linear infinite;
                pointer-events: none;
            }

            @keyframes marsSpin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes marsRingSpin {
                from { transform: translate(-50%, -50%) rotateX(72deg) rotateZ(0); }
                to { transform: translate(-50%, -50%) rotateX(72deg) rotateZ(360deg); }
            }

            #vip-cursor.hover {
                box-shadow:
                    0 0 14px rgba(231, 76, 60, 0.8),
                    0 0 28px rgba(231, 76, 60, 0.5),
                    0 0 56px rgba(231, 76, 60, 0.25),
                    inset -3px -3px 6px rgba(0, 0, 0, 0.55),
                    inset 2px 2px 5px rgba(255, 150, 100, 0.4);
            }
            #vip-cursor.hover::after {
                border-color: rgba(243, 156, 18, 0.75);
                border-width: 1.5px;
            }

            #vip-cursor.click {
                box-shadow:
                    0 0 18px rgba(243, 156, 18, 0.95),
                    0 0 36px rgba(243, 156, 18, 0.55),
                    0 0 72px rgba(243, 156, 18, 0.3),
                    inset -4px -4px 8px rgba(0, 0, 0, 0.6);
            }

            .vip-spark {
                position: fixed;
                top: 0;
                left: 0;
                width: ${CONFIG.sparkSize}px;
                height: ${CONFIG.sparkSize}px;
                background: ${CONFIG.sparkColor};
                border-radius: 50%;
                pointer-events: none;
                z-index: 2147483645;
                will-change: transform, opacity;
                box-shadow: 0 0 8px ${CONFIG.sparkColor};
            }

            @media (prefers-reduced-motion: reduce) {
                #vip-cursor,
                #vip-cursor::before,
                #vip-cursor::after { animation: none !important; transition: none !important; }
                .vip-spark { display: none !important; }
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
    var hasMousePos = false;   // ⬅ ключевое: не показываем пока не знаем где мышь
    var sparkCount = 0;
    var lastSparkX = 0, lastSparkY = 0;
    var lastMoveX = 0, lastMoveY = 0;
    var sparkPool = [];
    var hoveredEl = null;

    // ============================================================
    // ✨ Искры
    // ============================================================
    function getSpark() {
        if (sparkPool.length > 0) return sparkPool.pop();
        var s = document.createElement('div');
        s.className = 'vip-spark';
        return s;
    }

    function releaseSpark(el) {
        el.remove();
        if (sparkPool.length < 30) sparkPool.push(el);
    }

    function spawnSpark(x, y, dx, dy) {
        if (!CONFIG.sparksEnabled) return;
        if (sparkCount >= CONFIG.sparkMax) return;

        var sdx = x - lastSparkX;
        var sdy = y - lastSparkY;
        if (Math.abs(sdx) + Math.abs(sdy) < CONFIG.sparkSpawnDistance) return;

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
        s.style.transform = 'translate3d(' + (x - dx * 2.5) + 'px,' + (y - dy * 2.5) + 'px,0) scale(0)';
        s.style.opacity = '0';

        setTimeout(function() {
            releaseSpark(s);
            sparkCount--;
        }, life);
    }

    // ============================================================
    // 🔄 RAF-цикл
    // ============================================================
    function tick() {
        if (!isActive) {
            rafId = null;
            return;
        }

        // Не двигаем курсор, пока не знаем где мышь
        if (hasMousePos) {
            cursorX += (mouseX - cursorX) * 0.5;
            cursorY += (mouseY - cursorY) * 0.5;
        }

        currentScale += (targetScale - currentScale) * 0.25;

        if (cursor && hasMousePos) {
            cursor.style.transform =
                'translate3d(' + cursorX + 'px,' + cursorY + 'px,0) translate(-50%,-50%) scale(' + currentScale.toFixed(3) + ')';
        }

        // Искры
        if (hasMousePos) {
            var dx = mouseX - lastMoveX;
            var dy = mouseY - lastMoveY;
            if (Math.abs(dx) + Math.abs(dy) > 2) {
                spawnSpark(mouseX, mouseY, dx, dy);
                lastMoveX = mouseX;
                lastMoveY = mouseY;
            }
        }

        rafId = requestAnimationFrame(tick);
    }

    function startLoop() {
        if (rafId == null && isActive) {
            rafId = requestAnimationFrame(tick);
        }
    }

    // ============================================================
    // 🖱️ Обработчики
    // ============================================================
    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // 🎯 Первое движение мыши — мгновенно появляемся там где мышь
        if (!hasMousePos) {
            hasMousePos = true;
            cursorX = mouseX;
            cursorY = mouseY;
            lastMoveX = mouseX;
            lastMoveY = mouseY;
            lastSparkX = mouseX;
            lastSparkY = mouseY;
            if (cursor) {
                // Мгновенно без transition
                cursor.style.transition = 'none';
                cursor.style.transform =
                    'translate3d(' + cursorX + 'px,' + cursorY + 'px,0) translate(-50%,-50%) scale(1)';
                cursor.classList.add('ready');
                void cursor.offsetWidth;
                cursor.style.transition = '';
            }
        }

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
        if (cursor) {
            cursor.classList.add('click');
            targetScale = 0.85;
        }
    }

    function onMouseUp() {
        if (cursor) {
            cursor.classList.remove('click');
            targetScale = hoveredEl ? (CONFIG.cursorSizeHover / CONFIG.cursorSize) : 1;
        }
    }

    function onVisibilityChange() {
        isActive = !document.hidden;
        if (isActive) startLoop();
        else if (rafId != null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
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

        // 🎯 Пробуем восстановить позицию с прошлой страницы
        var saved = loadPos();
        if (saved) {
            // Ставим сразу в нужное место БЕЗ появления — ждём mousemove
            mouseX = saved.x;
            mouseY = saved.y;
            cursorX = saved.x;
            cursorY = saved.y;
            cursor.style.transition = 'none';
            cursor.style.transform =
                'translate3d(' + cursorX + 'px,' + cursorY + 'px,0) translate(-50%,-50%) scale(1)';
            cursor.style.opacity = '0'; // всё ещё скрыт до первого mousemove
            void cursor.offsetWidth;
            cursor.style.transition = '';
        }

        document.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mousedown', onMouseDown, { passive: true });
        document.addEventListener('mouseup', onMouseUp, { passive: true });
        document.addEventListener('visibilitychange', onVisibilityChange);

        startLoop();
        console.log('🪐 vip-cursor v4 Mars Mini (22px) активен');
    }

    // ============================================================
    // 🛑 Destroy
    // ============================================================
    function destroy() {
        isActive = false;
        if (rafId != null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (cursor && cursor.parentNode) cursor.remove();
        document.body.classList.remove('vip-cursor-on');
        document.querySelectorAll('.vip-spark').forEach(function(el) { el.remove(); });
        cursor = null;
        console.log('🛑 vip-cursor: отключён');
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
