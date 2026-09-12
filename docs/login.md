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
@keyframes lgCheckmark {
    0% { stroke-dashoffset: 50; }
    100% { stroke-dashoffset: 0; }
}
@keyframes lgCircle {
    0% { stroke-dashoffset: 166; }
    100% { stroke-dashoffset: 0; }
}
@keyframes lgSuccessPop {
    0% { opacity: 0; transform: scale(0.5); }
    50% { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
}

.lg-fade { animation: lgFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#login-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   ОСНОВНОЙ КОНТЕЙНЕР
   ============================================================ */
.lg-container {
    max-width: 440px;
    margin: 0 auto;
    position: relative;
}

/* ============================================================
   HERO
   ============================================================ */
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
    width: 90px;
    height: 90px;
    margin: 0 auto 16px auto;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #e74c3c 0%, #c0392b 40%, #7f1d1d 80%, #4a1010 100%);
    box-shadow:
        inset -8px -8px 24px rgba(0,0,0,0.6),
        inset 6px 6px 18px rgba(255,150,100,0.15),
        0 0 40px 8px rgba(231,76,60,0.4),
        0 0 80px 20px rgba(231,76,60,0.2);
    animation: lgPulse 3s ease-in-out infinite;
    position: relative;
    overflow: hidden;
}

.lg-logo::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse 12px 6px at 25% 35%, rgba(180,80,60,0.6), transparent),
        radial-gradient(ellipse 16px 10px at 65% 50%, rgba(180,80,60,0.5), transparent),
        radial-gradient(ellipse 8px 5px at 40% 70%, rgba(180,80,60,0.5), transparent);
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

.lg-hero-sub {
    font-size: 0.88rem;
    opacity: 0.75;
    margin: 0;
    letter-spacing: 0.3px;
}

/* ============================================================
   ВКЛАДКИ
   ============================================================ */
.lg-tabs {
    display: flex;
    background: #fff;
    border-bottom: 1px solid var(--border);
    padding: 0;
    position: relative;
}

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

.lg-tab.active {
    color: var(--primary);
}

.lg-tab.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    right: 20%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-light));
    border-radius: 3px 3px 0 0;
    animation: lgFadeIn 0.3s ease;
}

/* ============================================================
   КАРТОЧКА ФОРМЫ
   ============================================================ */
.lg-card {
    background: #fff;
    padding: 32px 32px 24px 32px;
    border-radius: 0 0 24px 24px;
    box-shadow: 0 20px 60px -12px rgba(0,0,0,0.15);
}

.lg-form { animation: lgFadeIn 0.4s ease; }
.lg-form.hidden { display: none; }

.lg-field {
    margin-bottom: 18px;
    position: relative;
}

.lg-field label {
    display: block;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 8px;
    letter-spacing: 0.2px;
}

.lg-input-wrap {
    position: relative;
}

.lg-input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.1rem;
    pointer-events: none;
    opacity: 0.5;
}

.lg-input {
    width: 100%;
    padding: 14px 44px 14px 44px;
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

.lg-input:focus {
    border-color: var(--primary);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.1);
}

.lg-input.error {
    border-color: var(--error);
    animation: lgShake 0.4s ease;
    background: #fff5f5;
}

.lg-input.success {
    border-color: var(--success);
    background: #f0fdf4;
}

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

.lg-eye-btn:hover {
    background: rgba(0,0,0,0.05);
    opacity: 1;
}

.lg-error-text {
    font-size: 0.78rem;
    color: var(--error);
    margin-top: 6px;
    padding-left: 4px;
    display: none;
}

.lg-error-text.show { display: block; animation: lgFadeIn 0.3s ease; }

/* ============================================================
   КНОПКИ
   ============================================================ */
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

.lg-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px -4px rgba(108, 99, 255, 0.5);
}

.lg-btn-primary:active:not(:disabled) {
    transform: translateY(0);
}

.lg-btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.lg-btn-primary::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s;
}

.lg-btn-primary:hover::before { left: 100%; }

.lg-btn-ghost {
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
    box-shadow: none;
}

