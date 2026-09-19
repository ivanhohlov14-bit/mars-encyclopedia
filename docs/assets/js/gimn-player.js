// ============================================================
// gimn-player.js — VIP v4
// С перемоткой, паузой, стопом + отладка
// ============================================================
(function() {
    'use strict';

    // --- Глобальный стейт (один context на всё) ---
    var audioCtx = null;
    var masterBus = null;
    var scheduledNodes = [];

    var state = {
        isPlaying: false,
        isPaused: false,
        position: 0,       // текущая позиция, сек
        startCtxTime: 0,   // ctx.currentTime, когда стартанули
        startOffset: 0,    // позиция, с которой стартанули
        totalDur: 213
    };

    function getOrCreateCtx() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                console.log('🎵 AudioContext создан, state =', audioCtx.state);
            } catch (e) {
                console.error('❌ Не удалось создать AudioContext:', e);
                return null;
            }
        }
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
        master.gain.value = 0.75;
        master.connect(ctx.destination);

        // Реверб
        var reverb = ctx.createConvolver();
        var revLen = Math.floor(ctx.sampleRate * 3.5);
        var revBuf = ctx.createBuffer(2, revLen, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = revBuf.getChannelData(ch);
            for (var i = 0; i < revLen; i++) {
                d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / revLen, 2.5);
            }
        }
        reverb.buffer = revBuf;
        var reverbSend = ctx.createGain();
        reverbSend.gain.value = 0.35;
        master.connect(reverbSend);
        reverbSend.connect(reverb);
        reverb.connect(ctx.destination);

        console.log('🎛️ MasterBus создан, master.gain =', master.gain.value);
        return master;
    }

    // ============================================================
    // ИНСТРУМЕНТЫ
    // ============================================================
    var INSTR = {
        bass: {
            oscs: [
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
            oscs: [
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
            oscs: [
                { type: 'sawtooth', detune: -4 },
                { type: 'sawtooth', detune: 4 }
            ],
            cutoff: 2800,
            attack: 0.18, release: 1.3, gain: 0.45,
            vibrato: { rate: 5.2, depth: 4 }
        },
        flute: {
            oscs: [
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
        var MIN_DUR = 0.35;
        var noteDur = Math.max(dur, MIN_DUR);
        var freq = midiToFreq(midi);
        var t = Math.max(startTime, ctx.currentTime + 0.02);

        var attack = inst.attack;
        var release = Math.max(inst.release, noteDur * 1.1);
        var peak = velocity * inst.gain * 1.6;

        var ampEnv = ctx.createGain();
        ampEnv.gain.setValueAtTime(0, t);
        ampEnv.gain.linearRampToValueAtTime(peak, t + attack);
        ampEnv.gain.setValueAtTime(peak, t + noteDur);
        ampEnv.gain.linearRampToValueAtTime(0, t + noteDur + release);

        var filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = inst.cutoff;
        filter.Q.value = 0.7;

        var oscGain = ctx.createGain();
        oscGain.gain.value = 1.0 / inst.oscs.length;
        oscGain.connect(filter);
        filter.connect(ampEnv);

        var oscs = [];
        for (var i = 0; i < inst.oscs.length; i++) {
            var o = ctx.createOscillator();
            o.type = inst.oscs[i].type;
            o.frequency.value = freq;
            o.detune.value = inst.oscs[i].detune;
            o.connect(oscGain);
            o.start(t);
            o.stop(t + noteDur + release + 0.5);
            oscs.push(o);
            scheduledNodes.push(o);
        }

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
            scheduledNodes.push(lfo);
        }

        if (inst.formants) {
            var direct = ctx.createGain();
            direct.gain.value = 0.6;
            ampEnv.connect(direct);
            direct.connect(master);

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
    // ОСТАНОВКА ВСЕХ НОД
    // ============================================================
    function stopAllNodes() {
        for (var i = 0; i < scheduledNodes.length; i++) {
            try { scheduledNodes[i].stop(); } catch(e) {}
            try { scheduledNodes[i].disconnect(); } catch(e) {}
        }
        scheduledNodes = [];
    }

    // ============================================================
    // ПЛАНИРОВАНИЕ ГИМНА С ПОЗИЦИИ
    // ============================================================
    function playFromPosition(fromSec) {
        var ctx = getOrCreateCtx();
        if (!ctx) return;

        var data = window.GIMN_DATA;
        if (!data) { console.error('❌ GIMN_DATA не загружен'); return; }

        console.log('▶ playFromPosition, ctx.state =', ctx.state, ', from =', fromSec);

        if (!masterBus) masterBus = createMasterBus(ctx);

        stopAllNodes();

        var t0 = ctx.currentTime + 0.15;
        state.startCtxTime = t0;
        state.startOffset = fromSec;
        state.totalDur = data.duration || 213;

        // === ТЕСТОВЫЙ КОЛОКОЛ (только при первом старте с 0) ===
        if (fromSec < 0.5) {
            var testOsc = ctx.createOscillator();
            testOsc.type = 'sine';
            testOsc.frequency.value = 880;
            var testGain = ctx.createGain();
            testGain.gain.setValueAtTime(0, t0);
            testGain.gain.linearRampToValueAtTime(0.4, t0 + 0.02);
            testGain.gain.exponentialRampToValueAtTime(0.001, t0 + 1.2);
            testOsc.connect(testGain);
            testGain.connect(masterBus);
            testOsc.start(t0);
            testOsc.stop(t0 + 1.3);
            scheduledNodes.push(testOsc);
        }

        // === ПЛАНИРУЕМ НОТЫ ===
        var notes = data.notes.slice().sort(function(a, b) { return a[1] - b[1]; });
        var scheduled = 0;

        for (var n = 0; n < notes.length; n++) {
            var note = notes[n];
            var midi = note[0];
            var noteStart = note[1];
            var noteDur = note[2];
            var vel = note[3];

            if (vel < 0.25) continue;

            var inst = pickInstrument(midi);

            if (noteStart < fromSec) {
                // Нота началась раньше — возможно, ещё играет
                var timeIntoNote = fromSec - noteStart;
                if (timeIntoNote >= noteDur) continue;
                var adjDur = noteDur - timeIntoNote;
                playNote(ctx, masterBus, midi, t0, adjDur, vel, inst);
                scheduled++;
            } else {
                // Нота в будущем
                playNote(ctx, masterBus, midi, t0 + (noteStart - fromSec), noteDur, vel, inst);
                scheduled++;
            }
        }

        console.log('🎵 Запланировано нот:', scheduled);
        state.isPlaying = true;
        state.isPaused = false;
    }

    function pause() {
        var ctx = audioCtx;
        if (!ctx || !state.isPlaying) return;
        var pos = state.startOffset + (ctx.currentTime - state.startCtxTime);
        state.position = Math.max(0, Math.min(state.totalDur, pos));
        stopAllNodes();
        state.isPlaying = false;
        state.isPaused = true;
        console.log('⏸ Пауза на', state.position.toFixed(1), 'сек');
    }

    function stop() {
        stopAllNodes();
        state.position = 0;
        state.isPlaying = false;
        state.isPaused = false;
        console.log('⏹ Стоп');
    }

    function getCurrentPosition() {
        if (state.isPlaying && audioCtx) {
            return Math.min(state.totalDur,
                state.startOffset + (audioCtx.currentTime - state.startCtxTime));
        }
        return state.position;
    }

    // ============================================================
    // UI
    // ============================================================
    function fmt(sec) {
        var m = Math.floor(sec / 60);
        var s = Math.floor(sec % 60);
        if (s < 10) s = '0' + s;
        return m + ':' + s;
    }

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
                '.gimn-status { font-size: 0.68rem; color: #1f7a4a; text-align: center; margin-bottom: 8px; font-weight: 600; }',
                '.gimn-status.err { color: #b03a3a; }',
                '.gimn-controls { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }',
                '.gimn-play, .gimn-stopbtn { width: 42px; height: 42px; flex-shrink: 0; border-radius: 50%; border: none; cursor: pointer; background: linear-gradient(135deg, #3a6d9f 0%, #16304a 100%); color: #fff; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(22,48,74,0.5); }',
                '.gimn-stopbtn { width: 36px; height: 36px; font-size: 12px; background: linear-gradient(135deg, #8a3030 0%, #3a0d0d 100%); }',
                '.gimn-play:active, .gimn-stopbtn:active { transform: scale(0.95); }',
                '.gimn-play.playing { background: linear-gradient(135deg, #2a7ab8 0%, #0d2a3a 100%); }',
                '.gimn-bar { flex: 1; min-width: 0; }',
                '.gimn-progress-bg { height: 8px; background: rgba(26,58,74,0.15); border-radius: 4px; overflow: hidden; cursor: pointer; user-select: none; }',
                '.gimn-progress-bg:hover { background: rgba(26,58,74,0.25); }',
                '.gimn-progress { height: 100%; width: 0%; background: linear-gradient(90deg, #4a7db5, #1a3a4a); border-radius: 4px; pointer-events: none; }',
                '.gimn-time { font-size: 0.7rem; color: #1a3a4a; margin-top: 4px; font-variant-numeric: tabular-nums; }',
                '.gimn-lyrics { max-height: 260px; overflow-y: auto; padding: 10px; background: rgba(255,255,255,0.4); border-radius: 8px; border: 1px solid rgba(141,174,191,0.5); }',
                '.gimn-line { padding: 5px 8px; margin: 2px 0; border-radius: 5px; color: #2a4a5a; font-size: 0.85rem; opacity: 0.55; line-height: 1.35; transition: all 0.3s; }',
                '.gimn-line.gimn-line-active { background: rgba(74,125,181,0.2); color: #0d2a3a; font-weight: 700; opacity: 1; }',
                '.gimn-compact { padding: 10px 8px; }',
                '.gimn-compact .gimn-title { font-size: 0.9rem; }',
                '.gimn-compact .gimn-subtitle { font-size: 0.65rem; }',
                '.gimn-compact .gimn-status { font-size: 0.6rem; }',
                '.gimn-compact .gimn-play { width: 36px; height: 36px; font-size: 12px; }',
                '.gimn-compact .gimn-stopbtn { width: 30px; height: 30px; font-size: 10px; }',
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
                html += '<div class="gimn-status">🔊 проверка звука...</div>';
                html += '<div class="gimn-controls">';
                html +=   '<button class="gimn-play" aria-label="Play">▶</button>';
                html +=   '<button class="gimn-stopbtn" aria-label="Stop">⏹</button>';
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
                var stopBtn = root.querySelector('.gimn-stopbtn');
                var progressBg = root.querySelector('.gimn-progress-bg');
                var progressFill = root.querySelector('.gimn-progress');
                var timecode = root.querySelector('.gimn-time');
                var lyrics = root.querySelector('.gimn-lyrics');
                var statusEl = root.querySelector('.gimn-status');

                var ui = {
                    progress: progressFill,
                    timecode: timecode,
                    lyrics: lyrics,
                    status: statusEl
                };

                // ============ PLAY / PAUSE ============
                btn.onclick = function() {
                    // СИНХРОННО разблокируем AudioContext
                    var ctx = getOrCreateCtx();
                    if (!ctx) {
                        statusEl.textContent = '❌ Не удалось создать AudioContext';
                        statusEl.classList.add('err');
                        return;
                    }
                    if (ctx.state === 'suspended') {
                        ctx.resume().then(function() {
                            statusEl.textContent = '🔊 звук активен';
                            statusEl.classList.remove('err');
                        }, function(err) {
                            statusEl.textContent = '❌ Браузер блокирует звук';
                            statusEl.classList.add('err');
                            console.error('resume failed:', err);
                        });
                    } else {
                        statusEl.textContent = '🔊 звук активен';
                        statusEl.classList.remove('err');
                    }

                    if (state.isPlaying) {
                        // Пауза
                        pause();
                        btn.textContent = '▶';
                        btn.classList.remove('playing');
                        var p = getCurrentPosition();
                        progressFill.style.width = (p / state.totalDur * 100) + '%';
                        timecode.textContent = fmt(p) + ' / ' + fmt(state.totalDur);
                    } else {
                        // Play (с текущей позиции)
                        playFromPosition(state.position);
                        btn.textContent = '❚❚';
                        btn.classList.add('playing');
                    }
                };

                // ============ STOP ============
                stopBtn.onclick = function() {
                    stop();
                    btn.textContent = '▶';
                    btn.classList.remove('playing');
                    progressFill.style.width = '0%';
                    timecode.textContent = '0:00 / ' + fmt(state.totalDur);
                    var active = lyrics.querySelectorAll('.gimn-line-active');
                    for (var i = 0; i < active.length; i++) active[i].classList.remove('gimn-line-active');
                };

                // ============ ПЕРЕМОТКА ============
                function seekFromEvent(e) {
                    var rect = progressBg.getBoundingClientRect();
                    var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
                    var ratio = Math.max(0, Math.min(1, x / rect.width));
                    var newPos = ratio * state.totalDur;

                    if (state.isPlaying) {
                        // Перезапуск с новой позиции
                        playFromPosition(newPos);
                    } else {
                        state.position = newPos;
                    }
                    progressFill.style.width = (ratio * 100) + '%';
                    timecode.textContent = fmt(newPos) + ' / ' + fmt(state.totalDur);
                }

                progressBg.addEventListener('click', seekFromEvent);
                progressBg.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    seekFromEvent(e);
                }, { passive: false });

                // ============ АНИМАЦИЯ ============
                function tick() {
                    if (state.isPlaying && audioCtx) {
                        var elapsed = state.startOffset + (audioCtx.currentTime - state.startCtxTime);

                        if (elapsed >= state.totalDur + 1.5) {
                            stop();
                            btn.textContent = '▶';
                            btn.classList.remove('playing');
                            progressFill.style.width = '0%';
                            timecode.textContent = '0:00 / ' + fmt(state.totalDur);
                        } else {
                            progressFill.style.width = Math.min(100, (elapsed / state.totalDur) * 100) + '%';
                            timecode.textContent = fmt(Math.max(0, elapsed)) + ' / ' + fmt(state.totalDur);

                            // Подсветка строк
                            var lines = lyrics.querySelectorAll('[data-t]');
                            for (var li = 0; li < lines.length; li++) {
                                var lineT = parseFloat(lines[li].getAttribute('data-t'));
                                var nextT = li + 1 < lines.length
                                    ? parseFloat(lines[li + 1].getAttribute('data-t'))
                                    : state.totalDur;
                                if (elapsed >= lineT && elapsed < nextT) {
                                    lines[li].classList.add('gimn-line-active');
                                } else {
                                    lines[li].classList.remove('gimn-line-active');
                                }
                            }
                        }
                    }
                    setTimeout(tick, 100);
                }
                tick();
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

    console.log('🎼 gimn-player VIP v4 — перемотка + пауза + стоп');
})();
