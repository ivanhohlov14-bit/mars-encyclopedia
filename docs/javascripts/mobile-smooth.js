// ============================================================
// mobile-smooth.js — v3 VIP
// Мягкая оптимизация мобильного (без отключения анимаций)
// - НЕ переопределяет setInterval (безопасно для библиотек)
// - Пауза off-screen анимаций только у реально анимированных
// - FPS-монитор с паузой на скрытой вкладке + авто-стоп через 30с
// - MutationObserver для динамических блоков
// - SVG-замедление с лимитом
// - Safe visibility-обработчик
// - Публичное API
// ============================================================
(function() {
    'use strict';

    if (window.__marsMobileSmoothLoaded) return;
    window.__marsMobileSmoothLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var DEBUG = false;
    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['✨ smooth:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 0 && window.innerWidth <= 768) return true;
        return window.innerWidth <= 768;
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    if (!isMobile()) {
        log('не мобильный — выход');
        return;
    }

    var REDUCED_MOTION = prefersReducedMotion();

    // Если у пользователя отключены анимации — ничего не делаем
    if (REDUCED_MOTION) {
        log('prefers-reduced-motion — выход');
        return;
    }

    // ============================================================
    // 📝 Пометка body
    // ============================================================
    document.documentElement.classList.add('mars-mobile-smooth');
    if (document.body) {
        document.body.classList.add('mars-mobile-smooth');
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('mars-mobile-smooth');
        }, { once: true });
    }

    // ============================================================
    // 1️⃣ ПАУЗА OFF-SCREEN АНИМАЦИЙ
    // ============================================================
    // Список селекторов, у которых ТОЧНО есть CSS-анимации
    var ANIMATED_SELECTORS = [
        '.pf-hero',
        '.pf-hero::before',         // не работает через querySelector, ставим на сам .pf-hero
        '.pf-avatar-ring',
        '.pf-mod-badge',
        '.lg-hero',
        '.lg-logo',
        '.lg-logo-orbit',
        '.vip-banner',
        '.marquee-vip',
        '.shimmer',
        '.pulse-vip'
    ];

    // Только реальные элементы (без ::before/::after)
    var OBSERVE_SELECTORS = ANIMATED_SELECTORS.filter(function(s) {
        return s.indexOf('::') === -1;
    }).join(', ');

    var observed = new WeakSet();
    var animationObserver = null;

    function pauseOffscreen(el) {
        // Ставим паузу только если у элемента реально есть анимация
        try {
            var cs = window.getComputedStyle(el);
            if (!cs.animationName || cs.animationName === 'none') return;
            if (el.dataset.marsSmoothPause === '1') return;
            el.dataset.marsSmoothPause = '1';
        } catch(e) { return; }

        if (el._marsAnimPaused === undefined) {
            el._marsAnimPaused = false;
        }
    }

    function observeAnimated(el) {
        if (observed.has(el)) return;
        observed.add(el);
        try { animationObserver.observe(el); } catch(e) {}
    }

    function initAnimationObserver() {
        if (!('IntersectionObserver' in window)) return;

        animationObserver = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                var el = entry.target;

                // Пауза только если у элемента есть CSS-анимация
                try {
                    var cs = window.getComputedStyle(el);
                    if (!cs.animationName || cs.animationName === 'none') continue;

                    if (entry.isIntersecting) {
                        el.style.animationPlayState = '';
                    } else {
                        el.style.animationPlayState = 'paused';
                    }
                } catch(e) {}
            }
        }, {
            rootMargin: '200px',
            threshold: 0
        });

        scanForAnimated();
    }

    function scanForAnimated(root) {
        if (!animationObserver) return;
        var scope = root || document;
        var nodes = scope.querySelectorAll ? scope.querySelectorAll(OBSERVE_SELECTORS) : [];
        for (var i = 0; i < nodes.length; i++) {
            observeAnimated(nodes[i]);
        }
    }

    // ============================================================
    // 2️⃣ ПАУЗА ПРИ СКРЫТОЙ ВКЛАДКЕ
    // ============================================================
    // НЕ обходим весь DOM! Только те элементы, которые уже в списке observed
    var trackedEls = [];
    var trackedMax = 200; // защита от переполнения

    function trackElement(el) {
        if (trackedEls.length >= trackedMax) return;
        if (trackedEls.indexOf(el) !== -1) return;
        trackedEls.push(el);
    }

    function onVisibilityChange() {
        if (!trackedEls.length) return;
        var state = document.hidden ? 'paused' : '';
        for (var i = 0; i < trackedEls.length; i++) {
            try {
                trackedEls[i].style.animationPlayState = state;
            } catch(e) {}
        }
        log('visibility:', document.hidden ? 'paused' : 'running');
    }

    // ============================================================
    // 3️⃣ SVG-ЗАМЕДЛЕНИЕ (с лимитом)
    // ============================================================
    function slowDownSvgAnimations() {
        // 🛡 Лимит — не более 50 SVG-элементов
        var svgEls = document.querySelectorAll(
            '.curiosity-dot, .mars-map-dot, [class*="curiosity"], svg .pulse'
        );
        var limit = Math.min(svgEls.length, 50);

        for (var i = 0; i < limit; i++) {
            var el = svgEls[i];
            if (el.dataset.marsSmoothSlowed) continue;
            el.dataset.marsSmoothSlowed = '1';

            // SVG <animate> / <animateTransform>
            var anims = el.querySelectorAll('animate, animateTransform');
            for (var j = 0; j < anims.length; j++) {
                var a = anims[j];
                var dur = a.getAttribute('dur');
                if (!dur) continue;
                var match = dur.match(/^([\d.]+)(s|ms)?$/);
                if (!match) continue;
                var val = parseFloat(match[1]);
                var unit = match[2] || 's';
                if (val > 0) {
                    a.setAttribute('dur', (val * 2.5) + unit);
                }
            }

            // CSS-анимация
            try {
                var cs = getComputedStyle(el);
                if (cs.animationName && cs.animationName !== 'none') {
                    var durCss = parseFloat(cs.animationDuration);
                    if (durCss > 0) {
                        el.style.animationDuration = (durCss * 2) + 's';
                    }
                }
            } catch(e) {}
        }

        if (limit > 0) log('замедлено SVG:', limit);
    }

    // ============================================================
    // 4️⃣ FPS-МОНИТОР (с авто-стопом)
    // ============================================================
    var fpsRafId = null;
    var fpsActive = true;
    var frameCount = 0;
    var lastTime = performance.now();
    var lowFpsCount = 0;
    var monitorStart = Date.now();
    var MAX_MONITOR_MS = 30000; // стоп через 30 секунд
    var softModeApplied = false;

    function checkFPS(now) {
        if (!fpsActive) {
            fpsRafId = null;
            return;
        }

        // Стоп через 30 секунд — после этого страница уже "устаканилась"
        if (Date.now() - monitorStart > MAX_MONITOR_MS) {
            fpsActive = false;
            log('FPS-монитор остановлен (прошло 30с)');
            return;
        }

        frameCount++;

        if (now - lastTime >= 1000) {
            var fps = frameCount;
            frameCount = 0;
            lastTime = now;

            if (fps < 30) {
                lowFpsCount++;
                if (lowFpsCount >= 3 && !softModeApplied) {
                    log('⚠️ FPS стабильно низкий — soft-mode');
                    document.documentElement.classList.add('soft-mode');
                    document.body && document.body.classList.add('soft-mode');
                    addSoftModeStyle();
                    softModeApplied = true;
                }
            } else {
                lowFpsCount = 0;
            }
        }

        fpsRafId = requestAnimationFrame(checkFPS);
    }

    function startFPSMonitor() {
        if (fpsRafId == null && fpsActive) {
            fpsRafId = requestAnimationFrame(checkFPS);
        }
    }

    function pauseFPSMonitor() {
        if (fpsRafId != null) {
            cancelAnimationFrame(fpsRafId);
            fpsRafId = null;
        }
    }

    function addSoftModeStyle() {
        if (document.getElementById('soft-mode-style')) return;
        var st = document.createElement('style');
        st.id = 'soft-mode-style';
        st.textContent = `
            html.soft-mode .pf-hero::before,
            html.soft-mode .pf-hero::after,
            html.soft-mode .lg-hero::before,
            html.soft-mode .lg-hero::after,
            html.soft-mode .lg-logo,
            html.soft-mode .lg-logo-orbit,
            html.soft-mode .pf-avatar-ring,
            html.soft-mode .pf-mod-badge,
            html.soft-mode .marquee-vip,
            html.soft-mode .shimmer {
                animation-duration: 25s !important;
            }
            html.soft-mode * {
                transition-duration: .15s !important;
            }
            html.soft-mode .vip-spark,
            html.soft-mode .vip-trail {
                display: none !important;
            }
        `;
        document.head.appendChild(st);
    }

    // ============================================================
    // 5️⃣ MUTATIONOBSERVER — для динамических блоков
    // ============================================================
    var mo = null;
    var moTimer = null;

    function initMutationObserver() {
        if (typeof MutationObserver === 'undefined') return;

        mo = new MutationObserver(function(mutations) {
            if (moTimer) return;
            moTimer = setTimeout(function() {
                moTimer = null;
                var hasNew = false;
                for (var i = 0; i < mutations.length && !hasNew; i++) {
                    var m = mutations[i];
                    if (!m.addedNodes || !m.addedNodes.length) continue;
                    for (var j = 0; j < m.addedNodes.length; j++) {
                        var n = m.addedNodes[j];
                        if (n.nodeType !== 1) continue;
                        if (n.matches && n.matches(OBSERVE_SELECTORS)) {
                            hasNew = true;
                            break;
                        }
                        if (n.querySelector && n.querySelector(OBSERVE_SELECTORS)) {
                            hasNew = true;
                            break;
                        }
                    }
                }
                if (hasNew) scanForAnimated(document);
            }, 300);
        });

        try {
            mo.observe(document.body, { childList: true, subtree: true });
            log('mutation observer запущен');

            // Auto-disconnect через 30 секунд
            setTimeout(function() {
                if (mo) {
                    try { mo.disconnect(); } catch(e) {}
                    mo = null;
                    log('mutation observer отключён');
                }
            }, 30000);
        } catch(e) {}
    }

    // ============================================================
    // 6️⃣ REPAINT после загрузки
    // ============================================================
    function repaintFix() {
        try {
            if (!document.body) return;
            document.body.style.transform = 'translateZ(0)';
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    if (document.body) document.body.style.transform = '';
                });
            });
        } catch(e) {}
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function init() {
        // 1. Пауза off-screen
        initAnimationObserver();

        // 2. Пауза на скрытой вкладке
        document.addEventListener('visibilitychange', onVisibilityChange);

        // 3. FPS-монитор + пауза при скрытой вкладке
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) pauseFPSMonitor();
            else startFPSMonitor();
        });

        startFPSMonitor();

        // 4. SVG-замедление — после полной загрузки (когда всё отрисовано)
        if (document.readyState === 'complete') {
            setTimeout(slowDownSvgAnimations, 1000);
        } else {
            window.addEventListener('load', function() {
                setTimeout(slowDownSvgAnimations, 1000);
            }, { once: true });
        }

        // 5. MutationObserver — динамика
        if (document.body) {
            initMutationObserver();
        } else {
            document.addEventListener('DOMContentLoaded', initMutationObserver);
        }

        // 6. Repaint после загрузки
        window.addEventListener('load', function() {
            setTimeout(repaintFix, 500);
        }, { once: true });

        // 7. Отслеживание для visibility — через MutationObserver начнём
        //    подтягивать элементы, у которых реально есть анимация
        setTimeout(function() {
            var nodes = document.querySelectorAll(OBSERVE_SELECTORS);
            for (var i = 0; i < nodes.length && i < trackedMax; i++) {
                trackElement(nodes[i]);
            }
        }, 500);

        log('v3 VIP активен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsMobileSmooth = {
        isMobile: true,
        isSoftMode: function() { return softModeApplied; },
        enableSoftMode: function() {
            if (softModeApplied) return;
            document.documentElement.classList.add('soft-mode');
            document.body && document.body.classList.add('soft-mode');
            addSoftModeStyle();
            softModeApplied = true;
        },
        disableSoftMode: function() {
            document.documentElement.classList.remove('soft-mode');
            document.body && document.body.classList.remove('soft-mode');
            var st = document.getElementById('soft-mode-style');
            if (st) st.remove();
            softModeApplied = false;
        },
        rescan: function() {
            scanForAnimated(document);
            slowDownSvgAnimations();
        }
    };

    log('v3 VIP загружен');
})();
