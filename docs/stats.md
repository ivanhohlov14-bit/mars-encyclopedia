<h1>📊 Моя статистика</h1>

<div id="stats-container" style="max-width: 800px; margin: 0 auto;">
    <p style="text-align: center; color: #999;">Загрузка...</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

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
                <p>⚠️ Вы не авторизованы.</p>
                <a href="/login/">Войти</a>
            `;
            return;
        }

        // Получаем профиль
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

        // Получаем достижения
        const { data: achievements, error: achError } = await client
            .from('user_achievements')
            .select('achievement_id, earned_at')
            .eq('user_id', user.id);

        const displayName = profile.display_name || profile.username || user.email.split('@')[0];

        // Данные для графиков
        const stats = {
            experience: profile.experience || 0,
            level: profile.level || 1,
            achievements: achievements?.length || 0,
            registration: new Date(user.created_at).toLocaleDateString('ru-RU')
        };

        // Прогресс до следующего уровня
        const levelMap = [
            { level: 1, xp: 0 },
            { level: 2, xp: 50 },
            { level: 3, xp: 150 },
            { level: 4, xp: 350 },
            { level: 5, xp: 700 },
            { level: 6, xp: 1200 }
        ];
        let nextLevelXp = 50;
        let currentLevelXp = 0;
        for (let i = levelMap.length - 1; i >= 0; i--) {
            if (stats.experience >= levelMap[i].xp) {
                currentLevelXp = levelMap[i].xp;
                nextLevelXp = (i < levelMap.length - 1) ? levelMap[i + 1].xp : stats.experience + 50;
                break;
            }
        }
        const progressPercent = Math.min(((stats.experience - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100, 100);

        document.getElementById('stats-container').innerHTML = `
            <!-- Приветствие -->
            <div style="background: #f8f9fa; padding: 20px 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; border: 1px solid #e9ecef;">
                <h2 style="margin: 0; color: #2c3e50;">${displayName}</h2>
                <p style="margin: 4px 0 0 0; color: #666;">${user.email}</p>
            </div>

            <!-- Карточки с цифрами -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <div style="background: #fff; padding: 16px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                    <div style="font-size: 1.8rem; font-weight: 600; color: #6C63FF;">${stats.level}</div>
                    <div style="font-size: 0.85rem; color: #999;">Уровень</div>
                </div>
                <div style="background: #fff; padding: 16px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                    <div style="font-size: 1.8rem; font-weight: 600; color: #f39c12;">${stats.experience}</div>
                    <div style="font-size: 0.85rem; color: #999;">Опыт (XP)</div>
                </div>
                <div style="background: #fff; padding: 16px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                    <div style="font-size: 1.8rem; font-weight: 600; color: #27ae60;">${stats.achievements}</div>
                    <div style="font-size: 0.85rem; color: #999;">Достижений</div>
                </div>
                <div style="background: #fff; padding: 16px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                    <div style="font-size: 1.8rem; font-weight: 600; color: #8e44ad;">${stats.registration}</div>
                    <div style="font-size: 0.85rem; color: #999;">На сайте с</div>
                </div>
            </div>

            <!-- Шкала прогресса -->
            <div style="background: #fff; padding: 20px 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #555; margin-bottom: 6px;">
                    <span>Прогресс до уровня ${profile.level + 1}</span>
                    <span>${Math.round(progressPercent)}%</span>
                </div>
                <div style="background: #e9ecef; border-radius: 10px; height: 12px; overflow: hidden;">
                    <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #6C63FF, #a29bfe); border-radius: 10px; transition: width 0.5s;"></div>
                </div>
                <p style="font-size: 0.8rem; color: #999; margin: 4px 0 0 0;">
                    Осталось ${nextLevelXp - stats.experience} XP до следующего уровня
                </p>
            </div>

            <!-- График -->
            <div style="background: #fff; padding: 20px 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaecf0;">
                <h3 style="margin: 0 0 16px 0; font-size: 1.1rem; color: #2c3e50;">📈 Активность</h3>
                <canvas id="statsChart" style="width: 100%; max-height: 250px;"></canvas>
            </div>

            <p style="margin-top: 20px; text-align: center;">
                <a href="/profile/" style="color: #6C63FF; text-decoration: none;">← Вернуться в профиль</a>
            </p>
        `;

        // Рисуем график
        const ctx = document.getElementById('statsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Уровень', 'Опыт', 'Достижения'],
                datasets: [{
                    label: 'Ваши показатели',
                    data: [stats.level, stats.experience, stats.achievements],
                    backgroundColor: ['#6C63FF', '#f39c12', '#27ae60'],
                    borderColor: ['#6C63FF', '#f39c12', '#27ae60'],
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('stats-container').innerHTML = '<p>⚠️ Ошибка загрузки статистики.</p>';
    });
});
</script>
