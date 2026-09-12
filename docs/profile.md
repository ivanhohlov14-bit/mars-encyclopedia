---
title: Мой профиль
comments: false
---

<div id="profile-app" style="max-width: 1000px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: pfSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка профиля...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes pfSpin { to { transform: rotate(360deg); } }
@keyframes pfFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pfPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes pfFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes pfSlideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }

.pf-fade { animation: pfFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#profile-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   HERO-БЛОК (главная карточка профиля)
   ============================================================ */
.pf-hero {
    position: relative;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    border-radius: 24px;
    padding: 36px 32px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 20px 60px -12px var(--kingdom-shadow);
}

.pf-hero::before {
    content: '';
    position: absolute;
    top: -60%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
    border-radius: 50%;
    animation: pfFloat 8s ease-in-out infinite;
}

.pf-hero::after {
    content: '';
    position: absolute;
    bottom: -60%; left: -10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);
    border-radius: 50%;
    animation: pfFloat 10s ease-in-out infinite reverse;
}

.pf-hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
}

.pf-avatar-wrap {
    position: relative;
    flex-shrink: 0;
    animation: pfPulse 3s ease-in-out infinite;
}

.pf-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid rgba(255,255,255,0.4);
    object-fit: cover;
    background: #fff;
    box-shadow: 0 12px 32px rgba(0,0,0,0.2);
}

.pf-level-badge {
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.95);
    color: var(--kingdom-color);
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 800;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border: 2px solid rgba(255,255,255,0.5);
}

.pf-info {
    flex: 1;
    min-width: 200px;
}

.pf-name {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 6px 0;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    letter-spacing: -0.5px;
}

.pf-role-badge {
    background: linear-gradient(135deg, #f39c12, #e67e22);
    color: #fff;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(243, 156, 18, 0.4);
}

.pf-email {
    font-size: 0.9rem;
    opacity: 0.85;
    margin: 0 0 16px 0;
}

.pf-stats-row {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 16px;
}

.pf-stat-mini {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.pf-stat-mini .pf-sm-label {
    font-size: 0.72rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 600;
}

.pf-stat-mini .pf-sm-value {
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: -0.5px;
}

.pf-progress {
    background: rgba(255,255,255,0.2);
    border-radius: 12px;
    height: 12px;
    overflow: hidden;
    position: relative;
    backdrop-filter: blur(8px);
    margin-bottom: 6px;
}

.pf-progress-bar {
    height: 100%;
    background: #fff;
    border-radius: 12px;
    transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 12px rgba(255,255,255,0.6);
}

.pf-progress-text {
    font-size: 0.78rem;
    opacity: 0.9;
}

/* ============================================================
   БЫСТРЫЕ ССЫЛКИ (плитки)
   ============================================================ */
.pf-quick-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 28px;
}

.pf-quick-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 22px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    border: 2px solid transparent;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.pf-quick-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, var(--kingdom-color) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 0;
}

.pf-quick-card:hover {
    transform: translateY(-6px);
    border-color: var(--kingdom-color);
    box-shadow: 0 16px 40px -8px var(--kingdom-shadow);
}

.pf-quick-card:hover::before { opacity: 0.08; }

.pf-quick-card > * { position: relative; z-index: 1; }

.pf-quick-icon {
    font-size: 2.2rem;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
    transition: transform 0.3s;
}

.pf-quick-card:hover .pf-quick-icon {
    transform: scale(1.2) rotate(-8deg);
}

.pf-quick-body { flex: 1; min-width: 0; }
.pf-quick-title {
    font-size: 1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2px;
}
.pf-quick-desc {
    font-size: 0.75rem;
    color: #888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ============================================================
   ВКЛАДКИ
   ============================================================ */
.pf-tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 20px;
    overflow-x: auto;
    padding: 6px;
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid rgba(0,0,0,0.05);
}

.pf-tabs::-webkit-scrollbar { height: 4px; }
.pf-tabs::-webkit-scrollbar-thumb { background: var(--kingdom-color); border-radius: 2px; }

.pf-tab {
    flex-shrink: 0;
    padding: 10px 20px;
    border: none;
    background: transparent;
    color: #666;
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.25s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
}

.pf-tab:hover {
    background: rgba(0,0,0,0.04);
    color: #333;
}

.pf-tab.active {
    background: var(--kingdom-color);
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
}

.pf-tab-content {
    display: none;
    animation: pfFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.pf-tab-content.active { display: block; }

/* ============================================================
   КАРТОЧКИ
   ============================================================ */
.pf-card {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    border: 1px solid rgba(0,0,0,0.06);
    padding: 24px 28px;
    margin-bottom: 20px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    transition: box-shadow 0.3s, transform 0.3s;
}

.pf-card:hover {
    box-shadow: 0 12px 32px -8px var(--kingdom-shadow);
}

.pf-card-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.pf-card-title .pf-ct-icon {
    font-size: 1.5rem;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
}

/* Кнопки */
.pf-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 30px;
    border: 2px solid var(--kingdom-color);
    background: var(--kingdom-color);
    color: #fff;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
}

