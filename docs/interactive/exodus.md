<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🪐 «К Исходу» — Интерактивная история</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #0d0d0d;
      color: #d4d4d4;
      font-family: 'Segoe UI', 'Arial Unicode MS', sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .story-container {
      max-width: 720px;
      width: 100%;
      margin: 1rem;
      background: #0d0d0d;
      padding: 1.5rem;
      border-radius: 16px;
      border: 1px solid #2a2a3a;
      box-shadow: 0 8px 32px rgba(0,0,0,0.8);
      position: relative;
    }
    .story-title {
      font-size: 2rem;
      color: #d4a0a0;
      text-align: center;
      border-bottom: 1px solid #2a2a3a;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
      letter-spacing: 2px;
    }
    .story-text {
      font-size: 1.1rem;
      line-height: 1.8;
      background: #14141e;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 3px solid #6a4a7a;
      min-height: 120px;
      transition: opacity 0.4s ease;
      position: relative;
    }
    .story-text img {
      max-width: 100%;
      border-radius: 8px;
      margin-bottom: 1rem;
      display: block;
    }
    .highlight { color: #d4a0a0; font-weight: bold; }
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
      text-align: left;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      transition: 0.2s;
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
      align-items: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #2a2a3a;
      font-size: 0.85rem;
      color: #666;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .story-footer button {
      background: #1a1a2a;
      border: 1px solid #3a3a4e;
      border-radius: 4px;
      padding: 0.4rem 1rem;
      color: #aaa;
      cursor: pointer;
      transition: 0.2s;
    }
    .story-footer button:hover { background: #2a2a3a; color: #fff; }
    .story-progress { color: #444466; }
    .story-end {
      text-align: center;
      padding: 1rem;
      background: #1a1a2a;
      border-radius: 8px;
      border: 1px solid #3a3a5e;
      margin-top: 1rem;
    }
    .story-end .end-icon { font-size: 3rem; }
    .story-end .end-title { font-size: 1.3rem; color: #d4a0a0; margin: 0.5rem 0; }
    .story-end .end-link {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.5rem 1.5rem;
      background: #3a2a4a;
      border: 1px solid #6a4a7a;
      border-radius: 6px;
      color: #d4d4e8;
      text-decoration: none;
      transition: 0.2s;
    }
    .story-end .end-link:hover { background: #4a3a6a; border-color: #8a6aaa; }
    .name-input {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin: 1rem 0;
      flex-wrap: wrap;
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
    .name-input input:focus { border-color: #6a6aaa; }
    .name-input button {
      background: #3a2a4a;
      border: 1px solid #6a4a7a;
      border-radius: 6px;
      padding: 0.6rem 1.5rem;
      color: #d4d4e8;
      cursor: pointer;
      font-size: 1rem;
    }
    .name-input button:hover { background: #4a3a6a; border-color: #8a6aaa; }

    /* Инвентарь и достижения (плавающие) */
    #inventory, #achievements {
      position: fixed;
      background: rgba(10, 10, 20, 0.9);
      border: 1px solid #3a3a5e;
      border-radius: 8px;
      padding: 10px 14px;
      color: #d4d4d4;
      font-size: 13px;
      backdrop-filter: blur(4px);
      z-index: 100;
      max-width: 180px;
      pointer-events: none;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    }
    #inventory { top: 20px; right: 20px; text-align: center; }
    #achievements { bottom: 80px; right: 20px; text-align: left; max-height: 200px; overflow-y: auto; }
    #inventory strong, #achievements strong { color: #d4a0a0; display: block; margin-bottom: 4px; }
    #inventory-list { color: #aaa; font-size: 12px; line-height: 1.6; }
    .achievement-item { color: #ffaa44; font-size: 12px; margin: 2px 0; }
    #inventory.hidden, #achievements.hidden { display: none; }

    /* Кнопка звука */
    .sound-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
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
      z-index: 100;
      transition: 0.2s;
    }
    .sound-toggle:hover { background: #2a2a3a; color: #fff; }

    /* Анимация достижений (всплывающее уведомление) */
    .toast-achievement {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.9);
      color: #ffaa44;
      padding: 20px 40px;
      border-radius: 12px;
      font-size: 24px;
      border: 2px solid #ffaa44;
      z-index: 200;
      animation: fadeInOut 2.5s forwards;
      text-align: center;
      pointer-events: none;
    }
    @keyframes fadeInOut {
      0% { opacity:0; transform:translate(-50%,-50%) scale(0.8); }
      20% { opacity:1; transform:translate(-50%,-50%) scale(1); }
      80% { opacity:1; transform:translate(-50%,-50%) scale(1); }
      100% { opacity:0; transform:translate(-50%,-50%) scale(0.8); }
    }

    /* Адаптив */
    @media (max-width: 600px) {
      .story-container { padding: 1rem; margin: 0.5rem; }
      .story-title { font-size: 1.5rem; }
      .story-text { font-size: 1rem; padding: 1rem; }
      #inventory, #achievements { max-width: 130px; font-size: 11px; padding: 6px 10px; }
      #inventory { top: 10px; right: 10px; }
      #achievements { bottom: 70px; right: 10px; max-height: 120px; }
    }
  </style>
</head>
<body>

<!-- Основной контейнер -->
<div class="story-container" id="story-app">
  <div class="story-title">🪐 «К Исходу»</div>
  <div id="story-content"></div>
  <div class="story-footer">
    <span class="story-progress" id="story-progress">Шаг 1</span>
    <button id="story-restart">↺ Начать заново</button>
  </div>
</div>

<!-- Инвентарь -->
<div id="inventory" class="hidden">
  <strong>🗂️ Инвентарь</strong>
  <div id="inventory-list">(пусто)</div>
</div>

<!-- Достижения -->
<div id="achievements" class="hidden">
  <strong>🏆 Достижения</strong>
  <div id="achievements-list"></div>
</div>

<!-- Кнопка звука -->
<button class="sound-toggle" id="sound-toggle" title="Включить/выключить атмосферный звук">🔊</button>

<script>
(function() {
  'use strict';

  // ============================================================
  // 1. БАЗОВЫЙ URL
  // ============================================================
  const BASE_URL = 'https://ivanhohlov14-bit.github.io/mars-encyclopedia';

  // ============================================================
  // 2. ПУТИ К КАРТИНКАМ
  // ============================================================
  const IMG_PATH = BASE_URL + '/assets/images/story/';
  const IMG_ROOT = BASE_URL + '/assets/images/';

  // ============================================================
  // 3. ГЛОБАЛЬНЫЕ СОСТОЯНИЯ
  // ============================================================
  let playerName = '';
  let currentId = 'nameInput';
  let history = [];
  let inventory = [];
  let gameState = {
    hasMap: false,
    knowsLanguage: false,
    talinMet: false,
    hevsurTrust: 0,
    storm: false,
    gaveAmulet: false,
    foundObservatory: false,
  };
  let achievements = [];
  let isFinished = false;
  let audioCtx = null;
  let soundEnabled = false;
  let currentSound = null;
  let soundNodes = [];
  let typingInterval = null;

  // DOM
  const contentEl = document.getElementById('story-content');
  const progressEl = document.getElementById('story-progress');
  const restartBtn = document.getElementById('story-restart');
  const soundToggle = document.getElementById('sound-toggle');
  const inventoryEl = document.getElementById('inventory');
  const inventoryListEl = document.getElementById('inventory-list');
  const achievementsEl = document.getElementById('achievements');
  const achievementsListEl = document.getElementById('achievements-list');

  // ============================================================
  // 4. ДАННЫЕ ИСТОРИИ (расширенные)
  // ============================================================
  const STORY = {
    // ----- ВВОД ИМЕНИ -----
    nameInput: { id: 'nameInput', isNameScreen: true },

    // ----- СТАРТ -----
    start: {
      id: 'start',
      text: function(name) {
        return `<img src="${IMG_PATH}start.jpg" alt="Ацидалийское море" loading="lazy" />
                Вы — <span class="highlight">${name}</span>. Стоите на обрыве у <span class="highlight">Ацидалийского моря</span>.
                Ветер доносит запах соли и пыли. Вдалеке видны огни города Окхасен.
                За спиной — тёмные входы в <span class="highlight">пещеры Фарсиды</span>, где живёт старый хранитель знаний Хевсур.
                <br><br>В руке вы сжимаете глиняную табличку. На ней всего одно слово: <span class="highlight">«Исход»</span>.
                Что вы сделаете?`;
      },
      choices: [
        { icon: '🏔️', text: 'Пойти к Хевсуру в пещеры', next: 'hevsur', condition: () => true },
        { icon: '🌆', text: 'Отправиться в город Окхасен', next: 'okhasen', condition: () => true },
        { icon: '📜', text: 'Осмотреть табличку внимательнее', next: 'tablet', condition: () => !inventory.includes('Глиняная табличка') }
      ],
      progress: '1',
      sound: 'wind'
    },

    // ----- ТАБЛИЧКА (доп. сцена) -----
    tablet: {
      id: 'tablet',
      text: function(name) {
        return `<img src="${IMG_ROOT}tablet.png" alt="Табличка" loading="lazy" style="max-width:200px; margin:0 auto;" />
                Вы рассматриваете табличку. На обратной стороне вы замечаете едва заметные символы.
                Это древний язык, но вам кажется, что вы понимаете его смысл: <span class="highlight">«Звёзды ждут»</span>.
                <br><br>Вы чувствуете, что табличка — ключ к чему-то большему. Вы кладёте её в карман.`;
      },
      onEnter: function() {
        if (!inventory.includes('Глиняная табличка')) {
          inventory.push('Глиняная табличка');
          addAchievement('🪷 Нашёл табличку');
          updateUI();
        }
      },
      choices: [
        { icon: '🏔️', text: 'Пойти к Хевсуру', next: 'hevsur', condition: () => true },
        { icon: '🌆', text: 'Отправиться в Окхасен', next: 'okhasen', condition: () => true }
      ],
      progress: '1',
      sound: 'wind'
    },

    // ----- ХЕВСУР -----
    hevsur: {
      id: 'hevsur',
      text: function(name) {
        return `<img src="${IMG_PATH}hevsur.png" alt="Хевсур в пещерах" loading="lazy" />
                Вы спускаетесь в пещеры. Воздух становится влажным и прохладным.
                В глубине мерцает огонь — <span class="highlight">Хевсур</span> сидит у костра, перебирая глиняные таблички.
                <br><br>Он поднимает голову и смотрит на вас. «Ты прочитал табличку. Что ты хочешь знать, ${name}?»`;
      },
      onEnter: function() {
        if (!achievements.includes('Нашёл Хевсура')) {
          addAchievement('🏔️ Нашёл Хевсура');
        }
        // Если у игрока есть табличка, повышаем доверие
        if (inventory.includes('Глиняная табличка')) {
          gameState.hevsurTrust = Math.min(100, gameState.hevsurTrust + 20);
        }
        updateUI();
      },
      choices: [
        { icon: '📜', text: 'Спросить о пророчествах — что такое «Исход»?', next: 'prophecy', condition: () => true },
        { icon: '🗣️', text: 'Попросить научить марсианскому языку', next: 'language', condition: () => !gameState.knowsLanguage },
        { icon: '🔮', text: 'Показать табличку и спросить о звёздах', next: 'starmap', condition: () => inventory.includes('Глиняная табличка') && !gameState.hasMap },
        { icon: '💬', text: 'Поговорить о прошлом Марса', next: 'hevsur_history', condition: () => gameState.hevsurTrust >= 50 }
      ],
      progress: '2',
      sound: 'fire'
    },

    // ----- ПРОРОЧЕСТВО -----
    prophecy: {
      id: 'prophecy',
      text: `<img src="${IMG_ROOT}mars_starmap.png" alt="Пророчество" style="max-width:100%; border-radius:8px; margin-bottom:1rem;" />
              Хевсур долго молчит, глядя на огонь. Затем начинает говорить:
              <br><br>«<span class="highlight">Исход</span> — это не конец. Это путь.
              Когда вода уйдёт с Марса, жизнь поднимется к звёздам.
              Ты — один из тех, кто должен решить: остаться и помнить, или уйти и нести память дальше.»
              <br><br>Он протягивает вам табличку с картой звёздного неба.`,
      onEnter: function() {
        if (!inventory.includes('Звёздная карта')) {
          inventory.push('Звёздная карта');
          gameState.hasMap = true;
          addAchievement('🌟 Получил звёздную карту');
          updateUI();
        }
      },
      choices: [
        { icon: '🔮', text: 'Спросить, как прочитать карту', next: 'starmap', condition: () => gameState.hasMap && !gameState.foundObservatory },
        { icon: '🏔️', text: 'Вернуться к Хевсуру', next: 'hevsur', condition: () => true }
      ],
      progress: '3',
      sound: 'wind'
    },

    // ----- ЯЗЫК -----
    language: {
      id: 'language',
      text: `<img src="${IMG_PATH}language.png" alt="Изучение языка" loading="lazy" />
              Хевсур улыбается. «Язык — это память. Запомни главное: <span class="highlight">Lān sur</span> — «Глина помнит».
              <br><br>Он учит вас нескольким фразам, и вы чувствуете, как древние слова оживают в вашем сознании.
              <br><br>«Ты — хранитель языка. Не дай ему умереть вместе с нами.»`,
      onEnter: function() {
        gameState.knowsLanguage = true;
        addAchievement('🗣️ Выучил марсианский язык');
        updateUI();
      },
      choices: [
        { icon: '📜', text: 'Спросить о пророчествах', next: 'prophecy', condition: () => true },
        { icon: '🏔️', text: 'Вернуться к Хевсуру', next: 'hevsur', condition: () => true }
      ],
      progress: '3',
      sound: 'fire'
    },

    // ----- ЗВЁЗДНАЯ КАРТА / ОБСЕРВАТОРИЯ -----
    starmap: {
      id: 'starmap',
      text: function(name) {
        return `<img src="${IMG_PATH}starmap.jpg" alt="Звёздная карта" loading="lazy" />
                Вы рассматриваете карту, которую дал Хевсур. На ней отмечены созвездия и странные линии.
                <br><br>Хевсур говорит: «Эти линии ведут к древней обсерватории в горах. Там ты сможешь увидеть путь к звёздам.»
                <br><br>Вы чувствуете, что это ключ к разгадке Исхода.`;
      },
      onEnter: function() {
        if (!inventory.includes('Звёздная карта')) {
          inventory.push('Звёздная карта');
          gameState.hasMap = true;
          addAchievement('🌟 Получил звёздную карту');
          updateUI();
        }
      },
      choices: [
        { icon: '🏔️', text: 'Отправиться в обсерваторию', next: 'observatory', condition: () => true },
        { icon: '🏔️', text: 'Вернуться к Хевсуру', next: 'hevsur', condition: () => true },
        { icon: '🌆', text: 'Пойти в Окхасен', next: 'okhasen', condition: () => true }
      ],
      progress: '3',
      sound: 'wind'
    },

    // ----- ИСТОРИЯ ОТ ХЕВСУРА (доп.) -----
    hevsur_history: {
      id: 'hevsur_history',
      text: `<img src="${IMG_PATH}history.jpg" alt="История" loading="lazy" />
              Хевсур начинает рассказывать: «Много веков назад Марс был зелёным. Океаны плескались, и люди жили в мире.
              Но звёзды звали их. Они построили корабли и улетели. Остались только те, кто хранит память.
              <br><br>Ты — наследник этого знания. Не дай ему погибнуть.»`,
      onEnter: function() {
        addAchievement('📜 Узнал историю Марса');
        updateUI();
      },
      choices: [
        { icon: '📜', text: 'Спросить о пророчествах', next: 'prophecy', condition: () => true },
        { icon: '🗣️', text: 'Попросить научить языку', next: 'language', condition: () => !gameState.knowsLanguage },
        { icon: '🔮', text: 'Спросить о звёздной карте', next: 'starmap', condition: () => !gameState.hasMap }
      ],
      progress: '3',
      sound: 'fire'
    },

    // ----- ОБСЕРВАТОРИЯ -----
    observatory: {
      id: 'observatory',
      text: `<img src="${IMG_PATH}observatory.jpg" alt="Обсерватория" loading="lazy" />
              Вы поднимаетесь в горы и находите древнюю обсерваторию. Внутри — огромный телескоп, направленный в небо.
              <br><br>Вы смотрите в окуляр и видите созвездия, которые совпадают с картой. Одно из них особенно яркое — оно указывает на далёкую звезду.
              <br><br>Вы понимаете: <span class="highlight">Исход</span> — это не просто переселение. Это путь к новой родине.`,
      onEnter: function() {
        gameState.foundObservatory = true;
        addAchievement('🔭 Нашёл обсерваторию');
        if (!inventory.includes('Астролябий')) {
          inventory.push('Астролябий');
          updateUI();
        }
      },
      choices: [
        { icon: '⛵', text: 'Вернуться в порт и найти корабль', next: 'port', condition: () => true },
        { icon: '🏛️', text: 'Пойти в Академию к Талину', next: 'academy', condition: () => true }
      ],
      progress: '4',
      sound: 'wind'
    },

    // ----- ОКХАСЕН -----
    okhasen: {
      id: 'okhasen',
      text: `<img src="${IMG_PATH}okhasen.jpg" alt="Окхасен" loading="lazy" />
              Вы идёте по извилистой дороге к <span class="highlight">Окхасену</span>.
              Город встречает вас шумом порта и запахом рыбы. Повсюду снуют марсиане, кто-то торгует, кто-то готовит корабли к отплытию.
              <br><br>Вы стоите на площади. Куда направитесь?`,
      choices: [
        { icon: '⛵', text: 'Пойти в порт', next: 'port', condition: () => true },
        { icon: '🏛️', text: 'Пойти в Академию', next: 'academy', condition: () => true },
        { icon: '🔮', text: 'Поискать магазин древностей', next: 'antique', condition: () => !inventory.includes('Амулет Фарсиды') }
      ],
      progress: '2',
      sound: 'city'
    },

    // ----- АНТИКВАР (доп.) -----
    antique: {
      id: 'antique',
      text: `<img src="${IMG_PATH}antique.jpg" alt="Магазин древностей" loading="lazy" />
              Вы находите маленькую лавку, заваленную старыми вещами. Хозяин — старый марсианин — смотрит на вас хитро.
              <br><br>«Ищешь что-то особенное? У меня есть амулет Фарсиды — он защищает от бурь. Но он не продаётся. Отдаю только тем, кто докажет свою преданность Марсу.»
              <br><br>Вы показываете ему табличку. Он улыбается и отдаёт амулет.`,
      onEnter: function() {
        if (!inventory.includes('Амулет Фарсиды')) {
          inventory.push('Амулет Фарсиды');
          addAchievement('🛡️ Получил амулет Фарсиды');
          updateUI();
        }
      },
      choices: [
        { icon: '⛵', text: 'В порт', next: 'port', condition: () => true },
        { icon: '🏛️', text: 'В Академию', next: 'academy', condition: () => true }
      ],
      progress: '2',
      sound: 'city'
    },

    // ----- ПОРТ -----
    port: {
      id: 'port',
      text: function(name) {
        let extra = '';
        if (inventory.includes('Астролябий')) {
          extra = 'Вы показываете астролябий капитану. Он удивлён: «Это древний навигационный инструмент! С ним мы точно не собьёмся с пути.»';
        }
        return `<img src="${IMG_PATH}port.jpg" alt="Порт" loading="lazy" />
                В порту кипит жизнь. Капитан корабля «Звёздный ветер» смотрит на вас с усмешкой.
                <br><br>«Мальчик, ты ищешь путь к звёздам? Это не игрушки. Там, за небом, — только холод и тьма.
                Но если ты готов — мы отплываем на рассвете.»
                <br><br>${extra}
                <br><br>Вы смотрите на море, в котором отражается красное небо.`;
      },
      onEnter: function() {
        addAchievement('⛵ Посетил порт');
        updateUI();
      },
      choices: [
        { icon: '⛵', text: 'Согласиться и отплыть к звёздам', next: 'ending_stars', condition: () => true },
        { icon: '🏛️', text: 'Вернуться в Окхасен', next: 'okhasen', condition: () => true }
      ],
      progress: '3',
      sound: 'sea'
    },

    // ----- АКАДЕМИЯ -----
    academy: {
      id: 'academy',
      text: function(name) {
        let extra = '';
        if (inventory.includes('Звёздная карта')) {
          extra = 'Талин видит карту и восклицает: «Это же карта звёздного пути! Где ты её взял?»';
        }
        return `<img src="${IMG_PATH}academy.jpg" alt="Академия" loading="lazy" />
                В Академии вы видите молодого учёного, склонившегося над картами. Это <span class="highlight">Талин</span>.
                Он поднимает голову.
                <br><br>«Ах, ты пришёл! Я как раз искал помощника. Знаешь, я думаю, мы можем предсказать, когда наступит Исход.
                Поможешь мне с расчётами?»
                <br><br>${extra}
                <br><br>Он протягивает вам древний астролябий.`;
      },
      onEnter: function() {
        gameState.talinMet = true;
        addAchievement('👨‍🚀 Встретил Талина');
        if (!inventory.includes('Астролябий') && !gameState.foundObservatory) {
          inventory.push('Астролябий');
          updateUI();
        }
        updateUI();
      },
      choices: [
        { icon: '📐', text: 'Помочь Талину с расчётами', next: 'talin_calc', condition: () => true },
        { icon: '⛵', text: 'Отправиться в порт', next: 'port', condition: () => true }
      ],
      progress: '3',
      sound: 'city'
    },

    // ----- РАСЧЁТЫ ТАЛИНА -----
    talin_calc: {
      id: 'talin_calc',
      text: `<img src="${IMG_PATH}calc.jpg" alt="Расчёты" loading="lazy" />
              Вы помогаете Талину с вычислениями. Он говорит: «Посмотри! Созвездия сходятся. Я могу точно предсказать дату Исхода.
              <br><br>Но для этого нужна ещё одна вещь — амулет Фарсиды, чтобы защитить корабли от бурь.»
              <br><br>У вас есть амулет?`,
      onEnter: function() {
        addAchievement('📐 Помог Талину');
        updateUI();
      },
      choices: [
        { icon: '🛡️', text: 'Отдать амулет Талину (если есть)', next: 'ending_science', condition: () => inventory.includes('Амулет Фарсиды') },
        { icon: '⛵', text: 'Пойти в порт и попытаться улететь без амулета', next: 'ending_stars', condition: () => true },
        { icon: '🏔️', text: 'Вернуться к Хевсуру за советом', next: 'hevsur', condition: () => true }
      ],
      progress: '4',
      sound: 'city'
    },

    // ============================================================
    // КОНЦОВКИ (8 штук)
    // ============================================================
    ending_stars: {
      id: 'ending_stars',
      end: true,
      endIcon: '⛵',
      endTitle: 'Путь к звёздам',
      endText: function(name) {
        let msg = `Вы поднимаетесь на борт «Звёздного ветра». Корабль отчаливает, и Марс становится маленькой красной точкой. Вы летите к звёздам, неся с собой знание о глине, языке и пророчестве.`;
        if (inventory.includes('Амулет Фарсиды')) {
          msg += ' Амулет защищает вас от бурь, и путь оказывается безопасным.';
        }
        if (gameState.knowsLanguage) {
          msg += ' Вы помните древние слова — они будут вашим компасом.';
        }
        return msg;
      },
      endLink: BASE_URL + '/geography/acidalia-sea/',
      endLinkText: '🌊 Узнать об Ацидалийском море',
      onEnter: function() {
        addAchievement('🚀 Отправился к звёздам');
        updateUI();
      },
      progress: '5',
      sound: 'sea'
    },

    ending_science: {
      id: 'ending_science',
      end: true,
      endIcon: '🔭',
      endTitle: 'Во имя науки',
      endText: function(name) {
        let msg = `Вы отдаёте амулет Талину. Вместе вы завершаете расчёты и предсказываете точную дату Исхода. Ты становишься первым астрономом новой эры.`;
        if (gameState.foundObservatory) {
          msg += ' Вы также связали данные обсерватории с расчётами — теперь карта звёздного пути полностью ясна.';
        }
        return msg;
      },
      endLink: BASE_URL + '/people/talin/',
      endLinkText: '👨‍🚀 Узнать о Талине',
      onEnter: function() {
        addAchievement('🔭 Стал астрономом');
        updateUI();
      },
      progress: '5',
      sound: 'city'
    },

    ending_guardian: {
      id: 'ending_guardian',
      end: true,
      endIcon: '🏔️',
      endTitle: 'Хранитель пещер',
      endText: function(name) {
        let msg = `Вы решаете остаться с Хевсуром. Вы становитесь хранителем знаний, учитесь читать таблички и передаёте древнюю мудрость новым поколениям.`;
        if (gameState.knowsLanguage) {
          msg += ' Вы знаете марсианский язык, и вам доверяют самые древние тексты.';
        }
        return msg;
      },
      endLink: BASE_URL + '/history/periodization/',
      endLinkText: '📖 Читать о периодах марсианской истории',
      onEnter: function() {
        addAchievement('🏔️ Стал хранителем пещер');
        updateUI();
      },
      progress: '5',
      sound: 'fire'
    },

    ending_prophet: {
      id: 'ending_prophet',
      end: true,
      endIcon: '🌟',
      endTitle: 'Пророк Исхода',
      endText: function(name) {
        let msg = `Вы объединяете знания Хевсура, Талина и звёздную карту. Вы собираете народ и ведёте его к звёздам. Вы — пророк Исхода, тот, кто указал путь.`;
        if (inventory.includes('Амулет Фарсиды')) {
          msg += ' Амулет защищает караван от бурь.';
        }
        return msg;
      },
      endLink: BASE_URL + '/',
      endLinkText: '🏠 Вернуться на главную',
      onEnter: function() {
        addAchievement('🌟 Стал пророком');
        updateUI();
      },
      progress: '5',
      sound: 'wind'
    },

    ending_hermit: {
      id: 'ending_hermit',
      end: true,
      endIcon: '🏜️',
      endTitle: 'Отшельник Фарсиды',
      endText: function(name) {
        return `Вы отвергаете пророчество и уходите в пустыню. Вы живёте в одиночестве, созерцая звёзды. Иногда вы вспоминаете о табличке и улыбаетесь — вы знаете, что правда где-то рядом.`;
      },
      endLink: BASE_URL + '/geography/farsida/',
      endLinkText: '🏔️ Узнать о Фарсиде',
      onEnter: function() {
        addAchievement('🏜️ Стал отшельником');
        updateUI();
      },
      progress: '5',
      sound: 'wind'
    },

    ending_ambassador: {
      id: 'ending_ambassador',
      end: true,
      endIcon: '🤝',
      endTitle: 'Посол Марса',
      endText: function(name) {
        return `Вы решаете остаться на Марсе и стать послом между теми, кто улетает, и теми, кто остаётся. Вы передаёте знания и помогаете строить мосты между мирами.`;
      },
      endLink: BASE_URL + '/geography/okhasen/',
      endLinkText: '🌆 Узнать об Окхасене',
      onEnter: function() {
        addAchievement('🤝 Стал послом');
        updateUI();
      },
      progress: '5',
      sound: 'city'
    },

    ending_rebel: {
      id: 'ending_rebel',
      end: true,
      endIcon: '🔥',
      endTitle: 'Пепел Исхода',
      endText: function(name) {
        return `Вы сжигаете табличку и уходите в ночь. Вы решаете, что знание должно умереть вместе с вами. Но пепел разносится по ветру, и кто-то другой найдёт его и прочитает...`;
      },
      endLink: BASE_URL + '/history/',
      endLinkText: '📖 Исследовать историю Марса',
      onEnter: function() {
        addAchievement('🔥 Сжёг табличку');
        updateUI();
      },
      progress: '5',
      sound: 'fire'
    }
  };

  // ============================================================
  // 5. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  // ============================================================
  function addAchievement(text) {
    if (!achievements.includes(text)) {
      achievements.push(text);
      showAchievementToast(text);
      updateUI();
    }
  }

  function showAchievementToast(text) {
    const toast = document.createElement('div');
    toast.className = 'toast-achievement';
    toast.textContent = '🏆 ' + text;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function updateUI() {
    // Инвентарь
    if (inventory.length > 0) {
      inventoryEl.classList.remove('hidden');
      inventoryListEl.textContent = inventory.join(', ');
    } else {
      inventoryEl.classList.add('hidden');
    }
    // Достижения
    if (achievements.length > 0) {
      achievementsEl.classList.remove('hidden');
      achievementsListEl.innerHTML = achievements.map(a => `<div class="achievement-item">${a}</div>`).join('');
    } else {
      achievementsEl.classList.add('hidden');
    }
  }

  // ============================================================
  // 6. ЭФФЕКТ ПЕЧАТИ
  // ============================================================
  function typeText(element, text, speed = 25) {
    if (typingInterval) clearInterval(typingInterval);
    element.innerHTML = '';
    let index = 0;
    const chars = text.split('');
    // Добавляем поддержку HTML-тегов: разбиваем по тегам
    // Упрощённо: если текст содержит <, то выводим сразу (для картинок)
    if (text.includes('<img') || text.includes('<br>') || text.includes('<span')) {
      element.innerHTML = text;
      return;
    }
    typingInterval = setInterval(() => {
      if (index < chars.length) {
        element.textContent += chars[index];
        index++;
      } else {
        clearInterval(typingInterval);
        typingInterval = null;
      }
    }, speed);
  }

  // ============================================================
  // 7. ЗВУКИ
  // ============================================================
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
          data[i] = (wave + noise) * (1 - i / bufferSize);
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
      source.onended = () => { if (soundEnabled) setTimeout(loop, 300); };
    }
    loop();
  }

  function stopAmbientSound() {
    soundNodes.forEach(node => { try { node.stop(); node.disconnect(); } catch(e) {} });
    soundNodes = [];
  }

  function toggleSound() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e) { alert('Ваш браузер не поддерживает звук'); return; }
    }
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔇' : '🔊';
    if (soundEnabled && currentSound) playAmbientSound(currentSound);
    else stopAmbientSound();
  }

  // ============================================================
  // 8. СОХРАНЕНИЕ / ЗАГРУЗКА
  // ============================================================
  function saveGame() {
    const data = {
      playerName,
      currentId,
      history,
      inventory,
      gameState,
      achievements
    };
    try {
      localStorage.setItem('mars_story_save', JSON.stringify(data));
    } catch(e) {}
  }

  function loadGame() {
    const raw = localStorage.getItem('mars_story_save');
    if (!raw) return false;
    try {
      const data = JSON.parse(raw);
      playerName = data.playerName || '';
      currentId = data.currentId || 'nameInput';
      history = data.history || [];
      inventory = data.inventory || [];
      gameState = Object.assign({ hasMap: false, knowsLanguage: false, talinMet: false, hevsurTrust: 0, storm: false, gaveAmulet: false, foundObservatory: false }, data.gameState);
      achievements = data.achievements || [];
      return true;
    } catch(e) {
      return false;
    }
  }

  // ============================================================
  // 9. ОТРИСОВКА
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
      document.getElementById('name-input-field').addEventListener('keydown', (e) => { if (e.key === 'Enter') submitName(); });
      progressEl.textContent = 'Вступление';
      stopAmbientSound();
      updateUI();
      return;
    }

    const scene = STORY[currentId];
    if (!scene) {
      contentEl.innerHTML = '<div class="story-text">❌ Ошибка: сцена не найдена</div>';
      return;
    }

    // Выполняем onEnter
    if (scene.onEnter) scene.onEnter();

    // Обновляем прогресс
    progressEl.textContent = 'Шаг ' + (scene.progress || '?');

    // Строим текст
    let text = typeof scene.text === 'function' ? scene.text(playerName) : scene.text;
    let html = `<div class="story-text" id="story-text-block">${text}</div>`;

    // Кнопки выбора
    if (scene.end) {
      // Концовка
      let endText = typeof scene.endText === 'function' ? scene.endText(playerName) : scene.endText;
      html += `
        <div class="story-end">
          <div class="end-icon">${scene.endIcon || '🎉'}</div>
          <div class="end-title">${scene.endTitle || 'Конец'}</div>
          <div class="end-text">${endText || 'Ваше путешествие завершено.'}</div>
          ${scene.endLink ? `<a href="${scene.endLink}" class="end-link">${scene.endLinkText || '📖 Читать далее'}</a>` : ''}
        </div>
      `;
      isFinished = true;
    } else if (scene.choices && scene.choices.length > 0) {
      const available = scene.choices.filter(c => !c.condition || c.condition());
      if (available.length === 0) {
        // Если нет доступных выборов — показываем заглушку
        html += `<div class="story-choices"><button class="story-choice-btn" style="opacity:0.6;cursor:default;">Нет доступных вариантов</button></div>`;
      } else {
        html += `<div class="story-choices">`;
        available.forEach(choice => {
          html += `
            <button class="story-choice-btn" data-next="${choice.next}">
              <span class="choice-icon">${choice.icon || '➡️'}</span>
              <span class="choice-text">${choice.text}</span>
            </button>
          `;
        });
        html += `</div>`;
      }
      isFinished = false;
    }

    contentEl.innerHTML = html;

    // Звук
    if (scene.sound && scene.sound !== currentSound) {
      currentSound = scene.sound;
      if (soundEnabled) playAmbientSound(currentSound);
    }

    // Обработчики кнопок
    if (!scene.end) {
      document.querySelectorAll('.story-choice-btn[data-next]').forEach(btn => {
        btn.addEventListener('click', function() {
          const next = this.dataset.next;
          if (next && STORY[next]) {
            // Проверяем, не концовка ли это с условием для специальных концовок
            // Здесь можно добавить логику перехода на разные концовки в зависимости от состояния
            // Например, если мы идём к Хевсуру и у нас высокое доверие, можно перейти на концовку хранителя
            if (next === 'hevsur' && gameState.hevsurTrust >= 80 && inventory.includes('Звёздная карта')) {
              // Можем предложить особый диалог, но пока просто сохраняем
            }
            // Проверка на специальные концовки (можно расширить)
            if (next === 'ending_guardian' && !STORY[next]) {
              // если нет такой сцены, создаём
            }
            currentId = next;
            history.push(currentId);
            saveGame();
            render();
          }
        });
      });
    }

    // Обновляем UI
    updateUI();
  }

  // ============================================================
  // 10. ВВОД ИМЕНИ
  // ============================================================
  function submitName() {
    const nameField = document.getElementById('name-input-field');
    const name = nameField.value.trim() || 'Странник';
    playerName = name;
    currentId = 'start';
    history = ['start'];
    saveGame();
    render();
  }

  // ============================================================
  // 11. ПЕРЕЗАПУСК
  // ============================================================
  function restart() {
    localStorage.removeItem('mars_story_save');
    playerName = '';
    currentId = 'nameInput';
    history = [];
    inventory = [];
    gameState = { hasMap: false, knowsLanguage: false, talinMet: false, hevsurTrust: 0, storm: false, gaveAmulet: false, foundObservatory: false };
    achievements = [];
    isFinished = false;
    currentSound = null;
    stopAmbientSound();
    updateUI();
    render();
  }

  // ============================================================
  // 12. ИНИЦИАЛИЗАЦИЯ
  // ============================================================
  function init() {
    const loaded = loadGame();
    if (loaded && currentId !== 'nameInput') {
      // Есть сохранение
      render();
    } else {
      currentId = 'nameInput';
      playerName = '';
      history = [];
      inventory = [];
      gameState = { hasMap: false, knowsLanguage: false, talinMet: false, hevsurTrust: 0, storm: false, gaveAmulet: false, foundObservatory: false };
      achievements = [];
      render();
    }
    restartBtn.addEventListener('click', restart);
    soundToggle.addEventListener('click', toggleSound);
    // Обновляем UI
    updateUI();
    // Автосохранение при закрытии
    window.addEventListener('beforeunload', saveGame);
  }

  // Запуск
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
</script>
</body>
</html>
