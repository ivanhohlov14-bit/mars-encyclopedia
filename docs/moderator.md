<h1>🛡️ Панель модерации</h1>

<div id="moderator-container">
    <p style="text-align: center; color: #999; padding: 40px;">⏳ Загрузка...</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

let allComments = [];
let profilesMap = {};

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

    allComments = comments || [];

    // Загружаем профили
    const userIds = [...new Set(allComments.map(c => c.user_id))];
    profilesMap = {};
    if (userIds.length > 0) {
        const { data: profiles } = await client
            .from('profiles')
            .select('user_id, username, display_name, avatar_url, is_banned, role')
            .in('user_id', userIds);
        if (profiles) {
            profiles.forEach(p => profilesMap[p.user_id] = p);
        }
    }

    renderPanel();
}

function renderPanel() {
    const container = document.getElementById('moderator-container');

    // Получаем значения фильтров
    const filterStatus = document.getElementById('filter-status')?.value || 'all';
    const searchAuthor = document.getElementById('search-author')?.value?.toLowerCase() || '';

    // Фильтруем комментарии
    let filtered = [...allComments];

    // Фильтр по статусу
    if (filterStatus === 'visible') {
        filtered = filtered.filter(c => !c.is_hidden);
    } else if (filterStatus === 'hidden') {
        filtered = filtered.filter(c => c.is_hidden);
    }

    // Фильтр по автору
    if (searchAuthor) {
        filtered = filtered.filter(c => {
            const p = profilesMap[c.user_id] || {};
            const name = (p.display_name || p.username || '').toLowerCase();
            return name.includes(searchAuthor);
        });
    }

    const total = filtered.length;
    const hidden = filtered.filter(c => c.is_hidden).length;
    const visible = total - hidden;
    const allTotal = allComments.length;

    let html = `
        <!-- Статистика -->
        <div style="display:flex;gap:16px;flex-wrap:wrap;background:#f8f9fa;padding:14px 18px;border-radius:8px;margin-bottom:16px;border:1px solid #eaecf0;align-items:center;">
            <div><strong>📝 Всего:</strong> ${allTotal}</div>
            <div><strong>👁️ Видимых:</strong> ${allTotal - allComments.filter(c => c.is_hidden).length}</div>
            <div><strong>🚫 Скрытых:</strong> ${allComments.filter(c => c.is_hidden).length}</div>
            <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                <a href="/profile/" style="color:#6C63FF;">← Профиль</a>
            </div>
        </div>

        <!-- Фильтры -->
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;background:#fff;padding:12px 16px;border-radius:8px;border:1px solid #eaecf0;">
            <div>
                <label style="font-size:0.85rem;color:#555;">Статус:</label>
                <select id="filter-status" onchange="renderPanel()" style="padding:4px 8px;border-radius:4px;border:1px solid #ccc;">
                    <option value="all">Все</option>
                    <option value="visible">✅ Видимые</option>
                    <option value="hidden">🚫 Скрытые</option>
                </select>
            </div>
            <div>
                <label style="font-size:0.85rem;color:#555;">Автор:</label>
                <input id="search-author" type="text" placeholder="Имя автора..." oninput="renderPanel()" style="padding:4px 8px;border-radius:4px;border:1px solid #ccc;width:150px;">
            </div>
            <div style="font-size:0.85rem;color:#999;margin-left:auto;">
                Найдено: ${total}
            </div>
        </div>
    `;

    if (total === 0) {
        html += `
            <div style="text-align:center;padding:40px 20px;background:linear-gradient(135deg,#f8f9fa,#fff);border-radius:12px;border:1px solid #eaecf0;">
                <div style="font-size:3rem;margin-bottom:8px;">🔍</div>
                <h3 style="margin:0;color:#555;">Ничего не найдено</h3>
                <p style="color:#999;font-size:0.9rem;">Попробуйте изменить фильтры.</p>
            </div>
        `;
    } else {
        html += `
            <div style="display:flex;flex-direction:column;gap:12px;">
                ${filtered.map(c => renderComment(c)).join('')}
            </div>
        `;
    }

    container.innerHTML = html;
}

function renderComment(c) {
    const p = profilesMap[c.user_id] || {};
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
        <div style="background:#fff;border:1px solid ${isHidden ? '#ddd' : '#eaecf0'};border-radius:8px;padding:12px 16px;${isHidden ? 'opacity:0.7;' : ''}">
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
                <button onclick="showUserComments('${c.user_id}','${name}')" style="padding:3px 14px;background:#6C63FF;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">📋 Все комменты</button>
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

async function showUserComments(userId, name) {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: comments } = await client
        .from('comments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (!comments || comments.length === 0) {
        alert(`У пользователя ${name} нет комментариев.`);
        return;
    }

    const msg = comments.map(c => 
        `📄 ${c.article_slug} | ${new Date(c.created_at).toLocaleString('ru-RU')}\n${c.content}`
    ).join('\n\n---\n\n');

    // Показываем в модальном окне (с ограничением длины)
    if (msg.length > 2000) {
        alert(`📋 Комментарии пользователя ${name} (${comments.length} шт.):\n\n${msg.substring(0, 2000)}...\n\n(показано не всё)`);
    } else {
        alert(`📋 Комментарии пользователя ${name} (${comments.length} шт.):\n\n${msg}`);
    }
}

window.toggleHide = toggleHide;
window.deleteCom = deleteCom;
window.banUser = banUser;
window.showUserComments = showUserComments;
window.renderPanel = renderPanel;
</script>
