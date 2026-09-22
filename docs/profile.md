---
title: Профиль
comments: false
---

<div id="profile-app">
    <div style="text-align:center;padding:60px 20px;">
        <div style="display:inline-block;width:48px;height:48px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:pfSpin .8s linear infinite;"></div>
        <p style="color:#999;margin-top:16px;font-size:0.9rem;">Загрузка профиля...</p>
    </div>
</div>

<style>
:root{--kc:#6C63FF;--kl:#A29BFE;--ks:rgba(108,99,255,.25);--kb:#F0F4FF}
@keyframes pfSpin{to{transform:rotate(360deg)}}
@keyframes pfFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes pfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pfShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pfSlideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes pfGrow{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}
@keyframes pfRing{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes pfGlow{0%,100%{box-shadow:0 0 20px rgba(108,99,255,.4)}50%{box-shadow:0 0 40px rgba(108,99,255,.7)}}

#profile-app{max-width:1100px;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px;contain:layout style}
#profile-app a{text-decoration:none!important;border-bottom:none!important}
.pf-fade{animation:pfFadeIn .5s cubic-bezier(.16,1,.3,1) both}

/* HERO */
.pf-hero{position:relative;background:linear-gradient(135deg,#1a1a2e 0%,#2d1b3d 40%,#4a2a3a 100%);border-radius:24px;padding:44px 40px;color:#fff;margin-bottom:24px;overflow:hidden;box-shadow:0 20px 60px -12px rgba(0,0,0,.4);contain:layout style paint}
.pf-hero::before{content:'';position:absolute;top:-60%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,var(--ks),transparent 70%);border-radius:50%;animation:pfFloat 8s ease-in-out infinite;will-change:transform}
.pf-hero::after{content:'';position:absolute;bottom:-60%;left:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(231,76,60,.15),transparent 70%);border-radius:50%;animation:pfFloat 10s ease-in-out infinite reverse;will-change:transform}
.pf-hero-content{position:relative;z-index:2;display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.pf-avatar-wrap{position:relative;flex-shrink:0}
.pf-avatar-ring{position:absolute;inset:-8px;border:2px dashed var(--kl);border-radius:50%;animation:pfRing 18s linear infinite;opacity:.5}
.pf-avatar{width:120px;height:120px;border-radius:50%;border:4px solid rgba(255,255,255,.4);object-fit:cover;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.2);position:relative;z-index:1;transition:transform .35s}
.pf-avatar-wrap:hover .pf-avatar{transform:scale(1.05)}
.pf-level-badge{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:var(--kc);padding:5px 14px;border-radius:20px;font-size:.72rem;font-weight:800;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.15);border:2px solid rgba(255,255,255,.5);z-index:2}
.pf-info{flex:1;min-width:200px}
.pf-name{font-size:2rem;font-weight:800;margin:0 0 8px 0;color:#fff;display:flex;align-items:center;gap:10px;flex-wrap:wrap;letter-spacing:-.5px}
.pf-role-badge{background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;padding:4px 12px;border-radius:20px;font-size:.7rem;font-weight:800;letter-spacing:.4px;text-transform:uppercase;box-shadow:0 4px 12px rgba(243,156,18,.4)}
.pf-mod-badge{background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;padding:4px 12px;border-radius:20px;font-size:.7rem;font-weight:800;letter-spacing:.4px;text-transform:uppercase;box-shadow:0 4px 14px rgba(231,76,60,.5);animation:pfGlow 2s ease-in-out infinite;border:1px solid rgba(255,255,255,.3)}
.pf-guild-badge{background:rgba(255,255,255,.22);backdrop-filter:blur(8px);color:#fff;padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:700;display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(255,255,255,.35);cursor:pointer;transition:all .25s}
.pf-guild-badge:hover{background:rgba(255,255,255,.32);transform:translateY(-2px)}
.pf-email{font-size:.9rem;opacity:.85;margin:0 0 16px 0}
.pf-stats-row{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px}
.pf-stat-mini{display:flex;flex-direction:column;gap:2px}
.pf-sm-label{font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600}
.pf-sm-value{font-size:1.4rem;font-weight:800;letter-spacing:-.5px}
.pf-progress{background:rgba(255,255,255,.2);border-radius:12px;height:12px;overflow:hidden;margin-bottom:6px;position:relative}
.pf-progress-bar{height:100%;background:linear-gradient(90deg,var(--kl),#fff);border-radius:12px;transition:width 1.2s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px rgba(255,255,255,.6);position:relative}
.pf-progress-bar::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);background-size:200% 100%;animation:pfShine 2s linear infinite}
.pf-progress-text{font-size:.78rem;opacity:.9}

/* QUICK */
.pf-quick-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:24px}
.pf-quick-card{display:flex;align-items:center;gap:12px;padding:16px 18px;background:#fff;border-radius:16px;border:2px solid transparent;color:inherit;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 4px 12px rgba(0,0,0,.05);cursor:pointer;position:relative;overflow:hidden}
.pf-quick-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--kc),transparent);opacity:0;transition:opacity .3s}
.pf-quick-card:hover{transform:translateY(-4px);border-color:var(--kc);box-shadow:0 12px 32px -8px var(--ks)}
.pf-quick-card:hover::before{opacity:1}
.pf-quick-icon{font-size:1.8rem;transition:transform .3s}
.pf-quick-card:hover .pf-quick-icon{transform:scale(1.15) rotate(-6deg)}
.pf-quick-title{font-size:.9rem;font-weight:800;color:#1a1a1a;margin-bottom:2px}
.pf-quick-desc{font-size:.72rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* TABS */
.pf-tabs{display:flex;gap:4px;margin-bottom:20px;overflow-x:auto;padding:6px;background:rgba(255,255,255,.9);border-radius:16px;border:1px solid rgba(0,0,0,.05);scroll-behavior:smooth;cursor:grab;-webkit-overflow-scrolling:touch}
.pf-tabs:active{cursor:grabbing}
.pf-tabs::-webkit-scrollbar{height:4px}
.pf-tabs::-webkit-scrollbar-thumb{background:var(--kc);border-radius:2px}
.pf-tabs::-webkit-scrollbar-track{background:transparent}
.pf-tab{flex-shrink:0;padding:10px 16px;border:none;background:transparent;color:#666;font-size:.85rem;font-weight:700;border-radius:12px;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:6px;font-family:inherit;position:relative}
.pf-tab:hover{background:rgba(0,0,0,.04);color:#333}
.pf-tab.active{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;box-shadow:0 6px 16px -4px var(--ks)}
.pf-tab-count{background:rgba(255,255,255,.25);padding:1px 7px;border-radius:10px;font-size:.7rem}
.pf-tab.active .pf-tab-count{background:rgba(255,255,255,.3)}
.pf-tab.mod-tab{color:#e74c3c}
.pf-tab.mod-tab.active{background:linear-gradient(135deg,#e74c3c,#c0392b);box-shadow:0 6px 16px -4px rgba(231,76,60,.5)}
.pf-tab-content{display:none;animation:pfFadeIn .4s ease}
.pf-tab-content.active{display:block}

/* CARDS */
.pf-card{background:#fff;border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:22px 26px;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:box-shadow .3s,transform .3s}
.pf-card:hover{box-shadow:0 12px 32px -8px var(--ks);transform:translateY(-2px)}
.pf-card-title{font-size:1.1rem;font-weight:800;color:#1a1a1a;margin:0 0 16px 0;display:flex;align-items:center;gap:10px}
.pf-ct-icon{font-size:1.4rem}
.pf-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:30px;border:2px solid var(--kc);background:var(--kc);color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;transition:all .25s;font-family:inherit;text-decoration:none!important;-webkit-tap-highlight-color:transparent}
.pf-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--ks)}
.pf-btn:active{transform:translateY(0) scale(.98)}
.pf-btn-outline{background:transparent;color:var(--kc)}
.pf-btn-outline:hover{background:var(--kc);color:#fff}
.pf-btn-danger{background:#e74c3c;border-color:#e74c3c}
.pf-timer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:16px}
.pf-timer-card{background:linear-gradient(135deg,rgba(108,99,255,.06),rgba(162,155,254,.03));border:1px solid rgba(108,99,255,.15);border-radius:14px;padding:16px 18px;text-align:center;animation:pfSlideUp .4s ease both;transition:transform .3s}
.pf-timer-card:hover{transform:translateY(-3px)}
.pf-timer-value{font-size:1.8rem;font-weight:900;color:var(--kc);line-height:1}
.pf-timer-label{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;margin-top:6px;font-weight:600}
.pf-timer-sub{font-size:.75rem;color:#aaa;margin-top:4px}

/* MODERATION PANEL */
.pf-mod-panel{background:linear-gradient(135deg,rgba(231,76,60,.05),rgba(192,57,43,.03));border:2px solid rgba(231,76,60,.25);border-radius:18px;padding:22px 26px;margin-bottom:18px}
.pf-mod-panel .pf-card-title{color:#c0392b}
.pf-mod-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin-bottom:16px}
.pf-mod-stat{background:#fff;border:2px solid rgba(231,76,60,.15);border-radius:14px;padding:16px 14px;text-align:center;cursor:pointer;transition:all .25s}
.pf-mod-stat:hover{border-color:#e74c3c;transform:translateY(-3px);box-shadow:0 12px 28px -8px rgba(231,76,60,.4)}
.pf-mod-stat-value{font-size:1.8rem;font-weight:900;color:#e74c3c;line-height:1}
.pf-mod-stat-label{font-size:.7rem;color:#888;text-transform:uppercase;letter-spacing:.8px;margin-top:6px;font-weight:700}

/* HEATMAP */
.pf-heatmap{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;margin-top:14px}
.pf-heat-cell{aspect-ratio:1;background:rgba(108,99,255,.08);border-radius:3px;transition:all .25s;cursor:pointer;position:relative}
.pf-heat-cell:hover{transform:scale(1.3);z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.2)}
.pf-heat-cell[data-level="1"]{background:rgba(108,99,255,.25)}
.pf-heat-cell[data-level="2"]{background:rgba(108,99,255,.45)}
.pf-heat-cell[data-level="3"]{background:rgba(108,99,255,.7)}
.pf-heat-cell[data-level="4"]{background:var(--kc);box-shadow:0 0 8px var(--ks)}

/* CHART */
.pf-chart{display:flex;align-items:flex-end;gap:4px;height:100px;margin:20px 0 8px;padding:8px 0;border-bottom:1px dashed rgba(0,0,0,.08)}
.pf-chart-bar{flex:1;background:linear-gradient(180deg,var(--kl),var(--kc));border-radius:4px 4px 0 0;min-height:4px;transition:all .3s;animation:pfGrow .6s cubic-bezier(.16,1,.3,1) both;position:relative;cursor:pointer}
.pf-chart-bar:hover{filter:brightness(1.15);transform:scaleY(1.05)}
.pf-chart-bar::after{content:attr(data-val);position:absolute;bottom:100%;left:50%;transform:translateX(-50%);font-size:.65rem;background:#1a1a2e;color:#fff;padding:2px 6px;border-radius:4px;white-space:nowrap;opacity:0;transition:opacity .2s;pointer-events:none;margin-bottom:4px}
.pf-chart-bar:hover::after{opacity:1}
.pf-chart-labels{display:flex;justify-content:space-between;font-size:.68rem;color:#999;margin-bottom:14px}

/* ACH */
.pf-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.pf-ach{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f8f9fb;border-radius:12px;border:2px solid transparent;transition:all .25s;position:relative;overflow:hidden}
.pf-ach:hover{transform:translateY(-3px);border-color:var(--kc);box-shadow:0 12px 28px -8px var(--ks)}
.pf-ach.locked{opacity:.45;filter:grayscale(.6)}
.pf-ach-icon{font-size:1.8rem;transition:transform .3s}
.pf-ach:hover .pf-ach-icon{transform:scale(1.15) rotate(-8deg)}
.pf-ach-name{font-size:.85rem;font-weight:700;color:#1a1a1a}
.pf-ach-date{font-size:.7rem;color:#888}

/* NOTES */
.pf-notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.pf-note{background:#fff;border-radius:12px;padding:16px;border-left:4px solid var(--note-color,var(--kc));box-shadow:0 4px 12px rgba(0,0,0,.06);transition:all .25s;cursor:pointer;min-height:120px;display:flex;flex-direction:column;animation:pfSlideUp .35s ease both}
.pf-note:hover{transform:translateY(-3px);box-shadow:0 12px 28px -8px var(--ks)}
.pf-note.pinned{box-shadow:0 8px 24px -4px rgba(243,156,18,.4);border-left-color:#f39c12}
.pf-note-title{font-weight:800;font-size:.95rem;color:#1a1a1a;margin-bottom:6px}
.pf-note-content{font-size:.85rem;color:#555;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;flex:1;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.pf-note-date{font-size:.7rem;color:#999;margin-top:8px}
.pf-note-actions{display:flex;gap:4px;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08)}
.pf-note-btn{padding:4px 10px;border-radius:8px;border:none;background:rgba(0,0,0,.05);font-size:.72rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit;color:#666}
.pf-note-btn:hover{background:var(--kc);color:#fff}
.pf-note-btn.danger:hover{background:#e74c3c;color:#fff}

/* NOTIFS */
.pf-notif{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;transition:all .25s;animation:pfSlideUp .3s ease both}
.pf-notif:hover{background:rgba(108,99,255,.08);transform:translateX(4px)}
.pf-notif.unread{border-left:3px solid var(--kc);background:rgba(108,99,255,.06)}
.pf-notif-icon{font-size:1.3rem;flex-shrink:0}
.pf-notif-text{font-size:.88rem;color:#333}
.pf-notif-date{font-size:.72rem;color:#999;margin-top:2px}

/* LEADERBOARD */
.pf-leaderboard{width:100%;border-collapse:collapse;font-size:.88rem}
.pf-leaderboard th{text-align:left;padding:10px 12px;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;border-bottom:2px solid var(--kc)}
.pf-leaderboard td{padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.05);transition:background .2s}
.pf-leaderboard tbody tr{cursor:pointer;transition:all .25s;animation:pfSlideUp .3s ease both}
.pf-leaderboard tbody tr:hover{background:rgba(108,99,255,.05)}
.pf-lb-avatar{width:28px;height:28px;border-radius:50%;vertical-align:middle;margin-right:8px;border:2px solid var(--kc);object-fit:cover}

/* FRIENDS */
.pf-friend{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;transition:all .25s;align-items:center;animation:pfSlideUp .3s ease both}
.pf-friend:hover{background:rgba(108,99,255,.08);transform:translateX(4px)}
.pf-friend-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid var(--kc);flex-shrink:0}

/* GUILD */
.pf-guild-hero{background:linear-gradient(135deg,var(--guild-color,var(--kc)),rgba(0,0,0,.2));border-radius:18px;padding:26px 28px;color:#fff;margin-bottom:16px;display:flex;align-items:center;gap:18px;flex-wrap:wrap;box-shadow:0 12px 32px -8px rgba(0,0,0,.3)}
.pf-guild-icon{width:76px;height:76px;border-radius:18px;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:2px solid rgba(255,255,255,.45);flex-shrink:0;backdrop-filter:blur(6px)}
.pf-guild-name{font-size:1.5rem;font-weight:800;margin:0 0 6px 0}
.pf-guild-meta{font-size:.85rem;opacity:.92;display:flex;gap:14px;flex-wrap:wrap}

/* AI CHAT */
.pf-chat{background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.6));border-radius:16px;padding:16px;max-height:420px;overflow-y:auto;margin-bottom:12px;border:1px solid rgba(0,0,0,.05)}
.pf-chat-msg{margin:6px 0;padding:11px 16px;border-radius:16px;max-width:82%;word-wrap:break-word;font-size:.9rem;line-height:1.5;animation:pfSlideUp .3s ease both}
.pf-chat-msg.user{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;margin-left:auto;border-bottom-right-radius:4px;box-shadow:0 6px 16px -6px var(--ks)}
.pf-chat-msg.bot{background:#fff;color:#333;margin-right:auto;border-bottom-left-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.08);border:1px solid rgba(0,0,0,.04)}
.pf-chat-input{display:flex;gap:8px}
.pf-chat-input input{flex:1;padding:13px 20px;border:2px solid rgba(0,0,0,.08);border-radius:30px;font-size:.9rem;font-family:inherit;outline:none;background:#fff;transition:all .25s;color:#1a1a2e}
.pf-chat-input input:focus{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}
.pf-chat-input button{padding:12px 26px;background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;border:none;border-radius:30px;cursor:pointer;font-weight:800;font-family:inherit;font-size:.9rem;box-shadow:0 6px 16px -6px var(--ks);transition:all .25s}
.pf-chat-input button:hover{transform:translateY(-2px);box-shadow:0 10px 24px -6px var(--ks)}
.pf-chat-input button:active{transform:scale(.98)}

/* TOGGLE */
.pf-toggle{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-toggle:last-child{border-bottom:none}
.pf-toggle-label{font-size:.9rem;color:#333;font-weight:600}
.pf-toggle-desc{font-size:.75rem;color:#888;margin-top:2px}
.pf-switch{position:relative;width:48px;height:26px;background:rgba(0,0,0,.1);border-radius:26px;cursor:pointer;transition:all .3s;flex-shrink:0}
.pf-switch.on{background:linear-gradient(135deg,#27ae60,#16a085)}
.pf-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 6px rgba(0,0,0,.2)}
.pf-switch.on::after{left:25px}
.pf-badge-2fa{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:.8rem;font-weight:800;background:linear-gradient(135deg,#27ae60,#16a085);color:#fff;box-shadow:0 4px 12px rgba(39,174,96,.4)}
.pf-badge-2fa.off{background:rgba(0,0,0,.08);color:#666;box-shadow:none}

/* DEVICE */
.pf-device{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;align-items:center}
.pf-device-icon{font-size:1.5rem;flex-shrink:0}

/* AVATAR GRID */
.pf-avatar-grid{display:flex;gap:12px;flex-wrap:wrap}
.pf-avatar-option{width:60px;height:60px;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s}
.pf-avatar-option:hover{transform:scale(1.1);border-color:var(--kc)}
.pf-avatar-option.selected{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}

/* KINGDOMS */
.pf-kingdom-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px}
.pf-kingdom-btn{padding:10px 12px;border-radius:10px;border:2px solid rgba(0,0,0,.08);background:#fff;cursor:pointer;font-size:.8rem;font-weight:600;transition:all .25s;font-family:inherit;color:#333}
.pf-kingdom-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.1)}
.pf-kingdom-btn.selected{color:#fff;box-shadow:0 6px 16px -4px var(--ks)}

/* MODAL */
.pf-modal-bg{position:fixed;inset:0;background:rgba(10,10,26,.6);backdrop-filter:blur(8px);z-index:999998;display:flex;align-items:center;justify-content:center;padding:20px;animation:pfFadeIn .25s ease}
.pf-modal{background:#fff;border-radius:20px;padding:28px;max-width:440px;width:100%;box-shadow:0 24px 70px -12px rgba(0,0,0,.4);animation:pfSlideUp .35s cubic-bezier(.16,1,.3,1)}
.pf-modal h3{margin:0 0 8px 0;font-size:1.2rem;color:#1a1a2e}
.pf-modal p{margin:0 0 18px 0;color:#666;font-size:.88rem;line-height:1.5}
.pf-modal-input{width:100%;padding:12px 16px;border-radius:12px;border:2px solid #e8eaf0;font-size:.95rem;font-family:inherit;outline:none;background:#fafafa;margin-bottom:12px;box-sizing:border-box;transition:all .25s;color:#1a1a2e}
.pf-modal-input:focus{border-color:var(--kc);background:#fff;box-shadow:0 0 0 4px var(--ks)}
.pf-modal textarea.pf-modal-input{min-height:100px;resize:vertical}
.pf-modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:8px}

/* TOAST */
.pf-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(120px);padding:12px 26px;border-radius:30px;font-weight:700;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:999999;transition:transform .4s cubic-bezier(.16,1,.3,1);color:#fff;max-width:90vw;backdrop-filter:blur(10px)}
.pf-toast.show{transform:translateX(-50%) translateY(0)}
.pf-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.pf-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.pf-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}

.pf-skel{background:linear-gradient(90deg,#f0f0f4 25%,#f8f8fc 50%,#f0f0f4 75%);background-size:200% 100%;animation:pfShine 1.5s ease-in-out infinite;border-radius:14px;margin-bottom:16px}

/* MOBILE */
@media(max-width:600px){
    .pf-hero{padding:28px 22px}
    .pf-avatar{width:90px;height:90px}
    .pf-name{font-size:1.4rem}
    .pf-tabs{padding:4px}
    .pf-tab{padding:8px 12px;font-size:.78rem}
    .pf-card{padding:18px 16px}
    .pf-quick-grid{grid-template-columns:1fr 1fr;gap:8px}
    .pf-quick-card{padding:12px 10px;flex-direction:column;text-align:center;gap:6px}
    .pf-quick-title{font-size:.78rem}
    .pf-quick-desc{display:none}
    .pf-avatar-option{width:52px;height:52px}
    .pf-stats-row{gap:16px}
    .pf-sm-value{font-size:1.15rem}
    .pf-ach-grid{grid-template-columns:1fr}
    .pf-notes-grid{grid-template-columns:1fr}
    .pf-timer-grid{grid-template-columns:1fr 1fr}
    .pf-heatmap{grid-template-columns:repeat(13,1fr);gap:2px}
    .pf-chart{height:70px}
    .pf-mod-stats{grid-template-columns:1fr 1fr}
    .pf-chat-msg{max-width:90%}
}
@media (prefers-reduced-motion: reduce){
    *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
</style>

<script>
(function(){
    'use strict';

    var SUPABASE_URL='https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY='sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF='ncytbgbzfjfoqmmgfygz';
    var SB_KEY='sb-'+PROJECT_REF+'-auth-token';
    var MY_KEY='mars-auth-v1';
    var BACKUP_KEY='mars-auth-backup';
    var PROFILE_CACHE_KEY='mars-profile-cache';
    var GUILD_CACHE_KEY='mars-guild-cache';
    var LEADERS_CACHE_KEY='mars-leaders-cache';
    var ACTIVITY_KEY='mars-activity-v1';
    var XP_HISTORY_KEY='mars-xp-history';
    var CHAT_KEY='mars-ai-chat-history';

    var container=document.getElementById('profile-app');
    if(!container)return;

    // ============================================================
    // SESSION
    // ============================================================
    function getCookie(name){
        try{var cs=document.cookie.split(';');
            for(var i=0;i<cs.length;i++){var c=cs[i].trim();if(c.indexOf(name+'=')===0)return decodeURIComponent(c.substring(name.length+1));}
        }catch(e){}
        return null;
    }
    function readSession(){
        var keys=[MY_KEY,SB_KEY,BACKUP_KEY],i,raw=null;
        for(i=0;i<keys.length;i++){try{raw=localStorage.getItem(keys[i]);if(raw)break;}catch(e){}}
        if(!raw)for(i=0;i<keys.length;i++){try{raw=sessionStorage.getItem(keys[i]);if(raw)break;}catch(e){}}
        if(!raw)for(i=0;i<keys.length;i++){raw=getCookie(keys[i]);if(raw)break;}
        if(!raw)return null;
        try{
            var p=JSON.parse(raw);
            if(Array.isArray(p))p=p[p.length-1];
            if(!p||!p.access_token||!p.user)return null;
            if(p.expires_at&&p.expires_at*1000<Date.now())return null;
            return p;
        }catch(e){return null;}
    }

    // ============================================================
    // CACHE
    // ============================================================
    function readCache(key,ttl){
        try{var raw=localStorage.getItem(key);if(!raw)return null;
            var c=JSON.parse(raw);
            if(!c||Date.now()-c.ts>(ttl||5*60*1000))return null;
            return c.data;
        }catch(e){return null;}
    }
    function writeCache(key,data){
        try{localStorage.setItem(key,JSON.stringify({data:data,ts:Date.now()}));}catch(e){}
    }

    // ============================================================
    // FETCH
    // ============================================================
    async function fetchRetry(url,opts,retries){
        retries=retries==null?2:retries;
        var lastErr;
        for(var i=0;i<=retries;i++){
            try{
                var ctrl=new AbortController();
                var tid=setTimeout(function(){ctrl.abort();},15000);
                var o=Object.assign({},opts,{signal:ctrl.signal});
                var res=await fetch(url,o);
                clearTimeout(tid);return res;
            }catch(e){lastErr=e;if(i<retries)await new Promise(function(r){setTimeout(r,600*(i+1));});}
        }
        throw lastErr;
    }
    async function apiGet(path,token){
        var headers={'apikey':SUPABASE_KEY};
        if(token)headers['Authorization']='Bearer '+token;
        var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{headers:headers},2);
        if(!res.ok)throw new Error('HTTP '+res.status);
        var txt=await res.text();if(!txt)return null;
        try{return JSON.parse(txt);}catch(e){return null;}
    }
    async function apiPost(path,body,token,prefer){
        var headers={'apikey':SUPABASE_KEY,'Content-Type':'application/json'};
        if(token)headers['Authorization']='Bearer '+token;
        if(prefer)headers['Prefer']=prefer;
        var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{method:'POST',headers:headers,body:JSON.stringify(body)},2);
        if(!res.ok)throw new Error('HTTP '+res.status);
        var txt=await res.text();if(!txt)return null;
        try{return JSON.parse(txt);}catch(e){return null;}
    }
    async function apiPatch(path,body,token){
        var headers={'apikey':SUPABASE_KEY,'Content-Type':'application/json'};
        if(token)headers['Authorization']='Bearer '+token;
        var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{method:'PATCH',headers:headers,body:JSON.stringify(body)},2);
        if(!res.ok)throw new Error('HTTP '+res.status);
        return true;
    }
    async function apiDelete(path,token){
        var headers={'apikey':SUPABASE_KEY};
        if(token)headers['Authorization']='Bearer '+token;
        var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{method:'DELETE',headers:headers},2);
        if(!res.ok)throw new Error('HTTP '+res.status);
        return true;
    }

    // ============================================================
    // ACTIVITY
    // ============================================================
    function trackActivity(){
        try{var a=JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'{}');
            var today=new Date().toISOString().slice(0,10);
            a[today]=(a[today]||0)+1;
            var cutoff=new Date(Date.now()-90*86400000).toISOString().slice(0,10);
            Object.keys(a).forEach(function(k){if(k<cutoff)delete a[k];});
            localStorage.setItem(ACTIVITY_KEY,JSON.stringify(a));
            return a;
        }catch(e){return {};}
    }
    function getActivity(){try{return JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'{}');}catch(e){return {};}}

    // ============================================================
    // CONSTANTS
    // ============================================================
    var KINGDOMS={'Аркадия':'#D4A574','Ксанф':'#3D3D3D','Эдем':'#F4A460','Эридания':'#F5D76E','Кхонг':'#A9A9A9','Авсония':'#87CEEB','Кимерия':'#B19CD9','Серпентида':'#E57373','Эритрей':'#64B5F6','Утопия':'#4DD0E1','Эллада':'#FF8A65','Аливасото':'#81C784'};
    var AVATARS=['/assets/images/авотарка%20девушки.png','/assets/images/мужчина.png','/assets/images/мужчина2.png','/assets/images/мужчина%203.png'];
    var LEVEL_TITLES=['🌱 Поселенец','🔭 Исследователь','🚀 Первопроходец','🏠 Колонизатор','⚡ Командир','⚔️ Воин','📜 Писец','🔮 Мудрец','👑 Аристократ','🏛️ Сенатор','💎 Магнат','🌟 Звёздный лорд','🐉 Дракон','🔥 Феникс','🌊 Повелитель морей','⛰️ Владыка гор','🗡️ Мастер клинка','🏹 Мастер лука','🛡️ Щитоносец','🎯 Снайпер'];
    var ALL_ACHIEVEMENTS=[
        {id:1,n:'Первый шаг',i:'👣',d:'Зарегистрироваться'},{id:2,n:'Марсианин',i:'🔴',d:'Выбрать королевство'},
        {id:3,n:'Читатель',i:'📖',d:'5 статей'},{id:4,n:'Эрудит',i:'🎓',d:'50 статей'},
        {id:5,n:'Хранитель',i:'📚',d:'200 статей'},{id:6,n:'Комментатор',i:'💬',d:'Первый комментарий'},
        {id:7,n:'Оратор',i:'🗣️',d:'50 комментариев'},{id:8,n:'Ночной страж',i:'🌙',d:'7 ночей подряд'},
        {id:9,n:'Ранняя пташка',i:'🌅',d:'7 рассветов'},{id:10,n:'Неделя',i:'🔥',d:'7 дней подряд'},
        {id:11,n:'Месяц',i:'💪',d:'30 дней подряд'},{id:12,n:'Год',i:'🏆',d:'365 дней подряд'},
        {id:13,n:'Кузнец',i:'⚒️',d:'10 заметок'},{id:14,n:'Летописец',i:'📜',d:'100 заметок'},
        {id:15,n:'Художник',i:'🎨',d:'5 аватаров'},{id:16,n:'Странник',i:'🧭',d:'10 королевств'},
        {id:17,n:'Мореход',i:'⛵',d:'Все королевства'},{id:18,n:'Дуэлянт',i:'⚔️',d:'10 побед'},
        {id:19,n:'Провидец',i:'🔮',d:'10 гороскопов'},{id:20,n:'Оракул',i:'🧿',d:'100 гороскопов'},
        {id:21,n:'Гурман',i:'🍽️',d:'5 рецептов'},{id:22,n:'Мастер',i:'🎯',d:'10 уровень'},
        {id:23,n:'Грандмастер',i:'👑',d:'50 уровень'},{id:24,n:'Легенда',i:'🌟',d:'100 уровень'}
    ];

    function getLevel(exp){
        exp=exp||0;var level=1;
        while(level<100&&exp>=Math.floor(Math.pow(level+1,1.8)*20))level++;
        var curXp=Math.floor(Math.pow(level,1.8)*20);
        var nextXp=Math.floor(Math.pow(level+1,1.8)*20);
        var pct=nextXp>curXp?Math.min(((exp-curXp)/(nextXp-curXp))*100,100):100;
        return{level:level,title:LEVEL_TITLES[level-1]||('Уровень '+level),current:curXp,next:nextXp,percent:pct};
    }
    function escapeHtml(s){
        return String(s||'').replace(/[&<>"']/g,function(m){
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
        });
    }
    function showToast(msg,type){
        type=type||'info';
        var t=document.createElement('div');
        t.className='pf-toast '+type;t.textContent=msg;
        document.body.appendChild(t);
        requestAnimationFrame(function(){t.classList.add('show');});
        setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},400);},2500);
    }

    // ============================================================
    // MODAL
    // ============================================================
    function showModal(opts){
        var bg=document.createElement('div');bg.className='pf-modal-bg';
        var m=document.createElement('div');m.className='pf-modal';
        var fieldsHtml='';
        (opts.fields||[]).forEach(function(f){
            var val=escapeHtml(f.value||'');
            if(f.type==='textarea'){
                fieldsHtml+='<textarea class="pf-modal-input" id="m-'+f.name+'" placeholder="'+escapeHtml(f.placeholder||'')+'" maxlength="'+(f.max||5000)+'">'+val+'</textarea>';
            }else{
                fieldsHtml+='<input type="'+(f.type||'text')+'" class="pf-modal-input" id="m-'+f.name+'" placeholder="'+escapeHtml(f.placeholder||'')+'" value="'+val+'" maxlength="'+(f.max||200)+'">';
            }
        });
        m.innerHTML='<h3>'+escapeHtml(opts.title||'')+'</h3>'+(opts.sub?'<p>'+escapeHtml(opts.sub)+'</p>':'')+fieldsHtml+
            '<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" id="m-cancel">Отмена</button><button class="pf-btn" id="m-ok">'+escapeHtml(opts.okText||'Сохранить')+'</button></div>';
        bg.appendChild(m);document.body.appendChild(bg);
        function close(){bg.remove();}
        bg.addEventListener('click',function(e){if(e.target===bg)close();});
        m.querySelector('#m-cancel').onclick=close;
        var first=m.querySelector('.pf-modal-input');
        if(first)setTimeout(function(){first.focus();if(first.select)first.select();},100);
        m.querySelector('#m-ok').onclick=function(){
            var vals={};(opts.fields||[]).forEach(function(f){var el=m.querySelector('#m-'+f.name);vals[f.name]=el?el.value.trim():'';});
            close();if(opts.onOk)opts.onOk(vals);
        };
        m.addEventListener('keydown',function(e){
            if(e.key==='Enter'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();m.querySelector('#m-ok').click();}
            if(e.key==='Escape')close();
        });
    }

    // ============================================================
    // STATE
    // ============================================================
    var currentUser=null,currentProfile=null;
    var kingdomColor='#6C63FF';
    var achievements=[],notes=[],notifications=[],leaders=[],friends=[];
    var guild=null,guildMembers=[];
    var modStats={pendingSubmissions:0,hiddenComments:0,bannedUsers:0};
    var streak=0,editingNoteId=null,selectedNoteColor='#6C63FF';
    var totalTime=0,sessionStart=Date.now(),_isActive=true;
    var chatHistory=[];
    try{var st=localStorage.getItem('mars_total_time');if(st)totalTime=parseInt(st,10)||0;}catch(e){}
    try{chatHistory=JSON.parse(localStorage.getItem(CHAT_KEY)||'[]');}catch(e){chatHistory=[];}

    function isModerator(){return currentProfile&&(currentProfile.role==='moderator'||currentProfile.role==='admin');}

    setInterval(function(){
        if(!_isActive)return;
        totalTime++;
        if(totalTime%5===0)try{localStorage.setItem('mars_total_time',totalTime);}catch(e){}
        var el=document.getElementById('pf-timer-total');if(el)el.textContent=formatDuration(totalTime);
        var el2=document.getElementById('pf-timer-session');if(el2)el2.textContent=formatDuration(Math.floor((Date.now()-sessionStart)/1000));
    },1000);
    document.addEventListener('visibilitychange',function(){_isActive=!document.hidden;});
    function formatDuration(s){
        var h=Math.floor(s/3600),m=Math.floor((s%3600)/60);
        if(h>0)return h+'ч '+m+'м';
        if(m>0)return m+'м';
        return s+'с';
    }
    function getMartianDate(){
        var months=['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];
        var days=[31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];
        var MD=days.reduce(function(s,d){return s+d;},0);
        var EY=668.6;var now=new Date();
        var daysFrom=(now-new Date(2026,0,1))/86400000;
        var year=Math.floor(3798000000+2740+daysFrom/EY);
        var dayOfYear=Math.floor((daysFrom*(MD/EY))%MD);
        var rem=dayOfYear,mi=0;
        for(var i=0;i<days.length;i++){if(rem<days[i]){mi=i;break;}rem-=days[i];}
        var seasons=['Пробуждение','Цветение','Зной','Ветры','Угасание','Заморозки','Тьма','Ледяной покров'];
        return{year:year.toLocaleString(),month:months[mi],day:rem+1,season:seasons[Math.floor(mi/2)%seasons.length]};
    }

    // ============================================================
    // RENDER
    // ============================================================
    function render(){
        if(!currentProfile||!currentUser)return;
        try{
            var kc=KINGDOMS[currentProfile.kingdom]||'#6C63FF';
            kingdomColor=kc;
            document.documentElement.style.setProperty('--kc',kc);
            document.documentElement.style.setProperty('--kl',kc+'cc');
            document.documentElement.style.setProperty('--ks',kc+'40');
            document.documentElement.style.setProperty('--kb',kc+'15');
        }catch(e){}

        var lvl=getLevel(currentProfile.experience||0);
        var displayName=currentProfile.display_name||currentProfile.username||(currentUser.email||'').split('@')[0];
        var avatar=currentProfile.avatar_url||AVATARS[0];
        var md=getMartianDate();
        var xpLeft=Math.max(lvl.next-(currentProfile.experience||0),0);
        var mod=isModerator();

        var html='';

        // HERO
        html+='<div class="pf-hero pf-fade"><div class="pf-hero-content">';
        html+='<div class="pf-avatar-wrap"><div class="pf-avatar-ring"></div><img src="'+avatar+'" alt="" class="pf-avatar" loading="eager"><div class="pf-level-badge">'+lvl.title+' · ур. '+lvl.level+'</div></div>';
        html+='<div class="pf-info">';
        html+='<h1 class="pf-name">'+escapeHtml(displayName);
        if(mod)html+=' <span class="pf-mod-badge">🛡️ Модератор</span>';
        if(guild)html+=' <span class="pf-guild-badge" onclick="pfSetTab(\'guild\')">'+(guild.icon||'🏰')+' '+escapeHtml(guild.name)+'</span>';
        html+='</h1>';
        html+='<p class="pf-email">'+escapeHtml(currentUser.email||'')+'</p>';
        html+='<div class="pf-stats-row">';
        html+='<div class="pf-stat-mini"><span class="pf-sm-label">Уровень</span><span class="pf-sm-value">⭐ '+lvl.level+'</span></div>';
        html+='<div class="pf-stat-mini"><span class="pf-sm-label">Опыт</span><span class="pf-sm-value">💎 '+(currentProfile.experience||0)+'</span></div>';
        html+='<div class="pf-stat-mini"><span class="pf-sm-label">Награды</span><span class="pf-sm-value">🏆 '+achievements.length+'</span></div>';
        if(streak>0)html+='<div class="pf-stat-mini"><span class="pf-sm-label">Серия</span><span class="pf-sm-value">🔥 '+streak+'</span></div>';
        html+='</div>';
        html+='<div class="pf-progress"><div class="pf-progress-bar" style="width:'+lvl.percent+'%;"></div></div>';
        html+='<div class="pf-progress-text">До уровня '+(lvl.level+1)+': '+xpLeft+' XP</div>';
        html+='</div></div></div>';

        // QUICK
        html+='<div class="pf-quick-grid pf-fade" style="animation-delay:.05s;">';
        var quicks=[
            {href:'/achievements/',icon:'🏅',title:'Достижения',desc:'Все награды'},
            {href:'/bookmarks/',icon:'📚',title:'Закладки',desc:'Сохранённое'},
            {href:'/quests/',icon:'🗺️',title:'Квесты',desc:'Задания'},
            {href:'/interactive/',icon:'🎮',title:'Интерактив',desc:'Игры'},
            {href:'/names/',icon:'📛',title:'Имена',desc:'Марсианские'},
            {href:'/sky/',icon:'🌌',title:'Небо',desc:'Симулятор'},
            {href:'/museum/',icon:'🏛️',title:'Музей',desc:'Виртуальный'},
            {href:'/forum/',icon:'💬',title:'Форум',desc:'Общение'}
        ];
        if(mod)quicks.unshift({href:'/lists/moderation/',icon:'🛡️',title:'Модерация',desc:'Панель управления'});
        quicks.forEach(function(q){
            html+='<a href="'+q.href+'" class="pf-quick-card"><div class="pf-quick-icon">'+q.icon+'</div><div class="pf-quick-body"><div class="pf-quick-title">'+q.title+'</div><div class="pf-quick-desc">'+q.desc+'</div></div></a>';
        });
        html+='</div>';

        // TABS
        var tabs=[
            {id:'overview',icon:'👤',label:'Обзор'},
            {id:'activity',icon:'📊',label:'Активность'}
        ];
        if(mod)tabs.push({id:'moderation',icon:'🛡️',label:'Модерация',count:modStats.pendingSubmissions,cls:'mod-tab'});
        tabs.push(
            {id:'guild',icon:'🏰',label:'Гильдия'},
            {id:'achievements',icon:'🏅',label:'Достижения',count:achievements.length},
            {id:'notes',icon:'📝',label:'Заметки',count:notes.length},
            {id:'friends',icon:'👥',label:'Друзья',count:friends.length},
            {id:'ai',icon:'🤖',label:'ИИ'},
            {id:'notifications',icon:'🔔',label:'Уведомления'},
            {id:'leaderboard',icon:'🏆',label:'Лидеры'},
            {id:'security',icon:'🔐',label:'Безопасность'},
            {id:'settings',icon:'⚙️',label:'Настройки'}
        );
        html+='<div class="pf-tabs pf-fade" id="pf-tabs" style="animation-delay:.1s;">';
        tabs.forEach(function(t,i){
            html+='<button class="pf-tab '+(t.cls||'')+(i===0?' active':'')+'" data-tab="'+t.id+'">'+t.icon+' '+t.label+(t.count?' <span class="pf-tab-count">'+t.count+'</span>':'')+'</button>';
        });
        html+='</div>';

        // OVERVIEW
        html+='<div class="pf-tab-content active" data-content="overview">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>';
        html+='<p style="margin:0 0 12px 0;color:#555;font-size:.95rem;line-height:1.6;" id="pf-bio">'+escapeHtml(currentProfile.bio||'✍️ Ещё ничего не рассказал о себе.')+'</p>';
        html+='<button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button></div>';

        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>';
        html+='<div class="pf-calendar" style="text-align:center;padding:20px;background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.4));border-radius:14px;border:1px solid rgba(0,0,0,.05);">';
        html+='<div style="font-size:1.2rem;font-weight:800;color:var(--kc);margin-bottom:4px;">'+md.month+'</div>';
        html+='<div style="font-size:2.5rem;font-weight:900;color:#1a1a1a;line-height:1;margin:6px 0;">'+md.day+'</div>';
        html+='<div style="font-size:.9rem;color:#666;font-weight:600;">Год '+md.year+' Э.О.</div>';
        html+='<div style="display:inline-block;margin-top:12px;padding:5px 16px;background:var(--kc);color:#fff;border-radius:20px;font-size:.78rem;font-weight:700;">'+md.season+'</div>';
        html+='</div></div>';
        html+='</div>';

        // ACTIVITY
        html+='<div class="pf-tab-content" data-content="activity">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">⏱️</span> Время на сайте</h3>';
        html+='<div class="pf-timer-grid">';
        html+='<div class="pf-timer-card"><div class="pf-timer-value" id="pf-timer-session">0с</div><div class="pf-timer-label">Сессия</div><div class="pf-timer-sub">Сейчас</div></div>';
        html+='<div class="pf-timer-card"><div class="pf-timer-value" id="pf-timer-total">'+formatDuration(totalTime)+'</div><div class="pf-timer-label">Всего</div><div class="pf-timer-sub">За всё время</div></div>';
        html+='<div class="pf-timer-card"><div class="pf-timer-value">'+streak+'</div><div class="pf-timer-label">Серия</div><div class="pf-timer-sub">Дней подряд</div></div>';
        html+='<div class="pf-timer-card"><div class="pf-timer-value">'+Object.keys(getActivity()).length+'</div><div class="pf-timer-label">Дней</div><div class="pf-timer-sub">Всего</div></div>';
        html+='</div></div>';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔥</span> Активность за 90 дней</h3>';
        html+='<div id="pf-heatmap-wrap">'+renderHeatmap()+'</div>';
        html+='<div style="display:flex;justify-content:space-between;font-size:.7rem;color:#aaa;margin-top:8px;"><span>90 дней назад</span><span>Сегодня</span></div>';
        html+='</div>';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📈</span> XP за 14 дней</h3>';
        html+='<div id="pf-chart-wrap">'+renderXPChart()+'</div></div>';
        html+='</div>';

        // MODERATION
        if(mod){
            html+='<div class="pf-tab-content" data-content="moderation">';
            html+='<div class="pf-mod-panel">';
            html+='<h3 class="pf-card-title"><span class="pf-ct-icon">🛡️</span> Центр модерации</h3>';
            html+='<div class="pf-mod-stats">';
            html+='<div class="pf-mod-stat" onclick="location.href=\'/lists/moderation/\'"><div class="pf-mod-stat-value">'+modStats.pendingSubmissions+'</div><div class="pf-mod-stat-label">Заявок</div></div>';
            html+='<div class="pf-mod-stat" onclick="location.href=\'/lists/moderation/\'"><div class="pf-mod-stat-value">'+modStats.hiddenComments+'</div><div class="pf-mod-stat-label">Скрытых</div></div>';
            html+='<div class="pf-mod-stat" onclick="location.href=\'/lists/moderation/\'"><div class="pf-mod-stat-value">'+modStats.bannedUsers+'</div><div class="pf-mod-stat-label">Забанено</div></div>';
            html+='</div>';
            html+='<a href="/lists/moderation/" class="pf-btn">🛡️ Открыть панель модерации</a>';
            html+='</div></div>';
        }

        // GUILD
        html+='<div class="pf-tab-content" data-content="guild">';
        if(guild){
            html+='<div class="pf-guild-hero" style="--guild-color:'+(guild.color||kingdomColor)+';">';
            html+='<div class="pf-guild-icon">'+(guild.icon||'🏰')+'</div>';
            html+='<div style="flex:1;min-width:150px;">';
            html+='<h2 class="pf-guild-name">'+escapeHtml(guild.name)+'</h2>';
            html+='<div class="pf-guild-meta"><span>👥 '+guildMembers.length+' участников</span></div>';
            html+='</div></div>';
            html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📜</span> Описание</h3>';
            html+='<p style="margin:0;color:#555;line-height:1.6;">'+escapeHtml(guild.description||'Без описания')+'</p></div>';
            html+='<div class="pf-card"><a href="/guilds/" class="pf-btn pf-btn-outline">🏰 Перейти в гильдии</a>';
            if(guild.leader_id===currentUser.id)html+='<button class="pf-btn pf-btn-danger" style="margin-left:8px;" onclick="pfDeleteGuild()">🗑️ Удалить гильдию</button>';
            html+='</div>';
        }else{
            html+='<div class="pf-card" style="text-align:center;padding:50px 20px;"><div style="font-size:4rem;margin-bottom:12px;">🏰</div><h3 style="margin:0 0 8px 0;">Вы пока не в гильдии</h3><p style="color:#888;margin:0 0 16px 0;">Вступайте в гильдии, чтобы объединяться с другими</p><a href="/guilds/" class="pf-btn">🔍 Найти гильдию</a></div>';
        }
        html+='</div>';

        // ACHIEVEMENTS
        html+='<div class="pf-tab-content" data-content="achievements">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏅</span> Достижения ('+achievements.length+'/'+ALL_ACHIEVEMENTS.length+')</h3>';
        html+='<div class="pf-progress" style="background:rgba(108,99,255,.1);height:10px;margin-bottom:16px;"><div class="pf-progress-bar" style="width:'+Math.round(achievements.length/ALL_ACHIEVEMENTS.length*100)+'%;"></div></div>';
        html+='<div class="pf-ach-grid">';
        ALL_ACHIEVEMENTS.forEach(function(a){
            var earned=achievements.find(function(x){return x.achievement_id===a.id||x.name===a.n;});
            html+='<div class="pf-ach'+(earned?'':' locked')+'"><div class="pf-ach-icon">'+(earned?a.i:'🔒')+'</div><div><div class="pf-ach-name">'+escapeHtml(a.n)+'</div><div class="pf-ach-date">'+(earned?(earned.earned_at?new Date(earned.earned_at).toLocaleDateString('ru-RU'):'Получено'):escapeHtml(a.d))+'</div></div></div>';
        });
        html+='</div></div></div>';

        // NOTES
        html+='<div class="pf-tab-content" data-content="notes">';
        html+='<div class="pf-card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;"><h3 class="pf-card-title" style="margin:0;"><span class="pf-ct-icon">📝</span> Заметки ('+notes.length+')</h3><button class="pf-btn" onclick="pfOpenNoteForm()">➕ Новая</button></div>';
        if(notes.length===0){
            html+='<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет заметок.</p>';
        }else{
            html+='<div class="pf-notes-grid">';
            notes.forEach(function(n,i){
                html+='<div class="pf-note'+(n.pinned?' pinned':'')+'" style="--note-color:'+(n.color||'#6C63FF')+';animation-delay:'+(i*.04)+'s;" onclick="pfEditNote('+n.id+')">';
                html+='<div class="pf-note-title">'+(n.pinned?'📌 ':'')+escapeHtml(n.title||'Заметка')+'</div>';
                html+='<div class="pf-note-content">'+escapeHtml(n.content)+'</div>';
                html+='<div class="pf-note-date">'+new Date(n.updated_at||n.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div>';
                html+='<div class="pf-note-actions" onclick="event.stopPropagation();">';
                html+='<button class="pf-note-btn" onclick="pfPinNote('+n.id+')">'+(n.pinned?'📍':'📌')+'</button>';
                html+='<button class="pf-note-btn" onclick="pfEditNote('+n.id+')">✏️</button>';
                html+='<button class="pf-note-btn danger" onclick="pfDeleteNote('+n.id+')">🗑️</button>';
                html+='</div></div>';
            });
            html+='</div>';
        }
        html+='</div></div>';

        // FRIENDS
        html+='<div class="pf-tab-content" data-content="friends">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👥</span> Друзья ('+friends.length+')</h3>';
        if(friends.length===0){
            html+='<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет друзей.</p>';
        }else{
            friends.forEach(function(f,i){
                var name=f.other.display_name||f.other.username||'Аноним';
                var av=f.other.avatar_url||'https://ui-avatars.com/api/?name='+encodeURIComponent(name)+'&background=6C63FF&color=fff&size=64&rounded=true';
                var status=f.status==='accepted'?'👥 Друзья':'⏳ Заявка';
                html+='<div class="pf-friend" style="animation-delay:'+(i*.04)+'s;"><img src="'+av+'" class="pf-friend-avatar" loading="lazy"><div style="flex:1;min-width:0;"><div style="font-weight:700;">'+escapeHtml(name)+'</div><div style="font-size:.78rem;color:#888;">'+status+'</div></div></div>';
            });
        }
        html+='</div></div>';

        // AI
        html+='<div class="pf-tab-content" data-content="ai">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🤖</span> ИИ-гид</h3>';
        html+='<div class="pf-chat" id="pf-chat-container">';
        if(chatHistory.length===0){
            html+='<div class="pf-chat-msg bot">Привет! Я ИИ-гид по миру «Письмо из Красной пыли». Спрашивай о Марсе, королевствах, персонажах, истории! 🪐</div>';
        }else{
            chatHistory.slice(-20).forEach(function(m){
                html+='<div class="pf-chat-msg '+(m.role==='user'?'user':'bot')+'">'+escapeHtml(m.text)+'</div>';
            });
        }
        html+='</div>';
        html+='<div class="pf-chat-input"><input type="text" id="pf-chat-input" placeholder="Спросите о Марсе..." onkeypress="if(event.key===\'Enter\')pfSendChat()"><button onclick="pfSendChat()">➤</button></div>';
        html+='</div></div>';

        // NOTIFS
        html+='<div class="pf-tab-content" data-content="notifications">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Уведомления ('+notifications.length+')</h3>';
        if(notifications.length===0){
            html+='<p style="text-align:center;color:#888;padding:40px 20px;">Уведомлений пока нет.</p>';
        }else{
            notifications.forEach(function(n,i){
                var isUnread=!n.read;
                html+='<div class="pf-notif'+(isUnread?' unread':'')+'" style="animation-delay:'+(i*.03)+'s;"><div class="pf-notif-icon">📬</div><div><div class="pf-notif-text">'+escapeHtml(n.message||n.text||'')+'</div><div class="pf-notif-date">'+new Date(n.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div></div></div>';
            });
        }
        html+='</div></div>';

        // LEADERBOARD
        html+='<div class="pf-tab-content" data-content="leaderboard">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10 по опыту</h3>';
        if(leaders.length===0){
            html+='<p style="text-align:center;color:#888;padding:40px 20px;">Таблица лидеров недоступна. Возможно, нет данных.</p>';
        }else{
            html+='<table class="pf-leaderboard"><thead><tr><th>#</th><th>Участник</th><th style="text-align:right;">Ур.</th><th style="text-align:right;">XP</th></tr></thead><tbody>';
            leaders.forEach(function(l,i){
                var nm=l.display_name||l.username||'Аноним';
                var medals=['🥇','🥈','🥉'];
                var isMe=l.user_id===currentUser.id;
                html+='<tr style="'+(isMe?'background:'+kingdomColor+';color:#fff;font-weight:700;':'')+'animation-delay:'+(i*.04)+'s;"><td>'+(medals[i]||(i+1))+'</td><td><img src="'+(l.avatar_url||'https://ui-avatars.com/api/?name='+encodeURIComponent(nm)+'&background=6C63FF&color=fff&size=64')+'" class="pf-lb-avatar" loading="lazy">'+escapeHtml(nm)+(isMe?' (вы)':'')+'</td><td style="text-align:right;">'+(l.level||getLevel(l.experience||0).level)+'</td><td style="text-align:right;"><b>'+(l.experience||0)+'</b></td></tr>';
            });
            html+='</tbody></table>';
        }
        html+='</div></div>';

        // SECURITY
        html+='<div class="pf-tab-content" data-content="security">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📧</span> Email-2FA</h3>';
        html+='<div id="pf-2fa-status" style="margin-bottom:20px;"></div>';
        html+='<div class="pf-toggle"><div><div class="pf-toggle-label">🔐 Email-2FA</div><div class="pf-toggle-desc">Запрашивать код при входе с новых устройств</div></div><div class="pf-switch" id="pf-switch-2fa" onclick="pfToggle2FA()"></div></div>';
        html+='</div>';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📱</span> Доверенные устройства</h3>';
        html+='<div id="pf-trusted-devices"><p style="color:#888;">Загрузка...</p></div>';
        html+='<button class="pf-btn pf-btn-outline" onclick="pfClearTrustedDevices()" style="margin-top:12px;">🗑️ Удалить все</button>';
        html+='</div>';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔑</span> Смена пароля</h3>';
        html+='<button class="pf-btn" onclick="pfChangePassword()">🔐 Сменить пароль</button>';
        html+='</div></div>';

        // SETTINGS
        html+='<div class="pf-tab-content" data-content="settings">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👤</span> Имя</h3>';
        html+='<p style="color:#555;margin:0 0 12px 0;">Текущее: <b id="pf-display-name">'+escapeHtml(displayName)+'</b></p>';
        html+='<button class="pf-btn pf-btn-outline" onclick="pfEditName()">✏️ Изменить</button></div>';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🖼️</span> Аватар</h3>';
        html+='<div class="pf-avatar-grid">';
        AVATARS.forEach(function(url){
            html+='<img src="'+url+'" alt="" class="pf-avatar-option'+(avatar===url?' selected':'')+'" onclick="pfSelectAvatar(\''+url+'\')" loading="lazy">';
        });
        html+='</div></div>';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏰</span> Королевство</h3>';
        html+='<div class="pf-kingdom-grid">';
        Object.keys(KINGDOMS).forEach(function(name){
            var sel=currentProfile.kingdom===name;
            var col=KINGDOMS[name];
            html+='<button class="pf-kingdom-btn'+(sel?' selected':'')+'" style="'+(sel?'background:'+col+';border-color:'+col+';':'')+'" onclick="pfSelectKingdom(\''+name+'\')">'+name+'</button>';
        });
        html+='</div></div>';
        html+='<div class="pf-card" style="background:rgba(231,76,60,.05);border:2px solid rgba(231,76,60,.2);"><h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">⚠️</span> Опасная зона</h3>';
        html+='<button class="pf-btn pf-btn-danger" onclick="pfDeleteAccount()">🗑️ Удалить аккаунт</button></div>';
        html+='<div class="pf-card"><button class="pf-btn pf-btn-outline" onclick="pfLogout()" style="width:100%;justify-content:center;">🚪 Выйти</button></div>';
        html+='</div>';

        container.innerHTML=html;
        attachTabsEvents();

        // Подгружаем 2FA при первом входе на вкладку
        if(document.querySelector('[data-content="security"]'))render2FATab();
    }

    function renderHeatmap(){
        var a=getActivity();
        var cells=[];
        var max=Math.max.apply(null,Object.values(a).concat([1]));
        for(var i=89;i>=0;i--){
            var d=new Date(Date.now()-i*86400000);
            var key=d.toISOString().slice(0,10);
            var v=a[key]||0;
            var lvl=0;
            if(v>0)lvl=Math.min(4,Math.ceil((v/max)*4));
            cells.push('<div class="pf-heat-cell" data-level="'+lvl+'" title="'+d.toLocaleDateString('ru-RU')+': '+v+' визитов"></div>');
        }
        return '<div class="pf-heatmap">'+cells.join('')+'</div>';
    }

    function renderXPChart(){
        var h=JSON.parse(localStorage.getItem(XP_HISTORY_KEY)||'{}');
        var days=[];var max=1;
        for(var i=13;i>=0;i--){
            var d=new Date(Date.now()-i*86400000);
            var key=d.toISOString().slice(0,10);
            var v=h[key]||0;
            if(v>max)max=v;
            days.push({key:key,v:v,date:d});
        }
        var bars=days.map(function(d,i){
            var pct=max>0?(d.v/max)*100:0;
            var hh=Math.max(pct,3);
            return '<div class="pf-chart-bar" style="height:'+hh+'%;animation-delay:'+(i*.05)+'s;" data-val="+'+d.v+' XP" title="'+d.date.toLocaleDateString('ru-RU')+': '+d.v+' XP"></div>';
        }).join('');
        var labels='<div class="pf-chart-labels"><span>'+days[0].date.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})+'</span><span>'+days[13].date.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})+'</span></div>';
        return '<div class="pf-chart">'+bars+'</div>'+labels;
    }

    // ============================================================
    // TABS
    // ============================================================
    function attachTabsEvents(){
        var w=document.getElementById('pf-tabs');
        if(!w)return;
        w.addEventListener('wheel',function(e){
            if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();w.scrollLeft+=e.deltaY*1.5;}
        },{passive:false});
        var isDown=false,startX=0,startScroll=0;
        w.addEventListener('mousedown',function(e){
            if(e.target.classList.contains('pf-tab'))return;
            isDown=true;startX=e.pageX;startScroll=w.scrollLeft;w.style.cursor='grabbing';
        });
        document.addEventListener('mouseup',function(){isDown=false;if(w)w.style.cursor='';});
        document.addEventListener('mousemove',function(e){
            if(!isDown)return;e.preventDefault();
            w.scrollLeft=startScroll-(e.pageX-startX);
        });
        w.querySelectorAll('.pf-tab').forEach(function(tab){
            tab.onclick=function(){pfSetTab(tab.dataset.tab);};
        });
    }

    window.pfSetTab=function(tab){
        document.querySelectorAll('.pf-tab').forEach(function(t){
            var on=t.dataset.tab===tab;
            t.classList.toggle('active',on);
            if(on&&t.scrollIntoView)t.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
        });
        document.querySelectorAll('.pf-tab-content').forEach(function(c){
            c.classList.toggle('active',c.dataset.content===tab);
        });
        if(tab==='security')render2FATab();
    };

    document.addEventListener('keydown',function(e){
        if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
        if(e.ctrlKey||e.metaKey||e.altKey)return;
        var n=parseInt(e.key,10);
        if(n>=1&&n<=9){
            var tabs=document.querySelectorAll('.pf-tab');
            if(tabs[n-1])pfSetTab(tabs[n-1].dataset.tab);
        }
    });

    // ============================================================
    // ACTIONS
    // ============================================================
    window.pfLogout=function(){
        [MY_KEY,SB_KEY,BACKUP_KEY,PROFILE_CACHE_KEY,GUILD_CACHE_KEY,LEADERS_CACHE_KEY].forEach(function(k){
            try{localStorage.removeItem(k);}catch(e){}
            try{sessionStorage.removeItem(k);}catch(e){}
        });
        try{document.cookie=MY_KEY+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';}catch(e){}
        try{document.cookie=SB_KEY+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';}catch(e){}
        window.location.href='/';
    };

    window.pfEditBio=function(){
        showModal({
            title:'Биография',sub:'Расскажите о себе',
            fields:[{name:'bio',type:'textarea',value:currentProfile.bio||'',placeholder:'Пара слов о себе...',max:1000}],
            onOk:async function(v){
                try{
                    await apiPatch('profiles?user_id=eq.'+currentUser.id,{bio:v.bio},currentUser._token);
                    currentProfile.bio=v.bio;
                    var el=document.getElementById('pf-bio');
                    if(el)el.textContent=v.bio||'✍️ Ещё ничего не рассказал о себе.';
                    writeCache(PROFILE_CACHE_KEY,{user:currentUser.user,profile:currentProfile});
                    showToast('✅ Обновлено!','success');
                }catch(e){showToast('Ошибка: '+e.message,'error');}
            }
        });
    };

    window.pfEditName=function(){
        var cur=currentProfile.display_name||currentProfile.username||'';
        showModal({
            title:'Новое имя',sub:'От 2 до 20 символов',
            fields:[{name:'name',value:cur,placeholder:'Ваше имя',max:20}],
            onOk:async function(v){
                if(!v.name||v.name.length<2||v.name.length>20){showToast('2–20 символов','error');return;}
                try{
                    await apiPatch('profiles?user_id=eq.'+currentUser.id,{display_name:v.name},currentUser._token);
                    currentProfile.display_name=v.name;
                    showToast('✅ Обновлено!','success');
                    setTimeout(function(){location.reload();},400);
                }catch(e){showToast('Ошибка: '+e.message,'error');}
            }
        });
    };

    window.pfSelectAvatar=async function(url){
        if(currentProfile.avatar_url===url)return;
        try{
            await apiPatch('profiles?user_id=eq.'+currentUser.id,{avatar_url:url},currentUser._token);
            currentProfile.avatar_url=url;
            var hero=container.querySelector('.pf-avatar');
            if(hero)hero.src=url;
            document.querySelectorAll('.pf-avatar-option').forEach(function(img){
                img.classList.toggle('selected',img.getAttribute('src')===url);
            });
            showToast('✅ Аватар обновлён!','success');
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    window.pfSelectKingdom=async function(name){
        if(currentProfile.kingdom===name)return;
        try{
            await apiPatch('profiles?user_id=eq.'+currentUser.id,{kingdom:name},currentUser._token);
            currentProfile.kingdom=name;
            showToast('✅ '+name,'success');
            setTimeout(function(){location.reload();},400);
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    window.pfDeleteAccount=function(){
        showModal({
            title:'⚠️ Удалить аккаунт?',sub:'Действие необратимо. Введите email для подтверждения:',
            fields:[{name:'email',type:'email',placeholder:currentUser.email,max:100}],
            okText:'Удалить',
            onOk:async function(v){
                if(v.email!==currentUser.email){showToast('Email не совпадает','error');return;}
                try{
                    var res=await fetchRetry(SUPABASE_URL+'/functions/v1/delete-user',{method:'DELETE',headers:{'Authorization':'Bearer '+currentUser._token}},1);
                    var json=await res.json();
                    if(json.error)throw new Error(json.error);
                    window.pfLogout();
                }catch(e){showToast('Ошибка: '+e.message,'error');}
            }
        });
    };

    window.pfDeleteGuild=function(){
        if(!guild)return;
        showModal({
            title:'Удалить гильдию?',sub:'Все участники будут исключены. Это необратимо.',
            fields:[],okText:'Удалить',
            onOk:async function(){
                try{
                    await apiDelete('guilds?id=eq.'+guild.id,currentUser._token);
                    showToast('🗑️ Гильдия удалена','info');
                    setTimeout(function(){location.reload();},500);
                }catch(e){showToast('Ошибка','error');}
            }
        });
    };

    // NOTES
    window.pfOpenNoteForm=function(id){
        editingNoteId=id||null;
        var n=null;
        if(id)n=notes.find(function(x){return x.id===id;});
        showModal({
            title:n?'Редактировать заметку':'Новая заметка',
            fields:[
                {name:'title',value:n?(n.title||''):'',placeholder:'Заголовок (необязательно)',max:100},
                {name:'content',type:'textarea',value:n?(n.content||''):'',placeholder:'Текст заметки...',max:5000}
            ],
            onOk:async function(v){
                if(!v.content){showToast('Введите текст','error');return;}
                try{
                    if(editingNoteId){
                        await apiPatch('user_notes?id=eq.'+editingNoteId,{title:v.title,content:v.content,updated_at:new Date().toISOString()},currentUser._token);
                    }else{
                        await apiPost('user_notes',{user_id:currentUser.id,title:v.title,content:v.content,color:selectedNoteColor},currentUser._token);
                    }
                    showToast('✅ Сохранено!','success');
                    setTimeout(function(){location.reload();},400);
                }catch(e){showToast('Ошибка: '+e.message,'error');}
            }
        });
    };
    window.pfEditNote=function(id){pfOpenNoteForm(id);};
    window.pfPinNote=async function(id){
        var n=notes.find(function(x){return x.id===id;});
        if(!n)return;
        try{await apiPatch('user_notes?id=eq.'+id,{pinned:!n.pinned},currentUser._token);setTimeout(function(){location.reload();},300);}
        catch(e){showToast('Ошибка','error');}
    };
    window.pfDeleteNote=function(id){
        showModal({title:'Удалить заметку?',sub:'Это действие нельзя отменить.',fields:[],okText:'Удалить',
            onOk:async function(){try{await apiDelete('user_notes?id=eq.'+id,currentUser._token);setTimeout(function(){location.reload();},300);}catch(e){showToast('Ошибка','error');}}
        });
    };

    // AI CHAT
    window.pfSendChat=async function(){
        var input=document.getElementById('pf-chat-input');
        var chatEl=document.getElementById('pf-chat-container');
        if(!input||!chatEl)return;
        var q=input.value.trim();
        if(!q)return;

        var userMsg=document.createElement('div');
        userMsg.className='pf-chat-msg user';userMsg.textContent=q;
        chatEl.appendChild(userMsg);chatEl.scrollTop=chatEl.scrollHeight;
        input.value='';
        chatHistory.push({role:'user',text:q});

        try{
            var res=await fetchRetry(SUPABASE_URL+'/functions/v1/ai-chat',{
                method:'POST',
                headers:{'Content-Type':'application/json','Authorization':'Bearer '+currentUser._token},
                body:JSON.stringify({message:q,history:chatHistory.slice(-6)})
            },1);
            var data=await res.json();
            var reply=data.reply||data.error||'Нет ответа';
            var botMsg=document.createElement('div');
            botMsg.className='pf-chat-msg bot';botMsg.textContent=reply;
            chatEl.appendChild(botMsg);chatEl.scrollTop=chatEl.scrollHeight;
            chatHistory.push({role:'bot',text:reply});
        }catch(e){
            var err=document.createElement('div');
            err.className='pf-chat-msg bot';err.textContent='⚠️ Ошибка сети. Попробуйте ещё раз.';
            chatEl.appendChild(err);
        }
        try{localStorage.setItem(CHAT_KEY,JSON.stringify(chatHistory.slice(-30)));}catch(e){}
    };

    // 2FA
    window.pfToggle2FA=async function(){
        try{
            var r=await apiGet('user_2fa?user_id=eq.'+currentUser.id+'&select=*',currentUser._token);
            var cur=r&&r[0]&&r[0].email_2fa_enabled;
            var newVal=!cur;
            showModal({
                title:(newVal?'Включить':'Выключить')+' Email-2FA?',
                sub:newVal?'При входе с новых устройств будет запрашиваться код':'Защита будет отключена',
                fields:[],okText:newVal?'Включить':'Выключить',
                onOk:async function(){
                    try{
                        if(r&&r[0]){
                            await apiPatch('user_2fa?user_id=eq.'+currentUser.id,{email_2fa_enabled:newVal,updated_at:new Date().toISOString()},currentUser._token);
                        }else{
                            await apiPost('user_2fa',{user_id:currentUser.id,email_2fa_enabled:newVal,updated_at:new Date().toISOString()},currentUser._token);
                        }
                        showToast(newVal?'✅ Включена!':'🔓 Выключена',newVal?'success':'info');
                        render2FATab();
                    }catch(e){showToast('Ошибка: '+e.message,'error');}
                }
            });
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    async function render2FATab(){
        var statusEl=document.getElementById('pf-2fa-status');
        var switchEl=document.getElementById('pf-switch-2fa');
        var devicesEl=document.getElementById('pf-trusted-devices');
        if(!statusEl)return;
        try{
            var r=await apiGet('user_2fa?user_id=eq.'+currentUser.id+'&select=*',currentUser._token);
            var enabled=r&&r[0]&&r[0].email_2fa_enabled;
            if(enabled){
                statusEl.innerHTML='<div class="pf-badge-2fa">✅ 2FA включена</div>';
                if(switchEl)switchEl.classList.add('on');
            }else{
                statusEl.innerHTML='<div class="pf-badge-2fa off">⚠️ 2FA выключена</div>';
                if(switchEl)switchEl.classList.remove('on');
            }
            if(devicesEl){
                var devRes=await apiGet('trusted_devices?user_id=eq.'+currentUser.id+'&select=*&order=last_used.desc',currentUser._token);
                var devices=devRes||[];
                if(devices.length>0){
                    devicesEl.innerHTML=devices.map(function(d){
                        return '<div class="pf-device"><div class="pf-device-icon">💻</div><div style="flex:1;min-width:0;"><div style="font-weight:700;font-size:.9rem;">'+escapeHtml(d.device_name||'Устройство')+'</div><div style="font-size:.75rem;color:#888;">'+new Date(d.last_used).toLocaleString('ru-RU')+'</div></div><button class="pf-note-btn danger" onclick="pfRemoveDevice('+d.id+')">✕</button></div>';
                    }).join('');
                }else{
                    devicesEl.innerHTML='<p style="color:#888;text-align:center;padding:20px;">Нет устройств</p>';
                }
            }
        }catch(e){statusEl.innerHTML='<div class="pf-badge-2fa off">⚠️ Ошибка</div>';}
    }

    window.pfRemoveDevice=async function(id){
        try{await apiDelete('trusted_devices?id=eq.'+id,currentUser._token);showToast('🗑️ Удалено','info');render2FATab();}
        catch(e){showToast('Ошибка','error');}
    };
    window.pfClearTrustedDevices=function(){
        showModal({title:'Удалить все устройства?',sub:'Придётся заново подтверждать вход с каждого.',fields:[],okText:'Удалить',
            onOk:async function(){try{await apiDelete('trusted_devices?user_id=eq.'+currentUser.id,currentUser._token);showToast('🗑️ Удалено','info');render2FATab();}catch(e){showToast('Ошибка','error');}}
        });
    };
    window.pfChangePassword=function(){
        showModal({
            title:'Новый пароль',sub:'Минимум 6 символов',
            fields:[{name:'password',type:'password',placeholder:'Новый пароль',max:100}],
            onOk:async function(v){
                if(!v.password||v.password.length<6){showToast('Минимум 6 символов','error');return;}
                showToast('Функция в разработке','info');
            }
        });
    };

    // ============================================================
    // LOAD
    // ============================================================
    async function loadAll(session){
        currentUser=session.user;
        currentUser._token=session.access_token;

        var profiles;
        try{profiles=await apiGet('profiles?user_id=eq.'+encodeURIComponent(session.user.id)+'&select=*',session.access_token);}
        catch(e){throw new Error('Не удалось загрузить профиль: '+e.message);}

        currentProfile=Array.isArray(profiles)&&profiles.length?profiles[0]:null;
        if(!currentProfile){
            try{
                var created=await apiPost('profiles',{
                    user_id:session.user.id,
                    username:(session.user.email||'').split('@')[0],
                    display_name:(session.user.email||'').split('@')[0]
                },session.access_token,'return=representation');
                currentProfile=Array.isArray(created)&&created.length?created[0]:null;
            }catch(e){throw new Error('Профиль не создан: '+e.message);}
        }

        writeCache(PROFILE_CACHE_KEY,{user:session.user,profile:currentProfile});
        render();

        // Фоном остальное
        try{
            var results=await Promise.all([
                apiGet('user_achievements?user_id=eq.'+session.user.id+'&select=achievement_id,earned_at',session.access_token).catch(function(){return [];}),
                apiGet('user_notes?user_id=eq.'+session.user.id+'&select=*&order=pinned.desc,updated_at.desc',session.access_token).catch(function(){return [];}),
                apiGet('notifications?user_id=eq.'+session.user.id+'&select=*&order=created_at.desc&limit=20',session.access_token).catch(function(){return [];}),
                apiGet('profiles?select=user_id,username,display_name,experience,level,avatar_url&order=experience.desc&limit=10',session.access_token).catch(function(){return [];}),
                apiGet('daily_logins?user_id=eq.'+session.user.id+'&select=streak&order=login_date.desc&limit=1',session.access_token).catch(function(){return [];}),
                apiGet('guild_members?user_id=eq.'+session.user.id+'&select=guild_id,role',session.access_token).catch(function(){return [];}),
                apiGet('friends?or=(user_id.eq.'+session.user.id+',friend_id.eq.'+session.user.id+')&select=*',session.access_token).catch(function(){return [];})
            ]);

            var uaRes=results[0]||[];
            notes=results[1]||[];
            notifications=results[2]||[];
            leaders=results[3]||[];
            streak=(results[4]&&results[4][0]&&results[4][0].streak)||0;
            var guildMember=results[5]&&results[5][0];
            var friendsRes=results[6]||[];

            // Achievements metadata
            if(uaRes.length){
                try{
                    var ids=uaRes.map(function(x){return x.achievement_id;}).filter(Boolean);
                    if(ids.length){
                        var metaRes=await apiGet('achievements?id=in.('+ids.join(',')+')&select=*',session.access_token);
                        var map={};
                        (metaRes||[]).forEach(function(m){map[m.id]=m;});
                        achievements=uaRes.map(function(x){
                            return Object.assign({},map[x.achievement_id]||{},{achievement_id:x.achievement_id,earned_at:x.earned_at});
                        });
                    }
                }catch(e){}
            }

            // Guild
            if(guildMember&&guildMember.guild_id){
                try{
                    var gr=await apiGet('guilds?id=eq.'+guildMember.guild_id+'&select=*',session.access_token);
                    guild=gr&&gr[0];
                    if(guild){
                        var mr=await apiGet('guild_members?guild_id=eq.'+guild.id+'&select=user_id,role,joined_at&limit=50',session.access_token);
                        if(mr&&mr.length){
                            var mids=mr.map(function(m){return m.user_id;});
                            var pr=await apiGet('profiles?user_id=in.('+mids.join(',')+')&select=user_id,display_name,username,avatar_url',session.access_token);
                            var pmap={};(pr||[]).forEach(function(p){pmap[p.user_id]=p;});
                            guildMembers=mr.map(function(m){return Object.assign({},m,{profile:pmap[m.user_id]||{}});});
                        }
                    }
                }catch(e){}
            }

            // Friends
            if(friendsRes.length){
                try{
                    var fids={};
                    friendsRes.forEach(function(f){fids[f.user_id]=true;fids[f.friend_id]=true;});
                    delete fids[session.user.id];
                    var idArr=Object.keys(fids);
                    if(idArr.length){
                        var fpr=await apiGet('profiles?user_id=in.('+idArr.join(',')+')&select=user_id,display_name,username,avatar_url',session.access_token);
                        var fmap={};(fpr||[]).forEach(function(p){fmap[p.user_id]=p;});
                        friends=friendsRes.map(function(f){
                            var otherId=f.user_id===session.user.id?f.friend_id:f.user_id;
                            return Object.assign({},f,{other:fmap[otherId]||{user_id:otherId}});
                        });
                    }
                }catch(e){}
            }

            // Moderation stats
            if(isModerator()){
                try{
                    var pending=await apiGet('list_submissions?status=eq.pending&select=id&limit=1',session.access_token);
                    var hidden=await apiGet('comments?is_hidden=eq.true&select=id&limit=1',session.access_token);
                    var banned=await apiGet('profiles?is_banned=eq.true&select=user_id&limit=1',session.access_token);
                    // Точные числа через count — Supabase REST через header
                    modStats.pendingSubmissions=(pending||[]).length||0;
                    modStats.hiddenComments=(hidden||[]).length||0;
                    modStats.bannedUsers=(banned||[]).length||0;
                }catch(e){}
            }

            // Плавное обновление
            render();
        }catch(e){console.warn('[profile] bg load error:',e.message);}
    }

    function renderFromCache(session){
        var c=readCache(PROFILE_CACHE_KEY,24*60*60*1000);
        if(!c||!c.profile||!c.user||c.user.id!==session.user.id)return false;
        currentUser=session.user;
        currentUser._token=session.access_token;
        currentProfile=c.profile;
        render();
        return true;
    }

    function renderSkeleton(){
        container.innerHTML=
            '<div class="pf-skel" style="height:220px;"></div>'+
            '<div class="pf-quick-grid" style="margin-bottom:24px;">'+
            '<div class="pf-skel" style="height:70px;"></div>'.repeat(4)+
            '</div>'+
            '<div class="pf-skel" style="height:60px;margin-bottom:20px;"></div>'+
            '<div class="pf-skel" style="height:150px;"></div>';
    }

    function showLogin(){
        container.innerHTML='<div style="max-width:400px;margin:60px auto;padding:40px 28px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);">'+
            '<div style="font-size:4rem;margin-bottom:12px;">🔒</div>'+
            '<h2 style="margin:0 0 8px 0;color:#2c3e50;">Вы не вошли</h2>'+
            '<p style="color:#888;margin:0 0 20px 0;">Войдите, чтобы просмотреть профиль</p>'+
            '<a href="/login/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">🔐 Войти</a>'+
            '</div>';
    }

    function showError(msg){
        container.innerHTML='<div style="max-width:400px;margin:60px auto;padding:40px 28px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);">'+
            '<div style="font-size:4rem;margin-bottom:12px;">⚠️</div>'+
            '<h2 style="margin:0 0 8px 0;color:#2c3e50;">Не удалось загрузить</h2>'+
            '<p style="color:#888;margin:0 0 20px 0;word-break:break-word;">'+escapeHtml(msg)+'</p>'+
            '<button onclick="location.reload()" style="padding:13px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:12px;font-weight:700;font-size:.95rem;font-family:inherit;cursor:pointer;">🔄 Обновить</button>'+
            '</div>';
    }

    async function waitSession(maxMs){
        var s=readSession();
        if(s)return s;
        var start=Date.now();
        while(Date.now()-start<maxMs){
            await new Promise(function(r){setTimeout(r,250);});
            s=readSession();
            if(s)return s;
        }
        return null;
    }

    async function init(){
        trackActivity();

        var session=readSession();
        if(!session){
            session=await waitSession(3000);
            if(!session){showLogin();return;}
        }

        if(renderFromCache(session)){
            loadAll(session).catch(function(e){console.warn('[profile] reload:',e.message);});
            return;
        }

        renderSkeleton();
        try{await loadAll(session);}
        catch(e){showError(e.message);}
    }

    if(document.readyState==='loading'){
        document.addEventListener('DOMContentLoaded',init);
    }else{
        init();
    }
})();
</script>

<script>
setTimeout(function(){
    if(typeof window.refreshAuthButton==='function')window.refreshAuthButton();
},800);
</script>
