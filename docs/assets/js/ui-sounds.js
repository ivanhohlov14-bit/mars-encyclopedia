// ============================================================
// ui-sounds.js — файлы + синтез через Web Audio
// ============================================================

(function() {
    'use strict';

    var ctx = null;

    function getCtx() {
        if (ctx) return ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {}
        return ctx;
    }

    // ============================================================
    // 📁 ФАЙЛЫ (в корне /assets/sounds/)
    // ============================================================
    var files = {
        piano: new Audio('/assets/sounds/868526__sadiquecat__processed-piano-a4.wav'),
        click: new Audio('/assets/sounds/202313__7778__click-2.mp3')
    };
    files.piano.volume = 0.4;
    files.piano.preload = 'auto';
    files.click.volume = 0.3;
    files.click.preload = 'auto';

    function playFile(name) {
        var a = files[name];
        if (!a) return;
        try {
            a.currentTime = 0;
            var p = a.play();
            if (p && p.catch) p.catch(function() {});
        } catch (e) {}
    }

    // ============================================================
    // 🎹 СИНТЕЗ — тональные звуки
    // ============================================================

    // Универсальный свуп
    function sweep(freqStart, freqEnd, duration, volume, type) {
        var c = getCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var t = c.currentTime;
        var osc = c.createOscillator();
        var gain = c.createGain();

        osc.type = type || 'triangle';
        osc.frequency.setValueAtTime(freqStart, t);
        osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.exponentialRampToValueAtTime(volume, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t);
        osc.stop(t + duration);
    }

    // Включение — восходящий
    function playToggleOn() {
        sweep(400, 900, 0.18, 0.2, 'triangle');
    }

    // Выключение — нисходящий
    function playToggleOff() {
        sweep(900, 400, 0.18, 0.2, 'triangle');
    }

    // Выход / logout — два нисходящих тона (грустный аккорд)
    function playExit() {
        var c = getCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var t = c.currentTime;
        var notes = [523.25, 392.00, 261.63]; // C5 → G4 → C4

        notes.forEach(function(freq, i) {
            var osc = c.createOscillator();
            var gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;

            var start = t + i * 0.1;
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.exponentialRampToValueAtTime(0.18, start + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(start);
            osc.stop(start + 0.35);
        });
    }

    // Вход / login — два восходящих
    function playLogin() {
        var c = getCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var t = c.currentTime;
        var notes = [392.00, 523.25, 659.25]; // G4 → C5 → E5

        notes.forEach(function(freq, i) {
            var osc = c.createOscillator();
            var gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;

            var start = t + i * 0.08;
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.exponentialRampToValueAtTime(0.16, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(start);
            osc.stop(start + 0.3);
        });
    }

    // Успех / success — восходящее трезвучие
    function playSuccess() {
        var c = getCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var t = c.currentTime;
        var notes = [523.25, 659.25, 783.99]; // C5 E5 G5

        notes.forEach(function(freq, i) {
            var osc = c.createOscillator();
            var gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;

            var start = t + i * 0.07;
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.exponentialRampToValueAtTime(0.15, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(start);
            osc.stop(start + 0.4);
        });
    }

    // Ошибка / error — два низких тона
    function playError() {
        var c = getCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var t = c.currentTime;
        [220, 180].forEach(function(freq, i) {
            var osc = c.createOscillator();
            var gain = c.createGain();
            osc.type = 'sawtooth';
            osc.frequency.value = freq;

            var start = t + i * 0.12;
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.exponentialRampToValueAtTime(0.12, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(start);
            osc.stop(start + 0.2);
        });
    }

    // Открытие / notification — «динь»
    function playNotification() {
        var c = getCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var t = c.currentTime;
        var osc = c.createOscillator();
        var gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(1318.5, t + 0.08);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t);
        osc.stop(t + 0.6);
    }

    // ============================================================
    // 🖱️ ДЕЛЕГИРОВАНИЕ
    // ============================================================

    // 1. Тогглы эффектов — [data-sound-toggle]
    document.addEventListener('click', function(e) {
        var el = e.target.closest('[data-sound-toggle]');
        if (!el) return;

        var wasOn = el.getAttribute('aria-pressed') === 'true'
                 || el.dataset.active === 'true'
                 || el.classList.contains('active')
                 || el.classList.contains('on');

        if (wasOn) playToggleOff();
        else playToggleOn();
    }, true);

    // 2. Кнопка "Выйти" — [data-sound="exit"]
    document.addEventListener('click', function(e) {
        var el = e.target.closest('[data-sound="exit"], .pf-logout, [onclick*="pfLogout"]');
        if (!el) return;
        playExit();
    }, true);

    // 3. Кнопка "Войти" — [data-sound="login"]
    document.addEventListener('click', function(e) {
        var el = e.target.closest('[data-sound="login"], .login-btn, a[href="/login/"]');
        if (!el) return;
        playLogin();
    }, true);

    // 4. Общий клик по ссылкам и кнопкам
    document.addEventListener('click', function(e) {
        if (e.target.closest('[data-sound-toggle]')) return;
        if (e.target.closest('[data-sound="exit"]')) return;
        if (e.target.closest('[data-sound="login"]')) return;

        if (e.target.closest('a, button, .pf-btn, .pf-tab, .pf-quick-card')) {
            playFile('click');
        }
    }, true);

    // ============================================================
    // 🔓 РАЗБЛОКИРОВКА AUDIO CONTEXT
    // ============================================================
    document.addEventListener('click', function unlock() {
        var c = getCtx();
        if (c && c.state === 'suspended') c.resume();

        // Беззвучный клик чтобы разблокировать файловые звуки
        try {
            files.click.volume = 0;
            var p = files.click.play();
            if (p) p.then(function() {
                files.click.pause();
                files.click.volume = 0.3;
            }).catch(function() {
                files.click.volume = 0.3;
            });
        } catch (e) {}

        document.removeEventListener('click', unlock);
    }, { once: true });

    // ============================================================
    // 🌐 ПУБЛИЧНОЕ API — можно вызывать вручную из любого скрипта
    // ============================================================
    window.marsSound = {
        click:        function() { playFile('click'); },
        piano:        function() { playFile('piano'); },
        toggleOn:     playToggleOn,
        toggleOff:    playToggleOff,
        exit:         playExit,
        login:        playLogin,
        success:      playSuccess,
        error:        playError,
        notification: playNotification
    };

    console.log('🔊 ui-sounds v3: файлы + синтез готовы');
})();

