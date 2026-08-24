// docs/javascripts/sidebar-scroll.js
// Сохраняет позицию прокрутки меню при переходе по ссылкам

(function() {
    console.log('✅ sidebar-scroll.js загружен');

    // Сохраняем позицию меню перед переходом
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        // Проверяем, что это ссылка внутри бокового меню
        const sidebar = document.querySelector('.wy-nav-side');
        if (!sidebar) return;
        if (!sidebar.contains(link)) return;
        
        // Проверяем, что это ссылка на страницу (не внешняя)
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;
        
        // Сохраняем позицию прокрутки меню
        const scrollY = sidebar.scrollTop;
        sessionStorage.setItem('sidebarScrollPosition', scrollY);
        console.log('💾 Сохранена позиция меню:', scrollY);
    });

    // Восстанавливаем позицию меню после загрузки страницы
    document.addEventListener('DOMContentLoaded', function() {
        const savedPosition = sessionStorage.getItem('sidebarScrollPosition');
        if (savedPosition === null) return;
        
        const sidebar = document.querySelector('.wy-nav-side');
        if (!sidebar) return;
        
        // Ждём, пока меню полностью загрузится
        setTimeout(function() {
            sidebar.scrollTop = parseInt(savedPosition);
            console.log('🔄 Восстановлена позиция меню:', savedPosition);
            // Очищаем сохранённую позицию, чтобы она не применялась повторно
            sessionStorage.removeItem('sidebarScrollPosition');
        }, 300);
    });
})();
