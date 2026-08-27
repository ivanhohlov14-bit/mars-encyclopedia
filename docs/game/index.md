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
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #0a0605;
  font-family: 'Georgia', 'Times New Roman', serif;
  overflow: hidden;
  height: 100vh;
  color: #e8d5c0;
  user-select: none;
}
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
  opacity: 0.2;
}
#top-bar {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid rgba(200,150,100,0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  z-index: 20;
  justify-content: center;
  width: 95%;
  max-width: 750px;
}
#top-bar .kingdom-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e8d5c0;
  white-space: nowrap;
}
#top-bar .resources {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
#top-bar .resource-item {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.7rem;
  color: #d4c5b5;
}
#top-bar .resource-item .icon { font-size: 0.8rem; }
#top-bar .resource-item .value { font-weight: 600; color: #e8d5c0; }
#top-bar .population {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  color: #d4c5b5;
  border-left: 1px solid rgba(200,150,100,0.15);
  padding-left: 8px;
}
#top-bar .chapter {
  font-size: 0.6rem;
  color: #f39c12;
  background: rgba(243,156,18,0.15);
  padding: 2px 10px;
  border-radius: 12px;
  border: 1px solid rgba(243,156,18,0.2);
}
#game-map-grid {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  width: 90%;
  max-width: 600px;
  z-index: 5;
  padding: 10px;
  background: rgba(0,0,0,0.4);
  border-radius: 12px;
  border: 1px solid rgba(200,150,100,0.1);
}
.cell {
  aspect-ratio: 1;
  background: rgba(60,40,30,0.6);
  border: 1px solid rgba(200,150,100,0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  min-height: 50px;
}
.cell:hover {
  background: rgba(192,57,43,0.3);
  transform: scale(1.05);
  border-color: #c0392b;
}
.cell .building { font-size: 1.8rem; }
.cell .resource-icon {
  font-size: 1.8rem;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}
#progress-container {
  position: absolute;
  bottom: 170px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 400px;
  z-index: 12;
  background: rgba(0,0,0,0.5);
  border-radius: 20px;
  padding: 6px 12px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(200,150,100,0.1);
  display: flex;
  align-items: center;
  gap: 10px;
}
#progress-bar {
  height: 6px;
  flex: 1;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
}
#progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #f39c12, #f1c40f);
  border-radius: 4px;
  transition: width 0.5s;
}
#progress-text {
  font-size: 0.7rem;
  color: #b8a088;
  white-space: nowrap;
  min-width: 80px;
  text-align: right;
}
#global-map-btn {
  position: absolute;
  bottom: 100px;
  left: 20px;
  z-index: 20;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #6C63FF, #3a2f8a);
  border: 2px solid rgba(255,255,255,0.15);
  box-shadow: 0 4px 30px rgba(108,99,255,0.4);
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-family: 'Georgia', serif;
}
#global-map-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 40px rgba(108,99,255,0.6);
}
#global-map-btn .label {
  position: absolute;
  bottom: -18px;
  font-size: 0.5rem;
  color: #887a6e;
  letter-spacing: 2px;
}
#collect-btn {
  position: absolute;
  bottom: 100px;
  right: 20px;
  z-index: 15;
  padding: 12px 16px;
  background: rgba(46,204,113,0.25);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(46,204,113,0.2);
  border-radius: 12px;
  color: #e8d5c0;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.75rem;
  transition: all 0.3s;
  text-align: center;
  min-width: 60px;
}
#collect-btn:hover {
  background: rgba(46,204,113,0.4);
  transform: scale(1.05);
}
#collect-btn .icon { font-size: 1.2rem; display: block; }
.diplomacy-panel {
  position: absolute;
  bottom: 210px;
  right: 20px;
  z-index: 15;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.diplomacy-btn {
  padding: 6px 12px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(200,150,100,0.15);
  border-radius: 8px;
  color: #d4c5b5;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.6rem;
  transition: all 0.3s;
  text-align: left;
  min-width: 100px;
}
.diplomacy-btn:hover {
  background: rgba(192,57,43,0.3);
  border-color: #c0392b;
}
.diplomacy-btn .icon { margin-right: 4px; }
.army-panel {
  position: absolute;
  bottom: 210px;
  left: 20px;
  z-index: 15;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.army-btn {
  padding: 6px 12px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(200,150,100,0.15);
  border-radius: 8px;
  color: #d4c5b5;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.6rem;
  transition: all 0.3s;
  text-align: left;
  min-width: 100px;
}
.army-btn:hover {
  background: rgba(192,57,43,0.3);
  border-color: #c0392b;
}
.army-btn .icon { margin-right: 4px; }
#bottom-menu {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 6px;
  z-index: 15;
  width: 95%;
  max-width: 700px;
  justify-content: center;
  flex-wrap: wrap;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  padding: 8px 10px;
  border-radius: 14px;
  border: 1px solid rgba(200,150,100,0.15);
}
.build-btn {
  padding: 6px 10px;
  background: rgba(40,25,20,0.8);
  color: #d4c5b5;
  border: 1px solid rgba(200,150,100,0.15);
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.6rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  min-width: 50px;
  flex: 1;
  max-width: 70px;
}
.build-btn:hover {
  background: rgba(192,57,43,0.4);
  transform: translateY(-3px);
  border-color: #c0392b;
}
.build-btn .cost {
  font-size: 0.4rem;
  opacity: 0.6;
}
.build-btn .level {
  font-size: 0.4rem;
  color: #b8a088;
}
.build-btn .icon-big { font-size: 1.2rem; }
#story-panel {
  position: absolute;
  bottom: 230px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  z-index: 14;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(200,150,100,0.2);
  border-radius: 12px;
  padding: 16px 20px;
  display: none;
  text-align: center;
}
#story-panel.active { display: block; }
#story-panel .story-title {
  color: #f39c12;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
}
#story-panel .story-text {
  color: #e8d5c0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 10px;
}
#story-panel .story-choices {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
#story-panel .story-choice {
  padding: 6px 16px;
  background: rgba(192,57,43,0.3);
  border: 1px solid rgba(200,150,100,0.15);
  border-radius: 6px;
  color: #e8d5c0;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 0.8rem;
  transition: all 0.3s;
}
#story-panel .story-choice:hover {
  background: rgba(192,57,43,0.6);
  transform: scale(1.05);
}
#global-map-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.92);
  z-index: 9999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
