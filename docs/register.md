<h1>Регистрация</h1>

<form id="register-form" style="max-width: 400px; margin: 0 auto;">
    <div style="margin-bottom: 15px;">
        <label for="reg-email">Email</label>
        <input type="email" id="reg-email" placeholder="ivan@example.com" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
    </div>
    <div style="margin-bottom: 15px;">
        <label for="reg-username">Имя пользователя</label>
        <input type="text" id="reg-username" placeholder="Ваше имя" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
    </div>
    <div style="margin-bottom: 15px;">
        <label for="reg-password">Пароль</label>
        <input type="password" id="reg-password" placeholder="Минимум 6 символов" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
    </div>
    <div style="margin-bottom: 15px;">
        <input type="checkbox" id="consent" required>
        <label for="consent">Я принимаю <a href="/privacy/">политику конфиденциальности</a></label>
    </div>
    <button type="submit" style="width: 100%; padding: 12px; background: #6C63FF; color: #fff; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
        Зарегистрироваться
    </button>
</form>

<script>
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const consent = document.getElementById('consent').checked;

    if (!consent) {
        alert('Примите условия политики конфиденциальности');
        return;
    }

    if (typeof supabase === 'undefined') {
        alert('Ошибка загрузки Supabase. Попробуйте обновить страницу.');
        return;
    }

    const client = supabase.createClient('https://ncytbgbjfoqmmgfygz.supabase.co', 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D');

    client.auth.signUp({ 
        email, 
        password,
        options: { data: { username } }
    }).then(({ data, error }) => {
        if (error) {
            alert('Ошибка: ' + error.message);
            return;
        }
        alert('✅ Регистрация успешна! Проверьте почту для подтверждения.');
        window.location.href = '/profile/';
    });
});
</script>
