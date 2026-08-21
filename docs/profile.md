<h1>Мой профиль</h1>

<div id="profile-container">
    <p>Загрузка...</p>
</div>

<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

document.addEventListener('DOMContentLoaded', function() {
    if (typeof supabase === 'undefined') {
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки Supabase. Попробуйте обновить страницу.</p>';
        return;
    }

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        if (!user) {
            document.getElementById('profile-container').innerHTML = `
                <p>⚠️ Вы не авторизованы.</p>
                <a href="/login/">Войти</a>
            `;
            return;
        }

        const username = user.user_metadata?.username || user.email.split('@')[0];
        document.getElementById('profile-container').innerHTML = `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6C63FF&color=fff&size=80&rounded=true" 
                     alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #6C63FF;">
                <div>
                    <h2 style="margin: 0;">${username}</h2>
                    <p style="margin: 0; color: #666;">${user.email}</p>
                    <p style="margin: 0; color: #666; font-size: 0.85rem;">Зарегистрирован: ${new Date(user.created_at).toLocaleDateString('ru-RU')}</p>
                </div>
            </div>
            <hr>
            <p><a href="#" onclick="client.auth.signOut(); location.href='/'; return false;" style="color: #c0392b;">Выйти</a></p>
        `;
    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля. Попробуйте обновить страницу.</p>';
    });
});
</script>
