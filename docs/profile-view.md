---
title: Профиль
comments: false
---

<div id="profile-container">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: pfSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка профиля...</p>
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
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    text-decoration: none !important;
}
.pf-btn:hover { transform: translateY(-2px); }

.pf-btn-primary {
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff !important;
    box-shadow: 0 8px 20px -4px rgba(108, 99, 255, 0.4);
}
.pf-btn-primary:hover { box-shadow: 0 12px 28px -4px rgba(108, 99, 255, 0.5); }

.pf-btn-danger {
    background: transparent;
    color: #c0392b;
    border: 2px solid #f5c6c6;
}
.pf-btn-danger:hover { background: #e74c3c; color: #fff; border-color: #e74c3c; }

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

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
(function() {
    'use strict';

    var SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    var SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    var container = document.getElementById('profile-container');

    // ============================================================
    // Безопасный таймаут
    // ============================================================
    function withTimeout(promise, ms, fallback) {
        return Promise.race([
            promise,
            new Promise(function(resolve) {
                setTimeout(function() { resolve(fallback); }, ms);
            })
        ]);
    }

    // ============================================================
    // Экранирование
    // ============================================================
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    // ============================================================
    // Цвета королевств
    // ============================================================
    var KINGDOM_COLORS = {
        'Аркадия': '#D4A574',
        'Ксанф': '#3D3D3D',
        'Эдем': '#F4A460',
        'Эридания': '#F5D76E',
        'Кхонг': '#A9A9A9',
        'Авсония': '#87CEEB',
        'Кимерия': '#B19CD9',
        'Серпентида': '#E57373',
        'Эритрей': '#64B5F6',
        'Утопия': '#4DD0E1',
        'Эллада': '#FF8A65',
        'Аливасото': '#81C784'
    };

    // ============================================================
    // Клиент
    // ============================================================
    function getClient() {
        if (window.supabaseClient) return window.supabaseClient;
        if (window._supabaseClient) return window._supabaseClient;
        if (typeof supabase !== 'undefined') {
            try {
                return supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // ============================================================
    // Ошибка
    // ============================================================
    function showError(title, subtitle, action) {
        container.innerHTML = [
            '<div class="pf-error">',
            '    <div class="pf-error-icon">⚠️</div>',
            '    <h2 class="pf-error-title">' + escapeHtml(title) + '</h2>',
            '    <p class="pf-error-sub">' + (subtitle || '') + '</p>',
            action || '',
            '</div>'
        ].join('');
    }

    // ============================================================
    // Загрузка профиля
    // ============================================================
    async function loadProfile(client, userId, isOwn) {
        // Запрос профиля с таймаутом
        var profileResult = await withTimeout(
            client.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
            8000,
            { error: { message: 'timeout' }, data: null }
        );

        var profile = profileResult && profileResult.data;

        // Профиль не найден
        if (!profile) {
            if (isOwn) {
                // Свой профиль — показываем заглушку с предложением заполнить
                showError(
                    'Профиль пуст',
                    'Вы вошли, но профиль ещё не создан. Заполните его в настройках.',
                    '<a href="/profile/edit/" class="pf-btn pf-btn-primary">📝 Заполнить профиль</a>'
                );
                return;
            } else {
                showError('Пользователь не найден', 'Профиль с таким ID не существует.', '');
                return;
            }
        }

        // Данные
        var displayName = profile.display_name || profile.username || 'Аноним';
        var kingdom = profile.kingdom || 'Эдем';
        var kingdomColor = KINGDOM_COLORS[kingdom] || '#6C63FF';
        var avatar = profile.avatar_url || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(displayName) + '&background=' + kingdomColor.replace('#', '') + '&color=fff&size=128');

        // Флаг королевства (с таймаутом!)
        var flagPath = '/assets/images/flag-of-' + kingdom.toLowerCase() + '.png';
        var flagExists = false;
        try {
            var flagRes = await withTimeout(
                fetch(flagPath, { method: 'HEAD' }),
                2000,
                { ok: false }
            );
            flagExists = flagRes && flagRes.ok;
        } catch(e) {
            flagExists = false;
        }

        // Статус дружбы (только если не свой профиль)
        var friendButton = '';
        if (isOwn) {
            friendButton = '<p style="color: #999; font-size: 0.95rem;">👤 Это вы</p>';
        } else {
            // Пытаемся получить статус дружбы, но с таймаутом
            try {
                var currentUserRes = await withTimeout(client.auth.getSession(), 3000, { data: null });
                var currentUser = currentUserRes && currentUserRes.data && currentUserRes.data.session && currentUserRes.data.session.user;

                if (currentUser) {
                    var friendRes = await withTimeout(
                        client.from('friends').select('*')
                            .or('user_id.eq.' + currentUser.id + ',friend_id.eq.' + currentUser.id),
                        3000,
                        { data: null }
                    );
                    var friends = (friendRes && friendRes.data) || [];
                    var matched = friends.find(function(f) {
                        return (f.user_id === currentUser.id && f.friend_id === userId) ||
                               (f.user_id === userId && f.friend_id === currentUser.id);
                    });

                    if (matched) {
                        if (matched.status === 'pending') {
                            friendButton = '<button class="pf-btn" style="background: #f39c12; color:#fff; cursor:default;">⏳ Заявка отправлена</button>';
                        } else if (matched.status === 'accepted') {
                            friendButton = '<button class="pf-btn" style="background: #27ae60; color:#fff; cursor:default;">✅ В друзьях</button>';
                        }
                    } else {
                        friendButton = '<button class="pf-btn pf-btn-primary" onclick="window.pfAddFriend(\'' + userId + '\')">➕ Добавить в друзья</button>';
                    }
                } else {
                    friendButton = '<p style="color: #999; font-size: 0.9rem;">Войдите, чтобы добавить в друзья</p>';
                }
            } catch (e) {
                friendButton = '';
            }
        }

        // Рендер
        container.innerHTML = [
            '<div class="pf-card" style="border: 2px solid ' + kingdomColor + ';">',
            '    <div style="height: 6px; background: ' + kingdomColor + ';"></div>',
            '    <div style="padding: 30px 28px 24px 28px; text-align: center;">',

            '        <div style="position: relative; display: inline-block;">',
            '            <img src="' + avatar + '" alt="Avatar" onerror="this.src=\'https://ui-avatars.com/api/?name=?&background=6C63FF&color=fff&size=128\'" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid ' + kingdomColor + '; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">',
            '            <span style="position: absolute; bottom: 4px; right: 4px; background: ' + kingdomColor + '; color: #fff; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; border: 2px solid #fff;">',
            '                ' + (profile.level || 1),
            '            </span>',
            '        </div>',

            '        <h2 style="margin: 16px 0 4px 0; font-size: 1.6rem; color: #2c3e50;">' + escapeHtml(displayName) + '</h2>',

            '        <div style="margin: 6px 0 12px 0;">',
            '            <span style="display: inline-flex; align-items: center; gap: 6px; background: ' + kingdomColor + '20; color: ' + kingdomColor + '; padding: 4px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">',
            (flagExists ? '                <img src="' + flagPath + '" style="width: 20px; height: 14px; border-radius: 2px; object-fit: cover;">' : '                🏰'),
            '                ' + escapeHtml(kingdom),
            '            </span>',
            '        </div>',

            '        <div style="display: flex; justify-content: center; gap: 30px; margin: 16px 0; padding: 12px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">',
            '            <div>',
            '                <div style="font-size: 1.2rem; font-weight: 700; color: #2c3e50;">' + (profile.level || 1) + '</div>',
            '                <div style="font-size: 0.75rem; color: #999;">Уровень</div>',
            '            </div>',
            '            <div>',
            '                <div style="font-size: 1.2rem; font-weight: 700; color: #2c3e50;">' + (profile.experience || 0) + '</div>',
            '                <div style="font-size: 0.75rem; color: #999;">Опыт</div>',
            '            </div>',
            '            <div>',
            '                <div style="font-size: 1rem; font-weight: 700; color: #2c3e50;">' + new Date(profile.created_at || Date.now()).toLocaleDateString('ru-RU') + '</div>',
            '                <div style="font-size: 0.75rem; color: #999;">На сайте с</div>',
            '            </div>',
            '        </div>',

            (profile.bio ? [
                '        <div style="background: #f8f9fa; padding: 12px 16px; border-radius: 8px; margin: 12px 0 16px 0; text-align: left; font-size: 0.95rem; color: #555; line-height: 1.5;">',
                '            <span style="font-weight: 600; color: #333;">📝</span> ' + escapeHtml(profile.bio),
                '        </div>'
            ].join('') : ''),

            '        <div style="margin: 16px 0;">' + friendButton + '</div>',

            isOwn ? [
                '        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 16px;">',
                '            <a href="/profile/edit/" class="pf-btn pf-btn-primary">✏️ Редактировать</a>',
                '            <button class="pf-btn pf-btn-danger" onclick="window.pfLogout()">🚪 Выйти</button>',
                '        </div>'
            ].join('') : '',

            '    </div>',
            '</div>'
        ].join('');
    }

    // ============================================================
    // Действия
    // ============================================================
    window.pfLogout = async function() {
        var client = getClient();
        if (!client) return;
        try { await client.auth.signOut(); } catch(e) {}
        try {
            var keys = [];
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                if (k && (k.indexOf('supabase') === 0 || k.indexOf('auth_profile_') === 0)) {
                    keys.push(k);
                }
            }
            keys.forEach(function(k) { localStorage.removeItem(k); });
        } catch(e) {}
        window.location.href = '/';
    };

    window.pfAddFriend = async function(targetId) {
        var client = getClient();
        if (!client) return;
        try {
            var sessionRes = await client.auth.getSession();
            var user = sessionRes && sessionRes.data && sessionRes.data.session && sessionRes.data.session.user;
            if (!user) {
                alert('Войдите, чтобы добавить в друзья');
                return;
            }
            await client.from('friends').insert([{
                user_id: user.id,
                friend_id: targetId,
                status: 'pending'
            }]);
            alert('✅ Заявка отправлена!');
            window.location.reload();
        } catch(e) {
            alert('Не удалось отправить заявку');
        }
    };

    // ============================================================
    // Запуск
    // ============================================================
    async function init() {
        var client = getClient();
        if (!client) {
            showError('Ошибка загрузки', 'Не удалось подключиться к базе данных.', '');
            return;
        }

        // Получаем сессию
        var sessionRes = await withTimeout(client.auth.getSession(), 5000, { data: null });
        var session = sessionRes && sessionRes.data && sessionRes.data.session;
        var currentUser = session && session.user;

        // ID из URL
        var urlParams = new URLSearchParams(window.location.search);
        var urlUserId = urlParams.get('user_id');

        // Определяем, чей профиль открывать
        var profileUserId;
        var isOwn = false;

        if (urlUserId) {
            profileUserId = urlUserId;
            isOwn = !!(currentUser && currentUser.id === urlUserId);
        } else if (currentUser) {
            // Нет user_id в URL — показываем свой профиль
            profileUserId = currentUser.id;
            isOwn = true;
        } else {
            // Не залогинен и нет user_id — отправляем на вход
            showError(
                'Вы не вошли',
                'Войдите в аккаунт, чтобы просмотреть профиль.',
                '<a href="/login/" class="pf-btn pf-btn-primary">🔐 Войти</a>'
            );
            return;
        }

        await loadProfile(client, profileUserId, isOwn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
