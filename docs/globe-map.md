<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>3D-карта Марса</title>
  <style>
    .map-container {
      position: relative;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      background: #0a0a1a;
      border-radius: 12px;
      overflow: hidden;
      aspect-ratio: 16 / 9;
    }
    #mars-globe {
      width: 100%;
      height: 100%;
      display: block;
    }
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
      top: 20px;
      right: 20px;
      color: #aaa;
      font-size: 13px;
      background: rgba(10, 10, 26, 0.8);
      padding: 12px 18px;
      border-radius: 8px;
      border: 1px solid #2a2a4a;
      z-index: 10;
      text-align: right;
    }
    #coords {
      position: absolute;
      top: 20px;
      left: 20px;
      color: #fff;
      font-size: 14px;
      background: rgba(0,0,0,0.7);
      padding: 8px 16px;
      border-radius: 6px;
      border: 1px solid #444;
      font-family: monospace;
      z-index: 10;
      pointer-events: none;
      user-select: none;
    }
    @media (max-width: 768px) {
      .legend, .info-panel, #coords { display: none; }
    }
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

<div class="map-container">
  <div id="mars-globe">
    <div class="loading-text" id="loadingText">🌍 Загрузка карты...</div>
  </div>
  <div class="legend">
    <div class="legend-item"><span class="city"></span> Города</div>
    <div class="legend-item"><span class="sea"></span> Моря</div>
    <div class="legend-item"><span class="mountain"></span> Горы / Регионы</div>
  </div>
  <div class="info-panel">
    🖱️ Вращайте мышкой<br>🔍 Колесо — приближение<br>👆 Нажмите на метку<br>Клавиша <b>M</b> — метки<br>Клавиша <b>O</b> — орбиты<br>Клавиша <b>P</b> — спутники<br>Клавиша <b>R</b> — вращение спутников
  </div>
  <div id="coords">🪐 наведите на планету</div>
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
// 6. ФОБОС И ДЕЙМОС (с текстурами и управлением)
// ============================================================
const PHOBOS_RADIUS = 2.8;  // было 1.8
const DEIMOS_RADIUS = 4.0;  // было 2.5
const PHOBOS_SPEED = 0.8;
const DEIMOS_SPEED = 0.3;

// Группы для вращения спутников
const phobosGroup = new THREE.Group();
const deimosGroup = new THREE.Group();
scene.add(phobosGroup);
scene.add(deimosGroup);

// Функция для создания спутника с текстурой
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

