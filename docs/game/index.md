---
hide:
  - navigation
  - toc
---

<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Марсианская империя</title>
<style>
/* ==========================================
   ОБЩИЕ СТИЛИ
   ========================================== */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #0a0605;
  font-family: 'Georgia', 'Times New Roman', serif;
  overflow: hidden;
  height: 100vh;
  color: #e8d5c0;
  user-select: none;
}

/* ==========================================
   ЗАГРУЗОЧНЫЙ ЭКРАН
   ========================================== */
#loader-screen {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 1000;
  background: #0a0605;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 1.2s ease, visibility 1.2s ease;
}
#loader-screen.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
#loader-screen video {
  max-width: 90vw;
  max-height: 70vh;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.7);
  border: 1px solid rgba(200,150,100,0.15);
  object-fit: cover;
}
#loader-title {
  color: #e8d5c0;
  font-size: 1.8rem;
  letter-spacing: 6px;
  margin-top: 24px;
  text-transform: uppercase;
  opacity: 0.7;
  font-weight: 300;
  text-shadow: 0 0 30px rgba(192,57,43,0.2);
}
#loader-progress {
  width: 300px;
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
}
#loader-progress-bar {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #c0392b, #e67e22);
  border-radius: 4px;
  transition: width 0.3s ease;
}
#play-btn {
  margin-top: 28px;
  padding: 14px 48px;
  background: rgba(192,57,43,0.8);
  color: #e8d5c0;
  border: 1px solid rgba(200,150,100,0.3);
  border-radius: 8px;
  font-size: 1.2rem;
  font-family: 'Georgia', serif;
  letter-spacing: 3px;
  cursor: pointer;
  opacity: 1;
  transition: all 0.5s ease;
  text-transform: uppercase;
}
#play-btn:hover {
  background: rgba(192,57,43,1);
  transform: scale(1.02);
  box-shadow: 0 0 30px rgba(192,57,43,0.3);
}
#skip-loading {
  margin-top: 12px;
  padding: 8px 24px;
  background: transparent;
  color: #887a6e;
  border: 1px solid rgba(200,150,100,0.15);
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.8rem;
  transition: all 0.3s;
}
#skip-loading:hover {
  color: #e8d5c0;
  border-color: rgba(200,150,100,0.3);
}

/* ==========================================
   ВЫБОР КОРОЛЕВСТВА
   ========================================== */
#kingdom-screen {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 999;
  background: #0a0605;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
#kingdom-screen.active { display: flex; }

#kingdom-screen h2 {
  color: #e8d5c0;
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  text-shadow: 0 0 40px rgba(192,57,43,0.15);
}

.kingdom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  max-width: 1000px;
  width: 100%;
  padding: 10px;
}
.kingdom-card {
  background: rgba(40,25,20,0.7);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(200,150,100,0.15);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #d4c5b5;
}
.kingdom-card:hover {
  transform: translateY(-6px);
  border-color: #c0392b;
  box-shadow: 0 8px 30px rgba(192,57,43,0.2);
  background: rgba(60,35,25,0.8);
}
.kingdom-card img {
  width: 60px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
  border: 1px solid rgba(200,150,100,0.15);
}
.kingdom-card .name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e8d5c0;
}
.kingdom-card .bonus {
  font-size: 0.8rem;
  color: #b8a088;
  margin-top: 4px;
}
.kingdom-card .desc {
  font-size: 0.75rem;
  color: #887a6e;
  margin-top: 6px;
  line-height: 1.3;
}

/* ==========================================
   ИГРОВОЙ ЭКРАН
   ========================================== */
#game-screen {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: #0a0605;
  z-index: 998;
}
#game-screen.active { display: block; }

#game-container {
  position: relative;
  width: 100%;
  height: 100%;
}

#game-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

/* ===== ИНТЕРФЕЙС ИГРЫ ===== */
.game-ui-top {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  z-index: 10;
  pointer-events: none;
}
.game-ui-top > * { pointer-events: auto; }

