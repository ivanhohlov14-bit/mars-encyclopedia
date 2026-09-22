// ============================================================
// profile-mobile.js — аварийная загрузка профиля для телефона
// Читает сессию из sb-* и mars-auth-v1, идёт напрямую в Supabase
// ============================================================
(function () {
    'use strict';

    var isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;

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

        try { raw = localStorage.getItem(SB_KEY); } catch (e) {}
        if (!raw) { try { raw = sessionStorage.getItem(SB_KEY); } catch (e) {} }
        if (!raw) { try { raw = localStorage.getItem(MY_KEY); } catch (e) {} }
        if (!raw) { try { raw = sessionStorage.getItem(MY_KEY); } catch (e) {} }

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
            } catch (e) {}
        }

        if (!raw) return null;

        try {
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) parsed = parsed[parsed.length - 1];
            if (!parsed || !parsed.access_token || !parsed.user) return null;
            if (parsed.expires_at && parsed.expires_at * 1000 < Date.now()) return null;
            return parsed;
        } catch (e) {
            return null;
        }
    }

    function findContainer() {
        return document.getElementById('profile-container') ||
               document.getElementById('profile-content') ||
               document.querySelector('.profile-container') ||
               document.querySelector('.profile-card') ||
               document.querySelector('main .md-content__inner');
    }

    function isErrorOrEmpty(container) {
        var html = container.innerHTML || '';
        return html.length < 50 ||
               html.indexOf('Не удалось загрузить') !== -1 ||
               html.indexOf('Загрузка') !== -1 ||
               html.indexOf('Вы не авторизованы') !== -1 ||
               html.indexOf('Вы не вошли') !== -1;
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
                if (k === 'avatar_url' || k === 'display_name' || k === 'username') continue;
                fields.push(
                    '<div style="display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px solid #eee;">' +
                    '<span style="color:#888;">' + escapeHtml(k) + '</span>' +
                    '<span style="color:#222;font-weight:600;">' + escapeHtml(String(profile[k])) + '</span>' +
                    '</div>'
                );
            }
        }

        container.innerHTML =
            '<div style="max-width:560px;margin:0 auto;font-family:Segoe UI,sans-serif;padding:0 8px;">' +
            '  <div style="background:#fff;border-radius:20px;padding:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);">' +
            '    <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">' +
            '      <img src="' + avatar + '" alt="Avatar" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid #6C63FF;">' +
            '      <div>' +
            '        <div style="font-size:1.2rem;font-weight:800;color:#1a1a2e;">' + escapeHtml(name) + '</div>' +
            '        <div style="color:#888;font-size:.85rem;">' + escapeHtml(u.email || '') + '</div>' +
            '      </div>' +
            '    </div>' +
            '    <div style="background:#f8f9fb;border-radius:12px;padding:12px;margin-bottom:12px;font-size:.8rem;color:#666;">' +
            '      ID: ' + escapeHtml(u.id || '') + '<br>Сессия: ✅ активна' +
            '    </div>' +
            '    <div style="font-size:.9rem;">' +
            (fields.length ? fields.join('') : '<div style="color:#888;">Дополнительных полей профиля нет.</div>') +
            '    </div>' +
            '    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">' +
            '      <a href="/profile/" style="background:#6C63FF;color:#fff;padding:10px 16px;border-radius:12px;text-decoration:none;font-weight:700;">Обновить</a>' +
            '      <a href="#" onclick="window.logoutUser();return false;" style="background:#f5f5f5;color:#c0392b;padding:10px 16px;border-radius:12px;text-decoration:none;font-weight:700;">Выйти</a>' +
            '    </div>' +
            '  </div>' +
            '</div>';
    }

    async function load() {
        var container = findContainer();
        if (!container) return;

        if (!isErrorOrEmpty(container)) return;

        var session = readSession();

        if (!session) {
            container.innerHTML =
                '<div style="max-width:560px;margin:0 auto;text-align:center;padding:40px 20px;background:#fff;border-radius:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);">' +
                '<h2>Вы не вошли</h2>' +
                '<p style="color:#888;">Войдите, чтобы просмотреть профиль.</p>' +
                '<a href="/login/" style="display:inline-block;margin-top:12px;background:#6C63FF;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:700;">Войти</a>' +
                '</div>';
            return;
        }

        container.innerHTML = '<div style="text-align:center;padding:30px;color:#888;">Загрузка профиля...</div>';

        try {
            var url = SUPABASE_URL + '/rest/v1/profiles?user_id=eq.' + encodeURIComponent(session.user.id) + '&select=*';

            var res = await fetch(url, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + session.access_token
                }
            });

            if (!res.ok) {
                throw new Error('HTTP ' + res.status);
            }

            var arr = await res.json();
            var profile = Array.isArray(arr) && arr.length ? arr[0] : null;
            render(container, session, profile);

        } catch (e) {
            container.innerHTML =
                '<div style="max-width:560px;margin:0 auto;text-align:center;padding:30px;background:#fff;border-radius:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);">' +
                '<h2>Не удалось загрузить профиль</h2>' +
                '<p style="color:#888;">' + escapeHtml(e.message) + '</p>' +
                '<p style="font-size:.8rem;color:#aaa;">Проверьте интернет и войдите заново.</p>' +
                '<a href="/login/" style="display:inline-block;margin-top:12px;background:#6C63FF;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:700;">Войти</a>' +
                '</div>';
        }
    }

    function start() {
        setTimeout(load, 1500);
        setTimeout(load, 3500);
        window.addEventListener('pageshow', function () {
            setTimeout(load, 800);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
