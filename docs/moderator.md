<h1>🛡️ Панель модерации</h1>

<div id="moderator-container">
    <p style="text-align: center; color: #999; padding: 40px;">Загрузка...</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

document.addEventListener('DOMContentLoaded', function() {
    if (typeof supabase === 'undefined') {
        document.getElementById('moderator-container').innerHTML = '<p>⚠️ Ошибка загрузки Supabase.</p>';
        return;
    }

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    client.auth.getSession().then(async ({ data }) => {
        const user = data?.session?.user;
        if (!user) {
            document.getElementById('moderator-container').innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <p style="font-size: 1.2rem;">⚠️ Вы не авторизованы.</p>
                    <a href="/login/" style="color: #6C63FF;">Войти</a>
                </div>
            `;
            return;
        }

        // Проверяем роль
        const { data: profile, error } = await client
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();

        if (error || profile?.role !== 'moderator') {
            document.getElementById('moderator-container').innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <p style="font-size: 1.5rem;">⛔ У вас нет прав модератора.</p>
                    <p style="color: #999;">Только модераторы имеют доступ к этой странице.</p>
                    <a href="/profile/" style="color: #6C63FF; display: inline-block; margin-top: 16px;">← Вернуться в профиль</a>
                </div>
            `;
            return;
        }

        // Загружаем комментарии
        await loadModeratorPanel(client);
    });
});

async function loadModeratorPanel(client) {
    const container = document.getElementById('moderator-container');

    // Получаем все комментарии
    const { data: comments, error } = await client
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p>⚠️ Ошибка загрузки: ${error.message}</p>
                <a href="/profile/" style="color: #6C63FF;">← Вернуться в профиль</a>
            </div>
        `;
        return;
    }

    // Если комментариев нет
    if (!comments || comments.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 12px; border: 1px solid #eaecf0;">
                <p style="font-size: 1.5rem; margin: 0;">📭</p>
                <p style="font-size: 1.2rem; color: #555; margin: 8px 0;">Комментариев пока нет</p>
                <p style="color: #999; font-size: 0.9rem;">Когда пользователи оставят комментарии, они появятся здесь.</p>
                <a href="/profile/" style="color: #6C63FF; display: inline-block; margin-top: 16px;">← Вернуться в профиль</a>
            </div>
        `;
        return;
    }

    // Получаем профили пользователей
    const userIds = [...new Set(comments.map(c => c.user_id))];
    let profilesMap = {};
    if (userIds.length > 0) {
        const { data: profiles, error: profileError } = await client
            .from('profiles')
            .select('user_id, username, display_name, avatar_url, is_banned, role')
            .in('user_id', userIds);

        if (!profileError && profiles) {
            profiles.forEach(p => profilesMap[p.user_id] = p);
        }
    }

    // Собираем данные
    const commentsWithProfiles = comments.map(c => ({
        ...c,
        profiles: profilesMap[c.user_id] || {
            display_name: 'Аноним',
            username: 'Аноним',
            avatar_url: null,
            is_banned: false,
            role: 'user'
        }
    }));

    // Статистика
    const total = commentsWithProfiles.length;
    const hidden = commentsWithProfiles.filter(c => c.is_hidden).length;
    const visible = total - hidden;

    container.innerHTML = `
        <!-- Статистика -->
        <div style="display: flex; gap: 20px; flex-wrap: wrap; background: #f8f9fa; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #eaecf0;">
            <div><strong>📝 Всего комментариев:</strong> ${total}</div>
            <div><strong>👁️ Видимых:</strong> ${visible}</div>
            <div><strong>🚫 Скрытых:</strong> ${hidden}</div>
            <div style="margin-left: auto;">
                <a href="/profile/" style="color: #6C63FF;">← Вернуться в профиль</a>
            </div>
        </div>

        <!-- Список комментариев -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${commentsWithProfiles.map(c => renderComment(c)).join('')}
        </div>
    `;
}

