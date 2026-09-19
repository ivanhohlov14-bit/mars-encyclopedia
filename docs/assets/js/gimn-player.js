// ============================================================
// gimn-player.js — VIP v2
// Реалистичный синтез: хор, струны, флейта, барабаны
// ADSR + форманты + вибрато + реверберация
// ============================================================
(function() {
    'use strict';

    var audioCtx = null;

    function getAudioCtx() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) { return null; }
        }
        if (audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
        return audioCtx;
    }

    function midiToFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    // ============================================================
    // МАСТЕР-БУС
    // ============================================================
    function createMasterBus(ctx) {
        var master = ctx.createGain();
        master.gain.value = 0.0001;

        // Компрессор — склеивает звук
        var comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -20;
        comp.knee.value = 24;
        comp.ratio.value = 3;
        comp.attack.value = 0.02;
        comp.release.value = 0.35;

        // Реверберация — большой зал
        var reverb = ctx.createConvolver();
        var revLen = ctx.sampleRate * 4.5;
        var revBuf = ctx.createBuffer(2, revLen, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = revBuf.getChannelData(ch);
            for (var i = 0; i < revLen; i++) {
                var decay = Math.pow(1 - i / revLen, 2.2);
                d[i] = (Math.random() * 2 - 1) * decay;
            }
        }
        reverb.buffer = revBuf;

        var reverbSend = ctx.createGain();
        reverbSend.gain.value = 0.42;

        master.connect(comp);
        comp.connect(ctx.destination);
        master.connect(reverbSend);
        reverbSend.connect(reverb);
        reverb.connect(ctx.destination);

        return { master: master };
    }

    // ============================================================
    // ИНСТРУМЕНТЫ
    // ============================================================
    var INSTR = {
        male_choir_bass: {
            oscillators: [
                { type: 'sawtooth', detune: -7 },
                { type: 'sawtooth', detune: 0 },
                { type: 'sawtooth', detune: 7 }
            ],
            filter: { type: 'lowpass', cutoff: 900, Q: 0.7 },
            attack: 0.12, decay: 0.2, sustain: 0.75, release: 0.9,
            gain: 0.35,
            vibrato: { rate: 4.8, depth: 5 },
            formants: [
                { freq: 400, Q: 6, gain: 0.8 },
                { freq: 900, Q: 8, gain: 0.5 },
                { freq: 2200, Q: 10, gain: 0.25 }
            ]
        },
        male_choir_tenor: {
            oscillators: [
                { type: 'sawtooth', detune: -6 },
                { type: 'sawtooth', detune: 0 },
                { type: 'sawtooth', detune: 6 }
            ],
            filter: { type: 'lowpass', cutoff: 1600, Q: 0.7 },
            attack: 0.1, decay: 0.15, sustain: 0.8, release: 0.8,
            gain: 0.32,
            vibrato: { rate: 5.2, depth: 4 },
            formants: [
                { freq: 550, Q: 7, gain: 0.85 },
                { freq: 1200, Q: 9, gain: 0.55 },
                { freq: 2600, Q: 10, gain: 0.28 }
            ]
        },
        strings_high: {
            oscillators: [
                { type: 'sawtooth', detune: -3 },
                { type: 'sawtooth', detune: 3 }
            ],
            filter: { type: 'lowpass', cutoff: 2500, Q: 0.7 },
            attack: 0.12, decay: 0.2, sustain: 0.75, release: 0.9,
            gain: 0.24,
            vibrato: { rate: 5, depth: 3 }
        },
        flute: {
            oscillators: [
                { type: 'sine', detune: 0 },
                { type: 'triangle', detune: 0 }
            ],
            filter: { type: 'lowpass', cutoff: 2800, Q: 0.5 },
            attack: 0.06, decay: 0.1, sustain: 0.85, release: 0.5,
            gain: 0.28,
            vibrato: { rate: 5.5, depth: 2 }
        }
    };

    function pickInstrument(midi) {
        if (midi < 55) return INSTR.male_choir_bass;
        if (midi < 72) return INSTR.male_choir_tenor;
        if (midi < 80) return INSTR.strings_high;
        return INSTR.flute;
    }

    // ============================================================
    // СИНТЕЗ НОТЫ
    // ============================================================
    function playSynthNote(ctx, master, midi, startTime, dur, velocity, inst) {
        var minDur = 0.22;
        var noteDur = Math.max(dur, minDur);
        var freq = midiToFreq(midi);
        var t = startTime;

        var attack = inst.attack || 0.08;
        var decay = inst.decay || 0.15;
        var sustain = inst.sustain || 0.7;
        var release = Math.max(inst.release || 0.6, noteDur * 0.9);
        var peak = velocity * (inst.gain || 0.3);

        // === ОГИБАЮЩАЯ ===
        var ampEnv = ctx.createGain();
        ampEnv.gain.setValueAtTime(0, t);
        ampEnv.gain.linearRampToValueAtTime(peak, t + attack);
        ampEnv.gain.linearRampToValueAtTime(peak * sustain, t + attack + decay);
        ampEnv.gain.setValueAtTime(peak * sustain, t + noteDur);
        ampEnv.gain.linearRampToValueAtTime(0, t + noteDur + release);

        // === ФИЛЬТР ===
        var filter = ctx.createBiquadFilter();
        filter.type = inst.filter.type;
        filter.Q.value = inst.filter.Q;
        filter.frequency.setValueAtTime(inst.filter.cutoff * 0.4, t);
        filter.frequency.linearRampToValueAtTime(inst.filter.cutoff, t + attack + 0.2);

        // === ОСЦИЛЛЯТОРЫ ===
        var oscGain = ctx.createGain();
        oscGain.gain.value = 1.0 / inst.oscillators.length;
        oscGain.connect(filter);
        filter.connect(ampEnv);

        var oscs = [];
        for (var i = 0; i < inst.oscillators.length; i++) {
            var o = ctx.createOscillator();
            o.type = inst.oscillators[i].type;
            o.frequency.value = freq;
            o.detune.value = inst.oscillators[i].detune;
            o.connect(oscGain);
            o.start(t);
            o.stop(t + noteDur + release + 0.3);
            oscs.push(o);
        }

        // === ВИБРАТО ===
        if (inst.vibrato) {
            var lfo = ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = inst.vibrato.rate;
            var lfoGain = ctx.createGain();
            lfoGain.gain.value = inst.vibrato.depth;
            lfo.connect(lfoGain);
            for (var v = 0; v < oscs.length; v++) {
                lfoGain.connect(oscs[v].detune);
            }
            lfo.start(t + 0.2);
            lfo.stop(t + noteDur + release);
        }

        // === ФОРМАНТЫ (для хора) ===
        if (inst.formants) {
            var formantSum = ctx.createGain();
            formantSum.gain.value = 1;
            for (var f = 0; f < inst.formants.length; f++) {
                var fmt = inst.formants[f];
                var bq = ctx.createBiquadFilter();
                bq.type = 'bandpass';
                bq.frequency.value = fmt.freq;
                bq.Q.value = fmt.Q;
                var fg = ctx.createGain();
                fg.gain.value = fmt.gain;
                ampEnv.connect(bq);
                bq.connect(fg);
                fg.connect(formantSum);
            }
            // Немного прямого сигнала (тело звука)
            var direct = ctx.createGain();
            direct.gain.value = 0.25;
            ampEnv.connect(direct);
            direct.connect(formantSum);
            formantSum.connect(master);
        } else {
            ampEnv.connect(master);
        }
    }

    // ============================================================
    // СЕССИЯ
    // ============================================================
    var SESSION = {
        playing: false,
        stop: false,
        rafId: null,
        startTime: 0,
        totalDur: 0
    };

    function playGimn(ui) {
        var ctx = getAudioCtx();
        if (!ctx) return;

        var data = window.GIMN_DATA;
        if (!data) return;

        SESSION.playing = true;
        SESSION.stop = false;

        var bus = createMasterBus(ctx);
        var master = bus.master;

        var t0 = ctx.currentTime + 0.2;
        SESSION.startTime = t0;
        SESSION.totalDur = data.duration || 213;

        master.gain.setValueAtTime(0.0001, t0);
        master.gain.linearRampToValueAtTime(0.9, t0 + 1.5);

        // Сортируем ноты по времени (важно для качества)
        var sortedNotes = data.notes.slice().sort(function(a, b) { return a[1] - b[1]; });

        for (var n = 0; n < sortedNotes.length; n++) {
            var note = sortedNotes[n];
            var midi = note[0];
            var start = note[1];
            var dur = note[2];
            var vel = note[3];

            if (vel < 0.28) continue; // слишком тихие — убираем

            var inst = pickInstrument(midi);
            playSynthNote(ctx, master, midi, t0 + start, dur, vel, inst);
        }

        // Финальное затухание
        master.gain.setValueAtTime(0.9, t0 + SESSION.totalDur - 3);
        master.gain.linearRampToValueAtTime(0.0001, t0 + SESSION.totalDur + 1.5);

        function tick() {
            if (SESSION.stop) return;
            var elapsed = ctx.currentTime - t0;

            if (ui.progress) {
                ui.progress.style.width = Math.min(100, (elapsed / SESSION.totalDur) * 100) + '%';
            }
            if (ui.timecode) {
                ui.timecode.textContent = fmt(Math.max(0, elapsed)) + ' / ' + fmt(SESSION.totalDur);
            }
            if (ui.lyrics) {
                var lines = ui.lyrics.querySelectorAll('[data-t]');
                for (var li = 0; li < lines.length; li++) {
                    var lineT = parseFloat(lines[li].getAttribute('data-t'));
                    var nextT = li + 1 < lines.length
                        ? parseFloat(lines[li + 1].getAttribute('data-t'))
                        : SESSION.totalDur;
                    if (elapsed >= lineT && elapsed < nextT) {
                        lines[li].classList.add('gimn-line-active');
                    } else {
                        lines[li].classList.remove('gimn-line-active');
                    }
                }
            }

            if (elapsed >= SESSION.totalDur + 2) {
                stopGimn(ui);
                return;
            }
            SESSION.rafId = requestAnimationFrame(tick);
        }
        SESSION.rafId = requestAnimationFrame(tick);
    }

    function stopGimn(ui) {
        SESSION.stop = true;
        SESSION.playing = false;
        if (SESSION.rafId) cancelAnimationFrame(SESSION.rafId);
        if (audioCtx) {
            try { audioCtx.close(); } catch(e) {}
            audioCtx = null;
        }
        if (ui && ui.progress) ui.progress.style.width = '0%';
        if (ui && ui.timecode) ui.timecode.textContent = '0:00 / ' + fmt(window.GIMN_DATA.duration);
        if (ui && ui.lyrics) {
            var active = ui.lyrics.querySelectorAll('.gimn-line-active');
            for (var i = 0; i < active.length; i++) active[i].classList.remove('gimn-line-active');
        }
    }

    function fmt(sec) {
        var m = Math.floor(sec / 60);
        var s = Math.floor(sec % 60);
        if (s < 10) s = '0' + s;
        return m + ':' + s;
    }

    // ============================================================
    // UI
    // ============================================================
    function buildUI() {
        var roots = document.querySelectorAll('[id^="gimn-kimeria"]:not([data-built])');
        if (!roots.length) return;
        var data = window.GIMN_DATA;
        if (!data) return;

        if (!document.getElementById('gimn-style')) {
            var style = document.createElement('style');
            style.id = 'gimn-style';
            style.textContent = [
                '.gimn-root { margin: 12px 0; padding: 14px; background: linear-gradient(135deg, #dce8ef 0%, #b8ced9 100%); border: 1px solid #8daebf; border-radius: 12px; box-shadow: 0 4px 14px rgba(26,58,74,0.15); font-family: -apple-system, "Segoe UI", Roboto, sans-serif; box-sizing: border-box; }',
                '.gimn-title { font-size: 1.1rem; font-weight: 800; color: #1a3a4a; text-align: center; margin: 0 0 2px; line-height: 1.2; }',
                '.gimn-subtitle { font-size: 0.72rem; color: #4a7db5; text-align: center; margin: 0 0 10px; letter-spacing: 0.4px; }',
                '.gimn-controls { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }',
                '.gimn-play { width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; border: none; cursor: pointer; background: linear-gradient(135deg, #3a6d9f 0%, #16304a 100%); color: #fff; font-size: 15px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(22,48,74,0.5); transition: transform 0.2s; }',
                '.gimn-play:hover { transform: scale(1.06); }',
                '.gimn-play:active { transform: scale(0.96); }',
                '.gimn-play.playing { background: linear-gradient(135deg, #2a7ab8 0%, #0d2a3a 100%); animation: gimnPulse 2s ease-in-out infinite; }',
                '@keyframes gimnPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,125,181,0.7); } 50% { box-shadow: 0 0 0 8px rgba(74,125,181,0); } }',
                '.gimn-bar { flex: 1; min-width: 0; }',
                '.gimn-progress-bg { height: 6px; background: rgba(26,58,74,0.15); border-radius: 3px; overflow: hidden; }',
                '.gimn-progress { height: 100%; width: 0%; background: linear-gradient(90deg, #4a7db5, #1a3a4a); border-radius: 3px; transition: width 0.15s linear; }',
                '.gimn-time { font-size: 0.7rem; color: #1a3a4a; margin-top: 4px; font-variant-numeric: tabular-nums; }',
                '.gimn-lyrics { max-height: 260px; overflow-y: auto; padding: 10px; background: rgba(255,255,255,0.4); border-radius: 8px; border: 1px solid rgba(141,174,191,0.5); }',
                '.gimn-line { padding: 5px 8px; margin: 2px 0; border-radius: 5px; color: #2a4a5a; font-size: 0.85rem; transition: all 0.3s; opacity: 0.55; line-height: 1.35; }',
                '.gimn-line.gimn-line-active { background: rgba(74,125,181,0.2); color: #0d2a3a; font-weight: 700; font-size: 0.92rem; opacity: 1; transform: translateX(4px); }',
                '.gimn-compact { padding: 10px 8px; margin: 6px 0; border-radius: 8px; }',
                '.gimn-compact .gimn-title { font-size: 0.9rem; }',
                '.gimn-compact .gimn-subtitle { font-size: 0.65rem; margin-bottom: 8px; }',
                '.gimn-compact .gimn-play { width: 38px; height: 38px; font-size: 13px; }',
                '.gimn-compact .gimn-controls { gap: 8px; margin-bottom: 8px; }',
                '.gimn-compact .gimn-progress-bg { height: 5px; }',
                '.gimn-compact .gimn-time { font-size: 0.65rem; }',
                '.gimn-compact .gimn-lyrics { max-height: 180px; padding: 8px 6px; }',
                '.gimn-compact .gimn-line { padding: 4px 6px; font-size: 0.75rem; margin: 1px 0; }',
                '.gimn-compact .gimn-line.gimn-line-active { font-size: 0.82rem; transform: translateX(3px); }'
            ].join('\n');
            document.head.appendChild(style);
        }

        for (var r = 0; r < roots.length; r++) {
            (function(root) {
                root.dataset.built = '1';
                root.classList.add('gimn-root');

                var isCompact = root.closest('.infobox') !== null || root.offsetWidth < 400;
                if (isCompact) root.classList.add('gimn-compact');

                var html = '';
                html += '<div class="gimn-title">' + data.title + '</div>';
                html += '<div class="gimn-subtitle">' + data.subtitle + '</div>';
                html += '<div class="gimn-controls">';
                html +=   '<button class="gimn-play" aria-label="Play">▶</button>';
                html +=   '<div class="gimn-bar">';
                html +=     '<div class="gimn-progress-bg"><div class="gimn-progress"></div></div>';
                html +=     '<div class="gimn-time">0:00 / ' + fmt(data.duration) + '</div>';
                html +=   '</div>';
                html += '</div>';
                html += '<div class="gimn-lyrics">';
                data.lyrics.forEach(function(line) {
                    html += '<div class="gimn-line" data-t="' + line.time + '">' + line.text + '</div>';
                });
                html += '</div>';
                root.innerHTML = html;

                var btn = root.querySelector('.gimn-play');
                var ui = {
                    progress: root.querySelector('.gimn-progress'),
                    timecode: root.querySelector('.gimn-time'),
                    lyrics: root.querySelector('.gimn-lyrics')
                };

                btn.onclick = function() {
                    if (SESSION.playing) {
                        stopGimn(ui);
                        btn.textContent = '▶';
                        btn.classList.remove('playing');
                    } else {
                        btn.textContent = '❚❚';
                        btn.classList.add('playing');
                        playGimn(ui);
                    }
                };
            })(roots[r]);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildUI);
    } else {
        buildUI();
    }
    setTimeout(buildUI, 500);
    setTimeout(buildUI, 1500);

    if (window.MutationObserver) {
        new MutationObserver(buildUI).observe(document.body, { childList: true, subtree: true });
    }

    console.log('🎼 gimn-player VIP v2 — хор, струны, форматы, ADSR');
})();
