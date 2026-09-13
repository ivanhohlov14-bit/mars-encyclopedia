---
title: Ночное небо Марса
comments: false
---

<div id="sky-app" style="max-width: 1100px; margin: 0 auto;">

<div style="text-align:center; margin-bottom:16px;">
    <h1 style="font-size:1.8rem; letter-spacing:2px; background:linear-gradient(135deg,#A29BFE,#6C63FF); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin:0 0 8px;">🌠 Ночное небо Марса</h1>
    <p style="color:#888; font-size:0.9rem; margin:0;">Положение светил и созвездий в разные годы</p>
</div>

<div id="sky-controls" style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center; align-items:center; background:#f5f7fa; padding:14px 18px; border-radius:12px; margin-bottom:16px; font-size:0.9rem;">
    <label style="display:flex; align-items:center; gap:8px;">
        <span>Год Э.О.:</span>
        <input type="range" id="sky-year" min="600" max="2740" value="2700" step="10" style="width:180px;">
        <strong id="sky-year-val" style="color:#6C63FF; min-width:60px; text-align:center;">2700</strong>
    </label>
    <label style="display:flex; align-items:center; gap:8px;">
        <span>Время:</span>
        <input type="range" id="sky-time" min="0" max="24" value="22" step="1" style="width:140px;">
        <strong id="sky-time-val" style="color:#6C63FF; min-width:55px; text-align:center;">22:00</strong>
    </label>
    <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
        <input type="checkbox" id="sky-rotation" style="accent-color:#6C63FF;">
        <span>Вращение</span>
    </label>
</div>

<canvas id="sky-canvas" style="display:block; width:100%; height:600px; border-radius:14px; box-shadow:0 20px 60px rgba(0,0,0,0.5); cursor:crosshair; touch-action:none;"></canvas>

<div id="sky-info" style="margin-top:16px; padding:14px 18px; background:#f5f7fa; border-radius:12px; font-size:0.85rem; color:#555; line-height:1.6;"></div>

</div>

<style>
#sky-app input[type="range"] { accent-color: #6C63FF; }
@media (max-width: 700px) {
    #sky-canvas { height: 400px !important; }
    #sky-controls { font-size: 0.8rem; }
}
</style>

