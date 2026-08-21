<!-- docs/register.md -->
<h1>Регистрация</h1>

<p>Создайте аккаунт, чтобы сохранять свои статьи и участвовать в жизни энциклопедии.</p>

<div style="max-width: 400px; margin: 0 auto;">
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
    <button onclick="registerUser(document.getElementById('reg-email').value, document.getElementById('reg-password').value, document.getElementById('reg-username').value)" 
            style="width: 100%; padding: 12px; background: #6C63FF; color: #fff; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
        Зарегистрироваться
    </button>
    <p style="margin-top: 15px; text-align: center;">
        Уже есть аккаунт? <a href="/login/">Войти</a>
    </p>
</div>