#global-map-overlay.active { display: flex; }
#global-map-overlay .map-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 700px;
  width: 100%;
  margin: 10px 0;
}
#global-map-overlay .region-card {
  background: rgba(40,25,20,0.7);
  border: 1px solid rgba(200,150,100,0.15);
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  color: #d4c5b5;
}
#global-map-overlay .region-card:hover {
  border-color: #c0392b;
  transform: scale(1.05);
  background: rgba(60,35,25,0.8);
}
#global-map-overlay .region-card .region-name { font-weight: 600; font-size: 0.9rem; }
#global-map-overlay .region-card .region-bonus { font-size: 0.7rem; opacity: 0.7; margin-top: 4px; }
#global-map-overlay .region-card .region-owned { font-size: 0.6rem; color: #27ae60; margin-top: 4px; }
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
#global-map-overlay .close-map:hover { background: rgba(192,57,43,0.9); }
#victory-screen {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 99999;
  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(10px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}
#victory-screen.active { display: flex; }
#victory-screen .title {
  font-size: 3rem;
  color: #f1c40f;
  text-shadow: 0 0 60px rgba(241,196,15,0.3);
  margin-bottom: 10px;
}
#victory-screen .subtitle {
  font-size: 1.2rem;
  color: #e8d5c0;
  opacity: 0.7;
  max-width: 500px;
}
#victory-screen .restart-btn {
  margin-top: 30px;
  padding: 14px 48px;
  background: rgba(192,57,43,0.8);
  color: #e8d5c0;
  border: 1px solid rgba(200,150,100,0.3);
  border-radius: 8px;
  font-size: 1.2rem;
  font-family: 'Georgia', serif;
  cursor: pointer;
  transition: all 0.3s;
}
#victory-screen .restart-btn:hover {
  background: rgba(192,57,43,1);
  transform: scale(1.05);
}
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
  padding: 6px 16px;
  border-radius: 8px;
  border: 1px solid rgba(200,150,100,0.15);
  font-family: 'Georgia', serif;
  font-size: 0.85rem;
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
@media (max-width: 768px) {
  #top-bar { padding: 4px 10px; gap: 4px; font-size: 0.6rem; }
  #top-bar .kingdom-name { font-size: 0.6rem; }
  #top-bar .resource-item { font-size: 0.55rem; gap: 2px; }
  #game-map-grid { top: 55px; padding: 6px; gap: 3px; width: 95%; }
  .cell { min-height: 40px; font-size: 1.2rem; }
  #bottom-menu { bottom: 12px; padding: 6px 8px; gap: 4px; }
  .build-btn { font-size: 0.5rem; padding: 4px 6px; min-width: 40px; max-width: 55px; }
  .build-btn .icon-big { font-size: 1rem; }
  #global-map-btn { width: 50px; height: 50px; font-size: 1.4rem; bottom: 75px; left: 10px; }
  #collect-btn { bottom: 75px; right: 10px; padding: 8px 10px; font-size: 0.6rem; min-width: 50px; }
  .diplomacy-panel, .army-panel { bottom: 145px; }
  .diplomacy-btn, .army-btn { font-size: 0.5rem; padding: 4px 8px; min-width: 70px; }
  #story-panel { bottom: 165px; padding: 12px 14px; }
  #story-panel .story-text { font-size: 0.8rem; }
  #progress-container { bottom: 125px; width: 90%; }
  #victory-screen .title { font-size: 2rem; }
  #global-map-overlay .map-grid { grid-template-columns: repeat(2, 1fr); }
  .kingdom-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  #game-map-grid { grid-template-columns: repeat(5, 1fr); gap: 2px; padding: 4px; }
  .cell { min-height: 30px; font-size: 1rem; }
  #bottom-menu { padding: 4px 6px; }
  .build-btn { font-size: 0.45rem; min-width: 35px; }
  #global-map-btn { width: 40px; height: 40px; font-size: 1.2rem; bottom: 65px; left: 8px; }
  #collect-btn { bottom: 65px; right: 8px; padding: 6px 8px; font-size: 0.5rem; min-width: 40px; }
}
</style>
</head>
<body>

