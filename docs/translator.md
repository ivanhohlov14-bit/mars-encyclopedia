---
title: Марсианский переводчик
---

<style>
/* ═══════════════════════════════════════════════════════════
   ROOT + ANIMATIONS
   ═══════════════════════════════════════════════════════════ */
:root{
  --t-k:#6C63FF;
  --t-k-light:#A29BFE;
  --t-k-shadow:rgba(108,99,255,.35);
  --t-dark:#1a1a2e;
  --t-darker:#0f0f1e;
  --t-accent:#f5d76e;
  --t-success:#27ae60;
  --t-error:#e74c3c;
}
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

/* ═══════════════════════════════════════════════════════════
   CONTAINER
   ═══════════════════════════════════════════════════════════ */
#translator-app{
  max-width:1040px;margin:0 auto;
  font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
  padding:0 8px 60px;
  position:relative;
  -webkit-tap-highlight-color:transparent;
}
#translator-app a{text-decoration:none!important;border-bottom:none!important}
#translator-app *{box-sizing:border-box}

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
.t-hero{
  position:relative;
  background:linear-gradient(135deg,#0f0f1e 0%,#1a1a2e 40%,#2d1b3d 70%,#0f3460 100%);
  border-radius:24px;
  padding:44px 32px 38px;
  color:#fff;margin-bottom:20px;
  overflow:hidden;text-align:center;
  box-shadow:0 24px 80px -16px rgba(0,0,0,.6),0 0 80px rgba(108,99,255,.15) inset;
}
.t-hero-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.t-star{
  position:absolute;width:2px;height:2px;
  background:#fff;border-radius:50%;
  box-shadow:0 0 6px #fff;
  animation:tStar 3s ease-in-out infinite;
}
.t-star:nth-child(1){top:12%;left:8%;animation-delay:0s}
.t-star:nth-child(2){top:22%;left:22%;animation-delay:.5s;width:1.5px;height:1.5px}
.t-star:nth-child(3){top:70%;left:15%;animation-delay:1s}
.t-star:nth-child(4){top:35%;left:78%;animation-delay:1.5s}
.t-star:nth-child(5){top:80%;left:88%;animation-delay:.7s;width:1.5px;height:1.5px}
.t-star:nth-child(6){top:22%;left:60%;animation-delay:1.2s}
.t-star:nth-child(7){top:55%;left:45%;animation-delay:.3s}
.t-star:nth-child(8){top:45%;left:92%;animation-delay:1.7s}
.t-hero::before{
  content:'';position:absolute;top:-50%;right:-20%;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(162,155,254,.25),transparent 70%);
  animation:tFloat 10s ease-in-out infinite;pointer-events:none;
}
.t-hero::after{
  content:'';position:absolute;bottom:-40%;left:-15%;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(243,156,18,.15),transparent 70%);
  animation:tFloat 12s ease-in-out infinite reverse;pointer-events:none;
}
.t-hero-content{position:relative;z-index:3;max-width:680px;margin:0 auto}
.t-hero-icon{
  display:inline-block;font-size:4rem;margin-bottom:12px;
  animation:tFloat 4s ease-in-out infinite;
  filter:drop-shadow(0 8px 32px rgba(162,155,254,.7));
  line-height:1;
}
.t-hero-title{
  font-size:2.1rem;font-weight:900;
  margin:0 0 10px;letter-spacing:-.5px;
  background:linear-gradient(90deg,#fff 0%,#A29BFE 25%,#fff 50%,#A29BFE 75%,#fff 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
  animation:tShine 6s linear infinite;
}
.t-hero-sub{font-size:1rem;opacity:.88;margin:0 0 22px;line-height:1.65}
.t-hero-badges{display:flex;justify-content:center;gap:8px;flex-wrap:wrap}
.t-badge{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 14px;border-radius:30px;
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.18);
  font-size:.78rem;font-weight:700;color:#fff;
}

/* ═══════════════════════════════════════════════════════════
   CARD
   ═══════════════════════════════════════════════════════════ */
.t-card{
  position:relative;background:#fff;border-radius:24px;
  margin-bottom:20px;overflow:hidden;
  box-shadow:0 24px 60px -16px var(--t-k-shadow),
             0 0 0 1px rgba(108,99,255,.08);
  animation:tRiseUp .6s cubic-bezier(.16,1,.3,1) .15s both;
}
.t-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,var(--t-k),var(--t-k-light),var(--t-accent),var(--t-k));
  background-size:200% auto;
  animation:tShine 4s linear infinite;z-index:2;
}

/* ═══════════════════════════════════════════════════════════
   HEADER ROW
   ═══════════════════════════════════════════════════════════ */
