// docs/javascripts/auth-button.js
// УНИВЕРСАЛЬНАЯ ВЕРСИЯ — работает на ПК и телефонах

console.log('✅ auth-button.js загружен');

(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    let supabaseClient = null;
    let authInitialized = false;

    function initSupabase() {
        if (typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('✅ Supabase инициализирован');
            authInitialized = true;
            // Даём время на загрузку DOM
            setTimeout(renderButton, 300);
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

        // Ищем куда вставить кнопку
        let target = null;
        
        // 1. Пробуем вставить в шапку (телефон)
        const header = document.querySelector('.wy-nav-top');
        if (header) {
            // Проверяем, есть ли уже контейнер
            let existing = document.getElementById('auth-btn-container');
            if (existing) {
                updateAuthUI(existing);
                return;
            }
            
            // Вставляем в шапку телефона (справа)
            container = document.createElement('div');
            container.id = 'auth-btn-container';
            container.style.cssText = `
                display: flex !important;
                align-items: center !important;
                gap: 6px !important;
                margin-left: auto !important;
                flex-shrink: 0 !important;
            `;
            header.appendChild(container);
            console.log('✅ Кнопка вставлена в шапку телефона');
            updateAuthUI(container);
            return;
        }

        // 2. Если шапки нет — ищем стандартный header (ПК)
        let pcHeader = document.querySelector('header');
        if (pcHeader) {
            // Ищем контейнер
            let existing = document.getElementById('auth-btn-container');
            if (existing) {
                updateAuthUI(existing);
                return;
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
                position: relative;
                z-index: 1000;
            `;
            pcHeader.appendChild(container);
            console.log('✅ Кнопка вставлена в ПК-шапку');
            updateAuthUI(container);
            return;
        }

        // 3. Если ничего не нашли — вставляем в body
        console.warn('⚠️ Шапка не найдена, вставляем в body');
        let existing = document.getElementById('auth-btn-container');
        if (existing) {
            updateAuthUI(existing);
            return;
        }
        container = document.createElement('div');
        container.id = 'auth-btn-container';
        container.style.cssText = `
            position: fixed !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 99999 !important;
            background: rgba(255,255,255,0.9) !important;
            border-radius: 20px !important;
            padding: 4px 12px !important;
            box-shadow: 0 2px 12px rgba(0,0,0,0.15) !important;
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
        `;
        document.body.prepend(container);
        console.log('✅ Кнопка вставлена в body');
        updateAuthUI(container);
    }

    async function fetchProfile(userId) {
        if (!supabaseClient) return null;
        try {
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('display_name, username, avatar_url')
                .eq('user_id', userId)
                .single();
            if (error) {
                console.warn('⚠️ Не удалось загрузить профиль:', error.message);
                return null;
            }
            return data;
        } catch (e) {
            console.warn('⚠️ Ошибка запроса профиля:', e);
            return null;
        }
    }

    function updateAuthUI(container) {
        if (!container) {
            container = document.getElementById('auth-btn-container');
            if (!container) return;
        }

        if (!supabaseClient || !authInitialized) {
            container.innerHTML = `<span style="color: #999; font-size: 0.8rem;">⏳</span>`;
            return;
        }

        supabaseClient.auth.getSession()
            .then(async ({ data }) => {
                const user = data?.session?.user;
                console.log('👤 Пользователь:', user ? user.email : 'не авторизован');

                if (user) {
                    const profile = await fetchProfile(user.id);
                    const username = profile?.display_name || profile?.username || user.user_metadata?.username || user.email.split('@')[0];
                    const avatarUrl = profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6C63FF&color=fff&size=32&rounded=true`;

                    // На телефоне показываем компактно
                    const isMobile = window.innerWidth <= 768;
                    const compact = isMobile ? ' style="font-size:0.6rem; padding:2px 6px;"' : '';

                    container.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <img src="${avatarUrl}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); object-fit: cover;">
                            ${!isMobile ? `<span style="font-size:0.75rem; color:#333; max-width:60px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${username}</span>` : ''}
                            <a href="/profile/"${compact} style="color: #6C63FF; text-decoration: none;">Профиль</a>
                            <a href="#" onclick="logoutUser(); return false;"${compact} style="color: #c0392b; text-decoration: none;">Выйти</a>
                        </div>
                    `;
                } else {
                    // Не авторизован — показываем кнопки входа/регистрации
                    const isMobile = window.innerWidth <= 768;
                    const compact = isMobile ? ' style="font-size:0.6rem; padding:2px 6px;"' : '';

                    container.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                            <a href="/login/"${compact} style="color: #555; text-decoration: none;">Войти</a>
                            <a href="/register/"${compact} style="color: #fff; background: #6C63FF; padding: 4px 12px; border-radius: 16px; text-decoration: none;">Регистрация</a>
                        </div>
                    `;
                }
            })
            .catch((error) => {
                console.error('❌ Ошибка проверки сессии:', error);
                container.innerHTML = `<span style="color: #999; font-size: 0.8rem;">Ошибка</span>`;
            });
    }

    function logoutUser() {
        console.log('🔄 Попытка выхода...');
        if (!supabaseClient) {
            clearLocalSession();
            location.reload();
            return;
        }
        supabaseClient.auth.signOut()
            .then(() => {
                console.log('✅ Выход выполнен');
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
    }

    // Запуск
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSupabase();
    } else {
        document.addEventListener('DOMContentLoaded', initSupabase);
    }

    // Дополнительный запуск через 2 секунды (на случай, если что-то пошло не так)
    setTimeout(function() {
        if (!document.getElementById('auth-btn-container')) {
            console.log('🔄 Повторная попытка вставки кнопки...');
            renderButton();
        }
    }, 2000);

    // Делаем функции глобальными
    window._supabaseClient = supabaseClient;
    window.logoutUser = logoutUser;
})();

console.log('✅ auth-button.js выполнен');
