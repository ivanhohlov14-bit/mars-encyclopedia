// docs/javascripts/experience.js

// Убираем объявление констант — они уже есть в auth-button.js
// Вместо этого используем существующие глобальные переменные или объявляем локально

(function() {
    // Используем те же константы, что и в auth-button.js
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    /**
     * Начисляет опыт пользователю и проверяет достижения
     */
    async function addExperience(userId, points) {
        if (!userId) return;
        
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
        const { data: profile, error } = await client
            .from('profiles')
            .select('experience')
            .eq('user_id', userId)
            .single();
        
        if (error) {
            console.error('Ошибка получения профиля:', error);
            return;
        }
        
        const currentExp = profile?.experience || 0;
        const newExp = currentExp + points;
        
        const { error: updateError } = await client
            .from('profiles')
            .update({ experience: newExp })
            .eq('user_id', userId);
        
        if (updateError) {
            console.error('Ошибка обновления опыта:', updateError);
            return;
        }
        
        console.log(`✅ Добавлено ${points} опыта. Всего: ${newExp}`);
        await checkAchievements(userId, newExp);
    }

    /**
     * Проверяет, заработал ли пользователь новые достижения
     */
    async function checkAchievements(userId, currentExp) {
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
        // Получаем все достижения
        const { data: allAchievements, error: achError } = await client
            .from('achievements')
            .select('*');
        
        if (achError) {
            console.error('Ошибка загрузки достижений:', achError);
            return;
        }
        
        // Получаем уже полученные достижения пользователя
        const { data: earned, error: earnedError } = await client
            .from('user_achievements')
            .select('achievement_id')
            .eq('user_id', userId);
        
        if (earnedError) {
            console.error('Ошибка загрузки достижений пользователя:', earnedError);
            return;
        }
        
        const earnedIds = earned.map(item => item.achievement_id);
        
        for (const ach of allAchievements) {
            if (earnedIds.includes(ach.id)) continue;
            
            if (ach.name === '🚀 Первый шаг' && currentExp >= 10) {
                await grantAchievement(userId, ach.id);
            } else if (ach.name === '📖 Знаток' && currentExp >= 50) {
                await grantAchievement(userId, ach.id);
            } else if (ach.name === '🌍 Исследователь' && currentExp >= 100) {
                await grantAchievement(userId, ach.id);
            } else if (ach.name === '🖊️ Летописец' && currentExp >= 200) {
                await grantAchievement(userId, ach.id);
            } else if (ach.name === '🏆 Марсианин' && currentExp >= 300) {
                await grantAchievement(userId, ach.id);
            }
        }
    }

    /**
     * Выдаёт достижение пользователю
     */
    async function grantAchievement(userId, achievementId) {
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { error } = await client
            .from('user_achievements')
            .insert([{ user_id: userId, achievement_id: achievementId }]);
        
        if (error) {
            console.error('Ошибка выдачи достижения:', error);
        } else {
            console.log('🏅 Новое достижение!');
        }
    }

    // Делаем функции глобальными
    window.addExperience = addExperience;
    window.checkAchievements = checkAchievements;
    window.grantAchievement = grantAchievement;

})();

console.log('✅ experience.js выполнен');
