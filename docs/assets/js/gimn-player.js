// ============================================================
// gimn-player.js — v5 VIP «12 гимнов королевств»
// Плеер поддерживает все 12 гимнов + переключение + память
// - window.GIMN_ANTHEMS — словарь гимнов (по имени королевства)
// - window.GIMN_DATA — fallback (1 гимн, для совместимости)
// - Чипы-королевства, авто-выбор из профиля, память
// - Перемотка, пауза, стоп
// - Публичное API: window.marsGimn.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsGimnLoaded) return;
    window.__marsGimnLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var LAST_KINGDOM_KEY = 'mars_last_gimn_kingdom';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🎼 gimn:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 🏰 Королевства — цвета и иконки
    // ============================================================
    var KINGDOMS = {
        'Кимерия':    { color: '#B19CD9', emoji: '🔮' },
        'Аркадия':    { color: '#D4A574', emoji: '🏛️' },
        'Ксанф':      { color: '#5D5D5D', emoji: '⚓' },
        'Эдем':       { color: '#F4A460', emoji: '🌅' },
        'Эридания':   { color: '#F5D76E', emoji: '✨' },
        'Кхонг':      { color: '#A9A9A9', emoji: '🗡️' },
        'Авсония':    { color: '#87CEEB', emoji: '🌊' },
        'Серпентида': { color: '#E57373', emoji: '🐍' },
        'Эритрей':    { color: '#64B5F6', emoji: '💧' },
        'Утопия':     { color: '#4DD0E1', emoji: '🌌' },
        'Эллада':     { color: '#FF8A65', emoji: '⚡' },
        'Аливасото':  { color: '#81C784', emoji: '🌿' }
    };

    var KINGDOM_ORDER = [
        'Кимерия', 'Аркадия', 'Ксанф', 'Эдем', 'Эридания', 'Кхонг',
        'Авсония', 'Серпентида', 'Эритрей', 'Утопия', 'Эллада', 'Аливасото'
    ];

    // ============================================================
    // 🎵 Аудио-движок
    // ============================================================
    var audioCtx = null;
    var masterBus = null;
    var scheduledNodes = [];

    var state = {
        currentKingdom: null,
        isPlaying: false,
        isPaused: false,
        position: 0,
        startCtxTime: 0,
        startOffset: 0,
        totalDur: 213
    };

    function getOrCreateCtx() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                log('AudioContext создан, state =', audioCtx.state);
            } catch(e) {
                log('AudioContext error:', e.message);
                return null;
            }
        }
        return audioCtx;
    }

    function midiToFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    function createMasterBus(ctx) {
        var master = ctx.createGain();
        master.gain.value = 0.75;
        master.connect(ctx.destination);

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

        return master;
    }

    var INSTR = {
        bass: {
            oscs: [{ type: 'sawtooth', detune: -7 }, { type: 'sawtooth', detune: 0 }, { type: 'sawtooth', detune: 7 }],
            cutoff: 900, attack: 0.15, release: 1.2, gain: 0.5,
            vibrato: { rate: 4.5, depth: 6 },
            formants: [400, 800, 1800]
        },
        tenor: {
            oscs: [{ type: 'sawtooth', detune: -6 }, { type: 'sawtooth', detune: 0 }, { type: 'sawtooth', detune: 6 }],
            cutoff: 1600, attack: 0.12, release: 1.0, gain: 0.5,
            vibrato: { rate: 5.0, depth: 5 },
            formants: [600, 1100, 2400]
        },
        strings: {
            oscs: [{ type: 'sawtooth', detune: -4 }, { type: 'sawtooth', detune: 4 }],
            cutoff: 2800, attack: 0.18, release: 1.3, gain: 0.45,
            vibrato: { rate: 5.2, depth: 4 }
        },
        flute: {
            oscs: [{ type: 'sine', detune: 0 }, { type: 'triangle', detune: 0 }],
            cutoff: 3200, attack: 0.1, release: 0.9, gain: 0.55,
            vibrato: { rate: 5.5, depth: 3 }
        }
    };

    function pickInstrument(midi) {
        if (midi < 55) return INSTR.bass;
        if (midi < 72) return INSTR.tenor;
        if (midi < 80) return INSTR.strings;
        return INSTR.flute;
    }

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

    function stopAllNodes() {
        for (var i = 0; i < scheduledNodes.length; i++) {
            try { scheduledNodes[i].stop(); } catch(e) {}
            try { scheduledNodes[i].disconnect(); } catch(e) {}
        }
        scheduledNodes = [];
    }

    // ============================================================
    // 🎼 ДОСТУП К ДАННЫМ ГИМНОВ
    // ============================================================
    function getAllAnthems() {
        // Новый формат — словарь по королевствам
        if (window.GIMN_ANTHEMS && typeof window.GIMN_ANTHEMS === 'object') {
            return window.GIMN_ANTHEMS;
        }
        // Старый формат — один гимн, оборачиваем в Кимерию
        if (window.GIMN_DATA && typeof window.GIMN_DATA === 'object') {
            return { 'Кимерия': window.GIMN_DATA };
        }
        return {};
    }

    function getAnthem(kingdom) {
        var all = getAllAnthems();
        return all[kingdom] || null;
    }

    function getAvailableKingdoms() {
        var all = getAllAnthems();
        return KINGDOM_ORDER.filter(function(k) { return !!all[k]; });
    }

    // ============================================================
    // 💾 Память последнего гимна
    // ============================================================
    function getSavedKingdom() {
        try { return localStorage.getItem(LAST_KINGDOM_KEY); } catch(e) { return null; }
    }
    function saveKingdom(k) {
        try { localStorage.setItem(LAST_KINGDOM_KEY, k); } catch(e) {}
    }

    // ============================================================
    // 👤 Королевство пользователя из профиля
    // ============================================================
    function getUserKingdom() {
        // Из marsSession
        if (window.marsSession && window.marsSession.profile && window.marsSession.profile.kingdom) {
            return window.marsSession.profile.kingdom;
        }
        // Из кэша профиля
        try {
            var cached = localStorage.getItem('mars-profile-cache');
            if (cached) {
                var c = JSON.parse(cached);
                if (c && c.profile && c.profile.kingdom) return c.profile.kingdom;
            }
        } catch(e) {}
        return null;
    }

    // ============================================================
    // 🎯 Какой гимн выбрать по умолчанию
    // ============================================================
    function pickDefaultKingdom() {
        var available = getAvailableKingdoms();
        if (!available.length) return null;

        // 1. Из профиля
        var userK = getUserKingdom();
        if (userK && available.indexOf(userK) !== -1) return userK;

        // 2. Последний слушанный
        var saved = getSavedKingdom();
        if (saved && available.indexOf(saved) !== -1) return saved;

        // 3. Кимерия — дефолт
        if (available.indexOf('Кимерия') !== -1) return 'Кимерия';

        // 4. Первый доступный
        return available[0];
    }

    // ============================================================
    // ▶ ВОСПРОИЗВЕДЕНИЕ
    // ============================================================
    function playFromPosition(fromSec) {
        var ctx = getOrCreateCtx();
        if (!ctx) return;

        var kingdom = state.currentKingdom;
        if (!kingdom) {
            log('не выбрано королевство');
            return;
        }

        var data = getAnthem(kingdom);
        if (!data) {
            log('нет данных для', kingdom);
            return;
        }

        log('playFromPosition', kingdom, 'ctx:', ctx.state, 'from:', fromSec);

        if (!masterBus) masterBus = createMasterBus(ctx);

        stopAllNodes();

        var t0 = ctx.currentTime + 0.15;
        state.startCtxTime = t0;
        state.startOffset = fromSec;
        state.totalDur = data.duration || 213;

        // Тестовый колокол — только при первом старте с 0
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

        // Планируем ноты
        var notes = (data.notes || []).slice().sort(function(a, b) { return a[1] - b[1]; });
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
                var timeIntoNote = fromSec - noteStart;
                if (timeIntoNote >= noteDur) continue;
                var adjDur = noteDur - timeIntoNote;
                playNote(ctx, masterBus, midi, t0, adjDur, vel, inst);
                scheduled++;
            } else {
                playNote(ctx, masterBus, midi, t0 + (noteStart - fromSec), noteDur, vel, inst);
                scheduled++;
            }
        }

        log('запланировано нот:', scheduled, 'для', kingdom);
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
        log('пауза на', state.position.toFixed(1));
    }

    function stop() {
        stopAllNodes();
        state.position = 0;
        state.isPlaying = false;
        state.isPaused = false;
        log('стоп');
    }

    function getCurrentPosition() {
        if (state.isPlaying && audioCtx) {
            return Math.min(state.totalDur,
                state.startOffset + (audioCtx.currentTime - state.startCtxTime));
        }
        return state.position;
    }

    function fmt(sec) {
        var m = Math.floor(sec / 60);
        var s = Math.floor(sec % 60);
        if (s < 10) s = '0' + s;
        return m + ':' + s;
    }

    // ============================================================
    // 🔄 СМЕНА ГИМНА
    // ============================================================
    function switchKingdom(kingdom, ui, autoPlay) {
        var data = getAnthem(kingdom);
        if (!data) return false;

        // Останавливаем текущий
        stop();

        state.currentKingdom = kingdom;
        state.totalDur = data.duration || 213;
        saveKingdom(kingdom);

        // Обновляем UI если передан
        if (ui) {
            ui.title.textContent = data.title || ('Гимн ' + kingdom);
            ui.subtitle.textContent = data.subtitle || '';
            ui.timecode.textContent = '0:00 / ' + fmt(state.totalDur);
            ui.progress.style.width = '0%';

            // Сброс активных строк
            var activeLines = ui.lyrics.querySelectorAll('.gimn-line-active');
            for (var i = 0; i < activeLines.length; i++) {
                activeLines[i].classList.remove('gimn-line-active');
            }

            // Перерендер текста песни
            ui.lyrics.innerHTML = '';
            (data.lyrics || []).forEach(function(line) {
                var el = document.createElement('div');
                el.className = 'gimn-line';
                el.setAttribute('data-t', line.time);
                el.textContent = line.text;
                ui.lyrics.appendChild(el);
            });

            // Кнопка play
            ui.btn.textContent = '▶';
            ui.btn.classList.remove('playing');

            // Подсветка чипа
            ui.root.querySelectorAll('.gimn-chip').forEach(function(chip) {
                var isActive = chip.dataset.kingdom === kingdom;
                chip.classList.toggle('active', isActive);
                if (isActive) {
                    var meta = KINGDOMS[kingdom] || {};
                    chip.style.background = 'linear-gradient(135deg, ' + (meta.color || '#6C63FF') + ', ' + (meta.color || '#6C63FF') + '99)';
                    chip.style.color = '#fff';
                    chip.style.borderColor = meta.color || '#6C63FF';
                } else {
                    chip.style.background = '';
                    chip.style.color = '';
                    chip.style.borderColor = '';
                }
            });
        }

        log('сменили на', kingdom);

        // Автовоспроизведение если просили
        if (autoPlay) {
            playFromPosition(0);
            if (ui) {
                ui.btn.textContent = '❚❚';
                ui.btn.classList.add('playing');
            }
        }

        return true;
    }

    // ============================================================
    // 🎨 UI
    // ============================================================
    function injectStyles() {
        if (document.getElementById('gimn-style')) return;
        var style = document.createElement('style');
        style.id = 'gimn-style';
        style.textContent = `
            .gimn-root { margin: 12px 0; padding: 14px; background: linear-gradient(135deg, #dce8ef 0%, #b8ced9 100%); border: 1px solid #8daebf; border-radius: 12px; box-shadow: 0 4px 14px rgba(26,58,74,0.15); font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box; }
            .gimn-title { font-size: 1.1rem; font-weight: 800; color: #1a3a4a; text-align: center; margin: 0 0 2px; }
            .gimn-subtitle { font-size: 0.72rem; color: #4a7db5; text-align: center; margin: 0 0 10px; }
            .gimn-status { font-size: 0.68rem; color: #1f7a4a; text-align: center; margin-bottom: 8px; font-weight: 600; }
            .gimn-status.err { color: #b03a3a; }
            .gimn-controls { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
            .gimn-play, .gimn-stopbtn { width: 42px; height: 42px; flex-shrink: 0; border-radius: 50%; border: none; cursor: pointer; background: linear-gradient(135deg, #3a6d9f 0%, #16304a 100%); color: #fff; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(22,48,74,0.5); }
            .gimn-stopbtn { width: 36px; height: 36px; font-size: 12px; background: linear-gradient(135deg, #8a3030 0%, #3a0d0d 100%); }
            .gimn-play:active, .gimn-stopbtn:active { transform: scale(0.95); }
            .gimn-play.playing { background: linear-gradient(135deg, #2a7ab8 0%, #0d2a3a 100%); }
            .gimn-bar { flex: 1; min-width: 0; }
            .gimn-progress-bg { height: 8px; background: rgba(26,58,74,0.15); border-radius: 4px; overflow: hidden; cursor: pointer; user-select: none; }
            .gimn-progress-bg:hover { background: rgba(26,58,74,0.25); }
            .gimn-progress { height: 100%; width: 0%; background: linear-gradient(90deg, #4a7db5, #1a3a4a); border-radius: 4px; pointer-events: none; transition: width 0.1s linear; }
            .gimn-time { font-size: 0.7rem; color: #1a3a4a; margin-top: 4px; font-variant-numeric: tabular-nums; }
            .gimn-lyrics { max-height: 260px; overflow-y: auto; padding: 10px; background: rgba(255,255,255,0.4); border-radius: 8px; border: 1px solid rgba(141,174,191,0.5); }
            .gimn-line { padding: 5px 8px; margin: 2px 0; border-radius: 5px; color: #2a4a5a; font-size: 0.85rem; opacity: 0.55; line-height: 1.35; transition: all 0.3s; }
            .gimn-line.gimn-line-active { background: rgba(74,125,181,0.2); color: #0d2a3a; font-weight: 700; opacity: 1; }
            .gimn-compact { padding: 10px 8px; }
            .gimn-compact .gimn-title { font-size: 0.9rem; }
            .gimn-compact .gimn-subtitle { font-size: 0.65rem; }
            .gimn-compact .gimn-status { font-size: 0.6rem; }
            .gimn-compact .gimn-play { width: 36px; height: 36px; font-size: 12px; }
            .gimn-compact .gimn-stopbtn { width: 30px; height: 30px; font-size: 10px; }
            .gimn-compact .gimn-lyrics { max-height: 180px; padding: 8px; }
            .gimn-compact .gimn-line { font-size: 0.75rem; }

            /* Чипы королевств */
            .gimn-chips {
                display: flex;
                gap: 6px;
                margin-bottom: 12px;
                overflow-x: auto;
                padding: 4px 2px 8px;
                scrollbar-width: thin;
                -webkit-overflow-scrolling: touch;
            }
            .gimn-chips::-webkit-scrollbar { height: 4px; }
            .gimn-chips::-webkit-scrollbar-thumb { background: rgba(74,125,181,0.4); border-radius: 2px; }
            .gimn-chips::-webkit-scrollbar-track { background: transparent; }

            .gimn-chip {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 6px 12px;
                border-radius: 18px;
                border: 1.5px solid rgba(26,58,74,0.2);
                background: rgba(255,255,255,0.5);
                color: #2a4a5a;
                font-size: 0.78rem;
                font-weight: 700;
                cursor: pointer;
                white-space: nowrap;
                font-family: inherit;
                transition: all 0.25s cubic-bezier(.16,1,.3,1);
                -webkit-tap-highlight-color: transparent;
                flex-shrink: 0;
            }
            .gimn-chip:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 14px rgba(26,58,74,0.15);
                border-color: rgba(26,58,74,0.4);
            }
            .gimn-chip:active { transform: translateY(0) scale(0.97); }
            .gimn-chip.active {
                box-shadow: 0 6px 16px rgba(0,0,0,0.2);
                transform: translateY(-1px);
            }
            .gimn-chip.disabled {
                opacity: 0.4;
                cursor: not-allowed;
                pointer-events: none;
            }

            /* Тёмная тема */
            body.mars-stars-on .gimn-root {
                background: linear-gradient(135deg, #1e2a3a 0%, #16202e 100%);
                border-color: rgba(108,99,255,0.3);
            }
            body.mars-stars-on .gimn-title { color: #e0e0ee; }
            body.mars-stars-on .gimn-subtitle { color: #A29BFE; }
            body.mars-stars-on .gimn-lyrics { background: rgba(255,255,255,0.05); border-color: rgba(162,155,254,0.3); }
            body.mars-stars-on .gimn-line { color: #b8b8d0; }
            body.mars-stars-on .gimn-line.gimn-line-active { background: rgba(108,99,255,0.25); color: #fff; }
            body.mars-stars-on .gimn-chip {
                background: rgba(255,255,255,0.08);
                color: #d0d0e8;
                border-color: rgba(162,155,254,0.3);
            }
            body.mars-stars-on .gimn-chip.active { color: #fff; }
            body.mars-stars-on .gimn-time { color: #d0d0e8; }
            body.mars-stars-on .gimn-progress-bg { background: rgba(255,255,255,0.12); }

            /* Мобильный */
            @media (max-width: 600px) {
                .gimn-chips { gap: 5px; }
                .gimn-chip { padding: 5px 10px; font-size: 0.72rem; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🔨 Построение UI для одного контейнера
    // ============================================================
    function buildPlayer(root) {
        var available = getAvailableKingdoms();
        if (!available.length) {
            log('нет доступных гимнов');
            return;
        }

        root.dataset.built = '1';
        root.classList.add('gimn-root');
        if (root.closest('.infobox') || root.offsetWidth < 400) {
            root.classList.add('gimn-compact');
        }

        // Стартовое королевство
        var initialKingdom = pickDefaultKingdom();
        var initialData = getAnthem(initialKingdom);
        if (!initialData) return;

        var html = '';

        // Чипы королевств (только если больше одного)
        if (available.length > 1) {
            html += '<div class="gimn-chips">';
            for (var i = 0; i < available.length; i++) {
                var k = available[i];
                var meta = KINGDOMS[k] || { emoji: '🏰', color: '#6C63FF' };
                var isActive = k === initialKingdom;
                html += '<button type="button" class="gimn-chip' + (isActive ? ' active' : '') +
                    '" data-kingdom="' + k + '">' +
                    '<span>' + meta.emoji + '</span>' +
                    '<span>' + k + '</span>' +
                    '</button>';
            }
            html += '</div>';
        }

        html += '<div class="gimn-title">' + (initialData.title || ('Гимн ' + initialKingdom)) + '</div>';
        html += '<div class="gimn-subtitle">' + (initialData.subtitle || '') + '</div>';
        html += '<div class="gimn-status">🔊 проверка звука...</div>';
        html += '<div class="gimn-controls">';
        html +=   '<button class="gimn-play" aria-label="Play">▶</button>';
        html +=   '<button class="gimn-stopbtn" aria-label="Stop">⏹</button>';
        html +=   '<div class="gimn-bar">';
        html +=     '<div class="gimn-progress-bg"><div class="gimn-progress"></div></div>';
        html +=     '<div class="gimn-time">0:00 / ' + fmt(initialData.duration) + '</div>';
        html +=   '</div>';
        html += '</div>';
        html += '<div class="gimn-lyrics"></div>';

        root.innerHTML = html;

        // Ссылки на элементы
        var btn = root.querySelector('.gimn-play');
        var stopBtn = root.querySelector('.gimn-stopbtn');
        var progressBg = root.querySelector('.gimn-progress-bg');
        var progressFill = root.querySelector('.gimn-progress');
        var timecode = root.querySelector('.gimn-time');
        var lyrics = root.querySelector('.gimn-lyrics');
        var statusEl = root.querySelector('.gimn-status');
        var titleEl = root.querySelector('.gimn-title');
        var subtitleEl = root.querySelector('.gimn-subtitle');

        var ui = {
            root: root,
            title: titleEl,
            subtitle: subtitleEl,
            btn: btn,
            stopBtn: stopBtn,
            progressBg: progressBg,
            progress: progressFill,
            timecode: timecode,
            lyrics: lyrics,
            status: statusEl
        };

        // Наполняем lyrics
        (initialData.lyrics || []).forEach(function(line) {
            var el = document.createElement('div');
            el.className = 'gimn-line';
            el.setAttribute('data-t', line.time);
            el.textContent = line.text;
            lyrics.appendChild(el);
        });

        // Устанавливаем стартовое состояние
        state.currentKingdom = initialKingdom;
        state.totalDur = initialData.duration || 213;
        saveKingdom(initialKingdom);

        // Красим активный чип
        if (available.length > 1) {
            var activeChip = root.querySelector('.gimn-chip.active');
            if (activeChip) {
                var meta = KINGDOMS[initialKingdom] || {};
                activeChip.style.background = 'linear-gradient(135deg, ' + (meta.color || '#6C63FF') + ', ' + (meta.color || '#6C63FF') + '99)';
                activeChip.style.color = '#fff';
                activeChip.style.borderColor = meta.color || '#6C63FF';
            }

            // Обработчики чипов
            root.querySelectorAll('.gimn-chip').forEach(function(chip) {
                chip.addEventListener('click', function() {
                    var kingdom = chip.dataset.kingdom;
                    if (kingdom === state.currentKingdom) return;

                    // Разблокируем аудио
                    var ctx = getOrCreateCtx();
                    if (ctx && ctx.state === 'suspended') {
                        ctx.resume().catch(function(){});
                    }

                    switchKingdom(kingdom, ui, false);
                });
            });
        }

        // Play / Pause
        btn.onclick = function() {
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
                }, function() {
                    statusEl.textContent = '❌ Браузер блокирует звук';
                    statusEl.classList.add('err');
                });
            } else {
                statusEl.textContent = '🔊 звук активен';
                statusEl.classList.remove('err');
            }

            if (state.isPlaying) {
                pause();
                btn.textContent = '▶';
                btn.classList.remove('playing');
                var p = getCurrentPosition();
                progressFill.style.width = (p / state.totalDur * 100) + '%';
                timecode.textContent = fmt(p) + ' / ' + fmt(state.totalDur);
            } else {
                playFromPosition(state.position);
                btn.textContent = '❚❚';
                btn.classList.add('playing');
            }
        };

        // Stop
        stopBtn.onclick = function() {
            stop();
            btn.textContent = '▶';
            btn.classList.remove('playing');
            progressFill.style.width = '0%';
            timecode.textContent = '0:00 / ' + fmt(state.totalDur);
            var active = lyrics.querySelectorAll('.gimn-line-active');
            for (var i = 0; i < active.length; i++) {
                active[i].classList.remove('gimn-line-active');
            }
        };

        // Перемотка
        function seekFromEvent(e) {
            var rect = progressBg.getBoundingClientRect();
            var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            var ratio = Math.max(0, Math.min(1, x / rect.width));
            var newPos = ratio * state.totalDur;

            if (state.isPlaying) {
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

        // Тикер
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
    }

    // ============================================================
    // 🔍 Поиск контейнеров
    // ============================================================
    function findContainers() {
        var list = [];
        // Новый формат — [data-gimn]
        document.querySelectorAll('[data-gimn]:not([data-built])').forEach(function(el) {
            list.push(el);
        });
        // Старый формат — [id^="gimn-"]
        document.querySelectorAll('[id^="gimn-"]:not([data-built])').forEach(function(el) {
            // Пропускаем style / script
            if (el.tagName === 'STYLE' || el.tagName === 'SCRIPT') return;
            // Пропускаем уже встроенные элементы плеера
            if (el.id === 'gimn-style') return;
            if (list.indexOf(el) === -1) list.push(el);
        });
        return list;
    }

    function buildAll() {
        var containers = findContainers();
        if (!containers.length) return;
        injectStyles();
        for (var i = 0; i < containers.length; i++) {
            try {
                buildPlayer(containers[i]);
            } catch(e) {
                log('buildPlayer error:', e.message);
            }
        }
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildAll);
    } else {
        buildAll();
    }
    setTimeout(buildAll, 500);
    setTimeout(buildAll, 1500);

    // SPA
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                setTimeout(buildAll, 200);
            });
        } catch(e) {}
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsGimn = {
        build: buildAll,
        getAvailable: getAvailableKingdoms,
        play: function(kingdom) {
            var ui = null;
            var root = document.querySelector('.gimn-root');
            if (root) {
                ui = {
                    root: root,
                    title: root.querySelector('.gimn-title'),
                    subtitle: root.querySelector('.gimn-subtitle'),
                    btn: root.querySelector('.gimn-play'),
                    progress: root.querySelector('.gimn-progress'),
                    timecode: root.querySelector('.gimn-time'),
                    lyrics: root.querySelector('.gimn-lyrics'),
                    status: root.querySelector('.gimn-status')
                };
            }
            if (kingdom) {
                switchKingdom(kingdom, ui, true);
            } else {
                playFromPosition(0);
                if (ui && ui.btn) { ui.btn.textContent = '❚❚'; ui.btn.classList.add('playing'); }
            }
        },
        pause: pause,
        stop: function() {
            stop();
            var root = document.querySelector('.gimn-root');
            if (root) {
                var b = root.querySelector('.gimn-play');
                if (b) { b.textContent = '▶'; b.classList.remove('playing'); }
                var p = root.querySelector('.gimn-progress');
                if (p) p.style.width = '0%';
                var t = root.querySelector('.gimn-time');
                if (t) t.textContent = '0:00 / ' + fmt(state.totalDur);
            }
        },
        switchKingdom: function(k) {
            var root = document.querySelector('.gimn-root');
            if (!root) return false;
            var ui = {
                root: root,
                title: root.querySelector('.gimn-title'),
                subtitle: root.querySelector('.gimn-subtitle'),
                btn: root.querySelector('.gimn-play'),
                progress: root.querySelector('.gimn-progress'),
                timecode: root.querySelector('.gimn-time'),
                lyrics: root.querySelector('.gimn-lyrics'),
                status: root.querySelector('.gimn-status')
            };
            return switchKingdom(k, ui, false);
        },
        getState: function() {
            return {
                kingdom: state.currentKingdom,
                playing: state.isPlaying,
                paused: state.isPaused,
                position: getCurrentPosition(),
                totalDur: state.totalDur
            };
        },
        KINGDOMS: KINGDOMS
    };

    log('v5 VIP загружен, доступно гимнов:', getAvailableKingdoms().length);
})();
