// qr-scanner.js — сканер QR-кода (только на мобильных)
(function() {
    'use strict';

    // Определяем мобильное устройство
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    if (!isMobile) return; // На ПК не показываем

    // ============================================================
    // Загрузка библиотеки сканера
    // ============================================================
    function loadScannerLib(cb) {
        if (window.Html5Qrcode) { cb(); return; }
        const s = document.createElement('script');
        s.src = 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';
        s.onload = cb;
        document.head.appendChild(s);
    }

    // ============================================================
    // Открыть сканер
    // ============================================================
    window.qsOpenScanner = function() {
        loadScannerLib(() => {
            const overlay = document.createElement('div');
            overlay.id = 'qs-overlay';
            overlay.style.cssText = `
                position: fixed; inset: 0; z-index: 999999;
                background: #000;
                display: flex; flex-direction: column;
                animation: qsFadeIn 0.3s ease;
            `;
            overlay.innerHTML = `
                <div style="
                    padding: 16px 20px;
                    background: linear-gradient(135deg, #1a1a2e, #16213e);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: max(16px, env(safe-area-inset-top));
                ">
                    <div style="font-weight: 700; font-size: 1rem;">📷 Наведите на QR-код</div>
                    <button onclick="qsClose()" style="
                        width: 40px; height: 40px; border-radius: 50%;
                        background: rgba(255,255,255,0.15);
                        border: none; color: #fff;
                        font-size: 20px; cursor: pointer;
                        display: flex; align-items: center; justify-content: center;
                    ">✕</button>
                </div>
                <div id="qs-reader" style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 20px;">
                    <div style="color: #fff; text-align: center;">
                        <div style="display:inline-block;width:48px;height:48px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:qsSpin 0.8s linear infinite;"></div>
                        <p style="margin-top: 16px; opacity: 0.7;">Запуск камеры...</p>
                    </div>
                </div>
                <div style="padding: 24px 20px; padding-bottom: max(24px, env(safe-area-inset-bottom)); background: linear-gradient(0deg, #1a1a2e, transparent); text-align: center; color: #fff; font-size: 0.85rem; opacity: 0.8;">
                    <p style="margin: 0;">Сканер автоматически распознает код<br>и перейдёт на нужную страницу</p>
                </div>
            `;
            document.body.appendChild(overlay);

            // Запускаем сканер
            const reader = overlay.querySelector('#qs-reader');
            reader.innerHTML = '<div id="qs-reader-target" style="width:100%;max-width:400px;"></div>';

            const scanner = new window.Html5Qrcode('qs-reader-target');

            window._qsScanner = scanner;

            scanner.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decodedText) => {
                    // Найден QR-код
                    console.log('📷 QR:', decodedText);
                    qsClose();

                    // Вибрация
                    if (navigator.vibrate) navigator.vibrate(200);

                    // Переходим по ссылке
                    try {
                        const url = new URL(decodedText);
                        // Разрешаем только наш домен
                        if (url.hostname === window.location.hostname || url.hostname === 'mars-wiki.ru') {
                            window.location.href = decodedText;
                        } else {
                            alert('QR-код не с нашего сайта: ' + url.hostname);
                        }
                    } catch (e) {
                        // Не URL — просто текст
                        alert('Распознан код: ' + decodedText);
                    }
                },
                (error) => { /* Игнорируем ошибки распознавания */ }
            ).catch(err => {
                console.error('Ошибка камеры:', err);
                reader.innerHTML = `
                    <div style="color:#fff;text-align:center;padding:20px;">
                        <div style="font-size:3rem;margin-bottom:12px;">📷</div>
                        <p style="margin:0 0 16px 0;">Не удалось получить доступ к камере</p>
                        <p style="margin:0;font-size:0.85rem;opacity:0.7;">Разрешите доступ к камере в настройках браузера</p>
                    </div>
                `;
            });
        });
    };

    window.qsClose = function() {
        if (window._qsScanner) {
            try { window._qsScanner.stop(); } catch (e) {}
            window._qsScanner = null;
        }
        const overlay = document.getElementById('qs-overlay');
        if (overlay) overlay.remove();
    };

    // ============================================================
    // Добавляем кнопку сканера на страницу логина (на мобильных)
    // ============================================================
    function addScannerButton() {
        const tryAdd = setInterval(() => {
            // Ищем на странице входа или регистрации
            const loginForm = document.querySelector('#form-login') || document.querySelector('#login-form');
            const registerForm = document.querySelector('#form-register');

            if (!loginForm && !registerForm) return;
            if (document.getElementById('qs-scan-btn')) {
                clearInterval(tryAdd);
                return;
            }

            const targetForm = loginForm || registerForm;
            if (!targetForm) return;

            const btn = document.createElement('button');
            btn.id = 'qs-scan-btn';
            btn.type = 'button';
            btn.innerHTML = '📷 Сканировать QR с ПК';
            btn.style.cssText = `
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
                transition: all 0.25s;
            `;
            btn.onclick = window.qsOpenScanner;

            targetForm.appendChild(btn);
            clearInterval(tryAdd);
        }, 500);

        setTimeout(() => clearInterval(tryAdd), 15000);
    }

    // CSS для анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes qsFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes qsSpin { to { transform: rotate(360deg); } }
        #qs-reader video { border-radius: 16px; }
    `;
    document.head.appendChild(style);

    // Запускаем добавление кнопки
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addScannerButton);
    } else {
        addScannerButton();
    }
})();
