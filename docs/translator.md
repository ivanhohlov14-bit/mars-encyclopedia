---
title: Марсианский переводчик
---

<style>
:root{--t-k:#6C63FF;--t-k-light:#A29BFE;--t-k-shadow:rgba(108,99,255,.35);--t-accent:#f5d76e;--t-success:#27ae60;--t-error:#e74c3c}
@keyframes tSpin{to{transform:rotate(360deg)}}
@keyframes tFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes tFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes tPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes tShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes tStar{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
@keyframes tRiseUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes tSlideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes tPop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes tGlow{0%,100%{box-shadow:0 0 20px var(--t-k-shadow)}50%{box-shadow:0 0 40px var(--t-k-shadow)}}
@keyframes tToastIn{from{transform:translate(-50%,100px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
@keyframes tToastOut{from{transform:translate(-50%,0);opacity:1}to{transform:translate(-50%,100px);opacity:0}}
.t-fade{animation:tFadeIn .6s cubic-bezier(.16,1,.3,1) both}
#translator-app{max-width:1040px;margin:0 auto;font-family:-apple-system,'Segoe UI',Roboto,sans-serif;padding:0 8px 60px;position:relative;-webkit-tap-highlight-color:transparent}
#translator-app a{text-decoration:none!important;border-bottom:none!important}
#translator-app *{box-sizing:border-box}
.t-hero{position:relative;background:linear-gradient(135deg,#0f0f1e 0%,#1a1a2e 40%,#2d1b3d 70%,#0f3460 100%);border-radius:24px;padding:44px 32px 38px;color:#fff;margin-bottom:20px;overflow:hidden;text-align:center;box-shadow:0 24px 80px -16px rgba(0,0,0,.6),0 0 80px rgba(108,99,255,.15) inset}
.t-hero-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.t-star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;box-shadow:0 0 6px #fff;animation:tStar 3s ease-in-out infinite}
.t-star:nth-child(1){top:12%;left:8%;animation-delay:0s}
.t-star:nth-child(2){top:22%;left:22%;animation-delay:.5s}
.t-star:nth-child(3){top:70%;left:15%;animation-delay:1s}
.t-star:nth-child(4){top:35%;left:78%;animation-delay:1.5s}
.t-star:nth-child(5){top:80%;left:88%;animation-delay:.7s}
.t-star:nth-child(6){top:22%;left:60%;animation-delay:1.2s}
.t-star:nth-child(7){top:55%;left:45%;animation-delay:.3s}
.t-star:nth-child(8){top:45%;left:92%;animation-delay:1.7s}
.t-hero::before{content:'';position:absolute;top:-50%;right:-20%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(162,155,254,.25),transparent 70%);animation:tFloat 10s ease-in-out infinite;pointer-events:none}
.t-hero::after{content:'';position:absolute;bottom:-40%;left:-15%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(243,156,18,.15),transparent 70%);animation:tFloat 12s ease-in-out infinite reverse;pointer-events:none}
.t-hero-content{position:relative;z-index:3;max-width:680px;margin:0 auto}
.t-hero-icon{display:inline-block;font-size:4rem;margin-bottom:12px;animation:tFloat 4s ease-in-out infinite;filter:drop-shadow(0 8px 32px rgba(162,155,254,.7));line-height:1}
.t-hero-title{font-size:2.1rem;font-weight:900;margin:0 0 10px;letter-spacing:-.5px;background:linear-gradient(90deg,#fff 0%,#A29BFE 25%,#fff 50%,#A29BFE 75%,#fff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:tShine 6s linear infinite}
.t-hero-sub{font-size:1rem;opacity:.88;margin:0 0 22px;line-height:1.65}
.t-hero-badges{display:flex;justify-content:center;gap:8px;flex-wrap:wrap}
.t-badge{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:30px;background:rgba(255,255,255,.08);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.18);font-size:.78rem;font-weight:700;color:#fff}
.t-card{position:relative;background:#fff;border-radius:24px;margin-bottom:20px;overflow:hidden;box-shadow:0 24px 60px -16px var(--t-k-shadow),0 0 0 1px rgba(108,99,255,.08);animation:tRiseUp .6s cubic-bezier(.16,1,.3,1) .15s both}
.t-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--t-k),var(--t-k-light),var(--t-accent),var(--t-k));background-size:200% auto;animation:tShine 4s linear infinite;z-index:2}
.t-head{display:flex;align-items:center;gap:12px;padding:20px 24px 16px;background:linear-gradient(135deg,rgba(108,99,255,.05),rgba(162,155,254,.02));border-bottom:1px solid rgba(0,0,0,.05)}
.t-head-icon{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--t-k),var(--t-k-light));color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;box-shadow:0 4px 16px -2px var(--t-k-shadow);animation:tGlow 3s ease-in-out infinite}
.t-head-info{flex:1;min-width:0}
.t-head-title{font-size:1rem;font-weight:900;color:#1a1a2e;margin:0 0 2px}
.t-head-sub{font-size:.78rem;color:#888;font-weight:600}
.t-head-badge{padding:5px 12px;border-radius:12px;background:rgba(39,174,96,.12);color:var(--t-success);font-size:.7rem;font-weight:800;display:inline-flex;align-items:center;gap:4px;flex-shrink:0}
.t-head-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--t-success);box-shadow:0 0 8px var(--t-success);animation:tPulse 2s ease-in-out infinite}
.t-hint{margin:16px 24px 0;padding:14px 18px;background:linear-gradient(135deg,rgba(108,99,255,.08),rgba(162,155,254,.04));border-left:4px solid var(--t-k);border-radius:10px;font-size:.85rem;line-height:1.65;color:#444}
.t-hint strong{color:var(--t-k);font-weight:800}
.t-hint kbd{display:inline-block;padding:2px 8px;background:rgba(108,99,255,.12);border:1px solid rgba(108,99,255,.3);border-radius:5px;font-family:Consolas,monospace;font-size:.72rem;color:var(--t-k);font-weight:700}
.t-input-wrap{position:relative;padding:16px 24px 8px}
.t-lang-tag{position:absolute;top:22px;left:36px;padding:3px 10px;border-radius:12px;font-size:.65rem;font-weight:800;letter-spacing:.5px;background:rgba(108,99,255,.12);color:var(--t-k);display:inline-flex;align-items:center;gap:4px;pointer-events:none;z-index:2}
.t-lang-tag.detected-en{background:rgba(52,152,219,.15);color:#2980b9}
.t-lang-tag.detected-ru{background:rgba(231,76,60,.15);color:#c0392b}
#t-input{width:100%;height:140px;padding:34px 18px 14px;border:2px solid #e8eaf0;border-radius:14px;font-size:1rem;font-family:inherit;resize:vertical;outline:none;background:#f8f9fb;color:#1a1a2e;transition:border-color .25s,box-shadow .25s,background .25s;line-height:1.55}
#t-input::placeholder{color:#a0a4b0}
#t-input:focus{border-color:var(--t-k);background:#fff;box-shadow:0 0 0 4px rgba(108,99,255,.12)}
.t-input-meta{display:flex;justify-content:space-between;align-items:center;padding:6px 4px 0;font-size:.72rem;color:#999;font-weight:600}
.t-input-meta .t-counter.warn{color:#e67e22}
.t-input-meta .t-counter.danger{color:#e74c3c}
.t-buttons{padding:12px 24px 20px;display:flex;gap:10px;flex-wrap:wrap}
.t-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 24px;border-radius:14px;border:none;font-size:.92rem;font-weight:800;cursor:pointer;font-family:inherit;transition:all .25s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden}
.t-btn.primary{flex:1;min-width:180px;background:linear-gradient(135deg,var(--t-k),var(--t-k-light));color:#fff;box-shadow:0 12px 32px -6px var(--t-k-shadow)}
.t-btn.primary::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:translateX(-100%);transition:transform .6s}
.t-btn.primary:hover{transform:translateY(-2px);box-shadow:0 16px 40px -6px var(--t-k-shadow)}
.t-btn.primary:hover::before{transform:translateX(100%)}
.t-btn.secondary{background:rgba(0,0,0,.05);color:#666}
.t-btn.secondary:hover{background:rgba(0,0,0,.08);color:#333}
.t-btn.accent{background:linear-gradient(135deg,#e67e22,#f39c12);color:#fff;box-shadow:0 8px 20px -4px rgba(230,126,34,.4)}
.t-btn:disabled{opacity:.6;cursor:wait}
.t-spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:tSpin .6s linear infinite;display:none}
.t-btn.loading .t-spinner{display:inline-block}
.t-btn.loading .t-icon{display:none}
.t-output{padding:0 24px 24px}
.t-output-block{margin-bottom:16px}
.t-output-label{font-size:.72rem;color:#888;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.t-output-label::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(108,99,255,.3),transparent)}
.t-result{padding:20px 24px;background:linear-gradient(135deg,#1a1a2e 0%,#0f0f1e 100%);color:#fff;border-radius:14px;border-left:5px solid var(--t-k);font-size:1.15rem;line-height:1.7;font-weight:600;letter-spacing:.3px;min-height:60px;word-wrap:break-word;overflow-wrap:anywhere;position:relative;box-shadow:0 8px 24px -4px rgba(0,0,0,.25);animation:tPop .4s cubic-bezier(.16,1,.3,1)}
.t-result:empty::before,.t-result.placeholder{content:'Здесь появится перевод...';color:rgba(255,255,255,.35);font-style:italic;font-weight:500}
.t-result .t-trans-hint{display:block;font-size:.72rem;color:rgba(162,155,254,.7);margin-top:8px;font-weight:600;font-style:italic}
.t-gloss{margin-top:10px;padding:12px 16px;background:rgba(108,99,255,.05);border-left:3px solid var(--t-k-light);border-radius:8px;font-size:.82rem;color:#555;line-height:1.55;font-style:italic;word-break:break-word}
.t-gloss .t-gloss-tag{display:inline-block;padding:2px 8px;background:rgba(108,99,255,.12);color:var(--t-k);border-radius:6px;font-size:.7rem;font-weight:800;font-style:normal;margin-right:4px}
.t-gloss .t-gloss-en{color:#2980b9;font-weight:700;font-style:normal}
.t-result-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.t-mini-btn{display:inline-flex;align-items:center;gap:5px;padding:8px 14px;border-radius:20px;background:#fff;border:2px solid rgba(108,99,255,.15);color:var(--t-k);font-size:.78rem;font-weight:800;cursor:pointer;font-family:inherit;transition:all .2s}
.t-mini-btn:hover{background:rgba(108,99,255,.06);border-color:var(--t-k);transform:translateY(-1px)}
.t-mini-btn.copied{background:linear-gradient(135deg,var(--t-success),#16a085);color:#fff;border-color:var(--t-success)}
.t-history{padding:20px 24px 24px;background:linear-gradient(135deg,rgba(108,99,255,.03),transparent);border-top:1px solid rgba(0,0,0,.05)}
.t-history-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.t-history-title{font-size:.85rem;font-weight:900;color:#1a1a2e;display:flex;align-items:center;gap:8px;text-transform:uppercase;letter-spacing:.5px}
.t-history-clear{background:transparent;border:none;color:#999;font-size:.72rem;font-weight:700;cursor:pointer;font-family:inherit;text-decoration:underline;padding:4px 8px}
.t-history-clear:hover{color:var(--t-error)}
.t-history-list{display:grid;gap:8px}
.t-history-item{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;background:#fff;border:1px solid rgba(0,0,0,.05);border-radius:12px;cursor:pointer;transition:all .25s cubic-bezier(.16,1,.3,1);animation:tSlideIn .35s ease both}
.t-history-item:hover{transform:translateX(4px);border-color:var(--t-k);box-shadow:0 8px 20px -6px var(--t-k-shadow)}
.t-history-icon{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--t-k),var(--t-k-light));color:#fff;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0}
.t-history-info{flex:1;min-width:0}
.t-history-ru{font-size:.82rem;color:#555;font-weight:700;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.t-history-mars{font-size:.88rem;color:var(--t-k);font-weight:800;font-family:Georgia,serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.t-history-time{font-size:.65rem;color:#bbb;font-weight:700;flex-shrink:0;padding-top:2px}
.t-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);padding:12px 26px;border-radius:30px;color:#fff;font-weight:800;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:2147483647;pointer-events:none;max-width:90vw;text-align:center;opacity:0}
.t-toast.show{animation:tToastIn .4s cubic-bezier(.16,1,.3,1) forwards;opacity:1}
.t-toast.hide{animation:tToastOut .3s ease forwards}
.t-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.t-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.t-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}
@media (prefers-color-scheme: dark){
  html body.mars-stars-on #translator-app .t-card{background:rgba(20,20,42,.95);color:#e0e0f0}
  html body.mars-stars-on #translator-app .t-head{background:linear-gradient(135deg,rgba(108,99,255,.12),rgba(162,155,254,.06));border-bottom-color:rgba(108,99,255,.2)}
  html body.mars-stars-on #translator-app .t-head-title{color:#e0e0f0}
  html body.mars-stars-on #translator-app .t-hint{background:rgba(108,99,255,.1);color:#c0c0d0}
  html body.mars-stars-on #translator-app #t-input{background:#252550;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
  html body.mars-stars-on #translator-app .t-btn.secondary{background:rgba(255,255,255,.08);color:#ccc}
  html body.mars-stars-on #translator-app .t-history-item{background:rgba(255,255,255,.04)}
  html body.mars-stars-on #translator-app .t-history-title{color:#e0e0f0}
  html body.mars-stars-on #translator-app .t-gloss{background:rgba(108,99,255,.12);color:#b0b0c0}
  html body.mars-stars-on #translator-app .t-mini-btn{background:rgba(255,255,255,.06);border-color:rgba(108,99,255,.3)}
}
@media (max-width:640px){
  .t-hero{padding:32px 20px 28px;border-radius:18px}
  .t-hero-title{font-size:1.5rem}
  .t-hero-icon{font-size:3rem}
  .t-hero-sub{font-size:.9rem}
  .t-badge{padding:6px 11px;font-size:.7rem}
  .t-card{border-radius:18px}
  .t-head{padding:14px 18px 12px}
  .t-head-icon{width:36px;height:36px;font-size:1rem}
  .t-head-title{font-size:.92rem}
  .t-head-badge{font-size:.62rem;padding:4px 8px}
  .t-hint{margin:12px 18px 0;padding:12px 14px;font-size:.78rem}
  .t-input-wrap{padding:12px 18px 6px}
  .t-lang-tag{top:18px;left:28px}
  #t-input{height:120px;padding:30px 14px 12px;font-size:.92rem}
  .t-buttons{padding:10px 18px 16px;gap:8px}
  .t-btn{padding:12px 18px;font-size:.85rem}
  .t-output{padding:0 18px 18px}
  .t-result{padding:16px 18px;font-size:1rem}
  .t-history{padding:16px 18px}
  .t-history-time{display:none}
}
@media (prefers-reduced-motion: reduce){
  #translator-app *,#translator-app *::before,#translator-app *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}
</style>

<div id="translator-app">
  <div class="t-hero t-fade">
    <div class="t-hero-stars">
      <div class="t-star"></div><div class="t-star"></div><div class="t-star"></div>
      <div class="t-star"></div><div class="t-star"></div><div class="t-star"></div>
      <div class="t-star"></div><div class="t-star"></div>
    </div>
    <div class="t-hero-content">
      <div class="t-hero-icon">🪐</div>
      <h1 class="t-hero-title">Марсианский переводчик</h1>
      <p class="t-hero-sub">Введи текст на русском или английском — получи перевод на древний язык Марса.</p>
      <div class="t-hero-badges">
        <span class="t-badge">🇷🇺 Русский</span>
        <span class="t-badge">🇬🇧 English</span>
        <span class="t-badge">🪐 Mars</span>
        <span class="t-badge">🔮 Иероглифы</span>
      </div>
    </div>
  </div>

  <div class="t-card">
    <div class="t-head">
      <div class="t-head-icon">✍️</div>
      <div class="t-head-info">
        <div class="t-head-title">Перевод</div>
        <div class="t-head-sub">RU или EN → Марсианский</div>
      </div>
      <div class="t-head-badge">Онлайн</div>
    </div>
    <div class="t-hint">
      <strong>Как пользоваться:</strong> Введите текст — переводчик найдёт слова в словаре или сгенерирует новые. <kbd>Ctrl</kbd>+<kbd>Enter</kbd> — быстрый перевод. Поддерживаются падежи, времена, отрицание, вопросы, модальность. <strong>English</strong> переводится в 2 шага: EN → RU → Mars.
    </div>
    <div class="t-input-wrap">
      <span class="t-lang-tag" id="t-lang-tag">🌐 RU / EN</span>
      <textarea id="t-input" placeholder="Например: Я разговариваю на лучшем языке. / I speak the best language." spellcheck="false"></textarea>
      <div class="t-input-meta">
        <span id="t-counter" class="t-counter">0 / 500 символов</span>
        <span id="t-word-count">0 слов</span>
      </div>
    </div>
    <div class="t-buttons">
      <button class="t-btn primary" id="t-translate-btn"><span class="t-spinner"></span><span class="t-icon">🔄</span><span>Перевести</span></button>
      <button class="t-btn secondary" id="t-clear-btn">🗑 Очистить</button>
      <button class="t-btn accent" id="t-glyph-btn">🔮 Иероглифы</button>
    </div>
    <div class="t-output">
      <div class="t-output-block">
        <div class="t-output-label">📖 Перевод</div>
        <div class="t-result placeholder" id="t-result">Здесь появится перевод...</div>
        <div class="t-result-actions" id="t-actions" style="display:none">
          <button class="t-mini-btn" id="t-copy">📋 Копировать</button>
          <button class="t-mini-btn" id="t-copy-glyphs">🔮 Иероглифы</button>
          <button class="t-mini-btn" id="t-share">🔗 Поделиться</button>
          <button class="t-mini-btn" id="t-more">🔄 Ещё</button>
        </div>
      </div>
      <div class="t-output-block" id="t-gloss-block" style="display:none">
        <div class="t-output-label">🔍 Разбор</div>
        <div class="t-gloss" id="t-gloss"></div>
      </div>
    </div>
    <div class="t-history" id="t-history" style="display:none">
      <div class="t-history-head">
        <div class="t-history-title">📚 История переводов</div>
        <button class="t-history-clear" id="t-history-clear">Очистить</button>
      </div>
      <div class="t-history-list" id="t-history-list"></div>
    </div>
  </div>
</div>

<div class="t-toast" id="t-toast"></div>

<script>
(function(){
'use strict';
if (window.__tLoaded) return;
window.__tLoaded = true;

var STORAGE_KEY = 't_history_v4';
var MAX_HISTORY = 15;

/* ═══ ПОЛНЫЙ СЛОВАРЬ (твой оригинал) ═══ */
var LEXICON_DATA = {
"я":{root:"an",pos:"pron"},"меня":{root:"an",pos:"pron"},"мне":{root:"an",pos:"pron"},"мой":{root:"an",pos:"pron"},"моя":{root:"an",pos:"pron"},"моё":{root:"an",pos:"pron"},"мои":{root:"an",pos:"pron"},
"ты":{root:"ta",pos:"pron"},"тебя":{root:"ta",pos:"pron"},"тебе":{root:"ta",pos:"pron"},"твой":{root:"ta",pos:"pron"},"твоя":{root:"ta",pos:"pron"},"твоё":{root:"ta",pos:"pron"},"твои":{root:"ta",pos:"pron"},
"он":{root:"la",pos:"pron"},"она":{root:"la",pos:"pron"},"оно":{root:"la",pos:"pron"},"его":{root:"la",pos:"pron"},"ей":{root:"la",pos:"pron"},"им":{root:"la",pos:"pron"},"её":{root:"la",pos:"pron"},"их":{root:"lanān",pos:"pron"},
"мы":{root:"anān",pos:"pron"},"нас":{root:"anān",pos:"pron"},"нам":{root:"anān",pos:"pron"},"нами":{root:"anān",pos:"pron"},"вы":{root:"tanān",pos:"pron"},"вас":{root:"tanān",pos:"pron"},"вам":{root:"tanān",pos:"pron"},"вами":{root:"tanān",pos:"pron"},"они":{root:"lanān",pos:"pron"},
"вода":{root:"ākha",pos:"noun"},"воды":{root:"ākha",pos:"noun"},"воде":{root:"ākha",pos:"noun"},"воду":{root:"ākha",pos:"noun"},"водой":{root:"ākha",pos:"noun"},"вод":{root:"ākha",pos:"noun"},
"звезда":{root:"dzen",pos:"noun"},"звезды":{root:"dzen",pos:"noun"},"звезде":{root:"dzen",pos:"noun"},"звезду":{root:"dzen",pos:"noun"},"звездой":{root:"dzen",pos:"noun"},"звёзды":{root:"dzen",pos:"noun"},"звёзд":{root:"dzen",pos:"noun"},"звезд":{root:"dzen",pos:"noun"},
"земля":{root:"kōl",pos:"noun"},"земли":{root:"kōl",pos:"noun"},"земле":{root:"kōl",pos:"noun"},"землю":{root:"kōl",pos:"noun"},"землёй":{root:"kōl",pos:"noun"},"земель":{root:"kōl",pos:"noun"},
"река":{root:"khan",pos:"noun"},"реки":{root:"khan",pos:"noun"},"реке":{root:"khan",pos:"noun"},"реку":{root:"khan",pos:"noun"},"рекой":{root:"khan",pos:"noun"},"рек":{root:"khan",pos:"noun"},
"огонь":{root:"khō",pos:"noun"},"огня":{root:"khō",pos:"noun"},"огню":{root:"khō",pos:"noun"},"огнём":{root:"khō",pos:"noun"},"огни":{root:"khō",pos:"noun"},
"жизнь":{root:"mar",pos:"noun"},"жизни":{root:"mar",pos:"noun"},"жизнью":{root:"mar",pos:"noun"},
"смерть":{root:"mōr",pos:"noun"},"смерти":{root:"mōr",pos:"noun"},"смертью":{root:"mōr",pos:"noun"},
"память":{root:"lān",pos:"noun"},"памяти":{root:"lān",pos:"noun"},"памятью":{root:"lān",pos:"noun"},
"дом":{root:"okh",pos:"noun"},"дома":{root:"okh",pos:"noun"},"дому":{root:"okh",pos:"noun"},"домом":{root:"okh",pos:"noun"},"доме":{root:"okh",pos:"noun"},"домов":{root:"okh",pos:"noun"},
"король":{root:"rōg",pos:"noun"},"короля":{root:"rōg",pos:"noun"},"королю":{root:"rōg",pos:"noun"},"королём":{root:"rōg",pos:"noun"},"короли":{root:"rōg",pos:"noun"},
"место":{root:"sen",pos:"noun"},"места":{root:"sen",pos:"noun"},"мест":{root:"sen",pos:"noun"},
"человек":{root:"mārīn",pos:"noun"},"человека":{root:"mārīn",pos:"noun"},"человеку":{root:"mārīn",pos:"noun"},"человеком":{root:"mārīn",pos:"noun"},"человеке":{root:"mārīn",pos:"noun"},
"люди":{root:"mārīnān",pos:"noun"},"людей":{root:"mārīnān",pos:"noun"},
"марсиане":{root:"marzān",pos:"noun"},"марсиан":{root:"marzān",pos:"noun"},"марсианин":{root:"marzān",pos:"noun"},"марсианина":{root:"marzān",pos:"noun"},"марсианину":{root:"marzān",pos:"noun"},
"стол":{root:"xar",pos:"noun"},"стола":{root:"xar",pos:"noun"},"столу":{root:"xar",pos:"noun"},"столом":{root:"xar",pos:"noun"},"столы":{root:"xar",pos:"noun"},
"стул":{root:"xarshū",pos:"noun"},"стула":{root:"xarshū",pos:"noun"},"стульев":{root:"xarshū",pos:"noun"},"стулья":{root:"xarshū",pos:"noun"},
"кровать":{root:"marlā",pos:"noun"},"кровати":{root:"marlā",pos:"noun"},"хлеб":{root:"marthō",pos:"noun"},"хлеба":{root:"marthō",pos:"noun"},
"суп":{root:"dzenkhō",pos:"noun"},"супа":{root:"dzenkhō",pos:"noun"},"мясо":{root:"xarōk",pos:"noun"},"мяса":{root:"xarōk",pos:"noun"},
"гора":{root:"dūr",pos:"noun"},"горы":{root:"dūr",pos:"noun"},"гор":{root:"dūr",pos:"noun"},"лес":{root:"xōl",pos:"noun"},"леса":{root:"xōl",pos:"noun"},"лесов":{root:"xōl",pos:"noun"},
"поле":{root:"thalōk",pos:"noun"},"поля":{root:"thalōk",pos:"noun"},"дождь":{root:"ākhadzen",pos:"noun"},"дождя":{root:"ākhadzen",pos:"noun"},
"рубеж":{root:"rak",pos:"noun"},"граница":{root:"rak",pos:"noun"},"буря":{root:"zalkhō",pos:"noun"},"бури":{root:"zalkhō",pos:"noun"},
"радость":{root:"thalmar",pos:"noun"},"радости":{root:"thalmar",pos:"noun"},"печаль":{root:"mōrmar",pos:"noun"},"печали":{root:"mōrmar",pos:"noun"},
"любовь":{root:"lānmar",pos:"noun"},"любви":{root:"lānmar",pos:"noun"},"страх":{root:"ghōlmar",pos:"noun"},"страха":{root:"ghōlmar",pos:"noun"},
"гнев":{root:"khanmar",pos:"noun"},"гнева":{root:"khanmar",pos:"noun"},"точка":{root:"tokha",pos:"noun"},"точки":{root:"tokha",pos:"noun"},"точке":{root:"tokha",pos:"noun"},
"желание":{root:"nūrmar",pos:"noun"},"желания":{root:"nūrmar",pos:"noun"},"работа":{root:"xurmarān",pos:"noun"},"работы":{root:"xurmarān",pos:"noun"},
"ночь":{root:"nōkh",pos:"noun"},"ночи":{root:"nōkh",pos:"noun"},"день":{root:"sōl",pos:"noun"},"дня":{root:"sōl",pos:"noun"},"дни":{root:"sōl",pos:"noun"},
"зверь":{root:"khōr",pos:"noun"},"зверя":{root:"khōr",pos:"noun"},"звери":{root:"khōr",pos:"noun"},"рыба":{root:"ākhakhōr",pos:"noun"},"рыбы":{root:"ākhakhōr",pos:"noun"},
"птица":{root:"zalakhōr",pos:"noun"},"птицы":{root:"zalakhōr",pos:"noun"},"камень":{root:"ghar",pos:"noun"},"камня":{root:"ghar",pos:"noun"},"камни":{root:"ghar",pos:"noun"},
"тень":{root:"ghōl",pos:"noun"},"тени":{root:"ghōl",pos:"noun"},"родина":{root:"ariya",pos:"noun"},"свет":{root:"dzēn",pos:"noun"},
"знание":{root:"tsan",pos:"noun"},"знания":{root:"tsan",pos:"noun"},"гибель":{root:"mōrkhō",pos:"noun"},"кухня":{root:"ōkhsen",pos:"noun"},
"дверь":{root:"tōkh",pos:"noun"},"двери":{root:"tōkh",pos:"noun"},"порог":{root:"tōkhsen",pos:"noun"},"стена":{root:"gharōkh",pos:"noun"},"стены":{root:"gharōkh",pos:"noun"},
"север":{root:"khūr",pos:"noun"},"ткань":{root:"thōl",pos:"noun"},"одежда":{root:"thōlīn",pos:"noun"},"шерсть":{root:"kharm",pos:"noun"},
"плащ":{root:"kharmīn",pos:"noun"},"пояс":{root:"sūk",pos:"noun"},"предки":{root:"xalmar",pos:"noun"},
"год":{root:"amār",pos:"noun"},"года":{root:"amār",pos:"noun"},"лет":{root:"amār",pos:"noun"},
"солнце":{root:"khō",pos:"noun"},"обсерватория":{root:"dzensen",pos:"noun"},"вулкан":{root:"khōsen",pos:"noun"},
"крепость":{root:"gharokh",pos:"noun"},"окхасен":{root:"Okhasen",pos:"noun"},"ксанф":{root:"Ksanf",pos:"noun"},
"город":{root:"okh",pos:"noun"},"города":{root:"okh",pos:"noun"},"побережье":{root:"ākhasen",pos:"noun"},
"пустыня":{root:"xalkōl",pos:"noun"},"пустыни":{root:"xalkōl",pos:"noun"},"музыка":{root:"sōlmar",pos:"noun"},
"струна":{root:"thōl",pos:"noun"},"струны":{root:"thōl",pos:"noun"},"металл":{root:"khōs",pos:"noun"},"металла":{root:"khōs",pos:"noun"},
"порт":{root:"sen",pos:"noun"},"глина":{root:"sur",pos:"noun"},"глины":{root:"sur",pos:"noun"},"глине":{root:"sur",pos:"noun"},"глину":{root:"sur",pos:"noun"},
"табличка":{root:"lān",pos:"noun"},"таблички":{root:"lān",pos:"noun"},"храм":{root:"sen",pos:"noun"},"храма":{root:"sen",pos:"noun"},
"историк":{root:"xalur",pos:"noun"},"писец":{root:"khalur",pos:"noun"},"хранитель":{root:"lānīn",pos:"noun"},
"архив":{root:"lānsen",pos:"noun"},"история":{root:"lānkhō",pos:"noun"},"истории":{root:"lānkhō",pos:"noun"},
"география":{root:"kōlkhō",pos:"noun"},"культура":{root:"xalmar",pos:"noun"},"народ":{root:"mārīn",pos:"noun"},"народы":{root:"mārīnān",pos:"noun"},
"персонаж":{root:"mārīn",pos:"noun"},"событие":{root:"thal",pos:"noun"},"артефакт":{root:"gharokh",pos:"noun"},
"страж":{root:"strah",pos:"noun"},"книга":{root:"kitab",pos:"noun"},"книги":{root:"kitab",pos:"noun"},
"телескоп":{root:"dzenur",pos:"noun"},"имя":{root:"nām",pos:"noun"},"имена":{root:"nām",pos:"noun"},
"вселенная":{root:"dzenlān",pos:"noun"},"письмо":{root:"khalur",pos:"noun"},"пыль":{root:"sur",pos:"noun"},
"энциклопедия":{root:"tsankhō",pos:"noun"},"ресурс":{root:"lān",pos:"noun"},"цикл":{root:"amār",pos:"noun"},
"роман":{root:"thal",pos:"noun"},"автор":{root:"khalur",pos:"noun"},"наука":{root:"tsankhō",pos:"noun"},
"исследование":{root:"xur",pos:"noun"},"высота":{root:"dzenur",pos:"noun"},"низина":{root:"kōlur",pos:"noun"},
"грусть":{root:"mōrmar",pos:"noun"},"помощь":{root:"lānīn",pos:"noun"},"покой":{root:"nōkh",pos:"noun"},"убежище":{root:"ānsen",pos:"noun"},
"акха-дзен":{root:"Ākha-dzen",pos:"noun"},"кол-хан":{root:"Kōl-khan",pos:"noun"},"дзен-акха":{root:"Dzen-ākha",pos:"noun"},
"хосен":{root:"Khōsen",pos:"noun"},"мар-дзен":{root:"Mar-dzen",pos:"noun"},"ария-мар":{root:"Ariya-mar",pos:"noun"},
"зал-акха":{root:"Zal-ākha",pos:"noun"},"тал-хо":{root:"Thal-khō",pos:"noun"},"кол-гар":{root:"Kōl-ghar",pos:"noun"},
"мор-акха":{root:"Mōr-ākha",pos:"noun"},"дзен-кол":{root:"Dzen-kōl",pos:"noun"},"хал-мар":{root:"Xal-mar",pos:"noun"},
"лан-сен":{root:"Lān-sen",pos:"noun"},"хо-мор":{root:"Khō-mōr",pos:"noun"},"акха-мор":{root:"Ākha-mōr",pos:"noun"},
"кол-суф":{root:"Kōl-suf",pos:"noun"},"дзен-тал":{root:"Dzen-thal",pos:"noun"},"гол-акха":{root:"Ghōl-ākha",pos:"noun"},
"рог-ари":{root:"Rōg-ari",pos:"noun"},"мар-лан":{root:"Mar-lān",pos:"noun"},"ксанф-суф":{root:"Ksanf-suf",pos:"noun"},"яр-ох":{root:"Yar-okh",pos:"noun"},
"мало":{root:"hōr",pos:"adv"},"малый":{root:"hōr",pos:"adj"},"маленький":{root:"hōr",pos:"adj"},"маленькая":{root:"hōr",pos:"adj"},"маленькое":{root:"hōr",pos:"adj"},"маленькие":{root:"hōr",pos:"adj"},
"конец":{root:"rak",pos:"noun"},"конца":{root:"rak",pos:"noun"},"конечный":{root:"rak",pos:"adj"},
"который":{root:"ku",pos:"pron"},"которого":{root:"ku",pos:"pron"},"которому":{root:"ku",pos:"pron"},"которым":{root:"ku",pos:"pron"},"которой":{root:"ku",pos:"pron"},
"умирающий":{root:"mōr",pos:"adj"},"умирающая":{root:"mōr",pos:"adj"},
"Деймос":{root:"Deimos",pos:"noun"},"Марса":{root:"Mars",pos:"noun"},"Марсу":{root:"Mars",pos:"noun"},
"Фобос":{root:"Phobos",pos:"noun"},"Фобоса":{root:"Phobos",pos:"noun"},
"является":{root:"sen",pos:"verb"},"одним":{root:"on",pos:"num"},"одной":{root:"on",pos:"num"},"одно":{root:"on",pos:"num"},"самых":{root:"suf",pos:"adv"},
"спутник":{root:"dzenkhōr",pos:"noun"},"спутники":{root:"dzenkhōr",pos:"noun"},"Солнечной":{root:"sufdzen",pos:"noun"},
"системе":{root:"sen",pos:"noun"},"Среднее":{root:"mar",pos:"adj"},"расстояние":{root:"nurrak",pos:"noun"},
"составляет":{root:"sen",pos:"verb"},
"марсианский":{root:"marzān",pos:"adj"},"марсианская":{root:"marzān",pos:"adj"},"марсианские":{root:"marzān",pos:"adj"},
"марсианской":{root:"marzān",pos:"adj"},"марсианского":{root:"marzān",pos:"adj"},"марсианским":{root:"marzān",pos:"adj"},
"марсианскому":{root:"marzān",pos:"adj"},"марсианском":{root:"marzān",pos:"adj"},"марсианскую":{root:"marzān",pos:"adj"},
"марсианскими":{root:"marzān",pos:"adj"},"марсианских":{root:"marzān",pos:"adj"},
"занимал":{root:"okhsen",pos:"verb"},"особое":{root:"on",pos:"adj"},"движение":{root:"nur",pos:"noun"},
"пройти":{root:"nur",pos:"verb"},"проходить":{root:"nur",pos:"verb"},"прошёл":{root:"nur",pos:"verb"},"прошла":{root:"nur",pos:"verb"},
"библиотека":{root:"lan-sen",pos:"noun"},"библиотеки":{root:"lan-sen",pos:"noun"},
"восток":{root:"dzenur",pos:"noun"},"востоке":{root:"dzenur",pos:"noun"},"заход":{root:"khōmōr",pos:"noun"},
"стрела":{root:"stralk",pos:"noun"},"стрелы":{root:"stralk",pos:"noun"},"взгляд":{root:"thal",pos:"noun"},"взгляды":{root:"thal",pos:"noun"},
"длящееся":{root:"nur",pos:"verb"},"двух":{root:"dōn",pos:"num"},"суток":{root:"sōl",pos:"noun"},
"породило":{root:"khalur",pos:"verb"},"считался":{root:"thal",pos:"verb"},"символ":{root:"dzen",pos:"noun"},"символом":{root:"dzen",pos:"noun"},
"терпения":{root:"nōkh",pos:"noun"},"отличие":{root:"kan",pos:"conj"},
"стремительного":{root:"nurkhō",pos:"adj"},"разрушительного":{root:"mōrkhō",pos:"adj"},
"Астрономы":{root:"dzenthalsen",pos:"noun"},"использовали":{root:"xur",pos:"verb"},
"календарных":{root:"sōlamār",pos:"adj"},"расчётов":{root:"tsan",pos:"noun"},"связывали":{root:"thal",pos:"verb"},
"богиня":{root:"Akha",pos:"noun"},"богиней":{root:"Akha",pos:"noun"},"кратер":{root:"kolters",pos:"noun"},"кратеры":{root:"kolters",pos:"noun"},
"Стикни":{root:"Stickney",pos:"noun"},"серебряный":{root:"kug-babbar",pos:"adj"},
"танец":{root:"thalur",pos:"noun"},"танца":{root:"thalur",pos:"noun"},"танцы":{root:"thalur",pos:"noun"},
"танцевать":{root:"thalur",pos:"verb"},"танцую":{root:"thalur",pos:"verb"},"танцует":{root:"thalur",pos:"verb"},"танцуют":{root:"thalur",pos:"verb"},"плясать":{root:"thalur",pos:"verb"},
"основание":{root:"othal",pos:"noun"},"основал":{root:"othal",pos:"verb"},"основала":{root:"othal",pos:"verb"},
"основали":{root:"othal",pos:"verb"},"основать":{root:"othal",pos:"verb"},"основатель":{root:"othaln",pos:"noun"},"основа":{root:"othaln",pos:"noun"},
"рассвет":{root:"khonur",pos:"noun"},"расцвет":{root:"khonur",pos:"noun"},"процветание":{root:"khonuri",pos:"noun"},
"начало":{root:"khān",pos:"noun"},"начала":{root:"khān",pos:"noun"},"начал":{root:"khān",pos:"verb"},
"много":{root:"sūr",pos:"adv"},"множество":{root:"sūr",pos:"noun"},"огромный":{root:"sūrhōr",pos:"adj"},"огромная":{root:"sūrhōr",pos:"adj"},
"застывшая":{root:"okhasing",pos:"adj"},"быстрее":{root:"bystr",pos:"adv"},
"ждёт":{root:"zhal",pos:"verb"},"ждать":{root:"zhal",pos:"verb"},"оставляя":{root:"ānxur",pos:"verb"},"собой":{root:"an",pos:"pron"},
"слёз":{root:"ākhas",pos:"noun"},"бесконечный":{root:"ānrak",pos:"adj"},"водный":{root:"ākha",pos:"adj"},
"водяной":{root:"ākha",pos:"adj"},"возвращение":{root:"thalān",pos:"noun"},
"красный":{root:"khōn",pos:"adj"},"красная":{root:"khōn",pos:"adj"},"красное":{root:"khōn",pos:"adj"},
"синий":{root:"ākhan",pos:"adj"},"голубой":{root:"ākhān",pos:"adj"},"зелёный":{root:"marn",pos:"adj"},
"жёлтый":{root:"dzenk",pos:"adj"},"белый":{root:"lānk",pos:"adj"},"чёрный":{root:"kōln",pos:"adj"},
"фиолетовый":{root:"xaln",pos:"adj"},"оранжевый":{root:"khōsenk",pos:"adj"},"розовый":{root:"sōln",pos:"adj"},
"коричневый":{root:"gharn",pos:"adj"},"серый":{root:"xalkōln",pos:"adj"},
"один":{root:"on",pos:"num"},"одна":{root:"on",pos:"num"},"два":{root:"dōn",pos:"num"},"две":{root:"dōn",pos:"num"},
"три":{root:"tren",pos:"num"},"четыре":{root:"khen",pos:"num"},"пять":{root:"phin",pos:"num"},
"шесть":{root:"kōl-dzen",pos:"num"},"семь":{root:"thōl",pos:"num"},"восемь":{root:"ākha-thōl",pos:"num"},
"девять":{root:"khan-thōl",pos:"num"},"десять":{root:"dzen-on",pos:"num"},"двадцать":{root:"dzen-dōn",pos:"num"},"сто":{root:"dzen-phin",pos:"num"},
"правда":{root:"thaltsan",pos:"noun"},"ложь":{root:"ānthaltsan",pos:"noun"},"надежда":{root:"lānthōl",pos:"noun"},
"вера":{root:"khalmar",pos:"noun"},"свобода":{root:"nurariya",pos:"noun"},"справедливость":{root:"aritsan",pos:"noun"},
"деревня":{root:"hōrokh",pos:"noun"},"мир":{root:"nōkh",pos:"noun"},"война":{root:"mōrkhō",pos:"noun"},"трон":{root:"rogen",pos:"noun"},
"движется":{root:"nur",pos:"verb"},"двигаться":{root:"nur",pos:"verb"},"как":{root:"khas",pos:"conj"},
"кто":{root:"ku",pos:"pron"},"что":{root:"sha",pos:"pron"},"иллюзия":{root:"lānthal",pos:"noun"},
"избранный":{root:"ari",pos:"adj"},"великий":{root:"suf",pos:"adj"},"великая":{root:"suf",pos:"adj"},"великое":{root:"suf",pos:"adj"},
"древний":{root:"xal",pos:"adj"},"древняя":{root:"xal",pos:"adj"},"мудрый":{root:"yar",pos:"adj"},
"новый":{root:"khal",pos:"adj"},"новая":{root:"khal",pos:"adj"},"новое":{root:"khal",pos:"adj"},"новые":{root:"khal",pos:"adj"},
"старый":{root:"xal",pos:"adj"},"старая":{root:"xal",pos:"adj"},"живой":{root:"mar",pos:"adj"},"жива":{root:"mar",pos:"adj"},
"красивый":{root:"suf",pos:"adj"},"прекрасный":{root:"suf",pos:"adj"},"металлический":{root:"khōsīn",pos:"adj"},
"подземный":{root:"kōl",pos:"adj"},"главный":{root:"ari",pos:"adj"},"плодородный":{root:"mar",pos:"adj"},
"независимый":{root:"ari",pos:"adj"},"справочный":{root:"tsan",pos:"adj"},"огненный":{root:"khō",pos:"adj"},
"звёздный":{root:"dzen",pos:"adj"},"звёздная":{root:"dzen",pos:"adj"},"звёздное":{root:"dzen",pos:"adj"},
"голубокровный":{root:"ākhazān",pos:"adj"},"шестипалый":{root:"khōrap",pos:"adj"},"чуждый":{root:"kōld",pos:"adj"},
"земной":{root:"kōl",pos:"adj"},"суровый":{root:"khōsen",pos:"adj"},"священный":{root:"lānīn",pos:"adj"},
"добрый":{root:"suf",pos:"adj"},"яркий":{root:"dzēn",pos:"adj"},"жаркий":{root:"khō",pos:"adj"},"мёртвый":{root:"mōr",pos:"adj"},
"смотреть":{root:"thal",pos:"verb"},"смотрю":{root:"thal",pos:"verb"},"смотрит":{root:"thal",pos:"verb"},"смотрят":{root:"thal",pos:"verb"},"смотрел":{root:"thal",pos:"verb"},
"помнить":{root:"lān",pos:"verb"},"помню":{root:"lān",pos:"verb"},"помнит":{root:"lān",pos:"verb"},"помнят":{root:"lān",pos:"verb"},"помнил":{root:"lān",pos:"verb"},
"знать":{root:"tsan",pos:"verb"},"знаю":{root:"tsan",pos:"verb"},"знает":{root:"tsan",pos:"verb"},"знают":{root:"tsan",pos:"verb"},"знал":{root:"tsan",pos:"verb"},
"умирать":{root:"mōr",pos:"verb"},"умирает":{root:"mōr",pos:"verb"},"умирают":{root:"mōr",pos:"verb"},"умирал":{root:"mōr",pos:"verb"},
"жить":{root:"marlān",pos:"verb"},"живу":{root:"marlān",pos:"verb"},"живёт":{root:"marlān",pos:"verb"},"живут":{root:"marlān",pos:"verb"},"жил":{root:"marlān",pos:"verb"},"выжить":{root:"marlān",pos:"verb"},
"пить":{root:"khōr",pos:"verb"},"пьёт":{root:"khōr",pos:"verb"},"пьют":{root:"khōr",pos:"verb"},
"играть":{root:"thalur",pos:"verb"},"играет":{root:"thalur",pos:"verb"},"играют":{root:"thalur",pos:"verb"},
"летать":{root:"zalur",pos:"verb"},"летает":{root:"zalur",pos:"verb"},"летают":{root:"zalur",pos:"verb"},"полететь":{root:"zalur",pos:"verb"},
"говорить":{root:"thalthu",pos:"verb"},"говорит":{root:"thalthu",pos:"verb"},"говорят":{root:"thalthu",pos:"verb"},"говорил":{root:"thalthu",pos:"verb"},
"любить":{root:"lānmar",pos:"verb"},"любит":{root:"lānmar",pos:"verb"},"любят":{root:"lānmar",pos:"verb"},"любил":{root:"lānmar",pos:"verb"},
"работать":{root:"xurmar",pos:"verb"},"работает":{root:"xurmar",pos:"verb"},"работают":{root:"xurmar",pos:"verb"},"работал":{root:"xurmar",pos:"verb"},
"идти":{root:"nur",pos:"verb"},"иду":{root:"nur",pos:"verb"},"идёт":{root:"nur",pos:"verb"},"идут":{root:"nur",pos:"verb"},"шёл":{root:"nur",pos:"verb"},
"пойти":{root:"nur",pos:"verb"},"пойду":{root:"nur",pos:"verb"},"пойдёт":{root:"nur",pos:"verb"},"пойдут":{root:"nur",pos:"verb"},"пошёл":{root:"nur",pos:"verb"},
"быть":{root:"sen",pos:"verb"},"есть":{root:"sen",pos:"verb"},"был":{root:"sen",pos:"verb"},"была":{root:"sen",pos:"verb"},"было":{root:"sen",pos:"verb"},"были":{root:"sen",pos:"verb"},
"думать":{root:"tsanur",pos:"verb"},"думает":{root:"tsanur",pos:"verb"},"думают":{root:"tsanur",pos:"verb"},
"понимать":{root:"tsanlān",pos:"verb"},"понимает":{root:"tsanlān",pos:"verb"},"понимают":{root:"tsanlān",pos:"verb"},
"бежать":{root:"nurkhō",pos:"verb"},"бежит":{root:"nurkhō",pos:"verb"},"бегут":{root:"nurkhō",pos:"verb"},
"стоять":{root:"okhsen",pos:"verb"},"стоит":{root:"okhsen",pos:"verb"},"стоят":{root:"okhsen",pos:"verb"},"стоял":{root:"okhsen",pos:"verb"},
"лежать":{root:"marlān",pos:"verb"},"лежит":{root:"marlān",pos:"verb"},"лежат":{root:"marlān",pos:"verb"},
"строить":{root:"okhar",pos:"verb"},"строит":{root:"okhar",pos:"verb"},"строят":{root:"okhar",pos:"verb"},"построить":{root:"okhar",pos:"verb"},"построил":{root:"okhar",pos:"verb"},"построили":{root:"okhar",pos:"verb"},
"разрушать":{root:"mōrkhō",pos:"verb"},"разрушает":{root:"mōrkhō",pos:"verb"},
"создавать":{root:"khalur",pos:"verb"},"создаёт":{root:"khalur",pos:"verb"},"создают":{root:"khalur",pos:"verb"},"создал":{root:"khalur",pos:"verb"},"создали":{root:"khalur",pos:"verb"},
"расти":{root:"marūr",pos:"verb"},"растёт":{root:"marūr",pos:"verb"},"растут":{root:"marūr",pos:"verb"},
"падать":{root:"kōlur",pos:"verb"},"падает":{root:"kōlur",pos:"verb"},"падают":{root:"kōlur",pos:"verb"},
"подниматься":{root:"dzenur",pos:"verb"},"поднимается":{root:"dzenur",pos:"verb"},
"спускаться":{root:"kōlur",pos:"verb"},"спускается":{root:"kōlur",pos:"verb"},
"открывать":{root:"tōkhur",pos:"verb"},"открывает":{root:"tōkhur",pos:"verb"},
"закрывать":{root:"tōkhur",pos:"verb"},"закрывает":{root:"tōkhur",pos:"verb"},
"видеть":{root:"thal",pos:"verb"},"видит":{root:"thal",pos:"verb"},"видят":{root:"thal",pos:"verb"},"видел":{root:"thal",pos:"verb"},
"слышать":{root:"thal",pos:"verb"},"слышит":{root:"thal",pos:"verb"},"слышал":{root:"thal",pos:"verb"},
"слушать":{root:"thal",pos:"verb"},"слушает":{root:"thal",pos:"verb"},
"брать":{root:"khōs",pos:"verb"},"берёт":{root:"khōs",pos:"verb"},"берут":{root:"khōs",pos:"verb"},
"давать":{root:"rōg",pos:"verb"},"даёт":{root:"rōg",pos:"verb"},"дают":{root:"rōg",pos:"verb"},
"получать":{root:"sen",pos:"verb"},"получает":{root:"sen",pos:"verb"},"получают":{root:"sen",pos:"verb"},
"петь":{root:"zalkhō",pos:"verb"},"поёт":{root:"zalkhō",pos:"verb"},"поют":{root:"zalkhō",pos:"verb"},
"путешествовать":{root:"nur",pos:"verb"},"менять":{root:"khalur",pos:"verb"},"меняет":{root:"khalur",pos:"verb"},
"начинать":{root:"khan",pos:"verb"},"начинает":{root:"khan",pos:"verb"},"начинают":{root:"khan",pos:"verb"},
"заканчивать":{root:"mōr",pos:"verb"},"отдыхать":{root:"sūl",pos:"verb"},
"спать":{root:"sūl",pos:"verb"},"спит":{root:"sūl",pos:"verb"},"спят":{root:"sūl",pos:"verb"},
"посмотреть":{root:"thal",pos:"verb"},"купить":{root:"xur",pos:"verb"},"купил":{root:"xur",pos:"verb"},
"рисовать":{root:"thalur",pos:"verb"},"рисует":{root:"thalur",pos:"verb"},
"писать":{root:"khōs",pos:"verb"},"пишет":{root:"khōs",pos:"verb"},"писал":{root:"khōs",pos:"verb"},
"сохранить":{root:"lān",pos:"verb"},"спасти":{root:"lānīn",pos:"verb"},"расшифровать":{root:"tsanlān",pos:"verb"},
"записать":{root:"rak",pos:"verb"},"записал":{root:"rak",pos:"verb"},
"хотеть":{root:"nūr",pos:"verb"},"хочу":{root:"nūr",pos:"verb"},"хочет":{root:"nūr",pos:"verb"},"хотят":{root:"nūr",pos:"verb"},
"сделать":{root:"khalur",pos:"verb"},"сделал":{root:"khalur",pos:"verb"},"делать":{root:"khalur",pos:"verb"},"делает":{root:"khalur",pos:"verb"},"делают":{root:"khalur",pos:"verb"},
"возвращаться":{root:"thalān",pos:"verb"},"вернуться":{root:"thalān",pos:"verb"},
"и":{root:"un",pos:"conj"},"но":{root:"kan",pos:"conj"},"когда":{root:"tsen",pos:"conj"},
"не":{root:"ān",pos:"particle"},"нет":{root:"ān",pos:"particle"},
"сегодня":{root:"sōl",pos:"noun"},"завтра":{root:"dzenur",pos:"noun"},"вчера":{root:"lānur",pos:"noun"},
"вместе":{root:"tō",pos:"adv"},"очень":{root:"suf",pos:"adv"},"всегда":{root:"sen",pos:"adv"},"никогда":{root:"ān",pos:"adv"},
"теперь":{root:"amār",pos:"adv"},"потом":{root:"amār",pos:"adv"},"далеко":{root:"dzenur",pos:"adv"},
"близко":{root:"kōl",pos:"adv"},"внутри":{root:"kōl",pos:"adv"},"снаружи":{root:"dzen",pos:"adv"},
"это":{root:"thal",pos:"pron"},"этот":{root:"thalon",pos:"pron"},"эта":{root:"thalon",pos:"pron"},"эти":{root:"thalon",pos:"pron"},
"тот":{root:"tan",pos:"pron"},"та":{root:"tan",pos:"pron"},"те":{root:"tan",pos:"pron"},
"каждый":{root:"ontō",pos:"pron"},"никто":{root:"ān-on",pos:"pron"},"все":{root:"tō",pos:"pron"},"всех":{root:"tō",pos:"pron"},
"свой":{root:"an",pos:"pron"},"своя":{root:"an",pos:"pron"},"своё":{root:"an",pos:"pron"},"свою":{root:"an",pos:"pron"},"свои":{root:"an",pos:"pron"},
"куда":{root:"nur",pos:"adv"},
"ацидалийское море":{root:"Acidalia",pos:"noun"},
"фарсида":{root:"Khōsen",pos:"noun"},"фарсиды":{root:"Khōsen",pos:"noun"},"фарсиду":{root:"Khōsen",pos:"noun"},"фарсидой":{root:"Khōsen",pos:"noun"},"фарсиде":{root:"Khōsen",pos:"noun"},
"эллада":{root:"Ellada",pos:"noun"},"эллады":{root:"Ellada",pos:"noun"},"элладу":{root:"Ellada",pos:"noun"},"элладой":{root:"Ellada",pos:"noun"},"элладе":{root:"Ellada",pos:"noun"},
"утопия":{root:"Utopiya",pos:"noun"},"утопии":{root:"Utopiya",pos:"noun"},"утопию":{root:"Utopiya",pos:"noun"},"утопией":{root:"Utopiya",pos:"noun"},
"аравия":{root:"Aravia",pos:"noun"},"аравии":{root:"Aravia",pos:"noun"},"аравию":{root:"Aravia",pos:"noun"},
"роген-ария":{root:"Rogen-Ariya",pos:"noun"},
"ксанфа":{root:"Ksanf",pos:"noun"},"ксанфу":{root:"Ksanf",pos:"noun"},"ксанфе":{root:"Ksanf",pos:"noun"},"ксанфом":{root:"Ksanf",pos:"noun"},
"долина маринера":{root:"Valles",pos:"noun"},"олимп":{root:"Olympus",pos:"noun"},
"эритрея":{root:"Eritreya",pos:"noun"},"эритреи":{root:"Eritreya",pos:"noun"},"эритрею":{root:"Eritreya",pos:"noun"},"эритреей":{root:"Eritreya",pos:"noun"},"эритрее":{root:"Eritreya",pos:"noun"},
"эдем":{root:"Eden",pos:"noun"},"эдема":{root:"Eden",pos:"noun"},"эдему":{root:"Eden",pos:"noun"},"эдемом":{root:"Eden",pos:"noun"},"эдеме":{root:"Eden",pos:"noun"},
"тарсис":{root:"Tarsis",pos:"noun"},"тарсиса":{root:"Tarsis",pos:"noun"},"тарсисом":{root:"Tarsis",pos:"noun"},
"эллос":{root:"Ellos",pos:"noun"},"эллоса":{root:"Ellos",pos:"noun"},"эллосе":{root:"Ellos",pos:"noun"},
"сирения":{root:"Sirenia",pos:"noun"},"сирении":{root:"Sirenia",pos:"noun"},"сирению":{root:"Sirenia",pos:"noun"},"сиренией":{root:"Sirenia",pos:"noun"},
"араксис":{root:"Araksis",pos:"noun"},"кхо":{root:"Kho",pos:"noun"},
"акха":{root:"Akha",pos:"noun"},"акхи":{root:"Akha",pos:"noun"},"акхе":{root:"Akha",pos:"noun"},"акху":{root:"Akha",pos:"noun"},"акхой":{root:"Akha",pos:"noun"},
"иван":{root:"Ivan",pos:"noun"},"ивана":{root:"Ivan",pos:"noun"},"ивану":{root:"Ivan",pos:"noun"},
"Мнемис":{root:"Lānsur",pos:"noun"},"Mnemis":{root:"Lānsur",pos:"noun"},
"талин":{root:"Talīn",pos:"noun"},"талина":{root:"Talīn",pos:"noun"},"талину":{root:"Talīn",pos:"noun"},"талином":{root:"Talīn",pos:"noun"},
"хевсур":{root:"Khevsur",pos:"noun"},"хевсура":{root:"Khevsur",pos:"noun"},"хевсуру":{root:"Khevsur",pos:"noun"},"хевсуром":{root:"Khevsur",pos:"noun"},
"йарра":{root:"Yarra",pos:"noun"},"йарры":{root:"Yarra",pos:"noun"},"йарру":{root:"Yarra",pos:"noun"},"йаррой":{root:"Yarra",pos:"noun"},
"элла":{root:"Ella",pos:"noun"},
"аратан":{root:"Aratan",pos:"noun"},"аратана":{root:"Aratan",pos:"noun"},"аратану":{root:"Aratan",pos:"noun"},"аратаном":{root:"Aratan",pos:"noun"},
"араш":{root:"Arash",pos:"noun"},"араша":{root:"Arash",pos:"noun"},"арашу":{root:"Arash",pos:"noun"},"арашем":{root:"Arash",pos:"noun"},"араше":{root:"Arash",pos:"noun"},
"кан":{root:"Kan",pos:"noun"},"кана":{root:"Kan",pos:"noun"},"кану":{root:"Kan",pos:"noun"},"каном":{root:"Kan",pos:"noun"},"кане":{root:"Kan",pos:"noun"},
"сарум":{root:"Sarum",pos:"noun"},"сарума":{root:"Sarum",pos:"noun"},"саруму":{root:"Sarum",pos:"noun"},"сарумом":{root:"Sarum",pos:"noun"},"саруме":{root:"Sarum",pos:"noun"},
"алира":{root:"Alira",pos:"noun"},"алиры":{root:"Alira",pos:"noun"},"алиру":{root:"Alira",pos:"noun"},"алирой":{root:"Alira",pos:"noun"},"алире":{root:"Alira",pos:"noun"},
"совия":{root:"Soviya",pos:"noun"},"совии":{root:"Soviya",pos:"noun"},"совию":{root:"Soviya",pos:"noun"},"совией":{root:"Soviya",pos:"noun"},
"исход":{root:"Iskhod",pos:"noun"},"исхода":{root:"Iskhod",pos:"noun"},"исходу":{root:"Iskhod",pos:"noun"},"исходом":{root:"Iskhod",pos:"noun"},"исходе":{root:"Iskhod",pos:"noun"},
"ковчег":{root:"Kovcheg",pos:"noun"},"ковчега":{root:"Kovcheg",pos:"noun"},"ковчегу":{root:"Kovcheg",pos:"noun"},"ковчегом":{root:"Kovcheg",pos:"noun"},"ковчеге":{root:"Kovcheg",pos:"noun"},"ковчеги":{root:"Kovcheg",pos:"noun"},
"космодром":{root:"Kosmodrom",pos:"noun"},"космодрома":{root:"Kosmodrom",pos:"noun"},"космодрому":{root:"Kosmodrom",pos:"noun"},"космодромом":{root:"Kosmodrom",pos:"noun"},"космодроме":{root:"Kosmodrom",pos:"noun"},
"пират":{root:"Pirat",pos:"noun"},"пирата":{root:"Pirat",pos:"noun"},"пирату":{root:"Pirat",pos:"noun"},"пиратом":{root:"Pirat",pos:"noun"},"пираты":{root:"Pirat",pos:"noun"},"пиратов":{root:"Pirat",pos:"noun"},
"пророчество":{root:"Prorochestvo",pos:"noun"},"пророчества":{root:"Prorochestvo",pos:"noun"},
"легенда":{root:"Legenda",pos:"noun"},"легенды":{root:"Legenda",pos:"noun"},"легенде":{root:"Legenda",pos:"noun"},
"миф":{root:"Mif",pos:"noun"},"мифа":{root:"Mif",pos:"noun"},"мифу":{root:"Mif",pos:"noun"},"мифом":{root:"Mif",pos:"noun"},"мифе":{root:"Mif",pos:"noun"},"мифы":{root:"Mif",pos:"noun"},
"цель":{root:"thali",pos:"noun"},"цели":{root:"thali",pos:"noun"},"змея":{root:"ksanfi",pos:"noun"},"змеи":{root:"ksanfi",pos:"noun"},
"голос":{root:"Ar",pos:"noun"},"голосом":{root:"Ar",pos:"noun"},"голоса":{root:"Ar",pos:"noun"},
"астронавигатор":{root:"dzenurīn",pos:"noun"},"астронавигатора":{root:"dzenurīn",pos:"noun"},
"карта":{root:"thala",pos:"noun"},"карте":{root:"thala",pos:"noun"},"карту":{root:"thala",pos:"noun"},"картой":{root:"thala",pos:"noun"},
"небо":{root:"sura",pos:"noun"},"неба":{root:"sura",pos:"noun"},"небу":{root:"sura",pos:"noun"},"небе":{root:"sura",pos:"noun"},"небесный":{root:"sura",pos:"adj"},
"море":{root:"thal",pos:"noun"},"моря":{root:"thal",pos:"noun"},"морю":{root:"thal",pos:"noun"},"морем":{root:"thal",pos:"noun"},
"южный":{root:"ellada",pos:"adj"},"элладский":{root:"ellada",pos:"adj"},"западный":{root:"utopia",pos:"adj"},"утопийский":{root:"utopia",pos:"adj"},
"центральный":{root:"okhasen",pos:"adj"},"окхасенский":{root:"okhasen",pos:"adj"},
"привет":{root:"Mar dzen",pos:"phrase"},"здравствуй":{root:"Mar dzen",pos:"phrase"},"здравствуйте":{root:"Mar dzen",pos:"phrase"},"добрый день":{root:"Mar dzen",pos:"phrase"},
"прощай":{root:"Lān mar",pos:"phrase"},"прощайте":{root:"Ariya lān",pos:"phrase"},"до свидания":{root:"Lān mar",pos:"phrase"},
"спасибо":{root:"Tsan lān",pos:"phrase"},"благодарю":{root:"Tsan lān",pos:"phrase"},
"пожалуйста":{root:"Marzān thal",pos:"phrase"},"удачи":{root:"Marzān thal",pos:"phrase"},
"глина помнит":{root:"Lān sur",pos:"phrase"},"письмо из красной пыли":{root:"Khalur khō sur",pos:"phrase"},
"марсианская энциклопедия":{root:"Tsankhō Marzān",pos:"phrase"},"красная пыль":{root:"Khō sur",pos:"phrase"},
"звезда смотрит":{root:"Dzen thal",pos:"phrase"},"звезда умирает":{root:"Dzen mōr",pos:"phrase"},"звезда умирает, глина помнит":{root:"Dzen mōr, lān sur",pos:"phrase"},
"оставлять":{root:"ānxur",pos:"verb"},"оставил":{root:"ānxur",pos:"verb"},"оставила":{root:"ānxur",pos:"verb"},"оставили":{root:"ānxur",pos:"verb"},
"сокращать":{root:"hōr-khalur",pos:"verb"},"похищать":{root:"khōs-nur",pos:"verb"},
"отменять":{root:"ān-khalur",pos:"verb"},"ускорять":{root:"nur-khō",pos:"verb"},
"принимать":{root:"khōs-tsan",pos:"verb"},"принимает":{root:"khōs-tsan",pos:"verb"},"принял":{root:"khōs-tsan",pos:"verb"},"приняли":{root:"khōs-tsan",pos:"verb"},
"достигать":{root:"thal-dzen",pos:"verb"},"достигает":{root:"thal-dzen",pos:"verb"},"достиг":{root:"thal-dzen",pos:"verb"},"достигли":{root:"thal-dzen",pos:"verb"},
"действовать":{root:"khalur",pos:"verb"},"складывать":{root:"un-mar",pos:"verb"},"вычитать":{root:"ān-mar",pos:"verb"},
"умножать":{root:"sūr-mar",pos:"verb"},"делить":{root:"hōr-mar",pos:"verb"},
"обвинять":{root:"mōr-tsan",pos:"verb"},"болеть":{root:"mōr-mar",pos:"verb"},"сопровождать":{root:"nur-tō",pos:"verb"},
"способность":{root:"xur-tsan",pos:"noun"},"отмена":{root:"ān-khalur",pos:"noun"},
"отсутствие":{root:"ān-sen",pos:"noun"},"ускорение":{root:"nur-khō",pos:"noun"},
"доступ":{root:"nur-sen",pos:"noun"},"отделение":{root:"hōr-sen",pos:"noun"},
"помещение":{root:"okh-sen",pos:"noun"},"сопровождение":{root:"nur-tō",pos:"noun"},
"сообщник":{root:"nur-tō-īn",pos:"noun"},"отчёт":{root:"sur-thal",pos:"noun"},"отчет":{root:"sur-thal",pos:"noun"},
"достоверность":{root:"thal-tsan",pos:"noun"},"обвинение":{root:"mōr-tsan",pos:"noun"},
"болезнь":{root:"mōr-mar",pos:"noun"},"боль":{root:"mōr",pos:"noun"},
"достижение":{root:"thal-dzen",pos:"noun"},"кислота":{root:"mōr-ākha",pos:"noun"},
"признание":{root:"khōs-tsan",pos:"noun"},"исполнитель":{root:"khalur-īn",pos:"noun"},
"академия":{root:"tsan-sen",pos:"noun"},"академии":{root:"tsan-sen",pos:"noun"},"академию":{root:"tsan-sen",pos:"noun"},"академией":{root:"tsan-sen",pos:"noun"},
"способный":{root:"xur-tsan",pos:"adj"},"приемлемый":{root:"khōs-tsan",pos:"adj"},
"доступный":{root:"nur-sen",pos:"adj"},"ответственный":{root:"lān-īn",pos:"adj"},
"точный":{root:"thal-tsan",pos:"adj"},"точная":{root:"thal-tsan",pos:"adj"},
"патологический":{root:"mōr-mar",pos:"adj"},"отсутствующий":{root:"ān-sen",pos:"adj"},
"совершенный":{root:"suf-tsan",pos:"adj"},"абстрактный":{root:"thal-lān",pos:"adj"},
"абсурдный":{root:"ān-tsan",pos:"adj"},"академический":{root:"tsan-sen",pos:"adj"},
"внезапный":{root:"ān-thal",pos:"adj"},"случайный":{root:"hōr-thal",pos:"adj"},
"внезапно":{root:"ān-thal",pos:"adv"},"точно":{root:"thal-tsan",pos:"adv"},
"случайно":{root:"hōr-thal",pos:"adv"},"совершенно":{root:"suf-tsan",pos:"adv"},
"ветер":{root:"zal",pos:"noun"},"ветра":{root:"zal",pos:"noun"},"ветром":{root:"zal",pos:"noun"},
"песок":{root:"xal",pos:"noun"},"песка":{root:"xal",pos:"noun"},
"соль":{root:"hem",pos:"noun"},"соли":{root:"hem",pos:"noun"},
"океан":{root:"ākhasuf",pos:"noun"},"океана":{root:"ākhasuf",pos:"noun"},
"берег":{root:"kōlākha",pos:"noun"},"берега":{root:"kōlākha",pos:"noun"},"берегу":{root:"kōlākha",pos:"noun"},
"волна":{root:"volna",pos:"noun"},"волны":{root:"volna",pos:"noun"},
"прилив":{root:"ākhanur",pos:"noun"},"отлив":{root:"ākhamōr",pos:"noun"},
"облако":{root:"oblako",pos:"noun"},"облака":{root:"oblako",pos:"noun"},
"туман":{root:"tuman",pos:"noun"},"снег":{root:"sneg",pos:"noun"},
"лёд":{root:"led",pos:"noun"},"льда":{root:"led",pos:"noun"},"гром":{root:"grom",pos:"noun"},"молния":{root:"molniya",pos:"noun"},
"планета":{root:"dzenkōl",pos:"noun"},"планеты":{root:"dzenkōl",pos:"noun"},"планету":{root:"dzenkōl",pos:"noun"},"планете":{root:"dzenkōl",pos:"noun"},
"орбита":{root:"dzennur",pos:"noun"},"орбиты":{root:"dzennur",pos:"noun"},
"комета":{root:"khōdzen",pos:"noun"},"астероид":{root:"ghardzen",pos:"noun"},
"галактика":{root:"sūrdzen",pos:"noun"},"туманность":{root:"ākhadzen",pos:"noun"},"созвездие":{root:"dzenrak",pos:"noun"},
"сухой":{root:"sukh",pos:"adj"},"влажный":{root:"vlaž",pos:"adj"},"глубокий":{root:"glub",pos:"adj"},"мелкий":{root:"mel",pos:"adj"},
"мягкий":{root:"myagk",pos:"adj"},"твёрдый":{root:"tverd",pos:"adj"},"острый":{root:"ostr",pos:"adj"},
"высокий":{root:"vys",pos:"adj"},"низкий":{root:"niz",pos:"adj"},"чистый":{root:"chist",pos:"adj"},
"тяжёлый":{root:"tyazh",pos:"adj"},"лёгкий":{root:"lyogk",pos:"adj"},"быстрый":{root:"bystr",pos:"adj"},"медленный":{root:"medl",pos:"adj"},
"дуть":{root:"dut",pos:"verb"},"лить":{root:"lit",pos:"verb"},"ползти":{root:"polzt",pos:"verb"},"прыгать":{root:"pryg",pos:"verb"},
"плавать":{root:"plav",pos:"verb"},"нырять":{root:"nyr",pos:"verb"},"кружить":{root:"kruzh",pos:"verb"},
"вращаться":{root:"vrasch",pos:"verb"},"вращается":{root:"vrasch",pos:"verb"},
"отражать":{root:"otrazh",pos:"verb"},"отражает":{root:"otrazh",pos:"verb"},
"сиять":{root:"siyat",pos:"verb"},"сияет":{root:"siyat",pos:"verb"},"мерцать":{root:"merts",pos:"verb"},"мерцает":{root:"merts",pos:"verb"},
"светить":{root:"svet",pos:"verb"},"светит":{root:"svet",pos:"verb"},"тушить":{root:"tush",pos:"verb"},
"течь":{root:"tech",pos:"verb"},"течёт":{root:"tech",pos:"verb"},
"сорок":{root:"khen-dzen-on",pos:"num"},"пятьдесят":{root:"phin-dzen-on",pos:"num"},"тысяча":{root:"thos",pos:"num"},"миллион":{root:"mil",pos:"num"},
"глава":{root:"lānrak",pos:"noun"},"главы":{root:"lānrak",pos:"noun"},"страница":{root:"surrak",pos:"noun"},"страницы":{root:"surrak",pos:"noun"},
"строка":{root:"thōlrak",pos:"noun"},"строки":{root:"thōlrak",pos:"noun"},"буква":{root:"tsanrak",pos:"noun"},"буквы":{root:"tsanrak",pos:"noun"},
"алфавит":{root:"tsanrakān",pos:"noun"},"рукопись":{root:"khōsur",pos:"noun"},
"пергамент":{root:"kōlsur",pos:"noun"},"чернила":{root:"ākhasur",pos:"noun"},
"корабль":{root:"ākhanur",pos:"noun"},"корабля":{root:"ākhanur",pos:"noun"},"корабли":{root:"ākhanur",pos:"noun"},"кораблей":{root:"ākhanur",pos:"noun"},
"парус":{root:"zalnur",pos:"noun"},"якорь":{root:"kōlān",pos:"noun"},
"мачта":{root:"dzenur",pos:"noun"},"капитан":{root:"rōgākha",pos:"noun"},"моряк":{root:"ākhīn",pos:"noun"},
"остров":{root:"kōlhōr",pos:"noun"},"острова":{root:"kōlhōr",pos:"noun"},
"судьба":{root:"thalān",pos:"noun"},"судьбы":{root:"thalān",pos:"noun"},"рок":{root:"rakthal",pos:"noun"},"случай":{root:"hōrthal",pos:"noun"},
"время":{root:"amār",pos:"noun"},"времени":{root:"amār",pos:"noun"},"пространство":{root:"dzenkōl",pos:"noun"},
"материя":{root:"kōlsur",pos:"noun"},"дух":{root:"khōlān",pos:"noun"},"идея":{root:"thaltsan",pos:"noun"},"форма":{root:"surrak",pos:"noun"},
"утро":{root:"dzēn",pos:"noun"},"вечер":{root:"khōl",pos:"noun"},"полдень":{root:"sōldzen",pos:"noun"},"полночь":{root:"nōkhdzen",pos:"noun"},
"закат":{root:"khōmōr",pos:"noun"},"восход":{root:"khōmar",pos:"noun"},"туча":{root:"oblako",pos:"noun"},
"роса":{root:"ākhalān",pos:"noun"},"иней":{root:"kōlmōr",pos:"noun"},"град":{root:"gharkhō",pos:"noun"},
"сверкать":{root:"dzenur",pos:"verb"},"искриться":{root:"khōdzen",pos:"verb"},"плыть":{root:"ākhaur",pos:"verb"},
"полоть":{root:"marur",pos:"verb"},"жарить":{root:"khōur",pos:"verb"},"варить":{root:"ākhaur",pos:"verb"},
"план":{root:"tsanur",pos:"noun"},"проект":{root:"khalur",pos:"noun"},"колония":{root:"mārsen",pos:"noun"},"колонии":{root:"mārsen",pos:"noun"},
"база":{root:"okhsen",pos:"noun"},"станция":{root:"senur",pos:"noun"},
"царь":{root:"lugal",pos:"noun"},"царя":{root:"lugal",pos:"noun"},"царица":{root:"lugal",pos:"noun"},
"жрец":{root:"en",pos:"noun"},"жреца":{root:"en",pos:"noun"},"жрица":{root:"en",pos:"noun"},"жрицы":{root:"en",pos:"noun"},
"владыка":{root:"en",pos:"noun"},"святыня":{root:"e",pos:"noun"},"алтарь":{root:"e",pos:"noun"},"алтаря":{root:"e",pos:"noun"},
"жертва":{root:"dingir",pos:"noun"},"жертвы":{root:"dingir",pos:"noun"},
"поток":{root:"id",pos:"noun"},"ручей":{root:"id",pos:"noun"},"канал":{root:"id",pos:"noun"},"каналы":{root:"id",pos:"noun"},
"золото":{root:"kug",pos:"noun"},"серебро":{root:"kug-babbar",pos:"noun"},"медь":{root:"urud",pos:"noun"},"меди":{root:"urud",pos:"noun"},
"железо":{root:"anbar",pos:"noun"},"железа":{root:"anbar",pos:"noun"},
"раб":{root:"arad",pos:"noun"},"раба":{root:"arad",pos:"noun"},"рабыня":{root:"arad",pos:"noun"},"свободный":{root:"lugal",pos:"adj"},
"воин":{root:"ur",pos:"noun"},"воины":{root:"ur",pos:"noun"},"воинов":{root:"ur",pos:"noun"},
"охотник":{root:"ur",pos:"noun"},"рыбак":{root:"id",pos:"noun"},"рыбаки":{root:"id",pos:"noun"},
"месяц":{root:"dzen",pos:"noun"},"неделя":{root:"thōl",pos:"noun"},"час":{root:"dzen",pos:"noun"},"часа":{root:"dzen",pos:"noun"},
"минута":{root:"khō",pos:"noun"},"секунда":{root:"lān",pos:"noun"},
"божество":{root:"netjer",pos:"noun"},"пророк":{root:"hery",pos:"noun"},
"гробница":{root:"per-djet",pos:"noun"},"мумия":{root:"sah",pos:"noun"},"нил":{root:"iteru",pos:"noun"},"оазис":{root:"wahat",pos:"noun"},
"папирус":{root:"wadj",pos:"noun"},"лотос":{root:"seshen",pos:"noun"},"крокодил":{root:"msh",pos:"noun"},
"иероглиф":{root:"medu-netjer",pos:"noun"},"иероглифы":{root:"medu-netjer",pos:"noun"},
"свиток":{root:"medjat",pos:"noun"},"свитки":{root:"medjat",pos:"noun"},
"правитель":{root:"heqa",pos:"noun"},"правителя":{root:"heqa",pos:"noun"},
"везир":{root:"taty",pos:"noun"},"судья":{root:"maat",pos:"noun"},"закон":{root:"hepu",pos:"noun"},"законы":{root:"hepu",pos:"noun"},
"пирамида":{root:"mr",pos:"noun"},"пирамиды":{root:"mr",pos:"noun"},
"обелиск":{root:"tekhen",pos:"noun"},"колонна":{root:"djed",pos:"noun"},"колонны":{root:"djed",pos:"noun"},
"дворец":{root:"per-aat",pos:"noun"},"наводнение":{root:"akhet",pos:"noun"},
"засуха":{root:"shemu",pos:"noun"},"засухи":{root:"shemu",pos:"noun"},"урожай":{root:"peret",pos:"noun"},
"рождение":{root:"mes",pos:"noun"},"чужой":{root:"khas",pos:"adj"},"родной":{root:"ta",pos:"adj"},
"юг":{root:"resy",pos:"noun"},"запад":{root:"imenty",pos:"noun"},
"учитель":{root:"tsanīn",pos:"noun"},"учителя":{root:"tsanīn",pos:"noun"},"наставник":{root:"tsanīn",pos:"noun"},
"ученик":{root:"tsanān",pos:"noun"},"ученика":{root:"tsanān",pos:"noun"},"ученица":{root:"tsanān",pos:"noun"},
"врач":{root:"marlān",pos:"noun"},"врача":{root:"marlān",pos:"noun"},"целитель":{root:"marlān",pos:"noun"},
"кузнец":{root:"khōsīn",pos:"noun"},"строитель":{root:"okharīn",pos:"noun"},"земледелец":{root:"marīn",pos:"noun"},
"поэт":{root:"thalīn",pos:"noun"},"поэта":{root:"thalīn",pos:"noun"},"поэтесса":{root:"thalīn",pos:"noun"},
"певец":{root:"zalkhōīn",pos:"noun"},"певица":{root:"zalkhōīn",pos:"noun"},
"нож":{root:"khōsrak",pos:"noun"},"ножа":{root:"khōsrak",pos:"noun"},"топор":{root:"khōsūr",pos:"noun"},
"молот":{root:"gharur",pos:"noun"},"пила":{root:"khōsthal",pos:"noun"},
"игла":{root:"thōlrak",pos:"noun"},"иглы":{root:"thōlrak",pos:"noun"},
"верёвка":{root:"zalthōl",pos:"noun"},"корзина":{root:"kōlrak",pos:"noun"},
"кувшин":{root:"ākharak",pos:"noun"},"чаша":{root:"khōrak",pos:"noun"},
"тарелка":{root:"surrak",pos:"noun"},"ложка":{root:"ākhanur",pos:"noun"},
"свеча":{root:"khōlān",pos:"noun"},"факел":{root:"khōnur",pos:"noun"},
"рубаха":{root:"thōlīn",pos:"noun"},"штаны":{root:"nurthōl",pos:"noun"},
"сапоги":{root:"kōlnur",pos:"noun"},"шляпа":{root:"dzenīn",pos:"noun"},"перчатка":{root:"khōsīn",pos:"noun"},
"фрукты":{root:"marōk",pos:"noun"},"овощи":{root:"kōlmar",pos:"noun"},"ягоды":{root:"hōrmar",pos:"noun"},
"молоко":{root:"lānkōl",pos:"noun"},"мёд":{root:"dzenkōl",pos:"noun"},"сыр":{root:"lānmar",pos:"noun"},
"конь":{root:"nurkhōr",pos:"noun"},"лошадь":{root:"nurkhōr",pos:"noun"},
"собака":{root:"kōlkhōr",pos:"noun"},"волк":{root:"mōrkhōr",pos:"noun"},"олень":{root:"dzenkhōr",pos:"noun"},
"кровь":{root:"marlān",pos:"noun"},"крови":{root:"marlān",pos:"noun"},
"удивление":{root:"ānthal",pos:"noun"},"интерес":{root:"thalnur",pos:"noun"},
"скука":{root:"ānmar",pos:"noun"},"усталость":{root:"nōkhmar",pos:"noun"},
"голод":{root:"mōrmar",pos:"noun"},"жажда":{root:"mōrākha",pos:"noun"},
"храбрый":{root:"khōrīn",pos:"adj"},"трусливый":{root:"ānkhōr",pos:"adj"},
"умный":{root:"tsanīn",pos:"adj"},"глупый":{root:"āntsan",pos:"adj"},
"богатый":{root:"sūrkōl",pos:"adj"},"бедный":{root:"hōrkōl",pos:"adj"},
"сундук":{root:"okharak",pos:"noun"},"шкаф":{root:"thōlrak",pos:"noun"},
"зеркало":{root:"thalrak",pos:"noun"},"ковёр":{root:"kōlthōl",pos:"noun"},
"мудрость":{root:"yartsan",pos:"noun"},"сомнение":{root:"ānkhalmar",pos:"noun"},
"цветок":{root:"mardzen",pos:"noun"},"трава":{root:"kōlmar",pos:"noun"},
"зерно":{root:"khōmar",pos:"noun"},"дерево":{root:"gis",pos:"noun"},"деревья":{root:"gis",pos:"noun"},
"вдруг":{root:"ānthal",pos:"adv"},"постепенно":{root:"kōlnur",pos:"adv"},
"быстро":{root:"bystr",pos:"adv"},"тихо":{root:"nōkh",pos:"adv"},
"громко":{root:"khō",pos:"adv"},"аккуратно":{root:"thaltsan",pos:"adv"},
"разбить":{root:"rakz",pos:"verb"},"разбил":{root:"rakz",pos:"verb"},
"бить":{root:"bit",pos:"verb"},"бьёт":{root:"bit",pos:"verb"},
"ударять":{root:"udar",pos:"verb"},"ударить":{root:"udar",pos:"verb"},"ударил":{root:"udar",pos:"verb"},
"стукать":{root:"stuk",pos:"verb"},"стукнуть":{root:"stuk",pos:"verb"},"стучать":{root:"stuk",pos:"verb"},"стук":{root:"stuk",pos:"noun"},
"лён":{root:"lānkōl",pos:"noun"},"рана":{root:"mōrrak",pos:"noun"},
"крыша":{root:"dzenokh",pos:"noun"},"пол":{root:"kōlokh",pos:"noun"},
"окно":{root:"dzentōkh",pos:"noun"},"сосед":{root:"kōlsen",pos:"noun"},
"сила":{root:"khōlān",pos:"noun"},"силы":{root:"khōlān",pos:"noun"},
"смысл":{root:"thaltsan",pos:"noun"},"чудо":{root:"ānthal",pos:"noun"},"тайна":{root:"nōkhlān",pos:"noun"},
"пахнуть":{root:"khōlān",pos:"verb"},"звенеть":{root:"dzenur",pos:"verb"},
"шептать":{root:"nōkhthal",pos:"verb"},"кричать":{root:"khōthal",pos:"verb"},
"молчать":{root:"ānthal",pos:"verb"},"вспоминать":{root:"lānthal",pos:"verb"},
"забывать":{root:"ānlān",pos:"verb"},"верить":{root:"khalmar",pos:"verb"},
"надеяться":{root:"lānthōl",pos:"verb"},"бояться":{root:"ghōlmar",pos:"verb"},
"след":{root:"kōlnur",pos:"noun"},"слава":{root:"lānkhō",pos:"noun"},
"беда":{root:"mōrthal",pos:"noun"},"победа":{root:"marlān",pos:"noun"},"поражение":{root:"mōrlān",pos:"noun"}
};

/* ═══ НОВЫЕ СЛОВА ═══ */
var NEW_WORDS = {
"тварь":{root:"khōrmar",pos:"noun"},"твари":{root:"khōrmar",pos:"noun"},
"лицо":{root:"thalsen",pos:"noun"},"лица":{root:"thalsen",pos:"noun"},
"рука":{root:"khasrak",pos:"noun"},"руки":{root:"khasrak",pos:"noun"},"руке":{root:"khasrak",pos:"noun"},
"нога":{root:"nurnak",pos:"noun"},"ноги":{root:"nurnak",pos:"noun"},
"глаз":{root:"thalsen",pos:"noun"},"глаза":{root:"thalsen",pos:"noun"},
"сердце":{root:"lānsen",pos:"noun"},"сердца":{root:"lānsen",pos:"noun"},
"душа":{root:"khōlān",pos:"noun"},"души":{root:"khōlān",pos:"noun"},"душе":{root:"khōlān",pos:"noun"},
"крик":{root:"khōthal",pos:"noun"},"шёпот":{root:"nōkhthal",pos:"noun"},
"пение":{root:"zalkhō",pos:"noun"},"смех":{root:"thalmar",pos:"noun"},
"слёзы":{root:"ākhaur",pos:"noun"},"слезы":{root:"ākhaur",pos:"noun"},
"век":{root:"amār",pos:"noun"},"века":{root:"amār",pos:"noun"},"веков":{root:"amār",pos:"noun"},
"бог":{root:"netjer",pos:"noun"},"бога":{root:"netjer",pos:"noun"},"боги":{root:"netjer",pos:"noun"},"богов":{root:"netjer",pos:"noun"},
"простор":{root:"sūrsen",pos:"noun"},"порядок":{root:"thalsen",pos:"noun"},"хаос":{root:"mōrsen",pos:"noun"},
"равновесие":{root:"unmar",pos:"noun"},"мощь":{root:"sufkhō",pos:"noun"},
"честь":{root:"aritsan",pos:"noun"},"стыд":{root:"ghōlmar",pos:"noun"},
"мука":{root:"sufmōr",pos:"noun"},"веселье":{root:"sōlmar",pos:"noun"},
"тоска":{root:"nōkhmōr",pos:"noun"},"ужас":{root:"sufghōl",pos:"noun"},
"ярость":{root:"sufkhō",pos:"noun"},"ненависть":{root:"ānmōr",pos:"noun"},
"дружба":{root:"tōlān",pos:"noun"},"родство":{root:"tōmar",pos:"noun"},
"лучший":{root:"sufari",pos:"adj"},"лучшая":{root:"sufari",pos:"adj"},
"лучшее":{root:"sufari",pos:"adj"},"лучшие":{root:"sufari",pos:"adj"},
"лучшего":{root:"sufari",pos:"adj"},"лучшем":{root:"sufari",pos:"adj"},"лучшему":{root:"sufari",pos:"adj"},
"худший":{root:"ānsuf",pos:"adj"},"высший":{root:"dzenari",pos:"adj"},
"истинный":{root:"thalsuf",pos:"adj"},"ложный":{root:"ānthal",pos:"adj"},
"тёмный":{root:"nōkh",pos:"adj"},"темный":{root:"nōkh",pos:"adj"},
"светлый":{root:"dzenīn",pos:"adj"},"горячий":{root:"khōīn",pos:"adj"},
"холодный":{root:"mōrīn",pos:"adj"},"тихий":{root:"nōkhīn",pos:"adj"},
"громкий":{root:"khōīn",pos:"adj"},"настоящий":{root:"thalsen",pos:"adj"},
"единственный":{root:"ontō",pos:"adj"},"прекрасный":{root:"sufdzen",pos:"adj"},
"удивительный":{root:"ānthal",pos:"adj"},
"всё-же":{root:"unmōr",pos:"adv"},"все-же":{root:"unmōr",pos:"adv"},
"всё же":{root:"unmōr",pos:"adv"},"наконец":{root:"mōrthal",pos:"adv"},
"снова":{root:"khalnur",pos:"adv"},"сначала":{root:"khānnur",pos:"adv"},
"прежде":{root:"xalnur",pos:"adv"},"вскоре":{root:"nurkhō",pos:"adv"},
"сразу":{root:"khōnur",pos:"adv"},"немедленно":{root:"khōnur",pos:"adv"},
"навсегда":{root:"ānrak",pos:"adv"},"отдельно":{root:"hōrsen",pos:"adv"},
"ясно":{root:"dzenīn",pos:"adv"},"просто":{root:"on",pos:"adv"},
"сложно":{root:"sūrtsan",pos:"adv"},"возможно":{root:"nūr",pos:"adv"},
"конечно":{root:"thalsuf",pos:"adv"},"именно":{root:"thalsen",pos:"adv"},
"почти":{root:"on",pos:"adv"},"ведь":{root:"un",pos:"adv"},
"лишь":{root:"on",pos:"adv"},"ещё":{root:"khal",pos:"adv"},"еще":{root:"khal",pos:"adv"},
"разговаривать":{root:"thalthu",pos:"verb"},"разговариваю":{root:"thalthu",pos:"verb"},
"разговаривает":{root:"thalthu",pos:"verb"},"разговаривают":{root:"thalthu",pos:"verb"},
"разговаривал":{root:"thalthu",pos:"verb"},"беседовать":{root:"thalthu",pos:"verb"},
"беседую":{root:"thalthu",pos:"verb"},"общаться":{root:"thalthu",pos:"verb"},
"молвить":{root:"thalthu",pos:"verb"},"произносить":{root:"thalthu",pos:"verb"},
"произношу":{root:"thalthu",pos:"verb"},"восклицать":{root:"khōthal",pos:"verb"},
"восклицаю":{root:"khōthal",pos:"verb"},"шепчу":{root:"nōkhthal",pos:"verb"},
"кричу":{root:"khōthal",pos:"verb"},"кричит":{root:"khōthal",pos:"verb"},
"воспевать":{root:"zalkhō",pos:"verb"},"обожать":{root:"suflānmar",pos:"verb"},
"уважать":{root:"aritsan",pos:"verb"},"уважаю":{root:"aritsan",pos:"verb"},
"ужасаться":{root:"sufghōl",pos:"verb"},"радоваться":{root:"thalmar",pos:"verb"},
"радуюсь":{root:"thalmar",pos:"verb"},"грустить":{root:"mōrmar",pos:"verb"},
"грущу":{root:"mōrmar",pos:"verb"},"печалиться":{root:"mōrmar",pos:"verb"},
"смеяться":{root:"thalmar",pos:"verb"},"смеюсь":{root:"thalmar",pos:"verb"},
"плакать":{root:"ākhaur",pos:"verb"},"плачу":{root:"ākhaur",pos:"verb"},
"размышлять":{root:"tsanur",pos:"verb"},"размышляю":{root:"tsanur",pos:"verb"},
"осознавать":{root:"tsanlān",pos:"verb"},"осознаю":{root:"tsanlān",pos:"verb"},
"вспоминаю":{root:"lānthal",pos:"verb"},"забываю":{root:"ānlān",pos:"verb"},
"забыл":{root:"ānlān",pos:"verb"},"доверять":{root:"tōkhalmar",pos:"verb"},
"жду":{root:"zhal",pos:"verb"},"ждут":{root:"zhal",pos:"verb"},
"чувствовать":{root:"thalmar",pos:"verb"},"чувствую":{root:"thalmar",pos:"verb"},
"ощущать":{root:"thalmar",pos:"verb"},"погибать":{root:"mōr",pos:"verb"},
"погибаю":{root:"mōr",pos:"verb"},"рождаться":{root:"khalur",pos:"verb"},
"рождаюсь":{root:"khalur",pos:"verb"},"процветать":{root:"khonur",pos:"verb"},
"процветаю":{root:"khonur",pos:"verb"},"уничтожать":{root:"sufmōr",pos:"verb"},
"уничтожаю":{root:"sufmōr",pos:"verb"},"плаваю":{root:"ākhanur",pos:"verb"},
"сидеть":{root:"sōlkōl",pos:"verb"},"сижу":{root:"sōlkōl",pos:"verb"},"сидит":{root:"sōlkōl",pos:"verb"},
"просыпаться":{root:"dzenur",pos:"verb"},"выходить":{root:"nurmōr",pos:"verb"},
"входить":{root:"nursen",pos:"verb"},"уходить":{root:"nurmōr",pos:"verb"},
"ухожу":{root:"nurmōr",pos:"verb"},"приходить":{root:"nursen",pos:"verb"},
"прихожу":{root:"nursen",pos:"verb"},"трудиться":{root:"xurmar",pos:"verb"},
"совершать":{root:"khalur",pos:"verb"},"отдавать":{root:"rōgmōr",pos:"verb"},
"находить":{root:"nurthal",pos:"verb"},"нахожу":{root:"nurthal",pos:"verb"},
"искать":{root:"nurthal",pos:"verb"},"ищу":{root:"nurthal",pos:"verb"},
"терять":{root:"ānthal",pos:"verb"},"теряю":{root:"ānthal",pos:"verb"},
"потерял":{root:"ānthal",pos:"verb"},"побеждать":{root:"marlān",pos:"verb"},
"побеждаю":{root:"marlān",pos:"verb"},"проигрывать":{root:"mōrlān",pos:"verb"},
"сражаться":{root:"urnur",pos:"verb"},"сражаюсь":{root:"urnur",pos:"verb"},
"биться":{root:"urnur",pos:"verb"},"бьюсь":{root:"urnur",pos:"verb"},
"защищать":{root:"lānīn",pos:"verb"},"защищаю":{root:"lānīn",pos:"verb"},
"спасать":{root:"lānīn",pos:"verb"},"спасаю":{root:"lānīn",pos:"verb"},
"хранить":{root:"lānīn",pos:"verb"},"храню":{root:"lānīn",pos:"verb"},
"беречь":{root:"lānīn",pos:"verb"},"открываю":{root:"tōkhur",pos:"verb"},
"закрывать":{root:"tōkhmōr",pos:"verb"},
"возвращаться":{root:"thalān",pos:"verb"},"возвращаюсь":{root:"thalān",pos:"verb"},
"потому":{root:"un",pos:"conj"},"поэтому":{root:"un",pos:"conj"},
"чтобы":{root:"un",pos:"conj"},"если":{root:"thōl",pos:"conj"},
"или":{root:"khan",pos:"conj"},"либо":{root:"khan",pos:"conj"},
"что-то":{root:"sha",pos:"pron"},"кто-то":{root:"ku",pos:"pron"},
"что-нибудь":{root:"sha",pos:"pron"},"кто-нибудь":{root:"ku",pos:"pron"},
"ничего":{root:"ān-sha",pos:"pron"},"самый":{root:"sufari",pos:"pron"},
"самая":{root:"sufari",pos:"pron"},"самое":{root:"sufari",pos:"pron"},
"самые":{root:"sufari",pos:"pron"},"самого":{root:"sufari",pos:"pron"},
"самой":{root:"sufari",pos:"pron"},"всё":{root:"tō",pos:"pron"},
"всё-таки":{root:"unmōr",pos:"adv"},
"пылинка":{root:"sur",pos:"noun"},"звёздочка":{root:"dzen",pos:"noun"},"огонёк":{root:"khō",pos:"noun"}
};

var LEXICON = Object.assign({}, LEXICON_DATA, NEW_WORDS);

/* ═══ EN → RU СЛОВАРЬ ═══ */
var EN_RU = {
'i':'я','me':'меня','you':'ты','he':'он','she':'она','it':'это','we':'мы','they':'они',
'my':'мой','your':'твой','his':'его','her':'её','our':'наш','their':'их',
'this':'это','that':'то','these':'эти','those':'те','some':'некоторые',
'be':'быть','am':'есть','is':'есть','are':'есть','was':'был','were':'были','been':'был',
'have':'иметь','has':'имеет','had':'имел','do':'делать','does':'делает','did':'делал','done':'сделан',
'say':'говорить','says':'говорит','said':'сказал','speak':'говорить','speaks':'говорит',
'see':'видеть','sees':'видит','saw':'видел','watch':'смотреть','watches':'смотрит',
'know':'знать','knows':'знает','knew':'знал','think':'думать','thinks':'думает','thought':'думал',
'go':'идти','goes':'идёт','went':'шёл','gone':'ушёл','come':'приходить','comes':'приходит','came':'пришёл',
'want':'хотеть','wants':'хочет','wanted':'хотел','like':'любить','likes':'любит','loved':'любил',
'love':'любить','loves':'любит','live':'жить','lives':'живёт','lived':'жил',
'die':'умирать','dies':'умирает','died':'умер','remember':'помнить','remembers':'помнит',
'forget':'забыть','forgets':'забывает','work':'работать','works':'работает','worked':'работал',
'play':'играть','plays':'играет','played':'играл','read':'читать','reads':'читает',
'write':'писать','writes':'пишет','wrote':'писал','build':'строить','builds':'строит','built':'построил',
'destroy':'разрушать','destroys':'разрушает','create':'создавать','creates':'создаёт',
'find':'найти','finds':'находит','found':'нашёл','give':'давать','gives':'даёт','gave':'дал',
'take':'брать','takes':'берёт','took':'взял','eat':'есть','eats':'ест','ate':'ел',
'drink':'пить','drinks':'пьёт','drank':'пил','sleep':'спать','sleeps':'спит','slept':'спал',
'run':'бежать','runs':'бежит','ran':'бежал','fly':'летать','flies':'летает','flew':'летал',
'walk':'ходить','walks':'ходит','sing':'петь','sings':'поёт','dance':'танцевать','dances':'танцует',
'help':'помогать','helps':'помогает','look':'смотреть','looks':'смотрит','listen':'слушать','listens':'слушает',
'understand':'понимать','understands':'понимает','believe':'верить','believes':'верит',
'hope':'надеяться','hopes':'надеется','fear':'бояться','fears':'боится',
'stand':'стоять','stands':'стоит','lie':'лежать','lies':'лежит','lay':'лежал',
'grow':'расти','grows':'растёт','grew':'рос','fall':'падать','falls':'падает','fell':'упал',
'rise':'подниматься','rises':'поднимается','open':'открывать','opens':'открывает','closed':'закрыл',
'mars':'марс','earth':'земля','land':'земля','world':'мир','planet':'планета',
'star':'звезда','stars':'звёзды','sky':'небо','sun':'солнце','moon':'луна',
'water':'вода','fire':'огонь','wind':'ветер','air':'воздух','ice':'лёд','snow':'снег',
'life':'жизнь','death':'смерть','memory':'память','soul':'душа','mind':'разум',
'man':'человек','woman':'женщина','child':'ребёнок','people':'люди','person':'человек',
'king':'король','queen':'королева','god':'бог','goddess':'богиня','priest':'жрец',
'warrior':'воин','hero':'герой','friend':'друг','enemy':'враг','family':'семья',
'city':'город','village':'деревня','house':'дом','home':'дом','palace':'дворец',
'temple':'храм','tower':'башня','wall':'стена','door':'дверь','window':'окно',
'stone':'камень','rock':'камень','metal':'металл','gold':'золото','silver':'серебро',
'clay':'глина','dust':'пыль','sand':'песок','soil':'почва','ground':'земля',
'river':'река','sea':'море','ocean':'океан','lake':'озеро','wave':'волна',
'mountain':'гора','hill':'холм','valley':'долина','desert':'пустыня','forest':'лес',
'tree':'дерево','flower':'цветок','grass':'трава','leaf':'лист','root':'корень',
'animal':'животное','bird':'птица','fish':'рыба','beast':'зверь','snake':'змея',
'wolf':'волк','horse':'конь','dog':'собака','lion':'лев','dragon':'дракон',
'book':'книга','letter':'письмо','word':'слово','words':'слова','language':'язык',
'song':'песня','music':'музыка','story':'история','tale':'сказка','myth':'миф',
'knowledge':'знание','wisdom':'мудрость','truth':'правда','faith':'вера',
'joy':'радость','sadness':'печаль','grief':'горе','anger':'гнев','peace':'покой','freedom':'свобода',
'day':'день','night':'ночь','morning':'утро','evening':'вечер','dawn':'рассвет',
'dusk':'закат','time':'время','year':'год','month':'месяц','week':'неделя',
'hour':'час','minute':'минута','moment':'момент','past':'прошлое','future':'будущее',
'number':'число','name':'имя','sign':'знак','symbol':'символ','secret':'тайна',
'light':'свет','dark':'тьма','shadow':'тень','color':'цвет','red':'красный',
'blue':'синий','green':'зелёный','yellow':'жёлтый','white':'белый','black':'чёрный',
'way':'путь','road':'дорога','journey':'путешествие','gate':'врата','bridge':'мост',
'beginning':'начало','end':'конец','first':'первый','last':'последний',
'great':'великий','ancient':'древний','new':'новый','old':'старый','young':'молодой',
'good':'хороший','bad':'плохой','big':'большой','small':'маленький','long':'длинный',
'strong':'сильный','weak':'слабый','fast':'быстрый','slow':'медленный',
'beautiful':'красивый','wise':'мудрый','brave':'храбрый','kind':'добрый',
'true':'истинный','false':'ложный','holy':'священный','sacred':'священный',
'best':'лучший','worst':'худший','better':'лучше','worse':'хуже',
'and':'и','or':'или','but':'но','if':'если','when':'когда','where':'где','why':'почему',
'how':'как','what':'что','who':'кто','which':'который','because':'потому',
'not':'не','no':'нет','yes':'да','very':'очень','too':'тоже','also':'также',
'only':'только','even':'даже','still':'всё ещё','already':'уже','again':'снова',
'here':'здесь','there':'там','now':'сейчас','then':'тогда','always':'всегда',
'never':'никогда','sometimes':'иногда','often':'часто','soon':'скоро',
'in':'в','on':'на','at':'у','to':'к','from':'от','of':'из','with':'с','without':'без',
'for':'для','by':'по','about':'о','under':'под','over':'над','before':'до','after':'после',
'every':'каждый','each':'каждый','many':'многие','much':'много',
'few':'мало','more':'больше','most':'самый','less':'меньше','least':'наименьший',
'up':'вверх','down':'вниз','left':'левый','right':'правый','north':'север',
'south':'юг','east':'восток','west':'запад','far':'далеко','near':'близко',
'hello':'привет','hi':'привет','hey':'привет','bye':'пока','goodbye':'прощай',
'thanks':'спасибо','thank':'спасибо','please':'пожалуйста','sorry':'извини',
'welcome':'добро пожаловать','ok':'хорошо'
};

/* ═══ ГОТОВЫЕ ФРАЗЫ ═══ */
var PHRASES = {
'привет':'Mar dzen','здравствуй':'Mar dzen','здравствуйте':'Mar dzen',
'добрый день':'Mar dzen','доброе утро':'Mar dzen sōl','добрый вечер':'Mar dzen khōl',
'до свидания':'Lān mar','прощай':'Lān mar','прощайте':'Ariya lān','пока':'Lān mar',
'спасибо':'Tsan lān','благодарю':'Tsan lān','благодарствую':'Tsan lān',
'пожалуйста':'Marzān thal','удачи':'Marzān thal','добро пожаловать':'Dzen sen',
'глина помнит':'Lān sur','глина помнит всё':'Lān sur tō',
'письмо из красной пыли':'Khalur khō sur',
'марсианская энциклопедия':'Tsankhō Marzān',
'красная пыль':'Khō sur','звезда смотрит':'Dzen thal',
'звезда умирает':'Dzen mōr','звезда умирает, глина помнит':'Dzen mōr, lān sur',
'всё-же марс лучше всех':'Un mōr Mars sufari tō',
'все-же марс лучше всех':'Un mōr Mars sufari tō',
'марс лучше всех':'Mars sufari tō',
'я разговариваю на лучшем языке':'An thalthu sen sufari thal',
'я говорю на лучшем языке':'An thalthu sen sufari thal',
'разговариваю на лучшем языке':'Thalthu sen sufari thal',
'на лучшем языке':'Sen sufari thal','лучший язык':'Sufari thal',
'лучший язык вселенной':'Sufari thal sūrdzen',
'марс — лучший':'Mars sufari','марс наш дом':'Mars an okh',
'я люблю марс':'An lānmar Mars','мы дети марса':'Anān khalur Mars',
'земля помнит':'Kōl lān','огонь горит':'Khō lān','вода живёт':'Ākha mar',
'ветер говорит':'Zal thalthu','звёзды смотрят':'Dzen thal',
'звёзды помнят всё':'Dzen lān tō','мы вместе':'Anān tō',
'я помню':'An lān','ты помнишь':'Ta lān','он помнит':'La lān',
'мы помним':'Anān lān','вы помните':'Tanān lān','они помнят':'Lanān lān',
'я знаю':'An tsan','ты знаешь':'Ta tsan','он знает':'La tsan',
'я живу':'An marlān','ты живёшь':'Ta marlān','он живёт':'La marlān',
'я умираю':'An mōr','ты умираешь':'Ta mōr',
'я люблю':'An lānmar','ты любишь':'Ta lānmar','он любит':'La lānmar',
'я говорю':'An thalthu','ты говоришь':'Ta thalthu','он говорит':'La thalthu',
'я иду':'An nur','ты идёшь':'Ta nur','он идёт':'La nur',
'я думаю':'An tsanur','ты думаешь':'Ta tsanur',
'мир помнит':'Nōkh lān','кровь помнит':'Marlān lān'
};

/* ═══ ИЕРОГЛИФЫ ═══ */
var GLYPHS = {
'm':'▭•••','n':'▭••','r':'⊙','l':'○','k':'▷','g':'◁','kh':'△','gh':'▽',
't':'|','d':'—','ts':'✖','dz':'ⴕ','th':'/','f':'Ꙙ','x':'♢','s':'Ꝉ','z':'I',
'p':'p','b':'b','v':'v','y':'Y','c':'ꝇ','j':'꜡','q':'Ꚛ',
'a':'՚','ā':'¬','o':'ᵕ','ō':'ᵔ','u':'°','ū':'ˉˉ','i':'↯','e':'Ƨ','ē':'Ƨ̱'
};
function toGlyphs(text){
  if(!text)return '';
  return text.split(' ').map(function(w){
    if(!w)return '';
    var out='',i=0;
    while(i<w.length){
      var two=w.substr(i,2).toLowerCase();
      if(GLYPHS[two]){out+=GLYPHS[two];i+=2;continue}
      var c=w[i].toLowerCase();
      out+=GLYPHS[c]||c;
      i++;
    }
    return out;
  }).join(' ');
}

/* ═══ ЛЕММАТИЗАЦИЯ ═══ */
var ENDINGS=['иями','иях','ией','иям','ием','ами','ями','ах','ях','ой','ей',
'ые','ие','ыми','ими','ого','его','ому','ему','ая','яя','ое','ее','ый','ий','ов','ев','ьи','ам','ям','ом','ем',
'ать','ять','еть','ить','ыть','уть','оть','ти','чь',
'аю','яю','ею','ую','ию','аешь','яешь','еешь','уешь','иешь',
'ает','яет','еет','ует','иет','аем','яем','еем','уем','ием',
'аете','яете','еете','уете','иете','ают','яют','еют','уют','иют',
'ал','ял','ел','ил','ыл','ул','ол','ала','яла','ела','ила','ыла','ула','ола',
'али','яли','ели','или','ыли','ули','оли','ись','ться','тся','шься','мся','тесь','атся','ятся','ется','ится',
'ы','и','а','я','у','ю','е','о','ь','й'];
function stripEnding(w){
  for(var i=0;i<ENDINGS.length;i++){
    var e=ENDINGS[i];
    if(w.length>e.length+2 && w.slice(-e.length)===e)return w.slice(0,-e.length);
  }
  return w;
}
function findInLexicon(word){
  var norm=word.toLowerCase().replace(/ё/g,'е');
  if(LEXICON[norm])return{found:true,entry:LEXICON[norm],lemma:norm};
  var stem=stripEnding(norm);
  if(LEXICON[stem])return{found:true,entry:LEXICON[stem],lemma:stem};
  var variants=[stem+'а',stem+'я',stem+'о',stem+'е',stem+'ь',stem+'ий',stem+'ая',stem+'ать',stem+'ять',stem+'еть',stem+'ить',stem+'ыть',stem+'уть'];
  for(var i=0;i<variants.length;i++){
    if(LEXICON[variants[i]])return{found:true,entry:LEXICON[variants[i]],lemma:variants[i]};
  }
  return{found:false};
}

/* ═══ АВТО-ГЕНЕРАЦИЯ ═══ */
var MORPHEMES={'вод':'ākha','земл':'kōl','огн':'khō','звезд':'dzen','звёзд':'dzen','косм':'dzen','неб':'dzen',
'жизн':'mar','смерт':'mōr','мер':'mōr','памят':'lān','дом':'okh','город':'okh',
'корол':'rōg','царь':'rōg','мест':'sen','человек':'mārīn','люд':'mārīn','марсиан':'marzān',
'камн':'ghar','тен':'ghōl','свет':'dzēn','знан':'tsan','хран':'lānīn','глин':'sur','пыл':'sur',
'движ':'nur','путь':'nur','смотр':'thal','говор':'thalthu','велик':'suf','древ':'xal',
'нов':'khal','избран':'ari','жив':'mar','ветер':'zal','мор':'thal','берег':'kōlākha',
'облак':'oblako','правд':'thaltsan','надежд':'lānthōl','вер':'khalmar','свобод':'nurariya',
'сил':'khōlān','смысл':'thaltsan','тайн':'nōkhlān','войн':'mōrkhō','мир':'nōkh',
'год':'amār','дн':'sōl','ноч':'nōkh','врем':'amār','друг':'tō','враг':'ān',
'воин':'ur','учит':'tsanīn','стро':'okhar','созда':'khalur','дела':'khalur',
'разруш':'mōrkhō','писа':'khōs','игра':'thalur','петь':'zalkhō','танц':'thalur',
'люб':'lānmar','дума':'tsanur','поним':'tsanlān','академ':'tsan-sen','библиот':'lan-sen'};
var TRANS={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
function translit(w){var r='';for(var i=0;i<w.length;i++)r+=TRANS[w[i]]||w[i];return r;}
function stylize(w){w=w.replace(/aa/g,'ā').replace(/oo/g,'ō').replace(/uu/g,'ū').replace(/ee/g,'ē').replace(/ii/g,'ī');if(w.endsWith('a'))w=w.slice(0,-1)+'ā';else if(w.endsWith('o'))w=w.slice(0,-1)+'ō';else if(w.endsWith('u'))w=w.slice(0,-1)+'ū';if(w.length>10)w=w.slice(0,10);return w;}
function findMorph(w){var best=null,bl=0;for(var m in MORPHEMES){if(w.indexOf(m)===0 && m.length>bl){best=MORPHEMES[m];bl=m.length;}}if(best)return best;for(var m2 in MORPHEMES){if(m2.length>=4 && w.indexOf(m2)!==-1)return MORPHEMES[m2];}return null;}
function generateRoot(word){var stem=stripEnding(word);var mars=findMorph(stem)||findMorph(word);if(mars)return mars;return stylize(translit(stem));}

/* ═══ EN → RU ═══ */
function isEnglishText(text){
  var words=text.toLowerCase().split(/\s+/).filter(function(w){return w.length>0});
  if(!words.length)return false;
  var enCount=0;
  words.forEach(function(w){
    var clean=w.replace(/[^a-z]/g,'');
    if(clean.length>1 && EN_RU[clean])enCount++;
    else if(/^[a-z]+$/.test(clean) && clean.length>2)enCount+=0.5;
  });
  return enCount/words.length>0.4;
}
function translateEnToRu(text){
  var words=text.split(/(\s+)/);
  var translated=[],dictionary={};
  words.forEach(function(part){
    if(/^\s+$/.test(part)){translated.push(part);return}
    var clean=part.replace(/[^a-zA-Z']/g,'').toLowerCase();
    if(EN_RU[clean]){translated.push(EN_RU[clean]);dictionary[clean]=EN_RU[clean];}
    else translated.push(part);
  });
  return{text:translated.join(''),dictionary:dictionary};
}

/* ═══ ОСНОВНОЙ ПЕРЕВОД ═══ */
var PREPOSITIONS=['на','в','у','к','от','из','для','без','через','по','о','об','с','со','за','под','над','перед','между','возле','около','мимо','вокруг'];
function checkPhrase(text){
  var norm=text.toLowerCase().replace(/[.,!?;:]/g,'').trim().replace(/ё/g,'е');
  var keys=Object.keys(PHRASES).sort(function(a,b){return b.length-a.length});
  for(var i=0;i<keys.length;i++){
    var k=keys[i].replace(/ё/g,'е');
    if(norm===k)return{found:true,translation:PHRASES[keys[i]]};
    if(k.length>8 && norm.indexOf(k)!==-1)return{found:true,translation:PHRASES[keys[i]]};
  }
  return{found:false};
}
function doTranslate(){
  var input=document.getElementById('t-input').value.trim();
  if(!input)return;
  var btn=document.getElementById('t-translate-btn');
  btn.classList.add('loading');btn.disabled=true;
  setTimeout(function(){
    var result=performTranslation(input);
    btn.classList.remove('loading');btn.disabled=false;
    showResult(result);
  },120);
}
function performTranslation(input){
  var isEn=isEnglishText(input);
  var ruText=input,enDict={};
  if(isEn){var enRes=translateEnToRu(input);ruText=enRes.text;enDict=enRes.dictionary;}
  var phraseRes=checkPhrase(ruText);
  if(phraseRes.found){
    return{input:input,ruText:ruText,isEn:isEn,enDict:enDict,translation:phraseRes.translation,processed:[],unknown:[],isPhrase:true};
  }
  var rawWords=ruText.split(/\s+/).filter(function(w){return w.length>0});
  var processed=[],unknown=[];
  rawWords.forEach(function(w){
    var clean=w.replace(/[^а-яa-zё]/gi,'').toLowerCase().replace(/ё/g,'е');
    if(PREPOSITIONS.indexOf(clean)!==-1)return;
    if(clean.length<1)return;
    var res=findInLexicon(clean);
    if(res.found)processed.push({word:w,root:res.entry.root,pos:res.entry.pos});
    else{var gen=generateRoot(clean);processed.push({word:w,root:gen,pos:'generated'});unknown.push(w+'>'+gen);}
  });
  if(processed.length===0)return{input:input,ruText:ruText,isEn:isEn,enDict:enDict,translation:'',processed:[],unknown:[],error:'Нет слов'};
  var verb=null,verbIdx=-1;
  for(var i=0;i<processed.length;i++){if(processed[i].pos==='verb'){verbIdx=i;verb=processed[i];break;}}
  var subject=verbIdx!==-1?processed.slice(0,verbIdx):processed;
  var objects=verbIdx!==-1?processed.slice(verbIdx+1):[];
  var resultWords=[];
  subject.forEach(function(w){resultWords.push(w.root)});
  objects.forEach(function(w){resultWords.push(w.root)});
  if(verb)resultWords.push(verb.root);
  var hasNeg=rawWords.some(function(w){var c=w.replace(/[^а-яa-zё]/gi,'').toLowerCase().replace(/ё/g,'е');return c==='не'||c==='нет';});
  if(hasNeg && verb){var idx=resultWords.indexOf(verb.root);if(idx!==-1)resultWords.splice(idx+1,0,'ān');}
  if(input.indexOf('?')!==-1)resultWords.push('kha');
  var lower=ruText.toLowerCase();
  if((lower.indexOf('был')!==-1||lower.indexOf('была')!==-1||lower.indexOf('были')!==-1) && verb){
    var idx2=resultWords.indexOf(verb.root);
    if(idx2!==-1){var p=idx2+1;if(resultWords[p]==='ān')p++;resultWords.splice(p,0,'nu');}
  }
  if((lower.indexOf('будет')!==-1||lower.indexOf('будут')!==-1) && verb){
    var idx3=resultWords.indexOf(verb.root);
    if(idx3!==-1){var p2=idx3+1;if(resultWords[p2]==='ān')p2++;resultWords.splice(p2,0,'shu');}
  }
  var modals={'могу':'xan','может':'xan','можешь':'xan','хочу':'shar','хочет':'shar','хочешь':'shar','должен':'mun','должна':'mun','должны':'mun'};
  for(var k in modals){
    if(lower.indexOf(k)!==-1 && verb){
      var idx4=resultWords.indexOf(verb.root);
      if(idx4!==-1)resultWords[idx4]=verb.root+modals[k];
      break;
    }
  }
  return{input:input,ruText:ruText,isEn:isEn,enDict:enDict,translation:resultWords.join(' '),processed:processed,unknown:unknown,isPhrase:false};
}

/* ═══ UI ═══ */
var showGlyphs=false;
function showResult(result){
  var resultEl=document.getElementById('t-result');
  var glossEl=document.getElementById('t-gloss');
  var glossBlock=document.getElementById('t-gloss-block');
  var actions=document.getElementById('t-actions');
  if(result.error){
    resultEl.textContent=result.error;
    resultEl.classList.remove('placeholder');
    glossBlock.style.display='none';actions.style.display='none';
    return;
  }
  var displayText=showGlyphs?toGlyphs(result.translation):result.translation;
  resultEl.innerHTML=displayText+(result.isEn?'<span class="t-trans-hint">🇬🇧 English → 🇷🇺 Русский → 🪐 Марсианский</span>':'');
  resultEl.classList.remove('placeholder');
  var parts=[];
  if(result.isEn && Object.keys(result.enDict).length>0){
    var enParts=[];
    for(var k in result.enDict)enParts.push('<span class="t-gloss-en">'+k+'</span>→'+result.enDict[k]);
    parts.push('<span class="t-gloss-tag">EN→RU</span>'+enParts.join(' · '));
  }
  if(result.processed.length>0)parts.push(result.processed.map(function(p){return p.word+'→'+p.root;}).join(' '));
  if(result.isPhrase)parts.unshift('<span class="t-gloss-tag">Готовая фраза</span>');
  if(parts.length){glossEl.innerHTML=parts.join('<br>');glossBlock.style.display='block';}
  else glossBlock.style.display='none';
  actions.style.display='flex';
  saveHistory(result);
}

/* ═══ ИСТОРИЯ ═══ */
function getHistory(){try{var h=localStorage.getItem(STORAGE_KEY);return h?JSON.parse(h):[];}catch(e){return[]}}
function saveHistory(result){
  if(!result.translation)return;
  var h=getHistory();
  h.unshift({ts:Date.now(),input:result.input.slice(0,100),ru:result.ruText.slice(0,100),mars:result.translation,isEn:result.isEn});
  h=h.slice(0,MAX_HISTORY);
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(h))}catch(e){}
  renderHistory();
}
function renderHistory(){
  var h=getHistory();
  var wrap=document.getElementById('t-history');
  var list=document.getElementById('t-history-list');
  if(!h.length){wrap.style.display='none';return}
  wrap.style.display='block';
  list.innerHTML=h.map(function(item,i){
    var time=new Date(item.ts);
    var ts=time.getHours().toString().padStart(2,'0')+':'+time.getMinutes().toString().padStart(2,'0');
    return '<div class="t-history-item" data-idx="'+i+'" style="animation-delay:'+Math.min(i*.03,.3)+'s">'+
      '<div class="t-history-icon">'+(item.isEn?'🇬🇧':'🇷🇺')+'</div>'+
      '<div class="t-history-info"><div class="t-history-ru">'+escapeHtml(item.ru)+'</div><div class="t-history-mars">'+escapeHtml(item.mars)+'</div></div>'+
      '<div class="t-history-time">'+ts+'</div></div>';
  }).join('');
  list.querySelectorAll('.t-history-item').forEach(function(el){
    el.onclick=function(){
      var idx=parseInt(el.dataset.idx,10);
      var item=h[idx];
      if(!item)return;
      document.getElementById('t-input').value=item.input;
      updateCounter();
      setTimeout(doTranslate,150);
    };
  });
}
function clearHistory(){
  try{localStorage.removeItem(STORAGE_KEY)}catch(e){}
  renderHistory();
  toast('История очищена','info');
}

/* ═══ HELPERS ═══ */
function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
function toast(msg,type){
  type=type||'info';
  var el=document.getElementById('t-toast');
  el.className='t-toast '+type;
  el.textContent=msg;
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t=setTimeout(function(){el.classList.remove('show');el.classList.add('hide');setTimeout(function(){el.classList.remove('hide')},400);},2400);
}
function updateCounter(){
  var input=document.getElementById('t-input').value;
  var counter=document.getElementById('t-counter');
  var wordCount=document.getElementById('t-word-count');
  var len=input.length;
  counter.textContent=len+' / 500 символов';
  counter.classList.remove('warn','danger');
  if(len>450)counter.classList.add('danger');
  else if(len>350)counter.classList.add('warn');
  var words=input.trim()?input.trim().split(/\s+/).length:0;
  wordCount.textContent=words+' слов';
  var tag=document.getElementById('t-lang-tag');
  if(!input.trim()){tag.textContent='🌐 RU / EN';tag.className='t-lang-tag';}
  else if(isEnglishText(input)){tag.textContent='🇬🇧 English';tag.className='t-lang-tag detected-en';}
  else{tag.textContent='🇷🇺 Русский';tag.className='t-lang-tag detected-ru';}
}

/* ═══ BINDINGS ═══ */
document.getElementById('t-translate-btn').onclick=doTranslate;
document.getElementById('t-clear-btn').onclick=function(){
  document.getElementById('t-input').value='';
  document.getElementById('t-result').textContent='Здесь появится перевод...';
  document.getElementById('t-result').classList.add('placeholder');
  document.getElementById('t-gloss-block').style.display='none';
  document.getElementById('t-actions').style.display='none';
  updateCounter();
};
document.getElementById('t-glyph-btn').onclick=function(){
  showGlyphs=!showGlyphs;
  var btn=this;
  if(showGlyphs){btn.textContent='📝 Латиница';btn.classList.remove('accent');btn.classList.add('secondary');}
  else{btn.textContent='🔮 Иероглифы';btn.classList.remove('secondary');btn.classList.add('accent');}
  var input=document.getElementById('t-input').value.trim();
  if(input)doTranslate();
};
document.getElementById('t-copy').onclick=function(){
  var text=document.getElementById('t-result').innerText.replace(/\n.*$/,'').trim();
  if(!text){toast('Нечего копировать','info');return}
  copyToClipboard(text);
};
document.getElementById('t-copy-glyphs').onclick=function(){
  var res=performTranslation(document.getElementById('t-input').value.trim());
  if(!res.translation){toast('Нечего копировать','info');return}
  copyToClipboard(toGlyphs(res.translation));
};
document.getElementById('t-share').onclick=function(){
  var text=document.getElementById('t-result').innerText.replace(/\n.*$/,'').trim();
  if(!text){toast('Нечего отправлять','info');return}
  var url=location.origin+location.pathname+'?q='+encodeURIComponent(document.getElementById('t-input').value.trim());
  if(navigator.share)navigator.share({title:'Марсианский перевод',text:text,url:url}).catch(function(){});
  else{copyToClipboard(url);toast('🔗 Ссылка скопирована','success');}
};
document.getElementById('t-more').onclick=doTranslate;
document.getElementById('t-history-clear').onclick=clearHistory;
function copyToClipboard(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){
      toast('✅ Скопировано','success');
      var btn=document.getElementById('t-copy');
      btn.classList.add('copied');btn.textContent='✅ Скопировано';
      setTimeout(function(){btn.classList.remove('copied');btn.textContent='📋 Копировать';},1800);
    },function(){fallbackCopy(text)});
  }else fallbackCopy(text);
}
function fallbackCopy(text){
  try{
    var ta=document.createElement('textarea');
    ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';
    document.body.appendChild(ta);ta.select();
    document.execCommand('copy');ta.remove();
    toast('✅ Скопировано','success');
  }catch(e){toast('Ошибка','error')}
}
document.getElementById('t-input').addEventListener('input',updateCounter);
document.getElementById('t-input').addEventListener('keydown',function(e){
  if(e.key==='Enter' && (e.ctrlKey||e.metaKey)){e.preventDefault();doTranslate();}
});
(function(){
  try{
    var p=new URLSearchParams(location.search);
    var q=p.get('q');
    if(q){document.getElementById('t-input').value=q;updateCounter();setTimeout(doTranslate,300);}
  }catch(e){}
})();
updateCounter();
renderHistory();
console.log('🪐 Переводчик v4. Слов: '+Object.keys(LEXICON).length+', EN: '+Object.keys(EN_RU).length+', Фраз: '+Object.keys(PHRASES).length);

})();
</script>