.pf-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -4px var(--kingdom-shadow);
}

.pf-btn-outline {
    background: transparent;
    color: var(--kingdom-color);
}

.pf-btn-outline:hover {
    background: var(--kingdom-color);
    color: #fff;
}

.pf-btn-danger {
    background: #e74c3c;
    border-color: #e74c3c;
}

.pf-btn-danger:hover {
    box-shadow: 0 8px 20px -4px rgba(231, 76, 60, 0.4);
}

/* Аватары */
.pf-avatar-grid {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.pf-avatar-option {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid transparent;
    object-fit: cover;
    transition: all 0.25s;
}

.pf-avatar-option:hover {
    transform: scale(1.1);
    border-color: var(--kingdom-color);
}

.pf-avatar-option.selected {
    border-color: var(--kingdom-color);
    box-shadow: 0 0 0 4px var(--kingdom-shadow);
}

/* Королевства */
.pf-kingdom-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 10px;
}

.pf-kingdom-btn {
    padding: 12px 14px;
    border-radius: 12px;
    border: 2px solid rgba(0,0,0,0.1);
    background: rgba(255,255,255,0.6);
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.25s;
    font-family: inherit;
    color: #333;
}

.pf-kingdom-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

.pf-kingdom-btn.selected {
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
}

/* Достижения */
.pf-ach-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
}

.pf-ach {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
    border-radius: 14px;
    border: 2px solid rgba(0,0,0,0.06);
    transition: all 0.25s;
}

.pf-ach:hover {
    transform: translateY(-3px);
    border-color: var(--kingdom-color);
    box-shadow: 0 12px 28px -8px var(--kingdom-shadow);
}

.pf-ach .pf-ach-icon {
    font-size: 2rem;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
    flex-shrink: 0;
}

.pf-ach .pf-ach-body { min-width: 0; }
.pf-ach .pf-ach-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2px;
}
.pf-ach .pf-ach-date {
    font-size: 0.72rem;
    color: #888;
}

/* Уведомления */
.pf-notif {
    display: flex;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    background: rgba(0,0,0,0.03);
    margin-bottom: 8px;
    transition: all 0.2s;
}

.pf-notif:hover { background: rgba(0,0,0,0.05); }

