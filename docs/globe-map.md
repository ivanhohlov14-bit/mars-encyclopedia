# 🗺️ Интерактивный глобус Марса

<div id="globeViz" style="width: 100%; height: 650px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3); background: #0a0a1a;"></div>

<!-- Загружаем Three.js с проверенного CDN (он почти всегда доступен) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- Загружаем globe.gl с нескольких попыток -->
<script>
  (function loadGlobe() {
    // Список возможных URL для загрузки globe.gl
    const urls = [
      'https://unpkg.com/globe.gl@2.20.0/dist/globe.gl.min.js',
      'https://cdn.jsdelivr.net/npm/globe.gl@2.20.0/dist/globe.gl.min.js',
      '/assets/js/globe.gl.min.js'  // локальный резерв (если вы скачаете файл)
    ];

    // Пытаемся загрузить по очереди
    function tryLoad(index) {
      if (index >= urls.length) {
        // Все попытки не удались – показываем инструкцию
        document.getElementById('globeViz').innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-family:sans-serif;flex-direction:column;text-align:center;padding:20px;">
            <div style="font-size:48px;margin-bottom:16px;">📥</div>
            <div style="font-size:18px;font-weight:bold;color:#ccc;">Библиотека не загрузилась</div>
            <div style="font-size:14px;margin-top:8px;max-width:500px;background:#1a1a2e;padding:15px;border-radius:8px;color:#ddd;text-align:left;">
              <p><b>Чтобы решить проблему:</b></p>
              <ol style="margin:5px 0;padding-left:20px;">
                <li>Скачайте файл <b>globe.gl.min.js</b> по ссылке: <br>
                  <a href="https://unpkg.com/globe.gl@2.20.0/dist/globe.gl.min.js" target="_blank" style="color:#7fadff;">https://unpkg.com/globe.gl@2.20.0/dist/globe.gl.min.js</a>
                </li>
                <li>Положите его в папку <b>assets/js/</b> вашего сайта.</li>
                <li>Обновите страницу.</li>
              </ol>
              <p style="margin-top:8px;">Если у вас AdBlock, временно отключите его для этого сайта.</p>
            </div>
          </div>
        `;
        console.error('❌ Не удалось загрузить globe.gl ни с одного CDN.');
        return;
      }

      const script = document.createElement('script');
      script.src = urls[index];
      script.async = true;
      script.onload = function() {
        // Проверяем, загрузилась ли библиотека
        if (typeof Globe !== 'undefined') {
          console.log('✅ globe.gl загружена с', urls[index]);
          // Запускаем создание глобуса после загрузки
          initGlobe();
        } else {
          // Если Globe не определена, пробуем следующий URL
          tryLoad(index + 1);
        }
      };
      script.onerror = function() {
        // Если скрипт не загрузился, пробуем следующий
        tryLoad(index + 1);
      };
      document.head.appendChild(script);
    }

    // --- Функция, которая создаёт глобус (вызывается после загрузки библиотеки) ---
    function initGlobe() {
      const container = document.getElementById('globeViz');
      if (!container) {
        console.error('❌ Контейнер #globeViz не найден!');
        return;
      }

      // Ваши локации
      const locations = [
        { lat: 25.0,  lng: 10.0,  name: 'Окхасен',         url: '/geography/okhasen' },
        { lat: 45.0,  lng: -30.0, name: 'Ацидалийское море', url: '/geography/acidalia-sea' },
        { lat: 15.0,  lng: -120.0,name: 'Фарсида',          url: '/geography/farsida' },
        { lat: -20.0, lng: 70.0,  name: 'Эллада',           url: '/geography/ellada-sea' },
        { lat: 30.0,  lng: -60.0, name: 'Зефирийское море', url: '/geography/zephyria-sea' },
      ];

      const MARS_TEXTURE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Mars_Valles_Marineris.jpeg/1280px-Mars_Valles_Marineris.jpeg';

      try {
        const myGlobe = new Globe(container)
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

        console.log('✅ Глобус Марса успешно создан!');
        console.log(`📍 Добавлено ${locations.length} маркеров.`);

        // Автоматическое вращение
        let rotationAngle = 0;
        const interval = setInterval(() => {
          rotationAngle += 0.002;
          myGlobe.rotation({ x: 0.2, y: rotationAngle, z: 0.1 });
        }, 30);

        // Адаптация размера
        const resizeObserver = new ResizeObserver(() => {
          const w = container.clientWidth;
          const h = container.clientHeight;
          if (w > 0 && h > 0) {
            myGlobe.width(w).height(h);
          }
        });
        resizeObserver.observe(container);

        window.__globeCleanup = function() {
          clearInterval(interval);
          resizeObserver.disconnect();
        };

      } catch (error) {
        console.error('❌ Ошибка при создании глобуса:', error);
        container.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-family:sans-serif;flex-direction:column;text-align:center;padding:20px;">
            <div style="font-size:48px;margin-bottom:16px;">🛠️</div>
            <div style="font-size:18px;font-weight:bold;color:#ccc;">Ошибка при создании глобуса</div>
            <div style="font-size:14px;margin-top:8px;max-width:400px;background:#1a1a2e;padding:10px;border-radius:8px;color:#ff6b6b;text-align:left;word-break:break-all;">
              ${error.message}
            </div>
          </div>
        `;
      }
    }

    // --- Запускаем загрузку ---
    // Проверяем, не загружена ли уже библиотека (например, если скрипт уже был добавлен ранее)
    if (typeof Globe !== 'undefined') {
      initGlobe();
    } else {
      tryLoad(0);
    }
  })();
</script>

<style>
  #globeViz {
    background: #0a0a1a;
    border: 1px solid #2a2a4a;
    position: relative;
    min-height: 650px;
  }
  .md-content {
    background: #0a0a1a !important;
  }
</style>
