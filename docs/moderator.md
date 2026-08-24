<h1>🛡️ Панель модерации</h1>

<div id="moderator-container">
    <p style="text-align: center; color: #999; padding: 40px;">⏳ Загрузка...</p>
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
                    <p>⚠️ Вы не авторизованы.</p>
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
                    <a href="/profile/" style="color: #6C63FF;">Вернуться в профиль</a>
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

    // Загружаем ВСЕ комментарии с профилями
    const { data: comments, error } = await client
        .from('comments')
        .select('*, profiles!comments_user_id_fkey(username, display_name, avatar_url, is_banned, role)')
        .order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = `<p>⚠️ Ошибка загрузки: ${error.message}</p>`;
        return;
    }

    if (!comments || comments.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="font-size: 1.2rem;">📭 Комментариев пока нет.</p>
                <a href="/profile/" style="color: #6C63FF;">← Вернуться в профиль</a>
            </div>
        `;
        return;
    }

    // Статистика
    const total = comments.length;
    const hidden = comments.filter(c => c.is_hidden).length;
    const visible = total - hidden;

    container.innerHTML = `
        <!-- Статистика -->
        <div style="display: flex; gap: 20px; flex-wrap: wrap; background: #f8f9fa; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #eaecf0;">
            <div><strong>📝 Всего комментариев:</strong> ${total}</div>
            <div><strong>👁️ Видимых:</strong> ${visible}</div>
            <div><strong>🚫 Скрытых:</strong> ${hidden}</div>
            <div><a href="/profile/" style="color: #6C63FF;">← Вернуться в профиль</a></div>
        </div>

        <!-- Список комментариев -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${comments.map(c => renderComment(c, client)).join('')}
        </div>
    `;
}

function renderComment(comment, client) {
    const profile = comment.profiles || {};
    const displayName = profile.display_name || profile.username || 'Аноним';
    const avatar = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6C63FF&color=fff&size=32`;
    const isHidden = comment.is_hidden || false;
    const isBanned = profile.is_banned || false;
    const isModerator = profile.role === 'moderator';

    // Определяем цвет статуса
    let statusColor = '#27ae60'; // зелёный
    let statusText = 'Видимый';
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

    return `
        <div style="
            background: ${isHidden ? '#f9f9f9' : '#fff'};
            border: 1px solid ${isHidden ? '#ddd' : '#eaecf0'};
            border-radius: 8px;
            padding: 12px 16px;
            ${isHidden ? 'opacity: 0.7;' : ''}
            transition: all 0.2s;
        ">
            <!-- Шапка комментария -->
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px;">
                <img src="${avatar}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%;">
                <strong style="font-size: 0.9rem;">${displayName}</strong>
                <span style="font-size: 0.75rem; color: #999;">${new Date(comment.created_at).toLocaleString('ru-RU')}</span>
                <span style="font-size: 0.7rem; background: ${statusColor}; color: #fff; padding: 1px 10px; border-radius: 12px;">${statusText}</span>
                <span style="font-size: 0.75rem; color: #6C63FF; background: #f0f0ff; padding: 1px 10px; border-radius: 12px;">📄 ${comment.article_slug}</span>
            </div>
            
            <!-- Текст комментария -->
            <div style="font-size: 0.95rem; line-height: 1.5; padding-left: 38px; ${isHidden ? 'text-decoration: line-through; color: #999;' : ''}">
                ${comment.content}
            </div>
            
            <!-- Кнопки управления -->
            <div style="padding-left: 38px; margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="toggleHideComment('${comment.id}')" 
                        style="padding: 4px 14px; background: ${isHidden ? '#27ae60' : '#f39c12'}; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    ${isHidden ? '👁️ Показать' : '🚫 Скрыть'}
                </button>
                <button onclick="deleteComment('${comment.id}')" 
                        style="padding: 4px 14px; background: #c0392b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    🗑️ Удалить
                </button>
                <button onclick="banUser('${comment.user_id}', '${displayName}')" 
                        style="padding: 4px 14px; background: ${isBanned ? '#27ae60' : '#c0392b'}; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    ${isBanned ? '✅ Разбанить' : '⛔ Забанить'}
                </button>
            </div>
        </div>
    `;
}

// === ФУНКЦИИ УПРАВЛЕНИЯ ===

async function toggleHideComment(commentId) {
    if (!confirm('Скрыть/показать комментарий?')) return;

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: session } = await client.auth.getSession();
    const user = session?.session?.user;

    const { data: comment } = await client
        .from('comments')
        .select('is_hidden')
        .eq('id', commentId)
        .single();

    const newHidden = !comment?.is_hidden;

    const { error } = await client
        .from('comments')
        .update({
            is_hidden: newHidden,
            hidden_by: user.id,
            hidden_at: new Date().toISOString()
        })
        .eq('id', commentId);

    if (error) {
        alert('❌ Ошибка: ' + error.message);
        return;
    }

    location.reload();
}

async function deleteComment(commentId) {
    if (!confirm('Удалить комментарий навсегда?')) return;

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
    const reason = newStatus ? prompt('Введите причину бана (необязательно):') : '';

    const { error } = await client
        .from('profiles')
        .update({
            is_banned: newStatus,
            ban_reason: reason || null
        })
        .eq('user_id', userId);

    if (error) {
        alert('❌ Ошибка: ' + error.message);
        return;
    }

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
