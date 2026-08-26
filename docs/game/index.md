---
hide:
  - navigation
  - toc
---

<link rel="stylesheet" href="style.css">
<script src="game.js" defer></script>

<div id="game-container">
    <!-- Шапка игры -->
    <div id="game-header">
        <div id="game-title">🏛️ Марсианская империя</div>
        <div id="game-resources">
            <div class="resource"><span class="icon">🏺</span> <span id="clay">0</span></div>
            <div class="resource"><span class="icon">💧</span> <span id="water">0</span></div>
            <div class="resource"><span class="icon">⚙️</span> <span id="iron">0</span></div>
            <div class="resource"><span class="icon">📖</span> <span id="knowledge">0</span></div>
        </div>
        <button id="save-btn" onclick="saveGame()">💾 Сохранить</button>
    </div>

    <!-- Карта королевств -->
    <div id="game-map">
        <h3>🗺️ Карта Марса</h3>
        <div id="kingdoms-grid">
            <!-- Королевства будут добавлены через JavaScript -->
        </div>
    </div>

    <!-- Строительство -->
    <div id="game-buildings">
        <h3>🏗️ Строительство</h3>
        <div id="buildings-grid">
            <div class="building-card" onclick="buildBuilding('clay_mine')">
                <span class="icon">⛏️</span>
                <span>Глиняная шахта</span>
                <span class="cost">🏺10</span>
            </div>
            <div class="building-card" onclick="buildBuilding('water_collector')">
                <span class="icon">💧</span>
                <span>Водный коллектор</span>
                <span class="cost">💧10</span>
            </div>
            <div class="building-card" onclick="buildBuilding('forge')">
                <span class="icon">⚙️</span>
                <span>Кузница</span>
                <span class="cost">⚙️10</span>
            </div>
        </div>
    </div>

    <!-- Лог событий -->
    <div id="game-log">
        <h3>📜 Хроники</h3>
        <div id="log-messages">
            <p>Добро пожаловать, правитель! Постройте свою империю.</p>
        </div>
    </div>

    <!-- Кнопка "Создать" -->
    <div id="game-actions">
        <button onclick="createTablet()" id="create-tablet-btn">📜 Создать табличку (+10 опыта)</button>
    </div>
</div>
