// docs/javascripts/experience.js
// v2 — единый клиент, без конфликтов

(function() {
    'use strict';
    console.log('✅ experience.js v2 загружен');

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";
    const SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';

    // ============================================================
    // 🌉 ЕДИНЫЙ КЛИЕНТ
    // ============================================================
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
                console.warn('[experience] createClient failed:', e.message);
            }
        }
        return null;
    }

    const LEVEL_MAP = [
        { level: 1, xp: 0, title: '🌱 Новый поселенец' },
        { level: 2, xp: 50, title: '🔭 Исследователь' },
        { level: 3, xp: 150, title: '🚀 Первопроходец' },
        { level: 4, xp: 350, title: '🏠 Колонизатор' },
        { level: 5, xp: 700, title: '⚡ Командир базы' },
        { level: 6, xp: 1200, title: '👑 Легенда Марса' }
    ];

    function getLevel(xp) {
        let level = 1;
        let title = LEVEL_MAP[0].title;
        for (let i = LEVEL_MAP.length - 1; i >= 0; i--) {
            if (xp >= LEVEL_MAP[i].xp) {
                level = LEVEL_MAP[i].level;
                title = LEVEL_MAP[i].title;
                break;
            }
        }
        return { level, title };
    }

    async function addExperience(userId, points) {
        if (!userId) return;

        const client = getClient();
        if (!client) {
            console.warn('[experience] client not ready');
            return;
        }

        console.log('🔥 addExperience:', userId, '+' + points);

        const { data: profile, error } = await client
            .from('profiles')
            .select('experience, level')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('❌ Ошибка получения профиля:', error);
            return;
        }

        const currentExp = profile?.experience || 0;
        const currentLevel = profile?.level || 1;
        const newExp = currentExp + points;
        const newLevelData = getLevel(newExp);
        const newLevel = newLevelData.level;
        const newTitle = newLevelData.title;

        const { error: updateError } = await client
            .from('profiles')
            .update({ experience: newExp, level: newLevel })
            .eq('user_id', userId);

        if (updateError) {
            console.error('❌ Ошибка обновления:', updateError);
            return;
        }

        console.log('✅ Опыт обновлён:', newExp, 'уровень:', newLevel);

        if (newLevel !== currentLevel) {
            console.log('🎉 Повышение:', currentLevel, '→', newLevel);
            if (typeof window.showLevelUpToast === 'function') {
                window.showLevelUpToast(newLevel, newTitle);
            }
            try {
                await client.from('notifications').insert([{
                    user_id: userId,
                    message: '🎉 Вы достигли ' + newLevel + ' уровня — ' + newTitle + '!',
                    type: 'level_up'
                }]);
            } catch(e) {}
        }

        await checkAchievements(userId, newExp);
    }

    async function checkAchievements(userId, currentExp) {
        const client = getClient();
        if (!client) return;

        const { data: allAchievements, error: achError } = await client
            .from('achievements')
            .select('*');

        if (achError) return;

        const { data: earned } = await client
            .from('user_achievements')
            .select('achievement_id')
            .eq('user_id', userId);

        const earnedIds = (earned || []).map(item => item.achievement_id);

        for (const ach of allAchievements || []) {
            if (earnedIds.includes(ach.id)) continue;
            if (ach.name === '🚀 Первый шаг' && currentExp >= 10) await grantAchievement(userId, ach.id);
            else if (ach.name === '📖 Знаток' && currentExp >= 50) await grantAchievement(userId, ach.id);
            else if (ach.name === '🌍 Исследователь' && currentExp >= 100) await grantAchievement(userId, ach.id);
            else if (ach.name === '🖊️ Летописец' && currentExp >= 200) await grantAchievement(userId, ach.id);
            else if (ach.name === '🏆 Марсианин' && currentExp >= 300) await grantAchievement(userId, ach.id);
        }
    }

    async function grantAchievement(userId, achievementId) {
        const client = getClient();
        if (!client) return;

        const { error } = await client
            .from('user_achievements')
            .insert([{ user_id: userId, achievement_id: achievementId }]);

        if (error) return;

        console.log('🏅 Достижение выдано');

        try {
            const { data: ach } = await client
                .from('achievements')
                .select('name, icon')
                .eq('id', achievementId)
                .single();

            if (ach) {
                await client.from('notifications').insert([{
                    user_id: userId,
                    message: '🏅 Получено достижение: ' + ach.icon + ' ' + ach.name + '!',
                    type: 'achievement'
                }]);
            }
        } catch(e) {}
    }

    function showLevelUpToast(level, title) {
        const toast = document.createElement('div');
        toast.innerHTML =
            '<div style="background: linear-gradient(135deg, #f39c12, #e67e22); color: #fff; padding: 20px 40px; border-radius: 16px; font-size: 1.8rem; font-weight: bold; font-family: \'Segoe UI\', Arial, sans-serif; box-shadow: 0 20px 60px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 16px; animation: levelUpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, levelUpFadeOut 3s ease forwards 0.5s;">' +
            '  <span style="font-size: 3rem;">🎉</span>' +
            '  <div>' +
            '    <div style="font-size: 1rem; opacity: 0.8;">Новый уровень!</div>' +
            '    <div>' + level + ' — ' + title + '</div>' +
            '  </div>' +
            '</div>';
        toast.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; pointer-events: none;';

        if (!document.getElementById('level-up-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'level-up-toast-styles';
            style.textContent =
                '@keyframes levelUpPop { 0% { transform: scale(0.3) rotate(-5deg); opacity: 0; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }' +
                '@keyframes levelUpFadeOut { 0% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; transform: scale(1.1) translateY(-20px); } }';
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        setTimeout(function() { if (toast.parentNode) toast.remove(); }, 3500);
    }

    window.addExperience = addExperience;
    window.showLevelUpToast = showLevelUpToast;

    console.log('✅ experience.js v2 готов');
})();
