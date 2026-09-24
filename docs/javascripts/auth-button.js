// ============================================================
// auth-button.js — v8 VIP
// - Убрано polling (было setInterval × 2 каждые 1.5-3 сек)
// - MutationObserver с auto-disconnect для хедера
// - Проверка доступности /profile/ (HEAD-запрос)
// - Кэш bridgeToSupabase (не дёргаем каждый раз)
// - Логи в консоль (можно отключить)
// ============================================================
(function() {
    'use strict';

    // ============================================================
    // CONFIG
    // ============================================================
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SUPABASE_URL = 'https://' + PROJECT_REF + '.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';
    var BACKUP_KEY = 'mars-auth-backup';
    var CACHE_KEY = 'mars-auth-ui-cache';
    var CONTAINER_ID = 'auth-btn-container';
    var HEADER_ID = 'custom-mobile-header';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['👤 auth:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 🍪 COOKIE
    // ============================================================
    function getCookie(name) {
        try {
            var cs = document.cookie.split(';');
            for (var i = 0; i < cs.length; i++) {
                var c = cs[i].trim();
                if (c.indexOf(name + '=') === 0) {
                    return decodeURIComponent(c.substring(name.length + 1));
                }
            }
        } catch(e) {}
        return null;
    }

    // ============================================================
    // 📖 READ SESSION
    // ============================================================
    function readSession() {
        var keys = [MY_KEY, SB_KEY, BACKUP_KEY];
        var raw = null, i;

        for (i = 0; i < keys.length; i++) {
            try { raw = localStorage.getItem(keys[i]); if (raw) break; } catch(e) {}
        }
        if (!raw) {
            for (i = 0; i < keys.length; i++) {
                try { raw = sessionStorage.getItem(keys[i]); if (raw) break; } catch(e) {}
            }
        }
        if (!raw) {
            for (i = 0; i < keys.length; i++) {
                raw = getCookie(keys[i]);
                if (raw) break;
            }
        }

        if (!raw) return null;

        try {
            var p = JSON.parse(raw);
            if (Array.isArray(p)) p = p[p.length - 1];
            if (!p || !p.access_token || !p.user) return null;
            if (p.expires_at && p.expires_at * 1000 < Date.now()) return null;
            return p;
        } catch(e) { return null; }
    }

    // ============================================================
    // 💾 CACHE
    // ============================================================
    function readCache(userId) {
        try {
            var raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            var c = JSON.parse(raw);
            if (!c || c.userId !== userId) return null;
            if (Date.now() - c.ts > 7 * 24 * 60 * 60 * 1000) return null;
            return c;
        } catch(e) { return null; }
    }

    function writeCache(userId, name, avatarUrl) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                userId: userId,
                name: name,
                avatarUrl: avatarUrl,
                ts: Date.now()
            }));
        } catch(e) {}
    }

    function clearCache() {
        try { localStorage.removeItem(CACHE_KEY); } catch(e) {}
    }

    // ============================================================
    // 📱 МОБИЛЬНЫЙ
    // ============================================================
    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        try {
            if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return true;
        } catch(e) {}
        return window.innerWidth <= 768;
    }

    // ============================================================
    // 🔧 UTILS
    // ============================================================
    function getInitials(name) {
        if (!name) return '?';
        var parts = String(name).trim().split(/[\s._-]+/);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name[0].toUpperCase();
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    // ============================================================
    // 🔎 Проверка доступности /profile/ (1 раз, кэшируется)
    // ============================================================
    var _profilePageChecked = null;

    async function checkProfilePage() {
        if (_profilePageChecked !== null) return _profilePageChecked;
        try {
            var res = await fetch('/profile/', { method: 'HEAD' });
            _profilePageChecked = res.ok;
            log('страница /profile/:', res.ok ? 'доступна' : 'недоступна (' + res.status + ')');
        } catch(e) {
            _profilePageChecked = false;
            log('/profile/ check error:', e.message);
        }
        return _profilePageChecked;
    }

    // ============================================================
    // 🌐 FETCH PROFILE
    // ============================================================
    var _profileFetching = false;

    async function fetchProfileFromServer(session) {
        if (_profileFetching) return null;
        _profileFetching = true;
        try {
            var url = SUPABASE_URL + '/rest/v1/profiles?user_id=eq.' +
                      encodeURIComponent(session.user.id) +
                      '&select=*&limit=1';
            var res = await fetch(url, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + session.access_token
                }
            });
            if (!res.ok) {
                log('profile fetch HTTP', res.status);
                return null;
            }
            var arr = await res.json();
            var p = Array.isArray(arr) && arr.length ? arr[0] : null;
            if (!p) return null;

            var name = p.display_name || p.username || null;
            var avatar = p.avatar_url || p.avatar || p.avatarUrl || null;
            return { display_name: name, avatar_url: avatar, _raw: p };
        } catch(e) {
            log('profile fetch error:', e.message);
            return null;
        } finally {
            _profileFetching = false;
        }
    }

    // ============================================================
    // 🌉 BRIDGE
    // ============================================================
    var _bridged = false;
    var _bridgeToken = null;

    async function bridgeToSupabase(session) {
        if (!session || !session.access_token) return;
        if (_bridged && _bridgeToken === session.access_token) return;

        var tries = 0;
        while (tries < 30) {
            if (window.supabaseClient || (window.supabase && window.supabase.auth)) break;
            await new Promise(function(r) { setTimeout(r, 200); });
            tries++;
        }

        var client = window.supabaseClient;

        if (!client && window.supabase && typeof window.supabase.createClient === 'function') {
            try {
                client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
                    auth: {
                        storageKey: SB_KEY,
                        persistSession: true,
                        autoRefreshToken: true,
                        detectSessionInUrl: false
                    }
                });
                window.supabaseClient = client;
            } catch(e) {
                log('createClient failed:', e.message);
            }
        }

        if (!client || !client.auth) return;

        try {
            var cur = await client.auth.getSession();
            var curToken = cur && cur.data && cur.data.session && cur.data.session.access_token;
            if (curToken && curToken === session.access_token) {
                _bridged = true;
                _bridgeToken = session.access_token;
                return;
            }
        } catch(e) {}

        try {
            await client.auth.setSession({
                access_token: session.access_token,
                refresh_token: session.refresh_token
            });
            _bridged = true;
            _bridgeToken = session.access_token;
        } catch(e) {
            log('setSession failed:', e.message);
        }
    }

    // ============================================================
    // 🛡️ ХЕДЕР
    // ============================================================
    function hideNativeHeader() {
        if (!isMobile()) return;
        var t = document.querySelector('.wy-nav-top');
        if (t) t.style.setProperty('display', 'none', 'important');
    }

    function restoreNativeHeader() {
        var t = document.querySelector('.wy-nav-top');
        if (t) t.style.removeProperty('display');
    }

    // ============================================================
    // 📦 CONTAINER
    // ============================================================
    function ensureContainer() {
        var container = document.getElementById(CONTAINER_ID);
        if (container) {
            if (isMobile()) {
                var h = document.getElementById(HEADER_ID);
                if (h && container.parentElement !== h) h.appendChild(container);
            }
            return container;
        }

        container = document.createElement('div');
        container.id = CONTAINER_ID;
        container.style.minHeight = '36px';

        if (isMobile()) {
            hideNativeHeader();

            var customHeader = document.getElementById(HEADER_ID);
            if (!customHeader) {
                customHeader = document.createElement('div');
                customHeader.id = HEADER_ID;
                customHeader.style.cssText = 'position:fixed;top:0;left:0;right:0;height:50px;background:#6C63FF;z-index:99999;display:flex;align-items:center;padding:0 8px;box-shadow:0 2px 8px rgba(0,0,0,0.15);gap:6px;';

                var hamburger = document.createElement('button');
                hamburger.id = 'mobile-hamburger';
                hamburger.type = 'button';
                hamburger.textContent = '☰';
                hamburger.style.cssText = 'background:transparent;border:none;color:#fff;font-size:22px;cursor:pointer;padding:6px 8px;flex-shrink:0;line-height:1;';
                hamburger.onclick = function() {
                    var sidebar = document.querySelector('.wy-nav-side');
                    if (sidebar) sidebar.classList.toggle('shift');
                };

                var title = document.createElement('span');
                title.className = 'mobile-header-title';
                title.textContent = 'Марсианская энциклопедия';
                title.style.cssText = 'color:#fff;font-weight:700;font-size:0.85rem;flex:1;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 8px;';

                container.style.cssText = 'display:flex !important;align-items:center !important;gap:4px !important;flex-shrink:0 !important;';

                customHeader.appendChild(hamburger);
                customHeader.appendChild(title);
                customHeader.appendChild(container);
                document.body.prepend(customHeader);
            } else {
                container.style.cssText = 'display:flex !important;align-items:center !important;gap:4px !important;flex-shrink:0 !important;';
                customHeader.appendChild(container);
            }
            return container;
        }

        var header = document.querySelector('header');
        if (header) {
            container.style.cssText = 'display:inline-flex;align-items:center;gap:6px;float:right;margin-top:6px;margin-right:10px;flex-wrap:wrap;max-width:100%;position:relative;z-index:1000;min-height:36px;';
            header.appendChild(container);
            return container;
        }

        container.style.cssText = 'position:fixed !important;top:10px !important;right:10px !important;z-index:99999 !important;background:rgba(255,255,255,0.9) !important;border-radius:20px !important;padding:4px 12px !important;box-shadow:0 2px 12px rgba(0,0,0,0.15) !important;display:flex !important;align-items:center !important;gap:6px !important;min-height:36px;';
        document.body.prepend(container);
        return container;
    }

    // ============================================================
    // 🎨 RENDER
    // ============================================================
    function renderLoggedOut(container) {
        if (isMobile()) {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 3px;">' +
                '  <a href="/login/" style="color: #fff; text-decoration: none; font-size: 0.7rem; opacity: 0.8;">Войти</a>' +
                '  <a href="/register/" style="color: #fff; background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 12px; text-decoration: none; font-size: 0.7rem;">Регистрация</a>' +
                '</div>';
        } else {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">' +
                '  <a href="/login/" style="color: #555; text-decoration: none; font-size: 0.8rem; white-space: nowrap;">Войти</a>' +
                '  <a href="/register/" style="color: #fff; background: #6C63FF; padding: 4px 12px; border-radius: 16px; text-decoration: none; font-size: 0.8rem; white-space: nowrap;">Регистрация</a>' +
                '</div>';
        }
    }

    function renderLoggedIn(container, name, avatarUrl) {
        var safeName = escapeHtml(name);
        var fallback = 'https://ui-avatars.com/api/?name=' +
            encodeURIComponent(getInitials(name)) +
            '&background=6C63FF&color=fff&size=64&rounded=true';
        var av = avatarUrl || fallback;
        var avEscaped = String(av).replace(/"/g, '&quot;');

        if (isMobile()) {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 3px; background: rgba(255,255,255,0.15); border-radius: 20px; padding: 2px 6px 2px 4px; border: 1px solid rgba(255,255,255,0.1);">' +
                '  <a href="/profile/" style="display: flex; align-items: center; gap: 4px; text-decoration: none; color: #fff;">' +
                '    <img src="' + avEscaped + '" alt="" onerror="this.onerror=null;this.src=\'' + fallback + '\';" style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); object-fit: cover; background: #6C63FF; display: block;">' +
                '    <span style="color: #fff; font-size: 0.6rem; opacity: 0.9;">Профиль</span>' +
                '  </a>' +
                '  <a href="#" onclick="window.logoutUser(); return false;" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.6rem;">Выйти</a>' +
                '</div>';
        } else {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 6px; background: #f5f5f5; padding: 4px 10px; border-radius: 20px; flex-wrap: wrap;">' +
                '  <a href="/profile/" style="display: flex; align-items: center; gap: 6px; text-decoration: none; color: inherit;">' +
                '    <img src="' + avEscaped + '" alt="" onerror="this.onerror=null;this.src=\'' + fallback + '\';" style="width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ddd; object-fit: cover; background: #6C63FF; display: block;">' +
                '    <span style="font-size: 0.75rem; color: #333; max-width: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + safeName + '</span>' +
                '    <span style="color: #6C63FF; font-size: 0.75rem; white-space: nowrap;">Профиль</span>' +
                '  </a>' +
                '  <a href="#" onclick="window.logoutUser(); return false;" style="color: #c0392b; text-decoration: none; font-size: 0.75rem; white-space: nowrap;">Выйти</a>' +
                '</div>';
        }
    }

    // ============================================================
    // 🔄 UPDATE UI
    // ============================================================
    var lastRenderedUserId = null;
    var updateLock = false;

    async function updateUI() {
        if (updateLock) return;
        updateLock = true;

        try {
            var container = ensureContainer();
            if (!container) return;

            var session = readSession();

            if (!session) {
                if (lastRenderedUserId !== null || container.innerHTML.indexOf('Войти') === -1) {
                    renderLoggedOut(container);
                    lastRenderedUserId = null;
                }
                clearCache();
                return;
            }

            var u = session.user;
            var userId = u.id;

            // 1️⃣ Мгновенный рендер из кэша
            var cache = readCache(userId);

            if (cache && lastRenderedUserId !== userId) {
                renderLoggedIn(container, cache.name, cache.avatarUrl);
                lastRenderedUserId = userId;
            } else if (!cache && lastRenderedUserId !== userId) {
                var quickName =
                    (u.user_metadata && u.user_metadata.username) ||
                    (u.email ? u.email.split('@')[0] : 'Профиль');
                renderLoggedIn(container, quickName, null);
                lastRenderedUserId = userId;
            }

            // 🌉 Мостик
            bridgeToSupabase(session);

            // 🔎 Проверяем доступность /profile/ (1 раз)
            checkProfilePage();

            // 2️⃣ Фоновый fetch
            var profile = await fetchProfileFromServer(session);
            var freshName =
                (profile && (profile.display_name || profile.username)) ||
                (u.user_metadata && u.user_metadata.username) ||
                (u.email ? u.email.split('@')[0] : 'Профиль');
            var freshAvatar = (profile && profile.avatar_url) || null;

            // 3️⃣ Обновляем если изменилось
            var cacheNow = readCache(userId);
            var nameChanged = !cacheNow || cacheNow.name !== freshName;
            var avatarChanged = !cacheNow || cacheNow.avatarUrl !== freshAvatar;

            if (nameChanged || avatarChanged) {
                renderLoggedIn(container, freshName, freshAvatar);
            }
            writeCache(userId, freshName, freshAvatar);

        } catch(e) {
            log('updateUI error:', e.message);
        } finally {
            updateLock = false;
        }
    }

    // ============================================================
    // 🚪 LOGOUT
    // ============================================================
    window.logoutUser = function() {
        [MY_KEY, SB_KEY, BACKUP_KEY, CACHE_KEY].forEach(function(k) {
            try { localStorage.removeItem(k); } catch(e) {}
            try { sessionStorage.removeItem(k); } catch(e) {}
        });
        try { document.cookie = SB_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch(e) {}
        try { document.cookie = MY_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch(e) {}

        try {
            var toRemove = [];
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                if (k && (k.indexOf('sb-') === 0 || k.indexOf('mars-auth') === 0)) {
                    toRemove.push(k);
                }
            }
            toRemove.forEach(function(k) { try { localStorage.removeItem(k); } catch(e) {} });
        } catch(e) {}

        try {
            if (window.supabaseClient && window.supabaseClient.auth) {
                window.supabaseClient.auth.signOut();
            }
        } catch(e) {}

        _bridged = false;
        _bridgeToken = null;
        lastRenderedUserId = null;

        window.location.href = '/';
    };

    // ============================================================
    // 🔔 PUBLIC API
    // ============================================================
    window.refreshAuthButton = function() {
        lastRenderedUserId = null;
        _bridged = false;
        updateUI();
    };

    // ============================================================
    // 👂 EVENTS (без polling!)
    // ============================================================
    window.addEventListener('storage', updateUI);
    window.addEventListener('focus', updateUI);
    window.addEventListener('pageshow', updateUI);
    window.addEventListener('online', updateUI);

    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) updateUI();
    });

    // Ресайз
    var lastMobile = isMobile();
    var resizeTimer = null;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var nowMobile = isMobile();
            if (nowMobile !== lastMobile) {
                lastMobile = nowMobile;

                var c = document.getElementById(CONTAINER_ID);
                if (c) c.remove();
                var h = document.getElementById(HEADER_ID);
                if (h) h.remove();
                if (!nowMobile) restoreNativeHeader();

                lastRenderedUserId = null;
                updateUI();
            }
        }, 250);
    });

    // ============================================================
    // 🛡️ GUARD хедера — через MutationObserver, не polling
    // ============================================================
    var headerGuard = null;
    var headerGuardTimer = null;

    function startHeaderGuard() {
        if (!isMobile()) return;
        if (headerGuard) return;

        var nativeHeader = document.querySelector('.wy-nav-top');
        if (!nativeHeader) return;

        headerGuard = new MutationObserver(function() {
            if (headerGuardTimer) return;
            headerGuardTimer = setTimeout(function() {
                headerGuardTimer = null;
                if (isMobile()) {
                    var t = document.querySelector('.wy-nav-top');
                    if (t && t.style.display !== 'none') {
                        t.style.setProperty('display', 'none', 'important');
                    }
                }
            }, 300);
        });

        try {
            headerGuard.observe(nativeHeader, {
                attributes: true,
                attributeFilter: ['style', 'class']
            });

            // Auto-disconnect через 30 сек — тема уже устаканилась
            setTimeout(function() {
                if (headerGuard) {
                    try { headerGuard.disconnect(); } catch(e) {}
                    headerGuard = null;
                }
            }, 30000);
        } catch(e) {}
    }

    // ============================================================
    // 🚀 START
    // ============================================================
    function start() {
        updateUI();
        setTimeout(updateUI, 300);
        setTimeout(updateUI, 1200);

        // Запускаем guard хедера (только MutationObserver, не setInterval)
        setTimeout(startHeaderGuard, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
