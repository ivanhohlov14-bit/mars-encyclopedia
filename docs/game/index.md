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
  opacity: 0;
  transition: all 0.5s ease;
  text-transform: uppercase;
}
#play-btn.show { opacity: 1; }
#play-btn:hover {
  background: rgba(192,57,43,1);
  transform: scale(1.02);
  box-shadow: 0 0 30px rgba(192,57,43,0.3);
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
  opacity: 0.7;
}

/* ===== ИНТЕРФЕЙС ИГРЫ ===== */
.game-ui-top {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  z-index: 10;
  pointer-events: none;
}
.game-ui-top > * { pointer-events: auto; }

.game-panel {
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid rgba(200,150,100,0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.game-panel .kingdom-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #e8d5c0;
}
.game-panel .kingdom-label {
  font-size: 0.7rem;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.resources {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.resource-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.95rem;
  color: #d4c5b5;
}
.resource-item .icon { font-size: 1.2rem; }
.resource-item .value { font-weight: 600; color: #e8d5c0; }

/* ===== КНОПКИ СТРОИТЕЛЬСТВА ===== */
.game-build-menu {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  padding: 14px 20px;
  border-radius: 14px;
  border: 1px solid rgba(200,150,100,0.15);
  z-index: 10;
}
.build-btn {
  padding: 10px 18px;
  background: rgba(192,57,43,0.5);
  color: #e8d5c0;
  border: 1px solid rgba(200,150,100,0.2);
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.85rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 70px;
}
.build-btn:hover {
  background: rgba(192,57,43,0.8);
  transform: scale(1.05);
  border-color: #c0392b;
}
.build-btn .cost {
  font-size: 0.6rem;
  opacity: 0.6;
}

/* ===== КНОПКА ЗАКРЫТЬ ===== */
#close-game {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(200,150,100,0.2);
  color: #e8d5c0;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.8rem;
  z-index: 11;
  transition: all 0.3s;
}
#close-game:hover {
  background: rgba(192,57,43,0.6);
  border-color: #c0392b;
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
  padding: 10px 24px;
  border-radius: 8px;
  border: 1px solid rgba(200,150,100,0.15);
  font-family: 'Georgia', serif;
  font-size: 0.95rem;
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
  .game-ui-top { flex-direction: column; align-items: stretch; gap: 6px; }
  .game-panel { padding: 8px 12px; flex-wrap: wrap; }
  .resources { gap: 8px; }
  .resource-item { font-size: 0.8rem; }
  .game-build-menu { bottom: 16px; padding: 10px 12px; gap: 6px; width: 95%; }
  .build-btn { padding: 6px 12px; font-size: 0.7rem; min-width: 50px; }
  .game-panel .kingdom-name { font-size: 1rem; }
  #close-game { top: 10px; right: 10px; padding: 4px 10px; font-size: 0.7rem; }
  .toast { font-size: 0.8rem; padding: 8px 16px; }
}
@media (max-width: 480px) {
  .kingdom-grid { grid-template-columns: 1fr 1fr; }
  .kingdom-card { padding: 10px; }
  #loader-screen video { max-height: 50vh; }
  .build-btn .cost { font-size: 0.5rem; }
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
      </div>
      <div class="game-panel">
        <div class="resources">
          <div class="resource-item"><span class="icon">🏺</span> <span class="value" id="res-clay">10</span></div>
          <div class="resource-item"><span class="icon">💧</span> <span class="value" id="res-water">10</span></div>
          <div class="resource-item"><span class="icon">⚙️</span> <span class="value" id="res-iron">5</span></div>
          <div class="resource-item"><span class="icon">📖</span> <span class="value" id="res-knowledge">0</span></div>
        </div>
      </div>
    </div>

    <!-- Меню строительства -->
    <div class="game-build-menu">
      <button class="build-btn" onclick="buildBuilding('clay')">
        ⛏️ Шахта
        <span class="cost">🏺5 💧2</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('water')">
        💧 Коллектор
        <span class="cost">💧5 ⚙️2</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('forge')">
        ⚙️ Кузница
        <span class="cost">⚙️5 🏺2</span>
      </button>
      <button class="build-btn" onclick="createTablet()" style="background:rgba(192,57,43,0.7);">
        📜 Табличка
        <span class="cost">🏺3 💧2 ⚙️1</span>
      </button>
    </div>
  </div>
</div>

<!-- ===== КОНТЕЙНЕР ДЛЯ УВЕДОМЛЕНИЙ ===== -->
<div class="toast-container" id="toast-container"></div>

<!-- ==========================================
   JAVASCRIPT
   ========================================== -->
const KINGDOMS = [
  { name: 'Аркадия', flag: '/assets/images/map/flag-of-arkadia.png', bonus: '+5 к знаниям', desc: 'Подземные шахты и крепости' },
  { name: 'Ксанф', flag: '/assets/images/coat-of-arms-of-ksanf.png', bonus: '+5 к железу', desc: 'Древние руины и артефакты' },
  { name: 'Эдем', flag: '/assets/images/flag-of-eden.jpg', bonus: '+5 к глине', desc: 'Плодородные сады и оранжереи' },
  { name: 'Эридания', flag: '/assets/images/flag-of-eridania.png', bonus: '+5 к воде', desc: 'Озёра и древние каналы' },
  { name: 'Кхонг', flag: '/assets/images/flag-of-khong.png', bonus: '+5 к железу', desc: 'Пустыни и глубокие шахты' },
  { name: 'Авсония', flag: '/assets/images/flag-of-avsonia.png', bonus: '+5 к воде', desc: 'Вулканические плато' },
  { name: 'Кимерия', flag: '/assets/images/flag-of-kimeria.png', bonus: '+5 к знаниям', desc: 'Марсианские леса' },
  { name: 'Серпентида', flag: '/assets/images/flag-of-serpentida.png', bonus: '+5 к глине', desc: 'Змеевидные каньоны' },
  { name: 'Эритрей', flag: '/assets/images/flag-of-eritrea.png', bonus: '+5 к воде', desc: 'Обсерватории и каньоны' },
  { name: 'Утопия', flag: '/assets/images/flag-of-utopia.png', bonus: '+5 к знаниям', desc: 'Равнины и кратеры' },
  { name: 'Эллада', flag: '/assets/images/flag-of-hellas.png', bonus: '+5 к глине', desc: 'Термальные источники' },
  { name: 'Аливасото', flag: '/assets/images/flag-of-alivasoto.png', bonus: '+5 к железу', desc: 'Ледяные пещеры и кристаллы' }
];

// ===== СОСТОЯНИЕ ИГРЫ =====
let gameState = {
  kingdom: null,
  resources: { clay: 10, water: 10, iron: 5, knowledge: 0 },
  buildings: { clay: 0, water: 0, forge: 0 },
  totalTablets: 0,
  userId: null
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
    playBtn.classList.add('show');
  });
}

