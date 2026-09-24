---
title: Марсианское имя
comments: false
---

<div id="names-app">

<!-- ═══════════════════ INPUT ═══════════════════ -->
<div class="nm-panel">
    <div class="nm-header">
        <div class="nm-header-icon">🔤</div>
        <h1 class="nm-header-title">Твоё марсианское имя</h1>
        <p class="nm-header-sub">Введи земное имя — узнай, как тебя звали бы в древнем Марсе</p>
        <div class="nm-counter-badge">✨ Переведено: <span id="nm-counter">0</span></div>
    </div>

    <div class="nm-field">
        <label class="nm-label">Твоё земное имя</label>
        <div class="nm-input-wrap">
            <input type="text" id="nm-input" placeholder="Иван, Мария, Александр..." maxlength="30" autocomplete="off" spellcheck="false">
            <button id="nm-random" class="nm-input-btn" title="Случайное имя">🎲</button>
            <button id="nm-clear" class="nm-input-btn" title="Очистить">✕</button>
        </div>
    </div>

    <div class="nm-field">
        <label class="nm-label">Стиль королевства</label>
        <div class="nm-kingdom-grid" id="nm-kingdoms"></div>
    </div>

    <div class="nm-actions">
        <button id="nm-generate" class="nm-main-btn">
            <span>✨ Перевести на марсианский</span>
        </button>
    </div>

    <div class="nm-hint">
        💡 <kbd>Enter</kbd> — сгенерировать · <kbd>R</kbd> — случайное имя
    </div>
</div>

<!-- ═══════════════════ RESULT ═══════════════════ -->
<div id="nm-result-wrap" style="display:none;">
    <div id="nm-result" class="nm-result-card"></div>
    <div class="nm-result-actions" id="nm-result-actions"></div>
</div>

<!-- ═══════════════════ HISTORY ═══════════════════ -->
<div id="nm-history-wrap" class="nm-panel" style="display:none;">
    <div class="nm-history-head">
        <h3 class="nm-history-title">📚 Твои переводы</h3>
        <div class="nm-history-tabs">
            <button class="nm-htab active" data-tab="local">💻 Локальные</button>
            <button class="nm-htab" data-tab="cloud" id="nm-tab-cloud" style="display:none;">☁️ Профиль</button>
        </div>
        <button id="nm-history-clear" class="nm-history-clear">Очистить</button>
    </div>
    <div id="nm-history" class="nm-history-list"></div>
</div>

<!-- ═══════════════════ PARTICLES / FLASH ═══════════════════ -->
<div id="nm-particles" class="nm-particles"></div>
<div id="nm-flash" class="nm-flash"></div>
<div id="nm-toast" class="nm-toast"></div>

</div>

<style>
/* ═══════════════════ BASE ═══════════════════ */
#names-app{
    max-width: 720px;
    margin: 0 auto;
    font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    padding: 0 8px 60px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
}
.nm-panel{
    background: linear-gradient(135deg, #f5f7fa, #e8ecf3);
    border-radius: 20px;
    padding: 24px 22px;
    margin-bottom: 20px;
    box-shadow: 0 12px 40px -12px rgba(108,99,255,.25);
    border: 1px solid rgba(108,99,255,.1);
}
#nm-result-wrap{
    margin-bottom: 20px;
    animation: nmFadeIn .5s cubic-bezier(.16,1,.3,1);
}

@keyframes nmFadeIn{
    from{ opacity:0; transform:translateY(20px) scale(.98); }
    to{ opacity:1; transform:translateY(0) scale(1); }
}
@keyframes nmPop{
    0%{ transform:scale(1); }
    50%{ transform:scale(1.06); }
    100%{ transform:scale(1); }
}
@keyframes nmGlow{
    0%,100%{ box-shadow:0 0 30px rgba(108,99,255,.3), 0 0 60px rgba(108,99,255,.15) inset; }
    50%{ box-shadow:0 0 60px rgba(108,99,255,.6), 0 0 80px rgba(162,155,254,.25) inset; }
}
@keyframes nmShine{
    0%{ background-position:-200% center; }
    100%{ background-position:200% center; }
}
@keyframes nmFloat{
    0%,100%{ transform:translateY(0); }
    50%{ transform:translateY(-6px); }
}
@keyframes nmParticle{
    0%{ transform:translate(0,0) scale(1); opacity:1; }
    100%{ transform:translate(var(--dx), var(--dy)) scale(.2); opacity:0; }
}
@keyframes nmFlash{
    0%{ opacity:0; }
    40%{ opacity:1; }
    100%{ opacity:0; }
}
@keyframes nmSlideUp{
    from{ opacity:0; transform:translateY(30px); }
    to{ opacity:1; transform:translateY(0); }
}
@keyframes nmSlideRight{
    from{ opacity:0; transform:translateX(-16px); }
    to{ opacity:1; transform:translateX(0); }
}
@keyframes nmStar{
    0%,100%{ transform:rotate(0deg) scale(1); opacity:.7; }
    50%{ transform:rotate(180deg) scale(1.15); opacity:1; }
}

/* ═══════════════════ HEADER ═══════════════════ */
.nm-header{
    text-align: center;
    padding: 8px 0 20px;
}
.nm-header-icon{
    font-size: 3.6rem;
    margin-bottom: 6px;
    display: inline-block;
    animation: nmFloat 3s ease-in-out infinite;
    filter: drop-shadow(0 8px 20px rgba(108,99,255,.4));
}
.nm-header-title{
    margin: 0 0 8px 0;
    font-size: 1.9rem;
    font-weight: 900;
    letter-spacing: .5px;
    background: linear-gradient(90deg, #6C63FF, #A29BFE, #f39c12, #6C63FF);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: nmShine 4s linear infinite;
}
.nm-header-sub{
    color: #666;
    font-size: .9rem;
    margin: 0 0 12px;
    line-height: 1.6;
}
.nm-counter-badge{
    display: inline-block;
    padding: 6px 14px;
    background: rgba(108,99,255,.12);
    border: 1px solid rgba(108,99,255,.3);
    border-radius: 20px;
    font-size: .76rem;
    color: #6C63FF;
    font-weight: 700;
}
.nm-counter-badge span{ font-weight: 900; font-size: .9rem; }

/* ═══════════════════ FIELDS ═══════════════════ */
.nm-field{
    margin-bottom: 16px;
}
.nm-label{
    display: block;
    font-size: .78rem;
    font-weight: 800;
    color: #333;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.nm-input-wrap{
    position: relative;
    display: flex;
    gap: 8px;
}
#nm-input{
    flex: 1;
    padding: 16px 52px 16px 20px;
    border-radius: 14px;
    border: 2px solid rgba(108,99,255,.15);
    font-size: 1.05rem;
    font-family: inherit;
    outline: none;
    background: #fff;
    transition: all .25s cubic-bezier(.16,1,.3,1);
    box-sizing: border-box;
    color: #1a1a2e;
    font-weight: 600;
}
#nm-input:focus{
    border-color: #6C63FF;
    box-shadow: 0 0 0 4px rgba(108,99,255,.15);
    background: #fff;
}
#nm-input.error{
    border-color: #e74c3c;
    animation: nmPop .4s ease;
}
.nm-input-btn{
    padding: 0 16px;
    border-radius: 14px;
    border: 2px solid rgba(108,99,255,.15);
    background: #fff;
    color: #6C63FF;
    font-size: 1.1rem;
    cursor: pointer;
    font-family: inherit;
    transition: all .2s;
    flex-shrink: 0;
    min-width: 48px;
}
.nm-input-btn:hover{
    background: rgba(108,99,255,.08);
    border-color: #6C63FF;
    transform: translateY(-1px);
}
.nm-input-btn:active{ transform: scale(.95); }

