// docs/game/game.js

// === КОНФИГУРАЦИЯ ===
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

const KINGDOMS = [
  { name: 'Аркадия', color: '#D4A574', resource: 'knowledge' },
  { name: 'Ксанф', color: '#3D3D3D', resource: 'iron' },
  { name: 'Эдем', color: '#F4A460', resource: 'clay' },
  { name: 'Эридания', color: '#F5D76E', resource: 'water' },
  { name: 'Кхонг', color: '#A9A9A9', resource: 'iron' },
  { name: 'Авсония', color: '#87CEEB', resource: 'water' },
  { name: 'Кимерия', color: '#B19CD9', resource: 'knowledge' },
  { name: 'Серпентида', color: '#E57373', resource: 'clay' },
  { name: 'Эритрей', color: '#64B5F6', resource: 'water' },
  { name: 'Утопия', color: '#4DD0E1', resource: 'knowledge' },
  { name: 'Эллада', color: '#FF8A65', resource: 'clay' },
  { name: 'Аливасото', color: '#81C784', resource: 'iron' }
];

// === СОСТОЯНИЕ ИГРЫ ===
let gameState = {
  userId: null,
  kingdom: null,
  resources: { clay: 0, water: 0, iron: 0, knowledge: 0 },
  buildings: { clay_mine: 0, water_collector: 0, forge: 0 },
  unlockedKingdoms: [],
  log: []
};

let client = null;

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎮 Марсианская империя загружается...');
  
  if (typeof supabase === 'undefined') {
    document.getElementById('game-container').innerHTML = 
      '<p style="color:red;">⚠️ Ошибка загрузки Supabase. Проверьте интернет.</p>';
    return;
  }

  client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
  client.auth.getSession().then(({ data }) => {
    const user = data?.session?.user;
    if (user) {
      gameState.userId = user.id;
      console.log('👤 Пользователь:', user.email);
      loadGame();
    } else {
      document.getElementById('game-container').innerHTML = `
        <div style="text-align:center;padding:40px;">
          <p>⚠️ Войдите, чтобы играть в Марсианскую империю!</p>
          <a href="/login/" style="color:#6C63FF;">Войти</a>
        </div>
      `;
    }
  });
});

// === ЗАГРУЗКА ИГРЫ ===
async function loadGame() {
  if (!client || !gameState.userId) return;

  // Загружаем данные из Supabase
  const { data, error } = await client
    .from('profiles')
    .select('game_data')
    .eq('user_id', gameState.userId)
    .single();

  if (error) {
    console.warn('⚠️ Нет сохранённой игры, создаём новую.');
    initGame();
    return;
  }

  if (data?.game_data) {
    gameState = { ...gameState, ...data.game_data };
    console.log('✅ Игра загружена:', gameState);
  } else {
    initGame();
  }

  renderGame();
}

// === НОВАЯ ИГРА ===
function initGame() {
  gameState.kingdom = null;
  gameState.resources = { clay: 10, water: 10, iron: 5, knowledge: 0 };
  gameState.buildings = { clay_mine: 0, water_collector: 0, forge: 0 };
  gameState.unlockedKingdoms = [];
  gameState.log = ['🏛️ Вы — новый правитель Марса. Постройте свою империю!'];
  console.log('🆕 Новая игра создана');
  saveGame();
}

// === СОХРАНЕНИЕ ===
async function saveGame() {
  if (!client || !gameState.userId) return;

  const { error } = await client
    .from('profiles')
    .update({ game_data: gameState })
    .eq('user_id', gameState.userId);

  if (error) {
    console.error('❌ Ошибка сохранения:', error);
    addLog('❌ Ошибка сохранения!');
  } else {
    console.log('💾 Игра сохранена');
    addLog('💾 Игра сохранена!');
  }
}

// === ДОБАВЛЕНИЕ В ЛОГ ===
function addLog(message) {
  gameState.log.push(message);
  if (gameState.log.length > 20) gameState.log.shift();
  renderLog();
}

// === РЕНДЕРИНГ ===
function renderGame() {
  renderResources();
  renderKingdoms();
  renderBuildings();
  renderLog();
  updateSaveButton();
}

function renderResources() {
  const r = gameState.resources;
  document.getElementById('clay').textContent = r.clay;
  document.getElementById('water').textContent = r.water;
  document.getElementById('iron').textContent = r.iron;
  document.getElementById('knowledge').textContent = r.knowledge;
}

