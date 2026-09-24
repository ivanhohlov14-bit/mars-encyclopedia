---
title: Дуэль переводчиков
comments: false
---

<div id="duel-app">

<!-- ═══════════════════ СТАРТОВЫЙ ЭКРАН ═══════════════════ -->
<div id="duel-start" class="duel-screen">
    <div class="duel-start-icon">⚔️</div>
    <h1 class="duel-start-title">Дуэль переводчиков</h1>
    <p class="duel-start-sub">
        Угадай марсианский корень для русского слова из 4 вариантов.<br>
        Ошибка — теряешь HP. Правильный ответ — очки.
    </p>

    <div class="duel-diff-picker">
        <div class="duel-diff-title">Выбери сложность:</div>
        <div class="duel-diff-grid">
            <button class="duel-diff-btn easy" data-diff="easy">
                <div class="duel-diff-icon">🟢</div>
                <div class="duel-diff-name">Лёгкий</div>
                <div class="duel-diff-info">5 HP · 20 сек</div>
            </button>
            <button class="duel-diff-btn medium active" data-diff="medium">
                <div class="duel-diff-icon">🟡</div>
                <div class="duel-diff-name">Средний</div>
                <div class="duel-diff-info">3 HP · 15 сек</div>
            </button>
            <button class="duel-diff-btn hard" data-diff="hard">
                <div class="duel-diff-icon">🔴</div>
                <div class="duel-diff-name">Сложный</div>
                <div class="duel-diff-info">2 HP · 10 сек</div>
            </button>
        </div>
    </div>

    <button id="duel-start-btn" class="duel-main-btn">
        <span>⚔️ Начать дуэль</span>
    </button>

    <div class="duel-start-best">
        🏆 Рекорд: <strong id="duel-best">0</strong> очков
        <div class="duel-best-rank">Твоё звание: <span id="duel-rank">Новичок</span></div>
    </div>

    <div class="duel-start-hint">
        💡 Управление: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> — ответы · <kbd>Enter</kbd> — далее · <kbd>Esc</kbd> — выход
    </div>
</div>

<!-- ═══════════════════ ИГРОВОЙ ЭКРАН ═══════════════════ -->
<div id="duel-game" class="duel-screen" style="display:none;">
    <div class="duel-hud">
        <div class="duel-hp-wrap">
            <span class="duel-hp-label">❤️ HP</span>
            <div class="duel-hp-bar">
                <div class="duel-hp-fill" id="duel-hp-bar"></div>
            </div>
            <span class="duel-hp-num" id="duel-hp-num">3</span>
        </div>
        <div class="duel-round-wrap">
            <span class="duel-round-label">⚔️</span>
            <span class="duel-round-num" id="duel-round-num">1</span>
            <span class="duel-round-sep">/</span>
            <span class="duel-round-total" id="duel-round-total">10</span>
        </div>
        <div class="duel-score-wrap">
            <span class="duel-score-label">🏆</span>
            <span class="duel-score-num" id="duel-score-num">0</span>
        </div>
    </div>

    <div class="duel-combo-wrap" id="duel-combo-wrap" style="display:none;">
        <span class="duel-combo-flame">🔥</span>
        <span class="duel-combo-text">Комбо ×<span id="duel-combo-num">1</span></span>
    </div>

    <div class="duel-timer-wrap">
        <svg class="duel-timer" viewBox="0 0 60 60">
            <circle class="duel-timer-bg" cx="30" cy="30" r="26"></circle>
            <circle class="duel-timer-progress" id="duel-timer-circle" cx="30" cy="30" r="26"></circle>
        </svg>
        <div class="duel-timer-num" id="duel-timer-num">15</div>
    </div>

    <div class="duel-question">
        <div class="duel-question-label">ПЕРЕВЕДИ НА МАРСИАНСКИЙ</div>
        <div class="duel-question-word" id="duel-word">—</div>
        <div class="duel-question-hint" id="duel-hint"></div>
    </div>

    <div class="duel-options" id="duel-options"></div>

    <div class="duel-feedback" id="duel-feedback"></div>

    <button id="duel-next" class="duel-next-btn" style="display:none;">
        Далее <span style="opacity:.6;">→</span>
    </button>

    <div class="duel-flash" id="duel-flash"></div>
    <div class="duel-particles" id="duel-particles"></div>
</div>

<!-- ═══════════════════ ФИНАЛЬНЫЙ ЭКРАН ═══════════════════ -->
<div id="duel-end" class="duel-screen" style="display:none;">
    <div class="duel-end-emoji" id="duel-end-emoji">🏆</div>
    <h2 class="duel-end-title" id="duel-end-title">Дуэль выиграна!</h2>
    <div class="duel-end-sub" id="duel-end-text"></div>

    <div class="duel-end-stats">
        <div class="duel-end-stat">
            <div class="duel-end-stat-value" id="duel-end-score">0</div>
            <div class="duel-end-stat-label">Очков</div>
        </div>
        <div class="duel-end-stat">
            <div class="duel-end-stat-value" id="duel-end-correct">0</div>
            <div class="duel-end-stat-label">Верно</div>
        </div>
        <div class="duel-end-stat">
            <div class="duel-end-stat-value" id="duel-end-combo">0</div>
            <div class="duel-end-stat-label">Макс. комбо</div>
        </div>
        <div class="duel-end-stat">
            <div class="duel-end-stat-value" id="duel-end-hp">0</div>
            <div class="duel-end-stat-label">HP осталось</div>
        </div>
    </div>

    <div class="duel-end-rank" id="duel-end-rank"></div>

    <div class="duel-end-actions">
        <button id="duel-restart" class="duel-main-btn"><span>🔄 Сыграть снова</span></button>
        <a href="/" class="duel-secondary-btn">← На главную</a>
    </div>

    <div class="duel-end-history" id="duel-end-history"></div>
</div>

</div>

<style>
/* ═══════════════════════════════════════════════════════════
   БАЗА
   ═══════════════════════════════════════════════════════════ */
