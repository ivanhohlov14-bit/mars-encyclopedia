// docs/javascripts/sidebar-toggle.js
// Расширенная версия — правильно растягивает контент

console.log('✅ sidebar-toggle.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    // Только на ПК
    if (window.innerWidth <= 768) return;

    const sidebar = document.querySelector('.wy-nav-side');
    const content = document.querySelector('.wy-nav-content');
    const contentWrap = document.querySelector('.wy-nav-content-wrap');

    if (!sidebar || !content) {
        console.warn('⚠️ Меню не найдено');
        return;
    }

    // Создаём кнопку (всё как у вас, плюс hover)
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
        pointer-events: auto;
        opacity: 1;
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
    const sidebarWidth = 300;

    toggleBtn.addEventListener('click', function() {
        isHidden = !isHidden;
        if (isHidden) {
            // Скрываем меню
            sidebar.style.marginLeft = '-' + sidebarWidth + 'px';
            sidebar.style.transition = 'margin-left 0.3s';
            // Растягиваем контент на всю ширину (новая часть)
            content.style.marginLeft = '0';
            content.style.maxWidth = '100%';
            content.style.padding = '20px 30px';
            if (contentWrap) {
                contentWrap.style.maxWidth = '100%';
                contentWrap.style.padding = '0';
            }
            toggleBtn.innerHTML = '☰ Показать меню';
        } else {
            // Возвращаем как было
            sidebar.style.marginLeft = '0';
            content.style.marginLeft = '';
            content.style.maxWidth = '';
            content.style.padding = '';
            if (contentWrap) {
                contentWrap.style.maxWidth = '';
                contentWrap.style.padding = '';
            }
            toggleBtn.innerHTML = '◀ Скрыть меню';
        }
    });

    // При изменении размера окна
    window.addEventListener('resize', function() {
        const nowMobile = window.innerWidth <= 768;
        if (nowMobile) {
            sidebar.style.marginLeft = '';
            content.style.marginLeft = '';
            content.style.maxWidth = '';
            content.style.padding = '';
            if (contentWrap) {
                contentWrap.style.maxWidth = '';
                contentWrap.style.padding = '';
            }
            toggleBtn.style.display = 'none';
        } else {
            toggleBtn.style.display = 'block';
        }
    });

    console.log('✅ Кнопка создана (с растягиванием контента)');
});
