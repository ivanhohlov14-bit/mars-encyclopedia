---
title: Вход
comments: false
---

<div id="login-app" style="max-width:100%;margin:0 auto;font-family:'Segoe UI',-apple-system,sans-serif;padding:0 8px;">
    <div style="text-align:center;padding:60px 20px;">
        <div style="display:inline-block;width:48px;height:48px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:lgSpin 0.8s linear infinite;"></div>
        <p style="color:#999;margin-top:16px;font-size:0.9rem;">Загрузка формы...</p>
    </div>
</div>

<style>
/* ============================================================
   VIP LOGIN STYLES
   ============================================================ */
@keyframes lgSpin { to { transform: rotate(360deg); } }
@keyframes lgFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lgFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
@keyframes lgPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
@keyframes lgShine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
@keyframes lgStar { 0% { opacity: 0; transform: translateY(0) scale(0.6); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(-120px) scale(1.2); } }
@keyframes lgGlow { 0%, 100% { box-shadow: 0 8px 20px -4px rgba(108,99,255,0.4); } 50% { box-shadow: 0 8px 32px -2px rgba(108,99,255,0.7); } }
@keyframes lgOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes lgRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lgShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }

.lg-container { max-width: 460px; margin: 0 auto; position: relative; }

/* --- HERO --- */
.lg-hero {
    position: relative;
    background:
        radial-gradient(circle at 20% 20%, rgba(162,155,254,.35), transparent 55%),
        radial-gradient(circle at 85% 80%, rgba(231,76,60,.25), transparent 55%),
        linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 40%, #2d1b3d 70%, #0f3460 100%);
    border-radius: 26px 26px 0 0;
    padding: 44px 32px 36px 32px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    border: 1px solid rgba(162,155,254,.15);
    border-bottom: none;
}
.lg-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(2px 2px at 12% 25%, #fff, transparent),
        radial-gradient(1px 1px at 38% 65%, #fff, transparent),
        radial-gradient(1.5px 1.5px at 62% 15%, #fff, transparent),
        radial-gradient(1px 1px at 78% 55%, #fff, transparent),
        radial-gradient(2px 2px at 90% 35%, #fff, transparent),
        radial-gradient(1px 1px at 8% 82%, #fff, transparent),
        radial-gradient(1.5px 1.5px at 55% 88%, #fff, transparent);
    opacity: 0.55;
    animation: lgFloat 9s ease-in-out infinite;
    pointer-events: none;
}
.lg-hero::after {
    content: '';
    position: absolute;
    top: -40%;
    right: -30%;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(108,99,255,.35), transparent 70%);
    border-radius: 50%;
    animation: lgFloat 12s ease-in-out infinite reverse;
    pointer-events: none;
}
.lg-hero-content { position: relative; z-index: 3; }

/* --- LOGO --- */
.lg-logo-wrap { position: relative; width: 96px; height: 96px; margin: 0 auto 18px auto; }
.lg-logo {
    width: 96px; height: 96px; border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #e74c3c 0%, #c0392b 40%, #7f1d1d 80%, #4a1010 100%);
    box-shadow:
        inset -8px -8px 24px rgba(0,0,0,0.6),
        0 0 40px 6px rgba(231,76,60,0.45),
        0 0 80px 12px rgba(231,76,60,0.15);
    animation: lgPulse 3.2s ease-in-out infinite;
    position: relative;
    z-index: 2;
}
.lg-logo::before {
    content: '';
    position: absolute;
    top: 18%; left: 22%;
    width: 26%; height: 26%;
    background: radial-gradient(circle, rgba(255,255,255,.6), transparent 70%);
    border-radius: 50%;
    filter: blur(3px);
}
.lg-logo-orbit {
    position: absolute; inset: -6px;
    border: 1.5px dashed rgba(162,155,254,.5);
    border-radius: 50%;
    animation: lgOrbit 22s linear infinite;
}
.lg-logo-orbit::before {
    content: '';
    position: absolute; top: -3px; left: 50%;
    width: 6px; height: 6px;
    background: #A29BFE;
    border-radius: 50%;
    box-shadow: 0 0 10px #A29BFE;
    transform: translateX(-50%);
}

/* --- TITLE --- */
.lg-hero-title {
    font-size: 1.65rem; font-weight: 800; margin: 0 0 8px 0;
    letter-spacing: -.4px;
    background: linear-gradient(90deg, #fff 0%, #A29BFE 25%, #fff 50%, #A29BFE 75%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: lgShine 6s linear infinite;
}
.lg-hero-sub { font-size: 0.88rem; opacity: 0.7; margin: 0; letter-spacing: 1px; }

/* --- TABS --- */
.lg-tabs {
    display: flex;
    background: rgba(255,255,255,.98);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0,0,0,.06);
    position: relative;
}
.lg-tab {
    flex: 1; padding: 18px 12px;
    background: none; border: none;
    color: #999; font-size: 0.92rem; font-weight: 700;
    cursor: pointer; font-family: inherit;
    position: relative;
    transition: color .25s;
    -webkit-tap-highlight-color: transparent;
}
.lg-tab:hover { color: #666; }
.lg-tab.active { color: #6C63FF; }
.lg-tab.active::after {
    content: '';
    position: absolute; bottom: 0; left: 18%; right: 18%; height: 3px;
    background: linear-gradient(90deg, #6C63FF, #A29BFE, #6C63FF);
    background-size: 200% auto;
    animation: lgShine 3s linear infinite;
    border-radius: 3px 3px 0 0;
    box-shadow: 0 0 12px rgba(108,99,255,.6);
}

/* --- CARD --- */
.lg-card {
    background: #fff;
    padding: 34px 32px 26px 32px;
    border-radius: 0 0 26px 26px;
    box-shadow: 0 24px 70px -12px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,.02);
    position: relative;
    overflow: hidden;
}
.lg-card::before {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, transparent, #6C63FF, #A29BFE, transparent);
    animation: lgShine 4s ease-in-out infinite;
}

/* --- FORM --- */
.lg-form { animation: lgFade 0.4s cubic-bezier(.16,1,.3,1); }
.lg-form.hidden { display: none; }

.lg-field { margin-bottom: 20px; animation: lgRise .35s ease both; }
.lg-field:nth-child(1) { animation-delay: .05s; }
.lg-field:nth-child(2) { animation-delay: .1s; }
.lg-field:nth-child(3) { animation-delay: .15s; }
.lg-field label {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 0.82rem; font-weight: 700; color: #1a1a2e; margin-bottom: 8px;
}
.lg-label-hint { font-size: .7rem; color: #a0a0a0; font-weight: 600; }
.lg-input-wrap { position: relative; }

.lg-input {
    width: 100%;
    padding: 15px 46px 15px 16px;
    border-radius: 13px;
    border: 2px solid #e8eaf0;
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    background: #f8f9fb;
    color: #1a1a2e;
    box-sizing: border-box;
    transition: all 0.28s cubic-bezier(.16,1,.3,1);
}
.lg-input:hover { border-color: #d0d4e0; }
.lg-input:focus {
    border-color: #6C63FF;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(108,99,255,0.12), 0 4px 16px -4px rgba(108,99,255,.15);
    transform: translateY(-1px);
}
.lg-input.error {
    border-color: #e74c3c;
    background: #fff5f5;
    animation: lgShake .35s ease;
}
.lg-input.valid { border-color: #27ae60; background: #f5fff8; }

.lg-eye-btn {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    cursor: pointer; font-size: 1.05rem;
    padding: 6px; opacity: 0.55; color: #1a1a2e;
    transition: opacity .2s, transform .2s;
    -webkit-tap-highlight-color: transparent;
}
.lg-eye-btn:hover { opacity: 1; transform: translateY(-50%) scale(1.1); }

.lg-error-text {
    font-size: 0.78rem; color: #e74c3c;
    margin-top: 6px; padding-left: 4px;
    display: none;
    animation: lgRise .25s ease;
}
.lg-error-text.show { display: block; }

/* --- PASSWORD STRENGTH --- */
.lg-pw-strength {
    display: flex; gap: 4px; margin-top: 8px;
    padding-left: 4px;
    height: 4px;
}
.lg-pw-seg {
    flex: 1; height: 4px;
    background: #e8eaf0;
    border-radius: 2px;
    transition: background .3s;
}
.lg-pw-seg.on-weak { background: #e74c3c; }
.lg-pw-seg.on-mid { background: #f39c12; }
.lg-pw-seg.on-strong { background: #27ae60; }
.lg-pw-label {
    font-size: .72rem; margin-top: 5px; padding-left: 4px;
    color: #999; font-weight: 600;
}
.lg-pw-label.weak { color: #e74c3c; }
.lg-pw-label.mid { color: #f39c12; }
.lg-pw-label.strong { color: #27ae60; }

/* --- CAPS WARNING --- */
.lg-caps-warn {
    display: none;
    font-size: .75rem;
    color: #f39c12;
    margin-top: 6px;
    padding-left: 4px;
    font-weight: 600;
    animation: lgRise .2s ease;
}
.lg-caps-warn.show { display: block; }

/* --- BUTTON --- */
.lg-btn {
    width: 100%;
    padding: 16px 20px;
    border-radius: 13px;
    border: none;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: linear-gradient(135deg, #6C63FF 0%, #A29BFE 50%, #6C63FF 100%);
    background-size: 200% auto;
    color: #fff;
    box-shadow: 0 8px 24px -4px rgba(108,99,255,0.45);
    transition: all 0.28s cubic-bezier(.16,1,.3,1);
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    animation: lgGlow 3s ease-in-out infinite;
}
.lg-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
    transform: translateX(-100%);
    transition: transform .6s;
}
.lg-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    background-position: 100% center;
    box-shadow: 0 14px 32px -4px rgba(108,99,255,0.55);
}
.lg-btn:hover:not(:disabled)::before { transform: translateX(100%); }
.lg-btn:active:not(:disabled) { transform: translateY(0) scale(.98); }
.lg-btn:disabled { opacity: 0.65; cursor: not-allowed; animation: none; }

.lg-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: lgSpin 0.6s linear infinite;
    display: none;
}
.lg-btn.loading .lg-spinner { display: inline-block; }
.lg-btn.loading span:last-child { opacity: .85; }

/* --- EXTRA LINKS --- */
.lg-extra {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 18px; font-size: 0.82rem;
    flex-wrap: wrap; gap: 8px;
}
.lg-link {
    color: #6C63FF; font-weight: 700;
    cursor: pointer; background: none; border: none;
    font-family: inherit; font-size: 0.82rem;
    padding: 4px 0;
    transition: opacity .2s;
    -webkit-tap-highlight-color: transparent;
    position: relative;
}
.lg-link::after {
    content: '';
    position: absolute; left: 0; right: 0; bottom: 2px;
    height: 1.5px;
    background: #6C63FF;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform .3s cubic-bezier(.16,1,.3,1);
}
.lg-link:hover::after { transform: scaleX(1); transform-origin: left; }
.lg-link:hover { opacity: .85; }

/* --- TOAST --- */
.lg-toast {
    position: fixed; bottom: 30px; left: 50%;
    transform: translateX(-50%) translateY(120px);
    padding: 14px 28px;
    border-radius: 32px;
    font-weight: 700; font-size: 0.9rem;
    box-shadow: 0 16px 40px rgba(0,0,0,0.3);
    z-index: 999999;
    transition: transform .45s cubic-bezier(.16,1,.3,1);
    display: flex; align-items: center; gap: 10px;
    max-width: 90vw;
    color: #fff;
    backdrop-filter: blur(10px);
}
.lg-toast.show { transform: translateX(-50%) translateY(0); }
.lg-toast.success { background: linear-gradient(135deg, #27ae60, #16a085); }
.lg-toast.error { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.lg-toast.info { background: linear-gradient(135deg, #3498db, #2980b9); }

/* --- STARS BACKGROUND (fixed behind card) --- */
.lg-stars {
    position: fixed; inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}
.lg-star {
    position: absolute;
    width: 2px; height: 2px;
    background: #A29BFE;
    border-radius: 50%;
    box-shadow: 0 0 6px #A29BFE;
    animation: lgStar 8s linear infinite;
}

/* --- MOBILE --- */
@media (max-width: 500px) {
    .lg-hero { padding: 34px 24px 26px 24px; border-radius: 22px 22px 0 0; }
    .lg-card { padding: 26px 22px 22px 22px; border-radius: 0 0 22px 22px; }
    .lg-hero-title { font-size: 1.4rem; }
    .lg-logo-wrap, .lg-logo { width: 78px; height: 78px; }
    .lg-input { padding: 14px 42px 14px 14px; font-size: .92rem; }
}
</style>

<script>
(function() {
    'use strict';

    // ============================================================
    // CONFIG
    // ============================================================
    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';

    var container = document.getElementById('login-app');
    if (!container) { return; }

    // ============================================================
    // 🛡️ AUTO-REDIRECT если уже залогинен
    // ============================================================
    function tryReadSession() {
        var keys = [MY_KEY, SB_KEY];
        for (var i = 0; i < keys.length; i++) {
            try {
                var raw = localStorage.getItem(keys[i]) || sessionStorage.getItem(keys[i]);
                if (!raw) continue;
                var p = JSON.parse(raw);
                if (Array.isArray(p)) p = p[p.length - 1];
                if (!p || !p.access_token || !p.user) continue;
                if (p.expires_at && p.expires_at * 1000 < Date.now()) continue;
                return p;
            } catch (e) {}
        }
        return null;
    }

    if (tryReadSession()) {
        container.innerHTML = '<div style="text-align:center;padding:60px 20px;">'
            + '<div style="display:inline-block;width:44px;height:44px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:lgSpin .8s linear infinite;"></div>'
            + '<p style="color:#6C63FF;margin-top:16px;font-weight:700;">Вы уже вошли. Перенаправление...</p>'
            + '</div>';
        setTimeout(function () { window.location.href = '/profile/'; }, 700);
        return;
    }

    // ============================================================
    // HELPERS
    // ============================================================
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function showToast(msg, type) {
        type = type || 'info';
        var icons = { success: '✅', error: '⚠️', info: 'ℹ️' };
        var toast = document.createElement('div');
        toast.className = 'lg-toast ' + type;
        toast.innerHTML = '<span>' + (icons[type] || '') + '</span><span>' + escapeHtml(msg) + '</span>';
        document.body.appendChild(toast);
        requestAnimationFrame(function() { toast.classList.add('show'); });
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() { toast.remove(); }, 500);
        }, 3200);
    }

    function createStars() {
        var wrap = document.createElement('div');
        wrap.className = 'lg-stars';
        for (var i = 0; i < 20; i++) {
            var s = document.createElement('div');
            s.className = 'lg-star';
            s.style.left = Math.random() * 100 + '%';
            s.style.top = (60 + Math.random() * 40) + '%';
            s.style.animationDelay = (Math.random() * 8) + 's';
            s.style.animationDuration = (6 + Math.random() * 6) + 's';
            wrap.appendChild(s);
        }
        document.body.appendChild(wrap);
    }

    function measurePasswordStrength(pw) {
        var score = 0;
        if (pw.length >= 6) score++;
        if (pw.length >= 10) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return Math.min(score, 5);
    }

    // ============================================================
    // 💾 СОХРАНЕНИЕ — пишем ВО ВСЁ
    // ============================================================
    function saveSession(data) {
        var session = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in || 3600,
            expires_at: Math.floor(Date.now() / 1000) + (data.expires_in || 3600),
            token_type: data.token_type || 'bearer',
            user: data.user
        };
        var json = JSON.stringify([session]);

        // localStorage + sessionStorage — в оба ключа
        try { localStorage.setItem(SB_KEY, json); } catch(e) {}
        try { localStorage.setItem(MY_KEY, json); } catch(e) {}
        try { sessionStorage.setItem(SB_KEY, json); } catch(e) {}
        try { sessionStorage.setItem(MY_KEY, json); } catch(e) {}

        // Cookie — в оба имени, на год
        try {
            var compact = JSON.stringify([{
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                expires_at: session.expires_at,
                token_type: 'bearer',
                user: { id: data.user.id, email: data.user.email }
            }]);
            var expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = SB_KEY + '=' + encodeURIComponent(compact) + '; expires=' + expires + '; path=/; SameSite=Lax';
            document.cookie = MY_KEY + '=' + encodeURIComponent(compact) + '; expires=' + expires + '; path=/; SameSite=Lax';
        } catch(e) {}

        // Проверяем, что записалось
        try {
            var check = localStorage.getItem(MY_KEY);
            if (!check) console.warn('[login] localStorage запись не удалась');
        } catch(e) {}
    }

    // ============================================================
    // 🌐 FETCH с ретраями
    // ============================================================
    async function fetchWithRetry(url, options, retries) {
        retries = retries == null ? 2 : retries;
        var lastErr = null;
        for (var i = 0; i <= retries; i++) {
            try {
                var controller = new AbortController();
                var timeoutId = setTimeout(function() { controller.abort(); }, 20000);
                var opts = Object.assign({}, options, { signal: controller.signal });
                var res = await fetch(url, opts);
                clearTimeout(timeoutId);
                return res;
            } catch (e) {
                lastErr = e;
                if (i < retries) {
                    await new Promise(function(r) { setTimeout(r, 800 * (i + 1)); });
                }
            }
        }
        throw lastErr || new Error('Network error');
    }

    // ============================================================
    // 🎨 RENDER
    // ============================================================
    function render() {
        var params = new URLSearchParams(window.location.search);
        var emailFromUrl = params.get('email') || '';

        container.innerHTML = [
            '<div class="lg-container">',
            '  <div class="lg-hero"><div class="lg-hero-content">',
            '    <div class="lg-logo-wrap">',
            '      <div class="lg-logo-orbit"></div>',
            '      <div class="lg-logo"></div>',
            '    </div>',
            '    <h1 class="lg-hero-title">Марсианская энциклопедия</h1>',
            '    <p class="lg-hero-sub">Lān sur · Глина помнит</p>',
            '  </div></div>',
            '  <div class="lg-tabs">',
            '    <button type="button" class="lg-tab active" data-tab="login">🔐 Вход</button>',
            '    <button type="button" class="lg-tab" data-tab="register">✨ Регистрация</button>',
            '  </div>',
            '  <div class="lg-card">',
            '    <form class="lg-form" id="form-login" autocomplete="on">',
            '      <div class="lg-field">',
            '        <label for="login-email">Email</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="email" id="login-email" class="lg-input" placeholder="ivan@example.com" value="' + escapeHtml(emailFromUrl) + '" autocomplete="email" inputmode="email" required>',
            '        </div>',
            '        <div class="lg-error-text" id="login-email-error"></div>',
            '      </div>',
            '      <div class="lg-field">',
            '        <label for="login-password">Пароль</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="password" id="login-password" class="lg-input" placeholder="Введите пароль" autocomplete="current-password" required>',
            '          <button type="button" class="lg-eye-btn" data-target="login-password" aria-label="Показать пароль">👁️</button>',
            '        </div>',
            '        <div class="lg-error-text" id="login-password-error"></div>',
            '        <div class="lg-caps-warn" id="login-caps-warn">⚠️ Caps Lock включён</div>',
            '      </div>',
            '      <button type="submit" class="lg-btn" id="btn-login">',
            '        <span class="lg-spinner"></span>',
            '        <span>Войти</span>',
            '      </button>',
            '      <div class="lg-extra">',
            '        <button type="button" class="lg-link" id="forgot-password">Забыли пароль?</button>',
            '      </div>',
            '    </form>',
            '    <form class="lg-form hidden" id="form-register" autocomplete="on">',
            '      <div class="lg-field">',
            '        <label for="reg-email">Email</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="email" id="reg-email" class="lg-input" placeholder="ivan@example.com" autocomplete="email" inputmode="email" required>',
            '        </div>',
            '        <div class="lg-error-text" id="reg-email-error"></div>',
            '      </div>',
            '      <div class="lg-field">',
            '        <label for="reg-password">Пароль <span class="lg-label-hint">мин. 6</span></label>',
            '        <div class="lg-input-wrap">',
            '          <input type="password" id="reg-password" class="lg-input" placeholder="Придумайте пароль" autocomplete="new-password" required>',
            '          <button type="button" class="lg-eye-btn" data-target="reg-password" aria-label="Показать пароль">👁️</button>',
            '        </div>',
            '        <div class="lg-pw-strength" id="reg-pw-strength">',
            '          <div class="lg-pw-seg"></div><div class="lg-pw-seg"></div><div class="lg-pw-seg"></div><div class="lg-pw-seg"></div><div class="lg-pw-seg"></div>',
            '        </div>',
            '        <div class="lg-pw-label" id="reg-pw-label"></div>',
            '        <div class="lg-error-text" id="reg-password-error"></div>',
            '      </div>',
            '      <div class="lg-field">',
            '        <label for="reg-password2">Подтвердите пароль</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="password" id="reg-password2" class="lg-input" placeholder="Повторите пароль" autocomplete="new-password" required>',
            '          <button type="button" class="lg-eye-btn" data-target="reg-password2" aria-label="Показать пароль">👁️</button>',
            '        </div>',
            '        <div class="lg-error-text" id="reg-password2-error"></div>',
            '      </div>',
            '      <button type="submit" class="lg-btn" id="btn-register">',
            '        <span class="lg-spinner"></span>',
            '        <span>Создать аккаунт</span>',
            '      </button>',
            '      <div class="lg-extra" style="justify-content:center;">',
            '        <span style="color:#888;">Уже есть аккаунт?</span>',
            '        <button type="button" class="lg-link" id="switch-to-login">Войти</button>',
            '      </div>',
            '    </form>',
            '  </div>',
            '</div>'
        ].join('');

        // Tabs
        document.querySelectorAll('.lg-tab').forEach(function(tab) {
            tab.onclick = function() {
                document.querySelectorAll('.lg-tab').forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                var isLogin = tab.dataset.tab === 'login';
                document.getElementById('form-login').classList.toggle('hidden', !isLogin);
                document.getElementById('form-register').classList.toggle('hidden', isLogin);
                var firstInput = document.querySelector(isLogin ? '#login-email' : '#reg-email');
                if (firstInput) setTimeout(function() { firstInput.focus(); }, 100);
            };
        });

        document.getElementById('switch-to-login').onclick = function() {
            document.querySelector('.lg-tab[data-tab="login"]').click();
        };

        // Eye
        document.querySelectorAll('.lg-eye-btn').forEach(function(btn) {
            btn.onclick = function() {
                var t = document.getElementById(btn.dataset.target);
                if (!t) return;
                if (t.type === 'password') { t.type = 'text'; btn.textContent = '🙈'; }
                else { t.type = 'password'; btn.textContent = '👁️'; }
            };
        });

        // Password strength
        var regPw = document.getElementById('reg-password');
        if (regPw) {
            regPw.addEventListener('input', function() {
                var score = measurePasswordStrength(regPw.value);
                var segs = document.querySelectorAll('#reg-pw-strength .lg-pw-seg');
                var label = document.getElementById('reg-pw-label');
                segs.forEach(function(seg, i) {
                    seg.className = 'lg-pw-seg';
                    if (i < score) {
                        seg.classList.add(score <= 2 ? 'on-weak' : score <= 3 ? 'on-mid' : 'on-strong');
                    }
                });
                if (!regPw.value) { label.textContent = ''; label.className = 'lg-pw-label'; return; }
                if (score <= 2) { label.textContent = 'Слабый пароль'; label.className = 'lg-pw-label weak'; }
                else if (score <= 3) { label.textContent = 'Средний пароль'; label.className = 'lg-pw-label mid'; }
                else { label.textContent = 'Отличный пароль'; label.className = 'lg-pw-label strong'; }
            });
        }

        // Caps Lock warning
        var loginPw = document.getElementById('login-password');
        if (loginPw) {
            loginPw.addEventListener('keyup', function(e) {
                var warn = document.getElementById('login-caps-warn');
                if (!warn) return;
                try {
                    if (e.getModifierState && e.getModifierState('CapsLock')) warn.classList.add('show');
                    else warn.classList.remove('show');
                } catch (err) {}
            });
            loginPw.addEventListener('blur', function() {
                var warn = document.getElementById('login-caps-warn');
                if (warn) warn.classList.remove('show');
            });
        }

        // Forgot password
        document.getElementById('forgot-password').onclick = async function() {
            var email = document.getElementById('login-email').value.trim();
            if (!email) { showToast('Введите email', 'error'); return; }
            showToast('Отправка...', 'info');
            try {
                var res = await fetchWithRetry(SUPABASE_URL + '/auth/v1/recover', {
                    method: 'POST',
                    headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                }, 1);
                if (res.ok) showToast('📧 Проверьте почту!', 'success');
                else showToast('Не удалось отправить', 'error');
            } catch(e) {
                showToast('Ошибка сети. Попробуйте ещё раз', 'error');
            }
        };

        document.getElementById('form-login').onsubmit = handleLogin;
        document.getElementById('form-register').onsubmit = handleRegister;
    }

    // ============================================================
    // LOGIN
    // ============================================================
    async function handleLogin(e) {
        e.preventDefault();

        var email = document.getElementById('login-email').value.trim();
        var password = document.getElementById('login-password').value;
        var btn = document.getElementById('btn-login');

        document.querySelectorAll('.lg-error-text').forEach(function(el) { el.classList.remove('show'); });
        document.querySelectorAll('.lg-input').forEach(function(el) { el.classList.remove('error'); });

        if (!email) {
            document.getElementById('login-email').classList.add('error');
            document.getElementById('login-email-error').textContent = 'Введите email';
            document.getElementById('login-email-error').classList.add('show');
            return;
        }
        if (!password) {
            document.getElementById('login-password').classList.add('error');
            document.getElementById('login-password-error').textContent = 'Введите пароль';
            document.getElementById('login-password-error').classList.add('show');
            return;
        }

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            var res = await fetchWithRetry(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
                method: 'POST',
                headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            }, 2);

            var data;
            try { data = await res.json(); }
            catch (je) { throw new Error('Сервер вернул некорректный ответ'); }

            if (!res.ok) {
                var errMsg = data.error_description || data.error || data.msg || data.message || ('HTTP ' + res.status);
                var lower = String(errMsg).toLowerCase();
                if (lower.indexOf('invalid') !== -1 || lower.indexOf('credentials') !== -1) {
                    showToast('Неверный email или пароль', 'error');
                } else if (lower.indexOf('confirm') !== -1) {
                    showToast('Email не подтверждён. Проверьте почту', 'error');
                } else if (lower.indexOf('too many') !== -1) {
                    showToast('Слишком много попыток. Подождите', 'error');
                } else {
                    showToast(errMsg, 'error');
                }
                btn.classList.remove('loading');
                btn.disabled = false;
                return;
            }

            saveSession(data);
            showToast('Добро пожаловать!', 'success');
            setTimeout(function() { window.location.href = '/profile/'; }, 700);

        } catch (err) {
            var msg = err.message;
            if (err.name === 'AbortError') msg = 'Превышено время ожидания';
            else if (msg.indexOf('Failed to fetch') !== -1 || msg.indexOf('Network') !== -1) msg = 'Нет связи с сервером';
            showToast(msg, 'error');
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // ============================================================
    // REGISTER
    // ============================================================
    async function handleRegister(e) {
        e.preventDefault();

        var email = document.getElementById('reg-email').value.trim();
        var password = document.getElementById('reg-password').value;
        var password2 = document.getElementById('reg-password2').value;
        var btn = document.getElementById('btn-register');

        document.querySelectorAll('.lg-error-text').forEach(function(el) { el.classList.remove('show'); });
        document.querySelectorAll('.lg-input').forEach(function(el) { el.classList.remove('error'); });

        if (!email) {
            document.getElementById('reg-email').classList.add('error');
            document.getElementById('reg-email-error').textContent = 'Введите email';
            document.getElementById('reg-email-error').classList.add('show');
            return;
        }
        if (password.length < 6) {
            document.getElementById('reg-password').classList.add('error');
            document.getElementById('reg-password-error').textContent = 'Минимум 6 символов';
            document.getElementById('reg-password-error').classList.add('show');
            return;
        }
        if (password !== password2) {
            document.getElementById('reg-password2').classList.add('error');
            document.getElementById('reg-password2-error').textContent = 'Пароли не совпадают';
            document.getElementById('reg-password2-error').classList.add('show');
            return;
        }

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            var res = await fetchWithRetry(SUPABASE_URL + '/auth/v1/signup', {
                method: 'POST',
                headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            }, 2);

            var data;
            try { data = await res.json(); }
            catch (je) { throw new Error('Сервер вернул некорректный ответ'); }

            if (!res.ok) {
                var errMsg = data.error_description || data.error || data.msg || data.message || ('HTTP ' + res.status);
                var lower = String(errMsg).toLowerCase();
                if (lower.indexOf('already') !== -1 || lower.indexOf('registered') !== -1) {
                    showToast('Этот email уже зарегистрирован', 'error');
                } else if (lower.indexOf('password') !== -1) {
                    showToast('Пароль слишком слабый', 'error');
                } else {
                    showToast(errMsg, 'error');
                }
                btn.classList.remove('loading');
                btn.disabled = false;
                return;
            }

            if (data.access_token && data.user) {
                saveSession(data);
                showToast('Аккаунт создан! Добро пожаловать', 'success');
                setTimeout(function() { window.location.href = '/profile/'; }, 700);
            } else {
                showToast('📧 Проверьте почту и подтвердите email', 'success');
                btn.classList.remove('loading');
                btn.disabled = false;
            }

        } catch (err) {
            var msg = err.name === 'AbortError' ? 'Превышено время ожидания' : err.message;
            showToast(msg, 'error');
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // ============================================================
    // START
    // ============================================================
    createStars();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
</script>
