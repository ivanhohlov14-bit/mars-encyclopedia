---
title: Профиль
comments: false
---

<div id="profile-app">
    <div style="text-align:center;padding:60px 20px;">
        <div style="display:inline-block;width:48px;height:48px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:pfSpin .8s linear infinite;"></div>
        <p style="color:#999;margin-top:16px;font-size:.9rem;">Загрузка профиля...</p>
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
@keyframes pfRing{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes pfSparkle{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}
@keyframes pfWave{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes pfCoin{0%{transform:rotateY(0)}100%{transform:rotateY(360deg)}}
@keyframes pfTyping{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}

#profile-app{max-width:1100px;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px}
#profile-app a{text-decoration:none!important;border-bottom:none!important}
.pf-fade{animation:pfFadeIn .5s cubic-bezier(.16,1,.3,1) both}

/* HERO */
.pf-hero{position:relative;background:linear-gradient(135deg,#1a1a2e 0%,#2d1b3d 40%,#4a2a3a 100%);border-radius:24px;padding:44px 40px;color:#fff;margin-bottom:20px;overflow:hidden;box-shadow:0 20px 60px -12px rgba(0,0,0,.4)}
.pf-hero::before{content:'';position:absolute;top:-60%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,var(--ks),transparent 70%);border-radius:50%;animation:pfFloat 8s ease-in-out infinite}
.pf-hero::after{content:'';position:absolute;bottom:-60%;left:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(231,76,60,.15),transparent 70%);border-radius:50%;animation:pfFloat 10s ease-in-out infinite reverse}
.pf-hero-content{position:relative;z-index:2;display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.pf-avatar-wrap{position:relative;flex-shrink:0;cursor:pointer;transition:transform .3s}
.pf-avatar-wrap:hover{transform:scale(1.03)}
.pf-avatar-ring{position:absolute;inset:-8px;border:2px dashed var(--kl);border-radius:50%;animation:pfRing 18s linear infinite;opacity:.5}
.pf-avatar{width:120px;height:120px;border-radius:50%;border:4px solid rgba(255,255,255,.4);object-fit:cover;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.2);position:relative;z-index:1;transition:transform .35s}
.pf-avatar-badge{position:absolute;bottom:2px;right:2px;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.95rem;border:3px solid rgba(255,255,255,.9);box-shadow:0 4px 12px rgba(108,99,255,.5);z-index:3}
.pf-role-badge{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:var(--kc);padding:5px 16px;border-radius:20px;font-size:.72rem;font-weight:800;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.15);border:2px solid rgba(255,255,255,.5);z-index:2}
.pf-info{flex:1;min-width:200px}
.pf-name{font-size:2rem;font-weight:800;margin:0 0 8px 0;color:#fff;display:flex;align-items:center;gap:10px;flex-wrap:wrap;letter-spacing:-.5px;cursor:pointer;transition:all .25s}
.pf-name:hover{text-shadow:0 0 20px rgba(255,255,255,.5)}
.pf-name-edit{font-size:.85rem;opacity:.55;margin-left:2px}
.pf-mod-badge{background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;padding:4px 12px;border-radius:20px;font-size:.7rem;font-weight:800;letter-spacing:.4px;text-transform:uppercase;box-shadow:0 4px 14px rgba(231,76,60,.5);border:1px solid rgba(255,255,255,.3)}
.pf-kingdom-badge{background:rgba(255,255,255,.22);backdrop-filter:blur(8px);color:#fff;padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.35);cursor:pointer;transition:all .25s}
.pf-kingdom-badge img{width:18px;height:auto;border-radius:2px;display:block}
.pf-kingdom-badge:hover{background:rgba(255,255,255,.32);transform:translateY(-2px)}
.pf-email{font-size:.9rem;opacity:.85;margin:0 0 14px 0}
.pf-currency{display:inline-flex;align-items:center;gap:6px;background:rgba(243,156,18,.15);border:1px solid rgba(243,156,18,.4);padding:5px 12px;border-radius:20px;font-size:.85rem;font-weight:700;color:#f39c12;margin-top:6px}
.pf-currency-icon{display:inline-block;animation:pfCoin 3s linear infinite;font-size:1.1rem}

/* HELP TOOLTIP */
.pf-help{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:rgba(108,99,255,.18);color:#6C63FF;font-size:.72rem;font-weight:800;cursor:help;margin-left:4px;position:relative;font-family:sans-serif;vertical-align:middle;flex-shrink:0;transition:all .2s}
.pf-help:hover{background:#6C63FF;color:#fff;transform:scale(1.1)}
.pf-help::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) translateY(4px);background:#1a1a2e;color:#fff;padding:10px 14px;border-radius:10px;font-size:.75rem;font-weight:400;white-space:normal;width:220px;text-align:center;opacity:0;pointer-events:none;transition:all .25s cubic-bezier(.16,1,.3,1);z-index:9999;box-shadow:0 12px 32px rgba(0,0,0,.5);line-height:1.5}
.pf-help::before{content:'';position:absolute;bottom:calc(100% + 4px);left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#1a1a2e;opacity:0;transition:opacity .25s;z-index:9999}
.pf-help:hover::after{opacity:1;transform:translateX(-50%) translateY(0)}
.pf-help:hover::before{opacity:1}

/* МОЯ СТРАНИЧКА */
.pf-mypage{background:linear-gradient(135deg,#fff 0%,#fafbfd 100%);border-radius:22px;border:1px solid rgba(0,0,0,.06);padding:26px 28px;margin-bottom:18px;box-shadow:0 4px 20px rgba(0,0,0,.05);animation:pfFadeIn .5s both;position:relative;overflow:hidden}
.pf-mypage::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--kc),var(--kl),var(--kc));background-size:200% auto;animation:pfShine 3s linear infinite}
.pf-mypage-header{margin-bottom:20px}
.pf-mypage-title{font-size:1.2rem;font-weight:800;color:#1a1a1a;margin:0 0 2px 0;letter-spacing:-.3px}
.pf-mypage-sub{font-size:.82rem;color:#888;margin:0}
.pf-mypage-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:18px}
.pf-mypage-tile{background:linear-gradient(135deg,var(--kb),#fff);border:1px solid rgba(108,99,255,.15);border-radius:14px;padding:14px 16px;transition:all .3s cubic-bezier(.16,1,.3,1);cursor:pointer}
.pf-mypage-tile:hover{transform:translateY(-3px);box-shadow:0 12px 28px -8px var(--ks);border-color:var(--kc)}
.pf-mypage-tile-label{font-size:.68rem;color:#888;text-transform:uppercase;letter-spacing:.8px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:3px}
.pf-mypage-tile-value{font-size:1.4rem;font-weight:900;color:var(--kc);letter-spacing:-.5px;line-height:1.1}
.pf-mypage-tile-sub{font-size:.7rem;color:#aaa;margin-top:2px}
.pf-mypage-actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px}
.pf-mypage-action{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#fff;border:1.5px solid rgba(0,0,0,.06);border-radius:12px;color:#333;cursor:pointer;font-family:inherit;font-size:.85rem;font-weight:700;transition:all .25s cubic-bezier(.16,1,.3,1)}
.pf-mypage-action:hover{transform:translateY(-2px);border-color:var(--kc);box-shadow:0 8px 20px -6px var(--ks);color:var(--kc)}
.pf-mypage-action-icon{font-size:1.2rem;flex-shrink:0}

/* NEXT ACH */
.pf-next-ach{background:linear-gradient(135deg,#fff8e1,#fffbf0);border:2px solid rgba(243,156,18,.3);border-radius:16px;padding:16px 18px;margin-bottom:18px;display:flex;align-items:center;gap:14px;animation:pfFadeIn .5s both}
.pf-next-ach-icon{font-size:2.4rem;flex-shrink:0;animation:pfWave 2s ease-in-out infinite}
.pf-next-ach-info{flex:1;min-width:0}
.pf-next-ach-label{font-size:.7rem;color:#a08040;text-transform:uppercase;letter-spacing:.8px;font-weight:700;margin-bottom:2px}
.pf-next-ach-name{font-size:1rem;font-weight:800;color:#1a1a1a;margin-bottom:4px}
.pf-next-ach-desc{font-size:.8rem;color:#666}

/* QUICK GRID */
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
.pf-tabs{display:flex;gap:4px;margin-bottom:20px;overflow-x:auto;padding:6px;background:rgba(255,255,255,.9);border-radius:16px;border:1px solid rgba(0,0,0,.05);cursor:grab;-webkit-overflow-scrolling:touch;scrollbar-width:none;scroll-behavior:smooth}
.pf-tabs::-webkit-scrollbar{display:none}
.pf-tabs.dragging{cursor:grabbing}
.pf-tab{flex-shrink:0;padding:10px 16px;border:none;background:transparent;color:#666;font-size:.85rem;font-weight:700;border-radius:12px;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:6px;font-family:inherit;position:relative;user-select:none}
.pf-tab:hover{background:rgba(0,0,0,.04);color:#333}
.pf-tab.active{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;box-shadow:0 6px 16px -4px var(--ks)}
.pf-tab-count{background:rgba(255,255,255,.25);padding:1px 7px;border-radius:10px;font-size:.7rem}
.pf-tab.active .pf-tab-count{background:rgba(255,255,255,.3)}
.pf-tab.mod-tab{color:#e74c3c}
.pf-tab.mod-tab.active{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.pf-tab-content{display:none;animation:pfFadeIn .4s ease}
.pf-tab-content.active{display:block}

/* CARDS */
.pf-card{background:#fff;border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:22px 26px;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:box-shadow .3s,transform .3s}
.pf-card:hover{box-shadow:0 12px 32px -8px var(--ks);transform:translateY(-2px)}
.pf-card-title{font-size:1.1rem;font-weight:800;color:#1a1a1a;margin:0 0 16px 0;display:flex;align-items:center;gap:10px}
.pf-ct-icon{font-size:1.4rem}
.pf-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:30px;border:2px solid var(--kc);background:var(--kc);color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;transition:all .25s;font-family:inherit}
.pf-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--ks)}
.pf-btn-outline{background:transparent;color:var(--kc)}
.pf-btn-outline:hover{background:var(--kc);color:#fff}
.pf-btn-danger{background:#e74c3c;border-color:#e74c3c}
.pf-btn-danger:hover{background:#c0392b;border-color:#c0392b}
.pf-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}

/* ACHIEVEMENTS */
.pf-ach-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.pf-ach-filter{padding:6px 14px;border-radius:20px;border:1.5px solid rgba(108,99,255,.25);background:#fff;color:#666;font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s}
.pf-ach-filter:hover{border-color:var(--kc);color:var(--kc)}
.pf-ach-filter.active{background:var(--kc);border-color:var(--kc);color:#fff}
.pf-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.pf-ach{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f8f9fb;border-radius:12px;border:2px solid transparent;transition:all .25s}
.pf-ach:hover{transform:translateY(-3px);border-color:var(--kc);box-shadow:0 12px 28px -8px var(--ks)}
.pf-ach.locked{opacity:.45;filter:grayscale(.6)}
.pf-ach-icon{font-size:1.8rem;transition:transform .3s;flex-shrink:0}
.pf-ach-name{font-size:.85rem;font-weight:700;color:#1a1a1a}
.pf-ach-date{font-size:.7rem;color:#888}

/* FRIENDS */
.pf-friend{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;transition:all .25s;align-items:center;animation:pfSlideUp .3s ease both}
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
.pf-leaderboard tbody tr.pf-me:hover{background:var(--kc)}
.pf-lb-avatar{width:32px;height:32px;border-radius:50%;vertical-align:middle;margin-right:8px;border:2px solid var(--kc);object-fit:cover}
.pf-lb-guild{font-size:.7rem;color:#6C63FF;background:rgba(108,99,255,.1);padding:2px 8px;border-radius:10px;margin-left:6px;display:inline-block}

/* AI CHAT */
.pf-chat-wrap{display:flex;flex-direction:column;gap:12px}
.pf-chat{background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.6));border-radius:16px;padding:16px;max-height:460px;overflow-y:auto;border:1px solid rgba(0,0,0,.05)}
.pf-chat-msg{margin:6px 0;padding:11px 16px;border-radius:16px;max-width:82%;word-wrap:break-word;font-size:.9rem;line-height:1.55;animation:pfSlideUp .3s ease both}
.pf-chat-msg.user{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;margin-left:auto;border-bottom-right-radius:4px}
.pf-chat-msg.bot{background:#fff;color:#333;margin-right:auto;border-bottom-left-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.08)}
.pf-chat-msg.bot a{color:var(--kc);text-decoration:underline!important}
.pf-chat-links{margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08);display:flex;flex-direction:column;gap:6px}
.pf-chat-link{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(108,99,255,.08);border-radius:10px;color:var(--kc);font-size:.82rem;font-weight:700;transition:all .2s;cursor:pointer;text-align:left}
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

/* SETTINGS */
.pf-avatar-grid{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin:16px 0}
.pf-avatar-option{width:72px;height:72px;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s}
.pf-avatar-option:hover{transform:scale(1.1);border-color:var(--kc)}
.pf-avatar-option.selected{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}
.pf-kingdom-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}
.pf-kingdom-btn{padding:10px 12px;border-radius:12px;border:2px solid rgba(0,0,0,.08);background:#fff;cursor:pointer;font-size:.82rem;font-weight:600;transition:all .25s;font-family:inherit;color:#333;display:flex;align-items:center;gap:8px;justify-content:center}
.pf-kingdom-btn img{width:24px;height:auto;border-radius:3px;flex-shrink:0}
.pf-kingdom-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.1);border-color:var(--kc)}
.pf-kingdom-btn.selected{color:#fff;box-shadow:0 6px 16px -4px var(--ks);border-color:transparent}

/* MODAL */
.pf-modal-bg{position:fixed;inset:0;background:rgba(10,10,26,.65);backdrop-filter:blur(8px);z-index:999998;display:flex;align-items:center;justify-content:center;padding:20px;animation:pfFadeIn .25s ease;overflow-y:auto}
.pf-modal{background:#fff;border-radius:20px;padding:28px;max-width:480px;width:100%;box-shadow:0 24px 70px -12px rgba(0,0,0,.5);animation:pfSlideUp .35s cubic-bezier(.16,1,.3,1);margin:auto}
.pf-modal h3{margin:0 0 8px 0;font-size:1.2rem;color:#1a1a2e;display:flex;align-items:center;gap:8px}
.pf-modal p{margin:0 0 18px 0;color:#666;font-size:.88rem;line-height:1.5}
.pf-modal-input{width:100%;padding:12px 16px;border-radius:12px;border:2px solid #e8eaf0;font-size:.95rem;font-family:inherit;outline:none;background:#fafafa;margin-bottom:12px;box-sizing:border-box;transition:all .25s}
.pf-modal-input:focus{border-color:var(--kc);background:#fff;box-shadow:0 0 0 4px var(--ks)}
.pf-modal textarea.pf-modal-input{min-height:100px;resize:vertical}
.pf-modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:8px}

/* TOAST */
.pf-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(120px);padding:12px 26px;border-radius:30px;font-weight:700;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:999999;transition:transform .4s cubic-bezier(.16,1,.3,1);color:#fff;max-width:90vw}
.pf-toast.show{transform:translateX(-50%) translateY(0)}
.pf-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.pf-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.pf-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}

.pf-skel{background:linear-gradient(90deg,#f0f0f4 25%,#f8f8fc 50%,#f0f0f4 75%);background-size:200% 100%;animation:pfShine 1.5s ease-in-out infinite;border-radius:14px;margin-bottom:16px}

/* DARK THEME */
body.mars-stars-on .pf-mypage,
body.mars-stars-on .pf-card,
body.mars-stars-on .pf-quick-card,
body.mars-stars-on .pf-ach,
body.mars-stars-on .pf-friend,
body.mars-stars-on .pf-tabs,
body.mars-stars-on .pf-modal{background:#14142a;border-color:rgba(108,99,255,.3);color:#e0e0f0}
body.mars-stars-on .pf-mypage-title,
body.mars-stars-on .pf-card-title,
body.mars-stars-on .pf-quick-title,
body.mars-stars-on .pf-ach-name,
body.mars-stars-on .pf-friend-name{color:#e0e0f0}
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

/* MOBILE */
@media(max-width:600px){
    .pf-hero{padding:28px 22px}
    .pf-avatar{width:90px;height:90px}
    .pf-avatar-badge{width:28px;height:28px;font-size:.85rem}
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
    .pf-next-ach{flex-direction:column;text-align:center}
    .pf-chat-msg{max-width:92%}
    .pf-leaderboard th:nth-child(4),
    .pf-leaderboard td:nth-child(4){display:none}
}
@media (prefers-reduced-motion: reduce){
    *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
</style>

<script>
(function(){
'use strict';

/* ═══════════════════════════════════════════════════════════
   КОНФИГ
   ═══════════════════════════════════════════════════════════ */
var SUPABASE_URL='https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY='sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var PROJECT_REF='ncytbgbzfjfoqmmgfygz';
var SB_KEY='sb-'+PROJECT_REF+'-auth-token';
var MY_KEY='mars-auth-v1';
var BACKUP_KEY='mars-auth-backup';
var PROFILE_CACHE_KEY='mars-profile-cache-v2';
var ACTIVITY_KEY='mars-activity-v1';
var XP_HISTORY_KEY='mars-xp-history';
var CHAT_KEY='mars-ai-chat-history';
var ACTIVE_TAB_KEY='mars-profile-active-tab';
var ACH_FILTER_KEY='mars-ach-filter';

var container=document.getElementById('profile-app');
if(!container)return;

/* ═══════════════════════════════════════════════════════════
   ФЛАГИ КОРОЛЕВСТВ
   ═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   ДОЛЖНОСТИ
   ═══════════════════════════════════════════════════════════ */
var ROLES=[
{lvl:1,name:'🌱 Поселенец'},{lvl:6,name:'🔭 Исследователь'},{lvl:11,name:'🚀 Первопроходец'},
{lvl:16,name:'🏠 Колонизатор'},{lvl:21,name:'⚡ Командир'},{lvl:31,name:'🛡️ Хранитель Марса'},
{lvl:41,name:'🏛️ Сенатор'},{lvl:51,name:'⚔️ Мастер'},{lvl:61,name:'💎 Лорд'},
{lvl:71,name:'🔥 Феникс'},{lvl:81,name:'🌟 Легенда'},{lvl:91,name:'👑 Полубог'},{lvl:100,name:'🐉 Бессмертный'}
];
function getRole(level){
    var r=ROLES[0];
    for(var i=0;i<ROLES.length;i++)if(level>=ROLES[i].lvl)r=ROLES[i];
    return r.name;
}

/* ═══════════════════════════════════════════════════════════
   100+ ДОСТИЖЕНИЙ
   ═══════════════════════════════════════════════════════════ */
var ALL_ACHIEVEMENTS=[
// Старт
{id:1,n:'Первый шаг',i:'👣',d:'Зарегистрироваться',c:'start'},
{id:2,n:'Марсианин',i:'🔴',d:'Выбрать королевство',c:'start'},
{id:3,n:'Аватар',i:'🎨',d:'Установить аватарку',c:'start'},
{id:4,n:'Биография',i:'📝',d:'Заполнить о себе',c:'start'},
{id:5,n:'Именованный',i:'✍️',d:'Сменить имя',c:'start'},
// Чтение
{id:10,n:'Читатель',i:'📖',d:'5 статей',c:'read'},
{id:11,n:'Эрудит',i:'🎓',d:'25 статей',c:'read'},
{id:12,n:'Учёный',i:'🔬',d:'50 статей',c:'read'},
{id:13,n:'Хранитель',i:'📚',d:'100 статей',c:'read'},
{id:14,n:'Библиотекарь',i:'📔',d:'200 статей',c:'read'},
{id:15,n:'Архивариус',i:'🗂️',d:'300 статей',c:'read'},
{id:16,n:'Ночной читатель',i:'🌙',d:'Прочитать статью после 23:00',c:'read'},
{id:17,n:'Ранняя пташка',i:'🌅',d:'Прочитать статью до 7:00',c:'read'},
{id:18,n:'Глубокое чтение',i:'🤿',d:'Дочитать до конца 10 статей',c:'read'},
{id:19,n:'Искатель',i:'🔍',d:'Использовать поиск',c:'read'},
// Достижения за XP
{id:20,n:'Первые 10',i:'⚡',d:'10 XP',c:'xp'},
{id:21,n:'Сотка',i:'💯',d:'100 XP',c:'xp'},
{id:22,n:'Пятисотка',i:'🔥',d:'500 XP',c:'xp'},
{id:23,n:'Тысячник',i:'🏆',d:'1000 XP',c:'xp'},
{id:24,n:'Пять тысяч',i:'💎',d:'5000 XP',c:'xp'},
{id:25,n:'Десятка',i:'🎯',d:'10000 XP',c:'xp'},
{id:26,n:'Пятидесятка',i:'👑',d:'50000 XP',c:'xp'},
{id:27,n:'Стотысячник',i:'🌟',d:'100000 XP',c:'xp'},
// Уровни
{id:30,n:'Уровень 5',i:'⑤',d:'Достичь 5 уровня',c:'lvl'},
{id:31,n:'Уровень 10',i:'⑩',d:'Достичь 10 уровня',c:'lvl'},
{id:32,n:'Уровень 20',i:'⑳',d:'Достичь 20 уровня',c:'lvl'},
{id:33,n:'Уровень 30',i:'③',d:'Достичь 30 уровня',c:'lvl'},
{id:34,n:'Уровень 50',i:'⑤',d:'Достичь 50 уровня',c:'lvl'},
{id:35,n:'Уровень 75',i:'⑦',d:'Достичь 75 уровня',c:'lvl'},
{id:36,n:'Уровень 100',i:'💯',d:'Достичь 100 уровня',c:'lvl'},
// Серия
{id:40,n:'Неделя',i:'🔥',d:'7 дней подряд',c:'streak'},
{id:41,n:'Две недели',i:'🔥',d:'14 дней подряд',c:'streak'},
{id:42,n:'Месяц',i:'💪',d:'30 дней подряд',c:'streak'},
{id:43,n:'Сто дней',i:'⚡',d:'100 дней подряд',c:'streak'},
{id:44,n:'Полгода',i:'🏅',d:'180 дней подряд',c:'streak'},
{id:45,n:'Год',i:'🏆',d:'365 дней подряд',c:'streak'},
// Друзья
{id:50,n:'Первый друг',i:'👥',d:'Добавить друга',c:'social'},
{id:51,n:'Компания',i:'👨‍👩‍👧',d:'5 друзей',c:'social'},
{id:52,n:'Круг общения',i:'🫂',d:'10 друзей',c:'social'},
{id:53,n:'Популярный',i:'⭐',d:'25 друзей',c:'social'},
{id:54,n:'Социальный',i:'💫',d:'50 друзей',c:'social'},
{id:55,n:'Легенда общения',i:'🌟',d:'100 друзей',c:'social'},
// Гильдии
{id:60,n:'Новичок гильдии',i:'🏰',d:'Вступить в гильдию',c:'guild'},
{id:61,n:'Основатель',i:'👑',d:'Создать гильдию',c:'guild'},
{id:62,n:'Участник',i:'🛡️',d:'5 участников в гильдии',c:'guild'},
{id:63,n:'Командир',i:'⚔️',d:'10 участников',c:'guild'},
{id:64,n:'Мастер гильдии',i:'🏛️',d:'25 участников',c:'guild'},
{id:65,n:'Правитель',i:'👑',d:'50 участников',c:'guild'},
// Валюта
{id:70,n:'Первый талант',i:'🪙',d:'Заработать 1 талант',c:'currency'},
{id:71,n:'Сто талантов',i:'💰',d:'100 талантов',c:'currency'},
{id:72,n:'Богач',i:'💎',d:'1000 талантов',c:'currency'},
{id:73,n:'Магнат',i:'👑',d:'10000 талантов',c:'currency'},
// Королевства
{id:80,n:'Эдемец',i:'🌅',d:'Выбрать Эдем',c:'kingdom'},
{id:81,n:'Аркадец',i:'🏛️',d:'Выбрать Аркадию',c:'kingdom'},
{id:82,n:'Кимер',i:'🔮',d:'Выбрать Кимерию',c:'kingdom'},
{id:83,n:'Серпентид',i:'🐍',d:'Выбрать Серпентиду',c:'kingdom'},
{id:84,n:'Утопиец',i:'🌌',d:'Выбрать Утопию',c:'kingdom'},
{id:85,n:'Пират',i:'⚓',d:'Выбрать Ксанф',c:'kingdom'},
{id:86,n:'Странник',i:'🧭',d:'Сменить королевство',c:'kingdom'},
{id:87,n:'Мореход',i:'⛵',d:'Посетить все моря',c:'kingdom'},
// Особые
{id:90,n:'Ночной страж',i:'🌙',d:'Заходить 7 ночей',c:'special'},
{id:91,n:'Трудоголик',i:'⚙️',d:'Онлайн 10 часов',c:'special'},
{id:92,n:'Марафонец',i:'🏃',d:'Онлайн 50 часов',c:'special'},
{id:93,n:'Легенда сайта',i:'🌟',d:'Онлайн 100 часов',c:'special'},
{id:94,n:'Комментатор',i:'💬',d:'Первый комментарий',c:'special'},
{id:95,n:'Оратор',i:'🗣️',d:'50 комментариев',c:'special'},
{id:96,n:'Летописец',i:'📜',d:'100 комментариев',c:'special'},
{id:97,n:'Кузнец слов',i:'⚒️',d:'10 заметок',c:'special'},
{id:98,n:'Заметочник',i:'📔',d:'50 заметок',c:'special'},
{id:99,n:'Архивист',i:'🗄️',d:'100 заметок',c:'special'},
{id:100,n:'Библиофил',i:'📚',d:'50 закладок',c:'special'},
{id:101,n:'Коллекционер',i:'🎁',d:'Все закладки разных типов',c:'special'},
{id:102,n:'Модератор',i:'🛡️',d:'Стать модератором',c:'special'},
{id:103,n:'Легенда Марса',i:'🔴',d:'Выполнить все базовые достижения',c:'special'},
{id:104,n:'Исследователь',i:'🧭',d:'10 разных статей за день',c:'special'},
{id:105,n:'Квестер',i:'🗺️',d:'Пройти 10 квестов',c:'special'},
{id:106,n:'Игрок',i:'🎮',d:'Сыграть в 5 игр',c:'special'},
{id:107,n:'Дуэлянт',i:'⚔️',d:'Победить в 10 дуэлях',c:'special'},
{id:108,n:'Астроном',i:'🔭',d:'10 наблюдений за небом',c:'special'},
{id:109,n:'Провидец',i:'🔮',d:'10 гороскопов',c:'special'},
{id:110,n:'Оракул',i:'🧿',d:'100 гороскопов',c:'special'},
{id:111,n:'Ботаник',i:'🌿',d:'Изучить 10 растений',c:'special'},
{id:112,n:'Геолог',i:'⛰️',d:'Изучить 10 минералов',c:'special'},
{id:113,n:'Химик',i:'⚗️',d:'10 химических статей',c:'special'},
{id:114,n:'Биолог',i:'🧬',d:'20 биологических статей',c:'special'},
{id:115,n:'Астрофизик',i:'🌌',d:'20 астрономических статей',c:'special'}
];

/* ═══════════════════════════════════════════════════════════
   ИНТЕРАКТИВ БЛОКИ
   ═══════════════════════════════════════════════════════════ */
var INTERACTIVE_BLOCKS=[
{href:'/interactive/exodus/',icon:'🚀',title:'К Исходу',desc:'Интерактивная история'},
{href:'/globe-map/',icon:'🌍',title:'Карта Марса',desc:'3D-глобус'},
{href:'/game/',icon:'👑',title:'Марсианская империя',desc:'Стратегия'},
{href:'/scan-dates/',icon:'🔍',title:'Сканер дат',desc:'Проверка даты'},
{href:'/weather/',icon:'🌡️',title:'Погода на Марсе',desc:'Прогноз'},
{href:'/museum/',icon:'🏛️',title:'Музей',desc:'Виртуальный'},
{href:'/duel/',icon:'⚔️',title:'Дуэль',desc:'Сражения'},
{href:'/scene-generator/',icon:'🎬',title:'Генератор сцен',desc:'Создай сцену'},
{href:'/sky/',icon:'🌠',title:'Небо Марса',desc:'Симулятор'},
{href:'/guilds/',icon:'🏰',title:'Гильдии',desc:'Объединения'},
{href:'/names/',icon:'🔤',title:'Марсианское имя',desc:'Генератор'},
{href:'/forum/',icon:'💬',title:'Форум',desc:'Общение'},
{href:'/scrolls/',icon:'📜',title:'Свитки Хевсура',desc:'Летописи'},
{href:'/horoscope/',icon:'🔮',title:'Гороскоп',desc:'Предсказания'},
{href:'/top/',icon:'🏆',title:'Топ статей',desc:'Рейтинг'},
{href:'/quests/',icon:'🗺️',title:'Квесты',desc:'Задания'},
{href:'/feed/',icon:'📰',title:'Лента активности',desc:'События'},
{href:'/achievements/',icon:'🎁',title:'Достижения',desc:'Награды'},
{href:'/bookmarks/',icon:'📚',title:'Мои закладки',desc:'Сохранённое'},
{href:'/quest-map/',icon:'🗺️',title:'Квест-карта',desc:'Карта заданий'},
{href:'/interactive/',icon:'🎮',title:'Интерактив',desc:'Все игры'}
];

/* ═══════════════════════════════════════════════════════════
   БАЗА ЗНАНИЙ БОТА (50+ Q&A)
   ═══════════════════════════════════════════════════════════ */
var KNOWLEDGE_BASE=[
// КОРОЛЕВСТВА (12)
{id:'kimeria',k:['кимерия','кимери','кимер'],q:'Что такое Кимерия?',a:'Кимерия — северное королевство Марса, известное своими глиняными табличками и фиолетовым пламенем. 🏰 Столица — Окхасен. Здесь живёт древнейшая традиция летописания, а символ королевства — глина, помнящая всё.',l:'geography/kimeria/',r:['История Кимерии','Академия Окхасена','Хевсур']},
{id:'arkadia',k:['аркадия','аркади','аркад'],q:'Что такое Аркадия?',a:'Аркадия — королевство Держателей Ветра. 🏛️ Известна своими мудрецами и традицией сохранять знания. Земли Аркадии богаты редкими минералами.',l:'geography/arkadia/',r:['История Аркадии','Держатели ветра','Академия Окхасена']},
{id:'eden',k:['эдем','эдема'],q:'Что такое Эдем?',a:'Эдем — королевство с золотыми песками и легендарной историей. 🌅 Его правители — одни из старейших династий Марса. Здесь находился первый храм Кхо.',l:'geography/eden/',r:['История Эдема','Короли Эдема','Храм Кхо']},
{id:'ksanf',k:['ксанф','ксанфа','пират'],q:'Что такое Ксанф?',a:'Ксанф — пиратское королевство Марса. ⚓ Здесь правит Совет Пиратских Королей. Река Ксанф — главная торговая артерия континента.',l:'history/pirate-kingdom/',r:['Река Ксанф','Пиратские короли','История Эритрея']},
{id:'eridania',k:['эридания','эридан'],q:'Что такое Эридания?',a:'Эридания — королевство с холодным климатом. ✨ Известна своими кристаллами и астрономами. Здесь родился великий Талин.',l:'geography/eridania/',r:['История Эридании','Талин','Марсианский календарь']},
{id:'khong',k:['кхонг','кхонга'],q:'Что такое Кхонг?',a:'Кхонг — суровое королевство воинов. 🗡️ Здесь ценятся сила и честь. Мастера Кхонга — одни из лучших кузнецов Марса.',l:'geography/khong/',r:['История Кхонга','Мастера Кхонга','Гемоцианин']},
{id:'avsonia',k:['авсония','авсон'],q:'Что такое Авсония?',a:'Авсония — морское королевство. 🌊 Известна своими мореходами и торговлей. Столица — порт на Ацидалийском море.',l:'geography/avsonia/',r:['История Авсонии','Ацидалийское море','Мореходы']},
{id:'serpentida',k:['серпентида','серпент'],q:'Что такое Серпентида?',a:'Серпентида — королевство змей. 🐍 Здесь живёт культ Ксанфа-чудовища. Известна своими ядами и алхимиками.',l:'geography/serpentida/',r:['История Серпентиды','Короли Серпентиды','Ксанф-чудовище']},
{id:'eritrea',k:['эритрея','эритрейск'],q:'Что такое Эритрея?',a:'Эритрея — островное королевство в Эритрейском море. 💧 Центр торговли и дипломатии. Здесь пересекаются все торговые пути Марса.',l:'geography/eritrea/',r:['История Эритрея','Эритрейское море','Остров Эритрея']},
{id:'utopia',k:['утопия','утопи'],q:'Что такое Утопия?',a:'Утопия — королевство мечтателей и изобретателей. 🌌 Здесь развиты технологии и наука. Адмиралы Утопии — лучшие в мире.',l:'geography/utopia/',r:['История Утопии','Адмиралы Утопии','Олимп']},
{id:'hellas',k:['эллада','эллад'],q:'Что такое Эллада?',a:'Эллада — древнее королевство Марса. ⚡ Одна из старейших цивилизаций. Здесь находится Море Эллада и руины первой столицы.',l:'history/hellas/',r:['История Эллады','Море Эллада','Правители Эллады']},
{id:'alivasoto',k:['аливасото','аливасот'],q:'Что такое Аливасото?',a:'Аливасото — королевство лесов. 🌿 Единственное место на Марсе, где сохранилась древняя флора. Здесь живут Silica flora — кремниевые растения.',l:'geography/alivasoto/',r:['История Аливасото','Silica flora','Tatīnidae']},

// ПЕРСОНАЖИ (10)
{id:'hevsur',k:['хевсур','летописец','свиток'],q:'Кто такой Хевсур?',a:'Хевсур — легендарный летописец Кимерии, автор «Свитков Хевсура». 📜 Он записал историю Эпохи Умирания и предсказал Исход.',l:'people/hevsur/',r:['Свитки Хевсура','История Кимерии','Эпоха Умирания']},
{id:'talin',k:['талин','астроном'],q:'Кто такой Талин?',a:'Талин — великий астроном Марса. 🔭 Он составил марсианский календарь и открыл орбиты Фобоса и Деймоса.',l:'people/talin/',r:['Марсианский календарь','Фобос','Деймос']},
{id:'ella',k:['элла','биолог'],q:'Кто такая Элла?',a:'Элла — биолог, изучавшая кремниевую жизнь. 🧬 Она открыла Silica flora и описала Tatīnidae.',l:'people/ella/',r:['Silica flora','Кремниевая жизнь','Биология']},
{id:'kharan',k:['харан','писца','пророчество'],q:'Кто такой Харан?',a:'Харан — великий писец, автор «Пророчества Харана». 📜 Его предсказания описывают будущее Марса.',l:'people/kharan/',r:['Пророчество Харана','Писцы','Мифология']},
{id:'aratan',k:['аратан','iii'],q:'Кто такой Аратан III?',a:'Аратан III — один из правителей династии Аркадии. 👑 Известен реформами и покровительством наукам.',l:'people/aratan-iii/',r:['История Аркадии','Правители','Династии']},
{id:'yarra',k:['йарра','педагог'],q:'Кто такая Йарра?',a:'Йарра — педагог, основавшая первую школу Марса. 📚 Её методы обучения используются до сих пор.',l:'people/yarra/',r:['Педагоги','Академия Окхасена','Образование']},
{id:'miran',k:['миран','инженер'],q:'Кто такой Миран?',a:'Миран — гениальный инженер. ⚙️ Он построил Космодром Фарсиды и разработал первые марсианские корабли.',l:'people/miran/',r:['Космодром Фарсиды','Инженеры','Технологии']},
{id:'soviya',k:['совия','музыкант'],q:'Кто такая Совия?',a:'Совия — легендарная музыкантша. 🎵 Её гимны стали основой марсианской музыкальной традиции.',l:'people/soviya/',r:['Музыка','Конструктор мелодий','Гимны']},
{id:'sarum',k:['сарум','великий'],q:'Кто такой Сарум Великий?',a:'Сарум Великий — правитель Кимерии. 👑 При нём начался Золотой век летописания. Его называют «Отцом глины».',l:'people/sarum-velikiy/',r:['История Кимерии','Правители','Сарум II']},

// ТЕРМИНЫ
{id:'lansur',k:['lān','lan','sur','глина помнит'],q:'Что значит «Lān sur»?',a:'«Lān sur» — древняя марсианская фраза, означающая «Глина помнит». 🗿 Это девиз Кимерии и всей философии летописания Марса.',l:'terms/lan-sur/',r:['Кимерия','Глина','Глиняные таблички']},
{id:'tablichki',k:['таблички','глиняные'],q:'Что такое глиняные таблички?',a:'Глиняные таблички — главный носитель знаний на Марсе. 📜 На них записывают историю, законы и пророчества. Технология неизменна уже тысячи лет.',l:'terms/tablichki/',r:['Lān sur','Хевсур','Летописание']},
{id:'gemotsianin',k:['гемоцианин','кровь'],q:'Что такое гемоцианин?',a:'Гемоцианин — дыхательный пигмент на основе меди. 🩸 У марсианской фауны кровь голубая, а не красная.',l:'biology/gemotsianin/',r:['Биология','Кремниевая жизнь','Фауна']},

// ГЕОГРАФИЯ
{id:'farsida',k:['фарсида','фарсид'],q:'Что такое Фарсида?',a:'Фарсида — крупнейшее вулканическое плато Марса. ⛰️ Здесь находятся высочайшие горы и Пещеры Фарсиды.',l:'geography/farsida/',r:['Пещеры Фарсиды','Олимп','Космодром Фарсиды']},
{id:'acidalia',k:['ацидали','ацидалийск'],q:'Что такое Ацидалийское море?',a:'Ацидалийское море — крупнейший водоём Северного полушария. 🌊 Центр торговли и мореходства.',l:'geography/acidalia-sea/',r:['Авсония','Мореходы','Книги']},
{id:'olimp',k:['олимп','гора'],q:'Что такое Олимп?',a:'Олимп — высочайшая гора Марса и всей Солнечной системы. ⛰️ Высота — около 22 км.',l:'geography/olimp/',r:['Фарсида','Геология Марса','Горы']},
{id:'okhasen',k:['окхасен','столиц'],q:'Что такое Окхасен?',a:'Окхасен — столица Кимерии. 🏛️ Здесь находится Академия Окхасена и главный архив глиняных табличек.',l:'geography/okhasen/',r:['Кимерия','Академия Окхасена','Хевсур']},
{id:'ksanf-river',k:['река ксанф','ксанф река'],q:'Что такое Река Ксанф?',a:'Река Ксанф — главная торговая артерия Марса. ⚓ Соединяет Эритрейское море с внутренними землями.',l:'geography/ksanf-river/',r:['Ксанф','Мореходы','Торговля']},

// ИСТОРИЯ
{id:'periodization',k:['периодизация','период'],q:'Что такое Периодизация истории?',a:'История Марса делится на 3 эпохи: 🌱 Основания, ✨ Расцвета, 🥀 Умирания. Каждая описана в Свитках Хевсура.',l:'history/periodization/',r:['Хронология','Эпоха Основания','Эпоха Умирания']},
{id:'timeline',k:['хронология','таймлайн'],q:'Что такое Хронология?',a:'Хронология — детальная летопись всех событий Марса. 📅 Составлена по глиняным табличкам.',l:'history/timeline/',r:['Периодизация','Свитки Хевсура','Эпохи']},
{id:'iskhod',k:['исход','переселен'],q:'Что такое Исход?',a:'Исход — великое переселение марсиан. 🚀 Событие, которое положило конец Эпохе Умирания.',l:'history/iskhod/',r:['Эпоха Умирания','Хронология','Пророчество Харана']},
{id:'mify',k:['мифы','легенд'],q:'Что такое Мифы и легенды?',a:'Мифы Марса — это истории о богах, героях и чудовищах. 🐉 Самый известный — Ксанф-чудовище.',l:'history/myths/',r:['Ксанф-чудовище','Боги','Религия']},

// РЕЛИГИЯ
{id:'kho',k:['кхо','бог кхо'],q:'Кто такой Кхо?',a:'Кхо — бог глины и памяти. 🗿 Центральное божество марсианского пантеона.',l:'mythology/kho/',r:['Акха','Араксис','Религия']},
{id:'akha',k:['акха','бог акха'],q:'Кто такая Акха?',a:'Акха — богиня воды и жизни. 💧 Супруга Кхо. Её слёзы — дожди на Марсе.',l:'mythology/akha/',r:['Кхо','Моря','Религия']},
{id:'araksis',k:['араксис'],q:'Кто такой Араксис?',a:'Араксис — бог-воин и защитник. ⚔️ Покровитель воинов Кхонга.',l:'mythology/araksis/',r:['Кхо','Кхонг','Боги']},
{id:'prorochestvo',k:['пророчество','харана'],q:'Что такое Пророчество Харана?',a:'Пророчество Харана — древний текст о будущем Марса. 📜 Содержит предсказания об Исходе и конце Эпохи.',l:'mythology/prorochestvo-kharana/',r:['Харан','Исход','Мифология']},

// ИГРА
{id:'xp',k:['опыт','xp','экспа'],q:'Как получить опыт?',a:'Опыт начисляется за: 📖 прочтение статьи до конца, 💬 комментарии, 🎯 квесты, 🏅 достижения. Стандарт — +5 XP за статью.',l:'profile/',r:['Уровни','Достижения','Квесты']},
{id:'levels',k:['уровн','lvl'],q:'Как работают уровни?',a:'Уровень повышается за XP. 📈 Формула: нужно `(уровень+1)^1.8 × 20` опыта. Всего 100 уровней с разными должностями.',l:'profile/',r:['Опыт','Должности','Достижения']},
{id:'achievements',k:['достижени','наград'],q:'Что такое достижения?',a:'Достижения — это награды за действия. 🏅 Их 100+ разных. Показываются в профиле.',l:'achievements/',r:['Опыт','Уровни','Награды']},
{id:'guilds',k:['гильди','гильд'],q:'Что такое гильдии?',a:'Гильдии — это объединения игроков. 🏰 Можно создавать свои или вступать в существующие. До 50 участников.',l:'guilds/',r:['Друзья','Лидеры','Достижения']},
{id:'friends',k:['друз','дружб'],q:'Как добавить друга?',a:'Заходи на профиль пользователя в лидерборде. 👥 Нажми «Добавить в друзья». После подтверждения — вы друзья.',l:'profile/',r:['Лидеры','Гильдии','Профиль']},
{id:'currency',k:['талант','валют','глинян'],q:'Что такое глиняные таланты?',a:'Глиняные таланты — валюта Марса. 🪙 Зарабатываются за достижения, квесты и ежедневные входы. Тратятся на кастомизацию.',l:'profile/',r:['Достижения','Квесты','Профиль']},

// FAQ
{id:'faq-reg',k:['регистрац','войти','вход'],q:'Как зарегистрироваться?',a:'Нажми «Регистрация» в шапке. 📝 Введи email и пароль. Подтверди email в письме.',l:'register/',r:['Профиль','Настройки','Аккаунт']},
{id:'faq-dark',k:['тёмная тема','ночь','звёзд'],q:'Как включить тёмную тему?',a:'Нажми на 🌟 в правом нижнем углу. Или в профиле → Настройки → Тема.',l:'profile/',r:['Профиль','Настройки','Тема']},
{id:'faq-save',k:['закладк','сохранить'],q:'Как сохранить статью?',a:'В любой статье нажми 🔖 в блоке лайков. 📚 Все закладки — в разделе «Мои закладки».',l:'bookmarks/',r:['Статьи','Профиль','Разделы']},
{id:'faq-pass',k:['пароль','сброс'],q:'Забыл пароль — что делать?',a:'На странице входа нажми «Забыли пароль?». 📧 Придёт письмо со ссылкой для сброса.',l:'login/',r:['Вход','Регистрация','Безопасность']}
];

/* ═══════════════════════════════════════════════════════════
   ПОИСК В БАЗЕ ЗНАНИЙ
   ═══════════════════════════════════════════════════════════ */
var STOP_WORDS=['что','такое','кто','это','где','как','когда','почему','зачем','какой','какая','какие','мне','расскажи','про','о','в','на','и','с','у','для','от','до','по','а','но','или','ли','же','бы'];

function findAnswer(query){
    if(!query||typeof query!=='string')return null;
    var q=query.toLowerCase().replace(/[^\u0400-\u04FFa-z0-9\s]/g,' ').trim();
    if(!q)return null;
    var words=q.split(/\s+/).filter(function(w){return w.length>2&&STOP_WORDS.indexOf(w)===-1;});
    if(!words.length)return null;

    var best=null,bestScore=0;
    for(var i=0;i<KNOWLEDGE_BASE.length;i++){
        var item=KNOWLEDGE_BASE[i];
        var score=0;
        for(var w=0;w<words.length;w++){
            var word=words[w];
            for(var k=0;k<item.k.length;k++){
                var kw=item.k[k];
                if(word===kw){score+=5;break;}
                if(word.indexOf(kw)===0||kw.indexOf(word)===0){score+=3;break;}
                if(word.length>4&&kw.length>4&&(word.indexOf(kw)!==-1||kw.indexOf(word)!==-1)){score+=2;break;}
            }
        }
        if(q.indexOf(item.k[0])!==-1)score+=2;
        if(score>bestScore){bestScore=score;best=item;}
    }
    return bestScore>=3?best:null;
}

function getRelatedSuggestions(){
    var popular=['xp','levels','kimeria','hevsur','guilds','friends','currency','achievements'];
    return popular.map(function(id){return KNOWLEDGE_BASE.filter(function(x){return x.id===id;})[0];}).filter(Boolean);
}

/* ═══════════════════════════════════════════════════════════
   СЕССИЯ / КЭШ / API
   ═══════════════════════════════════════════════════════════ */
function getCookie(n){try{var cs=document.cookie.split(';');for(var i=0;i<cs.length;i++){var c=cs[i].trim();if(c.indexOf(n+'=')===0)return decodeURIComponent(c.substring(n.length+1));}}catch(e){}return null;}
function readSession(){
    var keys=[MY_KEY,SB_KEY,BACKUP_KEY],raw=null,i;
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
function readCache(key,ttl){
    try{var raw=localStorage.getItem(key);if(!raw)return null;
        var c=JSON.parse(raw);
        if(!c||Date.now()-c.ts>(ttl||5*60*1000))return null;
        return c.data;
    }catch(e){return null;}
}
function writeCache(key,data){try{localStorage.setItem(key,JSON.stringify({data:data,ts:Date.now()}));}catch(e){}}

async function fetchRetry(url,opts,retries){
    retries=retries==null?2:retries;var lastErr;
    for(var i=0;i<=retries;i++){
        try{
            var ctrl=new AbortController();var tid=setTimeout(function(){ctrl.abort();},15000);
            var o=Object.assign({},opts,{signal:ctrl.signal});
            var res=await fetch(url,o);clearTimeout(tid);return res;
        }catch(e){lastErr=e;if(i<retries)await new Promise(function(r){setTimeout(r,600*(i+1));});}
    }
    throw lastErr;
}
async function apiGet(path,token){
    var h={'apikey':SUPABASE_KEY};if(token)h['Authorization']='Bearer '+token;
    var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{headers:h},2);
    if(!res.ok)throw new Error('HTTP '+res.status);
    var t=await res.text();if(!t)return null;
    try{return JSON.parse(t);}catch(e){return null;}
}
async function apiPost(path,body,token,prefer){
    var h={'apikey':SUPABASE_KEY,'Content-Type':'application/json'};if(token)h['Authorization']='Bearer '+token;
    if(prefer)h['Prefer']=prefer;
    var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{method:'POST',headers:h,body:JSON.stringify(body)},2);
    if(!res.ok)throw new Error('HTTP '+res.status);
    var t=await res.text();if(!t)return null;
    try{return JSON.parse(t);}catch(e){return null;}
}
async function apiPatch(path,body,token){
    var h={'apikey':SUPABASE_KEY,'Content-Type':'application/json'};if(token)h['Authorization']='Bearer '+token;
    var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{method:'PATCH',headers:h,body:JSON.stringify(body)},2);
    if(!res.ok)throw new Error('HTTP '+res.status);
    return true;
}
async function apiDelete(path,token){
    var h={'apikey':SUPABASE_KEY};if(token)h['Authorization']='Bearer '+token;
    var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{method:'DELETE',headers:h},2);
    if(!res.ok)throw new Error('HTTP '+res.status);
    return true;
}

/* ═══════════════════════════════════════════════════════════
   УТИЛИТЫ
   ═══════════════════════════════════════════════════════════ */
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
function getLevel(exp){
    exp=exp||0;var level=1;
    while(level<100&&exp>=Math.floor(Math.pow(level+1,1.8)*20))level++;
    var curXp=Math.floor(Math.pow(level,1.8)*20);
    var nextXp=Math.floor(Math.pow(level+1,1.8)*20);
    var pct=nextXp>curXp?Math.min(((exp-curXp)/(nextXp-curXp))*100,100):100;
    return{level:level,current:curXp,next:nextXp,percent:pct};
}
function getInitials(name){if(!name)return '?';var parts=String(name).trim().split(/[\s._-]+/);if(parts.length>=2)return(parts[0][0]+parts[1][0]).toUpperCase();return name[0].toUpperCase();}
function avatarFallback(name){return 'https://ui-avatars.com/api/?name='+encodeURIComponent(getInitials(name))+'&background=6C63FF&color=fff&size=128&rounded=true';}

/* ═══════════════════════════════════════════════════════════
   СОСТОЯНИЕ
   ═══════════════════════════════════════════════════════════ */
var currentUser=null,currentProfile=null;
var kingdomColor='#6C63FF';
var achievements=[],notes=[],notifications=[],leaders=[],friends=[],friendRequests=[];
var guild=null,guildMembers=[];
var streak=0,currency=0;
var chatHistory=[];
var achFilter='all';
try{chatHistory=JSON.parse(localStorage.getItem(CHAT_KEY)||'[]');}catch(e){chatHistory=[];}
try{achFilter=localStorage.getItem(ACH_FILTER_KEY)||'all';}catch(e){}

/* ═══════════════════════════════════════════════════════════
   ХЕЛП-ТЕКСТЫ
   ═══════════════════════════════════════════════════════════ */
var HELP={
    role:'Должность зависит от уровня. Чем больше XP — тем выше роль: от Поселенца до Бессмертного.',
    kingdom:'Ваше королевство. Даёт свой цвет темы и влияет на другие фичи.',
    currency:'Глиняные таланты — валюта Марса. Зарабатываются за достижения и квесты.',
    streak:'Серия дней подряд, когда вы заходите на сайт. Больше дней — больше награда.',
    level:'Уровень растёт с опытом (XP). Всего 100 уровней.',
    xp:'XP — очки опыта. Даются за прочтение статей, комментарии, квесты.',
    friends:'Друзья — другие игроки. Можно добавлять, приглашать в гильдии.',
    achievements:'Награды за действия на сайте. Всего 100+.',
    guild:'Гильдия — объединение игроков (до 50 человек).',
    mod:'Панель модерации — доступна только модераторам и админам.'
};

function help(tip){
    return '<span class="pf-help" data-tip="'+escAttr(tip)+'">?</span>';
}

/* ═══════════════════════════════════════════════════════════
   РЕНДЕР
   ═══════════════════════════════════════════════════════════ */
function render(){
    if(!currentProfile||!currentUser)return;
    var kc=KINGDOM_COLORS[currentProfile.kingdom]||'#6C63FF';
    kingdomColor=kc;
    document.documentElement.style.setProperty('--kc',kc);
    document.documentElement.style.setProperty('--kl',kc+'cc');
    document.documentElement.style.setProperty('--ks',kc+'40');
    document.documentElement.style.setProperty('--kb',kc+'15');

    var lvl=getLevel(currentProfile.experience||0);
    var displayName=currentProfile.display_name||currentProfile.username||(currentUser.email||'').split('@')[0];
    var avatar=currentProfile.avatar_url||avatarFallback(displayName);
    var role=getRole(lvl.level);
    var kingdom=currentProfile.kingdom||null;
    var flagUrl=kingdom?KINGDOM_FLAGS[kingdom]:null;
    var mod=currentProfile.role==='moderator'||currentProfile.role==='admin';
    var xpLeft=Math.max(lvl.next-(currentProfile.experience||0),0);

    var html='';

    // HERO
    html+='<div class="pf-hero pf-fade"><div class="pf-hero-content">';
    html+='<div class="pf-avatar-wrap" onclick="pfOpenAvatarPicker()" title="Сменить аватар">';
    html+='<div class="pf-avatar-ring"></div>';
    html+='<img src="'+escAttr(avatar)+'" alt="" class="pf-avatar" loading="eager" onerror="this.onerror=null;this.src=\''+avatarFallback(displayName)+'\';">';
    html+='<div class="pf-avatar-badge">📷</div>';
    html+='<div class="pf-role-badge">'+esc(role)+' '+help(HELP.role)+'</div>';
    html+='</div>';
    html+='<div class="pf-info">';
    html+='<h1 class="pf-name" onclick="pfEditName()" title="Изменить имя">'+esc(displayName)+' <span class="pf-name-edit">✏️</span>';
    if(mod)html+=' <span class="pf-mod-badge" onclick="event.stopPropagation();pfSetTab(\'moderation\')" style="cursor:pointer;">🛡️ Модератор</span>';
    html+='</h1>';
    if(kingdom){
        html+='<div style="margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">';
        html+='<span class="pf-kingdom-badge" onclick="pfSetTab(\'settings\')">'+(flagUrl?'<img src="'+escAttr(flagUrl)+'" alt="">':'')+' '+esc(kingdom)+' '+help(HELP.kingdom)+'</span>';
        html+='</div>';
    } else {
        html+='<div style="margin-bottom:12px;"><span class="pf-kingdom-badge" onclick="pfSetTab(\'settings\')">🏰 Выбрать королевство '+help(HELP.kingdom)+'</span></div>';
    }
    html+='<p class="pf-email">'+esc(currentUser.email||'')+'</p>';
    html+='<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;margin-bottom:14px;">';
    html+='<div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600;">Уровень</span><span style="font-size:1.4rem;font-weight:800;">⭐ '+lvl.level+'</span></div>';
    html+='<div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600;">Опыт</span><span style="font-size:1.4rem;font-weight:800;">💎 '+(currentProfile.experience||0)+'</span></div>';
    html+='<div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600;">Награды</span><span style="font-size:1.4rem;font-weight:800;">🏆 '+achievements.length+'</span></div>';
    if(streak>0)html+='<div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600;">Серия '+help(HELP.streak)+'</span><span style="font-size:1.4rem;font-weight:800;">🔥 '+streak+'</span></div>';
    html+='<div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600;">Друзья</span><span style="font-size:1.4rem;font-weight:800;">👥 '+friends.length+'</span></div>';
    html+='</div>';
    html+='<div class="pf-currency" title="Валюта Марса">🪙 <span class="pf-currency-icon">🪙</span> <span>'+currency+'</span> глиняных талантов '+help(HELP.currency)+'</div>';
    html+='<div style="margin-top:14px;height:12px;background:rgba(255,255,255,.2);border-radius:12px;overflow:hidden;position:relative;">';
    html+='<div style="height:100%;width:'+lvl.percent+'%;background:linear-gradient(90deg,var(--kl),#fff);border-radius:12px;transition:width 1.2s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px rgba(255,255,255,.6);"></div>';
    html+='</div>';
    html+='<div style="font-size:.78rem;opacity:.9;margin-top:6px;">До уровня '+(lvl.level+1)+': '+xpLeft+' XP</div>';
    html+='</div></div></div>';

    // МОЯ СТРАНИЧКА (без эмодзи папки)
    html+='<div class="pf-mypage">';
    html+='<div class="pf-mypage-header">';
    html+='<h2 class="pf-mypage-title">Моя страничка</h2>';
    html+='<p class="pf-mypage-sub">Быстрый обзор активности</p>';
    html+='</div>';
    html+='<div class="pf-mypage-grid">';
    html+='<div class="pf-mypage-tile" onclick="pfSetTab(\'achievements\')"><div class="pf-mypage-tile-label">Достижения '+help(HELP.achievements)+'</div><div class="pf-mypage-tile-value">'+achievements.length+'/'+ALL_ACHIEVEMENTS.length+'</div><div class="pf-mypage-tile-sub">'+Math.round(achievements.length/ALL_ACHIEVEMENTS.length*100)+'% собрано</div></div>';
    html+='<div class="pf-mypage-tile" onclick="pfSetTab(\'notes\')"><div class="pf-mypage-tile-label">Заметки</div><div class="pf-mypage-tile-value">'+notes.length+'</div><div class="pf-mypage-tile-sub">личных записей</div></div>';
    html+='<div class="pf-mypage-tile" onclick="pfSetTab(\'friends\')"><div class="pf-mypage-tile-label">Друзья '+help(HELP.friends)+'</div><div class="pf-mypage-tile-value">'+friends.length+'</div><div class="pf-mypage-tile-sub">в кругу общения</div></div>';
    html+='<div class="pf-mypage-tile" onclick="pfSetTab(\'activity\')"><div class="pf-mypage-tile-label">Дней на сайте</div><div class="pf-mypage-tile-value">'+Object.keys(getActivity()).length+'</div><div class="pf-mypage-tile-sub">активных</div></div>';
    html+='</div>';
    html+='<div class="pf-mypage-actions">';
    html+='<a href="/achievements/" class="pf-mypage-action"><span class="pf-mypage-action-icon">🏅</span>Все награды</a>';
    html+='<a href="/bookmarks/" class="pf-mypage-action"><span class="pf-mypage-action-icon">📚</span>Закладки</a>';
    html+='<a href="/quests/" class="pf-mypage-action"><span class="pf-mypage-action-icon">🗺️</span>Квесты</a>';
    html+='<a href="/scrolls/" class="pf-mypage-action"><span class="pf-mypage-action-icon">📜</span>Свитки</a>';
    html+='</div></div>';

    // QUICK GRID — все интерактивные блоки
    html+='<div class="pf-quick-grid pf-fade" style="animation-delay:.05s;">';
    INTERACTIVE_BLOCKS.forEach(function(q){
        html+='<a href="'+q.href+'" class="pf-quick-card"><div class="pf-quick-icon">'+q.icon+'</div><div class="pf-quick-body"><div class="pf-quick-title">'+q.title+'</div><div class="pf-quick-desc">'+q.desc+'</div></div></a>';
    });
    html+='</div>';

    // TABS
    var tabs=[
        {id:'overview',icon:'👤',label:'Обзор'},
        {id:'activity',icon:'📊',label:'Активность'}
    ];
    if(mod)tabs.push({id:'moderation',icon:'🛡️',label:'Модерация',count:0,cls:'mod-tab'});
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
    // Кнопка модерации — уже добавлена через tabs.push выше перед настройками
    // Переставляем настройки в самый конец — они уже в конце

    var activeTab=localStorage.getItem(ACTIVE_TAB_KEY)||'overview';
    if(!tabs.find(function(t){return t.id===activeTab;}))activeTab='overview';

    html+='<div class="pf-tabs" id="pf-tabs">';
    tabs.forEach(function(t){
        html+='<button class="pf-tab '+(t.cls||'')+(t.id===activeTab?' active':'')+'" data-tab="'+t.id+'">'+t.icon+' '+t.label+(t.count?' <span class="pf-tab-count">'+t.count+'</span>':'')+'</button>';
    });
    html+='</div>';

    // OVERVIEW
    html+='<div class="pf-tab-content'+(activeTab==='overview'?' active':'')+'" data-content="overview">';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>';
    html+='<p style="margin:0 0 12px 0;color:#555;font-size:.95rem;line-height:1.6;" id="pf-bio">'+esc(currentProfile.bio||'✍️ Ещё ничего не рассказал о себе.')+'</p>';
    html+='<button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button></div>';

    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>';
    html+='<div style="text-align:center;padding:20px;background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.4));border-radius:14px;border:1px solid rgba(0,0,0,.05);">';
    html+='<div style="font-size:1.2rem;font-weight:800;color:var(--kc);margin-bottom:4px;">'+getMartianDate().month+'</div>';
    html+='<div style="font-size:2.5rem;font-weight:900;color:#1a1a1a;line-height:1;margin:6px 0;">'+getMartianDate().day+'</div>';
    html+='<div style="font-size:.9rem;color:#666;font-weight:600;">Год '+getMartianDate().year+' Э.О.</div>';
    html+='</div></div>';
    html+='</div>';

    // ACTIVITY
    html+='<div class="pf-tab-content'+(activeTab==='activity'?' active':'')+'" data-content="activity">';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📊</span> Активность за 90 дней '+help('Сколько раз вы заходили на сайт каждый день.')+'</h3>';
    html+='<div>'+renderHeatmap()+'</div></div>';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📈</span> XP за 14 дней</h3>'+renderXPChart()+'</div>';
    html+='</div>';

    // MODERATION (если мод)
    if(mod){
        html+='<div class="pf-tab-content'+(activeTab==='moderation'?' active':'')+'" data-content="moderation">';
        html+='<div class="pf-card" style="background:linear-gradient(135deg,rgba(231,76,60,.05),rgba(192,57,43,.03));border:2px solid rgba(231,76,60,.25);">';
        html+='<h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">🛡️</span> Центр модерации '+help(HELP.mod)+'</h3>';
        html+='<a href="/lists/moderation/" class="pf-btn pf-btn-danger">🛡️ Открыть панель</a>';
        html+='</div></div>';
    }

    // GUILD
    html+='<div class="pf-tab-content'+(activeTab==='guild'?' active':'')+'" data-content="guild">';
    if(guild){
        html+='<div class="pf-card" style="background:linear-gradient(135deg,'+(guild.color||kingdomColor)+',rgba(0,0,0,.2));color:#fff;padding:26px 28px;border-radius:18px;margin-bottom:18px;">';
        html+='<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;">';
        html+='<div style="width:76px;height:76px;border-radius:18px;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:2px solid rgba(255,255,255,.45);">'+(guild.icon||'🏰')+'</div>';
        html+='<div style="flex:1;"><div style="font-size:1.5rem;font-weight:800;margin-bottom:6px;">'+esc(guild.name)+'</div>';
        html+='<div style="font-size:.85rem;opacity:.92;">👥 '+guildMembers.length+' участников</div></div></div></div>';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📜</span> Описание</h3>';
        html+='<p style="margin:0;color:#555;line-height:1.6;">'+esc(guild.description||'Без описания')+'</p></div>';
        html+='<div class="pf-card"><a href="/guilds/" class="pf-btn pf-btn-outline">🏰 Перейти в гильдии</a>';
        if(guild.leader_id===currentUser.id)html+='<button class="pf-btn pf-btn-danger" style="margin-left:8px;" onclick="pfDeleteGuild()">🗑️ Удалить</button>';
        html+='</div>';
    }else{
        html+='<div class="pf-card" style="text-align:center;padding:50px 20px;"><div style="font-size:4rem;margin-bottom:12px;">🏰</div>';
        html+='<h3 style="margin:0 0 8px 0;">Вы пока не в гильдии '+help(HELP.guild)+'</h3>';
        html+='<a href="/guilds/" class="pf-btn">🔍 Найти гильдию</a></div>';
    }
    html+='</div>';

    // ACHIEVEMENTS с фильтром
    html+='<div class="pf-tab-content'+(activeTab==='achievements'?' active':'')+'" data-content="achievements">';
    html+='<div class="pf-card">';
    html+='<h3 class="pf-card-title"><span class="pf-ct-icon">🏅</span> Достижения ('+achievements.length+'/'+ALL_ACHIEVEMENTS.length+')</h3>';
    html+='<div style="height:10px;background:rgba(108,99,255,.1);border-radius:10px;overflow:hidden;margin-bottom:16px;"><div style="height:100%;width:'+Math.round(achievements.length/ALL_ACHIEVEMENTS.length*100)+'%;background:linear-gradient(90deg,var(--kc),var(--kl));border-radius:10px;"></div></div>';
    html+='<div class="pf-ach-filters">';
    var filters=[{id:'all',n:'Все'},{id:'start',n:'Начало'},{id:'read',n:'Чтение'},{id:'xp',n:'Опыт'},{id:'lvl',n:'Уровни'},{id:'streak',n:'Серия'},{id:'social',n:'Друзья'},{id:'guild',n:'Гильдии'},{id:'currency',n:'Валюта'},{id:'kingdom',n:'Королевства'},{id:'special',n:'Особые'}];
    filters.forEach(function(f){
        html+='<button class="pf-ach-filter'+(achFilter===f.id?' active':'')+'" data-filter="'+f.id+'">'+f.n+'</button>';
    });
    html+='</div>';
    html+='<div class="pf-ach-grid" id="pf-ach-grid">'+renderAchGrid()+'</div>';
    html+='</div></div>';

    // NOTES
    html+='<div class="pf-tab-content'+(activeTab==='notes'?' active':'')+'" data-content="notes">';
    html+='<div class="pf-card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;">';
    html+='<h3 class="pf-card-title" style="margin:0;"><span class="pf-ct-icon">📝</span> Заметки ('+notes.length+')</h3>';
    html+='<button class="pf-btn" onclick="pfOpenNoteForm()">➕ Новая</button></div>';
    if(notes.length===0){
        html+='<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет заметок.</p>';
    }else{
        html+='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;">';
        notes.forEach(function(n,i){
            html+='<div style="background:#fff;border-radius:12px;padding:16px;border-left:4px solid '+(n.color||'#6C63FF')+';box-shadow:0 4px 12px rgba(0,0,0,.06);cursor:pointer;animation:pfSlideUp .35s ease both;animation-delay:'+(i*.04)+'s;" onclick="pfEditNote('+n.id+')">';
            html+='<div style="font-weight:800;font-size:.95rem;color:#1a1a1a;margin-bottom:6px;">'+(n.pinned?'📌 ':'')+esc(n.title||'Заметка')+'</div>';
            html+='<div style="font-size:.85rem;color:#555;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;">'+esc(n.content)+'</div>';
            html+='<div style="display:flex;gap:4px;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08);" onclick="event.stopPropagation();">';
            html+='<button class="pf-note-btn" onclick="pfPinNote('+n.id+')" style="padding:4px 10px;border-radius:8px;border:none;background:rgba(0,0,0,.05);font-size:.72rem;font-weight:600;cursor:pointer;font-family:inherit;color:#666;">'+(n.pinned?'📍':'📌')+'</button>';
            html+='<button class="pf-note-btn" onclick="pfEditNote('+n.id+')" style="padding:4px 10px;border-radius:8px;border:none;background:rgba(0,0,0,.05);font-size:.72rem;font-weight:600;cursor:pointer;font-family:inherit;color:#666;">✏️</button>';
            html+='<button class="pf-note-btn" onclick="pfDeleteNote('+n.id+')" style="padding:4px 10px;border-radius:8px;border:none;background:rgba(0,0,0,.05);font-size:.72rem;font-weight:600;cursor:pointer;font-family:inherit;color:#c0392b;">🗑️</button>';
            html+='</div></div>';
        });
        html+='</div>';
    }
    html+='</div></div>';

    // FRIENDS (с рабочим добавлением/удалением)
    html+='<div class="pf-tab-content'+(activeTab==='friends'?' active':'')+'" data-content="friends">';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👥</span> Друзья ('+friends.length+') '+help(HELP.friends)+'</h3>';
    html+='<p style="color:#888;font-size:.88rem;margin-bottom:14px;">Заходи в профиль любого пользователя в «Лидерах», чтобы добавить в друзья.</p>';
    if(friends.length===0){
        html+='<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет друзей. <a href="/profile/" onclick="pfSetTab(\'leaderboard\');return false;" style="color:var(--kc);font-weight:700;cursor:pointer;">Найти друзей →</a></p>';
    }else{
        friends.forEach(function(f,i){
            var name=f.other.display_name||f.other.username||'Аноним';
            var av=f.other.avatar_url||avatarFallback(name);
            var status=f.status==='accepted'?'👥 Друзья':'⏳ Заявка отправлена';
            html+='<div class="pf-friend" style="animation-delay:'+(i*.04)+'s;">';
            html+='<img src="'+escAttr(av)+'" class="pf-friend-avatar" loading="lazy" onerror="this.onerror=null;this.src=\''+avatarFallback(name)+'\';">';
            html+='<div class="pf-friend-info"><div class="pf-friend-name">'+esc(name)+'</div><div class="pf-friend-status">'+status+'</div></div>';
            html+='<div class="pf-friend-actions">';
            html+='<button class="pf-icon-btn" onclick="pfOpenProfile(\''+escAttr(f.other.user_id)+'\')" title="Профиль">👤</button>';
            html+='<button class="pf-icon-btn danger" onclick="pfRemoveFriend(\''+escAttr(f.other.user_id)+'\')" title="Удалить">✕</button>';
            html+='</div></div>';
        });
    }
    html+='</div>';
    if(friendRequests.length>0){
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📨</span> Заявки в друзья ('+friendRequests.length+')</h3>';
        friendRequests.forEach(function(f){
            var name=f.other.display_name||f.other.username||'Аноним';
            var av=f.other.avatar_url||avatarFallback(name);
            html+='<div class="pf-friend">';
            html+='<img src="'+escAttr(av)+'" class="pf-friend-avatar" onerror="this.onerror=null;this.src=\''+avatarFallback(name)+'\';">';
            html+='<div class="pf-friend-info"><div class="pf-friend-name">'+esc(name)+'</div><div class="pf-friend-status">хочет добавить вас</div></div>';
            html+='<div class="pf-friend-actions">';
            html+='<button class="pf-icon-btn success" onclick="pfAcceptFriend(\''+escAttr(f.other.user_id)+'\')" title="Принять">✓</button>';
            html+='<button class="pf-icon-btn danger" onclick="pfDeclineFriend(\''+escAttr(f.other.user_id)+'\')" title="Отклонить">✕</button>';
            html+='</div></div>';
        });
        html+='</div>';
    }
    html+='</div>';

    // AI CHAT
    html+='<div class="pf-tab-content'+(activeTab==='ai'?' active':'')+'" data-content="ai">';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🤖</span> ИИ-гид '+help('Задай вопрос о вселенной — получи ответ с ссылками на статьи.')+'</h3>';
    html+='<div class="pf-chat-wrap">';
    html+='<div class="pf-chat" id="pf-chat-container">';
    if(chatHistory.length===0){
        html+='<div class="pf-chat-msg bot">Привет! Я ИИ-гид по миру «Письмо из Красной пыли». 🪐<br>Спроси меня о королевствах, персонажах, истории, географии или игровых механиках!</div>';
    }else{
        chatHistory.slice(-30).forEach(function(m){
            html+='<div class="pf-chat-msg '+(m.role==='user'?'user':'bot')+'">'+formatChatMsg(m)+'</div>';
        });
    }
    html+='</div>';
    html+='<div class="pf-chat-suggestions" id="pf-chat-suggestions">';
    getRelatedSuggestions().slice(0,6).forEach(function(item){
        html+='<button type="button" class="pf-chat-chip" onclick="pfAskBot(\''+escAttr(item.q)+'\')">'+esc(item.q)+'</button>';
    });
    html+='</div>';
    html+='<div class="pf-chat-input">';
    html+='<input type="text" id="pf-chat-input" placeholder="Задайте вопрос о Марсе..." onkeypress="if(event.key===\'Enter\')pfSendChat()">';
    html+='<button type="button" onclick="pfSendChat()">➤</button>';
    html+='</div></div></div></div>';

    // NOTIFICATIONS
    html+='<div class="pf-tab-content'+(activeTab==='notifications'?' active':'')+'" data-content="notifications">';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Уведомления ('+notifications.length+') '+help('Одно уведомление = одно достижение или событие.')+'</h3>';
    if(notifications.length===0){
        html+='<p style="text-align:center;color:#888;padding:40px 20px;">Уведомлений пока нет.</p>';
    }else{
        notifications.forEach(function(n){
            var isUnread=!n.read;
            html+='<div style="display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;transition:all .25s;'+(isUnread?'border-left:3px solid var(--kc);background:rgba(108,99,255,.06);':'')+'">';
            html+='<div style="font-size:1.3rem;flex-shrink:0;">📬</div>';
            html+='<div style="flex:1;"><div style="font-size:.88rem;color:#333;">'+esc(n.message||'')+'</div>';
            html+='<div style="font-size:.72rem;color:#999;margin-top:2px;">'+new Date(n.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div></div></div>';
        });
    }
    html+='</div></div>';

    // LEADERBOARD (с кликом на профиль)
    html+='<div class="pf-tab-content'+(activeTab==='leaderboard'?' active':'')+'" data-content="leaderboard">';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10 по опыту '+help('Нажми на пользователя, чтобы посмотреть профиль и добавить в друзья.')+'</h3>';
    if(leaders.length===0){
        html+='<p style="text-align:center;color:#888;padding:40px 20px;">Таблица лидеров недоступна.</p>';
    }else{
        html+='<table class="pf-leaderboard"><thead><tr><th>#</th><th>Участник</th><th style="text-align:right;">Ур.</th><th style="text-align:right;">XP</th></tr></thead><tbody>';
        leaders.forEach(function(l,i){
            var nm=l.display_name||l.username||'Аноним';
            var medals=['🥇','🥈','🥉'];
            var isMe=l.user_id===currentUser.id;
            var guildBadge=l.guild_name?'<span class="pf-lb-guild">🏰 '+esc(l.guild_name)+'</span>':'';
            html+='<tr class="'+(isMe?'pf-me':'')+'" onclick="pfOpenProfile(\''+escAttr(l.user_id)+'\')">';
            html+='<td>'+(medals[i]||(i+1))+'</td>';
            html+='<td><div class="pf-lb-row"><img src="'+escAttr(l.avatar_url||avatarFallback(nm))+'" class="pf-lb-avatar" loading="lazy" onerror="this.onerror=null;this.src=\''+avatarFallback(nm)+'\';">'+esc(nm)+(isMe?' (вы)':'')+guildBadge+'</div></td>';
            html+='<td style="text-align:right;">'+(l.level||getLevel(l.experience||0).level)+'</td>';
            html+='<td style="text-align:right;"><b>'+(l.experience||0)+'</b></td></tr>';
        });
        html+='</tbody></table>';
    }
    html+='</div></div>';

    // SECURITY (QR + 2FA + пароль)
    html+='<div class="pf-tab-content'+(activeTab==='security'?' active':'')+'" data-content="security">';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📧</span> Email-2FA '+help('Двухфакторная защита — код приходит на email при входе с нового устройства.')+'</h3>';
    html+='<div id="pf-2fa-status" style="margin-bottom:20px;"></div>';
    html+='<div class="pf-toggle"><div><div class="pf-toggle-label">🔐 Email-2FA</div><div class="pf-toggle-desc">Код при входе с новых устройств</div></div><div class="pf-switch" id="pf-switch-2fa" onclick="pfToggle2FA()"></div></div>';
    html+='</div>';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📱</span> Вход с другого устройства '+help('Покажите QR с ПК — войдите с телефона без пароля.')+'</h3>';
    html+='<p style="color:#666;font-size:.88rem;line-height:1.55;margin:0 0 14px 0;">Сгенерируйте QR-код и отсканируйте его камерой телефона.</p>';
    html+='<button type="button" class="pf-btn" onclick="pfOpenDeviceLink()" style="width:100%;justify-content:center;">📱 Показать QR-код</button>';
    html+='</div>';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">💻</span> Доверенные устройства</h3>';
    html+='<div id="pf-trusted-devices"><p style="color:#888;">Загрузка...</p></div>';
    html+='<button class="pf-btn pf-btn-outline" onclick="pfClearTrustedDevices()" style="margin-top:12px;">🗑️ Удалить все</button>';
    html+='</div>';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔑</span> Смена пароля '+help('Если забыли пароль — используйте форму «Забыли пароль?» на странице входа.')+'</h3>';
    html+='<button class="pf-btn" onclick="pfChangePassword()">🔐 Сменить пароль</button>';
    html+='</div></div>';

    // SETTINGS (всё в конце, включая удалить аккаунт)
    html+='<div class="pf-tab-content'+(activeTab==='settings'?' active':'')+'" data-content="settings">';
    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👤</span> Имя</h3>';
    html+='<p style="color:#555;margin:0 0 12px 0;">Текущее: <b id="pf-display-name">'+esc(displayName)+'</b></p>';
    html+='<button class="pf-btn pf-btn-outline" onclick="pfEditName()">✏️ Изменить</button></div>';

    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🖼️</span> Аватар</h3>';
    html+='<div class="pf-avatar-grid">';
    ['/assets/images/авотарка%20девушки.png','/assets/images/мужчина.png','/assets/images/мужчина2.png','/assets/images/мужчина%203.png'].forEach(function(url){
        html+='<img src="'+url+'" alt="" class="pf-avatar-option'+(avatar===url?' selected':'')+'" onclick="pfSelectAvatar(\''+url+'\')" loading="lazy">';
    });
    html+='</div></div>';

    html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏰</span> Королевство '+help('Даёт свой цвет темы. Можно менять в любое время.')+'</h3>';
    html+='<div class="pf-kingdom-grid">';
    KINGDOMS_ORDER.forEach(function(name){
        var sel=currentProfile.kingdom===name;
        var col=KINGDOM_COLORS[name]||'#6C63FF';
        var flag=KINGDOM_FLAGS[name];
        html+='<button class="pf-kingdom-btn'+(sel?' selected':'')+'" style="'+(sel?'background:'+col+';border-color:'+col+';':'')+'" onclick="pfSelectKingdom(\''+name+'\')">';
        html+='<img src="'+escAttr(flag)+'" alt="">';
        html+='<span>'+name+'</span>';
        html+='</button>';
    });
    html+='</div></div>';

    // 🆕 БЛОК «ОПАСНАЯ ЗОНА» — в самом конце, вместе с выходом
    html+='<div class="pf-card" style="background:rgba(231,76,60,.05);border:2px solid rgba(231,76,60,.2);">';
    html+='<h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">⚠️</span> Опасная зона</h3>';
    html+='<button class="pf-btn pf-btn-danger" onclick="pfDeleteAccount()">🗑️ Удалить аккаунт</button>';
    html+='</div>';
    html+='<div class="pf-card"><button class="pf-btn pf-btn-outline" onclick="pfLogout()" style="width:100%;justify-content:center;">🚪 Выйти</button></div>';

    html+='</div>';

    container.innerHTML=html;
    attachTabsEvents();
    attachAchFilters();
    attachChatChips();

    if(activeTab==='security')render2FATab();
}

/* ═══════════════════════════════════════════════════════════
   РЕНДЕР: ЧАСТИ
   ═══════════════════════════════════════════════════════════ */
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
        cells.push('<div style="aspect-ratio:1;background:'+(lvl===0?'rgba(108,99,255,.08)':lvl===1?'rgba(108,99,255,.25)':lvl===2?'rgba(108,99,255,.45)':lvl===3?'rgba(108,99,255,.7)':'var(--kc)')+';border-radius:3px;" title="'+d.toLocaleDateString('ru-RU')+': '+v+' визитов"></div>');
    }
    return '<div style="display:grid;grid-template-columns:repeat(13,1fr);gap:3px;">'+cells.join('')+'</div>';
}
function renderXPChart(){
    var h=JSON.parse(localStorage.getItem(XP_HISTORY_KEY)||'{}');
    var days=[];var max=1;
    for(var i=13;i>=0;i--){
        var d=new Date(Date.now()-i*86400000);
        var key=d.toISOString().slice(0,10);
        var v=h[key]||0;
        if(v>max)max=v;
        days.push({v:v,date:d});
    }
    var bars=days.map(function(d,i){
        var pct=max>0?(d.v/max)*100:0;
        var hh=Math.max(pct,3);
        return '<div style="flex:1;background:linear-gradient(180deg,var(--kl),var(--kc));border-radius:4px 4px 0 0;height:'+hh+'%;min-height:4px;" title="'+d.date.toLocaleDateString('ru-RU')+': '+d.v+' XP"></div>';
    }).join('');
    return '<div style="display:flex;align-items:flex-end;gap:4px;height:100px;padding:8px 0;border-bottom:1px dashed rgba(0,0,0,.08);">'+bars+'</div>';
}
function renderAchGrid(){
    var filtered=achFilter==='all'?ALL_ACHIEVEMENTS:ALL_ACHIEVEMENTS.filter(function(a){return a.c===achFilter;});
    var earnedIds={};
    achievements.forEach(function(a){earnedIds[a.achievement_id]=true;});
    var html='';
    filtered.forEach(function(a){
        var earned=earnedIds[a.id];
        html+='<div class="pf-ach'+(earned?'':' locked')+'"><div class="pf-ach-icon">'+(earned?a.i:'🔒')+'</div>';
        html+='<div><div class="pf-ach-name">'+esc(a.n)+'</div>';
        html+='<div class="pf-ach-date">'+(earned?(a.earned_at?new Date(a.earned_at).toLocaleDateString('ru-RU'):'Получено'):esc(a.d))+'</div></div></div>';
    });
    return html;
}
function formatChatMsg(m){
    var txt=esc(m.text).replace(/\n/g,'<br>');
    if(m.links && m.links.length){
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
    var dayOfYear=Math.floor((daysFrom*(MD/EY))%MD);
    var rem=dayOfYear,mi=0;
    for(var i=0;i<days.length;i++){if(rem<days[i]){mi=i;break;}rem-=days[i];}
    return{year:year.toLocaleString(),month:months[mi],day:rem+1};
}

/* ═══════════════════════════════════════════════════════════
   TABS + ACH FILTERS + CHAT CHIPS
   ═══════════════════════════════════════════════════════════ */
function attachTabsEvents(){
    var w=document.getElementById('pf-tabs');
    if(!w)return;
    // Плавный скролл колёсиком
    w.addEventListener('wheel',function(e){
        if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();w.scrollLeft+=e.deltaY*1.2;}
    },{passive:false});
    // Drag
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
        tab.onclick=function(){
            if(moved){moved=false;return;}
            pfSetTab(tab.dataset.tab);
        };
    });
}

function attachAchFilters(){
    document.querySelectorAll('.pf-ach-filter').forEach(function(btn){
        btn.onclick=function(){
            achFilter=btn.dataset.filter;
            try{localStorage.setItem(ACH_FILTER_KEY,achFilter);}catch(e){}
            document.querySelectorAll('.pf-ach-filter').forEach(function(b){b.classList.toggle('active',b.dataset.filter===achFilter);});
            var grid=document.getElementById('pf-ach-grid');
            if(grid)grid.innerHTML=renderAchGrid();
        };
    });
}

function attachChatChips(){
    // уже встроено через onclick
}

window.pfSetTab=function(tab){
    localStorage.setItem(ACTIVE_TAB_KEY,tab);
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

/* ═══════════════════════════════════════════════════════════
   ДЕЙСТВИЯ — ИМЯ / АВАТАР / КОРОЛЕВСТВО
   ═══════════════════════════════════════════════════════════ */
window.pfEditName=function(){
    var cur=currentProfile.display_name||currentProfile.username||'';
    showModal({
        title:'✏️ Новое имя',sub:'От 2 до 20 символов',
        fields:[{name:'name',value:cur,placeholder:'Ваше имя',max:20}],
        onOk:async function(v){
            if(!v.name||v.name.length<2||v.name.length>20){toast('2–20 символов','error');return;}
            try{
                await apiPatch('profiles?user_id=eq.'+currentUser.id,{display_name:v.name},currentUser._token);
                currentProfile.display_name=v.name;
                toast('✅ Имя обновлено!','success');
                writeCache(PROFILE_CACHE_KEY,{user:currentUser.user,profile:currentProfile});
                setTimeout(render,400);
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};

window.pfOpenAvatarPicker=function(){
    showModal({
        title:'🖼️ Сменить аватар',
        sub:'Выберите из доступных',
        fields:[],
        okText:'Отмена',
        onOk:function(){}
    });
    setTimeout(function(){
        var modal=document.querySelector('.pf-modal');
        if(!modal)return;
        var grid=document.createElement('div');
        grid.className='pf-avatar-grid';
        ['/assets/images/авотарка%20девушки.png','/assets/images/мужчина.png','/assets/images/мужчина2.png','/assets/images/мужчина%203.png'].forEach(function(url){
            var img=document.createElement('img');
            img.src=url;
            img.className='pf-avatar-option'+(currentProfile.avatar_url===url?' selected':'');
            img.style.cssText='width:72px;height:72px;';
            img.onclick=function(){
                pfSelectAvatar(url);
                var bg=document.querySelector('.pf-modal-bg');
                if(bg)bg.remove();
            };
            grid.appendChild(img);
        });
        var actions=modal.querySelector('.pf-modal-actions');
        if(actions)modal.insertBefore(grid,actions);
    },50);
};

window.pfSelectAvatar=async function(url){
    if(currentProfile.avatar_url===url)return;
    try{
        await apiPatch('profiles?user_id=eq.'+currentUser.id,{avatar_url:url},currentUser._token);
        currentProfile.avatar_url=url;
        toast('✅ Аватар обновлён!','success');
        writeCache(PROFILE_CACHE_KEY,{user:currentUser.user,profile:currentProfile});
        render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};

window.pfSelectKingdom=async function(name){
    if(currentProfile.kingdom===name)return;
    try{
        await apiPatch('profiles?user_id=eq.'+currentUser.id,{kingdom:name},currentUser._token);
        currentProfile.kingdom=name;
        toast('✅ '+name+' выбрано!','success');
        writeCache(PROFILE_CACHE_KEY,{user:currentUser.user,profile:currentProfile});
        render();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};

window.pfEditBio=function(){
    showModal({
        title:'📝 Биография',sub:'Расскажите о себе',
        fields:[{name:'bio',type:'textarea',value:currentProfile.bio||'',placeholder:'Пара слов о себе...',max:1000}],
        onOk:async function(v){
            try{
                await apiPatch('profiles?user_id=eq.'+currentUser.id,{bio:v.bio},currentUser._token);
                currentProfile.bio=v.bio;
                var el=document.getElementById('pf-bio');
                if(el)el.textContent=v.bio||'✍️ Ещё ничего не рассказал о себе.';
                writeCache(PROFILE_CACHE_KEY,{user:currentUser.user,profile:currentProfile});
                toast('✅ Обновлено!','success');
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};

/* ═══════════════════════════════════════════════════════════
   ДРУЗЬЯ
   ═══════════════════════════════════════════════════════════ */
window.pfOpenProfile=function(userId){
    if(userId===currentUser.id){pfSetTab('overview');return;}
    showModal({
        title:'👤 Профиль пользователя',
        sub:'ID: '+userId.slice(0,8)+'...',
        fields:[],
        okText:'Закрыть',
        onOk:function(){}
    });
    setTimeout(function(){
        var modal=document.querySelector('.pf-modal');
        if(!modal)return;
        var actions=modal.querySelector('.pf-modal-actions');
        if(!actions)return;
        var btn=document.createElement('button');
        btn.className='pf-btn';
        btn.style.cssText='margin-right:auto;';
        btn.textContent='➕ Добавить в друзья';
        btn.onclick=function(){
            pfAddFriend(userId);
            var bg=document.querySelector('.pf-modal-bg');
            if(bg)bg.remove();
        };
        actions.insertBefore(btn,actions.firstChild);
    },50);
};

window.pfAddFriend=async function(friendId){
    if(friendId===currentUser.id){toast('Нельзя добавить себя','error');return;}
    try{
        var existing=await apiGet('friendships?or=(and(user_id.eq.'+currentUser.id+',friend_id.eq.'+friendId+'),and(user_id.eq.'+friendId+',friend_id.eq.'+currentUser.id+'))&select=id',currentUser._token);
        if(existing&&existing.length){toast('Заявка уже отправлена','info');return;}
        await apiPost('friendships',{user_id:currentUser.id,friend_id:friendId,status:'pending'},currentUser._token);
        toast('✅ Заявка отправлена!','success');
        loadFriends();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};

window.pfRemoveFriend=async function(friendId){
    showModal({
        title:'Удалить из друзей?',sub:'Вы больше не будете видеть этого пользователя в списке.',
        fields:[],okText:'Удалить',
        onOk:async function(){
            try{
                await apiDelete('friendships?or=(and(user_id.eq.'+currentUser.id+',friend_id.eq.'+friendId+'),and(user_id.eq.'+friendId+',friend_id.eq.'+currentUser.id+'))',currentUser._token);
                toast('🗑️ Удалено','info');
                loadFriends();
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};

window.pfAcceptFriend=async function(friendId){
    try{
        await apiPatch('friendships?user_id=eq.'+friendId+'&friend_id=eq.'+currentUser.id,{status:'accepted',updated_at:new Date().toISOString()},currentUser._token);
        toast('✅ Друг добавлен!','success');
        loadFriends();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};

window.pfDeclineFriend=async function(friendId){
    try{
        await apiDelete('friendships?user_id=eq.'+friendId+'&friend_id=eq.'+currentUser.id,currentUser._token);
        toast('Заявка отклонена','info');
        loadFriends();
    }catch(e){toast('Ошибка: '+e.message,'error');}
};

/* ═══════════════════════════════════════════════════════════
   БОТ — ИИ-ГИД
   ═══════════════════════════════════════════════════════════ */
window.pfSendChat=function(){
    var input=document.getElementById('pf-chat-input');
    var chatEl=document.getElementById('pf-chat-container');
    if(!input||!chatEl)return;
    var q=input.value.trim();
    if(!q)return;
    pfAskBot(q);
    input.value='';
};

window.pfAskBot=function(question){
    var chatEl=document.getElementById('pf-chat-container');
    if(!chatEl)return;

    // Сообщение пользователя
    var userMsg=document.createElement('div');
    userMsg.className='pf-chat-msg user';
    userMsg.textContent=question;
    chatEl.appendChild(userMsg);
    chatEl.scrollTop=chatEl.scrollHeight;
    chatHistory.push({role:'user',text:question});

    // Индикатор печати
    var typing=document.createElement('div');
    typing.className='pf-typing';
    typing.innerHTML='<span></span><span></span><span></span>';
    chatEl.appendChild(typing);
    chatEl.scrollTop=chatEl.scrollHeight;

    // Ответ через задержку
    setTimeout(function(){
        typing.remove();
        var found=findAnswer(question);
        var botMsg=document.createElement('div');
        botMsg.className='pf-chat-msg bot';

        if(found){
            var links=[];
            if(found.l){
                links.push({q:'Узнать больше',l:found.l});
            }
            if(found.r){
                found.r.forEach(function(r){
                    var related=KNOWLEDGE_BASE.filter(function(x){return x.q===r||x.id===r.toLowerCase();})[0];
                    if(related&&related.l)links.push({q:r,l:related.l});
                });
            }
            var text=found.a;
            if(links.length){
                text+='<div class="pf-chat-links">';
                links.slice(0,4).forEach(function(l){
                    text+='<a class="pf-chat-link" href="/'+escAttr(l.l)+'">📖 '+esc(l.q)+' →</a>';
                });
                text+='</div>';
            }
            botMsg.innerHTML=text;
            chatHistory.push({role:'bot',text:found.a,links:links});
        } else {
            var fallback='Хм, я не нашёл точного ответа. 🤔<br>Попробуйте переформулировать или выберите из подсказок ниже:';
            botMsg.innerHTML=fallback;
            chatHistory.push({role:'bot',text:'Не нашёл ответа'});
        }
        chatEl.appendChild(botMsg);
        chatEl.scrollTop=chatEl.scrollHeight;

        try{localStorage.setItem(CHAT_KEY,JSON.stringify(chatHistory.slice(-30)));}catch(e){}
    },600);
};

/* ═══════════════════════════════════════════════════════════
   БЕЗОПАСНОСТЬ
   ═══════════════════════════════════════════════════════════ */
async function render2FATab(){
    var statusEl=document.getElementById('pf-2fa-status');
    var switchEl=document.getElementById('pf-switch-2fa');
    var devicesEl=document.getElementById('pf-trusted-devices');
    if(!statusEl)return;
    try{
        var r=await apiGet('user_2fa?user_id=eq.'+currentUser.id+'&select=*',currentUser._token);
        var enabled=r&&r[0]&&r[0].email_2fa_enabled;
        if(enabled){statusEl.innerHTML='<div class="pf-badge-2fa">✅ 2FA включена</div>';if(switchEl)switchEl.classList.add('on');}
        else{statusEl.innerHTML='<div class="pf-badge-2fa off">⚠️ 2FA выключена</div>';if(switchEl)switchEl.classList.remove('on');}
        if(devicesEl){
            var devRes=await apiGet('linked_devices?user_id=eq.'+currentUser.id+'&select=*&order=last_active.desc',currentUser._token);
            var devices=devRes||[];
            if(devices.length>0){
                devicesEl.innerHTML=devices.map(function(d){
                    return '<div class="pf-device"><div class="pf-device-icon">📱</div><div class="pf-device-info"><div style="font-weight:700;font-size:.9rem;">'+esc(d.device_name||'Устройство')+'</div><div style="font-size:.75rem;color:#888;">'+new Date(d.last_active).toLocaleString('ru-RU')+'</div></div><button class="pf-icon-btn danger" onclick="pfRemoveDevice('+d.id+')">✕</button></div>';
                }).join('');
            }else{
                devicesEl.innerHTML='<p style="color:#888;text-align:center;padding:20px;">Нет привязанных устройств</p>';
            }
        }
    }catch(e){statusEl.innerHTML='<div class="pf-badge-2fa off">⚠️ Ошибка загрузки</div>';}
}

window.pfRemoveDevice=async function(id){
    try{await apiDelete('linked_devices?id=eq.'+id,currentUser._token);toast('🗑️ Удалено','info');render2FATab();}
    catch(e){toast('Ошибка','error');}
};
window.pfClearTrustedDevices=function(){
    showModal({title:'Удалить все устройства?',sub:'Придётся заново подтверждать вход.',fields:[],okText:'Удалить',
        onOk:async function(){try{await apiDelete('linked_devices?user_id=eq.'+currentUser.id,currentUser._token);toast('🗑️ Удалено','info');render2FATab();}catch(e){toast('Ошибка','error');}}
    });
};
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
                    if(r&&r[0])await apiPatch('user_2fa?user_id=eq.'+currentUser.id,{email_2fa_enabled:newVal,updated_at:new Date().toISOString()},currentUser._token);
                    else await apiPost('user_2fa',{user_id:currentUser.id,email_2fa_enabled:newVal,updated_at:new Date().toISOString()},currentUser._token);
                    toast(newVal?'✅ Включена!':'🔓 Выключена',newVal?'success':'info');
                    render2FATab();
                }catch(e){toast('Ошибка: '+e.message,'error');}
            }
        });
    }catch(e){toast('Ошибка: '+e.message,'error');}
};
window.pfChangePassword=function(){
    showModal({
        title:'🔑 Смена пароля',
        sub:'Отправим ссылку для сброса на ваш email: '+(currentUser.email||''),
        fields:[],okText:'Отправить',
        onOk:async function(){
            try{
                if(window.supabaseClient&&window.supabaseClient.auth){
                    await window.supabaseClient.auth.resetPasswordForEmail(currentUser.email,{
                        redirectTo:window.location.origin+'/profile/'
                    });
                    toast('📧 Письмо отправлено!','success');
                }else{
                    toast('Войдите заново','error');
                }
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};

window.pfOpenDeviceLink=function(){
    if(window.marsLinkDevice&&typeof window.marsLinkDevice.open==='function'){
        window.marsLinkDevice.open((currentUser&&currentUser.email)||'');
        return;
    }
    if(window.marsQrScanner&&window.marsQrScanner.isMobile){
        window.marsQrScanner.open();
        return;
    }
    toast('Модуль QR не загружен','info');
};

/* ═══════════════════════════════════════════════════════════
   ЗАМЕТКИ / УДАЛЕНИЕ АККАУНТА / ВЫХОД
   ═══════════════════════════════════════════════════════════ */
window.pfOpenNoteForm=function(id){
    var n=id?notes.find(function(x){return x.id===id;}):null;
    showModal({
        title:n?'Редактировать заметку':'Новая заметка',
        fields:[
            {name:'title',value:n?(n.title||''):'',placeholder:'Заголовок',max:100},
            {name:'content',type:'textarea',value:n?(n.content||''):'',placeholder:'Текст...',max:5000}
        ],
        onOk:async function(v){
            if(!v.content){toast('Введите текст','error');return;}
            try{
                if(id)await apiPatch('user_notes?id=eq.'+id,{title:v.title,content:v.content,updated_at:new Date().toISOString()},currentUser._token);
                else await apiPost('user_notes',{user_id:currentUser.id,title:v.title,content:v.content},currentUser._token);
                toast('✅ Сохранено!','success');
                setTimeout(function(){location.reload();},400);
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};
window.pfEditNote=function(id){pfOpenNoteForm(id);};
window.pfPinNote=async function(id){
    var n=notes.find(function(x){return x.id===id;});if(!n)return;
    try{await apiPatch('user_notes?id=eq.'+id,{pinned:!n.pinned},currentUser._token);setTimeout(function(){location.reload();},300);}catch(e){toast('Ошибка','error');}
};
window.pfDeleteNote=function(id){
    showModal({title:'Удалить заметку?',sub:'Необратимо.',fields:[],okText:'Удалить',
        onOk:async function(){try{await apiDelete('user_notes?id=eq.'+id,currentUser._token);setTimeout(function(){location.reload();},300);}catch(e){toast('Ошибка','error');}}
    });
};

window.pfDeleteAccount=function(){
    showModal({
        title:'⚠️ Удалить аккаунт?',sub:'Необратимо. Введите email:',
        fields:[{name:'email',type:'email',placeholder:currentUser.email,max:100}],okText:'Удалить',
        onOk:async function(v){
            if(v.email!==currentUser.email){toast('Email не совпадает','error');return;}
            try{
                var res=await fetchRetry(SUPABASE_URL+'/functions/v1/delete-user',{method:'DELETE',headers:{'Authorization':'Bearer '+currentUser._token}},1);
                var json=await res.json();
                if(json.error)throw new Error(json.error);
                pfLogout();
            }catch(e){toast('Ошибка: '+e.message,'error');}
        }
    });
};

window.pfLogout=function(){
    [MY_KEY,SB_KEY,BACKUP_KEY,PROFILE_CACHE_KEY].forEach(function(k){
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
        onOk:async function(){try{await apiDelete('guilds?id=eq.'+guild.id,currentUser._token);toast('🗑️ Удалена','info');setTimeout(function(){location.reload();},500);}catch(e){toast('Ошибка','error');}}
    });
};

/* ═══════════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════════ */
function showModal(opts){
    var bg=document.createElement('div');bg.className='pf-modal-bg';
    var m=document.createElement('div');m.className='pf-modal';
    var fieldsHtml='';
    (opts.fields||[]).forEach(function(f){
        var val=escAttr(f.value||'');
        if(f.type==='textarea')fieldsHtml+='<textarea class="pf-modal-input" id="m-'+f.name+'" placeholder="'+escAttr(f.placeholder||'')+'" maxlength="'+(f.max||5000)+'">'+val+'</textarea>';
        else fieldsHtml+='<input type="'+(f.type||'text')+'" class="pf-modal-input" id="m-'+f.name+'" placeholder="'+escAttr(f.placeholder||'')+'" value="'+val+'" maxlength="'+(f.max||200)+'">';
    });
    m.innerHTML='<h3>'+esc(opts.title||'')+'</h3>'+(opts.sub?'<p>'+esc(opts.sub)+'</p>':'')+fieldsHtml+
        '<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" id="m-cancel">Отмена</button><button class="pf-btn" id="m-ok">'+esc(opts.okText||'Сохранить')+'</button></div>';
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

/* ═══════════════════════════════════════════════════════════
   ЗАГРУЗКА ДАННЫХ
   ═══════════════════════════════════════════════════════════ */
async function loadFriends(){
    try{
        var res=await apiGet('friendships?or=(user_id.eq.'+currentUser.id+',friend_id.eq.'+currentUser.id+')&select=*',currentUser._token);
        if(!res||!res.length){friends=[];friendRequests=[];return;}
        var ids={};
        res.forEach(function(f){ids[f.user_id]=true;ids[f.friend_id]=true;});
        delete ids[currentUser.id];
        var idArr=Object.keys(ids);
        if(!idArr.length){friends=[];friendRequests=[];return;}
        var profiles=await apiGet('profiles?user_id=in.('+idArr.join(',')+')&select=user_id,display_name,username,avatar_url',currentUser._token);
        var pmap={};(profiles||[]).forEach(function(p){pmap[p.user_id]=p;});
        friends=[];
        friendRequests=[];
        res.forEach(function(f){
            var otherId=f.user_id===currentUser.id?f.friend_id:f.user_id;
            var item=Object.assign({},f,{other:Object.assign({user_id:otherId},pmap[otherId]||{})});
            if(f.status==='accepted')friends.push(item);
            else if(f.status==='pending'&&f.friend_id===currentUser.id)friendRequests.push(item);
        });
    }catch(e){friends=[];friendRequests=[];}
}

async function loadAll(session,opts){
    opts=opts||{};
    var silent=!!opts.silent;
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

        var uaRes=results[0]||[];
        notes=results[1]||[];
        notifications=results[2]||[];
        leaders=results[3]||[];
        streak=(results[4]&&results[4][0]&&results[4][0].streak)||0;
        var guildMember=results[5]&&results[5][0];
        currency=(results[6]&&results[6][0]&&results[6][0].clay_talents)||0;

        // Достижения — сопоставляем с ALL_ACHIEVEMENTS
        if(uaRes.length){
            achievements=uaRes.map(function(x){
                var meta=ALL_ACHIEVEMENTS.filter(function(a){return a.id===x.achievement_id;})[0]||{};
                return Object.assign({},meta,{achievement_id:x.achievement_id,earned_at:x.earned_at});
            });
        } else {
            achievements=[];
        }

        // Гильдия
        if(guildMember&&guildMember.guild_id){
            try{
                var gr=await apiGet('guilds?id=eq.'+guildMember.guild_id+'&select=*',session.access_token);
                guild=gr&&gr[0];
                if(guild){
                    var mr=await apiGet('guild_members?guild_id=eq.'+guild.id+'&select=user_id,role&limit=50',session.access_token);
                    guildMembers=mr||[];
                }
            }catch(e){}
        }

        // Друзья
        await loadFriends();

        if(!silent)render();
        else {
            // Проверяем изменилось ли что-то важное
            render();
        }

    }catch(e){console.warn('[profile] bg load:',e.message);}
}

/* ═══════════════════════════════════════════════════════════
   КЭШ + СКЕЛЕТОН
   ═══════════════════════════════════════════════════════════ */
function renderFromCache(session){
    var c=readCache(PROFILE_CACHE_KEY,24*60*60*1000);
    if(!c||!c.profile||!c.user||c.user.id!==session.user.id)return false;
    currentUser=session.user;
    currentUser._token=session.access_token;
    currentProfile=c.profile;
    return true;
}

function renderSkeleton(){
    container.innerHTML=
        '<div class="pf-skel" style="height:220px;"></div>'+
        '<div class="pf-skel" style="height:180px;"></div>'+
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">'+
        '<div class="pf-skel" style="height:70px;"></div><div class="pf-skel" style="height:70px;"></div><div class="pf-skel" style="height:70px;"></div><div class="pf-skel" style="height:70px;"></div>'+
        '</div>'+
        '<div class="pf-skel" style="height:60px;margin-bottom:20px;"></div>'+
        '<div class="pf-skel" style="height:150px;"></div>';
}

function showLogin(){
    container.innerHTML='<div style="max-width:400px;margin:60px auto;padding:40px 28px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);">'+
        '<div style="font-size:4rem;margin-bottom:12px;">🔒</div>'+
        '<h2 style="margin:0 0 8px 0;color:#2c3e50;">Вы не вошли</h2>'+
        '<p style="color:#888;margin:0 0 20px 0;">Войдите, чтобы просмотреть профиль</p>'+
        '<a href="/login/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">🔐 Войти</a></div>';
}

function showError(msg){
    container.innerHTML='<div style="max-width:400px;margin:60px auto;padding:40px 28px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);">'+
        '<div style="font-size:4rem;margin-bottom:12px;">⚠️</div>'+
        '<h2 style="margin:0 0 8px 0;color:#2c3e50;">Не удалось загрузить</h2>'+
        '<p style="color:#888;margin:0 0 20px 0;word-break:break-word;">'+esc(msg)+'</p>'+
        '<button onclick="location.reload()" style="padding:13px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer;font-family:inherit;">🔄 Обновить</button></div>';
}

async function waitSession(maxMs){
    var s=readSession();if(s)return s;
    var start=Date.now();
    while(Date.now()-start<maxMs){
        await new Promise(function(r){setTimeout(r,250);});
        s=readSession();if(s)return s;
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
    // Свежий кэш → мгновенный рендер без мигания
    var freshCache=readCache(PROFILE_CACHE_KEY,2*60*1000);
    if(freshCache&&freshCache.profile&&freshCache.user&&freshCache.user.id===session.user.id){
        currentUser=session.user;
        currentUser._token=session.access_token;
        currentProfile=freshCache.profile;
        render();
        loadAll(session,{silent:true}).catch(function(){});
        return;
    }
    if(renderFromCache(session)){
        render();
        loadAll(session,{silent:true}).catch(function(){});
        return;
    }
    renderSkeleton();
    try{await loadAll(session);}catch(e){showError(e.message);}
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
</script>

<script>
setTimeout(function(){if(typeof window.refreshAuthButton==='function')window.refreshAuthButton();},800);
</script>
