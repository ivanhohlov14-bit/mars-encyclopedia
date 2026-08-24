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
                <div style="text-align:center;padding:40px;background:#fff;border-radius:12px;border:1px solid #eaecf0;">
                    <p style="font-size:1.2rem;">⚠️ Вы не авторизованы.</p>
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
                <div style="text-align:center;padding:40px;background:#fff;border-radius:12px;border:1px solid #eaecf0;">
                    <p style="font-size:1.3rem;">⛔ Доступ запрещён</p>
                    <p style="color:#999;">Только для модераторов</p>
                    <a href="/profile/" style="color:#6C63FF;display:inline-block;margin-top:12px;">← Вернуться в профиль</a>
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

    // === ФОРМИРУЕМ СТРАНИЦУ ===
    let html = `
        <!-- Статистика (всегда видна) -->
        <div style="display:flex;gap:20px;flex-wrap:wrap;background:#f8f9fa;padding:16px 20px;border-radius:8px;margin-bottom:24px;border:1px solid #eaecf0;">
            <div><strong>📝 Всего комментариев:</strong> ${total}</div>
            <div><strong>👁️ Видимых:</strong> ${total - hidden}</div>
            <div><strong>🚫 Скрытых:</strong> ${hidden}</div>
            <div style="margin-left:auto;">
                <a href="/profile/" style="color:#6C63FF;">← Вернуться в профиль</a>
            </div>
        </div>
    `;

    // Если комментариев нет — показываем красивую заглушку
    if (total === 0) {
        html += `
            <div style="text-align:center;padding:60px 20px;background:linear-gradient(135deg,#f8f9fa,#fff);border-radius:12px;border:1px solid #eaecf0;">
                <div style="font-size:4rem;margin-bottom:12px;">📭</div>
                <h3 style="margin:0;color:#555;">Нет комментариев для модерации</h3>
                <p style="color:#999;font-size:0.95rem;margin-top:8px;">Когда пользователи оставят комментарии, они появятся здесь.</p>
                <div style="display:flex;gap:12px;justify-content:center;margin-top:20px;flex-wrap:wrap;">
                    <span style="padding:6px 16px;background:#27ae60;color:#fff;border-radius:20px;font-size:0.8rem;">✅ Видимые: 0</span>
                    <span style="padding:6px 16px;background:#f39c12;color:#fff;border-radius:20px;font-size:0.8rem;">🚫 Скрытые: 0</span>
                    <span style="padding:6px 16px;background:#6C63FF;color:#fff;border-radius:20px;font-size:0.8rem;">🛡️ Модератор</span>
                </div>
            </div>
        `;
    } else {
        // Список комментариев
        html += `
            <div style="display:flex;flex-direction:column;gap:12px;">
                ${commentsWithProfiles.map(c => renderComment(c)).join('')}
            </div>
        `;
    }

    container.innerHTML = html;
}

function renderComment(c) {
    const p = c.profiles || {};
    const name = p.display_name || p.username || 'Аноним';
    const avatar = p.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=32`;
    const isHidden = c.is_hidden || false;
    const isBanned = p.is_banned || false;
    const isModerator = p.role === 'moderator';

    let statusColor = '#27ae60';
    let statusText = 'Видимый';
    if (isBanned) { statusColor = '#c0392b'; statusText = '⛔ Забанен'; }
    else if (isHidden) { statusColor = '#f39c12'; statusText = '🚫 Скрыт'; }
    else if (isModerator) { statusColor = '#6C63FF'; statusText = '🛡️ Модератор'; }

    return `
        <div style="background:#fff;border:1px solid ${isHidden ? '#ddd' : '#eaecf0'};border-radius:8px;padding:14px 18px;${isHidden ? 'opacity:0.7;' : ''}">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;">
                <img src="${avatar}" style="width:28px;height:28px;border-radius:50%;border:2px solid #eee;">
                <strong style="font-size:0.95rem;">${name}</strong>
                <span style="font-size:0.7rem;color:#999;">${new Date(c.created_at).toLocaleString('ru-RU')}</span>
                <span style="font-size:0.65rem;background:${statusColor};color:#fff;padding:0 10px;border-radius:10px;">${statusText}</span>
                <span style="font-size:0.7rem;color:#6C63FF;background:#f0f0ff;padding:0 10px;border-radius:10px;">📄 ${c.article_slug}</span>
            </div>
            <div style="font-size:0.95rem;padding-left:38px;${isHidden ? 'text-decoration:line-through;color:#999;' : ''}">${c.content}</div>
            <div style="padding-left:38px;margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
                <button onclick="toggleHide('${c.id}')" style="padding:3px 14px;background:${isHidden ? '#27ae60' : '#f39c12'};color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">${isHidden ? '👁️ Показать' : '🚫 Скрыть'}</button>
                <button onclick="deleteCom('${c.id}')" style="padding:3px 14px;background:#c0392b;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">🗑️ Удалить</button>
                <button onclick="banUser('${c.user_id}','${name}')" style="padding:3px 14px;background:${isBanned ? '#27ae60' : '#c0392b'};color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">${isBanned ? '✅ Разбанить' : '⛔ Забанить'}</button>
            </div>
        </div>
    `;
}

// === ФУНКЦИИ УПРАВЛЕНИЯ ===

async function toggleHide(id) {
    if (!confirm('Скрыть или показать этот комментарий?')) return;
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: c } = await client.from('comments').select('is_hidden').eq('id', id).single();
    await client.from('comments').update({ is_hidden: !c?.is_hidden }).eq('id', id);
    location.reload();
}

async function deleteCom(id) {
    if (!confirm('Удалить комментарий навсегда?')) return;
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
