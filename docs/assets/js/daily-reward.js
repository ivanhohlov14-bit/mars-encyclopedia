// ============================================================
// daily-reward.js — v2 VIP
// Ежедневная награда + рулетка + автозадания
// - Единый клиент (window.supabaseClient)
// - Параллельные запросы
// - VIP-модалки с анимациями
// - Мобильная адаптация
// - Защита от двойного начисления
// ============================================================
(function() {
    'use strict';

    if (window.__dailyRewardLoaded) return;
    window.__dailyRewardLoaded = true;

    // ============================================================
    // ⚙️ Константы
    // ============================================================
    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';

    var KINGDOMS = {
        'Аркадия':    { color: '#D4A574', light: '#E8C9A0', bg: '#FDF8F0' },
        'Ксанф':      { color: '#3D3D3D', light: '#6B6B6B', bg: '#F5F5F5' },
        'Эдем':       { color: '#F4A460', light: '#F7C98A', bg: '#FFF8F0' },
        'Эридания':   { color: '#F5D76E', light: '#FAE9A0', bg: '#FFFDF5' },
        'Кхонг':      { color: '#A9A9A9', light: '#C8C8C8', bg: '#F8F8F8' },
        'Авсония':    { color: '#87CEEB', light: '#B0D8EB', bg: '#F0F8FF' },
        'Кимерия':    { color: '#B19CD9', light: '#D1C4E9', bg: '#F8F4FF' },
        'Серпентида': { color: '#E57373', light: '#F5A0A0', bg: '#FFF5F5' },
        'Эритрей':    { color: '#64B5F6', light: '#90CAF9', bg: '#F0F8FF' },
        'Утопия':     { color: '#4DD0E1', light: '#80DEEA', bg: '#F0FDFF' },
        'Эллада':     { color: '#FF8A65', light: '#FFAB91', bg: '#FFF5F0' },
        'Аливасото':  { color: '#81C784', light: '#A5D6A7', bg: '#F0FFF0' }
    };

    var STREAK_REWARDS = {
        1: 5, 2: 10, 3: 15, 4: 20, 5: 25, 6: 35, 7: 50,
        14: 100, 30: 250, 100: 1000
    };

    var ROULETTE_PRIZES = [
        { icon: '💎', label: '10 XP',    xp: 10,   weight: 30 },
        { icon: '💎', label: '25 XP',    xp: 25,   weight: 25 },
        { icon: '💎', label: '50 XP',    xp: 50,   weight: 15 },
        { icon: '⭐', label: '100 XP',   xp: 100,  weight: 8 },
        { icon: '👑', label: '250 XP',   xp: 250,  weight: 3 },
        { icon: '🎁', label: '500 XP',   xp: 500,  weight: 1 },
        { icon: '🔥', label: 'Удача ×2', xp: 0,    weight: 10 },
        { icon: '😢', label: 'Пусто',    xp: 0,    weight: 8 }
    ];

    var QUEST_DEFINITIONS = [
        { id: 'read_article',   icon: '📖', title: 'Прочитать статью',    reward: '+5 XP',  xp: 5 },
        { id: 'visit_place',    icon: '📍', title: 'Посетить новое место', reward: '+10 XP', xp: 10 },
        { id: 'pass_quiz',      icon: '🧠', title: 'Пройти викторину',     reward: '+20 XP', xp: 20 },
        { id: 'use_translator', icon: '🗣️', title: 'Перевести слово',      reward: '+5 XP',  xp: 5 }
    ];

    // ============================================================
    // 📦 Состояние
    // ============================================================
    var currentUser = null;
    var currentProfile = null;
    var currentKingdom = KINGDOMS['Эдем'];
    var isProcessing = false;

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
            } catch(e) {}
        }
        return null;
    }

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function todayStr() {
        return new Date().toISOString().slice(0, 10);
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        return window.innerWidth <= 768;
    }

    async function withRetry(fn, retries) {
        retries = retries == null ? 2 : retries;
        var lastErr;
        for (var i = 0; i <= retries; i++) {
            try {
                return await fn();
            } catch(e) {
                lastErr = e;
                if (i < retries) await new Promise(function(r) { setTimeout(r, 500 * (i + 1)); });
            }
        }
        throw lastErr;
    }

    // ============================================================
    // 💰 Начисление XP (через window.addExperience если есть)
    // ============================================================
    async function addXP(userId, amount) {
        if (!amount || amount <= 0) return;
        // Используем общий addExperience, если он есть (он сам обновляет уровень)
        if (typeof window.addExperience === 'function') {
            try {
                await window.addExperience(userId, amount);
                return;
            } catch(e) {
                console.warn('[daily] addExperience fallback:', e.message);
            }
        }
        // Fallback: прямое обновление
        var client = getClient();
        if (!client) return;
        try {
            var res = await client.from('profiles').select('experience').eq('user_id', userId).single();
            var current = (res && res.data && res.data.experience) || 0;
            await client.from('profiles').update({ experience: current + amount }).eq('user_id', userId);
        } catch(e) {
            console.warn('[daily] addXP:', e.message);
        }
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('daily-reward-style')) return;
        var s = document.createElement('style');
        s.id = 'daily-reward-style';
        s.textContent = `
            @keyframes dailyFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes dailySlideUp {
                from { opacity: 0; transform: translateY(30px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes dailyPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes dailySpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes dailyBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            @keyframes dailyShine {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
            }

            #daily-modal-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                background: rgba(0, 0, 0, 0.65);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: dailyFadeIn 0.3s ease;
                overflow-y: auto;
            }
            .daily-modal-card {
                background: linear-gradient(135deg, var(--dk-color, #F4A460), var(--dk-light, #F7C98A));
                color: #fff;
                max-width: 460px;
                width: 100%;
                padding: 36px 28px 30px;
                border-radius: 24px;
                box-shadow:
                    0 30px 80px rgba(0, 0, 0, 0.55),
                    0 0 0 1px rgba(255, 255, 255, 0.15) inset;
                text-align: center;
                position: relative;
                overflow: hidden;
                animation: dailySlideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1);
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
            }
            .daily-modal-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 55%),
                            radial-gradient(circle at 80% 90%, rgba(255,255,255,0.15), transparent 55%);
                pointer-events: none;
            }
            .daily-modal-card > * { position: relative; z-index: 1; }

            .daily-close {
                position: absolute;
                top: 12px;
                right: 16px;
                background: rgba(255, 255, 255, 0.22);
                border: none;
                width: 34px;
                height: 34px;
                border-radius: 50%;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.25s;
                z-index: 2;
                font-family: inherit;
                padding: 0;
                line-height: 1;
            }
            .daily-close:hover {
                background: rgba(255, 255, 255, 0.4);
                transform: rotate(90deg);
            }

            .daily-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 14px 32px;
                border-radius: 40px;
                border: 2px solid rgba(255, 255, 255, 0.5);
                background: rgba(255, 255, 255, 0.25);
                color: #fff;
                font-size: 1rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                font-family: inherit;
                -webkit-tap-highlight-color: transparent;
                text-decoration: none;
            }
            .daily-btn:hover {
                background: rgba(255, 255, 255, 0.4);
                transform: translateY(-2px);
                box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
                color: #fff;
            }
            .daily-btn:active {
                transform: translateY(0) scale(0.98);
            }
            .daily-btn.primary {
                background: #fff;
                color: #333;
                border-color: #fff;
            }
            .daily-btn.primary:hover {
                background: #f0f0f0;
                color: #000;
            }

            .daily-icon {
                font-size: 4rem;
                margin-bottom: 8px;
                display: inline-block;
                animation: dailyBounce 2.5s ease-in-out infinite;
                filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
            }

            .daily-title {
                margin: 0 0 6px 0;
                font-size: 1.8rem;
                font-weight: 900;
                letter-spacing: -0.5px;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }
            .daily-subtitle {
                margin: 0 0 20px 0;
                opacity: 0.92;
                font-size: 0.95rem;
            }

            .daily-reward-big {
                font-size: 3.2rem;
                font-weight: 900;
                margin: 12px 0 6px 0;
                letter-spacing: -1px;
                text-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
                background: linear-gradient(90deg, #fff 0%, #ffe9b8 30%, #fff 60%, #ffe9b8 100%);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: dailyShine 3s linear infinite;
            }

            .daily-bonus-badge {
                background: rgba(255, 255, 255, 0.28);
                padding: 8px 16px;
                border-radius: 20px;
                display: inline-block;
                margin: 8px 0;
                font-weight: 800;
                font-size: 0.88rem;
                border: 1px solid rgba(255, 255, 255, 0.35);
                animation: dailyPulse 1.8s ease-in-out infinite;
            }

            /* Рулетка */
            .daily-roulette-wheel {
                font-size: 6rem;
                margin: 24px 0;
                display: inline-block;
                filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.35));
            }
            .daily-roulette-wheel.spinning {
                animation: dailySpin 1.2s cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Плавающая кнопка рулетки */
            .daily-roulette-btn {
                position: fixed;
                bottom: 80px;
                right: 20px;
                z-index: 9998;
                background: linear-gradient(135deg, var(--dk-color, #F4A460), var(--dk-light, #F7C98A));
                color: #fff;
                border: none;
                padding: 14px 24px;
                border-radius: 40px;
                font-weight: 800;
                font-size: 0.95rem;
                cursor: pointer;
                box-shadow: 0 10px 28px rgba(0, 0, 0, 0.3);
                animation: dailyPulse 2s ease-in-out infinite;
                font-family: inherit;
                transition: transform 0.25s;
                -webkit-tap-highlight-color: transparent;
            }
            .daily-roulette-btn:hover {
                transform: scale(1.05);
            }

            /* Мобильный */
            @media (max-width: 600px) {
                .daily-modal-card {
                    padding: 30px 20px 24px;
                    border-radius: 20px;
                }
                .daily-icon { font-size: 3.2rem; }
                .daily-title { font-size: 1.45rem; }
                .daily-reward-big { font-size: 2.6rem; }
                .daily-btn { padding: 12px 24px; font-size: 0.92rem; }
                .daily-roulette-wheel { font-size: 4.5rem; }
                .daily-roulette-btn {
                    bottom: 100px;
                    right: 12px;
                    padding: 12px 20px;
                    font-size: 0.88rem;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .daily-modal-card,
                .daily-icon,
                .daily-roulette-wheel,
                .daily-roulette-btn,
                .daily-reward-big,
                .daily-bonus-badge {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🖼️ Модалка
    // ============================================================
    function showModal(html, options) {
        options = options || {};
        var old = document.getElementById('daily-modal-overlay');
        if (old) old.remove();

        var overlay = document.createElement('div');
        overlay.id = 'daily-modal-overlay';
        overlay.innerHTML =
            '<div class="daily-modal-card" style="--dk-color:' + currentKingdom.color + '; --dk-light:' + currentKingdom.light + ';">' +
            '  <button class="daily-close" type="button" aria-label="Закрыть">✕</button>' +
            '  <div class="daily-modal-content">' + html + '</div>' +
            '</div>';

        document.body.appendChild(overlay);

        // Закрытие
        overlay.querySelector('.daily-close').onclick = function() {
            overlay.remove();
        };
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.remove();
        });
        document.addEventListener('keydown', function esc(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', esc);
            }
        });

        return overlay;
    }

    // ============================================================
    // 🎁 Модалка ежедневной награды
    // ============================================================
    function showDailyReward(streak, rewardXP) {
        var isBonus = [3, 7, 14, 30].indexOf(streak) !== -1;
        var bonusHTML = isBonus
            ? '<div class="daily-bonus-badge">🎉 БОНУС ЗА ' + streak + ' ДНЕЙ!</div>'
            : '';

        var dayWord = streak === 1 ? 'день' : (streak < 5 ? 'дня' : 'дней');

        var overlay = showModal(
            '<div class="daily-icon">🎁</div>' +
            '<h2 class="daily-title">Ежедневная награда!</h2>' +
            '<p class="daily-subtitle">Ты заходишь ' + streak + ' ' + dayWord + ' подряд</p>' +
            bonusHTML +
            '<div class="daily-reward-big">+' + rewardXP + ' XP</div>' +
            '<p class="daily-subtitle" style="margin-top:14px;">Завтра получишь ещё больше!</p>' +
            '<button class="daily-btn" id="daily-roulette-link" type="button" style="margin-top:10px;">🎲 Крутить рулетку</button>'
        );

        overlay.querySelector('#daily-roulette-link').onclick = function() {
            overlay.remove();
            openRoulette();
        };
    }

    // ============================================================
    // 🎲 Рулетка
    // ============================================================
    function pickPrize() {
        var totalWeight = 0;
        for (var i = 0; i < ROULETTE_PRIZES.length; i++) totalWeight += ROULETTE_PRIZES[i].weight;
        var rand = Math.random() * totalWeight;
        for (var j = 0; j < ROULETTE_PRIZES.length; j++) {
            if (rand < ROULETTE_PRIZES[j].weight) return ROULETTE_PRIZES[j];
            rand -= ROULETTE_PRIZES[j].weight;
        }
        return ROULETTE_PRIZES[0];
    }

    async function openRoulette() {
        var userId = currentUser && currentUser.id;
        if (!userId) {
            if (typeof window.showExperienceToast === 'function') return;
            alert('Войдите, чтобы крутить рулетку');
            return;
        }

        var today = todayStr();
        var rouletteKey = 'roulette_' + userId + '_' + today;

        if (localStorage.getItem(rouletteKey)) {
            showModal(
                '<div class="daily-icon">⏰</div>' +
                '<h2 class="daily-title">Уже крутил сегодня!</h2>' +
                '<p class="daily-subtitle">Возвращайся завтра за новой попыткой</p>' +
                '<button class="daily-btn" onclick="this.closest(\'#daily-modal-overlay\').remove();" type="button">Хорошо</button>'
            );
            return;
        }

        var prize = pickPrize();
        var overlay = showModal(
            '<div style="font-size:1.5rem;font-weight:800;margin-bottom:8px;">🎲 Рулетка удачи</div>' +
            '<div class="daily-roulette-wheel spinning" id="daily-roulette-wheel">🎰</div>' +
            '<div id="daily-roulette-result" class="daily-subtitle">Крутим...</div>'
        );

        // Фиксируем сразу — защита от повторных кликов
        localStorage.setItem(rouletteKey, '1');

        setTimeout(async function() {
            if (prize.xp > 0) {
                await addXP(userId, prize.xp);
            }

            var wheel = overlay.querySelector('#daily-roulette-wheel');
            var resultEl = overlay.querySelector('#daily-roulette-result');
            if (wheel) wheel.classList.remove('spinning');

            if (resultEl) {
                var extraText = prize.xp > 0 ? 'XP добавлен!' : 'Повезёт в следующий раз';
                resultEl.outerHTML =
                    '<div style="font-size:4rem;margin:12px 0;">' + prize.icon + '</div>' +
                    '<div style="font-size:1.9rem;font-weight:900;margin-bottom:8px;">' + escapeHtml(prize.label) + '</div>' +
                    '<div style="opacity:0.9;margin-bottom:20px;">' + extraText + '</div>' +
                    '<button class="daily-btn primary" id="daily-close-btn" type="button">Забрать</button>';

                var closeBtn = overlay.querySelector('#daily-close-btn');
                if (closeBtn) {
                    closeBtn.onclick = function() {
                        overlay.remove();
                        setTimeout(function() { location.reload(); }, 200);
                    };
                }
            }
        }, 1400);
    }

    // ============================================================
    // 📅 Ежедневные задания
    // ============================================================
    async function getDailyTasks(userId) {
        var client = getClient();
        if (!client) return [];
        var today = todayStr();

        // Параллельные запросы
        var results = await Promise.all([
            // Сохранённые задания
            client.from('user_quests').select('quest_id, done')
                .eq('user_id', userId).eq('quest_date', today)
                .then(function(r) { return (r && r.data) || []; })
                .catch(function() { return []; }),

            // Проверка: читал статью
            client.from('user_visits').select('id')
                .eq('user_id', userId)
                .gte('visited_at', today + 'T00:00:00')
                .limit(1)
                .then(function(r) { return (r && r.data && r.data.length > 0); })
                .catch(function() { return false; }),

            // Проверка: посетил место
            client.from('user_visits').select('place_id')
                .eq('user_id', userId)
                .gte('visited_at', today + 'T00:00:00')
                .then(function(r) {
                    var rows = (r && r.data) || [];
                    var unique = {};
                    rows.forEach(function(x) { if (x.place_id) unique[x.place_id] = true; });
                    return Object.keys(unique).length >= 1;
                })
                .catch(function() { return false; }),

            // Проверка: прошёл викторину
            client.from('user_quizzes').select('id')
                .eq('user_id', userId)
                .gte('passed_at', today + 'T00:00:00')
                .eq('passed', true).limit(1)
                .then(function(r) { return (r && r.data && r.data.length > 0); })
                .catch(function() { return false; })
        ]);

        var savedQuests = results[0];
        var savedMap = {};
        savedQuests.forEach(function(q) { savedMap[q.quest_id] = q.done; });

        var checks = {
            read_article: results[1],
            visit_place: results[2],
            pass_quiz: results[3],
            use_translator: savedMap.use_translator === true
        };

        var tasks = QUEST_DEFINITIONS.map(function(def) {
            var alreadyInDB = savedMap[def.id] === true;
            var checkedNow = checks[def.id] === true;
            var done = alreadyInDB || checkedNow;

            // Новая задача — записать и начислить XP
            if (done && !alreadyInDB) {
                (async function() {
                    try {
                        await client.from('user_quests').insert({
                            user_id: userId,
                            quest_date: today,
                            quest_id: def.id,
                            done: true,
                            completed_at: new Date().toISOString()
                        });
                        if (def.xp > 0) await addXP(userId, def.xp);
                    } catch(e) {
                        console.warn('[daily] quest save:', e.message);
                    }
                })();
            }

            return {
                id: def.id,
                icon: def.icon,
                title: def.title,
                reward: def.reward,
                done: done
            };
        });

        return tasks;
    }

    // ============================================================
    // 🎯 Плавающая кнопка рулетки
    // ============================================================
    function showRouletteButton() {
        if (document.getElementById('daily-roulette-btn')) return;
        var btn = document.createElement('button');
        btn.id = 'daily-roulette-btn';
        btn.className = 'daily-roulette-btn';
        btn.type = 'button';
        btn.innerHTML = '🎲 Крутить рулетку';
        btn.style.setProperty('--dk-color', currentKingdom.color);
        btn.style.setProperty('--dk-light', currentKingdom.light);
        btn.onclick = openRoulette;
        document.body.appendChild(btn);
    }

    // ============================================================
    // 🚀 Основная инициализация
    // ============================================================
    async function init() {
        injectStyles();

        var client = getClient();
        if (!client) {
            console.log('[daily] клиент не готов');
            return;
        }

        // Ждём пользователя (не дольше 5 сек)
        var sessionRes;
        try {
            sessionRes = await withRetry(function() {
                return client.auth.getSession();
            }, 2);
        } catch(e) {
            console.warn('[daily] getSession:', e.message);
            return;
        }

        var session = sessionRes && sessionRes.data && sessionRes.data.session;
        currentUser = session && session.user;
        if (!currentUser) return;

        // Загружаем профиль
        try {
            var pr = await client.from('profiles')
                .select('kingdom, experience')
                .eq('user_id', currentUser.id)
                .maybeSingle();
            currentProfile = pr && pr.data;
            if (currentProfile && currentProfile.kingdom && KINGDOMS[currentProfile.kingdom]) {
                currentKingdom = KINGDOMS[currentProfile.kingdom];
            }
        } catch(e) {
            console.warn('[daily] profile:', e.message);
        }

        var today = todayStr();

        // Загружаем информацию о стрике
        var lastStreak = 0;
        var lastDate = null;
        try {
            var streakRes = await client.from('daily_logins')
                .select('login_date, streak')
                .eq('user_id', currentUser.id)
                .order('login_date', { ascending: false })
                .limit(1);
            if (streakRes && streakRes.data && streakRes.data.length > 0) {
                lastStreak = streakRes.data[0].streak || 0;
                lastDate = streakRes.data[0].login_date;
            }
        } catch(e) {
            console.warn('[daily] streak:', e.message);
        }

        // Уже заходил сегодня — только кнопка рулетки
        if (lastDate === today) {
            var rouletteKey = 'roulette_' + currentUser.id + '_' + today;
            if (!localStorage.getItem(rouletteKey)) {
                setTimeout(showRouletteButton, 2000);
            }
            return;
        }

        // Защита от двойного начисления
        if (isProcessing) return;
        isProcessing = true;

        // Считаем новый стрик
        var newStreak = 1;
        if (lastDate) {
            var last = new Date(lastDate + 'T00:00:00');
            var now = new Date(today + 'T00:00:00');
            var diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) newStreak = (lastStreak || 0) + 1;
            else if (diffDays === 0) newStreak = lastStreak;
        }

        var rewardXP = STREAK_REWARDS[newStreak] || newStreak * 5;

        // Записываем вход
        try {
            var ins = await client.from('daily_logins').insert({
                user_id: currentUser.id,
                login_date: today,
                streak: newStreak,
                reward_xp: rewardXP
            });
            if (ins && ins.error) {
                console.warn('[daily] insert error:', ins.error);
                isProcessing = false;
                return;
            }
        } catch(e) {
            console.warn('[daily] login insert:', e.message);
            isProcessing = false;
            return;
        }

        // Начисляем XP
        await addXP(currentUser.id, rewardXP);

        // Показываем модалку награды
        setTimeout(function() {
            showDailyReward(newStreak, rewardXP);
            // Кнопка рулетки на будущее
            setTimeout(showRouletteButton, 3000);
        }, 1000);
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.openRoulette = openRoulette;
    window.dailyReward = {
        getDailyTasks: getDailyTasks,
        addXP: addXP,
        getCurrentKingdom: function() { return currentKingdom; },
        openRoulette: openRoulette
    };

    // ============================================================
    // 🚀 Старт
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Ретрай если клиент появился позже
    setTimeout(function() {
        if (!currentUser) init();
    }, 2500);

    console.log('✅ daily-reward.js v2 VIP загружен');
})();