.t-head{
  display:flex;align-items:center;gap:12px;
  padding:20px 24px 16px;
  background:linear-gradient(135deg,rgba(108,99,255,.05),rgba(162,155,254,.02));
  border-bottom:1px solid rgba(0,0,0,.05);
}
.t-head-icon{
  width:42px;height:42px;border-radius:12px;
  background:linear-gradient(135deg,var(--t-k),var(--t-k-light));
  color:#fff;display:flex;align-items:center;justify-content:center;
  font-size:1.2rem;flex-shrink:0;
  box-shadow:0 4px 16px -2px var(--t-k-shadow);
  animation:tGlow 3s ease-in-out infinite;
}
.t-head-info{flex:1;min-width:0}
.t-head-title{font-size:1rem;font-weight:900;color:#1a1a2e;margin:0 0 2px}
.t-head-sub{font-size:.78rem;color:#888;font-weight:600}
.t-head-badge{
  padding:5px 12px;border-radius:12px;
  background:rgba(39,174,96,.12);color:var(--t-success);
  font-size:.7rem;font-weight:800;
  display:inline-flex;align-items:center;gap:4px;flex-shrink:0;
}
.t-head-badge::before{
  content:'';width:6px;height:6px;border-radius:50%;
  background:var(--t-success);box-shadow:0 0 8px var(--t-success);
  animation:tPulse 2s ease-in-out infinite;
}

/* ═══════════════════════════════════════════════════════════
   HINT BLOCK
   ═══════════════════════════════════════════════════════════ */
.t-hint{
  margin:16px 24px 0;
  padding:14px 18px;
  background:linear-gradient(135deg,rgba(108,99,255,.08),rgba(162,155,254,.04));
  border-left:4px solid var(--t-k);
  border-radius:10px;
  font-size:.85rem;line-height:1.65;color:#444;
}
.t-hint strong{color:var(--t-k);font-weight:800}
.t-hint kbd{
  display:inline-block;padding:2px 8px;
  background:rgba(108,99,255,.12);
  border:1px solid rgba(108,99,255,.3);
  border-radius:5px;font-family:'SF Mono',Consolas,monospace;
  font-size:.72rem;color:var(--t-k);font-weight:700;
}

/* ═══════════════════════════════════════════════════════════
   INPUT AREA
   ═══════════════════════════════════════════════════════════ */
.t-input-wrap{position:relative;padding:16px 24px 8px}
.t-lang-tag{
  position:absolute;top:22px;left:36px;
  padding:3px 10px;border-radius:12px;
  font-size:.65rem;font-weight:800;letter-spacing:.5px;
  background:rgba(108,99,255,.12);color:var(--t-k);
  display:inline-flex;align-items:center;gap:4px;
  pointer-events:none;z-index:2;
}
.t-lang-tag.detected-en{background:rgba(52,152,219,.15);color:#2980b9}
.t-lang-tag.detected-ru{background:rgba(231,76,60,.15);color:#c0392b}

#t-input{
  width:100%;height:140px;
  padding:34px 18px 14px;
  border:2px solid #e8eaf0;
  border-radius:14px;
  font-size:1rem;font-family:inherit;
  resize:vertical;outline:none;
  background:#f8f9fb;color:#1a1a2e;
  transition:border-color .25s,box-shadow .25s,background .25s;
  line-height:1.55;
}
#t-input::placeholder{color:#a0a4b0}
#t-input:focus{
  border-color:var(--t-k);background:#fff;
  box-shadow:0 0 0 4px rgba(108,99,255,.12);
}
.t-input-meta{
  display:flex;justify-content:space-between;
  align-items:center;padding:6px 4px 0;
  font-size:.72rem;color:#999;font-weight:600;
}
.t-input-meta .t-counter.warn{color:#e67e22}
.t-input-meta .t-counter.danger{color:#e74c3c}

/* ═══════════════════════════════════════════════════════════
   EXAMPLES
   ═══════════════════════════════════════════════════════════ */
.t-examples{
  padding:0 24px 12px;
  display:flex;gap:6px;flex-wrap:wrap;align-items:center;
}
.t-examples-label{
  font-size:.72rem;color:#888;font-weight:800;
  text-transform:uppercase;letter-spacing:.5px;
  margin-right:4px;
}
.t-example{
  padding:6px 12px;border-radius:20px;
  background:rgba(108,99,255,.06);
  border:1px solid rgba(108,99,255,.15);
  color:var(--t-k);font-size:.75rem;font-weight:700;
  cursor:pointer;font-family:inherit;
  transition:all .25s;
}
.t-example:hover{
  background:var(--t-k);color:#fff;
  transform:translateY(-1px);
}

/* ═══════════════════════════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════════════════════════ */
.t-buttons{
  padding:8px 24px 20px;
  display:flex;gap:10px;flex-wrap:wrap;
}
.t-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:14px 24px;border-radius:14px;border:none;
  font-size:.92rem;font-weight:800;cursor:pointer;
  font-family:inherit;transition:all .25s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
  -webkit-tap-highlight-color:transparent;
}
.t-btn.primary{
  flex:1;min-width:180px;
  background:linear-gradient(135deg,var(--t-k),var(--t-k-light));
  color:#fff;
  box-shadow:0 12px 32px -6px var(--t-k-shadow);
}
.t-btn.primary::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
  transform:translateX(-100%);transition:transform .6s;
}
.t-btn.primary:hover{
  transform:translateY(-2px);
  box-shadow:0 16px 40px -6px var(--t-k-shadow);
}
.t-btn.primary:hover::before{transform:translateX(100%)}
.t-btn.primary:active{transform:translateY(0) scale(.98)}
.t-btn.secondary{
  background:rgba(0,0,0,.05);color:#666;
}
.t-btn.secondary:hover{background:rgba(0,0,0,.08);color:#333}
.t-btn.accent{
  background:linear-gradient(135deg,#e67e22,#f39c12);
  color:#fff;
  box-shadow:0 8px 20px -4px rgba(230,126,34,.4);
}
.t-btn.accent:hover{transform:translateY(-2px)}
.t-btn:disabled{opacity:.6;cursor:wait;transform:none!important}

.t-spinner{
  width:16px;height:16px;border:2px solid rgba(255,255,255,.3);
  border-top-color:#fff;border-radius:50%;
  animation:tSpin .6s linear infinite;display:none;
}
.t-btn.loading .t-spinner{display:inline-block}
.t-btn.loading .t-icon{display:none}

/* ═══════════════════════════════════════════════════════════
   OUTPUT
   ═══════════════════════════════════════════════════════════ */
.t-output{padding:0 24px 24px}
.t-output-block{margin-bottom:16px}
.t-output-label{
  font-size:.72rem;color:#888;font-weight:800;
  text-transform:uppercase;letter-spacing:1px;
  margin-bottom:8px;display:flex;align-items:center;gap:6px;
}
.t-output-label::after{
  content:'';flex:1;height:1px;
  background:linear-gradient(90deg,rgba(108,99,255,.3),transparent);
}

.t-result{
  padding:20px 24px;
  background:linear-gradient(135deg,#1a1a2e 0%,#0f0f1e 100%);
  color:#fff;
  border-radius:14px;
  border-left:5px solid var(--t-k);
  font-size:1.15rem;line-height:1.7;
  font-weight:600;letter-spacing:.3px;
  min-height:60px;
  word-wrap:break-word;overflow-wrap:anywhere;
  position:relative;
  box-shadow:0 8px 24px -4px rgba(0,0,0,.25);
  animation:tPop .4s cubic-bezier(.16,1,.3,1);
}
.t-result:empty::before,
.t-result.placeholder{
  content:'Здесь появится перевод...';
  color:rgba(255,255,255,.35);font-style:italic;
  font-weight:500;
}
.t-result .t-trans-hint{
  display:block;
  font-size:.72rem;
  color:rgba(162,155,254,.7);
  margin-top:8px;
  font-weight:600;
  font-style:italic;
}

.t-gloss{
  margin-top:10px;padding:12px 16px;
  background:rgba(108,99,255,.05);
  border-left:3px solid var(--t-k-light);
  border-radius:8px;
  font-size:.82rem;color:#555;
  line-height:1.55;font-style:italic;
  word-break:break-word;
}
.t-gloss .t-gloss-tag{
  display:inline-block;
  padding:2px 8px;
  background:rgba(108,99,255,.12);
  color:var(--t-k);
  border-radius:6px;
  font-size:.7rem;font-weight:800;
  font-style:normal;
  margin-right:4px;
}
.t-gloss .t-gloss-en{
  color:#2980b9;font-weight:700;font-style:normal;
}

/* Action buttons под переводом */
.t-result-actions{
  display:flex;gap:8px;flex-wrap:wrap;
  margin-top:12px;
}
.t-mini-btn{
  display:inline-flex;align-items:center;gap:5px;
  padding:8px 14px;border-radius:20px;
  background:#fff;border:2px solid rgba(108,99,255,.15);
  color:var(--t-k);font-size:.78rem;font-weight:800;
  cursor:pointer;font-family:inherit;
  transition:all .2s;
}
.t-mini-btn:hover{
  background:rgba(108,99,255,.06);
  border-color:var(--t-k);
  transform:translateY(-1px);
}
.t-mini-btn.copied{
  background:linear-gradient(135deg,var(--t-success),#16a085);
  color:#fff;border-color:var(--t-success);
}

/* ═══════════════════════════════════════════════════════════
   HISTORY
   ═══════════════════════════════════════════════════════════ */
.t-history{
  padding:20px 24px 24px;
  background:linear-gradient(135deg,rgba(108,99,255,.03),transparent);
  border-top:1px solid rgba(0,0,0,.05);
}
.t-history-head{
  display:flex;justify-content:space-between;
  align-items:center;margin-bottom:12px;
}
.t-history-title{
  font-size:.85rem;font-weight:900;color:#1a1a2e;
  display:flex;align-items:center;gap:8px;
  text-transform:uppercase;letter-spacing:.5px;
}
.t-history-clear{
  background:transparent;border:none;
  color:#999;font-size:.72rem;font-weight:700;
  cursor:pointer;font-family:inherit;
  text-decoration:underline;padding:4px 8px;
}
.t-history-clear:hover{color:var(--t-error)}
.t-history-list{display:grid;gap:8px}
.t-history-item{
  display:flex;gap:12px;align-items:flex-start;
  padding:12px 14px;
  background:#fff;
  border:1px solid rgba(0,0,0,.05);
  border-radius:12px;
  cursor:pointer;
  transition:all .25s cubic-bezier(.16,1,.3,1);
  animation:tSlideIn .35s ease both;
}
.t-history-item:hover{
  transform:translateX(4px);
  border-color:var(--t-k);
  box-shadow:0 8px 20px -6px var(--t-k-shadow);
}
.t-history-icon{
  width:32px;height:32px;border-radius:50%;
  background:linear-gradient(135deg,var(--t-k),var(--t-k-light));
  color:#fff;display:flex;align-items:center;justify-content:center;
  font-size:.85rem;flex-shrink:0;
}
.t-history-info{flex:1;min-width:0}
.t-history-ru{
  font-size:.82rem;color:#555;font-weight:700;
  margin-bottom:3px;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.t-history-mars{
  font-size:.88rem;color:var(--t-k);
  font-weight:800;font-family:'Georgia',serif;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.t-history-time{
  font-size:.65rem;color:#bbb;font-weight:700;
  flex-shrink:0;padding-top:2px;
}

/* ═══════════════════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════════════════ */
.t-stats{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));
  gap:10px;padding:16px 24px;
  background:linear-gradient(135deg,rgba(108,99,255,.03),transparent);
  border-top:1px solid rgba(0,0,0,.05);
}
.t-stat{
  text-align:center;padding:10px 8px;
  background:#fff;border-radius:12px;
  border:1px solid rgba(0,0,0,.05);
}
.t-stat-value{
  font-size:1.2rem;font-weight:900;
  background:linear-gradient(135deg,var(--t-k),var(--t-k-light));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
  line-height:1;
  font-variant-numeric:tabular-nums;
}
.t-stat-label{
  font-size:.65rem;color:#888;font-weight:800;
  text-transform:uppercase;letter-spacing:.8px;margin-top:4px;
}

/* ═══════════════════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════════════════ */
.t-toast{
  position:fixed;bottom:30px;left:50%;
  transform:translateX(-50%) translateY(100px);
  padding:12px 26px;border-radius:30px;
  color:#fff;font-weight:800;font-size:.9rem;
  box-shadow:0 12px 32px rgba(0,0,0,.3);
  z-index:2147483647;
  pointer-events:none;max-width:90vw;text-align:center;
  opacity:0;
}
.t-toast.show{
  animation:tToastIn .4s cubic-bezier(.16,1,.3,1) forwards;
  opacity:1;
}
.t-toast.hide{animation:tToastOut .3s ease forwards}
.t-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.t-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.t-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}

/* ═══════════════════════════════════════════════════════════
   DARK MODE
   ═══════════════════════════════════════════════════════════ */
@media (prefers-color-scheme: dark){
  html body.mars-stars-on #translator-app .t-card{background:rgba(20,20,42,.95);color:#e0e0f0}
  html body.mars-stars-on #translator-app .t-head{background:linear-gradient(135deg,rgba(108,99,255,.12),rgba(162,155,254,.06));border-bottom-color:rgba(108,99,255,.2)}
  html body.mars-stars-on #translator-app .t-head-title{color:#e0e0f0}
  html body.mars-stars-on #translator-app .t-hint{background:rgba(108,99,255,.1);color:#c0c0d0}
  html body.mars-stars-on #translator-app #t-input{background:#252550;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
  html body.mars-stars-on #translator-app .t-btn.secondary{background:rgba(255,255,255,.08);color:#ccc}
  html body.mars-stars-on #translator-app .t-history-item{background:rgba(255,255,255,.04)}
  html body.mars-stars-on #translator-app .t-history-title{color:#e0e0f0}
  html body.mars-stars-on #translator-app .t-stat{background:rgba(255,255,255,.04);border-color:rgba(108,99,255,.2)}
  html body.mars-stars-on #translator-app .t-gloss{background:rgba(108,99,255,.12);color:#b0b0c0}
  html body.mars-stars-on #translator-app .t-example{background:rgba(108,99,255,.15);border-color:rgba(108,99,255,.3)}
  html body.mars-stars-on #translator-app .t-mini-btn{background:rgba(255,255,255,.06);border-color:rgba(108,99,255,.3)}
}

/* ═══════════════════════════════════════════════════════════
   MOBILE
   ═══════════════════════════════════════════════════════════ */
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
  .t-examples{padding:0 18px 10px}
  .t-example{font-size:.7rem;padding:5px 10px}
  .t-buttons{padding:6px 18px 16px;gap:8px}
  .t-btn{padding:12px 18px;font-size:.85rem}
  .t-output{padding:0 18px 18px}
  .t-result{padding:16px 18px;font-size:1rem}
  .t-history{padding:16px 18px}
  .t-stats{padding:12px 18px;grid-template-columns:repeat(2,1fr)}
  .t-stat-value{font-size:1rem}
  .t-history-time{display:none}
}

@media (prefers-reduced-motion: reduce){
  #translator-app *,#translator-app *::before,#translator-app *::after{
    animation-duration:.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
}
</style>

<div id="translator-app">

  <!-- HERO -->
  <div class="t-hero t-fade">
    <div class="t-hero-stars">
      <div class="t-star"></div><div class="t-star"></div><div class="t-star"></div>
      <div class="t-star"></div><div class="t-star"></div><div class="t-star"></div>
      <div class="t-star"></div><div class="t-star"></div>
    </div>
    <div class="t-hero-content">
      <div class="t-hero-icon">🪐</div>
      <h1 class="t-hero-title">Марсианский переводчик</h1>
      <p class="t-hero-sub">
        Введи текст на русском или английском — получи перевод на древний язык Марса.
        Словарь, грамматика, авто-генерация новых слов.
      </p>
      <div class="t-hero-badges">
        <span class="t-badge">🇷🇺 Русский</span>
        <span class="t-badge">🇬🇧 English</span>
        <span class="t-badge">🪐 Mars</span>
        <span class="t-badge">🔮 Иероглифы</span>
      </div>
    </div>
  </div>

  <!-- MAIN CARD -->
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
      <strong>Как пользоваться:</strong> Введите текст — переводчик найдёт слова в словаре
      или сгенерирует новые. <kbd>Ctrl</kbd>+<kbd>Enter</kbd> — быстрый перевод.
      Поддерживаются падежи, времена, отрицание, вопросы, модальность.
      <strong>English</strong> переводится в 2 шага: EN → RU → Mars.
    </div>

    <div class="t-input-wrap">
      <span class="t-lang-tag" id="t-lang-tag">🌐 RU / EN</span>
      <textarea id="t-input" placeholder="Например: Я разговариваю на лучшем языке. / I speak the best language." spellcheck="false"></textarea>
      <div class="t-input-meta">
        <span id="t-counter" class="t-counter">0 / 500 символов</span>
        <span id="t-word-count">0 слов</span>
      </div>
    </div>

    <div class="t-examples">
      <span class="t-examples-label">Примеры:</span>
      <button class="t-example" data-example="Привет">Привет</button>
      <button class="t-example" data-example="Глина помнит">Глина помнит</button>
      <button class="t-example" data-example="Всё-же Марс лучше всех!">Всё-же Марс лучше всех!</button>
      <button class="t-example" data-example="Я разговариваю на лучшем языке">Я разговариваю на лучшем языке</button>
      <button class="t-example" data-example="Звезда смотрит на землю">Звезда смотрит на землю</button>
      <button class="t-example" data-example="I speak the best language">I speak the best language</button>
    </div>

    <div class="t-buttons">
      <button class="t-btn primary" id="t-translate-btn">
        <span class="t-spinner"></span>
        <span class="t-icon">🔄</span>
        <span>Перевести</span>
      </button>
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
          <button class="t-mini-btn" id="t-more">🔄 Ещё вариант</button>
        </div>
      </div>
      <div class="t-output-block" id="t-gloss-block" style="display:none">
        <div class="t-output-label">🔍 Разбор</div>
        <div class="t-gloss" id="t-gloss"></div>
      </div>
    </div>

    <!-- HISTORY -->
    <div class="t-history" id="t-history" style="display:none">
      <div class="t-history-head">
        <div class="t-history-title">📚 История переводов</div>
        <button class="t-history-clear" id="t-history-clear">Очистить</button>
      </div>
      <div class="t-history-list" id="t-history-list"></div>
    </div>

    <!-- STATS -->
    <div class="t-stats">
      <div class="t-stat">
        <div class="t-stat-value" id="t-stat-words">0</div>
        <div class="t-stat-label">Слов в словаре</div>
      </div>
      <div class="t-stat">
        <div class="t-stat-value" id="t-stat-en">0</div>
        <div class="t-stat-label">EN→RU слов</div>
      </div>
      <div class="t-stat">
        <div class="t-stat-value" id="t-stat-phrases">0</div>
        <div class="t-stat-label">Готовых фраз</div>
      </div>
      <div class="t-stat">
        <div class="t-stat-value" id="t-stat-translations">0</div>
        <div class="t-stat-label">Переводов</div>
      </div>
    </div>
  </div>

</div>

<div class="t-toast" id="t-toast"></div>

<script>
(function(){
'use strict';
if (window.__tLoaded) return;
window.__tLoaded = true;

/* ═══════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════ */
var STORAGE_KEY = 't_history_v2';
var MAX_HISTORY = 15;

/* ═══════════════════════════════════════════════════════════
   EN → RU СЛОВАРЬ (для перевода английского → русского)
   ═══════════════════════════════════════════════════════════ */
var EN_RU = {
  // pronouns
  'i':'я','me':'меня','you':'ты','he':'он','she':'она','it':'это','we':'мы','they':'они',
  'my':'мой','your':'твой','his':'его','her':'её','our':'наш','their':'их',
  'this':'это','that':'то','these':'эти','those':'те','all':'все','some':'некоторые',
  // verbs (base + common forms)
  'be':'быть','am':'есть','is':'есть','are':'есть','was':'был','were':'были','been':'был',
  'have':'иметь','has':'имеет','had':'имел',
  'do':'делать','does':'делает','did':'делал','done':'сделан',
  'say':'говорить','says':'говорит','said':'сказал','speak':'говорить','speaks':'говорит',
  'see':'видеть','sees':'видит','saw':'видел','watch':'смотреть','watches':'смотрит',
  'know':'знать','knows':'знает','knew':'знал',
  'think':'думать','thinks':'думает','thought':'думал',
  'go':'идти','goes':'идёт','went':'шёл','gone':'ушёл',
  'come':'приходить','comes':'приходит','came':'пришёл',
  'want':'хотеть','wants':'хочет','wanted':'хотел',
  'like':'любить','likes':'любит','loved':'любил',
  'love':'любить','loves':'любит',
  'live':'жить','lives':'живёт','lived':'жил',
  'die':'умирать','dies':'умирает','died':'умер',
  'remember':'помнить','remembers':'помнит','forget':'забыть','forgets':'забывает',
  'work':'работать','works':'работает','worked':'работал',
  'play':'играть','plays':'играет','played':'играл',
  'read':'читать','reads':'читает','write':'писать','writes':'пишет','wrote':'писал',
  'build':'строить','builds':'строит','built':'построил',
  'destroy':'разрушать','destroys':'разрушает',
  'create':'создавать','creates':'создаёт',
  'find':'найти','finds':'находит','found':'нашёл',
  'give':'давать','gives':'даёт','gave':'дал',
  'take':'брать','takes':'берёт','took':'взял',
  'eat':'есть','eats':'ест','ate':'ел',
  'drink':'пить','drinks':'пьёт','drank':'пил',
  'sleep':'спать','sleeps':'спит','slept':'спал',
  'run':'бежать','runs':'бежит','ran':'бежал',
  'fly':'летать','flies':'летает','flew':'летал',
  'walk':'ходить','walks':'ходит','walked':'ходил',
  'sing':'петь','sings':'поёт','sang':'пел',
  'dance':'танцевать','dances':'танцует','danced':'танцевал',
  'help':'помогать','helps':'помогает',
  'look':'смотреть','looks':'смотрит','looked':'смотрел',
  'listen':'слушать','listens':'слушает',
  'understand':'понимать','understands':'понимает',
  'believe':'верить','believes':'верит',
  'hope':'надеяться','hopes':'надеется',
  'fear':'бояться','fears':'боится',
  'stand':'стоять','stands':'стоит','stood':'стоял',
  'lie':'лежать','lies':'лежит','lay':'лежал',
  'grow':'расти','grows':'растёт','grew':'рос',
  'fall':'падать','falls':'падает','fell':'упал',
  'rise':'подниматься','rises':'поднимается',
  'open':'открывать','opens':'открывает','opened':'открыл',
  'close':'закрывать','closes':'закрывает',
  // nouns
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
  'knowledge':'знание','wisdom':'мудрость','truth':'правда','lie':'ложь',
  'hope':'надежда','faith':'вера','love':'любовь','fear':'страх','joy':'радость',
  'sadness':'печаль','grief':'горе','anger':'гнев','peace':'покой','freedom':'свобода',
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
  // function words
  'and':'и','or':'или','but':'но','if':'если','when':'когда','where':'где','why':'почему',
  'how':'как','what':'что','who':'кто','which':'который','because':'потому',
  'not':'не','no':'нет','yes':'да','very':'очень','too':'тоже','also':'также',
  'only':'только','even':'даже','still':'всё ещё','already':'уже','again':'снова',
  'here':'здесь','there':'там','now':'сейчас','then':'тогда','always':'всегда',
  'never':'никогда','sometimes':'иногда','often':'часто','soon':'скоро',
  'in':'в','on':'на','at':'у','to':'к','from':'от','of':'из','with':'с','without':'без',
  'for':'для','by':'по','about':'о','under':'под','over':'над','before':'до','after':'после',
  'all':'все','every':'каждый','each':'каждый','many':'многие','much':'много',
  'few':'мало','more':'больше','most':'самый','less':'меньше','least':'наименьший',
  'up':'вверх','down':'вниз','left':'левый','right':'правый','north':'север',
  'south':'юг','east':'восток','west':'запад','far':'далеко','near':'близко',
  // greetings & phrases
  'hello':'привет','hi':'привет','hey':'привет','bye':'пока','goodbye':'прощай',
  'thanks':'спасибо','thank':'спасибо','please':'пожалуйста','sorry':'извини',
  'welcome':'добро пожаловать','please':'пожалуйста','ok':'хорошо','yes':'да','no':'нет'
};

/* ═══════════════════════════════════════════════════════════
   НОВЫЕ СЛОВА (дополнительные к базовому словарю)
   ═══════════════════════════════════════════════════════════ */
var NEW_WORDS = {
  // существительные
  'тварь':{root:'khōrmar',pos:'noun'},'твари':{root:'khōrmar',pos:'noun'},
  'лицо':{root:'thalsen',pos:'noun'},'лица':{root:'thalsen',pos:'noun'},
  'рука':{root:'khasrak',pos:'noun'},'руки':{root:'khasrak',pos:'noun'},
  'нога':{root:'nurnak',pos:'noun'},'ноги':{root:'nurnak',pos:'noun'},
  'глаз':{root:'thalsen',pos:'noun'},'глаза':{root:'thalsen',pos:'noun'},
  'сердце':{root:'lānsen',pos:'noun'},'сердца':{root:'lānsen',pos:'noun'},
  'душа':{root:'khōlān',pos:'noun'},'души':{root:'khōlān',pos:'noun'},
  'кровь':{root:'marlān',pos:'noun'},
  'голос':{root:'thalthu',pos:'noun'},
  'крик':{root:'khōthal',pos:'noun'},'крика':{root:'khōthal',pos:'noun'},
  'шёпот':{root:'nōkhthal',pos:'noun'},
  'пение':{root:'zalkhō',pos:'noun'},
  'танец':{root:'thalur',pos:'noun'},
  'смех':{root:'thalmar',pos:'noun'},
  'слёзы':{root:'ākhaur',pos:'noun'},'слезы':{root:'ākhaur',pos:'noun'},
  'путь':{root:'nur',pos:'noun'},
  'судьба':{root:'thalān',pos:'noun'},
  'смерть':{root:'mōr',pos:'noun'},
  'жизнь':{root:'mar',pos:'noun'},
  'век':{root:'amār',pos:'noun'},'века':{root:'amār',pos:'noun'},'веков':{root:'amār',pos:'noun'},
  'бог':{root:'netjer',pos:'noun'},'бога':{root:'netjer',pos:'noun'},'боги':{root:'netjer',pos:'noun'},
  'море':{root:'ākhasuf',pos:'noun'},'моря':{root:'ākhasuf',pos:'noun'},
  'простор':{root:'sūrsen',pos:'noun'},
  'вселенная':{root:'sūrdzen',pos:'noun'},'вселенной':{root:'sūrdzen',pos:'noun'},
  'порядок':{root:'thalsen',pos:'noun'},
  'хаос':{root:'mōrsen',pos:'noun'},
  'равновесие':{root:'unmar',pos:'noun'},
  'сила':{root:'khōlān',pos:'noun'},'силы':{root:'khōlān',pos:'noun'},
  'мощь':{root:'sufkhō',pos:'noun'},
  'слава':{root:'lānkhō',pos:'noun'},
  'честь':{root:'aritsan',pos:'noun'},
  'стыд':{root:'ghōlmar',pos:'noun'},
  'боль':{root:'mōrmar',pos:'noun'},
  'мука':{root:'sufmōr',pos:'noun'},
  'радость':{root:'thalmar',pos:'noun'},
  'веселье':{root:'sōlmar',pos:'noun'},
  'грусть':{root:'mōrmar',pos:'noun'},
  'тоска':{root:'nōkhmōr',pos:'noun'},
  'страх':{root:'ghōlmar',pos:'noun'},
  'ужас':{root:'sufghōl',pos:'noun'},
  'гнев':{root:'khanmar',pos:'noun'},
  'ярость':{root:'sufkhō',pos:'noun'},
  'ненависть':{root:'ānmōr',pos:'noun'},
  'дружба':{root:'tōlān',pos:'noun'},
  'родство':{root:'tōmar',pos:'noun'},
  'кровь':{root:'marlān',pos:'noun'},
  // прилагательные
  'лучший':{root:'sufari',pos:'adj'},'лучшая':{root:'sufari',pos:'adj'},'лучшее':{root:'sufari',pos:'adj'},
  'лучшие':{root:'sufari',pos:'adj'},'лучшего':{root:'sufari',pos:'adj'},
  'худший':{root:'ānsuf',pos:'adj'},'худшая':{root:'ānsuf',pos:'adj'},'худшее':{root:'ānsuf',pos:'adj'},
  'высший':{root:'dzenari',pos:'adj'},'высшая':{root:'dzenari',pos:'adj'},
  'истинный':{root:'thalsuf',pos:'adj'},'истинная':{root:'thalsuf',pos:'adj'},
  'ложный':{root:'ānthal',pos:'adj'},'ложная':{root:'ānthal',pos:'adj'},
  'быстрый':{root:'nurkhō',pos:'adj'},'быстрая':{root:'nurkhō',pos:'adj'},'быстрое':{root:'nurkhō',pos:'adj'},
  'медленный':{root:'kōlnur',pos:'adj'},'медленная':{root:'kōlnur',pos:'adj'},
  'яркий':{root:'dzēn',pos:'adj'},'яркая':{root:'dzēn',pos:'adj'},'яркое':{root:'dzēn',pos:'adj'},
  'тёмный':{root:'nōkh',pos:'adj'},'темный':{root:'nōkh',pos:'adj'},'тёмная':{root:'nōkh',pos:'adj'},
  'светлый':{root:'dzenīn',pos:'adj'},'светлая':{root:'dzenīn',pos:'adj'},
  'горячий':{root:'khōīn',pos:'adj'},'горячая':{root:'khōīn',pos:'adj'},
  'холодный':{root:'mōrīn',pos:'adj'},'холодная':{root:'mōrīn',pos:'adj'},
  'тихий':{root:'nōkhīn',pos:'adj'},'тихая':{root:'nōkhīn',pos:'adj'},
  'громкий':{root:'khōīn',pos:'adj'},'громкая':{root:'khōīn',pos:'adj'},
  'большой':{root:'suf',pos:'adj'},'большая':{root:'suf',pos:'adj'},'большое':{root:'suf',pos:'adj'},
  'маленький':{root:'hōr',pos:'adj'},'маленькая':{root:'hōr',pos:'adj'},
  'настоящий':{root:'thalsen',pos:'adj'},'настоящая':{root:'thalsen',pos:'adj'},
  'единственный':{root:'ontō',pos:'adj'},'единственная':{root:'ontō',pos:'adj'},
  'прекрасный':{root:'sufdzen',pos:'adj'},'прекрасная':{root:'sufdzen',pos:'adj'},
  'удивительный':{root:'ānthal',pos:'adj'},'удивительная':{root:'ānthal',pos:'adj'},
  // наречия
  'всё-же':{root:'unmōr',pos:'adv'},'все-же':{root:'unmōr',pos:'adv'},'всё же':{root:'unmōr',pos:'adv'},
  'наконец':{root:'mōrthal',pos:'adv'},
  'снова':{root:'khalnur',pos:'adv'},
  'сначала':{root:'khānnur',pos:'adv'},
  'потом':{root:'mōrnur',pos:'adv'},
  'теперь':{root:'sōlnur',pos:'adv'},
  'прежде':{root:'xalnur',pos:'adv'},
  'вскоре':{root:'nurkhō',pos:'adv'},
  'сразу':{root:'khōnur',pos:'adv'},
  'немедленно':{root:'khōnur',pos:'adv'},
  'навсегда':{root:'ānrak',pos:'adv'},
  'никогда':{root:'ānamār',pos:'adv'},
  'вместе':{root:'tō',pos:'adv'},
  'отдельно':{root:'hōrsen',pos:'adv'},
  'тихо':{root:'nōkhīn',pos:'adv'},
  'громко':{root:'khōīn',pos:'adv'},
  'ясно':{root:'dzenīn',pos:'adv'},
  'просто':{root:'on',pos:'adv'},
  'сложно':{root:'sūrtsan',pos:'adv'},
  'возможно':{root:'nūr',pos:'adv'},
  'конечно':{root:'thalsuf',pos:'adv'},
  'именно':{root:'thalsen',pos:'adv'},
  'почти':{root:'on',pos:'adv'},
  'только':{root:'on',pos:'adv'},
  'даже':{root:'on',pos:'adv'},
  'ведь':{root:'un',pos:'adv'},
  'лишь':{root:'on',pos:'adv'},
  'уже':{root:'amār',pos:'adv'},
  'ещё':{root:'khal',pos:'adv'},'еще':{root:'khal',pos:'adv'},
  // глаголы
  'разговаривать':{root:'thalthu',pos:'verb'},'разговариваю':{root:'thalthu',pos:'verb'},
  'разговаривает':{root:'thalthu',pos:'verb'},'разговаривают':{root:'thalthu',pos:'verb'},
  'разговаривал':{root:'thalthu',pos:'verb'},
  'беседовать':{root:'thalthu',pos:'verb'},'беседую':{root:'thalthu',pos:'verb'},
  'общаться':{root:'thalthu',pos:'verb'},
  'молвить':{root:'thalthu',pos:'verb'},
  'произносить':{root:'thalthu',pos:'verb'},'произношу':{root:'thalthu',pos:'verb'},
  'восклицать':{root:'khōthal',pos:'verb'},'восклицаю':{root:'khōthal',pos:'verb'},
  'шептать':{root:'nōkhthal',pos:'verb'},'шепчу':{root:'nōkhthal',pos:'verb'},
  'шепчет':{root:'nōkhthal',pos:'verb'},
  'кричать':{root:'khōthal',pos:'verb'},'кричу':{root:'khōthal',pos:'verb'},'кричит':{root:'khōthal',pos:'verb'},
  'петь':{root:'zalkhō',pos:'verb'},'пою':{root:'zalkhō',pos:'verb'},'поёт':{root:'zalkhō',pos:'verb'},
  'воспевать':{root:'zalkhō',pos:'verb'},
  'танцевать':{root:'thalur',pos:'verb'},'танцую':{root:'thalur',pos:'verb'},'танцует':{root:'thalur',pos:'verb'},
  'любить':{root:'lānmar',pos:'verb'},'люблю':{root:'lānmar',pos:'verb'},'любит':{root:'lānmar',pos:'verb'},
  'обожать':{root:'suflānmar',pos:'verb'},
  'уважать':{root:'aritsan',pos:'verb'},'уважаю':{root:'aritsan',pos:'verb'},
  'бояться':{root:'ghōlmar',pos:'verb'},'боюсь':{root:'ghōlmar',pos:'verb'},'боится':{root:'ghōlmar',pos:'verb'},
  'ужасаться':{root:'sufghōl',pos:'verb'},
  'радоваться':{root:'thalmar',pos:'verb'},'радуюсь':{root:'thalmar',pos:'verb'},
  'грустить':{root:'mōrmar',pos:'verb'},'грущу':{root:'mōrmar',pos:'verb'},
  'печалиться':{root:'mōrmar',pos:'verb'},
  'смеяться':{root:'thalmar',pos:'verb'},'смеюсь':{root:'thalmar',pos:'verb'},
  'плакать':{root:'ākhaur',pos:'verb'},'плачу':{root:'ākhaur',pos:'verb'},
  'думать':{root:'tsanur',pos:'verb'},'думаю':{root:'tsanur',pos:'verb'},'думает':{root:'tsanur',pos:'verb'},
  'размышлять':{root:'tsanur',pos:'verb'},'размышляю':{root:'tsanur',pos:'verb'},
  'понимать':{root:'tsanlān',pos:'verb'},'понимаю':{root:'tsanlān',pos:'verb'},'понимает':{root:'tsanlān',pos:'verb'},
  'осознавать':{root:'tsanlān',pos:'verb'},'осознаю':{root:'tsanlān',pos:'verb'},
  'знать':{root:'tsan',pos:'verb'},'знаю':{root:'tsan',pos:'verb'},'знает':{root:'tsan',pos:'verb'},
  'помнить':{root:'lān',pos:'verb'},'помню':{root:'lān',pos:'verb'},'помнит':{root:'lān',pos:'verb'},
  'вспоминать':{root:'lānthal',pos:'verb'},'вспоминаю':{root:'lānthal',pos:'verb'},
  'забывать':{root:'ānlān',pos:'verb'},'забываю':{root:'ānlān',pos:'verb'},'забыл':{root:'ānlān',pos:'verb'},
  'верить':{root:'khalmar',pos:'verb'},'верю':{root:'khalmar',pos:'verb'},'верит':{root:'khalmar',pos:'verb'},
  'доверять':{root:'tōkhalmar',pos:'verb'},
  'надеяться':{root:'lānthōl',pos:'verb'},'надеюсь':{root:'lānthōl',pos:'verb'},
  'ждать':{root:'zhal',pos:'verb'},'жду':{root:'zhal',pos:'verb'},'ждёт':{root:'zhal',pos:'verb'},'ждут':{root:'zhal',pos:'verb'},
  'видеть':{root:'thal',pos:'verb'},'вижу':{root:'thal',pos:'verb'},'видит':{root:'thal',pos:'verb'},
  'смотреть':{root:'thal',pos:'verb'},'смотрю':{root:'thal',pos:'verb'},'смотрит':{root:'thal',pos:'verb'},
  'смотрят':{root:'thal',pos:'verb'},
  'слушать':{root:'thal',pos:'verb'},'слушаю':{root:'thal',pos:'verb'},'слушает':{root:'thal',pos:'verb'},
  'слышать':{root:'thal',pos:'verb'},'слышу':{root:'thal',pos:'verb'},'слышит':{root:'thal',pos:'verb'},
  'чувствовать':{root:'thalmar',pos:'verb'},'чувствую':{root:'thalmar',pos:'verb'},
  'ощущать':{root:'thalmar',pos:'verb'},
  'жить':{root:'marlān',pos:'verb'},'живу':{root:'marlān',pos:'verb'},'живёт':{root:'marlān',pos:'verb'},'живут':{root:'marlān',pos:'verb'},
  'умирать':{root:'mōr',pos:'verb'},'умираю':{root:'mōr',pos:'verb'},'умирает':{root:'mōr',pos:'verb'},'умирают':{root:'mōr',pos:'verb'},
  'погибать':{root:'mōr',pos:'verb'},'погибаю':{root:'mōr',pos:'verb'},
  'рождаться':{root:'khalur',pos:'verb'},'рождаюсь':{root:'khalur',pos:'verb'},
  'расти':{root:'marūr',pos:'verb'},'расту':{root:'marūr',pos:'verb'},'растёт':{root:'marūr',pos:'verb'},
  'процветать':{root:'khonur',pos:'verb'},'процветаю':{root:'khonur',pos:'verb'},
  'строить':{root:'okhar',pos:'verb'},'строю':{root:'okhar',pos:'verb'},'строит':{root:'okhar',pos:'verb'},
  'создавать':{root:'khalur',pos:'verb'},'создаю':{root:'khalur',pos:'verb'},'создаёт':{root:'khalur',pos:'verb'},
  'разрушать':{root:'mōrkhō',pos:'verb'},'разрушаю':{root:'mōrkhō',pos:'verb'},'разрушает':{root:'mōrkhō',pos:'verb'},
  'уничтожать':{root:'sufmōr',pos:'verb'},'уничтожаю':{root:'sufmōr',pos:'verb'},
  'идти':{root:'nur',pos:'verb'},'иду':{root:'nur',pos:'verb'},'идёт':{root:'nur',pos:'verb'},'идут':{root:'nur',pos:'verb'},
  'ходить':{root:'nur',pos:'verb'},'хожу':{root:'nur',pos:'verb'},'ходит':{root:'nur',pos:'verb'},
  'бежать':{root:'nurkhō',pos:'verb'},'бегу':{root:'nurkhō',pos:'verb'},'бежит':{root:'nurkhō',pos:'verb'},
  'летать':{root:'zalur',pos:'verb'},'летаю':{root:'zalur',pos:'verb'},'летает':{root:'zalur',pos:'verb'},
  'плавать':{root:'ākhanur',pos:'verb'},'плаваю':{root:'ākhanur',pos:'verb'},
  'стоять':{root:'okhsen',pos:'verb'},'стою':{root:'okhsen',pos:'verb'},'стоит':{root:'okhsen',pos:'verb'},
  'лежать':{root:'marlān',pos:'verb'},'лежу':{root:'marlān',pos:'verb'},'лежит':{root:'marlān',pos:'verb'},
  'сидеть':{root:'sōlkōl',pos:'verb'},'сижу':{root:'sōlkōl',pos:'verb'},'сидит':{root:'sōlkōl',pos:'verb'},
  'падать':{root:'kōlur',pos:'verb'},'падаю':{root:'kōlur',pos:'verb'},'падает':{root:'kōlur',pos:'verb'},
  'подниматься':{root:'dzenur',pos:'verb'},'поднимаюсь':{root:'dzenur',pos:'verb'},
  'спускаться':{root:'kōlur',pos:'verb'},'спускаюсь':{root:'kōlur',pos:'verb'},
  'работать':{root:'xurmar',pos:'verb'},'работаю':{root:'xurmar',pos:'verb'},'работает':{root:'xurmar',pos:'verb'},
  'трудиться':{root:'xurmar',pos:'verb'},
  'делать':{root:'khalur',pos:'verb'},'делаю':{root:'khalur',pos:'verb'},'делает':{root:'khalur',pos:'verb'},
  'совершать':{root:'khalur',pos:'verb'},
  'давать':{root:'rōg',pos:'verb'},'даю':{root:'rōg',pos:'verb'},'даёт':{root:'rōg',pos:'verb'},
  'брать':{root:'khōs',pos:'verb'},'беру':{root:'khōs',pos:'verb'},'берёт':{root:'khōs',pos:'verb'},
  'получать':{root:'sen',pos:'verb'},'получаю':{root:'sen',pos:'verb'},
  'отдавать':{root:'rōgmōr',pos:'verb'},
  'находить':{root:'nurthal',pos:'verb'},'нахожу':{root:'nurthal',pos:'verb'},'находит':{root:'nurthal',pos:'verb'},
  'искать':{root:'nurthal',pos:'verb'},'ищу':{root:'nurthal',pos:'verb'},'ищет':{root:'nurthal',pos:'verb'},
  'терять':{root:'ānthal',pos:'verb'},'теряю':{root:'ānthal',pos:'verb'},'потерял':{root:'ānthal',pos:'verb'},
  'побеждать':{root:'marlān',pos:'verb'},'побеждаю':{root:'marlān',pos:'verb'},
  'проигрывать':{root:'mōrlān',pos:'verb'},
  'сражаться':{root:'urnur',pos:'verb'},'сражаюсь':{root:'urnur',pos:'verb'},
  'биться':{root:'urnur',pos:'verb'},'бьюсь':{root:'urnur',pos:'verb'},
  'защищать':{root:'lānīn',pos:'verb'},'защищаю':{root:'lānīn',pos:'verb'},
  'спасать':{root:'lānīn',pos:'verb'},'спасаю':{root:'lānīn',pos:'verb'},
  'хранить':{root:'lānīn',pos:'verb'},'храню':{root:'lānīn',pos:'verb'},
  'беречь':{root:'lānīn',pos:'verb'},
  'открывать':{root:'tōkhur',pos:'verb'},'открываю':{root:'tōkhur',pos:'verb'},
  'закрывать':{root:'tōkhmōr',pos:'verb'},
  'читать':{root:'thal',pos:'verb'},'читаю':{root:'thal',pos:'verb'},'читает':{root:'thal',pos:'verb'},
  'писать':{root:'khōs',pos:'verb'},'пишу':{root:'khōs',pos:'verb'},'пишет':{root:'khōs',pos:'verb'},
  'рисовать':{root:'thalur',pos:'verb'},'рисую':{root:'thalur',pos:'verb'},
  'играть':{root:'thalur',pos:'verb'},'играю':{root:'thalur',pos:'verb'},'играет':{root:'thalur',pos:'verb'},
  'пить':{root:'khōr',pos:'verb'},'пью':{root:'khōr',pos:'verb'},'пьёт':{root:'khōr',pos:'verb'},
  'есть':{root:'sen',pos:'verb'},'ем':{root:'sen',pos:'verb'},'ест':{root:'sen',pos:'verb'},
  'спать':{root:'sūl',pos:'verb'},'сплю':{root:'sūl',pos:'verb'},'спит':{root:'sūl',pos:'verb'},
  'просыпаться':{root:'dzenur',pos:'verb'},
  'выходить':{root:'nurmōr',pos:'verb'},
  'входить':{root:'nursen',pos:'verb'},
  'возвращаться':{root:'thalān',pos:'verb'},'возвращаюсь':{root:'thalān',pos:'verb'},
  'уходить':{root:'nurmōr',pos:'verb'},'ухожу':{root:'nurmōr',pos:'verb'},
  'приходить':{root:'nursen',pos:'verb'},'прихожу':{root:'nursen',pos:'verb'},
  // служебные
  'потому':{root:'un',pos:'conj'},'поэтому':{root:'un',pos:'conj'},
  'чтобы':{root:'un',pos:'conj'},'если':{root:'thōl',pos:'conj'},
  'или':{root:'khan',pos:'conj'},'либо':{root:'khan',pos:'conj'},
  'что-то':{root:'sha',pos:'pron'},'кто-то':{root:'ku',pos:'pron'},
  'что-нибудь':{root:'sha',pos:'pron'},'кто-нибудь':{root:'ku',pos:'pron'},
  'ничего':{root:'ān-sha',pos:'pron'},'никто':{root:'ān-ku',pos:'pron'},
  'самый':{root:'sufari',pos:'pron'},'самая':{root:'sufari',pos:'pron'},
  'самое':{root:'sufari',pos:'pron'},'самые':{root:'sufari',pos:'pron'},
  'самого':{root:'sufari',pos:'pron'},'самой':{root:'sufari',pos:'pron'},
  'всё':{root:'tō',pos:'pron'},'все':{root:'tō',pos:'pron'},
  'всё-таки':{root:'unmōr',pos:'adv'}
};

/* ═══════════════════════════════════════════════════════════
   ГОТОВЫЕ ФРАЗЫ
   ═══════════════════════════════════════════════════════════ */
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
  // ⭐ НОВЫЕ ФРАЗЫ
  'всё-же марс лучше всех':'Un mōr Mars sufari tō',
  'все-же марс лучше всех':'Un mōr Mars sufari tō',
  'марс лучше всех':'Mars sufari tō',
  'я разговариваю на лучшем языке':'An thalthu sen sufari thal',
  'я говорю на лучшем языке':'An thalthu sen sufari thal',
  'разговариваю на лучшем языке':'Thalthu sen sufari thal',
  'на лучшем языке':'Sen sufari thal',
  'лучший язык':'Sufari thal',
  'лучший язык вселенной':'Sufari thal sūrdzen',
  'марс — лучший':'Mars sufari',
  'марс наш дом':'Mars an okh',
  'я люблю марс':'An lānmar Mars',
  'мы дети марса':'Anān khalur Mars',
  'земля помнит':'Kōl lān',
  'огонь горит':'Khō lān',
  'вода живёт':'Ākha mar',
  'ветер говорит':'Zal thalthu',
  'звёзды смотрят':'Dzen thal',
  'звёзды помнят всё':'Dzen lān tō',
  'мы вместе':'Anān tō',
  'я помню':'An lān','ты помнишь':'Ta lān','он помнит':'La lān',
  'мы помним':'Anān lān','вы помните':'Tanān lān','они помнят':'Lanān lān',
  'я знаю':'An tsan','ты знаешь':'Ta tsan','он знает':'La tsan',
  'я живу':'An marlān','ты живёшь':'Ta marlān','он живёт':'La marlān',
  'я умираю':'An mōr','ты умираешь':'Ta mōr',
  'я люблю':'An lānmar','ты любишь':'Ta lānmar','он любит':'La lānmar',
  'я говорю':'An thalthu','ты говоришь':'Ta thalthu','он говорит':'La thalthu',
  'я иду':'An nur','ты идёшь':'Ta nur','он идёт':'La nur',
  'я думаю':'An tsanur','ты думаешь':'Ta tsanur',
  'мир помнит':'Nōkh lān',
  'кровь помнит':'Marlān lān'
};

/* ═══════════════════════════════════════════════════════════
   БАЗОВЫЙ СЛОВАРЬ (сокращён, но полностью функционален)
   ═══════════════════════════════════════════════════════════ */
var LEXICON = Object.assign({
  // местоимения
  'я':{root:'an',pos:'pron'},'меня':{root:'an',pos:'pron'},'мне':{root:'an',pos:'pron'},
  'мой':{root:'an',pos:'pron'},'моя':{root:'an',pos:'pron'},'моё':{root:'an',pos:'pron'},'мои':{root:'an',pos:'pron'},
  'ты':{root:'ta',pos:'pron'},'тебя':{root:'ta',pos:'pron'},'тебе':{root:'ta',pos:'pron'},
  'твой':{root:'ta',pos:'pron'},'твоя':{root:'ta',pos:'pron'},'твоё':{root:'ta',pos:'pron'},'твои':{root:'ta',pos:'pron'},
  'он':{root:'la',pos:'pron'},'она':{root:'la',pos:'pron'},'оно':{root:'la',pos:'pron'},
  'его':{root:'la',pos:'pron'},'её':{root:'la',pos:'pron'},'ей':{root:'la',pos:'pron'},'им':{root:'la',pos:'pron'},
  'их':{root:'lanān',pos:'pron'},'мы':{root:'anān',pos:'pron'},'нас':{root:'anān',pos:'pron'},
  'нам':{root:'anān',pos:'pron'},'нами':{root:'anān',pos:'pron'},
  'вы':{root:'tanān',pos:'pron'},'вас':{root:'tanān',pos:'pron'},'вам':{root:'tanān',pos:'pron'},
  'они':{root:'lanān',pos:'pron'},
  // существительные основные
  'вода':{root:'ākha',pos:'noun'},'воды':{root:'ākha',pos:'noun'},'воде':{root:'ākha',pos:'noun'},
  'воду':{root:'ākha',pos:'noun'},'водой':{root:'ākha',pos:'noun'},'вод':{root:'ākha',pos:'noun'},
  'звезда':{root:'dzen',pos:'noun'},'звезды':{root:'dzen',pos:'noun'},'звезду':{root:'dzen',pos:'noun'},
  'звёзды':{root:'dzen',pos:'noun'},'звёзд':{root:'dzen',pos:'noun'},'звезд':{root:'dzen',pos:'noun'},
  'земля':{root:'kōl',pos:'noun'},'земли':{root:'kōl',pos:'noun'},'землю':{root:'kōl',pos:'noun'},
  'река':{root:'khan',pos:'noun'},'реки':{root:'khan',pos:'noun'},'реку':{root:'khan',pos:'noun'},
  'огонь':{root:'khō',pos:'noun'},'огня':{root:'khō',pos:'noun'},'огню':{root:'khō',pos:'noun'},
  'жизнь':{root:'mar',pos:'noun'},'жизни':{root:'mar',pos:'noun'},'жизнью':{root:'mar',pos:'noun'},
  'смерть':{root:'mōr',pos:'noun'},'смерти':{root:'mōr',pos:'noun'},
  'память':{root:'lān',pos:'noun'},'памяти':{root:'lān',pos:'noun'},
  'дом':{root:'okh',pos:'noun'},'дома':{root:'okh',pos:'noun'},'дому':{root:'okh',pos:'noun'},'доме':{root:'okh',pos:'noun'},
  'король':{root:'rōg',pos:'noun'},'короля':{root:'rōg',pos:'noun'},'королю':{root:'rōg',pos:'noun'},
  'короли':{root:'rōg',pos:'noun'},
  'место':{root:'sen',pos:'noun'},'места':{root:'sen',pos:'noun'},'мест':{root:'sen',pos:'noun'},
  'человек':{root:'mārīn',pos:'noun'},'человека':{root:'mārīn',pos:'noun'},
  'люди':{root:'mārīnān',pos:'noun'},'людей':{root:'mārīnān',pos:'noun'},
  'марсиане':{root:'marzān',pos:'noun'},'марсиан':{root:'marzān',pos:'noun'},
  'марсианин':{root:'marzān',pos:'noun'},'марсианина':{root:'marzān',pos:'noun'},
  'стол':{root:'xar',pos:'noun'},'стул':{root:'xarshū',pos:'noun'},
  'кровать':{root:'marlā',pos:'noun'},'хлеб':{root:'marthō',pos:'noun'},
  'мясо':{root:'xarōk',pos:'noun'},'гора':{root:'dūr',pos:'noun'},'горы':{root:'dūr',pos:'noun'},
  'лес':{root:'xōl',pos:'noun'},'поле':{root:'thalōk',pos:'noun'},
  'дождь':{root:'ākhadzen',pos:'noun'},'буря':{root:'zalkhō',pos:'noun'},
  'радость':{root:'thalmar',pos:'noun'},'печаль':{root:'mōrmar',pos:'noun'},
  'любовь':{root:'lānmar',pos:'noun'},'страх':{root:'ghōlmar',pos:'noun'},
  'гнев':{root:'khanmar',pos:'noun'},'ночь':{root:'nōkh',pos:'noun'},'день':{root:'sōl',pos:'noun'},
  'зверь':{root:'khōr',pos:'noun'},'рыба':{root:'ākhakhōr',pos:'noun'},'птица':{root:'zalakhōr',pos:'noun'},
  'камень':{root:'ghar',pos:'noun'},'тень':{root:'ghōl',pos:'noun'},'свет':{root:'dzēn',pos:'noun'},
  'знание':{root:'tsan',pos:'noun'},'гибель':{root:'mōrkhō',pos:'noun'},
  'глина':{root:'sur',pos:'noun'},'пыль':{root:'sur',pos:'noun'},
  'табличка':{root:'lān',pos:'noun'},'храм':{root:'sen',pos:'noun'},
  'историк':{root:'xalur',pos:'noun'},'писец':{root:'khalur',pos:'noun'},
  'хранитель':{root:'lānīn',pos:'noun'},'архив':{root:'lānsen',pos:'noun'},
  'история':{root:'lānkhō',pos:'noun'},'культура':{root:'xalmar',pos:'noun'},
  'народ':{root:'mārīn',pos:'noun'},'книга':{root:'kitab',pos:'noun'},
  'письмо':{root:'khalur',pos:'noun'},'энциклопедия':{root:'tsankhō',pos:'noun'},
  'наука':{root:'tsankhō',pos:'noun'},'мир':{root:'nōkh',pos:'noun'},'война':{root:'mōrkhō',pos:'noun'},
  'кровь':{root:'marlān',pos:'noun'},
  // прилагательные
  'красный':{root:'khōn',pos:'adj'},'синий':{root:'ākhan',pos:'adj'},'зелёный':{root:'marn',pos:'adj'},
  'жёлтый':{root:'dzenk',pos:'adj'},'белый':{root:'lānk',pos:'adj'},'чёрный':{root:'kōln',pos:'adj'},
  'избранный':{root:'ari',pos:'adj'},'великий':{root:'suf',pos:'adj'},'великая':{root:'suf',pos:'adj'},
  'древний':{root:'xal',pos:'adj'},'мудрый':{root:'yar',pos:'adj'},'новый':{root:'khal',pos:'adj'},
  'старый':{root:'xal',pos:'adj'},'живой':{root:'mar',pos:'adj'},'мёртвый':{root:'mōr',pos:'adj'},
  'звёздный':{root:'dzen',pos:'adj'},'огненный':{root:'khō',pos:'adj'},
  'марсианский':{root:'marzān',pos:'adj'},'марсианская':{root:'marzān',pos:'adj'},
  'марсианские':{root:'marzān',pos:'adj'},'марсианской':{root:'marzān',pos:'adj'},
  'марсианского':{root:'marzān',pos:'adj'},'марсианским':{root:'marzān',pos:'adj'},
  // числительные
  'один':{root:'on',pos:'num'},'одна':{root:'on',pos:'num'},'два':{root:'dōn',pos:'num'},
  'две':{root:'dōn',pos:'num'},'три':{root:'tren',pos:'num'},'четыре':{root:'khen',pos:'num'},
  'пять':{root:'phin',pos:'num'},'десять':{root:'dzen-on',pos:'num'},'сто':{root:'dzen-phin',pos:'num'},
  // глаголы
  'смотреть':{root:'thal',pos:'verb'},'смотрю':{root:'thal',pos:'verb'},'смотрит':{root:'thal',pos:'verb'},
  'помнить':{root:'lān',pos:'verb'},'помню':{root:'lān',pos:'verb'},'помнит':{root:'lān',pos:'verb'},
  'знать':{root:'tsan',pos:'verb'},'знаю':{root:'tsan',pos:'verb'},'знает':{root:'tsan',pos:'verb'},
  'умирать':{root:'mōr',pos:'verb'},'умирает':{root:'mōr',pos:'verb'},'умираю':{root:'mōr',pos:'verb'},
  'жить':{root:'marlān',pos:'verb'},'живу':{root:'marlān',pos:'verb'},'живёт':{root:'marlān',pos:'verb'},
  'говорить':{root:'thalthu',pos:'verb'},'говорю':{root:'thalthu',pos:'verb'},'говорит':{root:'thalthu',pos:'verb'},
  'любить':{root:'lānmar',pos:'verb'},'люблю':{root:'lānmar',pos:'verb'},'любит':{root:'lānmar',pos:'verb'},
  'работать':{root:'xurmar',pos:'verb'},'работаю':{root:'xurmar',pos:'verb'},
  'идти':{root:'nur',pos:'verb'},'иду':{root:'nur',pos:'verb'},'идёт':{root:'nur',pos:'verb'},
  'быть':{root:'sen',pos:'verb'},'есть':{root:'sen',pos:'verb'},'был':{root:'sen',pos:'verb'},
  'думать':{root:'tsanur',pos:'verb'},'думаю':{root:'tsanur',pos:'verb'},
  'понимать':{root:'tsanlān',pos:'verb'},'понимаю':{root:'tsanlān',pos:'verb'},
  'строить':{root:'okhar',pos:'verb'},'строю':{root:'okhar',pos:'verb'},
  'создавать':{root:'khalur',pos:'verb'},'создаю':{root:'khalur',pos:'verb'},
  'видеть':{root:'thal',pos:'verb'},'вижу':{root:'thal',pos:'verb'},
  'слушать':{root:'thal',pos:'verb'},'слушаю':{root:'thal',pos:'verb'},
  'читать':{root:'thal',pos:'verb'},'читаю':{root:'thal',pos:'verb'},
  'писать':{root:'khōs',pos:'verb'},'пишу':{root:'khōs',pos:'verb'},
  'играть':{root:'thalur',pos:'verb'},'играю':{root:'thalur',pos:'verb'},
  'танцевать':{root:'thalur',pos:'verb'},'танцую':{root:'thalur',pos:'verb'},
  'петь':{root:'zalkhō',pos:'verb'},'пою':{root:'zalkhō',pos:'verb'},
  'летать':{root:'zalur',pos:'verb'},'летаю':{root:'zalur',pos:'verb'},
  'пить':{root:'khōr',pos:'verb'},'пью':{root:'khōr',pos:'verb'},
  'спать':{root:'sūl',pos:'verb'},'сплю':{root:'sūl',pos:'verb'},
  // союзы и частицы
  'и':{root:'un',pos:'conj'},'но':{root:'kan',pos:'conj'},'не':{root:'ān',pos:'particle'},
  'нет':{root:'ān',pos:'particle'},'когда':{root:'tsen',pos:'conj'},
  // наречия
  'очень':{root:'suf',pos:'adv'},'всегда':{root:'sen',pos:'adv'},'теперь':{root:'amār',pos:'adv'},
  'сегодня':{root:'sōl',pos:'adv'},'завтра':{root:'dzenur',pos:'adv'},
  // топонимы
  'марс':{root:'Mars',pos:'noun'},'марса':{root:'Mars',pos:'noun'},'марсу':{root:'Mars',pos:'noun'},
  'фобос':{root:'Phobos',pos:'noun'},'деймос':{root:'Deimos',pos:'noun'},
  'окхасен':{root:'Okhasen',pos:'noun'},'ксанф':{root:'Ksanf',pos:'noun'},
  'эдем':{root:'Eden',pos:'noun'},'утопия':{root:'Utopiya',pos:'noun'},
  'олимп':{root:'Olympus',pos:'noun'},'тарсис':{root:'Tarsis',pos:'noun'},
  'фарсида':{root:'Khōsen',pos:'noun'},'эллада':{root:'Ellada',pos:'noun'},
  // имена персонажей
  'хевсур':{root:'Khevsur',pos:'noun'},'талин':{root:'Talīn',pos:'noun'},
  'йарра':{root:'Yarra',pos:'noun'},'элла':{root:'Ella',pos:'noun'},
  'аратан':{root:'Aratan',pos:'noun'},'араш':{root:'Arash',pos:'noun'},
  'кан':{root:'Kan',pos:'noun'},'сарум':{root:'Sarum',pos:'noun'},
  'алира':{root:'Alira',pos:'noun'},'совия':{root:'Soviya',pos:'noun'},
  'мнемис':{root:'Lānsur',pos:'noun'}
}, NEW_WORDS);

/* ═══════════════════════════════════════════════════════════
   ИЕРОГЛИФЫ
   ═══════════════════════════════════════════════════════════ */
var GLYPHS = {
  'm':'▭•••','n':'▭••','r':'⊙','l':'○','k':'▷','g':'◁','kh':'△','gh':'▽',
  't':'|','d':'—','ts':'✖','dz':'ⴕ','th':'/','f':'Ꙙ','x':'♢',
  's':'Ꝉ','z':'I','p':'p','b':'b','v':'v','y':'Y','c':'ꝇ','j':'꜡','q':'Ꚛ',
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

/* ═══════════════════════════════════════════════════════════
   ЛЕММАТИЗАЦИЯ
   ═══════════════════════════════════════════════════════════ */
var ENDINGS = ['иями','иях','ией','иям','ием','ами','ями','ах','ях','ой','ей',
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
  var variants=[stem+'а',stem+'я',stem+'о',stem+'е',stem+'ь',stem+'ий',stem+'ая',
                stem+'ать',stem+'ять',stem+'еть',stem+'ить',stem+'ыть',stem+'уть'];
  for(var i=0;i<variants.length;i++){
    if(LEXICON[variants[i]])return{found:true,entry:LEXICON[variants[i]],lemma:variants[i]};
  }
  return{found:false};
}

/* ═══════════════════════════════════════════════════════════
   АВТО-ГЕНЕРАЦИЯ
   ═══════════════════════════════════════════════════════════ */
var MORPHEMES={
  'вод':'ākha','земл':'kōl','огн':'khō','звезд':'dzen','звёзд':'dzen','косм':'dzen','неб':'dzen',
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
  'люб':'lānmar','дума':'tsanur','поним':'tsanlān','академ':'tsan-sen','библиот':'lan-sen'
};
var TRANS={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z',
  'и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s',
  'т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y',
  'ь':'','э':'e','ю':'yu','я':'ya'};

function translit(w){
  var r='';
  for(var i=0;i<w.length;i++)r+=TRANS[w[i]]||w[i];
  return r;
}
function stylize(w){
  w=w.replace(/aa/g,'ā').replace(/oo/g,'ō').replace(/uu/g,'ū').replace(/ee/g,'ē').replace(/ii/g,'ī');
  if(w.endsWith('a'))w=w.slice(0,-1)+'ā';
  else if(w.endsWith('o'))w=w.slice(0,-1)+'ō';
  else if(w.endsWith('u'))w=w.slice(0,-1)+'ū';
  if(w.length>10)w=w.slice(0,10);
  return w;
}
function findMorph(w){
  var best=null,bl=0;
  for(var m in MORPHEMES){
    if(w.indexOf(m)===0 && m.length>bl){best=MORPHEMES[m];bl=m.length;}
  }
  if(best)return best;
  for(var m2 in MORPHEMES){
    if(m2.length>=4 && w.indexOf(m2)!==-1)return MORPHEMES[m2];
  }
  return null;
}
function generateRoot(word){
  var stem=stripEnding(word);
  var mars=findMorph(stem)||findMorph(word);
  if(mars)return mars;
  return stylize(translit(stem));
}

/* ═══════════════════════════════════════════════════════════
   EN → RU
   ═══════════════════════════════════════════════════════════ */
function isEnglishText(text){
  var words=text.toLowerCase().split(/\s+/).filter(function(w){return w.length>0});
  if(!words.length)return false;
  var enCount=0;
  words.forEach(function(w){
    var clean=w.replace(/[^a-z]/g,'');
    if(clean.length>1 && EN_RU[clean])enCount++;
    else if(/^[a-z]+$/.test(clean) && clean.length>2)enCount+=0.5;
  });
  return enCount/words.length > 0.4;
}

function translateEnToRu(text){
  var words=text.split(/(\s+)/);
  var translated=[];
  var dictionary={};
  words.forEach(function(part){
    if(/^\s+$/.test(part)){translated.push(part);return}
    var clean=part.replace(/[^a-zA-Z']/g,'').toLowerCase();
    if(EN_RU[clean]){
      translated.push(EN_RU[clean]);
      dictionary[clean]=EN_RU[clean];
    }else{
      translated.push(part);
    }
  });
  return{text:translated.join(''),dictionary:dictionary};
}

/* ═══════════════════════════════════════════════════════════
   ОСНОВНОЙ ПЕРЕВОД
   ═══════════════════════════════════════════════════════════ */
var PREPOSITIONS=['на','в','у','к','от','из','для','без','через','по','о','об','с','со','за','под','над','перед','между','возле','около','мимо','вокруг'];

function checkPhrase(text){
  var lower=text.toLowerCase().replace(/[.,!?;:]/g,'').trim();
  var norm=lower.replace(/ё/g,'е');
  // Проверяем все фразы, начиная с самых длинных
  var keys=Object.keys(PHRASES).sort(function(a,b){return b.length-a.length});
  for(var i=0;i<keys.length;i++){
    var k=keys[i].replace(/ё/g,'е');
    if(norm===k || norm.indexOf(k)!==-1 && k.length>5){
      if(norm===k)return{found:true,translation:PHRASES[keys[i]]};
    }
  }
  return{found:false};
}

function doTranslate(){
  var inputEl=document.getElementById('t-input');
  var input=inputEl.value.trim();
  if(!input)return;

  var btn=document.getElementById('t-translate-btn');
  btn.classList.add('loading');
  btn.disabled=true;

  setTimeout(function(){
    var result=performTranslation(input);
    btn.classList.remove('loading');
    btn.disabled=false;
    showResult(result);
  },150);
}

function performTranslation(input){
  // 1. Определяем язык
  var isEn=isEnglishText(input);
  var ruText=input;
  var enDict={};
  if(isEn){
    var enRes=translateEnToRu(input);
    ruText=enRes.text;
    enDict=enRes.dictionary;
  }

  // 2. Проверяем фразы
  var phraseRes=checkPhrase(ruText);

  // 3. Токенизация
  var rawWords=ruText.split(/\s+/).filter(function(w){return w.length>0});
  var processed=[],unknown=[];

  if(phraseRes.found){
    return{
      input:input,
      ruText:ruText,
      isEn:isEn,
      enDict:enDict,
      translation:phraseRes.translation,
      processed:[],
      unknown:[],
      isPhrase:true
    };
  }

  rawWords.forEach(function(w){
    var clean=w.replace(/[^а-яa-zё]/gi,'').toLowerCase().replace(/ё/g,'е');
    if(PREPOSITIONS.indexOf(clean)!==-1)return;
    if(clean.length<1)return;
    var res=findInLexicon(clean);
    if(res.found){
      processed.push({word:w,root:res.entry.root,pos:res.entry.pos});
    }else{
      var gen=generateRoot(clean);
      processed.push({word:w,root:gen,pos:'generated'});
      unknown.push(w+'>'+gen);
    }
  });

  if(processed.length===0){
    return{
      input:input,ruText:ruText,isEn:isEn,enDict:enDict,
      translation:'',processed:[],unknown:[],
      error:'Нет слов для перевода'
    };
  }

  // 4. Порядок SOV
  var verb=null,verbIdx=-1;
  for(var i=0;i<processed.length;i++){
    if(processed[i].pos==='verb'){verbIdx=i;verb=processed[i];break;}
  }
  var subject=verbIdx!==-1?processed.slice(0,verbIdx):processed;
  var objects=verbIdx!==-1?processed.slice(verbIdx+1):[];
  var resultWords=[];
  subject.forEach(function(w){resultWords.push(w.root)});
  objects.forEach(function(w){resultWords.push(w.root)});
  if(verb)resultWords.push(verb.root);

  // 5. Отрицание
  var hasNeg=rawWords.some(function(w){
    var c=w.replace(/[^а-яa-zё]/gi,'').toLowerCase().replace(/ё/g,'е');
    return c==='не'||c==='нет';
  });
  if(hasNeg && verb){
    var idx=resultWords.indexOf(verb.root);
    if(idx!==-1)resultWords.splice(idx+1,0,'ān');
  }

  // 6. Вопрос
  if(input.indexOf('?')!==-1)resultWords.push('kha');

  // 7. Время
  var lower=ruText.toLowerCase();
  if((lower.indexOf('был')!==-1||lower.indexOf('была')!==-1||lower.indexOf('были')!==-1) && verb){
    var idx2=resultWords.indexOf(verb.root);
    if(idx2!==-1){
      var p=idx2+1;
      if(resultWords[p]==='ān')p++;
      resultWords.splice(p,0,'nu');
    }
  }
  if((lower.indexOf('будет')!==-1||lower.indexOf('будут')!==-1) && verb){
    var idx3=resultWords.indexOf(verb.root);
    if(idx3!==-1){
      var p2=idx3+1;
      if(resultWords[p2]==='ān')p2++;
      resultWords.splice(p2,0,'shu');
    }
  }

  // 8. Модальность
  var modals={'могу':'xan','может':'xan','можешь':'xan','хочу':'shar','хочет':'shar',
    'хочешь':'shar','должен':'mun','должна':'mun','должны':'mun'};
  for(var k in modals){
    if(lower.indexOf(k)!==-1 && verb){
      var idx4=resultWords.indexOf(verb.root);
      if(idx4!==-1)resultWords[idx4]=verb.root+modals[k];
      break;
    }
  }

  return{
    input:input,
    ruText:ruText,
    isEn:isEn,
    enDict:enDict,
    translation:resultWords.join(' '),
    processed:processed,
    unknown:unknown,
    isPhrase:false
  };
}

/* ═══════════════════════════════════════════════════════════
   UI
   ═══════════════════════════════════════════════════════════ */
var showGlyphs=false;

function showResult(result){
  var resultEl=document.getElementById('t-result');
  var glossEl=document.getElementById('t-gloss');
  var glossBlock=document.getElementById('t-gloss-block');
  var actions=document.getElementById('t-actions');

  if(result.error){
    resultEl.textContent=result.error;
    resultEl.classList.remove('placeholder');
    glossBlock.style.display='none';
    actions.style.display='none';
    return;
  }

  var displayText=showGlyphs?toGlyphs(result.translation):result.translation;
  resultEl.innerHTML=displayText +
    (result.isEn?'<span class="t-trans-hint">🇬🇧 English → 🇷🇺 Русский → 🪐 Марсианский</span>':'');
  resultEl.classList.remove('placeholder');

  // Gloss
  var parts=[];
  if(result.isEn && Object.keys(result.enDict).length>0){
    var enParts=[];
    for(var k in result.enDict){
      enParts.push('<span class="t-gloss-en">'+k+'</span>→'+result.enDict[k]);
    }
    parts.push('<span class="t-gloss-tag">EN→RU</span>'+enParts.join(' · '));
  }
  if(result.processed.length>0){
    parts.push(result.processed.map(function(p){
      return p.word+'→'+p.root;
    }).join(' '));
  }
  if(result.isPhrase){
    parts.unshift('<span class="t-gloss-tag">Готовая фраза</span>');
  }
  if(parts.length){
    glossEl.innerHTML=parts.join('<br>');
    glossBlock.style.display='block';
  }else{
    glossBlock.style.display='none';
  }

  actions.style.display='flex';

  // Сохраняем в историю
  saveHistory(result);
  updateStats();
}

/* ═══════════════════════════════════════════════════════════
   ИСТОРИЯ
   ═══════════════════════════════════════════════════════════ */
function getHistory(){
  try{
    var h=localStorage.getItem(STORAGE_KEY);
    return h?JSON.parse(h):[];
  }catch(e){return[]}
}
function saveHistory(result){
  if(!result.translation)return;
  var h=getHistory();
  h.unshift({
    ts:Date.now(),
    input:result.input.slice(0,100),
    ru:result.ruText.slice(0,100),
    mars:result.translation,
    isEn:result.isEn
  });
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
      '<div class="t-history-info">'+
        '<div class="t-history-ru">'+escapeHtml(item.ru)+'</div>'+
        '<div class="t-history-mars">'+escapeHtml(item.mars)+'</div>'+
      '</div>'+
      '<div class="t-history-time">'+ts+'</div>'+
    '</div>';
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

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */
function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g,function(m){
    return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}
function toast(msg,type){
  type=type||'info';
  var el=document.getElementById('t-toast');
  el.className='t-toast '+type;
  el.textContent=msg;
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t=setTimeout(function(){
    el.classList.remove('show');
    el.classList.add('hide');
    setTimeout(function(){el.classList.remove('hide')},400);
  },2400);
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
  // Языковой тег
  var tag=document.getElementById('t-lang-tag');
  if(!input.trim()){
    tag.textContent='🌐 RU / EN';
    tag.className='t-lang-tag';
  }else if(isEnglishText(input)){
    tag.textContent='🇬🇧 English';
    tag.className='t-lang-tag detected-en';
  }else{
    tag.textContent='🇷🇺 Русский';
    tag.className='t-lang-tag detected-ru';
  }
}
function updateStats(){
  var h=getHistory();
  document.getElementById('t-stat-translations').textContent=h.length;
  document.getElementById('t-stat-words').textContent=Object.keys(LEXICON).length.toLocaleString('ru-RU');
  document.getElementById('t-stat-en').textContent=Object.keys(EN_RU).length;
  document.getElementById('t-stat-phrases').textContent=Object.keys(PHRASES).length;
}

/* ═══════════════════════════════════════════════════════════
   BINDINGS
   ═══════════════════════════════════════════════════════════ */
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
  if(showGlyphs){
    btn.textContent='📝 Латиница';
    btn.classList.remove('accent');
    btn.classList.add('secondary');
  }else{
    btn.textContent='🔮 Иероглифы';
    btn.classList.remove('secondary');
    btn.classList.add('accent');
  }
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
  if(navigator.share){
    navigator.share({title:'Марсианский перевод',text:text,url:url}).catch(function(){});
  }else{
    copyToClipboard(url);
    toast('🔗 Ссылка скопирована','success');
  }
};

document.getElementById('t-more').onclick=doTranslate;

document.getElementById('t-history-clear').onclick=clearHistory;

function copyToClipboard(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){
      toast('✅ Скопировано','success');
      var btn=document.getElementById('t-copy');
      btn.classList.add('copied');
      btn.textContent='✅ Скопировано';
      setTimeout(function(){
        btn.classList.remove('copied');
        btn.textContent='📋 Копировать';
      },1800);
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

// Input
document.getElementById('t-input').addEventListener('input',updateCounter);
document.getElementById('t-input').addEventListener('keydown',function(e){
  if(e.key==='Enter' && (e.ctrlKey||e.metaKey)){
    e.preventDefault();
    doTranslate();
  }
});

// Examples
document.querySelectorAll('.t-example').forEach(function(btn){
  btn.onclick=function(){
    document.getElementById('t-input').value=btn.dataset.example;
    updateCounter();
    doTranslate();
  };
});

// URL params
(function(){
  try{
    var p=new URLSearchParams(location.search);
    var q=p.get('q');
    if(q){
      document.getElementById('t-input').value=q;
      updateCounter();
      setTimeout(doTranslate,300);
    }
  }catch(e){}
})();

// INIT
updateCounter();
renderHistory();
updateStats();
console.log('🪐 Переводчик v2 VIP. Слов: '+Object.keys(LEXICON).length+', EN: '+Object.keys(EN_RU).length+', Фраз: '+Object.keys(PHRASES).length);

})();
</script>
