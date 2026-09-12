---
title: Гильдии
comments: false
---

<div id="gld-app" style="max-width: 1100px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: gldSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка гильдий...</p>
    </div>
</div>

<style>
:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #F0F4FF;
    --kingdom-light: #A29BFE;
    --kingdom-shadow: rgba(108, 99, 255, 0.25);
}

@keyframes gldSpin { to { transform: rotate(360deg); } }
@keyframes gldFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes gldPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes gldFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes gldSlide { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }

.gld-fade { animation: gldFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#gld-app a { text-decoration: none !important; border-bottom: none !important; }

/* HERO */
.gld-hero {
    position: relative;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    border-radius: 24px;
    padding: 40px 36px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px -16px var(--kingdom-shadow);
}

.gld-hero::before {
    content: '';
    position: absolute;
    top: -60%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
    border-radius: 50%;
    animation: gldFloat 8s ease-in-out infinite;
}

.gld-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.gld-hero-icon {
    font-size: 4rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.3));
    animation: gldPulse 3s ease-in-out infinite;
}

.gld-hero-title {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
}

.gld-hero-sub {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0 0 20px 0;
}

.gld-hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.gld-hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 30px;
    border: 2px solid rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s;
    backdrop-filter: blur(8px);
    font-family: inherit;
}

.gld-hero-btn:hover {
    background: rgba(255,255,255,0.35);
    transform: translateY(-2px);
}

.gld-hero-btn.primary {
    background: #fff;
    color: var(--kingdom-color);
    border-color: #fff;
}

/* СТАТИСТИКА */
.gld-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
}

.gld-stat {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    padding: 20px 16px;
    border-radius: 16px;
    text-align: center;
    border: 2px solid transparent;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.gld-stat:hover {
    transform: translateY(-6px);
    border-color: var(--kingdom-color);
    box-shadow: 0 16px 40px -8px var(--kingdom-shadow);
}

.gld-stat .gld-stat-icon {
    font-size: 1.8rem;
    margin-bottom: 8px;
}

.gld-stat .gld-stat-value {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.gld-stat .gld-stat-label {
    font-size: 0.72rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-top: 6px;
    font-weight: 600;
}

/* ФИЛЬТРЫ */
.gld-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.05);
}

.gld-filter-btn {
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
}

.gld-filter-btn:hover { background: rgba(0,0,0,0.06); color: #333; }
.gld-filter-btn.active {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    box-shadow: 0 6px 16px -4px var(--kingdom-shadow);
}

.gld-search {
    flex: 1;
    min-width: 200px;
    padding: 10px 16px;
    border-radius: 30px;
    border: 2px solid rgba(0,0,0,0.08);
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    background: #fff;
}

.gld-search:focus { border-color: var(--kingdom-color); }

/* СЕТКА ГИЛЬДИЙ */
.gld-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 18px;
    margin-bottom: 40px;
}

.gld-card {
    position: relative;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 2px solid rgba(0,0,0,0.05);
    padding: 24px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    animation: gldFadeIn 0.5s ease both;
    display: flex;
    flex-direction: column;
}

.gld-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: var(--guild-color, var(--kingdom-color));
    opacity: 0.8;
}

.gld-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px -12px var(--kingdom-shadow);
    border-color: var(--kingdom-color);
}

.gld-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
}

.gld-card-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--guild-color, #6C63FF), rgba(108,99,255,0.7));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 8px 20px -4px rgba(0,0,0,0.2);
    transition: transform 0.3s;
}

.gld-card:hover .gld-card-icon { transform: scale(1.1) rotate(-6deg); }

.gld-card-info { flex: 1; min-width: 0; }
.gld-card-name {
    font-size: 1.15rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.gld-card-leader {
    font-size: 0.78rem;
    color: #888;
    display: flex;
    align-items: center;
    gap: 4px;
}

.gld-card-desc {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.5;
    margin: 0 0 16px 0;
    min-height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.gld-card-footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 14px;
    border-top: 1px dashed rgba(0,0,0,0.08);
}

.gld-card-members {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--kingdom-color);
}

.gld-card-status {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    text-transform: uppercase;
}

