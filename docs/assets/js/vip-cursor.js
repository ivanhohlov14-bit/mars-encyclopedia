// ============================================================
// vip-cursor.js — v2 VIP
// Светящийся курсор с искрами
// - GPU-ускорение (transform translate3d, не left/top)
// - requestAnimationFrame вместо сырого mousemove
// - Пул спарков — не плодятся таймеры
// - Не отключает курсор в input/textarea/select
// - Пауза при скрытой вкладке
// - Уважает prefers-reduced-motion
// - Не грузится на тач-устройствах
// - Клик-ripple эффект
// - Публичное API: window.marsVipCursor.destroy()
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
        cursorSize: 20,
        cursorBorder: 2,
        cursorColor: '#6C63FF',
        cursorColorHover: '#A29BFE',
        sparkColor: '#A29BFE',
        sparkSize: 4,
        sparkLife: 700,           // мс жизни спарка
        sparkMax: 30,             // максимум одновременных спарков
        sparkSpawnDistance: 8,    // px между спарками
        sparksEnabled: !REDUCED_MOTION,
        hoverTargets: 'a, button, .pf-btn, .pf-tab, .pf-quick-card, .pf-mypage-action, [role="button"], .wy-menu-vertical a, .md-nav__link'
    };

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('vip-cursor-style')) return;
        var s = document.createElement('style');
        s.id = 'vip-cursor-style';
        s.textContent = `
            /* Скрываем системный курсор на всём, кроме полей ввода */
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

            #vip-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: ${CONFIG.cursorSize}px;
                height: ${CONFIG.cursorSize}px;
                border: ${CONFIG.cursorBorder}px solid ${CONFIG.cursorColor};
                border-radius: 50%;
                pointer-events: none;
                z-index: 2147483646;
                transform: translate3d(-100px, -100px, 0);
                will-change: transform;
                box-shadow:
                    0 0 ${CONFIG.cursorSize}px ${CONFIG.cursorColor},
                    0 0 40px rgba(108, 99, 255, 0.4);
                transition: width .15s, height .15s, border-color .15s, background .15s, opacity .2s;
                opacity: 0;
                mix-blend-mode: screen;
            }
            #vip-cursor.visible { opacity: 1; }
            #vip-cursor.hover {
                background: ${CONFIG.cursorColorHover};
                border-color: ${CONFIG.cursorColorHover};
                width: ${CONFIG.cursorSize + 10}px;
                height: ${CONFIG.cursorSize + 10}px;
                box-shadow:
                    0 0 30px ${CONFIG.cursorColorHover},
                    0 0 60px rgba(162, 155, 254, 0.6);
            }
            #vip-cursor.click {
                width: ${CONFIG.cursorSize - 4}px;
                height: ${CONFIG.cursorSize - 4}px;
                background: ${CONFIG.cursorColor};
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

            /* Клик-риппл */
            .vip-cursor-ripple {
                position: fixed;
                top: 0;
                left: 0;
                width: 40px;
                height: 40px;
                border: 2px solid ${CONFIG.cursorColor};
                border-radius: 50%;
                pointer-events: none;
                z-index: 2147483644;
                transform: translate3d(-50%, -50%, 0) scale(0.5);
                opacity: 0.9;
                animation: vipRipple .6s cubic-bezier(.16,1,.3,1) forwards;
            }
            @keyframes vipRipple {
                to { transform: translate3d(-50%, -50%, 0) scale(1.8); opacity: 0; }
            }

            @media (prefers-reduced-motion: reduce) {
                #vip-cursor { transition: none !important; }
                .vip-spark, .vip-cursor-ripple { display: none !important; }
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
    var isVisible = false;
    var sparkCount = 0;
    var lastSparkX = 0, lastSparkY = 0;
    var sparkPool = [];
    var hoveredEl = null;

    // ============================================================
    // ✨ Спарк
    // ============================================================
    function getSpark() {
        // Переиспользуем из пула
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

        // Проверка дистанции
        var sdx = x - lastSparkX;
        var sdy = y - lastSparkY;
        if (Math.abs(sdx) + Math.abs(sdy) < CONFIG.sparkSpawnDistance) return;

        lastSparkX = x;
        lastSparkY = y;
        sparkCount++;

        var s = getSpark();
        s.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
        s.style.opacity = '1';
        s.style.transition = 'none';
        document.body.appendChild(s);

        // Форсируем reflow, чтобы transition сработал
        void s.offsetWidth;

        s.style.transition = 'transform ' + CONFIG.sparkLife + 'ms ease-out, opacity ' + CONFIG.sparkLife + 'ms ease-out';
        s.style.transform = 'translate3d(' + (x - dx * 2) + 'px,' + (y - dy * 2) + 'px,0) scale(0)';
        s.style.opacity = '0';

        setTimeout(function() {
            releaseSpark(s);
            sparkCount--;
        }, CONFIG.sparkLife);
    }

    // ============================================================
    // 🎯 Клик-риппл
    // ============================================================
    function spawnRipple(x, y) {
        if (REDUCED_MOTION) return;
        var r = document.createElement('div');
        r.className = 'vip-cursor-ripple';
        r.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%) scale(0.5)';
        document.body.appendChild(r);
        setTimeout(function() { r.remove(); }, 650);
    }

    // ============================================================
    // 🔄 RAF-цикл
    // ============================================================
    var lastMouseX = 0, lastMouseY = 0;

    function tick() {
        if (!isActive) {
            rafId = null;
            return;
        }

        // Плавная интерполяция курсора
        cursorX += (mouseX - cursorX) * 0.35;
        cursorY += (mouseY - cursorY) * 0.35;

        // Плавный зум
        currentScale += (targetScale - currentScale) * 0.2;

        if (cursor) {
            cursor.style.transform = 'translate3d(' + cursorX + 'px,' + cursorY + 'px,0) translate(-50%,-50%) scale(' + currentScale.toFixed(3) + ')';
        }

        // Спарки по движению
        var dx = mouseX - lastMouseX;
        var dy = mouseY - lastMouseY;
        if (Math.abs(dx) + Math.abs(dy) > 2) {
            spawnSpark(mouseX, mouseY, dx, dy);
            lastMouseX = mouseX;
            lastMouseY = mouseY;
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

        if (!isVisible && cursor) {
            cursor.classList.add('visible');
            isVisible = true;
        }

        // Hover определяем сразу по target
        var hover = e.target && e.target.closest && e.target.closest(CONFIG.hoverTargets);
        if (hover !== hoveredEl) {
            hoveredEl = hover;
            if (cursor) cursor.classList.toggle('hover', !!hover);
        }
    }

    function onMouseDown(e) {
        if (cursor) cursor.classList.add('click');
        spawnRipple(e.clientX, e.clientY);
    }

    function onMouseUp() {
        if (cursor) cursor.classList.remove('click');
    }

    function onMouseLeave() {
        if (cursor) {
            cursor.classList.remove('visible');
            isVisible = false;
        }
    }

    function onMouseEnter() {
        if (cursor) {
            cursor.classList.add('visible');
            isVisible = true;
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

        // Пассивные слушатели — не блокируем скролл
        document.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mousedown', onMouseDown, { passive: true });
        document.addEventListener('mouseup', onMouseUp, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave, { passive: true });
        document.addEventListener('mouseenter', onMouseEnter, { passive: true });
        document.addEventListener('visibilitychange', onVisibilityChange);

        startLoop();
        console.log('✨ vip-cursor v2 VIP активен');
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
        document.removeEventListener('mouseleave', onMouseLeave);
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (cursor && cursor.parentNode) cursor.remove();
        document.body.classList.remove('vip-cursor-on');
        document.querySelectorAll('.vip-spark, .vip-cursor-ripple').forEach(function(el) { el.remove(); });
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
        setColor: function(color) {
            if (cursor) {
                cursor.style.borderColor = color;
                cursor.style.boxShadow = '0 0 20px ' + color + ', 0 0 40px ' + color + '66';
            }
        },
        isActive: function() { return isActive; }
    };

    console.log('✅ vip-cursor.js v2 VIP загружен');
})();
