---
title: Профиль
comments: false
---

<div id="profile-container">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: pfSpin 0.8s linear infinite;"></div>
        <p id="pf-status" style="color: #999; margin-top: 16px; font-size: 0.9rem;">Инициализация...</p>
        <div id="pf-debug" style="margin-top: 20px; padding: 14px; background: #fff5f5; border: 1px solid #f5c6c6; border-radius: 10px; text-align: left; font-family: monospace; font-size: 0.75rem; color: #555; max-width: 500px; margin-left: auto; margin-right: auto; white-space: pre-wrap; word-break: break-all; display: none;"></div>
        <button id="pf-emergency" onclick="window.location.href='/login/'" style="display:none; margin-top: 20px; padding: 12px 24px; background: linear-gradient(135deg, #6C63FF, #A29BFE); color:#fff; border:none; border-radius:12px; font-family: inherit; font-size: 0.95rem; font-weight:700; cursor:pointer;">
            🔐 Перейти к входу
        </button>
    </div>
</div>

<style>
@keyframes pfSpin { to { transform: rotate(360deg); } }
@keyframes pfFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

#profile-container { max-width: 100%; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px; }
#profile-container a { text-decoration: none !important; }

.pf-card {
    max-width: 500px;
    margin: 0 auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    overflow: hidden;
    animation: pfFade 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.pf-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 12px;
    border: none;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    text-decoration: none !important;
}
.pf-btn-primary {
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff !important;
    box-shadow: 0 8px 20px -4px rgba(108, 99, 255, 0.4);
}
.pf-btn-danger {
    background: transparent;
    color: #c0392b;
    border: 2px solid #f5c6c6;
}

