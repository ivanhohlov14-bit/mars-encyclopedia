// ============================================================
// mars-sound-synth.js — VIP v6
// Чистый звук моря + насыщенный дизайн в цветах инфобокса
// ============================================================
(function() {
    'use strict';

    var audioCtx = null;
    var currentSound = null;
    var currentEl = null;

    function getAudioCtx() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) { return null; }
        }
        if (audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
        return audioCtx;
    }

    function createBrownNoise(ctx, seconds) {
        var len = Math.floor(ctx.sampleRate * seconds);
        var buf = ctx.createBuffer(2, len, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = buf.getChannelData(ch);
            var last = 0;
            for (var i = 0; i < len; i++) {
                var w = Math.random() * 2 - 1;
                d[i] = (last + 0.02 * w) / 1.02;
                last = d[i];
                d[i] *= 3.5;
            }
        }
        var src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        return src;
    }

    function createPinkNoise(ctx, seconds) {
        var len = Math.floor(ctx.sampleRate * seconds);
        var buf = ctx.createBuffer(2, len, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = buf.getChannelData(ch);
            var b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
            for (var i = 0; i < len; i++) {
                var w = Math.random() * 2 - 1;
                b0 = 0.99886*b0 + w*0.0555179;
                b1 = 0.99332*b1 + w*0.0750759;
                b2 = 0.96900*b2 + w*0.1538520;
                b3 = 0.86650*b3 + w*0.3104856;
                b4 = 0.55000*b4 + w*0.5329522;
                b5 = -0.7616*b5 - w*0.0168980;
                d[i] = (b0+b1+b2+b3+b4+b5+b6+w*0.5362) * 0.08;
                b6 = w * 0.115926;
            }
        }
        var src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        return src;
    }

    function createReverbImpulse(ctx, duration, decay) {
        var len = Math.floor(ctx.sampleRate * duration);
        var impulse = ctx.createBuffer(2, len, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = impulse.getChannelData(ch);
            for (var i = 0; i < len; i++) {
                d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
            }
        }
        return impulse;
    }

    var PRESETS = {
        calm: {
            label: 'Спокойное море',
            swell: 0.055, rumble: 0.14, waveBody: 0.32,
            foam: 0.03, wind: 0.03,
            crashChance: 0.15, crashPower: 0.15,
            stereoWidth: 0.6, reverb: 0.28, gulls: false
        },
        ocean: {
            label: 'Океанские волны',
            swell: 0.08, rumble: 0.20, waveBody: 0.42,
            foam: 0.05, wind: 0.06,
            crashChance: 0.35, crashPower: 0.28,
            stereoWidth: 0.85, reverb: 0.38, gulls: false
        },
        storm: {
            label: 'Штормовое море',
            swell: 0.14, rumble: 0.32, waveBody: 0.55,
            foam: 0.10, wind: 0.18,
            crashChance: 0.7, crashPower: 0.45,
            stereoWidth: 1.0, reverb: 0.45, gulls: false
        },
        gulls: {
            label: 'Море с чайками',
            swell: 0.07, rumble: 0.16, waveBody: 0.36,
            foam: 0.04, wind: 0.04,
            crashChance: 0.22, crashPower: 0.20,
            stereoWidth: 0.8, reverb: 0.35, gulls: true
        },
        deep: {
            label: 'Глубокое море',
            swell: 0.035, rumble: 0.42, waveBody: 0.28,
            foam: 0.015, wind: 0.02,
            crashChance: 0.08, crashPower: 0.14,
            stereoWidth: 0.5, reverb: 0.55, gulls: false
        },
        freezing: {
            label: 'Замерзающее море',
            swell: 0.04, rumble: 0.10, waveBody: 0.14,
            foam: 0.02, wind: 0.28,
            crashChance: 0.05, crashPower: 0.08,
            stereoWidth: 0.9, reverb: 0.30, gulls: false
        }
    };

    var SRC_MAP = {
        'weak-waves-on-the-shore-of-a-calm-sea.mp3': 'calm',
        'the-sound-of-the-waves-the-sea.mp3':        'ocean',
        'the-sea-is-slightly-rough.mp3':             'storm',
        'waves-of-the-sea-ocean-seagulls.mp3':       'gulls',
        'waves-of-the-sea-ocean.mp3':                'ocean',
        'mars-wind.mp3':                             'freezing'
    };
    function presetFromSrc(src) {
        if (!src) return 'ocean';
        var name = src.split('/').pop().split('?')[0];
        return SRC_MAP[name] || 'ocean';
    }

    // ============================================================
    // ЗВУКОВОЙ ДВИЖОК v6 — без пузырьков и резкой пены
    // ============================================================
    function buildSeaSound(ctx, presetName) {
        var cfg = PRESETS[presetName] || PRESETS.ocean;
        var master = ctx.createGain();
        master.gain.value = 0.0001;
        var nodes = [];
        var timers = [];

        // Реверб
        var reverbNode = ctx.createConvolver();
        reverbNode.buffer = createReverbImpulse(ctx, 3.5, 2.5);
        var reverbGain = ctx.createGain();
        reverbGain.gain.value = cfg.reverb;
        reverbNode.connect(reverbGain);
        reverbGain.connect(master);

        // Мастер-фильтр — мягкий lowpass, убирает цифровую резкость
        var masterLP = ctx.createBiquadFilter();
        masterLP.type = 'lowpass';
        masterLP.frequency.value = 7000;
        masterLP.Q.value = 0.4;
        master.connect(masterLP);
        masterLP.connect(ctx.destination);

        // 1. ГЛУБИННЫЙ ГУЛ
        var rumble = createBrownNoise(ctx, 6);
        var rumbleLP = ctx.createBiquadFilter();
        rumbleLP.type = 'lowpass';
        rumbleLP.frequency.value = 90;
        rumbleLP.Q.value = 0.7;
        var rumbleGain = ctx.createGain();
        rumbleGain.gain.value = cfg.rumble;

        var rumbleLFO = ctx.createOscillator();
        rumbleLFO.type = 'sine';
        rumbleLFO.frequency.value = cfg.swell * 0.4;
        var rumbleLFOGain = ctx.createGain();
        rumbleLFOGain.gain.value = cfg.rumble * 0.5;
        rumbleLFO.connect(rumbleLFOGain);
        rumbleLFOGain.connect(rumbleGain.gain);

        rumble.connect(rumbleLP);
        rumbleLP.connect(rumbleGain);
        rumbleGain.connect(master);
        rumbleGain.connect(reverbNode);
        rumble.start(); rumbleLFO.start();
        nodes.push(rumble, rumbleLFO);

        // 2. ТЕЛО ВОЛНЫ — стерео, две волны с разной фазой
        function makeWaveLayer(pan, phaseOffset) {
            var wave = createPinkNoise(ctx, 6);
            var waveBP = ctx.createBiquadFilter();
            waveBP.type = 'bandpass';
            waveBP.frequency.value = 350;
            waveBP.Q.value = 1.2;

            var waveGain = ctx.createGain();
            waveGain.gain.value = cfg.waveBody * 0.5;

            var waveSweepLFO = ctx.createOscillator();
            waveSweepLFO.type = 'sine';
            waveSweepLFO.frequency.value = cfg.swell;
            var waveSweepGain = ctx.createGain();
            waveSweepGain.gain.value = 220;
            waveSweepLFO.connect(waveSweepGain);
            waveSweepGain.connect(waveBP.frequency);

            var waveAmpLFO = ctx.createOscillator();
            waveAmpLFO.type = 'sine';
            waveAmpLFO.frequency.value = cfg.swell;
            var waveAmpLFOGain = ctx.createGain();
            waveAmpLFOGain.gain.value = cfg.waveBody * 0.35;
            waveAmpLFO.connect(waveAmpLFOGain);
            waveAmpLFOGain.connect(waveGain.gain);

            var panner = ctx.createStereoPanner();
            panner.pan.value = pan;

            wave.connect(waveBP);
            waveBP.connect(waveGain);
            waveGain.connect(panner);
            panner.connect(master);
            panner.connect(reverbNode);

            wave.start(ctx.currentTime + phaseOffset);
            waveSweepLFO.start(ctx.currentTime + phaseOffset);
            waveAmpLFO.start(ctx.currentTime + phaseOffset);

            nodes.push(wave, waveSweepLFO, waveAmpLFO);
        }
        makeWaveLayer(-cfg.stereoWidth, 0);
        makeWaveLayer(cfg.stereoWidth, 1.5);

        // 3. ПЕНА — теперь мягче, узкая полоса 200–1400 Гц (без «сыпучести»)
        var foam = createPinkNoise(ctx, 6);
        var foamHP = ctx.createBiquadFilter();
        foamHP.type = 'highpass';
        foamHP.frequency.value = 200;
        var foamLP = ctx.createBiquadFilter();
        foamLP.type = 'lowpass';
        foamLP.frequency.value = 1400;
        foamLP.Q.value = 0.5;
        var foamGain = ctx.createGain();
        foamGain.gain.value = cfg.foam * 0.15;

        var foamLFO = ctx.createOscillator();
        foamLFO.type = 'sine';
        foamLFO.frequency.value = cfg.swell;
        var foamLFOGain = ctx.createGain();
        foamLFOGain.gain.value = cfg.foam * 0.4;
        foamLFO.connect(foamLFOGain);
        foamLFOGain.connect(foamGain.gain);

        foam.connect(foamHP);
        foamHP.connect(foamLP);
        foamLP.connect(foamGain);
        foamGain.connect(master);
        foamGain.connect(reverbNode);
        foam.start(); foamLFO.start();
        nodes.push(foam, foamLFO);

        // 4. ВЕТЕР
        if (cfg.wind > 0) {
            var wind = createBrownNoise(ctx, 6);
            var windBP = ctx.createBiquadFilter();
            windBP.type = 'bandpass';
            windBP.frequency.value = 280;
            windBP.Q.value = 0.5;
            var windGain = ctx.createGain();
            windGain.gain.value = cfg.wind;

            var windLFO = ctx.createOscillator();
            windLFO.type = 'sine';
            windLFO.frequency.value = 0.05;
            var windLFOGain = ctx.createGain();
            windLFOGain.gain.value = cfg.wind * 0.8;
            windLFO.connect(windLFOGain);
            windLFOGain.connect(windGain.gain);

            wind.connect(windBP);
            windBP.connect(windGain);
            windGain.connect(master);
            windGain.connect(reverbNode);
            wind.start(); windLFO.start();
            nodes.push(wind, windLFO);
        }

        // 5. КРУПНЫЕ ВСПЛЕСКИ — без резкой пены!
        function bigCrash(startTime, power, panValue) {
            var crash = createPinkNoise(ctx, 3);
            var crashBP = ctx.createBiquadFilter();
            crashBP.type = 'bandpass';
            crashBP.frequency.setValueAtTime(180, startTime);
            crashBP.frequency.linearRampToValueAtTime(650, startTime + 0.4);
            crashBP.frequency.linearRampToValueAtTime(280, startTime + 2.0);
            crashBP.Q.value = 1.4;

            var crashGain = ctx.createGain();
            crashGain.gain.setValueAtTime(0.0001, startTime);
            crashGain.gain.exponentialRampToValueAtTime(power, startTime + 0.35);
            crashGain.gain.exponentialRampToValueAtTime(power * 0.5, startTime + 1.0);
            crashGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

            var panner = ctx.createStereoPanner();
            panner.pan.value = panValue;

            crash.connect(crashBP);
            crashBP.connect(crashGain);
            crashGain.connect(panner);
            panner.connect(master);
            panner.connect(reverbNode);
            crash.start(startTime);
            crash.stop(startTime + 3);

            // Суб-бас удар — мощь волны
            var boom = ctx.createOscillator();
            boom.type = 'sine';
            boom.frequency.setValueAtTime(65, startTime);
            boom.frequency.exponentialRampToValueAtTime(32, startTime + 1.0);
            var boomGain = ctx.createGain();
            boomGain.gain.setValueAtTime(0.0001, startTime);
            boomGain.gain.exponentialRampToValueAtTime(power * 0.7, startTime + 0.25);
            boomGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);
            boom.connect(boomGain);
            boomGain.connect(master);
            boom.start(startTime);
            boom.stop(startTime + 2.0);

            // ❌ УБРАНА пена-всплеск (резкий highpass 1500) — это был «цик»
        }

        function crashLoop() {
            if (Math.random() < cfg.crashChance) {
                var power = cfg.crashPower * (0.7 + Math.random() * 0.6);
                var pan = (Math.random() * 2 - 1) * cfg.stereoWidth;
                bigCrash(ctx.currentTime + 0.1 + Math.random() * 0.5, power, pan);
            }
            timers.push(setTimeout(crashLoop, 1500 + Math.random() * 3500));
        }
        if (cfg.crashChance > 0) crashLoop();

        // ❌ ПУЗЫРЬКИ УБРАНЫ ПОЛНОСТЬЮ

        // 6. ЧАЙКИ
        if (cfg.gulls) {
            function gullCry(when) {
                var panValue = Math.random() * 1.6 - 0.8;
                var panner = ctx.createStereoPanner();
                panner.pan.value = panValue;

                var o1 = ctx.createOscillator();
                o1.type = 'triangle';
                var g1 = ctx.createGain();
                var f0 = 1500 + Math.random() * 500;
                o1.frequency.setValueAtTime(f0, when);
                o1.frequency.exponentialRampToValueAtTime(f0 * 0.6, when + 0.12);
                o1.frequency.exponentialRampToValueAtTime(f0 * 0.9, when + 0.25);
                o1.frequency.exponentialRampToValueAtTime(f0 * 0.5, when + 0.4);
                g1.gain.setValueAtTime(0.0001, when);
                g1.gain.exponentialRampToValueAtTime(0.045, when + 0.03);
                g1.gain.exponentialRampToValueAtTime(0.0001, when + 0.45);
                o1.connect(g1); g1.connect(panner); panner.connect(master);
                g1.connect(reverbNode);
                o1.start(when); o1.stop(when + 0.5);

                var o2 = ctx.createOscillator();
                o2.type = 'sine';
                var g2 = ctx.createGain();
                o2.frequency.setValueAtTime(f0 * 1.5, when + 0.05);
                o2.frequency.exponentialRampToValueAtTime(f0 * 0.8, when + 0.35);
                g2.gain.setValueAtTime(0.0001, when + 0.05);
                g2.gain.exponentialRampToValueAtTime(0.018, when + 0.1);
                g2.gain.exponentialRampToValueAtTime(0.0001, when + 0.4);
                o2.connect(g2); g2.connect(panner);
                o2.start(when + 0.05); o2.stop(when + 0.45);
            }
            function gullLoop() {
                if (Math.random() < 0.4) {
                    var t = ctx.currentTime + 0.1;
                    gullCry(t);
                    if (Math.random() < 0.5) gullCry(t + 0.4 + Math.random() * 0.4);
                }
                timers.push(setTimeout(gullLoop, 3000 + Math.random() * 7000));
            }
            gullLoop();
        }

        return {
            master: master,
            nodes: nodes,
            stop: function () {
                timers.forEach(function (t) { clearTimeout(t); });
            }
        };
    }

    // ============================================================
    // UI — НАСЫЩЕННЫЙ ДИЗАЙН
    // ============================================================
    function createPlayer(el) {
        var presetName = el.getAttribute('data-preset') || presetFromSrc(el.getAttribute('data-src'));
        var caption = el.getAttribute('data-caption') || 'Реконструкция звука';

        el.classList.add('mars-sound-ready');
        el.innerHTML = '';

        var barsHtml = '';
        for (var i = 0; i < 24; i++) {
            var h = 20 + Math.random() * 60;
            barsHtml += '<span style="--h:' + h.toFixed(0) + '%;--d:' + (i * 0.06).toFixed(2) + 's"></span>';
        }

        el.innerHTML =
            '<div class="mss-left">' +
                '<button class="mss-btn" aria-label="Воспроизвести">' +
                    '<span class="mss-ring"></span>' +
                    '<span class="mss-icon">▶</span>' +
                '</button>' +
            '</div>' +
            '<div class="mss-center">' +
                '<div class="mss-title">Звук моря</div>' +
                '<div class="mss-caption">' + caption + '</div>' +
                '<div class="mss-viz">' + barsHtml + '</div>' +
            '</div>' +
            '<div class="mss-right">' +
                '<span class="mss-live"></span>' +
            '</div>';

        var btn = el.querySelector('.mss-btn');
        var icon = el.querySelector('.mss-icon');

        btn.onclick = function () {
            var ctx = getAudioCtx();
            if (!ctx) return;

            if (currentEl === el && currentSound) {
                var s = currentSound;
                try { s.master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6); } catch (e) {}
                setTimeout(function () {
                    s.stop();
                    s.nodes.forEach(function (n) { try { n.stop(); } catch (e) {} });
                }, 650);
                currentSound = null;
                currentEl = null;
                icon.textContent = '▶';
                el.classList.remove('mss-playing');
            } else {
                if (currentSound) {
                    var prev = currentSound;
                    try { prev.master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4); } catch (e) {}
                    setTimeout(function () {
                        prev.stop();
                        prev.nodes.forEach(function (n) { try { n.stop(); } catch (e) {} });
                    }, 450);
                    if (currentEl) {
                        currentEl.classList.remove('mss-playing');
                        var pi = currentEl.querySelector('.mss-icon');
                        if (pi) pi.textContent = '▶';
                    }
                }
                currentSound = buildSeaSound(ctx, presetName);
                currentSound.master.gain.exponentialRampToValueAtTime(0.85, ctx.currentTime + 1.5);
                currentEl = el;
                icon.textContent = '❚❚';
                el.classList.add('mss-playing');
            }
        };
    }

    // ---- СТИЛИ v6 — без белой пелены, насыщенные цвета ----
    function addStyles() {
        if (document.getElementById('mss-style')) return;
        var s = document.createElement('style');
        s.id = 'mss-style';
        s.textContent = [
            '.mars-sound-ready {',
            '    display: flex; align-items: center; gap: 14px;',
            '    padding: 14px 16px; margin: 10px 0;',
            '    background: linear-gradient(135deg, #b8ced9 0%, #8daebf 100%);',
            '    border: 1px solid #6d92a8;',
            '    border-radius: 12px;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '    box-shadow: 0 6px 18px rgba(26,58,74,0.25), inset 0 1px 0 rgba(255,255,255,0.25);',
            '    position: relative; overflow: hidden;',
            '    transition: border-color 0.3s, box-shadow 0.3s;',
            '}',
            '.mars-sound-ready.mss-playing {',
            '    border-color: #2a5a80;',
            '    box-shadow: 0 8px 28px rgba(42,90,128,0.45), inset 0 1px 0 rgba(255,255,255,0.3);',
            '}',

            '.mss-left { position: relative; flex-shrink: 0; z-index: 1; }',
            '.mss-btn {',
            '    position: relative;',
            '    width: 54px; height: 54px;',
            '    border-radius: 50%; border: none; cursor: pointer;',
            '    background: linear-gradient(135deg, #3a6d9f 0%, #16304a 100%);',
            '    color: #fff; font-size: 16px;',
            '    display: inline-flex; align-items: center; justify-content: center;',
            '    box-shadow: 0 6px 18px rgba(22,48,74,0.5), inset 0 1px 0 rgba(255,255,255,0.3);',
            '    transition: transform 0.25s cubic-bezier(.2,.9,.3,1.3), box-shadow 0.3s;',
            '    -webkit-tap-highlight-color: transparent;',
            '    z-index: 1;',
            '}',
            '.mss-btn:hover {',
            '    transform: scale(1.06);',
            '    box-shadow: 0 10px 24px rgba(22,48,74,0.65), inset 0 1px 0 rgba(255,255,255,0.4);',
            '}',
            '.mss-btn:active { transform: scale(0.96); }',
            '.mss-icon { position: relative; z-index: 2; line-height: 1; }',
            '.mss-playing .mss-btn {',
            '    background: linear-gradient(135deg, #2a7ab8 0%, #0d2a3a 100%);',
            '    box-shadow: 0 6px 22px rgba(42,122,184,0.6), inset 0 1px 0 rgba(255,255,255,0.35);',
            '}',

            '.mss-ring {',
            '    position: absolute; inset: 0; border-radius: 50%;',
            '    pointer-events: none; display: none;',
            '}',
            '.mss-playing .mss-ring {',
            '    display: block;',
            '    animation: mssRing 2s ease-out infinite;',
            '    border: 2px solid rgba(74,125,181,0.85);',
            '}',
            '.mss-playing .mss-ring::before {',
            '    content: ""; position: absolute; inset: -8px; border-radius: 50%;',
            '    border: 2px solid rgba(74,125,181,0.5);',
            '    animation: mssRing 2s ease-out infinite 0.3s;',
            '}',
            '@keyframes mssRing {',
            '    0% { transform: scale(1); opacity: 0.9; }',
            '    100% { transform: scale(1.7); opacity: 0; }',
            '}',

            '.mss-center { flex: 1; min-width: 0; position: relative; z-index: 1; }',
            '.mss-title {',
            '    font-weight: 800; font-size: 1rem;',
            '    color: #0d2a3a;',
            '    margin-bottom: 3px; letter-spacing: 0.3px;',
            '    text-shadow: 0 1px 0 rgba(255,255,255,0.3);',
            '}',
            '.mss-caption {',
            '    font-size: 0.74rem; color: #1a3a4a;',
            '    transition: color 0.3s;',
            '}',
            '.mss-playing .mss-caption { color: #0d3a5a; font-weight: 600; }',

            '.mss-viz {',
            '    display: flex; align-items: flex-end; gap: 2px;',
            '    height: 22px; margin-top: 7px;',
            '    opacity: 0.55; transition: opacity 0.3s;',
            '}',
            '.mss-playing .mss-viz { opacity: 1; }',
            '.mss-viz span {',
            '    flex: 1; min-width: 1px;',
            '    height: 20%;',
            '    background: linear-gradient(180deg, #3a6d9f, #0d2a3a);',
            '    border-radius: 2px;',
            '    transition: height 0.4s ease;',
            '    box-shadow: 0 0 4px rgba(42,90,128,0.6);',
            '}',
            '.mss-playing .mss-viz span {',
            '    animation: mssBar 1.2s ease-in-out infinite alternate;',
            '    animation-delay: var(--d, 0s);',
            '    height: var(--h, 50%);',
            '}',
            '@keyframes mssBar {',
            '    0% { height: 15%; opacity: 0.6; }',
            '    100% { height: var(--h, 60%); opacity: 1; }',
            '}',

            '.mss-right {',
            '    display: flex; align-items: center; justify-content: center;',
            '    flex-shrink: 0; position: relative; z-index: 1;',
            '    min-width: 20px;',
            '}',
            '.mss-live {',
            '    width: 10px; height: 10px; border-radius: 50%;',
            '    background: #6d92a8;',
            '    transition: background 0.3s, box-shadow 0.3s;',
            '}',
            '.mss-playing .mss-live {',
            '    background: #1f7a4a;',
            '    box-shadow: 0 0 10px #2a9d5f, 0 0 4px #2a9d5f;',
            '    animation: mssLive 1.5s ease-in-out infinite;',
            '}',
            '@keyframes mssLive {',
            '    0%, 100% { opacity: 1; }',
            '    50% { opacity: 0.35; }',
            '}',

            '@media (max-width: 700px) {',
            '    .mars-sound-ready { padding: 12px; gap: 12px; border-radius: 10px; }',
            '    .mss-btn { width: 48px; height: 48px; font-size: 14px; }',
            '    .mss-title { font-size: 0.92rem; }',
            '    .mss-caption { font-size: 0.7rem; }',
            '    .mss-viz { height: 18px; gap: 1.5px; }',
            '}'
        ].join('\n');
        document.head.appendChild(s);
    }

    function init() {
        addStyles();
        var els = document.querySelectorAll('.mars-sound:not(.mars-sound-ready)');
        for (var i = 0; i < els.length; i++) createPlayer(els[i]);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    window.addEventListener('load', init);
    setTimeout(init, 500);
    setTimeout(init, 1500);

    if (window.MutationObserver) {
        new MutationObserver(init).observe(document.body, { childList: true, subtree: true });
    }

    console.log('🌊 mars-sound-synth VIP v6 — чистый звук + насыщенный дизайн');
})();
