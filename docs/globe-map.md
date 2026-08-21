<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>3D-карта Марса</title>
  <style>
    /* --- RESET --- */
    * { box-sizing: border-box; }
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100vh;
      background: #0a0a1a;
      font-family: 'Segoe UI', 'Arial Unicode MS', sans-serif;
      overflow-x: hidden;
      overflow-y: auto;
    }

    /* --- КОНТЕЙНЕР КАРТЫ --- */
    #map-container {
      position: relative;
      width: 100%;
      height: 90vh;
      max-width: 100%;
      margin: 0 auto;
      background: #0a0a1a;
      overflow: hidden;
    }

    #mars-globe {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* --- БОКОВАЯ ПАНЕЛЬ (скрыта по умолчанию) --- */
    .sidebar {
      position: absolute;
      top: 70px;
      left: 20px;
      width: 240px;
      background: rgba(20, 20, 35, 0.92);
      backdrop-filter: blur(12px);
      border-radius: 12px;
      border: 1px solid #2a2a4a;
      padding: 16px 12px;
      z-index: 30;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      transition: transform 0.3s ease, opacity 0.3s ease;
      color: #ccc;
      pointer-events: auto;
      transform: translateX(-280px);
      opacity: 0;
      pointer-events: none;
    }
    .sidebar.visible {
      transform: translateX(0);
      opacity: 1;
      pointer-events: auto;
    }

    .sidebar-title {
      font-size: 16px;
      font-weight: bold;
      color: #d4a0a0;
      margin-bottom: 12px;
      text-align: center;
      border-bottom: 1px solid #2a2a4a;
      padding-bottom: 8px;
    }

    .sidebar-section {
      margin-bottom: 12px;
    }
    .sidebar-section-label {
      font-size: 12px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
      display: block;
    }
    .sidebar-btn {
      display: block;
      width: 100%;
      background: rgba(40, 40, 60, 0.6);
      border: 1px solid #3a3a5e;
      border-radius: 6px;
      padding: 8px 12px;
      color: #d4d4e8;
      font-size: 13px;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 4px;
      font-family: inherit;
    }
    .sidebar-btn:hover {
      background: rgba(60, 60, 90, 0.8);
      border-color: #6a6aaa;
    }
    .sidebar-btn.active {
      background: #3a2a6a;
      border-color: #8a6aaa;
      box-shadow: 0 0 12px rgba(138, 106, 170, 0.3);
    }
    .sidebar-btn .icon { margin-right: 8px; }
    .sidebar-btn .status {
      float: right;
      color: #888;
      font-size: 12px;
    }

    /* --- КНОПКА-ГАМБУРГЕР --- */
    .hamburger {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 40;
      background: rgba(20, 20, 35, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid #2a2a4a;
      border-radius: 8px;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #d4d4e8;
      font-size: 22px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      transition: background 0.2s;
    }
    .hamburger:hover {
      background: rgba(40, 40, 60, 0.9);
    }

    /* --- ПОИСК + КООРДИНАТЫ (одна строка) --- */
    .top-left-bar {
      position: absolute;
      top: 20px;
      left: 80px;
      z-index: 25;
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(20, 20, 35, 0.7);
      backdrop-filter: blur(8px);
      border: 1px solid #2a2a4a;
      border-radius: 8px;
      padding: 6px 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      flex-wrap: nowrap;
    }
    .search-container {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 160px;
    }
    .search-container img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      filter: drop-shadow(0 0 4px rgba(255,255,255,0.2));
    }
    .search-container input {
      background: transparent;
      border: none;
      color: #d4d4e8;
      font-size: 14px;
      outline: none;
      width: 100%;
      padding: 4px 0;
      font-family: inherit;
    }
    .search-container input::placeholder {
      color: #666;
      font-style: italic;
    }
    .search-container .clear-btn {
      color: #666;
      cursor: pointer;
      font-size: 16px;
      padding: 0 4px;
      display: none;
    }
    .search-container .clear-btn.visible {
      display: block;
    }
    .search-container .search-btn {
      background: transparent;
      border: none;
      color: #aaa;
      cursor: pointer;
      font-size: 18px;
      padding: 0 4px;
      transition: color 0.2s;
    }
    .search-container .search-btn:hover {
      color: #fff;
    }

    /* Координаты — справа от поиска */
    #coords {
      color: #fff;
      font-size: 13px;
      background: rgba(0,0,0,0.5);
      padding: 4px 12px;
      border-radius: 16px;
      border: 1px solid #444;
      font-family: monospace;
      pointer-events: none;
      user-select: none;
      white-space: nowrap;
      margin-left: auto;
    }

    /* --- ПЕРЕКЛЮЧАТЕЛЬ КАРТЫ (правый верх) --- */
    .map-switcher {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 25;
      background: rgba(20, 20, 35, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid #2a2a4a;
      border-radius: 8px;
      padding: 4px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      min-width: 44px;
      overflow: hidden;
      transition: all 0.3s;
    }
    .map-switcher .switcher-btn {
      background: transparent;
      border: none;
      color: #d4d4e8;
      padding: 8px 14px;
      cursor: pointer;
      font-size: 13px;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
      font-family: inherit;
      white-space: nowrap;
      width: 100%;
    }
    .map-switcher .switcher-btn:hover {
      background: rgba(60, 60, 90, 0.6);
    }
    .map-switcher .switcher-btn.active {
      background: #3a2a6a;
      border-left: 3px solid #8a6aaa;
    }
    .map-switcher .switcher-btn .icon { font-size: 18px; }
    .map-switcher .switcher-label { display: none; }
    .map-switcher:hover { min-width: 180px; }
    .map-switcher:hover .switcher-label { display: inline; }

    /* --- ЛЕГЕНДА --- */
    .legend {
      position: absolute;
      bottom: 20px;
      left: 20px;
      color: #ccc;
      font-size: 13px;
      background: rgba(10, 10, 26, 0.8);
      padding: 12px 18px;
      border-radius: 8px;
      border: 1px solid #2a2a4a;
      z-index: 10;
      pointer-events: none;
    }
    .legend span {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .legend .city { background: #ff6633; }
    .legend .sea { background: #3388dd; }
    .legend .mountain { background: #cc8844; }
    .legend-item {
      display: flex;
      align-items: center;
      margin: 4px 0;
    }

    .info-panel {
      position: absolute;
      bottom: 70px;
      right: 20px;
      color: #aaa;
      font-size: 12px;
      background: rgba(10, 10, 26, 0.7);
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid #2a2a4a;
      z-index: 10;
      text-align: right;
      pointer-events: none;
      backdrop-filter: blur(4px);
    }

    /* --- ФУТЕР (под картой) --- */
    .footer-message {
      text-align: center;
      color: #ffaa44;
      font-size: 15px;
      padding: 8px 10px;
      background: #0a0a1a;
      border-top: 1px solid #ff6633;
      font-family: 'Segoe UI', sans-serif;
      width: 100%;
    }
    .footer-message .sub {
      font-size: 11px;
      color: #888;
      display: block;
      margin-top: 1px;
    }

    /* --- ПЛАВАЮЩИЕ МОБИЛЬНЫЕ КНОПКИ --- */
    .mobile-controls {
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 20;
      pointer-events: none;
    }
    .mobile-controls button {
      pointer-events: auto;
      background: rgba(10, 10, 26, 0.85);
      border: 1px solid #2a2a4a;
      color: #fff;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 18px;
      backdrop-filter: blur(4px);
      transition: 0.2s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.6);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: manipulation;
    }
    .mobile-controls button:active {
      transform: scale(0.92);
      background: rgba(255, 255, 255, 0.15);
    }
    .mobile-controls button.active {
      border-color: #ff6633;
      box-shadow: 0 0 15px #ff663366;
    }

    @media (min-width: 769px) {
      .mobile-controls { display: none; }
    }

    /* --- АДАПТИВНОСТЬ --- */
    @media (max-width: 768px) {
      .map-container { height: 85vh; }
      .hamburger { top: 10px; left: 10px; width: 40px; height: 40px; font-size: 20px; }
      .top-left-bar {
        top: 10px;
        left: 60px;
        padding: 4px 8px;
        gap: 6px;
        flex-wrap: wrap;
      }
      .search-container { min-width: 120px; }
      .search-container input { font-size: 12px; }
      #coords { font-size: 11px; padding: 2px 8px; }
      .sidebar { top: 60px; left: 10px; width: 200px; }
      .map-switcher { top: 10px; right: 10px; }
      .map-switcher .switcher-btn { padding: 6px 10px; font-size: 12px; }
      .map-switcher .switcher-label { display: inline; }
      .map-switcher:hover { min-width: auto; }
      .legend, .info-panel { display: none; }
      .mobile-controls { bottom: 16px; right: 16px; gap: 6px; }
      .mobile-controls button { width: 40px; height: 40px; font-size: 16px; }
    }
    @media (max-width: 480px) {
      .top-left-bar { left: 50px; gap: 4px; }
      .search-container { min-width: 90px; }
      .search-container input { font-size: 11px; }
      #coords { font-size: 10px; padding: 2px 6px; }
      .sidebar { width: 170px; left: 6px; top: 55px; }
    }

    /* --- ЗАГРУЗКА --- */
    .loading-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #888;
      font-size: 18px;
      z-index: 5;
    }
  </style>
</head>
<body>

<div id="map-container">
  <div id="mars-globe">
    <div class="loading-text" id="loadingText">🌍 Загрузка карты...</div>
  </div>

  <!-- Боковая панель (скрыта по умолчанию) -->
  <div class="sidebar" id="sidebar">
    <div class="sidebar-title">🗺️ Слои карты</div>
    <div class="sidebar-section">
      <span class="sidebar-section-label">Тип карты</span>
      <button class="sidebar-btn active" data-layer="dark" id="layerDark">🌙 Тёмная</button>
      <button class="sidebar-btn" data-layer="satellite" id="layerSatellite">🛰️ Спутник</button>
      <button class="sidebar-btn" data-layer="light" id="layerLight">☀️ Светлая</button>
    </div>
    <div class="sidebar-section" style="border-top:1px solid #2a2a4a; padding-top:10px;">
      <button class="sidebar-btn" id="btnToggleLabels" style="display:flex; align-items:center; gap:8px;">🏷️ Метки <span class="status" id="labelsStatus">вкл</span></button>
      <button class="sidebar-btn" id="btnToggleOrbits" style="display:flex; align-items:center; gap:8px;">⭕ Орбиты <span class="status" id="orbitsStatus">вкл</span></button>
      <button class="sidebar-btn" id="btnToggleSatellites" style="display:flex; align-items:center; gap:8px;">🛰️ Спутники <span class="status" id="satellitesStatus">вкл</span></button>
      <button class="sidebar-btn" id="btnToggleRotation" style="display:flex; align-items:center; gap:8px;">🔄 Вращение <span class="status" id="rotationStatus">вкл</span></button>
    </div>
  </div>

  <!-- Кнопка-гамбургер -->
  <div class="hamburger" id="hamburger" title="Показать меню">☰</div>

  <!-- Поиск + координаты -->
  <div class="top-left-bar">
    <div class="search-container" id="searchContainer">
      <img src="https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/stickers/sticker-galaxy.png" alt="galaxy" />
      <input type="text" id="searchInput" placeholder="Поиск мест..." />
      <button class="search-btn" id="searchBtn" title="Найти">🔍</button>
      <span class="clear-btn" id="clearSearch">✕</span>
    </div>
    <div id="coords">🪐 наведите на планету</div>
  </div>

  <!-- Переключатель карты (правый верх) -->
  <div class="map-switcher" id="mapSwitcher">
    <button class="switcher-btn active" data-layer="dark"><span class="icon">🌙</span><span class="switcher-label">Тёмная</span></button>
    <button class="switcher-btn" data-layer="satellite"><span class="icon">🛰️</span><span class="switcher-label">Спутник</span></button>
    <button class="switcher-btn" data-layer="light"><span class="icon">☀️</span><span class="switcher-label">Светлая</span></button>
  </div>

  <!-- Легенда -->
  <div class="legend">
    <div class="legend-item"><span class="city"></span> Города</div>
    <div class="legend-item"><span class="sea"></span> Моря</div>
    <div class="legend-item"><span class="mountain"></span> Горы / Регионы</div>
  </div>

  <!-- Инфо-панель -->
  <div class="info-panel">
    🖱️ Вращайте мышкой<br>🔍 Колесо — приближение
  </div>

  <!-- Мобильные кнопки -->
  <div class="mobile-controls" id="mobileControls">
    <button id="btnM" title="Метки">🏷️</button>
    <button id="btnO" title="Орбиты">⭕</button>
    <button id="btnP" title="Спутники">🛰️</button>
    <button id="btnR" title="Вращение">🔄</button>
  </div>
</div>

<!-- Футер -->
<div class="footer-message">
  🚀 <span style="color:#ff6633;">Совия</span> — выздоравливай быстрее! 🍫 Желаю тебе шоколадку и марсианского настроения! 🌟
  <span class="sub">🖱️ Вращайте мышкой • 🔍 Колесо — приближение • 👆 Нажмите на метку</span>
</div>

<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
  }
}
</script>

<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================
// 1. СЦЕНА, КАМЕРА, РЕНДЕР
// ============================================================
const container = document.getElementById('mars-globe');
const loadingText = document.getElementById('loadingText');
const coordsDiv = document.getElementById('coords');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 3.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// ============================================================
// 2. УПРАВЛЕНИЕ
// ============================================================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.minDistance = 1.5;
controls.maxDistance = 8;
controls.target.set(0, 0, 0);
controls.autoRotate = false;
controls.update();

// ============================================================
// 3. ЗВЁЗДЫ
// ============================================================
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 6000;
const starPositions = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount * 3; i++) {
  starPositions[i] = (Math.random() - 0.5) * 200;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// ============================================================
// 4. МАРС (текстуры)
// ============================================================
const textureLoader = new THREE.TextureLoader();
const marsGeometry = new THREE.SphereGeometry(1, 64, 64);
const marsMaterial = new THREE.MeshPhongMaterial({ color: 0xcc6633 });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

// Пути к текстурам
const MAP_DARK = 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/map/new-map.png';
const MAP_SATELLITE = 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/map/mars-satellite.png';
const MAP_LIGHT = 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/map/my-new-map.png';

// Загружаем текстуры
const textureDark = textureLoader.load(MAP_DARK);
const textureSatellite = textureLoader.load(MAP_SATELLITE);
const textureLight = textureLoader.load(MAP_LIGHT);

// Устанавливаем начальную (тёмную)
marsMaterial.map = textureDark;
marsMaterial.color.set(0xffffff);
marsMaterial.needsUpdate = true;

// Скрываем загрузку через 2 секунды
let loadingHidden = false;
function hideLoading() {
  if (!loadingHidden) {
    loadingText.style.display = 'none';
    loadingHidden = true;
  }
}
// На всякий случай, через 2 секунды скрываем
setTimeout(hideLoading, 2000);

// Функция переключения слоёв
function setLayer(layer) {
  if (layer === 'dark') {
    marsMaterial.map = textureDark;
  } else if (layer === 'satellite') {
    marsMaterial.map = textureSatellite;
  } else if (layer === 'light') {
    marsMaterial.map = textureLight;
  }
  marsMaterial.needsUpdate = true;
  document.querySelectorAll('.sidebar-btn[data-layer]').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.sidebar-btn[data-layer="${layer}"]`)?.classList.add('active');
  document.querySelectorAll('.map-switcher .switcher-btn[data-layer]').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.map-switcher .switcher-btn[data-layer="${layer}"]`)?.classList.add('active');
}

