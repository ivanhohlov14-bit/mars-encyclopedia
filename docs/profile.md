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
.pf-name{font-size:2rem;font-weight:800;margin:0 0 6px 0;color:#fff;letter-spacing:-.5px;background:linear-gradient(90deg,#fff,#A29BFE,#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:pfShine 6s linear infinite}
.pf-email{font-size:.9rem;opacity:.85;margin:0 0 16px 0}
.pf-stats-row{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px}
.pf-stat-mini{display:flex;flex-direction:column;gap:2px}
.pf-sm-label{font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600}
.pf-sm-value{font-size:1.4rem;font-weight:800;letter-spacing:-.5px}
.pf-progress{background:rgba(255,255,255,.2);border-radius:12px;height:12px;overflow:hidden;margin-bottom:6px;position:relative}
.pf-progress-bar{height:100%;background:linear-gradient(90deg,var(--kl),#fff);border-radius:12px;transition:width 1.2s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px rgba(255,255,255,.6);position:relative}
.pf-progress-bar::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);animation:pfShine 2s linear infinite}
.pf-progress-text{font-size:.78rem;opacity:.9}

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

/* ACTIVITY HEATMAP */
.pf-heatmap{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;margin-top:14px}
.pf-heat-cell{aspect-ratio:1;background:rgba(108,99,255,.08);border-radius:3px;transition:all .25s;cursor:pointer;position:relative}
.pf-heat-cell:hover{transform:scale(1.3);z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.2)}
.pf-heat-cell[data-level="1"]{background:rgba(108,99,255,.25)}
.pf-heat-cell[data-level="2"]{background:rgba(108,99,255,.45)}
.pf-heat-cell[data-level="3"]{background:rgba(108,99,255,.7)}
.pf-heat-cell[data-level="4"]{background:rgba(108,99,255,1);box-shadow:0 0 8px var(--ks)}

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

