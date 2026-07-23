// ==========================================
// ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ ТЕМЫ (РАБОТАЕТ НА ВСЕХ СТРАНИЦАХ)
// ==========================================

(function() {
  // Функция применения темы
  function setTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
    // Обновляем кнопку
    updateButton();
  }

  // Функция обновления кнопки
  function updateButton() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.title = isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему';
  }

  // Создаём кнопку
  function createButton() {
    // Проверяем, есть ли уже кнопка
    if (document.getElementById('theme-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background: #2a5c8a;
      color: white;
      border: none;
      border-radius: 50%;
      width: 54px;
      height: 54px;
      font-size: 26px;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    btn.onmouseover = function() { this.style.transform = 'scale(1.1)'; };
    btn.onmouseout = function() { this.style.transform = 'scale(1)'; };
    btn.onclick = function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    };
    document.body.appendChild(btn);
    updateButton();
  }

  // Инициализация при загрузке
  document.addEventListener('DOMContentLoaded', function() {
    // Восстанавливаем сохранённую тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    createButton();
  });

  // Переключаем тему на всех страницах, даже при переходе через кнопки "Назад"
  window.addEventListener('pageshow', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateButton();
  });
})();
