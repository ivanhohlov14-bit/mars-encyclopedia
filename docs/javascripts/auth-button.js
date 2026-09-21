// ============================================================
// auth-button.js — VIP v7 (ФИНАЛ)
// БЕЗ библиотеки Supabase! Читает сессию напрямую.
// ============================================================
(function() {
    'use strict';

    console.log('✅ auth-button.js VIP v7 загружен');

    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SESSION_KEY = 'sb-' + PROJECT_REF + '-auth-token';

    var CONFIG = {
        login: '/login/',
        register: '/register/',
        profile: '/profile/'
    };

    // ============================================================
    // 📖 ЧТЕНИЕ СЕССИИ (из 3 мест)
    // ============================================================
    function readSession() {
        var raw = null;
        var source = '';

        // 1. localStorage
        try {
            raw = localStorage.getItem(SESSION_KEY);
            if (raw) source = 'localStorage';
        } catch(e) {}

        // 2. sessionStorage
        if (!raw) {
            try {
                raw = sessionStorage.getItem(SESSION_KEY);
                if (raw) source = 'sessionStorage';
            } catch(e) {}
        }

        // 3. COOKIE — самое надёжное
        if (!raw) {
            try {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var c = cookies[i].trim();
                    if (c.indexOf(SESSION_KEY + '=') === 0) {
                        raw = decodeURIComponent(c.substring(SESSION_KEY.length + 1));
                        source = 'cookie';
                        break;
                    }
                }
            } catch(e) {}
        }

        if (!raw) return null;

        try {
            var parsed = JSON.parse(raw);
            // Старый формат мог быть массивом
            if (Array.isArray(parsed)) parsed = parsed[parsed.length - 1];
            if (!parsed || !parsed.access_token || !parsed.user) return null;

            // Проверка срока
            if (parsed.expires_at && parsed.expires_at * 1000 < Date.now()) {
                console.log('⚠️ Сессия истекла');
                return null;
            }

            console.log('👤 Сессия найдена (' + source + '):', parsed.user.email);
            return parsed;
        } catch(e) {
            return null;
        }
    }

    // ============================================================
    // 🔧 УТИЛИТЫ
    // ============================================================
    function isMobile() { return window.innerWidth <= 768; }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function getInitials(name) {
        if (!name) return '?';
        var p = String(name).trim().split(/[\s._-]+/);
        return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : name[0].toUpperCase();
    }

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
            '.auth-user-chip:hover { box-shadow: 0 4px 16px rgba(108,99,255,0.35); transform: translateY(-1px); }',
            '.auth-avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ddd; object-fit: cover; flex-shrink: 0; }',
            '.auth-username { font-size: 0.75rem; color: #333; max-width: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
            '.auth-link-profile { color: #6C63FF; text-decoration: none !important; font-size: 0.75rem; white-space: nowrap; }',
            '.auth-link-profile:hover { text-shadow: 0 0 8px rgba(108,99,255,0.6); }',
            '.auth-link-logout { color: #c0392b; text-decoration: none !important; font-size: 0.75rem; white-space: nowrap; cursor: pointer; background: none; border: none; padding: 0; font-family: inherit; }',
            '.auth-link-logout:hover { text-shadow: 0 0 8px rgba(231,76,60,0.6); }',
            '.auth-guest { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }',
            '.auth-link-login { color: #555; text-decoration: none !important; font-size: 0.8rem; padding: 4px 8px; border-radius: 16px; white-space: nowrap; }',
            '.auth-link-login:hover { color: #6C63FF; }',
            '.auth-link-register { color: #fff; background: #6C63FF; padding: 4px 12px; border-radius: 16px; text-decoration: none !important; font-size: 0.8rem; white-space: nowrap; box-shadow: 0 2px 10px rgba(108,99,255,0.4); }',
            '.auth-link-register:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(108,99,255,0.7); }',
            '@media (max-width: 768px) {',
            '  .auth-user-chip { padding: 3px 8px; gap: 4px; }',
            '  .auth-avatar { width: 22px; height: 22px; }',
            '  .auth-username { max-width: 45px; font-size: 0.68rem; }',
            '  .auth-link-profile, .auth-link-logout { font-size: 0.68rem; }',
            '  .auth-link-login { font-size: 0.72rem; }',
            '  .auth-link-register { font-size: 0.72rem; padding: 3px 10px; }',
            '}'
        ].join('\n');
        document.head.appendChild(s);
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
                console.log('✅ Мобильная шапка создана');
            } else {
                customHeader.appendChild(container);
            }
            return container;
        }

        // ПК
        var header = document.querySelector('header');
        if (header) {
            container.style.cssText = 'display:inline-flex;align-items:center;gap:8px;float:right;margin-top:6px;margin-right:10px;position:relative;z-index:1000;';
            header.appendChild(container);
            console.log('✅ Кнопка в header (ПК)');
            return container;
        }

        // Fallback
        container.style.cssText = 'position:fixed !important;top:10px !important;right:10px !important;z-index:99999 !important;background:rgba(255,255,255,0.9);border-radius:20px;padding:4px 12px;box-shadow:0 2px 12px rgba(0,0,0,0.15);';
        document.body.prepend(container);
        return container;
    }

    // ============================================================
    // 🎨 РЕНДЕР
    // ============================================================
    function updateUI() {
        var container = ensureContainer();
        if (!container) return;

        var session = readSession();

        if (session && session.user) {
            var user = session.user;
            var name = (user.user_metadata && user.user_metadata.username)
                || (user.email ? user.email.split('@')[0] : 'Пользователь');
            var avatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(getInitials(name)) + '&background=6C63FF&color=fff&size=64&rounded=true';
            var safeName = escapeHtml(name);

            container.innerHTML = [
                '<div class="auth-user-chip">',
                '  <img src="' + avatar + '" alt="" class="auth-avatar" onerror="this.style.display=\'none\'">',
                '  <span class="auth-username">' + safeName + '</span>',
                '  <a href="' + CONFIG.profile + '" class="auth-link-profile">Профиль</a>',
                '  <button class="auth-link-logout" onclick="window._authLogout()">Выйти</button>',
                '</div>'
            ].join('');
        } else {
            container.innerHTML = [
                '<div class="auth-guest">',
                '  <a href="' + CONFIG.login + '" class="auth-link-login">Войти</a>',
                '  <a href="' + CONFIG.register + '" class="auth-link-register">Регистрация</a>',
                '</div>'
            ].join('');
        }
    }

    // ============================================================
    // 🚪 ВЫХОД
    // ============================================================
    window._authLogout = function() {
        console.log('🔄 Выход...');
        try { localStorage.removeItem(SESSION_KEY); } catch(e) {}
        try { sessionStorage.removeItem(SESSION_KEY); } catch(e) {}
        try { document.cookie = SESSION_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch(e) {}

        // Чистим все Supabase-ключи
        try {
            var toRemove = [];
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                if (k && k.indexOf('sb-') === 0) toRemove.push(k);
            }
            toRemove.forEach(function(k) { localStorage.removeItem(k); });
        } catch(e) {}

        window.location.href = '/';
    };

    // ============================================================
    // 🔄 ОБНОВЛЕНИЕ ПРИ СОБЫТИЯХ
    // ============================================================
    window.addEventListener('pageshow', function() { updateUI(); });
    window.addEventListener('focus', function() { updateUI(); });
    window.addEventListener('storage', function(e) {
        if (e.key === SESSION_KEY) updateUI();
    });

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function start() {
        injectStyles();
        updateUI();
        // Несколько повторов — на случай, если сессия записалась позже
        setTimeout(updateUI, 300);
        setTimeout(updateUI, 1000);
        setTimeout(updateUI, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    console.log('✅ auth-button.js VIP v7 — только localStorage, без библиотеки');
})();
