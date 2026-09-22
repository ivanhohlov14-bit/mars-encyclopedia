// docs/javascripts/supabase-auth.js
// v2 — не перезаписывает window.supabase, не создаёт конфликтных клиентов

(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";
    const PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    const SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';

    // Возвращаем единый клиент — не создаём новый
    function getClient() {
        if (window.supabaseClient && window.supabaseClient.auth) return window.supabaseClient;
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            try {
                window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
                    auth: {
                        storageKey: SB_KEY,
                        persistSession: true,
                        autoRefreshToken: true,
                        detectSessionInUrl: false
                    }
                });
                return window.supabaseClient;
            } catch(e) {}
        }
        return null;
    }

    async function registerUser() {
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const client = getClient();
        if (!client) { alert('Ошибка: клиент не готов'); return; }
        const { error } = await client.auth.signUp({ email, password });
        if (error) alert('Ошибка: ' + error.message);
        else alert('Регистрация успешна! Проверьте почту.');
    }

    async function loginUser() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const client = getClient();
        if (!client) { alert('Ошибка: клиент не готов'); return; }
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) alert('Ошибка: ' + error.message);
        else alert('Вход выполнен!');
    }

    window.registerUser = registerUser;
    window.loginUser = loginUser;

    console.log('✅ supabase-auth.js v2 готов (без конфликтов)');
})();
