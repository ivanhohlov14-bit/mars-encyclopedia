<h1>Моя статистика</h1>

<div id="stats-container">
    <p>Загрузка...</p>
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
            document.getElementById('stats-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля.</p>';
            return;
        }

        const displayName = profile.display_name || profile.username || user.email.split('@')[0];

        // Данные для графика (заглушка — можно будет заменить реальными данными)
        const stats = {
            labels: ['Чтение статей', 'Получено опыта', 'Достижения', 'Уровень'],
            values: [profile.experience, profile.experience, 5, profile.level]
        };

        document.getElementById('stats-container').innerHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2>${displayName}</h2>
                <p>Email: ${user.email}</p>
                <p>Уровень: ${profile.level} • Опыт: ${profile.experience}</p>
            </div>
            <div style="max-width: 600px; margin: 0 auto;">
                <canvas id="statsChart"></canvas>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <a href="/profile/" style="color: #6C63FF;">← Вернуться в профиль</a>
            </div>
        `;

        // Рисуем график
        const ctx = document.getElementById('statsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stats.labels,
                datasets: [{
                    label: 'Ваши показатели',
                    data: stats.values,
                    backgroundColor: ['#6C63FF', '#a29bfe', '#fd79a8', '#fdcb6e'],
                    borderColor: ['#6C63FF', '#a29bfe', '#fd79a8', '#fdcb6e'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('stats-container').innerHTML = '<p>⚠️ Ошибка загрузки статистики.</p>';
    });
});
</script>