<div id="loader-screen">
  <video id="loader-video" autoplay muted playsinline>
    <source src="/assets/images/loader-bg.mp4" type="video/mp4">
  </video>
  <div id="loader-title">Марсианская империя</div>
  <div id="loader-progress"><div id="loader-progress-bar"></div></div>
  <button id="play-btn" onclick="showKingdoms()">🌌 Начать игру</button>
  <button id="skip-loading" onclick="skipLoading()">Пропустить загрузку</button>
</div>

<div id="kingdom-screen">
  <h2>Выбери своё королевство</h2>
  <div class="kingdom-grid" id="kingdom-grid"></div>
</div>

<div id="game-screen">
  <div id="game-container">
    <img id="game-bg" src="/assets/images/mars-field.jpg" alt="Марс">
    <div id="top-bar">
      <span class="kingdom-name" id="game-kingdom-name">—</span>
      <span class="chapter" id="chapter-display">Глава 1</span>
      <div class="resources">
        <span class="resource-item"><span class="icon">🌲</span> <span class="value" id="res-wood">20</span></span>
        <span class="resource-item"><span class="icon">🍖</span> <span class="value" id="res-food">15</span></span>
        <span class="resource-item"><span class="icon">🪨</span> <span class="value" id="res-basalt">5</span></span>
        <span class="resource-item"><span class="icon">💧</span> <span class="value" id="res-water">10</span></span>
        <span class="resource-item"><span class="icon">📜</span> <span class="value" id="res-tablets">0</span></span>
      </div>
      <span class="population">👥 <span id="population-count">2</span></span>
    </div>

    <div id="story-panel">
      <div class="story-title" id="story-title">Глава 1: Побег из Ксанфа</div>
      <div class="story-text" id="story-text">Вы — изгнанник из Ксанфа. Вам нужно сбежать и найти убежище. Соберите 20 дерева и 10 еды, чтобы построить корабль.</div>
      <div class="story-choices" id="story-choices"></div>
    </div>

    <div id="progress-container">
      <span style="font-size:0.7rem;">🏆</span>
      <div id="progress-bar"><div id="progress-fill"></div></div>
      <span id="progress-text">0 / 100</span>
    </div>

    <button id="global-map-btn" onclick="openGlobalMap()">
      🌍<span class="label">КАРТА</span>
    </button>

    <div class="diplomacy-panel">
      <button class="diplomacy-btn" onclick="makeAlliance()"><span class="icon">🤝</span> Союз</button>
      <button class="diplomacy-btn" onclick="tradeResources()"><span class="icon">🔄</span> Торговля</button>
    </div>

    <div class="army-panel">
      <button class="army-btn" onclick="recruitArmy()"><span class="icon">⚔️</span> Набор армии</button>
      <button class="army-btn" onclick="attackRegion()"><span class="icon">🗡️</span> Набег</button>
    </div>

    <button id="collect-btn" onclick="collectResources()">
      <span class="icon">📦</span> Собрать
    </button>

    <div id="game-map-grid"></div>

    <div id="bottom-menu">
      <button class="build-btn" onclick="buildBuilding('mine')">
        <span class="icon-big">⛏️</span> Шахта<span class="cost">🌲5 🍖3</span>
        <span class="level" id="mine-level">Ур.0</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('forge')">
        <span class="icon-big">⚒️</span> Кузница<span class="cost">🌲8 🪨3</span>
        <span class="level" id="forge-level">Ур.0</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('house')">
        <span class="icon-big">🏠</span> Дом<span class="cost">🌲10 🍖5</span>
        <span class="level" id="house-level">Ур.0</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('farm')">
        <span class="icon-big">🌾</span> Ферма<span class="cost">🌲6 🍖4</span>
        <span class="level" id="farm-level">Ур.0</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('mill')">
        <span class="icon-big">🌾</span> Мельница<span class="cost">🌲8 🍖6</span>
        <span class="level" id="mill-level">Ур.0</span>
      </button>
      <button class="build-btn" onclick="buildBuilding('well')">
        <span class="icon-big">💧</span> Колодец<span class="cost">🌲6 🪨4</span>
        <span class="level" id="well-level">Ур.0</span>
      </button>
      <button class="build-btn" onclick="createTablet()" style="background:rgba(192,57,43,0.3);">
        <span class="icon-big">📜</span> Табличка<span class="cost">🌲2 🍖1 🪨1</span>
        <span class="level" style="color:#f39c12;">+10 опыта</span>
      </button>
    </div>
  </div>
</div>

<div id="global-map-overlay">
  <h2 style="color:#e8d5c0;margin-bottom:16px;">🗺️ Глобальная карта Марса</h2>
  <div class="map-grid" id="global-map-grid"></div>
  <button class="close-map" onclick="closeGlobalMap()">✕ Закрыть карту</button>
