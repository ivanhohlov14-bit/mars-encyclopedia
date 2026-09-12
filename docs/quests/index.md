---
title: Квесты
comments: false
---

<div id="qst-app" style="max-width: 1000px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: qstSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка квестов...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes qstSpin { to { transform: rotate(360deg); } }
@keyframes qstFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes qstPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes qstFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes qstSlideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes qstShine {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
@keyframes qstBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}
@keyframes qstCheckPop {
    0% { transform: scale(0) rotate(-180deg); }
    70% { transform: scale(1.3) rotate(10deg); }
    100% { transform: scale(1) rotate(0); }
}

.qst-fade { animation: qstFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#qst-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   HERO
   ============================================================ */
.qst-hero {
    position: relative;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    border-radius: 24px;
    padding: 40px 36px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px -16px var(--kingdom-shadow);
}

.qst-hero::before {
    content: '';
    position: absolute;
    top: -60%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
    border-radius: 50%;
    animation: qstFloat 8s ease-in-out infinite;
}

.qst-hero::after {
    content: '';
    position: absolute;
    bottom: -60%; left: -10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);
    border-radius: 50%;
    animation: qstFloat 10s ease-in-out infinite reverse;
}

.qst-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.qst-hero-icon {
    font-size: 4rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.3));
    animation: qstPulse 3s ease-in-out infinite;
}

.qst-hero-title {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
}

.qst-hero-sub {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0 0 24px 0;
}

.qst-hero-progress {
    max-width: 500px;
    margin: 0 auto;
}

.qst-progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    margin-bottom: 8px;
    opacity: 0.95;
    font-weight: 600;
}

.qst-progress-bar {
    background: rgba(255,255,255,0.25);
    border-radius: 12px;
    height: 16px;
    overflow: hidden;
    backdrop-filter: blur(8px);
    position: relative;
}

.qst-progress-fill {
    height: 100%;
    background: #fff;
    border-radius: 12px;
    transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 20px rgba(255,255,255,0.8);
    position: relative;
    overflow: hidden;
}

.qst-progress-fill::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    background-size: 200% 100%;
    animation: qstShine 2s linear infinite;
}

/* ============================================================
   ФИЛЬТРЫ
   ============================================================ */
.qst-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 24px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}

.qst-filter-btn {
    padding: 8px 18px;
    border-radius: 30px;
    border: 2px solid transparent;
    background: rgba(0,0,0,0.03);
    color: #666;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.qst-filter-btn:hover {
    background: rgba(0,0,0,0.06);
    color: #333;
}

.qst-filter-btn.active {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
}

/* ============================================================
   КАРТОЧКА КВЕСТА
   ============================================================ */
.qst-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.qst-card {
    position: relative;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 2px solid rgba(0,0,0,0.05);
    padding: 26px 24px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    animation: qstFadeIn 0.5s ease both;
    display: flex;
    flex-direction: column;
}

.qst-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, var(--kingdom-color), var(--kingdom-light));
    opacity: 0.3;
    transition: opacity 0.3s;
}

.qst-card.completed::before { opacity: 1; }

.qst-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px -12px var(--kingdom-shadow);
    border-color: var(--kingdom-color);
}

.qst-card.completed {
    border-color: #27ae60;
    background: linear-gradient(135deg, rgba(39, 174, 96, 0.04), rgba(255,255,255,0.95));
}

.qst-card.completed::before {
    background: linear-gradient(90deg, #27ae60, #16a085);
}

.qst-card-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 16px;
}

.qst-card-icon {
    font-size: 3rem;
    flex-shrink: 0;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
    transition: transform 0.3s;
}

.qst-card:hover .qst-card-icon {
    transform: scale(1.15) rotate(-8deg);
}

.qst-card-header-info {
    flex: 1;
    min-width: 0;
}

.qst-card-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
}

.qst-card-desc {
    font-size: 0.85rem;
    color: #777;
    line-height: 1.4;
    margin: 0;
}

.qst-card-status {
    position: absolute;
    top: 20px;
    right: 20px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    box-shadow: 0 4px 12px -2px var(--kingdom-shadow);
}

