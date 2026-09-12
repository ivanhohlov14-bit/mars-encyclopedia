---
title: Форум
comments: false
---

<div id="frm-app" style="max-width: 1000px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: frmSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка форума...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes frmSpin { to { transform: rotate(360deg); } }
@keyframes frmFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes frmPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes frmFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes frmSlide { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes frmHeart {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); }
    100% { transform: scale(1); }
}

.frm-fade { animation: frmFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#frm-app a { text-decoration: none !important; border-bottom: none !important; }

/* HERO */
.frm-hero {
    position: relative;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    border-radius: 24px;
    padding: 40px 36px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px -16px var(--kingdom-shadow);
}

.frm-hero::before {
    content: '';
    position: absolute;
    top: -60%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
    border-radius: 50%;
    animation: frmFloat 8s ease-in-out infinite;
}

.frm-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.frm-hero-icon {
    font-size: 4rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.3));
    animation: frmPulse 3s ease-in-out infinite;
}

.frm-hero-title {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
}

.frm-hero-sub {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0 0 20px 0;
}

.frm-hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.frm-hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 30px;
    border: 2px solid rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s;
    backdrop-filter: blur(8px);
    font-family: inherit;
}

.frm-hero-btn:hover {
    background: rgba(255,255,255,0.35);
    transform: translateY(-2px);
}

.frm-hero-btn.primary {
    background: #fff;
    color: var(--kingdom-color);
    border-color: #fff;
}

/* СТАТИСТИКА */
.frm-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
}

.frm-stat {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    padding: 20px 16px;
    border-radius: 16px;
    text-align: center;
    border: 2px solid transparent;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.frm-stat:hover {
    transform: translateY(-6px);
    border-color: var(--kingdom-color);
    box-shadow: 0 16px 40px -8px var(--kingdom-shadow);
}

.frm-stat-icon { font-size: 1.8rem; margin-bottom: 8px; }
.frm-stat-value {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.frm-stat-label {
    font-size: 0.72rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-top: 6px;
    font-weight: 600;
}

/* ФИЛЬТРЫ */
.frm-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
}

.frm-filter-btn {
    padding: 8px 16px;
    border-radius: 30px;
    border: 2px solid transparent;
    background: rgba(0,0,0,0.03);
    color: #666;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.frm-filter-btn:hover { background: rgba(0,0,0,0.06); color: #333; }
.frm-filter-btn.active {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
}

.frm-search {
    flex: 1;
    min-width: 180px;
    padding: 10px 16px;
    border-radius: 30px;
    border: 2px solid rgba(0,0,0,0.08);
    font-size: 0.88rem;
    font-family: inherit;
    outline: none;
    background: #fff;
    transition: border-color 0.2s;
}

.frm-search:focus { border-color: var(--kingdom-color); }

/* ТЕМЫ */
.frm-topic {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 2px solid rgba(0,0,0,0.05);
    padding: 20px 24px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    animation: frmFadeIn 0.4s ease both;
    display: flex;
    gap: 16px;
}

.frm-topic:hover {
    transform: translateY(-4px);
    border-color: var(--kingdom-color);
    box-shadow: 0 16px 40px -8px var(--kingdom-shadow);
}

.frm-topic.pinned {
    border-color: #f39c12;
    background: linear-gradient(135deg, rgba(243, 156, 18, 0.06), rgba(255,255,255,0.95));
}

.frm-topic-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--kingdom-color);
    flex-shrink: 0;
}

.frm-topic-body { flex: 1; min-width: 0; }

.frm-topic-header {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 6px;
}

.frm-topic-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0;
    letter-spacing: -0.3px;
}

.frm-topic-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    text-transform: uppercase;
}