</div>

<div id="victory-screen">
  <div class="title">🏆 ПОБЕДА!</div>
  <div class="subtitle">Вы создали 100 глиняных табличек и сохранили знания Марса для будущих поколений!</div>
  <button class="restart-btn" onclick="resetGame()">🔄 Начать заново</button>
</div>

<div class="toast-container" id="toast-container"></div>

<script>
const KINGDOMS = [
  { name: 'Аркадия', flag: '/assets/images/map/flag-of-arkadia.png', bonus: 'basalt', desc: 'Древние руины и артефакты' },
  { name: 'Ксанф', flag: '/assets/images/coat-of-arms-of-ksanf.png', bonus: 'basalt', desc: 'Подземные шахты и крепости' },
  { name: 'Эдем', flag: '/assets/images/flag-of-eden.jpg', bonus: 'food', desc: 'Плодородные сады и оранжереи' },
  { name: 'Эридания', flag: '/assets/images/flag-of-eridania.png', bonus: 'wood', desc: 'Озёра и древние каналы' },
  { name: 'Кхонг', flag: '/assets/images/flag-of-khong.png', bonus: 'basalt', desc: 'Пустыни и глубокие шахты' },
  { name: 'Авсония', flag: '/assets/images/flag-of-avsonia.png', bonus: 'wood', desc: 'Ледяные пещеры и кристаллы' },
  { name: 'Кимерия', flag: '/assets/images/flag-of-kimeria.png', bonus: 'food', desc: 'Вулканические плато' },
  { name: 'Серпентида', flag: '/assets/images/flag-of-serpentida.png', bonus: 'basalt', desc: 'Змеевидные каньоны' },
  { name: 'Эритрей', flag: '/assets/images/flag-of-eritrea.png', bonus: 'wood', desc: 'Обсерватории и каньоны' },
  { name: 'Утопия', flag: '/assets/images/flag-of-utopia.png', bonus: 'food', desc: 'Равнины и кратеры' },
  { name: 'Эллада', flag: '/assets/images/flag-of-hellas.png', bonus: 'basalt', desc: 'Термальные источники' },
  { name: 'Аливасото', flag: '/assets/images/flag-of-alivasoto.png', bonus: 'wood', desc: 'Марсианские "леса"' }
];

const REGIONS = [
  { name: 'Фарсида', bonus: 'wood', amount: 3 },
  { name: 'Эдем', bonus: 'food', amount: 3 },
  { name: 'Утопия', bonus: 'food', amount: 4 },
  { name: 'Эридания', bonus: 'basalt', amount: 3 },
  { name: 'Кхонг', bonus: 'basalt', amount: 4 },
  { name: 'Авсония', bonus: 'wood', amount: 4 },
  { name: 'Кимерия', bonus: 'food', amount: 3 },
  { name: 'Серпентида', bonus: 'basalt', amount: 3 },
  { name: 'Эритрей', bonus: 'wood', amount: 3 },
  { name: 'Эллада', bonus: 'basalt', amount: 4 },
  { name: 'Аливасото', bonus: 'wood', amount: 3 },
  { name: 'Аркадия', bonus: 'basalt', amount: 5 }
];

const STORY_CHAPTERS = [
  { id: 1, title: 'Побег из Ксанфа', text: 'Вы — изгнанник из Ксанфа. Вам нужно сбежать и найти убежище. Соберите 20 дерева и 10 еды, чтобы построить корабль.', need: { wood: 20, food: 10 }, next: 2, reward: { basalt: 10 } },
  { id: 2, title: 'Прибытие в Эдем', text: 'Вы прибыли в Эдем. Местные жители не доверяют чужакам. Заслужите их доверие, построив 2 дома и 1 ферму.', need: { house: 2, farm: 1 }, next: 3, reward: { food: 20 } },
  { id: 3, title: 'Тайна Красной книги', text: 'Вы нашли упоминание о Красной книге — артефакте, способном спасти Марс. Чтобы найти её, нужно построить библиотеку (10 дерева, 5 базальта).', need: { wood: 10, basalt: 5 }, next: 4, reward: { tablets: 15 } },
  { id: 4, title: 'Путь к Аркадии', text: 'Красная книга находится в Аркадии, но путь туда опасен. Соберите армию из 2 отрядов и 20 еды для похода.', need: { army: 2, food: 20 }, next: 5, reward: { basalt: 30 } },
  { id: 5, title: 'Врата Аркадии', text: 'Вы у ворот Аркадии. Стражник требует выкуп: 10 базальта и 5 табличек. Заплатите или сразитесь!', need: { basalt: 10, tablets: 5 }, next: 6, reward: { water: 20 } },
  { id: 6, title: 'Тайник Хевсура', text: 'Вы нашли тайник Хевсура — легендарного хранителя знаний. Внутри — древние карты. Чтобы их прочитать, нужно 15 знаний (табличек).', need: { tablets: 15 }, next: 7, reward: { wood: 30, food: 30 } },
  { id: 7, title: 'Союз с Утопией', text: 'Утопия предлагает союз, но требует дань: 20 еды и 10 дерева. Соглашайтесь или ищите другой путь.', need: { food: 20, wood: 10 }, next: 8, reward: { alliances: 1 } },
  { id: 8, title: 'Битва за Красную книгу', text: 'Красная книга в руках врага! Соберите армию из 5 отрядов и атакуйте.', need: { army: 5 }, next: 9, reward: { tablets: 25 } },
  { id: 9, title: 'Последний выбор', text: 'Вы держите Красную книгу. Вы можете: А) Открыть её и получить знания, Б) Сжечь её, чтобы спасти Марс от знаний.', need: {}, next: 10, reward: {} },
  { id: 10, title: 'Новая эра', text: 'Марс спасён! Вы стали легендой. Соберите 100 табличек, чтобы завершить свой труд.', need: { tablets: 100 }, next: 'end', reward: {} }
];