function renderComment(comment) {
    const profile = comment.profiles || {};
    const displayName = profile.display_name || profile.username || 'Аноним';
    const avatar = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6C63FF&color=fff&size=32`;
    const isHidden = comment.is_hidden || false;
    const isBanned = profile.is_banned || false;
    const isModerator = profile.role === 'moderator';

    let statusColor = '#27ae60';
    let statusText = '✅ Видимый';
    if (isHidden) {
        statusColor = '#f39c12';
        statusText = '🚫 Скрыт';
    }
    if (isBanned) {
        statusColor = '#c0392b';
        statusText = '⛔ Забанен';
    }
    if (isModerator) {
        statusColor = '#6C63FF';
        statusText = '🛡️ Модератор';
    }

    // Если статусов несколько — показываем основной
    if (isBanned) {
        statusColor = '#c0392b';
        statusText = '⛔ Забанен';
    } else if (isHidden) {
        statusColor = '#f39c12';
        statusText = '🚫 Скрыт';
    } else if (isModerator) {
        statusColor = '#6C63FF';
        statusText = '🛡️ Модератор';
    }

    // Ссылка на статью
    const articleUrl = comment.article_slug ? `/${comment.article_slug}/` : '#';

    return `
        <div style="
            background: ${isHidden ? '#f9f9f9' : '#fff'};
            border: 1px solid ${isHidden ? '#ddd' : '#eaecf0'};
            border-radius: 8px;
            padding: 14px 18px;
            ${isHidden ? 'opacity: 0.7;' : ''}
            transition: all 0.2s;
        ">
            <!-- Шапка -->
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px;">
                <img src="${avatar}" alt="Avatar" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #eee;">
                <strong style="font-size: 0.95rem;">${displayName}</strong>
                <span style="font-size: 0.75rem; color: #999;">${new Date(comment.created_at).toLocaleString('ru-RU')}</span>
                <span style="font-size: 0.7rem; background: ${statusColor}; color: #fff; padding: 1px 12px; border-radius: 12px; font-weight: 500;">${statusText}</span>
                <a href="${articleUrl}" target="_blank" style="font-size: 0.75rem; color: #6C63FF; background: #f0f0ff; padding: 1px 10px; border-radius: 12px; text-decoration: none;">
                    📄 ${comment.article_slug}
                </a>
            </div>
            
            <!-- Текст комментария -->
            <div style="font-size: 0.95rem; line-height: 1.6; padding-left: 42px; ${isHidden ? 'text-decoration: line-through; color: #999;' : ''}">
                ${comment.content}
            </div>
            
            <!-- Кнопки управления -->
            <div style="padding-left: 42px; margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="toggleHideComment('${comment.id}')" 
                        style="padding: 4px 14px; background: ${isHidden ? '#27ae60' : '#f39c12'}; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem; transition: opacity 0.2s;">
                    ${isHidden ? '👁️ Показать' : '🚫 Скрыть'}
                </button>
                <button onclick="deleteComment('${comment.id}')" 
                        style="padding: 4px 14px; background: #c0392b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem; transition: opacity 0.2s;">
                    🗑️ Удалить
                </button>
                <button onclick="banUser('${comment.user_id}', '${displayName}')" 
                        style="padding: 4px 14px; background: ${isBanned ? '#27ae60' : '#c0392b'}; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem; transition: opacity 0.2s;">
                    ${isBanned ? '✅ Разбанить' : '⛔ Забанить'}
                </button>
            </div>
        </div>
    `;
}

// ===== ФУНКЦИИ УПРАВЛЕНИЯ =====

async function toggleHideComment(commentId) {
    if (!confirm('Скрыть или показать этот комментарий?')) return;

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: comment } = await client
        .from('comments')
        .select('is_hidden')
        .eq('id', commentId)
        .single();

    const newHidden = !comment?.is_hidden;

    const { error } = await client
        .from('comments')
        .update({ is_hidden: newHidden })
        .eq('id', commentId);

    if (error) {
        alert('❌ Ошибка: ' + error.message);
        return;
    }

    location.reload();
}

async function deleteComment(commentId) {
    if (!confirm('Удалить комментарий навсегда? Это действие необратимо.')) return;

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { error } = await client
        .from('comments')
        .delete()
        .eq('id', commentId);

    if (error) {
        alert('❌ Ошибка: ' + error.message);
        return;
    }

    location.reload();
}

async function banUser(userId, username) {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const { data: profile } = await client
        .from('profiles')
        .select('is_banned')
        .eq('user_id', userId)
        .single();

    const isBanned = profile?.is_banned || false;
    const action = isBanned ? 'разбанить' : 'забанить';

    if (!confirm(`Вы уверены, что хотите ${action} пользователя ${username}?`)) return;

    const newStatus = !isBanned;

    const { error } = await client
        .from('profiles')
        .update({ is_banned: newStatus })
        .eq('user_id', userId);

    if (error) {
        alert('❌ Ошибка: ' + error.message);
        return;
    }

    // Если забанили — скрываем все его комментарии
    if (newStatus) {
        await client
            .from('comments')
            .update({ is_hidden: true })
            .eq('user_id', userId);
    }

    alert(`✅ Пользователь ${username} ${newStatus ? 'забанен' : 'разбанен'}!`);
    location.reload();
}

// Делаем функции глобальными
window.toggleHideComment = toggleHideComment;
window.deleteComment = deleteComment;
window.banUser = banUser;
</script>
