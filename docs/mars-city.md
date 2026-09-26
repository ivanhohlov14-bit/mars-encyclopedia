---
title: Марсианский город — игра-градостроитель
description: Постройте колонию на Марсе — 12 зданий, 7 ресурсов, события, апгрейды. Прогресс сохраняется автоматически.
comments: false
hide:
  - navigation
  - toc
---

<div id="city-app">

<!-- HERO -->
<div class="ct-hero ct-observe">
  <div class="ct-hero-bg"></div>
  <div class="ct-hero-stars">
    <div class="ct-star"></div><div class="ct-star"></div><div class="ct-star"></div>
    <div class="ct-star"></div><div class="ct-star"></div><div class="ct-star"></div>
    <div class="ct-star"></div><div class="ct-star"></div><div class="ct-star"></div>
    <div class="ct-star"></div><div class="ct-star"></div><div class="ct-star"></div>
  </div>
  <div class="ct-hero-dome"></div>
  <div class="ct-hero-content">
    <div class="ct-hero-tag">Игра · Градостроитель</div>
    <div class="ct-hero-icon">🏙️</div>
    <h1 class="ct-hero-title">Марсианский город</h1>
    <p class="ct-hero-sub">
      Построй колонию, управляй ресурсами, переживи бури.
      Твой прогресс сохраняется автоматически.
    </p>
    <div class="ct-hero-meta">
      <span class="ct-meta-item">🏗️ 12 зданий</span>
      <span class="ct-meta-item">📊 7 ресурсов</span>
      <span class="ct-meta-item">🌪️ 6 событий</span>
      <span class="ct-meta-item">🏆 20 наград</span>
    </div>
  </div>
</div>

<!-- TOP BAR — РЕСУРСЫ -->
<div class="ct-bar ct-observe">
  <div class="ct-bar-inner">
    <div class="ct-res" data-res="energy">
      <div class="ct-res-icon">⚡</div>
      <div class="ct-res-info">
        <div class="ct-res-val" id="r-energy">0</div>
        <div class="ct-res-rate" id="rr-energy">+0/с</div>
      </div>
    </div>
    <div class="ct-res" data-res="water">
      <div class="ct-res-icon">💧</div>
      <div class="ct-res-info">
        <div class="ct-res-val" id="r-water">0</div>
        <div class="ct-res-rate" id="rr-water">+0/с</div>
      </div>
    </div>
    <div class="ct-res" data-res="food">
      <div class="ct-res-icon">🍞</div>
      <div class="ct-res-info">
        <div class="ct-res-val" id="r-food">0</div>
        <div class="ct-res-rate" id="rr-food">+0/с</div>
      </div>
    </div>
    <div class="ct-res" data-res="oxygen">
      <div class="ct-res-icon">💨</div>
      <div class="ct-res-info">
        <div class="ct-res-val" id="r-oxygen">0</div>
        <div class="ct-res-rate" id="rr-oxygen">+0/с</div>
      </div>
    </div>
    <div class="ct-res" data-res="materials">
      <div class="ct-res-icon">🪨</div>
      <div class="ct-res-info">
        <div class="ct-res-val" id="r-materials">0</div>
        <div class="ct-res-rate" id="rr-materials">+0/с</div>
      </div>
    </div>
    <div class="ct-res" data-res="population">
      <div class="ct-res-icon">👥</div>
      <div class="ct-res-info">
        <div class="ct-res-val" id="r-population">0</div>
        <div class="ct-res-rate" id="rr-population">+0/с</div>
      </div>
    </div>
    <div class="ct-res ct-res-credit" data-res="credits">
      <div class="ct-res-icon">🪙</div>
      <div class="ct-res-info">
        <div class="ct-res-val" id="r-credits">0</div>
        <div class="ct-res-rate" id="rr-credits">+0/с</div>
      </div>
    </div>
  </div>
</div>

<!-- УПРАВЛЕНИЕ -->
<div class="ct-controls ct-observe">
  <div class="ct-controls-left">
    <div class="ct-day">
      <div class="ct-day-label">СОЛ</div>
      <div class="ct-day-value" id="ct-day">1</div>
    </div>
    <div class="ct-pop">
      <div class="ct-pop-label">ЛЮДИ</div>
      <div class="ct-pop-value"><span id="ct-pop-now">4</span><span class="ct-pop-max">/ <span id="ct-pop-max">4</span></span></div>
    </div>
  </div>
  <div class="ct-controls-right">
    <div class="ct-speed">
      <button class="ct-spd" data-speed="0" type="button">⏸</button>
      <button class="ct-spd active" data-speed="1" type="button">▶</button>
      <button class="ct-spd" data-speed="2" type="button">▶▶</button>
      <button class="ct-spd" data-speed="4" type="button">▶▶▶</button>
    </div>
    <button class="ct-btn-icon" id="ct-save" type="button" title="Сохранить">💾</button>
    <button class="ct-btn-icon" id="ct-reset" type="button" title="Сбросить">🔄</button>
  </div>
</div>

<!-- СОБЫТИЯ (лента) -->
<div class="ct-events ct-observe" id="ct-events">
  <div class="ct-event-welcome">
    <div class="ct-event-icon">🚀</div>
    <div class="ct-event-text">
      <strong>Первая посадка!</strong> Ты — командир колонии. Начни со строительства
      <strong>Купола жилья</strong> и <strong>Солнечной станции</strong>.
    </div>
  </div>
</div>

<!-- ИВЕНТ-БАННЕР (появляется при событиях) -->
<div class="ct-event-banner" id="ct-event-banner" style="display:none;"></div>

<!-- ВКЛАДКИ -->
<div class="ct-tabs ct-observe">
  <button class="ct-tab active" data-tab="build" type="button">🏗️ Строительство</button>
  <button class="ct-tab" data-tab="upgrade" type="button">📈 Улучшения</button>
  <button class="ct-tab" data-tab="ach" type="button">🏆 Достижения</button>
  <button class="ct-tab" data-tab="stats" type="button">📊 Статистика</button>
</div>

<!-- ВКЛАДКА: СТРОИТЕЛЬСТВО -->
<div class="ct-tab-content active" data-content="build">
  <div class="ct-grid" id="ct-build-grid"></div>
</div>

<!-- ВКЛАДКА: УЛУЧШЕНИЯ -->
<div class="ct-tab-content" data-content="upgrade">
  <div class="ct-upgrade-hint">
    💡 Улучшения повышают эффективность всех зданий одного типа.
    Максимальный уровень — 5. Стоимость каждого уровня растёт.
  </div>
  <div class="ct-grid" id="ct-upgrade-grid"></div>
</div>

<!-- ВКЛАДКА: ДОСТИЖЕНИЯ -->
<div class="ct-tab-content" data-content="ach">
  <div class="ct-ach-progress">
    <div class="ct-ach-bar"><div class="ct-ach-fill" id="ct-ach-fill"></div></div>
    <div class="ct-ach-count"><span id="ct-ach-done">0</span> / <span id="ct-ach-total">20</span></div>
  </div>
  <div class="ct-ach-grid" id="ct-ach-grid"></div>
</div>

<!-- ВКЛАДКА: СТАТИСТИКА -->
<div class="ct-tab-content" data-content="stats">
  <div class="ct-stats">
    <div class="ct-stat-row">
      <span>🏗️ Всего построено</span>
      <b id="st-total">0</b>
    </div>
    <div class="ct-stat-row">
      <span>📈 Всего улучшений</span>
      <b id="st-upg">0</b>
    </div>
    <div class="ct-stat-row">
      <span>👥 Максимум жителей</span>
      <b id="st-maxpop">0</b>
    </div>
    <div class="ct-stat-row">
      <span>💰 Всего заработано</span>
      <b id="st-earned">0</b>
    </div>
    <div class="ct-stat-row">
      <span>🌪️ Пережито событий</span>
      <b id="st-events">0</b>
    </div>
    <div class="ct-stat-row">
      <span>⏱️ Время в игре</span>
      <b id="st-time">0с</b>
    </div>
    <div class="ct-stat-row">
      <span>🎯 Текущая цель</span>
      <b id="st-goal">—</b>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="ct-footer">
  <div class="ct-footer-text">
    💾 Прогресс сохраняется автоматически каждые 5 секунд.
    Игра работает даже при переключении вкладки.
  </div>
</div>

</div>

