// ═══════════════════════════════════════════════════════════
//   experience.js — v6.1 SUPER VIP
//   + монета guild-coin.jpg вместо эмодзи
//   + панель тестирования для модераторов
// ═══════════════════════════════════════════════════════════
(function() {
'use strict';

if (window.__marsExperienceV6) return;
window.__marsExperienceV6 = true;

/* ═══════════════════════════════════════════════════════════
   ⚙️ КОНФИГ
   ═══════════════════════════════════════════════════════════ */
var SUPABASE_URL  = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY  = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var SB_KEY        = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';
var COIN_IMG      = '/assets/images/guild-coin.jpg';

var XP_HISTORY_KEY = 'mars-xp-history';
var STYLE_ID       = 'mars-notif-styles-v6';

var DEBUG          = false;
var TOAST_DURATION = 2400;
var TOAST_OUT_MS   = 650;
var MAX_QUEUE      = 12;

function log() {
  if (!DEBUG) return;
  try { console.log.apply(console, ['🎯 mars:'].concat([].slice.call(arguments))); } catch(e){}
}

function esc(s){
  return String(s||'').replace(/[&<>"']/g, function(m){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}

function prefersReducedMotion(){
  try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  catch(e){ return false; }
}
var REDUCED_MOTION = prefersReducedMotion();
try {
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq && mq.addEventListener) mq.addEventListener('change', function(e){ REDUCED_MOTION = e.matches; });
} catch(e){}

/* ═══════════════════════════════════════════════════════════
   📚 УРОВНИ
   ═══════════════════════════════════════════════════════════ */
var LEVEL_TITLES = [
  '🌱 Поселенец','🔭 Исследователь','🚀 Первопроходец','🏠 Колонизатор',
  '⚡ Командир','⚔️ Воин','📜 Писец','🔮 Мудрец',
  '👑 Аристократ','🏛️ Сенатор','💎 Магнат','🌟 Звёздный лорд',
  '🐉 Дракон','🔥 Феникс','🌊 Повелитель морей','⛰️ Владыка гор',
  '🗡️ Мастер клинка','🏹 Мастер лука','🛡️ Щитоносец','🎯 Снайпер'
];

function xpForLevel(level){
  return Math.floor(Math.pow(level, 1.8) * 20);
}

function getLevelInfo(exp){
  exp = Math.max(0, exp || 0);
  var level = 1;
  while (level < 100 && exp >= xpForLevel(level + 1)) level++;
  return {
    level: level,
    title: LEVEL_TITLES[level - 1] || ('Уровень ' + level),
    current: xpForLevel(level),
    next: xpForLevel(level + 1)
  };
}

/* ═══════════════════════════════════════════════════════════
   🎨 СТИЛИ
   ═══════════════════════════════════════════════════════════ */
function injectStyles(){
  var old = document.getElementById(STYLE_ID);
  if (old) old.remove();

  var s = document.createElement('style');
  s.id = STYLE_ID;
  s.setAttribute('data-version', 'v6.1');
  s.textContent = `
/* ═══ ГЛАВНЫЙ ТОСТ ═══ */
.mars-notif {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 38px;
  border-radius: 24px;
  color: #fff;
  font-weight: 900;
  font-size: 1.65rem;
  letter-spacing: -0.3px;
  box-shadow: 0 24px 70px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.18) inset;
  text-shadow: 0 2px 10px rgba(0,0,0,.35);
  overflow: hidden;
  animation: marsNotifIn .6s cubic-bezier(.34, 1.56, .64, 1) forwards;
  will-change: transform, opacity;
  pointer-events: none;
  z-index: 2147483640;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  max-width: calc(100vw - 40px);
  box-sizing: border-box;
}
.mars-notif::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(120deg,
    transparent 0%, transparent 40%,
    rgba(255,255,255,.4) 50%,
    transparent 60%, transparent 100%);
  background-size: 200% 100%;
  animation: marsNotifShine 2.2s ease-in-out infinite;
  pointer-events: none;
}
.mars-notif::after {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,.28), transparent 55%),
    radial-gradient(circle at 80% 80%, rgba(255,255,255,.18), transparent 55%);
  pointer-events: none;
}
.mars-notif .mi-icon {
  font-size: 2.4rem;
  line-height: 1;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  animation: marsNotifSpin 1.1s ease-out;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,.35));
}
.mars-notif .mi-icon img {
  display: block;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow:
    0 4px 16px rgba(0,0,0,.4),
    0 0 0 3px #f5d76e,
    0 0 20px rgba(245,215,110,.6);
  animation: marsCoinSpin 3s linear infinite;
}
.mars-notif .mi-text {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.mars-notif .mi-main {
  font-size: 1.6rem;
  line-height: 1.15;
  font-weight: 900;
}
.mars-notif .mi-sub {
  font-size: .78rem;
  opacity: .92;
  font-weight: 800;
  letter-spacing: .8px;
  text-transform: uppercase;
}

/* ═══ 5 ТИПОВ ═══ */
.mars-notif.xp {
  background: linear-gradient(135deg, #27ae60 0%, #16a085 50%, #1abc9c 100%);
  box-shadow: 0 24px 70px rgba(39,174,96,.55), 0 0 0 4px rgba(255,255,255,.14) inset;
}
.mars-notif.levelup {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 50%, #f5d76e 100%);
  box-shadow: 0 24px 70px rgba(243,156,18,.65), 0 0 0 4px rgba(255,255,255,.22) inset;
}
.mars-notif.achievement {
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 50%, #d1a4e8 100%);
  box-shadow: 0 24px 70px rgba(155,89,182,.65), 0 0 0 4px rgba(255,255,255,.22) inset;
}
.mars-notif.talents {
  background: linear-gradient(135deg, #d4af37 0%, #f5d76e 50%, #b8860b 100%);
  color: #1a1a2e;
  text-shadow: 0 1px 3px rgba(255,255,255,.4);
  box-shadow: 0 24px 70px rgba(212,175,55,.65), 0 0 0 4px rgba(255,255,255,.3) inset;
}
.mars-notif.vip {
  background: linear-gradient(135deg, #0f0f1e 0%, #2d1b3d 40%, #f5d76e 100%);
  box-shadow:
    0 24px 80px rgba(245,215,110,.5),
    0 0 0 2px #f5d76e inset,
    0 0 60px rgba(245,215,110,.4) inset;
  animation: marsNotifIn .6s cubic-bezier(.34, 1.56, .64, 1) forwards,
             marsVipGlow 2s ease-in-out infinite;
}
.mars-notif.vip .mi-icon {
  filter: drop-shadow(0 0 20px #f5d76e) drop-shadow(0 0 40px rgba(245,215,110,.7));
}
.mars-notif.vip .mi-main {
  background: linear-gradient(90deg, #fff, #f5d76e, #fff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: marsNotifShine 3s linear infinite;
}

/* ═══ КНОПКА ЗАКРЫТИЯ ═══ */
.mars-notif .mi-close {
  position: absolute;
  top: 8px; right: 10px;
  width: 26px; height: 26px;
  border-radius: 50%;
  background: rgba(255,255,255,.2);
  border: none;
  color: inherit;
  font-size: .85rem;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-family: inherit;
  z-index: 5;
  pointer-events: auto;
}
.mars-notif.clickable { pointer-events: auto; cursor: pointer; }
.mars-notif.clickable .mi-close { display: flex; }
.mars-notif.clickable:hover { transform: translate(-50%, -50%) scale(1.03); }

/* ═══ ЧАСТИЦЫ / КОНФЕТТИ / ИСКРЫ ═══ */
.mars-particle {
  position: fixed;
  width: 8px; height: 8px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2147483639;
  will-change: transform, opacity;
}
.mars-confetti-wrap {
  position: fixed; inset: 0;
  pointer-events: none;
  z-index: 2147483638;
  overflow: hidden;
}
.mars-confetti-piece {
  position: absolute;
  top: -20px;
  width: 10px; height: 14px;
  border-radius: 2px;
  will-change: transform;
  animation: marsConfettiFall 3s linear forwards;
}
.mars-vip-spark {
  position: fixed;
  font-size: 1.4rem;
  pointer-events: none;
  z-index: 2147483637;
  will-change: transform, opacity;
}

/* ═══ АНИМАЦИИ ═══ */
@keyframes marsNotifIn {
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(.35) rotate(-10deg); }
  60%  { opacity: 1; transform: translate(-50%, -50%) scale(1.1) rotate(3deg); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0); }
}
@keyframes marsNotifOut {
  0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(.85) translateY(-40px); }
}
@keyframes marsNotifSpin {
  0%   { transform: rotate(0) scale(.5); }
  50%  { transform: rotate(180deg) scale(1.3); }
  100% { transform: rotate(360deg) scale(1); }
}
@keyframes marsCoinSpin {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
@keyframes marsNotifShine {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes marsVipGlow {
  0%, 100% { box-shadow: 0 24px 80px rgba(245,215,110,.5), 0 0 0 2px #f5d76e inset, 0 0 60px rgba(245,215,110,.4) inset; }
  50%      { box-shadow: 0 24px 100px rgba(245,215,110,.9), 0 0 0 3px #f5d76e inset, 0 0 80px rgba(245,215,110,.7) inset; }
}
@keyframes marsParticleFly {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(.2); opacity: 0; }
}
@keyframes marsConfettiFall {
  0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(900deg); opacity: .2; }
}
@keyframes marsVipSparkFly {
  0%   { transform: translate(0, 0) scale(0) rotate(0); opacity: 0; }
  20%  { opacity: 1; transform: translate(var(--sx1), var(--sy1)) scale(1.2) rotate(180deg); }
  100% { transform: translate(var(--sx2), var(--sy2)) scale(.4) rotate(720deg); opacity: 0; }
}

/* ═══ ПАНЕЛЬ МОДЕРАТОРА ═══ */
.mars-mod-panel {
  position: fixed;
  bottom: 20px; left: 20px;
  z-index: 2147483643;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
}
.mars-mod-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #1a1a2e, #2d1b3d);
  color: #f5d76e;
  border: 2px solid #f5d76e;
  border-radius: 44px;
  font-weight: 900;
  font-size: .85rem;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 12px 32px rgba(0,0,0,.4), 0 0 0 3px rgba(245,215,110,.15) inset;
  transition: all .3s cubic-bezier(.16,1,.3,1);
  letter-spacing: .3px;
}
.mars-mod-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 16px 40px rgba(245,215,110,.4), 0 0 0 3px rgba(245,215,110,.3) inset;
}
.mars-mod-btn:active { transform: translateY(0) scale(.98); }
.mars-mod-btn .mod-badge {
  font-size: .6rem;
  padding: 2px 7px;
  border-radius: 8px;
  background: #f5d76e;
  color: #1a1a2e;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.mars-mod-panel.open .mars-mod-btn {
  background: linear-gradient(135deg, #f5d76e, #e67e22);
  color: #1a1a2e;
}
.mars-mod-panel.open .mars-mod-btn .mod-badge {
  background: #1a1a2e;
  color: #f5d76e;
}

.mars-mod-menu {
  position: absolute;
  bottom: 70px; left: 0;
  width: 280px;
  background: linear-gradient(135deg, #1a1a2e, #0f0f1e);
  border: 2px solid #f5d76e;
  border-radius: 20px;
  padding: 16px 14px;
  box-shadow: 0 24px 70px rgba(0,0,0,.6), 0 0 40px rgba(245,215,110,.25);
  display: none;
  animation: marsModMenuIn .3s cubic-bezier(.16,1,.3,1);
  max-height: 70vh;
  overflow-y: auto;
}
.mars-mod-panel.open .mars-mod-menu { display: block; }

@keyframes marsModMenuIn {
  from { opacity: 0; transform: translateY(12px) scale(.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.mars-mod-title {
  font-size: .7rem;
  color: #f5d76e;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0 0 10px 4px;
  opacity: .8;
}
.mars-mod-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 14px;
  margin-bottom: 6px;
  background: rgba(255,255,255,.06);
  border: 1.5px solid rgba(245,215,110,.25);
  border-radius: 12px;
  color: #fff;
  font-family: inherit;
  font-weight: 800;
  font-size: .85rem;
  cursor: pointer;
  text-align: left;
  transition: all .2s cubic-bezier(.16,1,.3,1);
}
.mars-mod-item:hover {
  background: rgba(245,215,110,.15);
  border-color: #f5d76e;
  transform: translateX(3px);
}
.mars-mod-item:active { transform: translateX(0) scale(.98); }
.mars-mod-item .item-icon {
  font-size: 1.3rem;
  line-height: 1;
  flex-shrink: 0;
}
.mars-mod-item .item-icon img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #f5d76e;
}
.mars-mod-sep {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(245,215,110,.4), transparent);
  margin: 12px 0;
}
.mars-mod-hint {
  font-size: .68rem;
  color: rgba(255,255,255,.5);
  text-align: center;
  font-weight: 700;
  margin-top: 8px;
  line-height: 1.4;
}

/* ═══ МОБИЛЬНЫЙ ═══ */
@media (max-width: 600px) {
  .mars-notif {
    font-size: 1.3rem;
    padding: 16px 26px;
    border-radius: 18px;
    gap: 10px;
  }
  .mars-notif .mi-icon { font-size: 2rem; }
  .mars-notif .mi-icon img { width: 44px; height: 44px; }
  .mars-notif .mi-main { font-size: 1.25rem; }
  .mars-notif .mi-sub { font-size: .68rem; }
  .mars-mod-panel { bottom: 12px; left: 12px; }
  .mars-mod-btn { padding: 10px 14px; font-size: .78rem; }
  .mars-mod-menu { width: 260px; bottom: 60px; }
}

@media (prefers-reduced-motion: reduce) {
  .mars-notif {
    animation: none !important;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  .mars-notif::before { display: none; }
  .mars-notif .mi-icon,
  .mars-notif .mi-icon img { animation: none !important; }
  .mars-particle,
  .mars-confetti-wrap,
  .mars-vip-spark { display: none !important; }
}
`;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════════
   🔊 ЗВУКИ
   ═══════════════════════════════════════════════════════════ */
var audioCtx = null, audioUnlocked = false;

function unlockAudio(){
  if (audioUnlocked) return;
  function un(){
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioUnlocked = true;
    } catch(e){}
    document.removeEventListener('touchstart', un);
    document.removeEventListener('click', un);
    document.removeEventListener('keydown', un);
  }
  document.addEventListener('touchstart', un, {passive:true});
  document.addEventListener('click', un, {passive:true});
  document.addEventListener('keydown', un, {passive:true});
}

function getAudioCtx(){
  if (!audioUnlocked) return null;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
  } catch(e){ return null; }
  return audioCtx;
}

function note(freq, dur, type, vol){
  var c = getAudioCtx(); if (!c) return;
  try {
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(vol || 0.08, c.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + dur);
  } catch(e){}
}

function sfxXP(){ if (REDUCED_MOTION) return; [659.25, 783.99, 987.77].forEach(function(f,i){ setTimeout(function(){ note(f, .15, 'triangle', .07); }, i*60); }); }
function sfxLevelUp(){ if (REDUCED_MOTION) return; [523, 659, 783, 1046].forEach(function(f,i){ setTimeout(function(){ note(f, .35, 'sine', .09); }, i*90); }); }
function sfxAchievement(){ if (REDUCED_MOTION) return; [523, 659, 783, 1046].forEach(function(f,i){ setTimeout(function(){ note(f, .5, 'triangle', .11); }, i*110); }); setTimeout(function(){ note(1567.98, .8, 'sine', .09); }, 550); }
function sfxTalents(){ if (REDUCED_MOTION) return; [880, 1174.66, 1567.98].forEach(function(f,i){ setTimeout(function(){ note(f, .25, 'sine', .09); }, i*70); }); }
function sfxVip(){ if (REDUCED_MOTION) return; [261.63, 329.63, 392.00, 523.25].forEach(function(f,i){ setTimeout(function(){ note(f, .8, 'sine', .1); }, i*90); }); setTimeout(function(){ note(1046.50, 1.2, 'triangle', .12); }, 400); setTimeout(function(){ note(1567.98, 1.5, 'sine', .08); }, 700); }

/* ═══════════════════════════════════════════════════════════
   💫 ЭФФЕКТЫ
   ═══════════════════════════════════════════════════════════ */
function spawnParticles(rect, type){
  if (REDUCED_MOTION) return;
  if (!rect || !isFinite(rect.left)) return;

  var palettes = {
    xp:          ['#27ae60','#16a085','#2ecc71','#1abc9c'],
    levelup:     ['#f39c12','#e67e22','#f1c40f','#ffd97a'],
    achievement: ['#9b59b6','#8e44ad','#a569bd','#d7bde2'],
    talents:     ['#d4af37','#f5d76e','#ffd97a','#b8860b'],
    vip:         ['#f5d76e','#fff','#e74c3c','#9b59b6','#3498db']
  };
  var palette = palettes[type] || palettes.xp;
  var cx = rect.left + rect.width / 2;
  var cy = rect.top + rect.height / 2;
  var count = window.innerWidth <= 600 ? 14 : 26;

  for (var i = 0; i < count; i++){
    (function(idx){
      setTimeout(function(){
        try {
          var p = document.createElement('div');
          p.className = 'mars-particle';
          var angle = (Math.PI * 2 * idx) / count + Math.random() * .4;
          var dist = 100 + Math.random() * 220;
          var size = 6 + Math.random() * 9;
          var color = palette[Math.floor(Math.random() * palette.length)];
          p.style.left = cx + 'px';
          p.style.top = cy + 'px';
          p.style.width = size + 'px';
          p.style.height = size + 'px';
          p.style.background = color;
          p.style.boxShadow = '0 0 14px ' + color;
          p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
          p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
          p.style.animation = 'marsParticleFly 1.1s cubic-bezier(.16, 1, .3, 1) forwards';
          p.style.animationDelay = (Math.random() * .15) + 's';
          document.body.appendChild(p);
          setTimeout(function(){ if (p.parentNode) p.remove(); }, 1500);
        } catch(e){}
      }, idx * 28);
    })(i);
  }
}

function fireConfetti(opts){
  if (REDUCED_MOTION) return;
  opts = opts || {};
  var count  = opts.count  || (window.innerWidth <= 600 ? 45 : 90);
  var colors = opts.colors || ['#f5d76e','#f39c12','#e74c3c','#3498db','#27ae60','#9b59b6','#fff'];
  try {
    var wrap = document.createElement('div');
    wrap.className = 'mars-confetti-wrap';
    document.body.appendChild(wrap);
    for (var i = 0; i < count; i++){
      var p = document.createElement('div');
      p.className = 'mars-confetti-piece';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * .8) + 's';
      p.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
      if (Math.random() > .5) p.style.borderRadius = '50%';
      if (Math.random() > .5) p.style.width = '6px';
      wrap.appendChild(p);
    }
    setTimeout(function(){ if (wrap.parentNode) wrap.remove(); }, 5000);
  } catch(e){}
}

function fireVipSparks(rect){
  if (REDUCED_MOTION) return;
  if (!rect) return;
  var cx = rect.left + rect.width / 2;
  var cy = rect.top + rect.height / 2;
  var icons = ['✦','★','✧','🌟','💫','✨'];
  var count = 24;
  for (var i = 0; i < count; i++){
    (function(idx){
      setTimeout(function(){
        try {
          var s = document.createElement('div');
          s.className = 'mars-vip-spark';
          s.textContent = icons[Math.floor(Math.random() * icons.length)];
          s.style.left = cx + 'px';
          s.style.top = cy + 'px';
          s.style.color = ['#f5d76e','#fff','#ffd97a'][idx % 3];
          s.style.textShadow = '0 0 12px #f5d76e, 0 0 24px #f5d76e';
          var angle = (Math.PI * 2 * idx) / count + Math.random() * .5;
          var dist1 = 60 + Math.random() * 80;
          var dist2 = 180 + Math.random() * 200;
          s.style.setProperty('--sx1', Math.cos(angle) * dist1 + 'px');
          s.style.setProperty('--sy1', Math.sin(angle) * dist1 + 'px');
          s.style.setProperty('--sx2', Math.cos(angle) * dist2 + 'px');
          s.style.setProperty('--sy2', Math.sin(angle) * dist2 + 'px');
          s.style.animation = 'marsVipSparkFly 1.8s cubic-bezier(.16, 1, .3, 1) forwards';
          s.style.animationDelay = (Math.random() * .3) + 's';
          document.body.appendChild(s);
          setTimeout(function(){ if (s.parentNode) s.remove(); }, 2300);
        } catch(e){}
      }, idx * 45);
    })(i);
  }
}

/* ═══════════════════════════════════════════════════════════
   🎯 ДВИЖОК ТОСТОВ
   ═══════════════════════════════════════════════════════════ */
var toastQueue = [];
var isShowing = false;

function showNotif(type, opts){
  opts = opts || {};
  var icon = opts.icon || '⭐';
  var iconHtml = opts.iconHtml || null;
  var main = opts.main || '';
  var sub  = opts.sub  || '';
  var duration = opts.duration || TOAST_DURATION;
  var onClick = opts.onClick || null;

  if (isShowing){
    if (toastQueue.length >= MAX_QUEUE) return;
    toastQueue.push({ type: type, opts: opts });
    return;
  }
  if (document.hidden){
    if (toastQueue.length < MAX_QUEUE){
      toastQueue.push({ type: type, opts: opts });
    }
    return;
  }

  isShowing = true;
  injectStyles();

  var el;
  try {
    el = document.createElement('div');
    el.className = 'mars-notif ' + type + (onClick ? ' clickable' : '');
    var iconPart = iconHtml || ('<span class="mi-icon">' + esc(icon) + '</span>');
    el.innerHTML =
      iconPart +
      '<span class="mi-text">' +
        '<span class="mi-main">' + esc(main) + '</span>' +
        (sub ? '<span class="mi-sub">' + esc(sub) + '</span>' : '') +
      '</span>' +
      (onClick ? '<button class="mi-close" aria-label="Закрыть">✕</button>' : '');
    document.body.appendChild(el);
  } catch(e){
    isShowing = false;
    return;
  }

  if (onClick){
    el.addEventListener('click', function(e){
      e.stopPropagation();
      try { onClick(); } catch(err){}
      hideToast(el, true);
    });
  }

  try {
    if (type === 'xp') sfxXP();
    else if (type === 'levelup') { sfxLevelUp(); fireConfetti({count: 60}); }
    else if (type === 'achievement') { sfxAchievement(); fireConfetti({count: 80}); }
    else if (type === 'talents') { sfxTalents(); fireConfetti({count: 40, colors: ['#d4af37','#f5d76e','#ffd97a','#b8860b','#fff']}); }
    else if (type === 'vip') { sfxVip(); fireConfetti({count: 120}); }
  } catch(e){}

  requestAnimationFrame(function(){
    try {
      var rect = el.getBoundingClientRect();
      spawnParticles(rect, type);
      if (type === 'vip') {
        setTimeout(function(){ fireVipSparks(rect); }, 300);
        setTimeout(function(){ fireVipSparks(rect); }, 800);
      }
    } catch(e){}
  });

  setTimeout(function(){ hideToast(el, false); }, duration);
}

function hideToast(el, immediate){
  try {
    el.style.animation = 'marsNotifOut ' + (TOAST_OUT_MS/1000) + 's cubic-bezier(.16, 1, .3, 1) forwards';
  } catch(e){}

  setTimeout(function(){
    try { if (el.parentNode) el.remove(); } catch(e){}
    isShowing = false;
    if (toastQueue.length > 0){
      var next = toastQueue.shift();
      showNotif(next.type, next.opts);
    }
  }, immediate ? 300 : TOAST_OUT_MS);
}

/* ═══════════════════════════════════════════════════════════
   📢 ПУБЛИЧНЫЕ ФУНКЦИИ — С МОНЕТОЙ
   ═══════════════════════════════════════════════════════════ */
window.showExperienceToast = function(points, opts){
  points = parseInt(points, 10) || 0;
  if (points <= 0) return;
  showNotif('xp', Object.assign({
    icon: '⭐',
    main: '+' + points + ' XP',
    sub: 'Опыт'
  }, opts || {}));
};

window.showLevelUpToast = function(level, title, opts){
  showNotif('levelup', Object.assign({
    icon: '👑',
    main: 'Уровень ' + level,
    sub: title || ''
  }, opts || {}));
};

window.showAchievementToast = function(icon, name, opts){
  showNotif('achievement', Object.assign({
    icon: icon || '🏅',
    main: name || 'Достижение',
    sub: 'Новая награда'
  }, opts || {}));
};

/* 🪙 ТАЛАНТЫ — с картинкой монеты */
window.showTalentsToast = function(amount, opts){
  amount = parseInt(amount, 10) || 0;
  if (amount <= 0) return;
  var coinHtml = '<span class="mi-icon">' +
    '<img src="' + COIN_IMG + '" alt="🪙" onerror="this.replaceWith(document.createTextNode(\'🪙\'))">' +
    '</span>';
  showNotif('talents', Object.assign({
    iconHtml: coinHtml,
    main: '+' + amount + ' талантов',
    sub: 'Валюта Марса'
  }, opts || {}));
};

window.showVipToast = function(days, opts){
  days = parseInt(days, 10) || 0;
  showNotif('vip', Object.assign({
    icon: '👑',
    main: 'VIP активирован!',
    sub: days > 0 ? (days + ' дней привилегий') : 'Добро пожаловать в клуб',
    duration: 4200
  }, opts || {}));
};

log('✅ v6.1 функции тостов зарегистрированы');

/* ═══════════════════════════════════════════════════════════
   🌉 SUPABASE КЛИЕНТ
   ═══════════════════════════════════════════════════════════ */
var cachedUserId = null;
var cachedUserRole = null;

function getClient(){
  if (window.supabaseClient && window.supabaseClient.auth) return window.supabaseClient;
  if (window.getSupabase){
    try { var c = window.getSupabase(); if (c && c.auth) return c; } catch(e){}
  }
  if (window.supabase && typeof window.supabase.createClient === 'function'){
    try {
      window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { storageKey: SB_KEY, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
      });
      return window.supabaseClient;
    } catch(e){ log('createClient fail:', e.message); }
  }
  return null;
}

async function getUserId(){
  if (cachedUserId) return cachedUserId;
  var client = getClient(); if (!client) return null;
  try {
    var res = await client.auth.getSession();
    var sess = res && res.data && res.data.session;
    if (sess && sess.user){ cachedUserId = sess.user.id; return cachedUserId; }
  } catch(e){}
  return null;
}

async function getUserRole(){
  if (cachedUserRole) return cachedUserRole;
  var client = getClient(); if (!client) return null;
  var uid = await getUserId();
  if (!uid) return null;
  try {
    var res = await client.from('profiles').select('role').eq('user_id', uid).single();
    var role = (res && res.data && res.data.role) || null;
    cachedUserRole = role;
    return role;
  } catch(e){ return null; }
}

function isModerator(){
  return cachedUserRole === 'moderator' || cachedUserRole === 'admin';
}

/* ═══════════════════════════════════════════════════════════
   🎛 ПАНЕЛЬ МОДЕРАТОРА — ТЕСТИРОВАНИЕ
   ═══════════════════════════════════════════════════════════ */
function showModPanel(){
  if (document.getElementById('mars-mod-panel')) return;

  var panel = document.createElement('div');
  panel.id = 'mars-mod-panel';
  panel.className = 'mars-mod-panel';
  panel.innerHTML =
    '<div class="mars-mod-menu">' +
      '<div class="mars-mod-title">🧪 Тест уведомлений</div>' +
      '<button class="mars-mod-item" data-test="xp" type="button">' +
        '<span class="item-icon">⭐</span> XP (+25)' +
      '</button>' +
      '<button class="mars-mod-item" data-test="levelup" type="button">' +
        '<span class="item-icon">👑</span> Уровень 5' +
      '</button>' +
      '<button class="mars-mod-item" data-test="achievement" type="button">' +
        '<span class="item-icon">🏆</span> Достижение' +
      '</button>' +
      '<button class="mars-mod-item" data-test="talents" type="button">' +
        '<span class="item-icon"><img src="' + COIN_IMG + '" alt="🪙" onerror="this.parentElement.textContent=\'🪙\'"></span> Таланты (+50)' +
      '</button>' +
      '<button class="mars-mod-item" data-test="vip" type="button">' +
        '<span class="item-icon">👑</span> VIP на 365 дней' +
      '</button>' +
      '<div class="mars-mod-sep"></div>' +
      '<div class="mars-mod-title">🎁 Реальные действия</div>' +
      '<button class="mars-mod-item" data-test="addtalents" type="button">' +
        '<span class="item-icon">🪙</span> +10 талантов в БД' +
      '</button>' +
      '<button class="mars-mod-item" data-test="addxp" type="button">' +
        '<span class="item-icon">💎</span> +100 XP в БД' +
      '</button>' +
      '<div class="mars-mod-sep"></div>' +
      '<button class="mars-mod-item" data-test="resetroulette" type="button">' +
        '<span class="item-icon">🔄</span> Сброс рулетки' +
      '</button>' +
      '<button class="mars-mod-item" data-test="resetreward" type="button">' +
        '<span class="item-icon">🔄</span> Сброс награды' +
      '</button>' +
      '<div class="mars-mod-hint">Только для модераторов<br>не влияет на других</div>' +
    '</div>' +
    '<button class="mars-mod-btn" type="button">' +
      '<span>🧪 Тест</span>' +
      '<span class="mod-badge">MOD</span>' +
    '</button>';

  document.body.appendChild(panel);

  var btn = panel.querySelector('.mars-mod-btn');
  btn.onclick = function(){ panel.classList.toggle('open'); };

  panel.querySelectorAll('.mars-mod-item').forEach(function(item){
    item.onclick = async function(){
      var test = item.dataset.test;

      if (test === 'xp') window.showExperienceToast(25);
      else if (test === 'levelup') window.showLevelUpToast(5, '⚡ Командир');
      else if (test === 'achievement') window.showAchievementToast('🏆', 'Марсианин');
      else if (test === 'talents') window.showTalentsToast(50);
      else if (test === 'vip') window.showVipToast(365);

      else if (test === 'addtalents'){
        var uid = await getUserId();
        if (uid) await addTalents(uid, 10, 'Тест модератора');
      }
      else if (test === 'addxp'){
        var uid2 = await getUserId();
        if (uid2) await addExperience(uid2, 100);
      }
      else if (test === 'resetroulette'){
        try { localStorage.removeItem('mars-roulette-v5'); } catch(e){}
        var rb = document.getElementById('daily-roulette-btn');
        if (rb) rb.remove();
        if (typeof window.showExperienceToast === 'function') {
          window.showExperienceToast(0);
        }
        console.log('🎲 Рулетка сброшена');
      }
      else if (test === 'resetreward'){
        try {
          localStorage.removeItem('mars-reward-done-v5');
          localStorage.removeItem('mars-reward-check-v5');
        } catch(e){}
        console.log('🎁 Награда сброшена — обнови страницу');
      }
    };
  });

  /* Клик вне панели закрывает меню */
  document.addEventListener('click', function(e){
    if (!panel.contains(e.target)) panel.classList.remove('open');
  });

  console.log('🧪 Панель модератора активирована');
}

/* ═══════════════════════════════════════════════════════════
   🌐 RETRY
   ═══════════════════════════════════════════════════════════ */
async function withRetry(fn, retries){
  retries = retries == null ? 2 : retries;
  var lastErr;
  for (var i = 0; i <= retries; i++){
    try { return await fn(); }
    catch(e){
      lastErr = e;
      if (i < retries) await new Promise(function(r){ setTimeout(r, 500 * (i + 1)); });
    }
  }
  throw lastErr;
}

/* ═══════════════════════════════════════════════════════════
   🔒 МЬЮТЕКС
   ═══════════════════════════════════════════════════════════ */
var locks = {};
function withLock(userId, fn){
  var prev = locks[userId] || Promise.resolve();
  var next = prev.then(function(){ return fn(); }, function(){ return fn(); });
  locks[userId] = next.catch(function(){});
  return next;
}

/* ═══════════════════════════════════════════════════════════
   📊 ИСТОРИЯ XP
   ═══════════════════════════════════════════════════════════ */
function recordXpHistory(points){
  if (!points || points <= 0) return;
  try {
    var raw = localStorage.getItem(XP_HISTORY_KEY);
    var hist = raw ? JSON.parse(raw) : {};
    if (!hist || typeof hist !== 'object') hist = {};
    var today = new Date().toISOString().slice(0, 10);
    hist[today] = (hist[today] || 0) + points;
    var cutoff = new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10);
    Object.keys(hist).forEach(function(k){ if (k < cutoff) delete hist[k]; });
    localStorage.setItem(XP_HISTORY_KEY, JSON.stringify(hist));
  } catch(e){}
}

