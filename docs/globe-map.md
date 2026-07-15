# 🗺️ Карта Марса

<div style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; border: 2px solid #2a2a4a; border-radius: 12px; overflow: hidden; background: #0a0a1a;">

  <!-- ===== ФОНОВАЯ КАРТА ===== -->
  <img 
    src="/assets/mars-map.png" 
    alt="Карта Марса" 
    style="width: 100%; height: auto; display: block;"
    id="marsMap"
  >

  <!-- ===== КЛИКАБЕЛЬНЫЕ МЕТКИ ===== -->
  
  <!-- Окхасен (10° с.ш., 50° з.д.) -->
  <a href="/geography/okhasen" 
     style="position: absolute; top: 44.4%; left: 36.1%; transform: translate(-50%, -50%); 
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

  <!-- Ацидалийское море (50° с.ш., 339° в.д. → -21° з.д.) -->
  <a href="/geography/acidalia-sea" 
     style="position: absolute; top: 22.2%; left: 44.2%; transform: translate(-50%, -50%);
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

  <!-- Фарсида (оставлено на прежнем месте, т.к. стоит правильно) -->
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

  <!-- Море Эллада (42,4° ю.ш., 70,5° в.д.) -->
  <a href="/geography/ellada-sea" 
     style="position: absolute; top: 73.6%; left: 69.6%; transform: translate(-50%, -50%);
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

  <!-- Зефирийское море (5,45° ю.ш., 155,85° в.д.) -->
  <a href="/geography/zephyria-sea" 
     style="position: absolute; top: 53.0%; left: 93.3%; transform: translate(-50%, -50%);
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
  Нажмите на метку, чтобы перейти к статье.
</div>

<style>
  .md-content {
    background: #0a0a1a !important;
  }
  #marsMap {
    border: none;
  }
</style>
