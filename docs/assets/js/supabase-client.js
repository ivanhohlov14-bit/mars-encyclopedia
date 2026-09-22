// supabase-client.js v2 — сам находит сессию и приводит её к формату supabase-js
(function() {
    'use strict';

    if (window.__marsSupabaseSetup) return;
    window.__marsSupabaseSetup = true;

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";
    const PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    const SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    const MY_KEY = 'mars-auth-v1';
    const BACKUP_KEY = 'mars-auth-backup';

    // ============================================================
    // 🍪 COOKIE
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
    // 📖 НАЙТИ СЕССИЮ В ЛЮБОМ ФОРМАТЕ (массив/объект, любой ключ/cookie)
    // ============================================================
    function findSession() {
        var keys = [MY_KEY, SB_KEY, BACKUP_KEY];
        var raw = null, i;

        // localStorage
        for (i = 0; i < keys.length; i++) {
            try { raw = localStorage.getItem(keys[i]); if (raw) break; } catch(e) {}
        }
        // sessionStorage
        if (!raw) for (i = 0; i < keys.length; i++) {
            try { raw = sessionStorage.getItem(keys[i]); if (raw) break; } catch(e) {}
        }
        // cookies
        if (!raw) for (i = 0; i < keys.length; i++) {
            raw = getCookie(keys[i]);
            if (raw) break;
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
    // 💾 СОХРАНИТЬ В sb-* В ФОРМАТЕ ОБЪЕКТА (то, что ждёт supabase-js v2)
    // ============================================================
    function writeSbKey(session) {
        try {
            localStorage.setItem(SB_KEY, JSON.stringify(session));
        } catch(e) {}
        try {
            sessionStorage.setItem(SB_KEY, JSON.stringify(session));
        } catch(e) {}
    }

    // ============================================================
    // 📦 Хранилище
    // ============================================================
    function getSafeStorage() {
        try {
            localStorage.setItem('__t', '1');
            localStorage.removeItem('__t');
            return window.localStorage;
        } catch (e) {
            try { return window.sessionStorage; } catch(e2) { return null; }
        }
    }

    // ============================================================
    // ⏳ Ждём SDK
    // ============================================================
    function waitForSDK(cb, n) {
        n = n || 0;
        if (typeof supabase !== 'undefined' && supabase.createClient) cb();
        else if (n < 50) setTimeout(function() { waitForSDK(cb, n + 1); }, 100);
        else console.error('❌ Supabase SDK не загрузился');
    }

    waitForSDK(function() {
        var storage = getSafeStorage();

        // ⚡ КЛЮЧЕВОЙ МОМЕНТ: до создания клиента ищем сессию
        // и записываем её в sb-* в формате объекта
        var foundSession = findSession();
        if (foundSession) {
            writeSbKey(foundSession);
            console.log('✅ Сессия найдена и приведена к формату supabase-js');
        }

        // ============================================================
        // Единый клиент
        // ============================================================
        var singleClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: false,
                storage: storage,
                storageKey: SB_KEY
            }
        });

        // ============================================================
        // Перехват createClient
        // ============================================================
        var originalCreateClient = supabase.createClient;
        supabase.createClient = function(url, key, options) {
            if (url === SUPABASE_URL && key === SUPABASE_KEY) {
                if (!window.__marsClientLogged) {
                    window.__marsClientLogged = true;
                    console.log('🔒 createClient перехвачен — используется единый клиент');
                }
                return singleClient;
            }
            return originalCreateClient.call(this, url, key, options);
        };

        window.supabaseClient = singleClient;
        window.getSupabase = function() { return singleClient; };

        // ============================================================
        // Если нашли сессию, но клиент её ещё не видит — ставим через setSession
        // ============================================================
        if (foundSession) {
            singleClient.auth.setSession({
                access_token: foundSession.access_token,
                refresh_token: foundSession.refresh_token
            }).then(function(r) {
                if (r && r.error) {
                    console.warn('[supabase-client] setSession:', r.error.message);
                } else {
                    console.log('✅ Сессия установлена в supabase-js');
                }
            }).catch(function(e) {
                console.warn('[supabase-client] setSession exception:', e.message);
            });
        }

        // ============================================================
        // Кэш сессии (marsSession)
        // ============================================================
        window.marsSession = {
            user: null,
            profile: null,
            ready: false,
            listeners: [],

            init: async function() {
                try {
                    var r = await singleClient.auth.getSession();
                    this.user = r && r.data && r.data.session && r.data.session.user || null;

                    if (this.user) {
                        var pr = await singleClient
                            .from('profiles')
                            .select('*')
                            .eq('user_id', this.user.id)
                            .maybeSingle();
                        this.profile = pr && pr.data || null;
                    }
                } catch (e) {
                    console.warn('marsSession init:', e.message);
                }
                this.ready = true;
                var self = this;
                this.listeners.forEach(function(fn) {
                    try { fn(self); } catch(e) {}
                });
                return this;
            },

            onChange: function(fn) {
                if (this.ready) fn(this);
                else this.listeners.push(fn);
            },

            refresh: async function() {
                try {
                    var r = await singleClient.auth.refreshSession();
                    if (r && r.data && r.data.session && r.data.session.user) {
                        this.user = r.data.session.user;
                    }
                } catch (e) {}
                return this.user;
            }
        };

        singleClient.auth.onAuthStateChange(async function(event, session) {
            window.marsSession.user = session && session.user || null;
            if (!session) {
                window.marsSession.profile = null;
            } else {
                try {
                    var pr = await singleClient
                        .from('profiles')
                        .select('*')
                        .eq('user_id', session.user.id)
                        .maybeSingle();
                    window.marsSession.profile = pr && pr.data || null;
                } catch(e) {}
            }
            console.log('🔐 Auth event:', event, session && session.user && session.user.email || '');
        });

        window.marsSession.init();

        // Автообновление токена каждые 5 минут
        setInterval(async function() {
            if (window.marsSession.user) {
                try { await singleClient.auth.refreshSession(); } catch(e) {}
            }
        }, 5 * 60 * 1000);

        console.log('✅ Единый Supabase клиент готов');
        console.log('💾 Хранилище:', storage === window.localStorage ? 'localStorage' : 'sessionStorage');
    });
})();