let gameState = {
  kingdom: null,
  resources: { wood: 20, food: 15, basalt: 5, water: 10, tablets: 0 },
  buildings: { mine: 0, forge: 0, house: 0, farm: 0, mill: 0, well: 0 },
  buildingLevels: { mine: 0, forge: 0, house: 0, farm: 0, mill: 0, well: 0 },
  population: 2,
  army: 1,
  alliances: 0,
  regions: [],
  chapter: 1,
  userId: null,
  lastCollect: Date.now(),
  grid: [],
  gameStarted: false,
  storyActive: false
};

const RESOURCES = ['🌲', '🪨', '🍖', '🌲', '🪨', '💧'];
const GRID_SIZE = 6;

function initGrid() {
  const grid = document.getElementById('game-map-grid');
  grid.innerHTML = '';
  gameState.grid = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    if (i < 14) {
      const resource = RESOURCES[i % RESOURCES.length];
      cell.innerHTML = `<span class="resource-icon">${resource}</span>`;
      cell.dataset.resource = resource;
      gameState.grid.push({ type: 'resource', icon: resource });
    } else {
      gameState.grid.push({ type: 'empty', icon: null });
    }
    cell.onclick = () => onCellClick(i);
    grid.appendChild(cell);
  }
}

function onCellClick(index) {
  const cellData = gameState.grid[index];
  if (!cellData) return;
  if (cellData.type === 'resource') {
    collectResource(index);
  } else {
    showToast('🏗️ Постройте здание через меню внизу!', 'info');
  }
}

function collectResource(index) {
  const cellData = gameState.grid[index];
  if (!cellData || cellData.type !== 'resource') return;
  const resourceMap = { '🌲': 'wood', '🪨': 'basalt', '🍖': 'food', '💧': 'water' };
  const resKey = resourceMap[cellData.icon];
  if (!resKey) return;
  const amount = Math.floor(Math.random() * 3) + 2;
  gameState.resources[resKey] += amount;
  gameState.grid[index] = { type: 'empty', icon: null };
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  if (cell) { cell.innerHTML = ''; cell.dataset.resource = ''; }
  showToast(`✅ +${amount} ${resKey}!`, 'success');
  updateUI();
  saveGame();
  setTimeout(() => {
    if (gameState.grid[index]?.type === 'empty') {
      const newResource = RESOURCES[Math.floor(Math.random() * RESOURCES.length)];
      gameState.grid[index] = { type: 'resource', icon: newResource };
      const cellEl = document.querySelector(`.cell[data-index="${index}"]`);
      if (cellEl) {
        cellEl.innerHTML = `<span class="resource-icon">${newResource}</span>`;
        cellEl.dataset.resource = newResource;
      }
    }
  }, 15000 + Math.random() * 10000);
}

