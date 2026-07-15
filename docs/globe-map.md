# 🗺️ Карта Марса

<div style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; border: 2px solid #2a2a4a; border-radius: 12px; overflow: hidden; background: #0a0a1a;">

  <!-- ===== ФОНОВАЯ КАРТА (ваш файл) ===== -->
  <img 
    src="/assets/mars-map.png" 
    alt="Карта Марса" 
    style="width: 100%; height: auto; display: block;"
    id="marsMap"
  >

  <!-- ===== КЛИКАБЕЛЬНЫЕ МЕТКИ ===== -->
  
  <!-- Окхасен -->
  <a href="/geography/okhasen" 
     style="position: absolute; top: 40%; left: 55%; transform: translate(-50%, -50%); 
            background: rgba(255, 80, 40, 0.85); color: #fff; 
            padding: 8px 16px; border-radius: 20px; 
            font-size: 14px; font-weight: bold; text-decoration: none;
            border: 2px solid #ffaa44; box-shadow: 0 0 20px rgba(255,80,40,0.5);
            transition: all 0.3s ease; white-space: nowrap;
            pointer-events: auto; z-index: 10;"
     onmouseover="this.style.transform='translate(-50%, -50%) scale(1.1)'; this.style.background='rgba(255, 100, 60, 1)';"
     onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'; this.style.background='rgba(255, 80, 40, 0.85)';">
    🏛️ Окхасен
  </a>

  <!-- Ацидалийское море -->
  <a href="/geography/acidalia-sea" 
     style="position: absolute; top: 35%; left: 30%; transform: translate(-50%, -50%);
            background: rgba(40, 120, 200, 0.8); color: #fff;
            padding: 6px 14px; border-radius: 20px;
            font-size: 13px; font-weight: bold; text-decoration: none;
            border: 2px solid #66ccff; box-shadow: 0 0 20px rgba(40,120,200,0.4);
            transition: all 0.3s ease; white-space: nowrap;
            pointer-events: auto; z-index: 10;"
     onmouseover="this.style.transform='translate(-50%, -50%) scale(1.1)'; this.style.background='rgba(60, 150, 230, 0.9)';"
     onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'; this.style.background='rgba(40, 120, 200, 0.8)';">
    🌊 Ацидалийское море
  </a>

  <!-- Фарсида -->
  <a href="/geography/farsida" 
     style="position: absolute; top: 50%; left: 20%; transform: translate(-50%, -50%);
            background: rgba(180, 100, 40, 0.85); color: #fff;
            padding: 6px 14px; border-radius: 20px;
            font-size: 13px; font-weight: bold; text-decoration: none;
            border: 2px solid #cc8844; box-shadow: 0 0 20px rgba(180,100,40,0.4);
            transition: all 0.3s ease; white-space: nowrap;
            pointer-events: auto; z-index: 10;"
     onmouseover="this.style.transform='translate(-50%, -50%) scale(1.1)'; this.style.background='rgba(200, 120, 50, 0.95)';"
     onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'; this.style.background='rgba(180, 100, 40, 0.85)';">
    ⛰️ Фарсида
  </a>

  <!-- Эллада -->
  <a href="/geography/ellada-sea" 
     style="position: absolute; top: 70%; left: 65%; transform: translate(-50%, -50%);
            background: rgba(40, 140, 180, 0.8); color: #fff;
            padding: 6px 14px; border-radius: 20px;
            font-size: 13px; font-weight: bold; text-decoration: none;
            border: 2px solid #66ddff; box-shadow: 0 0 20px rgba(40,140,180,0.4);
            transition: all 0.3s ease; white-space: nowrap;
            pointer-events: auto; z-index: 10;"
     onmouseover="this.style.transform='translate(-50%, -50%) scale(1.1)'; this.style.background='rgba(60, 170, 210, 0.9)';"
     onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'; this.style.background='rgba(40, 140, 180, 0.8)';">
    🌊 Море Эллада
  </a>

  <!-- Зефирийское море -->
  <a href="/geography/zephyria-sea" 
     style="position: absolute; top: 55%; left: 45%; transform: translate(-50%, -50%);
            background: rgba(40, 120, 180, 0.8); color: #fff;
            padding: 6px 14px; border-radius: 20px;
            font-size: 13px; font-weight: bold; text-decoration: none;
            border: 2px solid #66ccff; box-shadow: 0 0 20px rgba(40,120,180,0.4);
            transition: all 0.3s ease; white-space: nowrap;
            pointer-events: auto; z-index: 10;"
     onmouseover="this.style.transform='translate(-50%, -50%) scale(1.1)'; this.style.background='rgba(60, 150, 210, 0.9)';"
     onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'; this.style.background='rgba(40, 120, 180, 0.8)';">
    🌊 Зефирийское море
  </a>

</div>

<!-- ===== ПОДПИСЬ ===== -->
<div style="text-align: center; color: #888; font-size: 14px; margin-top: 10px; padding: 10px; background: #0a0a1a; border-radius: 8px;">
  Нажмите на метку, чтобы перейти к статье. Координаты объектов можно настроить, изменяя <code>top</code> и <code>left</code>.
</div>

<!-- ===== ИНСТРУКЦИЯ ПО НАСТРОЙКЕ КООРДИНАТ ===== -->
<details style="margin-top: 20px; padding: 15px; background: #1a1a2e; border-radius: 8px; border: 1px solid #2a2a4a;">
  <summary style="cursor: pointer; color: #7fadff; font-weight: bold;">📌 Как настроить метки под вашу карту</summary>
  <div style="margin-top: 10px; color: #ccc; font-size: 14px; line-height: 1.6;">
    <p>Для каждой метки есть параметры <code>top</code> и <code>left</code> (в процентах). Они определяют положение метки на карте.</p>
    <ul>
      <li><b>top: X%</b> — расстояние от верхнего края карты (0% = самый верх, 100% = самый низ).</li>
      <li><b>left: Y%</b> — расстояние от левого края карты (0% = самый левый край, 100% = самый правый).</li>
    </ul>
    <p>Откройте карту в любом редакторе или даже в браузере, прикиньте на глаз, где находятся объекты, и подберите значения, перезагружая страницу.</p>
    <p>Чтобы добавить новую метку, скопируйте один из блоков <code>&lt;a href=...&gt;...&lt;/a&gt;</code>, вставьте его перед последним <code>&lt;/a&gt;</code> и измените путь, текст и координаты.</p>
  </div>
</details>

<style>
  .md-content {
    background: #0a0a1a !important;
  }
  #marsMap {
    border: none;
  }
</style>