/* CALENDAR */
.pf-calendar{text-align:center;padding:20px;background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.4));border-radius:14px;border:1px solid rgba(0,0,0,.05)}
.pf-cal-month{font-size:1.2rem;font-weight:800;color:var(--kc);margin-bottom:4px}
.pf-cal-day{font-size:2.5rem;font-weight:900;color:#1a1a1a;line-height:1;margin:6px 0}
.pf-cal-year{font-size:.9rem;color:#666;font-weight:600}
.pf-cal-season{display:inline-block;margin-top:12px;padding:5px 16px;background:var(--kc);color:#fff;border-radius:20px;font-size:.78rem;font-weight:700}

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

/* SKELETON */
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
}
@media (prefers-reduced-motion: reduce){
    *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
</style>

<script>
(function(){
    'use strict';

    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';
    var BACKUP_KEY = 'mars-auth-backup';
    var PROFILE_CACHE_KEY = 'mars-profile-cache';
    var ACTIVITY_KEY = 'mars-activity-v1';
    var XP_HISTORY_KEY = 'mars-xp-history';

    var container = document.getElementById('profile-app');
    if (!container) return;

    // ============================================================
    // SESSION
    // ============================================================
    function getCookie(name){
        try{
            var cs=document.cookie.split(';');
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

    function saveEverywhere(s){
        var raw=JSON.stringify([s]);
        try{localStorage.setItem(MY_KEY,raw);}catch(e){}
        try{localStorage.setItem(SB_KEY,raw);}catch(e){}
        try{localStorage.setItem(BACKUP_KEY,raw);}catch(e){}
        var exp=new Date(Date.now()+365*86400000).toUTCString();
        try{document.cookie=MY_KEY+'='+encodeURIComponent(raw)+'; expires='+exp+'; path=/; SameSite=Lax';}catch(e){}
    }

    // ============================================================
    // CACHE
    // ============================================================
    function readCache(key,ttl){
        try{
            var raw=localStorage.getItem(key);
            if(!raw)return null;
            var c=JSON.parse(raw);
            if(!c||Date.now()-c.ts>(ttl||5*60*1000))return null;
            return c.data;
        }catch(e){return null;}
    }
    function writeCache(key,data){
        try{localStorage.setItem(key,JSON.stringify({data:data,ts:Date.now()}));}catch(e){}
    }

    // ============================================================
    // FETCH с ретраями
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
                clearTimeout(tid);
                return res;
            }catch(e){lastErr=e;if(i<retries)await new Promise(function(r){setTimeout(r,600*(i+1));});}
        }
        throw lastErr;
    }

    async function apiGet(path,token){
        var headers={'apikey':SUPABASE_KEY};
        if(token)headers['Authorization']='Bearer '+token;
        var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{headers:headers},2);
        if(!res.ok)throw new Error('HTTP '+res.status);
        var txt=await res.text();
        if(!txt)return null;
        try{return JSON.parse(txt);}catch(e){return null;}
    }

    async function apiPost(path,body,token,prefer){
        var headers={'apikey':SUPABASE_KEY,'Content-Type':'application/json'};
        if(token)headers['Authorization']='Bearer '+token;
        if(prefer)headers['Prefer']=prefer;
        var res=await fetchRetry(SUPABASE_URL+'/rest/v1/'+path,{method:'POST',headers:headers,body:JSON.stringify(body)},2);
        if(!res.ok)throw new Error('HTTP '+res.status);
        var txt=await res.text();
        if(!txt)return null;
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
    // ACTIVITY TRACKING (localStorage)
    // ============================================================
    function trackActivity(){
        try{
            var a=JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'{}');
            var today=new Date().toISOString().slice(0,10);
            a[today]=(a[today]||0)+1;
            var cutoff=new Date(Date.now()-90*86400000).toISOString().slice(0,10);
            Object.keys(a).forEach(function(k){if(k<cutoff)delete a[k];});
            localStorage.setItem(ACTIVITY_KEY,JSON.stringify(a));
            return a;
        }catch(e){return {};}
    }

    function getActivity(){
        try{return JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'{}');}catch(e){return {};}
    }

    function trackXP(points){
        try{
            var h=JSON.parse(localStorage.getItem(XP_HISTORY_KEY)||'{}');
            var today=new Date().toISOString().slice(0,10);
            h[today]=(h[today]||0)+points;
            var cutoff=new Date(Date.now()-90*86400000).toISOString().slice(0,10);
            Object.keys(h).forEach(function(k){if(k<cutoff)delete h[k];});
            localStorage.setItem(XP_HISTORY_KEY,JSON.stringify(h));
        }catch(e){}
    }

    // ============================================================
    // CONSTANTS
    // ============================================================
    var KINGDOMS={'Аркадия':'#D4A574','Ксанф':'#3D3D3D','Эдем':'#F4A460','Эридания':'#F5D76E','Кхонг':'#A9A9A9','Авсония':'#87CEEB','Кимерия':'#B19CD9','Серпентида':'#E57373','Эритрей':'#64B5F6','Утопия':'#4DD0E1','Эллада':'#FF8A65','Аливасото':'#81C784'};
    var AVATARS=['/assets/images/авотарка%20девушки.png','/assets/images/мужчина.png','/assets/images/мужчина2.png','/assets/images/мужчина%203.png'];
    var NOTE_COLORS=['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63'];
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
        exp=exp||0;
        var level=1;
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
        t.className='pf-toast '+type;
        t.textContent=msg;
        document.body.appendChild(t);
        requestAnimationFrame(function(){t.classList.add('show');});
        setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},400);},2500);
    }

    // ============================================================
    // MODAL SYSTEM
    // ============================================================
    function showModal(opts){
        var bg=document.createElement('div');
        bg.className='pf-modal-bg';
        var m=document.createElement('div');
        m.className='pf-modal';
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
            '<div class="pf-modal-actions">'+
            '<button class="pf-btn pf-btn-outline" id="m-cancel">Отмена</button>'+
            '<button class="pf-btn" id="m-ok">'+escapeHtml(opts.okText||'Сохранить')+'</button>'+
            '</div>';
        bg.appendChild(m);
        document.body.appendChild(bg);

        function close(){bg.remove();}
        bg.addEventListener('click',function(e){if(e.target===bg)close();});
        m.querySelector('#m-cancel').onclick=close;

        var first=m.querySelector('.pf-modal-input');
        if(first)setTimeout(function(){first.focus();first.select();},100);

        m.querySelector('#m-ok').onclick=function(){
            var vals={};
            (opts.fields||[]).forEach(function(f){
                var el=m.querySelector('#m-'+f.name);
                vals[f.name]=el?el.value.trim():'';
            });
            close();
            if(opts.onOk)opts.onOk(vals);
        };

        // Enter to submit (кроме textarea)
        m.addEventListener('keydown',function(e){
            if(e.key==='Enter'&&e.target.tagName!=='TEXTAREA'){
                e.preventDefault();
                m.querySelector('#m-ok').click();
            }
            if(e.key==='Escape')close();
        });
    }

    // ============================================================
    // STATE
    // ============================================================
    var currentUser=null;
    var currentProfile=null;
    var kingdomColor='#6C63FF';
    var achievements=[];
    var notes=[];
    var notifications=[];
    var leaders=[];
    var streak=0;
    var editingNoteId=null;
    var selectedNoteColor='#6C63FF';
    var totalTime=0;
    var sessionStart=Date.now();
    var _isActive=true;
    var _renderDone=false;
    try{var st=localStorage.getItem('mars_total_time');if(st)totalTime=parseInt(st,10)||0;}catch(e){}

    // Таймер активности
    setInterval(function(){
        if(!_isActive)return;
        totalTime++;
        if(totalTime%5===0)try{localStorage.setItem('mars_total_time',totalTime);}catch(e){}
        var el=document.getElementById('pf-timer-total');if(el)el.textContent=formatDuration(totalTime);
        var el2=document.getElementById('pf-timer-session');if(el2)el2.textContent=formatDuration(Math.floor((Date.now()-sessionStart)/1000));
    },1000);
    document.addEventListener('visibilitychange',function(){_isActive=!document.hidden;});

    function formatDuration(s){
        var h=Math.floor(s/3600);var m=Math.floor((s%3600)/60);
        if(h>0)return h+'ч '+m+'м';
        if(m>0)return m+'м';
        return s+'с';
    }

    function getMartianDate(){
        var months=['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];
        var days=[31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];
        var MD=days.reduce(function(s,d){return s+d;},0);
        var EY=668.6;
        var now=new Date();
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
        _renderDone=true;

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

        var html='';

        // HERO
        html+='<div class="pf-hero pf-fade"><div class="pf-hero-content">';
        html+='<div class="pf-avatar-wrap"><div class="pf-avatar-ring"></div><img src="'+avatar+'" alt="" class="pf-avatar" loading="eager"><div class="pf-level-badge">'+lvl.title+' · ур. '+lvl.level+'</div></div>';
        html+='<div class="pf-info">';
        html+='<h1 class="pf-name">'+escapeHtml(displayName)+'</h1>';
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
        quicks.forEach(function(q){
            html+='<a href="'+q.href+'" class="pf-quick-card"><div class="pf-quick-icon">'+q.icon+'</div><div class="pf-quick-body"><div class="pf-quick-title">'+q.title+'</div><div class="pf-quick-desc">'+q.desc+'</div></div></a>';
        });
        html+='</div>';

        // TABS
        var tabs=[
            {id:'overview',icon:'👤',label:'Обзор'},
            {id:'activity',icon:'📊',label:'Активность'},
            {id:'achievements',icon:'🏅',label:'Достижения',count:achievements.length},
            {id:'notes',icon:'📝',label:'Заметки',count:notes.length},
            {id:'notifications',icon:'🔔',label:'Уведомления'},
            {id:'leaderboard',icon:'🏆',label:'Лидеры'},
            {id:'settings',icon:'⚙️',label:'Настройки'}
        ];
        html+='<div class="pf-tabs pf-fade" id="pf-tabs" style="animation-delay:.1s;">';
        tabs.forEach(function(t,i){
            html+='<button class="pf-tab'+(i===0?' active':'')+'" data-tab="'+t.id+'">'+t.icon+' '+t.label+(t.count?' <span class="pf-tab-count">'+t.count+'</span>':'')+'</button>';
        });
        html+='</div>';

        // OVERVIEW
        html+='<div class="pf-tab-content active" data-content="overview">';
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>';
        html+='<p style="margin:0 0 12px 0;color:#555;font-size:.95rem;line-height:1.6;" id="pf-bio">'+escapeHtml(currentProfile.bio||'✍️ Ещё ничего не рассказал о себе.')+'</p>';
        html+='<button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button></div>';

        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>';
        html+='<div class="pf-calendar"><div class="pf-cal-month">'+md.month+'</div><div class="pf-cal-day">'+md.day+'</div><div class="pf-cal-year">Год '+md.year+' Э.О.</div><div class="pf-cal-season">'+md.season+'</div></div></div>';
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
        html+='<div style="display:flex;gap:8px;align-items:center;font-size:.72rem;color:#888;margin-top:12px;justify-content:flex-end;">Меньше <span style="display:inline-block;width:10px;height:10px;background:rgba(108,99,255,.08);border-radius:2px;"></span><span style="display:inline-block;width:10px;height:10px;background:rgba(108,99,255,.25);border-radius:2px;"></span><span style="display:inline-block;width:10px;height:10px;background:rgba(108,99,255,.45);border-radius:2px;"></span><span style="display:inline-block;width:10px;height:10px;background:rgba(108,99,255,.7);border-radius:2px;"></span><span style="display:inline-block;width:10px;height:10px;background:var(--kc);border-radius:2px;"></span> Больше</div>';
        html+='</div>';

        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📈</span> XP за последние 14 дней</h3>';
        html+='<div id="pf-chart-wrap">'+renderXPChart()+'</div></div>';
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
                html+='<div class="pf-note'+(n.pinned?' pinned':'')+'" style="--note-color:'+(n.color||'#6C63FF')+';animation-delay:'+(i*.04)+'s;" onclick="pfEditNote('+n.id+')"><div class="pf-note-title">'+(n.pinned?'📌 ':'')+escapeHtml(n.title||'Заметка')+'</div><div class="pf-note-content">'+escapeHtml(n.content)+'</div><div class="pf-note-date">'+new Date(n.updated_at||n.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div><div class="pf-note-actions" onclick="event.stopPropagation();"><button class="pf-note-btn" onclick="pfPinNote('+n.id+')">'+(n.pinned?'📍':'📌')+'</button><button class="pf-note-btn" onclick="pfEditNote('+n.id+')">✏️</button><button class="pf-note-btn danger" onclick="pfDeleteNote('+n.id+')">🗑️</button></div></div>';
            });
            html+='</div>';
        }
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
        html+='<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10</h3>';
        html+='<table class="pf-leaderboard"><thead><tr><th>#</th><th>Участник</th><th style="text-align:right;">Ур.</th><th style="text-align:right;">XP</th></tr></thead><tbody>';
        leaders.forEach(function(l,i){
            var nm=l.display_name||l.username||'Аноним';
            var medals=['🥇','🥈','🥉'];
            var isMe=l.user_id===currentUser.id;
            html+='<tr style="'+(isMe?'background:'+kingdomColor+';color:#fff;font-weight:700;':'')+'animation-delay:'+(i*.04)+'s;"><td>'+(medals[i]||(i+1))+'</td><td><img src="'+(l.avatar_url||'https://ui-avatars.com/api/?name='+encodeURIComponent(nm)+'&background=6C63FF&color=fff&size=64')+'" class="pf-lb-avatar" loading="lazy">'+escapeHtml(nm)+(isMe?' (вы)':'')+'</td><td style="text-align:right;">'+(l.level||getLevel(l.experience||0).level)+'</td><td style="text-align:right;"><b>'+(l.experience||0)+'</b></td></tr>';
        });
        html+='</tbody></table></div></div>';

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
    }

    // ============================================================
    // HEATMAP
    // ============================================================
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
        var days=[];
        var max=1;
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
    // TABS + MOUSE WHEEL SCROLL + HOTKEYS
    // ============================================================
    function attachTabsEvents(){
        var tabsWrap=document.getElementById('pf-tabs');
        if(!tabsWrap)return;

        // Mouse wheel → horizontal scroll
        tabsWrap.addEventListener('wheel',function(e){
            if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){
                e.preventDefault();
                tabsWrap.scrollLeft+=e.deltaY*1.5;
            }
        },{passive:false});

        // Drag scroll
        var isDown=false,startX=0,startScroll=0;
        tabsWrap.addEventListener('mousedown',function(e){
            if(e.target.classList.contains('pf-tab'))return;
            isDown=true;startX=e.pageX;startScroll=tabsWrap.scrollLeft;
            tabsWrap.style.cursor='grabbing';
        });
        document.addEventListener('mouseup',function(){isDown=false;if(tabsWrap)tabsWrap.style.cursor='';});
        document.addEventListener('mousemove',function(e){
            if(!isDown)return;
            e.preventDefault();
            tabsWrap.scrollLeft=startScroll-(e.pageX-startX);
        });

        // Tab clicks
        tabsWrap.querySelectorAll('.pf-tab').forEach(function(tab){
            tab.onclick=function(){pfSetTab(tab.dataset.tab);};
        });
    }

    window.pfSetTab=function(tab){
        document.querySelectorAll('.pf-tab').forEach(function(t){
            var on=t.dataset.tab===tab;
            t.classList.toggle('active',on);
            if(on&&t.scrollIntoView){t.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});}
        });
        document.querySelectorAll('.pf-tab-content').forEach(function(c){
            c.classList.toggle('active',c.dataset.content===tab);
        });
    };

    // Hotkeys 1-7
    document.addEventListener('keydown',function(e){
        if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
        if(e.ctrlKey||e.metaKey||e.altKey)return;
        var tabs=['overview','activity','achievements','notes','notifications','leaderboard','settings'];
        var n=parseInt(e.key,10);
        if(n>=1&&n<=tabs.length){
            if(document.querySelector('.pf-tab'))pfSetTab(tabs[n-1]);
        }
    });

    // ============================================================
    // ACTIONS
    // ============================================================
    window.pfLogout=function(){
        [MY_KEY,SB_KEY,BACKUP_KEY,PROFILE_CACHE_KEY].forEach(function(k){
            try{localStorage.removeItem(k);}catch(e){}
            try{sessionStorage.removeItem(k);}catch(e){}
        });
        try{document.cookie=MY_KEY+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';}catch(e){}
        try{document.cookie=SB_KEY+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';}catch(e){}
        window.location.href='/';
    };

    window.pfEditBio=function(){
        showModal({
            title:'Биография',
            sub:'Расскажите о себе. Это увидят другие',
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
            title:'Новое имя',
            sub:'От 2 до 20 символов',
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
            // Мгновенно обновить в hero
            var hero=container.querySelector('.pf-avatar');
            if(hero)hero.src=url;
            document.querySelectorAll('.pf-avatar-option').forEach(function(img){
                img.classList.toggle('selected',img.src.indexOf(encodeURI(url))!==-1||img.getAttribute('src')===url);
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
            title:'⚠️ Удалить аккаунт?',
            sub:'Действие необратимо. Введите email для подтверждения:',
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
        try{
            await apiPatch('user_notes?id=eq.'+id,{pinned:!n.pinned},currentUser._token);
            setTimeout(function(){location.reload();},300);
        }catch(e){showToast('Ошибка','error');}
    };

    window.pfDeleteNote=function(id){
        showModal({
            title:'Удалить заметку?',
            sub:'Это действие нельзя отменить.',
            fields:[],
            okText:'Удалить',
            onOk:async function(){
                try{
                    await apiDelete('user_notes?id=eq.'+id,currentUser._token);
                    setTimeout(function(){location.reload();},300);
                }catch(e){showToast('Ошибка','error');}
            }
        });
    };

    window.pfSelectNoteColor=function(c){selectedNoteColor=c;};

    // ============================================================
    // LOAD — сначала кэш, потом фон
    // ============================================================
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

    async function loadProfile(session){
        currentUser=session.user;
        currentUser._token=session.access_token;

        // 1. Профиль
        var profiles;
        try{
            profiles=await apiGet('profiles?user_id=eq.'+encodeURIComponent(session.user.id)+'&select=*',session.access_token);
        }catch(e){
            throw new Error('Не удалось загрузить профиль: '+e.message);
        }

        currentProfile=Array.isArray(profiles)&&profiles.length?profiles[0]:null;

        if(!currentProfile){
            try{
                var created=await apiPost('profiles',{
                    user_id:session.user.id,
                    username:(session.user.email||'').split('@')[0],
                    display_name:(session.user.email||'').split('@')[0]
                },session.access_token,'return=representation');
                currentProfile=Array.isArray(created)&&created.length?created[0]:null;
            }catch(e){
                throw new Error('Профиль не создан: '+e.message);
            }
        }

        // 2. Кэшируем и рендерим
        writeCache(PROFILE_CACHE_KEY,{user:session.user,profile:currentProfile});
        render();

        // 3. Фоном — остальное параллельно
        try{
            var results=await Promise.all([
                apiGet('user_achievements?user_id=eq.'+session.user.id+'&select=achievement_id,earned_at',session.access_token).catch(function(){return [];}),
                apiGet('user_notes?user_id=eq.'+session.user.id+'&select=*&order=pinned.desc,updated_at.desc',session.access_token).catch(function(){return [];}),
                apiGet('notifications?user_id=eq.'+session.user.id+'&select=*&order=created_at.desc&limit=20',session.access_token).catch(function(){return [];}),
                apiGet('profiles?select=user_id,username,display_name,experience,avatar_url&order=experience.desc&limit=10',session.access_token).catch(function(){return [];}),
                apiGet('daily_logins?user_id=eq.'+session.user.id+'&select=streak&order=login_date.desc&limit=1',session.access_token).catch(function(){return [];})
            ]);

            var uaRes=results[0]||[];
            notes=results[1]||[];
            notifications=results[2]||[];
            leaders=results[3]||[];
            streak=(results[4]&&results[4][0]&&results[4][0].streak)||0;

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

            // Плавное обновление — без перерисовки всего
            updateCounters();
        }catch(e){
            console.warn('[profile] bg load error:',e.message);
        }
    }

    function updateCounters(){
        // Обновляем только счётчики в табах и hero
        document.querySelectorAll('.pf-tab').forEach(function(t){
            var content=t.dataset.tab;
            var cnt=null;
            if(content==='achievements')cnt=achievements.length;
            else if(content==='notes')cnt=notes.length;
            var span=t.querySelector('.pf-tab-count');
            if(cnt!==null){
                if(span)span.textContent=cnt;
                else if(cnt>0){
                    var s=document.createElement('span');s.className='pf-tab-count';s.textContent=cnt;
                    t.appendChild(s);
                }
            }
        });

        var heroStats=container.querySelectorAll('.pf-stats-row .pf-sm-value');
        if(heroStats[2])heroStats[2].textContent='🏆 '+achievements.length;

        // Таймер
        var el=container.querySelector('.pf-timer-value');
        // Ничего — таймер обновляется в setInterval
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

    // ============================================================
    // START — синхронно кэш → фоном fetch
    // ============================================================
    async function init(){
        trackActivity();

        var session=readSession();
        if(!session){
            session=await waitSession(3000);
            if(!session){showLogin();return;}
        }

        // ⚡ МГНОВЕННЫЙ РЕНДЕР ИЗ КЭША
        if(renderFromCache(session)){
            // Если рендер прошёл — сразу фоново обновляем
            loadProfile(session).catch(function(e){
                console.warn('[profile] reload error:',e.message);
            });
            return;
        }

        // Нет кэша — скелетон + загрузка
        renderSkeleton();

        try{
            await loadProfile(session);
        }catch(e){
            showError(e.message);
        }
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
