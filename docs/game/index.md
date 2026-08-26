---
hide:
  - navigation
  - toc
---

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Марсианская империя — загрузка</title>
<style>
  /* ===== ОБЩИЕ СТИЛИ ===== */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0605;
    font-family: 'Georgia', 'Times New Roman', serif;
    overflow: hidden;
    height: 100vh;
  }

  /* ===== ЗАГРУЗОЧНЫЙ ЭКРАН ===== */
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
  #play-btn.show {
    opacity: 1;
  }
  #play-btn:hover {
    background: rgba(192,57,43,1);
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(192,57,43,0.3);
  }

  /* ===== ВЫБОР КОРОЛЕВСТВА ===== */
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
  #kingdom-screen.active {
    display: flex;
  }

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
    max-width: 900px;
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

  /* ===== АДАПТАЦИЯ ===== */
  @media (max-width: 768px) {
    #loader-title { font-size: 1.2rem; letter-spacing: 3px; }
    #play-btn { padding: 12px 32px; font-size: 1rem; }
    .kingdom-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    #kingdom-screen h2 { font-size: 1.4rem; letter-spacing: 4px; }
  }
  @media (max-width: 480px) {
    .kingdom-grid { grid-template-columns: 1fr 1fr; }
    .kingdom-card { padding: 12px; }
    #loader-screen video { max-height: 50vh; }
  }
</style>
</head>
<body>

<!-- ===== ЗАГРУЗОЧНЫЙ ЭКРАН ===== -->
<div id="loader-screen">
  <video id="loader-video" autoplay muted playsinline>
    <source src="/assets/images/loader-bg.mp4" type="video/mp4">
    <!-- Если видео не загрузится — просто чёрный фон -->
  </video>
  <div id="loader-title">Марсианская империя</div>
  <div id="loader-progress"><div id="loader-progress-bar"></div></div>
  <button id="play-btn" onclick="showKingdoms()">🌌 Начать игру</button>
</div>

<!-- ===== ВЫБОР КОРОЛЕВСТВА ===== -->
<div id="kingdom-screen">
  <h2>Выбери своё королевство</h2>
  <div class="kingdom-grid" id="kingdom-grid">
    <!-- Карточки будут добавлены через JS -->
  </div>
</div>

<script>
// ===== КОРОЛЕВСТВА =====
const KINGDOMS = [
  { name: 'Аркадия', flag: '/assets/images/flag-of-arcadia.png', bonus: '+5 к знаниям', desc: 'Древние руины и артефакты' },
  { name: 'Ксанф', flag: '/assets/images/flag-of-ksanf.png', bonus: '+5 к железу', desc: 'Подземные шахты и крепости' },
  { name: 'Эдем', flag: '/assets/images/flag-of-eden.jpg', bonus: '+5 к глине', desc: 'Плодородные сады и оранжереи' },
  { name: 'Эридания', flag: '/assets/images/flag-of-eridania.png', bonus: '+5 к воде', desc: 'Озёра и древние каналы' },
  { name: 'Кхонг', flag: '/assets/images/flag-of-khong.png', bonus: '+5 к железу', desc: 'Пустыни и глубокие шахты' },
  { name: 'Авсония', flag: '/assets/images/flag-of-avsonia.png', bonus: '+5 к воде', desc: 'Ледяные пещеры и кристаллы' },
  { name: 'Кимерия', flag: '/assets/images/flag-of-kimeria.png', bonus: '+5 к знаниям', desc: 'Вулканические плато' },
  { name: 'Серпентида', flag: '/assets/images/flag-of-serpentida.png', bonus: '+5 к глине', desc: 'Змеевидные каньоны' },
  { name: 'Эритрей', flag: '/assets/images/flag-of-eritrea.png', bonus: '+5 к воде', desc: 'Обсерватории и каньоны' },
  { name: 'Утопия', flag: '/assets/images/flag-of-utopia.png', bonus: '+5 к знаниям', desc: 'Равнины и кратеры' },
  { name: 'Эллада', flag: '/assets/images/flag-of-hellas.png', bonus: '+5 к глине', desc: 'Термальные источники' },
  { name: 'Аливасото', flag: '/assets/images/flag-of-alivasoto.png', bonus: '+5 к железу', desc: 'Марсианские «леса»' }
];

// ===== ПОКАЗАТЬ КОРОЛЕВСТВА =====
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
      <img src="${k.flag}" alt="${k.name}" loading="lazy">
      <div class="name">${k.name}</div>
      <div class="bonus">${k.bonus}</div>
      <div class="desc">${k.desc}</div>
    `;
    card.onclick = () => selectKingdom(k.name);
    grid.appendChild(card);
  });
}

// ===== ВЫБОР КОРОЛЕВСТВА =====
function selectKingdom(name) {
  alert(`👑 Вы выбрали королевство ${name}!`);
  // Здесь будет переход в игру
  console.log('Выбрано:', name);
  // В будущем: gameState.kingdom = name; startGame();
}

// ===== ПРОГРЕСС-БАР =====
const video = document.getElementById('loader-video');
const progressBar = document.getElementById('loader-progress-bar');
const playBtn = document.getElementById('play-btn');

video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = progress + '%';
});

video.addEventListener('ended', () => {
  progressBar.style.width = '100%';
  playBtn.classList.add('show');
});

// Если видео не грузится — показать кнопку через 4 секунды
setTimeout(() => {
  if (!playBtn.classList.contains('show')) {
    playBtn.classList.add('show');
    playBtn.textContent = '🌌 Пропустить заставку';
    progressBar.style.width = '100%';
  }
}, 5000);
</script>
</body>
</html>
