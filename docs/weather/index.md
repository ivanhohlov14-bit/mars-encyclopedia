---
title: 🌡️ Погода на Марсе
comments: false
---

<div id="weather-app" style="max-width: 960px; margin: 0 auto; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; padding: 0 8px;">

<h1 id="weather-title" style="text-align:center; font-size: 2.2rem; letter-spacing: 2px; background: linear-gradient(135deg, #6C63FF, #A29BFE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 900;">🌡️ Погода на Марсе</h1>
<p style="text-align:center; color:#9999bb; font-size:0.9rem; margin-bottom:32px;">Данные с марсохода NASA Curiosity (прибор REMS)</p>

<!-- Панель управления -->
<div id="controls" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; margin-bottom:20px; position: relative; z-index: 100;">
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; position: relative;">
        <div class="rover-wrapper">
            <button class="rover-btn active">
                Curiosity
                <span class="rover-info-icon">?</span>
            </button>
            <div class="rover-tooltip">
                <div class="rover-tooltip-title">Curiosity</div>
                <div class="rover-tooltip-row"><b>Посадка:</b> Август 2012</div>
                <div class="rover-tooltip-row"><b>Местоположение:</b> Кратер Гейл, гора Шарп</div>
                <div class="rover-tooltip-row"><b>Статус:</b> Активен с 2012 года</div>
                <div class="rover-tooltip-row"><b>Прибор:</b> REMS (погодная станция)</div>
                <div class="rover-tooltip-row"><b>Источник:</b> NASA / JPL-Caltech</div>
                <div class="rover-tooltip-note">NASA обновляет данные с задержкой — иногда раз в несколько суток.</div>
            </div>
        </div>
    </div>
    <button id="refresh-btn">Обновить</button>
</div>

<!-- Статус данных -->
<div id="data-status" style="display:flex; align-items:flex-start; gap:12px; font-size:0.88rem; color:#e8e8f0; margin-bottom:20px; padding:16px 20px; background: linear-gradient(135deg, rgba(26,26,46,0.85), rgba(37,37,80,0.85)); border-radius: 14px; border: 1.5px solid rgba(108,99,255,0.35); line-height:1.6; box-shadow: 0 4px 16px rgba(0,0,0,0.25);">
    <div id="status-dot" style="width:10px; height:10px; border-radius:50%; background:#9999bb; transition: all 0.3s; margin-top:6px; flex-shrink:0;"></div>
    <div style="flex:1;">
        <div id="status-text" style="font-weight:700; font-size:0.92rem; color:#e8e8f0;">Загрузка данных...</div>
        <div style="font-size:0.8rem; color:#A29BFE; margin-top:8px; font-weight:600; line-height:1.55;">
            NASA передаёт данные с задержкой. Отображаются последние полученные значения.
        </div>
    </div>
</div>

<!-- Сетка карточек -->
<div id="weather-cards" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:28px;"></div>

<!-- ============================================================ -->
<!-- 📅 КАЛЕНДАРЬ                                                -->
<!-- ============================================================ -->
<div class="cosmic-block">
    <button class="cosmic-toggle" data-target="cal-content">
        <span class="toggle-icon">📅</span>
        <span class="toggle-text">Архив погоды Марса</span>
        <span class="toggle-sub">Curiosity · 2012–2026</span>
        <span class="toggle-arrow">▼</span>
    </button>

    <div id="cal-content" class="toggle-content">
        <p style="font-size:0.85rem; color:#9999bb; margin:12px 0 16px 0; line-height:1.5;">
            Кликните на любой сол, чтобы увидеть подробные данные NASA за этот день
        </p>

        <div id="cal-year-selector" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px; justify-content:center;"></div>

        <div id="cal-status-bar" style="display:flex; align-items:flex-start; gap:10px; padding:12px 16px; background: rgba(108,99,255,0.08); border: 1px solid rgba(108,99,255,0.25); border-radius: 10px; margin-bottom:18px;">
            <div id="cal-status-dot" style="width:8px; height:8px; border-radius:50%; background:#9999bb; margin-top:6px; flex-shrink:0;"></div>
            <div id="cal-status-text" style="font-size:0.85rem; color:#e8e8f0; font-weight:600; line-height:1.5;">Загрузка архива NASA...</div>
        </div>

        <div id="cal-months"></div>
    </div>
</div>

<!-- ============================================================ -->
<!-- 📈 ГРАФИК ТЕМПЕРАТУР                                        -->
<!-- ============================================================ -->
<div class="cosmic-block">
    <button class="cosmic-toggle" data-target="chart-content">
        <span class="toggle-icon">📈</span>
        <span class="toggle-text">Температурный график</span>
        <span class="toggle-sub">Мин / Сред / Макс по солам</span>
        <span class="toggle-arrow">▼</span>
    </button>

    <div id="chart-content" class="toggle-content">
        <p style="font-size:0.85rem; color:#9999bb; margin:12px 0 16px 0; line-height:1.5;">
            Динамика температур по каждому солу выбранного года
        </p>

        <div id="chart-year-selector" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; justify-content:center;"></div>

        <div style="position:relative; width:100%; height:300px; background: rgba(15,15,30,0.5); border: 1px solid rgba(108,99,255,0.2); border-radius: 12px; overflow:hidden;">
            <canvas id="temp-chart" style="width:100%; height:100%; display:block;"></canvas>
        </div>

        <div style="display:flex; gap:20px; justify-content:center; margin-top:14px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:6px; font-size:0.78rem; color:#9999bb;">
                <span style="display:inline-block; width:16px; height:3px; background:#f39c12; border-radius:2px;"></span>
                Максимум
            </div>
            <div style="display:flex; align-items:center; gap:6px; font-size:0.78rem; color:#9999bb;">
                <span style="display:inline-block; width:16px; height:3px; background:#A29BFE; border-radius:2px;"></span>
                Средняя
            </div>
            <div style="display:flex; align-items:center; gap:6px; font-size:0.78rem; color:#9999bb;">
                <span style="display:inline-block; width:16px; height:3px; background:#5dade2; border-radius:2px;"></span>
                Минимум
            </div>
        </div>
    </div>
