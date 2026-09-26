/**
 * ═══════════════════════════════════════════════════════════
 *   experience-animations.js v1
 *   Красивые анимации:
 *   - Всплывашка «+5 XP» при чтении статьи
 *   - Модалка достижения с конфетти
 *   - Звук (Web Audio, без файлов)
 *   - Партиклы
 * ═══════════════════════════════════════════════════════════
 */
(function(){
'use strict';
if (window.__xpAnimLoaded) return;
window.__xpAnimLoaded = true;

/* ═══ СТИЛИ ═══ */
var STYLE_ID = 'xp-anim-styles';
if (!document.getElementById(STYLE_ID)){
  var s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    /* ═══ XP Popup ═══ */
    .xp-popup{
      position:fixed;
      z-index:2147483646;
      display:flex;align-items:center;gap:10px;
      padding:12px 22px;border-radius:50px;
      background:linear-gradient(135deg,#27ae60,#16a085);
      color:#fff;font-weight:900;font-size:1.05rem;
      font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
      box-shadow:0 12px 40px rgba(39,174,96,.5),0 0 0 2px rgba(255,255,255,.15) inset;
      pointer-events:none;
      animation:xpPopupIn 1.8s cubic-bezier(.16,1,.3,1) forwards;
      white-space:nowrap;
      letter-spacing:.3px;
    }
    .xp-popup-icon{
      font-size:1.4rem;
      animation:xpIconSpin .8s cubic-bezier(.16,1,.3,1);
    }
    .xp-popup-value{
      font-variant-numeric:tabular-nums;
      text-shadow:0 2px 6px rgba(0,0,0,.25);
    }
    @keyframes xpPopupIn{
      0%   { opacity:0; transform:translateY(0) scale(.4); }
      15%  { opacity:1; transform:translateY(-20px) scale(1.15); }
      30%  { transform:translateY(-30px) scale(1); }
      70%  { opacity:1; transform:translateY(-80px) scale(1); }
      100% { opacity:0; transform:translateY(-140px) scale(.85); }
    }
    @keyframes xpIconSpin{
      0%   { transform:rotate(-180deg) scale(0); }
      70%  { transform:rotate(15deg) scale(1.2); }
      100% { transform:rotate(0) scale(1); }
    }

    /* ═══ Партиклы XP ═══ */
    .xp-particle{
      position:fixed;
      width:10px;height:10px;border-radius:50%;
      z-index:2147483645;
      pointer-events:none;
      will-change:transform,opacity;
    }

    /* ═══ Achievement Modal ═══ */
    .ach-modal-overlay{
      position:fixed;inset:0;
      z-index:2147483647;
      background:radial-gradient(circle at center,rgba(10,10,26,.85),rgba(10,10,26,.95));
      backdrop-filter:blur(10px);
      display:flex;align-items:center;justify-content:center;
      padding:20px;
      animation:achFadeIn .4s ease;
      font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
    }
    @keyframes achFadeIn{from{opacity:0}to{opacity:1}}

    .ach-modal-card{
      position:relative;
      background:linear-gradient(135deg,#1a1a2e 0%,#2d1b3d 50%,#1a1a2e 100%);
      color:#fff;
      max-width:440px;width:100%;
      padding:44px 32px 32px;
      border-radius:28px;
      text-align:center;
      box-shadow:
        0 40px 100px rgba(0,0,0,.6),
        0 0 0 1px rgba(255,215,110,.35) inset,
        0 0 60px rgba(243,156,18,.35);
      animation:achCardIn .7s cubic-bezier(.16,1,.3,1);
      overflow:hidden;
      border:2px solid rgba(243,156,18,.4);
    }
    @keyframes achCardIn{
      0%   { opacity:0; transform:scale(.5) rotateY(180deg); }
      60%  { transform:scale(1.08) rotateY(-10deg); }
      100% { opacity:1; transform:scale(1) rotateY(0); }
    }
    .ach-modal-card::before{
      content:'';position:absolute;top:0;left:0;right:0;height:5px;
      background:linear-gradient(90deg,#f5d76e,#f39c12,#e67e22,#f39c12,#f5d76e);
      background-size:200% auto;
      animation:achShine 2s linear infinite;
    }
    @keyframes achShine{0%{background-position:-200% center}100%{background-position:200% center}}

    .ach-glow{
      position:absolute;top:-50%;left:50%;transform:translateX(-50%);
      width:400px;height:400px;border-radius:50%;
      background:radial-gradient(circle,rgba(243,156,18,.35),transparent 70%);
      animation:achGlow 3s ease-in-out infinite;
      pointer-events:none;z-index:0;
    }
    @keyframes achGlow{
      0%,100%{transform:translateX(-50%) scale(1);opacity:.7}
      50%{transform:translateX(-50%) scale(1.15);opacity:1}
    }

    .ach-modal-card > *{position:relative;z-index:1}

    .ach-label{
      display:inline-block;
      padding:6px 18px;border-radius:20px;
      background:linear-gradient(135deg,rgba(243,156,18,.25),rgba(245,215,110,.15));
      border:1px solid rgba(243,156,18,.5);
      color:#ffdf5e;font-weight:900;font-size:.78rem;
      letter-spacing:2px;text-transform:uppercase;
      margin-bottom:20px;
      box-shadow:0 4px 16px rgba(243,156,18,.3);
    }

    .ach-icon-big{
      font-size:5.5rem;
      margin-bottom:10px;
      display:inline-block;
      filter:drop-shadow(0 12px 32px rgba(243,156,18,.7));
      animation:achIconBounce 1.5s cubic-bezier(.34,1.56,.64,1) infinite;
      line-height:1;
    }
    @keyframes achIconBounce{
      0%,100%{transform:translateY(0) rotate(-5deg) scale(1)}
      50%{transform:translateY(-16px) rotate(5deg) scale(1.08)}
    }

    .ach-name{
      font-size:1.8rem;font-weight:900;
      margin:0 0 8px;letter-spacing:-.5px;
      background:linear-gradient(90deg,#fff 0%,#ffdf5e 30%,#fff 60%,#ffdf5e 100%);
      background-size:200% auto;
      -webkit-background-clip:text;background-clip:text;
      -webkit-text-fill-color:transparent;
      animation:achShine 3s linear infinite;
      text-shadow:0 4px 20px rgba(0,0,0,.4);
    }

    .ach-desc{
      font-size:1rem;opacity:.85;margin:0 0 24px;
      line-height:1.55;
      color:#d0d0e0;
    }

    .ach-btn{
      display:inline-flex;align-items:center;justify-content:center;gap:8px;
      padding:14px 36px;border-radius:50px;
      border:2px solid #f5d76e;
      background:linear-gradient(135deg,#f5d76e,#f39c12);
      color:#1a1a2e;
      font-weight:900;font-size:1rem;
      cursor:pointer;font-family:inherit;
      transition:all .3s cubic-bezier(.16,1,.3,1);
      box-shadow:0 12px 32px rgba(243,156,18,.5);
      letter-spacing:.5px;
      -webkit-tap-highlight-color:transparent;
    }
    .ach-btn:hover{
      transform:translateY(-3px) scale(1.05);
      box-shadow:0 16px 40px rgba(243,156,18,.7);
    }
    .ach-btn:active{transform:translateY(0) scale(.98)}

    /* Конфетти */
    .ach-confetti{
      position:fixed;inset:0;
      pointer-events:none;z-index:2147483646;
      overflow:hidden;
    }
    .ach-confetti-piece{
      position:absolute;
      width:10px;height:14px;
      top:-20px;
      animation:achConfettiFall 3s linear forwards;
      border-radius:2px;
      will-change:transform;
    }
    @keyframes achConfettiFall{
      0%{transform:translateY(0) rotate(0);opacity:1}
      100%{transform:translateY(110vh) rotate(720deg);opacity:.3}
    }

    /* Мобильный */
    @media(max-width:600px){
      .ach-modal-card{padding:32px 22px 24px;border-radius:22px}
      .ach-icon-big{font-size:4rem}
      .ach-name{font-size:1.4rem}
      .ach-desc{font-size:.88rem}
      .ach-btn{padding:12px 28px;font-size:.92rem}
      .xp-popup{padding:10px 18px;font-size:.92rem;gap:8px}
      .xp-popup-icon{font-size:1.2rem}
    }

    @media(prefers-reduced-motion:reduce){
      .xp-popup,.xp-popup-icon,.ach-modal-card,.ach-icon-big,.ach-name,.ach-glow{animation:none !important}
    }
  `;
  document.head.appendChild(s);
}

/* ═══ ЗВУКИ (Web Audio) ═══ */
var audioCtx = null, audioUnlocked = false;
function getCtx(){
  if (!audioUnlocked) return null;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
  } catch(e){ return null; }
  return audioCtx;
}
function unlock(){
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
function note(freq, dur, type, vol){
  var c = getCtx(); if (!c) return;
  try {
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(vol || 0.1, c.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + dur);
  } catch(e){}
}
function playXPSound(){
  [659.25, 783.99, 987.77].forEach(function(f, i){
    setTimeout(function(){ note(f, 0.15, 'triangle', 0.08); }, i * 60);
  });
}
function playAchievementSound(){
  // Фанфарный аккорд
  var chord = [523.25, 659.25, 783.99, 1046.50];
  chord.forEach(function(f, i){
    setTimeout(function(){ note(f, 0.5, 'sine', 0.12); }, i * 100);
  });
  setTimeout(function(){ note(1567.98, 0.8, 'triangle', 0.1); }, 500);
}

/* ═══ XP POPUP ═══ */
function showXPPopup(amount){
  var popup = document.createElement('div');
  popup.className = 'xp-popup';
  popup.innerHTML = '<span class="xp-popup-icon">✨</span><span class="xp-popup-value">+' + amount + ' XP</span>';
  // Позиция — центр-низ
  popup.style.left = '50%';
  popup.style.bottom = '100px';
  popup.style.transform = 'translateX(-50%)';
  document.body.appendChild(popup);
  setTimeout(function(){ popup.remove(); }, 1900);
  spawnXPParticles(window.innerWidth / 2, window.innerHeight - 150);
  playXPSound();
}

function spawnXPParticles(x, y){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var colors = ['#27ae60','#2ecc71','#16a085','#f5d76e','#fff'];
  for (var i = 0; i < 20; i++){
    var p = document.createElement('div');
    p.className = 'xp-particle';
    var angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.5;
    var dist = 80 + Math.random() * 120;
    var size = 6 + Math.random() * 8;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = colors[i % colors.length];
    p.style.boxShadow = '0 0 12px currentColor';
    p.style.color = colors[i % colors.length];
    var dx = Math.cos(angle) * dist;
    var dy = Math.sin(angle) * dist - 40;
    p.style.transition = 'transform 1s cubic-bezier(.16,1,.3,1), opacity 1s';
    document.body.appendChild(p);
    (function(el){
      requestAnimationFrame(function(){
        el.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(.3)';
        el.style.opacity = '0';
      });
      setTimeout(function(){ el.remove(); }, 1100);
    })(p);
  }
}

/* ═══ ACHIEVEMENT MODAL ═══ */
function showAchievementModal(ach){
  var old = document.querySelector('.ach-modal-overlay');
  if (old) old.remove();

  var overlay = document.createElement('div');
  overlay.className = 'ach-modal-overlay';
  overlay.innerHTML =
    '<div class="ach-modal-card">' +
      '<div class="ach-glow"></div>' +
      '<div class="ach-label">🏆 Достижение получено!</div>' +
      '<div class="ach-icon-big">' + (ach.icon || '🏅') + '</div>' +
      '<h2 class="ach-name">' + esc(ach.name || 'Новое достижение') + '</h2>' +
      '<p class="ach-desc">' + esc(ach.description || '') + '</p>' +
      '<button class="ach-btn" type="button" id="ach-close-btn">✨ Круто!</button>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.querySelector('#ach-close-btn').onclick = function(){ overlay.remove(); };
  overlay.addEventListener('click', function(e){
    if (e.target === overlay) overlay.remove();
  });
  var escKey = function(e){
    if (e.key === 'Escape'){ overlay.remove(); document.removeEventListener('keydown', escKey); }
  };
  document.addEventListener('keydown', escKey);

  fireConfetti();
  playAchievementSound();
}

function fireConfetti(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var wrap = document.createElement('div');
  wrap.className = 'ach-confetti';
  document.body.appendChild(wrap);
  var colors = ['#f5d76e','#f39c12','#e74c3c','#3498db','#27ae60','#9b59b6','#fff'];
  for (var i = 0; i < 80; i++){
    var p = document.createElement('div');
    p.className = 'ach-confetti-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 0.8) + 's';
    p.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
    if (Math.random() > 0.5) p.style.borderRadius = '50%';
    if (Math.random() > 0.5) p.style.width = '6px';
    wrap.appendChild(p);
  }
  setTimeout(function(){ wrap.remove(); }, 5000);
}

function esc(s){ return String(s||'').replace(/[&<>"']/g, function(m){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
}); }

/* ═══ СЛУШАЕМ СОБЫТИЯ ═══ */
window.addEventListener('marsXpGained', function(e){
  var d = e.detail || {};
  if (!d.amount || d.amount <= 0) return;
  // Показываем всплывашку «+N XP»
  showXPPopup(d.amount);
});

window.addEventListener('marsAchievementUnlocked', function(e){
  var d = e.detail || {};
  showAchievementModal({
    icon: d.icon || '🏅',
    name: d.name || 'Новое достижение',
    description: d.description || ''
  });
});

/* ═══ ЭКСПОРТ ═══ */
window.XPAnimations = {
  showXP: showXPPopup,
  showAchievement: showAchievementModal,
  playSound: function(type){
    if (type === 'achievement') playAchievementSound();
    else playXPSound();
  }
};

unlock();
console.log('✨ experience-animations.js v1 загружен');
})();
