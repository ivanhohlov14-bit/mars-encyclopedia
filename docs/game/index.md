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
  overflow: hidden;
}

#game-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

/* ===== ВЕРХНЯЯ ПЛАШКА С РЕСУРСАМИ ===== */
#top-bar {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(10px);
  padding: 8px 20px;
  border-radius: 12px;
  border: 1px solid rgba(200,150,100,0.15);
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  z-index: 20;
  justify-content: center;
  width: 95%;
  max-width: 700px;
}
#top-bar .kingdom-name {
  font-size: 1rem;
  font-weight: 600;
  color: #e8d5c0;
  white-space: nowrap;
}
#top-bar .resources {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
#top-bar .resource-item {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.8rem;
  color: #d4c5b5;
}
#top-bar .resource-item .icon { font-size: 0.9rem; }
#top-bar .resource-item .value { font-weight: 600; color: #e8d5c0; }
#top-bar .population {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: #d4c5b5;
  border-left: 1px solid rgba(200,150,100,0.15);
  padding-left: 10px;
}

/* ===== КНОПКИ ВКЛАДОК ===== */
#tabs {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 15;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(200,150,100,0.15);
  flex-wrap: wrap;
  justify-content: center;
}
.tab-btn {
  padding: 6px 14px;
  background: rgba(192,57,43,0.3);
  color: #d4c5b5;
  border: 1px solid rgba(200,150,100,0.1);
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.75rem;
  transition: all 0.3s;
}
.tab-btn:hover {
  background: rgba(192,57,43,0.6);
  color: #e8d5c0;
}
.tab-btn.active {
  background: rgba(192,57,43,0.8);
  color: #fff;
  border-color: #c0392b;
}
.tab-btn .icon { margin-right: 4px; }

/* ===== ПАНЕЛЬ ПОСТРОЕК ===== */
#build-panel {
  position: absolute;
  bottom: 130px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(200,150,100,0.15);
  display: none;
  z-index: 14;
  width: 95%;
  max-width: 600px;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
#build-panel.active { display: flex; }

.build-btn {
  padding: 8px 12px;
  background: rgba(192,57,43,0.4);
  color: #e8d5c0;
  border: 1px solid rgba(200,150,100,0.15);
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.7rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 60px;
  flex: 1;
  max-width: 90px;
}
.build-btn:hover {
  background: rgba(192,57,43,0.7);
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

/* ===== ГЛОБАЛЬНАЯ КАРТА ===== */
#global-map-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
#global-map-overlay.active { display: flex; }
#global-map-overlay img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 12px;
  border: 1px solid rgba(200,150,100,0.2);
}
#global-map-overlay .close-map {
  margin-top: 16px;
  padding: 8px 24px;
  background: rgba(192,57,43,0.6);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 1rem;
}
#global-map-overlay .close-map:hover {
  background: rgba(192,57,43,0.9);
}

