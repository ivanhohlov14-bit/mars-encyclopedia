// docs/javascripts/sidebar-toggle.js

(function() {
    console.log('✅ sidebar-toggle.js загружен (простая версия)');

    document.addEventListener('DOMContentLoaded', function() {
        // Работаем только на ПК
        if (window.innerWidth <= 768) return;

        const sidebar = document.querySelector('.wy-nav-side');
        const content = document.querySelector('.wy-nav-content');
        if (!sidebar || !content) {
            console.warn('⚠️ Элементы не найдены');
            return;
        }

        // Создаём кнопку (всегда видима)
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-btn';
        toggleBtn.innerHTML = '◀';
        toggleBtn.style.cssText = `
            position: fixed;
            left: 10px;
            top: 10px;
            z-index: 9999;
            background: #6C63FF;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 6px 10px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;

        document.body.prepend(toggleBtn);

        let isHidden = false;

        toggleBtn.addEventListener('click', function() {
            isHidden = !isHidden;
            if (isHidden) {
                sidebar.style.display = 'none';
                content.style.marginLeft = '0';
                content.style.maxWidth = '100%';
                toggleBtn.innerHTML = '▶';
            } else {
                sidebar.style.display = '';
                content.style.marginLeft = '';
                content.style.maxWidth = '';
                toggleBtn.innerHTML = '◀';
            }
        });

        // При изменении размера окна
        window.addEventListener('resize', function() {
            const nowMobile = window.innerWidth <= 768;
            if (nowMobile) {
                // Возвращаем всё как было
                sidebar.style.display = '';
                content.style.marginLeft = '';
                content.style.maxWidth = '';
                toggleBtn.style.display = 'none';
            } else {
                toggleBtn.style.display = 'block';
            }
        });

        console.log('✅ Простая кнопка меню создана');
    });
})();
