/**
 * ═══════════════════════════════════════════════════════════
 *   daily-reward.js v6 FINAL SUPER VIP
 *   Ежедневная награда + рулетка + таланты + монета guild-coin
 *
 *   ─ Что внутри ─
 *   🎡 Реальное SVG-колесо с 10 секторами и точной остановкой
 *   🪙 Твоя монета guild-coin.jpg (3D-вращение) вместо эмодзи
 *   🎊 Конфетти + частицы + вспышки
 *   🔊 7 звуков через Web Audio (без файлов)
 *   🪙 Таланты в награду за стрик + в рулетке
 *   👑 Интеграция с experience.js v6
 *   💫 Многослойные модалки с орбами и свечением
 *   ⏸️ Пауза в скрытой вкладке
 *   🔒 Защита от спама и повторных начислений
 *   🧹 Автоочистка застрявших элементов
 *   📢 Events API для других модулей
 * ═══════════════════════════════════════════════════════════
 */
(function() {
'use strict';

if (window.__dailyRewardLoaded) return;
window.__dailyRewardLoaded = true;

/* ═══════════════════════════════════════════════════════════
   ⚙️ КОНСТАНТЫ
   ═══════════════════════════════════════════════════════════ */
var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';
var COIN_IMG = '/assets/images/guild-coin.jpg';

/* Ключи localStorage */
var K_CACHE_REWARD = 'mars-reward-check-v6';
var K_REWARD_DONE  = 'mars-reward-done-v6';
var K_ROULETTE     = 'mars-roulette-v6';
var K_STREAK_CACHE = 'mars-streak-cache-v3';

/* Тайминги */
var INIT_COOLDOWN  = 10 * 60 * 1000;
var TASKS_COOLDOWN = 5 * 60 * 1000;
var MAX_RETRIES    = 1;
var RETRY_DELAY    = 2000;
var STYLE_ID       = 'daily-reward-styles-v6';

/* Анимация колеса */
var SPIN_DURATION  = 4200;
var SPIN_MIN_TURNS = 5;
var SPIN_MAX_TURNS = 7;

/* ═══════════════════════════════════════════════════════════
   🏰 КОРОЛЕВСТВА
   ═══════════════════════════════════════════════════════════ */
var KINGDOMS = {
  'Аркадия':    { color:'#D4A574', light:'#E8C9A0', bg:'#FDF8F0' },
  'Ксанф':      { color:'#3D3D3D', light:'#6B6B6B', bg:'#F5F5F5' },
  'Эдем':       { color:'#F4A460', light:'#F7C98A', bg:'#FFF8F0' },
  'Эридания':   { color:'#F5D76E', light:'#FAE9A0', bg:'#FFFDF5' },
  'Кхонг':      { color:'#A9A9A9', light:'#C8C8C8', bg:'#F8F8F8' },
  'Авсония':    { color:'#87CEEB', light:'#B0D8EB', bg:'#F0F8FF' },
  'Кимерия':    { color:'#B19CD9', light:'#D1C4E9', bg:'#F8F4FF' },
  'Серпентида': { color:'#E57373', light:'#F5A0A0', bg:'#FFF5F5' },
  'Эритрей':    { color:'#64B5F6', light:'#90CAF9', bg:'#F0F8FF' },
  'Утопия':     { color:'#4DD0E1', light:'#80DEEA', bg:'#F0FDFF' },
  'Эллада':     { color:'#FF8A65', light:'#FFAB91', bg:'#FFF5F0' },
  'Аливасото':  { color:'#81C784', light:'#A5D6A7', bg:'#F0FFF0' }
};

/* ═══════════════════════════════════════════════════════════
   🎁 НАГРАДЫ ЗА СТРИК
   ═══════════════════════════════════════════════════════════ */
var STREAK_REWARDS = {
  1:   { xp: 5,    talents: 0 },
  2:   { xp: 10,   talents: 0 },
  3:   { xp: 15,   talents: 1 },
  4:   { xp: 20,   talents: 0 },
  5:   { xp: 25,   talents: 1 },
  6:   { xp: 35,   talents: 0 },
  7:   { xp: 50,   talents: 3 },
  14:  { xp: 100,  talents: 5 },
  30:  { xp: 250,  talents: 15 },
  100: { xp: 1000, talents: 50 }
};

/* ═══════════════════════════════════════════════════════════
   🎡 ПРИЗЫ РУЛЕТКИ
   ═══════════════════════════════════════════════════════════ */
var ROULETTE_PRIZES = [
  { icon:'💎', label:'10 XP',       xp:10,  talents:0,  weight:28, color:'#3498db' },
  { icon:'💎', label:'25 XP',       xp:25,  talents:0,  weight:22, color:'#2980b9' },
  { icon:'🪙', label:'5 талантов',  xp:0,   talents:5,  weight:12, color:'#d4af37', isCoin:true },
  { icon:'💎', label:'50 XP',       xp:50,  talents:0,  weight:14, color:'#9b59b6' },
  { icon:'⭐', label:'100 XP',      xp:100, talents:0,  weight:8,  color:'#f39c12' },
  { icon:'🪙', label:'25 талантов', xp:0,   talents:25, weight:4,  color:'#f5d76e', isCoin:true },
  { icon:'👑', label:'250 XP',      xp:250, talents:0,  weight:3,  color:'#e67e22' },
  { icon:'💎', label:'500 XP',      xp:500, talents:0,  weight:1,  color:'#e74c3c' },
  { icon:'🔥', label:'Удача ×2',    xp:0,   talents:0,  weight:5,  color:'#e74c3c', special:'luck' },
  { icon:'😢', label:'Пусто',       xp:0,   talents:0,  weight:3,  color:'#7f8c8d' }
];

/* ═══════════════════════════════════════════════════════════
   📋 ЗАДАНИЯ
   ═══════════════════════════════════════════════════════════ */
var QUEST_DEFINITIONS = [
  { id:'read_article',   icon:'📖', title:'Прочитать статью',    reward:'+5 XP',  xp:5 },
  { id:'visit_place',    icon:'📍', title:'Посетить новое место', reward:'+10 XP', xp:10 },
  { id:'pass_quiz',      icon:'🧠', title:'Пройти викторину',     reward:'+20 XP', xp:20 },
  { id:'use_translator', icon:'🗣️', title:'Перевести слово',      reward:'+5 XP',  xp:5 }
];

/* ═══════════════════════════════════════════════════════════
   📦 СОСТОЯНИЕ
   ═══════════════════════════════════════════════════════════ */
var state = {
  user: null,
  profile: null,
  kingdom: KINGDOMS['Эдем'],
  initPromise: null,
  initDone: false,
  lastInitTs: 0,
  tasksPromise: null,
  lastTasksTs: 0,
  storageTimer: null,
  audioCtx: null,
  audioUnlocked: false
};

/* ═══════════════════════════════════════════════════════════
   🌉 КЛИЕНТ
   ═══════════════════════════════════════════════════════════ */
var client = null;
function getClient() {
  if (client && client.auth) return client;
  if (window.supabaseClient && window.supabaseClient.auth) { client = window.supabaseClient; return client; }
  if (window.getSupabase) { try { var c = window.getSupabase(); if (c && c.auth) { client = c; return client; } } catch(e){} }
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { storageKey: SB_KEY, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
      });
      return client;
    } catch(e){}
  }
  return null;
}

