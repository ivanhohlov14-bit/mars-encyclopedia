---
title: Панель модерации
comments: false
---

<div id="mod-app" style="max-width: 1100px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: modSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка панели...</p>
    </div>
</div>

<style>
:root {
    --mod-color: #6C63FF;
    --mod-bg: #F0F4FF;
    --mod-light: #A29BFE;
    --mod-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes modSpin { to { transform: rotate(360deg); } }
@keyframes modFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes modPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes modSlide { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes modFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

.mod-fade { animation: modFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.mod-slide { animation: modSlide 0.4s ease both; }

#mod-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   HERO
   ============================================================ */
.mod-hero {
    position: relative;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 24px;
    padding: 32px 36px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 20px 60px -12px rgba(0,0,0,0.4);
}

.mod-hero::before {
    content: '';
    position: absolute;
    top: -60%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(108,99,255,0.25), transparent 70%);
    border-radius: 50%;
    animation: modFloat 8s ease-in-out infinite;
}

.mod-hero::after {
    content: '';
    position: absolute;
    bottom: -60%; left: -10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(162,155,254,0.15), transparent 70%);
    border-radius: 50%;
    animation: modFloat 10s ease-in-out infinite reverse;
}

.mod-hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
}

.mod-hero-icon {
    font-size: 4rem;
    filter: drop-shadow(0 8px 20px rgba(108,99,255,0.5));
    animation: modPulse 3s ease-in-out infinite;
}

.mod-hero-info { flex: 1; min-width: 200px; }
.mod-hero-title {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 4px 0;
    letter-spacing: -0.5px;
}

.mod-hero-sub {
    font-size: 0.9rem;
    opacity: 0.75;
    margin: 0 0 12px 0;
}

.mod-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border-radius: 30px;
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    box-shadow: 0 4px 16px rgba(108,99,255,0.4);
}

/* ============================================================
   СТАТИСТИКА
   ============================================================ */
.mod-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
}

