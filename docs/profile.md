---
title: Мой профиль
comments: false
---

<div id="profile-app" style="max-width: 1000px; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
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
@keyframes pfPulseOpacity{0%,100%{opacity:.3}50%{opacity:.6}}
.pf-fade{animation:pfFadeIn .5s cubic-bezier(.16,1,.3,1) both}
#profile-app a{text-decoration:none!important;border-bottom:none!important}
.pf-skeleton{animation:pfPulseOpacity 1.5s ease-in-out infinite}
.pf-hero{position:relative;background:linear-gradient(135deg,var(--kingdom-color),var(--kingdom-light));border-radius:24px;padding:36px 32px;color:#fff;margin-bottom:24px;overflow:hidden;box-shadow:0 20px 60px -12px var(--kingdom-shadow)}
.pf-hero::before{content:'';position:absolute;top:-60%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(255,255,255,.15),transparent 70%);border-radius:50%;animation:pfFloat 8s ease-in-out infinite}
.pf-hero::after{content:'';position:absolute;bottom:-60%;left:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(255,255,255,.1),transparent 70%);border-radius:50%;animation:pfFloat 10s ease-in-out infinite reverse}
.pf-hero-content{position:relative;z-index:2;display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.pf-avatar-wrap{position:relative;flex-shrink:0;animation:pfPulse 3s ease-in-out infinite}
.pf-avatar{width:120px;height:120px;border-radius:50%;border:4px solid rgba(255,255,255,.4);object-fit:cover;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.2)}
.pf-level-badge{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:var(--kingdom-color);padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:800;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.15);border:2px solid rgba(255,255,255,.5)}
.pf-info{flex:1;min-width:200px}
.pf-name{font-size:2rem;font-weight:800;margin:0 0 6px 0;color:#fff;display:flex;align-items:center;gap:12px;flex-wrap:wrap;letter-spacing:-.5px}
.pf-role-badge{background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;padding:4px 14px;border-radius:20px;font-size:.7rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase;box-shadow:0 4px 12px rgba(243,156,18,.4)}
.pf-guild-badge{background:rgba(255,255,255,.25);backdrop-filter:blur(8px);color:#fff;padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:700;display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(255,255,255,.3);cursor:pointer}
.pf-guild-badge:hover{background:rgba(255,255,255,.35)}
.pf-email{font-size:.9rem;opacity:.85;margin:0 0 16px 0}
.pf-stats-row{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px}
.pf-stat-mini{display:flex;flex-direction:column;gap:2px}
.pf-stat-mini .pf-sm-label{font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600}
.pf-stat-mini .pf-sm-value{font-size:1.4rem;font-weight:800;letter-spacing:-.5px}
.pf-progress{background:rgba(255,255,255,.2);border-radius:12px;height:12px;overflow:hidden;position:relative;backdrop-filter:blur(8px);margin-bottom:6px}
.pf-progress-bar{height:100%;background:#fff;border-radius:12px;transition:width 1.2s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px rgba(255,255,255,.6)}
.pf-progress-text{font-size:.78rem;opacity:.9}
.pf-quick-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px}
.pf-quick-card{display:flex;align-items:center;gap:12px;padding:16px 18px;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-radius:16px;border:2px solid transparent;color:inherit;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 4px 12px rgba(0,0,0,.05);cursor:pointer;position:relative;overflow:hidden}
.pf-quick-card::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,var(--kingdom-color) 0,transparent 70%);opacity:0;transition:opacity .3s;z-index:0}
.pf-quick-card:hover{transform:translateY(-4px);border-color:var(--kingdom-color);box-shadow:0 12px 32px -8px var(--kingdom-shadow)}
.pf-quick-card:hover::before{opacity:.08}
.pf-quick-card>*{position:relative;z-index:1}
.pf-quick-icon{font-size:1.8rem;filter:drop-shadow(0 3px 6px rgba(0,0,0,.15));transition:transform .3s}
.pf-quick-card:hover .pf-quick-icon{transform:scale(1.15) rotate(-6deg)}
.pf-quick-body{flex:1;min-width:0}
.pf-quick-title{font-size:.9rem;font-weight:800;color:#1a1a1a;margin-bottom:2px}
.pf-quick-desc{font-size:.72rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pf-tabs{display:flex;gap:4px;margin-bottom:20px;overflow-x:auto;padding:6px;background:rgba(255,255,255,.7);backdrop-filter:blur(12px);border-radius:16px;border:1px solid rgba(0,0,0,.05)}
.pf-tabs::-webkit-scrollbar{height:4px}
.pf-tabs::-webkit-scrollbar-thumb{background:var(--kingdom-color);border-radius:2px}
.pf-tab{flex-shrink:0;padding:10px 16px;border:none;background:transparent;color:#666;font-size:.85rem;font-weight:700;border-radius:12px;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:6px;font-family:inherit}
.pf-tab:hover{background:rgba(0,0,0,.04);color:#333}
.pf-tab.active{background:var(--kingdom-color);color:#fff;box-shadow:0 6px 16px -4px var(--kingdom-shadow)}
.pf-tab-content{display:none;animation:pfFadeIn .4s ease}
.pf-tab-content.active{display:block}
.pf-card{background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:22px 26px;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.04)}
.pf-card-title{font-size:1.1rem;font-weight:800;color:#1a1a1a;margin:0 0 16px 0;display:flex;align-items:center;gap:10px}
.pf-card-title .pf-ct-icon{font-size:1.4rem}
.pf-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:30px;border:2px solid var(--kingdom-color);background:var(--kingdom-color);color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;transition:all .25s;font-family:inherit}
.pf-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--kingdom-shadow)}
.pf-btn-outline{background:transparent;color:var(--kingdom-color)}
.pf-btn-outline:hover{background:var(--kingdom-color);color:#fff}
.pf-btn-danger{background:#e74c3c;border-color:#e74c3c}
.pf-btn-danger:hover{background:#c0392b;border-color:#c0392b}
.pf-btn-success{background:#27ae60;border-color:#27ae60}
.pf-avatar-grid{display:flex;gap:12px;flex-wrap:wrap}
.pf-avatar-option{width:60px;height:60px;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s}
.pf-avatar-option:hover{transform:scale(1.1);border-color:var(--kingdom-color)}
.pf-avatar-option.selected{border-color:var(--kingdom-color);box-shadow:0 0 0 4px var(--kingdom-shadow)}
.pf-kingdom-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px}
.pf-kingdom-btn{padding:10px 12px;border-radius:10px;border:2px solid rgba(0,0,0,.08);background:rgba(255,255,255,.6);cursor:pointer;font-size:.8rem;font-weight:600;transition:all .25s;font-family:inherit;color:#333}
.pf-kingdom-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.1)}
.pf-kingdom-btn.selected{color:#fff;box-shadow:0 6px 16px -4px var(--kingdom-shadow)}
.pf-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.pf-ach{display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(255,255,255,.7);border-radius:12px;border:2px solid rgba(0,0,0,.04);transition:all .25s}
.pf-ach:hover{transform:translateY(-3px);border-color:var(--kingdom-color);box-shadow:0 12px 28px -8px var(--kingdom-shadow)}
.pf-ach .pf-ach-icon{font-size:1.8rem}
.pf-ach .pf-ach-body{min-width:0}
.pf-ach .pf-ach-name{font-size:.85rem;font-weight:700;color:#1a1a1a}
.pf-ach .pf-ach-date{font-size:.7rem;color:#888}
.pf-notif{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px}
.pf-notif-icon{font-size:1.3rem}
.pf-notif-text{font-size:.88rem;color:#333}
.pf-notif-date{font-size:.72rem;color:#999;margin-top:2px}
.pf-chat{background:linear-gradient(135deg,var(--kingdom-bg),rgba(255,255,255,.6));border-radius:14px;padding:14px;max-height:400px;overflow-y:auto;margin-bottom:12px;border:1px solid rgba(0,0,0,.05)}
.pf-chat-msg{margin:6px 0;padding:10px 14px;border-radius:14px;max-width:80%;word-wrap:break-word;font-size:.9rem;line-height:1.5}
.pf-chat-msg.user{background:var(--kingdom-color);color:#fff;margin-left:auto;border-bottom-right-radius:4px}
.pf-chat-msg.bot{background:#fff;color:#333;margin-right:auto;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.pf-chat-input{display:flex;gap:8px}
.pf-chat-input input{flex:1;padding:12px 18px;border:2px solid rgba(0,0,0,.08);border-radius:30px;font-size:.9rem;font-family:inherit;outline:none;background:#fff}
.pf-chat-input input:focus{border-color:var(--kingdom-color)}
.pf-chat-input button{padding:12px 24px;background:var(--kingdom-color);color:#fff;border:none;border-radius:30px;cursor:pointer;font-weight:700;font-family:inherit}
.pf-leaderboard{width:100%;border-collapse:collapse;font-size:.88rem}
.pf-leaderboard th{text-align:left;padding:10px 12px;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;border-bottom:2px solid var(--kingdom-color)}
.pf-leaderboard td{padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-leaderboard tr{cursor:pointer;transition:all .2s}
.pf-leaderboard tr:hover{background:var(--kingdom-color);color:#fff}
.pf-leaderboard tr:hover td{border-bottom-color:transparent}
.pf-lb-avatar{width:28px;height:28px;border-radius:50%;vertical-align:middle;margin-right:8px;border:2px solid var(--kingdom-color);object-fit:cover}
.pf-calendar{text-align:center;padding:20px;background:linear-gradient(135deg,var(--kingdom-bg),rgba(255,255,255,.4));border-radius:14px;border:1px solid rgba(0,0,0,.05)}
.pf-cal-month{font-size:1.2rem;font-weight:800;color:var(--kingdom-color);margin-bottom:4px}
.pf-cal-day{font-size:2.5rem;font-weight:900;color:#1a1a1a;line-height:1;margin:6px 0}
.pf-cal-year{font-size:.9rem;color:#666;font-weight:600}
.pf-cal-season{display:inline-block;margin-top:12px;padding:5px 16px;background:var(--kingdom-color);color:#fff;border-radius:20px;font-size:.78rem;font-weight:700}
.pf-guild-hero{background:linear-gradient(135deg,var(--guild-color,var(--kingdom-color)),rgba(255,255,255,.1));border-radius:16px;padding:24px 26px;color:#fff;margin-bottom:16px;display:flex;align-items:center;gap:18px;flex-wrap:wrap;box-shadow:0 12px 32px -8px var(--guild-color,var(--kingdom-shadow))}
.pf-guild-icon{width:70px;height:70px;border-radius:16px;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:2.4rem;border:2px solid rgba(255,255,255,.4);flex-shrink:0}
.pf-guild-info{flex:1;min-width:150px}
.pf-guild-name{font-size:1.4rem;font-weight:800;margin:0 0 4px 0}
.pf-guild-meta{font-size:.82rem;opacity:.9;display:flex;gap:12px;flex-wrap:wrap}
.pf-notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.pf-note{background:#fff;border-radius:12px;padding:16px;border-left:4px solid var(--note-color,var(--kingdom-color));box-shadow:0 4px 12px rgba(0,0,0,.06);transition:all .25s;cursor:pointer;position:relative;min-height:120px;display:flex;flex-direction:column}
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
.pf-note-form.open{display:block;animation:pfFadeIn .3s ease}
.pf-note-input{width:100%;padding:12px 16px;border-radius:10px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fafafa;margin-bottom:10px;box-sizing:border-box}
.pf-note-input:focus{border-color:var(--kingdom-color);background:#fff}
.pf-note-input.title{font-weight:700}
.pf-note-input.content{min-height:100px;resize:vertical}
.pf-note-colors{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.pf-note-color{width:32px;height:32px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:all .2s}
.pf-note-color:hover{transform:scale(1.15)}
.pf-note-color.selected{border-color:#333;transform:scale(1.15);box-shadow:0 4px 12px rgba(0,0,0,.2)}
.pf-danger{background:rgba(231,76,60,.05);border:2px solid rgba(231,76,60,.2);border-radius:14px;padding:16px 20px}
.pf-qr-btn{width:100%;padding:18px 24px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:16px;font-size:1rem;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 12px 32px -8px rgba(108,99,255,.5);display:flex;align-items:center;justify-content:center;gap:12px;transition:all .3s;margin-bottom:20px}
.pf-qr-btn:hover{transform:translateY(-3px);box-shadow:0 20px 40px -8px rgba(108,99,255,.6)}
.pf-toggle{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-toggle:last-child{border-bottom:none}
.pf-toggle-label{font-size:.9rem;color:#333;font-weight:600}
.pf-toggle-desc{font-size:.75rem;color:#888;margin-top:2px}
.pf-switch{position:relative;width:48px;height:26px;background:rgba(0,0,0,.1);border-radius:26px;cursor:pointer;transition:all .3s}
.pf-switch.on{background:var(--kingdom-color)}
.pf-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:all .3s;box-shadow:0 2px 4px rgba(0,0,0,.2)}
.pf-switch.on::after{left:25px}
.pf-badge-2fa{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:.8rem;font-weight:700;background:linear-gradient(135deg,#27ae60,#16a085);color:#fff;box-shadow:0 4px 12px rgba(39,174,96,.3)}
.pf-badge-2fa.off{background:rgba(0,0,0,.08);color:#666;box-shadow:none}
.pf-theme-colors{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.pf-theme-color{width:40px;height:40px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:all .2s;box-shadow:0 4px 12px rgba(0,0,0,.15)}
.pf-theme-color:hover{transform:scale(1.1)}
.pf-theme-color.selected{border-color:#1a1a1a;transform:scale(1.15);box-shadow:0 6px 16px rgba(0,0,0,.3)}
@media(prefers-color-scheme:dark){.pf-card,.pf-quick-card,.pf-ach,.pf-note,.pf-note-form{background:rgba(30,30,46,.9)}.pf-card-title,.pf-quick-title,.pf-ach-name,.pf-name,.pf-note-title{color:#e0e0e0}.pf-tab{color:#aaa}.pf-tab:hover{background:rgba(255,255,255,.05);color:#fff}.pf-chat{background:rgba(30,30,46,.6)}.pf-chat-msg.bot{background:rgba(255,255,255,.08);color:#e0e0e0}.pf-chat-input input{background:rgba(30,30,46,.8);color:#e0e0e0}.pf-kingdom-btn{background:rgba(30,30,46,.6);color:#e0e0e0}.pf-notif{background:rgba(255,255,255,.03)}.pf-notif-text{color:#d0d0d0}.pf-cal-day,.pf-note-content{color:#e0e0e0}.pf-calendar{background:rgba(30,30,46,.5)}.pf-note-input{background:rgba(30,30,46,.6);color:#e0e0e0}.pf-note-btn{background:rgba(255,255,255,.08);color:#aaa}.pf-toggle-label{color:#d0d0d0}}
@media(max-width:600px){.pf-hero{padding:24px 20px}.pf-avatar{width:90px;height:90px}.pf-name{font-size:1.4rem}.pf-tabs{padding:4px}.pf-tab{padding:8px 12px;font-size:.78rem}.pf-card{padding:18px 16px}.pf-quick-grid{grid-template-columns:1fr}.pf-avatar-option{width:52px;height:52px}}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function(){
    'use strict';

    const SUPABASE_URL="https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY="sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS={
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

    const AVATARS=[
        '/assets/images/авотарка%20девушки.png',
        '/assets/images/мужчина.png',
        '/assets/images/мужчина2.png',
        '/assets/images/мужчина%203.png'
    ];

    const NOTE_COLORS=['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63'];
    const THEME_COLORS=['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63','#34495e','#e67e22'];

    const BAD_WORDS=['хуй','пизда','хуе','ебал','ебать','бля','сука','нахуй','пиздец','залупа','мудила','гандон','блядь','пидор','гей','лох','дебил','идиот','кретин','секс','порно','эротика','трахать','член','fuck','shit','asshole','bitch','cunt','dick','pussy'];

    const LEVEL_MAP=[
        {level:1,xp:0,title:'🌱 Новый поселенец'},
        {level:2,xp:50,title:'🔭 Исследователь'},
        {level:3,xp:150,title:'🚀 Первопроходец'},
        {level:4,xp:350,title:'🏠 Колонизатор'},
        {level:5,xp:700,title:'⚡ Командир базы'},
        {level:6,xp:1200,title:'👑 Легенда Марса'}
    ];

    const container=document.getElementById('profile-app');
    let client=null,currentUser=null,currentProfile=null,kingdom=KINGDOMS['Эдем'];
    let achievementsList=[],notifications=[],leaders=[],guild=null,guildMembers=[],friends=[],notes=[],streak=0;
    let privacy={},preferences={};
    let editingNoteId=null,selectedNoteColor='#6C63FF';

    // ============================================================
    // УТИЛИТЫ
    // ============================================================
    function getLevelInfo(exp){
        let r={level:1,title:'🌱 Новый поселенец',current:0,next:50,percent:0};
        for(let i=LEVEL_MAP.length-1;i>=0;i--){
            if(exp>=LEVEL_MAP[i].xp){
                r.level=LEVEL_MAP[i].level;r.title=LEVEL_MAP[i].title;
                r.current=LEVEL_MAP[i].xp;
                r.next=(i<LEVEL_MAP.length-1)?LEVEL_MAP[i+1].xp:exp+50;
                break;
            }
        }
        const range=r.next-r.current;
        r.percent=range>0?Math.min(((exp-r.current)/range)*100,100):100;
        return r;
    }

    function getMartianDate(){
        const months=['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];
        const days=[31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];
        const MD=days.reduce((s,d)=>s+d,0);
        const EY=668.6;
        const now=new Date();
        const daysFrom=(now-new Date(2026,0,1))/86400000;
        const year=Math.floor(3798000000+2740+daysFrom/EY);
        const dayOfYear=Math.floor((daysFrom*(MD/EY))%MD);
        let rem=dayOfYear,mi=0;
        for(let i=0;i<days.length;i++){if(rem<days[i]){mi=i;break;}rem-=days[i];}
        const seasons=['Пробуждение','Цветение','Зной','Ветры','Угасание','Заморозки','Тьма','Ледяной покров'];
        return{year:year.toLocaleString(),month:months[mi],day:rem+1,season:seasons[Math.floor(mi/2)%seasons.length]};
    }

    function showToast(msg,type='info'){
        const colors={success:'linear-gradient(135deg,#27ae60,#16a085)',info:'linear-gradient(135deg,#3498db,#2980b9)',warning:'linear-gradient(135deg,#e67e22,#d35400)',error:'linear-gradient(135deg,#e74c3c,#c0392b)'};
        const t=document.createElement('div');
        t.style.cssText=`position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:${colors[type]||colors.info};color:#fff;padding:12px 26px;border-radius:30px;font-weight:600;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:99999;transition:transform .4s cubic-bezier(.16,1,.3,1);pointer-events:none;`;
        t.textContent=msg;
        document.body.appendChild(t);
        requestAnimationFrame(()=>{t.style.transform='translateX(-50%) translateY(0)';});
        setTimeout(()=>{t.style.transform='translateX(-50%) translateY(100px)';setTimeout(()=>t.remove(),400);},2400);
    }

    function escapeHtml(s){
        return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }

    function playSound(type){
        if(!preferences.notification_sound) return;
        try{
            const ctx=new (window.AudioContext||window.webkitAudioContext)();
            const osc=ctx.createOscillator();
            const gain=ctx.createGain();
            osc.type='sine';
            osc.frequency.value=type==='success'?880:440;
            gain.gain.setValueAtTime(.15,ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.3);
            osc.connect(gain);gain.connect(ctx.destination);
            osc.start();osc.stop(ctx.currentTime+.3);
        }catch(e){}
    }

    // ============================================================
    // ОЖИДАНИЕ КЛИЕНТА
    // ============================================================
    function waitForClient(maxAttempts=50){
        return new Promise(resolve=>{
            let attempts=0;
            const check=setInterval(()=>{
                attempts++;
                if(window.supabaseClient){
                    clearInterval(check);client=window.supabaseClient;
                    console.log('✅ Профиль: клиент получен');resolve(client);
                }else if(attempts>maxAttempts){
                    clearInterval(check);console.error('❌ Профиль: клиент не загрузился');resolve(null);
                }
            },100);
        });
    }

    async function getSessionSafe(maxAttempts=20){
        for(let i=0;i<maxAttempts;i++){
            if(window.marsSession?.ready) return {user:window.marsSession.user};
            await new Promise(r=>setTimeout(r,200));
        }
        if(!client) return {user:null};
        const {data}=await client.auth.getSession();
        return {user:data?.session?.user||null};
    }

    // ============================================================
    // ЗАГРУЗКА ДАННЫХ (ПАРАЛЛЕЛЬНО + КЭШ)
    // ============================================================
    async function loadAllData(user){
        const startTime=performance.now();
        console.log('⏱️ Загрузка профиля...');

        // Кэш — показываем сразу
        try{
            const cached=localStorage.getItem('pf_cache_'+user.id);
            if(cached){
                const d=JSON.parse(cached);
                currentProfile=d.currentProfile||currentProfile;
                if(currentProfile?.kingdom&&KINGDOMS[currentProfile.kingdom]) kingdom=KINGDOMS[currentProfile.kingdom];
                achievementsList=d.achievementsList||[];notifications=d.notifications||[];
                leaders=d.leaders||[];guild=d.guild||null;guildMembers=d.guildMembers||[];
                friends=d.friends||[];notes=d.notes||[];streak=d.streak||0;
                privacy=d.privacy||{};preferences=d.preferences||{};
                console.log('⚡ Из кэша за',Math.round(performance.now()-startTime),'мс');
                render();
            }
        }catch(e){}

        // Параллельная загрузка
        const timeout=ms=>new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms));

        try{
            const [
                profileRes,uaRes,notifRes,leadersRes,
                guildRes,friendsRes,notesRes,streakRes,
                privacyRes,prefsRes
            ]=await Promise.all([
                Promise.race([client.from('profiles').select('*').eq('user_id',user.id).single(),timeout(8000)]).catch(()=>({data:null})),
                Promise.race([client.from('user_achievements').select('achievement_id, earned_at').eq('user_id',user.id).order('earned_at',{ascending:false}),timeout(8000)]).catch(()=>({data:[]})),
                Promise.race([client.from('notifications').select('*').eq('user_id',user.id).order('created_at',{ascending:false}).limit(10),timeout(8000)]).catch(()=>({data:[]})),
                Promise.race([client.from('profiles').select('user_id, username, display_name, experience, level, avatar_url').order('experience',{ascending:false}).limit(10),timeout(8000)]).catch(()=>({data:[]})),
                Promise.race([client.from('guild_members').select('guild_id').eq('user_id',user.id).maybeSingle(),timeout(8000)]).catch(()=>({data:null})),
                Promise.race([client.from('friends').select('*').or(`user_id.eq.${user.id},friend_id.eq.${user.id}`),timeout(8000)]).catch(()=>({data:[]})),
                Promise.race([client.from('user_notes').select('*').eq('user_id',user.id).order('pinned',{ascending:false}).order('updated_at',{ascending:false}),timeout(8000)]).catch(()=>({data:[]})),
                Promise.race([client.from('daily_logins').select('streak').eq('user_id',user.id).order('login_date',{ascending:false}).limit(1),timeout(5000)]).catch(()=>({data:[]})),
                Promise.race([client.from('user_privacy').select('*').eq('user_id',user.id).maybeSingle(),timeout(5000)]).catch(()=>({data:null})),
                Promise.race([client.from('user_preferences').select('*').eq('user_id',user.id).maybeSingle(),timeout(5000)]).catch(()=>({data:null}))
            ]);

            if(profileRes?.data){
                currentProfile=profileRes.data;
                if(currentProfile.kingdom&&KINGDOMS[currentProfile.kingdom]) kingdom=KINGDOMS[currentProfile.kingdom];
            }

            if(uaRes?.data&&uaRes.data.length>0){
                const ids=uaRes.data.map(x=>x.achievement_id);
                const {data:meta}=await client.from('achievements').select('*').in('id',ids);
                const map={};(meta||[]).forEach(m=>{map[m.id]=m;});
                achievementsList=uaRes.data.map(x=>({...map[x.achievement_id],earned_at:x.earned_at})).filter(x=>x.id);
            }

            notifications=notifRes?.data||[];
            leaders=leadersRes?.data||[];
            notes=notesRes?.data||[];
            streak=streakRes?.data?.[0]?.streak||0;
            privacy=privacyRes?.data||{};
            preferences=prefsRes?.data||{};

            // Гильдия
            if(guildRes?.data?.guild_id){
                const {data:g}=await client.from('guilds').select('*').eq('id',guildRes.data.guild_id).single();
                guild=g;
                if(guild){
                    const {data:members}=await client.from('guild_members').select('user_id, role, joined_at').eq('guild_id',guild.id).order('joined_at',{ascending:true}).limit(50);
                    if(members&&members.length>0){
                        const ids=members.map(m=>m.user_id);
                        const {data:profs}=await client.from('profiles').select('user_id, display_name, username, avatar_url').in('user_id',ids);
                        const map={};(profs||[]).forEach(p=>{map[p.user_id]=p;});
                        guildMembers=members.map(m=>({...m,profile:map[m.user_id]||{}}));
                    }
                }
            }

            // Друзья
            if(friendsRes?.data&&friendsRes.data.length>0){
                const ids=new Set();
                friendsRes.data.forEach(f=>{ids.add(f.user_id);ids.add(f.friend_id);});
                ids.delete(user.id);
                const {data:profs}=await client.from('profiles').select('user_id, display_name, username, avatar_url').in('user_id',[...ids]);
                const map={};(profs||[]).forEach(p=>{map[p.user_id]=p;});
                friends=friendsRes.data.map(f=>{
                    const otherId=f.user_id===user.id?f.friend_id:f.user_id;
                    return{...f,other:map[otherId]||{user_id:otherId}};
                });
            }

            // Кэш
            try{
                localStorage.setItem('pf_cache_'+user.id,JSON.stringify({
                    currentProfile,achievementsList,notifications,leaders,
                    guild,guildMembers,friends,notes,streak,privacy,preferences,
                    cachedAt:Date.now()
                }));
            }catch(e){}

            console.log('✅ Профиль загружен за',Math.round(performance.now()-startTime),'мс');
            render();
        }catch(e){
            console.error('❌ Ошибка:',e);
        }
    }

    // ============================================================
    // РЕНДЕР
    // ============================================================
    function render(){
        document.documentElement.style.setProperty('--kingdom-color',kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg',kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-light',kingdom.light);
        document.documentElement.style.setProperty('--kingdom-shadow',kingdom.color+'40');
        document.body.style.background=kingdom.bg;
        document.body.style.backgroundAttachment='fixed';

        const lvl=getLevelInfo(currentProfile.experience||0);
        const displayName=currentProfile.display_name||currentProfile.username||currentUser.email.split('@')[0];
        const avatar=currentProfile.avatar_url||AVATARS[0];
        const isModerator=currentProfile.role==='moderator';
        const martianDate=getMartianDate();
        const notifEnabled=currentProfile.notifications_enabled!==false;

        container.innerHTML=`
            <div class="pf-hero pf-fade">
                <div class="pf-hero-content">
                    <div class="pf-avatar-wrap">
                        <img src="${avatar}" alt="" class="pf-avatar">
                        <div class="pf-level-badge">${lvl.title}</div>
                    </div>
                    <div class="pf-info">
                        <h1 class="pf-name">
                            ${escapeHtml(displayName)}
                            ${isModerator?'<span class="pf-role-badge">🛡️ Модератор</span>':''}
                            ${guild?`<span class="pf-guild-badge" onclick="pfSetTab('guild')">${guild.icon||'🏰'} ${escapeHtml(guild.name)}</span>`:''}
                        </h1>
                        <p class="pf-email">${currentUser.email}</p>
                        <div class="pf-stats-row">
                            <div class="pf-stat-mini"><span class="pf-sm-label">Уровень</span><span class="pf-sm-value">⭐ ${lvl.level}</span></div>
                            <div class="pf-stat-mini"><span class="pf-sm-label">Опыт</span><span class="pf-sm-value">💎 ${currentProfile.experience||0}</span></div>
                            <div class="pf-stat-mini"><span class="pf-sm-label">Достижений</span><span class="pf-sm-value">🏆 ${achievementsList.length}</span></div>
                            ${streak>0?`<div class="pf-stat-mini"><span class="pf-sm-label">Серия</span><span class="pf-sm-value">🔥 ${streak}</span></div>`:''}
                        </div>
                        <div class="pf-progress"><div class="pf-progress-bar" style="width:${lvl.percent}%;"></div></div>
                        <div class="pf-progress-text">До уровня ${lvl.level+1}: ${Math.max(lvl.next-(currentProfile.experience||0),0)} XP</div>
                    </div>
                </div>
            </div>

            <div class="pf-quick-grid pf-fade" style="animation-delay:.05s;">
                <a href="/stats/" class="pf-quick-card"><div class="pf-quick-icon">📊</div><div class="pf-quick-body"><div class="pf-quick-title">Статистика</div><div class="pf-quick-desc">Дашборд</div></div></a>
                <a href="/achievements/" class="pf-quick-card"><div class="pf-quick-icon">🎁</div><div class="pf-quick-body"><div class="pf-quick-title">Достижения</div><div class="pf-quick-desc">Все награды</div></div></a>
                <a href="/bookmarks/" class="pf-quick-card"><div class="pf-quick-icon">📚</div><div class="pf-quick-body"><div class="pf-quick-title">Закладки</div><div class="pf-quick-desc">Сохранённое</div></div></a>
                <a href="/quests/" class="pf-quick-card"><div class="pf-quick-icon">🗺️</div><div class="pf-quick-body"><div class="pf-quick-title">Квесты</div><div class="pf-quick-desc">Задания</div></div></a>
                <a href="/guilds/" class="pf-quick-card"><div class="pf-quick-icon">🏰</div><div class="pf-quick-body"><div class="pf-quick-title">Гильдии</div><div class="pf-quick-desc">${guild?escapeHtml(guild.name):'Найти'}</div></div></a>
                <a href="/interactive/" class="pf-quick-card"><div class="pf-quick-icon">🎮</div><div class="pf-quick-body"><div class="pf-quick-title">Интерактив</div><div class="pf-quick-desc">Игры</div></div></a>
                <a href="/horoscope/" class="pf-quick-card"><div class="pf-quick-icon">🔮</div><div class="pf-quick-body"><div class="pf-quick-title">Гороскоп</div><div class="pf-quick-desc">Судьба</div></div></a>
                <a href="/scrolls/" class="pf-quick-card"><div class="pf-quick-icon">📜</div><div class="pf-quick-body"><div class="pf-quick-title">Свитки</div><div class="pf-quick-desc">Библиотека</div></div></a>
                <a href="/forum/" class="pf-quick-card"><div class="pf-quick-icon">💬</div><div class="pf-quick-body"><div class="pf-quick-title">Форум</div><div class="pf-quick-desc">Общение</div></div></a>
                <a href="/feed/" class="pf-quick-card"><div class="pf-quick-icon">📰</div><div class="pf-quick-body"><div class="pf-quick-title">Лента</div><div class="pf-quick-desc">Активность</div></div></a>
            </div>

            <div id="pf-qr-wrapper" style="display:none;">
                <button class="pf-qr-btn pf-fade" onclick="pfOpenQR && pfOpenQR()">
                    <span style="font-size:1.5rem;">📱</span>
                    <span>Привязать телефон (вход по QR)</span>
                </button>
            </div>

            <div class="pf-tabs pf-fade" style="animation-delay:.1s;">
                <button class="pf-tab active" data-tab="overview">👤 Обзор</button>
                <button class="pf-tab" data-tab="guild">🏰 Гильдия</button>
                <button class="pf-tab" data-tab="achievements">🏅 Достижения</button>
                <button class="pf-tab" data-tab="notes">📝 Заметки ${notes.length?`(${notes.length})`:''}</button>
                <button class="pf-tab" data-tab="notifications">🔔 ${notifications.length?`(${notifications.length})`:'Уведомления'}</button>
                <button class="pf-tab" data-tab="friends">👥 Друзья ${friends.length?`(${friends.length})`:''}</button>
                <button class="pf-tab" data-tab="ai">🤖 ИИ</button>
                <button class="pf-tab" data-tab="leaderboard">🏆 Лидеры</button>
                <button class="pf-tab" data-tab="security">🔐 Безопасность</button>
                <button class="pf-tab" data-tab="customize">🎨 Кастомизация</button>
                <button class="pf-tab" data-tab="settings">⚙️ Настройки</button>
            </div>

            <!-- ОБЗОР -->
            <div class="pf-tab-content active" data-content="overview">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>
                    <p style="margin:0 0 12px 0;color:#555;font-size:.95rem;line-height:1.6;" id="bio-text">${escapeHtml(currentProfile.bio||'✍️ Ещё ничего не рассказал о себе.')}</p>
                    <button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>
                    <div class="pf-calendar">
                        <div class="pf-cal-month">${martianDate.month}</div>
                        <div class="pf-cal-day">${martianDate.day}</div>
                        <div class="pf-cal-year">Год ${martianDate.year} Э.О.</div>
                        <div class="pf-cal-season">${martianDate.season}</div>
                    </div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">📊</span> Статистика</h3>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;">
                        <div style="text-align:center;padding:16px;background:rgba(0,0,0,.03);border-radius:12px;"><div style="font-size:1.8rem;font-weight:800;color:var(--kingdom-color);">${achievementsList.length}</div><div style="font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-top:4px;">Достижений</div></div>
                        <div style="text-align:center;padding:16px;background:rgba(0,0,0,.03);border-radius:12px;"><div style="font-size:1.8rem;font-weight:800;color:var(--kingdom-color);">${notes.length}</div><div style="font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-top:4px;">Заметок</div></div>
                        <div style="text-align:center;padding:16px;background:rgba(0,0,0,.03);border-radius:12px;"><div style="font-size:1.8rem;font-weight:800;color:var(--kingdom-color);">${friends.length}</div><div style="font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-top:4px;">Друзей</div></div>
                        <div style="text-align:center;padding:16px;background:rgba(0,0,0,.03);border-radius:12px;"><div style="font-size:1.8rem;font-weight:800;color:var(--kingdom-color);">${streak}</div><div style="font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-top:4px;">Серия</div></div>
                    </div>
                </div>
            </div>

            <!-- ГИЛЬДИЯ -->
            <div class="pf-tab-content" data-content="guild">
                ${guild?`
                    <div class="pf-guild-hero" style="--guild-color:${guild.color||'var(--kingdom-color)'};">
                        <div class="pf-guild-icon">${guild.icon||'🏰'}</div>
                        <div class="pf-guild-info">
                            <h2 class="pf-guild-name">${escapeHtml(guild.name)}</h2>
                            <div class="pf-guild-meta">
                                <span>👥 ${guildMembers.length} участников</span>
                                <span>👑 ${guildMembers.find(m=>m.role==='leader')?.profile?.display_name||'Лидер'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="pf-card">
                        <h3 class="pf-card-title"><span class="pf-ct-icon">📜</span> Описание</h3>
                        <p style="margin:0;color:#555;line-height:1.6;">${escapeHtml(guild.description||'Без описания')}</p>
                    </div>
                    <div class="pf-card">
                        <h3 class="pf-card-title"><span class="pf-ct-icon">👥</span> Участники</h3>
                        ${guildMembers.map(m=>{
                            const name=m.profile.display_name||m.profile.username||'Аноним';
                            const av=m.profile.avatar_url||`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=64`;
                            return`<div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:rgba(0,0,0,.03);border-radius:10px;margin-bottom:6px;"><img src="${av}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid var(--kingdom-color);"><div style="flex:1;"><div style="font-weight:700;font-size:.9rem;">${escapeHtml(name)}</div><div style="font-size:.72rem;color:#888;">${m.role==='leader'?'👑 Лидер':'👤 Участник'}</div></div></div>`;
                        }).join('')}
                    </div>
                    <div class="pf-card">
                        <a href="/guilds/" class="pf-btn pf-btn-outline" style="text-decoration:none;">🏰 Перейти в гильдии</a>
                        ${guild.leader_id===currentUser.id?`<button class="pf-btn pf-btn-danger" style="margin-left:8px;" onclick="pfDeleteGuild()">🗑️ Удалить</button>`:''}
                    </div>
                `:`
                    <div class="pf-card" style="text-align:center;padding:50px 20px;">
                        <div style="font-size:4rem;margin-bottom:12px;">🏰</div>
                        <h3 style="margin:0 0 8px 0;">Вы пока не в гильдии</h3>
                        <p style="color:#888;margin:0 0 20px 0;">Присоединяйтесь к другим исследователям!</p>
                        <a href="/guilds/" class="pf-btn" style="text-decoration:none;">🔍 Найти гильдию</a>
                    </div>
                `}
            </div>

            <!-- ДОСТИЖЕНИЯ -->
            <div class="pf-tab-content" data-content="achievements">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🏅</span> Ваши достижения (${achievementsList.length})</h3>
                    ${achievementsList.length===0?`<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет достижений. Читайте статьи, проходите викторины!</p>`:`<div class="pf-ach-grid">${achievementsList.map(a=>`<div class="pf-ach"><div class="pf-ach-icon">${a.icon||'🏅'}</div><div class="pf-ach-body"><div class="pf-ach-name">${escapeHtml(a.name||'Достижение')}</div><div class="pf-ach-date">${a.earned_at?new Date(a.earned_at).toLocaleDateString('ru-RU'):''}</div></div></div>`).join('')}</div>`}
                    <div style="margin-top:16px;"><a href="/achievements/" class="pf-btn pf-btn-outline" style="text-decoration:none;">🎁 Все достижения</a></div>
                </div>
            </div>

            <!-- ЗАМЕТКИ -->
            <div class="pf-tab-content" data-content="notes">
                <div class="pf-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
                        <h3 class="pf-card-title" style="margin:0;"><span class="pf-ct-icon">📝</span> Мои заметки (${notes.length})</h3>
                        <button class="pf-btn" onclick="pfOpenNoteForm()">➕ Новая</button>
                    </div>
                    <div class="pf-note-form" id="pf-note-form">
                        <input type="text" class="pf-note-input title" id="pf-note-title" placeholder="Заголовок" maxlength="100">
                        <textarea class="pf-note-input content" id="pf-note-content" placeholder="Текст..." maxlength="5000"></textarea>
                        <div style="font-size:.8rem;color:#888;margin-bottom:6px;">Цвет:</div>
                        <div class="pf-note-colors" id="pf-note-colors"></div>
                        <div style="display:flex;gap:8px;flex-wrap:wrap;">
                            <button class="pf-btn" onclick="pfSaveNote()" id="pf-note-save-btn">💾 Сохранить</button>
                            <button class="pf-btn pf-btn-outline" onclick="pfCloseNoteForm()">Отмена</button>
                        </div>
                    </div>
                    ${notes.length===0?`<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет заметок.</p>`:`<div class="pf-notes-grid">${notes.map(n=>`<div class="pf-note ${n.pinned?'pinned':''}" style="--note-color:${n.color};" onclick="pfEditNote(${n.id})"><div class="pf-note-title">${n.pinned?'📌 ':''}${escapeHtml(n.title||'Заметка')}</div><div class="pf-note-content">${escapeHtml(n.content)}</div><div class="pf-note-date">${new Date(n.updated_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div><div class="pf-note-actions" onclick="event.stopPropagation();"><button class="pf-note-btn" onclick="pfPinNote(${n.id})">${n.pinned?'📍':'📌'}</button><button class="pf-note-btn" onclick="pfEditNote(${n.id})">✏️</button><button class="pf-note-btn danger" onclick="pfDeleteNote(${n.id})">🗑️</button></div></div>`).join('')}</div>`}
                </div>
            </div>

            <!-- УВЕДОМЛЕНИЯ -->
            <div class="pf-tab-content" data-content="notifications">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Уведомления</h3>
                    ${notifications.length===0?`<p style="text-align:center;color:#888;padding:40px 20px;">Уведомлений пока нет.</p>`:notifications.map(n=>`<div class="pf-notif"><div class="pf-notif-icon">📬</div><div><div class="pf-notif-text">${escapeHtml(n.message||n.text||'')}</div><div class="pf-notif-date">${new Date(n.created_at).toLocaleDateString('ru-RU')}</div></div></div>`).join('')}
                </div>
            </div>

            <!-- ДРУЗЬЯ -->
            <div class="pf-tab-content" data-content="friends">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">👥</span> Друзья (${friends.length})</h3>
                    ${friends.length===0?`<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет друзей.</p>`:friends.map(f=>{
                        const name=f.other.display_name||f.other.username||'Аноним';
                        const av=f.other.avatar_url||`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6C63FF&color=fff&size=64`;
                        const status=f.status==='accepted'?'👥 Друзья':'⏳ Заявка';
                        return`<div class="pf-notif" onclick="pfViewProfile('${f.other.user_id}')" style="cursor:pointer;"><img src="${av}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid var(--kingdom-color);"><div style="flex:1;"><div style="font-weight:700;">${escapeHtml(name)}</div><div style="font-size:.78rem;color:#888;">${status}</div></div></div>`;
                    }).join('')}
                </div>
            </div>

            <!-- ИИ -->
            <div class="pf-tab-content" data-content="ai">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🤖</span> ИИ-гид</h3>
                    <div class="pf-chat" id="pf-chat-container"><div class="pf-chat-msg bot">Привет! Спрашивай о Марсе! 🪐</div></div>
                    <div class="pf-chat-input">
                        <input type="text" id="pf-chat-input" placeholder="Спросите..." onkeypress="if(event.key==='Enter')pfSendChat()">
                        <button onclick="pfSendChat()">Отправить</button>
                    </div>
                </div>
            </div>

            <!-- ЛИДЕРЫ -->
            <div class="pf-tab-content" data-content="leaderboard">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10</h3>
                    <table class="pf-leaderboard">
                        <thead><tr><th>#</th><th>Участник</th><th style="text-align:right;">Ур.</th><th style="text-align:right;">XP</th></tr></thead>
                        <tbody>
                        ${leaders.map((l,i)=>{
                            const name=l.display_name||l.username||'Аноним';
                            const medals=['🥇','🥈','🥉'];
                            const isMe=l.user_id===currentUser.id;
                            return`<tr onclick="pfViewProfile('${l.user_id}')" style="${isMe?'background:'+kingdom.color+';color:#fff;font-weight:700;':''}"><td>${medals[i]||(i+1)}</td><td><img src="${l.avatar_url||'https://ui-avatars.com/api/?name='+encodeURIComponent(name)+'&background=6C63FF&color=fff&size=64'}" class="pf-lb-avatar">${escapeHtml(name)}${isMe?' (вы)':''}</td><td style="text-align:right;">${l.level||1}</td><td style="text-align:right;"><b>${l.experience||0}</b></td></tr>`;
                        }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 🔐 БЕЗОПАСНОСТЬ (2FA) -->
            <div class="pf-tab-content" data-content="security">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🔐</span> Двухфакторная аутентификация (2FA)</h3>
                    <p style="color:#666;font-size:.9rem;line-height:1.6;margin:0 0 16px 0;">
                        Дополнительный уровень защиты: помимо пароля, потребуется код из приложения (Google Authenticator, Authy, Microsoft Authenticator).
                    </p>
                    <div id="pf-2fa-status" style="margin-bottom:20px;"></div>
                    <div id="pf-2fa-actions" style="display:flex;gap:8px;flex-wrap:wrap;"></div>
                    <div id="pf-2fa-setup" style="display:none;margin-top:20px;padding:20px;background:rgba(0,0,0,.03);border-radius:14px;"></div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">📱</span> Активные сессии</h3>
                    <p style="color:#666;font-size:.9rem;line-height:1.6;margin:0 0 16px 0;">
                        Устройства, где вы вошли. Если увидели незнакомое — выйдите из него.
                    </p>
                    <div id="pf-sessions-list"><p style="color:#888;">Загрузка...</p></div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🔑</span> Смена пароля</h3>
                    <p style="color:#666;font-size:.9rem;line-height:1.6;margin:0 0 16px 0;">Регулярно меняйте пароль для безопасности.</p>
                    <button class="pf-btn" onclick="pfChangePassword()">🔐 Сменить пароль</button>
                </div>
            </div>

            <!-- 🎨 КАСТОМИЗАЦИЯ -->
            <div class="pf-tab-content" data-content="customize">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🎨</span> Цветовая тема профиля</h3>
                    <p style="color:#666;font-size:.9rem;margin:0 0 12px 0;">Выберите цвет, который будет использоваться в вашем профиле.</p>
                    <div class="pf-theme-colors" id="pf-theme-colors"></div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Звуки и уведомления</h3>
                    <div class="pf-toggle">
                        <div>
                            <div class="pf-toggle-label">Звуки уведомлений</div>
                            <div class="pf-toggle-desc">Проигрывать звук при получении XP и достижений</div>
                        </div>
                        <div class="pf-switch ${preferences.notification_sound?'on':''}" id="pf-switch-sound" onclick="pfTogglePref('notification_sound')"></div>
                    </div>
                    <div class="pf-toggle">
                        <div>
                            <div class="pf-toggle-label">Email-уведомления</div>
                            <div class="pf-toggle-desc">Получать письма о достижениях</div>
                        </div>
                        <div class="pf-switch ${notifEnabled?'on':''}" id="pf-switch-email" onclick="pfToggleEmail()"></div>
                    </div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🔒</span> Приватность</h3>
                    <div class="pf-toggle">
                        <div><div class="pf-toggle-label">Показывать опыт</div><div class="pf-toggle-desc">Другие видят ваш уровень и XP</div></div>
                        <div class="pf-switch ${privacy.show_experience!==false?'on':''}" onclick="pfTogglePrivacy('show_experience')"></div>
                    </div>
                    <div class="pf-toggle">
                        <div><div class="pf-toggle-label">Показывать достижения</div><div class="pf-toggle-desc">Ваши трофеи видны другим</div></div>
                        <div class="pf-switch ${privacy.show_achievements!==false?'on':''}" onclick="pfTogglePrivacy('show_achievements')"></div>
                    </div>
                    <div class="pf-toggle">
                        <div><div class="pf-toggle-label">Показывать гильдию</div><div class="pf-toggle-desc">Видно, в какой вы гильдии</div></div>
                        <div class="pf-switch ${privacy.show_guild!==false?'on':''}" onclick="pfTogglePrivacy('show_guild')"></div>
                    </div>
                    <div class="pf-toggle">
                        <div><div class="pf-toggle-label">Разрешить заявки в друзья</div><div class="pf-toggle-desc">Другие могут добавлять вас</div></div>
                        <div class="pf-switch ${privacy.allow_friend_requests!==false?'on':''}" onclick="pfTogglePrivacy('allow_friend_requests')"></div>
                    </div>
                </div>
            </div>

            <!-- НАСТРОЙКИ -->
            <div class="pf-tab-content" data-content="settings">
                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">👤</span> Имя пользователя</h3>
                    <p style="color:#555;margin:0 0 12px 0;">Текущее: <b id="pf-display-name">${escapeHtml(displayName)}</b></p>
                    <button class="pf-btn pf-btn-outline" onclick="pfEditName()">✏️ Изменить</button>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">📧</span> Email</h3>
                    <p style="color:#555;margin:0 0 12px 0;">Текущий: <b>${currentUser.email}</b></p>
                    <button class="pf-btn pf-btn-outline" onclick="pfChangeEmail()">✏️ Сменить email</button>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🖼️</span> Аватар</h3>
                    <div class="pf-avatar-grid">
                        ${AVATARS.map(url=>`<img src="${url}" alt="" class="pf-avatar-option ${avatar===url?'selected':''}" onclick="pfSelectAvatar('${url}')">`).join('')}
                    </div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">🏰</span> Королевство</h3>
                    <div class="pf-kingdom-grid">
                        ${Object.entries(KINGDOMS).map(([name,k])=>`<button class="pf-kingdom-btn ${currentProfile.kingdom===name?'selected':''}" style="${currentProfile.kingdom===name?'background:'+k.color+';border-color:'+k.color+';':''}" onclick="pfSelectKingdom('${name}')">${name}</button>`).join('')}
                    </div>
                    <div style="text-align:center;margin-top:16px;">
                        <img src="${kingdom.flag}" alt="" style="width:80px;border-radius:6px;border:1px solid #a2a9b1;">
                        <div style="font-size:.72rem;color:#666;margin-top:4px;">Флаг ${currentProfile.kingdom||'Эдем'}</div>
                    </div>
                </div>

                <div class="pf-card">
                    <h3 class="pf-card-title"><span class="pf-ct-icon">📤</span> Экспорт данных</h3>
                    <p style="color:#666;font-size:.9rem;margin:0 0 12px 0;">Скачайте все свои данные в формате JSON.</p>
                    <button class="pf-btn pf-btn-outline" onclick="pfExportData()">📥 Скачать данные</button>
                </div>

                <div class="pf-card pf-danger">
                    <h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">⚠️</span> Опасная зона</h3>
                    <p style="color:#888;font-size:.9rem;margin:0 0 16px 0;">Удаление аккаунта необратимо.</p>
                    <button class="pf-btn pf-btn-danger" onclick="pfDeleteAccount()">🗑️ Удалить аккаунт</button>
                </div>

                <div class="pf-card">
                    <button class="pf-btn pf-btn-outline" onclick="pfLogout()" style="width:100%;justify-content:center;">🚪 Выйти</button>
                </div>
            </div>
        `;

        const isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<768;
        if(!isMobile){
            const qrWrap=document.getElementById('pf-qr-wrapper');
            if(qrWrap) qrWrap.style.display='block';
        }

        renderNoteColors();
        renderThemeColors();
        render2FA();

        document.querySelectorAll('.pf-tab').forEach(tab=>{
            tab.onclick=()=>pfSetTab(tab.dataset.tab);
        });
    }

    function renderNoteColors(){
        const el=document.getElementById('pf-note-colors');
        if(!el) return;
        el.innerHTML=NOTE_COLORS.map(c=>`<div class="pf-note-color ${c===selectedNoteColor?'selected':''}" style="background:${c};" onclick="pfSelectNoteColor('${c}')"></div>`).join('');
    }

    function renderThemeColors(){
        const el=document.getElementById('pf-theme-colors');
        if(!el) return;
        const current=preferences.theme_color||'#6C63FF';
        el.innerHTML=THEME_COLORS.map(c=>`<div class="pf-theme-color ${c===current?'selected':''}" style="background:${c};" onclick="pfSelectThemeColor('${c}')"></div>`).join('');
    }

    // ============================================================
    // 🔐 2FA
    // ============================================================
    async function render2FA(){
        const statusEl=document.getElementById('pf-2fa-status');
        const actionsEl=document.getElementById('pf-2fa-actions');
        if(!statusEl||!actionsEl) return;

        try{
            const {data:factors}=await client.auth.mfa.listFactors();
            const totpFactor=factors?.totp?.find(f=>f.status==='verified');

            if(totpFactor){
                statusEl.innerHTML=`<div class="pf-badge-2fa">✅ 2FA включена</div>`;
                actionsEl.innerHTML=`<button class="pf-btn pf-btn-danger" onclick="pfDisable2FA('${totpFactor.id}')">🔓 Отключить 2FA</button>`;
            }else{
                statusEl.innerHTML=`<div class="pf-badge-2fa off">⚠️ 2FA не настроена</div>`;
                actionsEl.innerHTML=`<button class="pf-btn" onclick="pfSetup2FA()">🔐 Включить 2FA</button>`;
            }
        }catch(e){
            console.warn('2FA недоступна:',e);
            statusEl.innerHTML=`<div class="pf-badge-2fa off">⚠️ 2FA недоступна</div>`;
            actionsEl.innerHTML=`<p style="color:#888;font-size:.85rem;">Функция 2FA не активирована в вашем проекте Supabase. Включите её в <b>Authentication → Providers → MFA</b>.</p>`;
        }
    }

    window.pfSetup2FA=async function(){
        const setupEl=document.getElementById('pf-2fa-setup');
        if(!setupEl) return;
        setupEl.style.display='block';
        setupEl.innerHTML=`
            <div style="text-align:center;padding:20px;">
                <div style="display:inline-block;width:40px;height:40px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:pfSpin .8s linear infinite;"></div>
                <p style="margin-top:12px;color:#888;">Настройка 2FA...</p>
            </div>
        `;

        try{
            const {data,error}=await client.auth.mfa.enroll({
                factorType:'totp',
                friendlyName:'Mars Encyclopedia 2FA'
            });

            if(error) throw error;

            const qrCode=data.totp.qr_code;
            const secret=data.totp.secret;
            const factorId=data.id;

            setupEl.innerHTML=`
                <h4 style="margin:0 0 8px 0;">Шаг 1: Отсканируйте QR</h4>
                <p style="color:#666;font-size:.88rem;margin:0 0 12px 0;">Откройте Google Authenticator или Authy и отсканируйте код:</p>
                <div style="text-align:center;margin-bottom:20px;">
                    <img src="${qrCode}" alt="QR" style="max-width:220px;width:100%;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.15);">
                </div>
                <details style="margin-bottom:20px;">
                    <summary style="cursor:pointer;color:#666;font-size:.85rem;">Не работает камера? Ввести код вручную</summary>
                    <div style="background:#f0f4ff;padding:12px;border-radius:8px;margin-top:8px;font-family:monospace;font-size:.85rem;color:#6C63FF;font-weight:700;word-break:break-all;user-select:all;">${secret}</div>
                </details>

                <h4 style="margin:0 0 8px 0;">Шаг 2: Введите код из приложения</h4>
                <input type="text" id="pf-2fa-code" placeholder="000000" maxlength="6" style="width:100%;padding:14px;border:2px solid rgba(0,0,0,.1);border-radius:10px;font-size:1.2rem;text-align:center;letter-spacing:8px;font-family:monospace;margin-bottom:12px;box-sizing:border-box;">

                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button class="pf-btn" onclick="pfVerify2FA('${factorId}')">✅ Подтвердить</button>
                    <button class="pf-btn pf-btn-outline" onclick="pfCancel2FA('${factorId}')">Отмена</button>
                </div>
            `;
        }catch(e){
            console.error('Ошибка 2FA:',e);
            setupEl.innerHTML=`<p style="color:#c0392b;">Ошибка: ${e.message}</p>`;
        }
    };

    window.pfVerify2FA=async function(factorId){
        const code=document.getElementById('pf-2fa-code').value.trim();
        if(code.length!==6){showToast('Введите 6-значный код','warning');return;}

        try{
            const {data:challenge,error:errChallenge}=await client.auth.mfa.challenge({factorId});
            if(errChallenge) throw errChallenge;

            const {error:errVerify}=await client.auth.mfa.verify({
                factorId,challengeId:challenge.id,code
            });
            if(errVerify) throw errVerify;

            showToast('✅ 2FA включена!','success');
            playSound('success');
            setTimeout(()=>location.reload(),1000);
        }catch(e){
            showToast('Неверный код: '+e.message,'error');
        }
    };

    window.pfCancel2FA=async function(factorId){
        try{await client.auth.mfa.unenroll({factorId});}catch(e){}
        document.getElementById('pf-2fa-setup').style.display='none';
    };

    window.pfDisable2FA=async function(factorId){
        if(!confirm('Отключить 2FA? Аккаунт станет менее защищённым.')) return;
        try{
            const {error}=await client.auth.mfa.unenroll({factorId});
            if(error) throw error;
            showToast('🔓 2FA отключена','info');
            setTimeout(()=>location.reload(),800);
        }catch(e){
            showToast('Ошибка: '+e.message,'error');
        }
    };

    // ============================================================
    // КАСТОМИЗАЦИЯ И ПРИВАТНОСТЬ
    // ============================================================
    window.pfSelectThemeColor=async function(color){
        preferences.theme_color=color;
        try{
            await client.from('user_preferences').upsert({
                user_id:currentUser.id,theme_color:color,updated_at:new Date().toISOString()
            },{onConflict:'user_id'});
            showToast('🎨 Цвет сохранён!','success');
            setTimeout(()=>location.reload(),600);
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    window.pfTogglePref=async function(key){
        const newVal=!preferences[key];
        preferences[key]=newVal;
        try{
            await client.from('user_preferences').upsert({
                user_id:currentUser.id,[key]:newVal,updated_at:new Date().toISOString()
            },{onConflict:'user_id'});
            const el=document.getElementById('pf-switch-'+key.replace('notification_',''));
            if(el) el.classList.toggle('on',newVal);
            showToast(newVal?'🔊 Включено':'🔇 Выключено','info');
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    window.pfToggleEmail=async function(){
        const newVal=currentProfile.notifications_enabled===false;
        try{
            await client.from('profiles').update({notifications_enabled:newVal}).eq('user_id',currentUser.id);
            currentProfile.notifications_enabled=newVal;
            document.getElementById('pf-switch-email').classList.toggle('on',newVal);
            showToast(newVal?'📧 Email включены':'📭 Email выключены','info');
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    window.pfTogglePrivacy=async function(key){
        const newVal=!privacy[key];
        privacy[key]=newVal;
        try{
            await client.from('user_privacy').upsert({
                user_id:currentUser.id,[key]:newVal,updated_at:new Date().toISOString()
            },{onConflict:'user_id'});
            showToast('🔒 Настройка сохранена','success');
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    // ============================================================
    // ЭКСПОРТ ДАННЫХ
    // ============================================================
    window.pfExportData=async function(){
        try{
            const exportData={
                exported_at:new Date().toISOString(),
                user:{id:currentUser.id,email:currentUser.email,created_at:currentUser.created_at},
                profile:currentProfile,
                achievements:achievementsList,
                notes:notes,
                friends:friends.map(f=>({status:f.status,friend:f.other})),
                guild:guild?{name:guild.name,icon:guild.icon}:null,
                privacy,preferences,streak
            };

            const blob=new Blob([JSON.stringify(exportData,null,2)],{type:'application/json'});
            const url=URL.createObjectURL(blob);
            const a=document.createElement('a');
            a.href=url;a.download=`mars-profile-${currentUser.id.slice(0,8)}-${Date.now()}.json`;
            document.body.appendChild(a);a.click();
            document.body.removeChild(a);URL.revokeObjectURL(url);

            showToast('📥 Данные скачаны!','success');
            playSound('success');
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    // ============================================================
    // СМЕНА ПАРОЛЯ
    // ============================================================
    window.pfChangePassword=async function(){
        const currentPassword=prompt('Введите текущий пароль:');
        if(!currentPassword) return;
        const newPassword=prompt('Введите новый пароль (минимум 6 символов):');
        if(!newPassword||newPassword.length<6){showToast('Пароль минимум 6 символов','warning');return;}

        try{
            const {error}=await client.auth.updateUser({password:newPassword});
            if(error) throw error;
            showToast('🔐 Пароль обновлён!','success');
            playSound('success');
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    // ============================================================
    // ЭКСПОРТ ОСТАЛЬНЫХ ФУНКЦИЙ
    // ============================================================
    window.pfSetTab=function(tab){
        document.querySelectorAll('.pf-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
        document.querySelectorAll('.pf-tab-content').forEach(c=>c.classList.toggle('active',c.dataset.content===tab));
        window.scrollTo({top:0,behavior:'smooth'});
    };

    window.pfViewProfile=function(id){window.location.href='/profile-view/?user_id='+id;};

    window.pfEditBio=async function(){
        const cur=document.getElementById('bio-text')?.innerText||'';
        const nb=prompt('Введите биографию:',cur);
        if(nb===null) return;
        const {error}=await client.from('profiles').update({bio:nb.trim()}).eq('user_id',currentUser.id);
        if(error){showToast('Ошибка: '+error.message,'error');return;}
        document.getElementById('bio-text').innerText=nb.trim();
        showToast('✅ Биография обновлена!','success');
    };

    window.pfEditName=async function(){
        const cur=document.getElementById('pf-display-name')?.innerText||'';
        const nn=prompt('Новое имя (2-20 символов, латиница):',cur);
        if(!nn||nn===cur) return;
        if(nn.length<2||nn.length>20){showToast('Имя 2-20 символов','warning');return;}
        if(!/^[a-zA-Z0-9\s\-_]+$/.test(nn)){showToast('Только латиница','warning');return;}
        const lower=nn.toLowerCase();
        for(const b of BAD_WORDS) if(lower.includes(b)){showToast('Недопустимое слово','error');return;}
        const {error}=await client.from('profiles').update({display_name:nn.trim()}).eq('user_id',currentUser.id);
        if(error){showToast('Ошибка: '+error.message,'error');return;}
        showToast('✅ Имя обновлено!','success');
        setTimeout(()=>location.reload(),800);
    };

    window.pfChangeEmail=async function(){
        const ne=prompt('Введите новый email:');
        if(!ne||ne===currentUser.email) return;
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ne)){showToast('Некорректный email','warning');return;}
        showToast('Отправка...','info');
        const {error}=await client.auth.updateUser({email:ne});
        if(error){showToast('Ошибка: '+error.message,'error');return;}
        showToast('📧 Письмо отправлено!','success');
    };

    window.pfSelectAvatar=async function(url){
        const {error}=await client.from('profiles').update({avatar_url:url}).eq('user_id',currentUser.id);
        if(error){showToast('Ошибка','error');return;}
        showToast('✅ Аватар обновлён!','success');
        setTimeout(()=>location.reload(),800);
    };

    window.pfSelectKingdom=async function(name){
        const {error}=await client.from('profiles').update({kingdom:name}).eq('user_id',currentUser.id);
        if(error){showToast('Ошибка','error');return;}
        showToast(`✅ ${name}!`,'success');
        setTimeout(()=>location.reload(),800);
    };

    window.pfDeleteAccount=async function(){
        if(!confirm('⚠️ Удалить аккаунт? Необратимо!')) return;
        const email=prompt('Введите email для подтверждения:');
        if(!email||email!==currentUser.email){showToast('Email не совпадает','error');return;}
        const {data}=await client.auth.getSession();
        const token=data?.session?.access_token;
        if(!token){showToast('Ошибка токена','error');return;}
        try{
            const res=await fetch(`${SUPABASE_URL}/functions/v1/delete-user`,{
                method:'DELETE',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}
            });
            const json=await res.json();
            if(json.error) throw new Error(json.error);
            showToast('Аккаунт удалён','success');
            localStorage.clear();
            setTimeout(()=>window.location.href='/',800);
        }catch(e){showToast('Ошибка: '+e.message,'error');}
    };

    window.pfLogout=async function(){
        await client.auth.signOut();
        localStorage.clear();
        window.location.href='/';
    };

    window.pfDeleteGuild=async function(){
        if(!guild||!confirm('Удалить гильдию?')) return;
        await client.from('guilds').delete().eq('id',guild.id);
        showToast('Гильдия удалена','info');
        setTimeout(()=>location.reload(),800);
    };

    // ЗАМЕТКИ
    window.pfOpenNoteForm=function(id=null){
        editingNoteId=id;
        const form=document.getElementById('pf-note-form');
        if(!form) return;
        form.classList.add('open');
        if(id){
            const n=notes.find(x=>x.id===id);
            if(n){
                document.getElementById('pf-note-title').value=n.title||'';
                document.getElementById('pf-note-content').value=n.content;
                selectedNoteColor=n.color||'#6C63FF';
                document.getElementById('pf-note-save-btn').textContent='💾 Обновить';
            }
        }else{
            document.getElementById('pf-note-title').value='';
            document.getElementById('pf-note-content').value='';
            selectedNoteColor='#6C63FF';
            document.getElementById('pf-note-save-btn').textContent='💾 Сохранить';
        }
        renderNoteColors();
    };

    window.pfCloseNoteForm=function(){
        document.getElementById('pf-note-form')?.classList.remove('open');
        editingNoteId=null;
    };

    window.pfSelectNoteColor=function(c){selectedNoteColor=c;renderNoteColors();};

    window.pfSaveNote=async function(){
        const title=document.getElementById('pf-note-title').value.trim();
        const content=document.getElementById('pf-note-content').value.trim();
        if(!content){showToast('Введите текст','warning');return;}
        let error;
        if(editingNoteId){
            const r=await client.from('user_notes').update({title,content,color:selectedNoteColor,updated_at:new Date().toISOString()}).eq('id',editingNoteId);
            error=r.error;
        }else{
            const r=await client.from('user_notes').insert({user_id:currentUser.id,title,content,color:selectedNoteColor});
            error=r.error;
        }
        if(error){showToast('Ошибка: '+error.message,'error');return;}
        showToast('✅ Заметка сохранена!','success');
        playSound('success');
        setTimeout(()=>location.reload(),700);
    };

    window.pfEditNote=function(id){pfOpenNoteForm(id);};

    window.pfPinNote=async function(id){
        const n=notes.find(x=>x.id===id);
        if(!n) return;
        await client.from('user_notes').update({pinned:!n.pinned}).eq('id',id);
        showToast(n.pinned?'📍 Откреплено':'📌 Закреплено','success');
        setTimeout(()=>location.reload(),500);
    };

    window.pfDeleteNote=async function(id){
        if(!confirm('Удалить заметку?')) return;
        await client.from('user_notes').delete().eq('id',id);
        showToast('Удалено','info');
        setTimeout(()=>location.reload(),500);
    };

    // ЧАТ
    window.pfSendChat=async function(){
        const input=document.getElementById('pf-chat-input');
        const chatEl=document.getElementById('pf-chat-container');
        const q=input.value.trim();
        if(!q) return;
        const userMsg=document.createElement('div');
        userMsg.className='pf-chat-msg user';userMsg.textContent=q;
        chatEl.appendChild(userMsg);chatEl.scrollTop=chatEl.scrollHeight;
        input.value='';
        try{
            const res=await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`,{
                method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q})
            });
            const data=await res.json();
            const botMsg=document.createElement('div');
            botMsg.className='pf-chat-msg bot';
            botMsg.textContent=data.reply||data.error||'Нет ответа';
            chatEl.appendChild(botMsg);chatEl.scrollTop=chatEl.scrollHeight;
        }catch(e){
            const err=document.createElement('div');
            err.className='pf-chat-msg bot';err.textContent='⚠️ Ошибка';
            chatEl.appendChild(err);
        }
    };

    // ============================================================
    // ИНИЦИАЛИЗАЦИЯ
    // ============================================================
    async function init(){
        // Скелетон
        container.innerHTML=`
            <div style="max-width:1000px;margin:0 auto;">
                <div class="pf-skeleton" style="background:linear-gradient(135deg,#6C63FF,#A29BFE);border-radius:24px;padding:36px 32px;margin-bottom:24px;min-height:180px;"></div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:24px;">
                    ${Array(6).fill(0).map(()=>'<div class="pf-skeleton" style="background:#fff;border-radius:16px;height:80px;"></div>').join('')}
                </div>
                <div style="text-align:center;padding:40px;color:#888;">
                    <div style="display:inline-block;width:40px;height:40px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:pfSpin .8s linear infinite;"></div>
                    <p style="margin-top:16px;">Загрузка профиля...</p>
                </div>
            </div>
        `;

        await waitForClient();
        if(!client){container.innerHTML='<div style="text-align:center;padding:60px;"><h2>⚠️ Ошибка загрузки</h2></div>';return;}

        const session=await getSessionSafe();
        currentUser=session.user;

        if(!currentUser){
            container.innerHTML=`
                <div style="text-align:center;padding:60px 20px;max-width:400px;margin:0 auto;">
                    <div style="font-size:4rem;margin-bottom:16px;">🔒</div>
                    <h2 style="margin:0 0 8px 0;">Вы не авторизованы</h2>
                    <p style="color:#888;margin:0 0 20px 0;">Войдите, чтобы увидеть профиль</p>
                    <a href="/login/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">Войти</a>
                </div>
            `;
            return;
        }

        console.log('✅ Профиль: пользователь',currentUser.email);
        await loadAllData(currentUser);
    }

    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
    else init();
})();
</script>