.gld-card-status.my {
    background: linear-gradient(135deg, #27ae60, #16a085);
    color: #fff;
}
.gld-card-status.open {
    background: rgba(0,0,0,0.06);
    color: #666;
}
.gld-card-status.full {
    background: rgba(231,76,60,0.1);
    color: #c0392b;
}

/* ПУСТОЕ */
.gld-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9));
    border-radius: 16px;
    border: 2px dashed rgba(108,99,255,0.2);
}
.gld-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.gld-empty-title { font-size: 1.1rem; font-weight: 700; color: #666; }

/* МОДАЛКА */
.gld-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: gldFadeIn 0.3s ease;
}
.gld-modal {
    background: #fff;
    max-width: 500px;
    width: 100%;
    border-radius: 20px;
    padding: 32px 28px;
    position: relative;
    box-shadow: 0 30px 80px rgba(0,0,0,0.4);
    animation: gldFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    max-height: 90vh;
    overflow-y: auto;
}
.gld-modal-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}
.gld-modal-close {
    position: absolute;
    top: 14px;
    right: 16px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(0,0,0,0.05);
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
}
.gld-modal-close:hover { background: rgba(0,0,0,0.1); color: #333; }

.gld-field { margin-bottom: 16px; }
.gld-field label {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 6px;
}
.gld-field input,
.gld-field textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 2px solid rgba(0,0,0,0.08);
    font-size: 0.92rem;
    font-family: inherit;
    outline: none;
    background: #fafafa;
    transition: border-color 0.2s;
    box-sizing: border-box;
}
.gld-field input:focus,
.gld-field textarea:focus {
    border-color: var(--kingdom-color);
    background: #fff;
}
.gld-field textarea { resize: vertical; min-height: 80px; }