function skipLoading() {
  document.getElementById('loader-screen').classList.add('hidden');
  showKingdoms();
}

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
      <img src="${k.flag}" alt="${k.name}" loading="lazy" onerror="this.style.display='none'">
      <div class="name">${k.name}</div>
      <div class="bonus">+5 к ${k.bonus}</div>
      <div class="desc">${k.desc}</div>
    `;
    card.onclick = () => selectKingdom(k);
    grid.appendChild(card);
  });
}

function selectKingdom(kingdom) {
  gameState.kingdom = kingdom.name;
  gameState.gameStarted = true;
  gameState.resources[kingdom.bonus] += 5;
  document.getElementById('kingdom-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
  document.getElementById('game-kingdom-name').textContent = kingdom.name;
  initGrid();
  initGlobalMap();
  startStory();
  updateUI();
  saveGame();
  showToast(`👑 Добро пожаловать в ${kingdom.name}! Бонус получен!`, 'success');
}

function initGlobalMap() {
  const grid = document.getElementById('global-map-grid');
  grid.innerHTML = '';
  REGIONS.forEach(r => {
    const card = document.createElement('div');
    card.className = 'region-card';
    const owned = gameState.regions.includes(r.name);
    card.innerHTML = `
      <div class="region-name">${r.name}</div>
      <div class="region-bonus">+${r.amount} ${r.bonus}</div>
      ${owned ? '<div class="region-owned">✅ Ваша территория</div>' : '<div class="region-owned" style="color:#e8d5c0;">⚔️ Нажмите для захвата</div>'}
    `;
    if (!owned) card.onclick = () => captureRegion(r);
    else card.onclick = () => collectRegionBonus(r);
    grid.appendChild(card);
  });
}

function captureRegion(region) {
  if (gameState.army < 1) {
    showToast('❌ Нужна армия! Наберите её слева.', 'error');
    return;
  }
  if (gameState.regions.includes(region.name)) {
    showToast('ℹ️ Этот регион уже ваш.', 'info');
    return;
  }
  gameState.army -= 1;
  gameState.regions.push(region.name);
  showToast(`🗡️ Регион ${region.name} захвачен!`, 'success');
  updateUI();
  saveGame();
  initGlobalMap();
}

function collectRegionBonus(region) {
  const amount = region.amount + gameState.alliances;
  gameState.resources[region.bonus] += amount;
  showToast(`📦 +${amount} ${region.bonus} с региона ${region.name}!`, 'success');
  updateUI();
  saveGame();
}

function startStory() {
  showStoryChapter(STORY_CHAPTERS[0]);
}

function showStoryChapter(chapter) {
  const panel = document.getElementById('story-panel');
  panel.classList.add('active');
  document.getElementById('story-title').textContent = `Глава ${chapter.id}: ${chapter.title}`;
  document.getElementById('story-text').textContent = chapter.text;
  document.getElementById('chapter-display').textContent = `Глава ${chapter.id}`;
  const choices = document.getElementById('story-choices');
  choices.innerHTML = '';
  if (chapter.id === 9) {
    choices.innerHTML = `
      <button class="story-choice" onclick="makeChoice('open')">📖 Открыть Красную книгу</button>
      <button class="story-choice" onclick="makeChoice('burn')">🔥 Сжечь Красную книгу</button>
    `;
  } else {
    const btn = document.createElement('button');
    btn.className = 'story-choice';
    btn.textContent = '✅ Принять вызов';
    btn.onclick = () => checkChapterProgress(chapter);
    choices.appendChild(btn);
  }
}

function checkChapterProgress(chapter) {
  if (chapter.id === 9) return;
  const need = chapter.need;
  let canProceed = true;
  let missing = [];
  for (const [key, val] of Object.entries(need)) {
    if (key === 'army' && gameState.army < val) { canProceed = false; missing.push(`${key} (нужно ${val})`); }
    else if (key !== 'army' && (gameState.resources[key] || 0) < val) { canProceed = false; missing.push(`${key} (нужно ${val})`); }
  }
  if (!canProceed) {
    showToast(`❌ Не хватает: ${missing.join(', ')}`, 'error');
    return;
  }
  for (const [key, val] of Object.entries(need)) {
    if (key === 'army') gameState.army -= val;
    else gameState.resources[key] -= val;
  }
  if (chapter.reward) {
    for (const [key, val] of Object.entries(chapter.reward)) {
      if (key === 'alliances') gameState.alliances += val;
      else gameState.resources[key] = (gameState.resources[key] || 0) + val;
    }
    showToast(`🎁 Награда получена!`, 'success');
  }
  if (chapter.next === 'end') {
    document.getElementById('story-panel').classList.remove('active');
    showToast('🏆 Вы завершили кампанию! Теперь соберите 100 табличек для победы!', 'success');
    return;
  }
  const nextChapter = STORY_CHAPTERS.find(c => c.id === chapter.next);
  if (nextChapter) {
    gameState.chapter = nextChapter.id;
    showStoryChapter(nextChapter);
  }
  updateUI();
  saveGame();
}

function makeChoice(choice) {
  const panel = document.getElementById('story-panel');
  if (choice === 'open') {
    showToast('📖 Вы открыли Красную книгу и получили древние знания! +30 табличек!', 'success');
    gameState.resources.tablets += 30;
  } else {
    showToast('🔥 Вы сожгли Красную книгу. Марс спасён, но знания утеряны. +20 базальта за жертву.', 'info');
    gameState.resources.basalt += 20;
  }
  panel.classList.remove('active');
  document.getElementById('chapter-display').textContent = 'Финал';
  updateUI();
  saveGame();
}

function updateUI() {
  const r = gameState.resources;
  document.getElementById('res-wood').textContent = Math.floor(r.wood);
  document.getElementById('res-food').textContent = Math.floor(r.food);
  document.getElementById('res-basalt').textContent = Math.floor(r.basalt);
  document.getElementById('res-water').textContent = Math.floor(r.water);
  document.getElementById('res-tablets').textContent = Math.floor(r.tablets);
  document.getElementById('population-count').textContent = gameState.population;
  const levels = ['mine', 'forge', 'house', 'farm', 'mill', 'well'];
  levels.forEach(l => {
    const el = document.getElementById(`${l}-level`);
    if (el) el.textContent = `Ур.${gameState.buildingLevels[l] || 0}`;
  });
  updateProgress();
}

function updateProgress() {
  const tablets = gameState.resources.tablets || 0;
  const progress = Math.min((tablets / 100) * 100, 100);
  document.getElementById('progress-fill').style.width = progress + '%';
  document.getElementById('progress-text').textContent = `${Math.floor(tablets)} / 100`;
  if (tablets >= 100 && gameState.gameStarted) {
    document.getElementById('victory-screen').classList.add('active');
  }
}

function buildBuilding(type) {
  const costs = {
    mine: { wood: 5, food: 3, basalt: 0, water: 0 },
    forge: { wood: 8, basalt: 3, food: 0, water: 0 },
    house: { wood: 10, food: 5, basalt: 0, water: 0 },
    farm: { wood: 6, food: 4, basalt: 0, water: 0 },
    mill: { wood: 8, food: 6, basalt: 0, water: 0 },
    well: { wood: 6, basalt: 4, food: 0, water: 0 }
  };
  const cost = costs[type];
  if (!cost) return;
  for (const [res, amount] of Object.entries(cost)) {
    if ((gameState.resources[res] || 0) < amount) {
      showToast(`❌ Не хватает ${res}!`, 'error');
      return;
    }
  }
  for (const [res, amount] of Object.entries(cost)) {
    gameState.resources[res] -= amount;
  }
  gameState.buildings[type] = (gameState.buildings[type] || 0) + 1;
  gameState.buildingLevels[type] = (gameState.buildingLevels[type] || 0) + 1;
  if (type === 'house') { gameState.population += 1; showToast(`👷 Новый рабочий! Население: ${gameState.population}`, 'success'); }
  const names = { mine: 'Шахта', forge: 'Кузница', house: 'Дом', farm: 'Ферма', mill: 'Мельница', well: 'Колодец' };
  showToast(`🏗️ Построена ${names[type]}! Уровень: ${gameState.buildingLevels[type]}`, 'success');
  updateUI();
  saveGame();
}

function createTablet() {
  const cost = { wood: 2, food: 1, basalt: 1 };
  for (const [res, amount] of Object.entries(cost)) {
    if ((gameState.resources[res] || 0) < amount) {
      showToast(`❌ Не хватает ${res}!`, 'error');
      return;
    }
  }
  for (const [res, amount] of Object.entries(cost)) { gameState.resources[res] -= amount; }
  gameState.resources.tablets += 1;
  if (typeof window.addExperience === 'function' && gameState.userId) { window.addExperience(gameState.userId, 10); }
  showToast(`📜 Создана табличка! (+10 опыта)`, 'success');
  updateUI();
  saveGame();
}

function collectResources() {
  const now = Date.now();
  const elapsed = (now - gameState.lastCollect) / 1000;
  if (elapsed < 5) { showToast(`⏳ Подождите ${Math.ceil(5 - elapsed)}с`, 'info'); return; }
  const b = gameState.buildings;
  const r = gameState.resources;
  const bonus = 1 + gameState.alliances * 0.05;
  r.wood += (b.farm * 1 + b.house * 0.5 + b.mill * 0.3 + Math.floor(gameState.population / 3)) * bonus;
  r.food += (b.farm * 2 + b.house * 1 + b.mill * 0.5 + Math.floor(gameState.population / 2)) * bonus;
  r.basalt += (b.mine * 2 + b.forge * 0.5) * bonus;
  r.water += (b.well * 2 + b.house * 0.3) * bonus;
  showToast(`📦 Собрано ресурсов!`, 'success');
  gameState.lastCollect = now;
  updateUI();
  saveGame();
}

setInterval(() => {
  if (!gameState.kingdom) return;
  const b = gameState.buildings;
  const r = gameState.resources;
  const bonus = 1 + gameState.alliances * 0.02;
  r.wood += (b.mine * 0.2 + b.farm * 0.3 + b.mill * 0.2) * bonus;
  r.food += (b.farm * 0.4 + b.mill * 0.3) * bonus;
  r.basalt += (b.mine * 0.3 + b.forge * 0.1) * bonus;
  r.water += (b.well * 0.4 + b.house * 0.1) * bonus;
  updateUI();
}, 10000);

function makeAlliance() {
  if (gameState.resources.tablets < 10) { showToast('❌ Нужно 10 табличек!', 'error'); return; }
  gameState.resources.tablets -= 10;
  gameState.alliances += 1;
  showToast(`🤝 Союз! +${gameState.alliances * 5}% к добыче`, 'success');
  updateUI();
  saveGame();
}

function tradeResources() {
  if (gameState.resources.wood < 10 || gameState.resources.food < 10) {
    showToast('❌ Нужно 10 дерева и 10 еды', 'error');
    return;
  }
  gameState.resources.wood -= 10;
  gameState.resources.food -= 10;
  gameState.resources.basalt += 15;
  showToast(`🔄 Торговля: +15 базальта`, 'success');
  updateUI();
  saveGame();
}

function recruitArmy() {
  if (gameState.resources.food < 15 || gameState.resources.basalt < 10) {
    showToast('❌ Нужно 15 еды и 10 базальта', 'error');
    return;
  }
  gameState.resources.food -= 15;
  gameState.resources.basalt -= 10;
  gameState.army += 1;
  showToast(`⚔️ Армия набрана! (${gameState.army} отрядов)`, 'success');
  updateUI();
  saveGame();
}

function attackRegion() {
  if (gameState.army < 1) { showToast('❌ Нет армии!', 'error'); return; }
  gameState.army -= 1;
  const bonus = Math.floor(Math.random() * 10) + 5;
  gameState.resources.basalt += bonus;
  showToast(`🗡️ Набег: +${bonus} базальта`, 'success');
  updateUI();
  saveGame();
}

function openGlobalMap() { document.getElementById('global-map-overlay').classList.add('active'); }
function closeGlobalMap() { document.getElementById('global-map-overlay').classList.remove('active'); }

function resetGame() {
  document.getElementById('victory-screen').classList.remove('active');
  gameState.resources = { wood: 20, food: 15, basalt: 5, water: 10, tablets: 0 };
  gameState.buildings = { mine: 0, forge: 0, house: 0, farm: 0, mill: 0, well: 0 };
  gameState.buildingLevels = { mine: 0, forge: 0, house: 0, farm: 0, mill: 0, well: 0 };
  gameState.population = 2;
  gameState.army = 1;
  gameState.alliances = 0;
  gameState.regions = [];
  gameState.chapter = 1;
  gameState.lastCollect = Date.now();
  initGrid();
  initGlobalMap();
  startStory();
  updateUI();
  saveGame();
  showToast('🔄 Игра перезапущена!', 'info');
}

async function saveGame() {
  if (!gameState.userId) {
    const client = supabase.createClient('https://ncytbgbzfjfoqmmgfygz.supabase.co', 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D');
    const { data } = await client.auth.getSession();
    if (data?.session?.user) gameState.userId = data.session.user.id;
    else return;
  }
  try {
    const client = supabase.createClient('https://ncytbgbzfjfoqmmgfygz.supabase.co', 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D');
    await client.from('profiles').update({ game_data: gameState }).eq('user_id', gameState.userId);
  } catch (e) { console.warn('⚠️ Ошибка сохранения:', e); }
}

async function loadGame() {
  const client = supabase.createClient('https://ncytbgbzfjfoqmmgfygz.supabase.co', 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D');
  const { data } = await client.auth.getSession();
  if (!data?.session?.user) return;
  gameState.userId = data.session.user.id;
  try {
    const { data: profile } = await client.from('profiles').select('game_data').eq('user_id', gameState.userId).single();
    if (profile?.game_data) {
      const saved = profile.game_data;
      gameState.kingdom = saved.kingdom || null;
      gameState.resources = saved.resources || { wood: 20, food: 15, basalt: 5, water: 10, tablets: 0 };
      gameState.buildings = saved.buildings || { mine: 0, forge: 0, house: 0, farm: 0, mill: 0, well: 0 };
      gameState.buildingLevels = saved.buildingLevels || { mine: 0, forge: 0, house: 0, farm: 0, mill: 0, well: 0 };
      gameState.population = saved.population || 2;
      gameState.army = saved.army || 1;
      gameState.alliances = saved.alliances || 0;
      gameState.regions = saved.regions || [];
      gameState.chapter = saved.chapter || 1;
      if (gameState.kingdom) {
        document.getElementById('game-kingdom-name').textContent = gameState.kingdom;
        document.getElementById('game-screen').classList.add('active');
        document.getElementById('kingdom-screen').classList.remove('active');
        document.getElementById('loader-screen').classList.add('hidden');
        initGrid();
        initGlobalMap();
        const chapter = STORY_CHAPTERS.find(c => c.id === gameState.chapter);
        if (chapter && gameState.chapter < 10) showStoryChapter(chapter);
        else if (gameState.chapter >= 10) document.getElementById('chapter-display').textContent = 'Финал';
        updateUI();
        showToast(`👑 Добро пожаловать обратно!`, 'info');
      }
    }
  } catch (e) { console.warn('⚠️ Ошибка загрузки:', e); }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

document.addEventListener('DOMContentLoaded', function() {
  if (typeof supabase !== 'undefined') loadGame();
  else console.warn('⚠️ Supabase не загружен');
});

window.buildBuilding = buildBuilding;
window.createTablet = createTablet;
window.collectResources = collectResources;
window.showKingdoms = showKingdoms;
window.selectKingdom = selectKingdom;
window.saveGame = saveGame;
window.updateUI = updateUI;
window.showToast = showToast;
window.skipLoading = skipLoading;
window.openGlobalMap = openGlobalMap;
window.closeGlobalMap = closeGlobalMap;
window.onCellClick = onCellClick;
window.makeAlliance = makeAlliance;
window.tradeResources = tradeResources;
window.recruitArmy = recruitArmy;
window.attackRegion = attackRegion;
window.resetGame = resetGame;
window.captureRegion = captureRegion;
window.collectRegionBonus = collectRegionBonus;
window.makeChoice = makeChoice;
</script>
</body>
</html>