</div>

<!-- ============================================================ -->
<!-- 🗺 КАРТА МАРСА                                               -->
<!-- ============================================================ -->
<div class="cosmic-block">
    <button class="cosmic-toggle" data-target="map-content">
        <span class="toggle-icon">🗺</span>
        <span class="toggle-text">Положение Curiosity</span>
        <span class="toggle-sub">Кратер Гейл · 4.5° ю.ш.</span>
        <span class="toggle-arrow">▼</span>
    </button>

    <div id="map-content" class="toggle-content">
        <p style="font-size:0.85rem; color:#9999bb; margin:12px 0 16px 0; line-height:1.5;">
            Текущее местоположение марсохода на карте Марса
        </p>

        <div class="mars-map-container">
            <img src="https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/mars-map.png"
                 alt="Карта Марса"
                 class="mars-map-img"
                 onerror="this.style.display='none'; document.getElementById('map-fallback').style.display='block';">
            <div id="map-fallback" style="display:none; text-align:center; padding:60px 20px; color:#9999bb; font-size:0.85rem;">
                📷 Карта недоступна. Загрузите файл <code style="color:#A29BFE;">mars-map.png</code> в папку <code style="color:#A29BFE;">docs/assets/images/</code>
            </div>
            <div class="mars-map-marker" style="left: 88.17%; top: 52.5%;">
                <div class="marker-pulse"></div>
                <div class="marker-dot"></div>
                <div class="marker-label">Curiosity</div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px; margin-top:16px;">
            <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:10px; text-align:center;">
                <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; font-weight:700; letter-spacing:0.5px; margin-bottom:4px;">Кратер</div>
                <div style="font-size:0.95rem; font-weight:800; color:#A29BFE;">Гейл</div>
            </div>
            <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:10px; text-align:center;">
                <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; font-weight:700; letter-spacing:0.5px; margin-bottom:4px;">Широта</div>
                <div style="font-size:0.95rem; font-weight:800; color:#e8e8f0;">4.5° ю.ш.</div>
            </div>
            <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:10px; text-align:center;">
                <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; font-weight:700; letter-spacing:0.5px; margin-bottom:4px;">Долгота</div>
                <div style="font-size:0.95rem; font-weight:800; color:#e8e8f0;">137.4° в.д.</div>
            </div>
            <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:10px; text-align:center;">
                <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; font-weight:700; letter-spacing:0.5px; margin-bottom:4px;">Активен с</div>
                <div style="font-size:0.95rem; font-weight:800; color:#e8e8f0;">Август 2012</div>
            </div>
        </div>
    </div>
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

<!-- Модалка -->
<div id="sol-modal" style="display:none; position:fixed; inset:0; z-index:99999; align-items:center; justify-content:center; padding:20px;">
    <div id="sol-modal-bg" style="position:absolute; inset:0; background: rgba(10,10,20,0.85); backdrop-filter: blur(6px);"></div>
    <div style="position:relative; background: linear-gradient(135deg, #1a1a2e, #252550); border: 1.5px solid #6C63FF; border-radius: 20px; padding:28px; max-width: 520px; width:100%; max-height:85vh; overflow-y:auto; box-shadow: 0 20px 60px rgba(108,99,255,0.4);">
        <button id="modal-close" style="position:absolute; top:14px; right:14px; width:32px; height:32px; border-radius:50%; background: rgba(108,99,255,0.15); color:#A29BFE; border: 1px solid rgba(108,99,255,0.3); font-size:1rem; cursor:pointer;">✕</button>
        <div id="modal-body"></div>
    </div>
</div>

<style>
#weather-app {
    --c-accent: #6C63FF;
    --c-accent-light: #A29BFE;
    --c-text: #e8e8f0;
    --c-text-dim: #9999bb;
    color: var(--c-text);
}

@keyframes cosmicFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes cosmicSpin {
    to { transform: rotate(360deg); }
}

/* Кнопка марсохода */
.rover-wrapper { position: relative; display: inline-block; z-index: 100; }
.rover-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff;
    border: 1.5px solid transparent;
    border-radius: 24px;
    padding: 10px 18px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
    box-shadow: 0 4px 16px rgba(108, 99, 255, 0.5);
}
.rover-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(108, 99, 255, 0.7);
}
.rover-info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    color: #fff;
    font-weight: 800;
    font-size: 0.75rem;
    line-height: 1;
    transition: all 0.2s;
}
.rover-btn:hover .rover-info-icon {
    background: rgba(255, 255, 255, 0.45);
    transform: scale(1.1);
}

