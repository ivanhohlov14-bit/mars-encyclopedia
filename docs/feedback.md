---
title: Обратная связь
comments: false
---

<div id="fb-app">
    <div class="fb-loading">
        <div class="fb-spinner"></div>
        <p>Загрузка формы...</p>
    </div>
</div>

<style>
/* ═══════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════ */
:root {
    --fb-k: #6C63FF;
    --fb-k-light: #A29BFE;
    --fb-k-bg: #F0F4FF;
    --fb-k-shadow: rgba(108, 99, 255, 0.25);
}

#fb-app {
    max-width: 960px;
    margin: 0 auto;
    font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
    padding: 0 8px 60px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
}
#fb-app a { text-decoration: none !important; border-bottom: none !important; }

/* ═══════════════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════════════ */
@keyframes fbSpin { to { transform: rotate(360deg); } }
@keyframes fbFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fbFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes fbPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes fbShine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
@keyframes fbStar { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
@keyframes fbRing { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }
@keyframes fbGlow { 0%, 100% { box-shadow: 0 0 40px rgba(108, 99, 255, 0.3); } 50% { box-shadow: 0 0 80px rgba(108, 99, 255, 0.5); } }
@keyframes fbSlideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes fbRiseUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

.fb-fade { animation: fbFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

/* ═══════════════════════════════════════════════════════════
   LOADING
   ═══════════════════════════════════════════════════════════ */
.fb-loading {
    text-align: center;
    padding: 80px 20px;
}
.fb-spinner {
    display: inline-block;
    width: 52px;
    height: 52px;
    border: 4px solid var(--fb-k-shadow);
    border-top-color: var(--fb-k);
    border-radius: 50%;
    animation: fbSpin 0.8s linear infinite;
}
.fb-loading p {
    color: #999;
    margin-top: 16px;
    font-size: 0.9rem;
    font-weight: 700;
}

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
.fb-hero {
    position: relative;
    background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 40%, #2d1b3d 70%, #0f3460 100%);
    border-radius: 24px;
    padding: 48px 32px 44px;
    color: #fff;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow: 0 24px 80px -16px rgba(0, 0, 0, 0.6),
                0 0 80px rgba(108, 99, 255, 0.15) inset;
    text-align: center;
}
.fb-hero-stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}
.fb-star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 6px #fff;
    animation: fbStar 3s ease-in-out infinite;
}
.fb-star:nth-child(1) { top: 15%; left: 8%; animation-delay: 0s; }
.fb-star:nth-child(2) { top: 25%; left: 22%; animation-delay: 0.5s; width: 1.5px; height: 1.5px; }
.fb-star:nth-child(3) { top: 60%; left: 15%; animation-delay: 1s; }
.fb-star:nth-child(4) { top: 35%; left: 78%; animation-delay: 1.5s; }
.fb-star:nth-child(5) { top: 80%; left: 88%; animation-delay: 0.7s; width: 1.5px; height: 1.5px; }
.fb-star:nth-child(6) { top: 22%; left: 60%; animation-delay: 1.2s; }
.fb-star:nth-child(7) { top: 55%; left: 45%; animation-delay: 0.3s; }
.fb-star:nth-child(8) { top: 45%; left: 92%; animation-delay: 1.7s; width: 1.5px; height: 1.5px; }
.fb-star:nth-child(9) { top: 70%; left: 30%; animation-delay: 2.1s; }
.fb-star:nth-child(10) { top: 12%; left: 88%; animation-delay: 0.9s; }

.fb-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(162, 155, 254, 0.25), transparent 70%);
    animation: fbFloat 10s ease-in-out infinite;
    pointer-events: none;
}
.fb-hero::after {
    content: '';
    position: absolute;
    bottom: -40%;
    left: -15%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(243, 156, 18, 0.15), transparent 70%);
    animation: fbFloat 12s ease-in-out infinite reverse;
    pointer-events: none;
}

.fb-hero-content { position: relative; z-index: 3; max-width: 620px; margin: 0 auto; }

