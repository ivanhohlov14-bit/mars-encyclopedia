// docs/javascripts/auth-ui.js

// Данные Supabase — замените на свои
const SUPABASE_URL = "https://ncytbgbjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

// Инициализация Supabase
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
script.onload = function() {
    window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Supabase загружен');
    checkUser();
};
document.head.appendChild(script);

// --- Хранилище состояния пользователя ---
let currentUser = null;

// --- Проверка текущего пользователя ---
function checkUser() {
    if (!window.supabase) return;
    window.supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
            console.error('Ошибка проверки сессии:', error);
            return;
        }
        if (data?.session?.user) {
            currentUser = data.session.user;
            updateUI();
        } else {
            currentUser = null;
            updateUI();
        }
    });
}

// --- Обновление интерфейса ---
function updateUI() {
    const container = document.getElementById('auth-container');
    if (!container) return;

    if (currentUser) {
        // Пользователь залогинен
        container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; position: relative;">
                <a href="/profile/" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: #333;">
                    <img src="https://ui-avatars.com/api/?name=${currentUser.email}&background=6C63FF&color=fff&size=32&rounded=true" 
                         alt="Avatar" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #ddd;">
                    <span style="font-size: 0.85rem; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${currentUser.email}
                    </span>
                </a>
                <button onclick="logoutUser()" style="background: none; border: none; color: #c0392b; cursor: pointer; font-size: 0.85rem;">
                    Выйти
                </button>
            </div>
        `;
    } else {
        // Пользователь не залогинен
        container.innerHTML = `
            <div style="display: flex; gap: 12px; align-items: center;">
                <a href="/login/" style="color: #333; text-decoration: none; font-size: 0.9rem;">Войти</a>
                <a href="/register/" style="color: #fff; background: #6C63FF; padding: 6px 16px; border-radius: 20px; text-decoration: none; font-size: 0.9rem;">Регистрация</a>
            </div>
        `;
    }
}

// --- Выход ---
function logoutUser() {
    if (!window.supabase) return;
    window.supabase.auth.signOut().then(() => {
        currentUser = null;
        updateUI();
        window.location.reload();
    });
}

// --- Глобальные функции для входа и регистрации ---
window.loginUser = function(email, password) {
    if (!window.supabase) return;
    window.supabase.auth.signInWithPassword({ email, password })
        .then(({ data, error }) => {
            if (error) {
                alert('Ошибка входа: ' + error.message);
                return;
            }
            currentUser = data.user;
            updateUI();
            alert('✅ Вход выполнен!');
            window.location.href = '/profile/';
        });
};

window.registerUser = function(email, password, username) {
    if (!window.supabase) return;
    window.supabase.auth.signUp({ 
        email, 
        password,
        options: {
            data: { username: username || email.split('@')[0] }
        }
    }).then(({ data, error }) => {
        if (error) {
            alert('Ошибка регистрации: ' + error.message);
            return;
        }
        alert('✅ Регистрация успешна! Проверьте почту для подтверждения.');
        currentUser = data.user;
        updateUI();
        window.location.href = '/profile/';
    });
};

// --- Глобальные функции для доступа из HTML ---
window.checkUser = checkUser;
window.logoutUser = logoutUser;
window.updateUI = updateUI;

// --- Вызываем проверку при загрузке страницы ---
document.addEventListener('DOMContentLoaded', function() {
    checkUser();
});
