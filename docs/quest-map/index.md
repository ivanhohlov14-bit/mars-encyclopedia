---
title: 🗺️ Квест-карта
comments: false
---

<h1 id="qm-title" style="text-align:center;">🗺️ Карта исследователя</h1>
<p style="text-align:center; color:#888; margin-top: -12px;">Твой путь по Марсу: изучено vs не изучено</p>

<div id="qm-container" style="max-width: 960px; margin: 20px auto; font-family: 'Segoe UI', sans-serif;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: qmSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка...</p>
    </div>
</div>

<style>
@keyframes qmSpin { to { transform: rotate(360deg); } }
@keyframes qmFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

#qm-container a { text-decoration: none !important; border-bottom: none !important; }

.qm-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 28px;
}

.qm-stat {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    padding: 22px 20px;
    border-radius: 16px;
    text-align: center;
    border: 2px solid var(--kingdom-color, #6C63FF);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    animation: qmFadeIn 0.5s ease both;
}

.qm-stat:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -8px var(--kingdom-shadow, rgba(108,99,255,0.4));
}

.qm-stat .qm-value {
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--kingdom-color, #6C63FF), var(--kingdom-light, #A29BFE));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
}

.qm-stat .qm-label {
    font-size: 0.75rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-top: 8px;
    font-weight: 600;
}

