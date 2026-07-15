// Функция для установки темы
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Функция для переключения темы
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
}

// При загрузке страницы восстанавливаем сохранённую тему
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Если тема не сохранена, можно установить светлую по умолчанию
        setTheme('light');
    }

    // Находим кнопку переключения (если она есть) и вешаем событие
    // В теме readthedocs переключатель обычно имеет класс .wy-toggle-theme или что-то подобное
    // Если кнопки нет, мы её создадим позже.
    const themeToggle = document.querySelector('.wy-toggle-theme'); // или другой селектор
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    } else {
        // Если кнопки нет, создадим свою в удобном месте (например, в шапке)
        // Этот код можно адаптировать, но для начала проверим, есть ли кнопка
        console.log('Кнопка переключения темы не найдена, создадим новую.');
        createThemeToggle();
    }
});

// Создаём кнопку переключения, если её нет
function createThemeToggle() {
    const nav = document.querySelector('.wy-nav-side');
    if (!nav) return;
    
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Переключить тему';
    toggleBtn.style.cssText = `
        display: block;
        margin: 10px auto;
        padding: 8px 16px;
        background: #2a2a4a;
        color: #e0e0e0;
        border: 1px solid #3a3a5a;
        border-radius: 4px;
        cursor: pointer;
    `;
    toggleBtn.addEventListener('click', toggleTheme);
    nav.appendChild(toggleBtn);
}