<style>
/* ═══════════════════ ROOT ═══════════════════ */
#city-app{
  --ct-red:#e74c3c; --ct-orange:#f39c12; --ct-gold:#f5d76e;
  --ct-blue:#3498db; --ct-cyan:#87ceeb; --ct-green:#27ae60;
  --ct-purple:#9b59b6; --ct-dark:#1a1a2e; --ct-dark2:#2d1b3d;
  max-width:1100px; margin:0 auto; padding:0 8px 80px;
  font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
  color:#1a1a2e; line-height:1.6;
  -webkit-tap-highlight-color:transparent;
}
#city-app *{box-sizing:border-box}

/* ═══════════════════ ANIMATIONS ═══════════════════ */
@keyframes ctSpin{to{transform:rotate(360deg)}}
@keyframes ctFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes ctFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes ctFloatSlow{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-16px) rotate(4deg)}}
@keyframes ctStar{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
@keyframes ctShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes ctDomeGlow{0%,100%{opacity:.4}50%{opacity:.75}}
@keyframes ctPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.8}}
@keyframes ctPop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes ctSlide{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
@keyframes ctBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes ctRing{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.5);opacity:0}}
@keyframes ctShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
@keyframes ctBarPulse{0%,100%{box-shadow:0 0 0 0 rgba(135,206,235,.4)}50%{box-shadow:0 0 0 8px rgba(135,206,235,0)}}

.ct-observe{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1)}
.ct-observe.ct-visible{opacity:1;transform:translateY(0)}

/* ═══════════════════ HERO ═══════════════════ */
.ct-hero{
  position:relative;border-radius:26px;
  padding:60px 36px;
  color:#fff;margin-bottom:20px;overflow:hidden;text-align:center;
  box-shadow:0 30px 90px -20px rgba(0,0,0,.6);
  min-height:440px;
  display:flex;align-items:center;justify-content:center;
  isolation:isolate;
}
.ct-hero-bg{
  position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(circle at 20% 30%,rgba(231,76,60,.35),transparent 55%),
    radial-gradient(circle at 80% 70%,rgba(243,156,18,.25),transparent 55%),
    linear-gradient(135deg,#0a0f1e 0%,#1a1a2e 40%,#2d1b3d 70%,#0f3460 100%);
}
.ct-hero-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:2}
.ct-star{
  position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;
  box-shadow:0 0 6px #fff;animation:ctStar 3.5s ease-in-out infinite;
}
.ct-star:nth-child(1){top:12%;left:8%;animation-delay:0s}
.ct-star:nth-child(2){top:22%;left:18%;animation-delay:.4s;width:1.5px;height:1.5px}
.ct-star:nth-child(3){top:68%;left:12%;animation-delay:.9s}
.ct-star:nth-child(4){top:32%;left:82%;animation-delay:1.4s}
.ct-star:nth-child(5){top:78%;left:88%;animation-delay:.6s;width:1.5px;height:1.5px}
.ct-star:nth-child(6){top:18%;left:62%;animation-delay:1.1s}
.ct-star:nth-child(7){top:52%;left:44%;animation-delay:.3s}
.ct-star:nth-child(8){top:42%;left:94%;animation-delay:1.8s}
.ct-star:nth-child(9){top:84%;left:28%;animation-delay:2.1s}
.ct-star:nth-child(10){top:8%;left:38%;animation-delay:1.5s}
.ct-star:nth-child(11){top:64%;left:66%;animation-delay:.7s}
.ct-star:nth-child(12){top:28%;left:22%;animation-delay:1.9s;width:1.5px;height:1.5px}

.ct-hero-dome{
  position:absolute;bottom:-40%;left:50%;transform:translateX(-50%);
  width:900px;height:900px;border-radius:50%;
  background:radial-gradient(circle at 50% 30%,rgba(243,156,18,.12),transparent 55%),
             radial-gradient(circle at 50% 70%,rgba(108,99,255,.08),transparent 60%);
  border:2px solid rgba(243,156,18,.15);
  animation:ctDomeGlow 6s ease-in-out infinite;
  pointer-events:none;z-index:1;
}

