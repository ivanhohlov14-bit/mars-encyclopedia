// sound-engine.js — процедурные звуки Марса (без аудиофайлов)
(function() {
    'use strict';

    // ============================================================
    // 🔊 ЯДРО — Web Audio
    // ============================================================
    let audioCtx = null;
    let masterGain = null;
    let currentAmbient = null;

    function getCtx() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                masterGain = audioCtx.createGain();
                masterGain.gain.value = 0.5;
                masterGain.connect(audioCtx.destination);
            } catch(e) { return null; }
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    // Разблокировка при первом касании
    function unlock() {
        const c = getCtx();
        if (c && c.state === 'suspended') c.resume();
        document.removeEventListener('touchstart', unlock);
        document.removeEventListener('click', unlock);
    }
    document.addEventListener('touchstart', unlock, { passive: true });
    document.addEventListener('click', unlock);

    // ============================================================
    // 🎛️ ГЕНЕРАТОРЫ ШУМА
    // ============================================================
    function createNoiseBuffer(seconds, type) {
        const c = getCtx();
        if (!c) return null;
        const length = c.sampleRate * seconds;
        const buffer = c.createBuffer(1, length, c.sampleRate);
        const data = buffer.getChannelData(0);

        if (type === 'white') {
            for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
        } else if (type === 'pink') {
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < length; i++) {
                const white = Math.random() * 2 - 1;
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
            let last = 0;
            for (let i = 0; i < length; i++) {
                const white = Math.random() * 2 - 1;
                data[i] = (last + 0.02 * white) / 1.02;
                last = data[i];
                data[i] *= 3.5;
            }
        }
        return buffer;
    }

    // ============================================================
    // 🌊 ЗВУКОВЫЕ СЦЕНЫ
    // ============================================================
    const SCENES = {
        // 🌊 Море — прибой, волны
        sea: {
            name: 'Море',
            icon: '🌊',
            color: '#3498db',
            build: function(output) {
                const c = getCtx();
                const buffer = createNoiseBuffer(4, 'brown');
                const source = c.createBufferSource();
                source.buffer = buffer;
                source.loop = true;

                const filter = c.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 500;
                filter.Q.value = 0.8;

                const gain = c.createGain();
                gain.gain.value = 0.35;

                // LFO для волн
                const lfo = c.createOscillator();
                lfo.frequency.value = 0.12;
                const lfoGain = c.createGain();
                lfoGain.gain.value = 0.25;
                lfo.connect(lfoGain);
                lfoGain.connect(gain.gain);
                lfo.start();

                // Второй LFO для фильтра
                const lfo2 = c.createOscillator();
                lfo2.frequency.value = 0.08;
                const lfoGain2 = c.createGain();
                lfoGain2.gain.value = 250;
                lfo2.connect(lfoGain2);
                lfoGain2.connect(filter.frequency);
                lfo2.start();

                source.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                source.start();

                return function stop() {
                    try { source.stop(); lfo.stop(); lfo2.stop(); } catch(e) {}
                };
            }
        },

        // 🔥 Огонь — треск, гул
        fire: {
            name: 'Огонь',
            icon: '🔥',
            color: '#e74c3c',
            build: function(output) {
                const c = getCtx();

                // Базовый гул
                const rumbleBuffer = createNoiseBuffer(3, 'brown');
                const rumble = c.createBufferSource();
                rumble.buffer = rumbleBuffer;
                rumble.loop = true;

                const filter = c.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 200;

                const rumbleGain = c.createGain();
                rumbleGain.gain.value = 0.15;

                rumble.connect(filter);
                filter.connect(rumbleGain);
                rumbleGain.connect(output);
                rumble.start();

                // Треск — периодические всплески
                let crackleTimer;
                let stopped = false;

                function crackle() {
                    if (stopped) return;
                    const size = 0.02 + Math.random() * 0.05;
                    const buf = createNoiseBuffer(size, 'white');
                    const src = c.createBufferSource();
                    src.buffer = buf;

                    const f = c.createBiquadFilter();
                    f.type = 'highpass';
                    f.frequency.value = 1500 + Math.random() * 3000;

                    const g = c.createGain();
                    g.gain.setValueAtTime(0.15 + Math.random() * 0.2, c.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + size);

                    src.connect(f);
                    f.connect(g);
                    g.connect(output);
                    src.start();
                    src.stop(c.currentTime + size);

                    crackleTimer = setTimeout(crackle, 30 + Math.random() * 200);
                }
                crackle();

                return function stop() {
                    stopped = true;
                    clearTimeout(crackleTimer);
                    try { rumble.stop(); } catch(e) {}
                };
            }
        },

        // 💨 Ветер — свист
        wind: {
            name: 'Ветер',
            icon: '💨',
            color: '#95a5a6',
            build: function(output) {
                const c = getCtx();
                const buffer = createNoiseBuffer(4, 'pink');
                const source = c.createBufferSource();
                source.buffer = buffer;
                source.loop = true;

                const filter = c.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 800;
                filter.Q.value = 2;

                const gain = c.createGain();
                gain.gain.value = 0.2;

                // Свист — модуляция
                const lfo = c.createOscillator();
                lfo.frequency.value = 0.15;
                const lfoGain = c.createGain();
                lfoGain.gain.value = 400;
                lfo.connect(lfoGain);
                lfoGain.connect(filter.frequency);
                lfo.start();

                // Амплитуда
                const lfo2 = c.createOscillator();
                lfo2.frequency.value = 0.25;
                const lfoGain2 = c.createGain();
                lfoGain2.gain.value = 0.1;
                lfo2.connect(lfoGain2);
                lfoGain2.connect(gain.gain);
                lfo2.start();

                source.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                source.start();

                return function stop() {
                    try { source.stop(); lfo.stop(); lfo2.stop(); } catch(e) {}
                };
            }
        },

        // 🕳️ Пещера — эхо, капли
        cave: {
            name: 'Пещера',
            icon: '🕳️',
            color: '#34495e',
            build: function(output) {
                const c = getCtx();

                // Гул
                const drone = c.createOscillator();
                drone.type = 'sine';
                drone.frequency.value = 55;
                const droneGain = c.createGain();
                droneGain.gain.value = 0.08;
                drone.connect(droneGain);
                droneGain.connect(output);
                drone.start();

                // Очень слабый шум
                const buffer = createNoiseBuffer(4, 'brown');
                const noise = c.createBufferSource();
                noise.buffer = buffer;
                noise.loop = true;
                const nf = c.createBiquadFilter();
                nf.type = 'lowpass';
                nf.frequency.value = 150;
                const ng = c.createGain();
                ng.gain.value = 0.1;
                noise.connect(nf);
                nf.connect(ng);
                ng.connect(output);
                noise.start();

                // Капли
                let dropTimer;
                let stopped = false;

                function drop() {
                    if (stopped) return;
                    const osc = c.createOscillator();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(1200 + Math.random() * 600, c.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.3);

                    const g = c.createGain();
                    g.gain.setValueAtTime(0.12, c.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);

                    // Эхо — второй отложенный сигнал
                    const g2 = c.createGain();
                    g2.gain.setValueAtTime(0.05, c.currentTime + 0.4);
                    g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.7);

                    osc.connect(g);
                    osc.connect(g2);
                    g.connect(output);
                    g2.connect(output);

                    osc.start();
                    osc.stop(c.currentTime + 0.4);

                    dropTimer = setTimeout(drop, 1500 + Math.random() * 3500);
                }
                drop();

                return function stop() {
                    stopped = true;
                    clearTimeout(dropTimer);
                    try { drone.stop(); noise.stop(); } catch(e) {}
                };
            }
        },

        // 🌲 Лес — птицы, шелест
        forest: {
            name: 'Лес',
            icon: '🌲',
            color: '#27ae60',
            build: function(output) {
                const c = getCtx();

                // Шелест листвы
                const buffer = createNoiseBuffer(4, 'pink');
                const source = c.createBufferSource();
                source.buffer = buffer;
                source.loop = true;
                const filter = c.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.value = 2000;
                const gain = c.createGain();
                gain.gain.value = 0.08;
                source.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                source.start();

                // Птицы — короткие высокие трели
                let birdTimer;
                let stopped = false;

                function bird() {
                    if (stopped) return;
                    const notes = 2 + Math.floor(Math.random() * 4);
                    const baseFreq = 2000 + Math.random() * 1500;
                    for (let i = 0; i < notes; i++) {
                        const osc = c.createOscillator();
                        osc.type = 'sine';
                        const f = baseFreq + Math.random() * 500;
                        const t = c.currentTime + i * 0.08;
                        osc.frequency.setValueAtTime(f, t);
                        osc.frequency.exponentialRampToValueAtTime(f * 1.3, t + 0.05);
                        osc.frequency.exponentialRampToValueAtTime(f, t + 0.08);
                        const g = c.createGain();
                        g.gain.setValueAtTime(0, t);
                        g.gain.linearRampToValueAtTime(0.06, t + 0.01);
                        g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
                        osc.connect(g);
                        g.connect(output);
                        osc.start(t);
                        osc.stop(t + 0.1);
                    }
                    birdTimer = setTimeout(bird, 800 + Math.random() * 2500);
                }
                bird();

                return function stop() {
                    stopped = true;
                    clearTimeout(birdTimer);
                    try { source.stop(); } catch(e) {}
                };
            }
        },

        // 🏪 Рынок — гул голосов, колокола
        market: {
            name: 'Рынок',
            icon: '🏪',
            color: '#f39c12',
            build: function(output) {
                const c = getCtx();

                // Гул
                const buffer = createNoiseBuffer(3, 'brown');
                const source = c.createBufferSource();
                source.buffer = buffer;
                source.loop = true;
                const filter = c.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 400;
                filter.Q.value = 1;
                const gain = c.createGain();
                gain.gain.value = 0.2;
                source.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                source.start();

                // Колокольчики
                let bellTimer;
                let stopped = false;

                function bell() {
                    if (stopped) return;
                    const freqs = [523.25, 659.25, 783.99, 1046.5];
                    const f = freqs[Math.floor(Math.random() * freqs.length)];
                    const osc = c.createOscillator();
                    osc.type = 'triangle';
                    osc.frequency.value = f;
                    const g = c.createGain();
                    g.gain.setValueAtTime(0.1, c.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.8);
                    osc.connect(g);
                    g.connect(output);
                    osc.start();
                    osc.stop(c.currentTime + 0.8);
                    bellTimer = setTimeout(bell, 2000 + Math.random() * 4000);
                }
                bell();

                return function stop() {
                    stopped = true;
                    clearTimeout(bellTimer);
                    try { source.stop(); } catch(e) {}
                };
            }
        },

        // ⛈️ Буря — гром, дождь
        storm: {
            name: 'Буря',
            icon: '⛈️',
            color: '#8e44ad',
            build: function(output) {
                const c = getCtx();

                // Дождь
                const buffer = createNoiseBuffer(4, 'white');
                const rain = c.createBufferSource();
                rain.buffer = buffer;
                rain.loop = true;
                const filter = c.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 4000;
                filter.Q.value = 0.5;
                const gain = c.createGain();
                gain.gain.value = 0.12;
                rain.connect(filter);
                filter.connect(gain);
                gain.connect(output);
                rain.start();

                // Ветер
                const windBuf = createNoiseBuffer(4, 'brown');
                const windSrc = c.createBufferSource();
                windSrc.buffer = windBuf;
                windSrc.loop = true;
                const wf = c.createBiquadFilter();
                wf.type = 'lowpass';
                wf.frequency.value = 300;
                const wg = c.createGain();
                wg.gain.value = 0.15;
                windSrc.connect(wf);
                wf.connect(wg);
                wg.connect(output);
                windSrc.start();

                // Гром
                let thunderTimer;
                let stopped = false;

                function thunder() {
                    if (stopped) return;
                    const size = 1.5 + Math.random() * 1.5;
                    const buf = createNoiseBuffer(size, 'brown');
                    const src = c.createBufferSource();
                    src.buffer = buf;
                    const f = c.createBiquadFilter();
                    f.type = 'lowpass';
                    f.frequency.setValueAtTime(80, c.currentTime);
                    f.frequency.exponentialRampToValueAtTime(40, c.currentTime + size);
                    const g = c.createGain();
                    g.gain.setValueAtTime(0, c.currentTime);
                    g.gain.linearRampToValueAtTime(0.4, c.currentTime + 0.1);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + size);
                    src.connect(f);
                    f.connect(g);
                    g.connect(output);
                    src.start();
                    src.stop(c.currentTime + size);
                    thunderTimer = setTimeout(thunder, 4000 + Math.random() * 8000);
                }
                thunder();

                return function stop() {
                    stopped = true;
                    clearTimeout(thunderTimer);
                    try { rain.stop(); windSrc.stop(); } catch(e) {}
                };
            }
        },

        // 🌌 Космос — дрон, звёздное мерцание
        space: {
            name: 'Космос',
            icon: '🌌',
            color: '#6C63FF',
            build: function(output) {
                const c = getCtx();

                // Глубокий дрон
                const osc1 = c.createOscillator();
                osc1.type = 'sine';
                osc1.frequency.value = 55;
                const osc2 = c.createOscillator();
                osc2.type = 'sine';
                osc2.frequency.value = 82.5;
                const oscGain = c.createGain();
                oscGain.gain.value = 0.12;
                osc1.connect(oscGain);
                osc2.connect(oscGain);
                oscGain.connect(output);
                osc1.start();
                osc2.start();

                // Мерцание — случайные высокие ноты
                let shimmerTimer;
                let stopped = false;

                function shimmer() {
                    if (stopped) return;
                    const freqs = [1200, 1600, 2000, 2400, 3000, 3600];
                    const f = freqs[Math.floor(Math.random() * freqs.length)];
                    const osc = c.createOscillator();
                    osc.type = 'sine';
                    osc.frequency.value = f;
                    const g = c.createGain();
                    g.gain.setValueAtTime(0, c.currentTime);
                    g.gain.linearRampToValueAtTime(0.03, c.currentTime + 0.5);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 2);
                    osc.connect(g);
                    g.connect(output);
                    osc.start();
                    osc.stop(c.currentTime + 2);
                    shimmerTimer = setTimeout(shimmer, 800 + Math.random() * 2000);
                }
                shimmer();

                return function stop() {
                    stopped = true;
                    clearTimeout(shimmerTimer);
                    try { osc1.stop(); osc2.stop(); } catch(e) {}
                };
            }
        }
    };

    // ============================================================
    // ▶️ УПРАВЛЕНИЕ АМБИЕНТОМ
    // ============================================================
    function playScene(sceneId) {
        stopScene();
        const scene = SCENES[sceneId];
        if (!scene) return;
        const c = getCtx();
        if (!c) return;

        // Плавное появление
        const fadeGain = c.createGain();
        fadeGain.gain.setValueAtTime(0, c.currentTime);
        fadeGain.gain.linearRampToValueAtTime(1, c.currentTime + 0.8);

        const stop = scene.build(fadeGain);
        fadeGain.connect(masterGain);

        currentAmbient = {
            sceneId: sceneId,
            stop: function() {
                const t = c.currentTime;
                fadeGain.gain.cancelScheduledValues(t);
                fadeGain.gain.setValueAtTime(fadeGain.gain.value, t);
                fadeGain.gain.linearRampToValueAtTime(0, t + 0.6);
                setTimeout(function() {
                    stop();
                    try { fadeGain.disconnect(); } catch(e) {}
                }, 700);
            }
        };

        // Обновляем кнопки
        document.querySelectorAll('[data-sound]').forEach(btn => {
            btn.classList.toggle('sound-active', btn.dataset.sound === sceneId);
        });
    }

    function stopScene() {
        if (currentAmbient) {
            currentAmbient.stop();
            currentAmbient = null;
        }
        document.querySelectorAll('[data-sound]').forEach(btn => {
            btn.classList.remove('sound-active');
        });
    }

    // ============================================================
    // ✨ ОДНОРАЗОВЫЕ ЭФФЕКТЫ
    // ============================================================
    const EFFECTS = {
        bell: function() {
            const c = getCtx();
            const osc = c.createOscillator();
            osc.type = 'triangle';
            osc.frequency.value = 880;
            const g = c.createGain();
            g.gain.setValueAtTime(0.2, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.2);
            osc.connect(g);
            g.connect(masterGain);
            osc.start();
            osc.stop(c.currentTime + 1.2);
        },
        click: function() {
            const c = getCtx();
            const buffer = createNoiseBuffer(0.05, 'white');
            const src = c.createBufferSource();
            src.buffer = buffer;
            const f = c.createBiquadFilter();
            f.type = 'highpass';
            f.frequency.value = 2000;
            const g = c.createGain();
            g.gain.setValueAtTime(0.15, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
            src.connect(f);
            f.connect(g);
            g.connect(masterGain);
            src.start();
            src.stop(c.currentTime + 0.05);
        },
        sword: function() {
            const c = getCtx();
            const buffer = createNoiseBuffer(0.15, 'white');
            const src = c.createBufferSource();
            src.buffer = buffer;
            const f = c.createBiquadFilter();
            f.type = 'bandpass';
            f.frequency.setValueAtTime(3000, c.currentTime);
            f.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.15);
            const g = c.createGain();
            g.gain.setValueAtTime(0.25, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
            src.connect(f);
            f.connect(g);
            g.connect(masterGain);
            src.start();
            src.stop(c.currentTime + 0.15);
        },
        success: function() {
            const c = getCtx();
            [523.25, 659.25, 783.99].forEach((f, i) => {
                const osc = c.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = f;
                const g = c.createGain();
                const t = c.currentTime + i * 0.1;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.12, t + 0.03);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                osc.connect(g);
                g.connect(masterGain);
                osc.start(t);
                osc.stop(t + 0.4);
            });
        }
    };

    function playEffect(name) {
        if (EFFECTS[name]) EFFECTS[name]();
    }

    // ============================================================
    // 🗣️ ГОЛОС — чтение текста (использует SpeechSynthesis)
    // ============================================================
    function speak(text) {
        if (!('speechSynthesis' in window) || !text) return;
        speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        const voices = speechSynthesis.getVoices();
        const ruVoice = voices.find(v => v.lang && v.lang.indexOf('ru') === 0);
        if (ruVoice) utter.voice = ruVoice;
        utter.lang = 'ru-RU';
        utter.rate = 0.9;
        utter.pitch = 0.85;
        speechSynthesis.speak(utter);
    }

    // ============================================================
    // 🌐 ЭКСПОРТ
    // ============================================================
    window.marsSound = {
        play: playScene,
        stop: stopScene,
        effect: playEffect,
        speak: speak,
        scenes: SCENES,
        volume: function(v) {
            if (masterGain) masterGain.gain.value = v;
        }
    };

    console.log('🎧 Звуковая система Марса готова. Сцен: ' + Object.keys(SCENES).length);
})();
