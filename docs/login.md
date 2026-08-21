<h1>Вход</h1>

<form id="login-form" style="max-width: 400px; margin: 0 auto;">
    <div style="margin-bottom: 15px;">
        <label for="login-email">Email</label>
        <input type="email" id="login-email" placeholder="ivan@example.com" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
    </div>
    <div style="margin-bottom: 15px;">
        <label for="login-password">Пароль</label>
        <input type="password" id="login-password" placeholder="Пароль" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
    </div>
    <button type="submit" style="width: 100%; padding: 12px; background: #6C63FF; color: #fff; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
        Войти
    </button>
</form>

<script>
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (typeof supabase === 'undefined') {
        alert('Ошибка загрузки Supabase. Попробуйте обновить страницу.');
        return;
    }

    const client = supabase.createClient('https://ncytbgbjfoqmmgfygz.supabase.co', 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D');

    client.auth.signInWithPassword({ email, password })
        .then(({ data, error }) => {
            if (error) {
                alert('Ошибка входа: ' + error.message);
                return;
            }
            alert('✅ Вход выполнен!');
            window.location.href = '/profile/';
        });
});
</script>
