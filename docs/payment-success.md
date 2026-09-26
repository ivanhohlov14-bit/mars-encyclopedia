---
title: Оплата успешно завершена
comments: false
hide:
  - navigation
  - toc
---

<div id="success-app">

<!-- ═══ ФОН СО ЗВЁЗДАМИ ═══ -->
<div class="ps-bg">
  <div class="ps-stars">
    <div class="ps-star"></div><div class="ps-star"></div><div class="ps-star"></div>
    <div class="ps-star"></div><div class="ps-star"></div><div class="ps-star"></div>
    <div class="ps-star"></div><div class="ps-star"></div><div class="ps-star"></div>
    <div class="ps-star"></div><div class="ps-star"></div><div class="ps-star"></div>
    <div class="ps-star"></div><div class="ps-star"></div><div class="ps-star"></div>
    <div class="ps-star"></div><div class="ps-star"></div><div class="ps-star"></div>
    <div class="ps-star"></div><div class="ps-star"></div>
  </div>
  <div class="ps-orb ps-orb-a"></div>
  <div class="ps-orb ps-orb-b"></div>
  <div class="ps-orb ps-orb-c"></div>
</div>

<!-- ═══ HERO ═══ -->
<div class="ps-hero">
  <div class="ps-check-wrap">
    <div class="ps-check-ring"></div>
    <div class="ps-check-ring ps-check-ring-2"></div>
    <div class="ps-check">
      <svg viewBox="0 0 52 52" class="ps-check-svg">
        <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" stroke-width="2" opacity=".2"/>
        <path d="M14 27 L23 35 L38 18" fill="none" stroke="currentColor" stroke-width="4"
              stroke-linecap="round" stroke-linejoin="round" class="ps-check-mark"/>
      </svg>
    </div>
  </div>

  <div class="ps-confetti" id="ps-confetti"></div>

  <h1 class="ps-title">Оплата прошла! 🎉</h1>
  <p class="ps-sub">Спасибо за поддержку проекта. Товар зачисляется на аккаунт прямо сейчас.</p>

  <div class="ps-timer">
    <div class="ps-timer-icon">⏳</div>
    <div class="ps-timer-text">Перенаправление в профиль через <span id="ps-countdown">5</span> сек</div>
  </div>
</div>

<!-- ═══ СТАТУС ═══ -->
<div class="ps-status" id="ps-status">
  <div class="ps-status-spinner"></div>
  <div class="ps-status-text">Проверяем платёж...</div>
</div>

<!-- ═══ КАРТОЧКА РЕЗУЛЬТАТА ═══ -->
<div class="ps-result" id="ps-result" style="display:none;">
  <div class="ps-result-head">
    <div class="ps-result-icon" id="ps-result-icon">🪙</div>
    <div>
      <div class="ps-result-title" id="ps-result-title">50 глиняных талантов</div>
      <div class="ps-result-sub" id="ps-result-sub">Зачислено на аккаунт</div>
    </div>
  </div>
  <div class="ps-result-divider"></div>
  <div class="ps-result-info">
    <div class="ps-info-row">
      <span>💰 Сумма</span>
      <b id="ps-result-amount">1 ₽</b>
    </div>
    <div class="ps-info-row">
      <span>📅 Дата</span>
      <b id="ps-result-date">—</b>
    </div>
    <div class="ps-info-row">
      <span>🆔 Номер платежа</span>
      <b id="ps-result-id">—</b>
    </div>
  </div>
</div>

<!-- ═══ ДЕЙСТВИЯ ═══ -->
<div class="ps-actions">
  <a href="/profile/" class="ps-btn ps-btn-primary">👤 В профиль</a>
  <a href="/shop/" class="ps-btn ps-btn-outline">🛒 В магазин</a>
  <a href="/" class="ps-btn ps-btn-outline">🏠 На главную</a>
</div>

