---
title: Форум
comments: false
---

<div id="frm-app">
    <div class="frm-loading">
        <div class="frm-spinner"></div>
        <p>Загрузка форума...</p>
    </div>
</div>

<style>
/* ═══════════════════ ROOT ═══════════════════ */
:root{
    --frm-k:#6C63FF;
    --frm-k-light:#A29BFE;
    --frm-k-bg:#F0F4FF;
    --frm-k-shadow:rgba(108,99,255,.25);
}
#frm-app{
    max-width: 1100px;
    margin: 0 auto;
    font-family: -apple-system,'Segoe UI',Roboto,sans-serif;
    padding: 0 8px 60px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
}
#frm-app a{text-decoration:none!important;border-bottom:none!important}

@keyframes frmSpin{to{transform:rotate(360deg)}}
@keyframes frmFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes frmSlideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes frmPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes frmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes frmHeart{0%{transform:scale(1)}50%{transform:scale(1.4)}100%{transform:scale(1)}}
@keyframes frmPop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes frmShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes frmGlow{0%,100%{box-shadow:0 0 20px var(--frm-k-shadow)}50%{box-shadow:0 0 40px var(--frm-k-shadow)}}
@keyframes frmToastIn{from{transform:translate(-50%,100px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
@keyframes frmToastOut{from{transform:translate(-50%,0);opacity:1}to{transform:translate(-50%,100px);opacity:0}}

.frm-fade{animation:frmFadeIn .5s cubic-bezier(.16,1,.3,1) both}

/* ═══════════════════ LOADING ═══════════════════ */
.frm-loading{text-align:center;padding:60px 20px}
.frm-spinner{
    display:inline-block;width:52px;height:52px;
    border:4px solid var(--frm-k-shadow);
    border-top-color:var(--frm-k);
    border-radius:50%;
    animation:frmSpin .8s linear infinite;
}
.frm-loading p{color:#999;margin-top:16px;font-size:.9rem}

/* ═══════════════════ HERO ═══════════════════ */
.frm-hero{
    position:relative;
    background:linear-gradient(135deg,var(--frm-k),var(--frm-k-light));
    border-radius:24px;padding:44px 32px;color:#fff;
    margin-bottom:20px;overflow:hidden;
    box-shadow:0 24px 60px -16px var(--frm-k-shadow);
}
.frm-hero::before{
    content:'';position:absolute;top:-60%;right:-10%;
    width:520px;height:520px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,255,.18),transparent 70%);
    animation:frmFloat 8s ease-in-out infinite;pointer-events:none;
}
.frm-hero::after{
    content:'';position:absolute;bottom:-40%;left:-10%;
    width:400px;height:400px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,255,.1),transparent 70%);
    animation:frmFloat 10s ease-in-out infinite reverse;pointer-events:none;
}
.frm-hero-content{position:relative;z-index:2;text-align:center}
.frm-hero-icon{
    font-size:4rem;margin-bottom:12px;
    filter:drop-shadow(0 8px 20px rgba(0,0,0,.3));
    animation:frmPulse 3s ease-in-out infinite;
}
.frm-hero-title{
    font-size:2rem;font-weight:900;margin:0 0 8px;letter-spacing:-.5px;
    text-shadow:0 4px 20px rgba(0,0,0,.3);
}
.frm-hero-sub{font-size:.98rem;opacity:.92;margin:0 0 20px}
.frm-hero-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.frm-hero-btn{
    display:inline-flex;align-items:center;gap:8px;
    padding:12px 26px;border-radius:30px;
    border:2px solid rgba(255,255,255,.4);
    background:rgba(255,255,255,.2);color:#fff;
    font-weight:700;font-size:.9rem;cursor:pointer;
    transition:all .3s cubic-bezier(.16,1,.3,1);
    backdrop-filter:blur(8px);font-family:inherit;
    text-decoration:none!important;
}
.frm-hero-btn:hover{background:rgba(255,255,255,.35);transform:translateY(-2px)}
.frm-hero-btn.primary{background:#fff;color:var(--frm-k);border-color:#fff}
.frm-hero-btn.primary:hover{background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.25)}

/* ═══════════════════ STATS ═══════════════════ */
.frm-stats-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
    gap:12px;margin-bottom:20px;
}
.frm-stat{
    background:rgba(255,255,255,.85);
    backdrop-filter:blur(12px);
    padding:18px 14px;border-radius:16px;text-align:center;
    border:2px solid transparent;
    box-shadow:0 4px 12px rgba(0,0,0,.05);
    transition:all .3s cubic-bezier(.16,1,.3,1);
    cursor:default;
}
.frm-stat:hover{
    transform:translateY(-6px);
    border-color:var(--frm-k);
    box-shadow:0 16px 40px -8px var(--frm-k-shadow);
}
.frm-stat-icon{font-size:1.8rem;margin-bottom:6px}
.frm-stat-value{
    font-size:1.9rem;font-weight:900;line-height:1;
    background:linear-gradient(135deg,var(--frm-k),var(--frm-k-light));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
}
.frm-stat-label{
    font-size:.7rem;color:#888;text-transform:uppercase;
    letter-spacing:.8px;margin-top:6px;font-weight:700;
}

