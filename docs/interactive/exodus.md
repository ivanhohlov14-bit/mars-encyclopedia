---
title: 🪐 «К Исходу» — Интерактивная история
description: Сделайте выбор и узнайте судьбу Марса
---

# 🪐 «К Исходу»

<div id="story-container">
  <style>
    .story-container {
      max-width: 700px;
      margin: 0 auto;
      background: #0d0d0d;
      color: #d4d4d4;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #2a2a3a;
      font-family: 'Segoe UI', 'Arial Unicode MS', sans-serif;
      min-height: 400px;
    }
    .story-title {
      font-size: 1.5rem;
      color: #d4a0a0;
      margin-bottom: 1rem;
      text-align: center;
      border-bottom: 1px solid #2a2a3a;
      padding-bottom: 0.5rem;
    }
    .story-text {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #c4c4d4;
      margin-bottom: 1.5rem;
      background: #14141e;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 3px solid #6a4a7a;
      min-height: 120px;
    }
    .story-text img {
      max-width: 100%;
      border-radius: 8px;
      margin-bottom: 1rem;
      display: block;
    }
    .story-text .highlight {
      color: #d4a0a0;
      font-weight: bold;
    }
    .story-choices {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      margin: 1.5rem 0;
    }
    .story-choice-btn {
      background: #1e1e3a;
      border: 1px solid #3a3a5e;
      border-radius: 8px;
      padding: 0.8rem 1.2rem;
      color: #d4d4e8;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .story-choice-btn:hover {
      background: #2e2e5a;
      border-color: #6a6aaa;
      transform: translateX(5px);
    }
    .story-choice-btn .choice-icon { font-size: 1.4rem; }
    .story-choice-btn .choice-text { flex: 1; }
    .story-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #2a2a3a;
      font-size: 0.85rem;
      color: #666;
    }
    .story-footer button {
      background: #1a1a2a;
      border: 1px solid #3a3a4e;
      border-radius: 4px;
      padding: 0.4rem 1rem;
      color: #aaa;
      cursor: pointer;
      transition: all 0.15s;
    }
    .story-footer button:hover {
      background: #2a2a3a;
      border-color: #5a5a7a;
      color: #fff;
    }
    .story-progress { color: #444466; }
    .story-end {
      text-align: center;
      padding: 1rem;
      background: #1a1a2a;
      border-radius: 8px;
      border: 1px solid #3a3a5e;
    }
    .story-end .end-icon { font-size: 3rem; }
    .story-end .end-title {
      font-size: 1.3rem;
      color: #d4a0a0;
      margin: 0.5rem 0;
    }
    .story-end .end-link {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.5rem 1.5rem;
      background: #3a2a4a;
      border: 1px solid #6a4a7a;
      border-radius: 6px;
      color: #d4d4e8;
      text-decoration: none;
      transition: all 0.2s;
    }
    .story-end .end-link:hover {
      background: #4a3a6a;
      border-color: #8a6aaa;
    }
    .name-input {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      flex-wrap: wrap;
    }
    .name-input label {
      font-size: 1.1rem;
      color: #aaa;
    }
    .name-input input {
      background: #1a1a2a;
      border: 1px solid #3a3a5e;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #d4d4e8;
      font-size: 1rem;
      width: 200px;
      outline: none;
    }
    .name-input input:focus {
      border-color: #6a6aaa;
    }
    .name-input button {
      background: #3a2a4a;
      border: 1px solid #6a4a7a;
      border-radius: 6px;
      padding: 0.6rem 1.5rem;
      color: #d4d4e8;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s;
    }
    .name-input button:hover {
      background: #4a3a6a;
      border-color: #8a6aaa;
    }
    .sound-toggle {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      background: #1a1a2a;
      border: 1px solid #3a3a5e;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
      cursor: pointer;
      color: #aaa;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      z-index: 100;
    }
    .sound-toggle:hover {
      background: #2a2a3a;
      border-color: #5a5a7a;
      color: #fff;
    }
    @media (max-width: 600px) {
      .story-text { font-size: 1rem; padding: 1rem; }
      .story-choice-btn { font-size: 0.9rem; }
      .name-input { flex-direction: column; }
    }
  </style>

  <div class="story-container" id="story-app">
    <div class="story-title">🪐 «К Исходу»</div>
    <div id="story-content"></div>
    <div class="story-footer">
      <span class="story-progress" id="story-progress">Шаг 1</span>
      <button id="story-restart">↺ Начать заново</button>
    </div>
  </div>

  <!-- Кнопка звука -->
  <button class="sound-toggle" id="sound-toggle" title="Включить/выключить атмосферный звук">🔊</button>

  <script>
  (function() {
    'use strict';

    // ============================================================
    // 1. ПУТИ К КАРТИНКАМ (исправлены расширения)
    // ============================================================
    const IMG_PATH = '/assets/images/story/';
    const IMG_ROOT = '/assets/images/';

    // ============================================================
    // 2. ДАННЫЕ ИСТОРИИ (исправлены расширения и ссылки)
    // ============================================================
    const STORY = {
      nameInput: {
        id: 'nameInput',
        isNameScreen: true
      },

      start: {
        id: 'start',
        text: function(name) {
          return `<img src="${IMG_PATH}start.jpg" alt="Ацидалийское море" loading="lazy" onerror="this.style.display='none'" />
                  Вы — <span class="highlight">${name}</span>. Стоите на обрыве у <span class="highlight">Ацидалийского моря</span>.
                  Ветер доносит запах соли и пыли. Вдалеке видны огни города Окхасен.
                  За спиной — тёмные входы в <span class="highlight">пещеры Фарсиды</span>, где живёт старый хранитель знаний Хевсур.
                  <br><br>В руке вы сжимаете глиняную табличку. На ней всего одно слово: <span class="highlight">«Исход»</span>.
                  Что вы сделаете?`;
        },
        choices: [
          { icon: '🏔️', text: 'Пойти к Хевсуру в пещеры', next: 'hevsur' },
          { icon: '🌆', text: 'Отправиться в город Окхасен', next: 'okhasen' }
        ],
        progress: '1',
        sound: 'wind'
      },

      hevsur: {
        id: 'hevsur',
        text: function(name) {
          return `<img src="${IMG_PATH}hevsur.png" alt="Хевсур в пещерах" loading="lazy" onerror="this.style.display='none'" />
                  Вы спускаетесь в пещеры. Воздух становится влажным и прохладным.
                  В глубине мерцает огонь — <span class="highlight">Хевсур</span> сидит у костра, перебирая глиняные таблички.
                  <br><br>Он поднимает голову и смотрит на вас. «Ты прочитал табличку. Что ты хочешь знать, ${name}?»`;
        },
        choices: [
          { icon: '📜', text: 'Спросить о пророчествах — что такое «Исход»?', next: 'prophecy' },
          { icon: '🗣️', text: 'Попросить научить марсианскому языку', next: 'language' }
        ],
        progress: '2',
        sound: 'fire'
      },

      prophecy: {
        id: 'prophecy',
        text: `<img src="${IMG_ROOT}mars_starmap.png" alt="Пророчество" style="max-width:100%; border-radius:8px; margin-bottom:1rem;" onerror="this.style.display='none'" />
               Хевсур долго молчит, глядя на огонь. Затем начинает говорить:
               <br><br>«<span class="highlight">Исход</span> — это не конец. Это путь.
               Когда вода уйдёт с Марса, жизнь поднимется к звёздам.
               Ты — один из тех, кто должен решить: остаться и помнить, или уйти и нести память дальше.»
               <br><br>Он протягивает вам табличку с картой звёздного неба.`,
        end: true,
        endIcon: '🌟',
        endTitle: 'Пророчество открыто',
        endText: 'Вы узнали тайну Исхода. Теперь вы — хранитель знания.',
        endLink: '/history/periodization/',
        endLinkText: '📖 Читать о периодах марсианской истории',
        progress: '3',
        sound: 'wind'
      },

      language: {
        id: 'language',
        text: `<img src="${IMG_PATH}language.png" alt="Изучение языка" loading="lazy" onerror="this.style.display='none'" />
               Хевсур улыбается. «Язык — это память. Запомни главное: <span class="highlight">Lān sur</span> — «Глина помнит».
               <br><br>Он учит вас нескольким фразам, и вы чувствуете, как древние слова оживают в вашем сознании.
               <br><br>«Ты — хранитель языка. Не дай ему умереть вместе с нами.»`,
        end: true,
        endIcon: '📜',
        endTitle: 'Язык обретён',
        endText: 'Вы научились читать марсианские письмена. Глина помнит — и вы помните.',
        endLink: '/svitok-e/',
        endLinkText: '📖 Изучить марсианскую письменность',
        progress: '3',
        sound: 'fire'
      },

      okhasen: {
        id: 'okhasen',
        text: `<img src="${IMG_PATH}okhasen.jpg" alt="Окхасен" loading="lazy" onerror="this.style.display='none'" />
               Вы идёте по извилистой дороге к <span class="highlight">Окхасену</span>.
               Город встречает вас шумом порта и запахом рыбы. Повсюду снуют марсиане, кто-то торгует, кто-то готовит корабли к отплытию.
               <br><br>Вы стоите на площади. Куда направитесь?`,
        choices: [
          { icon: '⛵', text: 'Пойти в порт — там говорят, есть корабли, уходящие к звёздам', next: 'port' },
          { icon: '🏛️', text: 'Пойти в Академию — там собираются учёные', next: 'academy' }
        ],
        progress: '2',
        sound: 'city'
      },

      port: {
        id: 'port',
        text: `<img src="${IMG_PATH}port.jpg" alt="Порт" loading="lazy" onerror="this.style.display='none'" />
               В порту кипит жизнь. Капитан корабля «Звёздный ветер» смотрит на вас с усмешкой.
               <br><br>«Мальчик, ты ищешь путь к звёздам? Это не игрушки. Там, за небом, — только холод и тьма.
               Но если ты готов — мы отплываем на рассвете.»
               <br><br>Вы смотрите на море, в котором отражается красное небо.`,
        end: true,
        endIcon: '⛵',
        endTitle: 'Путь к звёздам',
        endText: 'Вы стоите на пороге великого путешествия. Корабль «Звёздный ветер» ждёт вас.',
        endLink: '/geography/acidalia-sea/',
        endLinkText: '🌊 Узнать об Ацидалийском море',
        progress: '3',
        sound: 'sea'
      },

      academy: {
        id: 'academy',
        text: `<img src="${IMG_PATH}academy.jpg" alt="Академия" loading="lazy" onerror="this.style.display='none'" />
               В Академии вы видите молодого учёного, склонившегося над картами. Это <span class="highlight">Талин</span>.
               Он поднимает голову.
               <br><br>«Ах, ты пришёл! Я как раз искал помощника. Знаешь, я думаю, мы можем предсказать, когда наступит Исход.
               Поможешь мне с расчётами?»
               <br><br>Он протягивает вам древний астролябий.`,
        end: true,
        endIcon: '🔭',
        endTitle: 'Встреча с Талином',
        endText: 'Вы стали учеником великого астронома. Вместе вы будете искать путь к звёздам.',
        endLink: '/people/talin/',
        endLinkText: '👨‍🚀 Узнать о Талине',
        progress: '3',
        sound: 'city'
      }
    };

    // ============================================================
    // 3. ЗВУКИ
    // ============================================================
    let audioCtx = null;
    let soundEnabled = false;
    let currentSound = null;
    let soundNodes = [];

    function getSound(type) {
      if (!audioCtx) return null;

      const sounds = {
        wind: function() {
          const bufferSize = audioCtx.sampleRate * 2;
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.08 * Math.sin(i * 0.005) * (1 - i / bufferSize);
          }
          return buffer;
        },
        fire: function() {
          const bufferSize = audioCtx.sampleRate * 1.5;
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            const crackle = Math.random() > 0.98 ? (Math.random() * 2 - 1) * 0.3 : 0;
            data[i] = crackle * Math.exp(-i / bufferSize * 2);
          }
          return buffer;
        },
        sea: function() {
          const bufferSize = audioCtx.sampleRate * 3;
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            const wave = Math.sin(i * 0.01) * 0.1;
            const noise = (Math.random() * 2 - 1) * 0.05;
            const envelope = 1 - i / bufferSize;
            data[i] = (wave + noise) * envelope;
          }
          return buffer;
        },
        city: function() {
          const bufferSize = audioCtx.sampleRate * 2;
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            const murmur = Math.sin(i * 0.02) * 0.05 + Math.sin(i * 0.015) * 0.03;
            const noise = (Math.random() * 2 - 1) * 0.04;
            data[i] = (murmur + noise) * (1 - i / bufferSize * 0.5);
          }
          return buffer;
        }
      };

      return sounds[type] ? sounds[type]() : null;
    }

    function playAmbientSound(type) {
      stopAmbientSound();

      if (!soundEnabled || !audioCtx) return;

      const buffer = getSound(type);
      if (!buffer) return;

      function loop() {
        if (!soundEnabled || !audioCtx) return;
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        const gain = audioCtx.createGain();
        gain.gain.value = 0.3;
        source.connect(gain);
        gain.connect(audioCtx.destination);
        source.start();
        soundNodes.push(source, gain);
        source.onended = () => {
          if (soundEnabled) {
            setTimeout(loop, 300);
          }
        };
      }
      loop();
    }

    function stopAmbientSound() {
      soundNodes.forEach(node => {
        try { node.stop(); node.disconnect(); } catch(e) {}
      });
      soundNodes = [];
    }

    function toggleSound() {
      if (!audioCtx) {
        try {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
          alert('Ваш браузер не поддерживает звук');
          return;
        }
      }
      soundEnabled = !soundEnabled;
      document.getElementById('sound-toggle').textContent = soundEnabled ? '🔇' : '🔊';
      if (soundEnabled && currentSound) {
        playAmbientSound(currentSound);
      } else {
        stopAmbientSound();
      }
    }

    // ============================================================
    // 4. СОСТОЯНИЕ ИГРЫ
    // ============================================================
    let playerName = '';
    let history = [];
    let currentId = 'nameInput';
    let isFinished = false;

    const contentEl = document.getElementById('story-content');
    const progressEl = document.getElementById('story-progress');
    const restartBtn = document.getElementById('story-restart');
    const soundToggle = document.getElementById('sound-toggle');

    // ============================================================
    // 5. ОТРИСОВКА
    // ============================================================
    function render() {
      if (currentId === 'nameInput') {
        contentEl.innerHTML = `
          <div class="story-text" style="text-align:center; border-left-color:#6a6aaa;">
            <div style="font-size:3rem; margin-bottom:1rem;">🪐</div>
            <p style="font-size:1.2rem; margin-bottom:1rem;">Добро пожаловать в историю «К Исходу».</p>
            <p style="color:#888;">Как тебя зовут, странник?</p>
            <div class="name-input">
              <input type="text" id="name-input-field" placeholder="Введите имя" value="${playerName}" />
              <button id="name-submit-btn">Начать путешествие</button>
            </div>
          </div>
        `;
        document.getElementById('name-submit-btn').addEventListener('click', submitName);
        document.getElementById('name-input-field').addEventListener('keydown', (e) => {
          if (e.key === 'Enter') submitName();
        });
        progressEl.textContent = 'Вступление';
        stopAmbientSound();
        return;
      }

      const scene = STORY[currentId];
      if (!scene) {
        contentEl.innerHTML = '<div class="story-text">❌ Ошибка: сцена не найдена</div>';
        return;
      }

      progressEl.textContent = 'Шаг ' + (scene.progress || '?');

      let text = typeof scene.text === 'function' ? scene.text(playerName) : scene.text;

      let html = `<div class="story-text">${text}</div>`;

      if (scene.end) {
        html += `
          <div class="story-end">
            <div class="end-icon">${scene.endIcon || '🎉'}</div>
            <div class="end-title">${scene.endTitle || 'Конец'}</div>
            <div class="end-text">${scene.endText || 'Ваше путешествие завершено.'}</div>
            ${scene.endLink ? `<a href="${scene.endLink}" class="end-link">${scene.endLinkText || '📖 Читать далее'}</a>` : ''}
          </div>
        `;
        isFinished = true;
      } else if (scene.choices && scene.choices.length > 0) {
        html += `<div class="story-choices">`;
        scene.choices.forEach(choice => {
          html += `
            <button class="story-choice-btn" data-next="${choice.next}">
              <span class="choice-icon">${choice.icon || '➡️'}</span>
              <span class="choice-text">${choice.text}</span>
            </button>
          `;
        });
        html += `</div>`;
        isFinished = false;
      }

      contentEl.innerHTML = html;

      // Обновляем звук
      if (scene.sound && scene.sound !== currentSound) {
        currentSound = scene.sound;
        if (soundEnabled) {
          playAmbientSound(currentSound);
        }
      }

      if (!scene.end) {
        document.querySelectorAll('.story-choice-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const next = this.dataset.next;
            if (next && STORY[next]) {
              currentId = next;
              history.push(currentId);
              render();
            }
          });
        });
      }
    }

    function submitName() {
      const nameField = document.getElementById('name-input-field');
      const name = nameField.value.trim() || 'Странник';
      playerName = name;
      currentId = 'start';
      history = ['start'];
      render();
    }

    // ============================================================
    // 6. ПЕРЕЗАПУСК
    // ============================================================
    function restart() {
      currentId = 'nameInput';
      history = [];
      playerName = '';
      isFinished = false;
      currentSound = null;
      stopAmbientSound();
      render();
    }

    // ============================================================
    // 7. ИНИЦИАЛИЗАЦИЯ
    // ============================================================
    function init() {
      render();
      restartBtn.addEventListener('click', restart);
      soundToggle.addEventListener('click', toggleSound);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

  })();
  </script>
</div>
