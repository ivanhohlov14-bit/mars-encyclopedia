// vip-cursor.js — светящийся курсор с искрами
(function() {
    'use strict';
    if (window.innerWidth < 768) return;

    // Стили
    var style = document.createElement('style');
    style.textContent = [
        '* { cursor: none !important; }',
        '#vip-cursor { position: fixed; width: 20px; height: 20px; border: 2px solid #6C63FF; border-radius: 50%; pointer-events: none; z-index: 999999; transition: transform 0.1s, background 0.2s; box-shadow: 0 0 20px #6C63FF, 0 0 40px rgba(108,99,255,0.4); transform: translate(-50%, -50%); }',
        '#vip-cursor.hover { background: #6C63FF; transform: translate(-50%, -50%) scale(1.5); }',
        '.vip-spark { position: fixed; width: 4px; height: 4px; background: #A29BFE; border-radius: 50%; pointer-events: none; z-index: 999998; animation: sparkFade 0.8s ease forwards; box-shadow: 0 0 8px #A29BFE; }',
        '@keyframes sparkFade { to { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); } }'
    ].join('\n');
    document.head.appendChild(style);

    // Курсор
    var c = document.createElement('div');
    c.id = 'vip-cursor';
    document.body.appendChild(c);

    var lastX = 0, lastY = 0, frame = 0;
    document.addEventListener('mousemove', function(e) {
        c.style.left = e.clientX + 'px';
        c.style.top = e.clientY + 'px';

        frame++;
        if (frame % 3 !== 0) return;

        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) < 3) return;

        var spark = document.createElement('div');
        spark.className = 'vip-spark';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        spark.style.setProperty('--dx', (-dx * 2) + 'px');
        spark.style.setProperty('--dy', (-dy * 2) + 'px');
        document.body.appendChild(spark);
        setTimeout(function() { spark.remove(); }, 800);

        lastX = e.clientX;
        lastY = e.clientY;
    });

    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('a, button, .pf-btn, .pf-tab')) c.classList.add('hover');
    });
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('a, button, .pf-btn, .pf-tab')) c.classList.remove('hover');
    });
})();
