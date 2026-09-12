---
title: Все достижения
comments: false
---

<div id="ach-app" style="max-width: 1100px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: achSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка достижений...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes achSpin { to { transform: rotate(360deg); } }
@keyframes achFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes achPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes achFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes achShine {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.ach-fade { animation: achFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#ach-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   HERO
   ============================================================ */
.ach-hero {
    position: relative;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    border-radius: 24px;
    padding: 40px 36px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px -16px var(--kingdom-shadow);
}

.ach-hero::before {
    content: '';
    position: absolute;
    top: -60%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
    border-radius: 50%;
    animation: achFloat 8s ease-in-out infinite;
}

.ach-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.ach-hero-icon {
    font-size: 4rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.3));
    animation: achPulse 3s ease-in-out infinite;
}

.ach-hero-title {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
}

.ach-hero-sub {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0 0 24px 0;
}

.ach-hero-progress {
    max-width: 500px;
    margin: 0 auto;
}

.ach-progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    margin-bottom: 8px;
    opacity: 0.95;
    font-weight: 600;
}

.ach-progress-bar {
    background: rgba(255,255,255,0.25);
    border-radius: 12px;
    height: 16px;
    overflow: hidden;
    backdrop-filter: blur(8px);
    position: relative;
}

.ach-progress-fill {
    height: 100%;
    background: #fff;
    border-radius: 12px;
    transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 20px rgba(255,255,255,0.8);
    position: relative;
    overflow: hidden;
}

.ach-progress-fill::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    background-size: 200% 100%;
    animation: achShine 2s linear infinite;
}

/* ============================================================
   СТАТИСТИКА
   ============================================================ */
.ach-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
}

.ach-stat {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    padding: 20px 16px;
    border-radius: 16px;
    text-align: center;
    border: 2px solid transparent;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ach-stat:hover {
    transform: translateY(-6px);
    border-color: var(--kingdom-color);
    box-shadow: 0 16px 40px -8px var(--kingdom-shadow);
}

.ach-stat .ach-stat-icon {
    font-size: 1.8rem;
    margin-bottom: 8px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.ach-stat .ach-stat-value {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.ach-stat .ach-stat-label {
    font-size: 0.72rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-top: 6px;
    font-weight: 600;
}

/* ============================================================
   ФИЛЬТРЫ
   ============================================================ */
.ach-filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 24px;
    padding: 14px 18px;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
}

.ach-filter-btn {
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

.ach-filter-btn:hover {
    background: rgba(0,0,0,0.06);
    color: #333;
}

.ach-filter-btn.active {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
}

.ach-filter-search {
    flex: 1;
    min-width: 200px;
    padding: 10px 16px;
    border-radius: 30px;
    border: 2px solid rgba(0,0,0,0.08);
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    background: #fff;
    transition: border-color 0.2s;
}

.ach-filter-search:focus {
    border-color: var(--kingdom-color);
}

/* ============================================================
   СЕТКА ДОСТИЖЕНИЙ
   ============================================================ */
.ach-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
}

.ach-card {
    position: relative;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    border: 2px solid rgba(0,0,0,0.06);
    padding: 22px 22px 20px 22px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    animation: achFadeIn 0.5s ease both;
}

.ach-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--kingdom-color), var(--kingdom-light));
    opacity: 0;
    transition: opacity 0.3s;
}

.ach-card.earned {
    border-color: var(--kingdom-color);
    box-shadow: 0 8px 24px -8px var(--kingdom-shadow);
}

.ach-card.earned::before { opacity: 1; }

.ach-card.locked {
    opacity: 0.72;
    filter: grayscale(0.85);
}

.ach-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px -12px var(--kingdom-shadow);
    filter: none;
}

.ach-card:hover::before { opacity: 1; }

.ach-card-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 14px;
}

.ach-card-icon {
    font-size: 3rem;
    flex-shrink: 0;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
    transition: transform 0.3s;
}

.ach-card:hover .ach-card-icon {
    transform: scale(1.15) rotate(-8deg);
}

.ach-card.locked .ach-card-icon {
    filter: grayscale(1);
    opacity: 0.5;
}

.ach-card-body { flex: 1; min-width: 0; }

.ach-card-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
}

.ach-card-desc {
    font-size: 0.85rem;
    color: #777;
    line-height: 1.4;
    margin: 0;
}

