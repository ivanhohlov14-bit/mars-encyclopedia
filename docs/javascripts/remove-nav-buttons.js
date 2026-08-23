// docs/javascripts/remove-nav-buttons.js
// Удаляет кнопки "Previous" и "Next" (включая .rst-versions)

console.log('🗑️ Запускаем удаление навигационных кнопок...');

function removeNavButtons() {
    // 1. Удаляем стандартные блоки
    document.querySelectorAll('.rst-footer-buttons, .btn-neutral').forEach(el => {
        el.remove();
    });

    // 2. Удаляем кнопки внутри .rst-versions
    document.querySelectorAll('.rst-versions a').forEach(a => {
        const text = a.textContent.trim();
        if (text === 'Previous' || text === 'Next' || text.includes('‹') || text.includes('›')) {
            a.remove();
            console.log('🗑️ Удалена кнопка из .rst-versions:', text);
        }
    });

    // 3. Если в .rst-versions остались пустые элементы — удаляем их
    document.querySelectorAll('.rst-versions .rst-current-version span').forEach(span => {
        if (span.textContent.trim() === '' && span.children.length === 0) {
            span.remove();
        }
    });

    // 4. Если блок .rst-versions пустой — скрываем его
    const versions = document.querySelector('.rst-versions');
    if (versions && versions.textContent.trim() === '') {
        versions.style.display = 'none';
        console.log('🗑️ Скрыт пустой блок .rst-versions');
    }
}

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', function() {
    removeNavButtons();
    setTimeout(removeNavButtons, 500);
    setTimeout(removeNavButtons, 2000);
});

// Наблюдатель за изменениями
const observer = new MutationObserver(function() {
    removeNavButtons();
});
observer.observe(document.body, { childList: true, subtree: true });
console.log('🔭 Наблюдатель за изменениями DOM активирован');
