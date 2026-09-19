// ============================================================
// gimn-player.js — движок воспроизведения гимна
// Синтез через Web Audio API. Многоголосие.
// ============================================================
(function() {
    'use strict';

    var audioCtx = null;
    var isPlaying = false;
    var stopFlag = false;
    var activeNodes = [];
    var startTime = 0;
    var rafId = null;

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

    // ---- Синтез одной ноты ----
    function playNote(ctx, midi, startTime, dur, velocity, destination) {
        var freq = midiToFreq(midi);
        var t = startTime;

        // Два осциллятора для богатства звука (струнный тембр)
        var osc1 = ctx.createOscillator();
        var osc2 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        osc1.frequency.value = freq;
        osc2.frequency.value = freq * 2.003; // чуть расстроен для хора

        var filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = Math.max(400, freq * 6);
        filter.Q.value = 0.8;

        var gain = ctx.createGain();
        var peak = velocity * 0.18;

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(peak, t + 0.04);
        gain.gain.setValueAtTime(peak, t + Math.max(0.05, dur * 0.4));
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.15);

        var oscMix = ctx.createGain();
        oscMix.gain.value = 0.5;
        osc1.connect(oscMix);
        osc2.connect(oscMix);
        oscMix.connect(filter);
        filter.connect(gain);
        gain.connect(destination);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + dur + 0.2);
        osc2.stop(t + dur + 0.2);

        activeNodes.push(osc1, osc2);
    }

    // ---- Воспроизведение всего гимна ----
    function playGimn(ui) {
        var ctx = getAudioCtx();
        if (!ctx) return;

        var data = window.GIMN_DATA;
        if (!data) return;

        stopFlag = false;
        isPlaying = true;

        // Мастер-гейн + реверб
        var master = ctx.createGain();
        master.gain.value = 0.0001;

        var reverb = ctx.createConvolver();
        var reverbBuf = ctx.createBuffer(2, ctx.sampleRate * 3, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var d = reverbBuf.getChannelData(ch);
            for (var i = 0; i < d.length; i++) {
                d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.5);
            }
        }
        reverb.buffer = reverbBuf;
        var reverbGain = ctx.createGain();
        reverbGain.gain.value = 0.35;

        master.connect(reverb);
        reverb.connect(reverbGain);
        reverbGain.connect(ctx.destination);
        master.connect(ctx.destination);

        var t0 = ctx.currentTime + 0.15;
        startTime = t0;

        // Плавное появление
        master.gain.setValueAtTime(0.0001, t0);
        master.gain.exponentialRampToValueAtTime(0.9, t0 + 0.8);

        // Планируем все ноты
        for (var n = 0; n < data.notes.length; n++) {
            var note = data.notes[n];
            playNote(ctx, note[0], t0 + note[1], note[2], note[3], master);
        }

        // Плавное затухание в конце
        var totalDur = data.duration || 213;
        master.gain.setValueAtTime(0.9, t0 + totalDur - 2);
        master.gain.exponentialRampToValueAtTime(0.0001, t0 + totalDur);

        // Анимация и подсветка текста
        function tick() {
            if (stopFlag) return;
            var elapsed = ctx.currentTime - t0;

            if (ui && ui.progress) {
                var pct = Math.min(100, (elapsed / totalDur) * 100);
                ui.progress.style.width = pct + '%';
            }

            if (ui && ui.timecode) {
                ui.timecode.textContent = fmt(elapsed) + ' / ' + fmt(totalDur);
            }

            // Подсветка строки
            if (ui && ui.lyrics) {
                var lines = ui.lyrics.querySelectorAll('[data-t]');
                for (var li = 0; li < lines.length; li++) {
                    var lineT = parseFloat(lines[li].getAttribute('data-t'));
                    var nextT = li + 1 < lines.length
                        ? parseFloat(lines[li + 1].getAttribute('data-t'))
                        : totalDur;
                    if (elapsed >= lineT && elapsed < nextT) {
                        lines[li].classList.add('gimn-line-active');
                    } else {
                        lines[li].classList.remove('gimn-line-active');
                    }
                }
            }

            if (elapsed >= totalDur + 0.5) {
                stopGimn(ui);
                return;
            }
            rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);
    }

    function fmt(sec) {
        var m = Math.floor(sec / 60);
        var s = Math.floor(sec % 60);
        if (s < 10) s = '0' + s;
        return m + ':' + s;
    }

    function stopGimn(ui) {
        stopFlag = true;
        isPlaying = false;
        if (rafId) cancelAnimationFrame(rafId);
        activeNodes.forEach(function(n) { try { n.stop(); } catch(e) {} });
        activeNodes = [];
        if (audioCtx) {
            try { audioCtx.close(); } catch(e) {}
            audioCtx = null;
        }
        if (ui && ui.progress) ui.progress.style.width = '0%';
        if (ui && ui.timecode) ui.timecode.textContent = '0:00 / ' + fmt(window.GIMN_DATA.duration);
        if (ui && ui.lyrics) {
            ui.lyrics.querySelectorAll('.gimn-line-active').forEach(function(el) {
                el.classList.remove('gimn-line-active');
            });
        }
    }

    // ============================================================
    // UI
    // ============================================================
    function buildUI() {
        var root = document.getElementById('gimn-kimeria');
        if (!root || root.dataset.built === '1') return;
        root.dataset.built = '1';

        var data = window.GIMN_DATA;
        if (!data) return;

        // Стили
        var style = document.createElement('style');
        style.textContent = [
            '#gimn-kimeria {',
            '    max-width: 720px; margin: 24px auto; padding: 24px;',
            '    background: linear-gradient(135deg, #dce8ef 0%, #b8ced9 100%);',
            '    border: 1px solid #8daebf; border-radius: 16px;',
            '    box-shadow: 0 8px 28px rgba(26,58,74,0.18);',
            '    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
            '}',
            '.gimn-title { font-size: 1.6rem; font-weight: 800; color: #1a3a4a; text-align: center; margin: 0 0 4px; }',
            '.gimn-subtitle { font-size: 0.9rem; color: #4a7db5; text-align: center; margin: 0 0 20px; letter-spacing: 0.5px; }',
            '.gimn-controls { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }',
            '.gimn-play {',
            '    width: 60px; height: 60px; flex-shrink: 0;',
            '    border-radius: 50%; border: none; cursor: pointer;',
            '    background: linear-gradient(135deg, #3a6d9f 0%, #16304a 100%);',
            '    color: #fff; font-size: 20px;',
            '    display: inline-flex; align-items: center; justify-content: center;',
            '    box-shadow: 0 6px 18px rgba(22,48,74,0.5);',
            '    transition: transform 0.2s, box-shadow 0.2s;',
            '}',
            '.gimn-play:hover { transform: scale(1.06); box-shadow: 0 10px 24px rgba(22,48,74,0.65); }',
            '.gimn-play:active { transform: scale(0.96); }',
            '.gimn-play.playing { background: linear-gradient(135deg, #2a7ab8 0%, #0d2a3a 100%); animation: gimnPulse 2s ease-in-out infinite; }',
            '@keyframes gimnPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,125,181,0.7); } 50% { box-shadow: 0 0 0 12px rgba(74,125,181,0); } }',
            '.gimn-bar { flex: 1; }',
            '.gimn-progress-bg { height: 8px; background: rgba(26,58,74,0.15); border-radius: 4px; overflow: hidden; }',
            '.gimn-progress { height: 100%; width: 0%; background: linear-gradient(90deg, #4a7db5, #1a3a4a); border-radius: 4px; transition: width 0.15s linear; }',
            '.gimn-time { font-size: 0.78rem; color: #1a3a4a; margin-top: 6px; font-variant-numeric: tabular-nums; }',
            '.gimn-lyrics {',
            '    max-height: 340px; overflow-y: auto; padding: 16px;',
            '    background: rgba(255,255,255,0.4); border-radius: 10px;',
            '    border: 1px solid rgba(141,174,191,0.5);',
            '}',
            '.gimn-line { padding: 8px 12px; margin: 4px 0; border-radius: 6px; color: #2a4a5a; font-size: 1rem; transition: all 0.3s; opacity: 0.55; }',
            '.gimn-line.gimn-line-active { background: rgba(74,125,181,0.2); color: #0d2a3a; font-weight: 700; font-size: 1.08rem; opacity: 1; transform: translateX(6px); }'
        ].join('\n');
        document.head.appendChild(style);

        // Разметка
        var html = '';
        html += '<h2 class="gimn-title">' + data.title + '</h2>';
        html += '<p class="gimn-subtitle">' + data.subtitle + '</p>';
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
        var progress = root.querySelector('.gimn-progress');
        var timecode = root.querySelector('.gimn-time');
        var lyrics = root.querySelector('.gimn-lyrics');

        var ui = { progress: progress, timecode: timecode, lyrics: lyrics };

        btn.onclick = function() {
            if (isPlaying) {
                stopGimn(ui);
                btn.textContent = '▶';
                btn.classList.remove('playing');
            } else {
                btn.textContent = '❚❚';
                btn.classList.add('playing');
                playGimn(ui);
            }
        };
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

    console.log('🎼 gimn-player загружен — «Xōl ākha, Kimeria!»');
})();
