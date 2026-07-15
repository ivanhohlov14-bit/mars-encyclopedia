# 🗺️ Интерактивный глобус Марса

<div id="globeViz" style="width: 100%; height: 650px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);"></div>

<!-- Подключаем библиотеку globe.gl -->
<script src="https://unpkg.com/globe.gl"></script>

<script>
  // ============================================================
  // 1. НАХОДИМ КОНТЕЙНЕР ДЛЯ ГЛОБУСА
  // ============================================================
  const globeContainer = document.getElementById('globeViz');

  // ============================================================
  // 2. ВАШИ ЛОКАЦИИ (широта, долгота, название, ссылка)
  //    Добавляйте сюда все свои точки!
  // ============================================================
  const locations = [
    { lat: 25.0,  lng: 10.0,  name: 'Окхасен',        url: '/geography/okhasen' },
    { lat: 45.0,  lng: -30.0, name: 'Ацидалийское море', url: '/geography/acidalia-sea' },
    { lat: 15.0,  lng: -120.0,name: 'Фарсида',         url: '/geography/farsida' },
    { lat: -20.0, lng: 70.0,  name: 'Эллада',          url: '/geography/ellada-sea' },
    { lat: 30.0,  lng: -60.0, name: 'Зефирийское море', url: '/geography/zephyria-sea' },
    // --- ДОБАВЛЯЙТЕ СВОИ ЛОКАЦИИ СЮДА ---
    // { lat: ШИРОТА, lng: ДОЛГОТА, name: 'НАЗВАНИЕ', url: '/путь/к/статье' },
  ];

  // ============================================================
  // 3. СОЗДАЁМ ГЛОБУС
  // ============================================================
  const myGlobe = Globe()
    .container(globeContainer)

    // --- ТЕКСТУРА МАРСА ---
    // Вариант 1: загрузите свою карту в папку assets и укажите путь:
    .globeImageUrl('/assets/mars-texture.jpg')
    // Вариант 2: временная текстура из интернета (раскомментируйте и закомментируйте строку выше):
    // .globeImageUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Mars_Valles_Marineris.jpeg/1280px-Mars_Valles_Marineris.jpeg')

    // --- ДОБАВЛЯЕМ МАРКЕРЫ ---
    .htmlElementsData(locations)
    .htmlElement(d => {
      const el = document.createElement('div');
      el.innerHTML = `
        <a href="${d.url}" target="_blank" style="
          display: inline-block;
          background: rgba(180, 80, 40, 0.9);
          color: #fff;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          text-decoration: none;
          box-shadow: 0 2px 12px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,200,100,0.3);
          transition: all 0.2s ease;
          pointer-events: auto;
        "
        onmouseover="this.style.transform='scale(1.05)'; this.style.background='rgba(200, 100, 50, 0.95)';"
        onmouseout="this.style.transform='scale(1)'; this.style.background='rgba(180, 80, 40, 0.9)';"
        >
          🔴 ${d.name}
        </a>
      `;
      return el;
    })

    // --- НАСТРОЙКИ ВЗАИМОДЕЙСТВИЯ ---
    .enablePointerInteraction(true)
    .enableZoom(true)
    .enablePan(true)

    // --- РАЗМЕРЫ ---
    .width(globeContainer.clientWidth)
    .height(globeContainer.clientHeight);

  // ============================================================
  // 4. ЗАПУСКАЕМ ГЛОБУС
  // ============================================================
  myGlobe();

  // ============================================================
  // 5. АВТОМАТИЧЕСКОЕ ВРАЩЕНИЕ (планета крутится сама)
  // ============================================================
  let rotationAngle = 0;
  setInterval(() => {
    rotationAngle += 0.002;
    myGlobe.rotation({ x: 0.2, y: rotationAngle, z: 0.1 });
  }, 30);

  // ============================================================
  // 6. АДАПТАЦИЯ ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА
  // ============================================================
  window.addEventListener('resize', () => {
    myGlobe.width(globeContainer.clientWidth);
    myGlobe.height(globeContainer.clientHeight);
  });

  console.log('✅ Интерактивный глобус Марса запущен!');
  console.log(`📍 Добавлено ${locations.length} маркеров.`);
</script>

<style>
  /* Дополнительные стили для красоты */
  #globeViz {
    background: #0a0a1a;
    border: 1px solid #2a2a4a;
  }
  /* Стиль для затемнения фона страницы под глобусом */
  .md-content {
    background: #0a0a1a !important;
  }
</style>
