javascript
// docs/javascripts/supabase-auth.js

// Замените на ваши реальные данные из Settings → API
const SUPABASE_URL = "https://ВАШ_ПРОЕКТ.supabase.co";
const SUPABASE_KEY = "sb_publishable_ВАШ_КЛЮЧ";

// Загружаем Supabase SDK
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
script.onload = function() {
    window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Supabase загружен!');
};
document.head.appendChild(script);

// Функции регистрации и входа
function registerUser() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    window.supabase.auth.signUp({ email, password })
        .then(response => {
            if (response.error) {
                alert('Ошибка: ' + response.error.message);
            } else {
                alert('Регистрация успешна! Проверьте почту для подтверждения.');
                console.log('Пользователь:', response.data);
            }
        });
}

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    window.supabase.auth.signInWithPassword({ email, password })
        .then(response => {
            if (response.error) {
                alert('Ошибка: ' + response.error.message);
            } else {
                alert('Вход выполнен!');
                console.log('Пользователь:', response.data);
            }
        });
}

// Делаем функции глобальными
window.registerUser = registerUser;
window.loginUser = loginUser;