.qst-card-status.completed {
    background: linear-gradient(135deg, #27ae60, #16a085);
    box-shadow: 0 4px 12px -2px rgba(39, 174, 96, 0.4);
}

.qst-card-status.locked {
    background: rgba(0,0,0,0.06);
    color: #888;
    box-shadow: none;
}

/* ============================================================
   ШАГИ
   ============================================================ */
.qst-steps {
    margin: 16px 0;
    flex: 1;
}

.qst-step {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    position: relative;
    transition: all 0.3s;
}

.qst-step::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 38px;
    bottom: -10px;
    width: 2px;
    background: rgba(0,0,0,0.08);
    transition: background 0.3s;
}

.qst-step:last-child::before { display: none; }

.qst-step.done::before { background: #27ae60; }

.qst-step-check {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
    transition: all 0.3s;
    font-weight: 800;
    color: #999;
    border: 2px solid transparent;
}

.qst-step.done .qst-step-check {
    background: linear-gradient(135deg, #27ae60, #16a085);
    color: #fff;
    border-color: #27ae60;
    animation: qstCheckPop 0.5s ease;
    box-shadow: 0 4px 12px -2px rgba(39, 174, 96, 0.4);
}

.qst-step-body { flex: 1; min-width: 0; }

.qst-step-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 2px;
    transition: color 0.3s;
}

.qst-step.done .qst-step-title {
    color: #27ae60;
    text-decoration: line-through;
    text-decoration-color: rgba(39, 174, 96, 0.4);
}

.qst-step-desc {
    font-size: 0.75rem;
    color: #999;
}

/* ============================================================
   ФУТЕР КАРТОЧКИ
   ============================================================ */
.qst-card-footer {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px dashed rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
}

.qst-reward {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.qst-reward-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(243, 156, 18, 0.15), rgba(230, 126, 34, 0.1));
    color: #e67e22;
    font-size: 0.78rem;
    font-weight: 700;
}

.qst-reward-badge.ach {
    background: linear-gradient(135deg, rgba(108, 99, 255, 0.15), rgba(162, 155, 254, 0.1));
    color: var(--kingdom-color);
}

.qst-card-progress {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--kingdom-color);
}

/* ============================================================
   ПУСТОЕ СОСТОЯНИЕ
   ============================================================ */
.qst-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9));
    border-radius: 16px;
    border: 2px dashed rgba(108,99,255,0.2);
}

