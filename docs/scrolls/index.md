---
title: Библиотека свитков
comments: false
---

<div id="scr-app" style="max-width: 1000px; margin: 0 auto; font-family: 'Georgia', 'Segoe UI', serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: scrSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Разворачиваем свитки...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
    --parchment: #f5ecd7;
    --parchment-dark: #e8dcb8;
    --ink: #3d2817;
}

@keyframes scrSpin { to { transform: rotate(360deg); } }
@keyframes scrFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scrPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes scrFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes scrSlide { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes scrUnroll {
    0% { transform: scaleY(0); opacity: 0; }
    100% { transform: scaleY(1); opacity: 1; }
}
@keyframes scrInk {
    from { opacity: 0; letter-spacing: 5px; filter: blur(4px); }
    to { opacity: 1; letter-spacing: 0; filter: blur(0); }
}
@keyframes scrGlow {
    0%, 100% { box-shadow: 0 0 30px rgba(243, 156, 18, 0.3); }
    50% { box-shadow: 0 0 60px rgba(243, 156, 18, 0.6); }
}
@keyframes scrDust {
    0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
    100% { transform: translateY(-30px) rotate(180deg); opacity: 0; }
}

.scr-fade { animation: scrFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#scr-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   HERO
   ============================================================ */
.scr-hero {
    position: relative;
    background: linear-gradient(135deg, #4a3728 0%, #6b4f37 50%, #8b6f4a 100%);
    border-radius: 24px;
    padding: 40px 36px;
    color: #f5ecd7;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px -16px rgba(74, 55, 40, 0.5);
}

.scr-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle at 20% 30%, rgba(243, 156, 18, 0.15), transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(243, 156, 18, 0.1), transparent 40%);
    animation: scrFloat 8s ease-in-out infinite;
}

.scr-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.scr-hero-icon {
    font-size: 4rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 8px 20px rgba(243, 156, 18, 0.5));
    animation: scrPulse 3s ease-in-out infinite;
}

.scr-hero-title {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
    color: #f5ecd7;
    font-family: 'Georgia', serif;
}

.scr-hero-sub {
    font-size: 0.95rem;
    opacity: 0.85;
    margin: 0 0 20px 0;
    font-style: italic;
}

.scr-hero-progress {
    max-width: 500px;
    margin: 0 auto;
}

.scr-progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    margin-bottom: 8px;
    opacity: 0.95;
    font-weight: 600;
    color: #f5ecd7;
}

.scr-progress-bar {
    background: rgba(0,0,0,0.3);
    border-radius: 12px;
    height: 14px;
    overflow: hidden;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(243, 156, 18, 0.3);
}

.scr-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #f39c12, #e67e22, #d35400);
    border-radius: 12px;
    transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 20px rgba(243, 156, 18, 0.8);
}

/* ============================================================
   СЕТКА СВИТКОВ
   ============================================================ */
.scr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.scr-card {
    position: relative;
    background: linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%);
    border-radius: 12px;
    padding: 28px 24px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    animation: scrFadeIn 0.5s ease both;
    box-shadow:
        0 4px 12px rgba(74, 55, 40, 0.15),
        inset 0 0 60px rgba(184, 152, 88, 0.1);
    border: 1px solid rgba(139, 111, 74, 0.3);
    display: flex;
    flex-direction: column;
    min-height: 240px;
}

.scr-card::before,
.scr-card::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 12px;
    background: linear-gradient(180deg, #8b6f4a, #6b4f37);
    z-index: 3;
}
.scr-card::before { top: 0; border-radius: 12px 12px 0 0; }
.scr-card::after { bottom: 0; border-radius: 0 0 12px 12px; }

.scr-card:hover {
    transform: translateY(-8px) rotate(-0.5deg);
    box-shadow:
        0 20px 48px -12px rgba(74, 55, 40, 0.4),
        inset 0 0 80px rgba(184, 152, 88, 0.15);
}

.scr-card.read {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border-color: rgba(39, 174, 96, 0.3);
}

