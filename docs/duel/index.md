---
title: Дуэль переводчиков
comments: false
---

<div id="duel-app" style="max-width: 700px; margin: 0 auto; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;">

<div id="duel-start" style="text-align:center; padding:40px 20px; background:linear-gradient(135deg,#1a1a2e,#252550); border-radius:20px; color:#fff; box-shadow:0 20px 60px rgba(108,99,255,0.3);">
    <div style="font-size:4rem; margin-bottom:16px;">⚔️</div>
    <h1 style="margin:0 0 12px; font-size:1.8rem; letter-spacing:2px; background:linear-gradient(135deg,#A29BFE,#6C63FF); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">Дуэль переводчиков</h1>
    <p style="color:#b0b0c8; font-size:0.95rem; line-height:1.7; max-width:480px; margin:0 auto 24px;">
        Угадай марсианский корень для русского слова из 4 вариантов.<br>
        Ошибка — теряешь HP. 10 вопросов, 3 жизни.
    </p>
    <button id="duel-start-btn" style="padding:16px 40px; background:linear-gradient(135deg,#6C63FF,#A29BFE); color:#fff; border:none; border-radius:30px; font-size:1.05rem; font-weight:800; cursor:pointer; font-family:inherit; letter-spacing:1px; box-shadow:0 12px 32px rgba(108,99,255,0.5); touch-action:manipulation;">Начать дуэль</button>
    <div style="margin-top:20px; font-size:0.8rem; color:#666688;">Лучший счёт: <span id="duel-best">0</span> очков</div>
</div>

<div id="duel-game" style="display:none; padding:28px 24px; background:linear-gradient(135deg,#1a1a2e,#252550); border-radius:20px; color:#fff; box-shadow:0 20px 60px rgba(108,99,255,0.3);">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; font-size:0.85rem; color:#b0b0c8;">
        <div>❤️ HP: <span id="duel-hp" style="color:#e74c3c; font-weight:800;">3</span></div>
        <div>⚔️ Вопрос: <span id="duel-round" style="font-weight:800;">1</span> / 10</div>
        <div>🏆 Очки: <span id="duel-score" style="color:#f39c12; font-weight:800;">0</span></div>
    </div>

    <div style="text-align:center; padding:32px 16px; background:rgba(108,99,255,0.1); border-radius:14px; margin-bottom:20px; border:1px solid rgba(108,99,255,0.3);">
        <div style="font-size:0.75rem; color:#A29BFE; letter-spacing:3px; margin-bottom:8px;">ПЕРЕВЕДИ НА МАРСИАНСКИЙ</div>
        <div id="duel-word" style="font-size:2rem; font-weight:900; letter-spacing:1px; color:#fff;">—</div>
    </div>

    <div id="duel-options" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;"></div>

    <div id="duel-feedback" style="text-align:center; min-height:28px; font-size:0.9rem; font-weight:700; margin-bottom:12px;"></div>

    <div style="text-align:center;">
        <button id="duel-next" style="display:none; padding:12px 32px; background:linear-gradient(135deg,#6C63FF,#A29BFE); color:#fff; border:none; border-radius:24px; font-size:0.95rem; font-weight:800; cursor:pointer; font-family:inherit; touch-action:manipulation;">Далее →</button>
    </div>
</div>

<div id="duel-end" style="display:none; padding:40px 24px; text-align:center; background:linear-gradient(135deg,#1a1a2e,#252550); border-radius:20px; color:#fff; box-shadow:0 20px 60px rgba(108,99,255,0.3);">
    <div id="duel-end-emoji" style="font-size:4rem; margin-bottom:16px;">🏆</div>
    <h2 id="duel-end-title" style="margin:0 0 12px; font-size:1.6rem; color:#f39c12;">Дуэль выиграна!</h2>
    <div id="duel-end-text" style="color:#b0b0c8; margin-bottom:24px; line-height:1.6; font-size:0.95rem;"></div>
    <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button id="duel-restart" style="padding:14px 28px; background:linear-gradient(135deg,#6C63FF,#A29BFE); color:#fff; border:none; border-radius:30px; font-size:0.95rem; font-weight:800; cursor:pointer; font-family:inherit; touch-action:manipulation;">Сыграть снова</button>
        <a href="/" style="padding:14px 28px; background:rgba(255,255,255,0.1); color:#fff; border:2px solid rgba(255,255,255,0.2); border-radius:30px; font-size:0.95rem; font-weight:800; text-decoration:none; display:inline-block;">← На главную</a>
    </div>
