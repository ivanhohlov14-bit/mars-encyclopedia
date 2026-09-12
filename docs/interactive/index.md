---
title: 🎮 Интерактив
description: Игры, викторины, карты и инструменты для исследования Марса
---

<h1 id="interactive-title" style="text-align:center; font-size: 2.2rem; letter-spacing: 2px;">🎮 Интерактив</h1>

<div id="interactive-container" style="max-width: 960px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 40px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка интерактива...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes glow { 0%, 100% { box-shadow: 0 0 20px var(--kingdom-shadow); } 50% { box-shadow: 0 0 40px var(--kingdom-shadow); } }

.fade-in { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

#interactive-title {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Карточки интерактива */
.interactive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
}

.interactive-card {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    padding: 32px 24px; border-radius: 20px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    border: 2px solid transparent;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    text-decoration: none; color: inherit;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer; position: relative; overflow: hidden;
    min-height: 240px; justify-content: center;
}

.interactive-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 100%;
    background: linear-gradient(135deg, var(--kingdom-color) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.4s; z-index: 0;
}

.interactive-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: var(--kingdom-color);
    box-shadow: 0 24px 48px -12px var(--kingdom-shadow);
}

.interactive-card:hover::before { opacity: 1; }
.interactive-card > * { position: relative; z-index: 2; }

.interactive-card .ic-icon {
    font-size: 3.5rem; margin-bottom: 16px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-block;
}