.ct-hero-content{position:relative;z-index:3;max-width:720px;margin:0 auto}
.ct-hero-tag{
  display:inline-block;padding:7px 18px;border-radius:22px;
  background:rgba(243,156,18,.2);border:1px solid rgba(243,156,18,.5);
  color:#ffdf5e;font-size:.75rem;font-weight:800;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;
  backdrop-filter:blur(10px);
}
.ct-hero-icon{
  display:inline-block;font-size:4.5rem;margin-bottom:10px;
  animation:ctFloatSlow 4s ease-in-out infinite;
  filter:drop-shadow(0 8px 32px rgba(243,156,18,.6));
  line-height:1;
}
.ct-hero-title{
  font-size:2.6rem;font-weight:900;margin:0 0 16px;
  letter-spacing:-.6px;line-height:1.15;
  background:linear-gradient(90deg,#fff 0%,#ffdf5e 25%,#ff8a80 50%,#ffdf5e 75%,#fff 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;animation:ctShine 6s linear infinite;
  text-shadow:0 4px 20px rgba(0,0,0,.5);
}
.ct-hero-sub{font-size:1.08rem;opacity:.92;margin:0 0 24px;line-height:1.65;text-shadow:0 2px 8px rgba(0,0,0,.5)}
.ct-hero-meta{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.ct-meta-item{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 16px;border-radius:22px;
  background:rgba(255,255,255,.1);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.2);
  font-size:.8rem;font-weight:700;color:#fff;
}

/* ═══════════════════ RESOURCE BAR ═══════════════════ */
.ct-bar{
  position:sticky;top:0;z-index:100;
  margin-bottom:16px;padding:10px;
  background:linear-gradient(135deg,rgba(15,15,30,.95),rgba(30,20,50,.95));
  border-radius:18px;
  box-shadow:0 8px 30px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.08) inset;
  backdrop-filter:blur(12px);
}
.ct-bar-inner{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(110px,1fr));
  gap:8px;
}
.ct-res{
  display:flex;align-items:center;gap:8px;
  padding:10px 12px;border-radius:12px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
  transition:all .3s;
}
.ct-res:hover{background:rgba(255,255,255,.1);transform:translateY(-2px)}
.ct-res.flash-up{animation:ctBarPulse .6s ease}
.ct-res.flash-down{animation:ctShake .4s ease}
.ct-res-icon{
  font-size:1.5rem;line-height:1;
  filter:drop-shadow(0 2px 4px rgba(0,0,0,.4));
}
.ct-res-info{flex:1;min-width:0}
.ct-res-val{
  font-size:1rem;font-weight:900;color:#fff;
  font-variant-numeric:tabular-nums;
  line-height:1.1;
}
.ct-res-rate{
  font-size:.68rem;font-weight:800;
  color:rgba(255,255,255,.6);
  font-variant-numeric:tabular-nums;
  line-height:1.2;
}
.ct-res-rate.positive{color:#4ade80}
.ct-res-rate.negative{color:#ff8a80}
.ct-res-credit{
  grid-column:span 2;
  background:linear-gradient(135deg,rgba(243,156,18,.15),rgba(245,215,110,.08));
  border-color:rgba(243,156,18,.35);
}

/* ═══════════════════ CONTROLS ═══════════════════ */
.ct-controls{
  display:flex;justify-content:space-between;align-items:center;
  gap:12px;flex-wrap:wrap;
  padding:14px 18px;margin-bottom:16px;
  background:#fff;border-radius:16px;
  border:1px solid rgba(0,0,0,.06);
  box-shadow:0 4px 12px rgba(0,0,0,.04);
}
.ct-controls-left{display:flex;gap:16px;align-items:center}
.ct-controls-right{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.ct-day,.ct-pop{text-align:center}
.ct-day-label,.ct-pop-label{
  font-size:.62rem;color:#888;font-weight:800;
  text-transform:uppercase;letter-spacing:1px;
}
.ct-day-value,.ct-pop-value{
  font-size:1.3rem;font-weight:900;color:#1a1a2e;
  font-variant-numeric:tabular-nums;line-height:1;
}
.ct-pop-max{font-size:.8rem;color:#888;font-weight:700}
.ct-speed{
  display:flex;gap:2px;
  padding:3px;background:rgba(0,0,0,.05);border-radius:12px;
}
.ct-spd{
  width:36px;height:34px;border:none;border-radius:9px;
  background:transparent;color:#666;
  font-size:.78rem;font-weight:900;cursor:pointer;
  font-family:inherit;transition:all .2s;
}
.ct-spd:hover{background:rgba(0,0,0,.05);color:#333}
.ct-spd.active{
  background:linear-gradient(135deg,#f39c12,#e67e22);
  color:#fff;box-shadow:0 4px 10px -2px rgba(243,156,18,.5);
}
.ct-btn-icon{
  width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(0,0,0,.08);background:#fff;
  cursor:pointer;font-size:1rem;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;font-family:inherit;
}
.ct-btn-icon:hover{background:#f5f5f5;transform:scale(1.08)}

/* ═══════════════════ EVENTS FEED ═══════════════════ */
.ct-events{
  margin-bottom:16px;
  max-height:120px;overflow-y:auto;
  padding:6px 0;
  scrollbar-width:thin;
}
.ct-events::-webkit-scrollbar{width:6px}
.ct-events::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:3px}
.ct-event-welcome,.ct-event-item{
  display:flex;gap:12px;align-items:flex-start;
  padding:12px 16px;margin-bottom:6px;
  background:#fff;border-radius:12px;
  border-left:4px solid #f39c12;
  box-shadow:0 2px 8px rgba(0,0,0,.04);
  animation:ctSlide .4s ease;
}
.ct-event-item.info{border-left-color:#3498db}
.ct-event-item.good{border-left-color:#27ae60}
.ct-event-item.bad{border-left-color:#e74c3c}
.ct-event-icon{font-size:1.4rem;flex-shrink:0;line-height:1}
.ct-event-text{font-size:.85rem;line-height:1.5;color:#333}
.ct-event-text strong{font-weight:900}
.ct-event-time{
  font-size:.68rem;color:#999;font-weight:700;
  margin-left:auto;flex-shrink:0;padding-top:2px;
}

/* ═══════════════════ EVENT BANNER ═══════════════════ */
.ct-event-banner{
  display:flex;align-items:center;gap:14px;
  padding:16px 22px;margin-bottom:16px;
  border-radius:16px;color:#fff;
  font-weight:800;font-size:.95rem;
  animation:ctPop .5s cubic-bezier(.16,1,.3,1);
  box-shadow:0 12px 30px -8px rgba(0,0,0,.4);
}
.ct-event-banner.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.ct-event-banner.good{background:linear-gradient(135deg,#27ae60,#16a085)}
.ct-event-banner.bad{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.ct-event-banner-icon{font-size:2rem;flex-shrink:0;line-height:1;animation:ctBounce 1s ease infinite}

/* ═══════════════════ TABS ═══════════════════ */
.ct-tabs{
  display:flex;gap:6px;flex-wrap:wrap;
  margin-bottom:16px;
}
.ct-tab{
  padding:10px 18px;border-radius:12px;
  border:2px solid rgba(0,0,0,.06);
  background:#fff;color:#666;
  font-size:.85rem;font-weight:800;
  cursor:pointer;font-family:inherit;
  transition:all .25s cubic-bezier(.16,1,.3,1);
}
.ct-tab:hover{background:rgba(243,156,18,.06);color:#333}
.ct-tab.active{
  background:linear-gradient(135deg,#f39c12,#e67e22);
  color:#fff;border-color:transparent;
  box-shadow:0 6px 16px -4px rgba(243,156,18,.5);
}
.ct-tab-content{display:none}
.ct-tab-content.active{display:block;animation:ctFadeIn .4s ease}

/* ═══════════════════ BUILD GRID ═══════════════════ */
.ct-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
  gap:14px;
}
.ct-card{
  position:relative;
  background:#fff;border-radius:18px;
  border:2px solid rgba(0,0,0,.06);
  padding:18px 18px 16px;
  transition:all .3s cubic-bezier(.16,1,.3,1);
  overflow:hidden;
  display:flex;flex-direction:column;
}
.ct-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:var(--card-color,#f39c12);
  opacity:.7;
  transition:opacity .3s;
}
.ct-card:hover{
  transform:translateY(-4px);
  box-shadow:0 20px 44px -12px var(--card-color,rgba(243,156,18,.4));
  border-color:var(--card-color,#f39c12);
}
.ct-card:hover::before{opacity:1}
.ct-card.disabled{opacity:.55;cursor:not-allowed}
.ct-card.disabled:hover{transform:none;box-shadow:none}

.ct-card-head{
  display:flex;align-items:center;gap:12px;margin-bottom:12px;
}
.ct-card-emoji{
  font-size:2.4rem;line-height:1;flex-shrink:0;
  filter:drop-shadow(0 4px 8px rgba(0,0,0,.15));
  transition:transform .3s;
}
.ct-card:hover .ct-card-emoji{transform:scale(1.12) rotate(-6deg)}
.ct-card-info{flex:1;min-width:0}
.ct-card-title{
  font-size:1rem;font-weight:900;color:#1a1a2e;
  margin-bottom:3px;line-height:1.2;
  letter-spacing:-.2px;
}
.ct-card-sub{
  font-size:.72rem;color:#888;font-weight:700;
}
.ct-card-level{
  position:absolute;top:14px;right:14px;
  padding:3px 10px;border-radius:12px;
  background:rgba(0,0,0,.06);color:#666;
  font-size:.68rem;font-weight:900;
}
.ct-card-level.owned{
  background:linear-gradient(135deg,var(--card-color,#f39c12),var(--card-color,#f39c12));
  color:#fff;
}
.ct-card-count{
  font-size:.7rem;font-weight:900;
  padding:1px 7px;border-radius:8px;
  background:rgba(0,0,0,.06);color:#666;
  display:inline-block;margin-left:4px;
}

.ct-card-effect{
  font-size:.82rem;color:#555;line-height:1.5;
  margin-bottom:12px;min-height:36px;
}
.ct-card-effect strong{color:var(--card-color,#f39c12);font-weight:900}

.ct-card-cost{
  display:flex;gap:6px;flex-wrap:wrap;
  padding:10px 12px;border-radius:10px;
  background:rgba(0,0,0,.03);
  margin-bottom:12px;
  font-size:.78rem;font-weight:800;
}
.ct-cost-item{
  display:inline-flex;align-items:center;gap:4px;
  color:#555;
}
.ct-cost-item.lack{color:#e74c3c}
.ct-cost-item.have{color:#27ae60}

.ct-card-actions{margin-top:auto;display:flex;gap:6px}
.ct-btn{
  flex:1;
  padding:10px 14px;border-radius:12px;
  border:2px solid transparent;
  font-size:.82rem;font-weight:900;
  cursor:pointer;font-family:inherit;
  transition:all .25s cubic-bezier(.16,1,.3,1);
  display:inline-flex;align-items:center;justify-content:center;gap:6px;
  background:linear-gradient(135deg,var(--card-color,#f39c12),var(--card-color,#f39c12));
  color:#fff;
  text-shadow:0 1px 2px rgba(0,0,0,.15);
}
.ct-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px -6px var(--card-color,rgba(243,156,18,.5))}
.ct-btn:active{transform:translateY(0) scale(.98)}
.ct-btn:disabled{
  opacity:.5;cursor:not-allowed;transform:none!important;
  background:#ccc;color:#666;
}
.ct-btn.secondary{
  background:transparent;color:var(--card-color,#f39c12);
  border-color:var(--card-color,#f39c12);
}

/* ═══════════════════ UPGRADE ═══════════════════ */
.ct-upgrade-hint{
  padding:14px 18px;margin-bottom:16px;
  background:linear-gradient(135deg,rgba(243,156,18,.08),rgba(245,215,110,.04));
  border-left:4px solid #f39c12;border-radius:12px;
  font-size:.88rem;line-height:1.6;color:#444;
}

/* ═══════════════════ ACHIEVEMENTS ═══════════════════ */
.ct-ach-progress{
  display:flex;align-items:center;gap:14px;
  padding:14px 18px;margin-bottom:16px;
  background:#fff;border-radius:14px;
  border:1px solid rgba(0,0,0,.06);
}
.ct-ach-bar{
  flex:1;height:12px;border-radius:6px;
  background:rgba(0,0,0,.06);overflow:hidden;
}
.ct-ach-fill{
  height:100%;border-radius:6px;
  background:linear-gradient(90deg,#f39c12,#ffdf5e);
  transition:width .6s cubic-bezier(.16,1,.3,1);
  box-shadow:0 0 12px rgba(243,156,18,.5);
}
.ct-ach-count{
  font-size:.9rem;font-weight:900;color:#1a1a2e;
  font-variant-numeric:tabular-nums;
}
.ct-ach-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
  gap:10px;
}
.ct-ach{
  display:flex;align-items:center;gap:10px;
  padding:12px 14px;border-radius:12px;
  background:#f8f9fb;
  border:2px solid transparent;
  transition:all .25s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
}
.ct-ach:hover{transform:translateY(-2px);border-color:#f39c12}
.ct-ach.locked{opacity:.45;filter:grayscale(.7)}
.ct-ach.locked::after{
  content:'🔒';position:absolute;top:6px;right:8px;font-size:.85rem;
}
.ct-ach:not(.locked)::after{
  content:'✓';position:absolute;top:6px;right:8px;
  font-size:.85rem;color:#27ae60;font-weight:900;
}
.ct-ach:not(.locked){
  background:linear-gradient(135deg,rgba(243,156,18,.08),rgba(245,215,110,.03));
  border-color:rgba(243,156,18,.3);
}
.ct-ach-icon{font-size:1.6rem;flex-shrink:0;line-height:1}
.ct-ach-info{flex:1;min-width:0}
.ct-ach-title{
  font-size:.82rem;font-weight:900;color:#1a1a2e;
  margin-bottom:2px;line-height:1.2;
}
.ct-ach-desc{font-size:.7rem;color:#888;font-weight:700;line-height:1.3}

/* ═══════════════════ STATS ═══════════════════ */
.ct-stats{
  display:flex;flex-direction:column;gap:8px;
  padding:22px 26px;
  background:#fff;border-radius:18px;
  border:1px solid rgba(0,0,0,.06);
  box-shadow:0 4px 16px rgba(0,0,0,.04);
}
.ct-stat-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:10px 0;
  border-bottom:1px dashed rgba(0,0,0,.06);
  font-size:.88rem;
}
.ct-stat-row:last-child{border-bottom:none}
.ct-stat-row span{color:#555;font-weight:600}
.ct-stat-row b{
  color:#1a1a2e;font-weight:900;
  font-variant-numeric:tabular-nums;
}

/* ═══════════════════ FOOTER ═══════════════════ */
.ct-footer{
  margin-top:24px;padding:16px 20px;
  background:linear-gradient(135deg,rgba(108,99,255,.06),rgba(243,156,18,.03));
  border-radius:14px;
  border:1px solid rgba(108,99,255,.15);
}
.ct-footer-text{
  font-size:.82rem;color:#666;line-height:1.6;text-align:center;
  font-weight:600;
}

/* ═══════════════════ TOAST ═══════════════════ */
.ct-toast{
  position:fixed;bottom:30px;left:50%;
  transform:translateX(-50%) translateY(100px);
  padding:12px 26px;border-radius:30px;
  color:#fff;font-weight:800;font-size:.9rem;
  box-shadow:0 12px 32px rgba(0,0,0,.3);
  z-index:99999;pointer-events:none;
  max-width:90vw;text-align:center;
  transition:transform .4s cubic-bezier(.16,1,.3,1);
}
.ct-toast.show{transform:translateX(-50%) translateY(0)}
.ct-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.ct-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.ct-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.ct-toast.gold{background:linear-gradient(135deg,#f5d76e,#f39c12);color:#1a1a2e}

/* ═══════════════════ MOBILE ═══════════════════ */
@media (max-width:640px){
  .ct-hero{padding:44px 20px;border-radius:20px;min-height:380px}
  .ct-hero-title{font-size:1.7rem}
  .ct-hero-sub{font-size:.95rem}
  .ct-hero-icon{font-size:3.4rem}
  .ct-meta-item{padding:6px 12px;font-size:.72rem}
  .ct-bar-inner{grid-template-columns:repeat(2,1fr)}
  .ct-res-credit{grid-column:span 2}
  .ct-res{padding:8px 10px}
  .ct-res-icon{font-size:1.25rem}
  .ct-res-val{font-size:.9rem}
  .ct-res-rate{font-size:.62rem}
  .ct-controls{padding:12px}
  .ct-day-value,.ct-pop-value{font-size:1.1rem}
  .ct-tabs{gap:4px}
  .ct-tab{padding:8px 12px;font-size:.75rem}
  .ct-grid{grid-template-columns:1fr;gap:10px}
  .ct-card{padding:14px 14px 12px}
  .ct-ach-grid{grid-template-columns:1fr}
  .ct-events{max-height:100px}
  .ct-event-banner{padding:12px 16px;font-size:.85rem}
}

@media (prefers-reduced-motion: reduce){
  #city-app *,#city-app *::before,#city-app *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
  .ct-observe{opacity:1;transform:none}
}
</style>

<script>
(function(){
'use strict';
if (window.__cityLoaded) return;
window.__cityLoaded = true;

/* ═══════════════════ КОНСТАНТЫ ═══════════════════ */
var SAVE_KEY = 'mars-city-save-v1';
var TICK_MS = 1000;
var SAVE_EVERY = 5; /* каждые 5 сек */
var EVENT_EVERY_MIN = 45; /* сек между событиями (минимум) */
var EVENT_EVERY_MAX = 90;

/* ═══════════════════ РЕСУРСЫ ═══════════════════ */
var RESOURCES = {
  energy:    { icon:'⚡', name:'Энергия' },
  water:     { icon:'💧', name:'Вода' },
  food:      { icon:'🍞', name:'Еда' },
  oxygen:    { icon:'💨', name:'Кислород' },
  materials: { icon:'🪨', name:'Материалы' },
  population:{ icon:'👥', name:'Население' },
  credits:   { icon:'🪙', name:'Кредиты' }
};

/* ═══════════════════ ЗДАНИЯ ═══════════════════ */
var BUILDINGS = [
  {
    id:'dome', name:'Купол жилья', icon:'🏠', color:'#3498db',
    desc:'Жилой купол для колонистов',
    effect:'+1 вместимость на уровень',
    cost:{ materials: 50 },
    unlockPop: 0,
    produce: null,
    storage: { population: 1 }
  },
  {
    id:'solar', name:'Солнечная станция', icon:'☀️', color:'#f39c12',
    desc:'Генерирует энергию из солнца',
    effect:'+3 ⚡/сек на уровень',
    cost:{ materials: 30, credits: 20 },
    unlockPop: 0,
    produce: { energy: 3 }
  },
  {
    id:'ice', name:'Ледобур', icon:'💧', color:'#3498db',
    desc:'Добывает воду из подземного льда',
    effect:'+2 💧/сек на уровень',
    cost:{ materials: 40, energy: 30 },
    unlockPop: 0,
    produce: { water: 2 }
  },
  {
    id:'greenhouse', name:'Теплица', icon:'🌱', color:'#27ae60',
    desc:'Выращивает еду под LED-светом',
    effect:'+2 🍞/сек на уровень',
    cost:{ materials: 60, water: 40, energy: 20 },
    unlockPop: 1,
    produce: { food: 2 }
  },
  {
    id:'oxy', name:'Генератор O₂', icon:'💨', color:'#87ceeb',
    desc:'Производит кислород из атмосферного CO₂',
    effect:'+2 💨/сек на уровень',
    cost:{ materials: 70, energy: 50 },
    unlockPop: 2,
    produce: { oxygen: 2 }
  },
  {
    id:'mine', name:'Шахта', icon:'⛏️', color:'#95a5a6',
    desc:'Добывает материалы из марсианского грунта',
    effect:'+4 🪨/сек на уровень',
    cost:{ materials: 50, energy: 40 },
    unlockPop: 2,
    produce: { materials: 4 }
  },
  {
    id:'factory', name:'Завод', icon:'🏭', color:'#9b59b6',
    desc:'Перерабатывает ресурсы в кредиты',
    effect:'+3 🪙/сек на уровень',
    cost:{ materials: 100, energy: 60 },
    unlockPop: 3,
    produce: { credits: 3 }
  },
  {
    id:'lab', name:'Лаборатория', icon:'🔬', color:'#a29bfe',
    desc:'Исследования усиливают все здания',
    effect:'+5% ко всему производству',
    cost:{ materials: 150, credits: 100, energy: 80 },
    unlockPop: 4,
    produce: null,
    multiplier: 0.05
  },
  {
    id:'medbay', name:'Медблок', icon:'🏥', color:'#e74c3c',
    desc:'Поддерживает здоровье колонистов',
    effect:'+10 к макс. населению',
    cost:{ materials: 120, water: 60, energy: 50 },
    unlockPop: 5,
    produce: null,
    storage: { population: 10 }
  },
  {
    id:'entertain', name:'Развлекательный центр', icon:'🎭', color:'#e91e63',
    desc:'Поднимает мораль (меньше бунтов)',
    effect:'+5% к производству за уровень',
    cost:{ materials: 180, credits: 150 },
    unlockPop: 8,
    produce: null,
    multiplier: 0.05
  },
  {
    id:'shield', name:'Щит радиации', icon:'🛡️', color:'#16a085',
    desc:'Защищает колонию от солнечных вспышек',
    effect:'-20% урона от событий',
    cost:{ materials: 250, energy: 150 },
    unlockPop: 12,
    produce: null,
    protection: 0.2
  },
  {
    id:'spaceport', name:'Космопорт', icon:'🚀', color:'#f5d76e',
    desc:'Торговля с Землёй — большой бонус кредитов',
    effect:'+15 🪙/сек за уровень',
    cost:{ materials: 500, credits: 400, energy: 300 },
    unlockPop: 15,
    produce: { credits: 15 }
  }
];

/* ═══════════════════ АПГРЕЙДЫ ЗДАНИЙ ═══════════════════ */
var UPGRADES = [
  { id:'up-dome',     name:'Прочные купола',   icon:'🏠', desc:'+1 вместимость к каждому куполу', maxLevel:5, baseCost:{materials:100,credits:50} },
  { id:'up-solar',    name:'Солнечные трекеры', icon:'☀️', desc:'+20% к производству энергии',   maxLevel:5, baseCost:{materials:80,credits:60} },
  { id:'up-ice',      name:'Глубокий бур',      icon:'💧', desc:'+20% к добыче воды',             maxLevel:5, baseCost:{materials:80,credits:60} },
  { id:'up-green',    name:'Гидропоника',       icon:'🌱', desc:'+20% к производству еды',        maxLevel:5, baseCost:{materials:100,credits:80} },
  { id:'up-oxy',      name:'Углеродный фильтр', icon:'💨', desc:'+20% к производству O₂',        maxLevel:5, baseCost:{materials:100,credits:80} },
  { id:'up-mine',     name:'Лазерный бур',      icon:'⛏️', desc:'+20% к добыче материалов',      maxLevel:5, baseCost:{materials:100,credits:60} },
  { id:'up-factory',  name:'Автоматизация',     icon:'🏭', desc:'+20% к производству кредитов',   maxLevel:5, baseCost:{materials:150,credits:100} },
  { id:'up-economy',  name:'Экономика',         icon:'📈', desc:'+10% ко всем кредитам',          maxLevel:5, baseCost:{materials:200,credits:200} }
];

/* ═══════════════════ ДОСТИЖЕНИЯ ═══════════════════ */
var ACHIEVEMENTS = [
  { id:'first',       icon:'🚀', title:'Первая посадка',      desc:'Построить первое здание' },
  { id:'pop5',        icon:'👥', title:'Пять колонистов',      desc:'Достичь 5 жителей' },
  { id:'pop20',       icon:'👨‍👩‍👧', title:'Двадцать',         desc:'Достичь 20 жителей' },
  { id:'pop50',       icon:'🏘️', title:'Пятьдесят',           desc:'Достичь 50 жителей' },
  { id:'pop100',      icon:'🌆', title:'Сто жителей',          desc:'Достичь 100 жителей' },
  { id:'build10',     icon:'🏗️', title:'Строитель',           desc:'Построить 10 зданий' },
  { id:'build30',     icon:'🏙️', title:'Архитектор',          desc:'Построить 30 зданий' },
  { id:'build50',     icon:'🌟', title:'Мастер',              desc:'Построить 50 зданий' },
  { id:'energy100',   icon:'⚡', title:'Энергетик',            desc:'100 энергии в запасе' },
  { id:'energy1k',    icon:'🔋', title:'Реактор',              desc:'1000 энергии в запасе' },
  { id:'water500',    icon:'💧', title:'Водолей',              desc:'500 воды в запасе' },
  { id:'food500',     icon:'🍞', title:'Хлебороб',             desc:'500 еды в запасе' },
  { id:'mat1k',       icon:'🪨', title:'Шахтёр',               desc:'1000 материалов' },
  { id:'credit1k',    icon:'💰', title:'Богач',                desc:'1000 кредитов' },
  { id:'credit10k',   icon:'💎', title:'Магнат',               desc:'10 000 кредитов' },
  { id:'upgrade5',    icon:'📈', title:'Улучшайзер',           desc:'5 улучшений' },
  { id:'upgrade20',   icon:'⚙️', title:'Инженер',              desc:'20 улучшений' },
  { id:'day10',       icon:'🌅', title:'10 сол',               desc:'Прожить 10 дней' },
  { id:'day50',       icon:'🌍', title:'50 сол',               desc:'Прожить 50 дней' },
  { id:'survive5',    icon:'🌪️', title:'Ветеран бурь',         desc:'Пережить 5 событий' }
];

/* ═══════════════════ СОБЫТИЯ ═══════════════════ */
var EVENTS = [
  {
    id:'dust', type:'bad', icon:'🌪️', title:'Пылевая буря',
    text:'Пыль блокирует солнечные панели!',
    effect:function(s){ 
      var loss = Math.round(s.resources.energy * 0.15);
      s.resources.energy = Math.max(0, s.resources.energy - loss);
      return '⚡ −' + loss + ' энергии';
    }
  },
  {
    id:'meteor', type:'bad', icon:'☄️', title:'Метеорит!',
    text:'Небольшой метеорит повредил купол.',
    effect:function(s){
      var loss = Math.round(s.resources.materials * 0.1);
      s.resources.materials = Math.max(0, s.resources.materials - loss);
      return '🪨 −' + loss + ' материалов';
    }
  },
  {
    id:'supply', type:'good', icon:'🚀', title:'Груз с Земли',
    text:'Земля прислала подкрепление!',
    effect:function(s){
      var bonus = 100 + Math.floor(Math.random() * 200);
      s.resources.materials += bonus;
      s.resources.credits += Math.floor(bonus / 2);
      return '🪨 +' + bonus + ' материалов, 🪙 +' + Math.floor(bonus/2);
    }
  },
  {
    id:'ice', type:'good', icon:'💧', title:'Найден лёд',
    text:'Бур нашёл огромный пласт подземного льда!',
    effect:function(s){
      var bonus = 80 + Math.floor(Math.random() * 120);
      s.resources.water += bonus;
      return '💧 +' + bonus + ' воды';
    }
  },
  {
    id:'newcomer', type:'good', icon:'👶', title:'Новый колонист',
    text:'Прибыл новый специалист!',
    effect:function(s){
      var max = getMaxPop();
      if (s.resources.population < max){
        s.resources.population += 1;
        return '👥 +1 колонист';
      }
      s.resources.credits += 50;
      return '👥 мест нет, но 🪙 +50 компенсации';
    }
  },
  {
    id:'solar', type:'good', icon:'🌞', title:'Солнечный день',
    text:'Отличная погода, панели работают на максимум!',
    effect:function(s){
      var bonus = 150 + Math.floor(Math.random() * 100);
      s.resources.energy += bonus;
      return '⚡ +' + bonus + ' энергии';
    }
  },
  {
    id:'tech', type:'good', icon:'🔬', title:'Прорыв технологий',
    text:'Лаборатория совершила открытие!',
    effect:function(s){
      var bonus = 200;
      s.resources.credits += bonus;
      s.stats.totalEarned += bonus;
      return '🪙 +' + bonus + ' кредитов';
    }
  }
];

/* ═══════════════════ СОСТОЯНИЕ ═══════════════════ */
var state = {
  resources: {
    energy: 30, water: 20, food: 15, oxygen: 10,
    materials: 60, population: 3, credits: 30
  },
  buildings: {},   /* { id: count } */
  upgrades: {},    /* { upId: level } */
  achievements: {},/* { id: true } */
  day: 1,
  tick: 0,         /* сколько тиков прошло */
  speed: 1,
  paused: false,
  eventsCount: 0,
  lastEventTick: 0,
  nextEventTick: 60,
  stats: {
    totalBuilt: 0,
    totalUpgrades: 0,
    maxPop: 3,
    totalEarned: 0,
    totalEvents: 0
  }
};

/* ═══════════════════ УТИЛИТЫ ═══════════════════ */
function esc(s){ return String(s||'').replace(/[&<>"']/g,function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }

function fmt(n){
  n = Math.floor(n || 0);
  if (n < 1000) return String(n);
  if (n < 1000000) return (n/1000).toFixed(1).replace(/\.0$/,'') + 'K';
  return (n/1000000).toFixed(1).replace(/\.0$/,'') + 'M';
}

function toast(msg, type){
  type = type || 'info';
  var t = document.createElement('div');
  t.className = 'ct-toast ' + type;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(function(){ t.classList.add('show'); });
  setTimeout(function(){
    t.classList.remove('show');
    setTimeout(function(){ t.remove(); }, 400);
  }, 2400);
}

/* ═══════════════════ ПОЛУЧЕНИЕ ПРОИЗВОДСТВА ═══════════════════ */
function getBuildingCount(id){
  return state.buildings[id] || 0;
}

function getUpgradeLevel(id){
  return state.upgrades[id] || 0;
}

function getMultiplier(){
  var m = 1;
  /* Лаборатория */
  var labCount = getBuildingCount('lab');
  var labDef = BUILDINGS.filter(function(b){ return b.id === 'lab'; })[0];
  if (labDef && labDef.multiplier) m += labCount * labDef.multiplier;
  /* Развлекательный центр */
  var entCount = getBuildingCount('entertain');
  var entDef = BUILDINGS.filter(function(b){ return b.id === 'entertain'; })[0];
  if (entDef && entDef.multiplier) m += entCount * entDef.multiplier;
  return m;
}

function getUpgradeMultiplier(resourceType){
  /* Тип ресурса → id апгрейда */
  var map = {
    energy: 'up-solar',
    water: 'up-ice',
    food: 'up-green',
    oxygen: 'up-oxy',
    materials: 'up-mine',
    credits: 'up-factory'
  };
  var upId = map[resourceType];
  if (!upId) return 1;
  var lvl = getUpgradeLevel(upId);
  return 1 + lvl * 0.2;
}

function getCreditMultiplier(){
  var lvl = getUpgradeLevel('up-economy');
  return 1 + lvl * 0.1;
}

function getMaxPop(){
  var base = 4; /* базовая вместимость */
  var domeCount = getBuildingCount('dome');
  var domeDef = BUILDINGS.filter(function(b){ return b.id === 'dome'; })[0];
  var domeCap = domeCount * (domeDef.storage.population);
  var upLvl = getUpgradeLevel('up-dome');
  domeCap += domeCount * upLvl; /* +1 за уровень апгрейда */

  var medbayCount = getBuildingCount('medbay');
  var medDef = BUILDINGS.filter(function(b){ return b.id === 'medbay'; })[0];
  var medCap = medbayCount * (medDef.storage.population || 0);

  return base + domeCap + medCap;
}

/* ═══════════════════ ПРОИЗВОДСТВО ЗА ТИК ═══════════════════ */
function calcProduction(){
  var prod = { energy:0, water:0, food:0, oxygen:0, materials:0, credits:0 };
  var m = getMultiplier();

  BUILDINGS.forEach(function(b){
    var count = getBuildingCount(b.id);
    if (!count || !b.produce) return;
    Object.keys(b.produce).forEach(function(res){
      var base = b.produce[res] * count;
      var upMult = getUpgradeMultiplier(res);
      var creditMult = res === 'credits' ? getCreditMultiplier() : 1;
      prod[res] += base * upMult * creditMult * m;
    });
  });

  return prod;
}

/* ═══════════════════ СТОИМОСТЬ ═══════════════════ */
function getBuildingCost(b){
  var count = getBuildingCount(b.id);
  var factor = Math.pow(1.15, count);
  var cost = {};
  Object.keys(b.cost).forEach(function(res){
    cost[res] = Math.ceil(b.cost[res] * factor);
  });
  return cost;
}

function getUpgradeCost(up){
  var lvl = getUpgradeLevel(up.id);
  var factor = Math.pow(1.6, lvl);
  var cost = {};
  Object.keys(up.baseCost).forEach(function(res){
    cost[res] = Math.ceil(up.baseCost[res] * factor);
  });
  return cost;
}

function canAfford(cost){
  return Object.keys(cost).every(function(res){
    return (state.resources[res] || 0) >= cost[res];
  });
}

function payCost(cost){
  Object.keys(cost).forEach(function(res){
    state.resources[res] -= cost[res];
  });
}

/* ═══════════════════ СТРОИТЕЛЬСТВО ═══════════════════ */
function build(bid){
  var b = BUILDINGS.filter(function(x){ return x.id === bid; })[0];
  if (!b) return;

  /* Проверка unlockPop */
  if (b.unlockPop && state.resources.population < b.unlockPop){
    toast('Нужно ' + b.unlockPop + ' жителей', 'error');
    return;
  }

  var cost = getBuildingCost(b);
  if (!canAfford(cost)){
    toast('Не хватает ресурсов', 'error');
    return;
  }
  payCost(cost);

  state.buildings[bid] = (state.buildings[bid] || 0) + 1;
  state.stats.totalBuilt++;

  toast('✅ ' + b.icon + ' ' + b.name + ' построен', 'success');

  /* Достижения */
  checkAchievements();

  render();
  scheduleSave();
}

/* ═══════════════════ УЛУЧШЕНИЕ ═══════════════════ */
function upgrade(upId){
  var up = UPGRADES.filter(function(u){ return u.id === upId; })[0];
  if (!up) return;

  var lvl = getUpgradeLevel(up.id);
  if (lvl >= up.maxLevel){
    toast('Максимальный уровень', 'info');
    return;
  }

  var cost = getUpgradeCost(up);
  if (!canAfford(cost)){
    toast('Не хватает ресурсов', 'error');
    return;
  }
  payCost(cost);

  state.upgrades[upId] = lvl + 1;
  state.stats.totalUpgrades++;

  toast('📈 ' + up.name + ' → ур. ' + (lvl + 1), 'gold');
  checkAchievements();
  render();
  scheduleSave();
}

/* ═══════════════════ ДОСТИЖЕНИЯ ═══════════════════ */
function checkAchievements(){
  var unlocked = [];

  function tryUnlock(id){
    if (!state.achievements[id]){
      state.achievements[id] = true;
      var a = ACHIEVEMENTS.filter(function(x){ return x.id === id; })[0];
      if (a) unlocked.push(a);
    }
  }

  var s = state.resources;
  var totalB = state.stats.totalBuilt;

  if (totalB >= 1) tryUnlock('first');
  if (s.population >= 5) tryUnlock('pop5');
  if (s.population >= 20) tryUnlock('pop20');
  if (s.population >= 50) tryUnlock('pop50');
  if (s.population >= 100) tryUnlock('pop100');
  if (totalB >= 10) tryUnlock('build10');
  if (totalB >= 30) tryUnlock('build30');
  if (totalB >= 50) tryUnlock('build50');
  if (s.energy >= 100) tryUnlock('energy100');
  if (s.energy >= 1000) tryUnlock('energy1k');
  if (s.water >= 500) tryUnlock('water500');
  if (s.food >= 500) tryUnlock('food500');
  if (s.materials >= 1000) tryUnlock('mat1k');
  if (s.credits >= 1000) tryUnlock('credit1k');
  if (s.credits >= 10000) tryUnlock('credit10k');
  if (state.stats.totalUpgrades >= 5) tryUnlock('upgrade5');
  if (state.stats.totalUpgrades >= 20) tryUnlock('upgrade20');
  if (state.day >= 10) tryUnlock('day10');
  if (state.day >= 50) tryUnlock('day50');
  if (state.stats.totalEvents >= 5) tryUnlock('survive5');

  /* Показываем каждое новое */
  unlocked.forEach(function(a, i){
    setTimeout(function(){
      toast('🏆 ' + a.title + '!', 'gold');
    }, i * 800);
  });
}

/* ═══════════════════ СОБЫТИЯ ═══════════════════ */
function triggerEvent(){
  var ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  var extra = ev.effect(state);
  state.stats.totalEvents++;
  state.eventsCount++;
  checkAchievements();

  /* Показываем баннер */
  var banner = document.getElementById('ct-event-banner');
  if (banner){
    banner.className = 'ct-event-banner ' + ev.type;
    banner.innerHTML =
      '<span class="ct-event-banner-icon">' + ev.icon + '</span>' +
      '<span><strong>' + esc(ev.title) + '</strong> — ' + esc(ev.text) + ' ' +
      '<span style="opacity:.85">' + esc(extra) + '</span></span>';
    banner.style.display = 'flex';
    setTimeout(function(){ banner.style.display = 'none'; }, 5000);
  }

  /* Добавляем в ленту */
  var feed = document.getElementById('ct-events');
  if (feed){
    var item = document.createElement('div');
    item.className = 'ct-event-item ' + ev.type;
    item.innerHTML =
      '<div class="ct-event-icon">' + ev.icon + '</div>' +
      '<div class="ct-event-text"><strong>' + esc(ev.title) + '.</strong> ' +
        esc(ev.text) + ' ' + esc(extra) + '</div>' +
      '<div class="ct-event-time">Сол ' + state.day + '</div>';
    feed.insertBefore(item, feed.firstChild);

    /* Оставляем только 8 последних */
    while (feed.children.length > 8){
      feed.removeChild(feed.lastChild);
    }
  }

  render();
}

/* ═══════════════════ ТИК ═══════════════════ */
function doTick(){
  if (state.paused) return;

  state.tick++;

  /* День = 60 тиков */
  var newDay = Math.floor(state.tick / 60) + 1;
  if (newDay !== state.day){
    state.day = newDay;
    checkAchievements();
  }

  var prod = calcProduction();

  /* Добавляем ресурсы */
  Object.keys(prod).forEach(function(res){
    if (res === 'population') return;
    state.resources[res] = (state.resources[res] || 0) + prod[res];
  });

  /* Население растёт если еда+вода в избытке */
  var maxPop = getMaxPop();
  var pop = state.resources.population;
  if (pop < maxPop && state.resources.food > 20 && state.resources.water > 20 && state.resources.oxygen > 10){
    /* Растём на 1 жителя в минуту (60 тиков) */
    if (state.tick % 60 === 0){
      state.resources.population++;
      if (state.resources.population > state.stats.maxPop){
        state.stats.maxPop = state.resources.population;
      }
    }
  }

  /* Если еды/воды/кислорода нет — теряем жителей */
  if (state.tick % 60 === 0){
    if (state.resources.food < 5 && state.resources.population > 1){
      state.resources.population--;
      pushEventFeed('bad', '🍞', 'Голод!', 'Не хватает еды — потерян 1 колонист');
    }
    if (state.resources.water < 5 && state.resources.population > 1){
      state.resources.population--;
      pushEventFeed('bad', '💧', 'Жажда!', 'Не хватает воды — потерян 1 колонист');
    }
    if (state.resources.oxygen < 5 && state.resources.population > 1){
      state.resources.population--;
      pushEventFeed('bad', '💨', 'Удушье!', 'Не хватает кислорода — потерян 1 колонист');
    }
  }

  /* Потребление: каждый житель тратит воду/еду/O₂ */
  var consume = state.resources.population / 60; /* за тик */
  state.resources.food = Math.max(0, state.resources.food - consume * 0.5);
  state.resources.water = Math.max(0, state.resources.water - consume * 0.5);
  state.resources.oxygen = Math.max(0, state.resources.oxygen - consume * 0.3);

  /* Кредиты учитываем в totalEarned */
  if (prod.credits > 0){
    state.stats.totalEarned += prod.credits;
  }

  /* События */
  if (state.tick >= state.nextEventTick){
    triggerEvent();
    state.nextEventTick = state.tick + EVENT_EVERY_MIN + Math.floor(Math.random() * (EVENT_EVERY_MAX - EVENT_EVERY_MIN));
  }

  /* Сохранение */
  if (state.tick % SAVE_EVERY === 0){
    save();
  }

  render();
}

function pushEventFeed(type, icon, title, text){
  var feed = document.getElementById('ct-events');
  if (!feed) return;
  var item = document.createElement('div');
  item.className = 'ct-event-item ' + type;
  item.innerHTML =
    '<div class="ct-event-icon">' + icon + '</div>' +
    '<div class="ct-event-text"><strong>' + esc(title) + '.</strong> ' + esc(text) + '</div>' +
    '<div class="ct-event-time">Сол ' + state.day + '</div>';
  feed.insertBefore(item, feed.firstChild);
  while (feed.children.length > 8){
    feed.removeChild(feed.lastChild);
  }
}

/* ═══════════════════ РЕНДЕР ═══════════════════ */
function render(){
  renderResources();
  renderControls();
  renderBuild();
  renderUpgrade();
  renderAchievements();
  renderStats();
}

function renderResources(){
  var prod = calcProduction();
  Object.keys(RESOURCES).forEach(function(res){
    var valEl = document.getElementById('r-' + res);
    var rateEl = document.getElementById('rr-' + res);
    if (!valEl || !rateEl) return;

    var val = state.resources[res] || 0;
    valEl.textContent = fmt(val);

    var rate = prod[res] || 0;
    if (res === 'population'){
      rateEl.textContent = '/' + getMaxPop();
      rateEl.className = 'ct-res-rate';
    } else {
      var sign = rate > 0 ? '+' : '';
      rateEl.textContent = sign + rate.toFixed(1) + '/с';
      rateEl.className = 'ct-res-rate ' + (rate > 0 ? 'positive' : rate < 0 ? 'negative' : '');
    }

    /* Подсветка при изменении */
    if (val < 5){
      valEl.style.color = '#ff8a80';
    } else {
      valEl.style.color = '#fff';
    }
  });
}

function renderControls(){
  var dayEl = document.getElementById('ct-day');
  var popNowEl = document.getElementById('ct-pop-now');
  var popMaxEl = document.getElementById('ct-pop-max');
  if (dayEl) dayEl.textContent = state.day;
  if (popNowEl) popNowEl.textContent = state.resources.population;
  if (popMaxEl) popMaxEl.textContent = getMaxPop();
}

function renderBuild(){
  var grid = document.getElementById('ct-build-grid');
  if (!grid) return;

  grid.innerHTML = BUILDINGS.map(function(b){
    var count = getBuildingCount(b.id);
    var cost = getBuildingCost(b);
    var afford = canAfford(cost);
    var unlocked = !b.unlockPop || state.resources.population >= b.unlockPop;

    var costHtml = Object.keys(cost).map(function(res){
      var have = state.resources[res] || 0;
      var cls = have >= cost[res] ? 'have' : 'lack';
      return '<span class="ct-cost-item ' + cls + '">' + RESOURCES[res].icon + ' ' + fmt(cost[res]) + '</span>';
    }).join('');

    var disabled = !unlocked || !afford;
    var btnLabel = !unlocked ? '🔒 Нужно ' + b.unlockPop + ' 👥'
      : afford ? '🏗️ Построить' : '❌ Не хватает';

    return '<div class="ct-card' + (disabled ? ' disabled' : '') + '" style="--card-color:' + b.color + '">' +
      (count > 0 ? '<div class="ct-card-level owned">×' + count + '</div>' : '') +
      '<div class="ct-card-head">' +
        '<div class="ct-card-emoji">' + b.icon + '</div>' +
        '<div class="ct-card-info">' +
          '<div class="ct-card-title">' + esc(b.name) + '</div>' +
          '<div class="ct-card-sub">' + esc(b.desc) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="ct-card-effect">→ ' + esc(b.effect) + '</div>' +
      '<div class="ct-card-cost">' + costHtml + '</div>' +
      '<div class="ct-card-actions">' +
        '<button class="ct-btn" ' + (disabled ? 'disabled' : '') + ' onclick="ctBuild(\'' + b.id + '\')">' + btnLabel + '</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderUpgrade(){
  var grid = document.getElementById('ct-upgrade-grid');
  if (!grid) return;

  grid.innerHTML = UPGRADES.map(function(up){
    var lvl = getUpgradeLevel(up.id);
    var cost = getUpgradeCost(up);
    var afford = canAfford(cost);
    var maxed = lvl >= up.maxLevel;

    var costHtml = maxed ? '<span class="ct-cost-item have">МАКСИМУМ</span>' :
      Object.keys(cost).map(function(res){
        var have = state.resources[res] || 0;
        var cls = have >= cost[res] ? 'have' : 'lack';
        return '<span class="ct-cost-item ' + cls + '">' + RESOURCES[res].icon + ' ' + fmt(cost[res]) + '</span>';
      }).join('');

    var levelsHtml = '';
    for (var i = 0; i < up.maxLevel; i++){
      levelsHtml += '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:3px;background:' + (i < lvl ? '#f39c12' : 'rgba(0,0,0,.1)') + '"></span>';
    }

    return '<div class="ct-card" style="--card-color:#f39c12">' +
      '<div class="ct-card-level ' + (lvl > 0 ? 'owned' : '') + '">ур. ' + lvl + '/' + up.maxLevel + '</div>' +
      '<div class="ct-card-head">' +
        '<div class="ct-card-emoji">' + up.icon + '</div>' +
        '<div class="ct-card-info">' +
          '<div class="ct-card-title">' + esc(up.name) + '</div>' +
          '<div class="ct-card-sub">' + esc(up.desc) + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="margin-bottom:12px">' + levelsHtml + '</div>' +
      '<div class="ct-card-cost">' + costHtml + '</div>' +
      '<div class="ct-card-actions">' +
        '<button class="ct-btn" ' + (!afford || maxed ? 'disabled' : '') + ' onclick="ctUpgrade(\'' + up.id + '\')">' +
          (maxed ? '✅ Готово' : afford ? '📈 Улучшить' : '❌ Не хватает') +
        '</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderAchievements(){
  var grid = document.getElementById('ct-ach-grid');
  var fill = document.getElementById('ct-ach-fill');
  var done = document.getElementById('ct-ach-done');
  var total = document.getElementById('ct-ach-total');
  if (!grid) return;

  var unlocked = Object.keys(state.achievements).length;
  if (done) done.textContent = unlocked;
  if (total) total.textContent = ACHIEVEMENTS.length;
  if (fill) fill.style.width = (unlocked / ACHIEVEMENTS.length * 100) + '%';

  grid.innerHTML = ACHIEVEMENTS.map(function(a){
    var has = state.achievements[a.id];
    return '<div class="ct-ach' + (has ? '' : ' locked') + '">' +
      '<div class="ct-ach-icon">' + a.icon + '</div>' +
      '<div class="ct-ach-info">' +
        '<div class="ct-ach-title">' + esc(a.title) + '</div>' +
        '<div class="ct-ach-desc">' + esc(a.desc) + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderStats(){
  var els = {
    total: document.getElementById('st-total'),
    upg: document.getElementById('st-upg'),
    maxpop: document.getElementById('st-maxpop'),
    earned: document.getElementById('st-earned'),
    events: document.getElementById('st-events'),
    time: document.getElementById('st-time'),
    goal: document.getElementById('st-goal')
  };

  if (els.total) els.total.textContent = state.stats.totalBuilt;
  if (els.upg) els.upg.textContent = state.stats.totalUpgrades;
  if (els.maxpop) els.maxpop.textContent = state.stats.maxPop;
  if (els.earned) els.earned.textContent = fmt(state.stats.totalEarned);
  if (els.events) els.events.textContent = state.stats.totalEvents;

  if (els.time){
    var sec = state.tick;
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    els.time.textContent = m + 'м ' + s + 'с';
  }

  /* Текущая цель */
  if (els.goal){
    var goal = '—';
    if (state.stats.totalBuilt < 1) goal = 'Построить первый купол';
    else if (state.resources.population < 5) goal = 'Достичь 5 жителей';
    else if (state.resources.population < 10) goal = 'Достичь 10 жителей';
    else if (state.stats.totalBuilt < 15) goal = 'Построить 15 зданий';
    else if (state.resources.population < 25) goal = 'Достичь 25 жителей';
    else if (state.resources.credits < 1000) goal = 'Заработать 1000 кредитов';
    else if (state.stats.totalBuilt < 30) goal = 'Построить 30 зданий';
    else if (state.resources.population < 50) goal = 'Достичь 50 жителей';
    else goal = '🌟 Построить мегаполис!';
    els.goal.textContent = goal;
  }
}

/* ═══════════════════ СОХРАНЕНИЕ ═══════════════════ */
var saveTimeout = null;
function scheduleSave(){
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(save, 2000);
}

function save(){
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch(e){ console.warn('[city] save failed:', e.message); }
}

function load(){
  try {
    var raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    var data = JSON.parse(raw);
    if (!data || !data.resources) return false;

    /* Мягкое слияние — сохраняем структуру, но берём данные */
    state.resources = Object.assign(state.resources, data.resources || {});
    state.buildings = data.buildings || {};
    state.upgrades = data.upgrades || {};
    state.achievements = data.achievements || {};
    state.day = data.day || 1;
    state.tick = data.tick || 0;
    state.speed = data.speed || 1;
    state.eventsCount = data.eventsCount || 0;
    state.lastEventTick = data.lastEventTick || 0;
    state.nextEventTick = data.nextEventTick || 60;
    state.stats = Object.assign(state.stats, data.stats || {});

    return true;
  } catch(e){
    console.warn('[city] load failed:', e.message);
    return false;
  }
}

function reset(){
  if (!confirm('Сбросить весь прогресс?')) return;
  try { localStorage.removeItem(SAVE_KEY); } catch(e){}
  state.resources = { energy:30, water:20, food:15, oxygen:10, materials:60, population:3, credits:30 };
  state.buildings = {};
  state.upgrades = {};
  state.achievements = {};
  state.day = 1;
  state.tick = 0;
  state.speed = 1;
  state.eventsCount = 0;
  state.nextEventTick = 60;
  state.stats = { totalBuilt:0, totalUpgrades:0, maxPop:3, totalEarned:0, totalEvents:0 };
  toast('🔄 Прогресс сброшен', 'info');
  render();
}

/* ═══════════════════ ОБРАБОТЧИКИ ═══════════════════ */
function initTabs(){
  document.querySelectorAll('.ct-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      document.querySelectorAll('.ct-tab').forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.dataset.tab;
      document.querySelectorAll('.ct-tab-content').forEach(function(c){
        c.classList.toggle('active', c.dataset.content === target);
      });
    });
  });
}

function initSpeed(){
  document.querySelectorAll('.ct-spd').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.ct-spd').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var spd = parseInt(btn.dataset.speed, 10);
      state.speed = spd;
      state.paused = spd === 0;
    });
  });
}

function initObserve(){
  var items = document.querySelectorAll('.ct-observe');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('ct-visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add('ct-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function(el){ io.observe(el); });
}

/* ═══════════════════ ЭКСПОРТ ═══════════════════ */
window.ctBuild = build;
window.ctUpgrade = upgrade;

/* ═══════════════════ ЦИКЛ ═══════════════════ */
var tickCounter = 0;
function loop(){
  tickCounter++;
  var tickRate = Math.max(1, Math.floor(TICK_MS / state.speed));
  if (tickCounter % tickRate === 0){
    doTick();
  }
  requestAnimationFrame(loop);
}

/* ═══════════════════ INIT ═══════════════════ */
function init(){
  var loaded = load();
  initObserve();
  initTabs();
  initSpeed();

  /* Восстановить скорость */
  var spdBtn = document.querySelector('.ct-spd[data-speed="' + state.speed + '"]');
  if (spdBtn){
    document.querySelectorAll('.ct-spd').forEach(function(b){ b.classList.remove('active'); });
    spdBtn.classList.add('active');
  }

  document.getElementById('ct-save').addEventListener('click', function(){
    save();
    toast('💾 Сохранено', 'success');
  });
  document.getElementById('ct-reset').addEventListener('click', reset);

  /* Если загружено — приветствие */
  var feed = document.getElementById('ct-events');
  if (loaded && feed){
    feed.innerHTML = '';
    pushEventFeed('info', '💾', 'Прогресс загружен', 'Продолжай с того же места, командир!');
  }

  render();

  /* Автосохранение при уходе */
  window.addEventListener('beforeunload', save);
  document.addEventListener('visibilitychange', function(){
    if (document.hidden) save();
  });

  /* Стартуем цикл */
  loop();

  console.log('🏙️ Игра «Марсианский город» загружена' + (loaded ? ' (прогресс восстановлен)' : ''));
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
</script>
