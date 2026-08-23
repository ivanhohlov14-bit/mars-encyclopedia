// docs/javascripts/sidebar-toggle.js

(function() {
    // Ждём загрузки страницы
    document.addEventListener('DOMContentLoaded', function() {
        // Создаём кнопку-гамбургер
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle';
        toggleBtn.innerHTML = '☰';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 1000;
            background: #6C63FF;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 6px 12px;
            font-size: 20px;
            cursor: pointer;
            display: none; /* Скрываем на больших экранах */
        `;

        // Добавляем кнопку на страницу
        document.body.prepend(toggleBtn);

        // Находим боковое меню (обычно это .wy-nav-side)
        const sidebar = document.querySelector('.wy-nav-side');
        if (!sidebar) return;

        // Функция переключения
        function toggleSidebar() {
            const isHidden = sidebar.style.display === 'none';
            sidebar.style.display = isHidden ? '' : 'none';
            // Меняем иконку
            toggleBtn.innerHTML = isHidden ? '☰' : '✕';
        }

        // Обработчик клика
        toggleBtn.addEventListener('click', toggleSidebar);

        // Показываем кнопку только если ширина экрана меньше 768px (телефоны)
        function checkWidth() {
            if (window.innerWidth <= 768) {
                toggleBtn.style.display = 'block';
                // На телефонах меню по умолчанию скрыто
                sidebar.style.display = 'none';
            } else {
                toggleBtn.style.display = 'none';
                sidebar.style.display = '';
            }
        }

        checkWidth();
        window.addEventListener('resize', checkWidth);
    });
})();