<!-- ═══ FAQ ═══ -->
<div class="ps-faq">
  <details class="ps-faq-item">
    <summary><span>❓ Таланты не зачислились</span><span class="ps-faq-chev">▸</span></summary>
    <div class="ps-faq-body">
      Обычно зачисление занимает <strong>1–2 секунды</strong>. Если через минуту
      баланс не изменился — напиши нам на <a href="mailto:mars-wiki@yandex.ru">mars-wiki@yandex.ru</a>
      и укажи номер платежа.
    </div>
  </details>

  <details class="ps-faq-item">
    <summary><span>❓ Где найти чек?</span><span class="ps-faq-chev">▸</span></summary>
    <div class="ps-faq-body">
      Чек самозанятого придёт на email, который вы указали при оплате,
      в течение <strong>1–2 минут</strong>. Проверьте папку «Спам».
    </div>
  </details>

  <details class="ps-faq-item">
    <summary><span>❓ Как вернуть деньги?</span><span class="ps-faq-chev">▸</span></summary>
    <div class="ps-faq-body">
      Возврат возможен в течение 7 дней, если таланты не потрачены.
      Напишите на <a href="mailto:mars-wiki@yandex.ru">mars-wiki@yandex.ru</a>.
    </div>
  </details>
</div>

</div>

<style>
/* ═══ ROOT ═══ */
#success-app{
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
#success-app *{box-sizing:border-box}
#success-app a{text-decoration:none!important;border-bottom:none!important}