.frm-topic-badge.category { background: rgba(108,99,255,0.12); color: var(--kingdom-color); }
.frm-topic-badge.pinned { background: rgba(243,156,18,0.15); color: #e67e22; }
.frm-topic-badge.locked { background: rgba(231,76,60,0.12); color: #c0392b; }

.frm-topic-preview {
    font-size: 0.88rem;
    color: #666;
    line-height: 1.5;
    margin: 0 0 10px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.frm-topic-meta {
    display: flex;
    gap: 14px;
    font-size: 0.75rem;
    color: #888;
    flex-wrap: wrap;
}

.frm-topic-meta span { display: inline-flex; align-items: center; gap: 4px; }

/* ПУСТОЕ */
.frm-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9));
    border-radius: 16px;
    border: 2px dashed rgba(108,99,255,0.2);
}
.frm-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.frm-empty-title { font-size: 1.1rem; font-weight: 700; color: #666; margin-bottom: 16px; }

/* МОДАЛКА */
.frm-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: frmFadeIn 0.3s ease;
    overflow-y: auto;
}

.frm-modal {
    background: #fff;
    max-width: 700px;
    width: 100%;
    border-radius: 20px;
    padding: 32px 28px;
    position: relative;
    box-shadow: 0 30px 80px rgba(0,0,0,0.4);
    animation: frmFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    max-height: 90vh;
    overflow-y: auto;
}

