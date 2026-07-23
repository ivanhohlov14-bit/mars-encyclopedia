// ==========================================
// ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ ТЕМЫ
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  const btn = document.createElement('button');
  btn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background: #2a5c8a;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
  `;
  btn.onclick = function() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    if (current === 'dark') {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      btn.textContent = '🌙';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      btn.textContent = '☀️';
    }
  };
  document.body.appendChild(btn);
});