/* ═══════════════════════════════════════════════════════════
   📢 EVENTS
   ═══════════════════════════════════════════════════════════ */
function fireEvent(name, detail){
  try {
    window.dispatchEvent(new CustomEvent(name, { detail: detail || {} }));
  } catch(e){}
}

/* ═══════════════════════════════════════════════════════════
   🏅 ДОСТИЖЕНИЯ
   ═══════════════════════════════════════════════════════════ */
var grantedThisSession = {};

async function grantAchievement(userId, achId, meta){
  var key = userId + ':' + achId;
  if (grantedThisSession[key]) return false;
  grantedThisSession[key] = true;

  var client = getClient(); if (!client) return false;

  try {
    var res = await client.from('user_achievements').insert([{
      user_id: userId, achievement_id: achId
    }]);
    if (res && res.error){
      if (res.error.code === '23505') return false;
      log('grant err:', res.error.message);
      return false;
    }

    var icon = (meta && meta.icon) || '🏅';
    var name = (meta && meta.name) || 'Достижение';

    window.showAchievementToast(icon, name);
    fireEvent('marsAchievementUnlocked', { id: achId, name: name, icon: icon });

    try {
      await client.from('notifications').insert([{
        user_id: userId,
        message: '🏅 Получено достижение: ' + icon + ' ' + name + '!',
        type: 'achievement'
      }]);
    } catch(e){}

    return true;
  } catch(e){
    log('grant exception:', e.message);
    delete grantedThisSession[key];
    return false;
  }
}

