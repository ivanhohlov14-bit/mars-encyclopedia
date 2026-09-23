// ============================================================
// vip-cursor.js — v3 VIP "Mars Cursor"
// Светящийся Марс вместо курсора
// - Планета 44px с поверхностью, кольцом, свечением
// - НЕ пропадает (виден всегда)
// - Искры при движении (без клик-ripple)
// - GPU-ускорение, RAF-цикл, пул спарков
// - Reduced-motion, touch-детект, пауза при скрытой вкладке
// - Публичное API: window.marsVipCursor.*
// ============================================================
(function() {
    'use strict';

    if (window.__vipCursorLoaded) return;
    window.__vipCursorLoaded = true;

    // ============================================================
    // 🚫 Кого не трогаем
    // ============================================================
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

    if (isTouchDevice()) {
        console.log('ℹ️ vip-cursor: тач-устройство — выход');
        return;
    }

    var REDUCED_MOTION = prefersReducedMotion();

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var CONFIG = {
        cursorSize: 44,              // размер Марса
        cursorSizeHover: 56,         // увеличенный на hover
        colorDark: '#7f1d1d',        // тёмная сторона Марса
        colorMid: '#c0392b',         // основной
        colorLight: '#e74c3c',       // светлая сторона
        colorHighlight: '#ff9060',   // блик
        glowColor: 'rgba(231, 76, 60, 0.55)',
        ringColor: 'rgba(243, 156, 18, 0.4)',
        sparkColor: '#ff9060',
        sparkSize: 4,
        sparkLife: 800,
        sparkMax: 25,
        sparkSpawnDistance: 10,
        sparksEnabled: !REDUCED_MOTION,
        hoverTargets: 'a, button, .pf-btn, .pf-tab, .pf-quick-card, .pf-mypage-action, [role="button"], .wy-menu-vertical a, .md-nav__link, input, textarea, select'
    };

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('vip-cursor-style')) return;
        var s = document.createElement('style');
        s.id = 'vip-cursor-style';
        s.textContent = `
            /* Скрываем системный курсор, но НЕ в полях ввода */
            body.vip-cursor-on,
            body.vip-cursor-on * {
                cursor: none !important;
            }
            body.vip-cursor-on input,
            body.vip-cursor-on textarea,
            body.vip-cursor-on select,
            body.vip-cursor-on [contenteditable="true"] {
                cursor: text !important;
            }

            /* ============ МАРС-КУРСОР ============ */
            #vip-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: ${CONFIG.cursorSize}px;
                height: ${CONFIG.cursorSize}px;
                pointer-events: none;
                z-index: 2147483646;
                transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
                will-change: transform;
                border-radius: 50%;
                opacity: 1;
                /* Ядро планеты */
                background:
                    radial-gradient(circle at 30% 30%,
                        ${CONFIG.colorHighlight} 0%,
                        ${CONFIG.colorLight} 20%,
                        ${CONFIG.colorMid} 55%,
                        ${CONFIG.colorDark} 100%);
                /* Свечение */
                box-shadow:
                    0 0 18px ${CONFIG.glowColor},
                    0 0 36px rgba(231, 76, 60, 0.3),
                    0 0 72px rgba(231, 76, 60, 0.15),
                    inset -6px -6px 12px rgba(0, 0, 0, 0.55),
                    inset 4px 4px 10px rgba(255, 150, 100, 0.25);
                transition: width .25s cubic-bezier(.16,1,.3,1),
                            height .25s cubic-bezier(.16,1,.3,1),
                            box-shadow .25s ease;
            }

            /* Поверхность Марса — кратеры/пятна через псевдо-элемент */
            #vip-cursor::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background:
                    radial-gradient(ellipse 6px 4px at 25% 30%, rgba(120, 40, 20, 0.7), transparent 70%),
                    radial-gradient(ellipse 8px 5px at 65% 55%, rgba(120, 40, 20, 0.6), transparent 70%),
                    radial-gradient(ellipse 5px 3px at 40% 75%, rgba(120, 40, 20, 0.55), transparent 70%),
                    radial-gradient(ellipse 7px 4px at 70% 25%, rgba(120, 40, 20, 0.5), transparent 70%);
                animation: marsSpin 12s linear infinite;
                opacity: 0.85;
            }

            /* Кольцо-орбита */
            #vip-cursor::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: calc(100% + 18px);
                height: calc(100% + 18px);
                border-radius: 50%;
                border: 1px dashed ${CONFIG.ringColor};
                transform: translate(-50%, -50%) rotateX(72deg);
                animation: marsRingSpin 8s linear infinite;
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

            /* Hover — Марс растёт и светится сильнее */
            #vip-cursor.hover {
                box-shadow:
                    0 0 26px rgba(231, 76, 60, 0.75),
                    0 0 52px rgba(231, 76, 60, 0.45),
                    0 0 100px rgba(231, 76, 60, 0.25),
                    inset -6px -6px 12px rgba(0, 0, 0, 0.55),
                    inset 4px 4px 10px rgba(255, 150, 100, 0.4);
            }
            #vip-cursor.hover::after {
                border-color: rgba(243, 156, 18, 0.7);
                border-width: 2px;
            }

            /* Клик — сжатие */
            #vip-cursor.click {
                box-shadow:
                    0 0 30px rgba(243, 156, 18, 0.9),
                    0 0 60px rgba(243, 156, 18, 0.5),
                    0 0 120px rgba(243, 156, 18, 0.3),
                    inset -8px -8px 14px rgba(0, 0, 0, 0.6),
                    inset 5px 5px 12px rgba(255, 200, 100, 0.5);
            }

            /* ============ ИСКРЫ ============ */
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
                box-shadow: 0 0 10px ${CONFIG.sparkColor};
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
    var mouseX = -100, mouseY = -100;
    var cursorX = -100, cursorY = -100;
    var targetScale = 1;
    var currentScale = 1;
    var rafId = null;
    var isActive = true;
    var sparkCount = 0;
    var lastSparkX = 0, lastSparkY = 0;
    var lastMoveX = 0, lastMoveY = 0;
    var sparkPool = [];
    var hoveredEl = null;

    // ============================================================
    // ✨ Спарки
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

        // Плавная интерполяция позиции
        cursorX += (mouseX - cursorX) * 0.4;
        cursorY += (mouseY - cursorY) * 0.4;

        // Плавный зум
        currentScale += (targetScale - currentScale) * 0.22;

        if (cursor) {
            cursor.style.transform = 'translate3d(' + cursorX + 'px,' + cursorY + 'px,0) translate(-50%,-50%) scale(' + currentScale.toFixed(3) + ')';
        }

        // Искры по движению
        var dx = mouseX - lastMoveX;
        var dy = mouseY - lastMoveY;
        if (Math.abs(dx) + Math.abs(dy) > 2) {
            spawnSpark(mouseX, mouseY, dx, dy);
            lastMoveX = mouseX;
            lastMoveY = mouseY;
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

        // Hover по target
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
        if (isActive) {
            startLoop();
        } else if (rafId != null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function init() {
        injectStyles();

        cursor = document.createElement('div');
        cursor.id = 'vip-cursor';
        document.body.appendChild(cursor);
        document.body.classList.add('vip-cursor-on');

        // Стартовая позиция — в центр экрана (чтобы не пропадал до первого движения)
        mouseX = cursorX = window.innerWidth / 2;
        mouseY = cursorY = window.innerHeight / 2;
        lastMoveX = mouseX;
        lastMoveY = mouseY;
        if (cursor) {
            cursor.style.transform = 'translate3d(' + cursorX + 'px,' + cursorY + 'px,0) translate(-50%,-50%)';
        }

        document.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mousedown', onMouseDown, { passive: true });
        document.addEventListener('mouseup', onMouseUp, { passive: true });
        document.addEventListener('visibilitychange', onVisibilityChange);

        startLoop();
        console.log('🪐 vip-cursor v3 Mars Cursor активен');
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

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsVipCursor = {
        destroy: destroy,
        isActive: function() { return isActive; },
        setColors: function(dark, mid, light, highlight) {
            var c = document.getElementById('vip-cursor');
            if (!c) return;
            c.style.background = 'radial-gradient(circle at 30% 30%, ' +
                (highlight || CONFIG.colorHighlight) + ' 0%, ' +
                (light || CONFIG.colorLight) + ' 20%, ' +
                (mid || CONFIG.colorMid) + ' 55%, ' +
                (dark || CONFIG.colorDark) + ' 100%)';
        }
    };

    console.log('✅ vip-cursor.js v3 Mars Cursor загружен');
})();
