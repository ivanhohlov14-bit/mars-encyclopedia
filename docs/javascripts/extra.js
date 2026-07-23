// Функция переключения режима чтения
function toggleFocusMode() {
  const container = document.querySelector('.md-container');
  if (container) {
    container.classList.toggle('focus-mode');
    const button = document.querySelector('.focus-toggle');
    if (button) {
      button.textContent = container.classList.contains('focus-mode') ? '📖' : '📚';
      button.title = container.classList.contains('focus-mode') ? 'Показать меню' : 'Скрыть меню';
    }
  }
}

// Добавляем кнопку на страницу после загрузки
document.addEventListener('DOMContentLoaded', function() {
  const button = document.createElement('button');
  button.className = 'focus-toggle';
  button.innerHTML = '📚';
  button.title = 'Скрыть меню (режим чтения)';
  button.onclick = toggleFocusMode;
  document.body.appendChild(button);
});
