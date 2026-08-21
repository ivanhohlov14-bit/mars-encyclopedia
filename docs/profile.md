<!-- docs/profile.md -->
<h1>Мой профиль</h1>

<div id="profile-container">
    <p>Загрузка данных...</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    if (!window.supabase) {
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки Supabase. Попробуйте обновить страницу.</p>';
        return;
    }
    
    window.supabase.auth.getSession().then(({ data, error }) => {
        if (error || !data?.session?.user) {
            document.getElementById('profile-container').innerHTML = `
                <p>⚠️ Вы не авторизованы.</p>
                <a href="/login/" style="color: #6C63FF;">Войти</a>
            `;
            return;
        }
        
        const user = data.session.user;
        const username = user.user_metadata?.username || user.email.split('@')[0];
        
        document.getElementById('profile-container').innerHTML = `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <img src="https://ui-avatars.com/api/?name=${username}&background=6C63FF&color=fff&size=100&rounded=true" 
                     alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #6C63FF;">
                <div>
                    <h2 style="margin: 0;">${username}</h2>
                    <p style="margin: 0; color: #666;">${user.email}</p>
                    <p style="margin: 0; color: #666; font-size: 0.85rem;">Зарегистрирован: ${new Date(user.created_at).toLocaleDateString('ru-RU')}</p>
                </div>
            </div>
            <p>Здесь вы сможете редактировать свой профиль, добавлять аватар и управлять настройками в будущем.</p>
            <hr>
            <p><a href="/logout/" onclick="logoutUser(); return false;" style="color: #c0392b;">Выйти</a></p>
        `;
    });
});
</script>
