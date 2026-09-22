// ============================================================
// profile-mobile.js — отдельный мобильный профиль
// Работает БЕЗ supabase-js. Только fetch.
// ============================================================
(function () {
    'use strict';

    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';

    var KINGDOMS = {
        'Аркадия':'#D4A574','Ксанф':'#3D3D3D','Эдем':'#F4A460','Эридания':'#F5D76E',
        'Кхонг':'#A9A9A9','Авсония':'#87CEEB','Кимерия':'#B19CD9','Серпентида':'#E57373',
        'Эритрей':'#64B5F6','Утопия':'#4DD0E1','Эллада':'#FF8A65','Аливасото':'#81C784'
    };

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function (m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function readSession() {
        var raw = null;
        try { raw = localStorage.getItem(MY_KEY); } catch (e) {}
        if (!raw) { try { raw = localStorage.getItem(SB_KEY); } catch (e) {} }
        if (!raw) { try { raw = sessionStorage.getItem(MY_KEY); } catch (e) {} }
        if (!raw) { try { raw = sessionStorage.getItem(SB_KEY); } catch (e) {} }
        if (!raw) {
            try {
                var cs = document.cookie.split(';');
                for (var i = 0; i < cs.length; i++) {
                    var c = cs[i].trim();
                    if (c.indexOf(MY_KEY + '=') === 0) { raw = decodeURIComponent(c.substring(MY_KEY.length + 1)); break; }
                    if (c.indexOf(SB_KEY + '=') === 0) { raw = decodeURIComponent(c.substring(SB_KEY.length + 1)); break; }
                }
            } catch (e) {}
        }
        if (!raw) return null;
        try {
            var p = JSON.parse(raw);
            if (Array.isArray(p)) p = p[p.length - 1];
            if (!p || !p.access_token || !p.user) return null;
            if (p.expires_at && p.expires_at * 1000 < Date.now()) return null;
            return p;
        } catch (e) { return null; }
    }

    async function api(path, opts) {
        opts = opts || {};
        var headers = { 'apikey': SUPABASE_KEY };
        if (opts.token) headers['Authorization'] = 'Bearer ' + opts.token;
        if (opts.body) headers['Content-Type'] = 'application/json';
        if (opts.prefer) headers['Prefer'] = opts.prefer;
        var res = await fetch(SUPABASE_URL + path, {
            method: opts.method || 'GET',
            headers: headers,
            body: opts.body ? JSON.stringify(opts.body) : undefined
        });
        var text = await res.text();
        if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + text.substring(0, 150));
        if (!text) return null;
        try { return JSON.parse(text); } catch (e) { return null; }
    }

    function getLevelInfo(exp) {
        exp = exp || 0;
        var level = 1;
        while (level < 100 && exp >= Math.floor(Math.pow(level + 1, 1.8) * 20)) level++;
        var curXp = Math.floor(Math.pow(level, 1.8) * 20);
        var nextXp = Math.floor(Math.pow(level + 1, 1.8) * 20);
        var pct = nextXp > curXp ? Math.min(((exp - curXp) / (nextXp - curXp)) * 100, 100) : 100;
        return { level: level, current: curXp, next: nextXp, percent: pct };
    }

    function render(container, session, profile) {
        var u = session.user;
        var name = (profile && (profile.display_name || profile.username)) || (u.email ? u.email.split('@')[0] : 'Пользователь');
        var avatar = (profile && profile.avatar_url) || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=6C63FF&color=fff&size=120&rounded=true';
        var kingdom = (profile && profile.kingdom) || 'Эдем';
        var color = KINGDOMS[kingdom] || '#6C63FF';
        var lvl = getLevelInfo(profile ? profile.experience : 0);
        var xp = profile ? (profile.experience || 0) : 0;

        container.innerHTML = [
            '<div style="max-width:560px;margin:0 auto;padding:12px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">',

            '<div style="background:linear-gradient(135deg,#1a1a2e,#2d1b3d,#4a2a3a);border-radius:20px;padding:22px 18px;color:#fff;margin-bottom:14px;position:relative;overflow:hidden;">',
            '  <div style="display:flex;align-items:center;gap:14px;">',
            '    <img src="' + avatar + '" style="width:76px;height:76px;border-radius:50%;border:3px solid rgba(255,255,255,.4);object-fit:cover;flex-shrink:0;">',
            '    <div style="min-width:0;flex:1;">',
            '      <div style="font-size:1.2rem;font-weight:800;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(name) + '</div>',
            '      <div style="font-size:.75rem;opacity:.75;margin-bottom:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(u.email || '') + '</div>',
            '      <div style="display:inline-block;background:rgba(255,255,255,.2);padding:3px 10px;border-radius:20px;font-size:.72rem;font-weight:700;">⭐ Ур. ' + lvl.level + '</div>',
            '    </div>',
            '  </div>',
            '  <div style="margin-top:14px;">',
            '    <div style="background:rgba(255,255,255,.2);border-radius:10px;height:8px;overflow:hidden;margin-bottom:5px;">',
            '      <div style="height:100%;width:' + lvl.percent + '%;background:linear-gradient(90deg,#A29BFE,#fff);border-radius:10px;"></div>',
            '    </div>',
            '    <div style="display:flex;justify-content:space-between;font-size:.68rem;opacity:.8;">',
            '      <span>XP: ' + xp + '</span>',
            '      <span>До ур. ' + (lvl.level + 1) + ': ' + Math.max(lvl.next - xp, 0) + '</span>',
            '    </div>',
            '  </div>',
            '</div>',

            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">',
            '  <div style="background:#fff;border-radius:14px;padding:14px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,.06);">',
            '    <div style="font-size:1.6rem;font-weight:900;color:' + color + ';">' + lvl.level + '</div>',
            '    <div style="font-size:.68rem;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Уровень</div>',
            '  </div>',
            '  <div style="background:#fff;border-radius:14px;padding:14px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,.06);">',
            '    <div style="font-size:1.6rem;font-weight:900;color:' + color + ';">' + xp + '</div>',
            '    <div style="font-size:.68rem;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Опыт</div>',
            '  </div>',
            '</div>',

            '<div style="background:#fff;border-radius:14px;padding:16px;margin-bottom:14px;box-shadow:0 4px 12px rgba(0,0,0,.06);">',
            '  <div style="font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Королевство</div>',
            '  <div style="font-size:1.1rem;font-weight:800;color:' + color + ';">' + escapeHtml(kingdom) + '</div>',
            '</div>',

            '<div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.06);margin-bottom:14px;">',
            '  <a href="/achievements/" style="display:flex;align-items:center;gap:12px;padding:14px 16px;text-decoration:none;color:#333;border-bottom:1px solid #f0f0f0;">',
            '    <span style="font-size:1.3rem;">🏅</span><span style="flex:1;font-weight:600;font-size:.9rem;">Достижения</span><span style="color:#ccc;">›</span></a>',
            '  <a href="/bookmarks/" style="display:flex;align-items:center;gap:12px;padding:14px 16px;text-decoration:none;color:#333;border-bottom:1px solid #f0f0f0;">',
            '    <span style="font-size:1.3rem;">📚</span><span style="flex:1;font-weight:600;font-size:.9rem;">Закладки</span><span style="color:#ccc;">›</span></a>',
            '  <a href="/guilds/" style="display:flex;align-items:center;gap:12px;padding:14px 16px;text-decoration:none;color:#333;border-bottom:1px solid #f0f0f0;">',
            '    <span style="font-size:1.3rem;">🏰</span><span style="flex:1;font-weight:600;font-size:.9rem;">Гильдии</span><span style="color:#ccc;">›</span></a>',
            '  <a href="/interactive/" style="display:flex;align-items:center;gap:12px;padding:14px 16px;text-decoration:none;color:#333;border-bottom:1px solid #f0f0f0;">',
            '    <span style="font-size:1.3rem;">🎮</span><span style="flex:1;font-weight:600;font-size:.9rem;">Интерактив</span><span style="color:#ccc;">›</span></a>',
            '  <a href="/quests/" style="display:flex;align-items:center;gap:12px;padding:14px 16px;text-decoration:none;color:#333;">',
            '    <span style="font-size:1.3rem;">🗺️</span><span style="flex:1;font-weight:600;font-size:.9rem;">Квесты</span><span style="color:#ccc;">›</span></a>',
            '</div>',

            '<div style="display:flex;gap:10px;margin-bottom:24px;">',
            '  <button onclick="window.mobileLogout()" style="flex:1;padding:13px;background:#e74c3c;color:#fff;border-radius:12px;border:none;font-weight:700;font-size:.9rem;cursor:pointer;font-family:inherit;">🚪 Выйти</button>',
            '</div>',

            '</div>'
        ].join('');
    }

    function showLogin(container) {
        container.innerHTML = [
            '<div style="max-width:400px;margin:60px auto;padding:20px;text-align:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">',
            '  <div style="font-size:4rem;margin-bottom:16px;">🔒</div>',
            '  <h2 style="margin:0 0 8px 0;color:#2c3e50;">Вы не вошли</h2>',
            '  <p style="color:#888;margin:0 0 20px 0;">Войдите, чтобы увидеть профиль</p>',
            '  <a href="/login/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">🔐 Войти</a>',
            '</div>'
        ].join('');
    }

    function showError(container, msg) {
        container.innerHTML = [
            '<div style="max-width:400px;margin:60px auto;padding:20px;text-align:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">',
            '  <div style="font-size:4rem;margin-bottom:16px;">⚠️</div>',
            '  <h2 style="margin:0 0 8px 0;color:#2c3e50;">Не удалось загрузить</h2>',
            '  <p style="color:#888;margin:0 0 8px 0;word-break:break-word;">' + escapeHtml(msg) + '</p>',
            '  <p style="color:#aaa;font-size:.82rem;margin:0 0 20px 0;">Проверьте интернет</p>',
            '  <button onclick="location.reload()" style="padding:12px 28px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;border:none;font-weight:700;cursor:pointer;font-family:inherit;">🔄 Обновить</button>',
            '</div>'
        ].join('');
    }

    window.mobileLogout = function () {
        try { localStorage.removeItem(MY_KEY); } catch (e) {}
        try { localStorage.removeItem(SB_KEY); } catch (e) {}
        try { sessionStorage.removeItem(MY_KEY); } catch (e) {}
        try { sessionStorage.removeItem(SB_KEY); } catch (e) {}
        try { document.cookie = MY_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch (e) {}
        try { document.cookie = SB_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch (e) {}
        window.location.href = '/';
    };

    async function load() {
        var container = document.getElementById('profile-app');
        if (!container) return;

        var session = readSession();

        if (!session) { showLogin(container); return; }

        container.innerHTML =
            '<div style="text-align:center;padding:60px 20px;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">' +
            '<div style="display:inline-block;width:40px;height:40px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:pmSpin .8s linear infinite;"></div>' +
            '<p style="color:#999;margin-top:16px;">Загрузка профиля...</p></div>';

        if (!document.getElementById('pm-spin-style')) {
            var st = document.createElement('style');
            st.id = 'pm-spin-style';
            st.textContent = '@keyframes pmSpin{to{transform:rotate(360deg)}}';
            document.head.appendChild(st);
        }

        try {
            var profiles = await api(
                '/rest/v1/profiles?user_id=eq.' + encodeURIComponent(session.user.id) + '&select=*',
                { token: session.access_token }
            );

            var profile = Array.isArray(profiles) && profiles.length ? profiles[0] : null;

            if (!profile) {
                try {
                    var created = await api('/rest/v1/profiles', {
                        method: 'POST',
                        token: session.access_token,
                        prefer: 'return=representation',
                        body: {
                            user_id: session.user.id,
                            username: session.user.email.split('@')[0],
                            display_name: session.user.email.split('@')[0]
                        }
                    });
                    profile = Array.isArray(created) && created.length ? created[0] : null;
                } catch (createErr) {
                    console.warn('[mobile profile] create failed:', createErr.message);
                }
            }

            render(container, session, profile);
        } catch (e) {
            console.error('[mobile profile]', e);
            showError(container, e.message);
        }
    }

    function tryStart(tries) {
        var container = document.getElementById('profile-app');
        if (container) {
            load();
        } else if (tries < 40) {
            setTimeout(function () { tryStart(tries + 1); }, 250);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { tryStart(0); });
    } else {
        tryStart(0);
    }
})();