setTimeout(() => {
  if (!playBtn.classList.contains('show')) {
    playBtn.classList.add('show');
    playBtn.textContent = '🌌 Пропустить заставку';
    progressBar.style.width = '100%';
  }
}, 5000);

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
      <div class="bonus">+5 к ${getResourceName(k.bonus)}</div>
      <div class="desc">${k.desc}</div>
    `;
    card.onclick = () => selectKingdom(k);
    grid.appendChild(card);
  });
}

function getResourceName(res) {
  const names = { clay: 'глине', water: 'воде', iron: 'железу', knowledge: 'знаниям' };
  return names[res] || res;
}

// ===== ВЫБОР КОРОЛЕВСТВА =====
function selectKingdom(kingdom) {
  gameState.kingdom = kingdom.name;
  
  // Бонус за выбор
  const bonus = KINGDOMS.find(k => k.name === kingdom.name);
  if (bonus && gameState.resources[bonus.bonus] !== undefined) {
    gameState.resources[bonus.bonus] += 5;
    showToast(`🏆 Бонус: +5 к ${getResourceName(bonus.bonus)} за выбор ${kingdom.name}!`, 'success');
  }

  // Скрываем выбор и показываем игру
  document.getElementById('kingdom-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
  document.getElementById('game-kingdom-name').textContent = kingdom.name;
  
  // Обновляем интерфейс
  updateUI();
  
  // Сохраняем прогресс
  saveGame();
  
  showToast(`👑 Добро пожаловать в ${kingdom.name}!`, 'info');
}

// ===== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА =====
function updateUI() {
  document.getElementById('res-clay').textContent = Math.floor(gameState.resources.clay);
  document.getElementById('res-water').textContent = Math.floor(gameState.resources.water);
  document.getElementById('res-iron').textContent = Math.floor(gameState.resources.iron);
  document.getElementById('res-knowledge').textContent = Math.floor(gameState.resources.knowledge);
}

// ===== СТРОИТЕЛЬСТВО =====
function buildBuilding(type) {
  const costs = {
    clay: { clay: 5, water: 2 },
    water: { water: 5, iron: 2 },
    forge: { iron: 5, clay: 2 }
  };
  
  const cost = costs[type];
  if (!cost) return;
  
  // Проверка ресурсов
  for (const [res, amount] of Object.entries(cost)) {
    if (gameState.resources[res] < amount) {
      showToast(`❌ Не хватает ${getResourceName(res)}!`, 'error');
      return;
    }
  }
  
  // Списываем ресурсы
  for (const [res, amount] of Object.entries(cost)) {
    gameState.resources[res] -= amount;
  }
  
  gameState.buildings[type] += 1;
  
  const names = { clay: 'Глиняная шахта', water: 'Водный коллектор', forge: 'Кузница' };
  showToast(`🏗️ Построена ${names[type]}! Уровень: ${gameState.buildings[type]}`, 'success');
  
  // Начисляем опыт
  if (typeof window.addExperience === 'function' && gameState.userId) {
    window.addExperience(gameState.userId, 3);
  }
  
  updateUI();
  saveGame();
}

// ===== СОЗДАНИЕ ТАБЛИЧКИ =====
function createTablet() {
  const cost = { clay: 3, water: 2, iron: 1 };
  
  for (const [res, amount] of Object.entries(cost)) {
    if (gameState.resources[res] < amount) {
      showToast(`❌ Не хватает ${getResourceName(res)}!`, 'error');
      return;
    }
  }
  
  for (const [res, amount] of Object.entries(cost)) {
    gameState.resources[res] -= amount;
  }
  
  gameState.totalTablets += 1;
  
  if (typeof window.addExperience === 'function' && gameState.userId) {
    window.addExperience(gameState.userId, 10);
  }
  
  showToast(`📜 Создана глиняная табличка! (+10 опыта)`, 'success');
  updateUI();
  saveGame();
}

// ===== АВТОМАТИЧЕСКАЯ ДОБЫЧА =====
setInterval(() => {
  if (!gameState.kingdom) return;
  
  const b = gameState.buildings;
  const r = gameState.resources;
  
  r.clay += b.clay * 0.3;
  r.water += b.water * 0.3;
  r.iron += b.forge * 0.2;
  r.knowledge += b.clay * 0.05 + b.water * 0.05;
  
  // Округление
  for (const key of Object.keys(r)) {
    r[key] = Math.round(r[key] * 100) / 100;
  }
  
  updateUI();
}, 5000);

// ===== СОХРАНЕНИЕ В SUPABASE =====
async function saveGame() {
  if (!gameState.userId) {
    // Пытаемся получить пользователя
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
      gameState.resources = saved.resources || { clay: 10, water: 10, iron: 5, knowledge: 0 };
      gameState.buildings = saved.buildings || { clay: 0, water: 0, forge: 0 };
      gameState.totalTablets = saved.totalTablets || 0;
      
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
  // Инициализация Supabase
  if (typeof supabase !== 'undefined') {
    loadGame();
  } else {
    console.warn('⚠️ Supabase не загружен');
  }
});

// Глобальные функции для кнопок
window.buildBuilding = buildBuilding;
window.createTablet = createTablet;
window.showKingdoms = showKingdoms;
window.selectKingdom = selectKingdom;
window.closeGame = closeGame;
window.saveGame = saveGame;
window.updateUI = updateUI;
window.showToast = showToast;
</script>
</body>
</html>
