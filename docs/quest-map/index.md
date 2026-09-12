---
title: 🗺️ Квест-карта
---

<h1 id="qm-title" style="text-align:center;">🗺️ Карта исследователя</h1>
<p style="text-align:center; color:#888; margin-top: -12px;">Твой путь по Марсу: изучено vs не изучено</p>

<div id="qm-container" style="max-width: 900px; margin: 20px auto; font-family: 'Segoe UI', sans-serif;">
    <p style="text-align:center; color:#999; padding: 40px;">Загрузка...</p>
</div>

<style>
.qm-zone {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 2px solid var(--kingdom-color, #6C63FF);
    padding: 20px 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
}
.qm-zone-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0 0 4px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}
.qm-progress {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 14px;
}
.qm-progress-bar {
    height: 6px;
    border-radius: 3px;
    background: rgba(0,0,0,0.08);
    margin: 8px 0 14px;
    overflow: hidden;
}
.qm-progress-bar > div {
    height: 100%;
    background: linear-gradient(90deg, var(--kingdom-color, #6C63FF), var(--kingdom-light, #A29BFE));
    border-radius: 3px;
    transition: width 0.8s;
}
.qm-points {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
}
.qm-point {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 10px;
    background: rgba(0,0,0,0.03);
    border: 2px solid transparent;
    text-decoration: none;
    color: inherit;
    font-size: 0.85rem;
    transition: all 0.25s;
    cursor: pointer;
}
.qm-point:hover {
    background: rgba(0,0,0,0.06);
    transform: translateY(-2px);
}
.qm-point.visited {
    border-color: var(--kingdom-color, #6C63FF);
    background: color-mix(in srgb, var(--kingdom-color, #6C63FF) 12%, transparent);
}
.qm-point.visited .qm-dot {
    background: var(--kingdom-color, #6C63FF);
    box-shadow: 0 0 10px var(--kingdom-color, #6C63FF);
}
.qm-point .qm-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    flex-shrink: 0;
}
.qm-point .qm-label {
    flex: 1;
    font-weight: 600;
    color: #1a1a1a;
}
.qm-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
}
.qm-stat {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    padding: 16px 20px;
    border-radius: 14px;
    text-align: center;
    border: 2px solid var(--kingdom-color, #6C63FF);
}
.qm-stat .qm-value {
    font-size: 1.8rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--kingdom-color, #6C63FF), var(--kingdom-light, #A29BFE));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.qm-stat .qm-label {
    font-size: 0.75rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 4px;
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
        'Утопия': { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' }
    };

    // Категории статей (можно расширить)
    const ZONES = {
        'Моря и вода': {
            icon: '🌊',
            places: ['acidalia-sea', 'argida', 'water-on-mars', 'kanaly-i-irrigatsiya']
        },
        'Города': {
            icon: '🏙️',
            places: ['okhasen', 'rogen-aria', 'akkha-kor']
        },
        'Храмы и пещеры': {
            icon: '🏛️',
            places: ['ksanf-temple', 'farsida-caves']
        },
        'Персонажи': {
            icon: '👤',
            places: ['hevsur', 'talin', 'ella', 'aratan-iii', 'yarra', 'alira']
        },
        'История': {
            icon: '📜',
            places: ['periodization', 'timeline', 'myths', 'dying-era']
        },
        'Астрономия': {
            icon: '🔭',
            places: ['phobos-deimos', 'mars-sky', 'earth-as-target']
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
    document.body.style.background = kingdom.bg;
    document.body.style.backgroundAttachment = 'fixed';

    // Считаем общий прогресс
    const allPlaces = Object.values(ZONES).flatMap(z => z.places);
    const totalPlaces = allPlaces.length;
    const visitedPlaces = allPlaces.filter(p => visits.has(p)).length;
    const percent = Math.round((visitedPlaces / totalPlaces) * 100);

    container.innerHTML = `
        <div class="qm-summary">
            <div class="qm-stat">
                <div class="qm-value">${visitedPlaces}</div>
                <div class="qm-label">Изучено</div>
            </div>
            <div class="qm-stat">
                <div class="qm-value">${totalPlaces - visitedPlaces}</div>
                <div class="qm-label">Осталось</div>
            </div>
            <div class="qm-stat">
                <div class="qm-value">${percent}%</div>
                <div class="qm-label">Прогресс</div>
            </div>
        </div>

        ${Object.entries(ZONES).map(([zoneName, zone]) => {
            const zoneVisited = zone.places.filter(p => visits.has(p)).length;
            const zoneTotal = zone.places.length;
            const zonePercent = Math.round((zoneVisited / zoneTotal) * 100);
            return `
                <div class="qm-zone">
                    <div class="qm-zone-title">${zone.icon} ${zoneName}</div>
                    <div class="qm-progress">${zoneVisited} из ${zoneTotal} изучено (${zonePercent}%)</div>
                    <div class="qm-progress-bar"><div style="width: ${zonePercent}%"></div></div>
                    <div class="qm-points">
                        ${zone.places.map(p => {
                            const isVisited = visits.has(p);
                            const label = p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                            return `
                                <a href="/${p}/" class="qm-point ${isVisited ? 'visited' : ''}">
                                    <span class="qm-dot"></span>
                                    <span class="qm-label">${label}</span>
                                    ${isVisited ? '<span>✓</span>' : ''}
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
