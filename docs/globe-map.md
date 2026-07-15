# 🗺️ Интерактивный глобус Марса

<div id="globeViz" style="width: 100%; height: 650px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3); background: #0a0a1a;"></div>

<!-- Подключаем библиотеку globe.gl -->
<script src="https://unpkg.com/globe.gl"></script>

<script>
  (function() {
    // ============================================================
    // 1. НАХОДИМ КОНТЕЙНЕР
    // ============================================================
    const container = document.getElementById('globeViz');
    if (!container) {
      console.error('❌ Контейнер #globeViz не найден!');
      return;
    }

    // ============================================================
    // 2. ВАШИ ЛОКАЦИИ
    // ============================================================
    const locations = [
      { lat: 25.0,  lng: 10.0,  name: 'Окхасен',         url: '/geography/okhasen' },
      { lat: 45.0,  lng: -30.0, name: 'Ацидалийское море', url: '/geography/acidalia-sea' },
      { lat: 15.0,  lng: -120.0,name: 'Фарсида',          url: '/geography/farsida' },
      { lat: -20.0, lng: 70.0,  name: 'Эллада',           url: '/geography/ellada-sea' },
      { lat: 30.0,  lng: -60.0, name: 'Зефирийское море', url: '/geography/zephyria-sea' },
    ];

    // ============================================================
    // 3. ГАРАНТИРОВАННО РАБОТАЮЩАЯ ТЕКСТУРА МАРСА
    //    Используем текстуру с Wikimedia Commons (100% доступна)
    // ============================================================
    const MARS_TEXTURE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Mars_Valles_Marineris.jpeg/1280px-Mars_Valles_Marineris.jpeg';

    // ============================================================
    // 4. СОЗДАЁМ ГЛОБУС
    // ============================================================
    try {
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
        .width(container.clientWidth || 800)
        .height(container.clientHeight || 650);

      // ============================================================
      // 5. ЗАПУСКАЕМ
      // ============================================================
      myGlobe();

      console.log('✅ Интерактивный глобус Марса запущен!');
      console.log(`📍 Добавлено ${locations.length} маркеров.`);

      // ============================================================
      // 6. АВТОМАТИЧЕСКОЕ ВРАЩЕНИЕ
      // ============================================================
      let rotationAngle = 0;
      const interval = setInterval(() => {
        rotationAngle += 0.002;
        myGlobe.rotation({ x: 0.2, y: rotationAngle, z: 0.1 });
      }, 30);

      // ============================================================
      // 7. ПЕРЕСЧЁТ РАЗМЕРОВ ПРИ ИЗМЕНЕНИИ ОКНА
      // ============================================================
      const resizeObserver = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w > 0 && h > 0) {
          myGlobe.width(w).height(h);
        }
      });
      resizeObserver.observe(container);

      // Сохраняем ссылки для очистки (на случай, если страница будет перезагружаться)
      window.__globeCleanup = function() {
        clearInterval(interval);
        resizeObserver.disconnect();
      };

    } catch (error) {
      console.error('❌ Ошибка при создании глобуса:', error);
      container.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-family:sans-serif;flex-direction:column;text-align:center;padding:20px;">
          <div style="font-size:48px;margin-bottom:16px;">🌍</div>
          <div style="font-size:18px;font-weight:bold;color:#ccc;">Не удалось загрузить глобус</div>
          <div style="font-size:14px;margin-top:8px;max-width:400px;">Проверьте консоль браузера (F12) для получения подробной информации об ошибке.</div>
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
  }
  /* Стиль для затемнения фона страницы под глобусом */
  .md-content {
    background: #0a0a1a !important;
  }
</style>
