---
title: 3D-карта Марса
---

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
  @media (max-width: 768px) {
    .legend, .info-panel {
      display: none;
    }
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
  .error-text {
    color: #ff6633;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }
</style>

<div class="map-container">
  <div id="mars-globe">
    <div class="loading-text" id="loadingText">🌍 Загрузка карты...</div>
  </div>

  <!-- Легенда -->
  <div class="legend">
    <div class="legend-item"><span class="city"></span> Города</div>
    <div class="legend-item"><span class="sea"></span> Моря</div>
    <div class="legend-item"><span class="mountain"></span> Горы / Регионы</div>
  </div>

  <!-- Информация -->
  <div class="info-panel">
    🖱️ Вращайте мышкой<br>
    🔍 Колесо — приближение<br>
    👆 Нажмите на метку
  </div>
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
controls.maxDistance = 6;
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
// 6. МЕТКИ (СПРАЙТЫ) — больше не плавают!
// ============================================================
// Калибровочные поправки (если карта смещена, меняйте эти числа)
const LON_OFFSET = 0;   // смещение по долготе (градусы)
const LAT_OFFSET = 0;   // смещение по широте (градусы)

function latLonToPosition(lat, lon, radius = 1.0) {
  // Применяем калибровку
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

// Создание текстовой метки как спрайта
function createLabelSprite(text, lat, lon, color = '#ff6633', link = '#') {
  const pos = latLonToPosition(lat, lon);

  // Создаём canvas для текста
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 128;
  canvas.height = 64;

  // Прозрачный фон
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем круглый фон
  ctx.beginPath();
  ctx.arc(64, 32, 28, 0, 2 * Math.PI);
  ctx.fillStyle = color + '99';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Рисуем текст
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 34);

  // Создаём текстуру из canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false, // чтобы всегда было видно поверх планеты
    depthWrite: false,
    sizeAttenuation: true,
  });

  const sprite = new THREE.Sprite(material);
  sprite.position.copy(pos);
  sprite.scale.set(0.08, 0.04, 1); // размер метки (подберите под себя)

  // Сохраняем для обновления прозрачности
  sprite.userData = { pos: pos.clone(), color: color, link: link };
  sprite.userData.canvas = canvas; // для обновления при клике

  // Делаем кликабельным (через raycast)
  sprite.userData.isLabel = true;
  sprite.userData.link = link;

  return sprite;
}

// ============================================================
// 7. ДОБАВЛЯЕМ МЕТКИ
// ============================================================
const labelsGroup = new THREE.Group();
scene.add(labelsGroup);

// Список меток: [название, широта, долгота, цвет]
const labelData = [
  ['👑 Северное', 30, 30, '#ffaa00'],
  ['👑 Южное', -30, 40, '#ffaa00'],
  ['🌋 Олимп', 18.4, 226, '#cc8844'],
  ['🏔️ Маринер', -13.9, -59.2, '#cc8844'],
  ['🧊 Северный полюс', 80, 0, '#88ccff'],
  ['🌊 Ацидалийское море', 22.2, -21, '#3388dd'],
  ['🏛️ Окхасен', 44.4, -50, '#ff6633'],
  // Добавьте свои метки сюда
];

const labelSprites = [];
for (let [text, lat, lon, color] of labelData) {
  const sprite = createLabelSprite(text, lat, lon, color, '#');
  labelsGroup.add(sprite);
  labelSprites.push(sprite);
}

// ============================================================
// 8. АНИМАЦИЯ (обновление прозрачности в зависимости от стороны)
// ============================================================
function animate() {
  requestAnimationFrame(animate);

  // Обновляем прозрачность меток в зависимости от стороны
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
// 9. АДАПТИВНОСТЬ И ГОРЯЧИЕ КЛАВИШИ
// ============================================================
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M') {
    labelsGroup.visible = !labelsGroup.visible;
  }
});

setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
</script>

<!-- ===== ПОДПИСЬ ===== -->
<div style="text-align: center; color: #888; font-size: 14px; margin-top: 10px; padding: 10px; background: #0a0a1a; border-radius: 8px;">
  🖱️ Вращайте мышкой • 🔍 Колесо — приближение • 👆 Нажмите на метку
</div>

<style>
  .md-content {
    background: #0a0a1a !important;
  }
</style>
