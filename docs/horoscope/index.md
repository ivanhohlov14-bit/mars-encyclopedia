---
title: Гороскоп
comments: false
---

<div id="hor-app" style="max-width: 900px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: horSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Читаем звёзды...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes horSpin { to { transform: rotate(360deg); } }
@keyframes horFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes horPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes horFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes horGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(108,99,255,0.3); }
    50% { box-shadow: 0 0 40px rgba(108,99,255,0.6); }
}
@keyframes horStars {
    0% { transform: translateY(0); opacity: 0.7; }
    100% { transform: translateY(-20px); opacity: 0; }
}
@keyframes horReveal {
    0% { opacity: 0; transform: scale(0.9) rotate(-5deg); }
    100% { opacity: 1; transform: scale(1) rotate(0); }
}
@keyframes horShine {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.hor-fade { animation: horFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#hor-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   HERO
   ============================================================ */
.hor-hero {
    position: relative;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    border-radius: 24px;
    padding: 40px 36px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px -16px rgba(0,0,0,0.5);
    min-height: 200px;
}

.hor-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(2px 2px at 20% 30%, #fff, transparent),
        radial-gradient(1px 1px at 40% 70%, #fff, transparent),
        radial-gradient(1.5px 1.5px at 60% 20%, #fff, transparent),
        radial-gradient(1px 1px at 80% 60%, #fff, transparent),
        radial-gradient(2px 2px at 90% 40%, #fff, transparent),
        radial-gradient(1px 1px at 10% 80%, #fff, transparent),
        radial-gradient(1.5px 1.5px at 50% 90%, #fff, transparent),
        radial-gradient(1px 1px at 30% 10%, #fff, transparent);
    opacity: 0.6;
    animation: horFloat 6s ease-in-out infinite;
}

.hor-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.hor-hero-icon {
    font-size: 4rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 8px 20px rgba(108,99,255,0.6));
    animation: horPulse 3s ease-in-out infinite;
}

.hor-hero-title {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #fff, #a29bfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hor-hero-sub {
    font-size: 0.95rem;
    opacity: 0.85;
    margin: 0 0 16px 0;
}

.hor-date-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    border-radius: 30px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.5px;
}

/* ============================================================
   ВЫБОР ЗНАКА
   ============================================================ */
.hor-signs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
}

.hor-sign {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 2px solid transparent;
    padding: 16px 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    position: relative;
    overflow: hidden;
}

.hor-sign::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: var(--sign-color, var(--kingdom-color));
    opacity: 0;
    transition: opacity 0.3s;
}

.hor-sign:hover {
    transform: translateY(-6px);
    border-color: var(--sign-color, var(--kingdom-color));
    box-shadow: 0 16px 40px -8px rgba(0,0,0,0.15);
}

.hor-sign.active {
    border-color: var(--sign-color, var(--kingdom-color));
    background: linear-gradient(135deg, rgba(108,99,255,0.08), rgba(255,255,255,0.95));
    box-shadow: 0 12px 32px -8px var(--kingdom-shadow);
}

.hor-sign.active::before { opacity: 1; }

.hor-sign-icon {
    font-size: 2.2rem;
    margin-bottom: 6px;
    display: block;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
    transition: transform 0.3s;
}

.hor-sign:hover .hor-sign-icon {
    transform: scale(1.2) rotate(-8deg);
}

.hor-sign-name {
    font-size: 0.82rem;
    font-weight: 800;
    color: #1a1a1a;
    letter-spacing: -0.2px;
    margin-bottom: 2px;
}

.hor-sign-dates {
    font-size: 0.68rem;
    color: #888;
    font-weight: 600;
}

/* ============================================================
   ГОРОСКОП
   ============================================================ */
.hor-result {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(16px);
    border-radius: 24px;
    border: 2px solid var(--kingdom-color);
    padding: 32px 28px;
    margin-bottom: 24px;
    box-shadow: 0 20px 60px -16px var(--kingdom-shadow);
    position: relative;
    overflow: hidden;
    animation: horReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.hor-result::before {
    content: '';
    position: absolute;
    top: -50%; right: -20%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, var(--kingdom-color), transparent 70%);
    opacity: 0.05;
    border-radius: 50%;
    animation: horFloat 8s ease-in-out infinite;
}

.hor-result-header {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px dashed rgba(0,0,0,0.08);
}

.hor-result-icon {
    font-size: 3.5rem;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
}

.hor-result-info { flex: 1; min-width: 0; }
.hor-result-sign {
    font-size: 1.4rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 4px 0;
    letter-spacing: -0.4px;
}
.hor-result-date {
    font-size: 0.82rem;
    color: #888;
    font-weight: 600;
}

.hor-result-text {
    position: relative;
    z-index: 2;
    font-size: 1.05rem;
    line-height: 1.8;
    color: #333;
    font-style: italic;
    padding: 4px 0 20px 0;
    border-left: 4px solid var(--kingdom-color);
    padding-left: 20px;
    margin-left: 4px;
}

.hor-result-footer {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 20px;
    border-top: 2px dashed rgba(0,0,0,0.08);
}

.hor-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 30px;
    border: 2px solid transparent;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
    background: var(--kingdom-color);
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
}

.hor-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px -6px var(--kingdom-shadow);
}

.hor-btn.outline {
    background: transparent;
    color: var(--kingdom-color);
    border-color: var(--kingdom-color);
    box-shadow: none;
}

.hor-btn.outline:hover {
    background: var(--kingdom-color);
    color: #fff;
}

.hor-btn.success {
    background: linear-gradient(135deg, #27ae60, #16a085);
    box-shadow: 0 6px 16px -4px rgba(39,174,96,0.4);
}

/* ============================================================
   ПРОГНОЗ НА НЕДЕЛЮ
   ============================================================ */
.hor-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    margin-bottom: 24px;
}

.hor-day {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 14px 8px;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.25s;
    cursor: pointer;
}

.hor-day:hover {
    transform: translateY(-4px);
    border-color: var(--kingdom-color);
    box-shadow: 0 8px 20px -6px var(--kingdom-shadow);
}

.hor-day.today {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    border-color: var(--kingdom-color);
    box-shadow: 0 8px 20px -4px var(--kingdom-shadow);
}

.hor-day.today .hor-day-name { color: #fff; }
.hor-day.today .hor-day-icon { filter: none; }

.hor-day-name {
    font-size: 0.7rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-weight: 700;
    margin-bottom: 6px;
}

.hor-day-icon {
    font-size: 1.4rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    margin-bottom: 4px;
}

.hor-day-num {
    font-size: 0.9rem;
    font-weight: 800;
}

/* ============================================================
   СЕКЦИЯ КАЧЕСТВ ДНЯ
   ============================================================ */
.hor-qualities {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
}

.hor-quality {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    padding: 16px;
    text-align: center;
    border: 2px solid rgba(0,0,0,0.05);
    transition: all 0.3s;
}

.hor-quality:hover {
    transform: translateY(-4px);
    border-color: var(--kingdom-color);
}

.hor-quality-icon {
    font-size: 1.6rem;
    margin-bottom: 6px;
}

.hor-quality-label {
    font-size: 0.72rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-weight: 700;
    margin-bottom: 4px;
}

.hor-quality-value {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--kingdom-color);
}

/* ============================================================
   СЕКЦИЯ ЗАГОЛОВКОВ
   ============================================================ */
.hor-section-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* ============================================================
   ИСТОРИЯ
   ============================================================ */
.hor-history-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 18px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
    margin-bottom: 10px;
    transition: all 0.25s;
    cursor: pointer;
}

.hor-history-item:hover {
    transform: translateX(6px);
    border-color: var(--kingdom-color);
    box-shadow: 0 8px 20px -6px var(--kingdom-shadow);
}

.hor-history-icon {
    font-size: 2rem;
    flex-shrink: 0;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
}

.hor-history-body { flex: 1; min-width: 0; }
.hor-history-date {
    font-size: 0.78rem;
    color: #888;
    font-weight: 700;
    margin-bottom: 4px;
}
.hor-history-text {
    font-size: 0.88rem;
    color: #555;
    line-height: 1.5;
    font-style: italic;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.hor-history-sign {
    font-size: 0.7rem;
    padding: 3px 10px;
    border-radius: 10px;
    background: rgba(108,99,255,0.12);
    color: var(--kingdom-color);
    font-weight: 700;
    white-space: nowrap;
}

/* ============================================================
   ПУСТОЕ
   ============================================================ */
.hor-empty {
    text-align: center;
    padding: 40px 20px;
    color: #888;
}
.hor-empty-icon { font-size: 3rem; opacity: 0.5; margin-bottom: 12px; }

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .hor-sign, .hor-result, .hor-day, .hor-quality, .hor-history-item {
        background: rgba(30, 30, 46, 0.9);
    }
    .hor-sign-name, .hor-result-sign, .hor-section-title { color: #e0e0e0; }
    .hor-result-text { color: #c0c0d0; }
    .hor-history-text { color: #aaa; }
    .hor-result { border-color: var(--kingdom-light); }
}

@media (max-width: 600px) {
    .hor-hero { padding: 24px 20px; }
    .hor-hero-title { font-size: 1.5rem; }
    .hor-hero-icon { font-size: 3rem; }
    .hor-result { padding: 24px 20px; }
    .hor-result-text { font-size: 0.98rem; }
    .hor-week { grid-template-columns: repeat(7, 1fr); gap: 4px; }
    .hor-day { padding: 10px 4px; }
    .hor-day-name { font-size: 0.6rem; }
    .hor-day-icon { font-size: 1.1rem; }
    .hor-day-num { font-size: 0.78rem; }
    .hor-signs-grid { grid-template-columns: repeat(2, 1fr); }
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
    // 8 ЗНАКОВ МАРСИАНСКОГО ЗОДИАКА
    // ============================================================
    const SIGNS = [
        {
            id: 'akha-dzen',
            name: 'Ākha-dzen',
            ru: 'Водная Звезда',
            icon: '🌊',
            dates: 'Пробуждение',
            color: '#3498db',
            element: 'Вода',
            months: [0, 1] // Ākha-dzen, Kōl-khan
        },
        {
            id: 'dzen-akha',
            name: 'Dzen-ākha',
            ru: 'Звёздная Вода',
            icon: '💧',
            dates: 'Цветение',
            color: '#1abc9c',
            element: 'Вода',
            months: [2, 3]
        },
        {
            id: 'mar-dzen',
            name: 'Mar-dzen',
            ru: 'Жизнь-Звезда',
            icon: '🌟',
            dates: 'Зной',
            color: '#e74c3c',
            element: 'Огонь',
            months: [4, 5]
        },
        {
            id: 'zal-akha',
            name: 'Zal-ākha',
            ru: 'Ветряная Вода',
            icon: '🌪️',
            dates: 'Ветры',
            color: '#95a5a6',
            element: 'Воздух',
            months: [6, 7]
        },
        {
            id: 'kol-ghar',
            name: 'Kōl-ghar',
            ru: 'Каменная Земля',
            icon: '⛰️',
            dates: 'Угасание',
            color: '#7f8c8d',
            element: 'Земля',
            months: [8, 9]
        },
        {
            id: 'dzen-kol',
            name: 'Dzen-kōl',
            ru: 'Звёздная Земля',
            icon: '🏔️',
            dates: 'Заморозки',
            color: '#34495e',
            element: 'Земля',
            months: [10, 11]
        },
        {
            id: 'lan-sen',
            name: 'Lān-sen',
            ru: 'Место Памяти',
            icon: '🕯️',
            dates: 'Тьма',
            color: '#8e44ad',
            element: 'Дух',
            months: [12, 13, 14]
        },
        {
            id: 'kol-suf',
            name: 'Kōl-suf',
            ru: 'Великая Земля',
            icon: '❄️',
            dates: 'Ледяной покров',
            color: '#5dade2',
            element: 'Лёд',
            months: [15, 16, 17, 18, 19, 20, 21]
        }
    ];

    // ============================================================
    // БАЗА ПРЕДСКАЗАНИЙ (комбинируются)
    // ============================================================
    const PROPHECY_PARTS = {
        opening: [
            'Звёзды сегодня шепчут о переменах',
            'Хевсур видел знак в глиняных табличках',
            'Древние камни Фарсиды заговорили',
            'Ветер с Ацидалийского моря принёс весть',
            'Красная пыль кружится в танце судьбы',
            'Луна Фобос замерла над горизонтом',
            'Луна Деймос скрылась за облаком',
            'Река Ксанф поёт древнюю песню',
            'Тени в пещерах стали длиннее',
            'Звёздное небо сегодня ярче обычного'
        ],
        middle: [
            'день подходит для изучения древних свитков',
            'хорошее время для поиска новых знаний',
            'твой путь лежит через неизведанные земли',
            'память предков подскажет верное решение',
            'лучше слушать, чем говорить',
            'не бойся задавать вопросы',
            'доверься интуиции — она ведёт к истине',
            'встреча с мудрым человеком изменит твой взгляд',
            'небольшое путешествие принесёт большую пользу',
            'найди время для размышлений в тишине',
            'твоё любопытство будет вознаграждено',
            'удели внимание старым записям',
            'новая статья откроет забытую истину',
            'сделай первый шаг — остальное придёт'
        ],
        warning: [
            'но берегись поспешных решений',
            'однако не забывай о равновесии',
            'но помни: слово имеет силу',
            'и всё же не теряй бдительности',
            'но помни о тех, кто рядом',
            'однако помни о своём королевстве',
            'но не забывай о прошлом',
            'но следи за знаками судьбы'
        ],
        closing: [
            'Lān sur — глина помнит, и ты помнишь.',
            'Да ведёт тебя звезда Марса.',
            'И да хранит тебя память предков.',
            'Пусть глина сохранит твой путь.',
            'Пусть звёзды осветят дорогу.',
            'Помни: даже камень дышит.',
            'Огонь горит для тех, кто смотрит.',
            'Вода помнит всё, что было.',
            'Пусть твой путь будет ясен.',
            'Иди с миром, исследователь.'
        ]
    };

    // ============================================================
    // ГЕНЕРАЦИЯ ГОРОСКОПА (детерминированная по дате + знаку)
    // ============================================================
    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash | 0;
        }
        return Math.abs(hash);
    }

    function generateHoroscope(signId, dateKey) {
        const seed = hashCode(signId + dateKey);
        const p1 = PROPHECY_PARTS.opening[seed % PROPHECY_PARTS.opening.length];
        const p2 = PROPHECY_PARTS.middle[(seed >> 3) % PROPHECY_PARTS.middle.length];
        const p3 = PROPHECY_PARTS.warning[(seed >> 6) % PROPHECY_PARTS.warning.length];
        const p4 = PROPHECY_PARTS.closing[(seed >> 9) % PROPHECY_PARTS.closing.length];
        return `${p1} — ${p2}, ${p3}. ${p4}`;
    }

    // Качества дня
    function generateQualities(seed) {
        const luck = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'][seed % 5];
        const mood = ['Спокойствие', 'Вдохновение', 'Размышление', 'Действие', 'Мудрость', 'Смелость'][(seed >> 2) % 6];
        const color = ['Красный', 'Синий', 'Золотой', 'Серебряный', 'Зелёный', 'Фиолетовый'][(seed >> 4) % 6];
        const number = (seed % 9) + 1;
        return { luck, mood, color, number };
    }

    // ============================================================
    // МАРСИАНСКАЯ ДАТА
    // ============================================================
    function getMartianDate() {
        const months = [
            'Ākha-dzen', 'Kōl-khan', 'Dzen-ākha', 'Khōsen',
            'Mar-dzen', 'Ariya-mar', 'Zal-ākha', 'Thal-khō',
            'Kōl-ghar', 'Mōr-ākha', 'Dzen-kōl', 'Xal-mar',
            'Lān-sen', 'Khō-mōr', 'Ākha-mōr', 'Kōl-suf',
            'Dzen-thal', 'Ghōl-ākha', 'Rōg-ari', 'Mar-lān',
            'Ksanf-suf', 'Yar-okh'
        ];
        const days = [31, 30, 32, 31, 33, 30, 31, 32, 29, 31, 30, 28, 29, 31, 32, 33, 31, 30, 29, 31, 32, 33];
        const MD = days.reduce((s, d) => s + d, 0);
        const EY = 668.6;
        const now = new Date();
        const daysFrom = (now - new Date(2026, 0, 1)) / 86400000;
        const years = daysFrom / EY;
        const year = Math.floor(3798000000 + 2740 + years);
        const dayOfYear = Math.floor((daysFrom * (MD / EY)) % MD);
        let rem = dayOfYear, mi = 0;
        for (let i = 0; i < days.length; i++) {
            if (rem < days[i]) { mi = i; break; }
            rem -= days[i];
        }
        return { year: year.toLocaleString(), month: months[mi], day: rem + 1, monthIndex: mi };
    }

    // ============================================================
    // Основная логика
    // ============================================================
    const container = document.getElementById('hor-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let profile = null;
    let kingdom = KINGDOMS['Эдем'];
    let activeSign = null;
    let history = [];

    function todayKey() {
        return new Date().toISOString().slice(0, 10);
    }

    function getSignForDate(monthIndex) {
        return SIGNS.find(s => s.months.includes(monthIndex)) || SIGNS[0];
    }

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

    async function loadHistory() {
        if (!currentUser) return [];
        const { data } = await client.from('horoscope_history')
            .select('*').eq('user_id', currentUser.id)
            .order('saved_at', { ascending: false }).limit(10);
        return data || [];
    }

    async function saveHoroscope(sign, text) {
        if (!currentUser) { showToast('Войдите, чтобы сохранять', 'warning'); return; }
        const dayKey = todayKey();
        try {
            await client.from('horoscope_history').upsert({
                user_id: currentUser.id,
                sign: sign.id,
                horoscope_text: text,
                day_key: dayKey,
                saved_at: new Date().toISOString()
            }, { onConflict: 'user_id,day_key' });
            history = await loadHistory();
            showToast('✅ Сохранено в историю', 'success');
            render();
        } catch (e) {
            showToast('Уже сохранено сегодня', 'warning');
        }
    }

    async function saveFavoriteSign(sign) {
        if (!currentUser) { showToast('Войдите, чтобы сохранить', 'warning'); return; }
        try {
            await client.from('profiles').update({ zodiac_sign: sign.id }).eq('user_id', currentUser.id);
            showToast(`✅ ${sign.icon} ${sign.ru} — теперь ваш знак`, 'success');
        } catch (e) {
            showToast('Ошибка сохранения', 'warning');
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('📋 Скопировано!', 'success');
        }).catch(() => showToast('Не удалось скопировать', 'warning'));
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

        const martian = getMartianDate();
        const defaultSign = getSignForDate(martian.monthIndex);
        if (!activeSign) activeSign = defaultSign;

        const dayKey = todayKey();
        const horoscopeText = generateHoroscope(activeSign.id, dayKey);
        const seed = hashCode(activeSign.id + dayKey);
        const qualities = generateQualities(seed);

        // 7 дней
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            weekDays.push({
                date: d,
                isToday: i === 0,
                name: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][d.getDay()]
            });
        }

        container.innerHTML = `
            <!-- HERO -->
            <div class="hor-hero hor-fade">
                <div class="hor-hero-content">
                    <div class="hor-hero-icon">🔮</div>
                    <h1 class="hor-hero-title">Марсианский гороскоп</h1>
                    <p class="hor-hero-sub">Прочитай знаки звёзд — узнай свою судьбу</p>
                    <div class="hor-date-badge">
                        ✨ ${martian.month} · ${martian.day}-й день · Год ${martian.year} Э.О.
                    </div>
                </div>
            </div>

            <!-- ВЫБОР ЗНАКА -->
            <h3 class="hor-section-title hor-fade">🌌 Выберите знак</h3>
            <div class="hor-signs-grid hor-fade" style="animation-delay: 0.1s;">
                ${SIGNS.map(s => `
                    <div class="hor-sign ${activeSign.id===s.id?'active':''}" style="--sign-color: ${s.color};" onclick="horSelectSign('${s.id}')">
                        <span class="hor-sign-icon">${s.icon}</span>
                        <div class="hor-sign-name">${s.ru}</div>
                        <div class="hor-sign-dates">${s.dates}</div>
                    </div>
                `).join('')}
            </div>

            <!-- ГОРОСКОП -->
            <div class="hor-result">
                <div class="hor-result-header">
                    <div class="hor-result-icon">${activeSign.icon}</div>
                    <div class="hor-result-info">
                        <h3 class="hor-result-sign">${activeSign.name} — ${activeSign.ru}</h3>
                        <div class="hor-result-date">
                            ${martian.day}-й день ${martian.month} · Стихия: ${activeSign.element}
                            ${activeSign.id === defaultSign.id ? ' · <span style="color: var(--kingdom-color); font-weight: 800;">★ Ваш знак по дате</span>' : ''}
                        </div>
                    </div>
                </div>
                <div class="hor-result-text">«${horoscopeText}»</div>
                <div class="hor-result-footer">
                    <button class="hor-btn" onclick="horCopy(\`${horoscopeText.replace(/`/g,'\\`')}\`)">📋 Скопировать</button>
                    <button class="hor-btn outline" onclick="horSaveFavorite()">⭐ Сделать любимым</button>
                    ${currentUser ? `<button class="hor-btn success" onclick="horSaveHistory()">💾 Сохранить в историю</button>` : `
                        <a href="/login/" class="hor-btn outline" style="text-decoration:none;">🔐 Войти для сохранения</a>
                    `}
                </div>
            </div>

            <!-- КАЧЕСТВА ДНЯ -->
            <h3 class="hor-section-title hor-fade">✨ Качества дня</h3>
            <div class="hor-qualities hor-fade" style="animation-delay: 0.15s;">
                <div class="hor-quality">
                    <div class="hor-quality-icon">🍀</div>
                    <div class="hor-quality-label">Удача</div>
                    <div class="hor-quality-value">${qualities.luck}</div>
                </div>
                <div class="hor-quality">
                    <div class="hor-quality-icon">🎭</div>
                    <div class="hor-quality-label">Настроение</div>
                    <div class="hor-quality-value">${qualities.mood}</div>
                </div>
                <div class="hor-quality">
                    <div class="hor-quality-icon">🎨</div>
                    <div class="hor-quality-label">Цвет дня</div>
                    <div class="hor-quality-value">${qualities.color}</div>
                </div>
                <div class="hor-quality">
                    <div class="hor-quality-icon">🔢</div>
                    <div class="hor-quality-label">Число дня</div>
                    <div class="hor-quality-value">${qualities.number}</div>
                </div>
            </div>

            <!-- НЕДЕЛЯ -->
            <h3 class="hor-section-title hor-fade">📅 Прогноз на неделю</h3>
            <div class="hor-week hor-fade" style="animation-delay: 0.2s;">
                ${weekDays.map(d => {
                    const dKey = d.date.toISOString().slice(0, 10);
                    const dSeed = hashCode(activeSign.id + dKey);
                    const icon = ['✨','🌟','⭐','💫','🌠','☄️','🌙'][dSeed % 7];
                    return `
                        <div class="hor-day ${d.isToday ? 'today' : ''}" title="${generateHoroscope(activeSign.id, dKey).substring(0, 80)}...">
                            <div class="hor-day-name">${d.name}</div>
                            <div class="hor-day-icon">${icon}</div>
                            <div class="hor-day-num">${d.date.getDate()}</div>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- ИСТОРИЯ -->
            ${currentUser ? `
                <h3 class="hor-section-title hor-fade">📚 История гороскопов</h3>
                ${history.length === 0 ? `
                    <div class="hor-empty">
                        <div class="hor-empty-icon">📭</div>
                        <p>Пока нет сохранённых гороскопов</p>
                    </div>
                ` : `
                    <div class="hor-fade" style="animation-delay: 0.25s;">
                        ${history.map(h => {
                            const sign = SIGNS.find(s => s.id === h.sign) || SIGNS[0];
                            return `
                                <div class="hor-history-item" onclick="horSelectSign('${h.sign}')">
                                    <div class="hor-history-icon">${sign.icon}</div>
                                    <div class="hor-history-body">
                                        <div class="hor-history-date">📅 ${new Date(h.saved_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                        <div class="hor-history-text">${h.horoscope_text}</div>
                                    </div>
                                    <div class="hor-history-sign">${sign.ru}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            ` : ''}
        `;
    }

    // ============================================================
    // Экспорт
    // ============================================================
    window.horSelectSign = function(id) {
        activeSign = SIGNS.find(s => s.id === id) || SIGNS[0];
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.horCopy = function(text) {
        copyToClipboard(text);
    };

    window.horSaveFavorite = function() {
        saveFavoriteSign(activeSign);
    };

    window.horSaveHistory = function() {
        const text = generateHoroscope(activeSign.id, todayKey());
        saveHoroscope(activeSign, text);
    };

    // ============================================================
    // Инициализация
    // ============================================================
    async function init() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        if (currentUser) {
            const { data: p } = await client.from('profiles').select('*').eq('user_id', currentUser.id).single();
            profile = p;
            kingdom = KINGDOMS[p?.kingdom] || KINGDOMS['Эдем'];
            history = await loadHistory();

            // Если у пользователя есть любимый знак — показываем его
            if (p?.zodiac_sign) {
                const found = SIGNS.find(s => s.id === p.zodiac_sign);
                if (found) activeSign = found;
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
