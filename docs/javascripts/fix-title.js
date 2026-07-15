document.addEventListener('DOMContentLoaded', function() {
    // Ищем ссылку с названием сайта
    var titleLink = document.querySelector('.wy-side-nav-search a');
    if (titleLink) {
        // Принудительно устанавливаем белый цвет с !important
        titleLink.style.setProperty('color', '#ffffff', 'important');
    } else {
        // Если не нашли по классу, пробуем другие варианты
        var altLink = document.querySelector('a.icon-home');
        if (altLink) {
            altLink.style.setProperty('color', '#ffffff', 'important');
        }
    }
});
