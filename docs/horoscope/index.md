---
title: Гороскоп
comments: false
---

<div id="hor-app">
  <div class="hor-loading">
    <div class="hor-spinner"></div>
    <p>Читаем звёзды...</p>
  </div>
</div>

<style>
/* ═══════════════════ ROOT ═══════════════════ */
#hor-app{
  --hor-k:#6C63FF; --hor-k-light:#A29BFE; --hor-k-bg:#F0F4FF; --hor-k-shadow:rgba(108,99,255,.25);
  max-width:1000px; margin:0 auto;
  font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
  padding:0 8px 60px; position:relative;
  -webkit-tap-highlight-color:transparent;
}
#hor-app *{box-sizing:border-box}
#hor-app a{text-decoration:none!important;border-bottom:none!important}

/* ═══════════════════ ANIMATIONS ═══════════════════ */
@keyframes horSpin{to{transform:rotate(360deg)}}
@keyframes horFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes horSlideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes horPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes horFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes horFloatSlow{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-12px) rotate(3deg)}}
@keyframes horRotate{to{transform:rotate(360deg)}}
@keyframes horShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes horPop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes horTwinkle{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
@keyframes horParticle{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(.2);opacity:0}}
@keyframes horToastIn{from{transform:translate(-50%,100px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
@keyframes horToastOut{from{transform:translate(-50%,0);opacity:1}to{transform:translate(-50%,100px);opacity:0}}
@keyframes horReveal{0%{opacity:0;transform:scale(.94) rotate(-2deg)}100%{opacity:1;transform:scale(1) rotate(0)}}

.hor-fade{animation:horFadeIn .5s cubic-bezier(.16,1,.3,1) both}

/* ═══════════════════ LOADING / ERROR ═══════════════════ */
.hor-loading{text-align:center;padding:60px 20px}
.hor-spinner{
  display:inline-block;width:52px;height:52px;
  border:4px solid rgba(108,99,255,.25);border-top-color:#6C63FF;
  border-radius:50%;animation:horSpin .8s linear infinite;
}
.hor-loading p{color:#999;margin-top:16px;font-size:.9rem}
.hor-error-card{
  max-width:420px;margin:60px auto;padding:32px 26px;text-align:center;
  background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);
}
.hor-error-card h2{margin:0 0 10px;color:#1a1a2e}
.hor-error-card p{margin:0 0 20px;color:#666;font-size:.9rem;line-height:1.5}
.hor-error-card button{
  padding:12px 28px;border-radius:30px;border:none;
  background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;
  font-weight:800;font-family:inherit;font-size:.95rem;cursor:pointer;
}

/* ═══════════════════ HERO ═══════════════════ */
.hor-hero{
  position:relative;
  background:linear-gradient(135deg,#0f0f1e 0%,#1a1a2e 40%,#2d1b3d 70%,#0f3460 100%);
  border-radius:24px;padding:44px 32px 40px;color:#fff;margin-bottom:20px;
  overflow:hidden;min-height:320px;
  box-shadow:0 24px 80px -16px rgba(0,0,0,.6),0 0 80px rgba(108,99,255,.15) inset;
  display:flex;align-items:center;justify-content:center;
  isolation:isolate;
}
.hor-hero-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1}
.hor-star{
  position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;
  box-shadow:0 0 6px #fff;animation:horTwinkle 3s ease-in-out infinite;
}
.hor-star:nth-child(1){top:15%;left:10%;animation-delay:0s}
.hor-star:nth-child(2){top:25%;left:25%;animation-delay:.5s;width:1.5px;height:1.5px}
.hor-star:nth-child(3){top:10%;left:40%;animation-delay:1s}
.hor-star:nth-child(4){top:35%;left:60%;animation-delay:1.5s;width:1.5px;height:1.5px}
.hor-star:nth-child(5){top:20%;left:75%;animation-delay:.7s}
.hor-star:nth-child(6){top:45%;left:88%;animation-delay:1.2s}
.hor-star:nth-child(7){top:60%;left:15%;animation-delay:.3s;width:1.5px;height:1.5px}
.hor-star:nth-child(8){top:75%;left:45%;animation-delay:1.7s}
.hor-star:nth-child(9){top:80%;left:70%;animation-delay:.9s;width:1.5px;height:1.5px}
.hor-star:nth-child(10){top:70%;left:90%;animation-delay:1.4s}
.hor-hero::before{
  content:'';position:absolute;top:-50%;right:-20%;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(162,155,254,.25),transparent 70%);
  animation:horFloat 10s ease-in-out infinite;pointer-events:none;z-index:0;
}
.hor-hero::after{
  content:'';position:absolute;bottom:-40%;left:-15%;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(243,156,18,.15),transparent 70%);
  animation:horFloat 12s ease-in-out infinite reverse;pointer-events:none;z-index:0;
}
.hor-hero-content{position:relative;z-index:3;text-align:center;max-width:520px}
.hor-hero-wheel{
  position:absolute;right:-80px;top:50%;transform:translateY(-50%);
  width:400px;height:400px;opacity:.18;pointer-events:none;
  animation:horRotate 120s linear infinite;z-index:2;
}
.hor-hero-wheel svg{width:100%;height:100%}
.hor-hero-icon{
  font-size:4rem;margin-bottom:10px;display:inline-block;
  animation:horFloatSlow 4s ease-in-out infinite;
  filter:drop-shadow(0 8px 32px rgba(162,155,254,.8));line-height:1;
}
.hor-hero-title{
  font-size:2.1rem;font-weight:900;margin:0 0 8px;letter-spacing:-.5px;
  background:linear-gradient(90deg,#fff,#A29BFE,#f5d76e,#fff);background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:horShine 5s linear infinite;
}
.hor-hero-sub{font-size:.95rem;opacity:.85;margin:0 0 18px;line-height:1.6}
.hor-date-badge{
  display:inline-flex;align-items:center;gap:8px;
  padding:9px 20px;border-radius:30px;
  background:rgba(255,255,255,.08);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.18);
  font-size:.8rem;font-weight:700;letter-spacing:.5px;
}
.hor-streak{
  display:inline-flex;align-items:center;gap:6px;margin-left:8px;
  padding:9px 16px;border-radius:30px;
  background:linear-gradient(135deg,rgba(243,156,18,.2),rgba(231,76,60,.15));
  border:1px solid rgba(243,156,18,.4);
  font-size:.78rem;font-weight:800;color:#f5d76e;
}

/* ═══════════════════ MODE TABS ═══════════════════ */
.hor-mode-tabs{
  display:flex;justify-content:center;gap:6px;margin-bottom:20px;padding:6px;
  background:rgba(255,255,255,.85);backdrop-filter:blur(12px);
  border-radius:16px;border:1px solid rgba(0,0,0,.05);
  box-shadow:0 4px 12px rgba(0,0,0,.04);
  max-width:420px;margin-left:auto;margin-right:auto;
}
.hor-mode-tab{
  flex:1;padding:10px 16px;border:none;background:transparent;color:#666;
  font-size:.85rem;font-weight:800;border-radius:12px;cursor:pointer;
  transition:all .25s cubic-bezier(.16,1,.3,1);font-family:inherit;
  display:inline-flex;align-items:center;justify-content:center;gap:6px;
}
.hor-mode-tab:hover{background:rgba(0,0,0,.05);color:#333}
.hor-mode-tab.active{
  background:linear-gradient(135deg,var(--hor-k),var(--hor-k-light));
  color:#fff;box-shadow:0 6px 16px -4px var(--hor-k-shadow);
}

/* ═══════════════════ SIGNS GRID ═══════════════════ */
.hor-signs-title{
  font-size:1rem;font-weight:800;color:#1a1a1a;margin:0 0 14px;
  display:flex;align-items:center;gap:8px;justify-content:center;
}
.hor-signs-title .hor-title-count{
  font-size:.72rem;padding:3px 10px;border-radius:12px;
  background:rgba(108,99,255,.12);color:var(--hor-k);font-weight:800;
}
.hor-signs-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));
  gap:10px;margin-bottom:24px;
}
.hor-sign{
  position:relative;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);
  border-radius:16px;border:2px solid transparent;
  padding:14px 10px 12px;text-align:center;cursor:pointer;
  transition:all .3s cubic-bezier(.16,1,.3,1);font-family:inherit;
  box-shadow:0 4px 12px rgba(0,0,0,.05);overflow:hidden;
}
.hor-sign::before{
  content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:var(--sign-color,var(--hor-k));opacity:0;transition:opacity .3s;
}
.hor-sign:hover{
  transform:translateY(-6px);border-color:var(--sign-color,var(--hor-k));
  box-shadow:0 16px 40px -8px rgba(0,0,0,.15);
}
.hor-sign:hover .hor-sign-icon{transform:scale(1.2) rotate(-10deg)}
.hor-sign.active{
  border-color:var(--sign-color,var(--hor-k));
  background:linear-gradient(135deg,
    color-mix(in srgb,var(--sign-color,var(--hor-k)) 12%,transparent),
    rgba(255,255,255,.95));
  box-shadow:0 12px 32px -8px var(--sign-color,var(--hor-k));
  transform:translateY(-4px);
}
.hor-sign.active::before{opacity:1}
.hor-sign.active .hor-sign-icon{animation:horPulse 2s ease-in-out infinite}
.hor-sign-icon{
  font-size:2rem;display:block;margin-bottom:6px;line-height:1;
  filter:drop-shadow(0 3px 8px rgba(0,0,0,.2));
  transition:transform .3s cubic-bezier(.34,1.56,.64,1);
}
.hor-sign-name{font-size:.8rem;font-weight:800;color:#1a1a1a;line-height:1.15;margin-bottom:2px;letter-spacing:-.2px}
.hor-sign-dates{font-size:.65rem;color:#888;font-weight:700;letter-spacing:.3px}
.hor-sign-fav{position:absolute;top:6px;right:6px;font-size:.75rem;opacity:0;transition:opacity .2s}
.hor-sign.active .hor-sign-fav{opacity:1}

/* ═══════════════════ RESULT ═══════════════════ */
.hor-result{
  background:rgba(255,255,255,.95);backdrop-filter:blur(16px);
  border-radius:24px;border:2px solid var(--hor-k);padding:0;margin-bottom:24px;
  box-shadow:0 20px 60px -16px var(--hor-k-shadow);
  position:relative;overflow:hidden;animation:horReveal .6s cubic-bezier(.16,1,.3,1);
}
.hor-result::before{
  content:'';position:absolute;top:-50%;right:-20%;
  width:500px;height:500px;background:radial-gradient(circle,var(--hor-k),transparent 70%);
  opacity:.06;border-radius:50%;animation:horFloat 8s ease-in-out infinite;pointer-events:none;
}
.hor-result-head{
  position:relative;z-index:2;padding:28px 32px 20px;
  background:linear-gradient(135deg,
    color-mix(in srgb,var(--hor-k) 6%,transparent),transparent);
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
}
.hor-result-icon{
  font-size:3.8rem;line-height:1;
  filter:drop-shadow(0 6px 16px rgba(0,0,0,.25));
  animation:horFloat 4s ease-in-out infinite;
}
.hor-result-info{flex:1;min-width:180px}
.hor-result-sign{font-size:1.4rem;font-weight:900;color:#1a1a1a;margin:0 0 4px;letter-spacing:-.4px;line-height:1.2}
.hor-result-sub{font-size:.78rem;color:#888;font-weight:700;display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.hor-badge{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:10px;font-size:.68rem;font-weight:800;letter-spacing:.3px}
.hor-badge.element{background:rgba(108,99,255,.12);color:var(--hor-k)}
.hor-badge.native{background:linear-gradient(135deg,#f5d76e,#f39c12);color:#fff}
.hor-badge.fav{background:rgba(243,156,18,.15);color:#e67e22}
.hor-result-tabs{
  position:relative;z-index:2;display:flex;gap:4px;padding:0 32px;
  border-bottom:1px solid rgba(0,0,0,.06);
}
.hor-result-tab{
  padding:12px 18px;border:none;background:transparent;color:#888;
  font-size:.85rem;font-weight:800;cursor:pointer;font-family:inherit;
  border-bottom:3px solid transparent;transition:all .25s;
  margin-bottom:-1px;position:relative;
}
.hor-result-tab:hover{color:#333}
.hor-result-tab.active{color:var(--hor-k);border-bottom-color:var(--hor-k)}
.hor-result-tab.active::after{
  content:'';position:absolute;bottom:-1px;left:20%;right:20%;height:3px;
  background:var(--hor-k);border-radius:3px 3px 0 0;box-shadow:0 0 12px var(--hor-k);
}
.hor-result-body{position:relative;z-index:2;padding:24px 32px 28px}
.hor-result-text{
  font-size:1.05rem;line-height:1.85;color:#2a2a3e;
  padding:16px 20px;border-left:4px solid var(--hor-k);
  background:linear-gradient(135deg,
    color-mix(in srgb,var(--hor-k) 5%,transparent),transparent);
  border-radius:0 12px 12px 0;margin:0 0 20px;font-style:italic;
  position:relative;word-break:break-word;
  animation:horReveal .8s cubic-bezier(.16,1,.3,1) .15s both;
}
.hor-result-text::before{content:'«';position:absolute;top:-10px;left:8px;font-size:3rem;color:var(--hor-k);opacity:.3;line-height:1}
.hor-result-text::after{content:'»';position:absolute;bottom:-30px;right:12px;font-size:3rem;color:var(--hor-k);opacity:.3;line-height:1}

.hor-qualities{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));
  gap:10px;margin-bottom:20px;
}
.hor-quality{
  padding:12px 10px;background:rgba(0,0,0,.02);
  border:1.5px solid rgba(0,0,0,.05);border-radius:14px;text-align:center;
  transition:all .25s cubic-bezier(.16,1,.3,1);animation:horFadeIn .5s ease both;
}
.hor-quality:hover{
  transform:translateY(-3px);border-color:var(--hor-k);
  background:color-mix(in srgb,var(--hor-k) 6%,transparent);
}
.hor-quality-icon{font-size:1.6rem;margin-bottom:4px;display:block;line-height:1}
.hor-quality-label{font-size:.65rem;color:#888;text-transform:uppercase;letter-spacing:.8px;font-weight:800;margin-bottom:3px}
.hor-quality-value{font-size:.9rem;font-weight:900;color:var(--hor-k);line-height:1.2;word-break:break-word}
.hor-quality-value.luck{letter-spacing:1px}
.hor-result-actions{
  display:flex;gap:8px;flex-wrap:wrap;
  padding-top:18px;border-top:1px dashed rgba(0,0,0,.08);
}
.hor-btn{
  display:inline-flex;align-items:center;gap:6px;
  padding:11px 20px;border-radius:26px;border:2px solid transparent;
  font-size:.85rem;font-weight:800;cursor:pointer;font-family:inherit;
  background:var(--hor-k);color:#fff;
  box-shadow:0 6px 16px -4px var(--hor-k-shadow);
  transition:all .25s cubic-bezier(.16,1,.3,1);
  text-decoration:none!important;
}
.hor-btn:hover{transform:translateY(-2px);box-shadow:0 12px 28px -6px var(--hor-k-shadow)}
.hor-btn:active{transform:translateY(0) scale(.97)}
.hor-btn.outline{background:transparent;color:var(--hor-k);border-color:var(--hor-k);box-shadow:none}
.hor-btn.outline:hover{background:var(--hor-k);color:#fff}
.hor-btn.success{background:linear-gradient(135deg,#27ae60,#16a085);box-shadow:0 6px 16px -4px rgba(39,174,96,.4)}
.hor-btn:disabled{opacity:.55;cursor:wait;transform:none}

/* ═══════════════════ WEEK ═══════════════════ */
.hor-section-title{
  font-size:1.05rem;font-weight:800;color:#1a1a1a;margin:0 0 14px;
  display:flex;align-items:center;gap:8px;
}
.hor-section-title .hor-section-sub{font-size:.75rem;color:#888;font-weight:700;margin-left:auto}
.hor-week{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:24px}
.hor-day{
  background:rgba(255,255,255,.9);backdrop-filter:blur(12px);
  border-radius:14px;padding:12px 6px;text-align:center;
  border:2px solid transparent;transition:all .25s cubic-bezier(.16,1,.3,1);
  cursor:pointer;position:relative;
}
.hor-day:hover{
  transform:translateY(-4px);border-color:var(--hor-k);
  box-shadow:0 8px 20px -6px var(--hor-k-shadow);
}
.hor-day.today{
  background:linear-gradient(135deg,var(--hor-k),var(--hor-k-light));
  color:#fff;border-color:var(--hor-k);
  box-shadow:0 8px 20px -4px var(--hor-k-shadow);transform:translateY(-3px);
}
.hor-day.today .hor-day-name{color:rgba(255,255,255,.9)}
.hor-day.today .hor-day-num{color:#fff}
.hor-day.today .hor-day-icon{filter:none;animation:horPulse 2s ease-in-out infinite}
.hor-day-name{
  font-size:.65rem;color:#888;text-transform:uppercase;
  letter-spacing:.5px;font-weight:800;margin-bottom:6px;
}
.hor-day-icon{font-size:1.35rem;margin-bottom:4px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.15))}
.hor-day-num{font-size:.85rem;font-weight:900;color:#1a1a1a;font-variant-numeric:tabular-nums}
.hor-day-bar{
  height:3px;border-radius:3px;margin-top:6px;
  background:linear-gradient(90deg,var(--hor-k),var(--hor-k-light));
  transition:width .3s;
}

/* ═══════════════════ COMPATIBILITY ═══════════════════ */
.hor-compat{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:24px}
.hor-compat-card{
  padding:14px 12px;border-radius:14px;text-align:center;
  border:2px solid rgba(0,0,0,.05);
  background:rgba(255,255,255,.9);backdrop-filter:blur(12px);
  transition:all .25s;
}
.hor-compat-card:hover{transform:translateY(-3px)}
.hor-compat-card.good{border-color:rgba(39,174,96,.3);background:linear-gradient(135deg,rgba(39,174,96,.08),rgba(255,255,255,.95))}
.hor-compat-card.warn{border-color:rgba(243,156,18,.3);background:linear-gradient(135deg,rgba(243,156,18,.08),rgba(255,255,255,.95))}
.hor-compat-card.bad{border-color:rgba(231,76,60,.3);background:linear-gradient(135deg,rgba(231,76,60,.08),rgba(255,255,255,.95))}
.hor-compat-label{font-size:.65rem;text-transform:uppercase;letter-spacing:.8px;font-weight:800;color:#888;margin-bottom:6px}
.hor-compat-icon{font-size:1.8rem;margin-bottom:4px;line-height:1}
.hor-compat-name{font-size:.85rem;font-weight:900;color:#1a1a1a;line-height:1.2}
.hor-compat-desc{font-size:.68rem;color:#888;font-weight:700;margin-top:2px}

/* ═══════════════════ HISTORY ═══════════════════ */
.hor-history-head{
  display:flex;justify-content:space-between;align-items:center;
  gap:10px;margin-bottom:12px;flex-wrap:wrap;
}
.hor-history-tabs{
  display:flex;gap:4px;background:rgba(0,0,0,.04);padding:3px;border-radius:12px;
}
.hor-htab{
  padding:6px 12px;border:none;background:transparent;
  border-radius:9px;font-size:.75rem;font-weight:800;color:#666;
  cursor:pointer;font-family:inherit;transition:all .2s;
}
.hor-htab.active{background:#fff;color:var(--hor-k);box-shadow:0 2px 8px rgba(0,0,0,.06)}
.hor-history-clear{
  background:transparent;border:none;color:#999;font-size:.75rem;
  cursor:pointer;font-family:inherit;text-decoration:underline;padding:4px 8px;
}
.hor-history-clear:hover{color:#e74c3c}
.hor-history-list{display:grid;gap:8px}
.hor-history-item{
  display:flex;align-items:flex-start;gap:12px;padding:12px 14px;
  background:rgba(255,255,255,.9);backdrop-filter:blur(12px);
  border-radius:14px;border:1px solid rgba(0,0,0,.05);
  transition:all .25s cubic-bezier(.16,1,.3,1);cursor:pointer;
  animation:horSlideRight .35s ease both;
}
.hor-history-item:hover{
  transform:translateX(4px);border-color:var(--hor-k);
  box-shadow:0 8px 20px -6px var(--hor-k-shadow);
}
.hor-history-icon{font-size:1.8rem;flex-shrink:0;line-height:1;filter:drop-shadow(0 3px 6px rgba(0,0,0,.15))}
.hor-history-body{flex:1;min-width:0}
.hor-history-date{font-size:.72rem;color:#888;font-weight:700;margin-bottom:4px}
.hor-history-text{
  font-size:.85rem;color:#555;line-height:1.45;font-style:italic;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}
.hor-history-sign{
  font-size:.68rem;padding:3px 9px;border-radius:10px;
  background:rgba(108,99,255,.12);color:var(--hor-k);
  font-weight:800;white-space:nowrap;flex-shrink:0;align-self:flex-start;
}
.hor-history-del{
  width:26px;height:26px;border-radius:50%;border:none;
  background:rgba(231,76,60,.08);color:#e74c3c;cursor:pointer;
  font-family:inherit;font-size:.75rem;flex-shrink:0;transition:all .2s;
  display:flex;align-items:center;justify-content:center;padding:0;
}
.hor-history-del:hover{background:#e74c3c;color:#fff;transform:scale(1.1)}

/* ═══════════════════ EMPTY ═══════════════════ */
.hor-empty{
  text-align:center;padding:40px 20px;
  background:linear-gradient(135deg,rgba(255,255,255,.6),rgba(255,255,255,.9));
  border-radius:16px;border:2px dashed rgba(108,99,255,.2);
}
.hor-empty-icon{font-size:3rem;opacity:.5;margin-bottom:12px;line-height:1}
.hor-empty-title{font-size:.95rem;font-weight:800;color:#666}

/* ═══════════════════ TOAST ═══════════════════ */
.hor-toast{
  position:fixed;bottom:30px;left:50%;
  transform:translateX(-50%) translateY(100px);
  padding:12px 26px;border-radius:30px;color:#fff;font-weight:800;font-size:.9rem;
  box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:2147483647;
  pointer-events:none;max-width:90vw;text-align:center;opacity:0;
}
.hor-toast.show{animation:horToastIn .4s cubic-bezier(.16,1,.3,1) forwards;opacity:1}
.hor-toast.hide{animation:horToastOut .3s ease forwards}
.hor-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.hor-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.hor-toast.warning{background:linear-gradient(135deg,#e67e22,#d35400)}
.hor-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}

/* ═══════════════════ PARTICLES / SCROLL TOP ═══════════════════ */
.hor-particles{position:fixed;inset:0;pointer-events:none;z-index:9998}
.hor-particle{
  position:absolute;width:8px;height:8px;border-radius:50%;
  animation:horParticle 1s cubic-bezier(.16,1,.3,1) forwards;
  will-change:transform,opacity;
}
.hor-scroll-top{
  position:fixed;bottom:24px;right:24px;width:48px;height:48px;border-radius:50%;
  background:linear-gradient(135deg,var(--hor-k),var(--hor-k-light));
  color:#fff;border:none;cursor:pointer;font-size:1.15rem;font-family:inherit;
  box-shadow:0 12px 32px -4px var(--hor-k-shadow);
  display:none;align-items:center;justify-content:center;z-index:100;
  transition:all .3s cubic-bezier(.16,1,.3,1);opacity:0;
}
.hor-scroll-top.show{display:flex;opacity:1;animation:horPop .3s ease}
.hor-scroll-top:hover{transform:translateY(-4px) scale(1.05)}

/* ═══════════════════ DARK MODE ═══════════════════ */
@media (prefers-color-scheme: dark){
  html body.mars-stars-on #hor-app .hor-sign,
  html body.mars-stars-on #hor-app .hor-result,
  html body.mars-stars-on #hor-app .hor-day,
  html body.mars-stars-on #hor-app .hor-quality,
  html body.mars-stars-on #hor-app .hor-history-item,
  html body.mars-stars-on #hor-app .hor-mode-tabs,
  html body.mars-stars-on #hor-app .hor-compat-card,
  html body.mars-stars-on #hor-app .hor-empty{
    background:rgba(20,20,42,.9);border-color:rgba(108,99,255,.3);color:#e0e0f0;
  }
  html body.mars-stars-on #hor-app .hor-sign-name,
  html body.mars-stars-on #hor-app .hor-result-sign,
  html body.mars-stars-on #hor-app .hor-section-title,
  html body.mars-stars-on #hor-app .hor-day-num,
  html body.mars-stars-on #hor-app .hor-compat-name{color:#e0e0f0}
  html body.mars-stars-on #hor-app .hor-result-text{color:#d0d0e0;background:rgba(108,99,255,.08)}
  html body.mars-stars-on #hor-app .hor-history-text{color:#aaa}
  html body.mars-stars-on #hor-app .hor-mode-tab{color:#aaa}
  html body.mars-stars-on #hor-app .hor-mode-tab.active{color:#fff}
  html body.mars-stars-on #hor-app .hor-htab{color:#aaa}
  html body.mars-stars-on #hor-app .hor-htab.active{background:#252550;color:#A29BFE}
  html body.mars-stars-on #hor-app .hor-history-tabs{background:rgba(255,255,255,.05)}
}

/* ═══════════════════ MOBILE ═══════════════════ */
@media (max-width:640px){
  .hor-hero{padding:32px 20px 28px;min-height:260px}
  .hor-hero-title{font-size:1.6rem}
  .hor-hero-icon{font-size:3rem}
  .hor-hero-wheel{width:260px;height:260px;right:-100px}
  .hor-date-badge{font-size:.72rem;padding:7px 14px;flex-wrap:wrap;justify-content:center}
  .hor-streak{font-size:.7rem;padding:7px 12px;margin-left:0;margin-top:6px}
  .hor-signs-grid{grid-template-columns:repeat(2,1fr);gap:8px}
  .hor-result-head{padding:22px 20px 16px;gap:12px}
  .hor-result-icon{font-size:3rem}
  .hor-result-sign{font-size:1.15rem}
  .hor-result-tabs{padding:0 20px;overflow-x:auto}
  .hor-result-tab{padding:10px 14px;font-size:.78rem;white-space:nowrap}
  .hor-result-body{padding:18px 20px 22px}
  .hor-result-text{font-size:.95rem;padding:14px 16px}
  .hor-result-actions{flex-direction:column}
  .hor-btn{justify-content:center}
  .hor-week{gap:4px}
  .hor-day{padding:9px 3px}
  .hor-day-name{font-size:.55rem}
  .hor-day-icon{font-size:1.1rem}
  .hor-day-num{font-size:.72rem}
  .hor-compat{grid-template-columns:1fr;gap:8px}
  .hor-scroll-top{width:42px;height:42px;bottom:20px;right:16px}
  .hor-quality{padding:10px 8px}
  .hor-quality-value{font-size:.82rem}
  .hor-signs-title{font-size:.9rem}
  .hor-section-title{font-size:.95rem}
}
@media (prefers-reduced-motion: reduce){
  #hor-app *, #hor-app *::before, #hor-app *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
(function(){
'use strict';

if (window.__horLoaded) return;
window.__horLoaded = true;

/* ═══════════════════ SUPABASE CLIENT (использует единый) ═══════════════════ */
var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var sb = null;
try {
  if (window.supabaseClient && window.supabaseClient.auth) {
    sb = window.supabaseClient;
  } else if (window.supabase && window.supabase.createClient) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch(e){ console.warn('[hor] Supabase init failed:', e); }

/* ═══════════════════ KINGDOMS ═══════════════════ */
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

/* ═══════════════════ 8 MARTIAN SIGNS ═══════════════════ */
var MARTIAN_SIGNS = [
  { id:'akha-dzen', name:'Ākha-dzen', ru:'Водная Звезда', icon:'🌊', dates:'Пробуждение', color:'#3498db', element:'Вода', months:[0,1], stone:'Аквамарин', planet:'Фобос', ruler:'Хевсур' },
  { id:'dzen-akha', name:'Dzen-ākha', ru:'Звёздная Вода', icon:'💧', dates:'Цветение', color:'#1abc9c', element:'Вода', months:[2,3], stone:'Жемчуг', planet:'Деймос', ruler:'Алира' },
  { id:'mar-dzen', name:'Mar-dzen', ru:'Жизнь-Звезда', icon:'🌟', dates:'Зной', color:'#e74c3c', element:'Огонь', months:[4,5], stone:'Рубин', planet:'Солнце', ruler:'Сарум' },
  { id:'zal-akha', name:'Zal-ākha', ru:'Ветряная Вода', icon:'🌪️', dates:'Ветры', color:'#95a5a6', element:'Воздух', months:[6,7], stone:'Топаз', planet:'Юпитер', ruler:'Ксанф' },
  { id:'kol-ghar', name:'Kōl-ghar', ru:'Каменная Земля', icon:'⛰️', dates:'Угасание', color:'#7f8c8d', element:'Земля', months:[8,9], stone:'Гранит', planet:'Сатурн', ruler:'Йарра' },
  { id:'dzen-kol', name:'Dzen-kōl', ru:'Звёздная Земля', icon:'🏔️', dates:'Заморозки', color:'#34495e', element:'Земля', months:[10,11], stone:'Обсидиан', planet:'Марс', ruler:'Аратан III' },
  { id:'lan-sen', name:'Lān-sen', ru:'Место Памяти', icon:'🕯️', dates:'Тьма', color:'#8e44ad', element:'Дух', months:[12,13,14], stone:'Аметист', planet:'Луна', ruler:'Совия' },
  { id:'kol-suf', name:'Kōl-suf', ru:'Великая Земля', icon:'❄️', dates:'Ледяной покров', color:'#5dade2', element:'Лёд', months:[15,16,17,18,19,20,21], stone:'Алмаз', planet:'Уран', ruler:'Мнемис' }
];

/* ═══════════════════ 12 EARTH SIGNS ═══════════════════ */
var EARTH_SIGNS = [
  { id:'aries',   name:'Aries',       ru:'Овен',       icon:'♈', dates:'21.03–19.04', color:'#e74c3c', element:'Огонь', months:[2,3], stone:'Алмаз', planet:'Марс', ruler:'Арес' },
  { id:'taurus',  name:'Taurus',      ru:'Телец',      icon:'♉', dates:'20.04–20.05', color:'#27ae60', element:'Земля', months:[3,4], stone:'Изумруд', planet:'Венера', ruler:'Тельпу' },
  { id:'gemini',  name:'Gemini',      ru:'Близнецы',   icon:'♊', dates:'21.05–20.06', color:'#f39c12', element:'Воздух', months:[4,5], stone:'Агат', planet:'Меркурий', ruler:'Кастор' },
  { id:'cancer',  name:'Cancer',      ru:'Рак',        icon:'♋', dates:'21.06–22.07', color:'#3498db', element:'Вода', months:[5,6], stone:'Лунный камень', planet:'Луна', ruler:'Артемида' },
  { id:'leo',     name:'Leo',         ru:'Лев',        icon:'♌', dates:'23.07–22.08', color:'#f5d76e', element:'Огонь', months:[6,7], stone:'Янтарь', planet:'Солнце', ruler:'Гелиос' },
  { id:'virgo',   name:'Virgo',       ru:'Дева',       icon:'♍', dates:'23.08–22.09', color:'#16a085', element:'Земля', months:[7,8], stone:'Сапфир', planet:'Меркурий', ruler:'Астрея' },
  { id:'libra',   name:'Libra',       ru:'Весы',       icon:'♎', dates:'23.09–22.10', color:'#9b59b6', element:'Воздух', months:[8,9], stone:'Опал', planet:'Венера', ruler:'Фемида' },
  { id:'scorpio', name:'Scorpio',     ru:'Скорпион',   icon:'♏', dates:'23.10–21.11', color:'#8e44ad', element:'Вода', months:[9,10], stone:'Топаз', planet:'Плутон', ruler:'Гадес' },
  { id:'sagittarius', name:'Sagittarius', ru:'Стрелец', icon:'♐', dates:'22.11–21.12', color:'#e67e22', element:'Огонь', months:[10,11], stone:'Бирюза', planet:'Юпитер', ruler:'Хирон' },
  { id:'capricorn', name:'Capricorn', ru:'Козерог',    icon:'♑', dates:'22.12–19.01', color:'#546e7a', element:'Земля', months:[11,0], stone:'Гранит', planet:'Сатурн', ruler:'Кронос' },
  { id:'aquarius',  name:'Aquarius',  ru:'Водолей',    icon:'♒', dates:'20.01–18.02', color:'#4dd0e1', element:'Воздух', months:[0,1], stone:'Аквамарин', planet:'Уран', ruler:'Ганимед' },
  { id:'pisces',    name:'Pisces',    ru:'Рыбы',       icon:'♓', dates:'19.02–20.03', color:'#5dade2', element:'Вода', months:[1,2], stone:'Жемчуг', planet:'Нептун', ruler:'Посейдон' }
];

/* ═══════════════════ PROPHECY BANKS ═══════════════════ */
var OPENINGS = ['Звёзды сегодня шепчут о переменах','Хевсур видел знак в глиняных табличках','Древние камни Фарсиды заговорили','Ветер с Ацидалийского моря принёс весть','Красная пыль кружится в танце судьбы','Фобос замер над горизонтом','Деймос скрылся за облаком','Река Ксанф поёт древнюю песню','Тени в пещерах стали длиннее','Звёздное небо сегодня ярче обычного','Луна прошла через созвездие Хевсура','Пепел Тарсиса поднялся в воздух','Олимп укутан облаками предзнаменований','Ледники Эритрея треснули','Птицы летят на юг раньше срока'];
var MIDDLES = ['день подходит для изучения древних свитков','хорошее время для поиска новых знаний','твой путь лежит через неизведанные земли','память предков подскажет верное решение','лучше слушать, чем говорить','не бойся задавать вопросы','доверься интуиции — она ведёт к истине','встреча с мудрым человеком изменит взгляд','небольшое путешествие принесёт большую пользу','найди время для размышлений в тишине','твоё любопытство будет вознаграждено','удели внимание старым записям','новая статья откроет забытую истину','сделай первый шаг — остальное придёт','твоя идея найдёт отклик у других','заверши то, что начал давно'];
var WARNINGS = ['но берегись поспешных решений','однако не забывай о равновесии','но помни: слово имеет силу','и всё же не теряй бдительности','но помни о тех, кто рядом','однако помни о своём королевстве','но не забывай о прошлом','но следи за знаками судьбы','но не позволяй гордыне взять верх','и пусть терпение будет твоим щитом'];
var CLOSINGS = ['Lān sur — глина помнит, и ты помнишь.','Да ведёт тебя звезда Марса.','И да хранит тебя память предков.','Пусть глина сохранит твой путь.','Пусть звёзды осветят дорогу.','Помни: даже камень дышит.','Огонь горит для тех, кто смотрит.','Вода помнит всё, что было.','Пусть твой путь будет ясен.','Иди с миром, исследователь.','Пусть Ацидалийское море успокоит твой дух.','И глина, и вода — свидетели твои.'];

var FOCUS_AREAS = [
  { icon:'💼', name:'Карьера', tips:['Сосредоточься на текущих проектах','Начни новое дело','Доверься опыту','Возьми паузу для размышлений'] },
  { icon:'❤️', name:'Любовь', tips:['Откройся близкому человеку','Напиши тому, о ком думаешь','Проведи вечер вдвоём','Слушай больше, чем говоришь'] },
  { icon:'🌱', name:'Здоровье', tips:['Больше отдыхай','Прогулка на свежем воздухе','Пей воду','Дыши глубоко'] },
  { icon:'📚', name:'Знания', tips:['Открой старую книгу','Изучи что-то новое','Задай вопрос мудрецу','Записывай свои мысли'] },
  { icon:'💰', name:'Финансы', tips:['Отложи часть талантов','Не трать на лишнее','Вложи в знания','Составь план'] },
  { icon:'🧘', name:'Гармония', tips:['Медитируй на пламя','Слушай тишину','Прими то, что нельзя изменить','Отпусти прошлое'] }
];
var MOODS = ['Спокойствие','Вдохновение','Размышление','Действие','Мудрость','Смелость','Созерцание','Решимость'];
var COLORS = [
  { name:'Красный', hex:'#e74c3c' },{ name:'Синий', hex:'#3498db' },
  { name:'Золотой', hex:'#f5d76e' },{ name:'Серебряный', hex:'#bdc3c7' },
  { name:'Зелёный', hex:'#27ae60' },{ name:'Фиолетовый', hex:'#9b59b6' },
  { name:'Белый', hex:'#ecf0f1' },{ name:'Оранжевый', hex:'#e67e22' }
];
var LUCK_LEVELS = ['⭐','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐'];

/* ═══════════════════ STATE ═══════════════════ */
var state = {
  currentUser: null,
  profile: null,
  kingdom: KINGDOMS['Эдем'],
  mode: 'martian',
  activeSign: null,
  resultTab: 'today',
  history: [],
  cloudHistory: [],
  histTab: 'local',
  streak: 0,
  busy: false,
  initDone: false
};

function getSigns(){
  return state.mode === 'martian' ? MARTIAN_SIGNS : EARTH_SIGNS;
}

/* ═══════════════════ UTILS ═══════════════════ */
function esc(s){ return String(s||'').replace(/[&<>"']/g,function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }
function escAttr(s){ return String(s||'').replace(/['"\\<>]/g,function(m){ return {"'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e'}[m]; }); }
function hashCode(str){
  str = String(str||'');
  var h = 0;
  for (var i = 0; i < str.length; i++){
    h = ((h << 5) - h) + str.charCodeAt(i);
    h = h | 0;
  }
  return Math.abs(h) || 1;
}
function pick(arr, seed){
  if (!arr || !arr.length) return null;
  var idx = Math.abs(Math.floor(seed)) % arr.length;
  return arr[idx];
}
function safeGet(k, def){
  try { var v = localStorage.getItem(k); if (v === null) return def; try { return JSON.parse(v); } catch(e){ return v; } } catch(e){ return def; }
}
function safeSet(k, v){
  try { localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); } catch(e){}
}

function toast(msg, type){
  type = type || 'info';
  var old = document.querySelector('.hor-toast');
  if (old) old.remove();
  var t = document.createElement('div');
  t.className = 'hor-toast ' + type;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(function(){ t.classList.add('show'); });
  setTimeout(function(){
    t.classList.remove('show');
    t.classList.add('hide');
    setTimeout(function(){ t.remove(); }, 400);
  }, 2400);
}
function vibrate(p){ try { if (navigator.vibrate) navigator.vibrate(p); } catch(e){} }

/* ═══════════════════ AUDIO ═══════════════════ */
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
  var c = getCtx(); if (!c) return;
  try {
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.value = f;
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(vol || 0.08, c.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + dur);
  } catch(e){}
}
function sfxSign(){ note(880, 0.12, 'triangle', 0.07); }
function sfxSave(){ [523, 659, 783].forEach(function(f,i){ setTimeout(function(){ note(f, 0.15, 'sine', 0.08); }, i*60); }); }
function sfxCopy(){ note(1200, 0.08, 'sine', 0.06); }
function sfxMode(){ note(660, 0.1, 'sine', 0.06); }

/* ═══════════════════ PARTICLES ═══════════════════ */
function spawnParticles(x, y, color, count){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  count = count || 16;
  var wrap = document.getElementById('hor-particles');
  if (!wrap) return;
  for (var i = 0; i < count; i++){
    var p = document.createElement('div');
    p.className = 'hor-particle';
    var angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    var dist = 60 + Math.random() * 140;
    var size = 4 + Math.random() * 7;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = color;
    p.style.boxShadow = '0 0 14px ' + color;
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    wrap.appendChild(p);
    (function(el){ setTimeout(function(){ el.remove(); }, 1000); })(p);
  }
}

/* ═══════════════════ MARTIAN DATE ═══════════════════ */
function getMartianDate(){
  var months = ['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];
  var days = [31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];
  var MD = days.reduce(function(s,d){ return s + d; }, 0);
  var EY = 668.6;
  var now = new Date();
  var daysFrom = (now - new Date(2026, 0, 1)) / 86400000;
  var years = daysFrom / EY;
  var year = Math.floor(3798000000 + 2740 + years);
  var dayOfYear = Math.floor((daysFrom * (MD / EY)) % MD);
  if (dayOfYear < 0) dayOfYear += MD;
  var rem = dayOfYear, mi = 0;
  for (var i = 0; i < days.length; i++){
    if (rem < days[i]){ mi = i; break; }
    rem -= days[i];
  }
  return { year: year.toLocaleString(), month: months[mi], day: rem + 1, monthIndex: mi };
}

/* ═══════════════════ SIGN SELECTION ═══════════════════ */
function getSignForMartianMonth(mi){
  var found = MARTIAN_SIGNS.filter(function(s){ return s.months.indexOf(mi) !== -1; })[0];
  return found || MARTIAN_SIGNS[0];
}
function getSignForEarthDate(date){
  var m = date.getMonth();
  var found = EARTH_SIGNS.filter(function(s){ return s.months.indexOf(m) !== -1; })[0];
  return found || EARTH_SIGNS[0];
}

/* ═══════════════════ HOROSCOPE GENERATION ═══════════════════ */
function generateHoroscope(signId, dayKey){
  if (!signId) return '';
  var seed = hashCode(signId + '|' + dayKey + '|' + state.mode);
  var p1 = pick(OPENINGS, seed) || '';
  var p2 = pick(MIDDLES, seed >> 3) || '';
  var p3 = pick(WARNINGS, seed >> 6) || '';
  var p4 = pick(CLOSINGS, seed >> 9) || '';
  return p1 + ' — ' + p2 + ', ' + p3 + '. ' + p4;
}

function generateQualities(signId, dayKey){
  if (!signId) return { luck:'⭐', mood:'Спокойствие', color:COLORS[0], number:1, focus:FOCUS_AREAS[0], focusTip:'' };
  var seed = hashCode(signId + '|' + dayKey + '|q|' + state.mode);
  var focus = pick(FOCUS_AREAS, seed >> 5) || FOCUS_AREAS[0];
  return {
    luck: pick(LUCK_LEVELS, seed) || '⭐',
    mood: pick(MOODS, seed >> 2) || 'Спокойствие',
    color: pick(COLORS, seed >> 4) || COLORS[0],
    number: (seed % 22) + 1,
    focus: focus,
    focusTip: pick(focus.tips, seed >> 7) || ''
  };
}

/* ═══════════════════ FIXED: getCompatibility (был баг!) ═══════════════════ */
function getCompatibility(sign){
  if (!sign || !sign.id) return { good:null, warn:null, bad:null };
  var signs = getSigns();
  if (!signs || signs.length < 2) return { good:null, warn:null, bad:null };

  var pool = signs.filter(function(s){ return s && s.id !== sign.id; });
  var len = pool.length;
  if (!len) return { good:null, warn:null, bad:null };

  var seed = hashCode(sign.id + '|compat|' + state.mode);
  var iGood = seed % len;
  var iWarn = Math.floor(seed / 7) % len;
  if (iWarn === iGood) iWarn = (iWarn + 1) % len;
  var iBad = Math.floor(seed / 49) % len;
  if (iBad === iGood) iBad = (iBad + 1) % len;
  if (iBad === iWarn) iBad = (iBad + 1) % len;

  return {
    good: pool[iGood] || null,
    warn: pool[iWarn] || null,
    bad: pool[iBad] || null
  };
}

/* ═══════════════════ LOAD ═══════════════════ */
async function loadUser(){
  if (!sb) return;
  try {
    var s = await sb.auth.getSession();
    state.currentUser = s && s.data && s.data.session ? s.data.session.user : null;
    if (!state.currentUser) return;

    var pr = await sb.from('profiles').select('*').eq('user_id', state.currentUser.id).single();
    state.profile = pr && pr.data;

    if (state.profile && state.profile.kingdom && KINGDOMS[state.profile.kingdom]){
      state.kingdom = KINGDOMS[state.profile.kingdom];
    }

    if (state.profile && state.profile.zodiac_sign){
      var foundMode = state.profile.zodiac_mode || 'martian';
      var pool = foundMode === 'earth' ? EARTH_SIGNS : MARTIAN_SIGNS;
      var found = pool.filter(function(s){ return s.id === state.profile.zodiac_sign; })[0];
      if (found){
        state.mode = foundMode;
        state.activeSign = found;
      }
    }
    state.streak = state.profile.horoscope_streak || 0;
    await loadCloud();
  } catch(e){ console.warn('[hor] loadUser:', e.message); }
}

async function loadCloud(){
  if (!state.currentUser || !sb) return;
  try {
    var r = await sb.from('horoscope_history').select('*').eq('user_id', state.currentUser.id).order('saved_at', {ascending:false}).limit(20);
    state.cloudHistory = (r && r.data) || [];
  } catch(e){}
}

function loadLocal(){
  var h = safeGet('hor_history', []);
  state.history = Array.isArray(h) ? h : [];
}

/* ═══════════════════ ACTIONS ═══════════════════ */
async function saveToCloud(sign, text){
  if (!state.currentUser || !sb){ toast('Войдите, чтобы сохранять', 'warning'); return false; }
  try {
    var dayKey = new Date().toISOString().slice(0, 10);
    var r = await sb.from('horoscope_history').upsert({
      user_id: state.currentUser.id,
      sign: sign.id,
      horoscope_text: text,
      day_key: dayKey,
      mode: state.mode,
      saved_at: new Date().toISOString()
    }, { onConflict: 'user_id,day_key,sign,mode' });

    if (r.error){
      if (r.error.code === '23505'){ toast('Уже сохранено сегодня', 'info'); return false; }
      toast('Ошибка: ' + r.error.message, 'error');
      return false;
    }
    // Обновление стрика
    try {
      var lastDay = state.profile && state.profile.horoscope_last_day;
      var today = dayKey;
      var newStreak = state.streak;
      if (lastDay !== today){
        var yest = new Date(); yest.setDate(yest.getDate() - 1);
        var yKey = yest.toISOString().slice(0,10);
        newStreak = (lastDay === yKey) ? state.streak + 1 : 1;
        await sb.from('profiles').update({
          horoscope_streak: newStreak, horoscope_last_day: today
        }).eq('user_id', state.currentUser.id);
        state.streak = newStreak;
        if (state.profile){
          state.profile.horoscope_streak = newStreak;
          state.profile.horoscope_last_day = today;
        }
      }
    } catch(e){}
    await loadCloud();
    toast('💾 Сохранено! Стрик: ' + state.streak, 'success');
    sfxSave();
    vibrate(20);
    return true;
  } catch(e){ toast('Ошибка сохранения', 'error'); return false; }
}

function saveToLocal(sign, text){
  var dayKey = new Date().toISOString().slice(0,10);
  var list = (state.history || []).filter(function(h){
    return !(h.sign === sign.id && h.dayKey === dayKey);
  });
  list.unshift({ ts: Date.now(), dayKey: dayKey, sign: sign.id, mode: state.mode, text: text });
  list = list.slice(0, 15);
  safeSet('hor_history', list);
  state.history = list;
}

async function saveFavorite(sign){
  if (!state.currentUser || !sb){ toast('Войдите, чтобы сохранить любимый знак', 'warning'); return; }
  try {
    await sb.from('profiles').update({ zodiac_sign: sign.id, zodiac_mode: state.mode }).eq('user_id', state.currentUser.id);
    if (state.profile){
      state.profile.zodiac_sign = sign.id;
      state.profile.zodiac_mode = state.mode;
    }
    toast('⭐ ' + sign.icon + ' ' + sign.ru + ' — теперь ваш знак', 'success');
    vibrate(20);
    sfxSave();
  } catch(e){ toast('Ошибка сохранения', 'error'); }
}

function copyText(text){
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){
      toast('📋 Скопировано', 'success'); sfxCopy(); vibrate(15);
    }, function(){ fallbackCopy(text); });
  } else fallbackCopy(text);
}
function fallbackCopy(text){
  try {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    toast('📋 Скопировано', 'success');
  } catch(e){ toast('Не удалось', 'error'); }
}

function shareText(sign, text){
  var url = location.origin + location.pathname + '?sign=' + sign.id + '&mode=' + state.mode;
  if (navigator.share){
    navigator.share({ title: '🔮 Гороскоп · ' + sign.ru, text: text, url: url }).catch(function(){});
  } else copyText(text + '\n\n' + url);
}

/* ═══════════════════ THEME ═══════════════════ */
function applyTheme(){
  var k = state.kingdom || KINGDOMS['Эдем'];
  var root = document.documentElement;
  root.style.setProperty('--hor-k', k.color);
  root.style.setProperty('--hor-k-light', k.light);
  root.style.setProperty('--hor-k-bg', k.bg);
  root.style.setProperty('--hor-k-shadow', k.color + '40');
}

/* ═══════════════════ RENDER ═══════════════════ */
function render(){
  if (!container) return;
  try {
    applyTheme();
    var martian = getMartianDate();
    var signs = getSigns();

    // Fallback: если activeSign не установлен или не из текущего пула
    if (!state.activeSign || !signs.some(function(s){ return s && s.id === state.activeSign.id; })){
      state.activeSign = state.mode === 'martian'
        ? getSignForMartianMonth(martian.monthIndex)
        : getSignForEarthDate(new Date());
    }

    var sign = state.activeSign;
    if (!sign){ showError('Не удалось определить знак'); return; }

    var dayKey = new Date().toISOString().slice(0,10);
    var horoscopeText = generateHoroscope(sign.id, dayKey);
    var qualities = generateQualities(sign.id, dayKey);
    var compat = getCompatibility(sign);
    var nativeSign = state.mode === 'martian'
      ? getSignForMartianMonth(martian.monthIndex)
      : getSignForEarthDate(new Date());

    container.innerHTML =
      renderHero(martian) +
      renderModeTabs() +
      renderSignsGrid(signs, sign) +
      renderResult(sign, horoscopeText, qualities, compat, nativeSign) +
      renderWeek(sign, dayKey) +
      renderCompatibility(compat) +
      renderHistory() +
      '<button class="hor-scroll-top" id="hor-scroll-top" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">↑</button>' +
      '<div class="hor-particles" id="hor-particles"></div>';

    bindScrollTop();
  } catch(e){
    console.error('[hor] render error:', e);
    showError('Ошибка отображения: ' + e.message);
  }
}

function showError(msg){
  if (!container) return;
  container.innerHTML =
    '<div class="hor-error-card">' +
      '<div style="font-size:3rem;margin-bottom:14px;">🔮</div>' +
      '<h2>Ой, звёзды затуманились</h2>' +
      '<p>' + esc(msg || 'Что-то пошло не так. Попробуй ещё раз.') + '</p>' +
      '<button onclick="location.reload()">Попробовать снова</button>' +
    '</div>';
}

function renderHero(martian){
  var starsHtml = '';
  for (var i = 0; i < 10; i++) starsHtml += '<div class="hor-star"></div>';
  var dateLine = state.mode === 'martian'
    ? '✨ ' + esc(martian.month) + ' · ' + martian.day + '-й день · Год ' + esc(martian.year) + ' Э.О.'
    : '✨ ' + new Date().toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' });

  return '<div class="hor-hero hor-fade">' +
    '<div class="hor-hero-stars">' + starsHtml + '</div>' +
    '<div class="hor-hero-wheel">' + renderZodiacWheel() + '</div>' +
    '<div class="hor-hero-content">' +
      '<div class="hor-hero-icon">🔮</div>' +
      '<h1 class="hor-hero-title">Марсианский гороскоп</h1>' +
      '<p class="hor-hero-sub">Прочитай знаки звёзд — узнай свою судьбу</p>' +
      '<div>' +
        '<div class="hor-date-badge">' + dateLine + '</div>' +
        (state.streak > 0 ? '<div class="hor-streak">🔥 Стрик: ' + state.streak + ' дн.</div>' : '') +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderZodiacWheel(){
  var signs = getSigns();
  var size = 400;
  var cx = size / 2, cy = size / 2;
  var r1 = 160, r2 = 195;
  var parts = [];
  var n = signs.length || 1;
  for (var i = 0; i < n; i++){
    var a1 = (Math.PI * 2 * i) / n - Math.PI / 2;
    var a2 = (Math.PI * 2 * (i + 1)) / n - Math.PI / 2;
    var x1 = (cx + Math.cos(a1) * r2).toFixed(1), y1 = (cy + Math.sin(a1) * r2).toFixed(1);
    var x2 = (cx + Math.cos(a2) * r2).toFixed(1), y2 = (cy + Math.sin(a2) * r2).toFixed(1);
    var x3 = (cx + Math.cos(a2) * r1).toFixed(1), y3 = (cy + Math.sin(a2) * r1).toFixed(1);
    var x4 = (cx + Math.cos(a1) * r1).toFixed(1), y4 = (cy + Math.sin(a1) * r1).toFixed(1);
    var color = signs[i].color || '#6C63FF';
    parts.push('<path d="M' + x1 + ',' + y1 + ' L' + x2 + ',' + y2 + ' L' + x3 + ',' + y3 + ' L' + x4 + ',' + y4 + ' Z" fill="' + color + '" stroke="rgba(255,255,255,.4)" stroke-width="1"/>');
    var am = (a1 + a2) / 2;
    var tx = (cx + Math.cos(am) * (r1 + 18)).toFixed(1);
    var ty = (cy + Math.sin(am) * (r1 + 18)).toFixed(1);
    parts.push('<text x="' + tx + '" y="' + ty + '" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="middle">' + signs[i].icon + '</text>');
  }
  return '<svg viewBox="0 0 ' + size + ' ' + size + '">' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="205" fill="none" stroke="rgba(162,155,254,.4)" stroke-width="1" stroke-dasharray="3,5"/>' +
    parts.join('') +
    '<circle cx="' + cx + '" cy="' + cy + '" r="130" fill="none" stroke="rgba(162,155,254,.5)" stroke-width="1"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="120" fill="rgba(162,155,254,.06)"/>' +
  '</svg>';
}

function renderModeTabs(){
  return '<div class="hor-mode-tabs hor-fade" style="animation-delay:.1s;">' +
    '<button class="hor-mode-tab ' + (state.mode === 'martian' ? 'active' : '') + '" onclick="horMode(\'martian\')">🔴 Марсианский (8)</button>' +
    '<button class="hor-mode-tab ' + (state.mode === 'earth' ? 'active' : '') + '" onclick="horMode(\'earth\')">🌍 Земной (12)</button>' +
  '</div>';
}

function renderSignsGrid(signs, active){
  var title = state.mode === 'martian' ? '🌌 Знаки Марсианского зодиака' : '🌍 Знаки Земного зодиака';
  return '<h3 class="hor-signs-title hor-fade">' + title +
    '<span class="hor-title-count">' + signs.length + '</span></h3>' +
    '<div class="hor-signs-grid hor-fade" style="animation-delay:.15s;">' +
    signs.map(function(s){
      var isActive = active && s.id === active.id;
      var isFav = state.profile && state.profile.zodiac_sign === s.id && state.profile.zodiac_mode === state.mode;
      return '<button class="hor-sign ' + (isActive ? 'active' : '') + '" ' +
        'style="--sign-color: ' + s.color + ';" ' +
        'onclick="horSelectSign(\'' + escAttr(s.id) + '\')">' +
        (isFav ? '<span class="hor-sign-fav">⭐</span>' : '') +
        '<span class="hor-sign-icon">' + s.icon + '</span>' +
        '<div class="hor-sign-name">' + esc(s.ru) + '</div>' +
        '<div class="hor-sign-dates">' + esc(s.dates) + '</div>' +
      '</button>';
    }).join('') +
  '</div>';
}

function renderResult(sign, text, qualities, compat, nativeSign){
  var isNative = nativeSign && sign.id === nativeSign.id;
  var isFav = state.profile && state.profile.zodiac_sign === sign.id && state.profile.zodiac_mode === state.mode;
  var martian = getMartianDate();

  return '<div class="hor-result">' +
    '<div class="hor-result-head">' +
      '<div class="hor-result-icon" style="color:' + sign.color + '">' + sign.icon + '</div>' +
      '<div class="hor-result-info">' +
        '<h3 class="hor-result-sign">' + esc(sign.name) + ' · ' + esc(sign.ru) + '</h3>' +
        '<div class="hor-result-sub">' +
          '<span class="hor-badge element">✨ ' + esc(sign.element) + '</span>' +
          '<span class="hor-badge element">🪐 ' + esc(sign.planet) + '</span>' +
          '<span class="hor-badge element">💎 ' + esc(sign.stone) + '</span>' +
          (isNative ? '<span class="hor-badge native">★ Ваш знак</span>' : '') +
          (isFav ? '<span class="hor-badge fav">⭐ Любимый</span>' : '') +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="hor-result-tabs">' +
      '<button class="hor-result-tab ' + (state.resultTab === 'today' ? 'active' : '') + '" onclick="horResultTab(\'today\')">☀️ Сегодня</button>' +
      '<button class="hor-result-tab ' + (state.resultTab === 'focus' ? 'active' : '') + '" onclick="horResultTab(\'focus\')">🎯 Фокус</button>' +
      '<button class="hor-result-tab ' + (state.resultTab === 'details' ? 'active' : '') + '" onclick="horResultTab(\'details\')">📖 Детали</button>' +
    '</div>' +
    '<div class="hor-result-body">' +
      (state.resultTab === 'today' ? renderTodayTab(text) : '') +
      (state.resultTab === 'focus' ? renderFocusTab(qualities) : '') +
      (state.resultTab === 'details' ? renderDetailsTab(sign, qualities, martian) : '') +
      '<div class="hor-result-actions">' +
        '<button class="hor-btn" onclick="horCopyResult()">📋 Скопировать</button>' +
        '<button class="hor-btn outline" onclick="horShare()">🔗 Поделиться</button>' +
        '<button class="hor-btn outline" onclick="horSaveFavorite()">⭐ ' + (isFav ? 'Уже любимый' : 'Любимый') + '</button>' +
        (state.currentUser
          ? '<button class="hor-btn success" onclick="horSaveCloud()">💾 В профиль</button>'
          : '<a href="/login/" class="hor-btn outline">🔐 Войти</a>') +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderTodayTab(text){
  return '<div class="hor-result-text">' + esc(text) + '</div>';
}

function renderFocusTab(q){
  if (!q || !q.focus) return '';
  return '<div class="hor-qualities">' +
    qualityBlock('🍀', 'Удача', q.luck, 'luck') +
    qualityBlock('🎭', 'Настроение', q.mood) +
    qualityBlock('🎨', 'Цвет дня', q.color.name) +
    qualityBlock('🔢', 'Число', q.number) +
    qualityBlock(q.focus.icon, q.focus.name, 'Совет дня') +
  '</div>' +
  '<div style="padding:14px 18px;border-radius:14px;background:linear-gradient(135deg,rgba(108,99,255,.08),rgba(162,155,254,.04));border-left:4px solid var(--hor-k);">' +
    '<div style="font-size:.72rem;color:#888;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">' +
      q.focus.icon + ' ' + esc(q.focus.name) +
    '</div>' +
    '<div style="font-size:1rem;color:#333;font-style:italic;line-height:1.6;">«' + esc(q.focusTip) + '»</div>' +
  '</div>';
}

function renderDetailsTab(sign, q, martian){
  return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-bottom:16px;">' +
    detailRow('🌟', 'Знак', sign.name + ' · ' + sign.ru) +
    detailRow('✨', 'Стихия', sign.element) +
    detailRow('🪐', 'Планета', sign.planet) +
    detailRow('💎', 'Камень', sign.stone) +
    detailRow('👑', 'Покровитель', sign.ruler) +
    detailRow('🎨', 'Цвет дня', q.color.name) +
    detailRow('🔢', 'Число дня', String(q.number)) +
    detailRow('📅', 'Марсианская дата', martian.day + '-й день ' + martian.month) +
  '</div>';
}

function detailRow(icon, label, value){
  return '<div style="padding:12px 14px;background:rgba(0,0,0,.02);border:1.5px solid rgba(0,0,0,.05);border-radius:12px;display:flex;gap:10px;align-items:center;">' +
    '<div style="font-size:1.4rem;">' + icon + '</div>' +
    '<div style="min-width:0;">' +
      '<div style="font-size:.65rem;color:#888;text-transform:uppercase;letter-spacing:.8px;font-weight:800;">' + esc(label) + '</div>' +
      '<div style="font-size:.88rem;font-weight:800;color:#1a1a1a;margin-top:2px;">' + esc(value) + '</div>' +
    '</div>' +
  '</div>';
}

function qualityBlock(icon, label, value, cls){
  return '<div class="hor-quality">' +
    '<span class="hor-quality-icon">' + icon + '</span>' +
    '<div class="hor-quality-label">' + esc(label) + '</div>' +
    '<div class="hor-quality-value ' + (cls || '') + '">' + esc(value) + '</div>' +
  '</div>';
}

function renderWeek(sign, dayKey){
  var days = [];
  var names = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
  for (var i = 0; i < 7; i++){
    var d = new Date();
    d.setDate(d.getDate() + i);
    var dKey = d.toISOString().slice(0,10);
    var seed = hashCode(sign.id + '|' + dKey + '|' + state.mode);
    var icons = ['✨','🌟','⭐','💫','🌠','☄️','🌙','🪐','☀️','🌊'];
    var icon = icons[seed % icons.length];
    var barWidth = 30 + (seed % 70);
    days.push({
      date: d,
      name: names[d.getDay()],
      isToday: i === 0,
      icon: icon,
      barWidth: barWidth,
      tip: generateHoroscope(sign.id, dKey).substring(0, 100) + '...'
    });
  }
  return '<h3 class="hor-section-title hor-fade">📅 Прогноз на неделю' +
    '<span class="hor-section-sub">' + esc(sign.ru) + '</span>' +
  '</h3>' +
  '<div class="hor-week hor-fade" style="animation-delay:.2s;">' +
    days.map(function(d){
      return '<div class="hor-day ' + (d.isToday ? 'today' : '') + '" title="' + escAttr(d.tip) + '">' +
        '<div class="hor-day-name">' + d.name + '</div>' +
        '<div class="hor-day-icon">' + d.icon + '</div>' +
        '<div class="hor-day-num">' + d.date.getDate() + '</div>' +
        '<div class="hor-day-bar" style="width:' + d.barWidth + '%"></div>' +
      '</div>';
    }).join('') +
  '</div>';
}

function renderCompatibility(compat){
  if (!compat || !compat.good || !compat.warn || !compat.bad) return '';
  return '<h3 class="hor-section-title hor-fade">💫 Совместимость' +
    '<span class="hor-section-sub">' + esc(state.activeSign.ru) + '</span>' +
  '</h3>' +
  '<div class="hor-compat hor-fade" style="animation-delay:.25s;">' +
    compatCard('good', '💚', 'Лучший союз', compat.good) +
    compatCard('warn', '💛', 'Нейтрально', compat.warn) +
    compatCard('bad', '❤️‍🔥', 'Осторожно', compat.bad) +
  '</div>';
}

function compatCard(cls, emoji, label, sign){
  if (!sign) return '';
  return '<div class="hor-compat-card ' + cls + '">' +
    '<div class="hor-compat-label">' + label + '</div>' +
    '<div class="hor-compat-icon">' + sign.icon + '</div>' +
    '<div class="hor-compat-name">' + esc(sign.ru) + '</div>' +
    '<div class="hor-compat-desc">' + emoji + ' ' + esc(sign.element) + '</div>' +
  '</div>';
}

function renderHistory(){
  var list = state.histTab === 'cloud' ? state.cloudHistory : state.history;
  list = Array.isArray(list) ? list : [];
  var count = list.length;

  return '<h3 class="hor-section-title hor-fade">📖 История гороскопов</h3>' +
  '<div class="hor-history-head">' +
    '<div class="hor-history-tabs">' +
      '<button class="hor-htab ' + (state.histTab === 'local' ? 'active' : '') + '" onclick="horHistTab(\'local\')">💻 Локальные</button>' +
      '<button class="hor-htab ' + (state.histTab === 'cloud' ? 'active' : '') + '" onclick="horHistTab(\'cloud\')" ' +
        (state.currentUser ? '' : 'style="display:none;"') + '>☁️ Профиль</button>' +
    '</div>' +
    (count > 0 ? '<button class="hor-history-clear" onclick="horClearHistory()">Очистить</button>' : '') +
  '</div>' +
  (count === 0
    ? '<div class="hor-empty"><div class="hor-empty-icon">📭</div><div class="hor-empty-title">' +
        (state.histTab === 'cloud' ? 'Пока нет сохранённых гороскопов' : 'Локальных записей нет') +
      '</div></div>'
    : '<div class="hor-history-list">' + list.map(renderHistoryItem).join('') + '</div>');
}

function renderHistoryItem(h, i){
  if (!h) return '';
  var signId = h.sign;
  var sign = getSigns().filter(function(s){ return s.id === signId; })[0]
    || MARTIAN_SIGNS.filter(function(s){ return s.id === signId; })[0]
    || EARTH_SIGNS.filter(function(s){ return s.id === signId; })[0]
    || getSigns()[0];
  if (!sign) return '';
  var date, text;
  if (state.histTab === 'cloud'){
    date = new Date(h.saved_at).toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' });
    text = h.horoscope_text;
  } else {
    date = new Date(h.ts).toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' });
    text = h.text;
  }
  return '<div class="hor-history-item" style="animation-delay:' + Math.min((i||0) * .05, .4) + 's;" onclick="horSelectSign(\'' + escAttr(sign.id) + '\')">' +
    '<div class="hor-history-icon">' + sign.icon + '</div>' +
    '<div class="hor-history-body">' +
      '<div class="hor-history-date">📅 ' + esc(date) + '</div>' +
      '<div class="hor-history-text">' + esc(text || '') + '</div>' +
    '</div>' +
    '<div class="hor-history-sign">' + esc(sign.ru) + '</div>' +
    (state.histTab === 'cloud'
      ? '<button class="hor-history-del" onclick="horDeleteHistory(\'' + escAttr(h.id) + '\', event)">✕</button>'
      : '') +
  '</div>';
}

function bindScrollTop(){
  var btn = document.getElementById('hor-scroll-top');
  if (!btn) return;
  function check(){
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  }
  window.removeEventListener('scroll', check);
  window.addEventListener('scroll', check, {passive:true});
  check();
}

/* ═══════════════════ EXPORT ═══════════════════ */
window.horSelectSign = function(id){
  var sign = getSigns().filter(function(s){ return s.id === id; })[0];
  if (!sign) return;
  state.activeSign = sign;
  state.resultTab = 'today';
  sfxSign();
  try {
    var el = window.event && window.event.currentTarget ? window.event.currentTarget : null;
    if (el){
      var r = el.getBoundingClientRect();
      spawnParticles(r.left + r.width/2, r.top + r.height/2, sign.color, 14);
    }
  } catch(e){}
  render();
};

window.horMode = function(mode){
  if (state.mode === mode) return;
  state.mode = mode;
  state.activeSign = null;
  state.resultTab = 'today';
  sfxMode();
  render();
};

window.horResultTab = function(tab){
  state.resultTab = tab;
  render();
};

window.horHistTab = function(tab){
  state.histTab = tab;
  render();
};

window.horCopyResult = function(){
  if (!state.activeSign) return;
  var text = generateHoroscope(state.activeSign.id, new Date().toISOString().slice(0,10));
  copyText('🔮 ' + state.activeSign.icon + ' ' + state.activeSign.ru + '\n\n' + text);
};

window.horShare = function(){
  if (!state.activeSign) return;
  var text = generateHoroscope(state.activeSign.id, new Date().toISOString().slice(0,10));
  shareText(state.activeSign, text);
};

window.horSaveFavorite = function(){
  if (!state.activeSign) return;
  saveFavorite(state.activeSign);
};

window.horSaveCloud = async function(){
  if (!state.activeSign) return;
  var text = generateHoroscope(state.activeSign.id, new Date().toISOString().slice(0,10));
  var ok = await saveToCloud(state.activeSign, text);
  if (ok){ saveToLocal(state.activeSign, text); render(); }
};

window.horDeleteHistory = async function(id, ev){
  if (ev) ev.stopPropagation();
  if (!confirm('Удалить запись?')) return;
  try {
    await sb.from('horoscope_history').delete().eq('id', id).eq('user_id', state.currentUser.id);
    await loadCloud();
    toast('🗑️ Удалено', 'info');
    render();
  } catch(e){ toast('Ошибка', 'error'); }
};

window.horClearHistory = async function(){
  if (state.histTab === 'cloud'){
    if (!confirm('Удалить все гороскопы из профиля?')) return;
    try {
      await sb.from('horoscope_history').delete().eq('user_id', state.currentUser.id);
      await loadCloud();
      toast('Очищено', 'info');
      render();
    } catch(e){}
  } else {
    if (!confirm('Очистить локальную историю?')) return;
    safeSet('hor_history', []);
    state.history = [];
    toast('Очищено', 'info');
    render();
  }
};

/* ═══════════════════ URL PARAMS ═══════════════════ */
function loadFromURL(){
  try {
    var p = new URLSearchParams(location.search);
    var s = p.get('sign');
    var m = p.get('mode');
    if (m === 'earth' || m === 'martian') state.mode = m;
    if (s){
      var pool = state.mode === 'martian' ? MARTIAN_SIGNS : EARTH_SIGNS;
      var found = pool.filter(function(x){ return x.id === s; })[0];
      if (found) state.activeSign = found;
    }
  } catch(e){}
}

/* ═══════════════════ INIT ═══════════════════ */
async function init(){
  try {
    unlock();
    loadLocal();
    // Первый рендер — сразу, чтобы не было «бесконечной загрузки»
    render();
    // Потом загрузка юзера (асинхронно)
    loadUser().then(function(){
      loadFromURL();
      render();
    }).catch(function(e){
      console.warn('[hor] user load error:', e.message);
    });
    console.log('🔮 Гороскоп v3 Production готов');
  } catch(e){
    console.error('[hor] init error:', e);
    showError('Не удалось запустить: ' + e.message);
  }
}

var container = document.getElementById('hor-app');

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
})();
</script>
