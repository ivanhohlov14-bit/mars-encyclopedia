// supabase-client.js — ЕДИНЫЙ клиент для всего сайта
// + перехват createClient, чтобы старые скрипты не дублировали клиент
(function() {
    'use strict';

    // Защита от повторной загрузки
    if (window.__marsSupabaseSetup) return;
    window.__marsSupabaseSetup = true;

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // Ждём загрузки Supabase SDK
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
        // ============================================================
        // 1. Создаём ЕДИНСТВЕННЫЙ клиент
        // ============================================================
        const singleClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                storage: window.localStorage,
                storageKey: 'mars-auth-token'
            }
        });

        // ============================================================
        // 2. ПЕРЕХВАТ: любые createClient возвращают этот же клиент
        // ============================================================
        const originalCreateClient = supabase.createClient;
        supabase.createClient = function(url, key, options) {
            // Если URL и ключ совпадают — отдаём единый клиент
            if (url === SUPABASE_URL && key === SUPABASE_KEY) {
                // Один раз логируем, что перехватили
                if (!window.__marsClientLogged) {
                    window.__marsClientLogged = true;
                    console.log('🔒 createClient перехвачен — используется единый клиент');
                }
                return singleClient;
            }
            // Если другой проект — создаём отдельный клиент
            return originalCreateClient.call(this, url, key, options);
        };

        // ============================================================
        // 3. Экспортируем клиент глобально
        // ============================================================
        window.supabaseClient = singleClient;
        window.getSupabase = () => singleClient;

        // ============================================================
        // 4. Кэш сессии (для быстрого доступа)
        // ============================================================
        window.marsSession = {
            user: null,
            profile: null,
            ready: false,
            listeners: [],

            async init() {
                const { data } = await singleClient.auth.getSession();
                this.user = data?.session?.user || null;

                if (this.user) {
                    try {
                        const { data: profile } = await singleClient
                            .from('profiles')
                            .select('*')
                            .eq('user_id', this.user.id)
                            .single();
                        this.profile = profile;
                    } catch (e) {
                        console.warn('Профиль не загружен:', e);
                    }
                }

                this.ready = true;
                this.listeners.forEach(fn => {
                    try { fn(this); } catch (e) { console.warn(e); }
                });
                return this;
            },

            onChange(fn) {
                if (this.ready) fn(this);
                else this.listeners.push(fn);
            }
        };

        // Следим за авторизацией
        singleClient.auth.onAuthStateChange((event, session) => {
            window.marsSession.user = session?.user || null;
            if (!session) window.marsSession.profile = null;
            console.log('🔐 Auth event:', event);
        });

        // Запускаем init
        window.marsSession.init();

        console.log('✅ Единый Supabase клиент готов (createClient перехвачен)');
    });
})();
