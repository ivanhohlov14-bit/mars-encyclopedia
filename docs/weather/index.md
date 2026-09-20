---
title: 🌡️ Погода на Марсе
comments: false
---

<div id="weather-app" style="max-width: 960px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">

<h1 id="weather-title" style="text-align:center; font-size: 2.2rem; letter-spacing: 2px; background: linear-gradient(135deg, #e74c3c, #f39c12); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 900;">🌡️ Погода на Марсе</h1>
<p style="text-align:center; color:#888; font-size:0.9rem; margin-bottom:32px;">Данные с марсоходов NASA</p>

<!-- Панель управления -->
<div id="controls" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; margin-bottom:20px;">
    <div style="display:flex; gap:8px;">
        <button id="rover-curiosity" class="rover-btn active" data-rover="curiosity" style="padding:8px 16px; border-radius:8px; border:2px solid #e74c3c; background:#e74c3c; color:white; font-weight:600; cursor:pointer;">Curiosity</button>
        <button id="rover-perseverance" class="rover-btn" data-rover="perseverance" style="padding:8px 16px; border-radius:8px; border:2px solid #ccc; background:transparent; color:#666; font-weight:600; cursor:pointer;">Perseverance</button>
    </div>
    <button id="refresh-btn" style="padding:8px 16px; border-radius:8px; border:2px solid #6C63FF; background:transparent; color:#6C63FF; font-weight:600; cursor:pointer;">🔄 Обновить</button>
</div>

<!-- Статус данных -->
<div id="data-status" style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:#888; margin-bottom:16px;">
    <div id="status-dot" style="width:8px; height:8px; border-radius:50%; background:#ccc;"></div>
    <span id="status-text">Загрузка данных...</span>
</div>

<!-- Сетка карточек -->
<div id="weather-cards" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:20px; margin-bottom:28px;"></div>

<!-- Историческая справка -->
<div class="block" style="background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); padding:24px; border-radius:16px; margin-bottom:24px; border:2px solid #e74c3c; box-shadow:0 4px 16px rgba(0,0,0,0.05);">
    <h3 style="color:#1a1a1a; margin:0 0 16px 0; font-size:1.15rem; font-weight:800; display:flex; align-items:center; gap:10px;">📊 История за последние 7 солей</h3>
    <div id="history-chart" style="overflow-x:auto;"></div>
</div>

<!-- Марсианский сезон -->
<div class="block" style="background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); padding:24px; border-radius:16px; margin-bottom:24px; border:2px solid #f39c12; box-shadow:0 4px 16px rgba(0,0,0,0.05);">
    <h3 style="color:#1a1a1a; margin:0 0 16px 0; font-size:1.15rem; font-weight:800; display:flex; align-items:center; gap:10px;">🌍 Марсианский сезон</h3>
    <div id="season-info" style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;"></div>
</div>

<!-- Сравнение с Землёй -->
<div class="block" style="background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); padding:24px; border-radius:16px; margin-bottom:24px; border:2px solid #6C63FF; box-shadow:0 4px 16px rgba(0,0,0,0.05);">
    <h3 style="color:#1a1a1a; margin:0 0 16px 0; font-size:1.15rem; font-weight:800; display:flex; align-items:center; gap:10px;">🌡️ Марс vs Земля</h3>
    <div id="earth-compare" style="font-size:0.9rem; line-height:1.8; color:#333;"></div>
</div>

<p style="margin-top:24px; text-align:center;">
    <a href="/" style="color:#e74c3c; font-weight:600;">← На главную</a>
</p>

</div>

