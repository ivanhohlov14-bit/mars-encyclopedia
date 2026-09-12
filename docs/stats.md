<h1 style="text-align:center;">📊 Моя статистика</h1>

<div id="stats-container" style="max-width: 900px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; position: relative; z-index: 1;">
    <p style="text-align: center; color: #999;">Загрузка...</p>
</div>

<style>
    .stat-card {
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(8px);
        padding: 20px 16px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        border: 1px solid #eaecf0;
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
    }
    .stat-card:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }
    .stat-card .stat-value { font-size: 1.9rem; font-weight: 700; line-height: 1.1; }
    .stat-card .stat-label { font-size: 0.8rem; color: #888; margin-top: 4px; }
    .stat-card .stat-icon { font-size: 1.3rem; margin-bottom: 4px; }

    .help-icon {
        position: absolute; top: 8px; right: 8px;
        width: 18px; height: 18px; border-radius: 50%;
        background: #6C63FF; color: #fff;
        font-size: 11px; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        cursor: help; opacity: 0.7;
        transition: opacity 0.2s, transform 0.2s;
        z-index: 10;
    }
    .help-icon:hover { opacity: 1; transform: scale(1.15); }
    .tooltip {
        position: absolute; top: 100%; right: -10px; margin-top: 8px;
        background: #2c3e50; color: #fff;
        padding: 10px 14px; border-radius: 8px;
        font-size: 0.78rem; line-height: 1.5; width: 230px;
        z-index: 100; opacity: 0; visibility: hidden;
        transform: translateY(-5px); transition: all 0.2s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        text-align: left; font-weight: normal;
    }
    .tooltip::before {
        content: ''; position: absolute; top: -6px; right: 15px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #2c3e50;
    }
    .help-icon:hover .tooltip, .help-icon.active .tooltip { opacity: 1; visibility: visible; transform: translateY(0); }

    .heatmap-wrapper { overflow-x: auto; padding: 8px 0; }
    .heatmap-grid { display: grid; grid-auto-flow: column; grid-template-rows: repeat(7, 12px); gap: 3px; min-width: 780px; }
    .heatmap-cell { width: 12px; height: 12px; border-radius: 2px; background: #ebedf0; transition: transform 0.1s; }
    .heatmap-cell:hover { transform: scale(1.4); outline: 1px solid #333; }
    .heatmap-cell[data-level="1"] { background: #c6e48b; }
    .heatmap-cell[data-level="2"] { background: #7bc96f; }
    .heatmap-cell[data-level="3"] { background: #239a3b; }
    .heatmap-cell[data-level="4"] { background: #196127; }
    .heatmap-legend { display: flex; align-items: center; justify-content: flex-end; gap: 4px; font-size: 0.75rem; color: #999; margin-top: 8px; }
    .heatmap-legend .cell { width: 10px; height: 10px; border-radius: 2px; }

    .rank-badge { display: inline-flex; align-items: center; gap: 10px; padding: 10px 20px; border-radius: 30px; font-size: 1.1rem; font-weight: 600; background: rgba(255,255,255,0.2); color: #fff; }
    .rank-badge .rank-icon { font-size: 1.6rem; }

    .achievement-item {
        display: flex; align-items: center; gap: 12px;
        padding: 10px 14px; border-radius: 8px;
        background: rgba(255,255,255,0.6);
        border-left: 3px solid #6C63FF;
        margin-bottom: 8px;
    }
    .achievement-item .ach-icon { font-size: 1.4rem; }
    .achievement-item .ach-text { flex: 1; font-size: 0.9rem; }
    .achievement-item .ach-date { font-size: 0.75rem; color: #999; white-space: nowrap; }

    .fade-in { animation: fadeInUp 0.5s ease; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .goal-link {
        display: flex; align-items: center; gap: 12px;
        padding: 16px 20px; border-radius: 12px;
        background: linear-gradient(135deg, var(--kingdom-color, #6C63FF), var(--kingdom-color-light, #a29bfe));
        color: #fff; text-decoration: none;
        margin-bottom: 28px;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
    }
    .goal-link:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(108, 99, 255, 0.4); color: #fff; }
    .goal-link .goal-arrow { margin-left: auto; font-size: 1.5rem; transition: transform 0.2s; }
    .goal-link:hover .goal-arrow { transform: translateX(4px); }

    /* ==== СТИЛИ ДЛЯ БЛОКА "ИНТЕРАКТИВ" ==== */
    .interactive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }
    .interactive-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 20px 16px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(8px);
        border: 1px solid #eaecf0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        cursor: pointer;
    }
    .interactive-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        border-color: var(--kingdom-color, #6C63FF);
    }
    .interactive-card .ic-icon { font-size: 2.5rem; margin-bottom: 8px; }
    .interactive-card .ic-title { font-size: 1rem; font-weight: 600; color: #2c3e50; margin-bottom: 4px; }
    .interactive-card .ic-desc { font-size: 0.8rem; color: #888; line-height: 1.4; }

    @media (prefers-color-scheme: dark) {
        .stat-card { background: rgba(30, 30, 46, 0.92); border-color: #2a2a3a; }
        .heatmap-cell { background: #2a2a3a; }
        .heatmap-cell[data-level="1"] { background: #0e4429; }
        .heatmap-cell[data-level="2"] { background: #006d32; }
        .heatmap-cell[data-level="3"] { background: #26a641; }
        .heatmap-cell[data-level="4"] { background: #39d353; }
        .achievement-item { background: rgba(30,30,46,0.6); }
        .interactive-card { background: rgba(30, 30, 46, 0.92); border-color: #2a2a3a; }
        .interactive-card .ic-title { color: #e0e0e0; }
    }
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

// ============================================================
// 1. КОРОЛЕВСТВА (тема оформления)
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
// 2. УРОВНИ И РАНГИ
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
    for (const r of levelMap) {
        if (xp >= r.xp) rank = r;
    }
    return rank;
}

// ============================================================
// 3. ЛОКАЛЬНЫЙ СЛОВАРЬ ДОСТИЖЕНИЙ (резервный)
// ============================================================
const ACHIEVEMENT_NAMES = {
    1: '🌱 Первые шаги', 2: '📖 Читатель', 3: '🧠 Знаток',
    4: '🏠 Колонизатор', 5: '⚡ Командир базы', 6: '🏅 Марсианин',
    7: '🌊 Мореплаватель', 8: '📚 Эрудит', 9: '🔥 Постоянный',
    10: '🌟 Хранитель знаний', 11: '🚀 Первопроходец', 12: '📜 Хранитель свитков',
    13: '💎 Богач', 14: '🎯 Снайпер', 15: '👑 Легенда Марса'
};

function getAchievementName(id, metaMap) {
    if (metaMap && metaMap[id]) {
        return metaMap[id].name || metaMap[id].title || metaMap[id].title_ru;
    }
    return ACHIEVEMENT_NAMES[id] || `Достижение #${id}`;
}

// ============================================================
// 4. ПОДСКАЗКИ
// ============================================================
const HELP_TEXTS = {
    level: '⭐ <b>Уровень</b><br>Растёт при накоплении опыта. Каждый уровень открывает новое звание и достижения.',
    xp: '💎 <b>Опыт (XP)</b><br>Начисляется за:<br>• чтение статей (+5 XP)<br>• прохождение викторин (+20 XP)<br>• посещение новых мест (+10 XP)<br>• ежедневный вход (+2 XP)',
    achievements: '🏆 <b>Достижения</b><br>Выдаются за уровни, викторины, исследование территорий и серии посещений.',
    places: '📍 <b>Посещено мест</b><br>Уникальные статьи, которые вы открыли. За каждое новое место +10 XP.',
    articles: '📖 <b>Прочитано статей</b><br>Общее количество открытий статей (включая повторные). Чем чаще читаете — тем больше опыта!',
    quiz: '🧠 <b>Пройдено викторин</b><br>Викторины в разделе «Интерактив». За каждую +20 XP и шанс получить редкое достижение.',
    streak: '🔥 <b>Серия дней</b><br>Сколько дней подряд вы заходите на сайт. Не прерывайте серию — за 7 дней подряд дают достижение!',
    days: '📅 <b>Дней на сайте</b><br>Сколько дней прошло с момента регистрации. Чем дольше вы с нами — тем больше бонусов.',
    actions: '🎯 <b>Всего действий</b><br>Сумма всех ваших действий: визиты, достижения, викторины. Показатель вашей активности.',
    time: '⏱️ <b>Время чтения</b><br>Примерное время, проведённое за чтением статей (по 1.5 минуты на статью).'
};

// ============================================================
// 5. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================
function animateValue(el, start, end, duration = 800) {
    if (!el || typeof end !== 'number') return;
    const range = end - start;
    const startTime = performance.now();
    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + range * progress);
        el.textContent = value;
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
        const key = cursor.toISOString().slice(0, 10);
        days.push({ date: key, count: activityMap[key] || 0 });
        cursor.setDate(cursor.getDate() + 1);
    }
    const maxCount = Math.max(1, ...days.map(d => d.count));
    const grid = days.map(d => {
        const level = d.count === 0 ? 0
            : d.count <= maxCount * 0.25 ? 1
            : d.count <= maxCount * 0.5 ? 2
            : d.count <= maxCount * 0.75 ? 3 : 4;
        return `<div class="heatmap-cell" data-level="${level}" title="${d.date}: ${d.count} действий"></div>`;
    }).join('');
    return `
        <div class="heatmap-wrapper"><div class="heatmap-grid">${grid}</div></div>
        <div class="heatmap-legend">
            <span>Меньше</span>
            <div class="cell" style="background:#ebedf0;"></div>
            <div class="cell" style="background:#c6e48b;"></div>
            <div class="cell" style="background:#7bc96f;"></div>
            <div class="cell" style="background:#239a3b;"></div>
            <div class="cell" style="background:#196127;"></div>
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
        const key = d.toISOString().slice(0, 10);
        if (activityMap[key]) streak++;
        else if (i > 0) break;
    }
    return streak;
}

function daysSince(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}

function formatReadingTime(minutes) {
    if (minutes < 60) return minutes + ' мин';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h + ' ч' + (m > 0 ? ' ' + m + ' мин' : '');
}

// ============================================================
// 6. ЛЕНТА СОБЫТИЙ
// ============================================================
function buildAchievementsFeed(profile, achievements, visits, rank, metaMap) {
    const feed = [];

    feed.push({
        icon: rank.icon,
        text: `Текущее звание: <b>${rank.title}</b>`,
        date: new Date().toLocaleDateString('ru-RU'),
        highlight: true
    });

    (achievements || []).forEach(a => {
        const name = getAchievementName(a.achievement_id, metaMap);
        feed.push({
            icon: '🏅',
            text: `Получено достижение: <b>${name}</b>`,
            date: a.earned_at ? new Date(a.earned_at).toLocaleDateString('ru-RU') : ''
        });
    });

    const recentVisits = [...(visits || [])]
        .sort((a, b) => new Date(b.visited_at) - new Date(a.visited_at))
        .slice(0, 2);
    recentVisits.forEach(v => {
        feed.push({
            icon: '📍',
            text: `Изучено: <b>${v.place_id}</b>`,
            date: new Date(v.visited_at).toLocaleDateString('ru-RU')
        });
    });

    if (feed.length === 1) {
        feed.push({
            icon: '🌟',
            text: 'Начните исследовать энциклопедию — события появятся здесь!',
            date: ''
        });
    }

    return feed.slice(0, 8);
}

// ============================================================
// 7. ОСНОВНАЯ ЛОГИКА
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
                <div style="background:#f8f9fa;padding:40px;border-radius:12px;text-align:center;">
                    <p style="font-size:1.2rem;">⚠️ Вы не авторизованы.</p>
                    <a href="/login/" style="display:inline-block;margin-top:12px;padding:10px 24px;background:#6C63FF;color:#fff;border-radius:8px;text-decoration:none;">Войти</a>
                </div>
            `;
            return;
        }

        // ---- Профиль ----
        const { data: profile, error } = await client
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (error) {
            console.error('Ошибка загрузки профиля:', error);
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
        document.documentElement.style.setProperty('--kingdom-color-light', kingdom.light);

        // Применяем фон ко всей странице
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        // Красим заголовок страницы
        const h1 = document.querySelector('h1');
        if (h1) {
            h1.style.color = kingdom.color;
            h1.style.textShadow = `0 2px 4px ${kingdom.color}40`;
        }

        console.log('👑 Королевство:', kingdomName, '→ фон:', kingdom.bg);

        // ---- Достижения ----
        const { data: achievements } = await client
            .from('user_achievements')
            .select('achievement_id, earned_at')
            .eq('user_id', user.id)
            .order('earned_at', { ascending: false });

        // ---- Мета достижений (если есть таблица) ----
        let metaMap = {};
        try {
            const { data: achMeta } = await client.from('achievements').select('*');
            if (achMeta) {
                achMeta.forEach(a => { metaMap[a.id] = a; });
                console.log('📚 Загружено достижений из БД:', achMeta.length);
            }
        } catch (e) { console.warn('Таблица achievements недоступна', e); }

        // ---- Посещения ----
        let visits = [];
        try {
            const { data: v } = await client
                .from('user_visits')
                .select('place_id, place_type, visited_at')
                .eq('user_id', user.id)
                .order('visited_at', { ascending: false });
            visits = v || [];
        } catch (e) { console.warn('user_visits недоступна', e); }

        // ---- Викторины ----
        let quizzes = [];
        try {
            const { data: q } = await client
                .from('user_quizzes')
                .select('quiz_id, score, passed_at')
                .eq('user_id', user.id)
                .eq('passed', true);
            quizzes = q || [];
        } catch (e) { console.warn('user_quizzes недоступна', e); }

        // ============================================================
        // Подсчёты
        // ============================================================
        const displayName = profile.display_name || profile.username || user.email.split('@')[0];
        const xp = profile.experience || 0;
        const rank = getRankByXp(xp);

        // Прогресс уровня (по XP, а не по profile.level)
        let currentLevelXp = 0;
        let nextLevelXp = 50;
        for (let i = levelMap.length - 1; i >= 0; i--) {
            if (xp >= levelMap[i].xp) {
                currentLevelXp = levelMap[i].xp;
                nextLevelXp = (i < levelMap.length - 1) ? levelMap[i + 1].xp : xp + 50;
                break;
            }
        }
        const progressPercent = nextLevelXp > currentLevelXp
            ? Math.min(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100, 100)
            : 100;

        const uniquePlaces = new Set(visits.map(v => v.place_id)).size;

        const stats = {
            experience: xp,
            level: rank.level,
            achievements: achievements?.length || 0,
            placesVisited: uniquePlaces,
            articlesRead: visits.length,
            quizzesPassed: quizzes.length
        };

        // Тепловая карта + стрик
        const allActivity = [...(achievements || []), ...visits];
        const activityMap = groupByDate(allActivity);
        const streak = calcStreak(activityMap);
        const daysOnSite = daysSince(user.created_at);
        const readingTime = Math.round(visits.length * 1.5);
        const totalActions = visits.length + (achievements?.length || 0) + quizzes.length;

        // Распределение интересов
        const interestMap = {};
        visits.forEach(v => {
            const key = v.place_type || 'other';
            interestMap[key] = (interestMap[key] || 0) + 1;
        });
        const interestLabels = {
            'sea': '🌊 Моря', 'city': '🏙️ Города', 'temple': '🏛️ Храмы',
            'cave': '🏔️ Пещеры', 'character': '👤 Персонажи', 'history': '📜 История',
            'myth': '✨ Мифы', 'geography': '🗺️ География', 'religion': '🕯️ Религия',
            'astronomy': '🔭 Астрономия', 'writing': '✍️ Письменность', 'book': '📖 Книги',
            'tech': '⚙️ Технологии', 'culture': '🎭 Культура', 'music': '🎵 Музыка',
            'other': '📦 Прочее'
        };
        const interestKeys = Object.keys(interestMap);
        const interestData = interestKeys.map(k => interestMap[k]);
        const interestColors = [
            '#6C63FF','#f39c12','#27ae60','#e74c3c','#8e44ad','#3498db',
            '#e91e63','#00bcd4','#ff9800','#9c27b0','#795548','#607d8b',
            '#009688','#ffc107','#673ab7','#95a5a6'
        ];

        const achFeed = buildAchievementsFeed(profile, achievements, visits, rank, metaMap);

        // Следующая цель
        let nextGoal = { text: 'Продолжайте исследовать Марс!', link: '/', icon: '🚀' };
        if (stats.quizzesPassed === 0) {
            nextGoal = { text: 'Пройдите первую викторину — получите «Знаток»!', link: '/interactive/', icon: '🧠' };
        } else if (stats.placesVisited < 10) {
            nextGoal = { text: `Посетите ещё ${10 - stats.placesVisited} мест — откроется «Путешественник»!`, link: '/geography/', icon: '📍' };
        } else if (rank.level < 6) {
            nextGoal = { text: `Достигните 6 уровня — станете «Легендой Марса»!`, link: '/', icon: '👑' };
        } else if (stats.achievements < 5) {
            nextGoal = { text: `Получите ещё ${5 - stats.achievements} достижений!`, link: '/', icon: '🏆' };
        }

        function card(id, icon, value, label, color, helpKey) {
            return `
                <div class="stat-card fade-in">
                    <div class="help-icon" tabindex="0">?
                        <div class="tooltip">${HELP_TEXTS[helpKey] || ''}</div>
                    </div>
                    <div class="stat-icon">${icon}</div>
                    <div class="stat-value" style="color:${color};" id="stat-${id}">${value}</div>
                    <div class="stat-label">${label}</div>
                </div>
            `;
        }

        // ============================================================
        // Рендер
        // ============================================================
        document.getElementById('stats-container').innerHTML = `
            <!-- Шапка с рангом -->
            <div style="background: linear-gradient(135deg, ${rank.gradient[0]}, ${rank.gradient[1]}); padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; color: #fff; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -30px; right: -20px; font-size: 9rem; opacity: 0.15;">${rank.icon}</div>
                <h2 style="margin: 0; color: #fff; position: relative;">${displayName}</h2>
                <p style="margin: 4px 0 12px 0; opacity: 0.85; position: relative;">${user.email}</p>
                <div class="rank-badge" style="position: relative;">
                    <span class="rank-icon">${rank.icon}</span>
                    <span>${rank.title}</span>
                </div>
            </div>

            <!-- Стрик -->
            ${streak > 1 ? `
            <div style="background: linear-gradient(135deg, #e74c3c, #f39c12); padding: 14px 20px; border-radius: 12px; margin-bottom: 24px; color: #fff; display: flex; align-items: center; gap: 12px; box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);">
                <span style="font-size: 2rem;">🔥</span>
                <div>
                    <div style="font-size: 1.1rem; font-weight: 700;">${streak} ${streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} подряд!</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">Не прерывайте серию — получите достижение «Постоянный»</div>
                </div>
            </div>` : ''}

            <!-- Цифры -->
            <h3 style="color: #555; margin: 0 0 12px 0; font-size: 1.1rem;">🎯 Ваши достижения</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; margin-bottom: 28px;">
                ${card('level', '⭐', stats.level, 'Уровень', '#6C63FF', 'level')}
                ${card('xp', '💎', stats.experience, 'Опыт (XP)', '#f39c12', 'xp')}
                ${card('ach', '🏆', stats.achievements, 'Достижений', '#27ae60', 'achievements')}
                ${card('places', '📍', stats.placesVisited, 'Мест посещено', '#e74c3c', 'places')}
                ${card('articles', '📖', stats.articlesRead, 'Статей прочитано', '#3498db', 'articles')}
                ${card('quiz', '🧠', stats.quizzesPassed, 'Викторин пройдено', '#8e44ad', 'quiz')}
                ${card('streak', '🔥', streak, 'Серия дней', '#e67e22', 'streak')}
                ${card('days', '📅', daysOnSite, 'Дней на сайте', '#16a085', 'days')}
                ${card('actions', '🎯', totalActions, 'Всего действий', '#c0392b', 'actions')}
                ${card('time', '⏱️', formatReadingTime(readingTime), 'Время чтения', '#2c3e50', 'time')}
            </div>

            <!-- Прогресс уровня -->
            <div style="background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 20px 24px; border-radius: 12px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #555; margin-bottom: 6px;">
                    <span>Прогресс до ${levelMap.find(l => l.level === rank.level + 1)?.title || 'следующего уровня'}</span>
                    <span>${Math.round(progressPercent)}%</span>
                </div>
                <div style="background: #e9ecef; border-radius: 10px; height: 14px; overflow: hidden;">
                    <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, ${rank.gradient[0]}, ${rank.gradient[1]}); border-radius: 10px; transition: width 0.8s;"></div>
                </div>
                <p style="font-size: 0.8rem; color: #999; margin: 6px 0 0 0;">
                    Осталось <b>${Math.max(nextLevelXp - stats.experience, 0)} XP</b> до следующего уровня
                </p>
            </div>

            <!-- Лента событий -->
            <div style="background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 20px 24px; border-radius: 12px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <h3 style="margin: 0 0 16px 0; font-size: 1.1rem; color: #2c3e50;">🏅 Последние события</h3>
                ${achFeed.map(a => `
                    <div class="achievement-item" style="${a.highlight ? 'border-left-color: ' + rank.gradient[0] + '; background: rgba(108,99,255,0.08);' : ''}">
                        <span class="ach-icon">${a.icon}</span>
                        <span class="ach-text">${a.text}</span>
                        <span class="ach-date">${a.date}</span>
                    </div>
                `).join('')}
            </div>

            <!-- Следующая цель -->
            <a href="${nextGoal.link}" class="goal-link">
                <span style="font-size: 1.8rem;">${nextGoal.icon}</span>
                <div>
                    <div style="font-size: 0.8rem; opacity: 0.85; text-transform: uppercase; letter-spacing: 1px;">Следующая цель</div>
                    <div style="font-size: 1rem; font-weight: 600;">${nextGoal.text}</div>
                </div>
                <span class="goal-arrow">→</span>
            </a>

            <!-- Тепловая карта -->
            <div style="background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 20px 24px; border-radius: 12px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <h3 style="margin: 0 0 4px 0; font-size: 1.1rem; color: #2c3e50;">🔥 Карта активности</h3>
                <p style="font-size: 0.8rem; color: #999; margin: 0 0 16px 0;">Каждый квадратик — один день за последний год</p>
                ${renderHeatmap(activityMap)}
            </div>

            <!-- Графики -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
                <div style="background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 20px 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                    <h3 style="margin: 0 0 16px 0; font-size: 1.1rem; color: #2c3e50;">📈 Общие показатели</h3>
                    <canvas id="statsChart" style="width:100%; max-height:250px;"></canvas>
                </div>
                <div style="background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 20px 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                    <h3 style="margin: 0 0 16px 0; font-size: 1.1rem; color: #2c3e50;">🧭 Ваши интересы</h3>
                    <canvas id="interestChart" style="width:100%; max-height:250px;"></canvas>
                </div>
            </div>

            <!-- ==== БЛОК "ИНТЕРАКТИВ" ==== -->
            <h3 style="color: #555; margin: 0 0 16px 0; font-size: 1.1rem;">🎮 Интерактив</h3>
            <div class="interactive-grid" style="margin-bottom: 28px;">
                <a href="/game/" class="interactive-card">
                    <span class="ic-icon">🏛️</span>
                    <span class="ic-title">Марсианская империя</span>
                    <span class="ic-desc">Управляйте колонией, стройте базы и исследуйте планету</span>
                </a>
                <a href="/globe-map/" class="interactive-card">
                    <span class="ic-icon">🗺️</span>
                    <span class="ic-title">Карта Марса</span>
                    <span class="ic-desc">Интерактивный глобус с метками мест из энциклопедии</span>
                </a>
                <a href="/interactive/exodus/" class="interactive-card">
                    <span class="ic-icon">🪐</span>
                    <span class="ic-title">К Исходу</span>
                    <span class="ic-desc">Сюжетная игра с выбором пути и последствиями</span>
                </a>
                <a href="/translator/" class="interactive-card">
                    <span class="ic-icon">🗣️</span>
                    <span class="ic-title">Переводчик</span>
                    <span class="ic-desc">Переводите слова на марсианский язык и обратно</span>
                </a>
                <a href="/music/constructor/" class="interactive-card">
                    <span class="ic-icon">🎵</span>
                    <span class="ic-title">Конструктор мелодий</span>
                    <span class="ic-desc">Создавайте музыку из 7 нот марсианского звукоряда</span>
                </a>
            </div>

            <!-- Ссылки -->
            <p style="margin-top: 20px; text-align: center;">
                <a href="/profile/" style="color: ${kingdom.color}; text-decoration: none;">← Вернуться в профиль</a>
            </p>
        `;

        // ============================================================
        // Анимация счётчиков
        // ============================================================
        animateValue(document.getElementById('stat-level'), 0, stats.level);
        animateValue(document.getElementById('stat-xp'), 0, stats.experience);
        animateValue(document.getElementById('stat-ach'), 0, stats.achievements);
        animateValue(document.getElementById('stat-places'), 0, stats.placesVisited);
        animateValue(document.getElementById('stat-articles'), 0, stats.articlesRead);
        animateValue(document.getElementById('stat-quiz'), 0, stats.quizzesPassed);
        animateValue(document.getElementById('stat-streak'), 0, streak);
        animateValue(document.getElementById('stat-days'), 0, daysOnSite);
        animateValue(document.getElementById('stat-actions'), 0, totalActions);

        // ============================================================
        // Графики
        // ============================================================
        new Chart(document.getElementById('statsChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Уровень', 'Опыт', 'Достижения', 'Места', 'Статьи'],
                datasets: [{
                    label: 'Ваши показатели',
                    data: [stats.level, stats.experience, stats.achievements, stats.placesVisited, stats.articlesRead],
                    backgroundColor: ['#6C63FF', '#f39c12', '#27ae60', '#e74c3c', '#3498db'],
                    borderRadius: 6
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
        });

        if (interestKeys.length > 0) {
            new Chart(document.getElementById('interestChart').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: interestKeys.map(k => interestLabels[k] || k),
                    datasets: [{
                        data: interestData,
                        backgroundColor: interestColors.slice(0, interestKeys.length),
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom', labels: { padding: 12, font: { size: 12 } } } },
                    cutout: '60%'
                }
            });
        } else {
            document.getElementById('interestChart').outerHTML =
                '<p style="text-align:center;color:#999;padding:40px 0;">Пока нет данных для отображения</p>';
        }

        // ============================================================
        // Мобильные подсказки
        // ============================================================
        document.querySelectorAll('.help-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.help-icon.active').forEach(i => {
                    if (i !== icon) i.classList.remove('active');
                });
                icon.classList.toggle('active');
            });
        });
        document.addEventListener('click', () => {
            document.querySelectorAll('.help-icon.active').forEach(i => i.classList.remove('active'));
        });

    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('stats-container').innerHTML = '<p>⚠️ Ошибка загрузки статистики.</p>';
    });
});
</script>
