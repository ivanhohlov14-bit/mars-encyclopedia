// ============================================================
// ui-sounds.js — звуки для тогглов и кликов
// ============================================================

(function() {
    'use strict';

    var sounds = {
        toggleOn:  new Audio('/assets/sounds/ui/toggle-on.mp3'),
        toggleOff: new Audio('/assets/sounds/ui/toggle-off.mp3'),
        click:     new Audio('/assets/sounds/ui/click.mp3')
    };
    sounds.toggleOn.volume = 0.4;
    sounds.toggleOff.volume = 0.4;
    sounds.click.volume = 0.25;

    function play(name) {
        var a = sounds[name];
        if (!a) return;
        try {
            a.currentTime = 0;
            a.play().catch(function() {});
        } catch(e) {}
    }

    // Делегирование — клик по любому [data-sound-toggle]
    document.addEventListener('click', function(e) {
        var el = e.target.closest('[data-sound-toggle]');
        if (!el) return;

        // Как понять, включается или выключается эффект?
        // Смотрим aria-pressed (0/1), или data-active, или класс .active/.on
        var isOn = el.getAttribute('aria-pressed') === 'true'
                || el.dataset.active === 'true'
                || el.classList.contains('active')
                || el.classList.contains('on');

        play(isOn ? 'toggleOff' : 'toggleOn');
    }, true); // capture — до того как сработает логика тоггла

    // Общий звук клика по кнопкам/ссылкам (по желанию)
    // document.addEventListener('click', function(e) {
    //     if (e.target.closest('a, button')) play('click');
    // }, true);

    // Разблокировка аудио при первом клике
    var unlocked = false;
    document.addEventListener('click', function() {
        if (unlocked) return;
        unlocked = true;
        sounds.click.volume = 0;
        sounds.click.play().then(function() {
            sounds.click.pause();
            sounds.click.volume = 0.25;
        }).catch(function() {});
    }, { once: true });
})();
