// ============================================================
// ui-sounds.js — звуки интерфейса (БЕЗ проверки файлов)
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // ⚙️ ФЛАГ — пока файлов нет, стоит false
    // Когда загрузишь 3 mp3 в docs/assets/sounds/ui/ — поставь true
    // ============================================================
    var UI_SOUNDS_ENABLED = false;

    if (!UI_SOUNDS_ENABLED) {
        console.log('🔇 ui-sounds: отключены (поставь UI_SOUNDS_ENABLED = true когда загрузишь файлы)');
        return;
    }

    var sounds = {
        toggleOn:  new Audio('/assets/sounds/ui/toggle-on.mp3'),
        toggleOff: new Audio('/assets/sounds/ui/toggle-off.mp3'),
        click:     new Audio('/assets/sounds/ui/click.mp3')
    };

    sounds.toggleOn.volume = 0.45;
    sounds.toggleOff.volume = 0.45;
    sounds.click.volume = 0.25;

    function play(name) {
        var a = sounds[name];
        if (!a) return;
        try {
            a.currentTime = 0;
            var p = a.play();
            if (p && p.catch) p.catch(function() {});
        } catch (e) {}
    }

    // Делегирование — клик по [data-sound-toggle]
    document.addEventListener('click', function(e) {
        var el = e.target.closest('[data-sound-toggle]');
        if (!el) return;

        var wasOn = el.getAttribute('aria-pressed') === 'true'
                 || el.dataset.active === 'true'
                 || el.classList.contains('active')
                 || el.classList.contains('on');

        play(wasOn ? 'toggleOff' : 'toggleOn');
    }, true);

    // Разблокировка аудио при первом клике
    var unlocked = false;
    document.addEventListener('click', function() {
        if (unlocked) return;
        unlocked = true;
        var v = sounds.click.volume;
        sounds.click.volume = 0;
        var p = sounds.click.play();
        if (p) p.then(function() {
            sounds.click.pause();
            sounds.click.volume = v;
        }).catch(function() {
            sounds.click.volume = v;
        });
    }, { once: true });

    console.log('🔊 ui-sounds: активны');
})();

