// supabase-client.js — ЕДИНЫЙ клиент с надёжной сессией
(function() {
    'use strict';

    if (window.__marsSupabaseSetup) return;
    window.__marsSupabaseSetup = true;

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // ============================================================
    // Определяем надёжное хранилище
    // ============================================================
    function getSafeStorage() {
        try {
            // Сначала localStorage
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return window.localStorage;
        } catch (e) {
            console.warn('⚠️ localStorage недоступен, используем sessionStorage');
            try {
                return window.sessionStorage;
            } catch (e2) {
                console.error('❌ Хранилище недоступно');
                return null;
            }
        }
    }

    function waitForSDK(callback, attempts = 0) {
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            callback();
        } else if (attempts < 50) {
            setTimeout(() => waitForSDK(callback, attempts + 1), 100);
        } else {
            console.error('❌ Supabase SDK не загрузился');
        }
    }

    waitForSDK(() => {
        const storage = getSafeStorage();

        // Единый клиент
        const singleClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                storage: storage,
                storageKey: 'sb-ncytbgbzfjfoqmmgfygz-auth-token'
            }
        });

        // Перехват createClient
        const originalCreateClient = supabase.createClient;
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
        window.getSupabase = () => singleClient;

        // ============================================================
        // Кэш сессии с автообновлением
        // ============================================================
        window.marsSession = {
            user: null,
            profile: null,
            ready: false,
            listeners: [],

            async init() {
                try {
                    const { data } = await singleClient.auth.getSession();
                    this.user = data?.session?.user || null;

                    if (this.user) {
                        const { data: profile } = await singleClient
                            .from('profiles')
                            .select('*')
                            .eq('user_id', this.user.id)
                            .maybeSingle();
                        this.profile = profile;
                    }
                } catch (e) {
                    console.warn('Ошибка init сессии:', e);
                }

                this.ready = true;
                this.listeners.forEach(fn => {
                    try { fn(this); } catch (e) {}
                });
                return this;
            },

            onChange(fn) {
                if (this.ready) fn(this);
                else this.listeners.push(fn);
            },

            async refresh() {
                try {
                    const { data } = await singleClient.auth.refreshSession();
                    if (data?.session?.user) {
                        this.user = data.session.user;
                    }
                } catch (e) {}
                return this.user;
            }
        };

        // Следим за авторизацией
        singleClient.auth.onAuthStateChange(async (event, session) => {
            window.marsSession.user = session?.user || null;
            if (!session) {
                window.marsSession.profile = null;
            } else {
                // Обновляем профиль
                try {
                    const { data: profile } = await singleClient
                        .from('profiles')
                        .select('*')
                        .eq('user_id', session.user.id)
                        .maybeSingle();
                    window.marsSession.profile = profile;
                } catch (e) {}
            }
            console.log('🔐 Auth event:', event, session?.user?.email || '');
        });

        // Запускаем init
        window.marsSession.init();

        // ============================================================
        // АВТООБНОВЛЕНИЕ каждые 5 минут (для мобильных)
        // ============================================================
        setInterval(async () => {
            if (window.marsSession.user) {
                try {
                    await singleClient.auth.refreshSession();
                } catch (e) {}
            }
        }, 5 * 60 * 1000);

        console.log('✅ Единый Supabase клиент готов');
        console.log('💾 Хранилище:', storage === window.localStorage ? 'localStorage' : 'sessionStorage');
    });
})();
