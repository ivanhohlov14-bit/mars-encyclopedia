// ============================================================
// session-keeper.js — не даёт потерять сессию
// Периодически проверяет localStorage, восстанавливает из cookie
// ============================================================
(function () {
    'use strict';

    var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';
    var MY_KEY = 'mars-auth-v1';

    function getCookie(name) {
        try {
            var cs = document.cookie.split(';');
            for (var i = 0; i < cs.length; i++) {
                var c = cs[i].trim();
                if (c.indexOf(name + '=') === 0) return decodeURIComponent(c.substring(name.length + 1));
            }
        } catch (e) {}
        return null;
    }

    function isValidSession(raw) {
        if (!raw) return false;
        try {
            var p = JSON.parse(raw);
            if (Array.isArray(p)) p = p[p.length - 1];
            if (!p || !p.access_token || !p.user) return false;
            if (p.expires_at && p.expires_at * 1000 < Date.now()) return false;
            return true;
        } catch (e) { return false; }
    }

    function saveBoth(raw) {
        try { localStorage.setItem(MY_KEY, raw); } catch (e) {}
        try { localStorage.setItem(SB_KEY, raw); } catch (e) {}
        try { sessionStorage.setItem(MY_KEY, raw); } catch (e) {}
    }

    function check() {
        var myRaw = null, sbRaw = null, cookieMy = null, cookieSb = null;
        try { myRaw = localStorage.getItem(MY_KEY); } catch (e) {}
        try { sbRaw = localStorage.getItem(SB_KEY); } catch (e) {}
        cookieMy = getCookie(MY_KEY);
        cookieSb = getCookie(SB_KEY);

        // 1. Если MY_KEY валидна — синхронизируем sb-*
        if (isValidSession(myRaw)) {
            if (!isValidSession(sbRaw)) saveBoth(myRaw);
            return;
        }

        // 2. Если MY_KEY нет, но sb-* есть — восстановим MY_KEY
        if (isValidSession(sbRaw)) {
            saveBoth(sbRaw);
            return;
        }

        // 3. Если оба пусты, но cookie есть — восстановим
        var fromCookie = isValidSession(cookieMy) ? cookieMy : (isValidSession(cookieSb) ? cookieSb : null);
        if (fromCookie) {
            saveBoth(fromCookie);
        }
    }

    // Проверяем при загрузке и каждые 2 секунды
    check();
    setInterval(check, 2000);
    window.addEventListener('pageshow', check);
    window.addEventListener('focus', check);
    document.addEventListener('visibilitychange', check);
})();
