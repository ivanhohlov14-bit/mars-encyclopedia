<h1 id="stats-title" style="text-align:center; font-size: 2.2rem; letter-spacing: 2px;">📊 Моя статистика</h1>

<div id="stats-container" style="max-width: 960px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; position: relative; z-index: 1; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка статистики...</p>
    </div>
</div>

<style>
/* ============================================================
   БАЗОВЫЕ СТИЛИ
   ============================================================ */
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes spin { to { transform: rotate(360deg); } }

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 20px var(--kingdom-shadow); }
    50% { box-shadow: 0 0 40px var(--kingdom-shadow); }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}

.fade-in { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
.slide-in { animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

/* ============================================================
   КАРТОЧКИ СТАТИСТИКИ
   ============================================================ */
.stat-card {
    position: relative;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 22px 16px;
    border-radius: 16px;
    text-align: center;
    border: 2px solid var(--kingdom-color);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
}

.stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--kingdom-color), transparent);
    opacity: 0;
    transition: opacity 0.3s;
}

.stat-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 40px -12px var(--kingdom-shadow);
}

.stat-card:hover::before { opacity: 1; }

.stat-card .stat-value {
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -1px;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-card .stat-label {
    font-size: 0.75rem;
    color: #888;
    margin-top: 8px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 600;
}

.stat-card .stat-icon {
    font-size: 1.6rem;
    margin-bottom: 8px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

/* ============================================================
   ИКОНКА "?"
   ============================================================ */
.help-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--kingdom-color);
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: help;
    opacity: 0.55;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 10;
    border: 2px solid rgba(255,255,255,0.4);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.help-icon:hover {
    opacity: 1;
    transform: scale(1.2) rotate(5deg);
}

.tooltip {
    position: absolute;
    top: calc(100% + 10px);
    right: -10px;
    background: #1a1a2e;
    color: #fff;
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 0.8rem;
    line-height: 1.6;
    width: 260px;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px) scale(0.95);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.35);
    text-align: left;
    font-weight: normal;
    border: 1px solid rgba(255,255,255,0.1);
    pointer-events: none;
}

.tooltip::before {
    content: '';
    position: absolute;
    top: -7px;
    right: 16px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #1a1a2e;
}

.tooltip b { color: var(--kingdom-light); }

.help-icon:hover .tooltip,
.help-icon.active .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
}

/* ============================================================
   ТЕПЛОВАЯ КАРТА
   ============================================================ */
.heatmap-wrapper { overflow-x: auto; padding: 8px 0 12px; }
.heatmap-wrapper::-webkit-scrollbar { height: 6px; }
.heatmap-wrapper::-webkit-scrollbar-thumb { background: var(--kingdom-color); border-radius: 3px; }

.heatmap-grid {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(7, 13px);
    gap: 3px;
    min-width: 780px;
}

.heatmap-cell {
    width: 13px;
    height: 13px;
    border-radius: 3px;
    background: #ebedf0;
    transition: all 0.15s ease;
    cursor: pointer;
}

.heatmap-cell:hover {
    transform: scale(1.5);
    outline: 2px solid var(--kingdom-color);
    z-index: 10;
    position: relative;
}