.scr-card.read::before,
.scr-card.read::after {
    background: linear-gradient(180deg, #27ae60, #16a085);
}

.scr-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
    margin-top: 8px;
    position: relative;
    z-index: 2;
}

.scr-card-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: linear-gradient(135deg, #8b6f4a, #6b4f37);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #f5ecd7;
    flex-shrink: 0;
    font-family: 'Georgia', serif;
    font-weight: 800;
    box-shadow: 0 4px 12px rgba(74, 55, 40, 0.3);
    transition: transform 0.3s;
}

.scr-card.read .scr-card-icon {
    background: linear-gradient(135deg, #27ae60, #16a085);
}

.scr-card:hover .scr-card-icon {
    transform: scale(1.1) rotate(-6deg);
}

.scr-card-info { flex: 1; min-width: 0; }
.scr-card-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
    font-family: 'Georgia', serif;
}

.scr-card-subtitle {
    font-size: 0.78rem;
    color: #6b4f37;
    font-style: italic;
}

.scr-card-desc {
    font-size: 0.88rem;
    color: #5a4530;
    line-height: 1.5;
    margin: 0 0 16px 0;
    position: relative;
    z-index: 2;
    flex: 1;
    font-style: italic;
}

.scr-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px dashed rgba(139, 111, 74, 0.3);
    position: relative;
    z-index: 2;
}

.scr-card-status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    background: rgba(139, 111, 74, 0.15);
    color: #6b4f37;
}

.scr-card.read .scr-card-status {
    background: rgba(39, 174, 96, 0.15);
    color: #27ae60;
}

.scr-card-time {
    font-size: 0.72rem;
    color: #8b6f4a;
    display: flex;
    align-items: center;
    gap: 4px;
}

/* ============================================================
   МОДАЛКА ЧТЕНИЯ
   ============================================================ */
.scr-reader-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(20, 15, 8, 0.85);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: scrFadeIn 0.3s ease;
    overflow-y: auto;
}

.scr-reader {
    background: linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%);
    border-radius: 16px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    position: relative;
    box-shadow:
        0 40px 100px rgba(0, 0, 0, 0.6),
        inset 0 0 100px rgba(184, 152, 88, 0.15);
    border: 2px solid #8b6f4a;
    animation: scrUnroll 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: top center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.scr-reader::before,
.scr-reader::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(180deg, #8b6f4a, #6b4f37);
    z-index: 5;
}
.scr-reader::before { top: 0; border-radius: 14px 14px 0 0; }
.scr-reader::after { bottom: 0; border-radius: 0 0 14px 14px; }

.scr-reader-header {
    padding: 32px 40px 20px 40px;
    border-bottom: 2px solid rgba(139, 111, 74, 0.3);
    position: relative;
    z-index: 2;
}

.scr-reader-icon {
    font-size: 3rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 4px 8px rgba(74, 55, 40, 0.3));
}

.scr-reader-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 6px 0;
    font-family: 'Georgia', serif;
    letter-spacing: -0.5px;
}

.scr-reader-subtitle {
    font-size: 0.9rem;
    color: #6b4f37;
    font-style: italic;
}

.scr-reader-close {
    position: absolute;
    top: 28px;
    right: 32px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(139, 111, 74, 0.15);
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #6b4f37;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s;
    z-index: 10;
}
.scr-reader-close:hover {
    background: rgba(139, 111, 74, 0.3);
    transform: rotate(90deg);
}

.scr-reader-body {
    padding: 30px 40px;
    overflow-y: auto;
    flex: 1;
    position: relative;
    z-index: 2;
}

.scr-reader-body::-webkit-scrollbar { width: 8px; }
.scr-reader-body::-webkit-scrollbar-thumb {
    background: rgba(139, 111, 74, 0.4);
    border-radius: 4px;
}

.scr-reader-text {
    font-size: 1.05rem;
    line-height: 1.9;
    color: var(--ink);
    font-family: 'Georgia', serif;
    animation: scrInk 1s ease;
}

.scr-reader-text p {
    margin: 0 0 16px 0;
    text-indent: 24px;
}

.scr-reader-text p:first-child {
    text-indent: 0;
}

