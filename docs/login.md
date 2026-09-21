---
title: Вход
comments: false
---

<div id="login-app" style="max-width: 100%; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: lgSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка...</p>
    </div>
</div>

<style>
:root {
    --primary: #6C63FF;
    --primary-light: #A29BFE;
    --primary-dark: #4C44D9;
    --success: #27ae60;
    --error: #e74c3c;
    --text: #1a1a2e;
    --text-muted: #888;
    --bg-card: #ffffff;
    --bg-input: #f8f9fb;
    --border: #e5e7eb;
}

@keyframes lgSpin { to { transform: rotate(360deg); } }
@keyframes lgFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lgFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes lgPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes lgShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
}
@keyframes lgCheckmark { 0% { stroke-dashoffset: 50; } 100% { stroke-dashoffset: 0; } }
@keyframes lgCircle { 0% { stroke-dashoffset: 166; } 100% { stroke-dashoffset: 0; } }
@keyframes lgSuccessPop {
    0% { opacity: 0; transform: scale(0.5); }
    50% { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
}

.lg-fade { animation: lgFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
#login-app a { text-decoration: none !important; border-bottom: none !important; }

.lg-container { max-width: 440px; margin: 0 auto; position: relative; }

.lg-hero {
    position: relative;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    border-radius: 24px 24px 0 0;
    padding: 40px 32px 32px 32px;
    color: #fff;
    text-align: center;
    overflow: hidden;
}
.lg-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(2px 2px at 20% 30%, #fff, transparent),
        radial-gradient(1px 1px at 40% 70%, #fff, transparent),
        radial-gradient(1.5px 1.5px at 60% 20%, #fff, transparent),
        radial-gradient(1px 1px at 80% 60%, #fff, transparent),
        radial-gradient(2px 2px at 90% 40%, #fff, transparent),
        radial-gradient(1px 1px at 10% 80%, #fff, transparent),
        radial-gradient(1.5px 1.5px at 50% 90%, #fff, transparent),
        radial-gradient(1px 1px at 30% 10%, #fff, transparent);
    opacity: 0.5;
    animation: lgFloat 8s ease-in-out infinite;
}
.lg-hero-content { position: relative; z-index: 2; }
.lg-logo {
    width: 90px; height: 90px;
    margin: 0 auto 16px auto;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #e74c3c 0%, #c0392b 40%, #7f1d1d 80%, #4a1010 100%);
    box-shadow: inset -8px -8px 24px rgba(0,0,0,0.6), inset 6px 6px 18px rgba(255,150,100,0.15), 0 0 40px 8px rgba(231,76,60,0.4), 0 0 80px 20px rgba(231,76,60,0.2);
    animation: lgPulse 3s ease-in-out infinite;
    position: relative;
    overflow: hidden;
}
.lg-logo::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 12px 6px at 25% 35%, rgba(180,80,60,0.6), transparent), radial-gradient(ellipse 16px 10px at 65% 50%, rgba(180,80,60,0.5), transparent), radial-gradient(ellipse 8px 5px at 40% 70%, rgba(180,80,60,0.5), transparent);
}
.lg-hero-title {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 6px 0;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #fff, #A29BFE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.lg-hero-sub { font-size: 0.88rem; opacity: 0.75; margin: 0; letter-spacing: 0.3px; }

.lg-tabs { display: flex; background: #fff; border-bottom: 1px solid var(--border); padding: 0; position: relative; }
.lg-tab {
    flex: 1;
    padding: 18px 12px;
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    transition: color 0.25s;
    font-family: inherit;
    position: relative;
}
.lg-tab:hover { color: var(--text); }
.lg-tab.active { color: var(--primary); }
.lg-tab.active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 20%; right: 20%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-light));
    border-radius: 3px 3px 0 0;
    animation: lgFadeIn 0.3s ease;
}

.lg-card {
    background: #fff;
    padding: 32px 32px 24px 32px;
    border-radius: 0 0 24px 24px;
    box-shadow: 0 20px 60px -12px rgba(0,0,0,0.15);
}
.lg-form { animation: lgFadeIn 0.4s ease; }
.lg-form.hidden { display: none; }
.lg-field { margin-bottom: 18px; position: relative; }
.lg-field label { display: block; font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 8px; letter-spacing: 0.2px; }
.lg-input-wrap { position: relative; }
.lg-input {
    width: 100%;
    padding: 14px 44px 14px 16px;
    border-radius: 12px;
    border: 2px solid var(--border);
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    background: var(--bg-input);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-sizing: border-box;
    color: var(--text);
}
.lg-input:focus { border-color: var(--primary); background: #fff; box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.1); }
.lg-input.error { border-color: var(--error); animation: lgShake 0.4s ease; background: #fff5f5; }
.lg-input.success { border-color: var(--success); background: #f0fdf4; }
.lg-eye-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 6px;
    border-radius: 8px;
    transition: background 0.2s;
    opacity: 0.6;
    color: var(--text);
}
.lg-eye-btn:hover { background: rgba(0,0,0,0.05); opacity: 1; }
.lg-error-text { font-size: 0.78rem; color: var(--error); margin-top: 6px; padding-left: 4px; display: none; }
.lg-error-text.show { display: block; animation: lgFadeIn 0.3s ease; }

.lg-btn {
    width: 100%;
    padding: 15px 20px;
    border-radius: 12px;
    border: none;
    font-size: 0.98rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.2px;
}
.lg-btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    color: #fff;
    box-shadow: 0 8px 20px -4px rgba(108, 99, 255, 0.4);
}
.lg-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px -4px rgba(108, 99, 255, 0.5); }
.lg-btn-primary:active:not(:disabled) { transform: translateY(0); }
.lg-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

.lg-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: lgSpin 0.6s linear infinite;
    display: none;
}
.lg-btn.loading .lg-spinner { display: inline-block; }
.lg-btn.loading .lg-btn-text { opacity: 0.7; }

.lg-extra { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-size: 0.82rem; flex-wrap: wrap; gap: 8px; }
.lg-link {
    color: var(--primary);
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
    background: none;
    border: none;
    font-family: inherit;
    font-size: 0.82rem;
    padding: 4px 0;
}
.lg-link:hover { opacity: 0.7; text-decoration: underline !important; }
.lg-checkbox-wrap { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--text-muted); cursor: pointer; user-select: none; }
.lg-checkbox { width: 18px; height: 18px; accent-color: var(--primary); cursor: pointer; }

.lg-qr-hint {
    padding: 14px 18px;
    background: linear-gradient(135deg, #e8f5e9, #f0fdf4);
    border-radius: 12px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.85rem;
    color: #2e7d32;
    border-left: 4px solid var(--success);
    animation: lgFadeIn 0.4s ease;
}
.lg-qr-hint-icon { font-size: 1.4rem; }
.lg-qr-hint-text strong { color: #1b5e20; }

.lg-success-overlay {
    position: fixed; inset: 0; z-index: 999999;
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    display: flex; align-items: center; justify-content: center;
    animation: lgFadeIn 0.3s ease;
}
.lg-success-content { text-align: center; color: #fff; animation: lgSuccessPop 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.lg-success-svg { width: 120px; height: 120px; margin: 0 auto 20px auto; }
.lg-success-circle { stroke: #fff; stroke-width: 4; fill: none; stroke-dasharray: 166; stroke-dashoffset: 166; animation: lgCircle 0.8s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
.lg-success-check { stroke: #fff; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; fill: none; stroke-dasharray: 50; stroke-dashoffset: 50; animation: lgCheckmark 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards; }
.lg-success-title { font-size: 1.6rem; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px; }
.lg-success-sub { font-size: 0.95rem; opacity: 0.9; margin: 0; }

.lg-toast {
    position: fixed; bottom: 30px; left: 50%;
    transform: translateX(-50%) translateY(100px);
    padding: 14px 28px; border-radius: 30px;
    font-weight: 700; font-size: 0.9rem;
    box-shadow: 0 12px 32px rgba(0,0,0,0.25);
    z-index: 999999;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    display: flex; align-items: center; gap: 10px;
    max-width: 90vw; color: #fff;
}
.lg-toast.show { transform: translateX(-50%) translateY(0); }
.lg-toast.success { background: linear-gradient(135deg, #27ae60, #16a085); }
.lg-toast.error { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.lg-toast.info { background: linear-gradient(135deg, #3498db, #2980b9); }

@media (max-width: 500px) {
    .lg-hero { padding: 32px 24px 24px 24px; border-radius: 20px 20px 0 0; }
    .lg-logo { width: 70px; height: 70px; }
    .lg-hero-title { font-size: 1.3rem; }
    .lg-card { padding: 24px 20px 20px 20px; border-radius: 0 0 20px 20px; }
    .lg-tab { padding: 14px 8px; font-size: 0.85rem; }
    .lg-input { padding: 12px 40px 12px 14px; font-size: 0.92rem; }
    .lg-btn { padding: 14px 18px; font-size: 0.92rem; }
}

@media (prefers-color-scheme: dark) {
    .lg-card { background: #1a1a2e; }
    .lg-tabs { background: #1a1a2e; border-color: #2a2a3a; }
    .lg-tab { color: #888; }
    .lg-tab:hover { color: #d4d4e8; }
    .lg-field label { color: #d4d4e8; }
    .lg-input { background: rgba(255,255,255,0.04); border-color: #2a2a3a; color: #e0e0e0; }
    .lg-input:focus { background: rgba(255,255,255,0.08); }
    .lg-eye-btn { color: #d4d4e8; }
    .lg-qr-hint { background: rgba(39, 174, 96, 0.1); color: #4ade80; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    'use strict';

    var SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    var SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    var container = document.getElementById('login-app');

    // ============================================================
    // Безопасный таймаут для промисов
    // ============================================================
    function withTimeout(promise, ms, fallback) {
        return Promise.race([
            promise,
            new Promise(function(resolve) {
                setTimeout(function() { resolve(fallback); }, ms);
            })
        ]);
    }

    // ============================================================
    // Проверка: если уже залогинен — редирект в профиль
    // ============================================================
    function checkAlreadyLoggedIn(callback) {
        var attempts = 0;
        var check = setInterval(function() {
            attempts++;
            var client = window.supabaseClient;
            if (!client && typeof supabase !== 'undefined') {
                try {
                    client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                } catch (e) {
                    clearInterval(check);
                    callback(null);
                    return;
                }
            }
            if (!client) {
                if (attempts > 30) { clearInterval(check); callback(null); }
                return;
            }

            client.auth.getSession().then(function(res) {
                clearInterval(check);
                callback(res && res.data && res.data.session && res.data.session.user ? res.data.session.user : null);
            }).catch(function() {
                clearInterval(check);
                callback(null);
            });
        }, 200);
    }

    // ============================================================
    // Тосты
    // ============================================================
    function showToast(msg, type) {
        type = type || 'info';
        var toast = document.createElement('div');
        toast.className = 'lg-toast ' + type;
        var icons = { success: '✅', error: '⚠️', info: 'ℹ️' };
        toast.innerHTML = '<span>' + (icons[type] || '') + '</span><span>' + escapeHtml(msg) + '</span>';
        document.body.appendChild(toast);
        requestAnimationFrame(function() { toast.classList.add('show'); });
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() { toast.remove(); }, 400);
        }, 2600);
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    // ============================================================
    // Экран успеха
    // ============================================================
    function showSuccess(email, redirectUrl) {
        var overlay = document.createElement('div');
        overlay.className = 'lg-success-overlay';
        overlay.innerHTML = [
            '<div class="lg-success-content">',
            '    <svg class="lg-success-svg" viewBox="0 0 100 100">',
            '        <circle class="lg-success-circle" cx="50" cy="50" r="26"/>',
            '        <path class="lg-success-check" d="M 32 52 L 45 65 L 70 38"/>',
            '    </svg>',
            '    <h2 class="lg-success-title">Добро пожаловать!</h2>',
            '    <p class="lg-success-sub">Переход в профиль...</p>',
            '</div>'
        ].join('');
        document.body.appendChild(overlay);
        setTimeout(function() {
            window.location.href = redirectUrl || '/profile/';
        }, 1400);
    }

    // ============================================================
    // Клиент
    // ============================================================
    function getClient() {
        if (window.supabaseClient) return window.supabaseClient;
        if (typeof supabase !== 'undefined') {
            return supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        }
        showToast('Supabase не загружен', 'error');
        return null;
    }

    // ============================================================
    // РЕНДЕР
    // ============================================================
    function render() {
        var params = new URLSearchParams(window.location.search);
        var emailFromUrl = params.get('email') || '';
        var redirectUrl = params.get('redirect') || '/profile/';

        container.innerHTML = [
            '<div class="lg-container">',
            '    <div class="lg-hero">',
            '        <div class="lg-hero-content">',
            '            <div class="lg-logo"></div>',
            '            <h1 class="lg-hero-title">Марсианская энциклопедия</h1>',
            '            <p class="lg-hero-sub">Lān sur · Глина помнит</p>',
            '        </div>',
            '    </div>',
            '    <div class="lg-tabs">',
            '        <button class="lg-tab active" data-tab="login">🔐 Вход</button>',
            '        <button class="lg-tab" data-tab="register">✨ Регистрация</button>',
            '    </div>',
            '    <div class="lg-card">',
            emailFromUrl ? [
                '        <div class="lg-qr-hint">',
                '            <span class="lg-qr-hint-icon">📱</span>',
                '            <div class="lg-qr-hint-text">Email <strong>' + escapeHtml(emailFromUrl) + '</strong> подставлен. Введите пароль.</div>',
                '        </div>'
            ].join('') : '',
            '        <form class="lg-form" id="form-login" autocomplete="on">',
            '            <div class="lg-field">',
            '                <label for="login-email">Email</label>',
            '                <div class="lg-input-wrap">',
            '                    <input type="email" id="login-email" class="lg-input" placeholder="ivan@example.com" value="' + escapeHtml(emailFromUrl) + '" autocomplete="email" required>',
            '                </div>',
            '                <div class="lg-error-text" id="login-email-error"></div>',
            '            </div>',
            '            <div class="lg-field">',
            '                <label for="login-password">Пароль</label>',
            '                <div class="lg-input-wrap">',
            '                    <input type="password" id="login-password" class="lg-input" placeholder="Введите пароль" autocomplete="current-password" required>',
            '                    <button type="button" class="lg-eye-btn" data-target="login-password">👁️</button>',
            '                </div>',
            '                <div class="lg-error-text" id="login-password-error"></div>',
            '            </div>',
            '            <button type="submit" class="lg-btn lg-btn-primary" id="btn-login">',
            '                <span class="lg-spinner"></span>',
            '                <span class="lg-btn-text">Войти</span>',
            '            </button>',
            '            <div class="lg-extra">',
            '                <label class="lg-checkbox-wrap">',
            '                    <input type="checkbox" class="lg-checkbox" id="remember-me" checked>',
            '                    Запомнить меня',
            '                </label>',
            '                <button type="button" class="lg-link" id="forgot-password">Забыли пароль?</button>',
            '            </div>',
            '        </form>',
            '        <form class="lg-form hidden" id="form-register" autocomplete="on">',
            '            <div class="lg-field">',
            '                <label for="reg-email">Email</label>',
            '                <div class="lg-input-wrap">',
            '                    <input type="email" id="reg-email" class="lg-input" placeholder="ivan@example.com" autocomplete="email" required>',
            '                </div>',
            '                <div class="lg-error-text" id="reg-email-error"></div>',
            '            </div>',
            '            <div class="lg-field">',
            '                <label for="reg-password">Пароль</label>',
            '                <div class="lg-input-wrap">',
            '                    <input type="password" id="reg-password" class="lg-input" placeholder="Минимум 6 символов" autocomplete="new-password" required>',
            '                    <button type="button" class="lg-eye-btn" data-target="reg-password">👁️</button>',
            '                </div>',
            '                <div class="lg-error-text" id="reg-password-error"></div>',
            '            </div>',
            '            <div class="lg-field">',
            '                <label for="reg-password2">Подтвердите пароль</label>',
            '                <div class="lg-input-wrap">',
            '                    <input type="password" id="reg-password2" class="lg-input" placeholder="Повторите пароль" autocomplete="new-password" required>',
            '                    <button type="button" class="lg-eye-btn" data-target="reg-password2">👁️</button>',
            '                </div>',
            '                <div class="lg-error-text" id="reg-password2-error"></div>',
            '            </div>',
            '            <button type="submit" class="lg-btn lg-btn-primary" id="btn-register">',
            '                <span class="lg-spinner"></span>',
            '                <span class="lg-btn-text">Создать аккаунт</span>',
            '            </button>',
            '            <div class="lg-extra" style="justify-content:center;">',
            '                <span style="color:#888;">Уже есть аккаунт?</span>',
            '                <button type="button" class="lg-link" id="switch-to-login">Войти</button>',
            '            </div>',
            '        </form>',
            '    </div>',
            '</div>'
        ].join('');

        if (emailFromUrl) {
            setTimeout(function() {
                var pwd = document.getElementById('login-password');
                if (pwd) pwd.focus();
            }, 300);
        }

        document.querySelectorAll('.lg-tab').forEach(function(tab) {
            tab.onclick = function() {
                document.querySelectorAll('.lg-tab').forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                var isLogin = tab.dataset.tab === 'login';
                document.getElementById('form-login').classList.toggle('hidden', !isLogin);
                document.getElementById('form-register').classList.toggle('hidden', isLogin);
            };
        });

        var switchBtn = document.getElementById('switch-to-login');
        if (switchBtn) {
            switchBtn.addEventListener('click', function() {
                document.querySelector('.lg-tab[data-tab="login"]').click();
            });
        }

        document.querySelectorAll('.lg-eye-btn').forEach(function(btn) {
            btn.onclick = function() {
                var target = document.getElementById(btn.dataset.target);
                if (!target) return;
                if (target.type === 'password') {
                    target.type = 'text';
                    btn.textContent = '🙈';
                } else {
                    target.type = 'password';
                    btn.textContent = '👁️';
                }
            };
        });

        var forgotBtn = document.getElementById('forgot-password');
        if (forgotBtn) {
            forgotBtn.addEventListener('click', async function() {
                var email = document.getElementById('login-email').value.trim();
                if (!email) { showToast('Введите email', 'error'); return; }
                var client = getClient();
                if (!client) return;
                showToast('Отправка...', 'info');
                try {
                    var res = await client.auth.resetPasswordForEmail(email, {
                        redirectTo: window.location.origin + '/mars-encyclopedia/profile/'
                    });
                    if (res.error) showToast('Ошибка: ' + res.error.message, 'error');
                    else showToast('📧 Проверьте почту!', 'success');
                } catch(e) {
                    showToast('Ошибка отправки', 'error');
                }
            });
        }

        document.getElementById('form-login').addEventListener('submit', handleLogin);
        document.getElementById('form-register').addEventListener('submit', handleRegister);
    }

    // ============================================================
    // Ошибки в полях
    // ============================================================
    function setFieldError(inputId, errorId, message) {
        var input = document.getElementById(inputId);
        var errorEl = document.getElementById(errorId);
        if (!input || !errorEl) return;
        if (message) {
            input.classList.add('error');
            input.classList.remove('success');
            errorEl.textContent = message;
            errorEl.classList.add('show');
        } else {
            input.classList.remove('error');
            input.classList.add('success');
            errorEl.classList.remove('show');
        }
    }

    function clearAllErrors(formId) {
        var form = document.getElementById(formId);
        if (!form) return;
        form.querySelectorAll('.lg-input').forEach(function(inp) {
            inp.classList.remove('error', 'success');
        });
        form.querySelectorAll('.lg-error-text').forEach(function(el) {
            el.classList.remove('show');
        });
    }

    // ============================================================
    // ВХОД (без 2FA — работает быстро)
    // ============================================================
    async function handleLogin(e) {
        e.preventDefault();
        clearAllErrors('form-login');

        var email = document.getElementById('login-email').value.trim();
        var password = document.getElementById('login-password').value;
        var btn = document.getElementById('btn-login');

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFieldError('login-email', 'login-email-error', 'Введите корректный email');
            return;
        }
        if (!password) {
            setFieldError('login-password', 'login-password-error', 'Введите пароль');
            return;
        }

        var client = getClient();
        if (!client) return;

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            var result = await withTimeout(
                client.auth.signInWithPassword({ email: email, password: password }),
                15000,
                { error: { message: 'Превышено время ожидания' } }
            );

            if (result.error) {
                btn.classList.remove('loading');
                btn.disabled = false;
                var msg = result.error.message || '';
                if (msg.indexOf('Invalid login credentials') !== -1) {
                    showToast('Неверный email или пароль', 'error');
                    setFieldError('login-password', 'login-password-error', 'Проверьте пароль');
                } else if (msg.indexOf('Email not confirmed') !== -1) {
                    showToast('Email не подтверждён', 'error');
                } else {
                    showToast(msg, 'error');
                }
                return;
            }

            // ✅ Вход выполнен
            console.log('✅ Вход выполнен:', result.data.user.email);
            showToast('Добро пожаловать!', 'success');
            showSuccess(result.data.user.email, redirectUrl);

        } catch (err) {
            btn.classList.remove('loading');
            btn.disabled = false;
            console.error('❌ Ошибка входа:', err);
            showToast('Ошибка: ' + (err.message || 'что-то пошло не так'), 'error');
        }
    }

    // ============================================================
    // РЕГИСТРАЦИЯ
    // ============================================================
    async function handleRegister(e) {
        e.preventDefault();
        clearAllErrors('form-register');

        var email = document.getElementById('reg-email').value.trim();
        var password = document.getElementById('reg-password').value;
        var password2 = document.getElementById('reg-password2').value;
        var btn = document.getElementById('btn-register');

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFieldError('reg-email', 'reg-email-error', 'Введите корректный email');
            return;
        }
        if (!password || password.length < 6) {
            setFieldError('reg-password', 'reg-password-error', 'Минимум 6 символов');
            return;
        }
        if (password !== password2) {
            setFieldError('reg-password2', 'reg-password2-error', 'Пароли не совпадают');
            return;
        }

        var client = getClient();
        if (!client) return;

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            var result = await withTimeout(
                client.auth.signUp({
                    email: email,
                    password: password,
                    options: { emailRedirectTo: window.location.origin + '/mars-encyclopedia/profile/' }
                }),
                15000,
                { error: { message: 'Превышено время ожидания' } }
            );

            if (result.error) {
                btn.classList.remove('loading');
                btn.disabled = false;
                var msg = result.error.message || '';
                if (msg.indexOf('already registered') !== -1) {
                    showToast('Этот email уже зарегистрирован', 'error');
                    setFieldError('reg-email', 'reg-email-error', 'Уже используется');
                } else {
                    showToast(msg, 'error');
                }
                return;
            }

            // Создаём профиль (не блокируем, если упадёт)
            if (result.data && result.data.user) {
                try {
                    await client.from('profiles').insert([{
                        user_id: result.data.user.id,
                        username: email.split('@')[0],
                        display_name: email.split('@')[0]
                    }]);
                } catch (e) {
                    console.warn('Профиль:', e);
                }
            }

            showToast('Аккаунт создан! Проверьте почту', 'success');
            setTimeout(function() {
                showSuccess(email, '/profile/');
            }, 1000);

        } catch (err) {
            btn.classList.remove('loading');
            btn.disabled = false;
            console.error('❌ Ошибка регистрации:', err);
            showToast('Ошибка: ' + (err.message || 'что-то пошло не так'), 'error');
        }
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    checkAlreadyLoggedIn(function(user) {
        if (user) {
            console.log('👤 Уже залогинен:', user.email);
            container.innerHTML = [
                '<div class="lg-container">',
                '    <div class="lg-card" style="text-align:center;padding:60px 30px;">',
                '        <div style="font-size:4rem;margin-bottom:16px;">✅</div>',
                '        <h2 style="margin:0 0 8px 0;color:#1a1a2e;font-size:1.4rem;">Вы уже вошли</h2>',
                '        <p style="color:#888;margin:0 0 24px 0;font-size:0.95rem;">' + escapeHtml(user.email) + '</p>',
                '        <a href="/profile/" class="lg-btn lg-btn-primary" style="text-decoration:none;display:inline-flex;">👤 В профиль</a>',
                '    </div>',
                '</div>'
            ].join('');
            var btn = document.createElement('button');
            btn.className = 'lg-link';
            btn.textContent = 'Войти под другим аккаунтом';
            btn.style.cssText = 'margin-top:16px;display:block;width:100%;';
            btn.onclick = async function() {
                var client = getClient();
                if (client) {
                    await client.auth.signOut();
                    try {
                        var keys = [];
                        for (var i = 0; i < localStorage.length; i++) {
                            var k = localStorage.key(i);
                            if (k && k.indexOf('supabase') === 0) keys.push(k);
                        }
                        keys.forEach(function(k) { localStorage.removeItem(k); });
                    } catch(e) {}
                    window.location.reload();
                }
            };
            container.querySelector('.lg-card').appendChild(btn);
            return;
        }
        render();
    });

})();
</script>
