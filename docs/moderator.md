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
        document.getElementById('moderator-container').innerHTML = '<p style="text-align:center;color:#999;">⚠️ Ошибка загрузки</p>';
        return;
    }

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    client.auth.getSession().then(async ({ data }) => {
        const user = data?.session?.user;
        if (!user) {
            document.getElementById('moderator-container').innerHTML = `
                <div style="text-align:center;padding:40px;">
                    <p>⚠️ Вы не авторизованы.</p>
                    <a href="/login/" style="color:#6C63FF;">Войти</a>
                </div>
            `;
            return;
        }

        const { data: profile } = await client
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();

        if (!profile || profile.role !== 'moderator') {
            document.getElementById('moderator-container').innerHTML = `
                <div style="text-align:center;padding:40px;">
                    <p style="font-size:1.3rem;">⛔ Доступ запрещён</p>
                    <p style="color:#999;">Только для модераторов</p>
                    <a href="/profile/" style="color:#6C63FF;">← Вернуться в профиль</a>
                </div>
            `;
            return;
        }

        await loadModeratorPanel(client);
    });
});

async function loadModeratorPanel(client) {
    const container = document.getElementById('moderator-container');

    // Загружаем все комментарии
    const { data: comments, error } = await client
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = `<p style="text-align:center;color:#c0392b;">⚠️ Ошибка: ${error.message}</p>`;
        return;
    }

    // Если комментариев нет — показываем короткое сообщение
    if (!comments || comments.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:60px 20px;background:#f8f9fa;border-radius:12px;border:1px solid #eaecf0;">
                <p style="font-size:1.2rem;color:#555;margin:0;">Нет комментариев для модерации</p>
                <p style="color:#999;font-size:0.9rem;margin-top:8px;">Когда появятся новые комментарии, они будут здесь.</p>
                <a href="/profile/" style="color:#6C63FF;display:inline-block;margin-top:16px;">← Вернуться в профиль</a>
            </div>
        `;
        return;
    }

    // Получаем профили пользователей
    const userIds = [...new Set(comments.map(c => c.user_id))];
    let profilesMap = {};
    if (userIds.length > 0) {
        const { data: profiles } = await client
            .from('profiles')
            .select('user_id, username, display_name, avatar_url, is_banned, role')
            .in('user_id', userIds);
        if (profiles) {
            profiles.forEach(p => profilesMap[p.user_id] = p);
        }
    }

    const commentsWithProfiles = comments.map(c => ({
        ...c,
        profiles: profilesMap[c.user_id] || { display_name: 'Аноним', avatar_url: null, is_banned: false, role: 'user' }
    }));

    const total = commentsWithProfiles.length;
    const hidden = commentsWithProfiles.filter(c => c.is_hidden).length;

    container.innerHTML = `
        <!-- Статистика -->
        <div style="display:flex;gap:20px;flex-wrap:wrap;background:#f8f9fa;padding:12px 18px;border-radius:8px;margin-bottom:20px;border:1px solid #eaecf0;">
            <span><strong>Всего:</strong> ${total}</span>
            <span><strong>Скрытых:</strong> ${hidden}</span>
            <span><a href="/profile/" style="color:#6C63FF;">← Профиль</a></span>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
            ${commentsWithProfiles.map(c => renderComment(c)).join('')}
        </div>
    `;
}

function renderComment(c) {
    const p = c.profiles || {};
    const name = p.display_name || p.username || 'Аноним';
    const avatar = p.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=32`;
    const isHidden = c.is_hidden || false;
    const isBanned = p.is_banned || false;

    let statusColor = '#27ae60';
    let statusText = 'Видимый';
    if (isBanned) { statusColor = '#c0392b'; statusText = '⛔ Забанен'; }
    else if (isHidden) { statusColor = '#f39c12'; statusText = '🚫 Скрыт'; }

    return `
        <div style="background:#fff;border:1px solid ${isHidden ? '#ddd' : '#eaecf0'};border-radius:8px;padding:12px 16px;${isHidden ? 'opacity:0.7;' : ''}">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;">
                <img src="${avatar}" style="width:28px;height:28px;border-radius:50%;">
                <strong>${name}</strong>
                <span style="font-size:0.7rem;color:#999;">${new Date(c.created_at).toLocaleString('ru-RU')}</span>
                <span style="font-size:0.65rem;background:${statusColor};color:#fff;padding:0 10px;border-radius:10px;">${statusText}</span>
                <span style="font-size:0.7rem;color:#6C63FF;">📄 ${c.article_slug}</span>
            </div>
            <div style="font-size:0.95rem;padding-left:38px;${isHidden ? 'text-decoration:line-through;color:#999;' : ''}">${c.content}</div>
            <div style="padding-left:38px;margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
                <button onclick="toggleHide('${c.id}')" style="padding:3px 12px;background:${isHidden ? '#27ae60' : '#f39c12'};color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">${isHidden ? '👁️ Показать' : '🚫 Скрыть'}</button>
                <button onclick="deleteCom('${c.id}')" style="padding:3px 12px;background:#c0392b;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">🗑️ Удалить</button>
                <button onclick="banUser('${c.user_id}','${name}')" style="padding:3px 12px;background:${isBanned ? '#27ae60' : '#c0392b'};color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">${isBanned ? '✅ Разбанить' : '⛔ Забанить'}</button>
            </div>
        </div>
    `;
}

// === ФУНКЦИИ ===

async function toggleHide(id) {
    if (!confirm('Скрыть/показать?')) return;
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: c } = await client.from('comments').select('is_hidden').eq('id', id).single();
    await client.from('comments').update({ is_hidden: !c?.is_hidden }).eq('id', id);
    location.reload();
}

async function deleteCom(id) {
    if (!confirm('Удалить навсегда?')) return;
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    await client.from('comments').delete().eq('id', id);
    location.reload();
}

async function banUser(id, name) {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: p } = await client.from('profiles').select('is_banned').eq('user_id', id).single();
    const isBanned = p?.is_banned || false;
    if (!confirm(`${isBanned ? 'Разбанить' : 'Забанить'} ${name}?`)) return;
    await client.from('profiles').update({ is_banned: !isBanned }).eq('user_id', id);
    if (!isBanned) {
        await client.from('comments').update({ is_hidden: true }).eq('user_id', id);
    }
    location.reload();
}

window.toggleHide = toggleHide;
window.deleteCom = deleteCom;
window.banUser = banUser;
</script>
