<h1>🛡️ Панель модерации</h1>

<style>
/* ===== СТИЛИ ===== */
.moderator-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    background: #f8f9fa;
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 16px;
    border: 1px solid #eaecf0;
}
.moderator-stats .stat-item {
    text-align: center;
}
.moderator-stats .stat-number {
    font-size: 1.4rem;
    font-weight: 700;
    color: #2c3e50;
}
.moderator-stats .stat-label {
    font-size: 0.75rem;
    color: #999;
}
.moderator-filters {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    background: #fff;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    border: 1px solid #eaecf0;
    align-items: center;
}
.moderator-filters label {
    font-size: 0.85rem;
    color: #555;
}
.moderator-filters select,
.moderator-filters input {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 0.85rem;
}
.moderator-filters .filter-group {
    display: flex;
    align-items: center;
    gap: 4px;
}
.moderator-filters .filter-result {
    font-size: 0.85rem;
    color: #999;
    margin-left: auto;
}
.comment-card {
    background: #fff;
    border: 1px solid #eaecf0;
    border-radius: 8px;
    padding: 12px 16px;
    transition: all 0.2s;
}
.comment-card:hover {
    border-color: #6C63FF;
    box-shadow: 0 2px 8px rgba(108, 99, 255, 0.08);
}
.comment-card.hidden {
    opacity: 0.6;
    background: #f9f9f9;
}
.comment-card .comment-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 4px;
}
.comment-card .comment-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #eee;
}
.comment-card .comment-name {
    font-weight: 600;
    font-size: 0.95rem;
}
.comment-card .comment-date {
    font-size: 0.7rem;
    color: #999;
}
.comment-card .comment-status {
    font-size: 0.65rem;
    padding: 0 10px;
    border-radius: 10px;
    color: #fff;
}
.comment-card .comment-article {
    font-size: 0.7rem;
    color: #6C63FF;
    background: #f0f0ff;
    padding: 0 10px;
    border-radius: 10px;
}
.comment-card .comment-content {
    font-size: 0.95rem;
    padding-left: 38px;
    line-height: 1.5;
}
.comment-card .comment-content.hidden-text {
    text-decoration: line-through;
    color: #999;
}
.comment-card .comment-actions {
    padding-left: 38px;
    margin-top: 8px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.comment-card .comment-actions button {
    padding: 3px 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;
    transition: opacity 0.2s;
}
.comment-card .comment-actions button:hover {
    opacity: 0.8;
}
.top-list {
    background: #fff;
    border: 1px solid #eaecf0;
    border-radius: 8px;
    padding: 12px 16px;
}
.top-list .top-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px solid #f0f0f0;
}
.top-list .top-item:last-child {
    border-bottom: none;
}
.top-list .top-rank {
    font-weight: 700;
    color: #6C63FF;
    min-width: 30px;
}
.top-list .top-name {
    flex: 1;
    margin-left: 8px;
}
.top-list .top-count {
    font-weight: 600;
    color: #2c3e50;
}
.empty-state {
    text-align: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, #f8f9fa, #fff);
    border-radius: 12px;
    border: 1px solid #eaecf0;
}
.user-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    background: #f8f9fa;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid #eaecf0;
}
.user-row .user-name {
    font-weight: 600;
    min-width: 120px;
}
.user-row .user-role {
    font-size: 0.8rem;
    color: #666;
    min-width: 100px;
}
.user-row .user-status {
    font-size: 0.7rem;
    color: #999;
}
.user-row .user-actions {
    display: flex;
    gap: 6px;
    margin-left: auto;
    flex-wrap: wrap;
}
@media (max-width: 768px) {
    .moderator-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    .moderator-filters {
        flex-direction: column;
        align-items: stretch;
    }
    .moderator-filters .filter-result {
        margin-left: 0;
        text-align: center;
    }
    .comment-card .comment-content {
        padding-left: 0;
    }
    .comment-card .comment-actions {
        padding-left: 0;
    }
    .user-row {
        flex-direction: column;
        align-items: stretch;
    }
    .user-row .user-actions {
        margin-left: 0;
    }
}
</style>

<div id="moderator-container">
    <p style="text-align: center; color: #999; padding: 40px;">⏳ Загрузка...</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

let allComments = [];
let profilesMap = {};
let currentUserId = null;

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

        currentUserId = user.id;

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

    const { data: comments, error } = await client
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = `<p style="text-align:center;color:#c0392b;">⚠️ Ошибка: ${error.message}</p>`;
        return;
    }

    allComments = comments || [];

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

    // Авто-скрытие запрещённых слов
    await autoHideBannedWords(client);

    renderPanel();
}

async function autoHideBannedWords(client) {
    const bannedWords = ['спам', 'реклама', 'магия', 'порно', 'секс', 'наркотики', 'насилие', 'оскорбление'];
    for (const c of allComments) {
        if (c.is_hidden) continue;
        const lower = c.content.toLowerCase();
        for (const word of bannedWords) {
            if (lower.includes(word)) {
                await client
                    .from('comments')
                    .update({ is_hidden: true })
                    .eq('id', c.id);
                break;
            }
        }
    }
    const { data: updated } = await client
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });
    if (updated) allComments = updated;
}

