// docs/javascripts/auth-button.js

console.log('✅ auth-button.js загружен');

(function() {
    // --- ПРАВИЛЬНЫЕ ДАННЫЕ SUPABASE ---
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
        let container = document.getElementById('auth-btn-container');
        if (container) {
            updateAuthUI(container);
            return;
        }

        // Ищем заголовок (для readthedocs)
        let header = document.querySelector('header');
        if (!header) {
            header = document.querySelector('.wy-nav-content-wrap');
            if (!header) {
                console.warn('⚠️ Заголовок не найден, повторная попытка...');
                setTimeout(renderButton, 500);
                return;
            }
        }

        container = document.createElement('div');
        container.id = 'auth-btn-container';
        container.style.cssText = 'display: inline-flex; align-items: center; gap: 8px; float: right; margin-top: 8px; margin-right: 20px;';

        if (header.tagName === 'HEADER') {
            header.appendChild(container);
        } else {
            header.prepend(container);
        }

        console.log('✅ Контейнер для кнопки создан');
        updateAuthUI(container);
    }

    // --- Обновление UI ---
    function updateAuthUI(container) {
        if (!container) {
            container = document.getElementById('auth-btn-container');
            if (!container) return;
        }

        if (!supabaseClient) {
            container.innerHTML = `<span style="color: #999; font-size: 0.8rem;">Загрузка...</span>`;
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
                        <a href="#" onclick="logoutUser(); return false;" 
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
            container.innerHTML = `<span style="color: #999; font-size: 0.8rem;">Ошибка</span>`;
        });
    }

    // --- Функция выхода (исправленная) ---
    function logoutUser() {
        console.log('🔄 Попытка выхода...');
        
        if (!supabaseClient) {
            console.warn('⚠️ Supabase не инициализирован, очищаем локальные данные');
            clearLocalSession();
            return;
        }

        // Пытаемся выйти через Supabase
        supabaseClient.auth.signOut()
            .then(() => {
                console.log('✅ Выход выполнен через Supabase');
                clearLocalSession();
                location.reload();
            })
            .catch((error) => {
                console.error('❌ Ошибка выхода:', error);
                
                // Если ошибка 403 или "user not found" — пользователь уже удалён на сервере
                if (error?.status === 403 || 
                    error?.message?.includes('does not exist') ||
                    error?.message?.includes('not found') ||
                    error?.message?.includes('invalid')) {
                    console.log('👤 Пользователь уже удалён, очищаем локальную сессию');
                    clearLocalSession();
                    location.reload();
                } else {
                    // Другие ошибки — пробуем принудительную очистку
                    console.warn('⚠️ Неизвестная ошибка, пробуем принудительную очистку');
                    clearLocalSession();
                    location.reload();
                }
            });
    }

    // --- Очистка локальной сессии ---
    function clearLocalSession() {
        console.log('🧹 Очищаем локальные данные...');
        
        // Очищаем все ключи, начинающиеся с supabase
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('supabase')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Очищаем cookies с токенами
        document.cookie.split(';').forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            if (name && name.startsWith('sb-')) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
        });
        
        console.log('✅ Локальные данные очищены');
    }

    // --- Запускаем ---
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSupabase();
    } else {
        document.addEventListener('DOMContentLoaded', initSupabase);
    }

    // --- Повторная попытка через 2 секунды ---
    setTimeout(function() {
        if (!document.getElementById('auth-btn-container')) {
            console.log('🔄 Повторная попытка вставки кнопки...');
            renderButton();
        }
    }, 2000);

    // --- Делаем функции глобальными ---
    window._supabaseClient = supabaseClient;
    window.logoutUser = logoutUser;

})();

console.log('✅ auth-button.js выполнен');