// ============================================================
// 5. ОСВЕЩЕНИЕ
// ============================================================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);
const sunLight = new THREE.DirectionalLight(0xffeedd, 0.8);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);
const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3);
fillLight.position.set(-3, 0, 4);
scene.add(fillLight);

// ============================================================
// 6. ФОБОС И ДЕЙМОС
// ============================================================
const PHOBOS_RADIUS = 2.8;
const DEIMOS_RADIUS = 4.0;
const PHOBOS_SPEED = 0.8;
const DEIMOS_SPEED = 0.3;

const phobosGroup = new THREE.Group();
const deimosGroup = new THREE.Group();
scene.add(phobosGroup);
scene.add(deimosGroup);

function createMoon(radius, texturePath, color = 0xaaaaaa, size = 0.08) {
  const geo = new THREE.SphereGeometry(size, 24, 24);
  const mat = new THREE.MeshPhongMaterial({ 
    map: textureLoader.load(texturePath),
    color: 0xffffff,
    emissive: 0x111111
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(radius, 0, 0);
  return mesh;
}

const phobos = createMoon(PHOBOS_RADIUS, 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/215.jpg', 0xaaaaaa, 0.08);
phobosGroup.add(phobos);
const deimos = createMoon(DEIMOS_RADIUS, 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/201.jpg', 0x888888, 0.06);
deimosGroup.add(deimos);

function createOrbit(radius, color = 0x446688) {
  const points = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle)));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
  return new THREE.Line(geometry, material);
}

const phobosOrbit = createOrbit(PHOBOS_RADIUS, 0x88aaff);
const deimosOrbit = createOrbit(DEIMOS_RADIUS, 0x88aaff);
scene.add(phobosOrbit);
scene.add(deimosOrbit);

let satellitesVisible = true;
let satellitesRotating = true;

// ============================================================
// 7. МЕТКИ (С ФОТОГРАФИЯМИ)
// ============================================================
const LON_OFFSET = 0;
const LAT_OFFSET = 0;

function latLonToPosition(lat, lon, radius = 1.0) {
  lat += LAT_OFFSET;
  lon += LON_OFFSET;
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function positionToLatLon(pos) {
  const radius = pos.length();
  const lat = 90 - Math.acos(pos.y / radius) * 180 / Math.PI;
  let lon = Math.atan2(pos.z, -pos.x) * 180 / Math.PI - 180;
  if (lon < -180) lon += 360;
  if (lon > 180) lon -= 360;
  return { lat, lon };
}

const isMobile = window.innerWidth <= 768;

function createLabelSprite(text, lat, lon, color = '#ff6633', link = '#', description = '', image = '') {
  const pos = latLonToPosition(lat, lon);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const canvasWidth = isMobile ? 500 : 400;
  const canvasHeight = isMobile ? 140 : 120;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const radiusBg = 20;
  ctx.beginPath();
  ctx.moveTo(radiusBg, 0);
  ctx.lineTo(canvas.width - radiusBg, 0);
  ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radiusBg);
  ctx.lineTo(canvas.width, canvas.height - radiusBg);
  ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radiusBg, canvas.height);
  ctx.lineTo(radiusBg, canvas.height);
  ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radiusBg);
  ctx.lineTo(0, radiusBg);
  ctx.quadraticCurveTo(0, 0, radiusBg, 0);
  ctx.closePath();
  ctx.fillStyle = color + '99';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  const fontSize = isMobile ? 40 : 32;
  ctx.font = `bold ${fontSize}px Segoe UI, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const sprite = new THREE.Sprite(material);
  sprite.position.copy(pos);
  const scaleX = isMobile ? 0.30 : 0.22;
  const scaleY = isMobile ? 0.09 : 0.07;
  sprite.scale.set(scaleX, scaleY, 1);

  sprite.userData = { pos: pos.clone(), color, link, text, lat, lon, isLabel: true, description, image };
  return sprite;
}

// БАЗОВЫЙ ПУТЬ К ИЗОБРАЖЕНИЯМ
const IMG_BASE = 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/';

const labelData = [
  ['🌊 Ацидалийское море', 33.8, -34.4, '#3388dd', 'https://mars-wiki.ru/geography/acidalia-sea/', 'Огромное море в северном полушарии Марса. Берега изрезаны древними каналами.', IMG_BASE + 'acidalia-sea.png'],
  ['🌊 Море Эллада', -34.4, 79.4, '#3388dd', 'https://mars-wiki.ru/geography/ellada-sea/', 'Крупнейший ударный бассейн, заполненный водой. Здесь находятся остатки древней жизни.', IMG_BASE + 'ellada-sea.png'],
  ['🌊 Море Аргира', -41.6, -38.8, '#3388dd', 'https://mars-wiki.ru/geography/argir-sea/', 'Море на юге Марса, окружённое горами. Считается местом первых марсианских поселений.', IMG_BASE + 'argir-sea.png'],
  ['🌊 Эритрейское море', 1, -26.8, '#3388dd', 'https://mars-wiki.ru/geography/eritreya-sea/', 'Море в экваториальной зоне. Здесь часто бывают песчаные бури, но вода прозрачная.', IMG_BASE + 'eritreya-sea.jpg'],
  ['🌊 Амазонское море', 41.1, -154.2,'#3388dd', 'https://mars-wiki.ru/geography/amazon-sea/', 'Самое молодое море, образовавшееся в результате таяния подлёдных вод.', IMG_BASE + 'amazon-sea.jpg'],
  ['🌊 Зефирийское море', 10.2, 166.5, '#3388dd', 'https://mars-wiki.ru/geography/zephyria-sea/', 'Море с бирюзовой водой. На его берегах находятся древние обсерватории.', IMG_BASE + 'zephyria-sea.png'],
  ['🌊 Зал. Большой Сирт', 16.7, 90, '#3388dd', 'https://mars-wiki.ru/geography/sirtis-major-bay/', 'Крупный залив, известный своими ветрами и высокими волнами.', IMG_BASE + 'sirtis-major-bay.png'],
  ['👑 Королевство Эдем', 30.5, 23.6, '#ffaa00', 'https://mars-wiki.ru/geography/eden/', 'Центр марсианской цивилизации. Здесь находятся сады, библиотеки и дворцы.', ''],
  ['👑 Королевство Аркадия', 44.5, -124.3, '#ffaa00', 'https://mars-wiki.ru/geography/arkadia/', 'Северное королевство, знаменитое своими шахтами и металлургией.', IMG_BASE + 'arkadia-landscape.jpg'],
  ['🌋 Олимп', 18.4, 226, '#cc8844', '#', 'Высшая точка Марса, 21 км над уровнем моря. Вершина покрыта вечными облаками.', ''],
  ['🏔️ Долина Маринер', -1.3, -74, '#cc8844', '#', 'Гигантский каньон протяжённостью 4000 км. Здесь можно увидеть слои горных пород.', ''],
  ['🏛️ Окхасен', 15.26, -53.31, '#ff6633', 'https://mars-wiki.ru/geography/okhasen/', 'Город у Ацидалийского моря. Торговый, научный и культурный центр.', ''],
  ['🏛️ Роген-Ария', 53.7, 35.7, '#ff6633', 'https://mars-wiki.ru/geography/rogen-aria/', 'Город на севере, известный своими академиями и астрономическими обсерваториями.', ''],
  ['🚀 Космодром Фарсиды', 20.3, -80, '#ff6633', 'https://mars-wiki.ru/geography/kosmodrom-farsidy/', 'Главный космический порт Марса. Отсюда стартуют корабли к звёздам.', ''],
];

const labelsGroup = new THREE.Group();
scene.add(labelsGroup);
const labelSprites = [];

for (let [text, lat, lon, color, link, description, image] of labelData) {
  const sprite = createLabelSprite(text, lat, lon, color, link, description, image);
  labelsGroup.add(sprite);
  labelSprites.push(sprite);
}

// ============================================================
// 8. ВСПЛЫВАЮЩАЯ КАРТОЧКА (С ИЗОБРАЖЕНИЕМ)
// ============================================================
function showPopup(title, description, link, image) {
  const old = document.getElementById('popup-card');
  if (old) old.remove();

  const div = document.createElement('div');
  div.id = 'popup-card';
  div.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(10,10,30,0.95); color: #fff; padding: 24px; border-radius: 16px;
    border: 2px solid #6a4a7a; max-width: 420px; width: 90%; z-index: 200;
    box-shadow: 0 8px 32px rgba(0,0,0,0.8); font-family: 'Segoe UI', 'Segoe UI Emoji', sans-serif;
    pointer-events: auto;
    max-height: 90vh;
    overflow-y: auto;
  `;
  let imageHtml = '';
  if (image && image !== '') {
    imageHtml = `<img src="${image}" style="max-width:100%; border-radius:8px; margin-bottom:12px; border:1px solid #444;" />`;
  }
  div.innerHTML = `
    <h2 style="margin:0 0 10px; color:#d4a0a0;">${title}</h2>
    ${imageHtml}
    <p style="margin:0 0 15px; line-height:1.6;">${description}</p>
    ${link && link !== '#' ? `<a href="${link}" target="_blank" style="color:#88aaff; text-decoration:underline;">Подробнее →</a>` : ''}
    <br><button id="close-popup" style="margin-top:15px; background:#3a2a4a; border:none; color:#fff; padding:8px 20px; border-radius:6px; cursor:pointer;">Закрыть</button>
  `;
  document.body.appendChild(div);
  document.getElementById('close-popup').addEventListener('click', () => div.remove());
  div.addEventListener('click', (e) => { if (e.target === div) div.remove(); });
}