<style>
:root {
    --weather-accent: #e74c3c;
    --weather-warm: #f39c12;
    --weather-cold: #3498db;
}
@keyframes weatherPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
}
@keyframes weatherFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes weatherSpin {
    to { transform: rotate(360deg); }
}
.weather-card {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(16px);
    border: 2px solid transparent;
    border-radius: 18px;
    padding: 22px 24px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    overflow: hidden;
    animation: weatherFadeIn 0.6s ease both;
}
.weather-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--weather-accent), var(--weather-warm));
    border-radius: 18px 18px 0 0;
}
.weather-card:hover {
    transform: translateY(-4px);
    border-color: var(--weather-accent);
    box-shadow: 0 16px 40px -8px rgba(231,76,60,0.3);
}
.weather-icon { font-size: 1.8rem; margin-bottom: 4px; }
.weather-value {
    font-size: 2rem;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.1;
    letter-spacing: -0.5px;
}
.weather-value .unit {
    font-size: 1rem;
    font-weight: 600;
    color: #888;
    margin-left: 4px;
}
.weather-label {
    font-size: 0.82rem;
    color: #777;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.weather-delta {
    font-size: 0.78rem;
    font-weight: 700;
    padding: 2px 10px;
    border-radius: 20px;
    display: inline-block;
    width: fit-content;
    margin-top: 4px;
}
.weather-delta.up { background: #fdecea; color: #e74c3c; }
.weather-delta.down { background: #e8f4fd; color: #3498db; }
.weather-delta.neutral { background: #f0f0f0; color: #888; }
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
}
.history-bar-value {
    font-size: 0.72rem;
    font-weight: 700;
    color: #e74c3c;
}
.history-bar-day {
    font-size: 0.72rem;
    color: #888;
    font-weight: 600;
}
.season-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 30px;
    font-weight: 800;
    font-size: 0.95rem;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.season-progress {
    flex: 1;
    min-width: 200px;
}
.season-progress-track {
    width: 100%;
    height: 12px;
    background: rgba(0,0,0,0.08);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 8px;
}
.season-progress-fill {
    height: 100%;
    border-radius: 6px;
    transition: width 0.8s ease;
}
@media (max-width: 600px) {
    #weather-title { font-size: 1.6rem !important; }
    .weather-value { font-size: 1.5rem; }
    .weather-card { padding: 16px; }
    .history-bar { min-width: 400px; height: 110px; }
}
html body.mars-stars-on .weather-card,
html body.mars-stars-on .block {
    background: rgba(30,30,46,0.85) !important;
    color: #d4d4e8 !important;
}
html body.mars-stars-on .weather-value { color: #e0e0e0; }
html body.mars-stars-on .weather-label { color: #aaa; }
html body.mars-stars-on .block h3 { color: #e0e0e0 !important; }
html body.mars-stars-on #earth-compare { color: #ccc; }
</style>

<script>
(function() {
    'use strict';

    // ============================================================
    // 🔌 ИСТОЧНИКИ ДАННЫХ
    // ============================================================
    const API_SOURCES = {
        curiosity: {
            // Основной источник - REMS (Curiosity)
            primary: 'https://cab.inta-csic.es/rems/rems_weather.json',
            // Резервный - MAAS2
            fallback: 'https://api.maas2.apollorion.com/',
            name: 'Curiosity (Gale Crater)'
        },
        perseverance: {
            // Для Perseverance - используем MAAS2 (за неимением лучшего)
            primary: 'https://api.maas2.apollorion.com/',
            fallback: null,
            name: 'Perseverance (Jezero Crater)'
        }
    };

    const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 минут
    const CACHE_TTL = 4 * 60 * 1000; // 4 минуты

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
        return {
            year: year,
            month: MARS_MONTHS[monthIdx],
            day: day,
            sol: sol
        };
    }

    // ============================================================
    // 🌍 МАРСИАНСКИЙ СЕЗОН
    // ============================================================
    function getSeason(ls) {
        if (ls === null || ls === undefined || ls === 0) {
            return { name: 'Неизвестно', emoji: '❓', color: '#888', progress: 0, ls: 0 };
        }
        const l = ((ls % 360) + 360) % 360;
        if (l >= 0 && l < 90) {
            return { name: 'Северная весна', emoji: '🌸', color: '#27ae60', progress: l / 90 * 100, ls: l };
        } else if (l >= 90 && l < 180) {
            return { name: 'Северное лето', emoji: '☀️', color: '#f39c12', progress: (l - 90) / 90 * 100, ls: l };
        } else if (l >= 180 && l < 270) {
            return { name: 'Северная осень', emoji: '🍂', color: '#e67e22', progress: (l - 180) / 90 * 100, ls: l };
        } else {
            return { name: 'Северная зима', emoji: '❄️', color: '#3498db', progress: (l - 270) / 90 * 100, ls: l };
        }
    }

    // ============================================================
    // 🌙 ФАЗЫ ЛУН
    // ============================================================
    function getMoonPhases(sol) {
        const phobosPhase = (sol * 3.1) % 1;
        const deimosPhase = (sol * 0.81) % 1;

        function phaseName(p) {
            if (p < 0.05 || p > 0.95) return { name: 'Новолуние', emoji: '🌑' };
            if (p < 0.22) return { name: 'Молодая', emoji: '🌒' };
            if (p < 0.28) return { name: 'Первая четверть', emoji: '🌓' };
            if (p < 0.47) return { name: 'Растущая', emoji: '🌔' };
            if (p < 0.53) return { name: 'Полнолуние', emoji: '🌕' };
            if (p < 0.72) return { name: 'Убывающая', emoji: '🌖' };
            if (p < 0.78) return { name: 'Последняя четверть', emoji: '🌗' };
            return { name: 'Старая', emoji: '🌘' };
        }
        return {
            phobos: phaseName(phobosPhase),
            deimos: phaseName(deimosPhase)
        };
    }

    // ============================================================
    // 🔄 ЗАГРУЗКА ДАННЫХ
    // ============================================================
    let currentRover = 'curiosity';
    let refreshTimer = null;
    let cachedData = {};

    async function fetchWeather(rover) {
        const sources = API_SOURCES[rover];
        const cacheKey = 'mars_weather_' + rover;

        // Проверяем кэш
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.data) {
                    console.log('📦 Погода из кэша:', rover);
                    return { data: parsed.data, fromCache: true };
                }
            }
        } catch(e) {}

        // Пробуем источники
        const urls = [sources.primary];
        if (sources.fallback) urls.push(sources.fallback);

        for (const url of urls) {
            try {
                const res = await fetch(url);
                if (!res.ok) continue;
                const json = await res.json();

                let data = null;
                if (url.includes('rems_weather.json')) {
                    data = parseREMS(json, rover);
                } else if (url.includes('maas2')) {
                    data = parseMAAS2(json, rover);
                }

                if (data) {
                    localStorage.setItem(cacheKey, JSON.stringify({
                        timestamp: Date.now(),
                        data: data
                    }));
                    console.log('✅ Погода получена:', url);
                    return { data: data, fromCache: false };
                }
            } catch(e) {
                console.warn('⚠️ Источник не ответил:', url, e.message);
            }
        }
        return { data: null, fromCache: false };
    }

    // ============================================================
    // 📖 ПАРСИНГ REMS (Curiosity)
    // ============================================================
    function parseREMS(json, rover) {
        if (!json) return null;
        return {
            sol: json.current_sol || json.sol || 0,
            minTemp: json.min_temp !== undefined ? parseFloat(json.min_temp) : null,
            maxTemp: json.max_temp !== undefined ? parseFloat(json.max_temp) : null,
            pressure: json.pressure !== undefined ? parseFloat(json.pressure) : null,
            opacity: json.atmo_opacity || json.opacity || 'Unknown',
            sunrise: json.sunrise || '—',
            sunset: json.sunset || '—',
            season: json.season || 'Unknown',
            ls: json.ls !== undefined ? parseFloat(json.ls) : null,
            windSpeed: json.wind_speed !== undefined ? parseFloat(json.wind_speed) : null,
            windDir: json.wind_direction !== undefined ? parseFloat(json.wind_direction) : null,
            uvIndex: json.local_uv_irradiance_index || null,
            groundMin: json.min_gts_temp || null,
            groundMax: json.max_gts_temp || null,
            rover: rover
        };
    }

    // ============================================================
    // 📖 ПАРСИНГ MAAS2
    // ============================================================
    function parseMAAS2(json, rover) {
        if (!json) return null;
        const d = json;
        return {
            sol: d.sol || 0,
            minTemp: d.min_temp !== undefined ? d.min_temp : null,
            maxTemp: d.max_temp !== undefined ? d.max_temp : null,
            pressure: d.pressure !== undefined ? d.pressure : null,
            opacity: d.atmo_opacity || 'Unknown',
            sunrise: d.sunrise || '—',
            sunset: d.sunset || '—',
            season: d.season || 'Unknown',
            ls: d.ls !== undefined ? d.ls : null,
            windSpeed: d.wind_speed !== undefined ? d.wind_speed : null,
            windDir: d.wind_direction !== undefined ? d.wind_direction : null,
            uvIndex: d.local_uv_irradiance_index || null,
            groundMin: d.min_gts_temp || null,
            groundMax: d.max_gts_temp || null,
            rover: rover
        };
    }

    // ============================================================
    // 🎨 РЕНДЕР КАРТОЧЕК
    // ============================================================
    function renderCards(data) {
        const cardsEl = document.getElementById('weather-cards');

        if (!data) {
            cardsEl.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#999;">⚠️ Не удалось загрузить данные. Попробуйте обновить позже.</div>';
            return;
        }

        const minC = data.minTemp;
        const maxC = data.maxTemp;
        const avgC = (minC !== null && maxC !== null) ? (minC + maxC) / 2 : null;
        const mars = marsDate(data.sol);
        const moons = getMoonPhases(data.sol);

        const cards = [
            {
                icon: '🌡️',
                label: 'Средняя температура',
                value: avgC !== null ? Math.round(avgC) : '—',
                unit: '°C',
                delta: avgC !== null ? (avgC < -60 ? 'Экстремальный холод' : avgC < -20 ? 'Очень холодно' : 'Холодно') : null,
                deltaClass: 'down'
            },
            {
                icon: '🔺',
                label: 'Максимум',
                value: maxC !== null ? Math.round(maxC) : '—',
                unit: '°C',
                sub: maxC !== null ? Math.round(toFahrenheit(maxC)) + '°F' : null
            },
            {
                icon: '🔻',
                label: 'Минимум',
                value: minC !== null ? Math.round(minC) : '—',
                unit: '°C',
                sub: minC !== null ? Math.round(toFahrenheit(minC)) + '°F' : null
            },
            {
                icon: '📊',
                label: 'Давление',
                value: data.pressure !== null ? Math.round(data.pressure) : '—',
                unit: 'Па',
                sub: data.pressure !== null ? (data.pressure / 100).toFixed(2) + ' гПа' : null
            },
            {
                icon: '🌫️',
                label: 'Атмосфера',
                value: data.opacity,
                unit: '',
                sub: data.opacity === 'Sunny' ? 'Ясно' : data.opacity === 'Cloudy' ? 'Облачно' : data.opacity === 'Dusty' ? 'Пыльно' : ''
            },
            {
                icon: '🌅',
                label: 'Восход',
                value: data.sunrise,
                unit: '',
                sub: 'Закат: ' + data.sunset
            },
            {
                icon: '💨',
                label: 'Ветер',
                value: data.windSpeed !== null ? data.windSpeed.toFixed(1) : '—',
                unit: 'м/с',
                sub: data.windDir !== null ? 'Направление: ' + Math.round(data.windDir) + '°' : null
            },
            {
                icon: '📅',
                label: 'Марсианская дата',
                value: mars.day + ' ' + mars.month,
                unit: '',
                sub: 'Год ' + mars.year + ' · Сол ' + data.sol
            }
        ];

        cardsEl.innerHTML = cards.map((c, i) => `
            <div class="weather-card" style="animation-delay: ${i * 0.05}s;">
                <span class="weather-icon">${c.icon}</span>
                <span class="weather-label">${c.label}</span>
                <span class="weather-value">${c.value}${c.unit ? '<span class="unit">' + c.unit + '</span>' : ''}</span>
                ${c.delta ? '<span class="weather-delta ' + (c.deltaClass || 'neutral') + '">' + c.delta + '</span>' : ''}
                ${c.sub ? '<span style="font-size:0.78rem;color:#888;margin-top:2px;">' + c.sub + '</span>' : ''}
            </div>
        `).join('');
    }

    // ============================================================
    // 📊 ИСТОРИЧЕСКАЯ СПРАВКА
    // ============================================================
    async function renderHistory() {
        const historyEl = document.getElementById('history-chart');
        historyEl.innerHTML = '<div style="text-align:center;padding:20px;color:#999;"><div style="display:inline-block;width:32px;height:32px;border:3px solid rgba(231,76,60,0.2);border-top-color:#e74c3c;border-radius:50%;animation:weatherSpin 0.8s linear infinite;"></div><p style="margin-top:8px;">Загрузка истории...</p></div>';

        try {
            const res = await fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json');
            if (!res.ok) throw new Error('Failed');
            const json = await res.json();

            const sols = (json.soles || []).slice(0, 7).reverse();
            if (sols.length === 0) throw new Error('No data');

            const minTemps = sols.map(s => parseFloat(s.min_temp)).filter(v => !isNaN(v));
            const maxTemps = sols.map(s => parseFloat(s.max_temp)).filter(v => !isNaN(v));
            const globalMin = Math.min.apply(null, minTemps.length ? minTemps : [-100]);
            const globalMax = Math.max.apply(null, maxTemps.length ? maxTemps : [0]);

            let html = '<div class="history-bar">';
            sols.forEach(s => {
                const minT = parseFloat(s.min_temp);
                const maxT = parseFloat(s.max_temp);
                if (isNaN(minT) || isNaN(maxT)) return;
                const heightPct = ((maxT - globalMin) / (globalMax - globalMin)) * 100;
                const avgT = (minT + maxT) / 2;
                const color = avgT < -50 ? '#3498db' : avgT < -20 ? '#5dade2' : '#f39c12';
                html += `
                    <div class="history-bar-item">
                        <span class="history-bar-value">${Math.round(avgT)}°</span>
                        <div class="history-bar-fill" style="height:${Math.max(heightPct, 8)}%; background:${color};"></div>
                        <span class="history-bar-day">${s.sol}</span>
                    </div>
                `;
            });
            html += '</div>';
            html += '<div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#aaa;margin-top:8px;padding:0 4px;">';
            html += '<span>← Старые солы</span>';
            html += '<span>Солы (последние 7) →</span>';
            html += '</div>';

            historyEl.innerHTML = html;
        } catch(e) {
            historyEl.innerHTML = '<div style="text-align:center;padding:20px;color:#999;">📭 Исторические данные временно недоступны</div>';
        }
    }

    // ============================================================
    // 🌍 СЕЗОН
    // ============================================================
    function renderSeason(data) {
        const el = document.getElementById('season-info');
        if (!data || data.ls === null || data.ls === undefined) {
            el.innerHTML = '<span style="color:#999;">Данные о сезоне временно недоступны</span>';
            return;
        }
        const s = getSeason(data.ls);
        el.innerHTML = `
            <div class="season-badge" style="background:${s.color};">
                <span style="font-size:1.4rem;">${s.emoji}</span>
                <span>${s.name}</span>
            </div>
            <div class="season-progress">
                <div style="display:flex;justify-content:space-between;font-size:0.82rem;color:#666;">
                    <span>Прогресс сезона</span>
                    <span><strong>${Math.round(s.progress)}%</strong> (Ls ${Math.round(s.ls)}°)</span>
                </div>
                <div class="season-progress-track">
                    <div class="season-progress-fill" style="width:${s.progress}%;background:linear-gradient(90deg,${s.color},${s.color}88);"></div>
                </div>
            </div>
        `;
    }

    // ============================================================
    // 🌍 СРАВНЕНИЕ С ЗЕМЛЁЙ
    // ============================================================
    function renderCompare(data) {
        const el = document.getElementById('earth-compare');
        if (!data) {
            el.innerHTML = '<span style="color:#999;">Данные временно недоступны</span>';
            return;
        }

        const marsAvg = (data.minTemp !== null && data.maxTemp !== null)
            ? Math.round((data.minTemp + data.maxTemp) / 2)
            : null;

        const earthTemp = 15;
        const diff = marsAvg !== null ? earthTemp - marsAvg : null;

        el.innerHTML = `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
                <div style="text-align:center;padding:16px;background:rgba(231,76,60,0.08);border-radius:12px;">
                    <div style="font-size:2rem;margin-bottom:6px;">🔴</div>
                    <div style="font-size:1.6rem;font-weight:900;color:#e74c3c;">${marsAvg !== null ? marsAvg + '°C' : '—'}</div>
                    <div style="font-size:0.82rem;color:#888;margin-top:4px;">Марс (${data.rover === 'curiosity' ? 'Гейл' : 'Езеро'})</div>
                </div>
                <div style="text-align:center;padding:16px;background:rgba(52,152,219,0.08);border-radius:12px;">
                    <div style="font-size:2rem;margin-bottom:6px;">🌍</div>
                    <div style="font-size:1.6rem;font-weight:900;color:#3498db;">~${earthTemp}°C</div>
                    <div style="font-size:0.82rem;color:#888;margin-top:4px;">Земля (среднее)</div>
                </div>
            </div>
            ${diff !== null ? `
                <div style="margin-top:16px;text-align:center;font-size:0.9rem;color:#555;padding:12px;background:rgba(108,99,255,0.08);border-radius:10px;">
                    На Марсе сейчас <strong style="color:#e74c3c;">на ${diff > 0 ? diff : Math.abs(diff)}°C ${diff > 0 ? 'холоднее' : 'теплее'}</strong>, чем на Земле
                </div>
            ` : ''}
            <div style="margin-top:12px;font-size:0.78rem;color:#aaa;text-align:center;">
                💡 Данные NASA обновляются с задержкой (марсоход передаёт их периодически)
            </div>
        `;
    }

    // ============================================================
    // 🔄 ОБНОВЛЕНИЕ СТАТУСА
    // ============================================================
    function updateStatus(fromCache, data) {
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');

        if (!data) {
            dot.style.background = '#e74c3c';
            text.textContent = 'Данные недоступны';
            return;
        }

        if (fromCache) {
            dot.style.background = '#f39c12';
            text.textContent = 'Данные из кэша (обновление при следующем запросе)';
        } else {
            dot.style.background = '#27ae60';
            const now = new Date();
            text.textContent = 'Свежие данные · Обновлено: ' + now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        }
    }

    // ============================================================
    // 🔄 ПЕРЕКЛЮЧАТЕЛЬ МАРСОХОДОВ
    // ============================================================
    function setupRoverSwitcher() {
        const buttons = document.querySelectorAll('.rover-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', async function() {
                buttons.forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                    b.style.borderColor = '#ccc';
                    b.style.color = '#666';
                });
                this.classList.add('active');
                this.style.background = '#e74c3c';
                this.style.borderColor = '#e74c3c';
                this.style.color = 'white';

                currentRover = this.dataset.rover;
                await loadData();
            });
        });
    }

    // ============================================================
    // 🔄 ЗАГРУЗКА ДАННЫХ
    // ============================================================
    async function loadData() {
        document.getElementById('last-update').textContent = 'Загрузка данных...';

        const result = await fetchWeather(currentRover);

        if (result.data) {
            updateStatus(result.fromCache, result.data);
        } else {
            updateStatus(false, null);
        }

        renderCards(result.data);
        renderSeason(result.data);
        renderCompare(result.data);
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    async function init() {
        setupRoverSwitcher();

        // Кнопка обновления
        document.getElementById('refresh-btn').addEventListener('click', async function() {
            this.textContent = '⏳ Обновление...';
            this.disabled = true;
            await loadData();
            this.textContent = '🔄 Обновить';
            this.disabled = false;
        });

        // Первая загрузка
        await loadData();

        // Автоматическое обновление каждые 5 минут
        refreshTimer = setInterval(loadData, REFRESH_INTERVAL);

        // Обновление при возврате на вкладку
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                loadData();
            }
        });

        renderHistory();

        console.log('🌡️ Погода на Марсе загружена (VIP)');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
