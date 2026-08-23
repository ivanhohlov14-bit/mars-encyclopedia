// docs/javascripts/experience.js
// С ДИАГНОСТИКОЙ — проверяет, обновляется ли уровень

(function() {
    console.log('✅ experience.js загружен (v2)');

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

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

        console.log('🔥 addExperience вызвана! userId:', userId, 'points:', points);

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        const { data: profile, error } = await client
            .from('profiles')
            .select('experience, level')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('❌ Ошибка получения профиля:', error);
            return;
        }

        console.log('📊 Профиль из БД:', profile);

        const currentExp = profile?.experience || 0;
        const currentLevel = profile?.level || 1;
        const newExp = currentExp + points;
        const newLevelData = getLevel(newExp);
        const newLevel = newLevelData.level;
        const newTitle = newLevelData.title;

        console.log(`📊 Текущий опыт: ${currentExp}, новый: ${newExp}`);
        console.log(`📊 Текущий уровень: ${currentLevel}, новый: ${newLevel}`);

        const updateData = {
            experience: newExp,
            level: newLevel
        };

        console.log('📤 Обновляем БД:', updateData);

        const { error: updateError } = await client
            .from('profiles')
            .update(updateData)
            .eq('user_id', userId);

        if (updateError) {
            console.error('❌ Ошибка обновления:', updateError);
            return;
        }

        console.log(`✅ ОБНОВЛЕНО! Опыт: ${newExp}, Уровень: ${newLevel}`);

        if (newLevel !== currentLevel) {
            console.log(`🎉 ПОВЫШЕНИЕ УРОВНЯ! ${currentLevel} → ${newLevel} (${newTitle})`);
            if (typeof window.showLevelUpToast === 'function') {
                window.showLevelUpToast(newLevel, newTitle);
            } else {
                alert(`🎉 Поздравляем! Вы достигли ${newLevel} уровня — ${newTitle}!`);
            }
            await client
                .from('notifications')
                .insert([{
                    user_id: userId,
                    message: `🎉 Вы достигли ${newLevel} уровня — ${newTitle}!`,
                    type: 'level_up'
                }]);
        }

        await checkAchievements(userId, newExp);
    }

    // ... (остальные функции checkAchievements, grantAchievement, showLevelUpToast такие же, как в прошлый раз) ...

    window.addExperience = addExperience;
    window.showLevelUpToast = showLevelUpToast;

    console.log('✅ experience.js готов (v2)');
})();
