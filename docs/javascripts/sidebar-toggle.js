// docs/javascripts/sidebar-toggle.js
console.log('✅ sidebar-toggle.js ЗАГРУЗИЛСЯ!');
alert('Скрипт работает!');

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ sidebar-toggle.js загружен');

        const sidebar = document.querySelector('.wy-nav-side');
        if (!sidebar) {
            console.warn('⚠️ Боковое меню не найдено');
            return;
        }

        // Создаём кнопку (всегда видимая, для теста)
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-btn';
        toggleBtn.innerHTML = '☰ Скрыть меню';
        toggleBtn.style.cssText = `
            position: fixed;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000;
            background: #6C63FF;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 10px 16px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        `;

        document.body.prepend(toggleBtn);

        let hidden = false;

        toggleBtn.addEventListener('click', function() {
            hidden = !hidden;
            if (hidden) {
                sidebar.style.display = 'none';
                toggleBtn.innerHTML = '▶ Показать меню';
            } else {
                sidebar.style.display = '';
                toggleBtn.innerHTML = '☰ Скрыть меню';
            }
        });

        console.log('✅ Кнопка создана');
    });
})();
