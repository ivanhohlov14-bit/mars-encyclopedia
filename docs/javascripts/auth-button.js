// ============================================================
// auth-button.js — VIP v5
// Использует ЕДИНЫЙ клиент из supabase-client.js
// Кэш профиля в localStorage + дебаунс событий
// ============================================================
(function() {
    'use strict';

    console.log('✅ auth-button.js VIP v5 загружен');

    var CONFIG = {
        routes: {
            login: '/login/',
            register: '/register/',
            profile: '/profile/'
        },
        mobileBreakpoint: 768,
        profileCacheTTL: 5 * 60 * 1000,
        maxInitRetries: 40,
        retryDelay: 250,
        fallbackTimeout: 6000
    };

    // ============================================================
    // 🎨 СТИЛИ
    // ============================================================
    function injectStyles() {
        if (document.getElementById('auth-vip-styles')) return;
        var s = document.createElement('style');
        s.id = 'auth-vip-styles';
        s.textContent = [
            '#auth-btn-container { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }',
            '.auth-user-chip { display: inline-flex; align-items: center; gap: 6px; background: #f5f5f5; padding: 4px 10px; border-radius: 20px; flex-wrap: wrap; transition: box-shadow 0.25s, transform 0.25s; }',
            '.auth-user-chip:hover { box-shadow: 0 4px 16px rgba(108, 99, 255, 0.35); transform: translateY(-1px); }',
            '.auth-avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ddd; object-fit: cover; flex-shrink: 0; }',
            '.auth-username { font-size: 0.75rem; color: #333; max-width: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
            '.auth-link-profile { color: #6C63FF; text-decoration: none !important; font-size: 0.75rem; white-space: nowrap; transition: text-shadow 0.2s; }',
            '.auth-link-profile:hover { text-shadow: 0 0 8px rgba(108, 99, 255, 0.6); }',
            '.auth-link-logout { color: #c0392b; text-decoration: none !important; font-size: 0.75rem; white-space: nowrap; transition: text-shadow 0.2s; }',
            '.auth-link-logout:hover { text-shadow: 0 0 8px rgba(231, 76, 60, 0.6); }',
            '.auth-guest { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }',
            '.auth-link-login { color: #555; text-decoration: none !important; font-size: 0.8rem; padding: 4px 8px; border-radius: 16px; transition: color 0.2s, text-shadow 0.2s; white-space: nowrap; }',
            '.auth-link-login:hover { color: #6C63FF; text-shadow: 0 0 8px rgba(108, 99, 255, 0.5); }',
            '.auth-link-register { color: #fff; background: #6C63FF; padding: 4px 12px; border-radius: 16px; text-decoration: none !important; font-size: 0.8rem; white-space: nowrap; box-shadow: 0 2px 10px rgba(108, 99, 255, 0.4); transition: all 0.25s; }',
            '.auth-link-register:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(108, 99, 255, 0.7); }',
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
            var args = arguments, ctx = this;
            clearTimeout(timer);
            timer = setTimeout(function() { fn.apply(ctx, args); }, delay);
        };
    }

    function isMobile() {
        return window.innerWidth <= CONFIG.mobileBreakpoint;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getInitials(name) {
        if (!name) return '?';
        var parts = String(name).trim().split(/[\s._-]+/);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name[0].toUpperCase();
    }

    // ============================================================
    // 💾 КЭШ ПРОФИЛЯ (в localStorage!)
    // ============================================================
    function getCachedProfile(userId) {
        try {
            var raw = localStorage.getItem('auth_profile_' + userId);
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            if (Date.now() - parsed.timestamp > CONFIG.profileCacheTTL) return null;
            return parsed.data;
        } catch (e) { return null; }
    }

    function setCachedProfile(userId, data) {
        try {
            localStorage.setItem('auth_profile_' + userId, JSON.stringify({
                timestamp: Date.now(),
                data: data
            }));
        } catch (e) {}
    }

    // ============================================================
    // 🚀 ПОЛУЧЕНИЕ КЛИЕНТА (из supabase-client.js)
    // ============================================================
    var supabaseClient = null;
    var initRetries = 0;
    var renderState = { lastUserId: null, lastRenderAt: 0 };

    function getClient() {
        // supabase-client.js экспортирует клиент сюда
        if (window._supabaseClient) return window._supabaseClient;
        if (window.supabaseClient) return window.supabaseClient;
        if (window.supabase && typeof window.supabase.auth !== 'undefined') return window.supabase;
        return null;
    }

    function initClient() {
        supabaseClient = getClient();

        if (supabaseClient) {
            console.log('✅ auth-button.js подключился к клиенту supabase-client.js');
            supabaseClient.auth.onAuthStateChange(function(event) {
                console.log('🔐 auth-button | event:', event);
                // Дебаунс — не дёргаем UI 10 раз
                scheduleUpdate();
            });
            scheduleRender();
            return;
        }

        initRetries++;
        if (initRetries < CONFIG.maxInitRetries) {
            setTimeout(initClient, CONFIG.retryDelay);
        } else {
            console.warn('⚠️ Supabase клиент не найден — показываем гостя');
            renderGuest();
        }
    }

    // ============================================================
    // 📥 ПРОФИЛЬ
    // ============================================================
    async function fetchProfile(userId) {
        if (!supabaseClient || !userId) return null;

        var cached = getCachedProfile(userId);
        if (cached) return cached;

        try {
            var result = await supabaseClient
                .from('profiles')
                .select('display_name, username, avatar_url')
                .eq('user_id', userId)
                .single();

            if (result.error) return null;
            setCachedProfile(userId, result.data);
            return result.data;
        } catch (e) {
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
                customHeader.style.cssText = 'position:fixed;top:0;left:0;right:0;height:50px;background:#6C63FF;z-index:9999;display:flex;align-items:center;padding:0 8px;box-shadow:0 2px 12px rgba(108,99,255,0.4);gap:8px;';

                var hamburger = document.createElement('button');
                hamburger.id = 'mobile-hamburger';
                hamburger.textContent = '☰';
                hamburger.setAttribute('aria-label', 'Меню');
                hamburger.style.cssText = 'background:transparent;border:none;color:#fff;font-size:22px;cursor:pointer;padding:6px 8px;flex-shrink:0;line-height:1;';
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
            container.style.cssText = 'display:inline-flex;align-items:center;gap:8px;float:right;margin-top:6px;margin-right:10px;position:relative;z-index:1000;';
            header.appendChild(container);
            return container;
        }

        container.style.cssText = 'position:fixed !important;top:10px !important;right:10px !important;z-index:99999 !important;background:rgba(255,255,255,0.9);border-radius:20px;padding:4px 12px;box-shadow:0 2px 12px rgba(0,0,0,0.15);';
        document.body.prepend(container);
        return container;
    }

    // ============================================================
    // 🎨 РЕНДЕР
    // ============================================================
    var scheduleRender = debounce(function() { renderButton(); }, 150);
    var scheduleUpdate = debounce(function() { updateAuthUI(); }, 250);

    function renderButton() {
        ensureContainer();
        updateAuthUI();
    }

    function renderGuest() {
        var container = ensureContainer();
        if (!container) return;
        container.innerHTML = [
            '<div class="auth-guest">',
            '    <a href="' + CONFIG.routes.login + '" class="auth-link-login">Войти</a>',
            '    <a href="' + CONFIG.routes.register + '" class="auth-link-register">Регистрация</a>',
            '</div>'
        ].join('');
    }

    async function updateAuthUI() {
        var container = document.getElementById('auth-btn-container');
        if (!container) container = ensureContainer();
        if (!container) return;

        if (!supabaseClient) {
            renderGuest();
            return;
        }

        try {
            var sessionResult = await supabaseClient.auth.getSession();
            var session = sessionResult && sessionResult.data && sessionResult.data.session;
            var user = session && session.user;

            // Анти-дубль рендер
            var now = Date.now();
            var userId = user ? user.id : null;
            if (renderState.lastUserId === userId && now - renderState.lastRenderAt < 1000) {
                return;
            }
            renderState.lastUserId = userId;
            renderState.lastRenderAt = now;

            if (user) {
                var profile = await fetchProfile(user.id);

                var username = (profile && (profile.display_name || profile.username))
                    || (user.user_metadata && user.user_metadata.username)
                    || (user.email ? user.email.split('@')[0] : 'Пользователь');

                var avatarUrl = (profile && profile.avatar_url)
                    || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(getInitials(username)) + '&background=6C63FF&color=fff&size=64&rounded=true';

                var safeUsername = escapeHtml(username);

                container.innerHTML = [
                    '<div class="auth-user-chip">',
                    '    <img src="' + avatarUrl + '" alt="Avatar" class="auth-avatar" onerror="this.style.display=\'none\'">',
                    '    <span class="auth-username">' + safeUsername + '</span>',
                    '    <a href="' + CONFIG.routes.profile + '" class="auth-link-profile">Профиль</a>',
                    '    <a href="#" onclick="window._authLogout(); return false;" class="auth-link-logout">Выйти</a>',
                    '</div>'
                ].join('');
            } else {
                renderGuest();
            }
        } catch (e) {
            console.error('❌ auth-button | ошибка:', e);
            renderGuest();
        }
    }

    // ============================================================
    // 🚪 ВЫХОД
    // ============================================================
    async function logoutUser() {
        console.log('🔄 Выход...');
        try {
            if (supabaseClient) await supabaseClient.auth.signOut();
        } catch (e) {}
        try {
            var keysToRemove = [];
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key && (key.indexOf('supabase') === 0 || key.indexOf('auth_profile_') === 0)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(function(k) { localStorage.removeItem(k); });
        } catch (e) {}
        location.reload();
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
            renderState.lastUserId = null;
            ensureContainer();
            updateAuthUI();
        }
    }, 300));

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function start() {
        injectStyles();
        initClient();

        setTimeout(function() {
            if (!document.getElementById('auth-btn-container')) renderButton();
        }, 1500);

        setTimeout(function() {
            if (!supabaseClient) renderGuest();
        }, CONFIG.fallbackTimeout);
    }

    window._authLogout = logoutUser;
    window._authRefresh = updateAuthUI;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    console.log('✅ auth-button.js VIP v5 выполнен');
})();
