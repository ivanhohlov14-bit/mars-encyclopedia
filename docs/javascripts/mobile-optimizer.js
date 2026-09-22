// mobile-optimizer.js — управляет загрузкой скриптов на телефоне
(function() {
    'use strict';

    // Определяем мобильный
    var isMobile = window.innerWidth <= 768 ||
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Список скриптов, которые НЕ нужны на телефоне
    var SKIP_ON_MOBILE = [
        'vip-cursor.js',           // кастомный курсор — на тач не работает
        'vip-scroll-reveal.js',    // анимации при скролле — тяжело
        'mars-dust.js',            // частицы пыли — жрут CPU
        'mars-tts.js',             // TTS — на телефоне свой
        'sound-engine.js',
        'sound-ui.js',
        'ui-sounds.js',
        'mars-audio.js',
        'mars-sound-synth.js',
        'sidebar-toggle.js',       // только ПК
        'sidebar-scroll.js',
        'intro.js',                // онбординг мешает
        'effects-menu.js',
        'device-link.js',          // QR-связка только с ПК
        'qr-scanner.js',
        'yandex-metrika.js'        // на мобильном можно отложить
    ];

    if (!isMobile) {
        console.log('[mobile-optimizer] ПК — все скрипты разрешены');
        return;
    }

    console.log('[mobile-optimizer] 📱 Мобильный — блокируем тяжёлые скрипты');

    // Блокируем <script src=...> для списка
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            m.addedNodes.forEach(function(node) {
                if (node.tagName === 'SCRIPT' && node.src) {
                    var src = node.src.toLowerCase();
                    for (var i = 0; i < SKIP_ON_MOBILE.length; i++) {
                        if (src.indexOf(SKIP_ON_MOBILE[i].toLowerCase()) !== -1) {
                            node.remove();
                            console.log('[mobile-optimizer] ❌ Заблокирован:', SKIP_ON_MOBILE[i]);
                            return;
                        }
                    }
                }
            });
        });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Также блокируем уже загруженные теги
    document.querySelectorAll('script[src]').forEach(function(s) {
        var src = s.src.toLowerCase();
        for (var i = 0; i < SKIP_ON_MOBILE.length; i++) {
            if (src.indexOf(SKIP_ON_MOBILE[i].toLowerCase()) !== -1) {
                s.remove();
                return;
            }
        }
    });

    // Помечаем body — чтобы CSS мог адаптироваться
    document.documentElement.classList.add('is-mobile');

    // Просим браузер не грузить тяжёлые картинки ниже fold
    window.addEventListener('load', function() {
        document.querySelectorAll('img:not([loading])').forEach(function(img) {
            var rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
        });
    });
})();
