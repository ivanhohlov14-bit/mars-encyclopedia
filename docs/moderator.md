<h1>🛡️ Панель модерации</h1>

<div id="moderator-container">
    <p>Загрузка...</p>
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
                <p>⚠️ Вы не авторизованы.</p>
                <a href="/login/">Войти</a>
            `;
            return;
        }

        // Проверяем, есть ли у пользователя роль модератора
        const { data: profile, error } = await client
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();

        if (error || profile?.role !== 'moderator') {
            document.getElementById('moderator-container').innerHTML = `
                <p>⛔ У вас нет прав модератора.</p>
                <a href="/profile/">Вернуться в профиль</a>
            `;
            return;
        }

        // Загружаем все комментарии
        await loadComments(client);
    });
});

async function loadComments(client) {
    const container = document.getElementById('moderator-container');

    // Загружаем комментарии с данными пользователей
    const { data: comments, error } = await client
        .from('comments')
        .select('*, profiles(username, display_name, avatar_url, is_banned)')
        .order('created_at', { ascending: false })
        .limit(100);

    if (error) {
        container.innerHTML = `<p>⚠️ Ошибка загрузки комментариев: ${error.message}</p>`;
        return;
    }

    if (!comments || comments.length === 0) {
        container.innerHTML = `<p>📭 Комментариев пока нет.</p>
            <p><a href="/profile/">← Вернуться в профиль</a></p>`;
        return;
    }

    // Считаем статистику
    const totalComments = comments.length;
    const hiddenComments = comments.filter(c => c.is_hidden).length;
    const visibleComments = totalComments - hiddenComments;

    container.innerHTML = `
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px; display: flex; gap: 20px; flex-wrap: wrap;">
            <div><strong>📝 Всего комментариев:</strong> ${totalComments}</div>
            <div><strong>👁️ Видимых:</strong> ${visibleComments}</div>
            <div><strong>🚫 Скрытых:</strong> ${hiddenComments}</div>
            <div><a href="/profile/" style="color: #6C63FF;">← Вернуться в профиль</a></div>
        </div>

        <div id="comments-list" style="display: flex; flex-direction: column; gap: 12px;">
            ${comments.map(c => renderComment(c, client)).join('')}
        </div>
    `;
}

function renderComment(comment, client) {
    const displayName = comment.profiles?.display_name || comment.profiles?.username || 'Аноним';
    const avatar = comment.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6C63FF&color=fff&size=32`;
    const isHidden = comment.is_hidden;
    const isBanned = comment.profiles?.is_banned || false;

    return `
        <div style="
            background: ${isHidden ? '#f5f5f5' : '#fff'};
            border: 1px solid ${isHidden ? '#ddd' : '#eaecf0'};
            border-radius: 8px;
            padding: 12px 16px;
            ${isHidden ? 'opacity: 0.6;' : ''}
        ">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
                <img src="${avatar}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%;">
                <strong style="font-size: 0.9rem;">${displayName}</strong>
                <span style="font-size: 0.75rem; color: #999;">${new Date(comment.created_at).toLocaleString('ru-RU')}</span>
                <span style="font-size: 0.75rem; color: #999;">📄 ${comment.article_slug}</span>
                ${isHidden ? '<span style="font-size: 0.75rem; color: #e67e22;">🚫 Скрыт</span>' : ''}
                ${isBanned ? '<span style="font-size: 0.75rem; color: #c0392b;">🚫 Забанен</span>' : ''}
            </div>
            <div style="font-size: 0.95rem; line-height: 1.5; padding-left: 38px; ${isHidden ? 'text-decoration: line-through; color: #999;' : ''}">
                ${comment.content}
            </div>
            <div style="padding-left: 38px; margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="toggleHideComment('${comment.id}')" 
                        style="padding: 4px 12px; background: ${isHidden ? '#27ae60' : '#f39c12'}; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    ${isHidden ? '👁️ Показать' : '🚫 Скрыть'}
                </button>
                <button onclick="deleteComment('${comment.id}')" 
                        style="padding: 4px 12px; background: #c0392b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    🗑️ Удалить
                </button>
                <button onclick="banUser('${comment.user_id}', '${displayName}')" 
                        style="padding: 4px 12px; background: ${isBanned ? '#27ae60' : '#c0392b'}; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    ${isBanned ? '✅ Разбанить' : '⛔ Забанить'}
                </button>
            </div>
        </div>
    `;
}

// === СКРЫТЬ/ПОКАЗАТЬ КОММЕНТАРИЙ ===
async function toggleHideComment(commentId) {
    if (!confirm('Скрыть/показать комментарий?')) return;

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: session } = await client.auth.getSession();
    const user = session?.session?.user;

    // Получаем текущий статус
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

// === УДАЛИТЬ КОММЕНТАРИЙ ===
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

// === ЗАБАНИТЬ/РАЗБАНИТЬ ПОЛЬЗОВАТЕЛЯ ===
async function banUser(userId, username) {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Получаем текущий статус бана
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

    // Если забанили — скрываем все комментарии пользователя
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
