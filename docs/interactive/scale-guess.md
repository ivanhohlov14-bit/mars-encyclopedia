---
title: Космический глазомер
description: Угадай реальные размеры объектов Марса — Rover, Олимп, Фобос и другие
comments: false
hide:
  - navigation
  - toc
---

<div id="scale-app">

<!-- HERO -->
<div class="sc-hero">
  <div class="sc-stars">
    <div class="sc-star"></div><div class="sc-star"></div><div class="sc-star"></div>
    <div class="sc-star"></div><div class="sc-star"></div><div class="sc-star"></div>
    <div class="sc-star"></div><div class="sc-star"></div><div class="sc-star"></div>
    <div class="sc-star"></div>
  </div>
  <div class="sc-hero-content">
    <div class="sc-hero-tag">🔭 Интерактив · Игра</div>
    <h1 class="sc-hero-title">Космический глазомер</h1>
    <p class="sc-hero-sub">Угадай, во сколько раз один объект Марса больше другого</p>
    <div class="sc-hero-stats">
      <div class="sc-stat">
        <div class="sc-stat-value" id="sc-stat-score">—</div>
        <div class="sc-stat-label">Лучший результат</div>
      </div>
      <div class="sc-stat">
        <div class="sc-stat-value" id="sc-stat-streak">0</div>
        <div class="sc-stat-label">Текущая серия</div>
      </div>
      <div class="sc-stat">
        <div class="sc-stat-value" id="sc-stat-max">0</div>
        <div class="sc-stat-label">Макс. серия</div>
      </div>
      <div class="sc-stat">
        <div class="sc-stat-value" id="sc-stat-rounds">0</div>
        <div class="sc-stat-label">Раундов</div>
      </div>
    </div>
  </div>
</div>

<!-- ИГРА -->
<div class="sc-game" id="sc-game">

  <!-- Объекты -->
  <div class="sc-objects">
    <div class="sc-object sc-object-a">
      <div class="sc-obj-emoji" id="sc-emoji-a">🧑</div>
      <div class="sc-obj-name" id="sc-name-a">Марсианин</div>
      <div class="sc-obj-size" id="sc-size-a">1.7 м</div>
    </div>

    <div class="sc-vs">
      <div class="sc-vs-text">VS</div>
      <div class="sc-vs-question">?</div>
    </div>

    <div class="sc-object sc-object-b">
      <div class="sc-obj-emoji" id="sc-emoji-b">🏔️</div>
      <div class="sc-obj-name" id="sc-name-b">Гора Олимп</div>
      <div class="sc-obj-size sc-obj-unknown">??? м</div>
    </div>
  </div>

  <!-- Вопрос -->
  <div class="sc-question">
    <div class="sc-question-text">Во сколько раз <strong>второй объект</strong> больше первого?</div>
    <div class="sc-slider-wrap">
      <input type="range" id="sc-slider" min="0" max="100" value="50" step="1">
      <div class="sc-slider-value" id="sc-slider-display">
        <span id="sc-slider-mult">×1</span>
      </div>
      <div class="sc-slider-labels">
        <span>×0.1</span>
        <span>×1</span>
        <span>×10</span>
        <span>×100</span>
        <span>×10к</span>
        <span>×100к</span>
      </div>
    </div>
  </div>

  <!-- Кнопка -->
  <button class="sc-btn sc-btn-primary" id="sc-submit">✓ Проверить ответ</button>

  <!-- Результат -->
  <div class="sc-result" id="sc-result" style="display:none;">
    <div class="sc-result-icon" id="sc-result-icon">🎉</div>
    <div class="sc-result-score" id="sc-result-score">85%</div>
    <div class="sc-result-verdict" id="sc-result-verdict">Отличный глазомер!</div>
    <div class="sc-result-details">
      <div class="sc-result-row">
        <span>Твой ответ:</span>
        <strong id="sc-answer-user">×100</strong>
      </div>
      <div class="sc-result-row">
        <span>Правильный ответ:</span>
        <strong id="sc-answer-real">×12 882</strong>
      </div>
      <div class="sc-result-row sc-result-math">
        <span id="sc-answer-math">1.7 м vs 21 900 м</span>
      </div>
    </div>
    <button class="sc-btn sc-btn-primary" id="sc-next">Следующий раунд →</button>
  </div>

