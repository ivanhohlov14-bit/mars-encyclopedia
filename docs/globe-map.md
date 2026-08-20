<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>3D-карта Марса</title>
  <style>
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
// 7. МЕТКИ (СПРАЙТЫ) — ТАКИЕ ЖЕ, КАК В ИДЕАЛЬНОМ КОДЕ
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

// Функция создания спрайта-метки (маленький размер, без лишнего фона)
function createLabelSprite(text, lat, lon, color = '#ff6633', link = '#', description = '') {
  const pos = latLonToPosition(lat, lon);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // Устанавливаем размер холста как в идеальном коде (маленький)
  const canvasWidth = 128;
  const canvasHeight = 48;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Прозрачный фон, только текст с обводкой
  ctx.font = 'bold 16px Segoe UI, Arial Unicode MS, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Тень для читаемости
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  // Рисуем текст
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 10;
  ctx.fillText(text, canvasWidth/2, canvasHeight/2 + 1);
  // Добавляем цветную обводку
  ctx.shadowBlur = 0;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeText(text, canvasWidth/2, canvasHeight/2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const sprite = new THREE.Sprite(material);
  sprite.position.copy(pos);
  // Размер как в идеальном коде (очень маленький)
  sprite.scale.set(0.04, 0.015, 1);

  // Сохраняем данные для клика
  sprite.userData = {
    pos: pos.clone(),
    link: link,
    text: text,
    description: description,
    isLabel: true
  };

  return sprite;
}

// Данные меток (с описаниями)
const labelData = [
  ['🌊 Ацидалийское море', 33.8, -34.4, '#3388dd', 'https://mars-wiki.ru/geography/acidalia-sea/', 'Огромное море в северном полушарии Марса. Берега изрезаны древними каналами.'],
  ['🌊 Море Эллада', -34.4, 79.4, '#3388dd', 'https://mars-wiki.ru/geography/ellada-sea/', 'Крупнейший ударный бассейн, заполненный водой.'],
  ['🌊 Море Аргира', -41.6, -38.8, '#3388dd', 'https://mars-wiki.ru/geography/argir-sea/', 'Море на юге Марса, окружённое горами.'],
  ['🌊 Эритрейское море', 1, -26.8, '#3388dd', 'https://mars-wiki.ru/geography/eritreya-sea/', 'Море в экваториальной зоне, часто бывают бури.'],
  ['🌊 Амазонское море', 41.1, -154.2,'#3388dd', 'https://mars-wiki.ru/geography/amazon-sea/', 'Самое молодое море из подлёдных вод.'],
  ['🌊 Зефирийское море', 10.2, 166.5, '#3388dd', 'https://mars-wiki.ru/geography/zephyria-sea/', 'Море с бирюзовой водой и древними обсерваториями.'],
  ['🌊 Зал. Большой Сирт', 16.7, 90, '#3388dd', 'https://mars-wiki.ru/geography/sirtis-major-bay/', 'Крупный залив, известный своими ветрами.'],
  ['👑 Королевство Эдем', 30.5, 23.6, '#ffaa00', 'https://mars-wiki.ru/geography/eden/', 'Центр марсианской цивилизации, сады и дворцы.'],
  ['👑 Королевство Аркадия', 44.5, -124.3, '#ffaa00', 'https://mars-wiki.ru/geography/arkadia/', 'Северное королевство, шахты и металлургия.'],
  ['🌋 Олимп', 18.4, 226, '#cc8844', '#', 'Высшая точка Марса, 21 км над уровнем моря.'],
  ['🏔️ Долина Маринер', -1.3, -74, '#cc8844', '#', 'Гигантский каньон протяжённостью 4000 км.'],
  ['🏛️ Окхасен', 15.26, -53.31, '#ff6633', 'https://mars-wiki.ru/geography/okhasen/', 'Город у моря, торговый и научный центр.'],
  ['🏛️ Роген-Ария', 53.7, 35.7, '#ff6633', 'https://mars-wiki.ru/geography/rogen-aria/', 'Город на севере, академии и обсерватории.'],
  ['🚀 Космодром Фарсиды', 20.3, -80, '#ff6633', 'https://mars-wiki.ru/geography/kosmodrom-farsidy/', 'Главный космический порт Марса.'],
];

// Создаём группу для меток
const labelsGroup = new THREE.Group();
scene.add(labelsGroup);
const labelSprites = [];

for (let [text, lat, lon, color, link, description] of labelData) {
  const sprite = createLabelSprite(text, lat, lon, color, link, description);
  labelsGroup.add(sprite);
  labelSprites.push(sprite);
}

// ============================================================
// 8. ВСПЛЫВАЮЩАЯ КАРТОЧКА
// ============================================================
function showPopup(title, description, link) {
  const old = document.getElementById('popup-card');
  if (old) old.remove();

  const div = document.createElement('div');
  div.id = 'popup-card';
  div.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(10,10,30,0.95); color: #fff; padding: 24px; border-radius: 16px;
    border: 2px solid #6a4a7a; max-width: 400px; width: 90%; z-index: 200;
    box-shadow: 0 8px 32px rgba(0,0,0,0.8); font-family: 'Segoe UI', 'Segoe UI Emoji', sans-serif;
    pointer-events: auto;
  `;
  div.innerHTML = `
    <h2 style="margin:0 0 10px; color:#d4a0a0;">${title}</h2>
    <p style="margin:0 0 15px; line-height:1.6;">${description}</p>
    ${link && link !== '#' ? `<a href="${link}" target="_blank" style="color:#88aaff; text-decoration:underline;">Подробнее →</a>` : ''}
    <br><button id="close-popup" style="margin-top:15px; background:#3a2a4a; border:none; color:#fff; padding:8px 20px; border-radius:6px; cursor:pointer;">Закрыть</button>
  `;
  document.body.appendChild(div);
  document.getElementById('close-popup').addEventListener('click', () => div.remove());
  div.addEventListener('click', (e) => { if (e.target === div) div.remove(); });
}

// ============================================================
// 9. ОБРАБОТЧИКИ КООРДИНАТ И КЛИКОВ (через Raycaster)
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
  // Проверяем пересечение со спрайтами-метками
  const intersects = raycaster.intersectObjects(labelSprites);
  if (intersects.length > 0) {
    const sprite = intersects[0].object;
    // Проверяем, видима ли метка (находится перед планетой)
    const pos = sprite.userData.pos.clone().normalize();
    const cameraDir = camera.position.clone().normalize();
    const dot = cameraDir.dot(pos);
    if (dot > 0) {
      const link = sprite.userData.link;
      const text = sprite.userData.text;
      const description = sprite.userData.description;
      showPopup(text, description, link);
    }
  }
}

renderer.domElement.addEventListener('mousemove', updateCoords);
renderer.domElement.addEventListener('click', onCanvasClick);
renderer.domElement.addEventListener('touchstart', updateCoords, { passive: true });
renderer.domElement.addEventListener('touchend', onCanvasClick, { passive: false });

// ============================================================
// 10. АНИМАЦИЯ (метки за планетой полностью исчезают)
// ============================================================
function animate() {
  requestAnimationFrame(animate);

  if (satellitesRotating) {
    phobosGroup.rotation.y += PHOBOS_SPEED * 0.01;
    deimosGroup.rotation.y += DEIMOS_SPEED * 0.01;
  }

  // Скрываем метки на обратной стороне
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
// 11. УПРАВЛЕНИЕ КЛАВИШАМИ И КНОПКАМИ
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
