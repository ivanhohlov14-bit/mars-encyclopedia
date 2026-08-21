// docs/javascripts/auth-button.js

(function() {
    // --- Данные Supabase ---
    const SUPABASE_URL = "https://ncytbgbjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // --- Ждём загрузки Supabase SDK ---
    function initSupabase() {
        if (typeof supabase !== 'undefined') {
            window._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            renderButton();
        } else {
            setTimeout(initSupabase, 500);
        }
    }

    // --- Вставляем кнопку в заголовок ---
    function renderButton() {
        // Ищем заголовок сайта
        const header = document.querySelector('header');
        if (!header) {
            setTimeout(renderButton, 500);
            return;
        }

        // Создаём контейнер для кнопки
        const container = document.createElement('div');
        container.id = 'auth-btn-container';
        container.style.cssText = 'display: inline-flex; align-items: center; gap: 8px; margin-left: 15px;';

        // Вставляем в конец заголовка (после всех элементов)
        header.appendChild(container);

        // Проверяем пользователя
        window._supabase.auth.getSession().then(({ data }) => {
            const user = data?.session?.user;
            if (user) {
                const username = user.user_metadata?.username || user.email.split('@')[0];
                container.innerHTML = `
                    <span style="font-size: 0.8rem; color: #555;">${username}</span>
                    <a href="/profile/" style="color: #6C63FF; text-decoration: none; font-size: 0.85rem;">Профиль</a>
                    <a href="#" onclick="window._supabase.auth.signOut(); location.reload(); return false;" style="color: #c0392b; text-decoration: none; font-size: 0.85rem;">Выйти</a>
                `;
            } else {
                container.innerHTML = `
                    <a href="/login/" style="color: #555; text-decoration: none; font-size: 0.85rem;">Войти</a>
                    <a href="/register/" style="color: #fff; background: #6C63FF; padding: 4px 14px; border-radius: 16px; text-decoration: none; font-size: 0.85rem;">Регистрация</a>
                `;
            }
        });
    }

    // --- Запускаем ---
    if (document.readyState === 'complete') {
        initSupabase();
    } else {
        document.addEventListener('DOMContentLoaded', initSupabase);
    }
})();