<script>
(function() {
    'use strict';

    const canvas = document.getElementById('sky-canvas');
    const ctx = canvas.getContext('2d');
    const yearSlider = document.getElementById('sky-year');
    const timeSlider = document.getElementById('sky-time');
    const yearVal = document.getElementById('sky-year-val');
    const timeVal = document.getElementById('sky-time-val');
    const rotationCheck = document.getElementById('sky-rotation');
    const infoEl = document.getElementById('sky-info');

    let W = 0, H = 0, DPR = 1;

    function resize() {
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        W = rect.width;
        H = rect.height;
        canvas.width = W * DPR;
        canvas.height = H * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    // ============================================================
    // 🌌 ЗВЁЗДЫ — статичный набор, но меняем положение по углу
    // ============================================================
    const STAR_COUNT = 380;

    function seeded(seed) {
        // простой ГПСЧ
        let s = seed % 2147483647;
        if (s <= 0) s += 2147483646;
        return function() {
            s = s * 16807 % 2147483647;
            return (s - 1) / 2147483646;
        };
    }

    function generateStars(seed) {
        const rnd = seeded(seed);
        const stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                ra: rnd() * Math.PI * 2,     // азимут
                dec: (rnd() - 0.5) * Math.PI, // высота от горизонта
                mag: rnd(),                  // яркость
                tint: rnd()
            });
        }
        return stars;
    }

    // Созвёздия — рисуем несколько ключевых
    const CONSTELLATIONS = [
        {
            name: 'Ксанф',
            stars: [
                { ra: 0.2, dec: 0.1 }, { ra: 0.25, dec: 0.15 }, { ra: 0.3, dec: 0.12 },
                { ra: 0.35, dec: 0.08 }, { ra: 0.4, dec: 0.05 }
            ]
        },
        {
            name: 'Хевсур',
            stars: [
                { ra: 1.5, dec: 0.3 }, { ra: 1.55, dec: 0.35 }, { ra: 1.6, dec: 0.32 },
                { ra: 1.65, dec: 0.28 }, { ra: 1.6, dec: 0.25 }, { ra: 1.55, dec: 0.3 }
            ]
        },
        {
            name: 'Акха',
            stars: [
                { ra: 3.2, dec: 0.2 }, { ra: 3.3, dec: 0.25 }, { ra: 3.4, dec: 0.22 },
                { ra: 3.35, dec: 0.18 }
            ]
        },
        {
            name: 'Эритрей',
            stars: [
                { ra: 4.5, dec: 0.4 }, { ra: 4.6, dec: 0.42 }, { ra: 4.7, dec: 0.38 },
                { ra: 4.65, dec: 0.35 }
            ]
        }
    ];

    // ============================================================
    // 🌙 СПУТНИКИ
    // ============================================================
    function getDeimosPosition(year, time) {
        const periodDays = 1.26;
        const marsYear = 687;
        const daysSinceEpoch = (year - 600) * marsYear;
        const phase = (daysSinceEpoch / periodDays) * Math.PI * 2;
        const hourPhase = (time / 24) * Math.PI * 2;
        const x = Math.cos(phase + hourPhase);
        const y = Math.sin(phase + hourPhase) * 0.5;
        return { x, y };
    }

    function getPhobosPosition(year, time) {
        const periodDays = 0.32;
        const marsYear = 687;
        const daysSinceEpoch = (year - 600) * marsYear;
        const phase = (daysSinceEpoch / periodDays) * Math.PI * 2;
        const hourPhase = (time / 24) * Math.PI * 2;
        const x = Math.cos(phase + hourPhase);
        const y = Math.sin(phase + hourPhase) * 0.5;
        return { x, y };
    }

    // ============================================================
    // ☄️ КОМЕТА ЯРРА
    // ============================================================
    function getCometPosition(year, time) {
        const period = 1200;
        const phase = ((year - 600) / period) * Math.PI * 2 + (time / 24) * 0.3;
        const x = Math.cos(phase);
        const y = Math.sin(phase * 0.7) * 0.6;
        return { x, y, visible: Math.abs(x) < 0.9 && Math.abs(y) < 0.9 };
    }

    // ============================================================
    // 🎨 РИСОВАНИЕ
    // ============================================================
    let currentStars = generateStars(42);
    let currentYear = 2700;
    let currentTime = 22;
    let rotationAngle = 0;

    function draw() {
        // Фон — ночное небо
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#050510');
        grad.addColorStop(0.7, '#0a0a18');
        grad.addColorStop(1, '#050510');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Млечный путь — туманность по диагонали
        const milky = ctx.createLinearGradient(0, H * 0.2, W, H * 0.8);
        milky.addColorStop(0, 'rgba(162, 155, 254, 0)');
        milky.addColorStop(0.3, 'rgba(162, 155, 254, 0.08)');
        milky.addColorStop(0.5, 'rgba(108, 99, 255, 0.12)');
        milky.addColorStop(0.7, 'rgba(162, 155, 254, 0.08)');
        milky.addColorStop(1, 'rgba(162, 155, 254, 0)');
        ctx.fillStyle = milky;
        ctx.fillRect(0, 0, W, H);

        // Звёзды
        const cx = W / 2;
        const cy = H / 2;
        const radius = Math.min(W, H) * 0.48;

        currentStars.forEach(s => {
            const ang = s.ra + rotationAngle;
            const x = cx + Math.cos(ang) * radius * Math.cos(s.dec * 0.8);
            const y = cy + Math.sin(s.dec) * radius * 0.6 + Math.sin(ang) * radius * 0.15;

            if (x < 0 || x > W || y < 0 || y > H) return;

            const size = 0.4 + s.mag * 1.6;
            const alpha = 0.3 + s.mag * 0.7;

            // Ореол
            if (s.mag > 0.7) {
                const g = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
                g.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.3})`);
                g.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(x, y, size * 4, 0, Math.PI * 2);
                ctx.fill();
            }

            // Звезда
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            const tintColor = s.tint > 0.85 ? '162, 155, 254' : '255, 255, 255';
            ctx.fillStyle = `rgba(${tintColor}, ${alpha})`;
            ctx.fill();
        });

        // Созвёздия
        ctx.strokeStyle = 'rgba(162, 155, 254, 0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);

        CONSTELLATIONS.forEach(c => {
            if (c.stars.length < 2) return;
            ctx.beginPath();
            c.stars.forEach((s, i) => {
                const ang = s.ra + rotationAngle;
                const x = cx + Math.cos(ang) * radius * Math.cos(s.dec * 0.8);
                const y = cy + Math.sin(s.dec) * radius * 0.6 + Math.sin(ang) * radius * 0.15;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Название
            const first = c.stars[0];
            const ang = first.ra + rotationAngle;
            const labelX = cx + Math.cos(ang) * radius * Math.cos(first.dec * 0.8);
            const labelY = cy + Math.sin(first.dec) * radius * 0.6 + Math.sin(ang) * radius * 0.15;
            ctx.fillStyle = 'rgba(162, 155, 254, 0.6)';
            ctx.font = '11px Georgia';
            ctx.textAlign = 'center';
            ctx.fillText(c.name, labelX, labelY - 12);
        });
        ctx.setLineDash([]);

        // Деймос
        const deimos = getDeimosPosition(currentYear, currentTime);
        if (Math.abs(deimos.x) < 0.95) {
            const dx = cx + deimos.x * radius * 0.8;
            const dy = cy + deimos.y * radius * 0.5;
            drawMoon(dx, dy, 8, '#c9c4b8', 'Деймос');
        }

        // Фобос
        const phobos = getPhobosPosition(currentYear, currentTime);
        if (Math.abs(phobos.x) < 0.95) {
            const px = cx + phobos.x * radius * 0.9;
            const py = cy + phobos.y * radius * 0.6;
            drawMoon(px, py, 10, '#a8a398', 'Фобос');
        }

        // Комета Ярра
        const comet = getCometPosition(currentYear, currentTime);
        if (comet.visible) {
            const cx2 = cx + comet.x * radius * 0.7;
            const cy2 = cy + comet.y * radius * 0.5;

            const g = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, 20);
            g.addColorStop(0, 'rgba(255, 240, 200, 0.9)');
            g.addColorStop(0.5, 'rgba(255, 200, 100, 0.4)');
            g.addColorStop(1, 'rgba(255, 200, 100, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(cx2, cy2, 20, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx2, cy2, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.fillStyle = 'rgba(255, 220, 150, 0.8)';
            ctx.font = '11px Georgia';
            ctx.textAlign = 'center';
            ctx.fillText('☄ Ярра', cx2, cy2 + 22);
        }

        // Горизонт
        const hzGrad = ctx.createLinearGradient(0, H - 80, 0, H);
        hzGrad.addColorStop(0, 'rgba(80, 40, 20, 0)');
        hzGrad.addColorStop(1, 'rgba(120, 50, 20, 0.4)');
        ctx.fillStyle = hzGrad;
        ctx.fillRect(0, H - 80, W, 80);

        // Подпись
        ctx.fillStyle = 'rgba(162, 155, 254, 0.5)';
        ctx.font = '12px Georgia';
        ctx.textAlign = 'right';
        ctx.fillText('Марс · ' + currentYear + ' г. Э.О. · ' + pad(currentTime) + ':00', W - 16, H - 16);
    }

    function drawMoon(x, y, r, color, label) {
        // Свечение
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        g.addColorStop(0, 'rgba(255, 240, 200, 0.3)');
        g.addColorStop(1, 'rgba(255, 240, 200, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fill();

        // Тело
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Тень
        ctx.beginPath();
        ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fill();

        // Подпись
        ctx.fillStyle = 'rgba(255, 255, 200, 0.75)';
        ctx.font = '11px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + r + 14);
    }

    function pad(n) {
        return (n < 10 ? '0' : '') + n;
    }

    // ============================================================
    // АНИМАЦИЯ
    // ============================================================
    let lastTime = 0;

    function loop(now) {
        if (rotationCheck.checked) {
            if (!lastTime) lastTime = now;
            const dt = (now - lastTime) / 1000;
            lastTime = now;
            rotationAngle += dt * 0.05;
        } else {
            lastTime = 0;
        }
        draw();
        requestAnimationFrame(loop);
    }

    // ============================================================
    // СОБЫТИЯ
    // ============================================================
    function updateInfo() {
        const deimos = getDeimosPosition(currentYear, currentTime);
        const phobos = getPhobosPosition(currentYear, currentTime);
        const comet = getCometPosition(currentYear, currentTime);

        infoEl.innerHTML =
            '<strong>Наблюдение:</strong> ' +
            'Деймос ' + (Math.abs(deimos.x) < 0.95 ? '🌑 виден' : '🌒 за горизонтом') + ' · ' +
            'Фобос ' + (Math.abs(phobos.x) < 0.95 ? '🌕 виден' : '🌘 за горизонтом') + ' · ' +
            'Комета Ярра ' + (comet.visible ? '☄️ в поле зрения' : '💫 далеко') +
            '<br><span style="color:#888;">Год Э.О. — марсианское летоисчисление. Клик по небу — смена положения.</span>';
    }

    yearSlider.oninput = function() {
        currentYear = parseInt(this.value, 10);
        yearVal.textContent = currentYear;
        // Обновляем звёзды (сдвиг по годам)
        currentStars = generateStars(currentYear);
        updateInfo();
    };

    timeSlider.oninput = function() {
        currentTime = parseInt(this.value, 10);
        timeVal.textContent = pad(currentTime) + ':00';
        updateInfo();
    };

    // Клик по canvas — случайный сдвиг
    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        rotationAngle += (x - 0.5) * 0.3;
    });

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        resize();
        window.addEventListener('resize', resize);
        updateInfo();
        requestAnimationFrame(loop);
        console.log('🌠 Симулятор неба запущен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
