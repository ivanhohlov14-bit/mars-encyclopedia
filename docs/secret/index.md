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
    padding: 60px 20px;
    max-width: 500px;
    margin: 0 auto;
}
.secret-lock-icon {
    font-size: 5rem;
    margin-bottom: 20px;
    animation: secFloat 4s ease-in-out infinite;
}
.secret-lock h2 {
    color: #1a1a2e;
    font-size: 1.6rem;
    margin: 0 0 12px;
}
.secret-lock p {
    color: #888;
    line-height: 1.6;
    margin: 0 0 20px;
}
.secret-hint {
    background: rgba(108,99,255,0.1);
    border-left: 4px solid #6C63FF;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #6C63FF;
    font-weight: 600;
    text-align: left;
    margin-top: 20px;
}
</style>

<script>
(function() {
    'use strict';

    const STORAGE_KEY = 'mars_secret_unlocked';
    const app = document.getElementById('secret-app');

    // Проверяем, разблокировано ли
    const unlocked = localStorage.getItem(STORAGE_KEY) === 'true';

    if (!unlocked) {
        app.innerHTML = `
            <div class="secret-lock">
                <div class="secret-lock-icon">🔒</div>
                <h2>Страница закрыта</h2>
                <p>Эта страница откроется, когда ты произнесёшь древнее слово.</p>
                <div class="secret-hint">
                    💡 Подсказка: набери на клавиатуре <b>LANSUR</b> (или свайп 3 пальцами вверх на телефоне)
                </div>
                <p style="margin-top:20px;">
                    <a href="/" style="color:#6C63FF;text-decoration:none;font-weight:700;">← Вернуться на главную</a>
                </p>
            </div>
        `;
        return;
    }

    // Разблокировано — показываем контент
    app.innerHTML = `
        <div class="secret-card">
            <div class="secret-icon">🗝️</div>
            <h1 class="secret-title">LĀN SUR</h1>
            <p class="secret-sub">— ГЛИНА ПОМНИТ —</p>
            
            <div class="secret-content">
                <p>Ты нашёл <strong>скрытую страницу</strong>. Значит, ты не просто читатель — ты <em>исследователь</em>.</p>
                
                <p>Древние марсиане верили, что каждый, кто произнесёт <em>Lān sur</em> — «Глина помнит», — получит доступ к тайному знанию.</p>
                
                <p>Вот что тебе открылось:</p>
                
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
})();
</script>
