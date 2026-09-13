---
title: 🌡️ Погода на Марсе
comments: false
---

<div id="weather-app" style="max-width: 960px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">

<h1 id="weather-title" style="text-align:center; font-size: 2.2rem; letter-spacing: 2px; background: linear-gradient(135deg, #e74c3c, #f39c12); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 900;">🌡️ Погода на Марсе</h1>
<p style="text-align:center; color:#888; font-size:0.9rem; margin-bottom:32px;">Реальные данные с марсохода NASA Curiosity (кратер Гейла)</p>

<!-- Живой счётчик -->
<div id="live-counter" style="display:flex; align-items:center; gap:12px; padding:16px 20px; border-radius:14px; background:linear-gradient(135deg, #e74c3c, #c0392b); color:#fff; box-shadow:0 8px 24px rgba(231,76,60,0.3); margin-bottom:24px;">
    <div style="width:12px; height:12px; border-radius:50%; background:#fff; animation: weatherPulse 1.5s ease-in-out infinite; box-shadow:0 0 12px #fff;"></div>
    <div style="flex:1;">
        <div style="font-size:1.05rem; font-weight:700;">Данные обновляются</div>
        <div id="last-update" style="font-size:0.82rem; opacity:0.9;">Загрузка...</div>
    </div>
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
    // 🔌 ИСТОЧНИКИ ДАННЫХ (по приоритету)
    // ============================================================
    const API_SOURCES = [
        {
            name: 'MAAS2',
            url: 'https://api.maas2.apollorion.com/',
            type: 'maas2'
        },
        {
            name: 'NASA MSL',
            url: 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json',
            type: 'nasa'
        }
    ];

    const CACHE_KEY = 'mars_weather_cache';
    const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 часов

    // ============================================================
    // 🌡️ КОНВЕРТАЦИЯ ТЕМПЕРАТУР
    // ============================================================
    function toCelsius(val, unit) {
        if (unit === 'C' || unit === 'c') return val;
        return val; // MAAS2 уже в C
    }

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
        // Марсианский год ~668.6 солов, ~22 месяца
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
    // 🌍 МАРСИАНСКИЙ СЕЗОН (по Ls)
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
        // Фобос: период 0.319 земных суток ~ 7.65 часов, около 1/3 сола
        // Деймос: период 1.26 земных суток ~ 30.3 часов, ~1.23 сола
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
    async function fetchWeather() {
        // Проверяем кэш
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.data) {
                    console.log('📦 Погода из кэша');
                    return parsed.data;
                }
            }
        } catch(e) {}

        // Пробуем источники по очереди
        for (const source of API_SOURCES) {
            try {
                const res = await fetch(source.url);
                if (!res.ok) continue;
                const json = await res.json();

                let data = null;
                if (source.type === 'maas2') {
                    data = parseMAAS2(json);
                } else if (source.type === 'nasa') {
                    data = parseNASA(json);
                }

                if (data) {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        timestamp: Date.now(),
                        data: data
                    }));
                    console.log('✅ Погода получена:', source.name);
                    return data;
                }
            } catch(e) {
                console.warn('⚠️ Источник ' + source.name + ' не ответил:', e.message);
            }
        }
        return null;
    }

    // ============================================================
    // 📖 ПАРСИНГ MAAS2
    // ============================================================
    function parseMAAS2(json) {
        if (!json) return null;
        // MAAS2 возвращает объект с последним солом
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
            windDir: d.wind_direction !== undefined ? d.wind_direction : null
        };
    }

    // ============================================================
    // 📖 ПАРСИНГ NASA MSL
    // ============================================================
    function parseNASA(json) {
        if (!json || !json.soles || !json.soles.length) return null;
        const s = json.soles[0]; // последний сол
        return {
            sol: parseInt(s.sol, 10) || 0,
            minTemp: s.min_temp !== undefined ? parseFloat(s.min_temp) : null,
            maxTemp: s.max_temp !== undefined ? parseFloat(s.max_temp) : null,
            pressure: s.pressure !== undefined ? parseFloat(s.pressure) : null,
            opacity: s.atmo_opacity || 'Unknown',
            sunrise: s.sunrise || '—',
            sunset: s.sunset || '—',
            season: s.season || 'Unknown',
            ls: s.ls !== undefined ? parseFloat(s.ls) : null,
            windSpeed: s.wind_speed !== undefined ? parseFloat(s.wind_speed) : null,
            windDir: s.wind_direction !== undefined ? parseFloat(s.wind_direction) : null
        };
    }

    // ============================================================
    // 🎨 РЕНДЕР КАРТОЧЕК
    // ============================================================
    function renderCards(data) {
        const cardsEl = document.getElementById('weather-cards');

        if (!data) {
            cardsEl.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#999;">⚠️ Не удалось загрузить данные о погоде на Марсе. Попробуйте обновить страницу позже.</div>';
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

            // Берём последние 7 солов
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
                // Синий для холода, оранжевый для тепла
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

            // Подписи
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

        // Примерные текущие температуры на Земле — можно улучшить позже
        const earthTemp = 15;
        const diff = marsAvg !== null ? earthTemp - marsAvg : null;

        el.innerHTML = `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
                <div style="text-align:center;padding:16px;background:rgba(231,76,60,0.08);border-radius:12px;">
                    <div style="font-size:2rem;margin-bottom:6px;">🔴</div>
                    <div style="font-size:1.6rem;font-weight:900;color:#e74c3c;">${marsAvg !== null ? marsAvg + '°C' : '—'}</div>
                    <div style="font-size:0.82rem;color:#888;margin-top:4px;">Марс (Гейл)</div>
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
    // 🚀 ЗАПУСК
    // ============================================================
    async function init() {
        document.getElementById('last-update').textContent = 'Загрузка данных с марсохода...';

        const data = await fetchWeather();

        if (data) {
            const date = new Date();
            document.getElementById('last-update').textContent =
                'Обновлено: ' + date.toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                });
        } else {
            document.getElementById('last-update').textContent = 'Данные временно недоступны';
        }

        renderCards(data);
        renderSeason(data);
        renderCompare(data);
        renderHistory();

        console.log('🌡️ Погода на Марсе загружена');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
