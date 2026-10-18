document.addEventListener('DOMContentLoaded', function() {
    var oldSearchForm = document.querySelector('form.search-form') || document.querySelector('.wy-side-nav-search form');
    if (!oldSearchForm) return;

    // Проверяем, собран ли Pagefind
    fetch('/pagefind/pagefind-ui.css', { method: 'HEAD' })
        .then(response => {
            if (!response.ok) throw new Error('Pagefind not built');
            initPagefind(oldSearchForm);
        })
        .catch(() => {
            console.log('🛈 Pagefind не найден. Используется стандартный поиск.');
        });
});

function initPagefind(oldSearchForm) {
    // Прячем стандартный поиск
    oldSearchForm.style.display = 'none';
    
    // Создаем контейнер
    var searchContainer = document.createElement('div');
    searchContainer.id = 'pagefind-search-container';
    // Возвращаем узкий формат (как было в теме)
    searchContainer.style.padding = '0 10px 10px 10px'; 
    searchContainer.style.marginTop = '10px';
    oldSearchForm.parentNode.appendChild(searchContainer);

    // Внедряем стили для исправления цвета, размера и убираем куски текста
    var style = document.createElement('style');
    style.textContent = `
        /* Узкое поле ввода */
        .pagefind-ui__search-input {
            font-size: 13px !important;
            height: 32px !important;
            padding: 4px 8px !important;
            background-color: #fff !important;
        }
        /* Более темный и контрастный цвет текста в поле */
        .pagefind-ui__search-input::placeholder {
            color: #666 !important;
            opacity: 1 !important;
        }
        /* Убираем куски текста (сниппеты) из результатов */
        .pagefind-ui__result-excerpt {
            display: none !important;
        }
        /* Делаем результаты компактными */
        .pagefind-ui__result {
            padding: 6px 0 !important;
            border-bottom: 1px solid #eaeaea !important;
            margin: 0 !important;
        }
        /* Стиль для названий статей */
        .pagefind-ui__result-title {
            font-size: 14px !important;
            margin-bottom: 0 !important;
        }
        .pagefind-ui__result-title a {
            color: #2980b9 !important;
            text-decoration: none !important;
            font-weight: 500 !important;
        }
        .pagefind-ui__result-title a:hover {
            text-decoration: underline !important;
        }
    `;
    document.head.appendChild(style);

    // Подключаем стили Pagefind
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/pagefind/pagefind-ui.css';
    document.head.appendChild(cssLink);

    // Подключаем скрипт Pagefind
    var script = document.createElement('script');
    script.src = '/pagefind/pagefind-ui.js';
    script.onload = function() {
        new PagefindUI({
            element: "#pagefind-search-container",
            showSubResults: false, // Отключаем показ подразделов
            showImages: false,     // Отключаем картинки
            translations: {
                placeholder: "Найти в архивах...",
                clear_search: "Очистить",
                load_more: "Загрузить ещё",
                zero_results: "Ничего не найдено",
                many_results: "Найдено [COUNT] статей",
                one_result: "Найдена 1 статья",
                searching: "Идёт поиск..."
            }
        });
    };
    document.body.appendChild(script);
}