async function renderPanel() {
    const container = document.getElementById('moderator-container');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // --- ФИЛЬТРЫ ---
    const filterStatus = document.getElementById('filter-status')?.value || 'all';
    const searchAuthor = document.getElementById('search-author')?.value?.toLowerCase() || '';
    const searchArticle = document.getElementById('search-article')?.value?.toLowerCase() || '';
    const filterDate = document.getElementById('filter-date')?.value || 'all';

    let filtered = [...allComments];

    if (filterStatus === 'visible') filtered = filtered.filter(c => !c.is_hidden);
    else if (filterStatus === 'hidden') filtered = filtered.filter(c => c.is_hidden);

    if (searchAuthor) {
        filtered = filtered.filter(c => {
            const p = profilesMap[c.user_id] || {};
            const name = (p.display_name || p.username || '').toLowerCase();
            return name.includes(searchAuthor);
        });
    }

    if (searchArticle) {
        filtered = filtered.filter(c => c.article_slug.toLowerCase().includes(searchArticle));
    }

    if (filterDate === 'today') {
        const today = new Date().toDateString();
        filtered = filtered.filter(c => new Date(c.created_at).toDateString() === today);
    } else if (filterDate === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(c => new Date(c.created_at) >= weekAgo);
    } else if (filterDate === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = filtered.filter(c => new Date(c.created_at) >= monthAgo);
    }

    const total = filtered.length;
    const allTotal = allComments.length;
    const allHidden = allComments.filter(c => c.is_hidden).length;

    // --- ТОПЫ ---
    const authorStats = {};
    allComments.forEach(c => {
        const id = c.user_id;
        if (!authorStats[id]) authorStats[id] = { count: 0, name: 'Аноним' };
        authorStats[id].count++;
        const p = profilesMap[id] || {};
        authorStats[id].name = p.display_name || p.username || 'Аноним';
    });
    const topAuthors = Object.entries(authorStats)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5);

    const articleStats = {};
    allComments.forEach(c => {
        const slug = c.article_slug;
        if (!articleStats[slug]) articleStats[slug] = 0;
        articleStats[slug]++;
    });
    const topArticles = Object.entries(articleStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // --- ПОЛЬЗОВАТЕЛИ ---
    const { data: users } = await client
        .from('profiles')
        .select('user_id, username, display_name, role, is_banned, created_at')
        .order('created_at', { ascending: false });

    let html = `
        <!-- СТАТИСТИКА -->
        <div class="moderator-stats">
            <div class="stat-item"><div class="stat-number">${allTotal}</div><div class="stat-label">📝 Всего</div></div>
            <div class="stat-item"><div class="stat-number">${allTotal - allHidden}</div><div class="stat-label">👁️ Видимые</div></div>
            <div class="stat-item"><div class="stat-number">${allHidden}</div><div class="stat-label">🚫 Скрытые</div></div>
            <div class="stat-item"><div class="stat-number">${Object.keys(authorStats).length}</div><div class="stat-label">👤 Авторов</div></div>
            <div class="stat-item"><div class="stat-number">${Object.keys(articleStats).length}</div><div class="stat-label">📄 Статей</div></div>
        </div>

        <!-- ФИЛЬТРЫ -->
        <div class="moderator-filters">
            <div class="filter-group"><label>Статус:</label><select id="filter-status" onchange="renderPanel()">
                <option value="all">Все</option>
                <option value="visible">✅ Видимые</option>
                <option value="hidden">🚫 Скрытые</option>
            </select></div>
            <div class="filter-group"><label>Дата:</label><select id="filter-date" onchange="renderPanel()">
                <option value="all">Всё время</option>
                <option value="today">Сегодня</option>
                <option value="week">Неделя</option>
                <option value="month">Месяц</option>
            </select></div>
            <div class="filter-group"><label>Автор:</label><input id="search-author" type="text" placeholder="Имя..." oninput="renderPanel()"></div>
            <div class="filter-group"><label>Статья:</label><input id="search-article" type="text" placeholder="slug..." oninput="renderPanel()"></div>
            <div class="filter-result">Найдено: <strong>${total}</strong></div>
        </div>

        <!-- ТОПЫ -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
            <div class="top-list"><h4 style="margin:0 0 8px 0;">🏆 Топ авторов</h4>
                ${topAuthors.map(([id, data], i) => `
                    <div class="top-item"><span class="top-rank">#${i+1}</span><span class="top-name">${data.name}</span><span class="top-count">${data.count}</span></div>
                `).join('') || '<div style="color:#999;text-align:center;">Нет данных</div>'}
            </div>
            <div class="top-list"><h4 style="margin:0 0 8px 0;">📄 Топ статей</h4>
                ${topArticles.map(([slug, count], i) => `
                    <div class="top-item"><span class="top-rank">#${i+1}</span><span class="top-name">${slug}</span><span class="top-count">${count}</span></div>
                `).join('') || '<div style="color:#999;text-align:center;">Нет данных</div>'}
            </div>
        </div>

        <!-- УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ -->
        <div style="margin-top:16px;border-top:2px solid #eaecf0;padding-top:16px;">
            <h3 style="margin:0 0 12px 0;">👥 Пользователи <span style="font-size:0.75rem;color:#999;font-weight:normal;">(${users?.length || 0})</span></h3>
            <div style="display:flex;flex-direction:column;gap:8px;">
                ${users?.map(u => `
                    <div class="user-row">
                        <span class="user-name">${u.display_name || u.username || 'Аноним'}</span>
                        <span class="user-role">${u.role === 'moderator' ? '🛡️ Модератор' : '👤 Пользователь'}</span>
                        <span class="user-status">${u.is_banned ? '⛔ Забанен' : '✅ Активен'}</span>
                        <div class="user-actions">
                            ${u.user_id !== currentUserId ? `
                                ${u.role === 'moderator' ? `
                                    <button onclick="removeModerator('${u.user_id}','${u.display_name || u.username}')" style="padding:3px 12px;background:#e67e22;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">🗑️ Снять</button>
                                ` : `
                                    <button onclick="makeModerator('${u.user_id}','${u.display_name || u.username}')" style="padding:3px 12px;background:#6C63FF;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">⭐ Назначить</button>
                                `}
                            ` : `<span style="font-size:0.75rem;color:#999;">(Вы)</span>`}
                            <button onclick="viewUserProfile('${u.user_id}')" style="padding:3px 12px;background:#2c3e50;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">👁️ Профиль</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // КОММЕНТАРИИ
    if (total === 0) {
        html += `<div class="empty-state"><div class="empty-icon">🔍</div><p class="empty-title">Ничего не найдено</p></div>`;
    } else {
        html += `<div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">${filtered.map(c => renderComment(c)).join('')}</div>`;
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
        <div class="comment-card ${isHidden ? 'hidden' : ''}">
            <div class="comment-header">
                <img class="comment-avatar" src="${avatar}">
                <span class="comment-name">${name}</span>
                <span class="comment-date">${new Date(c.created_at).toLocaleString('ru-RU')}</span>
                <span class="comment-status" style="background:${statusColor};">${statusText}</span>
                <span class="comment-article">📄 ${c.article_slug}</span>
            </div>
            <div class="comment-content ${isHidden ? 'hidden-text' : ''}">${c.content}</div>
            <div class="comment-actions">
                <button onclick="toggleHide('${c.id}')" style="background:${isHidden ? '#27ae60' : '#f39c12'};color:#fff;">${isHidden ? '👁️ Показать' : '🚫 Скрыть'}</button>
                <button onclick="deleteCom('${c.id}')" style="background:#c0392b;color:#fff;">🗑️ Удалить</button>
                <button onclick="banUser('${c.user_id}','${name}')" style="background:${isBanned ? '#27ae60' : '#c0392b'};color:#fff;">${isBanned ? '✅ Разбанить' : '⛔ Забанить'}</button>
                <button onclick="showUserComments('${c.user_id}','${name}')" style="background:#6C63FF;color:#fff;">📋 Все комменты</button>
            </div>
        </div>
    `;
}

// === УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ ===

async function makeModerator(userId, username) {
    if (!confirm(`Назначить ${username} модератором?`)) return;
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { error } = await client.from('profiles').update({ role: 'moderator' }).eq('user_id', userId);
    if (error) { alert('❌ ' + error.message); return; }
    alert(`✅ ${username} теперь модератор!`);
    location.reload();
}

async function removeModerator(userId, username) {
    if (!confirm(`Снять модератора с ${username}?`)) return;
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { error } = await client.from('profiles').update({ role: 'user' }).eq('user_id', userId);
    if (error) { alert('❌ ' + error.message); return; }
    alert(`✅ ${username} больше не модератор.`);
    location.reload();
}

function viewUserProfile(userId) {
    window.location.href = `/profile-view/?user_id=${userId}`;
}

// === УПРАВЛЕНИЕ КОММЕНТАРИЯМИ ===

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

async function showUserComments(userId, name) {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: comments } = await client.from('comments').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (!comments || comments.length === 0) { alert(`📋 У ${name} нет комментариев.`); return; }
    const msg = comments.map(c => `📄 ${c.article_slug} | ${new Date(c.created_at).toLocaleString('ru-RU')}\n${c.content}`).join('\n\n---\n\n');
    if (msg.length > 2000) alert(`📋 Комментарии ${name} (${comments.length} шт.):\n\n${msg.substring(0,2000)}...`);
    else alert(`📋 Комментарии ${name} (${comments.length} шт.):\n\n${msg}`);
}

window.makeModerator = makeModerator;
window.removeModerator = removeModerator;
window.viewUserProfile = viewUserProfile;
window.toggleHide = toggleHide;
window.deleteCom = deleteCom;
window.banUser = banUser;
window.showUserComments = showUserComments;
window.renderPanel = renderPanel;
</script>
