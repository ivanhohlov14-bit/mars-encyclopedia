---
title: Статистика
description: Ключевые метрики проекта
---

<div id="stats-app" style="max-width: 960px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 40px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка статистики...</p>
    </div>
</div>

<style>
:root {
    --accent: #6C63FF;
    --accent-light: #A29BFE;
    --accent-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

.fade-in { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

/* ==== Сброс подчёркивания ==== */
#stats-app a,
#stats-app a:hover,
#stats-app a:focus,
#stats-app a:visited {
    text-decoration: none !important;
    border-bottom: none !important;
    -webkit-tap-highlight-color: transparent;
}

/* ==== Карточки метрик ==== */
.metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 28px;
}

.metric-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    border: 2px solid transparent;
    border-radius: 18px;
    padding: 22px 24px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    overflow: hidden;
}

.metric-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent), var(--accent-light));
    border-radius: 18px 18px 0 0;
}

.metric-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 16px 40px -8px var(--accent-shadow);
}

.metric-icon {
    font-size: 1.8rem;
    margin-bottom: 4px;
}

.metric-value {
    font-size: 2rem;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.1;
    letter-spacing: -0.5px;
}

.metric-label {
    font-size: 0.82rem;
    color: #777;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.metric-delta {
    font-size: 0.78rem;
    font-weight: 700;
    padding: 2px 10px;
    border-radius: 20px;
    display: inline-block;
    width: fit-content;
    margin-top: 4px;
}

.metric-delta.up { background: #e8f5e9; color: #27ae60; }
.metric-delta.down { background: #fdecea; color: #e74c3c; }
.metric-delta.neutral { background: #f0f0f0; color: #888; }

/* ==== Блоки ==== */
.block {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 24px;
    border: 2px solid var(--accent);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s;
}

.block:hover {
    box-shadow: 0 12px 32px -8px var(--accent-shadow);
}

.block h3 {
    margin: 0 0 16px 0;
    font-size: 1.15rem;
    color: #1a1a1a;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 10px;
}

.block h3 .block-badge {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    background: var(--accent);
    color: #fff;
    padding: 3px 12px;
    border-radius: 20px;
    margin-left: auto;
}

/* ==== Таблицы ==== */
.stats-table {
    width: 100%;
    border-collapse: collapse;
}

.stats-table th {
    text-align: left;
    padding: 10px 14px;
    font-size: 0.78rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    border-bottom: 2px solid var(--accent);
    font-weight: 700;
}

.stats-table td {
    padding: 12px 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 0.9rem;
    color: #333;
}

.stats-table tr {
    transition: all 0.2s;
}

.stats-table tr:hover {
    background: rgba(108, 99, 255, 0.06);
}

.rank-medal {
    font-size: 1.2rem;
    margin-right: 6px;
}

.rank-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 8px;
    object-fit: cover;
    border: 2px solid var(--accent);
}

/* ==== Графики ==== */
.chart-container {
    position: relative;
    height: 240px;
    margin-top: 8px;
}

.chart-container canvas {
    max-height: 100%;
}

/* ==== Полоски активности ==== */
.bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
}

.bar-label {
    width: 100px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #555;
    text-align: right;
    flex-shrink: 0;
}

.bar-track {
    flex: 1;
    height: 24px;
    background: rgba(108, 99, 255, 0.08);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
}

.bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-light));
    border-radius: 12px;
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    min-width: 4px;
}

.bar-value {
    width: 50px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #333;
    text-align: right;
    flex-shrink: 0;
}

