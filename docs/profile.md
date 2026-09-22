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
:root{--kc:#6C63FF;--kb:#F0F4FF;--kl:#A29BFE;--ks:rgba(108,99,255,.25)}
@keyframes pfSpin{to{transform:rotate(360deg)}}
@keyframes pfFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes pfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pfShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pfSlideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes pfGlow{0%,100%{box-shadow:0 4px 16px rgba(0,0,0,.04)}50%{box-shadow:0 12px 32px -8px var(--ks)}}
#profile-app{max-width:1100px;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px}
#profile-app a{text-decoration:none!important;border-bottom:none!important}
.pf-fade{animation:pfFadeIn .5s cubic-bezier(.16,1,.3,1) both}

/* HERO */
.pf-hero{position:relative;background:linear-gradient(135deg,#1a1a2e 0%,#2d1b3d 40%,#4a2a3a 100%);border-radius:24px;padding:44px 40px;color:#fff;margin-bottom:24px;overflow:hidden;box-shadow:0 20px 60px -12px rgba(0,0,0,.4)}
.pf-hero::before{content:'';position:absolute;top:-60%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,var(--ks),transparent 70%);border-radius:50%;animation:pfFloat 8s ease-in-out infinite}
.pf-hero::after{content:'';position:absolute;bottom:-60%;left:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(231,76,60,.15),transparent 70%);border-radius:50%;animation:pfFloat 10s ease-in-out infinite reverse}
.pf-hero-content{position:relative;z-index:2;display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.pf-avatar-wrap{position:relative;flex-shrink:0;animation:pfPulse 3s ease-in-out infinite}
.pf-avatar{width:120px;height:120px;border-radius:50%;border:4px solid rgba(255,255,255,.4);object-fit:cover;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.2)}
.pf-level-badge{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.95);color:var(--kc);padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:800;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.15);border:2px solid rgba(255,255,255,.5)}
.pf-info{flex:1;min-width:200px}
.pf-name{font-size:2rem;font-weight:800;margin:0 0 6px 0;color:#fff;display:flex;align-items:center;gap:12px;flex-wrap:wrap;letter-spacing:-.5px}
.pf-email{font-size:.9rem;opacity:.85;margin:0 0 16px 0}
.pf-stats-row{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px}
.pf-stat-mini{display:flex;flex-direction:column;gap:2px}
.pf-sm-label{font-size:.72rem;opacity:.8;text-transform:uppercase;letter-spacing:.8px;font-weight:600}
.pf-sm-value{font-size:1.4rem;font-weight:800;letter-spacing:-.5px}
.pf-progress{background:rgba(255,255,255,.2);border-radius:12px;height:12px;overflow:hidden;margin-bottom:6px}
.pf-progress-bar{height:100%;background:linear-gradient(90deg,var(--kl),#fff);border-radius:12px;transition:width 1.2s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px rgba(255,255,255,.6)}
.pf-progress-text{font-size:.78rem;opacity:.9}

/* QUICK GRID */
.pf-quick-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:24px}
.pf-quick-card{display:flex;align-items:center;gap:12px;padding:16px 18px;background:#fff;border-radius:16px;border:2px solid transparent;color:inherit;transition:all .3s;box-shadow:0 4px 12px rgba(0,0,0,.05);cursor:pointer}
.pf-quick-card:hover{transform:translateY(-4px);border-color:var(--kc);box-shadow:0 12px 32px -8px var(--ks)}
.pf-quick-icon{font-size:1.8rem;transition:transform .3s}
.pf-quick-card:hover .pf-quick-icon{transform:scale(1.15) rotate(-6deg)}
.pf-quick-title{font-size:.9rem;font-weight:800;color:#1a1a1a;margin-bottom:2px}
.pf-quick-desc{font-size:.72rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* TABS */
.pf-tabs{display:flex;gap:4px;margin-bottom:20px;overflow-x:auto;padding:6px;background:rgba(255,255,255,.9);border-radius:16px;border:1px solid rgba(0,0,0,.05);scroll-behavior:smooth}
.pf-tabs::-webkit-scrollbar{height:4px}
.pf-tabs::-webkit-scrollbar-thumb{background:var(--kc);border-radius:2px}
.pf-tab{flex-shrink:0;padding:10px 16px;border:none;background:transparent;color:#666;font-size:.85rem;font-weight:700;border-radius:12px;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:6px;font-family:inherit}
.pf-tab.active{background:linear-gradient(135deg,var(--kc),var(--kl));color:#fff;box-shadow:0 6px 16px -4px var(--ks)}
.pf-tab-count{background:rgba(255,255,255,.25);padding:1px 7px;border-radius:10px;font-size:.7rem}
.pf-tab-content{display:none;animation:pfFadeIn .4s ease}
.pf-tab-content.active{display:block}

/* CARDS */
.pf-card{background:#fff;border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:22px 26px;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:box-shadow .3s}
.pf-card:hover{box-shadow:0 12px 32px -8px var(--ks)}
.pf-card-title{font-size:1.1rem;font-weight:800;color:#1a1a1a;margin:0 0 16px 0;display:flex;align-items:center;gap:10px}
.pf-ct-icon{font-size:1.4rem}
.pf-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:30px;border:2px solid var(--kc);background:var(--kc);color:#fff;font-weight:700;font-size:.88rem;cursor:pointer;transition:all .25s;font-family:inherit;text-decoration:none!important}
.pf-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px -4px var(--ks)}
.pf-btn-outline{background:transparent;color:var(--kc)}
.pf-btn-outline:hover{background:var(--kc);color:#fff}
.pf-btn-danger{background:#e74c3c;border-color:#e74c3c}
.pf-timer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:16px}
.pf-timer-card{background:linear-gradient(135deg,rgba(108,99,255,.06),rgba(162,155,254,.03));border:1px solid rgba(108,99,255,.15);border-radius:14px;padding:16px 18px;text-align:center;animation:pfSlideUp .4s ease both}
.pf-timer-card:nth-child(1){animation-delay:.05s}
.pf-timer-card:nth-child(2){animation-delay:.1s}
.pf-timer-card:nth-child(3){animation-delay:.15s}
.pf-timer-card:nth-child(4){animation-delay:.2s}
.pf-timer-value{font-size:1.8rem;font-weight:900;color:var(--kc);line-height:1}
.pf-timer-label{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;margin-top:6px;font-weight:600}
.pf-timer-sub{font-size:.75rem;color:#aaa;margin-top:4px}

/* ACH */
.pf-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.pf-ach{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f8f9fb;border-radius:12px;border:2px solid transparent;transition:all .25s}
.pf-ach:hover{transform:translateY(-3px);border-color:var(--kc);box-shadow:0 12px 28px -8px var(--ks)}
.pf-ach.locked{opacity:.45;filter:grayscale(.6)}
.pf-ach-icon{font-size:1.8rem}
.pf-ach-name{font-size:.85rem;font-weight:700;color:#1a1a1a}
.pf-ach-date{font-size:.7rem;color:#888}

/* NOTES */
.pf-notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.pf-note{background:#fff;border-radius:12px;padding:16px;border-left:4px solid var(--note-color,var(--kc));box-shadow:0 4px 12px rgba(0,0,0,.06);transition:all .25s;cursor:pointer;min-height:120px;display:flex;flex-direction:column}
.pf-note:hover{transform:translateY(-3px);box-shadow:0 12px 28px -8px var(--ks)}
.pf-note.pinned{box-shadow:0 8px 24px -4px rgba(243,156,18,.4);border-left-color:#f39c12}
.pf-note-title{font-weight:800;font-size:.95rem;color:#1a1a1a;margin-bottom:6px}
.pf-note-content{font-size:.85rem;color:#555;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;flex:1;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.pf-note-date{font-size:.7rem;color:#999;margin-top:8px}
.pf-note-actions{display:flex;gap:4px;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.08)}
.pf-note-btn{padding:4px 10px;border-radius:8px;border:none;background:rgba(0,0,0,.05);font-size:.72rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit;color:#666}
.pf-note-btn:hover{background:var(--kc);color:#fff}
.pf-note-btn.danger:hover{background:#e74c3c;color:#fff}
.pf-note-form{background:#fff;border-radius:14px;padding:20px;margin-bottom:16px;border:2px solid var(--kc);box-shadow:0 8px 24px -8px var(--ks);display:none}
.pf-note-form.open{display:block}
.pf-note-input{width:100%;padding:12px 16px;border-radius:10px;border:2px solid rgba(0,0,0,.08);font-size:.9rem;font-family:inherit;outline:none;background:#fafafa;margin-bottom:10px;box-sizing:border-box}
.pf-note-input:focus{border-color:var(--kc);background:#fff}
.pf-note-input.title{font-weight:700}
.pf-note-input.content{min-height:100px;resize:vertical}
.pf-note-colors{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.pf-note-color{width:32px;height:32px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:all .2s}
.pf-note-color:hover{transform:scale(1.15)}
.pf-note-color.selected{border-color:#333;transform:scale(1.15)}

/* NOTIFS */
.pf-notif{display:flex;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.03);margin-bottom:8px}
.pf-notif-icon{font-size:1.3rem}
.pf-notif-text{font-size:.88rem;color:#333}
.pf-notif-date{font-size:.72rem;color:#999;margin-top:2px}

/* LEADERBOARD */
.pf-leaderboard{width:100%;border-collapse:collapse;font-size:.88rem}
.pf-leaderboard th{text-align:left;padding:10px 12px;font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;border-bottom:2px solid var(--kc)}
.pf-leaderboard td{padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.05)}
.pf-lb-avatar{width:28px;height:28px;border-radius:50%;vertical-align:middle;margin-right:8px;border:2px solid var(--kc);object-fit:cover}

/* CAL */
.pf-calendar{text-align:center;padding:20px;background:linear-gradient(135deg,var(--kb),rgba(255,255,255,.4));border-radius:14px;border:1px solid rgba(0,0,0,.05)}
.pf-cal-month{font-size:1.2rem;font-weight:800;color:var(--kc);margin-bottom:4px}
.pf-cal-day{font-size:2.5rem;font-weight:900;color:#1a1a1a;line-height:1;margin:6px 0}
.pf-cal-year{font-size:.9rem;color:#666;font-weight:600}
.pf-cal-season{display:inline-block;margin-top:12px;padding:5px 16px;background:var(--kc);color:#fff;border-radius:20px;font-size:.78rem;font-weight:700}

/* ACTIVITY BARS */
.pf-activity-bars{display:flex;align-items:flex-end;gap:3px;height:80px;margin-top:16px;padding:10px 0}
.pf-activity-bar{flex:1;background:linear-gradient(180deg,var(--kl),var(--kc));border-radius:3px 3px 0 0;min-height:4px;transition:height .5s;position:relative;cursor:pointer}
.pf-activity-bar:hover{filter:brightness(1.15)}

/* AVATARS */
.pf-avatar-grid{display:flex;gap:12px;flex-wrap:wrap}
.pf-avatar-option{width:60px;height:60px;border-radius:50%;cursor:pointer;border:3px solid transparent;object-fit:cover;transition:all .25s}
.pf-avatar-option:hover{transform:scale(1.1);border-color:var(--kc)}
.pf-avatar-option.selected{border-color:var(--kc);box-shadow:0 0 0 4px var(--ks)}

/* KINGDOMS */
.pf-kingdom-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px}
.pf-kingdom-btn{padding:10px 12px;border-radius:10px;border:2px solid rgba(0,0,0,.08);background:#fff;cursor:pointer;font-size:.8rem;font-weight:600;transition:all .25s;font-family:inherit;color:#333}
.pf-kingdom-btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.1)}
.pf-kingdom-btn.selected{color:#fff;box-shadow:0 6px 16px -4px var(--ks)}

/* TOAST */
.pf-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(120px);padding:12px 26px;border-radius:30px;font-weight:700;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:999999;transition:transform .4s cubic-bezier(.16,1,.3,1);color:#fff;max-width:90vw}
.pf-toast.show{transform:translateX(-50%) translateY(0)}
.pf-toast.success{background:linear-gradient(135deg,#27ae60,#16a085)}
.pf-toast.error{background:linear-gradient(135deg,#e74c3c,#c0392b)}
.pf-toast.info{background:linear-gradient(135deg,#3498db,#2980b9)}

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
}
</style>

<script>
(function(){
    'use strict';

    // ============================================================
    // CONFIG
    // ============================================================
    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';
    var BACKUP_KEY = 'mars-auth-backup';

    var container = document.getElementById('profile-app');
    if (!container) return;

    // ============================================================
    // SESSION — читаем ОЧЕНЬ РАНО, бэкапим сразу
    // ============================================================
    function getCookie(name) {
        try {
            var cs = document.cookie.split(';');
            for (var i = 0; i < cs.length; i++) {
                var c = cs[i].trim();
                if (c.indexOf(name + '=') === 0) return decodeURIComponent(c.substring(name.length + 1));
            }
        } catch(e) {}
        return null;
    }

    function readAllRaw() {
        var keys = [MY_KEY, SB_KEY, BACKUP_KEY];
        var i, v;
        for (i = 0; i < keys.length; i++) { try { v = localStorage.getItem(keys[i]); if (v) return v; } catch(e) {} }
        for (i = 0; i < keys.length; i++) { try { v = sessionStorage.getItem(keys[i]); if (v) return v; } catch(e) {} }
        for (i = 0; i < keys.length; i++) { v = getCookie(keys[i]); if (v) return v; }
        return null;
    }

    function parseSession(raw) {
        if (!raw) return null;
        try {
            var p = JSON.parse(raw);
            if (Array.isArray(p)) p = p[p.length - 1];
            if (!p || !p.access_token || !p.user) return null;
            if (p.expires_at && p.expires_at * 1000 < Date.now()) return null;
            return p;
        } catch(e) { return null; }
    }

    function saveEverywhere(s) {
        var raw = JSON.stringify([s]);
        var compact = JSON.stringify([{
            access_token: s.access_token,
            refresh_token: s.refresh_token,
            expires_at: s.expires_at,
            token_type: 'bearer',
            user: { id: s.user.id, email: s.user.email }
        }]);
        try { localStorage.setItem(MY_KEY, raw); } catch(e) {}
        try { localStorage.setItem(SB_KEY, raw); } catch(e) {}
        try { localStorage.setItem(BACKUP_KEY, raw); } catch(e) {}
        try { sessionStorage.setItem(MY_KEY, raw); } catch(e) {}
        var exp = new Date(Date.now() + 365 * 86400000).toUTCString();
        try { document.cookie = MY_KEY + '=' + encodeURIComponent(compact) + '; expires=' + exp + '; path=/; SameSite=Lax'; } catch(e) {}
        try { document.cookie = SB_KEY + '=' + encodeURIComponent(compact) + '; expires=' + exp + '; path=/; SameSite=Lax'; } catch(e) {}
    }

    function readSession() {
        var raw = readAllRaw();
        var parsed = parseSession(raw);
        if (parsed) saveEverywhere(parsed);
        return parsed;
    }

    // ⚡ СРАЗУ бэкапим при загрузке
    var EARLY = readSession();

    // Восстанавливаем из cookie каждые 2 секунды (защита от signOut() других скриптов)
    setInterval(function() {
        var s = readSession();
        if (s) return;
        // Пробуем восстановить из cookie
        var cookieRaw = getCookie(MY_KEY) || getCookie(SB_KEY);
        var cookieS = parseSession(cookieRaw);
        if (cookieS) saveEverywhere(cookieS);
    }, 2000);

    // ============================================================
    // FETCH с ретраями
    // ============================================================
    async function fetchRetry(url, opts, retries) {
        retries = retries == null ? 2 : retries;
        var lastErr;
        for (var i = 0; i <= retries; i++) {
            try {
                var ctrl = new AbortController();
                var tid = setTimeout(function() { ctrl.abort(); }, 15000);
                var o = Object.assign({}, opts, { signal: ctrl.signal });
                var res = await fetch(url, o);
                clearTimeout(tid);
                return res;
            } catch (e) {
                lastErr = e;
                if (i < retries) await new Promise(function(r) { setTimeout(r, 600 * (i + 1)); });
            }
        }
        throw lastErr;
    }

    // ============================================================
    // API — прямой fetch в Supabase REST
    // ============================================================
    async function apiGet(path, token) {
        var headers = { 'apikey': SUPABASE_KEY };
        if (token) headers['Authorization'] = 'Bearer ' + token;
        var res = await fetchRetry(SUPABASE_URL + '/rest/v1/' + path, { headers: headers }, 2);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var txt = await res.text();
        if (!txt) return null;
        try { return JSON.parse(txt); } catch(e) { return null; }
    }

    async function apiPost(path, body, token, prefer) {
        var headers = { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = 'Bearer ' + token;
        if (prefer) headers['Prefer'] = prefer;
        var res = await fetchRetry(SUPABASE_URL + '/rest/v1/' + path, {
            method: 'POST', headers: headers, body: JSON.stringify(body)
        }, 2);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var txt = await res.text();
        if (!txt) return null;
        try { return JSON.parse(txt); } catch(e) { return null; }
    }

    async function apiPatch(path, body, token) {
        var headers = { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = 'Bearer ' + token;
        var res = await fetchRetry(SUPABASE_URL + '/rest/v1/' + path, {
            method: 'PATCH', headers: headers, body: JSON.stringify(body)
        }, 2);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return true;
    }

    async function apiDelete(path, token) {
        var headers = { 'apikey': SUPABASE_KEY };
        if (token) headers['Authorization'] = 'Bearer ' + token;
        var res = await fetchRetry(SUPABASE_URL + '/rest/v1/' + path, { method: 'DELETE', headers: headers }, 2);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return true;
    }

    // ============================================================
    // KINGDOMS / LEVELS
    // ============================================================
    var KINGDOMS = {
        'Аркадия':'#D4A574','Ксанф':'#3D3D3D','Эдем':'#F4A460','Эридания':'#F5D76E',
        'Кхонг':'#A9A9A9','Авсония':'#87CEEB','Кимерия':'#B19CD9','Серпентида':'#E57373',
        'Эритрей':'#64B5F6','Утопия':'#4DD0E1','Эллада':'#FF8A65','Аливасото':'#81C784'
    };
    var AVATARS = [
        '/assets/images/авотарка%20девушки.png',
        '/assets/images/мужчина.png',
        '/assets/images/мужчина2.png',
        '/assets/images/мужчина%203.png'
    ];
    var NOTE_COLORS = ['#6C63FF','#e74c3c','#27ae60','#f39c12','#3498db','#9b59b6','#1abc9c','#e91e63'];
    var LEVEL_TITLES = ['🌱 Поселенец','🔭 Исследователь','🚀 Первопроходец','🏠 Колонизатор','⚡ Командир','⚔️ Воин','📜 Писец','🔮 Мудрец','👑 Аристократ','🏛️ Сенатор','💎 Магнат','🌟 Звёздный лорд','🐉 Дракон','🔥 Феникс','🌊 Повелитель морей','⛰️ Владыка гор','🗡️ Мастер клинка','🏹 Мастер лука','🛡️ Щитоносец','🎯 Снайпер'];

    function getLevel(exp) {
        exp = exp || 0;
        var level = 1;
        while (level < 100 && exp >= Math.floor(Math.pow(level + 1, 1.8) * 20)) level++;
        var curXp = Math.floor(Math.pow(level, 1.8) * 20);
        var nextXp = Math.floor(Math.pow(level + 1, 1.8) * 20);
        var pct = nextXp > curXp ? Math.min(((exp - curXp) / (nextXp - curXp)) * 100, 100) : 100;
        return {
            level: level,
            title: LEVEL_TITLES[level - 1] || ('Уровень ' + level),
            current: curXp, next: nextXp, percent: pct
        };
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function showToast(msg, type) {
        type = type || 'info';
        var t = document.createElement('div');
        t.className = 'pf-toast ' + type;
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(function() { t.classList.add('show'); });
        setTimeout(function() {
            t.classList.remove('show');
            setTimeout(function() { t.remove(); }, 400);
        }, 2500);
    }

    // ============================================================
    // STATE
    // ============================================================
    var currentUser = null;
    var currentProfile = null;
    var kingdomColor = '#6C63FF';
    var achievements = [];
    var notes = [];
    var notifications = [];
    var leaders = [];
    var streak = 0;
    var editingNoteId = null;
    var selectedNoteColor = '#6C63FF';
    var totalTime = 0;
    var sessionStart = Date.now();
    var _isActive = true;
    try { var st = localStorage.getItem('mars_total_time'); if (st) totalTime = parseInt(st, 10) || 0; } catch(e) {}

    // Таймер активности
    setInterval(function() {
        if (!_isActive) return;
        totalTime++;
        if (totalTime % 5 === 0) try { localStorage.setItem('mars_total_time', totalTime); } catch(e) {}
        var el = document.getElementById('pf-timer-total');
        if (el) el.textContent = formatDuration(totalTime);
        var el2 = document.getElementById('pf-timer-session');
        if (el2) el2.textContent = formatDuration(Math.floor((Date.now() - sessionStart) / 1000));
    }, 1000);
    document.addEventListener('visibilitychange', function() { _isActive = !document.hidden; });

    function formatDuration(s) {
        var h = Math.floor(s / 3600);
        var m = Math.floor((s % 3600) / 60);
        if (h > 0) return h + 'ч ' + m + 'м';
        if (m > 0) return m + 'м';
        return s + 'с';
    }

    function getMartianDate() {
        var months = ['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];
        var days = [31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];
        var MD = days.reduce(function(s,d){return s+d;},0);
        var EY = 668.6;
        var now = new Date();
        var daysFrom = (now - new Date(2026,0,1)) / 86400000;
        var year = Math.floor(3798000000 + 2740 + daysFrom / EY);
        var dayOfYear = Math.floor((daysFrom * (MD / EY)) % MD);
        var rem = dayOfYear, mi = 0;
        for (var i = 0; i < days.length; i++) { if (rem < days[i]) { mi = i; break; } rem -= days[i]; }
        var seasons = ['Пробуждение','Цветение','Зной','Ветры','Угасание','Заморозки','Тьма','Ледяной покров'];
        return { year: year.toLocaleString(), month: months[mi], day: rem + 1, season: seasons[Math.floor(mi/2) % seasons.length] };
    }

    // ============================================================
    // ГЛАВНЫЙ RENDER
    // ============================================================
    function render() {
        if (!currentProfile || !currentUser) return;

        // Цвета
        try {
            var kc = KINGDOMS[currentProfile.kingdom] || '#6C63FF';
            kingdomColor = kc;
            document.documentElement.style.setProperty('--kc', kc);
            document.documentElement.style.setProperty('--kl', kc + 'cc');
            document.documentElement.style.setProperty('--ks', kc + '40');
            document.documentElement.style.setProperty('--kb', kc + '15');
        } catch(e) {}

        var lvl = getLevel(currentProfile.experience || 0);
        var displayName = currentProfile.display_name || currentProfile.username || (currentUser.email || '').split('@')[0];
        var avatar = currentProfile.avatar_url || AVATARS[0];
        var md = getMartianDate();
        var xpLeft = Math.max(lvl.next - (currentProfile.experience || 0), 0);

        var html = '';

        // HERO
        html += '<div class="pf-hero pf-fade"><div class="pf-hero-content">';
        html += '<div class="pf-avatar-wrap"><img src="' + avatar + '" alt="" class="pf-avatar" loading="eager"><div class="pf-level-badge">' + lvl.title + ' · ур. ' + lvl.level + '</div></div>';
        html += '<div class="pf-info">';
        html += '<h1 class="pf-name">' + escapeHtml(displayName) + '</h1>';
        html += '<p class="pf-email">' + escapeHtml(currentUser.email || '') + '</p>';
        html += '<div class="pf-stats-row">';
        html += '<div class="pf-stat-mini"><span class="pf-sm-label">Уровень</span><span class="pf-sm-value">⭐ ' + lvl.level + '</span></div>';
        html += '<div class="pf-stat-mini"><span class="pf-sm-label">Опыт</span><span class="pf-sm-value">💎 ' + (currentProfile.experience || 0) + '</span></div>';
        html += '<div class="pf-stat-mini"><span class="pf-sm-label">Достижений</span><span class="pf-sm-value">🏆 ' + achievements.length + '</span></div>';
        if (streak > 0) html += '<div class="pf-stat-mini"><span class="pf-sm-label">Серия</span><span class="pf-sm-value">🔥 ' + streak + '</span></div>';
        html += '</div>';
        html += '<div class="pf-progress"><div class="pf-progress-bar" style="width:' + lvl.percent + '%;"></div></div>';
        html += '<div class="pf-progress-text">До уровня ' + (lvl.level + 1) + ': ' + xpLeft + ' XP</div>';
        html += '</div></div></div>';

        // QUICK
        html += '<div class="pf-quick-grid pf-fade" style="animation-delay:.05s;">';
        var quicks = [
            {href:'/achievements/',icon:'🏅',title:'Достижения',desc:'Все награды'},
            {href:'/bookmarks/',icon:'📚',title:'Закладки',desc:'Сохранённое'},
            {href:'/quests/',icon:'🗺️',title:'Квесты',desc:'Задания'},
            {href:'/interactive/',icon:'🎮',title:'Интерактив',desc:'Игры'},
            {href:'/names/',icon:'📛',title:'Имена',desc:'Марсианские имена'},
            {href:'/sky/',icon:'🌌',title:'Небо',desc:'Симулятор неба'},
            {href:'/museum/',icon:'🏛️',title:'Музей',desc:'Виртуальный музей'},
            {href:'/forum/',icon:'💬',title:'Форум',desc:'Общение'}
        ];
        quicks.forEach(function(q) {
            html += '<a href="' + q.href + '" class="pf-quick-card"><div class="pf-quick-icon">' + q.icon + '</div><div class="pf-quick-body"><div class="pf-quick-title">' + q.title + '</div><div class="pf-quick-desc">' + q.desc + '</div></div></a>';
        });
        html += '</div>';

        // TABS
        var tabs = [
            {id:'overview', icon:'👤', label:'Обзор'},
            {id:'achievements', icon:'🏅', label:'Достижения', count: achievements.length},
            {id:'notes', icon:'📝', label:'Заметки', count: notes.length},
            {id:'notifications', icon:'🔔', label:'Уведомления'},
            {id:'leaderboard', icon:'🏆', label:'Лидеры'},
            {id:'settings', icon:'⚙️', label:'Настройки'}
        ];

        html += '<div class="pf-tabs pf-fade" id="pf-tabs" style="animation-delay:.1s;">';
        tabs.forEach(function(t, i) {
            html += '<button class="pf-tab' + (i === 0 ? ' active' : '') + '" data-tab="' + t.id + '">' + t.icon + ' ' + t.label + (t.count ? ' <span class="pf-tab-count">' + t.count + '</span>' : '') + '</button>';
        });
        html += '</div>';

        // OVERVIEW
        html += '<div class="pf-tab-content active" data-content="overview">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">📝</span> О себе</h3>';
        html += '<p style="margin:0 0 12px 0;color:#555;font-size:.95rem;line-height:1.6;" id="pf-bio">' + escapeHtml(currentProfile.bio || '✍️ Ещё ничего не рассказал о себе.') + '</p>';
        html += '<button class="pf-btn pf-btn-outline" onclick="pfEditBio()">✏️ Редактировать</button></div>';

        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">⏱️</span> Активность</h3>';
        html += '<div class="pf-timer-grid">';
        html += '<div class="pf-timer-card"><div class="pf-timer-value" id="pf-timer-session">0с</div><div class="pf-timer-label">Сессия</div><div class="pf-timer-sub">Сейчас</div></div>';
        html += '<div class="pf-timer-card"><div class="pf-timer-value" id="pf-timer-total">' + formatDuration(totalTime) + '</div><div class="pf-timer-label">Всего</div><div class="pf-timer-sub">За всё время</div></div>';
        html += '<div class="pf-timer-card"><div class="pf-timer-value">' + streak + '</div><div class="pf-timer-label">Серия</div><div class="pf-timer-sub">Дней подряд</div></div>';
        html += '<div class="pf-timer-card"><div class="pf-timer-value">' + achievements.length + '</div><div class="pf-timer-label">Наград</div><div class="pf-timer-sub">Получено</div></div>';
        html += '</div></div>';

        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🗓️</span> Марсианский календарь</h3>';
        html += '<div class="pf-calendar"><div class="pf-cal-month">' + md.month + '</div><div class="pf-cal-day">' + md.day + '</div><div class="pf-cal-year">Год ' + md.year + ' Э.О.</div><div class="pf-cal-season">' + md.season + '</div></div></div>';
        html += '</div>';

        // ACHIEVEMENTS
        var ALL_ACH = [
            {id:1,n:'Первый шаг',i:'👣',d:'Зарегистрироваться'},
            {id:2,n:'Марсианин',i:'🔴',d:'Выбрать королевство'},
            {id:3,n:'Читатель',i:'📖',d:'Прочитать 5 статей'},
            {id:4,n:'Эрудит',i:'🎓',d:'Прочитать 50 статей'},
            {id:5,n:'Хранитель',i:'📚',d:'Прочитать 200 статей'},
            {id:6,n:'Комментатор',i:'💬',d:'Первый комментарий'},
            {id:7,n:'Оратор',i:'🗣️',d:'50 комментариев'},
            {id:8,n:'Ночной страж',i:'🌙',d:'7 ночей подряд'},
            {id:9,n:'Ранняя пташка',i:'🌅',d:'7 рассветов'},
            {id:10,n:'Неделя',i:'🔥',d:'7 дней подряд'},
            {id:11,n:'Месяц',i:'💪',d:'30 дней подряд'},
            {id:12,n:'Год',i:'🏆',d:'365 дней подряд'},
            {id:13,n:'Кузнец',i:'⚒️',d:'10 заметок'},
            {id:14,n:'Летописец',i:'📜',d:'100 заметок'},
            {id:15,n:'Художник',i:'🎨',d:'5 аватаров'},
            {id:16,n:'Странник',i:'🧭',d:'10 королевств'},
            {id:17,n:'Мореход',i:'⛵',d:'Все королевства'},
            {id:18,n:'Дуэлянт',i:'⚔️',d:'10 побед в дуэли'},
            {id:19,n:'Провидец',i:'🔮',d:'10 гороскопов'},
            {id:20,n:'Оракул',i:'🧿',d:'100 гороскопов'},
            {id:21,n:'Гурман',i:'🍽️',d:'5 рецептов'},
            {id:22,n:'Мастер',i:'🎯',d:'10 уровень'},
            {id:23,n:'Грандмастер',i:'👑',d:'50 уровень'},
            {id:24,n:'Легенда',i:'🌟',d:'100 уровень'}
        ];
        html += '<div class="pf-tab-content" data-content="achievements">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏅</span> Достижения (' + achievements.length + '/' + ALL_ACH.length + ')</h3>';
        html += '<div class="pf-ach-grid">';
        ALL_ACH.forEach(function(a) {
            var earned = achievements.find(function(x) { return x.achievement_id === a.id || x.name === a.n; });
            html += '<div class="pf-ach' + (earned ? '' : ' locked') + '"><div class="pf-ach-icon">' + (earned ? a.i : '🔒') + '</div><div><div class="pf-ach-name">' + escapeHtml(a.n) + '</div><div class="pf-ach-date">' + (earned ? (earned.earned_at ? new Date(earned.earned_at).toLocaleDateString('ru-RU') : 'Получено') : escapeHtml(a.d)) + '</div></div></div>';
        });
        html += '</div></div></div>';

        // NOTES
        html += '<div class="pf-tab-content" data-content="notes">';
        html += '<div class="pf-card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;"><h3 class="pf-card-title" style="margin:0;"><span class="pf-ct-icon">📝</span> Заметки (' + notes.length + ')</h3><button class="pf-btn" onclick="pfOpenNoteForm()">➕ Новая</button></div>';
        html += '<div class="pf-note-form" id="pf-note-form"><input type="text" class="pf-note-input title" id="pf-note-title" placeholder="Заголовок" maxlength="100"><textarea class="pf-note-input content" id="pf-note-content" placeholder="Текст..." maxlength="5000"></textarea><div style="font-size:.8rem;color:#888;margin-bottom:6px;">Цвет:</div><div class="pf-note-colors" id="pf-note-colors"></div><div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="pf-btn" onclick="pfSaveNote()">💾 Сохранить</button><button class="pf-btn pf-btn-outline" onclick="pfCloseNoteForm()">Отмена</button></div></div>';
        if (notes.length === 0) {
            html += '<p style="text-align:center;color:#888;padding:40px 20px;">Пока нет заметок.</p>';
        } else {
            html += '<div class="pf-notes-grid">';
            notes.forEach(function(n) {
                html += '<div class="pf-note' + (n.pinned ? ' pinned' : '') + '" style="--note-color:' + (n.color || '#6C63FF') + ';" onclick="pfEditNote(' + n.id + ')"><div class="pf-note-title">' + (n.pinned ? '📌 ' : '') + escapeHtml(n.title || 'Заметка') + '</div><div class="pf-note-content">' + escapeHtml(n.content) + '</div><div class="pf-note-date">' + new Date(n.updated_at || n.created_at).toLocaleString('ru-RU', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) + '</div><div class="pf-note-actions" onclick="event.stopPropagation();"><button class="pf-note-btn" onclick="pfPinNote(' + n.id + ')">' + (n.pinned ? '📍' : '📌') + '</button><button class="pf-note-btn" onclick="pfEditNote(' + n.id + ')">✏️</button><button class="pf-note-btn danger" onclick="pfDeleteNote(' + n.id + ')">🗑️</button></div></div>';
            });
            html += '</div>';
        }
        html += '</div></div>';

        // NOTIFS
        html += '<div class="pf-tab-content" data-content="notifications">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🔔</span> Уведомления</h3>';
        if (notifications.length === 0) {
            html += '<p style="text-align:center;color:#888;padding:40px 20px;">Уведомлений пока нет.</p>';
        } else {
            notifications.forEach(function(n) {
                html += '<div class="pf-notif"><div class="pf-notif-icon">📬</div><div><div class="pf-notif-text">' + escapeHtml(n.message || n.text || '') + '</div><div class="pf-notif-date">' + new Date(n.created_at).toLocaleDateString('ru-RU') + '</div></div></div>';
            });
        }
        html += '</div></div>';

        // LEADERBOARD
        html += '<div class="pf-tab-content" data-content="leaderboard">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏆</span> Топ-10</h3>';
        html += '<table class="pf-leaderboard"><thead><tr><th>#</th><th>Участник</th><th style="text-align:right;">Ур.</th><th style="text-align:right;">XP</th></tr></thead><tbody>';
        leaders.forEach(function(l, i) {
            var nm = l.display_name || l.username || 'Аноним';
            var medals = ['🥇','🥈','🥉'];
            var isMe = l.user_id === currentUser.id;
            html += '<tr style="' + (isMe ? 'background:' + kingdomColor + ';color:#fff;font-weight:700;' : '') + '"><td>' + (medals[i] || (i+1)) + '</td><td><img src="' + (l.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(nm) + '&background=6C63FF&color=fff&size=64') + '" class="pf-lb-avatar" loading="lazy">' + escapeHtml(nm) + (isMe ? ' (вы)' : '') + '</td><td style="text-align:right;">' + (l.level || getLevel(l.experience || 0).level) + '</td><td style="text-align:right;"><b>' + (l.experience || 0) + '</b></td></tr>';
        });
        html += '</tbody></table></div></div>';

        // SETTINGS
        html += '<div class="pf-tab-content" data-content="settings">';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">👤</span> Имя</h3>';
        html += '<p style="color:#555;margin:0 0 12px 0;">Текущее: <b id="pf-display-name">' + escapeHtml(displayName) + '</b></p>';
        html += '<button class="pf-btn pf-btn-outline" onclick="pfEditName()">✏️ Изменить</button></div>';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🖼️</span> Аватар</h3>';
        html += '<div class="pf-avatar-grid">';
        AVATARS.forEach(function(url) {
            html += '<img src="' + url + '" alt="" class="pf-avatar-option' + (avatar === url ? ' selected' : '') + '" onclick="pfSelectAvatar(\'' + url + '\')" loading="lazy">';
        });
        html += '</div></div>';
        html += '<div class="pf-card"><h3 class="pf-card-title"><span class="pf-ct-icon">🏰</span> Королевство</h3>';
        html += '<div class="pf-kingdom-grid">';
        Object.keys(KINGDOMS).forEach(function(name) {
            var sel = currentProfile.kingdom === name;
            var col = KINGDOMS[name];
            html += '<button class="pf-kingdom-btn' + (sel ? ' selected' : '') + '" style="' + (sel ? 'background:' + col + ';border-color:' + col + ';' : '') + '" onclick="pfSelectKingdom(\'' + name + '\')">' + name + '</button>';
        });
        html += '</div></div>';
        html += '<div class="pf-card" style="background:rgba(231,76,60,.05);border:2px solid rgba(231,76,60,.2);"><h3 class="pf-card-title" style="color:#c0392b;"><span class="pf-ct-icon">⚠️</span> Опасная зона</h3>';
        html += '<button class="pf-btn pf-btn-danger" onclick="pfDeleteAccount()">🗑️ Удалить аккаунт</button></div>';
        html += '<div class="pf-card"><button class="pf-btn pf-btn-outline" onclick="pfLogout()" style="width:100%;justify-content:center;">🚪 Выйти</button></div>';
        html += '</div>';

        container.innerHTML = html;
        renderNoteColors();

        // Навешиваем табы
        document.querySelectorAll('.pf-tab').forEach(function(tab) {
            tab.onclick = function() { pfSetTab(tab.dataset.tab); };
        });
    }

    function renderNoteColors() {
        var el = document.getElementById('pf-note-colors');
        if (!el) return;
        el.innerHTML = NOTE_COLORS.map(function(c) {
            return '<div class="pf-note-color' + (c === selectedNoteColor ? ' selected' : '') + '" style="background:' + c + ';" onclick="pfSelectNoteColor(\'' + c + '\')"></div>';
        }).join('');
    }

    // ============================================================
    // ACTION FUNCTIONS
    // ============================================================
    window.pfSetTab = function(tab) {
        document.querySelectorAll('.pf-tab').forEach(function(t) { t.classList.toggle('active', t.dataset.tab === tab); });
        document.querySelectorAll('.pf-tab-content').forEach(function(c) { c.classList.toggle('active', c.dataset.content === tab); });
    };

    window.pfLogout = function() {
        try { localStorage.removeItem(MY_KEY); } catch(e) {}
        try { localStorage.removeItem(SB_KEY); } catch(e) {}
        try { localStorage.removeItem(BACKUP_KEY); } catch(e) {}
        try { sessionStorage.removeItem(MY_KEY); } catch(e) {}
        try { sessionStorage.removeItem(SB_KEY); } catch(e) {}
        try { document.cookie = MY_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch(e) {}
        try { document.cookie = SB_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; } catch(e) {}
        window.location.href = '/';
    };

    window.pfEditBio = async function() {
        var el = document.getElementById('pf-bio');
        var cur = el ? el.innerText : '';
        var nb = prompt('Введите биографию:', cur);
        if (nb === null) return;
        try {
            await apiPatch('profiles?user_id=eq.' + currentUser.id, { bio: nb.trim() }, currentUser._token);
            if (el) el.innerText = nb.trim();
            showToast('✅ Обновлено!', 'success');
        } catch(e) { showToast('Ошибка: ' + e.message, 'error'); }
    };

    window.pfEditName = async function() {
        var el = document.getElementById('pf-display-name');
        var cur = el ? el.innerText : '';
        var nn = prompt('Новое имя:', cur);
        if (!nn || nn === cur) return;
        if (nn.length < 2 || nn.length > 20) { showToast('2–20 символов', 'error'); return; }
        try {
            await apiPatch('profiles?user_id=eq.' + currentUser.id, { display_name: nn.trim() }, currentUser._token);
            showToast('✅ Обновлено!', 'success');
            setTimeout(function() { location.reload(); }, 600);
        } catch(e) { showToast('Ошибка: ' + e.message, 'error'); }
    };

    window.pfSelectAvatar = async function(url) {
        try {
            await apiPatch('profiles?user_id=eq.' + currentUser.id, { avatar_url: url }, currentUser._token);
            showToast('✅ Обновлено!', 'success');
            setTimeout(function() { location.reload(); }, 500);
        } catch(e) { showToast('Ошибка: ' + e.message, 'error'); }
    };

    window.pfSelectKingdom = async function(name) {
        try {
            await apiPatch('profiles?user_id=eq.' + currentUser.id, { kingdom: name }, currentUser._token);
            showToast('✅ ' + name, 'success');
            setTimeout(function() { location.reload(); }, 500);
        } catch(e) { showToast('Ошибка: ' + e.message, 'error'); }
    };

    window.pfDeleteAccount = async function() {
        if (!confirm('Удалить аккаунт? Необратимо!')) return;
        var email = prompt('Введите email для подтверждения:');
        if (!email || email !== currentUser.email) { showToast('Email не совпадает', 'error'); return; }
        try {
            var res = await fetchRetry(SUPABASE_URL + '/functions/v1/delete-user', {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + currentUser._token }
            }, 1);
            var json = await res.json();
            if (json.error) throw new Error(json.error);
            window.pfLogout();
        } catch(e) { showToast('Ошибка: ' + e.message, 'error'); }
    };

    window.pfOpenNoteForm = function(id) {
        editingNoteId = id || null;
        var form = document.getElementById('pf-note-form');
        if (!form) return;
        form.classList.add('open');
        if (id) {
            var n = notes.find(function(x) { return x.id === id; });
            if (n) {
                document.getElementById('pf-note-title').value = n.title || '';
                document.getElementById('pf-note-content').value = n.content || '';
                selectedNoteColor = n.color || '#6C63FF';
            }
        } else {
            document.getElementById('pf-note-title').value = '';
            document.getElementById('pf-note-content').value = '';
            selectedNoteColor = '#6C63FF';
        }
        renderNoteColors();
    };

    window.pfCloseNoteForm = function() {
        var f = document.getElementById('pf-note-form');
        if (f) f.classList.remove('open');
        editingNoteId = null;
    };

    window.pfSelectNoteColor = function(c) { selectedNoteColor = c; renderNoteColors(); };

    window.pfSaveNote = async function() {
        var title = document.getElementById('pf-note-title').value.trim();
        var content = document.getElementById('pf-note-content').value.trim();
        if (!content) { showToast('Введите текст', 'error'); return; }
        try {
            if (editingNoteId) {
                await apiPatch('user_notes?id=eq.' + editingNoteId, {
                    title: title, content: content, color: selectedNoteColor, updated_at: new Date().toISOString()
                }, currentUser._token);
            } else {
                await apiPost('user_notes', {
                    user_id: currentUser.id, title: title, content: content, color: selectedNoteColor
                }, currentUser._token);
            }
            showToast('✅ Сохранено!', 'success');
            setTimeout(function() { location.reload(); }, 500);
        } catch(e) { showToast('Ошибка: ' + e.message, 'error'); }
    };

    window.pfEditNote = function(id) { pfOpenNoteForm(id); };

    window.pfPinNote = async function(id) {
        var n = notes.find(function(x) { return x.id === id; });
        if (!n) return;
        try {
            await apiPatch('user_notes?id=eq.' + id, { pinned: !n.pinned }, currentUser._token);
            setTimeout(function() { location.reload(); }, 400);
        } catch(e) { showToast('Ошибка', 'error'); }
    };

    window.pfDeleteNote = async function(id) {
        if (!confirm('Удалить заметку?')) return;
        try {
            await apiDelete('user_notes?id=eq.' + id, currentUser._token);
            setTimeout(function() { location.reload(); }, 400);
        } catch(e) { showToast('Ошибка', 'error'); }
    };

    // ============================================================
    // LOAD
    // ============================================================
    async function loadProfile(session) {
        currentUser = session.user;
        currentUser._token = session.access_token;

        // 1️⃣ Профиль (критичный)
        var profiles;
        try {
            profiles = await apiGet('profiles?user_id=eq.' + encodeURIComponent(session.user.id) + '&select=*', session.access_token);
        } catch(e) {
            throw new Error('Не удалось загрузить профиль: ' + e.message);
        }

        currentProfile = Array.isArray(profiles) && profiles.length ? profiles[0] : null;

        if (!currentProfile) {
            try {
                var created = await apiPost('profiles', {
                    user_id: session.user.id,
                    username: (session.user.email || '').split('@')[0],
                    display_name: (session.user.email || '').split('@')[0]
                }, session.access_token, 'return=representation');
                currentProfile = Array.isArray(created) && created.length ? created[0] : null;
            } catch(e) {
                throw new Error('Профиль не создан: ' + e.message);
            }
        }

        // 2️⃣ Первый рендер (быстрый)
        render();

        // 3️⃣ Фоновые запросы параллельно
        try {
            var results = await Promise.all([
                apiGet('user_achievements?user_id=eq.' + session.user.id + '&select=achievement_id,earned_at', session.access_token).catch(function() { return []; }),
                apiGet('user_notes?user_id=eq.' + session.user.id + '&select=*&order=pinned.desc,updated_at.desc', session.access_token).catch(function() { return []; }),
                apiGet('notifications?user_id=eq.' + session.user.id + '&select=*&order=created_at.desc&limit=10', session.access_token).catch(function() { return []; }),
                apiGet('profiles?select=user_id,username,display_name,experience,avatar_url&order=experience.desc&limit=10', session.access_token).catch(function() { return []; }),
                apiGet('daily_logins?user_id=eq.' + session.user.id + '&select=streak&order=login_date.desc&limit=1', session.access_token).catch(function() { return []; })
            ]);

            var uaRes = results[0] || [];
            notes = results[1] || [];
            notifications = results[2] || [];
            leaders = results[3] || [];
            streak = (results[4] && results[4][0] && results[4][0].streak) || 0;

            // Мета достижений
            if (uaRes.length) {
                try {
                    var ids = uaRes.map(function(x) { return x.achievement_id; }).filter(Boolean);
                    if (ids.length) {
                        var metaRes = await apiGet('achievements?id=in.(' + ids.join(',') + ')&select=*', session.access_token);
                        var map = {};
                        (metaRes || []).forEach(function(m) { map[m.id] = m; });
                        achievements = uaRes.map(function(x) {
                            return Object.assign({}, map[x.achievement_id] || {}, { achievement_id: x.achievement_id, earned_at: x.earned_at });
                        });
                    }
                } catch(e) {}
            }

            // Перерисовка
            render();
        } catch(e) {
            console.warn('[profile] background load error:', e.message);
        }
    }

    function showLogin(container) {
        container.innerHTML = '<div style="max-width:400px;margin:60px auto;padding:40px 28px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);">'
            + '<div style="font-size:4rem;margin-bottom:12px;">🔒</div>'
            + '<h2 style="margin:0 0 8px 0;color:#2c3e50;">Вы не вошли</h2>'
            + '<p style="color:#888;margin:0 0 20px 0;">Войдите, чтобы просмотреть профиль</p>'
            + '<a href="/login/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">🔐 Войти</a>'
            + '</div>';
    }

    function showError(container, msg) {
        container.innerHTML = '<div style="max-width:400px;margin:60px auto;padding:40px 28px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.1);">'
            + '<div style="font-size:4rem;margin-bottom:12px;">⚠️</div>'
            + '<h2 style="margin:0 0 8px 0;color:#2c3e50;">Не удалось загрузить</h2>'
            + '<p style="color:#888;margin:0 0 20px 0;word-break:break-word;">' + escapeHtml(msg) + '</p>'
            + '<button onclick="location.reload()" style="padding:13px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:12px;font-weight:700;font-size:.95rem;font-family:inherit;cursor:pointer;">🔄 Обновить</button>'
            + '</div>';
    }

    async function waitSession(maxMs) {
        var s = readSession();
        if (s) return s;
        var start = Date.now();
        while (Date.now() - start < maxMs) {
            await new Promise(function(r) { setTimeout(r, 250); });
            s = readSession();
            if (s) return s;
        }
        return null;
    }

    async function init() {
        var session = await waitSession(4000);
        if (!session) { showLogin(container); return; }
        try {
            await loadProfile(session);
        } catch(e) {
            showError(container, e.message);
        }
    }

    // ============================================================
    // START
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
