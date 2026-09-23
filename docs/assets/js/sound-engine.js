// ============================================================
// sound-engine.js — v2 VIP
// Процедурные звуки Марса (без аудиофайлов)
// - Экспорт в window.marsAmbient (не конфликтует с marsSound)
// - Все таймеры в одном массиве → чистый stop()
// - Кэш буферов шума (не пересоздаём)
// - Resume AudioContext при возврате на вкладку
// - Safe storage, DEBUG, prefers-reduced-motion
// - SPA + document$ + auto-disconnect
// - Публичное API: window.marsAmbient.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsSoundEngineLoaded) return;
    window.__marsSoundEngineLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var DEBUG = false;
    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🎧 ambient:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch(e) { return false; }
    }

    var REDUCED_MOTION = prefersReducedMotion();

    // ============================================================
    // 🔊 Ядро Web Audio
    // ============================================================
    var audioCtx = null;
    var masterGain = null;
    var currentAmbient = null;

    // Кэш буферов шума — ключ = "тип_секунды"
    var noiseBufferCache = {};

    function getCtx() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                masterGain = audioCtx.createGain();
                masterGain.gain.value = 0.5;
                masterGain.connect(audioCtx.destination);
                log('AudioContext создан');
            } catch(e) {
                log('AudioContext error:', e.message);
                return null;
            }
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().catch(function(){});
        }
        return audioCtx;
    }

    // Разблокировка при первом касании
    function unlock() {
        var c = getCtx();
        if (c && c.state === 'suspended') c.resume().catch(function(){});
        document.removeEventListener('touchstart', unlock);
        document.removeEventListener('click', unlock);
        document.removeEventListener('keydown', unlock);
    }
    document.addEventListener('touchstart', unlock, { passive: true });
    document.addEventListener('click', unlock);
    document.addEventListener('keydown', unlock);

    // Resume при возврате на вкладку
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(function(){});
        }
    });

    // ============================================================
    // 🎛️ Генераторы шума (с кэшем)
    // ============================================================
    function createNoiseBuffer(seconds, type) {
        var c = getCtx();
        if (!c) return null;

        // Кэш — но не для очень коротких (там своя длина)
        var cacheKey = null;
        if (seconds >= 1) {
            cacheKey = type + '_' + seconds;
            if (noiseBufferCache[cacheKey]) return noiseBufferCache[cacheKey];
        }

        var length = Math.floor(c.sampleRate * seconds);
        var buffer = c.createBuffer(1, length, c.sampleRate);
        var data = buffer.getChannelData(0);
        var i;

        if (type === 'white') {
            for (i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
        } else if (type === 'pink') {
            var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (i = 0; i < length; i++) {
                var white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
                b6 = white * 0.115926;
            }
        } else if (type === 'brown') {
            var last = 0;
            for (i = 0; i < length; i++) {
                var w = Math.random() * 2 - 1;
                data[i] = (last + 0.02 * w) / 1.02;
                last = data[i];
                data[i] *= 3.5;
            }
        }

        if (cacheKey) noiseBufferCache[cacheKey] = buffer;
        return buffer;
    }

    // ============================================================
    // 🔧 Хелпер для безопасного управления таймерами сцены
    // ============================================================
    function makeTimerManager() {
        var timers = [];
        var stopped = false;

        return {
            add: function(fn, ms) {
                if (stopped) return;
                var id = setTimeout(function() {
                    // Убираем себя из массива
                    var idx = timers.indexOf(id);
                    if (idx !== -1) timers.splice(idx, 1);
                    if (!stopped) fn();
                }, ms);
                timers.push(id);
            },
            clear: function() {
                stopped = true;
                for (var i = 0; i < timers.length; i++) {
                    clearTimeout(timers[i]);
                }
                timers = [];
            },
            isStopped: function() { return stopped; }
        };
    }

    // ============================================================
    // 🌊 Звуковые сцены
    // ============================================================
    var SCENES = {

        // 🌊 Море — прибой
        sea: {
            name: 'Море', icon: '🌊', color: '#3498db',
            build: function(output) {
                var c = getCtx();
                var buffer = createNoiseBuffer(4, 'brown');
                var source = c.createBufferSource();
                source.buffer = buffer;
                source.loop = true;

                var filter = c.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 500;
                filter.Q.value = 0.8;

                var gain = c.createGain();
                gain.gain.value = 0.35;

                var lfo = c.createOscillator();
                lfo.frequency.value = 0.12;
                var lfoGain = c.createGain();
                lfoGain.gain.value = 0.25;
                lfo.connect(lfoGain);
                lfoGain.connect(gain.gain);
                lfo.start();

                var lfo2 = c.createOscillator();
                lfo2.frequency.value = 0.08;
                var lfoGain2 = c.createGain();
                lfoGain2.gain.value = 250;
                lfo2.connect(lfoGain2);
                lfoGain2.connect(filter.frequency);
                lfo2.start();

                source.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                source.start();

                return function stop() {
                    try { source.stop(); } catch(e) {}
                    try { lfo.stop(); lfo2.stop(); } catch(e) {}
                };
            }
        },

        // 🔥 Огонь — треск
        fire: {
            name: 'Огонь', icon: '🔥', color: '#e74c3c',
            build: function(output) {
                var c = getCtx();
                var rumbleBuffer = createNoiseBuffer(3, 'brown');
                var rumble = c.createBufferSource();
                rumble.buffer = rumbleBuffer;
                rumble.loop = true;

                var filter = c.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 200;

                var rumbleGain = c.createGain();
                rumbleGain.gain.value = 0.15;

                rumble.connect(filter);
                filter.connect(rumbleGain);
                rumbleGain.connect(output);
                rumble.start();

                var tm = makeTimerManager();

                function crackle() {
                    if (tm.isStopped()) return;
                    var size = 0.02 + Math.random() * 0.05;
                    var buf = createNoiseBuffer(size, 'white');
                    var src = c.createBufferSource();
                    src.buffer = buf;

                    var f = c.createBiquadFilter();
                    f.type = 'highpass';
                    f.frequency.value = 1500 + Math.random() * 3000;

                    var g = c.createGain();
                    g.gain.setValueAtTime(0.15 + Math.random() * 0.2, c.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + size);

                    src.connect(f);
                    f.connect(g);
                    g.connect(output);
                    src.start();
                    src.stop(c.currentTime + size);

                    tm.add(crackle, 30 + Math.random() * 200);
                }
                crackle();

                return function stop() {
                    tm.clear();
                    try { rumble.stop(); } catch(e) {}
                };
            }
        },

        // 💨 Ветер
        wind: {
            name: 'Ветер', icon: '💨', color: '#95a5a6',
            build: function(output) {
                var c = getCtx();
                var buffer = createNoiseBuffer(4, 'pink');
                var source = c.createBufferSource();
                source.buffer = buffer;
                source.loop = true;

                var filter = c.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 800;
                filter.Q.value = 2;

                var gain = c.createGain();
                gain.gain.value = 0.2;

                var lfo = c.createOscillator();
                lfo.frequency.value = 0.15;
                var lfoGain = c.createGain();
                lfoGain.gain.value = 400;
                lfo.connect(lfoGain);
                lfoGain.connect(filter.frequency);
                lfo.start();

                var lfo2 = c.createOscillator();
                lfo2.frequency.value = 0.25;
                var lfoGain2 = c.createGain();
                lfoGain2.gain.value = 0.1;
                lfo2.connect(lfoGain2);
                lfoGain2.connect(gain.gain);
                lfo2.start();

                source.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                source.start();

                return function stop() {
                    try { source.stop(); } catch(e) {}
                    try { lfo.stop(); lfo2.stop(); } catch(e) {}
                };
            }
        },

        // 🕳️ Пещера
        cave: {
            name: 'Пещера', icon: '🕳️', color: '#34495e',
            build: function(output) {
                var c = getCtx();

                var drone = c.createOscillator();
                drone.type = 'sine';
                drone.frequency.value = 55;
                var droneGain = c.createGain();
                droneGain.gain.value = 0.08;
                drone.connect(droneGain);
                droneGain.connect(output);
                drone.start();

                var buffer = createNoiseBuffer(4, 'brown');
                var noise = c.createBufferSource();
                noise.buffer = buffer;
                noise.loop = true;
                var nf = c.createBiquadFilter();
                nf.type = 'lowpass';
                nf.frequency.value = 150;
                var ng = c.createGain();
                ng.gain.value = 0.1;
                noise.connect(nf);
                nf.connect(ng);
                ng.connect(output);
                noise.start();

                var tm = makeTimerManager();

                function drop() {
                    if (tm.isStopped()) return;
                    var osc = c.createOscillator();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(1200 + Math.random() * 600, c.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.3);

                    var g = c.createGain();
                    g.gain.setValueAtTime(0.12, c.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);

                    var g2 = c.createGain();
                    g2.gain.setValueAtTime(0.05, c.currentTime + 0.4);
                    g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.7);

                    osc.connect(g);
                    osc.connect(g2);
                    g.connect(output);
                    g2.connect(output);

                    osc.start();
                    osc.stop(c.currentTime + 0.4);

                    tm.add(drop, 1500 + Math.random() * 3500);
                }
                drop();

                return function stop() {
                    tm.clear();
                    try { drone.stop(); noise.stop(); } catch(e) {}
                };
            }
        },

        // 🌲 Лес
        forest: {
            name: 'Лес', icon: '🌲', color: '#27ae60',
            build: function(output) {
                var c = getCtx();

                var buffer = createNoiseBuffer(4, 'pink');
                var source = c.createBufferSource();
                source.buffer = buffer;
                source.loop = true;
                var filter = c.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.value = 2000;
                var gain = c.createGain();
                gain.gain.value = 0.08;
                source.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                source.start();

                var tm = makeTimerManager();

                function bird() {
                    if (tm.isStopped()) return;
                    var notes = 2 + Math.floor(Math.random() * 4);
                    var baseFreq = 2000 + Math.random() * 1500;
                    for (var i = 0; i < notes; i++) {
                        (function(i) {
                            var osc = c.createOscillator();
                            osc.type = 'sine';
                            var f = baseFreq + Math.random() * 500;
                            var t = c.currentTime + i * 0.08;
                            osc.frequency.setValueAtTime(f, t);
                            osc.frequency.exponentialRampToValueAtTime(f * 1.3, t + 0.05);
                            osc.frequency.exponentialRampToValueAtTime(f, t + 0.08);
                            var g = c.createGain();
                            g.gain.setValueAtTime(0, t);
                            g.gain.linearRampToValueAtTime(0.06, t + 0.01);
                            g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
                            osc.connect(g);
                            g.connect(output);
                            osc.start(t);
                            osc.stop(t + 0.1);
                        })(i);
                    }
                    tm.add(bird, 800 + Math.random() * 2500);
                }
                bird();

                return function stop() {
                    tm.clear();
                    try { source.stop(); } catch(e) {}
                };
            }
        },

        // 🏪 Рынок
        market: {
            name: 'Рынок', icon: '🏪', color: '#f39c12',
            build: function(output) {
                var c = getCtx();

                var buffer = createNoiseBuffer(3, 'brown');
                var source = c.createBufferSource();
                source.buffer = buffer;
                source.loop = true;
                var filter = c.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 400;
                filter.Q.value = 1;
                var gain = c.createGain();
                gain.gain.value = 0.2;
                source.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                source.start();

                var tm = makeTimerManager();

                function bell() {
                    if (tm.isStopped()) return;
                    var freqs = [523.25, 659.25, 783.99, 1046.5];
                    var f = freqs[Math.floor(Math.random() * freqs.length)];
                    var osc = c.createOscillator();
                    osc.type = 'triangle';
                    osc.frequency.value = f;
                    var g = c.createGain();
                    g.gain.setValueAtTime(0.1, c.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.8);
                    osc.connect(g);
                    g.connect(output);
                    osc.start();
                    osc.stop(c.currentTime + 0.8);
                    tm.add(bell, 2000 + Math.random() * 4000);
                }
                bell();

                return function stop() {
                    tm.clear();
                    try { source.stop(); } catch(e) {}
                };
            }
        },

        // ⛈️ Буря
        storm: {
            name: 'Буря', icon: '⛈️', color: '#8e44ad',
            build: function(output) {
                var c = getCtx();

                var buffer = createNoiseBuffer(4, 'white');
                var rain = c.createBufferSource();
                rain.buffer = buffer;
                rain.loop = true;
                var filter = c.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 4000;
                filter.Q.value = 0.5;
                var gain = c.createGain();
                gain.gain.value = 0.12;
                rain.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                rain.start();

                var windBuf = createNoiseBuffer(4, 'brown');
                var windSrc = c.createBufferSource();
                windSrc.buffer = windBuf;
                windSrc.loop = true;
                var wf = c.createBiquadFilter();
                wf.type = 'lowpass';
                wf.frequency.value = 300;
                var wg = c.createGain();
                wg.gain.value = 0.15;
                windSrc.connect(wf);
                wf.connect(wg);
                wg.connect(output);
                windSrc.start();

                var tm = makeTimerManager();

                function thunder() {
                    if (tm.isStopped()) return;
                    var size = 1.5 + Math.random() * 1.5;
                    var buf = createNoiseBuffer(size, 'brown');
                    var src = c.createBufferSource();
                    src.buffer = buf;
                    var f = c.createBiquadFilter();
                    f.type = 'lowpass';
                    f.frequency.setValueAtTime(80, c.currentTime);
                    f.frequency.exponentialRampToValueAtTime(40, c.currentTime + size);
                    var g = c.createGain();
                    g.gain.setValueAtTime(0, c.currentTime);
                    g.gain.linearRampToValueAtTime(0.4, c.currentTime + 0.1);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + size);
                    src.connect(f);
                    f.connect(g);
                    g.connect(output);
                    src.start();
                    src.stop(c.currentTime + size);
                    tm.add(thunder, 4000 + Math.random() * 8000);
                }
                thunder();

                return function stop() {
                    tm.clear();
                    try { rain.stop(); windSrc.stop(); } catch(e) {}
                };
            }
        },

        // 🌌 Космос
        space: {
            name: 'Космос', icon: '🌌', color: '#6C63FF',
            build: function(output) {
                var c = getCtx();

                var osc1 = c.createOscillator();
                osc1.type = 'sine';
                osc1.frequency.value = 55;
                var osc2 = c.createOscillator();
                osc2.type = 'sine';
                osc2.frequency.value = 82.5;
                var oscGain = c.createGain();
                oscGain.gain.value = 0.12;
                osc1.connect(oscGain);
                osc2.connect(oscGain);
                oscGain.connect(output);
                osc1.start();
                osc2.start();

                var tm = makeTimerManager();

                function shimmer() {
                    if (tm.isStopped()) return;
                    var freqs = [1200, 1600, 2000, 2400, 3000, 3600];
                    var f = freqs[Math.floor(Math.random() * freqs.length)];
                    var osc = c.createOscillator();
                    osc.type = 'sine';
                    osc.frequency.value = f;
                    var g = c.createGain();
                    g.gain.setValueAtTime(0, c.currentTime);
                    g.gain.linearRampToValueAtTime(0.03, c.currentTime + 0.5);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 2);
                    osc.connect(g);
                    g.connect(output);
                    osc.start();
                    osc.stop(c.currentTime + 2);
                    tm.add(shimmer, 800 + Math.random() * 2000);
                }
                shimmer();

                return function stop() {
                    tm.clear();
                    try { osc1.stop(); osc2.stop(); } catch(e) {}
                };
            }
        }
    };

    // ============================================================
    // ▶️ Управление амбиентом
    // ============================================================
    function playScene(sceneId) {
        stopScene();
        var scene = SCENES[sceneId];
        if (!scene) return false;
        var c = getCtx();
        if (!c) return false;

        var fadeGain = c.createGain();
        fadeGain.gain.setValueAtTime(0, c.currentTime);
        fadeGain.gain.linearRampToValueAtTime(1, c.currentTime + 0.8);

        var stop = scene.build(fadeGain);
        fadeGain.connect(masterGain);

        currentAmbient = {
            sceneId: sceneId,
            stop: function() {
                var t = c.currentTime;
                try {
                    fadeGain.gain.cancelScheduledValues(t);
                    fadeGain.gain.setValueAtTime(fadeGain.gain.value || 0, t);
                    fadeGain.gain.linearRampToValueAtTime(0, t + 0.6);
                } catch(e) {}
                setTimeout(function() {
                    try { stop(); } catch(e) {}
                    try { fadeGain.disconnect(); } catch(e) {}
                }, 700);
            }
        };

        updateButtons(sceneId);
        log('играет:', sceneId);
        return true;
    }

    function stopScene() {
        if (currentAmbient) {
            try { currentAmbient.stop(); } catch(e) {}
            currentAmbient = null;
        }
        updateButtons(null);
    }

    function updateButtons(activeId) {
        var buttons = document.querySelectorAll('[data-sound]');
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            var isActive = btn.dataset.sound === activeId;
            btn.classList.toggle('sound-active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        }
    }

    // ============================================================
    // ✨ Одноразовые эффекты
    // ============================================================
    var EFFECTS = {
        bell: function() {
            var c = getCtx(); if (!c) return;
            var osc = c.createOscillator();
            osc.type = 'triangle';
            osc.frequency.value = 880;
            var g = c.createGain();
            g.gain.setValueAtTime(0.2, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.2);
            osc.connect(g); g.connect(masterGain);
            osc.start(); osc.stop(c.currentTime + 1.2);
        },
        click: function() {
            var c = getCtx(); if (!c) return;
            var buffer = createNoiseBuffer(0.05, 'white');
            var src = c.createBufferSource();
            src.buffer = buffer;
            var f = c.createBiquadFilter();
            f.type = 'highpass';
            f.frequency.value = 2000;
            var g = c.createGain();
            g.gain.setValueAtTime(0.15, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
            src.connect(f); f.connect(g); g.connect(masterGain);
            src.start(); src.stop(c.currentTime + 0.05);
        },
        sword: function() {
            var c = getCtx(); if (!c) return;
            var buffer = createNoiseBuffer(0.15, 'white');
            var src = c.createBufferSource();
            src.buffer = buffer;
            var f = c.createBiquadFilter();
            f.type = 'bandpass';
            f.frequency.setValueAtTime(3000, c.currentTime);
            f.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.15);
            var g = c.createGain();
            g.gain.setValueAtTime(0.25, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
            src.connect(f); f.connect(g); g.connect(masterGain);
            src.start(); src.stop(c.currentTime + 0.15);
        },
        success: function() {
            var c = getCtx(); if (!c) return;
            [523.25, 659.25, 783.99].forEach(function(f, i) {
                var osc = c.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = f;
                var g = c.createGain();
                var t = c.currentTime + i * 0.1;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.12, t + 0.03);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                osc.connect(g); g.connect(masterGain);
                osc.start(t); osc.stop(t + 0.4);
            });
        }
    };

    function playEffect(name) {
        if (EFFECTS[name]) EFFECTS[name]();
    }

    // ============================================================
    // 🗣️ Голос — если mars-tts.js НЕ загружен
    // ============================================================
    function speak(text) {
        if (!('speechSynthesis' in window) || !text) return;
        // Не перезаписываем если mars-tts.js уже есть
        if (window.marsTTS && typeof window.marsTTS.speak === 'function') {
            return window.marsTTS.speak(text);
        }
        speechSynthesis.cancel();
        var utter = new SpeechSynthesisUtterance(text);
        var voices = speechSynthesis.getVoices();
        var ruVoice = voices.find(function(v) { return v.lang && v.lang.indexOf('ru') === 0; });
        if (ruVoice) utter.voice = ruVoice;
        utter.lang = 'ru-RU';
        utter.rate = 0.9;
        utter.pitch = 0.85;
        speechSynthesis.speak(utter);
    }

    // ============================================================
    // 🎯 Кнопки [data-sound]
    // ============================================================
    function bindSoundButtons() {
        var buttons = document.querySelectorAll('[data-sound]:not([data-sound-bound])');
        for (var i = 0; i < buttons.length; i++) {
            (function(btn) {
                btn.dataset.soundBound = '1';
                btn.setAttribute('aria-pressed', 'false');
                btn.setAttribute('role', 'button');
                if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');

                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var sceneId = btn.dataset.sound;
                    if (currentAmbient && currentAmbient.sceneId === sceneId) {
                        stopScene();
                    } else {
                        playScene(sceneId);
                    }
                });

                btn.addEventListener('keydown', function(e) {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        btn.click();
                    }
                });
            })(buttons[i]);
        }
    }

    // ============================================================
    // 🔄 MutationObserver
    // ============================================================
    var mo = null;
    var moTimer = null;

    function startObserver() {
        if (typeof MutationObserver === 'undefined') return;
        if (mo) return;

        mo = new MutationObserver(function() {
            if (moTimer) return;
            moTimer = setTimeout(function() {
                moTimer = null;
                bindSoundButtons();
            }, 300);
        });

        try {
            mo.observe(document.body, { childList: true, subtree: true });
            setTimeout(function() {
                if (mo) { try { mo.disconnect(); } catch(e) {} mo = null; }
                log('observer отключён');
            }, 30000);
        } catch(e) {}
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    function init() {
        bindSoundButtons();
        if (document.body) startObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // SPA
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                if (currentAmbient) stopScene();
                setTimeout(init, 200);
            });
        } catch(e) {}
    }

    // ============================================================
    // 🌐 Публичное API — window.marsAmbient (не конфликтует с marsSound)
    // ============================================================
    window.marsAmbient = {
        play: playScene,
        stop: stopScene,
        effect: playEffect,
        speak: speak,
        scenes: SCENES,
        currentScene: function() { return currentAmbient ? currentAmbient.sceneId : null; },
        volume: function(v) {
            if (masterGain) masterGain.gain.value = Math.max(0, Math.min(1, v));
        }
    };

    // Алиас для обратной совместимости — но НЕ перезаписывает marsSound v2
    if (!window.marsSound) {
        window.marsSound = window.marsAmbient;
    }

    log('v2 VIP загружен. Сцен:', Object.keys(SCENES).length);
})();
