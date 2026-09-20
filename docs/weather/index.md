---
title: 🌡️ Погода на Марсе
comments: false
---

<div id="weather-app" style="max-width: 960px; margin: 0 auto; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; padding: 0 8px;">

<h1 id="weather-title" style="text-align:center; font-size: 2.2rem; letter-spacing: 2px; background: linear-gradient(135deg, #6C63FF, #A29BFE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 900;">🌡️ Погода на Марсе</h1>
<p style="text-align:center; color:#9999bb; font-size:0.9rem; margin-bottom:32px;">Данные с марсохода NASA Curiosity (прибор REMS) · Обновление каждые 5 минут</p>

<!-- Панель управления -->
<div id="controls" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; margin-bottom:20px;">
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="rover-btn active" data-rover="curiosity">Curiosity</button>
        <button class="rover-btn" data-rover="perseverance">Perseverance</button>
    </div>
    <button id="refresh-btn">Обновить</button>
</div>

<!-- Статус данных -->
<div id="data-status" style="display:flex; align-items:center; gap:10px; font-size:0.82rem; color:#9999bb; margin-bottom:20px; padding:10px 16px; background: rgba(26,26,46,0.6); border-radius: 12px; border: 1px solid rgba(108,99,255,0.2);">
    <div id="status-dot" style="width:8px; height:8px; border-radius:50%; background:#9999bb; transition: all 0.3s;"></div>
    <span id="status-text">Загрузка данных...</span>
</div>

<!-- Сетка карточек -->
<div id="weather-cards" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:28px;"></div>

<!-- Историческая справка -->
<div class="cosmic-block">
    <h3 class="block-title"><span>📊</span> История за последние 7 солей</h3>
    <div id="history-chart" style="overflow-x:auto;"></div>
</div>

<!-- Марсианский сезон -->
<div class="cosmic-block">
    <h3 class="block-title"><span>🌍</span> Марсианский сезон</h3>
    <div id="season-info" style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;"></div>
</div>

<!-- Сравнение с Землёй -->
<div class="cosmic-block">
    <h3 class="block-title"><span>🌡️</span> Марс vs Земля</h3>
    <div id="earth-compare" style="font-size:0.9rem; line-height:1.8;"></div>
</div>

<p style="margin-top:32px; text-align:center;">
    <a href="/" style="color:#A29BFE; font-weight:600; text-decoration:none;">← На главную</a>
</p>

</div>

<style>
/* ============================================================ */
/* 🌌 VIP Тёмный космический стиль                              */
/* ============================================================ */
#weather-app {
    --c-bg-1: #1a1a2e;
    --c-bg-2: #252550;
    --c-accent: #6C63FF;
    --c-accent-light: #A29BFE;
    --c-text: #e8e8f0;
    --c-text-dim: #9999bb;
    --c-border: rgba(108, 99, 255, 0.4);
    --c-glow: rgba(108, 99, 255, 0.5);
    color: var(--c-text);
}

/* Анимации */
@keyframes cosmicFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes cosmicSpin {
    to { transform: rotate(360deg); }
}
@keyframes cosmicPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(108,99,255,0.6); }
    50% { box-shadow: 0 0 0 12px rgba(108,99,255,0); }
}

/* Кнопки-пилюли */
.rover-btn, #refresh-btn {
    background: rgba(26, 26, 46, 0.7);
    color: var(--c-text-dim);
    border: 1.5px solid rgba(108, 99, 255, 0.3);
    border-radius: 24px;
    padding: 10px 22px;
    font-weight: 700;
    font-size: 0.88rem;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
}
.rover-btn:hover, #refresh-btn:hover {
    transform: translateY(-2px);
    border-color: var(--c-accent);
    color: var(--c-text);
    box-shadow: 0 4px 16px rgba(108, 99, 255, 0.3);
}
.rover-btn.active {
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 4px 16px rgba(108, 99, 255, 0.5);
}
#refresh-btn:disabled {
    opacity: 0.6;
    cursor: wait;
}

