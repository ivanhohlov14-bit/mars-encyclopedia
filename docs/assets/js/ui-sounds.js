// ============================================================
// ui-sounds.js — звуки интерфейса (тогглы, клики)
// Безопасно игнорирует отсутствующие файлы
// ============================================================

(function() {
    'use strict';

    // Проверяем доступность файла перед созданием Audio
    var sounds = {};
    var unlocked = false;

    // ============================================================
    // 🔍 ПРОВЕРКА — есть ли файл (без спама в консоль)
    // ============================================================
    function checkFile(url) {
        return new Promise(function(resolve) {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, true);
            xhr.onload = function() { resolve(xhr.status === 200); };
            xhr.onerror = function() { resolve(false); };
            xhr.send();
        });
    }

    // ============================================================
    // 🎵 ЗАГРУЗКА ЗВУКОВ
    // ============================================================
    async function loadSounds() {
        var files = {
            toggleOn:  '/assets/sounds/ui/toggle-on.mp3',
            toggleOff: '/assets/sounds/ui/toggle-off.mp3',
            click:     '/assets/sounds/ui/click.mp3'
        };

        for (var name in files) {
            var ok = await checkFile(files[name]);
            if (ok) {
                sounds[name] = new Audio(files[name]);
                sounds[name].volume = name === 'click' ? 0.25 : 0.45;
                sounds[name].preload = 'auto';
            }
        }

        var found = Object.keys(sounds);
        if (found.length === 0) {
            console.log('🔇 ui-sounds: файлы не найдены, звуки интерфейса отключены');
        } else {
            console.log('🔊 ui-sounds: загружено', found.length, 'звуков');
        }
    }

    // ============================================================
    // ▶️ ВОСПРОИЗВЕДЕНИЕ
    // ============================================================
    function play(name) {
        var a = sounds[name];
        if (!a) return;
        try {
            a.currentTime = 0;
            var p = a.play();
            if (p && p.catch) p.catch(function() {});
        } catch (e) {}
    }

    // ============================================================
    // 🖱️ ДЕЛЕГИРОВАНИЕ — клик по [data-sound-toggle]
    // ============================================================
    document.addEventListener('click', function(e) {
        var el = e.target.closest('[data-sound-toggle]');
        if (!el) return;

        // Определяем состояние ДО клика
        var wasOn = el.getAttribute('aria-pressed') === 'true'
                 || el.dataset.active === 'true'
                 || el.classList.contains('active')
                 || el.classList.contains('on');

        // Играем противоположный звук
        play(wasOn ? 'toggleOff' : 'toggleOn');
    }, true);

    // ============================================================
    // 🔓 РАЗБЛОКИРОВКА АУДИО при первом клике
    // ============================================================
    document.addEventListener('click', function unlock() {
        if (unlocked) return;
        unlocked = true;

        if (sounds.click) {
            var saveVol = sounds.click.volume;
            sounds.click.volume = 0;
            var p = sounds.click.play();
            if (p) p.then(function() {
                sounds.click.pause();
                sounds.click.volume = saveVol;
            }).catch(function() {
                sounds.click.volume = saveVol;
            });
        }

        document.removeEventListener('click', unlock);
    }, { once: true });

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSounds);
    } else {
        loadSounds();
    }
})();
