// ============================================================
// device-link.js (он же link-device.js) — v3 VIP
// Генерация QR-кода для входа с другого устройства
// - Универсальный QR: работает с qrcode@1.5.3 И с qrcodejs (davidshimjs)
// - Кнопка копирования всегда работает (даже без QR)
// - Не ждёт 8 сек marsSession — стартует сразу
// - Публичное API: window.marsLinkDevice.open()
// ============================================================
(function() {
    'use strict';

    if (window.__linkDeviceLoaded) return;
    window.__linkDeviceLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var LOGIN_PATH = '/login/';
    var BTN_ID = 'link-device-btn';

    var QR_CDN_LIST = [
        'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js',
        'https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js'
    ];

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

    // ============================================================
    // 🎨 УНИВЕРСАЛЬНЫЙ РЕНДЕР QR
    // Поддерживает:
    //   1) qrcode@1.5.3  → QRCode.toCanvas(canvas, text, opts, cb)
    //   2) qrcodejs      → new QRCode(el, { text, width, ... })
    // ============================================================
    function renderQR(container, text) {
        container.innerHTML = '';

        // === Вариант 1: современная qrcode@1.5.3 ===
        if (window.QRCode && typeof window.QRCode.toCanvas === 'function') {
            var canvas = document.createElement('canvas');
            container.appendChild(canvas);
            try {
                window.QRCode.toCanvas(canvas, text, {
                    width: 220,
                    margin: 2,
                    color: { dark: '#1a1a2e', light: '#ffffff' },
                    errorCorrectionLevel: 'M'
                }, function(err) {
                    if (err) {
                        console.error('QR render err:', err);
                        container.innerHTML = '<div style="color:#888;padding:20px;text-align:center;">Не удалось сгенерировать QR.<br><small>Скопируйте ссылку ниже</small></div>';
                    }
                });
                return true;
            } catch(e) {
                console.error('QR toCanvas err:', e);
            }
        }

        // === Вариант 2: qrcodejs (davidshimjs) ===
        if (typeof window.QRCode === 'function') {
            try {
                new window.QRCode(container, {
                    text: text,
                    width: 220,
                    height: 220,
                    colorDark: '#1a1a2e',
                    colorLight: '#ffffff',
                    correctLevel: (window.QRCode.CorrectLevel && window.QRCode.CorrectLevel.M) || 0
                });
                return true;
            } catch(e) {
                console.error('QR davidshimjs err:', e);
            }
        }

        // === Ничего не подошло ===
        container.innerHTML = '<div style="color:#888;padding:20px;text-align:center;">QR недоступен.<br><small>Скопируйте ссылку ниже</small></div>';
        return false;
    }

    // ============================================================
    // 📚 Загрузка QR-библиотеки (только если её нет)
    // ============================================================
    var _qrPromise = null;

    function loadQRLib() {
        // Уже есть хоть какая-то из двух
        if (window.QRCode && (typeof window.QRCode.toCanvas === 'function' || typeof window.QRCode === 'function')) {
            return Promise.resolve(true);
        }
        if (_qrPromise) return _qrPromise;

        _qrPromise = new Promise(function(resolve) {
            var idx = 0;

            function tryNext() {
                if (idx >= QR_CDN_LIST.length) {
                    console.warn('⚠️ device-link: все CDN QR недоступны, но локальный не найден');
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
                        console.log('✅ device-link: QR загружен с', url);
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
    // 📋 Копирование
    // ============================================================
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function(resolve, reject) {
            try {
                var ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.left = '-9999px';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                resolve();
            } catch(e) { reject(e); }
        });
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('link-device-style')) return;
        var s = document.createElement('style');
        s.id = 'link-device-style';
        s.textContent = `
            @keyframes ldFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes ldSlideUp {
                from { opacity: 0; transform: translateY(24px) scale(0.96); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes ldSpin { to { transform: rotate(360deg); } }
            @keyframes ldShine {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
            }
            #ld-overlay {
                position: fixed; inset: 0; z-index: 999999;
                background: rgba(10, 10, 26, 0.75);
                backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
                display: flex; align-items: center; justify-content: center;
                padding: 20px; animation: ldFadeIn 0.3s ease;
                overflow-y: auto;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
            }
            .ld-modal {
                background: #fff; max-width: 440px; width: 100%;
                padding: 34px 30px 28px; border-radius: 26px;
                text-align: center; position: relative;
                box-shadow: 0 30px 80px rgba(0,0,0,0.5);
                animation: ldSlideUp 0.45s cubic-bezier(0.16,1,0.3,1);
                margin: auto; overflow: hidden;
            }
            .ld-modal::before {
                content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
                background: linear-gradient(90deg, #6C63FF, #A29BFE, #6C63FF);
                background-size: 200% auto;
                animation: ldShine 3s linear infinite;
            }
            .ld-close {
                position: absolute; top: 14px; right: 16px;
                width: 34px; height: 34px; border-radius: 50%;
                background: rgba(0,0,0,0.05); border: none;
                font-size: 18px; cursor: pointer; color: #666;
                display: flex; align-items: center; justify-content: center;
                transition: all 0.25s; font-family: inherit; padding: 0;
                z-index: 2;
            }
            .ld-close:hover { background: rgba(0,0,0,0.12); transform: rotate(90deg); }
            .ld-icon {
                font-size: 3.2rem; margin-bottom: 6px; display: inline-block;
                filter: drop-shadow(0 8px 20px rgba(108,99,255,0.35));
            }
            .ld-title {
                margin: 0 0 8px 0; font-size: 1.4rem; font-weight: 800;
                color: #1a1a2e; letter-spacing: -0.3px;
            }
            .ld-subtitle {
                margin: 0 0 22px 0; color: #888; font-size: 0.9rem; line-height: 1.5;
            }
            .ld-qr-wrap {
                display: flex; align-items: center; justify-content: center;
                padding: 18px;
                background: linear-gradient(135deg, #fafbfd, #f0f4ff);
                border: 1px solid rgba(108,99,255,0.15);
                border-radius: 18px; margin-bottom: 18px;
                min-height: 240px;
            }
            .ld-qr-wrap canvas,
            .ld-qr-wrap img,
            .ld-qr-wrap > div > canvas,
            .ld-qr-wrap > div > img {
                border-radius: 10px; display: block; max-width: 100%; height: auto;
            }
            .ld-qr-loading {
                display: flex; flex-direction: column; align-items: center;
                gap: 12px; color: #999; font-size: 0.88rem;
            }
            .ld-spinner {
                width: 42px; height: 42px;
                border: 3px solid rgba(108,99,255,0.2);
                border-top-color: #6C63FF;
                border-radius: 50%;
                animation: ldSpin 0.8s linear infinite;
            }
            .ld-email-box {
                background: linear-gradient(135deg, #f0f4ff, #e8ecff);
                padding: 12px 16px; border-radius: 12px;
                margin-bottom: 14px; font-size: 0.85rem;
                color: #4a5568; text-align: left;
                border: 1px solid rgba(108,99,255,0.15);
            }
            .ld-email-box .ld-email-label {
                font-size: 0.72rem; text-transform: uppercase;
                letter-spacing: 0.8px; color: #888;
                font-weight: 700; margin-bottom: 4px;
            }
            .ld-email-box .ld-email-value {
                color: #6C63FF; font-weight: 700; font-size: 0.92rem;
                word-break: break-all;
            }
            .ld-copy-row { display: flex; gap: 8px; margin-bottom: 16px; }
            .ld-copy-input {
                flex: 1; padding: 11px 14px;
                border: 1.5px solid #e8eaf0; border-radius: 10px;
                font-size: 0.8rem;
                font-family: 'SF Mono','Consolas',monospace;
                color: #555; background: #fafafa; outline: none;
                min-width: 0;
            }
            .ld-copy-btn {
                padding: 11px 18px;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff; border: none; border-radius: 10px;
                font-size: 0.85rem; font-weight: 700; cursor: pointer;
                font-family: inherit; transition: all 0.25s;
                white-space: nowrap;
            }
            .ld-copy-btn:hover { transform: translateY(-2px); }
            .ld-copy-btn.copied {
                background: linear-gradient(135deg, #27ae60, #16a085);
            }
            .ld-hint {
                background: #fff8e1; padding: 10px 14px;
                border-radius: 10px; font-size: 0.78rem;
                color: #856404; text-align: left;
                border-left: 3px solid #f39c12; line-height: 1.5;
            }
            @media (max-width: 600px) {
                .ld-modal { padding: 28px 22px 22px; border-radius: 20px; }
                .ld-icon { font-size: 2.6rem; }
                .ld-title { font-size: 1.2rem; }
                .ld-qr-wrap { padding: 14px; min-height: 200px; }
                .ld-copy-input { font-size: 0.72rem; padding: 10px 12px; }
                .ld-copy-btn { padding: 10px 14px; font-size: 0.8rem; }
            }
            @media (prefers-reduced-motion: reduce) {
                #ld-overlay, .ld-modal, .ld-spinner, .ld-modal::before {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🖼️ Открыть модалку с QR
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
            '  <div class="ld-hint">💡 После сканирования введите пароль на телефоне</div>' +
            '</div>';

        document.body.appendChild(overlay);

        var closeBtn = overlay.querySelector('.ld-close');
        function close() {
            overlay.style.animation = 'ldFadeIn 0.25s ease reverse';
            setTimeout(function() { overlay.remove(); }, 250);
        }
        closeBtn.onclick = close;
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) close();
        });
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
        });

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
                btn.textContent = '⚠️ Ошибка';
                setTimeout(function() { btn.textContent = '📋 Копировать'; }, 2000);
            });
        };

        // QR — рисуем
        var qrContainer = overlay.querySelector('#ld-qr-container');

        // Сразу пробуем нарисовать (вдруг библиотека уже есть)
        if (window.QRCode) {
            renderQR(qrContainer, loginUrl);
            return;
        }

        // Иначе — грузим CDN
        loadQRLib().then(function() {
            renderQR(qrContainer, loginUrl);
        });
    }

    // ============================================================
    // 🔘 Кнопка в профиле — ставим ТОЛЬКО если её нет в HTML
    // ============================================================
    function addButtonToProfile() {
        // 🛑 Если кнопка уже есть в HTML (profile.md её вставил) — выходим
        if (document.querySelector('.pf-device-link-btn')) return true;
        if (document.getElementById(BTN_ID)) return true;

        // Ищем блок Безопасность
        var securityContent = document.querySelector('[data-content="security"]');
        if (!securityContent) return false;

        var devicesEl = securityContent.querySelector('#pf-trusted-devices');
        var targetCard = devicesEl ? devicesEl.closest('.pf-card') : null;
        if (!targetCard) return false;

        var btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.type = 'button';
        btn.className = 'pf-device-link-btn';
        btn.innerHTML = '<span class="pf-dl-icon">📱</span><span>Показать QR-код</span>';
        btn.onclick = function() {
            var email = (window.marsSession && window.marsSession.user && window.marsSession.user.email) || '';
            openQRModal(email);
        };

        targetCard.appendChild(btn);
        return true;
    }

    function startWatching() {
        if (addButtonToProfile()) return;
        if (typeof MutationObserver === 'undefined') return;

        var obs = new MutationObserver(function() {
            if (addButtonToProfile()) obs.disconnect();
        });
        obs.observe(document.body, { childList: true, subtree: true });
        setTimeout(function() { obs.disconnect(); }, 20000);
    }

    // ============================================================
    // 🚀 Старт (без ожидания marsSession — стартуем сразу)
    // ============================================================
    function init() {
        injectStyles();
        // Небольшая задержка — чтобы profile.md успел отрисоваться
        setTimeout(startWatching, 800);
        setTimeout(startWatching, 2500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsLinkDevice = {
        open: function(email) {
            var e = email || (window.marsSession && window.marsSession.user && window.marsSession.user.email) || '';
            openQRModal(e);
        },
        isMobile: isMobile(),
        getLoginUrl: getLoginUrl
    };

    console.log('✅ device-link.js v3 VIP загружен');
})();