var XP_ACHIEVEMENTS = [
  { xp: 10,   name: 'Первый шаг',    icon: '🚀' },
  { xp: 50,   name: 'Знаток',        icon: '📖' },
  { xp: 100,  name: 'Исследователь', icon: '🌍' },
  { xp: 200,  name: 'Летописец',     icon: '🖊️' },
  { xp: 300,  name: 'Марсианин',     icon: '🏆' },
  { xp: 500,  name: 'Ветеран',       icon: '⚔️' },
  { xp: 1000, name: 'Легенда',       icon: '👑' },
  { xp: 5000, name: 'Бессмертный',   icon: '🌟' }
];

async function checkAchievements(userId, currentExp){
  var client = getClient(); if (!client) return;
  try {
    var results = await Promise.all([
      withRetry(function(){ return client.from('achievements').select('id, name, icon'); }, 1)
        .catch(function(){ return {data:[]}; }),
      withRetry(function(){ return client.from('user_achievements').select('achievement_id').eq('user_id', userId); }, 1)
        .catch(function(){ return {data:[]}; })
    ]);

    var all = (results[0] && results[0].data) || [];
    var earned = (results[1] && results[1].data) || [];
    var earnedIds = {};
    earned.forEach(function(e){ earnedIds[e.achievement_id] = true; });

    var byName = {};
    all.forEach(function(a){ if (a && a.name) byName[a.name] = a; });

    for (var i = 0; i < XP_ACHIEVEMENTS.length; i++){
      var rule = XP_ACHIEVEMENTS[i];
      if (currentExp < rule.xp) continue;
      var ach = byName[rule.name];
      if (!ach || earnedIds[ach.id]) continue;
      await grantAchievement(userId, ach.id, ach);
    }
  } catch(e){ log('checkAchievements:', e.message); }
}

