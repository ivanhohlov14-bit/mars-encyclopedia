---
title: Оплата не прошла
comments: false
hide:
  - navigation
  - toc
---

<div id="error-app">

<!-- ═══ ФОН ═══ -->
<div class="pe-bg">
  <div class="pe-stars">
    <div class="pe-star"></div><div class="pe-star"></div><div class="pe-star"></div>
    <div class="pe-star"></div><div class="pe-star"></div><div class="pe-star"></div>
    <div class="pe-star"></div><div class="pe-star"></div><div class="pe-star"></div>
    <div class="pe-star"></div><div class="pe-star"></div><div class="pe-star"></div>
    <div class="pe-star"></div><div class="pe-star"></div><div class="pe-star"></div>
    <div class="pe-star"></div><div class="pe-star"></div>
  </div>
  <div class="pe-orb pe-orb-a"></div>
  <div class="pe-orb pe-orb-b"></div>
  <div class="pe-orb pe-orb-c"></div>
</div>

<!-- ═══ HERO ═══ -->
<div class="pe-hero">
  <div class="pe-icon-wrap">
    <div class="pe-ring pe-ring-1"></div>
    <div class="pe-ring pe-ring-2"></div>
    <div class="pe-icon">
      <svg viewBox="0 0 52 52" class="pe-icon-svg">
        <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" stroke-width="2" opacity=".2"/>
        <path d="M18 18 L34 34" fill="none" stroke="currentColor" stroke-width="4"
              stroke-linecap="round" class="pe-x-mark-1"/>
        <path d="M34 18 L18 34" fill="none" stroke="currentColor" stroke-width="4"
              stroke-linecap="round" class="pe-x-mark-2"/>
      </svg>
    </div>
  </div>

  <h1 class="pe-title">Оплата не прошла 😔</h1>
  <p class="pe-sub">Платёж был отменён или прерван. Деньги не списаны — можешь попробовать ещё раз.</p>

  <div class="pe-reasons">
    <div class="pe-reason">
      <span class="pe-reason-icon">💳</span>
      <span>Недостаточно средств</span>
    </div>
    <div class="pe-reason">
      <span class="pe-reason-icon">⏱️</span>
      <span>Истекло время оплаты</span>
    </div>
    <div class="pe-reason">
      <span class="pe-reason-icon">🚫</span>
      <span>Платёж отклонён банком</span>
    </div>
    <div class="pe-reason">
      <span class="pe-reason-icon">✕</span>
      <span>Закрыта страница оплаты</span>
    </div>
  </div>
</div>

<!-- ═══ ПРОВЕРКА ═══ -->
<div class="pe-check" id="pe-check" style="display:none;">
  <div class="pe-check-icon">ℹ️</div>
  <div class="pe-check-body">
    <div class="pe-check-title">Хорошая новость!</div>
    <div class="pe-check-text">Даже если деньги списались — они <strong>вернутся автоматически</strong> в течение 3–5 дней.</div>
  </div>
</div>

<!-- ═══ КНОПКИ ═══ -->
<div class="pe-actions">
  <a href="/shop/" class="pe-btn pe-btn-primary">🔄 Попробовать снова</a>
  <a href="/feedback/" class="pe-btn pe-btn-outline">💬 Написать в поддержку</a>
  <a href="/" class="pe-btn pe-btn-outline">🏠 На главную</a>
</div>

