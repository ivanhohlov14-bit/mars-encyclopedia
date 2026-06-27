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
    .story-choice-btn:active {
      transform: scale(0.98);
    }
    .story-choice-btn .choice-icon {
      font-size: 1.4rem;
    }
    .story-choice-btn .choice-text {
      flex: 1;
    }
    .story-choice-btn .choice-link {
      color: #6a6aaa;
      font-size: 0.8rem;
    }
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
    .story-progress {
      color: #444466;
    }
    .story-end {
      text-align: center;
      padding: 1rem;
      background: #1a1a2a;
      border-radius: 8px;
      border: 1px solid #3a3a5e;
    }
    .story-end .end-icon {
      font-size: 3rem;
    }
    .story-end .end-title {
      font-size: 1.3rem;
      color: #d4a0a0;
      margin: 0.5rem 0;
    }
    .story-end .end-text {
      color: #aaa;
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
    @media (max-width: 600px) {
      .story-text { font-size: 1rem; padding: 1rem; }
      .story-choice-btn { font-size: 0.9rem; }
    }
  </style>

  <div class="story-container" id="story-app">
    <div class="story-title">🪐 «К Исходу»</div>
    <div id="story-content">
      <!-- Содержимое будет вставлено через JavaScript -->
    </div>
    <div class="story-footer">
      <span class="story-progress" id="story-progress">Шаг 1</span>
      <button id="story-restart">↺ Начать заново</button>
    </div>
  </div>
</div>

<script>
(function() {
  'use strict';

  // ============================================================
  // 1. ДАННЫЕ ИСТОРИИ
  // ============================================================
  const STORY = {
    // --- Начало ---
    start: {
      id: 'start',
      text: 'Вы — <span class="highlight">Аран</span>, молодой марсианин. Стоите на обрыве у <span class="highlight">Ацидалийского моря</span>. Ветер доносит запах соли и пыли. Вдалеке видны огни города Окхасен. За спиной — тёмные входы в <span class="highlight">пещеры Фарсиды</span>, где живёт старый хранитель знаний Хевсур.<br><br>В руке вы сжимаете глиняную табличку. На ней всего одно слово: <span class="highlight">«Исход»</span>. Что вы сделаете?',
      choices: [
        { icon: '🏔️', text: 'Пойти к Хевсуру в пещеры', next: 'hevsur' },
        { icon: '🌆', text: 'Отправиться в город Окхасен', next: 'okhasen' }
      ],
      progress: '1'
    },

    // --- Ветка 1: Хевсур ---
    hevsur: {
      id: 'hevsur',
      text: 'Вы спускаетесь в пещеры. Воздух становится влажным и прохладным. В глубине мерцает огонь — <span class="highlight">Хевсур</span> сидит у костра, перебирая глиняные таблички.<br><br>Он поднимает голову и смотрит на вас. «Ты прочитал табличку. Что ты хочешь знать, Аран?»',
      choices: [
        { icon: '📜', text: 'Спросить о пророчествах — что такое «Исход»?', next: 'prophecy' },
        { icon: '🗣️', text: 'Попросить научить марсианскому языку', next: 'language' }
      ],
      progress: '2'
    },

    prophecy: {
      id: 'prophecy',
      text: 'Хевсур долго молчит, глядя на огонь. Затем начинает говорить:<br><br>«<span class="highlight">Исход</span> — это не конец. Это путь. Когда вода уйдёт с Марса, жизнь поднимется к звёздам. Ты — один из тех, кто должен решить: остаться и помнить, или уйти и нести память дальше.»<br><br>Он протягивает вам табличку с картой звёздного неба.',
      end: true,
      endIcon: '🌟',
      endTitle: 'Пророчество открыто',
      endText: 'Вы узнали тайну Исхода. Теперь вы — хранитель знания.',
      endLink: '/history/prophecies/',
      endLinkText: '📖 Читать о пророчествах в энциклопедии',
      progress: '3'
    },

    language: {
      id: 'language',
      text: 'Хевсур улыбается. «Язык — это память. Запомни главное: <span class="highlight">Lān sur</span> — «Глина помнит».<br><br>Он учит вас нескольким фразам, и вы чувствуете, как древние слова оживают в вашем сознании.<br><br>«Ты — хранитель языка. Не дай ему умереть вместе с нами.»',
      end: true,
      endIcon: '📜',
      endTitle: 'Язык обретён',
      endText: 'Вы научились читать марсианские письмена. Глина помнит — и вы помните.',
      endLink: '/culture/writing/',
      endLinkText: '📖 Изучить марсианскую письменность',
      progress: '3'
    },

    // --- Ветка 2: Окхасен ---
    okhasen: {
      id: 'okhasen',
      text: 'Вы идёте по извилистой дороге к <span class="highlight">Окхасену</span>. Город встречает вас шумом порта и запахом рыбы. Повсюду снуют марсиане, кто-то торгует, кто-то готовит корабли к отплытию.<br><br>Вы стоите на площади. Куда направитесь?',
      choices: [
        { icon: '⛵', text: 'Пойти в порт — там говорят, есть корабли, уходящие к звёздам', next: 'port' },
        { icon: '🏛️', text: 'Пойти в Академию — там собираются учёные', next: 'academy' }
      ],
      progress: '2'
    },

    port: {
      id: 'port',
      text: 'В порту кипит жизнь. Капитан корабля «Звёздный ветер» смотрит на вас с усмешкой.<br><br>«Мальчик, ты ищешь путь к звёздам? Это не игрушки. Там, за небом, — только холод и тьма. Но если ты готов — мы отплываем на рассвете.»<br><br>Вы смотрите на море, в котором отражается красное небо.',
      end: true,
      endIcon: '⛵',
      endTitle: 'Путь к звёздам',
      endText: 'Вы стоите на пороге великого путешествия. Корабль «Звёздный ветер» ждёт вас.',
      endLink: '/geography/acidalia-sea/',
      endLinkText: '🌊 Узнать об Ацидалийском море',
      progress: '3'
    },

    academy: {
      id: 'academy',
      text: 'В Академии вы видите молодого учёного, склонившегося над картами. Это <span class="highlight">Талин</span>. Он поднимает голову.<br><br>«Ах, Аран! Ты пришёл. Я как раз искал помощника. Знаешь, я думаю, мы можем предсказать, когда наступит Исход. Поможешь мне с расчётами?»<br><br>Он протягивает вам древний астролябий.',
      end: true,
      endIcon: '🔭',
      endTitle: 'Встреча с Талином',
      endText: 'Вы стали учеником великого астронома. Вместе вы будете искать путь к звёздам.',
      endLink: '/people/talin/',
      endLinkText: '👨‍🚀 Узнать о Талине',
      progress: '3'
    }
  };

  // ============================================================
  // 2. СОСТОЯНИЕ
  // ============================================================
  let history = []; // массив пройденных id
  let currentId = 'start';
  let isFinished = false;

  const contentEl = document.getElementById('story-content');
  const progressEl = document.getElementById('story-progress');
  const restartBtn = document.getElementById('story-restart');

  // ============================================================
  // 3. ОТРИСОВКА
  // ============================================================
  function render() {
    const scene = STORY[currentId];
    if (!scene) {
      contentEl.innerHTML = '<div class="story-text">❌ Ошибка: сцена не найдена</div>';
      return;
    }

    // Обновляем прогресс
    progressEl.textContent = 'Шаг ' + scene.progress;

    // Строим HTML
    let html = `<div class="story-text">${scene.text}</div>`;

    if (scene.end) {
      // --- Конец истории ---
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
      // --- Выбор ---
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

    // Привязываем события к кнопкам выбора
    if (!scene.end) {
      document.querySelectorAll('.story-choice-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const next = this.dataset.next;
          if (next) {
            currentId = next;
            history.push(currentId);
            render();
          }
        });
      });
    }
  }

  // ============================================================
  // 4. ПЕРЕЗАПУСК
  // ============================================================
  function restart() {
    currentId = 'start';
    history = [];
    isFinished = false;
    render();
  }

  // ============================================================
  // 5. ЗАГРУЗКА ИЗ URL (опционально)
  // ============================================================
  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('path');
    if (path) {
      const ids = path.split(',');
      // Проверяем, что все id существуют
      let valid = true;
      for (const id of ids) {
        if (!STORY[id]) { valid = false; break; }
      }
      if (valid && ids.length > 0) {
        currentId = ids[ids.length - 1];
        history = ids;
        return true;
      }
    }
    return false;
  }

  // ============================================================
  // 6. ИНИЦИАЛИЗАЦИЯ
  // ============================================================
  function init() {
    // Если есть путь в URL — загружаем
    if (!loadFromURL()) {
      restart();
    } else {
      render();
    }

    // Кнопка перезапуска
    restartBtn.addEventListener('click', restart);

    // Обновляем URL при изменении (опционально)
    // Можно добавить, чтобы сохранять путь
  }

  // Запускаем
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
</script>
