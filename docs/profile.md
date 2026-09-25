---
title: Профиль
comments: false
---

<div id="profile-app"><div style="text-align:center;padding:60px 20px;"><div style="display:inline-block;width:48px;height:48px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:pfSpin .8s linear infinite;"></div><p style="color:#999;margin-top:16px;font-size:.9rem;">Загрузка...</p></div></div>

<style>
:root{--kc:#6C63FF;--kl:#A29BFE;--ks:rgba(108,99,255,.25);--kb:#F0F4FF}
@keyframes pfSpin{to{transform:rotate(360deg)}}
@keyframes pfFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pfShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pfRing{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes pfCoin{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
@keyframes pfCoinGlow{0%,100%{filter:drop-shadow(0 0 8px rgba(243,156,18,.5)) brightness(1)}50%{filter:drop-shadow(0 0 20px rgba(243,156,18,.9)) brightness(1.15)}}
@keyframes pfTyping{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}
@keyframes pfBar{from{width:0}}
@keyframes pfFade{from{opacity:0}to{opacity:1}}
@keyframes vipShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes vipBadgeGlow{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25);box-shadow:0 2px 16px rgba(243,156,18,1)}}
@keyframes vipFrameSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
#profile-app{max-width:1100px;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px 40px}
#profile-app a{text-decoration:none!important;border-bottom:none!important}
.pf-hero{position:relative;border-radius:24px;padding:40px 36px;color:#fff;margin-bottom:20px;overflow:hidden;box-shadow:0 20px 60px -12px rgba(0,0,0,.4);transition:background .5s;animation:pfFadeIn .5s ease both}
.pf-hero::before{content:'';position:absolute;top:-60%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,var(--ks),transparent 70%);border-radius:50%;animation:pfFloat 8s ease-in-out infinite;pointer-events:none}
.pf-hero-content{position:relative;z-index:2;display:flex;align-items:center;gap:26px;flex-wrap:wrap}
.pf-avatar-wrap{position:relative;flex-shrink:0;cursor:pointer;transition:transform .3s;margin-bottom:14px}
.pf-avatar-wrap:hover{transform:scale(1.03)}
.pf-avatar-ring{position:absolute;inset:-10px;border:2px dashed var(--kl);border-radius:50%;animation:pfRing 18s linear infinite;opacity:.5;pointer-events:none}
.pf-avatar{width:120px;height:120px;aspect-ratio:1/1;border-radius:50%;border:4px solid rgba(255,255,255,.4);object-fit:cover;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.2);position:relative;z-index:1;display:block}
.vip-avatar-frame{position:relative;display:inline-block;padding:4px;border-radius:50%;background-size:200% 200%;animation:vipFrameSpin 8s linear infinite;z-index:2;line-height:0}
.vip-avatar-frame.animated{animation:vipFrameSpin 4s linear infinite}
.vip-avatar-frame::before{content:'';position:absolute;inset:0;border-radius:50%;background:inherit;filter:blur(10px);opacity:.5;z-index:-1}
.vip-avatar-frame .pf-avatar{border:3px solid #14142a}
.pf-avatar-badge{position:absolute;bottom:20px;right:-6px;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.72rem;border:2px solid rgba(255,255,255,.9);z-index:5;pointer-events:none}
.pf-role-badge{position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:var(--kc);padding:4px 14px;border-radius:20px;font-size:.7rem;font-weight:800;white-space:nowrap;border:2px solid rgba(255,255,255,.5);z-index:6}
.pf-info{flex:1;min-width:220px}
.pf-name{font-size:2rem;font-weight:800;margin:0 0 8px 0;color:#fff;display:flex;align-items:center;gap:8px;flex-wrap:wrap;cursor:pointer;transition:all .25s;position:relative;z-index:10}
.pf-name-edit{font-size:.85rem;opacity:.55}
.pf-name.vip-name{font-weight:900!important;background-size:200% auto!important;-webkit-background-clip:text!important;background-clip:text!important;-webkit-text-fill-color:transparent!important;animation:vipShimmer 8s linear infinite!important}
.pf-vip-badge{display:inline-flex;align-items:center;justify-content:center;margin-left:4px;padding:3px 8px;border-radius:8px;background:linear-gradient(135deg,#f5d76e,#f39c12);font-size:.85em;line-height:1;vertical-align:middle;box-shadow:0 2px 8px rgba(243,156,18,.5);animation:vipBadgeGlow 2.5s ease-in-out infinite;font-weight:900;cursor:help;color:#fff;position:relative;z-index:12}
.pf-vip-title{display:inline-block;margin-left:6px;padding:2px 10px;border-radius:10px;background:linear-gradient(135deg,rgba(243,156,18,.2),rgba(245,215,110,.1));border:1px solid rgba(243,156,18,.4);font-size:.72rem;font-weight:900;color:#f5d76e;letter-spacing:.3px;vertical-align:middle;text-transform:uppercase;position:relative;z-index:11}
.pf-mod-badge{background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;padding:4px 12px;border-radius:20px;font-size:.7rem;font-weight:800;letter-spacing:.4px;text-transform:uppercase;border:1px solid rgba(255,255,255,.3);position:relative;z-index:11}
.pf-kingdom-badge{background:rgba(255,255,255,.22);backdrop-filter:blur(8px);color:#fff;padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.35);cursor:pointer}
.pf-kingdom-badge img{width:18px;height:auto;border-radius:2px;display:block}
.pf-email{font-size:.9rem;opacity:.85;margin:0 0 14px 0}
.pf-stats{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
.pf-stat-item{display:flex;flex-direction:column;gap:2px;cursor:pointer;padding:6px 10px;border-radius:10px;transition:all .25s}
.pf-stat-item:hover{background:rgba(255,255,255,.1);transform:translateY(-2px)}
.pf-stat-label{font-size:.68rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:700}
.pf-stat-value{font-size:1.3rem;font-weight:800;display:flex;align-items:center;gap:5px}
.pf-stat-coin{width:20px;height:20px;border-radius:50%;animation:pfCoin 3s ease-in-out infinite,pfCoinGlow 4s ease-in-out infinite;object-fit:cover}
.pf-currency-click{cursor:pointer;padding:8px 14px;border-radius:12px;background:rgba(243,156,18,.15);border:1px solid rgba(243,156,18,.4);transition:all .25s;display:inline-flex;align-items:center;gap:8px;font-weight:800;color:#f39c12}
.pf-currency-click:hover{background:rgba(243,156,18,.25);transform:translateY(-2px)}
.pf-progress-bar{margin-top:12px;height:10px;background:rgba(255,255,255,.2);border-radius:12px;overflow:hidden}
.pf-progress-fill{height:100%;background:linear-gradient(90deg,var(--kl),#fff);border-radius:12px;transition:width 1.2s;box-shadow:0 0 12px rgba(255,255,255,.6)}
.pf-progress-text{font-size:.76rem;opacity:.9;margin-top:6px}
.pf-mypage{background:linear-gradient(135deg,#fff 0%,#fafbfd 100%);border-radius:22px;border:1px solid rgba(0,0,0,.06);padding:24px 26px;margin-bottom:18px;box-shadow:0 4px 20px rgba(0,0,0,.05);position:relative;overflow:hidden}
.pf-mypage::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--kc),var(--kl),var(--kc));background-size:200% auto;animation:pfShine 3s linear infinite}
.pf-mypage-title{font-size:1.2rem;font-weight:800;color:#1a1a1a;margin:0 0 2px 0}
.pf-mypage-sub{font-size:.82rem;color:#888;margin:0 0 18px}
.pf-mypage-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:18px}
.pf-mypage-tile{background:linear-gradient(135deg,var(--kb),#fff);border:1px solid rgba(108,99,255,.15);border-radius:14px;padding:14px 16px;transition:all .3s;cursor:pointer}
.pf-mypage-tile:hover{transform:translateY(-3px);box-shadow:0 12px 28px -8px var(--ks);border-color:var(--kc)}
.pf-mypage-tile-label{font-size:.68rem;color:#888;text-transform:uppercase;letter-spacing:.8px;font-weight:700;margin-bottom:4px}
.pf-mypage-tile-value{font-size:1.4rem;font-weight:900;color:var(--kc);line-height:1.1}
.pf-mypage-tile-sub{font-size:.7rem;color:#aaa;margin-top:2px}
.pf-mypage-actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px}
.pf-mypage-action{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#fff;border:1.5px solid rgba(0,0,0,.06);border-radius:12px;color:#333;cursor:pointer;font-size:.85rem;font-weight:700;transition:all .25s}
.pf-mypage-action:hover{transform:translateY(-2px);border-color:var(--kc);color:var(--kc)}
.pf-quick-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:24px}
.pf-quick-card{display:flex;align-items:center;gap:12px;padding:16px 18px;background:#fff;border-radius:16px;border:2px solid transparent;color:inherit;transition:all .3s;box-shadow:0 4px 12px rgba(0,0,0,.05);cursor:pointer;text-decoration:none!important}
.pf-quick-card:hover{transform:translateY(-4px);border-color:var(--kc);box-shadow:0 12px 32px -8px var(--ks)}
.pf-quick-icon{font-size:1.8rem}
.pf-quick-title{font-size:.9rem;font-weight:800;color:#1a1a1a}
.pf-quick-desc{font-size:.72rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pf-tabs-wrap{position:relative;margin-bottom:20px}
.pf-tabs{display:flex;gap:4px;overflow-x:auto;padding:6px;background:rgba(255,255,255,.9);border-radius:16px;border:1px solid rgba(0,0,0,.05);cursor:grab;scrollbar-width:none;scroll-behavior:smooth;user-select:none}
.pf-tabs::-webkit-scrollbar{display:none}
.pf-tab{flex-shrink:0;padding:10px 16px;border:none;background:transparent;color:#666;font-size:.85rem;font-weight:700;border-radius:12px;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:6px;font-family:inherit;user-select:none}
.pf-tab:hover{background:rgba(0,0,0,.04);color:#333}
.pf-tab.active{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;box-shadow:0 6px 16px -4px var(--ks)}
.pf-tab-count{background:rgba(255,255,255,.25);padding:1px 7px;border-radius:10px;font-size:.7rem}
.pf-tab.mod-tab{color:#e74c3c}
.pf-tab.mod-tab.active{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.pf-tab.vip-tab{color:#f39c12}
.pf-tab.vip-tab.active{background:linear-gradient(135deg,#f39c12,#e67e22)}
.pf-tab-content{display:none;animation:pfFadeIn .3s ease}
.pf-tab-content.active{display:block}
.pf-card{background:#fff;border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:22px 26px;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.04)}
.pf-card-title{font-size:1.1rem;font-weight:800;color:#1a1a1a;margin:0 0 16px 0;display:flex;align-items:center;gap:10px}
.pf-ct-icon{font-size:1.4rem}
.pf-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:30px;border:2px solid var(--kc);background:var(--kc);color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;transition:all .25s;font-family:inherit}
.pf-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--ks)}
.pf-btn-outline{background:transparent;color:var(--kc)}
.pf-btn-outline:hover{background:var(--kc);color:#fff}
.pf-btn-danger{background:#e74c3c;border-color:#e74c3c}
.pf-btn:disabled{opacity:.5;cursor:not-allowed}
.pf-charts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:18px}
.pf-chart{background:linear-gradient(135deg,#fafbfd,#fff);border-radius:14px;padding:18px;border:1px solid rgba(0,0,0,.05)}
.pf-chart-title{font-size:.82rem;font-weight:800;color:#555;text-transform:uppercase;letter-spacing:.8px;margin-bottom:14px}
.pf-bar-chart{display:flex;align-items:flex-end;gap:6px;height:120px;padding:8px 0;border-bottom:1px dashed rgba(0,0,0,.08)}
.pf-bar{flex:1;background:linear-gradient(180deg,var(--kl),var(--kc));border-radius:4px 4px 0 0;min-height:4px;position:relative;transition:height .8s;animation:pfBar 1s ease both}
.pf-bar::after{content:attr(data-val);position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:.65rem;font-weight:800;color:var(--kc);opacity:0;transition:opacity .2s}
.pf-bar:hover::after{opacity:1}
.pf-pie-wrap{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.pf-pie{width:130px;height:130px;border-radius:50%;flex-shrink:0}
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
.pf-ach-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.pf-ach-filter{padding:6px 14px;border-radius:20px;border:1.5px solid rgba(108,99,255,.25);background:#fff;color:#666;font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit}
.pf-ach-filter.active{background:var(--kc);border-color:var(--kc);color:#fff}
.pf-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.pf-ach{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f8f9fb;border-radius:12px;border:2px solid transparent;transition:all .25s;position:relative}
.pf-ach:hover{transform:translateY(-3px);border-color:var(--kc)}
.pf-ach.locked{opacity:.45;filter:grayscale(.6)}
.pf-ach.locked::after{content:'🔒';position:absolute;top:6px;right:8px;font-size:.9rem}
.pf-ach:not(.locked)::after{content:'✓';position:absolute;top:6px;right:8px;font-size:.85rem;color:#27ae60;font-weight:900}
.pf-ach-icon{font-size:1.8rem;flex-shrink:0}
.pf-ach-name{font-size:.85rem;font-weight:700;color:#1a1a1a;margin-bottom:2px}
.pf-ach-date{font-size:.7rem;color:#888}
.pf-notes-toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.pf-notes-search{flex:1;min-width:180px;padding:10px 16px;border-radius:12px;border:1.5px solid rgba(0,0,0,.08);font-size:.85rem;font-family:inherit;outline:none;background:#fff}
.pf-notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.pf-note{background:#fff;border-radius:14px;padding:16px;border-left:4px solid var(--kc);box-shadow:0 4px 12px rgba(0,0,0,.06);cursor:pointer;transition:all .3s;position:relative}
.pf-note:hover{transform:translateY(-4px)}
.pf-note.pinned{background:linear-gradient(135deg,#fff8e1,#fffbf0);border-left-color:#f39c12}
.pf-note-pin{position:absolute;top:10px;right:10px;font-size:.85rem}
.pf-note-title{font-size:.92rem;font-weight:800;color:#1a1a1a;margin-bottom:6px;padding-right:24px;word-break:break-word}
.pf-note-content{font-size:.82rem;color:#555;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;max-height:120px;overflow:hidden}
.pf-note-footer{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08);font-size:.7rem;color:#999}
.pf-note-actions{display:flex;gap:4px}
.pf-note-actions button{width:24px;height:24px;border-radius:6px;border:none;background:rgba(0,0,0,.05);font-size:.75rem;cursor:pointer;color:#666;padding:0}
.pf-note-actions button.danger:hover{background:rgba(231,76,60,.15);color:#e74c3c}
.pf-friend{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;transition:all .25s;align-items:center;cursor:pointer}
.pf-friend:hover{background:rgba(108,99,255,.08);transform:translateX(4px)}
.pf-friend-avatar{width:44px;height:44px;aspect-ratio:1/1;border-radius:50%;object-fit:cover;border:2px solid var(--kc);flex-shrink:0}
.pf-friend-info{flex:1;min-width:0}
.pf-friend-name{font-weight:700;color:#1a1a1a;font-size:.92rem}
.pf-friend-status{font-size:.75rem;color:#888}
.pf-friend-actions{display:flex;gap:6px;flex-shrink:0}
.pf-icon-btn{width:32px;height:32px;border-radius:50%;border:1.5px solid rgba(0,0,0,.08);background:#fff;color:#666;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:.9rem;font-family:inherit;padding:0}
.pf-icon-btn.danger:hover{border-color:#e74c3c;color:#e74c3c;background:rgba(231,76,60,.08)}
.pf-icon-btn.success:hover{border-color:#27ae60;color:#27ae60;background:rgba(39,174,96,.08)}
.pf-leaderboard{width:100%;border-collapse:collapse;font-size:.88rem}
.pf-leaderboard th{text-align:left;padding:10px 12px;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;border-bottom:2px solid var(--kc)}
.pf-leaderboard td{padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-leaderboard tbody tr{cursor:pointer;transition:background .25s}
.pf-leaderboard tbody tr:hover{background:rgba(108,99,255,.05)}
.pf-leaderboard tbody tr.pf-me{background:var(--kc);color:#fff}
.pf-lb-avatar{width:32px;height:32px;aspect-ratio:1/1;border-radius:50%;vertical-align:middle;margin-right:8px;border:2px solid var(--kc);object-fit:cover}
.pf-chat-wrap{display:flex;flex-direction:column;gap:12px}
.pf-chat{background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.6));border-radius:16px;padding:16px;max-height:460px;overflow-y:auto;border:1px solid rgba(0,0,0,.05)}
.pf-chat-msg{margin:6px 0;padding:11px 16px;border-radius:16px;max-width:82%;word-wrap:break-word;font-size:.9rem;line-height:1.55}
.pf-chat-msg.user{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;margin-left:auto;border-bottom-right-radius:4px}
.pf-chat-msg.bot{background:#fff;color:#333;margin-right:auto;border-bottom-left-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.08)}
.pf-chat-links{margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08);display:flex;flex-direction:column;gap:6px}
.pf-chat-link{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(108,99,255,.08);border-radius:10px;color:var(--kc);font-size:.82rem;font-weight:700}
.pf-chat-chip{padding:8px 14px;background:#fff;border:1.5px solid rgba(108,99,255,.25);border-radius:20px;color:#555;font-size:.8rem;font-weight:600;cursor:pointer;font-family:inherit}
.pf-chat-chip:hover{background:var(--kc);border-color:var(--kc);color:#fff}
.pf-chat-input{display:flex;gap:8px}
.pf-chat-input input{flex:1;padding:13px 20px;border:2px solid rgba(0,0,0,.08);border-radius:30px;font-size:.9rem;font-family:inherit;outline:none;background:#fff}
.pf-chat-input button{padding:12px 26px;background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;border:none;border-radius:30px;cursor:pointer;font-weight:800;font-family:inherit;font-size:.9rem}
.pf-typing{display:inline-flex;gap:4px;padding:11px 16px;background:#fff;border-radius:16px;border-bottom-left-radius:4px}
.pf-typing span{width:6px;height:6px;border-radius:50%;background:#6C63FF;animation:pfTyping 1.2s infinite}
.pf-typing span:nth-child(2){animation-delay:.15s}
.pf-typing span:nth-child(3){animation-delay:.3s}
.pf-badge-2fa{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:.8rem;font-weight:800;background:linear-gradient(135deg,#27ae60,#16a085);color:#fff}
.pf-badge-2fa.off{background:rgba(0,0,0,.08);color:#666}
.pf-toggle{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-toggle:last-child{border-bottom:none}
.pf-toggle-label{font-size:.9rem;color:#333;font-weight:600}
.pf-toggle-desc{font-size:.75rem;color:#888;margin-top:2px}
.pf-switch{position:relative;width:48px;height:26px;background:rgba(0,0,0,.1);border-radius:26px;cursor:pointer;transition:all .3s;flex-shrink:0}
.pf-switch.on{background:linear-gradient(135deg,#27ae60,#16a085)}
.pf-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:all .3s;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.pf-switch.on::after{left:25px}
.pf-avatar-section{margin-bottom:18px}
.pf-avatar-section-title{font-size:.78rem;color:#888;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
.pf-avatar-grid{display:flex;gap:10px;flex-wrap:wrap}
.pf-avatar-option{width:64px;height:64px;aspect-ratio:1/1;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s;background:#f0f0f5}
.pf-avatar-option:hover{transform:scale(1.1);border-color:var(--kc)}
.pf-avatar-option.selected{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}
.pf-kingdom-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}
.pf-kingdom-btn{padding:10px 12px;border-radius:12px;border:2px solid rgba(0,0,0,.08);background:#fff;cursor:pointer;font-size:.82rem;font-weight:600;transition:all .25s;font-family:inherit;color:#333;display:flex;align-items:center;gap:8px;justify-content:center}
.pf-kingdom-btn img{width:24px;height:auto;border-radius:3px;flex-shrink:0}
.pf-kingdom-btn.selected{color:#fff;border-color:transparent}
.pf-vip-card{background:linear-gradient(135deg,rgba(243,156,18,.06),rgba(245,215,110,.03))!important;border:2px solid rgba(243,156,18,.25)!important}
.pf-frame-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:10px}
.pf-frame-option{cursor:pointer;padding:8px 4px;border-radius:12px;text-align:center;background:#fff;border:2px solid rgba(0,0,0,.06);transition:all .2s}
.pf-frame-option:hover{transform:translateY(-3px);border-color:#f39c12}
.pf-frame-option.selected{border-color:#f39c12;box-shadow:0 4px 16px -4px rgba(243,156,18,.5)}
.pf-frame-preview{width:48px;height:48px;margin:0 auto 6px;border-radius:50%;background-size:200% 200%;display:flex;align-items:center;justify-content:center;overflow:hidden}
.pf-frame-preview.animated{animation:vipFrameSpin 4s linear infinite}
.pf-frame-preview img{width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid #fff;aspect-ratio:1/1}
.pf-frame-name{font-size:.65rem;font-weight:800;color:#333}
.pf-bg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:10px}
.pf-bg-option{cursor:pointer;padding:6px;border-radius:10px;border:2px solid transparent;background:#fff;transition:all .2s}
.pf-bg-option:hover{transform:translateY(-3px)}
.pf-bg-option.selected{border-color:#f39c12;box-shadow:0 4px 16px -4px rgba(243,156,18,.5)}
.pf-bg-preview{height:50px;border-radius:6px;background-size:cover;background-position:center}
.pf-bg-name{font-size:.65rem;font-weight:800;color:#333;margin-top:4px;text-align:center}
.pf-title-presets{display:flex;gap:6px;flex-wrap:wrap}
.pf-title-preset{padding:6px 12px;border-radius:20px;border:1.5px solid rgba(243,156,18,.3);background:rgba(243,156,18,.05);color:#e67e22;font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s}
.pf-title-preset:hover{background:rgba(243,156,18,.15);transform:translateY(-1px)}
.pf-danger-btn{width:100%;padding:14px 20px;border-radius:12px;border:2px solid #e74c3c;background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;font-size:.9rem;font-weight:800;cursor:pointer;font-family:inherit;transition:all .25s}
.pf-danger-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px -4px rgba(231,76,60,.5)}
.pf-modal-bg{position:fixed;inset:0;background:rgba(10,10,26,.65);backdrop-filter:blur(8px);z-index:999998;display:flex;align-items:center;justify-content:center;padding:20px;animation:pfFade .25s ease;overflow-y:auto}
.pf-modal{background:#fff;border-radius:20px;padding:28px;max-width:480px;width:100%;box-shadow:0 24px 70px -12px rgba(0,0,0,.5);margin:auto}
.pf-modal h3{margin:0 0 8px 0;font-size:1.2rem;color:#1a1a2e;display:flex;align-items:center;gap:8px}
.pf-modal p{margin:0 0 18px 0;color:#666;font-size:.88rem;line-height:1.5}
.pf-modal-input{width:100%;padding:12px 16px;border-radius:12px;border:2px solid #e8eaf0;font-size:.95rem;font-family:inherit;outline:none;background:#fafafa;margin-bottom:12px;box-sizing:border-box}
.pf-modal textarea.pf-modal-input{min-height:100px;resize:vertical}
.pf-modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:8px;flex-wrap:wrap}
.pf-modal-actions button{flex:1;min-width:100px}
.pf-modal-avatar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:10px;margin-bottom:16px}
.pf-modal-avatar-grid img{width:100%;aspect-ratio:1/1;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s;background:#f0f0f5}
.pf-modal-avatar-grid img.selected{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}
.pf-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(120px);padding:12px 26px;border-radius:30px;font-weight:700;font-size:.9rem;z-index:999999;transition:transform .4s cubic-bezier(.16,1,.3,1);color:#fff;max-width:90vw}
.pf-toast.show{transform:translateX(-50%) translateY(0)}
.pf-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.pf-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.pf-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}
.pf-skel{background:linear-gradient(90deg,#f0f0f4 25%,#f8f8fc 50%,#f0f0f4 75%);background-size:200% 100%;animation:pfShine 1.5s ease-in-out infinite;border-radius:14px;margin-bottom:16px}
@media(max-width:600px){.pf-hero{padding:26px 20px}.pf-avatar{width:90px;height:90px}.pf-name{font-size:1.4rem}.pf-card{padding:18px 16px}.pf-quick-grid{grid-template-columns:1fr 1fr;gap:8px}.pf-quick-card{padding:12px 10px;flex-direction:column;text-align:center;gap:6px}.pf-mypage-grid{grid-template-columns:1fr 1fr}.pf-notes-grid{grid-template-columns:1fr}}
@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>

<script>
(function(){
'use strict';

var SB_URL='https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SB_KEY='sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var MY_KEY='mars-auth-v1';
var SB_STORE='sb-ncytbgbzfjfoqmmgfygz-auth-token';
var BACKUP='mars-auth-backup';
var CACHE='mars-profile-cache-v5';
var ACTIVITY='mars-activity-v1';
var XP_HIST='mars-xp-history';
var CHAT_HIST='mars-ai-chat-history';
var TAB_KEY='mars-profile-tab-v5';
var ACH_FILTER='mars-ach-filter';

var container=document.getElementById('profile-app');
if(!container)return;

/* КОРОЛЕВСТВА */
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
var KC={'Аркадия':'#D4A574','Ксанф':'#3D3D3D','Эдем':'#F4A460','Эридания':'#F5D76E','Кхонг':'#A9A9A9','Авсония':'#87CEEB','Кимерия':'#B19CD9','Серпентида':'#E57373','Эритрей':'#64B5F6','Утопия':'#4DD0E1','Эллада':'#FF8A65','Аливасото':'#81C784'};
var K_ORDER=['Эдем','Аркадия','Эридания','Кхонг','Авсония','Кимерия','Серпентида','Эритрей','Утопия','Эллада','Аливасото','Ксанф'];

/* ═══ АВАТАРКИ — ПРАВИЛЬНЫЕ ИМЕНА С ОШИБКОЙ ═══ */
var AV_TOP=[
'/assets/images/аватар1.png',
'/assets/images/аватар2.png',
'/assets/images/аватар3.png',
'/assets/images/аватар4.png',
'/assets/images/аватар5.png'
];
var AV_BOTTOM=[
'/assets/images/авотарка девушки.png',
'/assets/images/мужчина.png',
'/assets/images/мужчина2.png',
'/assets/images/мужчина 3.png',
'/assets/images/аватар 2.png'
];
var ALL_AVATARS=AV_TOP.concat(AV_BOTTOM);

/* ФОНЫ С КАРТИНКАМИ */
var IMG_BG=[
'/assets/images/night.jpg',
'/assets/images/scene-observatory.jpg',
'/assets/images/zephyria-sea.png',
'/assets/images/acidalia-sea.png'
];

/* PRELOAD ВСЕХ КАРТИНОК */
(function(){
  var all=ALL_AVATARS.concat(IMG_BG).concat(['/assets/images/guild-coin.jpg']);
  all.forEach(function(u){try{var i=new Image();i.decoding='async';i.src=u;}catch(e){}});
})();

var COIN='/assets/images/guild-coin.jpg';

/* VIP РАМКИ */
var VIP_FRAMES={
none:{name:'Без рамки',css:'',color:'#999'},
gold:{name:'Золото',css:'linear-gradient(135deg,#f5d76e,#f39c12,#e67e22,#f5d76e)',color:'#f39c12'},
silver:{name:'Серебро',css:'linear-gradient(135deg,#ecf0f1,#95a5a6,#7f8c8d,#ecf0f1)',color:'#95a5a6'},
fire:{name:'Огонь',css:'linear-gradient(135deg,#e74c3c,#f39c12,#e74c3c)',color:'#e74c3c'},
ice:{name:'Лёд',css:'linear-gradient(135deg,#5dade2,#85c1e9,#3498db,#5dade2)',color:'#5dade2'},
emerald:{name:'Изумруд',css:'linear-gradient(135deg,#27ae60,#16a085,#2ecc71)',color:'#27ae60'},
royal:{name:'Королевская',css:'linear-gradient(135deg,#9b59b6,#8e44ad,#d1a4e8)',color:'#9b59b6'},
cherry:{name:'Вишня',css:'linear-gradient(135deg,#e91e63,#c2185b,#ff6090)',color:'#e91e63'},
cyber:{name:'Кибер',css:'linear-gradient(135deg,#00bcd4,#00e5ff,#00838f)',color:'#00bcd4'},
sunset:{name:'Закат',css:'linear-gradient(135deg,#ff6b6b,#feca57,#f39c12)',color:'#ff6b6b'},
ocean:{name:'Океан',css:'linear-gradient(135deg,#0f3460,#16537e,#4a90e2)',color:'#4a90e2'},
legendary:{name:'Легенда',css:'conic-gradient(from 0deg,#f5d76e,#e74c3c,#9b59b6,#3498db,#27ae60,#f5d76e)',color:'#f5d76e',animated:true},
rainbow:{name:'Радуга',css:'conic-gradient(from 0deg,#e74c3c,#f39c12,#f5d76e,#27ae60,#3498db,#9b59b6,#e74c3c)',color:'#e74c3c',animated:true}
};

/* VIP ФОНЫ — с картинками */
var VIP_BGS={
default:{name:'Обычный',css:'linear-gradient(135deg,#1a1a2e 0%,#2d1b3d 40%,#4a2a3a 100%)'},
cosmic:{name:'Космос',css:'radial-gradient(circle at 20% 30%,rgba(108,99,255,.3),transparent 60%),linear-gradient(135deg,#0a0a1e,#1a1a2e,#2d1b3d)'},
fire:{name:'Огонь',css:'linear-gradient(135deg,#2c0a0a,#5c1a1a,#8b2a1a,#2c0a0a)'},
ice:{name:'Лёд',css:'linear-gradient(135deg,#0a1a2c,#1a3a5c,#2c5a8b,#0a1a2c)'},
night:{name:'Ночь',css:'linear-gradient(rgba(10,10,26,.6),rgba(45,27,61,.75)),url("/assets/images/night.jpg") center/cover'},
observatory:{name:'Обсерватория',css:'linear-gradient(rgba(10,10,26,.65),rgba(45,27,61,.75)),url("/assets/images/scene-observatory.jpg") center/cover'},
zephyria:{name:'Зефир. море',css:'linear-gradient(rgba(10,26,44,.6),rgba(20,42,60,.7)),url("/assets/images/zephyria-sea.png") center/cover'},
acidalia:{name:'Ацидалийское',css:'linear-gradient(rgba(10,26,44,.6),rgba(20,42,60,.7)),url("/assets/images/acidalia-sea.png") center/cover'},
legend:{name:'Легенда',css:'conic-gradient(from 0deg at 50% 50%,rgba(108,99,255,.25),rgba(243,156,18,.25),rgba(231,76,60,.25),rgba(39,174,96,.25),rgba(108,99,255,.25)),linear-gradient(135deg,#1a1a2e,#2d1b3d)'}
};

/* ГОТОВЫЕ ТИТУЛЫ */
var READY_TITLES=[
'🌱 Хранитель глины','⚔️ Мастер клинка','🛡️ Страж границ',
'📜 Летописец Марса','🔮 Провидец','👑 Лорд Красной планеты',
'⚡ Командир колонии','🔥 Феникс пустыни','💎 Хранитель сокровищ',
'🌌 Звёздный исследователь','🏔️ Покоритель Олимпа','🚀 Первопроходец',
'🧬 Мастер генов','🛠️ Инженер Фарсиды','📖 Мудрец Академии',
'⚗️ Алхимик Киммерии','🐉 Дракон Марса','✨ Легенда'
];

/* ФИЛЬТР МАТА */
var BAD=['бля','хуй','пизд','ебан','ебал','сука','мраз','гандон','мудак','долбо','пидор','жоп','срак','говн','нахуй','уебан','хер','шлюх'];
function isClean(t){if(!t)return true;var l=t.toLowerCase();for(var i=0;i<BAD.length;i++)if(l.indexOf(BAD[i])!==-1)return false;return true;}

/* РОЛИ */
var ROLES=[{l:1,n:'🌱 Поселенец'},{l:6,n:'🔭 Исследователь'},{l:11,n:'🚀 Первопроходец'},{l:16,n:'🏠 Колонизатор'},{l:21,n:'⚡ Командир'},{l:31,n:'🛡️ Хранитель'},{l:41,n:'🏛️ Сенатор'},{l:51,n:'⚔️ Мастер'},{l:61,n:'💎 Лорд'},{l:71,n:'🔥 Феникс'},{l:81,n:'🌟 Легенда'},{l:91,n:'👑 Полубог'},{l:100,n:'🐉 Бессмертный'}];
function getRole(l){var r=ROLES[0];for(var i=0;i<ROLES.length;i++)if(l>=ROLES[i].l)r=ROLES[i];return r.n;}

/* ДОСТИЖЕНИЯ */
var ACH=[
{id:1,n:'Первый шаг',i:'👣',d:'Зарегистрироваться',c:'start'},{id:2,n:'Марсианин',i:'🔴',d:'Выбрать королевство',c:'start'},{id:3,n:'Аватар',i:'🎨',d:'Установить аватарку',c:'start'},{id:4,n:'Биография',i:'📝',d:'Заполнить о себе',c:'start'},
{id:10,n:'Читатель',i:'📖',d:'5 статей',c:'read'},{id:11,n:'Эрудит',i:'🎓',d:'25 статей',c:'read'},{id:12,n:'Учёный',i:'🔬',d:'50 статей',c:'read'},{id:13,n:'Хранитель',i:'📚',d:'100 статей',c:'read'},{id:14,n:'Библиотекарь',i:'📔',d:'200 статей',c:'read'},{id:15,n:'Архивариус',i:'🗂️',d:'300 статей',c:'read'},
{id:20,n:'Первые 10',i:'⚡',d:'10 XP',c:'xp'},{id:21,n:'Сотка',i:'💯',d:'100 XP',c:'xp'},{id:22,n:'Пятисотка',i:'🔥',d:'500 XP',c:'xp'},{id:23,n:'Тысячник',i:'🏆',d:'1000 XP',c:'xp'},{id:24,n:'Пять тысяч',i:'💎',d:'5000 XP',c:'xp'},{id:25,n:'Десятка',i:'🎯',d:'10000 XP',c:'xp'},
{id:30,n:'Уровень 5',i:'5️⃣',d:'5 уровень',c:'lvl'},{id:31,n:'Уровень 10',i:'🔟',d:'10 уровень',c:'lvl'},{id:32,n:'Уровень 20',i:'2️⃣0️⃣',d:'20 уровень',c:'lvl'},{id:33,n:'Уровень 30',i:'3️⃣0️⃣',d:'30 уровень',c:'lvl'},{id:34,n:'Уровень 50',i:'5️⃣0️⃣',d:'50 уровень',c:'lvl'},{id:35,n:'Уровень 75',i:'7️⃣5️⃣',d:'75 уровень',c:'lvl'},{id:36,n:'Уровень 100',i:'💯',d:'100 уровень',c:'lvl'},
{id:40,n:'Неделя',i:'🔥',d:'7 дней',c:'streak'},{id:41,n:'Две недели',i:'🔥',d:'14 дней',c:'streak'},{id:42,n:'Месяц',i:'💪',d:'30 дней',c:'streak'},{id:43,n:'Сто дней',i:'⚡',d:'100 дней',c:'streak'},{id:45,n:'Год',i:'🏆',d:'365 дней',c:'streak'},
{id:50,n:'Первый друг',i:'👥',d:'1 друг',c:'social'},{id:51,n:'Компания',i:'👨‍👩‍👧',d:'5 друзей',c:'social'},{id:52,n:'Круг',i:'🫂',d:'10 друзей',c:'social'},{id:53,n:'Популярный',i:'⭐',d:'25 друзей',c:'social'},{id:55,n:'Легенда',i:'🌟',d:'100 друзей',c:'social'},
{id:60,n:'Новичок',i:'🏰',d:'В гильдии',c:'guild'},{id:61,n:'Основатель',i:'👑',d:'Создать гильдию',c:'guild'},{id:62,n:'Участник',i:'🛡️',d:'5 в гильдии',c:'guild'},{id:63,n:'Командир',i:'⚔️',d:'10 в гильдии',c:'guild'},{id:64,n:'Мастер',i:'🏛️',d:'25 в гильдии',c:'guild'},
{id:70,n:'Первый талант',i:'🪙',d:'1 талант',c:'currency'},{id:71,n:'Сто талантов',i:'💰',d:'100 талантов',c:'currency'},{id:72,n:'Богач',i:'💎',d:'1000 талантов',c:'currency'},{id:73,n:'Магнат',i:'👑',d:'10000 талантов',c:'currency'},
{id:80,n:'Эдемец',i:'🌅',d:'Эдем',c:'kingdom'},{id:82,n:'Кимер',i:'🔮',d:'Кимерию',c:'kingdom'},{id:85,n:'Пират',i:'⚓',d:'Ксанф',c:'kingdom'},{id:86,n:'Странник',i:'🧭',d:'Сменить королевство',c:'kingdom'},
{id:90,n:'Ночной страж',i:'🌙',d:'7 ночей',c:'special'},{id:91,n:'Трудоголик',i:'⚙️',d:'10 часов',c:'special'},{id:92,n:'Марафонец',i:'🏃',d:'50 часов',c:'special'},{id:93,n:'Легенда сайта',i:'🌟',d:'100 часов',c:'special'},{id:94,n:'Комментатор',i:'💬',d:'1 коммент',c:'special'},{id:95,n:'Оратор',i:'🗣️',d:'50 комментов',c:'special'},{id:96,n:'Летописец',i:'📜',d:'100 комментов',c:'special'},{id:97,n:'Кузнец слов',i:'⚒️',d:'10 заметок',c:'special'},{id:99,n:'Архивист',i:'🗄️',d:'100 заметок',c:'special'},{id:100,n:'Библиофил',i:'📚',d:'50 закладок',c:'special'},{id:105,n:'Квестер',i:'🗺️',d:'10 квестов',c:'special'},{id:106,n:'Игрок',i:'🎮',d:'5 игр',c:'special'},{id:109,n:'Провидец',i:'🔮',d:'10 гороскопов',c:'special'},{id:110,n:'Оракул',i:'🧿',d:'100 гороскопов',c:'special'}
];

/* БЫСТРЫЙ ДОСТУП */
var QUICK=[
{href:'/interactive/exodus/',i:'🚀',t:'К Исходу',d:'История'},
{href:'/globe-map/',i:'🌍',t:'Карта',d:'3D-глобус'},
{href:'/game/',i:'👑',t:'Империя',d:'Стратегия'},
{href:'/weather/',i:'🌡️',t:'Погода',d:'Прогноз'},
{href:'/museum/',i:'🏛️',t:'Музей',d:'Виртуальный'},
{href:'/duel/',i:'⚔️',t:'Дуэль',d:'Сражения'},
{href:'/scene-generator/',i:'🎬',t:'Сцены',d:'Генератор'},
{href:'/sky/',i:'🌠',t:'Небо',d:'Симулятор'},
{href:'/guilds/',i:'🏰',t:'Гильдии',d:'Объединения'},
{href:'/names/',i:'🔤',t:'Имя',d:'Генератор'},
{href:'/forum/',i:'💬',t:'Форум',d:'Общение'},
{href:'/scrolls/',i:'📜',t:'Свитки',d:'Летописи'},
{href:'/horoscope/',i:'🔮',t:'Гороскоп',d:'Предсказания'},
{href:'/top/',i:'🏆',t:'Топ',d:'Рейтинг'},
{href:'/quests/',i:'🗺️',t:'Квесты',d:'Задания'},
{href:'/feed/',i:'📰',t:'Лента',d:'События'},
{href:'/bookmarks/',i:'📚',t:'Закладки',d:'Сохранённое'},
{href:'/shop/',i:'🛒',t:'Магазин',d:'VIP и таланты'}
];

/* БАЗА ЗНАНИЙ */
var KB=[
{id:'kimeria',k:['кимерия','кимери'],a:'Кимерия — северное королевство Марса. 🏰 Столица — Окхасен.',l:'geography/kimeria/'},
{id:'arkadia',k:['аркадия'],a:'Аркадия — королевство Держателей Ветра. 🏛️',l:'geography/arkadia/'},
{id:'ksanf',k:['ксанф'],a:'Ксанф — пиратское королевство. ⚓',l:'history/pirate-kingdom/'},
{id:'hevsur',k:['хевсур'],a:'Хевсур — летописец Кимерии. 📜',l:'people/hevsur/'},
{id:'talin',k:['талин'],a:'Талин — великий астроном. 🔭',l:'people/talin/'},
{id:'xp',k:['опыт','xp'],a:'XP за: статьи, комментарии, квесты. +5 XP за статью.',l:'profile/'},
{id:'vip',k:['vip','вип'],a:'VIP: бейдж, свой цвет ника, рамка аватара, титул, emoji, фон, +25 талантов.',l:'shop/'}
];
function findA(q){if(!q)return null;var l=q.toLowerCase().replace(/[^\u0400-\u04FFa-z0-9\s]/g,' ').trim();if(!l)return null;var stop=['что','такое','кто','это','где','как','когда','почему','мне','про','о','в','на','и','с','у','для'];var w=l.split(/\s+/).filter(function(x){return x.length>2&&stop.indexOf(x)===-1;});if(!w.length)return null;var best=null,sc=0;for(var i=0;i<KB.length;i++){var s=0;for(var j=0;j<w.length;j++)for(var k=0;k<KB[i].k.length;k++){if(w[j]===KB[i].k[k]){s+=5;break;}if(w[j].indexOf(KB[i].k[k])===0||KB[i].k[k].indexOf(w[j])===0){s+=3;break;}}if(s>sc){sc=s;best=KB[i];}}return sc>=3?best:null;}

/* SESSION */
function readSess(){var keys=[MY_KEY,SB_STORE,BACKUP],raw=null,i;for(i=0;i<keys.length;i++){try{raw=localStorage.getItem(keys[i]);if(raw)break;}catch(e){}}if(!raw)for(i=0;i<keys.length;i++){try{raw=sessionStorage.getItem(keys[i]);if(raw)break;}catch(e){}}if(!raw)return null;try{var p=JSON.parse(raw);if(Array.isArray(p))p=p[p.length-1];if(!p||!p.access_token||!p.user)return null;if(p.expires_at&&p.expires_at*1000<Date.now())return null;return p;}catch(e){return null;}}
function readCache(ttl){try{var raw=localStorage.getItem(CACHE);if(!raw)return null;var c=JSON.parse(raw);if(!c||Date.now()-c.ts>(ttl||5*60*1000))return null;return c.data;}catch(e){return null;}}
function writeCache(d){try{localStorage.setItem(CACHE,JSON.stringify({data:d,ts:Date.now()}));}catch(e){}}

/* API */
async function GET(p,t){var h={'apikey':SB_KEY};if(t)h['Authorization']='Bearer '+t;var r=await fetch(SB_URL+'/rest/v1/'+p,{headers:h});if(!r.ok){if(r.status===401)throw new Error('Не авторизован');throw new Error('HTTP '+r.status);}var x=await r.text();if(!x)return null;try{return JSON.parse(x);}catch(e){return null;}}
async function POST(p,b,t,pref){var h={'apikey':SB_KEY,'Content-Type':'application/json'};if(t)h['Authorization']='Bearer '+t;if(pref)h['Prefer']=pref;var r=await fetch(SB_URL+'/rest/v1/'+p,{method:'POST',headers:h,body:JSON.stringify(b)});if(!r.ok)throw new Error('HTTP '+r.status);var x=await r.text();if(!x)return null;try{return JSON.parse(x);}catch(e){return null;}}
async function PATCH(p,b,t){var h={'apikey':SB_KEY,'Content-Type':'application/json'};if(t)h['Authorization']='Bearer '+t;var r=await fetch(SB_URL+'/rest/v1/'+p,{method:'PATCH',headers:h,body:JSON.stringify(b)});if(!r.ok)throw new Error('HTTP '+r.status);return true;}
async function DEL(p,t){var h={'apikey':SB_KEY};if(t)h['Authorization']='Bearer '+t;var r=await fetch(SB_URL+'/rest/v1/'+p,{method:'DELETE',headers:h});if(!r.ok)throw new Error('HTTP '+r.status);return true;}

/* UTILS */
function esc(s){return String(s||'').replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
function escAttr(s){return String(s||'').replace(/['"\\<>]/g,function(m){return{"'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e'}[m];});}
function toast(m,t){t=t||'info';var e=document.createElement('div');e.className='pf-toast '+t;e.textContent=m;document.body.appendChild(e);requestAnimationFrame(function(){e.classList.add('show');});setTimeout(function(){e.classList.remove('show');setTimeout(function(){e.remove();},400);},2500);}
function trackAct(){try{var a=JSON.parse(localStorage.getItem(ACTIVITY)||'{}');var td=new Date().toISOString().slice(0,10);a[td]=(a[td]||0)+1;var cut=new Date(Date.now()-90*86400000).toISOString().slice(0,10);Object.keys(a).forEach(function(k){if(k<cut)delete a[k];});localStorage.setItem(ACTIVITY,JSON.stringify(a));}catch(e){}}
function getAct(){try{return JSON.parse(localStorage.getItem(ACTIVITY)||'{}');}catch(e){return{};}}
function getXP(){try{return JSON.parse(localStorage.getItem(XP_HIST)||'{}');}catch(e){return{};}}
function getLvl(e){e=e||0;var l=1;while(l<100&&e>=Math.floor(Math.pow(l+1,1.8)*20))l++;var c=Math.floor(Math.pow(l,1.8)*20);var n=Math.floor(Math.pow(l+1,1.8)*20);return{level:l,current:c,next:n,percent:n>c?Math.min(((e-c)/(n-c))*100,100):100};}
function ini(n){if(!n)return '?';var p=String(n).trim().split(/[\s._-]+/);if(p.length>=2)return(p[0][0]+p[1][0]).toUpperCase();return n[0].toUpperCase();}
function avFallback(n){return 'https://ui-avatars.com/api/?name='+encodeURIComponent(ini(n))+'&background=6C63FF&color=fff&size=128&rounded=true';}

/* STATE */
var cu=null,cp=null;
var achs=[],notes=[],notifs=[],leaders=[],friends=[],reqs=[];
var guild=null,gmembers=[];
var streak=0,currency=0;
var chat=[];
var achF='all';
var noteQ='';
try{chat=JSON.parse(localStorage.getItem(CHAT_HIST)||'[]');}catch(e){chat=[];}
try{achF=localStorage.getItem(ACH_FILTER)||'all';}catch(e){}

function isVIP(){var u=cp&&cp.vip_until?new Date(cp.vip_until):null;return u&&u.getTime()>Date.now();}
function vipDays(){if(!isVIP())return 0;return Math.ceil((new Date(cp.vip_until)-Date.now())/86400000);}

/* RENDER */
function render(){
  if(!cp||!cu)return;
  var kc=KC[cp.kingdom]||'#6C63FF';
  document.documentElement.style.setProperty('--kc',kc);
  document.documentElement.style.setProperty('--kl',kc+'cc');
  document.documentElement.style.setProperty('--ks',kc+'40');
  document.documentElement.style.setProperty('--kb',kc+'15');

  var lvl=getLvl(cp.experience||0);
  var name=cp.display_name||cp.username||(cu.email||'').split('@')[0];
  var av=cp.avatar_url||avFallback(name);
  var role=getRole(lvl.level);
  var kingdom=cp.kingdom;
  var flag=kingdom?KINGDOM_FLAGS[kingdom]:null;
  var mod=cp.role==='moderator'||cp.role==='admin';
  var xpLeft=Math.max(lvl.next-(cp.experience||0),0);
  var vip=isVIP();
  var days=vipDays();

  var h='';

  /* HERO */
  var bgKey=cp.profile_bg||'default';
  var bgCss=(VIP_BGS[bgKey]&&VIP_BGS[bgKey].css)||VIP_BGS.default.css;

  h+='<div class="pf-hero" style="background:'+bgCss+';"><div class="pf-hero-content">';
  h+='<div class="pf-avatar-wrap" onclick="pfAvPick()">';
  h+='<div class="pf-avatar-ring"></div>';
  var fk=cp.avatar_frame||'none';
  var fr=VIP_FRAMES[fk];
  if(vip&&fr&&fr.css){
    h+='<span class="vip-avatar-frame'+(fr.animated?' animated':'')+'" style="background:'+fr.css+';background-size:200% 200%;">';
    h+='<img src="'+escAttr(av)+'" class="pf-avatar" onerror="this.onerror=null;this.src=\''+avFallback(name)+'\';">';
    h+='</span>';
  }else{
    h+='<img src="'+escAttr(av)+'" class="pf-avatar" onerror="this.onerror=null;this.src=\''+avFallback(name)+'\';">';
  }
  h+='<div class="pf-avatar-badge">📷</div>';
  h+='<div class="pf-role-badge">'+esc(role)+'</div>';
  h+='</div>';

  h+='<div class="pf-info">';
  var nCls='pf-name'+(vip?' vip-name':'');
  var nCol=cp.nick_color||kc;
  var nSty=vip?' style="background:linear-gradient(90deg,'+nCol+' 0%,#f5d76e 25%,'+nCol+' 50%,#f5d76e 75%,'+nCol+' 100%);background-size:200% auto;"':'';
  h+='<h1 class="'+nCls+'"'+nSty+' onclick="pfEditName()">'+esc(name)+' <span class="pf-name-edit">✏️</span>';
  if(vip)h+=' <span class="pf-vip-badge" title="VIP до '+new Date(cp.vip_until).toLocaleDateString('ru-RU')+'">'+(cp.vip_badge||'👑')+'</span>';
  if(vip&&cp.custom_title)h+=' <span class="pf-vip-title">'+esc(cp.custom_title)+'</span>';
  if(mod)h+=' <span class="pf-mod-badge" onclick="event.stopPropagation();pfTab(\'moderation\')">🛡️ Модератор</span>';
  h+='</h1>';
  if(vip)h+='<div style="font-size:.78rem;margin-bottom:10px;color:rgba(255,255,255,.75);font-weight:700;">👑 VIP активен · '+days+' дней</div>';

  if(kingdom)h+='<div style="margin-bottom:12px;"><span class="pf-kingdom-badge" onclick="pfTab(\'settings\')">'+(flag?'<img src="'+escAttr(flag)+'">':'')+' '+esc(kingdom)+'</span></div>';
  else h+='<div style="margin-bottom:12px;"><span class="pf-kingdom-badge" onclick="pfTab(\'settings\')">🏰 Выбрать королевство</span></div>';

  h+='<p class="pf-email">'+esc(cu.email||'')+'</p>';
  h+='<div class="pf-stats">';
  h+='<div class="pf-stat-item" onclick="pfTab(\'achievements\')"><div class="pf-stat-label">Уровень</div><div class="pf-stat-value">⭐ '+lvl.level+'</div></div>';
  h+='<div class="pf-stat-item" onclick="pfTab(\'activity\')"><div class="pf-stat-label">Опыт</div><div class="pf-stat-value">💎 '+(cp.experience||0)+'</div></div>';
  h+='<div class="pf-stat-item" onclick="pfTab(\'achievements\')"><div class="pf-stat-label">Награды</div><div class="pf-stat-value">🏆 '+achs.length+'</div></div>';
  if(streak>0)h+='<div class="pf-stat-item" onclick="pfTab(\'activity\')"><div class="pf-stat-label">Серия</div><div class="pf-stat-value">🔥 '+streak+'</div></div>';
  h+='<div class="pf-stat-item" onclick="pfTab(\'friends\')"><div class="pf-stat-label">Друзья</div><div class="pf-stat-value">👥 '+friends.length+'</div></div>';
  h+='</div>';
  h+='<div class="pf-currency-click" onclick="window.location.href=\'/shop/\'"><img src="'+COIN+'" class="pf-stat-coin"> <span>'+currency+'</span> талантов →</div>';
  h+='<div class="pf-progress-bar"><div class="pf-progress-fill" style="width:'+lvl.percent+'%"></div></div>';
  h+='<div class="pf-progress-text">До уровня '+(lvl.level+1)+': '+xpLeft+' XP</div>';
  h+='</div></div></div>';

  /* MYPAGE */
  h+='<div class="pf-mypage">';
  h+='<h2 class="pf-mypage-title">Моя страничка</h2><p class="pf-mypage-sub">Быстрый обзор</p>';
  h+='<div class="pf-mypage-grid">';
  h+='<div class="pf-mypage-tile" onclick="pfTab(\'achievements\')"><div class="pf-mypage-tile-label">Достижения</div><div class="pf-mypage-tile-value">'+achs.length+'/'+ACH.length+'</div><div class="pf-mypage-tile-sub">'+Math.round(achs.length/ACH.length*100)+'%</div></div>';
  h+='<div class="pf-mypage-tile" onclick="pfTab(\'notes\')"><div class="pf-mypage-tile-label">Заметки</div><div class="pf-mypage-tile-value">'+notes.length+'</div><div class="pf-mypage-tile-sub">записей</div></div>';
  h+='<div class="pf-mypage-tile" onclick="pfTab(\'friends\')"><div class="pf-mypage-tile-label">Друзья</div><div class="pf-mypage-tile-value">'+friends.length+'</div><div class="pf-mypage-tile-sub">в кругу</div></div>';
  h+='<div class="pf-mypage-tile" onclick="pfTab(\'activity\')"><div class="pf-mypage-tile-label">Дней</div><div class="pf-mypage-tile-value">'+Object.keys(getAct()).length+'</div><div class="pf-mypage-tile-sub">активных</div></div>';
  h+='</div>';
  h+='<div class="pf-mypage-actions">';
  h+='<a href="/achievements/" class="pf-mypage-action">🏅 Награды</a>';
  h+='<a href="/bookmarks/" class="pf-mypage-action">📚 Закладки</a>';
  h+='<a href="/quests/" class="pf-mypage-action">🗺️ Квесты</a>';
  h+='<a href="/shop/" class="pf-mypage-action">🛒 Магазин</a>';
  h+='</div></div>';

  /* QUICK */
  h+='<div class="pf-quick-grid">';
  QUICK.forEach(function(q){h+='<a href="'+q.href+'" class="pf-quick-card"><div class="pf-quick-icon">'+q.i+'</div><div><div class="pf-quick-title">'+q.t+'</div><div class="pf-quick-desc">'+q.d+'</div></div></a>';});
  h+='</div>';

  /* TABS */
  var tabs=[{id:'overview',i:'👤',l:'Обзор'},{id:'activity',i:'📊',l:'Активность'}];
  if(mod)tabs.push({id:'moderation',i:'🛡️',l:'Модерация',cls:'mod-tab'});
  tabs.push({id:'vip',i:'👑',l:'VIP',cls:'vip-tab'});
  tabs.push({id:'guild',i:'🏰',l:'Гильдия'},{id:'achievements',i:'🏅',l:'Достижения',c:achs.length},{id:'notes',i:'📝',l:'Заметки',c:notes.length},{id:'friends',i:'👥',l:'Друзья',c:friends.length},{id:'ai',i:'🤖',l:'ИИ-гид'},{id:'notifications',i:'🔔',l:'Уведомления'},{id:'leaderboard',i:'🏆',l:'Лидеры'},{id:'security',i:'🔐',l:'Безопасность'},{id:'settings',i:'⚙️',l:'Настройки'});

  var active=localStorage.getItem(TAB_KEY)||'overview';
  if(!tabs.find(function(t){return t.id===active;}))active='overview';

  h+='<div class="pf-tabs-wrap"><div class="pf-tabs" id="pf-tabs">';
  tabs.forEach(function(t){h+='<button class="pf-tab '+(t.cls||'')+(t.id===active?' active':'')+'" data-tab="'+t.id+'">'+t.i+' '+t.l+(t.c?' <span class="pf-tab-count">'+t.c+'</span>':'')+'</button>';});
  h+='</div></div>';

  /* OVERVIEW */
  h+='<div class="pf-tab-content'+(active==='overview'?' active':'')+'" data-content="overview">';
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>';
  h+='<p style="margin:0 0 12px;color:#555;font-size:.95rem;line-height:1.6;" id="pf-bio">'+esc(cp.bio||'✍️ Ещё ничего не рассказал о себе.')+'</p>';
  h+='<button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button></div>';
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>';
  var md=getMD();
  h+='<div style="text-align:center;padding:20px;background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.4));border-radius:14px;">';
  h+='<div style="font-size:1.2rem;font-weight:800;color:var(--kc);">'+md.month+'</div>';
  h+='<div style="font-size:2.5rem;font-weight:900;color:#1a1a1a;margin:6px 0;">'+md.day+'</div>';
  h+='<div style="font-size:.9rem;color:#666;">Год '+md.year+' Э.О.</div></div></div></div>';

  /* ACTIVITY */
  h+='<div class="pf-tab-content'+(active==='activity'?' active':'')+'" data-content="activity">';
  h+='<div class="pf-charts-grid">';
  var xh=getXP(),d14=[],mx=1;
  for(var i=13;i>=0;i--){var d=new Date(Date.now()-i*86400000);var k=d.toISOString().slice(0,10);var v=xh[k]||0;if(v>mx)mx=v;d14.push({v:v,d:d});}
  h+='<div class="pf-chart"><div class="pf-chart-title">📈 XP за 14 дней</div><div class="pf-bar-chart">';
  d14.forEach(function(day){var p=(day.v/mx)*100;h+='<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%;"><div class="pf-bar" style="height:'+Math.max(p,3)+'%" data-val="'+day.v+'"></div></div>';});
  h+='</div></div>';
  h+='<div class="pf-chart"><div class="pf-chart-title">🥧 Источники XP</div><div class="pf-pie-wrap">';
  h+='<div class="pf-pie" style="background:conic-gradient(#6C63FF 0 45%,#f39c12 45% 75%,#27ae60 75% 90%,#e74c3c 90% 100%);"></div>';
  h+='<div class="pf-pie-legend"><div class="pf-pie-legend-item"><span class="pf-pie-dot" style="background:#6C63FF;"></span><span class="pf-pie-label">Чтение</span><span class="pf-pie-value">45%</span></div><div class="pf-pie-legend-item"><span class="pf-pie-dot" style="background:#f39c12;"></span><span class="pf-pie-label">Квесты</span><span class="pf-pie-value">30%</span></div><div class="pf-pie-legend-item"><span class="pf-pie-dot" style="background:#27ae60;"></span><span class="pf-pie-label">Награды</span><span class="pf-pie-value">15%</span></div><div class="pf-pie-legend-item"><span class="pf-pie-dot" style="background:#e74c3c;"></span><span class="pf-pie-label">Прочее</span><span class="pf-pie-value">10%</span></div></div></div></div>';
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔥</span> Активность за 90 дней</h3><div class="pf-heatmap">'+renderHeat()+'</div></div></div>';

  /* VIP */
  h+='<div class="pf-tab-content'+(active==='vip'?' active':'')+'" data-content="vip">'+renderVIP(vip)+'</div>';

  /* MODERATION */
  if(mod){h+='<div class="pf-tab-content'+(active==='moderation'?' active':'')+'" data-content="moderation"><div class="pf-card" style="background:linear-gradient(135deg,rgba(231,76,60,.05),rgba(192,57,43,.03));border:2px solid rgba(231,76,60,.25);"><h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">🛡️</span> Центр модерации</h3><a href="/lists/moderation/" class="pf-btn pf-btn-danger">🛡️ Открыть панель</a></div></div>';}

  /* GUILD */
  h+='<div class="pf-tab-content'+(active==='guild'?' active':'')+'" data-content="guild">';
  if(guild){
    h+='<div class="pf-card" onclick="window.location.href=\'/guilds/\'" style="cursor:pointer;background:linear-gradient(135deg,'+(guild.color||kc)+',rgba(0,0,0,.2));color:#fff;padding:26px 28px;border-radius:18px;margin-bottom:18px;"><div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;"><div style="width:76px;height:76px;border-radius:18px;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:2px solid rgba(255,255,255,.45);">'+(guild.icon||'🏰')+'</div><div style="flex:1;"><div style="font-size:1.5rem;font-weight:800;margin-bottom:6px;">'+esc(guild.name)+'</div><div style="font-size:.85rem;opacity:.92;">👥 '+gmembers.length+' · нажми →</div></div></div></div>';
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📜</span> Описание</h3><p style="margin:0;color:#555;line-height:1.6;">'+esc(guild.description||'Без описания')+'</p></div>';
    h+='<div class="pf-card"><a href="/guilds/" class="pf-btn pf-btn-outline">🏰 В раздел гильдий</a>';
    if(guild.leader_id===cu.id)h+='<button class="pf-btn pf-btn-danger" style="margin-left:8px;" onclick="pfDelGuild()">🗑️ Удалить</button>';
    h+='</div>';
  }else{h+='<div class="pf-card" style="text-align:center;padding:50px 20px;"><div style="font-size:4rem;margin-bottom:12px;">🏰</div><h3 style="margin:0 0 8px;">Вы не в гильдии</h3><a href="/guilds/" class="pf-btn">🔍 Найти гильдию</a></div>';}
  h+='</div>';

  /* ACHIEVEMENTS */
  h+='<div class="pf-tab-content'+(active==='achievements'?' active':'')+'" data-content="achievements"><div class="pf-card">';
  h+='<h3 class="pf-card-title"><span class="pf-ct-icon">🏅</span> Достижения ('+achs.length+'/'+ACH.length+')</h3>';
  h+='<div style="height:10px;background:rgba(108,99,255,.1);border-radius:10px;overflow:hidden;margin-bottom:16px;"><div style="height:100%;width:'+Math.round(achs.length/ACH.length*100)+'%;background:linear-gradient(90deg,var(--kc),var(--kl));border-radius:10px;"></div></div>';
  h+='<div class="pf-ach-filters">';
  [{id:'all',n:'Все'},{id:'start',n:'Начало'},{id:'read',n:'Чтение'},{id:'xp',n:'Опыт'},{id:'lvl',n:'Уровни'},{id:'streak',n:'Серия'},{id:'social',n:'Друзья'},{id:'guild',n:'Гильдии'},{id:'currency',n:'Валюта'},{id:'kingdom',n:'Королевства'},{id:'special',n:'Особые'}].forEach(function(f){h+='<button class="pf-ach-filter'+(achF===f.id?' active':'')+'" data-f="'+f.id+'">'+f.n+'</button>';});
  h+='</div><div class="pf-ach-grid" id="pf-ach-grid">'+renderAchGrid()+'</div></div></div>';

  /* NOTES */
  h+='<div class="pf-tab-content'+(active==='notes'?' active':'')+'" data-content="notes"><div class="pf-card">';
  h+='<h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> Заметки ('+notes.length+')</h3>';
  h+='<div class="pf-notes-toolbar"><input type="text" class="pf-notes-search" placeholder="🔍 Поиск..." value="'+escAttr(noteQ)+'" oninput="pfNoteQ(this.value)"><button class="pf-btn" onclick="pfNoteForm()">➕ Новая</button></div>';
  var fl=notes.filter(function(n){if(!noteQ)return true;var q=noteQ.toLowerCase();return (n.title||'').toLowerCase().indexOf(q)!==-1||(n.content||'').toLowerCase().indexOf(q)!==-1;});
  if(!fl.length)h+='<p style="text-align:center;color:#888;padding:40px 20px;">'+(noteQ?'Ничего не найдено':'Пока нет заметок')+'</p>';
  else{
    h+='<div class="pf-notes-grid">';
    fl.forEach(function(n){
      h+='<div class="pf-note'+(n.pinned?' pinned':'')+'" onclick="pfEditNote('+n.id+')">';
      if(n.pinned)h+='<span class="pf-note-pin">📌</span>';
      h+='<div class="pf-note-title">'+esc(n.title||'Без названия')+'</div>';
      h+='<div class="pf-note-content">'+esc(n.content)+'</div>';
      h+='<div class="pf-note-footer"><span>'+new Date(n.updated_at||n.created_at).toLocaleDateString('ru-RU')+'</span>';
      h+='<div class="pf-note-actions" onclick="event.stopPropagation();"><button onclick="pfPinNote('+n.id+')">'+(n.pinned?'📍':'📌')+'</button><button onclick="pfEditNote('+n.id+')">✏️</button><button class="danger" onclick="pfDelNote('+n.id+')">🗑️</button></div></div></div>';
    });
    h+='</div>';
  }
  h+='</div></div>';

  /* FRIENDS */
  h+='<div class="pf-tab-content'+(active==='friends'?' active':'')+'" data-content="friends">';
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👥</span> Друзья ('+friends.length+')</h3>';
  if(!friends.length)h+='<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет друзей.</p>';
  else friends.forEach(function(f){var n=f.other.display_name||f.other.username||'Аноним';var a=f.other.avatar_url||avFallback(n);h+='<div class="pf-friend" onclick="pfGuest(\''+escAttr(f.other.user_id)+'\')"><img src="'+escAttr(a)+'" class="pf-friend-avatar" loading="lazy" onerror="this.onerror=null;this.src=\''+avFallback(n)+'\';"><div class="pf-friend-info"><div class="pf-friend-name">'+esc(n)+'</div><div class="pf-friend-status">👥 Друзья</div></div><div class="pf-friend-actions" onclick="event.stopPropagation();"><button class="pf-icon-btn danger" onclick="pfRmFriend(\''+escAttr(f.other.user_id)+'\')">✕</button></div></div>';});
  h+='</div>';
  if(reqs.length>0){
    h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📨</span> Заявки ('+reqs.length+')</h3>';
    reqs.forEach(function(f){var n=f.other.display_name||f.other.username||'Аноним';var a=f.other.avatar_url||avFallback(n);h+='<div class="pf-friend"><img src="'+escAttr(a)+'" class="pf-friend-avatar" onclick="pfGuest(\''+escAttr(f.other.user_id)+'\')" onerror="this.onerror=null;this.src=\''+avFallback(n)+'\';"><div class="pf-friend-info"><div class="pf-friend-name">'+esc(n)+'</div><div class="pf-friend-status">хочет дружить</div></div><div class="pf-friend-actions"><button class="pf-icon-btn success" onclick="pfAccFriend(\''+escAttr(f.other.user_id)+'\')">✓</button><button class="pf-icon-btn danger" onclick="pfDeclFriend(\''+escAttr(f.other.user_id)+'\')">✕</button></div></div>';});
    h+='</div>';
  }
  h+='</div>';

  /* AI */
  h+='<div class="pf-tab-content'+(active==='ai'?' active':'')+'" data-content="ai"><div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🤖</span> ИИ-гид</h3><div class="pf-chat-wrap">';
  h+='<div class="pf-chat" id="pf-chat">';
  if(!chat.length)h+='<div class="pf-chat-msg bot">Привет! Спроси о королевствах, персонажах, VIP!</div>';
  else chat.slice(-30).forEach(function(m){h+='<div class="pf-chat-msg '+(m.role==='user'?'user':'bot')+'">'+fmtChat(m)+'</div>';});
  h+='</div><div style="display:flex;flex-wrap:wrap;gap:8px;">';
  ['Что такое Кимерия?','Что даёт VIP?','Как получить опыт?','Что такое гильдии?'].forEach(function(q){h+='<button type="button" class="pf-chat-chip" onclick="pfAsk(\''+escAttr(q)+'\')">'+esc(q)+'</button>';});
  h+='</div><div class="pf-chat-input"><input type="text" id="pf-chat-in" placeholder="Вопрос..." onkeypress="if(event.key===\'Enter\')pfSend()"><button type="button" onclick="pfSend()">➤</button></div></div></div></div>';

  /* NOTIFICATIONS */
  h+='<div class="pf-tab-content'+(active==='notifications'?' active':'')+'" data-content="notifications"><div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Уведомления ('+notifs.length+')</h3>';
  if(!notifs.length)h+='<p style="text-align:center;color:#888;padding:40px 20px;">Уведомлений нет.</p>';
  else notifs.forEach(function(n){h+='<div style="display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;"><div style="font-size:1.3rem;">📬</div><div style="flex:1;"><div style="font-size:.88rem;color:#333;">'+esc(n.message||'')+'</div><div style="font-size:.72rem;color:#999;margin-top:2px;">'+new Date(n.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div></div></div>';});
  h+='</div></div>';

  /* LEADERBOARD */
  h+='<div class="pf-tab-content'+(active==='leaderboard'?' active':'')+'" data-content="leaderboard"><div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10</h3>';
  if(!leaders.length)h+='<p style="text-align:center;color:#888;padding:40px 20px;">Недоступно.</p>';
  else{
    h+='<table class="pf-leaderboard"><thead><tr><th>#</th><th>Участник</th><th style="text-align:right;">Ур.</th><th style="text-align:right;">XP</th></tr></thead><tbody>';
    leaders.forEach(function(l,i){var nm=l.display_name||l.username||'Аноним';var med=['🥇','🥈','🥉'];var isMe=l.user_id===cu.id;h+='<tr class="'+(isMe?'pf-me':'')+'" onclick="pfGuest(\''+escAttr(l.user_id)+'\')"><td>'+(med[i]||(i+1))+'</td><td><img src="'+escAttr(l.avatar_url||avFallback(nm))+'" class="pf-lb-avatar" loading="lazy" onerror="this.onerror=null;this.src=\''+avFallback(nm)+'\';">'+esc(nm)+(isMe?' (вы)':'')+'</td><td style="text-align:right;">'+(l.level||getLvl(l.experience||0).level)+'</td><td style="text-align:right;"><b>'+(l.experience||0)+'</b></td></tr>';});
    h+='</tbody></table>';
  }
  h+='</div></div>';

  /* SECURITY */
  h+='<div class="pf-tab-content'+(active==='security'?' active':'')+'" data-content="security">';
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📧</span> Email-2FA</h3><div id="pf-2fa" style="margin-bottom:20px;"></div><div class="pf-toggle"><div><div class="pf-toggle-label">🔐 Email-2FA</div><div class="pf-toggle-desc">Код при входе</div></div><div class="pf-switch" id="pf-sw2fa" onclick="pfTog2FA()"></div></div></div>';
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📱</span> Вход с другого устройства</h3><p style="color:#666;font-size:.88rem;margin:0 0 14px;">QR-код для входа</p><button type="button" class="pf-btn" onclick="pfQR()" style="width:100%;justify-content:center;">📱 Показать QR</button></div>';
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔑</span> Пароль</h3><button class="pf-btn" onclick="pfChPass()">🔐 Сменить</button></div></div>';

  /* SETTINGS */
  h+='<div class="pf-tab-content'+(active==='settings'?' active':'')+'" data-content="settings">';
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👤</span> Имя</h3><p style="color:#555;margin:0 0 12px;">Текущее: <b>'+esc(name)+'</b></p><button class="pf-btn pf-btn-outline" onclick="pfEditName()">✏️ Изменить</button></div>';

  /* АВАТАРКИ — ПРАВИЛЬНЫЕ ИМЕНА */
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🖼️</span> Аватар</h3>';
  h+='<div class="pf-avatar-section"><div class="pf-avatar-section-title">Новые</div><div class="pf-avatar-grid">';
  AV_TOP.forEach(function(u){h+='<img src="'+u+'" class="pf-avatar-option'+(av===u?' selected':'')+'" onclick="pfSetAv(\''+escAttr(u)+'\')" loading="lazy" onerror="this.style.display=\'none\'">';});
  h+='</div></div>';
  h+='<div class="pf-avatar-section"><div class="pf-avatar-section-title">Классические</div><div class="pf-avatar-grid">';
  AV_BOTTOM.forEach(function(u){h+='<img src="'+u+'" class="pf-avatar-option'+(av===u?' selected':'')+'" onclick="pfSetAv(\''+escAttr(u)+'\')" loading="lazy" onerror="this.style.display=\'none\'">';});
  h+='</div></div></div>';

  /* КОРОЛЕВСТВО */
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏰</span> Королевство</h3><div class="pf-kingdom-grid">';
  K_ORDER.forEach(function(n){var sel=cp.kingdom===n;var c=KC[n]||'#6C63FF';var f=KINGDOM_FLAGS[n];h+='<button class="pf-kingdom-btn'+(sel?' selected':'')+'" style="'+(sel?'background:'+c+';border-color:'+c+';':'')+'" onclick="pfSetK(\''+n+'\')"><img src="'+escAttr(f)+'"><span>'+n+'</span></button>';});
  h+='</div></div>';
  h+='<button class="pf-danger-btn" onclick="pfDanger()">⚠️ Опасная зона</button>';
  h+='</div>';

  container.innerHTML=h;
  attachTabs();
  if(active==='security')rend2FA();
  if(active==='vip')attachPromo();
}

/* VIP TAB */
function renderVIP(vip){
  var h='';var days=vipDays();
  if(vip){
    h+='<div class="pf-card pf-vip-card"><h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">👑</span> VIP активен · '+days+' дней</h3><p style="margin:0;color:#666;">У тебя все привилегии — настрой под себя!</p></div>';
  }else{
    h+='<div class="pf-card pf-vip-card"><h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">👑</span> VIP-статус</h3><p style="margin:0 0 16px;color:#666;line-height:1.6;">VIP даёт: золотой бейдж, свой цвет ника, рамку аватара, кастомный титул, свой emoji, живой фон профиля, <b>+25 талантов</b>.</p><a href="/shop/" class="pf-btn" style="width:100%;justify-content:center;">🛒 Купить VIP</a></div>';
  }

  /* ПРОМОКОД */
  h+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🎁</span> Активировать промокод</h3>';
  h+='<p style="margin:0 0 14px;color:#888;font-size:.85rem;">Введите код чтобы получить VIP или таланты</p>';
  h+='<div style="display:flex;gap:8px;flex-wrap:wrap;">';
  h+='<input id="vip-promo-in" type="text" placeholder="TEST-VIP-2026" style="flex:1;min-width:180px;padding:12px 16px;border:2px solid #e8eaf0;border-radius:12px;font-size:.95rem;font-family:inherit;outline:none;box-sizing:border-box;">';
  h+='<button id="vip-promo-btn" type="button" style="padding:12px 24px;background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer;font-family:inherit;">Активировать</button>';
  h+='</div><div id="vip-promo-st" style="margin-top:10px;font-size:.85rem;font-weight:600;min-height:20px;"></div></div>';

  if(vip){
    /* СВОЯ АВАТАРКА */
    h+='<div class="pf-card pf-vip-card"><h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">📷</span> Своя аватарка</h3>';
    var av=cp.avatar_url||avFallback(cp.display_name||cp.username||'');
    h+='<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">';
    h+='<img src="'+escAttr(av)+'" style="width:64px;height:64px;aspect-ratio:1/1;border-radius:50%;object-fit:cover;border:3px solid #f39c12;" onerror="this.onerror=null;this.src=\''+avFallback(cp.display_name||'U')+'\';">';
    h+='<label style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;border-radius:12px;font-weight:800;cursor:pointer;font-size:.85rem;font-family:inherit;">📤 Загрузить<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none;" onchange="pfUpload(this)"></label>';
    h+='<span style="font-size:.75rem;color:#888;">до 2 МБ · JPG, PNG, WEBP</span>';
    h+='</div></div>';

    /* РАМКИ */
    h+='<div class="pf-card pf-vip-card"><h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">🖼️</span> Рамка аватара</h3><div class="pf-frame-grid">';
    Object.keys(VIP_FRAMES).forEach(function(k){
      var f=VIP_FRAMES[k];
      var sel=(cp.avatar_frame===k||(!cp.avatar_frame&&k==='none'));
      h+='<div class="pf-frame-option'+(sel?' selected':'')+'" onclick="pfVipSet(\'avatar_frame\',\''+k+'\')">';
      h+='<div class="pf-frame-preview'+(f.animated?' animated':'')+'" style="background:'+(f.css||'#eee')+';'+(f.css?'background-size:200% 200%;':'')+'">';
      h+='<img src="'+escAttr(cp.avatar_url||avFallback(cp.display_name||'U'))+'" onerror="this.onerror=null;this.src=\''+avFallback(cp.display_name||'U')+'\';">';
      h+='</div><div class="pf-frame-name">'+f.name+'</div></div>';
    });
    h+='</div></div>';

    /* ТИТУЛ */
    h+='<div class="pf-card pf-vip-card"><h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">🏆</span> Свой титул</h3>';
    h+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">';
    h+='<input id="vip-title-in" type="text" maxlength="30" value="'+escAttr(cp.custom_title||'')+'" placeholder="Выбери готовый или напиши" style="flex:1;min-width:200px;padding:11px 16px;border:2px solid #e8eaf0;border-radius:12px;font-size:.9rem;font-family:inherit;outline:none;">';
    h+='<button onclick="pfTitle()" style="padding:11px 20px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer;font-family:inherit;">💾</button>';
    h+='</div><div style="font-size:.78rem;color:#888;margin-bottom:8px;">Или выбери готовый:</div><div class="pf-title-presets">';
    READY_TITLES.forEach(function(t){h+='<button type="button" class="pf-title-preset" onclick="pfTitle(\''+escAttr(t)+'\')">'+t+'</button>';});
    h+='</div></div>';

    /* EMOJI */
    h+='<div class="pf-card pf-vip-card"><h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">😀</span> Свой emoji</h3>';
    h+='<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">';
    h+='<input id="vip-emoji-in" type="text" maxlength="4" value="'+escAttr(cp.custom_emoji||'')+'" placeholder="🔥" style="width:80px;padding:11px 16px;border:2px solid #e8eaf0;border-radius:12px;font-size:1.3rem;text-align:center;font-family:inherit;outline:none;">';
    h+='<button onclick="pfEmoji()" style="padding:11px 20px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer;font-family:inherit;">💾</button>';
    h+='</div></div>';

    /* ЦВЕТ */
    h+='<div class="pf-card pf-vip-card"><h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">🎨</span> Цвет ника</h3><div style="display:flex;gap:8px;flex-wrap:wrap;">';
    ['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63','#34495e','#e67e22','#f5d76e','#8e44ad'].forEach(function(c){
      var isSel=(cp.nick_color===c);
      h+='<button type="button" onclick="pfVipSet(\'nick_color\',\''+c+'\')" style="width:38px;height:38px;border-radius:50%;border:3px solid '+(isSel?'#333':'transparent')+';background:'+c+';cursor:pointer;padding:0;"></button>';
    });
    h+='</div></div>';

    /* ФОН */
    h+='<div class="pf-card pf-vip-card"><h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">🌌</span> Фон профиля</h3><div class="pf-bg-grid">';
    Object.keys(VIP_BGS).forEach(function(k){
      var bg=VIP_BGS[k];
      var sel=(cp.profile_bg===k||(!cp.profile_bg&&k==='default'));
      h+='<div class="pf-bg-option'+(sel?' selected':'')+'" onclick="pfVipSet(\'profile_bg\',\''+k+'\')">';
      h+='<div class="pf-bg-preview" style="background:'+bg.css+';background-size:cover;background-position:center;"></div>';
      h+='<div class="pf-bg-name">'+bg.name+'</div></div>';
    });
    h+='</div></div>';
  }
  return h;
}

function renderHeat(){var a=getAct();var c=[];var mx=Math.max.apply(null,Object.values(a).concat([1]));for(var i=89;i>=0;i--){var d=new Date(Date.now()-i*86400000);var k=d.toISOString().slice(0,10);var v=a[k]||0;var l=0;if(v>0)l=Math.min(4,Math.ceil((v/mx)*4));c.push('<div class="pf-heat-cell'+(l>0?' l'+l:'')+'" title="'+d.toLocaleDateString('ru-RU')+': '+v+'"></div>');}return c.join('');}
function renderAchGrid(){var f=achF==='all'?ACH:ACH.filter(function(a){return a.c===achF;});var e={};achs.forEach(function(a){e[a.achievement_id]=a;});return f.map(function(a){var er=e[a.id];return '<div class="pf-ach'+(er?'':' locked')+'"><div class="pf-ach-icon">'+(er?a.i:'🔒')+'</div><div><div class="pf-ach-name">'+esc(a.n)+'</div><div class="pf-ach-date">'+(er?(er.earned_at?new Date(er.earned_at).toLocaleDateString('ru-RU'):'Получено'):esc(a.d))+'</div></div></div>';}).join('');}
function fmtChat(m){var t=esc(m.text).replace(/\n/g,'<br>');if(m.links&&m.links.length){t+='<div class="pf-chat-links">';m.links.forEach(function(l){t+='<a class="pf-chat-link" href="/'+escAttr(l.l)+'">📖 '+esc(l.q||'Открыть')+' →</a>';});t+='</div>';}return t;}
function getMD(){var m=['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];var d=[31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];var MD=d.reduce(function(s,x){return s+x;},0);var EY=668.6;var now=new Date();var df=(now-new Date(2026,0,1))/86400000;var yr=Math.floor(3798000000+2740+df/EY);var doy=Math.floor((df*(MD/EY))%MD);var rem=doy,mi=0;for(var i=0;i<d.length;i++){if(rem<d[i]){mi=i;break;}rem-=d[i];}return{year:yr.toLocaleString(),month:m[mi],day:rem+1};}

/* TABS */
function attachTabs(){var w=document.getElementById('pf-tabs');if(!w)return;w.querySelectorAll('.pf-tab').forEach(function(t){t.onclick=function(){pfTab(t.dataset.tab);};});w.addEventListener('wheel',function(e){if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();w.scrollLeft+=e.deltaY*1.2;}},{passive:false});}
window.pfTab=function(id){localStorage.setItem(TAB_KEY,id);document.querySelectorAll('.pf-tab').forEach(function(t){var on=t.dataset.tab===id;t.classList.toggle('active',on);if(on&&t.scrollIntoView)t.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});});document.querySelectorAll('.pf-tab-content').forEach(function(c){c.classList.toggle('active',c.dataset.content===id);});if(id==='security')rend2FA();if(id==='vip')attachPromo();};

function attachPromo(){
  var inp=document.getElementById('vip-promo-in'),btn=document.getElementById('vip-promo-btn'),st=document.getElementById('vip-promo-st');
  if(!inp||!btn)return;
  btn.addEventListener('click',async function(){
    var c=inp.value.trim().toUpperCase();
    if(!c){st.textContent='⚠️ Введите код';st.style.color='#e74c3c';return;}
    st.textContent='⏳ Проверяем...';st.style.color='#999';btn.disabled=true;
    try{
      var sb=window.supabaseClient;var res=await sb.rpc('activate_promo',{p_code:c});
      if(res.error||!res.data||!res.data.ok){st.textContent='❌ '+((res.error&&res.error.message)||(res.data&&res.data.error)||'Ошибка');st.style.color='#e74c3c';}
      else{st.textContent='✅ '+res.data.product;st.style.color='#27ae60';setTimeout(function(){location.reload();},1500);}
    }catch(e){st.textContent='❌ '+e.message;st.style.color='#e74c3c';}
    btn.disabled=false;
  });
  inp.addEventListener('keypress',function(e){if(e.key==='Enter')btn.click();});
}

/* MODALS */
function showM(opts){var bg=document.createElement('div');bg.className='pf-modal-bg';var m=document.createElement('div');m.className='pf-modal';var f='';(opts.fields||[]).forEach(function(x){var v=escAttr(x.value||'');if(x.type==='textarea')f+='<textarea class="pf-modal-input" id="m-'+x.name+'" placeholder="'+escAttr(x.placeholder||'')+'" maxlength="'+(x.max||5000)+'">'+v+'</textarea>';else f+='<input type="'+(x.type||'text')+'" class="pf-modal-input" id="m-'+x.name+'" placeholder="'+escAttr(x.placeholder||'')+'" value="'+v+'" maxlength="'+(x.max||200)+'">';});m.innerHTML='<h3>'+esc(opts.title||'')+'</h3>'+(opts.sub?'<p>'+esc(opts.sub)+'</p>':'')+f+'<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" id="m-c">Отмена</button><button class="pf-btn" id="m-o">'+esc(opts.okText||'Сохранить')+'</button></div>';bg.appendChild(m);document.body.appendChild(bg);function cl(){bg.remove();}bg.addEventListener('click',function(e){if(e.target===bg)cl();});m.querySelector('#m-c').onclick=cl;var fi=m.querySelector('.pf-modal-input');if(fi)setTimeout(function(){fi.focus();if(fi.select)fi.select();},100);m.querySelector('#m-o').onclick=function(){var v={};(opts.fields||[]).forEach(function(x){var el=m.querySelector('#m-'+x.name);v[x.name]=el?el.value.trim():'';});cl();if(opts.onOk)opts.onOk(v);};m.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();m.querySelector('#m-o').click();}if(e.key==='Escape')cl();});}

/* ACTIONS */
window.pfEditName=function(){var c=cp.display_name||cp.username||'';showM({title:'✏️ Новое имя',sub:'2–20 символов',fields:[{name:'name',value:c,placeholder:'Ваше имя',max:20}],onOk:async function(v){if(!v.name||v.name.length<2||v.name.length>20){toast('2–20 символов','error');return;}if(!isClean(v.name)){toast('Недопустимые слова','error');return;}try{await PATCH('profiles?user_id=eq.'+cu.id,{display_name:v.name},cu._token);cp.display_name=v.name;toast('✅','success');writeCache({user:cu.user,profile:cp});setTimeout(render,300);}catch(e){toast('Ошибка: '+e.message,'error');}}});};

window.pfAvPick=function(){var h='<h3>🖼️ Выбрать аватар</h3><p>Нажми чтобы установить</p>';h+='<div style="margin-bottom:16px;"><div style="font-size:.78rem;color:#888;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Новые</div><div class="pf-modal-avatar-grid">';AV_TOP.forEach(function(u){h+='<img src="'+u+'" class="'+(cp.avatar_url===u?'selected':'')+'" onclick="pfSetAvClose(\''+escAttr(u)+'\')" onerror="this.style.display=\'none\'">';});h+='</div></div>';h+='<div style="margin-bottom:16px;"><div style="font-size:.78rem;color:#888;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Классические</div><div class="pf-modal-avatar-grid">';AV_BOTTOM.forEach(function(u){h+='<img src="'+u+'" class="'+(cp.avatar_url===u?'selected':'')+'" onclick="pfSetAvClose(\''+escAttr(u)+'\')" onerror="this.style.display=\'none\'">';});h+='</div></div>';h+='<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" onclick="document.querySelector(\'.pf-modal-bg\').remove()">Закрыть</button></div>';var bg=document.createElement('div');bg.className='pf-modal-bg';var m=document.createElement('div');m.className='pf-modal';m.style.maxWidth='560px';m.innerHTML=h;bg.appendChild(m);document.body.appendChild(bg);bg.addEventListener('click',function(e){if(e.target===bg)bg.remove();});};
window.pfSetAvClose=async function(u){try{await PATCH('profiles?user_id=eq.'+cu.id,{avatar_url:u},cu._token);cp.avatar_url=u;toast('✅','success');writeCache({user:cu.user,profile:cp});var b=document.querySelector('.pf-modal-bg');if(b)b.remove();render();}catch(e){toast('Ошибка: '+e.message,'error');}};
window.pfSetAv=async function(u){if(cp.avatar_url===u)return;try{await PATCH('profiles?user_id=eq.'+cu.id,{avatar_url:u},cu._token);cp.avatar_url=u;toast('✅','success');writeCache({user:cu.user,profile:cp});render();}catch(e){toast('Ошибка: '+e.message,'error');}};
window.pfSetK=async function(n){if(cp.kingdom===n)return;try{await PATCH('profiles?user_id=eq.'+cu.id,{kingdom:n},cu._token);cp.kingdom=n;toast('✅ '+n,'success');writeCache({user:cu.user,profile:cp});render();}catch(e){toast('Ошибка: '+e.message,'error');}};
window.pfEditBio=function(){showM({title:'📝 Биография',sub:'Расскажите о себе',fields:[{name:'bio',type:'textarea',value:cp.bio||'',placeholder:'Пара слов...',max:1000}],onOk:async function(v){if(!isClean(v.bio)){toast('Недопустимые слова','error');return;}try{await PATCH('profiles?user_id=eq.'+cu.id,{bio:v.bio},cu._token);cp.bio=v.bio;var el=document.getElementById('pf-bio');if(el)el.textContent=v.bio||'✍️ Ещё ничего не рассказал о себе.';writeCache({user:cu.user,profile:cp});toast('✅','success');}catch(e){toast('Ошибка: '+e.message,'error');}}});};

window.pfVipSet=async function(f,v){try{var u={};u[f]=v;await PATCH('profiles?user_id=eq.'+cu.id,u,cu._token);cp[f]=v;writeCache({user:cu.user,profile:cp});toast('✅','success');render();}catch(e){toast('Ошибка: '+e.message,'error');}};
window.pfTitle=function(preset){var t=preset||(document.getElementById('vip-title-in')?document.getElementById('vip-title-in').value.trim():'');if(!t){pfVipSet('custom_title',null);return;}if(t.length>30){toast('Макс 30 символов','error');return;}if(!isClean(t)){toast('❌ Недопустимые слова','error');return;}pfVipSet('custom_title',t);};
window.pfEmoji=function(){var e=document.getElementById('vip-emoji-in')?document.getElementById('vip-emoji-in').value.trim():'';pfVipSet('custom_emoji',e||null);};
window.pfUpload=async function(input){var f=input.files[0];if(!f)return;if(f.size>2*1024*1024){toast('Файл > 2 МБ','error');return;}if(!/^image\/(jpeg|png|webp|gif)$/.test(f.type)){toast('Только JPG, PNG, WEBP','error');return;}toast('⏳ Загрузка...','info');try{var ext=f.name.split('.').pop().toLowerCase();var path=cu.id+'/avatar-'+Date.now()+'.'+ext;var sb=window.supabaseClient;var up=await sb.storage.from('avatars').upload(path,f,{upsert:true});if(up.error)throw up.error;var url=sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;await PATCH('profiles?user_id=eq.'+cu.id,{avatar_url:url},cu._token);cp.avatar_url=url;writeCache({user:cu.user,profile:cp});toast('✅','success');render();}catch(e){toast('Ошибка: '+e.message,'error');}};

window.pfNoteQ=function(v){noteQ=v;render();setTimeout(function(){var el=document.querySelector('.pf-notes-search');if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length);}},10);};
window.pfNoteForm=function(id){var n=id?notes.find(function(x){return x.id===id;}):null;showM({title:n?'Редактировать':'Новая заметка',fields:[{name:'title',value:n?(n.title||''):'',placeholder:'Заголовок',max:100},{name:'content',type:'textarea',value:n?(n.content||''):'',placeholder:'Текст...',max:5000}],onOk:async function(v){if(!v.content){toast('Введите текст','error');return;}if(!isClean(v.title)||!isClean(v.content)){toast('Недопустимые слова','error');return;}try{if(id)await PATCH('user_notes?id=eq.'+id,{title:v.title,content:v.content,updated_at:new Date().toISOString()},cu._token);else await POST('user_notes',{user_id:cu.id,title:v.title,content:v.content},cu._token);toast('✅','success');var r=await GET('user_notes?user_id=eq.'+cu.id+'&select=*&order=pinned.desc,updated_at.desc',cu._token);notes=r||[];render();}catch(e){toast('Ошибка: '+e.message,'error');}}});};
window.pfEditNote=function(id){pfNoteForm(id);};
window.pfPinNote=async function(id){var n=notes.find(function(x){return x.id===id;});if(!n)return;try{await PATCH('user_notes?id=eq.'+id,{pinned:!n.pinned},cu._token);var r=await GET('user_notes?user_id=eq.'+cu.id+'&select=*&order=pinned.desc,updated_at.desc',cu._token);notes=r||[];render();}catch(e){toast('Ошибка','error');}};
window.pfDelNote=function(id){showM({title:'Удалить?',sub:'Необратимо',fields:[],okText:'Удалить',onOk:async function(){try{await DEL('user_notes?id=eq.'+id,cu._token);notes=notes.filter(function(n){return n.id!==id;});render();toast('🗑️','info');}catch(e){toast('Ошибка','error');}}});};

window.pfGuest=async function(uid){if(uid===cu.id){pfTab('overview');return;}var bg=document.createElement('div');bg.className='pf-modal-bg';var m=document.createElement('div');m.className='pf-modal';m.style.maxWidth='520px';m.innerHTML='<h3>👤 Профиль</h3><p>Загрузка...</p>';bg.appendChild(m);document.body.appendChild(bg);bg.addEventListener('click',function(e){if(e.target===bg)bg.remove();});try{var p=(await GET('profiles?user_id=eq.'+uid+'&select=*',cu._token))[0];if(!p){m.innerHTML='<h3>Не найден</h3>';return;}var nm=p.display_name||p.username||'Аноним';var a=p.avatar_url||avFallback(nm);var lv=getLvl(p.experience||0);var isV=p.vip_until&&new Date(p.vip_until).getTime()>Date.now();var vCol=p.nick_color||'#6C63FF';var nameH='<h3 style="justify-content:center;font-size:1.4rem;margin:0 0 6px;'+(isV?'background:linear-gradient(90deg,'+vCol+' 0%,#f5d76e 25%,'+vCol+' 50%,#f5d76e 75%,'+vCol+' 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:vipShimmer 8s linear infinite;':'')+'">'+esc(nm)+(isV?' <span class="pf-vip-badge">'+(p.vip_badge||'👑')+'</span>':'')+'</h3>';var frame=VIP_FRAMES[p.avatar_frame];var avH='<img src="'+escAttr(a)+'" style="width:100px;height:100px;aspect-ratio:1/1;border-radius:50%;border:4px solid var(--kc);object-fit:cover;margin-bottom:12px;" onerror="this.onerror=null;this.src=\''+avFallback(nm)+'\';">';if(isV&&frame&&frame.css)avH='<span class="vip-avatar-frame'+(frame.animated?' animated':'')+'" style="background:'+frame.css+';background-size:200% 200%;margin-bottom:12px;display:inline-block;">'+avH+'</span>';var isFr=friends.some(function(f){return f.other.user_id===uid;});m.innerHTML='<div style="text-align:center;padding:12px 0 20px;">'+avH+nameH+(isV&&p.custom_title?'<div class="pf-vip-title" style="margin-bottom:6px;">'+esc(p.custom_title)+'</div>':'')+'<div style="font-size:.85rem;color:#888;">⭐ Ур. '+lv.level+' · 💎 '+(p.experience||0)+' XP</div>'+(p.bio?'<p style="margin:16px 0 0;color:#555;font-size:.9rem;line-height:1.5;font-style:italic;">'+esc(p.bio)+'</p>':'')+'</div><div class="pf-modal-actions">'+(isFr?'<button class="pf-btn pf-btn-danger" onclick="pfRmFriend(\''+escAttr(uid)+'\');document.querySelector(\'.pf-modal-bg\').remove();">Удалить</button>':'<button class="pf-btn" onclick="pfAddFriend(\''+escAttr(uid)+'\');document.querySelector(\'.pf-modal-bg\').remove();">➕ В друзья</button>')+'<button class="pf-btn pf-btn-outline" onclick="document.querySelector(\'.pf-modal-bg\').remove()">Закрыть</button></div>';}catch(e){m.innerHTML='<h3>Ошибка</h3><p>'+esc(e.message)+'</p>';}};

window.pfAddFriend=async function(uid){if(uid===cu.id)return;try{var ex=await GET('friendships?or=(and(user_id.eq.'+cu.id+',friend_id.eq.'+uid+'),and(user_id.eq.'+uid+',friend_id.eq.'+cu.id+'))&select=id',cu._token);if(ex&&ex.length){toast('Заявка уже есть','info');return;}await POST('friendships',{user_id:cu.id,friend_id:uid,status:'pending'},cu._token);toast('✅ Заявка отправлена','success');await loadFr();render();}catch(e){toast('Ошибка','error');}};
window.pfRmFriend=function(uid){showM({title:'Удалить из друзей?',fields:[],okText:'Удалить',onOk:async function(){try{await DEL('friendships?or=(and(user_id.eq.'+cu.id+',friend_id.eq.'+uid+'),and(user_id.eq.'+uid+',friend_id.eq.'+cu.id+'))',cu._token);toast('🗑️','info');await loadFr();render();}catch(e){toast('Ошибка','error');}}});};
window.pfAccFriend=async function(uid){try{await PATCH('friendships?user_id=eq.'+uid+'&friend_id=eq.'+cu.id,{status:'accepted',updated_at:new Date().toISOString()},cu._token);toast('✅','success');await loadFr();render();}catch(e){toast('Ошибка','error');}};
window.pfDeclFriend=async function(uid){try{await DEL('friendships?user_id=eq.'+uid+'&friend_id=eq.'+cu.id,cu._token);toast('Отклонено','info');await loadFr();render();}catch(e){toast('Ошибка','error');}};

window.pfSend=function(){var inp=document.getElementById('pf-chat-in');if(!inp)return;var q=inp.value.trim();if(!q)return;inp.value='';pfAsk(q);};
window.pfAsk=function(q){var c=document.getElementById('pf-chat');if(!c)return;var u=document.createElement('div');u.className='pf-chat-msg user';u.textContent=q;c.appendChild(u);c.scrollTop=c.scrollHeight;chat.push({role:'user',text:q});var t=document.createElement('div');t.className='pf-typing';t.innerHTML='<span></span><span></span><span></span>';c.appendChild(t);c.scrollTop=c.scrollHeight;setTimeout(function(){t.remove();var f=findA(q);var bm=document.createElement('div');bm.className='pf-chat-msg bot';if(f){var txt=f.a;if(f.l){txt+='<div class="pf-chat-links"><a class="pf-chat-link" href="/'+f.l+'">📖 Подробнее →</a></div>';}bm.innerHTML=txt;chat.push({role:'bot',text:f.a,links:[{q:'Подробнее',l:f.l}]});}else{bm.innerHTML='Не нашёл ответа 🤔';chat.push({role:'bot',text:'Не нашёл'});}c.appendChild(bm);c.scrollTop=c.scrollHeight;try{localStorage.setItem(CHAT_HIST,JSON.stringify(chat.slice(-30)));}catch(e){}},600);};

async function rend2FA(){var s=document.getElementById('pf-2fa'),sw=document.getElementById('pf-sw2fa');if(!s)return;try{var r=await GET('user_2fa?user_id=eq.'+cu.id+'&select=*',cu._token);var on=r&&r[0]&&r[0].email_2fa_enabled;if(on){s.innerHTML='<div class="pf-badge-2fa">✅ Включена</div>';if(sw)sw.classList.add('on');}else{s.innerHTML='<div class="pf-badge-2fa off">⚠️ Выключена</div>';if(sw)sw.classList.remove('on');}}catch(e){s.innerHTML='<div class="pf-badge-2fa off">⚠️</div>';}}
window.pfTog2FA=async function(){try{var r=await GET('user_2fa?user_id=eq.'+cu.id+'&select=*',cu._token);var cur=r&&r[0]&&r[0].email_2fa_enabled;var nv=!cur;showM({title:(nv?'Включить':'Выключить')+' 2FA?',fields:[],okText:nv?'Включить':'Выключить',onOk:async function(){try{if(r&&r[0])await PATCH('user_2fa?user_id=eq.'+cu.id,{email_2fa_enabled:nv,updated_at:new Date().toISOString()},cu._token);else await POST('user_2fa',{user_id:cu.id,email_2fa_enabled:nv},cu._token);toast(nv?'✅':'🔓',nv?'success':'info');rend2FA();}catch(e){toast('Ошибка','error');}}});}catch(e){toast('Ошибка','error');}};
window.pfChPass=function(){showM({title:'🔑 Смена пароля',sub:'Ссылка на '+(cu.email||''),fields:[],okText:'Отправить',onOk:async function(){try{var sb=window.supabaseClient;if(sb&&sb.auth)await sb.auth.resetPasswordForEmail(cu.email,{redirectTo:location.origin+'/profile/'});toast('📧 Отправлено','success');}catch(e){toast('Ошибка: '+e.message,'error');}}});};
window.pfQR=function(){if(window.marsLinkDevice&&typeof window.marsLinkDevice.open==='function'){window.marsLinkDevice.open((cu&&cu.email)||'');return;}if(window.marsQrScanner&&window.marsQrScanner.isMobile){window.marsQrScanner.open();return;}toast('QR-модуль не загружен','info');};

window.pfDanger=function(){var h='<h3 style="color:#c0392b;">⚠️ Опасная зона</h3><p>Действия необратимы.</p><div style="display:flex;flex-direction:column;gap:10px;margin:20px 0;"><button class="pf-btn pf-btn-danger" style="width:100%;justify-content:center;" onclick="pfDelAcc()">🗑️ Удалить аккаунт</button><button class="pf-btn pf-btn-outline" style="width:100%;justify-content:center;" onclick="pfLogout()">🚪 Выйти</button></div><div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" onclick="document.querySelector(\'.pf-modal-bg\').remove()">Отмена</button></div>';var bg=document.createElement('div');bg.className='pf-modal-bg';var m=document.createElement('div');m.className='pf-modal';m.innerHTML=h;bg.appendChild(m);document.body.appendChild(bg);bg.addEventListener('click',function(e){if(e.target===bg)bg.remove();});};
window.pfDelAcc=function(){var b=document.querySelector('.pf-modal-bg');if(b)b.remove();showM({title:'⚠️ Удалить аккаунт?',sub:'Введите email:',fields:[{name:'email',type:'email',placeholder:cu.email,max:100}],okText:'Удалить',onOk:async function(v){if(v.email!==cu.email){toast('Не совпадает','error');return;}try{var r=await fetch(SB_URL+'/functions/v1/delete-user',{method:'DELETE',headers:{'Authorization':'Bearer '+cu._token}});var j=await r.json();if(j.error)throw new Error(j.error);pfLogout();}catch(e){toast('Ошибка: '+e.message,'error');}}});};
window.pfLogout=function(){[MY_KEY,SB_STORE,BACKUP,CACHE].forEach(function(k){try{localStorage.removeItem(k);}catch(e){}try{sessionStorage.removeItem(k);}catch(e){}});try{document.cookie=MY_KEY+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';}catch(e){}window.location.href='/';};
window.pfDelGuild=function(){if(!guild)return;showM({title:'Удалить гильдию?',fields:[],okText:'Удалить',onOk:async function(){try{await DEL('guilds?id=eq.'+guild.id,cu._token);toast('🗑️','info');setTimeout(function(){location.reload();},500);}catch(e){toast('Ошибка','error');}}});};

async function loadFr(){try{var r=await GET('friendships?or=(user_id.eq.'+cu.id+',friend_id.eq.'+cu.id+')&select=*',cu._token);if(!r||!r.length){friends=[];reqs=[];return;}var ids={};r.forEach(function(f){ids[f.user_id]=true;ids[f.friend_id]=true;});delete ids[cu.id];var a=Object.keys(ids);if(!a.length){friends=[];reqs=[];return;}var p=await GET('profiles?user_id=in.('+a.join(',')+')&select=user_id,display_name,username,avatar_url',cu._token);var pm={};(p||[]).forEach(function(x){pm[x.user_id]=x;});friends=[];reqs=[];r.forEach(function(f){var oid=f.user_id===cu.id?f.friend_id:f.user_id;var it=Object.assign({},f,{other:Object.assign({user_id:oid},pm[oid]||{})});if(f.status==='accepted')friends.push(it);else if(f.status==='pending'&&f.friend_id===cu.id)reqs.push(it);});}catch(e){friends=[];reqs=[];}}

async function loadAll(sess,silent){
  cu=sess.user;cu._token=sess.access_token;
  var p=await GET('profiles?user_id=eq.'+encodeURIComponent(sess.user.id)+'&select=*',sess.access_token);
  cp=Array.isArray(p)&&p.length?p[0]:null;
  if(!cp){try{var c=await POST('profiles',{user_id:sess.user.id,username:(sess.user.email||'').split('@')[0],display_name:(sess.user.email||'').split('@')[0]},sess.access_token,'return=representation');cp=Array.isArray(c)&&c.length?c[0]:null;}catch(e){throw new Error('Профиль: '+e.message);}}
  writeCache({user:sess.user,profile:cp});
  if(!silent)render();
  try{
    var r=await Promise.all([
      GET('user_achievements?user_id=eq.'+sess.user.id+'&select=achievement_id,earned_at',sess.access_token).catch(function(){return[];}),
      GET('user_notes?user_id=eq.'+sess.user.id+'&select=*&order=pinned.desc,updated_at.desc',sess.access_token).catch(function(){return[];}),
      GET('notifications?user_id=eq.'+sess.user.id+'&select=*&order=created_at.desc&limit=30',sess.access_token).catch(function(){return[];}),
      GET('profiles?select=user_id,username,display_name,experience,level,avatar_url&order=experience.desc&limit=10',sess.access_token).catch(function(){return[];}),
      GET('daily_logins?user_id=eq.'+sess.user.id+'&select=streak&order=login_date.desc&limit=1',sess.access_token).catch(function(){return[];}),
      GET('guild_members?user_id=eq.'+sess.user.id+'&select=guild_id,role',sess.access_token).catch(function(){return[];}),
      GET('user_currency?user_id=eq.'+sess.user.id+'&select=clay_talents',sess.access_token).catch(function(){return[];})
    ]);
    var ua=r[0]||[];notes=r[1]||[];notifs=r[2]||[];leaders=r[3]||[];streak=(r[4]&&r[4][0]&&r[4][0].streak)||0;var gm=r[5]&&r[5][0];currency=(r[6]&&r[6][0]&&r[6][0].clay_talents)||0;
    if(ua.length){achs=ua.map(function(x){var m=ACH.filter(function(a){return a.id===x.achievement_id;})[0]||{};return Object.assign({},m,{achievement_id:x.achievement_id,earned_at:x.earned_at});});}else achs=[];
    if(gm&&gm.guild_id){try{var gr=await GET('guilds?id=eq.'+gm.guild_id+'&select=*',sess.access_token);guild=gr&&gr[0];if(guild){var mr=await GET('guild_members?guild_id=eq.'+guild.id+'&select=user_id,role&limit=50',sess.access_token);gmembers=mr||[];}}catch(e){}}
    await loadFr();
    render();
  }catch(e){console.warn('[bg]',e.message);}
}

function showLogin(){container.innerHTML='<div style="max-width:400px;margin:60px auto;padding:40px 28px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);"><div style="font-size:4rem;margin-bottom:12px;">🔒</div><h2 style="margin:0 0 8px;color:#2c3e50;">Вы не вошли</h2><p style="color:#888;margin:0 0 20px;">Войдите, чтобы просмотреть профиль</p><a href="/login/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">🔐 Войти</a></div>';}

async function init(){
  trackAct();
  var s=readSess();
  if(!s){showLogin();return;}
  var c=readCache(5*60*1000);
  if(c&&c.profile&&c.user&&c.user.id===s.user.id){cu=s.user;cu._token=s.access_token;cp=c.profile;render();loadAll(s,true).catch(function(e){console.warn(e.message);});return;}
  try{await loadAll(s,false);}catch(e){toast('Ошибка: '+e.message,'error');}
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
</script>

<script>
setTimeout(function(){if(typeof window.refreshAuthButton==='function')window.refreshAuthButton();},800);
</script>