.scr-reader-text p:first-child::first-letter {
    font-size: 3.5rem;
    float: left;
    line-height: 1;
    margin: 4px 12px 0 0;
    color: #8b6f4a;
    font-weight: 800;
    font-family: 'Georgia', serif;
    text-shadow: 2px 2px 4px rgba(74, 55, 40, 0.3);
}

.scr-reader-text em {
    color: #8b6f4a;
    font-weight: 600;
}

.scr-reader-text strong {
    color: #6b4f37;
    font-weight: 800;
}

.scr-reader-footer {
    padding: 20px 40px 32px 40px;
    border-top: 2px solid rgba(139, 111, 74, 0.3);
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    z-index: 2;
}

.scr-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 30px;
    border: 2px solid #8b6f4a;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
    background: transparent;
    color: #6b4f37;
}

.scr-btn:hover {
    background: #8b6f4a;
    color: #f5ecd7;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(74, 55, 40, 0.3);
}

.scr-btn.primary {
    background: linear-gradient(135deg, #8b6f4a, #6b4f37);
    color: #f5ecd7;
}
.scr-btn.primary:hover {
    box-shadow: 0 8px 24px rgba(74, 55, 40, 0.5);
}

.scr-btn.success {
    background: linear-gradient(135deg, #27ae60, #16a085);
    border-color: #27ae60;
    color: #fff;
}

.scr-reader-progress {
    margin-left: auto;
    font-size: 0.82rem;
    color: #6b4f37;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
}

.scr-reader-progress-bar {
    width: 120px;
    height: 8px;
    background: rgba(139, 111, 74, 0.2);
    border-radius: 4px;
    overflow: hidden;
}

.scr-reader-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #8b6f4a, #6b4f37);
    border-radius: 4px;
    transition: width 0.3s;
}

/* Пылинки */
.scr-dust {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #f39c12;
    border-radius: 50%;
    pointer-events: none;
    animation: scrDust 3s ease-out infinite;
    opacity: 0;
}

/* ПУСТОЕ */
.scr-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, var(--parchment), var(--parchment-dark));
    border-radius: 16px;
    border: 2px dashed rgba(139, 111, 74, 0.3);
}
.scr-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.scr-empty-title { font-size: 1.1rem; font-weight: 700; color: #6b4f37; }

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .scr-reader-body::-webkit-scrollbar-thumb { background: rgba(243, 156, 18, 0.4); }
}

