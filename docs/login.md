<!-- docs/login.md -->

<h1>Вход и регистрация</h1>

<h2>Регистрация</h2>
<input type="email" id="reg-email" placeholder="Email">
<input type="password" id="reg-password" placeholder="Пароль">
<button onclick="register(document.getElementById('reg-email').value, document.getElementById('reg-password').value)">
  Зарегистрироваться
</button>

<h2>Вход</h2>
<input type="email" id="login-email" placeholder="Email">
<input type="password" id="login-password" placeholder="Пароль">
<button onclick="login(document.getElementById('login-email').value, document.getElementById('login-password').value)">
  Войти
</button>
