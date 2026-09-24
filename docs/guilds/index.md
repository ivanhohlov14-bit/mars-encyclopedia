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
@keyframes gldPop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}

#gld-app{max-width:1100px;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px 60px}
#gld-app a{text-decoration:none!important;border-bottom:none!important}
.gld-fade{animation:gldFade .5s cubic-bezier(.16,1,.3,1) both}

.gld-hero{position:relative;background:linear-gradient(135deg,rgba(20,15,35,.85),rgba(45,27,61,.75)),url('/assets/images/lucid-origin_Ancient_Martian_council_hall_interior_grand_stone_chamber_with_tall_columns_thro-0.jpg') center/cover;border-radius:24px;padding:60px 32px;color:#fff;margin-bottom:24px;overflow:hidden;box-shadow:0 24px 60px -16px rgba(0,0,0,.5);min-height:280px;display:flex;align-items:center;justify-content:center;text-align:center}
.gld-hero-content{position:relative;z-index:2}
.gld-hero-crest{display:inline-flex;align-items:center;justify-content:center;width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,var(--gk),var(--gk-l));font-size:3.5rem;margin-bottom:16px;box-shadow:0 20px 50px -10px var(--gk-s),0 0 0 6px rgba(255,255,255,.08);border:3px solid rgba(255,255,255,.2);animation:gldFloat 4s ease-in-out infinite}
.gld-hero-title{font-size:2.2rem;font-weight:800;margin:0 0 8px 0;text-shadow:0 4px 20px rgba(0,0,0,.7)}
.gld-hero-title span{background:linear-gradient(90deg,#fff,#f5d76e,#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gldShine 3s linear infinite}
.gld-hero-sub{font-size:1rem;opacity:.9;margin:0 0 20px 0;text-shadow:0 2px 8px rgba(0,0,0,.6)}
.gld-hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.gld-hero-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border-radius:30px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.15);color:#fff;font-weight:700;font-size:.9rem;cursor:pointer;transition:all .3s;backdrop-filter:blur(10px);font-family:inherit}
.gld-hero-btn:hover{background:rgba(255,255,255,.3);transform:translateY(-3px)}
.gld-hero-btn.primary{background:linear-gradient(135deg,#f39c12,#e67e22);border-color:transparent;box-shadow:0 8px 24px -6px rgba(243,156,18,.6)}

.gld-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:24px}
.gld-stat{background:#fff;padding:18px 14px;border-radius:16px;text-align:center;border:2px solid transparent;box-shadow:0 4px 12px rgba(0,0,0,.05);transition:all .3s}
.gld-stat:hover{transform:translateY(-6px);border-color:var(--gk);box-shadow:0 16px 40px -8px var(--gk-s)}
.gld-stat-icon{font-size:1.8rem;margin-bottom:8px}
.gld-stat-value{font-size:2rem;font-weight:900;line-height:1;background:linear-gradient(135deg,var(--gk),var(--gk-l));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gld-stat-label{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;margin-top:6px;font-weight:700}

.gld-filters{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:20px;padding:12px 16px;background:#fff;border-radius:14px;border:1px solid rgba(0,0,0,.05);box-shadow:0 4px 12px rgba(0,0,0,.04)}
.gld-filter-btn{padding:8px 18px;border-radius:30px;border:2px solid transparent;background:rgba(0,0,0,.03);color:#666;font-size:.85rem;font-weight:700;cursor:pointer;transition:all .25s;font-family:inherit}
.gld-filter-btn.active{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff}
.gld-search{flex:1;min-width:200px;padding:10px 18px;border-radius:30px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fafafa}
.gld-search:focus{border-color:var(--gk);background:#fff}

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
.gld-card-status.full{background:rgba(231,76,60,.1);color:#c0392b}
.gld-card-actions{display:flex;gap:8px;padding:0 22px 20px}

.rank-badge{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;flex-shrink:0;font-size:.72rem;font-weight:900;position:relative}
.rank-r5{background:linear-gradient(135deg,#f5d76e,#f39c12,#e67e22);color:#fff;border-radius:50%;box-shadow:0 4px 12px rgba(243,156,18,.6);font-size:1.1rem;animation:gldCrown 3s ease-in-out infinite}
.rank-r4{background:linear-gradient(135deg,#c9a4ff,#8e44ad);color:#fff;border-radius:50%;font-size:1rem}
.rank-r3{background:linear-gradient(135deg,#4a90e2,#2c5fa1);color:#fff;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);font-size:.68rem}
.rank-r2{background:linear-gradient(135deg,#cd7f32,#8b5a2b);color:#fff;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);font-size:.65rem}
.rank-r1{background:linear-gradient(135deg,#27ae60,#16a085);color:#fff;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);font-size:.65rem}
.subtitle-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:.68rem;font-weight:800;background:rgba(108,99,255,.12);color:var(--gk);border:1px solid rgba(108,99,255,.3);margin-left:6px}

.gld-page-hero{position:relative;background:linear-gradient(135deg,rgba(20,15,35,.85),rgba(45,27,61,.75)),url('/assets/images/lucid-origin_Ancient_Martian_council_hall_interior_grand_stone_chamber_with_tall_columns_thro-0.jpg') center/cover;border-radius:24px;padding:40px;color:#fff;margin-bottom:24px;min-height:240px}
.gld-page-content{position:relative;z-index:2;display:flex;gap:24px;align-items:center;flex-wrap:wrap}
.gld-page-crest{width:120px;height:140px;background:linear-gradient(135deg,var(--guild-color,#6C63FF),rgba(0,0,0,.3));border-radius:8px 8px 50% 50%;display:flex;align-items:center;justify-content:center;font-size:4rem;box-shadow:0 20px 40px -10px rgba(0,0,0,.5),inset 0 0 0 3px rgba(255,255,255,.15);flex-shrink:0;overflow:hidden}
.gld-page-crest img{width:100%;height:100%;object-fit:cover}
.gld-page-name{font-size:2rem;font-weight:800;margin:0 0 6px 0;text-shadow:0 4px 12px rgba(0,0,0,.6)}
.gld-page-motto{font-size:.95rem;font-style:italic;color:#f5d76e;margin:0 0 12px 0}
.gld-page-stats{display:flex;gap:18px;flex-wrap:wrap;font-size:.85rem}
.gld-page-stats b{font-size:1.1rem;display:block;color:#fff}

.gld-members{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:20px}
.gld-members-banner{height:160px;background:url('/assets/images/lucid-origin_Panoramic_view_of_ancient_Martian_feast_hall_long_wooden_tables_with_candles_sto-0.jpg') center/cover;position:relative;overflow:hidden}
.gld-members-banner::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.7) 100%)}
.gld-members-banner-content{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px;color:#fff;z-index:2}
.gld-members-banner-title{font-size:1.05rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,.8);background:linear-gradient(90deg,#fff,#f5d76e,#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gldShine 4s linear infinite}
.gld-members-list{padding:16px 20px}
.gld-member{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:rgba(0,0,0,.02);margin-bottom:8px;transition:all .25s;cursor:pointer;border:1.5px solid transparent}
.gld-member:hover{background:rgba(108,99,255,.06);transform:translateX(4px);border-color:rgba(108,99,255,.2)}
.gld-member-avatar{width:46px !important;height:46px !important;min-width:46px !important;aspect-ratio:1/1 !important;border-radius:50% !important;object-fit:cover !important;border:2px solid var(--gk);flex-shrink:0}
.gld-member-info{flex:1;min-width:0}
.gld-member-name{font-weight:800;color:#1a1a1a;font-size:.95rem;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.gld-member-meta{font-size:.75rem;color:#888;margin-top:2px}
.gld-member-actions{display:flex;gap:6px;flex-shrink:0}
.gld-icon-btn{width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(0,0,0,.08);background:#fff;color:#666;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:.9rem;transition:all .2s;font-family:inherit;padding:0}
.gld-icon-btn:hover{transform:scale(1.1);border-color:var(--gk);color:var(--gk)}
.gld-icon-btn.danger:hover{border-color:#e74c3c;color:#e74c3c}

/* CHAT */
.gld-chat{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:20px;display:flex;flex-direction:column;max-height:700px}
.gld-chat-header{padding:16px 20px;background:linear-gradient(135deg,#2d1b3d,#1a1a2e);color:#fff;display:flex;align-items:center;gap:10px}
.gld-chat-header-icon{font-size:1.4rem}
.gld-chat-header-title{font-weight:800;font-size:1.05rem;flex:1}
.gld-chat-header-count{font-size:.78rem;background:rgba(255,255,255,.15);padding:4px 10px;border-radius:12px}
.gld-chat-body{flex:1;overflow-y:auto;padding:16px 20px;background:linear-gradient(180deg,#fafbfd,#fff);min-height:300px;max-height:500px;scroll-behavior:smooth}
.gld-chat-empty{text-align:center;color:#999;padding:60px 20px;font-size:.9rem}
.gld-chat-msg{display:flex;gap:10px;margin-bottom:14px;position:relative}
.gld-chat-msg.own{flex-direction:row-reverse}
.gld-chat-msg-avatar{width:38px !important;height:38px !important;min-width:38px !important;aspect-ratio:1/1 !important;object-fit:cover !important;border-radius:50% !important;border:2px solid var(--gk) !important;flex-shrink:0;cursor:pointer}
.gld-chat-msg-content{max-width:75%;min-width:0}
.gld-chat-msg.own .gld-chat-msg-content{text-align:right}
.gld-chat-msg-head{font-size:.75rem;color:#888;margin-bottom:4px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.gld-chat-msg.own .gld-chat-msg-head{justify-content:flex-end}
.gld-chat-msg-author{font-weight:800;color:#333;cursor:pointer}
.gld-chat-msg-author:hover{color:var(--gk);text-decoration:underline}
.gld-chat-msg-text{padding:10px 14px;border-radius:14px;background:#f0f0f5;color:#333;font-size:.88rem;line-height:1.45;word-wrap:break-word;display:inline-block;text-align:left;position:relative}
.gld-chat-msg.own .gld-chat-msg-text{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;border-bottom-right-radius:4px}
.gld-chat-msg:not(.own) .gld-chat-msg-text{border-bottom-left-radius:4px}
.gld-chat-msg-text.edited::after{content:' (изменено)';font-size:.7rem;opacity:.6;font-style:italic}
.gld-chat-msg-reply{font-size:.75rem;padding:6px 10px;background:rgba(108,99,255,.08);border-left:3px solid var(--gk);border-radius:6px;margin-bottom:6px;color:#555;cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gld-chat-msg-time{font-size:.68rem;color:#bbb;margin-top:4px}
.gld-chat-msg-actions{display:flex;gap:4px;margin-top:6px;opacity:0;transition:opacity .2s}
.gld-chat-msg:hover .gld-chat-msg-actions{opacity:1}
.gld-chat-msg.own .gld-chat-msg-actions{justify-content:flex-end}
.gld-chat-msg-actions button{background:rgba(0,0,0,.05);border:none;border-radius:8px;padding:4px 8px;font-size:.75rem;cursor:pointer;font-family:inherit;transition:all .2s}
.gld-chat-msg-actions button:hover{background:var(--gk);color:#fff}
.gld-chat-reactions{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap}
.gld-chat-reactions.own{justify-content:flex-end}
.gld-chat-reaction{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;background:rgba(0,0,0,.05);border:1.5px solid transparent;border-radius:12px;font-size:.75rem;cursor:pointer;transition:all .2s;font-family:inherit}
.gld-chat-reaction:hover{background:rgba(108,99,255,.15)}
.gld-chat-reaction.mine{background:rgba(108,99,255,.2);border-color:var(--gk)}
.gld-chat-reaction-bar{position:absolute;top:-42px;right:0;background:#fff;border-radius:24px;padding:6px 8px;box-shadow:0 8px 24px rgba(0,0,0,.15);display:none;gap:2px;z-index:10}
.gld-chat-msg:hover .gld-chat-reaction-bar,
.gld-chat-reaction-bar:hover{display:flex}
.gld-chat-reaction-bar button{width:32px;height:32px;border:none;background:transparent;font-size:1.15rem;cursor:pointer;border-radius:50%;transition:transform .2s;font-family:inherit;padding:0}
.gld-chat-reaction-bar button:hover{transform:scale(1.3);background:rgba(108,99,255,.1)}
.gld-chat-reply-preview{padding:8px 14px;background:rgba(108,99,255,.08);border-top:1px solid rgba(108,99,255,.2);font-size:.78rem;color:#555;display:flex;justify-content:space-between;align-items:center;gap:8px}
.gld-chat-reply-preview button{background:transparent;border:none;cursor:pointer;color:#999;font-size:1rem;padding:0;font-family:inherit}
.gld-chat-input{display:flex;gap:8px;padding:12px 16px;border-top:1px solid rgba(0,0,0,.06);background:#fafafa}
.gld-chat-input input{flex:1;padding:12px 18px;border-radius:24px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fff}
.gld-chat-input input:focus{border-color:var(--gk);box-shadow:0 0 0 4px var(--gk-s)}
.gld-chat-input button{padding:12px 22px;background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;border:none;border-radius:24px;cursor:pointer;font-weight:800;font-family:inherit;font-size:.9rem}
.gld-chat-input button:hover{transform:translateY(-2px)}

.gld-tabs{display:flex;gap:4px;margin-bottom:20px;padding:6px;background:#fff;border-radius:14px;border:1px solid rgba(0,0,0,.05);overflow-x:auto}
.gld-tab{flex-shrink:0;padding:10px 18px;border:none;background:transparent;color:#666;font-size:.88rem;font-weight:700;border-radius:10px;cursor:pointer;transition:all .25s;font-family:inherit}
.gld-tab.active{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff}

.gld-quest{background:#fff;border-radius:14px;padding:16px 18px;margin-bottom:10px;border-left:4px solid var(--gk);box-shadow:0 4px 12px rgba(0,0,0,.04)}
.gld-quest-title{font-weight:800;color:#1a1a1a;margin-bottom:6px}
.gld-quest-desc{font-size:.82rem;color:#666;margin-bottom:10px;line-height:1.5}
.gld-quest-progress{height:8px;background:rgba(108,99,255,.1);border-radius:8px;overflow:hidden;margin-bottom:8px}
.gld-quest-progress-bar{height:100%;background:linear-gradient(90deg,var(--gk),var(--gk-l));transition:width 1s}
.gld-quest-meta{display:flex;justify-content:space-between;font-size:.75rem;color:#888}

.gld-modal-bg{position:fixed;inset:0;z-index:99999;background:rgba(10,10,26,.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:gldFade .3s ease;overflow-y:auto}
.gld-modal{background:#fff;max-width:520px;width:100%;border-radius:22px;padding:30px 28px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.5);animation:gldRise .4s cubic-bezier(.16,1,.3,1);max-height:92vh;overflow-y:auto}
.gld-modal.wide{max-width:760px}
.gld-modal-title{font-size:1.35rem;font-weight:800;color:#1a1a1a;margin:0 0 20px 0;display:flex;align-items:center;gap:10px}
.gld-modal-close{position:absolute;top:14px;right:16px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.05);border:none;font-size:1.1rem;cursor:pointer;color:#666;display:flex;align-items:center;justify-content:center;font-family:inherit;z-index:3}
.gld-modal-close:hover{background:rgba(0,0,0,.1);transform:rotate(90deg)}
.gld-field{margin-bottom:16px}
.gld-field label{display:block;font-size:.82rem;font-weight:800;color:#333;margin-bottom:8px;text-transform:uppercase}
.gld-field input,.gld-field textarea,.gld-field select{width:100%;padding:12px 16px;border-radius:12px;border:2px solid rgba(0,0,0,.08);font-size:.92rem;font-family:inherit;outline:none;background:#fafafa;box-sizing:border-box}
.gld-field input:focus,.gld-field textarea:focus{border-color:var(--gk);background:#fff;box-shadow:0 0 0 4px var(--gk-s)}
.gld-field textarea{resize:vertical;min-height:80px}
.gld-icon-picker,.gld-color-picker{display:flex;gap:8px;flex-wrap:wrap}
.gld-icon-btn-pick{width:50px;height:50px;border-radius:12px;border:2px solid rgba(0,0,0,.08);background:#fafafa;font-size:1.5rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;font-family:inherit;overflow:hidden;padding:0}
.gld-icon-btn-pick.selected{border-color:var(--gk);background:rgba(108,99,255,.1);transform:scale(1.1)}
.gld-icon-btn-pick img{width:100%;height:100%;object-fit:cover;border-radius:8px;display:block}
.gld-color-btn{width:40px;height:40px;border-radius:50%;border:3px solid transparent;cursor:pointer;padding:0}
.gld-color-btn.selected{border-color:#333;transform:scale(1.18)}
.gld-modal-actions{display:flex;gap:10px;margin-top:24px}
.gld-btn{flex:1;padding:14px;border-radius:12px;border:none;font-size:.95rem;font-weight:800;cursor:pointer;transition:all .25s;font-family:inherit}
.gld-btn.primary{background:linear-gradient(135deg,var(--gk),var(--gk-l));color:#fff;box-shadow:0 8px 20px -4px var(--gk-s)}
.gld-btn.primary:hover{transform:translateY(-2px)}
.gld-btn.secondary{background:rgba(0,0,0,.05);color:#666}
.gld-btn.danger{background:#e74c3c;color:#fff}
.gld-rank-picker{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.gld-rank-option{padding:8px 14px;border-radius:14px;border:2px solid rgba(0,0,0,.08);background:#fafafa;cursor:pointer;font-family:inherit;font-size:.85rem;font-weight:800;display:inline-flex;align-items:center;gap:6px}
.gld-rank-option.selected{border-color:var(--gk);background:rgba(108,99,255,.1)}
.gld-rank-option:disabled{opacity:.4;cursor:not-allowed}

/* МЕНЮ ДЕЙСТВИЙ */
.gld-action-menu{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin-bottom:20px}
.gld-action-card{background:#fff;border:2px solid rgba(0,0,0,.06);border-radius:16px;padding:18px 14px;text-align:center;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
.gld-action-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--gk),transparent);opacity:0;transition:opacity .3s}
.gld-action-card:hover{transform:translateY(-4px);border-color:var(--gk);box-shadow:0 12px 28px -8px var(--gk-s)}
.gld-action-card:hover::before{opacity:1}
.gld-action-icon{font-size:1.8rem;margin-bottom:8px}
.gld-action-title{font-size:.85rem;font-weight:800;color:#1a1a1a;margin-bottom:2px}
.gld-action-desc{font-size:.72rem;color:#888}

/* БАНК */
.gld-bank-balance{background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;padding:24px;border-radius:18px;text-align:center;margin-bottom:20px;box-shadow:0 12px 32px -8px rgba(243,156,18,.5)}
.gld-bank-balance-value{font-size:2.6rem;font-weight:900;line-height:1}
.gld-bank-balance-label{font-size:.82rem;opacity:.9;margin-top:4px;letter-spacing:1px;text-transform:uppercase}

.gld-empty{text-align:center;padding:60px 20px;background:#fff;border-radius:20px;border:2px dashed rgba(108,99,255,.2)}
.gld-empty-icon{font-size:4rem;margin-bottom:12px;opacity:.5}

/* Профиль */
.gld-profile-modal{display:grid;grid-template-columns:200px 1fr;overflow:hidden}
.gld-profile-left{background:linear-gradient(135deg,#1a1a2e,#2d1b3d);padding:24px 16px;color:#fff;display:flex;flex-direction:column;align-items:center;position:relative}
.gld-profile-left::before{content:'';position:absolute;inset:0;background:url('/assets/images/lucid-origin_Ancient_Martian_council_hall_interior_grand_stone_chamber_with_tall_columns_thro-0.jpg') center/cover;opacity:.25}
.gld-profile-avatar-wrap{position:relative;z-index:2;margin-bottom:16px}
.gld-profile-avatar{width:120px;height:120px;border-radius:50%;border:4px solid rgba(255,255,255,.3);object-fit:cover;display:block}
.gld-profile-rank-badge{position:absolute;bottom:-4px;right:-4px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:3px solid #fff;font-size:1.1rem}
.gld-profile-name{position:relative;z-index:2;font-size:1.15rem;font-weight:800;text-align:center;margin-bottom:4px;word-break:break-word}
.gld-profile-right{padding:24px}
.gld-profile-stat-row{display:flex;justify-content:space-between;padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.05);font-size:.88rem}
.gld-profile-stat-value{font-weight:800}
.gld-profile-actions{display:flex;gap:8px;margin-top:20px;flex-wrap:wrap}
.gld-profile-btn{flex:1;min-width:120px;padding:12px;border-radius:12px;border:2px solid var(--gk);background:#fff;color:var(--gk);font-weight:800;font-size:.85rem;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;justify-content:center;gap:6px}
.gld-profile-btn:hover{background:var(--gk);color:#fff}
.gld-profile-btn.primary{background:var(--gk);color:#fff}

/* Почтовый ящик */
.gld-mail-item{padding:14px 16px;border-radius:12px;background:rgba(0,0,0,.02);border-left:3px solid transparent;margin-bottom:8px;cursor:pointer;transition:all .2s}
.gld-mail-item:hover{background:rgba(108,99,255,.06);transform:translateX(4px)}
.gld-mail-item.unread{background:rgba(108,99,255,.08);border-left-color:var(--gk)}
.gld-mail-head{display:flex;justify-content:space-between;margin-bottom:4px;font-size:.82rem}
.gld-mail-from{font-weight:800;color:#333}
.gld-mail-date{color:#999;font-size:.72rem}
.gld-mail-subject{font-weight:700;color:#1a1a1a;font-size:.9rem;margin-bottom:2px}
.gld-mail-preview{font-size:.78rem;color:#888;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

@media (max-width:640px){
    .gld-profile-modal{grid-template-columns:1fr}
    .gld-chat-msg-content{max-width:85%}
    .gld-action-menu{grid-template-columns:1fr 1fr}
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

var REACTIONS=['👍','❤️','🔥','😂','😮','😢','🎉','⚔️'];

var GUILD_ICONS=['🏰','⚔️','🛡️','👑','🔥','🌟','🌊','📜','🧠','🎵','🎨','⚙️','🔭','💎','🏆','🚀','🗡️','🐉','🦅','⚡'];
var GUILD_COLORS=['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63','#34495e','#e67e22','#f5d76e','#8e44ad'];
var GUILD_CRESTS=[
'/assets/images/icon-war.png',
'/assets/images/lucid-origin_Martian_hall_of_honor_wall_covered_with_golden_shields_and_portraits_of_legendar-0.jpg'
];

var container=document.getElementById('gld-app');
var client=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

var currentUser=null,profile=null,myKingdom=KINGDOMS['Кимерия'];
var guilds=[],myGuildId=null,myRank=1,mySubtitle=null;
var membersCount={},profilesMap={},membersMap={};
var activeFilter='all',searchQuery='';
var currentView='list',currentGuildId=null,currentTab='members';
var chatMessages=[],chatReactions={},chatInterval=null,lastChatCount=0;
var replyTo=null,editingId=null;
var letters=[],privateMessages=[];

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
function avatarFor(name){return 'https://ui-avatars.com/api/?name='+encodeURIComponent(name||'?')+'&background=6C63FF&color=fff&size=128&rounded=true';}
function fmtTime(iso){var d=new Date(iso);var h=d.getHours(),m=d.getMinutes();return (h<10?'0':'')+h+':'+(m<10?'0':'')+m;}
function getLevel(exp){exp=exp||0;var l=1;while(l<100&&exp>=Math.floor(Math.pow(l+1,1.8)*20))l++;var c=Math.floor(Math.pow(l,1.8)*20);var n=Math.floor(Math.pow(l+1,1.8)*20);var p=n>c?Math.min(((exp-c)/(n-c))*100,100):100;return{level:l,current:c,next:n,percent:p};}

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
}

async function createGuild(name,desc,icon,color,flag,motto){
    if(!currentUser||myGuildId){toast('Вы уже в гильдии','warning');return;}
    if(!name||name.length<3){toast('Имя: 3-30 символов','warning');return;}
    var ex=await client.from('guilds').select('id').eq('name',name).maybeSingle();
    if(ex&&ex.data){toast('Такая гильдия уже есть','error');return;}
    var res=await client.from('guilds').insert([{name:name,description:desc,icon:icon,color:color,flag:flag,motto:motto,leader_id:currentUser.id}]).select().single();
    if(res.error){toast('Ошибка: '+res.error.message,'error');return;}
    await client.from('guild_members').insert([{guild_id:res.data.id,user_id:currentUser.id,rank:5,role:'leader'}]);
    toast('🏰 Гильдия создана!','success');
    await loadData();currentView='list';render();
}

async function joinGuild(id){
    if(!currentUser||myGuildId)return;
    var r=await client.from('guild_members').insert([{guild_id:id,user_id:currentUser.id,rank:1,role:'member'}]);
    if(r.error){toast('Ошибка','error');return;}
    toast('✅ Вы вступили!','success');await loadData();render();
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
    myGuildId=null;myRank=1;
    await loadData();currentView='list';render();
}

async function changeRank(userId,newRank,newSubtitle){
    if(myRank<4){toast('Недостаточно прав','error');return false;}
    if(myRank===4&&newRank>3){toast('R4 повышает до R3','error');return false;}
    if(userId===currentUser.id){toast('Себе нельзя','error');return false;}
    var target=(membersMap[myGuildId]||[]).filter(function(m){return m.user_id===userId;})[0];
    if(!target||target.rank>=5)return false;
    var upd={rank:newRank};
    if(newRank===4&&newSubtitle)upd.subtitle=newSubtitle;
    else upd.subtitle=null;
    for(var a=0;a<2;a++){
        var r=await client.from('guild_members').update(upd).eq('guild_id',myGuildId).eq('user_id',userId).select();
        if(!r.error){
            await new Promise(function(res){setTimeout(res,300);});
            var c=await client.from('guild_members').select('rank,subtitle').eq('guild_id',myGuildId).eq('user_id',userId).single();
            if(c&&c.data&&c.data.rank===newRank){
                toast('✅ Ранг обновлён','success');await loadData();render();return true;
            }
        }
        await new Promise(function(res){setTimeout(res,500);});
    }
    toast('⚠️ Не сохранилось. Проверь RLS','error');
    return false;
}

/* ═══ CHAT с реакциями, ответами, редактированием ═══ */
async function loadChat(){
    if(!currentGuildId)return;
    var r=await client.from('guild_chat').select('id,user_id,message,created_at,reply_to,edited').eq('guild_id',currentGuildId).order('created_at',{ascending:true}).limit(100);
    chatMessages=(r&&r.data)||[];
    var msgIds=chatMessages.map(function(m){return m.id;});
    chatReactions={};
    if(msgIds.length){
        var rr=await client.from('guild_chat_reactions').select('message_id,user_id,emoji').in('message_id',msgIds);
        (rr&&rr.data||[]).forEach(function(x){
            if(!chatReactions[x.message_id])chatReactions[x.message_id]=[];
            chatReactions[x.message_id].push(x);
        });
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
    if(!chatMessages.length)return '<div class="gld-chat-empty">💬 Пока нет сообщений<br>Будьте первым!</div>';
    return chatMessages.map(function(m){
        var p=profilesMap[m.user_id]||{};
        var name=p.display_name||p.username||'Аноним';
        var av=p.avatar_url||avatarFor(name);
        var isOwn=m.user_id===currentUser.id;
        var mem=(membersMap[currentGuildId]||[]).filter(function(x){return x.user_id===m.user_id;})[0];
        var rank=mem?RANKS[mem.rank]||RANKS[1]:RANKS[1];
        var rb='<span class="rank-badge '+rank.class+'" style="width:20px;height:20px;font-size:.62rem;">'+(mem&&mem.rank===5?'👑':(mem&&mem.rank===4?'🛡️':'R'+(mem?mem.rank:1)))+'</span>';

        // Reply preview
        var replyHtml='';
        if(m.reply_to){
            var rp=chatMessages.filter(function(x){return x.id===m.reply_to;})[0];
            if(rp){
                var rpn=profilesMap[rp.user_id]||{};
                var rpName=rpn.display_name||rpn.username||'Аноним';
                replyHtml='<div class="gld-chat-msg-reply" onclick="gldScrollTo(\''+escAttr(rp.id)+'\')">↩ '+esc(rpName)+': '+esc(rp.message.slice(0,50))+'</div>';
            }
        }

        // Reactions
        var rxs=chatReactions[m.id]||[];
        var grouped={};
        rxs.forEach(function(rx){grouped[rx.emoji]=(grouped[rx.emoji]||[]);grouped[rx.emoji].push(rx.user_id);});
        var rxHtml='';
        var keys=Object.keys(grouped);
        if(keys.length){
            rxHtml='<div class="gld-chat-reactions'+(isOwn?' own':'')+'">';
            keys.forEach(function(e){
                var mine=grouped[e].indexOf(currentUser.id)!==-1;
                rxHtml+='<button class="gld-chat-reaction'+(mine?' mine':'')+'" onclick="gldToggleReaction(\''+escAttr(m.id)+'\',\''+escAttr(e)+'\')">'+e+' '+grouped[e].length+'</button>';
            });
            rxHtml+='</div>';
        }

        // Actions
        var actions='<div class="gld-chat-msg-actions">'+
            '<button onclick="gldStartReply(\''+escAttr(m.id)+'\')">↩ Ответить</button>';
        if(isOwn)actions+='<button onclick="gldStartEdit(\''+escAttr(m.id)+'\')">✏️ Редактировать</button>';
        actions+='<button onclick="gldTranslate(\''+escAttr(m.id)+'\')">🌐 Перевести</button>';
        actions+='</div>';

        // Reaction bar
        var rxBar='<div class="gld-chat-reaction-bar">'+
            REACTIONS.map(function(e){return '<button onclick="gldToggleReaction(\''+escAttr(m.id)+'\',\''+escAttr(e)+'\')">'+e+'</button>';}).join('')+
        '</div>';

        return '<div class="gld-chat-msg'+(isOwn?' own':'')+'" data-msg-id="'+escAttr(m.id)+'">'+
            '<img src="'+escAttr(av)+'" class="gld-chat-msg-avatar" onclick="gldShowProfile(\''+escAttr(m.user_id)+'\')" onerror="this.onerror=null;this.src=\''+avatarFor(name)+'\';">'+
            '<div class="gld-chat-msg-content">'+
                replyHtml+
                '<div class="gld-chat-msg-head">'+rb+'<span class="gld-chat-msg-author" onclick="gldShowProfile(\''+escAttr(m.user_id)+'\')">'+esc(name)+'</span></div>'+
                '<div class="gld-chat-msg-text'+(m.edited?' edited':'')+'">'+esc(m.message).replace(/\n/g,'<br>')+'</div>'+
                '<div class="gld-chat-msg-time">'+fmtTime(m.created_at)+'</div>'+
                rxHtml+
                actions+
                rxBar+
            '</div></div>';
    }).join('');
}

async function sendChat(){
    var input=document.getElementById('gld-chat-input');
    if(!input||!currentUser||!currentGuildId)return;
    var msg=input.value.trim();
    if(!msg)return;
    input.disabled=true;

    if(editingId){
        var r=await client.from('guild_chat').update({message:msg,edited:true,edited_at:new Date().toISOString()}).eq('id',editingId);
        input.disabled=false;
        if(r.error){toast('Ошибка','error');return;}
        editingId=null;replyTo=null;
        input.placeholder='Написать сообщение...';
        input.value='';
        removeReplyPreview();
        await loadChat();updateChatUI();
        return;
    }

    var payload={guild_id:currentGuildId,user_id:currentUser.id,message:msg};
    if(replyTo)payload.reply_to=replyTo;
    var r=await client.from('guild_chat').insert([payload]);
    input.disabled=false;
    if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
    input.value='';
    replyTo=null;
    removeReplyPreview();
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
    if(chatInterval){clearInterval(chatInterval);chatInterval=null;}
    chatInterval=setInterval(async function(){
        if(currentView!=='detail'||currentTab!=='chat'||editingId)return;
        var before=chatMessages.length;
        await loadChat();
        if(chatMessages.length!==before)updateChatUI();
    },5000);
}

/* Все экспорты */
window.gldStartReply=function(id){
    var m=chatMessages.filter(function(x){return x.id===id;})[0];
    if(!m)return;
    replyTo=id;editingId=null;
    var p=profilesMap[m.user_id]||{};
    showReplyPreview('↩ Ответ '+esc(p.display_name||p.username||'Аноним')+': '+esc(m.message.slice(0,60)));
    var input=document.getElementById('gld-chat-input');
    if(input)input.focus();
};

window.gldStartEdit=function(id){
    var m=chatMessages.filter(function(x){return x.id===id;})[0];
    if(!m||m.user_id!==currentUser.id)return;
    editingId=id;replyTo=null;
    var input=document.getElementById('gld-chat-input');
    if(input){input.value=m.message;input.focus();input.placeholder='Редактирование...';}
    showReplyPreview('✏️ Редактирование сообщения (Enter — сохранить, Esc — отмена)');
};

function showReplyPreview(text){
    var old=document.getElementById('gld-reply-preview');
    if(old)old.remove();
    var input=document.getElementById('gld-chat-input');
    if(!input)return;
    var el=document.createElement('div');
    el.id='gld-reply-preview';
    el.className='gld-chat-reply-preview';
    el.innerHTML='<span>'+text+'</span><button onclick="gldCancelReply()">✕</button>';
    input.closest('.gld-chat-input').parentNode.insertBefore(el,input.closest('.gld-chat-input'));
}

function removeReplyPreview(){
    var el=document.getElementById('gld-reply-preview');
    if(el)el.remove();
}

window.gldCancelReply=function(){
    replyTo=null;editingId=null;
    var input=document.getElementById('gld-chat-input');
    if(input){input.value='';input.placeholder='Написать сообщение...';}
    removeReplyPreview();
};

window.gldToggleReaction=async function(msgId,emoji){
    if(!currentUser)return;
    var mine=(chatReactions[msgId]||[]).filter(function(r){return r.user_id===currentUser.id&&r.emoji===emoji;})[0];
    if(mine){
        await client.from('guild_chat_reactions').delete().eq('message_id',msgId).eq('user_id',currentUser.id).eq('emoji',emoji);
    }else{
        await client.from('guild_chat_reactions').insert([{message_id:msgId,user_id:currentUser.id,emoji:emoji}]);
    }
    await loadChat();updateChatUI();
};

window.gldTranslate=async function(msgId){
    var m=chatMessages.filter(function(x){return x.id===msgId;})[0];
    if(!m)return;
    var el=document.querySelector('[data-msg-id="'+msgId+'"] .gld-chat-msg-text');
    if(!el)return;
    var orig=el.innerHTML;
    el.innerHTML='<em style="opacity:.6;">Перевод...</em>';
    try{
        var res=await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(m.message.slice(0,500))+'&langpair=ru|en');
        var data=await res.json();
        var translated=data&&data.responseData&&data.responseData.translatedText||'—';
        el.innerHTML='<em style="opacity:.7;font-size:.75rem;">🇬🇧 '+esc(translated)+'</em><br>'+orig;
    }catch(e){
        el.innerHTML='<em style="color:#e74c3c;">Ошибка перевода</em><br>'+orig;
    }
};

/* LIST + DETAIL — упрощённо (без изменений) */
function renderList(){
    document.documentElement.style.setProperty('--gk',myKingdom.color);
    document.documentElement.style.setProperty('--gk-l',myKingdom.light);
    document.documentElement.style.setProperty('--gk-s',myKingdom.color+'40');
    var total=Object.values(membersCount).reduce(function(a,b){return a+b;},0);
    var filtered=guilds.slice();
    if(activeFilter==='my'&&myGuildId)filtered=filtered.filter(function(g){return g.id===myGuildId;});
    if(searchQuery){var q=searchQuery.toLowerCase();filtered=filtered.filter(function(g){return (g.name||'').toLowerCase().indexOf(q)!==-1;});}
    filtered.sort(function(a,b){return (membersCount[b.id]||0)-(membersCount[a.id]||0);});
    container.innerHTML=
    '<div class="gld-hero gld-fade"><div class="gld-hero-content">'+
        '<div class="gld-hero-crest">🏰</div>'+
        '<h1 class="gld-hero-title"><span>Гильдии Марса</span></h1>'+
        '<p class="gld-hero-sub">'+(currentUser?'Объединяйтесь!':'Войдите')+'</p>'+
        '<div class="gld-hero-actions">'+
            (currentUser&&!myGuildId?'<button class="gld-hero-btn primary" onclick="gldCreate()">➕ Создать</button>':'')+
            (currentUser&&myGuildId?'<button class="gld-hero-btn primary" onclick="gldOpenMine()">🏰 Моя гильдия</button>':'')+
            (!currentUser?'<a href="/login/" class="gld-hero-btn primary">🔐 Войти</a>':'')+
        '</div></div></div>'+
    '<div class="gld-stats-grid gld-fade">'+
        '<div class="gld-stat"><div class="gld-stat-icon">🏰</div><div class="gld-stat-value">'+guilds.length+'</div><div class="gld-stat-label">Гильдий</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">👥</div><div class="gld-stat-value">'+total+'</div><div class="gld-stat-label">Участников</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">⭐</div><div class="gld-stat-value">'+(myGuildId?'1':'0')+'</div><div class="gld-stat-label">Моя</div></div>'+
        '<div class="gld-stat"><div class="gld-stat-icon">📊</div><div class="gld-stat-value">'+(guilds.length?Math.round(total/guilds.length):0)+'</div><div class="gld-stat-label">Средний</div></div>'+
    '</div>'+
    '<div class="gld-filters gld-fade">'+
        '<button class="gld-filter-btn '+(activeFilter==='all'?'active':'')+'" onclick="gldFilter(\'all\')">🌐 Все</button>'+
        (currentUser&&myGuildId?'<button class="gld-filter-btn '+(activeFilter==='my'?'active':'')+'" onclick="gldFilter(\'my\')">🏰 Моя</button>':'')+
        '<input class="gld-search" type="text" placeholder="🔍 Поиск..." value="'+escAttr(searchQuery)+'" oninput="gldSearch(this.value)">'+
    '</div>'+
    (filtered.length===0?
        '<div class="gld-empty"><div class="gld-empty-icon">🏰</div><div style="font-weight:700;color:#666;">Гильдий пока нет</div></div>'
        :
        '<div class="gld-grid">'+filtered.map(renderCard).join('')+'</div>'
    );
}

function renderCard(g,i){
    var l=profilesMap[g.leader_id]||{};
    var lName=l.display_name||l.username||'Аноним';
    var count=membersCount[g.id]||0;
    var isMine=g.id===myGuildId;
    var status=isMine?'<span class="gld-card-status my">🏰 Ваша</span>':'<span class="gld-card-status open">✅ Открыта</span>';
    var action;
    if(!currentUser)action='<button class="gld-btn primary" onclick="location.href=\'/login/\'">🔐 Войти</button>';
    else if(isMine)action='<button class="gld-btn primary" onclick="gldOpenGuild('+g.id+')">🏰 Открыть</button>';
    else if(myGuildId)action='<button class="gld-btn secondary" disabled style="opacity:.5;">Вы в гильдии</button>';
    else action='<button class="gld-btn primary" onclick="gldJoin('+g.id+')">➕ Вступить</button>';
    var crestHtml=g.icon&&g.icon.indexOf('/')===0?'<img src="'+escAttr(g.icon)+'">':(g.icon||'🏰');
    return '<div class="gld-card gld-fade" style="--guild-color:'+(g.color||'#6C63FF')+';animation-delay:'+(i*.05)+'s;">'+
        '<div class="gld-card-header"><div class="gld-card-icon">'+crestHtml+'</div>'+
        '<div class="gld-card-info"><h3 class="gld-card-name">'+esc(g.name)+'</h3>'+
        '<div class="gld-card-leader">👑 '+esc(lName)+'</div></div></div>'+
        '<p class="gld-card-desc">'+esc(g.description||'Без описания')+'</p>'+
        '<div class="gld-card-footer"><span class="gld-card-members">👥 '+count+'</span>'+status+'</div>'+
        '<div class="gld-card-actions">'+action+'</div></div>';
}

async function renderGuildDetail(){
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];
    if(!g){currentView='list';render();return;}
    var members=(membersMap[g.id]||[]).slice().sort(function(a,b){return (b.rank||1)-(a.rank||1);});
    var isLeader=g.leader_id===currentUser.id;
    var canManage=myRank>=4||isLeader;

    if(currentTab==='chat')await loadChat();
    if(currentTab==='letters'){
        var lr=await client.from('guild_letters').select('*').eq('guild_id',g.id).order('created_at',{ascending:false}).limit(50);
        letters=(lr&&lr.data)||[];
    }

    var tabs='<div class="gld-tabs">'+
        '<button class="gld-tab'+(currentTab==='members'?' active':'')+'" onclick="gldTab(\'members\')">👥 Участники</button>'+
        '<button class="gld-tab'+(currentTab==='chat'?' active':'')+'" onclick="gldTab(\'chat\')">💬 Чат</button>'+
        '<button class="gld-tab'+(currentTab==='letters'?' active':'')+'" onclick="gldTab(\'letters\')">✉️ Письма</button>'+
        '<button class="gld-tab'+(currentTab==='bank'?' active':'')+'" onclick="gldTab(\'bank\')">🏦 Банк</button>'+
    '</div>';

    var content='';
    if(currentTab==='members'){
        content='<div class="gld-members gld-fade">'+
            '<div class="gld-members-banner"><div class="gld-members-banner-content">'+
            '<div class="gld-members-banner-title">Чертог Славы</div></div></div>'+
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
                '<input type="text" id="gld-chat-input" placeholder="Написать сообщение..." maxlength="1000" onkeypress="if(event.key===\'Enter\')gldSendChat();if(event.key===\'Escape\')gldCancelReply()">'+
                '<button onclick="gldSendChat()">Отправить</button>'+
            '</div></div>';
    } else if(currentTab==='letters'){
        content='<div class="gld-members gld-fade" style="padding:20px;">'+
            '<div style="display:flex;justify-content:space-between;margin-bottom:16px;">'+
            '<h3 style="margin:0;">✉️ Письма гильдии</h3>'+
            (canManage?'<button class="gld-btn primary" style="max-width:200px;" onclick="gldWriteMessage()">➕ Написать</button>':'')+'</div>'+
            (letters.length?letters.map(renderLetter).join(''):'<p style="color:#888;text-align:center;padding:30px;">Писем пока нет</p>')+
        '</div>';
    } else if(currentTab==='bank'){
        content='<div class="gld-members gld-fade" style="padding:20px;">'+
            '<div class="gld-bank-balance">'+
                '<div class="gld-bank-balance-value">🪙 '+(g.bank||0)+'</div>'+
                '<div class="gld-bank-balance-label">Казна гильдии</div>'+
            '</div>'+
            '<div class="gld-action-menu">'+
                '<div class="gld-action-card" onclick="gldBankDeposit()"><div class="gld-action-icon">💰</div><div class="gld-action-title">Вложить</div><div class="gld-action-desc">Передать таланты в казну</div></div>'+
                (canManage?'<div class="gld-action-card" onclick="gldBankWithdraw()"><div class="gld-action-icon">💸</div><div class="gld-action-title">Снять</div><div class="gld-action-desc">Забрать таланты (R4+)</div></div>':'')+
            '</div>'+
        '</div>';
    }

    var crestHtml=g.icon&&g.icon.indexOf('/')===0?'<img src="'+escAttr(g.icon)+'" alt="">':(g.icon||'🏰');
    container.innerHTML=
    '<button class="gld-btn secondary" onclick="gldBack()" style="max-width:180px;margin-bottom:16px;">← К списку</button>'+
    '<div class="gld-page-hero gld-fade" style="--guild-color:'+(g.color||'#6C63FF')+';">'+
        '<div class="gld-page-content">'+
            '<div class="gld-page-crest">'+crestHtml+'</div>'+
            '<div class="gld-page-info">'+
                '<h1 class="gld-page-name">'+esc(g.name)+'</h1>'+
                (g.motto?'<p class="gld-page-motto">«'+esc(g.motto)+'»</p>':'')+
                '<div class="gld-page-stats">'+
                    '<div><b>'+(membersCount[g.id]||0)+'</b>Участников</div>'+
                    '<div><b>'+((g.rating)||0)+'</b>Рейтинг</div>'+
                    '<div><b>🪙 '+(g.bank||0)+'</b>Казна</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="gld-action-menu">'+
        (canManage?'<div class="gld-action-card" onclick="gldEditGuild()"><div class="gld-action-icon">✏️</div><div class="gld-action-title">Редактировать</div><div class="gld-action-desc">Герб, флаг, девиз</div></div>':'')+
        (canManage?'<div class="gld-action-card" onclick="gldAddQuest()"><div class="gld-action-icon">🎯</div><div class="gld-action-title">Задание</div><div class="gld-action-desc">Создать квест</div></div>':'')+
        (!isLeader?'<div class="gld-action-card" onclick="gldLeave()"><div class="gld-action-icon">🚪</div><div class="gld-action-title">Выйти</div><div class="gld-action-desc">Покинуть гильдию</div></div>':'')+
        (isLeader?'<div class="gld-action-card" onclick="gldDelete()"><div class="gld-action-icon">🗑️</div><div class="gld-action-title">Удалить</div><div class="gld-action-desc">Только лидер</div></div>':'')+
    '</div>'+
    tabs+content;
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
    return '<div class="gld-member" onclick="gldShowProfile(\''+escAttr(m.user_id)+'\')">'+
        '<div class="rank-badge '+rank.class+'">'+(m.rank===5?'👑':(m.rank===4?'🛡️':'R'+m.rank))+'</div>'+
        '<img src="'+escAttr(av)+'" class="gld-member-avatar" onerror="this.onerror=null;this.src=\''+avatarFor(name)+'\';">'+
        '<div class="gld-member-info"><div class="gld-member-name">'+esc(name)+(isMe?' (вы)':'')+
            (sub?'<span class="subtitle-badge">'+sub.icon+' '+sub.name+'</span>':'')+
        '</div><div class="gld-member-meta">'+rank.icon+' '+rank.label+'</div></div>'+
        (canManage?'<div class="gld-member-actions" onclick="event.stopPropagation();"><button class="gld-icon-btn" onclick="gldEditMember(\''+escAttr(m.user_id)+'\','+m.rank+',\''+escAttr(m.subtitle||'')+'\')">⚙️</button></div>':'')+
    '</div>';
}

function renderLetter(l){
    var p=profilesMap[l.author_id]||{};
    var name=p.display_name||p.username||'Аноним';
    return '<div class="gld-mail-item" onclick="alert(\''+escAttr(l.body).replace(/'/g,"\\'")+'\')">'+
        '<div class="gld-mail-head"><span class="gld-mail-from">👤 '+esc(name)+'</span><span class="gld-mail-date">'+new Date(l.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</span></div>'+
        '<div class="gld-mail-subject">'+esc(l.subject)+'</div>'+
        '<div class="gld-mail-preview">'+esc(l.body.slice(0,80))+'</div>'+
    '</div>';
}

/* MODALS */
function openCreateModal(){
    if(!currentUser||myGuildId){toast('Недоступно','warning');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">🏰 Создать гильдию</h2>'+
        '<div class="gld-field"><label>Название</label><input id="g-name" maxlength="30"></div>'+
        '<div class="gld-field"><label>Девиз</label><input id="g-motto" maxlength="60"></div>'+
        '<div class="gld-field"><label>Описание</label><textarea id="g-desc" maxlength="300"></textarea></div>'+
        '<div class="gld-field"><label>Иконка</label><div class="gld-icon-picker" id="g-icons">'+
            GUILD_ICONS.map(function(ic,i){return '<button type="button" class="gld-icon-btn-pick'+(i===0?' selected':'')+'" data-icon="'+ic+'">'+ic+'</button>';}).join('')+
            GUILD_CRESTS.map(function(u){return '<button type="button" class="gld-icon-btn-pick" data-icon="'+u+'"><img src="'+u+'"></button>';}).join('')+
        '</div></div>'+
        '<div class="gld-field"><label>Цвет</label><div class="gld-color-picker">'+
            GUILD_COLORS.map(function(c,i){return '<button type="button" class="gld-color-btn'+(i===0?' selected':'')+'" data-color="'+c+'" style="background:'+c+';"></button>';}).join('')+
        '</div></div>'+
        '<div class="gld-field"><label>Флаг</label><div class="gld-icon-picker" id="g-flags">'+
            Object.keys(KINGDOMS).map(function(k,i){return '<button type="button" class="gld-icon-btn-pick'+(i===0?' selected':'')+'" data-flag="'+k+'" style="padding:4px;"><img src="'+KINGDOMS[k].flag+'"></button>';}).join('')+
        '</div></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="g-create">🏰 Создать</button></div>'+
    '</div>';
    document.body.appendChild(o);
    o.querySelectorAll('.gld-icon-btn-pick[data-icon]').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-icon-btn-pick[data-icon]').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('.gld-color-btn').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-color-btn').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('.gld-icon-btn-pick[data-flag]').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-icon-btn-pick[data-flag]').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelector('#g-create').onclick=async function(){
        await createGuild(o.querySelector('#g-name').value.trim(),o.querySelector('#g-desc').value.trim(),o.querySelector('.gld-icon-btn-pick[data-icon].selected').dataset.icon,o.querySelector('.gld-color-btn.selected').dataset.color,KINGDOMS[o.querySelector('.gld-icon-btn-pick[data-flag].selected').dataset.flag].flag,o.querySelector('#g-motto').value.trim());
        o.remove();
    };
}

window.gldEditGuild=async function(){
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];if(!g)return;
    if(myRank<4&&g.leader_id!==currentUser.id){toast('Только R4+','error');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">✏️ Редактирование</h2>'+
        '<div class="gld-field"><label>Название</label><input id="ge-name" maxlength="30" value="'+escAttr(g.name)+'"></div>'+
        '<div class="gld-field"><label>Девиз</label><input id="ge-motto" maxlength="60" value="'+escAttr(g.motto||'')+'"></div>'+
        '<div class="gld-field"><label>Описание</label><textarea id="ge-desc" maxlength="300">'+esc(g.description||'')+'</textarea></div>'+
        '<div class="gld-field"><label>Герб</label><div class="gld-icon-picker" id="ge-icons">'+
            GUILD_ICONS.map(function(ic){return '<button type="button" class="gld-icon-btn-pick'+(g.icon===ic?' selected':'')+'" data-icon="'+ic+'">'+ic+'</button>';}).join('')+
            GUILD_CRESTS.map(function(u){return '<button type="button" class="gld-icon-btn-pick'+(g.icon===u?' selected':'')+'" data-icon="'+u+'"><img src="'+u+'"></button>';}).join('')+
        '</div></div>'+
        '<div class="gld-field"><label>Цвет</label><div class="gld-color-picker">'+
            GUILD_COLORS.map(function(c){return '<button type="button" class="gld-color-btn'+(g.color===c?' selected':'')+'" data-color="'+c+'" style="background:'+c+';"></button>';}).join('')+
        '</div></div>'+
        '<div class="gld-field"><label>Флаг</label><div class="gld-icon-picker" id="ge-flags">'+
            Object.keys(KINGDOMS).map(function(k){return '<button type="button" class="gld-icon-btn-pick'+(g.flag===KINGDOMS[k].flag?' selected':'')+'" data-flag="'+k+'" style="padding:4px;"><img src="'+KINGDOMS[k].flag+'"></button>';}).join('')+
        '</div></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="ge-save">💾 Сохранить</button></div>'+
    '</div>';
    document.body.appendChild(o);
    o.querySelectorAll('#ge-icons .gld-icon-btn-pick').forEach(function(b){b.onclick=function(){o.querySelectorAll('#ge-icons .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('.gld-color-btn').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-color-btn').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelectorAll('.gld-icon-btn-pick[data-flag]').forEach(function(b){b.onclick=function(){o.querySelectorAll('.gld-icon-btn-pick[data-flag]').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');};});
    o.querySelector('#ge-save').onclick=async function(){
        var upd={
            name:o.querySelector('#ge-name').value.trim(),
            motto:o.querySelector('#ge-motto').value.trim(),
            description:o.querySelector('#ge-desc').value.trim(),
            icon:o.querySelector('#ge-icons .selected').dataset.icon,
            color:o.querySelector('.gld-color-btn.selected').dataset.color,
            flag:KINGDOMS[o.querySelector('.gld-icon-btn-pick[data-flag].selected').dataset.flag].flag
        };
        var r=await client.from('guilds').update(upd).eq('id',currentGuildId);
        if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
        toast('✅ Обновлено!','success');
        o.remove();
        await loadData();render();
    };
};

window.gldAddQuest=async function(){
    if(myRank<4){toast('Только R4+','error');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">🎯 Новое задание</h2>'+
        '<div class="gld-field"><label>Название</label><input id="q-title" maxlength="60"></div>'+
        '<div class="gld-field"><label>Описание</label><textarea id="q-desc" maxlength="300"></textarea></div>'+
        '<div class="gld-field"><label>Цель (число)</label><input id="q-goal" type="number" value="100" min="1"></div>'+
        '<div class="gld-field"><label>Награда XP</label><input id="q-xp" type="number" value="50" min="0"></div>'+
        '<div class="gld-field"><label>Награда талантов</label><input id="q-bank" type="number" value="10" min="0"></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="q-save">💾 Создать</button></div>'+
    '</div>';
    document.body.appendChild(o);
    o.querySelector('#q-save').onclick=async function(){
        var title=o.querySelector('#q-title').value.trim();
        if(!title){toast('Введите название','error');return;}
        var r=await client.from('guild_quests').insert([{
            guild_id:currentGuildId,title:title,
            description:o.querySelector('#q-desc').value.trim(),
            goal:parseInt(o.querySelector('#q-goal').value,10)||100,
            reward_xp:parseInt(o.querySelector('#q-xp').value,10)||0,
            reward_bank:parseInt(o.querySelector('#q-bank').value,10)||0,
            created_by:currentUser.id
        }]);
        if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
        toast('✅ Задание создано!','success');o.remove();render();
    };
};

window.gldWriteMessage=async function(){
    if(myRank<4){toast('Только R4+','error');return;}
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">✉️ Письмо всем</h2>'+
        '<div class="gld-field"><label>Тема</label><input id="l-subj" maxlength="80"></div>'+
        '<div class="gld-field"><label>Текст</label><textarea id="l-body" maxlength="2000" style="min-height:140px;"></textarea></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="l-send">✉️ Отправить</button></div>'+
    '</div>';
    document.body.appendChild(o);
    o.querySelector('#l-send').onclick=async function(){
        var subj=o.querySelector('#l-subj').value.trim();
        var body=o.querySelector('#l-body').value.trim();
        if(!subj||!body){toast('Заполните поля','error');return;}
        var r=await client.from('guild_letters').insert([{guild_id:currentGuildId,author_id:currentUser.id,subject:subj,body:body}]);
        if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
        toast('✅ Письмо отправлено!','success');o.remove();render();
    };
};

window.gldBankDeposit=async function(){
    var amount=prompt('Сколько вложить?');
    if(!amount)return;
    amount=parseInt(amount,10);
    if(!amount||amount<=0)return;
    var r=await client.rpc('add_clay_talents',{user_id_arg:currentUser.id,amount:0});
    // Упрощённо: добавляем транзакцию
    await client.from('guild_bank_transactions').insert([{guild_id:currentGuildId,user_id:currentUser.id,amount:-amount,type:'deposit'}]);
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];
    await client.from('guilds').update({bank:(g.bank||0)+amount}).eq('id',currentGuildId);
    toast('💰 Вложено!','success');await loadData();render();
};

window.gldBankWithdraw=async function(){
    if(myRank<4){toast('Только R4+','error');return;}
    var amount=prompt('Сколько снять?');
    if(!amount)return;
    amount=parseInt(amount,10);
    if(!amount||amount<=0)return;
    var g=guilds.filter(function(x){return x.id===currentGuildId;})[0];
    if((g.bank||0)<amount){toast('В казне недостаточно','error');return;}
    await client.from('guild_bank_transactions').insert([{guild_id:currentGuildId,user_id:currentUser.id,amount:amount,type:'withdraw'}]);
    await client.from('guilds').update({bank:(g.bank||0)-amount}).eq('id',currentGuildId);
    toast('💸 Снято','success');await loadData();render();
};

function openEditMember(userId,rank,subtitle){
    var p=profilesMap[userId]||{};var name=p.display_name||p.username||'Аноним';
    var o=document.createElement('div');o.className='gld-modal-bg';
    var maxRank=myRank===5?4:3;
    var rankOpts='';
    [1,2,3,4].forEach(function(r){
        rankOpts+='<button type="button" class="gld-rank-option '+(r===rank?'selected':'')+'" data-rank="'+r+'" '+(r>maxRank?'disabled':'')+'>'+
            '<span class="rank-badge '+RANKS[r].class+'">'+(r===4?'🛡️':'R'+r)+'</span><span>'+RANKS[r].label+'</span></button>';
    });
    var subOpts=SUBTITLES.map(function(s){return '<button type="button" class="gld-icon-btn-pick '+(subtitle===s.id?'selected':'')+'" data-sub="'+s.id+'">'+s.icon+'</button>';}).join('');
    o.innerHTML='<div class="gld-modal">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">⚙️ '+esc(name)+'</h2>'+
        '<div class="gld-field"><label>Ранг</label><div class="gld-rank-picker">'+rankOpts+'</div></div>'+
        '<div class="gld-field" id="sub-wrap" style="'+(rank===4?'':'display:none;')+'"><label>Подтитул</label><div class="gld-icon-picker" id="subs">'+subOpts+'</div></div>'+
        '<div class="gld-modal-actions"><button class="gld-btn secondary" onclick="this.closest(\'.gld-modal-bg\').remove()">Отмена</button><button class="gld-btn primary" id="save">💾 Сохранить</button></div>'+
    '</div>';
    document.body.appendChild(o);
    var selRank=rank,selSub=subtitle||null;
    o.querySelectorAll('.gld-rank-option:not([disabled])').forEach(function(b){
        b.onclick=function(){o.querySelectorAll('.gld-rank-option').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');selRank=parseInt(b.dataset.rank,10);o.querySelector('#sub-wrap').style.display=selRank===4?'':'none';};
    });
    o.querySelectorAll('#subs .gld-icon-btn-pick').forEach(function(b){
        b.onclick=function(){o.querySelectorAll('#subs .gld-icon-btn-pick').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');selSub=b.dataset.sub;};
    });
    o.querySelector('#save').onclick=async function(){var ok=await changeRank(userId,selRank,selRank===4?selSub:null);if(ok)o.remove();};
}

async function showMemberProfile(userId){
    var p=profilesMap[userId];
    if(!p){var r=await client.from('profiles').select('user_id,username,display_name,avatar_url,experience,level,kingdom,bio').eq('user_id',userId).single();if(r&&r.data){p=r.data;profilesMap[userId]=p;}}
    if(!p){toast('Профиль недоступен','error');return;}
    var name=p.display_name||p.username||'Аноним';
    var av=p.avatar_url||avatarFor(name);
    var level=getLevel(p.experience||0);
    var kingdom=KINGDOMS[p.kingdom];
    var flag=kingdom?kingdom.flag:null;
    var isMe=userId===currentUser.id;
    var mem=(membersMap[currentGuildId]||[]).filter(function(x){return x.user_id===userId;})[0];
    var rankInfo=mem?RANKS[mem.rank]||RANKS[1]:RANKS[1];

    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal wide" style="padding:0;">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<div class="gld-profile-modal">'+
            '<div class="gld-profile-left">'+
                '<div class="gld-profile-avatar-wrap">'+
                    '<img src="'+escAttr(av)+'" class="gld-profile-avatar" onerror="this.onerror=null;this.src=\''+avatarFor(name)+'\';">'+
                    '<div class="rank-badge '+rankInfo.class+' gld-profile-rank-badge">'+(mem&&mem.rank===5?'👑':(mem&&mem.rank===4?'🛡️':'R'+(mem?mem.rank:1)))+'</div>'+
                '</div>'+
                '<div class="gld-profile-name">'+esc(name)+'</div>'+
                (flag?'<div class="gld-profile-kingdom"><img src="'+escAttr(flag)+'"> '+esc(p.kingdom)+'</div>':'')+
            '</div>'+
            '<div class="gld-profile-right">'+
                '<h3>'+rankInfo.icon+' '+rankInfo.label+'</h3>'+
                '<div class="gld-profile-stat-row"><span>⭐ Уровень</span><span class="gld-profile-stat-value">'+level.level+'</span></div>'+
                '<div class="gld-profile-stat-row"><span>💎 Опыт</span><span class="gld-profile-stat-value">'+(p.experience||0)+'</span></div>'+
                '<div class="gld-profile-actions">'+
                    (!isMe?'<button class="gld-profile-btn primary" onclick="gldSendPrivate(\''+escAttr(userId)+'\')">💬 Написать</button>':'')+
                    (!isMe?'<button class="gld-profile-btn" onclick="gldAddFriend(\''+escAttr(userId)+'\')">➕ В друзья</button>':'')+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
    document.body.appendChild(o);
}

window.gldSendPrivate=function(userId){
    showPrivateChatModal(userId);
};

async function showPrivateChatModal(userId){
    var p=profilesMap[userId]||{};
    var name=p.display_name||p.username||'Аноним';
    var r=await client.from('private_messages').select('*').or('and(from_user.eq.'+currentUser.id+',to_user.eq.'+userId+'),and(from_user.eq.'+userId+',to_user.eq.'+currentUser.id+')').order('created_at',{ascending:true}).limit(50);
    var msgs=(r&&r.data)||[];
    var o=document.createElement('div');o.className='gld-modal-bg';
    o.innerHTML='<div class="gld-modal wide">'+
        '<button class="gld-modal-close" onclick="this.closest(\'.gld-modal-bg\').remove()">✕</button>'+
        '<h2 class="gld-modal-title">💬 '+esc(name)+'</h2>'+
        '<div style="max-height:400px;overflow-y:auto;padding:12px;background:#f8f9fb;border-radius:12px;margin-bottom:14px;" id="pm-body">'+
            (msgs.length?msgs.map(function(m){
                var isOwn=m.from_user===currentUser.id;
                return '<div class="gld-chat-msg'+(isOwn?' own':'')+'" style="margin-bottom:8px;"><div class="gld-chat-msg-content" style="max-width:80%;">'+
                    '<div class="gld-chat-msg-text" style="'+(isOwn?'':'')+'">'+esc(m.message)+'</div>'+
                    '<div class="gld-chat-msg-time">'+fmtTime(m.created_at)+'</div>'+
                '</div></div>';
            }).join(''):'<p style="text-align:center;color:#999;">Начните диалог</p>')+
        '</div>'+
        '<div class="gld-chat-input">'+
            '<input type="text" id="pm-input" placeholder="Сообщение..." onkeypress="if(event.key===\'Enter\')gldSendPM(\''+escAttr(userId)+'\')">'+
            '<button onclick="gldSendPM(\''+escAttr(userId)+'\')">Отправить</button>'+
        '</div>'+
    '</div>';
    document.body.appendChild(o);
}

window.gldSendPM=async function(userId){
    var input=document.getElementById('pm-input');
    if(!input)return;
    var msg=input.value.trim();if(!msg)return;
    var r=await client.from('private_messages').insert([{from_user:currentUser.id,to_user:userId,message:msg}]);
    if(r.error){toast('Ошибка: '+r.error.message,'error');return;}
    input.value='';
    document.querySelector('.gld-modal-bg').remove();
    showPrivateChatModal(userId);
};

window.gldAddFriend=async function(userId){
    try{
        // Проверяем существующую
        var ex=await client.from('friendships').select('id,status').or('and(user_id.eq.'+currentUser.id+',friend_id.eq.'+userId+'),and(user_id.eq.'+userId+',friend_id.eq.'+currentUser.id+')').maybeSingle();
        if(ex&&ex.data){
            if(ex.data.status==='accepted')toast('Уже друзья','info');
            else toast('Заявка уже отправлена','info');
            return;
        }
        var r=await client.from('friendships').insert([{user_id:currentUser.id,friend_id:userId,status:'pending'}]);
        if(r.error){
            if(r.error.code==='23505')toast('Заявка уже есть','info');
            else toast('Ошибка: '+r.error.message,'error');
            return;
        }
        toast('✅ Заявка отправлена!','success');
        var bg=document.querySelector('.gld-modal-bg');if(bg)bg.remove();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};

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
