// docs/javascripts/sidebar-toggle.js

(function() {
    console.log('✅ sidebar-toggle.js загружен (версия 2)');

    document.addEventListener('DOMContentLoaded', function() {
        // Работаем только на ПК
        if (window.innerWidth <= 768) return;

        // Находим элементы (специфика ReadTheDocs)
        const sidebar = document.querySelector('.wy-nav-side');
        const content = document.querySelector('.wy-nav-content');
        if (!sidebar || !content) {
            console.warn('⚠️ Элементы не найдены:', {sidebar, content});
            return;
        }

        // Сохраняем исходные стили
        const sidebarWidth = sidebar.offsetWidth || 300;

        // Создаём ловушку (невидимая область у левого края)
        const hotspot = document.createElement('div');
        hotspot.id = 'sidebar-hotspot';
        hotspot.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: 20px;
            height: 100%;
            z-index: 9999;
            cursor: pointer;
            background: transparent;
        `;

        // Создаём кнопку (изначально скрыта)
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-btn';
        toggleBtn.innerHTML = '☰';
        toggleBtn.style.cssText = `
            position: fixed;
            left: 0;
            top: 20px;
            z-index: 10000;
            background: #6C63FF;
            color: #fff;
            border: none;
            border-radius: 0 8px 8px 0;
            padding: 8px 12px;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s, left 0.3s;
            box-shadow: 2px 0 12px rgba(0,0,0,0.2);
            pointer-events: none;
        `;

        document.body.prepend(hotspot);
        document.body.prepend(toggleBtn);

        let isHidden = false;

        function toggleSidebar() {
            isHidden = !isHidden;
            if (isHidden) {
                // Скрываем меню
                sidebar.style.marginLeft = `-${sidebarWidth}px`;
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

        // Скрываем кнопку, если ушли с ловушки и с кнопки
        function hideButton() {
            setTimeout(function() {
                if (!hotspot.matches(':hover') && !toggleBtn.matches(':hover')) {
                    toggleBtn.style.opacity = '0';
                    toggleBtn.style.pointerEvents = 'none';
                }
            }, 200);
        }

        hotspot.addEventListener('mouseleave', hideButton);
        toggleBtn.addEventListener('mouseleave', hideButton);

        // Клик по кнопке
        toggleBtn.addEventListener('click', toggleSidebar);

        // При изменении размера окна
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

        console.log('✅ Кнопка меню создана (версия 2)');
    });
})();

