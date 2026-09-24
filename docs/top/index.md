---
title: 🏆 Топ статей
comments: false
---

<div id="top-app">
    <div class="top-loading">
        <div class="top-spinner"></div>
        <p>Считаем голоса...</p>
    </div>
</div>

<style>
/* ═══════════════════ ROOT ═══════════════════ */
:root{
    --top-k:#6C63FF;
    --top-k-light:#A29BFE;
    --top-k-bg:#F0F4FF;
    --top-k-shadow:rgba(108,99,255,.25);
}
#top-app{
    max-width: 1000px;
    margin: 0 auto;
    font-family: -apple-system,'Segoe UI',Roboto,sans-serif;
    padding: 0 8px 60px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
}
#top-app a{text-decoration:none!important;border-bottom:none!important}

@keyframes topSpin{to{transform:rotate(360deg)}}
@keyframes topFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes topSlideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes topPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes topFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes topShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes topGlow{0%,100%{box-shadow:0 0 30px var(--top-k-shadow)}50%{box-shadow:0 0 60px var(--top-k-shadow)}}
@keyframes topPop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes topCrown{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-6px) rotate(6deg)}}
@keyframes topBar{from{width:0}}
@keyframes topParticle{
    0%{transform:translate(0,0) scale(1);opacity:1}
    100%{transform:translate(var(--dx),var(--dy)) scale(.2);opacity:0}
}
@keyframes topToastIn{from{transform:translate(-50%,100px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
@keyframes topToastOut{from{transform:translate(-50%,0);opacity:1}to{transform:translate(-50%,100px);opacity:0}}
@keyframes topStar{
    0%,100%{opacity:.4;transform:scale(1)}
    50%{opacity:1;transform:scale(1.3)}
}

.top-fade{animation:topFadeIn .5s cubic-bezier(.16,1,.3,1) both}

/* ═══════════════════ LOADING ═══════════════════ */
.top-loading{text-align:center;padding:80px 20px}
.top-spinner{
    display:inline-block;width:52px;height:52px;
    border:4px solid var(--top-k-shadow);
    border-top-color:var(--top-k);
    border-radius:50%;
    animation:topSpin .8s linear infinite;
}
.top-loading p{color:#999;margin-top:16px;font-size:.9rem;font-weight:700}

/* ═══════════════════ HERO ═══════════════════ */
.top-hero{
    position:relative;
    background:linear-gradient(135deg,#0f0f1e 0%,#1a1a2e 40%,#2d1b3d 70%,#0f3460 100%);
    border-radius:24px;
    padding:40px 32px 36px;
    color:#fff;
    margin-bottom:20px;
    overflow:hidden;
    box-shadow:0 24px 80px -16px rgba(0,0,0,.6), 0 0 80px rgba(108,99,255,.15) inset;
    text-align:center;
}
.top-hero::before{
    content:'';
    position:absolute;top:-50%;right:-20%;
    width:600px;height:600px;border-radius:50%;
    background:radial-gradient(circle,rgba(162,155,254,.25),transparent 70%);
    animation:topFloat 10s ease-in-out infinite;
    pointer-events:none;
}
.top-hero::after{
    content:'';
    position:absolute;bottom:-40%;left:-15%;
    width:500px;height:500px;border-radius:50%;
    background:radial-gradient(circle,rgba(243,156,18,.15),transparent 70%);
    animation:topFloat 12s ease-in-out infinite reverse;
    pointer-events:none;
}
.top-hero-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.top-star{
    position:absolute;
    width:2px;height:2px;
    background:#fff;
    border-radius:50%;
    box-shadow:0 0 6px #fff;
    animation:topStar 3s ease-in-out infinite;
}
.top-star:nth-child(1){top:20%;left:8%;animation-delay:0s}
.top-star:nth-child(2){top:15%;left:25%;animation-delay:.5s;width:1.5px;height:1.5px}
.top-star:nth-child(3){top:70%;left:18%;animation-delay:1s}
.top-star:nth-child(4){top:40%;left:75%;animation-delay:1.5s}
.top-star:nth-child(5){top:80%;left:88%;animation-delay:.7s;width:1.5px;height:1.5px}
.top-star:nth-child(6){top:25%;left:60%;animation-delay:1.2s}
.top-star:nth-child(7){top:60%;left:45%;animation-delay:.3s}
.top-star:nth-child(8){top:50%;left:92%;animation-delay:1.7s;width:1.5px;height:1.5px}

.top-hero-content{position:relative;z-index:3;max-width:600px;margin:0 auto}
.top-hero-icon{
    font-size:4rem;margin-bottom:10px;
    display:inline-block;
    animation:topCrown 4s ease-in-out infinite;
    filter:drop-shadow(0 8px 32px rgba(243,156,18,.7));
}
.top-hero-title{
    font-size:2.1rem;font-weight:900;
    margin:0 0 10px;letter-spacing:-.5px;
    background:linear-gradient(90deg,#fff,#A29BFE,#f5d76e,#fff);
    background-size:200% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    animation:topShine 5s linear infinite;
}
.top-hero-sub{
    font-size:.95rem;opacity:.85;margin:0 0 20px;
    line-height:1.6;
}
.top-hero-stats{
    display:flex;justify-content:center;gap:12px;
    flex-wrap:wrap;
}
.top-hero-stat{
    padding:10px 18px;
    border-radius:14px;
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(10px);
    border:1px solid rgba(255,255,255,.18);
    min-width:100px;
}
.top-hero-stat-value{
    font-size:1.5rem;font-weight:900;
    line-height:1;
    background:linear-gradient(135deg,#fff,#A29BFE);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
}
.top-hero-stat-label{
    font-size:.66rem;color:rgba(255,255,255,.7);
    text-transform:uppercase;letter-spacing:1px;
    font-weight:800;margin-top:4px;
}

/* ═══════════════════ CONTROLS ═══════════════════ */
.top-controls{
    display:flex;gap:8px;flex-wrap:wrap;align-items:center;
    padding:12px 16px;
    background:rgba(255,255,255,.85);
    backdrop-filter:blur(12px);
    border-radius:14px;
    border:1px solid rgba(0,0,0,.05);
    box-shadow:0 4px 12px rgba(0,0,0,.04);
    margin-bottom:16px;
}
.top-controls-row{
    display:flex;gap:6px;flex-wrap:wrap;align-items:center;width:100%;
}
.top-controls-label{
    font-size:.72rem;color:#888;
    text-transform:uppercase;letter-spacing:1px;
    font-weight:800;margin-right:2px;
}
.top-chip{
    padding:7px 14px;
    border-radius:30px;
    border:2px solid transparent;
    background:rgba(0,0,0,.04);
    color:#666;font-size:.8rem;font-weight:800;
    cursor:pointer;font-family:inherit;
    display:inline-flex;align-items:center;gap:5px;
    transition:all .25s cubic-bezier(.16,1,.3,1);
    white-space:nowrap;
}
.top-chip:hover{background:rgba(0,0,0,.07);color:#333;transform:translateY(-1px)}
.top-chip.active{
    background:linear-gradient(135deg,var(--top-k),var(--top-k-light));
    color:#fff;
    box-shadow:0 6px 16px -4px var(--top-k-shadow);
}
.top-search-wrap{
    flex:1;min-width:200px;position:relative;
    display:flex;align-items:center;
}
.top-search{
    width:100%;
    padding:10px 36px 10px 36px;
    border-radius:30px;
    border:2px solid rgba(0,0,0,.08);
    font-size:.88rem;font-family:inherit;
    outline:none;background:#fff;
    transition:all .2s;box-sizing:border-box;
}
.top-search:focus{
    border-color:var(--top-k);
    box-shadow:0 0 0 4px var(--top-k-shadow);
}
.top-search-icon{
    position:absolute;left:12px;top:50%;
    transform:translateY(-50%);
    pointer-events:none;color:#999;font-size:.9rem;
}
.top-search-clear{
    position:absolute;right:8px;top:50%;
    transform:translateY(-50%);
    width:22px;height:22px;border-radius:50%;
    background:rgba(0,0,0,.08);border:none;
    cursor:pointer;font-family:inherit;font-size:.75rem;
    color:#666;display:none;
    align-items:center;justify-content:center;
    padding:0;
}
.top-search-clear:hover{background:rgba(0,0,0,.15)}
.top-search-wrap.has-value .top-search-clear{display:flex}

/* ═══════════════════ PODIUM (Top-3) ═══════════════════ */
.top-podium{
    display:grid;
    grid-template-columns:1fr 1.2fr 1fr;
    gap:12px;
    margin-bottom:24px;
    align-items:end;
}
.top-podium-card{
    position:relative;
    background:rgba(255,255,255,.9);
    backdrop-filter:blur(12px);
    border-radius:20px;
    padding:20px 16px;
    text-align:center;
    cursor:pointer;
    transition:all .4s cubic-bezier(.16,1,.3,1);
    border:2px solid var(--medal-color,var(--top-k));
    box-shadow:0 12px 32px -8px var(--medal-color,var(--top-k-shadow));
    overflow:hidden;
    animation:topFadeIn .6s cubic-bezier(.16,1,.3,1) both;
    font-family:inherit;
    color:inherit;
    text-decoration:none!important;
}
.top-podium-card:hover{
    transform:translateY(-8px) scale(1.02);
    box-shadow:0 24px 60px -12px var(--medal-color,var(--top-k-shadow));
}
.top-podium-card::before{
    content:'';
    position:absolute;
    inset:0;
    background:radial-gradient(circle at 50% 0%, var(--medal-color,var(--top-k)), transparent 70%);
    opacity:.08;
    pointer-events:none;
}
.top-podium-card.rank-1{
    --medal-color:#f5d76e;
    padding:28px 16px 22px;
    box-shadow:0 16px 40px -8px rgba(243,156,18,.5);
}
.top-podium-card.rank-2{--medal-color:#bdc3c7}
.top-podium-card.rank-3{--medal-color:#cd7f32}

.top-podium-medal{
    font-size:2.4rem;
    margin-bottom:8px;
    display:inline-block;
    animation:topCrown 3s ease-in-out infinite;
    filter:drop-shadow(0 6px 16px rgba(0,0,0,.25));
    line-height:1;
}
.top-podium-card.rank-1 .top-podium-medal{font-size:3rem}
.top-podium-icon{
    font-size:2rem;
    margin-bottom:8px;
    line-height:1;
}
.top-podium-name{
    font-size:.92rem;
    font-weight:900;
    color:#1a1a1a;
    line-height:1.25;
    margin-bottom:8px;
    word-break:break-word;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
    overflow:hidden;
    min-height:52px;
    letter-spacing:-.3px;
}
.top-podium-card.rank-1 .top-podium-name{
    font-size:1rem;min-height:56px;
}
.top-podium-likes{
    font-size:.82rem;
    font-weight:900;
    color:var(--medal-color,var(--top-k));
    letter-spacing:.3px;
    display:flex;align-items:center;
    justify-content:center;gap:4px;
}
.top-podium-pct{
    font-size:.7rem;
    color:#888;
    font-weight:700;
    margin-top:4px;
}

/* ═══════════════════ LIST ═══════════════════ */
.top-list{display:flex;flex-direction:column;gap:10px}

.top-item{
    display:flex;align-items:center;gap:14px;
    padding:16px 20px;
    background:rgba(255,255,255,.85);
    backdrop-filter:blur(12px);
    border-radius:16px;
    border:2px solid rgba(0,0,0,.05);
    transition:all .3s cubic-bezier(.16,1,.3,1);
    animation:topSlideRight .4s ease both;
    position:relative;
    overflow:hidden;
    color:inherit;
    text-decoration:none!important;
    cursor:pointer;
}
.top-item::before{
    content:'';
    position:absolute;
    left:0;top:0;bottom:0;
    width:4px;
    background:var(--item-color,var(--top-k));
    transform:scaleY(0);
    transition:transform .3s;
    transform-origin:bottom;
}
.top-item:hover{
    transform:translateX(6px);
    border-color:var(--top-k);
    box-shadow:0 12px 32px -8px var(--top-k-shadow);
}
.top-item:hover::before{transform:scaleY(1)}

.top-rank{
    min-width:44px;
    height:44px;
    border-radius:12px;
    background:linear-gradient(135deg,var(--top-k),var(--top-k-light));
    color:#fff;
    display:flex;align-items:center;justify-content:center;
    font-size:1rem;
    font-weight:900;
    flex-shrink:0;
    font-variant-numeric:tabular-nums;
    box-shadow:0 4px 12px -2px var(--top-k-shadow);
}
.top-rank.r4{background:linear-gradient(135deg,#95a5a6,#7f8c8d)}
.top-rank.r5{background:linear-gradient(135deg,#7f8c8d,#34495e)}
.top-rank.r6plus{background:linear-gradient(135deg,#34495e,#2c3e50);font-size:.92rem}
.top-rank.medal{background:transparent;box-shadow:none;font-size:1.6rem}

.top-item-icon{
    font-size:1.6rem;
    flex-shrink:0;
    filter:drop-shadow(0 3px 6px rgba(0,0,0,.15));
    line-height:1;
}
.top-item-info{flex:1;min-width:0}
.top-item-name{
    font-weight:800;
    color:#1a1a1a;
    font-size:.98rem;
    margin-bottom:6px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    letter-spacing:-.2px;
}
.top-item-meta{
    display:flex;align-items:center;gap:12px;
    font-size:.75rem;color:#888;
    font-weight:700;
}
.top-item-meta span{display:inline-flex;align-items:center;gap:3px}
.top-item-meta .top-item-likes{color:#e74c3c}
.top-item-meta .top-item-dislikes{color:#7f8c8d}
.top-item-meta .top-item-ratio{color:var(--top-k);font-weight:900}

.top-item-bar{
    height:6px;
    border-radius:3px;
    background:rgba(0,0,0,.05);
    margin-top:8px;
    overflow:hidden;
    position:relative;
}
.top-item-bar-fill{
    height:100%;
    border-radius:3px;
    background:linear-gradient(90deg,var(--top-k),var(--top-k-light));
    animation:topBar 1s cubic-bezier(.16,1,.3,1) both;
    box-shadow:0 0 12px var(--top-k-shadow);
}

.top-item-bookmark{
    width:32px;height:32px;border-radius:50%;
    border:none;background:rgba(0,0,0,.04);
    cursor:pointer;font-family:inherit;
    font-size:.9rem;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
    transition:all .2s;
    opacity:.4;
    padding:0;
}
.top-item:hover .top-item-bookmark{opacity:1}
.top-item-bookmark:hover{background:rgba(243,156,18,.15);transform:scale(1.1)}
.top-item-bookmark.active{
    opacity:1;
    background:linear-gradient(135deg,#f5d76e,#f39c12);
    color:#fff;
}

/* ═══════════════════ EMPTY ═══════════════════ */
.top-empty{
    text-align:center;padding:60px 20px;
    background:linear-gradient(135deg,rgba(255,255,255,.6),rgba(255,255,255,.9));
    border-radius:20px;
    border:2px dashed var(--top-k-shadow);
}
.top-empty-icon{font-size:4rem;opacity:.5;margin-bottom:16px;line-height:1}
.top-empty-title{
    font-size:1.05rem;font-weight:800;
    color:#666;margin-bottom:10px;
}
.top-empty-sub{
    font-size:.88rem;color:#888;line-height:1.6;
    max-width:400px;margin:0 auto 18px;
}

/* ═══════════════════ SKELETON ═══════════════════ */
.top-skeleton{
    display:flex;align-items:center;gap:14px;
    padding:16px 20px;
    background:rgba(255,255,255,.7);
    border-radius:16px;
    margin-bottom:10px;
}
.top-skel{
    background:linear-gradient(90deg,
        rgba(0,0,0,.05) 0%,
        rgba(0,0,0,.1) 50%,
        rgba(0,0,0,.05) 100%);
    background-size:200% 100%;
    animation:topShine 1.5s linear infinite;
    border-radius:8px;
}
.top-skel-rank{width:44px;height:44px;border-radius:12px}
.top-skel-info{flex:1}
.top-skel-line{height:14px;margin-bottom:8px}
.top-skel-line.short{width:60%}

/* ═══════════════════ FOOTER INFO ═══════════════════ */
.top-footer{
    text-align:center;
    padding:20px;
    margin-top:24px;
    color:#888;
    font-size:.82rem;
    line-height:1.6;
}
.top-footer a{
    color:var(--top-k);
    font-weight:800;
    text-decoration:underline!important;
}

/* ═══════════════════ SCROLL TOP ═══════════════════ */
.top-scroll-top{
    position:fixed;bottom:24px;right:24px;
    width:48px;height:48px;border-radius:50%;
    background:linear-gradient(135deg,var(--top-k),var(--top-k-light));
    color:#fff;border:none;cursor:pointer;
    font-size:1.15rem;font-family:inherit;
    box-shadow:0 12px 32px -4px var(--top-k-shadow);
    display:none;align-items:center;justify-content:center;
    z-index:100;
    transition:all .3s cubic-bezier(.16,1,.3,1);
    opacity:0;
}
.top-scroll-top.show{display:flex;opacity:1;animation:topPop .3s ease}
.top-scroll-top:hover{transform:translateY(-4px) scale(1.05)}

/* ═══════════════════ TOAST ═══════════════════ */
.top-toast{
    position:fixed;bottom:30px;left:50%;
    transform:translateX(-50%) translateY(100px);
    padding:12px 26px;border-radius:30px;
    color:#fff;font-weight:800;font-size:.9rem;
    box-shadow:0 12px 32px rgba(0,0,0,.3);
    z-index:2147483647;
    pointer-events:none;max-width:90vw;text-align:center;
    opacity:0;
}
.top-toast.show{
    animation:topToastIn .4s cubic-bezier(.16,1,.3,1) forwards;
    opacity:1;
}
.top-toast.hide{animation:topToastOut .3s ease forwards}
.top-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.top-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.top-toast.warning{background:linear-gradient(135deg,#e67e22,#d35400)}
.top-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}

/* ═══════════════════ PARTICLES ═══════════════════ */
.top-particles{
    position:fixed;inset:0;
    pointer-events:none;z-index:9998;
}
.top-particle{
    position:absolute;
    width:8px;height:8px;border-radius:50%;
    animation:topParticle 1s cubic-bezier(.16,1,.3,1) forwards;
    will-change:transform,opacity;
}

/* ═══════════════════ DARK MODE ═══════════════════ */
@media (prefers-color-scheme: dark){
    html body.mars-stars-on .top-item,
    html body.mars-stars-on .top-podium-card,
    html body.mars-stars-on .top-controls,
    html body.mars-stars-on .top-empty,
    html body.mars-stars-on .top-skeleton{
        background:rgba(20,20,42,.85);
        border-color:rgba(108,99,255,.3);
        color:#e0e0f0;
    }
    html body.mars-stars-on .top-item-name,
    html body.mars-stars-on .top-podium-name{color:#e0e0f0}
    html body.mars-stars-on .top-search{
        background:#252550;color:#e0e0f0;
        border-color:rgba(108,99,255,.3);
    }
    html body.mars-stars-on .top-chip{
        background:rgba(255,255,255,.06);color:#aaa;
    }
    html body.mars-stars-on .top-chip:hover{
        background:rgba(255,255,255,.12);color:#fff;
    }
    html body.mars-stars-on .top-item-bar{background:rgba(255,255,255,.08)}
    html body.mars-stars-on .top-empty-title{color:#aaa}
}

/* ═══════════════════ MOBILE ═══════════════════ */
@media (max-width: 640px){
    .top-hero{padding:28px 20px;border-radius:18px}
    .top-hero-title{font-size:1.55rem}
    .top-hero-icon{font-size:3rem}
    .top-hero-stat{padding:8px 14px;min-width:80px}
    .top-hero-stat-value{font-size:1.2rem}
    .top-hero-stat-label{font-size:.6rem}
    .top-podium{grid-template-columns:1fr;gap:8px}
    .top-podium-card{padding:14px 12px}
    .top-podium-card.rank-1{order:-1;padding:20px 12px}
    .top-podium-medal{font-size:2rem}
    .top-podium-card.rank-1 .top-podium-medal{font-size:2.4rem}
    .top-podium-icon{font-size:1.6rem}
    .top-podium-name{font-size:.85rem;min-height:auto;margin-bottom:6px}
    .top-item{padding:12px 14px;gap:10px}
    .top-rank{min-width:38px;height:38px;font-size:.9rem}
    .top-item-icon{font-size:1.35rem}
    .top-item-name{font-size:.88rem}
    .top-item-meta{font-size:.7rem;gap:8px}
    .top-item-bookmark{width:28px;height:28px;font-size:.8rem}
    .top-scroll-top{width:42px;height:42px;bottom:20px;right:16px}
    .top-controls{padding:10px 12px;border-radius:12px}
    .top-chip{padding:6px 11px;font-size:.75rem}
    .top-search{font-size:.82rem;padding:8px 32px}
    .top-controls-label{font-size:.66rem}
}

@media (prefers-reduced-motion: reduce){
    #top-app *,
    #top-app *::before,
    #top-app *::after{
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

if (window.__topLoaded) return;
window.__topLoaded = true;

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
    'Аркадия':    { color: '#D4A574', light: '#E8C9A0', bg: '#FDF8F0' },
    'Ксанф':      { color: '#3D3D3D', light: '#6B6B6B', bg: '#F5F5F5' },
    'Эдем':       { color: '#F4A460', light: '#F7C98A', bg: '#FFF8F0' },
    'Эридания':   { color: '#F5D76E', light: '#FAE9A0', bg: '#FFFDF5' },
    'Кхонг':      { color: '#A9A9A9', light: '#C8C8C8', bg: '#F8F8F8' },
    'Авсония':    { color: '#87CEEB', light: '#B0D8EB', bg: '#F0F8FF' },
    'Кимерия':    { color: '#B19CD9', light: '#D1C4E9', bg: '#F8F4FF' },
    'Серпентида': { color: '#E57373', light: '#F5A0A0', bg: '#FFF5F5' },
    'Эритрей':    { color: '#64B5F6', light: '#90CAF9', bg: '#F0F8FF' },
    'Утопия':     { color: '#4DD0E1', light: '#80DEEA', bg: '#F0FDFF' },
    'Эллада':     { color: '#FF8A65', light: '#FFAB91', bg: '#FFF5F0' },
    'Аливасото':  { color: '#81C784', light: '#A5D6A7', bg: '#F0FFF0' }
};

/* ═══════════════════ TITLE EMOJI PICKER ═══════════════════ */
var CATEGORY_ICONS = {
    'mars': '🔴', 'planet': '🪐', 'star': '⭐',
    'kingdom': '🏰', 'king': '👑', 'war': '⚔️',
    'god': '⚡', 'history': '📜', 'city': '🏛️',
    'nature': '🌿', 'creature': '🐉', 'science': '🔬',
    'coin': '🪙', 'map': '🗺️', 'name': '🔤',
    'family': '🌳', 'artifact': '🏺', 'ship': '⛵',
    'mountain': '🏔️', 'sea': '🌊', 'default': '📄'
};
function iconForSlug(slug){
    var s = (slug || '').toLowerCase();
    var keys = Object.keys(CATEGORY_ICONS);
    for (var i = 0; i < keys.length; i++){
        if (s.indexOf(keys[i]) !== -1) return CATEGORY_ICONS[keys[i]];
    }
    return CATEGORY_ICONS.default;
}

/* ═══════════════════ STATE ═══════════════════ */
var state = {
    currentUser: null,
    profile: null,
    kingdom: KINGDOMS['Эдем'],
    ratings: [],
    titles: {},
    bookmarks: [],
    sort: 'likes',
    period: 'all',
    search: '',
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
function safeGet(k, def){
    try{
        var v = localStorage.getItem(k);
        if (v === null) return def;
        try{ return JSON.parse(v); }catch(e){ return v; }
    }catch(e){ return def; }
}
function safeSet(k, v){
    try{ localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); }catch(e){}
}

function toast(msg, type){
    type = type || 'info';
    var old = document.querySelector('.top-toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'top-toast ' + type;
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
function sfxBookmark(on){
    if (on){
        note(880, 0.12, 'triangle', 0.07);
        setTimeout(function(){ note(1320, 0.14, 'triangle', 0.07); }, 60);
    } else {
        note(660, 0.1, 'sine', 0.06);
    }
}
function sfxSort(){ note(520, 0.1, 'sine', 0.05); }

/* ═══════════════════ PARTICLES ═══════════════════ */
function spawnParticles(x, y, color, count){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    count = count || 12;
    var wrap = document.getElementById('top-particles');
    if (!wrap) return;
    for (var i = 0; i < count; i++){
        var p = document.createElement('div');
        p.className = 'top-particle';
        var angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        var dist = 60 + Math.random() * 120;
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
        (function(el){
            setTimeout(function(){ el.remove(); }, 1000);
        })(p);
    }
}

/* ═══════════════════ DOM ═══════════════════ */
var container = document.getElementById('top-app');

/* ═══════════════════ DATA ═══════════════════ */
async function loadAll(){
    if (!sb) return;

    // User
    try{
        var s = await sb.auth.getSession();
        state.currentUser = s && s.data && s.data.session ? s.data.session.user : null;
        if (state.currentUser){
            var pr = await sb.from('profiles').select('kingdom').eq('user_id', state.currentUser.id).single();
            state.profile = pr && pr.data;
            if (state.profile && KINGDOMS[state.profile.kingdom]){
                state.kingdom = KINGDOMS[state.profile.kingdom];
            }
            // Bookmarks
            try{
                var br = await sb.from('article_bookmarks').select('article_slug').eq('user_id', state.currentUser.id);
                state.bookmarks = (br && br.data || []).map(function(b){ return b.article_slug; });
            }catch(e){ state.bookmarks = []; }
        }
    }catch(e){}

    // Ratings
    var rt;
    try{
        rt = await sb.from('article_ratings').select('article_slug, rating, created_at');
    }catch(e){
        try{
            rt = await sb.from('article_ratings').select('article_slug, rating');
        }catch(e2){ rt = { data: [] }; }
    }
    state.ratings = (rt && rt.data) || [];

    // Titles (if table exists)
    try{
        var tt = await sb.from('article_titles').select('slug, title');
        state.titles = {};
        (tt && tt.data || []).forEach(function(t){ state.titles[t.slug] = t.title; });
    }catch(e){ state.titles = {}; }
}

/* ═══════════════════ AGGREGATION ═══════════════════ */
function slugToName(slug){
    if (state.titles[slug]) return state.titles[slug];
    var clean = String(slug || '').split('/').filter(Boolean).pop() || slug;
    // If russian letters — just capitalize
    if (/[а-яА-ЯёЁ]/.test(clean)){
        return clean.replace(/-/g, ' ').replace(/_/g, ' ');
    }
    return clean
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, function(ch){ return ch.toUpperCase(); });
}

function aggregate(){
    var now = Date.now();
    var periodMs = {
        'all':   Infinity,
        'month': 30 * 86400000,
        'week':  7 * 86400000,
        'today': 86400000
    };
    var cutoff = periodMs[state.period] || Infinity;

    var map = {};
    state.ratings.forEach(function(r){
        var ts = r.created_at ? new Date(r.created_at).getTime() : now;
        if (now - ts > cutoff) return;
        if (!map[r.article_slug]) map[r.article_slug] = { likes:0, dislikes:0, lastTs:0 };
        if (r.rating === 1) map[r.article_slug].likes++;
        else map[r.article_slug].dislikes++;
        if (ts > map[r.article_slug].lastTs) map[r.article_slug].lastTs = ts;
    });

    var arr = Object.keys(map).map(function(slug){
        var c = map[slug];
        var total = c.likes + c.dislikes;
        return {
            slug: slug,
            likes: c.likes,
            dislikes: c.dislikes,
            total: total,
            ratio: total > 0 ? c.likes / total : 0,
            lastTs: c.lastTs
        };
    });

    // Search
    if (state.search){
        var q = state.search.toLowerCase();
        arr = arr.filter(function(a){
            return slugToName(a.slug).toLowerCase().indexOf(q) !== -1 ||
                a.slug.toLowerCase().indexOf(q) !== -1;
        });
    }

    // Sort
    switch (state.sort){
        case 'likes':
            arr.sort(function(a,b){ return b.likes - a.likes || b.ratio - a.ratio; });
            break;
        case 'ratio':
            arr.sort(function(a,b){
                if (b.ratio !== a.ratio) return b.ratio - a.ratio;
                return b.likes - a.likes;
            });
            break;
        case 'trending':
            arr.sort(function(a,b){ return b.lastTs - a.lastTs || b.likes - a.likes; });
            break;
        case 'dislikes':
            arr.sort(function(a,b){ return b.dislikes - a.dislikes; });
            break;
        case 'total':
            arr.sort(function(a,b){ return b.total - a.total; });
            break;
    }

    return arr;
}

/* ═══════════════════ RENDER ═══════════════════ */
function applyTheme(){
    var k = state.kingdom;
    var root = document.documentElement;
    root.style.setProperty('--top-k', k.color);
    root.style.setProperty('--top-k-light', k.light);
    root.style.setProperty('--top-k-bg', k.bg);
    root.style.setProperty('--top-k-shadow', k.color + '40');
}

function render(){
    applyTheme();
    var all = aggregate();
    var top20 = all.slice(0, 20);

    // Stats
    var totalRatings = all.reduce(function(s,a){ return s + a.total; }, 0);
    var totalLikes = all.reduce(function(s,a){ return s + a.likes; }, 0);
    var totalArticles = all.length;
    var avgRatio = all.length > 0
        ? Math.round(all.reduce(function(s,a){ return s + a.ratio; }, 0) / all.length * 100)
        : 0;

    if (top20.length === 0){
        container.innerHTML = renderHero(0, 0, 0, 0) + renderControls() + renderEmpty();
        bindControls();
        return;
    }

    var max = Math.max.apply(null, top20.map(function(a){ return a.likes; }));
    var maxTotal = Math.max.apply(null, top20.map(function(a){ return a.total; }));

    // Podium top-3 (only for "likes" sort by default, but works for any)
    var podiumHtml = '';
    if (top20.length >= 3 && state.sort !== 'dislikes'){
        var p1 = top20[0], p2 = top20[1], p3 = top20[2];
        podiumHtml =
            '<div class="top-podium">' +
                podiumCard(p2, 2, max) +
                podiumCard(p1, 1, max) +
                podiumCard(p3, 3, max) +
            '</div>';
    }

    // List
    var listStart = (top20.length >= 3 && state.sort !== 'dislikes') ? 3 : 0;
    var listItems = top20.slice(listStart);

    container.innerHTML =
        renderHero(totalArticles, totalLikes, totalRatings, avgRatio) +
        renderControls() +
        podiumHtml +
        '<div class="top-list">' +
            (listItems.length > 0
                ? listItems.map(function(a, i){
                    return renderRow(a, listStart + i, maxTotal);
                }).join('')
                : '<div class="top-empty"><div class="top-empty-icon">📊</div>' +
                  '<div class="top-empty-title">Больше нет статей</div></div>') +
        '</div>' +
        renderFooter() +
        '<button class="top-scroll-top" id="top-scroll-top" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">↑</button>' +
        '<div class="top-particles" id="top-particles"></div>';

    bindControls();
    bindScrollTop();
    // Trigger bar animation
    requestAnimationFrame(function(){
        document.querySelectorAll('.top-item-bar-fill').forEach(function(el){
            el.style.width = el.dataset.w + '%';
        });
    });
}

function renderHero(articles, likes, ratings, avgRatio){
    var starsHtml = '';
    for (var i = 0; i < 8; i++) starsHtml += '<div class="top-star"></div>';

    return '<div class="top-hero top-fade">' +
        '<div class="top-hero-stars">' + starsHtml + '</div>' +
        '<div class="top-hero-content">' +
            '<div class="top-hero-icon">🏆</div>' +
            '<h1 class="top-hero-title">Топ статей</h1>' +
            '<p class="top-hero-sub">Самые популярные статьи по мнению читателей</p>' +
            '<div class="top-hero-stats">' +
                heroStat(articles, 'Статей') +
                heroStat(likes, '👍 Лайков') +
                heroStat(ratings, 'Оценок') +
                (avgRatio > 0 ? heroStat(avgRatio + '%', 'Средний') : '') +
            '</div>' +
        '</div>' +
    '</div>';
}

function heroStat(value, label){
    return '<div class="top-hero-stat">' +
        '<div class="top-hero-stat-value">' + value + '</div>' +
        '<div class="top-hero-stat-label">' + label + '</div>' +
    '</div>';
}

function renderControls(){
    var sorts = [
        { k:'likes',    icon:'👍', name:'По лайкам' },
        { k:'ratio',    icon:'📊', name:'По рейтингу' },
        { k:'trending', icon:'🔥', name:'Свежие' },
        { k:'total',    icon:'💬', name:'По оценкам' },
        { k:'dislikes', icon:'👎', name:'Анти-топ' }
    ];
    var periods = [
        { k:'all',   name:'Всё время' },
        { k:'month', name:'Месяц' },
        { k:'week',  name:'Неделя' },
        { k:'today', name:'Сегодня' }
    ];

    var sortChips = sorts.map(function(s){
        return '<button class="top-chip ' + (state.sort === s.k ? 'active' : '') + '" ' +
            'onclick="topSort(\'' + s.k + '\')">' + s.icon + ' ' + s.name + '</button>';
    }).join('');
    var periodChips = periods.map(function(p){
        return '<button class="top-chip ' + (state.period === p.k ? 'active' : '') + '" ' +
            'onclick="topPeriod(\'' + p.k + '\')">' + p.name + '</button>';
    }).join('');

    return '<div class="top-controls top-fade" style="animation-delay:.1s;">' +
        '<div class="top-controls-row">' +
            '<span class="top-controls-label">Сортировка:</span>' + sortChips +
        '</div>' +
        '<div class="top-controls-row" style="margin-top:8px;">' +
            '<span class="top-controls-label">Период:</span>' + periodChips +
            '<div class="top-search-wrap' + (state.search ? ' has-value' : '') + '" id="top-search-wrap">' +
                '<span class="top-search-icon">🔍</span>' +
                '<input class="top-search" type="text" placeholder="Найти статью..." value="' + escAttr(state.search) + '" oninput="topSearchInput(this.value)">' +
                '<button class="top-search-clear" onclick="topClearSearch()">✕</button>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function podiumCard(a, rank, max){
    var medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';
    var icon = iconForSlug(a.slug);
    var pct = max > 0 ? Math.round(a.likes / max * 100) : 0;
    var name = slugToName(a.slug);
    var link = '/' + a.slug + '/';

    return '<a href="' + escAttr(link) + '" class="top-podium-card rank-' + rank + '" ' +
        'style="animation-delay:' + (rank * .1) + 's;">' +
        '<div class="top-podium-medal">' + medal + '</div>' +
        '<div class="top-podium-icon">' + icon + '</div>' +
        '<div class="top-podium-name">' + esc(name) + '</div>' +
        '<div class="top-podium-likes">👍 ' + a.likes + '</div>' +
        '<div class="top-podium-pct">' + pct + '% от лидера</div>' +
    '</a>';
}

function renderRow(a, idx, maxTotal){
    var rank = idx + 1;
    var rankCls = rank === 1 ? 'r1' : rank === 2 ? 'r2' : rank === 3 ? 'r3' : rank === 4 ? 'r4' : rank === 5 ? 'r5' : 'r6plus';
    var icon = iconForSlug(a.slug);
    var name = slugToName(a.slug);
    var link = '/' + a.slug + '/';
    var ratioPct = a.total > 0 ? Math.round(a.ratio * 100) : 0;
    var barWidth = maxTotal > 0 ? Math.round(a.total / maxTotal * 100) : 0;
    var bookmarked = state.bookmarks.indexOf(a.slug) !== -1;

    return '<a href="' + escAttr(link) + '" class="top-item" style="animation-delay:' + (idx * .03) + 's;">' +
        '<div class="top-rank ' + rankCls + '">' + rank + '</div>' +
        '<div class="top-item-icon">' + icon + '</div>' +
        '<div class="top-item-info">' +
            '<div class="top-item-name">' + esc(name) + '</div>' +
            '<div class="top-item-meta">' +
                '<span class="top-item-likes">👍 ' + a.likes + '</span>' +
                (a.dislikes > 0 ? '<span class="top-item-dislikes">👎 ' + a.dislikes + '</span>' : '') +
                (a.total > 0 ? '<span class="top-item-ratio">' + ratioPct + '%</span>' : '') +
                '<span>💬 ' + a.total + '</span>' +
            '</div>' +
            '<div class="top-item-bar"><div class="top-item-bar-fill" data-w="' + barWidth + '" style="width:0"></div></div>' +
        '</div>' +
        '<button class="top-item-bookmark ' + (bookmarked ? 'active' : '') + '" ' +
            'onclick="topBookmark(\'' + escAttr(a.slug) + '\', event)" ' +
            'title="' + (bookmarked ? 'Убрать из закладок' : 'В закладки') + '">' +
            (bookmarked ? '⭐' : '☆') +
        '</button>' +
    '</a>';
}

function renderEmpty(){
    if (state.search){
        return '<div class="top-empty">' +
            '<div class="top-empty-icon">🔍</div>' +
            '<div class="top-empty-title">Ничего не найдено</div>' +
            '<div class="top-empty-sub">По запросу «' + esc(state.search) + '» ничего нет</div>' +
            '<button class="top-chip active" onclick="topClearSearch()">Сбросить поиск</button>' +
        '</div>';
    }
    return '<div class="top-empty">' +
        '<div class="top-empty-icon">📊</div>' +
        '<div class="top-empty-title">Пока нет оценок</div>' +
        '<div class="top-empty-sub">Открывайте статьи и ставьте 👍 внизу страницы — они появятся здесь.</div>' +
    '</div>';
}

function renderFooter(){
    return '<div class="top-footer">' +
        '💡 Топ обновляется в реальном времени. ' +
        '<a href="/">← На главную</a>' +
    '</div>';
}

/* ═══════════════════ SCROLL ═══════════════════ */
function bindScrollTop(){
    var btn = document.getElementById('top-scroll-top');
    if (!btn) return;
    function check(){
        if (window.scrollY > 400) btn.classList.add('show');
        else btn.classList.remove('show');
    }
    window.removeEventListener('scroll', check);
    window.addEventListener('scroll', check, {passive:true});
    check();
}

/* ═══════════════════ CONTROLS BINDING ═══════════════════ */
function bindControls(){ /* noop — inline handlers */ }

/* ═══════════════════ ACTIONS ═══════════════════ */
window.topSort = function(k){
    if (state.sort === k) return;
    state.sort = k;
    sfxSort();
    render();
};
window.topPeriod = function(p){
    if (state.period === p) return;
    state.period = p;
    sfxSort();
    render();
};

var searchTimer;
window.topSearchInput = function(v){
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function(){
        state.search = v;
        render();
        // Restore focus
        var inp = document.querySelector('.top-search');
        if (inp){
            inp.focus();
            try{ inp.setSelectionRange(inp.value.length, inp.value.length); }catch(e){}
        }
    }, 250);
};
window.topClearSearch = function(){
    state.search = '';
    render();
};

window.topBookmark = async function(slug, ev){
    if (ev){ ev.preventDefault(); ev.stopPropagation(); }
    if (!state.currentUser || !sb){
        toast('Войдите, чтобы сохранять', 'warning');
        return;
    }
    var isBookmarked = state.bookmarks.indexOf(slug) !== -1;
    try{
        if (isBookmarked){
            await sb.from('article_bookmarks').delete()
                .eq('user_id', state.currentUser.id).eq('article_slug', slug);
            state.bookmarks = state.bookmarks.filter(function(s){ return s !== slug; });
            toast('Убрано из закладок', 'info');
            sfxBookmark(false);
        } else {
            await sb.from('article_bookmarks').insert([{
                user_id: state.currentUser.id,
                article_slug: slug
            }]);
            state.bookmarks.push(slug);
            toast('⭐ Добавлено в закладки', 'success');
            sfxBookmark(true);
            vibrate(15);
            // Particles
            if (ev.currentTarget){
                var r = ev.currentTarget.getBoundingClientRect();
                spawnParticles(r.left + r.width/2, r.top + r.height/2, '#f39c12', 14);
            }
        }
        render();
    }catch(e){
        toast('Ошибка', 'error');
    }
};

/* ═══════════════════ URL PARAMS ═══════════════════ */
function loadFromURL(){
    try{
        var p = new URLSearchParams(location.search);
        var s = p.get('sort');
        var pr = p.get('period');
        var q = p.get('q');
        if (['likes','ratio','trending','total','dislikes'].indexOf(s) !== -1) state.sort = s;
        if (['all','month','week','today'].indexOf(pr) !== -1) state.period = pr;
        if (q) state.search = q;
    }catch(e){}
}

/* ═══════════════════ INIT ═══════════════════ */
async function init(){
    unlock();
    loadFromURL();

    // Show skeleton
    container.innerHTML =
        '<div style="max-width:900px;margin:0 auto;">' +
            '<div class="top-hero top-fade" style="min-height:180px;display:flex;align-items:center;justify-content:center;">' +
                '<div style="text-align:center;color:#fff">' +
                    '<div class="top-spinner" style="border-color:rgba(255,255,255,.2);border-top-color:#fff"></div>' +
                    '<p style="margin-top:14px;font-weight:700;opacity:.8">Загрузка топа...</p>' +
                '</div>' +
            '</div>' +
        '</div>';

    try{
        await loadAll();
        render();
        console.log('🏆 Топ статей v2 VIP. Записей: ' + state.ratings.length);
    }catch(e){
        console.error(e);
        container.innerHTML = '<div class="top-empty" style="margin-top:40px;">' +
            '<div class="top-empty-icon">⚠️</div>' +
            '<div class="top-empty-title">Не удалось загрузить</div>' +
            '<button class="top-chip active" onclick="location.reload()">Попробовать снова</button>' +
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
