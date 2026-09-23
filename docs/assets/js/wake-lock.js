// ============================================================
// wake-lock.js — v2 VIP
// Не даёт экрану гаснуть пока пользователь активно читает
// - Хранит состояние в localStorage
// - Авто-пауза при бездействии 30 сек (не держим вечно)
// - Whitelist страниц (только статьи)
// - Retry с экспоненциальной задержкой
// - Публичное API + событие mars-wakelock-change
// ============================================================
(function() {
    'use strict';

    if (window.__marsWakeLockLoaded) return;
    window.__marsWakeLockLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var STATE_KEY = 'mars_wake_lock_enabled';
    var IDLE_MS = 30 * 1000;           // бездействие → отпускаем лок
    var RETRY_DELAYS = [2000, 5000, 10000, 30000];
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['☀️ wakelock:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 🌐 Проверка поддержки
    // ============================================================
    if (!('wakeLock' in navigator)) {
        log('API не поддерживается');
        // Ставим заглушку API для совместимости
        window.marsWakeLock = {
            enable: function() {},
            disable: function() {},
            toggle: function() {},
            isEnabled: function() { return false; },
            isSupported: function() { return false; }
        };
        return;
    }

    // ============================================================
    // 🚫 Whitelist страниц — где НЕ нужен
    // ============================================================
    var EXCLUDE_PATHS = [
        '/', '/index/',
        '/login/', '/register/', '/profile/', '/profile-view/',
        '/stats/', '/game/', '/moderator/',
        '/support/', '/license/', '/start-here/',
        '/bookmarks/', '/feed/', '/achievements/',
        '/quests/', '/quest-map/', '/forum/',
        '/guilds/', '/horoscope/', '/scrolls/',
        '/categories/', '/en/', '/en/index/'
    ];

    function isExcluded() {
        var path = (window.location.pathname || '/').replace(/\/$/, '') || '/';
        for (var i = 0; i < EXCLUDE_PATHS.length; i++) {
            var ex = EXCLUDE_PATHS[i].replace(/\/$/, '') || '/';
            if (path === ex) return true;
        }
        return false;
    }

    // ============================================================
    // 💾 Состояние
    // ============================================================
    function loadState() {
        try {
            var v = localStorage.getItem(STATE_KEY);
            if (v === null) return true;   // по умолчанию — включён
            return v === '1';
        } catch(e) { return true; }
    }

    function saveState(enabled) {
        try { localStorage.setItem(STATE_KEY, enabled ? '1' : '0'); } catch(e) {}
    }

    // ============================================================
    // 🔄 Состояние модуля
    // ============================================================
    var isEnabled = loadState();
    var wakeLock = null;
    var retryIdx = 0;
    var retryTimer = null;
    var idleTimer = null;
    var initialized = false;

    // ============================================================
    // 📣 Событие для других скриптов
    // ============================================================
    function emitChange() {
        try {
            window.dispatchEvent(new CustomEvent('mars-wakelock-change', {
                detail: { enabled: isEnabled, active: isActive() }
            }));
        } catch(e) {}
    }

    function isActive() {
        return !!(wakeLock && !wakeLock.released);
    }

    // ============================================================
    // 🔒 Запрос Wake Lock
    // ============================================================
    async function requestWakeLock() {
        if (!isEnabled) return;
        if (document.visibilityState !== 'visible') return;
        if (isActive()) return;

        try {
            wakeLock = await navigator.wakeLock.request('screen');
            retryIdx = 0;
            log('лок захвачен');

            wakeLock.addEventListener('release', function() {
                log('лок отпущен');
                wakeLock = null;
                emitChange();
            });

            emitChange();

            // Заводим idle-таймер
            scheduleIdleRelease();

        } catch (err) {
            log('ошибка:', err && err.message);

            // NotAllowedError — пользователь не взаимодействовал с сайтом
            // WaitingForPreviousRelease — не наш случай
            // Всё остальное — retry с backoff
            if (retryIdx < RETRY_DELAYS.length) {
                var delay = RETRY_DELAYS[retryIdx++];
                log('retry через', delay, 'мс');
                if (retryTimer) clearTimeout(retryTimer);
                retryTimer = setTimeout(requestWakeLock, delay);
            }
        }
    }

    // ============================================================
    // 🛑 Освобождение
    // ============================================================
    async function releaseWakeLock() {
        clearIdleTimer();
        if (retryTimer) {
            clearTimeout(retryTimer);
            retryTimer = null;
        }
        if (!wakeLock) return;
        try {
            await wakeLock.release();
        } catch(e) {}
        wakeLock = null;
        emitChange();
    }

    // ============================================================
    // ⏱️ Idle — если пользователь не двигается, отпускаем лок
    // ============================================================
    function clearIdleTimer() {
        if (idleTimer) {
            clearTimeout(idleTimer);
            idleTimer = null;
        }
    }

    function scheduleIdleRelease() {
        clearIdleTimer();
        if (!isEnabled) return;
        idleTimer = setTimeout(function() {
            log('idle 30с — отпускаем лок');
            if (wakeLock) {
                try { wakeLock.release(); } catch(e) {}
                wakeLock = null;
                emitChange();
            }
        }, IDLE_MS);
    }

    function onUserActivity() {
        if (!isEnabled) return;
        if (document.visibilityState !== 'visible') return;

        if (isActive()) {
            // Просто продлеваем idle-таймер
            scheduleIdleRelease();
        } else {
            // Лок отпущен по idle — можно захватить снова
            requestWakeLock();
        }
    }

    // ============================================================
    // 👁️ Смена вкладки
    // ============================================================
    function onVisibilityChange() {
        if (document.visibilityState === 'visible') {
            requestWakeLock();
        } else {
            releaseWakeLock();
        }
    }

    // bfcache
    function onPageShow(e) {
        // e.persisted = true если из bfcache
        if (isEnabled) requestWakeLock();
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function init() {
        if (initialized) return;
        initialized = true;

        if (isExcluded()) {
            log('служебная страница — модуль неактивен');
            isEnabled = false;
            return;
        }

        if (!isEnabled) {
            log('пользователь отключил — не активируемся');
            return;
        }

        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('pageshow', onPageShow);

        // Активность — mouse, scroll, key, touch
        var activityHandler = throttleIdle(onUserActivity, 1000);
        document.addEventListener('mousemove', activityHandler, { passive: true });
        document.addEventListener('scroll', activityHandler, { passive: true });
        document.addEventListener('keydown', activityHandler, { passive: true });
        document.addEventListener('touchstart', activityHandler, { passive: true });

        // Первый захват — только если пользователь уже взаимодействовал
        // (иначе браузер кинет NotAllowedError)
        var firstInteraction = function() {
            document.removeEventListener('click', firstInteraction);
            document.removeEventListener('touchstart', firstInteraction);
            document.removeEventListener('keydown', firstInteraction);
            requestWakeLock();
        };
        document.addEventListener('click', firstInteraction, { passive: true, once: true });
        document.addEventListener('touchstart', firstInteraction, { passive: true, once: true });
        document.addEventListener('keydown', firstInteraction, { passive: true, once: true });

        log('v2 VIP активен');
    }

    // ============================================================
    // 🔧 Утилита: throttle
    // ============================================================
    function throttleIdle(fn, ms) {
        var last = 0;
        return function() {
            var now = Date.now();
            if (now - last < ms) return;
            last = now;
            fn.apply(this, arguments);
        };
    }

    // Запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsWakeLock = {
        enable: function() {
            isEnabled = true;
            saveState(true);
            initialized = false;
            init();
            requestWakeLock();
            emitChange();
        },
        disable: function() {
            isEnabled = false;
            saveState(false);
            releaseWakeLock();
            emitChange();
        },
        toggle: function() {
            if (isEnabled) window.marsWakeLock.disable();
            else window.marsWakeLock.enable();
        },
        isEnabled: function() { return isEnabled; },
        isActive: isActive,
        isSupported: function() { return 'wakeLock' in navigator; }
    };

    log('v2 VIP загружен');
})();
