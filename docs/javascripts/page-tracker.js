// docs/javascripts/page-tracker.js
// v2 — единый клиент, надёжная выдача XP

(function() {
    'use strict';
    console.log('✅ page-tracker.js v2 загружен');

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";
    const SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';

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
            } catch(e) {
                console.warn('[page-tracker] createClient failed:', e.message);
            }
        }
        return null;
    }

    var excluded = ['/profile/', '/login/', '/register/', '/stats/', '/profile-view/'];

    function showXpToast(amount) {
        var toast = document.createElement('div');
        toast.textContent = '⭐ +' + amount + ' XP';
        toast.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; background: #6C63FF; color: white; padding: 20px 40px; border-radius: 16px; font-size: 2rem; font-weight: bold; font-family: \'Segoe UI\', Arial, sans-serif; box-shadow: 0 20px 60px rgba(0,0,0,0.3); pointer-events: none; animation: xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, xpFadeOut 2.8s ease forwards 0.3s;';

        if (!document.getElementById('xp-toast-styles')) {
            var style = document.createElement('style');
            style.id = 'xp-toast-styles';
            style.textContent =
                '@keyframes xpPop { 0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }' +
                '@keyframes xpFadeOut { 0% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, -60%); } }';
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        setTimeout(function() { if (toast.parentNode) toast.remove(); }, 3200);
    }

    async function init() {
        if (excluded.includes(window.location.pathname)) return;

        var client = getClient();
        if (!client) {
            console.warn('[page-tracker] client not ready');
            return;
        }

        // Ждём пока bridge установит сессию
        var session = null;
        for (var i = 0; i < 15; i++) {
            try {
                var r = await client.auth.getSession();
                session = r && r.data && r.data.session;
                if (session) break;
            } catch(e) {}
            await new Promise(function(res) { setTimeout(res, 300); });
        }

        if (!session || !session.user) {
            console.log('[page-tracker] нет сессии');
            return;
        }

        var user = session.user;
        var pageKey = 'read_' + window.location.pathname;
        if (localStorage.getItem(pageKey)) return;

        var xpAwarded = false;

        function checkScroll() {
            if (xpAwarded) return;
            var scrollY = window.scrollY;
            var windowHeight = window.innerHeight;
            var documentHeight = document.documentElement.scrollHeight;
            var maxScroll = documentHeight - windowHeight;
            if (maxScroll < 100) return;
            var scrollPercent = (scrollY / maxScroll) * 100;

            if (scrollPercent >= 90) {
                xpAwarded = true;
                if (typeof window.addExperience === 'function') {
                    window.addExperience(user.id, 5);
                    localStorage.setItem(pageKey, 'true');
                    showXpToast(5);
                }
                window.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        }

        window.addEventListener('scroll', checkScroll, { passive: true });
        window.addEventListener('resize', checkScroll);
        setTimeout(checkScroll, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
