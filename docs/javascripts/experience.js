// ============================================================
// experience.js — v3 VIP
// Начисление опыта + уровни + достижения
// - Мьютекс на пользователя (нет race condition)
// - Единая формула уровней с profile.md (100 уровней)
// - Не перезаписывает window.showLevelUpToast (из experience-toast.js)
// - Пишет историю XP в localStorage (для графика в профиле)
// - Retry при сетевых ошибках (2 попытки)
// - Дедупликация достижений через Set в памяти
// - Публичное API: window.marsExperience.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsExperienceLoaded) return;
    window.__marsExperienceLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';
    var XP_HISTORY_KEY = 'mars-xp-history';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['⚡ xp:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 📚 Уровни — та же формула что в profile.md
    // ============================================================
    var LEVEL_TITLES = [
        '🌱 Поселенец','🔭 Исследователь','🚀 Первопроходец','🏠 Колонизатор',
        '⚡ Командир','⚔️ Воин','📜 Писец','🔮 Мудрец',
        '👑 Аристократ','🏛️ Сенатор','💎 Магнат','🌟 Звёздный лорд',
        '🐉 Дракон','🔥 Феникс','🌊 Повелитель морей','⛰️ Владыка гор',
        '🗡️ Мастер клинка','🏹 Мастер лука','🛡️ Щитоносец','🎯 Снайпер'
    ];

    function xpForLevel(level) {
        return Math.floor(Math.pow(level, 1.8) * 20);
    }

    function getLevelInfo(exp) {
        exp = Math.max(0, exp || 0);
        var level = 1;
        while (level < 100 && exp >= xpForLevel(level + 1)) level++;
        return {
            level: level,
            title: LEVEL_TITLES[level - 1] || ('Уровень ' + level),
            current: xpForLevel(level),
            next: xpForLevel(level + 1)
        };
    }

    // ============================================================
    // 🌉 Клиент
    // ============================================================
    function getClient() {
        if (window.supabaseClient && window.supabaseClient.auth) return window.supabaseClient;
        if (window.getSupabase) {
            try {
                var c = window.getSupabase();
                if (c && c.auth) return c;
            } catch(e) {}
        }
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
            } catch(e) { log('createClient fail:', e.message); }
        }
        return null;
    }

    // ============================================================
    // 🌐 Retry
    // ============================================================
    async function withRetry(fn, retries) {
        retries = retries == null ? 2 : retries;
        var lastErr;
        for (var i = 0; i <= retries; i++) {
            try { return await fn(); }
            catch(e) {
                lastErr = e;
                if (i < retries) await new Promise(function(r) { setTimeout(r, 500 * (i + 1)); });
            }
        }
        throw lastErr;
    }

    // ============================================================
    // 🔒 Мьютекс на пользователя — защита от race
    // ============================================================
    var locks = {};

    function withLock(userId, fn) {
        var prev = locks[userId] || Promise.resolve();
        var next = prev.then(function() { return fn(); }, function() { return fn(); });
        // Сбрасываем lock через микротаск, чтобы можно было ставить следующий
        locks[userId] = next.catch(function() {});
        return next;
    }

    // ============================================================
    // 📊 История XP (для графика в профиле)
    // ============================================================
    function recordXpHistory(points) {
        if (!points || points <= 0) return;
        try {
            var raw = localStorage.getItem(XP_HISTORY_KEY);
            var hist = raw ? JSON.parse(raw) : {};
            if (!hist || typeof hist !== 'object') hist = {};
            var today = new Date().toISOString().slice(0, 10);
            hist[today] = (hist[today] || 0) + points;
            // Обрезаем до 60 дней
            var cutoff = new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10);
            Object.keys(hist).forEach(function(k) { if (k < cutoff) delete hist[k]; });
            localStorage.setItem(XP_HISTORY_KEY, JSON.stringify(hist));
        } catch(e) {}
    }

    // ============================================================
    // 🏅 Выдача достижения
    // ============================================================
    var grantedThisSession = new Set();

    async function grantAchievement(userId, achievementId, achievementMeta) {
        var key = userId + ':' + achievementId;
        if (grantedThisSession.has(key)) return false;
        grantedThisSession.add(key);

        var client = getClient();
        if (!client) return false;

        try {
            var res = await client.from('user_achievements').insert([{
                user_id: userId,
                achievement_id: achievementId
            }]);
            if (res && res.error) {
                // Дубликат — не ошибка
                if (res.error.code === '23505') return false;
                log('grant err:', res.error.message);
                return false;
            }

            log('🏅 достижение выдано:', achievementId);

            // Тост
            if (achievementMeta && typeof window.showAchievementToast === 'function') {
                try {
                    window.showAchievementToast(achievementMeta.icon || '🏅', achievementMeta.name || 'Достижение');
                } catch(e) {}
            }

            // Уведомление в БД
            try {
                var name = achievementMeta ? (achievementMeta.icon + ' ' + achievementMeta.name) : 'Достижение';
                await client.from('notifications').insert([{
                    user_id: userId,
                    message: '🏅 Получено достижение: ' + name + '!',
                    type: 'achievement'
                }]);
            } catch(e) {}

            return true;
        } catch(e) {
            log('grant exception:', e.message);
            grantedThisSession.delete(key); // дать шанс в следующий раз
            return false;
        }
    }

    // ============================================================
    // 🎯 Проверка достижений
    // Пороги по опыту, а не по названиям
    // ============================================================
    var XP_ACHIEVEMENTS = [
        { xp: 10,   name: 'Первый шаг',  icon: '🚀' },
        { xp: 50,   name: 'Знаток',      icon: '📖' },
        { xp: 100,  name: 'Исследователь', icon: '🌍' },
        { xp: 200,  name: 'Летописец',   icon: '🖊️' },
        { xp: 300,  name: 'Марсианин',   icon: '🏆' },
        { xp: 500,  name: 'Ветеран',     icon: '⚔️' },
        { xp: 1000, name: 'Легенда',     icon: '👑' },
        { xp: 5000, name: 'Бессмертный', icon: '🌟' }
    ];

    async function checkAchievements(userId, currentExp) {
        var client = getClient();
        if (!client) return;

        try {
            // Параллельно: все достижения + уже полученные
            var results = await Promise.all([
                withRetry(function() {
                    return client.from('achievements').select('id, name, icon');
                }, 1).catch(function() { return { data: [] }; }),
                withRetry(function() {
                    return client.from('user_achievements').select('achievement_id').eq('user_id', userId);
                }, 1).catch(function() { return { data: [] }; })
            ]);

            var allAchievements = (results[0] && results[0].data) || [];
            var earned = (results[1] && results[1].data) || [];
            var earnedIds = {};
            earned.forEach(function(e) { earnedIds[e.achievement_id] = true; });

            // Индексируем достижения по имени
            var byName = {};
            allAchievements.forEach(function(a) {
                if (a && a.name) byName[a.name] = a;
            });

            // Проверяем пороги
            for (var i = 0; i < XP_ACHIEVEMENTS.length; i++) {
                var rule = XP_ACHIEVEMENTS[i];
                if (currentExp < rule.xp) continue;

                var ach = byName[rule.name];
                if (!ach) continue;
                if (earnedIds[ach.id]) continue;

                await grantAchievement(userId, ach.id, ach);
            }
        } catch(e) {
            log('checkAchievements:', e.message);
        }
    }

    // ============================================================
    // 🎁 Начисление опыта
    // ============================================================
    async function addExperience(userId, points) {
        if (!userId) return null;
        points = parseInt(points, 10) || 0;
        if (points <= 0) return null;

        var client = getClient();
        if (!client) {
            log('client not ready');
            return null;
        }

        return withLock(userId, async function() {
            try {
                // Читаем актуальное значение
                var res = await withRetry(function() {
                    return client.from('profiles')
                        .select('experience, level')
                        .eq('user_id', userId)
                        .single();
                }, 2);

                if (!res || res.error) {
                    log('read err:', res && res.error && res.error.message);
                    return null;
                }

                var profile = res.data || {};
                var currentExp = profile.experience || 0;
                var currentLevel = profile.level || 1;

                var newExp = currentExp + points;
                var levelInfo = getLevelInfo(newExp);
                var newLevel = levelInfo.level;

                // Пишем
                var upd = await withRetry(function() {
                    return client.from('profiles')
                        .update({ experience: newExp, level: newLevel })
                        .eq('user_id', userId);
                }, 2);

                if (!upd || upd.error) {
                    log('update err:', upd && upd.error && upd.error.message);
                    return null;
                }

                log('+' + points + ' → ' + newExp + ' XP, ур. ' + newLevel);

                // История XP (для графика в профиле)
                recordXpHistory(points);

                // Тост +XP
                if (typeof window.showExperienceToast === 'function') {
                    try { window.showExperienceToast(points); } catch(e) {}
                }

                // Повышение уровня
                if (newLevel > currentLevel) {
                    log('🎉 level up:', currentLevel, '→', newLevel);
                    if (typeof window.showLevelUpToast === 'function') {
                        try { window.showLevelUpToast(newLevel, levelInfo.title); } catch(e) {}
                    }
                    try {
                        await client.from('notifications').insert([{
                            user_id: userId,
                            message: '🎉 Вы достигли ' + newLevel + ' уровня — ' + levelInfo.title + '!',
                            type: 'level_up'
                        }]);
                    } catch(e) {}
                }

                // Проверяем достижения
                await checkAchievements(userId, newExp);

                return {
                    experience: newExp,
                    level: newLevel,
                    levelUp: newLevel > currentLevel,
                    title: levelInfo.title
                };
            } catch(e) {
                log('addExperience exception:', e.message);
                return null;
            }
        });
    }

    // ============================================================
    // 📖 Чтение профиля
    // ============================================================
    async function getProfile(userId) {
        if (!userId) return null;
        var client = getClient();
        if (!client) return null;

        try {
            var res = await withRetry(function() {
                return client.from('profiles')
                    .select('experience, level')
                    .eq('user_id', userId)
                    .single();
            }, 2);
            if (!res || res.error) return null;
            return res.data;
        } catch(e) {
            return null;
        }
    }

    // ============================================================
    // 🚀 Экспорт
    // ============================================================
    window.addExperience = addExperience;

    // Не перезаписываем — если experience-toast.js v2 уже отдал свою
    if (typeof window.showLevelUpToast !== 'function') {
        window.showLevelUpToast = function(level, title) {
            // Fallback toast в стиле experience-toast.js
            var t = document.createElement('div');
            t.className = 'xp-toast level-up';
            t.style.cssText =
                'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.4);' +
                'background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;' +
                'padding:18px 34px;border-radius:20px;font-weight:800;font-size:1.4rem;' +
                'box-shadow:0 20px 60px rgba(243,156,18,0.6);z-index:999999;' +
                'display:flex;align-items:center;gap:14px;pointer-events:none;' +
                'opacity:0;transition:all 0.5s cubic-bezier(0.34,1.56,0.64,1);';
            t.innerHTML = '<span style="font-size:2rem;">👑</span><span>Уровень ' + level + ' — ' + (title || '') + '</span>';
            document.body.appendChild(t);
            requestAnimationFrame(function() {
                t.style.opacity = '1';
                t.style.transform = 'translate(-50%,-50%) scale(1)';
            });
            setTimeout(function() {
                t.style.opacity = '0';
                t.style.transform = 'translate(-50%,-80%) scale(0.85)';
                setTimeout(function() { if (t.parentNode) t.remove(); }, 600);
            }, 2600);
        };
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsExperience = {
        add: addExperience,
        getProfile: getProfile,
        getLevelInfo: getLevelInfo,
        xpForLevel: xpForLevel,
        checkAchievements: checkAchievements,
        LEVEL_TITLES: LEVEL_TITLES
    };

    log('загружен');
})();
