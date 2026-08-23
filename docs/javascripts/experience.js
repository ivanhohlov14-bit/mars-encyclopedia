// docs/javascripts/experience.js
// ФИНАЛЬНАЯ ВЕРСИЯ — гарантированно обновляет уровень

console.log('✅ experience.js загружен');

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

/**
 * Начисляет опыт и ОБЯЗАТЕЛЬНО обновляет уровень
 */
async function addExperience(userId, points) {
    if (!userId) return;

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // 1. Получаем текущий опыт и уровень
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

    // 2. Вычисляем новый уровень
    const newLevelData = getLevel(newExp);
    const newLevel = newLevelData.level;
    const newTitle = newLevelData.title;

    console.log(`📊 Текущий опыт: ${currentExp}, новый: ${newExp}`);
    console.log(`📊 Текущий уровень: ${currentLevel}, новый: ${newLevel}`);

    // 3. Подготавливаем данные для обновления
    const updateData = {
        experience: newExp,
        level: newLevel   // ВСЕГДА обновляем уровень, даже если он не изменился (для синхронизации)
    };

    // 4. Обновляем в БД
    const { error: updateError } = await client
        .from('profiles')
        .update(updateData)
        .eq('user_id', userId);

    if (updateError) {
        console.error('❌ Ошибка обновления профиля:', updateError);
        return;
    }

    console.log(`✅ Добавлено ${points} опыта. Всего: ${newExp}, уровень: ${newLevel}`);

    // 5. Если уровень повысился — показываем уведомление
    if (newLevel !== currentLevel) {
        console.log(`🎉 ПОВЫШЕНИЕ УРОВНЯ! ${currentLevel} → ${newLevel} (${newTitle})`);

        if (typeof window.showLevelUpToast === 'function') {
            window.showLevelUpToast(newLevel, newTitle);
        } else {
            alert(`🎉 Поздравляем! Вы достигли ${newLevel} уровня — ${newTitle}!`);
        }

        // Добавляем уведомление в базу
        await client
            .from('notifications')
            .insert([{
                user_id: userId,
                message: `🎉 Вы достигли ${newLevel} уровня — ${newTitle}!`,
                type: 'level_up'
            }]);
    }

    // 6. Проверяем достижения
    await checkAchievements(userId, newExp);
}

// ... функции checkAchievements, grantAchievement, showLevelUpToast остаются без изменений ...
// Делаем функции глобальными
window.addExperience = addExperience;
window.showLevelUpToast = showLevelUpToast;
