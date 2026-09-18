// mars-dust.js — фоновые частицы пыли Марса
(function() {
    'use strict';
    if (window.innerWidth < 768) return;

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.4;';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function(p) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(231, 76, 60, ' + p.alpha + ')';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#e74c3c';
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();
