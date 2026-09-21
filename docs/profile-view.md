---
title: Профиль
comments: false
---

<div id="profile-container">
    <div style="text-align:center;padding:60px 20px;">
        <div style="display:inline-block;width:48px;height:48px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:pfSpin 0.8s linear infinite;"></div>
        <p id="pf-status" style="color:#999;margin-top:16px;font-size:0.9rem;">Загрузка...</p>
        <div id="pf-debug" style="margin-top:20px;padding:12px;background:#f5f5f5;border-radius:8px;text-align:left;font-family:monospace;font-size:0.7rem;color:#555;max-width:500px;margin-left:auto;margin-right:auto;white-space:pre-wrap;word-break:break-all;max-height:200px;overflow-y:auto;display:none;"></div>
    </div>
</div>

<style>
@keyframes pfSpin { to { transform: rotate(360deg); } }
@keyframes pfFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
#profile-container { max-width:100%;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px; }
#profile-container a { text-decoration: none !important; }
.pf-card { max-width: 500px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; animation: pfFade 0.5s ease; }
.pf-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 22px; border-radius: 12px; border: none; font-family: inherit; font-size: 0.95rem; font-weight: 700; cursor: pointer; text-decoration: none !important; }
.pf-btn-primary { background: linear-gradient(135deg, #6C63FF, #A29BFE); color: #fff !important; }
.pf-btn-danger { background: transparent; color: #c0392b; border: 2px solid #f5c6c6; }
.pf-error { max-width: 500px; margin: 40px auto; padding: 40px 30px; text-align: center; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-left: 4px solid #e74c3c; }
.pf-error-icon { font-size: 3.5rem; margin-bottom: 12px; }
.pf-error-title { font-size: 1.3rem; font-weight: 800; color: #2c3e50; margin: 0 0 8px 0; }
.pf-error-sub { color: #888; font-size: 0.95rem; margin: 0 0 20px 0; line-height: 1.5; }
</style>

<script>
(function() {
    'use strict';

    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';

    var container = document.getElementById('profile-container');
    var debugLines = [];

    function log(m) {
        var t = new Date().toLocaleTimeString();
        debugLines.push('[' + t + '] ' + m);
        console.log(m);
        var el = document.getElementById('pf-debug');
        if (el) { el.textContent = debugLines.join('\n'); el.style.display = 'block'; }
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    var KINGDOM_COLORS = {
        'Аркадия': '#D4A574', 'Ксанф': '#3D3D3D', 'Эдем': '#F4A460',
        'Эридания': '#F5D76E', 'Кхонг': '#A9A9A9', 'Авсония': '#87CEEB',
        'Кимерия': '#B19CD9', 'Серпентида': '#E57373', 'Эритрей': '#64B5F6',
        'Утопия': '#4DD0E1', 'Эллада': '#FF8A65', 'Аливасото': '#81C784'
    };

    // ============================================================
    // 📖 ЧТЕНИЕ СЕССИИ
    // ============================================================
    function readSession() {
        var key = 'sb-' + PROJECT_REF + '-auth-token';
        var raw = null;
        try { raw = localStorage.getItem(key); } catch (e) { log('localStorage недоступен'); }
        if (!raw) { try { raw = sessionStorage.getItem(key); } catch (e) {} }
        if (!raw) { log('❌ Сессия не найдена'); return null; }

        try {
            var parsed = JSON.parse(raw);
            // Если это массив (старый формат) — берём последний
            if (Array.isArray(parsed)) parsed = parsed[parsed.length - 1];
            if (!parsed || !parsed.access_token || !parsed.user) {
                log('❌ Сессия повреждена');
                return null;
            }
            log('✅ Сессия найдена: ' + parsed.user.email);
            return parsed;
        } catch (e) {
            log('❌ Ошибка парсинга: ' + e.message);
            return null;
        }
    }

    // ============================================================
    // 🌐 ЗАПРОС К SUPABASE REST API
    // ============================================================
    async function apiGet(path, session) {
        var res = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + session.access_token,
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            log('⚠️ REST ' + res.status + ' для ' + path);
            return null;
        }
        return await res.json();
    }

    // ============================================================
    // ОШИБКА
    // ============================================================
    function showError(title, sub, action) {
        container.innerHTML = [
            '<div class="pf-error">',
            '  <div class="pf-error-icon">⚠️</div>',
            '  <h2 class="pf-error-title">' + escapeHtml(title) + '</h2>',
            '  <p class="pf-error-sub">' + (sub || '') + '</p>',
            action || '',
            '</div>',
            '<div style="max-width:500px;margin:20px auto;padding:14px;background:#f5f5f5;border-radius:10px;font-family:monospace;font-size:0.7rem;color:#666;white-space:pre-wrap;word-break:break-all;">',
            debugLines.join('\n'),
            '</div>'
        ].join('');
    }

    // ============================================================
    // ЗАГРУЗКА ПРОФИЛЯ
    // ============================================================
    async function loadProfile(session, profileUserId, isOwn) {
        log('Загрузка профиля: ' + profileUserId);

        var profiles = await apiGet('profiles?user_id=eq.' + profileUserId + '&select=*', session);
        var profile = profiles && profiles[0];

        if (!profile) {
            log('Профиль не найден');
            if (isOwn) {
                showError('Профиль не создан', 'Создайте профиль в настройках.',
                    '<a href="/profile/edit/" class="pf-btn pf-btn-primary">📝 Заполнить</a>');
            } else {
                showError('Пользователь не найден', '', '');
            }
            return;
        }

        log('✅ Профиль получен: ' + (profile.display_name || profile.username));

        var name = profile.display_name || profile.username || 'Аноним';
        var kingdom = profile.kingdom || 'Эдем';
        var color = KINGDOM_COLORS[kingdom] || '#6C63FF';
        var avatar = profile.avatar_url || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=' + color.replace('#','') + '&color=fff&size=128');

        var friendBtn = isOwn
            ? '<p style="color:#999;font-size:0.95rem;">👤 Это вы</p>'
            : '<button class="pf-btn pf-btn-primary" onclick="alert(\'Функция в разработке\')">➕ В друзья</button>';

        var ownActions = isOwn ? [
            '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px;">',
            '  <a href="/profile/edit/" class="pf-btn pf-btn-primary">✏️ Редактировать</a>',
            '  <button class="pf-btn pf-btn-danger" onclick="pfLogout()">🚪 Выйти</button>',
            '</div>'
        ].join('') : '';

        container.innerHTML = [
            '<div class="pf-card" style="border:2px solid ' + color + ';">',
            '  <div style="height:6px;background:' + color + ';"></div>',
            '  <div style="padding:30px 28px 24px 28px;text-align:center;">',
            '    <div style="position:relative;display:inline-block;">',
            '      <img src="' + avatar + '" onerror="this.src=\'https://ui-avatars.com/api/?name=?&background=6C63FF&color=fff&size=128\'" style="width:120px;height:120px;border-radius:50%;border:4px solid ' + color + ';object-fit:cover;">',
            '      <span style="position:absolute;bottom:4px;right:4px;background:' + color + ';color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;border:2px solid #fff;">' + (profile.level || 1) + '</span>',
            '    </div>',
            '    <h2 style="margin:16px 0 4px 0;font-size:1.6rem;color:#2c3e50;">' + escapeHtml(name) + '</h2>',
            '    <div style="margin:6px 0 12px 0;">',
            '      <span style="display:inline-flex;align-items:center;gap:6px;background:' + color + '20;color:' + color + ';padding:4px 14px;border-radius:20px;font-size:0.85rem;font-weight:600;">🏰 ' + escapeHtml(kingdom) + '</span>',
            '    </div>',
            '    <div style="display:flex;justify-content:center;gap:30px;margin:16px 0;padding:12px 0;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;">',
            '      <div><div style="font-size:1.2rem;font-weight:700;color:#2c3e50;">' + (profile.level || 1) + '</div><div style="font-size:0.75rem;color:#999;">Уровень</div></div>',
            '      <div><div style="font-size:1.2rem;font-weight:700;color:#2c3e50;">' + (profile.experience || 0) + '</div><div style="font-size:0.75rem;color:#999;">Опыт</div></div>',
            '      <div><div style="font-size:1rem;font-weight:700;color:#2c3e50;">' + new Date(profile.created_at || Date.now()).toLocaleDateString('ru-RU') + '</div><div style="font-size:0.75rem;color:#999;">На сайте</div></div>',
            '    </div>',
            (profile.bio ? '    <div style="background:#f8f9fa;padding:12px 16px;border-radius:8px;margin:12px 0 16px 0;text-align:left;font-size:0.95rem;color:#555;">📝 ' + escapeHtml(profile.bio) + '</div>' : ''),
            '    <div style="margin:16px 0;">' + friendBtn + '</div>',
            ownActions,
            '  </div>',
            '</div>'
        ].join('');

        log('✅ Профиль отрисован');
    }

    // ============================================================
    // ВЫХОД
    // ============================================================
    window.pfLogout = function() {
        try {
            var key = 'sb-' + PROJECT_REF + '-auth-token';
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        } catch (e) {}
        window.location.href = '/';
    };

    // ============================================================
    // СТАРТ
    // ============================================================
    function init() {
        log('══════ ИНИЦИАЛИЗАЦИЯ ══════');
        log('URL: ' + location.href);

        var session = readSession();
        if (!session) {
            showError('Вы не вошли', 'Войдите, чтобы просмотреть профиль.',
                '<a href="/login/" class="pf-btn pf-btn-primary">🔐 Войти</a>');
            return;
        }

        var params = new URLSearchParams(location.search);
        var urlUserId = params.get('user_id');
        var profileUserId = urlUserId || session.user.id;
        var isOwn = !urlUserId || urlUserId === session.user.id;

        loadProfile(session, profileUserId, isOwn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
