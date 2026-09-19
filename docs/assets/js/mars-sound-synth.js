// ============================================================
// mars-sound-synth.js — Синтез звуков моря (оригинальный код)
// Заменяет mp3-плеер. Никаких внешних файлов. 100% free.
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

    // ---- Генератор розового шума (основа звука моря) ----
    function createNoiseSource(ctx, seconds) {
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

    // ---- Пресеты звуков ----
    var PRESETS = {
        calm:     { waveGain: 0.10, windGain: 0.03, waveRate: 0.08, waveDepth: 0.5, bandFreq: 500,  bandQ: 0.7, label: 'Спокойное море' },
        ocean:    { waveGain: 0.18, windGain: 0.06, waveRate: 0.12, waveDepth: 0.7, bandFreq: 700,  bandQ: 0.8, label: 'Океанские волны' },
        storm:    { waveGain: 0.26, windGain: 0.13, waveRate: 0.18, waveDepth: 0.9, bandFreq: 900,  bandQ: 1.0, label: 'Штормовое море' },
        gulls:    { waveGain: 0.14, windGain: 0.05, waveRate: 0.10, waveDepth: 0.6, bandFreq: 600,  bandQ: 0.8, label: 'Море с чайками', gulls: true },
        deep:     { waveGain: 0.15, windGain: 0.02, waveRate: 0.05, waveDepth: 0.4, bandFreq: 300,  bandQ: 0.6, label: 'Глубокое море' },
        freezing: { waveGain: 0.06, windGain: 0.16, waveRate: 0.04, waveDepth: 0.3, bandFreq: 1200, bandQ: 1.2, label: 'Замерзающее море' }
    };

    // ---- Автоматический маппинг старых data-src на пресеты ----
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

        // Слой 1: волны
        var waveNoise = createNoiseSource(ctx, 4);
        var waveBand = ctx.createBiquadFilter();
        waveBand.type = 'bandpass';
        waveBand.frequency.value = cfg.bandFreq;
        waveBand.Q.value = cfg.bandQ;
        var waveGain = ctx.createGain();
        waveGain.gain.value = cfg.waveGain;

        var waveLFO = ctx.createOscillator();
        waveLFO.type = 'sine';
        waveLFO.frequency.value = cfg.waveRate;
        var waveLFOGain = ctx.createGain();
        waveLFOGain.gain.value = cfg.waveGain * cfg.waveDepth;
        waveLFO.connect(waveLFOGain);
        waveLFOGain.connect(waveGain.gain);

        waveNoise.connect(waveBand);
        waveBand.connect(waveGain);
        waveGain.connect(master);
        waveNoise.start(); waveLFO.start();
        nodes.push(waveNoise, waveLFO);

        // Слой 2: ветер (низкий рокот)
        var windNoise = createNoiseSource(ctx, 4);
        var windFilter = ctx.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.value = 400;
        var windGain = ctx.createGain();
        windGain.gain.value = cfg.windGain;

        var windLFO = ctx.createOscillator();
        windLFO.type = 'sine';
        windLFO.frequency.value = 0.04;
        var windLFOGain = ctx.createGain();
        windLFOGain.gain.value = cfg.windGain * 0.6;
        windLFO.connect(windLFOGain);
        windLFOGain.connect(windGain.gain);

        windNoise.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(master);
        windNoise.start(); windLFO.start();
        nodes.push(windNoise, windLFO);

        // Слой 3: чайки
        var gullTimer = null;
        if (cfg.gulls) {
            function gullCry(when) {
                var osc = ctx.createOscillator();
                osc.type = 'triangle';
                var g = ctx.createGain();
                var f0 = 1400 + Math.random() * 600;
                var f1 = f0 * 0.6;
                osc.frequency.setValueAtTime(f0, when);
                osc.frequency.exponentialRampToValueAtTime(f1, when + 0.15);
                osc.frequency.exponentialRampToValueAtTime(f0 * 0.9, when + 0.3);
                g.gain.setValueAtTime(0, when);
                g.gain.linearRampToValueAtTime(0.035, when + 0.03);
                g.gain.exponentialRampToValueAtTime(0.001, when + 0.35);
                osc.connect(g); g.connect(master);
                osc.start(when); osc.stop(when + 0.4);
            }
            (function loop() {
                if (Math.random() < 0.4) {
                    var t = ctx.currentTime + 0.1;
                    gullCry(t);
                    if (Math.random() < 0.5) gullCry(t + 0.25);
                }
                gullTimer = setTimeout(loop, 3000 + Math.random() * 5000);
            })();
        }

        return {
            master: master,
            nodes: nodes,
            stop: function () {
                if (gullTimer) clearTimeout(gullTimer);
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
                // остановить
                var stopTime = ctx.currentTime + 0.35;
                try { currentSound.master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3); } catch (e) {}
                currentSound.stop();
                currentSound.nodes.forEach(function (n) {
                    try { n.stop(stopTime); } catch (e) {}
                });
                currentSound = null;
                currentEl = null;
                btn.innerHTML = '<span class="mss-icon">▶</span>';
                el.classList.remove('mss-playing');
            } else {
                // остановить предыдущий
                if (currentSound) {
                    try { currentSound.master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2); } catch (e) {}
                    currentSound.stop();
                    currentSound.nodes.forEach(function (n) {
                        try { n.stop(ctx.currentTime + 0.25); } catch (e) {}
                    });
                    if (currentEl) {
                        currentEl.classList.remove('mss-playing');
                        var prevBtn = currentEl.querySelector('.mss-btn');
                        if (prevBtn) prevBtn.innerHTML = '<span class="mss-icon">▶</span>';
                    }
                }
                // запустить новый
                currentSound = buildSeaSound(ctx, presetName);
                currentSound.master.gain.exponentialRampToValueAtTime(0.7, ctx.currentTime + 0.6);
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
            '    display: flex; align-items: center; gap: 10px;',
            '    padding: 10px; margin: 8px 0;',
            '    background: linear-gradient(135deg, #1a3a4a 0%, #2a4a5a 100%);',
            '    border: 1px solid #8daebf; border-radius: 8px;',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '}',
            '.mss-btn {',
            '    width: 40px; height: 40px; flex-shrink: 0;',
            '    border-radius: 50%; border: none; cursor: pointer;',
            '    background: linear-gradient(135deg, #6C63FF, #A29BFE);',
            '    color: #fff; font-size: 14px;',
            '    display: inline-flex; align-items: center; justify-content: center;',
            '    box-shadow: 0 4px 12px rgba(108,99,255,0.4);',
            '    transition: transform 0.2s, box-shadow 0.2s;',
            '    -webkit-tap-highlight-color: transparent;',
            '}',
            '.mss-btn:hover { transform: scale(1.08); box-shadow: 0 6px 16px rgba(108,99,255,0.6); }',
            '.mss-playing .mss-btn {',
            '    animation: mssPulse 2s ease-in-out infinite;',
            '    background: linear-gradient(135deg, #27ae60, #2ecc71);',
            '}',
            '@keyframes mssPulse {',
            '    0%, 100% { box-shadow: 0 0 0 0 rgba(46,204,113,0.7); }',
            '    50% { box-shadow: 0 0 0 8px rgba(46,204,113,0); }',
            '}',
            '.mss-info { flex: 1; min-width: 0; color: #e8e8f0; }',
            '.mss-title { font-weight: 700; font-size: 0.88rem; margin-bottom: 2px; }',
            '.mss-caption { font-size: 0.72rem; color: #8daebf; }',
            '.mss-playing .mss-caption { color: #A29BFE; }',
            '@media (max-width: 700px) {',
            '    .mars-sound-ready { padding: 8px; }',
            '    .mss-btn { width: 36px; height: 36px; }',
            '    .mss-title { font-size: 0.82rem; }',
            '    .mss-caption { font-size: 0.68rem; }',
            '}'
        ].join('\n');
        document.head.appendChild(s);
    }

    // ---- Инициализация ----
    function init() {
        addStyles();
        var els = document.querySelectorAll('.mars-sound:not(.mars-sound-ready)');
        for (var i = 0; i < els.length; i++) {
            createPlayer(els[i]);
        }
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

    console.log('🎵 mars-sound-synth загружен — синтез звуков моря активен');
})();
