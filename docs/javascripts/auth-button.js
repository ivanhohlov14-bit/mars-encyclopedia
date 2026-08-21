// docs/javascripts/auth-button.js
console.log('✅ auth-button.js загружен');

(function() {
    // --- Данные Supabase ---
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    let supabaseClient = null;

    // --- Инициализация Supabase ---
    function initSupabase() {
        if (typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('✅ Supabase инициализирован');
            renderButton();
        } else {
            console.log('⏳ Ожидание загрузки Supabase...');
            setTimeout(initSupabase, 500);
        }
    }

    // --- Вставляем кнопку в заголовок ---
    function renderButton() {
        // Для темы readthedocs ищем правильный контейнер
        let container = document.getElementById('auth-btn-container');
        if (container) {
            // Если контейнер уже существует, обновляем его
            updateAuthUI(container);
            return;
        }

        // Ищем заголовок (для readthedocs)
        let header = document.querySelector('header');
        if (!header) {
            // Пробуем найти через класс readthedocs
            header = document.querySelector('.wy-nav-content-wrap');
            if (!header) {
                console.warn('⚠️ Заголовок не найден, повторная попытка...');
                setTimeout(renderButton, 500);
                return;
            }
        }

        // Создаём контейнер для кнопки
        container = document.createElement('div');
        container.id = 'auth-btn-container';
        container.style.cssText = 'display: inline-flex; align-items: center; gap: 8px; float: right; margin-top: 8px; margin-right: 20px;';

        // Вставляем в начало заголовка (чтобы было видно)
        if (header.tagName === 'HEADER') {
            // Вставляем в конец header
            header.appendChild(container);
        } else {
            // Вставляем в начало .wy-nav-content-wrap
            header.prepend(container);
        }

        console.log('✅ Контейнер для кнопки создан');

        // Обновляем UI
        updateAuthUI(container);
    }

    // --- Обновление UI (проверка пользователя) ---
    function updateAuthUI(container) {
        if (!container) {
            container = document.getElementById('auth-btn-container');
            if (!container) return;
        }

        if (!supabaseClient) {
            container.innerHTML = `
                <span style="color: #999; font-size: 0.8rem;">Загрузка...</span>
            `;
            return;
        }

        supabaseClient.auth.getSession().then(({ data }) => {
            const user = data?.session?.user;
            console.log('👤 Пользователь:', user ? user.email : 'не авторизован');

            if (user) {
                const username = user.user_metadata?.username || user.email.split('@')[0];
                container.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px; background: #f5f5f5; padding: 4px 12px; border-radius: 20px;">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6C63FF&color=fff&size=24&rounded=true" 
                             alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #ddd;">
                        <span style="font-size: 0.8rem; color: #333; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            ${username}
                        </span>
                        <a href="/profile/" style="color: #6C63FF; text-decoration: none; font-size: 0.8rem;">Профиль</a>
                        <a href="#" onclick="window._supabaseClient = supabaseClient; supabaseClient.auth.signOut(); location.reload(); return false;" 
                           style="color: #c0392b; text-decoration: none; font-size: 0.8rem;">Выйти</a>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <a href="/login/" style="color: #555; text-decoration: none; font-size: 0.85rem;">Войти</a>
                        <a href="/register/" style="color: #fff; background: #6C63FF; padding: 4px 14px; border-radius: 16px; text-decoration: none; font-size: 0.85rem;">Регистрация</a>
                    </div>
                `;
            }
        }).catch((error) => {
            console.error('❌ Ошибка проверки сессии:', error);
            container.innerHTML = `
                <span style="color: #999; font-size: 0.8rem;">Ошибка</span>
            `;
        });
    }

    // --- Запускаем ---
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSupabase();
    } else {
        document.addEventListener('DOMContentLoaded', initSupabase);
    }

    // --- Перепроверяем через 2 секунды (на всякий случай) ---
    setTimeout(function() {
        const container = document.getElementById('auth-btn-container');
        if (!container) {
            console.log('🔄 Повторная попытка вставки кнопки...');
            renderButton();
        }
    }, 2000);

    // --- Сохраняем клиент в window для использования в других скриптах ---
    window._supabaseClient = supabaseClient;

})();

console.log('✅ auth-button.js выполнен');
