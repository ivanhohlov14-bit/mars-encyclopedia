<!-- docs/login.md -->
<h1>Вход</h1>

<p>Войдите в свой аккаунт, чтобы продолжить.</p>

<div style="max-width: 400px; margin: 0 auto;">
    <div style="margin-bottom: 15px;">
        <label for="login-email">Email</label>
        <input type="email" id="login-email" placeholder="ivan@example.com" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
    </div>
    <div style="margin-bottom: 15px;">
        <label for="login-password">Пароль</label>
        <input type="password" id="login-password" placeholder="Пароль" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
    </div>
    <button onclick="loginUser(document.getElementById('login-email').value, document.getElementById('login-password').value)" 
            style="width: 100%; padding: 12px; background: #6C63FF; color: #fff; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
        Войти
    </button>
    <p style="margin-top: 15px; text-align: center;">
        Нет аккаунта? <a href="/register/">Зарегистрироваться</a>
    </p>
</div>
</button>
