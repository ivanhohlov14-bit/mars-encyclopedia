// ============================================================
// auth-button.js — читает сессию из ОБОИХ ключей
// ============================================================
(function() {
    'use strict';

    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SUPABASE_URL = 'https://' + PROJECT_REF + '.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';

    var profileCache = {};
    var PROFILE_TTL = 5 * 60 * 1000;

    // ============================================================
    // 📖 ЧТЕНИЕ СЕССИИ — из обоих ключей
    // ============================================================
    function readSession() {
        var raw = null;

        // Пробуем sb-* (основной для supabase-js)
        try { raw = localStorage.getItem(SB_KEY); } catch(e) {}
        if (!raw) { try { raw = sessionStorage.getItem(SB_KEY); } catch(e) {} }

        // Пробуем mars-auth-v1
        if (!raw) { try { raw = localStorage.getItem(MY_KEY); } catch(e) {} }
        if (!raw) { try { raw = sessionStorage.getItem(MY_KEY); } catch(e) {} }

        // Cookie
        if (!raw) {
            try {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var c = cookies[i].trim();
                    if (c.indexOf(SB_KEY + '=') === 0) {
                        raw = decodeURIComponent(c.substring(SB_KEY.length + 1));
                        break;
                    }
                    if (c.indexOf(MY_KEY + '=') === 0) {
                        raw = decodeURIComponent(c.substring(MY_KEY.length + 1));
                        break;
                    }
                }
            } catch(e) {}
        }

        if (!raw) return null;

        try {
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) parsed = parsed[parsed.length - 1];
            if (!parsed || !parsed.access_token || !parsed.user) return null;
            if (parsed.expires_at && parsed.expires_at * 1000 < Date.now()) return null;
            return parsed;
        } catch(e) {
            return null;
        }
    }

    // ============================================================
    // 📥 ПРОФИЛЬ
    // ============================================================
    async function fetchProfile(session) {
        var userId = session.user.id;
        var cached = profileCache[userId];
        if (cached && cached.expires > Date.now()) return cached.data;

        try {
            var url = SUPABASE_URL + '/rest/v1/profiles?user_id=eq.' + userId + '&select=display_name,username,avatar_url&limit=1';
            var res = await fetch(url, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + session.access_token
                }
            });
            if (!res.ok) return null;

            var arr = await res.json();
            var profile = Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
            profileCache[userId] = { data: profile, expires: Date.now() + PROFILE_TTL };
            return profile;
        } catch(e) {
            return null;
        }
    }

    // ============================================================
    // 🔧 УТИЛИТЫ
    // ============================================================
    function isMobile() { return window.innerWidth <= 768; }

    function getInitials(name) {
        if (!name) return '?';
        var p = String(name).trim().split(/[\s._-]+/);
        return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : name[0].toUpperCase();
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    // ============================================================
    // 🎨 КОНТЕЙНЕР
    // ============================================================
    function ensureContainer() {
        var container = document.getElementById('auth-btn-container');
        if (container) return container;

        container = document.createElement('div');
        container.id = 'auth-btn-container';

        if (isMobile()) {
            var oldTop = document.querySelector('.wy-nav-top');
            if (oldTop) oldTop.style.display = 'none';

            var customHeader = document.getElementById('custom-mobile-header');
            if (!customHeader) {
                customHeader = document.createElement('div');
                customHeader.id = 'custom-mobile-header';
                customHeader.style.cssText = 'position:fixed;top:0;left:0;right:0;height:50px;background:#6C63FF;z-index:9999;display:flex;align-items:center;padding:0 8px;box-shadow:0 2px 8px rgba(0,0,0,0.15);gap:6px;';

                var hamburger = document.createElement('button');
                hamburger.id = 'mobile-hamburger';
                hamburger.textContent = '☰';
                hamburger.style.cssText = 'background:transparent;border:none;color:#fff;font-size:22px;cursor:pointer;padding:6px 8px;flex-shrink:0;line-height:1;';
                hamburger.onclick = function() {
                    var sidebar = document.querySelector('.wy-nav-side');
                    if (sidebar) sidebar.classList.toggle('shift');
                };

                container.style.cssText = 'display:flex !important;align-items:center !important;gap:4px !important;margin-left:auto !important;flex-shrink:0 !important;';

                customHeader.appendChild(hamburger);
                customHeader.appendChild(container);
                document.body.prepend(customHeader);
            } else {
                container.style.cssText = 'display:flex !important;align-items:center !important;gap:4px !important;margin-left:auto !important;flex-shrink:0 !important;';
                customHeader.appendChild(container);
            }
            return container;
        }

        var header = document.querySelector('header');
        if (header) {
            container.style.cssText = 'display:inline-flex;align-items:center;gap:6px;float:right;margin-top:6px;margin-right:10px;flex-wrap:wrap;max-width:100%;position:relative;z-index:1000;';
            header.appendChild(container);
            return container;
        }

        container.style.cssText = 'position:fixed !important;top:10px !important;right:10px !important;z-index:99999 !important;background:rgba(255,255,255,0.9) !important;border-radius:20px !important;padding:4px 12px !important;box-shadow:0 2px 12px rgba(0,0,0,0.15) !important;display:flex !important;align-items:center !important;gap:6px !important;';
        document.body.prepend(container);
        return container;
    }

    // ============================================================
    // 🎨 РЕНДЕР
    // ============================================================
    async function updateUI() {
        var container = ensureContainer();
        if (!container) return;

        var session = readSession();

        if (!session || !session.user) {
            if (isMobile()) {
                container.innerHTML =
                    '<div style="display: flex; align-items: center; gap: 3px;">' +
                    '  <a href="/login/" style="color: #fff; text-decoration: none; font-size: 0.7rem; opacity: 0.8;">Войти</a>' +
                    '  <a href="/register/" style="color: #fff; background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 12px; text-decoration: none; font-size: 0.7rem;">Регистрация</a>' +
                    '</div>';
            } else {
                container.innerHTML =
                    '<div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">' +
                    '  <a href="/login/" style="color: #555; text-decoration: none; font-size: 0.8rem; white-space: nowrap;">Войти</a>' +
                    '  <a href="/register/" style="color: #fff; background: #6C63FF; padding: 4px 12px; border-radius: 16px; text-decoration: none; font-size: 0.8rem; white-space: nowrap;">Регистрация</a>' +
                    '</div>';
            }
            return;
        }

        var profile = await fetchProfile(session);
        var user = session.user;

        var username = (profile && (profile.display_name || profile.username))
            || (user.user_metadata && user.user_metadata.username)
            || (user.email ? user.email.split('@')[0] : 'Пользователь');

        var avatarUrl = (profile && profile.avatar_url)
            || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(getInitials(username)) + '&background=6C63FF&color=fff&size=32&rounded=true';

        var safeName = escapeHtml(username);

        if (isMobile()) {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 3px; background: rgba(255,255,255,0.15); border-radius: 20px; padding: 2px 6px 2px 4px; border: 1px solid rgba(255,255,255,0.1);">' +
                '  <img src="' + avatarUrl + '" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); object-fit: cover;">' +
                '  <a href="/profile/" style="color: #fff; text-decoration: none; font-size: 0.6rem; opacity: 0.9;">Профиль</a>' +
                '  <a href="#" onclick="window.logoutUser(); return false;" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.6rem;">Выйти</a>' +
                '</div>';
        } else {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 6px; background: #f5f5f5; padding: 4px 10px; border-radius: 20px; flex-wrap: wrap;">' +
                '  <img src="' + avatarUrl + '" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ddd; object-fit: cover;">' +
                '  <span style="font-size: 0.75rem; color: #333; max-width: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + safeName + '</span>' +
                '  <a href="/profile/" style="color: #6C63FF; text-decoration: none; font-size: 0.75rem; white-space: nowrap;">Профиль</a>' +
                '  <a href="#" onclick="window.logoutUser(); return false;" style="color: #c0392b; text-decoration: none; font-size: 0.75rem; white-space: nowrap;">Выйти</a>' +
                '</div>';
        }
    }

    // ============================================================
    // 🚪 ВЫХОД
    // ============================================================
    window.logoutUser = function() {
        try { localStorage.removeItem(SB_KEY); } catch(e) {}
        try { localStorage.removeItem(MY_KEY); } catch(e) {}
        try { sessionStorage.removeItem(SB_KEY); } catch(e) {}
        try { sessionStorage.removeItem(MY_KEY); } catch(e) {}
        try { document.cookie = SB_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch(e) {}
        try { document.cookie = MY_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch(e) {}
        try {
            var toRemove = [];
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                if (k && (k.indexOf('sb-') === 0 || k.indexOf('mars-auth') === 0)) toRemove.push(k);
            }
            toRemove.forEach(function(k) { localStorage.removeItem(k); });
        } catch(e) {}
        profileCache = {};
        window.location.href = '/';
    };

    // ============================================================
    // 🔄 ОБНОВЛЕНИЕ
    // ============================================================
    window.addEventListener('pageshow', function() { updateUI(); });
    window.addEventListener('focus', function() { updateUI(); });
    window.addEventListener('storage', function(e) {
        if (e.key === SB_KEY || e.key === MY_KEY) updateUI();
    });

    var lastMobile = isMobile();
    var resizeTimer = null;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var nowMobile = isMobile();
            if (nowMobile !== lastMobile) {
                lastMobile = nowMobile;
                var oldC = document.getElementById('auth-btn-container');
                if (oldC) oldC.remove();
                var oldH = document.getElementById('custom-mobile-header');
                if (oldH) oldH.remove();
                var oldT = document.querySelector('.wy-nav-top');
                if (oldT && !nowMobile) oldT.style.display = '';
                updateUI();
            }
        }, 250);
    });

    function start() {
        updateUI();
        setTimeout(updateUI, 500);
        setTimeout(updateUI, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
