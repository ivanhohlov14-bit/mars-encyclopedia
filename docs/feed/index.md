---
title: Лента активности
comments: false
---

<div id="feed-app" style="max-width: 900px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: fdSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка ленты...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes fdSpin { to { transform: rotate(360deg); } }
@keyframes fdFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fdPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes fdFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes fdSlideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes fdDot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.7); }
    50% { box-shadow: 0 0 0 8px rgba(39, 174, 96, 0); }
}

.fd-fade { animation: fdFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.fd-slide { animation: fdSlideIn 0.4s ease both; }

#feed-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   HERO
   ============================================================ */
.fd-hero {
    position: relative;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    border-radius: 24px;
    padding: 36px 32px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px -16px var(--kingdom-shadow);
}

.fd-hero::before {
    content: '';
    position: absolute;
    top: -60%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
    border-radius: 50%;
    animation: fdFloat 8s ease-in-out infinite;
}

.fd-hero::after {
    content: '';
    position: absolute;
    bottom: -60%; left: -10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);
    border-radius: 50%;
    animation: fdFloat 10s ease-in-out infinite reverse;
}

.fd-hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
}

.fd-hero-icon {
    font-size: 4rem;
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.3));
    animation: fdPulse 3s ease-in-out infinite;
}

.fd-hero-info { flex: 1; min-width: 200px; }
.fd-hero-title {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 4px 0;
    letter-spacing: -0.5px;
}

.fd-hero-sub {
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0 0 12px 0;
}

.fd-live-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 30px;
    background: rgba(255,255,255,0.25);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.3);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
}

.fd-live-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #27ae60;
    animation: fdDot 2s infinite;
}

/* ============================================================
   ФИЛЬТРЫ
   ============================================================ */
.fd-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 24px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}

.fd-filter-btn {
    padding: 8px 18px;
    border-radius: 30px;
    border: 2px solid transparent;
    background: rgba(0,0,0,0.03);
    color: #666;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.fd-filter-btn:hover {
    background: rgba(0,0,0,0.06);
    color: #333;
}

.fd-filter-btn.active {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
}

.fd-refresh-btn {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 30px;
    border: 2px solid var(--kingdom-color);
    background: transparent;
    color: var(--kingdom-color);
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
}

.fd-refresh-btn:hover {
    background: var(--kingdom-color);
    color: #fff;
    transform: translateY(-2px);
}

.fd-refresh-btn.spinning svg,
.fd-refresh-btn.spinning .fd-refresh-icon {
    animation: fdSpin 1s linear infinite;
}

/* ============================================================
   ЛЕНТА
   ============================================================ */
.fd-timeline {
    position: relative;
    padding-left: 40px;
    margin-bottom: 40px;
}

.fd-timeline::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--kingdom-color), transparent);
    opacity: 0.2;
}

.fd-item {
    position: relative;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 2px solid rgba(0,0,0,0.05);
    padding: 18px 22px;
    margin-bottom: 14px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    animation: fdSlideIn 0.5s ease both;
}

.fd-item:hover {
    transform: translateX(6px);
    border-color: var(--kingdom-color);
    box-shadow: 0 12px 32px -8px var(--kingdom-shadow);
}

.fd-item-dot {
    position: absolute;
    left: -33px;
    top: 24px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
    border: 3px solid rgba(255,255,255,0.9);
    z-index: 2;
    transition: transform 0.3s;
}

.fd-item:hover .fd-item-dot {
    transform: scale(1.15) rotate(-8deg);
}

.fd-item-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

.fd-item-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--kingdom-color);
    flex-shrink: 0;
}

.fd-item-actor {
    font-weight: 700;
    color: #1a1a1a;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
}

.fd-item-actor a {
    color: var(--kingdom-color);
    font-weight: 700;
}

.fd-item-actor a:hover {
    text-decoration: underline !important;
}