#duel-app{
    max-width: 720px;
    margin: 0 auto;
    font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    -webkit-tap-highlight-color: transparent;
}
.duel-screen{
    position: relative;
    padding: 40px 28px;
    background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #2d1b3d 100%);
    border-radius: 24px;
    color: #fff;
    box-shadow:
        0 24px 80px rgba(108, 99, 255, 0.25),
        0 0 0 1px rgba(162, 155, 254, 0.15) inset,
        0 0 60px rgba(108, 99, 255, 0.15) inset;
    overflow: hidden;
    animation: duelFadeIn .5s cubic-bezier(.16,1,.3,1);
    isolation: isolate;
}
.duel-screen::before{
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 20% 20%, rgba(108, 99, 255, .15), transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(243, 156, 18, .1), transparent 50%);
    pointer-events: none;
    z-index: 0;
}
.duel-screen > *{ position: relative; z-index: 1; }

@keyframes duelFadeIn{
    from{ opacity:0; transform: translateY(20px) scale(.98); }
    to{ opacity:1; transform: translateY(0) scale(1); }
}
@keyframes duelPop{
    0%{ transform: scale(1); }
    50%{ transform: scale(1.08); }
    100%{ transform: scale(1); }
}
@keyframes duelShake{
    0%,100%{ transform: translateX(0); }
    20%,60%{ transform: translateX(-8px); }
    40%,80%{ transform: translateX(8px); }
}
@keyframes duelPulse{
    0%,100%{ transform: scale(1); box-shadow: 0 12px 32px rgba(108,99,255,.5); }
    50%{ transform: scale(1.03); box-shadow: 0 16px 44px rgba(108,99,255,.75); }
}
@keyframes duelGlow{
    0%,100%{ text-shadow: 0 0 20px rgba(162,155,254,.6); }
    50%{ text-shadow: 0 0 40px rgba(162,155,254,1), 0 0 80px rgba(108,99,255,.7); }
}
@keyframes duelFloat{
    0%,100%{ transform: translateY(0); }
    50%{ transform: translateY(-8px); }
}
@keyframes duelSpin{
    to{ transform: rotate(360deg); }
}
@keyframes duelParticle{
    0%{ transform: translate(0,0) scale(1); opacity: 1; }
    100%{ transform: translate(var(--dx), var(--dy)) scale(.2); opacity: 0; }
}
@keyframes duelFlash{
    0%{ opacity: 0; }
    50%{ opacity: 1; }
    100%{ opacity: 0; }
}

/* ═══════════════════════════════════════════════════════════
   СТАРТОВЫЙ ЭКРАН
   ═══════════════════════════════════════════════════════════ */
