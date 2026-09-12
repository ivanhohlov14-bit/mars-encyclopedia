// supabase-client.js — ЕДИНЫЙ клиент для всего сайта
(function() {
    'use strict';

    if (window.supabaseClient) return; // Уже создан — не дублируем

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    if (typeof supabase === 'undefined') {
        console.error('❌ Supabase SDK не загружен');
        return;
    }

    // Создаём ЕДИНСТВЕННЫЙ клиент
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage,
            storageKey: 'mars-auth-token'
        }
    });

    // Глобальные хелперы
    window.getSupabase = () => window.supabaseClient;

    // Кэш сессии
    window.marsSession = {
        user: null,
        profile: null,
        ready: false,
        listeners: [],

        async init() {
            const { data } = await window.supabaseClient.auth.getSession();
            this.user = data?.session?.user || null;

            if (this.user) {
                try {
                    const { data: profile } = await window.supabaseClient
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
            this.listeners.forEach(fn => fn(this));
            return this;
        },

        onChange(fn) {
            if (this.ready) fn(this);
            else this.listeners.push(fn);
        }
    };

    // Следим за изменением авторизации
    window.supabaseClient.auth.onAuthStateChange((event, session) => {
        window.marsSession.user = session?.user || null;
        if (!session) window.marsSession.profile = null;
        console.log('🔐 Auth:', event);
    });

    // Автозапуск
    window.marsSession.init();

    console.log('✅ Единый Supabase клиент создан');
})();
