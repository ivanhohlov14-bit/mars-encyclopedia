// ============================================================
// device-link.js — v2 VIP
// Генерация QR для входа с другого устройства
// - Экспортирует window.marsLinkDevice (совместим с profile.md)
// - Алиасы: window.deviceLink, window.deviceLinkAPI, window.openQRModal
// - 3 CDN для QR-библиотеки (fallback)
// - VIP-модалка с анимациями и копированием ссылки
// - Кнопка в профиль (вкладка Безопасность) вставляется автоматически,
//   если её ещё нет (статичной в profile.md)
// - На мобильном делегирует в qr-scanner.js
// ============================================================
(function() {
    'use strict';

    if (window.__deviceLinkLoaded) return;
    window.__deviceLinkLoaded = true;

    // ============================================================
    // ⚙️ Конфигурация
    // ============================================================
    var QR_CDN_LIST = [
        'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js',
        'https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
    ];

    var LOGIN_PATH = '/login/';
    var BTN_ID = 'link-device-btn';

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 1 && window.innerWidth < 1024) return true;
        return window.innerWidth < 768;
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function getLoginUrl(email) {
        var base = window.location.origin + LOGIN_PATH;
        if (email) base += '?email=' + encodeURIComponent(email);
        return base;
    }

    function getCurrentEmail() {
        try {
            if (window.marsSession && window.marsSession.user && window.marsSession.user.email) {
                return window.marsSession.user.email;
            }
            if (window.supabaseClient && window.supabaseClient.auth) {
                // синхронно не получим, но кэш из sessionStorage есть
                for (var i = 0; i < localStorage.length; i++) {
                    var k = localStorage.key(i);
                    if (k && k.indexOf('sb-') === 0 && k.indexOf('-auth-token') > 0) {
                        var raw = localStorage.getItem(k);
                        try {
                            var p = JSON.parse(raw);
                            if (Array.isArray(p)) p = p[p.length - 1];
                            if (p && p.user && p.user.email) return p.user.email;
                        } catch(e) {}
                    }
                }
            }
            var el = document.querySelector('.pf-email');
            if (el) return el.textContent.trim();
        } catch(e) {}
        return '';
    }

    // ============================================================
    // 📚 Загрузка QR-библиотеки
    // ============================================================
    var _qrPromise = null;

    function loadQRLib() {
        if (window.QRCode && typeof window.QRCode.toCanvas === 'function') {
            return Promise.resolve(true);
        }
        if (_qrPromise) return _qrPromise;

        _qrPromise = new Promise(function(resolve) {
            var idx = 0;

            function tryNext() {
                if (idx >= QR_CDN_LIST.length) {
                    console.error('❌ device-link: все CDN QR недоступны');
                    resolve(false);
                    return;
                }
                var url = QR_CDN_LIST[idx++];
                var s = document.createElement('script');
                s.src = url;
                s.async = true;

                var timeout = setTimeout(function() {
                    if (s.parentNode) s.parentNode.removeChild(s);
                    tryNext();
                }, 8000);

                s.onload = function() {
                    clearTimeout(timeout);
                    if (window.QRCode) {
                        console.log('✅ device-link: QR-библиотека с', url);
                        resolve(true);
                    } else {
                        tryNext();
                    }
                };
                s.onerror = function() {
                    clearTimeout(timeout);
                    tryNext();
                };
                document.head.appendChild(s);
            }
            tryNext();
        });
        return _qrPromise;
    }

    // ============================================================
    // 🎨 Стили (один раз)
    // ============================================================
    function injectStyles() {
        if (document.getElementById('device-link-style')) return;
        var s = document.createElement('style');
        s.id = 'device-link-style';
        s.textContent = `
            @keyframes ldFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes ldSlideUp {
                from { opacity: 0; transform: translateY(24px) scale(.96); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes ldSpin { to { transform: rotate(360deg); } }
            @keyframes ldPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
            @keyframes ldShine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

            #ld-overlay {
                position: fixed; inset: 0; z-index: 999999;
                background: rgba(10,10,26,.75);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: flex; align-items: center; justify-content: center;
                padding: 20px; animation: ldFadeIn .3s ease;
                overflow-y: auto;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
            }
            .ld-modal {
                background: #fff; max-width: 440px; width: 100%;
                padding: 34px 30px 28px; border-radius: 26px;
                text-align: center; position: relative;
                box-shadow: 0 30px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.08) inset;
                animation: ldSlideUp .45s cubic-bezier(.16,1,.3,1);
                margin: auto; overflow: hidden;
            }
            .ld-modal::before {
                content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
                background: linear-gradient(90deg, #6C63FF, #A29BFE, #6C63FF);
                background-size: 200% auto; animation: ldShine 3s linear infinite;
            }
            .ld-close {
                position: absolute; top: 14px; right: 16px;
                width: 34px; height: 34px; border-radius: 50%;
                background: rgba(0,0,0,.05); border: none; font-size: 18px;
                cursor: pointer; color: #666;
                display: flex; align-items: center; justify-content: center;
                transition: all .25s; font-family: inherit; padding: 0;
                line-height: 1; z-index: 2;
            }
            .ld-close:hover { background: rgba(0,0,0,.12); transform: rotate(90deg); color: #000; }

            .ld-icon {
                font-size: 3.2rem; margin-bottom: 6px;
                display: inline-block; animation: ldPulse 2.5s ease-in-out infinite;
                filter: drop-shadow(0 8px 20px rgba(108,99,255,.35));
            }
            .ld-title { margin: 0 0 8px 0; font-size: 1.4rem; font-weight: 800; color: #1a1a2e; letter-spacing: -.3px; }
            .ld-subtitle { margin: 0 0 22px 0; color: #888; font-size: .9rem; line-height: 1.5; }

            .ld-qr-wrap {
                display: flex; align-items: center; justify-content: center;
                padding: 18px; background: linear-gradient(135deg, #fafbfd, #f0f4ff);
                border: 1px solid rgba(108,99,255,.15); border-radius: 18px;
                margin-bottom: 18px; position: relative; min-height: 240px;
            }
            .ld-qr-wrap canvas, .ld-qr-wrap img {
                border-radius: 10px; display: block; max-width: 100%; height: auto;
            }
            .ld-qr-loading {
                display: flex; flex-direction: column; align-items: center;
                gap: 12px; color: #999; font-size: .88rem;
            }
            .ld-spinner {
                width: 42px; height: 42px;
                border: 3px solid rgba(108,99,255,.2);
                border-top-color: #6C63FF; border-radius: 50%;
                animation: ldSpin .8s linear infinite;
            }
            .ld-email-box {
                background: linear-gradient(135deg, #f0f4ff, #e8ecff);
                padding: 12px 16px; border-radius: 12px; margin-bottom: 14px;
                font-size: .85rem; color: #4a5568; text-align: left;
                border: 1px solid rgba(108,99,255,.15);
            }
            .ld-email-box .ld-email-label {
                font-size: .72rem; text-transform: uppercase; letter-spacing: .8px;
                color: #888; font-weight: 700; margin-bottom: 4px;
            }
            .ld-email-box .ld-email-value {
                color: #6C63FF; font-weight: 700; font-size: .92rem; word-break: break-all;
            }
            .ld-copy-row { display: flex; gap: 8px; margin-bottom: 16px; }
            .ld-copy-input {
                flex: 1; padding: 11px 14px; border: 1.5px solid #e8eaf0;
                border-radius: 10px; font-size: .8rem;
                font-family: 'SF Mono', Consolas, monospace;
                color: #555; background: #fafafa; outline: none;
                min-width: 0; text-overflow: ellipsis;
            }
            .ld-copy-btn {
                padding: 11px 18px;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff; border: none; border-radius: 10px;
                font-size: .85rem; font-weight: 700; cursor: pointer;
                font-family: inherit; transition: all .25s; white-space: nowrap;
                box-shadow: 0 4px 12px -2px rgba(108,99,255,.4);
            }
            .ld-copy-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(108,99,255,.5); }
            .ld-copy-btn.copied { background: linear-gradient(135deg, #27ae60, #16a085); }

            .ld-hint {
                background: #fff8e1; padding: 10px 14px; border-radius: 10px;
                font-size: .78rem; color: #856404; text-align: left;
                border-left: 3px solid #f39c12; line-height: 1.5;
            }

            .pf-device-link-btn {
                display: flex; align-items: center; justify-content: center;
                gap: 10px; width: 100%; padding: 14px 22px; border-radius: 14px;
                border: 2px solid var(--kc, #6C63FF);
                background: linear-gradient(135deg, rgba(108,99,255,.08), rgba(108,99,255,.02));
                color: var(--kc, #6C63FF);
                font-size: .92rem; font-weight: 700; cursor: pointer;
                transition: all .3s cubic-bezier(.16,1,.3,1);
                font-family: inherit; -webkit-tap-highlight-color: transparent;
                margin-top: 8px;
            }
            .pf-device-link-btn:hover {
                background: var(--kc, #6C63FF); color: #fff;
                transform: translateY(-2px);
                box-shadow: 0 10px 24px -6px var(--ks, rgba(108,99,255,.4));
            }
            .pf-device-link-btn:active { transform: translateY(0) scale(.98); }
            .pf-device-link-btn .pf-dl-icon { font-size: 1.25rem; line-height: 1; }

            @media (max-width: 600px) {
                .ld-modal { padding: 28px 22px 22px; border-radius: 20px; }
                .ld-icon { font-size: 2.6rem; }
                .ld-title { font-size: 1.2rem; }
                .ld-subtitle { font-size: .85rem; margin-bottom: 16px; }
                .ld-qr-wrap { padding: 14px; min-height: 200px; }
                .ld-copy-input { font-size: .72rem; padding: 10px 12px; }
                .ld-copy-btn { padding: 10px 14px; font-size: .8rem; }
            }
            @media (prefers-reduced-motion: reduce) {
                #ld-overlay, .ld-modal, .ld-icon, .ld-spinner, .ld-modal::before { animation: none !important; }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 📋 Копирование
    // ============================================================
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function(resolve, reject) {
            try {
                var ta = document.createElement('textarea');
                ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
                document.body.appendChild(ta); ta.select();
                document.execCommand('copy'); document.body.removeChild(ta);
                resolve();
            } catch(e) { reject(e); }
        });
    }

    // ============================================================
    // 🖼️ Модалка с QR
    // ============================================================
    function openQRModal(email) {
        injectStyles();
        var old = document.getElementById('ld-overlay');
        if (old) old.remove();

        var loginUrl = getLoginUrl(email);
        var overlay = document.createElement('div');
        overlay.id = 'ld-overlay';
        overlay.innerHTML =
            '<div class="ld-modal">' +
            '  <button class="ld-close" type="button" aria-label="Закрыть">✕</button>' +
            '  <div class="ld-icon">📱</div>' +
            '  <h2 class="ld-title">Вход с другого устройства</h2>' +
            '  <p class="ld-subtitle">Наведите камеру телефона на QR-код</p>' +
            '  <div class="ld-qr-wrap" id="ld-qr-container">' +
            '    <div class="ld-qr-loading">' +
            '      <div class="ld-spinner"></div>' +
            '      <div>Генерация QR-кода...</div>' +
            '    </div>' +
            '  </div>' +
            (email ?
                '<div class="ld-email-box">' +
                '  <div class="ld-email-label">Ваш email</div>' +
                '  <div class="ld-email-value">' + escapeHtml(email) + '</div>' +
                '</div>' : '') +
            '  <div class="ld-copy-row">' +
            '    <input type="text" class="ld-copy-input" id="ld-copy-input" readonly value="' + escapeHtml(loginUrl) + '">' +
            '    <button type="button" class="ld-copy-btn" id="ld-copy-btn">📋 Копировать</button>' +
            '  </div>' +
            '  <div class="ld-hint">💡 После сканирования введите свой пароль на телефоне</div>' +
            '</div>';

        document.body.appendChild(overlay);

        function closeModal() {
            overlay.style.animation = 'ldFadeIn .25s ease reverse';
            setTimeout(function() { overlay.remove(); }, 250);
            document.removeEventListener('keydown', escHandler);
        }
        function escHandler(e) { if (e.key === 'Escape') closeModal(); }

        overlay.querySelector('.ld-close').onclick = closeModal;
        overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
        document.addEventListener('keydown', escHandler);

        // Копирование
        overlay.querySelector('#ld-copy-btn').onclick = function() {
            var btn = this;
            copyToClipboard(loginUrl).then(function() {
                btn.textContent = '✓ Скопировано';
                btn.classList.add('copied');
                setTimeout(function() {
                    btn.textContent = '📋 Копировать';
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(function() {
                var inp = overlay.querySelector('#ld-copy-input');
                inp.select(); document.execCommand('copy');
            });
        };

        // QR
        var qrContainer = overlay.querySelector('#ld-qr-container');
        loadQRLib().then(function(ok) {
            if (!ok) {
                qrContainer.innerHTML =
                    '<div style="text-align:center;color:#888;padding:20px;">' +
                    '<div style="font-size:2.5rem;margin-bottom:8px;">📡</div>' +
                    '<div>Не удалось загрузить QR</div>' +
                    '<div style="font-size:.8rem;margin-top:8px;color:#aaa;">Используйте кнопку «Копировать»</div>' +
                    '</div>';
                return;
            }
            qrContainer.innerHTML = '';
            var canvas = document.createElement('canvas');
            qrContainer.appendChild(canvas);
            try {
                window.QRCode.toCanvas(canvas, loginUrl, {
                    width: 220, margin: 2,
                    color: { dark: '#1a1a2e', light: '#ffffff' },
                    errorCorrectionLevel: 'M'
                }, function(err) {
                    if (err) {
                        console.error('QR:', err);
                        qrContainer.innerHTML = '<div style="color:#888;padding:20px;text-align:center;">⚠️ Ошибка QR. Используйте «Копировать».</div>';
                    }
                });
            } catch(e) {
                qrContainer.innerHTML = '<div style="color:#888;padding:20px;text-align:center;">⚠️ Ошибка QR</div>';
            }
        });
    }

    // ============================================================
    // 🎯 Кнопка в профиль (если ещё нет статичной)
    // ============================================================
    function addButtonToProfile() {
        // 🛑 Если статичная кнопка из profile.md уже есть — не вставляем
        if (document.getElementById(BTN_ID)) return true;
        if (document.querySelector('.pf-device-link-btn')) return true;

        var securityContent = document.querySelector('[data-content="security"]');
        if (!securityContent) return false;

        var devicesCard = securityContent.querySelector('#pf-trusted-devices');
        var targetCard = devicesCard ? devicesCard.closest('.pf-card') : null;

        if (targetCard) {
            var btn = document.createElement('button');
            btn.id = BTN_ID;
            btn.type = 'button';
            btn.className = 'pf-device-link-btn';

            if (isMobile()) {
                btn.innerHTML = '<span class="pf-dl-icon">📷</span><span>Сканировать QR с ПК</span>';
                btn.onclick = function() {
                    if (window.marsQrScanner && typeof window.marsQrScanner.open === 'function') {
                        window.marsQrScanner.open();
                    } else if (typeof window.qsOpenScanner === 'function') {
                        window.qsOpenScanner();
                    } else {
                        alert('Сканер QR ещё не готов. Подождите...');
                    }
                };
            } else {
                btn.innerHTML = '<span class="pf-dl-icon">📱</span><span>Войти с телефона (QR)</span>';
                btn.onclick = function() { openQRModal(getCurrentEmail()); };
            }

            targetCard.appendChild(btn);
            console.log('✅ device-link: кнопка добавлена');
            return true;
        }
        return false;
    }

    // ============================================================
    // 🔄 Наблюдение
    // ============================================================
    function startWatching() {
        if (addButtonToProfile()) return;

        if (typeof MutationObserver !== 'undefined') {
            var obs = new MutationObserver(function() {
                if (addButtonToProfile()) obs.disconnect();
            });
            try {
                obs.observe(document.body, { childList: true, subtree: true });
            } catch(e) {}
            setTimeout(function() { try { obs.disconnect(); } catch(e) {} }, 30000);
        }

        var tries = 0;
        var iv = setInterval(function() {
            tries++;
            if (addButtonToProfile() || tries > 60) clearInterval(iv);
        }, 500);
    }

    // ============================================================
    // 🚀 Инициализация
    // ============================================================
    function init() {
        injectStyles();
        // Не ждём marsSession — сразу пытаемся вставить кнопку.
        // Просто даём странице прогрузиться 300мс.
        setTimeout(startWatching, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API (несколько алиасов для совместимости)
    // ============================================================
    window.marsLinkDevice = {
        open: function(email) {
            openQRModal(email || getCurrentEmail());
        },
        isMobile: isMobile(),
        getLoginUrl: getLoginUrl
    };

    // Алиасы под старые/разные имена
    window.deviceLink = window.marsLinkDevice;
    window.deviceLinkAPI = window.marsLinkDevice;
    window.openQRModal = openQRModal;

    console.log('✅ device-link.js v2 VIP загружен (алиасы: marsLinkDevice / deviceLink / openQRModal)');
})();
