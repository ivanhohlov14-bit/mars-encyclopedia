// daily-reward.js — ежедневная награда + рулетка удачи + автозадания
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
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

    // Награды за дни стрика
    const STREAK_REWARDS = {
        1: 5, 2: 10, 3: 15, 4: 20, 5: 25, 6: 35, 7: 50,
        14: 100, 30: 250, 100: 1000
    };

    // Призы рулетки
    const ROULETTE_PRIZES = [
        { icon: '💎', label: '10 XP',      value: 10,   xp: 10,   weight: 30 },
        { icon: '💎', label: '25 XP',      value: 25,   xp: 25,   weight: 25 },
        { icon: '💎', label: '50 XP',      value: 50,   xp: 50,   weight: 15 },
        { icon: '⭐', label: '100 XP',     value: 100,  xp: 100,  weight: 8 },
        { icon: '👑', label: '250 XP',     value: 250,  xp: 250,  weight: 3 },
        { icon: '🎁', label: '500 XP',     value: 500,  xp: 500,  weight: 1 },
        { icon: '🔥', label: 'Удача ×2',   value: 'x2', xp: 0,    weight: 10 },
        { icon: '😢', label: 'Пусто',       value: 0,    xp: 0,    weight: 8 }
    ];

    // Определения ежедневных заданий
    const QUEST_DEFINITIONS = [
        { id: 'read_article',  icon: '📖', title: 'Прочитать статью',      reward: '+5 XP',  xp: 5 },
        { id: 'visit_place',   icon: '📍', title: 'Посетить новое место',   reward: '+10 XP', xp: 10 },
        { id: 'pass_quiz',     icon: '🧠', title: 'Пройти викторину',       reward: '+20 XP', xp: 20 },
        { id: 'use_translator',icon: '🗣️', title: 'Перевести слово',        reward: '+5 XP',  xp: 5 }
    ];

    let client = null;
    let currentUser = null;
    let _kingdomCache = null;

    // ============================================================
    // Утилиты
    // ============================================================
    function todayStr() {
        return new Date().toISOString().slice(0, 10);
    }

    function getCurrentKingdom() {
        return _kingdomCache || KINGDOMS['Эдем'];
    }

    async function addXP(userId, amount) {
        if (amount <= 0) return;
        const { data: profile } = await client
            .from('profiles')
            .select('experience')
            .eq('user_id', userId)
            .single();

        if (!profile) return;
        const newXP = (profile.experience || 0) + amount;
        await client.from('profiles').update({ experience: newXP }).eq('user_id', userId);
    }

    // ============================================================
    // Стрик
    // ============================================================
    async function getStreakInfo(userId) {
        const { data, error } = await client
            .from('daily_logins')
            .select('login_date, streak')
            .eq('user_id', userId)
            .order('login_date', { ascending: false })
            .limit(1);

        if (error || !data || data.length === 0) return { streak: 0, lastDate: null };
        return { streak: data[0].streak, lastDate: data[0].login_date };
    }

    // ============================================================
    // ЕЖЕДНЕВНЫЕ ЗАДАНИЯ (с реальной проверкой)
    // ============================================================
    async function getDailyTasks(userId) {
        const today = todayStr();

        // Загружаем состояние из БД
        let quests = [];
        try {
            const { data } = await client
                .from('user_quests')
                .select('quest_id, done')
                .eq('user_id', userId)
                .eq('quest_date', today);
            quests = data || [];
        } catch (e) {
            console.warn('user_quests недоступна:', e);
        }

        const questMap = {};
        quests.forEach(q => { questMap[q.quest_id] = q.done; });

        // Проверяем реальные действия за сегодня
        const checks = {
            read_article: false,
            visit_place: false,
            pass_quiz: false,
            use_translator: false
        };

        // 1. Читал статью?
        try {
            const { data: v } = await client.from('user_visits')
                .select('id').eq('user_id', userId)
                .gte('visited_at', today + 'T00:00:00').limit(1);
            checks.read_article = (v || []).length > 0;
        } catch (e) {}

        // 2. Посетил новое место?
        try {
            const { data: v2 } = await client.from('user_visits')
                .select('place_id').eq('user_id', userId)
                .gte('visited_at', today + 'T00:00:00');
            const uniqueToday = new Set((v2 || []).map(x => x.place_id));
            checks.visit_place = uniqueToday.size >= 1;
        } catch (e) {}

        // 3. Прошёл викторину?
        try {
            const { data: q } = await client.from('user_quizzes')
                .select('id').eq('user_id', userId)
                .gte('passed_at', today + 'T00:00:00')
                .eq('passed', true).limit(1);
            checks.pass_quiz = (q || []).length > 0;
        } catch (e) {}

        // 4. Перевод (пока заглушка — если есть запись в user_quests)
        checks.use_translator = questMap.use_translator === true;

        // Формируем список заданий
        const result = QUEST_DEFINITIONS.map(def => {
            const alreadyInDB = questMap[def.id] === true;
            const checkedNow = checks[def.id] === true;
            const done = alreadyInDB || checkedNow;

            // Если выполнено сейчас, но ещё не в БД — записываем и начисляем XP
            if (done && !alreadyInDB) {
                (async () => {
                    try {
                        await client.from('user_quests').insert({
                            user_id: userId,
                            quest_date: today,
                            quest_id: def.id,
                            done: true,
                            completed_at: new Date().toISOString()
                        });
                        if (def.xp > 0) await addXP(userId, def.xp);
                    } catch (e) {
                        console.warn('Не удалось записать задание:', e);
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

        return result;
    }

    // ============================================================
    // Модальное окно
    // ============================================================
    function showModal(html, kingdom) {
        const old = document.getElementById('daily-modal-overlay');
        if (old) old.remove();

        const overlay = document.createElement('div');
        overlay.id = 'daily-modal-overlay';
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 99999;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(6px);
            display: flex; align-items: center; justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        `;
        overlay.innerHTML = `
            <div style="
                background: linear-gradient(135deg, ${kingdom.color}, ${kingdom.light});
                color: #fff;
                max-width: 460px; width: 100%;
                padding: 36px 28px;
                border-radius: 24px;
                box-shadow: 0 30px 80px rgba(0,0,0,0.5);
                text-align: center;
                position: relative;
                overflow: hidden;
                animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            ">
                <button onclick="this.closest('#daily-modal-overlay').remove()" style="
                    position: absolute; top: 12px; right: 16px;
                    background: rgba(255,255,255,0.2); border: none;
                    width: 32px; height: 32px; border-radius: 50%;
                    color: #fff; font-size: 18px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                ">✕</button>
                ${html}
            </div>
        `;

        document.body.appendChild(overlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // ============================================================
    // Модалка ежедневного входа
    // ============================================================
    function showDailyReward(streak, rewardXP) {
        const kingdom = getCurrentKingdom();
        const bonusText = [3, 7, 14, 30].includes(streak)
            ? `<div style="background: rgba(255,255,255,0.25); padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 8px 0; font-weight: 700; font-size: 0.9rem;">🎉 БОНУС ЗА ${streak} ДНЕЙ!</div>`
            : '';

        showModal(`
            <div style="font-size: 4rem; margin-bottom: 8px;">🎁</div>
            <h2 style="margin: 0 0 4px 0; font-size: 1.8rem; font-weight: 800;">Ежедневная награда!</h2>
            <p style="margin: 0 0 20px 0; opacity: 0.9; font-size: 0.95rem;">Ты заходишь ${streak} ${streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} подряд</p>
            ${bonusText}
            <div style="font-size: 3rem; margin: 16px 0 8px 0; font-weight: 900;">+${rewardXP} XP</div>
            <p style="margin: 0 0 24px 0; opacity: 0.9; font-size: 0.9rem;">Завтра получишь ещё больше!</p>
            <button onclick="this.closest('#daily-modal-overlay').remove(); window.openRoulette && window.openRoulette();" style="
                background: rgba(255,255,255,0.3);
                border: 2px solid rgba(255,255,255,0.5);
                color: #fff; padding: 14px 32px;
                border-radius: 40px; font-size: 1rem;
                font-weight: 700; cursor: pointer;
                transition: all 0.3s;
            ">🎲 Крутить рулетку</button>
        `, kingdom);
    }

    // ============================================================
    // Рулетка
    // ============================================================
    function pickPrize() {
        const totalWeight = ROULETTE_PRIZES.reduce((s, p) => s + p.weight, 0);
        let rand = Math.random() * totalWeight;
        for (const prize of ROULETTE_PRIZES) {
            if (rand < prize.weight) return prize;
            rand -= prize.weight;
        }
        return ROULETTE_PRIZES[0];
    }

    window.openRoulette = async function() {
        const userId = currentUser?.id;
        if (!userId) {
            alert('Войдите, чтобы крутить рулетку');
            return;
        }

        const today = todayStr();
        const rouletteKey = `roulette_${userId}_${today}`;
        if (localStorage.getItem(rouletteKey)) {
            showModal(`
                <div style="font-size: 4rem;">⏰</div>
                <h2 style="margin: 12px 0 8px 0; font-size: 1.5rem;">Уже крутил сегодня!</h2>
                <p style="opacity: 0.9;">Возвращайся завтра за новой попыткой</p>
            `, getCurrentKingdom());
            return;
        }

        const kingdom = getCurrentKingdom();
        const prize = pickPrize();

        showModal(`
            <div style="font-size: 1.5rem; font-weight: 800; margin-bottom: 16px;">🎲 Рулетка удачи</div>
            <div id="roulette-wheel" style="font-size: 6rem; margin: 24px 0; animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1);">🎰</div>
            <div id="roulette-result" style="font-size: 1.1rem; opacity: 0.9;">Крутим...</div>
        `, kingdom);

        setTimeout(async () => {
            localStorage.setItem(rouletteKey, '1');

            if (prize.xp > 0) {
                await addXP(userId, prize.xp);
            }

            const resultEl = document.getElementById('roulette-result');
            if (resultEl) {
                resultEl.innerHTML = `
                    <div style="font-size: 4rem; margin: 12px 0;">${prize.icon}</div>
                    <div style="font-size: 1.8rem; font-weight: 900; margin-bottom: 8px;">${prize.label}</div>
                    <div style="opacity: 0.9;">${prize.xp > 0 ? 'XP добавлен!' : 'Повезёт в следующий раз'}</div>
                    <button onclick="this.closest('#daily-modal-overlay').remove(); location.reload();" style="
                        margin-top: 20px; background: rgba(255,255,255,0.3);
                        border: 2px solid rgba(255,255,255,0.5);
                        color: #fff; padding: 12px 28px; border-radius: 40px;
                        font-weight: 700; cursor: pointer; font-size: 1rem;
                    ">Забрать</button>
                `;
            }
        }, 1400);
    };

    // ============================================================
    // Основная логика
    // ============================================================
    async function init() {
        if (typeof supabase === 'undefined') return;
        client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        if (!currentUser) return;

        // Получаем королевство
        const { data: profile } = await client
            .from('profiles')
            .select('kingdom')
            .eq('user_id', currentUser.id)
            .single();

        if (profile?.kingdom && KINGDOMS[profile.kingdom]) {
            _kingdomCache = KINGDOMS[profile.kingdom];
        }

        const today = todayStr();
        const { streak: lastStreak, lastDate } = await getStreakInfo(currentUser.id);

        // Если уже заходил сегодня
        if (lastDate === today) {
            const rouletteKey = `roulette_${currentUser.id}_${today}`;
            if (!localStorage.getItem(rouletteKey)) {
                setTimeout(() => {
                    const btn = document.createElement('button');
                    btn.innerHTML = '🎲 Крутить рулетку';
                    btn.style.cssText = `
                        position: fixed; bottom: 80px; right: 20px;
                        z-index: 9998;
                        background: linear-gradient(135deg, ${getCurrentKingdom().color}, ${getCurrentKingdom().light});
                        color: #fff; border: none;
                        padding: 14px 24px; border-radius: 40px;
                        font-weight: 700; font-size: 0.95rem;
                        cursor: pointer;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
                        animation: pulse 2s ease-in-out infinite;
                    `;
                    btn.onclick = window.openRoulette;
                    document.body.appendChild(btn);
                }, 2000);
            }
            return;
        }

        // Считаем стрик
        let newStreak = 1;
        if (lastDate) {
            const last = new Date(lastDate);
            const now = new Date(today);
            const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) newStreak = (lastStreak || 0) + 1;
            else if (diffDays === 0) newStreak = lastStreak;
        }

        const rewardXP = STREAK_REWARDS[newStreak] || newStreak * 5;

        const { error: insertError } = await client.from('daily_logins').insert({
            user_id: currentUser.id,
            login_date: today,
            streak: newStreak,
            reward_xp: rewardXP
        });

        if (insertError) {
            console.warn('Не удалось записать вход:', insertError);
            return;
        }

        await addXP(currentUser.id, rewardXP);

        setTimeout(() => {
            showDailyReward(newStreak, rewardXP);
        }, 1000);
    }

    // Стили
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);

    // Экспорт для внешнего использования
    window.dailyReward = {
        getDailyTasks,
        addXP,
        getCurrentKingdom
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