.heatmap-cell[data-level="1"] { background: color-mix(in srgb, var(--kingdom-color) 25%, #ebedf0); }
.heatmap-cell[data-level="2"] { background: color-mix(in srgb, var(--kingdom-color) 50%, #ebedf0); }
.heatmap-cell[data-level="3"] { background: color-mix(in srgb, var(--kingdom-color) 75%, #ebedf0); }
.heatmap-cell[data-level="4"] { background: var(--kingdom-color); }

.heatmap-legend {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-size: 0.72rem;
    color: #999;
    margin-top: 10px;
}
.heatmap-legend .cell { width: 11px; height: 11px; border-radius: 3px; }

/* ============================================================
   ЛЕНТА СОБЫТИЙ
   ============================================================ */
.achievement-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-radius: 10px;
    background: rgba(255,255,255,0.5);
    border-left: 4px solid var(--kingdom-color);
    margin-bottom: 10px;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    animation: slideIn 0.5s ease backwards;
}

.achievement-item:hover {
    background: rgba(255,255,255,0.75);
    transform: translateX(4px);
}

.achievement-item.highlight {
    background: linear-gradient(90deg, var(--kingdom-color) 15, transparent);
    border-left-width: 5px;
}

.achievement-item .ach-icon {
    font-size: 1.5rem;
    filter: drop-shadow(0 2px 3px rgba(0,0,0,0.1));
}

.achievement-item .ach-text {
    flex: 1;
    font-size: 0.9rem;
    color: #2c3e50;
}

.achievement-item .ach-date {
    font-size: 0.72rem;
    color: #999;
    white-space: nowrap;
    background: rgba(0,0,0,0.05);
    padding: 3px 8px;
    border-radius: 10px;
}

/* ============================================================
   ЦЕЛЬ
   ============================================================ */
.goal-link {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    text-decoration: none;
    margin-bottom: 28px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 30px -8px var(--kingdom-shadow);
    position: relative;
    overflow: hidden;
}

.goal-link::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
}

.goal-link:hover::before { left: 100%; }

.goal-link:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 20px 40px -8px var(--kingdom-shadow);
    color: #fff;
}

.goal-link .goal-arrow {
    margin-left: auto;
    font-size: 1.8rem;
    transition: transform 0.3s;
}

.goal-link:hover .goal-arrow { transform: translateX(8px); }

/* ============================================================
   ИНТЕРАКТИВ
   ============================================================ */
.interactive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
}

.interactive-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 22px 16px;
    border-radius: 16px;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border: 2px solid transparent;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.interactive-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 100%;
    background: linear-gradient(135deg, var(--kingdom-color) 8, transparent);
    opacity: 0;
    transition: opacity 0.3s;
}

.interactive-card:hover {
    transform: translateY(-6px);
    border-color: var(--kingdom-color);
    box-shadow: 0 20px 40px -12px var(--kingdom-shadow);
}

.interactive-card:hover::before { opacity: 1; }

.interactive-card > * { position: relative; z-index: 1; }

.interactive-card .ic-icon {
    font-size: 2.8rem;
    margin-bottom: 10px;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.12));
    transition: transform 0.3s;
}

.interactive-card:hover .ic-icon {
    transform: scale(1.15) rotate(-5deg);
}

.interactive-card .ic-title {
    font-size: 1rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 6px;
}

.interactive-card .ic-desc {
    font-size: 0.78rem;
    color: #888;
    line-height: 1.4;
}

/* ============================================================
   БЛОКИ
   ============================================================ */
.block {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    padding: 22px 26px;
    border-radius: 16px;
    margin-bottom: 24px;
    border: 2px solid var(--kingdom-color);
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
    transition: box-shadow 0.3s;
}

.block:hover {
    box-shadow: 0 12px 32px -8px var(--kingdom-shadow);
}

.block h3 {
    margin: 0 0 16px 0;
    font-size: 1.1rem;
    color: var(--kingdom-color);
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
}

.section-title {
    color: var(--kingdom-color);
    margin: 0 0 16px 0;
    font-size: 1.15rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* ============================================================
   ШАПКА ПРОФИЛЯ
   ============================================================ */
.profile-header {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    padding: 32px 28px;
    border-radius: 20px;
    margin-bottom: 24px;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 50px -12px var(--kingdom-shadow);
}

.profile-header::before {
    content: '';
    position: absolute;
    top: -50%; right: -10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
}

.profile-header::after {
    content: '';
    position: absolute;
    bottom: -50%; left: -10%;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite reverse;
}

.profile-header > * { position: relative; z-index: 1; }

.rank-icon-bg {
    position: absolute;
    top: -40px;
    right: -30px;
    font-size: 11rem;
    opacity: 0.12;
    filter: blur(2px);
    pointer-events: none;
}

.rank-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    border-radius: 40px;
    font-size: 1.15rem;
    font-weight: 700;
    background: rgba(255,255,255,0.25);
    backdrop-filter: blur(8px);
    border: 2px solid rgba(255,255,255,0.35);
    margin-top: 4px;
    animation: pulse 3s ease-in-out infinite;
}

.rank-badge .rank-icon { font-size: 1.6rem; }