/* Карточки */
.weather-card {
    background: linear-gradient(135deg, #1a1a2e, #252550);
    border: 1.5px solid rgba(108, 99, 255, 0.4);
    border-radius: 16px;
    padding: 20px 22px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    overflow: hidden;
    animation: cosmicFadeIn 0.5s ease both;
}
.weather-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6C63FF, #A29BFE);
    border-radius: 16px 16px 0 0;
}
.weather-card:hover {
    transform: translateY(-3px);
    border-color: var(--c-accent);
    box-shadow: 0 8px 28px rgba(108, 99, 255, 0.4);
}
.weather-icon { font-size: 1.6rem; margin-bottom: 2px; }
.weather-label {
    font-size: 0.72rem;
    color: var(--c-text-dim);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
}
.weather-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--c-text);
    line-height: 1.1;
    letter-spacing: -0.5px;
    display: flex;
    align-items: baseline;
    gap: 4px;
}
.weather-value .unit {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--c-text-dim);
}
.weather-sub {
    font-size: 0.75rem;
    color: var(--c-text-dim);
    margin-top: 2px;
}
.weather-badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    display: inline-block;
    width: fit-content;
    margin-top: 4px;
    background: rgba(108, 99, 255, 0.15);
    color: var(--c-accent-light);
    border: 1px solid rgba(108, 99, 255, 0.3);
}

/* Тёмные блоки */
.cosmic-block {
    background: linear-gradient(135deg, #1a1a2e, #252550);
    border: 1.5px solid rgba(108, 99, 255, 0.4);
    border-radius: 16px;
    padding: 22px 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    animation: cosmicFadeIn 0.6s ease both;
}
.block-title {
    color: var(--c-text);
    margin: 0 0 16px 0;
    font-size: 1.05rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 10px;
    letter-spacing: 0.3px;
}

/* История */
.history-bar {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 140px;
    padding: 0 4px;
    min-width: 500px;
}
.history-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    height: 100%;
    justify-content: flex-end;
}
.history-bar-fill {
    width: 100%;
    border-radius: 8px 8px 0 0;
    min-height: 6px;
    transition: height 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 12px currentColor;
}
.history-bar-value {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--c-accent-light);
}
.history-bar-day {
    font-size: 0.7rem;
    color: var(--c-text-dim);
    font-weight: 600;
}

/* Сезон */
.season-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 30px;
    font-weight: 800;
    font-size: 0.95rem;
    color: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.35);
}
.season-progress {
    flex: 1;
    min-width: 200px;
}
.season-progress-track {
    width: 100%;
    height: 12px;
    background: rgba(108, 99, 255, 0.15);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 8px;
    border: 1px solid rgba(108,99,255,0.2);
}
.season-progress-fill {
    height: 100%;
    border-radius: 6px;
    transition: width 1s ease;
    box-shadow: 0 0 12px currentColor;
}

/* Спиннер */
.cosmic-spinner {
    display: inline-block;
    width: 32px;
    height: 32px;
    border: 3px solid rgba(108,99,255,0.2);
    border-top-color: var(--c-accent);
    border-radius: 50%;
    animation: cosmicSpin 0.8s linear infinite;
}

/* Мобильная адаптация */
@media (max-width: 600px) {
    #weather-title { font-size: 1.6rem !important; }
    .weather-value { font-size: 1.5rem; }
    .weather-card { padding: 16px; }
    .history-bar { min-width: 400px; height: 110px; }
    .rover-btn, #refresh-btn { padding: 8px 16px; font-size: 0.82rem; }
    .cosmic-block { padding: 18px 16px; }
}
</style>