.lg-btn-ghost:hover {
    background: var(--primary);
    color: #fff;
}

/* Спиннер в кнопке */
.lg-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: lgSpin 0.6s linear infinite;
    display: none;
}

.lg-btn.loading .lg-spinner { display: inline-block; }
.lg-btn.loading .lg-btn-text { opacity: 0.7; }

/* ============================================================
   ДОПОЛНИТЕЛЬНЫЕ ССЫЛКИ
   ============================================================ */
.lg-extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    font-size: 0.82rem;
    flex-wrap: wrap;
    gap: 8px;
}

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

.lg-link:hover {
    opacity: 0.7;
    text-decoration: underline !important;
}

.lg-checkbox-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--text-muted);
    cursor: pointer;
    user-select: none;
}

.lg-checkbox {
    width: 18px;
    height: 18px;
    accent-color: var(--primary);
    cursor: pointer;
}

/* ============================================================
   РАЗДЕЛИТЕЛЬ
   ============================================================ */
.lg-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
    color: var(--text-muted);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.lg-divider::before,
.lg-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
}

/* ============================================================
   СОЦИАЛЬНЫЕ КНОПКИ
   ============================================================ */
.lg-social {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
}

.lg-social-btn {
    flex: 1;
    padding: 12px;
    border-radius: 12px;
    border: 2px solid var(--border);
    background: #fff;
    font-family: inherit;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.lg-social-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(108,99,255,0.15);
}

/* ============================================================
   QR-ССЫЛКА
   ============================================================ */
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

/* ============================================================
   СТРАНИЦА УСПЕХА
   ============================================================ */
.lg-success-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lgFadeIn 0.3s ease;
}