/* ============================================================
   СТРИК
   ============================================================ */
.streak-banner {
    background: linear-gradient(135deg, #e74c3c, #f39c12);
    padding: 18px 24px;
    border-radius: 16px;
    margin-bottom: 24px;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 12px 32px -8px rgba(231, 76, 60, 0.4);
    animation: glow 3s ease-in-out infinite;
}

/* ============================================================
   ТЁМНАЯ ТЕМА
   ============================================================ */
@media (prefers-color-scheme: dark) {
    .stat-card, .block, .interactive-card {
        background: rgba(30, 30, 46, 0.85);
        color: #d4d4e8;
    }
    .stat-card .stat-label { color: #888; }
    .achievement-item {
        background: rgba(30, 30, 46, 0.6);
        color: #d4d4e8;
    }
    .achievement-item .ach-text { color: #d4d4e8; }
    .achievement-item:hover { background: rgba(30, 30, 46, 0.85); }
    .interactive-card .ic-title { color: #e0e0e0; }
    .heatmap-cell { background: #2a2a3a; }
    .block h3, .section-title { color: var(--kingdom-light); }
}

/* ============================================================
   АДАПТИВНОСТЬ
   ============================================================ */
@media (max-width: 600px) {
    .profile-header { padding: 24px 18px; }
    .rank-icon-bg { font-size: 7rem; top: -20px; right: -15px; }
    .stat-card .stat-value { font-size: 1.7rem; }
    .block { padding: 18px 16px; }
    .interactive-grid { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
    .interactive-card { padding: 16px 12px; }
    .interactive-card .ic-icon { font-size: 2rem; }
    #stats-title { font-size: 1.6rem !important; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

// ============================================================
// КОРОЛЕВСТВА
// ============================================================
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

// ============================================================
// УРОВНИ
// ============================================================
const levelMap = [
    { level: 1, xp: 0,    title: '🌱 Новый поселенец', gradient: ['#95a5a6', '#7f8c8d'], icon: '🌱' },
    { level: 2, xp: 50,   title: '🔭 Исследователь',    gradient: ['#3498db', '#2980b9'], icon: '🔭' },
    { level: 3, xp: 150,  title: '🚀 Первопроходец',    gradient: ['#27ae60', '#229954'], icon: '🚀' },
    { level: 4, xp: 350,  title: '🏠 Колонизатор',      gradient: ['#16a085', '#138d75'], icon: '🏠' },
    { level: 5, xp: 700,  title: '⚡ Командир базы',    gradient: ['#f39c12', '#d68910'], icon: '⚡' },
    { level: 6, xp: 1200, title: '👑 Легенда Марса',    gradient: ['#e74c3c', '#c0392b'], icon: '👑' }
];

function getRankByXp(xp) {
    let rank = levelMap[0];
    for (const r of levelMap) if (xp >= r.xp) rank = r;
    return rank;
}

// ============================================================
// ЛОКАЛЬНЫЕ НАЗВАНИЯ ДОСТИЖЕНИЙ
// ============================================================
const ACHIEVEMENT_NAMES = {
    1: 'Первые шаги', 2: 'Читатель', 3: 'Знаток',
    4: 'Колонизатор', 5: 'Командир базы', 6: 'Марсианин',
    7: 'Мореплаватель', 8: 'Эрудит', 9: 'Постоянный',
    10: 'Хранитель знаний', 11: 'Первопроходец', 12: 'Хранитель свитков',
    13: 'Богач', 14: 'Снайпер', 15: 'Легенда Марса'
};

const ACHIEVEMENT_ICONS = {
    1: '🌱', 2: '📖', 3: '🧠', 4: '🏠', 5: '⚡',
    6: '🏅', 7: '🌊', 8: '📚', 9: '🔥', 10: '🌟',
    11: '🚀', 12: '📜', 13: '💎', 14: '🎯', 15: '👑'
};

function getAchievementName(id, metaMap) {
    if (metaMap && metaMap[id]) return metaMap[id].name || metaMap[id].title;
    return ACHIEVEMENT_NAMES[id] || `Достижение #${id}`;
}

function getAchievementIcon(id, metaMap) {
    if (metaMap && metaMap[id]) return metaMap[id].icon || '🏅';
    return ACHIEVEMENT_ICONS[id] || '🏅';
}

// ============================================================
// ПОДСКАЗКИ
// ============================================================
const HELP_TEXTS = {
    level: '<b>⭐ Уровень</b><br>Растёт при накоплении опыта. Каждый уровень открывает новое звание и достижения.',
    xp: '<b>💎 Опыт (XP)</b><br>Начисляется за:<br>• чтение статей (+5 XP)<br>• викторины (+20 XP)<br>• новые места (+10 XP)<br>• ежедневный вход (+2 XP)',
    achievements: '<b>🏆 Достижения</b><br>Выдаются за уровни, викторины, исследование территорий и серии посещений.',
    places: '<b>📍 Мест посещено</b><br>Уникальные статьи, которые вы открыли. За каждое новое место +10 XP.',
    articles: '<b>📖 Статей прочитано</b><br>Общее количество открытий статей. Чем чаще читаете — тем больше опыта!',
    quiz: '<b>🧠 Викторин пройдено</b><br>Викторины в разделе «Интерактив». За каждую +20 XP и шанс получить редкое достижение.',
    streak: '<b>🔥 Серия дней</b><br>Сколько дней подряд вы заходите. Не прерывайте серию — за 7 дней подряд дают достижение!',
    days: '<b>📅 Дней на сайте</b><br>Сколько дней прошло с регистрации. Чем дольше вы с нами — тем больше бонусов.',
    actions: '<b>🎯 Всего действий</b><br>Сумма всех ваших действий: визиты, достижения, викторины.',
    time: '<b>⏱️ Время чтения</b><br>Примерное время за чтением статей (по 1.5 минуты на статью).'
};

// ============================================================
// УТИЛИТЫ
// ============================================================
function animateValue(el, start, end, duration = 1000) {
    if (!el || typeof end !== 'number') return;
    const range = end - start;
    const startTime = performance.now();
    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(start + range * eased);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = end;
    }
    requestAnimationFrame(step);
}

function groupByDate(items) {
    const map = {};
    items.forEach(item => {
        const date = (item.visited_at || item.earned_at || item.created_at || '').slice(0, 10);
        if (date) map[date] = (map[date] || 0) + 1;
    });
    return map;
}

function renderHeatmap(activityMap) {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    start.setDate(start.getDate() - start.getDay());
    const days = [];
    const cursor = new Date(start);
    while (cursor <= today) {
        days.push({ date: cursor.toISOString().slice(0, 10), count: activityMap[cursor.toISOString().slice(0, 10)] || 0 });
        cursor.setDate(cursor.getDate() + 1);
    }
    const maxCount = Math.max(1, ...days.map(d => d.count));
    const grid = days.map(d => {
        const level = d.count === 0 ? 0 : d.count <= maxCount * 0.25 ? 1 : d.count <= maxCount * 0.5 ? 2 : d.count <= maxCount * 0.75 ? 3 : 4;
        return `<div class="heatmap-cell" data-level="${level}" title="${d.date}: ${d.count} действий"></div>`;
    }).join('');
    return `
        <div class="heatmap-wrapper"><div class="heatmap-grid">${grid}</div></div>
        <div class="heatmap-legend">
            <span>Меньше</span>
            <div class="cell" style="background:#ebedf0;"></div>
            <div class="cell" style="background:color-mix(in srgb, var(--kingdom-color) 25%, #ebedf0);"></div>
            <div class="cell" style="background:color-mix(in srgb, var(--kingdom-color) 50%, #ebedf0);"></div>
            <div class="cell" style="background:color-mix(in srgb, var(--kingdom-color) 75%, #ebedf0);"></div>
            <div class="cell" style="background:var(--kingdom-color);"></div>
            <span>Больше</span>
        </div>
    `;
}

function calcStreak(activityMap) {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        if (activityMap[d.toISOString().slice(0, 10)]) streak++;
        else if (i > 0) break;
    }
    return streak;
}

function daysSince(dateStr) {
    return Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
}

function formatReadingTime(minutes) {
    if (minutes < 60) return minutes + ' мин';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h + 'ч' + (m > 0 ? ' ' + m + 'м' : '');
}

// ============================================================
// ЛЕНТА СОБЫТИЙ
// ============================================================
function buildAchievementsFeed(profile, achievements, visits, rank, metaMap) {
    const feed = [{
        icon: rank.icon,
        text: `Текущее звание: <b>${rank.title}</b>`,
        date: new Date().toLocaleDateString('ru-RU'),
        highlight: true
    }];

    (achievements || []).forEach(a => {
        feed.push({
            icon: getAchievementIcon(a.achievement_id, metaMap),
            text: `Получено: <b>${getAchievementName(a.achievement_id, metaMap)}</b>`,
            date: a.earned_at ? new Date(a.earned_at).toLocaleDateString('ru-RU') : ''
        });
    });

    const recent = [...(visits || [])]
        .sort((a, b) => new Date(b.visited_at) - new Date(a.visited_at))
        .slice(0, 2);
    recent.forEach(v => {
        feed.push({
            icon: '📍',
            text: `Изучено: <b>${v.place_id}</b>`,
            date: new Date(v.visited_at).toLocaleDateString('ru-RU')
        });
    });

    if (feed.length === 1) {
        feed.push({ icon: '🌟', text: 'Начните исследовать энциклопедию!', date: '' });
    }
    return feed.slice(0, 8);
}

// ============================================================
// ОСНОВНАЯ ЛОГИКА
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    if (typeof supabase === 'undefined') {
        document.getElementById('stats-container').innerHTML = '<p>⚠️ Ошибка загрузки Supabase.</p>';
        return;
    }

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    client.auth.getSession().then(async ({ data }) => {
        const user = data?.session?.user;
        if (!user) {
            document.getElementById('stats-container').innerHTML = `
                <div class="block" style="text-align:center; padding:60px 20px;">
                    <div style="font-size:3rem; margin-bottom:16px;">🔒</div>
                    <p style="font-size:1.2rem; margin:0 0 20px 0;">Вы не авторизованы</p>
                    <a href="/login/" style="display:inline-block; padding:12px 32px; background: var(--kingdom-color, #6C63FF); color:#fff; border-radius:10px; text-decoration:none; font-weight:600;">Войти</a>
                </div>
            `;
            return;
        }

        const { data: profile, error } = await client.from('profiles').select('*').eq('user_id', user.id).single();
        if (error) {
            document.getElementById('stats-container').innerHTML = '<p>⚠️ Ошибка загрузки статистики.</p>';
            return;
        }

        // ============================================================
        // ТЕМА КОРОЛЕВСТВА
        // ============================================================
        const kingdomName = profile.kingdom || 'Эдем';
        const kingdom = KINGDOMS[kingdomName] || KINGDOMS['Эдем'];

        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');

        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        const h1 = document.getElementById('stats-title');
        if (h1) {
            h1.style.color = kingdom.color;
            h1.style.textShadow = `0 2px 12px ${kingdom.color}40`;
        }

        // ============================================================
        // ЗАГРУЗКА ДАННЫХ
        // ============================================================
        const { data: achievements } = await client
            .from('user_achievements').select('achievement_id, earned_at')
            .eq('user_id', user.id).order('earned_at', { ascending: false });

        let metaMap = {};
        try {
            const { data: achMeta } = await client.from('achievements').select('*');
            if (achMeta) achMeta.forEach(a => { metaMap[a.id] = a; });
        } catch (e) {}

        let visits = [];
        try {
            const { data: v } = await client.from('user_visits')
                .select('place_id, place_type, visited_at').eq('user_id', user.id)
                .order('visited_at', { ascending: false });
            visits = v || [];
        } catch (e) {}

        let quizzes = [];
        try {
            const { data: q } = await client.from('user_quizzes')
                .select('quiz_id, score, passed_at').eq('user_id', user.id).eq('passed', true);
            quizzes = q || [];
        } catch (e) {}

        // ============================================================
        // ПОДСЧЁТЫ
        // ============================================================
        const displayName = profile.display_name || profile.username || user.email.split('@')[0];
        const xp = profile.experience || 0;
        const rank = getRankByXp(xp);

        let currentLevelXp = 0, nextLevelXp = 50;
        for (let i = levelMap.length - 1; i >= 0; i--) {
            if (xp >= levelMap[i].xp) {
                currentLevelXp = levelMap[i].xp;
                nextLevelXp = (i < levelMap.length - 1) ? levelMap[i + 1].xp : xp + 50;
                break;
            }
        }
        const progressPercent = nextLevelXp > currentLevelXp
            ? Math.min(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100, 100) : 100;

        const uniquePlaces = new Set(visits.map(v => v.place_id)).size;
        const stats = {
            experience: xp, level: rank.level,
            achievements: achievements?.length || 0,
            placesVisited: uniquePlaces, articlesRead: visits.length,
            quizzesPassed: quizzes.length
        };

        const activityMap = groupByDate([...(achievements || []), ...visits]);
        const streak = calcStreak(activityMap);
        const daysOnSite = daysSince(user.created_at);
        const readingTime = Math.round(visits.length * 1.5);
        const totalActions = visits.length + (achievements?.length || 0) + quizzes.length;

        const interestMap = {};
        visits.forEach(v => { interestMap[v.place_type || 'other'] = (interestMap[v.place_type || 'other'] || 0) + 1; });
        const interestLabels = {
            'sea': '🌊 Моря', 'city': '🏙️ Города', 'temple': '🏛️ Храмы', 'cave': '🏔️ Пещеры',
            'character': '👤 Персонажи', 'history': '📜 История', 'myth': '✨ Мифы',
            'geography': '🗺️ География', 'religion': '🕯️ Религия', 'astronomy': '🔭 Астрономия',
            'writing': '✍️ Письменность', 'book': '📖 Книги', 'tech': '⚙️ Технологии',
            'culture': '🎭 Культура', 'music': '🎵 Музыка', 'other': '📦 Прочее'
        };
        const interestKeys = Object.keys(interestMap);
        const interestData = interestKeys.map(k => interestMap[k]);

        const achFeed = buildAchievementsFeed(profile, achievements, visits, rank, metaMap);

        // Цель
        let nextGoal = { text: 'Продолжайте исследовать Марс!', link: '/', icon: '🚀' };
        if (stats.quizzesPassed === 0) nextGoal = { text: 'Пройдите первую викторину!', link: '/interactive/', icon: '🧠' };
        else if (stats.placesVisited < 10) nextGoal = { text: `Посетите ещё ${10 - stats.placesVisited} мест`, link: '/geography/', icon: '📍' };
        else if (rank.level < 6) nextGoal = { text: 'Достигните 6 уровня — станьте Легендой!', link: '/', icon: '👑' };
        else if (stats.achievements < 5) nextGoal = { text: `Получите ещё ${5 - stats.achievements} достижений!`, link: '/', icon: '🏆' };

        // ============================================================
        // РЕНДЕР
        // ============================================================
        const card = (id, icon, value, label, helpKey) => `
            <div class="stat-card fade-in">
                <div class="help-icon" tabindex="0">?
                    <div class="tooltip">${HELP_TEXTS[helpKey] || ''}</div>
                </div>
                <div class="stat-icon">${icon}</div>
                <div class="stat-value" id="stat-${id}">${value}</div>
                <div class="stat-label">${label}</div>
            </div>
        `;

        document.getElementById('stats-container').innerHTML = `
            <!-- Шапка профиля -->
            <div class="profile-header fade-in">
                <div class="rank-icon-bg">${rank.icon}</div>
                <h2 style="margin: 0; color: #fff; font-size: 1.8rem; font-weight: 800; letter-spacing: 0.5px;">${displayName}</h2>
                <p style="margin: 6px 0 16px 0; opacity: 0.9; font-size: 0.9rem;">${user.email}</p>
                <div class="rank-badge">
                    <span class="rank-icon">${rank.icon}</span>
                    <span>${rank.title}</span>
                </div>
            </div>

            ${streak > 1 ? `
            <div class="streak-banner fade-in">
                <span style="font-size: 2.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">🔥</span>
                <div>
                    <div style="font-size: 1.2rem; font-weight: 800;">${streak} ${streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} подряд!</div>
                    <div style="font-size: 0.85rem; opacity: 0.92;">Не прерывайте серию — достижение «Постоянный» ждёт!</div>
                </div>
            </div>` : ''}

            <!-- Заголовок цифр -->
            <h3 class="section-title">🎯 Ваши достижения</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; margin-bottom: 28px;">
                ${card('level', '⭐', stats.level, 'Уровень', 'level')}
                ${card('xp', '💎', stats.experience, 'Опыт (XP)', 'xp')}
                ${card('ach', '🏆', stats.achievements, 'Достижений', 'achievements')}
                ${card('places', '📍', stats.placesVisited, 'Мест посещено', 'places')}
                ${card('articles', '📖', stats.articlesRead, 'Статей прочитано', 'articles')}
                ${card('quiz', '🧠', stats.quizzesPassed, 'Викторин пройдено', 'quiz')}
                ${card('streak', '🔥', streak, 'Серия дней', 'streak')}
                ${card('days', '📅', daysOnSite, 'Дней на сайте', 'days')}
                ${card('actions', '🎯', totalActions, 'Всего действий', 'actions')}
                ${card('time', '⏱️', formatReadingTime(readingTime), 'Время чтения', 'time')}
            </div>

            <!-- Прогресс -->
            <div class="block fade-in">
                <div style="display: flex; justify-content: space-between; font-size: 0.92rem; color: #555; margin-bottom: 10px; font-weight: 600;">
                    <span>Прогресс до ${levelMap.find(l => l.level === rank.level + 1)?.title || 'максимума'}</span>
                    <span style="color: var(--kingdom-color);">${Math.round(progressPercent)}%</span>
                </div>
                <div style="background: rgba(0,0,0,0.08); border-radius: 12px; height: 16px; overflow: hidden; position: relative;">
                    <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, var(--kingdom-color), var(--kingdom-light)); border-radius: 12px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 0 12px var(--kingdom-shadow);"></div>
                </div>
                <p style="font-size: 0.82rem; color: #888; margin: 8px 0 0 0;">
                    Осталось <b style="color: var(--kingdom-color);">${Math.max(nextLevelXp - stats.experience, 0)} XP</b> до следующего уровня
                </p>
            </div>

            <!-- Лента -->
            <div class="block fade-in">
                <h3>🏅 Последние события</h3>
                ${achFeed.map((a, i) => `
                    <div class="achievement-item ${a.highlight ? 'highlight' : ''}" style="animation-delay: ${i * 0.05}s;">
                        <span class="ach-icon">${a.icon}</span>
                        <span class="ach-text">${a.text}</span>
                        <span class="ach-date">${a.date}</span>
                    </div>
                `).join('')}
            </div>

            <!-- Цель -->
            <a href="${nextGoal.link}" class="goal-link fade-in">
                <span style="font-size: 2rem;">${nextGoal.icon}</span>
                <div>
                    <div style="font-size: 0.78rem; opacity: 0.85; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Следующая цель</div>
                    <div style="font-size: 1.05rem; font-weight: 700;">${nextGoal.text}</div>
                </div>
                <span class="goal-arrow">→</span>
            </a>

            <!-- Тепловая карта -->
            <div class="block fade-in">
                <h3>🔥 Карта активности</h3>
                <p style="font-size: 0.82rem; color: #888; margin: 0 0 16px 0;">Каждый квадратик — один день за последний год</p>
                ${renderHeatmap(activityMap)}
            </div>

            <!-- Графики -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
                <div class="block fade-in" style="margin-bottom: 0;">
                    <h3>📈 Общие показатели</h3>
                    <canvas id="statsChart" style="width:100%; max-height:250px;"></canvas>
                </div>
                <div class="block fade-in" style="margin-bottom: 0;">
                    <h3>🧭 Ваши интересы</h3>
                    <canvas id="interestChart" style="width:100%; max-height:250px;"></canvas>
                </div>
            </div>

            <!-- Интерактив -->
            <h3 class="section-title" style="margin-top: 28px;">🎮 Интерактив</h3>
            <div class="interactive-grid fade-in" style="margin-bottom: 28px;">
                <a href="/game/" class="interactive-card">
                    <span class="ic-icon">🏛️</span>
                    <span class="ic-title">Марсианская империя</span>
                    <span class="ic-desc">Управляйте колонией</span>
                </a>
                <a href="/globe-map/" class="interactive-card">
                    <span class="ic-icon">🗺️</span>
                    <span class="ic-title">Карта Марса</span>
                    <span class="ic-desc">Интерактивный глобус</span>
                </a>
                <a href="/interactive/exodus/" class="interactive-card">
                    <span class="ic-icon">🪐</span>
                    <span class="ic-title">К Исходу</span>
                    <span class="ic-desc">Сюжетная игра</span>
                </a>
                <a href="/translator/" class="interactive-card">
                    <span class="ic-icon">🗣️</span>
                    <span class="ic-title">Переводчик</span>
                    <span class="ic-desc">Марсианский язык</span>
                </a>
                <a href="/music/constructor/" class="interactive-card">
                    <span class="ic-icon">🎵</span>
                    <span class="ic-title">Конструктор</span>
                    <span class="ic-desc">Создавайте мелодии</span>
                </a>
            </div>

            <p style="margin-top: 24px; text-align: center;">
                <a href="/profile/" style="color: var(--kingdom-color); text-decoration: none; font-weight: 600;">← Вернуться в профиль</a>
            </p>
        `;

        // Анимации счётчиков
        animateValue(document.getElementById('stat-level'), 0, stats.level);
        animateValue(document.getElementById('stat-xp'), 0, stats.experience);
        animateValue(document.getElementById('stat-ach'), 0, stats.achievements);
        animateValue(document.getElementById('stat-places'), 0, stats.placesVisited);
        animateValue(document.getElementById('stat-articles'), 0, stats.articlesRead);
        animateValue(document.getElementById('stat-quiz'), 0, stats.quizzesPassed);
        animateValue(document.getElementById('stat-streak'), 0, streak);
        animateValue(document.getElementById('stat-days'), 0, daysOnSite);
        animateValue(document.getElementById('stat-actions'), 0, totalActions);

        // Графики
        const chartColors = [kingdom.color, kingdom.light, '#27ae60', '#e74c3c', '#3498db'];

        new Chart(document.getElementById('statsChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Уровень', 'Опыт', 'Достижения', 'Места', 'Статьи'],
                datasets: [{
                    data: [stats.level, stats.experience, stats.achievements, stats.placesVisited, stats.articlesRead],
                    backgroundColor: chartColors,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: kingdom.color + '15' } },
                    x: { grid: { display: false } }
                }
            }
        });

        if (interestKeys.length > 0) {
            const interestColors = [
                kingdom.color, kingdom.light, '#f39c12', '#27ae60', '#e74c3c', '#3498db',
                '#e91e63', '#00bcd4', '#ff9800', '#9c27b0', '#795548', '#607d8b'
            ];
            new Chart(document.getElementById('interestChart').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: interestKeys.map(k => interestLabels[k] || k),
                    datasets: [{
                        data: interestData,
                        backgroundColor: interestColors.slice(0, interestKeys.length),
                        borderWidth: 3,
                        borderColor: '#fff',
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom', labels: { padding: 12, font: { size: 11 } } }
                    },
                    cutout: '65%'
                }
            });
        } else {
            document.getElementById('interestChart').outerHTML = '<p style="text-align:center;color:#999;padding:40px 0;">Пока нет данных</p>';
        }

        // Подсказки
        document.querySelectorAll('.help-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.help-icon.active').forEach(i => { if (i !== icon) i.classList.remove('active'); });
                icon.classList.toggle('active');
            });
        });
        document.addEventListener('click', () => {
            document.querySelectorAll('.help-icon.active').forEach(i => i.classList.remove('active'));
        });

        // Конфетти при высоком уровне
        if (rank.level >= 5 && typeof confetti !== 'undefined') {
            setTimeout(() => {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.15 },
                    colors: [kingdom.color, kingdom.light, '#FFD700']
                });
            }, 800);
        }

    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('stats-container').innerHTML = '<p>⚠️ Ошибка загрузки статистики.</p>';
    });
});
</script>