.game-panel {
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(200,150,100,0.15);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.game-panel .kingdom-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e8d5c0;
}
.game-panel .kingdom-label {
  font-size: 0.6rem;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.resources {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.resource-item {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.85rem;
  color: #d4c5b5;
}
.resource-item .icon { font-size: 1rem; }
.resource-item .value { font-weight: 600; color: #e8d5c0; }

.population {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: #d4c5b5;
  border-left: 1px solid rgba(200,150,100,0.15);
  padding-left: 10px;
}

/* ===== КНОПКИ СТРОИТЕЛЬСТВА ===== */
.game-build-menu {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(200,150,100,0.15);
  z-index: 10;
  max-width: 95%;
}
.build-btn {
  padding: 8px 14px;
  background: rgba(192,57,43,0.5);
  color: #e8d5c0;
  border: 1px solid rgba(200,150,100,0.2);
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.75rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 60px;
}
.build-btn:hover {
  background: rgba(192,57,43,0.8);
  transform: scale(1.05);
  border-color: #c0392b;
}
.build-btn .cost {
  font-size: 0.5rem;
  opacity: 0.6;
}
.build-btn .level {
  font-size: 0.5rem;
  color: #b8a088;
}
.build-btn .time {
  font-size: 0.5rem;
  color: #f39c12;
}

/* ===== КНОПКА ЗАКРЫТЬ ===== */
#close-game {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(200,150,100,0.2);
  color: #e8d5c0;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.75rem;
  z-index: 11;
  transition: all 0.3s;
}
#close-game:hover {
  background: rgba(192,57,43,0.6);
  border-color: #c0392b;
}

/* ===== ИНФОРМАЦИЯ О ПОСТРОЙКЕ ===== */
#building-info {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid rgba(200,150,100,0.15);
  color: #d4c5b5;
  font-size: 0.85rem;
  text-align: center;
  z-index: 9;
  max-width: 90%;
  display: none;
}
#building-info .title {
  color: #e8d5c0;
  font-weight: 600;
  font-size: 1rem;
}
#building-info .details {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 4px;
}

/* ==========================================
   УВЕДОМЛЕНИЯ (TOAST)
   ========================================== */
.toast-container {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}
.toast {
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  color: #e8d5c0;
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid rgba(200,150,100,0.15);
  font-family: 'Georgia', serif;
  font-size: 0.9rem;
  animation: toastAnim 2.5s ease forwards;
  pointer-events: auto;
}
.toast.success { border-color: rgba(46,204,113,0.3); }
.toast.error { border-color: rgba(231,76,60,0.3); }
.toast.info { border-color: rgba(52,152,219,0.3); }

@keyframes toastAnim {
  0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
  15% { opacity: 1; transform: translateY(0) scale(1); }
  85% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-20px) scale(0.95); }
}

/* ==========================================
   АДАПТАЦИЯ
   ========================================== */
@media (max-width: 768px) {
  #loader-title { font-size: 1.2rem; letter-spacing: 3px; }
  #play-btn { padding: 12px 32px; font-size: 1rem; }
  .kingdom-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  #kingdom-screen h2 { font-size: 1.4rem; letter-spacing: 4px; }
  .game-ui-top { flex-direction: column; align-items: stretch; gap: 4px; }
  .game-panel { padding: 6px 10px; flex-wrap: wrap; }
  .resources { gap: 6px; }
  .resource-item { font-size: 0.75rem; }
  .game-build-menu { bottom: 12px; padding: 8px 10px; gap: 4px; width: 98%; }
  .build-btn { padding: 4px 8px; font-size: 0.65rem; min-width: 45px; }
  .game-panel .kingdom-name { font-size: 0.9rem; }
  #close-game { top: 8px; right: 8px; padding: 4px 8px; font-size: 0.65rem; }
  .toast { font-size: 0.75rem; padding: 6px 12px; }
  #building-info { bottom: 80px; padding: 8px 14px; font-size: 0.75rem; }
  .population { font-size: 0.75rem; padding-left: 6px; }
}
@media (max-width: 480px) {
  .kingdom-grid { grid-template-columns: 1fr 1fr; }
  .kingdom-card { padding: 10px; }
  #loader-screen video { max-height: 50vh; }
  .build-btn .cost { font-size: 0.45rem; }
}
</style>
</head>
<body>

<!-- ===== ЗАГРУЗОЧНЫЙ ЭКРАН ===== -->
<div id="loader-screen">
  <video id="loader-video" autoplay muted playsinline>
    <source src="/assets/images/loader-bg.mp4" type="video/mp4">
  </video>
  <div id="loader-title">Марсианская империя</div>
  <div id="loader-progress"><div id="loader-progress-bar"></div></div>
  <button id="play-btn" onclick="showKingdoms()">🌌 Начать игру</button>
  <button id="skip-loading" onclick="skipLoading()">Пропустить загрузку</button>
