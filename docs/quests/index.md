---
title: Квесты
comments: false
---

<div id="qst-app">
    <div class="qst-loading">
        <div class="qst-spinner"></div>
        <p>Загрузка квестов...</p>
    </div>
</div>

<style>
/* ═══════════════════ ROOT ═══════════════════ */
:root{
    --qst-k:#6C63FF;
    --qst-k-light:#A29BFE;
    --qst-k-bg:#F0F4FF;
    --qst-k-shadow:rgba(108,99,255,.25);
}
#qst-app{
    max-width: 1080px;
    margin: 0 auto;
    font-family: -apple-system,'Segoe UI',Roboto,sans-serif;
    padding: 0 8px 60px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
}
#qst-app a{text-decoration:none!important;border-bottom:none!important}

@keyframes qstSpin{to{transform:rotate(360deg)}}
@keyframes qstFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes qstSlideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes qstPop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes qstPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes qstFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes qstShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes qstBarFill{from{width:0}}
@keyframes qstCheckPop{
    0%{transform:scale(0) rotate(-180deg)}
    70%{transform:scale(1.3) rotate(10deg)}
    100%{transform:scale(1) rotate(0)}
}
@keyframes qstConfetti{
    0%{transform:translateY(-100vh) rotate(0);opacity:1}
    100%{transform:translateY(100vh) rotate(720deg);opacity:0}
}
@keyframes qstToastIn{from{transform:translate(-50%,-200px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
@keyframes qstToastOut{from{transform:translate(-50%,0);opacity:1}to{transform:translate(-50%,-200px);opacity:0}}
@keyframes qstBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes qstStar{
    0%,100%{opacity:.3;transform:scale(1)}
    50%{opacity:1;transform:scale(1.3)}
}

.qst-fade{animation:qstFadeIn .5s cubic-bezier(.16,1,.3,1) both}

/* ═══════════════════ LOADING ═══════════════════ */
.qst-loading{text-align:center;padding:80px 20px}
.qst-spinner{
    display:inline-block;width:52px;height:52px;
    border:4px solid var(--qst-k-shadow);
    border-top-color:var(--qst-k);
    border-radius:50%;
    animation:qstSpin .8s linear infinite;
}
.qst-loading p{color:#999;margin-top:16px;font-size:.9rem;font-weight:700}

/* ═══════════════════ HERO ═══════════════════ */
.qst-hero{
    position:relative;
    background:linear-gradient(135deg,#0f0f1e 0%,#1a1a2e 40%,#2d1b3d 70%,#0f3460 100%);
    border-radius:24px;
    padding:40px 32px 36px;
    color:#fff;
    margin-bottom:20px;
    overflow:hidden;
    box-shadow:0 24px 80px -16px rgba(0,0,0,.6), 0 0 80px var(--qst-k-shadow) inset;
    text-align:center;
}
.qst-hero-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.qst-star{
    position:absolute;width:2px;height:2px;
    background:#fff;border-radius:50%;
    box-shadow:0 0 6px #fff;
    animation:qstStar 3s ease-in-out infinite;
}
.qst-star:nth-child(1){top:15%;left:10%;animation-delay:0s}
.qst-star:nth-child(2){top:25%;left:28%;animation-delay:.5s;width:1.5px;height:1.5px}
.qst-star:nth-child(3){top:70%;left:18%;animation-delay:1s}
.qst-star:nth-child(4){top:40%;left:78%;animation-delay:1.5s}
.qst-star:nth-child(5){top:80%;left:88%;animation-delay:.7s;width:1.5px;height:1.5px}
.qst-star:nth-child(6){top:25%;left:60%;animation-delay:1.2s}
.qst-star:nth-child(7){top:60%;left:45%;animation-delay:.3s}
.qst-star:nth-child(8){top:50%;left:92%;animation-delay:1.7s}

.qst-hero::before{
    content:'';position:absolute;
    top:-50%;right:-20%;
    width:600px;height:600px;border-radius:50%;
    background:radial-gradient(circle,var(--qst-k-shadow),transparent 70%);
    animation:qstFloat 10s ease-in-out infinite;
    pointer-events:none;
}
.qst-hero::after{
    content:'';position:absolute;
    bottom:-40%;left:-15%;
    width:500px;height:500px;border-radius:50%;
    background:radial-gradient(circle,rgba(243,156,18,.15),transparent 70%);
    animation:qstFloat 12s ease-in-out infinite reverse;
    pointer-events:none;
}
.qst-hero-content{position:relative;z-index:3;max-width:640px;margin:0 auto}
.qst-hero-icon{
    font-size:4rem;margin-bottom:10px;
    display:inline-block;
    animation:qstPulse 3s ease-in-out infinite;
    filter:drop-shadow(0 8px 32px var(--qst-k-shadow));
}
.qst-hero-title{
    font-size:2.1rem;font-weight:900;
    margin:0 0 10px;letter-spacing:-.5px;
    background:linear-gradient(90deg,#fff,var(--qst-k-light),#f5d76e,#fff);
    background-size:200% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    animation:qstShine 5s linear infinite;
}
.qst-hero-sub{font-size:.95rem;opacity:.88;margin:0 0 22px;line-height:1.6}

.qst-hero-stats{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(110px,1fr));
    gap:10px;
    margin-bottom:20px;
}
.qst-hero-stat{
    padding:12px 10px;
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(10px);
    border:1px solid rgba(255,255,255,.18);
    border-radius:14px;
}
.qst-hero-stat-value{
    font-size:1.5rem;font-weight:900;line-height:1;
    background:linear-gradient(135deg,#fff,var(--qst-k-light));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    font-variant-numeric:tabular-nums;
}
.qst-hero-stat-label{
    font-size:.66rem;color:rgba(255,255,255,.7);
    text-transform:uppercase;letter-spacing:1px;
    font-weight:800;margin-top:4px;
}

.qst-hero-progress{max-width:520px;margin:0 auto}
.qst-progress-info{
    display:flex;justify-content:space-between;
    font-size:.82rem;margin-bottom:8px;
    opacity:.95;font-weight:800;
}
.qst-progress-bar{
    background:rgba(255,255,255,.15);
    border-radius:12px;height:18px;
    overflow:hidden;backdrop-filter:blur(8px);
    position:relative;
    border:1px solid rgba(255,255,255,.1);
}
.qst-progress-fill{
    height:100%;
    background:linear-gradient(90deg,var(--qst-k),var(--qst-k-light),#fff);
    background-size:200% auto;
    border-radius:12px;
    transition:width 1.5s cubic-bezier(.16,1,.3,1);
    box-shadow:0 0 20px var(--qst-k-shadow);
    position:relative;overflow:hidden;
    animation:qstShine 3s linear infinite;
}
.qst-progress-fill::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);
    background-size:200% 100%;
    animation:qstShine 2s linear infinite;
}

/* ═══════════════════ TOOLBAR ═══════════════════ */
.qst-toolbar{
    display:flex;gap:8px;flex-wrap:wrap;align-items:center;
    padding:12px 16px;
    background:rgba(255,255,255,.85);
    backdrop-filter:blur(12px);
    border-radius:14px;
    border:1px solid rgba(0,0,0,.05);
    box-shadow:0 4px 12px rgba(0,0,0,.04);
    margin-bottom:16px;
}
.qst-toolbar-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center;width:100%}
.qst-toolbar-label{
    font-size:.72rem;color:#888;text-transform:uppercase;
    letter-spacing:1px;font-weight:800;margin-right:2px;
}
.qst-chip{
    padding:7px 14px;border-radius:30px;
    border:2px solid transparent;
    background:rgba(0,0,0,.04);
    color:#666;font-size:.8rem;font-weight:800;
    cursor:pointer;font-family:inherit;
    display:inline-flex;align-items:center;gap:5px;
    transition:all .25s cubic-bezier(.16,1,.3,1);
    white-space:nowrap;
}
.qst-chip:hover{background:rgba(0,0,0,.07);color:#333;transform:translateY(-1px)}
.qst-chip.active{
    background:linear-gradient(135deg,var(--qst-k),var(--qst-k-light));
    color:#fff;
    box-shadow:0 6px 16px -4px var(--qst-k-shadow);
}
.qst-chip-count{
    font-size:.7rem;
    padding:1px 7px;border-radius:10px;
    background:rgba(255,255,255,.25);
    font-weight:900;margin-left:2px;
}
.qst-chip:not(.active) .qst-chip-count{
    background:rgba(0,0,0,.08);
}

.qst-search-wrap{
    flex:1;min-width:200px;position:relative;
    display:flex;align-items:center;
}
.qst-search{
    width:100%;padding:10px 36px 10px 36px;
    border-radius:30px;
    border:2px solid rgba(0,0,0,.08);
    font-size:.88rem;font-family:inherit;
    outline:none;background:#fff;
    transition:all .2s;box-sizing:border-box;
}
.qst-search:focus{
    border-color:var(--qst-k);
    box-shadow:0 0 0 4px var(--qst-k-shadow);
}
.qst-search-icon{
    position:absolute;left:12px;top:50%;
    transform:translateY(-50%);
    pointer-events:none;color:#999;font-size:.9rem;
}
.qst-search-clear{
    position:absolute;right:8px;top:50%;
    transform:translateY(-50%);
    width:22px;height:22px;border-radius:50%;
    background:rgba(0,0,0,.08);border:none;
    cursor:pointer;font-family:inherit;font-size:.75rem;
    color:#666;display:none;
    align-items:center;justify-content:center;
    padding:0;
}
.qst-search-clear:hover{background:rgba(0,0,0,.15)}
.qst-search-wrap.has-value .qst-search-clear{display:flex}

/* ═══════════════════ GRID ═══════════════════ */
.qst-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(340px,1fr));
    gap:16px;
    margin-bottom:24px;
}

/* ═══════════════════ CARD ═══════════════════ */
.qst-card{
    position:relative;
    background:rgba(255,255,255,.9);
    backdrop-filter:blur(12px);
    border-radius:20px;
    border:2px solid rgba(0,0,0,.05);
    padding:22px 22px 20px;
    transition:all .4s cubic-bezier(.16,1,.3,1);
    overflow:hidden;
    animation:qstFadeIn .5s ease both;
    display:flex;flex-direction:column;
    cursor:pointer;
    font-family:inherit;
    text-align:left;
    color:inherit;
}
.qst-card::before{
    content:'';position:absolute;
    top:0;left:0;right:0;height:5px;
    background:linear-gradient(90deg,var(--qst-k),var(--qst-k-light));
    opacity:.4;
    transition:opacity .3s;
}
.qst-card:hover{
    transform:translateY(-6px);
    box-shadow:0 20px 48px -12px var(--qst-k-shadow);
    border-color:var(--qst-k);
}
.qst-card:hover::before{opacity:1}
.qst-card.completed{
    border-color:#27ae60;
    background:linear-gradient(135deg,rgba(39,174,96,.05),rgba(255,255,255,.95));
}
.qst-card.completed::before{
    background:linear-gradient(90deg,#27ae60,#16a085);
    opacity:1;
}
.qst-card.completed:hover{
    box-shadow:0 20px 48px -12px rgba(39,174,96,.4);
    border-color:#27ae60;
}

.qst-card-head{
    display:flex;align-items:flex-start;gap:14px;
    margin-bottom:14px;
}
.qst-card-icon{
    font-size:2.6rem;flex-shrink:0;
    filter:drop-shadow(0 4px 8px rgba(0,0,0,.15));
    transition:transform .35s cubic-bezier(.34,1.56,.64,1);
    line-height:1;
}
.qst-card:hover .qst-card-icon{transform:scale(1.15) rotate(-8deg)}
.qst-card-title-wrap{flex:1;min-width:0}
.qst-card-title{
    font-size:1.05rem;font-weight:900;
    color:#1a1a1a;margin:0 0 4px;
    letter-spacing:-.3px;line-height:1.25;
}
.qst-card-desc{
    font-size:.82rem;color:#777;
    line-height:1.4;margin:0;
}
.qst-card-status{
    position:absolute;top:16px;right:16px;
    display:inline-flex;align-items:center;gap:4px;
    padding:5px 12px;border-radius:20px;
    font-size:.68rem;font-weight:800;
    letter-spacing:.4px;text-transform:uppercase;
    background:linear-gradient(135deg,var(--qst-k),var(--qst-k-light));
    color:#fff;
    box-shadow:0 4px 12px -2px var(--qst-k-shadow);
}
.qst-card-status.completed{
    background:linear-gradient(135deg,#27ae60,#16a085);
    box-shadow:0 4px 12px -2px rgba(39,174,96,.4);
}
.qst-card-status.locked{
    background:rgba(0,0,0,.06);
    color:#888;box-shadow:none;
}

/* ═══════════════════ STEPS ═══════════════════ */
.qst-steps{margin:14px 0;flex:1}
.qst-step{
    display:flex;align-items:center;gap:12px;
    padding:9px 0;
    position:relative;
    transition:all .3s;
}
.qst-step::before{
    content:'';position:absolute;
    left:15px;top:34px;bottom:-8px;
    width:2px;background:rgba(0,0,0,.08);
    transition:background .3s;
}
.qst-step:last-child::before{display:none}
.qst-step.done::before{background:#27ae60}

.qst-step-check{
    width:30px;height:30px;border-radius:50%;
    background:rgba(0,0,0,.06);
    display:flex;align-items:center;justify-content:center;
    font-size:.85rem;flex-shrink:0;
    transition:all .3s;
    font-weight:900;color:#999;
    border:2px solid transparent;
}
.qst-step.done .qst-step-check{
    background:linear-gradient(135deg,#27ae60,#16a085);
    color:#fff;border-color:#27ae60;
    animation:qstCheckPop .5s ease;
    box-shadow:0 4px 12px -2px rgba(39,174,96,.4);
}

.qst-step-body{flex:1;min-width:0}
.qst-step-title{
    font-size:.88rem;font-weight:800;
    color:#333;margin-bottom:2px;
    transition:color .3s;
}
.qst-step.done .qst-step-title{
    color:#27ae60;
    text-decoration:line-through;
    text-decoration-color:rgba(39,174,96,.4);
}
.qst-step-desc{font-size:.72rem;color:#999;line-height:1.35}

/* ═══════════════════ CARD FOOTER ═══════════════════ */
.qst-card-footer{
    margin-top:14px;padding-top:14px;
    border-top:1px dashed rgba(0,0,0,.08);
    display:flex;align-items:center;
    justify-content:space-between;
    flex-wrap:wrap;gap:10px;
}
.qst-reward{display:flex;gap:6px;flex-wrap:wrap}
.qst-reward-badge{
    display:inline-flex;align-items:center;gap:4px;
    padding:5px 11px;border-radius:20px;
    background:linear-gradient(135deg,rgba(243,156,18,.15),rgba(230,126,34,.1));
    color:#e67e22;font-size:.74rem;font-weight:800;
}
.qst-reward-badge.ach{
    background:linear-gradient(135deg,var(--qst-k-shadow),rgba(162,155,254,.1));
    color:var(--qst-k);
}
.qst-card-progress{
    display:flex;align-items:center;gap:8px;
    font-size:.78rem;font-weight:800;
    color:var(--qst-k);
}
.qst-card-progress-bar{
    width:56px;height:6px;border-radius:3px;
    background:rgba(0,0,0,.06);
    overflow:hidden;
}
.qst-card-progress-fill{
    height:100%;
    background:linear-gradient(90deg,var(--qst-k),var(--qst-k-light));
    transition:width 1s cubic-bezier(.16,1,.3,1);
}

/* ═══════════════════ EMPTY ═══════════════════ */
.qst-empty{
    text-align:center;padding:60px 20px;
    background:linear-gradient(135deg,rgba(255,255,255,.6),rgba(255,255,255,.9));
    border-radius:20px;
    border:2px dashed var(--qst-k-shadow);
}
.qst-empty-icon{font-size:4rem;opacity:.5;margin-bottom:14px;line-height:1}
.qst-empty-title{font-size:1.05rem;font-weight:800;color:#666;margin-bottom:10px}
.qst-empty-sub{font-size:.85rem;color:#888;line-height:1.6;max-width:360px;margin:0 auto 16px}

/* ═══════════════════ MODAL ═══════════════════ */
.qst-modal-bg{
    position:fixed;inset:0;z-index:99999;
    background:rgba(10,10,26,.75);
    backdrop-filter:blur(8px);
    display:flex;align-items:center;justify-content:center;
    padding:20px;
    animation:qstFadeIn .3s ease;
    overflow-y:auto;
}
.qst-modal{
    background:#fff;
    max-width:620px;width:100%;
    border-radius:22px;
    padding:28px 26px 24px;
    position:relative;
    box-shadow:0 30px 80px rgba(0,0,0,.5);
    animation:qstPop .4s cubic-bezier(.16,1,.3,1);
    max-height:92vh;overflow-y:auto;
}
.qst-modal-close{
    position:absolute;top:14px;right:16px;
    width:34px;height:34px;border-radius:50%;
    background:rgba(0,0,0,.05);border:none;
    font-size:1.1rem;cursor:pointer;color:#666;
    display:flex;align-items:center;justify-content:center;
    transition:all .2s;font-family:inherit;
}
.qst-modal-close:hover{
    background:rgba(0,0,0,.1);
    transform:rotate(90deg);
}
.qst-modal-head{
    display:flex;align-items:flex-start;gap:14px;
    margin-bottom:16px;
    padding-bottom:16px;
    border-bottom:2px dashed rgba(0,0,0,.08);
}
.qst-modal-icon{
    font-size:3.4rem;flex-shrink:0;
    filter:drop-shadow(0 6px 14px rgba(0,0,0,.2));
    line-height:1;
}
.qst-modal-title{
    font-size:1.4rem;font-weight:900;
    color:#1a1a1a;margin:0 0 6px;
    letter-spacing:-.4px;line-height:1.2;
}
.qst-modal-desc{
    font-size:.9rem;color:#666;line-height:1.5;
    margin:0;
}
.qst-modal-reward{
    display:flex;gap:8px;flex-wrap:wrap;
    margin-top:10px;
}
.qst-modal-steps{
    margin-bottom:18px;
}
.qst-modal-steps-title{
    font-size:.78rem;color:#888;
    text-transform:uppercase;letter-spacing:1px;
    font-weight:800;margin:0 0 10px;
}
.qst-modal-step{
    display:flex;align-items:center;gap:12px;
    padding:11px 14px;
    background:rgba(0,0,0,.02);
    border-radius:12px;
    margin-bottom:6px;
    border-left:3px solid transparent;
    transition:all .2s;
    cursor:pointer;
}
.qst-modal-step:hover{
    background:rgba(108,99,255,.06);
    border-left-color:var(--qst-k);
    transform:translateX(3px);
}
.qst-modal-step.done{
    background:rgba(39,174,96,.06);
    border-left-color:#27ae60;
}
.qst-modal-step-num{
    width:28px;height:28px;border-radius:50%;
    background:rgba(0,0,0,.05);
    display:flex;align-items:center;justify-content:center;
    font-size:.78rem;font-weight:900;color:#888;
    flex-shrink:0;
}
.qst-modal-step.done .qst-modal-step-num{
    background:linear-gradient(135deg,#27ae60,#16a085);
    color:#fff;
}
.qst-modal-step-info{flex:1;min-width:0}
.qst-modal-step-title{
    font-size:.9rem;font-weight:800;
    color:#333;margin-bottom:2px;
}
.qst-modal-step.done .qst-modal-step-title{
    color:#27ae60;
    text-decoration:line-through;
    text-decoration-color:rgba(39,174,96,.4);
}
.qst-modal-step-desc{
    font-size:.74rem;color:#999;
    line-height:1.35;
}
.qst-modal-step-link{
    font-size:.7rem;color:var(--qst-k);
    font-weight:800;padding:4px 10px;
    border-radius:12px;
    background:rgba(108,99,255,.1);
    flex-shrink:0;
    text-decoration:none!important;
}
.qst-modal-step-link:hover{
    background:var(--qst-k);color:#fff;
}
.qst-modal-actions{
    display:flex;gap:10px;flex-wrap:wrap;
    padding-top:16px;
    border-top:1px solid rgba(0,0,0,.06);
}
.qst-btn{
    flex:1;min-width:140px;
    padding:12px 18px;border-radius:14px;
    border:none;font-size:.88rem;font-weight:800;
    cursor:pointer;font-family:inherit;
    display:inline-flex;align-items:center;
    justify-content:center;gap:6px;
    transition:all .25s cubic-bezier(.16,1,.3,1);
    text-decoration:none!important;
}
.qst-btn.primary{
    background:linear-gradient(135deg,var(--qst-k),var(--qst-k-light));
    color:#fff;
    box-shadow:0 8px 20px -4px var(--qst-k-shadow);
}
.qst-btn.primary:hover{
    transform:translateY(-2px);
    box-shadow:0 12px 28px -6px var(--qst-k-shadow);
}
.qst-btn.secondary{
    background:rgba(0,0,0,.05);color:#666;
}
.qst-btn.secondary:hover{background:rgba(0,0,0,.08)}
.qst-btn.success{
    background:linear-gradient(135deg,#27ae60,#16a085);
    color:#fff;box-shadow:0 8px 20px -4px rgba(39,174,96,.4);
}

/* ═══════════════════ TOAST ═══════════════════ */
.qst-toast{
    position:fixed;bottom:30px;left:50%;
    transform:translateX(-50%) translateY(100px);
    padding:12px 26px;border-radius:30px;
    color:#fff;font-weight:800;font-size:.9rem;
    box-shadow:0 12px 32px rgba(0,0,0,.3);
    z-index:2147483647;
    pointer-events:none;max-width:90vw;text-align:center;
    opacity:0;
}
.qst-toast.show{
    animation:qstToastIn .4s cubic-bezier(.16,1,.3,1) forwards;
    opacity:1;
}
.qst-toast.hide{animation:qstToastOut .3s ease forwards}
.qst-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.qst-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.qst-toast.warning{background:linear-gradient(135deg,#e67e22,#d35400)}
.qst-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}

/* ═══════════════════ COMPLETION CELEBRATION ═══════════════════ */
.qst-completion-toast{
    position:fixed;top:80px;left:50%;
    transform:translateX(-50%) translateY(-200px);
    background:linear-gradient(135deg,#27ae60,#16a085);
    color:#fff;
    padding:18px 28px;border-radius:20px;
    box-shadow:0 20px 60px -12px rgba(39,174,96,.6);
    z-index:99999;
    display:flex;align-items:center;gap:14px;
    font-weight:800;
    transition:transform .6s cubic-bezier(.16,1,.3,1);
    max-width:90%;
    opacity:0;
}
.qst-completion-toast.show{
    transform:translateX(-50%) translateY(0);
    opacity:1;
}
.qst-completion-icon{
    font-size:2.4rem;
    animation:qstBounce .6s ease infinite;
    line-height:1;
}
.qst-completion-title{
    font-size:1rem;margin-bottom:2px;
}
.qst-completion-text{
    font-size:.82rem;opacity:.92;font-weight:600;
}

.qst-confetti{
    position:fixed;inset:0;
    pointer-events:none;z-index:99998;
    overflow:hidden;
}
.qst-confetti-piece{
    position:absolute;
    width:10px;height:14px;
    animation:qstConfetti 3s linear forwards;
    border-radius:2px;
    will-change:transform;
}

/* ═══════════════════ SCROLL TOP ═══════════════════ */
.qst-scroll-top{
    position:fixed;bottom:24px;right:24px;
    width:48px;height:48px;border-radius:50%;
    background:linear-gradient(135deg,var(--qst-k),var(--qst-k-light));
    color:#fff;border:none;cursor:pointer;
    font-size:1.15rem;font-family:inherit;
    box-shadow:0 12px 32px -4px var(--qst-k-shadow);
    display:none;align-items:center;justify-content:center;
    z-index:100;
    transition:all .3s cubic-bezier(.16,1,.3,1);
    opacity:0;
}
.qst-scroll-top.show{display:flex;opacity:1;animation:qstPop .3s ease}
.qst-scroll-top:hover{transform:translateY(-4px) scale(1.05)}

/* ═══════════════════ DARK MODE ═══════════════════ */
@media (prefers-color-scheme: dark){
    html body.mars-stars-on .qst-card,
    html body.mars-stars-on .qst-toolbar,
    html body.mars-stars-on .qst-empty,
    html body.mars-stars-on .qst-modal{
        background:rgba(20,20,42,.9);
        border-color:rgba(108,99,255,.3);
        color:#e0e0f0;
    }
    html body.mars-stars-on .qst-card-title,
    html body.mars-stars-on .qst-modal-title{color:#e0e0f0}
    html body.mars-stars-on .qst-card-desc,
    html body.mars-stars-on .qst-modal-desc{color:#aaa}
    html body.mars-stars-on .qst-step-title{color:#d0d0d0}
    html body.mars-stars-on .qst-chip{background:rgba(255,255,255,.06);color:#aaa}
    html body.mars-stars-on .qst-chip:hover{background:rgba(255,255,255,.12);color:#fff}
    html body.mars-stars-on .qst-search{background:#252550;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
    html body.mars-stars-on .qst-card.completed{
        background:linear-gradient(135deg,rgba(39,174,96,.08),rgba(30,30,46,.95));
    }
    html body.mars-stars-on .qst-modal-step{background:rgba(255,255,255,.03)}
    html body.mars-stars-on .qst-modal-step:hover{background:rgba(108,99,255,.1)}
    html body.mars-stars-on .qst-modal-step-title{color:#e0e0f0}
}

/* ═══════════════════ MOBILE ═══════════════════ */
@media (max-width: 640px){
    .qst-hero{padding:30px 20px 26px;border-radius:18px}
    .qst-hero-title{font-size:1.55rem}
    .qst-hero-icon{font-size:3rem}
    .qst-hero-stats{grid-template-columns:repeat(2,1fr)}
    .qst-hero-stat{padding:10px 8px}
    .qst-hero-stat-value{font-size:1.25rem}
    .qst-grid{grid-template-columns:1fr;gap:12px}
    .qst-card{padding:18px 16px 16px;border-radius:16px}
    .qst-card-icon{font-size:2.2rem}
    .qst-card-title{font-size:.95rem}
    .qst-card-desc{font-size:.78rem}
    .qst-step-title{font-size:.82rem}
    .qst-step-desc{font-size:.68rem}
    .qst-card-status{top:12px;right:12px;padding:4px 10px;font-size:.6rem}
    .qst-modal{padding:22px 18px;border-radius:16px}
    .qst-modal-title{font-size:1.15rem}
    .qst-modal-icon{font-size:2.8rem}
    .qst-modal-step{padding:9px 10px}
    .qst-modal-step-num{width:24px;height:24px;font-size:.7rem}
    .qst-modal-step-title{font-size:.82rem}
    .qst-modal-step-desc{font-size:.68rem}
    .qst-modal-step-link{display:none}
    .qst-toolbar{padding:10px 12px;border-radius:12px}
    .qst-chip{padding:6px 11px;font-size:.75rem}
    .qst-search{font-size:.82rem;padding:8px 32px}
    .qst-toolbar-label{font-size:.66rem}
    .qst-scroll-top{width:42px;height:42px;bottom:20px;right:16px}
    .qst-btn{min-width:120px;font-size:.82rem}
}

@media (prefers-reduced-motion: reduce){
    #qst-app *,
    #qst-app *::before,
    #qst-app *::after{
        animation-duration:.01ms!important;
        animation-iteration-count:1!important;
        transition-duration:.01ms!important;
    }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function(){
'use strict';

if (window.__qstLoaded) return;
window.__qstLoaded = true;

/* ═══════════════════ SUPABASE ═══════════════════ */
var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var sb = null;
try{
    if (window.supabase && window.supabase.createClient){
        sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
}catch(e){ console.warn('Supabase init', e); }

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

/* ═══════════════════ CATEGORIES ═══════════════════ */
var CATEGORIES = {
    'geography':   { icon:'🗺️', name:'География' },
    'history':     { icon:'📜', name:'История' },
    'astronomy':   { icon:'🔭', name:'Астрономия' },
    'people':      { icon:'👤', name:'Персонажи' },
    'reading':     { icon:'📖', name:'Чтение' },
    'quiz':        { icon:'🧠', name:'Викторины' },
    'exploration': { icon:'🧭', name:'Исследование' },
    'streak':      { icon:'🔥', name:'Постоянство' }
};

/* ═══════════════════ QUESTS ═══════════════════ */
var QUESTS = [
    {
        id:'sea-traveler', icon:'🌊', title:'Путешествие к морям',
        desc:'Изучи все водоёмы Марса и стань настоящим мореплавателем',
        category:'geography', reward_xp:200, reward_achievement:7,
        steps:[
            { id:'sea-1', title:'Найти Ацидалийское море', desc:'Прочитай статью об Ацидалийском море', check:'visit', value:'geography/acidalia-sea', link:'/geography/acidalia-sea/' },
            { id:'sea-2', title:'Найти море Аргида', desc:'Прочитай статью о море Аргида', check:'visit', value:'geography/argida', link:'/geography/argida/' },
            { id:'sea-3', title:'Изучить воду на Марсе', desc:'Узнай, откуда на Марсе вода', check:'visit', value:'water-on-mars', link:'/water-on-mars/' },
            { id:'sea-4', title:'Разобраться в каналах', desc:'Прочитай о каналах и ирригации', check:'visit', value:'technology/canals', link:'/technology/canals/' }
        ]
    },
    {
        id:'historian', icon:'📜', title:'Путь историка',
        desc:'Разберись в хронологии Марса — от начала времён до Эпохи Умирания',
        category:'history', reward_xp:150, reward_achievement:19,
        steps:[
            { id:'hist-1', title:'Изучить периодизацию', desc:'Открой статью о периодах истории', check:'visit', value:'history/periodization', link:'/history/periodization/' },
            { id:'hist-2', title:'Пройти по хронологии', desc:'Открой статью с хронологией событий', check:'visit', value:'history/timeline', link:'/history/timeline/' },
            { id:'hist-3', title:'Познать мифы', desc:'Прочитай мифы древнего Марса', check:'visit', value:'history/myths', link:'/history/myths/' },
            { id:'hist-4', title:'Узнать об Эпохе Умирания', desc:'Прочитай статью про закат цивилизации', check:'visit', value:'history/dying-era', link:'/history/dying-era/' }
        ]
    },
    {
        id:'astronomer', icon:'🔭', title:'Путь астронома',
        desc:'Познай звёздное небо Марса и его место во Вселенной',
        category:'astronomy', reward_xp:150, reward_achievement:18,
        steps:[
            { id:'ast-1', title:'Изучить спутники', desc:'Узнай о Фобосе и Деймосе', check:'visit', value:'astronomy/phobos-deimos', link:'/astronomy/phobos-deimos/' },
            { id:'ast-2', title:'Найти звёздное небо', desc:'Открой карту звёздного неба Марса', check:'visit', value:'astronomy/mars-sky', link:'/astronomy/mars-sky/' },
            { id:'ast-3', title:'Увидеть Землю', desc:'Прочитай о Земле как цели', check:'visit', value:'astronomy/earth-as-target', link:'/astronomy/earth-as-target/' }
        ]
    },
    {
        id:'character-knower', icon:'👤', title:'Знакомство с героями',
        desc:'Узнай всех ключевых персонажей вселенной',
        category:'people', reward_xp:200, reward_achievement:null,
        steps:[
            { id:'char-1', title:'Найти Хевсура', desc:'Прочитай о хранителе знаний', check:'visit', value:'people/hevsur', link:'/people/hevsur/' },
            { id:'char-2', title:'Встретить Талина', desc:'Познакомься с молодым астрономом', check:'visit', value:'people/talin', link:'/people/talin/' },
            { id:'char-3', title:'Узнать Йарру', desc:'Прочитай о мудрой женщине', check:'visit', value:'people/yarra', link:'/people/yarra/' },
            { id:'char-4', title:'Познакомиться с Эллой', desc:'Узнай о могущественной жрице', check:'visit', value:'people/ella', link:'/people/ella/' },
            { id:'char-5', title:'Встретить Алиру', desc:'Узнай о повелительнице морей', check:'visit', value:'people/alira', link:'/people/alira/' }
        ]
    },
    {
        id:'reader', icon:'📖', title:'Хранитель знаний',
        desc:'Прочитай 10 статей энциклопедии — от географии до религии',
        category:'reading', reward_xp:100, reward_achievement:2,
        steps:[
            { id:'read-1', title:'Первые 3 статьи', desc:'Прочитай 3 любые статьи', check:'articles_count', value:3 },
            { id:'read-2', title:'Уже 5 статей!', desc:'Прочитай 5 статей', check:'articles_count', value:5 },
            { id:'read-3', title:'Половина пути', desc:'Прочитай 7 статей', check:'articles_count', value:7 },
            { id:'read-4', title:'Хранитель знаний', desc:'Прочитай 10 статей', check:'articles_count', value:10 }
        ]
    },
    {
        id:'quiz-master', icon:'🧠', title:'Знаток викторин',
        desc:'Пройди все 4 викторины на любые результаты',
        category:'quiz', reward_xp:200, reward_achievement:3,
        steps:[
            { id:'quiz-1', title:'Первая викторина', desc:'Пройди 1 викторину', check:'quizzes_count', value:1 },
            { id:'quiz-2', title:'Две викторины', desc:'Пройди 2 викторины', check:'quizzes_count', value:2 },
            { id:'quiz-3', title:'Три викторины', desc:'Пройди 3 викторины', check:'quizzes_count', value:3 },
            { id:'quiz-4', title:'Мастер викторин', desc:'Пройди все 4 викторины', check:'quizzes_count', value:4 }
        ]
    },
    {
        id:'explorer', icon:'🗺️', title:'Исследователь Марса',
        desc:'Посети 15 уникальных мест на карте Марса',
        category:'exploration', reward_xp:300, reward_achievement:16,
        steps:[
            { id:'exp-1', title:'5 мест', desc:'Посети 5 уникальных мест', check:'places_count', value:5 },
            { id:'exp-2', title:'10 мест', desc:'Посети 10 уникальных мест', check:'places_count', value:10 },
            { id:'exp-3', title:'15 мест', desc:'Посети 15 уникальных мест', check:'places_count', value:15 }
        ]
    },
    {
        id:'consistent', icon:'🔥', title:'Постоянство',
        desc:'Заходи на сайт 7 дней подряд',
        category:'streak', reward_xp:250, reward_achievement:9,
        steps:[
            { id:'str-1', title:'3 дня подряд', desc:'Заходи 3 дня подряд', check:'streak', value:3 },
            { id:'str-2', title:'5 дней подряд', desc:'Заходи 5 дней подряд', check:'streak', value:5 },
            { id:'str-3', title:'7 дней подряд', desc:'Заходи 7 дней подряд', check:'streak', value:7 }
        ]
    }
];

/* ═══════════════════ STATE ═══════════════════ */
var state = {
    currentUser: null,
    profile: null,
    kingdom: KINGDOMS['Эдем'],
    stats: { articles:0, places:0, quizzes:0, streak:0, xp:0 },
    visitedSlugs: {},
    completedSteps: {},
    completedQuests: {},
    filter: 'all',
    category: 'all',
    search: '',
    modalQuestId: null,
    busy: false
};

/* ═══════════════════ UTILS ═══════════════════ */
function esc(s){
    return String(s||'').replace(/[&<>"']/g,function(m){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
    });
}
function escAttr(s){
    return String(s||'').replace(/['"\\<>]/g,function(m){
        return {"'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e'}[m];
    });
}
function toast(msg, type){
    type = type || 'info';
    var old = document.querySelector('.qst-toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'qst-toast ' + type;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('show'); });
    setTimeout(function(){
        t.classList.remove('show');
        t.classList.add('hide');
        setTimeout(function(){ t.remove(); }, 400);
    }, 2400);
}
function vibrate(p){ try{ if (navigator.vibrate) navigator.vibrate(p); }catch(e){} }

/* ═══════════════════ AUDIO ═══════════════════ */
var audioCtx = null, audioUnlocked = false;
function getCtx(){
    if (!audioUnlocked) return null;
    try{
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume().catch(function(){});
    }catch(e){ return null; }
    return audioCtx;
}
function unlock(){
    if (audioUnlocked) return;
    function un(){
        try{
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            audioUnlocked = true;
        }catch(e){}
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
    try{
        var o = c.createOscillator(), g = c.createGain();
        o.type = type || 'sine';
        o.frequency.value = f;
        g.gain.setValueAtTime(0, c.currentTime);
        g.gain.linearRampToValueAtTime(vol || 0.08, c.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
        o.connect(g); g.connect(c.destination);
        o.start(); o.stop(c.currentTime + dur);
    }catch(e){}
}
function sfxStep(){ note(880, 0.1, 'triangle', 0.07); }
function sfxComplete(){
    [523, 659, 783, 1046].forEach(function(f,i){
        setTimeout(function(){ note(f, 0.3, 'triangle', 0.11); }, i * 100);
    });
}
function sfxOpen(){ note(520, 0.08, 'sine', 0.05); }

/* ═══════════════════ CONFETTI ═══════════════════ */
function fireConfetti(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var wrap = document.createElement('div');
    wrap.className = 'qst-confetti';
    document.body.appendChild(wrap);
    var colors = ['#f39c12','#e74c3c','#3498db','#27ae60','#9b59b6','#f5d76e','#A29BFE','#16a085'];
    for (var i = 0; i < 60; i++){
        var p = document.createElement('div');
        p.className = 'qst-confetti-piece';
        p.style.left = Math.random() * 100 + '%';
        p.style.background = colors[i % colors.length];
        p.style.animationDelay = (Math.random() * 0.6) + 's';
        p.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
        if (Math.random() > 0.5) p.style.borderRadius = '50%';
        wrap.appendChild(p);
    }
    setTimeout(function(){ wrap.remove(); }, 4500);
}

/* ═══════════════════ DOM ═══════════════════ */
var container = document.getElementById('qst-app');

/* ═══════════════════ LOAD DATA ═══════════════════ */
async function loadAll(){
    if (!sb) return;

    try{
        var s = await sb.auth.getSession();
        state.currentUser = s && s.data && s.data.session ? s.data.session.user : null;
    }catch(e){}

    if (!state.currentUser){
        state.stats = { articles:0, places:0, quizzes:0, streak:0, xp:0 };
        return;
    }

    try{
        var pr = await sb.from('profiles').select('*').eq('user_id', state.currentUser.id).single();
        state.profile = pr && pr.data;
        if (state.profile && KINGDOMS[state.profile.kingdom]){
            state.kingdom = KINGDOMS[state.profile.kingdom];
        }
    }catch(e){}

    // Visits
    var visits = [];
    try{
        var vr = await sb.from('user_visits').select('place_id').eq('user_id', state.currentUser.id);
        visits = (vr && vr.data) || [];
    }catch(e){
        try{
            var vr2 = await sb.from('article_views').select('article_slug').eq('user_id', state.currentUser.id);
            visits = (vr2 && vr2.data || []).map(function(v){ return { place_id: v.article_slug }; });
        }catch(e2){}
    }

    state.visitedSlugs = {};
    var uniquePlaces = {};
    visits.forEach(function(v){
        var slug = v.place_id || v.article_slug;
        if (!slug) return;
        state.visitedSlugs[slug] = true;
        // И нормализованное (последняя часть)
        var parts = String(slug).split('/');
        state.visitedSlugs[parts[parts.length-1]] = true;
        // Нормализация без префикса географии
        parts.forEach(function(p){ state.visitedSlugs[p] = true; });
        uniquePlaces[slug] = true;
    });

    // Quizzes
    var quizzesCount = 0;
    try{
        var qr = await sb.from('user_quizzes').select('quiz_id').eq('user_id', state.currentUser.id).eq('passed', true);
        quizzesCount = (qr && qr.data || []).length;
    }catch(e){}

    // Streak
    var streak = 0;
    try{
        var lr = await sb.from('daily_logins').select('streak').eq('user_id', state.currentUser.id).order('login_date',{ascending:false}).limit(1);
        streak = (lr && lr.data && lr.data[0] && lr.data[0].streak) || 0;
    }catch(e){}

    state.stats = {
        articles: visits.length,
        places: Object.keys(uniquePlaces).length,
        quizzes: quizzesCount,
        streak: streak,
        xp: (state.profile && state.profile.experience) || 0
    };

    // Completed steps
    state.completedSteps = {};
    try{
        var sp = await sb.from('user_quests_progress').select('quest_id, step_id').eq('user_id', state.currentUser.id);
        (sp && sp.data || []).forEach(function(x){
            state.completedSteps[x.quest_id + ':' + x.step_id] = true;
        });
    }catch(e){}

    // Completed quests
    state.completedQuests = {};
    try{
        var qc = await sb.from('user_quests_completed').select('quest_id').eq('user_id', state.currentUser.id);
        (qc && qc.data || []).forEach(function(x){ state.completedQuests[x.quest_id] = true; });
    }catch(e){}
}

/* ═══════════════════ CHECK STEP ═══════════════════ */
function isStepCompleted(quest, step){
    if (state.completedSteps[quest.id + ':' + step.id]) return true;
    if (!state.currentUser) return false;

    switch (step.check){
        case 'visit':
            var v = String(step.value);
            var last = v.split('/').pop();
            return !!(state.visitedSlugs[v] || state.visitedSlugs[last]);
        case 'articles_count':
            return state.stats.articles >= step.value;
        case 'quizzes_count':
            return state.stats.quizzes >= step.value;
        case 'places_count':
            return state.stats.places >= step.value;
        case 'streak':
            return state.stats.streak >= step.value;
        default:
            return false;
    }
}

/* ═══════════════════ SAVE ═══════════════════ */
async function saveStep(questId, stepId){
    if (!state.currentUser || !sb) return;
    try{
        await sb.from('user_quests_progress').insert([{
            user_id: state.currentUser.id,
            quest_id: questId,
            step_id: stepId
        }]);
        state.completedSteps[questId + ':' + stepId] = true;
    }catch(e){}
}

async function saveQuestCompleted(quest){
    if (!state.currentUser || !sb) return;
    try{
        await sb.from('user_quests_completed').insert([{
            user_id: state.currentUser.id,
            quest_id: quest.id,
            reward_xp: quest.reward_xp
        }]);
        state.completedQuests[quest.id] = true;

        // Начисляем XP
        try{
            var pr = await sb.from('profiles').select('experience').eq('user_id', state.currentUser.id).single();
            var curXp = (pr && pr.data && pr.data.experience) || 0;
            var newXp = curXp + quest.reward_xp;
            await sb.from('profiles').update({ experience: newXp }).eq('user_id', state.currentUser.id);
            state.stats.xp = newXp;
        }catch(e){}

        // Достижение
        if (quest.reward_achievement){
            try{
                await sb.from('user_achievements').insert([{
                    user_id: state.currentUser.id,
                    achievement_id: quest.reward_achievement
                }]);
            }catch(e){}
        }
    }catch(e){}
}

/* ═══════════════════ CHECK ALL ═══════════════════ */
async function checkAllQuests(){
    if (!state.currentUser) return [];
    var newly = [];
    for (var i = 0; i < QUESTS.length; i++){
        var quest = QUESTS[i];
        if (state.completedQuests[quest.id]) continue;
        var allDone = true;
        for (var j = 0; j < quest.steps.length; j++){
            var step = quest.steps[j];
            var done = isStepCompleted(quest, step);
            if (done && !state.completedSteps[quest.id + ':' + step.id]){
                await saveStep(quest.id, step.id);
            }
            if (!done) allDone = false;
        }
        if (allDone && !state.completedQuests[quest.id]){
            await saveQuestCompleted(quest);
            newly.push(quest);
        }
    }
    return newly;
}

/* ═══════════════════ SHOW COMPLETION ═══════════════════ */
function showCompletion(quest){
    var t = document.createElement('div');
    t.className = 'qst-completion-toast';
    t.innerHTML =
        '<div class="qst-completion-icon">🎉</div>' +
        '<div>' +
            '<div class="qst-completion-title">Квест завершён!</div>' +
            '<div class="qst-completion-text">' + esc(quest.icon) + ' ' + esc(quest.title) + ' · +' + quest.reward_xp + ' XP</div>' +
        '</div>';
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('show'); });
    sfxComplete();
    fireConfetti();
    vibrate([40, 60, 40]);
    setTimeout(function(){
        t.classList.remove('show');
        setTimeout(function(){ t.remove(); }, 600);
    }, 4000);
}

/* ═══════════════════ AGGREGATION ═══════════════════ */
function getFilteredQuests(){
    var arr = QUESTS.slice();

    if (state.filter === 'active'){
        arr = arr.filter(function(q){ return !state.completedQuests[q.id]; });
    } else if (state.filter === 'completed'){
        arr = arr.filter(function(q){ return state.completedQuests[q.id]; });
    }

    if (state.category !== 'all'){
        arr = arr.filter(function(q){ return q.category === state.category; });
    }

    if (state.search){
        var q = state.search.toLowerCase();
        arr = arr.filter(function(quest){
            return quest.title.toLowerCase().indexOf(q) !== -1 ||
                   quest.desc.toLowerCase().indexOf(q) !== -1;
        });
    }

    return arr;
}

/* ═══════════════════ RENDER ═══════════════════ */
function applyTheme(){
    var k = state.kingdom;
    var root = document.documentElement;
    root.style.setProperty('--qst-k', k.color);
    root.style.setProperty('--qst-k-light', k.light);
    root.style.setProperty('--qst-k-bg', k.bg);
    root.style.setProperty('--qst-k-shadow', k.color + '40');
}

function render(){
    applyTheme();

    var totalQuests = QUESTS.length;
    var doneQuests = QUESTS.filter(function(q){ return state.completedQuests[q.id]; }).length;
    var overallPercent = totalQuests > 0 ? Math.round((doneQuests / totalQuests) * 100) : 0;
    var totalXpEarned = QUESTS.filter(function(q){ return state.completedQuests[q.id]; })
        .reduce(function(s,q){ return s + q.reward_xp; }, 0);
    var totalXpMax = QUESTS.reduce(function(s,q){ return s + q.reward_xp; }, 0);

    var filtered = getFilteredQuests();

    container.innerHTML =
        renderHero(doneQuests, totalQuests, overallPercent, totalXpEarned) +
        renderToolbar() +
        (filtered.length === 0 ? renderEmpty() : '<div class="qst-grid">' + filtered.map(renderCard).join('') + '</div>') +
        '<button class="qst-scroll-top" id="qst-scroll-top" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">↑</button>';
    bindScrollTop();
}

function renderHero(done, total, percent, xpEarned){
    var starsHtml = '';
    for (var i = 0; i < 8; i++) starsHtml += '<div class="qst-star"></div>';

    var isLoggedIn = !!state.currentUser;

    return '<div class="qst-hero qst-fade">' +
        '<div class="qst-hero-stars">' + starsHtml + '</div>' +
        '<div class="qst-hero-content">' +
            '<div class="qst-hero-icon">🗺️</div>' +
            '<h1 class="qst-hero-title">Квесты Марса</h1>' +
            '<p class="qst-hero-sub">' +
                (isLoggedIn ? 'Проходи цепочки заданий и получай награды!' : 'Войдите, чтобы начать приключение') +
            '</p>' +
            (isLoggedIn
                ? '<div class="qst-hero-stats">' +
                    heroStat(state.stats.articles, '📖 Статей') +
                    heroStat(state.stats.places, '🗺️ Мест') +
                    heroStat(state.stats.quizzes, '🧠 Викторин') +
                    heroStat(state.stats.streak, '🔥 Стрик') +
                    heroStat(xpEarned, '💎 XP') +
                  '</div>' +
                  '<div class="qst-hero-progress">' +
                    '<div class="qst-progress-info">' +
                        '<span>' + done + ' из ' + total + ' квестов</span>' +
                        '<span>' + percent + '%</span>' +
                    '</div>' +
                    '<div class="qst-progress-bar">' +
                        '<div class="qst-progress-fill" style="width:' + percent + '%"></div>' +
                    '</div>' +
                  '</div>'
                : '<a href="/login/" style="display:inline-flex;align-items:center;gap:6px;padding:12px 28px;border-radius:30px;background:#fff;color:var(--qst-k);font-weight:800;font-size:.9rem;text-decoration:none!important;box-shadow:0 12px 32px rgba(0,0,0,.25);">🔐 Войти</a>'
            ) +
        '</div>' +
    '</div>';
}

function heroStat(value, label){
    return '<div class="qst-hero-stat">' +
        '<div class="qst-hero-stat-value">' + value + '</div>' +
        '<div class="qst-hero-stat-label">' + label + '</div>' +
    '</div>';
}

function renderToolbar(){
    var total = QUESTS.length;
    var done = QUESTS.filter(function(q){ return state.completedQuests[q.id]; }).length;
    var active = total - done;

    var chips =
        '<button class="qst-chip ' + (state.filter === 'all' ? 'active' : '') + '" onclick="qstFilter(\'all\')">🌐 Все<span class="qst-chip-count">' + total + '</span></button>' +
        '<button class="qst-chip ' + (state.filter === 'active' ? 'active' : '') + '" onclick="qstFilter(\'active\')">⚔️ Активные<span class="qst-chip-count">' + active + '</span></button>' +
        '<button class="qst-chip ' + (state.filter === 'completed' ? 'active' : '') + '" onclick="qstFilter(\'completed\')">✅ Завершённые<span class="qst-chip-count">' + done + '</span></button>';

    var catChips = '<button class="qst-chip ' + (state.category === 'all' ? 'active' : '') + '" onclick="qstCategory(\'all\')">Все</button>';
    Object.keys(CATEGORIES).forEach(function(k){
        var c = CATEGORIES[k];
        var cnt = QUESTS.filter(function(q){ return q.category === k; }).length;
        if (cnt === 0) return;
        catChips += '<button class="qst-chip ' + (state.category === k ? 'active' : '') + '" onclick="qstCategory(\'' + k + '\')">' + c.icon + ' ' + esc(c.name) + '</button>';
    });

    return '<div class="qst-toolbar qst-fade" style="animation-delay:.1s;">' +
        '<div class="qst-toolbar-row">' +
            '<span class="qst-toolbar-label">Статус:</span>' + chips +
        '</div>' +
        '<div class="qst-toolbar-row" style="margin-top:8px;">' +
            '<span class="qst-toolbar-label">Категория:</span>' + catChips +
            '<div class="qst-search-wrap' + (state.search ? ' has-value' : '') + '" id="qst-search-wrap">' +
                '<span class="qst-search-icon">🔍</span>' +
                '<input class="qst-search" type="text" placeholder="Найти квест..." value="' + escAttr(state.search) + '" oninput="qstSearchInput(this.value)">' +
                '<button class="qst-search-clear" onclick="qstClearSearch()">✕</button>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function renderCard(quest, i){
    var isCompleted = !!state.completedQuests[quest.id];
    var doneSteps = 0;
    quest.steps.forEach(function(s){ if (isStepCompleted(quest, s)) doneSteps++; });
    var stepPercent = quest.steps.length > 0 ? Math.round(doneSteps / quest.steps.length * 100) : 0;
    var cat = CATEGORIES[quest.category] || { icon:'❔', name:'' };

    var statusHTML = '';
    if (isCompleted){
        statusHTML = '<span class="qst-card-status completed">✅ Завершён</span>';
    } else if (!state.currentUser){
        statusHTML = '<span class="qst-card-status locked">🔒 Войти</span>';
    } else if (doneSteps === 0){
        statusHTML = '<span class="qst-card-status">🆕 Новый</span>';
    } else {
        statusHTML = '<span class="qst-card-status">⚔️ В процессе</span>';
    }

    var stepsHtml = quest.steps.map(function(step){
        var done = isStepCompleted(quest, step);
        return '<div class="qst-step ' + (done ? 'done' : '') + '">' +
            '<div class="qst-step-check">' + (done ? '✓' : '') + '</div>' +
            '<div class="qst-step-body">' +
                '<div class="qst-step-title">' + esc(step.title) + '</div>' +
                '<div class="qst-step-desc">' + esc(step.desc) + '</div>' +
            '</div>' +
        '</div>';
    }).join('');

    return '<div class="qst-card ' + (isCompleted ? 'completed' : '') + ' qst-fade" ' +
        'style="animation-delay:' + Math.min(i * .04, .4) + 's;" ' +
        'onclick="qstOpenModal(\'' + escAttr(quest.id) + '\')">' +
        statusHTML +
        '<div class="qst-card-head">' +
            '<div class="qst-card-icon">' + quest.icon + '</div>' +
            '<div class="qst-card-title-wrap">' +
                '<h3 class="qst-card-title">' + esc(quest.title) + '</h3>' +
                '<p class="qst-card-desc">' + esc(quest.desc) + '</p>' +
            '</div>' +
        '</div>' +
        '<div class="qst-steps">' + stepsHtml + '</div>' +
        '<div class="qst-card-footer">' +
            '<div class="qst-reward">' +
                '<span class="qst-reward-badge">💎 +' + quest.reward_xp + ' XP</span>' +
                (quest.reward_achievement ? '<span class="qst-reward-badge ach">🏆 ' + cat.icon + ' Достижение</span>' : '') +
            '</div>' +
            '<div class="qst-card-progress">' +
                '<span>' + doneSteps + '/' + quest.steps.length + ' · ' + stepPercent + '%</span>' +
                '<div class="qst-card-progress-bar">' +
                    '<div class="qst-card-progress-fill" style="width:' + stepPercent + '%"></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function renderEmpty(){
    if (state.search){
        return '<div class="qst-empty">' +
            '<div class="qst-empty-icon">🔍</div>' +
            '<div class="qst-empty-title">Ничего не найдено</div>' +
            '<div class="qst-empty-sub">По запросу «' + esc(state.search) + '» квестов нет</div>' +
            '<button class="qst-chip active" onclick="qstClearSearch()">Сбросить поиск</button>' +
        '</div>';
    }
    if (state.filter === 'completed'){
        return '<div class="qst-empty">' +
            '<div class="qst-empty-icon">🏆</div>' +
            '<div class="qst-empty-title">Пока нет завершённых квестов</div>' +
            '<div class="qst-empty-sub">Начни проходить задания — и они появятся здесь</div>' +
            '<button class="qst-chip active" onclick="qstFilter(\'active\')">К активным</button>' +
        '</div>';
    }
    return '<div class="qst-empty">' +
        '<div class="qst-empty-icon">📜</div>' +
        '<div class="qst-empty-title">Пусто</div>' +
    '</div>';
}

/* ═══════════════════ MODAL ═══════════════════ */
function openModal(questId){
    if (!state.currentUser){
        toast('Войдите, чтобы открывать квесты', 'warning');
        return;
    }
    state.modalQuestId = questId;
    var quest = QUESTS.filter(function(q){ return q.id === questId; })[0];
    if (!quest) return;

    sfxOpen();

    var isCompleted = !!state.completedQuests[quest.id];
    var doneSteps = 0;
    quest.steps.forEach(function(s){ if (isStepCompleted(quest, s)) doneSteps++; });

    var stepsHtml = quest.steps.map(function(step, i){
        var done = isStepCompleted(quest, step);
        var hasLink = step.link && !done;
        return '<div class="qst-modal-step ' + (done ? 'done' : '') + '">' +
            '<div class="qst-modal-step-num">' + (done ? '✓' : (i+1)) + '</div>' +
            '<div class="qst-modal-step-info">' +
                '<div class="qst-modal-step-title">' + esc(step.title) + '</div>' +
                '<div class="qst-modal-step-desc">' + esc(step.desc) + '</div>' +
            '</div>' +
            (hasLink ? '<a href="' + escAttr(step.link) + '" class="qst-modal-step-link" onclick="event.stopPropagation()">Открыть →</a>' : '') +
        '</div>';
    }).join('');

    var overlay = document.createElement('div');
    overlay.className = 'qst-modal-bg';
    overlay.innerHTML =
        '<div class="qst-modal">' +
            '<button class="qst-modal-close" onclick="this.closest(\'.qst-modal-bg\').remove()">✕</button>' +
            '<div class="qst-modal-head">' +
                '<div class="qst-modal-icon">' + quest.icon + '</div>' +
                '<div style="flex:1;min-width:0;">' +
                    '<h2 class="qst-modal-title">' + esc(quest.title) + '</h2>' +
                    '<p class="qst-modal-desc">' + esc(quest.desc) + '</p>' +
                    '<div class="qst-modal-reward">' +
                        '<span class="qst-reward-badge">💎 +' + quest.reward_xp + ' XP</span>' +
                        (quest.reward_achievement ? '<span class="qst-reward-badge ach">🏆 Достижение</span>' : '') +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="qst-modal-steps">' +
                '<div class="qst-modal-steps-title">Шаги (' + doneSteps + '/' + quest.steps.length + ')</div>' +
                stepsHtml +
            '</div>' +
            '<div class="qst-modal-actions">' +
                (isCompleted
                    ? '<div class="qst-btn success" style="cursor:default;">✅ Завершено</div>'
                    : '<button class="qst-btn primary" onclick="qstCheckNow()">🔄 Проверить прогресс</button>'
                ) +
                '<button class="qst-btn secondary" onclick="this.closest(\'.qst-modal-bg\').remove()">Закрыть</button>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlay);
    overlay.onclick = function(e){
        if (e.target === overlay) overlay.remove();
    };
}

function closeModal(){
    var el = document.querySelector('.qst-modal-bg');
    if (el) el.remove();
}

/* ═══════════════════ SCROLL TOP ═══════════════════ */
function bindScrollTop(){
    var btn = document.getElementById('qst-scroll-top');
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
window.qstFilter = function(f){ state.filter = f; render(); };
window.qstCategory = function(c){ state.category = c; render(); };
window.qstOpenModal = openModal;
window.qstCheckNow = async function(){
    if (state.busy) return;
    state.busy = true;
    try{
        var newly = await checkAllQuests();
        closeModal();
        if (newly.length > 0){
            await loadAll();
            render();
            newly.forEach(function(q, i){
                setTimeout(function(){ showCompletion(q); }, i * 1200);
            });
        } else {
            toast('Прогресс проверен', 'info');
            render();
        }
    } catch(e){
        toast('Ошибка проверки', 'error');
    } finally {
        state.busy = false;
    }
};

var searchTimer;
window.qstSearchInput = function(v){
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function(){
        state.search = v;
        render();
        var inp = document.querySelector('.qst-search');
        if (inp){
            inp.focus();
            try{ inp.setSelectionRange(inp.value.length, inp.value.length); }catch(e){}
        }
    }, 250);
};
window.qstClearSearch = function(){
    state.search = '';
    render();
};

/* ═══════════════════ URL PARAMS ═══════════════════ */
function loadFromURL(){
    try{
        var p = new URLSearchParams(location.search);
        var f = p.get('filter');
        var c = p.get('cat');
        var s = p.get('q');
        if (['all','active','completed'].indexOf(f) !== -1) state.filter = f;
        if (c && (c === 'all' || CATEGORIES[c])) state.category = c;
        if (s) state.search = s;
    }catch(e){}
}

/* ═══════════════════ INIT ═══════════════════ */
async function init(){
    unlock();
    loadFromURL();

    // Skeleton
    container.innerHTML =
        '<div class="qst-loading">' +
            '<div class="qst-spinner"></div>' +
            '<p>Загрузка квестов...</p>' +
        '</div>';

    try{
        await loadAll();

        if (state.currentUser){
            var newly = await checkAllQuests();
            if (newly.length > 0){
                await loadAll();
                render();
                newly.forEach(function(q, i){
                    setTimeout(function(){ showCompletion(q); }, i * 1200);
                });
                console.log('✅ Завершено новых квестов: ' + newly.length);
                return;
            }
        }

        render();
        console.log('🗺️ Квесты v2 VIP. Всего: ' + QUESTS.length);
    } catch(e){
        console.error(e);
        container.innerHTML = '<div class="qst-empty" style="margin-top:40px;">' +
            '<div class="qst-empty-icon">⚠️</div>' +
            '<div class="qst-empty-title">Не удалось загрузить квесты</div>' +
            '<button class="qst-chip active" onclick="location.reload()">Попробовать снова</button>' +
        '</div>';
    }
}

if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
})();
</script>
