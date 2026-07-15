# 🗺️ Интерактивный глобус Марса

<div id="globeViz" style="width: 100%; height: 650px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3); background: #0a0a1a;"></div>

<!-- Подключаем библиотеку globe.gl с CDN, который точно работает -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/globe.gl@2.24.3/dist/globe.gl.min.js"></script>

<script>
  (function() {
    // --- 1. Проверяем, загрузилась ли библиотека ---
    if (typeof Globe === 'undefined') {
      document.getElementById('globeViz').innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-family:sans-serif;flex-direction:column;text-align:center;padding:20px;">
          <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
          <div style="font-size:18px;font-weight:bold;color:#ccc;">Библиотека не загрузилась</div>
          <div style="font-size:14px;margin-top:8px;max-width:400px;">Проверьте подключение к интернету или временно отключите блокировщик рекламы.</div>
        </div>
      `;
      console.error('❌ Globe.gl не загрузилась. Проверьте URL скрипта или сеть.');
      return;
    }

    // --- 2. Находим контейнер ---
    const container = document.getElementById('globeViz');
    if (!container) {
      console.error('❌ Контейнер #globeViz не найден!');
      return;
    }

    // --- 3. Ваши локации ---
    const locations = [
      { lat: 25.0,  lng: 10.0,  name: 'Окхасен',         url: '/geography/okhasen' },
      { lat: 45.0,  lng: -30.0, name: 'Ацидалийское море', url: '/geography/acidalia-sea' },
      { lat: 15.0,  lng: -120.0,name: 'Фарсида',          url: '/geography/farsida' },
      { lat: -20.0, lng: 70.0,  name: 'Эллада',           url: '/geography/ellada-sea' },
      { lat: 30.0,  lng: -60.0, name: 'Зефирийское море', url: '/geography/zephyria-sea' },
    ];

    // --- 4. Текстура Марса (гарантированно работает) ---
    // Используем текстуру с Wikimedia Commons — она точно доступна и разрешает CORS
    const MARS_TEXTURE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Mars_Valles_Marineris.jpeg/1280px-Mars_Valles_Marineris.jpeg';

    // --- 5. Создаём глобус ---
    try {
      // Убедимся, что контейнер имеет размеры
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 650;

      const myGlobe = Globe()
        .container(container)
        .globeImageUrl(MARS_TEXTURE)
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
              white-space: nowrap;
            "
            onmouseover="this.style.transform='scale(1.05)'; this.style.background='rgba(200, 100, 50, 0.95)';"
            onmouseout="this.style.transform='scale(1)'; this.style.background='rgba(180, 80, 40, 0.9)';"
            >
              🔴 ${d.name}
            </a>
          `;
          return el;
        })
        .enablePointerInteraction(true)
        .enableZoom(true)
        .enablePan(true)
        .width(width)
        .height(height);

      // Запускаем глобус
      myGlobe();

      console.log('✅ Глобус Марса запущен!');
      console.log(`📍 Добавлено ${locations.length} маркеров.`);

      // --- 6. Автоматическое вращение ---
      let rotationAngle = 0;
      const interval = setInterval(() => {
        rotationAngle += 0.002;
        myGlobe.rotation({ x: 0.2, y: rotationAngle, z: 0.1 });
      }, 30);

      // --- 7. Адаптация при изменении размера ---
      const resizeObserver = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w > 0 && h > 0) {
          myGlobe.width(w).height(h);
        }
      });
      resizeObserver.observe(container);

      // Очистка при уходе со страницы (опционально)
      window.__globeCleanup = function() {
        clearInterval(interval);
        resizeObserver.disconnect();
      };

    } catch (error) {
      console.error('❌ Ошибка:', error);
      container.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-family:sans-serif;flex-direction:column;text-align:center;padding:20px;">
          <div style="font-size:48px;margin-bottom:16px;">🛠️</div>
          <div style="font-size:18px;font-weight:bold;color:#ccc;">Ошибка при создании глобуса</div>
          <div style="font-size:14px;margin-top:8px;max-width:400px;background:#1a1a2e;padding:10px;border-radius:8px;color:#ff6b6b;text-align:left;word-break:break-all;">
            ${error.message}
          </div>
          <div style="font-size:14px;margin-top:12px;color:#888;">Проверьте консоль (F12) для деталей.</div>
        </div>
      `;
    }
  })();
</script>

<style>
  /* Дополнительные стили для красоты */
  #globeViz {
    background: #0a0a1a;
    border: 1px solid #2a2a4a;
    position: relative;
    min-height: 650px;
  }
  /* Стиль для затемнения фона страницы под глобусом */
  .md-content {
    background: #0a0a1a !important;
  }
</style>