.fb-hero-icon {
    position: relative;
    display: inline-block;
    font-size: 4rem;
    margin-bottom: 14px;
    animation: fbFloat 4s ease-in-out infinite;
    filter: drop-shadow(0 8px 32px rgba(162, 155, 254, 0.6));
    line-height: 1;
}
.fb-hero-icon::before,
.fb-hero-icon::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border: 2px solid rgba(162, 155, 254, 0.3);
    border-radius: 50%;
    animation: fbRing 3s ease-out infinite;
    pointer-events: none;
}
.fb-hero-icon::after { animation-delay: 1.5s; }

.fb-hero-title {
    font-size: 2.1rem;
    font-weight: 900;
    margin: 0 0 10px;
    letter-spacing: -0.5px;
    background: linear-gradient(90deg, #fff 0%, #A29BFE 25%, #fff 50%, #A29BFE 75%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fbShine 6s linear infinite;
}
.fb-hero-sub {
    font-size: 1rem;
    opacity: 0.88;
    margin: 0 0 24px;
    line-height: 1.65;
}

/* Trust badges */
.fb-trust {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}
.fb-trust-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 30px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #fff;
}
.fb-trust-item .fb-trust-icon { font-size: 1rem; }

/* ═══════════════════════════════════════════════════════════
   FORM CONTAINER — Большое окно
   ═══════════════════════════════════════════════════════════ */
.fb-form-wrap {
    position: relative;
    background: #fff;
    border-radius: 24px;
    padding: 0;
    margin-bottom: 24px;
    overflow: hidden;
    box-shadow:
        0 24px 60px -16px rgba(108, 99, 255, 0.35),
        0 0 0 1px rgba(108, 99, 255, 0.08);
    animation: fbRiseUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}
.fb-form-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--fb-k), var(--fb-k-light), #f5d76e, var(--fb-k));
    background-size: 200% auto;
    animation: fbShine 4s linear infinite;
    z-index: 2;
}

.fb-form-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px 16px;
    background: linear-gradient(135deg, rgba(108, 99, 255, 0.04), rgba(162, 155, 254, 0.02));
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.fb-form-head-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--fb-k), var(--fb-k-light));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    flex-shrink: 0;
    box-shadow: 0 4px 12px -2px var(--fb-k-shadow);
}
.fb-form-head-info { flex: 1; min-width: 0; }
.fb-form-head-title {
    font-size: 1rem;
    font-weight: 900;
    color: #1a1a2e;
    margin: 0 0 2px;
    letter-spacing: -0.2px;
}
.fb-form-head-sub {
    font-size: 0.78rem;
    color: #888;
    font-weight: 600;
}
.fb-form-head-badge {
    padding: 5px 12px;
    border-radius: 12px;
    background: rgba(39, 174, 96, 0.12);
    color: #27ae60;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.3px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
}
.fb-form-head-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #27ae60;
    box-shadow: 0 0 8px #27ae60;
    animation: fbPulse 2s ease-in-out infinite;
}

/* iframe container — БОЛЬШОЕ окно */
.fb-iframe-wrap {
    position: relative;
    width: 100%;
    background: #fafbfd;
    min-height: 900px;
}
.fb-iframe {
    display: block;
    width: 100%;
    height: 900px;
    border: none;
    background: transparent;
    transition: opacity 0.3s ease;
}
.fb-iframe-loader {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fafbfd;
    z-index: 3;
    transition: opacity 0.4s ease, visibility 0.4s ease;
    pointer-events: none;
}
.fb-iframe-loader.hidden {
    opacity: 0;
    visibility: hidden;
}
.fb-iframe-loader .fb-spinner {
    width: 44px;
    height: 44px;
    border-width: 3px;
}
.fb-iframe-loader p {
    color: #999;
    margin-top: 14px;
    font-size: 0.85rem;
    font-weight: 700;
}

/* ═══════════════════════════════════════════════════════════
   ALT CONTACTS
   ═══════════════════════════════════════════════════════════ */
