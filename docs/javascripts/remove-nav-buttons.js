// docs/javascripts/remove-nav-buttons.js
// МОЩНОЕ УДАЛЕНИЕ КНОПОК "PREVIOUS" И "NEXT"

console.log('🗑️ Запускаем удаление навигационных кнопок...');

// Функция удаления
function removeNavButtons() {
    console.log('🔍 Ищем кнопки для удаления...');

    // 1. Удаляем по классам
    const selectors = [
        '.rst-footer-buttons',
        '.btn-neutral',
        '.wy-breadcrumbs + .rst-footer-buttons',
        'div[role="navigation"] .rst-footer-buttons',
        'footer .rst-footer-buttons'
    ];
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.remove();
            console.log('🗑️ Удалён по селектору:', selector);
        });
    });

    // 2. Удаляем ссылки с текстом "Previous" или "Next" (или с символами ‹ ›)
    document.querySelectorAll('a').forEach(a => {
        const text = a.textContent.trim();
        if (text === 'Previous' || text === 'Next' || text.includes('‹') || text.includes('›')) {
            // Проверяем, что это именно навигационные кнопки (не случайные ссылки)
            if (a.closest('.rst-footer-buttons') || a.closest('.btn-neutral') || a.closest('.wy-breadcrumbs')) {
                a.remove();
                console.log('🗑️ Удалена ссылка:', text);
            }
        }
    });

    // 3. Удаляем весь блок breadcrumbs (он часто содержит эти кнопки)
    const breadcrumbs = document.querySelector('.wy-breadcrumbs');
    if (breadcrumbs) {
        // Удаляем только если в нём есть кнопки
        const hasNav = breadcrumbs.querySelector('a[title="Previous"], a[title="Next"]');
        if (hasNav) {
            breadcrumbs.remove();
            console.log('🗑️ Удалён блок breadcrumbs с навигацией');
        }
    }
}

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Первая попытка
    removeNavButtons();

    // Вторая попытка через 500 мс (для динамически создаваемых элементов)
    setTimeout(removeNavButtons, 500);

    // Третья попытка через 2 секунды (на всякий случай)
    setTimeout(removeNavButtons, 2000);

    // Четвёртая попытка через 5 секунд (если тема очень медленная)
    setTimeout(removeNavButtons, 5000);
});

// Наблюдатель за изменениями DOM (если кнопки появляются после)
const observer = new MutationObserver(function() {
    removeNavButtons();
});
observer.observe(document.body, { childList: true, subtree: true });
console.log('🔭 Наблюдатель за изменениями DOM активирован');
