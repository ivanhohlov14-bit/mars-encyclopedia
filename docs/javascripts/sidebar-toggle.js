// docs/javascripts/sidebar-toggle.js
// Версия с CSS-классами для гарантированного растягивания

console.log('✅ sidebar-toggle.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    // Только на ПК
    if (window.innerWidth <= 768) return;

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
    opacity: 0.3; /* <-- добавляем прозрачность */
`;
    toggleBtn.onmouseenter = function() {
        this.style.background = '#5a52d5';
        this.style.boxShadow = '0 4px 20px rgba(108,99,255,0.4)';
    };
    toggleBtn.onmouseleave = function() {
        this.style.background = '#6C63FF';
        this.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
    };

    document.body.prepend(toggleBtn);

    let isHidden = false;

    toggleBtn.addEventListener('click', function() {
        isHidden = !isHidden;
        if (isHidden) {
            // Добавляем класс на body
            document.body.classList.add('sidebar-hidden');
            sidebar.style.marginLeft = '-300px';
            sidebar.style.transition = 'margin-left 0.3s';
            toggleBtn.innerHTML = '☰ Показать меню';
        } else {
            // Убираем класс
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
        }
    });

    console.log('✅ Кнопка меню создана (с классами)');
});