</div>

<!-- ДОСТИЖЕНИЯ -->
<div class="sc-achievements">
  <h2 class="sc-h2">🏆 Достижения</h2>
  <div class="sc-badges" id="sc-badges">
    <!-- JS заполнит -->
  </div>
</div>

<!-- ЛИДЕРБОРД -->
<div class="sc-leaderboard">
  <h2 class="sc-h2">🥇 Топ-10 игроков</h2>
  <div class="sc-leader-list" id="sc-leader">
    <div class="sc-leader-empty">Загрузка...</div>
  </div>
</div>

</div>

<style>
/* ═══ ROOT ═══ */
#scale-app{
  max-width:900px;margin:0 auto;padding:0 8px 40px;
  font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
  color:#1a1a2e;line-height:1.6;
  -webkit-tap-highlight-color:transparent;
}
#scale-app *{box-sizing:border-box}
#scale-app a{text-decoration:none!important;border-bottom:none!important}

@keyframes scFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes scPop{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes scStar{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
@keyframes scShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes scPulse{0%,100%{box-shadow:0 0 0 0 rgba(192,57,43,.7)}50%{box-shadow:0 0 0 15px rgba(192,57,43,0)}}
@keyframes scBadgePop{0%{transform:scale(0) rotate(-180deg);opacity:0}60%{transform:scale(1.3) rotate(10deg)}100%{transform:scale(1) rotate(0);opacity:1}}

/* ═══ HERO ═══ */
.sc-hero{
  position:relative;border-radius:24px;padding:44px 32px 40px;color:#fff;
  margin-bottom:24px;overflow:hidden;text-align:center;
  background:
    radial-gradient(circle at 20% 30%, rgba(192,57,43,.3), transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(108,99,255,.25), transparent 55%),
    linear-gradient(135deg,#0a0a14 0%,#16213e 50%,#2d1b3d 100%);
  box-shadow:0 30px 80px -20px rgba(0,0,0,.7);
}
.sc-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.sc-star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;box-shadow:0 0 6px #fff;animation:scStar 3.5s ease-in-out infinite}
.sc-star:nth-child(1){top:12%;left:8%}
.sc-star:nth-child(2){top:22%;left:18%;animation-delay:.4s;width:1.5px;height:1.5px}
.sc-star:nth-child(3){top:68%;left:12%;animation-delay:.9s}
.sc-star:nth-child(4){top:32%;left:82%;animation-delay:1.4s}
.sc-star:nth-child(5){top:78%;left:88%;animation-delay:.6s;width:1.5px;height:1.5px}
.sc-star:nth-child(6){top:18%;left:62%;animation-delay:1.1s}
.sc-star:nth-child(7){top:52%;left:44%;animation-delay:.3s}
.sc-star:nth-child(8){top:42%;left:94%;animation-delay:1.8s}
.sc-star:nth-child(9){top:84%;left:28%;animation-delay:2.1s}
.sc-star:nth-child(10){top:8%;left:38%;animation-delay:1.5s}

.sc-hero-content{position:relative;z-index:2}
.sc-hero-tag{
  display:inline-block;padding:6px 16px;border-radius:22px;
  background:rgba(192,57,43,.2);border:1px solid rgba(192,57,43,.5);
  color:#ff8a80;font-size:.72rem;font-weight:800;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;
}
.sc-hero-title{
  font-size:2rem;font-weight:900;margin:0 0 12px;letter-spacing:-.5px;
  background:linear-gradient(90deg,#fff 0%,#f5d76e 25%,#fff 50%,#f5d76e 75%,#fff 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:scShine 6s linear infinite;
}
.sc-hero-sub{font-size:1rem;opacity:.9;margin:0 0 24px}
.sc-hero-stats{
  display:grid;grid-template-columns:repeat(4,1fr);gap:10px;
  max-width:640px;margin:0 auto;
}
.sc-stat{
  padding:12px 8px;border-radius:14px;
  background:rgba(255,255,255,.08);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.15);
}
.sc-stat-value{font-size:1.3rem;font-weight:900;color:#f5d76e;line-height:1.2;font-variant-numeric:tabular-nums}
.sc-stat-label{font-size:.65rem;font-weight:700;opacity:.75;letter-spacing:.5px;text-transform:uppercase;margin-top:4px}

/* ═══ GAME ═══ */
.sc-game{
  background:#fff;border-radius:24px;padding:32px 28px;
  box-shadow:0 20px 60px -20px rgba(0,0,0,.15);
  border:2px solid rgba(192,57,43,.1);
  margin-bottom:24px;animation:scFadeIn .5s ease;
}

/* Objects */
.sc-objects{
  display:grid;grid-template-columns:1fr auto 1fr;gap:16px;
  align-items:center;margin-bottom:28px;
  min-height:180px;
}
.sc-object{
  text-align:center;padding:20px 12px;
  border-radius:20px;background:#f8f9fb;
  border:2px solid #e8eaf0;transition:all .3s;
}
.sc-object-a{border-color:rgba(108,99,255,.3);background:linear-gradient(135deg,#f0f4ff,#f8f9fb)}
.sc-object-b{border-color:rgba(192,57,43,.3);background:linear-gradient(135deg,#fff5f5,#f8f9fb)}
.sc-obj-emoji{font-size:4.5rem;line-height:1;margin-bottom:10px}
.sc-obj-name{font-size:.9rem;font-weight:900;color:#1a1a2e;margin-bottom:6px}
.sc-obj-size{
  display:inline-block;font-size:.75rem;font-weight:800;
  padding:4px 12px;border-radius:12px;
  background:rgba(108,99,255,.15);color:#6C63FF;
  font-variant-numeric:tabular-nums;
}
.sc-object-b .sc-obj-size{background:rgba(192,57,43,.15);color:#c0392b}
.sc-obj-unknown{background:rgba(136,136,136,.15)!important;color:#888!important;letter-spacing:3px}

.sc-vs{text-align:center;padding:0 6px}
.sc-vs-text{
  font-size:1.1rem;font-weight:900;color:#c0392b;
  letter-spacing:2px;margin-bottom:6px;
}
.sc-vs-question{
  font-size:2rem;font-weight:900;color:#f39c12;
  animation:scPop 1.5s ease-in-out infinite;
}

/* Slider */
.sc-question{margin-bottom:24px}
.sc-question-text{
  text-align:center;font-size:.95rem;color:#4a4a5e;
  margin-bottom:16px;font-weight:600;
}
.sc-question-text strong{color:#c0392b}
.sc-slider-wrap{position:relative;padding:0 8px}
.sc-slider-wrap input[type="range"]{
  -webkit-appearance:none;appearance:none;
  width:100%;height:10px;border-radius:5px;outline:none;
  background:linear-gradient(90deg,#6C63FF 0%,#f39c12 50%,#c0392b 100%);
  cursor:pointer;
}
.sc-slider-wrap input[type="range"]::-webkit-slider-thumb{
  -webkit-appearance:none;appearance:none;
  width:26px;height:26px;border-radius:50%;
  background:linear-gradient(135deg,#fff,#f0f0f0);
  border:3px solid #c0392b;
  box-shadow:0 4px 12px rgba(192,57,43,.4);
  cursor:pointer;transition:all .2s;
}
.sc-slider-wrap input[type="range"]::-webkit-slider-thumb:hover{transform:scale(1.15);box-shadow:0 6px 16px rgba(192,57,43,.6)}
.sc-slider-wrap input[type="range"]::-moz-range-thumb{
  width:26px;height:26px;border-radius:50%;
  background:#fff;border:3px solid #c0392b;
  box-shadow:0 4px 12px rgba(192,57,43,.4);
  cursor:pointer;
}
.sc-slider-value{
  text-align:center;margin:12px 0 6px;
  font-size:1.6rem;font-weight:900;color:#c0392b;
  font-variant-numeric:tabular-nums;
}
.sc-slider-labels{
  display:flex;justify-content:space-between;
  font-size:.7rem;color:#888;font-weight:700;
  padding:0 4px;font-variant-numeric:tabular-nums;
}

/* Buttons */
.sc-btn{
  display:flex;align-items:center;justify-content:center;gap:8px;
  width:100%;padding:16px 24px;border-radius:16px;border:none;
  font-family:inherit;font-size:1rem;font-weight:900;
  cursor:pointer;transition:all .25s cubic-bezier(.16,1,.3,1);
}
.sc-btn-primary{
  background:linear-gradient(135deg,#c0392b,#e74c3c);
  color:#fff;
  box-shadow:0 10px 28px -6px rgba(192,57,43,.6);
}
.sc-btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 36px -6px rgba(192,57,43,.8)}
.sc-btn-primary:active{transform:translateY(0) scale(.98)}

/* Result */
.sc-result{
  text-align:center;padding:24px;
  background:linear-gradient(135deg,#fff8e1,#fff5f5);
  border-radius:20px;border:2px solid #f39c12;
  animation:scPop .5s ease;
}
.sc-result-icon{font-size:3rem;line-height:1;margin-bottom:8px}
.sc-result-score{
  font-size:3rem;font-weight:900;line-height:1;margin-bottom:8px;
  background:linear-gradient(135deg,#f39c12,#c0392b);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
}
.sc-result-verdict{font-size:1rem;color:#4a4a5e;font-weight:700;margin-bottom:20px}
.sc-result-details{
  max-width:360px;margin:0 auto 20px;text-align:left;
  background:rgba(255,255,255,.7);border-radius:12px;padding:14px 18px;
}
.sc-result-row{
  display:flex;justify-content:space-between;
  padding:6px 0;font-size:.9rem;color:#4a4a5e;
}
.sc-result-row strong{color:#c0392b;font-weight:900;font-variant-numeric:tabular-nums}
.sc-result-math{
  justify-content:center;text-align:center;
  padding-top:10px;margin-top:6px;
  border-top:1px dashed rgba(0,0,0,.1);
  font-size:.8rem!important;color:#888!important;
}

/* ═══ H2 ═══ */
.sc-h2{
  font-size:1.3rem;font-weight:900;color:#1a1a2e;
  margin:0 0 16px;padding-bottom:12px;
  border-bottom:3px solid transparent;
  border-image:linear-gradient(90deg,#c0392b,#f39c12,transparent) 1;
  letter-spacing:-.3px;
}

/* ═══ ACHIEVEMENTS ═══ */
.sc-achievements{
  background:#fff;border-radius:24px;padding:24px 28px;
  border:2px solid rgba(192,57,43,.1);margin-bottom:24px;
}
.sc-badges{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px}
.sc-badge{
  text-align:center;padding:16px 10px;
  border-radius:16px;background:#f8f9fb;
  border:2px solid #e8eaf0;transition:all .3s;
  position:relative;
}
.sc-badge.unlocked{
  background:linear-gradient(135deg,#fff8e1,#fff5f5);
  border-color:#f39c12;
  box-shadow:0 8px 24px -8px rgba(243,156,18,.4);
}
.sc-badge-icon{font-size:2.2rem;line-height:1;margin-bottom:8px;filter:grayscale(1);opacity:.4}
.sc-badge.unlocked .sc-badge-icon{filter:none;opacity:1;animation:scBadgePop .6s ease}
.sc-badge-name{font-size:.78rem;font-weight:900;color:#888;line-height:1.3}
.sc-badge.unlocked .sc-badge-name{color:#c0392b}
.sc-badge-desc{font-size:.68rem;color:#aaa;margin-top:4px;line-height:1.4}
.sc-badge.unlocked .sc-badge-desc{color:#856404}

/* ═══ LEADERBOARD ═══ */
.sc-leaderboard{
  background:#fff;border-radius:24px;padding:24px 28px;
  border:2px solid rgba(192,57,43,.1);
}
.sc-leader-list{display:flex;flex-direction:column;gap:6px}
.sc-leader-item{
  display:flex;align-items:center;gap:12px;
  padding:10px 14px;border-radius:12px;
  background:#f8f9fb;font-size:.9rem;
}
.sc-leader-item.sc-me{background:linear-gradient(135deg,#fff8e1,#fff5f5);border:2px solid #f39c12;font-weight:800}
.sc-leader-rank{font-size:1rem;font-weight:900;color:#c0392b;min-width:32px;text-align:center}
.sc-leader-name{flex:1;color:#4a4a5e;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sc-leader-score{font-weight:900;color:#f39c12;font-variant-numeric:tabular-nums}
.sc-leader-empty{text-align:center;padding:24px;color:#aaa;font-size:.9rem}

/* ═══ MOBILE ═══ */
@media (max-width:640px){
  .sc-hero{padding:32px 20px 28px;border-radius:20px}
  .sc-hero-title{font-size:1.5rem}
  .sc-hero-sub{font-size:.88rem}
  .sc-hero-stats{grid-template-columns:repeat(2,1fr);gap:8px}
  .sc-stat{padding:10px 6px}
  .sc-stat-value{font-size:1.1rem}
  .sc-stat-label{font-size:.58rem}
  .sc-game{padding:22px 18px;border-radius:20px}
  .sc-objects{gap:8px;min-height:150px}
  .sc-obj-emoji{font-size:3rem}
  .sc-obj-name{font-size:.78rem}
  .sc-obj-size{font-size:.68rem;padding:3px 10px}
  .sc-vs-text{font-size:.9rem}
  .sc-vs-question{font-size:1.6rem}
  .sc-slider-value{font-size:1.3rem}
  .sc-slider-labels{font-size:.62rem}
  .sc-result-score{font-size:2.4rem}
  .sc-result-icon{font-size:2.4rem}
  .sc-result-details{padding:12px 14px}
  .sc-result-row{font-size:.82rem}
  .sc-h2{font-size:1.1rem}
  .sc-badges{grid-template-columns:repeat(2,1fr);gap:8px}
  .sc-badge{padding:12px 6px}
  .sc-badge-icon{font-size:1.8rem}
  .sc-badge-name{font-size:.72rem}
}

@media (prefers-reduced-motion: reduce){
  #scale-app *,#scale-app *::before,#scale-app *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
}
</style>

<script>
(function(){
'use strict';
if (window.__scaleGameLoaded) return;
window.__scaleGameLoaded = true;

/* ═══ SUPABASE ═══ */
var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var sb = null;

function tryGetSb(){
  if (sb && sb.auth) return sb;
  if (window.supabaseClient && window.supabaseClient.auth){ sb = window.supabaseClient; return sb; }
  if (window.getSupabase){ try { var c = window.getSupabase(); if (c && c.auth){ sb = c; return sb; } } catch(e){} }
  if (window.supabase && typeof window.supabase.createClient === 'function'){
    try { sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY); return sb; } catch(e){}
  }
  return null;
}
function waitForSb(attempts){
  attempts = attempts || 0;
  return new Promise(function(resolve){
    var c = tryGetSb();
    if (c && c.auth) return resolve(c);
    if (attempts > 60) return resolve(null);
    setTimeout(function(){ waitForSb(attempts + 1).then(resolve); }, 100);
  });
}

/* ═══ ОБЪЕКТЫ ═══ */
var OBJECTS = [
  { id:'human',    emoji:'🧑',      name:'Марсианин',           size:1.7,      unit:'м' },
  { id:'tree',     emoji:'🌳',      name:'Марсианское дерево',  size:5,        unit:'м' },
  { id:'rover',    emoji:'🚙',      name:'Ровер Perseverance',  size:3,        unit:'м' },
  { id:'rock',     emoji:'🪨',      name:'Скала-валун',         size:10,       unit:'м' },
  { id:'storm',    emoji:'🌪️',      name:'Пылевой смерч',       size:1000,     unit:'м' },
  { id:'olympus',  emoji:'🏔️',      name:'Гора Олимп',          size:21900,    unit:'м' },
  { id:'crater',   emoji:'🕳️',      name:'Кратер Езеро',        size:45000,    unit:'м' },
  { id:'phobos',   emoji:'🌑',      name:'Фобос (луна)',        size:22200,    unit:'м' },
  { id:'deimos',   emoji:'🌒',      name:'Деймос (луна)',       size:12400,    unit:'м' },
  { id:'marineris',emoji:'⛰️',      name:'Долина Маринер',      size:200000,   unit:'м' },
  { id:'everest',  emoji:'🗻',      name:'Эверест (для сравн.)', size:8848,     unit:'м' },
  { id:'burj',     emoji:'🏙️',      name:'Бурдж-Халифа',        size:828,      unit:'м' }
];

/* ═══ ДОСТИЖЕНИЯ ═══ */
var ACHIEVEMENTS = [
  { id:'first',      emoji:'🎯', name:'Первый выстрел',      desc:'Сыграть первый раунд' },
  { id:'streak3',    emoji:'🔥', name:'Три подряд',          desc:'3 раунда подряд с 70%+' },
  { id:'streak5',    emoji:'🌟', name:'Размерный гений',     desc:'5 подряд с 70%+ (скрытое)' },
  { id:'perfect',    emoji:'💎', name:'Идеальный глазомер',  desc:'100% в одном раунде' },
  { id:'hundred',    emoji:'🏅', name:'Центурион',           desc:'100 сыгранных раундов' }
];

/* ═══ СОСТОЯНИЕ ═══ */
var state = {
  user: null,
  currentPair: null,
  sliderValue: 50,       // 0-100
  answered: false,
  stats: {
    totalRounds: 0,
    bestScore: 0,
    currentStreak: 0,
    maxStreak: 0,
    achievements: []
  }
};

var container = document.getElementById('scale-app');
if (!container) return;

/* ═══ РАСЧЁТ ═══ */
// Slider 0..100 → log10(ratio) от -2 до 5 (7 порядков)
function sliderToLog(v){ return -2 + (v / 100) * 7; }
function logToRatio(l){ return Math.pow(10, l); }

function formatRatio(r){
  if (r >= 1){
    if (r >= 1000000) return '×' + (r/1000000).toFixed(1) + 'М';
    if (r >= 1000) return '×' + (r/1000).toFixed(1) + 'к';
    if (r >= 10) return '×' + Math.round(r);
    return '×' + r.toFixed(2).replace(/\.?0+$/, '');
  } else {
    var inv = 1/r;
    return '÷' + (inv >= 10 ? Math.round(inv) : inv.toFixed(2).replace(/\.?0+$/, ''));
  }
}

function formatSize(s){
  if (s >= 1000000) return (s/1000000).toFixed(1) + 'М м';
  if (s >= 1000) return (s/1000).toFixed(1) + 'к м';
  if (s >= 10) return Math.round(s) + ' м';
  return s + ' м';
}

function calcScore(userLog, realLog){
  var diff = Math.abs(userLog - realLog);
  var score = Math.max(0, Math.round(100 - diff * 25));
  return score;
}

/* ═══ RENDER ═══ */
function renderStats(){
  document.getElementById('sc-stat-score').textContent = state.stats.bestScore ? state.stats.bestScore + '%' : '—';
  document.getElementById('sc-stat-streak').textContent = state.stats.currentStreak;
  document.getElementById('sc-stat-max').textContent = state.stats.maxStreak;
  document.getElementById('sc-stat-rounds').textContent = state.stats.totalRounds;
}

function renderBadges(){
  var wrap = document.getElementById('sc-badges');
  wrap.innerHTML = ACHIEVEMENTS.map(function(a){
    var unlocked = state.stats.achievements.indexOf(a.id) !== -1;
    return '<div class="sc-badge' + (unlocked ? ' unlocked' : '') + '">' +
      '<div class="sc-badge-icon">' + a.emoji + '</div>' +
      '<div class="sc-badge-name">' + a.name + '</div>' +
      '<div class="sc-badge-desc">' + a.desc + '</div>' +
    '</div>';
  }).join('');
}

function pickPair(){
  // Выбираем два разных случайных объекта
  var a, b;
  var max = OBJECTS.length;
  a = OBJECTS[Math.floor(Math.random() * max)];
  do {
    b = OBJECTS[Math.floor(Math.random() * max)];
  } while (b.id === a.id);
  return { a: a, b: b };
}

function newRound(){
  state.currentPair = pickPair();
  state.answered = false;
  state.sliderValue = 50;

  var p = state.currentPair;
  document.getElementById('sc-emoji-a').textContent = p.a.emoji;
  document.getElementById('sc-name-a').textContent = p.a.name;
  document.getElementById('sc-size-a').textContent = formatSize(p.a.size);

  document.getElementById('sc-emoji-b').textContent = p.b.emoji;
  document.getElementById('sc-name-b').textContent = p.b.name;
  document.querySelector('.sc-obj-unknown').textContent = '??? м';

  document.getElementById('sc-slider').value = 50;
  document.getElementById('sc-slider').disabled = false;
  updateSliderDisplay();

  document.getElementById('sc-submit').style.display = 'flex';
  document.getElementById('sc-result').style.display = 'none';

  // Плавное появление
  var game = document.getElementById('sc-game');
  game.style.animation = 'none';
  void game.offsetWidth;
  game.style.animation = 'scFadeIn .4s ease';
}

function updateSliderDisplay(){
  var log = sliderToLog(state.sliderValue);
  var ratio = logToRatio(log);
  document.getElementById('sc-slider-mult').textContent = formatRatio(ratio);
}

function submitAnswer(){
  if (state.answered) return;
  state.answered = true;

  var p = state.currentPair;
  var userLog = sliderToLog(state.sliderValue);
  var realRatio = p.b.size / p.a.size;
  var realLog = Math.log10(realRatio);
  var score = calcScore(userLog, realLog);
  var userRatio = logToRatio(userLog);

  // Иконка и вердикт
  var icon, verdict;
  if (score >= 95){ icon = '🎯'; verdict = 'Идеально! Ты знаток Марса!'; }
  else if (score >= 80){ icon = '🎉'; verdict = 'Отличный глазомер!'; }
  else if (score >= 60){ icon = '👍'; verdict = 'Неплохо, но есть куда расти'; }
  else if (score >= 40){ icon = '🤔'; verdict = 'Почти угадал, но не совсем'; }
  else if (score >= 20){ icon = '😅'; verdict = 'Ошибся на порядок'; }
  else { icon = '😱'; verdict = 'Мимо! Марс огромен'; }

  document.getElementById('sc-result-icon').textContent = icon;
  document.getElementById('sc-result-score').textContent = score + '%';
  document.getElementById('sc-result-verdict').textContent = verdict;
  document.getElementById('sc-answer-user').textContent = formatRatio(userRatio);
  document.getElementById('sc-answer-real').textContent = formatRatio(realRatio);
  document.getElementById('sc-answer-math').textContent = formatSize(p.a.size) + ' vs ' + formatSize(p.b.size);

  // Обновляем статистику
  state.stats.totalRounds++;
  if (score > state.stats.bestScore) state.stats.bestScore = score;
  if (score >= 70){
    state.stats.currentStreak++;
    if (state.stats.currentStreak > state.stats.maxStreak){
      state.stats.maxStreak = state.stats.currentStreak;
    }
  } else {
    state.stats.currentStreak = 0;
  }

  // Достижения
  var newAchievements = [];
  function unlock(id){
    if (state.stats.achievements.indexOf(id) === -1){
      state.stats.achievements.push(id);
      newAchievements.push(id);
    }
  }
  if (state.stats.totalRounds >= 1) unlock('first');
  if (state.stats.currentStreak >= 3) unlock('streak3');
  if (state.stats.currentStreak >= 5) unlock('streak5');
  if (score === 100) unlock('perfect');
  if (state.stats.totalRounds >= 100) unlock('hundred');

  renderStats();
  renderBadges();

  // Показываем результат
  document.getElementById('sc-submit').style.display = 'none';
  document.getElementById('sc-result').style.display = 'block';
  document.querySelector('.sc-obj-unknown').textContent = formatSize(p.b.size);
  document.getElementById('sc-slider').disabled = true;

  // Новые достижения — toast
  if (newAchievements.length){
    newAchievements.forEach(function(id, i){
      var a = ACHIEVEMENTS.filter(function(x){ return x.id === id; })[0];
      setTimeout(function(){
        showToast('🏆 Достижение: ' + a.name);
      }, 400 + i * 700);
    });
  }

  // Сохраняем в Supabase
  saveProgress(score);
}

function showToast(msg){
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);' +
    'padding:12px 24px;border-radius:30px;color:#fff;font-weight:800;font-size:.9rem;' +
    'background:linear-gradient(135deg,#f39c12,#c0392b);z-index:9999;pointer-events:none;' +
    'box-shadow:0 12px 32px rgba(243,156,18,.5);transition:transform .4s cubic-bezier(.16,1,.3,1);' +
    'max-width:90vw;text-align:center;';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(function(){ t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(function(){
    t.style.transform = 'translateX(-50%) translateY(120px)';
    setTimeout(function(){ t.remove(); }, 400);
  }, 3000);
}

/* ═══ SUPABASE ═══ */
async function loadProfile(){
  var client = await waitForSb();
  if (!client) return;
  try {
    var s = await client.auth.getSession();
    state.user = s && s.data && s.data.session ? s.data.session.user : null;
    if (state.user){
      var r = await client.from('game_scale_progress').select('*').eq('user_id', state.user.id).maybeSingle();
      if (r.data){
        state.stats.totalRounds = r.data.total_rounds || 0;
        state.stats.bestScore = r.data.best_score || 0;
        state.stats.currentStreak = r.data.current_streak || 0;
        state.stats.maxStreak = r.data.max_streak || 0;
        state.stats.achievements = r.data.achievements || [];
      }
    }
  } catch(e){ console.warn('[scale] loadProfile:', e); }
  renderStats();
  renderBadges();
  loadLeaderboard();
}

async function saveProgress(score){
  if (!state.user) return;
  var client = await waitForSb();
  if (!client) return;
  try {
    await client.from('game_scale_progress').upsert({
      user_id: state.user.id,
      total_rounds: state.stats.totalRounds,
      best_score: state.stats.bestScore,
      current_streak: state.stats.currentStreak,
      max_streak: state.stats.maxStreak,
      achievements: state.stats.achievements,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
  } catch(e){ console.warn('[scale] saveProgress:', e); }
}

async function loadLeaderboard(){
  var client = await waitForSb();
  if (!client) return;
  try {
    var r = await client.from('game_scale_progress')
      .select('user_id, best_score, max_streak')
      .order('best_score', { ascending: false })
      .limit(10);
    if (!r.data || !r.data.length){
      document.getElementById('sc-leader').innerHTML = '<div class="sc-leader-empty">Пока никто не играл. Будь первым!</div>';
      return;
    }
    var html = r.data.map(function(row, i){
      var isMe = state.user && state.user.id === row.user_id;
      var name = isMe ? 'Ты' : ('Игрок ' + row.user_id.slice(0, 6));
      return '<div class="sc-leader-item' + (isMe ? ' sc-me' : '') + '">' +
        '<div class="sc-leader-rank">' + (i+1) + '</div>' +
        '<div class="sc-leader-name">' + name + '</div>' +
        '<div class="sc-leader-score">' + row.best_score + '%</div>' +
      '</div>';
    }).join('');
    document.getElementById('sc-leader').innerHTML = html;
  } catch(e){
    document.getElementById('sc-leader').innerHTML = '<div class="sc-leader-empty">Рейтинг временно недоступен</div>';
  }
}

/* ═══ INIT ═══ */
function init(){
  var slider = document.getElementById('sc-slider');
  slider.addEventListener('input', function(){
    state.sliderValue = parseInt(slider.value, 10);
    updateSliderDisplay();
  });

  document.getElementById('sc-submit').addEventListener('click', submitAnswer);
  document.getElementById('sc-next').addEventListener('click', newRound);

  newRound();
  renderStats();
  renderBadges();
  loadProfile();

  console.log('🔭 Космический глазомер загружен. Объектов: ' + OBJECTS.length);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
</script>