</div>

<!-- ===== ВЫБОР КОРОЛЕВСТВА ===== -->
<div id="kingdom-screen">
  <h2>Выбери своё королевство</h2>
  <div class="kingdom-grid" id="kingdom-grid"></div>
</div>

<!-- ===== ИГРОВОЙ ЭКРАН ===== -->
<div id="game-screen">
  <button id="close-game" onclick="closeGame()">✕ Выйти</button>
  <div id="game-container">
    <img id="game-bg" src="/assets/images/mars-field.jpg" alt="Марс">
    
    <!-- Верхняя панель -->
    <div class="game-ui-top">
      <div class="game-panel">
        <div>
          <div class="kingdom-label">Королевство</div>
          <div class="kingdom-name" id="game-kingdom-name">—</div>
        </div>
        <div class="population">
          <span>👥</span>
          <span id="population-count">2</span>
          <span style="font-size:0.6rem;opacity:0.5;">(1 вождь, 1 рабочий)</span>
        </div>
      </div>
      <div class="game-panel">
        <div class="resources">
          <div class="resource-item"><span class="icon">🌲</span> <span class="value" id="res-wood">20</span></div>
          <div class="resource-item"><span class="icon">🍖</span> <span class="value" id="res-food">15</span></div>
          <div class="resource-item"><span class="icon">🪨</span> <span class="value" id="res-basalt">5</span></div>
          <div class="resource-item"><span class="icon">📜</span> <span class="value" id="res-tablets">0</span></div>
        </div>
      </div>
    </div>

    <!-- Информация о постройке -->
    <div id="building-info">
      <div class="title" id="building-title">Шахта</div>
      <div class="details" id="building-details">Добывает базальт</div>
    </div>

    <!-- Меню строительства -->
    <div class="game-build-menu">
      <button class="build-btn" onclick="buildBuilding('mine')" onmouseenter="showBuildingInfo('mine')" onmouseleave="hideBuildingInfo()">
        ⛏️ Шахта
        <span class="cost">🌲5 🍖3</span>
        <span class="level" id="mine-level">Ур.0</span>
        <span class="time">⏱ 5с</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('forge')" onmouseenter="showBuildingInfo('forge')" onmouseleave="hideBuildingInfo()">
        ⚒️ Кузница
        <span class="cost">🌲8 🪨3</span>
        <span class="level" id="forge-level">Ур.0</span>
        <span class="time">⏱ 8с</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('house')" onmouseenter="showBuildingInfo('house')" onmouseleave="hideBuildingInfo()">
        🏠 Дом
        <span class="cost">🌲10 🍖5</span>
        <span class="level" id="house-level">Ур.0</span>
        <span class="time">⏱ 6с</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('farm')" onmouseenter="showBuildingInfo('farm')" onmouseleave="hideBuildingInfo()">
        🌾 Ферма
        <span class="cost">🌲6 🍖4</span>
        <span class="level" id="farm-level">Ур.0</span>
        <span class="time">⏱ 4с</span>
      </button>
      <button class="build-btn" onclick="createTablet()" style="background:rgba(192,57,43,0.7);" onmouseenter="showBuildingInfo('tablet')" onmouseleave="hideBuildingInfo()">
        📜 Табличка
        <span class="cost">🌲2 🍖1 🪨1</span>
        <span class="level" style="color:#f39c12;">+10 опыта</span>
      </button>
      <button class="build-btn" onclick="collectResources()" style="background:rgba(46,204,113,0.3);">
        📦 Сбор
        <span class="cost">каждые 10с</span>
      </button>
    </div>
  </div>
</div>

<!-- ===== КОНТЕЙНЕР ДЛЯ УВЕДОМЛЕНИЙ ===== -->
<div class="toast-container" id="toast-container"></div>

<!-- ==========================================
   JAVASCRIPT
   ========================================== -->
