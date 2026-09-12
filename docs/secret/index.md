---
title: Секретная страница
comments: false
---

<div id="secret-app" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', sans-serif;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: secSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Проверка доступа...</p>
    </div>
</div>

<style>
@keyframes secSpin { to { transform: rotate(360deg); } }
@keyframes secFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes secGlow {
    0%, 100% { box-shadow: 0 0 40px rgba(108,99,255,0.4); }
    50% { box-shadow: 0 0 80px rgba(108,99,255,0.8); }
}
@keyframes secFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
@keyframes secShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
}
.secret-card {
    background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
    border-radius: 24px;
    padding: 48px 32px;
    color: #fff;
    text-align: center;
    border: 2px solid #6C63FF;
    position: relative;
    overflow: hidden;
    animation: secFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.secret-card::before {
    content: '';
    position: absolute;
    top: -50%; right: -30%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(108,99,255,0.3), transparent 70%);
    border-radius: 50%;
    animation: secGlow 3s ease-in-out infinite;
}
.secret-card > * { position: relative; z-index: 2; }
.secret-title {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    font-weight: 900;
    background: linear-gradient(135deg, #A29BFE, #6C63FF, #e74c3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 16px 0;
    letter-spacing: 2px;
}
.secret-sub {
    font-size: 1rem;
    color: #A29BFE;
    font-style: italic;
    letter-spacing: 2px;
    margin-bottom: 24px;
}
.secret-content {
    font-size: 1rem;
    line-height: 1.8;
    opacity: 0.95;
    max-width: 500px;
    margin: 0 auto 24px;
    text-align: left;
}
.secret-content p { margin: 0 0 16px 0; }
.secret-content em { color: #A29BFE; font-style: italic; }
.secret-content strong { color: #f39c12; }
.secret-icon {
    font-size: 4rem;
    animation: secFloat 3s ease-in-out infinite;
    display: inline-block;
}
.secret-lock {
    text-align: center;
    padding: 40px 20px;
    max-width: 500px;
    margin: 0 auto;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border-radius: 24px;
    border: 2px solid #6C63FF;
    color: #fff;
    position: relative;
    overflow: hidden;
}
.secret-lock::before {
    content: '';
    position: absolute;
    top: -50%; right: -30%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(108,99,255,0.25), transparent 70%);
    border-radius: 50%;
}
.secret-lock > * { position: relative; z-index: 2; }
.secret-lock-icon {
    font-size: 4rem;
    margin-bottom: 16px;
    animation: secFloat 4s ease-in-out infinite;
    display: inline-block;
}
.secret-lock h2 {
    color: #fff;
    font-size: 1.6rem;
    margin: 0 0 12px;
    font-weight: 800;
}
.secret-lock p {
    color: #A29BFE;
    line-height: 1.6;
    margin: 0 0 24px;
    font-size: 0.95rem;
}
.secret-input-wrap {
    display: flex;
    gap: 8px;
    max-width: 320px;
    margin: 0 auto 16px;
}
.secret-input {
    flex: 1;
    padding: 14px 18px;
    border-radius: 12px;
    border: 2px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-size: 1.2rem;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    letter-spacing: 4px;
    text-align: center;
    text-transform: uppercase;
    outline: none;
    transition: all 0.2s;
}
.secret-input:focus {
    border-color: #6C63FF;
    background: rgba(108,99,255,0.15);
}
.secret-input.error {
    animation: secShake 0.4s ease;
    border-color: #e74c3c;
}
.secret-btn {
    padding: 14px 24px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
    box-shadow: 0 8px 24px -4px rgba(108,99,255,0.5);
}
.secret-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -4px rgba(108,99,255,0.7);
}
.secret-hint {
    background: rgba(108,99,255,0.15);
    border-left: 4px solid #6C63FF;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #A29BFE;
    font-weight: 600;
    text-align: left;
    margin-top: 20px;
    line-height: 1.5;
}
</style>

<script>
(function() {
    'use strict';

    const STORAGE_KEY = 'mars_secret_unlocked';
    const SECRET_CODE = 'LANSUR';
    const app = document.getElementById('secret-app');

    function showUnlockedContent() {
        app.innerHTML = `
            <div class="secret-card">
                <div class="secret-icon">🗝️</div>
                <h1 class="secret-title">LĀN SUR</h1>
                <p class="secret-sub">— ГЛИНА ПОМНИТ —</p>
                
                <div class="secret-content">
                    <p>Ты нашёл <strong>скрытую страницу</strong>. Значит, ты не просто читатель — ты <em>исследователь</em>.</p>
                    
                    <p>Древние марсиане верили, что каждый, кто произнесёт <em>Lān sur</em> — «Глина помнит», — получит доступ к тайному знанию.</p>
                    
                    <p>📜 <strong>Тайна первая:</strong> Тысячи лет назад марсиане умели записывать на глине не только слова, но и <em>мысли</em>. Один из свитков Хевсура до сих пор не найден — он спрятан в пещерах Фарсиды.</p>
                    
                    <p>🌟 <strong>Тайна вторая:</strong> В день, когда Марс покроется льдом, последний из живущих произнесёт <em>Lān sur</em> — и все знания вернутся к звёздам.</p>
                    
                    <p>🔥 <strong>Тайна третья:</strong> Каждый, кто произнёс это слово, оставил след в глине. Ты — <strong>сто восемнадцатый</strong>. Добро пожаловать в круг.</p>
                </div>
                
                <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:24px;">
                    <a href="/" style="padding:12px 24px;background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.3);border-radius:30px;color:#fff;text-decoration:none;font-weight:700;">← На главную</a>
                    <a href="/scrolls/" style="padding:12px 24px;background:linear-gradient(135deg,#6C63FF,#A29BFE);border-radius:30px;color:#fff;text-decoration:none;font-weight:700;">📜 К свиткам</a>
                </div>
            </div>
        `;
    }

    function showLockedContent() {
        app.innerHTML = `
            <div class="secret-lock">
                <div class="secret-lock-icon">🔒</div>
                <h2>Страница закрыта</h2>
                <p>Введи древнее слово, чтобы открыть доступ</p>
                
                <div class="secret-input-wrap">
                    <input type="text" id="secret-input" class="secret-input" placeholder="ВВЕДИ КОД" maxlength="10" autocomplete="off" spellcheck="false">
                    <button id="secret-btn" class="secret-btn">→</button>
                </div>
                
                <p id="secret-error" style="color:#e74c3c;font-size:0.85rem;margin:8px 0 0;display:none;">❌ Неверный код</p>
                
                <div class="secret-hint">
                    💡 <b>Подсказка:</b> посмотри на слоган в шапке сайта или на странице профиля.<br>
                    📱 На телефоне код можно ввести прямо здесь.
                </div>
                
                <p style="margin-top:24px;">
                    <a href="/" style="color:#6C63FF;text-decoration:none;font-weight:700;">← Вернуться на главную</a>
                </p>
            </div>
        `;

        const input = document.getElementById('secret-input');
        const btn = document.getElementById('secret-btn');
        const error = document.getElementById('secret-error');

        function tryUnlock() {
            const value = input.value.trim().toUpperCase();
            if (value === SECRET_CODE) {
                localStorage.setItem(STORAGE_KEY, 'true');
                showUnlockedContent();
            } else {
                input.classList.add('error');
                error.style.display = 'block';
                setTimeout(() => {
                    input.classList.remove('error');
                }, 500);
            }
        }

        btn.onclick = tryUnlock;
        input.onkeypress = function(e) {
            if (e.key === 'Enter') tryUnlock();
        };
        setTimeout(() => input.focus(), 200);
    }

    // Проверяем флаг
    const unlocked = localStorage.getItem(STORAGE_KEY) === 'true';
    if (unlocked) {
        showUnlockedContent();
    } else {
        showLockedContent();
    }
})();
</script>