/* ==== Загрузка ==== */
.loading-spinner {
    display: inline-block;
    width: 32px;
    height: 32px;
    border: 3px solid rgba(108, 99, 255, 0.2);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

/* ==== Пустое состояние ==== */
.empty-state {
    text-align: center;
    padding: 32px 20px;
    color: #999;
    font-size: 0.9rem;
}

.empty-state .empty-icon {
    font-size: 2.5rem;
    margin-bottom: 8px;
    display: block;
}

/* ==== Тёмная тема ==== */
@media (prefers-color-scheme: dark) {
    .metric-card, .block { background: rgba(30, 30, 46, 0.85); color: #d4d4e8; }
    .metric-value { color: #e0e0e0; }
    .metric-label { color: #aaa; }
    .block h3 { color: #e0e0e0; }
    .stats-table td { color: #ccc; border-bottom-color: rgba(255,255,255,0.06); }
    .stats-table tr:hover { background: rgba(108, 99, 255, 0.12); }
    .bar-label { color: #aaa; }
    .bar-value { color: #ddd; }
    .bar-track { background: rgba(108, 99, 255, 0.15); }
    .empty-state { color: #888; }
}

/* ==== Мобильная адаптация ==== */
@media (max-width: 600px) {
    .metric-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .metric-card { padding: 16px; }
    .metric-value { font-size: 1.5rem; }
    .metric-icon { font-size: 1.4rem; }
    .block { padding: 18px 16px; }
    .stats-table td, .stats-table th { padding: 8px 10px; font-size: 0.78rem; }
    .rank-avatar { width: 26px; height: 26px; }
    .chart-container { height: 180px; }
    .bar-label { width: 70px; font-size: 0.75rem; }
    .bar-value { width: 40px; font-size: 0.75rem; }
    .block h3 { font-size: 1rem; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script>
(function() {
    'use strict';

    var SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    var SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";
    var app = document.getElementById('stats-app');
    var supabaseClient = null;

    function getClient() {
        if (window.supabaseClient) return window.supabaseClient;
        if (!supabaseClient) {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        }
        return supabaseClient;
    }

    function fmt(n) {
        if (n === null || n === undefined) return '—';
        return n.toLocaleString('ru-RU');
    }

    function timeAgo(dateStr) {
        if (!dateStr) return '';
        var diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
        if (diff < 60) return 'только что';
        if (diff < 3600) return Math.floor(diff / 60) + ' мин назад';
        if (diff < 86400) return Math.floor(diff / 3600) + ' ч назад';
        if (diff < 2592000) return Math.floor(diff / 86400) + ' дн назад';
        return new Date(dateStr).toLocaleDateString('ru-RU');
    }

    // ============================================================
    // ЗАГРУЗКА ДАННЫХ
    // ============================================================
    async function loadStats() {
        var client = getClient();
        var stats = {
            totalArticles: 0,
            totalUsers: 0,
            totalComments: 0,
            totalViews: 0,
            activeToday: 0,
            newThisWeek: 0,
            topContributors: [],
            recentActivity: [],
            commentsByDay: [],
            viewsByPage: []
        };

        try {
            // --- Общее количество статей ---
            // Предполагаем, что статьи хранятся в таблице 'pages' или 'articles'
            // Если такой таблицы нет — покажем количество страниц из навигации
            try {
                var articlesRes = await client.from('pages').select('*', { count: 'exact', head: true });
                if (articlesRes.count !== null && articlesRes.count !== undefined) {
                    stats.totalArticles = articlesRes.count;
                }
            } catch(e) {
                // Если таблицы нет — считаем по известным разделам
                stats.totalArticles = 0;
            }

            // --- Пользователи ---
            var usersRes = await client.from('profiles').select('*', { count: 'exact', head: true });
            stats.totalUsers = usersRes.count || 0;

            // --- Комментарии ---
            var commentsRes = await client.from('comments').select('*', { count: 'exact', head: true });
            stats.totalComments = commentsRes.count || 0;

            // --- Просмотры (если есть таблица page_views) ---
            try {
                var viewsRes = await client.from('page_views').select('views');
                if (viewsRes.data) {
                    stats.totalViews = viewsRes.data.reduce(function(sum, row) {
                        return sum + (row.views || 0);
                    }, 0);
                }
            } catch(e) {}

            // --- Активные сегодня (по комментариям за 24 часа) ---
            var yesterday = new Date(Date.now() - 86400000).toISOString();
            var activeRes = await client.from('comments')
                .select('user_id', { count: 'exact', head: true })
                .gte('created_at', yesterday);
            stats.activeToday = activeRes.count || 0;

            // --- Новые за неделю ---
            var weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
            var newRes = await client.from('profiles')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', weekAgo);
            stats.newThisWeek = newRes.count || 0;

            // --- Топ-10 авторов (по количеству комментариев) ---
            var topRes = await client.from('comments')
                .select('user_id, profiles!inner(username, display_name, avatar_url, experience, level)')
                .limit(500);

            if (topRes.data) {
                var counts = {};
                topRes.data.forEach(function(c) {
                    var uid = c.user_id;
                    if (!counts[uid]) {
                        counts[uid] = {
                            user_id: uid,
                            count: 0,
                            name: c.profiles ? (c.profiles.display_name || c.profiles.username) : 'Аноним',
                            avatar: c.profiles ? c.profiles.avatar_url : null,
                            experience: c.profiles ? c.profiles.experience : 0,
                            level: c.profiles ? c.profiles.level : 1
                        };
                    }
                    counts[uid].count++;
                });
                stats.topContributors = Object.values(counts)
                    .sort(function(a, b) { return b.count - a.count; })
                    .slice(0, 10);
            }

            // --- Последние 10 комментариев ---
            var recentRes = await client.from('comments')
                .select('id, content, created_at, page, user_id, profiles!inner(username, display_name, avatar_url)')
                .order('created_at', { ascending: false })
                .limit(10);
            stats.recentActivity = recentRes.data || [];

            // --- Комментарии по дням (за 7 дней) ---
            var weekRes = await client.from('comments')
                .select('created_at')
                .gte('created_at', weekAgo)
                .order('created_at', { ascending: true });

            if (weekRes.data) {
                var dayMap = {};
                var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
                for (var i = 6; i >= 0; i--) {
                    var d = new Date(Date.now() - i * 86400000);
                    var key = d.toISOString().slice(0, 10);
                    dayMap[key] = { label: days[d.getDay()], count: 0 };
                }
                weekRes.data.forEach(function(c) {
                    var key = c.created_at.slice(0, 10);
                    if (dayMap[key]) dayMap[key].count++;
                });
                stats.commentsByDay = Object.values(dayMap);
            }

            // --- Просмотры по страницам (топ-8) ---
            try {
                var pageViewsRes = await client.from('page_views')
                    .select('page, views')
                    .order('views', { ascending: false })
                    .limit(8);
                if (pageViewsRes.data) {
                    stats.viewsByPage = pageViewsRes.data;
                }
            } catch(e) {}

        } catch(e) {
            console.warn('Ошибка загрузки статистики:', e);
        }

        return stats;
    }

    // ============================================================
    // РЕНДЕР
    // ============================================================
    function render(stats) {
        var maxBar = Math.max.apply(null, stats.commentsByDay.map(function(d) { return d.count; })) || 1;
        var maxViews = Math.max.apply(null, stats.viewsByPage.map(function(d) { return d.views; })) || 1;

        app.innerHTML = `
            <h1 style="text-align:center; font-size:2rem; letter-spacing:2px; margin:0 0 8px 0;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                background-clip: text; font-weight: 800;">📊 Статистика</h1>
            <p style="text-align:center; color:#888; font-size:0.9rem; margin:0 0 32px 0;">
                Ключевые показатели проекта «Марсианская энциклопедия»
            </p>

            <!-- ===== КАРТОЧКИ МЕТРИК ===== -->
            <div class="metric-grid">
                <div class="metric-card fade-in" style="animation-delay:0s;">
                    <span class="metric-icon">📄</span>
                    <span class="metric-value">${fmt(stats.totalArticles)}</span>
                    <span class="metric-label">Статей</span>
                </div>
                <div class="metric-card fade-in" style="animation-delay:0.06s;">
                    <span class="metric-icon">👥</span>
                    <span class="metric-value">${fmt(stats.totalUsers)}</span>
                    <span class="metric-label">Участников</span>
                </div>
                <div class="metric-card fade-in" style="animation-delay:0.12s;">
                    <span class="metric-icon">💬</span>
                    <span class="metric-value">${fmt(stats.totalComments)}</span>
                    <span class="metric-label">Комментариев</span>
                </div>
                <div class="metric-card fade-in" style="animation-delay:0.18s;">
                    <span class="metric-icon">👁️</span>
                    <span class="metric-value">${fmt(stats.totalViews)}</span>
                    <span class="metric-label">Просмотров</span>
                </div>
            </div>

            <div class="metric-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                <div class="metric-card fade-in" style="animation-delay:0.24s;">
                    <span class="metric-icon">🔥</span>
                    <span class="metric-value">${fmt(stats.activeToday)}</span>
                    <span class="metric-label">Активных сегодня</span>
                    <span class="metric-delta ${stats.activeToday > 0 ? 'up' : 'neutral'}">
                        ${stats.activeToday > 0 ? '▲ есть активность' : '— нет активности'}
                    </span>
                </div>
                <div class="metric-card fade-in" style="animation-delay:0.3s;">
                    <span class="metric-icon">✨</span>
                    <span class="metric-value">${fmt(stats.newThisWeek)}</span>
                    <span class="metric-label">Новых за неделю</span>
                    <span class="metric-delta ${stats.newThisWeek > 0 ? 'up' : 'neutral'}">
                        ${stats.newThisWeek > 0 ? '▲ +' + stats.newThisWeek : '— 0'}
                    </span>
                </div>
            </div>

            <!-- ===== ГРАФИК АКТИВНОСТИ (7 ДНЕЙ) ===== -->
            <div class="block fade-in" style="animation-delay:0.36s;">
                <h3>📈 Активность за 7 дней
                    <span class="block-badge">Комментарии</span>
                </h3>
                ${stats.commentsByDay.length > 0 ? `
                    <div style="display:flex; align-items:flex-end; gap:8px; height:180px; padding:0 4px;">
                        ${stats.commentsByDay.map(function(d) {
                            var h = Math.max((d.count / maxBar) * 100, 4);
                            return `
                                <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; height:100%; justify-content:flex-end;">
                                    <span style="font-size:0.75rem; font-weight:700; color:#6C63FF;">${d.count || ''}</span>
                                    <div style="width:100%; height:${h}%; background:linear-gradient(180deg, #6C63FF, #A29BFE);
                                        border-radius:8px 8px 0 0; min-height:4px; transition:height 0.8s cubic-bezier(0.16,1,0.3,1);"></div>
                                    <span style="font-size:0.72rem; color:#888; font-weight:600;">${d.label}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : '<div class="empty-state"><span class="empty-icon">📭</span>Нет данных за последнюю неделю</div>'}
            </div>

            <!-- ===== ТОП-10 АВТОРОВ ===== -->
            <div class="block fade-in" style="animation-delay:0.42s;">
                <h3>🏆 Топ-10 авторов
                    <span class="block-badge">По комментариям</span>
                </h3>
                ${stats.topContributors.length > 0 ? `
                    <table class="stats-table">
                        <thead>
                            <tr>
                                <th style="width:50px;">#</th>
                                <th>Участник</th>
                                <th style="text-align:right;">Комментариев</th>
                                <th style="text-align:right;">Уровень</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${stats.topContributors.map(function(p, i) {
                                var medals = ['🥇', '🥈', '🥉'];
                                var medal = medals[i] || (i + 1);
                                var avatar = p.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(p.name) + '&background=6C63FF&color=fff&size=64';
                                return `
                                    <tr>
                                        <td><span class="rank-medal">${medal}</span></td>
                                        <td>
                                            <img src="${avatar}" class="rank-avatar" alt="">
                                            <b>${p.name}</b>
                                        </td>
                                        <td style="text-align:right;"><b>${p.count}</b></td>
                                        <td style="text-align:right;">${p.level || 1}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                ` : '<div class="empty-state"><span class="empty-icon">🏜️</span>Пока нет активных авторов</div>'}
            </div>

            <!-- ===== ПОСЛЕДНИЕ ДЕЙСТВИЯ ===== -->
            <div class="block fade-in" style="animation-delay:0.48s;">
                <h3>🕐 Последние действия
                    <span class="block-badge">Обновляется</span>
                </h3>
                ${stats.recentActivity.length > 0 ? `
                    <div style="display:flex; flex-direction:column; gap:2px;">
                        ${stats.recentActivity.map(function(c) {
                            var name = c.profiles ? (c.profiles.display_name || c.profiles.username) : 'Аноним';
                            var avatar = c.profiles && c.profiles.avatar_url ? c.profiles.avatar_url : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=6C63FF&color=fff&size=64';
                            var text = (c.content || '').length > 80 ? (c.content || '').slice(0, 80) + '…' : (c.content || '');
                            return `
                                <div style="display:flex; align-items:flex-start; gap:10px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.04);">
                                    <img src="${avatar}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; flex-shrink:0; margin-top:2px;" alt="">
                                    <div style="flex:1; min-width:0;">
                                        <div style="font-size:0.85rem; font-weight:600; color:#333;">
                                            ${name}
                                            <span style="font-weight:400; color:#888;">· ${timeAgo(c.created_at)}</span>
                                        </div>
                                        <div style="font-size:0.82rem; color:#666; margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                                            ${text}
                                        </div>
                                        <div style="font-size:0.72rem; color:#aaa; margin-top:2px;">
                                            📄 ${c.page || 'страница'}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : '<div class="empty-state"><span class="empty-icon">📭</span>Пока нет действий</div>'}
            </div>

            <!-- ===== ПРОСМОТРЫ ПО СТРАНИЦАМ ===== -->
            ${stats.viewsByPage.length > 0 ? `
                <div class="block fade-in" style="animation-delay:0.54s;">
                    <h3>👁️ Топ страниц
                        <span class="block-badge">По просмотрам</span>
                    </h3>
                    ${stats.viewsByPage.map(function(p) {
                        var w = Math.max((p.views / maxViews) * 100, 4);
                        return `
                            <div class="bar-row">
                                <span class="bar-label">${p.page || '—'}</span>
                                <div class="bar-track">
                                    <div class="bar-fill" style="width:${w}%;"></div>
                                </div>
                                <span class="bar-value">${fmt(p.views)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            ` : ''}

            <!-- ===== НИЖНЯЯ ССЫЛКА ===== -->
            <p style="margin-top:24px; text-align:center;">
                <a href="/" style="color:#6C63FF; font-weight:600;">← На главную</a>
            </p>
        `;
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    (async function init() {
        try {
            var stats = await loadStats();
            render(stats);
        } catch(e) {
            app.innerHTML = `
                <div class="block" style="text-align:center; padding:48px 24px;">
                    <div style="font-size:3rem; margin-bottom:12px;">⚠️</div>
                    <h3 style="color:#e74c3c; justify-content:center;">Не удалось загрузить статистику</h3>
                    <p style="color:#888; font-size:0.9rem;">Проверьте подключение к интернету или обновите страницу позже.</p>
                    <p style="color:#aaa; font-size:0.8rem; margin-top:12px;">${e.message || ''}</p>
                </div>
            `;
        }
    })();
})();
</script>