/* ═══════════════════ TOOLBAR ═══════════════════ */
.frm-toolbar{
    display:flex;gap:8px;flex-wrap:wrap;align-items:center;
    margin-bottom:20px;padding:12px 16px;
    background:rgba(255,255,255,.85);
    backdrop-filter:blur(12px);
    border-radius:14px;
    border:1px solid rgba(0,0,0,.05);
    box-shadow:0 4px 12px rgba(0,0,0,.04);
    position:sticky;top:8px;z-index:50;
}
.frm-toolbar-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;width:100%}
.frm-toolbar-label{font-size:.7rem;color:#888;text-transform:uppercase;letter-spacing:1px;font-weight:800;margin-right:2px}

.frm-chip{
    padding:7px 14px;border-radius:30px;
    border:2px solid transparent;
    background:rgba(0,0,0,.04);
    color:#666;font-size:.8rem;font-weight:800;
    cursor:pointer;transition:all .25s;
    font-family:inherit;
    display:inline-flex;align-items:center;gap:5px;
    white-space:nowrap;
}
.frm-chip:hover{background:rgba(0,0,0,.07);color:#333}
.frm-chip.active{
    background:linear-gradient(135deg,var(--frm-k),var(--frm-k-light));
    color:#fff;
    box-shadow:0 6px 16px -4px var(--frm-k-shadow);
}
.frm-chip.cat-general{--c:#6C63FF}
.frm-chip.cat-lore{--c:#f39c12}
.frm-chip.cat-theories{--c:#9b59b6}
.frm-chip.cat-help{--c:#e74c3c}
.frm-chip.cat-creative{--c:#e91e63}
.frm-chip.cat-offtopic{--c:#27ae60}
.frm-chip.cat-{--c:#6C63FF}

.frm-search-wrap{
    flex:1;min-width:180px;position:relative;
    display:flex;align-items:center;
}
.frm-search{
    width:100%;padding:10px 36px 10px 36px;
    border-radius:30px;
    border:2px solid rgba(0,0,0,.08);
    font-size:.88rem;font-family:inherit;outline:none;
    background:#fff;transition:all .2s;box-sizing:border-box;
}
.frm-search:focus{
    border-color:var(--frm-k);
    box-shadow:0 0 0 4px var(--frm-k-shadow);
}
.frm-search-icon{
    position:absolute;left:12px;top:50%;transform:translateY(-50%);
    pointer-events:none;color:#999;font-size:.9rem;
}
.frm-search-clear{
    position:absolute;right:8px;top:50%;transform:translateY(-50%);
    width:22px;height:22px;border-radius:50%;
    background:rgba(0,0,0,.08);border:none;
    cursor:pointer;font-family:inherit;font-size:.75rem;
    color:#666;display:none;align-items:center;justify-content:center;
    padding:0;
}
.frm-search-clear:hover{background:rgba(0,0,0,.15)}
.frm-search-wrap.has-value .frm-search-clear{display:flex}

/* ═══════════════════ LAYOUT ═══════════════════ */
.frm-layout{
    display:grid;
    grid-template-columns:1fr;
    gap:20px;
}
@media (min-width: 900px){
    .frm-layout{grid-template-columns:1fr 280px}
    .frm-sidebar{display:block!important}
}

.frm-sidebar{display:none}
.frm-side-card{
    background:rgba(255,255,255,.85);
    backdrop-filter:blur(12px);
    border-radius:16px;padding:16px 18px;
    margin-bottom:14px;
    border:1px solid rgba(0,0,0,.05);
    box-shadow:0 4px 12px rgba(0,0,0,.04);
}
.frm-side-title{
    font-size:.78rem;font-weight:800;color:#333;
    text-transform:uppercase;letter-spacing:1px;
    margin:0 0 12px;display:flex;align-items:center;gap:6px;
}

/* Trending list */
.frm-trend{
    display:flex;gap:10px;padding:8px 0;
    border-bottom:1px solid rgba(0,0,0,.05);
    cursor:pointer;transition:all .2s;
    text-decoration:none;
}
.frm-trend:last-child{border-bottom:none}
.frm-trend:hover{padding-left:4px}
.frm-trend-num{
    width:22px;height:22px;border-radius:50%;
    background:linear-gradient(135deg,var(--frm-k),var(--frm-k-light));
    color:#fff;font-weight:900;font-size:.7rem;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;margin-top:2px;
}
.frm-trend-num.gold{background:linear-gradient(135deg,#f5d76e,#f39c12)}
.frm-trend-num.silver{background:linear-gradient(135deg,#bdc3c7,#95a5a6)}
.frm-trend-num.bronze{background:linear-gradient(135deg,#cd7f32,#8b5a2b)}
.frm-trend-info{flex:1;min-width:0}
.frm-trend-title{
    font-size:.82rem;font-weight:700;color:#1a1a1a;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    line-height:1.3;
}
.frm-trend-meta{font-size:.68rem;color:#888;margin-top:2px}

/* Top authors */
.frm-author{
    display:flex;align-items:center;gap:10px;
    padding:6px 0;cursor:pointer;
    transition:all .2s;
}
.frm-author:hover{padding-left:4px}
.frm-author-avatar{
    width:32px;height:32px;border-radius:50%;
    object-fit:cover;border:2px solid var(--frm-k);
    flex-shrink:0;
}
.frm-author-info{flex:1;min-width:0}
.frm-author-name{
    font-size:.82rem;font-weight:700;color:#1a1a1a;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.frm-author-meta{font-size:.68rem;color:#888}
.frm-author-count{
    font-size:.78rem;font-weight:900;
    color:var(--frm-k);flex-shrink:0;
}

/* ═══════════════════ TOPIC CARD ═══════════════════ */
.frm-topic{
    background:rgba(255,255,255,.9);
    backdrop-filter:blur(12px);
    border-radius:16px;
    border:2px solid rgba(0,0,0,.05);
    padding:18px 20px;
    margin-bottom:10px;
    cursor:pointer;
    transition:all .3s cubic-bezier(.16,1,.3,1);
    animation:frmFadeIn .4s ease both;
    display:flex;gap:14px;
    position:relative;
}
.frm-topic:hover{
    transform:translateY(-4px);
    border-color:var(--frm-k);
    box-shadow:0 16px 40px -8px var(--frm-k-shadow);
}
.frm-topic.pinned{
    border-color:#f39c12;
    background:linear-gradient(135deg,rgba(243,156,18,.06),rgba(255,255,255,.95));
}
.frm-topic.pinned::before{
    content:'📌';position:absolute;top:-10px;left:14px;
    font-size:1.1rem;
    filter:drop-shadow(0 2px 6px rgba(243,156,18,.5));
}

.frm-topic-avatar{
    width:46px;height:46px;border-radius:50%;
    object-fit:cover;
    border:2px solid var(--frm-k);
    flex-shrink:0;
    transition:transform .25s;
}
.frm-topic:hover .frm-topic-avatar{transform:scale(1.08)}
.frm-topic-body{flex:1;min-width:0}
.frm-topic-header{
    display:flex;align-items:center;gap:8px;
    flex-wrap:wrap;margin-bottom:6px;
}
.frm-topic-title{
    font-size:1.05rem;font-weight:800;color:#1a1a1a;
    margin:0;letter-spacing:-.3px;line-height:1.3;
    overflow:hidden;text-overflow:ellipsis;
    display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;
}
.frm-badge{
    display:inline-flex;align-items:center;gap:3px;
    padding:3px 9px;border-radius:12px;
    font-size:.66rem;font-weight:800;
    letter-spacing:.3px;text-transform:uppercase;
    white-space:nowrap;
}
.frm-badge.category{background:rgba(108,99,255,.12);color:var(--frm-k)}
.frm-badge.pinned{background:rgba(243,156,18,.15);color:#e67e22}
.frm-badge.locked{background:rgba(231,76,60,.12);color:#c0392b}
.frm-badge.edited{background:rgba(0,0,0,.05);color:#888}
.frm-badge.new{background:linear-gradient(135deg,#27ae60,#16a085);color:#fff;animation:frmPulse 1.5s ease-in-out infinite}

.frm-topic-preview{
    font-size:.86rem;color:#666;line-height:1.5;
    margin:0 0 10px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;
    overflow:hidden;
}
.frm-topic-meta{
    display:flex;gap:14px;flex-wrap:wrap;
    font-size:.73rem;color:#888;
    align-items:center;
}
.frm-topic-meta span{display:inline-flex;align-items:center;gap:4px}
.frm-topic-meta .frm-author-link{
    color:var(--frm-k);font-weight:700;
    cursor:pointer;transition:opacity .2s;
}
.frm-topic-meta .frm-author-link:hover{opacity:.7;text-decoration:underline!important}

.frm-topic-bookmark{
    position:absolute;top:12px;right:12px;
    width:28px;height:28px;border-radius:50%;
    background:rgba(0,0,0,.04);
    border:none;cursor:pointer;
    font-size:.85rem;font-family:inherit;
    display:flex;align-items:center;justify-content:center;
    transition:all .2s;padding:0;
    opacity:0;
}
.frm-topic:hover .frm-topic-bookmark{opacity:1}
.frm-topic-bookmark:hover{background:rgba(243,156,18,.15);transform:scale(1.1)}
.frm-topic-bookmark.active{opacity:1;background:rgba(243,156,18,.2)}

/* ═══════════════════ EMPTY ═══════════════════ */
.frm-empty{
    text-align:center;padding:60px 20px;
    background:linear-gradient(135deg,rgba(255,255,255,.7),rgba(255,255,255,.9));
    border-radius:16px;
    border:2px dashed var(--frm-k-shadow);
}
.frm-empty-icon{font-size:4rem;margin-bottom:12px;opacity:.5}
.frm-empty-title{
    font-size:1.05rem;font-weight:700;color:#666;margin-bottom:16px;
}

/* ═══════════════════ DETAIL VIEW ═══════════════════ */
.frm-back{
    display:inline-flex;align-items:center;gap:6px;
    padding:9px 18px;border-radius:30px;
    background:rgba(255,255,255,.9);
    border:2px solid rgba(0,0,0,.06);
    font-weight:700;font-size:.82rem;
    color:var(--frm-k);cursor:pointer;
    font-family:inherit;transition:all .2s;
    margin-bottom:16px;
}
.frm-back:hover{
    background:var(--frm-k);color:#fff;
    border-color:var(--frm-k);
    transform:translateX(-3px);
}

.frm-topic-view{
    background:rgba(255,255,255,.9);
    backdrop-filter:blur(12px);
    border-radius:16px;padding:24px 26px;
    margin-bottom:20px;
    border:2px solid rgba(0,0,0,.05);
    box-shadow:0 8px 24px -8px var(--frm-k-shadow);
    position:relative;
}
.frm-topic-view-header{
    display:flex;gap:14px;align-items:flex-start;
    margin-bottom:16px;padding-bottom:16px;
    border-bottom:2px solid rgba(0,0,0,.05);
}
.frm-topic-view-avatar{
    width:56px;height:56px;border-radius:50%;
    object-fit:cover;border:3px solid var(--frm-k);
    flex-shrink:0;
}
.frm-topic-view-title{
    font-size:1.5rem;font-weight:900;
    color:#1a1a1a;margin:0 0 8px;
    line-height:1.25;letter-spacing:-.5px;
    word-break:break-word;
}
.frm-topic-view-meta{
    display:flex;gap:12px;flex-wrap:wrap;
    font-size:.78rem;color:#888;align-items:center;
}
.frm-topic-view-meta a{
    color:var(--frm-k);font-weight:700;
}
.frm-topic-content{
    font-size:1rem;line-height:1.75;color:#333;
    padding:18px 22px;
    background:linear-gradient(135deg,rgba(108,99,255,.04),rgba(108,99,255,.02));
    border-radius:14px;
    border-left:4px solid var(--frm-k);
    margin-bottom:20px;
    white-space:pre-wrap;word-wrap:break-word;
    overflow-wrap:anywhere;
}
.frm-topic-actions{
    display:flex;gap:8px;flex-wrap:wrap;
    margin-bottom:24px;
    padding-bottom:20px;
    border-bottom:1px solid rgba(0,0,0,.05);
}

/* ═══════════════════ POST ═══════════════════ */
.frm-posts-title{
    font-size:1.1rem;font-weight:800;color:#1a1a1a;
    margin:0 0 14px;display:flex;align-items:center;gap:8px;
}
.frm-posts-title .frm-posts-count{
    display:inline-flex;align-items:center;justify-content:center;
    min-width:26px;height:22px;padding:0 8px;
    background:var(--frm-k);color:#fff;
    border-radius:11px;font-size:.72rem;font-weight:900;
}

.frm-post{
    background:rgba(0,0,0,.02);
    border-radius:14px;padding:16px 18px;
    margin-bottom:10px;
    transition:all .25s;
    display:flex;gap:14px;
    border-left:4px solid var(--frm-k);
    position:relative;
    animation:frmSlideRight .35s ease both;
}
.frm-post:hover{background:rgba(108,99,255,.05);transform:translateX(3px)}
.frm-post-avatar{
    width:42px;height:42px;border-radius:50%;
    object-fit:cover;border:2px solid var(--frm-k);
    flex-shrink:0;
}
.frm-post-body{flex:1;min-width:0}
.frm-post-header{
    display:flex;align-items:center;gap:10px;
    margin-bottom:8px;flex-wrap:wrap;
}
.frm-post-author{
    font-weight:800;color:var(--frm-k);
    font-size:.9rem;cursor:pointer;
    transition:opacity .2s;
}
.frm-post-author:hover{opacity:.7}
.frm-post-rank{
    display:inline-flex;align-items:center;gap:3px;
    padding:2px 8px;border-radius:10px;
    font-size:.62rem;font-weight:800;
    background:rgba(108,99,255,.12);
    color:var(--frm-k);
}
.frm-post-rank.r-bronze{background:rgba(205,127,50,.15);color:#8b5a2b}
.frm-post-rank.r-silver{background:rgba(149,165,166,.2);color:#546e7a}
.frm-post-rank.r-gold{background:rgba(243,156,18,.15);color:#e67e22}
.frm-post-rank.r-legend{background:linear-gradient(135deg,#f5d76e,#f39c12);color:#fff}

.frm-post-date{font-size:.72rem;color:#999}
.frm-post-content{
    font-size:.92rem;line-height:1.65;color:#333;
    white-space:pre-wrap;word-wrap:break-word;
    overflow-wrap:anywhere;
    margin-bottom:8px;
}
.frm-post-actions{
    display:flex;gap:6px;flex-wrap:wrap;
    align-items:center;
}
.frm-icon-btn{
    display:inline-flex;align-items:center;gap:4px;
    padding:5px 11px;border-radius:20px;
    background:rgba(0,0,0,.04);
    border:none;color:#888;
    font-size:.76rem;font-weight:700;
    cursor:pointer;transition:all .2s;
    font-family:inherit;
}
.frm-icon-btn:hover{background:rgba(108,99,255,.1);color:var(--frm-k)}
.frm-icon-btn.liked{background:rgba(231,76,60,.15);color:#e74c3c}
.frm-icon-btn.liked .frm-icon-btn-icon{animation:frmHeart .4s ease}
.frm-icon-btn.danger:hover{background:rgba(231,76,60,.15);color:#e74c3c}

/* Reply box */
.frm-reply-box{
    margin-top:20px;padding-top:20px;
    border-top:2px solid rgba(0,0,0,.05);
}
.frm-reply-title{
    font-size:.95rem;font-weight:800;color:#333;
    margin:0 0 10px;display:flex;align-items:center;gap:6px;
}
.frm-reply-input{
    width:100%;
    padding:14px 18px;border-radius:14px;
    border:2px solid rgba(0,0,0,.08);
    font-size:.92rem;font-family:inherit;
    resize:vertical;min-height:110px;
    outline:none;background:#fff;
    transition:all .2s;box-sizing:border-box;
    line-height:1.5;
}
.frm-reply-input:focus{
    border-color:var(--frm-k);
    box-shadow:0 0 0 4px var(--frm-k-shadow);
}
.frm-reply-bar{
    display:flex;justify-content:space-between;
    align-items:center;gap:10px;margin-top:8px;
    flex-wrap:wrap;
}
.frm-counter{font-size:.72rem;color:#999;font-weight:700}
.frm-counter.warn{color:#e67e22}
.frm-counter.danger{color:#e74c3c}
.frm-quote-preview{
    padding:8px 12px;background:rgba(108,99,255,.08);
    border-left:3px solid var(--frm-k);
    border-radius:6px;font-size:.78rem;
    color:#555;margin-bottom:10px;
    display:flex;justify-content:space-between;
    align-items:center;gap:8px;
}
.frm-quote-preview button{
    background:transparent;border:none;
    cursor:pointer;color:#999;font-size:1rem;
    padding:0;font-family:inherit;
}

/* ═══════════════════ MODAL ═══════════════════ */
.frm-modal-overlay{
    position:fixed;inset:0;z-index:99999;
    background:rgba(10,10,26,.7);
    backdrop-filter:blur(8px);
    display:flex;align-items:center;justify-content:center;
    padding:20px;
    animation:frmFadeIn .3s ease;
    overflow-y:auto;
}
.frm-modal{
    background:#fff;max-width:640px;width:100%;
    border-radius:22px;padding:30px 28px;
    position:relative;
    box-shadow:0 30px 80px rgba(0,0,0,.5);
    animation:frmFadeIn .4s cubic-bezier(.16,1,.3,1);
    max-height:92vh;overflow-y:auto;
}
.frm-modal-close{
    position:absolute;top:14px;right:16px;
    width:34px;height:34px;border-radius:50%;
    background:rgba(0,0,0,.05);border:none;
    font-size:1.1rem;cursor:pointer;color:#666;
    display:flex;align-items:center;justify-content:center;
    transition:all .2s;font-family:inherit;
}
.frm-modal-close:hover{
    background:rgba(0,0,0,.1);transform:rotate(90deg);
}
.frm-modal-title{
    font-size:1.35rem;font-weight:900;
    color:#1a1a1a;margin:0 0 20px;
    display:flex;align-items:center;gap:10px;
}
.frm-field{margin-bottom:16px}
.frm-field label{
    display:block;font-size:.8rem;font-weight:800;
    color:#333;margin-bottom:6px;
    text-transform:uppercase;letter-spacing:.5px;
}
.frm-field input,
.frm-field textarea,
.frm-field select{
    width:100%;padding:12px 16px;
    border-radius:12px;
    border:2px solid rgba(0,0,0,.08);
    font-size:.92rem;font-family:inherit;
    outline:none;background:#fafafa;
    transition:all .2s;box-sizing:border-box;
}
.frm-field input:focus,
.frm-field textarea:focus{
    border-color:var(--frm-k);
    background:#fff;
    box-shadow:0 0 0 4px var(--frm-k-shadow);
}
.frm-field textarea{resize:vertical;min-height:120px;line-height:1.5}
.frm-field-row{display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:.72rem;color:#999}
.frm-field-row .frm-counter.warn{color:#e67e22}
.frm-field-row .frm-counter.danger{color:#e74c3c}

.frm-cat-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
    gap:8px;
}
.frm-cat-btn{
    padding:10px 12px;border-radius:12px;
    border:2px solid rgba(0,0,0,.08);
    background:#fafafa;color:#666;
    font-size:.82rem;font-weight:800;
    cursor:pointer;transition:all .25s;
    font-family:inherit;
    display:flex;align-items:center;justify-content:center;gap:6px;
}
.frm-cat-btn:hover{background:#f0f0f0}
.frm-cat-btn.selected{
    background:linear-gradient(135deg,var(--frm-k),var(--frm-k-light));
    color:#fff;border-color:var(--frm-k);
    box-shadow:0 6px 16px -4px var(--frm-k-shadow);
    transform:translateY(-2px);
}

.frm-modal-actions{
    display:flex;gap:10px;margin-top:22px;
}
.frm-btn{
    flex:1;padding:13px;border-radius:12px;
    border:none;font-size:.92rem;font-weight:800;
    cursor:pointer;transition:all .25s;
    font-family:inherit;
    display:inline-flex;align-items:center;
    justify-content:center;gap:6px;
}
.frm-btn.primary{
    background:linear-gradient(135deg,var(--frm-k),var(--frm-k-light));
    color:#fff;
    box-shadow:0 8px 20px -4px var(--frm-k-shadow);
}
.frm-btn.primary:hover{
    transform:translateY(-2px);
    box-shadow:0 12px 28px -6px var(--frm-k-shadow);
}
.frm-btn.primary:disabled{
    opacity:.55;cursor:wait;transform:none;
}
.frm-btn.secondary{background:rgba(0,0,0,.05);color:#666}
.frm-btn.secondary:hover{background:rgba(0,0,0,.08)}
.frm-btn.danger{background:#e74c3c;color:#fff;flex:0;padding:13px 24px}
.frm-btn.danger:hover{background:#c0392b}

/* ═══════════════════ TOAST ═══════════════════ */
.frm-toast{
    position:fixed;bottom:30px;left:50%;
    transform:translateX(-50%) translateY(100px);
    padding:12px 26px;border-radius:30px;
    color:#fff;font-weight:800;font-size:.9rem;
    box-shadow:0 12px 32px rgba(0,0,0,.3);
    z-index:2147483647;
    pointer-events:none;max-width:90vw;text-align:center;
}
.frm-toast.show{
    animation:frmToastIn .4s cubic-bezier(.16,1,.3,1) forwards;
}
.frm-toast.hide{
    animation:frmToastOut .3s ease forwards;
}
.frm-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.frm-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.frm-toast.warning{background:linear-gradient(135deg,#e67e22,#d35400)}
.frm-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}

/* ═══════════════════ SCROLL TOP ═══════════════════ */
.frm-scroll-top{
    position:fixed;bottom:24px;right:24px;
    width:48px;height:48px;border-radius:50%;
    background:linear-gradient(135deg,var(--frm-k),var(--frm-k-light));
    color:#fff;border:none;cursor:pointer;
    font-size:1.2rem;font-family:inherit;
    box-shadow:0 12px 32px -4px var(--frm-k-shadow);
    display:none;align-items:center;justify-content:center;
    z-index:100;
    transition:all .3s cubic-bezier(.16,1,.3,1);
    opacity:0;
}
.frm-scroll-top.show{display:flex;opacity:1;animation:frmPop .3s ease}
.frm-scroll-top:hover{transform:translateY(-4px) scale(1.05)}

/* ═══════════════════ DARK MODE ═══════════════════ */
@media (prefers-color-scheme: dark){
    html body.mars-stars-on .frm-stat,
    html body.mars-stars-on .frm-topic,
    html body.mars-stars-on .frm-toolbar,
    html body.mars-stars-on .frm-side-card,
    html body.mars-stars-on .frm-topic-view,
    html body.mars-stars-on .frm-back{
        background:rgba(20,20,42,.85);
        border-color:rgba(108,99,255,.3);
        color:#e0e0f0;
    }
    html body.mars-stars-on .frm-topic-title,
    html body.mars-stars-on .frm-topic-view-title,
    html body.mars-stars-on .frm-modal-title,
    html body.mars-stars-on .frm-post-author,
    html body.mars-stars-on .frm-trend-title,
    html body.mars-stars-on .frm-author-name{color:#e0e0f0}
    html body.mars-stars-on .frm-topic-preview,
    html body.mars-stars-on .frm-topic-content,
    html body.mars-stars-on .frm-post-content{color:#b0b0c0}
    html body.mars-stars-on .frm-modal{background:#1a1a2e}
    html body.mars-stars-on .frm-field label{color:#d0d0d0}
    html body.mars-stars-on .frm-field input,
    html body.mars-stars-on .frm-field textarea{background:#252550;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
    html body.mars-stars-on .frm-chip{background:rgba(255,255,255,.06);color:#aaa}
    html body.mars-stars-on .frm-chip:hover{background:rgba(255,255,255,.12);color:#fff}
    html body.mars-stars-on .frm-search{background:#252550;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
    html body.mars-stars-on .frm-post{background:rgba(255,255,255,.04)}
    html body.mars-stars-on .frm-post:hover{background:rgba(108,99,255,.1)}
    html body.mars-stars-on .frm-empty{background:rgba(30,30,46,.5)}
    html body.mars-stars-on .frm-empty-title{color:#aaa}
    html body.mars-stars-on .frm-cat-btn{background:rgba(255,255,255,.05);color:#aaa}
    html body.mars-stars-on .frm-topic-content{background:rgba(108,99,255,.08)}
    html body.mars-stars-on .frm-reply-input{background:#252550;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
}

/* ═══════════════════ MOBILE ═══════════════════ */
@media (max-width: 600px){
    .frm-hero{padding:28px 20px;border-radius:18px}
    .frm-hero-title{font-size:1.5rem}
    .frm-hero-icon{font-size:3rem}
    .frm-topic{padding:14px 16px;gap:10px}
    .frm-topic-avatar{width:38px;height:38px}
    .frm-topic-title{font-size:.95rem}
    .frm-topic-preview{font-size:.8rem}
    .frm-topic-meta{font-size:.68rem;gap:8px}
    .frm-modal{padding:22px 18px;border-radius:16px}
    .frm-modal-title{font-size:1.15rem}
    .frm-topic-view{padding:18px 16px}
    .frm-topic-view-title{font-size:1.2rem}
    .frm-topic-view-avatar{width:44px;height:44px}
    .frm-topic-content{padding:14px 16px;font-size:.9rem}
    .frm-post{padding:12px 14px;gap:10px}
    .frm-post-avatar{width:36px;height:36px}
    .frm-post-content{font-size:.86rem}
    .frm-scroll-top{width:42px;height:42px;bottom:20px;right:16px}
    .frm-toolbar{padding:10px 12px;border-radius:12px}
    .frm-chip{padding:6px 11px;font-size:.75rem}
    .frm-search{font-size:.82rem;padding:8px 32px}
    .frm-stat{padding:14px 10px}
    .frm-stat-value{font-size:1.5rem}
    .frm-stat-icon{font-size:1.4rem}
}

@media (prefers-reduced-motion: reduce){
    #frm-app *,
    #frm-app *::before,
    #frm-app *::after{
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

if (window.__frmLoaded) return;
window.__frmLoaded = true;

/* ═══════════════════ SUPABASE ═══════════════════ */
var SUPABASE_URL='https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY='sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var sb=null;
try{
    if (window.supabase && window.supabase.createClient){
        sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
}catch(e){ console.warn('Supabase init failed', e); }

/* ═══════════════════ CONSTANTS ═══════════════════ */
var KINGDOMS = {
    'Аркадия':    { color: '#D4A574', bg: '#FDF8F0', light: '#E8C9A0' },
    'Ксанф':      { color: '#3D3D3D', bg: '#F5F5F5', light: '#6B6B6B' },
    'Эдем':       { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' },
    'Эридания':   { color: '#F5D76E', bg: '#FFFDF5', light: '#FAE9A0' },
    'Кхонг':      { color: '#A9A9A9', bg: '#F8F8F8', light: '#C8C8C8' },
    'Авсония':    { color: '#87CEEB', bg: '#F0F8FF', light: '#B0D8EB' },
    'Кимерия':    { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9' },
    'Серпентида': { color: '#E57373', bg: '#FFF5F5', light: '#F5A0A0' },
    'Эритрей':    { color: '#64B5F6', bg: '#F0F8FF', light: '#90CAF9' },
    'Утопия':     { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' },
    'Эллада':     { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91' },
    'Аливасото':  { color: '#81C784', bg: '#F0FFF0', light: '#A5D6A7' }
};

var CATEGORIES = {
    'general':   { icon: '💬', name: 'Общее' },
    'lore':      { icon: '📜', name: 'Лор' },
    'theories':  { icon: '🔮', name: 'Теории' },
    'help':      { icon: '🆘', name: 'Помощь' },
    'creative':  { icon: '🎨', name: 'Творчество' },
    'offtopic':  { icon: '🎲', name: 'Оффтоп' }
};

var SORTS = {
    'new':        { icon:'🆕', name:'Новые' },
    'hot':        { icon:'🔥', name:'Горячие' },
    'top':        { icon:'⭐', name:'Лучшие' },
    'discussed':  { icon:'💬', name:'Обсуждаемые' },
    'old':        { icon:'📅', name:'Старые' }
};

var RANKS = [
    { min:0,   name:'Новичок', cls:'',         icon:'🌱' },
    { min:10,  name:'Участник', cls:'r-bronze', icon:'📖' },
    { min:50,  name:'Активный', cls:'r-silver', icon:'⚔️' },
    { min:150, name:'Ветеран',  cls:'r-gold',   icon:'🏆' },
    { min:500, name:'Легенда',  cls:'r-legend', icon:'👑' }
];

function getRank(postCount){
    var r = RANKS[0];
    for (var i = 0; i < RANKS.length; i++){
        if (postCount >= RANKS[i].min) r = RANKS[i];
    }
    return r;
}

/* ═══════════════════ STATE ═══════════════════ */
var state = {
    currentUser: null,
    profile: null,
    kingdom: KINGDOMS['Эдем'],
    topics: [],
    counts: {},
    likes: [],
    bookmarks: [],
    profilesMap: {},
    posts: {},
    activeFilter: 'all',
    activeSort: 'new',
    searchQuery: '',
    currentView: 'list',
    activeTopic: null,
    replyQuote: null,
    editingId: null,
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
function avatarFor(name){
    return 'https://ui-avatars.com/api/?name='+encodeURIComponent(name||'?')+'&background=6C63FF&color=fff&size=128&rounded=true';
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
function formatTime(dateStr){
    var date = new Date(dateStr);
    var now = new Date();
    var diff = Math.floor((now - date) / 1000);
    if (diff < 0) return 'только что';
    if (diff < 60) return 'только что';
    if (diff < 3600) return Math.floor(diff/60)+' мин';
    if (diff < 86400) return Math.floor(diff/3600)+' ч';
    if (diff < 604800) return Math.floor(diff/86400)+' дн';
    return date.toLocaleDateString('ru-RU');
}

function toast(msg, type){
    type = type || 'info';
    var old = document.querySelector('.frm-toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'frm-toast ' + type;
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

/* ═══════════════════ DOM ═══════════════════ */
var container = document.getElementById('frm-app');

/* ═══════════════════ LOAD DATA ═══════════════════ */
async function loadData(){
    try{
        if (sb){
            var s = await sb.auth.getSession();
            state.currentUser = s && s.data && s.data.session ? s.data.session.user : null;
            if (state.currentUser){
                var pr = await sb.from('profiles').select('*').eq('user_id', state.currentUser.id).single();
                state.profile = pr && pr.data;
                state.kingdom = (state.profile && KINGDOMS[state.profile.kingdom]) || KINGDOMS['Эдем'];
            }
        }

        // Topics
        var tr = await sb.from('forum_topics').select('*')
            .order('is_pinned', {ascending:false})
            .order('updated_at', {ascending:false});
        state.topics = (tr && tr.data) || [];

        // Posts count per topic + total for authors
        var pr2 = await sb.from('forum_posts').select('topic_id, author_id');
        state.counts = {};
        state.authorPostCounts = {};
        (pr2 && pr2.data || []).forEach(function(x){
            state.counts[x.topic_id] = (state.counts[x.topic_id] || 0) + 1;
            state.authorPostCounts[x.author_id] = (state.authorPostCounts[x.author_id] || 0) + 1;
        });

        // Likes
        var lr = await sb.from('forum_likes').select('*');
        state.likes = (lr && lr.data) || [];

        // Bookmarks
        if (state.currentUser){
            try{
                var br = await sb.from('forum_bookmarks').select('*').eq('user_id', state.currentUser.id);
                state.bookmarks = (br && br.data) || [];
            }catch(e){ state.bookmarks = []; }
        } else {
            state.bookmarks = [];
        }

        // Profiles
        var ids = {};
        state.topics.forEach(function(t){ if (t.author_id) ids[t.author_id] = true; });
        var arr = Object.keys(ids);
        if (arr.length){
            var pf = await sb.from('profiles')
                .select('user_id, username, display_name, avatar_url, role, kingdom')
                .in('user_id', arr);
            state.profilesMap = {};
            (pf && pf.data || []).forEach(function(p){ state.profilesMap[p.user_id] = p; });
        }
    }catch(e){
        console.error('loadData', e);
        toast('Ошибка загрузки данных', 'error');
    }
}

function getLikeCount(type, id){
    return state.likes.filter(function(l){
        return l.target_type === type && l.target_id === id;
    }).length;
}
function isLiked(type, id){
    if (!state.currentUser) return false;
    return state.likes.some(function(l){
        return l.user_id === state.currentUser.id &&
            l.target_type === type && l.target_id === id;
    });
}
function isBookmarked(topicId){
    return state.bookmarks.some(function(b){ return b.topic_id === topicId; });
}

/* ═══════════════════ ACTIONS ═══════════════════ */
async function createTopic(title, content, category){
    if (state.busy) return;
    if (!state.currentUser){ toast('Войдите', 'warning'); return; }
    if (!title || title.length < 3){ toast('Заголовок: минимум 3 символа', 'warning'); return; }
    if (!content || content.length < 10){ toast('Текст: минимум 10 символов', 'warning'); return; }
    state.busy = true;
    try{
        var r = await sb.from('forum_topics').insert([{
            title: title.trim(),
            content: content.trim(),
            category: category,
            author_id: state.currentUser.id
        }]);
        if (r.error){ toast('Ошибка: ' + r.error.message, 'error'); return; }
        toast('✅ Тема создана', 'success');
        vibrate(20);
        await loadData();
        render();
    }catch(e){ toast('Ошибка', 'error'); }
    finally{ state.busy = false; }
}

async function toggleLike(type, id){
    if (!state.currentUser){ toast('Войдите, чтобы лайкать', 'warning'); return; }
    if (state.busy) return;
    state.busy = true;
    try{
        if (isLiked(type, id)){
            await sb.from('forum_likes').delete()
                .eq('user_id', state.currentUser.id)
                .eq('target_type', type).eq('target_id', id);
        } else {
            await sb.from('forum_likes').insert([{
                user_id: state.currentUser.id,
                target_type: type, target_id: id
            }]);
            vibrate(15);
        }
        await loadData();
        if (state.currentView === 'topic') renderTopicView();
        else render();
    }catch(e){ toast('Ошибка', 'error'); }
    finally{ state.busy = false; }
}

async function toggleBookmark(topicId, ev){
    if (ev) ev.stopPropagation();
    if (!state.currentUser){ toast('Войдите, чтобы сохранять', 'warning'); return; }
    if (state.busy) return;
    state.busy = true;
    try{
        if (isBookmarked(topicId)){
            await sb.from('forum_bookmarks').delete()
                .eq('user_id', state.currentUser.id).eq('topic_id', topicId);
            toast('Убрано из закладок', 'info');
        } else {
            await sb.from('forum_bookmarks').insert([{
                user_id: state.currentUser.id, topic_id: topicId
            }]);
            toast('⭐ Добавлено в закладки', 'success');
            vibrate(15);
        }
        await loadData();
        render();
    }catch(e){ toast('Ошибка', 'error'); }
    finally{ state.busy = false; }
}

async function addReply(topicId, content, quoteId){
    if (state.busy) return;
    if (!state.currentUser){ toast('Войдите', 'warning'); return; }
    if (!content || content.length < 2){ toast('Слишком коротко', 'warning'); return; }
    state.busy = true;
    try{
        var r = await sb.from('forum_posts').insert([{
            topic_id: topicId,
            content: content.trim(),
            author_id: state.currentUser.id
        }]);
        if (r.error){ toast('Ошибка: ' + r.error.message, 'error'); return; }
        toast('✅ Ответ добавлен', 'success');
        vibrate(15);
        // Update topic updated_at
        try{
            await sb.from('forum_topics').update({updated_at: new Date().toISOString()}).eq('id', topicId);
        }catch(e){}
        await loadData();
        await openTopic(topicId, true);
    }catch(e){ toast('Ошибка', 'error'); }
    finally{ state.busy = false; }
}

async function editTopic(topicId, title, content){
    if (state.busy) return;
    state.busy = true;
    try{
        var r = await sb.from('forum_topics').update({
            title: title.trim(),
            content: content.trim(),
            edited_at: new Date().toISOString()
        }).eq('id', topicId);
        if (r.error){ toast('Ошибка: ' + r.error.message, 'error'); return; }
        toast('✅ Сохранено', 'success');
        await loadData();
        await openTopic(topicId, true);
    }catch(e){ toast('Ошибка', 'error'); }
    finally{ state.busy = false; }
}

async function editPost(postId, content){
    if (state.busy) return;
    state.busy = true;
    try{
        var r = await sb.from('forum_posts').update({
            content: content.trim(),
            edited_at: new Date().toISOString()
        }).eq('id', postId);
        if (r.error){ toast('Ошибка: ' + r.error.message, 'error'); return; }
        toast('✅ Сохранено', 'success');
        await openTopic(state.activeTopic.id, true);
    }catch(e){ toast('Ошибка', 'error'); }
    finally{ state.busy = false; }
}

async function deleteTopic(topicId){
    if (!confirm('Удалить тему со всеми ответами?')) return;
    try{
        await sb.from('forum_topics').delete().eq('id', topicId);
        toast('Тема удалена', 'info');
        state.currentView = 'list';
        await loadData();
        render();
    }catch(e){ toast('Ошибка', 'error'); }
}

async function deletePost(postId){
    if (!confirm('Удалить ответ?')) return;
    try{
        await sb.from('forum_posts').delete().eq('id', postId);
        toast('Ответ удалён', 'info');
        await openTopic(state.activeTopic.id, true);
    }catch(e){ toast('Ошибка', 'error'); }
}

async function openTopic(id, skipViews){
    try{
        var r = await sb.from('forum_posts')
            .select('*').eq('topic_id', id)
            .order('created_at', {ascending:true});
        state.posts[id] = (r && r.data) || [];

        var ids = {};
        state.posts[id].forEach(function(p){ ids[p.author_id] = true; });
        var arr = Object.keys(ids);
        if (arr.length){
            var pf = await sb.from('profiles')
                .select('user_id, username, display_name, avatar_url, role')
                .in('user_id', arr);
            (pf && pf.data || []).forEach(function(p){ state.profilesMap[p.user_id] = p; });
        }

        if (!skipViews){
            try{
                var cur = state.topics.filter(function(t){ return t.id === id; })[0];
                await sb.from('forum_topics')
                    .update({views: (cur && cur.views || 0) + 1}).eq('id', id);
                if (cur) cur.views = (cur.views || 0) + 1;
            }catch(e){}
        }

        state.activeTopic = state.topics.filter(function(t){ return t.id === id; })[0];
        if (!state.activeTopic){
            // Fetch topic if missing
            var tr = await sb.from('forum_topics').select('*').eq('id', id).single();
            state.activeTopic = tr && tr.data;
        }
        state.currentView = 'topic';
        state.replyQuote = null;
        renderTopicView();
        if (!skipViews) window.scrollTo({top: 0, behavior: 'smooth'});
    }catch(e){
        toast('Ошибка загрузки темы', 'error');
    }
}

/* ═══════════════════ RENDER LIST ═══════════════════ */
function render(){
    applyTheme();
    var totalTopics = state.topics.length;
    var totalPosts = Object.values(state.counts).reduce(function(s, c){ return s + c; }, 0);
    var totalLikes = state.likes.length;
    var authors = new Set(state.topics.map(function(t){ return t.author_id; })).size;

    var filtered = filterAndSortTopics();

    container.innerHTML =
        renderHero() +
        '<div class="frm-stats-grid frm-fade" style="animation-delay:.1s;">' +
            statBlock('📝', totalTopics, 'Тем') +
            statBlock('💬', totalPosts, 'Ответов') +
            statBlock('❤️', totalLikes, 'Лайков') +
            statBlock('👥', authors, 'Авторов') +
        '</div>' +
        '<div class="frm-layout">' +
            '<div>' +
                renderToolbar() +
                (filtered.length === 0 ? renderEmpty() : filtered.map(renderTopicCard).join('')) +
            '</div>' +
            renderSidebar() +
        '</div>' +
        '<button class="frm-scroll-top" id="frm-scroll-top" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">↑</button>';
    bindScrollTop();
}

function statBlock(icon, value, label){
    return '<div class="frm-stat"><div class="frm-stat-icon">' + icon + '</div>' +
        '<div class="frm-stat-value">' + value + '</div>' +
        '<div class="frm-stat-label">' + label + '</div></div>';
}

function renderHero(){
    return '<div class="frm-hero frm-fade">' +
        '<div class="frm-hero-content">' +
            '<div class="frm-hero-icon">💬</div>' +
            '<h1 class="frm-hero-title">Форум Марса</h1>' +
            '<p class="frm-hero-sub">' +
                (state.currentUser ? 'Обсуждай, спрашивай, делись идеями' : 'Войдите, чтобы участвовать в обсуждениях') +
            '</p>' +
            '<div class="frm-hero-actions">' +
                (state.currentUser ? '<button class="frm-hero-btn primary" onclick="frmCreate()">➕ Новая тема</button>' : '') +
                (!state.currentUser ? '<a href="/login/" class="frm-hero-btn primary">🔐 Войти</a>' : '') +
            '</div>' +
        '</div>' +
    '</div>';
}

function renderToolbar(){
    var chips = '<button class="frm-chip ' + (state.activeFilter === 'all' ? 'active' : '') +
        '" onclick="frmFilter(\'all\')">🌐 Все</button>';
    Object.keys(CATEGORIES).forEach(function(k){
        var c = CATEGORIES[k];
        chips += '<button class="frm-chip cat-' + k + ' ' + (state.activeFilter === k ? 'active' : '') +
            '" onclick="frmFilter(\'' + k + '\')">' + c.icon + ' ' + esc(c.name) + '</button>';
    });

    var sorts = '';
    Object.keys(SORTS).forEach(function(k){
        var s = SORTS[k];
        sorts += '<button class="frm-chip ' + (state.activeSort === k ? 'active' : '') +
            '" onclick="frmSort(\'' + k + '\')">' + s.icon + ' ' + esc(s.name) + '</button>';
    });

    return '<div class="frm-toolbar frm-fade" style="animation-delay:.15s;">' +
        '<div class="frm-toolbar-row">' +
            '<span class="frm-toolbar-label">Категории:</span>' + chips +
        '</div>' +
        '<div class="frm-toolbar-row" style="margin-top:8px;">' +
            '<span class="frm-toolbar-label">Сортировка:</span>' + sorts +
            '<div class="frm-search-wrap' + (state.searchQuery ? ' has-value' : '') + '" id="frm-search-wrap">' +
                '<span class="frm-search-icon">🔍</span>' +
                '<input class="frm-search" type="text" placeholder="Поиск по темам..." value="' + escAttr(state.searchQuery) + '" oninput="frmSearch(this.value)">' +
                '<button class="frm-search-clear" onclick="frmClearSearch()">✕</button>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function filterAndSortTopics(){
    var filtered = state.topics.slice();
    if (state.activeFilter === 'bookmarks'){
        filtered = filtered.filter(function(t){ return isBookmarked(t.id); });
    } else if (state.activeFilter === 'mine' && state.currentUser){
        filtered = filtered.filter(function(t){ return t.author_id === state.currentUser.id; });
    } else if (state.activeFilter !== 'all'){
        filtered = filtered.filter(function(t){ return t.category === state.activeFilter; });
    }
    if (state.searchQuery){
        var q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(function(t){
            return (t.title || '').toLowerCase().indexOf(q) !== -1 ||
                (t.content || '').toLowerCase().indexOf(q) !== -1;
        });
    }
    filtered.sort(function(a, b){
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        switch (state.activeSort){
            case 'new':       return new Date(b.created_at) - new Date(a.created_at);
            case 'old':       return new Date(a.created_at) - new Date(b.created_at);
            case 'hot': {
                var ha = scoreHot(a); var hb = scoreHot(b);
                return hb - ha;
            }
            case 'top':       return getLikeCount('topic', b.id) - getLikeCount('topic', a.id);
            case 'discussed': return (state.counts[b.id] || 0) - (state.counts[a.id] || 0);
        }
        return 0;
    });
    return filtered;
}

function scoreHot(t){
    // Simple hot score: views + posts*3 + likes*2 / age_hours
    var ageH = Math.max(1, (Date.now() - new Date(t.created_at)) / 3600000);
    return ((t.views || 0) + (state.counts[t.id] || 0) * 3 + getLikeCount('topic', t.id) * 2) / ageH;
}

function renderTopicCard(t, i){
    var author = state.profilesMap[t.author_id] || {};
    var name = author.display_name || author.username || 'Аноним';
    var av = author.avatar_url || avatarFor(name);
    var cat = CATEGORIES[t.category] || CATEGORIES.general;
    var replies = state.counts[t.id] || 0;
    var likesCount = getLikeCount('topic', t.id);
    var bookmarked = isBookmarked(t.id);
    var isNew = (Date.now() - new Date(t.created_at)) < 86400000 * 2;
    var authorPostCount = state.authorPostCounts[t.author_id] || 0;
    var rank = getRank(authorPostCount);

    return '<div class="frm-topic ' + (t.is_pinned ? 'pinned' : '') + ' frm-fade" ' +
        'style="animation-delay:' + Math.min(i * .03, .4) + 's;" ' +
        'onclick="frmOpen(' + t.id + ')">' +
        '<button class="frm-topic-bookmark ' + (bookmarked ? 'active' : '') + '" ' +
            'onclick="frmBookmark(' + t.id + ', event)" title="' + (bookmarked ? 'Убрать из закладок' : 'В закладки') + '">' +
            (bookmarked ? '⭐' : '☆') +
        '</button>' +
        '<img class="frm-topic-avatar" src="' + escAttr(av) + '" alt="" loading="lazy">' +
        '<div class="frm-topic-body">' +
            '<div class="frm-topic-header">' +
                '<h3 class="frm-topic-title">' + esc(t.title) + '</h3>' +
                '<span class="frm-badge category">' + cat.icon + ' ' + esc(cat.name) + '</span>' +
                (t.is_pinned ? '<span class="frm-badge pinned">📌 Закреплено</span>' : '') +
                (isNew && !t.is_pinned ? '<span class="frm-badge new">NEW</span>' : '') +
                (t.edited_at ? '<span class="frm-badge edited">изм.</span>' : '') +
            '</div>' +
            '<p class="frm-topic-preview">' + esc(t.content) + '</p>' +
            '<div class="frm-topic-meta">' +
                '<span>' + rank.icon + ' <span class="frm-author-link">' + esc(name) + '</span></span>' +
                '<span>🕐 ' + formatTime(t.created_at) + '</span>' +
                '<span>💬 ' + replies + '</span>' +
                '<span>❤️ ' + likesCount + '</span>' +
                '<span>👁️ ' + (t.views || 0) + '</span>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function renderEmpty(){
    if (state.searchQuery){
        return '<div class="frm-empty"><div class="frm-empty-icon">🔍</div>' +
            '<div class="frm-empty-title">Ничего не найдено по запросу «' + esc(state.searchQuery) + '»</div>' +
        '</div>';
    }
    if (state.activeFilter === 'bookmarks'){
        return '<div class="frm-empty"><div class="frm-empty-icon">⭐</div>' +
            '<div class="frm-empty-title">Закладок пока нет</div>' +
        '</div>';
    }
    return '<div class="frm-empty"><div class="frm-empty-icon">💬</div>' +
        '<div class="frm-empty-title">Пока нет тем</div>' +
        (state.currentUser ? '<button class="frm-btn primary" style="max-width:200px;margin:0 auto;" onclick="frmCreate()">➕ Создать первую</button>' : '') +
    '</div>';
}

/* ═══════════════════ SIDEBAR ═══════════════════ */
function renderSidebar(){
    // Top 5 trending
    var trending = state.topics.slice().filter(function(t){ return !t.is_pinned; })
        .sort(function(a, b){ return scoreHot(b) - scoreHot(a); })
        .slice(0, 5);

    var trendHtml = trending.map(function(t, i){
        var numCls = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        return '<div class="frm-trend" onclick="frmOpen(' + t.id + ')">' +
            '<div class="frm-trend-num ' + numCls + '">' + (i + 1) + '</div>' +
            '<div class="frm-trend-info">' +
                '<div class="frm-trend-title">' + esc(t.title) + '</div>' +
                '<div class="frm-trend-meta">💬 ' + (state.counts[t.id] || 0) + ' · 👁 ' + (t.views || 0) + '</div>' +
            '</div>' +
        '</div>';
    }).join('');

    // Top 5 authors by post count
    var authorCounts = state.authorPostCounts || {};
    var topAuthors = Object.keys(authorCounts)
        .sort(function(a, b){ return authorCounts[b] - authorCounts[a]; })
        .slice(0, 5)
        .map(function(uid){
            var p = state.profilesMap[uid] || {};
            var name = p.display_name || p.username || 'Аноним';
            var av = p.avatar_url || avatarFor(name);
            var rank = getRank(authorCounts[uid]);
            return '<div class="frm-author">' +
                '<img class="frm-author-avatar" src="' + escAttr(av) + '" alt="" loading="lazy">' +
                '<div class="frm-author-info">' +
                    '<div class="frm-author-name">' + rank.icon + ' ' + esc(name) + '</div>' +
                    '<div class="frm-author-meta">' + esc(rank.name) + '</div>' +
                '</div>' +
                '<div class="frm-author-count">' + authorCounts[uid] + '</div>' +
            '</div>';
        }).join('');

    var bookmarkChip = state.currentUser
        ? '<button class="frm-chip ' + (state.activeFilter === 'bookmarks' ? 'active' : '') +
            '" onclick="frmFilter(\'bookmarks\')" style="width:100%;justify-content:center;margin-bottom:6px;">⭐ Мои закладки</button>' +
          '<button class="frm-chip ' + (state.activeFilter === 'mine' ? 'active' : '') +
            '" onclick="frmFilter(\'mine\')" style="width:100%;justify-content:center;">📝 Мои темы</button>'
        : '';

    return '<aside class="frm-sidebar">' +
        (bookmarkChip ? '<div class="frm-side-card"><div class="frm-side-title">🧭 Быстрый доступ</div>' + bookmarkChip + '</div>' : '') +
        (trending.length ? '<div class="frm-side-card"><div class="frm-side-title">🔥 Trending</div>' + trendHtml + '</div>' : '') +
        (topAuthors ? '<div class="frm-side-card"><div class="frm-side-title">🏆 Топ авторов</div>' + topAuthors + '</div>' : '') +
    '</aside>';
}

/* ═══════════════════ RENDER TOPIC VIEW ═══════════════════ */
function renderTopicView(){
    applyTheme();
    var t = state.activeTopic;
    if (!t){ state.currentView = 'list'; render(); return; }

    var author = state.profilesMap[t.author_id] || {};
    var name = author.display_name || author.username || 'Аноним';
    var av = author.avatar_url || avatarFor(name);
    var cat = CATEGORIES[t.category] || CATEGORIES.general;
    var topicPosts = state.posts[t.id] || [];
    var isAuthor = state.currentUser && state.currentUser.id === t.author_id;
    var likesCount = getLikeCount('topic', t.id);
    var liked = isLiked('topic', t.id);
    var bookmarked = isBookmarked(t.id);
    var authorPostCount = state.authorPostCounts[t.author_id] || 0;
    var rank = getRank(authorPostCount);

    var postsHtml = topicPosts.length === 0
        ? '<div class="frm-empty" style="padding:30px 20px;"><div class="frm-empty-icon" style="font-size:2.5rem;">💬</div><div class="frm-empty-title">Пока нет ответов. Будь первым!</div></div>'
        : topicPosts.map(function(p, i){ return renderPost(p, i, t); }).join('');

    container.innerHTML =
        '<button class="frm-back" onclick="frmBack()">← К темам</button>' +
        '<div class="frm-topic-view frm-fade">' +
            '<div class="frm-topic-view-header">' +
                '<img class="frm-topic-view-avatar" src="' + escAttr(av) + '" alt="">' +
                '<div style="flex:1;min-width:0;">' +
                    '<h1 class="frm-topic-view-title">' + esc(t.title) + '</h1>' +
                    '<div class="frm-topic-view-meta">' +
                        '<span>' + rank.icon + ' <b style="color:var(--frm-k)">' + esc(name) + '</b></span>' +
                        '<span>🕐 ' + formatTime(t.created_at) + '</span>' +
                        '<span class="frm-badge category">' + cat.icon + ' ' + esc(cat.name) + '</span>' +
                        '<span>👁️ ' + (t.views || 0) + '</span>' +
                        (t.edited_at ? '<span class="frm-badge edited">изменено</span>' : '') +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="frm-topic-content">' + esc(t.content) + '</div>' +
            '<div class="frm-topic-actions">' +
                '<button class="frm-icon-btn ' + (liked ? 'liked' : '') + '" onclick="frmLike(\'topic\', ' + t.id + ')">' +
                    '<span class="frm-icon-btn-icon">' + (liked ? '❤️' : '🤍') + '</span> ' + likesCount +
                '</button>' +
                '<button class="frm-icon-btn" onclick="frmBookmark(' + t.id + ', event)">' +
                    (bookmarked ? '⭐ В закладках' : '☆ В закладки') +
                '</button>' +
                '<button class="frm-icon-btn" onclick="frmCopyLink(' + t.id + ')">🔗 Ссылка</button>' +
                (isAuthor ? '<button class="frm-icon-btn" onclick="frmEditTopic(' + t.id + ')">✏️ Изменить</button>' : '') +
                (isAuthor ? '<button class="frm-icon-btn danger" onclick="frmDeleteTopic(' + t.id + ')">🗑️ Удалить</button>' : '') +
            '</div>' +
            '<div class="frm-posts-title">💬 Ответы <span class="frm-posts-count">' + topicPosts.length + '</span></div>' +
            postsHtml +
            renderReplyBox(t) +
        '</div>' +
        '<button class="frm-scroll-top" id="frm-scroll-top" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">↑</button>';
    bindScrollTop();
}

function renderPost(p, i, topic){
    var pa = state.profilesMap[p.author_id] || {};
    var pname = pa.display_name || pa.username || 'Аноним';
    var pav = pa.avatar_url || avatarFor(pname);
    var likesCount = getLikeCount('post', p.id);
    var liked = isLiked('post', p.id);
    var isMe = state.currentUser && state.currentUser.id === p.author_id;
    var postCount = state.authorPostCounts[p.author_id] || 0;
    var rank = getRank(postCount);

    return '<div class="frm-post" style="animation-delay:' + Math.min(i * .05, .4) + 's;">' +
        '<img class="frm-post-avatar" src="' + escAttr(pav) + '" alt="">' +
        '<div class="frm-post-body">' +
            '<div class="frm-post-header">' +
                '<span class="frm-post-author">' + esc(pname) + '</span>' +
                '<span class="frm-post-rank ' + rank.cls + '">' + rank.icon + ' ' + rank.name + '</span>' +
                '<span class="frm-post-date">' + formatTime(p.created_at) + '</span>' +
                (p.edited_at ? '<span class="frm-badge edited" style="font-size:.6rem;">изм.</span>' : '') +
                (isMe ? '<span style="color:#999;font-size:.7rem;">(вы)</span>' : '') +
            '</div>' +
            '<div class="frm-post-content">' + esc(p.content) + '</div>' +
            '<div class="frm-post-actions">' +
                '<button class="frm-icon-btn ' + (liked ? 'liked' : '') + '" onclick="frmLike(\'post\', ' + p.id + ')">' +
                    '<span class="frm-icon-btn-icon">' + (liked ? '❤️' : '🤍') + '</span> ' + likesCount +
                '</button>' +
                (state.currentUser ? '<button class="frm-icon-btn" onclick="frmQuote(\'' + escAttr(pname) + '\', \'' + escAttr(p.content.slice(0, 80)) + '\')">💬 Ответить</button>' : '') +
                (isMe ? '<button class="frm-icon-btn" onclick="frmEditPost(' + p.id + ')">✏️</button>' : '') +
                (isMe ? '<button class="frm-icon-btn danger" onclick="frmDeletePost(' + p.id + ')">🗑️</button>' : '') +
            '</div>' +
        '</div>' +
    '</div>';
}

function renderReplyBox(topic){
    if (!state.currentUser){
        return '<div class="frm-reply-box" style="text-align:center;">' +
            '<a href="/login/" class="frm-btn primary" style="display:inline-block;max-width:240px;">🔐 Войдите, чтобы ответить</a>' +
        '</div>';
    }
    var draft = safeGet('frm_draft_' + topic.id, '');
    var quoteHtml = state.replyQuote
        ? '<div class="frm-quote-preview" id="frm-quote-preview">' +
            '<div>↩ <b>' + esc(state.replyQuote.author) + ':</b> ' + esc(state.replyQuote.text) + '</div>' +
            '<button onclick="frmClearQuote()">✕</button>' +
          '</div>'
        : '<div class="frm-quote-preview" id="frm-quote-preview" style="display:none;"></div>';

    return '<div class="frm-reply-box">' +
        '<h3 class="frm-reply-title">✍️ Ваш ответ</h3>' +
        quoteHtml +
        '<textarea class="frm-reply-input" id="frm-reply-input" maxlength="3000" placeholder="Напишите ответ..." oninput="frmDraftInput(' + topic.id + ', this.value)">' + esc(draft) + '</textarea>' +
        '<div class="frm-reply-bar">' +
            '<span class="frm-counter" id="frm-reply-counter">' + draft.length + ' / 3000</span>' +
            '<button class="frm-btn primary" style="flex:0;padding:11px 26px;" onclick="frmReply(' + topic.id + ')">📤 Отправить</button>' +
        '</div>' +
    '</div>';
}

/* ═══════════════════ MODALS ═══════════════════ */
function openCreateModal(){
    if (!state.currentUser){ toast('Войдите', 'warning'); return; }
    var overlay = document.createElement('div');
    overlay.className = 'frm-modal-overlay';
    var catHtml = Object.keys(CATEGORIES).map(function(k, i){
        var c = CATEGORIES[k];
        return '<button type="button" class="frm-cat-btn ' + (i === 0 ? 'selected' : '') + '" data-cat="' + k + '">' +
            c.icon + ' ' + esc(c.name) + '</button>';
    }).join('');
    overlay.innerHTML =
        '<div class="frm-modal">' +
            '<button class="frm-modal-close" onclick="this.closest(\'.frm-modal-overlay\').remove()">✕</button>' +
            '<h2 class="frm-modal-title">➕ Новая тема</h2>' +
            '<div class="frm-field"><label>Заголовок</label>' +
                '<input type="text" id="frm-topic-title" placeholder="О чём хотите поговорить?" maxlength="150" autocomplete="off">' +
                '<div class="frm-field-row"><span></span><span class="frm-counter" id="frm-title-counter">0 / 150</span></div>' +
            '</div>' +
            '<div class="frm-field"><label>Категория</label>' +
                '<div class="frm-cat-grid" id="frm-cat-picker">' + catHtml + '</div>' +
            '</div>' +
            '<div class="frm-field"><label>Текст</label>' +
                '<textarea id="frm-topic-content" placeholder="Расскажите подробнее..." maxlength="5000"></textarea>' +
                '<div class="frm-field-row"><span></span><span class="frm-counter" id="frm-content-counter">0 / 5000</span></div>' +
            '</div>' +
            '<div class="frm-modal-actions">' +
                '<button class="frm-btn secondary" onclick="this.closest(\'.frm-modal-overlay\').remove()">Отмена</button>' +
                '<button class="frm-btn primary" id="frm-submit-topic">📤 Опубликовать</button>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlay);

    var titleIn = overlay.querySelector('#frm-topic-title');
    var contentIn = overlay.querySelector('#frm-topic-content');
    var titleCnt = overlay.querySelector('#frm-title-counter');
    var contentCnt = overlay.querySelector('#frm-content-counter');

    titleIn.addEventListener('input', function(){
        updateCounter(titleCnt, titleIn.value.length, 150);
    });
    contentIn.addEventListener('input', function(){
        updateCounter(contentCnt, contentIn.value.length, 5000);
    });

    overlay.querySelectorAll('.frm-cat-btn').forEach(function(btn){
        btn.onclick = function(){
            overlay.querySelectorAll('.frm-cat-btn').forEach(function(b){ b.classList.remove('selected'); });
            btn.classList.add('selected');
        };
    });

    overlay.querySelector('#frm-submit-topic').onclick = async function(){
        var btn = this;
        btn.disabled = true;
        var title = titleIn.value;
        var content = contentIn.value;
        var catBtn = overlay.querySelector('.frm-cat-btn.selected');
        var cat = catBtn ? catBtn.dataset.cat : 'general';
        await createTopic(title, content, cat);
        overlay.remove();
    };

    setTimeout(function(){ titleIn.focus(); }, 100);
}

function updateCounter(el, len, max){
    el.textContent = len + ' / ' + max;
    el.classList.remove('warn', 'danger');
    if (len > max * 0.9) el.classList.add('danger');
    else if (len > max * 0.75) el.classList.add('warn');
}

function openEditTopicModal(topicId){
    var t = state.topics.filter(function(x){ return x.id === topicId; })[0];
    if (!t) return;
    var overlay = document.createElement('div');
    overlay.className = 'frm-modal-overlay';
    overlay.innerHTML =
        '<div class="frm-modal">' +
            '<button class="frm-modal-close" onclick="this.closest(\'.frm-modal-overlay\').remove()">✕</button>' +
            '<h2 class="frm-modal-title">✏️ Редактировать тему</h2>' +
            '<div class="frm-field"><label>Заголовок</label>' +
                '<input type="text" id="frm-edit-title" maxlength="150" value="' + escAttr(t.title) + '">' +
            '</div>' +
            '<div class="frm-field"><label>Текст</label>' +
                '<textarea id="frm-edit-content" maxlength="5000" style="min-height:180px;">' + esc(t.content) + '</textarea>' +
            '</div>' +
            '<div class="frm-modal-actions">' +
                '<button class="frm-btn secondary" onclick="this.closest(\'.frm-modal-overlay\').remove()">Отмена</button>' +
                '<button class="frm-btn primary" id="frm-edit-submit">💾 Сохранить</button>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlay);

    overlay.querySelector('#frm-edit-submit').onclick = async function(){
        this.disabled = true;
        await editTopic(topicId,
            overlay.querySelector('#frm-edit-title').value,
            overlay.querySelector('#frm-edit-content').value
        );
        overlay.remove();
    };
}

function openEditPostModal(postId){
    var topicId = state.activeTopic.id;
    var p = (state.posts[topicId] || []).filter(function(x){ return x.id === postId; })[0];
    if (!p) return;
    var overlay = document.createElement('div');
    overlay.className = 'frm-modal-overlay';
    overlay.innerHTML =
        '<div class="frm-modal">' +
            '<button class="frm-modal-close" onclick="this.closest(\'.frm-modal-overlay\').remove()">✕</button>' +
            '<h2 class="frm-modal-title">✏️ Редактировать ответ</h2>' +
            '<div class="frm-field"><label>Текст</label>' +
                '<textarea id="frm-edit-post" maxlength="3000" style="min-height:160px;">' + esc(p.content) + '</textarea>' +
            '</div>' +
            '<div class="frm-modal-actions">' +
                '<button class="frm-btn secondary" onclick="this.closest(\'.frm-modal-overlay\').remove()">Отмена</button>' +
                '<button class="frm-btn primary" id="frm-edit-post-submit">💾 Сохранить</button>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#frm-edit-post-submit').onclick = async function(){
        this.disabled = true;
        await editPost(postId, overlay.querySelector('#frm-edit-post').value);
        overlay.remove();
    };
}

/* ═══════════════════ THEME ═══════════════════ */
function applyTheme(){
    var k = state.kingdom;
    var root = document.documentElement;
    root.style.setProperty('--frm-k', k.color);
    root.style.setProperty('--frm-k-light', k.light);
    root.style.setProperty('--frm-k-bg', k.bg);
    root.style.setProperty('--frm-k-shadow', k.color + '40');
}

/* ═══════════════════ SCROLL TOP ═══════════════════ */
function bindScrollTop(){
    var btn = document.getElementById('frm-scroll-top');
    if (!btn) return;
    function check(){
        if (window.scrollY > 400) btn.classList.add('show');
        else btn.classList.remove('show');
    }
    window.addEventListener('scroll', check, {passive:true});
    check();
}

/* ═══════════════════ DRAFT AUTOSAVE ═══════════════════ */
function saveDraft(topicId, value){
    safeSet('frm_draft_' + topicId, value);
}
function clearDraft(topicId){
    try{ localStorage.removeItem('frm_draft_' + topicId); }catch(e){}
}

/* ═══════════════════ EXPORT ═══════════════════ */
window.frmCreate = openCreateModal;
window.frmOpen = openTopic;
window.frmBack = function(){ state.currentView = 'list'; state.activeTopic = null; state.replyQuote = null; render(); };
window.frmDeleteTopic = deleteTopic;
window.frmDeletePost = deletePost;
window.frmLike = toggleLike;
window.frmBookmark = toggleBookmark;
window.frmFilter = function(f){ state.activeFilter = f; render(); };
window.frmSort = function(s){ state.activeSort = s; render(); };
window.frmEditTopic = openEditTopicModal;
window.frmEditPost = openEditPostModal;

window.frmReply = function(topicId){
    var input = document.getElementById('frm-reply-input');
    if (!input) return;
    var val = input.value;
    addReply(topicId, val, null).then(function(){
        if (state.currentUser) clearDraft(topicId);
    });
};

window.frmQuote = function(author, text){
    state.replyQuote = { author: author, text: text };
    var box = document.getElementById('frm-quote-preview');
    if (box){
        box.style.display = 'flex';
        box.innerHTML = '<div>↩ <b>' + esc(author) + ':</b> ' + esc(text) + '</div>' +
            '<button onclick="frmClearQuote()">✕</button>';
    }
    var input = document.getElementById('frm-reply-input');
    if (input){
        input.focus();
        input.scrollIntoView({behavior:'smooth', block:'center'});
    }
};
window.frmClearQuote = function(){
    state.replyQuote = null;
    var box = document.getElementById('frm-quote-preview');
    if (box) box.style.display = 'none';
};

window.frmDraftInput = function(topicId, value){
    saveDraft(topicId, value);
    var cnt = document.getElementById('frm-reply-counter');
    if (cnt){
        cnt.textContent = value.length + ' / 3000';
        cnt.classList.remove('warn', 'danger');
        if (value.length > 2700) cnt.classList.add('danger');
        else if (value.length > 2250) cnt.classList.add('warn');
    }
};

window.frmCopyLink = function(topicId){
    var url = location.origin + location.pathname + '?t=' + topicId;
    if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(url).then(function(){
            toast('🔗 Ссылка скопирована', 'success');
        });
    } else {
        try{
            var ta = document.createElement('textarea');
            ta.value = url; ta.style.position = 'fixed'; ta.style.left = '-9999px';
            document.body.appendChild(ta); ta.select();
            document.execCommand('copy');
            ta.remove();
            toast('🔗 Ссылка скопирована', 'success');
        }catch(e){}
    }
};

var searchTimer;
window.frmSearch = function(v){
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function(){
        state.searchQuery = v;
        render();
        // Restore focus after render
        var inp = document.querySelector('.frm-search');
        if (inp){ inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    }, 250);
};
window.frmClearSearch = function(){
    state.searchQuery = '';
    render();
};

/* ═══════════════════ URL PARAMS ═══════════════════ */
function checkURLParams(){
    var p = new URLSearchParams(location.search);
    var t = p.get('t');
    if (t){
        var topicId = parseInt(t, 10);
        if (!isNaN(topicId)){
            openTopic(topicId);
        }
    }
}

/* ═══════════════════ INIT ═══════════════════ */
async function init(){
    try{
        await loadData();
        render();
        checkURLParams();
        console.log('💬 Форум v2 VIP. Тем: ' + state.topics.length);
    }catch(e){
        console.error(e);
        container.innerHTML = '<div class="frm-empty" style="margin-top:40px;">' +
            '<div class="frm-empty-icon">⚠️</div>' +
            '<div class="frm-empty-title">Не удалось загрузить форум</div>' +
            '<button class="frm-btn primary" style="max-width:200px;margin:0 auto;" onclick="location.reload()">Попробовать снова</button>' +
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