/* ═══ ФОН ═══ */
.ps-bg{
  position:absolute;inset:0;
  background:
    radial-gradient(circle at 20% 30%, rgba(39,174,96,.25), transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(243,156,18,.2), transparent 55%),
    linear-gradient(135deg,#0a0a1e 0%,#0f1a2e 40%,#1a2d1e 70%,#0f1a3e 100%);
  z-index:0;
}
.ps-stars{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.ps-star{
  position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;
  box-shadow:0 0 6px #fff;
  animation:psStar 3.5s ease-in-out infinite;
}
.ps-star:nth-child(1){top:8%;left:12%;animation-delay:0s}
.ps-star:nth-child(2){top:15%;left:28%;animation-delay:.4s;width:1.5px;height:1.5px}
.ps-star:nth-child(3){top:22%;left:45%;animation-delay:.9s}
.ps-star:nth-child(4){top:10%;left:62%;animation-delay:1.4s}
.ps-star:nth-child(5){top:18%;left:78%;animation-delay:.6s;width:1.5px;height:1.5px}
.ps-star:nth-child(6){top:32%;left:88%;animation-delay:1.1s}
.ps-star:nth-child(7){top:45%;left:10%;animation-delay:.3s}
.ps-star:nth-child(8){top:55%;left:22%;animation-delay:1.8s;width:1.5px;height:1.5px}
.ps-star:nth-child(9){top:68%;left:15%;animation-delay:2.1s}
.ps-star:nth-child(10){top:75%;left:35%;animation-delay:.5s}
.ps-star:nth-child(11){top:82%;left:58%;animation-delay:1.3s}
.ps-star:nth-child(12){top:72%;left:78%;animation-delay:.8s;width:1.5px;height:1.5px}
.ps-star:nth-child(13){top:88%;left:90%;animation-delay:1.6s}
.ps-star:nth-child(14){top:5%;left:5%;animation-delay:2s;width:1.5px;height:1.5px}
.ps-star:nth-child(15){top:40%;left:52%;animation-delay:.7s}
.ps-star:nth-child(16){top:60%;left:88%;animation-delay:1.9s}
.ps-star:nth-child(17){top:92%;left:18%;animation-delay:1.5s}
.ps-star:nth-child(18){top:12%;left:92%;animation-delay:.2s;width:1.5px;height:1.5px}
.ps-star:nth-child(19){top:50%;left:5%;animation-delay:1.7s}
.ps-star:nth-child(20){top:35%;left:70%;animation-delay:2.2s}

.ps-orb{
  position:absolute;border-radius:50%;
  filter:blur(80px);pointer-events:none;
  opacity:.5;
}
.ps-orb-a{
  top:-100px;left:-100px;width:400px;height:400px;
  background:radial-gradient(circle,rgba(39,174,96,.6),transparent 70%);
  animation:psFloat 12s ease-in-out infinite;
}
.ps-orb-b{
  bottom:-100px;right:-100px;width:500px;height:500px;
  background:radial-gradient(circle,rgba(243,156,18,.4),transparent 70%);
  animation:psFloat 14s ease-in-out infinite reverse;
}
.ps-orb-c{
  top:40%;left:40%;width:300px;height:300px;
  background:radial-gradient(circle,rgba(108,99,255,.3),transparent 70%);
  animation:psFloat 10s ease-in-out infinite;
}

/* ═══ HERO ═══ */
.ps-hero{
  position:relative;
  z-index:2;
  text-align:center;
  max-width:600px;
  width:100%;
  margin-bottom:32px;
  animation:psFadeIn .8s cubic-bezier(.16,1,.3,1);
}

/* Галочка */
.ps-check-wrap{
  position:relative;
  width:140px;height:140px;
  margin:0 auto 24px;
}
.ps-check{
  position:absolute;
  inset:20px;
  border-radius:50%;
  background:linear-gradient(135deg,#27ae60,#16a085);
  display:flex;align-items:center;justify-content:center;
  box-shadow:
    0 0 0 4px rgba(255,255,255,.1),
    0 20px 60px rgba(39,174,96,.6),
    0 0 80px rgba(39,174,96,.5);
  animation:psCheckPop .8s cubic-bezier(.34,1.56,.64,1) .3s both;
  z-index:2;
}
.ps-check-svg{
  width:70px;height:70px;
  color:#fff;
  position:relative;z-index:2;
}
.ps-check-mark{
  stroke-dasharray:60;
  stroke-dashoffset:60;
  animation:psCheckDraw .8s cubic-bezier(.16,1,.3,1) .8s forwards;
}
.ps-check-ring{
  position:absolute;inset:0;
  border-radius:50%;
  border:2px solid rgba(39,174,96,.5);
  animation:psRing 2s ease-out infinite;
}
.ps-check-ring-2{animation-delay:.6s}

/* Заголовок */
.ps-title{
  font-size:clamp(1.8rem,4vw,2.6rem);
  font-weight:900;
  margin:0 0 14px;
  letter-spacing:-.5px;
  background:linear-gradient(90deg,#fff 0%,#7bed9f 25%,#fff 50%,#7bed9f 75%,#fff 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:psShine 5s linear infinite;
  line-height:1.15;
}
.ps-sub{
  font-size:1.02rem;
  line-height:1.6;
  opacity:.9;
  margin:0 0 22px;
  max-width:480px;
  margin-left:auto;margin-right:auto;
}

/* Таймер */
.ps-timer{
  display:inline-flex;align-items:center;gap:10px;
  padding:12px 22px;
  border-radius:30px;
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.15);
  font-size:.88rem;
  font-weight:700;
}
.ps-timer-icon{font-size:1.1rem;animation:psSpin 2s linear infinite}
#ps-countdown{
  color:#7bed9f;
  font-weight:900;
  font-size:1.1rem;
  display:inline-block;
  min-width:16px;
  text-align:center;
}

/* ═══ CONFETTI ═══ */
.ps-confetti{
  position:fixed;inset:0;
  pointer-events:none;
  z-index:5;
  overflow:hidden;
}
.ps-confetti-piece{
  position:absolute;
  top:-20px;
  width:10px;height:14px;
  border-radius:2px;
  animation:psConfettiFall 3s linear forwards;
  will-change:transform;
}

/* ═══ СТАТУС ЗАГРУЗКИ ═══ */
.ps-status{
  position:relative;
  z-index:2;
  display:flex;align-items:center;gap:12px;
  padding:16px 24px;
  border-radius:16px;
  background:rgba(255,255,255,.06);
  backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.1);
  margin-bottom:20px;
  max-width:400px;
  animation:psFadeIn .6s ease .5s both;
}
.ps-status-spinner{
  width:20px;height:20px;
  border:3px solid rgba(255,255,255,.2);
  border-top-color:#7bed9f;
  border-radius:50%;
  animation:psSpin .8s linear infinite;
  flex-shrink:0;
}
.ps-status-text{
  font-size:.9rem;font-weight:700;
  opacity:.9;
}
.ps-status.done .ps-status-spinner{display:none}
.ps-status.done{padding:16px 22px}

/* ═══ КАРТОЧКА РЕЗУЛЬТАТА ═══ */
.ps-result{
  position:relative;
  z-index:2;
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(16px);
  border-radius:20px;
  padding:24px 26px;
  margin-bottom:24px;
  max-width:480px;
  width:100%;
  border:1px solid rgba(255,255,255,.15);
  box-shadow:0 20px 60px rgba(0,0,0,.3);
  animation:psFadeIn .6s cubic-bezier(.16,1,.3,1);
}
.ps-result-head{
  display:flex;align-items:center;gap:16px;
  margin-bottom:18px;
}
.ps-result-icon{
  width:60px;height:60px;
  border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,#f5d76e,#f39c12);
  font-size:1.8rem;
  box-shadow:0 8px 24px rgba(243,156,18,.5);
  flex-shrink:0;
}
.ps-result-icon img{
  width:100%;height:100%;
  border-radius:50%;object-fit:cover;
}
.ps-result-title{
  font-size:1.1rem;font-weight:900;
  margin-bottom:4px;
  line-height:1.2;
}
.ps-result-sub{
  font-size:.8rem;
  opacity:.7;font-weight:600;
}
.ps-result-divider{
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
  margin-bottom:16px;
}
.ps-info-row{
  display:flex;justify-content:space-between;
  align-items:center;
  padding:8px 0;
  font-size:.85rem;
}
.ps-info-row span{opacity:.7;font-weight:600}
.ps-info-row b{
  font-weight:900;
  color:#7bed9f;
  font-variant-numeric:tabular-nums;
  max-width:60%;
  text-align:right;
  word-break:break-all;
}

/* ═══ ДЕЙСТВИЯ ═══ */
.ps-actions{
  position:relative;z-index:2;
  display:flex;gap:10px;flex-wrap:wrap;
  justify-content:center;
  margin-bottom:40px;
  max-width:600px;
  width:100%;
  animation:psFadeIn .6s ease .3s both;
}
.ps-btn{
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
.ps-btn-primary{
  background:linear-gradient(135deg,#27ae60,#16a085);
  color:#fff;
  box-shadow:0 12px 32px -6px rgba(39,174,96,.6);
}
.ps-btn-primary:hover{transform:translateY(-2px);box-shadow:0 18px 40px -6px rgba(39,174,96,.8)}
.ps-btn-outline{
  background:rgba(255,255,255,.08);
  color:#fff;
  border-color:rgba(255,255,255,.2);
  backdrop-filter:blur(10px);
}
.ps-btn-outline:hover{background:rgba(255,255,255,.15);transform:translateY(-2px)}
.ps-btn:active{transform:translateY(0) scale(.98)}

/* ═══ FAQ ═══ */
.ps-faq{
  position:relative;z-index:2;
  max-width:600px;
  width:100%;
  display:flex;flex-direction:column;
  gap:10px;
  animation:psFadeIn .6s ease .5s both;
}
.ps-faq-item{
  background:rgba(255,255,255,.06);
  backdrop-filter:blur(10px);
  border-radius:14px;
  border:1px solid rgba(255,255,255,.1);
  overflow:hidden;
  transition:all .3s;
}
.ps-faq-item:hover{border-color:rgba(255,255,255,.2)}
.ps-faq-item[open]{
  background:rgba(255,255,255,.1);
  border-color:rgba(123,237,159,.4);
}
.ps-faq-item summary{
  display:flex;justify-content:space-between;align-items:center;
  gap:14px;
  padding:16px 20px;
  cursor:pointer;
  font-size:.92rem;font-weight:800;
  list-style:none;user-select:none;
}
.ps-faq-item summary::-webkit-details-marker{display:none}
.ps-faq-chev{
  color:#7bed9f;
  transition:transform .3s;
  font-size:1rem;
}
.ps-faq-item[open] .ps-faq-chev{transform:rotate(90deg)}
.ps-faq-body{
  padding:0 20px 18px;
  font-size:.86rem;
  line-height:1.7;
  opacity:.85;
  animation:psFadeIn .3s ease;
}
.ps-faq-body a{
  color:#7bed9f;
  font-weight:800;
  text-decoration:underline!important;
}
.ps-faq-body strong{color:#7bed9f;font-weight:900}

/* ═══ АНИМАЦИИ ═══ */
@keyframes psFadeIn{
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes psFloat{
  0%,100%{transform:translate(0,0) scale(1)}
  50%{transform:translate(20px,-30px) scale(1.1)}
}
@keyframes psStar{
  0%,100%{opacity:.3;transform:scale(1)}
  50%{opacity:1;transform:scale(1.4)}
}
@keyframes psShine{
  0%{background-position:-200% center}
  100%{background-position:200% center}
}
@keyframes psSpin{to{transform:rotate(360deg)}}
@keyframes psRing{
  0%{transform:scale(1);opacity:.8}
  100%{transform:scale(1.6);opacity:0}
}
@keyframes psCheckPop{
  0%{transform:scale(.3);opacity:0}
  60%{transform:scale(1.15)}
  100%{transform:scale(1);opacity:1}
}
@keyframes psCheckDraw{
  to{stroke-dashoffset:0}
}
@keyframes psConfettiFall{
  0%{transform:translateY(0) rotate(0);opacity:1}
  100%{transform:translateY(100vh) rotate(900deg);opacity:.2}
}

/* ═══ MOBILE ═══ */
@media (max-width:600px){
  #success-app{padding:40px 12px 60px}
  .ps-check-wrap{width:110px;height:110px}
  .ps-check{inset:16px}
  .ps-check-svg{width:56px;height:56px}
  .ps-title{font-size:1.55rem}
  .ps-sub{font-size:.9rem}
  .ps-timer{font-size:.8rem;padding:10px 18px}
  .ps-result{padding:20px 20px;border-radius:16px}
  .ps-result-icon{width:52px;height:52px;font-size:1.5rem}
  .ps-result-title{font-size:1rem}
  .ps-actions{gap:8px}
  .ps-btn{padding:12px 20px;font-size:.85rem;min-width:0}
  .ps-faq-item summary{padding:14px 16px;font-size:.85rem}
  .ps-faq-body{padding:0 16px 16px;font-size:.8rem}
}

/* ═══ REDUCED MOTION ═══ */
@media (prefers-reduced-motion: reduce){
  #success-app *,#success-app *::before,#success-app *::after{
    animation-duration:.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
  .ps-check-mark{stroke-dashoffset:0!important}
}
</style>

<script>
(function(){
'use strict';
if (window.__paymentSuccessLoaded) return;
window.__paymentSuccessLoaded = true;

var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var COIN_IMG = '/assets/images/guild-coin.jpg';

var sb = null;
try {
  if (window.supabaseClient && window.supabaseClient.auth) sb = window.supabaseClient;
  else if (window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch(e){}

var container = document.getElementById('success-app');
if (!container) return;

/* ═══ КОНФЕТТИ ═══ */
function fireConfetti(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var wrap = document.getElementById('ps-confetti');
  if (!wrap) return;
  var colors = ['#27ae60','#7bed9f','#f5d76e','#f39c12','#fff','#3498db','#9b59b6'];
  var count = window.innerWidth <= 600 ? 50 : 100;

  for (var i = 0; i < count; i++){
    var p = document.createElement('div');
    p.className = 'ps-confetti-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 1.2) + 's';
    p.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
    if (Math.random() > 0.5) p.style.borderRadius = '50%';
    if (Math.random() > 0.5) p.style.width = '6px';
    wrap.appendChild(p);
  }
}

/* ═══ ЗВУК УСПЕХА ═══ */
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
    g.gain.linearRampToValueAtTime(vol || 0.1, audioCtx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + dur);
  } catch(e){}
}
function sfxSuccess(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  [523.25, 659.25, 783.99, 1046.50].forEach(function(f, i){
    setTimeout(function(){ note(f, 0.4, 'sine', 0.1); }, i * 110);
  });
}

/* ═══ ОПРЕДЕЛЯЕМ ТОВАР ПО URL ═══ */
var PRODUCT_INFO = {
  'tablets-1':      { name: '50 глиняных талантов',   icon: '🪙', amount: 1,   isCoin: true },
  'talents-100':    { name: '100 глиняных талантов',  icon: '🪙', amount: 90,  isCoin: true },
  'talents-500':    { name: '500 глиняных талантов',  icon: '🪙', amount: 290, isCoin: true },
  'talents-1000':   { name: '1000 глиняных талантов', icon: '🪙', amount: 490, isCoin: true },
  'vip-12months':   { name: 'VIP на 12 месяцев',      icon: '👑', amount: 990, isCoin: false }
};

function getProductFromURL(){
  try {
    var p = new URLSearchParams(location.search);
    var id = p.get('product') || p.get('p');
    if (id && PRODUCT_INFO[id]) return Object.assign({id: id}, PRODUCT_INFO[id]);
  } catch(e){}
  return null;
}

/* ═══ ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ═══ */
function showResult(product, paymentId){
  var statusEl = document.getElementById('ps-status');
  var resultEl = document.getElementById('ps-result');

  if (statusEl){
    statusEl.classList.add('done');
    statusEl.innerHTML = '<div style="font-size:1.5rem;">✅</div>' +
      '<div class="ps-status-text">Платёж подтверждён</div>';
  }

  if (!resultEl) return;

  var info = product || { name: 'Покупка', icon: '🎁', amount: 0 };
  var iconEl = document.getElementById('ps-result-icon');

  if (info.isCoin){
    iconEl.innerHTML = '<img src="' + COIN_IMG + '" alt="" ' +
      'onerror="this.replaceWith(document.createTextNode(\'🪙\'))">';
  } else {
    iconEl.textContent = info.icon || '🎁';
  }

  document.getElementById('ps-result-title').textContent = info.name;
  document.getElementById('ps-result-sub').textContent = 'Зачислено на ваш аккаунт';
  document.getElementById('ps-result-amount').textContent = (info.amount || 0) + ' ₽';
  document.getElementById('ps-result-date').textContent =
    new Date().toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

  document.getElementById('ps-result-id').textContent = paymentId || '—';

  resultEl.style.display = 'block';
}

/* ═══ ТАЙМЕР РЕДИРЕКТА ═══ */
function startCountdown(){
  var el = document.getElementById('ps-countdown');
  if (!el) return;
  var count = 6;
  el.textContent = count;

  var timer = setInterval(function(){
    count--;
    el.textContent = count;
    if (count <= 0){
      clearInterval(timer);
      window.location.href = '/profile/';
    }
  }, 1000);
}

/* ═══ ПОПЫТКА ПОЛУЧИТЬ PAYMENT ID ИЗ URL ═══ */
function getPaymentId(){
  try {
    var p = new URLSearchParams(location.search);
    return p.get('payment_id') || p.get('paymentId') || '—';
  } catch(e){ return '—'; }
}

/* ═══ INIT ═══ */
function init(){
  unlockAudio();

  var product = getProductFromURL();
  var paymentId = getPaymentId();

  // Огонь конфетти через небольшую задержку
  setTimeout(fireConfetti, 500);

  // Звук победы
  setTimeout(sfxSuccess, 600);

  // Показать результат
  setTimeout(function(){
    showResult(product, paymentId);
  }, 1200);

  // Ссылки — добавляем ?product= чтобы сохранить
  if (product && product.id){
    var profileLinks = document.querySelectorAll('.ps-btn[href="/profile/"]');
    profileLinks.forEach(function(a){
      a.href = '/profile/?product=' + encodeURIComponent(product.id);
    });
  }

  // Запустить таймер редиректа
  setTimeout(startCountdown, 2000);

  console.log('✅ Payment success page loaded', { product: product, paymentId: paymentId });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
</script>
