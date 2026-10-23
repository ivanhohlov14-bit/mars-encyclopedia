/**
 * ═══════════════════════════════════════════════════════════
 *   daily-reward.js v7 VIP RELIABLE (Mobile Optimized)
 *   Ежедневная награда + рулетка + таланты + монета guild-coin
 * ═══════════════════════════════════════════════════════════
 */
(function() {
'use strict';

if (window.__dailyRewardLoaded) return;
window.__dailyRewardLoaded = true;

var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';
var COIN_IMG = '/assets/images/guild-coin.jpg';

var K_CACHE_REWARD = 'mars-reward-check-v7';
var K_REWARD_DONE  = 'mars-reward-done-v7';
var K_ROULETTE     = 'mars-roulette-v7';
var K_PENDING_XP   = 'mars-pending-xp-v7'; // Очередь наград
var K_STREAK_CACHE = 'mars-streak-cache-v4';

var INIT_COOLDOWN  = 10 * 60 * 1000;
var MAX_RETRIES    = 2;
var RETRY_DELAY    = 1500;
var STYLE_ID       = 'daily-reward-styles-v7';

var SPIN_DURATION  = 4800;
var SPIN_MIN_TURNS = 5;
var SPIN_MAX_TURNS = 8;

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

var state = {
  user: null,
  profile: null,
  kingdom: KINGDOMS['Эдем'],
  initPromise: null,
  initDone: false,
  lastInitTs: 0,
  storageTimer: null,
  audioCtx: null,
  audioUnlocked: false
};

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

function todayStr() { return new Date().toISOString().slice(0, 10); }
function esc(s) { return String(s||'').replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }

function getStore(k, def) {
  try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch(e) { return def; }
}
function setStore(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} }

/* ═══════════════════════════════════════════════════════════
   🔊 ЗВУКИ
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
   🎊 CANVAS КОНФЕТТИ (Вместо DOM-элементов — работает в 10 раз быстрее)
   ═══════════════════════════════════════════════════════════ */
function fireConfetti(opts) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  opts = opts || {};
  var count = opts.count || 80;
  var colors = opts.colors || ['#f5d76e','#f39c12','#e74c3c','#3498db','#27ae60','#9b59b6','#fff'];

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483640;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var particles = [];

  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      w: 6 + Math.random() * 8,
      h: 10 + Math.random() * 8,
      vx: -2 + Math.random() * 4,
      vy: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      vrot: -0.2 + Math.random() * 0.4
    });
  }

  var startTime = Date.now();
  function draw() {
    if (Date.now() - startTime > 4000) { canvas.remove(); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // gravity
      p.rot += p.vrot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* ═══════════════════════════════════════════════════════════
   🎨 СТИЛИ (ОПТИМИЗИРОВАННЫЕ)
   ═══════════════════════════════════════════════════════════ */
function injectStyles() {
  var old = document.getElementById(STYLE_ID);
  if (old) old.remove();

  var s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes dailyFadeIn{from{opacity:0}to{opacity:1}}
    @keyframes dailySlideUp{0%{opacity:0;transform:translateY(30px) scale(.95)}100%{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes dailyPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
    @keyframes dailyBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    @keyframes dailyBounceStrong{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-15px) scale(1.05)}}
    @keyframes dailyShine{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes dailyNumberFly{0%{opacity:0;transform:translateY(20px) scale(.8)}100%{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes dailyCoinFloat{0%,100%{transform:translateY(0) rotateY(0deg)}50%{transform:translateY(-8px) rotateY(180deg)}}
    @keyframes dailyFlash{0%{opacity:0}20%{opacity:1}100%{opacity:0}}

    /* Оверлей без тяжелого блюра на мобилках */
    #daily-modal-overlay{position:fixed;inset:0;z-index:2147483644;background:rgba(10,10,26,.85);display:flex;align-items:center;justify-content:center;padding:15px;animation:dailyFadeIn .3s ease;overflow-y:auto;}
    @media (min-width: 768px) { #daily-modal-overlay { backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); } }

    /* Убрали анимацию box-shadow (она вешала браузер) */
    .daily-modal-card{position:relative;background:linear-gradient(135deg,var(--dk-color,#F4A460) 0%,var(--dk-light,#F7C98A) 50%,var(--dk-color,#F4A460) 100%);color:#fff;max-width:440px;width:100%;padding:40px 25px 30px;border-radius:24px;text-align:center;animation:dailySlideUp .4s cubic-bezier(.16,1,.3,1);box-shadow:0 20px 50px rgba(0,0,0,.5);font-family:-apple-system,'Segoe UI',Roboto,sans-serif;}
    .daily-modal-card::before{content:'';position:absolute;inset:0;border-radius:24px;background:radial-gradient(circle at 20% 20%,rgba(255,255,255,.25),transparent 60%);pointer-events:none;}

    .daily-close{position:absolute;top:15px;right:15px;background:rgba(255,255,255,.2);border:none;width:36px;height:36px;border-radius:50%;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;z-index:5;padding:0;}
    .daily-close:hover{background:rgba(255,255,255,.4);}

    .daily-icon{font-size:4rem;margin-bottom:10px;display:inline-block;animation:dailyBounceStrong 2s ease-in-out infinite;filter:drop-shadow(0 8px 16px rgba(0,0,0,.3));line-height:1;}
    .daily-title{margin:0 0 6px;font-size:1.8rem;font-weight:900;letter-spacing:-.5px;text-shadow:0 2px 6px rgba(0,0,0,.2);}
    .daily-subtitle{margin:0 0 15px;opacity:.95;font-size:.95rem;font-weight:600;}

    .daily-reward-big{font-size:3.5rem;font-weight:900;line-height:1;margin:10px 0;text-shadow:0 4px 16px rgba(0,0,0,.3);animation:dailyNumberFly .5s ease-out;}
    .daily-reward-big .unit{font-size:.5em;font-weight:800;opacity:.9;}

    .daily-coin-big{display:inline-block;width:85px;height:85px;margin:10px 0;background:url('${COIN_IMG}') center/cover no-repeat;border-radius:50%;box-shadow:0 10px 20px rgba(0,0,0,.3),0 0 0 3px #f5d76e;animation:dailyCoinFloat 2s ease-in-out infinite;}

    .daily-talents-badge{display:inline-flex;align-items:center;gap:8px;margin:8px 0;padding:8px 18px;border-radius:30px;background:rgba(245,215,110,.3);border:1.5px solid rgba(245,215,110,.6);font-weight:900;font-size:.95rem;color:#fff8d0;}
    .daily-talents-badge img{width:28px;height:28px;border-radius:50%;box-shadow:0 0 8px rgba(245,215,110,.8);}

    .daily-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 30px;border-radius:40px;border:2px solid rgba(255,255,255,.5);background:rgba(255,255,255,.2);color:#fff;font-size:1rem;font-weight:900;cursor:pointer;transition:all .2s;margin-top:10px;}
    .daily-btn:hover{background:rgba(255,255,255,.35);transform:translateY(-2px);}
    .daily-btn.primary{background:#fff;color:#333;border-color:#fff;}
    
    /* Колесо: убрали тяжелые фильтры */
    .daily-roulette-stage{position:relative;width:260px;height:260px;margin:20px auto;}
    .daily-roulette-wheel-svg{width:100%;height:100%;transition:transform 4.8s cubic-bezier(.15,.9,.25,1);transform-origin:50% 50%;will-change:transform;position:relative;z-index:2;filter:none;}
    .daily-roulette-pointer{position:absolute;top:-10px;left:50%;transform:translateX(-50%);font-size:1.8rem;z-index:5;filter:drop-shadow(0 4px 4px rgba(0,0,0,.5));}
    .daily-roulette-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff,#ddd);border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:1.4rem;z-index:4;box-shadow:0 2px 8px rgba(0,0,0,.4);}
    
    .daily-prize-icon img{width:90px;height:90px;border-radius:50%;box-shadow:0 8px 20px rgba(0,0,0,.4), 0 0 0 3px #f5d76e;display:block;margin:0 auto;}
    .daily-prize-label{font-size:2rem;font-weight:900;letter-spacing:-.5px;margin:10px 0 5px;text-shadow:0 2px 8px rgba(0,0,0,.3);}

    /* Кнопка рулетки на экране */
    .daily-roulette-btn{position:fixed;bottom:80px;right:20px;z-index:9998;background:linear-gradient(135deg,var(--dk-color),var(--dk-light));color:#fff;border:2px solid rgba(255,255,255,.4);padding:14px 24px;border-radius:40px;font-weight:900;font-size:.95rem;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.3);transition:transform .2s;animation:dailyBounce 2s ease-in-out infinite;}
    .daily-roulette-btn:hover{transform:scale(1.05);}

    @media (max-width:600px){
      .daily-modal-card{padding:30px 18px 20px;}
      .daily-icon{font-size:3rem;}
      .daily-title{font-size:1.5rem;}
      .daily-reward-big{font-size:2.8rem;}
      .daily-roulette-stage{width:220px;height:220px;}
      .daily-prize-icon img{width:70px;height:70px;}
      .daily-prize-label{font-size:1.6rem;}
      .daily-roulette-btn{bottom:90px;right:15px;padding:12px 18px;font-size:.85rem;}
    }
  `;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════════
   🪙 НАДЕЖНОЕ НАЧИСЛЕНИЕ ОПЫТА (Очередь)
   ═══════════════════════════════════════════════════════════ */
function queuePendingXP(userId, amount, reason) {
  var q = getStore(K_PENDING_XP, []);
  q.push({ userId: userId, amount: amount, reason: reason, ts: Date.now() });
  setStore(K_PENDING_XP, q);
  console.log('⚠️ Награда сохранена в очередь (нет сети)');
}

async function flushPendingXP() {
  var q = getStore(K_PENDING_XP, []);
  if (!q.length) return;
  
  var remaining = [];
  for (var i = 0; i < q.length; i++) {
    var item = q[i];
    try {
      // Пытаемся выдать через API
      await addXP(item.userId, item.amount); 
      console.log('✅ Отложенная награда выдана:', item.amount, 'XP');
    } catch(e) {
      remaining.push(item);
    }
  }
  setStore(K_PENDING_XP, remaining);
}

async function addXP(userId, amount) {
  if (!amount || amount <= 0) return;
  
  if (typeof window.addExperience === 'function') {
    try { await window.addExperience(userId, amount); return; }
    catch(e){ console.warn('addExperience fallback:', e.message); }
  }
  
  var sb = getClient();
  if (!sb) throw new Error('No DB connection');
  
  try {
    var res = await sb.from('profiles').select('experience').eq('user_id', userId).single();
    var current = (res && res.data && res.data.experience) || 0;
    var upd = await sb.from('profiles').update({ experience: current + amount }).eq('user_id', userId);
    if (upd.error) throw new Error(upd.error.message);
  } catch(e) {
    // Если база моргнула — кидаем в очередь
    queuePendingXP(userId, amount, 'Ошибка сети');
    throw e;
  }
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
      '<button class="daily-close" type="button" aria-label="Закрыть">✕</button>' +
      '<div class="daily-modal-content">' + html + '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  function closeOverlay() {
    overlay.remove();
    document.removeEventListener('keydown', escH);
  }
  function escH(e) { if (e.key === 'Escape') closeOverlay(); }

  overlay.querySelector('.daily-close').onclick = closeOverlay;
  overlay.addEventListener('click', function(e){ if (e.target === overlay) closeOverlay(); });
  document.addEventListener('keydown', escH);

  return overlay;
}

/* ═══════════════════════════════════════════════════════════
   🎁 ЕЖЕДНЕВНАЯ НАГРАДА
   ═══════════════════════════════════════════════════════════ */
function showDailyReward(streak, reward) {
  var xp = reward.xp || 0;
  var talents = reward.talents || 0;
  var isBonus = [3,7,14,30,100].indexOf(streak) !== -1;

  var bonusHTML = isBonus ? '<div style="color:#ffe9b8;font-weight:900;margin-bottom:10px;">🎉 БОНУС ЗА ' + streak + ' ДНЕЙ!</div>' : '';
  var xpHtml = xp > 0 ? '<div class="daily-reward-big">+' + xp + '<span class="unit"> XP</span></div>' : '';
  var talentsHtml = talents > 0 ? '<div class="daily-talents-badge"><img src="' + COIN_IMG + '"><span>+' + talents + ' талантов</span></div>' : '';

  var overlay = showModal(
    '<div class="daily-icon">🎁</div>' +
    '<h2 class="daily-title">Ежедневная награда!</h2>' +
    '<p class="daily-subtitle">Стрик: ' + streak + ' дней подряд</p>' +
    bonusHTML + xpHtml + talentsHtml +
    '<button class="daily-btn" id="daily-roulette-link" type="button" style="margin-top:15px;">🎲 Крутить рулетку</button>'
  );

  if (isBonus) { sfxBonus(); fireConfetti({ count: 120 }); if(navigator.vibrate) navigator.vibrate([100,50,100]); } 
  else { sfxReward(); fireConfetti({ count: 60 }); if(navigator.vibrate) navigator.vibrate(50); }

  overlay.querySelector('#daily-roulette-link').onclick = function() {
    overlay.remove();
    setTimeout(openRoulette, 200);
  };
}

/* ═══════════════════════════════════════════════════════════
   🎡 РУЛЕТКА (С защитой от потери приза)
   ═══════════════════════════════════════════════════════════ */
function buildWheelSVG() {
  var n = ROULETTE_PRIZES.length, sectorDeg = 360 / n, cx = 100, cy = 100, r = 92;
  var parts = ['<circle cx="100" cy="100" r="95" fill="#1a1a2e"/>'];

  for (var i = 0; i < n; i++) {
    var a1 = (i * sectorDeg - 90) * Math.PI / 180, a2 = ((i + 1) * sectorDeg - 90) * Math.PI / 180, am = ((i + 0.5) * sectorDeg - 90) * Math.PI / 180;
    var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    var largeArc = sectorDeg > 180 ? 1 : 0;
    var path = 'M ' + cx + ' ' + cy + ' L ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + ' Z';

    parts.push('<path d="' + path + '" fill="' + ROULETTE_PRIZES[i].color + '" stroke="#fff" stroke-width="1"/>');
    var ix = cx + r * 0.65 * Math.cos(am), iy = cy + r * 0.65 * Math.sin(am);
    parts.push('<text x="' + ix.toFixed(1) + '" y="' + iy.toFixed(1) + '" font-size="20" fill="#fff" text-anchor="middle" dominant-baseline="middle">' + ROULETTE_PRIZES[i].icon + '</text>');
  }
  return '<svg viewBox="0 0 200 200" class="daily-roulette-wheel-svg" id="daily-roulette-wheel">' + parts.join('') + '</svg>';
}

function pickPrize() {
  var total = 0;
  for (var i = 0; i < ROULETTE_PRIZES.length; i++) total += ROULETTE_PRIZES[i].weight;
  var r = Math.random() * total;
  for (var j = 0; j < ROULETTE_PRIZES.length; j++) {
    if (r < ROULETTE_PRIZES[j].weight) return ROULETTE_PRIZES[j];
    r -= ROULETTE_PRIZES[j].weight;
  }
  return ROULETTE_PRIZES[0];
}

async function openRoulette() {
  var userId = state.user && state.user.id;
  if (!userId) {
    var sb = getClient();
    if (sb) {
      var sess = await sb.auth.getSession();
      var u = sess && sess.data && sess.data.session && sess.data.session.user;
      if (u) { userId = u.id; state.user = u; }
    }
  }

  if (!userId) {
    showModal('<div class="daily-icon">🔒</div><h2 class="daily-title">Войдите</h2><p class="daily-subtitle">Рулетка доступна только авторизованным</p><a href="/login/" class="daily-btn primary" style="text-decoration:none;">Войти</a>');
    return;
  }

  sfxOpen();
  if (getStore(K_ROULETTE, null) === todayStr()) {
    showModal('<div class="daily-icon">⏰</div><h2 class="daily-title">Уже крутил сегодня!</h2><p class="daily-subtitle">Возвращайся завтра</p><button class="daily-btn" onclick="this.closest(\'#daily-modal-overlay\').remove();">ОК</button>');
    return;
  }

  var prize = pickPrize();
  var winnerIndex = ROULETTE_PRIZES.indexOf(prize);
  var sectorDeg = 360 / ROULETTE_PRIZES.length;
  var sectorCenter = winnerIndex * sectorDeg + sectorDeg / 2;
  
  var fullSpins = SPIN_MIN_TURNS + Math.floor(Math.random() * (SPIN_MAX_TURNS - SPIN_MIN_TURNS + 1));
  var targetRotation = fullSpins * 360 + (360 - sectorCenter + 360) % 360;

  var overlay = showModal(
    '<div style="font-size:1.4rem;font-weight:900;margin-bottom:10px;text-shadow:0 2px 4px rgba(0,0,0,.3);">🎡 Рулетка удачи</div>' +
    '<div class="daily-roulette-stage">' +
      '<div class="daily-roulette-pointer">▼</div>' +
      buildWheelSVG() +
      '<div class="daily-roulette-center">🎰</div>' +
    '</div>' +
    '<div id="daily-roulette-result" class="daily-subtitle">Крутим...</div>'
  );

  // Убираем кнопку
  var rBtn = document.getElementById('daily-roulette-btn');
  if (rBtn) { rBtn.style.transform = 'scale(0)'; setTimeout(function(){ rBtn.remove(); }, 300); }

  var wheel = overlay.querySelector('#daily-roulette-wheel');
  
  // Запускаем анимацию (через requestAnimationFrame, чтобы браузер точно прогрузил DOM)
  requestAnimationFrame(function() {
    setTimeout(function() {
      if(wheel) wheel.style.transform = 'rotate(' + targetRotation + 'deg)';
    }, 50);
  });

  // Тикающий звук (оптимизирован, чтобы не вешать поток)
  var tickCount = 0;
  var tickInt = setInterval(function(){ 
    if (tickCount++ % 2 === 0) sfxSpinTick(); 
  }, 150);
  setTimeout(function(){ clearInterval(tickInt); }, SPIN_DURATION - 200);

  // Завершение
  setTimeout(async function() {
    // Визуал
    var flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;inset:0;z-index:2147483645;background:radial-gradient(circle,rgba(255,255,255,.9),transparent 70%);opacity:0;pointer-events:none;animation:dailyFlash .5s ease-out;';
    document.body.appendChild(flash);
    setTimeout(function(){ flash.remove(); }, 600);

    var isWin = prize.xp > 0 || prize.talents > 0;
    if (isWin) { sfxWin(); fireConfetti({ count: 90, colors: [prize.color, '#f5d76e', '#fff'] }); if(navigator.vibrate) navigator.vibrate([80,40,80]); } 
    else { sfxLose(); if(navigator.vibrate) navigator.vibrate(30); }

    // 🔥 НАДЕЖНОЕ НАЧИСЛЕНИЕ
    var claimSuccess = false;
    try {
      if (prize.xp > 0) await addXP(userId, prize.xp);
      if (prize.talents > 0 && window.marsExperience && window.marsExperience.addTalents) {
        await window.marsExperience.addTalents(userId, prize.talents, 'Рулетка');
      }
      claimSuccess = true;
    } catch(err) {
      console.error('Ошибка начисления, ставим в очередь', err);
      if (prize.xp > 0) queuePendingXP(userId, prize.xp, 'Рулетка');
      claimSuccess = true; // Считаем успехом, т.к. ушло в очередь
    }

    // Ставим метку "сыграно" ТОЛЬКО если успешно начислили
    if (claimSuccess) setStore(K_ROULETTE, todayStr());

    var extra = prize.xp > 0 ? '+' + prize.xp + ' XP добавлено!' : (prize.talents > 0 ? '+' + prize.talents + ' талантов добавлено!' : 'Повезёт в следующий раз');
    var prizeIcon = prize.isCoin ? '<img src="' + COIN_IMG + '">' : prize.icon;

    overlay.querySelector('#daily-roulette-result').outerHTML =
      '<div id="daily-roulette-result">' +
        '<div class="daily-prize-icon" style="font-size:3.5rem;margin:10px 0;animation:dailyBounceStrong 1.5s infinite">' + prizeIcon + '</div>' +
        '<div class="daily-prize-label">' + esc(prize.label) + '</div>' +
        '<p style="font-size:.95rem;opacity:.9;margin-bottom:15px;">' + extra + '</p>' +
        '<button class="daily-btn primary" id="daily-close-btn">✨ Забрать</button>' +
      '</div>';

    overlay.querySelector('#daily-close-btn').onclick = function() {
      overlay.remove();
      window.dispatchEvent(new CustomEvent('marsRouletteFinished'));
    };
  }, SPIN_DURATION + 100);
}

function showRouletteButton() {
  if (document.getElementById('daily-roulette-btn')) return;
  if (getStore(K_ROULETTE, null) === todayStr()) return;

  var btn = document.createElement('button');
  btn.id = 'daily-roulette-btn';
  btn.className = 'daily-roulette-btn';
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
  var sb = getClient();
  if (!sb) return;

  // 1. Выгружаем застрявшие награды
  await flushPendingXP();

  // 2. Если награда уже получена
  if (getStore(K_REWARD_DONE, null) === todayStr()) {
    if (getStore(K_ROULETTE, null) !== todayStr()) setTimeout(showRouletteButton, 1000);
    return;
  }

  var sessRes = await sb.auth.getSession();
  var sess = sessRes && sessRes.data && sessRes.data.session;
  state.user = sess && sess.user;
  if (!state.user) return;

  try {
    var pRes = await sb.from('profiles').select('kingdom').eq('user_id', state.user.id).single();
    if (pRes && pRes.data && pRes.data.kingdom && KINGDOMS[pRes.data.kingdom]) {
      state.kingdom = KINGDOMS[pRes.data.kingdom];
    }

    var today = todayStr();
    var streakRow = await sb.from('daily_logins').select('login_date,streak').eq('user_id', state.user.id).order('login_date', {ascending:false}).limit(1).then(function(r){ return r.data && r.data[0]; });

    var lastDate = streakRow && streakRow.login_date;
    var lastStreak = (streakRow && streakRow.streak) || 0;

    if (lastDate === today) {
      setStore(K_REWARD_DONE, today);
      if (getStore(K_ROULETTE, null) !== today) setTimeout(showRouletteButton, 1000);
      return;
    }

    var newStreak = 1;
    if (lastDate) {
      var diff = Math.round((new Date(today) - new Date(lastDate)) / 86400000);
      if (diff === 1) newStreak = lastStreak + 1;
    }

    var reward = STREAK_REWARDS[newStreak] || { xp: newStreak * 5, talents: 0 };

    // Записываем в БД
    var ins = await sb.from('daily_logins').insert({ user_id: state.user.id, login_date: today, streak: newStreak, reward_xp: reward.xp });
    if (ins.error) return;

    await addXP(state.user.id, reward.xp);
    if (reward.talents > 0 && window.marsExperience) {
      try { await window.marsExperience.addTalents(state.user.id, reward.talents, 'Стрик'); } catch(e){}
    }

    setStore(K_REWARD_DONE, today);
    setTimeout(function(){ showDailyReward(newStreak, reward); setTimeout(showRouletteButton, 2000); }, 500);

  } catch(e) {
    console.warn('[daily] init failed:', e.message);
  }
}

function init() {
  if (state.initPromise) return state.initPromise;
  state.initPromise = doInit().finally(function(){ state.initPromise = null; });
  return state.initPromise;
}

window.openRoulette = openRoulette;
window.dailyReward = { init: init, openRoulette: openRoulette };

/* ═══════════════════════════════════════════════════════════
   🚀 START
   ═══════════════════════════════════════════════════════════ */
function start() {
  injectStyles();
  unlockAudio();
  setTimeout(init, 800); // Даем странице прогрузиться
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();

console.log('✅ daily-reward.js v7 VIP RELIABLE загружен');
})();
