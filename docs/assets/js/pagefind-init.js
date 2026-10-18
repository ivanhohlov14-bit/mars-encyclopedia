/**
 * 🚀 VIP Pagefind Integration
 * Заменяет стандартный поиск на умный (с исправлением опечаток).
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Ищем стандартную форму поиска в теме readthedocs
    var oldSearchForm = document.querySelector('form.search-form') || document.querySelector('.wy-side-nav-search form');
    if (!oldSearchForm) return;

    // 2. Прячем стандартный поиск и создаем контейнер для Pagefind
    oldSearchForm.style.display = 'none';
    var searchContainer = document.createElement('div');
    searchContainer.id = 'pagefind-search-container';
    searchContainer.style.padding = '10px';
    oldSearchForm.parentNode.appendChild(searchContainer);

    // 3. Подгружаем стили Pagefind
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/pagefind/pagefind-ui.css';
    document.head.appendChild(cssLink);

    // 4. Подгружаем скрипт Pagefind
    var script = document.createElement('script');
    script.src = '/pagefind/pagefind-ui.js';
    script.onload = function() {
        // 5. Инициализируем умный поиск с русским интерфейсом
        new PagefindUI({
            element: "#pagefind-search-container",
            showSubResults: true,  // Показывать подразделы в результатах
            showImages: false,     // Не показывать картинки в поиске
            translations: {
                placeholder: "Найти в архивах...",
                clear_search: "Очистить",
                load_more: "Загрузить ещё",
                search_label: "Поиск по сайту",
                filters_label: "Фильтры",
                zero_results: "По запросу [SEARCH_TERM] ничего не найдено",
                many_results: "Найдено [COUNT] результатов по запросу [SEARCH_TERM]",
                one_result: "Найден [COUNT] результат по запросу [SEARCH_TERM]",
                searching: "Идёт поиск по запросу [SEARCH_TERM]..."
            }
        });
    };
    document.body.appendChild(script);
});
