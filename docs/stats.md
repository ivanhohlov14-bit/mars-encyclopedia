<h1 style="text-align:center;">📊 Моя статистика</h1>

<div id="stats-container" style="max-width: 900px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; position: relative; z-index: 1;">
    <p style="text-align: center; color: #999;">Загрузка...</p>
</div>

<style>
    /* ============================================================
       БАЗОВЫЕ СТИЛИ
       ============================================================ */
    .stat-card {
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(8px);
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        border: 1px solid #eaecf0;
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
    }
    .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    }
    .stat-card .stat-value {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.1;
    }
    .stat-card .stat-label {
        font-size: 0.85rem;
        color: #888;
        margin-top: 4px;
    }
    .stat-card .stat-icon {
        font-size: 1.4rem;
        margin-bottom: 6px;
    }

    /* ============================================================
       ИКОНКА ВОПРОСА С ПОДСКАЗКОЙ
       ============================================================ */
    .help-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #6C63FF;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: help;
        opacity: 0.7;
        transition: opacity 0.2s, transform 0.2s;
    }
    .help-icon:hover {
        opacity: 1;
        transform: scale(1.15);
    }
    .tooltip {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 8px;
        background: #2c3e50;
        color: #fff;
        padding: 10px 14px;
        border-radius: 8px;
        font-size: 0.8rem;
        line-height: 1.5;
        width: 240px;
        z-index: 100;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-5px);
        transition: all 0.2s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        pointer-events: none;
    }
    .tooltip::before {
        content: '';
        position: absolute;
        top: -6px;
        right: 12px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #2c3e50;
    }
    .help-icon:hover .tooltip,
    .help-icon:focus .tooltip,
    .help-icon.active .tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        pointer-events: auto;
    }

    /* ============================================================
       ТЕПЛОВАЯ КАРТА
       ============================================================ */
    .heatmap-wrapper { overflow-x: auto; padding: 8px 0; }
    .heatmap-grid {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(7, 12px);
        gap: 3px;
        min-width: 780px;
    }
    .heatmap-cell {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        background: #ebedf0;
        transition: transform 0.1s;
    }
    .heatmap-cell:hover {
        transform: scale(1.4);
        outline: 1px solid #333;
    }
    .heatmap-cell[data-level="1"] { background: #c6e48b; }
    .heatmap-cell[data-level="2"] { background: #7bc96f; }
    .heatmap-cell[data-level="3"] { background: #239a3b; }
    .heatmap-cell[data-level="4"] { background: #196127; }

    .heatmap-legend {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 4px;
        font-size: 0.75rem;
        color: #999;
        margin-top: 8px;
    }
    .heatmap-legend .cell { width: 10px; height: 10px; border-radius: 2px; }

    /* ============================================================
       РАНГ
       ============================================================ */
    .rank-badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        border-radius: 30px;
        font-size: 1.1rem;
        font-weight: 600;
        background: linear-gradient(135deg, #f39c12, #e74c3c);
        color: #fff;
        box-shadow: 0 4px 16px rgba(243, 156, 18, 0.4);
    }
    .rank-badge .rank-icon { font-size: 1.6rem; }

    /* ============================================================
       ЛЕНТА ДОСТИЖЕНИЙ
       ============================================================ */
    .achievement-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        border-radius: 8px;
        background: rgba(255,255,255,0.6);
        border-left: 3px solid #6C63FF;
        margin-bottom: 8px;
    }
    .achievement-item .ach-icon { font-size: 1.4rem; }
    .achievement-item .ach-text { flex: 1; font-size: 0.9rem; }
    .achievement-item .ach-date { font-size: 0.75rem; color: #999; }

    /* ============================================================
       АНИМАЦИИ
       ============================================================ */
    @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(108, 99, 255, 0.6); }
        50% { box-shadow: 0 0 20px 4px rgba(108, 99, 255, 0.4); }
    }
    .level-pulse { animation: pulseGlow 2s infinite; }

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .fade-in { animation: fadeInUp 0.5s ease; }

    /* ============================================================
       ТЁМНАЯ ТЕМА
       ============================================================ */
    @media (prefers-color-scheme: dark) {
        .stat-card {
            background: rgba(30, 30, 46, 0.92);
            border-color: #2a2a3a;
        }
        .stat-card .stat-label { color: #888; }
        .heatmap-cell { background: #2a2a3a; }
        .heatmap-cell[data-level="1"] { background: #0e4429; }
        .heatmap-cell[data-level="2"] { background: #006d32; }
        .heatmap-cell[data-level="3"] { background: #26a641; }
        .heatmap-cell[data-level="4"] { background: #39d353; }
        .achievement-item { background: rgba(30,30,46,0.6); }
    }

    /* ============================================================
       ФОН СТРАНИЦЫ (подстраивается под профиль)
       ============================================================ */
    #stats-bg-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 0;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        opacity: 0.25;
        pointer-events: none;
    }
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

// ============================================================
// 1. РАНГИ ПО УРОВНЮ
// ============================================================
const RANKS = [
    { minLevel: 1, icon: '🥚', name: 'Новичок',     color: '#95a5a6', gradient: ['#95a5a6', '#7f8c8d'] },
    { minLevel: 2, icon: '🚀', name: 'Исследователь',color: '#3498db', gradient: ['#3498db', '#2980b9'] },
    { minLevel: 3, icon: '⛏️', name: 'Поселенец',   color: '#27ae60', gradient: ['#27ae60', '#229954'] },
    { minLevel: 4, icon: '🏠', name: 'Колонизатор',  color: '#16a085', gradient: ['#16a085', '#138d75'] },
    { minLevel: 5, icon: '⚡', name: 'Командир базы',color: '#f39c12', gradient: ['#f39c12', '#d68910'] },
    { minLevel: 6, icon: '🌟', name: 'Хранитель',    color: '#9b59b6', gradient: ['#9b59b6', '#7d3c98'] },
    { minLevel: 8, icon: '👑', name: 'Легенда Марса',color: '#e74c3c', gradient: ['#e74c3c', '#c0392b'] },
    { minLevel: 10, icon: '🔥', name: 'Бессмертный', color: '#e67e22', gradient: ['#e67e22', '#ca6f1e'] }
];

function getRank(level) {
    let rank = RANKS[0];
    for (const r of RANKS) {
        if (level >= r.minLevel) rank = r;
    }
    return rank;
}

// ============================================================
// 2. ТЕКСТЫ ПОДСКАЗОК
// ============================================================
const HELP_TEXTS = {
    level: '⭐ <b>Уровень</b><br>Растёт автоматически при накоплении опыта. Каждый новый уровень открывает новый ранг и достижения.',
    xp: '💎 <b>Опыт (XP)</b><br>Начисляется за:<br>• чтение статей (+5 XP)<br>• прохождение викторин (+20 XP)<br>• посещение новых мест (+10 XP)<br>• ежедневный вход (+2 XP)',
    achievements: '🏆 <b>Достижения</b><br>Выдаются автоматически за:<br>• достижение уровней<br>• прохождение викторин<br>• исследование новых территорий<br>• серии посещений',
    places: '📍 <b>Посещено мест</b><br>Считаются уникальные статьи, которые вы открыли. За каждое новое место +10 XP.',
    seas: '🌊 <b>Найдено морей</b><br>Все водоёмы Марса: Ацидалийское, Аргида и другие. Найди их все, чтобы получить достижение «Мореплаватель».',
    quiz: '🧠 <b>Пройдено викторин</b><br>Викторины находятся в разделе «Интерактив». За каждую пройденную викторину +20 XP и шанс получить редкое достижение.'
};

// ============================================================
// 3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================
function animateValue(el, start, end, duration = 800) {
    if (!el) return;
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
            : d.count <= maxCount * 0.75 ? 3
            : 4;
        return `<div class="heatmap-cell" data-level="${level}" title="${d.date}: ${d.count} действий"></div>`;
    }).join('');

    return `
        <div class="heatmap-wrapper">
            <div class="heatmap-grid">${grid}</div>
        </div>
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

// Подсчёт стрика (дней подряд)
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

// Формирование ленты достижений
function buildAchievementsFeed(profile, achievements, visits) {
    const feed = [];
    const rank = getRank(profile.level);

    // Текущий ранг
    feed.push({
        icon: rank.icon,
        text: `${rank.name}!`,
        date: new Date().toLocaleDateString('ru-RU'),
        highlight: true
    });

    // Повышения уровня
    if (profile.level >= 5) feed.push({ icon: '⚡', text: 'Вы достигли 5 уровня — <b>Командир базы!</b>', date: '—' });
    if (profile.level >= 4) feed.push({ icon: '🏠', text: 'Вы достигли 4 уровня — <b>Колонизатор!</b>', date: '—' });
    if (profile.level >= 3) feed.push({ icon: '⛏️', text: 'Вы достигли 3 уровня — <b>Поселенец!</b>', date: '—' });
    if (profile.level >= 2) feed.push({ icon: '🚀', text: 'Вы достигли 2 уровня — <b>Исследователь!</b>', date: '—' });

    // Достижения из БД
    (achievements || []).slice(0, 3).forEach(a => {
        feed.push({
            icon: '🏅',
            text: `Получено достижение: <b>${a.achievement_id}</b>`,
            date: new Date(a.earned_at).toLocaleDateString('ru-RU')
        });
    });

    // Достижение «Марсианин»
    if (visits.length >= 5) {
        feed.push({ icon: '🏆', text: 'Получено достижение: <b>Марсианин!</b>', date: '—' });
    }

    return feed.slice(0, 6);
}

// ============================================================
// 4. ОСНОВНАЯ ЛОГИКА
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

        // ---- ФОН ИЗ ПРОФИЛЯ ----
        // Поддерживаемые поля: background_url, background, bg_image, theme_background
        const bgUrl = profile.background_url || profile.background || profile.bg_image || null;
        if (bgUrl) {
            const overlay = document.createElement('div');
            overlay.id = 'stats-bg-overlay';
            overlay.style.backgroundImage = `url('${bgUrl}')`;
            document.body.appendChild(overlay);
        }

        // ---- Достижения ----
        const { data: achievements } = await client
            .from('user_achievements')
            .select('achievement_id, earned_at')
            .eq('user_id', user.id)
            .order('earned_at', { ascending: false });

        // ---- Посещения ----
        let visits = [];
        try {
            const { data: v } = await client
                .from('user_visits')
                .select('place_id, place_type, visited_at')
                .eq('user_id', user.id);
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
        const stats = {
            experience: profile.experience || 0,
            level: profile.level || 1,
            achievements: achievements?.length || 0,
            placesVisited: new Set(visits.map(v => v.place_id)).size,
            seasFound: new Set(visits.filter(v => v.place_type === 'sea').map(v => v.place_id)).size,
            quizzesPassed: quizzes.length,
            registration: new Date(user.created_at).toLocaleDateString('ru-RU')
        };

        // Прогресс уровня
        const levelMap = [
            { level: 1, xp: 0 }, { level: 2, xp: 50 }, { level: 3, xp: 150 },
            { level: 4, xp: 350 }, { level: 5, xp: 700 }, { level: 6, xp: 1200 }
        ];
        let nextLevelXp = 50, currentLevelXp = 0;
        for (let i = levelMap.length - 1; i >= 0; i--) {
            if (stats.experience >= levelMap[i].xp) {
                currentLevelXp = levelMap[i].xp;
                nextLevelXp = (i < levelMap.length - 1) ? levelMap[i + 1].xp : stats.experience + 50;
                break;
            }
        }
        const progressPercent = Math.min(((stats.experience - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100, 100);

        // Ранг
        const rank = getRank(stats.level);

        // Тепловая карта + стрик
        const allActivity = [...(achievements || []), ...visits];
        const activityMap = groupByDate(allActivity);
        const streak = calcStreak(activityMap);

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

        // Лента достижений
        const achFeed = buildAchievementsFeed({ level: stats.level }, achievements, visits);

        // Следующее достижение
        let nextAchHint = 'Продолжайте исследовать Марс!';
        if (stats.quizzesPassed === 0) nextAchHint = '🧠 Пройдите первую викторину — получите достижение «Знаток»!';
        else if (stats.placesVisited < 10) nextAchHint = `📍 Посетите ещё ${10 - stats.placesVisited} мест — откроется «Путешественник»!`;
        else if (stats.seasFound < 3) nextAchHint = `🌊 Найдите ещё ${3 - stats.seasFound} моря — получите «Мореплаватель»!`;
        else if (stats.level < 5) nextAchHint = `⭐ Достигните 5 уровня — станете «Командиром базы»!`;
        else nextAchHint = '👑 Вы на пути к званию «Легенда Марса»!';

        // ============================================================
        // HTML-шаблон карточки
        // ============================================================
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
            <!-- Приветствие с рангом -->
            <div style="background: linear-gradient(135deg, ${rank.gradient[0]}, ${rank.gradient[1]}); padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; color: #fff; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -20px; right: -20px; font-size: 8rem; opacity: 0.15;">${rank.icon}</div>
                <h2 style="margin: 0; color: #fff; position: relative;">${displayName}</h2>
                <p style="margin: 4px 0 12px 0; opacity: 0.85; position: relative;">${user.email}</p>
                <div class="rank-badge" style="background: rgba(255,255,255,0.2); box-shadow: none; position: relative;">
                    <span class="rank-icon">${rank.icon}</span>
                    <span>${rank.name}</span>
                </div>
            </div>

            <!-- Стрик -->
            ${streak > 1 ? `
            <div style="background: linear-gradient(135deg, #e74c3c, #f39c12); padding: 14px 20px; border-radius: 12px; margin-bottom: 24px; color: #fff; display: flex; align-items: center; gap: 12px; box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);">
                <span style="font-size: 2rem;">🔥</span>
                <div>
                    <div style="font-size: 1.1rem; font-weight: 700;">${streak} ${streak < 5 ? 'дня' : 'дней'} подряд!</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">Продолжайте заходить каждый день — получите достижение «Постоянный»</div>
                </div>
            </div>` : ''}

            <!-- Крупные цифры -->
            <h3 style="color: #555; margin: 0 0 12px 0; font-size: 1.1rem;">🎯 Ваши достижения</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 28px;">
                ${card('level', '⭐', stats.level, 'Уровень', '#6C63FF', 'level')}
                ${card('xp', '💎', stats.experience, 'Опыт (XP)', '#f39c12', 'xp')}
                ${card('ach', '🏆', stats.achievements, 'Достижений', '#27ae60', 'achievements')}
                ${card('places', '📍', stats.placesVisited, 'Посещено мест', '#e74c3c', 'places')}
                ${card('seas', '🌊', stats.seasFound, 'Найдено морей', '#3498db', 'seas')}
                ${card('quiz', '🧠', stats.quizzesPassed, 'Пройдено викторин', '#8e44ad', 'quiz')}
            </div>

            <!-- Прогресс уровня -->
            <div style="background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 20px 24px; border-radius: 12px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #555; margin-bottom: 6px;">
                    <span>Прогресс до уровня ${stats.level + 1}</span>
                    <span>${Math.round(progressPercent)}%</span>
                </div>
                <div style="background: #e9ecef; border-radius: 10px; height: 14px; overflow: hidden;">
                    <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, ${rank.gradient[0]}, ${rank.gradient[1]}); border-radius: 10px; transition: width 0.8s;"></div>
                </div>
                <p style="font-size: 0.8rem; color: #999; margin: 6px 0 0 0;">
                    Осталось <b>${Math.max(nextLevelXp - stats.experience, 0)} XP</b> до следующего уровня
                </p>
            </div>

            <!-- Последние достижения -->
            <div style="background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 20px 24px; border-radius: 12px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <h3 style="margin: 0 0 16px 0; font-size: 1.1rem; color: #2c3e50;">🏅 Последние события</h3>
                ${achFeed.map(a => `
                    <div class="achievement-item">
                        <span class="ach-icon">${a.icon}</span>
                        <span class="ach-text">${a.text}</span>
                        <span class="ach-date">${a.date}</span>
                    </div>
                `).join('')}
            </div>

            <!-- Следующее достижение -->
            <div style="background: linear-gradient(135deg, #6C63FF, #a29bfe); padding: 16px 20px; border-radius: 12px; margin-bottom: 28px; color: #fff; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.8rem;">🎯</span>
                <div>
                    <div style="font-size: 0.85rem; opacity: 0.85; text-transform: uppercase; letter-spacing: 1px;">Следующая цель</div>
                    <div style="font-size: 1rem; font-weight: 600;">${nextAchHint}</div>
                </div>
            </div>

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

            <p style="margin-top: 20px; text-align: center;">
                <a href="/profile/" style="color: #6C63FF; text-decoration: none;">← Вернуться в профиль</a>
            </p>
        `;

        // ============================================================
        // Анимация счётчиков
        // ============================================================
        animateValue(document.getElementById('stat-level'), 0, stats.level);
        animateValue(document.getElementById('stat-xp'), 0, stats.experience);
        animateValue(document.getElementById('stat-ach'), 0, stats.achievements);
        animateValue(document.getElementById('stat-places'), 0, stats.placesVisited);
        animateValue(document.getElementById('stat-seas'), 0, stats.seasFound);
        animateValue(document.getElementById('stat-quiz'), 0, stats.quizzesPassed);

        // ============================================================
        // Графики
        // ============================================================
        new Chart(document.getElementById('statsChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Уровень', 'Опыт', 'Достижения', 'Места'],
                datasets: [{
                    label: 'Ваши показатели',
                    data: [stats.level, stats.experience, stats.achievements, stats.placesVisited],
                    backgroundColor: ['#6C63FF', '#f39c12', '#27ae60', '#e74c3c'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
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
                    plugins: {
                        legend: { position: 'bottom', labels: { padding: 12, font: { size: 12 } } }
                    },
                    cutout: '60%'
                }
            });
        } else {
            document.getElementById('interestChart').outerHTML =
                '<p style="text-align:center;color:#999;padding:40px 0;">Пока нет данных для отображения</p>';
        }

        // ============================================================
        // Мобильные подсказки (клик вместо hover)
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
