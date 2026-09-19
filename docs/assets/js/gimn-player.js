// ============================================================
// gimn-player.js — VIP v3 (гарантированно работает)
// Хор, струны, флейта + тестовый колокол при старте
// ============================================================
(function() {
    'use strict';

    var audioCtx = null;

    function ensureAudio() {
        return new Promise(function(resolve) {
            if (!audioCtx) {
                try {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                } catch (e) { return resolve(null); }
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume().then(function() { resolve(audioCtx); });
            } else {
                resolve(audioCtx);
            }
        });
    }

    function midiToFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    // ============================================================
    // МАСТЕР-БУС (упрощённый)
    // ============================================================
    function createMasterBus(ctx) {
        var master = ctx.createGain();
        master.gain.value = 0.7;
        master.connect(ctx.destination);

        // Реверб
        var reverb = ctx.createConvolver();
        var revLen = ctx.sampleRate * 4;
        var revBuf = ctx.createBuffer(2, revLen, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = revBuf.getChannelData(ch);
            for (var i = 0; i < revLen; i++) {
                d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / revLen, 2.5);
            }
        }
        reverb.buffer = revBuf;
        var reverbSend = ctx.createGain();
        reverbSend.gain.value = 0.32;
        master.connect(reverbSend);
        reverbSend.connect(reverb);
        reverb.connect(ctx.destination);

        return master;
    }

    // ============================================================
    // ИНСТРУМЕНТЫ
    // ============================================================
    var INSTR = {
        bass: {
            oscillators: [
                { type: 'sawtooth', detune: -7 },
                { type: 'sawtooth', detune: 0 },
                { type: 'sawtooth', detune: 7 }
            ],
            cutoff: 900,
            attack: 0.15, release: 1.2, gain: 0.5,
            vibrato: { rate: 4.5, depth: 6 },
            formants: [400, 800, 1800]
        },
        tenor: {
            oscillators: [
                { type: 'sawtooth', detune: -6 },
                { type: 'sawtooth', detune: 0 },
                { type: 'sawtooth', detune: 6 }
            ],
            cutoff: 1600,
            attack: 0.12, release: 1.0, gain: 0.5,
            vibrato: { rate: 5.0, depth: 5 },
            formants: [600, 1100, 2400]
        },
        strings: {
            oscillators: [
                { type: 'sawtooth', detune: -4 },
                { type: 'sawtooth', detune: 4 }
            ],
            cutoff: 2800,
            attack: 0.18, release: 1.3, gain: 0.45,
            vibrato: { rate: 5.2, depth: 4 }
        },
        flute: {
            oscillators: [
                { type: 'sine', detune: 0 },
                { type: 'triangle', detune: 0 }
            ],
            cutoff: 3200,
            attack: 0.1, release: 0.9, gain: 0.55,
            vibrato: { rate: 5.5, depth: 3 }
        }
    };

    function pickInstrument(midi) {
        if (midi < 55) return INSTR.bass;
        if (midi < 72) return INSTR.tenor;
        if (midi < 80) return INSTR.strings;
        return INSTR.flute;
    }

    // ============================================================
    // СИНТЕЗ НОТЫ
    // ============================================================
    function playNote(ctx, master, midi, startTime, dur, velocity, inst) {
        var MIN_DUR = 0.4;
        var noteDur = Math.max(dur, MIN_DUR);
        var freq = midiToFreq(midi);
        var t = Math.max(startTime, ctx.currentTime + 0.01);

        var attack = inst.attack;
        var release = Math.max(inst.release, noteDur * 1.1);
        var peak = velocity * inst.gain * 1.5;  // ← ГРОМЧЕ в 1.5 раза

        // === Амплитудная огибающая ===
        var ampEnv = ctx.createGain();
        ampEnv.gain.setValueAtTime(0, t);
        ampEnv.gain.linearRampToValueAtTime(peak, t + attack);
        ampEnv.gain.setValueAtTime(peak, t + attack);
        ampEnv.gain.setValueAtTime(peak, t + noteDur);
        ampEnv.gain.linearRampToValueAtTime(0, t + noteDur + release);

        // === ФИЛЬТР (мягкий) ===
        var filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = inst.cutoff;
        filter.Q.value = 0.7;

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
            o.stop(t + noteDur + release + 0.5);
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

        // === ВЫВОД: через форманты (для хора) или напрямую ===
        if (inst.formants) {
            // Прямой путь (тело звука) — 0.6 от сигнала
            var direct = ctx.createGain();
            direct.gain.value = 0.6;
            ampEnv.connect(direct);
            direct.connect(master);

            // Форманты (окрас гласной)
            for (var f = 0; f < inst.formants.length; f++) {
                var bq = ctx.createBiquadFilter();
                bq.type = 'bandpass';
                bq.frequency.value = inst.formants[f];
                bq.Q.value = 4;
                var fg = ctx.createGain();
                fg.gain.value = 0.25;
                ampEnv.connect(bq);
                bq.connect(fg);
                fg.connect(master);
            }
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
        totalDur: 0
    };

    function playGimn(ui) {
        ensureAudio().then(function(ctx) {
            if (!ctx) return;

            var data = window.GIMN_DATA;
            if (!data) return;

            SESSION.playing = true;
            SESSION.stop = false;
            SESSION.totalDur = data.duration || 213;

            var master = createMasterBus(ctx);
            var t0 = ctx.currentTime + 0.3;

            // === ТЕСТОВЫЙ КОЛОКОЛ — чтобы точно услышать, что звук работает ===
            (function testBell() {
                var osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = 880;
                var g = ctx.createGain();
                g.gain.setValueAtTime(0, t0);
                g.gain.linearRampToValueAtTime(0.35, t0 + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.0);
                osc.connect(g);
                g.connect(master);
                osc.start(t0);
                osc.stop(t0 + 1.1);
            })();

            // Сортировка по времени
            var notes = data.notes.slice().sort(function(a, b) { return a[1] - b[1]; });

            for (var n = 0; n < notes.length; n++) {
                var note = notes[n];
                if (note[3] < 0.25) continue; // пропускаем совсем тихие
                var inst = pickInstrument(note[0]);
                playNote(ctx, master, note[0], t0 + note[1], note[2], note[3], inst);
            }

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
        });
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
    // UI (без изменений)
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
                '.gimn-title { font-size: 1.1rem; font-weight: 800; color: #1a3a4a; text-align: center; margin: 0 0 2px; }',
                '.gimn-subtitle { font-size: 0.72rem; color: #4a7db5; text-align: center; margin: 0 0 10px; }',
                '.gimn-controls { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }',
                '.gimn-play { width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; border: none; cursor: pointer; background: linear-gradient(135deg, #3a6d9f 0%, #16304a 100%); color: #fff; font-size: 15px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(22,48,74,0.5); }',
                '.gimn-play:active { transform: scale(0.96); }',
                '.gimn-play.playing { background: linear-gradient(135deg, #2a7ab8 0%, #0d2a3a 100%); }',
                '.gimn-bar { flex: 1; min-width: 0; }',
                '.gimn-progress-bg { height: 6px; background: rgba(26,58,74,0.15); border-radius: 3px; overflow: hidden; }',
                '.gimn-progress { height: 100%; width: 0%; background: linear-gradient(90deg, #4a7db5, #1a3a4a); border-radius: 3px; }',
                '.gimn-time { font-size: 0.7rem; color: #1a3a4a; margin-top: 4px; }',
                '.gimn-lyrics { max-height: 260px; overflow-y: auto; padding: 10px; background: rgba(255,255,255,0.4); border-radius: 8px; border: 1px solid rgba(141,174,191,0.5); }',
                '.gimn-line { padding: 5px 8px; margin: 2px 0; border-radius: 5px; color: #2a4a5a; font-size: 0.85rem; opacity: 0.55; line-height: 1.35; }',
                '.gimn-line.gimn-line-active { background: rgba(74,125,181,0.2); color: #0d2a3a; font-weight: 700; opacity: 1; }',
                '.gimn-compact { padding: 10px 8px; }',
                '.gimn-compact .gimn-title { font-size: 0.9rem; }',
                '.gimn-compact .gimn-subtitle { font-size: 0.65rem; }',
                '.gimn-compact .gimn-play { width: 38px; height: 38px; }',
                '.gimn-compact .gimn-lyrics { max-height: 180px; padding: 8px; }',
                '.gimn-compact .gimn-line { font-size: 0.75rem; }'
            ].join('\n');
            document.head.appendChild(style);
        }

        for (var r = 0; r < roots.length; r++) {
            (function(root) {
                root.dataset.built = '1';
                root.classList.add('gimn-root');
                if (root.closest('.infobox') || root.offsetWidth < 400) root.classList.add('gimn-compact');

                var html = '';
                html += '<div class="gimn-title">' + data.title + '</div>';
                html += '<div class="gimn-subtitle">' + data.subtitle + '</div>';
                html += '<div class="gimn-controls"><button class="gimn-play">▶</button>';
                html += '<div class="gimn-bar"><div class="gimn-progress-bg"><div class="gimn-progress"></div></div>';
                html += '<div class="gimn-time">0:00 / ' + fmt(data.duration) + '</div></div></div>';
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

    console.log('🎼 gimn-player VIP v3 — с тестовым колоколом');
})();