/* Подсказка */
.rover-tooltip {
    position: absolute;
    top: -10px;
    left: calc(100% + 16px);
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: linear-gradient(135deg, #252550, #1a1a2e);
    color: var(--c-text);
    border: 1.5px solid var(--c-accent);
    border-radius: 14px;
    padding: 16px 18px;
    font-size: 0.8rem;
    line-height: 1.55;
    width: 320px;
    text-align: left;
    box-shadow: 0 16px 48px rgba(108, 99, 255, 0.6);
    opacity: 0;
    visibility: hidden;
    transform: translateX(-8px);
    transition: opacity 0.25s, transform 0.25s, visibility 0.25s;
    pointer-events: none;
    z-index: 9999;
}
.rover-tooltip::before {
    content: '';
    position: absolute;
    top: 24px;
    left: -9px;
    width: 14px;
    height: 14px;
    background: linear-gradient(135deg, #252550, #1a1a2e);
    border-left: 1.5px solid var(--c-accent);
    border-bottom: 1.5px solid var(--c-accent);
    transform: rotate(45deg);
}
.rover-wrapper:hover .rover-tooltip,
.rover-tooltip:hover {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
}
.rover-tooltip-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--c-accent-light);
    margin-bottom: 6px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(108, 99, 255, 0.3);
}
.rover-tooltip-row { display: block; font-size: 0.8rem; line-height: 1.55; margin-bottom: 4px; }
.rover-tooltip-row b { color: var(--c-accent-light); font-weight: 700; margin-right: 4px; }
.rover-tooltip-note {
    display: block;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(108, 99, 255, 0.2);
    font-size: 0.75rem;
    color: var(--c-text-dim);
    line-height: 1.6;
    font-style: italic;
}

/* Refresh */
#refresh-btn {
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
#refresh-btn:hover {
    transform: translateY(-2px);
    border-color: var(--c-accent);
    color: var(--c-text);
    box-shadow: 0 4px 16px rgba(108, 99, 255, 0.3);
}
#refresh-btn:disabled { opacity: 0.6; cursor: wait; }

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
    line-height: 1.1;
    letter-spacing: -0.5px;
    display: flex;
    align-items: baseline;
    gap: 4px;
}
.weather-value .unit { font-size: 0.95rem; font-weight: 600; color: var(--c-text-dim); }
.weather-sub { font-size: 0.75rem; color: var(--c-text-dim); margin-top: 2px; }
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

/* Универсальный переключатель */
.cosmic-toggle {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    color: var(--c-text);
    transition: all 0.2s;
    text-align: left;
}
.cosmic-toggle:hover .toggle-text {
    color: var(--c-accent-light);
}
.toggle-icon {
    font-size: 1.15rem;
    flex-shrink: 0;
}
.toggle-text {
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.3px;
    transition: color 0.2s;
}
.toggle-sub {
    font-size: 0.78rem;
    color: var(--c-text-dim);
    font-weight: 600;
    margin-left: auto;
    margin-right: 12px;
}
.toggle-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.3);
    color: var(--c-accent-light);
    font-size: 0.75rem;
    transition: transform 0.3s, background 0.2s;
    flex-shrink: 0;
}
.cosmic-toggle:hover .toggle-arrow {
    background: rgba(108,99,255,0.3);
}
.cosmic-toggle.open .toggle-arrow {
    transform: rotate(180deg);
}