.qm-zone {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 2px solid var(--kingdom-color, #6C63FF);
    padding: 24px 28px;
    margin-bottom: 20px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
    animation: qmFadeIn 0.6s ease both;
    transition: box-shadow 0.3s;
}

.qm-zone:hover {
    box-shadow: 0 16px 40px -8px var(--kingdom-shadow, rgba(108,99,255,0.35));
}

.qm-zone-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.qm-zone-title .qm-zone-icon {
    font-size: 1.6rem;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
}

.qm-progress {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 12px;
    font-weight: 600;
}

.qm-progress-bar {
    height: 8px;
    border-radius: 4px;
    background: rgba(0,0,0,0.08);
    margin: 8px 0 18px;
    overflow: hidden;
}

.qm-progress-bar > div {
    height: 100%;
    background: linear-gradient(90deg, var(--kingdom-color, #6C63FF), var(--kingdom-light, #A29BFE));
    border-radius: 4px;
    transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 12px var(--kingdom-shadow, rgba(108,99,255,0.5));
}

.qm-points {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 10px;
}

.qm-point {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    background: rgba(0,0,0,0.03);
    border: 2px solid transparent;
    text-decoration: none;
    color: inherit;
    font-size: 0.9rem;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    font-weight: 600;
}

.qm-point:hover {
    background: rgba(0,0,0,0.06);
    transform: translateY(-3px);
    border-color: var(--kingdom-color, #6C63FF);
}

.qm-point.visited {
    border-color: var(--kingdom-color, #6C63FF);
    background: color-mix(in srgb, var(--kingdom-color, #6C63FF) 12%, transparent);
}

.qm-point.visited .qm-dot {
    background: var(--kingdom-color, #6C63FF);
    box-shadow: 0 0 12px var(--kingdom-color, #6C63FF);
    animation: qmPulse 2s ease-in-out infinite;
}

@keyframes qmPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
}

.qm-point .qm-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    flex-shrink: 0;
    transition: all 0.3s;
}

.qm-point .qm-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.qm-point .qm-check {
    color: var(--kingdom-color, #6C63FF);
    font-weight: 800;
    font-size: 1.1rem;
}

@media (prefers-color-scheme: dark) {
    .qm-zone, .qm-stat { background: rgba(30, 30, 46, 0.85); }
    .qm-zone-title { color: #e0e0e0; }
    .qm-point { background: rgba(255,255,255,0.05); }
    .qm-point:hover { background: rgba(255,255,255,0.08); }
}

@media (max-width: 600px) {
    .qm-zone { padding: 18px 16px; }
    .qm-points { grid-template-columns: 1fr; }
    .qm-zone-title { font-size: 1.05rem; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(async function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
        'Эдем': { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' },
        'Кимерия': { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9' },
        'Утопия': { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' },
        'Эллада': { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91' }
    };

    // Зоны (можно расширить)
    const ZONES = {
        'Моря и вода': {
            icon: '🌊',
            places: [
                { id: 'geography/acidalia-sea', name: 'Ацидалийское море' },
                { id: 'geography/argida', name: 'Море Аргида' },
                { id: 'water-on-mars', name: 'Вода на Марсе' },
                { id: 'technology/canals', name: 'Каналы и ирригация' }
            ]
        },
        'Города': {
            icon: '🏙️',
            places: [
                { id: 'geography/okhasen', name: 'Окхасен' },
                { id: 'geography/rogen-aria', name: 'Роген-Ария' },
                { id: 'geography/akkha-kor', name: 'Акха-Кор' }
            ]
        },
        'Храмы и пещеры': {
            icon: '🏛️',
            places: [
                { id: 'geography/ksanf-temple', name: 'Храм Ксанфа' },
                { id: 'geography/farsida-caves', name: 'Пещеры Фарсиды' }
            ]
        },
        'Персонажи': {
            icon: '👤',
            places: [
                { id: 'people/hevsur', name: 'Хевсур' },
                { id: 'people/talin', name: 'Талин' },
                { id: 'people/ella', name: 'Элла' },
                { id: 'people/aratan-iii', name: 'Аратан III' },
                { id: 'people/yarra', name: 'Йарра' },
                { id: 'people/alira', name: 'Алира' },
                { id: 'people/miran', name: 'Миран' },
                { id: 'people/irayna', name: 'Ирайна' }
            ]
        },
        'История': {
            icon: '📜',
            places: [
                { id: 'history/periodization', name: 'Периодизация' },
                { id: 'history/timeline', name: 'Хронология' },
                { id: 'history/myths', name: 'Мифы' },
                { id: 'history/dying-era', name: 'Эпоха Умирания' }
            ]
        },
        'Астрономия': {
            icon: '🔭',
            places: [
                { id: 'astronomy/phobos-deimos', name: 'Фобос и Деймос' },
                { id: 'astronomy/mars-sky', name: 'Звёздное небо Марса' },
                { id: 'astronomy/earth-as-target', name: 'Земля как цель' }
            ]
        },
        'Культура': {
            icon: '🎭',
            places: [
                { id: 'culture/calendar', name: 'Календарь' },
                { id: 'culture/social-structure', name: 'Социальная структура' },
                { id: 'culture/daily-life', name: 'Повседневная жизнь' },
                { id: 'svitok-e', name: 'Письменность' }
            ]
        }
    };

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const container = document.getElementById('qm-container');

    const { data: { session } } = await client.auth.getSession();
    let kingdom = KINGDOMS['Эдем'];
    let visits = new Set();

    if (session?.user) {
        const { data: profile } = await client.from('profiles').select('kingdom').eq('user_id', session.user.id).single();
        if (profile?.kingdom && KINGDOMS[profile.kingdom]) kingdom = KINGDOMS[profile.kingdom];

        const { data: v } = await client.from('user_visits')
            .select('place_id').eq('user_id', session.user.id);
        visits = new Set((v || []).map(x => x.place_id));
    }

    document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
    document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
    document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
    document.body.style.background = kingdom.bg;
    document.body.style.backgroundAttachment = 'fixed';

    const allPlaces = Object.values(ZONES).flatMap(z => z.places);
    const totalPlaces = allPlaces.length;
    const visitedPlaces = allPlaces.filter(p => visits.has(p.id) || visits.has(p.id.split('/').pop())).length;
    const percent = totalPlaces > 0 ? Math.round((visitedPlaces / totalPlaces) * 100) : 0;

    container.innerHTML = `
        <div class="qm-summary">
            <div class="qm-stat" style="animation-delay: 0s;">
                <div class="qm-value">${visitedPlaces}</div>
                <div class="qm-label">Изучено</div>
            </div>
            <div class="qm-stat" style="animation-delay: 0.1s;">
                <div class="qm-value">${totalPlaces - visitedPlaces}</div>
                <div class="qm-label">Осталось</div>
            </div>
            <div class="qm-stat" style="animation-delay: 0.2s;">
                <div class="qm-value">${percent}%</div>
                <div class="qm-label">Прогресс</div>
            </div>
        </div>

        ${Object.entries(ZONES).map(([zoneName, zone], zIdx) => {
            const zoneVisited = zone.places.filter(p => visits.has(p.id) || visits.has(p.id.split('/').pop())).length;
            const zoneTotal = zone.places.length;
            const zonePercent = zoneTotal > 0 ? Math.round((zoneVisited / zoneTotal) * 100) : 0;
            return `
                <div class="qm-zone" style="animation-delay: ${(zIdx + 3) * 0.08}s;">
                    <div class="qm-zone-title">
                        <span class="qm-zone-icon">${zone.icon}</span>
                        <span>${zoneName}</span>
                    </div>
                    <div class="qm-progress">${zoneVisited} из ${zoneTotal} изучено (${zonePercent}%)</div>
                    <div class="qm-progress-bar"><div style="width: ${zonePercent}%"></div></div>
                    <div class="qm-points">
                        ${zone.places.map(p => {
                            const isVisited = visits.has(p.id) || visits.has(p.id.split('/').pop());
                            return `
                                <a href="/${p.id}/" class="qm-point ${isVisited ? 'visited' : ''}">
                                    <span class="qm-dot"></span>
                                    <span class="qm-label">${p.name}</span>
                                    ${isVisited ? '<span class="qm-check">✓</span>' : ''}
                                </a>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('')}
    `;
})();
</script>
