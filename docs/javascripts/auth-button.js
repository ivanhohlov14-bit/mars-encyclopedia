// ============================================================
// auth-button.js — VIP v2
// Универсальная авторизация: ПК + телефон
// Полная переработка: баги исправлены, производительность улучшена
// ============================================================
(function() {
    'use strict';

    console.log('✅ auth-button.js VIP v2 загружен');

    // ============================================================
    // ⚙️ КОНФИГУРАЦИЯ (менять только тут)
    // ============================================================
    var CONFIG = {
        supabase: {
            url: 'https://ncytbgbzfjfoqmmgfygz.supabase.co',
            key: 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
        },
        routes: {
            login: '/login/',
            register: '/register/',
            profile: '/profile/'
        },
        mobileBreakpoint: 768,
        profileCacheTTL: 5 * 60 * 1000, // 5 минут
        retryDelay: 500,
        maxRetries: 20
    };

    // ============================================================
    // 🎨 CSS-переменные (инжектятся один раз)
    // ============================================================
    function injectStyles() {
        if (document.getElementById('auth-vip-styles')) return;
        var s = document.createElement('style');
        s.id = 'auth-vip-styles';
        s.textContent = [
            ':root {',
            '    --auth-accent: #6C63FF;',
            '    --auth-accent-light: #A29BFE;',
            '    --auth-bg-dark: #1a1a2e;',
            '    --auth-bg-2: #252550;',
            '    --auth-text: #e8e8f0;',
            '    --auth-text-dim: #9999bb;',
            '    --auth-border: rgba(108, 99, 255, 0.4);',
            '}',
            '#auth-btn-container {',
            '    display: inline-flex;',
            '    align-items: center;',
            '    gap: 6px;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '}',
            /* --- Авторизован: плашка --- */
            '.auth-user-chip {',
            '    display: inline-flex;',
            '    align-items: center;',
            '    gap: 6px;',
            '    padding: 4px 10px;',
            '    background: linear-gradient(135deg, rgba(26,26,46,0.9), rgba(37,37,80,0.9));',
            '    border: 1.5px solid var(--auth-border);',
            '    border-radius: 20px;',
            '    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);',
            '    text-decoration: none !important;',
            '}',
            '.auth-user-chip:hover {',
            '    border-color: var(--auth-accent);',
            '    box-shadow: 0 4px 16px rgba(108, 99, 255, 0.35);',
            '    transform: translateY(-1px);',
            '}',
            '.auth-avatar {',
            '    width: 26px;',
            '    height: 26px;',
            '    border-radius: 50%;',
            '    border: 2px solid rgba(162, 155, 254, 0.4);',
            '    object-fit: cover;',
            '    flex-shrink: 0;',
            '}',
            '.auth-username {',
            '    font-size: 0.78rem;',
            '    color: var(--auth-text);',
            '    font-weight: 600;',
            '    max-width: 80px;',
            '    overflow: hidden;',
            '    text-overflow: ellipsis;',
            '    white-space: nowrap;',
            '}',
            '.auth-link-profile {',
            '    color: var(--auth-accent-light);',
            '    font-size: 0.75rem;',
            '    font-weight: 700;',
            '    text-decoration: none !important;',
            '    transition: color 0.2s;',
            '    white-space: nowrap;',
            '}',
            '.auth-link-profile:hover { color: #fff; }',
            '.auth-link-logout {',
            '    color: #e74c3c;',
            '    font-size: 0.72rem;',
            '    font-weight: 600;',
            '    cursor: pointer;',
            '    background: none;',
            '    border: none;',
            '    padding: 0;',
            '    font-family: inherit;',
            '    text-decoration: none !important;',
            '    transition: color 0.2s;',
            '    white-space: nowrap;',
            '}',
            '.auth-link-logout:hover { color: #ff6b5a; }',
            /* --- Не авторизован: кнопки --- */
            '.auth-guest {',
            '    display: inline-flex;',
            '    align-items: center;',
            '    gap: 6px;',
            '}',
            '.auth-link-login {',
            '    color: var(--auth-text-dim);',
            '    font-size: 0.8rem;',
            '    font-weight: 600;',
            '    text-decoration: none !important;',
            '    padding: 5px 10px;',
            '    border-radius: 16px;',
            '    transition: all 0.2s;',
            '    white-space: nowrap;',
            '}',
            '.auth-link-login:hover {',
            '    color: var(--auth-text);',
            '    background: rgba(108, 99, 255, 0.1);',
            '}',
            '.auth-link-register {',
            '    color: #fff;',
            '    background: linear-gradient(135deg, #6C63FF, #A29BFE);',
            '    padding: 5px 14px;',
            '    border-radius: 16px;',
            '    text-decoration: none !important;',
            '    font-size: 0.8rem;',
            '    font-weight: 700;',
            '    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);',
            '    box-shadow: 0 2px 10px rgba(108, 99, 255, 0.4);',
            '    white-space: nowrap;',
            '}',
            '.auth-link-register:hover {',
            '    transform: translateY(-2px);',
            '    box-shadow: 0 6px 18px rgba(108, 99, 255, 0.6);',
            '}',
            /* --- Загрузка --- */
            '.auth-loading {',
            '    color: var(--auth-text-dim);',
            '    font-size: 0.8rem;',
            '    opacity: 0.7;',
            '}',
            /* --- Мобильная кастомизация --- */
            '@media (max-width: 768px) {',
            '    .auth-username { max-width: 50px; font-size: 0.7rem; }',
            '    .auth-link-profile, .auth-link-logout { font-size: 0.68rem; }',
            '    .auth-link-login { font-size: 0.72rem; padding: 4px 8px; }',
            '    .auth-link-register { font-size: 0.72rem; padding: 4px 10px; }',
            '    .auth-avatar { width: 22px; height: 22px; }',
            '    .auth-user-chip { padding: 3px 8px; }',
            '}'
        ].join('\n');
        document.head.appendChild(s);
    }

    // ============================================================
    // 🔧 УТИЛИТЫ
    // ============================================================
    function debounce(fn, delay) {
        var timer = null;
        return function() {
            var args = arguments;
            var ctx = this;
            clearTimeout(timer);
            timer = setTimeout(function() { fn.apply(ctx, args); }, delay);
        };
    }

    function isMobile() {
        return window.innerWidth <= CONFIG.mobileBreakpoint;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function getInitials(name) {
        if (!name) return '?';
        var parts = String(name).trim().split(/[\s._-]+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name[0].toUpperCase();
    }

    // ============================================================
    // 🚀 SUPABASE
    // ============================================================
    var supabaseClient = null;
    var authInitialized = false;
    var initRetries = 0;
    var profileCache = {}; // { userId: { data, timestamp } }

    function initSupabase() {
        if (authInitialized) return;

        if (typeof supabase === 'undefined') {
            initRetries++;
            if (initRetries < CONFIG.maxRetries) {
                setTimeout(initSupabase, CONFIG.retryDelay);
            } else {
                console.warn('⚠️ Supabase не загрузился после ' + CONFIG.maxRetries + ' попыток');
            }
            return;
        }

        try {
            supabaseClient = supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);
            authInitialized = true;
            window._supabaseClient = supabaseClient; // теперь реально доступен
            console.log('✅ Supabase инициализирован');

            // Слушаем изменения авторизации
            supabaseClient.auth.onAuthStateChange(function(event, session) {
                console.log('🔐 Auth event:', event);
                updateAuthUI();
            });

            // Первый рендер
            setTimeout(renderButton, 200);
        } catch (e) {
            console.error('❌ Ошибка создания Supabase клиента:', e);
        }
    }

    // ============================================================
    // 📥 ПРОФИЛЬ (с кэшем)
    // ============================================================
    async function fetchProfile(userId) {
        if (!supabaseClient || !userId) return null;

        // Кэш
        var cached = profileCache[userId];
        if (cached && (Date.now() - cached.timestamp < CONFIG.profileCacheTTL)) {
            return cached.data;
        }

        try {
            var result = await supabaseClient
                .from('profiles')
                .select('display_name, username, avatar_url')
                .eq('user_id', userId)
                .single();

            if (result.error) {
                // Не логируем как ошибку, если профиль просто пуст
                return null;
            }

            var data = result.data;
            profileCache[userId] = { data: data, timestamp: Date.now() };
            return data;
        } catch (e) {
            console.warn('⚠️ Ошибка запроса профиля:', e.message);
            return null;
        }
    }

    // ============================================================
    // 🎨 СОЗДАНИЕ КОНТЕЙНЕРА
    // ============================================================
    function ensureContainer() {
        var container = document.getElementById('auth-btn-container');
        if (container) return container;

        container = document.createElement('div');
        container.id = 'auth-btn-container';

        if (isMobile()) {
            // Скрываем старую шапку readthedocs
            var oldTop = document.querySelector('.wy-nav-top');
            if (oldTop) oldTop.style.display = 'none';

            // Создаём свою мобильную шапку
            var customHeader = document.getElementById('custom-mobile-header');
            if (!customHeader) {
                customHeader = document.createElement('div');
                customHeader.id = 'custom-mobile-header';
                customHeader.style.cssText = [
                    'position: fixed;',
                    'top: 0; left: 0; right: 0;',
                    'height: 50px;',
                    'background: linear-gradient(135deg, #6C63FF 0%, #A29BFE 100%);',
                    'z-index: 9999;',
                    'display: flex;',
                    'align-items: center;',
                    'padding: 0 8px;',
                    'box-shadow: 0 2px 12px rgba(108,99,255,0.4);',
                    'gap: 8px;'
                ].join('');

                var hamburger = document.createElement('button');
                hamburger.id = 'mobile-hamburger';
                hamburger.textContent = '☰';
                hamburger.setAttribute('aria-label', 'Меню');
                hamburger.style.cssText = [
                    'background: transparent;',
                    'border: none;',
                    'color: #fff;',
                    'font-size: 22px;',
                    'cursor: pointer;',
                    'padding: 6px 8px;',
                    'flex-shrink: 0;',
                    'line-height: 1;',
                    '-webkit-tap-highlight-color: transparent;'
                ].join('');
                hamburger.onclick = function() {
                    var sidebar = document.querySelector('.wy-nav-side');
                    if (sidebar) sidebar.classList.toggle('shift');
                };

                customHeader.appendChild(hamburger);
                customHeader.appendChild(container);
                document.body.prepend(customHeader);
            } else {
                // Шапка уже есть — просто вставляем контейнер внутрь
                customHeader.appendChild(container);
            }

            console.log('✅ Мобильная шапка готова');
            return container;
        }

        // ПК — ищем header
        var header = document.querySelector('header');
        if (header) {
            container.style.cssText = [
                'display: inline-flex;',
                'align-items: center;',
                'gap: 8px;',
                'float: right;',
                'margin-top: 6px;',
                'margin-right: 10px;',
                'position: relative;',
                'z-index: 1000;'
            ].join('');
            header.appendChild(container);
            console.log('✅ Кнопка вставлена в header (ПК)');
            return container;
        }

        // Запасной вариант
        console.warn('⚠️ Шапка не найдена — вставляем в body');
        container.style.cssText = [
            'position: fixed !important;',
            'top: 10px !important;',
            'right: 10px !important;',
            'z-index: 99999 !important;'
        ].join('');
        document.body.prepend(container);
        return container;
    }

    // ============================================================
    // 🎨 ОТРИСОВКА
    // ============================================================
    var renderButton = debounce(function() {
        var container = ensureContainer();
        if (!container) return;
        updateAuthUI();
    }, 100);

    async function updateAuthUI() {
        var container = document.getElementById('auth-btn-container');
        if (!container) return;

        if (!supabaseClient || !authInitialized) {
            container.innerHTML = '<span class="auth-loading">⏳</span>';
            return;
        }

        try {
            var sessionResult = await supabaseClient.auth.getSession();
            var session = sessionResult.data && sessionResult.data.session;
            var user = session && session.user;

            if (user) {
                console.log('👤 Пользователь:', user.email);
                var profile = await fetchProfile(user.id);

                var username = (profile && (profile.display_name || profile.username))
                    || (user.user_metadata && user.user_metadata.username)
                    || user.email.split('@')[0];

                var avatarUrl = (profile && profile.avatar_url)
                    || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(getInitials(username)) + '&background=6C63FF&color=fff&size=64&rounded=true';

                // Безопасный HTML
                var safeUsername = escapeHtml(username);

                if (isMobile()) {
                    container.innerHTML = [
                        '<div class="auth-user-chip">',
                        '    <img src="' + avatarUrl + '" alt="" class="auth-avatar" onerror="this.style.display=\'none\'">',
                        '    <span class="auth-username">' + safeUsername + '</span>',
                        '    <a href="' + CONFIG.routes.profile + '" class="auth-link-profile">Профиль</a>',
                        '    <button class="auth-link-logout" onclick="window._authLogout()">Выйти</button>',
                        '</div>'
                    ].join('');
                } else {
                    container.innerHTML = [
                        '<div class="auth-user-chip">',
                        '    <img src="' + avatarUrl + '" alt="" class="auth-avatar" onerror="this.style.display=\'none\'">',
                        '    <span class="auth-username">' + safeUsername + '</span>',
                        '    <a href="' + CONFIG.routes.profile + '" class="auth-link-profile">Профиль</a>',
                        '    <button class="auth-link-logout" onclick="window._authLogout()">Выйти</button>',
                        '</div>'
                    ].join('');
                }
            } else {
                console.log('👤 Не авторизован');
                if (isMobile()) {
                    container.innerHTML = [
                        '<div class="auth-guest">',
                        '    <a href="' + CONFIG.routes.login + '" class="auth-link-login">Войти</a>',
                        '    <a href="' + CONFIG.routes.register + '" class="auth-link-register">Регистрация</a>',
                        '</div>'
                    ].join('');
                } else {
                    container.innerHTML = [
                        '<div class="auth-guest">',
                        '    <a href="' + CONFIG.routes.login + '" class="auth-link-login">Войти</a>',
                        '    <a href="' + CONFIG.routes.register + '" class="auth-link-register">Регистрация</a>',
                        '</div>'
                    ].join('');
                }
            }
        } catch (e) {
            console.error('❌ Ошибка updateAuthUI:', e);
            container.innerHTML = '<span class="auth-loading">Ошибка</span>';
        }
    }

    // ============================================================
    // 🚪 ВЫХОД
    // ============================================================
    async function logoutUser() {
        console.log('🔄 Выход из аккаунта...');
        try {
            if (supabaseClient) {
                await supabaseClient.auth.signOut();
            }
        } catch (e) {
            console.warn('⚠️ Ошибка signOut:', e);
        }
        clearLocalSession();
        profileCache = {};
        location.reload();
    }

    function clearLocalSession() {
        console.log('🧹 Очистка локальных данных...');
        try {
            var keysToRemove = [];
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key && key.indexOf('supabase') === 0) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(function(k) { localStorage.removeItem(k); });
        } catch (e) {}

        try {
            document.cookie.split(';').forEach(function(cookie) {
                var name = cookie.split('=')[0].trim();
                if (name && name.indexOf('sb-') === 0) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                }
            });
        } catch (e) {}
    }

    // ============================================================
    // 🔄 RESIZE
    // ============================================================
    var lastMobileState = isMobile();
    window.addEventListener('resize', debounce(function() {
        var currentMobile = isMobile();
        if (currentMobile !== lastMobileState) {
            lastMobileState = currentMobile;
            // Пересобираем шапку — она зависит от мобильности
            var oldContainer = document.getElementById('auth-btn-container');
            if (oldContainer) oldContainer.remove();
            var oldCustom = document.getElementById('custom-mobile-header');
            if (oldCustom) oldCustom.remove();
            var oldTop = document.querySelector('.wy-nav-top');
            if (oldTop && !currentMobile) oldTop.style.display = '';
            renderButton();
        }
    }, 250));

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function start() {
        injectStyles();
        initSupabase();
    }

    // Экспорт в window
    window._authLogout = logoutUser;
    window._authRefresh = updateAuthUI;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    console.log('✅ auth-button.js VIP v2 выполнен');
})();