<!-- ═══ FAQ ═══ -->
<div class="pe-faq">
  <details class="pe-faq-item">
    <summary><span>❓ Деньги списались, но товар не пришёл</span><span class="pe-faq-chev">▸</span></summary>
    <div class="pe-faq-body">
      Если оплата <strong>успешно прошла</strong> — товар зачислится сам, обычно в течение минуты.
      Обнови <a href="/profile/">профиль</a> через пару минут.
      Если через 15 минут ничего не появилось — напиши нам.
    </div>
  </details>

  <details class="pe-faq-item">
    <summary><span>❓ Деньги списались, но оплата «не прошла»</span><span class="pe-faq-chev">▸</span></summary>
    <div class="pe-faq-body">
      Такое бывает при сбое на стороне банка. Деньги <strong>вернутся автоматически</strong>
      в течение <strong>3–5 рабочих дней</strong>. Ничего делать не нужно.
    </div>
  </details>

  <details class="pe-faq-item">
    <summary><span>❓ Как попробовать оплатить ещё раз?</span><span class="pe-faq-chev">▸</span></summary>
    <div class="pe-faq-body">
      Просто нажми <strong>«🔄 Попробовать снова»</strong> — вернёшься в магазин,
      сможешь снова выбрать товар и оплатить.
    </div>
  </details>

  <details class="pe-faq-item">
    <summary><span>❓ Куда написать, если проблема повторяется?</span><span class="pe-faq-chev">▸</span></summary>
    <div class="pe-faq-body">
      Пиши на <a href="mailto:mars-wiki@yandex.ru">mars-wiki@yandex.ru</a>.
      Опиши проблему и, если есть, приложи скриншот ошибки или номер платежа из банка.
    </div>
  </details>
</div>

</div>

<style>
/* ═══ ROOT ═══ */
#error-app{
  position:relative;
  min-height:100vh;
  padding:60px 16px 80px;
  font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
  color:#fff;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  align-items:center;
  background:#0a0a1e;
  -webkit-tap-highlight-color:transparent;
}
#error-app *{box-sizing:border-box}
#error-app a{text-decoration:none!important;border-bottom:none!important}