// ============================================================
// 9. ОБРАБОТЧИКИ КООРДИНАТ И КЛИКОВ
// ============================================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function updateCoords(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  const clientX = event.clientX || (event.touches && event.touches[0].clientX);
  const clientY = event.clientY || (event.touches && event.touches[0].clientY);
  if (clientX === undefined) return;
  mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(mars);
  if (intersects.length > 0) {
    const point = intersects[0].point;
    const { lat, lon } = positionToLatLon(point);
    coordsDiv.textContent = `📍 ${lat.toFixed(2)}° с.ш., ${lon.toFixed(2)}° в.д.`;
  } else {
    coordsDiv.textContent = '🪐 наведите на планету';
  }
}

function onCanvasClick(event) {
  event.preventDefault();
  const rect = renderer.domElement.getBoundingClientRect();
  let clientX, clientY;
  if (event.changedTouches) {
    clientX = event.changedTouches[0].clientX;
    clientY = event.changedTouches[0].clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }
  mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(labelSprites);
  if (intersects.length > 0) {
    const sprite = intersects[0].object;
    const pos = sprite.userData.pos.clone().normalize();
    const cameraDir = camera.position.clone().normalize();
    const dot = cameraDir.dot(pos);
    if (dot > 0) {
      const link = sprite.userData.link;
      const text = sprite.userData.text;
      const description = sprite.userData.description || 'Изучите эту локацию в нашей энциклопедии.';
      const image = sprite.userData.image || '';
      showPopup(text, description, link, image);
    }
  }
}