</div>

</div>

<style>
#duel-app button { -webkit-tap-highlight-color: transparent; }
.duel-opt {
    padding: 18px 16px;
    background: rgba(255,255,255,0.08);
    border: 2px solid rgba(108,99,255,0.3);
    border-radius: 12px;
    color: #fff;
    font-size: 1.05rem;
    font-family: 'Georgia', serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    touch-action: manipulation;
}
.duel-opt:hover:not(:disabled) {
    background: rgba(108,99,255,0.25);
    border-color: #A29BFE;
    transform: translateY(-2px);
}
.duel-opt.correct {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    border-color: #2ecc71;
    animation: duelPop 0.4s ease;
}
.duel-opt.wrong {
    background: linear-gradient(135deg, #c0392b, #e74c3c);
    border-color: #e74c3c;
    animation: duelShake 0.4s ease;
}
.duel-opt:disabled {
    cursor: default;
    opacity: 0.7;
}
.duel-opt.correct:disabled, .duel-opt.wrong:disabled { opacity: 1; }
@keyframes duelPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.06); }
    100% { transform: scale(1); }
}
@keyframes duelShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
}
@media (max-width: 500px) {
    #duel-options { grid-template-columns: 1fr !important; }
    #duel-word { font-size: 1.6rem !important; }
}
</style>

