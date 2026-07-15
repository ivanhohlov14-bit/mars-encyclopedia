(function() {
    const storageKey = 'mars-theme';

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(storageKey, theme);
    }

    function getStoredTheme() {
        return localStorage.getItem(storageKey) || 'light';
    }

    // Устанавливаем тему сразу (до DOMContentLoaded), чтобы не было мерцания
    const initialTheme = getStoredTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Ждём загрузки DOM, чтобы привязать события
    document.addEventListener('DOMContentLoaded', function() {
        // Ищем кнопку переключения темы (в теме readthedocs она может быть с классом .wy-toggle-theme)
        let toggleBtn = document.querySelector('.wy-toggle-theme') || document.querySelector('#theme-toggle');

        if (toggleBtn) {
            // Переопределяем обработчик клика
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const current = document.documentElement.getAttribute('data-theme');
                const next = (current === 'dark') ? 'light' : 'dark';
                setTheme(next);
            });
        } else {
            // Если кнопки нет — создаём свою
            createCustomToggle();
        }
    });

    function createCustomToggle() {
        const nav = document.querySelector('.wy-nav-side');
        if (!nav) return;

        const btn = document.createElement('button');
        btn.textContent = 'Сменить тему';
        btn.style.cssText = `
            display: block;
            margin: 10px auto;
            padding: 8px 16px;
            background: #2a2a4a;
            color: #e0e0e0;
            border: 1px solid #3a3a5a;
            border-radius: 4px;
            cursor: pointer;
        `;
        btn.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = (current === 'dark') ? 'light' : 'dark';
            setTheme(next);
        });
        nav.appendChild(btn);
    }
})();