/* ═══ ФОН ═══ */
.pe-bg{
  position:absolute;inset:0;
  background:
    radial-gradient(circle at 20% 30%, rgba(231,76,60,.28), transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(230,126,34,.2), transparent 55%),
    linear-gradient(135deg,#0a0a1e 0%,#1f0f1a 40%,#2d1a1a 70%,#1a0f1e 100%);
  z-index:0;
}
.pe-stars{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.pe-star{
  position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;
  box-shadow:0 0 6px #fff;
  animation:peStar 3.5s ease-in-out infinite;
}
.pe-star:nth-child(1){top:8%;left:12%;animation-delay:0s}
.pe-star:nth-child(2){top:15%;left:28%;animation-delay:.4s;width:1.5px;height:1.5px}
.pe-star:nth-child(3){top:22%;left:45%;animation-delay:.9s}
.pe-star:nth-child(4){top:10%;left:62%;animation-delay:1.4s}
.pe-star:nth-child(5){top:18%;left:78%;animation-delay:.6s;width:1.5px;height:1.5px}
.pe-star:nth-child(6){top:32%;left:88%;animation-delay:1.1s}
.pe-star:nth-child(7){top:45%;left:10%;animation-delay:.3s}
.pe-star:nth-child(8){top:55%;left:22%;animation-delay:1.8s;width:1.5px;height:1.5px}
.pe-star:nth-child(9){top:68%;left:15%;animation-delay:2.1s}
.pe-star:nth-child(10){top:75%;left:35%;animation-delay:.5s}
.pe-star:nth-child(11){top:82%;left:58%;animation-delay:1.3s}
.pe-star:nth-child(12){top:72%;left:78%;animation-delay:.8s;width:1.5px;height:1.5px}
.pe-star:nth-child(13){top:88%;left:90%;animation-delay:1.6s}
.pe-star:nth-child(14){top:5%;left:5%;animation-delay:2s;width:1.5px;height:1.5px}
.pe-star:nth-child(15){top:40%;left:52%;animation-delay:.7s}
.pe-star:nth-child(16){top:60%;left:88%;animation-delay:1.9s}
.pe-star:nth-child(17){top:92%;left:18%;animation-delay:1.5s}

.pe-orb{
  position:absolute;border-radius:50%;
  filter:blur(80px);pointer-events:none;
  opacity:.5;
}
.pe-orb-a{
  top:-100px;left:-100px;width:400px;height:400px;
  background:radial-gradient(circle,rgba(231,76,60,.5),transparent 70%);
  animation:peFloat 12s ease-in-out infinite;
}
.pe-orb-b{
  bottom:-100px;right:-100px;width:500px;height:500px;
  background:radial-gradient(circle,rgba(230,126,34,.35),transparent 70%);
  animation:peFloat 14s ease-in-out infinite reverse;
}
.pe-orb-c{
  top:40%;left:40%;width:300px;height:300px;
  background:radial-gradient(circle,rgba(155,89,182,.25),transparent 70%);
  animation:peFloat 10s ease-in-out infinite;
}

/* ═══ HERO ═══ */
.pe-hero{
  position:relative;
  z-index:2;
  text-align:center;
  max-width:620px;
  width:100%;
  margin-bottom:28px;
  animation:peFadeIn .8s cubic-bezier(.16,1,.3,1);
}

/* Иконка X */
.pe-icon-wrap{
  position:relative;
  width:140px;height:140px;
  margin:0 auto 24px;
}
.pe-icon{
  position:absolute;
  inset:20px;
  border-radius:50%;
  background:linear-gradient(135deg,#e74c3c,#c0392b);
  display:flex;align-items:center;justify-content:center;
  box-shadow:
    0 0 0 4px rgba(255,255,255,.08),
    0 20px 60px rgba(231,76,60,.55),
    0 0 80px rgba(231,76,60,.4);
  animation:peIconShake .8s cubic-bezier(.36,.07,.19,.97) .3s both;
  z-index:2;
}
.pe-icon-svg{
  width:70px;height:70px;
  color:#fff;
}
.pe-x-mark-1,
.pe-x-mark-2{
  stroke-dasharray:24;
  stroke-dashoffset:24;
}
.pe-x-mark-1{animation:peDraw .5s cubic-bezier(.16,1,.3,1) .8s forwards}
.pe-x-mark-2{animation:peDraw .5s cubic-bezier(.16,1,.3,1) 1.1s forwards}

.pe-ring{
  position:absolute;inset:0;
  border-radius:50%;
  border:2px solid rgba(231,76,60,.5);
  animation:peRing 2s ease-out infinite;
}
.pe-ring-2{animation-delay:.6s}

/* Заголовок */
.pe-title{
  font-size:clamp(1.7rem,4vw,2.4rem);
  font-weight:900;
  margin:0 0 14px;
  letter-spacing:-.5px;
  background:linear-gradient(90deg,#fff 0%,#ff8a80 25%,#fff 50%,#ff8a80 75%,#fff 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:peShine 5s linear infinite;
  line-height:1.15;
}
.pe-sub{
  font-size:1rem;
  line-height:1.6;
  opacity:.9;
  margin:0 0 24px;
  max-width:480px;
  margin-left:auto;margin-right:auto;
}

/* Причины */
.pe-reasons{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
  gap:10px;
  max-width:560px;
  margin:0 auto;
  animation:peFadeIn .6s ease .5s both;
}
.pe-reason{
  display:flex;align-items:center;gap:10px;
  padding:12px 14px;
  border-radius:12px;
  background:rgba(255,255,255,.06);
  backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.1);
  font-size:.82rem;
  font-weight:700;
  text-align:left;
  transition:all .25s;
}
.pe-reason:hover{
  background:rgba(255,255,255,.1);
  border-color:rgba(231,76,60,.4);
  transform:translateY(-2px);
}
.pe-reason-icon{
  font-size:1.2rem;
  flex-shrink:0;
}

/* ═══ ПРОВЕРКА ═══ */
.pe-check{
  position:relative;
  z-index:2;
  display:flex;gap:14px;align-items:flex-start;
  padding:18px 22px;
  border-radius:16px;
  background:linear-gradient(135deg,rgba(52,152,219,.15),rgba(41,128,185,.08));
  border-left:4px solid #3498db;
  max-width:520px;
  width:100%;
  margin-bottom:24px;
  animation:peFadeIn .6s ease .6s both;
}
.pe-check-icon{
  font-size:1.6rem;flex-shrink:0;line-height:1;
  margin-top:2px;
}
.pe-check-body{flex:1;min-width:0}
.pe-check-title{
  font-size:.95rem;font-weight:900;
  margin-bottom:6px;
  color:#87ceeb;
}
.pe-check-text{
  font-size:.86rem;
  line-height:1.6;
  opacity:.9;
}
.pe-check-text strong{color:#87ceeb;font-weight:900}

/* ═══ ДЕЙСТВИЯ ═══ */
.pe-actions{
  position:relative;z-index:2;
  display:flex;gap:10px;flex-wrap:wrap;
  justify-content:center;
  margin-bottom:40px;
  max-width:620px;
  width:100%;
  animation:peFadeIn .6s ease .3s both;
}
.pe-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:14px 26px;
  border-radius:14px;
  font-size:.92rem;font-weight:800;
  font-family:inherit;
  cursor:pointer;
  transition:all .3s cubic-bezier(.16,1,.3,1);
  border:2px solid transparent;
  min-width:150px;
  flex:1;
}
.pe-btn-primary{
  background:linear-gradient(135deg,#e74c3c,#c0392b);
  color:#fff;
  box-shadow:0 12px 32px -6px rgba(231,76,60,.55);
}
.pe-btn-primary:hover{
  transform:translateY(-2px);
  box-shadow:0 18px 40px -6px rgba(231,76,60,.75);
}
.pe-btn-outline{
  background:rgba(255,255,255,.08);
  color:#fff;
  border-color:rgba(255,255,255,.2);
  backdrop-filter:blur(10px);
}
.pe-btn-outline:hover{
  background:rgba(255,255,255,.15);
  transform:translateY(-2px);
}
.pe-btn:active{transform:translateY(0) scale(.98)}

/* ═══ FAQ ═══ */
.pe-faq{
  position:relative;z-index:2;
  max-width:620px;
  width:100%;
  display:flex;flex-direction:column;
  gap:10px;
  animation:peFadeIn .6s ease .5s both;
}
.pe-faq-item{
  background:rgba(255,255,255,.06);
  backdrop-filter:blur(10px);
  border-radius:14px;
  border:1px solid rgba(255,255,255,.1);
  overflow:hidden;
  transition:all .3s;
}
.pe-faq-item:hover{border-color:rgba(255,255,255,.2)}
.pe-faq-item[open]{
  background:rgba(255,255,255,.1);
  border-color:rgba(255,138,128,.4);
}
.pe-faq-item summary{
  display:flex;justify-content:space-between;align-items:center;
  gap:14px;
  padding:16px 20px;
  cursor:pointer;
  font-size:.92rem;font-weight:800;
  list-style:none;user-select:none;
}
.pe-faq-item summary::-webkit-details-marker{display:none}
.pe-faq-chev{
  color:#ff8a80;
  transition:transform .3s;
  font-size:1rem;
}
.pe-faq-item[open] .pe-faq-chev{transform:rotate(90deg)}
.pe-faq-body{
  padding:0 20px 18px;
  font-size:.86rem;
  line-height:1.7;
  opacity:.85;
  animation:peFadeIn .3s ease;
}
.pe-faq-body a{
  color:#ff8a80;
  font-weight:800;
  text-decoration:underline!important;
}
.pe-faq-body strong{color:#ff8a80;font-weight:900}

/* ═══ АНИМАЦИИ ═══ */
@keyframes peFadeIn{
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes peFloat{
  0%,100%{transform:translate(0,0) scale(1)}
  50%{transform:translate(20px,-30px) scale(1.1)}
}
@keyframes peStar{
  0%,100%{opacity:.3;transform:scale(1)}
  50%{opacity:1;transform:scale(1.4)}
}
@keyframes peShine{
  0%{background-position:-200% center}
  100%{background-position:200% center}
}
@keyframes peRing{
  0%{transform:scale(1);opacity:.8}
  100%{transform:scale(1.6);opacity:0}
}
@keyframes peIconShake{
  0%{transform:scale(.3);opacity:0}
  20%{transform:scale(1.05) translateX(-4px)}
  40%{transform:scale(1.05) translateX(4px)}
  60%{transform:scale(1.05) translateX(-3px)}
  80%{transform:scale(1.05) translateX(3px)}
  100%{transform:scale(1) translateX(0);opacity:1}
}
@keyframes peDraw{
  to{stroke-dashoffset:0}
}

/* ═══ MOBILE ═══ */
@media (max-width:600px){
  #error-app{padding:40px 12px 60px}
  .pe-icon-wrap{width:110px;height:110px}
  .pe-icon{inset:16px}
  .pe-icon-svg{width:56px;height:56px}
  .pe-title{font-size:1.5rem}
  .pe-sub{font-size:.9rem}
  .pe-reasons{grid-template-columns:1fr 1fr;gap:8px}
  .pe-reason{padding:10px 12px;font-size:.76rem;gap:8px}
  .pe-reason-icon{font-size:1.05rem}
  .pe-check{padding:14px 16px;gap:10px}
  .pe-check-icon{font-size:1.3rem}
  .pe-check-title{font-size:.88rem}
  .pe-check-text{font-size:.8rem}
  .pe-actions{gap:8px}
  .pe-btn{padding:12px 20px;font-size:.85rem;min-width:0}
  .pe-faq-item summary{padding:14px 16px;font-size:.85rem}
  .pe-faq-body{padding:0 16px 16px;font-size:.8rem}
}

/* ═══ REDUCED MOTION ═══ */
@media (prefers-reduced-motion: reduce){
  #error-app *,#error-app *::before,#error-app *::after{
    animation-duration:.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
  .pe-x-mark-1,.pe-x-mark-2{stroke-dashoffset:0!important}
}
</style>

<script>
(function(){
'use strict';
if (window.__paymentErrorLoaded) return;
window.__paymentErrorLoaded = true;

var container = document.getElementById('error-app');
if (!container) return;

/* ═══ ЗВУК — мягкий "диссонанс" ═══ */
var audioUnlocked = false;
var audioCtx = null;

function unlockAudio(){
  if (audioUnlocked) return;
  function un(){
    try { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); audioUnlocked = true; } catch(e){}
    document.removeEventListener('touchstart', un);
    document.removeEventListener('click', un);
    document.removeEventListener('keydown', un);
  }
  document.addEventListener('touchstart', un, {passive:true});
  document.addEventListener('click', un, {passive:true});
  document.addEventListener('keydown', un, {passive:true});
}

function note(f, dur, type, vol){
  if (!audioCtx) return;
  try {
    var o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type || 'sine';
    o.frequency.value = f;
    g.gain.setValueAtTime(0, audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(vol || 0.08, audioCtx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + dur);
  } catch(e){}
}

function sfxError(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Нисходящие ноты — "не получилось"
  [440, 392, 349.23].forEach(function(f, i){
    setTimeout(function(){ note(f, 0.35, 'sine', 0.08); }, i * 130);
  });
}

/* ═══ ПОКАЗАТЬ БЛОК "ДЕНЬГИ ВЕРНУТСЯ" ═══ */
function showCheckBlock(){
  var el = document.getElementById('pe-check');
  if (el) el.style.display = 'flex';
}

/* ═══ ЛОГ ОШИБКИ ИЗ URL ═══ */
function logErrorFromURL(){
  try {
    var p = new URLSearchParams(location.search);
    var reason = p.get('reason') || p.get('error') || p.get('cancel');
    if (reason){
      console.log('[payment-error] reason:', reason);
    }
    var product = p.get('product');
    if (product){
      console.log('[payment-error] failed product:', product);
    }
  } catch(e){}
}

/* ═══ INIT ═══ */
function init(){
  unlockAudio();

  // Звук ошибки через 0.8 сек
  setTimeout(sfxError, 800);

  // Показать блок "деньги вернутся" через 1.5 сек
  setTimeout(showCheckBlock, 1500);

  logErrorFromURL();

  console.log('❌ Payment error page loaded');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
</script>
