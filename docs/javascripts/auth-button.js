// ============================================================
// auth-button.js — VIP v4
// Светлые надписи + фикс вечного спиннера на телефоне
// ============================================================
(function() {
    'use strict';

    console.log('✅ auth-button.js VIP v4 загружен');

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
        profileCacheTTL: 5 * 60 * 1000,
        retryDelay: 500,
        maxRetries: 30,
        fallbackTimeout: 8000  // через 8 сек показать кнопки вместо спиннера
    };

    // ============================================================
    // 🎨 СТИЛИ
    // ============================================================
    function injectStyles() {
        if (document.getElementById('auth-vip-styles')) return;
        var s = document.createElement('style');
        s.id = 'auth-vip-styles';
        s.textContent = [
            '#auth-btn-container {',
            '    display: inline-flex;',
            '    align-items: center;',
            '    gap: 6px;',
            '    flex-wrap: wrap;',
            '}',
            '.auth-user-chip {',
            '    display: inline-flex;',
            '    align-items: center;',
            '    gap: 6px;',
            '    background: #f5f5f5;',
            '    padding: 4px 10px;',
            '    border-radius: 20px;',
            '    flex-wrap: wrap;',
            '    transition: box-shadow 0.25s, transform 0.25s;',
            '}',
            '.auth-user-chip:hover {',
            '    box-shadow: 0 4px 16px rgba(108, 99, 255, 0.35);',
            '    transform: translateY(-1px);',
            '}',
            '.auth-avatar {',
            '    width: 28px;',
            '    height: 28px;',
            '    border-radius: 50%;',
            '    border: 2px solid #ddd;',
            '    object-fit: cover;',
            '    flex-shrink: 0;',
            '}',
            '.auth-username {',
            '    font-size: 0.75rem;',
            '    color: #333;',
            '    max-width: 60px;',
            '    overflow: hidden;',
            '    text-overflow: ellipsis;',
            '    white-space: nowrap;',
            '}',
            '.auth-link-profile {',
            '    color: #6C63FF;',
            '    text-decoration: none !important;',
            '    font-size: 0.75rem;',
            '    white-space: nowrap;',
            '    transition: text-shadow 0.2s;',
            '}',
            '.auth-link-profile:hover {',
            '    text-shadow: 0 0 8px rgba(108, 99, 255, 0.6);',
            '}',
            '.auth-link-logout {',
            '    color: #c0392b;',
            '    text-decoration: none !important;',
            '    font-size: 0.75rem;',
            '    white-space: nowrap;',
            '    transition: text-shadow 0.2s;',
            '}',
            '.auth-link-logout:hover {',
            '    text-shadow: 0 0 8px rgba(231, 76, 60, 0.6);',
            '}',
            '.auth-guest {',
            '    display: inline-flex;',
            '    align-items: center;',
            '    gap: 6px;',
            '    flex-wrap: wrap;',
            '}',
            '.auth-link-login {',
            '    color: #555;',
            '    text-decoration: none !important;',
            '    font-size: 0.8rem;',
            '    white-space: nowrap;',
            '    padding: 4px 8px;',
            '    border-radius: 16px;',
            '    transition: color 0.2s, text-shadow 0.2s;',
            '}',
            '.auth-link-login:hover {',
            '    color: #6C63FF;',
            '    text-shadow: 0 0 8px rgba(108, 99, 255, 0.5);',
            '}',
            '.auth-link-register {',
            '    color: #fff;',
            '    background: #6C63FF;',
            '    padding: 4px 12px;',
            '    border-radius: 16px;',
            '    text-decoration: none !important;',
            '    font-size: 0.8rem;',
            '    white-space: nowrap;',
            '    box-shadow: 0 2px 10px rgba(108, 99, 255, 0.4);',
            '    transition: all 0.25s;',
            '}',
            '.auth-link-register:hover {',
            '    transform: translateY(-2px);',
            '    box-shadow: 0 6px 18px rgba(108, 99, 255, 0.7);',
            '}',
            '.auth-error {',
            '    color: #c0392b;',
            '    font-size: 0.72rem;',
            '    font-family: inherit;',
            '}',
            '@media (max-width: 768px) {',
            '    .auth-user-chip { padding: 3px 8px; gap: 4px; }',
            '    .auth-avatar { width: 22px; height: 22px; }',
            '    .auth-username { max-width: 45px; font-size: 0.68rem; }',
            '    .auth-link-profile, .auth-link-logout { font-size: 0.68rem; }',
            '    .auth-link-login { font-size: 0.72rem; padding: 3px 6px; }',
            '    .auth-link-register { font-size: 0.72rem; padding: 3px 10px; }',
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
    var profileCache = {};
    var fallbackUsed = false;

    function initSupabase() {
        if (authInitialized) return;

        if (typeof supabase === 'undefined') {
            initRetries++;
            if (initRetries < CONFIG.maxRetries) {
                setTimeout(initSupabase, CONFIG.retryDelay);
            } else {
                console.warn('⚠️ Supabase не загрузился — показываем fallback');
                showFallbackGuest();
            }
            return;
        }

        try {
            supabaseClient = supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);
            authInitialized = true;
            window._supabaseClient = supabaseClient;
            console.log('✅ Supabase инициализирован (попыток: ' + initRetries + ')');

            supabaseClient.auth.onAuthStateChange(function(event) {
                console.log('🔐 Auth event:', event);
                setTimeout(function() { updateAuthUI(); }, 50);
            });

            setTimeout(renderButton, 200);
        } catch (e) {
            console.error('❌ Ошибка Supabase:', e);
            showFallbackGuest();
        }
    }

    // Показ кнопок "Войти/Регистрация" без Supabase
    function showFallbackGuest() {
        var container = document.getElementById('auth-btn-container') || ensureContainer();
        if (!container) return;
        container.innerHTML = [
            '<div class="auth-guest">',
            '    <a href="' + CONFIG.routes.login + '" class="auth-link-login">Войти</a>',
            '    <a href="' + CONFIG.routes.register + '" class="auth-link-register">Регистрация</a>',
            '</div>'
        ].join('');
    }

    // ============================================================
    // 📥 ПРОФИЛЬ
    // ============================================================
    async function fetchProfile(userId) {
        if (!supabaseClient || !userId) return null;
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
            if (result.error) return null;
            var data = result.data;
            profileCache[userId] = { data: data, timestamp: Date.now() };
            return data;
        } catch (e) {
            console.warn('⚠️ Ошибка профиля:', e.message);
            return null;
        }
    }

    // ============================================================
    // 🎨 КОНТЕЙНЕР
    // ============================================================
    function ensureContainer() {
        var container = document.getElementById('auth-btn-container');
        if (container) return container;

        container = document.createElement('div');
        container.id = 'auth-btn-container';

        if (isMobile()) {
            var oldTop = document.querySelector('.wy-nav-top');
            if (oldTop) oldTop.style.display = 'none';

            var customHeader = document.getElementById('custom-mobile-header');
            if (!customHeader) {
                customHeader = document.createElement('div');
                customHeader.id = 'custom-mobile-header';
                customHeader.style.cssText = [
                    'position: fixed;',
                    'top: 0; left: 0; right: 0;',
                    'height: 50px;',
                    'background: #6C63FF;',
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
                    'line-height: 1;'
                ].join('');
                hamburger.onclick = function() {
                    var sidebar = document.querySelector('.wy-nav-side');
                    if (sidebar) sidebar.classList.toggle('shift');
                };

                customHeader.appendChild(hamburger);
                customHeader.appendChild(container);
                document.body.prepend(customHeader);
            } else {
                customHeader.appendChild(container);
            }
            return container;
        }

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
            return container;
        }

        console.warn('⚠️ Header не найден — в body');
        container.style.cssText = [
            'position: fixed !important;',
            'top: 10px !important;',
            'right: 10px !important;',
            'z-index: 99999 !important;',
            'background: rgba(255,255,255,0.9);',
            'border-radius: 20px;',
            'padding: 4px 12px;',
            'box-shadow: 0 2px 12px rgba(0,0,0,0.15);'
        ].join('');
        document.body.prepend(container);
        return container;
    }

    // ============================================================
    // 🎨 ОТРИСОВКА
    // ============================================================
    var renderButton = debounce(function() {
        ensureContainer();
        updateAuthUI();
    }, 100);

    async function updateAuthUI() {
        var container = document.getElementById('auth-btn-container');
        if (!container) container = ensureContainer();
        if (!container) return;

        if (!supabaseClient || !authInitialized) {
            // НЕ показываем вечный спиннер — показываем гостя
            container.innerHTML = [
                '<div class="auth-guest">',
                '    <a href="' + CONFIG.routes.login + '" class="auth-link-login">Войти</a>',
                '    <a href="' + CONFIG.routes.register + '" class="auth-link-register">Регистрация</a>',
                '</div>'
            ].join('');
            return;
        }

        try {
            var sessionResult = await supabaseClient.auth.getSession();
            var session = sessionResult && sessionResult.data && sessionResult.data.session;
            var user = session && session.user;

            if (user) {
                console.log('👤 Пользователь:', user.email);
                var profile = await fetchProfile(user.id);

                var username = (profile && (profile.display_name || profile.username))
                    || (user.user_metadata && user.user_metadata.username)
                    || (user.email ? user.email.split('@')[0] : 'Пользователь');

                var avatarUrl = (profile && profile.avatar_url)
                    || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(getInitials(username)) + '&background=6C63FF&color=fff&size=64&rounded=true';

                var safeUsername = escapeHtml(username);

                // НАДПИСИ КАК В ИСХОДНОМ КОДЕ
                container.innerHTML = [
                    '<div class="auth-user-chip">',
                    '    <img src="' + avatarUrl + '" alt="Avatar" class="auth-avatar" onerror="this.style.display=\'none\'">',
                    '    <span class="auth-username">' + safeUsername + '</span>',
                    '    <a href="' + CONFIG.routes.profile + '" class="auth-link-profile">Профиль</a>',
                    '    <a href="#" onclick="window._authLogout(); return false;" class="auth-link-logout">Выйти</a>',
                    '</div>'
                ].join('');
            } else {
                console.log('👤 Не авторизован');
                container.innerHTML = [
                    '<div class="auth-guest">',
                    '    <a href="' + CONFIG.routes.login + '" class="auth-link-login">Войти</a>',
                    '    <a href="' + CONFIG.routes.register + '" class="auth-link-register">Регистрация</a>',
                    '</div>'
                ].join('');
            }
        } catch (e) {
            console.error('❌ Ошибка updateAuthUI:', e);
            container.innerHTML = [
                '<div class="auth-guest">',
                '    <a href="' + CONFIG.routes.login + '" class="auth-link-login">Войти</a>',
                '    <a href="' + CONFIG.routes.register + '" class="auth-link-register">Регистрация</a>',
                '</div>'
            ].join('');
        }
    }

    // ============================================================
    // 🚪 ВЫХОД
    // ============================================================
    async function logoutUser() {
        console.log('🔄 Выход...');
        try {
            if (supabaseClient) await supabaseClient.auth.signOut();
        } catch (e) {
            console.warn('⚠️ signOut:', e);
        }
        clearLocalSession();
        profileCache = {};
        location.reload();
    }

    function clearLocalSession() {
        try {
            var keysToRemove = [];
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key && key.indexOf('supabase') === 0) keysToRemove.push(key);
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
            var oldContainer = document.getElementById('auth-btn-container');
            if (oldContainer) oldContainer.remove();
            var oldCustom = document.getElementById('custom-mobile-header');
            if (oldCustom) oldCustom.remove();
            var oldTop = document.querySelector('.wy-nav-top');
            if (oldTop && !currentMobile) oldTop.style.display = '';
            ensureContainer();
            updateAuthUI();
        }
    }, 250));

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function start() {
        injectStyles();
        initSupabase();

        // Fallback: если через 8 сек спиннер всё ещё крутится — показать гостя
        setTimeout(function() {
            if (!fallbackUsed && (!supabaseClient || !authInitialized)) {
                console.warn('⚠️ Fallback: Supabase не загрузился за 8 сек');
                fallbackUsed = true;
                showFallbackGuest();
            }
        }, CONFIG.fallbackTimeout);

        // Повторная проверка
        setTimeout(function() {
            if (!document.getElementById('auth-btn-container')) {
                renderButton();
            } else {
                updateAuthUI();
            }
        }, 2000);
    }

    window._authLogout = logoutUser;
    window._authRefresh = updateAuthUI;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    console.log('✅ auth-button.js VIP v4 выполнен');
})();