/* ═══════════════════════════════════════════════════════════
   🔧 УТИЛИТЫ
   ═══════════════════════════════════════════════════════════ */
function todayStr() { return new Date().toISOString().slice(0, 10); }
function esc(s) { return String(s||'').replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }
function isOnline() { return navigator.onLine !== false; }

function readRewardCheck() {
  try {
    var raw = localStorage.getItem(K_CACHE_REWARD);
    if (!raw) return null;
    var c = JSON.parse(raw);
    return (c && c.ts) ? c : null;
  } catch(e){ return null; }
}
function writeRewardCheck(date, streak) {
  try { localStorage.setItem(K_CACHE_REWARD, JSON.stringify({ date:date, streak:streak, ts:Date.now() })); } catch(e){}
}
function isRewardDoneToday() {
  try {
    var c = JSON.parse(localStorage.getItem(K_REWARD_DONE) || 'null');
    return c && c.date === todayStr();
  } catch(e){ return false; }
}
function markRewardDoneToday() {
  try { localStorage.setItem(K_REWARD_DONE, JSON.stringify({ date: todayStr(), ts: Date.now() })); } catch(e){}
}
function isRouletteDoneToday() {
  try {
    var c = JSON.parse(localStorage.getItem(K_ROULETTE) || 'null');
    return c && c.date === todayStr();
  } catch(e){ return false; }
}
function markRouletteDoneToday() {
  try { localStorage.setItem(K_ROULETTE, JSON.stringify({ date: todayStr(), ts: Date.now() })); } catch(e){}
}
function readStreakCache() {
  try {
    var raw = localStorage.getItem(K_STREAK_CACHE);
    if (!raw) return null;
    var c = JSON.parse(raw);
    if (!c || !c.ts) return null;
    if (Date.now() - c.ts > 6 * 60 * 60 * 1000) return null;
    return c;
  } catch(e){ return null; }
}

async function withRetry(fn, retries) {
  retries = retries == null ? MAX_RETRIES : retries;
  var lastErr;
  for (var i = 0; i <= retries; i++) {
    try { return await fn(); }
    catch(e) {
      lastErr = e;
      if (i < retries) await new Promise(function(r){ setTimeout(r, RETRY_DELAY); });
    }
  }
  throw lastErr;
}

/* ═══════════════════════════════════════════════════════════
   🔊 ЗВУКИ (Web Audio)
   ═══════════════════════════════════════════════════════════ */
function getAudioCtx() {
  if (!state.audioUnlocked) return null;
  try {
    if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (state.audioCtx.state === 'suspended') state.audioCtx.resume().catch(function(){});
  } catch(e){ return null; }
  return state.audioCtx;
}

function unlockAudio() {
  if (state.audioUnlocked) return;
  function un() {
    try {
      if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      state.audioUnlocked = true;
    } catch(e){}
    document.removeEventListener('touchstart', un);
    document.removeEventListener('click', un);
    document.removeEventListener('keydown', un);
  }
  document.addEventListener('touchstart', un, {passive:true});
  document.addEventListener('click', un, {passive:true});
  document.addEventListener('keydown', un, {passive:true});
}

function note(freq, dur, type, vol) {
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

function sfxOpen() { [523.25, 659.25, 783.99].forEach(function(f,i){ setTimeout(function(){ note(f, 0.18, 'triangle', 0.08); }, i * 60); }); }
function sfxReward() { [659.25, 783.99, 987.77, 1174.66].forEach(function(f,i){ setTimeout(function(){ note(f, 0.35, 'sine', 0.1); }, i * 90); }); }
function sfxBonus() { [523, 659, 783, 1046, 1318].forEach(function(f,i){ setTimeout(function(){ note(f, 0.4, 'triangle', 0.11); }, i * 100); }); setTimeout(function(){ note(1567.98, 0.9, 'sine', 0.09); }, 600); }
function sfxSpinTick() { note(440 + Math.random() * 200, 0.04, 'square', 0.035); }
function sfxWin() { [880, 1174.66, 1567.98, 2093].forEach(function(f,i){ setTimeout(function(){ note(f, 0.25, 'sine', 0.1); }, i * 70); }); }
function sfxLose() { [440, 330, 220].forEach(function(f,i){ setTimeout(function(){ note(f, 0.25, 'sine', 0.06); }, i * 100); }); }
function sfxCoin() { [1318.51, 1567.98, 2093.00].forEach(function(f,i){ setTimeout(function(){ note(f, 0.15, 'triangle', 0.1); }, i * 50); }); }

/* ═══════════════════════════════════════════════════════════
   🎊 КОНФЕТТИ
   ═══════════════════════════════════════════════════════════ */
function fireConfetti(opts) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  opts = opts || {};
  var count = opts.count || 70;
  var colors = opts.colors || ['#f5d76e','#f39c12','#e74c3c','#3498db','#27ae60','#9b59b6','#fff'];

  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483600;overflow:hidden;';
  document.body.appendChild(wrap);

  for (var i = 0; i < count; i++) {
    var p = document.createElement('div');
    p.style.cssText =
      'position:absolute;top:-20px;width:' + (6 + Math.random() * 8) + 'px;height:' +
      (10 + Math.random() * 8) + 'px;border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';' +
      'left:' + (Math.random() * 100) + '%;background:' + colors[i % colors.length] + ';' +
      'animation:dailyConfettiFall ' + (2.5 + Math.random() * 2) + 's linear ' + (Math.random() * 0.6) + 's forwards;' +
      'will-change:transform;';
    wrap.appendChild(p);
  }
  setTimeout(function(){ if (wrap.parentNode) wrap.remove(); }, 5200);
}

/* ═══════════════════════════════════════════════════════════
   ✨ ЧАСТИЦЫ
   ═══════════════════════════════════════════════════════════ */
function spawnParticles(cx, cy, count, colors) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  count = count || 20;
  colors = colors || ['#f5d76e','#f39c12','#e67e22','#fff'];

  for (var i = 0; i < count; i++) {
    (function(idx){
      setTimeout(function(){
        var p = document.createElement('div');
        var angle = (Math.PI * 2 * idx) / count + Math.random() * 0.4;
        var dist = 100 + Math.random() * 200;
        var size = 6 + Math.random() * 10;
        var color = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText =
          'position:fixed;left:' + cx + 'px;top:' + cy + 'px;width:' + size + 'px;height:' + size + 'px;' +
          'border-radius:50%;background:' + color + ';box-shadow:0 0 14px ' + color + ';' +
          'pointer-events:none;z-index:2147483640;will-change:transform,opacity;' +
          'transition:transform 1.2s cubic-bezier(.16,1,.3,1),opacity 1.2s ease;';
        document.body.appendChild(p);
        requestAnimationFrame(function(){
          p.style.transform = 'translate(' + (Math.cos(angle) * dist) + 'px,' + (Math.sin(angle) * dist - 40) + 'px) scale(.3)';
          p.style.opacity = '0';
        });
        setTimeout(function(){ if (p.parentNode) p.remove(); }, 1300);
      }, idx * 22);
    })(i);
  }
}

