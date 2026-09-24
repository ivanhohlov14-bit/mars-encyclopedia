// ============================================================
// experience.js — v4 VIP
// Начисление опыта + уровни + достижения + красивые тосты
// - Мьютекс на пользователя (нет race condition)
// - Единая формула уровней (100 уровней)
// - VIP-тосты со встроенными стилями (fallback)
// - Частицы, свечение, shimmer, поворот
// - Очередь тостов (не спамит)
// - Уважает reduced-motion
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
    var STYLE_ID = 'mars-xp-toast-style';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['⚡ xp:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    var REDUCED_MOTION = prefersReducedMotion();

    // ============================================================
    // 📚 Уровни
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
    // 🎨 Стили тостов (встроенные — не нужен опыт-toast.js)
    // ============================================================
    function injectToastStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var s = document.createElement('style');
        s.id = STYLE_ID;
        s.textContent = `
            /* ===== КОНТЕЙНЕР ===== */
            .mars-xp-toast-wrap {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2147483640;
                pointer-events: none;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
            }

            /* ===== ТОСТ ===== */
            .mars-xp-toast {
                display: flex;
                align-items: center;
                gap: 14px;
                padding: 18px 34px;
                border-radius: 20px;
                color: #fff;
                font-weight: 800;
                font-size: 1.6rem;
                letter-spacing: -0.3px;
                box-shadow:
                    0 20px 60px rgba(0,0,0,0.4),
                    0 0 0 1px rgba(255,255,255,0.15) inset;
                text-shadow: 0 2px 8px rgba(0,0,0,0.25);
                position: relative;
                overflow: hidden;
                animation: marsXpIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                transform-origin: center center;
                will-change: transform, opacity;
            }

            /* Свечение-волна */
            .mars-xp-toast::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    120deg,
                    transparent 0%,
                    transparent 40%,
                    rgba(255,255,255,0.35) 50%,
                    transparent 60%,
                    transparent 100%
                );
                background-size: 200% 100%;
                animation: marsXpShine 2s ease-in-out infinite;
                pointer-events: none;
            }

            /* Радиальные пятна */
            .mars-xp-toast::after {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15), transparent 50%);
                pointer-events: none;
            }

            /* Типы */
            .mars-xp-toast.xp {
                background: linear-gradient(135deg, #27ae60 0%, #16a085 100%);
                box-shadow:
                    0 20px 60px rgba(39,174,96,0.55),
                    0 0 0 4px rgba(255,255,255,0.12) inset;
            }
            .mars-xp-toast.level-up {
                background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
                box-shadow:
                    0 20px 60px rgba(243,156,18,0.6),
                    0 0 0 4px rgba(255,255,255,0.18) inset;
                font-size: 1.4rem;
            }
            .mars-xp-toast.achievement {
                background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
                box-shadow:
                    0 20px 60px rgba(155,89,182,0.6),
                    0 0 0 4px rgba(255,255,255,0.18) inset;
                font-size: 1.4rem;
            }

            /* Иконка */
            .mars-xp-toast .mars-xp-icon {
                font-size: 2.2rem;
                line-height: 1;
                display: inline-block;
                animation: marsXpSpin 1s ease-out;
                position: relative;
                z-index: 2;
            }
            .mars-xp-toast.level-up .mars-xp-icon,
            .mars-xp-toast.achievement .mars-xp-icon {
                animation: marsXpBounce 1s cubic-bezier(0.34,1.56,0.64,1);
            }
            .mars-xp-toast .mars-xp-text {
                position: relative;
                z-index: 2;
            }

            /* ===== ЧАСТИЦЫ ===== */
            .mars-xp-particle {
                position: fixed;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 2147483639;
                will-change: transform, opacity;
            }

            /* ===== АНИМАЦИИ ===== */
            @keyframes marsXpIn {
                0%   { opacity: 0; transform: scale(0.4) rotate(-8deg); }
                60%  { opacity: 1; transform: scale(1.08) rotate(2deg); }
                100% { opacity: 1; transform: scale(1) rotate(0deg); }
            }
            @keyframes marsXpOut {
                0%   { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.85) translateY(-30px); }
            }
            @keyframes marsXpSpin {
                0%   { transform: rotate(0deg) scale(0.5); }
                50%  { transform: rotate(180deg) scale(1.25); }
                100% { transform: rotate(360deg) scale(1); }
            }
            @keyframes marsXpBounce {
                0%   { transform: scale(0.3) rotate(-15deg); }
                50%  { transform: scale(1.3) rotate(8deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
            @keyframes marsXpShine {
                0%   { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            @keyframes marsXpParticleFly {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--dx), var(--dy)) scale(0.2);
                    opacity: 0;
                }
            }

            /* ===== МОБИЛЬНЫЙ ===== */
            @media (max-width: 600px) {
                .mars-xp-toast {
                    font-size: 1.3rem;
                    padding: 14px 24px;
                    border-radius: 16px;
                    gap: 10px;
                    max-width: calc(100vw - 40px);
                }
                .mars-xp-toast.level-up,
                .mars-xp-toast.achievement {
                    font-size: 1.15rem;
                }
                .mars-xp-toast .mars-xp-icon {
                    font-size: 1.8rem;
                }
            }

            /* ===== REDUCED MOTION ===== */
            @media (prefers-reduced-motion: reduce) {
                .mars-xp-toast {
                    animation: none !important;
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                .mars-xp-toast::before { display: none; }
                .mars-xp-toast .mars-xp-icon {
                    animation: none !important;
                }
                .mars-xp-particle {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // ✨ Частицы
    // ============================================================
    function spawnParticles(rect, type) {
        if (REDUCED_MOTION) return;

        var palettes = {
            'xp':          ['#27ae60', '#16a085', '#2ecc71', '#1abc9c'],
            'level-up':    ['#f39c12', '#e67e22', '#f1c40f', '#ffd97a'],
            'achievement': ['#9b59b6', '#8e44ad', '#a569bd', '#d7bde2']
        };
        var palette = palettes[type] || palettes.xp;

        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;

        var count = window.innerWidth <= 600 ? 12 : 22;

        for (var i = 0; i < count; i++) {
            (function(idx) {
                setTimeout(function() {
                    var p = document.createElement('div');
                    p.className = 'mars-xp-particle';
                    var angle = (Math.PI * 2 * idx) / count + Math.random() * 0.3;
                    var dist = 80 + Math.random() * 200;
                    var dx = Math.cos(angle) * dist;
                    var dy = Math.sin(angle) * dist;
                    var size = 6 + Math.random() * 8;
                    var color = palette[Math.floor(Math.random() * palette.length)];

                    p.style.left = cx + 'px';
                    p.style.top = cy + 'px';
                    p.style.width = size + 'px';
                    p.style.height = size + 'px';
                    p.style.background = color;
                    p.style.boxShadow = '0 0 12px ' + color;
                    p.style.setProperty('--dx', dx + 'px');
                    p.style.setProperty('--dy', dy + 'px');
                    p.style.animation = 'marsXpParticleFly 1s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                    p.style.animationDelay = (Math.random() * 0.15) + 's';

                    document.body.appendChild(p);
                    setTimeout(function() { p.remove(); }, 1400);
                }, idx * 30);
            })(i);
        }
    }

    // ============================================================
    // 🎯 Показ тоста с очередью
    // ============================================================
    var toastQueue = [];
    var isShowingToast = false;
    var TOAST_DURATION = 2400;

    function showToast(type, icon, text) {
        // Если уже что-то показывается — в очередь
        if (isShowingToast) {
            toastQueue.push({ type: type, icon: icon, text: text });
            return;
        }

        isShowingToast = true;
        injectToastStyles();

        var toast = document.createElement('div');
        toast.className = 'mars-xp-toast ' + type;
        toast.innerHTML =
            '<span class="mars-xp-icon">' + icon + '</span>' +
            '<span class="mars-xp-text">' + text + '</span>';

        document.body.appendChild(toast);

        // Частицы
        requestAnimationFrame(function() {
            var rect = toast.getBoundingClientRect();
            spawnParticles(rect, type);
        });

        // Авто-скрытие
        setTimeout(function() {
            toast.style.animation = 'marsXpOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';

            setTimeout(function() {
                if (toast.parentNode) toast.remove();
                isShowingToast = false;

                // Следующий из очереди
                if (toastQueue.length > 0) {
                    var next = toastQueue.shift();
                    showToast(next.type, next.icon, next.text);
                }
            }, 650);
        }, TOAST_DURATION);
    }

    // ============================================================
    // 🎁 Публичные тосты
    // ============================================================
    if (typeof window.showExperienceToast !== 'function') {
        window.showExperienceToast = function(points) {
            points = parseInt(points, 10) || 0;
            if (points <= 0) return;
            showToast('xp', '⭐', '+' + points + ' XP');
        };
    }

    if (typeof window.showLevelUpToast !== 'function') {
        window.showLevelUpToast = function(level, title) {
            showToast('level-up', '👑', 'Уровень ' + level + ' — ' + (title || ''));
        };
    }

    if (typeof window.showAchievementToast !== 'function') {
        window.showAchievementToast = function(icon, name) {
            showToast('achievement', icon || '🏅', name || 'Достижение');
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
    // 🔒 Мьютекс
    // ============================================================
    var locks = {};

    function withLock(userId, fn) {
        var prev = locks[userId] || Promise.resolve();
        var next = prev.then(function() { return fn(); }, function() { return fn(); });
        locks[userId] = next.catch(function() {});
        return next;
    }

    // ============================================================
    // 📊 История XP
    // ============================================================
    function recordXpHistory(points) {
        if (!points || points <= 0) return;
        try {
            var raw = localStorage.getItem(XP_HISTORY_KEY);
            var hist = raw ? JSON.parse(raw) : {};
            if (!hist || typeof hist !== 'object') hist = {};
            var today = new Date().toISOString().slice(0, 10);
            hist[today] = (hist[today] || 0) + points;
            var cutoff = new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10);
            Object.keys(hist).forEach(function(k) { if (k < cutoff) delete hist[k]; });
            localStorage.setItem(XP_HISTORY_KEY, JSON.stringify(hist));
        } catch(e) {}
    }

    // ============================================================
    // 🏅 Достижения
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
                if (res.error.code === '23505') return false;
                log('grant err:', res.error.message);
                return false;
            }

            log('🏅 достижение выдано:', achievementId);

            if (achievementMeta && typeof window.showAchievementToast === 'function') {
                try {
                    window.showAchievementToast(achievementMeta.icon || '🏅', achievementMeta.name || 'Достижение');
                } catch(e) {}
            }

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
            grantedThisSession.delete(key);
            return false;
        }
    }

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

            var byName = {};
            allAchievements.forEach(function(a) {
                if (a && a.name) byName[a.name] = a;
            });

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

                recordXpHistory(points);

                // Тост +XP
                if (typeof window.showExperienceToast === 'function') {
                    try { window.showExperienceToast(points); } catch(e) {}
                }

                // Повышение уровня
                if (newLevel > currentLevel) {
                    log('🎉 level up:', currentLevel, '→', newLevel);

                    // Задержка — чтобы XP-тост успел показаться
                    setTimeout(function() {
                        if (typeof window.showLevelUpToast === 'function') {
                            try { window.showLevelUpToast(newLevel, levelInfo.title); } catch(e) {}
                        }
                    }, 500);

                    try {
                        await client.from('notifications').insert([{
                            user_id: userId,
                            message: '🎉 Вы достигли ' + newLevel + ' уровня — ' + levelInfo.title + '!',
                            type: 'level_up'
                        }]);
                    } catch(e) {}
                }

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

    window.marsExperience = {
        add: addExperience,
        getProfile: getProfile,
        getLevelInfo: getLevelInfo,
        xpForLevel: xpForLevel,
        checkAchievements: checkAchievements,
        LEVEL_TITLES: LEVEL_TITLES,
        // Ручной показ тостов (для теста)
        toast: {
            xp: function(p) { window.showExperienceToast(p); },
            levelUp: function(l, t) { window.showLevelUpToast(l, t); },
            achievement: function(i, n) { window.showAchievementToast(i, n); }
        }
    };

    log('v4 VIP загружен');
})();
