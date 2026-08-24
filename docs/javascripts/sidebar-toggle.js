// docs/javascripts/sidebar-toggle.js
// Версия с CSS-классами — только для ПК

console.log('✅ sidebar-toggle.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что это ПК
    if (window.innerWidth <= 768) {
        console.log('📱 Телефон: кнопка сворачивания меню отключена');
        return;
    }

    const sidebar = document.querySelector('.wy-nav-side');
    if (!sidebar) {
        console.warn('⚠️ Меню не найдено');
        return;
    }

    // Создаём кнопку
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'sidebar-toggle-btn';
    toggleBtn.innerHTML = '◀ Скрыть меню';
    toggleBtn.style.cssText = `
        position: fixed;
        left: 10px;
        top: 10px;
        z-index: 9999;
        background: #6C63FF;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 8px 14px;
        font-size: 14px;
        font-family: 'Segoe UI', Arial, sans-serif;
        cursor: pointer;
        box-shadow: 0 2px 12px rgba(0,0,0,0.25);
        transition: all 0.3s;
        opacity: 0.3;
    `;

    toggleBtn.onmouseenter = function() {
        this.style.background = '#5a52d5';
        this.style.boxShadow = '0 4px 20px rgba(108,99,255,0.4)';
        this.style.opacity = '1';
    };
    toggleBtn.onmouseleave = function() {
        this.style.background = '#6C63FF';
        this.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
        this.style.opacity = '0.3';
    };

    document.body.prepend(toggleBtn);

    let isHidden = false;

    toggleBtn.addEventListener('click', function() {
        isHidden = !isHidden;
        if (isHidden) {
            document.body.classList.add('sidebar-hidden');
            sidebar.style.marginLeft = '-300px';
            sidebar.style.transition = 'margin-left 0.3s';
            toggleBtn.innerHTML = '☰ Показать меню';
        } else {
            document.body.classList.remove('sidebar-hidden');
            sidebar.style.marginLeft = '0';
            toggleBtn.innerHTML = '◀ Скрыть меню';
        }
    });

    // При изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.body.classList.remove('sidebar-hidden');
            sidebar.style.marginLeft = '';
            toggleBtn.style.display = 'none';
        } else {
            toggleBtn.style.display = 'block';
            // Если класс остался — снимаем
            if (document.body.classList.contains('sidebar-hidden')) {
                document.body.classList.remove('sidebar-hidden');
                sidebar.style.marginLeft = '0';
                toggleBtn.innerHTML = '◀ Скрыть меню';
            }
        }
    });

    console.log('✅ Кнопка меню создана (ПК)');
});