renderer.domElement.addEventListener('mousemove', updateCoords);
renderer.domElement.addEventListener('click', onCanvasClick);
renderer.domElement.addEventListener('touchstart', updateCoords, { passive: true });
renderer.domElement.addEventListener('touchend', onCanvasClick, { passive: false });

// ============================================================
// 10. АНИМАЦИЯ
// ============================================================
function animate() {
  requestAnimationFrame(animate);

  if (satellitesRotating) {
    phobosGroup.rotation.y += PHOBOS_SPEED * 0.01;
    deimosGroup.rotation.y += DEIMOS_SPEED * 0.01;
  }

  const cameraDir = camera.position.clone().normalize();
  for (let sprite of labelSprites) {
    const pos = sprite.userData.pos.clone().normalize();
    const dot = cameraDir.dot(pos);
    sprite.material.opacity = dot > 0 ? 1 : 0;
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();

// ============================================================
// 11. УПРАВЛЕНИЕ ЧЕРЕЗ ИНТЕРФЕЙС
// ============================================================
// Переключение слоёв
document.querySelectorAll('.sidebar-btn[data-layer]').forEach(btn => {
  btn.addEventListener('click', () => setLayer(btn.dataset.layer));
});
document.querySelectorAll('.map-switcher .switcher-btn[data-layer]').forEach(btn => {
  btn.addEventListener('click', () => setLayer(btn.dataset.layer));
});

// Toggle меток
let labelsVisible = true;
function toggleLabels() {
  labelsVisible = !labelsVisible;
  labelsGroup.visible = labelsVisible;
  document.getElementById('labelsStatus').textContent = labelsVisible ? 'вкл' : 'выкл';
  document.getElementById('btnM').classList.toggle('active');
}
document.getElementById('btnToggleLabels').addEventListener('click', toggleLabels);
document.getElementById('btnM').addEventListener('click', toggleLabels);
document.getElementById('btnM').classList.add('active');

// Toggle орбит
let orbitsVisible = true;
function toggleOrbits() {
  orbitsVisible = !orbitsVisible;
  phobosOrbit.visible = orbitsVisible;
  deimosOrbit.visible = orbitsVisible;
  document.getElementById('orbitsStatus').textContent = orbitsVisible ? 'вкл' : 'выкл';
  document.getElementById('btnO').classList.toggle('active');
}
document.getElementById('btnToggleOrbits').addEventListener('click', toggleOrbits);
document.getElementById('btnO').addEventListener('click', toggleOrbits);
document.getElementById('btnO').classList.add('active');

// Toggle спутников
let satellitesVis = true;
function toggleSatellites() {
  satellitesVis = !satellitesVis;
  phobosGroup.visible = satellitesVis;
  deimosGroup.visible = satellitesVis;
  document.getElementById('satellitesStatus').textContent = satellitesVis ? 'вкл' : 'выкл';
  document.getElementById('btnP').classList.toggle('active');
}
document.getElementById('btnToggleSatellites').addEventListener('click', toggleSatellites);
document.getElementById('btnP').addEventListener('click', toggleSatellites);
document.getElementById('btnP').classList.add('active');

// Toggle вращения
let rotating = true;
function toggleRotation() {
  rotating = !rotating;
  satellitesRotating = rotating;
  document.getElementById('rotationStatus').textContent = rotating ? 'вкл' : 'выкл';
  document.getElementById('btnR').classList.toggle('active');
}
document.getElementById('btnToggleRotation').addEventListener('click', toggleRotation);
document.getElementById('btnR').addEventListener('click', toggleRotation);
document.getElementById('btnR').classList.add('active');

// Гамбургер
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
let sidebarVisible = false;
hamburger.addEventListener('click', () => {
  sidebarVisible = !sidebarVisible;
  sidebar.classList.toggle('visible', sidebarVisible);
  hamburger.textContent = sidebarVisible ? '✕' : '☰';
});

// Поиск + полёт
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const searchBtn = document.getElementById('searchBtn');

searchInput.addEventListener('input', () => {
  clearSearch.classList.toggle('visible', searchInput.value.length > 0);
});
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  clearSearch.classList.remove('visible');
  searchInput.focus();
});

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (query === '') return;
  const found = labelData.find(item => item[0].toLowerCase().includes(query));
  if (found) {
    const [text, lat, lon] = found;
    // Летим очень близко к поверхности (радиус 1.05)
    const pos = latLonToPosition(lat, lon, 1.05);
    const startPos = camera.position.clone();
    const endPos = pos.clone().multiplyScalar(1.15);
    const duration = 900;
    const startTime = performance.now();
    function fly(time) {
      const t = Math.min((time - startTime) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      camera.position.lerpVectors(startPos, endPos, eased);
      controls.target.copy(pos);
      controls.update();
      if (t < 1) requestAnimationFrame(fly);
    }
    requestAnimationFrame(fly);
  } else {
    alert('Место не найдено');
  }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') performSearch();
});

// ============================================================
// 12. АДАПТИВНОСТЬ
// ============================================================
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
</script>

</body>
</html>
