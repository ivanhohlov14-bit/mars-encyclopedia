<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>3D-карта Марса</title>
  <style>
    /* --- Все стили без изменений (я их скопировал из вашего последнего кода) --- */
    * { box-sizing: border-box; }
    body, html { margin:0; padding:0; width:100%; min-height:100vh; background:#0a0a1a; font-family:'Segoe UI',sans-serif; overflow-y:auto; overflow-x:hidden; }
    .map-container { position:relative; width:100%; height:90vh; max-width:100%; margin:0 auto; background:#0a0a1a; overflow:hidden; }
    #mars-globe { width:100%; height:100%; display:block; }
    .legend { position:absolute; bottom:20px; left:20px; color:#ccc; font-size:13px; background:rgba(10,10,26,0.8); padding:12px 18px; border-radius:8px; border:1px solid #2a2a4a; z-index:10; pointer-events:none; }
    .legend span { display:inline-block; width:12px; height:12px; border-radius:50%; margin-right:6px; }
    .legend .city { background:#ff6633; }
    .legend .sea { background:#3388dd; }
    .legend .mountain { background:#cc8844; }
    .legend-item { display:flex; align-items:center; margin:4px 0; }
    .info-panel { position:absolute; top:20px; right:20px; color:#aaa; font-size:13px; background:rgba(10,10,26,0.8); padding:12px 18px; border-radius:8px; border:1px solid #2a2a4a; z-index:10; text-align:right; pointer-events:none; }
    #coords { position:absolute; top:20px; left:20px; color:#fff; font-size:14px; background:rgba(0,0,0,0.7); padding:8px 16px; border-radius:6px; border:1px solid #444; font-family:monospace; z-index:10; pointer-events:none; user-select:none; }
    .mobile-controls { position:absolute; bottom:20px; right:20px; display:flex; flex-direction:column; gap:10px; z-index:20; pointer-events:none; }
    .mobile-controls button { pointer-events:auto; background:rgba(10,10,26,0.85); border:1px solid #2a2a4a; color:#fff; border-radius:50%; width:48px; height:48px; font-size:20px; backdrop-filter:blur(4px); transition:0.2s; box-shadow:0 4px 12px rgba(0,0,0,0.6); cursor:pointer; display:flex; align-items:center; justify-content:center; touch-action:manipulation; }
    .mobile-controls button:active { transform:scale(0.92); background:rgba(255,255,255,0.15); }
    .mobile-controls button.active { border-color:#ff6633; box-shadow:0 0 15px #ff663366; }
    @media (max-width:768px) { .legend, .info-panel { display:none !important; } .map-container { height:85vh; } #coords { font-size:12px; padding:6px 12px; top:12px; left:12px; } .mobile-controls { bottom:16px; right:16px; gap:8px; } .mobile-controls button { width:44px; height:44px; font-size:18px; } .footer-message { font-size:14px !important; padding:10px !important; } .footer-message .sub { font-size:11px !important; } }
    @media (max-width:480px) { .mobile-controls button { width:40px; height:40px; font-size:16px; } #coords { font-size:10px; padding:4px 10px; top:8px; left:8px; } }
    .loading-text { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#888; font-size:18px; z-index:5; }
    .footer-message { text-align:center; color:#ffaa44; font-size:18px; padding:15px; background:#0a0a1a; border-top:1px solid #ff6633; font-family:'Segoe UI',sans-serif; width:100%; }
  </style>
</head>
<body>

<div class="map-container">
  <div id="mars-globe"><div class="loading-text" id="loadingText">🌍 Загрузка карты...</div></div>
  <div class="legend">
    <div class="legend-item"><span class="city"></span> Города</div>
    <div class="legend-item"><span class="sea"></span> Моря</div>
    <div class="legend-item"><span class="mountain"></span> Горы / Регионы</div>
  </div>
  <div class="info-panel">
    🖱️ Вращайте мышкой<br>🔍 Колесо — приближение<br>👆 Нажмите на метку<br>Клавиша <b>M</b> — метки<br>Клавиша <b>O</b> — орбиты<br>Клавиша <b>P</b> — спутники<br>Клавиша <b>R</b> — вращение спутников
  </div>
  <div id="coords">🪐 наведите на планету</div>
  <div class="mobile-controls" id="mobileControls">
    <button id="btnM" title="Метки">🏷️</button>
    <button id="btnO" title="Орбиты">⭕</button>
    <button id="btnP" title="Спутники">🛰️</button>
    <button id="btnR" title="Вращение">🔄</button>
  </div>
</div>
<div class="footer-message">
  🚀 <span style="color:#ff6633;">Совия</span> — выздоравливай быстрее! 🍫 Желаю тебе шоколадку и марсианского настроения! 🌟<br>
  <span style="font-size:14px; color:#888;" class="sub">
    🖱️ Вращайте мышкой • 🔍 Колесо — приближение • 👆 Нажмите на метку • <b>M</b> — метки • <b>O</b> — орбиты • <b>P</b> — спутники • <b>R</b> — вращение спутников
  </span>
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
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// ============================================================
// 1. СЦЕНА, КАМЕРА, РЕНДЕРЫ
// ============================================================
const container = document.getElementById('mars-globe');
const loadingText = document.getElementById('loadingText');
const coordsDiv = document.getElementById('coords');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 3.5);

// WebGL
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// CSS2D для меток
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(container.clientWidth, container.clientHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.left = '0';
labelRenderer.domElement.style.pointerEvents = 'none'; // чтобы клики шли через сцену
container.appendChild(labelRenderer.domElement);

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
// 4. МАРС (текстура)
// ============================================================
const textureLoader = new THREE.TextureLoader();
const marsGeometry = new THREE.SphereGeometry(1, 64, 64);
const marsMaterial = new THREE.MeshPhongMaterial({ color: 0xcc6633 });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

const mapPath = 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/map/my-new-map.png';
const marsTexture = textureLoader.load(
  mapPath,
  (texture) => {
    marsMaterial.map = texture;
    marsMaterial.color.set(0xffffff);
    marsMaterial.needsUpdate = true;
    loadingText.style.display = 'none';
  },
  undefined,
  (err) => {
    console.error('Ошибка загрузки карты:', err);
    loadingText.textContent = '❌ Карта не загружена.';
    loadingText.style.color = '#ffaa44';
    setTimeout(() => { loadingText.style.display = 'none'; }, 3000);
  }
);

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
// 6. ФОБОС И ДЕЙМОС (без изменений)
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
// 7. МЕТКИ (CSS2D, надёжные и кликабельные)
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

// Создание CSS2D-метки
function createLabel(text, lat, lon, color = '#ff6633', link = '#') {
  const pos = latLonToPosition(lat, lon, 1.01); // чуть выше поверхности

  const div = document.createElement('div');
  div.textContent = text;
  div.style.color = '#fff';
  div.style.backgroundColor = color + 'cc';
  div.style.padding = '4px 12px';
  div.style.borderRadius = '20px';
  div.style.fontSize = '14px';
  div.style.fontWeight = 'bold';
  div.style.border = '2px solid #fff';
  div.style.boxShadow = '0 0 25px ' + color + '66';
  div.style.cursor = 'pointer';
  div.style.transition = 'all 0.3s';
  div.style.pointerEvents = 'auto'; // чтобы клики работали
  div.style.whiteSpace = 'nowrap';
  div.style.fontFamily = 'Segoe UI, sans-serif';
  // обработчик клика на самом DOM-элементе
  div.addEventListener('click', (e) => {
    e.stopPropagation();
    // Вызываем показ карточки
    showPopupForLabel(text, link);
  });
  div.addEventListener('mouseover', () => {
    div.style.transform = 'scale(1.15)';
    div.style.backgroundColor = color;
  });
  div.addEventListener('mouseout', () => {
    div.style.transform = 'scale(1)';
    div.style.backgroundColor = color + 'cc';
  });

  const label = new CSS2DObject(div);
  label.position.copy(pos);
  // Сохраняем данные для проверки видимости
  label.userData = { pos: pos.clone(), link, text };
  return label;
}

// ============================================================
// 7.1 ВСПЛЫВАЮЩАЯ КАРТОЧКА
// ============================================================
function showPopupForLabel(text, link) {
  let description = 'Изучите эту локацию в нашей энциклопедии.';
  if (text.includes('Ацидалийское море')) description = '🌊 Огромное море в северном полушарии Марса. Берега изрезаны древними каналами. Здесь часто бывают штормы.';
  else if (text.includes('Море Эллада')) description = '🌊 Крупнейший ударный бассейн, заполненный водой. Здесь находятся остатки древней жизни и затонувшие города.';
  else if (text.includes('Море Аргира')) description = '🌊 Море на юге Марса, окружённое горами. Считается местом первых марсианских поселений.';
  else if (text.includes('Эритрейское море')) description = '🌊 Море в экваториальной зоне. Здесь часто бывают песчаные бури, но вода прозрачная и бирюзовая.';
  else if (text.includes('Амазонское море')) description = '🌊 Самое молодое море, образовавшееся в результате таяния подлёдных вод. Глубины до сих пор изучаются.';
  else if (text.includes('Зефирийское море')) description = '🌊 Море с бирюзовой водой. На его берегах находятся древние обсерватории и маяки.';
  else if (text.includes('Зал. Большой Сирт')) description = '🌊 Крупный залив, известный своими ветрами и высокими волнами. Любимое место рыбаков и моряков.';
  else if (text.includes('Королевство Эдем')) description = '👑 Центр марсианской цивилизации. Здесь находятся сады, библиотеки и дворцы. Место, где процветает наука и искусство.';
  else if (text.includes('Королевство Аркадия')) description = '👑 Северное королевство, знаменитое своими шахтами и металлургией. Здесь добывают редкие металлы.';
  else if (text.includes('Олимп')) description = '🌋 Самая высокая гора в Солнечной системе (21 км). Вершина покрыта вечными облаками, а склоны — ледниками.';
  else if (text.includes('Долина Маринер')) description = '🏔️ Гигантский каньон, протянувшийся на 4000 км. Здесь можно увидеть слои горных пород, раскрывающие историю Марса.';
  else if (text.includes('Окхасен')) description = '🏛️ Город у Ацидалийского моря. Торговый, научный и культурный центр. Здесь находится знаменитый порт и Академия наук.';
  else if (text.includes('Роген-Ария')) description = '🏛️ Город на севере, известный своими академиями и астрономическими обсерваториями. Здесь изучают звёзды.';
  else if (text.includes('Космодром Фарсиды')) description = '🚀 Главный космический порт Марса. Отсюда стартуют корабли к звёздам. Здесь строят самые быстрые корабли.';

  // Показываем карточку (такая же функция, как раньше)
  const old = document.getElementById('popup-card');
  if (old) old.remove();
  const div = document.createElement('div');
  div.id = 'popup-card';
  div.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(10,10,30,0.95); color: #fff; padding: 20px; border-radius: 16px;
    border: 2px solid #6a4a7a; max-width: 400px; width: 90%; z-index: 200;
    box-shadow: 0 8px 32px rgba(0,0,0,0.8); font-family: 'Segoe UI', 'Segoe UI Emoji', sans-serif;
    pointer-events: auto;
  `;
  div.innerHTML = `
    <h2 style="margin:0 0 10px; color:#d4a0a0;">${text}</h2>
    <p style="margin:0 0 15px; line-height:1.6;">${description}</p>
    ${link && link !== '#' ? `<a href="${link}" target="_blank" style="color:#88aaff; text-decoration:underline;">Подробнее →</a>` : ''}
    <br><button id="close-popup" style="margin-top:15px; background:#3a2a4a; border:none; color:#fff; padding:8px 20px; border-radius:6px; cursor:pointer;">Закрыть</button>
  `;
  document.body.appendChild(div);
  document.getElementById('close-popup').addEventListener('click', () => div.remove());
  div.addEventListener('click', (e) => { if (e.target === div) div.remove(); });
}

// ============================================================
// 7.2 ДАННЫЕ МЕТОК
// ============================================================
const labelData = [
  ['🌊 Ацидалийское море', 33.8, -34.4, '#3388dd', 'https://mars-wiki.ru/geography/acidalia-sea/'],
  ['🌊 Море Эллада', -34.4, 79.4, '#3388dd', 'https://mars-wiki.ru/geography/ellada-sea/'],
  ['🌊 Море Аргира', -41.6, -38.8, '#3388dd', 'https://mars-wiki.ru/geography/argir-sea/'],
  ['🌊 Эритрейское море', 1, -26.8, '#3388dd', 'https://mars-wiki.ru/geography/eritreya-sea/'],
  ['🌊 Амазонское море', 41.1, -154.2,'#3388dd', 'https://mars-wiki.ru/geography/amazon-sea/'],
  ['🌊 Зефирийское море', 10.2, 166.5, '#3388dd', 'https://mars-wiki.ru/geography/zephyria-sea/'],
  ['🌊 Зал. Большой Сирт', 16.7, 90, '#3388dd', 'https://mars-wiki.ru/geography/sirtis-major-bay/'],
  ['👑 Королевство Эдем', 30.5, 23.6, '#ffaa00', 'https://mars-wiki.ru/geography/eden/'],
  ['👑 Королевство Аркадия', 44.5, -124.3, '#ffaa00', 'https://mars-wiki.ru/geography/arkadia/'],
  ['🌋 Олимп', 18.4, 226, '#cc8844', '#'],
  ['🏔️ Долина Маринер', -1.3, -74, '#cc8844', '#'],
  ['🏛️ Окхасен', 15.26, -53.31, '#ff6633', 'https://mars-wiki.ru/geography/okhasen/'],
  ['🏛️ Роген-Ария', 53.7, 35.7, '#ff6633', 'https://mars-wiki.ru/geography/rogen-aria/'],
  ['🚀 Космодром Фарсиды', 20.3, -80, '#ff6633', 'https://mars-wiki.ru/geography/kosmodrom-farsidy/'],
];

const labelsGroup = new THREE.Group();
scene.add(labelsGroup);
for (let [text, lat, lon, color, link] of labelData) {
  const label = createLabel(text, lat, lon, color, link);
  labelsGroup.add(label);
}

// ============================================================
// 8. СОЗДАНИЕ ЯЩЕРИЦЫ С ПОВОЗКОЙ (уменьшенной)
// ============================================================
function createLizardWithCart() {
  const group = new THREE.Group();
  const materialBody = new THREE.MeshPhongMaterial({ color: 0x8B5A2B });
  const materialCart = new THREE.MeshPhongMaterial({ color: 0x8B4513 });

  // Тело (вытянутая сфера)
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), materialBody);
  body.scale.set(1.5, 0.8, 0.8);
  body.position.set(0, 0, 0);
  group.add(body);

  // Голова (конус)
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.01, 0.02, 6), new THREE.MeshPhongMaterial({ color: 0x6B4A2B }));
  head.position.set(0.02, 0.002, 0);
  head.rotation.x = -0.3;
  group.add(head);

  // Глаза
  const eyeMat = new THREE.MeshPhongMaterial({ color: 0xffff00 });
  const eyeGeo = new THREE.SphereGeometry(0.003, 6, 6);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(0.023, 0.008, 0.005);
  group.add(eyeL);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeR.position.set(0.023, 0.008, -0.005);
  group.add(eyeR);

  // Ноги (6 шт)
  const legMat = new THREE.MeshPhongMaterial({ color: 0x5A3A1B });
  const legGeo = new THREE.CylinderGeometry(0.0015, 0.0015, 0.01, 4);
  const legPositions = [
    [-0.012, -0.012, 0.007],
    [-0.012, -0.012, -0.007],
    [0, -0.012, 0.007],
    [0, -0.012, -0.007],
    [0.012, -0.012, 0.007],
    [0.012, -0.012, -0.007]
  ];
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(pos[0], pos[1], pos[2]);
    leg.rotation.x = 0.3;
    group.add(leg);
  });

  // Хвост
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.005, 0.02, 6), new THREE.MeshPhongMaterial({ color: 0x6B4A2B }));
  tail.position.set(-0.02, 0, 0);
  tail.rotation.z = 0.3;
  group.add(tail);

  // Повозка
  const cartGroup = new THREE.Group();
  const cart = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.008, 0.015), new THREE.MeshPhongMaterial({ color: 0x8B4513 }));
  cart.position.set(0, 0.008, 0);
  cartGroup.add(cart);

  const wheelMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
  const wheelGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.003, 6);
  const wheelPos = [
    [-0.008, 0.003, -0.01],
    [-0.008, 0.003, 0.01],
    [0.008, 0.003, -0.01],
    [0.008, 0.003, 0.01]
  ];
  wheelPos.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(pos[0], pos[1], pos[2]);
    wheel.rotation.x = Math.PI / 2;
    cartGroup.add(wheel);
  });

  cartGroup.position.set(-0.01, 0.003, 0);
  group.add(cartGroup);

  // Масштабируем всю группу
  group.scale.set(1.5, 1.5, 1.5);
  return group;
}

// ============================================================
// 9. АНИМИРОВАННЫЙ МАРШРУТ С ЯЩЕРИЦЕЙ
// ============================================================
let routeLine, routePoint;
let routeProgress = 0;
const ROUTE_SPEED = 0.002;

function createRoute(routeCoords, color = 0xffaa44) {
  const points = routeCoords.map(c => latLonToPosition(c.lat, c.lon, 1.01));
  // Линия
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 });
  routeLine = new THREE.Line(geometry, material);
  scene.add(routeLine);

  // Ящерица
  const lizard = createLizardWithCart();
  lizard.position.copy(points[0]);
  scene.add(lizard);
  routePoint = lizard;
  routePoint.userData = { points: points };
  return { line: routeLine, point: routePoint };
}

// Маршрут: Окхасен → Космодром Фарсиды → Олимп
const routeCoords = [
  { lat: 15.26, lon: -53.31 },
  { lat: 20.3, lon: -80 },
  { lat: 18.4, lon: 226 }
];
createRoute(routeCoords, 0xffaa44);

// ============================================================
// 10. КООРДИНАТЫ ПОД КУРСОРОМ (без изменений)
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

renderer.domElement.addEventListener('mousemove', updateCoords);
renderer.domElement.addEventListener('touchstart', updateCoords, { passive: true });

// ============================================================
// 11. АНИМАЦИЯ
// ============================================================
function animate() {
  requestAnimationFrame(animate);

  if (satellitesRotating) {
    phobosGroup.rotation.y += PHOBOS_SPEED * 0.01;
    deimosGroup.rotation.y += DEIMOS_SPEED * 0.01;
  }

  // Скрываем метки на обратной стороне
  const cameraDir = camera.position.clone().normalize();
  labelsGroup.children.forEach(label => {
    const pos = label.userData.pos.clone().normalize();
    const dot = cameraDir.dot(pos);
    label.visible = dot > 0;
  });

  // Анимация маршрута
  if (routePoint && routePoint.userData && routePoint.userData.points) {
    const points = routePoint.userData.points;
    routeProgress += ROUTE_SPEED;
    if (routeProgress >= 1) routeProgress = 0;
    const index = Math.floor(routeProgress * (points.length - 1));
    const nextIndex = Math.min(index + 1, points.length - 1);
    const frac = (routeProgress * (points.length - 1)) - index;
    const pos = new THREE.Vector3().lerpVectors(points[index], points[nextIndex], frac);
    routePoint.position.copy(pos);
    // Поворот в направлении движения
    const dir = new THREE.Vector3().subVectors(points[nextIndex], points[index]).normalize();
    if (dir.length() > 0.001) {
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        dir
      );
      routePoint.quaternion.copy(quat);
    }
    // Покачивание
    routePoint.position.y += Math.sin(routeProgress * Math.PI * 20) * 0.0003;
  }

  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}
animate();

// ============================================================
// 12. УПРАВЛЕНИЕ КЛАВИШАМИ И КНОПКАМИ
// ============================================================
function toggleLabels() {
  labelsGroup.visible = !labelsGroup.visible;
  document.getElementById('btnM').classList.toggle('active');
}
function toggleOrbits() {
  phobosOrbit.visible = !phobosOrbit.visible;
  deimosOrbit.visible = !deimosOrbit.visible;
  document.getElementById('btnO').classList.toggle('active');
}
function toggleSatellites() {
  satellitesVisible = !satellitesVisible;
  phobosGroup.visible = satellitesVisible;
  deimosGroup.visible = satellitesVisible;
  document.getElementById('btnP').classList.toggle('active');
}
function toggleRotation() {
  satellitesRotating = !satellitesRotating;
  document.getElementById('btnR').classList.toggle('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M') toggleLabels();
  if (e.key === 'o' || e.key === 'O') toggleOrbits();
  if (e.key === 'p' || e.key === 'P') toggleSatellites();
  if (e.key === 'r' || e.key === 'R') toggleRotation();
});

document.getElementById('btnM').addEventListener('click', toggleLabels);
document.getElementById('btnO').addEventListener('click', toggleOrbits);
document.getElementById('btnP').addEventListener('click', toggleSatellites);
document.getElementById('btnR').addEventListener('click', toggleRotation);

document.getElementById('btnM').classList.add('active');
document.getElementById('btnO').classList.add('active');
document.getElementById('btnP').classList.add('active');
document.getElementById('btnR').classList.add('active');

// ============================================================
// 13. АДАПТИВНОСТЬ
// ============================================================
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  labelRenderer.setSize(width, height);
});

setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
</script>

</body>
</html>