.fd-role-badge {
    font-size: 0.65rem;
    padding: 2px 8px;
    border-radius: 10px;
    background: linear-gradient(135deg, #f39c12, #e67e22);
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
}

.fd-item-time {
    margin-left: auto;
    font-size: 0.75rem;
    color: #999;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 4px;
}

.fd-item-body {
    font-size: 0.92rem;
    color: #444;
    line-height: 1.6;
    padding-left: 48px;
    word-wrap: break-word;
}

.fd-item-body a {
    color: var(--kingdom-color);
    font-weight: 600;
}

.fd-item-body a:hover {
    text-decoration: underline !important;
}

.fd-item-detail {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    background: rgba(108, 99, 255, 0.1);
    color: var(--kingdom-color);
    margin-top: 6px;
}

.fd-item-detail.green {
    background: rgba(39, 174, 96, 0.12);
    color: #27ae60;
}

.fd-item-detail.orange {
    background: rgba(243, 156, 18, 0.12);
    color: #e67e22;
}

.fd-item-detail.red {
    background: rgba(231, 76, 60, 0.12);
    color: #c0392b;
}

.fd-item-comment-text {
    background: rgba(0,0,0,0.03);
    border-left: 3px solid var(--kingdom-color);
    padding: 10px 14px;
    border-radius: 8px;
    font-style: italic;
    color: #555;
    font-size: 0.88rem;
    margin-top: 8px;
    line-height: 1.5;
}

/* ============================================================
   ПУСТОЕ СОСТОЯНИЕ
   ============================================================ */
.fd-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9));
    border-radius: 16px;
    border: 2px dashed rgba(108,99,255,0.2);
}