.duel-start-icon{
    font-size: 5rem;
    text-align: center;
    animation: duelFloat 3s ease-in-out infinite;
    filter: drop-shadow(0 12px 32px rgba(108, 99, 255, .6));
}
.duel-start-title{
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 2px;
    margin: 16px 0 12px;
    background: linear-gradient(90deg, #fff, #f5d76e, #A29BFE, #fff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: duelGlow 3s ease-in-out infinite;
}
.duel-start-sub{
    text-align: center;
    color: #b0b0c8;
    font-size: .95rem;
    line-height: 1.7;
    max-width: 480px;
    margin: 0 auto 28px;
}
.duel-start-best{
    text-align: center;
    margin-top: 24px;
    font-size: .9rem;
    color: #9999bb;
}
.duel-start-best strong{
    color: #f39c12;
    font-size: 1.15rem;
    font-weight: 900;
}
.duel-best-rank{
    margin-top: 6px;
    font-size: .82rem;
}
.duel-best-rank span{
    color: #A29BFE;
    font-weight: 800;
    font-size: .9rem;
}
.duel-start-hint{
    margin-top: 24px;
    text-align: center;
    color: #666688;
    font-size: .75rem;
    line-height: 1.8;
}
.duel-start-hint kbd{
    display: inline-block;
    padding: 2px 8px;
    background: rgba(108, 99, 255, .15);
    border: 1px solid rgba(162, 155, 254, .3);
    border-radius: 5px;
    color: #A29BFE;
    font-family: 'SF Mono', Consolas, monospace;
    font-size: .72rem;
    font-weight: 700;
    margin: 0 2px;
}

/* Выбор сложности */
.duel-diff-picker{
    margin-bottom: 28px;
}
.duel-diff-title{
    text-align: center;
    font-size: .82rem;
    color: #9999bb;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 14px;
    font-weight: 700;
}
.duel-diff-grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
.duel-diff-btn{
    padding: 14px 10px;
    border-radius: 14px;
    border: 2px solid rgba(162, 155, 254, .2);
    background: rgba(255, 255, 255, .04);
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    transition: all .25s cubic-bezier(.16,1,.3,1);
    text-align: center;
}
.duel-diff-btn:hover{
    transform: translateY(-3px);
    border-color: rgba(162, 155, 254, .5);
    background: rgba(162, 155, 254, .1);
}
.duel-diff-btn.active{
    border-color: #A29BFE;
    background: linear-gradient(135deg, rgba(108, 99, 255, .3), rgba(162, 155, 254, .15));
    box-shadow: 0 8px 24px -4px rgba(108, 99, 255, .5);
    transform: translateY(-2px);
}
.duel-diff-btn.easy.active{ border-color: #27ae60; background: linear-gradient(135deg, rgba(39,174,96,.3), rgba(39,174,96,.1)); box-shadow: 0 8px 24px -4px rgba(39,174,96,.5); }
.duel-diff-btn.hard.active{ border-color: #e74c3c; background: linear-gradient(135deg, rgba(231,76,60,.3), rgba(231,76,60,.1)); box-shadow: 0 8px 24px -4px rgba(231,76,60,.5); }
.duel-diff-icon{ font-size: 1.5rem; margin-bottom: 4px; }
.duel-diff-name{ font-size: .88rem; font-weight: 800; margin-bottom: 2px; }
.duel-diff-info{ font-size: .7rem; color: #9999bb; }

/* Основные кнопки */
.duel-main-btn{
    display: block;
    width: 100%;
    padding: 16px 40px;
    margin: 0 auto;
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff;
    border: none;
    border-radius: 30px;
    font-size: 1.05rem;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: 1px;
    box-shadow: 0 12px 32px rgba(108, 99, 255, .5);
    transition: all .3s cubic-bezier(.16,1,.3,1);
    animation: duelPulse 3s ease-in-out infinite;
}
.duel-main-btn:hover{
    transform: translateY(-3px);
    box-shadow: 0 18px 44px rgba(108, 99, 255, .7);
    animation: none;
}
.duel-main-btn:active{
    transform: translateY(0) scale(.98);
}
.duel-secondary-btn{
    display: inline-block;
    padding: 14px 28px;
    background: rgba(255, 255, 255, .08);
    color: #fff;
    border: 2px solid rgba(255, 255, 255, .15);
    border-radius: 30px;
    font-size: .95rem;
    font-weight: 800;
    text-decoration: none;
    transition: all .25s;
    font-family: inherit;
}
.duel-secondary-btn:hover{
    background: rgba(255, 255, 255, .15);
    transform: translateY(-2px);
}

/* ═══════════════════════════════════════════════════════════
   ИГРОВОЙ ЭКРАН
   ═══════════════════════════════════════════════════════════ */
.duel-hud{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
}
.duel-hp-wrap{
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 140px;
}
.duel-hp-label{ font-size: .82rem; font-weight: 800; color: #e74c3c; white-space: nowrap; }
.duel-hp-bar{
    flex: 1;
    height: 12px;
    background: rgba(255, 255, 255, .1);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 0 1px rgba(231, 76, 60, .3) inset;
}
.duel-hp-fill{
    height: 100%;
    background: linear-gradient(90deg, #e74c3c, #c0392b);
    border-radius: 12px;
    transition: width .5s cubic-bezier(.16,1,.3,1);
    box-shadow: 0 0 12px rgba(231, 76, 60, .6);
    position: relative;
}
.duel-hp-fill::after{
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .3), transparent);
    background-size: 200% 100%;
    animation: duelShine 2s linear infinite;
    border-radius: 12px;
}
@keyframes duelShine{
    0%{ background-position: -200% center; }
    100%{ background-position: 200% center; }
}
.duel-hp-num{
    font-size: .95rem;
    font-weight: 900;
    color: #e74c3c;
    min-width: 20px;
    text-align: right;
}
.duel-round-wrap{
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(108, 99, 255, .15);
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid rgba(162, 155, 254, .3);
    font-weight: 800;
}
.duel-round-label{ font-size: 1rem; }
.duel-round-num{ color: #A29BFE; font-size: 1rem; }
.duel-round-sep{ color: #666688; }
.duel-round-total{ color: #9999bb; font-size: .9rem; }
.duel-score-wrap{
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(243, 156, 18, .15);
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid rgba(243, 156, 18, .3);
    font-weight: 900;
}
.duel-score-label{ font-size: 1rem; }
.duel-score-num{ color: #f39c12; font-size: 1.05rem; }

/* Комбо */
.duel-combo-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 12px;
    padding: 8px 20px;
    background: linear-gradient(135deg, rgba(243, 156, 18, .25), rgba(231, 76, 60, .25));
    border: 1px solid rgba(243, 156, 18, .5);
    border-radius: 20px;
    animation: duelPop .4s cubic-bezier(.34, 1.56, .64, 1);
    box-shadow: 0 0 20px rgba(243, 156, 18, .4);
}
.duel-combo-flame{
    font-size: 1.3rem;
    animation: duelFloat 1.5s ease-in-out infinite;
}
.duel-combo-text{
    font-weight: 900;
    font-size: .9rem;
    color: #f39c12;
    letter-spacing: .5px;
}

/* Таймер */
.duel-timer-wrap{
    position: relative;
    width: 72px;
    height: 72px;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.duel-timer{
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
}
.duel-timer-bg{
    fill: none;
    stroke: rgba(108, 99, 255, .15);
    stroke-width: 4;
}
.duel-timer-progress{
    fill: none;
    stroke: #A29BFE;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 163.36;
    stroke-dashoffset: 0;
    transition: stroke-dashoffset .3s linear, stroke .3s;
    filter: drop-shadow(0 0 6px rgba(162, 155, 254, .8));
}
.duel-timer-progress.warning{ stroke: #f39c12; filter: drop-shadow(0 0 6px rgba(243, 156, 18, .8)); }
.duel-timer-progress.danger{
    stroke: #e74c3c;
    filter: drop-shadow(0 0 8px rgba(231, 76, 60, 1));
    animation: duelPulse .6s ease-in-out infinite;
}
.duel-timer-num{
    font-size: 1.4rem;
    font-weight: 900;
    color: #fff;
    font-variant-numeric: tabular-nums;
}

/* Вопрос */
.duel-question{
    text-align: center;
    padding: 28px 16px;
    background: linear-gradient(135deg, rgba(108, 99, 255, .12), rgba(162, 155, 254, .05));
    border-radius: 18px;
    margin-bottom: 20px;
    border: 1px solid rgba(162, 155, 254, .3);
    box-shadow: 0 0 40px rgba(108, 99, 255, .15) inset;
    position: relative;
    overflow: hidden;
}
.duel-question::before{
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent 0%, rgba(162, 155, 254, .1) 25%, transparent 50%);
    animation: duelSpin 8s linear infinite;
    pointer-events: none;
}
.duel-question-label{
    font-size: .72rem;
    color: #A29BFE;
    letter-spacing: 3px;
    margin-bottom: 10px;
    font-weight: 800;
    position: relative;
}
.duel-question-word{
    font-size: 2.2rem;
    font-weight: 900;
    letter-spacing: 1px;
    color: #fff;
    position: relative;
    text-shadow: 0 4px 20px rgba(108, 99, 255, .5);
    animation: duelGlow 3s ease-in-out infinite;
}
.duel-question-hint{
    margin-top: 8px;
    font-size: .78rem;
    color: #9999bb;
    font-style: italic;
    position: relative;
}

/* Опции */
.duel-options{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
}
.duel-opt{
    position: relative;
    padding: 18px 16px;
    background: rgba(255, 255, 255, .06);
    border: 2px solid rgba(108, 99, 255, .3);
    border-radius: 14px;
    color: #fff;
    font-size: 1.05rem;
    font-family: 'Georgia', serif;
    font-weight: 700;
    cursor: pointer;
    transition: all .25s cubic-bezier(.16,1,.3,1);
    text-align: center;
    overflow: hidden;
}
.duel-opt::before{
    content: attr(data-num);
    position: absolute;
    top: 6px;
    left: 10px;
    font-size: .7rem;
    color: #666688;
    font-family: 'SF Mono', Consolas, monospace;
    font-weight: 700;
}
.duel-opt::after{
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent, rgba(162, 155, 254, .15), transparent);
    transform: translateX(-100%);
    transition: transform .5s;
}
.duel-opt:hover:not(:disabled){
    background: rgba(108, 99, 255, .2);
    border-color: #A29BFE;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px -4px rgba(108, 99, 255, .5);
}
.duel-opt:hover:not(:disabled)::after{ transform: translateX(100%); }
.duel-opt.correct{
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    border-color: #2ecc71;
    animation: duelPop .5s ease;
    box-shadow: 0 0 30px rgba(39, 174, 96, .6);
}
.duel-opt.wrong{
    background: linear-gradient(135deg, #c0392b, #e74c3c);
    border-color: #e74c3c;
    animation: duelShake .5s ease;
    box-shadow: 0 0 30px rgba(231, 76, 60, .6);
}
.duel-opt:disabled{ cursor: default; opacity: .55; }
.duel-opt.correct:disabled, .duel-opt.wrong:disabled{ opacity: 1; }

/* Feedback */
.duel-feedback{
    text-align: center;
    min-height: 30px;
    font-size: .95rem;
    font-weight: 800;
    margin-bottom: 12px;
    animation: duelFadeIn .3s ease;
}
.duel-feedback.success{ color: #2ecc71; text-shadow: 0 0 12px rgba(39, 174, 96, .5); }
.duel-feedback.error{ color: #e74c3c; text-shadow: 0 0 12px rgba(231, 76, 60, .5); }

/* Кнопка Далее */
.duel-next-btn{
    display: block;
    padding: 14px 40px;
    margin: 0 auto;
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff;
    border: none;
    border-radius: 30px;
    font-size: .95rem;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: 1px;
    box-shadow: 0 8px 24px -4px rgba(108, 99, 255, .5);
    transition: all .25s cubic-bezier(.16,1,.3,1);
    animation: duelFadeIn .3s ease;
}
.duel-next-btn:hover{
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(108, 99, 255, .7);
}

/* Вспышка */
.duel-flash{
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    background: radial-gradient(circle at center, rgba(231, 76, 60, .6), transparent 70%);
}
.duel-flash.active{ animation: duelFlash .5s ease; }
.duel-flash.success{ background: radial-gradient(circle at center, rgba(39, 174, 96, .4), transparent 70%); }

/* Частицы */
.duel-particles{
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
}
.duel-particle{
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: duelParticle .8s cubic-bezier(.16,1,.3,1) forwards;
    will-change: transform, opacity;
}

/* ═══════════════════════════════════════════════════════════
   ФИНАЛЬНЫЙ ЭКРАН
   ═══════════════════════════════════════════════════════════ */
.duel-end-emoji{
    font-size: 5rem;
    text-align: center;
    animation: duelFloat 3s ease-in-out infinite;
    filter: drop-shadow(0 12px 32px rgba(243, 156, 18, .6));
}
.duel-end-title{
    text-align: center;
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 1px;
    margin: 16px 0 12px;
    background: linear-gradient(90deg, #fff, #f5d76e, #fff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: duelGlow 3s ease-in-out infinite;
}
.duel-end-sub{
    text-align: center;
    color: #b0b0c8;
    margin-bottom: 24px;
    line-height: 1.7;
    font-size: .95rem;
}
.duel-end-sub strong{ color: #f39c12; font-size: 1.1rem; }

.duel-end-stats{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 20px;
}
.duel-end-stat{
    padding: 14px 10px;
    background: rgba(255, 255, 255, .05);
    border: 1px solid rgba(162, 155, 254, .2);
    border-radius: 14px;
    text-align: center;
    animation: duelFadeIn .4s ease both;
}
.duel-end-stat:nth-child(1){ animation-delay: .05s; }
.duel-end-stat:nth-child(2){ animation-delay: .1s; }
.duel-end-stat:nth-child(3){ animation-delay: .15s; }
.duel-end-stat:nth-child(4){ animation-delay: .2s; }
.duel-end-stat-value{
    font-size: 1.5rem;
    font-weight: 900;
    color: #A29BFE;
    line-height: 1;
    margin-bottom: 4px;
}
.duel-end-stat-label{
    font-size: .68rem;
    color: #9999bb;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
}
.duel-end-rank{
    text-align: center;
    padding: 12px 20px;
    background: linear-gradient(135deg, rgba(243, 156, 18, .15), rgba(108, 99, 255, .15));
    border: 1px solid rgba(243, 156, 18, .3);
    border-radius: 14px;
    font-size: .95rem;
    margin-bottom: 20px;
    animation: duelFadeIn .4s ease .25s both;
}
.duel-end-rank strong{ color: #f39c12; font-size: 1.05rem; }

.duel-end-actions{
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}
.duel-end-actions .duel-main-btn{ width: auto; display: inline-block; margin: 0; }

.duel-end-history{
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(162, 155, 254, .2);
}
.duel-end-history-title{
    font-size: .78rem;
    color: #9999bb;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
    font-weight: 700;
}
.duel-history-row{
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    background: rgba(255, 255, 255, .03);
    border-radius: 8px;
    margin-bottom: 4px;
    font-size: .82rem;
    color: #b0b0c8;
}
.duel-history-row .duel-history-score{
    color: #f39c12;
    font-weight: 800;
}

/* ═══════════════════════════════════════════════════════════
   MOBILE
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 540px){
    .duel-screen{ padding: 28px 18px; border-radius: 18px; }
    .duel-start-title{ font-size: 1.5rem; }
    .duel-start-icon{ font-size: 4rem; }
    .duel-diff-grid{ grid-template-columns: 1fr; }
    .duel-question-word{ font-size: 1.65rem; }
    .duel-options{ grid-template-columns: 1fr; }
    .duel-end-stats{ grid-template-columns: repeat(2, 1fr); }
    .duel-hud{ gap: 8px; }
    .duel-hp-label{ font-size: .75rem; }
    .duel-round-wrap, .duel-score-wrap{ padding: 4px 10px; font-size: .85rem; }
}

@media (prefers-reduced-motion: reduce){
    #duel-app *,
    #duel-app *::before,
    #duel-app *::after{
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .01ms !important;
    }
}
</style>

<script>
(function() {
    'use strict';

    if (window.__duelLoaded) return;
    window.__duelLoaded = true;

    /* ═══════════════════════════════════════════════════════════
       FALLBACK ЛЕКСИКОН (если MARTIAN_LEXICON не загружен)
       ═══════════════════════════════════════════════════════════ */
    var FALLBACK_LEXICON = {
        'глина':      { root: 'sur' },
        'вода':       { root: 'ākha' },
        'земля':      { root: 'kōl' },
        'огонь':      { root: 'khō' },
        'жизнь':      { root: 'mar' },
        'смерть':     { root: 'mōr' },
        'звезда':     { root: 'dzen' },
        'память':     { root: 'lān' },
        'король':     { root: 'rōg' },
        'воин':       { root: 'ur' },
        'море':       { root: 'ākha' },
        'камень':     { root: 'ghar' },
        'свет':       { root: 'dzēn' },
        'тьма':       { root: 'ghōl' },
        'путь':       { root: 'nur' },
        'ветер':      { root: 'zal' },
        'город':      { root: 'okh' },
        'храм':       { root: 'sen' },
        'друг':       { root: 'tō' },
        'враг':       { root: 'ān' },
        'небо':       { root: 'thal' },
        'река':       { root: 'ākha' },
        'гора':       { root: 'suf' },
        'вечность':   { root: 'lānīn' },
        'правда':     { root: 'thaltsan' },
        'тайна':      { root: 'nōkhlān' },
        'свобода':    { root: 'nurariya' },
        'надежда':    { root: 'lānthōl' },
        'любовь':     { root: 'lānmar' },
        'мудрость':   { root: 'tsan' },
        'сила':       { root: 'khōlān' },
        'голос':      { root: 'thal' },
        'молчание':   { root: 'nōkh' },
        'песня':      { root: 'zalkhō' },
        'клятва':     { root: 'ari' },
        'честь':      { root: 'suf' },
        'кровь':      { root: 'mārīn' },
        'огонёк':     { root: 'khō' },
        'пепел':      { root: 'xal' },
        'пыль':       { root: 'sur' },
        'холод':      { root: 'mōr' },
        'жар':        { root: 'khō' },
        'снег':       { root: 'led' }
    };

    /* ═══════════════════════════════════════════════════════════
       CONFIG
       ═══════════════════════════════════════════════════════════ */
    var DIFFICULTIES = {
        easy:   { hp: 5, total: 10, time: 20, name: 'Лёгкий',  emoji: '🟢' },
        medium: { hp: 3, total: 10, time: 15, name: 'Средний', emoji: '🟡' },
        hard:   { hp: 2, total: 15, time: 10, name: 'Сложный', emoji: '🔴' }
    };

    var RANKS = [
        { min: 0,   name: 'Новичок',       icon: '🌱' },
        { min: 100, name: 'Ученик',        icon: '📖' },
        { min: 200, name: 'Знаток',        icon: '🎓' },
        { min: 300, name: 'Мастер',        icon: '⚔️' },
        { min: 450, name: 'Легенда',       icon: '👑' }
    ];

    var STORAGE = {
        best: 'mars_duel_best',
        history: 'mars_duel_history',
        diff: 'mars_duel_diff'
    };

    /* ═══════════════════════════════════════════════════════════
       SAFE STORAGE
       ═══════════════════════════════════════════════════════════ */
    function safeGet(k, def){
        try{
            var v = localStorage.getItem(k);
            if (v === null) return def;
            try { return JSON.parse(v); } catch(e){ return v; }
        }catch(e){ return def; }
    }
    function safeSet(k, v){
        try{ localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); }catch(e){}
    }

    /* ═══════════════════════════════════════════════════════════
       LEXICON
       ═══════════════════════════════════════════════════════════ */
    function getLexicon(){
        var lex = window.MARTIAN_LEXICON;
        if (lex && typeof lex === 'object' && Object.keys(lex).length > 5) return lex;
        return FALLBACK_LEXICON;
    }

    function buildPairs(){
        var lex = getLexicon();
        var pairs = [];
        var seenRoots = {};
        for (var key in lex){
            if (!Object.prototype.hasOwnProperty.call(lex, key)) continue;
            var entry = lex[key];
            if (!entry || !entry.root) continue;
            if (key.indexOf(' ') !== -1) continue;           // только одно слово
            if (key.length < 3 || key.length > 14) continue;
            if (entry.pos === 'phrase') continue;
            if (entry.root.length < 2 || entry.root.length > 14) continue;
            if (seenRoots[entry.root]) continue;
            seenRoots[entry.root] = true;
            pairs.push({ rus: key, mars: entry.root });
        }
        return pairs;
    }

    var ALL_PAIRS = buildPairs();
    if (ALL_PAIRS.length < 8){
        // Если совсем мало — используем fallback
        ALL_PAIRS = Object.keys(FALLBACK_LEXICON).map(function(k){
            return { rus: k, mars: FALLBACK_LEXICON[k].root };
        });
    }

    /* ═══════════════════════════════════════════════════════════
       STATE
       ═══════════════════════════════════════════════════════════ */
    var state = {
        hp: 3,
        score: 0,
        round: 0,
        correct: 0,
        combo: 0,
        maxCombo: 0,
        difficulty: 'medium',
        total: 10,
        timePerRound: 15,
        timeLeft: 15,
        correctAnswer: null,
        pool: [],
        timerId: null,
        isAnswered: false,
        isActive: false
    };

    /* ═══════════════════════════════════════════════════════════
       DOM
       ═══════════════════════════════════════════════════════════ */
    var els = {
        start: document.getElementById('duel-start'),
        game: document.getElementById('duel-game'),
        end: document.getElementById('duel-end'),
        hpBar: document.getElementById('duel-hp-bar'),
        hpNum: document.getElementById('duel-hp-num'),
        roundNum: document.getElementById('duel-round-num'),
        roundTotal: document.getElementById('duel-round-total'),
        scoreNum: document.getElementById('duel-score-num'),
        comboWrap: document.getElementById('duel-combo-wrap'),
        comboNum: document.getElementById('duel-combo-num'),
        timerCircle: document.getElementById('duel-timer-circle'),
        timerNum: document.getElementById('duel-timer-num'),
        word: document.getElementById('duel-word'),
        hint: document.getElementById('duel-hint'),
        options: document.getElementById('duel-options'),
        feedback: document.getElementById('duel-feedback'),
        next: document.getElementById('duel-next'),
        flash: document.getElementById('duel-flash'),
        particles: document.getElementById('duel-particles'),
        best: document.getElementById('duel-best'),
        rank: document.getElementById('duel-rank'),
        endEmoji: document.getElementById('duel-end-emoji'),
        endTitle: document.getElementById('duel-end-title'),
        endText: document.getElementById('duel-end-text'),
        endScore: document.getElementById('duel-end-score'),
        endCorrect: document.getElementById('duel-end-correct'),
        endCombo: document.getElementById('duel-end-combo'),
        endHp: document.getElementById('duel-end-hp'),
        endRank: document.getElementById('duel-end-rank'),
        endHistory: document.getElementById('duel-end-history')
    };

    /* ═══════════════════════════════════════════════════════════
       УТИЛИТЫ
       ═══════════════════════════════════════════════════════════ */
    function shuffle(arr){
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function vibrate(p){ try{ if (navigator.vibrate) navigator.vibrate(p); }catch(e){} }

    function getRank(score){
        var r = RANKS[0];
        for (var i = 0; i < RANKS.length; i++){
            if (score >= RANKS[i].min) r = RANKS[i];
        }
        return r;
    }

    /* ═══════════════════════════════════════════════════════════
       ЗВУКИ — Web Audio API (без файлов)
       ═══════════════════════════════════════════════════════════ */
    var audioCtx = null;
    var audioUnlocked = false;

    function getAudioCtx(){
        if (!audioUnlocked) return null;
        try{
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
        }catch(e){ return null; }
        return audioCtx;
    }

    function unlockAudio(){
        if (audioUnlocked) return;
        function un(){
            try{
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                if (audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
                audioUnlocked = true;
            }catch(e){}
            document.removeEventListener('touchstart', un);
            document.removeEventListener('click', un);
            document.removeEventListener('keydown', un);
        }
        document.addEventListener('touchstart', un, { passive:true });
        document.addEventListener('click', un, { passive:true });
        document.addEventListener('keydown', un, { passive:true });
    }

    function playNote(freq, dur, type, vol){
        var c = getAudioCtx(); if (!c) return;
        try{
            var o = c.createOscillator(), g = c.createGain();
            o.type = type || 'sine';
            o.frequency.value = freq;
            g.gain.setValueAtTime(0, c.currentTime);
            g.gain.linearRampToValueAtTime(vol || 0.12, c.currentTime + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
            o.connect(g); g.connect(c.destination);
            o.start(); o.stop(c.currentTime + dur);
        }catch(e){}
    }

    function sfxCorrect(){
        playNote(523.25, 0.15, 'sine', 0.1);
        setTimeout(function(){ playNote(783.99, 0.25, 'sine', 0.12); }, 80);
    }
    function sfxWrong(){
        playNote(220, 0.2, 'sawtooth', 0.08);
        setTimeout(function(){ playNote(165, 0.35, 'sawtooth', 0.1); }, 100);
    }
    function sfxCombo(level){
        var base = 660 + level * 80;
        playNote(base, 0.12, 'triangle', 0.1);
        setTimeout(function(){ playNote(base * 1.25, 0.18, 'triangle', 0.1); }, 60);
    }
    function sfxWin(){
        [523.25, 659.25, 783.99, 1046.5].forEach(function(f, i){
            setTimeout(function(){ playNote(f, 0.4, 'triangle', 0.12); }, i * 130);
        });
    }
    function sfxLose(){
        [392, 329.63, 261.63, 196].forEach(function(f, i){
            setTimeout(function(){ playNote(f, 0.35, 'sawtooth', 0.1); }, i * 150);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       ЧАСТИЦЫ
       ═══════════════════════════════════════════════════════════ */
    function spawnParticles(x, y, color, count){
        if (!els.particles) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        count = count || 16;
        var frag = document.createDocumentFragment();
        for (var i = 0; i < count; i++){
            var p = document.createElement('div');
            p.className = 'duel-particle';
            var angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
            var dist = 60 + Math.random() * 120;
            var size = 4 + Math.random() * 8;
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.background = color;
            p.style.boxShadow = '0 0 12px ' + color;
            p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
            frag.appendChild(p);
            (function(el){
                setTimeout(function(){ el.remove(); }, 900);
            })(p);
        }
        els.particles.appendChild(frag);
    }

    function flashScreen(type){
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        els.flash.classList.remove('active', 'success');
        els.flash.classList.add(type === 'success' ? 'success' : '');
        void els.flash.offsetWidth;
        els.flash.classList.add('active');
        setTimeout(function(){ els.flash.classList.remove('active'); }, 500);
    }

    /* ═══════════════════════════════════════════════════════════
       UI ОБНОВЛЕНИЯ
       ═══════════════════════════════════════════════════════════ */
    function updateHP(){
        var maxHp = DIFFICULTIES[state.difficulty].hp;
        var pct = Math.max(0, (state.hp / maxHp) * 100);
        els.hpBar.style.width = pct + '%';
        els.hpNum.textContent = state.hp;
    }

    function updateScore(){
        els.scoreNum.textContent = state.score;
    }

    function updateRound(){
        els.roundNum.textContent = Math.min(state.round + 1, state.total);
        els.roundTotal.textContent = state.total;
    }

    function updateCombo(){
        if (state.combo >= 2){
            els.comboWrap.style.display = 'flex';
            els.comboNum.textContent = state.combo;
        } else {
            els.comboWrap.style.display = 'none';
        }
    }

    function updateTimer(){
        var circumference = 2 * Math.PI * 26; // 163.36
        var pct = state.timeLeft / state.timePerRound;
        els.timerCircle.style.strokeDashoffset = circumference * (1 - pct);
        els.timerNum.textContent = Math.ceil(state.timeLeft);

        els.timerCircle.classList.remove('warning', 'danger');
        if (state.timeLeft <= 3){
            els.timerCircle.classList.add('danger');
        } else if (state.timeLeft <= 6){
            els.timerCircle.classList.add('warning');
        }
    }

    /* ═══════════════════════════════════════════════════════════
       ИГРОВАЯ ЛОГИКА
       ═══════════════════════════════════════════════════════════ */
    function pickQuestion(){
        if (state.pool.length < 4) state.pool = shuffle(ALL_PAIRS);
        var correct = state.pool.pop();
        var wrong = [];
        var attempts = 0;
        while (wrong.length < 3 && attempts < 100){
            attempts++;
            var cand = ALL_PAIRS[Math.floor(Math.random() * ALL_PAIRS.length)];
            if (cand.mars === correct.mars) continue;
            if (wrong.some(function(w){ return w.mars === cand.mars; })) continue;
            wrong.push(cand);
        }
        // Если не смогли набрать 3 — добить случайными
        while (wrong.length < 3){
            var fallback = { rus: 'слово' + wrong.length, mars: 'root' + Math.random().toString(36).slice(2, 7) };
            wrong.push(fallback);
        }
        return { correct: correct, options: shuffle([correct].concat(wrong)) };
    }

    function renderRound(){
        state.isAnswered = false;
        var q = pickQuestion();
        state.correctAnswer = q.correct;

        els.word.textContent = q.correct.rus;
        els.hint.textContent = '';
        els.feedback.textContent = '';
        els.feedback.className = 'duel-feedback';
        els.next.style.display = 'none';

        var html = '';
        q.options.forEach(function(o, i){
            html += '<button class="duel-opt" data-root="' + escAttr(o.mars) + '" data-num="' + (i + 1) + '">' + escHtml(o.mars) + '</button>';
        });
        els.options.innerHTML = html;

        els.options.querySelectorAll('.duel-opt').forEach(function(btn){
            btn.onclick = function(){ answer(btn); };
        });

        updateRound();
        updateTimer();

        // Запуск таймера
        startTimer();
    }

    function escHtml(s){
        return String(s || '').replace(/[&<>"']/g, function(m){
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }
    function escAttr(s){
        return String(s || '').replace(/['"\\<>]/g, function(m){
            return { "'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e' }[m];
        });
    }

    function startTimer(){
        stopTimer();
        state.timeLeft = state.timePerRound;
        updateTimer();
        var last = performance.now();
        state.timerId = setInterval(function(){
            var now = performance.now();
            var dt = (now - last) / 1000;
            last = now;
            state.timeLeft -= dt;
            if (state.timeLeft <= 0){
                state.timeLeft = 0;
                updateTimer();
                stopTimer();
                if (!state.isAnswered) timeout();
            } else {
                updateTimer();
            }
        }, 100);
    }

    function stopTimer(){
        if (state.timerId){
            clearInterval(state.timerId);
            state.timerId = null;
        }
    }

    function timeout(){
        state.isAnswered = true;
        state.hp--;
        state.combo = 0;
        updateHP();
        updateCombo();

        var allBtns = els.options.querySelectorAll('.duel-opt');
        allBtns.forEach(function(b){
            b.disabled = true;
            if (b.dataset.root === state.correctAnswer.mars) b.classList.add('correct');
        });

        els.feedback.textContent = '⏱ Время вышло! Правильно: ' + state.correctAnswer.mars;
        els.feedback.className = 'duel-feedback error';

        flashScreen('error');
        sfxWrong();
        vibrate([30, 50, 30]);

        if (state.hp <= 0){
            setTimeout(finish, 800);
        } else {
            els.next.style.display = 'inline-block';
        }
    }

    function answer(btn){
        if (state.isAnswered) return;
        state.isAnswered = true;
        stopTimer();

        var chosen = btn.dataset.root;
        var allBtns = els.options.querySelectorAll('.duel-opt');

        allBtns.forEach(function(b){
            b.disabled = true;
            if (b.dataset.root === state.correctAnswer.mars) b.classList.add('correct');
            if (b === btn && chosen !== state.correctAnswer.mars) b.classList.add('wrong');
        });

        if (chosen === state.correctAnswer.mars){
            // Правильно
            state.correct++;
            state.combo++;
            if (state.combo > state.maxCombo) state.maxCombo = state.combo;

            // Очки: база 10 + бонус за скорость (до 5) + комбо (до ×3)
            var speedBonus = Math.round((state.timeLeft / state.timePerRound) * 5);
            var comboMult = state.combo >= 5 ? 3 : state.combo >= 3 ? 2 : state.combo >= 2 ? 1.5 : 1;
            var points = Math.round((10 + speedBonus) * comboMult);
            state.score += points;

            els.feedback.innerHTML = '✅ Верно! <strong>+' + points + '</strong>' +
                (comboMult > 1 ? ' <span style="color:#f39c12;">🔥 ×' + comboMult + '</span>' : '');
            els.feedback.className = 'duel-feedback success';

            sfxCorrect();
            if (state.combo >= 2) setTimeout(function(){ sfxCombo(state.combo); }, 200);
            flashScreen('success');
            vibrate(20);

            // Частицы от кнопки
            var rect = btn.getBoundingClientRect();
            spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#2ecc71', 20);
        } else {
            // Ошибка
            state.hp--;
            state.combo = 0;

            els.feedback.textContent = '❌ Ошибка! Правильно: ' + state.correctAnswer.mars;
            els.feedback.className = 'duel-feedback error';

            sfxWrong();
            flashScreen('error');
            vibrate([30, 50, 30]);

            var rect2 = btn.getBoundingClientRect();
            spawnParticles(rect2.left + rect2.width / 2, rect2.top + rect2.height / 2, '#e74c3c', 16);
        }

        updateHP();
        updateScore();
        updateCombo();

        if (state.hp <= 0){
            setTimeout(finish, 1200);
        } else {
            els.next.style.display = 'inline-block';
        }
    }

    function nextRound(){
        if (!state.isAnswered) return;
        state.round++;
        if (state.round >= state.total){
            finish();
        } else {
            renderRound();
        }
    }

    function finish(){
        stopTimer();
        state.isActive = false;

        els.game.style.display = 'none';
        els.end.style.display = 'block';

        var win = state.hp > 0;
        var perfect = state.correct === state.total;

        var emoji = perfect ? '🌟' : win ? '🏆' : '💀';
        var title = perfect ? 'Идеально!' : win ? 'Дуэль выиграна!' : 'Дуэль проиграна';

        els.endEmoji.textContent = emoji;
        els.endTitle.textContent = title;
        els.endText.innerHTML = win
            ? 'Ты прошёл дуэль на <strong>' + state.total + '</strong> вопросов.'
            : 'Ты выбыл на вопросе <strong>' + Math.min(state.round + 1, state.total) + '</strong>. Попробуй снова!';

        els.endScore.textContent = state.score;
        els.endCorrect.textContent = state.correct + '/' + state.total;
        els.endCombo.textContent = state.maxCombo;
        els.endHp.textContent = Math.max(0, state.hp);

        var rank = getRank(state.score);
        els.endRank.innerHTML = 'Звание: <strong>' + rank.icon + ' ' + rank.name + '</strong>';

        // История
        saveHistory(state.score, state.correct, state.difficulty);
        renderHistory();

        // Рекорд
        var best = parseInt(safeGet(STORAGE.best, 0), 10) || 0;
        if (state.score > best){
            safeSet(STORAGE.best, state.score);
            els.best.textContent = state.score;
            els.endText.innerHTML += '<br><br>🌟 <strong style="color:#f39c12;">Новый рекорд!</strong>';
            updateRankBadge();
        }

        // Звук
        if (win){
            sfxWin();
            // Частицы-праздник
            setTimeout(function(){
                for (var i = 0; i < 4; i++){
                    setTimeout(function(){
                        spawnParticles(
                            window.innerWidth * (0.2 + Math.random() * 0.6),
                            window.innerHeight * (0.3 + Math.random() * 0.4),
                            ['#f39c12', '#A29BFE', '#6C63FF', '#27ae60'][i % 4],
                            20
                        );
                    }, i * 150);
                }
            }, 300);
        } else {
            sfxLose();
        }
    }

    /* ═══════════════════════════════════════════════════════════
       ИСТОРИЯ
       ═══════════════════════════════════════════════════════════ */
    function saveHistory(score, correct, difficulty){
        var hist = safeGet(STORAGE.history, []) || [];
        if (!Array.isArray(hist)) hist = [];
        hist.unshift({
            ts: Date.now(),
            score: score,
            correct: correct,
            diff: difficulty
        });
        hist = hist.slice(0, 10);
        safeSet(STORAGE.history, hist);
    }

    function renderHistory(){
        var hist = safeGet(STORAGE.history, []) || [];
        if (!Array.isArray(hist) || hist.length === 0){
            els.endHistory.innerHTML = '';
            return;
        }
        var html = '<div class="duel-end-history-title">📚 Последние дуэли</div>';
        hist.slice(0, 5).forEach(function(h){
            var d = DIFFICULTIES[h.diff] || DIFFICULTIES.medium;
            html += '<div class="duel-history-row">' +
                '<span>' + d.emoji + ' ' + new Date(h.ts).toLocaleString('ru-RU', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) + '</span>' +
                '<span class="duel-history-score">' + h.score + ' очк.</span>' +
            '</div>';
        });
        els.endHistory.innerHTML = html;
    }

    function updateRankBadge(){
        var best = parseInt(safeGet(STORAGE.best, 0), 10) || 0;
        var rank = getRank(best);
        if (els.rank) els.rank.textContent = rank.icon + ' ' + rank.name;
    }

    /* ═══════════════════════════════════════════════════════════
       СТАРТ / РЕСТАРТ
       ═══════════════════════════════════════════════════════════ */
    function start(){
        unlockAudio();

        var diff = state.difficulty;
        var cfg = DIFFICULTIES[diff];

        state.hp = cfg.hp;
        state.score = 0;
        state.round = 0;
        state.correct = 0;
        state.combo = 0;
        state.maxCombo = 0;
        state.total = cfg.total;
        state.timePerRound = cfg.time;
        state.timeLeft = cfg.time;
        state.pool = shuffle(ALL_PAIRS);
        state.isActive = true;
        state.isAnswered = false;

        els.hpNum.textContent = state.hp;
        els.scoreNum.textContent = 0;
        els.roundNum.textContent = 1;
        els.roundTotal.textContent = state.total;
        els.comboWrap.style.display = 'none';

        els.start.style.display = 'none';
        els.end.style.display = 'none';
        els.game.style.display = 'block';

        updateHP();
        renderRound();

        console.log('⚔️ Дуэль начата. Сложность: ' + cfg.name + ', пар в словаре: ' + ALL_PAIRS.length);
    }

    function selectDifficulty(diff){
        state.difficulty = diff;
        safeSet(STORAGE.diff, diff);
        document.querySelectorAll('.duel-diff-btn').forEach(function(b){
            b.classList.toggle('active', b.dataset.diff === diff);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       EVENTS
       ═══════════════════════════════════════════════════════════ */
    document.querySelectorAll('.duel-diff-btn').forEach(function(btn){
        btn.onclick = function(){ selectDifficulty(btn.dataset.diff); };
    });

    document.getElementById('duel-start-btn').onclick = start;
    document.getElementById('duel-restart').onclick = function(){
        els.end.style.display = 'none';
        start();
    };
    els.next.onclick = nextRound;

    // Клавиатура
    document.addEventListener('keydown', function(e){
        if (!state.isActive) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        var n = parseInt(e.key, 10);
        if (n >= 1 && n <= 4 && !state.isAnswered){
            var btn = els.options.querySelector('.duel-opt[data-num="' + n + '"]');
            if (btn && !btn.disabled) btn.click();
            return;
        }
        if (e.key === 'Enter' && state.isAnswered){
            if (els.next.style.display !== 'none') els.next.click();
            return;
        }
        if (e.key === 'Escape'){
            state.isActive = false;
            stopTimer();
            els.game.style.display = 'none';
            els.start.style.display = 'block';
            return;
        }
    });

    // Пауза при скрытии вкладки
    document.addEventListener('visibilitychange', function(){
        if (document.hidden && state.isActive && !state.isAnswered){
            // Ставим на паузу таймер
            stopTimer();
        } else if (!document.hidden && state.isActive && !state.isAnswered && !state.timerId){
            // Возобновляем
            startTimer();
        }
    });

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */
    function init(){
        var best = parseInt(safeGet(STORAGE.best, 0), 10) || 0;
        if (els.best) els.best.textContent = best;
        updateRankBadge();

        var savedDiff = safeGet(STORAGE.diff, 'medium');
        if (DIFFICULTIES[savedDiff]) selectDifficulty(savedDiff);

        console.log('⚔️ Дуэль v2 VIP. Пар в словаре: ' + ALL_PAIRS.length);
    }

    if (document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
