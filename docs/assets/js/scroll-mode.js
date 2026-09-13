// scroll-mode.js — переключение режима "древний свиток"
(function() {
    'use strict';

    const KEY = 'mars_scroll_mode';

    function isActive() {
        return localStorage.getItem(KEY) === 'true';
    }

    function applyState() {
        if (isActive()) {
            document.documentElement.classList.add('scroll-mode');
            document.body.classList.add('scroll-mode');
            if (toggleBtn) toggleBtn.textContent = '📖';
            if (toggleBtn) toggleBtn.title = 'Обычный режим';
        } else {
            document.documentElement.classList.remove('scroll-mode');
            document.body.classList.remove('scroll-mode');
            if (toggleBtn) toggleBtn.textContent = '📜';
            if (toggleBtn) toggleBtn.title = 'Режим свитка';
        }
    }

    let toggleBtn = null;

    function createToggle() {
        if (document.getElementById('scroll-mode-toggle')) {
            toggleBtn = document.getElementById('scroll-mode-toggle');
            return;
        }
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'scroll-mode-toggle';
        toggleBtn.setAttribute('aria-label', 'Режим свитка');
        toggleBtn.onclick = function() {
            localStorage.setItem(KEY, isActive() ? 'false' : 'true');
            applyState();
            try { if (navigator.vibrate) navigator.vibrate(15); } catch(e) {}
        };
        document.body.appendChild(toggleBtn);
    }

    function init() {
        createToggle();
        applyState();
        console.log('📜 Режим свитка доступен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