.fd-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.fd-empty-title { font-size: 1.1rem; font-weight: 700; color: #666; margin-bottom: 4px; }
.fd-empty-text { font-size: 0.88rem; color: #999; }

/* Кнопка "Загрузить ещё" */
.fd-load-more {
    display: block;
    margin: 24px auto;
    padding: 14px 32px;
    border-radius: 30px;
    border: 2px solid var(--kingdom-color);
    background: transparent;
    color: var(--kingdom-color);
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
}

.fd-load-more:hover {
    background: var(--kingdom-color);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -8px var(--kingdom-shadow);
}

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .fd-item, .fd-filters { background: rgba(30, 30, 46, 0.9); }
    .fd-item-actor { color: #e0e0e0; }
    .fd-item-body { color: #c0c0d0; }
    .fd-item-comment-text { background: rgba(255,255,255,0.04); color: #aaa; }
    .fd-filter-btn { background: rgba(255,255,255,0.05); color: #aaa; }
    .fd-filter-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .fd-empty { background: rgba(30,30,46,0.5); }
    .fd-empty-title { color: #aaa; }
}

@media (max-width: 600px) {
    .fd-hero { padding: 24px 20px; }
    .fd-hero-title { font-size: 1.4rem; }
    .fd-hero-icon { font-size: 3rem; }
    .fd-timeline { padding-left: 0; }
    .fd-timeline::before { display: none; }
    .fd-item { padding: 16px 18px; }
    .fd-item-dot {
        position: static;
        display: inline-flex;
        margin-right: 8px;
        margin-bottom: 8px;
        width: 32px;
        height: 32px;
        font-size: 0.95rem;
    }
    .fd-item-body { padding-left: 0; }
    .fd-item-time { margin-left: 0; }
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

    const EVENT_META = {
        comment:     { icon: '💬', label: 'Оставил комментарий', color: '#6C63FF' },
        achievement: { icon: '🏆', label: 'Получил достижение', color: '#f39c12' },
        quiz:        { icon: '🧠', label: 'Прошёл викторину', color: '#8e44ad' },
        register:    { icon: '🎉', label: 'Присоединился к проекту', color: '#27ae60' },
        visit:       { icon: '📍', label: 'Изучил статью', color: '#3498db' },
        moderation:  { icon: '🛡️', label: 'Действие модератора', color: '#e67e22' }
    };

    const PLACE_NAMES = {
        'sea': '🌊 Морская статья',
        'city': '🏙️ Город',
        'temple': '🏛️ Храм',
        'cave': '🏔️ Пещера',
        'character': '👤 Персонаж',
        'history': '📜 История',
        'myth': '✨ Миф',
        'geography': '🗺️ География',
        'religion': '🕯️ Религия',
        'astronomy': '🔭 Астрономия',
        'writing': '✍️ Письменность',
        'book': '📖 Книга',
        'tech': '⚙️ Технология',
        'culture': '🎭 Культура',
        'other': '📦 Статья'
    };

    const container = document.getElementById('feed-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let allEvents = [];
    let profilesMap = {};
    let activeFilter = 'all';
    let visibleCount = 30;

    // ============================================================
    // Утилиты
    // ============================================================
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }

    function formatTimeAgo(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'только что';
        if (diff < 3600) return `${Math.floor(diff/60)} мин назад`;
        if (diff < 86400) return `${Math.floor(diff/3600)} ч назад`;
        if (diff < 604800) return `${Math.floor(diff/86400)} дн назад`;

        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function slugToTitle(slug) {
        if (!slug) return 'статью';
        return slug
            .split('/').pop()
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }

    // ============================================================
    // Загрузка
    // ============================================================
    async function loadFeed() {
        // Получаем события
        const { data: events, error } = await client
            .from('activity_feed')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(200);

        if (error) {
            console.warn('Ошибка загрузки feed:', error);
            return [];
        }

        allEvents = events || [];

        // Загружаем профили всех акторов
        const actorIds = [...new Set(allEvents.map(e => e.actor_id).filter(Boolean))];
        if (actorIds.length > 0) {
            const { data: profiles } = await client
                .from('profiles')
                .select('user_id, username, display_name, avatar_url, role, kingdom')
                .in('user_id', actorIds);
            profilesMap = {};
            (profiles || []).forEach(p => { profilesMap[p.user_id] = p; });
        }

        return allEvents;
    }

    // ============================================================
    // Рендер одного события
    // ============================================================
    function renderEvent(event, index) {
        const actor = profilesMap[event.actor_id] || {};
        const name = actor.display_name || actor.username || 'Аноним';
        const avatar = actor.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=64`;
        const meta = EVENT_META[event.event_type] || EVENT_META.visit;
        const isModerator = actor.role === 'moderator';
        const timeAgo = formatTimeAgo(event.created_at);

        let bodyHTML = '';

        switch (event.event_type) {
            case 'comment': {
                const articleTitle = slugToTitle(event.target_slug);
                bodyHTML = `
                    <a href="/${event.target_slug}/">${escapeHtml(articleTitle)}</a>
                    <div class="fd-item-comment-text">${escapeHtml((event.details || '').substring(0, 200))}${(event.details || '').length > 200 ? '…' : ''}</div>
                `;
                break;
            }
            case 'achievement': {
                bodyHTML = `
                    <div class="fd-item-detail orange">${escapeHtml(event.details || '🏅')} ${escapeHtml(event.target_name || 'Достижение')}</div>
                `;
                break;
            }
            case 'quiz': {
                const quizTitle = slugToTitle(event.target_slug);
                bodyHTML = `
                    Викторина: <a href="/interactive/">${escapeHtml(quizTitle)}</a>
                    <div class="fd-item-detail green">${escapeHtml(event.details || 'Пройдено')}</div>
                `;
                break;
            }
            case 'register': {
                bodyHTML = `
                    <div class="fd-item-detail green">🎉 Добро пожаловать на Марс!</div>
                `;
                break;
            }
            case 'visit': {
                const articleTitle = slugToTitle(event.target_slug);
                const placeLabel = PLACE_NAMES[event.details] || '📄 Статья';
                bodyHTML = `
                    <a href="/${event.target_slug}/">${escapeHtml(articleTitle)}</a>
                    <div class="fd-item-detail">${placeLabel}</div>
                `;
                break;
            }
            case 'moderation': {
                const actionNames = {
                    'hide_comment': '🚫 Скрыл комментарий',
                    'show_comment': '👁️ Показал комментарий',
                    'delete_comment': '🗑️ Удалил комментарий',
                    'ban_user': '⛔ Забанил пользователя',
                    'unban_user': '✅ Разбанил пользователя',
                    'make_moderator': '⭐ Назначил модератора',
                    'remove_moderator': '📉 Снял модератора',
                    'edit_article': '✏️ Отредактировал статью'
                };
                const actionText = actionNames[event.details] || event.details;
                bodyHTML = `
                    <div class="fd-item-detail red">${escapeHtml(actionText)}</div>
                    ${event.target_name ? `<span style="font-size:0.85rem;color:#888;"> → ${escapeHtml(event.target_name)}</span>` : ''}
                `;
                break;
            }
        }

        return `
            <div class="fd-item fd-slide" style="animation-delay: ${Math.min(index * 0.03, 0.5)}s;">
                <div class="fd-item-dot">${meta.icon}</div>
                <div class="fd-item-header">
                    <img class="fd-item-avatar" src="${avatar}" alt="">
                    <div class="fd-item-actor">
                        <a href="/profile-view/?user_id=${event.actor_id}">${escapeHtml(name)}</a>
                        ${isModerator ? '<span class="fd-role-badge">🛡️ Модератор</span>' : ''}
                        <span style="color:#888;font-weight:400;font-size:0.85rem;">·</span>
                        <span style="color:#666;font-weight:500;font-size:0.85rem;">${meta.label}</span>
                    </div>
                    <span class="fd-item-time">⏱️ ${timeAgo}</span>
                </div>
                <div class="fd-item-body">${bodyHTML}</div>
            </div>
        `;
    }

    // ============================================================
    // Рендер всей страницы
    // ============================================================
    function render() {
        // Применяем тему королевства
        const myKingdom = currentUser ? (profilesMap[currentUser.id]?.kingdom) : null;
        const kingdom = KINGDOMS[myKingdom] || KINGDOMS['Эдем'];
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        // Фильтруем
        let filtered = [...allEvents];
        if (activeFilter !== 'all') {
            filtered = filtered.filter(e => e.event_type === activeFilter);
        }

        const visible = filtered.slice(0, visibleCount);
        const hasMore = filtered.length > visibleCount;

        // Считаем типы
        const counts = { all: allEvents.length };
        Object.keys(EVENT_META).forEach(k => {
            counts[k] = allEvents.filter(e => e.event_type === k).length;
        });

        container.innerHTML = `
            <!-- HERO -->
            <div class="fd-hero fd-fade">
                <div class="fd-hero-content">
                    <div class="fd-hero-icon">📰</div>
                    <div class="fd-hero-info">
                        <h1 class="fd-hero-title">Лента активности</h1>
                        <p class="fd-hero-sub">Что происходит на Марсе прямо сейчас</p>
                        <div class="fd-live-badge">
                            <span class="fd-live-dot"></span>
                            <span>LIVE</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ФИЛЬТРЫ -->
            <div class="fd-filters fd-fade" style="animation-delay: 0.1s;">
                <button class="fd-filter-btn ${activeFilter==='all'?'active':''}" onclick="fdSetFilter('all')">
                    🌐 Все <span style="opacity:0.7;font-size:0.75rem;">(${counts.all})</span>
                </button>
                ${Object.entries(EVENT_META).map(([key, meta]) => counts[key] > 0 ? `
                    <button class="fd-filter-btn ${activeFilter===key?'active':''}" onclick="fdSetFilter('${key}')">
                        ${meta.icon} ${meta.label.split(' ').slice(-1)[0]} <span style="opacity:0.7;font-size:0.75rem;">(${counts[key]})</span>
                    </button>
                ` : '').join('')}
                <button class="fd-refresh-btn" onclick="fdRefresh(this)">
                    <span class="fd-refresh-icon">🔄</span> Обновить
                </button>
            </div>

            <!-- ЛЕНТА -->
            ${visible.length === 0 ? `
                <div class="fd-empty">
                    <div class="fd-empty-icon">📭</div>
                    <div class="fd-empty-title">Пока нет событий</div>
                    <div class="fd-empty-text">Станьте первым, кто что-то сделает!</div>
                </div>
            ` : `
                <div class="fd-timeline">
                    ${visible.map((e, i) => renderEvent(e, i)).join('')}
                </div>
                ${hasMore ? `
                    <button class="fd-load-more" onclick="fdLoadMore()">
                        ⬇️ Загрузить ещё (${filtered.length - visibleCount} осталось)
                    </button>
                ` : `
                    <p style="text-align:center;color:#999;font-size:0.85rem;margin-top:24px;">
                        — Это все события —
                    </p>
                `}
            `}
        `;
    }

    // ============================================================
    // Экспорт
    // ============================================================
    window.fdSetFilter = function(filter) {
        activeFilter = filter;
        visibleCount = 30;
        render();
    };

    window.fdLoadMore = function() {
        visibleCount += 30;
        render();
    };

    window.fdRefresh = async function(btn) {
        btn.classList.add('spinning');
        await loadFeed();
        render();
        setTimeout(() => btn.classList.remove('spinning'), 300);
    };

    // ============================================================
    // Инициализация
    // ============================================================
    async function init() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        if (currentUser) {
            const { data: myProfile } = await client.from('profiles')
                .select('kingdom').eq('user_id', currentUser.id).single();
            if (myProfile) {
                profilesMap[currentUser.id] = myProfile;
            }
        }

        await loadFeed();
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
