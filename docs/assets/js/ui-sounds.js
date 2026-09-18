// ============================================================
// ui-sounds.js — VIP v5
// Красивые синтезированные звуки с реверберацией
// ============================================================

(function() {
    'use strict';

    var ctx = null;
    var reverbNode = null;
    var pianoBuffer = null;

    // ============================================================
    // 🔊 WEB AUDIO КОНТЕКСТ
    // ============================================================
    function getCtx() {
        if (ctx) return ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {}
        return ctx;
    }

    // ============================================================
    // 🌊 КОНВОЛЮЦИОННЫЙ РЕВЕРБ (долгий, «в пещере»)
    // ============================================================
    function getReverb() {
        if (reverbNode) return reverbNode;
        var c = getCtx();
        if (!c) return null;

        var rate = c.sampleRate;
        var length = rate * 1.8;
        var impulse = c.createBuffer(2, length, rate);

        for (var ch = 0; ch < 2; ch++) {
            var data = impulse.getChannelData(ch);
            for (var i = 0; i < length; i++) {
                var env = Math.pow(1 - i / length, 2.8);
                data[i] = (Math.random() * 2 - 1) * env;
            }
        }

        reverbNode = c.createConvolver();
        reverbNode.buffer = impulse;

        var wet = c.createGain();
        wet.gain.value = 0.32;
        reverbNode.connect(wet);
        wet.connect(c.destination);

        return reverbNode;
    }

    // ============================================================
    // 📥 ЗАГРУЗКА PIANO.WAV (для торжественных моментов)
    // ============================================================
    async function loadPiano() {
        var c = getCtx();
        if (!c) return;
        try {
            var res = await fetch('/assets/sounds/868526__sadiquecat__processed-piano-a4.wav');
            var arr = await res.arrayBuffer();
            pianoBuffer = await c.decodeAudioData(arr);
        } catch (e) {}
    }

    // ============================================================
    // 🎹 ГЕНЕРАТОРЫ ЗВУКОВ
    // ============================================================

    // Универсальный тон с обёрткой (атака + затухание + реверб)
    function playTone(freq, options) {
        var c = getCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        options = options || {};
        var duration = options.duration || 0.25;
        var volume = options.volume || 0.15;
        var type = options.type || 'sine';
        var reverbMix = options.reverb !== undefined ? options.reverb : 0.35;
        var filterFreq = options.filter || 4000;
        var delay = options.delay || 0;

        var t = c.currentTime + delay;

        var osc = c.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);

        if (options.slideTo) {
            osc.frequency.exponentialRampToValueAtTime(options.slideTo, t + duration);
        }

        var gain = c.createGain();
        var attack = options.attack || 0.008;
        var release = options.release || duration;

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(volume, t + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + release);

        var filter = c.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(filterFreq, t);
        filter.Q.value = 0.7;

        var dry = c.createGain();
        dry.gain.value = 1 - reverbMix;

        var wet = c.createGain();
        wet.gain.value = reverbMix;

        var rev = getReverb();

        osc.connect(filter);
        filter.connect(dry);
        dry.connect(c.destination);

        if (rev) {
            filter.connect(wet);
            wet.connect(rev);
        }

        osc.start(t);
        osc.stop(t + release + 0.05);
    }

    // Красивый «хрустальный» клик — короткий тинк с эхом
    function playClick() {
        playTone(1760, {           // A6 — высокий «тинк»
            duration: 0.18,
            volume: 0.08,           // тихо
            type: 'sine',
            reverb: 0.55,           // много эха
            filter: 5000,
            attack: 0.002,
            release: 0.18
        });

        // Второй тон — мягче, ниже
        playTone(880, {
            duration: 0.22,
            volume: 0.04,
            type: 'sine',
            reverb: 0.5,
            filter: 3500,
            attack: 0.003,
            release: 0.22,
            delay: 0.01
        });
    }

    // Наведение — еле слышный «шелест»
    function playHover() {
        playTone(2400, {
            duration: 0.08,
            volume: 0.025,
            type: 'sine',
            reverb: 0.3,
            filter: 6000,
            attack: 0.001,
            release: 0.08
        });
    }

    // Включение — восходящий свуп
    function playToggleOn() {
        playTone(523.25, {          // C5
            duration: 0.25,
            volume: 0.14,
            type: 'triangle',
            slideTo: 1046.5,        // C6
            reverb: 0.4,
            filter: 5000,
            attack: 0.005,
            release: 0.25
        });
    }

    // Выключение — нисходящий свуп
    function playToggleOff() {
        playTone(1046.5, {
            duration: 0.25,
            volume: 0.14,
            type: 'triangle',
            slideTo: 523.25,
            reverb: 0.4,
            filter: 5000,
            attack: 0.005,
            release: 0.25
        });
    }

    // Открытие меню — кто-то типа «whoosh»
    function playOpen() {
        playTone(600, {
            duration: 0.3,
            volume: 0.1,
            type: 'sine',
            slideTo: 1200,
            reverb: 0.5,
            filter: 3500,
            attack: 0.02,
            release: 0.3
        });
    }

    // Закрытие меню
    function playClose() {
        playTone(1200, {
            duration: 0.3,
            volume: 0.1,
            type: 'sine',
            slideTo: 500,
            reverb: 0.5,
            filter: 3500,
            attack: 0.02,
            release: 0.3
        });
    }

    // Торжественный аккорд — для достижений, уровня, победы
    function playSuccess() {
        var notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
        notes.forEach(function(freq, i) {
            playTone(freq, {
                duration: 0.9,
                volume: 0.11,
                type: 'sine',
                reverb: 0.5,
                filter: 5000,
                attack: 0.02,
                release: 0.9,
                delay: i * 0.09
            });
        });
    }

    // Уровень up — фанфара
    function playLevelUp() {
        var notes = [659.25, 783.99, 1046.5, 1318.5]; // E5 G5 C6 E6
        notes.forEach(function(freq, i) {
            playTone(freq, {
                duration: 1.1,
                volume: 0.12,
                type: 'triangle',
                reverb: 0.55,
                filter: 6000,
                attack: 0.015,
                release: 1.1,
                delay: i * 0.11
            });
        });
    }

    // Ошибка — низкий «звук провала»
    function playError() {
        playTone(220, {
            duration: 0.3,
            volume: 0.13,
            type: 'sawtooth',
            slideTo: 130,
            reverb: 0.35,
            filter: 1500,
            attack: 0.005,
            release: 0.3
        });
    }

    // Уведомление — «динь»
    function playNotification() {
        playTone(880, {
            duration: 0.55,
            volume: 0.12,
            type: 'sine',
            reverb: 0.5,
            filter: 6000,
            attack: 0.005,
            release: 0.55
        });
        playTone(1318.5, {
            duration: 0.5,
            volume: 0.08,
            type: 'sine',
            reverb: 0.55,
            filter: 6500,
            attack: 0.005,
            release: 0.5,
            delay: 0.06
        });
    }

    // Вход — радостная гамма
    function playLogin() {
        var notes = [392, 523.25, 659.25, 783.99]; // G4 C5 E5 G5
        notes.forEach(function(freq, i) {
            playTone(freq, {
                duration: 0.45,
                volume: 0.1,
                type: 'sine',
                reverb: 0.45,
                filter: 5500,
                attack: 0.01,
                release: 0.45,
                delay: i * 0.075
            });
        });
    }

    // Выход — грустная гамма
    function playExit() {
        var notes = [659.25, 523.25, 392, 261.63]; // E5 C5 G4 C4
        notes.forEach(function(freq, i) {
            playTone(freq, {
                duration: 0.6,
                volume: 0.1,
                type: 'sine',
                reverb: 0.5,
                filter: 4500,
                attack: 0.02,
                release: 0.6,
                delay: i * 0.13
            });
        });
    }

    // Открытие сундука / reward
    function playReward() {
        playTone(1046.5, {
            duration: 0.15,
            volume: 0.13,
            type: 'triangle',
            slideTo: 1568,
            reverb: 0.4,
            filter: 6000,
            attack: 0.005,
            release: 0.15
        });
        setTimeout(function() {
            playTone(1568, {
                duration: 0.7,
                volume: 0.11,
                type: 'sine',
                reverb: 0.55,
                filter: 6500,
                attack: 0.01,
                release: 0.7
            });
        }, 100);
    }

    // «Марсианский» звук — глубокий низкий гул
    function playMars() {
        playTone(110, {
            duration: 1.5,
            volume: 0.06,
            type: 'sine',
            reverb: 0.7,
            filter: 800,
            attack: 0.3,
            release: 1.5
        });
        playTone(165, {
            duration: 1.5,
            volume: 0.04,
            type: 'sine',
            reverb: 0.7,
            filter: 1000,
            attack: 0.4,
            release: 1.5,
            delay: 0.2
        });
    }

    // Плавное пиано — из файла, с ревербом
    function playPiano(volume) {
        if (!pianoBuffer) return;
        var c = getCtx();
        if (!c) return;
        if (c.state === 'suspended') c.resume();

        var source = c.createBufferSource();
        source.buffer = pianoBuffer;

        var filter = c.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 5000;

        var dry = c.createGain();
        dry.gain.value = 0.5 * (volume || 0.5);

        var wet = c.createGain();
        wet.gain.value = 0.5 * (volume || 0.5);

        var rev = getReverb();

        source.connect(filter);
        filter.connect(dry);
        dry.connect(c.destination);

        if (rev) {
            filter.connect(wet);
            wet.connect(rev);
        }

        source.start(0);
    }

    // ============================================================
    // 🖱️ ДЕЛЕГИРОВАНИЕ СОБЫТИЙ
    // ============================================================

    // Наведение — очень тихий шелест
    var lastHover = 0;
    document.addEventListener('mouseover', function(e) {
        var now = Date.now();
        if (now - lastHover < 60) return;

        var el = e.target.closest('a, button, .pf-btn, .pf-tab, .pf-quick-card, .pf-note');
        if (!el) return;

        lastHover = now;
        playHover();
    }, true);

    // Клик — хрустальный тинк
    document.addEventListener('click', function(e) {
        var toggle = e.target.closest('[data-sound-toggle]');
        if (toggle) {
            var wasOn = toggle.getAttribute('aria-pressed') === 'true'
                     || toggle.dataset.active === 'true'
                     || toggle.classList.contains('active')
                     || toggle.classList.contains('on');
            if (wasOn) playToggleOff();
            else playToggleOn();
            return;
        }

        if (e.target.closest('[data-sound="exit"], [onclick*="pfLogout"]')) {
            playExit();
            return;
        }

        if (e.target.closest('[data-sound="login"], a[href="/login/"]')) {
            playLogin();
            return;
        }

        if (e.target.closest('a, button, .pf-btn, .pf-tab, .pf-quick-card, .pf-note-btn')) {
            playClick();
        }
    }, true);

    // Разблокировка AudioContext
    document.addEventListener('click', function unlock() {
        var c = getCtx();
        if (c && c.state === 'suspended') c.resume();
        document.removeEventListener('click', unlock);
    }, { once: true });

    // ============================================================
    // 🌐 ПУБЛИЧНОЕ API
    // ============================================================
    window.marsSound = {
        // Основные
        click:        playClick,
        hover:        playHover,
        toggleOn:     playToggleOn,
        toggleOff:    playToggleOff,
        open:         playOpen,
        close:        playClose,

        // Торжественные
        success:      playSuccess,
        levelUp:      playLevelUp,
        reward:       playReward,
        notification: playNotification,

        // Аккаунт
        login:        playLogin,
        exit:         playExit,

        // Особые
        error:        playError,
        mars:         playMars,
        piano:        playPiano,

        // Универсальный — можно вызывать свой тон
        tone: function(freq, opts) { playTone(freq, opts); }
    };

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPiano);
    } else {
        loadPiano();
    }

    console.log('🔊 ui-sounds v5 VIP: всё готово');
})();
