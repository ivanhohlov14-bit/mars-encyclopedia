<h1 style="text-align:center;">📊 Моя статистика</h1>

<div id="stats-container" style="max-width: 900px; margin: 0 auto; font-family: 'Segoe UI', sans-serif;">
    <p style="text-align: center; color: #999;">Загрузка...</p>
</div>

<style>
    /* Стили для статистики */
    .stat-card {
        background: #fff;
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        border: 1px solid #eaecf0;
        transition: transform 0.2s, box-shadow 0.2s;
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

    /* Тепловая карта */
    .heatmap-wrapper {
        overflow-x: auto;
        padding: 8px 0;
    }
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
    .heatmap-legend .cell {
        width: 10px;
        height: 10px;
        border-radius: 2px;
    }

    /* Тёмная тема */
    @media (prefers-color-scheme: dark) {
        .stat-card {
            background: #1e1e2e;
            border-color: #2a2a3a;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .stat-card .stat-label { color: #888; }
        .heatmap-cell { background: #2a2a3a; }
        .heatmap-cell[data-level="1"] { background: #0e4429; }
        .heatmap-cell[data-level="2"] { background: #006d32; }
        .heatmap-cell[data-level="3"] { background: #26a641; }
        .heatmap-cell[data-level="4"] { background: #39d353; }
    }
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

// ============================================================
// Вспомогательные функции
// ============================================================
function animateValue(el, start, end, duration = 800) {
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

// Превращаем массив дат в объект { 'YYYY-MM-DD': count }
function groupByDate(items) {
    const map = {};
    items.forEach(item => {
        const date = (item.visited_at || item.earned_at || item.created_at || '').slice(0, 10);
        if (date) map[date] = (map[date] || 0) + 1;
    });
    return map;
}

// Строим тепловую карту за последние 365 дней
function renderHeatmap(activityMap) {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    // Начинаем с воскресенья той недели
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
        const title = `${d.date}: ${d.count} действий`;
        return `<div class="heatmap-cell" data-level="${level}" title="${title}"></div>`;
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

// ============================================================
// Основная логика
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

        // ---- Достижения ----
        const { data: achievements } = await client
            .from('user_achievements')
            .select('achievement_id, earned_at')
            .eq('user_id', user.id);

        // ---- Посещения (новая таблица user_visits) ----
        // Если таблицы нет — вернёт пустой массив, и счётчики будут 0
        let visits = [];
        try {
            const { data: v } = await client
                .from('user_visits')
                .select('place_id, place_type, visited_at')
                .eq('user_id', user.id);
            visits = v || [];
        } catch (e) { console.warn('user_visits недоступна', e); }

        // ---- Викторины (новая таблица user_quizzes) ----
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

        // Тепловая карта
        const allActivity = [...(achievements || []), ...visits];
        const activityMap = groupByDate(allActivity);

        // Распределение интересов (для пончика)
        const interestMap = {};
        visits.forEach(v => {
            const key = v.place_type || 'other';
            interestMap[key] = (interestMap[key] || 0) + 1;
        });
        const interestLabels = {
            'sea': '🌊 Моря',
            'city': '🏙️ Города',
            'temple': '🏛️ Храмы',
            'cave': '🏔️ Пещеры',
            'character': '👤 Персонажи',
            'other': '📦 Прочее'
        };
        const interestKeys = Object.keys(interestMap);
        const interestData = interestKeys.map(k => interestMap[k]);
        const interestColors = ['#6C63FF', '#f39c12', '#27ae60', '#e74c3c', '#8e44ad', '#95a5a6'];

        // ============================================================
        // Рендер HTML
        // ============================================================
        document.getElementById('stats-container').innerHTML = `
            <!-- Приветствие -->
            <div style="background: linear-gradient(135deg, #6C63FF 0%, #a29bfe 100%); padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; color: #fff;">
                <h2 style="margin: 0; color: #fff;">${displayName}</h2>
                <p style="margin: 4px 0 0 0; opacity: 0.85;">${user.email}</p>
            </div>

            <!-- Крупные цифры -->
            <h3 style="color: #555; margin: 0 0 12px 0; font-size: 1.1rem;">🎯 Ваши достижения</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 28px;">
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value" style="color:#6C63FF;" id="stat-level">${stats.level}</div>
                    <div class="stat-label">Уровень</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-value" style="color:#f39c12;" id="stat-xp">${stats.experience}</div>
                    <div class="stat-label">Опыт (XP)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value" style="color:#27ae60;" id="stat-ach">${stats.achievements}</div>
                    <div class="stat-label">Достижений</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-value" style="color:#e74c3c;" id="stat-places">${stats.placesVisited}</div>
                    <div class="stat-label">Посещено мест</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🌊</div>
                    <div class="stat-value" style="color:#3498db;" id="stat-seas">${stats.seasFound}</div>
                    <div class="stat-label">Найдено морей</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🧠</div>
                    <div class="stat-value" style="color:#8e44ad;" id="stat-quiz">${stats.quizzesPassed}</div>
                    <div class="stat-label">Пройдено викторин</div>
                </div>
            </div>

            <!-- Прогресс до уровня -->
            <div style="background: #fff; padding: 20px 24px; border-radius: 12px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #555; margin-bottom: 6px;">
                    <span>Прогресс до уровня ${profile.level + 1}</span>
                    <span>${Math.round(progressPercent)}%</span>
                </div>
                <div style="background: #e9ecef; border-radius: 10px; height: 14px; overflow: hidden;">
                    <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #6C63FF, #a29bfe); border-radius: 10px; transition: width 0.8s;"></div>
                </div>
                <p style="font-size: 0.8rem; color: #999; margin: 6px 0 0 0;">
                    Осталось <b>${Math.max(nextLevelXp - stats.experience, 0)} XP</b> до следующего уровня
                </p>
            </div>

            <!-- Тепловая карта активности -->
            <div style="background: #fff; padding: 20px 24px; border-radius: 12px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <h3 style="margin: 0 0 4px 0; font-size: 1.1rem; color: #2c3e50;">🔥 Карта активности</h3>
                <p style="font-size: 0.8rem; color: #999; margin: 0 0 16px 0;">Каждый квадратик — один день за последний год</p>
                ${renderHeatmap(activityMap)}
            </div>

            <!-- Графики -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
                <div style="background: #fff; padding: 20px 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                    <h3 style="margin: 0 0 16px 0; font-size: 1.1rem; color: #2c3e50;">📈 Общие показатели</h3>
                    <canvas id="statsChart" style="width:100%; max-height:250px;"></canvas>
                </div>
                <div style="background: #fff; padding: 20px 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
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
        // График 1: Общие показатели
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

        // ============================================================
        // График 2: Пончик интересов
        // ============================================================
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

    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('stats-container').innerHTML = '<p>⚠️ Ошибка загрузки статистики.</p>';
    });
});
</script>