/* ═══════════════════════════════════════════════════════════
   🎁 НАЧИСЛЕНИЕ ОПЫТА
   ═══════════════════════════════════════════════════════════ */
async function addExperience(userId, points){
  if (!userId) userId = await getUserId();
  if (!userId) return null;

  points = parseInt(points, 10) || 0;
  if (points <= 0) return null;

  var client = getClient();
  if (!client) return null;

  return withLock(userId, async function(){
    try {
      var res = await withRetry(function(){
        return client.from('profiles').select('experience, level').eq('user_id', userId).single();
      }, 2);
      if (!res || res.error) return null;

      var profile = res.data || {};
      var currentExp = profile.experience || 0;
      var currentLevel = profile.level || 1;

      var newExp = currentExp + points;
      var levelInfo = getLevelInfo(newExp);
      var newLevel = levelInfo.level;

      var upd = await withRetry(function(){
        return client.from('profiles').update({ experience: newExp, level: newLevel }).eq('user_id', userId);
      }, 2);
      if (!upd || upd.error) return null;

      recordXpHistory(points);
      window.showExperienceToast(points);
      fireEvent('marsXpGained', { amount: points, total: newExp });

      if (newLevel > currentLevel){
        setTimeout(function(){
          window.showLevelUpToast(newLevel, levelInfo.title);
          fireEvent('marsLevelUp', { level: newLevel, title: levelInfo.title });
        }, 700);

        try {
          await client.from('notifications').insert([{
            user_id: userId,
            message: '🎉 Вы достигли ' + newLevel + ' уровня — ' + levelInfo.title + '!',
            type: 'level_up'
          }]);
        } catch(e){}
      }

      await checkAchievements(userId, newExp);

      return { experience: newExp, level: newLevel, levelUp: newLevel > currentLevel, title: levelInfo.title };
    } catch(e){
      log('addExperience exception:', e.message);
      return null;
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   🪙 НАЧИСЛЕНИЕ ТАЛАНТОВ
   ═══════════════════════════════════════════════════════════ */
async function addTalents(userId, amount, reason){
  if (!userId) userId = await getUserId();
  if (!userId) return null;

  amount = parseInt(amount, 10) || 0;
  if (amount <= 0) return null;

  var client = getClient(); if (!client) return null;

  return withLock('talents-' + userId, async function(){
    try {
      var res = await withRetry(function(){
        return client.from('user_currency').select('clay_talents').eq('user_id', userId).maybeSingle();
      }, 2);

      var current = (res && res.data && res.data.clay_talents) || 0;
      var newVal = current + amount;

      if (res && res.data){
        await withRetry(function(){
          return client.from('user_currency')
            .update({ clay_talents: newVal, updated_at: new Date().toISOString() })
            .eq('user_id', userId);
        }, 2);
      } else {
        await withRetry(function(){
          return client.from('user_currency')
            .insert([{ user_id: userId, clay_talents: newVal }]);
        }, 2);
      }

      window.showTalentsToast(amount, reason ? { sub: reason } : undefined);
      fireEvent('marsTalentsGained', { amount: amount, total: newVal, reason: reason || '' });

      return { total: newVal, gained: amount };
    } catch(e){
      log('addTalents exception:', e.message);
      return null;
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   👑 АКТИВАЦИЯ VIP
   ═══════════════════════════════════════════════════════════ */
async function activateVip(userId, days, reason){
  if (!userId) userId = await getUserId();
  if (!userId) return null;

  days = parseInt(days, 10) || 0;
  if (days <= 0) return null;

  var client = getClient(); if (!client) return null;

  try {
    var res = await withRetry(function(){
      return client.from('profiles').select('vip_until').eq('user_id', userId).single();
    }, 2);
    if (!res || res.error) return null;

    var currentUntil = res.data && res.data.vip_until ? new Date(res.data.vip_until) : null;
    var base = currentUntil && currentUntil.getTime() > Date.now() ? currentUntil : new Date();
    var newUntil = new Date(base.getTime() + days * 86400000);

    await withRetry(function(){
      return client.from('profiles').update({ vip_until: newUntil.toISOString() }).eq('user_id', userId);
    }, 2);

    window.showVipToast(days, reason ? { sub: reason } : undefined);
    fireEvent('marsVipActivated', { days: days, until: newUntil.toISOString() });

    try {
      await client.from('notifications').insert([{
        user_id: userId,
        message: '👑 VIP активирован на ' + days + ' дней!',
        type: 'vip'
      }]);
    } catch(e){}

    return { until: newUntil.toISOString(), days: days };
  } catch(e){
    log('activateVip exception:', e.message);
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════
   📖 ЧТЕНИЕ ПРОФИЛЯ
   ═══════════════════════════════════════════════════════════ */
async function getProfile(userId){
  if (!userId) userId = await getUserId();
  if (!userId) return null;
  var client = getClient(); if (!client) return null;
  try {
    var res = await withRetry(function(){
      return client.from('profiles').select('experience, level, vip_until').eq('user_id', userId).single();
    }, 2);
    if (!res || res.error) return null;
    return res.data;
  } catch(e){ return null; }
}

/* ═══════════════════════════════════════════════════════════
   🧹 CLEANUP
   ═══════════════════════════════════════════════════════════ */
function cleanup(){
  try {
    document.querySelectorAll('.mars-notif, .mars-particle, .mars-confetti-wrap, .mars-vip-spark')
      .forEach(function(el){ el.remove(); });
    toastQueue = [];
    isShowing = false;
  } catch(e){}
}

window.addEventListener('pagehide', cleanup);

/* ═══════════════════════════════════════════════════════════
   📢 СИНХРОНИЗАЦИЯ ВКЛАДОК
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('storage', function(e){
  if (e.key === SB_KEY) {
    cachedUserId = null;
    cachedUserRole = null;
  }
});

/* ═══════════════════════════════════════════════════════════
   🚀 ЭКСПОРТ
   ═══════════════════════════════════════════════════════════ */
window.addExperience = addExperience;

window.marsExperience = {
  add: addExperience,
  getProfile: getProfile,
  getLevelInfo: getLevelInfo,
  xpForLevel: xpForLevel,
  checkAchievements: checkAchievements,
  addTalents: addTalents,
  activateVip: activateVip,
  getUserId: getUserId,
  getUserRole: getUserRole,
  isModerator: isModerator,
  cleanup: cleanup,
  LEVEL_TITLES: LEVEL_TITLES,
  toast: {
    xp:          function(p) { window.showExperienceToast(p); },
    levelUp:     function(l, t) { window.showLevelUpToast(l, t); },
    achievement: function(i, n) { window.showAchievementToast(i, n); },
    talents:     function(a) { window.showTalentsToast(a); },
    vip:         function(d) { window.showVipToast(d); }
  }
};

/* ═══════════════════════════════════════════════════════════
   🎬 BOOTSTRAP
   ═══════════════════════════════════════════════════════════ */
async function bootstrap(){
  injectStyles();
  unlockAudio();

  /* Проверяем роль — если модератор, показываем панель */
  try {
    await getUserRole();
    if (isModerator()) {
      setTimeout(showModPanel, 1500);
    }
  } catch(e){}

  log('v6.1 SUPER VIP загружен' + (isModerator() ? ' (модератор)' : ''));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

})();
