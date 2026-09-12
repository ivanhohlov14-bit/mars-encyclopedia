---
title: Тайны Хевсура
comments: false
---

<div id="secret2-app" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', sans-serif;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #e74c3c; border-top-color: transparent; border-radius: 50%; animation: secSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Проверка глубинного доступа...</p>
    </div>
</div>

<style>
@keyframes secSpin { to { transform: rotate(360deg); } }
@keyframes secFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes secGlow {
    0%, 100% { box-shadow: 0 0 40px rgba(231,76,60,0.4); }
    50% { box-shadow: 0 0 80px rgba(231,76,60,0.8); }
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
.secret2-card {
    background: linear-gradient(135deg, #1a0505, #2e0a0a, #600f0f);
    border-radius: 24px;
    padding: 48px 32px;
    color: #fff;
    text-align: center;
    border: 2px solid #e74c3c;
    position: relative;
    overflow: hidden;
    animation: secFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.secret2-card::before {
    content: '';
    position: absolute;
    top: -50%; right: -30%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(231,76,60,0.3), transparent 70%);
    border-radius: 50%;
    animation: secGlow 3s ease-in-out infinite;
}
.secret2-card > * { position: relative; z-index: 2; }
.secret2-title {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    font-weight: 900;
    background: linear-gradient(135deg, #f39c12, #e74c3c, #c0392b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 16px 0;
    letter-spacing: 2px;
}
.secret2-sub {
    font-size: 1rem;
    color: #f39c12;
    font-style: italic;
    letter-spacing: 2px;
    margin-bottom: 24px;
}
.secret2-content {
    font-size: 1rem;
    line-height: 1.8;
    opacity: 0.95;
    max-width: 560px;
    margin: 0 auto 24px;
    text-align: left;
}
.secret2-content p { margin: 0 0 16px 0; }
.secret2-content em { color: #f39c12; font-style: italic; }
.secret2-content strong { color: #e74c3c; }
.secret2-icon {
    font-size: 4rem;
    animation: secFloat 3s ease-in-out infinite;
    display: inline-block;
}
.secret2-lock {
    text-align: center;
    padding: 40px 20px;
    max-width: 500px;
    margin: 0 auto;
    background: linear-gradient(135deg, #1a0505, #2e0a0a);
    border-radius: 24px;
    border: 2px solid #e74c3c;
    color: #fff;
    position: relative;
    overflow: hidden;
}
.secret2-lock::before {
    content: '';
    position: absolute;
    top: -50%; right: -30%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(231,76,60,0.25), transparent 70%);
    border-radius: 50%;
}
.secret2-lock > * { position: relative; z-index: 2; }
.secret2-lock-icon {
    font-size: 4rem;
    margin-bottom: 16px;
    animation: secFloat 4s ease-in-out infinite;
    display: inline-block;
}
.secret2-lock h2 {
    color: #fff;
    font-size: 1.6rem;
    margin: 0 0 12px;
    font-weight: 800;
}
.secret2-lock p {
    color: #f39c12;
    line-height: 1.6;
    margin: 0 0 24px;
    font-size: 0.95rem;
}
.secret2-input-wrap {
    display: flex;
    gap: 8px;
    max-width: 340px;
    margin: 0 auto 16px;
}
.secret2-input {
    flex: 1;
    padding: 14px 18px;
    border-radius: 12px;
    border: 2px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-size: 1.1rem;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    letter-spacing: 3px;
    text-align: center;
    text-transform: uppercase;
    outline: none;
    transition: all 0.2s;
}
.secret2-input:focus {
    border-color: #e74c3c;
    background: rgba(231,76,60,0.15);
}
.secret2-input.error {
    animation: secShake 0.4s ease;
    border-color: #e74c3c;
}
.secret2-btn {
    padding: 14px 24px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #e74c3c, #f39c12);
    color: #fff;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
    box-shadow: 0 8px 24px -4px rgba(231,76,60,0.5);
}
.secret2-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -4px rgba(231,76,60,0.7);
}
.secret2-hint {
    background: rgba(231,76,60,0.15);
    border-left: 4px solid #e74c3c;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #f39c12;
    font-weight: 600;
    text-align: left;
    margin-top: 20px;
    line-height: 1.5;
}
</style>

<script>
(function() {
    'use strict';

    const KEY_LEVEL1 = 'mars_secret_unlocked';
    const KEY_LEVEL2 = 'mars_secret2_unlocked';
    const SECRET_CODE = 'KHEVSUR';
    const app = document.getElementById('secret2-app');

    // Проверка: сначала /secret/ должен быть открыт
    if (localStorage.getItem(KEY_LEVEL1) !== 'true') {
        app.innerHTML = `
            <div class="secret2-lock">
                <div class="secret2-lock-icon">🚫</div>
                <h2>Слишком рано</h2>
                <p>Сначала открой первую секретную страницу</p>
                <a href="/secret/" style="display:inline-block;margin-top:8px;padding:12px 24px;background:linear-gradient(135deg,#6C63FF,#A29BFE);border-radius:30px;color:#fff;text-decoration:none;font-weight:700;">→ На /secret/</a>
            </div>
        `;
        return;
    }

    function showUnlockedContent() {
        app.innerHTML = `
            <div class="secret2-card">
                <div class="secret2-icon">🔥</div>
                <h1 class="secret2-title">ТАЙНЫ ХЕВСУРА</h1>
                <p class="secret2-sub">— ЗА ПРЕДЕЛОМ ПЕРВОГО КРУГА —</p>

                <div class="secret2-content">
                    <p>Ты не остановился на первом пороге. Ты — <strong>из тех, кто копает глубже</strong>.</p>

                    <p>📜 <strong>Свиток I:</strong> Хевсур записал не глину. Он записал <em>тишину между словами</em>. Только тот, кто читает паузы, может понять суть.</p>

                    <p>🌋 <strong>Свиток II:</strong> Под равниной Эллады, на глубине 12 километров, лежит <em>второй Марс</em> — мёртвый, но помнящий. Там спят те, кто отказался покидать родную кору.</p>

                    <p>⭐ <strong>Свиток III:</strong> Когда последний из нас произнесёт <em>Lān sur</em> у последнего очага — звёзды вернут нам то, что мы отдали. Ты — <strong>семнадцатый из ста восемнадцати</strong>, кто дошёл до этой страницы.</p>

                    <p style="text-align:center;margin-top:32px;font-size:1.05rem;color:#f39c12;">
                        <em>Иди. И помни — глина помнит всё.</em>
                    </p>
                </div>

                <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:24px;">
                    <a href="/" style="padding:12px 24px;background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.3);border-radius:30px;color:#fff;text-decoration:none;font-weight:700;">← На главную</a>
                    <a href="/secret/" style="padding:12px 24px;background:linear-gradient(135deg,#6C63FF,#A29BFE);border-radius:30px;color:#fff;text-decoration:none;font-weight:700;">🗝️ Первый круг</a>
                </div>
            </div>
        `;
    }

    function showLockedContent() {
        app.innerHTML = `
            <div class="secret2-lock">
                <div class="secret2-lock-icon">🔐</div>
                <h2>Глубины закрыты</h2>
                <p>Произнеси имя древнего писца, чтобы войти</p>

                <div class="secret2-input-wrap">
                    <input type="text" id="secret2-input" class="secret2-input" placeholder="ИМЯ" maxlength="12" autocomplete="off" spellcheck="false">
                    <button id="secret2-btn" class="secret2-btn">→</button>
                </div>

                <p id="secret2-error" style="color:#e74c3c;font-size:0.85rem;margin:8px 0 0;display:none;">❌ Неверное имя</p>

                <div class="secret2-hint">
                    💡 <b>Подсказка:</b> имя того, кто записал <em>«глина помнит»</em>. Упомянут на странице первого круга.
                </div>

                <p style="margin-top:24px;">
                    <a href="/secret/" style="color:#A29BFE;text-decoration:none;font-weight:700;">← К первому кругу</a>
                </p>
            </div>
        `;

        const input = document.getElementById('secret2-input');
        const btn = document.getElementById('secret2-btn');
        const error = document.getElementById('secret2-error');

        function tryUnlock() {
            const value = input.value.trim().toUpperCase();
            if (value === SECRET_CODE) {
                localStorage.setItem(KEY_LEVEL2, 'true');
                showUnlockedContent();
                try {
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    const now = ctx.currentTime;
                    [392, 523.25, 659.25, 783.99].forEach((f, i) => {
                        const o = ctx.createOscillator();
                        const g = ctx.createGain();
                        o.type = 'triangle';
                        o.frequency.value = f;
                        const t = now + i * 0.1;
                        g.gain.setValueAtTime(0, t);
                        g.gain.linearRampToValueAtTime(0.14, t + 0.03);
                        g.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
                        o.connect(g);
                        g.connect(ctx.destination);
                        o.start(t);
                        o.stop(t + 1.2);
                    });
                } catch(e) {}
            } else {
                input.classList.add('error');
                error.style.display = 'block';
                setTimeout(() => input.classList.remove('error'), 500);
            }
        }

        btn.onclick = tryUnlock;
        input.onkeypress = function(e) {
            if (e.key === 'Enter') tryUnlock();
        };
        setTimeout(() => input.focus(), 200);
    }

    if (localStorage.getItem(KEY_LEVEL2) === 'true') {
        showUnlockedContent();
    } else {
        showLockedContent();
    }
})();
</script>
