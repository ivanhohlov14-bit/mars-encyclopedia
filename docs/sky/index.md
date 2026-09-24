---
title: Ночное небо Марса
comments: false
---

<div id="sky-app">
    <div style="text-align:center; margin-bottom:16px;">
        <h1 style="font-size:2rem; letter-spacing:2px; background:linear-gradient(135deg,#A29BFE,#6C63FF,#f39c12); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin:0 0 8px; font-weight:900;">🌠 Ночное небо Марса</h1>
        <p style="color:#888; font-size:0.9rem; margin:0;">Симулятор положения светил и созвездий · 600–2740 гг. Э.О.</p>
    </div>

    <div id="sky-controls">
        <label class="sky-control">
            <span>📅 Год:</span>
            <input type="range" id="sky-year" min="600" max="2740" value="2700" step="10">
            <strong id="sky-year-val">2700</strong>
        </label>
        <label class="sky-control">
            <span>🕐 Время:</span>
            <input type="range" id="sky-time" min="0" max="24" value="22" step="1">
            <strong id="sky-time-val">22:00</strong>
        </label>
        <button id="sky-play" class="sky-btn" title="Автопрокрутка времени">▶</button>
        <button id="sky-rotate" class="sky-btn" title="Вращение неба">🌍</button>
        <button id="sky-fullscreen" class="sky-btn" title="На весь экран">⛶</button>
        <button id="sky-shot" class="sky-btn" title="Скриншот">📸</button>
        <button id="sky-reset" class="sky-btn" title="Сброс">↺</button>
    </div>

    <div id="sky-search-wrap">
        <input id="sky-search" type="text" placeholder="🔍 Найти созвездие или объект..." autocomplete="off">
        <div id="sky-search-results"></div>
    </div>

    <div id="sky-canvas-wrap">
        <canvas id="sky-canvas"></canvas>
        <div id="sky-tooltip"></div>
        <div id="sky-compass">
            <span class="sky-dir n">С</span>
            <span class="sky-dir e">В</span>
            <span class="sky-dir s">Ю</span>
            <span class="sky-dir w">З</span>
        </div>
        <div id="sky-zoombar">🔍 <input type="range" id="sky-zoom" min="50" max="200" value="100"><span id="sky-zoom-val">100%</span></div>
    </div>

    <div id="sky-info-panel">
        <div id="sky-info-left">
            <div class="sky-info-title">📊 Наблюдение</div>
            <div id="sky-info-body">Загрузка...</div>
        </div>
        <div id="sky-info-right">
            <div class="sky-info-title">🌡️ Условия</div>
            <div id="sky-season"></div>
            <div id="sky-weather"></div>
        </div>
    </div>
</div>

<style>
#sky-app{max-width:1200px; margin:0 auto; font-family:-apple-system,'Segoe UI',Roboto,sans-serif;}