/* ==========================================
   УВЕДОМЛЕНИЯ
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
  #top-bar { padding: 6px 12px; gap: 8px; }
  #top-bar .kingdom-name { font-size: 0.8rem; }
  #top-bar .resource-item { font-size: 0.7rem; }
  #tabs { bottom: 70px; padding: 6px 10px; }
  .tab-btn { font-size: 0.65rem; padding: 4px 10px; }
  #build-panel { bottom: 120px; padding: 8px 10px; gap: 4px; }
  .build-btn { font-size: 0.6rem; padding: 6px 8px; min-width: 50px; }
  #play-btn { padding: 10px 24px; font-size: 1rem; }
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
  <div id="game-container">
    <img id="game-bg" src="/assets/images/mars-field.jpg" alt="Марс">
    
    <!-- Верхняя плашка с ресурсами -->
    <div id="top-bar">
      <span class="kingdom-name" id="game-kingdom-name">—</span>
      <div class="resources">
        <span class="resource-item"><span class="icon">🌲</span> <span class="value" id="res-wood">20</span></span>
        <span class="resource-item"><span class="icon">🍖</span> <span class="value" id="res-food">15</span></span>
        <span class="resource-item"><span class="icon">🪨</span> <span class="value" id="res-basalt">5</span></span>
        <span class="resource-item"><span class="icon">📜</span> <span class="value" id="res-tablets">0</span></span>
      </div>
      <span class="population">👥 <span id="population-count">2</span></span>
    </div>

    <!-- Вкладки -->
    <div id="tabs">
      <button class="tab-btn active" onclick="switchTab('build')"><span class="icon">🏗️</span> Постройки</button>
      <button class="tab-btn" onclick="switchTab('map')"><span class="icon">🗺️</span> Карта</button>
      <button class="tab-btn" onclick="switchTab('army')"><span class="icon">⚔️</span> Армия</button>
      <button class="tab-btn" onclick="openGlobalMap()"><span class="icon">🌍</span> Глобальная карта</button>
    </div>

    <!-- Панель построек -->
    <div id="build-panel" class="active">
      <button class="build-btn" onclick="buildBuilding('mine')">
        ⛏️ Шахта
        <span class="cost">🌲5 🍖3</span>
        <span class="level" id="mine-level">Ур.0</span>
        <span class="time">⏱ 5с</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('forge')">
        ⚒️ Кузница
        <span class="cost">🌲8 🪨3</span>
        <span class="level" id="forge-level">Ур.0</span>
        <span class="time">⏱ 8с</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('house')">
        🏠 Дом
        <span class="cost">🌲10 🍖5</span>
        <span class="level" id="house-level">Ур.0</span>
        <span class="time">⏱ 6с</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('farm')">
        🌾 Ферма
        <span class="cost">🌲6 🍖4</span>
        <span class="level" id="farm-level">Ур.0</span>
        <span class="time">⏱ 4с</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('mill')">
        🌾 Мельница
        <span class="cost">🌲8 🍖6</span>
        <span class="level" id="mill-level">Ур.0</span>
        <span class="time">⏱ 7с</span>
      </button>
      <button class="build-btn" onclick="createTablet()" style="background:rgba(192,57,43,0.6);">
        📜 Табличка
        <span class="cost">🌲2 🍖1 🪨1</span>
        <span class="level" style="color:#f39c12;">+10 опыта</span>
      </button>
    </div>
  </div>
</div>

<!-- ===== ГЛОБАЛЬНАЯ КАРТА ===== -->
<div id="global-map-overlay">
  <h2 style="color:#e8d5c0;margin-bottom:16px;">🗺️ Глобальная карта Марса</h2>
  <img src="/assets/images/mars-map.png" alt="Глобальная карта Марса" id="global-map-img">
  <button class="close-map" onclick="closeGlobalMap()">✕ Закрыть карту</button>
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
  { name: 'Эллада', flag: '/assets/images/flag-of-hellas.png', bonus: '+5 к базальту', desc: 'Термальные источники' },
  { name: 'Аливасото', flag: '/assets/images/flag-of-alivasoto.png', bonus: '+5 к дереву', desc: 'Марсианские "леса"' }
];

// ===== СОСТОЯНИЕ ИГРЫ =====
let gameState = {
  kingdom: null,
  resources: { wood: 20, food: 15, basalt: 5, tablets: 0 },
  buildings: { mine: 0, forge: 0, house: 0, farm: 0, mill: 0 },
  buildingLevels: { mine: 0, forge: 0, house: 0, farm: 0, mill: 0 },
  population: 2,
  userId: null,
  lastCollect: Date.now()
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
  showToast(`👑 Добро пожаловать в ${kingdom.name}!`, 'success');
}

// ===== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК =====
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    if (b.textContent.includes('Постройки') && tab === 'build') b.classList.add('active');
    if (b.textContent.includes('Карта') && tab === 'map') b.classList.add('active');
    if (b.textContent.includes('Армия') && tab === 'army') b.classList.add('active');
  });
  
  const panel = document.getElementById('build-panel');
  panel.classList.toggle('active', tab === 'build');
  
  if (tab === 'map') {
    showToast('🗺️ Карта королевства будет доступна в следующем обновлении!', 'info');
  }
  if (tab === 'army') {
    showToast('⚔️ Армия будет доступна в следующем обновлении!', 'info');
  }
}

// ===== ГЛОБАЛЬНАЯ КАРТА =====
function openGlobalMap() {
  document.getElementById('global-map-overlay').classList.add('active');
}
function closeGlobalMap() {
  document.getElementById('global-map-overlay').classList.remove('active');
}

// ===== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА =====
function updateUI() {
  const r = gameState.resources;
  document.getElementById('res-wood').textContent = Math.floor(r.wood);
  document.getElementById('res-food').textContent = Math.floor(r.food);
  document.getElementById('res-basalt').textContent = Math.floor(r.basalt);
  document.getElementById('res-tablets').textContent = Math.floor(r.tablets);
  document.getElementById('population-count').textContent = gameState.population;
  
  document.getElementById('mine-level').textContent = `Ур.${gameState.buildingLevels.mine}`;
  document.getElementById('forge-level').textContent = `Ур.${gameState.buildingLevels.forge}`;
  document.getElementById('house-level').textContent = `Ур.${gameState.buildingLevels.house}`;
  document.getElementById('farm-level').textContent = `Ур.${gameState.buildingLevels.farm}`;
  document.getElementById('mill-level').textContent = `Ур.${gameState.buildingLevels.mill}`;
}

// ===== СТРОИТЕЛЬСТВО =====
function buildBuilding(type) {
  const costs = {
    mine: { wood: 5, food: 3, basalt: 0 },
    forge: { wood: 8, basalt: 3, food: 0 },
    house: { wood: 10, food: 5, basalt: 0 },
    farm: { wood: 6, food: 4, basalt: 0 },
    mill: { wood: 8, food: 6, basalt: 0 }
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
  
  if (type === 'house') {
    gameState.population += 1;
    showToast(`👷 Новый рабочий прибыл! Население: ${gameState.population}`, 'success');
  }
  
  const names = { mine: 'Шахта', forge: 'Кузница', house: 'Дом', farm: 'Ферма', mill: 'Мельница' };
  showToast(`🏗️ Построена ${names[type]}! Уровень: ${gameState.buildingLevels[type]}`, 'success');
  
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
  
  showToast(`📜 Создана табличка! (+10 опыта)`, 'success');
  updateUI();
  saveGame();
}

// ===== СОХРАНЕНИЕ =====
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

// ===== ЗАГРУЗКА =====
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
      gameState.buildings = saved.buildings || { mine: 0, forge: 0, house: 0, farm: 0, mill: 0 };
      gameState.buildingLevels = saved.buildingLevels || { mine: 0, forge: 0, house: 0, farm: 0, mill: 0 };
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

// ===== УВЕДОМЛЕНИЯ =====
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
window.showKingdoms = showKingdoms;
window.selectKingdom = selectKingdom;
window.closeGame = closeGame;
window.saveGame = saveGame;
window.updateUI = updateUI;
window.showToast = showToast;
window.skipLoading = skipLoading;
window.switchTab = switchTab;
window.openGlobalMap = openGlobalMap;
window.closeGlobalMap = closeGlobalMap;
</script>
</body>
</html>