.mod-stat {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    padding: 20px 16px;
    border-radius: 16px;
    text-align: center;
    border: 2px solid transparent;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.mod-stat:hover {
    transform: translateY(-6px);
    border-color: var(--mod-color);
    box-shadow: 0 16px 40px -8px var(--mod-shadow);
}

.mod-stat .mod-stat-icon {
    font-size: 1.6rem;
    margin-bottom: 8px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.mod-stat .mod-stat-value {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(135deg, var(--mod-color), var(--mod-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.mod-stat .mod-stat-label {
    font-size: 0.72rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-top: 6px;
    font-weight: 600;
}

/* ============================================================
   ВКЛАДКИ
   ============================================================ */
.mod-tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 20px;
    overflow-x: auto;
    padding: 6px;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid rgba(0,0,0,0.05);
}

.mod-tabs::-webkit-scrollbar { height: 4px; }
.mod-tabs::-webkit-scrollbar-thumb { background: var(--mod-color); border-radius: 2px; }

.mod-tab {
    flex-shrink: 0;
    padding: 10px 20px;
    border: none;
    background: transparent;
    color: #666;
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.25s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: inherit;
}

.mod-tab:hover { background: rgba(0,0,0,0.04); color: #333; }

.mod-tab.active {
    background: linear-gradient(135deg, var(--mod-color), var(--mod-light));
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--mod-shadow);
}

.mod-tab-content { display: none; }
.mod-tab-content.active { display: block; animation: modFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }

/* ============================================================
   КАРТОЧКИ
   ============================================================ */
.mod-card {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    border: 1px solid rgba(0,0,0,0.06);
    padding: 22px 26px;
    margin-bottom: 18px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    transition: box-shadow 0.3s;
}

.mod-card:hover { box-shadow: 0 12px 32px -8px var(--mod-shadow); }

.mod-card-title {
    font-size: 1.1rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* ============================================================
   ФИЛЬТРЫ
   ============================================================ */
.mod-filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 18px;
    padding: 14px 18px;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(8px);
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
}

.mod-filters label {
    font-size: 0.82rem;
    color: #666;
    font-weight: 600;
    margin-right: 4px;
}

.mod-filters select,
.mod-filters input {
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    font-size: 0.85rem;
    font-family: inherit;
    outline: none;
    background: #fff;
    transition: border-color 0.2s;
}

.mod-filters select:focus,
.mod-filters input:focus {
    border-color: var(--mod-color);
}

.mod-filter-group { display: flex; align-items: center; gap: 4px; }

.mod-filter-result {
    margin-left: auto;
    font-size: 0.85rem;
    color: #666;
    font-weight: 600;
}

/* ============================================================
   КОММЕНТАРИЙ
   ============================================================ */
.mod-comment {
    background: rgba(255,255,255,0.95);
    border: 2px solid transparent;
    border-radius: 14px;
    padding: 16px 20px;
    margin-bottom: 12px;
    transition: all 0.25s;
    animation: modSlide 0.3s ease both;
}

.mod-comment:hover {
    border-color: var(--mod-color);
    box-shadow: 0 8px 24px -8px var(--mod-shadow);
}

.mod-comment.hidden {
    opacity: 0.55;
    background: #f9f9f9;
    border-left: 4px solid #f39c12;
}

.mod-comment-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.mod-comment-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--mod-color);
}

.mod-comment-name { font-weight: 700; font-size: 0.95rem; color: #1a1a1a; }
.mod-comment-date { font-size: 0.72rem; color: #999; }

.mod-comment-status {
    font-size: 0.68rem;
    padding: 3px 12px;
    border-radius: 20px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
}

.mod-comment-article {
    font-size: 0.72rem;
    padding: 3px 12px;
    border-radius: 20px;
    background: rgba(108,99,255,0.12);
    color: var(--mod-color);
    font-weight: 600;
}

.mod-comment-content {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #333;
    padding-left: 46px;
    margin-bottom: 12px;
    word-wrap: break-word;
}

.mod-comment-content.hidden-text {
    text-decoration: line-through;
    color: #999;
}

.mod-comment-actions {
    padding-left: 46px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.mod-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 700;
    transition: all 0.2s;
    font-family: inherit;
}

.mod-btn:hover { transform: translateY(-2px); }
.mod-btn:active { transform: translateY(0); }

.mod-btn-primary { background: linear-gradient(135deg, var(--mod-color), var(--mod-light)); color: #fff; }
.mod-btn-warning { background: #f39c12; color: #fff; }
.mod-btn-success { background: #27ae60; color: #fff; }
.mod-btn-danger { background: #e74c3c; color: #fff; }
.mod-btn-dark { background: #2c3e50; color: #fff; }
.mod-btn-outline {
    background: transparent;
    border: 2px solid var(--mod-color);
    color: var(--mod-color);
}

/* ============================================================
   ПОЛЬЗОВАТЕЛЬ
   ============================================================ */
.mod-user {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: rgba(255,255,255,0.9);
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.06);
    margin-bottom: 8px;
    transition: all 0.25s;
    flex-wrap: wrap;
}

.mod-user:hover {
    transform: translateX(4px);
    border-color: var(--mod-color);
    box-shadow: 0 6px 16px -4px var(--mod-shadow);
}

.mod-user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--mod-color);
    flex-shrink: 0;
}

.mod-user-info { flex: 1; min-width: 150px; }
.mod-user-name { font-weight: 700; font-size: 0.95rem; color: #1a1a1a; }
.mod-user-meta { font-size: 0.75rem; color: #888; display: flex; gap: 10px; flex-wrap: wrap; }
.mod-user-role { padding: 2px 10px; border-radius: 10px; background: rgba(108,99,255,0.12); color: var(--mod-color); font-weight: 600; }
.mod-user-role.mod { background: rgba(243,156,18,0.15); color: #e67e22; }
.mod-user-role.admin { background: rgba(231,76,60,0.15); color: #c0392b; }
.mod-user-role.banned { background: rgba(231,76,60,0.15); color: #c0392b; }

.mod-user-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-left: auto; }

/* ============================================================
   РЕДАКТОР СТАТЕЙ
   ============================================================ */
.mod-articles-grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 20px;
}

@media (max-width: 768px) {
    .mod-articles-grid { grid-template-columns: 1fr; }
}

.mod-articles-list {
    background: rgba(255,255,255,0.9);
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
    max-height: 600px;
    overflow-y: auto;
}

.mod-articles-list::-webkit-scrollbar { width: 6px; }
.mod-articles-list::-webkit-scrollbar-thumb { background: var(--mod-color); border-radius: 3px; }

.mod-article-item {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 8px;
}

.mod-article-item:hover { background: rgba(108,99,255,0.08); }
.mod-article-item.active {
    background: linear-gradient(135deg, var(--mod-color), var(--mod-light));
    color: #fff;
    font-weight: 700;
}

.mod-article-item .mod-article-path {
    font-size: 0.7rem;
    color: #999;
    display: block;
    margin-top: 2px;
}

.mod-article-item.active .mod-article-path { color: rgba(255,255,255,0.85); }

.mod-editor {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.mod-editor-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: rgba(255,255,255,0.9);
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.05);
    flex-wrap: wrap;
}

.mod-editor-path {
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    color: var(--mod-color);
    font-weight: 700;
    flex: 1;
    min-width: 150px;
}

.mod-editor-textarea {
    width: 100%;
    min-height: 500px;
    padding: 18px 20px;
    border-radius: 14px;
    border: 2px solid rgba(0,0,0,0.08);
    font-family: 'Courier New', 'Consolas', monospace;
    font-size: 0.85rem;
    line-height: 1.6;
    resize: vertical;
    outline: none;
    background: #fafafa;
    color: #1a1a1a;
    transition: border-color 0.2s;
}

.mod-editor-textarea:focus {
    border-color: var(--mod-color);
    background: #fff;
}

.mod-editor-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

/* ============================================================
   ЛОГ
   ============================================================ */
.mod-log-item {
    display: flex;
    gap: 14px;
    padding: 12px 16px;
    border-radius: 10px;
    background: rgba(255,255,255,0.9);
    margin-bottom: 8px;
    border-left: 4px solid var(--mod-color);
    transition: all 0.2s;
    animation: modSlide 0.3s ease both;
}

.mod-log-item:hover { background: rgba(108,99,255,0.05); }
.mod-log-icon { font-size: 1.4rem; flex-shrink: 0; }
.mod-log-body { flex: 1; min-width: 0; }
.mod-log-action { font-weight: 700; font-size: 0.9rem; color: #1a1a1a; }
.mod-log-details { font-size: 0.82rem; color: #666; margin-top: 2px; }
.mod-log-time { font-size: 0.72rem; color: #999; white-space: nowrap; }

/* ============================================================
   ПУСТОЕ СОСТОЯНИЕ
   ============================================================ */
.mod-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9));
    border-radius: 16px;
    border: 2px dashed rgba(108,99,255,0.2);
}

.mod-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.mod-empty-title { font-size: 1.1rem; font-weight: 700; color: #666; margin-bottom: 4px; }
.mod-empty-text { font-size: 0.88rem; color: #999; }

/* ============================================================
   ТЁМНАЯ ТЕМА
   ============================================================ */
@media (prefers-color-scheme: dark) {
    .mod-stat, .mod-card, .mod-user, .mod-comment, .mod-articles-list, .mod-editor-header {
        background: rgba(30, 30, 46, 0.9);
        color: #d4d4e8;
    }
    .mod-card-title, .mod-user-name, .mod-comment-name, .mod-log-action { color: #e0e0e0; }
    .mod-comment-content { color: #c0c0d0; }
    .mod-editor-textarea { background: #1a1a2a; color: #e0e0e0; border-color: #2a2a3a; }
    .mod-editor-textarea:focus { background: #1e1e2e; }
    .mod-tab { color: #aaa; }
    .mod-tab:hover { background: rgba(255,255,255,0.05); color: #fff; }
    .mod-filters { background: rgba(30,30,46,0.7); }
    .mod-filters select, .mod-filters input { background: #1a1a2a; color: #e0e0e0; border-color: #2a2a3a; }
    .mod-log-item { background: rgba(30,30,46,0.9); }
    .mod-log-details { color: #aaa; }
    .mod-empty { background: rgba(30,30,46,0.5); }
    .mod-empty-title { color: #aaa; }
}

@media (max-width: 768px) {
    .mod-hero { padding: 24px 20px; }
    .mod-hero-title { font-size: 1.4rem; }
    .mod-hero-icon { font-size: 3rem; }
    .mod-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .mod-comment-content, .mod-comment-actions { padding-left: 0; }
    .mod-user-actions { margin-left: 0; width: 100%; }
    .mod-tab { padding: 8px 14px; font-size: 0.82rem; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // GitHub репозиторий для редактирования статей
    const GITHUB_REPO = "ivanhohlov14-bit/mars-encyclopedia";
    const GITHUB_BRANCH = "main";
    const GITHUB_DOCS_PREFIX = "docs/";

    const BANNED_WORDS = ['спам','реклама','магия','порно','секс','наркотики','насилие','оскорбление'];

    const container = document.getElementById('mod-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let currentProfile = null;
    let allComments = [];
    let allUsers = [];
    let allArticles = [];
    let profilesMap = {};
    let moderationLog = [];
    let currentArticle = null;
    let activeTab = 'comments';

    // ============================================================
    // Утилиты
    // ============================================================
    function showToast(msg, type = 'info') {
        const colors = {
            success: 'linear-gradient(135deg,#27ae60,#16a085)',
            info: 'linear-gradient(135deg,#3498db,#2980b9)',
            warning: 'linear-gradient(135deg,#e67e22,#d35400)',
            error: 'linear-gradient(135deg,#e74c3c,#c0392b)'
        };
        const t = document.createElement('div');
        t.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:${colors[type]||colors.info};color:#fff;padding:12px 26px;border-radius:30px;font-weight:600;font-size:0.9rem;box-shadow:0 12px 32px rgba(0,0,0,0.3);z-index:99999;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;`;
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(() => { t.style.transform = 'translateX(-50%) translateY(0)'; });
        setTimeout(() => {
            t.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => t.remove(), 400);
        }, 2500);
    }

    async function logAction(action, targetType, targetId, targetName, details) {
        try {
            await client.from('moderation_log').insert({
                moderator_id: currentUser.id,
                action, target_type: targetType,
                target_id: String(targetId), target_name: targetName,
                details
            });
        } catch (e) { console.warn('log failed:', e); }
    }

    // ============================================================
    // Загрузка данных
    // ============================================================
    async function loadAll() {
        // Комментарии
        const { data: comments } = await client.from('comments')
            .select('*').order('created_at', { ascending: false });
        allComments = comments || [];

        // Пользователи
        const { data: users } = await client.from('profiles')
            .select('user_id, username, display_name, avatar_url, role, is_banned, experience, level, created_at')
            .order('created_at', { ascending: false });
        allUsers = users || [];

        profilesMap = {};
        allUsers.forEach(u => { profilesMap[u.user_id] = u; });

        // Лог модерации
        const { data: log } = await client.from('moderation_log')
            .select('*').order('created_at', { ascending: false }).limit(100);
        moderationLog = log || [];

        // Авто-скрытие
        await autoHideBannedWords();
    }

    async function autoHideBannedWords() {
        let changed = false;
        for (const c of allComments) {
            if (c.is_hidden) continue;
            const lower = (c.content || '').toLowerCase();
            if (BANNED_WORDS.some(w => lower.includes(w))) {
                await client.from('comments').update({ is_hidden: true }).eq('id', c.id);
                c.is_hidden = true;
                changed = true;
            }
        }
        if (changed) {
            const { data } = await client.from('comments').select('*')
                .order('created_at', { ascending: false });
            allComments = data || [];
            showToast('🚫 Автоматически скрыты запрещённые комментарии', 'warning');
        }
    }

    // ============================================================
    // Загрузка статей из GitHub
    // ============================================================
    async function loadArticles() {
        try {
            const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`);
            const data = await res.json();
            if (!data.tree) throw new Error('Не удалось получить дерево файлов');

            allArticles = data.tree
                .filter(item => item.type === 'blob' && item.path.startsWith(GITHUB_DOCS_PREFIX) && item.path.endsWith('.md'))
                .map(item => ({
                    path: item.path,
                    name: item.path.replace(GITHUB_DOCS_PREFIX, '').replace('.md', ''),
                    size: item.size
                }))
                .sort((a, b) => a.name.localeCompare(b.name));

            console.log(`✅ Загружено статей: ${allArticles.length}`);
        } catch (e) {
            console.error('Ошибка загрузки статей:', e);
            allArticles = [];
        }
    }

    async function loadArticleContent(path) {
        try {
            const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${path}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Файл не найден');
            return await res.text();
        } catch (e) {
            throw new Error('Не удалось загрузить: ' + e.message);
        }
    }

    async function saveArticleContent(path, content, message) {
        // Получаем токен из настроек
        const { data: setting } = await client.from('moderator_settings')
            .select('value').eq('key', 'github_token').maybeSingle();

        if (!setting?.value) {
            throw new Error('GitHub токен не настроен. Настройте его во вкладке «Настройки».');
        }

        const token = setting.value;
        const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;

        // Получаем текущий SHA
        const getRes = await fetch(url, {
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
        });
        const currentData = await getRes.json();
        const sha = currentData.sha;

        // Обновляем файл
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message || `Обновлено через панель модерации`,
                content: btoa(unescape(encodeURIComponent(content))),
                sha: sha,
                branch: GITHUB_BRANCH
            })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Ошибка сохранения');
        }

        return await res.json();
    }

    // ============================================================
    // Рендер
    // ============================================================
    function render() {
        const totalComments = allComments.length;
        const hiddenComments = allComments.filter(c => c.is_hidden).length;
        const totalUsers = allUsers.length;
        const bannedUsers = allUsers.filter(u => u.is_banned).length;
        const totalArticles = allArticles.length;

        container.innerHTML = `
            <!-- HERO -->
            <div class="mod-hero mod-fade">
                <div class="mod-hero-content">
                    <div class="mod-hero-icon">🛡️</div>
                    <div class="mod-hero-info">
                        <h1 class="mod-hero-title">Панель модерации</h1>
                        <p class="mod-hero-sub">${currentProfile.display_name || currentProfile.username || currentUser.email}</p>
                        <div class="mod-badge">🛡️ Модератор</div>
                    </div>
                </div>
            </div>

            <!-- СТАТИСТИКА -->
            <div class="mod-stats-grid mod-fade" style="animation-delay: 0.1s;">
                <div class="mod-stat" onclick="modSetTab('comments')">
                    <div class="mod-stat-icon">💬</div>
                    <div class="mod-stat-value">${totalComments}</div>
                    <div class="mod-stat-label">Комментариев</div>
                </div>
                <div class="mod-stat" onclick="modSetTab('comments')">
                    <div class="mod-stat-icon">🚫</div>
                    <div class="mod-stat-value">${hiddenComments}</div>
                    <div class="mod-stat-label">Скрыто</div>
                </div>
                <div class="mod-stat" onclick="modSetTab('users')">
                    <div class="mod-stat-icon">👥</div>
                    <div class="mod-stat-value">${totalUsers}</div>
                    <div class="mod-stat-label">Пользователей</div>
                </div>
                <div class="mod-stat" onclick="modSetTab('users')">
                    <div class="mod-stat-icon">⛔</div>
                    <div class="mod-stat-value">${bannedUsers}</div>
                    <div class="mod-stat-label">Забанено</div>
                </div>
                <div class="mod-stat" onclick="modSetTab('articles')">
                    <div class="mod-stat-icon">📄</div>
                    <div class="mod-stat-value">${totalArticles}</div>
                    <div class="mod-stat-label">Статей</div>
                </div>
                <div class="mod-stat" onclick="modSetTab('log')">
                    <div class="mod-stat-icon">📋</div>
                    <div class="mod-stat-value">${moderationLog.length}</div>
                    <div class="mod-stat-label">Действий</div>
                </div>
            </div>

            <!-- ВКЛАДКИ -->
            <div class="mod-tabs mod-fade" style="animation-delay: 0.15s;">
                <button class="mod-tab ${activeTab==='comments'?'active':''}" data-tab="comments">💬 Комментарии</button>
                <button class="mod-tab ${activeTab==='users'?'active':''}" data-tab="users">👥 Пользователи</button>
                <button class="mod-tab ${activeTab==='articles'?'active':''}" data-tab="articles">📄 Статьи</button>
                <button class="mod-tab ${activeTab==='stats'?'active':''}" data-tab="stats">📊 Статистика</button>
                <button class="mod-tab ${activeTab==='log'?'active':''}" data-tab="log">📋 Лог</button>
                <button class="mod-tab ${activeTab==='settings'?'active':''}" data-tab="settings">⚙️ Настройки</button>
            </div>

            <!-- КОНТЕНТ ВКЛАДОК -->
            <div class="mod-tab-content ${activeTab==='comments'?'active':''}" data-content="comments">
                ${renderCommentsTab()}
            </div>
            <div class="mod-tab-content ${activeTab==='users'?'active':''}" data-content="users">
                ${renderUsersTab()}
            </div>
            <div class="mod-tab-content ${activeTab==='articles'?'active':''}" data-content="articles">
                ${renderArticlesTab()}
            </div>
            <div class="mod-tab-content ${activeTab==='stats'?'active':''}" data-content="stats">
                ${renderStatsTab()}
            </div>
            <div class="mod-tab-content ${activeTab==='log'?'active':''}" data-content="log">
                ${renderLogTab()}
            </div>
            <div class="mod-tab-content ${activeTab==='settings'?'active':''}" data-content="settings">
                ${renderSettingsTab()}
            </div>
        `;

        // Обработчики вкладок
        document.querySelectorAll('.mod-tab').forEach(tab => {
            tab.onclick = () => modSetTab(tab.dataset.tab);
        });
    }

    function renderCommentsTab() {
        const filterStatus = document.getElementById('filter-status')?.value || 'all';
        const searchAuthor = document.getElementById('search-author')?.value?.toLowerCase() || '';
        const searchArticle = document.getElementById('search-article')?.value?.toLowerCase() || '';

        let filtered = [...allComments];
        if (filterStatus === 'visible') filtered = filtered.filter(c => !c.is_hidden);
        else if (filterStatus === 'hidden') filtered = filtered.filter(c => c.is_hidden);

        if (searchAuthor) {
            filtered = filtered.filter(c => {
                const p = profilesMap[c.user_id] || {};
                return (p.display_name || p.username || '').toLowerCase().includes(searchAuthor);
            });
        }
        if (searchArticle) filtered = filtered.filter(c => (c.article_slug||'').toLowerCase().includes(searchArticle));

        return `
            <div class="mod-card">
                <div class="mod-filters">
                    <div class="mod-filter-group">
                        <label>Статус:</label>
                        <select id="filter-status" onchange="modSetTab('comments')">
                            <option value="all" ${filterStatus==='all'?'selected':''}>Все</option>
                            <option value="visible" ${filterStatus==='visible'?'selected':''}>✅ Видимые</option>
                            <option value="hidden" ${filterStatus==='hidden'?'selected':''}>🚫 Скрытые</option>
                        </select>
                    </div>
                    <div class="mod-filter-group">
                        <label>Автор:</label>
                        <input id="search-author" type="text" placeholder="Имя..." value="${searchAuthor}" oninput="modDebounceSearch()">
                    </div>
                    <div class="mod-filter-group">
                        <label>Статья:</label>
                        <input id="search-article" type="text" placeholder="slug..." value="${searchArticle}" oninput="modDebounceSearch()">
                    </div>
                    <div class="mod-filter-result">Найдено: <b>${filtered.length}</b></div>
                </div>

                ${filtered.length === 0 ? `
                    <div class="mod-empty">
                        <div class="mod-empty-icon">🔍</div>
                        <div class="mod-empty-title">Ничего не найдено</div>
                        <div class="mod-empty-text">Попробуйте изменить фильтры</div>
                    </div>
                ` : filtered.map(c => renderComment(c)).join('')}
            </div>
        `;
    }

    function renderComment(c) {
        const p = profilesMap[c.user_id] || {};
        const name = p.display_name || p.username || 'Аноним';
        const avatar = p.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=64`;
        const isHidden = c.is_hidden;
        const isBanned = p.is_banned;
        const isModerator = p.role === 'moderator';

        let statusColor = '#27ae60', statusText = 'Видимый';
        if (isBanned) { statusColor = '#c0392b'; statusText = '⛔ Забанен'; }
        else if (isHidden) { statusColor = '#f39c12'; statusText = '🚫 Скрыт'; }
        else if (isModerator) { statusColor = '#6C63FF'; statusText = '🛡️ Модератор'; }

        return `
            <div class="mod-comment ${isHidden ? 'hidden' : ''}">
                <div class="mod-comment-header">
                    <img class="mod-comment-avatar" src="${avatar}" alt="">
                    <span class="mod-comment-name">${name}</span>
                    <span class="mod-comment-date">${new Date(c.created_at).toLocaleString('ru-RU')}</span>
                    <span class="mod-comment-status" style="background:${statusColor};">${statusText}</span>
                    <span class="mod-comment-article">📄 ${c.article_slug}</span>
                </div>
                <div class="mod-comment-content ${isHidden ? 'hidden-text' : ''}">${escapeHtml(c.content)}</div>
                <div class="mod-comment-actions">
                    <button class="mod-btn ${isHidden ? 'mod-btn-success' : 'mod-btn-warning'}" onclick="modToggleHide('${c.id}')">
                        ${isHidden ? '👁️ Показать' : '🚫 Скрыть'}
                    </button>
                    <button class="mod-btn mod-btn-danger" onclick="modDeleteComment('${c.id}')">🗑️ Удалить</button>
                    <button class="mod-btn ${isBanned ? 'mod-btn-success' : 'mod-btn-danger'}" onclick="modBanUser('${c.user_id}','${escapeAttr(name)}')">
                        ${isBanned ? '✅ Разбанить' : '⛔ Забанить'}
                    </button>
                    <button class="mod-btn mod-btn-outline" onclick="modViewUserComments('${c.user_id}','${escapeAttr(name)}')">
                        📋 Все комменты
                    </button>
                    <button class="mod-btn mod-btn-dark" onclick="modViewProfile('${c.user_id}')">
                        👁️ Профиль
                    </button>
                </div>
            </div>
        `;
    }

    function renderUsersTab() {
        return `
            <div class="mod-card">
                <h3 class="mod-card-title">👥 Все пользователи (${allUsers.length})</h3>
                ${allUsers.map(u => {
                    const name = u.display_name || u.username || 'Аноним';
                    const avatar = u.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=64`;
                    const roleClass = u.role === 'moderator' ? 'mod' : (u.role === 'admin' ? 'admin' : '');
                    const roleText = u.role === 'moderator' ? '🛡️ Модератор' : (u.role === 'admin' ? '👑 Админ' : '👤 Пользователь');
                    const isMe = u.user_id === currentUser.id;

                    return `
                        <div class="mod-user">
                            <img class="mod-user-avatar" src="${avatar}" alt="">
                            <div class="mod-user-info">
                                <div class="mod-user-name">${name} ${isMe ? '<span style="font-size:0.7rem;color:#999;">(Вы)</span>' : ''}</div>
                                <div class="mod-user-meta">
                                    <span class="mod-user-role ${roleClass}">${roleText}</span>
                                    ${u.is_banned ? '<span class="mod-user-role banned">⛔ Забанен</span>' : ''}
                                    <span>⭐ ${u.level || 1}</span>
                                    <span>💎 ${u.experience || 0} XP</span>
                                </div>
                            </div>
                            <div class="mod-user-actions">
                                ${!isMe ? `
                                    ${u.role === 'moderator' ? `
                                        <button class="mod-btn mod-btn-warning" onclick="modRemoveModerator('${u.user_id}','${escapeAttr(name)}')">🗑️ Снять</button>
                                    ` : `
                                        <button class="mod-btn mod-btn-primary" onclick="modMakeModerator('${u.user_id}','${escapeAttr(name)}')">⭐ Назначить</button>
                                    `}
                                    <button class="mod-btn ${u.is_banned ? 'mod-btn-success' : 'mod-btn-danger'}" onclick="modBanUser('${u.user_id}','${escapeAttr(name)}')">
                                        ${u.is_banned ? '✅ Разбанить' : '⛔ Забанить'}
                                    </button>
                                ` : ''}
                                <button class="mod-btn mod-btn-dark" onclick="modViewProfile('${u.user_id}')">👁️</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    function renderArticlesTab() {
        if (allArticles.length === 0) {
            return `
                <div class="mod-card">
                    <div class="mod-empty">
                        <div class="mod-empty-icon">📄</div>
                        <div class="mod-empty-title">Статьи не загружены</div>
                        <div class="mod-empty-text">Нажмите «Обновить список» чтобы загрузить статьи из GitHub</div>
                        <button class="mod-btn mod-btn-primary" style="margin-top:16px;" onclick="modReloadArticles()">🔄 Обновить список</button>
                    </div>
                </div>
            `;
        }

        return `
            <div class="mod-card" style="padding: 0; overflow: hidden;">
                <div class="mod-editor-header" style="border-radius: 0; border: none; border-bottom: 1px solid rgba(0,0,0,0.05);">
                    <span class="mod-editor-path">${currentArticle ? currentArticle.path : 'Выберите статью слева'}</span>
                    <button class="mod-btn mod-btn-outline" onclick="modReloadArticles()">🔄 Обновить</button>
                    ${currentArticle ? `
                        <button class="mod-btn mod-btn-primary" onclick="modSaveArticle()">💾 Сохранить</button>
                        <button class="mod-btn mod-btn-dark" onclick="modPreviewArticle()">👁️ Просмотр</button>
                    ` : ''}
                </div>
                <div class="mod-articles-grid" style="padding: 16px;">
                    <div class="mod-articles-list">
                        ${allArticles.map(a => `
                            <div class="mod-article-item ${currentArticle && currentArticle.path===a.path?'active':''}" onclick="modLoadArticle('${a.path}')">
                                <div style="flex:1;min-width:0;">
                                    <div>📄 ${a.name}</div>
                                    <span class="mod-article-path">${a.path}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mod-editor">
                        ${currentArticle ? `
                            <textarea class="mod-editor-textarea" id="mod-editor-content" placeholder="Загрузка...">${currentArticle.content || ''}</textarea>
                            <div class="mod-editor-actions">
                                <button class="mod-btn mod-btn-primary" onclick="modSaveArticle()">💾 Сохранить в GitHub</button>
                                <button class="mod-btn mod-btn-outline" onclick="modReloadArticle()">↻ Отменить изменения</button>
                            </div>
                        ` : `
                            <div class="mod-empty">
                                <div class="mod-empty-icon">✏️</div>
                                <div class="mod-empty-title">Выберите статью</div>
                                <div class="mod-empty-text">Кликните на статью в списке слева</div>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }

    function renderStatsTab() {
        const authorStats = {};
        allComments.forEach(c => {
            if (!authorStats[c.user_id]) authorStats[c.user_id] = 0;
            authorStats[c.user_id]++;
        });
        const topAuthors = Object.entries(authorStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const articleStats = {};
        allComments.forEach(c => {
            articleStats[c.article_slug] = (articleStats[c.article_slug] || 0) + 1;
        });
        const topArticles = Object.entries(articleStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        return `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div class="mod-card">
                    <h3 class="mod-card-title">🏆 Топ авторов</h3>
                    ${topAuthors.length === 0 ? '<p style="color:#999;">Нет данных</p>' : topAuthors.map(([id, count], i) => {
                        const p = profilesMap[id] || {};
                        const name = p.display_name || p.username || 'Аноним';
                        return `
                            <div class="mod-log-item" style="border-left-color: #f39c12;">
                                <span class="mod-log-icon">${['🥇','🥈','🥉'][i] || '#'+(i+1)}</span>
                                <div class="mod-log-body">
                                    <div class="mod-log-action">${name}</div>
                                    <div class="mod-log-details">${count} комментариев</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="mod-card">
                    <h3 class="mod-card-title">📄 Топ статей</h3>
                    ${topArticles.length === 0 ? '<p style="color:#999;">Нет данных</p>' : topArticles.map(([slug, count], i) => `
                        <div class="mod-log-item" style="border-left-color: #27ae60;">
                            <span class="mod-log-icon">${['🥇','🥈','🥉'][i] || '#'+(i+1)}</span>
                            <div class="mod-log-body">
                                <div class="mod-log-action">${slug}</div>
                                <div class="mod-log-details">${count} комментариев</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderLogTab() {
        const icons = {
            'hide_comment': '🚫', 'show_comment': '👁️',
            'delete_comment': '🗑️', 'ban_user': '⛔',
            'unban_user': '✅', 'make_moderator': '⭐',
            'remove_moderator': '📉', 'edit_article': '✏️'
        };
        return `
            <div class="mod-card">
                <h3 class="mod-card-title">📋 История модерации (последние ${moderationLog.length})</h3>
                ${moderationLog.length === 0 ? `
                    <div class="mod-empty">
                        <div class="mod-empty-icon">📋</div>
                        <div class="mod-empty-title">Лог пуст</div>
                        <div class="mod-empty-text">Здесь появятся все ваши действия</div>
                    </div>
                ` : moderationLog.map(l => `
                    <div class="mod-log-item">
                        <span class="mod-log-icon">${icons[l.action] || '📝'}</span>
                        <div class="mod-log-body">
                            <div class="mod-log-action">${l.action} → <b>${l.target_name || l.target_id}</b></div>
                            <div class="mod-log-details">${l.details || ''} ${l.target_type ? `(${l.target_type})` : ''}</div>
                        </div>
                        <span class="mod-log-time">${new Date(l.created_at).toLocaleString('ru-RU')}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderSettingsTab() {
        return `
            <div class="mod-card">
                <h3 class="mod-card-title">🔑 GitHub токен</h3>
                <p style="color:#888;font-size:0.88rem;margin:0 0 12px 0;">
                    Нужен для редактирования статей через панель. Создайте токен на
                    <a href="https://github.com/settings/tokens" target="_blank" style="color:var(--mod-color);font-weight:600;">github.com/settings/tokens</a>
                    с правами <b>repo</b>.
                </p>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <input id="gh-token-input" type="password" placeholder="ghp_xxxxxxxxxxxxxxxxx"
                        style="flex:1;min-width:200px;padding:10px 14px;border-radius:10px;border:1px solid rgba(0,0,0,0.1);font-family:monospace;font-size:0.85rem;">
                    <button class="mod-btn mod-btn-primary" onclick="modSaveToken()">💾 Сохранить</button>
                    <button class="mod-btn mod-btn-outline" onclick="modClearToken()">🗑️ Очистить</button>
                </div>
                <div id="token-status" style="margin-top:12px;font-size:0.85rem;"></div>
            </div>

            <div class="mod-card">
                <h3 class="mod-card-title">📊 Информация</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.88rem;">
                    <div><b>Репозиторий:</b><br>${GITHUB_REPO}</div>
                    <div><b>Ветка:</b><br>${GITHUB_BRANCH}</div>
                    <div><b>Префикс статей:</b><br>${GITHUB_DOCS_PREFIX}</div>
                    <div><b>Всего статей:</b><br>${allArticles.length}</div>
                </div>
            </div>

            <div class="mod-card">
                <h3 class="mod-card-title">⚙️ Опасные действия</h3>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button class="mod-btn mod-btn-warning" onclick="modReloadArticles()">🔄 Перезагрузить статьи</button>
                    <button class="mod-btn mod-btn-danger" onclick="modClearLog()">🗑️ Очистить лог модерации</button>
                </div>
            </div>
        `;
    }

    // ============================================================
    // Функции действий (экспорт в window)
    // ============================================================
    window.modSetTab = function(tab) {
        // Сохраняем фильтры
        const fs = document.getElementById('filter-status')?.value;
        const sa = document.getElementById('search-author')?.value;
        const sr = document.getElementById('search-article')?.value;

        activeTab = tab;
        render();

        // Восстанавливаем фильтры
        if (tab === 'comments') {
            if (fs) document.getElementById('filter-status').value = fs;
            if (sa) document.getElementById('search-author').value = sa;
            if (sr) document.getElementById('search-article').value = sr;
        }
    };

    let searchTimer;
    window.modDebounceSearch = function() {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            // Перерисовываем только контент вкладки
            const content = document.querySelector('.mod-tab-content[data-content="comments"]');
            if (content) {
                const fs = document.getElementById('filter-status')?.value || 'all';
                const sa = document.getElementById('search-author')?.value || '';
                const sr = document.getElementById('search-article')?.value || '';
                // Заменяем только список, не трогая фильтры
                const card = content.querySelector('.mod-card');
                if (card) {
                    const list = card.querySelectorAll('.mod-comment, .mod-empty');
                    let filtered = [...allComments];
                    if (fs === 'visible') filtered = filtered.filter(c => !c.is_hidden);
                    else if (fs === 'hidden') filtered = filtered.filter(c => c.is_hidden);
                    if (sa) filtered = filtered.filter(c => {
                        const p = profilesMap[c.user_id] || {};
                        return (p.display_name || p.username || '').toLowerCase().includes(sa.toLowerCase());
                    });
                    if (sr) filtered = filtered.filter(c => (c.article_slug||'').toLowerCase().includes(sr.toLowerCase()));

                    // Обновляем результат
                    const resultEl = card.querySelector('.mod-filter-result');
                    if (resultEl) resultEl.innerHTML = `Найдено: <b>${filtered.length}</b>`;

                    // Удаляем старые карточки
                    card.querySelectorAll('.mod-comment, .mod-empty').forEach(el => el.remove());

                    // Добавляем новые
                    if (filtered.length === 0) {
                        card.insertAdjacentHTML('beforeend', `
                            <div class="mod-empty">
                                <div class="mod-empty-icon">🔍</div>
                                <div class="mod-empty-title">Ничего не найдено</div>
                            </div>
                        `);
                    } else {
                        card.insertAdjacentHTML('beforeend', filtered.map(c => renderComment(c)).join(''));
                    }
                }
            }
        }, 300);
    };

    window.modToggleHide = async function(id) {
        const c = allComments.find(x => String(x.id) === String(id));
        if (!c) return;
        const newState = !c.is_hidden;
        const { error } = await client.from('comments').update({ is_hidden: newState }).eq('id', id);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        c.is_hidden = newState;
        await logAction(newState ? 'hide_comment' : 'show_comment', 'comment', id, null, newState ? 'Скрыт' : 'Показан');
        showToast(newState ? '🚫 Скрыт' : '👁️ Показан', 'success');
        render();
    };

    window.modDeleteComment = async function(id) {
        if (!confirm('Удалить комментарий навсегда?')) return;
        const { error } = await client.from('comments').delete().eq('id', id);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        allComments = allComments.filter(c => String(c.id) !== String(id));
        await logAction('delete_comment', 'comment', id, null, 'Удалён');
        showToast('🗑️ Удалено', 'success');
        render();
    };

    window.modBanUser = async function(userId, name) {
        const p = profilesMap[userId];
        if (!p) return;
        const newState = !p.is_banned;
        if (!confirm(`${newState ? 'Забанить' : 'Разбанить'} ${name}?`)) return;
        const { error } = await client.from('profiles').update({ is_banned: newState }).eq('user_id', userId);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        p.is_banned = newState;

        if (newState) {
            await client.from('comments').update({ is_hidden: true }).eq('user_id', userId);
            allComments.forEach(c => { if (c.user_id === userId) c.is_hidden = true; });
        }

        await logAction(newState ? 'ban_user' : 'unban_user', 'user', userId, name, newState ? 'Забанен' : 'Разбанен');
        showToast(newState ? '⛔ Забанен' : '✅ Разбанен', 'success');
        render();
    };

    window.modMakeModerator = async function(userId, name) {
        if (!confirm(`Назначить ${name} модератором?`)) return;
        const { error } = await client.from('profiles').update({ role: 'moderator' }).eq('user_id', userId);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        const p = profilesMap[userId];
        if (p) p.role = 'moderator';
        await logAction('make_moderator', 'user', userId, name, 'Назначен');
        showToast(`⭐ ${name} теперь модератор`, 'success');
        render();
    };

    window.modRemoveModerator = async function(userId, name) {
        if (!confirm(`Снять модератора с ${name}?`)) return;
        const { error } = await client.from('profiles').update({ role: 'user' }).eq('user_id', userId);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        const p = profilesMap[userId];
        if (p) p.role = 'user';
        await logAction('remove_moderator', 'user', userId, name, 'Снят');
        showToast(`✅ ${name} больше не модератор`, 'success');
        render();
    };

    window.modViewProfile = function(userId) {
        window.location.href = `/profile-view/?user_id=${userId}`;
    };

    window.modViewUserComments = function(userId, name) {
        const userComments = allComments.filter(c => c.user_id === userId);
        if (userComments.length === 0) { showToast(`У ${name} нет комментариев`, 'info'); return; }
        const msg = userComments.slice(0, 20).map(c =>
            `📄 ${c.article_slug}\n${c.content}`
        ).join('\n\n---\n\n');
        alert(`📋 Комментарии ${name} (${userComments.length}):\n\n${msg.substring(0, 2000)}${msg.length > 2000 ? '...' : ''}`);
    };

    // ============================================================
    // Работа со статьями
    // ============================================================
    window.modReloadArticles = async function() {
        showToast('🔄 Загрузка статей...', 'info');
        await loadArticles();
        showToast(`✅ Загружено ${allArticles.length} статей`, 'success');
        render();
    };

    window.modLoadArticle = async function(path) {
        showToast('📄 Загрузка...', 'info');
        try {
            const content = await loadArticleContent(path);
            const article = allArticles.find(a => a.path === path);
            currentArticle = { path, name: article?.name || path, content };
            render();
            showToast('✅ Загружено', 'success');
        } catch (e) {
            showToast('Ошибка: ' + e.message, 'error');
        }
    };

    window.modReloadArticle = async function() {
        if (!currentArticle) return;
        try {
            const content = await loadArticleContent(currentArticle.path);
            currentArticle.content = content;
            const ta = document.getElementById('mod-editor-content');
            if (ta) ta.value = content;
            showToast('↻ Изменения отменены', 'info');
        } catch (e) {
            showToast('Ошибка: ' + e.message, 'error');
        }
    };

    window.modSaveArticle = async function() {
        if (!currentArticle) return;
        const ta = document.getElementById('mod-editor-content');
        if (!ta) return;
        const content = ta.value;
        const msg = prompt('Сообщение коммита:', 'Обновлено через панель модерации') || 'Обновлено через панель модерации';

        showToast('💾 Сохранение...', 'info');
        try {
            await saveArticleContent(currentArticle.path, content, msg);
            currentArticle.content = content;
            await logAction('edit_article', 'article', currentArticle.path, currentArticle.name, 'Изменено');
            showToast('✅ Сохранено в GitHub!', 'success');
        } catch (e) {
            showToast('Ошибка: ' + e.message, 'error');
        }
    };

    window.modPreviewArticle = function() {
        if (!currentArticle) return;
        const url = `https://github.com/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${currentArticle.path}`;
        window.open(url, '_blank');
    };

    // ============================================================
    // Настройки
    // ============================================================
    window.modSaveToken = async function() {
        const input = document.getElementById('gh-token-input');
        if (!input || !input.value.trim()) { showToast('Введите токен', 'warning'); return; }

        const { error } = await client.from('moderator_settings').upsert({
            key: 'github_token',
            value: input.value.trim(),
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast('✅ Токен сохранён', 'success');
        input.value = '';
        checkTokenStatus();
    };

    window.modClearToken = async function() {
        if (!confirm('Удалить токен?')) return;
        await client.from('moderator_settings').delete().eq('key', 'github_token');
        showToast('🗑️ Токен удалён', 'info');
        checkTokenStatus();
    };

    async function checkTokenStatus() {
        const el = document.getElementById('token-status');
        if (!el) return;
        const { data } = await client.from('moderator_settings')
            .select('value').eq('key', 'github_token').maybeSingle();
        if (data?.value) {
            el.innerHTML = '✅ Токен настроен (конец: <code>...' + data.value.slice(-6) + '</code>)';
            el.style.color = '#27ae60';
        } else {
            el.innerHTML = '⚠️ Токен не настроен — редактирование статей недоступно';
            el.style.color = '#e67e22';
        }
    }

    window.modClearLog = async function() {
        if (!confirm('Очистить весь лог модерации? Это необратимо.')) return;
        await client.from('moderation_log').delete().neq('id', 0);
        moderationLog = [];
        showToast('🗑️ Лог очищен', 'success');
        render();
    };

    // ============================================================
    // Утилиты
    // ============================================================
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }
    function escapeAttr(s) {
        return String(s || '').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    }

    // ============================================================
    // Инициализация
    // ============================================================
    async function init() {
        const { data: { session } } = await client.auth.getSession();
        const user = session?.user;
        if (!user) {
            container.innerHTML = `<div class="mod-card" style="text-align:center;padding:60px 20px;">
                <div style="font-size:4rem;margin-bottom:16px;">🔒</div>
                <h2 style="margin:0 0 12px 0;">Вы не авторизованы</h2>
                <a href="/login/" class="mod-btn mod-btn-primary" style="text-decoration:none;">Войти</a>
            </div>`;
            return;
        }

        currentUser = user;
        const { data: profile } = await client.from('profiles').select('*').eq('user_id', user.id).single();
        currentProfile = profile || {};

        if (profile?.role !== 'moderator' && profile?.role !== 'admin') {
            container.innerHTML = `<div class="mod-card" style="text-align:center;padding:60px 20px;">
                <div style="font-size:4rem;margin-bottom:16px;">⛔</div>
                <h2 style="margin:0 0 12px 0;">Доступ запрещён</h2>
                <p style="color:#888;">Только для модераторов</p>
                <a href="/profile/" class="mod-btn mod-btn-primary" style="text-decoration:none;margin-top:12px;">← В профиль</a>
            </div>`;
            return;
        }

        // Загружаем данные
        await loadAll();
        await loadArticles();

        // Рендерим
        render();

        // Если вкладка настроек — проверяем токен
        setTimeout(() => {
            if (activeTab === 'settings') checkTokenStatus();
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
