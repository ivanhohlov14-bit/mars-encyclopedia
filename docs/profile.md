<h1>Мой профиль</h1>

<div id="profile-container">
    <p>Загрузка...</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    if (typeof supabase === 'undefined') {
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки Supabase.</p>';
        return;
    }

    const client = supabase.createClient('https://ncytbgbjfoqmmgfygz.supabase.co', 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D');

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
            <div style="display: flex; align-items: center; gap: 20px;">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6C63FF&color=fff&size=80&rounded=true" 
                     alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #6C63FF;">
                <div>
                    <h2>${username}</h2>
                    <p>${user.email}</p>
                    <p style="font-size: 0.8rem; color: #666;">Зарегистрирован: ${new Date(user.created_at).toLocaleDateString('ru-RU')}</p>
                </div>
            </div>
            <hr>
            <a href="#" onclick="client.auth.signOut(); location.href='/'; return false;" style="color: #c0392b;">Выйти</a>
        `;
    });
});
</script>
