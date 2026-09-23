// ============================================================
// wake-lock.js — не даёт экрану гаснуть пока сайт открыт
// Работает на ПК и телефоне (Chrome, Edge, Safari 16.4+)
// ============================================================
(function() {
    'use strict';

    if (!('wakeLock' in navigator)) {
        console.log('📱 Wake Lock API не поддерживается этим браузером');
        return;
    }

    var wakeLock = null;
    var isEnabled = true;
    var retryTimer = null;

    // ============================================================
    // ЗАПРОС WAKE LOCK
    // ============================================================
    async function requestWakeLock() {
        if (!isEnabled) return;
        if (document.visibilityState !== 'visible') return;
        if (wakeLock && !wakeLock.released) return;

        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('☀️ Экран не гаснет');

            wakeLock.addEventListener('release', function() {
                wakeLock = null;
            });
        } catch (err) {
            console.warn('☀️ Wake Lock error:', err.message);
            // Если не получилось — попробуем позже
            if (retryTimer) clearTimeout(retryTimer);
            retryTimer = setTimeout(requestWakeLock, 5000);
        }
    }

    // ============================================================
    // ОСВОБОЖДЕНИЕ
    // ============================================================
    async function releaseWakeLock() {
        if (!wakeLock) return;
        try {
            await wakeLock.release();
        } catch(e) {}
        wakeLock = null;
    }

    // ============================================================
    // РЕАКЦИЯ НА СМЕНУ ВКЛАДКИ
    // ============================================================
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            requestWakeLock();
        } else {
            releaseWakeLock();
        }
    });

    // При возврате на страницу (bfcache)
    window.addEventListener('pageshow', function() {
        requestWakeLock();
    });

    // ============================================================
    // ПЕРВЫЙ ЗАПРОС (только после первого касания/клика)
    // ============================================================
    function firstTouch() {
        requestWakeLock();
        document.removeEventListener('click', firstTouch);
        document.removeEventListener('touchstart', firstTouch);
        document.removeEventListener('keydown', firstTouch);
    }

    document.addEventListener('click', firstTouch, { once: true, passive: true });
    document.addEventListener('touchstart', firstTouch, { once: true, passive: true });
    document.addEventListener('keydown', firstTouch, { once: true, passive: true });

    // ============================================================
    // ПУБЛИЧНОЕ API
    // ============================================================
    window.marsWakeLock = {
        enable: function() {
            isEnabled = true;
            requestWakeLock();
        },
        disable: function() {
            isEnabled = false;
            releaseWakeLock();
        },
        isEnabled: function() {
            return wakeLock !== null && !wakeLock.released;
        }
    };

    console.log('☀️ Wake Lock модуль готов');
})();
