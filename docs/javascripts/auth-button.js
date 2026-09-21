// ============================================================
// auth-button.js — ЕДИНАЯ кнопка, без мобильной логики
// ============================================================
(function() {
    'use strict';

    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SUPABASE_URL = 'https://' + PROJECT_REF + '.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var MY_KEY = 'mars-auth-v1';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';

    var profileCache = {};
    var PROFILE_TTL = 5 * 60 * 1000;

    function readSession() {
        var raw = null;
        try { raw = localStorage.getItem(MY_KEY); } catch(e) {}
        if (!raw) { try { raw = sessionStorage.getItem(MY_KEY); } catch(e) {} }
        if (!raw) { try { raw = localStorage.getItem(SB_KEY); } catch(e) {} }
        if (!raw) { try { raw = sessionStorage.getItem(SB_KEY); } catch(e) {} }
        if (!raw) return null;
        try {
            var p = JSON.parse(raw);
            if (Array.isArray(p)) p = p[p.length - 1];
            if (!p || !p.access_token || !p.user) return null;
            if (p.expires_at && p.expires_at * 1000 < Date.now()) return null;
            return p;
        } catch(e) { return null; }
    }

    function fetchProfile(session) {
        var userId = session.user.id;
        var cached = profileCache[userId];
        if (cached && cached.expires > Date.now()) return Promise.resolve(cached.data);

        var url = SUPABASE_URL + '/rest/v1/profiles?user_id=eq.' + userId + '&select=display_name,username,avatar_url&limit=1';
        return fetch(url, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token }
        }).then(function(res) { return res.ok ? res.json() : null; })
          .then(function(arr) {
              var p = (Array.isArray(arr) && arr.length) ? arr[0] : null;
              profileCache[userId] = { data: p, expires: Date.now() + PROFILE_TTL };
              return p;
          }).catch(function() { return null; });
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function getInitials(name) {
        if (!name) return '?';
        var p = String(name).trim().split(/[\s._-]+/);
        return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : name[0].toUpperCase();
    }

    // ============================================================
    // Контейнер — ОДНА fixed-кнопка в правом верхнем углу
    // ============================================================
    function ensureContainer() {
        var c = document.getElementById('auth-btn-container');
        if (c) return c;

        c = document.createElement('div');
        c.id = 'auth-btn-container';
        c.style.cssText = 'position:fixed !important;top:8px !important;right:8px !important;z-index:99998 !important;display:flex !important;align-items:center !important;gap:6px !important;font-family:-apple-system,"Segoe UI",sans-serif !important;';
        document.body.appendChild(c);
        return c;
    }

    function updateUI() {
        var container = ensureContainer();
        var session = readSession();

        if (!session || !session.user) {
            container.innerHTML =
                '<a href="/login/" style="background:rgba(255,255,255,0.95);color:#6C63FF;padding:6px 14px;border-radius:20px;font-size:0.78rem;font-weight:700;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);white-space:nowrap;">🔐 Войти</a>';
            return;
        }

        var user = session.user;
        var tmp = (user.user_metadata && user.user_metadata.username) || (user.email ? user.email.split('@')[0] : 'Пользователь');
        var tmpAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(getInitials(tmp)) + '&background=6C63FF&color=fff&size=32&rounded=true';
        renderAuthorized(container, tmp, tmpAvatar);

        fetchProfile(session).then(function(profile) {
            if (!profile) return;
            var name = profile.display_name || profile.username || tmp;
            var av = profile.avatar_url || tmpAvatar;
            renderAuthorized(container, name, av);
        });
    }

    function renderAuthorized(container, name, avatar) {
        container.innerHTML =
            '<div style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.95);padding:4px 10px;border-radius:20px;box-shadow:0 2px 8px rgba(0,0,0,0.15);">' +
            '  <img src="' + avatar + '" alt="" style="width:26px;height:26px;border-radius:50%;object-fit:cover;border:2px solid #6C63FF;">' +
            '  <span style="font-size:0.75rem;color:#333;font-weight:700;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(name) + '</span>' +
            '  <a href="/profile/" style="color:#6C63FF;font-size:0.75rem;font-weight:700;text-decoration:none;white-space:nowrap;">Профиль</a>' +
            '  <a href="#" onclick="window.logoutUser();return false;" style="color:#c0392b;font-size:0.75rem;text-decoration:none;white-space:nowrap;">Выйти</a>' +
            '</div>';
    }

    window.logoutUser = function() {
        try { localStorage.removeItem(MY_KEY); } catch(e) {}
        try { localStorage.removeItem(SB_KEY); } catch(e) {}
        try { sessionStorage.removeItem(MY_KEY); } catch(e) {}
        try { sessionStorage.removeItem(SB_KEY); } catch(e) {}
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

    window.addEventListener('pageshow', updateUI);
    window.addEventListener('focus', updateUI);
    window.addEventListener('storage', function(e) {
        if (e.key === MY_KEY || e.key === SB_KEY) updateUI();
    });

    function start() {
        updateUI();
        setTimeout(updateUI, 500);
        setTimeout(updateUI, 1500);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
