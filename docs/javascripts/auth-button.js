// ============================================================
// auth-button.js v4 — instant render, no flicker, mobile-safe
// ============================================================
(function() {
    'use strict';

    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SUPABASE_URL = 'https://' + PROJECT_REF + '.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';
    var BACKUP_KEY = 'mars-auth-backup';
    var CACHE_KEY = 'mars-auth-ui-cache';

    // ============================================================
    // Cookie helper
    // ============================================================
    function getCookie(name) {
        try {
            var cs = document.cookie.split(';');
            for (var i = 0; i < cs.length; i++) {
                var c = cs[i].trim();
                if (c.indexOf(name + '=') === 0) return decodeURIComponent(c.substring(name.length + 1));
            }
        } catch(e) {}
        return null;
    }

    // ============================================================
    // Read session — из всех источников
    // ============================================================
    function readSession() {
        var keys = [MY_KEY, SB_KEY, BACKUP_KEY];
        var raw = null;
        var i;
        for (i = 0; i < keys.length; i++) { try { raw = localStorage.getItem(keys[i]); if (raw) break; } catch(e) {} }
        if (!raw) for (i = 0; i < keys.length; i++) { try { raw = sessionStorage.getItem(keys[i]); if (raw) break; } catch(e) {} }
        if (!raw) for (i = 0; i < keys.length; i++) { raw = getCookie(keys[i]); if (raw) break; }
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
    // 💾 Cache — мгновенный рендер без мерцания
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
    // Utils
    // ============================================================
    function isMobile() { return window.innerWidth <= 768; }

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
    // Profile fetch (без supabase-js)
    // ============================================================
    var _profileFetching = false;

    async function fetchProfileFromServer(session) {
        if (_profileFetching) return null;
        _profileFetching = true;
        try {
            var url = SUPABASE_URL + '/rest/v1/profiles?user_id=eq.' + encodeURIComponent(session.user.id) + '&select=display_name,username,avatar_url&limit=1';
            var res = await fetch(url, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + session.access_token
                }
            });
            if (!res.ok) return null;
            var arr = await res.json();
            return Array.isArray(arr) && arr.length ? arr[0] : null;
        } catch(e) {
            return null;
        } finally {
            _profileFetching = false;
        }
    }

    // ============================================================
    // Container
    // ============================================================
    var CONTAINER_ID = 'auth-btn-container';

    function ensureContainer() {
        var container = document.getElementById(CONTAINER_ID);
        if (container) return container;

        container = document.createElement('div');
        container.id = CONTAINER_ID;

        // Минимальная высота — чтобы не было «сжатия» при обновлении
        container.style.minHeight = '36px';

        if (isMobile()) {
            var oldTop = document.querySelector('.wy-nav-top');
            if (oldTop) oldTop.style.display = 'none';

            var customHeader = document.getElementById('custom-mobile-header');
            if (!customHeader) {
                customHeader = document.createElement('div');
                customHeader.id = 'custom-mobile-header';
                customHeader.style.cssText = 'position:fixed;top:0;left:0;right:0;height:50px;background:#6C63FF;z-index:9999;display:flex;align-items:center;padding:0 8px;box-shadow:0 2px 8px rgba(0,0,0,0.15);gap:6px;';

                var hamburger = document.createElement('button');
                hamburger.id = 'mobile-hamburger';
                hamburger.textContent = '☰';
                hamburger.style.cssText = 'background:transparent;border:none;color:#fff;font-size:22px;cursor:pointer;padding:6px 8px;flex-shrink:0;line-height:1;';
                hamburger.onclick = function() {
                    var sidebar = document.querySelector('.wy-nav-side');
                    if (sidebar) sidebar.classList.toggle('shift');
                };

                container.style.cssText = 'display:flex !important;align-items:center !important;gap:4px !important;margin-left:auto !important;flex-shrink:0 !important;';

                customHeader.appendChild(hamburger);
                customHeader.appendChild(container);
                document.body.prepend(customHeader);
            } else {
                container.style.cssText = 'display:flex !important;align-items:center !important;gap:4px !important;margin-left:auto !important;flex-shrink:0 !important;';
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
    // Render
    // ============================================================
    function renderLoggedOut(container) {
        if (isMobile()) {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 3px;">' +
                '  <a href="/login/" style="color: #fff; text-decoration: none; font-size: 0.72rem; opacity: 0.85;">Войти</a>' +
                '  <a href="/register/" style="color: #fff; background: rgba(255,255,255,0.22); padding: 4px 12px; border-radius: 14px; text-decoration: none; font-size: 0.72rem; font-weight: 600;">Регистрация</a>' +
                '</div>';
        } else {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">' +
                '  <a href="/login/" style="color: #555; text-decoration: none; font-size: 0.85rem; white-space: nowrap; padding: 6px 8px;">Войти</a>' +
                '  <a href="/register/" style="color: #fff; background: #6C63FF; padding: 6px 14px; border-radius: 16px; text-decoration: none; font-size: 0.85rem; white-space: nowrap; font-weight: 600;">Регистрация</a>' +
                '</div>';
        }
    }

    function renderLoggedIn(container, name, avatarUrl) {
        var safeName = escapeHtml(name);
        var av = avatarUrl || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(getInitials(name)) + '&background=6C63FF&color=fff&size=64&rounded=true');

        if (isMobile()) {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.18); border-radius: 22px; padding: 3px 8px 3px 4px; border: 1px solid rgba(255,255,255,0.15);">' +
                '  <img src="' + av + '" alt="" style="width: 26px; height: 26px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.35); object-fit: cover; flex-shrink: 0;">' +
                '  <a href="/profile/" style="color: #fff; text-decoration: none; font-size: 0.7rem; opacity: 0.95; font-weight: 600; white-space: nowrap;">Профиль</a>' +
                '  <a href="#" onclick="window.logoutUser(); return false;" style="color: rgba(255,255,255,0.75); text-decoration: none; font-size: 0.7rem; white-space: nowrap;">Выйти</a>' +
                '</div>';
        } else {
            container.innerHTML =
                '<div style="display: flex; align-items: center; gap: 8px; background: #f5f5f5; padding: 5px 12px; border-radius: 20px; flex-wrap: wrap;">' +
                '  <img src="' + av + '" alt="" style="width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ddd; object-fit: cover; flex-shrink: 0;">' +
                '  <span style="font-size: 0.8rem; color: #333; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600;">' + safeName + '</span>' +
                '  <a href="/profile/" style="color: #6C63FF; text-decoration: none; font-size: 0.8rem; white-space: nowrap; font-weight: 600;">Профиль</a>' +
                '  <a href="#" onclick="window.logoutUser(); return false;" style="color: #c0392b; text-decoration: none; font-size: 0.8rem; white-space: nowrap;">Выйти</a>' +
                '</div>';
        }
    }

    // ============================================================
    // Update UI — мгновенный рендер из кэша + фоновое обновление
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
                if (lastRenderedUserId !== null) {
                    renderLoggedOut(container);
                    lastRenderedUserId = null;
                } else {
                    renderLoggedOut(container);
                }
                clearCache();
                return;
            }

            var u = session.user;
            var userId = u.id;

            // 1️⃣ Мгновенный рендер из кэша (нет мерцания)
            var cache = readCache(userId);
            if (cache) {
                if (lastRenderedUserId !== userId) {
                    renderLoggedIn(container, cache.name, cache.avatarUrl);
                    lastRenderedUserId = userId;
                }
            } else {
                // Нет кэша — рендерим с минимальными данными из сессии
                var quickName = (u.user_metadata && u.user_metadata.username) || (u.email ? u.email.split('@')[0] : 'Профиль');
                if (lastRenderedUserId !== userId) {
                    renderLoggedIn(container, quickName, null);
                    lastRenderedUserId = userId;
                }
            }

            // 2️⃣ Фоновый fetch профиля
            var profile = await fetchProfileFromServer(session);
            var freshName = (profile && (profile.display_name || profile.username)) ||
                            (u.user_metadata && u.user_metadata.username) ||
                            (u.email ? u.email.split('@')[0] : 'Профиль');
            var freshAvatar = (profile && profile.avatar_url) || null;

            // 3️⃣ Если данные изменились — обновим
            var cacheNow = readCache(userId);
            var nameChanged = !cacheNow || cacheNow.name !== freshName;
            var avatarChanged = !cacheNow || cacheNow.avatarUrl !== freshAvatar;

            if (nameChanged || avatarChanged) {
                renderLoggedIn(container, freshName, freshAvatar);
                writeCache(userId, freshName, freshAvatar);
            } else {
                writeCache(userId, freshName, freshAvatar);
            }
        } catch(e) {
            console.warn('[auth-button]', e);
        } finally {
            updateLock = false;
        }
    }

    // ============================================================
    // Logout
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
                if (k && (k.indexOf('sb-') === 0 || k.indexOf('mars-auth') === 0)) toRemove.push(k);
            }
            toRemove.forEach(function(k) { localStorage.removeItem(k); });
        } catch(e) {}
        window.location.href = '/';
    };

    // ============================================================
    // Public refresh API — вызывается из login.md
    // ============================================================
    window.refreshAuthButton = function() {
        lastRenderedUserId = null;
        updateUI();
        setTimeout(updateUI, 500);
    };

    // ============================================================
    // Events
    // ============================================================
    window.addEventListener('storage', updateUI);
    window.addEventListener('focus', updateUI);
    window.addEventListener('pageshow', updateUI);
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) updateUI();
    });

    // Ресайз (мобильный ↔ ПК)
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
                var h = document.getElementById('custom-mobile-header');
                if (h) h.remove();
                var t = document.querySelector('.wy-nav-top');
                if (t && !nowMobile) t.style.display = '';
                lastRenderedUserId = null;
                updateUI();
            }
        }, 250);
    });

    // ============================================================
    // Start
    // ============================================================
    function start() {
        // Первый рендер максимально рано
        updateUI();
        // Повторные попытки на случай задержки DOM
        setTimeout(updateUI, 300);
        setTimeout(updateUI, 1200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
