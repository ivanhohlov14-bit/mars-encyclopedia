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
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }

.fade-in { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

/* ==== Убираем подчёркивание ==== */
#interactive-container a,
#interactive-container a:hover,
#interactive-container a:focus,
#interactive-container a:visited,
.interactive-card {
    text-decoration: none !important;
    border-bottom: none !important;
    -webkit-tap-highlight-color: transparent;
}
.md-content #interactive-container a { border-bottom: none !important; }

/* ==== Чёрные заголовки ==== */
.block h3 {
    margin: 0 0 16px 0;
    font-size: 1.2rem;
    color: #1a1a1a;
    font-weight: 800;
    letter-spacing: -0.3px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.task-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 2px; color: #1a1a1a; }

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
    color: inherit;
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
.rank-medal { font-size: 1.4rem; margin-right: 8px; }
.rank-avatar { width: 32px; height: 32px; border-radius: 50%; vertical-align: middle; margin-right: 10px; object-fit: cover; border: 2px solid var(--kingdom-color); }

/* Живой счётчик */
.live-counter {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px; border-radius: 14px;
    background: linear-gradient(135deg, #27ae60, #16a085);
    color: #fff; box-shadow: 0 8px 24px rgba(39, 174, 96, 0.3);
    margin-bottom: 24px;
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
.task-item.done { opacity: 0.6; border-left-color: #27ae60; text-decoration: line-through; }
.task-icon { font-size: 1.6rem; }
.task-body { flex: 1; }
.task-reward { font-size: 0.78rem; color: var(--kingdom-color); font-weight: 700; }
.task-status { font-size: 1.2rem; }

/* Викторины */
.quiz-restart {
    display: inline-block; padding: 12px 24px;
    background: rgba(255,255,255,0.25);
    border: 2px solid rgba(255,255,255,0.4);
    border-radius: 30px; color: #fff;
    cursor: pointer; font-weight: 700; font-size: 0.9rem;
    transition: all 0.3s;
}
.quiz-restart:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }

.quiz-question { font-size: 1.15rem; font-weight: 700; margin-bottom: 20px; color: #fff; }
.quiz-options { display: grid; gap: 10px; }
.quiz-option {
    padding: 14px 20px; border-radius: 10px;
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: #fff; font-size: 0.95rem;
    cursor: pointer; transition: all 0.25s;
    text-align: left; font-weight: 500;
}
.quiz-option:hover { background: rgba(255,255,255,0.35); transform: translateX(4px); }
.quiz-option.correct { background: #27ae60; border-color: #2ecc71; transform: scale(1.02); }
.quiz-option.wrong { background: #e74c3c; border-color: #ec7063; animation: shake 0.4s; }

/* ============================================================
   МИНИ-ИГРА
   ============================================================ */
.mini-game {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 20px;
    padding: 32px 24px;
    color: #fff;
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 16px 40px -8px rgba(102, 126, 234, 0.4);
}
.mini-game::before {
    content: '';
    position: absolute; top: -50%; right: -20%;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
}
.mini-game::after {
    content: '';
    position: absolute; bottom: -50%; left: -20%;
    width: 250px; height: 250px;
    background: radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite reverse;
}
.mini-game > * { position: relative; z-index: 1; }
.mini-game .mg-header { font-size: 1.3rem; font-weight: 800; margin-bottom: 4px; letter-spacing: 0.5px; }
.mini-game .mg-subtitle { font-size: 0.85rem; opacity: 0.9; margin-bottom: 20px; }
.mini-game .mg-symbol {
    font-size: 5rem; margin: 20px 0;
    font-family: 'Segoe UI', 'Arial Unicode MS', sans-serif;
    filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
    animation: pulse 2s ease-in-out infinite;
    display: inline-block;
}
.mini-game .mg-question { font-size: 1rem; opacity: 0.95; margin-bottom: 16px; font-weight: 500; }
.mg-options { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
.mg-btn {
    padding: 14px 32px; border-radius: 12px;
    background: rgba(255,255,255,0.22);
    backdrop-filter: blur(8px);
    border: 2px solid rgba(255,255,255,0.4);
    color: #fff; font-size: 1rem; font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    min-width: 100px; letter-spacing: 0.5px;
}
.mg-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.4);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.mg-btn:disabled { cursor: default; }
.mg-btn.correct { background: #27ae60; border-color: #2ecc71; transform: scale(1.08); box-shadow: 0 8px 24px rgba(39, 174, 96, 0.5); }
.mg-btn.wrong { background: #e74c3c; border-color: #ec7063; animation: shake 0.4s; }
.mg-score { margin-top: 16px; font-size: 0.85rem; opacity: 0.9; }

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .interactive-card, .block { background: rgba(30, 30, 46, 0.85); color: #d4d4e8; }
    .interactive-card .ic-title { color: #e0e0e0; }
    .interactive-card .ic-desc { color: #aaa; }
    .task-item { background: rgba(30, 30, 46, 0.5); }
    .block h3 { color: #e0e0e0; }
    .task-title { color: #e0e0e0; }
}

@media (max-width: 600px) {
    #interactive-title { font-size: 1.6rem !important; }
    .interactive-grid { grid-template-columns: 1fr; gap: 16px; }
    .interactive-card { padding: 24px 18px; min-height: 200px; }
    .interactive-card .ic-icon { font-size: 2.8rem; }
    .block { padding: 18px 16px; }
    .rating-table td, .rating-table th { padding: 8px 10px; font-size: 0.8rem; }
    .rank-avatar { width: 26px; height: 26px; }
    .mini-game .mg-symbol { font-size: 3.5rem; }
    .mg-btn { padding: 12px 20px; min-width: 80px; font-size: 0.9rem; }
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

    // ============================================================
    // ВИКТОРИНЫ
    // ============================================================
    const QUIZZES = {
        history: {
            title: '🏛️ История Марса',
            questions: [
                { q: 'Как называется эпоха, в которой происходит действие книг?', options: ['Эпоха Расцвета', 'Эпоха Умирания', 'Эпоха Освоения', 'Эпоха Льдов'], correct: 1 },
                { q: 'Сколько длится марсианский год?', options: ['365 солов', '687 солов', '22 месяца', '668 солов'], correct: 1 },
                { q: 'Как называется столица Марса?', options: ['Окхасен', 'Роген-Ария', 'Акха-Кор', 'Ксанф'], correct: 1 },
                { q: 'С какого года ведётся марсианское летосчисление?', options: ['2696', '2741', '2729', '2690'], correct: 0 },
                { q: 'Сколько королевств существует на Марсе?', options: ['8', '10', '12', '15'], correct: 2 }
            ]
        },
        geography: {
            title: '🗺️ География',
            questions: [
                { q: 'Как называется море, у которого стоит Окхасен?', options: ['Аргида', 'Ацидалийское', 'Эритрейское', 'Море Ксанфа'], correct: 1 },
                { q: 'Где живёт старый хранитель знаний Хевсур?', options: ['В Академии', 'В пещерах Фарсиды', 'На дне моря', 'В храме Ксанфа'], correct: 1 },
                { q: 'Как называется самая большая река Марса?', options: ['Ксанф', 'Аргида', 'Титан', 'Марсианка'], correct: 0 },
                { q: 'Какой город является портом на Ацидалийском море?', options: ['Роген-Ария', 'Окхасен', 'Акха-Кор', 'Эдем'], correct: 1 },
                { q: 'Как называется подземный храм?', options: ['Храм Ксанфа', 'Храм Эллады', 'Храм Окхасена', 'Храм Фарсиды'], correct: 0 }
            ]
        },
        characters: {
            title: '👤 Персонажи',
            questions: [
                { q: 'Кто такой Хевсур?', options: ['Молодой астроном', 'Старый хранитель знаний', 'Капитан корабля', 'Король Марса'], correct: 1 },
                { q: 'Как зовут молодого учёного из Академии?', options: ['Талин', 'Хевсур', 'Аратан', 'Ксанф'], correct: 0 },
                { q: 'Кто такая Йарра?', options: ['Принцесса', 'Мудрая женщина', 'Жрица', 'Воин'], correct: 1 },
                { q: 'Как зовут короля Марса?', options: ['Аратан III', 'Роген', 'Ксанф', 'Талин'], correct: 0 },
                { q: 'Кто такая Алира?', options: ['Певица', 'Повелительница морей', 'Учёный', 'Хранительница'], correct: 1 }
            ]
        },
        language: {
            title: '🗣️ Марсианский язык',
            questions: [
                { q: 'Что означает слово «Lān»?', options: ['Жизнь', 'Помнить', 'Вода', 'Звезда'], correct: 1 },
                { q: 'Как сказать «звезда» на марсианском?', options: ['Dzen', 'Ākha', 'Kōl', 'Mar'], correct: 0 },
                { q: 'Что означает фраза «Lān sur»?', options: ['Жизнь — звезда', 'Глина помнит', 'Вода умирает', 'Смотри на звёзды'], correct: 1 },
                { q: 'Какое слово означает «вода»?', options: ['Kōl', 'Ākha', 'Dzen', 'Khō'], correct: 1 },
                { q: 'Как переводится «Mar dzen»?', options: ['Жизнь — звезда', 'Марс — дом', 'Звёздный ветер', 'Смерть воды'], correct: 0 }
            ]
        }
    };

    // ============================================================
    // МИНИ-ИГРА
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

    let miniGameCurrent = null;
    let miniGameScore = 0;

    // ============================================================
    // ВИКТОРИНА (глобальные функции)
    // ============================================================
    let currentQuiz = null;
    let currentQuizKey = null;
    let currentQuestionIndex = 0;
    let currentScore = 0;

    window.startQuiz = function(quizKey) {
        currentQuiz = QUIZZES[quizKey];
        currentQuizKey = quizKey;
        currentQuestionIndex = 0;
        currentScore = 0;
        window.renderQuiz();
    };

    window.renderQuiz = function() {
        const el = document.getElementById('quiz-body');
        if (!el || !currentQuiz) return;

        if (currentQuestionIndex >= currentQuiz.questions.length) {
            const percent = Math.round((currentScore / currentQuiz.questions.length) * 100);
            const emoji = percent === 100 ? '🏆' : percent >= 60 ? '🎉' : '💪';
            const msg = percent === 100 ? 'Идеально! Ты — Легенда Марса!' :
                        percent >= 60 ? 'Хороший результат!' :
                        'Попробуй ещё раз — у тебя получится!';
            el.innerHTML = `
                <div style="text-align: center; padding: 32px 20px;">
                    <div style="font-size: 4rem; margin-bottom: 12px;">${emoji}</div>
                    <div style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-bottom: 8px;">
                        ${currentScore} / ${currentQuiz.questions.length}
                    </div>
                    <div style="font-size: 1rem; color: rgba(255,255,255,0.9); margin-bottom: 24px;">${msg}</div>
                    <div style="font-size: 0.85rem; color: rgba(255,255,255,0.75); margin-bottom: 20px;">
                        Награда: <b>+${currentScore * 4} XP</b>
                    </div>
                    <button class="quiz-restart" onclick="startQuiz('${currentQuizKey}')">🔄 Пройти заново</button>
                    <button class="quiz-restart" onclick="closeQuiz()" style="margin-left: 8px;">← К списку</button>
                </div>
            `;
            return;
        }

        const q = currentQuiz.questions[currentQuestionIndex];
        const progress = (currentQuestionIndex / currentQuiz.questions.length) * 100;

        el.innerHTML = `
            <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: rgba(255,255,255,0.8); margin-bottom: 6px;">
                    <span>Вопрос ${currentQuestionIndex + 1} из ${currentQuiz.questions.length}</span>
                    <span>Очки: ${currentScore}</span>
                </div>
                <div style="background: rgba(255,255,255,0.15); border-radius: 8px; height: 6px; overflow: hidden;">
                    <div style="width: ${progress}%; height: 100%; background: #fff; border-radius: 8px; transition: width 0.4s;"></div>
                </div>
            </div>
            <div class="quiz-question">${q.q}</div>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" onclick="answerQuiz(${i})">${opt}</div>
                `).join('')}
            </div>
        `;
    };

    window.answerQuiz = function(index) {
        const q = currentQuiz.questions[currentQuestionIndex];
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt, i) => {
            opt.style.pointerEvents = 'none';
            if (i === q.correct) opt.classList.add('correct');
            else if (i === index && index !== q.correct) opt.classList.add('wrong');
        });
        if (index === q.correct) currentScore++;
        setTimeout(() => {
            currentQuestionIndex++;
            window.renderQuiz();
        }, 1200);
    };

    window.closeQuiz = function() {
        const el = document.getElementById('quiz-body');
        if (el) {
            el.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 3rem; margin-bottom: 12px;">🧠</div>
                    <p style="color: rgba(255,255,255,0.9); font-size: 1rem;">Выберите викторину выше</p>
                </div>
            `;
        }
        currentQuiz = null;
        currentQuestionIndex = 0;
        currentScore = 0;
    };

    // ============================================================
    // МИНИ-ИГРА (функции)
    // ============================================================
    function newMiniGame() {
        const item = MINI_GAME_DATA[Math.floor(Math.random() * MINI_GAME_DATA.length)];
        const options = [item.answer];
        while (options.length < 3) {
            const other = MINI_GAME_DATA[Math.floor(Math.random() * MINI_GAME_DATA.length)].answer;
            if (!options.includes(other)) options.push(other);
        }
        options.sort(() => Math.random() - 0.5);
        miniGameCurrent = { ...item, options };
        renderMiniGame();
    }

    function renderMiniGame() {
        const el = document.getElementById('mini-game-body');
        if (!el || !miniGameCurrent) return;
        el.innerHTML = `
            <div class="mg-symbol">${miniGameCurrent.symbol}</div>
            <div class="mg-question">Как называется эта нота?</div>
            <div class="mg-options">
                ${miniGameCurrent.options.map(opt => `
                    <button class="mg-btn" onclick="checkMiniGameAnswer('${opt}')">${opt}</button>
                `).join('')}
            </div>
            <div class="mg-score">Правильных ответов: <b>${miniGameScore}</b></div>
        `;
    }

    window.checkMiniGameAnswer = function(answer) {
        const btns = document.querySelectorAll('.mg-btn');
        btns.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === miniGameCurrent.answer) btn.classList.add('correct');
            else if (btn.textContent === answer && answer !== miniGameCurrent.answer) btn.classList.add('wrong');
        });
        if (answer === miniGameCurrent.answer) miniGameScore++;
        setTimeout(newMiniGame, 1500);
    };

    // ============================================================
    // ЕЖЕДНЕВНЫЕ ЗАДАНИЯ
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

    // ============================================================
    // ОСНОВНАЯ ЛОГИКА
    // ============================================================
    (async function init() {
        const container = document.getElementById('interactive-container');
        const titleEl = document.getElementById('interactive-title');

        let kingdom = KINGDOMS['Эдем'];
        let user = null;
        let onlineCount = 0;
        let topPlayers = [];

        try {
            const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            // Realtime Presence
            const channel = client.channel('online-users', {
                config: { presence: { key: 'user-' + Math.random().toString(36).slice(2, 10) } }
            });

            channel
                .on('presence', { event: 'sync' }, () => {
                    const state = channel.presenceState();
                    onlineCount = Object.keys(state).length;
                    const cEl = document.getElementById('online-count');
                    if (cEl) cEl.textContent = onlineCount;
                    const tEl = document.getElementById('online-text');
                    if (tEl) tEl.textContent = onlineCount === 1 ? 'исследователь' : onlineCount < 5 ? 'исследователя' : 'исследователей';
                })
                .subscribe(async (status) => {
                    if (status === 'SUBSCRIBED') {
                        await channel.track({ online_at: new Date().toISOString() });
                    }
                });

            // Авторизация
            const { data: { session } } = await client.auth.getSession();
            user = session?.user || null;

            if (user) {
                const { data: profile } = await client
                    .from('profiles').select('kingdom').eq('user_id', user.id).single();
                if (profile?.kingdom && KINGDOMS[profile.kingdom]) kingdom = KINGDOMS[profile.kingdom];
            }

            // Топ-10
            const { data: leaders } = await client
                .from('profiles')
                .select('user_id, username, display_name, experience, level, avatar_url')
                .order('experience', { ascending: false })
                .limit(10);
            topPlayers = leaders || [];

        } catch (e) {
            console.warn('Ошибка Supabase:', e);
        }

        // Тема королевства
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';
        if (titleEl) {
            titleEl.style.color = kingdom.color;
            titleEl.style.textShadow = `0 2px 12px ${kingdom.color}40`;
        }

        const dailyTasks = user ? getDailyTasks(user.id) : [];
        const doneTasks = dailyTasks.filter(t => t.done).length;

        // ============================================================
        // РЕНДЕР
        // ============================================================
        container.innerHTML = `
            <!-- Живой счётчик -->
            <div class="live-counter fade-in">
                <div class="live-dot"></div>
                <div style="flex: 1;">
                    <div style="font-size: 1.05rem; font-weight: 700;">
                        Сейчас на сайте: <span id="online-count">${onlineCount}</span> <span id="online-text">${onlineCount === 1 ? 'исследователь' : onlineCount < 5 ? 'исследователя' : 'исследователей'}</span>
                    </div>
                    <div style="font-size: 0.82rem; opacity: 0.9;">Обновляется в реальном времени</div>
                </div>
            </div>

            <!-- Карточки интерактива -->
            <h3 style="color: #1a1a1a; margin: 0 0 16px 0; font-weight: 800;">🎮 Режимы и инструменты</h3>
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
                <p style="font-size: 0.88rem; color: #555; margin: 0 0 16px 0; font-weight: 500;">
                    Проверьте знания о Марсе. Каждая викторина — <b style="color: var(--kingdom-color);">+20 XP</b>.
                </p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                    ${Object.keys(QUIZZES).map(key => `
                        <button class="quiz-restart" style="background: var(--kingdom-color); border-color: var(--kingdom-color); color: #fff;" onclick="startQuiz('${key}')">${QUIZZES[key].title}</button>
                    `).join('')}
                </div>
                <div id="quiz-body" style="background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light)); border-radius: 16px; padding: 28px; min-height: 260px; display: flex; align-items: center; justify-content: center; color: #fff; box-shadow: 0 8px 24px -8px var(--kingdom-shadow);">
                    <div style="text-align: center; padding: 40px 20px;">
                        <div style="font-size: 3rem; margin-bottom: 12px;">🧠</div>
                        <p style="color: rgba(255,255,255,0.9); font-size: 1rem;">Выберите викторину выше</p>
                    </div>
                </div>
            </div>

            <!-- Топ-10 -->
            <div class="block fade-in">
                <h3>🏆 Топ-10 исследователей</h3>
                ${topPlayers.length > 0 ? `
                    <table class="rating-table">
                        <thead>
                            <tr><th style="width: 60px;">#</th><th>Игрок</th><th style="text-align: right;">Уровень</th><th style="text-align: right;">Опыт</th></tr>
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
                                        <td><img src="${p.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=6C63FF&color=fff&size=64'}" class="rank-avatar">${name}${isMe ? ' (вы)' : ''}</td>
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
                <h3 style="color: #1a1a1a !important;">🎯 Ежедневные задания <span style="font-size: 0.8rem; color: #666; font-weight: 500;">(${doneTasks}/${dailyTasks.length} выполнено)</span></h3>
                ${user ? dailyTasks.map(t => `
                    <div class="task-item ${t.done ? 'done' : ''}">
                        <span class="task-icon">${t.icon}</span>
                        <div class="task-body">
                            <div class="task-title">${t.title}</div>
                            <div class="task-reward">Награда: ${t.reward}</div>
                        </div>
                        <span class="task-status">${t.done ? '✅' : '⏳'}</span>
                    </div>
                `).join('') : `
                    <p style="text-align: center; color: #666; padding: 16px;">
                        <a href="/login/" style="color: var(--kingdom-color); font-weight: 600;">Войдите</a>, чтобы получить ежедневные задания
                    </p>
                `}
            </div>

            <!-- Мини-игра -->
            <div class="mini-game fade-in">
                <div class="mg-header">🎲 Мини-игра</div>
                <div class="mg-subtitle">Угадай марсианскую ноту</div>
                <div id="mini-game-body"></div>
            </div>

            <p style="margin-top: 24px; text-align: center;">
                <a href="/" style="color: var(--kingdom-color); text-decoration: none; font-weight: 600;">← На главную</a>
            </p>
        `;

        newMiniGame();
    })();
})();
</script>