.fb-section-title {
    font-size: 1.05rem;
    font-weight: 900;
    color: #1a1a2e;
    margin: 0 0 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: -0.2px;
}
.fb-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(108, 99, 255, 0.3), transparent);
}

.fb-alts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
}
.fb-alt {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 18px;
    background: #fff;
    border: 2px solid rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    text-decoration: none !important;
    color: inherit;
    animation: fbSlideIn 0.4s ease both;
}
.fb-alt:hover {
    transform: translateY(-4px);
    border-color: var(--fb-k);
    box-shadow: 0 12px 32px -8px var(--fb-k-shadow);
}
.fb-alt-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
    color: #fff;
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.2);
}
.fb-alt-icon.telegram { background: linear-gradient(135deg, #0088cc, #229ED9); }
.fb-alt-icon.email    { background: linear-gradient(135deg, var(--fb-k), var(--fb-k-light)); }
.fb-alt-info { flex: 1; min-width: 0; }
.fb-alt-title {
    font-size: 0.92rem;
    font-weight: 900;
    color: #1a1a2e;
    margin-bottom: 2px;
}
.fb-alt-sub {
    font-size: 0.75rem;
    color: #888;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* ═══════════════════════════════════════════════════════════
   FAQ / HINTS
   ═══════════════════════════════════════════════════════════ */
.fb-faq {
    background: #fff;
    border-radius: 20px;
    padding: 24px 26px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}
.fb-faq-title {
    font-size: 1rem;
    font-weight: 900;
    color: #1a1a2e;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.fb-faq-list {
    display: grid;
    gap: 10px;
}
.fb-faq-item {
    display: flex;
    gap: 12px;
    padding: 12px 14px;
    background: linear-gradient(135deg, rgba(108, 99, 255, 0.04), rgba(162, 155, 254, 0.02));
    border-left: 3px solid var(--fb-k);
    border-radius: 10px;
    transition: all 0.25s;
}
.fb-faq-item:hover {
    transform: translateX(4px);
    background: linear-gradient(135deg, rgba(108, 99, 255, 0.08), rgba(162, 155, 254, 0.04));
}
.fb-faq-icon {
    font-size: 1.15rem;
    flex-shrink: 0;
    line-height: 1.4;
}
.fb-faq-text {
    font-size: 0.88rem;
    color: #444;
    line-height: 1.55;
    font-weight: 500;
}
.fb-faq-text b { color: var(--fb-k); font-weight: 800; }

/* ═══════════════════════════════════════════════════════════
   FOOTER MESSAGE
   ═══════════════════════════════════════════════════════════ */
.fb-thanks {
    text-align: center;
    padding: 24px 20px;
    margin-top: 24px;
    color: #888;
    font-size: 0.85rem;
    line-height: 1.7;
    font-weight: 600;
}
.fb-thanks b {
    background: linear-gradient(90deg, var(--fb-k), var(--fb-k-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 900;
}

/* ═══════════════════════════════════════════════════════════
   DARK MODE
   ═══════════════════════════════════════════════════════════ */
@media (prefers-color-scheme: dark) {
    html body.mars-stars-on .fb-form-wrap,
    html body.mars-stars-on .fb-alt,
    html body.mars-stars-on .fb-faq {
        background: rgba(20, 20, 42, 0.9);
        border-color: rgba(108, 99, 255, 0.3);
        color: #e0e0f0;
    }
    html body.mars-stars-on .fb-form-head-title,
    html body.mars-stars-on .fb-section-title,
    html body.mars-stars-on .fb-faq-title,
    html body.mars-stars-on .fb-alt-title { color: #e0e0f0; }
    html body.mars-stars-on .fb-form-head {
        background: linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(162, 155, 254, 0.05));
        border-bottom-color: rgba(108, 99, 255, 0.2);
    }
    html body.mars-stars-on .fb-iframe-wrap,
    html body.mars-stars-on .fb-iframe-loader { background: #1a1a2e; }
    html body.mars-stars-on .fb-faq-text { color: #c0c0d0; }
    html body.mars-stars-on .fb-faq-item { background: rgba(108, 99, 255, 0.08); }
}

/* ═══════════════════════════════════════════════════════════
   MOBILE
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 640px) {
    .fb-hero {
        padding: 34px 20px 30px;
        border-radius: 18px;
    }
    .fb-hero-title { font-size: 1.55rem; }
    .fb-hero-icon { font-size: 3rem; }
    .fb-hero-sub { font-size: 0.92rem; }
    .fb-trust-item { padding: 7px 12px; font-size: 0.72rem; }
    .fb-form-wrap { border-radius: 18px; }
    .fb-form-head { padding: 16px 18px 12px; gap: 10px; }
    .fb-form-head-icon { width: 36px; height: 36px; font-size: 1rem; }
    .fb-form-head-title { font-size: 0.92rem; }
    .fb-form-head-sub { font-size: 0.72rem; }
    .fb-form-head-badge { font-size: 0.62rem; padding: 4px 8px; }
    .fb-iframe-wrap { min-height: 1100px; }
    .fb-iframe { height: 1100px; }
    .fb-alts { grid-template-columns: 1fr; }
    .fb-faq { padding: 18px 16px; border-radius: 14px; }
    .fb-faq-text { font-size: 0.82rem; }
    .fb-section-title { font-size: 0.95rem; }
}

@media (prefers-reduced-motion: reduce) {
    #fb-app *,
    #fb-app *::before,
    #fb-app *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>

<script>
(function() {
    'use strict';
    if (window.__fbLoaded) return;
    window.__fbLoaded = true;

    var container = document.getElementById('fb-app');
    if (!container) return;

    // ═══════════════════════════════════════════════════════════
    // CONFIG — ЗАМЕНИ ЗДЕСЬ
    // ═══════════════════════════════════════════════════════════
    var FORM_URL = 'https://forms.yandex.ru/u/6ab625b9f47e736f34b558d9';
    var EMAIL = 'mars-wiki@yandex.ru';                  

    // ═══════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════
    function render() {
        var starsHtml = '';
        for (var i = 0; i < 10; i++) starsHtml += '<div class="fb-star"></div>';

        container.innerHTML = [
            // ═══ HERO ═══
            '<div class="fb-hero fb-fade">',
            '  <div class="fb-hero-stars">' + starsHtml + '</div>',
            '  <div class="fb-hero-content">',
            '    <div class="fb-hero-icon">📬</div>',
            '    <h1 class="fb-hero-title">Обратная связь</h1>',
            '    <p class="fb-hero-sub">',
            '      Нашли ошибку, хотите предложить статью или просто сказать спасибо?',
            '      Мы читаем каждое сообщение — обещаем.',
            '    </p>',
            '    <div class="fb-trust">',
            '      <span class="fb-trust-item"><span class="fb-trust-icon">⚡</span> Отвечаем за 1–3 дня</span>',
            '      <span class="fb-trust-item"><span class="fb-trust-icon">🔒</span> Данные защищены</span>',
            '      <span class="fb-trust-item"><span class="fb-trust-icon">💬</span> Читаем всё</span>',
            '    </div>',
            '  </div>',
            '</div>',

            // ═══ FORM ═══
            '<div class="fb-form-wrap fb-fade" style="animation-delay:.15s;">',
            '  <div class="fb-form-head">',
            '    <div class="fb-form-head-icon">✍️</div>',
            '    <div class="fb-form-head-info">',
            '      <div class="fb-form-head-title">Форма обратной связи</div>',
            '      <div class="fb-form-head-sub">Заполните — и мы получим ваше сообщение</div>',
            '    </div>',
            '    <div class="fb-form-head-badge">Онлайн</div>',
            '  </div>',
            '  <div class="fb-iframe-wrap">',
            '    <div class="fb-iframe-loader" id="fb-loader">',
            '      <div class="fb-spinner"></div>',
            '      <p>Загрузка формы...</p>',
            '    </div>',
            '    <iframe ',
            '      id="fb-iframe"',
            '      class="fb-iframe"',
            '      src="' + FORM_URL + '"',
            '      loading="lazy"',
            '      title="Форма обратной связи"',
            '      allow="camera; microphone; geolocation"',
            '      referrerpolicy="no-referrer-when-downgrade"',
            '      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"',
            '    ></iframe>',
            '  </div>',
            '</div>',

            // ═══ ALT CONTACTS ═══
            '<h3 class="fb-section-title fb-fade" style="animation-delay:.25s;">📮 Другие способы связи</h3>',
            '<div class="fb-alts">',
            '  <a href="' + TELEGRAM_URL + '" target="_blank" rel="noopener" class="fb-alt" style="animation-delay:.3s;">',
            '    <div class="fb-alt-icon telegram">✈️</div>',
            '    <div class="fb-alt-info">',
            '      <div class="fb-alt-title">Telegram-канал</div>',
            '      <div class="fb-alt-sub">Новости и обсуждения</div>',
            '    </div>',
            '  </a>',
            '  <a href="mailto:' + EMAIL + '" class="fb-alt" style="animation-delay:.35s;">',
            '    <div class="fb-alt-icon email">✉️</div>',
            '    <div class="fb-alt-info">',
            '      <div class="fb-alt-title">Email редакции</div>',
            '      <div class="fb-alt-sub">' + EMAIL + '</div>',
            '    </div>',
            '  </a>',
            '</div>',

            // ═══ FAQ ═══
            '<div class="fb-faq fb-fade" style="animation-delay:.4s;">',
            '  <div class="fb-faq-title">💡 Что можно написать в форме?</div>',
            '  <div class="fb-faq-list">',
            '    <div class="fb-faq-item">',
            '      <span class="fb-faq-icon">🐛</span>',
            '      <div class="fb-faq-text"><b>Нашли ошибку?</b> Укажите ссылку на страницу и опишите что не так — исправим быстро.</div>',
            '    </div>',
            '    <div class="fb-faq-item">',
            '      <span class="fb-faq-icon">💡</span>',
            '      <div class="fb-faq-text"><b>Хотите предложить статью?</b> Расскажите идею — обсудим и, возможно, добавим.</div>',
            '    </div>',
            '    <div class="fb-faq-item">',
            '      <span class="fb-faq-icon">🤝</span>',
            '      <div class="fb-faq-text"><b>Хотите помочь проекту?</b> Художники, редакторы, разработчики — пишите, будем рады.</div>',
            '    </div>',
            '    <div class="fb-faq-item">',
            '      <span class="fb-faq-icon">💬</span>',
            '      <div class="fb-faq-text"><b>Просто отзыв?</b> Расскажите что нравится, что бесит, что хочется увидеть — это важно.</div>',
            '    </div>',
            '  </div>',
            '</div>',

            // ═══ THANKS ═══
            '<div class="fb-thanks fb-fade" style="animation-delay:.45s;">',
            '  Спасибо, что делаете <b>Марсианскую энциклопедию</b> лучше.<br>',
            '  Ваше сообщение обязательно попадёт к редакции.',
            '</div>'
        ].join('');

        bindIframeLoader();
    }

    // ═══════════════════════════════════════════════════════════
    // IFRAME LOADER — скрыть спиннер когда форма загрузилась
    // ═══════════════════════════════════════════════════════════
    function bindIframeLoader() {
        var iframe = document.getElementById('fb-iframe');
        var loader = document.getElementById('fb-loader');
        if (!iframe || !loader) return;

        var hidden = false;
        function hide() {
            if (hidden) return;
            hidden = true;
            loader.classList.add('hidden');
            setTimeout(function() {
                if (loader && loader.parentNode) loader.style.display = 'none';
            }, 500);
        }

        iframe.addEventListener('load', hide);
        // Fallback — если load не сработает (some browsers)
        setTimeout(hide, 5000);
    }

    // ═══════════════════════════════════════════════════════════
    // START
    // ═══════════════════════════════════════════════════════════
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }

    console.log('📬 Обратная связь v2 VIP готова');
})();
</script>
