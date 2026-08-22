// docs/javascripts/auth-button.js

console.log('✅ auth-button.js загружен');

(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    let supabaseClient = null;

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

    function renderButton() {
        let container = document.getElementById('auth-btn-container');
        if (container) {
            updateAuthUI(container);
            return;
        }

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
        container.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 6px;
            float: right;
            margin-top: 6px;
            margin-right: 10px;
            flex-wrap: wrap;
            max-width: 100%;
        `;

        if (header.tagName === 'HEADER') {
            header.appendChild(container);
        } else {
            header.prepend(container);
        }

        console.log('✅ Контейнер для кнопки создан');
        updateAuthUI(container);
    }

    // --- Получение данных профиля из БД ---
    async function fetchProfile(userId) {
        if (!supabaseClient) return null;
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('username, avatar_url')
            .eq('user_id', userId)
            .single();
        if (error) {
            console.warn('⚠️ Не удалось загрузить профиль:', error.message);
            return null;
        }
        return data;
    }

    function updateAuthUI(container) {
        if (!container) {
            container = document.getElementById('auth-btn-container');
            if (!container) return;
        }

        if (!supabaseClient) {
            container.innerHTML = `<span style="color: #999; font-size: 0.8rem;">Загрузка...</span>`;
            return;
        }

        supabaseClient.auth.getSession().then(async ({ data }) => {
            const user = data?.session?.user;
            console.log('👤 Пользователь:', user ? user.email : 'не авторизован');

            if (user) {
                // Получаем профиль из БД
                const profile = await fetchProfile(user.id);
                const username = profile?.username || user.user_metadata?.username || user.email.split('@')[0];
                const avatarUrl = profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6C63FF&color=fff&size=32&rounded=true`;

                container.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 6px; background: #f5f5f5; padding: 4px 10px; border-radius: 20px; flex-wrap: wrap;">
                        <img src="${avatarUrl}" 
                             alt="Avatar" 
                             style="width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ddd; object-fit: cover;">
                        <span style="font-size: 0.75rem; color: #333; max-width: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            ${username}
                        </span>
                        <a href="/profile/" style="color: #6C63FF; text-decoration: none; font-size: 0.75rem; white-space: nowrap;">Профиль</a>
                        <a href="#" onclick="logoutUser(); return false;" 
                           style="color: #c0392b; text-decoration: none; font-size: 0.75rem; white-space: nowrap;">Выйти</a>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                        <a href="/login/" style="color: #555; text-decoration: none; font-size: 0.8rem; white-space: nowrap;">Войти</a>
                        <a href="/register/" style="color: #fff; background: #6C63FF; padding: 4px 12px; border-radius: 16px; text-decoration: none; font-size: 0.8rem; white-space: nowrap;">Регистрация</a>
                    </div>
                `;
            }
        }).catch((error) => {
            console.error('❌ Ошибка проверки сессии:', error);
            container.innerHTML = `<span style="color: #999; font-size: 0.8rem;">Ошибка</span>`;
        });
    }

    function logoutUser() {
        console.log('🔄 Попытка выхода...');
        if (!supabaseClient) {
            console.warn('⚠️ Supabase не инициализирован, очищаем локальные данные');
            clearLocalSession();
            return;
        }
        supabaseClient.auth.signOut()
            .then(() => {
                console.log('✅ Выход выполнен через Supabase');
                clearLocalSession();
                location.reload();
            })
            .catch((error) => {
                console.error('❌ Ошибка выхода:', error);
                clearLocalSession();
                location.reload();
            });
    }

    function clearLocalSession() {
        console.log('🧹 Очищаем локальные данные...');
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('supabase')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        document.cookie.split(';').forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            if (name && name.startsWith('sb-')) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
        });
        console.log('✅ Локальные данные очищены');
    }

    // Запуск
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSupabase();
    } else {
        document.addEventListener('DOMContentLoaded', initSupabase);
    }

    setTimeout(function() {
        if (!document.getElementById('auth-btn-container')) {
            console.log('🔄 Повторная попытка вставки кнопки...');
            renderButton();
        }
    }, 2000);

    window._supabaseClient = supabaseClient;
    window.logoutUser = logoutUser;

})();

console.log('✅ auth-button.js выполнен');