.frm-modal-close {
    position: absolute;
    top: 14px;
    right: 16px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(0,0,0,0.05);
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}
.frm-modal-close:hover { background: rgba(0,0,0,0.1); color: #333; transform: rotate(90deg); }

.frm-modal-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.frm-field { margin-bottom: 16px; }
.frm-field label {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 6px;
}
.frm-field input,
.frm-field textarea,
.frm-field select {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 2px solid rgba(0,0,0,0.08);
    font-size: 0.92rem;
    font-family: inherit;
    outline: none;
    background: #fafafa;
    transition: border-color 0.2s;
    box-sizing: border-box;
}
.frm-field input:focus,
.frm-field textarea:focus,
.frm-field select:focus {
    border-color: var(--kingdom-color);
    background: #fff;
}
.frm-field textarea { resize: vertical; min-height: 120px; }

.frm-category-picker {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.frm-cat-btn {
    padding: 8px 16px;
    border-radius: 30px;
    border: 2px solid rgba(0,0,0,0.08);
    background: #fafafa;
    color: #666;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}
.frm-cat-btn:hover { background: #f0f0f0; }
.frm-cat-btn.selected {
    background: var(--kingdom-color);
    color: #fff;
    border-color: var(--kingdom-color);
    box-shadow: 0 4px 12px -2px var(--kingdom-shadow);
}

.frm-modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}
.frm-btn {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: none;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
}
.frm-btn.primary {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    box-shadow: 0 8px 20px -4px var(--kingdom-shadow);
}
.frm-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -6px var(--kingdom-shadow); }
.frm-btn.secondary { background: rgba(0,0,0,0.05); color: #666; }

/* ПРОСМОТР ТЕМЫ */
.frm-topic-view-header {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(0,0,0,0.06);
}

.frm-topic-view-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 8px 0;
    line-height: 1.3;
}

.frm-topic-content {
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
    padding: 20px 24px;
    background: rgba(0,0,0,0.02);
    border-radius: 14px;
    border-left: 4px solid var(--kingdom-color);
    margin-bottom: 24px;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.frm-post {
    background: rgba(0,0,0,0.02);
    border-radius: 14px;
    padding: 18px 20px;
    margin-bottom: 12px;
    transition: all 0.25s;
    display: flex;
    gap: 14px;
    border-left: 4px solid var(--kingdom-color);
}

.frm-post:hover {
    background: rgba(108,99,255,0.04);
    transform: translateX(4px);
}

.frm-post-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--kingdom-color);
    flex-shrink: 0;
}

.frm-post-body { flex: 1; min-width: 0; }

.frm-post-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

.frm-post-author {
    font-weight: 700;
    color: var(--kingdom-color);
    font-size: 0.9rem;
}

.frm-post-date {
    font-size: 0.72rem;
    color: #999;
}

.frm-post-content {
    font-size: 0.92rem;
    line-height: 1.6;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.frm-like-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 20px;
    background: rgba(0,0,0,0.04);
    border: none;
    color: #888;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    margin-top: 8px;
}

.frm-like-btn:hover { background: rgba(231, 76, 60, 0.1); color: #e74c3c; }
.frm-like-btn.liked { background: rgba(231, 76, 60, 0.15); color: #e74c3c; }
.frm-like-btn.liked .frm-like-icon { animation: frmHeart 0.4s ease; }

.frm-reply-box {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 2px solid rgba(0,0,0,0.06);
}

.frm-reply-input {
    width: 100%;
    padding: 14px 18px;
    border-radius: 12px;
    border: 2px solid rgba(0,0,0,0.08);
    font-size: 0.92rem;
    font-family: inherit;
    resize: vertical;
    min-height: 100px;
    outline: none;
    background: #fafafa;
    transition: border-color 0.2s;
    box-sizing: border-box;
}

.frm-reply-input:focus { border-color: var(--kingdom-color); background: #fff; }

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .frm-stat, .frm-topic, .frm-filters { background: rgba(30, 30, 46, 0.9); }
    .frm-topic-title, .frm-topic-view-title, .frm-modal-title { color: #e0e0e0; }
    .frm-topic-preview, .frm-topic-content, .frm-post-content { color: #b0b0c0; }
    .frm-modal { background: #1a1a2a; }
    .frm-field label { color: #d0d0d0; }
    .frm-field input, .frm-field textarea, .frm-field select { background: rgba(255,255,255,0.05); color: #e0e0e0; }
    .frm-filter-btn { background: rgba(255,255,255,0.05); color: #aaa; }
    .frm-search { background: #1a1a2a; color: #e0e0e0; border-color: #2a2a3a; }
    .frm-topic-content, .frm-post { background: rgba(255,255,255,0.03); }
    .frm-empty { background: rgba(30,30,46,0.5); }
    .frm-empty-title { color: #aaa; }
    .frm-cat-btn { background: rgba(255,255,255,0.05); color: #aaa; }
}

@media (max-width: 600px) {
    .frm-hero { padding: 24px 20px; }
    .frm-hero-title { font-size: 1.5rem; }
    .frm-hero-icon { font-size: 3rem; }
    .frm-topic { padding: 16px 18px; gap: 12px; }
    .frm-topic-avatar { width: 40px; height: 40px; }
    .frm-topic-title { font-size: 0.95rem; }
    .frm-modal { padding: 24px 20px; }
    .frm-topic-view-title { font-size: 1.2rem; }
    .frm-topic-content { padding: 16px; font-size: 0.92rem; }
    .frm-post { padding: 14px; gap: 10px; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
        'Аркадия':    { color: '#D4A574', bg: '#FDF8F0', light: '#E8C9A0' },
        'Ксанф':      { color: '#3D3D3D', bg: '#F5F5F5', light: '#6B6B6B' },
        'Эдем':       { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' },
        'Эридания':   { color: '#F5D76E', bg: '#FFFDF5', light: '#FAE9A0' },
        'Кхонг':      { color: '#A9A9A9', bg: '#F8F8F8', light: '#C8C8C8' },
        'Авсония':    { color: '#87CEEB', bg: '#F0F8FF', light: '#B0D8EB' },
        'Кимерия':    { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9' },
        'Серпентида': { color: '#E57373', bg: '#FFF5F5', light: '#F5A0A0' },
        'Эритрей':    { color: '#64B5F6', bg: '#F0F8FF', light: '#90CAF9' },
        'Утопия':     { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' },
        'Эллада':     { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91' },
        'Аливасото':  { color: '#81C784', bg: '#F0FFF0', light: '#A5D6A7' }
    };

    const CATEGORIES = {
        'general':   { icon: '💬', name: 'Общее' },
        'lore':      { icon: '📜', name: 'Лор и история' },
        'theories':  { icon: '🔮', name: 'Теории' },
        'help':      { icon: '🆘', name: 'Помощь' },
        'creative':  { icon: '🎨', name: 'Творчество' },
        'offtopic':  { icon: '🎲', name: 'Оффтоп' }
    };

    const container = document.getElementById('frm-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let profile = null;
    let kingdom = KINGDOMS['Эдем'];
    let topics = [];
    let posts = {};
    let likes = [];
    let profilesMap = {};
    let counts = {};
    let activeFilter = 'all';
    let searchQuery = '';
    let currentView = 'list';
    let activeTopic = null;

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
        }, 2400);
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }

    function formatTime(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        if (diff < 60) return 'только что';
        if (diff < 3600) return `${Math.floor(diff/60)} мин`;
        if (diff < 86400) return `${Math.floor(diff/3600)} ч`;
        if (diff < 604800) return `${Math.floor(diff/86400)} дн`;
        return date.toLocaleDateString('ru-RU');
    }

    // ============================================================
    // Загрузка
    // ============================================================
    async function loadData() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        if (currentUser) {
            const { data: p } = await client.from('profiles').select('*').eq('user_id', currentUser.id).single();
            profile = p;
            kingdom = KINGDOMS[p?.kingdom] || KINGDOMS['Эдем'];
        }

        // Темы
        const { data: t } = await client.from('forum_topics').select('*')
            .order('is_pinned', { ascending: false })
            .order('updated_at', { ascending: false });
        topics = t || [];

        // Ответы (только количество)
        const { data: p } = await client.from('forum_posts').select('topic_id');
        counts = {};
        (p || []).forEach(x => { counts[x.topic_id] = (counts[x.topic_id] || 0) + 1; });

        // Лайки
        const { data: l } = await client.from('forum_likes').select('*');
        likes = l || [];

        // Профили авторов
        const authorIds = new Set();
        topics.forEach(t => authorIds.add(t.author_id));
        if (authorIds.size > 0) {
            const { data: profs } = await client.from('profiles')
                .select('user_id, username, display_name, avatar_url, role, kingdom')
                .in('user_id', [...authorIds]);
            profilesMap = {};
            (profs || []).forEach(p => { profilesMap[p.user_id] = p; });
        }
    }

    function getLikeCount(type, id) {
        return likes.filter(l => l.target_type === type && l.target_id === id).length;
    }

    function isLiked(type, id) {
        if (!currentUser) return false;
        return likes.some(l => l.user_id === currentUser.id && l.target_type === type && l.target_id === id);
    }

    // ============================================================
    // Действия
    // ============================================================
    async function createTopic(title, content, category) {
        if (!currentUser) { showToast('Войдите, чтобы создать тему', 'warning'); return; }
        if (!title || title.length < 3) { showToast('Заголовок: минимум 3 символа', 'warning'); return; }
        if (!content || content.length < 10) { showToast('Текст: минимум 10 символов', 'warning'); return; }

        const { error } = await client.from('forum_topics').insert([{
            title: title.trim(),
            content: content.trim(),
            category: category,
            author_id: currentUser.id
        }]);

        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast('✅ Тема создана!', 'success');
        await loadData();
        render();
    }

    async function toggleLike(type, id) {
        if (!currentUser) { showToast('Войдите, чтобы лайкать', 'warning'); return; }
        const liked = isLiked(type, id);
        if (liked) {
            await client.from('forum_likes').delete()
                .eq('user_id', currentUser.id).eq('target_type', type).eq('target_id', id);
        } else {
            await client.from('forum_likes').insert([{
                user_id: currentUser.id, target_type: type, target_id: id
            }]);
        }
        await loadData();
        if (currentView === 'topic') renderTopicView();
        else render();
    }

    async function addReply(topicId, content) {
        if (!currentUser) { showToast('Войдите, чтобы отвечать', 'warning'); return; }
        if (!content || content.length < 2) { showToast('Ответ слишком короткий', 'warning'); return; }

        const { error } = await client.from('forum_posts').insert([{
            topic_id: topicId,
            content: content.trim(),
            author_id: currentUser.id
        }]);

        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast('✅ Ответ добавлен!', 'success');
        await loadData();
        renderTopicView();
    }

    async function deleteTopic(topicId) {
        if (!confirm('Удалить тему со всеми ответами?')) return;
        await client.from('forum_topics').delete().eq('id', topicId);
        showToast('Тема удалена', 'info');
        currentView = 'list';
        await loadData();
        render();
    }

    async function openTopic(id) {
        const { data } = await client.from('forum_posts')
            .select('*').eq('topic_id', id).order('created_at', { ascending: true });
        posts[id] = data || [];

        // Профили авторов ответов
        const authorIds = new Set((data || []).map(p => p.author_id));
        if (authorIds.size > 0) {
            const { data: profs } = await client.from('profiles')
                .select('user_id, username, display_name, avatar_url, role')
                .in('user_id', [...authorIds]);
            (profs || []).forEach(p => { profilesMap[p.user_id] = p; });
        }

        // Увеличиваем счётчик просмотров
        await client.from('forum_topics').update({ views: (topics.find(t => t.id === id)?.views || 0) + 1 }).eq('id', id);

        activeTopic = topics.find(t => t.id === id);
        currentView = 'topic';
        renderTopicView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ============================================================
    // Рендер списка
    // ============================================================
    function render() {
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        const totalTopics = topics.length;
        const totalPosts = Object.values(counts).reduce((s, c) => s + c, 0);
        const totalLikes = likes.length;
        const authors = new Set(topics.map(t => t.author_id)).size;

        let filtered = [...topics];
        if (activeFilter !== 'all') filtered = filtered.filter(t => t.category === activeFilter);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(t =>
                (t.title || '').toLowerCase().includes(q) ||
                (t.content || '').toLowerCase().includes(q)
            );
        }

        container.innerHTML = `
            <div class="frm-hero frm-fade">
                <div class="frm-hero-content">
                    <div class="frm-hero-icon">💬</div>
                    <h1 class="frm-hero-title">Форум</h1>
                    <p class="frm-hero-sub">${currentUser ? 'Обсуждай, спрашивай, делись идеями' : 'Войдите, чтобы участвовать в обсуждениях'}</p>
                    <div class="frm-hero-actions">
                        ${currentUser ? `<button class="frm-hero-btn primary" onclick="frmCreate()">➕ Новая тема</button>` : ''}
                        ${!currentUser ? `<a href="/login/" class="frm-hero-btn primary" style="text-decoration:none;">🔐 Войти</a>` : ''}
                    </div>
                </div>
            </div>

            <div class="frm-stats-grid frm-fade" style="animation-delay:0.1s;">
                <div class="frm-stat"><div class="frm-stat-icon">📝</div><div class="frm-stat-value">${totalTopics}</div><div class="frm-stat-label">Тем</div></div>
                <div class="frm-stat"><div class="frm-stat-icon">💬</div><div class="frm-stat-value">${totalPosts}</div><div class="frm-stat-label">Ответов</div></div>
                <div class="frm-stat"><div class="frm-stat-icon">❤️</div><div class="frm-stat-value">${totalLikes}</div><div class="frm-stat-label">Лайков</div></div>
                <div class="frm-stat"><div class="frm-stat-icon">👥</div><div class="frm-stat-value">${authors}</div><div class="frm-stat-label">Авторов</div></div>
            </div>

            <div class="frm-filters frm-fade" style="animation-delay:0.15s;">
                <button class="frm-filter-btn ${activeFilter==='all'?'active':''}" onclick="frmSetFilter('all')">🌐 Все</button>
                ${Object.entries(CATEGORIES).map(([k, c]) => `
                    <button class="frm-filter-btn ${activeFilter===k?'active':''}" onclick="frmSetFilter('${k}')">${c.icon} ${c.name}</button>
                `).join('')}
                <input class="frm-search" type="text" placeholder="🔍 Поиск..." value="${searchQuery}" oninput="frmSearch(this.value)">
            </div>

            ${filtered.length === 0 ? `
                <div class="frm-empty">
                    <div class="frm-empty-icon">💬</div>
                    <div class="frm-empty-title">${searchQuery ? 'Ничего не найдено' : 'Пока нет тем'}</div>
                    ${currentUser && !searchQuery ? `<button class="frm-btn primary" style="max-width:200px;margin:0 auto;" onclick="frmCreate()">➕ Создать первую</button>` : ''}
                </div>
            ` : filtered.map((t, i) => renderTopic(t, i)).join('')}
        `;
    }

    function renderTopic(t, index) {
        const author = profilesMap[t.author_id] || {};
        const name = author.display_name || author.username || 'Аноним';
        const avatar = author.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=64`;
        const cat = CATEGORIES[t.category] || CATEGORIES.general;
        const replies = counts[t.id] || 0;
        const topicLikes = getLikeCount('topic', t.id);

        return `
            <div class="frm-topic ${t.is_pinned ? 'pinned' : ''} frm-fade" style="animation-delay:${index * 0.03}s;" onclick="frmOpen(${t.id})">
                <img class="frm-topic-avatar" src="${avatar}" alt="">
                <div class="frm-topic-body">
                    <div class="frm-topic-header">
                        <h3 class="frm-topic-title">${escapeHtml(t.title)}</h3>
                        <span class="frm-topic-badge category">${cat.icon} ${cat.name}</span>
                        ${t.is_pinned ? '<span class="frm-topic-badge pinned">📌 Закреплено</span>' : ''}
                    </div>
                    <p class="frm-topic-preview">${escapeHtml(t.content)}</p>
                    <div class="frm-topic-meta">
                        <span>👤 ${escapeHtml(name)}</span>
                        <span>🕐 ${formatTime(t.created_at)}</span>
                        <span>💬 ${replies} ответов</span>
                        <span>❤️ ${topicLikes}</span>
                        <span>👁️ ${t.views || 0}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // Рендер темы
    // ============================================================
    function renderTopicView() {
        const t = activeTopic;
        if (!t) return;

        const author = profilesMap[t.author_id] || {};
        const name = author.display_name || author.username || 'Аноним';
        const avatar = author.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=64`;
        const cat = CATEGORIES[t.category] || CATEGORIES.general;
        const topicPosts = posts[t.id] || [];
        const isAuthor = currentUser && currentUser.id === t.author_id;
        const topicLikes = getLikeCount('topic', t.id);
        const topicLiked = isLiked('topic', t.id);

        container.innerHTML = `
            <button class="frm-filter-btn" style="margin-bottom:16px;" onclick="frmBack()">← К списку тем</button>

            <div class="frm-topic frm-fade" style="cursor:default;" onclick="event.stopPropagation()">
                <img class="frm-topic-avatar" src="${avatar}" alt="">
                <div class="frm-topic-body">
                    <div class="frm-topic-header">
                        <h1 class="frm-topic-view-title">${escapeHtml(t.title)}</h1>
                    </div>
                    <div class="frm-topic-meta" style="margin-bottom:12px;">
                        <span>👤 ${escapeHtml(name)}</span>
                        <span>🕐 ${formatTime(t.created_at)}</span>
                        <span class="frm-topic-badge category">${cat.icon} ${cat.name}</span>
                    </div>
                </div>
            </div>

            <div class="frm-topic-content">${escapeHtml(t.content)}</div>

            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px;">
                <button class="frm-like-btn ${topicLiked ? 'liked' : ''}" onclick="frmLike('topic', ${t.id})">
                    <span class="frm-like-icon">${topicLiked ? '❤️' : '🤍'}</span> ${topicLikes}
                </button>
                ${isAuthor ? `
                    <button class="frm-btn secondary" style="flex:0;padding:8px 18px;font-size:0.82rem;" onclick="frmDelete(${t.id})">🗑️ Удалить тему</button>
                ` : ''}
            </div>

            <h3 style="font-size:1.15rem;font-weight:800;color:#1a1a1a;margin:0 0 16px 0;">💬 Ответы (${topicPosts.length})</h3>

            ${topicPosts.length === 0 ? `
                <p style="color:#888;text-align:center;padding:20px;">Пока нет ответов. Будь первым!</p>
            ` : topicPosts.map(p => {
                const pAuthor = profilesMap[p.author_id] || {};
                const pName = pAuthor.display_name || pAuthor.username || 'Аноним';
                const pAvatar = pAuthor.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(pName)}&background=6C63FF&color=fff&size=64`;
                const pLikes = getLikeCount('post', p.id);
                const pLiked = isLiked('post', p.id);
                const isMe = currentUser && currentUser.id === p.author_id;
                return `
                    <div class="frm-post">
                        <img class="frm-post-avatar" src="${pAvatar}" alt="">
                        <div class="frm-post-body">
                            <div class="frm-post-header">
                                <span class="frm-post-author">${escapeHtml(pName)}</span>
                                <span class="frm-post-date">${formatTime(p.created_at)}</span>
                                ${isMe ? `<span style="color:#999;font-size:0.72rem;">(вы)</span>` : ''}
                            </div>
                            <div class="frm-post-content">${escapeHtml(p.content)}</div>
                            <button class="frm-like-btn ${pLiked ? 'liked' : ''}" onclick="frmLike('post', ${p.id})">
                                <span class="frm-like-icon">${pLiked ? '❤️' : '🤍'}</span> ${pLikes}
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}

            ${currentUser ? `
                <div class="frm-reply-box">
                    <h3 style="font-size:1rem;font-weight:700;color:#333;margin:0 0 10px 0;">✍️ Ваш ответ</h3>
                    <textarea class="frm-reply-input" id="frm-reply-input" placeholder="Напишите ответ..."></textarea>
                    <button class="frm-btn primary" style="margin-top:12px;max-width:200px;" onclick="frmReply(${t.id})">📤 Отправить</button>
                </div>
            ` : `
                <div class="frm-reply-box" style="text-align:center;">
                    <a href="/login/" class="frm-btn primary" style="display:inline-block;max-width:220px;text-decoration:none;">🔐 Войти, чтобы ответить</a>
                </div>
            `}
        `;
    }

    // ============================================================
    // Модалка создания
    // ============================================================
    function openCreateModal() {
        if (!currentUser) { showToast('Войдите, чтобы создать тему', 'warning'); return; }

        const overlay = document.createElement('div');
        overlay.className = 'frm-modal-overlay';
        overlay.innerHTML = `
            <div class="frm-modal">
                <button class="frm-modal-close" onclick="this.closest('.frm-modal-overlay').remove()">✕</button>
                <h2 class="frm-modal-title">➕ Новая тема</h2>

                <div class="frm-field">
                    <label>Заголовок</label>
                    <input type="text" id="frm-topic-title" placeholder="О чём хотите поговорить?" maxlength="150">
                </div>

                <div class="frm-field">
                    <label>Категория</label>
                    <div class="frm-category-picker" id="frm-cat-picker">
                        ${Object.entries(CATEGORIES).map(([k, c], i) => `
                            <button type="button" class="frm-cat-btn ${i===0?'selected':''}" data-cat="${k}">${c.icon} ${c.name}</button>
                        `).join('')}
                    </div>
                </div>

                <div class="frm-field">
                    <label>Текст</label>
                    <textarea id="frm-topic-content" placeholder="Расскажите подробнее..." maxlength="5000"></textarea>
                </div>

                <div class="frm-modal-actions">
                    <button class="frm-btn secondary" onclick="this.closest('.frm-modal-overlay').remove()">Отмена</button>
                    <button class="frm-btn primary" id="frm-submit-topic">📤 Опубликовать</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelectorAll('.frm-cat-btn').forEach(btn => {
            btn.onclick = () => {
                overlay.querySelectorAll('.frm-cat-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            };
        });

        overlay.querySelector('#frm-submit-topic').onclick = async () => {
            const title = overlay.querySelector('#frm-topic-title').value;
            const content = overlay.querySelector('#frm-topic-content').value;
            const cat = overlay.querySelector('.frm-cat-btn.selected')?.dataset.cat || 'general';
            await createTopic(title, content, cat);
            overlay.remove();
        };
    }

    // ============================================================
    // Экспорт
    // ============================================================
    window.frmCreate = openCreateModal;
    window.frmOpen = openTopic;
    window.frmBack = function() { currentView = 'list'; activeTopic = null; render(); };
    window.frmDelete = deleteTopic;
    window.frmLike = toggleLike;
    window.frmReply = function(id) {
        const input = document.getElementById('frm-reply-input');
        if (input) addReply(id, input.value);
    };
    window.frmSetFilter = function(f) { activeFilter = f; render(); };

    let searchTimer;
    window.frmSearch = function(v) {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => { searchQuery = v; render(); }, 200);
    };

    // ============================================================
    // Инициализация
    // ============================================================
    async function init() {
        await loadData();
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
