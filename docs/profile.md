---
title: Профиль
comments: false
---

<div id="profile-app"></div>

<style>
:root{--kc:#6C63FF;--kl:#A29BFE;--ks:rgba(108,99,255,.25);--kb:#F0F4FF}
@keyframes pfSpin{to{transform:rotate(360deg)}}
@keyframes pfFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pfShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pfSlideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes pfRing{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes pfWave{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes pfCoin{0%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}100%{transform:translateY(0) rotate(-3deg)}}
@keyframes pfCoinGlow{0%,100%{filter:drop-shadow(0 0 8px rgba(243,156,18,.5)) brightness(1)}50%{filter:drop-shadow(0 0 20px rgba(243,156,18,.9)) brightness(1.15)}}
@keyframes pfTyping{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}
@keyframes pfBar{from{width:0}}
@keyframes pfFade{from{opacity:0}to{opacity:1}}

#profile-app{max-width:1100px;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px}
#profile-app a{text-decoration:none!important;border-bottom:none!important}
.pf-fade{animation:pfFadeIn .4s cubic-bezier(.16,1,.3,1) both}

/* HERO */
.pf-hero{position:relative;background:linear-gradient(135deg,#1a1a2e 0%,#2d1b3d 40%,#4a2a3a 100%);border-radius:24px;padding:40px 36px;color:#fff;margin-bottom:20px;overflow:hidden;box-shadow:0 20px 60px -12px rgba(0,0,0,.4)}
.pf-hero::before{content:'';position:absolute;top:-60%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,var(--ks),transparent 70%);border-radius:50%;animation:pfFloat 8s ease-in-out infinite}
.pf-hero::after{content:'';position:absolute;bottom:-60%;left:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(231,76,60,.15),transparent 70%);border-radius:50%;animation:pfFloat 10s ease-in-out infinite reverse}
.pf-hero-content{position:relative;z-index:2;display:flex;align-items:center;gap:26px;flex-wrap:wrap}
.pf-avatar-wrap{position:relative;flex-shrink:0;cursor:pointer;transition:transform .3s;margin-bottom:14px}
.pf-avatar-wrap:hover{transform:scale(1.03)}
.pf-avatar-ring{position:absolute;inset:-8px;border:2px dashed var(--kl);border-radius:50%;animation:pfRing 18s linear infinite;opacity:.5}
.pf-avatar{width:120px;height:120px;border-radius:50%;border:4px solid rgba(255,255,255,.4);object-fit:cover;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.2);position:relative;z-index:1;transition:transform .35s}
.pf-avatar-badge{position:absolute;bottom:22px;right:-4px;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.72rem;border:2px solid rgba(255,255,255,.9);box-shadow:0 4px 12px rgba(108,99,255,.5);z-index:3}
.pf-role-badge{position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:var(--kc);padding:4px 14px;border-radius:20px;font-size:.7rem;font-weight:800;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.15);border:2px solid rgba(255,255,255,.5);z-index:2}
.pf-info{flex:1;min-width:220px}
.pf-name{font-size:2rem;font-weight:800;margin:0 0 8px 0;color:#fff;display:flex;align-items:center;gap:10px;flex-wrap:wrap;letter-spacing:-.5px;cursor:pointer;transition:all .25s}
.pf-name:hover{text-shadow:0 0 20px rgba(255,255,255,.5)}
.pf-name-edit{font-size:.85rem;opacity:.55;margin-left:2px}
.pf-mod-badge{background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;padding:4px 12px;border-radius:20px;font-size:.7rem;font-weight:800;letter-spacing:.4px;text-transform:uppercase;box-shadow:0 4px 14px rgba(231,76,60,.5);border:1px solid rgba(255,255,255,.3)}
.pf-kingdom-badge{background:rgba(255,255,255,.22);backdrop-filter:blur(8px);color:#fff;padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.35);cursor:pointer;transition:all .25s}
.pf-kingdom-badge img{width:18px;height:auto;border-radius:2px;display:block}
.pf-kingdom-badge:hover{background:rgba(255,255,255,.32);transform:translateY(-2px)}
.pf-email{font-size:.9rem;opacity:.85;margin:0 0 14px 0}
.pf-stats{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
.pf-stat-item{display:flex;flex-direction:column;gap:2px;cursor:pointer;padding:6px 10px;border-radius:10px;transition:all .25s}
.pf-stat-item:hover{background:rgba(255,255,255,.1);transform:translateY(-2px)}
.pf-stat-label{font-size:.68rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:700;display:flex;align-items:center;gap:3px}
.pf-stat-value{font-size:1.3rem;font-weight:800;display:flex;align-items:center;gap:5px}
.pf-stat-coin{width:20px;height:20px;border-radius:50%;animation:pfCoin 3s ease-in-out infinite, pfCoinGlow 4s ease-in-out infinite;object-fit:cover}
.pf-currency-click{cursor:pointer;padding:8px 14px;border-radius:12px;background:rgba(243,156,18,.15);border:1px solid rgba(243,156,18,.4);transition:all .25s;display:inline-flex;align-items:center;gap:8px;font-weight:800;color:#f39c12}
.pf-currency-click:hover{background:rgba(243,156,18,.25);transform:translateY(-2px);box-shadow:0 8px 20px -4px rgba(243,156,18,.5)}
.pf-progress-bar{margin-top:12px;height:10px;background:rgba(255,255,255,.2);border-radius:12px;overflow:hidden;position:relative}
.pf-progress-fill{height:100%;background:linear-gradient(90deg,var(--kl),#fff);border-radius:12px;transition:width 1.2s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px rgba(255,255,255,.6)}
.pf-progress-text{font-size:.76rem;opacity:.9;margin-top:6px}

/* HELP TOOLTIP */
.pf-help{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:rgba(108,99,255,.18);color:#6C63FF;font-size:.68rem;font-weight:800;cursor:help;margin-left:4px;position:relative;font-family:sans-serif;vertical-align:middle;flex-shrink:0;transition:all .2s}
.pf-help:hover{background:#6C63FF;color:#fff;transform:scale(1.1)}
.pf-help::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) translateY(4px);background:#1a1a2e;color:#fff;padding:10px 14px;border-radius:10px;font-size:.75rem;font-weight:400;white-space:normal;width:220px;text-align:center;opacity:0;pointer-events:none;transition:all .25s;z-index:9999;box-shadow:0 12px 32px rgba(0,0,0,.5);line-height:1.5}
.pf-help:hover::after{opacity:1;transform:translateX(-50%) translateY(0)}

/* MY PAGE */
.pf-mypage{background:linear-gradient(135deg,#fff 0%,#fafbfd 100%);border-radius:22px;border:1px solid rgba(0,0,0,.06);padding:24px 26px;margin-bottom:18px;box-shadow:0 4px 20px rgba(0,0,0,.05);position:relative;overflow:hidden}
.pf-mypage::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--kc),var(--kl),var(--kc));background-size:200% auto;animation:pfShine 3s linear infinite}
.pf-mypage-header{margin-bottom:18px}
.pf-mypage-title{font-size:1.2rem;font-weight:800;color:#1a1a1a;margin:0 0 2px 0;letter-spacing:-.3px}
.pf-mypage-sub{font-size:.82rem;color:#888;margin:0}
.pf-mypage-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:18px}
.pf-mypage-tile{background:linear-gradient(135deg,var(--kb),#fff);border:1px solid rgba(108,99,255,.15);border-radius:14px;padding:14px 16px;transition:all .3s;cursor:pointer}
.pf-mypage-tile:hover{transform:translateY(-3px);box-shadow:0 12px 28px -8px var(--ks);border-color:var(--kc)}
.pf-mypage-tile-label{font-size:.68rem;color:#888;text-transform:uppercase;letter-spacing:.8px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:3px}
.pf-mypage-tile-value{font-size:1.4rem;font-weight:900;color:var(--kc);letter-spacing:-.5px;line-height:1.1}
.pf-mypage-tile-sub{font-size:.7rem;color:#aaa;margin-top:2px}
.pf-mypage-actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px}
.pf-mypage-action{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#fff;border:1.5px solid rgba(0,0,0,.06);border-radius:12px;color:#333;cursor:pointer;font-family:inherit;font-size:.85rem;font-weight:700;transition:all .25s}
.pf-mypage-action:hover{transform:translateY(-2px);border-color:var(--kc);box-shadow:0 8px 20px -6px var(--ks);color:var(--kc)}
.pf-mypage-action-icon{font-size:1.2rem;flex-shrink:0}

/* QUICK GRID */
.pf-quick-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:24px}
.pf-quick-card{display:flex;align-items:center;gap:12px;padding:16px 18px;background:#fff;border-radius:16px;border:2px solid transparent;color:inherit;transition:all .3s;box-shadow:0 4px 12px rgba(0,0,0,.05);cursor:pointer;position:relative;overflow:hidden}
.pf-quick-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--kc),transparent);opacity:0;transition:opacity .3s}
.pf-quick-card:hover{transform:translateY(-4px);border-color:var(--kc);box-shadow:0 12px 32px -8px var(--ks)}
.pf-quick-card:hover::before{opacity:1}
.pf-quick-icon{font-size:1.8rem;transition:transform .3s}
.pf-quick-card:hover .pf-quick-icon{transform:scale(1.15) rotate(-6deg)}
.pf-quick-title{font-size:.9rem;font-weight:800;color:#1a1a1a;margin-bottom:2px}
.pf-quick-desc{font-size:.72rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* TABS с прокруткой колёсиком */
.pf-tabs-wrap{position:relative;margin-bottom:20px}
.pf-tabs{display:flex;gap:4px;overflow-x:auto;padding:6px;background:rgba(255,255,255,.9);border-radius:16px;border:1px solid rgba(0,0,0,.05);cursor:grab;scrollbar-width:none;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}
.pf-tabs::-webkit-scrollbar{display:none}
.pf-tabs.dragging{cursor:grabbing}
.pf-tab{flex-shrink:0;padding:10px 16px;border:none;background:transparent;color:#666;font-size:.85rem;font-weight:700;border-radius:12px;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:6px;font-family:inherit;position:relative;user-select:none}
.pf-tab:hover{background:rgba(0,0,0,.04);color:#333}
.pf-tab.active{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;box-shadow:0 6px 16px -4px var(--ks)}
.pf-tab-count{background:rgba(255,255,255,.25);padding:1px 7px;border-radius:10px;font-size:.7rem}
.pf-tab.active .pf-tab-count{background:rgba(255,255,255,.3)}
.pf-tab.mod-tab{color:#e74c3c}
.pf-tab.mod-tab.active{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.pf-tabs-scroll{position:absolute;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:#fff;border:1px solid rgba(0,0,0,.08);box-shadow:0 4px 12px rgba(0,0,0,.1);cursor:pointer;display:none;align-items:center;justify-content:center;z-index:5;font-size:.9rem;color:#666;padding:0;font-family:inherit}
.pf-tabs-scroll:hover{background:var(--kc);color:#fff;border-color:var(--kc)}
.pf-tabs-scroll.left{left:-4px}
.pf-tabs-scroll.right{right:-4px}
@media(max-width:640px){.pf-tabs-scroll{display:none!important}}
@media(min-width:641px){.pf-tabs-wrap:hover .pf-tabs-scroll{display:flex}}
.pf-tab-content{display:none;animation:pfFadeIn .3s ease}
.pf-tab-content.active{display:block}

/* CARDS */
.pf-card{background:#fff;border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:22px 26px;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:box-shadow .3s}
.pf-card:hover{box-shadow:0 12px 32px -8px var(--ks)}
.pf-card-title{font-size:1.1rem;font-weight:800;color:#1a1a1a;margin:0 0 16px 0;display:flex;align-items:center;gap:10px}
.pf-ct-icon{font-size:1.4rem}
.pf-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:30px;border:2px solid var(--kc);background:var(--kc);color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;transition:all .25s;font-family:inherit}
.pf-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--ks)}
.pf-btn-outline{background:transparent;color:var(--kc)}
.pf-btn-outline:hover{background:var(--kc);color:#fff}
.pf-btn-danger{background:#e74c3c;border-color:#e74c3c}
.pf-btn-danger:hover{background:#c0392b;border-color:#c0392b}
.pf-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}

/* ACTIVITY CHARTS */
.pf-charts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:18px}
.pf-chart{background:linear-gradient(135deg,#fafbfd,#fff);border-radius:14px;padding:18px;border:1px solid rgba(0,0,0,.05)}
.pf-chart-title{font-size:.82rem;font-weight:800;color:#555;text-transform:uppercase;letter-spacing:.8px;margin-bottom:14px;display:flex;align-items:center;gap:6px}
.pf-bar-chart{display:flex;align-items:flex-end;gap:6px;height:120px;padding:8px 0;border-bottom:1px dashed rgba(0,0,0,.08)}
.pf-bar{flex:1;background:linear-gradient(180deg,var(--kl),var(--kc));border-radius:4px 4px 0 0;min-height:4px;position:relative;transition:height .8s cubic-bezier(.16,1,.3,1);animation:pfBar 1s ease both}
.pf-bar:hover{filter:brightness(1.15)}
.pf-bar::after{content:attr(data-val);position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:.65rem;font-weight:800;color:var(--kc);opacity:0;transition:opacity .2s}
.pf-bar:hover::after{opacity:1}
.pf-bar-label{font-size:.62rem;color:#999;text-align:center;margin-top:4px;font-weight:700}
.pf-pie-wrap{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.pf-pie{width:130px;height:130px;border-radius:50%;position:relative;flex-shrink:0}
.pf-pie-legend{flex:1;min-width:140px}
.pf-pie-legend-item{display:flex;align-items:center;gap:8px;padding:5px 0;font-size:.82rem}
.pf-pie-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}
.pf-pie-label{flex:1;color:#555;font-weight:600}
.pf-pie-value{color:#1a1a1a;font-weight:800}
.pf-heatmap{display:grid;grid-template-columns:repeat(13,1fr);gap:3px}
.pf-heat-cell{aspect-ratio:1;border-radius:3px;background:rgba(108,99,255,.08);transition:transform .2s;cursor:help}
.pf-heat-cell:hover{transform:scale(1.4);z-index:2}
.pf-heat-cell.l1{background:rgba(108,99,255,.25)}
.pf-heat-cell.l2{background:rgba(108,99,255,.45)}
.pf-heat-cell.l3{background:rgba(108,99,255,.7)}
.pf-heat-cell.l4{background:var(--kc)}

/* ACHIEVEMENTS */
.pf-ach-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.pf-ach-filter{padding:6px 14px;border-radius:20px;border:1.5px solid rgba(108,99,255,.25);background:#fff;color:#666;font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s}
.pf-ach-filter:hover{border-color:var(--kc);color:var(--kc)}
.pf-ach-filter.active{background:var(--kc);border-color:var(--kc);color:#fff}
.pf-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.pf-ach{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f8f9fb;border-radius:12px;border:2px solid transparent;transition:all .25s;position:relative;overflow:hidden}
.pf-ach:hover{transform:translateY(-3px);border-color:var(--kc);box-shadow:0 12px 28px -8px var(--ks)}
.pf-ach.locked{opacity:.45;filter:grayscale(.6)}
.pf-ach.locked::after{content:'🔒';position:absolute;top:6px;right:8px;font-size:.9rem}
.pf-ach:not(.locked)::after{content:'✓';position:absolute;top:6px;right:8px;font-size:.85rem;color:#27ae60;font-weight:900}
.pf-ach-icon{font-size:1.8rem;transition:transform .3s;flex-shrink:0}
.pf-ach:hover .pf-ach-icon{transform:scale(1.15)}
.pf-ach-name{font-size:.85rem;font-weight:700;color:#1a1a1a;margin-bottom:2px}
.pf-ach-date{font-size:.7rem;color:#888}

/* NOTES — стильно */
.pf-notes-toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.pf-notes-search{flex:1;min-width:180px;padding:10px 16px;border-radius:12px;border:1.5px solid rgba(0,0,0,.08);font-size:.85rem;font-family:inherit;outline:none;background:#fff;transition:all .2s}
.pf-notes-search:focus{border-color:var(--kc);box-shadow:0 0 0 3px var(--ks)}
.pf-notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.pf-note{background:#fff;border-radius:14px;padding:16px;border-left:4px solid var(--kc);box-shadow:0 4px 12px rgba(0,0,0,.06);cursor:pointer;transition:all .3s;position:relative;animation:pfSlideUp .3s ease both}
.pf-note:hover{transform:translateY(-4px);box-shadow:0 12px 28px -8px var(--ks)}
.pf-note.pinned{background:linear-gradient(135deg,#fff8e1,#fffbf0);border-left-color:#f39c12}
.pf-note-pin{position:absolute;top:10px;right:10px;font-size:.85rem}
.pf-note-title{font-size:.92rem;font-weight:800;color:#1a1a1a;margin-bottom:6px;padding-right:24px;word-break:break-word}
.pf-note-content{font-size:.82rem;color:#555;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;max-height:120px;overflow:hidden}
.pf-note-footer{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08);font-size:.7rem;color:#999}
.pf-note-actions{display:flex;gap:4px}
.pf-note-actions button{width:24px;height:24px;border-radius:6px;border:none;background:rgba(0,0,0,.05);font-size:.75rem;cursor:pointer;font-family:inherit;color:#666;transition:all .2s;padding:0}
.pf-note-actions button:hover{background:rgba(0,0,0,.1);color:#333}
.pf-note-actions button.danger:hover{background:rgba(231,76,60,.15);color:#e74c3c}

/* FRIENDS */
.pf-friend{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;transition:all .25s;align-items:center;animation:pfSlideUp .3s ease both;cursor:pointer}
.pf-friend:hover{background:rgba(108,99,255,.08);transform:translateX(4px)}
.pf-friend-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid var(--kc);flex-shrink:0}
.pf-friend-info{flex:1;min-width:0}
.pf-friend-name{font-weight:700;color:#1a1a1a;font-size:.92rem}
.pf-friend-status{font-size:.75rem;color:#888}
.pf-friend-actions{display:flex;gap:6px;flex-shrink:0}
.pf-icon-btn{width:32px;height:32px;border-radius:50%;border:1.5px solid rgba(0,0,0,.08);background:#fff;color:#666;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:.9rem;transition:all .2s;font-family:inherit;padding:0}
.pf-icon-btn:hover{transform:scale(1.1);border-color:var(--kc);color:var(--kc)}
.pf-icon-btn.danger:hover{border-color:#e74c3c;color:#e74c3c;background:rgba(231,76,60,.08)}
.pf-icon-btn.success:hover{border-color:#27ae60;color:#27ae60;background:rgba(39,174,96,.08)}

/* LEADERBOARD */
.pf-leaderboard{width:100%;border-collapse:collapse;font-size:.88rem}
.pf-leaderboard th{text-align:left;padding:10px 12px;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;border-bottom:2px solid var(--kc)}
.pf-leaderboard td{padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.05);transition:background .2s}
.pf-leaderboard tbody tr{cursor:pointer;transition:all .25s}
.pf-leaderboard tbody tr:hover{background:rgba(108,99,255,.05)}
.pf-leaderboard tbody tr.pf-me{background:var(--kc);color:#fff}
.pf-lb-avatar{width:32px;height:32px;border-radius:50%;vertical-align:middle;margin-right:8px;border:2px solid var(--kc);object-fit:cover}
.pf-lb-guild{font-size:.7rem;color:#6C63FF;background:rgba(108,99,255,.1);padding:2px 8px;border-radius:10px;margin-left:6px;display:inline-block}

/* AI CHAT */
.pf-chat-wrap{display:flex;flex-direction:column;gap:12px}
.pf-chat{background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.6));border-radius:16px;padding:16px;max-height:460px;overflow-y:auto;border:1px solid rgba(0,0,0,.05)}
.pf-chat-msg{margin:6px 0;padding:11px 16px;border-radius:16px;max-width:82%;word-wrap:break-word;font-size:.9rem;line-height:1.55;animation:pfSlideUp .3s ease both}
.pf-chat-msg.user{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;margin-left:auto;border-bottom-right-radius:4px}
.pf-chat-msg.bot{background:#fff;color:#333;margin-right:auto;border-bottom-left-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.08)}
.pf-chat-links{margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08);display:flex;flex-direction:column;gap:6px}
.pf-chat-link{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(108,99,255,.08);border-radius:10px;color:var(--kc);font-size:.82rem;font-weight:700;transition:all .2s;cursor:pointer}
.pf-chat-link:hover{background:rgba(108,99,255,.18);transform:translateX(3px)}
.pf-chat-suggestions{display:flex;flex-wrap:wrap;gap:8px}
.pf-chat-chip{padding:8px 14px;background:#fff;border:1.5px solid rgba(108,99,255,.25);border-radius:20px;color:#555;font-size:.8rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
.pf-chat-chip:hover{background:var(--kc);border-color:var(--kc);color:#fff;transform:translateY(-2px)}
.pf-chat-input{display:flex;gap:8px}
.pf-chat-input input{flex:1;padding:13px 20px;border:2px solid rgba(0,0,0,.08);border-radius:30px;font-size:.9rem;font-family:inherit;outline:none;background:#fff}
.pf-chat-input input:focus{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}
.pf-chat-input button{padding:12px 26px;background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;border:none;border-radius:30px;cursor:pointer;font-weight:800;font-family:inherit;font-size:.9rem;transition:all .2s}
.pf-chat-input button:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--ks)}
.pf-typing{display:inline-flex;gap:4px;padding:11px 16px;background:#fff;border-radius:16px;border-bottom-left-radius:4px}
.pf-typing span{width:6px;height:6px;border-radius:50%;background:#6C63FF;animation:pfTyping 1.2s infinite}
.pf-typing span:nth-child(2){animation-delay:.15s}
.pf-typing span:nth-child(3){animation-delay:.3s}

/* SECURITY */
.pf-badge-2fa{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:.8rem;font-weight:800;background:linear-gradient(135deg,#27ae60,#16a085);color:#fff;box-shadow:0 4px 12px rgba(39,174,96,.4)}
.pf-badge-2fa.off{background:rgba(0,0,0,.08);color:#666;box-shadow:none}
.pf-toggle{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-toggle:last-child{border-bottom:none}
.pf-toggle-label{font-size:.9rem;color:#333;font-weight:600;display:flex;align-items:center;gap:4px}
.pf-toggle-desc{font-size:.75rem;color:#888;margin-top:2px}
.pf-switch{position:relative;width:48px;height:26px;background:rgba(0,0,0,.1);border-radius:26px;cursor:pointer;transition:all .3s;flex-shrink:0}
.pf-switch.on{background:linear-gradient(135deg,#27ae60,#16a085)}
.pf-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:all .3s;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.pf-switch.on::after{left:25px}
.pf-device{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;align-items:center}
.pf-device-icon{font-size:1.5rem;flex-shrink:0}
.pf-device-info{flex:1;min-width:0}

/* SETTINGS — аватары в 2 ряда */
.pf-avatar-section{margin-bottom:18px}
.pf-avatar-section-title{font-size:.78rem;color:#888;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
.pf-avatar-grid{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-start}
.pf-avatar-option{width:64px;height:64px;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s;background:#f0f0f5}
.pf-avatar-option:hover{transform:scale(1.1);border-color:var(--kc)}
.pf-avatar-option.selected{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}
.pf-kingdom-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}
.pf-kingdom-btn{padding:10px 12px;border-radius:12px;border:2px solid rgba(0,0,0,.08);background:#fff;cursor:pointer;font-size:.82rem;font-weight:600;transition:all .25s;font-family:inherit;color:#333;display:flex;align-items:center;gap:8px;justify-content:center}
.pf-kingdom-btn img{width:24px;height:auto;border-radius:3px;flex-shrink:0}
.pf-kingdom-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.1);border-color:var(--kc)}
.pf-kingdom-btn.selected{color:#fff;box-shadow:0 6px 16px -4px var(--ks);border-color:transparent}

/* DANGER ZONE — одна кнопка */
.pf-danger-btn{width:100%;padding:14px 20px;border-radius:12px;border:2px solid #e74c3c;background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;font-size:.9rem;font-weight:800;cursor:pointer;font-family:inherit;transition:all .25s;text-align:center}
.pf-danger-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px -4px rgba(231,76,60,.5)}

/* MODAL */
.pf-modal-bg{position:fixed;inset:0;background:rgba(10,10,26,.65);backdrop-filter:blur(8px);z-index:999998;display:flex;align-items:center;justify-content:center;padding:20px;animation:pfFade .25s ease;overflow-y:auto}
.pf-modal{background:#fff;border-radius:20px;padding:28px;max-width:480px;width:100%;box-shadow:0 24px 70px -12px rgba(0,0,0,.5);animation:pfSlideUp .35s cubic-bezier(.16,1,.3,1);margin:auto}
.pf-modal h3{margin:0 0 8px 0;font-size:1.2rem;color:#1a1a2e;display:flex;align-items:center;gap:8px}
.pf-modal p{margin:0 0 18px 0;color:#666;font-size:.88rem;line-height:1.5}
.pf-modal-input{width:100%;padding:12px 16px;border-radius:12px;border:2px solid #e8eaf0;font-size:.95rem;font-family:inherit;outline:none;background:#fafafa;margin-bottom:12px;box-sizing:border-box;transition:all .25s}
.pf-modal-input:focus{border-color:var(--kc);background:#fff;box-shadow:0 0 0 4px var(--ks)}
.pf-modal textarea.pf-modal-input{min-height:100px;resize:vertical}
.pf-modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:8px;flex-wrap:wrap}
.pf-modal-actions button{flex:1;min-width:100px}
.pf-modal-note-editor{min-height:200px}
.pf-modal-avatar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:10px;margin-bottom:16px}
.pf-modal-avatar-grid img{width:100%;aspect-ratio:1;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s;background:#f0f0f5}
.pf-modal-avatar-grid img:hover{transform:scale(1.08);border-color:var(--kc)}
.pf-modal-avatar-grid img.selected{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}

/* TOAST */
.pf-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(120px);padding:12px 26px;border-radius:30px;font-weight:700;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:999999;transition:transform .4s cubic-bezier(.16,1,.3,1);color:#fff;max-width:90vw}
.pf-toast.show{transform:translateX(-50%) translateY(0)}
.pf-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.pf-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.pf-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}

.pf-skel{background:linear-gradient(90deg,#f0f0f4 25%,#f8f8fc 50%,#f0f0f4 75%);background-size:200% 100%;animation:pfShine 1.5s ease-in-out infinite;border-radius:14px;margin-bottom:16px}

/* DARK */
body.mars-stars-on .pf-mypage,
body.mars-stars-on .pf-card,
body.mars-stars-on .pf-quick-card,
body.mars-stars-on .pf-ach,
body.mars-stars-on .pf-friend,
body.mars-stars-on .pf-tabs,
body.mars-stars-on .pf-modal,
body.mars-stars-on .pf-note,
body.mars-stars-on .pf-chart,
body.mars-stars-on .pf-tabs-scroll{background:#14142a;border-color:rgba(108,99,255,.3);color:#e0e0f0}
body.mars-stars-on .pf-mypage-title,
body.mars-stars-on .pf-card-title,
body.mars-stars-on .pf-quick-title,
body.mars-stars-on .pf-ach-name,
body.mars-stars-on .pf-friend-name,
body.mars-stars-on .pf-note-title,
body.mars-stars-on .pf-chart-title{color:#e0e0f0}
body.mars-stars-on .pf-tab{color:#9999bb}
body.mars-stars-on .pf-tab:hover{background:rgba(108,99,255,.12);color:#fff}
body.mars-stars-on .pf-chat{background:rgba(20,20,40,.6);border-color:rgba(108,99,255,.3)}
body.mars-stars-on .pf-chat-msg.bot{background:#252550;color:#e0e0f0}
body.mars-stars-on .pf-chat-chip{background:#14142a;color:#ccc;border-color:rgba(108,99,255,.3)}
body.mars-stars-on .pf-chat-chip:hover{background:var(--kc);color:#fff}
body.mars-stars-on .pf-modal{background:#14142a}
body.mars-stars-on .pf-modal h3{color:#e0e0f0}
body.mars-stars-on .pf-modal p{color:#aaa}
body.mars-stars-on .pf-modal-input{background:#1a1a30;color:#e0e0f0;border-color:rgba(108,99,255,.3)}
body.mars-stars-on .pf-icon-btn{background:#252550;border-color:rgba(108,99,255,.3);color:#ccc}
body.mars-stars-on .pf-ach{background:#1a1a30}
body.mars-stars-on .pf-friend{background:rgba(108,99,255,.08)}
body.mars-stars-on .pf-note{background:#1a1a30}
body.mars-stars-on .pf-notes-search{background:#1a1a30;color:#e0e0f0;border-color:rgba(108,99,255,.3)}

/* MOBILE */
@media(max-width:600px){
    .pf-hero{padding:26px 20px}
    .pf-avatar{width:90px;height:90px}
    .pf-avatar-badge{width:22px;height:22px;font-size:.62rem;bottom:16px}
    .pf-name{font-size:1.4rem}
    .pf-tabs{padding:4px}
    .pf-tab{padding:8px 12px;font-size:.78rem}
    .pf-card{padding:18px 16px}
    .pf-quick-grid{grid-template-columns:1fr 1fr;gap:8px}
    .pf-quick-card{padding:12px 10px;flex-direction:column;text-align:center;gap:6px}
    .pf-quick-title{font-size:.78rem}
    .pf-quick-desc{display:none}
    .pf-ach-grid{grid-template-columns:1fr}
    .pf-mypage{padding:18px 16px}
    .pf-mypage-grid{grid-template-columns:1fr 1fr}
    .pf-mypage-actions{grid-template-columns:1fr}
    .pf-chat-msg{max-width:92%}
    .pf-leaderboard th:nth-child(4),
    .pf-leaderboard td:nth-child(4){display:none}
    .pf-notes-grid{grid-template-columns:1fr}
    .pf-avatar-option{width:56px;height:56px}
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
var MY_KEY='mars-auth-v1';
var SB_KEY='sb-ncytbgbzfjfoqmmgfygz-auth-token';
var BACKUP_KEY='mars-auth-backup';
var CACHE_KEY='mars-profile-cache-v3';
var ACTIVITY_KEY='mars-activity-v1';
var XP_HISTORY_KEY='mars-xp-history';
var CHAT_KEY='mars-ai-chat-history';
var TAB_KEY='mars-profile-tab-v3';
var ACH_FILTER_KEY='mars-ach-filter';

var container=document.getElementById('profile-app');
if(!container)return;

var KINGDOM_FLAGS={
'Эдем':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eden.jpg',
'Аркадия':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/map/flag-of-arkadia.png',
'Эридания':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eridania.png',
'Кхонг':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-khong.png',
'Авсония':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-avsonia.png',
'Кимерия':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-kimeria.png',
'Серпентида':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-serpentida.png',
'Эритрей':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eritrea.png',
'Утопия':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-utopia.png',
'Эллада':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-hellas.png',
'Аливасото':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-alivasoto.png',
'Ксанф':'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/coat-of-arms-of-ksanf.png'
};
var KINGDOM_COLORS={
'Аркадия':'#D4A574','Ксанф':'#3D3D3D','Эдем':'#F4A460','Эридания':'#F5D76E',
'Кхонг':'#A9A9A9','Авсония':'#87CEEB','Кимерия':'#B19CD9','Серпентида':'#E57373',
'Эритрей':'#64B5F6','Утопия':'#4DD0E1','Эллада':'#FF8A65','Аливасото':'#81C784'
};
var KINGDOMS_ORDER=['Эдем','Аркадия','Эридания','Кхонг','Авсония','Кимерия','Серпентида','Эритрей','Утопия','Эллада','Аливасото','Ксанф'];

/* АВАТАРКИ — 2 ряда */
var AVATARS_TOP=[
'/assets/images/аватар1.png',
'/assets/images/аватар2.png',
'/assets/images/аватар3.png',
'/assets/images/аватар4.png',
'/assets/images/аватар5.png'
];
var AVATARS_BOTTOM=[
'/assets/images/авотарка%20девушки.png',
'/assets/images/мужчина.png',
'/assets/images/мужчина2.png',
'/assets/images/мужчина%203.png',
'/assets/images/аватар%202.png'
];
var ALL_AVATARS=AVATARS_TOP.concat(AVATARS_BOTTOM);

var COIN_IMG='/assets/images/guild-coin.jpg';

var ROLES=[
{lvl:1,name:'🌱 Поселенец'},{lvl:6,name:'🔭 Исследователь'},{lvl:11,name:'🚀 Первопроходец'},
{lvl:16,name:'🏠 Колонизатор'},{lvl:21,name:'⚡ Командир'},{lvl:31,name:'🛡️ Хранитель Марса'},
{lvl:41,name:'🏛️ Сенатор'},{lvl:51,name:'⚔️ Мастер'},{lvl:61,name:'💎 Лорд'},
{lvl:71,name:'🔥 Феникс'},{lvl:81,name:'🌟 Легенда'},{lvl:91,name:'👑 Полубог'},{lvl:100,name:'🐉 Бессмертный'}
];
function getRole(l){var r=ROLES[0];for(var i=0;i<ROLES.length;i++)if(l>=ROLES[i].lvl)r=ROLES[i];return r.name;}

var ALL_ACHIEVEMENTS=[
{id:1,n:'Первый шаг',i:'👣',d:'Зарегистрироваться',c:'start'},
{id:2,n:'Марсианин',i:'🔴',d:'Выбрать королевство',c:'start'},
{id:3,n:'Аватар',i:'🎨',d:'Установить аватарку',c:'start'},
{id:4,n:'Биография',i:'📝',d:'Заполнить о себе',c:'start'},
{id:5,n:'Именованный',i:'✍️',d:'Сменить имя',c:'start'},
{id:10,n:'Читатель',i:'📖',d:'5 статей',c:'read'},
{id:11,n:'Эрудит',i:'🎓',d:'25 статей',c:'read'},
{id:12,n:'Учёный',i:'🔬',d:'50 статей',c:'read'},
{id:13,n:'Хранитель',i:'📚',d:'100 статей',c:'read'},
{id:14,n:'Библиотекарь',i:'📔',d:'200 статей',c:'read'},
{id:15,n:'Архивариус',i:'🗂️',d:'300 статей',c:'read'},
{id:16,n:'Ночной читатель',i:'🌙',d:'Читать после 23:00',c:'read'},
{id:17,n:'Ранняя пташка',i:'🌅',d:'Читать до 7:00',c:'read'},
{id:18,n:'Глубокое чтение',i:'🤿',d:'10 статей до конца',c:'read'},
{id:19,n:'Искатель',i:'🔍',d:'Поиск',c:'read'},
{id:20,n:'Первые 10',i:'⚡',d:'10 XP',c:'xp'},
{id:21,n:'Сотка',i:'💯',d:'100 XP',c:'xp'},
{id:22,n:'Пятисотка',i:'🔥',d:'500 XP',c:'xp'},
{id:23,n:'Тысячник',i:'🏆',d:'1000 XP',c:'xp'},
{id:24,n:'Пять тысяч',i:'💎',d:'5000 XP',c:'xp'},
{id:25,n:'Десятка',i:'🎯',d:'10000 XP',c:'xp'},
{id:26,n:'Пятидесятка',i:'👑',d:'50000 XP',c:'xp'},
{id:27,n:'Стотысячник',i:'🌟',d:'100000 XP',c:'xp'},
{id:30,n:'Уровень 5',i:'⑤',d:'5 уровень',c:'lvl'},
{id:31,n:'Уровень 10',i:'⑩',d:'10 уровень',c:'lvl'},
{id:32,n:'Уровень 20',i:'⑳',d:'20 уровень',c:'lvl'},
{id:33,n:'Уровень 30',i:'③',d:'30 уровень',c:'lvl'},
{id:34,n:'Уровень 50',i:'⑤',d:'50 уровень',c:'lvl'},
{id:35,n:'Уровень 75',i:'⑦',d:'75 уровень',c:'lvl'},
{id:36,n:'Уровень 100',i:'💯',d:'100 уровень',c:'lvl'},
{id:40,n:'Неделя',i:'🔥',d:'7 дней',c:'streak'},
{id:41,n:'Две недели',i:'🔥',d:'14 дней',c:'streak'},
{id:42,n:'Месяц',i:'💪',d:'30 дней',c:'streak'},
{id:43,n:'Сто дней',i:'⚡',d:'100 дней',c:'streak'},
{id:44,n:'Полгода',i:'🏅',d:'180 дней',c:'streak'},
{id:45,n:'Год',i:'🏆',d:'365 дней',c:'streak'},
{id:50,n:'Первый друг',i:'👥',d:'1 друг',c:'social'},
{id:51,n:'Компания',i:'👨‍👩‍👧',d:'5 друзей',c:'social'},
{id:52,n:'Круг общения',i:'🫂',d:'10 друзей',c:'social'},
{id:53,n:'Популярный',i:'⭐',d:'25 друзей',c:'social'},
{id:54,n:'Социальный',i:'💫',d:'50 друзей',c:'social'},
{id:55,n:'Легенда',i:'🌟',d:'100 друзей',c:'social'},
{id:60,n:'Новичок',i:'🏰',d:'В гильдии',c:'guild'},
{id:61,n:'Основатель',i:'👑',d:'Создать гильдию',c:'guild'},
{id:62,n:'Участник',i:'🛡️',d:'5 в гильдии',c:'guild'},
{id:63,n:'Командир',i:'⚔️',d:'10 в гильдии',c:'guild'},
{id:64,n:'Мастер',i:'🏛️',d:'25 в гильдии',c:'guild'},
{id:65,n:'Правитель',i:'👑',d:'50 в гильдии',c:'guild'},
{id:70,n:'Первый талант',i:'🪙',d:'1 талант',c:'currency'},
{id:71,n:'Сто талантов',i:'💰',d:'100 талантов',c:'currency'},
{id:72,n:'Богач',i:'💎',d:'1000 талантов',c:'currency'},
{id:73,n:'Магнат',i:'👑',d:'10000 талантов',c:'currency'},
{id:80,n:'Эдемец',i:'🌅',d:'Выбрать Эдем',c:'kingdom'},
{id:81,n:'Аркадец',i:'🏛️',d:'Аркадию',c:'kingdom'},
{id:82,n:'Кимер',i:'🔮',d:'Кимерию',c:'kingdom'},
{id:83,n:'Серпентид',i:'🐍',d:'Серпентиду',c:'kingdom'},
{id:84,n:'Утопиец',i:'🌌',d:'Утопию',c:'kingdom'},
{id:85,n:'Пират',i:'⚓',d:'Ксанф',c:'kingdom'},
{id:86,n:'Странник',i:'🧭',d:'Сменить королевство',c:'kingdom'},
{id:87,n:'Мореход',i:'⛵',d:'Все моря',c:'kingdom'},
{id:90,n:'Ночной страж',i:'🌙',d:'7 ночей',c:'special'},
{id:91,n:'Трудоголик',i:'⚙️',d:'10 часов',c:'special'},
{id:92,n:'Марафонец',i:'🏃',d:'50 часов',c:'special'},
{id:93,n:'Легенда сайта',i:'🌟',d:'100 часов',c:'special'},
{id:94,n:'Комментатор',i:'💬',d:'1 коммент',c:'special'},
{id:95,n:'Оратор',i:'🗣️',d:'50 комментов',c:'special'},
{id:96,n:'Летописец',i:'📜',d:'100 комментов',c:'special'},
{id:97,n:'Кузнец слов',i:'⚒️',d:'10 заметок',c:'special'},
{id:98,n:'Заметочник',i:'📔',d:'50 заметок',c:'special'},
{id:99,n:'Архивист',i:'🗄️',d:'100 заметок',c:'special'},
{id:100,n:'Библиофил',i:'📚',d:'50 закладок',c:'special'},
{id:101,n:'Коллекционер',i:'🎁',d:'Все типы закладок',c:'special'},
{id:102,n:'Модератор',i:'🛡️',d:'Модерация',c:'special'},
{id:103,n:'Легенда Марса',i:'🔴',d:'Все базовые',c:'special'},
{id:104,n:'Исследователь',i:'🧭',d:'10 статей/день',c:'special'},
{id:105,n:'Квестер',i:'🗺️',d:'10 квестов',c:'special'},
{id:106,n:'Игрок',i:'🎮',d:'5 игр',c:'special'},
{id:107,n:'Дуэлянт',i:'⚔️',d:'10 дуэлей',c:'special'},
{id:108,n:'Астроном',i:'🔭',d:'10 наблюдений',c:'special'},
{id:109,n:'Провидец',i:'🔮',d:'10 гороскопов',c:'special'},
{id:110,n:'Оракул',i:'🧿',d:'100 гороскопов',c:'special'},
{id:111,n:'Ботаник',i:'🌿',d:'10 растений',c:'special'},
{id:112,n:'Геолог',i:'⛰️',d:'10 минералов',c:'special'},
{id:113,n:'Химик',i:'⚗️',d:'10 химий',c:'special'},
{id:114,n:'Биолог',i:'🧬',d:'20 биологий',c:'special'},
{id:115,n:'Астрофизик',i:'🌌',d:'20 астрономий',c:'special'}
];

var INTERACTIVE_BLOCKS=[
{href:'/interactive/exodus/',icon:'🚀',title:'К Исходу',desc:'История'},
{href:'/globe-map/',icon:'🌍',title:'Карта Марса',desc:'3D-глобус'},
{href:'/game/',icon:'👑',title:'Империя',desc:'Стратегия'},
{href:'/scan-dates/',icon:'🔍',title:'Сканер дат',desc:'Проверка'},
{href:'/weather/',icon:'🌡️',title:'Погода',desc:'Прогноз'},
{href:'/museum/',icon:'🏛️',title:'Музей',desc:'Виртуальный'},
{href:'/duel/',icon:'⚔️',title:'Дуэль',desc:'Сражения'},
{href:'/scene-generator/',icon:'🎬',title:'Сцены',desc:'Генератор'},
{href:'/sky/',icon:'🌠',title:'Небо Марса',desc:'Симулятор'},
{href:'/guilds/',icon:'🏰',title:'Гильдии',desc:'Объединения'},
{href:'/names/',icon:'🔤',title:'Имя',desc:'Генератор'},
{href:'/forum/',icon:'💬',title:'Форум',desc:'Общение'},
{href:'/scrolls/',icon:'📜',title:'Свитки',desc:'Летописи'},
{href:'/horoscope/',icon:'🔮',title:'Гороскоп',desc:'Предсказания'},
{href:'/top/',icon:'🏆',title:'Топ',desc:'Рейтинг'},
{href:'/quests/',icon:'🗺️',title:'Квесты',desc:'Задания'},
{href:'/feed/',icon:'📰',title:'Лента',desc:'События'},
{href:'/achievements/',icon:'🎁',title:'Награды',desc:'Достижения'},
{href:'/bookmarks/',icon:'📚',title:'Закладки',desc:'Сохранённое'},
{href:'/quest-map/',icon:'🗺️',title:'Квест-карта',desc:'Карта'},
{href:'/shop/',icon:'🛒',title:'Магазин',desc:'Таланты и VIP'},
{href:'/interactive/',icon:'🎮',title:'Интерактив',desc:'Все игры'}
];

var KNOWLEDGE_BASE=[
{id:'kimeria',k:['кимерия','кимери','кимер'],q:'Что такое Кимерия?',a:'Кимерия — северное королевство Марса, известное глиняными табличками и фиолетовым пламенем. 🏰 Столица — Окхасен.',l:'geography/kimeria/'},
{id:'arkadia',k:['аркадия','аркади'],q:'Что такое Аркадия?',a:'Аркадия — королевство Держателей Ветра. 🏛️ Известна мудрецами и редкими минералами.',l:'geography/arkadia/'},
{id:'eden',k:['эдем'],q:'Что такое Эдем?',a:'Эдем — королевство с золотыми песками. 🌅 Старейшая династия Марса.',l:'geography/eden/'},
{id:'ksanf',k:['ксанф','пират'],q:'Что такое Ксанф?',a:'Ксанф — пиратское королевство. ⚓ Совет Пиратских Королей.',l:'history/pirate-kingdom/'},
{id:'hevsur',k:['хевсур','летописец'],q:'Кто такой Хевсур?',a:'Хевсур — легендарный летописец Кимерии. 📜 Автор Свитков Хевсура.',l:'people/hevsur/'},
{id:'talin',k:['талин','астроном'],q:'Кто такой Талин?',a:'Талин — великий астроном. 🔭 Составил марсианский календарь.',l:'people/talin/'},
{id:'xp',k:['опыт','xp','экспа'],q:'Как получить опыт?',a:'XP даётся за: 📖 статьи, 💬 комментарии, 🎯 квесты, 🏅 достижения. +5 XP за статью.',l:'profile/'},
{id:'levels',k:['уровн','lvl'],q:'Как работают уровни?',a:'Уровень растёт за XP. 📈 Нужно `(уровень+1)^1.8 × 20` опыта. 100 уровней.',l:'profile/'},
{id:'achievements',k:['достижени','наград'],q:'Что такое достижения?',a:'Награды за действия. 🏅 100+ разных. Видны в профиле.',l:'achievements/'},
{id:'guilds',k:['гильди'],q:'Что такое гильдии?',a:'Объединения игроков. 🏰 Свои или чужие. До 50 участников.',l:'guilds/'},
{id:'currency',k:['талант','валют'],q:'Что такое таланты?',a:'Валюта Марса. 🪙 За достижения и квесты. На кастомизацию.',l:'profile/'},
{id:'faq-reg',k:['регистрац','войти'],q:'Как зарегистрироваться?',a:'Нажми «Регистрация» в шапке. 📝 Введи email и пароль.',l:'register/'},
{id:'faq-save',k:['закладк','сохранить'],q:'Как сохранить статью?',a:'В статье нажми 🔖. 📚 Все закладки — в разделе «Мои закладки».',l:'bookmarks/'}
];

function findAnswer(q){
    if(!q)return null;
    var low=q.toLowerCase().replace(/[^\u0400-\u04FFa-z0-9\s]/g,' ').trim();
    if(!low)return null;
    var stop=['что','такое','кто','это','где','как','когда','почему','мне','про','о','в','на','и','с','у','для'];
    var words=low.split(/\s+/).filter(function(w){return w.length>2&&stop.indexOf(w)===-1;});
    if(!words.length)return null;
    var best=null,bestScore=0;
    for(var i=0;i<KNOWLEDGE_BASE.length;i++){
        var it=KNOWLEDGE_BASE[i],score=0;
        for(var w=0;w<words.length;w++){
            for(var k=0;k<it.k.length;k++){
                if(words[w]===it.k[k]){score+=5;break;}
                if(words[w].indexOf(it.k[k])===0||it.k[k].indexOf(words[w])===0){score+=3;break;}
            }
        }
        if(score>bestScore){bestScore=score;best=it;}
    }
    return bestScore>=3?best:null;
}

function readSession(){
    var keys=[MY_KEY,SB_KEY,BACKUP_KEY],raw=null,i;
    for(i=0;i<keys.length;i++){try{raw=localStorage.getItem(keys[i]);if(raw)break;}catch(e){}}
    if(!raw)for(i=0;i<keys.length;i++){try{raw=sessionStorage.getItem(keys[i]);if(raw)break;}catch(e){}}
    if(!raw)return null;
    try{
        var p=JSON.parse(raw);
        if(Array.isArray(p))p=p[p.length-1];
        if(!p||!p.access_token||!p.user)return null;
        if(p.expires_at&&p.expires_at*1000<Date.now())return null;
        return p;
    }catch(e){return null;}
}
function readCache(ttl){
    try{var raw=localStorage.getItem(CACHE_KEY);if(!raw)return null;
        var c=JSON.parse(raw);
        if(!c||Date.now()-c.ts>(ttl||2*60*1000))return null;
        return c.data;
    }catch(e){return null;}
}
function writeCache(data){try{localStorage.setItem(CACHE_KEY,JSON.stringify({data:data,ts:Date.now()}));}catch(e){}}

async function apiGet(path,token){
    var h={'apikey':SUPABASE_KEY};if(token)h['Authorization']='Bearer '+token;
    var res=await fetch(SUPABASE_URL+'/rest/v1/'+path,{headers:h});
    if(!res.ok){if(res.status===401)throw new Error('Не авторизован');throw new Error('HTTP '+res.status);}
    var t=await res.text();if(!t)return null;
    try{return JSON.parse(t);}catch(e){return null;}
}
async function apiPost(path,body,token,prefer){
    var h={'apikey':SUPABASE_KEY,'Content-Type':'application/json'};if(token)h['Authorization']='Bearer '+token;
    if(prefer)h['Prefer']=prefer;
    var res=await fetch(SUPABASE_URL+'/rest/v1/'+path,{method:'POST',headers:h,body:JSON.stringify(body)});
    if(!res.ok)throw new Error('HTTP '+res.status);
    var t=await res.text();if(!t)return null;
    try{return JSON.parse(t);}catch(e){return null;}
}
async function apiPatch(path,body,token){
    var h={'apikey':SUPABASE_KEY,'Content-Type':'application/json'};if(token)h['Authorization']='Bearer '+token;
    var res=await fetch(SUPABASE_URL+'/rest/v1/'+path,{method:'PATCH',headers:h,body:JSON.stringify(body)});
    if(!res.ok)throw new Error('HTTP '+res.status);
    return true;
}
async function apiDelete(path,token){
    var h={'apikey':SUPABASE_KEY};if(token)h['Authorization']='Bearer '+token;
    var res=await fetch(SUPABASE_URL+'/rest/v1/'+path,{method:'DELETE',headers:h});
    if(!res.ok)throw new Error('HTTP '+res.status);
    return true;
}

function esc(s){return String(s||'').replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
function escAttr(s){return String(s||'').replace(/['"\\<>]/g,function(m){return{"'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e'}[m];});}
function toast(msg,type){
    type=type||'info';
    var t=document.createElement('div');t.className='pf-toast '+type;t.textContent=msg;
    document.body.appendChild(t);
    requestAnimationFrame(function(){t.classList.add('show');});
    setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},400);},2500);
}
function trackActivity(){
    try{var a=JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'{}');
        var today=new Date().toISOString().slice(0,10);
        a[today]=(a[today]||0)+1;
        var cutoff=new Date(Date.now()-90*86400000).toISOString().slice(0,10);
        Object.keys(a).forEach(function(k){if(k<cutoff)delete a[k];});
        localStorage.setItem(ACTIVITY_KEY,JSON.stringify(a));
    }catch(e){}
}
function getActivity(){try{return JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'{}');}catch(e){return{};}}
function getXPHistory(){try{return JSON.parse(localStorage.getItem(XP_HISTORY_KEY)||'{}');}catch(e){return{};}}
function getLevel(exp){
    exp=exp||0;var l=1;
    while(l<100&&exp>=Math.floor(Math.pow(l+1,1.8)*20))l++;
    var c=Math.floor(Math.pow(l,1.8)*20);
    var n=Math.floor(Math.pow(l+1,1.8)*20);
    return{level:l,current:c,next:n,percent:n>c?Math.min(((exp-c)/(n-c))*100,100):100};
}
function initials(n){if(!n)return '?';var p=String(n).trim().split(/[\s._-]+/);if(p.length>=2)return(p[0][0]+p[1][0]).toUpperCase();return n[0].toUpperCase();}
function avatarFallback(n){return 'https://ui-avatars.com/api/?name='+encodeURIComponent(initials(n))+'&background=6C63FF&color=fff&size=128&rounded=true';}

var currentUser=null,currentProfile=null;
var achievements=[],notes=[],notifications=[],leaders=[],friends=[],friendRequests=[];
var guild=null,guildMembers=[];
var streak=0,currency=0;
var chatHistory=[];
var achFilter='all';
var noteSearch='';
try{chatHistory=JSON.parse(localStorage.getItem(CHAT_KEY)||'[]');}catch(e){chatHistory=[];}
try{achFilter=localStorage.getItem(ACH_FILTER_KEY)||'all';}catch(e){}

var HELP={
role:'Должность зависит от уровня. От Поселенца до Бессмертного.',
kingdom:'Ваше королевство. Даёт свой цвет темы.',
currency:'Таланты — валюта Марса. За достижения и квесты.',
streak:'Серия дней подряд на сайте.',
friends:'Друзья. Нажми на друга чтобы открыть его профиль.',
achievements:'Награды за действия на сайте. 100+.',
guild:'Гильдия — объединение до 50 человек.',
mod:'Панель модерации.',
xp:'Опыт. +5 XP за статью.'
};
function help(t){return '<span class="pf-help" data-tip="'+escAttr(t)+'">?</span>';}

function render(){
    if(!currentProfile||!currentUser)return;
    var kc=KINGDOM_COLORS[currentProfile.kingdom]||'#6C63FF';
    document.documentElement.style.setProperty('--kc',kc);
    document.documentElement.style.setProperty('--kl',kc+'cc');
    document.documentElement.style.setProperty('--ks',kc+'40');
    document.documentElement.style.setProperty('--kb',kc+'15');

    var lvl=getLevel(currentProfile.experience||0);
    var name=currentProfile.display_name||currentProfile.username||(currentUser.email||'').split('@')[0];
    var avatar=currentProfile.avatar_url||avatarFallback(name);
    var role=getRole(lvl.level);
    var kingdom=currentProfile.kingdom;
    var flag=kingdom?KINGDOM_FLAGS[kingdom]:null;
    var mod=currentProfile.role==='moderator'||currentProfile.role==='admin';
    var xpLeft=Math.max(lvl.next-(currentProfile.experience||0),0);

    var h='';

    // HERO
    h+='<div class="pf-hero pf-fade"><div class="pf-hero-content">';
    h+='<div class="pf-avatar-wrap" onclick="pfOpenAvatarPicker()" title="Сменить аватар">';
    h+='<div class="pf-avatar-ring"></div>';
    h+='<img src="'+escAttr(avatar)+'" class="pf-avatar" onerror="this.onerror=null;this.src=\''+avatarFallback(name)+'\';">';
    h+='<div class="pf-avatar-badge">📷</div>';
    h+='<div class="pf-role-badge">'+esc(role)+'</div>';
    h+='</div>';
    h+='<div class="pf-info">';
    h+='<h1 class="pf-name" onclick="pfEditName()">'+esc(name)+' <span class="pf-name-edit">✏️</span>';
    if(mod)h+=' <span class="pf-mod-badge" onclick="event.stopPropagation();pfSetTab(\'moderation\')">🛡️ Модератор</span>';
    h+='</h1>';
    if(kingdom){
        h+='<div style="margin-bottom:12px;"><span class="pf-kingdom-badge" onclick="pfSetTab(\'settings\')">'+(flag?'<img src="'+escAttr(flag)+'">':'')+' '+esc(kingdom)+'</span></div>';
    } else {
        h+='<div style="margin-bottom:12px;"><span class="pf-kingdom-badge" onclick="pfSetTab(\'settings\')">🏰 Выбрать королевство</span></div>';
    }
    h+='<p class="pf-email">'+esc(currentUser.email||'')+'</p>';
    h+='<div class="pf-stats">';
    h+='<div class="pf-stat-item" onclick="pfSetTab(\'achievements\')" title="К достижениям"><div class="pf-stat-label">Уровень</div><div class="pf-stat-value">⭐ '+lvl.level+'</div></div>';
    h+='<div class="pf-stat-item" onclick="pfSetTab(\'activity\')" title="К активности"><div class="pf-stat-label">Опыт '+help(HELP.xp)+'</div><div class="pf-stat-value">💎 '+(currentProfile.experience||0)+'</div></div>';
    h+='<div class="pf-stat-item" onclick="pfSetTab(\'achievements\')"><div class="pf-stat-label">Награды</div><div class="pf-stat-value">🏆 '+achievements.length+'</div></div>';
    if(streak>0)h+='<div class="pf-stat-item" onclick="pfSetTab(\'activity\')"><div class="pf-stat-label">Серия '+help(HELP.streak)+'</div><div class="pf-stat-value">🔥 '+streak+'</div></div>';
    h+='<div class="pf-stat-item" onclick="pfSetTab(\'friends\')" title="К друзьям"><div class="pf-stat-label">Друзья</div><div class="pf-stat-value">👥 '+friends.length+'</div></div>';
    h+='</div>';
    h+='<div class="pf-currency-click" onclick="window.location.href=\'/shop/\'" title="В магазин">';
    h+='<img src="'+COIN_IMG+'" class="pf-stat-coin"> <span>'+currency+'</span> талантов →';
    h+='</div>';
    h+='<div class="pf-progress-bar"><div class="pf-progress-fill" style="width:'+lvl.percent+'%"></div></div>';
    h+='<div class="pf-progress-text">До уровня '+(lvl.level+1)+': '+xpLeft+' XP</div>';
    h+='</div></div></div>';

    // MY PAGE
    h+='<div class="pf-mypage">';
    h+='<div class="pf-mypage-header"><h2 class="pf-mypage-title">Моя страничка</h2><p class="pf-mypage-sub">Быстрый обзор</p></div>';
    h+='<div class="pf-mypage-grid">';
    h+='<div class="pf-mypage-tile" onclick="pfSetTab(\'achievements\')"><div class="pf-mypage-tile-label">Достижения</div><div class="pf-mypage-tile-value">'+achievements.length+'/'+ALL_ACHIEVEMENTS.length+'</div><div class="pf-mypage-tile-sub">'+Math.round(achievements.length/ALL_ACHIEVEMENTS.length*100)+'% собрано</div></div>';
    h+='<div class="pf-mypage-tile" onclick="pfSetTab(\'notes\')"><div class="pf-mypage-tile-label">Заметки</div><div class="pf-mypage-tile-value">'+notes.length+'</div><div class="pf-mypage-tile-sub">личных записей</div></div>';
    h+='<div class="pf-mypage-tile" onclick="pfSetTab(\'friends\')"><div class="pf-mypage-tile-label">Друзья</div><div class="pf-mypage-tile-value">'+friends.length+'</div><div class="pf-mypage-tile-sub">в кругу</div></div>';
    h+='<div class="pf-mypage-tile" onclick="pfSetTab(\'activity\')"><div class="pf-mypage-tile-label">Дней на сайте</div><div class="pf-mypage-tile-value">'+Object.keys(getActivity()).length+'</div><div class="pf-mypage-tile-sub">активных</div></div>';
    h+='</div>';
    h+='<div class="pf-mypage-actions">';
    h+='<a href="/achievements/" class="pf-mypage-action"><span class="pf-mypage-action-icon">🏅</span>Все награды</a>';
    h+='<a href="/bookmarks/" class="pf-mypage-action"><span class="pf-mypage-action-icon">📚</span>Закладки</a>';
    h+='<a href="/quests/" class="pf-mypage-action"><span class="pf-mypage-action-icon">🗺️</span>Квесты</a>';
    h+='<a href="/shop/" class="pf-mypage-action"><span class="pf-mypage-action-icon">🛒</span>Магазин</a>';
    h+='</div></div>';

    // QUICK GRID
    h+='<div class="pf-quick-grid">';
    INTERACTIVE_BLOCKS.forEach(function(q){
        h+='<a href="'+q.href+'" class="pf-quick-card"><div class="pf-quick-icon">'+q.icon+'</div><div><div class="pf-quick-title">'+q.title+'</div><div class="pf-quick-desc">'+q.desc+'</div></div></a>';
    });
    h+='</div>';

    // TABS
    var tabs=[
        {id:'overview',icon:'👤',label:'Обзор'},
        {id:'activity',icon:'📊',label:'Активность'}
    ];
    if(mod)tabs.push({id:'moderation',icon:'🛡️',label:'Модерация',cls:'mod-tab'});
    tabs.push(
        {id:'guild',icon:'🏰',label:'Гильдия'},
        {id:'achievements',icon:'🏅',label:'Достижения',count:achievements.length},
        {id:'notes',icon:'📝',label:'Заметки',count:notes.length},
        {id:'friends',icon:'👥',label:'Друзья',count:friends.length},
        {id:'ai',icon:'🤖',label:'ИИ-гид'},
        {id:'notifications',icon:'🔔',label:'Уведомления'},
        {id:'leaderboard',icon:'🏆',label:'Лидеры'},
        {id:'security',icon:'🔐',label:'Безопасность'},
        {id:'settings',icon:'⚙️',label:'Настройки'}
    );

    var active=localStorage.getItem(TAB_KEY)||'overview';
    if(!tabs.find(function(t){return t.id===active;}))active='overview';

    h+='<div class="pf-tabs-wrap">';
    h+='<button class="pf-tabs-scroll left" onclick="pfScrollTabs(-200)">‹</button>';
    h+='<div class="pf-tabs" id="pf-tabs">';
    tabs.forEach(function(t){
        h+='<button class="pf-tab '+(t.cls||'')+(t.id===active?' active':'')+'" data-tab="'+t.id+'">'+t.icon+' '+t.label+(t.count?' <span class="pf-tab-count">'+t.count+'</span>':'')+'</button>';
    });
    h+='</div>';
    h+='<button class="pf-tabs-scroll right" onclick="pfScrollTabs(200)">›</button>';
    h+='</div>';

    // OVERVIEW
    h+='<div class="pf-tab-content'+(active==='overview'?' active':'')+'" data-content="overview">';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>';
    h+='<p style="margin:0 0 12px 0;color:#555;font-size:.95rem;line-height:1.6;" id="pf-bio">'+esc(currentProfile.bio||'✍️ Ещё ничего не рассказал о себе.')+'</p>';
    h+='<button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button></div>';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>';
    var md=getMartianDate();
    h+='<div style="text-align:center;padding:20px;background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.4));border-radius:14px;">';
    h+='<div style="font-size:1.2rem;font-weight:800;color:var(--kc);">'+md.month+'</div>';
    h+='<div style="font-size:2.5rem;font-weight:900;color:#1a1a1a;margin:6px 0;">'+md.day+'</div>';
    h+='<div style="font-size:.9rem;color:#666;">Год '+md.year+' Э.О.</div>';
    h+='</div></div></div>';

    // ACTIVITY
    h+='<div class="pf-tab-content'+(active==='activity'?' active':'')+'" data-content="activity">';
    h+='<div class="pf-charts-grid">';
    // Bar chart — XP за 14 дней
    var xh=getXPHistory();
    var days14=[];var maxXp=1;
    for(var i=13;i>=0;i--){
        var d=new Date(Date.now()-i*86400000);
        var key=d.toISOString().slice(0,10);
        var v=xh[key]||0;
        if(v>maxXp)maxXp=v;
        days14.push({v:v,d:d});
    }
    h+='<div class="pf-chart"><div class="pf-chart-title">📈 XP за 14 дней</div>';
    h+='<div class="pf-bar-chart">';
    days14.forEach(function(day){
        var pct=(day.v/maxXp)*100;
        h+='<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%;"><div class="pf-bar" style="height:'+Math.max(pct,3)+'%" data-val="'+day.v+'"></div></div>';
    });
    h+='</div>';
    h+='<div style="display:flex;gap:6px;margin-top:4px;">';
    days14.forEach(function(day){
        h+='<div style="flex:1;font-size:.6rem;color:#999;text-align:center;font-weight:700;">'+day.d.getDate()+'</div>';
    });
    h+='</div></div>';
    // Pie — распределение XP по типам (мок)
    h+='<div class="pf-chart"><div class="pf-chart-title">🥧 Источники XP</div>';
    h+='<div class="pf-pie-wrap">';
    h+='<div class="pf-pie" style="background:conic-gradient(#6C63FF 0 45%,#f39c12 45% 75%,#27ae60 75% 90%,#e74c3c 90% 100%);"></div>';
    h+='<div class="pf-pie-legend">';
    h+='<div class="pf-pie-legend-item"><span class="pf-pie-dot" style="background:#6C63FF;"></span><span class="pf-pie-label">Чтение</span><span class="pf-pie-value">45%</span></div>';
    h+='<div class="pf-pie-legend-item"><span class="pf-pie-dot" style="background:#f39c12;"></span><span class="pf-pie-label">Квесты</span><span class="pf-pie-value">30%</span></div>';
    h+='<div class="pf-pie-legend-item"><span class="pf-pie-dot" style="background:#27ae60;"></span><span class="pf-pie-label">Достижения</span><span class="pf-pie-value">15%</span></div>';
    h+='<div class="pf-pie-legend-item"><span class="pf-pie-dot" style="background:#e74c3c;"></span><span class="pf-pie-label">Прочее</span><span class="pf-pie-value">10%</span></div>';
    h+='</div></div></div>';
    h+='</div>';
    // Heatmap
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔥</span> Активность за 90 дней '+help('Каждая клетка — день. Чем ярче — тем больше визитов.')+'</h3>';
    h+='<div class="pf-heatmap">'+renderHeatmap()+'</div>';
    h+='</div></div>';

    // MODERATION
    if(mod){
        h+='<div class="pf-tab-content'+(active==='moderation'?' active':'')+'" data-content="moderation">';
        h+='<div class="pf-card" style="background:linear-gradient(135deg,rgba(231,76,60,.05),rgba(192,57,43,.03));border:2px solid rgba(231,76,60,.25);">';
        h+='<h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">🛡️</span> Центр модерации</h3>';
        h+='<a href="/lists/moderation/" class="pf-btn pf-btn-danger">🛡️ Открыть панель</a>';
        h+='</div></div>';
    }

    // GUILD
    h+='<div class="pf-tab-content'+(active==='guild'?' active':'')+'" data-content="guild">';
    if(guild){
        h+='<div class="pf-card" onclick="window.location.href=\'/guilds/\'" style="cursor:pointer;background:linear-gradient(135deg,'+(guild.color||kc)+',rgba(0,0,0,.2));color:#fff;padding:26px 28px;border-radius:18px;margin-bottom:18px;transition:all .3s;" onmouseover="this.style.transform=\'translateY(-4px)\';this.style.boxShadow=\'0 20px 50px -14px rgba(0,0,0,.4)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">';
        h+='<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;">';
        h+='<div style="width:76px;height:76px;border-radius:18px;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:2px solid rgba(255,255,255,.45);">'+(guild.icon||'🏰')+'</div>';
        h+='<div style="flex:1;"><div style="font-size:1.5rem;font-weight:800;margin-bottom:6px;">'+esc(guild.name)+'</div>';
        h+='<div style="font-size:.85rem;opacity:.92;">👥 '+guildMembers.length+' участников · нажми чтобы открыть →</div></div></div></div>';
        h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📜</span> Описание</h3>';
        h+='<p style="margin:0;color:#555;line-height:1.6;">'+esc(guild.description||'Без описания')+'</p></div>';
        h+='<div class="pf-card"><a href="/guilds/" class="pf-btn pf-btn-outline">🏰 В раздел гильдий</a>';
        if(guild.leader_id===currentUser.id)h+='<button class="pf-btn pf-btn-danger" style="margin-left:8px;" onclick="pfDeleteGuild()">🗑️ Удалить</button>';
        h+='</div>';
    }else{
        h+='<div class="pf-card" style="text-align:center;padding:50px 20px;"><div style="font-size:4rem;margin-bottom:12px;">🏰</div>';
        h+='<h3 style="margin:0 0 8px 0;">Вы не в гильдии</h3>';
        h+='<a href="/guilds/" class="pf-btn">🔍 Найти гильдию</a></div>';
    }
    h+='</div>';

    // ACHIEVEMENTS
    h+='<div class="pf-tab-content'+(active==='achievements'?' active':'')+'" data-content="achievements">';
    h+='<div class="pf-card">';
    h+='<h3 class="pf-card-title"><span class="pf-ct-icon">🏅</span> Достижения ('+achievements.length+'/'+ALL_ACHIEVEMENTS.length+')</h3>';
    h+='<div style="height:10px;background:rgba(108,99,255,.1);border-radius:10px;overflow:hidden;margin-bottom:16px;"><div style="height:100%;width:'+Math.round(achievements.length/ALL_ACHIEVEMENTS.length*100)+'%;background:linear-gradient(90deg,var(--kc),var(--kl));border-radius:10px;"></div></div>';
    h+='<div class="pf-ach-filters">';
    [{id:'all',n:'Все'},{id:'start',n:'Начало'},{id:'read',n:'Чтение'},{id:'xp',n:'Опыт'},{id:'lvl',n:'Уровни'},{id:'streak',n:'Серия'},{id:'social',n:'Друзья'},{id:'guild',n:'Гильдии'},{id:'currency',n:'Валюта'},{id:'kingdom',n:'Королевства'},{id:'special',n:'Особые'}].forEach(function(f){
        h+='<button class="pf-ach-filter'+(achFilter===f.id?' active':'')+'" data-filter="'+f.id+'">'+f.n+'</button>';
    });
    h+='</div>';
    h+='<div class="pf-ach-grid" id="pf-ach-grid">'+renderAchGrid()+'</div>';
    h+='</div></div>';

    // NOTES
    h+='<div class="pf-tab-content'+(active==='notes'?' active':'')+'" data-content="notes">';
    h+='<div class="pf-card">';
    h+='<h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> Заметки ('+notes.length+')</h3>';
    h+='<div class="pf-notes-toolbar">';
    h+='<input type="text" class="pf-notes-search" placeholder="🔍 Поиск..." value="'+escAttr(noteSearch)+'" oninput="pfSearchNotes(this.value)">';
    h+='<button class="pf-btn" onclick="pfOpenNoteForm()">➕ Новая</button>';
    h+='</div>';
    var filtered=notes.filter(function(n){
        if(!noteSearch)return true;
        var q=noteSearch.toLowerCase();
        return (n.title||'').toLowerCase().indexOf(q)!==-1||(n.content||'').toLowerCase().indexOf(q)!==-1;
    });
    if(filtered.length===0){
        h+='<p style="text-align:center;color:#888;padding:40px 20px;">'+(noteSearch?'Ничего не найдено':'Пока нет заметок. Создай первую!')+'</p>';
    }else{
        h+='<div class="pf-notes-grid">';
        filtered.forEach(function(n,i){
            h+='<div class="pf-note'+(n.pinned?' pinned':'')+'" onclick="pfEditNote('+n.id+')" style="animation-delay:'+Math.min(i*.04,.3)+'s;border-left-color:'+(n.color||kc)+';">';
            if(n.pinned)h+='<span class="pf-note-pin">📌</span>';
            h+='<div class="pf-note-title">'+esc(n.title||'Без названия')+'</div>';
            h+='<div class="pf-note-content">'+esc(n.content)+'</div>';
            h+='<div class="pf-note-footer"><span>'+new Date(n.updated_at||n.created_at).toLocaleDateString('ru-RU')+'</span>';
            h+='<div class="pf-note-actions" onclick="event.stopPropagation();">';
            h+='<button onclick="pfPinNote('+n.id+')" title="'+(n.pinned?'Открепить':'Закрепить')+'">'+(n.pinned?'📍':'📌')+'</button>';
            h+='<button onclick="pfEditNote('+n.id+')" title="Изменить">✏️</button>';
            h+='<button class="danger" onclick="pfDeleteNote('+n.id+')" title="Удалить">🗑️</button>';
            h+='</div></div></div>';
        });
        h+='</div>';
    }
    h+='</div></div>';

    // FRIENDS — click to profile
    h+='<div class="pf-tab-content'+(active==='friends'?' active':'')+'" data-content="friends">';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👥</span> Друзья ('+friends.length+')</h3>';
    if(friends.length===0){
        h+='<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет друзей. Найди в разделе «Лидеры».</p>';
    }else{
        friends.forEach(function(f,i){
            var n=f.other.display_name||f.other.username||'Аноним';
            var av=f.other.avatar_url||avatarFallback(n);
            h+='<div class="pf-friend" onclick="pfOpenGuestProfile(\''+escAttr(f.other.user_id)+'\')" style="animation-delay:'+Math.min(i*.04,.3)+'s;">';
            h+='<img src="'+escAttr(av)+'" class="pf-friend-avatar" loading="lazy" onerror="this.onerror=null;this.src=\''+avatarFallback(n)+'\';">';
            h+='<div class="pf-friend-info"><div class="pf-friend-name">'+esc(n)+'</div><div class="pf-friend-status">👥 Друзья</div></div>';
            h+='<div class="pf-friend-actions" onclick="event.stopPropagation();">';
            h+='<button class="pf-icon-btn danger" onclick="pfRemoveFriend(\''+escAttr(f.other.user_id)+'\')" title="Удалить">✕</button>';
            h+='</div></div>';
        });
    }
    h+='</div>';
    if(friendRequests.length>0){
        h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📨</span> Заявки ('+friendRequests.length+')</h3>';
        friendRequests.forEach(function(f){
            var n=f.other.display_name||f.other.username||'Аноним';
            var av=f.other.avatar_url||avatarFallback(n);
            h+='<div class="pf-friend">';
            h+='<img src="'+escAttr(av)+'" class="pf-friend-avatar" onclick="pfOpenGuestProfile(\''+escAttr(f.other.user_id)+'\')" onerror="this.onerror=null;this.src=\''+avatarFallback(n)+'\';">';
            h+='<div class="pf-friend-info"><div class="pf-friend-name">'+esc(n)+'</div><div class="pf-friend-status">хочет дружить</div></div>';
            h+='<div class="pf-friend-actions">';
            h+='<button class="pf-icon-btn success" onclick="pfAcceptFriend(\''+escAttr(f.other.user_id)+'\')">✓</button>';
            h+='<button class="pf-icon-btn danger" onclick="pfDeclineFriend(\''+escAttr(f.other.user_id)+'\')">✕</button>';
            h+='</div></div>';
        });
        h+='</div>';
    }
    h+='</div>';

    // AI CHAT
    h+='<div class="pf-tab-content'+(active==='ai'?' active':'')+'" data-content="ai">';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🤖</span> ИИ-гид</h3>';
    h+='<div class="pf-chat-wrap">';
    h+='<div class="pf-chat" id="pf-chat-container">';
    if(chatHistory.length===0){
        h+='<div class="pf-chat-msg bot">Привет! Я ИИ-гид. 🪐<br>Спроси о королевствах, персонажах, истории!</div>';
    }else{
        chatHistory.slice(-30).forEach(function(m){
            h+='<div class="pf-chat-msg '+(m.role==='user'?'user':'bot')+'">'+formatChatMsg(m)+'</div>';
        });
    }
    h+='</div>';
    h+='<div class="pf-chat-suggestions">';
    ['Что такое Кимерия?','Кто такой Хевсур?','Как получить опыт?','Что такое гильдии?'].forEach(function(q){
        h+='<button type="button" class="pf-chat-chip" onclick="pfAskBot(\''+escAttr(q)+'\')">'+esc(q)+'</button>';
    });
    h+='</div>';
    h+='<div class="pf-chat-input">';
    h+='<input type="text" id="pf-chat-input" placeholder="Вопрос о Марсе..." onkeypress="if(event.key===\'Enter\')pfSendChat()">';
    h+='<button type="button" onclick="pfSendChat()">➤</button>';
    h+='</div></div></div></div>';

    // NOTIFICATIONS
    h+='<div class="pf-tab-content'+(active==='notifications'?' active':'')+'" data-content="notifications">';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Уведомления ('+notifications.length+')</h3>';
    if(notifications.length===0){
        h+='<p style="text-align:center;color:#888;padding:40px 20px;">Уведомлений нет.</p>';
    }else{
        notifications.forEach(function(n){
            h+='<div style="display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;">';
            h+='<div style="font-size:1.3rem;">📬</div>';
            h+='<div style="flex:1;"><div style="font-size:.88rem;color:#333;">'+esc(n.message||'')+'</div>';
            h+='<div style="font-size:.72rem;color:#999;margin-top:2px;">'+new Date(n.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div></div></div>';
        });
    }
    h+='</div></div>';

    // LEADERBOARD — click opens guest profile
    h+='<div class="pf-tab-content'+(active==='leaderboard'?' active':'')+'" data-content="leaderboard">';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10 '+help('Нажми на пользователя → откроется его профиль.')+'</h3>';
    if(leaders.length===0){
        h+='<p style="text-align:center;color:#888;padding:40px 20px;">Таблица недоступна.</p>';
    }else{
        h+='<table class="pf-leaderboard"><thead><tr><th>#</th><th>Участник</th><th style="text-align:right;">Ур.</th><th style="text-align:right;">XP</th></tr></thead><tbody>';
        leaders.forEach(function(l,i){
            var nm=l.display_name||l.username||'Аноним';
            var medals=['🥇','🥈','🥉'];
            var isMe=l.user_id===currentUser.id;
            var gb=l.guild_name?'<span class="pf-lb-guild">🏰 '+esc(l.guild_name)+'</span>':'';
            h+='<tr class="'+(isMe?'pf-me':'')+'" onclick="pfOpenGuestProfile(\''+escAttr(l.user_id)+'\')">';
            h+='<td>'+(medals[i]||(i+1))+'</td>';
            h+='<td><img src="'+escAttr(l.avatar_url||avatarFallback(nm))+'" class="pf-lb-avatar" loading="lazy" onerror="this.onerror=null;this.src=\''+avatarFallback(nm)+'\';">'+esc(nm)+(isMe?' (вы)':'')+gb+'</td>';
            h+='<td style="text-align:right;">'+(l.level||getLevel(l.experience||0).level)+'</td>';
            h+='<td style="text-align:right;"><b>'+(l.experience||0)+'</b></td></tr>';
        });
        h+='</tbody></table>';
    }
    h+='</div></div>';

    // SECURITY
    h+='<div class="pf-tab-content'+(active==='security'?' active':'')+'" data-content="security">';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📧</span> Email-2FA</h3>';
    h+='<div id="pf-2fa-status" style="margin-bottom:20px;"></div>';
    h+='<div class="pf-toggle"><div><div class="pf-toggle-label">🔐 Email-2FA</div><div class="pf-toggle-desc">Код при входе с новых устройств</div></div><div class="pf-switch" id="pf-switch-2fa" onclick="pfToggle2FA()"></div></div>';
    h+='</div>';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📱</span> Вход с другого устройства</h3>';
    h+='<p style="color:#666;font-size:.88rem;line-height:1.55;margin:0 0 14px;">QR-код для входа с телефона без пароля.</p>';
    h+='<button type="button" class="pf-btn" onclick="pfOpenDeviceLink()" style="width:100%;justify-content:center;">📱 Показать QR</button>';
    h+='</div>';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">💻</span> Доверенные устройства</h3>';
    h+='<div id="pf-trusted-devices"><p style="color:#888;">Загрузка...</p></div>';
    h+='<button class="pf-btn pf-btn-outline" onclick="pfClearTrustedDevices()" style="margin-top:12px;">🗑️ Удалить все</button>';
    h+='</div>';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔑</span> Смена пароля</h3>';
    h+='<button class="pf-btn" onclick="pfChangePassword()">🔐 Сменить пароль</button>';
    h+='</div></div>';

    // SETTINGS
    h+='<div class="pf-tab-content'+(active==='settings'?' active':'')+'" data-content="settings">';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👤</span> Имя</h3>';
    h+='<p style="color:#555;margin:0 0 12px;">Текущее: <b>'+esc(name)+'</b></p>';
    h+='<button class="pf-btn pf-btn-outline" onclick="pfEditName()">✏️ Изменить</button></div>';

    // AVATARS в 2 ряда
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🖼️</span> Аватар</h3>';
    h+='<div class="pf-avatar-section"><div class="pf-avatar-section-title">Новые</div><div class="pf-avatar-grid">';
    AVATARS_TOP.forEach(function(url){
        h+='<img src="'+url+'" alt="" class="pf-avatar-option'+(avatar===url?' selected':'')+'" onclick="pfSelectAvatar(\''+escAttr(url)+'\')" loading="lazy">';
    });
    h+='</div></div>';
    h+='<div class="pf-avatar-section"><div class="pf-avatar-section-title">Классические</div><div class="pf-avatar-grid">';
    AVATARS_BOTTOM.forEach(function(url){
        h+='<img src="'+url+'" alt="" class="pf-avatar-option'+(avatar===url?' selected':'')+'" onclick="pfSelectAvatar(\''+escAttr(url)+'\')" loading="lazy">';
    });
    h+='</div></div></div>';

    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏰</span> Королевство</h3>';
    h+='<div class="pf-kingdom-grid">';
    KINGDOMS_ORDER.forEach(function(n){
        var sel=currentProfile.kingdom===n;
        var c=KINGDOM_COLORS[n]||'#6C63FF';
        var f=KINGDOM_FLAGS[n];
        h+='<button class="pf-kingdom-btn'+(sel?' selected':'')+'" style="'+(sel?'background:'+c+';border-color:'+c+';':'')+'" onclick="pfSelectKingdom(\''+n+'\')">';
        h+='<img src="'+escAttr(f)+'" alt="">';
        h+='<span>'+n+'</span>';
        h+='</button>';
    });
    h+='</div></div>';

    // DANGER ZONE — одна кнопка
    h+='<button class="pf-danger-btn" onclick="pfOpenDangerZone()">⚠️ Опасная зона</button>';
    h+='</div>';

    container.innerHTML=h;

    attachTabsEvents();
    attachAchFilters();
    attachTabsScroll();

    if(active==='security')render2FATab();
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
        cells.push('<div class="pf-heat-cell'+(lvl>0?' l'+lvl:'')+'" title="'+d.toLocaleDateString('ru-RU')+': '+v+'"></div>');
    }
    return cells.join('');
}
function renderAchGrid(){
    var f=achFilter==='all'?ALL_ACHIEVEMENTS:ALL_ACHIEVEMENTS.filter(function(a){return a.c===achFilter;});
    var earned={};
    achievements.forEach(function(a){earned[a.achievement_id]=a;});
    return f.map(function(a){
        var e=earned[a.id];
        return '<div class="pf-ach'+(e?'':' locked')+'"><div class="pf-ach-icon">'+(e?a.i:'🔒')+'</div><div><div class="pf-ach-name">'+esc(a.n)+'</div><div class="pf-ach-date">'+(e?(e.earned_at?new Date(e.earned_at).toLocaleDateString('ru-RU'):'Получено'):esc(a.d))+'</div></div></div>';
    }).join('');
}
function formatChatMsg(m){
    var txt=esc(m.text).replace(/\n/g,'<br>');
    if(m.links&&m.links.length){
        txt+='<div class="pf-chat-links">';
        m.links.forEach(function(l){
            txt+='<a class="pf-chat-link" href="/'+escAttr(l.l)+'">📖 '+esc(l.q)+' →</a>';
        });
        txt+='</div>';
    }
    return txt;
}
function getMartianDate(){
    var months=['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];
    var days=[31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];
    var MD=days.reduce(function(s,d){return s+d;},0);
    var EY=668.6;var now=new Date();
    var daysFrom=(now-new Date(2026,0,1))/86400000;
    var year=Math.floor(3798000000+2740+daysFrom/EY);
    var doy=Math.floor((daysFrom*(MD/EY))%MD);
    var rem=doy,mi=0;
    for(var i=0;i<days.length;i++){if(rem<days[i]){mi=i;break;}rem-=days[i];}
    return{year:year.toLocaleString(),month:months[mi],day:rem+1};
}

function attachTabsEvents(){
    var w=document.getElementById('pf-tabs');
    if(!w)return;
    var isDown=false,startX=0,startScroll=0,moved=false;
    w.addEventListener('mousedown',function(e){
        if(e.target.classList.contains('pf-tab'))return;
        isDown=true;startX=e.pageX;startScroll=w.scrollLeft;w.classList.add('dragging');moved=false;
    });
    document.addEventListener('mouseup',function(){isDown=false;if(w)w.classList.remove('dragging');});
    document.addEventListener('mousemove',function(e){
        if(!isDown)return;e.preventDefault();
        var dx=e.pageX-startX;
        if(Math.abs(dx)>3)moved=true;
        w.scrollLeft=startScroll-dx;
    });
    w.querySelectorAll('.pf-tab').forEach(function(tab){
        tab.onclick=function(){if(moved){moved=false;return;}pfSetTab(tab.dataset.tab);};
    });
}
function attachTabsScroll(){
    var w=document.getElementById('pf-tabs');
    if(!w)return;
    w.addEventListener('wheel',function(e){
        if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();w.scrollLeft+=e.deltaY*1.2;}
    },{passive:false});
}
function attachAchFilters(){
    document.querySelectorAll('.pf-ach-filter').forEach(function(btn){
        btn.onclick=function(){
            achFilter=btn.dataset.filter;
            try{localStorage.setItem(ACH_FILTER_KEY,achFilter);}catch(e){}
            document.querySelectorAll('.pf-ach-filter').forEach(function(b){b.classList.toggle('active',b.dataset.filter===achFilter);});
            var g=document.getElementById('pf-ach-grid');
            if(g)g.innerHTML=renderAchGrid();
        };
    });
}

window.pfScrollTabs=function(dx){
    var w=document.getElementById('pf-tabs');
    if(w)w.scrollBy({left:dx,behavior:'smooth'});
};

window.pfSetTab=function(tab){
    localStorage.setItem(TAB_KEY,tab);
    document.querySelectorAll('.pf-tab').forEach(function(t){
        var on=t.dataset.tab===tab;
        t.classList.toggle('active',on);
        if(on&&t.scrollIntoView)t.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    });
    document.querySelectorAll('.pf-tab-content').forEach(function(c){c.classList.toggle('active',c.dataset.content===tab);});
    if(tab==='security')render2FATab();
};

/* ACTIONS */
window.pfEditName=function(){
    var cur=currentProfile.display_name||currentProfile.username||'';
    showModal({
        title:'✏️ Новое имя',sub:'От 2 до 20 символов',
        fields:[{name:'name',value:cur,placeholder:'Ваше имя',max:20}],
        onOk:async function(v){
            if(!v.name||v.name.length<2||v.name.length>20){toast('2–20 символов','error');return;}
            try{await apiPatch('profiles?user_id=eq.'+currentUser.id,{display_name:v.name},currentUser._token);
                currentProfile.display_name=v.name;toast('✅ Обновлено','success');
                writeCache({user:currentUser.user,profile:currentProfile});setTimeout(render,300);
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};

window.pfOpenAvatarPicker=function(){
    var html='<h3>🖼️ Выбрать аватар</h3><p>Нажми на аватар чтобы установить</p>';
    html+='<div class="pf-avatar-section"><div class="pf-avatar-section-title">Новые</div><div class="pf-modal-avatar-grid">';
    AVATARS_TOP.forEach(function(url){
        html+='<img src="'+url+'" class="'+(currentProfile.avatar_url===url?'selected':'')+'" onclick="pfSelectAvatarAndClose(\''+escAttr(url)+'\')">';
    });
    html+='</div></div>';
    html+='<div class="pf-avatar-section"><div class="pf-avatar-section-title">Классические</div><div class="pf-modal-avatar-grid">';
    AVATARS_BOTTOM.forEach(function(url){
        html+='<img src="'+url+'" class="'+(currentProfile.avatar_url===url?'selected':'')+'" onclick="pfSelectAvatarAndClose(\''+escAttr(url)+'\')">';
    });
    html+='</div></div>';
    html+='<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" onclick="document.querySelector(\'.pf-modal-bg\').remove()">Закрыть</button></div>';
    var bg=document.createElement('div');bg.className='pf-modal-bg';
    var m=document.createElement('div');m.className='pf-modal';m.style.maxWidth='560px';
    m.innerHTML=html;bg.appendChild(m);document.body.appendChild(bg);
    bg.addEventListener('click',function(e){if(e.target===bg)bg.remove();});
};
window.pfSelectAvatarAndClose=async function(url){
    try{
        await apiPatch('profiles?user_id=eq.'+currentUser.id,{avatar_url:url},currentUser._token);
        currentProfile.avatar_url=url;toast('✅ Аватар обновлён','success');
        writeCache({user:currentUser.user,profile:currentProfile});
        var bg=document.querySelector('.pf-modal-bg');if(bg)bg.remove();
        render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};
window.pfSelectAvatar=async function(url){
    if(currentProfile.avatar_url===url)return;
    try{
        await apiPatch('profiles?user_id=eq.'+currentUser.id,{avatar_url:url},currentUser._token);
        currentProfile.avatar_url=url;toast('✅ Обновлено','success');
        writeCache({user:currentUser.user,profile:currentProfile});render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};
window.pfSelectKingdom=async function(name){
    if(currentProfile.kingdom===name)return;
    try{
        await apiPatch('profiles?user_id=eq.'+currentUser.id,{kingdom:name},currentUser._token);
        currentProfile.kingdom=name;toast('✅ '+name,'success');
        writeCache({user:currentUser.user,profile:currentProfile});render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};
window.pfEditBio=function(){
    showModal({
        title:'📝 Биография',sub:'Расскажите о себе',
        fields:[{name:'bio',type:'textarea',value:currentProfile.bio||'',placeholder:'Пара слов...',max:1000}],
        onOk:async function(v){
            try{
                await apiPatch('profiles?user_id=eq.'+currentUser.id,{bio:v.bio},currentUser._token);
                currentProfile.bio=v.bio;
                var el=document.getElementById('pf-bio');
                if(el)el.textContent=v.bio||'✍️ Ещё ничего не рассказал о себе.';
                writeCache({user:currentUser.user,profile:currentProfile});toast('✅ Обновлено','success');
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};

/* GUEST PROFILE */
window.pfOpenGuestProfile=async function(userId){
    if(userId===currentUser.id){pfSetTab('overview');return;}
    var bg=document.createElement('div');bg.className='pf-modal-bg';
    var m=document.createElement('div');m.className='pf-modal';m.style.maxWidth='520px';
    m.innerHTML='<h3>👤 Профиль</h3><p>Загрузка...</p>';
    bg.appendChild(m);document.body.appendChild(bg);
    bg.addEventListener('click',function(e){if(e.target===bg)bg.remove();});
    try{
        var p=(await apiGet('profiles?user_id=eq.'+userId+'&select=*',currentUser._token))[0];
        if(!p){m.innerHTML='<h3>Профиль не найден</h3><div class="pf-modal-actions"><button class="pf-btn" onclick="document.querySelector(\'.pf-modal-bg\').remove()">Закрыть</button></div>';return;}
        var name=p.display_name||p.username||'Аноним';
        var av=p.avatar_url||avatarFallback(name);
        var lvl=getLevel(p.experience||0);
        var flag=p.kingdom?KINGDOM_FLAGS[p.kingdom]:null;
        var isFriend=friends.some(function(f){return f.other.user_id===userId;});
        var hasReq=friendRequests.some(function(f){return f.other.user_id===userId;});
        m.innerHTML=
            '<div style="text-align:center;padding:12px 0 20px;">'+
                '<img src="'+escAttr(av)+'" style="width:100px;height:100px;border-radius:50%;border:4px solid var(--kc);object-fit:cover;margin-bottom:12px;" onerror="this.onerror=null;this.src=\''+avatarFallback(name)+'\';">'+
                '<h3 style="justify-content:center;color:#1a1a2e;font-size:1.4rem;margin:0 0 6px;">'+esc(name)+'</h3>'+
                (flag?'<div style="font-size:.85rem;color:#666;margin-bottom:6px;"><img src="'+escAttr(flag)+'" style="width:20px;vertical-align:middle;border-radius:2px;"> '+esc(p.kingdom)+'</div>':'')+
                '<div style="font-size:.85rem;color:#888;">⭐ Уровень '+lvl.level+' · 💎 '+(p.experience||0)+' XP</div>'+
                (p.bio?'<p style="margin:16px 0 0;color:#555;font-size:.9rem;line-height:1.5;font-style:italic;">'+esc(p.bio)+'</p>':'')+
            '</div>'+
            '<div class="pf-modal-actions">'+
                (isFriend?'<button class="pf-btn pf-btn-danger" onclick="pfRemoveFriend(\''+escAttr(userId)+'\');document.querySelector(\'.pf-modal-bg\').remove();">Удалить из друзей</button>':'')+
                (!isFriend&&!hasReq?'<button class="pf-btn" onclick="pfAddFriend(\''+escAttr(userId)+'\');document.querySelector(\'.pf-modal-bg\').remove();">➕ В друзья</button>':'')+
                (hasReq?'<button class="pf-btn pf-btn-outline" disabled>⏳ Заявка</button>':'')+
                '<button class="pf-btn pf-btn-outline" onclick="document.querySelector(\'.pf-modal-bg\').remove()">Закрыть</button>'+
            '</div>';
    }catch(e){
        m.innerHTML='<h3>Ошибка</h3><p>'+esc(e.message)+'</p><div class="pf-modal-actions"><button class="pf-btn" onclick="document.querySelector(\'.pf-modal-bg\').remove()">Закрыть</button></div>';
    }
};

/* NOTES */
window.pfSearchNotes=function(v){noteSearch=v;render();setTimeout(function(){var el=document.querySelector('.pf-notes-search');if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length);}},10);};
window.pfOpenNoteForm=function(id){
    var n=id?notes.find(function(x){return x.id===id;}):null;
    showModal({
        title:n?'Редактировать':'Новая заметка',
        fields:[
            {name:'title',value:n?(n.title||''):'',placeholder:'Заголовок',max:100},
            {name:'content',type:'textarea',value:n?(n.content||''):'',placeholder:'Текст...',max:5000}
        ],
        onOk:async function(v){
            if(!v.content){toast('Введите текст','error');return;}
            try{
                if(id)await apiPatch('user_notes?id=eq.'+id,{title:v.title,content:v.content,updated_at:new Date().toISOString()},currentUser._token);
                else await apiPost('user_notes',{user_id:currentUser.id,title:v.title,content:v.content},currentUser._token);
                toast('✅ Сохранено','success');
                var r=await apiGet('user_notes?user_id=eq.'+currentUser.id+'&select=*&order=pinned.desc,updated_at.desc',currentUser._token);
                notes=r||[];render();
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};
window.pfEditNote=function(id){pfOpenNoteForm(id);};
window.pfPinNote=async function(id){
    var n=notes.find(function(x){return x.id===id;});if(!n)return;
    try{
        await apiPatch('user_notes?id=eq.'+id,{pinned:!n.pinned},currentUser._token);
        var r=await apiGet('user_notes?user_id=eq.'+currentUser.id+'&select=*&order=pinned.desc,updated_at.desc',currentUser._token);
        notes=r||[];render();
    }catch(e){toast('Ошибка','error');}
};
window.pfDeleteNote=function(id){
    showModal({title:'Удалить заметку?',sub:'Необратимо.',fields:[],okText:'Удалить',
        onOk:async function(){try{await apiDelete('user_notes?id=eq.'+id,currentUser._token);
            notes=notes.filter(function(n){return n.id!==id;});render();toast('🗑️ Удалено','info');
        }catch(e){toast('Ошибка','error');}}
    });
};

/* FRIENDS */
window.pfAddFriend=async function(fid){
    if(fid===currentUser.id)return;
    try{
        var ex=await apiGet('friendships?or=(and(user_id.eq.'+currentUser.id+',friend_id.eq.'+fid+'),and(user_id.eq.'+fid+',friend_id.eq.'+currentUser.id+'))&select=id',currentUser._token);
        if(ex&&ex.length){toast('Заявка уже есть','info');return;}
        await apiPost('friendships',{user_id:currentUser.id,friend_id:fid,status:'pending'},currentUser._token);
        toast('✅ Заявка отправлена','success');
        await loadFriends();render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};
window.pfRemoveFriend=async function(fid){
    showModal({title:'Удалить из друзей?',sub:'',fields:[],okText:'Удалить',
        onOk:async function(){try{
            await apiDelete('friendships?or=(and(user_id.eq.'+currentUser.id+',friend_id.eq.'+fid+'),and(user_id.eq.'+fid+',friend_id.eq.'+currentUser.id+'))',currentUser._token);
            toast('🗑️ Удалено','info');await loadFriends();render();
        }catch(e){toast('Ошибка','error');}}
    });
};
window.pfAcceptFriend=async function(fid){
    try{
        await apiPatch('friendships?user_id=eq.'+fid+'&friend_id=eq.'+currentUser.id,{status:'accepted',updated_at:new Date().toISOString()},currentUser._token);
        toast('✅ Друг добавлен','success');await loadFriends();render();
    }catch(e){toast('Ошибка','error');}
};
window.pfDeclineFriend=async function(fid){
    try{await apiDelete('friendships?user_id=eq.'+fid+'&friend_id=eq.'+currentUser.id,currentUser._token);
        toast('Отклонено','info');await loadFriends();render();
    }catch(e){toast('Ошибка','error');}
};

/* AI */
window.pfSendChat=function(){
    var inp=document.getElementById('pf-chat-input');
    if(!inp)return;
    var q=inp.value.trim();if(!q)return;
    inp.value='';pfAskBot(q);
};
window.pfAskBot=function(q){
    var c=document.getElementById('pf-chat-container');
    if(!c)return;
    var um=document.createElement('div');um.className='pf-chat-msg user';um.textContent=q;
    c.appendChild(um);c.scrollTop=c.scrollHeight;
    chatHistory.push({role:'user',text:q});

    var t=document.createElement('div');t.className='pf-typing';
    t.innerHTML='<span></span><span></span><span></span>';
    c.appendChild(t);c.scrollTop=c.scrollHeight;

    setTimeout(function(){
        t.remove();
        var f=findAnswer(q);
        var bm=document.createElement('div');bm.className='pf-chat-msg bot';
        if(f){
            var links=[];
            if(f.l)links.push({q:'Подробнее',l:f.l});
            var txt=f.a;
            if(links.length){
                txt+='<div class="pf-chat-links">';
                links.forEach(function(l){txt+='<a class="pf-chat-link" href="/'+escAttr(l.l)+'">📖 '+esc(l.q)+' →</a>';});
                txt+='</div>';
            }
            bm.innerHTML=txt;
            chatHistory.push({role:'bot',text:f.a,links:links});
        }else{
            bm.innerHTML='Не нашёл ответа. 🤔 Попробуйте переформулировать.';
            chatHistory.push({role:'bot',text:'Не нашёл'});
        }
        c.appendChild(bm);c.scrollTop=c.scrollHeight;
        try{localStorage.setItem(CHAT_KEY,JSON.stringify(chatHistory.slice(-30)));}catch(e){}
    },600);
};

/* SECURITY */
async function render2FATab(){
    var s=document.getElementById('pf-2fa-status');
    var sw=document.getElementById('pf-switch-2fa');
    var d=document.getElementById('pf-trusted-devices');
    if(!s)return;
    try{
        var r=await apiGet('user_2fa?user_id=eq.'+currentUser.id+'&select=*',currentUser._token);
        var on=r&&r[0]&&r[0].email_2fa_enabled;
        if(on){s.innerHTML='<div class="pf-badge-2fa">✅ Включена</div>';if(sw)sw.classList.add('on');}
        else{s.innerHTML='<div class="pf-badge-2fa off">⚠️ Выключена</div>';if(sw)sw.classList.remove('on');}
        if(d){
            try{
                var dr=await apiGet('linked_devices?user_id=eq.'+currentUser.id+'&select=*&order=last_active.desc',currentUser._token);
                var dev=dr||[];
                if(dev.length){
                    d.innerHTML=dev.map(function(x){
                        return '<div class="pf-device"><div class="pf-device-icon">📱</div><div class="pf-device-info"><div style="font-weight:700;font-size:.9rem;">'+esc(x.device_name||'Устройство')+'</div><div style="font-size:.75rem;color:#888;">'+new Date(x.last_active).toLocaleString('ru-RU')+'</div></div><button class="pf-icon-btn danger" onclick="pfRemoveDevice('+x.id+')">✕</button></div>';
                    }).join('');
                }else{d.innerHTML='<p style="color:#888;text-align:center;padding:20px;">Нет привязанных устройств</p>';}
            }catch(e){d.innerHTML='<p style="color:#888;text-align:center;">Не удалось загрузить</p>';}
        }
    }catch(e){s.innerHTML='<div class="pf-badge-2fa off">⚠️ Ошибка</div>';}
}
window.pfRemoveDevice=async function(id){try{await apiDelete('linked_devices?id=eq.'+id,currentUser._token);toast('Удалено','info');render2FATab();}catch(e){toast('Ошибка','error');}};
window.pfClearTrustedDevices=function(){
    showModal({title:'Удалить все устройства?',sub:'Придётся заново подтверждать вход.',fields:[],okText:'Удалить',
        onOk:async function(){try{await apiDelete('linked_devices?user_id=eq.'+currentUser.id,currentUser._token);toast('Удалено','info');render2FATab();}catch(e){toast('Ошибка','error');}}
    });
};
window.pfToggle2FA=async function(){
    try{
        var r=await apiGet('user_2fa?user_id=eq.'+currentUser.id+'&select=*',currentUser._token);
        var cur=r&&r[0]&&r[0].email_2fa_enabled;
        var nv=!cur;
        showModal({title:(nv?'Включить':'Выключить')+' 2FA?',sub:'',fields:[],okText:nv?'Включить':'Выключить',
            onOk:async function(){try{
                if(r&&r[0])await apiPatch('user_2fa?user_id=eq.'+currentUser.id,{email_2fa_enabled:nv,updated_at:new Date().toISOString()},currentUser._token);
                else await apiPost('user_2fa',{user_id:currentUser.id,email_2fa_enabled:nv,updated_at:new Date().toISOString()},currentUser._token);
                toast(nv?'✅ Включена':'🔓 Выключена',nv?'success':'info');render2FATab();
            }catch(e){toast('Ошибка','error');}}
        });
    }catch(e){toast('Ошибка','error');}
};
window.pfChangePassword=function(){
    showModal({title:'🔑 Смена пароля',sub:'Отправим ссылку на '+(currentUser.email||''),fields:[],okText:'Отправить',
        onOk:async function(){
            try{
                var sb=window.supabaseClient;
                if(sb&&sb.auth){await sb.auth.resetPasswordForEmail(currentUser.email,{redirectTo:location.origin+'/profile/'});toast('📧 Письмо отправлено','success');}
                else toast('Войдите заново','error');
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};
window.pfOpenDeviceLink=function(){
    if(window.marsLinkDevice&&typeof window.marsLinkDevice.open==='function'){window.marsLinkDevice.open((currentUser&&currentUser.email)||'');return;}
    if(window.marsQrScanner&&window.marsQrScanner.isMobile){window.marsQrScanner.open();return;}
    toast('Модуль QR не загружен','info');
};

/* DANGER ZONE */
window.pfOpenDangerZone=function(){
    var html='<h3 style="color:#c0392b;">⚠️ Опасная зона</h3><p>Действия необратимы. Будьте осторожны.</p>';
    html+='<div style="display:flex;flex-direction:column;gap:10px;margin:20px 0;">';
    html+='<button class="pf-btn pf-btn-danger" style="width:100%;justify-content:center;" onclick="pfConfirmDeleteAccount()">🗑️ Удалить аккаунт</button>';
    html+='<button class="pf-btn pf-btn-outline" style="width:100%;justify-content:center;" onclick="pfLogout()">🚪 Выйти</button>';
    html+='</div>';
    html+='<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" onclick="document.querySelector(\'.pf-modal-bg\').remove()" style="flex:1;">Отмена</button></div>';
    var bg=document.createElement('div');bg.className='pf-modal-bg';
    var m=document.createElement('div');m.className='pf-modal';m.innerHTML=html;
    bg.appendChild(m);document.body.appendChild(bg);
    bg.addEventListener('click',function(e){if(e.target===bg)bg.remove();});
};
window.pfConfirmDeleteAccount=function(){
    var bg=document.querySelector('.pf-modal-bg');if(bg)bg.remove();
    showModal({
        title:'⚠️ Удалить аккаунт?',sub:'Введите email для подтверждения:',
        fields:[{name:'email',type:'email',placeholder:currentUser.email,max:100}],okText:'Удалить',
        onOk:async function(v){
            if(v.email!==currentUser.email){toast('Email не совпадает','error');return;}
            try{
                var res=await fetch(SUPABASE_URL+'/functions/v1/delete-user',{method:'DELETE',headers:{'Authorization':'Bearer '+currentUser._token}});
                var json=await res.json();
                if(json.error)throw new Error(json.error);
                pfLogout();
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};
window.pfLogout=function(){
    [MY_KEY,SB_KEY,BACKUP_KEY,CACHE_KEY].forEach(function(k){
        try{localStorage.removeItem(k);}catch(e){}
        try{sessionStorage.removeItem(k);}catch(e){}
    });
    try{document.cookie=MY_KEY+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';}catch(e){}
    try{document.cookie=SB_KEY+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';}catch(e){}
    window.location.href='/';
};
window.pfDeleteGuild=function(){
    if(!guild)return;
    showModal({title:'Удалить гильдию?',sub:'Необратимо.',fields:[],okText:'Удалить',
        onOk:async function(){try{await apiDelete('guilds?id=eq.'+guild.id,currentUser._token);
            toast('Удалено','info');setTimeout(function(){location.reload();},500);
        }catch(e){toast('Ошибка','error');}}
    });
};

/* MODAL */
function showModal(opts){
    var bg=document.createElement('div');bg.className='pf-modal-bg';
    var m=document.createElement('div');m.className='pf-modal';
    var fields='';
    (opts.fields||[]).forEach(function(f){
        var v=escAttr(f.value||'');
        if(f.type==='textarea')fields+='<textarea class="pf-modal-input '+(f.name==='content'?'pf-modal-note-editor':'')+'" id="m-'+f.name+'" placeholder="'+escAttr(f.placeholder||'')+'" maxlength="'+(f.max||5000)+'">'+v+'</textarea>';
        else fields+='<input type="'+(f.type||'text')+'" class="pf-modal-input" id="m-'+f.name+'" placeholder="'+escAttr(f.placeholder||'')+'" value="'+v+'" maxlength="'+(f.max||200)+'">';
    });
    m.innerHTML='<h3>'+esc(opts.title||'')+'</h3>'+(opts.sub?'<p>'+esc(opts.sub)+'</p>':'')+fields+
        '<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" id="m-cancel">Отмена</button><button class="pf-btn" id="m-ok">'+esc(opts.okText||'Сохранить')+'</button></div>';
    bg.appendChild(m);document.body.appendChild(bg);
    function close(){bg.remove();}
    bg.addEventListener('click',function(e){if(e.target===bg)close();});
    m.querySelector('#m-cancel').onclick=close;
    var first=m.querySelector('.pf-modal-input');
    if(first)setTimeout(function(){first.focus();if(first.select)first.select();},100);
    m.querySelector('#m-ok').onclick=function(){
        var v={};(opts.fields||[]).forEach(function(f){var el=m.querySelector('#m-'+f.name);v[f.name]=el?el.value.trim():'';});
        close();if(opts.onOk)opts.onOk(v);
    };
    m.addEventListener('keydown',function(e){
        if(e.key==='Enter'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();m.querySelector('#m-ok').click();}
        if(e.key==='Escape')close();
    });
}

async function loadFriends(){
    try{
        var res=await apiGet('friendships?or=(user_id.eq.'+currentUser.id+',friend_id.eq.'+currentUser.id+')&select=*',currentUser._token);
        if(!res||!res.length){friends=[];friendRequests=[];return;}
        var ids={};res.forEach(function(f){ids[f.user_id]=true;ids[f.friend_id]=true;});
        delete ids[currentUser.id];
        var arr=Object.keys(ids);
        if(!arr.length){friends=[];friendRequests=[];return;}
        var profs=await apiGet('profiles?user_id=in.('+arr.join(',')+')&select=user_id,display_name,username,avatar_url',currentUser._token);
        var pm={};(profs||[]).forEach(function(p){pm[p.user_id]=p;});
        friends=[];friendRequests=[];
        res.forEach(function(f){
            var oid=f.user_id===currentUser.id?f.friend_id:f.user_id;
            var item=Object.assign({},f,{other:Object.assign({user_id:oid},pm[oid]||{})});
            if(f.status==='accepted')friends.push(item);
            else if(f.status==='pending'&&f.friend_id===currentUser.id)friendRequests.push(item);
        });
    }catch(e){friends=[];friendRequests=[];}
}

async function loadAll(session,silent){
    currentUser=session.user;
    currentUser._token=session.access_token;

    var profs=await apiGet('profiles?user_id=eq.'+encodeURIComponent(session.user.id)+'&select=*',session.access_token);
    currentProfile=Array.isArray(profs)&&profs.length?profs[0]:null;
    if(!currentProfile){
        try{
            var c=await apiPost('profiles',{user_id:session.user.id,username:(session.user.email||'').split('@')[0],display_name:(session.user.email||'').split('@')[0]},session.access_token,'return=representation');
            currentProfile=Array.isArray(c)&&c.length?c[0]:null;
        }catch(e){throw new Error('Профиль не создан: '+e.message);}
    }
    writeCache({user:session.user,profile:currentProfile});

    if(!silent)render();

    try{
        var results=await Promise.all([
            apiGet('user_achievements?user_id=eq.'+session.user.id+'&select=achievement_id,earned_at',session.access_token).catch(function(){return[];}),
            apiGet('user_notes?user_id=eq.'+session.user.id+'&select=*&order=pinned.desc,updated_at.desc',session.access_token).catch(function(){return[];}),
            apiGet('notifications?user_id=eq.'+session.user.id+'&select=*&order=created_at.desc&limit=30',session.access_token).catch(function(){return[];}),
            apiGet('profiles?select=user_id,username,display_name,experience,level,avatar_url&order=experience.desc&limit=10',session.access_token).catch(function(){return[];}),
            apiGet('daily_logins?user_id=eq.'+session.user.id+'&select=streak&order=login_date.desc&limit=1',session.access_token).catch(function(){return[];}),
            apiGet('guild_members?user_id=eq.'+session.user.id+'&select=guild_id,role',session.access_token).catch(function(){return[];}),
            apiGet('user_currency?user_id=eq.'+session.user.id+'&select=clay_talents',session.access_token).catch(function(){return[];})
        ]);

        var ua=results[0]||[];
        notes=results[1]||[];
        notifications=results[2]||[];
        leaders=results[3]||[];
        streak=(results[4]&&results[4][0]&&results[4][0].streak)||0;
        var gm=results[5]&&results[5][0];
        currency=(results[6]&&results[6][0]&&results[6][0].clay_talents)||0;

        if(ua.length){
            achievements=ua.map(function(x){
                var meta=ALL_ACHIEVEMENTS.filter(function(a){return a.id===x.achievement_id;})[0]||{};
                return Object.assign({},meta,{achievement_id:x.achievement_id,earned_at:x.earned_at});
            });
        }else achievements=[];

        if(gm&&gm.guild_id){
            try{
                var gr=await apiGet('guilds?id=eq.'+gm.guild_id+'&select=*',session.access_token);
                guild=gr&&gr[0];
                if(guild){
                    var mr=await apiGet('guild_members?guild_id=eq.'+guild.id+'&select=user_id,role&limit=50',session.access_token);
                    guildMembers=mr||[];
                }
            }catch(e){}
        }
        await loadFriends();
        render();
    }catch(e){console.warn('[profile bg]',e.message);}
}

function showLogin(){
    container.innerHTML='<div style="max-width:400px;margin:60px auto;padding:40px 28px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);"><div style="font-size:4rem;margin-bottom:12px;">🔒</div><h2 style="margin:0 0 8px 0;color:#2c3e50;">Вы не вошли</h2><p style="color:#888;margin:0 0 20px;">Войдите, чтобы просмотреть профиль</p><a href="/login/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">🔐 Войти</a></div>';
}
function renderSkeleton(){
    container.innerHTML='<div class="pf-skel" style="height:220px;"></div><div class="pf-skel" style="height:180px;"></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;"><div class="pf-skel" style="height:70px;"></div><div class="pf-skel" style="height:70px;"></div><div class="pf-skel" style="height:70px;"></div><div class="pf-skel" style="height:70px;"></div></div><div class="pf-skel" style="height:150px;"></div>';
}

async function init(){
    trackActivity();
    var session=readSession();
    if(!session){showLogin();return;}
    var cached=readCache(5*60*1000);
    if(cached&&cached.profile&&cached.user&&cached.user.id===session.user.id){
        currentUser=session.user;
        currentUser._token=session.access_token;
        currentProfile=cached.profile;
        render();
        loadAll(session,true).catch(function(e){console.warn(e.message);});
        return;
    }
    renderSkeleton();
    try{await loadAll(session,false);}catch(e){toast('Ошибка: '+e.message,'error');}
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();

})();
</script>

<script>
setTimeout(function(){if(typeof window.refreshAuthButton==='function')window.refreshAuthButton();},800);
</script>

<!-- ═══════════════════════════════════════════════ -->
<!-- VIP-БЛОК С ПРОМОКОДАМИ                          -->
<!-- ═══════════════════════════════════════════════ -->
<div id="profile-vip-block"></div>

<script>
(function(){
  'use strict';
  
  console.log('🚀 VIP-блок запущен');
  
  var COIN = '/assets/images/guild-coin.jpg';
  var COLORS = ['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63','#34495e','#e67e22','#f5d76e','#8e44ad'];
  
  function waitSb(n){
    n = n || 0;
    var sb = window.supabaseClient;
    if (!sb){
      if (n > 50){
        var w = document.getElementById('profile-vip-block');
        if (w) w.innerHTML = '<p style="text-align:center;color:#e74c3c;padding:20px;">Ошибка: Supabase не загружен</p>';
        return;
      }
      setTimeout(function(){ waitSb(n+1); }, 100);
      return;
    }
    console.log('✅ supabaseClient найден');
    init(sb);
  }
  
  function init(sb){
    var wrap = document.getElementById('profile-vip-block');
    if (!wrap) return;
    
    sb.auth.getSession().then(function(s){
      var user = s && s.data && s.data.session ? s.data.session.user : null;
      if (!user){
        wrap.innerHTML = '';
        return;
      }
      
      sb.from('profiles').select('*').eq('user_id', user.id).single().then(function(r){
        if (r.error){ console.error(r.error); return; }
        var p = r.data || {};
        var vipUntil = p.vip_until ? new Date(p.vip_until) : null;
        var isVIP = vipUntil && vipUntil.getTime() > Date.now();
        var daysLeft = isVIP ? Math.ceil((vipUntil - Date.now()) / 86400000) : 0;
        
        var h = '';
        h += '<div style="max-width:720px;margin:24px auto 0;padding:0 8px;font-family:-apple-system,sans-serif;">';
        
        // ШАПКА VIP
        h += '<div style="background:linear-gradient(135deg,#1a1a2e,#2d1b3d);border-radius:20px;padding:28px 24px;color:#fff;text-align:center;margin-bottom:16px;box-shadow:0 12px 40px -12px rgba(0,0,0,.4);">';
        h += '<div style="font-size:3.5rem;margin-bottom:8px;">' + (isVIP ? '👑' : '⭐') + '</div>';
        h += '<h2 style="margin:0 0 8px;font-size:1.4rem;color:#fff;">' + (isVIP ? 'VIP активен' : 'VIP-статус') + '</h2>';
        if (isVIP){
          h += '<div style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(243,156,18,.2);border:1px solid rgba(243,156,18,.5);border-radius:20px;font-weight:800;color:#f5d76e;">👑 Осталось ' + daysLeft + ' дней</div>';
        } else {
          h += '<p style="margin:0;opacity:.8;font-size:.9rem;">Активируйте промокод чтобы получить привилегии</p>';
        }
        h += '</div>';
        
        // АКТИВАЦИЯ ПРОМОКОДА
        h += '<div style="background:#fff;border-radius:20px;padding:24px;border:2px solid rgba(0,0,0,.06);margin-bottom:16px;box-shadow:0 4px 16px rgba(0,0,0,.05);">';
        h += '<h3 style="margin:0 0 4px;font-size:1.1rem;color:#1a1a2e;">🎁 Активировать промокод</h3>';
        h += '<p style="margin:0 0 14px;color:#888;font-size:.85rem;">Введите код и получите привилегии</p>';
        h += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
        h += '<input id="vip-promo-input" type="text" placeholder="Например: TEST-VIP-2026" style="flex:1;min-width:180px;padding:12px 16px;border:2px solid #e8eaf0;border-radius:12px;font-size:.95rem;font-family:inherit;outline:none;box-sizing:border-box;transition:border-color .2s;">';
        h += '<button id="vip-promo-btn" type="button" style="padding:12px 24px;background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap;transition:all .2s;">Активировать</button>';
        h += '</div>';
        h += '<div id="vip-promo-status" style="margin-top:10px;font-size:.85rem;font-weight:600;min-height:20px;"></div>';
        h += '</div>';
        
        // НАСТРОЙКИ VIP
        if (isVIP){
          h += '<div style="background:#fff;border-radius:20px;padding:24px;border:2px solid rgba(0,0,0,.06);box-shadow:0 4px 16px rgba(0,0,0,.05);">';
          h += '<h3 style="margin:0 0 6px;font-size:1.1rem;color:#1a1a2e;">🎨 Настройки VIP</h3>';
          h += '<p style="margin:0 0 14px;color:#888;font-size:.85rem;">Выберите цвет вашего ника на сайте</p>';
          h += '<div id="vip-color-picker" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">';
          COLORS.forEach(function(c){
            var sel = p.nick_color === c ? '#333' : 'transparent';
            h += '<button type="button" class="vip-color" data-c="' + c + '" style="width:38px;height:38px;border-radius:50%;border:3px solid ' + sel + ';background:' + c + ';cursor:pointer;padding:0;transition:all .2s;"></button>';
          });
          h += '</div>';
          h += '<button id="vip-save-color" type="button" style="padding:12px 24px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer;font-family:inherit;transition:all .2s;">💾 Сохранить цвет</button>';
          h += '</div>';
        }
        
        h += '</div>';
        
        wrap.innerHTML = h;
        
        // ─── АКТИВАЦИЯ ПРОМОКОДА ───
        var inp = document.getElementById('vip-promo-input');
        var btn = document.getElementById('vip-promo-btn');
        var st = document.getElementById('vip-promo-status');
        
        btn.addEventListener('click', async function(){
          var code = inp.value.trim().toUpperCase();
          if (!code){
            st.textContent = '⚠️ Введите код';
            st.style.color = '#e74c3c';
            return;
          }
          st.textContent = '⏳ Проверяем...';
          st.style.color = '#999';
          btn.disabled = true;
          btn.style.opacity = '.6';
          
          try {
            var res = await sb.rpc('activate_promo', { p_code: code });
            console.log('📡 RPC:', res);
            
            if (res.error || !res.data || !res.data.ok){
              var err = res.error ? res.error.message : (res.data && res.data.error) || 'Ошибка';
              st.textContent = '❌ ' + err;
              st.style.color = '#e74c3c';
            } else {
              st.textContent = '✅ Активировано: ' + res.data.product;
              st.style.color = '#27ae60';
              setTimeout(function(){ location.reload(); }, 1500);
            }
          } catch(e){
            st.textContent = '❌ Ошибка: ' + e.message;
            st.style.color = '#e74c3c';
          }
          
          btn.disabled = false;
          btn.style.opacity = '1';
        });
        
        inp.addEventListener('keypress', function(e){
          if (e.key === 'Enter') btn.click();
        });
        
        // ─── СОХРАНЕНИЕ ЦВЕТА ───
        if (isVIP){
          var selected = p.nick_color || '#6C63FF';
          var btns = document.querySelectorAll('.vip-color');
          btns.forEach(function(b){
            b.addEventListener('click', function(){
              btns.forEach(function(x){ x.style.borderColor = 'transparent'; });
              b.style.borderColor = '#333';
              selected = b.dataset.c;
            });
          });
          
          var saveBtn = document.getElementById('vip-save-color');
          saveBtn.addEventListener('click', async function(){
            saveBtn.disabled = true;
            saveBtn.textContent = '⏳ Сохраняем...';
            
            var res = await sb.from('profiles').update({ nick_color: selected }).eq('user_id', user.id);
            
            if (res.error){
              alert('❌ Ошибка: ' + res.error.message);
              saveBtn.disabled = false;
              saveBtn.textContent = '💾 Сохранить цвет';
            } else {
              saveBtn.textContent = '✅ Сохранено!';
              setTimeout(function(){
                saveBtn.disabled = false;
                saveBtn.textContent = '💾 Сохранить цвет';
              }, 2000);
            }
          });
        }
      });
    });
  }
  
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ waitSb(0); });
  } else {
    waitSb(0);
  }
})();
</script>
