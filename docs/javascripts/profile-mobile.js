// ============================================================
// profile-mobile.js v2 — аварийная загрузка профиля на телефоне
// MutationObserver ловит ошибку и сразу перерисовывает
// ============================================================
(function () {
    'use strict';

    var isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var DEBUG = /[?&](pm_debug|debug)=1/.test(location.search);

    function log() {
        var args = Array.prototype.slice.call(arguments);
        try { console.log.apply(console, ['[profile-mobile]'].concat(args)); } catch (e) {}
        if (DEBUG) {
            var el = document.getElementById('pm-debug-log') || (function () {
                var d = document.createElement('div');
                d.id = 'pm-debug-log';
                d.style.cssText = 'position:fixed;bottom:0;left:0;right:0;max-height:45vh;overflow:auto;background:rgba(0,0,0,.88);color:#0f0;font-family:monospace;font-size:11px;padding:6px;z-index:999999;white-space:pre-wrap;border-top:2px solid #0f0;';
                document.body.appendChild(d);
                return d;
            })();
            el.textContent += args.map(function (a) {
                return typeof a === 'string' ? a : (function () { try { return JSON.stringify(a); } catch (e) { return String(a); } })();
            }).join(' ') + '\n';
            el.scrollTop = el.scrollHeight;
        }
    }

    if (!isMobile) { log('not mobile, skip'); return; }
    log('MOBILE DETECTED, v2 loaded', new Date().toISOString());

    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';

    var ERROR_PATTERNS = [
        'не удалось загрузить',
        'не удалось',
        'вы не авторизованы',
        'вы не вошли',
        'войдите, чтобы',
        'ошибка загрузки',
        'failed to load',
        'unauthorized'
    ];

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function (m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    function readSession() {
        var raw = null;
        try { raw = localStorage.getItem(SB_KEY); log('LS SB_KEY:', !!raw); } catch (e) { log('LS SB_KEY err', e.message); }
        if (!raw) { try { raw = sessionStorage.getItem(SB_KEY); log('SS SB_KEY:', !!raw); } catch (e) {} }
        if (!raw) { try { raw = localStorage.getItem(MY_KEY); log('LS MY_KEY:', !!raw); } catch (e) {} }
        if (!raw) { try { raw = sessionStorage.getItem(MY_KEY); log('SS MY_KEY:', !!raw); } catch (e) {} }

        if (!raw) {
            try {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var c = cookies[i].trim();
                    if (c.indexOf(SB_KEY + '=') === 0) { raw = decodeURIComponent(c.substring(SB_KEY.length + 1)); log('cookie SB_KEY found'); break; }
                    if (c.indexOf(MY_KEY + '=') === 0) { raw = decodeURIComponent(c.substring(MY_KEY.length + 1)); log('cookie MY_KEY found'); break; }
                }
            } catch (e) {}
        }

        if (!raw) { log('no raw session anywhere'); return null; }

        try {
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) parsed = parsed[parsed.length - 1];
            if (!parsed || !parsed.access_token || !parsed.user) { log('parsed invalid'); return null; }
            if (parsed.expires_at && parsed.expires_at * 1000 < Date.now()) { log('session expired'); return null; }
            log('session OK:', parsed.user.email, parsed.user.id);
            return parsed;
        } catch (e) { log('JSON parse err', e.message); return null; }
    }

    function hasError(container) {
        var txt = (container.innerText || container.textContent || '').toLowerCase();
        for (var i = 0; i < ERROR_PATTERNS.length; i++) {
            if (txt.indexOf(ERROR_PATTERNS[i]) !== -1) return true;
        }
        return false;
    }

    function getCandidates() {
        return document.querySelectorAll(
            '#profile-container, #profile-content, .profile-container, .profile-card, ' +
            'main .md-content__inner, article.md-content__inner, main article, .md-content'
        );
    }

    function render(container, session, profile) {
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
                fields.push(
                    '<div style="display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid #eee;">' +
                    '<span style="color:#888;">' + escapeHtml(k) + '</span>' +
                    '<span style="color:#222;font-weight:600;text-align:right;">' + escapeHtml(String(v)) + '</span>' +
                    '</div>'
                );
            }
        }

        container.innerHTML =
            '<div style="max-width:560px;margin:0 auto;font-family:Segoe UI,sans-serif;padding:0 8px;">' +
            '  <div style="background:#fff;border-radius:20px;padding:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);">' +
            '    <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">' +
            '      <img src="' + avatar + '" alt="Avatar" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid #6C63FF;">' +
            '      <div style="min-width:0;">' +
            '        <div style="font-size:1.2rem;font-weight:800;color:#1a1a2e;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(name) + '</div>' +
            '        <div style="color:#888;font-size:.85rem;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(u.email || '') + '</div>' +
            '      </div>' +
            '    </div>' +
            '    <div style="background:#f8f9fb;border-radius:12px;padding:12px;margin-bottom:12px;font-size:.78rem;color:#666;">' +
            '      ID: ' + escapeHtml(u.id || '') + '<br>Сессия: ✅ активна' +
            '    </div>' +
            '    <div style="font-size:.9rem;">' +
            (fields.length ? fields.join('') : '<div style="color:#888;padding:8px 0;">Дополнительных полей профиля нет.</div>') +
            '    </div>' +
            '    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">' +
            '      <a href="/profile/" style="background:#6C63FF;color:#fff;padding:10px 16px;border-radius:12px;text-decoration:none;font-weight:700;">Обновить</a>' +
            '      <a href="#" onclick="window.logoutUser&&window.logoutUser();return false;" style="background:#f5f5f5;color:#c0392b;padding:10px 16px;border-radius:12px;text-decoration:none;font-weight:700;">Выйти</a>' +
            '    </div>' +
            '  </div>' +
            '</div>';
    }

    var loading = false;
    async function load(container) {
        if (loading) { log('load in progress, skip'); return; }
        loading = true;
        try {
            log('=== LOAD START ===');
            var session = readSession();
            if (!session) {
                container.innerHTML =
                    '<div style="max-width:560px;margin:0 auto;text-align:center;padding:40px 20px;background:#fff;border-radius:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);">' +
                    '<h2>Вы не вошли</h2>' +
                    '<p style="color:#888;">Войдите, чтобы просмотреть профиль.</p>' +
                    '<a href="/login/" style="display:inline-block;margin-top:12px;background:#6C63FF;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:700;">Войти</a>' +
                    '</div>';
                log('rendered: not logged in');
                return;
            }

            container.innerHTML = '<div style="text-align:center;padding:30px;color:#888;">Загрузка профиля...</div>';

            var url = SUPABASE_URL + '/rest/v1/profiles?user_id=eq.' + encodeURIComponent(session.user.id) + '&select=*';
            log('fetch:', url);

            var res = await fetch(url, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + session.access_token
                }
            });
            log('fetch status:', res.status);

            if (!res.ok) {
                var body = await res.text();
                log('fetch body:', body.substring(0, 300));
                throw new Error('HTTP ' + res.status);
            }

            var arr = await res.json();
            log('data:', arr);
            var profile = Array.isArray(arr) && arr.length ? arr[0] : null;
            render(container, session, profile);
            log('rendered OK');
        } catch (e) {
            log('LOAD ERROR:', e.message);
            container.innerHTML =
                '<div style="max-width:560px;margin:0 auto;text-align:center;padding:30px;background:#fff;border-radius:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);">' +
                '<h2>Не удалось загрузить профиль</h2>' +
                '<p style="color:#888;">' + escapeHtml(e.message) + '</p>' +
                '<p style="font-size:.8rem;color:#aaa;">Проверьте интернет и войдите заново.</p>' +
                '<a href="/login/" style="display:inline-block;margin-top:12px;background:#6C63FF;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:700;">Войти</a>' +
                '</div>';
        } finally {
            loading = false;
        }
    }

    function setupWatchers() {
        var containers = getCandidates();
        if (!containers.length) return;
        log('containers found:', containers.length);

        containers.forEach(function (c) {
            if (c.__pmWatched) return;
            c.__pmWatched = true;
            log('watch:', c.id || c.className);

            // Проверим сразу — вдруг ошибка уже есть
            if (hasError(c)) {
                log('error already present → replace');
                load(c);
                return;
            }

            var observer = new MutationObserver(function () {
                if (hasError(c)) {
                    log('error detected via observer → replace');
                    observer.disconnect();
                    c.__pmWatched = false;
                    load(c);
                }
            });
            observer.observe(c, { childList: true, subtree: true, characterData: true });
        });
    }

    // Следим 30 секунд — контейнер может появиться позже
    var tries = 0;
    var iv = setInterval(function () {
        tries++;
        setupWatchers();
        if (tries >= 30) clearInterval(iv);
    }, 1000);

    window.addEventListener('pageshow', function () { setTimeout(setupWatchers, 500); });

    log('initialized v2');
})();