.qst-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.qst-empty-title { font-size: 1.1rem; font-weight: 700; color: #666; margin-bottom: 4px; }

/* ============================================================
   УВЕДОМЛЕНИЕ О КВЕСТЕ
   ============================================================ */
.qst-completed-toast {
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(-200px);
    background: linear-gradient(135deg, #27ae60, #16a085);
    color: #fff;
    padding: 20px 32px;
    border-radius: 20px;
    box-shadow: 0 20px 60px -12px rgba(39, 174, 96, 0.5);
    z-index: 99999;
    display: flex;
    align-items: center;
    gap: 16px;
    font-weight: 700;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    max-width: 90%;
}

.qst-completed-toast.show {
    transform: translateX(-50%) translateY(0);
}

.qst-completed-toast-icon {
    font-size: 2.5rem;
    animation: qstBounce 0.6s ease infinite;
}

.qst-completed-toast-title {
    font-size: 1rem;
    margin-bottom: 2px;
}

.qst-completed-toast-text {
    font-size: 0.85rem;
    opacity: 0.9;
    font-weight: 500;
}

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .qst-card, .qst-filters { background: rgba(30, 30, 46, 0.9); }
    .qst-card-title { color: #e0e0e0; }
    .qst-card-desc { color: #aaa; }
    .qst-step-title { color: #d0d0d0; }
    .qst-filter-btn { background: rgba(255,255,255,0.05); color: #aaa; }
    .qst-filter-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .qst-card.completed { background: linear-gradient(135deg, rgba(39,174,96,0.08), rgba(30,30,46,0.95)); }
    .qst-empty { background: rgba(30,30,46,0.5); }
    .qst-empty-title { color: #aaa; }
}

@media (max-width: 600px) {
    .qst-hero { padding: 24px 20px; }
    .qst-hero-title { font-size: 1.5rem; }
    .qst-hero-icon { font-size: 3rem; }
    .qst-grid { grid-template-columns: 1fr; }
    .qst-card { padding: 22px 20px; }
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

    // ============================================================
    // ОПРЕДЕЛЕНИЯ КВЕСТОВ
    // ============================================================
    const QUESTS = [
        {
            id: 'sea-traveler',
            icon: '🌊',
            title: 'Путешествие к морям',
            desc: 'Изучи все водоёмы Марса и стань настоящим мореплавателем',
            category: 'geography',
            reward_xp: 200,
            reward_achievement: 7, // "Мореплаватель"
            steps: [
                { id: 'sea-1', title: 'Найти Ацидалийское море', desc: 'Прочитай статью об Ацидалийском море', check: 'visit', value: 'geography/acidalia-sea' },
                { id: 'sea-2', title: 'Найти море Аргида', desc: 'Прочитай статью о море Аргида', check: 'visit', value: 'geography/argida' },
                { id: 'sea-3', title: 'Изучить воду на Марсе', desc: 'Узнай, откуда на Марсе вода', check: 'visit', value: 'water-on-mars' },
                { id: 'sea-4', title: 'Разобраться в каналах', desc: 'Прочитай о каналах и ирригации', check: 'visit', value: 'technology/canals' }
            ]
        },
        {
            id: 'historian',
            icon: '📜',
            title: 'Путь историка',
            desc: 'Разберись в хронологии Марса — от начала времён до Эпохи Умирания',
            category: 'history',
            reward_xp: 150,
            reward_achievement: 19,
            steps: [
                { id: 'hist-1', title: 'Изучить периодизацию', desc: 'Открой статью о периодах истории', check: 'visit', value: 'history/periodization' },
                { id: 'hist-2', title: 'Пройти по хронологии', desc: 'Открой статью с хронологией событий', check: 'visit', value: 'history/timeline' },
                { id: 'hist-3', title: 'Познать мифы', desc: 'Прочитай мифы древнего Марса', check: 'visit', value: 'history/myths' },
                { id: 'hist-4', title: 'Узнать об Эпохе Умирания', desc: 'Прочитай статью про закат цивилизации', check: 'visit', value: 'history/dying-era' }
            ]
        },
        {
            id: 'astronomer',
            icon: '🔭',
            title: 'Путь астронома',
            desc: 'Познай звёздное небо Марса и его место во Вселенной',
            category: 'astronomy',
            reward_xp: 150,
            reward_achievement: 18,
            steps: [
                { id: 'ast-1', title: 'Изучить спутники', desc: 'Узнай о Фобосе и Деймосе', check: 'visit', value: 'astronomy/phobos-deimos' },
                { id: 'ast-2', title: 'Найти звёздное небо', desc: 'Открой карту звёздного неба Марса', check: 'visit', value: 'astronomy/mars-sky' },
                { id: 'ast-3', title: 'Увидеть Землю', desc: 'Прочитай о Земле как цели', check: 'visit', value: 'astronomy/earth-as-target' }
            ]
        },
        {
            id: 'character-knower',
            icon: '👤',
            title: 'Знакомство с героями',
            desc: 'Узнай всех ключевых персонажей вселенной',
            category: 'people',
            reward_xp: 200,
            reward_achievement: null,
            steps: [
                { id: 'char-1', title: 'Найти Хевсура', desc: 'Прочитай о хранителе знаний', check: 'visit', value: 'people/hevsur' },
                { id: 'char-2', title: 'Встретить Талина', desc: 'Познакомься с молодым астрономом', check: 'visit', value: 'people/talin' },
                { id: 'char-3', title: 'Узнать Йарру', desc: 'Прочитай о мудрой женщине', check: 'visit', value: 'people/yarra' },
                { id: 'char-4', title: 'Познакомиться с Эллой', desc: 'Узнай о могущественной жрице', check: 'visit', value: 'people/ella' },
                { id: 'char-5', title: 'Встретить Алиру', desc: 'Узнай о повелительнице морей', check: 'visit', value: 'people/alira' }
            ]
        },
        {
            id: 'reader',
            icon: '📖',
            title: 'Хранитель знаний',
            desc: 'Прочитай 10 статей энциклопедии — от географии до религии',
            category: 'reading',
            reward_xp: 100,
            reward_achievement: 2,
            steps: [
                { id: 'read-1', title: 'Первые 3 статьи', desc: 'Прочитай 3 любые статьи', check: 'articles_count', value: 3 },
                { id: 'read-2', title: 'Уже 5 статей!', desc: 'Прочитай 5 статей', check: 'articles_count', value: 5 },
                { id: 'read-3', title: 'Половина пути', desc: 'Прочитай 7 статей', check: 'articles_count', value: 7 },
                { id: 'read-4', title: 'Хранитель знаний', desc: 'Прочитай 10 статей', check: 'articles_count', value: 10 }
            ]
        },
        {
            id: 'quiz-master',
            icon: '🧠',
            title: 'Знаток викторин',
            desc: 'Пройди все 4 викторины на любые результаты',
            category: 'quiz',
            reward_xp: 200,
            reward_achievement: 3,
            steps: [
                { id: 'quiz-1', title: 'Первая викторина', desc: 'Пройди 1 викторину', check: 'quizzes_count', value: 1 },
                { id: 'quiz-2', title: 'Две викторины', desc: 'Пройди 2 викторины', check: 'quizzes_count', value: 2 },
                { id: 'quiz-3', title: 'Три викторины', desc: 'Пройди 3 викторины', check: 'quizzes_count', value: 3 },
                { id: 'quiz-4', title: 'Мастер викторин', desc: 'Пройди все 4 викторины', check: 'quizzes_count', value: 4 }
            ]
        },
        {
            id: 'explorer',
            icon: '🗺️',
            title: 'Исследователь Марса',
            desc: 'Посети 15 уникальных мест на карте Марса',
            category: 'exploration',
            reward_xp: 300,
            reward_achievement: 16,
            steps: [
                { id: 'exp-1', title: '5 мест', desc: 'Посети 5 уникальных мест', check: 'places_count', value: 5 },
                { id: 'exp-2', title: '10 мест', desc: 'Посети 10 уникальных мест', check: 'places_count', value: 10 },
                { id: 'exp-3', title: '15 мест', desc: 'Посети 15 уникальных мест', check: 'places_count', value: 15 }
            ]
        },
        {
            id: 'consistent',
            icon: '🔥',
            title: 'Постоянство',
            desc: 'Заходи на сайт 7 дней подряд',
            category: 'streak',
            reward_xp: 250,
            reward_achievement: 9,
            steps: [
                { id: 'str-1', title: '3 дня подряд', desc: 'Заходи 3 дня подряд', check: 'streak', value: 3 },
                { id: 'str-2', title: '5 дней подряд', desc: 'Заходи 5 дней подряд', check: 'streak', value: 5 },
                { id: 'str-3', title: '7 дней подряд', desc: 'Заходи 7 дней подряд', check: 'streak', value: 7 }
            ]
        }
    ];

    const container = document.getElementById('qst-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let profile = null;
    let userStats = {};
    let completedSteps = new Set();
    let completedQuests = new Set();
    let activeFilter = 'all';
    let kingdom = KINGDOMS['Эдем'];

    // ============================================================
    // Загрузка данных
    // ============================================================
    async function loadUserData() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        if (!currentUser) {
            userStats = { articles: 0, places: 0, quizzes: 0, streak: 0, xp: 0, level: 1 };
            return;
        }

        const { data: p } = await client.from('profiles').select('*').eq('user_id', currentUser.id).single();
        profile = p;
        kingdom = KINGDOMS[p?.kingdom] || KINGDOMS['Эдем'];

        // Загружаем статистику
        const { data: visits } = await client.from('user_visits')
            .select('place_id, place_type').eq('user_id', currentUser.id);
        const uniquePlaces = new Set((visits || []).map(v => v.place_id));

        const { data: quizzes } = await client.from('user_quizzes')
            .select('quiz_id').eq('user_id', currentUser.id).eq('passed', true);

        const { data: logins } = await client.from('daily_logins')
            .select('streak').eq('user_id', currentUser.id)
            .order('login_date', { ascending: false }).limit(1);

        userStats = {
            xp: p?.experience || 0,
            level: 1,
            articles: (visits || []).length,
            places: uniquePlaces.size,
            quizzes: (quizzes || []).length,
            streak: logins?.[0]?.streak || 0,
            visitedSlugs: new Set((visits || []).map(v => v.place_id))
        };

        // Загружаем выполненные шаги
        const { data: steps } = await client.from('user_quests_progress')
            .select('quest_id, step_id').eq('user_id', currentUser.id);
        completedSteps = new Set((steps || []).map(s => `${s.quest_id}:${s.step_id}`));

        // Загружаем завершённые квесты
        const { data: quests } = await client.from('user_quests_completed')
            .select('quest_id').eq('user_id', currentUser.id);
        completedQuests = new Set((quests || []).map(q => q.quest_id));
    }

    // ============================================================
    // Проверка шага
    // ============================================================
    function isStepCompleted(quest, step) {
        if (completedSteps.has(`${quest.id}:${step.id}`)) return true;
        if (!currentUser) return false;

        // Проверяем автоматически
        switch (step.check) {
            case 'visit':
                return userStats.visitedSlugs.has(step.value) ||
                       userStats.visitedSlugs.has(step.value.split('/').pop());
            case 'articles_count':
                return userStats.articles >= step.value;
            case 'quizzes_count':
                return userStats.quizzes >= step.value;
            case 'places_count':
                return userStats.places >= step.value;
            case 'streak':
                return userStats.streak >= step.value;
            default:
                return false;
        }
    }

    // ============================================================
    // Сохранение прогресса
    // ============================================================
    async function saveStep(questId, stepId) {
        if (!currentUser) return;
        try {
            await client.from('user_quests_progress').insert({
                user_id: currentUser.id,
                quest_id: questId,
                step_id: stepId
            });
            completedSteps.add(`${questId}:${stepId}`);
        } catch (e) {
            console.warn('Не удалось сохранить шаг:', e);
        }
    }

    async function saveQuestCompleted(questId) {
        if (!currentUser) return;
        try {
            await client.from('user_quests_completed').insert({
                user_id: currentUser.id,
                quest_id: questId
            });
            completedQuests.add(questId);
        } catch (e) {
            console.warn('Не удалось сохранить квест:', e);
        }
    }

    // ============================================================
    // Проверка всех квестов (автовыполнение)
    // ============================================================
    async function checkAllQuests() {
        if (!currentUser) return [];

        const newlyCompleted = [];

        for (const quest of QUESTS) {
            if (completedQuests.has(quest.id)) continue;

            let allDone = true;
            for (const step of quest.steps) {
                const done = isStepCompleted(quest, step);
                if (done && !completedSteps.has(`${quest.id}:${step.id}`)) {
                    await saveStep(quest.id, step.id);
                }
                if (!done) allDone = false;
            }

            if (allDone && !completedQuests.has(quest.id)) {
                await saveQuestCompleted(quest.id);

                // Начисляем XP
                const { data: p } = await client.from('profiles')
                    .select('experience').eq('user_id', currentUser.id).single();
                const newXP = (p?.experience || 0) + quest.reward_xp;
                await client.from('profiles').update({ experience: newXP }).eq('user_id', currentUser.id);

                // Выдаём достижение
                if (quest.reward_achievement) {
                    try {
                        await client.from('user_achievements').insert({
                            user_id: currentUser.id,
                            achievement_id: quest.reward_achievement
                        });
                    } catch (e) { /* уже есть */ }
                }

                newlyCompleted.push(quest);
            }
        }

        return newlyCompleted;
    }

    // ============================================================
    // Уведомление
    // ============================================================
    function showCompletionToast(quest) {
        const toast = document.createElement('div');
        toast.className = 'qst-completed-toast';
        toast.innerHTML = `
            <div class="qst-completed-toast-icon">🎉</div>
            <div>
                <div class="qst-completed-toast-title">Квест завершён!</div>
                <div class="qst-completed-toast-text">${quest.icon} ${quest.title} · +${quest.reward_xp} XP</div>
            </div>
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 600);
        }, 4000);
    }

    // ============================================================
    // Рендер
    // ============================================================
    function render() {
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        const totalQuests = QUESTS.length;
        const doneQuests = QUESTS.filter(q => completedQuests.has(q.id)).length;
        const overallPercent = totalQuests > 0 ? Math.round((doneQuests / totalQuests) * 100) : 0;

        let filtered = [...QUESTS];
        if (activeFilter === 'active') filtered = filtered.filter(q => !completedQuests.has(q.id));
        else if (activeFilter === 'completed') filtered = filtered.filter(q => completedQuests.has(q.id));

        container.innerHTML = `
            <!-- HERO -->
            <div class="qst-hero qst-fade">
                <div class="qst-hero-content">
                    <div class="qst-hero-icon">🗺️</div>
                    <h1 class="qst-hero-title">Квесты Марса</h1>
                    <p class="qst-hero-sub">${currentUser ? 'Проходи цепочки заданий и получай награды!' : 'Войдите, чтобы начать приключение'}</p>
                    <div class="qst-hero-progress">
                        <div class="qst-progress-info">
                            <span>${doneQuests} из ${totalQuests} квестов завершено</span>
                            <span>${overallPercent}%</span>
                        </div>
                        <div class="qst-progress-bar">
                            <div class="qst-progress-fill" style="width: ${overallPercent}%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ФИЛЬТРЫ -->
            <div class="qst-filters qst-fade" style="animation-delay: 0.1s;">
                <button class="qst-filter-btn ${activeFilter==='all'?'active':''}" onclick="qstSetFilter('all')">
                    🌐 Все <span style="opacity:0.7;font-size:0.75rem;">(${totalQuests})</span>
                </button>
                <button class="qst-filter-btn ${activeFilter==='active'?'active':''}" onclick="qstSetFilter('active')">
                    ⚔️ Активные <span style="opacity:0.7;font-size:0.75rem;">(${totalQuests - doneQuests})</span>
                </button>
                <button class="qst-filter-btn ${activeFilter==='completed'?'active':''}" onclick="qstSetFilter('completed')">
                    ✅ Завершённые <span style="opacity:0.7;font-size:0.75rem;">(${doneQuests})</span>
                </button>
            </div>

            <!-- СЕТКА -->
            ${filtered.length === 0 ? `
                <div class="qst-empty">
                    <div class="qst-empty-icon">🔍</div>
                    <div class="qst-empty-title">Здесь пусто</div>
                </div>
            ` : `
                <div class="qst-grid">
                    ${filtered.map((q, i) => renderQuestCard(q, i)).join('')}
                </div>
            `}
        `;
    }

    function renderQuestCard(quest, index) {
        const isCompleted = completedQuests.has(quest.id);
        let doneSteps = 0;
        quest.steps.forEach(s => {
            if (isStepCompleted(quest, s)) doneSteps++;
        });
        const stepPercent = Math.round((doneSteps / quest.steps.length) * 100);

        let statusHTML = '';
        if (isCompleted) {
            statusHTML = `<span class="qst-card-status completed">✅ Завершён</span>`;
        } else if (!currentUser) {
            statusHTML = `<span class="qst-card-status locked">🔒 Войдите</span>`;
        } else if (doneSteps === 0) {
            statusHTML = `<span class="qst-card-status">🆕 Новый</span>`;
        } else {
            statusHTML = `<span class="qst-card-status">⚔️ В процессе</span>`;
        }

        return `
            <div class="qst-card ${isCompleted ? 'completed' : ''} qst-fade" style="animation-delay: ${index * 0.05}s;">
                ${statusHTML}
                <div class="qst-card-header">
                    <div class="qst-card-icon">${quest.icon}</div>
                    <div class="qst-card-header-info">
                        <h3 class="qst-card-title">${quest.title}</h3>
                        <p class="qst-card-desc">${quest.desc}</p>
                    </div>
                </div>

                <div class="qst-steps">
                    ${quest.steps.map(step => {
                        const done = isStepCompleted(quest, step);
                        return `
                            <div class="qst-step ${done ? 'done' : ''}">
                                <div class="qst-step-check">${done ? '✓' : ''}</div>
                                <div class="qst-step-body">
                                    <div class="qst-step-title">${step.title}</div>
                                    <div class="qst-step-desc">${step.desc}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <div class="qst-card-footer">
                    <div class="qst-reward">
                        <span class="qst-reward-badge">💎 +${quest.reward_xp} XP</span>
                        ${quest.reward_achievement ? `<span class="qst-reward-badge ach">🏆 Достижение</span>` : ''}
                    </div>
                    <div class="qst-card-progress">
                        ${doneSteps}/${quest.steps.length} · ${stepPercent}%
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // Экспорт
    // ============================================================
    window.qstSetFilter = function(f) {
        activeFilter = f;
        render();
    };

    // ============================================================
    // Инициализация
    // ============================================================
    async function init() {
        await loadUserData();

        if (currentUser) {
            const newQuests = await checkAllQuests();
            if (newQuests.length > 0) {
                // Обновляем статистику заново
                await loadUserData();
                // Показываем уведомления
                newQuests.forEach((q, i) => {
                    setTimeout(() => showCompletionToast(q), i * 1200);
                });
            }
        }

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
