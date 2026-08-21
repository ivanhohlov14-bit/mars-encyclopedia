// docs/javascripts/header-auth.js

(function() {
    // --- Данные Supabase ---
    const SUPABASE_URL = "https://ncytbgbjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // --- Загружаем Supabase ---
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    script.onload = function() {
        window._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('✅ Supabase загружен');
        renderAuthUI();
    };
    document.head.appendChild(script);

    // --- Функция отрисовки UI в шапке ---
    function renderAuthUI() {
        // Находим место для вставки (шапка сайта)
        const header = document.querySelector('header');
        if (!header) {
            console.warn('⚠️ Header не найден, пробуем через 1 секунду');
            setTimeout(renderAuthUI, 1000);
            return;
        }

        // Удаляем старый контейнер, если есть
        const oldContainer = document.getElementById('auth-container');
        if (oldContainer) oldContainer.remove();

        // Создаём контейнер
        const container = document.createElement('div');
        container.id = 'auth-container';
        container.style.cssText = 'display: flex; align-items: center; margin-left: auto; padding-right: 20px; gap: 12px;';
        header.appendChild(container);

        // Проверяем пользователя
        if (window._supabase) {
            window._supabase.auth.getSession().then(({ data }) => {
                const user = data?.session?.user;
                if (user) {
                    const username = user.user_metadata?.username || user.email.split('@')[0];
                    container.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="https://ui-avatars.com/api/?name=${username}&background=6C63FF&color=fff&size=28&rounded=true" 
                                 alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ddd;">
                            <span style="font-size: 0.8rem; color: #333; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                ${username}
                            </span>
                            <a href="/profile/" style="color: #6C63FF; text-decoration: none; font-size: 0.8rem;">Профиль</a>
                            <a href="#" onclick="window._supabase.auth.signOut(); location.reload(); return false;" style="color: #c0392b; text-decoration: none; font-size: 0.8rem;">Выйти</a>
                        </div>
                    `;
                } else {
                    container.innerHTML = `
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <a href="/login/" style="color: #333; text-decoration: none; font-size: 0.9rem;">Войти</a>
                            <a href="/register/" style="color: #fff; background: #6C63FF; padding: 6px 16px; border-radius: 20px; text-decoration: none; font-size: 0.9rem;">Регистрация</a>
                        </div>
                    `;
                }
            });
        }
    }

    // --- Запускаем при загрузке страницы ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAuthUI);
    } else {
        renderAuthUI();
    }
})();