<script>
(function() {
    'use strict';

    const LEXICON = window.MARTIAN_LEXICON || {};

    // Пары "русское слово" → корень
    function buildPairs() {
        const pairs = [];
        const seen = new Set();
        for (const key in LEXICON) {
            const entry = LEXICON[key];
            if (!entry || !entry.root) continue;
            // Только короткие русские слова (одно слово)
            if (key.indexOf(' ') !== -1) continue;
            if (key.length < 3 || key.length > 12) continue;
            if (entry.pos === 'phrase') continue;
            if (seen.has(entry.root)) continue;
            if (entry.root.length < 2 || entry.root.length > 12) continue;
            seen.add(entry.root);
            pairs.push({ rus: key, mars: entry.root });
        }
        return pairs;
    }

    const ALL_PAIRS = buildPairs();

    // ============================================================
    // СОСТОЯНИЕ
    // ============================================================
    let hp = 3;
    let score = 0;
    let round = 0;
    const TOTAL = 10;
    let currentCorrect = null;
    let pool = [];

    const BEST_KEY = 'mars_duel_best';

    // ============================================================
    // DOM
    // ============================================================
    const startEl = document.getElementById('duel-start');
    const gameEl = document.getElementById('duel-game');
    const endEl = document.getElementById('duel-end');

    const hpEl = document.getElementById('duel-hp');
    const roundEl = document.getElementById('duel-round');
    const scoreEl = document.getElementById('duel-score');
    const wordEl = document.getElementById('duel-word');
    const optionsEl = document.getElementById('duel-options');
    const feedbackEl = document.getElementById('duel-feedback');
    const nextBtn = document.getElementById('duel-next');
    const bestEl = document.getElementById('duel-best');

    // Обновляем лучший счёт
    bestEl.textContent = localStorage.getItem(BEST_KEY) || '0';

    // ============================================================
    // ЛОГИКА
    // ============================================================
    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function pickQuestion() {
        if (pool.length < 4) pool = shuffle(ALL_PAIRS);
        const correct = pool.pop();
        // 3 неверных
        const wrong = [];
        while (wrong.length < 3) {
            const cand = ALL_PAIRS[Math.floor(Math.random() * ALL_PAIRS.length)];
            if (cand.mars === correct.mars) continue;
            if (wrong.find(w => w.mars === cand.mars)) continue;
            wrong.push(cand);
        }
        const options = shuffle([correct, ...wrong]);
        return { correct, options };
    }

    function renderRound() {
        const q = pickQuestion();
        currentCorrect = q.correct;

        wordEl.textContent = q.correct.rus;
        feedbackEl.textContent = '';
        feedbackEl.style.color = '';
        nextBtn.style.display = 'none';

        optionsEl.innerHTML = q.options.map(o =>
            `<button class="duel-opt" data-root="${o.mars}">${o.mars}</button>`
        ).join('');

        optionsEl.querySelectorAll('.duel-opt').forEach(btn => {
            btn.onclick = () => answer(btn);
        });

        roundEl.textContent = round + 1;
    }

    function answer(btn) {
        const chosen = btn.dataset.root;
        const allBtns = optionsEl.querySelectorAll('.duel-opt');

        allBtns.forEach(b => {
            b.disabled = true;
            if (b.dataset.root === currentCorrect.mars) b.classList.add('correct');
            if (b === btn && chosen !== currentCorrect.mars) b.classList.add('wrong');
        });

        try { if (navigator.vibrate) navigator.vibrate(20); } catch(e) {}

        if (chosen === currentCorrect.mars) {
            score += 10;
            feedbackEl.textContent = '✅ Верно! +10 очков';
            feedbackEl.style.color = '#2ecc71';
        } else {
            hp--;
            feedbackEl.textContent = '❌ Ошибка! −1 HP. Правильно: ' + currentCorrect.mars;
            feedbackEl.style.color = '#e74c3c';
            hpEl.textContent = hp;
        }

        scoreEl.textContent = score;
        nextBtn.style.display = 'inline-block';
    }

    function next() {
        round++;
        if (hp <= 0 || round >= TOTAL) {
            finish();
        } else {
            renderRound();
        }
    }

    function finish() {
        gameEl.style.display = 'none';
        endEl.style.display = 'block';

        const win = hp > 0;
        const emoji = win ? (score === 100 ? '🏆' : '🎉') : '💀';
        const title = win ? (score === 100 ? 'Идеально!' : 'Дуэль выиграна!') : 'Дуэль проиграна';
        const text = win
            ? `Ты набрал <strong>${score}</strong> очков из 100. Осталось HP: <strong>${hp}</strong>.`
            : `Ты набрал <strong>${score}</strong> очков. HP закончилось на вопросе ${round}. Попробуй снова!`;

        document.getElementById('duel-end-emoji').textContent = emoji;
        document.getElementById('duel-end-title').textContent = title;
        document.getElementById('duel-end-text').innerHTML = text;

        const best = parseInt(localStorage.getItem(BEST_KEY) || '0', 10);
        if (score > best) {
            localStorage.setItem(BEST_KEY, score);
            bestEl.textContent = score;
            document.getElementById('duel-end-text').innerHTML += '<br><br>🌟 <strong>Новый рекорд!</strong>';
        }
    }

    function start() {
        hp = 3;
        score = 0;
        round = 0;
        pool = shuffle(ALL_PAIRS);
        hpEl.textContent = hp;
        scoreEl.textContent = score;
        startEl.style.display = 'none';
        endEl.style.display = 'none';
        gameEl.style.display = 'block';
        renderRound();
    }

    // ============================================================
    // ОБРАБОТЧИКИ
    // ============================================================
    document.getElementById('duel-start-btn').onclick = start;
    document.getElementById('duel-restart').onclick = start;
    nextBtn.onclick = next;

    console.log('⚔️ Дуэль готова. Пар в словаре: ' + ALL_PAIRS.length);
})();
</script>