/* ═══════════════════════════════════════════════════════════
   🪙 МОНЕТЫ-ЧАСТИЦЫ (для талантов)
   ═══════════════════════════════════════════════════════════ */
function spawnCoins(cx, cy, count) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  count = count || 8;

  for (var i = 0; i < count; i++) {
    (function(idx){
      setTimeout(function(){
        var coin = document.createElement('div');
        var angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
        var dist = 120 + Math.random() * 150;
        var size = 28 + Math.random() * 16;
        coin.style.cssText =
          'position:fixed;left:' + cx + 'px;top:' + cy + 'px;width:' + size + 'px;height:' + size + 'px;' +
          'background:url(' + COIN_IMG + ') center/cover no-repeat;border-radius:50%;' +
          'box-shadow:0 0 20px #f5d76e,0 0 0 2px #f5d76e;' +
          'pointer-events:none;z-index:2147483641;will-change:transform,opacity;' +
          'transition:transform 1.6s cubic-bezier(.16,1,.3,1),opacity 1.6s ease;';
        document.body.appendChild(coin);
        requestAnimationFrame(function(){
          coin.style.transform = 'translate(' + (Math.cos(angle) * dist) + 'px,' + (Math.sin(angle) * dist) + 'px) rotate(' + (Math.random() * 720 - 360) + 'deg) scale(.4)';
          coin.style.opacity = '0';
        });
        setTimeout(function(){ if (coin.parentNode) coin.remove(); }, 1700);
      }, idx * 60);
    })(i);
  }
}

/* ═══════════════════════════════════════════════════════════
   🎨 СТИЛИ
   ═══════════════════════════════════════════════════════════ */