@media (max-width: 600px) {
    .scr-hero { padding: 24px 20px; }
    .scr-hero-title { font-size: 1.5rem; }
    .scr-hero-icon { font-size: 3rem; }
    .scr-grid { grid-template-columns: 1fr; }
    .scr-reader { max-height: 95vh; }
    .scr-reader-header { padding: 24px 22px 16px 22px; }
    .scr-reader-body { padding: 20px 22px; }
    .scr-reader-footer { padding: 16px 22px 26px 22px; }
    .scr-reader-title { font-size: 1.4rem; }
    .scr-reader-text { font-size: 0.98rem; line-height: 1.75; }
    .scr-reader-close { top: 22px; right: 20px; }
    .scr-reader-progress { margin-left: 0; width: 100%; }
    .scr-reader-progress-bar { width: 100%; flex: 1; }
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
    // СВИТКИ ХЕВСУРА (А-З)
    // ============================================================
    const SCROLLS = [
        {
            id: 'a',
            letter: 'А',
            title: 'Свиток Начала',
            subtitle: 'О сотворении Марса',
            icon: '🌌',
            time: '5 мин',
            preview: 'В начале не было ни земли, ни воды — только красная пыль и вечное молчание...',
            content: `
                <p>В начале не было ни земли, ни воды — только <em>красная пыль</em> и вечное молчание. И сказали Древние: «Да будет свет», и зажглись звёзды над будущим Марсом.</p>
                <p>И пала с неба вода, и растеклась по равнинам, и стала <strong>Ākha</strong> — вода. И поднялась из воды земля, и стала <strong>Kōl</strong> — суша. И разделились они навеки, но помнили друг о друге.</p>
                <p>Первые марсиане вышли из воды на берег <em>Ацидалийского моря</em>. Их было двое — Мара и Дзенин. И сказали они: «Мы будем помнить. Глина сохранит нашу память».</p>
                <p>Так началась Эпоха Расцвета. Так был рождён наш народ. Так глина впервые приняла на себя слово.</p>
            `
        },
        {
            id: 'b',
            letter: 'Б',
            title: 'Свиток Королей',
            subtitle: 'О правлении Роген-Арии',
            icon: '👑',
            time: '6 мин',
            preview: 'Двенадцать королевств раскинулись по лику Марса. Каждое со своим гербом, своей рекой, своим небом...',
            content: `
                <p>Двенадцать королевств раскинулись по лику Марса. Каждое со своим гербом, своей рекой, своим небом. И был среди них <strong>Роген-Ария</strong> — сердце нашего мира.</p>
                <p>Король <em>Аратан III</em>, мудрый правитель, собрал в своей библиотеке все свитки древности. Он говорил: «Тот, кто помнит — правит. Тот, кто забыл — раб своей пустоты».</p>
                <p>Но и короли уходят. Уходят, оставляя после себя лишь имена на глине. И имена эти помнят те, кто читает свитки. Помни и ты, исследователь.</p>
            `
        },
        {
            id: 'c',
            letter: 'В',
            title: 'Свиток Морей',
            subtitle: 'О водах Марса',
            icon: '🌊',
            time: '4 мин',
            preview: 'Три великих моря знал наш Марс: Ацидалийское на севере, Аргида на западе...',
            content: `
                <p>Три великих моря знал наш Марс: <strong>Ацидалийское</strong> на севере, <strong>Аргида</strong> на западе, и <strong>Эритрейское</strong> на востоке. И каждое помнило своё.</p>
                <p>Ацидалийское — самое глубокое. Оно отражало два спутника и небо, и было таким синим, что казалось частью космоса.</p>
                <p>Аргида — самое бурное. Волны его разбивались о скалы, и соль оседала на камнях, как слёзы богов.</p>
                <p>Эритрейское — самое тихое. В нём зарождалась жизнь, и первые рыбы Марса учились дышать.</p>
                <p><em>Вода помнит всё, что было. Lān ākha — вода помнит.</em></p>
            `
        },
        {
            id: 'd',
            letter: 'Г',
            title: 'Свиток Войн',
            subtitle: 'О битвах древности',
            icon: '⚔️',
            time: '7 мин',
            preview: 'Не всегда Марс был мирен. Были войны, что делили королевства...',
            content: `
                <p>Не всегда Марс был мирен. Были войны, что делили королевства и разрушали города. Горела <strong>Ксанф-река</strong> отражением пожаров.</p>
                <p>Война Между Королевствами длилась <em>тридцать семь марсианских лет</em>. Она унесла тысячи жизней. И тогда мудрецы собрались в храме Ксанфа и сказали: «Довольно. Мы не можем убивать друг друга — мы братья».</p>
                <p>Так был заключён Великий Мир. Так родилась Академия Окхасена — место, где учат не воевать, а помнить. Помнить о том, что было, чтобы не повторить.</p>
            `
        },
        {
            id: 'e',
            letter: 'Д',
            title: 'Свиток Языка',
            subtitle: 'О письменности и словах',
            icon: '✍️',
            time: '5 мин',
            preview: 'Древние писали на глине заострённой палочкой. Каждый знак — это мысль, ставшая камнем...',
            content: `
                <p>Древние писали на глине <em>заострённой палочкой</em>. Каждый знак — это мысль, ставшая камнем. Каждое слово — память, ставшая вечностью.</p>
                <p>Язык наш гортанный и глубокий, как пещеры Фарсиды. Звуки его — это дыхание самой планеты. Слова — её ветер. Письменность — её дыхание в глине.</p>
                <p><strong>Lān sur</strong> — глина помнит. И мы помним вместе с ней. Пиши. Читай. Говори. Ибо тот, кто говорит — живёт вечно.</p>
                <p>Вот буквы наши: Ākha, Kōl, Dzen, Mar, Khō, Lān. Ими можно сказать всё — от имени звезды до имени смерти.</p>
            `
        },
        {
            id: 'f',
            letter: 'Е',
            title: 'Свиток Пророчеств',
            subtitle: 'О будущем Марса',
            icon: '🌟',
            time: '6 мин',
            preview: 'Грядёт Исход. Не конец — путь. Когда вода уйдёт, жизнь поднимется к звёздам...',
            content: `
                <p>Грядёт <strong>Исход</strong>. Не конец — путь. Когда вода уйдёт, жизнь поднимется к звёздам. Так сказали Древние. Так сказано в глине.</p>
                <p>Тот, кто останется — сохранит память. Тот, кто уйдёт — разнесёт её по вселенной. Оба пути важны. Оба пути верны.</p>
                <p>Придут времена, когда небо над Марсом станет чужим. Когда корабли Земли коснутся нашей пыли. И тогда <em>память</em> станет важнее всего остального.</p>
                <p>Помни: <strong>lān ān mōr</strong> — память не умирает. Помни это, и всё остальное придёт само.</p>
            `
        },
        {
            id: 'g',
            letter: 'Ж',
            title: 'Свиток Детей',
            subtitle: 'О поколениях грядущих',
            icon: '🧒',
            time: '5 мин',
            preview: 'Дети — наше продолжение. Они — новое дыхание древнего народа...',
            content: `
                <p>Дети — наше продолжение. Они — новое дыхание древнего народа. Им мы оставим не только память, но и надежду.</p>
                <p>Каждый ребёнок рождается с глазами, в которых отражается <em>первое небо</em>. Первое, которое видели Мара и Дзенин. Мы учим их писать, читать, помнить. Мы учим их любить Марс.</p>
                <p>Когда мы уйдём, они останутся. И тогда глина, что держала наши слова, перейдёт в их руки. И они будут говорить с ней, как мы говорили.</p>
                <p>Lān sur, дети. Глина помнит. И вы помните.</p>
            `
        },
        {
            id: 'h',
            letter: 'З',
            title: 'Свиток Ухода',
            subtitle: 'О конце Эпохи',
            icon: '🌑',
            time: '8 мин',
            preview: 'Придёт время, когда воздух станет тонким, а вода уйдёт под землю...',
            content: `
                <p>Придёт время, когда воздух станет тонким, а вода уйдёт под землю. Небо изменит цвет, и последние моря превратятся в ледники.</p>
                <p>Тогда мы уйдём. Уйдём как ушли наши предки — с высоко поднятой головой. Уйдём, оставив в глине всё, что нужно.</p>
                <p>Никто не знает, что будет потом. Может быть, вернёмся. Может быть, нет. Но одно мы знаем точно — <em>память наша останется</strong>.</p>
                <p>Она останется в глине. В пещерах Фарсиды. В храмах Ксанфа. В сердце каждого, кто читает эти слова.</p>
                <p>И потому мы не боимся. Мы спокойны. Мы знаем — <strong>lān mōr ān</strong>. Память не умирает.</p>
            `
        }
    ];

    const container = document.getElementById('scr-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let profile = null;
    let kingdom = KINGDOMS['Эдем'];
    let readScrolls = new Set();
    let scrollProgress = {};
    let activeScroll = null;

    // ============================================================
    // Тост
    // ============================================================
    function showToast(msg, type = 'info') {
        const colors = {
            success: 'linear-gradient(135deg,#27ae60,#16a085)',
            info: 'linear-gradient(135deg,#3498db,#2980b9)',
            warning: 'linear-gradient(135deg,#e67e22,#d35400)'
        };
        const t = document.createElement('div');
        t.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:${colors[type]||colors.info};color:#fff;padding:12px 26px;border-radius:30px;font-weight:600;font-size:0.9rem;box-shadow:0 12px 32px rgba(0,0,0,0.3);z-index:99999;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;`;
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(() => { t.style.transform = 'translateX(-50%) translateY(0)'; });
        setTimeout(() => {
            t.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => t.remove(), 400);
        }, 2400);
    }

    // ============================================================
    // Загрузка данных
    // ============================================================
    async function loadData() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        if (!currentUser) return;

        const { data: p } = await client.from('profiles').select('*').eq('user_id', currentUser.id).single();
        profile = p;
        kingdom = KINGDOMS[p?.kingdom] || KINGDOMS['Эдем'];

        const { data: read } = await client.from('user_scrolls_read')
            .select('scroll_id').eq('user_id', currentUser.id);
        readScrolls = new Set((read || []).map(r => r.scroll_id));

        const { data: prog } = await client.from('user_scroll_progress')
            .select('scroll_id, progress').eq('user_id', currentUser.id);
        scrollProgress = {};
        (prog || []).forEach(p => { scrollProgress[p.scroll_id] = p.progress; });
    }

    // ============================================================
    // Действия
    // ============================================================
    async function markAsRead(scrollId) {
        if (!currentUser) return;
        if (readScrolls.has(scrollId)) return;

        try {
            await client.from('user_scrolls_read').insert([{
                user_id: currentUser.id,
                scroll_id: scrollId
            }]);
            readScrolls.add(scrollId);

            // Начисляем XP (+15)
            const { data: p } = await client.from('profiles')
                .select('experience').eq('user_id', currentUser.id).single();
            const newXP = (p?.experience || 0) + 15;
            await client.from('profiles').update({ experience: newXP }).eq('user_id', currentUser.id);

            showToast('📜 Свиток прочитан! +15 XP', 'success');
            render();
        } catch (e) {
            console.warn('Ошибка сохранения:', e);
        }
    }

    async function saveProgress(scrollId, percent) {
        if (!currentUser) return;
        scrollProgress[scrollId] = percent;
        try {
            await client.from('user_scroll_progress').upsert({
                user_id: currentUser.id,
                scroll_id: scrollId,
                progress: percent,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,scroll_id' });
        } catch (e) {}
    }

    // ============================================================
    // Модалка чтения
    // ============================================================
    function openScroll(scroll) {
        activeScroll = scroll;

        const overlay = document.createElement('div');
        overlay.className = 'scr-reader-overlay';
        overlay.innerHTML = `
            <div class="scr-reader" id="scr-reader-modal">
                <button class="scr-reader-close" onclick="scrClose()">✕</button>
                <div class="scr-reader-header">
                    <div class="scr-reader-icon">${scroll.icon}</div>
                    <h2 class="scr-reader-title">Свиток ${scroll.letter} · ${scroll.title}</h2>
                    <p class="scr-reader-subtitle">${scroll.subtitle}</p>
                </div>
                <div class="scr-reader-body" id="scr-reader-body">
                    <div class="scr-reader-text">${scroll.content}</div>
                </div>
                <div class="scr-reader-footer">
                    <button class="scr-btn" onclick="scrClose()">← Закрыть</button>
                    ${currentUser ? `
                        <button class="scr-btn success" onclick="scrMarkRead('${scroll.id}')" id="scr-mark-btn">
                            ${readScrolls.has(scroll.id) ? '✓ Прочитано' : '📖 Отметить как прочитанное'}
                        </button>
                    ` : `
                        <a href="/login/" class="scr-btn primary" style="text-decoration:none;">🔐 Войти для сохранения</a>
                    `}
                    <div class="scr-reader-progress">
                        <span id="scr-progress-text">0%</span>
                        <div class="scr-reader-progress-bar">
                            <div class="scr-reader-progress-fill" id="scr-progress-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Отслеживание прогресса чтения
        const body = overlay.querySelector('#scr-reader-body');
        const fill = overlay.querySelector('#scr-progress-fill');
        const text = overlay.querySelector('#scr-progress-text');

        function updateProgress() {
            const total = body.scrollHeight - body.clientHeight;
            const current = body.scrollTop;
            const percent = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 100;
            fill.style.width = percent + '%';
            text.textContent = percent + '%';

            if (percent > 80 && !readScrolls.has(scroll.id) && currentUser) {
                markAsRead(scroll.id);
                const btn = overlay.querySelector('#scr-mark-btn');
                if (btn) {
                    btn.textContent = '✓ Прочитано';
                    btn.classList.add('success');
                }
            }
        }

        body.addEventListener('scroll', () => {
            const total = body.scrollHeight - body.clientHeight;
            const current = body.scrollTop;
            const percent = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 100;
            fill.style.width = percent + '%';
            text.textContent = percent + '%';

            if (percent > 80 && !readScrolls.has(scroll.id) && currentUser) {
                markAsRead(scroll.id);
                const btn = overlay.querySelector('#scr-mark-btn');
                if (btn) {
                    btn.textContent = '✓ Прочитано';
                    btn.classList.add('success');
                }
            }
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) scrClose();
        });

        // Пылинки
        for (let i = 0; i < 8; i++) {
            const dust = document.createElement('div');
            dust.className = 'scr-dust';
            dust.style.left = Math.random() * 100 + '%';
            dust.style.top = Math.random() * 100 + '%';
            dust.style.animationDelay = Math.random() * 2 + 's';
            overlay.appendChild(dust);
        }

        setTimeout(updateProgress, 100);
    }

    // ============================================================
    // Рендер
    // ============================================================
    function render() {
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');

        const totalScrolls = SCROLLS.length;
        const doneScrolls = readScrolls.size;
        const percent = totalScrolls > 0 ? Math.round((doneScrolls / totalScrolls) * 100) : 0;

        container.innerHTML = `
            <!-- HERO -->
            <div class="scr-hero scr-fade">
                <div class="scr-hero-content">
                    <div class="scr-hero-icon">📜</div>
                    <h1 class="scr-hero-title">Библиотека свитков</h1>
                    <p class="scr-hero-sub">«Lān sur» — глина помнит. Прикоснись к словам Хевсура.</p>
                    <div class="scr-hero-progress">
                        <div class="scr-progress-info">
                            <span>📖 ${doneScrolls} из ${totalScrolls} свитков прочитано</span>
                            <span>${percent}%</span>
                        </div>
                        <div class="scr-progress-bar">
                            <div class="scr-progress-fill" style="width: ${percent}%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- СЕТКА -->
            <div class="scr-grid">
                ${SCROLLS.map((s, i) => {
                    const isRead = readScrolls.has(s.id);
                    return `
                        <div class="scr-card ${isRead ? 'read' : ''} scr-fade" style="animation-delay: ${i * 0.05}s;" onclick="scrOpen('${s.id}')">
                            <div class="scr-card-header">
                                <div class="scr-card-icon">${s.letter}</div>
                                <div class="scr-card-info">
                                    <h3 class="scr-card-title">${s.title}</h3>
                                    <div class="scr-card-subtitle">${s.subtitle}</div>
                                </div>
                            </div>
                            <p class="scr-card-desc">${s.preview}</p>
                            <div class="scr-card-footer">
                                <span class="scr-card-status">${isRead ? '✓ Прочитано' : '📖 Не прочитано'}</span>
                                <span class="scr-card-time">⏱️ ${s.time}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            ${!currentUser ? `
                <div class="scr-empty">
                    <div class="scr-empty-icon">🔐</div>
                    <div class="scr-empty-title">Войдите, чтобы сохранять прогресс</div>
                    <a href="/login/" class="scr-btn primary" style="margin-top:16px;display:inline-block;text-decoration:none;">Войти</a>
                </div>
            ` : ''}
        `;
    }

    // ============================================================
    // Экспорт
    // ============================================================
    window.scrOpen = function(id) {
        const scroll = SCROLLS.find(s => s.id === id);
        if (scroll) openScroll(scroll);
    };

    window.scrClose = function() {
        const overlay = document.querySelector('.scr-reader-overlay');
        if (overlay) {
            overlay.style.animation = 'scrFadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 250);
        }
        activeScroll = null;
    };

    window.scrMarkRead = async function(id) {
        await markAsRead(id);
        const btn = document.getElementById('scr-mark-btn');
        if (btn) {
            btn.textContent = '✓ Прочитано';
            btn.classList.add('success');
        }
    };

    // Esc для закрытия
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.scrClose();
    });

    // ============================================================
    // Инициализация
    // ============================================================
    async function init() {
        await loadData();
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