/* ═══════════════════ KINGDOMS ═══════════════════ */
.nm-kingdom-grid{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
.nm-kingdom-btn{
    padding: 10px 6px;
    border-radius: 12px;
    border: 2px solid rgba(0,0,0,.06);
    background: #fff;
    cursor: pointer;
    font-family: inherit;
    transition: all .25s cubic-bezier(.16,1,.3,1);
    text-align: center;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
}
.nm-kingdom-btn:hover{
    transform: translateY(-3px);
    box-shadow: 0 8px 20px -6px var(--k-color, rgba(108,99,255,.4));
    border-color: var(--k-color, #6C63FF);
}
.nm-kingdom-btn.active{
    border-color: var(--k-color, #6C63FF);
    background: linear-gradient(135deg, var(--k-color-alpha, rgba(108,99,255,.15)), transparent);
    box-shadow: 0 6px 20px -6px var(--k-color, rgba(108,99,255,.5));
}
.nm-kingdom-flag{
    width: 32px;
    height: 22px;
    border-radius: 4px;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0,0,0,.15);
}
.nm-kingdom-name{
    font-size: .72rem;
    font-weight: 800;
    color: #333;
    line-height: 1.1;
}
.nm-kingdom-btn.active .nm-kingdom-name{
    color: var(--k-color, #6C63FF);
}

/* ═══════════════════ BUTTONS ═══════════════════ */
.nm-actions{ margin-top: 20px; }
.nm-main-btn{
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff;
    border: none;
    border-radius: 16px;
    font-size: 1.05rem;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: .5px;
    box-shadow: 0 12px 32px -8px rgba(108,99,255,.5);
    transition: all .3s cubic-bezier(.16,1,.3,1);
    position: relative;
    overflow: hidden;
}
.nm-main-btn::before{
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent, rgba(255,255,255,.2), transparent);
    transform: translateX(-100%);
    transition: transform .6s;
}
.nm-main-btn:hover::before{ transform: translateX(100%); }
.nm-main-btn:hover{
    transform: translateY(-2px);
    box-shadow: 0 16px 40px -8px rgba(108,99,255,.7);
}
.nm-main-btn:active{ transform: translateY(0) scale(.98); }
.nm-main-btn:disabled{
    opacity: .6;
    cursor: wait;
    transform: none;
}

.nm-hint{
    text-align: center;
    margin-top: 14px;
    font-size: .75rem;
    color: #888;
}
.nm-hint kbd{
    display: inline-block;
    padding: 2px 8px;
    background: rgba(108,99,255,.12);
    border: 1px solid rgba(108,99,255,.25);
    border-radius: 5px;
    font-family: 'SF Mono', Consolas, monospace;
    font-size: .7rem;
    color: #6C63FF;
    font-weight: 700;
    margin: 0 2px;
}

/* ═══════════════════ RESULT CARD ═══════════════════ */
.nm-result-card{
    position: relative;
    background: linear-gradient(135deg, #1a1a2e, #2d1b3d);
    border-radius: 24px;
    padding: 44px 28px 34px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    border: 2px solid var(--k-color, #6C63FF);
    box-shadow: 0 24px 60px -16px var(--k-color, rgba(108,99,255,.5));
    animation: nmFadeIn .6s cubic-bezier(.16,1,.3,1);
}
.nm-result-card::before{
    content: '';
    position: absolute;
    top: -50%; right: -30%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, var(--k-color, rgba(108,99,255,.35)), transparent 70%);
    border-radius: 50%;
    animation: nmGlow 3s ease-in-out infinite;
    pointer-events: none;
}
.nm-result-card::after{
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 15% 20%, rgba(255,255,255,.06), transparent 40%),
        radial-gradient(circle at 85% 80%, rgba(255,255,255,.04), transparent 40%);
    pointer-events: none;
}
.nm-star-deco{
    position: absolute;
    font-size: 1rem;
    opacity: .5;
    animation: nmStar 4s ease-in-out infinite;
    color: var(--k-color, #A29BFE);
    pointer-events: none;
    z-index: 1;
}

.nm-title-line{
    position: relative;
    z-index: 2;
    font-size: .74rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--k-color, #A29BFE);
    margin-bottom: 14px;
    font-weight: 800;
    text-shadow: 0 2px 10px rgba(0,0,0,.6);
}

.nm-main-name{
    position: relative;
    z-index: 2;
    font-size: clamp(2rem, 8vw, 3.2rem);
    font-weight: 900;
    letter-spacing: -1px;
    margin: 8px 0;
    line-height: 1.05;
    background: linear-gradient(135deg, #fff 20%, var(--k-color, #A29BFE) 55%, #f39c12 90%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: nmShine 4s linear infinite, nmSlideUp .8s cubic-bezier(.16,1,.3,1);
    text-shadow: 0 0 40px rgba(162,155,254,.3);
    word-break: break-word;
}

.nm-epithet{
    position: relative;
    z-index: 2;
    font-size: 1rem;
    font-weight: 700;
    color: var(--k-color, #A29BFE);
    margin: 4px 0 2px;
    animation: nmSlideUp .8s cubic-bezier(.16,1,.3,1) .1s both;
}
.nm-title-name{
    position: relative;
    z-index: 2;
    font-size: 1.15rem;
    font-weight: 900;
    color: #f5d76e;
    letter-spacing: 1px;
    margin: 8px 0 4px;
    animation: nmSlideUp .8s cubic-bezier(.16,1,.3,1) .2s both;
    text-shadow: 0 0 20px rgba(243,156,18,.5);
}
.nm-title-meaning{
    position: relative;
    z-index: 2;
    font-size: .85rem;
    color: #9999bb;
    font-style: italic;
    margin-bottom: 16px;
    animation: nmSlideUp .8s cubic-bezier(.16,1,.3,1) .25s both;
}

.nm-divider{
    position: relative;
    z-index: 2;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--k-color, rgba(162,155,254,.5)), transparent);
    margin: 18px auto;
    max-width: 300px;
    animation: nmSlideUp .8s ease .3s both;
}

.nm-noble-name{
    position: relative;
    z-index: 2;
    font-size: .82rem;
    color: #b0b0c8;
    margin-bottom: 6px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    animation: nmSlideUp .8s ease .35s both;
}
.nm-noble-value{
    position: relative;
    z-index: 2;
    font-size: 1.05rem;
    font-family: 'Georgia', serif;
    color: #fff;
    margin-bottom: 16px;
    letter-spacing: .5px;
    animation: nmSlideUp .8s ease .4s both;
    word-break: break-word;
}
.nm-noble-value em{
    color: var(--k-color, #A29BFE);
    font-style: normal;
    font-weight: 700;
}

.nm-stats-row{
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin: 16px 0 4px;
    animation: nmSlideUp .8s ease .45s both;
}
.nm-stat{
    text-align: center;
}
.nm-stat-icon{
    font-size: 1.3rem;
    margin-bottom: 2px;
}
.nm-stat-label{
    font-size: .65rem;
    color: #8888aa;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 800;
}
.nm-stat-value{
    font-size: .85rem;
    color: #fff;
    font-weight: 700;
    margin-top: 2px;
}

/* ═══════════════════ RESULT ACTIONS ═══════════════════ */
.nm-result-actions{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    margin-top: 12px;
}
.nm-action-btn{
    padding: 12px 14px;
    background: #fff;
    border: 2px solid rgba(108,99,255,.2);
    border-radius: 12px;
    color: #6C63FF;
    font-weight: 800;
    font-size: .82rem;
    cursor: pointer;
    font-family: inherit;
    transition: all .2s cubic-bezier(.16,1,.3,1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    text-decoration: none;
}
.nm-action-btn:hover{
    border-color: #6C63FF;
    background: rgba(108,99,255,.06);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -6px rgba(108,99,255,.4);
}
.nm-action-btn:active{ transform: translateY(0) scale(.97); }
.nm-action-btn.saved{
    background: linear-gradient(135deg, #27ae60, #16a085);
    color: #fff;
    border-color: #27ae60;
}

/* ═══════════════════ HISTORY ═══════════════════ */
.nm-history-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    gap: 10px;
    flex-wrap: wrap;
}
.nm-history-title{
    margin: 0;
    font-size: 1rem;
    color: #1a1a2e;
    font-weight: 800;
}
.nm-history-tabs{
    display: flex;
    gap: 4px;
    background: rgba(0,0,0,.04);
    padding: 3px;
    border-radius: 12px;
}
.nm-htab{
    padding: 6px 12px;
    border: none;
    background: transparent;
    border-radius: 9px;
    font-size: .76rem;
    font-weight: 800;
    color: #666;
    cursor: pointer;
    font-family: inherit;
    transition: all .2s;
}
.nm-htab.active{
    background: #fff;
    color: #6C63FF;
    box-shadow: 0 2px 8px rgba(0,0,0,.06);
}
.nm-history-clear{
    background: transparent;
    border: none;
    color: #999;
    font-size: .75rem;
    cursor: pointer;
    font-family: inherit;
    text-decoration: underline;
    padding: 4px 8px;
}
.nm-history-clear:hover{ color: #e74c3c; }

.nm-history-list{
    display: grid;
    gap: 8px;
}
.nm-history-item{
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,.05);
    cursor: pointer;
    transition: all .25s cubic-bezier(.16,1,.3,1);
    animation: nmSlideRight .4s ease both;
}
.nm-history-item:hover{
    transform: translateX(4px);
    border-color: #6C63FF;
    box-shadow: 0 8px 20px -6px rgba(108,99,255,.25);
}
.nm-history-flag{
    width: 26px;
    height: 18px;
    border-radius: 3px;
    object-fit: cover;
    box-shadow: 0 1px 4px rgba(0,0,0,.15);
    flex-shrink: 0;
}
.nm-history-info{
    flex: 1;
    min-width: 0;
}
.nm-history-name{
    font-weight: 800;
    color: #1a1a2e;
    font-size: .88rem;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.nm-history-sub{
    font-size: .72rem;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.nm-history-del{
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: rgba(231,76,60,.08);
    color: #e74c3c;
    cursor: pointer;
    font-family: inherit;
    font-size: .8rem;
    flex-shrink: 0;
    transition: all .2s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nm-history-del:hover{
    background: #e74c3c;
    color: #fff;
    transform: scale(1.1);
}

/* ═══════════════════ PARTICLES / FLASH / TOAST ═══════════════════ */
.nm-particles{
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
}
.nm-particle{
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: nmParticle .9s cubic-bezier(.16,1,.3,1) forwards;
    will-change: transform, opacity;
}
.nm-flash{
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    background: radial-gradient(circle at center, rgba(162,155,254,.5), transparent 70%);
}
.nm-flash.active{
    animation: nmFlash .6s ease;
}

.nm-toast{
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: linear-gradient(135deg, #27ae60, #16a085);
    color: #fff;
    padding: 12px 26px;
    border-radius: 30px;
    font-weight: 800;
    font-size: .9rem;
    box-shadow: 0 12px 32px rgba(0,0,0,.3);
    z-index: 2147483647;
    transition: transform .4s cubic-bezier(.16,1,.3,1);
    pointer-events: none;
    max-width: 90vw;
    text-align: center;
}
.nm-toast.show{ transform: translateX(-50%) translateY(0); }
.nm-toast.error{ background: linear-gradient(135deg, #e74c3c, #c0392b); }
.nm-toast.info{ background: linear-gradient(135deg, #3498db, #2980b9); }

/* ═══════════════════ MOBILE ═══════════════════ */
@media (max-width: 540px){
    .nm-panel{ padding: 20px 16px; border-radius: 16px; }
    .nm-header-title{ font-size: 1.5rem; }
    .nm-header-icon{ font-size: 3rem; }
    .nm-kingdom-grid{ grid-template-columns: repeat(2, 1fr); }
    .nm-main-name{ font-size: 2rem; }
    .nm-result-card{ padding: 32px 20px 26px; }
    .nm-stats-row{ gap: 12px; }
    .nm-result-actions{ grid-template-columns: 1fr 1fr; }
}

@media (prefers-reduced-motion: reduce){
    #names-app *,
    #names-app *::before,
    #names-app *::after{
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .01ms !important;
    }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function(){
'use strict';

if (window.__nmLoaded) return;
window.__nmLoaded = true;

/* ═══════════════════════════════════════════════════════════
   SUPABASE
   ═══════════════════════════════════════════════════════════ */
var SUPABASE_URL='https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY='sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var sb=null;
var currentUser=null;
var cloudHistory=[];
var histTab='local';

try{
    if (window.supabase && window.supabase.createClient){
        sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
}catch(e){ console.warn('Supabase init failed', e); }

/* ═══════════════════════════════════════════════════════════
   ТРАНСЛИТЕРАЦИЯ
   ═══════════════════════════════════════════════════════════ */
var TRANSLIT = {
    'а':'a','б':'b','в':'v','г':'gh','д':'d','е':'e','ё':'yo','ж':'zh',
    'з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o',
    'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts',
    'ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
    'А':'A','Б':'B','В':'V','Г':'Gh','Д':'D','Е':'E','Ё':'Yo','Ж':'Zh',
    'З':'Z','И':'I','Й':'Y','К':'K','Л':'L','М':'M','Н':'N','О':'O',
    'П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F','Х':'Kh','Ц':'Ts',
    'Ч':'Ch','Ш':'Sh','Щ':'Shch','Ъ':'','Ы':'Y','Ь':'','Э':'E','Ю':'Yu','Я':'Ya'
};

var MACRONS = [
    { from:'a', to:'ā' }, { from:'e', to:'ē' }, { from:'o', to:'ō' },
    { from:'u', to:'ū' }, { from:'i', to:'ī' },
    { from:'ch', to:'ts' }, { from:'kh', to:'gh' }, { from:'y', to:'i' }
];

/* ═══════════════════════════════════════════════════════════
   КОРОЛЕВСТВА И СТИЛИ
   ═══════════════════════════════════════════════════════════ */
var KINGDOMS = [
    { id:'edem', name:'Эдем', color:'#F4A460', alpha:'rgba(244,164,96,.15)',
      flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eden.jpg',
      prefix:['Dzen','Lān','Suf','Rōg','Mar'],
      suffix:['thal','mar','sur','khō','lān'] },
    { id:'arkadia', name:'Аркадия', color:'#D4A574', alpha:'rgba(212,165,116,.15)',
      flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/map/flag-of-arkadia.png',
      prefix:['Kōl','Zal','Nur','Ari','Suf'],
      suffix:['ghar','mōr','ari','sen','dzen'] },
    { id:'kimeria', name:'Кимерия', color:'#B19CD9', alpha:'rgba(177,156,217,.15)',
      flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-kimeria.png',
      prefix:['Lān','Mōr','Xal','Okh','Tal'],
      suffix:['īn','am','al','ūr','ōl'] },
    { id:'ksanf', name:'Ксанф', color:'#3D3D3D', alpha:'rgba(61,61,61,.15)',
      flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/coat-of-arms-of-ksanf.png',
      prefix:['Khan','Rōg','Ur','Xal','Shal'],
      suffix:['mōr','ghar','khan','rōg','arn'] },
    { id:'eridania', name:'Эридания', color:'#F5D76E', alpha:'rgba(245,215,110,.15)',
      flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eridania.png',
      prefix:['Dzen','Tsan','Kōl','Mar','Lān'],
      suffix:['thal','tsan','īn','ūr','el'] },
    { id:'ellada', name:'Эллада', color:'#FF8A65', alpha:'rgba(255,138,101,.15)',
      flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-hellas.png',
      prefix:['Ari','Mar','Khō','Suf','Zal'],
      suffix:['thōl','mar','khō','suf','ari'] },
    { id:'utopia', name:'Утопия', color:'#4DD0E1', alpha:'rgba(77,208,225,.15)',
      flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-utopia.png',
      prefix:['Nur','Lān','Ari','Zal','Okh'],
      suffix:['ākha','nur','īn','el','ōn'] },
    { id:'kimmeria2', name:'Авсония', color:'#87CEEB', alpha:'rgba(135,206,235,.15)',
      flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-avsonia.png',
      prefix:['Mōr','Sen','Tal','Kōl','Suf'],
      suffix:['lān','am','īn','ōn','el'] }
];

/* ═══════════════════════════════════════════════════════════
   ТИТУЛЫ (по первой букве)
   ═══════════════════════════════════════════════════════════ */
var TITLES = {
    'А':'Dzen-thal','Б':'Kōl-ghar','В':'Khō-sen','Г':'Ākha-lān',
    'Д':'Rōg-ari','Е':'Lān-sur','Ё':'Lān-sur','Ж':'Zal-mar',
    'З':'Mōr-khō','И':'Ariya-mar','Й':'Ariya-mar','К':'Kōl-suf',
    'Л':'Lān-mar','М':'Mar-dzen','Н':'Nur-ākha','О':'Okh-sen',
    'П':'Suf-ari','Р':'Rōg-lān','С':'Suf-dzen','Т':'Tal-dzen',
    'У':'Ull-ākha','Ф':'Khan-suf','Х':'Xal-mar','Ц':'Tsan-lān',
    'Ч':'Chal-dzen','Ш':'Shal-ghar','Щ':'Shchur-okh','Ъ':'Okh-mar',
    'Ы':'Tsan-ūr','Ь':'Lān-el','Э':'Ell-ari','Ю':'Yur-dzen','Я':'Yar-rōg'
};

var TITLE_MEANINGS = {
    'Dzen-thal':'Смотрящий на звёзды',
    'Kōl-ghar':'Каменный страж',
    'Khō-sen':'Хранитель огня',
    'Ākha-lān':'Помнящий воду',
    'Rōg-ari':'Избранный король',
    'Lān-sur':'Глина помнит',
    'Zal-mar':'Дыхание жизни',
    'Mōr-khō':'Смерть огня',
    'Ariya-mar':'Священная жизнь',
    'Kōl-suf':'Великая земля',
    'Lān-mar':'Память жизни',
    'Mar-dzen':'Жизнь-звезда',
    'Nur-ākha':'Идущий к воде',
    'Okh-sen':'Дом-место',
    'Suf-ari':'Великий избранный',
    'Rōg-lān':'Король памяти',
    'Suf-dzen':'Великая звезда',
    'Tal-dzen':'Смотрящий с высоты',
    'Ull-ākha':'Глубина вод',
    'Khan-suf':'Великая река',
    'Xal-mar':'Древняя жизнь',
    'Tsan-lān':'Знание памяти',
    'Chal-dzen':'Пыль звёзд',
    'Shal-ghar':'Тень камня',
    'Shchur-okh':'Первый дом',
    'Okh-mar':'Дом жизни',
    'Tsan-ūr':'Знание воина',
    'Lān-el':'Память света',
    'Ell-ari':'Эллада избранных',
    'Yur-dzen':'Южный ветер звёзд',
    'Yar-rōg':'Мудрый правитель'
};

/* ═══════════════════════════════════════════════════════════
   ЭЛЕМЕНТЫ (по последней букве)
   ═══════════════════════════════════════════════════════════ */
var ELEMENTS = {
    a:{name:'Вода',icon:'💧',color:'#4DD0E1'},
    е:{name:'Небо',icon:'🌤',color:'#90CAF9'},
    ё:{name:'Небо',icon:'🌤',color:'#90CAF9'},
    и:{name:'Звезда',icon:'⭐',color:'#F5D76E'},
    й:{name:'Звезда',icon:'⭐',color:'#F5D76E'},
    о:{name:'Солнце',icon:'☀️',color:'#F4A460'},
    у:{name:'Ветер',icon:'💨',color:'#B0BEC5'},
    ы:{name:'Земля',icon:'🏔',color:'#A1887F'},
    э:{name:'Свет',icon:'✨',color:'#FFD54F'},
    ю:{name:'Луна',icon:'🌙',color:'#B39DDB'},
    я:{name:'Огонь',icon:'🔥',color:'#FF7043'},
    ь:{name:'Тишина',icon:'🌫',color:'#9E9E9E'},
    б:{name:'Камень',icon:'🪨',color:'#8D6E63'},
    в:{name:'Воздух',icon:'🌬',color:'#81D4FA'},
    г:{name:'Глина',icon:'🟤',color:'#A1887F'},
    д:{name:'Судьба',icon:'🎭',color:'#BA68C8'},
    ж:{name:'Жар',icon:'🔥',color:'#FF7043'},
    з:{name:'Иней',icon:'❄️',color:'#81D4FA'},
    к:{name:'Меч',icon:'⚔️',color:'#B0BEC5'},
    л:{name:'Луч',icon:'☄️',color:'#FFD54F'},
    м:{name:'Память',icon:'📜',color:'#A29BFE'},
    н:{name:'Ночь',icon:'🌌',color:'#7986CB'},
    п:{name:'Пепел',icon:'🌫',color:'#9E9E9E'},
    р:{name:'Рассвет',icon:'🌅',color:'#F4A460'},
    с:{name:'Соль',icon:'🧂',color:'#ECEFF1'},
    т:{name:'Тень',icon:'🌑',color:'#616161'},
    ф:{name:'Пламя',icon:'🔥',color:'#FF7043'},
    х:{name:'Холод',icon:'❄️',color:'#81D4FA'},
    ц:{name:'Цвет',icon:'🎨',color:'#BA68C8'},
    ч:{name:'Час',icon:'⏳',color:'#FFB74D'},
    ш:{name:'Шёпот',icon:'🤫',color:'#9E9E9E'},
    щ:{name:'Щит',icon:'🛡',color:'#90A4AE'}
};
function getElement(name){
    var last = name.slice(-1).toLowerCase();
    return ELEMENTS[last] || {name:'Тайна',icon:'✨',color:'#A29BFE'};
}

/* ═══════════════════════════════════════════════════════════
   РАНДОМ-ИМЕНА
   ═══════════════════════════════════════════════════════════ */
var RANDOM_NAMES = [
    'Иван','Мария','Александр','Екатерина','Дмитрий','Анна','Сергей','Ольга',
    'Андрей','Татьяна','Михаил','Елена','Николай','София','Владимир','Наталья',
    'Георгий','Ирина','Павел','Юлия','Артём','Вера','Максим','Ксения',
    'Лев','Дарья','Пётр','Марина','Тимур','Алиса','Роман','Полина'
];

/* ═══════════════════════════════════════════════════════════
   УТИЛИТЫ
   ═══════════════════════════════════════════════════════════ */
function esc(s){
    return String(s||'').replace(/[&<>"']/g,function(m){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
    });
}
function escAttr(s){
    return String(s||'').replace(/['"\\<>]/g,function(m){
        return {"'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e'}[m];
    });
}
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function safeGet(k, def){
    try{
        var v = localStorage.getItem(k);
        if (v === null) return def;
        try{ return JSON.parse(v); }catch(e){ return v; }
    }catch(e){ return def; }
}
function safeSet(k, v){
    try{ localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); }catch(e){}
}

function toast(msg, type){
    type = type || 'success';
    var el = document.getElementById('nm-toast');
    if (!el) return;
    el.className = 'nm-toast ' + (type === 'error' ? 'error' : type === 'info' ? 'info' : '');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(function(){ el.classList.remove('show'); }, 2400);
}

function vibrate(p){ try{ if (navigator.vibrate) navigator.vibrate(p); }catch(e){} }

/* ═══════════════════════════════════════════════════════════
   ЗВУКИ (Web Audio API)
   ═══════════════════════════════════════════════════════════ */
var audioCtx = null, audioUnlocked = false;
function getCtx(){
    if (!audioUnlocked) return null;
    try{
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
    }catch(e){ return null; }
    return audioCtx;
}
function unlock(){
    if (audioUnlocked) return;
    function un(){
        try{
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            audioUnlocked = true;
        }catch(e){}
        document.removeEventListener('touchstart', un);
        document.removeEventListener('click', un);
        document.removeEventListener('keydown', un);
    }
    document.addEventListener('touchstart', un, {passive:true});
    document.addEventListener('click', un, {passive:true});
    document.addEventListener('keydown', un, {passive:true});
}
function note(f, dur, type, vol){
    var c = getCtx(); if (!c) return;
    try{
        var o = c.createOscillator(), g = c.createGain();
        o.type = type || 'sine';
        o.frequency.value = f;
        g.gain.setValueAtTime(0, c.currentTime);
        g.gain.linearRampToValueAtTime(vol || 0.1, c.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
        o.connect(g); g.connect(c.destination);
        o.start(); o.stop(c.currentTime + dur);
    }catch(e){}
}
function sfxGenerate(){
    [523.25, 659.25, 783.99].forEach(function(f,i){
        setTimeout(function(){ note(f, 0.18, 'sine', 0.09); }, i*70);
    });
}
function sfxRandom(){ note(880, 0.15, 'triangle', 0.08); }
function sfxError(){ note(220, 0.2, 'sawtooth', 0.06); }

/* ═══════════════════════════════════════════════════════════
   ЧАСТИЦЫ / FLASH
   ═══════════════════════════════════════════════════════════ */
function spawnParticles(x, y, color, count){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    count = count || 20;
    var wrap = document.getElementById('nm-particles');
    if (!wrap) return;
    for (var i = 0; i < count; i++){
        var p = document.createElement('div');
        p.className = 'nm-particle';
        var angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        var dist = 80 + Math.random() * 140;
        var size = 4 + Math.random() * 8;
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.background = color;
        p.style.boxShadow = '0 0 14px ' + color;
        p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        wrap.appendChild(p);
        (function(el){
            setTimeout(function(){ el.remove(); }, 900);
        })(p);
    }
}
function flash(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var el = document.getElementById('nm-flash');
    if (!el) return;
    el.classList.remove('active');
    void el.offsetWidth;
    el.classList.add('active');
}

/* ═══════════════════════════════════════════════════════════
   ГЕНЕРАЦИЯ ИМЕНИ
   ═══════════════════════════════════════════════════════════ */
function translit(name){
    var out = '';
    for (var i = 0; i < name.length; i++){
        var ch = name[i];
        out += TRANSLIT[ch] !== undefined ? TRANSLIT[ch] : ch;
    }
    return out;
}

function applyMacrons(str){
    var s = str;
    MACRONS.forEach(function(m){
        s = s.split(m.from).join(m.to);
    });
    return s;
}

function toMartian(name){
    var base = translit(name);
    var martian = applyMacrons(base);
    // Первая буква заглавная
    martian = martian.charAt(0).toUpperCase() + martian.slice(1);
    // Ограничить длину
    if (martian.length > 14) martian = martian.slice(0, 14);
    return martian;
}

function getTitle(name){
    if (!name) return { title:'Dzen-thal', meaning:TITLE_MEANINGS['Dzen-thal'] };
    var first = name.charAt(0).toUpperCase();
    var title = TITLES[first] || pick(Object.values(TITLES));
    return { title: title, meaning: TITLE_MEANINGS[title] || 'Неизвестный' };
}

function buildNobleName(martian, title, kingdom){
    // "Dzen-thal Lānmar ae Khōsen"
    var prefix = pick(kingdom.prefix);
    var suffix = pick(kingdom.suffix);
    var middle = prefix + suffix;
    // Первая буква — заглавная
    middle = middle.charAt(0).toUpperCase() + middle.slice(1);
    return title.title + ' ' + martian + ' ae ' + middle;
}

function validateName(name){
    var clean = name.trim().replace(/\s+/g, ' ');
    if (clean.length < 2) return { ok:false, msg:'Слишком короткое имя' };
    if (clean.length > 30) return { ok:false, msg:'Слишком длинное имя' };
    if (!/^[А-Яа-яЁёA-Za-z\s\-']+$/.test(clean)) return { ok:false, msg:'Только буквы' };
    // Оставить только первый пробел для составных имён
    var parts = clean.split(' ');
    if (parts.length > 2) clean = parts.slice(0, 2).join(' ');
    return { ok:true, value: clean };
}

/* ═══════════════════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════════════════ */
var state = {
    kingdom: KINGDOMS[0],
    last: null,
    history: [],
    busy: false,
    counter: 0
};

/* ═══════════════════════════════════════════════════════════
   DOM
   ═══════════════════════════════════════════════════════════ */
var input = document.getElementById('nm-input');
var randomBtn = document.getElementById('nm-random');
var clearBtn = document.getElementById('nm-clear');
var generateBtn = document.getElementById('nm-generate');
var kingdomGrid = document.getElementById('nm-kingdoms');
var resultWrap = document.getElementById('nm-result-wrap');
var resultBox = document.getElementById('nm-result');
var actionsBox = document.getElementById('nm-result-actions');
var historyWrap = document.getElementById('nm-history-wrap');
var historyList = document.getElementById('nm-history');
var historyClear = document.getElementById('nm-history-clear');
var tabCloud = document.getElementById('nm-tab-cloud');
var counterEl = document.getElementById('nm-counter');

/* ═══════════════════════════════════════════════════════════
   RENDER KINGDOMS
   ═══════════════════════════════════════════════════════════ */
function renderKingdoms(){
    kingdomGrid.innerHTML = KINGDOMS.map(function(k){
        return '<button class="nm-kingdom-btn' + (k.id === state.kingdom.id ? ' active' : '') + '" ' +
            'data-id="' + k.id + '" ' +
            'style="--k-color:' + k.color + ';--k-color-alpha:' + k.alpha + ';">' +
            '<img class="nm-kingdom-flag" src="' + escAttr(k.flag) + '" alt="' + escAttr(k.name) + '" onerror="this.style.display=\'none\';">' +
            '<span class="nm-kingdom-name">' + esc(k.name) + '</span>' +
        '</button>';
    }).join('');
    kingdomGrid.querySelectorAll('.nm-kingdom-btn').forEach(function(btn){
        btn.onclick = function(){
            var k = KINGDOMS.filter(function(x){ return x.id === btn.dataset.id; })[0];
            if (!k) return;
            state.kingdom = k;
            renderKingdoms();
            sfxRandom();
        };
    });
}

/* ═══════════════════════════════════════════════════════════
   RENDER RESULT
   ═══════════════════════════════════════════════════════════ */
function renderResult(data){
    var k = state.kingdom;
    var el = getElement(data.earth);
    resultWrap.style.display = 'block';

    // Звёздочки-декорации
    var stars = '';
    for (var i = 0; i < 6; i++){
        var sx = 10 + Math.random() * 80;
        var sy = 5 + Math.random() * 20;
        var d = (Math.random() * 3).toFixed(1);
        stars += '<span class="nm-star-deco" style="top:' + sy + '%;left:' + sx + '%;animation-delay:' + d + 's;">✦</span>';
    }

    resultBox.style.setProperty('--k-color', k.color);
    resultBox.innerHTML =
        stars +
        '<div class="nm-title-line">' + esc(k.name) + ' · ' + el.icon + ' ' + esc(el.name) + '</div>' +
        '<div class="nm-main-name">' + esc(data.martian) + '</div>' +
        '<div class="nm-epithet">Твоё имя на марсианском</div>' +
        '<div class="nm-title-name">' + esc(data.title.title) + '</div>' +
        '<div class="nm-title-meaning">«' + esc(data.title.meaning) + '»</div>' +
        '<div class="nm-divider"></div>' +
        '<div class="nm-noble-name">Полное имя</div>' +
        '<div class="nm-noble-value">' + esc(data.noble).replace(/ ae /, ' <em>ae</em> ') + '</div>' +
        '<div class="nm-stats-row">' +
            '<div class="nm-stat"><div class="nm-stat-icon">' + el.icon + '</div><div class="nm-stat-label">Стихия</div><div class="nm-stat-value">' + esc(el.name) + '</div></div>' +
            '<div class="nm-stat"><div class="nm-stat-icon">📜</div><div class="nm-stat-label">Титул</div><div class="nm-stat-value">' + esc(data.title.title) + '</div></div>' +
            '<div class="nm-stat"><div class="nm-stat-icon">🏰</div><div class="nm-stat-label">Королевство</div><div class="nm-stat-value">' + esc(k.name) + '</div></div>' +
        '</div>';

    // Действия
    actionsBox.innerHTML =
        '<button class="nm-action-btn" id="nm-copy">📋 Скопировать</button>' +
        '<button class="nm-action-btn" id="nm-share">🔗 Поделиться</button>' +
        '<button class="nm-action-btn" id="nm-save">💾 В профиль</button>' +
        '<button class="nm-action-btn" id="nm-again">🎲 Ещё раз</button>';

    document.getElementById('nm-copy').onclick = copyResult;
    document.getElementById('nm-share').onclick = shareResult;
    document.getElementById('nm-save').onclick = saveToProfile;
    document.getElementById('nm-again').onclick = doRandom;

    // Прокрутка
    setTimeout(function(){
        resultWrap.scrollIntoView({behavior:'smooth', block:'start'});
    }, 80);
}

/* ═══════════════════════════════════════════════════════════
   ГЛАВНАЯ ФУНКЦИЯ
   ═══════════════════════════════════════════════════════════ */
function generate(earthName){
    if (state.busy) return;
    unlock();

    var raw = earthName !== undefined ? earthName : input.value;
    var v = validateName(raw);

    if (!v.ok){
        input.classList.add('error');
        setTimeout(function(){ input.classList.remove('error'); }, 1000);
        sfxError();
        toast(v.msg, 'error');
        try{ input.focus(); }catch(e){}
        return;
    }

    state.busy = true;
    generateBtn.disabled = true;

    // Мгновенная генерация (без задержки — но с эффектами)
    var name = v.value;
    var martian = toMartian(name);
    var title = getTitle(name);
    var noble = buildNobleName(martian, title, state.kingdom);

    var data = {
        earth: name,
        martian: martian,
        title: title,
        noble: noble,
        kingdom: state.kingdom.id,
        kingdomName: state.kingdom.name,
        ts: Date.now()
    };
    state.last = data;

    // Эффекты
    sfxGenerate();
    flash();
    vibrate(20);

    // Частицы от кнопки
    try{
        var rect = generateBtn.getBoundingClientRect();
        spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, state.kingdom.color, 22);
    }catch(e){}

    // Рендер
    setTimeout(function(){
        renderResult(data);
        generateBtn.disabled = false;
        state.busy = false;
    }, 250);

    // Сохранить в локальную историю
    saveLocal(data);
    // Счётчик
    state.counter++;
    safeSet('nm_counter', state.counter);
    if (counterEl) counterEl.textContent = state.counter;

    // Автосохранение в профиль при логине
    if (currentUser) saveCloud(data);
}

/* ═══════════════════════════════════════════════════════════
   RANDOM
   ═══════════════════════════════════════════════════════════ */
function doRandom(){
    var name = pick(RANDOM_NAMES);
    input.value = name;
    sfxRandom();
    generate(name);
}

/* ═══════════════════════════════════════════════════════════
   ACTIONS
   ═══════════════════════════════════════════════════════════ */
function copyResult(){
    if (!state.last) return;
    var text = state.last.martian + ' · ' + state.last.title.title + ' (' + state.last.title.meaning + ') · ' + state.last.kingdomName;
    copyText(text);
}
function copyText(text){
    if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){
            toast('✅ Скопировано', 'success');
            vibrate(15);
        }, function(){ fallbackCopy(text); });
    } else {
        fallbackCopy(text);
    }
}
function fallbackCopy(text){
    try{
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        toast('✅ Скопировано', 'success');
    }catch(e){ toast('Не удалось скопировать', 'error'); }
}

function shareResult(){
    if (!state.last) return;
    var url = location.origin + location.pathname +
        '?name=' + encodeURIComponent(state.last.earth) +
        '&k=' + state.last.kingdom;
    if (navigator.share){
        navigator.share({
            title: 'Марсианское имя',
            text: state.last.earth + ' → ' + state.last.martian + ' · ' + state.last.title.title,
            url: url
        }).catch(function(){});
    } else {
        copyText(url);
        toast('🔗 Ссылка скопирована', 'success');
    }
}

async function saveToProfile(){
    if (!state.last) return;
    if (!currentUser || !sb){
        toast('Войдите, чтобы сохранять', 'info');
        return;
    }
    var btn = document.getElementById('nm-save');
    if (btn) btn.disabled = true;
    try{
        var r = await sb.from('user_martian_names').insert([{
            user_id: currentUser.id,
            earth_name: state.last.earth,
            martian_name: state.last.martian,
            title: state.last.title.title,
            title_meaning: state.last.title.meaning,
            kingdom: state.last.kingdomName
        }]);
        if (r.error){
            toast('Ошибка: ' + r.error.message, 'error');
        } else {
            if (btn){
                btn.classList.add('saved');
                btn.textContent = '✓ Сохранено';
            }
            toast('💾 Сохранено в профиль', 'success');
            vibrate(20);
            await loadCloud();
        }
    }catch(e){
        toast('Ошибка', 'error');
    } finally {
        if (btn) btn.disabled = false;
    }
}

/* ═══════════════════════════════════════════════════════════
   LOCAL HISTORY
   ═══════════════════════════════════════════════════════════ */
function saveLocal(data){
    var hist = safeGet('nm_history', []);
    if (!Array.isArray(hist)) hist = [];
    hist.unshift({
        ts: data.ts,
        earth: data.earth,
        martian: data.martian,
        title: data.title.title,
        titleMeaning: data.title.meaning,
        kingdom: data.kingdom,
        kingdomName: data.kingdomName
    });
    hist = hist.slice(0, 10);
    safeSet('nm_history', hist);
    if (histTab === 'local') renderHistory();
}

/* ═══════════════════════════════════════════════════════════
   CLOUD HISTORY
   ═══════════════════════════════════════════════════════════ */
async function loadCloud(){
    if (!currentUser || !sb) return;
    try{
        var r = await sb.from('user_martian_names')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', {ascending:false})
            .limit(30);
        cloudHistory = (r && r.data) || [];
        if (tabCloud) tabCloud.style.display = cloudHistory.length ? 'inline-block' : 'none';
        if (histTab === 'cloud') renderHistory();
    }catch(e){ console.warn(e); }
}

async function saveCloud(data){
    if (!currentUser || !sb) return;
    try{
        await sb.from('user_martian_names').insert([{
            user_id: currentUser.id,
            earth_name: data.earth,
            martian_name: data.martian,
            title: data.title.title,
            title_meaning: data.title.meaning,
            kingdom: data.kingdomName
        }]);
        await loadCloud();
    }catch(e){}
}

/* ═══════════════════════════════════════════════════════════
   RENDER HISTORY
   ═══════════════════════════════════════════════════════════ */
function renderHistory(){
    var items = histTab === 'cloud' ? cloudHistory : (safeGet('nm_history', []) || []);
    if (!Array.isArray(items) || !items.length){
        historyWrap.style.display = 'none';
        return;
    }
    historyWrap.style.display = 'block';

    historyList.innerHTML = items.map(function(h, i){
        var k = KINGDOMS.filter(function(x){ return x.id === h.kingdom; })[0] || KINGDOMS[0];
        var ts = histTab === 'cloud' ? new Date(h.created_at).getTime() : h.ts;
        var earth = h.earth_name || h.earth;
        var martian = h.martian_name || h.martian;
        var title = h.title || '';
        var titleMean = h.title_meaning || h.titleMeaning || '';
        var kingdomName = h.kingdom || h.kingdomName || k.name;
        return '<div class="nm-history-item" data-idx="' + i + '">' +
            '<img class="nm-history-flag" src="' + escAttr(k.flag) + '" alt="" onerror="this.style.display=\'none\';">' +
            '<div class="nm-history-info">' +
                '<div class="nm-history-name">' + esc(earth) + ' → ' + esc(martian) + '</div>' +
                '<div class="nm-history-sub">' + esc(title) + (titleMean ? ' · ' + esc(titleMean) : '') + ' · ' + esc(kingdomName) + ' · ' + new Date(ts).toLocaleString('ru-RU', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) + '</div>' +
            '</div>' +
            (histTab === 'cloud'
                ? '<button class="nm-history-del" data-del="' + escAttr(h.id) + '" title="Удалить">✕</button>'
                : '') +
        '</div>';
    }).join('');

    historyList.querySelectorAll('.nm-history-item').forEach(function(el){
        el.onclick = function(e){
            if (e.target.classList.contains('nm-history-del')) return;
            var idx = parseInt(el.dataset.idx, 10);
            var h = items[idx];
            if (!h) return;
            var name = h.earth_name || h.earth;
            input.value = name;
            // Восстановить королевство
            var kId = h.kingdom || h.kingdomName;
            var k = KINGDOMS.filter(function(x){ return x.id === kId || x.name === kId; })[0];
            if (k) state.kingdom = k;
            renderKingdoms();
            generate(name);
        };
    });

    historyList.querySelectorAll('.nm-history-del').forEach(function(btn){
        btn.onclick = async function(e){
            e.stopPropagation();
            if (!confirm('Удалить из профиля?')) return;
            var id = btn.dataset.del;
            if (!id || !sb) return;
            try{
                await sb.from('user_martian_names').delete().eq('id', id).eq('user_id', currentUser.id);
                await loadCloud();
                toast('🗑 Удалено', 'info');
            }catch(e){}
        };
    });
}

/* ═══════════════════════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.nm-htab').forEach(function(t){
    t.onclick = function(){
        histTab = t.dataset.tab;
        document.querySelectorAll('.nm-htab').forEach(function(x){ x.classList.remove('active'); });
        t.classList.add('active');
        renderHistory();
    };
});

/* ═══════════════════════════════════════════════════════════
   CLEAR HISTORY
   ═══════════════════════════════════════════════════════════ */
historyClear.onclick = async function(){
    if (histTab === 'cloud'){
        if (!confirm('Удалить ВСЕ переводы из профиля?')) return;
        try{
            await sb.from('user_martian_names').delete().eq('user_id', currentUser.id);
            await loadCloud();
            toast('Очищено', 'info');
        }catch(e){}
    } else {
        safeSet('nm_history', []);
        renderHistory();
        toast('История очищена', 'info');
    }
};

/* ═══════════════════════════════════════════════════════════
   EVENTS
   ═══════════════════════════════════════════════════════════ */
generateBtn.onclick = function(){ generate(); };
randomBtn.onclick = doRandom;
clearBtn.onclick = function(){
    input.value = '';
    input.focus();
    resultWrap.style.display = 'none';
};

input.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        e.preventDefault();
        generate();
    }
});

document.addEventListener('keydown', function(e){
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К'){
        e.preventDefault();
        doRandom();
    }
});

/* ═══════════════════════════════════════════════════════════
   URL PARAMS
   ═══════════════════════════════════════════════════════════ */
function loadFromURL(){
    try{
        var p = new URLSearchParams(location.search);
        var n = p.get('name');
        var k = p.get('k');
        if (k){
            var found = KINGDOMS.filter(function(x){ return x.id === k; })[0];
            if (found) state.kingdom = found;
        }
        if (n){
            input.value = n;
            setTimeout(function(){ generate(n); }, 200);
        }
    }catch(e){}
}

/* ═══════════════════════════════════════════════════════════
   AUTH
   ═══════════════════════════════════════════════════════════ */
async function loadUser(){
    if (!sb) return;
    try{
        var s = await sb.auth.getSession();
        currentUser = s && s.data && s.data.session ? s.data.session.user : null;
        if (currentUser){
            if (tabCloud) tabCloud.style.display = 'inline-block';
            await loadCloud();
        }
    }catch(e){}
}

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
function init(){
    renderKingdoms();
    state.counter = parseInt(safeGet('nm_counter', 0), 10) || 0;
    if (counterEl) counterEl.textContent = state.counter;
    renderHistory();
    loadFromURL();
    loadUser();
    unlock();
    console.log('🔤 Марсианское имя v2 VIP готово');
}

if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
})();
</script>