.pf-error {
    max-width: 500px;
    margin: 40px auto;
    padding: 40px 30px;
    text-align: center;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    border-left: 4px solid #e74c3c;
}
.pf-error-icon { font-size: 3.5rem; margin-bottom: 12px; }
.pf-error-title { font-size: 1.3rem; font-weight: 800; color: #2c3e50; margin: 0 0 8px 0; }
.pf-error-sub { color: #888; font-size: 0.95rem; margin: 0 0 20px 0; line-height: 1.5; }
</style>

<script>
(function() {
    'use strict';

    var SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    var SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    var container = document.getElementById('profile-container');
    var statusEl = document.getElementById('pf-status');
    var debugEl = document.getElementById('pf-debug');
    var emergencyBtn = document.getElementById('pf-emergency');

    // Логи
    var debugLines = [];
    function log(msg) {
        debugLines.push('[' + new Date().toLocaleTimeString() + '] ' + msg);
        console.log(msg);
        if (debugEl) {
            debugEl.textContent = debugLines.join('\n');
            debugEl.style.display = 'block';
        }
    }

    function setStatus(msg) {
        if (statusEl) statusEl.textContent = msg;
        log('STATUS: ' + msg);
    }

    // Таймаут
    function withTimeout(promise, ms, fallback) {
        return Promise.race([
            promise,
            new Promise(function(resolve) {
                setTimeout(function() { resolve(fallback); }, ms);
            })
        ]);
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    var KINGDOM_COLORS = {
        'Аркадия': '#D4A574', 'Ксанф': '#3D3D3D', 'Эдем': '#F4A460',
        'Эридания': '#F5D76E', 'Кхонг': '#A9A9A9', 'Авсония': '#87CEEB',
        'Кимерия': '#B19CD9', 'Серпентида': '#E57373', 'Эритрей': '#64B5F6',
        'Утопия': '#4DD0E1', 'Эллада': '#FF8A65', 'Аливасото': '#81C784'
    };

    // ============================================================
    // Клиент
    // ============================================================
    function getClient() {
        if (window.supabaseClient) { log('Клиент: window.supabaseClient'); return window.supabaseClient; }
        if (window._supabaseClient) { log('Клиент: window._supabaseClient'); return window._supabaseClient; }
        if (typeof supabase !== 'undefined') {
            try {
                var c = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                log('Клиент: создан новый');
                return c;
            } catch (e) {
                log('Клиент: ошибка — ' + e.message);
                return null;
            }
        }
        log('Клиент: supabase НЕ ЗАГРУЖЕН');
        return null;
    }

    // ============================================================
    // Показать ошибку
    // ============================================================
    function showError(title, subtitle, action) {
        container.innerHTML = [
            '<div class="pf-error">',
            '    <div class="pf-error-icon">⚠️</div>',
            '    <h2 class="pf-error-title">' + escapeHtml(title) + '</h2>',
            '    <p class="pf-error-sub">' + (subtitle || '') + '</p>',
            action || '',
            '</div>',
            '<div style="max-width: 500px; margin: 20px auto; padding: 14px; background: #f5f5f5; border-radius: 10px; text-align: left; font-family: monospace; font-size: 0.7rem; color: #666; white-space: pre-wrap; word-break: break-all;">',
            '    ' + debugLines.join('\n    '),
            '</div>'
        ].join('');
    }

    // ============================================================
    // Профиль
    // ============================================================
    async function loadProfile(client, userId, isOwn) {
        log('Загрузка профиля userId=' + userId + ' isOwn=' + isOwn);

        var profileResult = await withTimeout(
            client.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
            8000,
            { error: { message: 'timeout' }, data: null }
        );

        var profile = profileResult && profileResult.data;
        log('Профиль получен: ' + (profile ? 'да' : 'нет'));

        if (!profile) {
            if (isOwn) {
                showError('Профиль пуст', 'Вы вошли, но профиль не создан.',
                    '<a href="/profile/edit/" class="pf-btn pf-btn-primary">📝 Заполнить</a>');
            } else {
                showError('Пользователь не найден', '', '');
            }
            return;
        }

        var displayName = profile.display_name || profile.username || 'Аноним';
        var kingdom = profile.kingdom || 'Эдем';
        var kingdomColor = KINGDOM_COLORS[kingdom] || '#6C63FF';
        var avatar = profile.avatar_url || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(displayName) + '&background=' + kingdomColor.replace('#', '') + '&color=fff&size=128');

        // Флаг — БЕЗ ЗАПРОСА, просто проверяем существование через img onerror
        var flagPath = '/assets/images/flag-of-' + kingdom.toLowerCase() + '.png';

        var friendButton = isOwn
            ? '<p style="color: #999; font-size: 0.95rem;">👤 Это вы</p>'
            : '<button class="pf-btn pf-btn-primary" onclick="window.pfAddFriend(\'' + userId + '\')">➕ Добавить в друзья</button>';

        container.innerHTML = [
            '<div class="pf-card" style="border: 2px solid ' + kingdomColor + ';">',
            '    <div style="height: 6px; background: ' + kingdomColor + ';"></div>',
            '    <div style="padding: 30px 28px 24px 28px; text-align: center;">',
            '        <div style="position: relative; display: inline-block;">',
            '            <img src="' + avatar + '" alt="" onerror="this.src=\'https://ui-avatars.com/api/?name=?&background=6C63FF&color=fff&size=128\'" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid ' + kingdomColor + '; object-fit: cover;">',
            '            <span style="position: absolute; bottom: 4px; right: 4px; background: ' + kingdomColor + '; color: #fff; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; border: 2px solid #fff;">' + (profile.level || 1) + '</span>',
            '        </div>',
            '        <h2 style="margin: 16px 0 4px 0; font-size: 1.6rem; color: #2c3e50;">' + escapeHtml(displayName) + '</h2>',
            '        <div style="margin: 6px 0 12px 0;">',
            '            <span style="display: inline-flex; align-items: center; gap: 6px; background: ' + kingdomColor + '20; color: ' + kingdomColor + '; padding: 4px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">🏰 ' + escapeHtml(kingdom) + '</span>',
            '        </div>',
            '        <div style="display: flex; justify-content: center; gap: 30px; margin: 16px 0; padding: 12px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">',
            '            <div><div style="font-size: 1.2rem; font-weight: 700; color: #2c3e50;">' + (profile.level || 1) + '</div><div style="font-size: 0.75rem; color: #999;">Уровень</div></div>',
            '            <div><div style="font-size: 1.2rem; font-weight: 700; color: #2c3e50;">' + (profile.experience || 0) + '</div><div style="font-size: 0.75rem; color: #999;">Опыт</div></div>',
            '            <div><div style="font-size: 1rem; font-weight: 700; color: #2c3e50;">' + new Date(profile.created_at || Date.now()).toLocaleDateString('ru-RU') + '</div><div style="font-size: 0.75rem; color: #999;">На сайте с</div></div>',
            '        </div>',
            (profile.bio ? '        <div style="background: #f8f9fa; padding: 12px 16px; border-radius: 8px; margin: 12px 0 16px 0; text-align: left; font-size: 0.95rem; color: #555;">📝 ' + escapeHtml(profile.bio) + '</div>' : ''),
            '        <div style="margin: 16px 0;">' + friendButton + '</div>',
            (isOwn ? '        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 16px;"><a href="/profile/edit/" class="pf-btn pf-btn-primary">✏️ Редактировать</a><button class="pf-btn pf-btn-danger" onclick="window.pfLogout()">🚪 Выйти</button></div>' : ''),
            '    </div>',
            '</div>'
        ].join('');

        log('✅ Профиль отрисован');
    }

    // ============================================================
    // Действия
    // ============================================================
    window.pfLogout = async function() {
        var client = getClient();
        if (client) try { await client.auth.signOut(); } catch(e) {}
        try {
            var keys = [];
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                if (k && (k.indexOf('supabase') === 0 || k.indexOf('auth_profile_') === 0)) keys.push(k);
            }
            keys.forEach(function(k) { localStorage.removeItem(k); });
        } catch(e) {}
        window.location.href = '/';
    };

    window.pfAddFriend = async function(targetId) {
        var client = getClient();
        if (!client) return;
        try {
            var s = await client.auth.getSession();
            var u = s && s.data && s.data.session && s.data.session.user;
            if (!u) { alert('Войдите'); return; }
            await client.from('friends').insert([{ user_id: u.id, friend_id: targetId, status: 'pending' }]);
            alert('✅ Заявка отправлена!');
            window.location.reload();
        } catch(e) {
            alert('Не удалось');
        }
    };

    // ============================================================
    // СТАРТ
    // ============================================================
    // Экстренная кнопка через 6 секунд — если ничего не показалось
    setTimeout(function() {
        if (emergencyBtn && container.querySelector('#pf-status')) {
            emergencyBtn.style.display = 'inline-block';
            log('⏰ 6 секунд прошло — показываю запасную кнопку');
        }
    }, 6000);

    // Экстренный fallback через 12 секунд — форсированный переход
    setTimeout(function() {
        var stillLoading = container.querySelector('#pf-status');
        if (stillLoading) {
            log('⏰ 12 секунд — форсированный переход на /login/');
            showError(
                'Превышено время ожидания',
                'Что-то пошло не так. Проверьте подключение к интернету.',
                '<a href="/login/" class="pf-btn pf-btn-primary">🔐 Войти заново</a>'
            );
        }
    }, 12000);

    async function init() {
        setStatus('Шаг 1/5: Поиск клиента...');
        log('URL: ' + window.location.href);
        log('userAgent: ' + navigator.userAgent.substring(0, 80));
        log('localStorage доступен: ' + (function() {
            try { localStorage.setItem('__test', '1'); localStorage.removeItem('__test'); return 'да'; }
            catch(e) { return 'НЕТ — ' + e.message; }
        })());

        var client = getClient();
        if (!client) {
            setStatus('⚠️ Supabase не загрузился');
            // Пробуем через 1 сек
            setTimeout(function() {
                var c2 = getClient();
                if (c2) init2(c2);
                else showError('Ошибка подключения', 'Не удалось загрузить Supabase.', '<a href="/login/" class="pf-btn pf-btn-primary">🔐 Войти</a>');
            }, 1000);
            return;
        }

        init2(client);
    }

    async function init2(client) {
        setStatus('Шаг 2/5: Проверка сессии...');
        var sessionRes = await withTimeout(client.auth.getSession(), 5000, { data: null, _timeout: true });
        var session = sessionRes && sessionRes.data && sessionRes.data.session;
        var currentUser = session && session.user;

        log('Session timeout: ' + (sessionRes._timeout ? 'ДА' : 'нет'));
        log('Session: ' + (session ? 'есть' : 'нет'));
        log('User: ' + (currentUser ? currentUser.email : 'нет'));

        setStatus('Шаг 3/5: Определение профиля...');
        var urlParams = new URLSearchParams(window.location.search);
        var urlUserId = urlParams.get('user_id');

        var profileUserId, isOwn;
        if (urlUserId) {
            profileUserId = urlUserId;
            isOwn = !!(currentUser && currentUser.id === urlUserId);
        } else if (currentUser) {
            profileUserId = currentUser.id;
            isOwn = true;
        } else {
            setStatus('⚠️ Не залогинен');
            showError('Вы не вошли', 'Войдите в аккаунт, чтобы просмотреть профиль.', '<a href="/login/" class="pf-btn pf-btn-primary">🔐 Войти</a>');
            return;
        }

        setStatus('Шаг 4/5: Загрузка профиля...');
        try {
            await loadProfile(client, profileUserId, isOwn);
            setStatus('Готово');
        } catch (e) {
            log('❌ Ошибка loadProfile: ' + e.message);
            showError('Ошибка загрузки', e.message, '<a href="/login/" class="pf-btn pf-btn-primary">🔐 Войти</a>');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
