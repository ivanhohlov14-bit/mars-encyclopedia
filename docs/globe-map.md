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
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// ============================================================
// 1. СЦЕНА, КАМЕРА, РЕНДЕРЫ
// ============================================================
const container = document.getElementById('mars-globe');
const loadingText = document.getElementById('loadingText');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 3.5);

// WebGL-рендер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// CSS2D-рендер (метки)
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(container.clientWidth, container.clientHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.left = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
container.appendChild(labelRenderer.domElement);

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
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;
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

// Запасной цвет планеты (на случай, если текстура не загрузится)
const marsGeometry = new THREE.SphereGeometry(1, 64, 64);
const marsMaterial = new THREE.MeshPhongMaterial({
  color: 0xcc6633, // оранжево-красный, похожий на Марс
});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

// Загружаем текстуру
const mapPath = 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/map/my-new-map.png';

console.log('Загрузка карты:', mapPath);

const marsTexture = textureLoader.load(
  mapPath,
  (texture) => {
    // Успешно загружено
    console.log('Карта загружена!');
    marsMaterial.map = texture;
    marsMaterial.color.set(0xffffff); // убираем запасной цвет
    marsMaterial.needsUpdate = true;
    loadingText.style.display = 'none';
  },
  undefined,
  (err) => {
    // Ошибка загрузки
    console.error('Ошибка загрузки карты:', err);
    loadingText.textContent = '❌ Карта не загружена. Показываем планету без текстуры.';
    loadingText.style.color = '#ffaa44';
    // Планета останется с запасным цветом — это лучше, чем ничего
    setTimeout(() => {
      loadingText.style.display = 'none';
    }, 3000);
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
// 6. МЕТКИ
// ============================================================
function latLonToPosition(lat, lon, radius = 1.05) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createLabel(text, lat, lon, color = '#ff6633', link = '#') {
  const pos = latLonToPosition(lat, lon);
  
  const div = document.createElement('div');
  div.textContent = text;
  div.style.color = '#fff';
  div.style.backgroundColor = color + 'cc';
  div.style.padding = '5px 14px';
  div.style.borderRadius = '20px';
  div.style.fontSize = '14px';
  div.style.fontWeight = 'bold';
  div.style.border = '2px solid #fff';
  div.style.boxShadow = '0 0 25px ' + color + '66';
  div.style.cursor = 'pointer';
  div.style.transition = 'all 0.3s';
  div.style.pointerEvents = 'auto';
  div.style.whiteSpace = 'nowrap';
  div.style.fontFamily = 'Segoe UI, sans-serif';
  div.onclick = () => { window.location.href = link; };
  div.onmouseover = () => {
    div.style.transform = 'scale(1.15)';
    div.style.backgroundColor = color;
  };
  div.onmouseout = () => {
    div.style.transform = 'scale(1)';
    div.style.backgroundColor = color + 'cc';
  };

  const label = new CSS2DObject(div);
  label.position.copy(pos);
  return label;
}

// ============================================================
// 7. МЕТКИ НА КАРТЕ
// ============================================================
scene.add(createLabel('🏛️ Окхасен', 44.4, -50, '#ff6633', '/geography/okhasen'));
scene.add(createLabel('⛰️ Фарсида', 50, -160, '#cc8844', '/geography/farsida'));
scene.add(createLabel('🌊 Ацидалийское море', 22.2, -21, '#3388dd', '/geography/acidalia-sea'));
scene.add(createLabel('🌊 Море Эллада', 73.6, 70.5, '#3388dd', '/geography/ellada-sea'));
scene.add(createLabel('🌊 Зефирийское море', 53.0, 155.85, '#3388dd', '/geography/zephyria-sea'));

// ============================================================
// 8. АНИМАЦИЯ
// ============================================================
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}
animate();

// ============================================================
// 9. АДАПТИВНОСТЬ
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

<!-- ===== ПОДПИСЬ ===== -->
<div style="text-align: center; color: #888; font-size: 14px; margin-top: 10px; padding: 10px; background: #0a0a1a; border-radius: 8px;">
  🖱️ Вращайте мышкой • 🔍 Колесо — приближение • 👆 Нажмите на метку
</div>

<style>
  .md-content {
    background: #0a0a1a !important;
  }
</style>
