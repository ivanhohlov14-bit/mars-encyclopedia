// ============================================================
// mars-sound-synth.js — Реалистичный синтез звуков моря v2
// Никаких внешних файлов. Читает data-src, мапит на пресет.
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

    // ---- Генератор розового шума (реалистичная основа моря) ----
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
                d[i] = (b0+b1+b2+b3+b4+b5+b6+w*0.5362) * 0.11;
                b6 = w * 0.115926;
            }
        }
        var src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        return src;
    }

    // ---- Белый шум (для брызг, пены) ----
    function createWhiteNoise(ctx, seconds) {
        var len = Math.floor(ctx.sampleRate * seconds);
        var buf = ctx.createBuffer(2, len, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = buf.getChannelData(ch);
            for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        }
        var src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        return src;
    }

    // ---- ПРЕСЕТЫ ----
    var PRESETS = {
        calm: {
            label: 'Спокойное море',
            waveRate: 0.09, waveDepth: 0.55, waveGain: 0.22,
            lowFreq: 400, lowQ: 0.6,
            surfGain: 0.05, surfFreq: 1800,
            rumble: 0.05, hiss: 0.008,
            crashChance: 0.12, crashGain: 0.10,
            wind: 0.02, gulls: false
        },
        ocean: {
            label: 'Океанские волны',
            waveRate: 0.13, waveDepth: 0.75, waveGain: 0.30,
            lowFreq: 600, lowQ: 0.8,
            surfGain: 0.09, surfFreq: 2200,
            rumble: 0.09, hiss: 0.014,
            crashChance: 0.28, crashGain: 0.22,
            wind: 0.05, gulls: false
        },
        storm: {
            label: 'Штормовое море',
            waveRate: 0.20, waveDepth: 0.9, waveGain: 0.38,
            lowFreq: 800, lowQ: 1.0,
            surfGain: 0.15, surfFreq: 2600,
            rumble: 0.16, hiss: 0.022,
            crashChance: 0.55, crashGain: 0.32,
            wind: 0.12, gulls: false
        },
        gulls: {
            label: 'Море с чайками',
            waveRate: 0.11, waveDepth: 0.65, waveGain: 0.24,
            lowFreq: 500, lowQ: 0.7,
            surfGain: 0.07, surfFreq: 2000,
            rumble: 0.06, hiss: 0.010,
            crashChance: 0.20, crashGain: 0.14,
            wind: 0.03, gulls: true
        },
        deep: {
            label: 'Глубокое море',
            waveRate: 0.05, waveDepth: 0.45, waveGain: 0.28,
            lowFreq: 250, lowQ: 0.5,
            surfGain: 0.03, surfFreq: 1200,
            rumble: 0.20, hiss: 0.004,
            crashChance: 0.08, crashGain: 0.10,
            wind: 0.02, gulls: false
        },
        freezing: {
            label: 'Замерзающее море',
            waveRate: 0.04, waveDepth: 0.3, waveGain: 0.12,
            lowFreq: 1300, lowQ: 1.2,
            surfGain: 0.02, surfFreq: 3200,
            rumble: 0.03, hiss: 0.025,
            crashChance: 0.05, crashGain: 0.06,
            wind: 0.20, gulls: false
        }
    };

    // ---- Маппинг старых data-src на пресеты ----
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

    // ---- Слои звука ----
    function buildSeaSound(ctx, presetName) {
        var cfg = PRESETS[presetName] || PRESETS.ocean;
        var master = ctx.createGain();
        master.gain.value = 0.0001;
        master.connect(ctx.destination);
        var nodes = [];
        var timers = [];

        // 1. ВОЛНЫ — розовый шум через полосовой фильтр + LFO по частоте
        var waveNoise = createPinkNoise(ctx, 5);
        var waveFilter = ctx.createBiquadFilter();
        waveFilter.type = 'bandpass';
        waveFilter.frequency.value = cfg.lowFreq;
        waveFilter.Q.value = cfg.lowQ;
        var waveGain = ctx.createGain();
        waveGain.gain.value = cfg.waveGain;

        // LFO модулирует частоту фильтра — эффект «набегающей волны»
        var waveLFO = ctx.createOscillator();
        waveLFO.type = 'sine';
        waveLFO.frequency.value = cfg.waveRate;
        var waveLFOGain = ctx.createGain();
        waveLFOGain.gain.value = cfg.lowFreq * 0.35;
        waveLFO.connect(waveLFOGain);
        waveLFOGain.connect(waveFilter.frequency);

        // Второй LFO — амплитуда (громкость набегает и уходит)
        var ampLFO = ctx.createOscillator();
        ampLFO.type = 'sine';
        ampLFO.frequency.value = cfg.waveRate * 0.9;
        var ampLFOGain = ctx.createGain();
        ampLFOGain.gain.value = cfg.waveGain * cfg.waveDepth;
        ampLFO.connect(ampLFOGain);
        ampLFOGain.connect(waveGain.gain);

        waveNoise.connect(waveFilter);
        waveFilter.connect(waveGain);
        waveGain.connect(master);
        waveNoise.start(); waveLFO.start(); ampLFO.start();
        nodes.push(waveNoise, waveLFO, ampLFO);

        // 2. ПРИБОЙ/ПЕНА — белый шум через highpass (шипение воды)
        var surfNoise = createWhiteNoise(ctx, 5);
        var surfFilter = ctx.createBiquadFilter();
        surfFilter.type = 'highpass';
        surfFilter.frequency.value = cfg.surfFreq;
        var surfGain = ctx.createGain();
        surfGain.gain.value = cfg.surfGain;
        var surfLFO = ctx.createOscillator();
        surfLFO.type = 'sine';
        surfLFO.frequency.value = cfg.waveRate * 1.1;
        var surfLFOGain = ctx.createGain();
        surfLFOGain.gain.value = cfg.surfGain * 0.6;
        surfLFO.connect(surfLFOGain);
        surfLFOGain.connect(surfGain.gain);
        surfNoise.connect(surfFilter);
        surfFilter.connect(surfGain);
        surfGain.connect(master);
        surfNoise.start(); surfLFO.start();
        nodes.push(surfNoise, surfLFO);

        // 3. ГЛУБИННЫЙ ГУЛ — низкий lowpass шум
        var rumbleNoise = createPinkNoise(ctx, 5);
        var rumbleFilter = ctx.createBiquadFilter();
        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.value = 120;
        var rumbleGain = ctx.createGain();
        rumbleGain.gain.value = cfg.rumble;
        rumbleNoise.connect(rumbleFilter);
        rumbleFilter.connect(rumbleGain);
        rumbleGain.connect(master);
        rumbleNoise.start();
        nodes.push(rumbleNoise);

        // 4. ВЕТЕР — низкий рокот со случайными порывами
        if (cfg.wind > 0) {
            var windNoise = createPinkNoise(ctx, 5);
            var windFilter = ctx.createBiquadFilter();
            windFilter.type = 'bandpass';
            windFilter.frequency.value = 350;
            windFilter.Q.value = 0.4;
            var windGain = ctx.createGain();
            windGain.gain.value = cfg.wind;
            var windLFO = ctx.createOscillator();
            windLFO.type = 'sine';
            windLFO.frequency.value = 0.06;
            var windLFOGain = ctx.createGain();
            windLFOGain.gain.value = cfg.wind * 0.7;
            windLFO.connect(windLFOGain);
            windLFOGain.connect(windGain.gain);
            windNoise.connect(windFilter);
            windFilter.connect(windGain);
            windGain.connect(master);
            windNoise.start(); windLFO.start();
            nodes.push(windNoise, windLFO);
        }

        // 5. ВСПЛЕСКИ ВОЛН — случайные бурсты «плюх» с реалистичной атакой
        function waveCrash(when) {
            var crashNoise = createWhiteNoise(ctx, 1.5);
            var crashFilter = ctx.createBiquadFilter();
            crashFilter.type = 'bandpass';
            crashFilter.frequency.value = 800 + Math.random() * 1200;
            crashFilter.Q.value = 0.8;
            var crashGain = ctx.createGain();
            crashGain.gain.setValueAtTime(0, when);
            crashGain.gain.linearRampToValueAtTime(cfg.crashGain * (0.6 + Math.random() * 0.6), when + 0.08);
            crashGain.gain.exponentialRampToValueAtTime(0.001, when + 0.6 + Math.random() * 0.8);
            crashNoise.connect(crashFilter);
            crashFilter.connect(crashGain);
            crashGain.connect(master);
            crashNoise.start(when);
            crashNoise.stop(when + 1.5);

            // пена (короткий высокий всплеск)
            var foamNoise = createWhiteNoise(ctx, 0.5);
            var foamFilter = ctx.createBiquadFilter();
            foamFilter.type = 'highpass';
            foamFilter.frequency.value = 3000;
            var foamGain = ctx.createGain();
            foamGain.gain.setValueAtTime(0, when);
            foamGain.gain.linearRampToValueAtTime(cfg.crashGain * 0.35, when + 0.04);
            foamGain.gain.exponentialRampToValueAtTime(0.001, when + 0.35);
            foamNoise.connect(foamFilter);
            foamFilter.connect(foamGain);
            foamGain.connect(master);
            foamNoise.start(when);
            foamNoise.stop(when + 0.5);
        }

        function crashLoop() {
            if (Math.random() < cfg.crashChance) {
                waveCrash(ctx.currentTime + 0.05 + Math.random() * 0.2);
            }
            var next = 700 + Math.random() * 2000;
            timers.push(setTimeout(crashLoop, next));
        }
        if (cfg.crashChance > 0) crashLoop();

        // 6. ЧАЙКИ — крики в случайные моменты
        if (cfg.gulls) {
            function gullCry(when) {
                var osc = ctx.createOscillator();
                osc.type = 'triangle';
                var g = ctx.createGain();
                var f0 = 1400 + Math.random() * 700;
                var f1 = f0 * 0.55;
                osc.frequency.setValueAtTime(f0, when);
                osc.frequency.exponentialRampToValueAtTime(f1, when + 0.18);
                osc.frequency.exponentialRampToValueAtTime(f0 * 0.85, when + 0.35);
                g.gain.setValueAtTime(0, when);
                g.gain.linearRampToValueAtTime(0.04, when + 0.03);
                g.gain.exponentialRampToValueAtTime(0.001, when + 0.4);
                osc.connect(g); g.connect(master);
                osc.start(when); osc.stop(when + 0.45);
            }
            function gullLoop() {
                if (Math.random() < 0.35) {
                    var t = ctx.currentTime + 0.1;
                    gullCry(t);
                    if (Math.random() < 0.55) gullCry(t + 0.3 + Math.random() * 0.3);
                }
                timers.push(setTimeout(gullLoop, 2500 + Math.random() * 6000));
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

    // ---- UI плеера ----
    function createPlayer(el) {
        var presetName = el.getAttribute('data-preset') || presetFromSrc(el.getAttribute('data-src'));
        var title = el.getAttribute('data-title') || 'Звук моря';
        var caption = el.getAttribute('data-caption') || 'Синтез звука';
        var cfg = PRESETS[presetName] || PRESETS.ocean;

        el.classList.add('mars-sound-ready');
        el.innerHTML = '';

        var btn = document.createElement('button');
        btn.className = 'mss-btn';
        btn.setAttribute('aria-label', 'Воспроизвести');
        btn.innerHTML = '<span class="mss-icon">▶</span>';

        var info = document.createElement('div');
        info.className = 'mss-info';
        info.innerHTML = '<div class="mss-title">' + title + '</div>' +
                         '<div class="mss-caption">' + caption + ' · ' + cfg.label + '</div>';

        el.appendChild(btn);
        el.appendChild(info);

        btn.onclick = function () {
            var ctx = getAudioCtx();
            if (!ctx) return;

            if (currentEl === el && currentSound) {
                try { currentSound.master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4); } catch (e) {}
                var s = currentSound;
                setTimeout(function () {
                    s.stop();
                    s.nodes.forEach(function (n) { try { n.stop(); } catch (e) {} });
                }, 450);
                currentSound = null;
                currentEl = null;
                btn.innerHTML = '<span class="mss-icon">▶</span>';
                el.classList.remove('mss-playing');
            } else {
                if (currentSound) {
                    var prev = currentSound;
                    try { prev.master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3); } catch (e) {}
                    setTimeout(function () {
                        prev.stop();
                        prev.nodes.forEach(function (n) { try { n.stop(); } catch (e) {} });
                    }, 350);
                    if (currentEl) {
                        currentEl.classList.remove('mss-playing');
                        var pb = currentEl.querySelector('.mss-btn');
                        if (pb) pb.innerHTML = '<span class="mss-icon">▶</span>';
                    }
                }
                currentSound = buildSeaSound(ctx, presetName);
                currentSound.master.gain.exponentialRampToValueAtTime(0.8, ctx.currentTime + 0.8);
                currentEl = el;
                btn.innerHTML = '<span class="mss-icon">■</span>';
                el.classList.add('mss-playing');
            }
        };
    }

    // ---- Стили ----
    function addStyles() {
        if (document.getElementById('mss-style')) return;
        var s = document.createElement('style');
        s.id = 'mss-style';
        s.textContent = [
            '.mars-sound-ready {',
            '    display: flex; align-items: center; gap: 12px;',
            '    padding: 12px; margin: 8px 0;',
            '    background: linear-gradient(135deg, #1a3a4a 0%, #2a4a5a 100%);',
            '    border: 1px solid #8daebf; border-radius: 10px;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '    box-shadow: 0 4px 14px rgba(0,0,0,0.15);',
            '}',
            '.mss-btn {',
            '    width: 44px; height: 44px; flex-shrink: 0;',
            '    border-radius: 50%; border: none; cursor: pointer;',
            '    background: linear-gradient(135deg, #6C63FF, #A29BFE);',
            '    color: #fff; font-size: 15px;',
            '    display: inline-flex; align-items: center; justify-content: center;',
            '    box-shadow: 0 4px 12px rgba(108,99,255,0.4);',
            '    transition: transform 0.2s, box-shadow 0.2s;',
            '    -webkit-tap-highlight-color: transparent;',
            '}',
            '.mss-btn:hover { transform: scale(1.08); box-shadow: 0 6px 18px rgba(108,99,255,0.6); }',
            '.mss-playing .mss-btn {',
            '    animation: mssPulse 2.2s ease-in-out infinite;',
            '    background: linear-gradient(135deg, #27ae60, #2ecc71);',
            '}',
            '@keyframes mssPulse {',
            '    0%, 100% { box-shadow: 0 0 0 0 rgba(46,204,113,0.7); }',
            '    50% { box-shadow: 0 0 0 10px rgba(46,204,113,0); }',
            '}',
            '.mss-info { flex: 1; min-width: 0; color: #e8e8f0; }',
            '.mss-title { font-weight: 700; font-size: 0.92rem; margin-bottom: 3px; }',
            '.mss-caption { font-size: 0.74rem; color: #8daebf; }',
            '.mss-playing .mss-caption { color: #A29BFE; }',
            '@media (max-width: 700px) {',
            '    .mars-sound-ready { padding: 10px; gap: 10px; }',
            '    .mss-btn { width: 38px; height: 38px; font-size: 13px; }',
            '    .mss-title { font-size: 0.85rem; }',
            '    .mss-caption { font-size: 0.7rem; }',
            '}'
        ].join('\n');
        document.head.appendChild(s);
    }

    // ---- Инициализация ----
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

    console.log('🌊 mars-sound-synth v2 — реалистичный синтез моря активен');
})();
