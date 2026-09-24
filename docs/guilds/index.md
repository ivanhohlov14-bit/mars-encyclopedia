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
:root{--gk:#6C63FF;--gk-l:#A29BFE;--gk-s:rgba(108,99,255,.25)}
@keyframes gldSpin{to{transform:rotate(360deg)}}
@keyframes gldFade{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes gldFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes gldShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes gldRise{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes gldCrown{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-4px) rotate(3deg)}}
@keyframes gldPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes gldCoinSpin{0%{transform:rotateY(0)}100%{transform:rotateY(360deg)}}

#gld-app{max-width:1100px;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px 60px}
#gld-app a{text-decoration:none!important;border-bottom:none!important}
.gld-fade{animation:gldFade .5s cubic-bezier(.16,1,.3,1) both}

/* HERO — с залом совета */
.gld-hero{position:relative;background:linear-gradient(135deg,rgba(20,15,35,.85),rgba(45,27,61,.75)),url('/assets/images/guild-hall.jpg') center/cover;border-radius:24px;padding:60px 32px;color:#fff;margin-bottom:24px;overflow:hidden;box-shadow:0 24px 60px -16px rgba(0,0,0,.5);min-height:280px;display:flex;align-items:center;justify-content:center;text-align:center}
.gld-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(108,99,255,.15),transparent 70%);pointer-events:none}
.gld-hero-content{position:relative;z-index:2}
.gld-hero-crest{display:inline-flex;align-items:center;justify-content:center;width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,var(--gk),var(--gk-l));font-size:3.5rem;margin-bottom:16px;box-shadow:0 20px 50px -10px var(--gk-s),0 0 0 6px rgba(255,255,255,.08);border:3px solid rgba(255,255,255,.2);animation:gldFloat 4s ease-in-out infinite}
.gld-hero-title{font-size:2.2rem;font-weight:800;margin:0 0 8px 0;letter-spacing:-.5px;text-shadow:0 4px 20px rgba(0,0,0,.7)}
.gld-hero-title span{background:linear-gradient(90deg,#fff,#f5d76e,#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gldShine 3s linear infinite}
.gld-hero-sub{font-size:1rem;opacity:.9;margin:0 0 20px 0;text-shadow:0 2px 8px rgba(0,0,0,.6)}
.gld-hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.gld-hero-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border-radius:30px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.15);color:#fff;font-weight:700;font-size:.9rem;cursor:pointer;transition:all .3s cubic-bezier(.16,1,.3,1);backdrop-filter:blur(10px);font-family:inherit}
.gld-hero-btn:hover{background:rgba(255,255,255,.3);transform:translateY(-3px)}
.gld-hero-btn.primary{background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;border-color:transparent;box-shadow:0 8px 24px -6px rgba(243,156,18,.6)}

/* СТАТИСТИКА */
.gld-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:24px}
.gld-stat{background:#fff;padding:18px 14px;border-radius:16px;text-align:center;border:2px solid transparent;box-shadow:0 4px 12px rgba(0,0,0,.05);transition:all .3s cubic-bezier(.16,1,.3,1)}
.gld-stat:hover{transform:translateY(-6px);border-color:var(--gk);box-shadow:0 16px 40px -8px var(--gk-s)}
.gld-stat-icon{font-size:1.8rem;margin-bottom:8px}
.gld-stat-value{font-size:2rem;font-weight:900;line-height:1;background:linear-gradient(135deg,var(--gk),var(--gk-l));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gld-stat-label{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;margin-top:6px;font-weight:700}

/* FILTERS */
.gld-filters{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:20px;padding:12px 16px;background:#fff;border-radius:14px;border:1px solid rgba(0,0,0,.05);box-shadow:0 4px 12px rgba(0,0,0,.04)}
.gld-filter-btn{padding:8px 18px;border-radius:30px;border:2px solid transparent;background:rgba(0,0,0,.03);color:#666;font-size:.85rem;font-weight:700;cursor:pointer;transition:all .25s;font-family:inherit}
.gld-filter-btn.active{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff}
.gld-search{flex:1;min-width:200px;padding:10px 18px;border-radius:30px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fafafa}
.gld-search:focus{border-color:var(--gk);background:#fff}

/* GRID */
.gld-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px;margin-bottom:40px}
.gld-card{position:relative;background:#fff;border-radius:20px;border:2px solid rgba(0,0,0,.05);transition:all .4s cubic-bezier(.16,1,.3,1);overflow:hidden;animation:gldRise .5s ease both;display:flex;flex-direction:column}
.gld-card::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:var(--guild-color,var(--gk))}
.gld-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px -12px var(--gk-s);border-color:var(--gk)}
.gld-card-header{display:flex;align-items:center;gap:14px;padding:22px 22px 12px}
.gld-card-icon{width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--guild-color,#6C63FF),rgba(108,99,255,.6));display:flex;align-items:center;justify-content:center;font-size:2.2rem;color:#fff;flex-shrink:0;box-shadow:0 8px 20px -4px rgba(0,0,0,.2);transition:transform .3s}
.gld-card:hover .gld-card-icon{transform:scale(1.1) rotate(-6deg)}
.gld-card-info{flex:1;min-width:0}
.gld-card-name{font-size:1.15rem;font-weight:800;color:#1a1a1a;margin:0 0 4px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gld-card-leader{font-size:.78rem;color:#888}
.gld-card-desc{font-size:.85rem;color:#666;line-height:1.5;margin:0 22px 16px;min-height:40px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.gld-card-footer{margin:auto 22px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:14px;border-top:1px dashed rgba(0,0,0,.08)}
.gld-card-members{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;font-weight:700;color:var(--gk)}
.gld-card-status{padding:5px 12px;border-radius:20px;font-size:.72rem;font-weight:800;text-transform:uppercase}
.gld-card-status.my{background:linear-gradient(135deg,#27ae60,#16a085);color:#fff}
.gld-card-status.open{background:rgba(0,0,0,.06);color:#666}
.gld-card-status.full{background:rgba(231,76,60,.1);color:#c0392b}
.gld-card-actions{display:flex;gap:8px;padding:0 22px 20px}

/* RANKS */
.rank-badge{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;flex-shrink:0;font-size:.72rem;font-weight:900;position:relative}
.rank-r5{background:linear-gradient(135deg,#f5d76e,#f39c12,#e67e22);color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4);border-radius:50%;box-shadow:0 4px 12px rgba(243,156,18,.6),inset 0 2px 4px rgba(255,255,255,.4);font-size:1.1rem;animation:gldCrown 3s ease-in-out infinite}
.rank-r4{background:linear-gradient(135deg,#c9a4ff,#8e44ad);color:#fff;border-radius:50%;box-shadow:0 4px 12px rgba(142,68,173,.5);font-size:1rem}
.rank-r3{background:linear-gradient(135deg,#4a90e2,#2c5fa1);color:#fff;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);font-size:.68rem;letter-spacing:.5px}
.rank-r2{background:linear-gradient(135deg,#cd7f32,#8b5a2b);color:#fff;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);font-size:.65rem}
.rank-r1{background:linear-gradient(135deg,#27ae60,#16a085);color:#fff;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);font-size:.65rem}
.subtitle-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:.68rem;font-weight:800;background:rgba(108,99,255,.12);color:var(--gk);border:1px solid rgba(108,99,255,.3);cursor:help;margin-left:6px}

/* GUILD PAGE — с тронным залом */
.gld-page-hero{position:relative;background:linear-gradient(135deg,rgba(20,15,35,.85),rgba(45,27,61,.75)),url('/assets/images/guild-hall.jpg') center/cover;border-radius:24px;padding:40px;color:#fff;margin-bottom:24px;overflow:hidden;box-shadow:0 24px 60px -16px rgba(0,0,0,.5);min-height:240px}
.gld-page-content{position:relative;z-index:2;display:flex;gap:24px;align-items:center;flex-wrap:wrap}
.gld-page-crest{width:120px;height:140px;background:linear-gradient(135deg,var(--guild-color,#6C63FF),rgba(0,0,0,.3));border-radius:8px 8px 50% 50%;display:flex;align-items:center;justify-content:center;font-size:4rem;box-shadow:0 20px 40px -10px rgba(0,0,0,.5),inset 0 0 0 3px rgba(255,255,255,.15);flex-shrink:0;position:relative}
.gld-page-crest::before{content:'';position:absolute;top:-6px;left:-6px;right:-6px;bottom:-6px;border:2px dashed rgba(255,255,255,.25);border-radius:12px 12px 50% 50%;pointer-events:none}
.gld-page-info{flex:1;min-width:220px}
.gld-page-name{font-size:2rem;font-weight:800;margin:0 0 6px 0;text-shadow:0 4px 12px rgba(0,0,0,.6)}
.gld-page-motto{font-size:.95rem;font-style:italic;color:#f5d76e;margin:0 0 12px 0}
.gld-page-stats{display:flex;gap:18px;flex-wrap:wrap;font-size:.85rem;opacity:.95}
.gld-page-stats b{font-size:1.1rem;display:block;color:#fff}

/* MEMBERS LIST — с пиршественным залом */
.gld-members{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:20px}
.gld-members-banner{height:160px;background:url('/assets/images/guild-feast.jpg') center/cover;position:relative;overflow:hidden}
.gld-members-banner::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.6) 100%)}
.gld-members-banner-content{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px;color:#fff;z-index:2}
.gld-members-banner-icon{font-size:2rem;margin-right:10px;filter:drop-shadow(0 4px 12px rgba(0,0,0,.8))}
.gld-members-banner-title{font-size:1rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,.8)}
.gld-members-list{padding:16px 20px}
.gld-member{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:rgba(0,0,0,.02);margin-bottom:8px;transition:all .25s;cursor:pointer;border:1.5px solid transparent}
.gld-member:hover{background:rgba(108,99,255,.06);transform:translateX(4px);border-color:rgba(108,99,255,.2)}
.gld-member-avatar{width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid var(--gk);flex-shrink:0}
.gld-member-info{flex:1;min-width:0}
.gld-member-name{font-weight:800;color:#1a1a1a;font-size:.95rem;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.gld-member-meta{font-size:.75rem;color:#888;margin-top:2px}
.gld-member-actions{display:flex;gap:6px;flex-shrink:0}
.gld-icon-btn{width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(0,0,0,.08);background:#fff;color:#666;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:.9rem;transition:all .2s;font-family:inherit;padding:0}
.gld-icon-btn:hover{transform:scale(1.1);border-color:var(--gk);color:var(--gk)}
.gld-icon-btn.danger:hover{border-color:#e74c3c;color:#e74c3c}

/* CHAT */
.gld-chat{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:20px;display:flex;flex-direction:column;max-height:600px}
.gld-chat-header{padding:16px 20px;background:linear-gradient(135deg,#2d1b3d,#1a1a2e);color:#fff;display:flex;align-items:center;gap:10px}
.gld-chat-header-icon{font-size:1.4rem}
.gld-chat-header-title{font-weight:800;font-size:1.05rem;letter-spacing:.5px;flex:1}
.gld-chat-header-count{font-size:.78rem;background:rgba(255,255,255,.15);padding:4px 10px;border-radius:12px}
.gld-chat-body{flex:1;overflow-y:auto;padding:16px 20px;background:linear-gradient(180deg,#fafbfd,#fff);min-height:300px;max-height:420px}
.gld-chat-empty{text-align:center;color:#999;padding:60px 20px;font-size:.9rem}
.gld-chat-msg{display:flex;gap:10px;margin-bottom:14px;animation:gldFade .3s ease both}
.gld-chat-msg.own{flex-direction:row-reverse}
.gld-chat-msg-avatar{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid var(--gk);flex-shrink:0}
.gld-chat-msg-content{max-width:75%;min-width:0}
.gld-chat-msg.own .gld-chat-msg-content{text-align:right}
.gld-chat-msg-head{font-size:.75rem;color:#888;margin-bottom:4px;display:flex;align-items:center;gap:6px}
.gld-chat-msg.own .gld-chat-msg-head{justify-content:flex-end}
.gld-chat-msg-author{font-weight:800;color:#333}
.gld-chat-msg-text{padding:10px 14px;border-radius:14px;background:#f0f0f5;color:#333;font-size:.88rem;line-height:1.45;word-wrap:break-word;display:inline-block;text-align:left}
.gld-chat-msg.own .gld-chat-msg-text{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;border-bottom-right-radius:4px}
.gld-chat-msg:not(.own) .gld-chat-msg-text{border-bottom-left-radius:4px}
.gld-chat-msg-time{font-size:.68rem;color:#bbb;margin-top:4px}
.gld-chat-input{display:flex;gap:8px;padding:12px 16px;border-top:1px solid rgba(0,0,0,.06);background:#fafafa}
.gld-chat-input input{flex:1;padding:12px 18px;border-radius:24px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fff;transition:all .2s}
.gld-chat-input input:focus{border-color:var(--gk);box-shadow:0 0 0 4px var(--gk-s)}
.gld-chat-input button{padding:12px 22px;background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;border:none;border-radius:24px;cursor:pointer;font-weight:800;font-family:inherit;font-size:.9rem;transition:all .2s}
.gld-chat-input button:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--gk-s)}
.gld-chat-input button:disabled{opacity:.5;cursor:not-allowed;transform:none}

/* TABS */
.gld-tabs{display:flex;gap:4px;margin-bottom:20px;padding:6px;background:#fff;border-radius:14px;border:1px solid rgba(0,0,0,.05);overflow-x:auto}
.gld-tab{flex-shrink:0;padding:10px 18px;border:none;background:transparent;color:#666;font-size:.88rem;font-weight:700;border-radius:10px;cursor:pointer;transition:all .25s;font-family:inherit;display:flex;align-items:center;gap:6px}
.gld-tab:hover{background:rgba(0,0,0,.04)}
.gld-tab.active{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;box-shadow:0 6px 16px -4px var(--gk-s)}

/* QUEST */
.gld-quest{background:#fff;border-radius:14px;padding:16px 18px;margin-bottom:10px;border-left:4px solid var(--gk);box-shadow:0 4px 12px rgba(0,0,0,.04)}
.gld-quest-title{font-weight:800;color:#1a1a1a;margin-bottom:6px;font-size:.95rem}
.gld-quest-desc{font-size:.82rem;color:#666;margin-bottom:10px;line-height:1.5}
.gld-quest-progress{height:8px;background:rgba(108,99,255,.1);border-radius:8px;overflow:hidden;margin-bottom:8px}
.gld-quest-progress-bar{height:100%;background:linear-gradient(90deg,var(--gk),var(--gk-l));transition:width 1s cubic-bezier(.16,1,.3,1)}
.gld-quest-meta{display:flex;justify-content:space-between;font-size:.75rem;color:#888}

/* MODAL */
.gld-modal-bg{position:fixed;inset:0;z-index:99999;background:rgba(10,10,26,.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:gldFade .3s ease;overflow-y:auto}
.gld-modal{background:#fff;max-width:520px;width:100%;border-radius:22px;padding:30px 28px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.5);animation:gldRise .4s cubic-bezier(.16,1,.3,1);max-height:92vh;overflow-y:auto}
.gld-modal-title{font-size:1.35rem;font-weight:800;color:#1a1a1a;margin:0 0 20px 0;display:flex;align-items:center;gap:10px}
.gld-modal-close{position:absolute;top:14px;right:16px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.05);border:none;font-size:1.1rem;cursor:pointer;color:#666;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:inherit}
.gld-modal-close:hover{background:rgba(0,0,0,.1);transform:rotate(90deg)}
.gld-field{margin-bottom:16px}
.gld-field label{display:block;font-size:.82rem;font-weight:800;color:#333;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}
.gld-field input,.gld-field textarea{width:100%;padding:12px 16px;border-radius:12px;border:2px solid rgba(0,0,0,.08);font-size:.92rem;font-family:inherit;outline:none;background:#fafafa;box-sizing:border-box;transition:all .2s}
.gld-field input:focus,.gld-field textarea:focus{border-color:var(--gk);background:#fff;box-shadow:0 0 0 4px var(--gk-s)}
.gld-field textarea{resize:vertical;min-height:80px}
.gld-icon-picker,.gld-color-picker{display:flex;gap:8px;flex-wrap:wrap}
.gld-icon-btn-pick{width:50px;height:50px;border-radius:12px;border:2px solid rgba(0,0,0,.08);background:#fafafa;font-size:1.5rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;font-family:inherit;overflow:hidden}
.gld-icon-btn-pick:hover{transform:scale(1.08)}
.gld-icon-btn-pick.selected{border-color:var(--gk);background:rgba(108,99,255,.1);transform:scale(1.1);box-shadow:0 4px 12px -2px var(--gk-s)}
.gld-icon-btn-pick img{width:100%;height:100%;object-fit:cover;border-radius:8px}
.gld-color-btn{width:40px;height:40px;border-radius:50%;border:3px solid transparent;cursor:pointer;transition:all .2s;padding:0}
.gld-color-btn.selected{border-color:#333;transform:scale(1.18);box-shadow:0 4px 12px rgba(0,0,0,.25)}
.gld-modal-actions{display:flex;gap:10px;margin-top:24px}
.gld-btn{flex:1;padding:14px;border-radius:12px;border:none;font-size:.95rem;font-weight:800;cursor:pointer;transition:all .25s;font-family:inherit}
.gld-btn.primary{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;box-shadow:0 8px 20px -4px var(--gk-s)}
.gld-btn.primary:hover{transform:translateY(-2px)}
.gld-btn.secondary{background:rgba(0,0,0,.05);color:#666}
.gld-btn.danger{background:#e74c3c;color:#fff}
.gld-rank-picker{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.gld-rank-option{padding:8px 14px;border-radius:14px;border:2px solid rgba(0,0,0,.08);background:#fafafa;cursor:pointer;font-family:inherit;font-size:.85rem;font-weight:800;display:inline-flex;align-items:center;gap:6px;transition:all .2s}
.gld-rank-option.selected{border-color:var(--gk);background:rgba(108,99,255,.1)}
.gld-rank-option:disabled{opacity:.4;cursor:not-allowed}

.gld-empty{text-align:center;padding:60px 20px;background:#fff;border-radius:20px;border:2px dashed rgba(108,99,255,.2)}
.gld-empty-icon{font-size:4rem;margin-bottom:12px;opacity:.5}
.gld-empty-title{font-size:1.1rem;font-weight:700;color:#666}

/* Dark */
html body.mars-stars-on .gld-stat,
html body.mars-stars-on .gld-card,
html body.mars-stars-on .gld-filters,
html body.mars-stars-on .gld-members,
html body.mars-stars-on .gld-chat,
html body.mars-stars-on .gld-quest,
html body.mars-stars-on .gld-tabs{background:#14142a;border-color:rgba(108,99,255,.3);color:#e0e0f0}
html body.mars-stars-on .gld-card-name,
html body.mars-stars-on .gld-quest-title,
html body.mars-stars-on .gld-member-name{color:#e0e0f0}
html body.mars-stars-on .gld-card-desc,
html body.mars-stars-on .gld-quest-desc{color:#aaa}
html body.mars-stars-on .gld-modal{background:#14142a}
html body.mars-stars-on .gld-modal-title{color:#e0e0f0}
html body.mars-stars-on .gld-field input,
html body.mars-stars-on .gld-field textarea{background:#1a1a30;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
html body.mars-stars-on .gld-chat-body{background:linear-gradient(180deg,#0f0f1e,#14142a)}
html body.mars-stars-on .gld-chat-msg-text{background:#252550;color:#e0e0f0}
html body.mars-stars-on .gld-chat-input{background:#1a1a30}
html body.mars-stars-on .gld-chat-input input{background:#252550;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
html body.mars-stars-on .gld-icon-btn{background:#252550;border-color:rgba(108,99,255,.3);color:#ccc}

@media (max-width:640px){
    .gld-hero{padding:32px 20px;min-height:220px;border-radius:20px}
    .gld-hero-crest{width:90px;height:90px;font-size:2.8rem}
    .gld-hero-title{font-size:1.6rem}
    .gld-grid{grid-template-columns:1fr}
    .gld-page-hero{padding:24px 20px}
    .gld-page-crest{width:90px;height:110px;font-size:3rem}
    .gld-page-name{font-size:1.5rem}
    .gld-chat-msg-content{max-width:85%}
    .gld-chat-input button{padding:12px 16px}
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

var KINGDOMS={
'Эдем':{color:'#F4A460',light:'#F7C98A',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eden.jpg'},
'Аркадия':{color:'#D4A574',light:'#E8C9A0',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/map/flag-of-arkadia.png'},
'Эридания':{color:'#F5D76E',light:'#FAE9A0',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eridania.png'},
'Кхонг':{color:'#A9A9A9',light:'#C8C8C8',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-khong.png'},
'Авсония':{color:'#87CEEB',light:'#B0D8EB',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-avsonia.png'},
'Кимерия':{color:'#B19CD9',light:'#D1C4E9',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-kimeria.png'},
'Серпентида':{color:'#E57373',light:'#F5A0A0',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-serpentida.png'},
'Эритрей':{color:'#64B5F6',light:'#90CAF9',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eritrea.png'},
'Утопия':{color:'#4DD0E1',light:'#80DEEA',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-utopia.png'},
'Эллада':{color:'#FF8A65',light:'#FFAB91',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-hellas.png'},
'Аливасото':{color:'#81C784',light:'#A5D6A7',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-alivasoto.png'},
'Ксанф':{color:'#3D3D3D',light:'#6B6B6B',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/coat-of-arms-of-ksanf.png'}
};

var RANKS={
5:{label:'Лидер',icon:'👑',class:'rank-r5'},
4:{label:'Советник',icon:'🛡️',class:'rank-r4'},
3:{label:'Офицер',icon:'⚔️',class:'rank-r3'},
2:{label:'Ветеран',icon:'🛡️',class:'rank-r2'},
1:{label:'Новичок',icon:'🌱',class:'rank-r1'}
};

var SUBTITLES=[
{id:'memory',icon:'📜',name:'Хранитель памяти',bonus:'+5% XP за чтение'},
{id:'blade',icon:'⚔️',name:'Мастер клинка',bonus:'+5% к дуэлям'},
{id:'guard',icon:'🛡️',name:'Страж границ',bonus:'+5% к защите'},
{id:'sage',icon:'🎓',name:'Мудрец',bonus:'+5% к знаниям'},
{id:'treasure',icon:'💎',name:'Хранитель сокровищ',bonus:'+5% талантов'}
];

var GUILD_ICONS=['🏰','⚔️','🛡️','👑','🔥','🌟','🌊','📜','🧠','🎵','🎨','⚙️','🔭','💎','🏆','🚀','🗡️','🐉','🦅','⚡'];
var GUILD_COLORS=['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63','#34495e','#e67e22','#f5d76e','#8e44ad'];

var container=document.getElementById('gld-app');
var client=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

var currentUser=null,profile=null,myKingdom=KINGDOMS['Кимерия'];
var guilds=[],myGuildId=null,myRank=1,mySubtitle=null;
var membersCount={},profilesMap={},membersMap={};
var activeFilter='all',searchQuery='';
var currentView='list',currentGuildId=null,currentTab='members';
var chatMessages=[],chatInterval=null,lastChatCount=0;

function esc(s){return String(s||'').replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
function escAttr(s){return String(s||'').replace(/['"\\<>]/g,function(m){return{"'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e'}[m];});}
function toast(msg,type){
    type=type||'info';
    var c={success:'linear-gradient(135deg,#27ae60,#16a085)',info:'linear-gradient(135deg,#3498db,#2980b9)',warning:'linear-gradient(135deg,#e67e22,#d35400)',error:'linear-gradient(135deg,#e74c3c,#c0392b)'};
    var t=document.createElement('div');
    t.style.cssText='position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:'+(c[type]||c.info)+';color:#fff;padding:12px 26px;border-radius:30px;font-weight:700;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:99999;transition:transform .4s cubic-bezier(.16,1,.3,1);pointer-events:none;max-width:90vw;';
    t.textContent=msg;document.body.appendChild(t);
    requestAnimationFrame(function(){t.style.transform='translateX(-50%) translateY(0)';});
    setTimeout(function(){t.style.transform='translateX(-50%) translateY(100px)';setTimeout(function(){t.remove();},400);},2400);
}
function avatarFor(name){return 'https://ui-avatars.com/api/?name='+encodeURIComponent(name||'?')+'&background=6C63FF&color=fff&size=64&rounded=true';}
function fmtTime(iso){var d=new Date(iso);var h=d.getHours(),m=d.getMinutes();return (h<10?'0':'')+h+':'+(m<10?'0':'')+m;}

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
        var pRes=await client.from('profiles').select('user_id,username,display_name,avatar_url').in('user_id',ids);
        profilesMap={};
        (pRes&&pRes.data||[]).forEach(function(p){profilesMap[p.user_id]=p;});
    }
}

async function createGuild(name,desc,icon,color,flag,motto){
    if(!currentUser){toast('Войдите','warning');return;}
    if(myGuildId){toast('Вы уже в гильдии','warning');return;}
    if(!name||name.length<3||name.length>30){toast('Имя: 3-30 символов','warning');return;}
    var ex=await client.from('guilds').select('id').eq('name',name).maybeSingle();
    if(ex&&ex.data){toast('Такая гильдия уже есть','error');return;}
    var res=await client.from('guilds').insert([{name:name,description:desc,icon:icon,color:color,flag:flag,motto:motto,leader_id:currentUser.id}]).select().single();
    if(res.error){toast('Ошибка: '+res.error.message,'error');return;}
    await client.from('guild_members').insert([{guild_id:res.data.id,user_id:currentUser.id,rank:5,role:'leader'}]);
    toast('🏰 Гильдия «'+name+'» создана!','success');
    await loadData();currentView='list';render();
}

async function joinGuild(id){
    if(!currentUser){toast('Войдите','warning');return;}
    if(myGuildId){toast('Сначала покиньте текущую','warning');return;}
    var g=guilds.filter(function(x){return x.id===id;})[0];if(!g)return;
    if((membersCount[id]||0)>=(g.member_limit||50)){toast('Гильдия заполнена','warning');return;}
    var r=await client.from('guild_members').insert([{guild_id:id,user_id:currentUser.id,rank:1,role:'member'}]);
    if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
    toast('✅ Вы вступили!','success');await loadData();currentView='list';render();
}

async function leaveGuild(){
    if(!currentUser||!myGuildId)return;
    var g=guilds.filter(function(x){return x.id===myGuildId;})[0];if(!g)return;
    if(g.leader_id===currentUser.id){
        if(!confirm('Вы лидер. Покинуть = УДАЛИТЬ гильдию?'))return;
        await client.from('guilds').delete().eq('id',myGuildId);
        toast('Гильдия удалена','info');
    }else{
        if(!confirm('Покинуть «'+g.name+'»?'))return;
        await client.from('guild_members').delete().eq('guild_id',myGuildId).eq('user_id',currentUser.id);
        toast('Вы покинули гильдию','info');
    }
    myGuildId=null;myRank=1;mySubtitle=null;
    if(chatInterval){clearInterval(chatInterval);chatInterval=null;}
    await loadData();currentView='list';render();
}

async function changeRank(userId,newRank,newSubtitle){
    if(!currentUser||!myGuildId)return;
    if(myRank<4){toast('Недостаточно прав','error');return;}
    if(myRank===4&&newRank>3){toast('R4 может повысить только до R3','error');return;}
    if(userId===currentUser.id){toast('Себе ранг менять нельзя','error');return;}
    var target=(membersMap[myGuildId]||[]).filter(function(m){return m.user_id===userId;})[0];
    if(!target)return;
    if(target.rank>=5){toast('Лидера изменить нельзя','error');return;}
    var upd={rank:newRank};
    if(newSubtitle!==undefined)upd.subtitle=newSubtitle;
    if(newRank!==4)upd.subtitle=null;
    var r=await client.from('guild_members').update(upd).eq('guild_id',myGuildId).eq('user_id',userId);
    if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
    toast('✅ Ранг обновлён','success');await loadData();render();
}

/* ═══ CHAT ═══ */
async function loadChat(){
    if(!currentGuildId)return;
    var r=await client.from('guild_chat')
        .select('id,user_id,message,created_at')
        .eq('guild_id',currentGuildId)
        .order('created_at',{ascending:true})
        .limit(100);
    chatMessages=(r&&r.data)||[];
    // Подгружаем профили
    var ids={};
    chatMessages.forEach(function(m){if(!profilesMap[m.user_id])ids[m.user_id]=true;});
    var idArr=Object.keys(ids);
    if(idArr.length){
        var p=await client.from('profiles').select('user_id,username,display_name,avatar_url').in('user_id',idArr);
        (p&&p.data||[]).forEach(function(x){profilesMap[x.user_id]=x;});
    }
}

function renderChatBody(){
    if(!chatMessages.length)return '<div class="gld-chat-empty">💬 Пока нет сообщений<br>Будьте первым!</div>';
    return chatMessages.map(function(m){
        var p=profilesMap[m.user_id]||{};
        var name=p.display_name||p.username||'Аноним';
        var av=p.avatar_url||avatarFor(name);
        var isOwn=m.user_id===currentUser.id;
        var mem=(membersMap[currentGuildId]||[]).filter(function(x){return x.user_id===m.user_id;})[0];
        var rank=mem?RANKS[mem.rank]||RANKS[1]:RANKS[1];
        var rankBadge='<span class="rank-badge '+rank.class+'" style="width:20px;height:20px;font-size:.62rem;">'+(mem&&mem.rank===5?'👑':(mem&&mem.rank===4?'🛡️':'R'+(mem?mem.rank:1)))+'</span>';
        return '<div class="gld-chat-msg'+(isOwn?' own':'')+'">'+
            '<img src="'+escAttr(av)+'" class="gld-chat-msg-avatar" onerror="this.onerror=null;this.src=\''+avatarFor(name)+'\';">'+
            '<div class="gld-chat-msg-content">'+
                '<div class="gld-chat-msg-head">'+rankBadge+'<span class="gld-chat-msg-author">'+esc(name)+'</span></div>'+
                '<div class="gld-chat-msg-text">'+esc(m.message).replace(/\n/g,'<br>')+'</div>'+
                '<div class="gld-chat-msg-time">'+fmtTime(m.created_at)+'</div>'+
            '</div>'+
        '</div>';
    }).join('');
}

async function sendChat(){
    var input=document.getElementById('gld-chat-input');
    if(!input||!currentUser||!currentGuildId)return;
    var msg=input.value.trim();
    if(!msg)return;
    if(msg.length>1000){toast('Слишком длинное','error');return;}
    input.disabled=true;
    var r=await client.from('guild_chat').insert([{guild_id:currentGuildId,user_id:currentUser.id,message:msg}]);
    input.disabled=false;
    if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
    input.value='';
    await loadChat();
    updateChatUI();
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
    if(chatInterval){clearInterval(chatInterval);chatInterval=null;}
    chatInterval=setInterval(async function(){
        if(currentView!=='detail'||currentTab!=='chat')return;
        var before=chatMessages.length;
        await loadChat();
        if(chatMessages.length!==before)updateChatUI();
    },4000);
}

/* ═══ RENDER LIST ═══ */
function renderList(){
    document.documentElement.style.setProperty('--gk',myKingdom.color);
    document.documentElement.style.setProperty('--gk-l',myKingdom.light);
    document.documentElement.style.setProperty('--gk-s',myKingdom.color+'40');

    var total=Object.values(membersCount).reduce(function(a,b){return a+b;},0);
    var filtered=guilds.slice();
    if(activeFilter==='my'&&myGuildId)filtered=filtered.filter(function(g){return g.id===myGuildId;});
    if(searchQuery){
        var q=searchQuery.toLowerCase();
        filtered=filtered.filter(function(g){return (g.name||'').toLowerCase().indexOf(q)!==-1||(g.description||'').toLowerCase().indexOf(q)!==-1;});
    }
    filtered.sort(function(a,b){return (membersCount[b.id]||0)-(membersCount[a.id]||0);});

    container.innerHTML=
    '<div class="gld-hero gld-fade"><div class="gld-hero-content">'+
        '<div class="gld-hero-crest">🏰</div>'+
        '<h1 class="gld-hero-title"><span>Гильдии Марса</span></h1>'+
        '<p class="gld-hero-sub">'+(currentUser?'Объединяйтесь с другими исследователями!':'Войдите, чтобы создавать и вступать')+'</p>'+
        '<div class="gld-hero-actions">'+
            (currentUser&&!myGuildId?'<button class="gld-hero-btn primary" onclick="gldCreate()">➕ Создать гильдию</button>':'')+
            (currentUser&&myGuildId?'<button class="gld-hero-btn primary" onclick="gldOpenMine()">🏰 Моя гильдия</button>':'')+
            (!currentUser?'<a href="/login/" class="gld-hero-btn primary">🔐 Войти</a>':'')+
        '</div>'+
    '</div></div>'+
    '<div class="gld-stats-grid gld-fade" style="animation-delay:.1s;">'+
        '<div class="gld-stat"><div class="gld-stat-icon">🏰</div><div class="gld-stat-value">'+guilds.length+'</div><div class="gld-stat-label">Гильдий</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">👥</div><div class="gld-stat-value">'+total+'</div><div class="gld-stat-label">Участников</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">⭐</div><div class="gld-stat-value">'+(myGuildId?'1':'0')+'</div><div class="gld-stat-label">Моя</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">📊</div><div class="gld-stat-value">'+(guilds.length?Math.round(total/guilds.length):0)+'</div><div class="gld-stat-label">Средний</div></div>'+
    '</div>'+
    '<div class="gld-filters gld-fade" style="animation-delay:.15s;">'+
        '<button class="gld-filter-btn '+(activeFilter==='all'?'active':'')+'" onclick="gldFilter(\'all\')">🌐 Все</button>'+
        (currentUser&&myGuildId?'<button class="gld-filter-btn '+(activeFilter==='my'?'active':'')+'" onclick="gldFilter(\'my\')">🏰 Моя</button>':'')+
        '<input class="gld-search" type="text" placeholder="🔍 Поиск..." value="'+escAttr(searchQuery)+'" oninput="gldSearch(this.value)">'+
    '</div>'+
    (filtered.length===0?
        '<div class="gld-empty"><div class="gld-empty-icon">🏰</div><div class="gld-empty-title">'+(searchQuery?'Ничего не найдено':'Гильдий пока нет')+'</div>'+
        (currentUser&&!myGuildId&&!searchQuery?'<button class="gld-btn primary" style="max-width:200px;margin:20px auto 0;" onclick="gldCreate()">➕ Создать</button>':'')+'</div>'
        :
        '<div class="gld-grid">'+filtered.map(renderCard).join('')+'</div>'
    );
}

function renderCard(g,i){
    var l=profilesMap[g.leader_id]||{};
    var lName=l.display_name||l.username||'Аноним';
    var count=membersCount[g.id]||0;
    var limit=g.member_limit||50;
    var isMine=g.id===myGuildId;
    var isFull=count>=limit;
    var status=isMine?'<span class="gld-card-status my">🏰 Ваша</span>':(isFull?'<span class="gld-card-status full">🔒 Заполнена</span>':'<span class="gld-card-status open">✅ Открыта</span>');
    var action;
    if(!currentUser)action='<button class="gld-btn primary" onclick="location.href=\'/login/\'">🔐 Войти</button>';
    else if(isMine)action='<button class="gld-btn primary" onclick="gldOpenGuild('+g.id+')">🏰 Открыть</button>';
    else if(myGuildId)action='<button class="gld-btn secondary" disabled style="opacity:.5;cursor:not-allowed;">Вы в гильдии</button>';
    else if(isFull)action='<button class="gld-btn secondary" disabled style="opacity:.5;cursor:not-allowed;">🔒</button>';
    else action='<button class="gld-btn primary" onclick="gldJoin('+g.id+')">➕ Вступить</button>';
    return '<div class="gld-card gld-fade" style="--guild-color:'+(g.color||'#6C63FF')+';animation-delay:'+(i*.05)+'s;">'+
        '<div class="gld-card-header"><div class="gld-card-icon">'+(g.icon||'🏰')+'</div>'+
        '<div class="gld-card-info"><h3 class="gld-card-name">'+esc(g.name)+'</h3>'+
        '<div class="gld-card-leader">👑 '+esc(lName)+'</div></div></div>'+
        '<p class="gld-card-desc">'+esc(g.description||'Без описания')+'</p>'+
        '<div class="gld-card-footer"><span class="gld-card-members">👥 '+count+' / '+limit+'</span>'+status+'</div>'+
        '<div class="gld-card-actions">'+action+'</div></div>';
}

/* ═══ RENDER DETAIL ═══ */
async function renderGuildDetail(){
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];
    if(!g){currentView='list';render();return;}
    var members=(membersMap[g.id]||[]).slice();
    members.sort(function(a,b){return (b.rank||1)-(a.rank||1);});
    var isLeader=g.leader_id===currentUser.id;
    var canManage=myRank>=4||isLeader;

    if(currentTab==='chat')await loadChat();
    var qr=await client.from('guild_quests').select('*').eq('guild_id',g.id).eq('status','active').order('created_at',{ascending:false});
    var quests=(qr&&qr.data)||[];

    var tabs='<div class="gld-tabs">'+
        '<button class="gld-tab'+(currentTab==='members'?' active':'')+'" onclick="gldTab(\'members\')">👥 Участники ('+members.length+')</button>'+
        '<button class="gld-tab'+(currentTab==='chat'?' active':'')+'" onclick="gldTab(\'chat\')">💬 Чат</button>'+
        '<button class="gld-tab'+(currentTab==='quests'?' active':'')+'" onclick="gldTab(\'quests\')">🎯 Задания ('+quests.length+')</button>'+
    '</div>';

    var content='';
    if(currentTab==='members'){
        content='<div class="gld-members gld-fade">'+
            '<div class="gld-members-banner"><div class="gld-members-banner-content">'+
            '<div class="gld-members-banner-icon">🍖</div>'+
            '<div class="gld-members-banner-title">Пиршественный зал</div>'+
            '</div></div>'+
            '<div class="gld-members-list">'+members.map(function(m){return renderMember(m,g);}).join('')+'</div></div>';
    } else if(currentTab==='chat'){
        content='<div class="gld-chat gld-fade">'+
            '<div class="gld-chat-header">'+
                '<div class="gld-chat-header-icon">💬</div>'+
                '<div class="gld-chat-header-title">Чат гильдии</div>'+
                '<div class="gld-chat-header-count" id="gld-chat-count">'+chatMessages.length+' сообщ.</div>'+
            '</div>'+
            '<div class="gld-chat-body" id="gld-chat-body">'+renderChatBody()+'</div>'+
            '<div class="gld-chat-input">'+
                '<input type="text" id="gld-chat-input" placeholder="Написать сообщение..." maxlength="1000" onkeypress="if(event.key===\'Enter\')gldSendChat()">'+
                '<button onclick="gldSendChat()">Отправить</button>'+
            '</div>'+
        '</div>';
    } else if(currentTab==='quests'){
        content='<div class="gld-members gld-fade" style="padding:20px;">'+
            '<h3 style="margin:0 0 16px 0;font-size:1.2rem;font-weight:800;color:#1a1a1a;">🎯 Задания гильдии</h3>'+
            (quests.length?quests.map(renderQuest).join(''):'<p style="color:#888;text-align:center;padding:30px;">Активных заданий нет</p>')+
            (canManage?'<button class="gld-btn primary" style="margin-top:14px;" onclick="gldAddQuest()">➕ Добавить задание</button>':'')+
        '</div>';
    }

    container.innerHTML=
    '<button class="gld-btn secondary" onclick="gldBack()" style="max-width:180px;margin-bottom:16px;">← К списку</button>'+
    '<div class="gld-page-hero gld-fade" style="--guild-color:'+(g.color||'#6C63FF')+';">'+
        '<div class="gld-page-content">'+
            '<div class="gld-page-crest">'+(g.icon||'🏰')+'</div>'+
            '<div class="gld-page-info">'+
                '<h1 class="gld-page-name">'+esc(g.name)+'</h1>'+
                (g.motto?'<p class="gld-page-motto">«'+esc(g.motto)+'»</p>':'')+
                '<div class="gld-page-stats">'+
                    '<div><b>'+(membersCount[g.id]||0)+'</b>Участников</div>'+
                    '<div><b>'+(g.rating||0)+'</b>Рейтинг</div>'+
                    '<div><b style="display:inline-flex;align-items:center;gap:4px;"><img src="/assets/images/guild-coin.jpg" style="width:22px;height:22px;border-radius:50%;vertical-align:middle;">'+(g.bank||0)+'</b>Казна</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;">'+
        (canManage?'<button class="gld-btn primary" style="max-width:220px;" onclick="gldEditGuild()">✏️ Редактировать</button>':'')+
        (canManage?'<button class="gld-btn primary" style="max-width:220px;" onclick="gldWriteMessage()">✉️ Письмо всем</button>':'')+
        (!isLeader?'<button class="gld-btn secondary" style="max-width:180px;" onclick="gldLeave()">🚪 Выйти</button>':'')+
        (isLeader?'<button class="gld-btn danger" style="max-width:180px;" onclick="gldDelete()">🗑️ Удалить</button>':'')+
    '</div>'+
    tabs+
    content;
}

function renderMember(m,g){
    var p=profilesMap[m.user_id]||{};
    var name=p.display_name||p.username||'Аноним';
    var av=p.avatar_url||avatarFor(name);
    var rank=RANKS[m.rank]||RANKS[1];
    var isMe=m.user_id===currentUser.id;
    var canManage=(myRank>=4||g.leader_id===currentUser.id)&&m.rank<5&&!isMe;
    var sub=null;
    if(m.rank===4&&m.subtitle){sub=SUBTITLES.filter(function(s){return s.id===m.subtitle;})[0];}
    return '<div class="gld-member">'+
        '<div class="rank-badge '+rank.class+'" title="'+rank.label+'">'+(m.rank===5?'👑':(m.rank===4?'🛡️':'R'+m.rank))+'</div>'+
        '<img src="'+escAttr(av)+'" class="gld-member-avatar" onerror="this.onerror=null;this.src=\''+avatarFor(name)+'\';">'+
        '<div class="gld-member-info"><div class="gld-member-name">'+esc(name)+(isMe?' (вы)':'')+
            (sub?'<span class="subtitle-badge" title="'+sub.bonus+'">'+sub.icon+' '+sub.name+'</span>':'')+
        '</div><div class="gld-member-meta">'+rank.icon+' '+rank.label+'</div></div>'+
        (canManage?'<div class="gld-member-actions"><button class="gld-icon-btn" onclick="gldEditMember(\''+escAttr(m.user_id)+'\','+m.rank+',\''+escAttr(m.subtitle||'')+'\')" title="Изменить">⚙️</button></div>':'')+
    '</div>';
}

function renderQuest(q){
    var pct=q.goal>0?Math.min((q.progress/q.goal)*100,100):0;
    return '<div class="gld-quest"><div class="gld-quest-title">'+esc(q.title)+'</div>'+
        (q.description?'<div class="gld-quest-desc">'+esc(q.description)+'</div>':'')+
        '<div class="gld-quest-progress"><div class="gld-quest-progress-bar" style="width:'+pct+'%;"></div></div>'+
        '<div class="gld-quest-meta"><span>'+q.progress+' / '+q.goal+'</span><span>+'+(q.reward_xp||0)+' XP · +'+(q.reward_bank||0)+' 🪙</span></div></div>';
}

/* ═══ MODALS ═══ */
function openCreateModal(){
    if(!currentUser){toast('Войдите','warning');return;}
    if(myGuildId){toast('Вы уже в гильдии','warning');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">🏰 Создать гильдию</h2>'+
        '<div class="gld-field"><label>Название</label><input type="text" id="g-name" maxlength="30" placeholder="Хранители Марса"></div>'+
        '<div class="gld-field"><label>Девиз</label><input type="text" id="g-motto" maxlength="60" placeholder="Глина помнит"></div>'+
        '<div class="gld-field"><label>Описание</label><textarea id="g-desc" maxlength="300" placeholder="О чём ваша гильдия?"></textarea></div>'+
        '<div class="gld-field"><label>Иконка</label><div class="gld-icon-picker" id="g-icons">'+
            GUILD_ICONS.map(function(ic,i){return '<button type="button" class="gld-icon-btn-pick'+(i===0?' selected':'')+'" data-icon="'+ic+'">'+ic+'</button>';}).join('')+
        '</div></div>'+
        '<div class="gld-field"><label>Цвет</label><div class="gld-color-picker">'+
            GUILD_COLORS.map(function(c,i){return '<button type="button" class="gld-color-btn'+(i===0?' selected':'')+'" data-color="'+c+'" style="background:'+c+';"></button>';}).join('')+
        '</div></div>'+
        '<div class="gld-field"><label>Флаг</label><div class="gld-icon-picker" id="g-flags">'+
            Object.keys(KINGDOMS).map(function(k,i){return '<button type="button" class="gld-icon-btn-pick'+(i===0?' selected':'')+'" data-flag="'+k+'" style="padding:4px;" title="'+k+'"><img src="'+KINGDOMS[k].flag+'"></button>';}).join('')+
        '</div></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="g-create">🏰 Создать</button></div>'+
    '</div>';
    document.body.appendChild(o);
    o.querySelectorAll('.gld-icon-btn-pick[data-icon]').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-icon-btn-pick[data-icon]').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('.gld-color-btn').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-color-btn').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('.gld-icon-btn-pick[data-flag]').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-icon-btn-pick[data-flag]').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelector('#g-create').onclick=async function(){
        await createGuild(
            o.querySelector('#g-name').value.trim(),
            o.querySelector('#g-desc').value.trim(),
            o.querySelector('.gld-icon-btn-pick[data-icon].selected').dataset.icon,
            o.querySelector('.gld-color-btn.selected').dataset.color,
            KINGDOMS[o.querySelector('.gld-icon-btn-pick[data-flag].selected').dataset.flag].flag,
            o.querySelector('#g-motto').value.trim()
        );
        o.remove();
    };
}

function openEditMember(userId,rank,subtitle){
    var m=(membersMap[myGuildId]||[]).filter(function(x){return x.user_id===userId;})[0];if(!m)return;
    var p=profilesMap[userId]||{};var name=p.display_name||p.username||'Аноним';
    var o=document.createElement('div');o.className='gld-modal-bg';
    var maxRank=myRank===5?4:3;
    var rankOpts='';
    [1,2,3,4].forEach(function(r){
        var dis=r>maxRank?'disabled':'';
        rankOpts+='<button type="button" class="gld-rank-option '+(r===rank?'selected':'')+'" data-rank="'+r+'" '+dis+'>'+
            '<span class="rank-badge '+RANKS[r].class+'">'+(r===4?'🛡️':'R'+r)+'</span><span>'+RANKS[r].label+'</span></button>';
    });
    var subOpts=SUBTITLES.map(function(s){return '<button type="button" class="gld-icon-btn-pick '+(subtitle===s.id?'selected':'')+'" data-sub="'+s.id+'" title="'+s.bonus+'">'+s.icon+'</button>';}).join('');
    o.innerHTML='<div class="gld-modal">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">⚙️ '+esc(name)+'</h2>'+
        '<div class="gld-field"><label>Ранг</label><div class="gld-rank-picker">'+rankOpts+'</div></div>'+
        '<div class="gld-field" id="sub-wrap" style="'+(rank===4?'':'display:none;')+'"><label>Подтитул (R4)</label><div class="gld-icon-picker" id="subs">'+subOpts+'</div></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="save">💾 Сохранить</button></div>'+
    '</div>';
    document.body.appendChild(o);
    var selRank=rank,selSub=subtitle||null;
    o.querySelectorAll('.gld-rank-option:not([disabled])').forEach(function(b){
        b.onclick=function(){o.querySelectorAll('.gld-rank-option').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');
            selRank=parseInt(b.dataset.rank,10);o.querySelector('#sub-wrap').style.display=selRank===4?'':'none';};
    });
    o.querySelectorAll('#subs .gld-icon-btn-pick').forEach(function(b){
        b.onclick=function(){o.querySelectorAll('#subs .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');selSub=b.dataset.sub;};
    });
    o.querySelector('#save').onclick=async function(){await changeRank(userId,selRank,selRank===4?selSub:null);o.remove();};
}

/* ═══ EXPORTS ═══ */
window.gldCreate=openCreateModal;
window.gldJoin=joinGuild;
window.gldLeave=leaveGuild;
window.gldFilter=function(f){activeFilter=f;render();};
window.gldBack=function(){if(chatInterval){clearInterval(chatInterval);chatInterval=null;}currentView='list';currentGuildId=null;currentTab='members';render();};
window.gldOpenMine=function(){if(myGuildId)window.gldOpenGuild(myGuildId);};
window.gldOpenGuild=function(id){currentGuildId=id;currentView='detail';currentTab='members';render();};
window.gldTab=function(t){currentTab=t;render();};
window.gldEditMember=openEditMember;
window.gldSendChat=sendChat;
window.gldEditGuild=function(){toast('В разработке','info');};
window.gldWriteMessage=function(){toast('В разработке','info');};
window.gldAddQuest=function(){toast('В разработке','info');};
window.gldDelete=async function(){
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];if(!g)return;
    if(g.leader_id!==currentUser.id){toast('Только лидер','error');return;}
    if(!confirm('Удалить гильдию?'))return;
    await client.from('guilds').delete().eq('id',currentGuildId);
    toast('🗑️ Удалена','info');myGuildId=null;currentGuildId=null;currentView='list';
    if(chatInterval){clearInterval(chatInterval);chatInterval=null;}
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