#sky-controls{display:flex; gap:10px; flex-wrap:wrap; justify-content:center; align-items:center; background:linear-gradient(135deg,#f5f7fa,#e8ecf3); padding:14px 18px; border-radius:14px; margin-bottom:16px; box-shadow:0 4px 16px rgba(0,0,0,.05);}
.sky-control{display:flex; align-items:center; gap:8px; font-size:.88rem; color:#555; font-weight:600;}
.sky-control input[type="range"]{accent-color:#6C63FF; cursor:pointer;}
.sky-control strong{color:#6C63FF; min-width:60px; text-align:center; font-variant-numeric:tabular-nums;}

.sky-btn{width:40px; height:40px; border-radius:50%; border:none; background:linear-gradient(135deg,#6C63FF,#A29BFE); color:#fff; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .25s cubic-bezier(.16,1,.3,1); box-shadow:0 4px 12px rgba(108,99,255,.3); font-family:inherit; padding:0;}
.sky-btn:hover{transform:translateY(-2px) scale(1.05); box-shadow:0 8px 20px rgba(108,99,255,.5);}
.sky-btn:active{transform:translateY(0) scale(.95);}
.sky-btn.active{background:linear-gradient(135deg,#27ae60,#16a085); box-shadow:0 4px 12px rgba(39,174,96,.4);}

#sky-search-wrap{position:relative; max-width:400px; margin:0 auto 16px;}
#sky-search{width:100%; padding:12px 20px; border-radius:30px; border:2px solid rgba(0,0,0,.08); background:#fff; font-size:.9rem; font-family:inherit; outline:none; transition:all .25s; box-shadow:0 4px 12px rgba(0,0,0,.05); box-sizing:border-box;}
#sky-search:focus{border-color:#6C63FF; box-shadow:0 0 0 4px rgba(108,99,255,.15);}
#sky-search-results{position:absolute; top:100%; left:0; right:0; margin-top:6px; background:#fff; border-radius:12px; box-shadow:0 12px 40px rgba(0,0,0,.15); max-height:300px; overflow-y:auto; display:none; z-index:100;}
#sky-search-results.open{display:block; animation:skySlide .25s ease;}
.sky-search-item{padding:12px 16px; cursor:pointer; font-size:.88rem; color:#333; transition:background .15s; display:flex; align-items:center; gap:10px;}
.sky-search-item:hover{background:rgba(108,99,255,.08); color:#6C63FF;}
.sky-search-item .sky-search-icon{font-size:1.2rem;}

#sky-canvas-wrap{position:relative; border-radius:16px; overflow:hidden; box-shadow:0 24px 80px rgba(0,0,0,.6); cursor:grab; touch-action:none; background:#000;}
#sky-canvas-wrap.dragging{cursor:grabbing;}
#sky-canvas{display:block; width:100%; height:640px;}
#sky-tooltip{position:absolute; padding:8px 14px; background:rgba(20,15,35,.95); color:#fff; border-radius:10px; font-size:.82rem; pointer-events:none; opacity:0; transition:opacity .15s; transform:translate(-50%, -130%); border:1px solid rgba(162,155,254,.4); box-shadow:0 8px 24px rgba(0,0,0,.5); white-space:nowrap; z-index:5;}
#sky-tooltip.show{opacity:1;}

#sky-compass{position:absolute; bottom:16px; left:16px; width:60px; height:60px; pointer-events:none;}
.sky-dir{position:absolute; color:rgba(162,155,254,.7); font-weight:800; font-size:.72rem; text-shadow:0 0 8px rgba(0,0,0,.8);}
.sky-dir.n{top:0; left:50%; transform:translateX(-50%);}
.sky-dir.s{bottom:0; left:50%; transform:translateX(-50%);}
.sky-dir.e{right:0; top:50%; transform:translateY(-50%);}
.sky-dir.w{left:0; top:50%; transform:translateY(-50%);}

#sky-zoombar{position:absolute; bottom:16px; right:16px; background:rgba(20,15,35,.85); padding:6px 14px; border-radius:20px; display:flex; align-items:center; gap:8px; color:#fff; font-size:.8rem; border:1px solid rgba(162,155,254,.3); backdrop-filter:blur(10px);}
#sky-zoombar input{width:100px; accent-color:#6C63FF;}
#sky-zoom-val{font-variant-numeric:tabular-nums; min-width:40px; text-align:right;}

#sky-info-panel{display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:16px;}
#sky-info-left, #sky-info-right{background:linear-gradient(135deg,#f5f7fa,#e8ecf3); padding:16px 20px; border-radius:14px; font-size:.85rem; color:#444; line-height:1.7; box-shadow:0 4px 16px rgba(0,0,0,.05);}
.sky-info-title{font-size:.78rem; font-weight:800; color:#6C63FF; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;}
#sky-info-body em{color:#6C63FF; font-style:normal; font-weight:700;}
#sky-season, #sky-weather{font-size:.85rem; line-height:1.6;}
#sky-season strong, #sky-weather strong{color:#1a1a1a;}

@keyframes skySlide { from { opacity:0; transform:translateY(-8px);} to {opacity:1; transform:translateY(0);} }
@keyframes skyPulse { 0%,100% { transform:scale(1);} 50% {transform:scale(1.05);} }

@media (max-width: 700px) {
    #sky-canvas { height: 420px !important; }
    .sky-control { font-size:.78rem; }
    .sky-control input[type="range"] { width:100px; }
    #sky-info-panel { grid-template-columns: 1fr; }
    #sky-compass { width:44px; height:44px; }
    #sky-zoombar { padding:4px 10px; font-size:.72rem; }
    #sky-zoombar input { width:60px; }
    .sky-btn { width:36px; height:36px; font-size:.95rem; }
}
@media (prefers-reduced-motion: reduce) {
    #sky-app * { animation: none !important; transition: none !important; }
}
</style>

<script>
(function() {
    'use strict';

    if (window.__skyLoaded) return;
    window.__skyLoaded = true;

    /* ═══════════════════════════════════════════════════════════
       КОНСТАНТЫ
       ═══════════════════════════════════════════════════════════ */
    var STAR_COUNT = 600;
    var METEOR_INTERVAL = [3000, 8000];

    var STAR_COLORS = [
        { t:'O', c:[155,176,255], w:2 },   // голубые
        { t:'B', c:[170,191,255], w:5 },
        { t:'A', c:[202,215,255], w:8 },
        { t:'F', c:[248,247,255], w:15 },
        { t:'G', c:[255,244,234], w:20 },
        { t:'K', c:[255,210,161], w:30 },
        { t:'M', c:[255,180,140], w:20 }   // красные
    ];

    var CONSTELLATIONS = [
        { id:'ksanf', name:'Ксанф', icon:'🐍', desc:'Созвездие великого змея, пожирающего луну.',
          stars:[[0.2,0.1],[0.25,0.15],[0.3,0.12],[0.35,0.08],[0.4,0.05],[0.45,0.1],[0.42,0.18]] },
        { id:'hevsur', name:'Хевсур', icon:'📜', desc:'Созвездие летописца, хранящего память мира.',
          stars:[[1.5,0.3],[1.55,0.35],[1.6,0.32],[1.65,0.28],[1.6,0.22],[1.52,0.24],[1.5,0.3]] },
        { id:'akha', name:'Акха', icon:'💧', desc:'Созвездие богини воды. Мерцает голубым.',
          stars:[[3.2,0.2],[3.3,0.25],[3.4,0.22],[3.35,0.15],[3.25,0.18]] },
        { id:'eritrea', name:'Эритрей', icon:'🌊', desc:'Созвездие моря, указывающее путь кораблям.',
          stars:[[4.5,0.4],[4.6,0.42],[4.7,0.38],[4.65,0.32],[4.55,0.35],[4.5,0.4]] },
        { id:'kho', name:'Кхо', icon:'🗿', desc:'Созвездие глины и памяти. Самое старое на Марсе.',
          stars:[[5.5,0.25],[5.6,0.3],[5.7,0.28],[5.75,0.2]] },
        { id:'araksis', name:'Араксис', icon:'⚔️', desc:'Созвездие воина-защитника.',
          stars:[[2.3,0.5],[2.4,0.45],[2.5,0.48],[2.6,0.5],[2.55,0.55],[2.45,0.58]] }
    ];

    var PLANETS = [
        { id:'venus', name:'Венера', icon:'🌕', color:'#fff5cc', size:3, period:584 },
        { id:'jupiter', name:'Юпитер', icon:'🟠', color:'#ffb580', size:4, period:399 },
        { id:'saturn', name:'Сатурн', icon:'🪐', color:'#e0c080', size:3.5, period:378 }
    ];

    /* ═══════════════════════════════════════════════════════════
       УТИЛИТЫ
       ═══════════════════════════════════════════════════════════ */
    function seededRandom(seed){
        var s = seed % 2147483647;
        if (s <= 0) s += 2147483646;
        return function(){
            s = s * 16807 % 2147483647;
            return (s - 1) / 2147483646;
        };
    }

    function pickColor(rand){
        var total = 0, i;
        for (i = 0; i < STAR_COLORS.length; i++) total += STAR_COLORS[i].w;
        var r = rand() * total;
        for (i = 0; i < STAR_COLORS.length; i++){
            r -= STAR_COLORS[i].w;
            if (r <= 0) return STAR_COLORS[i].c;
        }
        return STAR_COLORS[4].c;
    }

    function pad(n){ return (n < 10 ? '0' : '') + n; }

    function getSeason(year){
        // Марсианское летоисчисление: 668.6 солов в году
        // Простое деление на 4 сезона по годам (для красоты)
        var cycle = (year - 600) % 4;
        var seasons = [
            { name:'Северное лето · Южная зима', icon:'☀️❄️', color:'#f39c12' },
            { name:'Северная осень · Южная весна', icon:'🍂🌸', color:'#e67e22' },
            { name:'Северная зима · Южное лето', icon:'❄️☀️', color:'#3498db' },
            { name:'Северная весна · Южная осень', icon:'🌱🍂', color:'#27ae60' }
        ];
        return seasons[Math.floor(cycle)];
    }

    /* ═══════════════════════════════════════════════════════════
       STATE
       ═══════════════════════════════════════════════════════════ */
    var state = {
        year: 2700,
        time: 22,
        rotationAngle: 0,
        autoRotate: false,
        autoPlay: false,
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        stars: [],
        meteors: [],
        hoveredObject: null,
        lastMeteor: 0
    };

    var canvas = document.getElementById('sky-canvas');
    var wrap = document.getElementById('sky-canvas-wrap');
    var ctx = canvas.getContext('2d');
    var tooltip = document.getElementById('sky-tooltip');
    var infoBody = document.getElementById('sky-info-body');
    var seasonEl = document.getElementById('sky-season');
    var weatherEl = document.getElementById('sky-weather');
    var searchInput = document.getElementById('sky-search');
    var searchResults = document.getElementById('sky-search-results');

    var W = 0, H = 0, DPR = 1;

    function resize(){
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        var rect = canvas.getBoundingClientRect();
        W = rect.width;
        H = rect.height;
        canvas.width = W * DPR;
        canvas.height = H * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    /* ═══════════════════════════════════════════════════════════
       ГЕНЕРАЦИЯ ЗВЁЗД
       ═══════════════════════════════════════════════════════════ */
    function generateStars(seed){
        var rnd = seededRandom(seed);
        var stars = [];
        for (var i = 0; i < STAR_COUNT; i++){
            var color = pickColor(rnd);
            stars.push({
                ra: rnd() * Math.PI * 2,
                dec: (rnd() - 0.5) * Math.PI,
                mag: Math.pow(rnd(), 1.6), // больше тусклых
                color: color,
                twinklePhase: rnd() * Math.PI * 2,
                twinkleSpeed: 0.5 + rnd() * 2
            });
        }
        return stars;
    }

    /* ═══════════════════════════════════════════════════════════
       ПОЛОЖЕНИЕ МАРСИАНСКИХ ЛУН
       ═══════════════════════════════════════════════════════════ */
    function getMoonPosition(periodDays, year, time){
        var marsYear = 687;
        var daysSinceEpoch = (year - 600) * marsYear + (time / 24);
        var phase = (daysSinceEpoch / periodDays) * Math.PI * 2;
        return {
            x: Math.cos(phase),
            y: Math.sin(phase * 0.6) * 0.55,
            phase: (phase % (Math.PI * 2)) / (Math.PI * 2) // 0..1 фаза
        };
    }

    function getCometPosition(year, time){
        var period = 1200;
        var phase = ((year - 600) / period) * Math.PI * 2 + (time / 24) * 0.3;
        return {
            x: Math.cos(phase),
            y: Math.sin(phase * 0.7) * 0.6,
            visible: Math.abs(Math.cos(phase)) < 0.9
        };
    }

    function getPlanetPosition(period, year, time){
        var daysSinceEpoch = (year - 600) * 687 + (time / 24);
        var phase = (daysSinceEpoch / period) * Math.PI * 2;
        return {
            x: Math.cos(phase) * 0.85,
            y: Math.sin(phase) * 0.4,
            visible: Math.sin(phase + Math.PI / 4) > -0.6
        };
    }

    /* ═══════════════════════════════════════════════════════════
       МЕТЕОРЫ
       ═══════════════════════════════════════════════════════════ */
    function spawnMeteor(){
        var fromLeft = Math.random() > 0.5;
        state.meteors.push({
            x: fromLeft ? -20 : W + 20,
            y: Math.random() * H * 0.6,
            vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 3),
            vy: 2 + Math.random() * 2,
            life: 1,
            len: 100 + Math.random() * 150,
            color: Math.random() > 0.7 ? '#ffd97a' : '#ffffff'
        });
    }

    /* ═══════════════════════════════════════════════════════════
       РИСОВАНИЕ
       ═══════════════════════════════════════════════════════════ */
    function draw(){
        var now = performance.now();

        // Фон с градиентом
        var bgGrad = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, Math.max(W, H) * 0.8);
        bgGrad.addColorStop(0, '#0a0a1e');
        bgGrad.addColorStop(0.5, '#050510');
        bgGrad.addColorStop(1, '#020208');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Млечный путь
        drawMilkyWay();

        // Северное сияние (лёгкое)
        drawAurora(now);

        // Звёзды с мерцанием
        var cx = W / 2 + state.offsetX;
        var cy = H / 2 + state.offsetY;
        var radius = Math.min(W, H) * 0.48 * state.zoom;

        state.stars.forEach(function(s){
            var ang = s.ra + state.rotationAngle;
            var x = cx + Math.cos(ang) * radius * Math.cos(s.dec * 0.8);
            var y = cy + Math.sin(s.dec) * radius * 0.6 + Math.sin(ang) * radius * 0.15;

            if (x < -10 || x > W + 10 || y < -10 || y > H + 10) return;

            // Мерцание
            var twinkle = 0.85 + Math.sin(now * 0.001 * s.twinkleSpeed + s.twinklePhase) * 0.15;
            var size = (0.4 + s.mag * 1.8) * Math.max(0.6, state.zoom * 0.9);
            var alpha = (0.35 + s.mag * 0.65) * twinkle;

            // Ореол для ярких
            if (s.mag > 0.65){
                var halo = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
                halo.addColorStop(0, 'rgba(' + s.color.join(',') + ',' + (alpha * 0.25) + ')');
                halo.addColorStop(1, 'rgba(' + s.color.join(',') + ',0)');
                ctx.fillStyle = halo;
                ctx.beginPath();
                ctx.arc(x, y, size * 4, 0, Math.PI * 2);
                ctx.fill();
            }

            // Звезда
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + s.color.join(',') + ',' + alpha + ')';
            ctx.fill();
        });

        // Созвёздия
        drawConstellations(cx, cy, radius);

        // Планеты
        PLANETS.forEach(function(p){
            var pos = getPlanetPosition(p.period, state.year, state.time);
            if (!pos.visible) return;
            var x = cx + pos.x * radius * 0.85;
            var y = cy + pos.y * radius * 0.5;
            drawPlanet(x, y, p);
        });

        // Марсианские луны
        var deimos = getMoonPosition(1.26, state.year, state.time);
        var phobos = getMoonPosition(0.32, state.year, state.time);

        if (Math.abs(deimos.x) < 0.95){
            var dx = cx + deimos.x * radius * 0.85;
            var dy = cy + deimos.y * radius * 0.5;
            drawMoon(dx, dy, 8, '#c9c4b8', 'Деймос', deimos.phase);
        }
        if (Math.abs(phobos.x) < 0.95){
            var px = cx + phobos.x * radius * 0.9;
            var py = cy + phobos.y * radius * 0.6;
            drawMoon(px, py, 11, '#b0aba0', 'Фобос', phobos.phase);
        }

        // Комета Ярра
        var comet = getCometPosition(state.year, state.time);
        if (comet.visible){
            var cx2 = cx + comet.x * radius * 0.75;
            var cy2 = cy + comet.y * radius * 0.5;
            drawComet(cx2, cy2);
        }

        // Метеоры
        drawMeteors();

        // Горизонт
        drawHorizon();

        // Подпись
        ctx.fillStyle = 'rgba(162,155,254,.5)';
        ctx.font = '12px Georgia';
        ctx.textAlign = 'right';
        ctx.fillText('Марс · ' + state.year + ' г. Э.О. · ' + pad(state.time) + ':00', W - 16, H - 16);

        // Hover-инфо
        if (state.hoveredObject){
            drawHover(state.hoveredObject);
        }
    }

    function drawMilkyWay(){
        var mwGrad = ctx.createLinearGradient(0, H * 0.15, W, H * 0.9);
        mwGrad.addColorStop(0, 'rgba(162,155,254,0)');
        mwGrad.addColorStop(0.25, 'rgba(162,155,254,.06)');
        mwGrad.addColorStop(0.5, 'rgba(108,99,255,.12)');
        mwGrad.addColorStop(0.75, 'rgba(162,155,254,.06)');
        mwGrad.addColorStop(1, 'rgba(162,155,254,0)');
        ctx.fillStyle = mwGrad;
        ctx.fillRect(0, 0, W, H);

        // Дополнительные облака туманности
        for (var i = 0; i < 3; i++){
            var gx = W * (0.2 + i * 0.3);
            var gy = H * (0.3 + i * 0.15);
            var gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, 200);
            gr.addColorStop(0, 'rgba(108,99,255,.08)');
            gr.addColorStop(1, 'rgba(108,99,255,0)');
            ctx.fillStyle = gr;
            ctx.beginPath();
            ctx.arc(gx, gy, 200, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawAurora(now){
        var pulse = 0.5 + Math.sin(now * 0.0005) * 0.3;
        var auroraGrad = ctx.createLinearGradient(0, 0, 0, H * 0.4);
        auroraGrad.addColorStop(0, 'rgba(39,174,96,' + (0.04 * pulse) + ')');
        auroraGrad.addColorStop(0.5, 'rgba(162,155,254,' + (0.06 * pulse) + ')');
        auroraGrad.addColorStop(1, 'rgba(162,155,254,0)');
        ctx.fillStyle = auroraGrad;
        ctx.fillRect(0, 0, W, H * 0.4);
    }

    function drawConstellations(cx, cy, radius){
        var now = performance.now();
        CONSTELLATIONS.forEach(function(c){
            if (c.stars.length < 2) return;

            // Линии
            ctx.strokeStyle = 'rgba(162,155,254,.35)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 6]);
            ctx.beginPath();
            var labelPos = null;
            c.stars.forEach(function(s, i){
                var ang = s[0] + state.rotationAngle;
                var x = cx + Math.cos(ang) * radius * Math.cos(s[1] * 0.8);
                var y = cy + Math.sin(s[1]) * radius * 0.6 + Math.sin(ang) * radius * 0.15;
                if (i === 0){ ctx.moveTo(x, y); labelPos = {x:x, y:y}; }
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.setLineDash([]);

            // Название
            if (labelPos && labelPos.x > 0 && labelPos.x < W && labelPos.y > 0 && labelPos.y < H){
                var hover = state.hoveredObject && state.hoveredObject.id === c.id;
                ctx.fillStyle = hover ? 'rgba(243,156,18,.95)' : 'rgba(162,155,254,.7)';
                ctx.font = 'bold 11px Georgia';
                ctx.textAlign = 'center';
                ctx.fillText(c.icon + ' ' + c.name, labelPos.x, labelPos.y - 14);

                if (hover){
                    ctx.strokeStyle = 'rgba(243,156,18,.6)';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.arc(labelPos.x, labelPos.y, 6, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }
        });
    }

    function drawMoon(x, y, r, color, label, phase){
        // Свечение
        var glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3.5);
        glow.addColorStop(0, 'rgba(255,240,200,.35)');
        glow.addColorStop(0.5, 'rgba(255,240,200,.1)');
        glow.addColorStop(1, 'rgba(255,240,200,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, r * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Тёмная часть (фаза)
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#2a2520';
        ctx.fill();

        // Светлая часть — зависти от фазы
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.clip();

        var offset = (phase - 0.5) * 2 * r;
        ctx.beginPath();
        ctx.arc(x - offset, y, r * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();

        // Кратер (точка на поверхности)
        ctx.beginPath();
        ctx.arc(x - r * 0.2, y - r * 0.15, r * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,.15)';
        ctx.fill();

        // Подпись
        ctx.fillStyle = 'rgba(255,255,200,.75)';
        ctx.font = '11px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + r + 14);

        // Hover-инфо
        if (state.hoveredObject && state.hoveredObject.id === label.toLowerCase()){
            ctx.strokeStyle = 'rgba(243,156,18,.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, r + 6, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function drawPlanet(x, y, planet){
        var r = planet.size;

        // Свечение
        var glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
        glow.addColorStop(0, 'rgba(255,255,255,.4)');
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Тело
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // Кольцо Сатурна
        if (planet.id === 'saturn'){
            ctx.beginPath();
            ctx.ellipse(x, y, r * 2, r * 0.5, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,220,160,.6)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        // Подпись
        ctx.fillStyle = 'rgba(255,220,160,.7)';
        ctx.font = '10px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, x, y + r + 12);
    }

    function drawComet(x, y){
        var g = ctx.createRadialGradient(x, y, 0, x, y, 26);
        g.addColorStop(0, 'rgba(255,240,200,.95)');
        g.addColorStop(0.3, 'rgba(255,220,140,.5)');
        g.addColorStop(1, 'rgba(255,200,100,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 26, 0, Math.PI * 2);
        ctx.fill();

        // Хвост
        var tail = ctx.createLinearGradient(x, y, x + 40, y + 20);
        tail.addColorStop(0, 'rgba(255,220,140,.5)');
        tail.addColorStop(1, 'rgba(255,220,140,0)');
        ctx.fillStyle = tail;
        ctx.beginPath();
        ctx.moveTo(x, y - 2);
        ctx.lineTo(x + 45, y + 25);
        ctx.lineTo(x + 45, y + 30);
        ctx.lineTo(x, y + 2);
        ctx.closePath();
        ctx.fill();

        // Ядро
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Подпись
        ctx.fillStyle = 'rgba(255,220,150,.85)';
        ctx.font = 'bold 11px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('☄ Ярра', x, y + 40);

        if (state.hoveredObject && state.hoveredObject.id === 'comet'){
            ctx.strokeStyle = 'rgba(243,156,18,.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function drawMeteors(){
        var now = performance.now();

        // Спавн
        if (now - state.lastMeteor > METEOR_INTERVAL[0] + Math.random() * (METEOR_INTERVAL[1] - METEOR_INTERVAL[0])){
            spawnMeteor();
            state.lastMeteor = now;
        }

        // Отрисовка
        state.meteors = state.meteors.filter(function(m){ return m.life > 0; });
        state.meteors.forEach(function(m){
            m.x += m.vx;
            m.y += m.vy;
            m.life -= 0.012;

            if (m.life <= 0) return;

            var tx = m.x - m.vx * (m.len / Math.abs(m.vx)) * 0.15;
            var ty = m.y - m.vy * (m.len / Math.abs(m.vy)) * 0.15;

            var grad = ctx.createLinearGradient(tx, ty, m.x, m.y);
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(1, 'rgba(' + (m.color === '#ffffff' ? '255,255,255' : '255,217,122') + ',' + m.life + ')');

            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Голова
            ctx.beginPath();
            ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + m.life + ')';
            ctx.fill();
        });
    }

    function drawHorizon(){
        var hzGrad = ctx.createLinearGradient(0, H - 100, 0, H);
        hzGrad.addColorStop(0, 'rgba(80,40,20,0)');
        hzGrad.addColorStop(0.6, 'rgba(100,45,20,.15)');
        hzGrad.addColorStop(1, 'rgba(120,50,20,.5)');
        ctx.fillStyle = hzGrad;
        ctx.fillRect(0, H - 100, W, 100);
    }

    function drawHover(obj){
        if (!obj.pos) return;
        ctx.fillStyle = 'rgba(243,156,18,.9)';
        ctx.font = 'bold 11px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('→ ' + obj.name, obj.pos.x, obj.pos.y - 30);
    }

    /* ═══════════════════════════════════════════════════════════
       ВРАЩЕНИЕ И АНИМАЦИЯ
       ═══════════════════════════════════════════════════════════ */
    var lastFrameTime = 0;

    function loop(now){
        if (!lastFrameTime) lastFrameTime = now;
        var dt = (now - lastFrameTime) / 1000;
        lastFrameTime = now;

        if (state.autoRotate) state.rotationAngle += dt * 0.05;
        if (state.autoPlay){
            state.time += dt * 0.5;
            if (state.time >= 24){
                state.time -= 24;
                state.year += 10;
            }
            updateSliders();
        }

        draw();
        requestAnimationFrame(loop);
    }

    function updateSliders(){
        var t = Math.floor(state.time);
        document.getElementById('sky-time').value = t;
        document.getElementById('sky-time-val').textContent = pad(t) + ':00';
        document.getElementById('sky-year').value = state.year;
        document.getElementById('sky-year-val').textContent = state.year;
        updateInfo();
    }

    /* ═══════════════════════════════════════════════════════════
       ИНФО-ПАНЕЛЬ
       ═══════════════════════════════════════════════════════════ */
    function updateInfo(){
        var deimos = getMoonPosition(1.26, state.year, state.time);
        var phobos = getMoonPosition(0.32, state.year, state.time);
        var comet = getCometPosition(state.year, state.time);

        infoBody.innerHTML =
            '<em>Деймос</em> ' + (Math.abs(deimos.x) < 0.95 ? '🌑 виден' : '🌒 за горизонтом') +
            ' · <em>Фобос</em> ' + (Math.abs(phobos.x) < 0.95 ? '🌕 виден' : '🌘 за горизонтом') +
            ' · <em>Комета Ярра</em> ' + (comet.visible ? '☄️ в поле зрения' : '💫 далеко') +
            '<br><span style="color:#888; font-size:.8rem;">Клик по небу — смена положения · Drag — панорама · Колесо — зум</span>';

        var season = getSeason(state.year);
        seasonEl.innerHTML = '<strong>Сезон:</strong> ' + season.icon + ' ' + season.name;
        weatherEl.innerHTML = '<strong>Погода:</strong> 🌡️ −63°C · 💨 Пыльные бури умеренные';
    }

    /* ═══════════════════════════════════════════════════════════
       СОБЫТИЯ
       ═══════════════════════════════════════════════════════════ */
    document.getElementById('sky-year').oninput = function(){
        state.year = parseInt(this.value, 10);
        document.getElementById('sky-year-val').textContent = state.year;
        state.stars = generateStars(state.year);
        updateInfo();
    };
    document.getElementById('sky-time').oninput = function(){
        state.time = parseInt(this.value, 10);
        document.getElementById('sky-time-val').textContent = pad(state.time) + ':00';
        updateInfo();
    };

    document.getElementById('sky-rotate').onclick = function(){
        state.autoRotate = !state.autoRotate;
        this.classList.toggle('active', state.autoRotate);
    };
    document.getElementById('sky-play').onclick = function(){
        state.autoPlay = !state.autoPlay;
        this.textContent = state.autoPlay ? '⏸' : '▶';
        this.classList.toggle('active', state.autoPlay);
    };
    document.getElementById('sky-reset').onclick = function(){
        state.year = 2700;
        state.time = 22;
        state.rotationAngle = 0;
        state.zoom = 1;
        state.offsetX = 0;
        state.offsetY = 0;
        state.stars = generateStars(state.year);
        updateSliders();
        document.getElementById('sky-zoom').value = 100;
        document.getElementById('sky-zoom-val').textContent = '100%';
    };

    /* Fullscreen */
    document.getElementById('sky-fullscreen').onclick = function(){
        if (!document.fullscreenElement){
            (wrap.requestFullscreen || wrap.webkitRequestFullscreen).call(wrap);
        } else {
            (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        }
    };

    /* Screenshot */
    document.getElementById('sky-shot').onclick = function(){
        var link = document.createElement('a');
        link.download = 'mars-sky-' + state.year + '-' + pad(state.time) + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    /* Zoom */
    document.getElementById('sky-zoom').oninput = function(){
        state.zoom = parseInt(this.value, 10) / 100;
        document.getElementById('sky-zoom-val').textContent = this.value + '%';
    };

    /* Drag и pan */
    var dragging = false, dragStart = { x:0, y:0, ox:0, oy:0 };
    wrap.addEventListener('mousedown', function(e){
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        dragging = true;
        dragStart = { x:e.clientX, y:e.clientY, ox:state.offsetX, oy:state.offsetY };
        wrap.classList.add('dragging');
    });
    document.addEventListener('mousemove', function(e){
        if (!dragging) return;
        state.offsetX = dragStart.ox + (e.clientX - dragStart.x);
        state.offsetY = dragStart.oy + (e.clientY - dragStart.y);
    });
    document.addEventListener('mouseup', function(){
        dragging = false;
        wrap.classList.remove('dragging');
    });

    /* Колёсико — зум */
    wrap.addEventListener('wheel', function(e){
        e.preventDefault();
        var delta = e.deltaY > 0 ? -0.1 : 0.1;
        state.zoom = Math.max(0.5, Math.min(2, state.zoom + delta));
        document.getElementById('sky-zoom').value = Math.round(state.zoom * 100);
        document.getElementById('sky-zoom-val').textContent = Math.round(state.zoom * 100) + '%';
    }, { passive:false });

    /* Touch */
    var lastTouch = null;
    wrap.addEventListener('touchstart', function(e){
        if (e.touches.length === 1){
            lastTouch = { x:e.touches[0].clientX, y:e.touches[0].clientY };
        }
    }, { passive:true });
    wrap.addEventListener('touchmove', function(e){
        if (e.touches.length === 1 && lastTouch){
            state.offsetX += e.touches[0].clientX - lastTouch.x;
            state.offsetY += e.touches[0].clientY - lastTouch.y;
            lastTouch = { x:e.touches[0].clientX, y:e.touches[0].clientY };
        }
    }, { passive:true });
    wrap.addEventListener('touchend', function(){ lastTouch = null; });

    /* Клик */
    canvas.addEventListener('click', function(e){
        var rect = canvas.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        state.rotationAngle += (x - 0.5) * 0.3;
    });

    /* Hover */
    canvas.addEventListener('mousemove', function(e){
        var rect = canvas.getBoundingClientRect();
        var mx = e.clientX - rect.left;
        var my = e.clientY - rect.top;

        // Проверка попадания по созвездиям
        state.hoveredObject = null;
        var cx = W / 2 + state.offsetX;
        var cy = H / 2 + state.offsetY;
        var radius = Math.min(W, H) * 0.48 * state.zoom;

        CONSTELLATIONS.forEach(function(c){
            var s = c.stars[0];
            var ang = s[0] + state.rotationAngle;
            var x = cx + Math.cos(ang) * radius * Math.cos(s[1] * 0.8);
            var y = cy + Math.sin(s[1]) * radius * 0.6 + Math.sin(ang) * radius * 0.15;
            var dist = Math.hypot(mx - x, my - y);
            if (dist < 40){
                state.hoveredObject = { id:c.id, name:c.name, desc:c.desc, pos:{ x:x, y:y } };
                tooltip.textContent = c.icon + ' ' + c.name + ' — ' + c.desc;
                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
                tooltip.classList.add('show');
            }
        });

        if (!state.hoveredObject){
            tooltip.classList.remove('show');
        }
    });

    /* Поиск */
    var searchIndex = CONSTELLATIONS.map(function(c){ return { id:c.id, name:c.name, icon:c.icon, type:'Созвездие' }; })
        .concat([
            { id:'phobos', name:'Фобос', icon:'🌕', type:'Луна' },
            { id:'deimos', name:'Деймос', icon:'🌑', type:'Луна' },
            { id:'comet', name:'Комета Ярра', icon:'☄', type:'Комета' },
            { id:'venus', name:'Венера', icon:'🌕', type:'Планета' },
            { id:'jupiter', name:'Юпитер', icon:'🟠', type:'Планета' },
            { id:'saturn', name:'Сатурн', icon:'🪐', type:'Планета' }
        ]);

    searchInput.addEventListener('input', function(){
        var q = this.value.toLowerCase().trim();
        if (!q){ searchResults.classList.remove('open'); return; }

        var matches = searchIndex.filter(function(item){
            return item.name.toLowerCase().indexOf(q) !== -1;
        });

        if (!matches.length){
            searchResults.innerHTML = '<div class="sky-search-item" style="color:#999;">Ничего не найдено</div>';
        } else {
            searchResults.innerHTML = matches.map(function(m){
                return '<div class="sky-search-item" data-id="' + m.id + '">' +
                    '<span class="sky-search-icon">' + m.icon + '</span>' +
                    '<span><strong>' + m.name + '</strong> · ' + m.type + '</span>' +
                '</div>';
            }).join('');
        }
        searchResults.classList.add('open');

        searchResults.querySelectorAll('.sky-search-item').forEach(function(el){
            el.onclick = function(){
                var id = el.dataset.id;
                var c = CONSTELLATIONS.filter(function(x){ return x.id === id; })[0];
                if (c){
                    // Поворачиваем к созвездию
                    state.rotationAngle = -c.stars[0][0];
                }
                searchInput.value = '';
                searchResults.classList.remove('open');
            };
        });
    });

    document.addEventListener('click', function(e){
        if (!e.target.closest('#sky-search-wrap')){
            searchResults.classList.remove('open');
        }
    });

    /* URL-состояние */
    function loadFromURL(){
        var p = new URLSearchParams(location.search);
        if (p.has('y')) state.year = parseInt(p.get('y'), 10) || 2700;
        if (p.has('t')) state.time = parseInt(p.get('t'), 10) || 22;
        if (p.has('a')) state.rotationAngle = parseFloat(p.get('a')) || 0;
    }
    loadFromURL();

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */
    function init(){
        resize();
        state.stars = generateStars(state.year);
        window.addEventListener('resize', resize);
        document.getElementById('sky-year').value = state.year;
        document.getElementById('sky-year-val').textContent = state.year;
        document.getElementById('sky-time').value = state.time;
        document.getElementById('sky-time-val').textContent = pad(state.time) + ':00';
        updateInfo();
        requestAnimationFrame(loop);
        console.log('🌠 Симулятор неба v2 VIP запущен');
    }

    if (document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