.gld-icon-picker {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.gld-icon-btn {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    border: 2px solid rgba(0,0,0,0.08);
    background: #fafafa;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.gld-icon-btn:hover { background: #f0f0f0; transform: scale(1.05); }
.gld-icon-btn.selected {
    border-color: var(--kingdom-color);
    background: rgba(108,99,255,0.1);
    transform: scale(1.1);
    box-shadow: 0 4px 12px -2px var(--kingdom-shadow);
}

.gld-color-picker {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.gld-color-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
}
.gld-color-btn:hover { transform: scale(1.1); }
.gld-color-btn.selected {
    border-color: #333;
    transform: scale(1.15);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.gld-modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 24px;
}
.gld-btn {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: none;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
}
.gld-btn.primary {
    background: linear-gradient(135deg, var(--kingdom-color), var(--kingdom-light));
    color: #fff;
    box-shadow: 0 8px 20px -4px var(--kingdom-shadow);
}
.gld-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -6px var(--kingdom-shadow); }
.gld-btn.secondary {
    background: rgba(0,0,0,0.05);
    color: #666;
}

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .gld-stat, .gld-card, .gld-filters { background: rgba(30, 30, 46, 0.9); }
    .gld-card-name, .gld-card-desc { color: #e0e0e0; }
    .gld-modal { background: #1a1a2a; }
    .gld-modal-title { color: #e0e0e0; }
    .gld-field label { color: #d0d0d0; }
    .gld-field input, .gld-field textarea { background: rgba(255,255,255,0.05); color: #e0e0e0; }
    .gld-icon-btn { background: rgba(255,255,255,0.05); }
    .gld-filter-btn { background: rgba(255,255,255,0.05); color: #aaa; }
    .gld-empty { background: rgba(30,30,46,0.5); }
    .gld-empty-title { color: #aaa; }
    .gld-search { background: #1a1a2a; color: #e0e0e0; border-color: #2a2a3a; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
        'Эдем': { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' },
        'Кимерия': { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9' },
        'Утопия': { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' },
        'Эллада': { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91' },
        'Аркадия': { color: '#D4A574', bg: '#FDF8F0', light: '#E8C9A0' },
        'Ксанф': { color: '#3D3D3D', bg: '#F5F5F5', light: '#6B6B6B' }
    };

    const GUILD_ICONS = ['🏰','⚔️','🛡️','👑','🔥','🌟','🌊','📜','🧠','🎵','🎨','⚙️','🔭','💎','🏆','🚀'];
    const GUILD_COLORS = ['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63','#34495e','#e67e22'];

    const container = document.getElementById('gld-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let profile = null;
    let kingdom = KINGDOMS['Эдем'];
    let guilds = [];
    let myGuildId = null;
    let membersCount = {};
    let profilesMap = {};
    let activeFilter = 'all';
    let searchQuery = '';

    // ============================================================
    // Тост
    // ============================================================
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
        }, 2400);
    }

    // ============================================================
    // Загрузка
    // ============================================================
    async function loadData() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        if (currentUser) {
            const { data: p } = await client.from('profiles').select('*').eq('user_id', currentUser.id).single();
            profile = p;
            kingdom = KINGDOMS[p?.kingdom] || KINGDOMS['Эдем'];
        }

        // Загружаем гильдии
        const { data: g } = await client.from('guilds').select('*').order('created_at', { ascending: false });
        guilds = g || [];

        // Загружаем участников
        const { data: m } = await client.from('guild_members').select('guild_id, user_id');
        membersCount = {};
        const allUserIds = new Set();
        (m || []).forEach(x => {
            membersCount[x.guild_id] = (membersCount[x.guild_id] || 0) + 1;
            allUserIds.add(x.user_id);
            if (currentUser && x.user_id === currentUser.id) myGuildId = x.guild_id;
        });

        // Все лидеры
        guilds.forEach(g => allUserIds.add(g.leader_id));

        // Профили
        if (allUserIds.size > 0) {
            const { data: profiles } = await client.from('profiles')
                .select('user_id, username, display_name, avatar_url')
                .in('user_id', [...allUserIds]);
            profilesMap = {};
            (profiles || []).forEach(p => { profilesMap[p.user_id] = p; });
        }
    }

    // ============================================================
    // Действия
    // ============================================================
    async function createGuild(name, description, icon, color) {
        if (!currentUser) { showToast('Войдите, чтобы создать гильдию', 'warning'); return; }
        if (myGuildId) { showToast('Вы уже в гильдии', 'warning'); return; }

        // Проверка имени
        if (!name || name.length < 3 || name.length > 30) { showToast('Имя: 3-30 символов', 'warning'); return; }

        // Проверка уникальности
        const { data: existing } = await client.from('guilds').select('id').eq('name', name).maybeSingle();
        if (existing) { showToast('Такая гильдия уже существует', 'error'); return; }

        const { data, error } = await client.from('guilds').insert([{
            name, description, icon, color,
            leader_id: currentUser.id
        }]).select().single();

        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }

        // Добавляем лидера как участника
        await client.from('guild_members').insert([{
            guild_id: data.id,
            user_id: currentUser.id,
            role: 'leader'
        }]);

        showToast(`🏰 Гильдия «${name}» создана!`, 'success');
        await loadData();
        render();
    }

    async function joinGuild(guildId) {
        if (!currentUser) { showToast('Войдите, чтобы вступить', 'warning'); return; }
        if (myGuildId) { showToast('Сначала покиньте текущую гильдию', 'warning'); return; }

        const guild = guilds.find(g => g.id === guildId);
        if (!guild) return;
        const limit = guild.member_limit || 50;
        if ((membersCount[guildId] || 0) >= limit) { showToast('Гильдия заполнена', 'warning'); return; }

        const { error } = await client.from('guild_members').insert([{
            guild_id: guildId,
            user_id: currentUser.id,
            role: 'member'
        }]);

        if (error) { showToast('Ошибка: ' + error.message, 'error'); return; }
        showToast(`✅ Вы вступили в «${guild.name}»!`, 'success');
        await loadData();
        render();
    }

    async function leaveGuild() {
        if (!currentUser || !myGuildId) return;
        const guild = guilds.find(g => g.id === myGuildId);
        if (!guild) return;

        if (guild.leader_id === currentUser.id) {
            if (!confirm('Вы лидер. Покинуть = удалить гильдию. Продолжить?')) return;
            await client.from('guilds').delete().eq('id', myGuildId);
            showToast('Гильдия удалена', 'info');
        } else {
            if (!confirm(`Покинуть «${guild.name}»?`)) return;
            await client.from('guild_members').delete()
                .eq('guild_id', myGuildId).eq('user_id', currentUser.id);
            showToast('Вы покинули гильдию', 'info');
        }
        myGuildId = null;
        await loadData();
        render();
    }

    // ============================================================
    // Модалка создания
    // ============================================================
    function openCreateModal() {
        if (!currentUser) { showToast('Войдите, чтобы создать гильдию', 'warning'); return; }
        if (myGuildId) { showToast('Вы уже в гильдии', 'warning'); return; }

        const overlay = document.createElement('div');
        overlay.className = 'gld-modal-overlay';
        overlay.innerHTML = `
            <div class="gld-modal">
                <button class="gld-modal-close" onclick="this.closest('.gld-modal-overlay').remove()">✕</button>
                <h2 class="gld-modal-title">🏰 Создать гильдию</h2>

                <div class="gld-field">
                    <label>Название</label>
                    <input type="text" id="gld-name" placeholder="Например: Хранители Марса" maxlength="30">
                </div>

                <div class="gld-field">
                    <label>Описание</label>
                    <textarea id="gld-desc" placeholder="О чём ваша гильдия? Кого ищете?" maxlength="300"></textarea>
                </div>

                <div class="gld-field">
                    <label>Иконка</label>
                    <div class="gld-icon-picker" id="gld-icons">
                        ${GUILD_ICONS.map((ic, i) => `
                            <button type="button" class="gld-icon-btn ${i===0?'selected':''}" data-icon="${ic}">${ic}</button>
                        `).join('')}
                    </div>
                </div>

                <div class="gld-field">
                    <label>Цвет</label>
                    <div class="gld-color-picker" id="gld-colors">
                        ${GUILD_COLORS.map((c, i) => `
                            <button type="button" class="gld-color-btn ${i===0?'selected':''}" data-color="${c}" style="background:${c};"></button>
                        `).join('')}
                    </div>
                </div>

                <div class="gld-modal-actions">
                    <button class="gld-btn secondary" onclick="this.closest('.gld-modal-overlay').remove()">Отмена</button>
                    <button class="gld-btn primary" id="gld-create-btn">🏰 Создать</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Выбор иконки
        overlay.querySelectorAll('.gld-icon-btn').forEach(btn => {
            btn.onclick = () => {
                overlay.querySelectorAll('.gld-icon-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            };
        });

        // Выбор цвета
        overlay.querySelectorAll('.gld-color-btn').forEach(btn => {
            btn.onclick = () => {
                overlay.querySelectorAll('.gld-color-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            };
        });

        // Создание
        overlay.querySelector('#gld-create-btn').onclick = async () => {
            const name = overlay.querySelector('#gld-name').value.trim();
            const description = overlay.querySelector('#gld-desc').value.trim();
            const icon = overlay.querySelector('.gld-icon-btn.selected')?.dataset.icon || '🏰';
            const color = overlay.querySelector('.gld-color-btn.selected')?.dataset.color || '#6C63FF';
            await createGuild(name, description, icon, color);
            overlay.remove();
        };
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

        const totalMembers = Object.values(membersCount).reduce((s, c) => s + c, 0);

        let filtered = [...guilds];
        if (activeFilter === 'my' && myGuildId) filtered = filtered.filter(g => g.id === myGuildId);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(g =>
                (g.name || '').toLowerCase().includes(q) ||
                (g.description || '').toLowerCase().includes(q)
            );
        }

        // Сортируем по числу участников
        filtered.sort((a, b) => (membersCount[b.id] || 0) - (membersCount[a.id] || 0));

        container.innerHTML = `
            <!-- HERO -->
            <div class="gld-hero gld-fade">
                <div class="gld-hero-content">
                    <div class="gld-hero-icon">🏰</div>
                    <h1 class="gld-hero-title">Гильдии Марса</h1>
                    <p class="gld-hero-sub">${currentUser ? 'Объединяйтесь с другими исследователями!' : 'Войдите, чтобы создавать и вступать в гильдии'}</p>
                    <div class="gld-hero-actions">
                        ${currentUser && !myGuildId ? `<button class="gld-hero-btn primary" onclick="gldOpenCreate()">➕ Создать гильдию</button>` : ''}
                        ${currentUser && myGuildId ? `<button class="gld-hero-btn primary" onclick="gldSetFilter('my')">🏰 Моя гильдия</button>` : ''}
                        ${!currentUser ? `<a href="/login/" class="gld-hero-btn primary" style="text-decoration:none;">🔐 Войти</a>` : ''}
                    </div>
                </div>
            </div>

            <!-- СТАТИСТИКА -->
            <div class="gld-stats-grid gld-fade" style="animation-delay: 0.1s;">
                <div class="gld-stat">
                    <div class="gld-stat-icon">🏰</div>
                    <div class="gld-stat-value">${guilds.length}</div>
                    <div class="gld-stat-label">Всего гильдий</div>
                </div>
                <div class="gld-stat">
                    <div class="gld-stat-icon">👥</div>
                    <div class="gld-stat-value">${totalMembers}</div>
                    <div class="gld-stat-label">Участников</div>
                </div>
                <div class="gld-stat">
                    <div class="gld-stat-icon">⭐</div>
                    <div class="gld-stat-value">${myGuildId ? '1' : '0'}</div>
                    <div class="gld-stat-label">Моих гильдий</div>
                </div>
                <div class="gld-stat">
                    <div class="gld-stat-icon">📊</div>
                    <div class="gld-stat-value">${guilds.length ? Math.round(totalMembers / guilds.length) : 0}</div>
                    <div class="gld-stat-label">Средний размер</div>
                </div>
            </div>

            <!-- ФИЛЬТРЫ -->
            <div class="gld-filters gld-fade" style="animation-delay: 0.15s;">
                <button class="gld-filter-btn ${activeFilter==='all'?'active':''}" onclick="gldSetFilter('all')">🌐 Все</button>
                ${currentUser && myGuildId ? `<button class="gld-filter-btn ${activeFilter==='my'?'active':''}" onclick="gldSetFilter('my')">🏰 Моя</button>` : ''}
                <input class="gld-search" type="text" placeholder="🔍 Поиск гильдии..." value="${searchQuery}" oninput="gldSearch(this.value)">
            </div>

            <!-- СЕТКА -->
            ${filtered.length === 0 ? `
                <div class="gld-empty">
                    <div class="gld-empty-icon">🏰</div>
                    <div class="gld-empty-title">${searchQuery ? 'Ничего не найдено' : 'Гильдий пока нет'}</div>
                    ${currentUser && !myGuildId && !searchQuery ? `
                        <button class="gld-btn primary" style="max-width:200px;margin:20px auto 0;" onclick="gldOpenCreate()">➕ Создать первую</button>
                    ` : ''}
                </div>
            ` : `
                <div class="gld-grid">
                    ${filtered.map((g, i) => renderGuildCard(g, i)).join('')}
                </div>
            `}
        `;
    }

    function renderGuildCard(g, index) {
        const leader = profilesMap[g.leader_id] || {};
        const leaderName = leader.display_name || leader.username || 'Аноним';
        const count = membersCount[g.id] || 0;
        const limit = g.member_limit || 50;
        const isMyGuild = g.id === myGuildId;
        const isFull = count >= limit;

        let statusHTML = '';
        if (isMyGuild) statusHTML = `<span class="gld-card-status my">🏰 Ваша</span>`;
        else if (isFull) statusHTML = `<span class="gld-card-status full">🔒 Заполнена</span>`;
        else statusHTML = `<span class="gld-card-status open">✅ Открыта</span>`;

        return `
            <div class="gld-card gld-fade" style="--guild-color: ${g.color || '#6C63FF'}; animation-delay: ${index * 0.05}s;">
                <div class="gld-card-header">
                    <div class="gld-card-icon">${g.icon || '🏰'}</div>
                    <div class="gld-card-info">
                        <h3 class="gld-card-name">${escapeHtml(g.name)}</h3>
                        <div class="gld-card-leader">👑 ${escapeHtml(leaderName)}</div>
                    </div>
                </div>

                <p class="gld-card-desc">${escapeHtml(g.description || 'Без описания')}</p>

                <div class="gld-card-footer">
                    <span class="gld-card-members">👥 ${count} / ${limit}</span>
                    ${statusHTML}
                </div>

                <div style="display:flex;gap:8px;margin-top:14px;">
                    ${!currentUser ? `
                        <button class="gld-btn primary" onclick="window.location.href='/login/'">🔐 Войти</button>
                    ` : isMyGuild ? `
                        <button class="gld-btn secondary" onclick="gldLeave()">🚪 Покинуть</button>
                    ` : myGuildId ? `
                        <button class="gld-btn secondary" disabled style="opacity:0.5;cursor:not-allowed;">Вы уже в гильдии</button>
                    ` : isFull ? `
                        <button class="gld-btn secondary" disabled style="opacity:0.5;cursor:not-allowed;">🔒 Заполнена</button>
                    ` : `
                        <button class="gld-btn primary" onclick="gldJoin(${g.id})">➕ Вступить</button>
                    `}
                </div>
            </div>
        `;
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }

    // ============================================================
    // Экспорт
    // ============================================================
    window.gldOpenCreate = openCreateModal;
    window.gldJoin = joinGuild;
    window.gldLeave = leaveGuild;
    window.gldSetFilter = function(f) { activeFilter = f; render(); };

    let searchTimer;
    window.gldSearch = function(v) {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => { searchQuery = v; render(); }, 200);
    };

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
