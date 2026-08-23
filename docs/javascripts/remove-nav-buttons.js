// docs/javascripts/remove-nav-buttons.js
// Удаляет кнопки "Previous" и "Next"

console.log('🗑️ Удаляем навигационные кнопки...');

document.addEventListener('DOMContentLoaded', function() {
    // Удаляем все элементы с классами
    const selectors = [
        '.rst-footer-buttons',
        '.btn-neutral',
        'a[title="Previous"]',
        'a[title="Next"]'
    ];
    
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.remove();
            console.log('🗑️ Удалён элемент:', selector);
        });
    });

    // Дополнительно: ищем любые ссылки с текстом "Previous" или "Next"
    document.querySelectorAll('a').forEach(a => {
        const text = a.textContent.trim();
        if (text === 'Previous' || text === 'Next' || text.includes('‹') || text.includes('›')) {
            a.remove();
            console.log('🗑️ Удалена ссылка:', text);
        }
    });
});
