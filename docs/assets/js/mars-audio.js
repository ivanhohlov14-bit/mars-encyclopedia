// ============================================================
// mars-audio.js — плеер для статей с реверберацией
// ============================================================

(function() {
    'use strict';

    var ctx = null;
    var reverbNode = null;

    // ============================================================
    // 🔧 WEB AUDIO: контекст + процедурная реверберация
    // ============================================================
    function getCtx() {
        if (ctx) return ctx;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();

            // Генерируем impulse response для конволюционного реверба
            var rate = ctx.sampleRate;
            var length = rate * 1.6;
            var impulse = ctx.createBuffer(2, length, rate);
            for (var c = 0; c < 2; c++) {
                var ch = impulse.getChannelData(c);
                for (var i = 0; i < length; i++) {
                    // Затухающий шум — дает эффект «большого пространства»
                    ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
                }
            }

            reverbNode = ctx.createConvolver();
            reverbNode.buffer = impulse;

            var wet = ctx.createGain();
            wet.gain.value = 0.3; // Громкость реверба
            reverbNode.connect(wet);
            wet.connect(ctx.destination);
        } catch (e) {
            console.warn('Web Audio не поддерживается');
        }
        return ctx;
    }

    // ============================================================
    // 🎧 ПОДКЛЮЧЕНИЕ РЕВЕРБА
    // ============================================================
    function connectReverb(audio) {
        try {
            var c = getCtx();
            if (!c || !reverbNode) return false;

            var source = c.createMediaElementSource(audio);

            // Dry (сухой) сигнал
            var dry = c.createGain();
            dry.gain.value = 0.75;

            // Фильтр высоких частот — «тонкая атмосфера Марса»
            var filter = c.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 80;

            source.connect(filter);
            filter.connect(dry);
            dry.connect(c.destination);

            // Wet (мокрый) сигнал в реверб
            filter.connect(reverbNode);

            return true;
        } catch (e) {
            return false;
        }
    }

    // ============================================================
    // ⏱️ ФОРМАТ ВРЕМЕНИ
    // ============================================================
    function fmt(s) {
        s = Math.floor(s || 0);
        var m = Math.floor(s / 60);
        var sec = s % 60;
        return m + ':' + (sec < 10 ? '0' + sec : sec);
    }

    // ============================================================
    // 🎵 ИНИЦИАЛИЗАЦИЯ ОДНОГО ПЛЕЕРА
    // ============================================================
    function initPlayer(el) {
        if (el.dataset.ready === '1') return;
        el.dataset.ready = '1';

        var src = el.dataset.src;
        var title = el.dataset.title || 'Звук Марса';
        var caption = el.dataset.caption || 'Реальные записи NASA, обработанные с эффектом реверберации';
        var loop = el.dataset.loop !== 'false';
        var theme = el.dataset.theme || '';

        var audio = new Audio();
        audio.src = src;
        audio.loop = loop;
        audio.preload = 'metadata';

        connectReverb(audio);

        el.className = 'mars-sound' + (theme ? ' mars-sound--' + theme : '');
        el.innerHTML =
            '<div class="mas-header">' +
                '<button class="mas-btn" aria-label="Play/Pause">' +
                    '<svg viewBox="0 0 24 24" width="16" height="16" class="mas-icon-play"><polygon points="6,4 20,12 6,20" fill="currentColor"/></svg>' +
                    '<svg viewBox="0 0 24 24" width="16" height="16" class="mas-icon-pause" style="display:none"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg>' +
                '</button>' +
                '<div class="mas-wave">' +
                    '<span></span><span></span><span></span><span></span><span></span>' +
                    '<span></span><span></span><span></span><span></span><span></span>' +
                '</div>' +
                '<div class="mas-info">' +
                    '<div class="mas-title">' + title + '</div>' +
                    '<div class="mas-time"><span class="mas-cur">0:00</span> / <span class="mas-dur">--:--</span></div>' +
                '</div>' +
            '</div>' +
            '<div class="mas-caption">' + caption + '</div>';

        var btn = el.querySelector('.mas-btn');
        var curEl = el.querySelector('.mas-cur');
        var durEl = el.querySelector('.mas-dur');
        var iconPlay = el.querySelector('.mas-icon-play');
        var iconPause = el.querySelector('.mas-icon-pause');

        audio.addEventListener('loadedmetadata', function() {
            if (isFinite(audio.duration)) durEl.textContent = fmt(audio.duration);
        });

        audio.addEventListener('timeupdate', function() {
            curEl.textContent = fmt(audio.currentTime);
        });

        audio.addEventListener('ended', function() {
            el.classList.remove('playing');
            iconPlay.style.display = '';
            iconPause.style.display = 'none';
        });

        audio.addEventListener('error', function() {
            el.classList.add('mars-sound--error');
            el.querySelector('.mas-title').textContent = title + ' (файл не найден)';
        });

        btn.addEventListener('click', function() {
            // Разблокировка AudioContext при клике
            var c = getCtx();
            if (c && c.state === 'suspended') c.resume();

            if (audio.paused) {
                var playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(function() {
                        el.classList.add('playing');
                        iconPlay.style.display = 'none';
                        iconPause.style.display = '';
                    }).catch(function(err) {
                        console.warn('🔇 Не удалось воспроизвести:', err.message);
                    });
                }
            } else {
                audio.pause();
                el.classList.remove('playing');
                iconPlay.style.display = '';
                iconPause.style.display = 'none';
            }
        });
    }

    // ============================================================
    // 🎨 СТИЛИ
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mas-styles')) return;
        var s = document.createElement('style');
        s.id = 'mas-styles';
        s.textContent = `
/* ==== ПЛЕЕР — базовый ==== */
.mars-sound {
    margin: 16px 0;
    padding: 14px 16px;
    background: rgba(108, 99, 255, 0.06);
    border: 1px solid rgba(108, 99, 255, 0.25);
    border-radius: 12px;
    font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    transition: background 0.3s, border-color 0.3s;
}
.mas-header {
    display: flex;
    align-items: center;
    gap: 12px;
}
.mas-btn {
    flex-shrink: 0;
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    border: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(108, 99, 255, 0.4);
    transition: transform 0.2s, box-shadow 0.2s;
    padding: 0;
}
.mas-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 18px rgba(108, 99, 255, 0.6);
}
.mas-btn:active {
    transform: scale(0.96);
}
.mas-wave {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 2px;
    height: 28px;
    width: 60px;
}
.mas-wave span {
    display: block;
    width: 3px;
    background: #A29BFE;
    border-radius: 2px;
    height: 20%;
    transition: height 0.3s, background 0.3s;
}
.mas-wave span:nth-child(1) { height: 30%; }
.mas-wave span:nth-child(2) { height: 70%; }
.mas-wave span:nth-child(3) { height: 100%; }
.mas-wave span:nth-child(4) { height: 50%; }
.mas-wave span:nth-child(5) { height: 80%; }
.mas-wave span:nth-child(6) { height: 40%; }
.mas-wave span:nth-child(7) { height: 90%; }
.mas-wave span:nth-child(8) { height: 60%; }
.mas-wave span:nth-child(9) { height: 25%; }
.mas-wave span:nth-child(10) { height: 55%; }

.mars-sound.playing .mas-wave span {
    animation: masWave 0.9s ease-in-out infinite;
}
.mars-sound.playing .mas-wave span:nth-child(1) { animation-delay: 0.00s; }
.mars-sound.playing .mas-wave span:nth-child(2) { animation-delay: 0.09s; }
.mars-sound.playing .mas-wave span:nth-child(3) { animation-delay: 0.18s; }
.mars-sound.playing .mas-wave span:nth-child(4) { animation-delay: 0.27s; }
.mars-sound.playing .mas-wave span:nth-child(5) { animation-delay: 0.36s; }
.mars-sound.playing .mas-wave span:nth-child(6) { animation-delay: 0.45s; }
.mars-sound.playing .mas-wave span:nth-child(7) { animation-delay: 0.54s; }
.mars-sound.playing .mas-wave span:nth-child(8) { animation-delay: 0.63s; }
.mars-sound.playing .mas-wave span:nth-child(9) { animation-delay: 0.72s; }
.mars-sound.playing .mas-wave span:nth-child(10) { animation-delay: 0.81s; }

@keyframes masWave {
    0%, 100% { height: 20%; }
    50% { height: 100%; }
}

.mas-info { flex: 1; min-width: 0; }
.mas-title {
    font-weight: 700;
    font-size: 0.92rem;
    color: #1a1a2e;
    line-height: 1.3;
}
.mas-time {
    font-size: 0.75rem;
    color: #888;
    margin-top: 2px;
    font-variant-numeric: tabular-nums;
}
.mas-caption {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed rgba(108, 99, 255, 0.25);
    font-size: 0.78rem;
    color: #666;
    font-style: italic;
    line-height: 1.5;
}

/* ==== СИНЯЯ ТЕМА — для инфобокса ==== */
.mars-sound--blue,
.mars-sound[data-theme="blue"] {
    margin: 0 0 8px 0;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.55);
    border: 1px solid #8daebf;
    border-radius: 6px;
    backdrop-filter: blur(4px);
}
.mars-sound--blue .mas-btn {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, #4a7db5, #6ba3d4);
    box-shadow: 0 2px 6px rgba(74, 125, 181, 0.4);
}
.mars-sound--blue .mas-btn svg { width: 14px; height: 14px; }
.mars-sound--blue .mas-wave { height: 22px; width: 46px; }
.mars-sound--blue .mas-wave span { background: #4a7db5; }
.mars-sound--blue .mas-title {
    font-size: 0.82rem;
    color: #1a3a4a;
}
.mars-sound--blue .mas-time {
    font-size: 0.68rem;
    color: #5a7a8a;
}
.mars-sound--blue .mas-caption {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed #8daebf;
    font-size: 0.68rem;
    color: #4a6a7a;
    line-height: 1.4;
}

/* ==== ОШИБКА ЗАГРУЗКИ ==== */
.mars-sound--error {
    opacity: 0.5;
}
.mars-sound--error .mas-btn {
    background: #999;
    cursor: not-allowed;
}

/* ==== ТЁМНАЯ ТЕМА ==== */
html body.mars-stars-on .mars-sound {
    background: rgba(108, 99, 255, 0.12);
    border-color: rgba(162, 155, 254, 0.4);
}
html body.mars-stars-on .mars-sound .mas-title { color: #e8e8f0; }
html body.mars-stars-on .mars-sound .mas-caption {
    color: #a0a0c0;
    border-top-color: rgba(162, 155, 254, 0.3);
}
html body.mars-stars-on .mars-sound--blue {
    background: rgba(30, 40, 60, 0.5) !important;
    border-color: rgba(100, 150, 200, 0.4);
}
html body.mars-stars-on .mars-sound--blue .mas-title { color: #c8dae8; }
html body.mars-stars-on .mars-sound--blue .mas-time { color: #8aa8c0; }
html body.mars-stars-on .mars-sound--blue .mas-caption {
    color: #a0c0d8;
    border-top-color: rgba(100, 150, 200, 0.4);
}
`;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    function initAll() {
        injectStyles();
        document.querySelectorAll('.mars-sound:not([data-ready])').forEach(initPlayer);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function() { setTimeout(initAll, 300); });
    }

    console.log('🎵 mars-audio: активен');
})();
