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
  .legend .river { background: #44aaff; width: 20px; height: 3px; border-radius: 0; }
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
</style>

<div class="map-container">
  <div id="mars-globe"></div>

  <!-- Легенда -->
  <div class="legend">
    <div class="legend-item"><span class="city"></span> Города</div>
    <div class="legend-item"><span class="sea"></span> Моря</div>
    <div class="legend-item"><span class="mountain"></span> Горы / Регионы</div>
    <div class="legend-item"><span class="river"></span> Реки</div>
  </div>

  <!-- Информация -->
  <div class="info-panel">
    🖱️ Вращайте мышкой<br>
    🔍 Колесо — приближение<br>
    👆 Нажмите на метку
  </div>
</div>

<!-- ============================================================
     ТРИ ПОСЛЕДНИХ СПОСОБА ПОДКЛЮЧЕНИЯ THREE.JS
     ============================================================ -->

<!-- 1. Импорт карты (работает в современных браузерах) -->
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
  }
}
</script>

<!-- 2. Основной скрипт с картой (работает, если картинка есть) -->
<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// ============================================================
// 1. СЦЕНА, КАМЕРА, РЕНДЕРЫ
// ============================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);

const camera = new THREE.PerspectiveCamera(45, document.getElementById('mars-globe').clientWidth / document.getElementById('mars-globe').clientHeight, 0.1, 1000);
camera.position.set(0, 0, 3.5);

// WebGL-рендер (графика)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(document.getElementById('mars-globe').clientWidth, document.getElementById('mars-globe').clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.getElementById('mars-globe').appendChild(renderer.domElement);

// CSS2D-рендер (текст и метки)
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(document.getElementById('mars-globe').clientWidth, document.getElementById('mars-globe').clientHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.left = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.getElementById('mars-globe').appendChild(labelRenderer.domElement);

// ============================================================
// 2. УПРАВЛЕНИЕ (вращение, приближение)
// ============================================================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.minDistance = 1.5;
controls.maxDistance = 6;
controls.target.set(0, 0, 0);
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
// ИСПОЛЬЗУЙТЕ ВАШУ КАРТУ: /assets/mars-map.png
const marsTexture = textureLoader.load('/assets/mars-map.png');

const marsGeometry = new THREE.SphereGeometry(1, 64, 64);
const marsMaterial = new THREE.MeshPhongMaterial({
  map: marsTexture,
  emissive: new THREE.Color(0x111122),
  emissiveIntensity: 0.1,
});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

// ============================================================
// 5. ОСВЕЩЕНИЕ
// ============================================================
const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3);
fillLight.position.set(-3, 0, 4);
scene.add(fillLight);

// ============================================================
// 6. МЕТКИ (координаты с вашей карты)
// ============================================================
// Конвертер широта/долгота → x,y,z
function latLonToPosition(lat, lon, radius = 1.05) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Создание метки
function createLabel(text, lat, lon, color = '#ff6633', link = '#') {
  const pos = latLonToPosition(lat, lon);
  
  // Контейнер для метки
  const div = document.createElement('div');
  div.textContent = text;
  div.style.color = '#fff';
  div.style.backgroundColor = color + 'cc';
  div.style.padding = '4px 12px';
  div.style.borderRadius = '16px';
  div.style.fontSize = '12px';
  div.style.fontWeight = 'bold';
  div.style.border = '2px solid #fff';
  div.style.boxShadow = '0 0 20px ' + color + '66';
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
// 7. ДОБАВЛЯЕМ МЕТКИ С ВАШЕЙ КАРТЫ
// ============================================================

// === ГОРОДА (оранжевые) ===
scene.add(createLabel('🏛️ Окхасен', 44.4, -50, '#ff6633', '/geography/okhasen'));
scene.add(createLabel('⛰️ Фарсида', 50, -160, '#cc8844', '/geography/farsida'));

// === МОРЯ (синие) ===
scene.add(createLabel('🌊 Ацидалийское море', 22.2, -21, '#3388dd', '/geography/acidalia-sea'));
scene.add(createLabel('🌊 Море Эллада', 73.6, 70.5, '#3388dd', '/geography/ellada-sea'));
scene.add(createLabel('🌊 Зефирийское море', 53.0, 155.85, '#3388dd', '/geography/zephyria-sea'));

// ============================================================
// 8. РЕКИ (линии на поверхности)
// ============================================================
function createRiver(points, color = '#44aaff') {
  const positions = points.map(p => latLonToPosition(p.lat, p.lon, 1.005));
  const curve = new THREE.CatmullRomCurve3(positions);
  const curvePoints = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
  const material = new THREE.LineBasicMaterial({ color });
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

// Пример: река Ксанф (схематично)
createRiver([
  { lat: 50, lon: -170 },
  { lat: 45, lon: -150 },
  { lat: 40, lon: -130 },
  { lat: 42, lon: -110 },
  { lat: 44, lon: -90 },
  { lat: 44.4, lon: -70 },
]);

// Пример: река Арес
createRiver([
  { lat: 60, lon: -100 },
  { lat: 55, lon: -80 },
  { lat: 50, lon: -60 },
  { lat: 47, lon: -40 },
]);

// ============================================================
// 9. ГРАНИЦЫ ГОСУДАРСТВ (полигоны)
// ============================================================
function createBorder(points, color = '#ffaa44') {
  const positions = points.map(p => latLonToPosition(p.lat, p.lon, 1.01));
  const geometry = new THREE.BufferGeometry().setFromPoints(positions);
  const material = new THREE.LineBasicMaterial({ color });
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

// Пример: границы Эдема
createBorder([
  { lat: 50, lon: -140 },
  { lat: 55, lon: -120 },
  { lat: 60, lon: -100 },
  { lat: 55, lon: -80 },
  { lat: 50, lon: -60 },
  { lat: 45, lon: -50 },
  { lat: 40, lon: -60 },
  { lat: 38, lon: -80 },
  { lat: 40, lon: -100 },
  { lat: 45, lon: -120 },
], '#ffaa44');

// ============================================================
// 10. ДОРОГИ (пунктирные линии между городами)
// ============================================================
function createRoad(points, color = '#dd8844') {
  const positions = points.map(p => latLonToPosition(p.lat, p.lon, 1.01));
  const curve = new THREE.CatmullRomCurve3(positions);
  const curvePoints = curve.getPoints(30);
  const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
  const material = new THREE.LineDashedMaterial({ color, dashSize: 0.015, gapSize: 0.01 });
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  scene.add(line);
}

// Дорога Окхасен → Фарсида
createRoad([
  { lat: 44.4, lon: -50 },
  { lat: 46, lon: -70 },
  { lat: 48, lon: -100 },
  { lat: 50, lon: -130 },
  { lat: 50, lon: -160 },
], '#dd8844');

// ============================================================
// 11. АНИМАЦИЯ
// ============================================================
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}
animate();

// ============================================================
// 12. АДАПТИВНОСТЬ
// ============================================================
window.addEventListener('resize', () => {
  const container = document.getElementById('mars-globe');
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  labelRenderer.setSize(width, height);
});

// Принудительный ресайз после загрузки
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
