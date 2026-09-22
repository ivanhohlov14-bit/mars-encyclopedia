// mobile-touch.js — оптимизация тача
(function() {
    'use strict';
    var isMobile = window.innerWidth <= 768 ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;

    // 1. Убираем 300ms задержку на кликах
    document.addEventListener('touchstart', function() {}, { passive: true });

    // 2. Убираем "hover-залипание" на тач-устройствах
    document.addEventListener('touchstart', function(e) {
        var el = e.target;
        if (el && el.tagName) {
            el.classList.add('touching');
            setTimeout(function() { el.classList.remove('touching'); }, 200);
        }
    }, { passive: true });

    // 3. Отключаем hover-эффекты (они на тач не работают, только жрут)
    var st = document.createElement('style');
    st.textContent = `
        @media (hover: none) and (pointer: coarse) {
            .pf-quick-card:hover,
            .pf-card:hover,
            .pf-timer-card:hover,
            .pf-ach:hover,
            .pf-note:hover,
            .pf-notif:hover,
            .pf-friend:hover,
            .pf-btn:hover,
            .pf-tab:hover { transform: none !important; box-shadow: inherit !important; }
        }
        .touching { opacity: 0.7; }
    `;
    document.head.appendChild(st);

    // 4. Скролл-оптимизация
    var scrollTick = false;
    window.addEventListener('scroll', function() {
        if (scrollTick) return;
        scrollTick = true;
        requestAnimationFrame(function() {
            document.documentElement.style.setProperty('--scroll-y', window.scrollY + 'px');
            scrollTick = false;
        });
    }, { passive: true });

    console.log('[mobile-touch] ✅ Оптимизация тача включена');
})();