function injectStyles() {
  var old = document.getElementById(STYLE_ID);
  if (old) old.remove();

  var s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    /* ═══ KEYFRAMES ═══ */
    @keyframes dailyFadeIn{from{opacity:0}to{opacity:1}}
    @keyframes dailySlideUp{
      0%{opacity:0;transform:translateY(40px) scale(.9) rotate(-2deg)}
      60%{opacity:1;transform:translateY(-6px) scale(1.03) rotate(1deg)}
      100%{opacity:1;transform:translateY(0) scale(1) rotate(0)}
    }
    @keyframes dailyPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
    @keyframes dailySpin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
    @keyframes dailySpinWheel{
      0%{transform:rotate(0)}
      100%{transform:rotate(1440deg)}
    }
    @keyframes dailyBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes dailyBounceStrong{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.1)}}
    @keyframes dailyShine{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes dailyGlow{
      0%,100%{box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 60px var(--dk-color,#F4A460) inset}
      50%{box-shadow:0 30px 100px rgba(0,0,0,.7),0 0 100px var(--dk-color,#F4A460) inset}
    }
    @keyframes dailyFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,-30px)}}
    @keyframes dailyFloat2{0%,100%{transform:translate(0,0)}50%{transform:translate(25px,-40px)}}
    @keyframes dailyConfettiFall{
      0%{transform:translateY(0) rotate(0);opacity:1}
      100%{transform:translateY(110vh) rotate(900deg);opacity:.2}
    }
    @keyframes dailyNumberFly{
      0%{opacity:0;transform:translateY(30px) scale(.4)}
      50%{opacity:1;transform:translateY(-10px) scale(1.15)}
      100%{opacity:1;transform:translateY(0) scale(1)}
    }
    @keyframes dailyRing{
      0%{transform:scale(1);opacity:1}
      100%{transform:scale(2.5);opacity:0}
    }
    @keyframes dailyFlash{
      0%{opacity:0}
      20%{opacity:1}
      100%{opacity:0}
    }
    @keyframes dailyBtnPulse{
      0%,100%{box-shadow:0 12px 32px rgba(0,0,0,.35),0 0 0 3px rgba(255,255,255,.1) inset}
      50%{box-shadow:0 12px 32px rgba(0,0,0,.5),0 0 24px rgba(245,215,110,.6),0 0 0 3px rgba(255,255,255,.2) inset}
    }
    @keyframes dailyCoinSpin{
      0%{transform:rotateY(0deg)}
      100%{transform:rotateY(360deg)}
    }
    @keyframes dailyCoinFloat{
      0%,100%{transform:translateY(0) rotateY(0deg)}
      50%{transform:translateY(-8px) rotateY(180deg)}
    }
    @keyframes dailyCoinShine{
      0%,100%{filter:drop-shadow(0 8px 24px rgba(245,215,110,.6)) brightness(1)}
      50%{filter:drop-shadow(0 12px 40px rgba(245,215,110,1)) brightness(1.25)}
    }

    /* ═══ OVERLAY ═══ */
    #daily-modal-overlay{
      position:fixed;inset:0;z-index:2147483644;
      background:rgba(10,10,26,.78);
      backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
      display:flex;align-items:center;justify-content:center;
      padding:20px;animation:dailyFadeIn .3s ease;
      overflow-y:auto;
    }

    /* ═══ CARD ═══ */
    .daily-modal-card{
      position:relative;
      background:linear-gradient(135deg,var(--dk-color,#F4A460) 0%,var(--dk-light,#F7C98A) 50%,var(--dk-color,#F4A460) 100%);
      background-size:200% 200%;
      color:#fff;
      max-width:460px;width:100%;
      padding:44px 32px 36px;
      border-radius:28px;
      text-align:center;
      animation:dailySlideUp .6s cubic-bezier(.16,1,.3,1),dailyGlow 4s ease-in-out infinite;
      overflow:hidden;
      font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
      box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.18) inset;
      isolation:isolate;
    }
    .daily-modal-card::before{
      content:'';position:absolute;inset:0;z-index:0;
      background:
        radial-gradient(circle at 20% 20%,rgba(255,255,255,.3),transparent 55%),
        radial-gradient(circle at 80% 80%,rgba(255,255,255,.18),transparent 55%),
        radial-gradient(circle at 50% 0%,rgba(255,255,255,.22),transparent 70%);
      pointer-events:none;
      animation:dailyPulse 6s ease-in-out infinite;
    }
    .daily-modal-card::after{
      content:'';position:absolute;inset:0;z-index:0;
      background:linear-gradient(120deg,transparent 0%,transparent 40%,rgba(255,255,255,.35) 50%,transparent 60%,transparent 100%);
      background-size:200% 100%;
      animation:dailyShine 3s ease-in-out infinite;
      pointer-events:none;
    }

    .daily-orb{
      position:absolute;width:180px;height:180px;border-radius:50%;
      background:radial-gradient(circle,rgba(255,255,255,.35),transparent 70%);
      pointer-events:none;z-index:0;filter:blur(8px);
    }
    .daily-orb.a{top:-40px;left:-40px;animation:dailyFloat 12s ease-in-out infinite}
    .daily-orb.b{bottom:-60px;right:-40px;animation:dailyFloat2 14s ease-in-out infinite}

    .daily-modal-card > *{position:relative;z-index:2}

    /* ═══ ЗАКРЫТЬ ═══ */
    .daily-close{
      position:absolute;top:14px;right:18px;
      background:rgba(255,255,255,.22);border:none;
      width:38px;height:38px;border-radius:50%;
      color:#fff;font-size:18px;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      transition:all .3s;z-index:5;font-family:inherit;
      padding:0;line-height:1;
      backdrop-filter:blur(8px);
    }
    .daily-close:hover{background:rgba(255,255,255,.45);transform:rotate(90deg) scale(1.08)}

    /* ═══ ТИПОГРАФИЯ ═══ */
    .daily-icon{
      font-size:5rem;margin-bottom:12px;display:inline-block;
      animation:dailyBounceStrong 2.2s ease-in-out infinite;
      filter:drop-shadow(0 12px 36px rgba(0,0,0,.4));
      line-height:1;
    }
    .daily-title{
      margin:0 0 8px;font-size:1.9rem;font-weight:900;
      letter-spacing:-.5px;text-shadow:0 3px 12px rgba(0,0,0,.25);
    }
    .daily-subtitle{margin:0 0 22px;opacity:.95;font-size:.98rem;font-weight:600}

    /* ═══ БОЛЬШОЕ ЧИСЛО XP ═══ */
    .daily-reward-big{
      font-size:4rem;font-weight:900;line-height:1;
      margin:16px 0 8px;letter-spacing:-2px;
      text-shadow:0 4px 24px rgba(0,0,0,.3);
      background:linear-gradient(90deg,#fff 0%,#ffe9b8 25%,#fff 50%,#ffe9b8 75%,#fff 100%);
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      background-clip:text;
      animation:dailyShine 2.5s linear infinite,dailyNumberFly .8s cubic-bezier(.16,1,.3,1);
    }
    .daily-reward-big .unit{font-size:.5em;font-weight:800;opacity:.9}

    /* ═══ БОЛЬШАЯ МОНЕТА ═══ */
    .daily-coin-big{
      display:inline-block;
      width:90px;height:90px;
      margin:8px 0 4px;
      background:url('${COIN_IMG}') center/cover no-repeat;
      border-radius:50%;
      box-shadow:
        0 12px 32px rgba(0,0,0,.4),
        0 0 0 4px #f5d76e,
        0 0 40px rgba(245,215,110,.7);
      animation:dailyCoinFloat 2s ease-in-out infinite,dailyCoinShine 2s ease-in-out infinite;
    }

    /* ═══ ТАЛАНТЫ ═══ */
    .daily-talents-badge{
      display:inline-flex;align-items:center;gap:10px;
      margin:8px 0;padding:10px 20px;border-radius:40px;
      background:linear-gradient(135deg,rgba(245,215,110,.4),rgba(212,175,55,.25));
      border:1.5px solid rgba(245,215,110,.7);
      font-weight:900;font-size:1rem;color:#fff8d0;
      text-shadow:0 2px 6px rgba(0,0,0,.35);
      animation:dailyPulse 2s ease-in-out infinite;
      box-shadow:0 8px 24px rgba(212,175,55,.4);
    }
    .daily-talents-badge img{
      width:32px;height:32px;border-radius:50%;object-fit:cover;
      box-shadow:0 0 0 2px #f5d76e,0 0 16px rgba(245,215,110,.8);
      animation:dailyCoinSpin 3s linear infinite;
    }

    /* ═══ БОНУС ═══ */
    .daily-bonus-badge{
      display:inline-block;padding:10px 22px;border-radius:40px;
      background:linear-gradient(135deg,rgba(245,215,110,.4),rgba(243,156,18,.3));
      border:2px solid rgba(255,255,255,.6);
      font-weight:900;font-size:.9rem;letter-spacing:.5px;
      margin:6px 0 12px;
      animation:dailyBounce 1.4s ease-in-out infinite;
      box-shadow:0 8px 24px rgba(243,156,18,.5),0 0 0 3px rgba(255,255,255,.15) inset;
      text-shadow:0 2px 6px rgba(0,0,0,.35);
    }

    /* ═══ КНОПКИ ═══ */
    .daily-btn{
      display:inline-flex;align-items:center;justify-content:center;gap:10px;
      padding:16px 36px;border-radius:44px;
      border:2px solid rgba(255,255,255,.55);
      background:rgba(255,255,255,.25);
      color:#fff;font-size:1.02rem;font-weight:900;
      cursor:pointer;font-family:inherit;
      -webkit-tap-highlight-color:transparent;
      text-decoration:none;
      transition:all .35s cubic-bezier(.16,1,.3,1);
      backdrop-filter:blur(10px);
      letter-spacing:.3px;
      position:relative;overflow:hidden;
    }
    .daily-btn::before{
      content:'';position:absolute;inset:0;
      background:linear-gradient(120deg,transparent,rgba(255,255,255,.4),transparent);
      transform:translateX(-100%);transition:transform .6s;
    }
    .daily-btn:hover::before{transform:translateX(100%)}
    .daily-btn:hover{background:rgba(255,255,255,.4);transform:translateY(-3px);box-shadow:0 16px 32px rgba(0,0,0,.3)}
    .daily-btn:active{transform:translateY(0) scale(.97)}
    .daily-btn.primary{background:#fff;color:#333;border-color:#fff}
    .daily-btn.primary:hover{background:#f0f0f0;color:#000;box-shadow:0 16px 32px rgba(255,255,255,.4)}

    /* ═══ РУЛЕТКА ═══ */
    .daily-roulette-stage{
      position:relative;
      width:280px;height:280px;
      margin:26px auto 22px;
      display:flex;align-items:center;justify-content:center;
    }
    .daily-roulette-wheel-svg{
      width:100%;height:100%;
      filter:drop-shadow(0 16px 40px rgba(0,0,0,.5));
      transition:transform 4s cubic-bezier(.15,.9,.25,1);
      transform-origin:50% 50%;
      will-change:transform;
      position:relative;z-index:2;
    }
    .daily-roulette-ring{
      position:absolute;inset:-10px;border-radius:50%;
      border:3px solid rgba(255,255,255,.6);
      pointer-events:none;
      box-shadow:0 0 30px rgba(255,255,255,.35),inset 0 0 30px rgba(255,255,255,.2);
    }
    .daily-roulette-ring.pulse{animation:dailyRing 2s ease-out infinite}
    .daily-roulette-pointer{
      position:absolute;top:-8px;left:50%;
      transform:translateX(-50%);
      font-size:2rem;z-index:5;
      filter:drop-shadow(0 4px 8px rgba(0,0,0,.6));
      animation:dailyBounce 1.6s ease-in-out infinite;
    }
    .daily-roulette-center{
      position:absolute;top:50%;left:50%;
      transform:translate(-50%,-50%);
      width:56px;height:56px;
      border-radius:50%;
      background:radial-gradient(circle at 30% 30%,#fff,#ddd 50%,#aaa);
      border:3px solid #fff;
      display:flex;align-items:center;justify-content:center;
      font-size:1.6rem;
      z-index:4;
      box-shadow:0 4px 12px rgba(0,0,0,.5),inset 0 -4px 8px rgba(0,0,0,.15);
      pointer-events:none;
    }
    .daily-wheel-sector-text{
      font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
      font-weight:900;
      pointer-events:none;
      user-select:none;
      text-anchor:middle;
      dominant-baseline:middle;
    }

    /* ═══ ПРИЗ ═══ */
    .daily-prize-reveal{animation:dailyNumberFly .7s cubic-bezier(.16,1,.3,1)}
    .daily-prize-icon{
      font-size:5rem;line-height:1;
      margin:14px 0 10px;
      filter:drop-shadow(0 12px 32px rgba(0,0,0,.4));
      animation:dailyBounceStrong 1.5s ease-in-out infinite;
      display:inline-block;
    }
    .daily-prize-icon img{
      width:96px;height:96px;
      border-radius:50%;object-fit:cover;
      box-shadow:
        0 12px 32px rgba(0,0,0,.5),
        0 0 0 4px #f5d76e,
        0 0 40px rgba(245,215,110,.8);
      animation:dailyCoinFloat 2s ease-in-out infinite,dailyCoinShine 2s ease-in-out infinite;
      display:block;
    }
    .daily-prize-label{
      font-size:2.2rem;font-weight:900;
      letter-spacing:-1px;
      text-shadow:0 4px 20px rgba(0,0,0,.3);
      margin-bottom:6px;
      background:linear-gradient(90deg,#fff 0%,#ffe9b8 25%,#fff 50%,#ffe9b8 75%,#fff 100%);
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      background-clip:text;
      animation:dailyShine 2.5s linear infinite;
    }
    .daily-prize-extra{
      font-size:.95rem;opacity:.92;font-weight:700;
      margin-bottom:22px;
    }

    /* ═══ ВСПЫШКА ═══ */
    .daily-flash{
      position:fixed;inset:0;pointer-events:none;z-index:2147483645;
      background:radial-gradient(circle at center,rgba(255,255,255,.9),rgba(255,215,110,.6) 30%,transparent 70%);
      opacity:0;
    }
    .daily-flash.fire{animation:dailyFlash .5s ease-out}

    /* ═══ КНОПКА РУЛЕТКИ ═══ */
    .daily-roulette-btn{
      position:fixed;bottom:80px;right:20px;z-index:9998;
      background:linear-gradient(135deg,var(--dk-color,#F4A460),var(--dk-light,#F7C98A));
      color:#fff;border:2px solid rgba(255,255,255,.5);
      padding:14px 26px;border-radius:44px;
      font-weight:900;font-size:.95rem;
      cursor:pointer;font-family:inherit;
      box-shadow:0 12px 32px rgba(0,0,0,.35),0 0 0 3px rgba(255,255,255,.1) inset;
      animation:dailyBounce 2.4s ease-in-out infinite,dailyBtnPulse 2s ease-in-out infinite;
      transition:transform .3s,opacity .3s;
      -webkit-tap-highlight-color:transparent;
      text-shadow:0 2px 4px rgba(0,0,0,.3);
    }
    .daily-roulette-btn:hover{transform:scale(1.08) rotate(-3deg)}
    .daily-roulette-btn::after{
      content:'';position:absolute;inset:-8px;border-radius:44px;
      border:2px solid currentColor;opacity:.3;
      animation:dailyRing 2s ease-out infinite;
    }

    /* ═══ МОБИЛЬНЫЙ ═══ */
    @media (max-width:600px){
      .daily-modal-card{padding:32px 22px 26px;border-radius:22px}
      .daily-icon{font-size:3.6rem}
      .daily-title{font-size:1.5rem}
      .daily-reward-big{font-size:3rem}
      .daily-prize-label{font-size:1.7rem}
      .daily-prize-icon{font-size:4rem}
      .daily-prize-icon img{width:72px;height:72px}
      .daily-coin-big{width:72px;height:72px}
      .daily-btn{padding:13px 26px;font-size:.92rem}
      .daily-roulette-stage{width:230px;height:230px;margin:20px auto}
      .daily-roulette-btn{bottom:100px;right:12px;padding:12px 20px;font-size:.85rem}
      .daily-close{width:32px;height:32px;font-size:15px}
      .daily-roulette-center{width:46px;height:46px;font-size:1.3rem}
    }

    @media (prefers-reduced-motion: reduce){
      .daily-modal-card,.daily-icon,.daily-roulette-wheel-svg,.daily-roulette-btn,
      .daily-reward-big,.daily-bonus-badge,.daily-prize-icon,.daily-prize-label,
      .daily-orb,.daily-roulette-pointer,.daily-coin-big,.daily-talents-badge img{
        animation:none !important;
      }
    }
  `;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════════
   🖼 МОДАЛКА
   ═══════════════════════════════════════════════════════════ */
function showModal(html) {
  var old = document.getElementById('daily-modal-overlay');
  if (old) old.remove();

  var overlay = document.createElement('div');
  overlay.id = 'daily-modal-overlay';
  overlay.innerHTML =
    '<div class="daily-modal-card" style="--dk-color:' + state.kingdom.color + ';--dk-light:' + state.kingdom.light + ';">' +
      '<div class="daily-orb a"></div>' +
      '<div class="daily-orb b"></div>' +
      '<button class="daily-close" type="button" aria-label="Закрыть">✕</button>' +
      '<div class="daily-modal-content">' + html + '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  function closeOverlay() {
    overlay.remove();
    document.removeEventListener('keydown', escH);
  }
  function escH(e) {
    if (e.key === 'Escape') closeOverlay();
  }

  overlay.querySelector('.daily-close').onclick = closeOverlay;
  overlay.addEventListener('click', function(e){
    if (e.target === overlay) closeOverlay();
  });
  document.addEventListener('keydown', escH);

  return overlay;
}

/* ═══════════════════════════════════════════════════════════
   🎁 МОДАЛКА ЕЖЕДНЕВНОЙ НАГРАДЫ
   ═══════════════════════════════════════════════════════════ */
function showDailyReward(streak, reward) {
  var xp = reward.xp || 0;
  var talents = reward.talents || 0;
  var isBonus = [3,7,14,30,100].indexOf(streak) !== -1;

  var bonusHTML = isBonus
    ? '<div class="daily-bonus-badge">🎉 БОНУС ЗА ' + streak + ' ДНЕЙ!</div>'
    : '';

  var dayWord = streak === 1 ? 'день' : (streak < 5 ? 'дня' : 'дней');

  var xpHtml = xp > 0
    ? '<div class="daily-reward-big">+' + xp + '<span class="unit"> XP</span></div>'
    : '';

  var talentsHtml = talents > 0
    ? '<div class="daily-talents-badge">' +
        '<img src="' + COIN_IMG + '" alt="🪙" onerror="this.style.display=\'none\'">' +
        '<span>+' + talents + ' талантов</span>' +
      '</div>'
    : '';

  var overlay = showModal(
    '<div class="daily-icon">🎁</div>' +
    '<h2 class="daily-title">Ежедневная награда!</h2>' +
    '<p class="daily-subtitle">Ты заходишь ' + streak + ' ' + dayWord + ' подряд</p>' +
    bonusHTML +
    xpHtml +
    talentsHtml +
    '<p class="daily-subtitle" style="margin-top:16px;">Завтра получишь ещё больше!</p>' +
    '<button class="daily-btn" id="daily-roulette-link" type="button" style="margin-top:14px;">🎲 Крутить рулетку</button>'
  );

  var card = overlay.querySelector('.daily-modal-card');
  var rect = card ? card.getBoundingClientRect() : null;

  if (isBonus){
    sfxBonus();
    fireConfetti({ count: 100 });
    if (rect) spawnParticles(rect.left + rect.width/2, rect.top + rect.height/2, 30, ['#f5d76e','#f39c12','#fff','#ffe9b8']);
  } else {
    sfxReward();
    if (rect) spawnParticles(rect.left + rect.width/2, rect.top + rect.height/2, 16, ['#f5d76e','#f39c12','#fff']);
  }

  /* Если были таланты — летят монеты */
  if (talents > 0 && rect) {
    setTimeout(function(){ sfxCoin(); }, 300);
    setTimeout(function(){
      spawnCoins(rect.left + rect.width/2, rect.top + rect.height/2, 8);
    }, 400);
  }

  /* Событие */
  try {
    window.dispatchEvent(new CustomEvent('marsDailyRewardShown', {
      detail: { streak: streak, xp: xp, talents: talents }
    }));
  } catch(e){}

  overlay.querySelector('#daily-roulette-link').onclick = function(){
    overlay.remove();
    setTimeout(openRoulette, 100);
  };
}

/* ═══════════════════════════════════════════════════════════
   🎡 ГЕНЕРАЦИЯ SVG-КОЛЕСА
   ═══════════════════════════════════════════════════════════ */
function buildWheelSVG() {
  var n = ROULETTE_PRIZES.length;
  var sectorDeg = 360 / n;
  var cx = 100, cy = 100, r = 92;

  var parts = [];

  parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 3) + '" fill="#1a1a2e" opacity="0.4"/>');
  parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#fff" stroke-width="2" opacity="0.5"/>');

  for (var i = 0; i < n; i++) {
    var a1 = (i * sectorDeg - 90) * Math.PI / 180;
    var a2 = ((i + 1) * sectorDeg - 90) * Math.PI / 180;
    var am = ((i + 0.5) * sectorDeg - 90) * Math.PI / 180;

    var x1 = cx + r * Math.cos(a1);
    var y1 = cy + r * Math.sin(a1);
    var x2 = cx + r * Math.cos(a2);
    var y2 = cy + r * Math.sin(a2);

    var prize = ROULETTE_PRIZES[i];
    var fill = prize.color || '#6C63FF';

    var largeArc = sectorDeg > 180 ? 1 : 0;
    var path = 'M ' + cx + ' ' + cy +
               ' L ' + x1.toFixed(2) + ' ' + y1.toFixed(2) +
               ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) +
               ' Z';

    parts.push('<path d="' + path + '" fill="' + fill + '" stroke="#fff" stroke-width="1" opacity="0.95"/>');

    var iconR = r * 0.68;
    var ix = cx + iconR * Math.cos(am);
    var iy = cy + iconR * Math.sin(am);

    parts.push(
      '<text x="' + ix.toFixed(1) + '" y="' + iy.toFixed(1) + '" ' +
      'class="daily-wheel-sector-text" font-size="20" fill="#fff">' +
      esc(prize.icon) +
      '</text>'
    );

    var labelR = r * 0.86;
    var lx = cx + labelR * Math.cos(am);
    var ly = cy + labelR * Math.sin(am);
    var shortLabel = prize.label.length > 9 ? prize.label.slice(0, 8) + '…' : prize.label;

    parts.push(
      '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" ' +
      'class="daily-wheel-sector-text" font-size="7" fill="#fff" opacity="0.95">' +
      esc(shortLabel) +
      '</text>'
    );
  }

  return '<svg viewBox="0 0 200 200" class="daily-roulette-wheel-svg" id="daily-roulette-wheel">' +
    parts.join('') +
    '</svg>';
}

/* ═══════════════════════════════════════════════════════════
   🎲 РУЛЕТКА
   ═══════════════════════════════════════════════════════════ */
function pickPrize() {
  var total = 0;
  for (var i = 0; i < ROULETTE_PRIZES.length; i++) total += ROULETTE_PRIZES[i].weight;
  var r = Math.random() * total;
  for (var j = 0; j < ROULETTE_PRIZES.length; j++){
    if (r < ROULETTE_PRIZES[j].weight) return ROULETTE_PRIZES[j];
    r -= ROULETTE_PRIZES[j].weight;
  }
  return ROULETTE_PRIZES[0];
}

async function openRoulette() {
  var userId = state.user && state.user.id;

  if (!userId) {
    try {
      var sb = getClient();
      if (sb) {
        var sess = await sb.auth.getSession();
        var u = sess && sess.data && sess.data.session && sess.data.session.user;
        if (u) { userId = u.id; state.user = u; }
      }
    } catch(e){}
  }

  if (!userId) {
    showModal(
      '<div class="daily-icon">🔒</div>' +
      '<h2 class="daily-title">Войдите, чтобы играть</h2>' +
      '<p class="daily-subtitle">Рулетка доступна только залогиненным</p>' +
      '<a href="/login/" class="daily-btn primary" style="text-decoration:none;">🔐 Войти</a>'
    );
    return;
  }

  sfxOpen();

  if (isRouletteDoneToday()) {
    showModal(
      '<div class="daily-icon">⏰</div>' +
      '<h2 class="daily-title">Уже крутил сегодня!</h2>' +
      '<p class="daily-subtitle">Возвращайся завтра за новой попыткой</p>' +
      '<button class="daily-btn" onclick="this.closest(\'#daily-modal-overlay\').remove();" type="button">Хорошо</button>'
    );
    return;
  }

  var prize = pickPrize();
  var winnerIndex = ROULETTE_PRIZES.indexOf(prize);
  if (winnerIndex < 0) winnerIndex = 0;

  var n = ROULETTE_PRIZES.length;
  var sectorDeg = 360 / n;
  var sectorCenter = winnerIndex * sectorDeg + sectorDeg / 2;

  var fullSpins = SPIN_MIN_TURNS + Math.floor(Math.random() * (SPIN_MAX_TURNS - SPIN_MIN_TURNS + 1));
  var extraAngle = (360 - sectorCenter + 360) % 360;
  var targetRotation = fullSpins * 360 + extraAngle;

  var overlay = showModal(
    '<div style="font-size:1.45rem;font-weight:900;margin-bottom:8px;text-shadow:0 2px 8px rgba(0,0,0,.35);letter-spacing:-.3px;">🎡 Рулетка удачи</div>' +
    '<div class="daily-roulette-stage">' +
      '<div class="daily-roulette-ring pulse"></div>' +
      '<div class="daily-roulette-pointer">▼</div>' +
      buildWheelSVG() +
      '<div class="daily-roulette-center">🎰</div>' +
    '</div>' +
    '<div id="daily-roulette-result" class="daily-subtitle">Крутим...</div>'
  );

  markRouletteDoneToday();

  /* Убираем кнопку рулетки плавно */
  var rBtn = document.getElementById('daily-roulette-btn');
  if (rBtn) {
    rBtn.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1),opacity .4s ease';
    rBtn.style.transform = 'scale(0) rotate(-180deg)';
    rBtn.style.opacity = '0';
    setTimeout(function(){ if (rBtn.parentNode) rBtn.remove(); }, 420);
  }

  var wheel = overlay.querySelector('#daily-roulette-wheel');

  setTimeout(function() {
    if (!wheel) return;
    wheel.style.transition = 'transform ' + (SPIN_DURATION / 1000) + 's cubic-bezier(.15,.9,.25,1)';
    wheel.style.transform = 'rotate(' + targetRotation + 'deg)';
  }, 100);

  var tickInterval = setInterval(function(){ sfxSpinTick(); }, 130);
  setTimeout(function(){ clearInterval(tickInterval); }, SPIN_DURATION);

  setTimeout(async function() {
    var flash = document.createElement('div');
    flash.className = 'daily-flash fire';
    document.body.appendChild(flash);
    setTimeout(function(){ if (flash.parentNode) flash.remove(); }, 700);

    if (prize.xp > 0) { try { await addXP(userId, prize.xp); } catch(e){} }
    if (prize.talents > 0 && window.marsExperience && window.marsExperience.addTalents) {
      try { await window.marsExperience.addTalents(userId, prize.talents, 'Из рулетки'); } catch(e){}
    }

    var isWin = prize.xp > 0 || prize.talents > 0;
    if (isWin) {
      sfxWin();
      if (prize.isCoin) sfxCoin();
      fireConfetti({ count: 90, colors: [prize.color, '#f5d76e', '#fff', '#ffe9b8'] });
    } else if (prize.special === 'luck') {
      sfxWin();
      fireConfetti({ count: 60, colors: ['#e74c3c','#f39c12','#f5d76e','#fff'] });
    } else {
      sfxLose();
    }

    var resultEl = overlay.querySelector('#daily-roulette-result');
    if (resultEl) {
      var extra;
      if (prize.xp > 0) extra = '+' + prize.xp + ' XP добавлено!';
      else if (prize.talents > 0) extra = '+' + prize.talents + ' талантов добавлено!';
      else if (prize.special === 'luck') extra = 'Повезло! Возвращайся завтра';
      else extra = 'Повезёт в следующий раз';

      /* Для талантов — показываем монету */
      var prizeIconHTML = prize.isCoin
        ? '<img src="' + COIN_IMG + '" alt="🪙" onerror="this.replaceWith(document.createTextNode(\'🪙\'))">'
        : prize.icon;

      var resultHTML =
        '<div class="daily-prize-reveal">' +
          '<div class="daily-prize-icon">' + prizeIconHTML + '</div>' +
          '<div class="daily-prize-label">' + esc(prize.label) + '</div>' +
          '<div class="daily-prize-extra">' + extra + '</div>' +
        '</div>' +
        '<button class="daily-btn primary" id="daily-close-btn" type="button">✨ Забрать</button>';

      resultEl.outerHTML = '<div id="daily-roulette-result">' + resultHTML + '</div>';

      var stage = overlay.querySelector('.daily-roulette-stage');
      if (stage && isWin) {
        var rect = stage.getBoundingClientRect();
        if (prize.isCoin) {
          spawnCoins(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
        } else {
          spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 30, [prize.color, '#f5d76e', '#fff', '#ffe9b8']);
        }
      }

      var closeBtn = overlay.querySelector('#daily-close-btn');
      if (closeBtn) {
        closeBtn.onclick = function() {
          overlay.remove();
          try {
            window.dispatchEvent(new CustomEvent('marsRouletteFinished', {
              detail: { prize: prize.label, xp: prize.xp, talents: prize.talents }
            }));
          } catch(e){}
        };
      }
    }

    console.log('🎡 Рулетка: выпал приз', prize.label);
  }, SPIN_DURATION + 200);
}

/* ═══════════════════════════════════════════════════════════
   🎁 XP
   ═══════════════════════════════════════════════════════════ */
async function addXP(userId, amount) {
  if (!amount || amount <= 0) return;
  if (typeof window.addExperience === 'function') {
    try { await window.addExperience(userId, amount); return; }
    catch(e){ console.warn('[daily] addExperience fallback:', e.message); }
  }
  var sb = getClient();
  if (!sb) return;
  try {
    var res = await sb.from('profiles').select('experience').eq('user_id', userId).single();
    var current = (res && res.data && res.data.experience) || 0;
    await sb.from('profiles').update({ experience: current + amount }).eq('user_id', userId);
  } catch(e){ console.warn('[daily] addXP:', e.message); }
}

/* ═══════════════════════════════════════════════════════════
   📋 ЗАДАНИЯ
   ═══════════════════════════════════════════════════════════ */
async function fetchTasks(userId) {
  var sb = getClient();
  if (!sb) return [];
  var today = todayStr();

  var results = await Promise.all([
    sb.from('user_quests').select('quest_id,done').eq('user_id', userId).eq('quest_date', today)
      .then(function(r){ return (r && r.data) || []; }).catch(function(){ return []; }),
    sb.from('user_visits').select('id').eq('user_id', userId).gte('visited_at', today + 'T00:00:00').limit(1)
      .then(function(r){ return !!(r && r.data && r.data.length); }).catch(function(){ return false; }),
    sb.from('user_visits').select('place_id').eq('user_id', userId).gte('visited_at', today + 'T00:00:00')
      .then(function(r){
        var rows = (r && r.data) || [];
        var uniq = {};
        rows.forEach(function(x){ if (x.place_id) uniq[x.place_id] = true; });
        return Object.keys(uniq).length >= 1;
      }).catch(function(){ return false; }),
    sb.from('user_quizzes').select('id').eq('user_id', userId).gte('passed_at', today + 'T00:00:00').eq('passed', true).limit(1)
      .then(function(r){ return !!(r && r.data && r.data.length); }).catch(function(){ return false; })
  ]);

  var saved = results[0];
  var map = {};
  saved.forEach(function(q){ map[q.quest_id] = q.done; });

  var checks = {
    read_article: results[1],
    visit_place: results[2],
    pass_quiz: results[3],
    use_translator: map.use_translator === true
  };

  return QUEST_DEFINITIONS.map(function(def){
    var inDB = map[def.id] === true;
    var done = inDB || checks[def.id] === true;
    if (done && !inDB) {
      (async function(){
        try {
          await sb.from('user_quests').insert({
            user_id: userId, quest_date: today, quest_id: def.id, done: true, completed_at: new Date().toISOString()
          });
          if (def.xp > 0) await addXP(userId, def.xp);
        } catch(e){ console.warn('[daily] quest save:', e.message); }
      })();
    }
    return { id:def.id, icon:def.icon, title:def.title, reward:def.reward, done:done };
  });
}

function getDailyTasks(userId) {
  if (!userId) return Promise.resolve([]);
  if (Date.now() - state.lastTasksTs < TASKS_COOLDOWN && state.tasksPromise) {
    return state.tasksPromise;
  }
  if (state.tasksPromise) return state.tasksPromise;
  state.tasksPromise = fetchTasks(userId).finally(function(){
    state.tasksPromise = null;
    state.lastTasksTs = Date.now();
  });
  return state.tasksPromise;
}

/* ═══════════════════════════════════════════════════════════
   🎲 КНОПКА РУЛЕТКИ
   ═══════════════════════════════════════════════════════════ */
function showRouletteButton() {
  if (document.getElementById('daily-roulette-btn')) return;

  if (isRouletteDoneToday()) {
    var old = document.getElementById('daily-roulette-btn');
    if (old) old.remove();
    return;
  }

  var btn = document.createElement('button');
  btn.id = 'daily-roulette-btn';
  btn.className = 'daily-roulette-btn';
  btn.type = 'button';
  btn.innerHTML = '🎲 Крутить рулетку';
  btn.style.setProperty('--dk-color', state.kingdom.color);
  btn.style.setProperty('--dk-light', state.kingdom.light);
  btn.onclick = openRoulette;
  document.body.appendChild(btn);
}

/* ═══════════════════════════════════════════════════════════
   🚀 INIT
   ═══════════════════════════════════════════════════════════ */
async function doInit() {
  if (!isOnline()) return;

  var sb = getClient();
  if (!sb) return;

  if (isRewardDoneToday()) {
    if (!isRouletteDoneToday()) setTimeout(showRouletteButton, 1500);
    return;
  }

  var cached = readRewardCheck();
  if (cached && cached.date === todayStr() && Date.now() - cached.ts < INIT_COOLDOWN) {
    return;
  }

  var sessRes;
  try {
    sessRes = await withRetry(function(){ return sb.auth.getSession(); }, 1);
  } catch(e){ return; }
  var sess = sessRes && sessRes.data && sessRes.data.session;
  state.user = sess && sess.user;
  if (!state.user) return;

  try {
    var streakFromCache = readStreakCache();
    var arr = await Promise.all([
      sb.from('profiles').select('kingdom,experience').eq('user_id', state.user.id).single()
        .then(function(r){ return r && r.data; }).catch(function(){ return null; }),
      streakFromCache
        ? Promise.resolve({ streak: streakFromCache.streak, login_date: streakFromCache.date })
        : sb.from('daily_logins').select('login_date,streak').eq('user_id', state.user.id)
            .order('login_date', {ascending:false}).limit(1)
            .then(function(r){ return r && r.data && r.data[0]; }).catch(function(){ return null; })
    ]);

    var profileRes = arr[0];
    var streakRow = arr[1];

    if (profileRes && profileRes.kingdom && KINGDOMS[profileRes.kingdom]) {
      state.kingdom = KINGDOMS[profileRes.kingdom];
    }

    var today = todayStr();
    var lastDate = streakRow && streakRow.login_date;
    var lastStreak = (streakRow && streakRow.streak) || 0;

    if (lastDate === today) {
      markRewardDoneToday();
      writeRewardCheck(today, lastStreak);
      if (!isRouletteDoneToday()) setTimeout(showRouletteButton, 1500);
      return;
    }

    var newStreak = 1;
    if (lastDate) {
      var last = new Date(lastDate + 'T00:00:00');
      var now = new Date(today + 'T00:00:00');
      var diff = Math.round((now - last) / 86400000);
      if (diff === 1) newStreak = lastStreak + 1;
      else if (diff === 0) newStreak = lastStreak;
    }

    var reward = STREAK_REWARDS[newStreak] || { xp: newStreak * 5, talents: 0 };

    var ins = await sb.from('daily_logins').insert({
      user_id: state.user.id, login_date: today, streak: newStreak, reward_xp: reward.xp
    });
    if (ins && ins.error) return;

    await addXP(state.user.id, reward.xp);

    if (reward.talents > 0 && window.marsExperience && window.marsExperience.addTalents){
      try {
        await window.marsExperience.addTalents(state.user.id, reward.talents, 'За стрик ' + newStreak + ' дней');
      } catch(e){}
    }

    markRewardDoneToday();
    writeRewardCheck(today, newStreak);

    setTimeout(function(){
      showDailyReward(newStreak, reward);
      setTimeout(showRouletteButton, 3000);
    }, 800);

  } catch(e) {
    console.warn('[daily] init failed:', e.message);
  }
}

function init() {
  if (state.initDone && Date.now() - state.lastInitTs < INIT_COOLDOWN) {
    return Promise.resolve();
  }
  if (state.initPromise) return state.initPromise;
  state.initPromise = doInit().finally(function(){
    state.initPromise = null;
    state.initDone = true;
    state.lastInitTs = Date.now();
  });
  return state.initPromise;
}

/* ═══════════════════════════════════════════════════════════
   🌐 API
   ═══════════════════════════════════════════════════════════ */
window.openRoulette = openRoulette;
window.dailyReward = {
  getDailyTasks: getDailyTasks,
  addXP: addXP,
  getCurrentKingdom: function(){ return state.kingdom; },
  openRoulette: openRoulette,
  init: init,
  resetRoulette: function(){
    try { localStorage.removeItem(K_ROULETTE); } catch(e){}
    var btn = document.getElementById('daily-roulette-btn');
    if (btn) btn.remove();
  }
};

/* ═══════════════════════════════════════════════════════════
   📢 СОБЫТИЯ
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('storage', function(e) {
  if (e.key !== SB_KEY) return;
  if (state.storageTimer) clearTimeout(state.storageTimer);
  state.storageTimer = setTimeout(function(){
    state.lastInitTs = 0;
    state.initDone = false;
    init();
  }, 1000);
});

window.addEventListener('online', function(){
  state.lastInitTs = 0;
  init();
});

/* ═══════════════════════════════════════════════════════════
   🚀 START
   ═══════════════════════════════════════════════════════════ */
function start() {
  injectStyles();
  unlockAudio();

  if (isRouletteDoneToday()) {
    var stuck = document.getElementById('daily-roulette-btn');
    if (stuck) stuck.remove();
  }

  setTimeout(init, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}

console.log('✅ daily-reward.js v6 FINAL SUPER VIP загружен');
})();
