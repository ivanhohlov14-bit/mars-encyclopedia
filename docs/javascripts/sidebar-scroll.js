// docs/javascripts/sidebar-scroll.js
// Сохраняет позицию меню + плавный скролл к заголовку

(function() {
    console.log('✅ sidebar-scroll.js загружен');

    // === 1. СОХРАНЯЕМ ПОЗИЦИЮ МЕНЮ ===
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const sidebar = document.querySelector('.wy-nav-side');
        if (!sidebar) return;
        if (!sidebar.contains(link)) return;
        
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;
        
        const scrollY = sidebar.scrollTop;
        sessionStorage.setItem('sidebarScrollPosition', scrollY);
        console.log('💾 Позиция меню сохранена:', scrollY);
    });

    // === 2. ВОССТАНАВЛИВАЕМ ПОЗИЦИЮ МЕНЮ ===
    document.addEventListener('DOMContentLoaded', function() {
        const savedPosition = sessionStorage.getItem('sidebarScrollPosition');
        if (savedPosition !== null) {
            const sidebar = document.querySelector('.wy-nav-side');
            if (sidebar) {
                setTimeout(function() {
                    sidebar.scrollTop = parseInt(savedPosition);
                    console.log('🔄 Позиция меню восстановлена:', savedPosition);
                    sessionStorage.removeItem('sidebarScrollPosition');
                }, 400);
            }
        }

        // === 3. ПЛАВНЫЙ СКРОЛЛ К ЗАГОЛОВКУ ===
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(function() {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500);
            }
        }

        // === 4. ПОДСВЕТКА АКТИВНОЙ СТАТЬИ ===
        const currentPath = window.location.pathname;
        document.querySelectorAll('.wy-menu-vertical a').forEach(function(a) {
            const href = a.getAttribute('href');
            if (href && href !== '#' && currentPath.endsWith(href)) {
                a.style.color = '#6C63FF';
                a.style.fontWeight = '600';
                const parent = a.closest('li');
                if (parent) {
                    parent.style.borderLeft = '3px solid #6C63FF';
                    parent.style.background = '#f0f0f0';
                }
            }
        });
    });
})();
