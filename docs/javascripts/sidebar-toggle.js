/ docs/javascripts/sidebar-toggle.js

(function() {
    console.log('✅ sidebar-toggle.js загружен (тест)');

    document.addEventListener('DOMContentLoaded', function() {
        // Кнопка всегда видна для теста
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-btn';
        toggleBtn.innerHTML = '☰ Скрыть';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 60px;
            left: 10px;
            z-index: 99999;
            background: #6C63FF;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 10px 16px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        `;
        document.body.prepend(toggleBtn);

        const sidebar = document.querySelector('.wy-nav-side');
        const content = document.querySelector('.wy-nav-content');
        let hidden = false;

        toggleBtn.addEventListener('click', function() {
            hidden = !hidden;
            if (sidebar && content) {
                if (hidden) {
                    sidebar.style.display = 'none';
                    content.style.marginLeft = '0';
                    content.style.maxWidth = '100%';
                    toggleBtn.innerHTML = '▶ Показать';
                } else {
                    sidebar.style.display = '';
                    content.style.marginLeft = '';
                    content.style.maxWidth = '';
                    toggleBtn.innerHTML = '☰ Скрыть';
                }
            }
        });

        console.log('✅ Тестовая кнопка создана');
    });
})();