.interactive-card:hover .ic-icon { transform: scale(1.2) rotate(-8deg) translateY(-4px); }
.interactive-card .ic-title { font-size: 1.2rem; font-weight: 800; color: #2c3e50; margin-bottom: 8px; }
.interactive-card:hover .ic-title { color: var(--kingdom-color); }
.interactive-card .ic-desc { font-size: 0.85rem; color: #777; line-height: 1.5; max-width: 240px; }
.interactive-card .ic-badge {
    display: inline-block; margin-top: 12px; padding: 4px 14px; border-radius: 20px;
    font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;
    background: var(--kingdom-color); color: #fff;
}

/* Блоки */
.block {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    padding: 24px; border-radius: 16px; margin-bottom: 24px;
    border: 2px solid var(--kingdom-color);
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
    transition: box-shadow 0.3s;
}
.block:hover { box-shadow: 0 12px 32px -8px var(--kingdom-shadow); }
.block h3 { margin: 0 0 16px 0; font-size: 1.2rem; color: var(--kingdom-color); font-weight: 700; display: flex; align-items: center; gap: 10px; }

/* Рейтинг */
.rating-table { width: 100%; border-collapse: collapse; }
.rating-table th {
    text-align: left; padding: 10px 14px; font-size: 0.8rem;
    color: #888; text-transform: uppercase; letter-spacing: 0.8px;
    border-bottom: 2px solid var(--kingdom-color);
}
.rating-table td {
    padding: 12px 14px; border-bottom: 1px solid rgba(0,0,0,0.05);
    font-size: 0.9rem;
}
.rating-table tr { transition: all 0.2s; }
.rating-table tr:hover { background: var(--kingdom-color); color: #fff; }
.rating-table tr:hover td { border-bottom-color: transparent; }
.rating-table tr:hover .rank-medal { filter: brightness(1.3); }
.rank-medal { font-size: 1.4rem; margin-right: 8px; }
.rank-avatar { width: 32px; height: 32px; border-radius: 50%; vertical-align: middle; margin-right: 10px; object-fit: cover; border: 2px solid var(--kingdom-color); }

/* Живой счётчик */
.live-counter {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px; border-radius: 14px;
    background: linear-gradient(135deg, #27ae60, #16a085);
    color: #fff; box-shadow: 0 8px 24px rgba(39, 174, 96, 0.3);
    margin-bottom: 24px;
    animation: glow 3s ease-in-out infinite;
}
.live-dot {
    width: 12px; height: 12px; border-radius: 50%; background: #fff;
    animation: pulse 1.5s ease-in-out infinite;
    box-shadow: 0 0 12px #fff;
}

/* Ежедневные задания */
.task-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; border-radius: 12px;
    background: rgba(0,0,0,0.03);
    margin-bottom: 10px;
    border-left: 4px solid var(--kingdom-color);
    transition: all 0.25s;
}
.task-item:hover { background: rgba(0,0,0,0.06); transform: translateX(4px); }
.task-item.done {
    opacity: 0.6;
    border-left-color: #27ae60;
    text-decoration: line-through;
}
.task-icon { font-size: 1.6rem; }
.task-body { flex: 1; }
.task-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 2px; }
.task-reward { font-size: 0.78rem; color: var(--kingdom-color); font-weight: 700; }
.task-status { font-size: 1.2rem; }

/* Мини-игра */
.mini-game {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 16px; padding: 28px; color: #fff;
    text-align: center; margin-bottom: 24px;
    position: relative; overflow: hidden;
}
.mini-game::before {
    content: ''; position: absolute; top: -50%; right: -20%;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
    border-radius: 50%;
}
.mini-game > * { position: relative; z-index: 1; }
.mg-options { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
.mg-btn {
    padding: 12px 24px; border-radius: 10px;
    background: rgba(255,255,255,0.25);
    border: 2px solid rgba(255,255,255,0.4);
    color: #fff; font-size: 1rem; font-weight: 600;
    cursor: pointer; transition: all 0.25s;
}
.mg-btn:hover { background: rgba(255,255,255,0.4); transform: scale(1.05); }
.mg-btn.correct { background: #27ae60; border-color: #27ae60; }
.mg-btn.wrong { background: #e74c3c; border-color: #e74c3c; }

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .interactive-card, .block { background: rgba(30, 30, 46, 0.85); color: #d4d4e8; }
    .interactive-card .ic-title { color: #e0e0e0; }
    .interactive-card .ic-desc { color: #aaa; }
    .task-item { background: rgba(30, 30, 46, 0.5); }
    .rating-table tr:hover { background: var(--kingdom-color); }
}

@media (max-width: 600px) {
    #interactive-title { font-size: 1.6rem !important; }
    .interactive-grid { grid-template-columns: 1fr; gap: 16px; }
    .interactive-card { padding: 24px 18px; min-height: 200px; }
    .interactive-card .ic-icon { font-size: 2.8rem; }
    .block { padding: 18px 16px; }
    .rating-table td, .rating-table th { padding: 8px 10px; font-size: 0.8rem; }
    .rank-avatar { width: 26px; height: 26px; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
        'Аркадия':    { color: '#D4A574', bg: '#FDF8F0', light: '#E8C9A0' },
        'Ксанф':      { color: '#3D3D3D', bg: '#F5F5F5', light: '#6B6B6B' },
        'Эдем':       { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' },
        'Эридания':   { color: '#F5D76E', bg: '#FFFDF5', light: '#FAE9A0' },
        'Кхонг':      { color: '#A9A9A9', bg: '#F8F8F8', light: '#C8C8C8' },
        'Авсония':    { color: '#87CEEB', bg: '#F0F8FF', light: '#B0D8EB' },
        'Кимерия':    { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9' },
        'Серпентида': { color: '#E57373', bg: '#FFF5F5', light: '#F5A0A0' },
        'Эритрей':    { color: '#64B5F6', bg: '#F0F8FF', light: '#90CAF9' },
        'Утопия':     { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' },
        'Эллада':     { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91' },
        'Аливасото':  { color: '#81C784', bg: '#F0FFF0', light: '#A5D6A7' }
    };

    const INTERACTIVE_ITEMS = [
        { icon: '🏛️', title: 'Марсианская империя', desc: 'Управляйте колонией, стройте базы, собирайте ресурсы', link: '/game/', badge: 'Стратегия' },
        { icon: '🗺️', title: 'Карта Марса', desc: 'Интерактивный 3D-глобус с метками городов и регионов', link: '/globe-map/', badge: '3D-карта' },
        { icon: '🪐', title: 'К Исходу', desc: 'Сюжетная игра с выбором пути и последствиями', link: '/interactive/exodus/', badge: 'Квест' },
        { icon: '🗣️', title: 'Переводчик', desc: 'Переводите слова и фразы на марсианский язык', link: '/translator/', badge: 'Язык' },
        { icon: '🎵', title: 'Конструктор мелодий', desc: 'Создавайте музыку из 7 нот со звуком гуслей', link: '/music/constructor/', badge: 'Музыка' },
        { icon: '📊', title: 'Моя статистика', desc: 'Следите за достижениями, опытом и прогрессом', link: '/stats/', badge: 'Прогресс' }
    ];

    // Викторины (пока заглушка - список викторин)
    const QUIZZES = [
        { icon: '🏛️', title: 'История Марса', desc: 'Проверьте знания о периодах и событиях', link: '/quiz/history/', count: 10 },
        { icon: '🗺️', title: 'География', desc: 'Моря, города, горы и пещеры', link: '/quiz/geography/', count: 10 },
        { icon: '👤', title: 'Персонажи', desc: 'Хевсур, Талин, Йарра и другие герои', link: '/quiz/characters/', count: 10 },
        { icon: '🗣️', title: 'Марсианский язык', desc: 'Слова и фразы из энциклопедии', link: '/quiz/language/', count: 10 }
    ];

    const container = document.getElementById('interactive-container');
    const titleEl = document.getElementById('interactive-title');

    let kingdom = KINGDOMS['Эдем'];
    let user = null;

    // ============================================================
    // Вспомогательные функции
    // ============================================================
    function getDailyTasks(userId) {
        const today = new Date().toISOString().slice(0, 10);
        const saved = localStorage.getItem(`daily_tasks_${userId}_${today}`);
        if (saved) return JSON.parse(saved);

        return [
            { id: 'read_article', icon: '📖', title: 'Прочитать статью', reward: '+5 XP', done: false },
            { id: 'visit_place', icon: '📍', title: 'Посетить новое место', reward: '+10 XP', done: false },
            { id: 'pass_quiz', icon: '🧠', title: 'Пройти викторину', reward: '+20 XP', done: false },
            { id: 'use_translator', icon: '🗣️', title: 'Перевести слово', reward: '+5 XP', done: false }
        ];
    }

    function saveDailyTasks(userId, tasks) {
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem(`daily_tasks_${userId}_${today}`, JSON.stringify(tasks));
    }

    // ============================================================
    // Мини-игра: угадай символ
    // ============================================================
    const MINI_GAME_DATA = [
        { symbol: 'Ὸ', answer: 'До' },
        { symbol: 'ᵭ', answer: 'Ре' },
        { symbol: 'ꝯ', answer: 'Ми' },
        { symbol: 'Ꝼ', answer: 'Фа' },
        { symbol: 'Ώ', answer: 'Соль' },
        { symbol: 'ⴡ', answer: 'Си' },
        { symbol: 'ꓥ', answer: 'Ля' }
    ];

    let currentGame = null;

    function newMiniGame() {
        const item = MINI_GAME_DATA[Math.floor(Math.random() * MINI_GAME_DATA.length)];
        const options = [item.answer];
        while (options.length < 3) {
            const other = MINI_GAME_DATA[Math.floor(Math.random() * MINI_GAME_DATA.length)].answer;
            if (!options.includes(other)) options.push(other);
        }
        options.sort(() => Math.random() - 0.5);
        currentGame = { ...item, options };
        renderMiniGame();
    }

    function renderMiniGame() {
        const el = document.getElementById('mini-game-body');
        if (!el || !currentGame) return;
        el.innerHTML = `
            <div style="font-size: 3.5rem; margin: 12px 0; font-family: 'Segoe UI', sans-serif;">${currentGame.symbol}</div>
            <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 8px;">Как называется эта нота?</div>
            <div class="mg-options">
                ${currentGame.options.map(opt => `
                    <button class="mg-btn" onclick="checkMiniGameAnswer('${opt}')">${opt}</button>
                `).join('')}
            </div>
        `;
    }

    window.checkMiniGameAnswer = function(answer) {
        const btns = document.querySelectorAll('.mg-btn');
        btns.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === currentGame.answer) btn.classList.add('correct');
            else if (btn.textContent === answer && answer !== currentGame.answer) btn.classList.add('wrong');
        });
        setTimeout(newMiniGame, 1500);
    };

    // ============================================================
    // Загрузка данных
    // ============================================================
    (async function init() {
        try {
            const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            const { data: { session } } = await client.auth.getSession();
            user = session?.user || null;

            let topPlayers = [];
            if (user) {
                const { data: profile } = await client
                    .from('profiles').select('kingdom').eq('user_id', user.id).single();
                if (profile?.kingdom && KINGDOMS[profile.kingdom]) kingdom = KINGDOMS[profile.kingdom];
            }

            // Топ-10 игроков
            const { data: leaders } = await client
                .from('profiles')
                .select('user_id, username, display_name, experience, level, avatar_url')
                .order('experience', { ascending: false })
                .limit(10);
            topPlayers = leaders || [];

            // Применяем тему
            document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
            document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
            document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
            document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
            document.body.style.background = kingdom.bg;
            document.body.style.backgroundAttachment = 'fixed';

            // Применяем стили заголовка
            titleEl.style.color = kingdom.color;
            titleEl.style.textShadow = `0 2px 12px ${kingdom.color}40`;

            // ============================================================
            // Задания
            // ============================================================
            const dailyTasks = user ? getDailyTasks(user.id) : [];
            const doneTasks = dailyTasks.filter(t => t.done).length;

            // ============================================================
            // Случайное число игроков онлайн
            // ============================================================
            const baseOnline = 3 + Math.floor(Math.random() * 8);
            const onlineNow = user ? baseOnline + 1 : baseOnline;

            // ============================================================
            // РЕНДЕР
            // ============================================================
            container.innerHTML = `
                <!-- Живой счётчик -->
                <div class="live-counter fade-in">
                    <div class="live-dot"></div>
                    <div style="flex: 1;">
                        <div style="font-size: 1.05rem; font-weight: 700;">Сейчас на сайте: ${onlineNow} ${onlineNow === 1 ? 'исследователь' : onlineNow < 5 ? 'исследователя' : 'исследователей'}</div>
                        <div style="font-size: 0.82rem; opacity: 0.9;">Обновляется каждые 30 секунд</div>
                    </div>
                </div>

                <!-- Карточки интерактива -->
                <h3 style="color: var(--kingdom-color); margin: 0 0 16px 0;">🎮 Режимы и инструменты</h3>
                <div class="interactive-grid">
                    ${INTERACTIVE_ITEMS.map((item, i) => `
                        <a href="${item.link}" class="interactive-card fade-in" style="animation-delay: ${i * 0.08}s;">
                            <span class="ic-icon">${item.icon}</span>
                            <span class="ic-title">${item.title}</span>
                            <span class="ic-desc">${item.desc}</span>
                            <span class="ic-badge">${item.badge}</span>
                        </a>
                    `).join('')}
                </div>

                <!-- Викторины -->
                <div class="block fade-in">
                    <h3>🧠 Викторины</h3>
                    <p style="font-size: 0.88rem; color: #777; margin: 0 0 16px 0;">
                        Проверьте знания о Марсе и заработайте опыт. Каждая викторина — <b style="color: var(--kingdom-color);">+20 XP</b>.
                    </p>
                    <div class="interactive-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                        ${QUIZZES.map(q => `
                            <a href="${q.link}" class="interactive-card" style="min-height: 180px; padding: 22px 16px;">
                                <span class="ic-icon" style="font-size: 2.5rem;">${q.icon}</span>
                                <span class="ic-title" style="font-size: 1rem;">${q.title}</span>
                                <span class="ic-desc">${q.desc}</span>
                                <span class="ic-badge">${q.count} вопросов</span>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Топ-10 игроков -->
                <div class="block fade-in">
                    <h3>🏆 Топ-10 исследователей</h3>
                    ${topPlayers.length > 0 ? `
                        <table class="rating-table">
                            <thead>
                                <tr>
                                    <th style="width: 60px;">#</th>
                                    <th>Игрок</th>
                                    <th style="text-align: right;">Уровень</th>
                                    <th style="text-align: right;">Опыт</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${topPlayers.map((p, i) => {
                                    const name = p.display_name || p.username || 'Аноним';
                                    const medals = ['🥇', '🥈', '🥉'];
                                    const medal = medals[i] || `${i + 1}`;
                                    const isMe = user && p.user_id === user.id;
                                    return `
                                        <tr style="${isMe ? 'background: var(--kingdom-color); color: #fff; font-weight: 700;' : ''}">
                                            <td><span class="rank-medal">${medal}</span></td>
                                            <td>
                                                <img src="${p.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=6C63FF&color=fff&size=64'}" class="rank-avatar">
                                                ${name}${isMe ? ' (вы)' : ''}
                                            </td>
                                            <td style="text-align: right;">${p.level || 1}</td>
                                            <td style="text-align: right;"><b>${p.experience || 0}</b></td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    ` : '<p style="text-align: center; color: #999; padding: 20px;">Пока нет данных</p>'}
                </div>

                <!-- Ежедневные задания -->
                <div class="block fade-in">
                    <h3>🎯 Ежедневные задания <span style="font-size: 0.8rem; color: #888; font-weight: 400;">(${doneTasks}/${dailyTasks.length} выполнено)</span></h3>
                    ${user ? (
                        dailyTasks.length > 0 ? dailyTasks.map(t => `
                            <div class="task-item ${t.done ? 'done' : ''}">
                                <span class="task-icon">${t.icon}</span>
                                <div class="task-body">
                                    <div class="task-title">${t.title}</div>
                                    <div class="task-reward">Награда: ${t.reward}</div>
                                </div>
                                <span class="task-status">${t.done ? '✅' : '⏳'}</span>
                            </div>
                        `).join('') : ''
                    ) : `
                        <p style="text-align: center; color: #888; padding: 16px;">
                            <a href="/login/" style="color: var(--kingdom-color); font-weight: 600;">Войдите</a>, чтобы получить ежедневные задания
                        </p>
                    `}
                </div>

                <!-- Мини-игра -->
                <div class="mini-game fade-in">
                    <div style="font-size: 1.3rem; font-weight: 800; margin-bottom: 4px;">🎲 Мини-игра</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">Угадай марсианскую ноту</div>
                    <div id="mini-game-body"></div>
                </div>

                <!-- Возврат -->
                <p style="margin-top: 24px; text-align: center;">
                    <a href="/" style="color: var(--kingdom-color); text-decoration: none; font-weight: 600;">← На главную</a>
                </p>
            `;

            // Запускаем мини-игру
            newMiniGame();

            // Обновление счётчика онлайн каждые 30 сек
            setInterval(() => {
                const newOnline = 3 + Math.floor(Math.random() * 8) + (user ? 1 : 0);
                const counterEl = document.querySelector('.live-counter');
                if (counterEl) {
                    const textEl = counterEl.querySelector('div > div:first-child');
                    if (textEl) {
                        textEl.textContent = `Сейчас на сайте: ${newOnline} ${newOnline === 1 ? 'исследователь' : newOnline < 5 ? 'исследователя' : 'исследователей'}`;
                    }
                }
            }, 30000);

        } catch (e) {
            console.error('❌ Ошибка:', e);
            container.innerHTML = '<p style="text-align:center; padding: 40px;">⚠️ Не удалось загрузить интерактив.</p>';
        }
    })();
})();
</script>