<script>
(function() {
    'use strict';

    // ============================================================
    // 🔌 ИСТОЧНИК ДАННЫХ (NASA REMS — работает без CORS)
    // ============================================================
    const NASA_MSL_URL = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json';
    const CACHE_TTL = 10 * 60 * 1000; // 10 минут

    // ============================================================
    // 🌡️ КОНВЕРТАЦИЯ
    // ============================================================
    function toFahrenheit(c) {
        return Math.round(c * 9 / 5 + 32);
    }

    // ============================================================
    // 📅 МАРСИАНСКИЙ КАЛЕНДАРЬ
    // ============================================================
    const MARS_MONTHS = [
        'Ākha-dzen', 'Kōl-khan', 'Dzen-ākha', 'Khōsen',
        'Mar-dzen', 'Ariya-mar', 'Zal-ākha', 'Thal-khō',
        'Kōl-ghar', 'Mōr-ākha', 'Dzen-kōl', 'Xal-mar',
        'Lān-sen', 'Khō-mōr', 'Ākha-mōr', 'Kōl-suf',
        'Dzen-thal', 'Ghōl-ākha', 'Rōg-ari', 'Mar-lān',
        'Ksanf-suf', 'Yar-okh'
    ];

    function marsDate(sol) {
        const solsInYear = 668.6;
        const year = Math.floor(sol / solsInYear) + 1;
        const solInYear = sol % solsInYear;
        const monthIdx = Math.floor((solInYear / solsInYear) * 22) % 22;
        const day = Math.floor((solInYear / solsInYear) * 22 * 30) % 30 + 1;
        return { year, month: MARS_MONTHS[monthIdx], day, sol };
    }

    // ============================================================
    // 🌍 СЕЗОН
    // ============================================================
    function getSeason(ls) {
        if (ls === null || ls === undefined) {
            return { name: 'Неизвестно', emoji: '❓', color: '#9999bb', progress: 0, ls: 0 };
        }
        const l = ((ls % 360) + 360) % 360;
        if (l < 90) return { name: 'Северная весна', emoji: '🌸', color: '#27ae60', progress: l / 90 * 100, ls: l };
        if (l < 180) return { name: 'Северное лето', emoji: '☀️', color: '#f39c12', progress: (l - 90) / 90 * 100, ls: l };
        if (l < 270) return { name: 'Северная осень', emoji: '🍂', color: '#e67e22', progress: (l - 180) / 90 * 100, ls: l };
        return { name: 'Северная зима', emoji: '❄️', color: '#3498db', progress: (l - 270) / 90 * 100, ls: l };
    }

    // ============================================================
    // 🔄 ПАРСИНГ NASA REMS
    // ============================================================
    function parseNASA(json) {
        if (!json || !json.soles || !json.soles.length) return null;
        // API возвращает солы в порядке от новых к старым
        const s = json.soles[0];
        return {
            sol: parseInt(s.sol, 10) || 0,
            minTemp: s.min_temp !== undefined ? parseFloat(s.min_temp) : null,
            maxTemp: s.max_temp !== undefined ? parseFloat(s.max_temp) : null,
            pressure: s.pressure !== undefined ? parseFloat(s.pressure) : null,
            opacity: s.atmo_opacity || 'Unknown',
            sunrise: s.sunrise || '—',
            sunset: s.sunset || '—',
            ls: s.ls !== undefined ? parseFloat(s.ls) : null,
            windSpeed: s.wind_speed !== undefined ? parseFloat(s.wind_speed) : null,
            windDir: s.wind_direction !== undefined ? parseFloat(s.wind_direction) : null,
            rover: 'curiosity'
        };
    }

    // ============================================================
    // 🔄 ЗАГРУЗКА
    // ============================================================
    let currentRover = 'curiosity';
    let refreshTimer = null;

    async function fetchWeather(rover) {
        const cacheKey = 'mars_weather_nasa_' + rover;

        // Кэш
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.data) {
                    return { data: parsed.data, fromCache: true };
                }
            }
        } catch(e) {}

        // NASA API
        try {
            const res = await fetch(NASA_MSL_URL);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const json = await res.json();

            const data = parseNASA(json);
            if (data && data.sol) {
                localStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    data: data
                }));
                return { data, fromCache: false };
            }
        } catch(e) {
            console.warn('⚠️ NASA API не ответил:', e.message);
        }
        return { data: null, fromCache: false };
    }

    // ============================================================
    // 🎨 РЕНДЕР КАРТОЧЕК
    // ============================================================
    function renderCards(data) {
        const cardsEl = document.getElementById('weather-cards');

        if (!data) {
            cardsEl.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#9999bb;">⚠️ Не удалось загрузить данные. Попробуйте обновить позже.</div>';
            return;
        }

        const minC = data.minTemp;
        const maxC = data.maxTemp;
        const avgC = (minC !== null && maxC !== null) ? (minC + maxC) / 2 : null;
        const mars = marsDate(data.sol);

        const cards = [
            { icon: '🌡️', label: 'Средняя температура',
              value: avgC !== null ? Math.round(avgC) : '—', unit: '°C',
              badge: avgC !== null ? (avgC < -60 ? 'Экстремальный холод' : avgC < -20 ? 'Очень холодно' : 'Холодно') : null },
            { icon: '🔺', label: 'Максимум',
              value: maxC !== null ? Math.round(maxC) : '—', unit: '°C',
              sub: maxC !== null ? Math.round(toFahrenheit(maxC)) + '°F' : null },
            { icon: '🔻', label: 'Минимум',
              value: minC !== null ? Math.round(minC) : '—', unit: '°C',
              sub: minC !== null ? Math.round(toFahrenheit(minC)) + '°F' : null },
            { icon: '📊', label: 'Давление',
              value: data.pressure !== null ? Math.round(data.pressure) : '—', unit: 'Па',
              sub: data.pressure !== null ? (data.pressure / 100).toFixed(2) + ' гПа' : null },
            { icon: '🌫️', label: 'Атмосфера',
              value: data.opacity === 'Sunny' ? 'Ясно' : data.opacity === 'Cloudy' ? 'Облачно' : data.opacity === 'Dusty' ? 'Пыльно' : data.opacity,
              unit: '' },
            { icon: '🌅', label: 'Восход / Закат',
              value: data.sunrise, unit: '',
              sub: 'Закат: ' + data.sunset },
            { icon: '💨', label: 'Ветер',
              value: data.windSpeed !== null ? data.windSpeed.toFixed(1) : '—', unit: 'м/с',
              sub: data.windDir !== null ? 'Направление: ' + Math.round(data.windDir) + '°' : null },
            { icon: '📅', label: 'Марсианская дата',
              value: mars.day + ' ' + mars.month, unit: '',
              sub: 'Год ' + mars.year + ' · Сол ' + data.sol }
        ];

        cardsEl.innerHTML = cards.map((c, i) => `
            <div class="weather-card" style="animation-delay: ${i * 0.05}s;">
                <span class="weather-icon">${c.icon}</span>
                <span class="weather-label">${c.label}</span>
                <span class="weather-value">${c.value}${c.unit ? '<span class="unit">' + c.unit + '</span>' : ''}</span>
                ${c.badge ? '<span class="weather-badge">' + c.badge + '</span>' : ''}
                ${c.sub ? '<span class="weather-sub">' + c.sub + '</span>' : ''}
            </div>
        `).join('');
    }

    // ============================================================
    // 📊 ИСТОРИЯ
    // ============================================================
    async function renderHistory() {
        const historyEl = document.getElementById('history-chart');
        const cacheKey = 'mars_history_7sols';

        // Кэш истории — 1 час
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
                    drawHistory(parsed.sols);
                    return;
                }
            }
        } catch(e) {}

        historyEl.innerHTML = '<div style="text-align:center;padding:20px;color:#9999bb;"><div class="cosmic-spinner"></div><p style="margin-top:10px;font-size:0.82rem;">Загрузка истории...</p></div>';

        try {
            const res = await fetch(NASA_MSL_URL);
            if (!res.ok) throw new Error('Failed');
            const json = await res.json();
            const sols = (json.soles || []).slice(0, 7).reverse();
            if (sols.length === 0) throw new Error('No data');

            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: Date.now(),
                sols: sols
            }));
            drawHistory(sols);
        } catch(e) {
            historyEl.innerHTML = '<div style="text-align:center;padding:20px;color:#9999bb;">📭 Исторические данные временно недоступны</div>';
        }
    }

    function drawHistory(sols) {
        const historyEl = document.getElementById('history-chart');
        const minTemps = sols.map(s => parseFloat(s.min_temp)).filter(v => !isNaN(v));
        const maxTemps = sols.map(s => parseFloat(s.max_temp)).filter(v => !isNaN(v));
        const globalMin = Math.min(...(minTemps.length ? minTemps : [-100]));
        const globalMax = Math.max(...(maxTemps.length ? maxTemps : [0]));

        let html = '<div class="history-bar">';
        sols.forEach(s => {
            const minT = parseFloat(s.min_temp);
            const maxT = parseFloat(s.max_temp);
            if (isNaN(minT) || isNaN(maxT)) return;
            const heightPct = ((maxT - globalMin) / (globalMax - globalMin)) * 100;
            const avgT = (minT + maxT) / 2;
            const color = avgT < -50 ? '#3498db' : avgT < -20 ? '#6C63FF' : '#A29BFE';
            html += `
                <div class="history-bar-item">
                    <span class="history-bar-value">${Math.round(avgT)}°</span>
                    <div class="history-bar-fill" style="height:${Math.max(heightPct, 8)}%; background: linear-gradient(180deg, ${color}, ${color}88); color: ${color};"></div>
                    <span class="history-bar-day">${s.sol}</span>
                </div>
            `;
        });
        html += '</div>';
        html += '<div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#9999bb;margin-top:10px;padding:0 4px;">';
        html += '<span>← Старые солы</span>';
        html += '<span>Последние 7 солей →</span>';
        html += '</div>';

        historyEl.innerHTML = html;
    }

    // ============================================================
    // 🌍 СЕЗОН
    // ============================================================
    function renderSeason(data) {
        const el = document.getElementById('season-info');
        if (!data || data.ls === null || data.ls === undefined) {
            el.innerHTML = '<span style="color:#9999bb;">Данные о сезоне временно недоступны</span>';
            return;
        }
        const s = getSeason(data.ls);
        el.innerHTML = `
            <div class="season-badge" style="background: linear-gradient(135deg, ${s.color}, ${s.color}aa);">
                <span style="font-size:1.3rem;">${s.emoji}</span>
                <span>${s.name}</span>
            </div>
            <div class="season-progress">
                <div style="display:flex;justify-content:space-between;font-size:0.82rem;color:#9999bb;">
                    <span>Прогресс сезона</span>
                    <span style="color:#A29BFE;font-weight:700;">${Math.round(s.progress)}% · Ls ${Math.round(s.ls)}°</span>
                </div>
                <div class="season-progress-track">
                    <div class="season-progress-fill" style="width:${s.progress}%;background:linear-gradient(90deg,${s.color},${s.color}88); color:${s.color};"></div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // 🌍 СРАВНЕНИЕ
    // ============================================================
    function renderCompare(data) {
        const el = document.getElementById('earth-compare');
        if (!data) {
            el.innerHTML = '<span style="color:#9999bb;">Данные временно недоступны</span>';
            return;
        }

        const marsAvg = (data.minTemp !== null && data.maxTemp !== null)
            ? Math.round((data.minTemp + data.maxTemp) / 2)
            : null;
        const earthTemp = 15;
        const diff = marsAvg !== null ? earthTemp - marsAvg : null;

        el.innerHTML = `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div style="text-align:center;padding:20px;background: linear-gradient(135deg, rgba(231,76,60,0.15), rgba(231,76,60,0.05));border-radius:14px;border:1.5px solid rgba(231,76,60,0.3);">
                    <div style="font-size:2rem;margin-bottom:6px;">🔴</div>
                    <div style="font-size:1.7rem;font-weight:900;color:#e74c3c;">${marsAvg !== null ? marsAvg + '°C' : '—'}</div>
                    <div style="font-size:0.82rem;color:#9999bb;margin-top:6px;">Марс (Гейл)</div>
                </div>
                <div style="text-align:center;padding:20px;background: linear-gradient(135deg, rgba(52,152,219,0.15), rgba(52,152,219,0.05));border-radius:14px;border:1.5px solid rgba(52,152,219,0.3);">
                    <div style="font-size:2rem;margin-bottom:6px;">🌍</div>
                    <div style="font-size:1.7rem;font-weight:900;color:#3498db;">~${earthTemp}°C</div>
                    <div style="font-size:0.82rem;color:#9999bb;margin-top:6px;">Земля (среднее)</div>
                </div>
            </div>
            ${diff !== null ? `
                <div style="margin-top:16px;text-align:center;font-size:0.9rem;color:#e8e8f0;padding:14px;background: rgba(108,99,255,0.12);border-radius:12px;border:1px solid rgba(108,99,255,0.3);">
                    На Марсе сейчас <strong style="color:#A29BFE;">на ${Math.abs(diff)}°C ${diff > 0 ? 'холоднее' : 'теплее'}</strong>, чем на Земле
                </div>
            ` : ''}
        `;
    }

    // ============================================================
    // 🔄 СТАТУС
    // ============================================================
    function updateStatus(fromCache, data) {
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');

        if (!data) {
            dot.style.background = '#e74c3c';
            dot.style.boxShadow = '0 0 10px #e74c3c';
            text.textContent = 'Данные недоступны';
            return;
        }

        if (fromCache) {
            dot.style.background = '#f39c12';
            dot.style.boxShadow = '0 0 10px #f39c12';
            text.textContent = 'Данные из кэша · Свежие будут при следующем обновлении';
        } else {
            dot.style.background = '#27ae60';
            dot.style.boxShadow = '0 0 10px #27ae60';
            const now = new Date();
            text.textContent = 'Свежие данные · ' + now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        }
    }

    // ============================================================
    // 🔄 ПЕРЕКЛЮЧАТЕЛЬ
    // ============================================================
    function setupRoverSwitcher() {
        const buttons = document.querySelectorAll('.rover-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', async function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentRover = this.dataset.rover;
                await loadData();
            });
        });
    }

    // ============================================================
    // 🔄 ЗАГРУЗКА
    // ============================================================
    async function loadData() {
        const result = await fetchWeather(currentRover);

        updateStatus(result.fromCache, result.data);
        renderCards(result.data);
        renderSeason(result.data);
        renderCompare(result.data);
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    async function init() {
        setupRoverSwitcher();

        document.getElementById('refresh-btn').addEventListener('click', async function() {
            this.textContent = 'Загрузка...';
            this.disabled = true;
            // Сбрасываем кэш чтобы получить свежие данные
            try { localStorage.removeItem('mars_weather_nasa_' + currentRover); } catch(e) {}
            await loadData();
            this.textContent = 'Обновить';
            this.disabled = false;
        });

        await loadData();
        refreshTimer = setInterval(loadData, 5 * 60 * 1000);

        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) loadData();
        });

        renderHistory();
        console.log('🌌 VIP-погода на Марсе загружена (NASA REMS)');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
