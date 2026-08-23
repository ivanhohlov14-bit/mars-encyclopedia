// docs/javascripts/sidebar-toggle.js

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Проверяем, что это ПК (ширина > 768px)
        const isMobile = window.innerWidth <= 768;

        // На телефонах не вмешиваемся — пусть работает как обычно
        if (isMobile) return;

        // Находим боковое меню
        const sidebar = document.querySelector('.wy-nav-side');
        if (!sidebar) return;

        // Создаём кнопку для сворачивания/разворачивания
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-pc';
        toggleBtn.innerHTML = '◀';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            z-index: 1000;
            background: #6C63FF;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 6px 8px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            transition: left 0.3s;
        `;

        document.body.prepend(toggleBtn);

        let isSidebarHidden = false;

        function toggleSidebar() {
            isSidebarHidden = !isSidebarHidden;
            if (isSidebarHidden) {
                sidebar.style.display = 'none';
                toggleBtn.innerHTML = '▶';
                toggleBtn.style.left = '10px';
            } else {
                sidebar.style.display = '';
                toggleBtn.innerHTML = '◀';
                toggleBtn.style.left = '10px';
            }
        }

        toggleBtn.addEventListener('click', toggleSidebar);

        // При изменении размера окна проверяем, не стало ли оно мобильным
        window.addEventListener('resize', function() {
            const nowMobile = window.innerWidth <= 768;
            if (nowMobile) {
                // Возвращаем меню в исходное состояние
                sidebar.style.display = '';
                toggleBtn.style.display = 'none';
            } else {
                toggleBtn.style.display = 'block';
            }
        });
    });
})();