<script>
// ===== КОРОЛЕВСТВА =====
const KINGDOMS = [
  { name: 'Аркадия', flag: '/assets/images/map/flag-of-arkadia.png', bonus: '+5 к базальту', desc: 'Древние руины и артефакты' },
  { name: 'Ксанф', flag: '/assets/images/coat-of-arms-of-ksanf.png', bonus: '+5 к железу', desc: 'Подземные шахты и крепости' },
  { name: 'Эдем', flag: '/assets/images/flag-of-eden.jpg', bonus: '+5 к еде', desc: 'Плодородные сады и оранжереи' },
  { name: 'Эридания', flag: '/assets/images/flag-of-eridania.png', bonus: '+5 к дереву', desc: 'Озёра и древние каналы' },
  { name: 'Кхонг', flag: '/assets/images/flag-of-khong.png', bonus: '+5 к базальту', desc: 'Пустыни и глубокие шахты' },
  { name: 'Авсония', flag: '/assets/images/flag-of-avsonia.png', bonus: '+5 к дереву', desc: 'Ледяные пещеры и кристаллы' },
  { name: 'Кимерия', flag: '/assets/images/flag-of-kimeria.png', bonus: '+5 к еде', desc: 'Вулканические плато' },
  { name: 'Серпентида', flag: '/assets/images/flag-of-serpentida.png', bonus: '+5 к базальту', desc: 'Змеевидные каньоны' },
  { name: 'Эритрей', flag: '/assets/images/flag-of-eritrea.png', bonus: '+5 к дереву', desc: 'Обсерватории и каньоны' },
  { name: 'Утопия', flag: '/assets/images/flag-of-utopia.png', bonus: '+5 к еде', desc: 'Равнины и кратеры' },
  { name: 'Элла达', flag: '/assets/images/flag-of-hellas.png', bonus: '+5 к базальту', desc: 'Термальные источники' },
  { name: 'Аливасото', flag: '/assets/images/flag-of-alivasoto.png', bonus: '+5 к дереву', desc: 'Марсианские "леса"' }
];

// ===== СОСТОЯНИЕ ИГРЫ =====
let gameState = {
  kingdom: null,
  resources: { wood: 20, food: 15, basalt: 5, tablets: 0 },
  buildings: { mine: 0, forge: 0, house: 0, farm: 0 },
  buildingLevels: { mine: 0, forge: 0, house: 0, farm: 0 },
  population: 2,
  userId: null,
  lastCollect: Date.now()
};

// ===== ИНФОРМАЦИЯ О ПОСТРОЙКАХ =====
const BUILDING_INFO = {
  mine: { title: '⛏️ Шахта', desc: 'Добывает базальт. Уровень влияет на добычу.' },
  forge: { title: '⚒️ Кузница', desc: 'Перерабатывает базальт в глиняные таблички.' },
  house: { title: '🏠 Дом', desc: 'Увеличивает численность рабочих.' },
  farm: { title: '🌾 Ферма', desc: 'Производит еду для населения.' },
  tablet: { title: '📜 Глиняная табличка', desc: 'Даёт +10 опыта и продвигает историю.' }
};

// ===== ЗАГРУЗОЧНЫЙ ЭКРАН =====
const video = document.getElementById('loader-video');
const progressBar = document.getElementById('loader-progress-bar');
const playBtn = document.getElementById('play-btn');

if (video) {
  video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = progress + '%';
  });
  video.addEventListener('ended', () => {
    progressBar.style.width = '100%';
  });
}

function skipLoading() {
  document.getElementById('loader-screen').classList.add('hidden');
  showKingdoms();
}

// ===== ПОКАЗАТЬ ВЫБОР КОРОЛЕВСТВА =====
function showKingdoms() {
  document.getElementById('loader-screen').classList.add('hidden');
  const screen = document.getElementById('kingdom-screen');
  screen.classList.add('active');

  const grid = document.getElementById('kingdom-grid');
  grid.innerHTML = '';
  KINGDOMS.forEach(k => {
    const card = document.createElement('div');
    card.className = 'kingdom-card';
    card.innerHTML = `
      <img src="${k.flag}" alt="${k.name}" loading="lazy" onerror="this.src='/assets/images/placeholder-flag.png'">
      <div class="name">${k.name}</div>
      <div class="bonus">${k.bonus}</div>
      <div class="desc">${k.desc}</div>
    `;
    card.onclick = () => selectKingdom(k);
    grid.appendChild(card);
  });
}