.pf-notif-icon { font-size: 1.4rem; }
.pf-notif-body { flex: 1; }
.pf-notif-text { font-size: 0.9rem; color: #333; margin-bottom: 2px; }
.pf-notif-date { font-size: 0.72rem; color: #999; }

/* Чат */
.pf-chat {
    background: linear-gradient(135deg, var(--kingdom-bg), rgba(255,255,255,0.6));
    border-radius: 14px;
    padding: 16px;
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 12px;
    border: 1px solid rgba(0,0,0,0.05);
}

.pf-chat-msg {
    margin: 8px 0;
    padding: 10px 14px;
    border-radius: 14px;
    max-width: 80%;
    word-wrap: break-word;
    font-size: 0.9rem;
    line-height: 1.5;
}

.pf-chat-msg.user {
    background: var(--kingdom-color);
    color: #fff;
    margin-left: auto;
    border-bottom-right-radius: 4px;
}

.pf-chat-msg.bot {
    background: #fff;
    color: #333;
    margin-right: auto;
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.pf-chat-input {
    display: flex;
    gap: 8px;
}

.pf-chat-input input {
    flex: 1;
    padding: 12px 18px;
    border: 2px solid rgba(0,0,0,0.1);
    border-radius: 30px;
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
    background: rgba(255,255,255,0.9);
}

.pf-chat-input input:focus {
    border-color: var(--kingdom-color);
}

.pf-chat-input button {
    padding: 12px 24px;
    background: var(--kingdom-color);
    color: #fff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 700;
    font-family: inherit;
    transition: all 0.2s;
}

.pf-chat-input button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -4px var(--kingdom-shadow);
}

/* Таблица лидеров */
.pf-leaderboard {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
}

.pf-leaderboard th {
    text-align: left;
    padding: 12px 14px;
    font-size: 0.75rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    border-bottom: 2px solid var(--kingdom-color);
}

.pf-leaderboard td {
    padding: 12px 14px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.pf-leaderboard tr {
    cursor: pointer;
    transition: all 0.2s;
}

.pf-leaderboard tr:hover {
    background: var(--kingdom-color);
    color: #fff;
}

.pf-leaderboard tr:hover td { border-bottom-color: transparent; }

.pf-lb-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 8px;
    border: 2px solid var(--kingdom-color);
    object-fit: cover;
}

/* Календарь */
.pf-calendar {
    text-align: center;
    padding: 24px;
    background: linear-gradient(135deg, var(--kingdom-bg), rgba(255,255,255,0.4));
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
}

.pf-cal-month {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--kingdom-color);
    margin-bottom: 6px;
}

.pf-cal-day {
    font-size: 2.5rem;
    font-weight: 900;
    color: #1a1a1a;
    line-height: 1;
    margin: 8px 0;
}

.pf-cal-year {
    font-size: 0.95rem;
    color: #666;
    font-weight: 600;
}

.pf-cal-season {
    display: inline-block;
    margin-top: 12px;
    padding: 6px 18px;
    background: var(--kingdom-color);
    color: #fff;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.5px;
}

/* Опасная зона */
.pf-danger {
    background: rgba(231, 76, 60, 0.05);
    border: 2px solid rgba(231, 76, 60, 0.2);
    border-radius: 14px;
    padding: 16px 20px;
}

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .pf-card, .pf-quick-card { background: rgba(30, 30, 46, 0.9); }
    .pf-card-title, .pf-quick-title, .pf-ach-name, .pf-name { color: #e0e0e0; }
    .pf-tab { color: #aaa; }
    .pf-tab:hover { background: rgba(255,255,255,0.05); color: #fff; }
    .pf-chat { background: rgba(30, 30, 46, 0.6); }
    .pf-chat-msg.bot { background: rgba(255,255,255,0.08); color: #e0e0e0; }
    .pf-chat-input input { background: rgba(30, 30, 46, 0.8); color: #e0e0e0; }
    .pf-kingdom-btn { background: rgba(30, 30, 46, 0.6); color: #e0e0e0; }
    .pf-notif { background: rgba(255,255,255,0.03); }
    .pf-notif-text { color: #d0d0d0; }
    .pf-cal-day { color: #e0e0e0; }
    .pf-calendar { background: rgba(30, 30, 46, 0.5); }
}

@media (max-width: 600px) {
    .pf-hero { padding: 24px 20px; }
    .pf-avatar { width: 90px; height: 90px; }
    .pf-name { font-size: 1.4rem; }
    .pf-tabs { padding: 4px; }
    .pf-tab { padding: 8px 14px; font-size: 0.82rem; }
    .pf-card { padding: 18px 16px; }
    .pf-avatar-option { width: 52px; height: 52px; }
    .pf-quick-grid { grid-template-columns: 1fr; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
        'Аркадия':    { color: '#D4A574', bg: '#FDF8F0', light: '#E8C9A0', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-arcadia.png' },
        'Ксанф':      { color: '#3D3D3D', bg: '#F5F5F5', light: '#6B6B6B', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/coat-of-arms-of-ksanf.png' },
        'Эдем':       { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eden.jpg' },
        'Эридания':   { color: '#F5D76E', bg: '#FFFDF5', light: '#FAE9A0', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eridania.png' },
        'Кхонг':      { color: '#A9A9A9', bg: '#F8F8F8', light: '#C8C8C8', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-khong.png' },
        'Авсония':    { color: '#87CEEB', bg: '#F0F8FF', light: '#B0D8EB', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-avsonia.png' },
        'Кимерия':    { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-kimeria.png' },
        'Серпентида': { color: '#E57373', bg: '#FFF5F5', light: '#F5A0A0', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-serpentida.png' },
        'Эритрей':    { color: '#64B5F6', bg: '#F0F8FF', light: '#90CAF9', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eritrea.png' },
        'Утопия':     { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-utopia.png' },
        'Эллада':     { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-hellas.png' },
        'Аливасото':  { color: '#81C784', bg: '#F0FFF0', light: '#A5D6A7', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-alivasoto.png' }
    };

    const AVATARS = [
        '/assets/images/авотарка%20девушки.png',
        '/assets/images/мужчина.png',
        '/assets/images/мужчина2.png',
        '/assets/images/мужчина%203.png'
    ];

    const BAD_WORDS = [
        'хуй','пизда','хуе','ебал','ебать','бля','сука','нахуй','пиздец','залупа','мудила',
        'гандон','блядь','пидор','гей','лох','дебил','идиот','кретин','секс','порно','эротика',
        'трахать','член','жид','ниггер','чурка','хач','fuck','shit','asshole','bitch','cunt',
        'dick','pussy','хуйло','еблан','мудак','урод','сволочь','тварь'
    ];

    const LEVEL_MAP = [
        { level: 1, xp: 0, title: '🌱 Новый поселенец' },
        { level: 2, xp: 50, title: '🔭 Исследователь' },
        { level: 3, xp: 150, title: '🚀 Первопроходец' },
        { level: 4, xp: 350, title: '🏠 Колонизатор' },
        { level: 5, xp: 700, title: '⚡ Командир базы' },
        { level: 6, xp: 1200, title: '👑 Легенда Марса' }
    ];

    // ============================================================
    // Утилиты
    // ============================================================
    function getLevelInfo(exp) {
        let result = { level: 1, title: '🌱 Новый поселенец', current: 0, next: 50, percent: 0 };
        for (let i = LEVEL_MAP.length - 1; i >= 0; i--) {
            if (exp >= LEVEL_MAP[i].xp) {
                result.level = LEVEL_MAP[i].level;
                result.title = LEVEL_MAP[i].title;
                result.current = LEVEL_MAP[i].xp;
                result.next = (i < LEVEL_MAP.length - 1) ? LEVEL_MAP[i + 1].xp : exp + 50;
                break;
            }
        }
        const range = result.next - result.current;
        result.percent = range > 0 ? Math.min(((exp - result.current) / range) * 100, 100) : 100;
        return result;
    }

    function getMartianDate() {
        const months = [
            { name: 'Ākha-dzen', days: 31 }, { name: 'Kōl-khan', days: 30 },
            { name: 'Dzen-ākha', days: 32 }, { name: 'Khōsen', days: 31 },
            { name: 'Mar-dzen', days: 33 }, { name: 'Ariya-mar', days: 30 },
            { name: 'Zal-ākha', days: 31 }, { name: 'Thal-khō', days: 32 },
            { name: 'Kōl-ghar', days: 29 }, { name: 'Mōr-ākha', days: 31 },
            { name: 'Dzen-kōl', days: 30 }, { name: 'Xal-mar', days: 28 },
            { name: 'Lān-sen', days: 29 }, { name: 'Khō-mōr', days: 31 },
            { name: 'Ākha-mōr', days: 32 }, { name: 'Kōl-suf', days: 33 },
            { name: 'Dzen-thal', days: 31 }, { name: 'Ghōl-ākha', days: 30 },
            { name: 'Rōg-ari', days: 29 }, { name: 'Mar-lān', days: 31 },
            { name: 'Ksanf-suf', days: 32 }, { name: 'Yar-okh', days: 33 }
        ];
        const MARTIAN_YEAR_DAYS = months.reduce((s, m) => s + m.days, 0);
        const EARTH_DAYS_IN_MARTIAN_YEAR = 668.6;
        const BOOK_REF_YEAR = 2740;
        const BOOK_REF_DAYS_AGO = 3798000000;

        const now = new Date();
        const earthDaysFromStart = (now - new Date(2026, 0, 1)) / (1000 * 60 * 60 * 24);
        const martianYearsOffset = earthDaysFromStart / EARTH_DAYS_IN_MARTIAN_YEAR;
        const year = Math.floor(BOOK_REF_DAYS_AGO + BOOK_REF_YEAR + martianYearsOffset);
        const dayOfYear = Math.floor((earthDaysFromStart * (MARTIAN_YEAR_DAYS / EARTH_DAYS_IN_MARTIAN_YEAR)) % MARTIAN_YEAR_DAYS);
        let remaining = dayOfYear, monthIndex = 0;
        for (let i = 0; i < months.length; i++) {
            if (remaining < months[i].days) { monthIndex = i; break; }
            remaining -= months[i].days;
        }
        const seasons = ['Пробуждение', 'Цветение', 'Зной', 'Ветры', 'Угасание', 'Заморозки', 'Тьма', 'Ледяной покров'];
        return {
            year: year.toLocaleString(),
            month: months[monthIndex].name,
            day: remaining + 1,
            season: seasons[Math.floor(monthIndex / 2) % seasons.length]
        };
    }

    function showToast(msg, type = 'info') {
        const colors = {
            success: 'linear-gradient(135deg,#27ae60,#16a085)',
            info: 'linear-gradient(135deg,#3498db,#2980b9)',
            warning: 'linear-gradient(135deg,#e67e22,#d35400)',
            error: 'linear-gradient(135deg,#e74c3c,#c0392b)'
        };
        const t = document.createElement('div');
        t.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:${colors[type]||colors.info};color:#fff;padding:12px 26px;border-radius:30px;font-weight:600;font-size:0.9rem;box-shadow:0 12px 32px rgba(0,0,0,0.3);z-index:99999;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;`;
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(() => { t.style.transform = 'translateX(-50%) translateY(0)'; });
        setTimeout(() => {
            t.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => t.remove(), 400);
        }, 2200);
    }

    // ============================================================
    // ОСНОВНАЯ ЛОГИКА
    // ============================================================
    const container = document.getElementById('profile-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let currentProfile = null;
    let achievementsList = [];
    let kingdom = KINGDOMS['Эдем'];

    async function init() {
        const { data: { session } } = await client.auth.getSession();
        const user = session?.user;

        if (!user) {
            container.innerHTML = `
                <div class="pf-card" style="text-align:center;padding:60px 20px;">
                    <div style="font-size:4rem;margin-bottom:16px;">🔒</div>
                    <h2 style="margin:0 0 12px 0;">Вы не авторизованы</h2>
                    <p style="color:#888;margin-bottom:20px;">Войдите, чтобы увидеть свой профиль</p>
                    <a href="/login/" class="pf-btn">Войти</a>
                </div>
            `;
            return;
        }

        currentUser = user;

        const { data: profile } = await client.from('profiles').select('*').eq('user_id', user.id).single();
        if (profile) {
            currentProfile = profile;
        } else {
            const { data: np } = await client.from('profiles')
                .insert([{ user_id: user.id, username: user.email.split('@')[0] }])
                .select().single();
            currentProfile = np;
        }

        kingdom = KINGDOMS[currentProfile.kingdom] || KINGDOMS['Эдем'];

        // Достижения
        const { data: ua } = await client.from('user_achievements')
            .select('achievement_id, earned_at').eq('user_id', user.id).order('earned_at', { ascending: false });
        if (ua && ua.length > 0) {
            const ids = ua.map(x => x.achievement_id);
            const { data: meta } = await client.from('achievements').select('*').in('id', ids);
            const metaMap = {};
            (meta || []).forEach(m => { metaMap[m.id] = m; });
            achievementsList = ua.map(x => ({
                ...metaMap[x.achievement_id],
                earned_at: x.earned_at
            })).filter(x => x.id);
        }

        // Уведомления
        const { data: notifications } = await client.from('notifications')
            .select('*').eq('user_id', user.id)
            .order('created_at', { ascending: false }).limit(10);

        // Лидеры
        const { data: leaders } = await client.from('profiles')
            .select('user_id, username, display_name, experience, level, avatar_url')
            .order('experience', { ascending: false }).limit(10);

        // Тема
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        render(notifications, leaders);
    }

    // ============================================================
    // РЕНДЕР
    // ============================================================
    function render(notifications, leaders) {
        const lvl = getLevelInfo(currentProfile.experience || 0);
        const displayName = currentProfile.display_name || currentProfile.username || currentUser.email.split('@')[0];
        const avatar = currentProfile.avatar_url || AVATARS[0];
        const bio = currentProfile.bio || '✍️ Ещё ничего не рассказал о себе.';
        const notifEnabled = currentProfile.notifications_enabled !== false;
        const isModerator = currentProfile.role === 'moderator';
        const martianDate = getMartianDate();

        container.innerHTML = `
            <!-- HERO -->
            <div class="pf-hero pf-fade">
                <div class="pf-hero-content">
                    <div class="pf-avatar-wrap">
                        <img src="${avatar}" alt="Avatar" class="pf-avatar">
                        <div class="pf-level-badge">${lvl.title}</div>
                    </div>
                    <div class="pf-info">
                        <h1 class="pf-name">
                            ${displayName}
                            ${isModerator ? '<span class="pf-role-badge">🛡️ Модератор</span>' : ''}
                        </h1>
                        <p class="pf-email">${currentUser.email}</p>
                        <div class="pf-stats-row">
                            <div class="pf-stat-mini">
                                <span class="pf-sm-label">Уровень</span>
                                <span class="pf-sm-value">⭐ ${lvl.level}</span>
                            </div>
                            <div class="pf-stat-mini">
                                <span class="pf-sm-label">Опыт</span>
                                <span class="pf-sm-value">💎 ${currentProfile.experience || 0}</span>
                            </div>
                            <div class="pf-stat-mini">
                                <span class="pf-sm-label">Достижений</span>
                                <span class="pf-sm-value">🏆 ${achievementsList.length}</span>
                            </div>
                        </div>
                        <div class="pf-progress">
                            <div class="pf-progress-bar" style="width: ${lvl.percent}%;"></div>
                        </div>
                        <div class="pf-progress-text">До уровня ${lvl.level + 1}: ${Math.max(lvl.next - (currentProfile.experience || 0), 0)} XP</div>
                    </div>
                </div>
            </div>

            <!-- БЫСТРЫЕ ССЫЛКИ -->
            <div class="pf-quick-grid pf-fade" style="animation-delay: 0.1s;">
                <a href="/stats/" class="pf-quick-card">
                    <div class="pf-quick-icon">📊</div>
                    <div class="pf-quick-body">
                        <div class="pf-quick-title">Моя статистика</div>
                        <div class="pf-quick-desc">Подробный дашборд</div>
                    </div>
                </a>
                <a href="/bookmarks/" class="pf-quick-card">
                    <div class="pf-quick-icon">📚</div>
                    <div class="pf-quick-body">
                        <div class="pf-quick-title">Мои закладки</div>
                        <div class="pf-quick-desc">Сохранённые статьи</div>
                    </div>
                </a>
                <a href="/top/" class="pf-quick-card">
                    <div class="pf-quick-icon">🏆</div>
                    <div class="pf-quick-body">
                        <div class="pf-quick-title">Топ статей</div>
                        <div class="pf-quick-desc">Популярное у читателей</div>
                    </div>
                </a>
                <a href="/quest-map/" class="pf-quick-card">
                    <div class="pf-quick-icon">🗺️</div>
                    <div class="pf-quick-body">
                        <div class="pf-quick-title">Квест-карта</div>
                        <div class="pf-quick-desc">Прогресс исследования</div>
                    </div>
                </a>
                <a href="/interactive/" class="pf-quick-card">
                    <div class="pf-quick-icon">🎮</div>
                    <div class="pf-quick-body">
                        <div class="pf-quick-title">Интерактив</div>
                        <div class="pf-quick-desc">Игры и викторины</div>
                    </div>
                </a>
                ${isModerator ? `
                <a href="/moderator/" class="pf-quick-card">
                    <div class="pf-quick-icon">🛡️</div>
                    <div class="pf-quick-body">
                        <div class="pf-quick-title">Модерация</div>
                        <div class="pf-quick-desc">Панель управления</div>
                    </div>
                </a>` : ''}
            </div>

            <!-- ВКЛАДКИ -->
            <div class="pf-tabs pf-fade" style="animation-delay: 0.15s;">
                <button class="pf-tab active" data-tab="overview">👤 Обзор</button>
                <button class="pf-tab" data-tab="achievements">🏅 Достижения</button>
                <button class="pf-tab" data-tab="notifications">🔔 Уведомления</button>
                <button class="pf-tab" data-tab="friends">👥 Друзья</button>
                <button class="pf-tab" data-tab="ai">🤖 ИИ-гид</button>
                <button class="pf-tab" data-tab="leaderboard">🏆 Лидеры</button>
                <button class="pf-tab" data-tab="settings">⚙️ Настройки</button>
            </div>

            <!-- ВКЛАДКА: ОБЗОР -->
            <div class="pf-tab-content active" data-content="overview">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>
                    <p style="margin:0 0 12px 0;color:#555;font-size:0.95rem;line-height:1.6;" id="bio-text">${bio}</p>
                    <button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>
                    <div class="pf-calendar">
                        <div class="pf-cal-month">${martianDate.month}</div>
                        <div class="pf-cal-day">${martianDate.day}</div>
                        <div class="pf-cal-year">Год ${martianDate.year} Э.О.</div>
                        <div class="pf-cal-season">${martianDate.season}</div>
                    </div>
                </div>
            </div>

            <!-- ВКЛАДКА: ДОСТИЖЕНИЯ -->
            <div class="pf-tab-content" data-content="achievements">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🏅</span> Ваши достижения (${achievementsList.length})</h3>
                    ${achievementsList.length === 0 ? `
                        <p style="text-align:center;color:#888;padding:40px 20px;">
                            Пока нет достижений. Читайте статьи, проходите викторины — и они появятся!
                        </p>
                    ` : `
                        <div class="pf-ach-grid">
                            ${achievementsList.map(a => `
                                <div class="pf-ach">
                                    <div class="pf-ach-icon">${a.icon || '🏅'}</div>
                                    <div class="pf-ach-body">
                                        <div class="pf-ach-name">${a.name || 'Достижение'}</div>
                                        <div class="pf-ach-date">${a.earned_at ? new Date(a.earned_at).toLocaleDateString('ru-RU') : ''}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            </div>

            <!-- ВКЛАДКА: УВЕДОМЛЕНИЯ -->
            <div class="pf-tab-content" data-content="notifications">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Последние уведомления</h3>
                    ${notifications && notifications.length > 0 ? notifications.map(n => `
                        <div class="pf-notif">
                            <div class="pf-notif-icon">📬</div>
                            <div class="pf-notif-body">
                                <div class="pf-notif-text">${n.message}</div>
                                <div class="pf-notif-date">${new Date(n.created_at).toLocaleDateString('ru-RU')}</div>
                            </div>
                        </div>
                    `).join('') : `
                        <p style="text-align:center;color:#888;padding:40px 20px;">
                            Уведомлений пока нет. Они появятся при получении достижений и повышении уровня.
                        </p>
                    `}
                </div>
            </div>

            <!-- ВКЛАДКА: ДРУЗЬЯ -->
            <div class="pf-tab-content" data-content="friends">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">👥</span> Друзья</h3>
                    <p style="color:#888;font-size:0.9rem;margin:0 0 16px 0;">
                        Находите других исследователей Марса и добавляйте в друзья.
                    </p>
                    <div id="friends-list" style="margin-bottom:16px;">
                        <p style="text-align:center;color:#999;padding:20px;">Загрузка...</p>
                    </div>
                </div>
            </div>

            <!-- ВКЛАДКА: ИИ-ГИД -->
            <div class="pf-tab-content" data-content="ai">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🤖</span> Марсианский ИИ-гид</h3>
                    <div class="pf-chat" id="pfChatContainer">
                        <div class="pf-chat-msg bot">Привет! Я — марсианский гид. Спрашивай о Марсе, его героях, божествах и географии! 🪐</div>
                    </div>
                    <div class="pf-chat-input">
                        <input type="text" id="pfChatInput" placeholder="Спросите о Марсе..." onkeypress="if(event.key==='Enter') pfSendChat()">
                        <button onclick="pfSendChat()">Отправить</button>
                    </div>
                </div>
            </div>

            <!-- ВКЛАДКА: ЛИДЕРЫ -->
            <div class="pf-tab-content" data-content="leaderboard">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10 исследователей</h3>
                    ${leaders && leaders.length > 0 ? `
                        <table class="pf-leaderboard">
                            <thead><tr><th>#</th><th>Участник</th><th>Уровень</th><th>Опыт</th></tr></thead>
                            <tbody>
                                ${leaders.map((l, i) => {
                                    const name = l.display_name || l.username || 'Аноним';
                                    const medals = ['🥇','🥈','🥉'];
                                    const isMe = l.user_id === currentUser.id;
                                    return `
                                        <tr onclick="pfViewProfile('${l.user_id}')" style="${isMe?'background:'+kingdom.color+';color:#fff;font-weight:700;':''}">
                                            <td>${medals[i] || (i+1)}</td>
                                            <td><img src="${l.avatar_url || 'https://ui-avatars.com/api/?name='+encodeURIComponent(name)+'&background=6C63FF&color=fff&size=64'}" class="pf-lb-avatar">${name}${isMe?' (вы)':''}</td>
                                            <td>${l.level || 1}</td>
                                            <td><b>${l.experience || 0}</b></td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    ` : '<p style="text-align:center;color:#888;padding:20px;">Пока нет данных</p>'}
                </div>
            </div>

            <!-- ВКЛАДКА: НАСТРОЙКИ -->
            <div class="pf-tab-content" data-content="settings">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">👤</span> Имя пользователя</h3>
                    <p style="color:#555;margin:0 0 12px 0;">Текущее: <b id="pfDisplayName">${displayName}</b></p>
                    <button class="pf-btn pf-btn-outline" onclick="pfEditName()">✏️ Изменить</button>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🖼️</span> Аватар</h3>
                    <div class="pf-avatar-grid">
                        ${AVATARS.map(url => `
                            <img src="${url}" alt="avatar" class="pf-avatar-option ${avatar===url?'selected':''}" onclick="pfSelectAvatar('${url}')">
                        `).join('')}
                    </div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🏰</span> Королевство</h3>
                    <div class="pf-kingdom-grid">
                        ${Object.entries(KINGDOMS).map(([name, k]) => `
                            <button class="pf-kingdom-btn ${currentProfile.kingdom===name?'selected':''}" 
                                    style="${currentProfile.kingdom===name?'background:'+k.color+';border-color:'+k.color+';':''}" 
                                    onclick="pfSelectKingdom('${name}')">${name}</button>
                        `).join('')}
                    </div>
                    <div style="text-align:center;margin-top:16px;">
                        <img src="${kingdom.flag}" alt="Флаг" style="width:90px;border-radius:6px;border:1px solid #a2a9b1;">
                        <div style="font-size:0.75rem;color:#666;margin-top:4px;">Флаг ${currentProfile.kingdom || 'Эдем'}</div>
                    </div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">📧</span> Уведомления</h3>
                    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                        <input type="checkbox" id="pfNotifToggle" ${notifEnabled?'checked':''} onchange="pfToggleNotif()" style="width:20px;height:20px;cursor:pointer;accent-color:var(--kingdom-color);">
                        Получать уведомления на email
                    </label>
                </div>

                <div class="pf-card pf-danger">
                    <h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">⚠️</span> Опасная зона</h3>
                    <p style="color:#888;font-size:0.9rem;margin:0 0 16px 0;">
                        Удаление аккаунта необратимо. Все данные будут потеряны.
                    </p>
                    <button class="pf-btn pf-btn-danger" onclick="pfDeleteAccount()">🗑️ Удалить аккаунт</button>
                </div>

                <div class="pf-card">
                    <button class="pf-btn pf-btn-outline" onclick="pfLogout()" style="width:100%;justify-content:center;">🚪 Выйти из аккаунта</button>
                </div>
            </div>
        `;

        // Обработчики вкладок
        document.querySelectorAll('.pf-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.pf-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.pf-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const content = document.querySelector(`.pf-tab-content[data-content="${tab.dataset.tab}"]`);
                if (content) content.classList.add('active');
                if (tab.dataset.tab === 'friends') loadFriends();
            };
        });

        // Экспортируем функции
        window.pfEditBio = () => editBio();
        window.pfEditName = () => editName();
        window.pfSelectAvatar = (url) => selectAvatar(url);
        window.pfSelectKingdom = (name) => selectKingdom(name);
        window.pfToggleNotif = () => toggleNotif();
        window.pfDeleteAccount = () => deleteAccount();
        window.pfLogout = () => logout();
        window.pfSendChat = () => sendChat();
        window.pfViewProfile = (id) => { window.location.href = `/profile-view/?user_id=${id}`; };
        window.pfAddFriend = (id) => addFriend(id);

        window._pf = { client, user: currentUser };
    }

    // ============================================================
    // ФУНКЦИИ
    // ============================================================
    async function editBio() {
        const current = document.getElementById('bio-text')?.innerText || '';
        const newBio = prompt('Введите вашу биографию:', current);
        if (newBio === null) return;
        const { error } = await client.from('profiles').update({ bio: newBio.trim() }).eq('user_id', currentUser.id);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        document.getElementById('bio-text').innerText = newBio.trim();
        showToast('✅ Биография обновлена!', 'success');
    }

    async function editName() {
        const current = document.getElementById('pfDisplayName')?.innerText || '';
        const newName = prompt('Новое имя (2-20 символов, латиница):', current);
        if (!newName || newName === current) return;
        if (newName.length < 2 || newName.length > 20) { showToast('Имя должно быть 2-20 символов', 'warning'); return; }
        if (!/^[a-zA-Z0-9\s\-_]+$/.test(newName)) { showToast('Только латиница, цифры, пробел, дефис, _', 'warning'); return; }
        const lower = newName.toLowerCase();
        for (const bad of BAD_WORDS) if (lower.includes(bad)) { showToast('Имя содержит недопустимое слово', 'error'); return; }
        const { error } = await client.from('profiles').update({ display_name: newName.trim() }).eq('user_id', currentUser.id);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast('✅ Имя обновлено!', 'success');
        setTimeout(() => location.reload(), 800);
    }

    async function selectAvatar(url) {
        const { error } = await client.from('profiles').update({ avatar_url: url }).eq('user_id', currentUser.id);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast('✅ Аватар обновлён!', 'success');
        setTimeout(() => location.reload(), 800);
    }

    async function selectKingdom(name) {
        const { error } = await client.from('profiles').update({ kingdom: name }).eq('user_id', currentUser.id);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast(`✅ Выбрано королевство ${name}!`, 'success');
        setTimeout(() => location.reload(), 800);
    }

    async function toggleNotif() {
        const checked = document.getElementById('pfNotifToggle').checked;
        const { error } = await client.from('profiles').update({ notifications_enabled: checked }).eq('user_id', currentUser.id);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast('✅ Настройка сохранена!', 'success');
    }

    async function deleteAccount() {
        if (!confirm('⚠️ Вы уверены? Это необратимо!')) return;
        const email = prompt('Введите ваш email для подтверждения:');
        if (!email || email !== currentUser.email) { showToast('Email не совпадает', 'error'); return; }
        const { data } = await client.auth.getSession();
        const token = data?.session?.access_token;
        if (!token) { showToast('Не удалось получить токен', 'error'); return; }
        try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/delete-user`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const json = await res.json();
            if (json.error) throw new Error(json.error);
            showToast('Аккаунт удалён', 'success');
            localStorage.clear();
            setTimeout(() => window.location.href = '/', 800);
        } catch (e) {
            showToast('Ошибка: ' + e.message, 'error');
        }
    }

    async function logout() {
        await client.auth.signOut();
        localStorage.clear();
        window.location.href = '/';
    }

    async function sendChat() {
        const input = document.getElementById('pfChatInput');
        const containerEl = document.getElementById('pfChatContainer');
        const question = input.value.trim();
        if (!question) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'pf-chat-msg user';
        userMsg.textContent = question;
        containerEl.appendChild(userMsg);
        containerEl.scrollTop = containerEl.scrollHeight;
        input.value = '';

        try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question })
            });
            const data = await res.json();
            const reply = data.reply || data.error || 'Не удалось получить ответ';
            const botMsg = document.createElement('div');
            botMsg.className = 'pf-chat-msg bot';
            botMsg.textContent = reply;
            containerEl.appendChild(botMsg);
            containerEl.scrollTop = containerEl.scrollHeight;
        } catch (e) {
            const err = document.createElement('div');
            err.className = 'pf-chat-msg bot';
            err.textContent = '⚠️ Ошибка соединения с ИИ';
            containerEl.appendChild(err);
        }
    }

    async function loadFriends() {
        const el = document.getElementById('friends-list');
        if (!el) return;
        const { data: friends } = await client.from('friends')
            .select('*')
            .or(`user_id.eq.${currentUser.id},friend_id.eq.${currentUser.id}`);

        if (!friends || friends.length === 0) {
            el.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">Пока нет друзей. Найдите других исследователей в таблице лидеров!</p>';
            return;
        }

        const ids = new Set();
        friends.forEach(f => { ids.add(f.user_id); ids.add(f.friend_id); });
        ids.delete(currentUser.id);
        const { data: profiles } = await client.from('profiles').select('user_id, display_name, username, avatar_url').in('user_id', [...ids]);

        const profileMap = {};
        (profiles || []).forEach(p => { profileMap[p.user_id] = p; });

        el.innerHTML = friends.map(f => {
            const otherId = f.user_id === currentUser.id ? f.friend_id : f.user_id;
            const p = profileMap[otherId] || {};
            const name = p.display_name || p.username || 'Аноним';
            const avatar = p.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=64`;
            const status = f.status === 'accepted' ? '👥 Друзья' : '⏳ Заявка';
            return `
                <div class="pf-notif">
                    <img src="${avatar}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid var(--kingdom-color);">
                    <div class="pf-notif-body">
                        <div class="pf-notif-text"><b>${name}</b></div>
                        <div class="pf-notif-date">${status}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    async function addFriend(friendId) {
        if (friendId === currentUser.id) { showToast('Нельзя добавить себя', 'warning'); return; }
        const { data: existing } = await client.from('friends')
            .select('*')
            .or(`and(user_id.eq.${currentUser.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${currentUser.id})`);
        if (existing && existing.length > 0) {
            showToast('Заявка уже существует', 'info');
            return;
        }
        const { error } = await client.from('friends').insert([{
            user_id: currentUser.id, friend_id: friendId, status: 'pending'
        }]);
        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast('✅ Заявка отправлена!', 'success');
    }

    // Экспорт в window для onclick из HTML
    window.pfAddFriend = addFriend;

    // Запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
