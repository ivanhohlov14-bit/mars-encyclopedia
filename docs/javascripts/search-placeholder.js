/**
 * 🚀 VIP Search Placeholder
 * Надежно заменяет текст в поисковой строке MkDocs (ReadTheDocs).
 */
(function() {
    'use strict';

    // Настройки
    var NEW_TEXT = "Найти в архивах...";
    var SEARCH_SELECTORS = [
        '#mkdocs-search-query',    // Стандарт MkDocs
        'input[name="q"]',         // ReadTheDocs
        '.search-input',           // Альтернативный класс
        'input[type="search"]'     // Общий селектор
    ];

    function upgradeSearchBar() {
        var updated = false;

        for (var i = 0; i < SEARCH_SELECTORS.length; i++) {
            var input = document.querySelector(SEARCH_SELECTORS[i]);
            
            // Если нашли и еще не обрабатывали
            if (input && !input.dataset.vipSearch) {
                input.placeholder = NEW_TEXT;
                input.title = NEW_TEXT;
                input.setAttribute('aria-label', NEW_TEXT);
                input.dataset.vipSearch = 'true'; // Ставим метку
                updated = true;
            }
        }
        return updated;
    }

    // 1. Пытаемся запустить сразу, если DOM уже загружен
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', upgradeSearchBar);
    } else {
        upgradeSearchBar();
    }

    // 2. Наблюдатель (MutationObserver) — если поиск добавляется динамически
    if (window.MutationObserver) {
        var observer = new MutationObserver(function() {
            if (upgradeSearchBar()) {
                observer.disconnect(); // Отключаем, как только нашли и заменили
            }
        });
        
        // Наблюдаем за всей страницей
        observer.observe(document.body, { childList: true, subtree: true });

        // Страховка: отключаем наблюдатель через 10 секунд, чтобы не грузить процессор
        setTimeout(function() { observer.disconnect(); }, 10000);
    }
})();
