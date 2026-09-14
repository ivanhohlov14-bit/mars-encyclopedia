---
title: 🏙️ Марсианский город
comments: false
---

<div id="game-app" style="max-width: 1200px; margin: 0 auto; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; padding: 0 8px;">

<!-- Верхняя панель — ресурсы -->
<div id="game-topbar" style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center; padding:14px 18px; background:linear-gradient(135deg, #1a1a2e, #252550); border-radius:14px; margin-bottom:14px; border:1px solid rgba(108,99,255,0.3); box-shadow:0 8px 24px rgba(0,0,0,0.15);">

    <div class="res-chip" data-res="gold">
        <span class="res-icon">💰</span>
        <span class="res-name">Злато</span>
        <strong class="res-value" id="res-gold">500</strong>
        <span class="res-rate" id="rate-gold">+5/мин</span>
    </div>

    <div class="res-chip" data-res="water">
        <span class="res-icon">💧</span>
        <span class="res-name">Вода</span>
        <strong class="res-value" id="res-water">300</strong>
        <span class="res-rate" id="rate-water">+3/мин</span>
    </div>

    <div class="res-chip" data-res="knowledge">
        <span class="res-icon">📚</span>
        <span class="res-name">Знание</span>
        <strong class="res-value" id="res-knowledge">150</strong>
        <span class="res-rate" id="rate-knowledge">+2/мин</span>
    </div>

    <div class="res-chip" data-res="clay">
        <span class="res-icon">🧱</span>
        <span class="res-name">Глина</span>
        <strong class="res-value" id="res-clay">200</strong>
        <span class="res-rate" id="rate-clay">+4/мин</span>
    </div>

</div>

<!-- Сцена -->
<div style="position:relative; border-radius:16px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.35);">
    <canvas id="game-canvas" style="display:block; width:100%; height:620px; background:#1a1015; cursor:grab; touch-action:none;"></canvas>

    <!-- Мини-легенда -->
    <div id="game-hint" style="position:absolute; bottom:12px; left:12px; padding:8px 14px; background:rgba(0,0,0,0.6); color:#fff; font-size:0.78rem; border-radius:20px; backdrop-filter:blur(8px); pointer-events:none;">
        💡 Клик по зданию — улучшить · Тяни мышью — двигать · Колёсико — зум
    </div>

    <!-- Счётчик дня -->
    <div id="game-day" style="position:absolute; top:12px; right:12px; padding:8px 16px; background:rgba(0,0,0,0.6); color:#fff; font-size:0.85rem; font-weight:700; border-radius:20px; backdrop-filter:blur(8px); pointer-events:none;">
        ☀️ День 1
    </div>
</div>

<!-- Панель здания (появляется при клике) -->
<div id="building-panel" style="display:none; margin-top:14px; padding:20px 24px; background:linear-gradient(135deg, #1a1a2e, #252550); border-radius:16px; color:#fff; border:2px solid #6C63FF; box-shadow:0 20px 60px rgba(108,99,255,0.3);"></div>

<p style="margin-top:20px; text-align:center;">
    <a href="/" style="color:#6C63FF; font-weight:600;">← На главную</a>
</p>

</div>

<style>
.res-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: rgba(108,99,255,0.12);
    border: 1px solid rgba(108,99,255,0.3);
    border-radius: 24px;
    font-size: 0.85rem;
    color: #d4d4e4;
    transition: all 0.2s;
}
.res-chip:hover {
    background: rgba(108,99,255,0.25);
    transform: translateY(-2px);
}
.res-icon { font-size: 1.1rem; }
.res-name { font-size: 0.78rem; color: #9999bb; text-transform: uppercase; letter-spacing: 0.5px; }
.res-value { color: #fff; font-size: 1rem; font-weight: 800; margin-left: 4px; }
.res-rate { font-size: 0.72rem; color: #A29BFE; margin-left: 4px; }

.bp-title {
    font-size: 1.4rem;
    font-weight: 900;
    margin: 0 0 8px 0;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 12px;
}
.bp-sub {
    color: #9999bb;
    font-size: 0.85rem;
    margin: 0 0 16px 0;
}
.bp-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
    padding: 14px;
    background: rgba(108,99,255,0.1);
    border-radius: 12px;
}
.bp-stat {
    text-align: center;
}
.bp-stat-label {
    font-size: 0.72rem;
    color: #9999bb;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
}
.bp-stat-value {
    font-size: 1.15rem;
    font-weight: 800;
    color: #A29BFE;
}
.bp-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
.bp-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 24px;
    font-size: 0.92rem;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
    touch-action: manipulation;
}
.bp-btn.primary {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: #fff;
    box-shadow: 0 8px 20px rgba(39,174,96,0.4);
}
.bp-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(39,174,96,0.6);
}
.bp-btn.primary:disabled {
    background: #444;
    color: #888;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}
.bp-btn.secondary {
    background: rgba(255,255,255,0.1);
    color: #d4d4e4;
    border: 1px solid rgba(255,255,255,0.2);
}
.bp-btn.secondary:hover {
    background: rgba(255,255,255,0.2);
}
.bp-cost {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 0.85rem;
    margin: 12px 0;
    color: #d4d4e4;
}
.bp-cost span { display: flex; align-items: center; gap: 4px; }
.bp-cost span.ok { color: #2ecc71; }
.bp-cost span.no { color: #e74c3c; }

@media (max-width: 700px) {
    #game-canvas { height: 420px !important; }
    .res-chip { font-size: 0.75rem; padding: 6px 10px; }
    .res-name { display: none; }
    .res-rate { display: none; }
}
</style>

<script>
(function() {
    'use strict';

    // ============================================================
    // 📐 КОНСТАНТЫ ИЗОМЕТРИИ
    // ============================================================
    const TILE_W = 64;       // ширина ромба
    const TILE_H = 32;       // высота ромба
    const GRID = 8;          // 8x8 сетка
    const MAP_SIZE = GRID * TILE_W;

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const panel = document.getElementById('building-panel');

    let W = 0, H = 0, DPR = 1;

    // Камера
    let camX = 0, camY = 0;
    let zoom = 1;

    // День/ночь
    let dayTime = 0; // 0..1

    // ============================================================
    // 🏛️ ТИПЫ ЗДАНИЙ
    // ============================================================
    const BUILDING_TYPES = {
        palace: {
            name: 'Дворец',
            emoji: '🏛️',
            desc: 'Сердце города. Управляет всеми зданиями.',
            baseColor: { top: '#e8b87a', left: '#b88a4a', right: '#8b6330' },
            baseHeight: 60,
            levelHeights: [60, 80, 100],
            maxLevel: 3
        },
        academy: {
            name: 'Академия',
            emoji: '📚',
            desc: 'Производит знание и обучает учёных.',
            baseColor: { top: '#a9c8e8', left: '#7aa0c0', right: '#557a96' },
            baseHeight: 45,
            levelHeights: [45, 60, 75],
            maxLevel: 3
        },
        temple: {
            name: 'Храм Акхи',
            emoji: '🛕',
            desc: 'Увеличивает добычу воды и даёт благословение.',
            baseColor: { top: '#e8d9a9', left: '#c8b880', right: '#a09060' },
            baseHeight: 55,
            levelHeights: [55, 75, 95],
            maxLevel: 3
        },
        barracks: {
            name: 'Казарма',
            emoji: '⚔️',
            desc: 'Обучает воинов для защиты города.',
            baseColor: { top: '#e8a0a0', left: '#c07070', right: '#965050' },
            baseHeight: 40,
            levelHeights: [40, 55, 70],
            maxLevel: 3
        },
        market: {
            name: 'Рынок',
            emoji: '🏪',
            desc: 'Производит злато и улучшает торговлю.',
            baseColor: { top: '#e8c87a', left: '#c8a84a', right: '#a08030' },
            baseHeight: 35,
            levelHeights: [35, 45, 60],
            maxLevel: 3
        },
        farm: {
            name: 'Ферма',
            emoji: '🌾',
            desc: 'Производит глину и кормит город.',
            baseColor: { top: '#b8d878', left: '#90b050', right: '#6b8a30' },
            baseHeight: 25,
            levelHeights: [25, 35, 45],
            maxLevel: 3
        }
    };

    // ============================================================
    // 🏰 СОСТОЯНИЕ ИГРЫ
    // ============================================================
    const game = {
        resources: {
            gold: 500,
            water: 300,
            knowledge: 150,
            clay: 200
        },
        buildings: [
            { id: 1, type: 'palace', gx: 4, gy: 4, level: 1 },
            { id: 2, type: 'academy', gx: 1, gy: 2, level: 1 },
            { id: 3, type: 'temple', gx: 6, gy: 2, level: 1 },
            { id: 4, type: 'barracks', gx: 2, gy: 6, level: 1 },
            { id: 5, type: 'market', gx: 5, gy: 6, level: 1 },
            { id: 6, type: 'farm', gx: 1, gy: 5, level: 1 }
        ],
        selectedId: null,
        particles: [],
        buildAnimations: [] // {buildingId, startTime, fromHeight, toHeight}
    };

    // Ресурсные ставки (в минуту)
    const RATES = {
        gold: 5,
        water: 3,
        knowledge: 2,
        clay: 4
    };

    // Стоимость апгрейда по типам
    const UPGRADE_COST = {
        palace:    { gold: 200, water: 100, knowledge: 50,  clay: 150 },
        academy:   { gold: 100, water: 50,  knowledge: 80,  clay: 100 },
        temple:    { gold: 120, water: 150, knowledge: 30,  clay: 120 },
        barracks:  { gold: 150, water: 40,  knowledge: 20,  clay: 180 },
        market:    { gold: 100, water: 60,  knowledge: 40,  clay: 100 },
        farm:      { gold: 80,  water: 100, knowledge: 10,  clay: 90  }
    };

    // ============================================================
    // 📐 ИЗОМЕТРИЧЕСКИЕ ПРЕОБРАЗОВАНИЯ
    // ============================================================
    function gridToScreen(gx, gy) {
        return {
            x: (gx - gy) * TILE_W / 2,
            y: (gx + gy) * TILE_H / 2
        };
    }

    function screenToGrid(sx, sy) {
        // Обратное преобразование
        const x = sx / (TILE_W / 2);
        const y = sy / (TILE_H / 2);
        return {
            gx: (x + y) / 2,
            gy: (y - x) / 2
        };
    }

    // ============================================================
    // 📐 РАЗМЕР КАНВАСА
    // ============================================================
    function resize() {
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        W = rect.width;
        H = rect.height;
        canvas.width = W * DPR;
        canvas.height = H * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        // Центрируем камеру в первый раз
        if (camX === 0 && camY === 0) {
            camX = W / 2 - TILE_W / 2;
            camY = H / 2 - (MAP_SIZE / 2) * TILE_H / 2 - 100;
        }
    }

    // ============================================================
    // 🌅 ФОН — НЕБО И ЗЕМЛЯ
    // ============================================================
    function drawSky() {
        // Освещение: день=0.5, ночь=0
        const lightLevel = 0.5 + 0.5 * Math.sin(dayTime * Math.PI * 2 - Math.PI / 2);
        const isNight = lightLevel < 0.3;

        // Верхний градиент — небо
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        if (isNight) {
            skyGrad.addColorStop(0, '#0a0a18');
            skyGrad.addColorStop(0.6, '#1a1030');
            skyGrad.addColorStop(1, '#2b1030');
        } else {
            skyGrad.addColorStop(0, '#c94a3a');
            skyGrad.addColorStop(0.4, '#e8896a');
            skyGrad.addColorStop(0.7, '#f0b98a');
            skyGrad.addColorStop(1, '#d49a6a');
        }
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // Солнце / Луна
        const sunX = W * 0.85;
        const sunY = H * (0.15 + 0.3 * Math.sin(dayTime * Math.PI * 2 - Math.PI / 2));
        if (isNight) {
            // Луна
            ctx.beginPath();
            ctx.arc(sunX, sunY, 30, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(220, 220, 240, 0.85)';
            ctx.shadowColor = 'rgba(220,220,240,0.6)';
            ctx.shadowBlur = 40;
            ctx.fill();
            ctx.shadowBlur = 0;
        } else {
            // Солнце
            const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 80);
            sunGlow.addColorStop(0, 'rgba(255, 240, 200, 0.9)');
            sunGlow.addColorStop(0.4, 'rgba(255, 200, 150, 0.5)');
            sunGlow.addColorStop(1, 'rgba(255, 200, 150, 0)');
            ctx.fillStyle = sunGlow;
            ctx.beginPath();
            ctx.arc(sunX, sunY, 80, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
            ctx.fillStyle = '#fff8e0';
            ctx.fill();
        }

        // Далёкие горы
        ctx.beginPath();
        const mountains = [
            [0, H * 0.5], [W * 0.15, H * 0.35], [W * 0.3, H * 0.45],
            [W * 0.45, H * 0.3], [W * 0.6, H * 0.4], [W * 0.75, H * 0.28],
            [W * 0.9, H * 0.42], [W, H * 0.38]
        ];
        ctx.moveTo(0, H);
        mountains.forEach(m => ctx.lineTo(m[0], m[1]));
        ctx.lineTo(W, H);
        ctx.closePath();
        const mountainGrad = ctx.createLinearGradient(0, H * 0.3, 0, H);
        if (isNight) {
            mountainGrad.addColorStop(0, '#2b1030');
            mountainGrad.addColorStop(1, '#1a0818');
        } else {
            mountainGrad.addColorStop(0, '#8b4a3a');
            mountainGrad.addColorStop(1, '#5c2a20');
        }
        ctx.fillStyle = mountainGrad;
        ctx.fill();
    }

    // ============================================================
    // 🟫 РИСУЕМ ПЛИТКУ
    // ============================================================
    function drawTile(gx, gy, isHover) {
        const s = gridToScreen(gx, gy);
        const x = s.x + camX + TILE_W / 2;
        const y = s.y + camY;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + TILE_W / 2, y + TILE_H / 2);
        ctx.lineTo(x, y + TILE_H);
        ctx.lineTo(x - TILE_W / 2, y + TILE_H / 2);
        ctx.closePath();

        // Шахматный паттерн
        const isLight = (gx + gy) % 2 === 0;
        ctx.fillStyle = isLight ? '#c97a5a' : '#b86a4a';
        if (isHover) ctx.fillStyle = '#e0a080';
        ctx.fill();

        // Контур
        ctx.strokeStyle = 'rgba(90, 40, 20, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // ============================================================
    // 🏛️ РИСУЕМ ЗДАНИЕ (изометрический бокс)
    // ============================================================
    function drawBuilding(b, isSelected) {
        const type = BUILDING_TYPES[b.type];
        const s = gridToScreen(b.gx, b.gy);
        const cx = s.x + camX + TILE_W / 2;
        const cy = s.y + camY + TILE_H / 2;

        // Текущая высота (с анимацией)
        let height = type.levelHeights[b.level - 1] || type.baseHeight;
        const anim = game.buildAnimations.find(a => a.buildingId === b.id);
        if (anim) {
            const t = Math.min((Date.now() - anim.startTime) / 500, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            height = anim.fromHeight + (anim.toHeight - anim.fromHeight) * eased;
            if (t >= 1) {
                game.buildAnimations = game.buildAnimations.filter(a => a.buildingId !== b.id);
            }
        }

        const w = TILE_W * 0.7;
        const h = TILE_H * 0.7;

        // Тень
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + w, cy + h / 2);
        ctx.lineTo(cx, cy + h);
        ctx.lineTo(cx - w, cy + h / 2);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fill();

        // Верхняя грань
        ctx.beginPath();
        ctx.moveTo(cx, cy - height - h);
        ctx.lineTo(cx + w, cy - height);
        ctx.lineTo(cx, cy - height + h);
        ctx.lineTo(cx - w, cy - height);
        ctx.closePath();
        ctx.fillStyle = type.baseColor.top;
        ctx.fill();

        // Левая грань
        ctx.beginPath();
        ctx.moveTo(cx - w, cy - height);
        ctx.lineTo(cx, cy - height + h);
        ctx.lineTo(cx, cy + h);
        ctx.lineTo(cx - w, cy);
        ctx.closePath();
        ctx.fillStyle = type.baseColor.left;
        ctx.fill();

        // Правая грань
        ctx.beginPath();
        ctx.moveTo(cx + w, cy - height);
        ctx.lineTo(cx, cy - height + h);
        ctx.lineTo(cx, cy + h);
        ctx.lineTo(cx + w, cy);
        ctx.closePath();
        ctx.fillStyle = type.baseColor.right;
        ctx.fill();

        // Эмодзи сверху
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(type.emoji, cx, cy - height - 8);

        // Уровень — звёздочки
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#f39c12';
        ctx.fillText('★'.repeat(b.level), cx, cy - height - 30);

        // Выделение
        if (isSelected) {
            ctx.beginPath();
            ctx.moveTo(cx, cy - height - h - 6);
            ctx.lineTo(cx + w + 6, cy - height - 6);
            ctx.lineTo(cx, cy - height + h + 6);
            ctx.lineTo(cx - w - 6, cy - height - 6);
            ctx.closePath();
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }

    // ============================================================
    // ⚡ ЧАСТИЦЫ (для эффектов)
    // ============================================================
    function spawnParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            game.particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: -Math.random() * 5 - 2,
                life: 1,
                size: 3 + Math.random() * 3,
                color: color
            });
        }
    }

    function drawParticles() {
        game.particles = game.particles.filter(p => p.life > 0);
        game.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15;
            p.life -= 0.02;
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    // ============================================================
    // 🎨 ГЛАВНЫЙ DRAW
    // ============================================================
    let hoverTile = null;

    function draw() {
        // Фон
        drawSky();

        // Сетка
        for (let gy = 0; gy < GRID; gy++) {
            for (let gx = 0; gx < GRID; gx++) {
                const isHover = hoverTile && hoverTile.gx === gx && hoverTile.gy === gy;
                drawTile(gx, gy, isHover);
            }
        }

        // Здания — сортируем по (gx+gy) — задние первыми
        const sorted = game.buildings.slice().sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));
        sorted.forEach(b => {
            drawBuilding(b, b.id === game.selectedId);
        });

        // Частицы
        drawParticles();

        // Затемнение ночью
        const lightLevel = 0.5 + 0.5 * Math.sin(dayTime * Math.PI * 2 - Math.PI / 2);
        if (lightLevel < 0.5) {
            ctx.fillStyle = `rgba(10, 10, 40, ${(0.5 - lightLevel) * 0.4})`;
            ctx.fillRect(0, 0, W, H);
        }

        requestAnimationFrame(draw);
    }

    // ============================================================
    // 🖱️ КЛИК
    // ============================================================
    function getClickGrid(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const sx = (clientX - rect.left) - camX - TILE_W / 2;
        const sy = (clientY - rect.top) - camY - TILE_H / 2;

        const grid = screenToGrid(sx, sy);
        return {
            gx: Math.round(grid.gx),
            gy: Math.round(grid.gy)
        };
    }

    function findBuildingAt(gx, gy) {
        return game.buildings.find(b => b.gx === gx && b.gy === gy);
    }

    function onClick(e) {
        const tile = getClickGrid(e.clientX, e.clientY);
        const b = findBuildingAt(tile.gx, tile.gy);

        if (b) {
            game.selectedId = b.id;
            showBuildingPanel(b);
            try { if (navigator.vibrate) navigator.vibrate(15); } catch(e) {}
        } else {
            game.selectedId = null;
            panel.style.display = 'none';
        }
    }

    // ============================================================
    // 🏗️ ПАНЕЛЬ ЗДАНИЯ
    // ============================================================
    function canAfford(cost) {
        for (const key in cost) {
            if (game.resources[key] < cost[key]) return false;
        }
        return true;
    }

    function costHTML(cost, has) {
        return Object.keys(cost).map(k => {
            const ok = game.resources[k] >= cost[k];
            const icons = { gold: '💰', water: '💧', knowledge: '📚', clay: '🧱' };
            const names = { gold: 'злато', water: 'вода', knowledge: 'знание', clay: 'глина' };
            return `<span class="${ok ? 'ok' : 'no'}">${icons[k]} ${cost[k]} ${names[k]}</span>`;
        }).join('');
    }

    function showBuildingPanel(b) {
        const type = BUILDING_TYPES[b.type];
        const isMax = b.level >= type.maxLevel;
        const cost = UPGRADE_COST[b.type];

        panel.style.display = 'block';
        panel.innerHTML = `
            <h2 class="bp-title">
                <span style="font-size:2rem;">${type.emoji}</span>
                ${type.name}
                <span style="font-size:0.85rem;color:#f39c12;margin-left:auto;">${'★'.repeat(b.level)}${'☆'.repeat(type.maxLevel - b.level)}</span>
            </h2>
            <p class="bp-sub">${type.desc}</p>

            <div class="bp-stats">
                <div class="bp-stat">
                    <div class="bp-stat-label">Уровень</div>
                    <div class="bp-stat-value">${b.level} / ${type.maxLevel}</div>
                </div>
                <div class="bp-stat">
                    <div class="bp-stat-label">Координаты</div>
                    <div class="bp-stat-value">${b.gx}, ${b.gy}</div>
                </div>
                <div class="bp-stat">
                    <div class="bp-stat-label">Эффект</div>
                    <div class="bp-stat-value">+${b.level * 10}%</div>
                </div>
            </div>

            ${!isMax ? `
                <div style="margin-bottom:8px; color:#9999bb; font-size:0.85rem; font-weight:700;">Стоимость улучшения:</div>
                <div class="bp-cost">${costHTML(cost, canAfford(cost))}</div>
                <div class="bp-actions">
                    <button class="bp-btn primary" id="bp-upgrade" ${!canAfford(cost) ? 'disabled' : ''}>
                        🏗️ Улучшить до ур. ${b.level + 1}
                    </button>
                    <button class="bp-btn secondary" id="bp-close">Закрыть</button>
                </div>
            ` : `
                <div style="text-align:center; padding:20px; background:rgba(243,156,18,0.15); border-radius:12px; color:#f39c12; font-weight:800;">
                    ⭐ Максимальный уровень достигнут
                </div>
                <div class="bp-actions" style="margin-top:12px;">
                    <button class="bp-btn secondary" id="bp-close">Закрыть</button>
                </div>
            `}
        `;

        const closeBtn = document.getElementById('bp-close');
        if (closeBtn) closeBtn.onclick = () => {
            game.selectedId = null;
            panel.style.display = 'none';
        };

        if (!isMax) {
            const upBtn = document.getElementById('bp-upgrade');
            if (upBtn) upBtn.onclick = () => upgradeBuilding(b);
        }
    }

    // ============================================================
    // ⬆️ УЛУЧШЕНИЕ
    // ============================================================
    function upgradeBuilding(b) {
        const type = BUILDING_TYPES[b.type];
        const cost = UPGRADE_COST[b.type];

        if (!canAfford(cost)) return;

        // Списываем ресурсы
        for (const k in cost) game.resources[k] -= cost[k];

        // Старая и новая высота
        const oldHeight = type.levelHeights[b.level - 1];
        b.level++;
        const newHeight = type.levelHeights[b.level - 1];

        // Анимация
        game.buildAnimations.push({
            buildingId: b.id,
            startTime: Date.now(),
            fromHeight: oldHeight,
            toHeight: newHeight
        });

        // Частицы
        const s = gridToScreen(b.gx, b.gy);
        const cx = s.x + camX + TILE_W / 2;
        const cy = s.y + camY + TILE_H / 2;
        spawnParticles(cx, cy - 30, 25, '#f39c12');
        spawnParticles(cx, cy - 30, 15, '#6C63FF');

        try { if (navigator.vibrate) navigator.vibrate([20, 30, 20]); } catch(e) {}

        // Обновляем UI
        updateResources();
        showBuildingPanel(b);
    }

    // ============================================================
    // 💰 ОБНОВЛЕНИЕ РЕСУРСОВ
    // ============================================================
    function updateResources() {
        ['gold', 'water', 'knowledge', 'clay'].forEach(k => {
            const el = document.getElementById('res-' + k);
            if (el) el.textContent = Math.floor(game.resources[k]);
        });
    }

    // Начисление ресурсов раз в секунду
    setInterval(() => {
        ['gold', 'water', 'knowledge', 'clay'].forEach(k => {
            // Учитываем бонусы зданий
            let bonus = 1;
            if (k === 'gold') {
                const m = game.buildings.find(b => b.type === 'market');
                if (m) bonus += m.level * 0.1;
            }
            if (k === 'water') {
                const t = game.buildings.find(b => b.type === 'temple');
                if (t) bonus += t.level * 0.1;
            }
            if (k === 'knowledge') {
                const a = game.buildings.find(b => b.type === 'academy');
                if (a) bonus += a.level * 0.1;
            }
            if (k === 'clay') {
                const f = game.buildings.find(b => b.type === 'farm');
                if (f) bonus += f.level * 0.1;
            }
            game.resources[k] += (RATES[k] / 60) * bonus;
        });
    }, 1000);

    // ============================================================
    // 🕐 ДЕНЬ/НОЧЬ
    // ============================================================
    let dayCount = 1;
    setInterval(() => {
        dayTime += 0.001; // цикл ~16 минут
        if (dayTime >= 1) {
            dayTime = 0;
            dayCount++;
            document.getElementById('game-day').textContent = (dayCount % 2 === 0 ? '🌙' : '☀️') + ' День ' + dayCount;
        }
    }, 100);

    // ============================================================
    // 🖱️ МЫШЬ / ТАЧ
    // ============================================================
    let isDragging = false;
    let dragStart = { x: 0, y: 0, camX: 0, camY: 0 };
    let hasMoved = false;

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        hasMoved = false;
        dragStart = { x: e.clientX, y: e.clientY, camX: camX, camY: camY };
        canvas.style.cursor = 'grabbing';
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasMoved = true;
            camX = dragStart.camX + dx;
            camY = dragStart.camY + dy;
        } else {
            // Hover
            const t = getClickGrid(e.clientX, e.clientY);
            if (t.gx >= 0 && t.gx < GRID && t.gy >= 0 && t.gy < GRID) {
                hoverTile = t;
            } else {
                hoverTile = null;
            }
        }
    });

    window.addEventListener('mouseup', () => {
        if (isDragging && !hasMoved) {
            // Это был клик, не перетаскивание
            // Но mousedown был на canvas
        }
        isDragging = false;
        canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('click', (e) => {
        if (!hasMoved) onClick(e);
    });

    // Тач
    let touchStartDist = 0;
    let touchStartZoom = 1;

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            hasMoved = false;
            dragStart = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                camX: camX,
                camY: camY
            };
        } else if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            touchStartDist = Math.sqrt(dx * dx + dy * dy);
            touchStartZoom = zoom;
        }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isDragging) {
            const dx = e.touches[0].clientX - dragStart.x;
            const dy = e.touches[0].clientY - dragStart.y;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasMoved = true;
            camX = dragStart.camX + dx;
            camY = dragStart.camY + dy;
        } else if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            zoom = Math.max(0.5, Math.min(2, touchStartZoom * (dist / touchStartDist)));
        }
    }, { passive: true });

    canvas.addEventListener('touchend', (e) => {
        if (isDragging && !hasMoved && e.changedTouches.length === 1) {
            onClick({
                clientX: e.changedTouches[0].clientX,
                clientY: e.changedTouches[0].clientY
            });
        }
        isDragging = false;
    }, { passive: true });

    // Зум колёсиком
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        zoom = Math.max(0.5, Math.min(2, zoom - e.deltaY * 0.001));
    }, { passive: false });

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function init() {
        resize();
        window.addEventListener('resize', resize);
        updateResources();
        requestAnimationFrame(draw);
        console.log('🏙️ Марсианский город: загружено ' + game.buildings.length + ' зданий');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