// ===== ВЫБОР КОРОЛЕВСТВА =====
function selectKingdom(kingdom) {
  gameState.kingdom = kingdom.name;
  
  // Бонус за выбор
  const bonusMap = {
    'базальту': 'basalt',
    'дереву': 'wood',
    'еде': 'food',
    'железу': 'basalt'
  };
  const bonusKey = bonusMap[kingdom.bonus.replace('+5 к ', '')] || 'basalt';
  gameState.resources[bonusKey] += 5;

  document.getElementById('kingdom-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
  document.getElementById('game-kingdom-name').textContent = kingdom.name;
  
  updateUI();
  saveGame();
  showToast(`👑 Добро пожаловать в ${kingdom.name}! Бонус получен!`, 'success');
}

// ===== ИНФОРМАЦИЯ О ПОСТРОЙКЕ =====
function showBuildingInfo(type) {
  const info = BUILDING_INFO[type];
  if (!info) return;
  const el = document.getElementById('building-info');
  document.getElementById('building-title').textContent = info.title;
  document.getElementById('building-details').textContent = info.desc;
  el.style.display = 'block';
}

function hideBuildingInfo() {
  document.getElementById('building-info').style.display = 'none';
}

// ===== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА =====
function updateUI() {
  const r = gameState.resources;
  document.getElementById('res-wood').textContent = Math.floor(r.wood);
  document.getElementById('res-food').textContent = Math.floor(r.food);
  document.getElementById('res-basalt').textContent = Math.floor(r.basalt);
  document.getElementById('res-tablets').textContent = Math.floor(r.tablets);
  document.getElementById('population-count').textContent = gameState.population;
  
  // Уровни построек
  document.getElementById('mine-level').textContent = `Ур.${gameState.buildingLevels.mine}`;
  document.getElementById('forge-level').textContent = `Ур.${gameState.buildingLevels.forge}`;
  document.getElementById('house-level').textContent = `Ур.${gameState.buildingLevels.house}`;
  document.getElementById('farm-level').textContent = `Ур.${gameState.buildingLevels.farm}`;
}

// ===== СТРОИТЕЛЬСТВО =====
function buildBuilding(type) {
  const costs = {
    mine: { wood: 5, food: 3, basalt: 0 },
    forge: { wood: 8, basalt: 3, food: 0 },
    house: { wood: 10, food: 5, basalt: 0 },
    farm: { wood: 6, food: 4, basalt: 0 }
  };
  
  const cost = costs[type];
  if (!cost) return;
  
  for (const [res, amount] of Object.entries(cost)) {
    if (gameState.resources[res] < amount) {
      showToast(`❌ Не хватает ${res}!`, 'error');
      return;
    }
  }
  
  for (const [res, amount] of Object.entries(cost)) {
    gameState.resources[res] -= amount;
  }
  
  gameState.buildings[type] += 1;
  gameState.buildingLevels[type] += 1;
  
  // Если построили дом — добавляем рабочего
  if (type === 'house') {
    gameState.population += 1;
    showToast(`👷 Новый рабочий прибыл! Население: ${gameState.population}`, 'success');
  }
  
  const names = { mine: 'Шахта', forge: 'Кузница', house: 'Дом', farm: 'Ферма' };
  showToast(`🏗️ Построена ${names[type]}! Уровень: ${gameState.buildingLevels[type]}`, 'success');
  
  if (typeof window.addExperience === 'function' && gameState.userId) {
    window.addExperience(gameState.userId, 5);
  }
  
  updateUI();
  saveGame();
}

// ===== СОЗДАНИЕ ТАБЛИЧКИ =====
function createTablet() {
  const cost = { wood: 2, food: 1, basalt: 1 };
  
  for (const [res, amount] of Object.entries(cost)) {
    if (gameState.resources[res] < amount) {
      showToast(`❌ Не хватает ${res}!`, 'error');
      return;
    }
  }
  
  for (const [res, amount] of Object.entries(cost)) {
    gameState.resources[res] -= amount;
  }
  
  gameState.resources.tablets += 1;
  
  if (typeof window.addExperience === 'function' && gameState.userId) {
    window.addExperience(gameState.userId, 10);
  }
  
  showToast(`📜 Создана глиняная табличка! (+10 опыта)`, 'success');
  updateUI();
  saveGame();
}

// ===== СБОР РЕСУРСОВ =====
function collectResources() {
  const now = Date.now();
  const elapsed = (now - gameState.lastCollect) / 1000;
  if (elapsed < 5) {
    showToast(`⏳ Подождите ${Math.ceil(5 - elapsed)}с до следующего сбора`, 'info');
    return;
  }
  
  const b = gameState.buildings;
  const r = gameState.resources;
  
  // Добыча от построек
  r.wood += b.farm * 1 + b.house * 0.5;
  r.food += b.farm * 2 + b.house * 1;
  r.basalt += b.mine * 2 + b.forge * 0.5;
  
  // Бонус от населения
  r.wood += Math.floor(gameState.population / 3);
  r.food += Math.floor(gameState.population / 2);
  
  showToast(`📦 Собрано: 🌲${Math.floor(r.wood)} 🍖${Math.floor(r.food)} 🪨${Math.floor(r.basalt)}`, 'success');
  gameState.lastCollect = now;
  updateUI();
  saveGame();
}

// ===== АВТОМАТИЧЕСКАЯ ДОБЫЧА =====
setInterval(() => {
  if (!gameState.kingdom) return;
  
  const b = gameState.buildings;
  const r = gameState.resources;
  const levelBonus = (type) => gameState.buildingLevels[type] * 0.2;
  
  r.wood += b.mine * 0.2 + b.farm * 0.3 + levelBonus('mine');
  r.food += b.farm * 0.4 + levelBonus('farm');
  r.basalt += b.mine * 0.3 + b.forge * 0.1 + levelBonus('forge');
  
  updateUI();
}, 10000);

// ===== СОХРАНЕНИЕ В SUPABASE =====
async function saveGame() {
  if (!gameState.userId) {
    const client = supabase.createClient(
      'https://ncytbgbzfjfoqmmgfygz.supabase.co',
      'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );
    const { data } = await client.auth.getSession();
    if (data?.session?.user) {
      gameState.userId = data.session.user.id;
    } else {
      return;
    }
  }
  
  try {
    const client = supabase.createClient(
      'https://ncytbgbzfjfoqmmgfygz.supabase.co',
      'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );
    
    const { error } = await client
      .from('profiles')
      .update({ game_data: gameState })
      .eq('user_id', gameState.userId);
      
    if (error) console.warn('⚠️ Ошибка сохранения:', error);
  } catch (e) {
    console.warn('⚠️ Ошибка сохранения:', e);
  }
}

// ===== ЗАГРУЗКА ИГРЫ =====
async function loadGame() {
  const client = supabase.createClient(
    'https://ncytbgbzfjfoqmmgfygz.supabase.co',
    'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
  );
  
  const { data } = await client.auth.getSession();
  if (!data?.session?.user) return;
  
  gameState.userId = data.session.user.id;
  
  try {
    const { data: profile } = await client
      .from('profiles')
      .select('game_data')
      .eq('user_id', gameState.userId)
      .single();
      
    if (profile?.game_data) {
      const saved = profile.game_data;
      gameState.kingdom = saved.kingdom || null;
      gameState.resources = saved.resources || { wood: 20, food: 15, basalt: 5, tablets: 0 };
      gameState.buildings = saved.buildings || { mine: 0, forge: 0, house: 0, farm: 0 };
      gameState.buildingLevels = saved.buildingLevels || { mine: 0, forge: 0, house: 0, farm: 0 };
      gameState.population = saved.population || 2;
      
      if (gameState.kingdom) {
        document.getElementById('game-kingdom-name').textContent = gameState.kingdom;
        document.getElementById('game-screen').classList.add('active');
        document.getElementById('kingdom-screen').classList.remove('active');
        document.getElementById('loader-screen').classList.add('hidden');
        updateUI();
        showToast(`👑 Добро пожаловать обратно в ${gameState.kingdom}!`, 'info');
      }
    }
  } catch (e) {
    console.warn('⚠️ Ошибка загрузки:', e);
  }
}

// ===== ВЫХОД ИЗ ИГРЫ =====
function closeGame() {
  if (confirm('Вы уверены, что хотите выйти из игры?')) {
    saveGame();
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('kingdom-screen').classList.add('active');
    showToast('💾 Прогресс сохранён!', 'info');
  }
}

// ===== УВЕДОМЛЕНИЯ (TOAST) =====
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', function() {
  if (typeof supabase !== 'undefined') {
    loadGame();
  } else {
    console.warn('⚠️ Supabase не загружен');
  }
});

window.buildBuilding = buildBuilding;
window.createTablet = createTablet;
window.collectResources = collectResources;
window.showKingdoms = showKingdoms;
window.selectKingdom = selectKingdom;
window.closeGame = closeGame;
window.saveGame = saveGame;
window.updateUI = updateUI;
window.showToast = showToast;
window.showBuildingInfo = showBuildingInfo;
window.hideBuildingInfo = hideBuildingInfo;
window.skipLoading = skipLoading;
</script>
</body>
</html>
