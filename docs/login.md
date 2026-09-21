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
@keyframes lgSpin { to { transform: rotate(360deg); } }
@keyframes lgFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lgFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes lgPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

.lg-container { max-width: 440px; margin: 0 auto; }
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
        radial-gradient(1px 1px at 10% 80%, #fff, transparent);
    opacity: 0.5;
    animation: lgFloat 8s ease-in-out infinite;
}
.lg-hero-content { position: relative; z-index: 2; }
.lg-logo {
    width: 90px; height: 90px;
    margin: 0 auto 16px auto;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #e74c3c 0%, #c0392b 40%, #7f1d1d 80%, #4a1010 100%);
    box-shadow: inset -8px -8px 24px rgba(0,0,0,0.6), 0 0 40px 8px rgba(231,76,60,0.4);
    animation: lgPulse 3s ease-in-out infinite;
}
.lg-hero-title {
    font-size: 1.6rem; font-weight: 800; margin: 0 0 6px 0;
    background: linear-gradient(135deg, #fff, #A29BFE);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.lg-hero-sub { font-size: 0.88rem; opacity: 0.75; margin: 0; }
.lg-tabs { display: flex; background: #fff; border-bottom: 1px solid #e5e7eb; }
.lg-tab {
    flex: 1; padding: 18px 12px; background: none; border: none;
    color: #888; font-size: 0.92rem; font-weight: 700; cursor: pointer;
    font-family: inherit; position: relative;
}
.lg-tab.active { color: #6C63FF; }
.lg-tab.active::after {
    content: ''; position: absolute; bottom: 0; left: 20%; right: 20%;
    height: 3px; background: linear-gradient(90deg, #6C63FF, #A29BFE);
    border-radius: 3px 3px 0 0;
}
.lg-card {
    background: #fff; padding: 32px 32px 24px 32px;
    border-radius: 0 0 24px 24px;
    box-shadow: 0 20px 60px -12px rgba(0,0,0,0.15);
}
.lg-form { animation: lgFade 0.4s ease; }
.lg-form.hidden { display: none; }
.lg-field { margin-bottom: 18px; }
.lg-field label { display: block; font-size: 0.82rem; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
.lg-input-wrap { position: relative; }
.lg-input {
    width: 100%; padding: 14px 44px 14px 16px;
    border-radius: 12px; border: 2px solid #e5e7eb;
    font-size: 0.95rem; font-family: inherit; outline: none;
    background: #f8f9fb; color: #1a1a2e; box-sizing: border-box;
    transition: all 0.25s;
}
.lg-input:focus { border-color: #6C63FF; background: #fff; box-shadow: 0 0 0 4px rgba(108,99,255,0.1); }
.lg-input.error { border-color: #e74c3c; background: #fff5f5; }
.lg-eye-btn {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; font-size: 1.1rem;
    padding: 6px; opacity: 0.6; color: #1a1a2e;
}
.lg-error-text { font-size: 0.78rem; color: #e74c3c; margin-top: 6px; padding-left: 4px; display: none; }
.lg-error-text.show { display: block; }
.lg-btn {
    width: 100%; padding: 15px 20px; border-radius: 12px; border: none;
    font-size: 0.98rem; font-weight: 800; cursor: pointer; font-family: inherit;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: linear-gradient(135deg, #6C63FF, #A29BFE);
    color: #fff; box-shadow: 0 8px 20px -4px rgba(108,99,255,0.4);
    transition: all 0.25s;
}
.lg-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px -4px rgba(108,99,255,0.5); }
.lg-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.lg-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
    border-radius: 50%; animation: lgSpin 0.6s linear infinite;
    display: none;
}
.lg-btn.loading .lg-spinner { display: inline-block; }
.lg-extra { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-size: 0.82rem; flex-wrap: wrap; gap: 8px; }
.lg-link {
    color: #6C63FF; font-weight: 700; cursor: pointer;
    background: none; border: none; font-family: inherit; font-size: 0.82rem; padding: 4px 0;
}
.lg-link:hover { opacity: 0.75; }
.lg-toast {
    position: fixed; bottom: 30px; left: 50%;
    transform: translateX(-50%) translateY(100px);
    padding: 14px 28px; border-radius: 30px; font-weight: 700; font-size: 0.9rem;
    box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 999999;
    transition: transform 0.4s; display: flex; align-items: center; gap: 10px;
    max-width: 90vw; color: #fff;
}
.lg-toast.show { transform: translateX(-50%) translateY(0); }
.lg-toast.success { background: linear-gradient(135deg, #27ae60, #16a085); }
.lg-toast.error { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.lg-toast.info { background: linear-gradient(135deg, #3498db, #2980b9); }

@media (max-width: 500px) {
    .lg-hero { padding: 32px 24px 24px 24px; border-radius: 20px 20px 0 0; }
    .lg-card { padding: 24px 20px 20px 20px; border-radius: 0 0 20px 20px; }
}
</style>

<script>
(function() {
    'use strict';

    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SESSION_KEY = 'sb-' + PROJECT_REF + '-auth-token';

    var container = document.getElementById('login-app');

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

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
        }, 3000);
    }

    // ============================================================
    // 🎨 РЕНДЕР
    // ============================================================
    function render() {
        var params = new URLSearchParams(window.location.search);
        var emailFromUrl = params.get('email') || '';

        container.innerHTML = [
            '<div class="lg-container">',
            '  <div class="lg-hero"><div class="lg-hero-content">',
            '    <div class="lg-logo"></div>',
            '    <h1 class="lg-hero-title">Марсианская энциклопедия</h1>',
            '    <p class="lg-hero-sub">Lān sur · Глина помнит</p>',
            '  </div></div>',
            '  <div class="lg-tabs">',
            '    <button class="lg-tab active" data-tab="login">🔐 Вход</button>',
            '    <button class="lg-tab" data-tab="register">✨ Регистрация</button>',
            '  </div>',
            '  <div class="lg-card">',
            '    <form class="lg-form" id="form-login">',
            '      <div class="lg-field">',
            '        <label for="login-email">Email</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="email" id="login-email" class="lg-input" placeholder="ivan@example.com" value="' + escapeHtml(emailFromUrl) + '" autocomplete="email" required>',
            '        </div>',
            '        <div class="lg-error-text" id="login-email-error"></div>',
            '      </div>',
            '      <div class="lg-field">',
            '        <label for="login-password">Пароль</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="password" id="login-password" class="lg-input" placeholder="Введите пароль" autocomplete="current-password" required>',
            '          <button type="button" class="lg-eye-btn" data-target="login-password">👁️</button>',
            '        </div>',
            '        <div class="lg-error-text" id="login-password-error"></div>',
            '      </div>',
            '      <button type="submit" class="lg-btn" id="btn-login">',
            '        <span class="lg-spinner"></span>',
            '        <span>Войти</span>',
            '      </button>',
            '      <div class="lg-extra">',
            '        <button type="button" class="lg-link" id="forgot-password">Забыли пароль?</button>',
            '      </div>',
            '    </form>',
            '    <form class="lg-form hidden" id="form-register">',
            '      <div class="lg-field">',
            '        <label for="reg-email">Email</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="email" id="reg-email" class="lg-input" placeholder="ivan@example.com" autocomplete="email" required>',
            '        </div>',
            '        <div class="lg-error-text" id="reg-email-error"></div>',
            '      </div>',
            '      <div class="lg-field">',
            '        <label for="reg-password">Пароль</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="password" id="reg-password" class="lg-input" placeholder="Минимум 6 символов" autocomplete="new-password" required>',
            '          <button type="button" class="lg-eye-btn" data-target="reg-password">👁️</button>',
            '        </div>',
            '        <div class="lg-error-text" id="reg-password-error"></div>',
            '      </div>',
            '      <div class="lg-field">',
            '        <label for="reg-password2">Подтвердите пароль</label>',
            '        <div class="lg-input-wrap">',
            '          <input type="password" id="reg-password2" class="lg-input" placeholder="Повторите пароль" autocomplete="new-password" required>',
            '          <button type="button" class="lg-eye-btn" data-target="reg-password2">👁️</button>',
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

        document.querySelectorAll('.lg-tab').forEach(function(tab) {
            tab.onclick = function() {
                document.querySelectorAll('.lg-tab').forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                var isLogin = tab.dataset.tab === 'login';
                document.getElementById('form-login').classList.toggle('hidden', !isLogin);
                document.getElementById('form-register').classList.toggle('hidden', isLogin);
            };
        });

        document.getElementById('switch-to-login').onclick = function() {
            document.querySelector('.lg-tab[data-tab="login"]').click();
        };

        document.querySelectorAll('.lg-eye-btn').forEach(function(btn) {
            btn.onclick = function() {
                var t = document.getElementById(btn.dataset.target);
                if (!t) return;
                if (t.type === 'password') { t.type = 'text'; btn.textContent = '🙈'; }
                else { t.type = 'password'; btn.textContent = '👁️'; }
            };
        });

        document.getElementById('forgot-password').onclick = async function() {
            var email = document.getElementById('login-email').value.trim();
            if (!email) { showToast('Введите email', 'error'); return; }
            showToast('Отправка...', 'info');
            try {
                var res = await fetch(SUPABASE_URL + '/auth/v1/recover', {
                    method: 'POST',
                    headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                });
                if (res.ok) showToast('📧 Проверьте почту!', 'success');
                else showToast('Не удалось отправить', 'error');
            } catch(e) {
                showToast('Ошибка сети', 'error');
            }
        };

        document.getElementById('form-login').onsubmit = handleLogin;
        document.getElementById('form-register').onsubmit = handleRegister;
    }

    // ============================================================
    // 💾 СОХРАНЕНИЕ СЕССИИ — ПОЛНЫЙ формат supabase-js v2
    // ============================================================
    function saveSession(data) {
        // 🔑 ПОЛНАЯ сессия со всеми полями — supabase-js узнает её
        var fullSession = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in || 3600,
            expires_at: Math.floor(Date.now() / 1000) + (data.expires_in || 3600),
            token_type: data.token_type || 'bearer',
            user: data.user  // ← ПОЛНЫЙ user как вернул Supabase
        };
        var fullJson = JSON.stringify([fullSession]);

        // 1. localStorage — ПОЛНАЯ
        try {
            localStorage.setItem(SESSION_KEY, fullJson);
        } catch(e) {
            console.warn('localStorage error:', e.message);
        }

        // 2. sessionStorage — ПОЛНАЯ (резерв)
        try {
            sessionStorage.setItem(SESSION_KEY, fullJson);
        } catch(e) {}

        // 3. Cookie — КОМПАКТНАЯ (влезет в 4 КБ)
        try {
            var compactSession = {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                expires_at: fullSession.expires_at,
                token_type: 'bearer',
                user: {
                    id: data.user.id,
                    email: data.user.email
                }
            };
            var compactJson = JSON.stringify([compactSession]);
            var expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = SESSION_KEY + '=' + encodeURIComponent(compactJson) + '; expires=' + expires + '; path=/; SameSite=Lax';
        } catch(e) {}
    }

    // ============================================================
    // 🚪 ВХОД
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
            var controller = new AbortController();
            var timeoutId = setTimeout(function() { controller.abort(); }, 15000);

            var res = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
                method: 'POST',
                headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            var data;
            try { data = await res.json(); }
            catch (je) { throw new Error('Сервер вернул некорректный ответ'); }

            if (!res.ok) {
                var errMsg = data.error_description || data.error || data.msg || data.message || ('HTTP ' + res.status);
                if (String(errMsg).toLowerCase().indexOf('invalid') !== -1) {
                    showToast('Неверный email или пароль', 'error');
                } else if (String(errMsg).toLowerCase().indexOf('confirm') !== -1) {
                    showToast('Email не подтверждён', 'error');
                } else {
                    showToast(errMsg, 'error');
                }
                btn.classList.remove('loading');
                btn.disabled = false;
                return;
            }

            saveSession(data);
            showToast('Добро пожаловать!', 'success');

            setTimeout(function() { window.location.href = '/'; }, 700);

        } catch (err) {
            var msg = err.message;
            if (err.name === 'AbortError') msg = 'Превышено время ожидания';
            else if (msg.indexOf('Failed to fetch') !== -1) msg = 'Нет связи с сервером';
            showToast(msg, 'error');
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // ============================================================
    // 📝 РЕГИСТРАЦИЯ
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
            var controller = new AbortController();
            var timeoutId = setTimeout(function() { controller.abort(); }, 15000);

            var res = await fetch(SUPABASE_URL + '/auth/v1/signup', {
                method: 'POST',
                headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            var data = await res.json();

            if (!res.ok) {
                var errMsg = data.error_description || data.error || data.msg || data.message || ('HTTP ' + res.status);
                if (String(errMsg).toLowerCase().indexOf('already') !== -1) {
                    showToast('Этот email уже зарегистрирован', 'error');
                } else {
                    showToast(errMsg, 'error');
                }
                btn.classList.remove('loading');
                btn.disabled = false;
                return;
            }

            if (data.access_token && data.user) {
                saveSession(data);
                showToast('Аккаунт создан!', 'success');
                setTimeout(function() { window.location.href = '/'; }, 700);
            } else {
                showToast('Проверьте почту и подтвердите email', 'success');
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
</script>
