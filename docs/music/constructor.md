---
title: Конструктор марсианских мелодий
description: Создавайте мелодии из 7 нот (до, ре, ми, фа, соль, ля, си) с синтезированным звуком гуслей
---

# 🎵 Конструктор марсианских мелодий

<div id="mars-melody-app">
  <style>
    .mm-container {
      max-width: 900px;
      margin: 0 auto;
      background: #0d0d0d;
      color: #d4d4d4;
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid #2a2a3a;
      font-family: 'Segoe UI', 'Arial Unicode MS', sans-serif;
    }
    .mm-title {
      font-size: 1.8rem;
      color: #d4a0a0;
      margin-bottom: 1rem;
    }
    .mm-title small {
      font-size: 0.9rem;
      color: #888;
      display: block;
      font-weight: normal;
    }
    .mm-section {
      background: #14141e;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #2a2a3a;
    }
    .mm-section-title {
      font-size: 0.85rem;
      text-transform: uppercase;
      color: #8888aa;
      letter-spacing: 1px;
      margin-bottom: 0.75rem;
    }
    .mm-note-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      justify-content: center;
    }
    .mm-note-btn {
      background: #1e1e2e;
      border: 1px solid #3a3a4e;
      border-radius: 6px;
      padding: 0.5rem 0.8rem;
      cursor: pointer;
      color: #e0e0e0;
      font-size: 2rem;
      font-family: 'Segoe UI', 'Arial Unicode MS', sans-serif;
      transition: all 0.15s;
      min-width: 3.5rem;
      text-align: center;
    }
    .mm-note-btn:hover {
      background: #2a2a4a;
      border-color: #6a6a9a;
      transform: scale(1.05);
    }
    .mm-note-btn:active {
      transform: scale(0.95);
    }
    .mm-note-btn .mm-label {
      display: block;
      font-size: 0.55rem;
      color: #8888aa;
      margin-top: -0.2rem;
    }
    .mm-duration-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .mm-dur-btn {
      background: #1a1a2a;
      border: 1px solid #3a3a4e;
      border-radius: 4px;
      padding: 0.4rem 0.8rem;
      cursor: pointer;
      color: #aaa;
      font-size: 0.9rem;
      transition: all 0.15s;
    }
    .mm-dur-btn:hover {
      background: #2a2a4a;
      border-color: #6a6a9a;
      color: #fff;
    }
    .mm-dur-btn.active {
      background: #3a3a6a;
      border-color: #8a8aca;
      color: #fff;
    }
    .mm-dur-btn .mm-dur-symbol {
      font-size: 1.2rem;
      display: block;
    }
    .mm-editor {
      background: #0a0a12;
      border-radius: 6px;
      min-height: 80px;
      padding: 0.8rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
      align-items: center;
      border: 1px solid #2a2a3a;
    }
    .mm-editor-empty {
      color: #555;
      font-style: italic;
      width: 100%;
      text-align: center;
      padding: 1rem;
    }
    .mm-note-chip {
      background: #1a1a2e;
      border: 1px solid #3a3a4e;
      border-radius: 4px;
      padding: 0.2rem 0.6rem;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 1.6rem;
      cursor: pointer;
      transition: all 0.15s;
      animation: mmFadeIn 0.2s ease;
    }
    .mm-note-chip:hover {
      background: #2a1a2a;
      border-color: #8a4a4a;
    }
    .mm-note-chip .mm-chip-dur {
      font-size: 0.7rem;
      color: #8888aa;
    }
    .mm-note-chip .mm-chip-del {
      font-size: 0.7rem;
      color: #664444;
      margin-left: 0.2rem;
    }
    .mm-note-chip .mm-chip-del:hover {
      color: #cc6666;
    }
    .mm-note-chip .mm-chip-index {
      font-size: 0.55rem;
      color: #444466;
      margin-right: 0.1rem;
    }
    @keyframes mmFadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    .mm-controls {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .mm-btn {
      background: #1e1e3a;
      border: 1px solid #3a3a5e;
      border-radius: 6px;
      padding: 0.6rem 1.4rem;
      color: #d4d4e8;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.15s;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .mm-btn:hover {
      background: #2e2e5a;
      border-color: #6a6aaa;
    }
    .mm-btn:active {
      transform: scale(0.96);
    }
    .mm-btn.primary {
      background: #3a2a4a;
      border-color: #6a4a7a;
    }
    .mm-btn.primary:hover {
      background: #4a3a6a;
      border-color: #8a6aaa;
    }
    .mm-btn.danger {
      background: #3a1a1a;
      border-color: #6a3a3a;
    }
    .mm-btn.danger:hover {
      background: #4a2a2a;
      border-color: #8a4a4a;
    }
    .mm-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .mm-share-box {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .mm-share-box input {
      flex: 1;
      min-width: 200px;
      background: #0a0a12;
      border: 1px solid #2a2a3a;
      border-radius: 4px;
      padding: 0.5rem;
      color: #aaa;
      font-size: 0.8rem;
      outline: none;
    }
    .mm-share-box input:focus {
      border-color: #5a5a8a;
    }
    .mm-share-box .mm-btn {
      padding: 0.4rem 1rem;
      font-size: 0.85rem;
    }
    .mm-stats {
      font-size: 0.8rem;
      color: #666;
      text-align: center;
      margin-top: 0.5rem;
    }
    .mm-stats span {
      color: #8888aa;
    }
    @media (max-width: 600px) {
      .mm-note-btn {
        font-size: 1.6rem;
        min-width: 2.8rem;
        padding: 0.3rem 0.5rem;
      }
      .mm-note-btn .mm-label {
        font-size: 0.45rem;
      }
      .mm-note-chip {
        font-size: 1.2rem;
      }
      .mm-container {
        padding: 0.8rem;
      }
    }
  </style>

  <div class="mm-container">
    <div class="mm-title">
      🎵 Конструктор марсианских мелодий
      <small>Синтезированный звук, приближенный к гуслям</small>
    </div>

    <div class="mm-section">
      <div class="mm-section-title">🎵 Выбор ноты</div>
      <div class="mm-note-grid" id="mm-note-palette"></div>
    </div>

    <div class="mm-section">
      <div class="mm-section-title">⏱ Длительность</div>
      <div class="mm-duration-group" id="mm-duration-group"></div>
    </div>

    <div class="mm-section">
      <div class="mm-section-title">📝 Ваша мелодия</div>
      <div class="mm-editor" id="mm-editor">
        <div class="mm-editor-empty">Нажмите на ноту выше, чтобы добавить</div>
      </div>
    </div>

    <div class="mm-section">
      <div class="mm-controls">
        <button class="mm-btn primary" id="mm-play-btn">▶ Воспроизвести</button>
        <button class="mm-btn" id="mm-clear-btn">✖ Очистить</button>
        <button class="mm-btn" id="mm-undo-btn">↩ Отменить</button>
        <button class="mm-btn" id="mm-random-btn">🎲 Случайная</button>
      </div>
      <div class="mm-stats">Нот: <span id="mm-note-count">0</span> | Длительность: <span id="mm-total-dur">0</span> четвертей</div>
    </div>

    <div class="mm-section">
      <div class="mm-section-title">🔗 Поделиться</div>
      <div class="mm-share-box">
        <input type="text" id="mm-share-input" readonly placeholder="Ссылка появится после создания мелодии" />
        <button class="mm-btn" id="mm-copy-btn">📋 Копировать</button>
        <button class="mm-btn" id="mm-share-btn">🌐 Открыть</button>
      </div>
    </div>
  </div>
</div>

<script>
(function() {
  'use strict';

  // ============================================================
  // 1. НОТЫ: До, Ре, Ми, Фа, Соль, Ля, Си
  // ============================================================
  const NOTES = [
    { id: 0, symbol: 'Ὸ', name: 'До',   freq: 261.63 },
    { id: 1, symbol: 'ᵭ', name: 'Ре',   freq: 293.66 },
    { id: 2, symbol: 'ꝯ', name: 'Ми',   freq: 329.63 },
    { id: 3, symbol: 'Ꝼ', name: 'Фа',   freq: 349.23 },
    { id: 4, symbol: 'Ώ', name: 'Соль', freq: 392.00 },
    { id: 5, symbol: 'ꓥ', name: 'Ля',   freq: 440.00 },
    { id: 6, symbol: 'ⴡ', name: 'Си',   freq: 493.88 }
  ];

  const DURATIONS = [
    { value: 1,    symbol: '∩', label: 'Целая' },
    { value: 0.5,  symbol: '⌠', label: 'Половинная' },
    { value: 0.25, symbol: 'ך', label: 'Четвертная' },
    { value: 0.125,symbol: 'ꝺ', label: 'Восьмая' }
  ];

  // ============================================================
  // 2. СОСТОЯНИЕ
  // ============================================================
  let melody = [];
  let currentDuration = 0.25;
  let isPlaying = false;
  let audioCtx = null;

  const paletteEl = document.getElementById('mm-note-palette');
  const durGroupEl = document.getElementById('mm-duration-group');
  const editorEl = document.getElementById('mm-editor');
  const noteCountEl = document.getElementById('mm-note-count');
  const totalDurEl = document.getElementById('mm-total-dur');
  const shareInput = document.getElementById('mm-share-input');

  // ============================================================
  // 3. АКТИВАЦИЯ AUDIOCONTEXT
  // ============================================================
  function ensureAudioContext() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        console.log('✅ AudioContext создан');
      } catch (e) {
        console.error('❌ Ошибка создания AudioContext:', e);
        return null;
      }
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(e => console.warn('Не удалось возобновить контекст:', e));
    }
    return audioCtx;
  }

  // ============================================================
  // 4. УЛУЧШЕННЫЙ СИНТЕЗ ГУСЛЕЙ
  // ============================================================
  function playSynthesizedGusli(ctx, note, startTime, durationSec) {
    const output = ctx.createGain();
    output.connect(ctx.destination);

    // --- Основной тон ---
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = note.freq;

    // --- Обертон октава ---
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = note.freq * 2;
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.3;

    // --- Обертон квинта ---
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.value = note.freq * 1.5;
    const gain3 = ctx.createGain();
    gain3.gain.value = 0.15;

    // --- Шум атаки (имитация щипка) ---
    const bufferSize = ctx.sampleRate * 0.02;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // --- Огибающая основного тона (ADSR) ---
    const env1 = ctx.createGain();
    const attack = 0.005;
    const decay = 0.05;
    const sustain = 0.2;
    const release = durationSec * 0.7;
    env1.gain.setValueAtTime(0.001, startTime);
    env1.gain.linearRampToValueAtTime(0.5, startTime + attack);
    env1.gain.linearRampToValueAtTime(0.3, startTime + attack + decay);
    env1.gain.setValueAtTime(0.3, startTime + attack + decay);
    env1.gain.exponentialRampToValueAtTime(0.001, startTime + attack + decay + release);

    // --- Огибающая для обертонов ---
    const env2 = ctx.createGain();
    env2.gain.setValueAtTime(0.001, startTime);
    env2.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
    env2.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec * 0.5);

    // --- Огибающая для шума ---
    const envNoise = ctx.createGain();
    envNoise.gain.setValueAtTime(0.001, startTime);
    envNoise.gain.linearRampToValueAtTime(0.15, startTime + 0.01);
    envNoise.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

    // --- Фильтр с резонансом ---
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    filter.Q.value = 2.5;

    // --- Микшер ---
    const sum = ctx.createGain();
    osc1.connect(env1);
    env1.connect(sum);

    osc2.connect(gain2);
    gain2.connect(env2);
    env2.connect(sum);

    osc3.connect(gain3);
    gain3.connect(env2);
    // уже подключено к env2

    // --- Шум подмешиваем отдельно ---
    const noiseGain = ctx.createGain();
    noise.connect(envNoise);
    envNoise.connect(noiseGain);
    noiseGain.gain.value = 0.5;

    sum.connect(filter);
    filter.connect(output);
    noiseGain.connect(output);

    // --- Задержка (реверберация) ---
    const delay = ctx.createDelay(0.3);
    delay.delayTime.value = 0.12;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.25;
    const wet = ctx.createGain();
    wet.gain.value = 0.2;
    const dry = ctx.createGain();
    dry.gain.value = 0.8;

    filter.connect(dry);
    dry.connect(output);
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(output);

    // --- Запуск ---
    osc1.start(startTime);
    osc1.stop(startTime + durationSec + 0.1);
    osc2.start(startTime);
    osc2.stop(startTime + durationSec + 0.1);
    osc3.start(startTime);
    osc3.stop(startTime + durationSec + 0.1);
    noise.start(startTime);
    noise.stop(startTime + 0.1);

    return { osc1, osc2, osc3, noise, env1, env2, envNoise, filter, output, delay, feedback };
  }

  // ============================================================
  // 5. ВОСПРОИЗВЕДЕНИЕ МЕЛОДИИ
  // ============================================================
  function playMelody() {
    if (melody.length === 0) {
      alert('Сначала добавьте хотя бы одну ноту!');
      return;
    }
    if (isPlaying) return;

    const ctx = ensureAudioContext();
    if (!ctx) {
      alert('Ваш браузер не поддерживает Web Audio API');
      return;
    }

    isPlaying = true;
    const btn = document.getElementById('mm-play-btn');
    btn.textContent = '⏹ Остановить';

    const startTime = ctx.currentTime + 0.1;
    const bpm = 100;
    const beatDuration = 60 / bpm;

    let scheduled = [];

    melody.forEach((item, index) => {
      const note = NOTES.find(n => n.id === item.noteId);
      if (!note) return;

      let timeOffset = 0;
      for (let i = 0; i < index; i++) {
        timeOffset += melody[i].duration * beatDuration;
      }
      const when = startTime + timeOffset;
      const durSec = item.duration * beatDuration;

      const nodes = playSynthesizedGusli(ctx, note, when, durSec);
      scheduled.push(nodes);
    });

    const stopBtn = document.getElementById('mm-play-btn');
    const stopHandler = () => {
      scheduled.forEach(nodes => {
        try {
          nodes.osc1.stop();
          nodes.osc1.disconnect();
          nodes.osc2.stop();
          nodes.osc2.disconnect();
          nodes.osc3.stop();
          nodes.osc3.disconnect();
          nodes.noise.stop();
          nodes.noise.disconnect();
          nodes.env1.disconnect();
          nodes.env2.disconnect();
          nodes.envNoise.disconnect();
          nodes.filter.disconnect();
          nodes.output.disconnect();
          nodes.delay.disconnect();
          nodes.feedback.disconnect();
        } catch(e) {}
      });
      isPlaying = false;
      stopBtn.textContent = '▶ Воспроизвести';
      stopBtn.removeEventListener('click', stopHandler);
    };
    stopBtn.addEventListener('click', stopHandler);

    const totalDuration = melody.reduce((sum, item) => sum + item.duration, 0) * beatDuration + 0.5;
    setTimeout(() => {
      if (isPlaying) {
        scheduled.forEach(nodes => {
          try {
            nodes.osc1.stop();
            nodes.osc1.disconnect();
            nodes.osc2.stop();
            nodes.osc2.disconnect();
            nodes.osc3.stop();
            nodes.osc3.disconnect();
            nodes.noise.stop();
            nodes.noise.disconnect();
            nodes.env1.disconnect();
            nodes.env2.disconnect();
            nodes.envNoise.disconnect();
            nodes.filter.disconnect();
            nodes.output.disconnect();
            nodes.delay.disconnect();
            nodes.feedback.disconnect();
          } catch(e) {}
        });
        isPlaying = false;
        stopBtn.textContent = '▶ Воспроизвести';
        stopBtn.removeEventListener('click', stopHandler);
      }
    }, (totalDuration + 0.5) * 1000);
  }

  // ============================================================
  // 6. ОТРИСОВКА ИНТЕРФЕЙСА
  // ============================================================
  function renderPalette() {
    paletteEl.innerHTML = '';
    NOTES.forEach(note => {
      const btn = document.createElement('button');
      btn.className = 'mm-note-btn';
      btn.innerHTML = `${note.symbol}<span class="mm-label">${note.name}</span>`;
      btn.title = `${note.name} (${note.freq.toFixed(1)} Гц)`;
      btn.addEventListener('click', () => {
        ensureAudioContext();
        addNote(note.id);
      });
      paletteEl.appendChild(btn);
    });
  }

  function renderDurations() {
    durGroupEl.innerHTML = '';
    DURATIONS.forEach(dur => {
      const btn = document.createElement('button');
      btn.className = 'mm-dur-btn' + (dur.value === currentDuration ? ' active' : '');
      btn.innerHTML = `<span class="mm-dur-symbol">${dur.symbol}</span>${dur.label}`;
      btn.addEventListener('click', () => {
        ensureAudioContext();
        currentDuration = dur.value;
        renderDurations();
      });
      durGroupEl.appendChild(btn);
    });
  }

  function renderEditor() {
    editorEl.innerHTML = '';
    if (melody.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'mm-editor-empty';
      empty.textContent = 'Нажмите на ноту выше, чтобы добавить';
      editorEl.appendChild(empty);
    } else {
      melody.forEach((item, index) => {
        const note = NOTES.find(n => n.id === item.noteId);
        const dur = DURATIONS.find(d => d.value === item.duration) || DURATIONS[2];
        const chip = document.createElement('span');
        chip.className = 'mm-note-chip';
        chip.innerHTML = `
          <span class="mm-chip-index">${index+1}</span>
          ${note.symbol}
          <span class="mm-chip-dur">${dur.symbol}</span>
          <span class="mm-chip-del">✕</span>
        `;
        chip.addEventListener('click', (e) => {
          if (e.target.classList.contains('mm-chip-del')) {
            removeNote(index);
          }
        });
        editorEl.appendChild(chip);
      });
    }
    updateStats();
  }

  function updateStats() {
    noteCountEl.textContent = melody.length;
    const total = melody.reduce((sum, item) => sum + item.duration, 0);
    totalDurEl.textContent = total.toFixed(2);
    updateShareLink();
  }

  // ============================================================
  // 7. ДЕЙСТВИЯ С МЕЛОДИЕЙ
  // ============================================================
  function addNote(noteId) {
    if (isPlaying) return;
    melody.push({ noteId, duration: currentDuration });
    renderEditor();
    editorEl.scrollTop = editorEl.scrollHeight;
  }

  function removeNote(index) {
    if (isPlaying) return;
    melody.splice(index, 1);
    renderEditor();
  }

  function clearMelody() {
    if (isPlaying) return;
    if (melody.length === 0) return;
    if (!confirm('Очистить всю мелодию?')) return;
    melody = [];
    renderEditor();
  }

  function undoLast() {
    if (isPlaying) return;
    if (melody.length === 0) return;
    melody.pop();
    renderEditor();
  }

  function generateRandomMelody() {
    if (isPlaying) return;
    const count = 6 + Math.floor(Math.random() * 10);
    melody = [];
    for (let i = 0; i < count; i++) {
      const noteId = Math.floor(Math.random() * NOTES.length);
      const dur = DURATIONS[Math.floor(Math.random() * DURATIONS.length)].value;
      melody.push({ noteId, duration: dur });
    }
    renderEditor();
  }

  // ============================================================
  // 8. ШАРИНГ
  // ============================================================
  function encodeMelody() {
    return melody.map(item => `${item.noteId},${item.duration}`).join(':');
  }

  function decodeMelody(str) {
    if (!str) return [];
    try {
      return str.split(':').map(pair => {
        const [noteId, duration] = pair.split(',').map(Number);
        if (isNaN(noteId) || isNaN(duration)) return null;
        if (noteId < 0 || noteId >= NOTES.length) return null;
        if (!DURATIONS.some(d => d.value === duration)) return null;
        return { noteId, duration };
      }).filter(item => item !== null);
    } catch(e) {
      return [];
    }
  }

  function updateShareLink() {
    if (melody.length === 0) {
      shareInput.value = '';
      return;
    }
    const encoded = encodeMelody();
    const url = new URL(window.location.href);
    url.searchParams.set('melody', encoded);
    shareInput.value = url.toString();
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('melody');
    if (encoded) {
      const decoded = decodeMelody(encoded);
      if (decoded.length > 0) {
        melody = decoded;
        renderEditor();
        return true;
      }
    }
    return false;
  }

  function copyShareLink() {
    const val = shareInput.value;
    if (!val) {
      alert('Сначала создайте мелодию!');
      return;
    }
    navigator.clipboard.writeText(val).then(() => {
      alert('Ссылка скопирована!');
    }).catch(() => {
      shareInput.select();
      document.execCommand('copy');
      alert('Ссылка скопирована!');
    });
  }

  // ============================================================
  // 9. ИНИЦИАЛИЗАЦИЯ
  // ============================================================
  function init() {
    renderPalette();
    renderDurations();
    renderEditor();
    loadFromURL();

    document.getElementById('mm-play-btn').addEventListener('click', playMelody);
    document.getElementById('mm-clear-btn').addEventListener('click', clearMelody);
    document.getElementById('mm-undo-btn').addEventListener('click', undoLast);
    document.getElementById('mm-random-btn').addEventListener('click', generateRandomMelody);
    document.getElementById('mm-copy-btn').addEventListener('click', copyShareLink);
    document.getElementById('mm-share-btn').addEventListener('click', () => {
      const url = shareInput.value;
      if (url) window.open(url, '_blank');
    });

    updateShareLink();

    // Активируем AudioContext при первом клике
    document.addEventListener('click', ensureAudioContext, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
</script>