.ach-card-status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    margin-top: 8px;
}

.ach-card.earned .ach-card-status {
    background: linear-gradient(135deg, #27ae60, #16a085);
    color: #fff;
}

.ach-card.locked .ach-card-status {
    background: rgba(0,0,0,0.06);
    color: #888;
}

.ach-card-earned-date {
    font-size: 0.72rem;
    color: #999;
    margin-top: 4px;
}

/* Прогресс-бар в карточке */
.ach-card-progress {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed rgba(0,0,0,0.08);
}

.ach-card-progress-text {
    display: flex;
    justify-content: space-between;
    font-size: 0.72rem;
    color: #888;
    margin-bottom: 6px;
    font-weight: 600;
}

.ach-card-progress-bar {
    height: 8px;
    border-radius: 4px;
    background: rgba(0,0,0,0.06);
    overflow: hidden;
}

.ach-card-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--kingdom-color), var(--kingdom-light));
    border-radius: 4px;
    transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 8px var(--kingdom-shadow);
}

/* ============================================================
   ПУСТОЕ СОСТОЯНИЕ
   ============================================================ */
.ach-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9));
    border-radius: 16px;
    border: 2px dashed rgba(108,99,255,0.2);
}

.ach-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.ach-empty-title { font-size: 1.1rem; font-weight: 700; color: #666; margin-bottom: 4px; }

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .ach-stat, .ach-card { background: rgba(30, 30, 46, 0.9); }
    .ach-card-title { color: #e0e0e0; }
    .ach-card-desc { color: #aaa; }
    .ach-card.locked { opacity: 0.6; }
    .ach-filter-search { background: #1a1a2a; color: #e0e0e0; border-color: #2a2a3a; }
    .ach-filters { background: rgba(30,30,46,0.7); }
    .ach-filter-btn { background: rgba(255,255,255,0.05); color: #aaa; }
    .ach-filter-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .ach-card-progress-bar { background: rgba(255,255,255,0.08); }
}

@media (max-width: 600px) {
    .ach-hero { padding: 24px 20px; }
    .ach-hero-title { font-size: 1.5rem; }
    .ach-hero-icon { font-size: 3rem; }
    .ach-grid { grid-template-columns: 1fr; }
    .ach-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .ach-card-icon { font-size: 2.4rem; }
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

    const LEVEL_MAP = [
        { level: 1, xp: 0 }, { level: 2, xp: 50 }, { level: 3, xp: 150 },
        { level: 4, xp: 350 }, { level: 5, xp: 700 }, { level: 6, xp: 1200 }
    ];

    function getUserLevel(xp) {
        let lvl = 1;
        for (const l of LEVEL_MAP) if (xp >= l.xp) lvl = l.level;
        return lvl;
    }

    const container = document.getElementById('ach-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let allAchievements = [];
    let userAchievements = new Set();
    let userStats = {};
    let activeFilter = 'all';
    let searchQuery = '';

    async function init() {
        const { data: { session } } = await client.auth.getSession();
        const user = session?.user;

        let profile = null;
        if (user) {
            const { data } = await client.from('profiles').select('*').eq('user_id', user.id).single();
            profile = data;
        }

        const kingdom = KINGDOMS[profile?.kingdom] || KINGDOMS['Эдем'];
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        // Все достижения
        const { data: all } = await client.from('achievements').select('*').order('id', { ascending: true });
        allAchievements = all || [];

        // Достижения пользователя
        if (user) {
            const { data: ua } = await client.from('user_achievements')
                .select('achievement_id, earned_at').eq('user_id', user.id);
            (ua || []).forEach(a => userAchievements.add(a.achievement_id));

            // Загружаем статистику для расчёта прогресса
            const { data: visits } = await client.from('user_visits')
                .select('place_id, place_type').eq('user_id', user.id);
            const uniquePlaces = new Set((visits || []).map(v => v.place_id));
            const uniqueSeas = new Set((visits || []).filter(v => v.place_type === 'sea').map(v => v.place_id));

            const { data: quizzes } = await client.from('user_quizzes')
                .select('quiz_id').eq('user_id', user.id).eq('passed', true);

            const { data: logins } = await client.from('daily_logins')
                .select('streak').eq('user_id', user.id)
                .order('login_date', { ascending: false }).limit(1);

            userStats = {
                xp: profile?.experience || 0,
                level: getUserLevel(profile?.experience || 0),
                articles: (visits || []).length,
                places: uniquePlaces.size,
                seas: uniqueSeas.size,
                quiz: (quizzes || []).length,
                streak: logins?.[0]?.streak || 0,
                achievements: userAchievements.size
            };
        }

        render();
    }

    // ============================================================
    // Расчёт прогресса
    // ============================================================
    function calcProgress(a) {
        const type = a.requirement_type;
        const target = a.requirement_value || 1;
        let current = 0;

        if (!currentUser) {
            return { current: 0, target, percent: 0 };
        }

        switch (type) {
            case 'xp': current = userStats.xp; break;
            case 'level': current = userStats.level; break;
            case 'articles': current = userStats.articles; break;
            case 'places': current = userStats.places; break;
            case 'seas': current = userStats.seas; break;
            case 'quiz': current = userStats.quiz; break;
            case 'streak': current = userStats.streak; break;
            case 'achievements': current = userStats.achievements; break;
            case 'start': current = currentUser ? 1 : 0; break;
            case 'quiz_perfect': current = userAchievements.has(a.id) ? 1 : 0; break;
            case 'scrolls': current = 0; break; // Заглушка
            case 'category': current = 0; break; // Заглушка
            default: current = 0;
        }

        const percent = Math.min((current / target) * 100, 100);
        return { current, target, percent };
    }

    let currentUser = null;

    // ============================================================
    // Рендер
    // ============================================================
    function render() {
        const earned = allAchievements.filter(a => userAchievements.has(a.id));
        const locked = allAchievements.filter(a => !userAchievements.has(a.id));
        const totalPercent = allAchievements.length > 0
            ? Math.round((earned.length / allAchievements.length) * 100)
            : 0;

        // Фильтрация
        let filtered = [...allAchievements];
        if (activeFilter === 'earned') filtered = filtered.filter(a => userAchievements.has(a.id));
        else if (activeFilter === 'locked') filtered = filtered.filter(a => !userAchievements.has(a.id));

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(a =>
                (a.name || '').toLowerCase().includes(q) ||
                (a.description || '').toLowerCase().includes(q)
            );
        }

        container.innerHTML = `
            <!-- HERO -->
            <div class="ach-hero ach-fade">
                <div class="ach-hero-content">
                    <div class="ach-hero-icon">🏆</div>
                    <h1 class="ach-hero-title">Галерея достижений</h1>
                    <p class="ach-hero-sub">${currentUser ? 'Собери все достижения Марса!' : 'Войдите, чтобы отслеживать прогресс'}</p>
                    <div class="ach-hero-progress">
                        <div class="ach-progress-info">
                            <span>${earned.length} из ${allAchievements.length} получено</span>
                            <span>${totalPercent}%</span>
                        </div>
                        <div class="ach-progress-bar">
                            <div class="ach-progress-fill" style="width: ${totalPercent}%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- СТАТИСТИКА -->
            <div class="ach-stats-grid ach-fade" style="animation-delay: 0.1s;">
                <div class="ach-stat">
                    <div class="ach-stat-icon">🏆</div>
                    <div class="ach-stat-value">${earned.length}</div>
                    <div class="ach-stat-label">Получено</div>
                </div>
                <div class="ach-stat">
                    <div class="ach-stat-icon">🔒</div>
                    <div class="ach-stat-value">${locked.length}</div>
                    <div class="ach-stat-label">Осталось</div>
                </div>
                <div class="ach-stat">
                    <div class="ach-stat-icon">📊</div>
                    <div class="ach-stat-value">${totalPercent}%</div>
                    <div class="ach-stat-label">Прогресс</div>
                </div>
                <div class="ach-stat">
                    <div class="ach-stat-icon">👑</div>
                    <div class="ach-stat-value">${allAchievements.length}</div>
                    <div class="ach-stat-label">Всего</div>
                </div>
            </div>

            <!-- ФИЛЬТРЫ -->
            <div class="ach-filters ach-fade" style="animation-delay: 0.15s;">
                <button class="ach-filter-btn ${activeFilter==='all'?'active':''}" onclick="achSetFilter('all')">🌐 Все</button>
                <button class="ach-filter-btn ${activeFilter==='earned'?'active':''}" onclick="achSetFilter('earned')">✅ Полученные</button>
                <button class="ach-filter-btn ${activeFilter==='locked'?'active':''}" onclick="achSetFilter('locked')">🔒 Закрытые</button>
                <input class="ach-filter-search" type="text" placeholder="🔍 Поиск достижения..." value="${searchQuery}" oninput="achSearch(this.value)">
            </div>

            <!-- СЕТКА -->
            ${filtered.length === 0 ? `
                <div class="ach-empty">
                    <div class="ach-empty-icon">🔍</div>
                    <div class="ach-empty-title">Ничего не найдено</div>
                </div>
            ` : `
                <div class="ach-grid">
                    ${filtered.map((a, i) => renderAchievementCard(a, i)).join('')}
                </div>
            `}
        `;
    }

    function renderAchievementCard(a, index) {
        const isEarned = userAchievements.has(a.id);
        const progress = calcProgress(a);
        const earnedData = isEarned ? { earned_at: null } : null;

        return `
            <div class="ach-card ${isEarned ? 'earned' : 'locked'}" style="animation-delay: ${index * 0.03}s;">
                <div class="ach-card-header">
                    <div class="ach-card-icon">${a.icon || '🏅'}</div>
                    <div class="ach-card-body">
                        <h3 class="ach-card-title">${a.name || 'Достижение'}</h3>
                        <p class="ach-card-desc">${a.description || 'Описание отсутствует'}</p>
                        <span class="ach-card-status">
                            ${isEarned ? '✅ Получено' : '🔒 Закрыто'}
                        </span>
                    </div>
                </div>
                ${!isEarned && currentUser ? `
                    <div class="ach-card-progress">
                        <div class="ach-card-progress-text">
                            <span>${a.requirement || 'Прогресс'}</span>
                            <span>${progress.current} / ${progress.target}</span>
                        </div>
                        <div class="ach-card-progress-bar">
                            <div class="ach-card-progress-fill" style="width: ${progress.percent}%;"></div>
                        </div>
                    </div>
                ` : ''}
                ${isEarned ? `
                    <div class="ach-card-earned-date">Получено достижение</div>
                ` : !currentUser ? `
                    <div class="ach-card-earned-date" style="color: var(--kingdom-color); font-weight: 600; cursor: pointer;" onclick="window.location.href='/login/'">
                        Войдите, чтобы увидеть прогресс →
                    </div>
                ` : ''}
            </div>
        `;
    }

    // ============================================================
    // Экспорт
    // ============================================================
    window.achSetFilter = function(f) {
        activeFilter = f;
        render();
    };

    let searchTimer;
    window.achSearch = function(v) {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            searchQuery = v;
            render();
        }, 200);
    };

    // Перезапуск при init
    const origInit = init;
    init = async function() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        let profile = null;
        if (currentUser) {
            const { data } = await client.from('profiles').select('*').eq('user_id', currentUser.id).single();
            profile = data;
        }

        const kingdom = KINGDOMS[profile?.kingdom] || KINGDOMS['Эдем'];
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        const { data: all } = await client.from('achievements').select('*').order('id', { ascending: true });
        allAchievements = all || [];

        if (currentUser) {
            const { data: ua } = await client.from('user_achievements')
                .select('achievement_id').eq('user_id', currentUser.id);
            userAchievements = new Set((ua || []).map(a => a.achievement_id));

            const { data: visits } = await client.from('user_visits')
                .select('place_id, place_type').eq('user_id', currentUser.id);
            const uniquePlaces = new Set((visits || []).map(v => v.place_id));
            const uniqueSeas = new Set((visits || []).filter(v => v.place_type === 'sea').map(v => v.place_id));

            const { data: quizzes } = await client.from('user_quizzes')
                .select('quiz_id').eq('user_id', currentUser.id).eq('passed', true);

            const { data: logins } = await client.from('daily_logins')
                .select('streak').eq('user_id', currentUser.id)
                .order('login_date', { ascending: false }).limit(1);

            userStats = {
                xp: profile?.experience || 0,
                level: getUserLevel(profile?.experience || 0),
                articles: (visits || []).length,
                places: uniquePlaces.size,
                seas: uniqueSeas.size,
                quiz: (quizzes || []).length,
                streak: logins?.[0]?.streak || 0,
                achievements: userAchievements.size
            };
        }

        render();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