/* Скрытие/раскрытие контента */
.toggle-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.6s ease, opacity 0.3s ease;
    opacity: 0;
}
.toggle-content.open {
    max-height: 8000px;
    opacity: 1;
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
.season-progress { flex: 1; min-width: 200px; }
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

/* Календарь */
.cal-year-btn {
    background: rgba(26,26,46,0.7);
    color: #9999bb;
    border: 1.5px solid rgba(108,99,255,0.3);
    border-radius: 22px;
    padding: 7px 16px;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
}
.cal-year-btn:hover {
    transform: translateY(-2px);
    border-color: #6C63FF;
    color: #e8e8f0;
    box-shadow: 0 4px 16px rgba(108,99,255,0.3);
}
.cal-year-btn.active {
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 4px 16px rgba(108,99,255,0.5);
}
.cal-month-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 14px;
}
.cal-month-card {
    background: rgba(26,26,46,0.5);
    border: 1px solid rgba(108,99,255,0.25);
    border-radius: 12px;
    padding: 12px;
    transition: all 0.25s;
}
.cal-month-card:hover {
    border-color: rgba(108,99,255,0.5);
    background: rgba(26,26,46,0.7);
}
.cal-month-title {
    font-size: 0.78rem;
    font-weight: 800;
    color: #A29BFE;
    margin-bottom: 10px;
    text-align: center;
    letter-spacing: 0.5px;
}
.cal-days-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 3px;
}
.cal-day {
    aspect-ratio: 1;
    border-radius: 5px;
    background: rgba(108,99,255,0.08);
    border: 1px solid rgba(108,99,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.58rem;
    font-weight: 600;
    color: #9999bb;
    cursor: pointer;
    transition: all 0.15s;
}
.cal-day:hover {
    transform: scale(1.18);
    border-color: #6C63FF;
    color: #fff;
    z-index: 2;
    box-shadow: 0 4px 12px rgba(108,99,255,0.5);
}
.cal-day.cold { background: rgba(52,152,219,0.35); border-color: rgba(52,152,219,0.5); color: #a9d5f0; }
.cal-day.cool { background: rgba(108,99,255,0.3); border-color: rgba(108,99,255,0.5); color: #c8c4ff; }
.cal-day.warm { background: rgba(243,156,18,0.3); border-color: rgba(243,156,18,0.5); color: #ffd59e; }
.cal-day.hot { background: rgba(231,76,60,0.4); border-color: rgba(231,76,60,0.6); color: #ffb8b0; }
.cal-day.no-data { opacity: 0.25; cursor: not-allowed; }
.cal-spinner {
    display: inline-block;
    width: 32px;
    height: 32px;
    border: 3px solid rgba(108,99,255,0.2);
    border-top-color: #6C63FF;
    border-radius: 50%;
    animation: cosmicSpin 0.8s linear infinite;
}
.cal-loading {
    text-align: center;
    padding: 40px 20px;
    color: #9999bb;
    font-size: 0.85rem;
}

/* Карта Марса */
.mars-map-container {
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1a2e, #252550);
    border: 1px solid rgba(108,99,255,0.25);
}
.mars-map-img {
    width: 100%;
    height: auto;
    display: block;
    opacity: 0.9;
    filter: contrast(1.05) brightness(0.95);
}
.mars-map-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 10;
}
.marker-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #e74c3c;
    border: 2px solid #fff;
    box-shadow: 0 0 16px rgba(231,76,60,1), 0 0 32px rgba(231,76,60,0.6);
    position: relative;
    z-index: 2;
    animation: markerGlow 2s ease-in-out infinite;
}
.marker-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(231,76,60,0.7);
    z-index: 1;
    animation: markerPulse 2s ease-out infinite;
}
.marker-label {
    position: absolute;
    top: 22px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #1a1a2e, #252550);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 12px;
    border: 1.5px solid #6C63FF;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    z-index: 3;
    letter-spacing: 0.4px;
}
@keyframes markerPulse {
    0% { width: 14px; height: 14px; opacity: 1; }
    100% { width: 70px; height: 70px; opacity: 0; }
}
@keyframes markerGlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
}

/* Мобильный */
@media (max-width: 700px) {
    #weather-title { font-size: 1.6rem !important; }
    .weather-value { font-size: 1.5rem; }
    .weather-card { padding: 16px; }
    .rover-btn, #refresh-btn { padding: 8px 16px; font-size: 0.82rem; }
    .cosmic-block { padding: 18px 16px; }
    .rover-tooltip {
        top: calc(100% + 12px);
        left: 0;
        transform: translateY(-8px);
        width: calc(100vw - 40px);
        max-width: 320px;
    }
    .rover-tooltip::before {
        top: -9px;
        left: 24px;
        border-left: 1.5px solid var(--c-accent);
        border-top: 1.5px solid var(--c-accent);
        border-bottom: none;
    }
    .rover-wrapper:hover .rover-tooltip { transform: translateY(0); }
    .cal-month-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
    .cal-month-card { padding: 10px; }
    .cal-days-grid { grid-template-columns: repeat(10, 1fr); gap: 2px; }
    .cal-day { font-size: 0.5rem; }
    .toggle-sub { display: none; }
    .toggle-text { font-size: 0.95rem; }
    .marker-label { font-size: 0.62rem; padding: 3px 8px; }
}
@media (max-width: 500px) {
    .cal-month-grid { grid-template-columns: 1fr; }
}
</style>

<script>
(function() {
    'use strict';

    const NASA_URL = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json';
    const CACHE_TTL = 10 * 60 * 1000;
    const ARCHIVE_CACHE_KEY = 'mars_full_archive_v1';
    const ARCHIVE_CACHE_TTL = 60 * 60 * 1000;

    let ALL_SOLS = [];
    let BY_YEAR = {};
    let currentCalYear = null;
    let currentChartYear = null;

    // ============================================================
    // 🌡️ УТИЛИТЫ
    // ============================================================
    function toFahrenheit(c) { return Math.round(c * 9 / 5 + 32); }

    const SOLS_IN_YEAR = 668.6;
    const SOLS_IN_MONTH = SOLS_IN_YEAR / 12;

    function getMarsYear(sol) {
        return Math.floor(parseInt(sol) / SOLS_IN_YEAR) + 1;
    }
    function getMarsMonth(sol) {
        const year = getMarsYear(sol);
        const dayInYear = parseInt(sol) - (year - 1) * SOLS_IN_YEAR;
        return Math.floor(dayInYear / SOLS_IN_MONTH) + 1;
    }

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

    function formatEarthDate(str) {
        try {
            const d = new Date(str);
            return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch(e) { return str; }
    }

    function humanAge(dateStr) {
        try {
            const then = new Date(dateStr).getTime();
            const diff = Date.now() - then;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.floor(diff / (1000 * 60));
            if (mins < 60) return `${mins} мин назад`;
            if (hours < 24) return `${hours} ч назад`;
            if (days < 30) return `${days} дн назад`;
            const months = Math.floor(days / 30);
            return `${months} мес назад`;
        } catch(e) { return ''; }
    }

    // ============================================================
    // 🔌 ЗАГРУЗКА ПОГОДЫ
    // ============================================================
    function parseNASA(json) {
        if (!json || !json.soles || !json.soles.length) return null;
        const s = json.soles[0];
        return {
            sol: parseInt(s.sol, 10) || 0,
            earthDate: s.terrestrial_date || null,
            minTemp: s.min_temp !== undefined ? parseFloat(s.min_temp) : null,
            maxTemp: s.max_temp !== undefined ? parseFloat(s.max_temp) : null,
            pressure: s.pressure !== undefined ? parseFloat(s.pressure) : null,
            opacity: s.atmo_opacity || 'Unknown',
            sunrise: s.sunrise || '—',
            sunset: s.sunset || '—',
            ls: s.ls !== undefined ? parseFloat(s.ls) : null,
            windSpeed: s.wind_speed !== undefined ? parseFloat(s.wind_speed) : null,
            windDir: s.wind_direction !== undefined ? parseFloat(s.wind_direction) : null
        };
    }

    async function fetchWeather(forceRefresh) {
        const cacheKey = 'mars_weather_curiosity_v3';
        if (!forceRefresh) {
            try {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.data) {
                        return { data: parsed.data, fromCache: true, cachedAt: parsed.timestamp };
                    }
                }
            } catch(e) {}
        }

        try {
            const res = await fetch(NASA_URL, { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const json = await res.json();
            const data = parseNASA(json);
            if (data && data.sol) {
                localStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    data: data
                }));
                return { data, fromCache: false, cachedAt: Date.now() };
            }
        } catch(e) {
            console.warn('⚠️ NASA API не ответил:', e.message);
        }
        return { data: null, fromCache: false };
    }

    // ============================================================
    // 🎨 КАРТОЧКИ
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
    // 🌍 СЕЗОН + СРАВНЕНИЕ
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

    function renderCompare(data) {
        const el = document.getElementById('earth-compare');
        if (!data) {
            el.innerHTML = '<span style="color:#9999bb;">Данные временно недоступны</span>';
            return;
        }

        const marsAvg = (data.minTemp !== null && data.maxTemp !== null)
            ? Math.round((data.minTemp + data.maxTemp) / 2) : null;
        const earthTemp = 15;
        const diff = marsAvg !== null ? earthTemp - marsAvg : null;

        el.innerHTML = `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div style="text-align:center;padding:20px;background: linear-gradient(135deg, rgba(231,76,60,0.15), rgba(231,76,60,0.05));border-radius:14px;border:1.5px solid rgba(231,76,60,0.3);">
                    <div style="font-size:2rem;margin-bottom:6px;">🔴</div>
                    <div style="font-size:1.7rem;font-weight:900;color:#e74c3c;">${marsAvg !== null ? marsAvg + '°C' : '—'}</div>
                    <div style="font-size:0.82rem;color:#9999bb;margin-top:6px;">Марс (кратер Гейл)</div>
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

    function updateStatus(data, cachedAt) {
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');

        if (!data) {
            dot.style.background = '#e74c3c';
            dot.style.boxShadow = '0 0 10px #e74c3c';
            text.textContent = 'Данные недоступны';
            return;
        }

        const solText = 'Сол ' + data.sol;
        const earthText = data.earthDate ? ' · ' + formatEarthDate(data.earthDate) : '';
        const ageText = data.earthDate ? ' · ' + humanAge(data.earthDate) : '';
        const daysOld = data.earthDate ? Math.floor((Date.now() - new Date(data.earthDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;

        if (daysOld >= 2) {
            dot.style.background = '#f39c12';
            dot.style.boxShadow = '0 0 10px #f39c12';
            text.innerHTML = `Последние данные NASA: <b style="color:#A29BFE">${solText}</b>${earthText}${ageText}`;
        } else {
            dot.style.background = '#27ae60';
            dot.style.boxShadow = '0 0 10px #27ae60';
            text.innerHTML = `Данные NASA: <b style="color:#A29BFE">${solText}</b>${earthText}${ageText}`;
        }
    }

    // ============================================================
    // 📅 АРХИВ
    // ============================================================
    async function loadArchive() {
        try {
            const cached = localStorage.getItem(ARCHIVE_CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < ARCHIVE_CACHE_TTL) {
                    return parsed.data;
                }
            }
        } catch(e) {}

        const res = await fetch(NASA_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        if (!json.soles || !json.soles.length) throw new Error('Нет данных');

        localStorage.setItem(ARCHIVE_CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: json.soles
        }));
        return json.soles;
    }

    function groupByYear(sols) {
        const groups = {};
        sols.forEach(s => {
            const yr = getMarsYear(s.sol);
            if (!groups[yr]) groups[yr] = [];
            groups[yr].push(s);
        });
        const sorted = {};
        Object.keys(groups).sort((a, b) => b - a).forEach(k => {
            groups[k].sort((a, b) => parseInt(a.sol) - parseInt(b.sol));
            sorted[k] = groups[k];
        });
        return sorted;
    }

    function tempClass(minT, maxT) {
        const avg = (parseFloat(minT) + parseFloat(maxT)) / 2;
        if (isNaN(avg)) return 'no-data';
        if (avg < -70) return 'cold';
        if (avg < -40) return 'cool';
        if (avg < -15) return 'warm';
        return 'hot';
    }

    function renderYearSelector() {
        const el = document.getElementById('cal-year-selector');
        if (!el) return;
        const years = Object.keys(BY_YEAR);
        el.innerHTML = years.map(y =>
            `<button class="cal-year-btn ${y == currentCalYear ? 'active' : ''}" data-year="${y}">Год ${y}</button>`
        ).join('');

        el.querySelectorAll('.cal-year-btn').forEach(btn => {
            btn.onclick = () => {
                currentCalYear = btn.dataset.year;
                renderYearSelector();
                renderCalendarView();
            };
        });
    }

    function renderCalendarView() {
        const view = document.getElementById('cal-months');
        if (!view) return;
        const sols = BY_YEAR[currentCalYear] || [];

        const months = {};
        sols.forEach(s => {
            const m = getMarsMonth(s.sol);
            if (!months[m]) months[m] = [];
            months[m].push(s);
        });

        let html = '<div class="cal-month-grid">';
        for (let m = 1; m <= 12; m++) {
            const monthSols = months[m] || [];
            html += `<div class="cal-month-card">
                <div class="cal-month-title">${m}-й месяц</div>
                <div class="cal-days-grid">`;

            if (monthSols.length === 0) {
                html += '<div style="grid-column: 1/-1; text-align:center; color:#9999bb; font-size:0.7rem; padding:8px;">нет данных</div>';
            } else {
                monthSols.forEach(s => {
                    const cls = tempClass(s.min_temp, s.max_temp);
                    const minV = Math.round(parseFloat(s.min_temp));
                    const maxV = Math.round(parseFloat(s.max_temp));
                    html += `<div class="cal-day ${cls}" data-sol="${s.sol}" title="Sol ${s.sol} · ${minV}…${maxV}°C">${s.sol.slice(-2)}</div>`;
                });
            }
            html += '</div></div>';
        }
        html += '</div>';

        view.innerHTML = html;

        view.querySelectorAll('.cal-day[data-sol]').forEach(cell => {
            cell.onclick = () => openSolModal(cell.dataset.sol);
        });
    }

    // ============================================================
    // 📈 ГРАФИК
    // ============================================================
    function renderChartYearSelector() {
        const el = document.getElementById('chart-year-selector');
        if (!el) return;
        const years = Object.keys(BY_YEAR);
        if (!years.length) return;
        if (!currentChartYear) currentChartYear = years[0];

        el.innerHTML = years.map(y =>
            `<button class="cal-year-btn ${y == currentChartYear ? 'active' : ''}" data-year="${y}">${y}</button>`
        ).join('');

        el.querySelectorAll('.cal-year-btn').forEach(btn => {
            btn.onclick = () => {
                currentChartYear = btn.dataset.year;
                renderChartYearSelector();
                drawTempChart();
            };
        });
    }

    function drawTempChart() {
        const canvas = document.getElementById('temp-chart');
        if (!canvas) return;

        const sols = (BY_YEAR[currentChartYear] || []).filter(s => {
            const mn = parseFloat(s.min_temp), mx = parseFloat(s.max_temp);
            return !isNaN(mn) && !isNaN(mx);
        });

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const W = rect.width;
        const H = rect.height;

        if (W === 0 || H === 0) return;

        canvas.width = W * dpr;
        canvas.height = H * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, W, H);

        if (!sols.length) {
            ctx.fillStyle = '#9999bb';
            ctx.font = '14px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Нет данных за этот год', W / 2, H / 2);
            return;
        }

        const padL = 44, padR = 16, padT = 20, padB = 34;
        const chartW = W - padL - padR;
        const chartH = H - padT - padB;

        let minY = Infinity, maxY = -Infinity;
        sols.forEach(s => {
            const mn = parseFloat(s.min_temp), mx = parseFloat(s.max_temp);
            minY = Math.min(minY, mn);
            maxY = Math.max(maxY, mx);
        });
        const pad = 5;
        minY -= pad;
        maxY += pad;

        const rangeY = maxY - minY;
        const rangeX = sols.length - 1 || 1;

        const xFor = i => padL + (i / rangeX) * chartW;
        const yFor = t => padT + chartH - ((t - minY) / rangeY) * chartH;

        // Сетка и подписи Y
        ctx.strokeStyle = 'rgba(108,99,255,0.12)';
        ctx.fillStyle = 'rgba(153,153,187,0.75)';
        ctx.font = '10px -apple-system, sans-serif';
        ctx.textAlign = 'right';
        ctx.lineWidth = 1;

        const stepsY = 5;
        for (let i = 0; i <= stepsY; i++) {
            const t = minY + (rangeY * i / stepsY);
            const y = yFor(t);
            ctx.beginPath();
            ctx.moveTo(padL, y);
            ctx.lineTo(padL + chartW, y);
            ctx.stroke();
            ctx.fillText(Math.round(t) + '°', padL - 6, y + 3);
        }

        // Область между min и max
        ctx.beginPath();
        sols.forEach((s, i) => {
            const y = yFor(parseFloat(s.max_temp));
            if (i === 0) ctx.moveTo(xFor(i), y);
            else ctx.lineTo(xFor(i), y);
        });
        for (let i = sols.length - 1; i >= 0; i--) {
            ctx.lineTo(xFor(i), yFor(parseFloat(sols[i].min_temp)));
        }
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
        grad.addColorStop(0, 'rgba(243,156,18,0.15)');
        grad.addColorStop(1, 'rgba(93,173,226,0.15)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Линия максимума
        ctx.beginPath();
        sols.forEach((s, i) => {
            const x = xFor(i);
            const y = yFor(parseFloat(s.max_temp));
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(243,156,18,0.6)';
        ctx.stroke();

        // Линия минимума
        ctx.beginPath();
        sols.forEach((s, i) => {
            const x = xFor(i);
            const y = yFor(parseFloat(s.min_temp));
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#5dade2';
        ctx.shadowColor = 'rgba(93,173,226,0.6)';
        ctx.stroke();

        // Линия средней (пунктир)
        ctx.beginPath();
        sols.forEach((s, i) => {
            const x = xFor(i);
            const avg = (parseFloat(s.max_temp) + parseFloat(s.min_temp)) / 2;
            const y = yFor(avg);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#A29BFE';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.shadowColor = 'rgba(162,155,254,0.4)';
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.shadowBlur = 0;

        // Подписи X (солы — 6 меток)
        ctx.fillStyle = 'rgba(153,153,187,0.75)';
        ctx.font = '10px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        const stepX = Math.max(1, Math.floor(sols.length / 6));
        for (let i = 0; i < sols.length; i += stepX) {
            const x = xFor(i);
            ctx.fillText(sols[i].sol, x, H - 12);
        }
    }

    // ============================================================
    // 🪟 МОДАЛКА
    // ============================================================
    function hideEffectsButton() {
        const btn = document.getElementById('effects-menu-btn');
        if (btn) {
            btn.style.setProperty('display', 'none', 'important');
            btn.style.setProperty('visibility', 'hidden', 'important');
            btn.style.setProperty('opacity', '0', 'important');
        }
        const panel = document.getElementById('effects-menu-panel');
        if (panel) {
            panel.style.setProperty('display', 'none', 'important');
            panel.style.setProperty('visibility', 'hidden', 'important');
        }
    }

    function showEffectsButton() {
        const btn = document.getElementById('effects-menu-btn');
        if (btn) {
            btn.style.removeProperty('display');
            btn.style.removeProperty('visibility');
            btn.style.removeProperty('opacity');
        }
    }

    function openSolModal(solNum) {
        const data = ALL_SOLS.find(s => s.sol === solNum);
        if (!data) return;

        const modal = document.getElementById('sol-modal');
        const body = document.getElementById('modal-body');

        const minT = parseFloat(data.min_temp);
        const maxT = parseFloat(data.max_temp);
        const avgT = (!isNaN(minT) && !isNaN(maxT)) ? Math.round((minT + maxT) / 2) : null;
        const pressurePa = parseFloat(data.pressure);
        const pressureHpa = !isNaN(pressurePa) ? (pressurePa / 100).toFixed(2) : '—';

        const earthMonthly = [4, 5, 9, 14, 18, 21, 23, 22, 19, 14, 9, 6];
        let earthTemp = 15;
        let earthMonthName = '';
        try {
            const d = new Date(data.terrestrial_date);
            earthTemp = earthMonthly[d.getMonth()] || 15;
            earthMonthName = d.toLocaleDateString('ru-RU', { month: 'long' });
        } catch(e) {}
        const diff = avgT !== null ? earthTemp - avgT : null;

        body.innerHTML = `
            <div style="font-size:1.7rem; font-weight:900; color:#A29BFE; margin-bottom:4px;">Сол ${data.sol}</div>
            <div style="font-size:0.85rem; color:#9999bb; margin-bottom:20px;">${data.terrestrial_date || '—'} · Месяц ${getMarsMonth(data.sol)} · Год ${currentCalYear}</div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px;">
                <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:12px; text-align:center;">
                    <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; letter-spacing:0.6px; font-weight:700; margin-bottom:4px;">Максимум</div>
                    <div style="font-size:1.2rem; font-weight:800; color:#f39c12;">${!isNaN(maxT) ? Math.round(maxT) + '°C' : '—'}</div>
                </div>
                <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:12px; text-align:center;">
                    <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; letter-spacing:0.6px; font-weight:700; margin-bottom:4px;">Минимум</div>
                    <div style="font-size:1.2rem; font-weight:800; color:#5dade2;">${!isNaN(minT) ? Math.round(minT) + '°C' : '—'}</div>
                </div>
                <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:12px; text-align:center;">
                    <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; letter-spacing:0.6px; font-weight:700; margin-bottom:4px;">Средняя</div>
                    <div style="font-size:1.2rem; font-weight:800; color:#e8e8f0;">${avgT !== null ? avgT + '°C' : '—'}</div>
                </div>
                <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:12px; text-align:center;">
                    <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; letter-spacing:0.6px; font-weight:700; margin-bottom:4px;">Давление</div>
                    <div style="font-size:1.2rem; font-weight:800; color:#e8e8f0;">${pressureHpa}<span style="font-size:0.7rem; color:#9999bb; margin-left:3px;">гПа</span></div>
                </div>
                <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:12px; text-align:center;">
                    <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; letter-spacing:0.6px; font-weight:700; margin-bottom:4px;">Ветер</div>
                    <div style="font-size:1.2rem; font-weight:800; color:#e8e8f0;">${data.wind_speed && data.wind_speed !== '--' ? data.wind_speed : '—'}<span style="font-size:0.7rem; color:#9999bb; margin-left:3px;">м/с</span></div>
                </div>
                <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:12px; text-align:center;">
                    <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; letter-spacing:0.6px; font-weight:700; margin-bottom:4px;">Атмосфера</div>
                    <div style="font-size:1rem; font-weight:800; color:#e8e8f0;">${data.atmo_opacity || '—'}</div>
                </div>
                <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:12px; text-align:center;">
                    <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; letter-spacing:0.6px; font-weight:700; margin-bottom:4px;">Восход</div>
                    <div style="font-size:1rem; font-weight:800; color:#e8e8f0;">${data.sunrise || '—'}</div>
                </div>
                <div style="background: rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:12px; text-align:center;">
                    <div style="font-size:0.65rem; color:#9999bb; text-transform:uppercase; letter-spacing:0.6px; font-weight:700; margin-bottom:4px;">Закат</div>
                    <div style="font-size:1rem; font-weight:800; color:#e8e8f0;">${data.sunset || '—'}</div>
                </div>
            </div>

            ${diff !== null ? `
                <div style="padding:16px; background: rgba(108,99,255,0.1); border:1px solid rgba(108,99,255,0.25); border-radius:12px;">
                    <div style="font-size:0.82rem; font-weight:800; color:#A29BFE; margin-bottom:10px;">🌍 Сравнение с Землёй</div>
                    <div style="display:flex; justify-content:space-between; padding:6px 0; font-size:0.85rem; color:#e8e8f0; border-bottom:1px solid rgba(108,99,255,0.1);">
                        <span>Средняя на Марсе</span><b style="color:#A29BFE;">${avgT}°C</b>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:6px 0; font-size:0.85rem; color:#e8e8f0; border-bottom:1px solid rgba(108,99,255,0.1);">
                        <span>Средняя на Земле (${earthMonthName})</span><b style="color:#A29BFE;">~${earthTemp}°C</b>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:6px 0; font-size:0.85rem; color:#e8e8f0;">
                        <span>Разница</span><b style="color:#A29BFE;">${Math.abs(diff)}°C ${diff > 0 ? 'холоднее' : 'теплее'}</b>
                    </div>
                </div>
            ` : ''}
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        hideEffectsButton();
    }

    function closeSolModal() {
        const m = document.getElementById('sol-modal');
        if (m) m.style.display = 'none';
        document.body.style.overflow = '';
        showEffectsButton();
    }

    // ============================================================
    // 🔽 УНИВЕРСАЛЬНЫЙ ПЕРЕКЛЮЧАТЕЛЬ
    // ============================================================
    function setupToggles() {
        document.querySelectorAll('.cosmic-toggle').forEach(btn => {
            const targetId = btn.dataset.target;
            const content = document.getElementById(targetId);
            if (!content) return;

            btn.onclick = () => {
                btn.classList.toggle('open');
                content.classList.toggle('open');

                // Если открывается график — перерисовываем после анимации
                if (targetId === 'chart-content' && content.classList.contains('open')) {
                    setTimeout(() => {
                        renderChartYearSelector();
                        drawTempChart();
                    }, 100);
                }
            };
        });

        // Resize — перерисовка графика
        window.addEventListener('resize', () => {
            const chartContent = document.getElementById('chart-content');
            if (chartContent && chartContent.classList.contains('open')) {
                drawTempChart();
            }
        });
    }

    // ============================================================
    // 📊 СТАТУС КАЛЕНДАРЯ
    // ============================================================
    function updateCalStatus(count, error) {
        const dot = document.getElementById('cal-status-dot');
        const text = document.getElementById('cal-status-text');
        if (!dot || !text) return;

        if (error) {
            dot.style.background = '#e74c3c';
            dot.style.boxShadow = '0 0 10px #e74c3c';
            text.textContent = 'Не удалось загрузить архив NASA';
            return;
        }

        dot.style.background = '#27ae60';
        dot.style.boxShadow = '0 0 10px #27ae60';
        text.innerHTML = `Загружено <b style="color:#A29BFE;">${count}</b> солов · Годы: ${Object.keys(BY_YEAR).length} · Источник: <b style="color:#A29BFE;">NASA</b>`;
    }

    async function initArchive() {
        const view = document.getElementById('cal-months');
        if (!view) return;

        view.innerHTML = '<div class="cal-loading"><div class="cal-spinner"></div><p style="margin-top:12px;">Загрузка архива NASA...</p></div>';

        try {
            const sols = await loadArchive();
            ALL_SOLS = sols;
            BY_YEAR = groupByYear(sols);
            currentCalYear = Object.keys(BY_YEAR)[0];
            currentChartYear = currentCalYear;

            renderYearSelector();
            renderCalendarView();
            updateCalStatus(sols.length, null);
            console.log('📅 Календарь Марса загружен:', sols.length, 'солов');
        } catch(e) {
            console.error('Ошибка календаря:', e);
            updateCalStatus(0, e);
            view.innerHTML = '<div class="cal-loading">❌ Ошибка загрузки. Попробуйте позже.</div>';
        }

        document.getElementById('modal-close').onclick = closeSolModal;
        document.getElementById('sol-modal-bg').onclick = closeSolModal;
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeSolModal();
        });
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    async function loadData(forceRefresh) {
        const result = await fetchWeather(forceRefresh);
        updateStatus(result.data, result.cachedAt);
        renderCards(result.data);
        renderSeason(result.data);
        renderCompare(result.data);
    }

    async function init() {
        document.getElementById('refresh-btn').addEventListener('click', async function() {
            this.textContent = 'Загрузка...';
            this.disabled = true;
            try { localStorage.removeItem('mars_weather_curiosity_v3'); } catch(e) {}
            await loadData(true);
            this.textContent = 'Обновить';
            this.disabled = false;
        });

        await loadData(false);
        setInterval(() => loadData(false), 10 * 60 * 1000);

        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) loadData(false);
        });

        setupToggles();
        setTimeout(initArchive, 100);

        console.log('🌌 VIP-погода на Марсе загружена');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