.lg-success-content {
    text-align: center;
    color: #fff;
    animation: lgSuccessPop 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.lg-success-svg {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px auto;
}

.lg-success-circle {
    stroke: #fff;
    stroke-width: 4;
    fill: none;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: lgCircle 0.8s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.lg-success-check {
    stroke: #fff;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    animation: lgCheckmark 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

.lg-success-title {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 6px 0;
    letter-spacing: -0.5px;
}

.lg-success-sub {
    font-size: 0.95rem;
    opacity: 0.9;
    margin: 0;
}

/* ============================================================
   ТОСТЫ
   ============================================================ */
.lg-toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    padding: 14px 28px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: 0 12px 32px rgba(0,0,0,0.25);
    z-index: 999999;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 90vw;
    color: #fff;
}

.lg-toast.show { transform: translateX(-50%) translateY(0); }

.lg-toast.success { background: linear-gradient(135deg, #27ae60, #16a085); }
.lg-toast.error { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.lg-toast.info { background: linear-gradient(135deg, #3498db, #2980b9); }

/* ============================================================
   АДАПТИВ
   ============================================================ */
@media (max-width: 500px) {
    .lg-hero { padding: 32px 24px 24px 24px; border-radius: 20px 20px 0 0; }
    .lg-logo { width: 70px; height: 70px; }
    .lg-hero-title { font-size: 1.3rem; }
    .lg-hero-sub { font-size: 0.82rem; }
    .lg-card { padding: 24px 20px 20px 20px; border-radius: 0 0 20px 20px; }
    .lg-tab { padding: 14px 8px; font-size: 0.85rem; }
    .lg-input { padding: 12px 40px 12px 40px; font-size: 0.92rem; }
    .lg-btn { padding: 14px 18px; font-size: 0.92rem; }
    .lg-input-icon { font-size: 1rem; left: 14px; }
    .lg-eye-btn { right: 10px; font-size: 1rem; }
}

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .lg-card { background: #1a1a2e; }
    .lg-tabs { background: #1a1a2e; border-color: #2a2a3a; }
    .lg-tab { color: #888; }
    .lg-tab:hover { color: #d4d4e8; }
    .lg-field label { color: #d4d4e8; }
    .lg-input { background: rgba(255,255,255,0.04); border-color: #2a2a3a; color: #e0e0e0; }
    .lg-input:focus { background: rgba(255,255,255,0.08); }
    .lg-eye-btn { color: #d4d4e8; }
    .lg-social-btn { background: #1a1a2e; border-color: #2a2a3a; color: #d4d4e8; }
    .lg-checkbox-wrap { color: #888; }
    .lg-qr-hint { background: rgba(39, 174, 96, 0.1); color: #4ade80; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const container = document.getElementById('login-app');

    // ============================================================
    // Проверка: если уже залогинен — редирект в профиль
    // ============================================================
    function checkAlreadyLoggedIn(callback) {
        let attempts = 0;
        const check = setInterval(async () => {
            attempts++;
            let client = window.supabaseClient;
            if (!client && typeof supabase !== 'undefined') {
                client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            }
            if (!client) {
                if (attempts > 30) { clearInterval(check); callback(null); }
                return;
            }

            try {
                const { data } = await client.auth.getSession();
                clearInterval(check);
                callback(data?.session?.user || null);
            } catch (e) {
                clearInterval(check);
                callback(null);
            }
        }, 200);
    }

    // ============================================================
    // Тосты
    // ============================================================
    function showToast(msg, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `lg-toast ${type}`;
        const icons = { success: '✅', error: '⚠️', info: 'ℹ️' };
        toast.innerHTML = `<span>${icons[type] || ''}</span><span>${msg}</span>`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 2600);
    }

    // ============================================================
    // Экранирование
    // ============================================================
    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }

    // ============================================================
    // Экран успеха
    // ============================================================
    function showSuccess(email, redirectUrl) {
        const overlay = document.createElement('div');
        overlay.className = 'lg-success-overlay';
        overlay.innerHTML = `
            <div class="lg-success-content">
                <svg class="lg-success-svg" viewBox="0 0 100 100">
                    <circle class="lg-success-circle" cx="50" cy="50" r="26"/>
                    <path class="lg-success-check" d="M 32 52 L 45 65 L 70 38"/>
                </svg>
                <h2 class="lg-success-title">Добро пожаловать!</h2>
                <p class="lg-success-sub">Переход в профиль...</p>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => {
            window.location.href = redirectUrl || '/profile/';
        }, 1400);
    }

    // ============================================================
    // РЕНДЕР СТРАНИЦЫ
    // ============================================================
    function render() {
        const params = new URLSearchParams(window.location.search);
        const emailFromUrl = params.get('email') || '';
        const redirectUrl = params.get('redirect') || '/profile/';

        container.innerHTML = `
            <div class="lg-container">
                <!-- HERO -->
                <div class="lg-hero">
                    <div class="lg-hero-content">
                        <div class="lg-logo"></div>
                        <h1 class="lg-hero-title">Марсианская энциклопедия</h1>
                        <p class="lg-hero-sub">Lān sur · Глина помнит</p>
                    </div>
                </div>

                <!-- ВКЛАДКИ -->
                <div class="lg-tabs">
                    <button class="lg-tab active" data-tab="login">🔐 Вход</button>
                    <button class="lg-tab" data-tab="register">✨ Регистрация</button>
                </div>

                <!-- КАРТОЧКА -->
                <div class="lg-card">
                    ${emailFromUrl ? `
                        <div class="lg-qr-hint">
                            <span class="lg-qr-hint-icon">📱</span>
                            <div class="lg-qr-hint-text">
                                Email <strong>${escapeHtml(emailFromUrl)}</strong> подставлен автоматически. Введите пароль.
                            </div>
                        </div>
                    ` : ''}

                    <!-- ФОРМА ВХОДА -->
                    <form class="lg-form" id="form-login" autocomplete="on">
                        <div class="lg-field">
                            <label for="login-email">Email</label>
                            <div class="lg-input-wrap">
                                <input
                                    type="email"
                                    id="login-email"
                                    class="lg-input"
                                    placeholder="ivan@example.com"
                                    value="${escapeHtml(emailFromUrl)}"
                                    autocomplete="email"
                                    required
                                >
                            </div>
                            <div class="lg-error-text" id="login-email-error"></div>
                        </div>

                        <div class="lg-field">
                            <label for="login-password">Пароль</label>
                            <div class="lg-input-wrap">
                                <input
                                    type="password"
                                    id="login-password"
                                    class="lg-input"
                                    placeholder="Введите пароль"
                                    autocomplete="current-password"
                                    required
                                >
                                <button type="button" class="lg-eye-btn" data-target="login-password">👁️</button>
                            </div>
                            <div class="lg-error-text" id="login-password-error"></div>
                        </div>

                        <button type="submit" class="lg-btn lg-btn-primary" id="btn-login">
                            <span class="lg-spinner"></span>
                            <span class="lg-btn-text">Войти</span>
                        </button>

                        <div class="lg-extra">
                            <label class="lg-checkbox-wrap">
                                <input type="checkbox" class="lg-checkbox" id="remember-me" checked>
                                Запомнить меня
                            </label>
                            <button type="button" class="lg-link" id="forgot-password">Забыли пароль?</button>
                        </div>
                    </form>

                    <!-- ФОРМА РЕГИСТРАЦИИ -->
                    <form class="lg-form hidden" id="form-register" autocomplete="on">
                        <div class="lg-field">
                            <label for="reg-email">Email</label>
                            <div class="lg-input-wrap">
                                <input
                                    type="email"
                                    id="reg-email"
                                    class="lg-input"
                                    placeholder="ivan@example.com"
                                    autocomplete="email"
                                    required
                                >
                            </div>
                            <div class="lg-error-text" id="reg-email-error"></div>
                        </div>

                        <div class="lg-field">
                            <label for="reg-password">Пароль</label>
                            <div class="lg-input-wrap">
                                <input
                                    type="password"
                                    id="reg-password"
                                    class="lg-input"
                                    placeholder="Минимум 6 символов"
                                    autocomplete="new-password"
                                    required
                                >
                                <button type="button" class="lg-eye-btn" data-target="reg-password">👁️</button>
                            </div>
                            <div class="lg-error-text" id="reg-password-error"></div>
                        </div>

                        <div class="lg-field">
                            <label for="reg-password2">Подтвердите пароль</label>
                            <div class="lg-input-wrap">
                                <input
                                    type="password"
                                    id="reg-password2"
                                    class="lg-input"
                                    placeholder="Повторите пароль"
                                    autocomplete="new-password"
                                    required
                                >
                                <button type="button" class="lg-eye-btn" data-target="reg-password2">👁️</button>
                            </div>
                            <div class="lg-error-text" id="reg-password2-error"></div>
                        </div>

                        <button type="submit" class="lg-btn lg-btn-primary" id="btn-register">
                            <span class="lg-spinner"></span>
                            <span class="lg-btn-text">Создать аккаунт</span>
                        </button>

                        <div class="lg-extra" style="justify-content:center;">
                            <span style="color:#888;">Уже есть аккаунт?</span>
                            <button type="button" class="lg-link" id="switch-to-login">Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Автофокус на пароль, если email заполнен из QR
        if (emailFromUrl) {
            setTimeout(() => {
                document.getElementById('login-password')?.focus();
            }, 300);
        }

        // Обработчики вкладок
        document.querySelectorAll('.lg-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.lg-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const isLogin = tab.dataset.tab === 'login';
                document.getElementById('form-login').classList.toggle('hidden', !isLogin);
                document.getElementById('form-register').classList.toggle('hidden', isLogin);
            };
        });

        document.getElementById('switch-to-login')?.addEventListener('click', () => {
            document.querySelector('.lg-tab[data-tab="login"]').click();
        });

        // Показ пароля
        document.querySelectorAll('.lg-eye-btn').forEach(btn => {
            btn.onclick = () => {
                const target = document.getElementById(btn.dataset.target);
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

        // Забыли пароль
        document.getElementById('forgot-password')?.addEventListener('click', async () => {
            const email = document.getElementById('login-email').value.trim();
            if (!email) {
                showToast('Введите email', 'error');
                return;
            }
            const client = getClient();
            if (!client) return;
            showToast('Отправка...', 'info');
            const { error } = await client.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/mars-encyclopedia/profile/'
            });
            if (error) showToast('Ошибка: ' + error.message, 'error');
            else showToast('📧 Проверьте почту!', 'success');
        });

        // Обработчики форм
        document.getElementById('form-login').addEventListener('submit', handleLogin);
        document.getElementById('form-register').addEventListener('submit', handleRegister);
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
    // Ошибки в полях
    // ============================================================
    function setFieldError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const errorEl = document.getElementById(errorId);
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
        const form = document.getElementById(formId);
        if (!form) return;
        form.querySelectorAll('.lg-input').forEach(inp => {
            inp.classList.remove('error', 'success');
        });
        form.querySelectorAll('.lg-error-text').forEach(el => {
            el.classList.remove('show');
        });
    }

    // ============================================================
    // Вход
    // ============================================================
    async function handleLogin(e) {
        e.preventDefault();
        clearAllErrors('form-login');

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const btn = document.getElementById('btn-login');

        // Валидация
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFieldError('login-email', 'login-email-error', 'Введите корректный email');
            return;
        }
        if (!password) {
            setFieldError('login-password', 'login-password-error', 'Введите пароль');
            return;
        }

        const client = getClient();
        if (!client) return;

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            const { data, error } = await client.auth.signInWithPassword({ email, password });

            if (error) {
                btn.classList.remove('loading');
                btn.disabled = false;

                // Красивые сообщения для частых ошибок
                if (error.message.includes('Invalid login credentials')) {
                    showToast('Неверный email или пароль', 'error');
                    setFieldError('login-password', 'login-password-error', 'Проверьте пароль');
                } else if (error.message.includes('Email not confirmed')) {
                    showToast('Email не подтверждён', 'error');
                } else {
                    showToast(error.message, 'error');
                }
                return;
            }

            // ✅ Вход выполнен
            console.log('✅ Вход выполнен:', data.user?.email);
            const userId = data.user?.id;
            const userEmail = data.user?.email;
            const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/profile/';

            // 🔐 Проверка Email-2FA
            if (userId) {
                try {
                    const { data: twofa } = await client.from('user_2fa')
                        .select('email_2fa_enabled').eq('user_id', userId).maybeSingle();

                    if (twofa?.email_2fa_enabled) {
                        const deviceId = getDeviceId();
                        const { data: trusted } = await client.from('trusted_devices')
                            .select('id').eq('user_id', userId).eq('device_id', deviceId).maybeSingle();

                        if (!trusted) {
                            // Новое устройство — показываем форму ввода кода
                            const ok = await show2FAForm(userId, userEmail, deviceId);
                            if (!ok) return;
                        }
                    }
                } catch (e) {
                    console.warn('Ошибка 2FA:', e);
                }
            }

            showToast('Добро пожаловать!', 'success');
            showSuccess(userEmail, redirectUrl);
        } catch (err) {
            btn.classList.remove('loading');
            btn.disabled = false;
            showToast('Ошибка сети: ' + err.message, 'error');
            console.error(err);
        }
    }

    // ============================================================
    // Регистрация
    // ============================================================
    async function handleRegister(e) {
        e.preventDefault();
        clearAllErrors('form-register');

        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const password2 = document.getElementById('reg-password2').value;
        const btn = document.getElementById('btn-register');

        // Валидация
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

        const client = getClient();
        if (!client) return;

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            const { data, error } = await client.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: window.location.origin + '/mars-encyclopedia/profile/'
                }
            });

            if (error) {
                btn.classList.remove('loading');
                btn.disabled = false;

                if (error.message.includes('already registered')) {
                    showToast('Этот email уже зарегистрирован', 'error');
                    setFieldError('reg-email', 'reg-email-error', 'Уже используется');
                } else {
                    showToast(error.message, 'error');
                }
                return;
            }

            // Создаём профиль
            if (data.user) {
                try {
                    await client.from('profiles').insert([{
                        user_id: data.user.id,
                        username: email.split('@')[0],
                        display_name: email.split('@')[0]
                    }]);
                } catch (e) {
                    console.warn('Профиль уже существует или ошибка:', e);
                }
            }

            // Успех
            showToast('Аккаунт создан! Проверьте почту', 'success');
            setTimeout(() => {
                showSuccess(email, '/profile/');
            }, 1000);

        } catch (err) {
            btn.classList.remove('loading');
            btn.disabled = false;
            showToast('Ошибка: ' + err.message, 'error');
            console.error(err);
        }
    }

    // ============================================================
    // Запуск
    // ============================================================
    checkAlreadyLoggedIn((user) => {
        if (user) {
            // Уже залогинен — предложим перейти
            console.log('👤 Пользователь уже залогинен:', user.email);
            container.innerHTML = `
                <div class="lg-container">
                    <div class="lg-card" style="text-align:center;padding:60px 30px;">
                        <div style="font-size:4rem;margin-bottom:16px;">✅</div>
                        <h2 style="margin:0 0 8px 0;color:#1a1a2e;font-size:1.4rem;">Вы уже вошли</h2>
                        <p style="color:#888;margin:0 0 24px 0;font-size:0.95rem;">${escapeHtml(user.email)}</p>
                        <a href="/profile/" class="lg-btn lg-btn-primary" style="text-decoration:none;display:inline-flex;">👤 В профиль</a>
                    </div>
                </div>
            `;
            // Добавим кнопку "Выйти и войти другим"
            const btn = document.createElement('button');
            btn.className = 'lg-link';
            btn.textContent = 'Войти под другим аккаунтом';
            btn.style.cssText = 'margin-top:16px;display:block;width:100%;';
            btn.onclick = async () => {
                const client = getClient();
                if (client) {
                    await client.auth.signOut();
                    localStorage.removeItem('mars-auth-token');
                    window.location.reload();
                }
            };
            container.querySelector('.lg-card').appendChild(btn);
            return;
        }

        render();
    });

    // ============================================================
    // EMAIL-2FA — помощники
    // ============================================================
    function getDeviceId() {
        let did = localStorage.getItem('mars_device_id');
        if (!did) {
            did = 'dev_' + Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
            localStorage.setItem('mars_device_id', did);
        }
        return did;
    }

    function getDeviceName() {
        const ua = navigator.userAgent;
        if (/Android/i.test(ua)) return 'Android-устройство';
        if (/iPhone|iPad|iPod/i.test(ua)) return 'iPhone / iPad';
        if (/Windows/i.test(ua)) return 'Windows ПК';
        if (/Mac/i.test(ua)) return 'Mac';
        if (/Linux/i.test(ua)) return 'Linux';
        return 'Неизвестное устройство';
    }

    function generate6Code() {
        return String(Math.floor(100000 + Math.random() * 900000));
    }

    async function show2FAForm(userId, email, deviceId) {
        return new Promise(async (resolve) => {
            const code = generate6Code();

            try {
                const res = await fetch('https://ncytbgbzfjfoqmmgfygz.supabase.co/functions/v1/send-2fa-code', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: userId, email, code, device_id: deviceId })
                });
                if (!res.ok) {
                    const err = await res.json();
                    alert('Не удалось отправить код: ' + (err.error || 'ошибка'));
                    resolve(false);
                    return;
                }
            } catch (e) {
                alert('Ошибка отправки кода: ' + e.message);
                resolve(false);
                return;
            }

            const overlay = document.createElement('div');
            overlay.style.cssText = `position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;`;
            overlay.innerHTML = `
                <div style="background:#fff;max-width:420px;width:100%;padding:32px 28px;border-radius:24px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.5);">
                    <div style="font-size:3rem;margin-bottom:8px;">📧</div>
                    <h2 style="margin:0 0 8px 0;color:#1a1a2e;font-size:1.4rem;font-weight:800;">Проверьте почту</h2>
                    <p style="color:#888;font-size:.9rem;margin:0 0 20px 0;line-height:1.5;">
                        Код из 6 цифр отправлен на<br><b style="color:#6C63FF;">${email}</b>
                    </p>

                    <input type="text" id="2fa-code-input" placeholder="000000" maxlength="6" inputmode="numeric"
                        style="width:100%;padding:18px;border:2px solid rgba(0,0,0,.1);border-radius:12px;font-size:2rem;text-align:center;letter-spacing:12px;font-family:'Courier New',monospace;font-weight:700;margin-bottom:12px;box-sizing:border-box;outline:none;">

                    <button id="2fa-verify-btn" style="width:100%;padding:16px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:800;cursor:pointer;font-family:inherit;margin-bottom:10px;">
                        ✅ Подтвердить
                    </button>

                    <label style="display:flex;align-items:center;gap:8px;font-size:.85rem;color:#666;justify-content:center;cursor:pointer;margin-bottom:12px;">
                        <input type="checkbox" id="2fa-trust-device" checked style="width:18px;height:18px;accent-color:#6C63FF;">
                        Доверять этому устройству
                    </label>

                    <div style="display:flex;gap:8px;justify-content:center;">
                        <button id="2fa-resend-btn" style="padding:8px 16px;background:transparent;color:#6C63FF;border:2px solid #6C63FF;border-radius:20px;font-size:.82rem;font-weight:600;cursor:pointer;font-family:inherit;">📧 Отправить снова</button>
                        <button id="2fa-cancel-btn" style="padding:8px 16px;background:transparent;color:#888;border:2px solid #eee;border-radius:20px;font-size:.82rem;font-weight:600;cursor:pointer;font-family:inherit;">Отмена</button>
                    </div>

                    <p id="2fa-status" style="font-size:.82rem;color:#888;margin-top:16px;"></p>
                </div>
            `;
            document.body.appendChild(overlay);

            const input = overlay.querySelector('#2fa-code-input');
            const statusEl = overlay.querySelector('#2fa-status');
            const trustCb = overlay.querySelector('#2fa-trust-device');

            setTimeout(() => input.focus(), 200);

            const verify = async () => {
                const entered = input.value.trim();
                if (entered.length !== 6) {
                    statusEl.textContent = '⚠️ Введите 6 цифр';
                    statusEl.style.color = '#e67e22';
                    return;
                }

                statusEl.textContent = '⏳ Проверка...';

                const client = window.supabaseClient;
                const { data: stored } = await client.from('email_2fa_codes')
                    .select('*').eq('user_id', userId).eq('code', entered).maybeSingle();

                if (!stored) {
                    statusEl.textContent = '❌ Неверный код';
                    statusEl.style.color = '#e74c3c';
                    input.value = '';
                    input.focus();
                    return;
                }

                if (new Date(stored.expires_at) < new Date()) {
                    statusEl.textContent = '⏰ Код истёк';
                    statusEl.style.color = '#e74c3c';
                    return;
                }

                statusEl.textContent = '✅ Готово!';
                statusEl.style.color = '#27ae60';

                if (trustCb.checked) {
                    try {
                        await client.from('trusted_devices').upsert({
                            user_id: userId, device_id: deviceId,
                            device_name: getDeviceName(),
                            last_used: new Date().toISOString()
                        }, { onConflict: 'user_id,device_id' });
                    } catch(e) {}
                }

                try {
                    await client.from('email_2fa_codes').delete().eq('id', stored.id);
                } catch(e) {}

                setTimeout(() => { overlay.remove(); resolve(true); }, 600);
            };

            overlay.querySelector('#2fa-verify-btn').onclick = verify;
            input.addEventListener('keypress', e => { if (e.key === 'Enter') verify(); });
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '').slice(0, 6);
            });

            overlay.querySelector('#2fa-resend-btn').onclick = async () => {
                const newCode = generate6Code();
                try {
                    await fetch('https://ncytbgbzfjfoqmmgfygz.supabase.co/functions/v1/send-2fa-code', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: userId, email, code: newCode, device_id: deviceId })
                    });
                    statusEl.textContent = '📧 Новый код отправлен';
                    statusEl.style.color = '#27ae60';
                    input.value = '';
                    input.focus();
                } catch(e) {
                    statusEl.textContent = '❌ Не удалось';
                }
            };

            overlay.querySelector('#2fa-cancel-btn').onclick = async () => {
                const client = window.supabaseClient;
                if (client) await client.auth.signOut();
                overlay.remove();
                resolve(false);
            };
        });
    }
    
})();
</script>
