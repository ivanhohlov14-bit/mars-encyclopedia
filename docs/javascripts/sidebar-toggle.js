// docs/javascripts/sidebar-toggle.js

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Работаем только на ПК (ширина > 768px)
        if (window.innerWidth <= 768) return;

        const sidebar = document.querySelector('.wy-nav-side');
        const content = document.querySelector('.wy-nav-content');
        if (!sidebar || !content) {
            console.warn('⚠️ Элементы меню не найдены');
            return;
        }

        // Создаём невидимую область-ловушку у левого края
        const hotspot = document.createElement('div');
        hotspot.id = 'sidebar-hotspot';
        hotspot.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: 20px;
            height: 100%;
            z-index: 999;
            cursor: pointer;
            background: transparent;
        `;

        // Создаём саму кнопку (изначально скрыта)
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-btn';
        toggleBtn.innerHTML = '☰';
        toggleBtn.style.cssText = `
            position: fixed;
            left: 0;
            top: 10px;
            z-index: 1000;
            background: #6C63FF;
            color: #fff;
            border: none;
            border-radius: 0 8px 8px 0;
            padding: 8px 10px;
            font-size: 18px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s, left 0.3s;
            box-shadow: 2px 0 12px rgba(0,0,0,0.15);
            pointer-events: none;
        `;

        document.body.prepend(hotspot);
        document.body.prepend(toggleBtn);

        let isSidebarHidden = false;

        function toggleSidebar() {
            isSidebarHidden = !isSidebarHidden;
            if (isSidebarHidden) {
                // Скрываем меню
                sidebar.style.marginLeft = '-300px';
                sidebar.style.transition = 'margin-left 0.3s';
                // Расширяем контент
                content.style.marginLeft = '0';
                content.style.maxWidth = '100%';
                toggleBtn.innerHTML = '☰';
                toggleBtn.style.left = '0px';
            } else {
                // Показываем меню
                sidebar.style.marginLeft = '0';
                content.style.marginLeft = '';
                content.style.maxWidth = '';
                toggleBtn.innerHTML = '◀';
                toggleBtn.style.left = '0px';
            }
        }

        // Показываем кнопку при наведении на ловушку
        hotspot.addEventListener('mouseenter', function() {
            toggleBtn.style.opacity = '1';
            toggleBtn.style.pointerEvents = 'auto';
        });

        // Скрываем кнопку, если ушли с ловушки или с самой кнопки
        function hideButton() {
            setTimeout(function() {
                if (!hotspot.matches(':hover') && !toggleBtn.matches(':hover')) {
                    toggleBtn.style.opacity = '0';
                    toggleBtn.style.pointerEvents = 'none';
                }
            }, 300);
        }

        hotspot.addEventListener('mouseleave', hideButton);
        toggleBtn.addEventListener('mouseleave', hideButton);

        // Клик по кнопке
        toggleBtn.addEventListener('click', toggleSidebar);

        // При изменении размера окна проверяем, не стало ли оно мобильным
        window.addEventListener('resize', function() {
            const nowMobile = window.innerWidth <= 768;
            if (nowMobile) {
                // Возвращаем всё как было
                sidebar.style.marginLeft = '';
                content.style.marginLeft = '';
                content.style.maxWidth = '';
                toggleBtn.style.display = 'none';
                hotspot.style.display = 'none';
            } else {
                toggleBtn.style.display = 'block';
                hotspot.style.display = 'block';
            }
        });

        console.log('✅ Кнопка меню создана');
    });
})();

