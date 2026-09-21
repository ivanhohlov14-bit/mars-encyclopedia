---
title: Вход
comments: false
---

<div id="login-app" style="max-width: 100%; margin: 0 auto; font-family: 'Segoe UI', -apple-system, sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: lgSpin 0.8s linear infinite;"></div>
        <p id="lg-status" style="color: #999; margin-top: 16px; font-size: 0.9rem;">Инициализация...</p>
        <div id="lg-debug" style="margin-top: 20px; padding: 14px; background: #fff5f5; border: 1px solid #f5c6c6; border-radius: 10px; text-align: left; font-family: monospace; font-size: 0.72rem; color: #555; max-width: 500px; margin-left: auto; margin-right: auto; white-space: pre-wrap; word-break: break-all; display: none; max-height: 300px; overflow-y: auto;"></div>
    </div>
</div>

<style>
@keyframes lgSpin { to { transform: rotate(360deg); } }
@keyframes lgFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lgFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes lgPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes lgShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }

:root { --primary: #6C63FF; --primary-light: #A29BFE; --success: #27ae60; --error: #e74c3c; --text: #1a1a2e; --text-muted: #888; --bg-input: #f8f9fb; --border: #e5e7eb; }

.lg-container { max-width: 440px; margin: 0 auto; }
.lg-hero { position: relative; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border-radius: 24px 24px 0 0; padding: 40px 32px 32px 32px; color: #fff; text-align: center; overflow: hidden; }
.lg-hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(2px 2px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 40% 70%, #fff, transparent), radial-gradient(1.5px 1.5px at 60% 20%, #fff, transparent), radial-gradient(1px 1px at 80% 60%, #fff, transparent), radial-gradient(2px 2px at 90% 40%, #fff, transparent), radial-gradient(1px 1px at 10% 80%, #fff, transparent), radial-gradient(1.5px 1.5px at 50% 90%, #fff, transparent), radial-gradient(1px 1px at 30% 10%, #fff, transparent); opacity: 0.5; animation: lgFloat 8s ease-in-out infinite; }
.lg-hero-content { position: relative; z-index: 2; }
.lg-logo { width: 90px; height: 90px; margin: 0 auto 16px auto; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #e74c3c 0%, #c0392b 40%, #7f1d1d 80%, #4a1010 100%); box-shadow: inset -8px -8px 24px rgba(0,0,0,0.6), inset 6px 6px 18px rgba(255,150,100,0.15), 0 0 40px 8px rgba(231,76,60,0.4); animation: lgPulse 3s ease-in-out infinite; }
.lg-hero-title { font-size: 1.6rem; font-weight: 800; margin: 0 0 6px 0; background: linear-gradient(135deg, #fff, #A29BFE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.lg-hero-sub { font-size: 0.88rem; opacity: 0.75; margin: 0; }
.lg-tabs { display: flex; background: #fff; border-bottom: 1px solid var(--border); }
.lg-tab { flex: 1; padding: 18px 12px; background: none; border: none; color: var(--text-muted); font-size: 0.92rem; font-weight: 700; cursor: pointer; font-family: inherit; position: relative; }
.lg-tab:hover { color: var(--text); }
.lg-tab.active { color: var(--primary); }
.lg-tab.active::after { content: ''; position: absolute; bottom: 0; left: 20%; right: 20%; height: 3px; background: linear-gradient(90deg, var(--primary), var(--primary-light)); border-radius: 3px 3px 0 0; }
.lg-card { background: #fff; padding: 32px 32px 24px 32px; border-radius: 0 0 24px 24px; box-shadow: 0 20px 60px -12px rgba(0,0,0,0.15); }
.lg-form { animation: lgFadeIn 0.4s ease; }
.lg-form.hidden { display: none; }
.lg-field { margin-bottom: 18px; }
.lg-field label { display: block; font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.lg-input-wrap { position: relative; }
.lg-input { width: 100%; padding: 14px 44px 14px 16px; border-radius: 12px; border: 2px solid var(--border); font-size: 0.95rem; font-family: inherit; outline: none; background: var(--bg-input); color: var(--text); box-sizing: border-box; transition: all 0.25s; }
.lg-input:focus { border-color: var(--primary); background: #fff; box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.1); }
.lg-input.error { border-color: var(--error); animation: lgShake 0.4s ease; }
.lg-eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 6px; opacity: 0.6; color: var(--text); }
.lg-error-text { font-size: 0.78rem; color: var(--error); margin-top: 6px; padding-left: 4px; display: none; }
.lg-error-text.show { display: block; }
.lg-btn { width: 100%; padding: 15px 20px; border-radius: 12px; border: none; font-size: 0.98rem; font-weight: 800; cursor: pointer; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 8px; }
.lg-btn-primary { background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: #fff; box-shadow: 0 8px 20px -4px rgba(108, 99, 255, 0.4); }
.lg-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.lg-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: lgSpin 0.6s linear infinite; display: none; }
.lg-btn.loading .lg-spinner { display: inline-block; }
.lg-extra { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-size: 0.82rem; flex-wrap: wrap; gap: 8px; }
.lg-link { color: var(--primary); font-weight: 700; cursor: pointer; background: none; border: none; font-family: inherit; font-size: 0.82rem; padding: 4px 0; }
.lg-toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px); padding: 14px 28px; border-radius: 30px; font-weight: 700; font-size: 0.9rem; box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 999999; transition: transform 0.4s; display: flex; align-items: center; gap: 10px; max-width: 90vw; color: #fff; }
.lg-toast.show { transform: translateX(-50%) translateY(0); }
.lg-toast.success { background: linear-gradient(135deg, #27ae60, #16a085); }
.lg-toast.error { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.lg-toast.info { background: linear-gradient(135deg, #3498db, #2980b9); }
.lg-success-overlay { position: fixed; inset: 0; z-index: 999999; background: linear-gradient(135deg, var(--primary), var(--primary-light)); display: flex; align-items: center; justify-content: center; }
.lg-success-content { text-align: center; color: #fff; }
.lg-success-title { font-size: 1.6rem; font-weight: 800; margin: 0 0 6px 0; }
.lg-success-sub { font-size: 0.95rem; opacity: 0.9; margin: 0; }

@media (max-width: 500px) {
    .lg-hero { padding: 32px 24px 24px 24px; border-radius: 20px 20px 0 0; }
    .lg-card { padding: 24px 20px 20px 20px; border-radius: 0 0 20px 20px; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    'use strict';

    var SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    var SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    var container = document.getElementById('login-app');
    var statusEl, debugEl;
    var debugLines = [];

    function log(msg) {
        var time = new Date().toLocaleTimeString();
        var line = '[' + time + '] ' + msg;
        debugLines.push(line);
        console.log('📋 ' + msg);
        if (debugEl) {
            debugEl.textContent = debugLines.join('\n');
            debugEl.style.display = 'block';
            debugEl.scrollTop = debugEl.scrollHeight;
        }
    }

    function setStatus(msg) {
        if (statusEl) statusEl.textContent = msg;
        log('STATUS: ' + msg);
    }

    function withTimeout(promise, ms, fallback) {
        return Promise.race([
            promise,
            new Promise(function(resolve) {
                setTimeout(function() {
                    fallback._timeout = true;
                    resolve(fallback);
                }, ms);
            })
        ]);
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
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
        }, 2600);
    }

    function showSuccess(email, redirectUrl) {
        var overlay = document.createElement('div');
        overlay.className = 'lg-success-overlay';
        overlay.innerHTML = '<div class="lg-success-content"><h2 class="lg-success-title">✅ Добро пожаловать!</h2><p class="lg-success-sub">' + escapeHtml(email) + '</p><p class="lg-success-sub" style="margin-top:8px;font-size:0.85rem;opacity:0.7;">Переход в профиль...</p></div>';
        document.body.appendChild(overlay);
        setTimeout(function() {
            window.location.href = redirectUrl || '/profile/';
        }, 1500);
    }

    // ============================================================
    // КЛИЕНТ
    // ============================================================
    function getClient() {
        if (window.supabaseClient) { log('Клиент: window.supabaseClient'); return window.supabaseClient; }
        if (window._supabaseClient) { log('Клиент: window._supabaseClient'); return window._supabaseClient; }
        if (typeof supabase !== 'undefined') {
            try {
                var c = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                log('Клиент: создан новый');
                return c;
            } catch (e) {
                log('❌ Клиент: ошибка — ' + e.message);
                return null;
            }
        }
        log('❌ Клиент: supabase НЕ ЗАГРУЖЕН');
        return null;
    }

    // ============================================================
    // РЕНДЕР
    // ============================================================
    function render() {
        var params = new URLSearchParams(window.location.search);
        var emailFromUrl = params.get('email') || '';

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
            '        <form class="lg-form" id="form-login">',
            '            <div class="lg-field">',
            '                <label for="login-email">Email</label>',
            '                <div class="lg-input-wrap"><input type="email" id="login-email" class="lg-input" placeholder="ivan@example.com" value="' + escapeHtml(emailFromUrl) + '" autocomplete="email" required></div>',
            '                <div class="lg-error-text" id="login-email-error"></div>',
            '            </div>',
            '            <div class="lg-field">',
            '                <label for="login-password">Пароль</label>',
            '                <div class="lg-input-wrap"><input type="password" id="login-password" class="lg-input" placeholder="Введите пароль" autocomplete="current-password" required><button type="button" class="lg-eye-btn" data-target="login-password">👁️</button></div>',
            '                <div class="lg-error-text" id="login-password-error"></div>',
            '            </div>',
            '            <button type="submit" class="lg-btn lg-btn-primary" id="btn-login"><span class="lg-spinner"></span><span class="lg-btn-text">Войти</span></button>',
            '            <div class="lg-extra"><button type="button" class="lg-link" id="forgot-password">Забыли пароль?</button></div>',
            '        </form>',
            '        <form class="lg-form hidden" id="form-register">',
            '            <div class="lg-field"><label for="reg-email">Email</label><div class="lg-input-wrap"><input type="email" id="reg-email" class="lg-input" placeholder="ivan@example.com" autocomplete="email" required></div><div class="lg-error-text" id="reg-email-error"></div></div>',
            '            <div class="lg-field"><label for="reg-password">Пароль</label><div class="lg-input-wrap"><input type="password" id="reg-password" class="lg-input" placeholder="Минимум 6 символов" autocomplete="new-password" required><button type="button" class="lg-eye-btn" data-target="reg-password">👁️</button></div><div class="lg-error-text" id="reg-password-error"></div></div>',
            '            <div class="lg-field"><label for="reg-password2">Подтвердите пароль</label><div class="lg-input-wrap"><input type="password" id="reg-password2" class="lg-input" placeholder="Повторите" autocomplete="new-password" required><button type="button" class="lg-eye-btn" data-target="reg-password2">👁️</button></div><div class="lg-error-text" id="reg-password2-error"></div></div>',
            '            <button type="submit" class="lg-btn lg-btn-primary" id="btn-register"><span class="lg-spinner"></span><span class="lg-btn-text">Создать аккаунт</span></button>',
            '            <div class="lg-extra" style="justify-content:center;"><span style="color:#888;">Уже есть аккаунт?</span><button type="button" class="lg-link" id="switch-to-login">Войти</button></div>',
            '        </form>',
            '    </div>',
            '</div>'
        ].join('');

        // Сброс ссылок на элементы
        statusEl = document.getElementById('lg-status');
        debugEl = document.getElementById('lg-debug');

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
                var target = document.getElementById(btn.dataset.target);
                if (!target) return;
                if (target.type === 'password') { target.type = 'text'; btn.textContent = '🙈'; }
                else { target.type = 'password'; btn.textContent = '👁️'; }
            };
        });

        document.getElementById('forgot-password').onclick = async function() {
            var email = document.getElementById('login-email').value.trim();
            if (!email) { showToast('Введите email', 'error'); return; }
            var client = getClient();
            if (!client) return;
            showToast('Отправка...', 'info');
            try {
                var res = await withTimeout(client.auth.resetPasswordForEmail(email), 8000, { error: { message: 'timeout' } });
                if (res.error) showToast('Ошибка: ' + res.error.message, 'error');
                else showToast('📧 Проверьте почту!', 'success');
            } catch(e) { showToast('Ошибка', 'error'); }
        };

        document.getElementById('form-login').addEventListener('submit', handleLogin);
        document.getElementById('form-register').addEventListener('submit', handleRegister);
    }

    // ============================================================
    // ВХОД — с ПОЛНОЙ диагностикой
    // ============================================================
    async function handleLogin(e) {
        e.preventDefault();
        debugLines = [];
        log('══════ НАЖАТА КНОПКА ВОЙТИ ══════');

        var email = document.getElementById('login-email').value.trim();
        var password = document.getElementById('login-password').value;
        var btn = document.getElementById('btn-login');

        log('Email: ' + email);
        log('Пароль: ' + (password ? 'есть, длина ' + password.length : 'ПУСТОЙ'));

        if (!email) { log('❌ Email пустой'); return; }
        if (!password) { log('❌ Пароль пустой'); return; }

        // Проверка localStorage
        log('Проверка localStorage...');
        try {
            localStorage.setItem('__test_login', '1');
            localStorage.removeItem('__test_login');
            log('✅ localStorage работает');
        } catch (ex) {
            log('❌ localStorage ЗАБЛОКИРОВАН: ' + ex.message);
            log('⚠️ Это может быть приватный режим Safari!');
            showToast('Браузер блокирует хранилище. Выйдите из режима инкогнито.', 'error');
            return;
        }

        // Проверка интернета
        log('Проверка соединения с Supabase...');
        try {
            var pingRes = await withTimeout(
                fetch(SUPABASE_URL + '/auth/v1/health', { method: 'GET' }),
                4000,
                { _timeout: true, ok: false }
            );
            if (pingRes._timeout) {
                log('❌ Supabase НЕ ОТВЕЧАЕТ за 4 сек');
                showToast('Нет связи с сервером', 'error');
                return;
            }
            log('✅ Supabase доступен (ok=' + pingRes.ok + ')');
        } catch (ex) {
            log('❌ Ошибка fetch: ' + ex.message);
            showToast('Ошибка сети: ' + ex.message, 'error');
            return;
        }

        // Клиент
        log('Получение клиента...');
        var client = getClient();
        if (!client) { log('❌ Клиент не получен'); return; }
        log('✅ Клиент готов');

        // Кнопка loading
        btn.classList.add('loading');
        btn.disabled = true;

        try {
            log('📡 Вызов signInWithPassword...');
            log('⏱️ Таймаут: 10 сек');

            var result = await withTimeout(
                client.auth.signInWithPassword({ email: email, password: password }),
                10000,
                { error: { message: 'Превышено время ожидания (10 сек)' }, _timeout: true }
            );

            log('📥 Ответ получен');
            log('Timeout: ' + (result._timeout ? 'ДА' : 'нет'));
            log('Error: ' + (result.error ? result.error.message : 'нет'));
            log('User: ' + (result.data && result.data.user ? result.data.user.email : 'нет'));

            if (result._timeout) {
                btn.classList.remove('loading');
                btn.disabled = false;
                showToast('Сервер не отвечает. Проверьте интернет.', 'error');
                return;
            }

            if (result.error) {
                btn.classList.remove('loading');
                btn.disabled = false;
                var msg = result.error.message || '';
                if (msg.indexOf('Invalid login credentials') !== -1) {
                    showToast('Неверный email или пароль', 'error');
                } else if (msg.indexOf('Email not confirmed') !== -1) {
                    showToast('Email не подтверждён', 'error');
                } else {
                    showToast(msg, 'error');
                }
                return;
            }

            // УСПЕХ
            log('🎉 УСПЕХ! Переход в профиль...');
            showToast('Добро пожаловать!', 'success');
            showSuccess(result.data.user.email, '/profile/');

        } catch (err) {
            log('❌ EXCEPTION: ' + err.message);
            log('Stack: ' + (err.stack || '').substring(0, 200));
            btn.classList.remove('loading');
            btn.disabled = false;
            showToast('Ошибка: ' + err.message, 'error');
        }
    }

    // ============================================================
    // РЕГИСТРАЦИЯ
    // ============================================================
    async function handleRegister(e) {
        e.preventDefault();
        debugLines = [];
        log('══════ РЕГИСТРАЦИЯ ══════');

        var email = document.getElementById('reg-email').value.trim();
        var password = document.getElementById('reg-password').value;
        var password2 = document.getElementById('reg-password2').value;
        var btn = document.getElementById('btn-register');

        if (!email || password.length < 6) { log('❌ Проверьте поля'); return; }
        if (password !== password2) { log('❌ Пароли не совпадают'); return; }

        var client = getClient();
        if (!client) return;

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            log('📡 Вызов signUp...');
            var result = await withTimeout(
                client.auth.signUp({
                    email: email, password: password,
                    options: { emailRedirectTo: window.location.origin + '/mars-encyclopedia/profile/' }
                }),
                10000,
                { error: { message: 'Превышено время' }, _timeout: true }
            );

            log('📥 Ответ: timeout=' + (result._timeout ? 'да' : 'нет'));

            if (result._timeout) {
                btn.classList.remove('loading');
                btn.disabled = false;
                showToast('Сервер не отвечает', 'error');
                return;
            }

            if (result.error) {
                btn.classList.remove('loading');
                btn.disabled = false;
                showToast(result.error.message, 'error');
                return;
            }

            log('🎉 Регистрация успешна');
            showToast('Аккаунт создан!', 'success');
            setTimeout(function() { showSuccess(email, '/profile/'); }, 800);

        } catch (err) {
            log('❌ ' + err.message);
            btn.classList.remove('loading');
            btn.disabled = false;
            showToast('Ошибка: ' + err.message, 'error');
        }
    }

    // ============================================================
    // СТАРТ
    // ============================================================
    render();

    // Ссылки на элементы диагностики
    statusEl = document.getElementById('lg-status');
    debugEl = document.getElementById('lg-debug');

    // Показываем диагностический блок всегда — чтобы видеть всё
    log('══════ ИНИЦИАЛИЗАЦИЯ ══════');
    log('URL: ' + window.location.href);
    log('UserAgent: ' + navigator.userAgent.substring(0, 100));
    log('localStorage: ' + (function() {
        try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); return 'доступен'; }
        catch(e) { return 'ЗАБЛОКИРОВАН: ' + e.message; }
    })());
    log('Cookies: ' + (navigator.cookieEnabled ? 'включены' : 'ВЫКЛЮЧЕНЫ'));
    log('Supabase: ' + (typeof supabase !== 'undefined' ? 'загружен' : 'НЕ ЗАГРУЖЕН'));

    if (debugEl) debugEl.style.display = 'block';

})();
</script>
