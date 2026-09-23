// ============================================================
// mobile-optimizer.js — v2 VIP
// Управление загрузкой скриптов на телефоне
// - HARD-блок: только те, что точно не нужны на мобильном
// - SOFT-DELAY: откладываемые (analytics, effects)
// - НЕ блокирует qr-scanner / device-link (нужны на телефоне!)
// - НЕ блокирует intro (нужен, просто реже)
// - Публичное API для разблокировки
// - Auto-disconnect observer
// - Пометка body.mars-mobile для CSS
// - DEBUG флаг
// ============================================================
(function() {
    'use strict';

    if (window.__marsMobileOptimizerLoaded) return;
    window.__marsMobileOptimizerLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var DEBUG = false;
    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['📱 mobile-opt:'].concat([].slice.call(arguments))); } catch(e) {}
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

    var IS_MOBILE = isMobile();
    var REDUCED_MOTION = prefersReducedMotion();

    // ============================================================
    // 📋 Списки скриптов
    // ============================================================

    // 🔴 HARD-BLOCK: не нужны на телефоне вообще
    // (сами уже умеют выходить на мобильном, но чтобы не тратить bandwidth)
    var HARD_BLOCK = [
        'vip-cursor.js',         // кастомный курсор — на тач не нужен
        'vip-scroll-reveal.js',  // reveal-анимации при скролле — тяжело
        'mars-dust.js',          // частицы пыли — жрут CPU
        'mars-tts.js',           // TTS — на телефоне свой
        'sound-engine.js',
        'sound-ui.js',
        'ui-sounds.js',
        'mars-audio.js',
        'mars-sound-synth.js'
    ];

    // 🟡 SOFT-DELAY: загрузим через N мс (не блокируем полностью)
    var SOFT_DELAY = [
        { name: 'effects-menu.js',      delay: 2500 },
        { name: 'yandex-metrika.js',    delay: 4000 }
    ];

    // ✅ Никогда не блокировать (перечислены для документации)
    // - qr-scanner.js       — НУЖЕН на телефоне (сканирует QR с ПК)
    // - device-link.js      — НУЖЕН на телефоне (показывает QR)
    // - intro.js            — работает на мобильном
    // - sidebar-scroll.js   — работает в Material
    // - sidebar-toggle.js   — сам выходит на мобильном
    // - language-switcher.js — нужен везде
    // - comments.js / comments-loader.js — нужны везде

    // ============================================================
    // 📝 Пометка body для CSS
    // ============================================================
    function markBody() {
        try {
            document.documentElement.classList.add('mars-mobile');
            if (document.body) {
                document.body.classList.add('mars-mobile');
            } else {
                document.addEventListener('DOMContentLoaded', function() {
                    document.body.classList.add('mars-mobile');
                }, { once: true });
            }
            if (REDUCED_MOTION) {
                document.documentElement.classList.add('mars-reduced-motion');
            }
        } catch(e) {}
    }

    // ============================================================
    // 🔍 Проверка URL скрипта
    // ============================================================
    function matchList(src, list) {
        if (!src) return null;
        var lower = src.toLowerCase();
        for (var i = 0; i < list.length; i++) {
            var name = (typeof list[i] === 'string') ? list[i] : list[i].name;
            if (lower.indexOf(name.toLowerCase()) !== -1) return list[i];
        }
        return null;
    }

    // ============================================================
    // 🚫 Блокировка / откладывание скрипта
    // ============================================================
    var blocked = {};      // { "filename.js": true }
    var delayed = {};      // { "filename.js": { delay, src, removed } }

    function blockScript(node, name) {
        // Отменяем загрузку
        try { node.remove(); } catch(e) {}
        blocked[name] = true;
        log('❌ заблокирован:', name);
    }

    function delayScript(node, name, delayMs) {
        var src = node.src;
        try { node.remove(); } catch(e) {}
        delayed[name] = { src: src, ts: Date.now(), fired: false };
        log('⏱️ отложен:', name, 'на', delayMs, 'мс');

        setTimeout(function() {
            if (!delayed[name]) return;
            delayed[name].fired = true;
            var s = document.createElement('script');
            s.src = src;
            s.async = true;
            document.head.appendChild(s);
            log('✅ отложенный загружен:', name);
        }, delayMs);
    }

    // ============================================================
    // 🎯 Обработка одного <script>
    // ============================================================
    function handleScript(node) {
        if (!node || node.tagName !== 'SCRIPT') return;
        var src = node.src;
        if (!src) return;

        // HARD-BLOCK
        var hardMatch = matchList(src, HARD_BLOCK);
        if (hardMatch) {
            blockScript(node, hardMatch);
            return;
        }

        // SOFT-DELAY
        var softMatch = matchList(src, SOFT_DELAY);
        if (softMatch) {
            delayScript(node, softMatch.name, softMatch.delay);
            return;
        }
    }

    // ============================================================
    // 🔭 MutationObserver — ловим новые <script>
    // ============================================================
    var observer = null;

    function startObserver() {
        if (typeof MutationObserver === 'undefined') return;
        if (observer) return;

        observer = new MutationObserver(function(mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];
                if (!m.addedNodes || !m.addedNodes.length) continue;
                for (var j = 0; j < m.addedNodes.length; j++) {
                    var node = m.addedNodes[j];
                    if (node.nodeType !== 1) continue;
                    if (node.tagName === 'SCRIPT') {
                        handleScript(node);
                    } else if (node.querySelectorAll) {
                        var scripts = node.querySelectorAll('script[src]');
                        for (var k = 0; k < scripts.length; k++) {
                            handleScript(scripts[k]);
                        }
                    }
                }
            }
        });

        try {
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
            log('observer запущен');
        } catch(e) {
            log('observer не запустился:', e.message);
        }

        // Auto-disconnect через 15 сек — все скрипты уже либо загрузились, либо нет
        setTimeout(function() {
            if (observer) {
                try { observer.disconnect(); } catch(e) {}
                observer = null;
                log('observer отключён (timeout)');
            }
        }, 15000);
    }

    // ============================================================
    // 🎯 Пакетная обработка уже в DOM
    // ============================================================
    function processExisting() {
        // Ищем в <head> и <body>
        var scripts = document.querySelectorAll('script[src]');
        for (var i = 0; i < scripts.length; i++) {
            handleScript(scripts[i]);
        }
    }

    // ============================================================
    // 🌐 Публичное API — разблокировка
    // ============================================================
    function unblock(name) {
        // Если отложен — форсим загрузку сейчас
        if (delayed[name] && !delayed[name].fired) {
            var d = delayed[name];
            if (d.timer) clearTimeout(d.timer);
            d.fired = true;
            var s = document.createElement('script');
            s.src = d.src;
            s.async = true;
            document.head.appendChild(s);
            log('🔓 форсирован:', name);
            return true;
        }
        // Если заблокирован — удаляем из списка (не поможет для уже загруженных,
        // но если скрипт будет добавлен ещё раз — пропустим)
        if (blocked[name]) {
            delete blocked[name];
            log('🔓 разблокирован (со след. раза):', name);
            return true;
        }
        return false;
    }

    function forceLoad(path) {
        // Прямая загрузка скрипта по URL/имени из HARD_BLOCK
        var allFiles = HARD_BLOCK.concat(SOFT_DELAY.map(function(d) { return d.name; }));
        for (var i = 0; i < allFiles.length; i++) {
            if (path.indexOf(allFiles[i]) !== -1) {
                delete blocked[allFiles[i]];
                var s = document.createElement('script');
                s.src = path;
                s.async = true;
                document.head.appendChild(s);
                log('🔓 forceLoad:', path);
                return true;
            }
        }
        return false;
    }

    // ============================================================
    // 🚀 Запуск
    // ============================================================
    function init() {
        markBody();

        if (!IS_MOBILE) {
            log('не мобильный — выход');
            return;
        }

        log('мобильный — активирую оптимизацию');

        // Обрабатываем уже в DOM
        processExisting();

        // Слушаем новые
        startObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Ещё раз через 500 мс — на случай поздних скриптов
    setTimeout(function() {
        if (IS_MOBILE) processExisting();
    }, 500);

    // ============================================================
    // 🌐 Экспорт
    // ============================================================
    window.marsMobileOptimizer = {
        isMobile: IS_MOBILE,
        blocked: blocked,
        delayed: delayed,
        unblock: unblock,
        forceLoad: forceLoad,
        // Хелперы для других скриптов
        HARD_BLOCK: HARD_BLOCK,
        SOFT_DELAY: SOFT_DELAY.map(function(d) { return d.name; })
    };

    log('v2 VIP загружен' + (IS_MOBILE ? ' (мобильный)' : ' (ПК)'));
})();