function renderKingdoms() {
  const grid = document.getElementById('kingdoms-grid');
  grid.innerHTML = '';
  
  KINGDOMS.forEach(k => {
    const isUnlocked = gameState.unlockedKingdoms.includes(k.name);
    const isSelected = gameState.kingdom === k.name;
    
    const card = document.createElement('div');
    card.className = `kingdom-card ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`;
    card.innerHTML = `
      <div>
        <span class="kingdom-color" style="background:${k.color};"></span>
        <span class="kingdom-name">${k.name}</span>
      </div>
      <div class="kingdom-status">${isUnlocked ? '✅ Открыто' : '🔒 Закрыто'}</div>
      ${!isUnlocked ? `<button onclick="unlockKingdom('${k.name}')" style="margin-top:6px;padding:2px 12px;font-size:0.8rem;cursor:pointer;">🔓 Открыть (5 знаний)</button>` : ''}
      ${isUnlocked && !isSelected ? `<button onclick="selectKingdom('${k.name}')" style="margin-top:6px;padding:2px 12px;font-size:0.8rem;cursor:pointer;">👑 Выбрать</button>` : ''}
      ${isSelected ? '<div style="margin-top:6px;color:#6C63FF;">👑 Правитель</div>' : ''}
    `;
    grid.appendChild(card);
  });
}

function renderBuildings() {
  const b = gameState.buildings;
  document.querySelector('.building-card[onclick*="clay_mine"] .cost').textContent = `🏺${10 + b.clay_mine * 5}`;
  document.querySelector('.building-card[onclick*="water_collector"] .cost').textContent = `💧${10 + b.water_collector * 5}`;
  document.querySelector('.building-card[onclick*="forge"] .cost').textContent = `⚙️${10 + b.forge * 5}`;
}

function renderLog() {
  const container = document.getElementById('log-messages');
  container.innerHTML = gameState.log.slice(-10).map(msg => `<p>${msg}</p>`).join('');
  container.scrollTop = container.scrollHeight;
}

function updateSaveButton() {
  // Кнопка сохранения уже есть в HTML
}

// === ИГРОВЫЕ ДЕЙСТВИЯ ===

function unlockKingdom(name) {
  if (gameState.resources.knowledge < 5) {
    addLog('❌ Не хватает знаний! Нужно 5.');
    return;
  }
  if (gameState.unlockedKingdoms.includes(name)) {
    addLog(`ℹ️ Королевство ${name} уже открыто.`);
    return;
  }
  
  gameState.resources.knowledge -= 5;
  gameState.unlockedKingdoms.push(name);
  addLog(`🗺️ Открыто королевство ${name}!`);
  saveGame();
  renderGame();
}

function selectKingdom(name) {
  if (!gameState.unlockedKingdoms.includes(name)) {
    addLog(`❌ Королевство ${name} не открыто.`);
    return;
  }
  gameState.kingdom = name;
  addLog(`👑 Вы выбрали королевство ${name}!`);
  saveGame();
  renderGame();
}

function buildBuilding(type) {
  const cost = {
    clay_mine: { clay: 10 + gameState.buildings.clay_mine * 5 },
    water_collector: { water: 10 + gameState.buildings.water_collector * 5 },
    forge: { iron: 10 + gameState.buildings.forge * 5 }
  };
  
  const required = cost[type];
  const key = Object.keys(required)[0];
  const amount = required[key];
  
  if (gameState.resources[key] < amount) {
    addLog(`❌ Не хватает ресурсов! Нужно ${amount} ${key}.`);
    return;
  }
  
  gameState.resources[key] -= amount;
  gameState.buildings[type] += 1;
  
  const names = {
    clay_mine: 'Глиняная шахта',
    water_collector: 'Водный коллектор',
    forge: 'Кузница'
  };
  
  addLog(`🏗️ Построена ${names[type]}! Уровень ${gameState.buildings[type]}.`);
  saveGame();
  renderGame();
}

function createTablet() {
  const cost = { clay: 5, water: 3, iron: 2 };
  
  for (const [key, val] of Object.entries(cost)) {
    if (gameState.resources[key] < val) {
      addLog(`❌ Не хватает ${key}! Нужно: ${val}.`);
      return;
    }
  }
  
  for (const [key, val] of Object.entries(cost)) {
    gameState.resources[key] -= val;
  }
  
  // Начисляем опыт (через существующую систему)
  if (typeof window.addExperience === 'function') {
    window.addExperience(gameState.userId, 10);
  }
  
  addLog('📜 Создана глиняная табличка! +10 опыта.');
  saveGame();
  renderGame();
}

// === АВТОМАТИЧЕСКАЯ ДОБЫЧА ===
setInterval(() => {
  if (!gameState.kingdom) return;
  
  // Добыча ресурсов в зависимости от построек
  const b = gameState.buildings;
  const r = gameState.resources;
  
  r.clay += b.clay_mine * 0.5;
  r.water += b.water_collector * 0.5;
  r.iron += b.forge * 0.3;
  
  // Округление до 1 знака
  for (const key of Object.keys(r)) {
    r[key] = Math.round(r[key] * 10) / 10;
  }
  
  // Обновляем UI каждые 5 секунд
  renderResources();
}, 5000);

// === ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ HTML ===
window.unlockKingdom = unlockKingdom;
window.selectKingdom = selectKingdom;
window.buildBuilding = buildBuilding;
window.createTablet = createTablet;
window.saveGame = saveGame;

console.log('🎮 Марсианская империя готова!');
