<h1>Профиль пользователя</h1>

<div id="profile-container">
    <p>Загрузка...</p>
</div>

<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

// Получаем ID пользователя из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

if (!userId) {
    document.getElementById('profile-container').innerHTML = '<p>⚠️ Пользователь не найден.</p>';
} else {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    client
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
        .then(({ data: profile, error }) => {
            if (error || !profile) {
                document.getElementById('profile-container').innerHTML = '<p>⚠️ Пользователь не найден.</p>';
                return;
            }

            const displayName = profile.display_name || profile.username || 'Аноним';
            const avatar = profile.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(displayName) + '&background=6C63FF&color=fff&size=128';

            document.getElementById('profile-container').innerHTML = `
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                    <img src="${avatar}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid #6C63FF; object-fit: cover;">
                    <div>
                        <h2 style="margin: 0;">${displayName}</h2>
                        <p style="margin: 0; color: #666;">Уровень: ${profile.level || 1}</p>
                        <p style="margin: 0; color: #666;">Опыт: ${profile.experience || 0}</p>
                        ${profile.bio ? `<p style="margin: 4px 0 0 0; font-style: italic;">${profile.bio}</p>` : ''}
                    </div>
                </div>
                <button onclick="alert('Функция добавления в друзья будет доступна позже!')" 
                        style="padding: 8px 20px; background: #6C63FF; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
                    ➕ Добавить в друзья
                </button>
                <p style="margin-top: 20px;"><a href="/profile/">← Вернуться в свой профиль</a></p>
            `;
        });
}
</script>