// Фобос (исправленный путь)
const phobos = createMoon(PHOBOS_RADIUS, 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/215.jpg', 0xaaaaaa, 0.08);
phobosGroup.add(phobos);

// Деймос (исправленный путь)
const deimos = createMoon(DEIMOS_RADIUS, 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/201.jpg', 0x888888, 0.06);
deimosGroup.add(deimos);

// Орбиты (их радиусы тоже нужно обновить, чтобы они совпадали с новыми орбитами)
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

// Флаги управления
let satellitesVisible = true;
let satellitesRotating = true;

// ============================================================
// 7. МЕТКИ (без изменений)
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

function createLabelSprite(text, lat, lon, color = '#ff6633', link = '#') {
  const pos = latLonToPosition(lat, lon);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 120;
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
  ctx.font = 'bold 32px Segoe UI, sans-serif';
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
  sprite.scale.set(0.22, 0.07, 1);
  sprite.userData = { pos: pos.clone(), color, link, text, lat, lon, isLabel: true };
  return sprite;
}

const labelData = [
  ['🌊 Ацидалийское море', 22.2, -21, '#3388dd', 'https://mars-wiki.ru/geography/acidalia-sea/'],
  ['🌊 Море Эллада', 73.6, 70.5, '#3388dd', 'https://mars-wiki.ru/geography/ellada-sea/'],
  ['🌊 Море Аргира', -49.7, 43.1, '#3388dd', 'https://mars-wiki.ru/geography/argir-sea/'],
  ['🌊 Эритрейское море', -24.7, 40, '#3388dd', 'https://mars-wiki.ru/geography/eritreya-sea/'],
  ['🌊 Амазонское море', 24.7, 147.5, '#3388dd', 'https://mars-wiki.ru/geography/amazon-sea/'],
  ['🌊 Зефирийское море', 53.0, 155.85, '#3388dd', 'https://mars-wiki.ru/geography/zephyria-sea/'],
  ['🌊 Залив Сиртис', 24.7, 147.5, '#3388dd', 'https://mars-wiki.ru/geography/sirtis-major-bay/'],
  ['👑 Северное королевство', 30, 30, '#ffaa00', '#'],
  ['👑 Южное королевство', -30, 40, '#ffaa00', '#'],
  ['🌋 Олимп', 18.4, 226, '#cc8844', '#'],
  ['🏔️ Долина Маринер', -13.9, -59.2, '#cc8844', '#'],
  ['🧊 Северный полюс', 80, 0, '#88ccff', '#'],
  ['🏛️ Окхасен', 44.4, -50, '#ff6633', '#'],
];

const labelsGroup = new THREE.Group();
scene.add(labelsGroup);
const labelSprites = [];
for (let [text, lat, lon, color, link] of labelData) {
  const sprite = createLabelSprite(text, lat, lon, color, link);
  labelsGroup.add(sprite);
  labelSprites.push(sprite);
}

// ============================================================
// 8. ОБРАБОТЧИКИ КООРДИНАТ И КЛИКОВ
// ============================================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function updateCoords(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
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

function onCanvasClick(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(labelSprites);
  if (intersects.length > 0) {
    const sprite = intersects[0].object;
    const link = sprite.userData.link;
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  }
}
renderer.domElement.addEventListener('click', onCanvasClick);

// ============================================================
// 9. АНИМАЦИЯ (вращение спутников + прозрачность меток)
// ============================================================
function animate() {
  requestAnimationFrame(animate);

  // Вращение спутников, если включено
  if (satellitesRotating) {
    phobosGroup.rotation.y += PHOBOS_SPEED * 0.01;
    deimosGroup.rotation.y += DEIMOS_SPEED * 0.01;
  }

  // Прозрачность меток
  const cameraDir = camera.position.clone().normalize();
  for (let sprite of labelSprites) {
    const pos = sprite.userData.pos.clone().normalize();
    const dot = cameraDir.dot(pos);
    const opacity = Math.max(0.15, Math.min(1, (dot + 1) / 2));
    sprite.material.opacity = opacity;
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();

// ============================================================
// 10. АДАПТИВНОСТЬ И ГОРЯЧИЕ КЛАВИШИ
// ============================================================
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

document.addEventListener('keydown', (e) => {
  // M – метки
  if (e.key === 'm' || e.key === 'M') {
    labelsGroup.visible = !labelsGroup.visible;
  }
  // O – орбиты
  if (e.key === 'o' || e.key === 'O') {
    phobosOrbit.visible = !phobosOrbit.visible;
    deimosOrbit.visible = !deimosOrbit.visible;
  }
  // P – спутники (показать/скрыть)
  if (e.key === 'p' || e.key === 'P') {
    satellitesVisible = !satellitesVisible;
    phobosGroup.visible = satellitesVisible;
    deimosGroup.visible = satellitesVisible;
  }
  // R – вращение спутников (вкл/выкл)
  if (e.key === 'r' || e.key === 'R') {
    satellitesRotating = !satellitesRotating;
    // Можно добавить визуальный индикатор, но пока просто меняем флаг
    console.log('Вращение спутников:', satellitesRotating ? 'включено' : 'выключено');
  }
});

setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
</script>

<div style="text-align: center; color: #888; font-size: 14px; margin-top: 10px; padding: 10px; background: #0a0a1a; border-radius: 8px;">
  🖱️ Вращайте мышкой • 🔍 Колесо — приближение • 👆 Нажмите на метку • <b>M</b> — метки • <b>O</b> — орбиты • <b>P</b> — спутники • <b>R</b> — вращение спутников
</div>

</body>
</html>
