// ============================================================
// profile-mobile.js v3 — работает всегда, лог сразу
// ============================================================
(function () {
    'use strict';

    var DEBUG = /[?&](pm_debug|debug)=1/.test(location.search);

    // Всегда показываем лог если ?pm_debug=1
    function log() {
        var args = Array.prototype.slice.call(arguments);
        try { console.log.apply(console, ['[pm]'].concat(args)); } catch (e) {}
        if (!DEBUG) return;
        var el = document.getElementById('pm-debug-log');
        if (!el) {
            el = document.createElement('div');
            el.id = 'pm-debug-log';
            el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;max-height:50vh;overflow:auto;background:rgba(0,0,0,.9);color:#0f0;font-family:monospace;font-size:12px;padding:8px;z-index:2147483647;white-space:pre-wrap;border-top:2px solid #0f0;';
            (document.body || document.documentElement).appendChild(el);
        }
        el.textContent += args.map(function (a) {
            if (typeof a === 'string') return a;
            try { return JSON.stringify(a); } catch (e) { return String(a); }
        }).join(' ') + '\n';
        el.scrollTop = el.scrollHeight;
    }

    log('=== profile-mobile v3 loaded ===');
    log('URL:', location.href);
    log('UA:', navigator.userAgent);

    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function (m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    function readSession() {
        var raw = null;
        try { raw = localStorage.getItem(SB_KEY); log('LS SB_KEY len:', raw ? raw.length : 0); } catch (e) {}
        if (!raw) { try { raw = localStorage.getItem(MY_KEY); log('LS MY_KEY len:', raw ? raw.length : 0); } catch (e) {} }
        if (!raw) { try { raw = sessionStorage.getItem(SB_KEY); log('SS SB_KEY len:', raw ? raw.length : 0); } catch (e) {} }
        if (!raw) { try { raw = sessionStorage.getItem(MY_KEY); log('SS MY_KEY len:', raw ? raw.length : 0); } catch (e) {} }

        if (!raw) {
            try {
                var cs = document.cookie.split(';');
                for (var i = 0; i < cs.length; i++) {
                    var c = cs[i].trim();
                    if (c.indexOf(SB_KEY + '=') === 0) { raw = decodeURIComponent(c.substring(SB_KEY.length + 1)); log('cookie SB_KEY'); break; }
                    if (c.indexOf(MY_KEY + '=') === 0) { raw = decodeURIComponent(c.substring(MY_KEY.length + 1)); log('cookie MY_KEY'); break; }
                }
            } catch (e) {}
        }

        if (!raw) { log('❌ no raw session'); return null; }

        try {
            var p = JSON.parse(raw);
            if (Array.isArray(p)) p = p[p.length - 1];
            if (!p || !p.access_token || !p.user) { log('❌ parsed invalid'); return null; }
            if (p.expires_at && p.expires_at * 1000 < Date.now()) { log('❌ expired'); return null; }
            log('✅ session OK:', p.user.email, p.user.id);
            return p;
        } catch (e) { log('❌ JSON err', e.message); return null; }
    }

    var ERROR_PATTERNS = ['не удалось загрузить','не удалось','вы не авторизованы','вы не вошли','войдите, чтобы','ошибка загрузки','failed to load','unauthorized'];
    function hasError(c) {
        var t = (c.innerText || c.textContent || '').toLowerCase();
        for (var i = 0; i < ERROR_PATTERNS.length; i++) if (t.indexOf(ERROR_PATTERNS[i]) !== -1) return true;
        return false;
    }

    function getCandidates() {
        return document.querySelectorAll(
            '#profile-container, #profile-content, .profile-container, .profile-card, ' +
            'main .md-content__inner, article.md-content__inner, main article, .md-content, main'
        );
    }

    function render(c, session, profile) {
        var u = session.user;
        var name = (profile && (profile.display_name || profile.username)) ||
                   (u.user_metadata && u.user_metadata.username) ||
                   (u.email ? u.email.split('@')[0] : 'Пользователь');
        var avatar = (profile && profile.avatar_url) ||
            'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=6C63FF&color=fff&size=96&rounded=true';

        var fields = [];
        if (profile) {
            for (var k in profile) {
                if (!profile.hasOwnProperty(k)) continue;
                if (k === 'avatar_url' || k === 'display_name' || k === 'username' || k === 'user_id') continue;
                var v = profile[k];
                if (v === null || v === undefined || v === '') continue;
                if (typeof v === 'object') v = JSON.stringify(v);
                fields.push('<div style="display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid #eee;"><span style="color:#888;">' + escapeHtml(k) + '</span><span style="color:#222;font-weight:600;text-align:right;">' + escapeHtml(String(v)) + '</span></div>');
            }
        }

        c.innerHTML =
            '<div style="max-width:560px;margin:0 auto;font-family:Segoe UI,sans-serif;padding:0 8px;">' +
            '<div style="background:#fff;border-radius:20px;padding:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);">' +
            '<div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">' +
            '<img src="' + avatar + '" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid #6C63FF;">' +
            '<div style="min-width:0;"><div style="font-size:1.2rem;font-weight:800;color:#1a1a2e;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(name) + '</div>' +
            '<div style="color:#888;font-size:.85rem;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(u.email || '') + '</div></div></div>' +
            '<div style="background:#f8f9fb;border-radius:12px;padding:12px;margin-bottom:12px;font-size:.78rem;color:#666;">ID: ' + escapeHtml(u.id || '') + '<br>Сессия: ✅ активна</div>' +
            '<div style="font-size:.9rem;">' + (fields.length ? fields.join('') : '<div style="color:#888;padding:8px 0;">Доп. полей нет.</div>') + '</div>' +
            '<div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">' +
            '<a href="/profile/" style="background:#6C63FF;color:#fff;padding:10px 16px;border-radius:12px;text-decoration:none;font-weight:700;">Обновить</a>' +
            '<a href="#" onclick="window.logoutUser&&window.logoutUser();return false;" style="background:#f5f5f5;color:#c0392b;padding:10px 16px;border-radius:12px;text-decoration:none;font-weight:700;">Выйти</a>' +
            '</div></div></div>';
    }

    var busy = false;
    async function load(c) {
        if (busy) return;
        busy = true;
        try {
            log('--- load() started ---');
            var s = readSession();
            if (!s) {
                c.innerHTML = '<div style="max-width:560px;margin:0 auto;text-align:center;padding:40px 20px;background:#fff;border-radius:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);"><h2>Вы не вошли</h2><p style="color:#888;">Войдите, чтобы просмотреть профиль.</p><a href="/login/" style="display:inline-block;margin-top:12px;background:#6C63FF;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:700;">Войти</a></div>';
                log('rendered: not logged in');
                return;
            }
            c.innerHTML = '<div style="text-align:center;padding:30px;color:#888;">Загрузка профиля...</div>';
            var url = SUPABASE_URL + '/rest/v1/profiles?user_id=eq.' + encodeURIComponent(s.user.id) + '&select=*';
            log('fetch:', url);
            var res = await fetch(url, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + s.access_token } });
            log('status:', res.status);
            if (!res.ok) { var b = await res.text(); log('body:', b.substring(0, 200)); throw new Error('HTTP ' + res.status); }
            var arr = await res.json();
            log('rows:', arr.length);
            render(c, s, Array.isArray(arr) && arr.length ? arr[0] : null);
            log('✅ rendered');
        } catch (e) {
            log('❌ LOAD ERROR:', e.message);
            c.innerHTML = '<div style="max-width:560px;margin:0 auto;text-align:center;padding:30px;background:#fff;border-radius:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);"><h2>Не удалось загрузить профиль</h2><p style="color:#888;">' + escapeHtml(e.message) + '</p><a href="/login/" style="display:inline-block;margin-top:12px;background:#6C63FF;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:700;">Войти</a></div>';
        } finally { busy = false; }
    }

    function setup() {
        var cs = getCandidates();
        log('candidates:', cs.length);
        cs.forEach(function (c) {
            if (c.__pmWatched) return;
            c.__pmWatched = true;
            log('watch:', (c.id || c.className || c.tagName).toString().substring(0, 40));
            if (hasError(c)) {
                log('error present → replace now');
                load(c);
                return;
            }
            var obs = new MutationObserver(function () {
                if (hasError(c)) {
                    log('error detected → replace');
                    obs.disconnect();
                    c.__pmWatched = false;
                    load(c);
                }
            });
            obs.observe(c, { childList: true, subtree: true, characterData: true });
        });
    }

    var tries = 0;
    var iv = setInterval(function () {
        tries++;
        setup();
        if (tries >= 40) clearInterval(iv);
    }, 1000);
    setup();

    window.addEventListener('pageshow', function () { setTimeout(setup, 500); });
    log('v3 initialized');
})();
