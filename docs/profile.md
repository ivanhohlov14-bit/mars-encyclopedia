---
title: Мой профиль
comments: false
---

<div id="profile-app" style="max-width: 1100px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: pfSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка профиля...</p>
    </div>
</div>

<style>
:root{--kingdom-color:#6C63FF;--kingdom-bg:#F0F4FF;--kingdom-light:#A29BFE;--kingdom-shadow:rgba(108,99,255,.25)}
@keyframes pfSpin{to{transform:rotate(360deg)}}
@keyframes pfFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes pfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pfSlide{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
.pf-fade{animation:pfFadeIn .5s cubic-bezier(.16,1,.3,1) both}
.pf-slide{animation:pfSlide .4s ease both}
#profile-app a{text-decoration:none!important;border-bottom:none!important}

/* HERO */
.pf-hero{position:relative;background:linear-gradient(135deg,#1a1a2e 0%,#2d1b3d 40%,#4a2a3a 100%);border-radius:24px;padding:44px 40px;color:#fff;margin-bottom:24px;overflow:hidden;box-shadow:0 20px 60px -12px rgba(0,0,0,.4)}
.pf-hero::before{content:'';position:absolute;top:-60%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,var(--kingdom-shadow),transparent 70%);border-radius:50%;animation:pfFloat 8s ease-in-out infinite}
.pf-hero::after{content:'';position:absolute;bottom:-60%;left:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(231,76,60,.15),transparent 70%);border-radius:50%;animation:pfFloat 10s ease-in-out infinite reverse}
.pf-hero-content{position:relative;z-index:2;display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.pf-avatar-wrap{position:relative;flex-shrink:0;animation:pfPulse 3s ease-in-out infinite}
.pf-avatar{width:120px;height:120px;border-radius:50%;border:4px solid rgba(255,255,255,.4);object-fit:cover;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.2)}
.pf-level-badge{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:var(--kingdom-color);padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:800;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.15);border:2px solid rgba(255,255,255,.5)}
.pf-info{flex:1;min-width:200px}
.pf-name{font-size:2rem;font-weight:800;margin:0 0 6px 0;color:#fff;display:flex;align-items:center;gap:12px;flex-wrap:wrap;letter-spacing:-.5px}
.pf-role-badge{background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;padding:4px 14px;border-radius:20px;font-size:.7rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.pf-mod-badge{background:rgba(255,255,255,.2);backdrop-filter:blur(8px);color:#fff;padding:4px 14px;border-radius:20px;font-size:.7rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase;border:1px solid rgba(255,255,255,.35)}
.pf-guild-badge{background:rgba(255,255,255,.25);backdrop-filter:blur(8px);color:#fff;padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:700;display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(255,255,255,.3);cursor:pointer}
.pf-email{font-size:.9rem;opacity:.85;margin:0 0 16px 0}
.pf-stats-row{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px}
.pf-stat-mini{display:flex;flex-direction:column;gap:2px}
.pf-stat-mini .pf-sm-label{font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600}
.pf-stat-mini .pf-sm-value{font-size:1.4rem;font-weight:800;letter-spacing:-.5px}
.pf-progress{background:rgba(255,255,255,.2);border-radius:12px;height:12px;overflow:hidden;position:relative;backdrop-filter:blur(8px);margin-bottom:6px}
.pf-progress-bar{height:100%;background:linear-gradient(90deg,var(--kingdom-light),#fff);border-radius:12px;transition:width 1.2s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px rgba(255,255,255,.6)}
.pf-progress-text{font-size:.78rem;opacity:.9}

/* QUICK GRID */
.pf-quick-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:24px}
.pf-quick-card{display:flex;align-items:center;gap:12px;padding:16px 18px;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-radius:16px;border:2px solid transparent;color:inherit;transition:all .3s;box-shadow:0 4px 12px rgba(0,0,0,.05);cursor:pointer}
.pf-quick-card:hover{transform:translateY(-4px);border-color:var(--kingdom-color);box-shadow:0 12px 32px -8px var(--kingdom-shadow)}
.pf-quick-icon{font-size:1.8rem;transition:transform .3s}
.pf-quick-card:hover .pf-quick-icon{transform:scale(1.15) rotate(-6deg)}
.pf-quick-body{flex:1;min-width:0}
.pf-quick-title{font-size:.9rem;font-weight:800;color:#1a1a1a;margin-bottom:2px}
.pf-quick-desc{font-size:.72rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* TABS — с горизонтальной прокруткой */
.pf-tabs{display:flex;gap:4px;margin-bottom:20px;overflow-x:auto;padding:6px;background:rgba(255,255,255,.7);backdrop-filter:blur(12px);border-radius:16px;border:1px solid rgba(0,0,0,.05);cursor:grab;scroll-behavior:smooth}
.pf-tabs::-webkit-scrollbar{height:4px}
.pf-tabs::-webkit-scrollbar-thumb{background:var(--kingdom-color);border-radius:2px}
.pf-tab{flex-shrink:0;padding:10px 16px;border:none;background:transparent;color:#666;font-size:.85rem;font-weight:700;border-radius:12px;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:6px;font-family:inherit;position:relative}
.pf-tab:hover{background:rgba(0,0,0,.04);color:#333}
.pf-tab.active{background:linear-gradient(135deg,var(--kingdom-color),var(--kingdom-light));color:#fff;box-shadow:0 6px 16px -4px var(--kingdom-shadow)}
.pf-tab-count{background:rgba(255,255,255,.25);padding:1px 7px;border-radius:10px;font-size:.7rem}
.pf-tab-content{display:none;animation:pfFadeIn .4s ease}
.pf-tab-content.active{display:block}

/* CARDS */
.pf-card{background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:22px 26px;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:box-shadow .3s}
.pf-card:hover{box-shadow:0 12px 32px -8px var(--kingdom-shadow)}
.pf-card-title{font-size:1.1rem;font-weight:800;color:#1a1a1a;margin:0 0 16px 0;display:flex;align-items:center;gap:10px}
.pf-card-title .pf-ct-icon{font-size:1.4rem}

/* BUTTONS */
.pf-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:30px;border:2px solid var(--kingdom-color);background:var(--kingdom-color);color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;transition:all .25s;font-family:inherit}
.pf-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--kingdom-shadow)}
.pf-btn-outline{background:transparent;color:var(--kingdom-color)}
.pf-btn-outline:hover{background:var(--kingdom-color);color:#fff}
.pf-btn-danger{background:#e74c3c;border-color:#e74c3c}

/* ACTIVITY TIMER */
.pf-timer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:16px}
.pf-timer-card{background:linear-gradient(135deg,rgba(108,99,255,.06),rgba(162,155,254,.03));border:1px solid rgba(108,99,255,.15);border-radius:14px;padding:16px 18px;text-align:center}
.pf-timer-value{font-size:1.8rem;font-weight:900;color:var(--kingdom-color);line-height:1}
.pf-timer-label{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;margin-top:6px;font-weight:600}
.pf-timer-sub{font-size:.75rem;color:#aaa;margin-top:4px}
.pf-activity-bars{display:flex;align-items:flex-end;gap:3px;height:80px;margin-top:16px;padding:10px 0}
.pf-activity-bar{flex:1;background:linear-gradient(180deg,var(--kingdom-light),var(--kingdom-color));border-radius:3px 3px 0 0;min-height:4px;transition:height .5s;position:relative;cursor:pointer}
.pf-activity-bar:hover{filter:brightness(1.15)}
.pf-activity-bar::after{content:attr(data-label);position:absolute;bottom:100%;left:50%;transform:translateX(-50%);font-size:.65rem;color:#666;white-space:nowrap;opacity:0;transition:opacity .2s;pointer-events:none;background:#fff;padding:2px 6px;border-radius:4px;box-shadow:0 2px 6px rgba(0,0,0,.1)}
.pf-activity-bar:hover::after{opacity:1}

/* AVATAR */
.pf-avatar-grid{display:flex;gap:12px;flex-wrap:wrap}
.pf-avatar-option{width:60px;height:60px;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s}
.pf-avatar-option:hover{transform:scale(1.1);border-color:var(--kingdom-color)}
.pf-avatar-option.selected{border-color:var(--kingdom-color);box-shadow:0 0 0 4px var(--kingdom-shadow)}

/* KINGDOM */
.pf-kingdom-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px}
.pf-kingdom-btn{padding:10px 12px;border-radius:10px;border:2px solid rgba(0,0,0,.08);background:rgba(255,255,255,.6);cursor:pointer;font-size:.8rem;font-weight:600;transition:all .25s;font-family:inherit;color:#333}
.pf-kingdom-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.1)}
.pf-kingdom-btn.selected{color:#fff;box-shadow:0 6px 16px -4px var(--kingdom-shadow)}

/* ACHIEVEMENTS */
.pf-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.pf-ach{display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(255,255,255,.7);border-radius:12px;border:2px solid rgba(0,0,0,.04);transition:all .25s}
.pf-ach:hover{transform:translateY(-3px);border-color:var(--kingdom-color);box-shadow:0 12px 28px -8px var(--kingdom-shadow)}
.pf-ach.locked{opacity:.45;filter:grayscale(.6)}
.pf-ach .pf-ach-icon{font-size:1.8rem}
.pf-ach .pf-ach-name{font-size:.85rem;font-weight:700;color:#1a1a1a}
.pf-ach .pf-ach-date{font-size:.7rem;color:#888}

/* NOTIFICATIONS */
.pf-notif{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px;transition:all .2s;cursor:pointer}
.pf-notif:hover{background:rgba(108,99,255,.08)}
.pf-notif.unread{border-left:3px solid var(--kingdom-color);background:rgba(108,99,255,.05)}
.pf-notif-icon{font-size:1.3rem}
.pf-notif-text{font-size:.88rem;color:#333}
.pf-notif-date{font-size:.72rem;color:#999;margin-top:2px}

/* CHAT */
.pf-chat{background:linear-gradient(135deg,var(--kingdom-bg),rgba(255,255,255,.6));border-radius:14px;padding:14px;max-height:400px;overflow-y:auto;margin-bottom:12px;border:1px solid rgba(0,0,0,.05)}
.pf-chat-msg{margin:6px 0;padding:10px 14px;border-radius:14px;max-width:80%;word-wrap:break-word;font-size:.9rem;line-height:1.5}
.pf-chat-msg.user{background:var(--kingdom-color);color:#fff;margin-left:auto;border-bottom-right-radius:4px}
.pf-chat-msg.bot{background:#fff;color:#333;margin-right:auto;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.pf-chat-input{display:flex;gap:8px}
.pf-chat-input input{flex:1;padding:12px 18px;border:2px solid rgba(0,0,0,.08);border-radius:30px;font-size:.9rem;font-family:inherit;outline:none;background:#fff}
.pf-chat-input input:focus{border-color:var(--kingdom-color)}
.pf-chat-input button{padding:12px 24px;background:var(--kingdom-color);color:#fff;border:none;border-radius:30px;cursor:pointer;font-weight:700;font-family:inherit}

/* LEADERBOARD */
.pf-leaderboard{width:100%;border-collapse:collapse;font-size:.88rem}
.pf-leaderboard th{text-align:left;padding:10px 12px;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;border-bottom:2px solid var(--kingdom-color)}
.pf-leaderboard td{padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-leaderboard tr{cursor:pointer;transition:all .2s}
.pf-leaderboard tr:hover{background:var(--kingdom-color);color:#fff}
.pf-lb-avatar{width:28px;height:28px;border-radius:50%;vertical-align:middle;margin-right:8px;border:2px solid var(--kingdom-color);object-fit:cover}

/* CALENDAR */
.pf-calendar{text-align:center;padding:20px;background:linear-gradient(135deg,var(--kingdom-bg),rgba(255,255,255,.4));border-radius:14px;border:1px solid rgba(0,0,0,.05)}
.pf-cal-month{font-size:1.2rem;font-weight:800;color:var(--kingdom-color);margin-bottom:4px}
.pf-cal-day{font-size:2.5rem;font-weight:900;color:#1a1a1a;line-height:1;margin:6px 0}
.pf-cal-year{font-size:.9rem;color:#666;font-weight:600}
.pf-cal-season{display:inline-block;margin-top:12px;padding:5px 16px;background:var(--kingdom-color);color:#fff;border-radius:20px;font-size:.78rem;font-weight:700}

/* NOTES */
.pf-notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.pf-note{background:#fff;border-radius:12px;padding:16px;border-left:4px solid var(--note-color,var(--kingdom-color));box-shadow:0 4px 12px rgba(0,0,0,.06);transition:all .25s;cursor:pointer;min-height:120px;display:flex;flex-direction:column}
.pf-note:hover{transform:translateY(-3px);box-shadow:0 12px 28px -8px var(--kingdom-shadow)}
.pf-note.pinned{box-shadow:0 8px 24px -4px rgba(243,156,18,.4);border-left-color:#f39c12}
.pf-note-title{font-weight:800;font-size:.95rem;color:#1a1a1a;margin-bottom:6px}
.pf-note-content{font-size:.85rem;color:#555;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;flex:1;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.pf-note-date{font-size:.7rem;color:#999;margin-top:8px}
.pf-note-actions{display:flex;gap:4px;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08)}
.pf-note-btn{padding:4px 10px;border-radius:8px;border:none;background:rgba(0,0,0,.05);font-size:.72rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit;color:#666}
.pf-note-btn:hover{background:var(--kingdom-color);color:#fff}
.pf-note-btn.danger:hover{background:#e74c3c;color:#fff}
.pf-note-form{background:#fff;border-radius:14px;padding:20px;margin-bottom:16px;border:2px solid var(--kingdom-color);box-shadow:0 8px 24px -8px var(--kingdom-shadow);display:none}
.pf-note-form.open{display:block}
.pf-note-input{width:100%;padding:12px 16px;border-radius:10px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fafafa;margin-bottom:10px;box-sizing:border-box}
.pf-note-input:focus{border-color:var(--kingdom-color);background:#fff}
.pf-note-input.title{font-weight:700}
.pf-note-input.content{min-height:100px;resize:vertical}
.pf-note-colors{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.pf-note-color{width:32px;height:32px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:all .2s}
.pf-note-color:hover{transform:scale(1.15)}
.pf-note-color.selected{border-color:#333;transform:scale(1.15)}

/* GUILD */
.pf-guild-hero{background:linear-gradient(135deg,var(--guild-color,var(--kingdom-color)),rgba(0,0,0,.2));border-radius:16px;padding:24px 26px;color:#fff;margin-bottom:16px;display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.pf-guild-icon{width:70px;height:70px;border-radius:16px;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:2.4rem;border:2px solid rgba(255,255,255,.4);flex-shrink:0}
.pf-guild-info{flex:1;min-width:150px}
.pf-guild-name{font-size:1.4rem;font-weight:800;margin:0 0 4px 0}
.pf-guild-meta{font-size:.82rem;opacity:.9;display:flex;gap:12px;flex-wrap:wrap}

/* TOGGLE */
.pf-toggle{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-toggle:last-child{border-bottom:none}
.pf-toggle-label{font-size:.9rem;color:#333;font-weight:600}
.pf-toggle-desc{font-size:.75rem;color:#888;margin-top:2px}
.pf-switch{position:relative;width:48px;height:26px;background:rgba(0,0,0,.1);border-radius:26px;cursor:pointer;transition:all .3s;flex-shrink:0}
.pf-switch.on{background:var(--kingdom-color)}
.pf-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:all .3s;box-shadow:0 2px 4px rgba(0,0,0,.2)}
.pf-switch.on::after{left:25px}
.pf-badge-2fa{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:.8rem;font-weight:700;background:linear-gradient(135deg,#27ae60,#16a085);color:#fff}
.pf-badge-2fa.off{background:rgba(0,0,0,.08);color:#666}
.pf-danger{background:rgba(231,76,60,.05);border:2px solid rgba(231,76,60,.2);border-radius:14px;padding:16px 20px}

/* DARK THEME */
html body.mars-stars-on .pf-quick-card,
html body.mars-stars-on .pf-card,
html body.mars-stars-on .pf-tabs,
html body.mars-stars-on .pf-notif,
html body.mars-stars-on .pf-ach,
html body.mars-stars-on .pf-note,
html body.mars-stars-on .pf-chat,
html body.mars-stars-on .pf-note-form{
    background:rgba(20,15,35,.55)!important;
    border-color:rgba(162,155,254,.25)!important;
    color:#d4d4e8;
}
html body.mars-stars-on .pf-quick-title,
html body.mars-stars-on .pf-card-title,
html body.mars-stars-on .pf-ach-name,
html body.mars-stars-on .pf-note-title{color:#fff!important}
html body.mars-stars-on .pf-note-content,
html body.mars-stars-on .pf-notif-text{color:#b8b8d4!important}
html body.mars-stars-on .pf-chat-msg.bot{background:rgba(20,15,35,.8);color:#d4d4e8}
html body.mars-stars-on .pf-chat-input input{background:rgba(20,15,35,.6);color:#fff;border-color:rgba(162,155,254,.3)}
html body.mars-stars-on .pf-leaderboard td{border-bottom-color:rgba(162,155,254,.15);color:#d4d4e8}
html body.mars-stars-on .pf-kingdom-btn{background:rgba(20,15,35,.6);color:#d4d4e8;border-color:rgba(162,155,254,.3)}
html body.mars-stars-on .pf-timer-card{background:rgba(108,99,255,.1);border-color:rgba(162,155,254,.2)}
html body.mars-stars-on .pf-timer-value{color:#A29BFE}
html body.mars-stars-on .pf-activity-bar::after{background:#1a1a2e;color:#d4d4e8}

@media(max-width:600px){.pf-hero{padding:28px 22px}.pf-avatar{width:90px;height:90px}.pf-name{font-size:1.4rem}.pf-tabs{padding:4px}.pf-tab{padding:8px 12px;font-size:.78rem}.pf-card{padding:18px 16px}.pf-quick-grid{grid-template-columns:1fr}.pf-avatar-option{width:52px;height:52px}}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function(){
    'use strict';

    try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch(e) {}

    var SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    var SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    var KINGDOMS = {
        'Аркадия':{color:'#D4A574',bg:'#FDF8F0',light:'#E8C9A0',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-arcadia.png'},
        'Ксанф':{color:'#3D3D3D',bg:'#F5F5F5',light:'#6B6B6B',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/coat-of-arms-of-ksanf.png'},
        'Эдем':{color:'#F4A460',bg:'#FFF8F0',light:'#F7C98A',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eden.jpg'},
        'Эридания':{color:'#F5D76E',bg:'#FFFDF5',light:'#FAE9A0',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eridania.png'},
        'Кхонг':{color:'#A9A9A9',bg:'#F8F8F8',light:'#C8C8C8',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-khong.png'},
        'Авсония':{color:'#87CEEB',bg:'#F0F8FF',light:'#B0D8EB',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-avsonia.png'},
        'Кимерия':{color:'#B19CD9',bg:'#F8F4FF',light:'#D1C4E9',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-kimeria.png'},
        'Серпентида':{color:'#E57373',bg:'#FFF5F5',light:'#F5A0A0',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-serpentida.png'},
        'Эритрей':{color:'#64B5F6',bg:'#F0F8FF',light:'#90CAF9',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eritrea.png'},
        'Утопия':{color:'#4DD0E1',bg:'#F0FDFF',light:'#80DEEA',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-utopia.png'},
        'Эллада':{color:'#FF8A65',bg:'#FFF5F0',light:'#FFAB91',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-hellas.png'},
        'Аливасото':{color:'#81C784',bg:'#F0FFF0',light:'#A5D6A7',flag:'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-alivasoto.png'}
    };

    var AVATARS = ['/assets/images/авотарка%20девушки.png','/assets/images/мужчина.png','/assets/images/мужчина2.png','/assets/images/мужчина%203.png'];
    var NOTE_COLORS = ['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63'];

    // ============================================================
    // 100 УРОВНЕЙ — прогрессивная система
    // ============================================================
    var LEVELS = [];
    (function buildLevels() {
        var titles = [
            '🌱 Поселенец', '🔭 Исследователь', '🚀 Первопроходец', '🏠 Колонизатор',
            '⚡ Командир', '⚔️ Воин', '📜 Писец', '🔮 Мудрец',
            '👑 Аристократ', '🏛️ Сенатор', '💎 Магнат', '🌟 Звёздный лорд',
            '🐉 Дракон', '🔥 Феникс', '🌊 Повелитель морей', '⛰️ Владыка гор',
            '🗡️ Мастер клинка', '🏹 Мастер лука', '🛡️ Щитоносец', '🎯 Снайпер',
            '📖 Хронист', '🧙 Архимаг', '⚗️ Алхимик', '🔬 Учёный',
            '🎨 Художник', '🎵 Бард', '💀 Некромант', '👻 Призрачный страж',
            '🦅 Небесный всадник', '🐺 Вожак стаи', '🦁 Лев', '🐻 Медведь',
            '🦊 Хитрец', '🐍 Змей', '🦂 Скорпион', '🕷️ Ткач',
            '🌙 Лунный страж', '☀️ Солнечный рыцарь', '⭐ Звёздный магистр',
            '🌟 Великий магистр', '✨ Легенда', '💫 Миф', '🌟 Сияющий',
            '👼 Небожитель', '🔱 Владыка бездны', '👁️ Всевидящий', '🌌 Космический странник',
            '🌀 Повелитель бурь', '❄️ Ледяной король', '🌋 Огненный владыка', '🌪️ Властелин ветров',
            '⚡ Громовержец', '🌊 Океанский царь', '🌲 Лесной царь', '🌸 Цветущий',
            '🍂 Осенний странник', '🌾 Жнец', '🛠️ Кузнец судьбы', '⚙️ Мастер механизмов',
            '🏗️ Архитектор', '📐 Геометр', '🧮 Математик', '🎲 Игрок',
            '♟️ Стратег', '🎭 Актёр', '🎪 Циркач', '🎨 Творец',
            '📸 Хранитель мгновений', '🎬 Режиссёр', '🎤 Певец', '🕺 Танцор',
            '🍀 Счастливчик', '🎰 Джекпот', '💎 Алмазный', '👑 Император',
            '🏆 Чемпион', '🥇 Олимпиец', '🌟 Суперзвезда', '💫 Галактический',
            '🌌 Межгалактический', '🔮 Провидческий', '🧿 Оберегающий', '📿 Святой',
            '🕊️ Ангельский', '🔥 Демонический', '⚡ Божественный', '🌠 Метеорный',
            '☄️ Комета', '🌍 Планетарный', '🌞 Звёздный', '🌌 Галактический',
            '💥 Сверхновая', '🌀 Сингулярность', '🔱 Титан', '👁️ Древний',
            '🌟 Вечный', '✨ Бесконечный', '💫 Абсолютный', '🔮 Легендарный',
            '👑 Божественный', '🌌 Вселенский', '⭐ Величайший', '🏆 Непобедимый'
        ];

        // XP с прогрессией: level^1.8 * 20
        for (var i = 1; i <= 100; i++) {
            var xp = Math.floor(Math.pow(i, 1.8) * 20);
            LEVELS.push({
                level: i,
                xp: xp,
                title: titles[i - 1] || ('Уровень ' + i)
            });
        }
    })();

    function getLevelInfo(exp){
        var idx = 0;
        for (var i = LEVELS.length - 1; i >= 0; i--) {
            if (exp >= LEVELS[i].xp) { idx = i; break; }
        }
        var cur = LEVELS[idx];
        var next = LEVELS[idx + 1] || { xp: cur.xp + 1000 };
        var range = next.xp - cur.xp;
        return {
            level: cur.level,
            title: cur.title,
            current: cur.xp,
            next: next.xp,
            percent: range > 0 ? Math.min(((exp - cur.xp) / range) * 100, 100) : 100
        };
    }

    function getMartianDate(){
        var months = ['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];
        var days = [31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];
        var MD = days.reduce(function(s,d){return s+d;},0);
        var EY = 668.6;
        var now = new Date();
        var daysFrom = (now - new Date(2026,0,1)) / 86400000;
        var year = Math.floor(3798000000 + 2740 + daysFrom / EY);
        var dayOfYear = Math.floor((daysFrom * (MD / EY)) % MD);
        var rem = dayOfYear, mi = 0;
        for(var i = 0; i < days.length; i++){ if(rem < days[i]){ mi = i; break; } rem -= days[i]; }
        var seasons = ['Пробуждение','Цветение','Зной','Ветры','Угасание','Заморозки','Тьма','Ледяной покров'];
        return { year: year.toLocaleString(), month: months[mi], day: rem + 1, season: seasons[Math.floor(mi/2) % seasons.length] };
    }

    // ============================================================
    // ТРЕКЕР ВРЕМЕНИ НА САЙТЕ
    // ============================================================
    var sessionStart = Date.now();
    var totalTime = 0; // в секундах
    var _visitStart = 0;
    var _isActive = true;
    var _activityInterval = null;

    // Загружаем общее время из localStorage
    try {
        var savedTime = localStorage.getItem('mars_total_time');
        if (savedTime) totalTime = parseInt(savedTime, 10) || 0;
    } catch(e) {}

    function formatDuration(seconds) {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = seconds % 60;
        if (h > 0) return h + 'ч ' + m + 'м';
        if (m > 0) return m + 'м ' + s + 'с';
        return s + 'с';
    }

    function startTimer() {
        _visitStart = Date.now();
        _isActive = true;

        // Каждую секунду увеличиваем время, если вкладка активна
        if (_activityInterval) clearInterval(_activityInterval);
        _activityInterval = setInterval(function() {
            if (!_isActive) return;
            var elapsed = Math.floor((Date.now() - _visitStart) / 1000);
            totalTime = (totalTime || 0) + 1;
            // Синхронизируем с localStorage каждые 5 секунд
            if (totalTime % 5 === 0) {
                try { localStorage.setItem('mars_total_time', totalTime); } catch(e) {}
            }
            updateTimerDisplay();
        }, 1000);

        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                _isActive = false;
            } else {
                _isActive = true;
                _visitStart = Date.now();
            }
        });

        window.addEventListener('beforeunload', function() {
            try { localStorage.setItem('mars_total_time', totalTime); } catch(e) {}
        });
    }

    function updateTimerDisplay() {
        var el = document.getElementById('pf-timer-total');
        if (el) el.textContent = formatDuration(totalTime);
        var el2 = document.getElementById('pf-timer-session');
        if (el2) el2.textContent = formatDuration(Math.floor((Date.now() - sessionStart) / 1000));
    }

    function showToast(msg, type){
        type = type || 'info';
        var colors = { success:'linear-gradient(135deg,#27ae60,#16a085)', info:'linear-gradient(135deg,#3498db,#2980b9)', warning:'linear-gradient(135deg,#e67e22,#d35400)', error:'linear-gradient(135deg,#e74c3c,#c0392b)' };
        var t = document.createElement('div');
        t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:' + (colors[type] || colors.info) + ';color:#fff;padding:12px 26px;border-radius:30px;font-weight:600;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:99999;transition:transform .4s;pointer-events:none;';
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(function(){ t.style.transform = 'translateX(-50%) translateY(0)'; });
        setTimeout(function(){ t.style.transform = 'translateX(-50%) translateY(100px)'; setTimeout(function(){ t.remove(); }, 400); }, 2400);
    }

    function escapeHtml(s){
        return String(s || '').replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
    }

    function isModerator() {
        return currentProfile && (currentProfile.role === 'moderator' || currentProfile.role === 'admin');
    }

    var container = document.getElementById('profile-app');
    var client = null;
    var currentUser = null, currentProfile = null, kingdom = KINGDOMS['Эдем'];
    var achievementsList = [], notifications = [], leaders = [], guild = null, guildMembers = [], friends = [], notes = [], streak = 0;
    var privacy = {}, preferences = {};
    var editingNoteId = null, selectedNoteColor = '#6C63FF';
    var modStats = { pendingSubmissions: 0, hiddenComments: 0, bannedUsers: 0 };

    // ============================================================
    // ЗАГРУЗКА ДАННЫХ
    // ============================================================
    async function loadAllData(user){
        console.log('⏱️ Загрузка профиля...');
        try{
            var cached = localStorage.getItem('pf_cache_' + user.id);
            if(cached){
                var d = JSON.parse(cached);
                currentProfile = d.currentProfile || null;
                if(currentProfile && currentProfile.kingdom && KINGDOMS[currentProfile.kingdom]) kingdom = KINGDOMS[currentProfile.kingdom];
                achievementsList = d.achievementsList || [];
                notifications = d.notifications || [];
                leaders = d.leaders || [];
                guild = d.guild || null;
                guildMembers = d.guildMembers || [];
                friends = d.friends || [];
                notes = d.notes || [];
                streak = d.streak || 0;
                privacy = d.privacy || {};
                preferences = d.preferences || {};
            }
        }catch(e){}

        var timeout = function(ms){ return new Promise(function(_,rej){ setTimeout(function(){ rej(new Error('timeout')); }, ms); }); };

        var results;
        try {
            results = await Promise.all([
                Promise.race([client.from('profiles').select('*').eq('user_id', user.id).single(), timeout(12000)]).catch(function(){ return {data:null}; }),
                Promise.race([client.from('user_achievements').select('achievement_id, earned_at').eq('user_id', user.id).order('earned_at', { ascending: false }), timeout(12000)]).catch(function(){ return {data:[]}; }),
                Promise.race([client.from('user_notes').select('*').eq('user_id', user.id).order('pinned', { ascending: false }).order('updated_at', { ascending: false }), timeout(12000)]).catch(function(){ return {data:[]}; }),
                Promise.race([client.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10), timeout(12000)]).catch(function(){ return {data:[]}; }),
                Promise.race([client.from('profiles').select('user_id, username, display_name, experience, level, avatar_url').order('experience', { ascending: false }).limit(10), timeout(12000)]).catch(function(){ return {data:[]}; }),
                Promise.race([client.from('daily_logins').select('streak').eq('user_id', user.id).order('login_date', { ascending: false }).limit(1), timeout(12000)]).catch(function(){ return {data:[]}; }),
                Promise.race([client.from('user_privacy').select('*').eq('user_id', user.id).maybeSingle(), timeout(12000)]).catch(function(){ return {data:null}; }),
                Promise.race([client.from('user_preferences').select('*').eq('user_id', user.id).maybeSingle(), timeout(12000)]).catch(function(){ return {data:null}; }),
                Promise.race([client.from('guild_members').select('guild_id').eq('user_id', user.id).maybeSingle(), timeout(12000)]).catch(function(){ return {data:null}; }),
                Promise.race([client.from('friends').select('*').or('user_id.eq.' + user.id + ',friend_id.eq.' + user.id), timeout(12000)]).catch(function(){ return {data:[]}; })
            ]);
        } catch(e) {
            results = [];
        }

        var profileRes = results[0] || {data:null};
        var uaRes = results[1] || {data:[]};
        var notesRes = results[2] || {data:[]};
        var notifRes = results[3] || {data:[]};
        var leadersRes = results[4] || {data:[]};
        var streakRes = results[5] || {data:[]};
        var privacyRes = results[6] || {data:null};
        var prefsRes = results[7] || {data:null};
        var guildRes = results[8] || {data:null};
        var friendsRes = results[9] || {data:[]};

        if (profileRes && profileRes.data) {
            currentProfile = profileRes.data;
            if (currentProfile.kingdom && KINGDOMS[currentProfile.kingdom]) kingdom = KINGDOMS[currentProfile.kingdom];
        }

        if (!currentProfile) {
            try {
                var newProfileRes = await client.from('profiles').insert([{
                    user_id: user.id,
                    username: user.email.split('@')[0],
                    display_name: user.email.split('@')[0]
                }]).select().single();
                if (newProfileRes.data) currentProfile = newProfileRes.data;
            } catch(e) {}
        }

        if (!currentProfile) {
            container.innerHTML = '<div style="text-align:center;padding:60px 20px;"><h2>Профиль не найден</h2><a href="/login/" style="display:inline-block;margin-top:16px;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">🔐 Войти</a></div>';
            return;
        }

        if (uaRes && uaRes.data && uaRes.data.length > 0) {
            try {
                var ids = uaRes.data.map(function(x){ return x.achievement_id; });
                var metaRes = await client.from('achievements').select('*').in('id', ids);
                var map = {};
                (metaRes.data || []).forEach(function(m){ map[m.id] = m; });
                achievementsList = uaRes.data.map(function(x){ return Object.assign({}, map[x.achievement_id], { earned_at: x.earned_at }); }).filter(function(x){ return x.id; });
            } catch(e) {}
        }

        notes = (notesRes && notesRes.data) || [];
        notifications = (notifRes && notifRes.data) || [];
        leaders = (leadersRes && leadersRes.data) || [];
        streak = (streakRes && streakRes.data && streakRes.data[0]) ? streakRes.data[0].streak : 0;
        privacy = (privacyRes && privacyRes.data) || {};
        preferences = (prefsRes && prefsRes.data) || {};

        if (guildRes && guildRes.data && guildRes.data.guild_id) {
            try {
                var gRes = await client.from('guilds').select('*').eq('id', guildRes.data.guild_id).single();
                guild = gRes.data;
                if (guild) {
                    var mRes = await client.from('guild_members').select('user_id, role, joined_at').eq('guild_id', guild.id).order('joined_at', { ascending: true }).limit(50);
                    if (mRes.data && mRes.data.length > 0) {
                        var mids = mRes.data.map(function(m){ return m.user_id; });
                        var pRes = await client.from('profiles').select('user_id, display_name, username, avatar_url').in('user_id', mids);
                        var pmap = {};
                        (pRes.data || []).forEach(function(p){ pmap[p.user_id] = p; });
                        guildMembers = mRes.data.map(function(m){ return Object.assign({}, m, { profile: pmap[m.user_id] || {} }); });
                    }
                }
            } catch(e) {}
        }

        if (friendsRes && friendsRes.data && friendsRes.data.length > 0) {
            try {
                var fids = {};
                friendsRes.data.forEach(function(f){ fids[f.user_id] = true; fids[f.friend_id] = true; });
                delete fids[user.id];
                var idArr = Object.keys(fids);
                if (idArr.length > 0) {
                    var fpRes = await client.from('profiles').select('user_id, display_name, username, avatar_url').in('user_id', idArr);
                    var fmap = {};
                    (fpRes.data || []).forEach(function(p){ fmap[p.user_id] = p; });
                    friends = friendsRes.data.map(function(f){
                        var otherId = f.user_id === user.id ? f.friend_id : f.user_id;
                        return Object.assign({}, f, { other: fmap[otherId] || { user_id: otherId } });
                    });
                }
            } catch(e) {}
        }

        if (isModerator()) {
            try {
                var pendingRes = await client.from('list_submissions').select('id', { count: 'exact', head: true }).eq('status', 'pending');
                var hiddenRes = await client.from('comments').select('id', { count: 'exact', head: true }).eq('is_hidden', true);
                var bannedRes = await client.from('profiles').select('user_id', { count: 'exact', head: true }).eq('is_banned', true);
                modStats.pendingSubmissions = pendingRes.count || 0;
                modStats.hiddenComments = hiddenRes.count || 0;
                modStats.bannedUsers = bannedRes.count || 0;
            } catch(e) {}
        }

        render();

        try {
            localStorage.setItem('pf_cache_' + user.id, JSON.stringify({
                currentProfile: currentProfile, achievementsList: achievementsList, notifications: notifications,
                leaders: leaders, guild: guild, guildMembers: guildMembers, friends: friends, notes: notes,
                streak: streak, privacy: privacy, preferences: preferences, cachedAt: Date.now()
            }));
        } catch(e) {}
    }

    // ============================================================
    // РЕНДЕР
    // ============================================================
    function render(){
        if(!currentProfile || !currentUser) return;
        try {
            document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
            document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
            document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
            document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
            document.body.style.background = kingdom.bg;
        } catch(e) {}

        var lvl = getLevelInfo(currentProfile.experience || 0);
        var displayName = currentProfile.display_name || currentProfile.username || currentUser.email.split('@')[0];
        var avatar = currentProfile.avatar_url || AVATARS[0];
        var mod = isModerator();
        var martianDate = getMartianDate();

        var guildBadge = guild ? '<span class="pf-guild-badge" onclick="pfSetTab(\'guild\')">' + (guild.icon || '🏰') + ' ' + escapeHtml(guild.name) + '</span>' : '';
        var modBadge = mod ? '<span class="pf-mod-badge">🛡️ Модератор</span>' : '';
        var streakBlock = streak > 0 ? '<div class="pf-stat-mini"><span class="pf-sm-label">Серия</span><span class="pf-sm-value">🔥 ' + streak + '</span></div>' : '';

        // Вкладки
        var tabs = [
            {id:'overview', icon:'👤', label:'Обзор'},
            {id:'guild', icon:'🏰', label:'Гильдия'},
            {id:'achievements', icon:'🏅', label:'Достижения', count: achievementsList.length},
            {id:'notes', icon:'📝', label:'Заметки', count: notes.length},
            {id:'notifications', icon:'🔔', label:'Уведомления'},
            {id:'friends', icon:'👥', label:'Друзья', count: friends.length},
            {id:'ai', icon:'🤖', label:'ИИ'},
            {id:'leaderboard', icon:'🏆', label:'Лидеры'},
            {id:'security', icon:'🔐', label:'Безопасность'},
            {id:'settings', icon:'⚙️', label:'Настройки'}
        ];
        if (mod) {
            tabs.splice(2, 0, {id:'moderation', icon:'🛡️', label:'Модерация', count: modStats.pendingSubmissions});
        }

        var html = '';

        // HERO
        html += '<div class="pf-hero pf-fade"><div class="pf-hero-content">';
        html += '<div class="pf-avatar-wrap"><img src="' + avatar + '" alt="" class="pf-avatar"><div class="pf-level-badge">' + lvl.title + ' · ур. ' + lvl.level + '</div></div>';
        html += '<div class="pf-info">';
        html += '<h1 class="pf-name">' + escapeHtml(displayName) + ' ' + modBadge + ' ' + guildBadge + '</h1>';
        html += '<p class="pf-email">' + currentUser.email + '</p>';
        html += '<div class="pf-stats-row">';
        html += '<div class="pf-stat-mini"><span class="pf-sm-label">Уровень</span><span class="pf-sm-value">⭐ ' + lvl.level + '</span></div>';
        html += '<div class="pf-stat-mini"><span class="pf-sm-label">Опыт</span><span class="pf-sm-value">💎 ' + (currentProfile.experience || 0) + '</span></div>';
        html += '<div class="pf-stat-mini"><span class="pf-sm-label">Достижений</span><span class="pf-sm-value">🏆 ' + achievementsList.length + '</span></div>';
        html += streakBlock;
        html += '</div>';
        html += '<div class="pf-progress"><div class="pf-progress-bar" style="width:' + lvl.percent + '%;"></div></div>';
        html += '<div class="pf-progress-text">До уровня ' + (lvl.level + 1) + ': ' + Math.max(lvl.next - (currentProfile.experience || 0), 0) + ' XP</div>';
        html += '</div></div></div>';

        // QUICK GRID — все кнопки, включая модерацию
        html += '<div class="pf-quick-grid pf-fade" style="animation-delay:.05s;">';
        var quicks = [
            {href:'/names/',icon:'📛',title:'Имена',desc:'Марсианские имена'},
            {href:'/sky/',icon:'🌌',title:'Небо',desc:'Симулятор неба'},
            {href:'/scene-generator/',icon:'🎬',title:'Сцены',desc:'Генератор сцен'},
            {href:'/duel/',icon:'⚔️',title:'Дуэль',desc:'Дуэль переводчиков'},
            {href:'/museum/',icon:'🏛️',title:'Музей',desc:'Виртуальный музей'},
            {href:'/weather/',icon:'🌡️',title:'Погода',desc:'Погода на Марсе'},
            {href:'/interactive/',icon:'🎮',title:'Интерактив',desc:'Все игры'},
            {href:'/achievements/',icon:'🎁',title:'Достижения',desc:'Все награды'},
            {href:'/bookmarks/',icon:'📚',title:'Закладки',desc:'Сохранённое'},
            {href:'/quests/',icon:'🗺️',title:'Квесты',desc:'Задания'},
            {href:'/horoscope/',icon:'🔮',title:'Гороскоп',desc:'Судьба'},
            {href:'/scrolls/',icon:'📜',title:'Свитки',desc:'Библиотека'},
            {href:'/forum/',icon:'💬',title:'Форум',desc:'Общение'},
            {href:'/feed/',icon:'📰',title:'Лента',desc:'Активность'}
        ];
        if (mod) {
            quicks.unshift({href:'/lists/moderation/',icon:'🛡️',title:'Модерация',desc:'Панель управления'});
        }
        quicks.forEach(function(q){
            html += '<a href="' + q.href + '" class="pf-quick-card"><div class="pf-quick-icon">' + q.icon + '</div><div class="pf-quick-body"><div class="pf-quick-title">' + q.title + '</div><div class="pf-quick-desc">' + q.desc + '</div></div></a>';
        });
        html += '</div>';

        // TABS
        html += '<div class="pf-tabs pf-fade" id="pf-tabs-scroll" style="animation-delay:.1s;">';
        tabs.forEach(function(t, i){
            var cls = 'pf-tab' + (i === 0 ? ' active' : '');
            var countBadge = t.count ? '<span class="pf-tab-count">' + t.count + '</span>' : '';
            html += '<button class="' + cls + '" data-tab="' + t.id + '">' + t.icon + ' ' + t.label + countBadge + '</button>';
        });
        html += '</div>';

        // ОБЗОР
        html += '<div class="pf-tab-content active" data-content="overview">';

        // О себе
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>';
        html += '<p style="margin:0 0 12px 0;color:#555;font-size:.95rem;line-height:1.6;" id="bio-text">' + escapeHtml(currentProfile.bio || '✍️ Ещё ничего не рассказал о себе.') + '</p>';
        html += '<button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button></div>';

        // ТАЙМЕР АКТИВНОСТИ
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">⏱️</span> Активность</h3>';
        html += '<div class="pf-timer-grid">';
        html += '<div class="pf-timer-card"><div class="pf-timer-value" id="pf-timer-session">0с</div><div class="pf-timer-label">Сессия</div><div class="pf-timer-sub">Сейчас на сайте</div></div>';
        html += '<div class="pf-timer-card"><div class="pf-timer-value" id="pf-timer-total">' + formatDuration(totalTime) + '</div><div class="pf-timer-label">Всего</div><div class="pf-timer-sub">За всё время</div></div>';
        html += '<div class="pf-timer-card"><div class="pf-timer-value">' + streak + '</div><div class="pf-timer-label">Серия</div><div class="pf-timer-sub">Дней подряд</div></div>';
        html += '<div class="pf-timer-card"><div class="pf-timer-value">' + (achievementsList.length) + '</div><div class="pf-timer-label">Наград</div><div class="pf-timer-sub">Получено</div></div>';
        html += '</div>';

        // График по дням
        html += '<div style="font-size:.78rem;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:18px;font-weight:700;">Последние 30 дней</div>';
        html += '<div class="pf-activity-bars">';
        for (var d = 0; d < 30; d++) {
            var h = 15 + Math.floor(Math.random() * 85);
            html += '<div class="pf-activity-bar" style="height:' + h + '%;" data-label="День ' + (d+1) + ': ' + h + '%"></div>';
        }
        html += '</div>';
        html += '<div style="display:flex;justify-content:space-between;font-size:.7rem;color:#aaa;margin-top:6px;"><span>30 дней назад</span><span>Сегодня</span></div>';
        html += '</div>';

        // Календарь
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>';
        html += '<div class="pf-calendar"><div class="pf-cal-month">' + martianDate.month + '</div><div class="pf-cal-day">' + martianDate.day + '</div><div class="pf-cal-year">Год ' + martianDate.year + ' Э.О.</div><div class="pf-cal-season">' + martianDate.season + '</div></div></div>';
        html += '</div>';

        // МОДЕРАЦИЯ
        if (mod) {
            html += '<div class="pf-tab-content" data-content="moderation">';
            html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🛡️</span> Центр модерации</h3>';
            html += '<div class="pf-timer-grid">';
            html += '<div class="pf-timer-card" onclick="window.location.href=\'/lists/moderation/\'" style="cursor:pointer;"><div class="pf-timer-value">' + modStats.pendingSubmissions + '</div><div class="pf-timer-label">Заявок</div></div>';
            html += '<div class="pf-timer-card" onclick="window.location.href=\'/lists/moderation/\'" style="cursor:pointer;"><div class="pf-timer-value">' + modStats.hiddenComments + '</div><div class="pf-timer-label">Скрытых</div></div>';
            html += '<div class="pf-timer-card" onclick="window.location.href=\'/lists/moderation/\'" style="cursor:pointer;"><div class="pf-timer-value">' + modStats.bannedUsers + '</div><div class="pf-timer-label">Забанено</div></div>';
            html += '</div>';
            html += '<div style="margin-top:18px;"><a href="/lists/moderation/" class="pf-btn">🛡️ Открыть панель модерации</a></div>';
            html += '</div></div>';
        }

        // ГИЛЬДИЯ
        html += '<div class="pf-tab-content" data-content="guild">';
        if(guild){
            html += '<div class="pf-guild-hero" style="--guild-color:' + (guild.color || kingdom.color) + ';">';
            html += '<div class="pf-guild-icon">' + (guild.icon || '🏰') + '</div>';
            html += '<div class="pf-guild-info"><h2 class="pf-guild-name">' + escapeHtml(guild.name) + '</h2>';
            html += '<div class="pf-guild-meta"><span>👥 ' + guildMembers.length + ' участников</span></div></div></div>';
            html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📜</span> Описание</h3><p style="margin:0;color:#555;line-height:1.6;">' + escapeHtml(guild.description || 'Без описания') + '</p></div>';
            html += '<div class="pf-card"><a href="/guilds/" class="pf-btn pf-btn-outline">🏰 Перейти в гильдии</a>';
            if(guild.leader_id === currentUser.id) html += '<button class="pf-btn pf-btn-danger" style="margin-left:8px;" onclick="pfDeleteGuild()">🗑️ Удалить</button>';
            html += '</div>';
        } else {
            html += '<div class="pf-card" style="text-align:center;padding:50px 20px;"><div style="font-size:4rem;margin-bottom:12px;">🏰</div><h3 style="margin:0 0 8px 0;">Вы пока не в гильдии</h3><a href="/guilds/" class="pf-btn">🔍 Найти гильдию</a></div>';
        }
        html += '</div>';

        // ДОСТИЖЕНИЯ — показываем все, заблокированные бледные
        var ALL_ACHIEVEMENTS = [
            {id:1,name:'Первый шаг',icon:'👣',desc:'Зарегистрироваться'},
            {id:2,name:'Марсианин',icon:'🔴',desc:'Выбрать королевство'},
            {id:3,name:'Читатель',icon:'📖',desc:'Прочитать 5 статей'},
            {id:4,name:'Эрудит',icon:'🎓',desc:'Прочитать 50 статей'},
            {id:5,name:'Хранитель',icon:'📚',desc:'Прочитать 200 статей'},
            {id:6,name:'Комментатор',icon:'💬',desc:'Оставить первый комментарий'},
            {id:7,name:'Оратор',icon:'🗣️',desc:'Оставить 50 комментариев'},
            {id:8,name:'Ночной страж',icon:'🌙',desc:'Заходить после полуночи 7 дней'},
            {id:9,name:'Ранняя пташка',icon:'🌅',desc:'Заходить до 6 утра 7 дней'},
            {id:10,name:'Неделя',icon:'🔥',desc:'7 дней подряд'},
            {id:11,name:'Месяц',icon:'💪',desc:'30 дней подряд'},
            {id:12,name:'Год',icon:'🏆',desc:'365 дней подряд'},
            {id:13,name:'Кузнец',icon:'⚒️',desc:'Создать 10 заметок'},
            {id:14,name:'Летописец',icon:'📜',desc:'Создать 100 заметок'},
            {id:15,name:'Художник',icon:'🎨',desc:'Сменить аватар 5 раз'},
            {id:16,name:'Странник',icon:'🧭',desc:'Посетить 10 королевств'},
            {id:17,name:'Мореход',icon:'⛵',desc:'Посетить все королевства'},
            {id:18,name:'Дуэлянт',icon:'⚔️',desc:'Победить в дуэли 10 раз'},
            {id:19,name:'Провидец',icon:'🔮',desc:'Использовать гороскоп 10 раз'},
            {id:20,name:'Оракул',icon:'🧿',desc:'Использовать гороскоп 100 раз'},
            {id:21,name:'Гурман',icon:'🍽️',desc:'Попробовать 5 рецептов'},
            {id:22,name:'Мастер',icon:'🎯',desc:'Достичь 10 уровня'},
            {id:23,name:'Грандмастер',icon:'👑',desc:'Достичь 50 уровня'},
            {id:24,name:'Легенда',icon:'🌟',desc:'Достичь 100 уровня'}
        ];
        html += '<div class="pf-tab-content" data-content="achievements">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏅</span> Достижения (' + achievementsList.length + '/' + ALL_ACHIEVEMENTS.length + ')</h3>';
        html += '<div class="pf-ach-grid">';
        ALL_ACHIEVEMENTS.forEach(function(a){
            var earned = achievementsList.find(function(x){ return x.achievement_id === a.id || x.name === a.name; });
            var cls = earned ? '' : ' locked';
            html += '<div class="pf-ach' + cls + '"><div class="pf-ach-icon">' + (earned ? a.icon : '🔒') + '</div><div><div class="pf-ach-name">' + escapeHtml(a.name) + '</div><div class="pf-ach-date">' + (earned ? (earned.earned_at ? new Date(earned.earned_at).toLocaleDateString('ru-RU') : 'Получено') : escapeHtml(a.desc)) + '</div></div></div>';
        });
        html += '</div></div></div>';

        // ЗАМЕТКИ
        html += '<div class="pf-tab-content" data-content="notes">';
        html += '<div class="pf-card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;"><h3 class="pf-card-title" style="margin:0;"><span class="pf-ct-icon">📝</span> Заметки (' + notes.length + ')</h3><button class="pf-btn" onclick="pfOpenNoteForm()">➕ Новая</button></div>';
        html += '<div class="pf-note-form" id="pf-note-form"><input type="text" class="pf-note-input title" id="pf-note-title" placeholder="Заголовок" maxlength="100"><textarea class="pf-note-input content" id="pf-note-content" placeholder="Текст..." maxlength="5000"></textarea><div style="font-size:.8rem;color:#888;margin-bottom:6px;">Цвет:</div><div class="pf-note-colors" id="pf-note-colors"></div><div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="pf-btn" onclick="pfSaveNote()">💾 Сохранить</button><button class="pf-btn pf-btn-outline" onclick="pfCloseNoteForm()">Отмена</button></div></div>';
        if(notes.length === 0){
            html += '<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет заметок.</p>';
        } else {
            html += '<div class="pf-notes-grid">';
            notes.forEach(function(n){
                html += '<div class="pf-note' + (n.pinned ? ' pinned' : '') + '" style="--note-color:' + n.color + ';" onclick="pfEditNote(' + n.id + ')"><div class="pf-note-title">' + (n.pinned ? '📌 ' : '') + escapeHtml(n.title || 'Заметка') + '</div><div class="pf-note-content">' + escapeHtml(n.content) + '</div><div class="pf-note-date">' + new Date(n.updated_at).toLocaleString('ru-RU', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) + '</div><div class="pf-note-actions" onclick="event.stopPropagation();"><button class="pf-note-btn" onclick="pfPinNote(' + n.id + ')">' + (n.pinned ? '📍' : '📌') + '</button><button class="pf-note-btn" onclick="pfEditNote(' + n.id + ')">✏️</button><button class="pf-note-btn danger" onclick="pfDeleteNote(' + n.id + ')">🗑️</button></div></div>';
            });
            html += '</div>';
        }
        html += '</div></div>';

        // УВЕДОМЛЕНИЯ
        html += '<div class="pf-tab-content" data-content="notifications">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Уведомления</h3>';
        if(notifications.length === 0){
            html += '<p style="text-align:center;color:#888;padding:40px 20px;">Уведомлений пока нет.</p>';
        } else {
            notifications.forEach(function(n){
                html += '<div class="pf-notif"><div class="pf-notif-icon">📬</div><div><div class="pf-notif-text">' + escapeHtml(n.message || n.text || '') + '</div><div class="pf-notif-date">' + new Date(n.created_at).toLocaleDateString('ru-RU') + '</div></div></div>';
            });
        }
        html += '</div></div>';

        // ДРУЗЬЯ
        html += '<div class="pf-tab-content" data-content="friends">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👥</span> Друзья (' + friends.length + ')</h3>';
        if(friends.length === 0){
            html += '<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет друзей.</p>';
        } else {
            friends.forEach(function(f){
                var name = f.other.display_name || f.other.username || 'Аноним';
                var av = f.other.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=6C63FF&color=fff&size=64';
                var status = f.status === 'accepted' ? '👥 Друзья' : '⏳ Заявка';
                html += '<div class="pf-notif" onclick="pfViewProfile(\'' + f.other.user_id + '\')" style="cursor:pointer;"><img src="' + av + '" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid var(--kingdom-color);"><div style="flex:1;"><div style="font-weight:700;">' + escapeHtml(name) + '</div><div style="font-size:.78rem;color:#888;">' + status + '</div></div></div>';
            });
        }
        html += '</div></div>';

        // ИИ
        html += '<div class="pf-tab-content" data-content="ai">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🤖</span> ИИ-гид</h3>';
        html += '<div class="pf-chat" id="pf-chat-container"><div class="pf-chat-msg bot">Привет! Спрашивай о Марсе! 🪐</div></div>';
        html += '<div class="pf-chat-input"><input type="text" id="pf-chat-input" placeholder="Спросите..." onkeypress="if(event.key===\'Enter\')pfSendChat()"><button onclick="pfSendChat()">Отправить</button></div>';
        html += '</div></div>';

        // ЛИДЕРЫ
        html += '<div class="pf-tab-content" data-content="leaderboard">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10</h3>';
        html += '<table class="pf-leaderboard"><thead><tr><th>#</th><th>Участник</th><th style="text-align:right;">Ур.</th><th style="text-align:right;">XP</th></tr></thead><tbody>';
        leaders.forEach(function(l, i){
            var name = l.display_name || l.username || 'Аноним';
            var medals = ['🥇','🥈','🥉'];
            var isMe = l.user_id === currentUser.id;
            html += '<tr onclick="pfViewProfile(\'' + l.user_id + '\')" style="' + (isMe ? 'background:' + kingdom.color + ';color:#fff;font-weight:700;' : '') + '"><td>' + (medals[i] || (i+1)) + '</td><td><img src="' + (l.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=6C63FF&color=fff&size=64') + '" class="pf-lb-avatar">' + escapeHtml(name) + (isMe ? ' (вы)' : '') + '</td><td style="text-align:right;">' + (l.level || 1) + '</td><td style="text-align:right;"><b>' + (l.experience || 0) + '</b></td></tr>';
        });
        html += '</tbody></table></div></div>';

        // БЕЗОПАСНОСТЬ
        html += '<div class="pf-tab-content" data-content="security">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📧</span> Email-2FA</h3>';
        html += '<div id="pf-2fa-status" style="margin-bottom:20px;"></div>';
        html += '<div class="pf-toggle"><div><div class="pf-toggle-label">🔐 Email-2FA</div><div class="pf-toggle-desc">Запрашивать код при входе с новых устройств</div></div><div class="pf-switch" id="pf-switch-2fa" onclick="pfToggle2FA()"></div></div>';
        html += '</div>';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📱</span> Доверенные устройства</h3>';
        html += '<div id="pf-trusted-devices"><p style="color:#888;">Загрузка...</p></div>';
        html += '<button class="pf-btn pf-btn-outline" onclick="pfClearTrustedDevices()" style="margin-top:12px;">🗑️ Удалить все</button>';
        html += '</div>';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔑</span> Смена пароля</h3>';
        html += '<button class="pf-btn" onclick="pfChangePassword()">🔐 Сменить пароль</button>';
        html += '</div></div>';

        // НАСТРОЙКИ
        html += '<div class="pf-tab-content" data-content="settings">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👤</span> Имя</h3>';
        html += '<p style="color:#555;margin:0 0 12px 0;">Текущее: <b id="pf-display-name">' + escapeHtml(displayName) + '</b></p>';
        html += '<button class="pf-btn pf-btn-outline" onclick="pfEditName()">✏️ Изменить</button></div>';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📧</span> Email</h3>';
        html += '<p style="color:#555;margin:0 0 12px 0;">Текущий: <b>' + currentUser.email + '</b></p>';
        html += '<button class="pf-btn pf-btn-outline" onclick="pfChangeEmail()">✏️ Сменить</button></div>';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🖼️</span> Аватар</h3>';
        html += '<div class="pf-avatar-grid">';
        AVATARS.forEach(function(url){ html += '<img src="' + url + '" alt="" class="pf-avatar-option ' + (avatar === url ? 'selected' : '') + '" onclick="pfSelectAvatar(\'' + url + '\')">'; });
        html += '</div></div>';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏰</span> Королевство</h3>';
        html += '<div class="pf-kingdom-grid">';
        Object.keys(KINGDOMS).forEach(function(name){
            var k = KINGDOMS[name];
            var sel = currentProfile.kingdom === name;
            html += '<button class="pf-kingdom-btn' + (sel ? ' selected' : '') + '" style="' + (sel ? 'background:' + k.color + ';border-color:' + k.color + ';' : '') + '" onclick="pfSelectKingdom(\'' + name + '\')">' + name + '</button>';
        });
        html += '</div>';
        html += '<div style="text-align:center;margin-top:16px;"><img src="' + kingdom.flag + '" alt="" style="width:80px;border-radius:6px;border:1px solid #a2a9b1;"><div style="font-size:.72rem;color:#666;margin-top:4px;">Флаг ' + (currentProfile.kingdom || 'Эдем') + '</div></div>';
        html += '</div>';
        html += '<div class="pf-card pf-danger"><h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">⚠️</span> Опасная зона</h3>';
        html += '<button class="pf-btn pf-btn-danger" onclick="pfDeleteAccount()">🗑️ Удалить аккаунт</button></div>';
        html += '<div class="pf-card"><button class="pf-btn pf-btn-outline" onclick="pfLogout()" style="width:100%;justify-content:center;">🚪 Выйти</button></div>';
        html += '</div>';

        container.innerHTML = html;
        renderNoteColors();
        updateTimerDisplay();

        // Обработчики вкладок
        document.querySelectorAll('.pf-tab').forEach(function(tab){
            tab.onclick = function(){ pfSetTab(tab.dataset.tab); };
        });

        // ПРОКРУТКА ВКЛАДОК КОЛЁСИКОМ
        var tabsEl = document.getElementById('pf-tabs-scroll');
        if (tabsEl) {
            tabsEl.addEventListener('wheel', function(e) {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    tabsEl.scrollLeft += e.deltaY * 1.5;
                }
            }, { passive: false });
        }
    }

    function renderNoteColors(){
        var el = document.getElementById('pf-note-colors');
        if(!el) return;
        el.innerHTML = NOTE_COLORS.map(function(c){ return '<div class="pf-note-color ' + (c === selectedNoteColor ? 'selected' : '') + '" style="background:' + c + ';" onclick="pfSelectNoteColor(\'' + c + '\')"></div>'; }).join('');
    }

    // ============================================================
    // ПУБЛИЧНЫЕ ФУНКЦИИ
    // ============================================================
    window.pfSetTab = function(tab){
        document.querySelectorAll('.pf-tab').forEach(function(t){ t.classList.toggle('active', t.dataset.tab === tab); });
        document.querySelectorAll('.pf-tab-content').forEach(function(c){ c.classList.toggle('active', c.dataset.content === tab); });
        if(tab === 'security') render2FATab();
    };

    window.pfViewProfile = function(id){ window.location.href = '/profile-view/?user_id=' + id; };

    window.pfEditBio = async function(){
        var el = document.getElementById('bio-text');
        var cur = el ? el.innerText : '';
        var nb = prompt('Введите биографию:', cur);
        if(nb === null) return;
        var res = await client.from('profiles').update({ bio: nb.trim() }).eq('user_id', currentUser.id);
        if(res.error){ showToast('Ошибка', 'error'); return; }
        if(el) el.innerText = nb.trim();
        showToast('✅ Обновлено!', 'success');
    };

    window.pfEditName = async function(){
        var el = document.getElementById('pf-display-name');
        var cur = el ? el.innerText : '';
        var nn = prompt('Новое имя:', cur);
        if(!nn || nn === cur) return;
        if(nn.length < 2 || nn.length > 20){ showToast('2-20 символов', 'warning'); return; }
        var res = await client.from('profiles').update({ display_name: nn.trim() }).eq('user_id', currentUser.id);
        if(res.error){ showToast('Ошибка', 'error'); return; }
        showToast('✅ Обновлено!', 'success');
        setTimeout(function(){ location.reload(); }, 800);
    };

    window.pfChangeEmail = async function(){
        var ne = prompt('Введите новый email:');
        if(!ne || ne === currentUser.email) return;
        var res = await client.auth.updateUser({ email: ne });
        if(res.error){ showToast('Ошибка: ' + res.error.message, 'error'); return; }
        showToast('📧 Письмо отправлено!', 'success');
    };

    window.pfSelectAvatar = async function(url){
        await client.from('profiles').update({ avatar_url: url }).eq('user_id', currentUser.id);
        showToast('✅ Обновлено!', 'success');
        setTimeout(function(){ location.reload(); }, 600);
    };

    window.pfSelectKingdom = async function(name){
        await client.from('profiles').update({ kingdom: name }).eq('user_id', currentUser.id);
        try { localStorage.setItem('mars_kingdom_color', KINGDOMS[name].color); } catch(e) {}
        showToast('✅ ' + name + '!', 'success');
        setTimeout(function(){ location.reload(); }, 600);
    };

    window.pfDeleteAccount = async function(){
        if(!confirm('Удалить аккаунт? Необратимо!')) return;
        var email = prompt('Введите email:');
        if(!email || email !== currentUser.email){ showToast('Не совпадает', 'error'); return; }
        var sRes = await client.auth.getSession();
        var token = sRes.data && sRes.data.session ? sRes.data.session.access_token : null;
        if(!token){ showToast('Ошибка', 'error'); return; }
        try{
            var res = await fetch(SUPABASE_URL + '/functions/v1/delete-user', { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } });
            var json = await res.json();
            if(json.error) throw new Error(json.error);
            localStorage.clear();
            window.location.href = '/';
        } catch(e){ showToast('Ошибка: ' + e.message, 'error'); }
    };

    window.pfLogout = async function(){
        await client.auth.signOut();
        localStorage.clear();
        window.location.href = '/';
    };

    window.pfDeleteGuild = async function(){
        if(!guild || !confirm('Удалить гильдию?')) return;
        await client.from('guilds').delete().eq('id', guild.id);
        setTimeout(function(){ location.reload(); }, 500);
    };

    window.pfOpenNoteForm = function(id){
        editingNoteId = id || null;
        var form = document.getElementById('pf-note-form');
        if(!form) return;
        form.classList.add('open');
        if(id){
            var n = notes.find(function(x){ return x.id === id; });
            if(n){
                document.getElementById('pf-note-title').value = n.title || '';
                document.getElementById('pf-note-content').value = n.content;
                selectedNoteColor = n.color || '#6C63FF';
            }
        } else {
            document.getElementById('pf-note-title').value = '';
            document.getElementById('pf-note-content').value = '';
            selectedNoteColor = '#6C63FF';
        }
        renderNoteColors();
    };

    window.pfCloseNoteForm = function(){
        var f = document.getElementById('pf-note-form');
        if(f) f.classList.remove('open');
        editingNoteId = null;
    };

    window.pfSelectNoteColor = function(c){ selectedNoteColor = c; renderNoteColors(); };

    window.pfSaveNote = async function(){
        var title = document.getElementById('pf-note-title').value.trim();
        var content = document.getElementById('pf-note-content').value.trim();
        if(!content){ showToast('Введите текст', 'warning'); return; }
        if(editingNoteId){
            await client.from('user_notes').update({ title: title, content: content, color: selectedNoteColor, updated_at: new Date().toISOString() }).eq('id', editingNoteId);
        } else {
            await client.from('user_notes').insert({ user_id: currentUser.id, title: title, content: content, color: selectedNoteColor });
        }
        showToast('✅ Сохранено!', 'success');
        setTimeout(function(){ location.reload(); }, 600);
    };

    window.pfEditNote = function(id){ pfOpenNoteForm(id); };

    window.pfPinNote = async function(id){
        var n = notes.find(function(x){ return x.id === id; });
        if(!n) return;
        await client.from('user_notes').update({ pinned: !n.pinned }).eq('id', id);
        setTimeout(function(){ location.reload(); }, 400);
    };

    window.pfDeleteNote = async function(id){
        if(!confirm('Удалить?')) return;
        await client.from('user_notes').delete().eq('id', id);
        setTimeout(function(){ location.reload(); }, 400);
    };

    window.pfSendChat = async function(){
        var input = document.getElementById('pf-chat-input');
        var chatEl = document.getElementById('pf-chat-container');
        var q = input.value.trim();
        if(!q) return;
        var userMsg = document.createElement('div');
        userMsg.className = 'pf-chat-msg user'; userMsg.textContent = q;
        chatEl.appendChild(userMsg); chatEl.scrollTop = chatEl.scrollHeight;
        input.value = '';
        try{
            var res = await fetch(SUPABASE_URL + '/functions/v1/ai-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: q }) });
            var data = await res.json();
            var botMsg = document.createElement('div');
            botMsg.className = 'pf-chat-msg bot';
            botMsg.textContent = data.reply || data.error || 'Нет ответа';
            chatEl.appendChild(botMsg); chatEl.scrollTop = chatEl.scrollHeight;
        } catch(e){
            var err = document.createElement('div');
            err.className = 'pf-chat-msg bot'; err.textContent = '⚠️ Ошибка';
            chatEl.appendChild(err);
        }
    };

    window.pfToggle2FA = async function(){
        try{
            var twofaRes = await client.from('user_2fa').select('*').eq('user_id', currentUser.id).maybeSingle();
            var newVal = !(twofaRes.data && twofaRes.data.email_2fa_enabled);
            if(!confirm(newVal ? 'Включить Email-2FA?' : 'Выключить?')) return;
            await client.from('user_2fa').upsert({ user_id: currentUser.id, email_2fa_enabled: newVal, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
            showToast(newVal ? '✅ Включена!' : '🔓 Выключена', newVal ? 'success' : 'info');
            setTimeout(function(){ location.reload(); }, 800);
        } catch(e){ showToast('Ошибка: ' + e.message, 'error'); }
    };

    async function render2FATab(){
        var statusEl = document.getElementById('pf-2fa-status');
        var switchEl = document.getElementById('pf-switch-2fa');
        var devicesEl = document.getElementById('pf-trusted-devices');
        if(!statusEl) return;
        try{
            var twofaRes = await client.from('user_2fa').select('*').eq('user_id', currentUser.id).maybeSingle();
            var enabled = twofaRes.data && twofaRes.data.email_2fa_enabled;
            if(enabled){
                statusEl.innerHTML = '<div class="pf-badge-2fa">✅ Включена</div>';
                if(switchEl) switchEl.classList.add('on');
            } else {
                statusEl.innerHTML = '<div class="pf-badge-2fa off">⚠️ Выключена</div>';
                if(switchEl) switchEl.classList.remove('on');
            }
            if(devicesEl){
                var devRes = await client.from('trusted_devices').select('*').eq('user_id', currentUser.id).order('last_used', { ascending: false });
                var devices = devRes.data || [];
                if(devices.length > 0){
                    devicesEl.innerHTML = devices.map(function(d){
                        return '<div class="pf-notif"><div class="pf-notif-icon">💻</div><div style="flex:1;"><div class="pf-notif-text"><b>' + escapeHtml(d.device_name || 'Устройство') + '</b></div><div class="pf-notif-date">' + new Date(d.last_used).toLocaleString('ru-RU') + '</div></div><button class="pf-note-btn danger" onclick="pfRemoveDevice(' + d.id + ')">✕</button></div>';
                    }).join('');
                } else {
                    devicesEl.innerHTML = '<p style="color:#888;text-align:center;padding:20px;">Нет устройств</p>';
                }
            }
        } catch(e){
            statusEl.innerHTML = '<div class="pf-badge-2fa off">⚠️ Ошибка</div>';
        }
    }

    window.pfRemoveDevice = async function(id){
        if(!confirm('Удалить?')) return;
        await client.from('trusted_devices').delete().eq('id', id);
        showToast('🗑️ Удалено', 'info');
        render2FATab();
    };

    window.pfClearTrustedDevices = async function(){
        if(!confirm('Удалить все?')) return;
        await client.from('trusted_devices').delete().eq('user_id', currentUser.id);
        showToast('🗑️ Удалено', 'info');
        render2FATab();
    };

    window.pfChangePassword = async function(){
        var np = prompt('Новый пароль:');
        if(!np || np.length < 6) { showToast('Мин. 6 символов', 'warning'); return; }
        var res = await client.auth.updateUser({ password: np });
        if(res.error){ showToast('Ошибка: ' + res.error.message, 'error'); return; }
        showToast('🔐 Пароль обновлён!', 'success');
    };

    // ============================================================
    // ИНИЦИАЛИЗАЦИЯ
    // ============================================================
    async function init(){
        startTimer();

        for (var i = 0; i < 30; i++) {
            if (window.supabaseClient) break;
            await new Promise(function(r){ setTimeout(r, 200); });
        }
        client = window.supabaseClient;

        if(!client){
            container.innerHTML = '<div style="text-align:center;padding:60px 20px;"><h2>⚠️ Ошибка загрузки</h2><button onclick="location.reload()" style="margin-top:16px;padding:12px 24px;background:#6C63FF;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;">Обновить</button></div>';
            return;
        }

        var user = null;
        if(window.marsSession && window.marsSession.user) user = window.marsSession.user;
        if(!user){
            try {
                var r = await client.auth.getSession();
                if(r.data && r.data.session && r.data.session.user) user = r.data.session.user;
            } catch(e) {}
        }
        if(!user){
            try {
                var r2 = await client.auth.refreshSession();
                if(r2.data && r2.data.session && r2.data.session.user) user = r2.data.session.user;
            } catch(e) {}
        }
        if(!user){
            try {
                var key = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';
                var stored = localStorage.getItem(key);
                if(stored){
                    var val = JSON.parse(stored);
                    if(val && val.access_token && val.refresh_token){
                        var st = await client.auth.setSession({ access_token: val.access_token, refresh_token: val.refresh_token });
                        if(st.data && st.data.user) user = st.data.user;
                    }
                }
            } catch(e) {}
        }

        if(user){
            currentUser = user;
            await loadAllData(user);
            return;
        }

        container.innerHTML = '<div style="text-align:center;padding:60px 20px;max-width:400px;margin:0 auto;">'
            + '<div style="font-size:4rem;margin-bottom:16px;">🔒</div>'
            + '<h2 style="margin:0 0 8px 0;">Вы не авторизованы</h2>'
            + '<p style="color:#888;margin:0 0 20px 0;">Войдите, чтобы увидеть профиль</p>'
            + '<a href="/login/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">🔐 Войти</a></div>';
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
</script>

<script>
window.showLevelUp = function(level, title) {
  var overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 999999;
    background: radial-gradient(circle, rgba(108,99,255,0.6), rgba(0,0,0,0.9));
    display: flex; align-items: center; justify-content: center;
    animation: lvlFadeIn 0.4s ease;
  `;
  overlay.innerHTML = `
    <div style="text-align: center; color: #fff; animation: lvlZoom 0.6s cubic-bezier(0.16,1,0.3,1);">
      <div style="font-size: 8rem; margin-bottom: 20px; filter: drop-shadow(0 0 40px #A29BFE);">⭐</div>
      <div style="font-size: 1rem; letter-spacing: 4px; opacity: 0.8;">УРОВЕНЬ</div>
      <div style="font-size: 6rem; font-weight: 900; line-height: 1; background: linear-gradient(135deg, #fff, #A29BFE); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${level}</div>
      <div style="font-size: 1.4rem; margin-top: 16px; font-weight: 700;">${title}</div>
    </div>
  `;
  document.body.appendChild(overlay);
  for (var i = 0; i < 60; i++) {
    var p = document.createElement('div');
    var angle = Math.random() * Math.PI * 2;
    var dist = 200 + Math.random() * 400;
    p.style.cssText = `
      position: fixed; left: 50%; top: 50%;
      width: 8px; height: 8px;
      background: ${['#6C63FF','#A29BFE','#f39c12','#e74c3c'][i % 4]};
      border-radius: 50%;
      box-shadow: 0 0 20px currentColor;
      animation: lvlParticle 1.2s ease forwards;
      --dx: ${Math.cos(angle) * dist}px;
      --dy: ${Math.sin(angle) * dist}px;
    `;
    overlay.appendChild(p);
  }
  setTimeout(function() {
    overlay.style.animation = 'lvlFadeOut 0.5s ease forwards';
    setTimeout(function() { overlay.remove(); }, 500);
  }, 2500);
};
var style = document.createElement('style');
style.textContent = `
  @keyframes lvlFadeIn { from { opacity: 0; } }
  @keyframes lvlFadeOut { to { opacity: 0; } }
  @keyframes lvlZoom { 0% { transform: scale(0.3); opacity: 0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
  @keyframes lvlParticle { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
`;
document.head.appendChild(style);
</script>
