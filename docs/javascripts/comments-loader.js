// docs/javascripts/comments-loader.js
// Автоматически добавляет комментарии на все страницы

(function() {
    console.log('✅ comments-loader.js загружен');

    document.addEventListener('DOMContentLoaded', function() {
        // Список страниц, где НЕ нужны комментарии
        const excludePages = [
            '/',
            '/index/',
            '/profile/',
            '/login/',
            '/register/',
            '/stats/',
            '/profile-view/',
            '/license/',
            '/support/',
            '/start-here/',
            '/globe-map/',
            '/interactive/exodus/',
            '/music/constructor/',
            '/translator/'
        ];

        const currentPath = window.location.pathname;

        // Проверяем, не является ли страница исключением
        if (excludePages.includes(currentPath)) {
            console.log('ℹ️ Комментарии на этой странице не нужны');
            return;
        }

        // Проверяем, не является ли страница служебной (например, файлы .md)
        // Исключаем страницы, которые не являются статьями (по расширению или наличию .html)
        if (currentPath.endsWith('.html') || currentPath.endsWith('/')) {
            // Если путь заканчивается на / — это статья
            // Если заканчивается на .html — тоже статья
            // Проверяем, что это не служебная страница
            const isArticle = true; // все остальные страницы считаем статьями
        }

        console.log('📄 Добавляем комментарии на страницу:', currentPath);

        // Определяем slug из URL
        let slug = currentPath.replace(/\/$/, '').split('/').pop() || 'index';
        if (slug === '' || slug === 'index') {
            // Если это главная страница (без slug), используем 'home'
            slug = 'home';
        }

        // Создаём контейнер для комментариев
        const container = document.createElement('div');
        container.id = 'comments-container';
        container.dataset.articleSlug = slug;
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">⏳ Загрузка комментариев...</p>';

        // Находим место для вставки (после основного контента)
        const contentArea = document.querySelector('.wy-nav-content');
        if (contentArea) {
            // Проверяем, есть ли уже контейнер
            const existing = document.getElementById('comments-container');
            if (existing) {
                console.log('ℹ️ Контейнер комментариев уже существует');
                return;
            }

            // Добавляем разделитель и контейнер
            const separator = document.createElement('hr');
            separator.style.cssText = 'margin: 40px 0 20px 0; border: none; border-top: 2px solid #eaecf0;';
            contentArea.appendChild(separator);

            // Добавляем заголовок
            const title = document.createElement('h2');
            title.style.cssText = 'font-size: 1.8rem; margin-bottom: 16px;';
            title.textContent = '💬 Комментарии';
            contentArea.appendChild(title);

            contentArea.appendChild(container);

            // Загружаем комментарии, если функция доступна
            if (typeof loadComments === 'function') {
                loadComments(slug, 'comments-container');
            } else {
                console.warn('⚠️ loadComments не загружена, ждём...');
                // Ждём загрузки comments.js
                let attempts = 0;
                const waitForComments = setInterval(() => {
                    attempts++;
                    if (typeof loadComments === 'function') {
                        clearInterval(waitForComments);
                        loadComments(slug, 'comments-container');
                    } else if (attempts > 20) {
                        clearInterval(waitForComments);
                        container.innerHTML = '<p style="color: #999; text-align: center;">⚠️ Ошибка загрузки комментариев.</p>';
                    }
                }, 300);
            }
        } else {
            console.warn('⚠️ Не найден контейнер для контента');
        }
    });
})();
