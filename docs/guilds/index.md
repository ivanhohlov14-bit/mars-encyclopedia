---
title: Гильдии
comments: false
---

<div id="gld-app">
  <div style="text-align:center;padding:60px 20px;">
    <div style="display:inline-block;width:48px;height:48px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:gldSpin .8s linear infinite;"></div>
    <p style="color:#999;margin-top:16px;">Загрузка гильдий...</p>
  </div>
</div>

<style>
:root{--gk:#6C63FF;--gk-l:#A29BFE;--gk-s:rgba(108,99,255,.25);--gold:#f39c12;--vip-gold:#f5d76e}
@keyframes gldSpin{to{transform:rotate(360deg)}}
@keyframes gldFade{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes gldFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes gldShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes gldRise{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes gldCrown{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-4px) rotate(3deg)}}
@keyframes gldPop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}
@keyframes gldMsg{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
@keyframes gldNodePulse{0%,100%{box-shadow:0 0 0 0 rgba(108,99,255,.6),0 8px 24px -4px var(--gk-s)}50%{box-shadow:0 0 0 12px rgba(108,99,255,0),0 8px 24px -4px var(--gk-s)}}
@keyframes gldNodeReady{0%,100%{box-shadow:0 0 0 0 rgba(39,174,96,.7),0 0 20px rgba(39,174,96,.5)}50%{box-shadow:0 0 0 16px rgba(39,174,96,0),0 0 30px rgba(39,174,96,.8)}}
@keyframes gldConfetti{0%{transform:translate(0,0) rotate(0);opacity:1}100%{transform:translate(var(--cx),var(--cy)) rotate(var(--cr));opacity:0}}
@keyframes gldStarTwinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}

#gld-app{max-width:1100px;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px 60px}
#gld-app a{text-decoration:none!important;border-bottom:none!important}
.gld-fade{animation:gldFade .5s cubic-bezier(.16,1,.3,1) both}

