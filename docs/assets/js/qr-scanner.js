// ============================================================
// qr-scanner.js — v2 VIP
// Сканер QR-кода (только на мобильных)
// - Много CDN fallback (если один не работает — берём другой)
// - VIP-оверлей с анимациями
// - Детальная обработка ошибок (нет камеры, нет разрешения)
// - Правильная очистка при закрытии
// - Кнопка на /login/, /register/
// - Публичное API: window.qsOpenScanner() — можно вызывать из профиля
// ============================================================
(function() {
    'use strict';

    if (window.__qrScannerLoaded) return;
    window.__qrScannerLoaded = true;

    // ============================================================
    // 📱 Определение мобильного
    // ============================================================
    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 1 && window.innerWidth < 1024) return true;
        return window.innerWidth < 768;
    }

    if (!isMobile()) {
        console.log('ℹ️ qr-scanner: не мобильное устройство');
        return;
    }

    // ============================================================
    // 📚 Загрузка библиотеки с несколькими CDN
    // ============================================================
    var CDN_LIST = [
        'https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js',
        'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js'
    ];

    var loadPromise = null;

    function loadScannerLib() {
        if (window.Html5Qrcode) return Promise.resolve(true);
        if (loadPromise) return loadPromise;

        loadPromise = new Promise(function(resolve) {
            var idx = 0;
            var tried = {};

            function tryNext() {
                if (idx >= CDN_LIST.length) {
                    console.error('❌ qr-scanner: все CDN недоступны');
                    resolve(false);
                    return;
                }
                var url = CDN_LIST[idx++];
                tried[url] = true;
                var s = document.createElement('script');
                s.src = url;
                s.async = true;
                var timeout = setTimeout(function() {
                    console.warn('⏱️ qr-scanner: таймаут', url);
                    if (s.parentNode) s.parentNode.removeChild(s);
                    tryNext();
                }, 8000);

                s.onload = function() {
                    clearTimeout(timeout);
                    if (window.Html5Qrcode) {
                        console.log('✅ qr-scanner: библиотека загружена с', url);
                        resolve(true);
                    } else {
                        tryNext();
                    }
                };
                s.onerror = function() {
                    clearTimeout(timeout);
                    console.warn('⚠️ qr-scanner: ошибка', url);
                    tryNext();
                };
                document.head.appendChild(s);
            }

            tryNext();
        });

        return loadPromise;
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('qs-style')) return;
        var s = document.createElement('style');
        s.id = 'qs-style';
        s.textContent = `
            @keyframes qsFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes qsSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes qsSpin {
                to { transform: rotate(360deg); }
            }
            @keyframes qsPulse {
                0%, 100% { transform: scale(1); opacity: 0.6; }
                50% { transform: scale(1.05); opacity: 1; }
            }
            @keyframes qsScanLine {
                0% { top: 10%; opacity: 0; }
                50% { opacity: 1; }
                100% { top: 90%; opacity: 0; }
            }

            #qs-overlay {
                position: fixed;
                inset: 0;
                z-index: 999999;
                background: #000;
                display: flex;
                flex-direction: column;
                animation: qsFadeIn 0.3s ease;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
            }
            #qs-header {
                padding: 16px 20px;
                padding-top: calc(16px + env(safe-area-inset-top, 0px));
                background: linear-gradient(180deg, #0a0a14 0%, #1a1a2e 100%);
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(108, 99, 255, 0.3);
                z-index: 3;
                position: relative;
            }
            #qs-header .qs-title {
                font-weight: 800;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #qs-header .qs-title .qs-icon {
                font-size: 1.3rem;
                animation: qsPulse 2s ease-in-out infinite;
            }
            #qs-close {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.15);
                border: none;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.25s;
                font-family: inherit;
                padding: 0;
                line-height: 1;
                -webkit-tap-highlight-color: transparent;
            }
            #qs-close:hover,
            #qs-close:active {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }

            #qs-viewport {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
                background: radial-gradient(circle at center, #1a1a2e 0%, #000 100%);
            }
            #qs-reader-target {
                width: 100%;
                max-width: 420px;
                position: relative;
                z-index: 2;
                border-radius: 16px;
                overflow: hidden;
            }
            #qs-reader-target video {
                width: 100% !important;
                height: auto !important;
                border-radius: 16px;
                display: block;
            }

            /* Рамка наведения */
            #qs-frame {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 250px;
                height: 250px;
                pointer-events: none;
                z-index: 5;
                border-radius: 20px;
                display: none;
            }
            #qs-frame.active { display: block; }
            #qs-frame::before,
            #qs-frame::after {
                content: '';
                position: absolute;
                width: 40px;
                height: 40px;
                border: 3px solid #6C63FF;
                border-radius: 4px;
            }
            #qs-frame::before {
                top: -2px; left: -2px;
                border-right: none;
                border-bottom: none;
                border-top-left-radius: 20px;
            }
            #qs-frame::after {
                bottom: -2px; right: -2px;
                border-left: none;
                border-top: none;
                border-bottom-right-radius: 20px;
            }
            .qs-corner {
                position: absolute;
                width: 40px;
                height: 40px;
                border: 3px solid #6C63FF;
                border-radius: 4px;
            }
            .qs-corner.tr {
                top: -2px; right: -2px;
                border-left: none;
                border-bottom: none;
                border-top-right-radius: 20px;
            }
            .qs-corner.bl {
                bottom: -2px; left: -2px;
                border-right: none;
                border-top: none;
                border-bottom-left-radius: 20px;
            }
            #qs-scanline {
                position: absolute;
                left: 5%;
                right: 5%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #6C63FF, #A29BFE, #6C63FF, transparent);
                box-shadow: 0 0 12px #6C63FF;
                animation: qsScanLine 2.2s ease-in-out infinite;
                border-radius: 2px;
            }

            #qs-footer {
                padding: 20px;
                padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
                background: linear-gradient(0deg, #0a0a14 0%, transparent 100%);
                text-align: center;
                color: #fff;
                font-size: 0.85rem;
                opacity: 0.85;
                position: relative;
                z-index: 3;
                line-height: 1.5;
            }
            #qs-footer .qs-hint {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin-bottom: 6px;
            }
            #qs-footer .qs-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #6C63FF;
                box-shadow: 0 0 8px #6C63FF;
                animation: qsPulse 1.5s ease-in-out infinite;
                flex-shrink: 0;
            }

            /* Состояние загрузки */
            .qs-loading {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                color: #fff;
                text-align: center;
            }
            .qs-spinner {
                width: 48px;
                height: 48px;
                border: 3px solid rgba(108, 99, 255, 0.25);
                border-top-color: #6C63FF;
                border-radius: 50%;
                animation: qsSpin 0.8s linear infinite;
                margin-bottom: 16px;
            }
            .qs-loading-text {
                font-size: 0.9rem;
                opacity: 0.75;
            }

            /* Состояние ошибки */
            .qs-error {
                text-align: center;
                color: #fff;
                padding: 30px 24px;
                max-width: 380px;
            }
            .qs-error-icon {
                font-size: 4rem;
                margin-bottom: 16px;
                display: inline-block;
                filter: drop-shadow(0 4px 12px rgba(231, 76, 60, 0.5));
            }
            .qs-error-title {
                font-size: 1.2rem;
                font-weight: 800;
                margin: 0 0 12px 0;
                color: #fff;
            }
            .qs-error-text {
                font-size: 0.9rem;
                opacity: 0.75;
                line-height: 1.6;
                margin: 0 0 20px 0;
            }
            .qs-error-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 12px 26px;
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff;
                border: none;
                border-radius: 24px;
                font-weight: 700;
                font-size: 0.9rem;
                cursor: pointer;
                font-family: inherit;
                transition: all 0.25s;
                box-shadow: 0 8px 20px -4px rgba(108, 99, 255, 0.5);
                text-decoration: none;
            }
            .qs-error-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 28px -4px rgba(108, 99, 255, 0.6);
            }

            /* Успешное сканирование */
            .qs-success {
                position: absolute;
                inset: 0;
                background: rgba(39, 174, 96, 0.9);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #fff;
                z-index: 10;
                animation: qsFadeIn 0.3s ease;
                border-radius: 16px;
            }
            .qs-success-icon {
                font-size: 5rem;
                margin-bottom: 16px;
                animation: qsSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .qs-success-text {
                font-size: 1.3rem;
                font-weight: 800;
            }

            /* Кнопка на /login/, /register/ */
            #qs-scan-btn {
                width: 100%;
                padding: 14px 20px;
                margin-top: 12px;
                background: linear-gradient(135deg, #f0f4ff, #e5ecff);
                color: #6C63FF;
                border: 2px dashed #6C63FF;
                border-radius: 12px;
                font-size: 0.92rem;
                font-weight: 700;
                cursor: pointer;
                font-family: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                -webkit-tap-highlight-color: transparent;
            }
            #qs-scan-btn:hover,
            #qs-scan-btn:active {
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff;
                border-style: solid;
                border-color: #6C63FF;
                transform: translateY(-2px);
                box-shadow: 0 8px 20px -4px rgba(108, 99, 255, 0.5);
            }
            #qs-scan-btn .qs-btn-icon {
                font-size: 1.15rem;
                line-height: 1;
            }

            @media (prefers-reduced-motion: reduce) {
                #qs-overlay,
                #qs-scan-btn,
                #qs-header .qs-title .qs-icon,
                #qs-footer .qs-dot,
                #qs-scanline {
                    animation: none !important;
                }
            }

            /* Тёмная тема */
            body.mars-stars-on #qs-scan-btn {
                background: rgba(108, 99, 255, 0.15);
                color: #A29BFE;
                border-color: rgba(162, 155, 254, 0.5);
            }
            body.mars-stars-on #qs-scan-btn:hover {
                background: linear-gradient(135deg, #6C63FF, #A29BFE);
                color: #fff;
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🖼️ Создание оверлея
    // ============================================================
    function createOverlay() {
        var old = document.getElementById('qs-overlay');
        if (old) old.remove();

        var overlay = document.createElement('div');
        overlay.id = 'qs-overlay';
        overlay.innerHTML =
            '<div id="qs-header">' +
            '  <div class="qs-title">' +
            '    <span class="qs-icon">📷</span>' +
            '    <span>Сканер QR-кода</span>' +
            '  </div>' +
            '  <button id="qs-close" type="button" aria-label="Закрыть">✕</button>' +
            '</div>' +
            '<div id="qs-viewport">' +
            '  <div id="qs-reader-target"></div>' +
            '  <div id="qs-frame" class="">' +
            '    <div class="qs-corner tr"></div>' +
            '    <div class="qs-corner bl"></div>' +
            '    <div id="qs-scanline"></div>' +
            '  </div>' +
            '  <div id="qs-loading-state" class="qs-loading">' +
            '    <div class="qs-spinner"></div>' +
            '    <div class="qs-loading-text">Запуск камеры...</div>' +
            '  </div>' +
            '</div>' +
            '<div id="qs-footer">' +
            '  <div class="qs-hint"><span class="qs-dot"></span><span>Наведите камеру на QR-код</span></div>' +
            '  <div>Код будет распознан автоматически</div>' +
            '</div>';

        document.body.appendChild(overlay);

        // Закрытие
        overlay.querySelector('#qs-close').onclick = window.qsClose;
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                window.qsClose();
                document.removeEventListener('keydown', escHandler);
            }
        });

        return overlay;
    }

    // ============================================================
    // 🖼️ Показать состояние загрузки
    // ============================================================
    function showLoading(overlay, text) {
        var viewport = overlay.querySelector('#qs-viewport');
        var loading = overlay.querySelector('#qs-loading-state');
        var reader = overlay.querySelector('#qs-reader-target');
        var frame = overlay.querySelector('#qs-frame');

        if (loading) loading.style.display = 'flex';
        if (reader) reader.style.display = 'none';
        if (frame) frame.classList.remove('active');

        if (loading) {
            var txt = loading.querySelector('.qs-loading-text');
            if (txt && text) txt.textContent = text;
        }
    }

    // ============================================================
    // 🖼️ Показать видео + рамку
    // ============================================================
    function showReader(overlay) {
        var loading = overlay.querySelector('#qs-loading-state');
        var reader = overlay.querySelector('#qs-reader-target');
        var frame = overlay.querySelector('#qs-frame');

        if (loading) loading.style.display = 'none';
        if (reader) reader.style.display = 'block';
        if (frame) frame.classList.add('active');
    }

    // ============================================================
    // 🖼️ Показать ошибку
    // ============================================================
    function showError(overlay, icon, title, text, buttonText, buttonAction) {
        var viewport = overlay.querySelector('#qs-viewport');
        var reader = overlay.querySelector('#qs-reader-target');
        var frame = overlay.querySelector('#qs-frame');
        var loading = overlay.querySelector('#qs-loading-state');

        if (reader) reader.style.display = 'none';
        if (frame) frame.classList.remove('active');
        if (loading) loading.style.display = 'none';

        var errBox = viewport.querySelector('.qs-error');
        if (errBox) errBox.remove();

        var div = document.createElement('div');
        div.className = 'qs-error';
        div.innerHTML =
            '<div class="qs-error-icon">' + icon + '</div>' +
            '<h2 class="qs-error-title">' + title + '</h2>' +
            '<p class="qs-error-text">' + text + '</p>' +
            (buttonText ? '<button class="qs-error-btn" type="button" id="qs-error-action">' + buttonText + '</button>' : '');

        viewport.appendChild(div);

        var btn = div.querySelector('#qs-error-action');
        if (btn && buttonAction) btn.onclick = buttonAction;
    }

    // ============================================================
    // ✅ Обработка успешного сканирования
    // ============================================================
    function onScanSuccess(overlay, decodedText) {
        console.log('📷 QR отсканирован:', decodedText);

        // Вибрация
        try { if (navigator.vibrate) navigator.vibrate([100, 50, 100]); } catch(e) {}

        // Показываем галочку успеха
        var viewport = overlay.querySelector('#qs-viewport');
        var success = document.createElement('div');
        success.className = 'qs-success';
        success.innerHTML =
            '<div class="qs-success-icon">✅</div>' +
            '<div class="qs-success-text">Код распознан!</div>';
        viewport.appendChild(success);

        // Останавливаем сканер
        if (window._qsScanner) {
            try { window._qsScanner.stop(); } catch(e) {}
        }

        // Переходим по ссылке через 800мс
        setTimeout(function() {
            try {
                var url = new URL(decodedText);
                var ourHost = window.location.hostname;
                var allowedHosts = [ourHost, 'mars-wiki.ru', 'www.mars-wiki.ru'];

                if (allowedHosts.indexOf(url.hostname) !== -1) {
                    window.location.href = decodedText;
                } else {
                    // Чужой домен
                    window.qsClose();
                    if (window.showExperienceToast) {
                        window.showExperienceToast('QR не с нашего сайта');
                    } else {
                        alert('QR-код с другого сайта: ' + url.hostname);
                    }
                }
            } catch (e) {
                // Не URL — показываем текст
                window.qsClose();
                if (window.showExperienceToast) {
                    window.showExperienceToast('Код: ' + decodedText.substring(0, 50));
                } else {
                    alert('Распознан код: ' + decodedText);
                }
            }
        }, 800);
    }

    // ============================================================
    // 🚀 Открыть сканер
    // ============================================================
    window.qsOpenScanner = function() {
        injectStyles();
        var overlay = createOverlay();
        showLoading(overlay, 'Загрузка библиотеки...');

        loadScannerLib().then(function(loaded) {
            if (!loaded) {
                showError(
                    overlay,
                    '📡',
                    'Нет подключения',
                    'Не удалось загрузить библиотеку сканера. Проверьте интернет и попробуйте снова.',
                    'Повторить',
                    function() {
                        loadPromise = null;
                        window.qsClose();
                        setTimeout(window.qsOpenScanner, 300);
                    }
                );
                return;
            }

            showLoading(overlay, 'Запуск камеры...');

            var reader = overlay.querySelector('#qs-reader-target');
            if (!reader) return;

            setTimeout(function() {
                try {
                    var scanner = new window.Html5Qrcode('qs-reader-target', { verbose: false });
                    window._qsScanner = scanner;

                    scanner.start(
                        { facingMode: 'environment' },
                        {
                            fps: 10,
                            qrbox: function(viewfinderWidth, viewfinderHeight) {
                                var size = Math.min(viewfinderWidth, viewfinderHeight);
                                return { width: Math.floor(size * 0.75), height: Math.floor(size * 0.75) };
                            },
                            aspectRatio: 1.0
                        },
                        function(decodedText) {
                            onScanSuccess(overlay, decodedText);
                        },
                        function() { /* игнорируем промежуточные ошибки */ }
                    ).then(function() {
                        showReader(overlay);
                    }).catch(function(err) {
                        console.error('qr-scanner error:', err);
                        var msg = (err && err.message) || String(err);
                        var isPermission = /permission|denied|NotAllowed/i.test(msg);
                        var isNotFound = /NotFound|no camera|Requested device not found/i.test(msg);

                        if (isPermission) {
                            showError(
                                overlay,
                                '🔒',
                                'Нет доступа к камере',
                                'Разрешите доступ к камере в настройках браузера и обновите страницу.',
                                null,
                                null
                            );
                        } else if (isNotFound) {
                            showError(
                                overlay,
                                '📵',
                                'Камера не найдена',
                                'На этом устройстве не обнаружена камера. Попробуйте открыть сайт с телефона.',
                                null,
                                null
                            );
                        } else {
                            showError(
                                overlay,
                                '⚠️',
                                'Ошибка камеры',
                                msg,
                                'Закрыть',
                                window.qsClose
                            );
                        }
                    });
                } catch(e) {
                    console.error('qr-scanner init error:', e);
                    showError(
                        overlay,
                        '⚠️',
                        'Ошибка инициализации',
                        e.message || 'Неизвестная ошибка',
                        'Закрыть',
                        window.qsClose
                    );
                }
            }, 200);
        });
    };

    // ============================================================
    // 🛑 Закрыть сканер
    // ============================================================
    window.qsClose = function() {
        if (window._qsScanner) {
            try { window._qsScanner.stop().catch(function(){}); } catch(e) {}
            try { window._qsScanner.clear(); } catch(e) {}
            window._qsScanner = null;
        }
        var overlay = document.getElementById('qs-overlay');
        if (overlay) {
            overlay.style.animation = 'qsFadeIn 0.25s ease reverse';
            setTimeout(function() { overlay.remove(); }, 250);
        }
    };

    // ============================================================
    // 🔘 Кнопка на /login/, /register/
    // ============================================================
    function addScannerButton() {
        if (document.getElementById('qs-scan-btn')) return true;

        var loginForm = document.querySelector('#form-login, #login-form, form[data-form="login"]');
        var registerForm = document.querySelector('#form-register, form[data-form="register"]');
        var targetForm = loginForm || registerForm;

        if (!targetForm) return false;

        var btn = document.createElement('button');
        btn.id = 'qs-scan-btn';
        btn.type = 'button';
        btn.innerHTML = '<span class="qs-btn-icon">📷</span><span>Войти через QR с ПК</span>';
        btn.onclick = window.qsOpenScanner;
        targetForm.appendChild(btn);

        console.log('✅ qr-scanner: кнопка добавлена');
        return true;
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function start() {
        injectStyles();

        // Пробуем добавить кнопку сразу
        if (addScannerButton()) return;

        // Если формы ещё нет — ждём до 15 сек
        var attempts = 0;
        var iv = setInterval(function() {
            attempts++;
            if (addScannerButton()) {
                clearInterval(iv);
                return;
            }
            if (attempts > 30) clearInterval(iv);
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    // ============================================================
    // 🌐 Публичное API для профиля
    // ============================================================
    window.marsQrScanner = {
        open: window.qsOpenScanner,
        close: window.qsClose,
        isMobile: isMobile()
    };

    console.log('✅ qr-scanner.js v2 VIP готов', isMobile() ? '(мобильный)' : '');
})();