/* ═══ HERO ═══ */
.gld-hero{position:relative;background:linear-gradient(135deg,rgba(20,15,35,.88),rgba(45,27,61,.8)),url('/assets/images/guild-hall.jpg') center/cover;border-radius:24px;padding:60px 32px;color:#fff;margin-bottom:24px;overflow:hidden;box-shadow:0 24px 60px -16px rgba(0,0,0,.5);min-height:280px;display:flex;align-items:center;justify-content:center;text-align:center}
.gld-hero-content{position:relative;z-index:2}
.gld-hero-crest{display:inline-flex;align-items:center;justify-content:center;width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,var(--gk),var(--gk-l));font-size:3.5rem;margin-bottom:16px;box-shadow:0 20px 50px -10px var(--gk-s),0 0 0 6px rgba(255,255,255,.08);border:3px solid rgba(255,255,255,.2);animation:gldFloat 4s ease-in-out infinite}
.gld-hero-title{font-size:2.2rem;font-weight:800;margin:0 0 8px 0;text-shadow:0 4px 20px rgba(0,0,0,.7)}
.gld-hero-title span{background:linear-gradient(90deg,#fff,#f5d76e,#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gldShine 3s linear infinite}
.gld-hero-sub{font-size:1rem;opacity:.9;margin:0 0 20px 0}
.gld-hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.gld-hero-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border-radius:30px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.15);color:#fff;font-weight:700;font-size:.9rem;cursor:pointer;transition:all .3s;backdrop-filter:blur(10px);font-family:inherit}
.gld-hero-btn:hover{background:rgba(255,255,255,.3);transform:translateY(-3px)}
.gld-hero-btn.primary{background:linear-gradient(135deg,var(--gold),#e67e22);border-color:transparent;box-shadow:0 8px 24px -6px rgba(243,156,18,.6)}

.gld-star{position:absolute;color:#fff;pointer-events:none;animation:gldStarTwinkle 3s ease-in-out infinite;z-index:1}

/* ═══ STATS ═══ */
.gld-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:24px}
.gld-stat{background:#fff;padding:18px 14px;border-radius:16px;text-align:center;border:2px solid transparent;box-shadow:0 4px 12px rgba(0,0,0,.05);transition:all .3s}
.gld-stat:hover{transform:translateY(-6px);border-color:var(--gk);box-shadow:0 16px 40px -8px var(--gk-s)}
.gld-stat-icon{font-size:1.8rem;margin-bottom:8px}
.gld-stat-value{font-size:2rem;font-weight:900;line-height:1;background:linear-gradient(135deg,var(--gk),var(--gk-l));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gld-stat-label{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;margin-top:6px;font-weight:700}

/* ═══ FILTERS ═══ */
.gld-filters{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:20px;padding:12px 16px;background:#fff;border-radius:14px;border:1px solid rgba(0,0,0,.05);box-shadow:0 4px 12px rgba(0,0,0,.04)}
.gld-filter-btn{padding:8px 18px;border-radius:30px;border:2px solid transparent;background:rgba(0,0,0,.03);color:#666;font-size:.85rem;font-weight:700;cursor:pointer;transition:all .25s;font-family:inherit}
.gld-filter-btn.active{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff}
.gld-search{flex:1;min-width:200px;padding:10px 18px;border-radius:30px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fafafa}
.gld-search:focus{border-color:var(--gk);background:#fff}

/* ═══ CARDS ═══ */
.gld-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px;margin-bottom:40px}
.gld-card{position:relative;background:#fff;border-radius:20px;border:2px solid rgba(0,0,0,.05);transition:all .4s cubic-bezier(.16,1,.3,1);overflow:hidden;animation:gldRise .5s ease both;display:flex;flex-direction:column}
.gld-card::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:var(--guild-color,var(--gk))}
.gld-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px -12px var(--gk-s);border-color:var(--gk)}
.gld-card-header{display:flex;align-items:center;gap:14px;padding:22px 22px 12px}
.gld-card-icon{width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--guild-color,#6C63FF),rgba(108,99,255,.6));display:flex;align-items:center;justify-content:center;font-size:2.2rem;color:#fff;flex-shrink:0;box-shadow:0 8px 20px -4px rgba(0,0,0,.2);overflow:hidden}
.gld-card-icon img{width:100%;height:100%;object-fit:cover}
.gld-card-name{font-size:1.15rem;font-weight:800;color:#1a1a1a;margin:0 0 4px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gld-card-leader{font-size:.78rem;color:#888}
.gld-card-desc{font-size:.85rem;color:#666;line-height:1.5;margin:0 22px 16px;min-height:40px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.gld-card-footer{margin:auto 22px 12px;display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px dashed rgba(0,0,0,.08)}
.gld-card-members{font-size:.85rem;font-weight:700;color:var(--gk)}
.gld-card-status{padding:5px 12px;border-radius:20px;font-size:.72rem;font-weight:800;text-transform:uppercase}
.gld-card-status.my{background:linear-gradient(135deg,#27ae60,#16a085);color:#fff}
.gld-card-status.open{background:rgba(0,0,0,.06);color:#666}
.gld-card-actions{display:flex;gap:8px;padding:0 22px 20px}

/* ═══ RANKS ═══ */
.rank-badge{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;flex-shrink:0;font-size:.72rem;font-weight:900;position:relative}
.rank-r5{background:linear-gradient(135deg,#f5d76e,#f39c12,#e67e22);color:#fff;border-radius:50%;box-shadow:0 4px 12px rgba(243,156,18,.6);font-size:1.1rem;animation:gldCrown 3s ease-in-out infinite}
.rank-r4{background:linear-gradient(135deg,#c9a4ff,#8e44ad);color:#fff;border-radius:50%;font-size:1rem}
.rank-r3{background:linear-gradient(135deg,#4a90e2,#2c5fa1);color:#fff;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);font-size:.68rem}
.rank-r2{background:linear-gradient(135deg,#cd7f32,#8b5a2b);color:#fff;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);font-size:.65rem}
.rank-r1{background:linear-gradient(135deg,#27ae60,#16a085);color:#fff;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);font-size:.65rem}
.subtitle-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:10px;font-size:.65rem;font-weight:800;background:rgba(108,99,255,.12);color:var(--gk);border:1px solid rgba(108,99,255,.3)}

/* ═══ PAGE HERO ═══ */
.gld-page-hero{position:relative;background:linear-gradient(135deg,rgba(20,15,35,.88),rgba(45,27,61,.8)),url('/assets/images/guild-hall.jpg') center/cover;border-radius:24px;padding:40px;color:#fff;margin-bottom:24px;min-height:240px;overflow:hidden}
.gld-page-content{position:relative;z-index:2;display:flex;gap:24px;align-items:center;flex-wrap:wrap}
.gld-page-crest{width:120px;height:140px;background:linear-gradient(135deg,var(--guild-color,#6C63FF),rgba(0,0,0,.3));display:flex;align-items:center;justify-content:center;font-size:4rem;box-shadow:0 20px 40px -10px rgba(0,0,0,.5),inset 0 0 0 3px rgba(255,255,255,.15);flex-shrink:0;overflow:hidden}
.gld-page-crest img{width:100%;height:100%;object-fit:cover}
.gld-page-info{flex:1;min-width:220px}
.gld-page-name{font-size:2rem;font-weight:800;margin:0 0 6px 0;text-shadow:0 4px 12px rgba(0,0,0,.6);display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.gld-page-name img{width:32px;height:auto;border-radius:4px;border:1px solid rgba(255,255,255,.3)}
.gld-page-kingdom{font-size:.85rem;opacity:.9;margin:0 0 6px 0}
.gld-page-motto{font-size:.95rem;font-style:italic;color:#f5d76e;margin:0 0 8px 0}
.gld-page-desc{font-size:.85rem;opacity:.85;margin:0 0 12px 0;max-width:600px;line-height:1.5}
.gld-page-stats{display:flex;gap:18px;flex-wrap:wrap;font-size:.85rem;align-items:center}
.gld-page-stats b{font-size:1.1rem;display:block;color:#fff}
.gld-page-stats .gld-coin-icon{width:24px;height:24px;border-radius:50%;vertical-align:middle;margin-right:4px;border:1px solid rgba(255,255,255,.3)}

/* ФОРМЫ ГЕРБА */
.gld-page-crest.shape-shield{border-radius:8px 8px 50% 50%}
.gld-page-crest.shape-circle{border-radius:50%}
.gld-page-crest.shape-square{border-radius:12px}
.gld-page-crest.shape-diamond{border-radius:12px;transform:rotate(45deg) scale(.75)}
.gld-page-crest.shape-diamond > *{transform:rotate(-45deg)}
.gld-page-crest.shape-hexagon{clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)}
.gld-page-crest.shape-octagon{clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)}

.gld-card-icon.shape-shield{border-radius:6px 6px 50% 50%}
.gld-card-icon.shape-circle{border-radius:50%}
.gld-card-icon.shape-square{border-radius:12px}
.gld-card-icon.shape-diamond{border-radius:12px;transform:rotate(45deg) scale(.85)}
.gld-card-icon.shape-diamond > *{transform:rotate(-45deg)}
.gld-card-icon.shape-hexagon{clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)}
.gld-card-icon.shape-octagon{clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)}

/* ═══ MEMBERS ═══ */
.gld-members{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:20px}
.gld-members-banner{height:160px;background:url('/assets/images/guild-feast.jpg') center/cover;position:relative;overflow:hidden}
.gld-members-banner::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.7) 100%)}
.gld-members-banner-content{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px;color:#fff;z-index:2}
.gld-members-banner-title{font-size:1.05rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,.8);background:linear-gradient(90deg,#fff,#f5d76e,#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gldShine 4s linear infinite}
.gld-members-toolbar{padding:10px 20px;background:rgba(0,0,0,.02);display:flex;gap:8px;align-items:center;flex-wrap:wrap;border-bottom:1px solid rgba(0,0,0,.05)}
.gld-members-toolbar-label{font-size:.78rem;color:#888;font-weight:700;margin-right:4px}
.gld-sort-btn{padding:5px 12px;border-radius:20px;border:1.5px solid rgba(0,0,0,.08);background:#fff;font-size:.78rem;font-weight:700;color:#666;cursor:pointer;font-family:inherit;transition:all .2s}
.gld-sort-btn:hover{border-color:var(--gk);color:var(--gk)}
.gld-sort-btn.active{background:var(--gk);border-color:var(--gk);color:#fff}
.gld-members-list{padding:16px 20px}
.gld-member{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:rgba(0,0,0,.02);margin-bottom:8px;transition:all .25s;cursor:pointer;border:1.5px solid transparent}
.gld-member:hover{background:rgba(108,99,255,.06);transform:translateX(4px);border-color:rgba(108,99,255,.2)}
.gld-member-avatar{width:46px !important;height:46px !important;min-width:46px !important;aspect-ratio:1/1 !important;border-radius:50% !important;object-fit:cover !important;border:2px solid var(--gk);flex-shrink:0}
.gld-member-info{flex:1;min-width:0}
.gld-member-name{font-weight:800;color:#1a1a1a;font-size:.95rem;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.gld-member-meta{font-size:.75rem;color:#888;margin-top:2px}
.gld-member-level{flex-shrink:0;text-align:right;padding-left:8px}
.gld-member-level-num{font-size:1.1rem;font-weight:900;color:var(--gk);line-height:1}
.gld-member-level-xp{font-size:.68rem;color:#888;margin-top:2px}
.gld-member-actions{display:flex;gap:6px;flex-shrink:0}
.gld-icon-btn{width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(0,0,0,.08);background:#fff;color:#666;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:.9rem;transition:all .2s;font-family:inherit;padding:0}
.gld-icon-btn:hover{transform:scale(1.1);border-color:var(--gk);color:var(--gk)}

/* ═══ CHAT ═══ */
.gld-chat{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:20px;display:flex;flex-direction:column;max-height:700px;position:relative}
.gld-chat-header{padding:16px 20px;background:linear-gradient(135deg,#2d1b3d,#1a1a2e);color:#fff;display:flex;align-items:center;gap:10px}
.gld-chat-header-title{font-weight:800;font-size:1.05rem;flex:1}
.gld-chat-header-count{font-size:.78rem;background:rgba(255,255,255,.15);padding:4px 10px;border-radius:12px}
.gld-chat-body{flex:1;overflow-y:auto;padding:16px 20px;background:linear-gradient(180deg,#fafbfd,#fff);min-height:300px;max-height:500px;scroll-behavior:smooth}
.gld-chat-empty{text-align:center;color:#999;padding:60px 20px;font-size:.9rem}
.gld-chat-msg{display:flex;gap:10px;margin-bottom:14px;position:relative;animation:gldMsg .3s ease}
.gld-chat-msg.own{flex-direction:row-reverse}
.gld-chat-msg-avatar{width:38px !important;height:38px !important;min-width:38px !important;aspect-ratio:1/1 !important;object-fit:cover !important;border-radius:50% !important;border:2px solid var(--gk) !important;flex-shrink:0;cursor:pointer}
.gld-chat-msg-content{max-width:75%;min-width:0;position:relative}
.gld-chat-msg.own .gld-chat-msg-content{text-align:right}
.gld-chat-msg-head{font-size:.75rem;color:#888;margin-bottom:4px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.gld-chat-msg.own .gld-chat-msg-head{justify-content:flex-end}
.gld-chat-msg-author{font-weight:800;color:#333;cursor:pointer}
.gld-chat-msg-author:hover{color:var(--gk);text-decoration:underline}
.gld-chat-msg-text{padding:10px 34px 10px 14px;border-radius:14px;background:#f0f0f5;color:#333;font-size:.88rem;line-height:1.45;word-wrap:break-word;display:inline-block;text-align:left;position:relative}
.gld-chat-msg.own .gld-chat-msg-text{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;border-bottom-right-radius:4px}
.gld-chat-msg:not(.own) .gld-chat-msg-text{border-bottom-left-radius:4px}
.gld-chat-msg-text.edited::after{content:' (изм.)';font-size:.7rem;opacity:.6;font-style:italic}
.gld-chat-msg-menu-btn{position:absolute;top:50%;right:6px;transform:translateY(-50%);background:rgba(0,0,0,.08);border:none;width:24px;height:24px;border-radius:50%;cursor:pointer;color:inherit;font-size:.9rem;display:flex;align-items:center;justify-content:center;padding:0;font-family:inherit}
.gld-chat-msg.own .gld-chat-msg-menu-btn{background:rgba(255,255,255,.2)}
.gld-chat-msg-reply{font-size:.75rem;padding:6px 10px;background:rgba(108,99,255,.08);border-left:3px solid var(--gk);border-radius:6px;margin-bottom:6px;color:#555;cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gld-chat-msg-time{font-size:.68rem;color:#bbb;margin-top:4px}
.gld-chat-reactions{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap}
.gld-chat-msg.own .gld-chat-reactions{justify-content:flex-end}
.gld-chat-reaction{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;background:rgba(0,0,0,.05);border:1.5px solid transparent;border-radius:12px;font-size:.75rem;cursor:pointer;transition:all .2s;font-family:inherit;animation:gldPop .3s ease}
.gld-chat-reaction:hover{background:rgba(108,99,255,.15)}
.gld-chat-reaction.mine{background:rgba(108,99,255,.2);border-color:var(--gk)}
.gld-chat-reply-preview{padding:8px 14px;background:rgba(108,99,255,.08);border-top:1px solid rgba(108,99,255,.2);font-size:.78rem;color:#555;display:flex;justify-content:space-between;align-items:center;gap:8px}
.gld-chat-reply-preview button{background:transparent;border:none;cursor:pointer;color:#999;font-size:1rem;padding:0;font-family:inherit}
.gld-chat-input{display:flex;gap:8px;padding:12px 16px;border-top:1px solid rgba(0,0,0,.06);background:#fafafa}
.gld-chat-input input{flex:1;padding:12px 18px;border-radius:24px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fff}
.gld-chat-input input:focus{border-color:var(--gk);box-shadow:0 0 0 4px var(--gk-s)}
.gld-chat-input button{padding:12px 22px;background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;border:none;border-radius:24px;cursor:pointer;font-weight:800;font-family:inherit;font-size:.9rem}
.gld-chat-input button:hover{transform:translateY(-2px)}

.gld-msg-menu{position:fixed;background:#fff;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.25);display:none;flex-direction:column;z-index:999999;overflow:hidden;min-width:180px;border:1px solid rgba(0,0,0,.06)}
.gld-msg-menu.open{display:flex;animation:gldPop .2s ease}
.gld-msg-menu button{padding:12px 16px;background:transparent;border:none;text-align:left;font-family:inherit;font-size:.85rem;color:#333;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:10px}
.gld-msg-menu button:hover{background:rgba(108,99,255,.08);color:var(--gk)}
.gld-msg-menu button.danger:hover{background:rgba(231,76,60,.08);color:#e74c3c}

.gld-emoji-panel{position:fixed;background:#fff;border-radius:16px;padding:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);display:none;z-index:999999;border:1px solid rgba(0,0,0,.06);grid-template-columns:repeat(4,1fr);gap:4px;width:190px}
.gld-emoji-panel.open{display:grid;animation:gldPop .2s ease}
.gld-emoji-panel button{width:40px;height:40px;border:none;background:transparent;font-size:1.4rem;cursor:pointer;border-radius:10px;transition:all .2s;font-family:inherit;padding:0}
.gld-emoji-panel button:hover{background:rgba(108,99,255,.12);transform:scale(1.15)}

/* ═══ TABS ═══ */
.gld-tabs{display:flex;gap:4px;margin-bottom:20px;padding:6px;background:#fff;border-radius:14px;border:1px solid rgba(0,0,0,.05);overflow-x:auto;scrollbar-width:none}
.gld-tabs::-webkit-scrollbar{display:none}
.gld-tab{flex-shrink:0;padding:10px 18px;border:none;background:transparent;color:#666;font-size:.88rem;font-weight:700;border-radius:10px;cursor:pointer;transition:all .25s;font-family:inherit}
.gld-tab.active{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff}
.gld-tab.locked{opacity:.5;cursor:not-allowed}

/* ═══ TECH TREE ═══ */
.gld-tech-wrap{position:relative;background:linear-gradient(180deg,#f8f9fc,#eef1f8);border-radius:20px;padding:40px 20px 60px;overflow-x:auto;overflow-y:hidden;box-shadow:0 8px 24px rgba(0,0,0,.06);background-image:linear-gradient(rgba(248,249,252,.94),rgba(238,241,248,.94)),url('/assets/images/lucid-origin_Ancient_Martian_forge_workshop_arcane_technology_lab_with_glowing_blue_crystals_-0.jpg');background-size:cover;background-position:center}
.gld-tech-svg{position:absolute;top:0;left:0;pointer-events:none;z-index:1}
.gld-tech-canvas{position:relative;min-width:1000px;height:780px;margin:0 auto;z-index:2}
.gld-tech-node{position:absolute;width:130px;cursor:pointer;transition:transform .25s;text-align:center;transform:translate(-50%,-50%)}
.gld-tech-node:hover{transform:translate(-50%,-50%) scale(1.06);z-index:5}
.gld-tech-circle{position:relative;width:96px;height:96px;margin:0 auto 8px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2.4rem;color:#fff;background:linear-gradient(135deg,var(--tech-color,#6C63FF),rgba(108,99,255,.6));box-shadow:0 8px 24px -4px var(--gk-s);border:4px solid #fff;transition:all .3s;overflow:hidden}
.gld-tech-node.locked .gld-tech-circle{background:linear-gradient(135deg,#7a7a8c,#4a4a5c);filter:grayscale(.6) brightness(.9)}
.gld-tech-node.in-progress .gld-tech-circle{animation:gldNodePulse 2.5s ease-in-out infinite}
.gld-tech-node.available .gld-tech-circle{background:linear-gradient(135deg,#f39c12,#e67e22);box-shadow:0 0 24px rgba(243,156,18,.6)}
.gld-tech-node.unlocked .gld-tech-circle{background:linear-gradient(135deg,#f5d76e,#f39c12,#e67e22);background-size:200% 200%;animation:gldShine 3s linear infinite}
.gld-tech-node.unlocked .gld-tech-circle::after{content:'✓';position:absolute;bottom:-4px;right:-4px;width:32px;height:32px;background:#27ae60;border:3px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:1rem;box-shadow:0 4px 12px rgba(39,174,96,.5)}
.gld-tech-ring{position:absolute;inset:-8px;pointer-events:none}
.gld-tech-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.gld-tech-label{font-size:.82rem;font-weight:800;color:#1a1a1a;line-height:1.25;margin-bottom:4px}
.gld-tech-cost{font-size:.72rem;font-weight:800;color:#e67e22}
.gld-tech-cost.done{color:#27ae60}
.gld-tech-progress-text{font-size:.68rem;color:#888;margin-top:2px}
.gld-tech-tier-badge{position:absolute;top:-4px;left:-4px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;font-size:.6rem;font-weight:900;padding:3px 8px;border-radius:10px;border:2px solid #fff;z-index:3;text-transform:uppercase;letter-spacing:.5px}
.gld-tech-tier-badge.t1{background:linear-gradient(135deg,#27ae60,#16a085)}
.gld-tech-tier-badge.t2{background:linear-gradient(135deg,#3498db,#2980b9)}
.gld-tech-tier-badge.t3{background:linear-gradient(135deg,#9b59b6,#8e44ad)}
.gld-tech-tier-badge.t4{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.gld-tech-tier-badge.t5{background:linear-gradient(135deg,#f5d76e,#f39c12,#e67e22);background-size:200% auto;animation:gldShine 2s linear infinite}

.gld-tech-modal-head{display:flex;align-items:center;gap:18px;margin-bottom:20px}
.gld-tech-modal-icon{width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2.4rem;color:#fff;background:linear-gradient(135deg,var(--tech-color,#6C63FF),rgba(108,99,255,.6));border:3px solid #fff;box-shadow:0 8px 24px -4px var(--gk-s);flex-shrink:0}
.gld-tech-modal-info{flex:1;min-width:0}
.gld-tech-modal-name{font-size:1.3rem;font-weight:800;color:#1a1a1a;margin:0 0 4px}
.gld-tech-modal-desc{color:#666;font-size:.88rem;line-height:1.5;margin:0}
.gld-tech-progress-big{height:16px;background:rgba(108,99,255,.1);border-radius:12px;overflow:hidden;margin:16px 0 8px;position:relative;box-shadow:inset 0 2px 4px rgba(0,0,0,.06)}
.gld-tech-progress-fill{height:100%;background:linear-gradient(90deg,#6C63FF,#A29BFE,#6C63FF);background-size:200% auto;border-radius:12px;transition:width .5s;animation:gldShine 2s linear infinite;box-shadow:0 0 12px rgba(108,99,255,.6)}
.gld-tech-progress-stats{display:flex;justify-content:space-between;font-size:.82rem;color:#666;margin-bottom:16px;font-weight:700}
.gld-tech-contrib-quick{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.gld-tech-contrib-btn{padding:8px 16px;border-radius:10px;border:2px solid var(--gk);background:#fff;color:var(--gk);font-weight:800;font-size:.82rem;cursor:pointer;font-family:inherit;transition:all .2s}
.gld-tech-contrib-btn:hover{background:var(--gk);color:#fff;transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--gk-s)}
.gld-tech-contrib-btn.primary{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;border-color:transparent}
.gld-tech-contrib-btn:disabled{opacity:.4;cursor:not-allowed;transform:none!important}
.gld-tech-contributors{background:#f8f9fb;border-radius:12px;padding:12px 14px;margin-top:16px;max-height:200px;overflow-y:auto}
.gld-tech-contributors-title{font-size:.78rem;font-weight:800;color:#666;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}
.gld-tech-contrib-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(0,0,0,.05);font-size:.85rem}
.gld-tech-contrib-row:last-child{border-bottom:none}
.gld-tech-contrib-avatar{width:30px;height:30px;border-radius:50%;border:2px solid var(--gk);object-fit:cover;flex-shrink:0}
.gld-tech-contrib-name{flex:1;font-weight:700;color:#333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gld-tech-contrib-amount{font-weight:900;color:#f39c12;flex-shrink:0}
.gld-tech-contrib-empty{text-align:center;color:#999;font-size:.82rem;padding:8px}

.gld-tier-title{position:absolute;left:16px;font-size:.72rem;font-weight:900;color:#888;text-transform:uppercase;letter-spacing:2px;pointer-events:none;z-index:0}

/* ═══ QUESTS ═══ */
.gld-quest{background:#fff;border-radius:14px;padding:16px 18px;margin-bottom:10px;border-left:4px solid var(--gk);box-shadow:0 4px 12px rgba(0,0,0,.04)}
.gld-quest-title{font-weight:800;color:#1a1a1a;margin-bottom:6px}
.gld-quest-desc{font-size:.82rem;color:#666;margin-bottom:10px;line-height:1.5}
.gld-quest-rewards{display:flex;gap:14px;font-size:.82rem;color:#666;margin-bottom:10px;flex-wrap:wrap}
.gld-quest-done{color:#27ae60;font-weight:800;font-size:.85rem}

/* ═══ BANK ═══ */
.gld-bank-balance{background:linear-gradient(135deg,var(--gold),#e67e22);color:#fff;padding:24px;border-radius:18px;text-align:center;margin-bottom:20px;box-shadow:0 12px 32px -8px rgba(243,156,18,.5);display:flex;flex-direction:column;align-items:center}
.gld-bank-balance img{width:56px;height:56px;border-radius:50%;margin-bottom:8px;border:2px solid rgba(255,255,255,.4);box-shadow:0 4px 12px rgba(0,0,0,.3);object-fit:cover}
.gld-bank-balance-value{font-size:2.6rem;font-weight:900;line-height:1}
.gld-bank-balance-label{font-size:.82rem;opacity:.9;margin-top:4px;letter-spacing:1px;text-transform:uppercase}

/* ═══ ACTION MENU ═══ */
.gld-action-menu{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin-bottom:20px}
.gld-action-card{background:#fff;border:2px solid rgba(0,0,0,.06);border-radius:16px;padding:18px 14px;text-align:center;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
.gld-action-card:hover{transform:translateY(-4px);border-color:var(--gk);box-shadow:0 12px 28px -8px var(--gk-s)}
.gld-action-icon{font-size:1.6rem;margin-bottom:8px;font-weight:900;color:#666}
.gld-action-title{font-size:.85rem;font-weight:800;color:#1a1a1a;margin-bottom:2px}
.gld-action-desc{font-size:.72rem;color:#888}

/* ═══ MODAL ═══ */
.gld-modal-bg{position:fixed;inset:0;z-index:99999;background:rgba(10,10,26,.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:gldFade .3s ease;overflow-y:auto}
.gld-modal{background:#fff;max-width:520px;width:100%;border-radius:22px;padding:30px 28px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.5);animation:gldRise .4s cubic-bezier(.16,1,.3,1);max-height:92vh;overflow-y:auto}
.gld-modal.wide{max-width:640px}
.gld-modal-title{font-size:1.35rem;font-weight:800;color:#1a1a1a;margin:0 0 20px 0;display:flex;align-items:center;gap:10px}
.gld-modal-close{position:absolute;top:14px;right:16px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.05);border:none;font-size:1.1rem;cursor:pointer;color:#666;display:flex;align-items:center;justify-content:center;font-family:inherit;z-index:3}
.gld-modal-close:hover{background:rgba(0,0,0,.1);transform:rotate(90deg)}
.gld-field{margin-bottom:16px}
.gld-field label{display:block;font-size:.82rem;font-weight:800;color:#333;margin-bottom:8px;text-transform:uppercase}
.gld-field input,.gld-field textarea,.gld-field select{width:100%;padding:12px 16px;border-radius:12px;border:2px solid rgba(0,0,0,.08);font-size:.92rem;font-family:inherit;outline:none;background:#fafafa;box-sizing:border-box}
.gld-field input:focus,.gld-field textarea:focus{border-color:var(--gk);background:#fff;box-shadow:0 0 0 4px var(--gk-s)}
.gld-field textarea{resize:vertical;min-height:80px}
.gld-icon-picker{display:flex;gap:8px;flex-wrap:wrap;max-height:160px;overflow-y:auto;padding:4px;}
.gld-icon-btn-pick{width:50px;height:50px;border-radius:12px;border:2px solid rgba(0,0,0,.08);background:#fafafa;font-size:1.5rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;font-family:inherit;overflow:hidden;padding:0;flex-shrink:0}
.gld-icon-btn-pick.selected{border-color:var(--gk);background:rgba(108,99,255,.1);transform:scale(1.1)}
.gld-icon-btn-pick img{width:100%;height:100%;object-fit:cover;border-radius:8px}
.gld-modal-actions{display:flex;gap:10px;margin-top:24px}
.gld-btn{flex:1;padding:14px;border-radius:12px;border:none;font-size:.95rem;font-weight:800;cursor:pointer;transition:all .25s;font-family:inherit}
.gld-btn.primary{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;box-shadow:0 8px 20px -4px var(--gk-s)}
.gld-btn.primary:hover{transform:translateY(-2px)}
.gld-btn.secondary{background:rgba(0,0,0,.05);color:#666}
.gld-btn.danger{background:#e74c3c;color:#fff}
.gld-btn-min{padding:8px 16px;border-radius:10px;border:2px solid var(--gk);background:#fff;color:var(--gk);font-weight:800;font-size:.82rem;cursor:pointer;font-family:inherit;transition:all .2s}
.gld-btn-min:hover{background:var(--gk);color:#fff}
.gld-btn-min.primary{background:var(--gk);color:#fff}
.gld-btn-min:disabled{opacity:.4;cursor:not-allowed}
.gld-rank-picker{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.gld-rank-option{padding:8px 14px;border-radius:14px;border:2px solid rgba(0,0,0,.08);background:#fafafa;cursor:pointer;font-family:inherit;font-size:.85rem;font-weight:800;display:inline-flex;align-items:center;gap:6px}
.gld-rank-option.selected{border-color:var(--gk);background:rgba(108,99,255,.1)}
.gld-rank-option:disabled{opacity:.4;cursor:not-allowed}

/* ═══ RATING ═══ */
.gld-rating-table{width:100%;border-collapse:collapse;font-size:.88rem;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.05)}
.gld-rating-table th{padding:12px 14px;text-align:left;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;background:#f8f9fb;border-bottom:2px solid rgba(108,99,255,.2)}
.gld-rating-table td{padding:12px 14px;border-bottom:1px solid rgba(0,0,0,.04)}
.gld-rating-table tr:hover td{background:rgba(108,99,255,.04)}
.gld-rating-table tr.my-guild td{background:linear-gradient(90deg,rgba(108,99,255,.08),transparent);font-weight:700}
.gld-rating-medal{font-size:1.2rem;font-weight:900}

/* ═══ EMPTY ═══ */
.gld-empty{text-align:center;padding:60px 20px;background:#fff;border-radius:20px;border:2px dashed rgba(108,99,255,.2)}
.gld-empty-icon{font-size:4rem;margin-bottom:12px;opacity:.5}

/* ═══ CONFETTI ═══ */
.gld-confetti{position:fixed;width:8px;height:12px;border-radius:2px;pointer-events:none;z-index:2147483647;animation:gldConfetti 1.8s cubic-bezier(.2,.7,.5,1) forwards}

/* ═══ DARK MODE ═══ */
html body.mars-stars-on .gld-stat,html body.mars-stars-on .gld-card,html body.mars-stars-on .gld-filters,html body.mars-stars-on .gld-members,html body.mars-stars-on .gld-chat,html body.mars-stars-on .gld-quest,html body.mars-stars-on .gld-tabs,html body.mars-stars-on .gld-action-card,html body.mars-stars-on .gld-rating-table{background-color:#14142a;border-color:rgba(108,99,255,.3);color:#e0e0f0}
html body.mars-stars-on .gld-card-name,html body.mars-stars-on .gld-quest-title,html body.mars-stars-on .gld-member-name{color:#e0e0f0}
html body.mars-stars-on .gld-card-desc,html body.mars-stars-on .gld-quest-desc{color:#aaa}
html body.mars-stars-on .gld-modal,html body.mars-stars-on .gld-msg-menu,html body.mars-stars-on .gld-emoji-panel{background:#14142a}
html body.mars-stars-on .gld-modal-title{color:#e0e0f0}
html body.mars-stars-on .gld-field input,html body.mars-stars-on .gld-field textarea{background:#1a1a30;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
html body.mars-stars-on .gld-chat-body{background:linear-gradient(180deg,#0f0f1e,#14142a)}
html body.mars-stars-on .gld-chat-msg-text{background:#252550;color:#e0e0f0}
html body.mars-stars-on .gld-chat-input{background:#1a1a30}
html body.mars-stars-on .gld-chat-input input{background:#252550;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
html body.mars-stars-on .gld-icon-btn,html body.mars-stars-on .gld-sort-btn{background:#252550;border-color:rgba(108,99,255,.3);color:#ccc}
html body.mars-stars-on .gld-tech-wrap{background:linear-gradient(180deg,#0f0f1e,#14142a)}
html body.mars-stars-on .gld-tech-label{color:#e0e0f0}
html body.mars-stars-on .gld-tech-contributors{background:#1a1a30}
html body.mars-stars-on .gld-tech-contrib-row{border-bottom-color:rgba(108,99,255,.15)}
html body.mars-stars-on .gld-tech-contrib-name{color:#e0e0f0}
html body.mars-stars-on .gld-rating-table th{background:#1a1a30}
html body.mars-stars-on .gld-rating-table td{border-bottom-color:rgba(108,99,255,.15)}

/* ═══ MOBILE ═══ */
@media (max-width:640px){
    .gld-hero{padding:32px 20px;min-height:220px}
    .gld-hero-crest{width:90px;height:90px;font-size:2.8rem}
    .gld-hero-title{font-size:1.6rem}
    .gld-grid{grid-template-columns:1fr}
    .gld-page-hero{padding:24px 20px}
    .gld-chat-msg-content{max-width:82%}
    .gld-tech-canvas{transform:scale(.75);transform-origin:top left}
}
@media (prefers-reduced-motion: reduce){
    *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function(){
'use strict';

var SUPABASE_URL='https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY='sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var COIN_IMG='/assets/images/guild-coin.jpg';
var TREASURY_BG='/assets/images/lucid-origin_Martian_clan_treasury_vault_mountains_of_golden_coins_and_clay_tablets_on_stone_-0.jpg';

var KINGDOMS={
'Эдем':{color:'#F4A460',light:'#F7C98A',flag:'/assets/images/flag-of-eden.jpg'},
'Аркадия':{color:'#D4A574',light:'#E8C9A0',flag:'/assets/images/map/flag-of-arkadia.png'},
'Эридания':{color:'#F5D76E',light:'#FAE9A0',flag:'/assets/images/flag-of-eridania.png'},
'Кхонг':{color:'#A9A9A9',light:'#C8C8C8',flag:'/assets/images/flag-of-khong.png'},
'Авсония':{color:'#87CEEB',light:'#B0D8EB',flag:'/assets/images/flag-of-avsonia.png'},
'Кимерия':{color:'#B19CD9',light:'#D1C4E9',flag:'/assets/images/flag-of-kimeria.png'},
'Серпентида':{color:'#E57373',light:'#F5A0A0',flag:'/assets/images/flag-of-serpentida.png'},
'Эритрей':{color:'#64B5F6',light:'#90CAF9',flag:'/assets/images/flag-of-eritrea.png'},
'Утопия':{color:'#4DD0E1',light:'#80DEEA',flag:'/assets/images/flag-of-utopia.png'},
'Эллада':{color:'#FF8A65',light:'#FFAB91',flag:'/assets/images/flag-of-hellas.png'},
'Аливасото':{color:'#81C784',light:'#A5D6A7',flag:'/assets/images/flag-of-alivasoto.png'},
'Ксанф':{color:'#3D3D3D',light:'#6B6B6B',flag:'/assets/images/coat-of-arms-of-ksanf.png'}
};

var RANKS={
5:{label:'Лидер',icon:'👑',class:'rank-r5'},
4:{label:'Советник',icon:'🛡️',class:'rank-r4'},
3:{label:'Офицер',icon:'⚔️',class:'rank-r3'},
2:{label:'Ветеран',icon:'🛡️',class:'rank-r2'},
1:{label:'Новичок',icon:'🌱',class:'rank-r1'}
};

var SUBTITLES=[
{id:'memory',icon:'📜',name:'Хранитель памяти'},
{id:'blade',icon:'⚔️',name:'Мастер клинка'},
{id:'guard',icon:'🛡️',name:'Страж границ'},
{id:'sage',icon:'🎓',name:'Мудрец'},
{id:'treasure',icon:'💎',name:'Хранитель сокровищ'}
];

var TECH_TREE=[
  {id:'expand',   tier:1, icon:'🏛️', name:'Расширение племени', desc:'+10 к лимиту участников',      cost:50,  row:0, col:2, requires:[]},
  {id:'vault',    tier:1, icon:'💰', name:'Глиняная кладовая',  desc:'+5% к накоплению талантов',     cost:50,  row:0, col:6, requires:[]},
  {id:'banner',   tier:2, icon:'⚔️', name:'Знамя войны',        desc:'+10% опыта за дуэли и квесты',   cost:120, row:1, col:1, requires:['expand']},
  {id:'routes',   tier:2, icon:'🛒', name:'Торговые пути',      desc:'-5% к ценам в магазине',         cost:120, row:1, col:3, requires:['expand']},
  {id:'miners',   tier:2, icon:'⛏️', name:'Гильдия рудокопов',  desc:'+10% талантов с ежедневок',      cost:120, row:1, col:5, requires:['vault']},
  {id:'merchant', tier:2, icon:'💎', name:'Купеческий союз',    desc:'+10% к продаже ресурсов',         cost:120, row:1, col:7, requires:['vault']},
  {id:'guard',    tier:3, icon:'🛡️', name:'Элитная стража',     desc:'+15% защиты в дуэлях',            cost:280, row:2, col:2, requires:['banner']},
  {id:'caravan',  tier:3, icon:'🐪', name:'Великий караван',    desc:'-15% к ценам в магазине',         cost:280, row:2, col:4, requires:['routes','miners']},
  {id:'mines',    tier:3, icon:'⛏️', name:'Глубокие шахты',      desc:'+20% к добыче талантов',          cost:280, row:2, col:6, requires:['merchant']},
  {id:'library',  tier:4, icon:'📚', name:'Древняя библиотека', desc:'+25% опыта всем',                 cost:600, row:3, col:3, requires:['guard','caravan']},
  {id:'forge',    tier:4, icon:'⚒️', name:'Марсианская кузня',  desc:'Уникальные предметы',             cost:600, row:3, col:5, requires:['caravan','mines']},
  {id:'legendary',tier:5, icon:'👑', name:'Кровь легенд',       desc:'+50% ко всем наградам',           cost:1500,row:4, col:4, requires:['library','forge']}
];
var TECH_MAP={};TECH_TREE.forEach(function(t){TECH_MAP[t.id]=t;});

var REACTIONS=['👍','❤️','🔥','😂','😮','😢','🎉','⚔️'];
var GUILD_ICONS=['🏰','⚔️','🛡️','👑','🔥','🌟','🌊','📜','🧠','🎵','🎨','⚙️','🔭','💎','🏆','🚀','🗡️','🐉','🦅','⚡','🏛️','⛏️','🐪','🛒','📚','⚒️','🌋','🐺','🦁','🐗','🐻','🌙','☄️','⚜️','🔱','⚓','🎯','🎪','🎭','🎲'];
var CREST_SHAPES=['shield','circle','square','diamond','hexagon','octagon'];
var CREST_SHAPE_NAMES={shield:'Щит',circle:'Круг',square:'Квадрат',diamond:'Ромб',hexagon:'Шестиугольник',octagon:'Восьмиугольник'};

var container=document.getElementById('gld-app');
var client=window.supabaseClient||supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{
  auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false,storageKey:'sb-ncytbgbzfjfoqmmgfygz-auth-token'}
});

var currentUser=null,profile=null,myKingdom=KINGDOMS['Кимерия'];
var guilds=[],myGuildId=null,myRank=1,mySubtitle=null;
var membersCount={},profilesMap={},membersMap={};
var techsByGuild={};
var activeFilter='all',searchQuery='';
var currentView='list',currentGuildId=null,currentTab='members';
var chatMessages=[],chatReactions={},chatInterval=null,lastChatCount=0;
var replyTo=null,editingId=null;
var sortBy='rank';
var translations={};

function esc(s){return String(s||'').replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
function escAttr(s){return String(s||'').replace(/['"\\<>]/g,function(m){return{"'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e'}[m];});}
function toast(msg,type){
    type=type||'info';
    var c={success:'linear-gradient(135deg,#27ae60,#16a085)',info:'linear-gradient(135deg,#3498db,#2980b9)',warning:'linear-gradient(135deg,#e67e22,#d35400)',error:'linear-gradient(135deg,#e74c3c,#c0392b)'};
    var t=document.createElement('div');
    t.style.cssText='position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:'+(c[type]||c.info)+';color:#fff;padding:12px 26px;border-radius:30px;font-weight:700;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:2147483647;transition:transform .4s cubic-bezier(.16,1,.3,1);pointer-events:none;max-width:90vw;';
    t.textContent=msg;document.body.appendChild(t);
    requestAnimationFrame(function(){t.style.transform='translateX(-50%) translateY(0)';});
    setTimeout(function(){t.style.transform='translateX(-50%) translateY(100px)';setTimeout(function(){t.remove();},400);},2400);
}
function confetti(){
    var colors=['#f5d76e','#f39c12','#6C63FF','#e74c3c','#27ae60','#e67e22','#A29BFE'];
    for (var i=0;i<60;i++){
        var el=document.createElement('div');
        el.className='gld-confetti';
        el.style.left=(50+(Math.random()-0.5)*20)+'vw';
        el.style.top='40vh';
        el.style.background=colors[Math.floor(Math.random()*colors.length)];
        el.style.setProperty('--cx',((Math.random()-0.5)*80)+'vw');
        el.style.setProperty('--cy',(60+Math.random()*40)+'vh');
        el.style.setProperty('--cr',(Math.random()*720-360)+'deg');
        el.style.animationDelay=(Math.random()*0.3)+'s';
        document.body.appendChild(el);
        setTimeout(function(){el.remove();},2400);
    }
}
function avatarFor(name){return 'https://ui-avatars.com/api/?name='+encodeURIComponent(name||'?')+'&background=6C63FF&color=fff&size=128&rounded=true';}
function fmtTime(iso){var d=new Date(iso);var h=d.getHours(),m=d.getMinutes();return (h<10?'0':'')+h+':'+(m<10?'0':'')+m;}
function getLevel(exp){exp=exp||0;var l=1;while(l<100&&exp>=Math.floor(Math.pow(l+1,1.8)*20))l++;var c=Math.floor(Math.pow(l,1.8)*20);var n=Math.floor(Math.pow(l+1,1.8)*20);var p=n>c?Math.min(((exp-c)/(n-c))*100,100):100;return{level:l,current:c,next:n,percent:p};}
function kingdomByFlag(flag){var ks=Object.keys(KINGDOMS);for(var i=0;i<ks.length;i++){if(KINGDOMS[ks[i]].flag===flag)return ks[i];}return null;}

/* ═══ ЗАГРУЗКА ═══ */
async function loadData(){
    var s=await client.auth.getSession();
    currentUser=s&&s.data&&s.data.session?s.data.session.user:null;
    if(currentUser){
        var pr=await client.from('profiles').select('*').eq('user_id',currentUser.id).single();
        profile=pr&&pr.data;
        myKingdom=KINGDOMS[profile&&profile.kingdom]||KINGDOMS['Кимерия'];
    }
    var gr=await client.from('guilds').select('*').order('created_at',{ascending:false});
    guilds=(gr&&gr.data)||[];
    var mr=await client.from('guild_members').select('guild_id,user_id,rank,subtitle,joined_at');
    membersCount={};membersMap={};
    var allIds={};
    (mr&&mr.data||[]).forEach(function(x){
        membersCount[x.guild_id]=(membersCount[x.guild_id]||0)+1;
        if(!membersMap[x.guild_id])membersMap[x.guild_id]=[];
        membersMap[x.guild_id].push(x);
        allIds[x.user_id]=true;
        if(currentUser&&x.user_id===currentUser.id){myGuildId=x.guild_id;myRank=x.rank||1;mySubtitle=x.subtitle;}
    });
    guilds.forEach(function(g){if(g.leader_id)allIds[g.leader_id]=true;});
    var ids=Object.keys(allIds);
    if(ids.length>0){
        var pRes=await client.from('profiles').select('user_id,username,display_name,avatar_url,experience,level,kingdom,bio').in('user_id',ids);
        profilesMap={};
        (pRes&&pRes.data||[]).forEach(function(p){profilesMap[p.user_id]=p;});
    }
    techsByGuild={};
    try{
        var gt=await client.from('guild_technologies').select('guild_id,tech_id,progress,unlocked');
        (gt&&gt.data||[]).forEach(function(x){
            if(!techsByGuild[x.guild_id])techsByGuild[x.guild_id]={};
            techsByGuild[x.guild_id][x.tech_id]={progress:x.progress||0,unlocked:!!x.unlocked};
        });
    }catch(e){}
}

async function loadContribs(guildId,techId){
    try{
        var r=await client.from('guild_tech_contributions').select('user_id,amount').eq('guild_id',guildId).eq('tech_id',techId).order('amount',{ascending:false}).limit(20);
        return (r&&r.data)||[];
    }catch(e){return [];}
}

/* ═══ CRUD ═══ */
async function createGuildWithShape(name,desc,icon,shape,kName,motto){
    if(!currentUser||myGuildId){toast('Вы уже в гильдии','warning');return;}
    if(!name||name.length<3||name.length>30){toast('Имя 3-30','warning');return;}
    var ex=await client.from('guilds').select('id').eq('name',name).maybeSingle();
    if(ex&&ex.data){toast('Имя занято','error');return;}
    var res=await client.from('guilds').insert([{
        name:name,description:desc,icon:icon,crest_shape:shape,
        color:KINGDOMS[kName].color,flag:KINGDOMS[kName].flag,
        motto:motto,kingdom:kName,leader_id:currentUser.id
    }]).select().single();
    if(res.error){toast('Ошибка: '+res.error.message,'error');return;}
    await client.from('guild_members').insert([{guild_id:res.data.id,user_id:currentUser.id,rank:5,role:'leader'}]);
    toast('Гильдия создана','success');
    await loadData();currentView='list';render();
}
async function joinGuild(id){
    if(!currentUser||myGuildId)return;
    var r=await client.from('guild_members').insert([{guild_id:id,user_id:currentUser.id,rank:1,role:'member'}]);
    if(r.error){toast('Ошибка','error');return;}
    toast('Вступили','success');await loadData();render();
}
async function leaveGuild(){
    if(!myGuildId)return;
    var g=guilds.filter(function(x){return x.id===myGuildId;})[0];
    if(g.leader_id===currentUser.id){
        if(!confirm('Вы лидер. Удалить гильдию?'))return;
        await client.from('guilds').delete().eq('id',myGuildId);
    }else{
        if(!confirm('Покинуть?'))return;
        await client.from('guild_members').delete().eq('guild_id',myGuildId).eq('user_id',currentUser.id);
    }
    myGuildId=null;myRank=1;await loadData();currentView='list';render();
}

/* ═══ TECH TREE ═══ */
function getTechState(guildId,techId){
    var g=techsByGuild[guildId]||{};
    var t=g[techId]||{progress:0,unlocked:false};
    return {progress:t.progress||0,unlocked:!!t.unlocked};
}
function isTechAvailable(guildId,techId){
    var tech=TECH_MAP[techId];if(!tech)return false;
    var state=getTechState(guildId,techId);
    if(state.unlocked)return false;
    if(tech.requires.length===0)return true;
    return tech.requires.some(function(req){return getTechState(guildId,req).unlocked;});
}
function getTechStatusClass(guildId,techId){
    var tech=TECH_MAP[techId];
    var state=getTechState(guildId,techId);
    if(state.unlocked)return 'unlocked';
    if(!isTechAvailable(guildId,techId))return 'locked';
    if(state.progress>0)return 'in-progress';
    return 'available';
}
function renderTechTree(){
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];
    if(!g)return '';
    var canvasW=1100,canvasH=820;
    var cellW=canvasW/9,cellH=canvasH/5.5;
    var h='<div class="gld-tech-wrap"><div class="gld-tech-canvas" id="gld-tech-canvas" style="width:'+canvasW+'px;height:'+canvasH+'px;">';
    h+='<svg class="gld-tech-svg" width="'+canvasW+'" height="'+canvasH+'" id="gld-tech-svg"></svg>';
    for(var ti=0;ti<5;ti++){
        var topY=cellH/2+ti*cellH-20;
        h+='<div class="gld-tier-title" style="top:'+topY+'px;left:8px;">TIER '+(ti+1)+'</div>';
    }
    TECH_TREE.forEach(function(t){
        var state=getTechState(currentGuildId,t.id);
        var status=getTechStatusClass(currentGuildId,t.id);
        var x=cellW/2+t.col*cellW;
        var y=cellH/2+t.row*cellH;
        var pct=t.cost>0?Math.min((state.progress/t.cost)*100,100):0;
        var cls='gld-tech-node '+status;
        h+='<div class="'+cls+'" data-tech="'+t.id+'" style="left:'+x+'px;top:'+y+'px;--tech-color:'+(status==='unlocked'?'#f5d76e':(status==='locked'?'#7a7a8c':'#6C63FF'))+';">';
        h+='<div class="gld-tech-circle"><span>'+t.icon+'</span>';
        if(!state.unlocked && pct>0 && status!=='locked'){
            var r=48,c=2*Math.PI*r,dash=(pct/100)*c;
            h+='<svg class="gld-tech-ring" viewBox="0 0 96 96"><circle cx="48" cy="48" r="'+r+'" fill="none" stroke="rgba(108,99,255,.15)" stroke-width="4"/><circle cx="48" cy="48" r="'+r+'" fill="none" stroke="#27ae60" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+dash+' '+c+'"/></svg>';
        }
        h+='<span class="gld-tech-tier-badge t'+t.tier+'">T'+t.tier+'</span>';
        h+='</div>';
        h+='<div class="gld-tech-label">'+t.name+'</div>';
        if(state.unlocked){
            h+='<div class="gld-tech-cost done">✓ Открыто</div>';
        } else if(status==='locked'){
            h+='<div class="gld-tech-cost" style="color:#888;">🔒 Закрыто</div>';
        } else {
            h+='<div class="gld-tech-cost">🪙 '+state.progress+' / '+t.cost+'</div>';
            h+='<div class="gld-tech-progress-text">'+Math.round(pct)+'%</div>';
        }
        h+='</div>';
    });
    h+='</div></div>';
    setTimeout(function(){drawTechLines(cellW,cellH);bindTechClicks();},50);
    return h;
}
function drawTechLines(cellW,cellH){
    var svg=document.getElementById('gld-tech-svg');if(!svg)return;
    var paths='';
    TECH_TREE.forEach(function(t){
        var x1=cellW/2+t.col*cellW,y1=cellH/2+t.row*cellH;
        t.requires.forEach(function(req){
            var r=TECH_MAP[req];if(!r)return;
            var x2=cellW/2+r.col*cellW,y2=cellH/2+r.row*cellH;
            var rState=getTechState(currentGuildId,req);
            var color=rState.unlocked?'#f5d76e':'rgba(108,99,255,.25)';
            var width=rState.unlocked?3:2;
            var dash=rState.unlocked?'':'8 4';
            paths+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+width+'" stroke-dasharray="'+dash+'" stroke-linecap="round" opacity="'+(rState.unlocked?0.9:0.5)+'"/>';
        });
    });
    svg.innerHTML=paths;
}
function bindTechClicks(){
    document.querySelectorAll('.gld-tech-node').forEach(function(el){
        el.onclick=function(){
            var techId=el.dataset.tech;if(!techId)return;
            var status=getTechStatusClass(currentGuildId,techId);
            if(status==='locked'){toast('Сначала откройте предыдущую технологию','warning');return;}
            openTechModal(techId);
        };
    });
}
async function openTechModal(techId){
    var t=TECH_MAP[techId];if(!t)return;
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];
    if(!g)return;
    var state=getTechState(currentGuildId,techId);
    var isMember=myGuildId===currentGuildId;
    var canContribute=!!currentUser && isMember;
    var pct=t.cost>0?Math.min((state.progress/t.cost)*100,100):0;
    var myBalance=0;
    if(currentUser){
        try{
            var cr=await client.from('user_currency').select('clay_talents').eq('user_id',currentUser.id).maybeSingle();
            myBalance=(cr&&cr.data&&cr.data.clay_talents)||0;
        }catch(e){}
    }
    var contribs=isMember?await loadContribs(currentGuildId,techId):[];
    var contribsHtml='';
    if(contribs.length){
        contribsHtml='<div class="gld-tech-contributors"><div class="gld-tech-contributors-title">Вклад участников</div>';
        contribs.forEach(function(c){
            var p=profilesMap[c.user_id]||{};
            var nm=p.display_name||p.username||'Аноним';
            contribsHtml+='<div class="gld-tech-contrib-row"><img class="gld-tech-contrib-avatar" src="'+(p.avatar_url||avatarFor(nm))+'" onerror="this.onerror=null;this.src=\''+avatarFor(nm)+'\'"><span class="gld-tech-contrib-name">'+esc(nm)+'</span><span class="gld-tech-contrib-amount">+'+c.amount+' 🪙</span></div>';
        });
        contribsHtml+='</div>';
    } else if(isMember){
        contribsHtml='<div class="gld-tech-contributors"><div class="gld-tech-contributors-title">Вклад участников</div><div class="gld-tech-contrib-empty">Пока никто не вложился</div></div>';
    }
    var quickBtns='';
    if(!state.unlocked && canContribute){
        var left=t.cost-state.progress;
        [10,25,50,100].forEach(function(n){
            if(n<=left)quickBtns+='<button class="gld-tech-contrib-btn" onclick="gldTechContribute(\''+techId+'\','+n+')">+'+n+' 🪙</button>';
        });
        if(myBalance>0)quickBtns+='<button class="gld-tech-contrib-btn" onclick="gldTechContribute(\''+techId+'\','+Math.min(myBalance,left)+')">Макс</button>';
        quickBtns+='<button class="gld-tech-contrib-btn primary" onclick="gldTechContributeCustom(\''+techId+'\')">Своя сумма</button>';
    }
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal wide"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<div class="gld-tech-modal-head"><div class="gld-tech-modal-icon">'+t.icon+'</div>'+
        '<div class="gld-tech-modal-info"><h3 class="gld-tech-modal-name">'+esc(t.name)+' <span class="gld-tech-tier-badge t'+t.tier+'" style="position:static;margin-left:6px;">TIER '+t.tier+'</span></h3>'+
        '<p class="gld-tech-modal-desc">'+esc(t.desc)+'</p></div></div>'+
        (state.unlocked?'<div style="text-align:center;padding:16px;background:linear-gradient(135deg,rgba(39,174,96,.15),rgba(39,174,96,.05));border-radius:14px;font-weight:800;color:#27ae60;font-size:1.05rem;">Технология открыта</div>':'')+
        (!state.unlocked?'<div class="gld-tech-progress-big"><div class="gld-tech-progress-fill" style="width:'+pct+'%"></div></div>'+
        '<div class="gld-tech-progress-stats"><span>🪙 '+state.progress+' / '+t.cost+'</span><span>'+Math.round(pct)+'%</span></div>':'')+
        (!state.unlocked && canContribute?'<div style="text-align:center;font-size:.82rem;color:#888;margin-bottom:12px;">Твой баланс: <b style="color:#f39c12;">🪙 '+myBalance+'</b></div>':'')+
        (!state.unlocked && canContribute?'<div class="gld-tech-contrib-quick">'+quickBtns+'</div>':'')+
        (!state.unlocked && !canContribute?'<p style="text-align:center;color:#999;font-size:.85rem;padding:12px;">Вступите в гильдию, чтобы участвовать</p>':'')+
        contribsHtml+
        '</div>';
    document.body.appendChild(o);
    o.addEventListener('click',function(e){if(e.target===o)o.remove();});
}
window.gldTechContribute=async function(techId,amount){
    var t=TECH_MAP[techId];if(!t)return;
    var state=getTechState(currentGuildId,techId);
    var left=t.cost-state.progress;
    if(amount>left)amount=left;
    if(amount<=0)return;
    var bg=document.querySelector('.gld-modal-bg');
    try{
        var r=await client.rpc('guild_tech_contribute',{
            p_guild_id:currentGuildId,p_tech_id:techId,p_cost:t.cost,p_amount:amount
        });
        if(r.error)throw r.error;
        var d=r.data||{};
        if(!d.ok){toast(d.error||'Ошибка','error');return;}
        toast('+'+d.amount+' талантов в «'+t.name+'»!','success');
        if(d.unlocked){toast('Технология «'+t.name+'» открыта!','success');confetti();}
        if(bg)bg.remove();
        await loadData();render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};
window.gldTechContributeCustom=function(techId){
    var t=TECH_MAP[techId];if(!t)return;
    var state=getTechState(currentGuildId,techId);
    var left=t.cost-state.progress;
    var v=prompt('Сколько талантов вложить? (осталось '+left+')');
    if(!v)return;
    var n=parseInt(v,10);
    if(!n||n<=0){toast('Некорректная сумма','error');return;}
    if(n>left){toast('Максимум '+left,'warning');return;}
    gldTechContribute(techId,n);
};

/* ═══ RATING ═══ */
function renderRatingTable(){
    var stats=guilds.map(function(g){
        var mCount=membersCount[g.id]||0;
        var members=membersMap[g.id]||[];
        var totalXP=0,maxLevel=0;
        members.forEach(function(m){
            var p=profilesMap[m.user_id]||{};
            var xp=p.experience||0;
            totalXP+=xp;
            var lvl=getLevel(xp).level;
            if(lvl>maxLevel)maxLevel=lvl;
        });
        var avgXP=mCount?Math.round(totalXP/mCount):0;
        return {g:g,members:mCount,totalXP:totalXP,avgXP:avgXP,maxLevel:maxLevel,bank:g.bank||0};
    });
    stats.sort(function(a,b){return b.members-a.members;});
    var h='<h3 style="margin:0 0 16px;font-size:1.1rem;">Рейтинг гильдий</h3>';
    h+='<div style="overflow-x:auto;"><table class="gld-rating-table"><thead><tr>'+
        '<th>#</th><th>Гильдия</th><th style="text-align:right;">Участников</th>'+
        '<th style="text-align:right;">Сумма XP</th><th style="text-align:right;">Ср. XP</th>'+
        '<th style="text-align:right;">Макс. ур.</th><th style="text-align:right;">Казна</th>'+
        '</tr></thead><tbody>';
    stats.forEach(function(s,i){
        var isMine=s.g.id===myGuildId;
        var med=['🥇','🥈','🥉'][i]||(i+1);
        var crest=s.g.icon&&s.g.icon.indexOf('/')===0?'<img src="'+escAttr(s.g.icon)+'" style="width:20px;vertical-align:middle;margin-right:6px;">':(s.g.icon||'🏰')+' ';
        h+='<tr class="'+(isMine?'my-guild':'')+'" onclick="gldOpenGuild('+s.g.id+')" style="cursor:pointer;">'+
            '<td class="gld-rating-medal">'+med+'</td>'+
            '<td>'+crest+esc(s.g.name)+'</td>'+
            '<td style="text-align:right;">'+s.members+'</td>'+
            '<td style="text-align:right;">'+s.totalXP+'</td>'+
            '<td style="text-align:right;">'+s.avgXP+'</td>'+
            '<td style="text-align:right;">'+s.maxLevel+'</td>'+
            '<td style="text-align:right;">'+(s.bank)+'</td>'+
        '</tr>';
    });
    h+='</tbody></table></div>';
    return h;
}

/* ═══ LIST ═══ */
function renderList(){
    document.documentElement.style.setProperty('--gk',myKingdom.color);
    document.documentElement.style.setProperty('--gk-l',myKingdom.light);
    document.documentElement.style.setProperty('--gk-s',myKingdom.color+'40');
    var total=Object.values(membersCount).reduce(function(a,b){return a+b;},0);
    var filtered=guilds.slice();
    if(activeFilter==='my'&&myGuildId)filtered=filtered.filter(function(g){return g.id===myGuildId;});
    if(searchQuery){var q=searchQuery.toLowerCase();filtered=filtered.filter(function(g){return (g.name||'').toLowerCase().indexOf(q)!==-1||(g.description||'').toLowerCase().indexOf(q)!==-1;});}
    filtered.sort(function(a,b){return (membersCount[b.id]||0)-(membersCount[a.id]||0);});
    container.innerHTML=
    '<div class="gld-hero gld-fade"><span class="gld-star" style="top:15%;left:8%">✦</span><span class="gld-star" style="top:25%;right:12%;animation-delay:.6s">✦</span><span class="gld-star" style="bottom:20%;left:15%;animation-delay:1.2s">✦</span><span class="gld-star" style="bottom:30%;right:8%;animation-delay:1.8s">✦</span>'+
        '<div class="gld-hero-content">'+
        '<div class="gld-hero-crest">🏰</div>'+
        '<h1 class="gld-hero-title"><span>Гильдии Марса</span></h1>'+
        '<p class="gld-hero-sub">'+(currentUser?'Объединяйтесь с другими исследователями!':'Войдите, чтобы создавать и вступать')+'</p>'+
        '<div class="gld-hero-actions">'+
            (currentUser&&!myGuildId?'<button class="gld-hero-btn primary" onclick="gldCreate()">Создать гильдию</button>':'')+
            (currentUser&&myGuildId?'<button class="gld-hero-btn primary" onclick="gldOpenMine()">Моя гильдия</button>':'')+
            (!currentUser?'<a href="/login/" class="gld-hero-btn primary">Войти</a>':'')+
        '</div></div></div>'+
    '<div class="gld-stats-grid gld-fade" style="animation-delay:.1s;">'+
        '<div class="gld-stat"><div class="gld-stat-icon">🏰</div><div class="gld-stat-value">'+guilds.length+'</div><div class="gld-stat-label">Гильдий</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">👥</div><div class="gld-stat-value">'+total+'</div><div class="gld-stat-label">Участников</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">⭐</div><div class="gld-stat-value">'+(myGuildId?'1':'0')+'</div><div class="gld-stat-label">Моя</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">📊</div><div class="gld-stat-value">'+(guilds.length?Math.round(total/guilds.length):0)+'</div><div class="gld-stat-label">Средний</div></div>'+
    '</div>'+
    '<div class="gld-filters gld-fade" style="animation-delay:.15s;">'+
        '<button class="gld-filter-btn '+(activeFilter==='all'?'active':'')+'" onclick="gldFilter(\'all\')">Все</button>'+
        (currentUser&&myGuildId?'<button class="gld-filter-btn '+(activeFilter==='my'?'active':'')+'" onclick="gldFilter(\'my\')">Моя</button>':'')+
        '<button class="gld-filter-btn '+(activeFilter==='rating'?'active':'')+'" onclick="gldFilter(\'rating\')">Рейтинг</button>'+
        '<input class="gld-search" type="text" placeholder="Поиск..." value="'+escAttr(searchQuery)+'" oninput="gldSearch(this.value)">'+
    '</div>'+
    (activeFilter==='rating' ? renderRatingTable() :
        filtered.length===0?
            '<div class="gld-empty"><div class="gld-empty-icon">🏰</div><div style="font-weight:700;color:#666;">'+(searchQuery?'Ничего не найдено':'Гильдий пока нет')+'</div></div>'
            :
            '<div class="gld-grid">'+filtered.map(renderCard).join('')+'</div>'
    );
}
function renderCard(g,i){
    var l=profilesMap[g.leader_id]||{};
    var lName=l.display_name||l.username||'Аноним';
    var count=membersCount[g.id]||0;
    var isMine=g.id===myGuildId;
    var status=isMine?'<span class="gld-card-status my">Ваша</span>':'<span class="gld-card-status open">Открыта</span>';
    var action;
    if(!currentUser)action='<button class="gld-btn primary" onclick="location.href=\'/login/\'">Войти</button>';
    else if(isMine)action='<button class="gld-btn primary" onclick="gldOpenGuild('+g.id+')">Открыть</button>';
    else if(myGuildId)action='<button class="gld-btn secondary" disabled style="opacity:.5;">Вы в гильдии</button>';
    else action='<button class="gld-btn primary" onclick="gldJoin('+g.id+')">Вступить</button>';
    var crestHtml=g.icon&&g.icon.indexOf('/')===0?'<img src="'+escAttr(g.icon)+'">':(g.icon||'🏰');
    var shape=g.crest_shape||'shield';
    var kColor=g.kingdom&&KINGDOMS[g.kingdom]?KINGDOMS[g.kingdom].color:(g.color||'#6C63FF');
    return '<div class="gld-card gld-fade" style="--guild-color:'+kColor+';animation-delay:'+(i*.05)+'s;">'+
        '<div class="gld-card-header"><div class="gld-card-icon shape-'+shape+'">'+crestHtml+'</div>'+
        '<div style="flex:1;min-width:0;"><h3 class="gld-card-name">'+esc(g.name)+'</h3>'+
        '<div class="gld-card-leader">'+esc(lName)+(g.kingdom?' · '+esc(g.kingdom):'')+'</div></div></div>'+
        '<p class="gld-card-desc">'+esc(g.description||'Без описания')+'</p>'+
        '<div class="gld-card-footer"><span class="gld-card-members">'+count+' участников</span>'+status+'</div>'+
        '<div class="gld-card-actions">'+action+'</div></div>';
}

/* ═══ DETAIL ═══ */
async function renderGuildDetail(){
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];
    if(!g){currentView='list';render();return;}
    var kName=g.kingdom||kingdomByFlag(g.flag);
    var kObj=kName?KINGDOMS[kName]:null;
    var gColor=kObj?kObj.color:(g.color||'#6C63FF');
    var gLight=kObj?kObj.light:(g.color||'#6C63FF');
    document.documentElement.style.setProperty('--gk',gColor);
    document.documentElement.style.setProperty('--gk-l',gLight);
    document.documentElement.style.setProperty('--gk-s',gColor+'40');

    var members=(membersMap[g.id]||[]).slice();
    var isLeader=g.leader_id===currentUser.id;
    var canManage=myRank>=4||isLeader;
    var isMember=myGuildId===currentGuildId;

    members.sort(function(a,b){
        var pa=profilesMap[a.user_id]||{},pb=profilesMap[b.user_id]||{};
        if(sortBy==='rank')return (b.rank||1)-(a.rank||1);
        if(sortBy==='level')return (pb.level||0)-(pa.level||0);
        if(sortBy==='xp')return (pb.experience||0)-(pa.experience||0);
        if(sortBy==='name'){var na=(pa.display_name||pa.username||'').toLowerCase();var nb=(pb.display_name||pb.username||'').toLowerCase();return na.localeCompare(nb);}
        return (b.rank||1)-(a.rank||1);
    });

    if(currentTab==='chat'&&isMember)await loadChat();
    if(!isMember && ['tech','chat','letters','bank','quests'].indexOf(currentTab)!==-1){currentTab='members';}

    var tabs='<div class="gld-tabs">'+
        '<button class="gld-tab'+(currentTab==='members'?' active':'')+'" onclick="gldTab(\'members\')">Участники</button>';
    if(isMember){
        tabs+='<button class="gld-tab'+(currentTab==='tech'?' active':'')+'" onclick="gldTab(\'tech\')">Технологии</button>'+
            '<button class="gld-tab'+(currentTab==='quests'?' active':'')+'" onclick="gldTab(\'quests\')">Задания</button>'+
            '<button class="gld-tab'+(currentTab==='chat'?' active':'')+'" onclick="gldTab(\'chat\')">Чат</button>'+
            '<button class="gld-tab'+(currentTab==='letters'?' active':'')+'" onclick="gldTab(\'letters\')">Письма</button>'+
            '<button class="gld-tab'+(currentTab==='bank'?' active':'')+'" onclick="gldTab(\'bank\')">Банк</button>';
    } else {
        tabs+='<button class="gld-tab locked" onclick="toast(\'Только для участников\',\'warning\')">Технологии</button>'+
            '<button class="gld-tab locked" onclick="toast(\'Только для участников\',\'warning\')">Чат</button>';
    }
    tabs+='</div>';

    var content='';
    if(currentTab==='members'){
        content='<div class="gld-members gld-fade">'+
            '<div class="gld-members-banner"><div class="gld-members-banner-content"><div class="gld-members-banner-title">Чертог Славы</div></div></div>'+
            '<div class="gld-members-toolbar">'+
                '<span class="gld-members-toolbar-label">Сортировка:</span>'+
                '<button class="gld-sort-btn'+(sortBy==='rank'?' active':'')+'" onclick="gldSetSort(\'rank\')">Ранг</button>'+
                '<button class="gld-sort-btn'+(sortBy==='level'?' active':'')+'" onclick="gldSetSort(\'level\')">Уровень</button>'+
                '<button class="gld-sort-btn'+(sortBy==='xp'?' active':'')+'" onclick="gldSetSort(\'xp\')">Опыт</button>'+
                '<button class="gld-sort-btn'+(sortBy==='name'?' active':'')+'" onclick="gldSetSort(\'name\')">Имя</button>'+
            '</div>'+
            '<div class="gld-members-list">'+members.map(function(m){return renderMember(m,g);}).join('')+'</div></div>';
    } else if(currentTab==='tech' && isMember){
        content=renderTechTree();
    } else if(currentTab==='quests' && isMember){
        var qr=await client.from('guild_quests').select('*').eq('guild_id',g.id).order('created_at',{ascending:false});
        var quests=(qr&&qr.data)||[];
        var pr=await client.from('guild_quest_progress').select('quest_id,completed').eq('user_id',currentUser.id);
        var doneMap={};(pr&&pr.data||[]).forEach(function(x){if(x.completed)doneMap[x.quest_id]=true;});
        content='<div class="gld-members gld-fade" style="padding:20px;">'+
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap;">'+
            '<h3 style="margin:0;">Задания гильдии</h3>'+
            (canManage?'<button class="gld-btn-min primary" onclick="gldCreateQuest()">Создать задание</button>':'')+'</div>';
        if(!quests.length){
            content+='<p style="color:#888;text-align:center;padding:30px;">Заданий пока нет</p>';
        } else {
            quests.forEach(function(q){
                var done=!!doneMap[q.id];
                content+='<div class="gld-quest">'+
                    '<div class="gld-quest-title">'+esc(q.title)+'</div>'+
                    (q.description?'<div class="gld-quest-desc">'+esc(q.description)+'</div>':'')+
                    '<div class="gld-quest-rewards">'+
                        (q.reward_xp?'<span>+'+q.reward_xp+' XP</span>':'')+
                        (q.reward_talents?'<span>+'+q.reward_talents+' талантов</span>':'')+
                        '<span>Цель: '+q.goal+'</span>'+
                    '</div>'+
                    (done?'<div class="gld-quest-done">Выполнено</div>':
                        '<button class="gld-btn-min primary" onclick="gldCompleteQuest('+q.id+')">Отметить выполненным</button>')+
                '</div>';
            });
        }
        content+='</div>';
    } else if(currentTab==='chat' && isMember){
        content='<div class="gld-chat gld-fade">'+
            '<div class="gld-chat-header"><div style="font-size:1.4rem;">💬</div><div class="gld-chat-header-title">Чат гильдии</div><div class="gld-chat-header-count" id="gld-chat-count">'+chatMessages.length+' сообщ.</div></div>'+
            '<div class="gld-chat-body" id="gld-chat-body">'+renderChatBody()+'</div>'+
            '<div class="gld-chat-input"><input type="text" id="gld-chat-input" placeholder="Написать сообщение..." maxlength="1000" onkeypress="if(event.key===\'Enter\')gldSendChat();if(event.key===\'Escape\')gldCancelReply()">'+
            '<button onclick="gldSendChat()">Отправить</button></div></div>';
    } else if(currentTab==='letters' && isMember){
        var lr=await client.from('guild_letters').select('*').eq('guild_id',g.id).order('created_at',{ascending:false}).limit(50);
        var letters=(lr&&lr.data)||[];
        content='<div class="gld-members gld-fade" style="padding:20px;">'+
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap;">'+
            '<h3 style="margin:0;">Письма гильдии</h3>'+
            (canManage?'<button class="gld-btn-min primary" onclick="gldWriteMessage()">Написать</button>':'')+'</div>'+
            (letters.length?letters.map(function(l){return renderLetter(l);}).join(''):'<p style="color:#888;text-align:center;padding:30px;">Писем пока нет</p>')+
        '</div>';
    } else if(currentTab==='bank' && isMember){
        var myCoins=0;
        try{var cc=await client.from('user_currency').select('clay_talents').eq('user_id',currentUser.id).maybeSingle();myCoins=(cc&&cc.data&&cc.data.clay_talents)||0;}catch(e){}
        content='<div class="gld-members gld-fade" style="padding:20px;background-image:linear-gradient(rgba(255,255,255,.96),rgba(255,255,255,.96)),url(\''+TREASURY_BG+'\');background-size:cover;">'+
            '<div class="gld-bank-balance"><img src="'+COIN_IMG+'" alt=""><div class="gld-bank-balance-value">'+(g.bank||0)+'</div><div class="gld-bank-balance-label">Казна гильдии</div></div>'+
            '<p style="text-align:center;color:#666;font-size:.85rem;margin:0 0 16px;">Ваш личный баланс: <b style="color:#f39c12;">'+myCoins+' талантов</b></p>'+
            '<div class="gld-action-menu">'+
                '<div class="gld-action-card" onclick="gldBankDeposit()"><div class="gld-action-icon">$</div><div class="gld-action-title">Вложить</div><div class="gld-action-desc">Из личного в казну</div></div>'+
                (canManage?'<div class="gld-action-card" onclick="gldBankWithdraw()"><div class="gld-action-icon">←</div><div class="gld-action-title">Снять</div><div class="gld-action-desc">R4+ может взять</div></div>':'')+
            '</div>'+
            '<div style="background:#f8f9fb;border-radius:14px;padding:14px;margin-top:16px;">'+
                '<h4 style="margin:0 0 10px;font-size:.9rem;">Как это работает</h4>'+
                '<ul style="margin:0;padding-left:20px;font-size:.82rem;color:#666;line-height:1.6;">'+
                '<li><b>Банк</b> — таланты гильдии</li>'+
                '<li><b>Вложить</b> — перенести свои в казну</li>'+
                '<li><b>Снять</b> — доступно R4 и R5</li>'+
                '<li>Из казны идут <b>технологии</b></li>'+
                '</ul>'+
            '</div>'+
        '</div>';
    }

    var crestHtml=g.icon&&g.icon.indexOf('/')===0?'<img src="'+escAttr(g.icon)+'" alt="">':(g.icon||'🏰');
    var flagHtml=g.flag?'<img src="'+escAttr(g.flag)+'" alt="">':'';
    var shape=g.crest_shape||'shield';
    container.innerHTML=
    '<button class="gld-btn secondary" onclick="gldBack()" style="max-width:180px;margin-bottom:16px;">Назад к списку</button>'+
    '<div class="gld-page-hero gld-fade" style="--guild-color:'+gColor+';">'+
        '<span class="gld-star" style="top:20%;right:10%">✦</span>'+
        '<span class="gld-star" style="bottom:20%;left:8%;animation-delay:.8s">✦</span>'+
        '<div class="gld-page-content">'+
            '<div class="gld-page-crest shape-'+shape+'">'+crestHtml+'</div>'+
            '<div class="gld-page-info">'+
                '<h1 class="gld-page-name">'+flagHtml+esc(g.name)+'</h1>'+
                (kName?'<p class="gld-page-kingdom">'+esc(kName)+'</p>':'')+
                (g.motto?'<p class="gld-page-motto">«'+esc(g.motto)+'»</p>':'')+
                (g.description?'<p class="gld-page-desc">'+esc(g.description)+'</p>':'')+
                '<div class="gld-page-stats">'+
                    '<div><b>'+(membersCount[g.id]||0)+'</b>Участников</div>'+
                    '<div><b>'+((g.rating)||0)+'</b>Рейтинг</div>'+
                    '<div><img src="'+COIN_IMG+'" class="gld-coin-icon" alt=""><b>'+(g.bank||0)+'</b>Казна</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    (isMember?'<div class="gld-action-menu">'+
        (canManage?'<div class="gld-action-card" onclick="gldEditGuild()"><div class="gld-action-icon">⚙</div><div class="gld-action-title">Настройки</div><div class="gld-action-desc">Герб, форма, девиз</div></div>':'')+
        (!isLeader?'<div class="gld-action-card" onclick="gldLeave()"><div class="gld-action-icon">←</div><div class="gld-action-title">Выйти</div><div class="gld-action-desc">Покинуть гильдию</div></div>':'')+
        (isLeader?'<div class="gld-action-card" onclick="gldDelete()"><div class="gld-action-icon">✕</div><div class="gld-action-title">Удалить</div><div class="gld-action-desc">Только лидер</div></div>':'')+
    '</div>':'')+
    tabs+content;
}

function renderMember(m,g){
    var p=profilesMap[m.user_id]||{};
    var name=p.display_name||p.username||'Аноним';
    var av=p.avatar_url||avatarFor(name);
    var rank=RANKS[m.rank]||RANKS[1];
    var isMe=m.user_id===currentUser.id;
    var canManage=(myRank>=4||g.leader_id===currentUser.id)&&m.rank<5&&!isMe;
    var sub=null;if(m.rank===4&&m.subtitle){sub=SUBTITLES.filter(function(s){return s.id===m.subtitle;})[0];}
    var lvl=p.experience!==undefined?getLevel(p.experience):null;
    return '<div class="gld-member" onclick="gldShowProfile(\''+escAttr(m.user_id)+'\')">'+
        '<div class="rank-badge '+rank.class+'">'+(m.rank===5?'👑':(m.rank===4?'🛡️':'R'+m.rank))+'</div>'+
        '<img src="'+escAttr(av)+'" class="gld-member-avatar" onerror="this.onerror=null;this.src=\''+avatarFor(name)+'\';">'+
        '<div class="gld-member-info"><div class="gld-member-name">'+esc(name)+(isMe?' (вы)':'')+
            (sub?'<span class="subtitle-badge">'+sub.icon+' '+sub.name+'</span>':'')+
        '</div><div class="gld-member-meta">'+rank.icon+' '+rank.label+'</div></div>'+
        (lvl?'<div class="gld-member-level"><div class="gld-member-level-num">Ур. '+lvl.level+'</div><div class="gld-member-level-xp">'+(p.experience||0)+' XP</div></div>':'')+
        (canManage?'<div class="gld-member-actions" onclick="event.stopPropagation();"><button class="gld-icon-btn" onclick="gldEditMember(\''+escAttr(m.user_id)+'\','+m.rank+',\''+escAttr(m.subtitle||'')+'\')">⚙</button></div>':'')+
    '</div>';
}
function renderLetter(l){
    var p=profilesMap[l.author_id]||{};
    var name=p.display_name||p.username||'Аноним';
    return '<div style="padding:14px 16px;border-radius:12px;background:rgba(0,0,0,.02);margin-bottom:8px;cursor:pointer;" onclick="gldShowLetter(\''+escAttr(l.id)+'\')">'+
        '<div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:.82rem;"><b>'+esc(name)+'</b><span style="color:#999;font-size:.72rem;">'+new Date(l.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</span></div>'+
        '<div style="font-weight:700;color:#1a1a1a;font-size:.9rem;margin-bottom:2px;">'+esc(l.subject)+'</div>'+
        '<div style="font-size:.78rem;color:#888;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(l.body.slice(0,80))+'</div></div>';
}
window.gldShowLetter=function(id){
    client.from('guild_letters').select('*').eq('id',id).single().then(function(r){
        if(!r.data)return;
        var p=profilesMap[r.data.author_id]||{};
        var name=p.display_name||p.username||'Аноним';
        var o=document.createElement('div');o.className='gld-modal-bg';
        o.innerHTML='<div class="gld-modal"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
            '<h2 class="gld-modal-title">'+esc(r.data.subject)+'</h2>'+
            '<p style="color:#888;font-size:.82rem;margin:0 0 12px;">От: '+esc(name)+' · '+new Date(r.data.created_at).toLocaleString('ru-RU')+'</p>'+
            '<p style="line-height:1.7;color:#333;white-space:pre-wrap;">'+esc(r.data.body)+'</p></div>';
        document.body.appendChild(o);
    });
};

/* ═══ CHAT ═══ */
async function loadChat(){
    if(!currentGuildId)return;
    var r=await client.from('guild_chat').select('id,user_id,message,created_at,reply_to,edited').eq('guild_id',currentGuildId).order('created_at',{ascending:true}).limit(100);
    chatMessages=(r&&r.data)||[];
    var msgIds=chatMessages.map(function(m){return m.id;});
    chatReactions={};
    if(msgIds.length){
        var rr=await client.from('guild_chat_reactions').select('message_id,user_id,emoji').in('message_id',msgIds);
        (rr&&rr.data||[]).forEach(function(x){if(!chatReactions[x.message_id])chatReactions[x.message_id]=[];chatReactions[x.message_id].push(x);});
    }
    var ids={};
    chatMessages.forEach(function(m){if(!profilesMap[m.user_id])ids[m.user_id]=true;});
    var arr=Object.keys(ids);
    if(arr.length){
        var p=await client.from('profiles').select('user_id,username,display_name,avatar_url').in('user_id',arr);
        (p&&p.data||[]).forEach(function(x){profilesMap[x.user_id]=x;});
    }
}
function renderChatBody(){
    if(!chatMessages.length)return '<div class="gld-chat-empty"><div style="font-size:4rem;margin-bottom:12px;">💬</div><div style="font-weight:800;color:#555;margin-bottom:6px;">Пока тихо...</div><div style="font-size:.85rem;">Напишите первое сообщение!</div></div>';
    return chatMessages.map(function(m){
        var p=profilesMap[m.user_id]||{};
        var name=p.display_name||p.username||'Аноним';
        var av=p.avatar_url||avatarFor(name);
        var isOwn=m.user_id===currentUser.id;
        var mem=(membersMap[currentGuildId]||[]).filter(function(x){return x.user_id===m.user_id;})[0];
        var rank=mem?RANKS[mem.rank]||RANKS[1]:RANKS[1];
        var rb='<span class="rank-badge '+rank.class+'" style="width:20px;height:20px;font-size:.62rem;">'+(mem&&mem.rank===5?'👑':(mem&&mem.rank===4?'🛡️':'R'+(mem?mem.rank:1)))+'</span>';
        var replyHtml='';
        if(m.reply_to){
            var rp=chatMessages.filter(function(x){return x.id===m.reply_to;})[0];
            if(rp){var rpn=profilesMap[rp.user_id]||{};var rpName=rpn.display_name||rpn.username||'Аноним';
                replyHtml='<div class="gld-chat-msg-reply" onclick="gldScrollTo(\''+escAttr(rp.id)+'\')">↩ '+esc(rpName)+': '+esc(rp.message.slice(0,50))+'</div>';}
        }
        var rxs=chatReactions[m.id]||[];
        var grouped={};rxs.forEach(function(rx){if(!grouped[rx.emoji])grouped[rx.emoji]=[];grouped[rx.emoji].push(rx.user_id);});
        var rxHtml='';var keys=Object.keys(grouped);
        if(keys.length){
            rxHtml='<div class="gld-chat-reactions'+(isOwn?' own':'')+'">';
            keys.forEach(function(e){var mine=grouped[e].indexOf(currentUser.id)!==-1;
                rxHtml+='<button class="gld-chat-reaction'+(mine?' mine':'')+'" onclick="gldToggleReaction(\''+escAttr(m.id)+'\',\''+escAttr(e)+'\')">'+e+' '+grouped[e].length+'</button>';});
            rxHtml+='</div>';
        }
        var textContent=esc(m.message).replace(/\n/g,'<br>');
        if(translations[m.id])textContent='<em style="opacity:.75;font-size:.78rem;">'+esc(translations[m.id])+'</em><br>'+textContent;
        return '<div class="gld-chat-msg'+(isOwn?' own':'')+'" data-msg-id="'+escAttr(m.id)+'">'+
            '<img src="'+escAttr(av)+'" class="gld-chat-msg-avatar" onclick="gldShowProfile(\''+escAttr(m.user_id)+'\')" onerror="this.onerror=null;this.src=\''+avatarFor(name)+'\';">'+
            '<div class="gld-chat-msg-content">'+replyHtml+
                '<div class="gld-chat-msg-head">'+rb+'<span class="gld-chat-msg-author" onclick="gldShowProfile(\''+escAttr(m.user_id)+'\')">'+esc(name)+'</span></div>'+
                '<div class="gld-chat-msg-text'+(m.edited?' edited':'')+'">'+textContent+
                    '<button class="gld-chat-msg-menu-btn" onclick="event.stopPropagation();gldOpenMsgMenu(\''+escAttr(m.id)+'\',event)" title="Действия">⋮</button>'+
                '</div>'+
                '<div class="gld-chat-msg-time">'+fmtTime(m.created_at)+'</div>'+rxHtml+
            '</div></div>';
    }).join('');
}
async function sendChat(){
    var input=document.getElementById('gld-chat-input');
    if(!input||!currentUser||!currentGuildId)return;
    var msg=input.value.trim();if(!msg)return;
    input.disabled=true;
    if(editingId){
        var r=await client.from('guild_chat').update({message:msg,edited:true}).eq('id',editingId).select();
        input.disabled=false;
        if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
        if(!r.data||!r.data.length){toast('Нет прав','error');return;}
        delete translations[editingId];
        editingId=null;replyTo=null;
        input.placeholder='Написать сообщение...';input.value='';removeReplyPreview();
        toast('Изменено','success');await loadChat();updateChatUI();return;
    }
    var payload={guild_id:currentGuildId,user_id:currentUser.id,message:msg};
    if(replyTo)payload.reply_to=replyTo;
    var r=await client.from('guild_chat').insert([payload]);
    input.disabled=false;
    if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
    input.value='';replyTo=null;removeReplyPreview();
    await loadChat();updateChatUI();
}
function updateChatUI(){
    var body=document.getElementById('gld-chat-body');
    var countEl=document.getElementById('gld-chat-count');
    if(body){
        var wasBottom=(body.scrollHeight-body.scrollTop-body.clientHeight)<100;
        body.innerHTML=renderChatBody();
        if(wasBottom||chatMessages.length!==lastChatCount)body.scrollTop=body.scrollHeight;
    }
    if(countEl)countEl.textContent=chatMessages.length+' сообщ.';
    lastChatCount=chatMessages.length;
}
function startChatPolling(){
    if(chatInterval)clearInterval(chatInterval);
    chatInterval=setInterval(async function(){
        if(currentView!=='detail'||currentTab!=='chat'||editingId)return;
        var before=chatMessages.length;await loadChat();
        if(chatMessages.length!==before)updateChatUI();
    },5000);
}
window.gldOpenMsgMenu=function(msgId,ev){
    ev.stopPropagation();
    var old=document.querySelector('.gld-msg-menu.open');if(old)old.remove();
    var m=chatMessages.filter(function(x){return x.id===msgId;})[0];if(!m)return;
    var isOwn=m.user_id===currentUser.id;
    var menu=document.createElement('div');menu.className='gld-msg-menu open';
    menu.innerHTML='<button onclick="gldStartReply(\''+escAttr(msgId)+'\');gldCloseMenu()">Ответить</button>'+
        '<button onclick="gldOpenEmoji(\''+escAttr(msgId)+'\',event);gldCloseMenu()">Реакция</button>'+
        (isOwn?'<button onclick="gldStartEdit(\''+escAttr(msgId)+'\');gldCloseMenu()">Редактировать</button>':'')+
        '<button onclick="gldToggleTranslate(\''+escAttr(msgId)+'\');gldCloseMenu()">'+(translations[msgId]?'Скрыть перевод':'Перевести')+'</button>'+
        (isOwn?'<button class="danger" onclick="gldDeleteMsg(\''+escAttr(msgId)+'\');gldCloseMenu()">Удалить</button>':'');
    document.body.appendChild(menu);
    var rect=ev.target.getBoundingClientRect();
    menu.style.top=Math.min(rect.bottom+6,window.innerHeight-260)+'px';
    menu.style.left=Math.min(rect.left,window.innerWidth-200)+'px';
    setTimeout(function(){document.addEventListener('click',closeMenuOnce);},10);
};
function closeMenuOnce(){gldCloseMenu();document.removeEventListener('click',closeMenuOnce);}
window.gldCloseMenu=function(){var el=document.querySelector('.gld-msg-menu.open');if(el)el.remove();};
window.gldOpenEmoji=function(msgId,ev){
    ev.stopPropagation();
    var old=document.querySelector('.gld-emoji-panel.open');if(old)old.remove();
    var panel=document.createElement('div');panel.className='gld-emoji-panel open';
    panel.innerHTML=REACTIONS.map(function(e){return '<button onclick="gldToggleReaction(\''+escAttr(msgId)+'\',\''+e+'\');gldCloseEmoji()">'+e+'</button>';}).join('');
    document.body.appendChild(panel);
    var rect=ev.target.getBoundingClientRect();
    panel.style.top=Math.min(rect.bottom+6,window.innerHeight-200)+'px';
    panel.style.left=Math.min(rect.left,window.innerWidth-200)+'px';
    setTimeout(function(){document.addEventListener('click',closeEmojiOnce);},10);
};
function closeEmojiOnce(){gldCloseEmoji();document.removeEventListener('click',closeEmojiOnce);}
window.gldCloseEmoji=function(){var el=document.querySelector('.gld-emoji-panel.open');if(el)el.remove();};
window.gldDeleteMsg=async function(id){
    if(!confirm('Удалить?'))return;
    var r=await client.from('guild_chat').delete().eq('id',id).eq('user_id',currentUser.id);
    if(r.error){toast('Ошибка','error');return;}
    await loadChat();updateChatUI();
};
window.gldStartReply=function(id){
    var m=chatMessages.filter(function(x){return x.id===id;})[0];if(!m)return;
    replyTo=id;editingId=null;
    var p=profilesMap[m.user_id]||{};
    showReplyPreview('↩ '+esc(p.display_name||p.username||'Аноним')+': '+esc(m.message.slice(0,60)));
    var input=document.getElementById('gld-chat-input');if(input)input.focus();
};
window.gldStartEdit=function(id){
    var m=chatMessages.filter(function(x){return x.id===id;})[0];
    if(!m||m.user_id!==currentUser.id)return;
    editingId=id;replyTo=null;
    var input=document.getElementById('gld-chat-input');
    if(input){input.value=m.message;input.focus();input.placeholder='Редактирование...';}
    showReplyPreview('Редактирование (Enter — сохранить, Esc — отмена)');
};
function showReplyPreview(text){
    var old=document.getElementById('gld-reply-preview');if(old)old.remove();
    var input=document.getElementById('gld-chat-input');if(!input)return;
    var el=document.createElement('div');el.id='gld-reply-preview';el.className='gld-chat-reply-preview';
    el.innerHTML='<span>'+text+'</span><button onclick="gldCancelReply()">✕</button>';
    input.closest('.gld-chat-input').parentNode.insertBefore(el,input.closest('.gld-chat-input'));
}
function removeReplyPreview(){var el=document.getElementById('gld-reply-preview');if(el)el.remove();}
window.gldCancelReply=function(){
    replyTo=null;editingId=null;
    var input=document.getElementById('gld-chat-input');
    if(input){input.value='';input.placeholder='Написать сообщение...';}
    removeReplyPreview();
};
window.gldToggleReaction=async function(msgId,emoji){
    if(!currentUser)return;
    var mine=(chatReactions[msgId]||[]).filter(function(r){return r.user_id===currentUser.id&&r.emoji===emoji;})[0];
    if(mine)await client.from('guild_chat_reactions').delete().eq('message_id',msgId).eq('user_id',currentUser.id).eq('emoji',emoji);
    else await client.from('guild_chat_reactions').insert([{message_id:msgId,user_id:currentUser.id,emoji:emoji}]);
    await loadChat();updateChatUI();
};
window.gldToggleTranslate=async function(msgId){
    if(translations[msgId]){delete translations[msgId];updateChatUI();return;}
    var m=chatMessages.filter(function(x){return x.id===msgId;})[0];if(!m)return;
    try{
        var res=await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(m.message.slice(0,500))+'&langpair=ru|en');
        var data=await res.json();
        translations[msgId]=data&&data.responseData&&data.responseData.translatedText||'—';
        updateChatUI();
    }catch(e){toast('Ошибка перевода','error');}
};

/* ═══ BANK ═══ */
window.gldBankDeposit=async function(){
    var amount=prompt('Сколько талантов вложить в казну?');if(!amount)return;
    amount=parseInt(amount,10);if(!amount||amount<=0){toast('Сумма > 0','warning');return;}
    try{
        var r=await client.rpc('guild_bank_deposit',{p_guild_id:currentGuildId,p_amount:amount});
        if(r.error)throw r.error;
        var d=r.data||{};
        if(!d.ok){toast(d.error||'Ошибка','error');return;}
        toast('Вложено '+amount+' талантов!','success');
        await loadData();render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};
window.gldBankWithdraw=async function(){
    if(myRank<4){toast('Только R4+','error');return;}
    var amount=prompt('Сколько снять?');if(!amount)return;
    amount=parseInt(amount,10);if(!amount||amount<=0){toast('Сумма > 0','warning');return;}
    try{
        var r=await client.rpc('guild_bank_withdraw',{p_guild_id:currentGuildId,p_amount:amount});
        if(r.error)throw r.error;
        var d=r.data||{};
        if(!d.ok){toast(d.error||'Ошибка','error');return;}
        toast('Снято '+amount,'success');
        await loadData();render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};

/* ═══ CREATE ═══ */
function openCreateModal(){
    if(!currentUser||myGuildId){toast('Недоступно','warning');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    var iconHtml=GUILD_ICONS.map(function(ic,i){return '<button type="button" class="gld-icon-btn-pick'+(i===0?' selected':'')+'" data-icon="'+ic+'">'+ic+'</button>';}).join('');
    var shapeHtml=CREST_SHAPES.map(function(s,i){return '<button type="button" class="gld-icon-btn-pick'+(i===0?' selected':'')+'" data-shape="'+s+'" style="font-size:.7rem;font-weight:800;color:#555;padding:4px;">'+CREST_SHAPE_NAMES[s]+'</button>';}).join('');
    var flagHtml=Object.keys(KINGDOMS).map(function(k,i){return '<button type="button" class="gld-icon-btn-pick'+(i===0?' selected':'')+'" data-flag="'+k+'" style="padding:4px;"><img src="'+KINGDOMS[k].flag+'"></button>';}).join('');

    o.innerHTML='<div class="gld-modal wide"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">Создать гильдию</h2>'+
        '<div class="gld-field"><label>Название</label><input id="g-name" maxlength="30"></div>'+
        '<div class="gld-field"><label>Девиз</label><input id="g-motto" maxlength="60"></div>'+
        '<div class="gld-field"><label>Описание</label><textarea id="g-desc" maxlength="300"></textarea></div>'+
        '<div class="gld-field"><label>Герб</label><div class="gld-icon-picker" id="g-icons">'+iconHtml+'</div></div>'+
        '<div class="gld-field"><label>Форма герба</label><div class="gld-icon-picker" id="g-shapes">'+shapeHtml+'</div></div>'+
        '<div class="gld-field"><label>Флаг (цвет темы)</label><div class="gld-icon-picker" id="g-flags">'+flagHtml+'</div></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="g-create">Создать</button></div></div>';
    document.body.appendChild(o);

    o.querySelectorAll('#g-icons .gld-icon-btn-pick').forEach(function(b){b.onclick=function(){o.querySelectorAll('#g-icons .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('#g-shapes .gld-icon-btn-pick').forEach(function(b){b.onclick=function(){o.querySelectorAll('#g-shapes .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('#g-flags .gld-icon-btn-pick').forEach(function(b){b.onclick=function(){o.querySelectorAll('#g-flags .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});

    o.querySelector('#g-create').onclick=async function(){
        var iconEl=o.querySelector('#g-icons .selected')||o.querySelector('#g-icons .gld-icon-btn-pick');
        var shapeEl=o.querySelector('#g-shapes .selected')||o.querySelector('#g-shapes .gld-icon-btn-pick');
        var flagEl=o.querySelector('#g-flags .selected')||o.querySelector('#g-flags .gld-icon-btn-pick');
        var kName=flagEl.dataset.flag;
        await createGuildWithShape(
            o.querySelector('#g-name').value.trim(),
            o.querySelector('#g-desc').value.trim(),
            iconEl.dataset.icon,
            shapeEl.dataset.shape,
            kName,
            o.querySelector('#g-motto').value.trim()
        );
        o.remove();
    };
}

/* ═══ EDIT ═══ */
window.gldEditGuild=async function(){
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];if(!g)return;
    if(myRank<4&&g.leader_id!==currentUser.id){toast('Только R4+','error');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    var curShape=g.crest_shape||'shield';
    var iconHtml=GUILD_ICONS.map(function(ic){return '<button type="button" class="gld-icon-btn-pick'+(g.icon===ic?' selected':'')+'" data-icon="'+ic+'">'+ic+'</button>';}).join('');
    var flagHtml=Object.keys(KINGDOMS).map(function(k){return '<button type="button" class="gld-icon-btn-pick'+(g.flag===KINGDOMS[k].flag?' selected':'')+'" data-flag="'+k+'" style="padding:4px;"><img src="'+KINGDOMS[k].flag+'"></button>';}).join('');
    var shapeHtml=CREST_SHAPES.map(function(s){return '<button type="button" class="gld-icon-btn-pick'+(curShape===s?' selected':'')+'" data-shape="'+s+'" style="font-size:.7rem;font-weight:800;color:#555;padding:4px;">'+CREST_SHAPE_NAMES[s]+'</button>';}).join('');

    o.innerHTML='<div class="gld-modal wide"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">Редактирование гильдии</h2>'+
        '<div class="gld-field"><label>Название</label><input id="ge-name" maxlength="30" value="'+escAttr(g.name)+'"></div>'+
        '<div class="gld-field"><label>Девиз</label><input id="ge-motto" maxlength="60" value="'+escAttr(g.motto||'')+'"></div>'+
        '<div class="gld-field"><label>Описание</label><textarea id="ge-desc" maxlength="300">'+esc(g.description||'')+'</textarea></div>'+
        '<div class="gld-field"><label>Герб</label><div class="gld-icon-picker" id="ge-icons">'+iconHtml+'</div></div>'+
        '<div class="gld-field"><label>Форма герба</label><div class="gld-icon-picker" id="ge-shapes">'+shapeHtml+'</div></div>'+
        '<div class="gld-field"><label>Флаг (цвет темы)</label><div class="gld-icon-picker" id="ge-flags">'+flagHtml+'</div></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="ge-save">Сохранить</button></div></div>';
    document.body.appendChild(o);

    o.querySelectorAll('#ge-icons .gld-icon-btn-pick').forEach(function(b){b.onclick=function(){o.querySelectorAll('#ge-icons .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('#ge-shapes .gld-icon-btn-pick').forEach(function(b){b.onclick=function(){o.querySelectorAll('#ge-shapes .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('#ge-flags .gld-icon-btn-pick').forEach(function(b){b.onclick=function(){o.querySelectorAll('#ge-flags .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});

    o.querySelector('#ge-save').onclick=async function(){
        var iconEl=o.querySelector('#ge-icons .selected')||o.querySelector('#ge-icons .gld-icon-btn-pick');
        var shapeEl=o.querySelector('#ge-shapes .selected')||o.querySelector('#ge-shapes .gld-icon-btn-pick');
        var flagEl=o.querySelector('#ge-flags .selected')||o.querySelector('#ge-flags .gld-icon-btn-pick');
        var kName=flagEl.dataset.flag;
        var upd={
            name:o.querySelector('#ge-name').value.trim(),
            motto:o.querySelector('#ge-motto').value.trim(),
            description:o.querySelector('#ge-desc').value.trim(),
            icon:iconEl.dataset.icon,
            crest_shape:shapeEl.dataset.shape,
            color:KINGDOMS[kName].color,
            flag:KINGDOMS[kName].flag,
            kingdom:kName
        };
        var r=await client.from('guilds').update(upd).eq('id',currentGuildId);
        if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
        toast('Сохранено','success');o.remove();await loadData();render();
    };
};

/* ═══ QUESTS ═══ */
window.gldCreateQuest=function(){
    if(myRank<4){toast('Только R4+','error');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">Новое задание</h2>'+
        '<div class="gld-field"><label>Название</label><input id="q-title" maxlength="60"></div>'+
        '<div class="gld-field"><label>Описание</label><textarea id="q-desc" maxlength="300"></textarea></div>'+
        '<div class="gld-field"><label>Цель (число)</label><input id="q-goal" type="number" value="100" min="1"></div>'+
        '<div class="gld-field"><label>Награда XP</label><input id="q-xp" type="number" value="50" min="0"></div>'+
        '<div class="gld-field"><label>Награда талантов</label><input id="q-tal" type="number" value="25" min="0"></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="q-save">Создать</button></div></div>';
    document.body.appendChild(o);
    o.querySelector('#q-save').onclick=async function(){
        var title=o.querySelector('#q-title').value.trim();if(!title){toast('Введите название','error');return;}
        var r=await client.from('guild_quests').insert([{
            guild_id:currentGuildId,title:title,
            description:o.querySelector('#q-desc').value.trim(),
            goal:parseInt(o.querySelector('#q-goal').value,10)||100,
            reward_xp:parseInt(o.querySelector('#q-xp').value,10)||0,
            reward_talents:parseInt(o.querySelector('#q-tal').value,10)||0,
            created_by:currentUser.id
        }]);
        if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
        toast('Создано','success');o.remove();render();
    };
};
window.gldCompleteQuest=async function(questId){
    try{
        var r=await client.rpc('guild_quest_complete',{p_quest_id:questId});
        if(r.error)throw r.error;
        var d=r.data||{};
        if(!d.ok){toast(d.error||'Ошибка','error');return;}
        toast('Задание выполнено! +'+d.xp+' XP'+(d.talents?', +'+d.talents+' талантов':''),'success');
        render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};
window.gldWriteMessage=async function(){
    if(myRank<4){toast('Только R4+','error');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">Письмо всем</h2>'+
        '<div class="gld-field"><label>Тема</label><input id="l-subj" maxlength="80"></div>'+
        '<div class="gld-field"><label>Текст</label><textarea id="l-body" maxlength="2000" style="min-height:140px;"></textarea></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="l-send">Отправить</button></div></div>';
    document.body.appendChild(o);
    o.querySelector('#l-send').onclick=async function(){
        var subj=o.querySelector('#l-subj').value.trim(),body=o.querySelector('#l-body').value.trim();
        if(!subj||!body){toast('Заполните','error');return;}
        var r=await client.from('guild_letters').insert([{guild_id:currentGuildId,author_id:currentUser.id,subject:subj,body:body}]);
        if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
        toast('Отправлено!','success');o.remove();render();
    };
};

/* ═══ MEMBER RANK ═══ */
async function changeRank(userId,newRank,newSubtitle){
    if(myRank<4){toast('Недостаточно прав','error');return false;}
    if(myRank===4&&newRank>3){toast('R4 до R3','error');return false;}
    if(userId===currentUser.id){toast('Себе нельзя','error');return false;}
    var target=(membersMap[myGuildId]||[]).filter(function(m){return m.user_id===userId;})[0];
    if(!target||target.rank>=5)return false;
    var upd={rank:newRank};
    if(newRank===4&&newSubtitle)upd.subtitle=newSubtitle;else upd.subtitle=null;
    var r=await client.from('guild_members').update(upd).eq('guild_id',myGuildId).eq('user_id',userId);
    if(r.error){toast('Ошибка','error');return false;}
    toast('Ранг обновлён','success');
    await loadData();render();return true;
}
function openEditMember(userId,rank,subtitle){
    var p=profilesMap[userId]||{};var name=p.display_name||p.username||'Аноним';
    var o=document.createElement('div');o.className='gld-modal-bg';
    var maxRank=myRank===5?4:3;
    var rankOpts='';
    [1,2,3,4].forEach(function(r){rankOpts+='<button type="button" class="gld-rank-option '+(r===rank?'selected':'')+'" data-rank="'+r+'" '+(r>maxRank?'disabled':'')+'><span class="rank-badge '+RANKS[r].class+'">'+(r===4?'🛡️':'R'+r)+'</span><span>'+RANKS[r].label+'</span></button>';});
    var subOpts=SUBTITLES.map(function(s){return '<button type="button" class="gld-icon-btn-pick '+(subtitle===s.id?'selected':'')+'" data-sub="'+s.id+'">'+s.icon+'</button>';}).join('');
    o.innerHTML='<div class="gld-modal"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">'+esc(name)+'</h2>'+
        '<div class="gld-field"><label>Ранг</label><div class="gld-rank-picker">'+rankOpts+'</div></div>'+
        '<div class="gld-field" id="sub-wrap" style="'+(rank===4?'':'display:none;')+'"><label>Подтитул</label><div class="gld-icon-picker" id="subs">'+subOpts+'</div></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="save">Сохранить</button></div></div>';
    document.body.appendChild(o);
    var selRank=rank,selSub=subtitle||null;
    o.querySelectorAll('.gld-rank-option:not([disabled])').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-rank-option').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');selRank=parseInt(b.dataset.rank,10);o.querySelector('#sub-wrap').style.display=selRank===4?'':'none';};});
    o.querySelectorAll('#subs .gld-icon-btn-pick').forEach(function(b){b.onclick=function(){o.querySelectorAll('#subs .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');selSub=b.dataset.sub;};});
    o.querySelector('#save').onclick=async function(){var ok=await changeRank(userId,selRank,selRank===4?selSub:null);if(ok)o.remove();};
}

/* ═══ PROFILE ═══ */
async function showMemberProfile(userId){
    var p=profilesMap[userId];
    if(!p){var r=await client.from('profiles').select('user_id,username,display_name,avatar_url,experience,level,kingdom,bio').eq('user_id',userId).single();if(r&&r.data){p=r.data;profilesMap[userId]=p;}}
    if(!p){toast('Профиль недоступен','error');return;}
    var name=p.display_name||p.username||'Аноним';
    var av=p.avatar_url||avatarFor(name);
    var level=getLevel(p.experience||0);
    var kingdom=KINGDOMS[p.kingdom];var flag=kingdom?kingdom.flag:null;
    var isMe=userId===currentUser.id;
    var mem=(membersMap[currentGuildId]||[]).filter(function(x){return x.user_id===userId;})[0];
    var rankInfo=mem?RANKS[mem.rank]||RANKS[1]:RANKS[1];
    var sub=null;if(mem&&mem.rank===4&&mem.subtitle){sub=SUBTITLES.filter(function(s){return s.id===mem.subtitle;})[0];}
    var canManage=myRank>=4&&(!mem||mem.rank<5)&&!isMe;
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal wide"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<div style="text-align:center;padding:16px 0 20px;">'+
        '<img src="'+escAttr(av)+'" style="width:110px;height:110px;border-radius:50%;border:4px solid var(--gk);object-fit:cover;margin-bottom:12px;box-shadow:0 12px 32px rgba(0,0,0,.2);" onerror="this.onerror=null;this.src=\''+avatarFor(name)+'\'">'+
        '<h2 style="margin:0 0 6px;font-size:1.4rem;">'+esc(name)+'</h2>'+
        (flag?'<div style="font-size:.82rem;color:#888;margin-bottom:8px;"><img src="'+flag+'" style="width:18px;border-radius:2px;vertical-align:middle;"> '+esc(p.kingdom)+'</div>':'')+
        '<div style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(108,99,255,.1);border-radius:16px;font-weight:800;color:var(--gk);font-size:.85rem;margin-bottom:8px;">'+rankInfo.icon+' '+rankInfo.label+(sub?' · '+sub.icon+' '+sub.name:'')+'</div>'+
        '<div style="font-size:.9rem;color:#666;margin-top:4px;">Уровень '+level.level+' · '+(p.experience||0)+' XP</div>'+
        '</div>'+
        (p.bio?'<div style="background:#f8f9fb;padding:14px 16px;border-radius:12px;margin-bottom:16px;font-size:.88rem;color:#555;line-height:1.55;font-style:italic;">'+esc(p.bio)+'</div>':'')+
        '<div class="gld-modal-actions">'+
        (!isMe?'<button class="gld-btn primary" onclick="gldSendPrivate(\''+escAttr(userId)+'\')">Написать</button>':'')+
        (!isMe?'<button class="gld-btn secondary" onclick="gldAddFriend(\''+escAttr(userId)+'\')">В друзья</button>':'')+
        (canManage?'<button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove();gldEditMember(\''+escAttr(userId)+'\','+(mem?mem.rank:1)+',\''+escAttr((mem&&mem.subtitle)||'')+'\')">Ранг</button>':'')+
        '</div></div>';
    document.body.appendChild(o);
}
window.gldSendPrivate=function(userId){showPrivateChatModal(userId);};
async function showPrivateChatModal(userId){
    var p=profilesMap[userId]||{};var name=p.display_name||p.username||'Аноним';
    var r=await client.from('private_messages').select('*').or('and(from_user.eq.'+currentUser.id+',to_user.eq.'+userId+'),and(from_user.eq.'+userId+',to_user.eq.'+currentUser.id+')').order('created_at',{ascending:true}).limit(50);
    var msgs=(r&&r.data)||[];
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal wide"><button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">'+esc(name)+'</h2>'+
        '<div style="max-height:400px;overflow-y:auto;padding:12px;background:#f8f9fb;border-radius:12px;margin-bottom:14px;">'+(msgs.length?msgs.map(function(m){
            var isOwn=m.from_user===currentUser.id;
            return '<div style="display:flex;margin-bottom:10px;'+(isOwn?'justify-content:flex-end;':'')+'"><div><div style="max-width:280px;padding:10px 14px;border-radius:14px;'+(isOwn?'background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;':'background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.05);')+'font-size:.88rem;line-height:1.4;">'+esc(m.message)+'</div></div></div>';
        }).join(''):'<p style="text-align:center;color:#999;">Начните диалог</p>')+'</div>'+
        '<div class="gld-chat-input" style="padding:0;border:none;background:transparent;"><input type="text" id="pm-input" placeholder="Сообщение..." style="flex:1;padding:12px 18px;border-radius:24px;border:2px solid rgba(0,0,0,.08);" onkeypress="if(event.key===\'Enter\')gldSendPM(\''+escAttr(userId)+'\')">'+
        '<button onclick="gldSendPM(\''+escAttr(userId)+'\')" style="padding:12px 22px;background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;border:none;border-radius:24px;cursor:pointer;font-weight:800;font-family:inherit;">Отпр.</button></div></div>';
    document.body.appendChild(o);
}
window.gldSendPM=async function(userId){
    var input=document.getElementById('pm-input');if(!input)return;
    var msg=input.value.trim();if(!msg)return;
    var r=await client.from('private_messages').insert([{from_user:currentUser.id,to_user:userId,message:msg}]);
    if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
    input.value='';
    document.querySelector('.gld-modal-bg').remove();
    showPrivateChatModal(userId);
};
window.gldAddFriend=async function(userId){
    try{
        var ex=await client.from('friendships').select('id,status').or('and(user_id.eq.'+currentUser.id+',friend_id.eq.'+userId+'),and(user_id.eq.'+userId+',friend_id.eq.'+currentUser.id+')').maybeSingle();
        if(ex&&ex.data){toast(ex.data.status==='accepted'?'Уже друзья':'Заявка уже есть','info');return;}
        var r=await client.from('friendships').insert([{user_id:currentUser.id,friend_id:userId,status:'pending'}]);
        if(r.error){toast('Ошибка','error');return;}
        toast('Заявка отправлена!','success');
        var bg=document.querySelector('.gld-modal-bg');if(bg)bg.remove();
    }catch(e){toast('Ошибка','error');}
};

/* ═══ GLOBAL ═══ */
window.gldCreate=openCreateModal;
window.gldJoin=joinGuild;
window.gldLeave=leaveGuild;
window.gldFilter=function(f){activeFilter=f;render();};
window.gldBack=function(){if(chatInterval){clearInterval(chatInterval);chatInterval=null;}currentView='list';currentGuildId=null;currentTab='members';render();};
window.gldOpenMine=function(){if(myGuildId)window.gldOpenGuild(myGuildId);};
window.gldOpenGuild=function(id){currentGuildId=id;currentView='detail';currentTab='members';render();};
window.gldTab=function(t){currentTab=t;render();};
window.gldEditMember=openEditMember;
window.gldShowProfile=showMemberProfile;
window.gldSendChat=sendChat;
window.gldSetSort=function(s){sortBy=s;render();};
window.gldScrollTo=function(id){
    var el=document.querySelector('[data-msg-id="'+id+'"]');
    if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.style.transition='background 0.5s';el.style.background='rgba(108,99,255,.15)';setTimeout(function(){el.style.background='';},1500);}
};
window.gldDelete=async function(){
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];if(!g||g.leader_id!==currentUser.id)return;
    if(!confirm('Удалить гильдию?'))return;
    await client.from('guilds').delete().eq('id',currentGuildId);
    myGuildId=null;currentGuildId=null;currentView='list';
    if(chatInterval)clearInterval(chatInterval);
    await loadData();render();
};
var searchTimer;
window.gldSearch=function(v){clearTimeout(searchTimer);searchTimer=setTimeout(function(){searchQuery=v;render();},200);};

function render(){
    if(currentView==='detail'){renderGuildDetail();if(currentTab==='chat'){startChatPolling();updateChatUI();}else if(chatInterval){clearInterval(chatInterval);chatInterval=null;}}
    else{renderList();if(chatInterval){clearInterval(chatInterval);chatInterval=null;}}
}
async function init(){await loadData();render();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
</script>
