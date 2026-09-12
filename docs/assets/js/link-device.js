// link-device.js — генерация QR-кода для быстрого входа с телефона
(function() {
    'use strict';

    // Ждём готовности клиента
    function waitForClient(cb, attempts = 0) {
        if (window.supabaseClient && window.marsSession?.ready) {
            cb(window.marsSession);
        } else if (attempts < 50) {
            setTimeout(() => waitForClient(cb, attempts + 1), 100);
        }
    }

    // Загружаем библиотеку QR-кодов динамически
    function loadQRCodeLib(cb) {
        if (window.QRCode) { cb(); return; }
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
        s.onload = cb;
        document.head.appendChild(s);
    }

    // Открываем модалку с QR
    function openQRModal(email) {
        loadQRCodeLib(() => {
            const baseUrl = window.location.origin + '/mars-encyclopedia/login/';
            const loginUrl = baseUrl + '?email=' + encodeURIComponent(email);

            const overlay = document.createElement('div');
            overlay.id = 'link-device-overlay';
            overlay.style.cssText = `
                position: fixed; inset: 0; z-index: 999999;
                background: rgba(0,0,0,0.7);
                backdrop-filter: blur(8px);
                display: flex; align-items: center; justify-content: center;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            `;
            overlay.innerHTML = `
                <div style="
                    background: #fff;
                    max-width: 420px; width: 100%;
                    padding: 32px 28px;
                    border-radius: 24px;
                    text-align: center;
                    position: relative;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.5);
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                ">
                    <button onclick="this.closest('#link-device-overlay').remove()" style="
                        position: absolute; top: 14px; right: 16px;
                        width: 32px; height: 32px; border-radius: 50%;
                        background: rgba(0,0,0,0.05); border: none;
                        font-size: 18px; cursor: pointer; color: #666;
                    ">✕</button>

                    <div style="font-size: 3rem; margin-bottom: 8px;">📱</div>
                    <h2 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 1.4rem;">Вход с другого устройства</h2>
                    <p style="margin: 0 0 20px 0; color: #888; font-size: 0.9rem;">
                        Наведи камеру телефона на код — откроется страница входа
                    </p>

                    <div id="qr-container" style="
                        display: flex; align-items: center; justify-content: center;
                        padding: 20px;
                        background: #fafafa;
                        border-radius: 16px;
                        margin-bottom: 16px;
                    "></div>

                    <div style="
                        background: #f0f4ff;
                        padding: 12px 16px;
                        border-radius: 12px;
                        margin-bottom: 16px;
                        font-size: 0.85rem;
                        color: #4a5568;
                    ">
                        <b>Ваш email:</b><br>
                        <span style="color: #6C63FF; font-weight: 700;">${email}</span>
                    </div>

                    <div style="
                        background: #fff8e1;
                        padding: 10px 14px;
                        border-radius: 10px;
                        font-size: 0.8rem;
                        color: #856404;
                        text-align: left;
                        border-left: 3px solid #f39c12;
                    ">
                        💡 После сканирования введите свой пароль от аккаунта
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            // Генерируем QR
            const qrContainer = overlay.querySelector('#qr-container');
            const canvas = document.createElement('canvas');
            qrContainer.appendChild(canvas);

            window.QRCode.toCanvas(canvas, loginUrl, {
                width: 220,
                margin: 2,
                color: { dark: '#1a1a1a', light: '#ffffff' },
                errorCorrectionLevel: 'M'
            }, (err) => {
                if (err) console.error('QR ошибка:', err);
            });

            // Закрытие по клику на фон
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.remove();
            });

            // Закрытие по Esc
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    overlay.remove();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        });
    }

    // Добавляем кнопку в профиль
    function addButtonToProfile(session) {
        if (!session.user) return;

        // Ждём, пока загрузится профиль
        const tryAdd = setInterval(() => {
            // Ищем любое место в профиле — например, блок "Опасная зона"
            const dangerZone = document.querySelector('#profile-container');

            // Ищем раздел "Настройки" или добавляем после основного блока
            const settings = document.querySelector('.pf-tab[data-tab="settings"]') ||
                             document.querySelector('[data-content="settings"]');

            // Или добавим кнопку в hero-блок рядом с основными действиями
            const hero = document.querySelector('.pf-hero-content') ||
                         document.querySelector('#profile-container .pf-quick-grid') ||
                         document.querySelector('#profile-container');

            if (!hero) return;
            if (document.getElementById('link-device-btn')) {
                clearInterval(tryAdd);
                return;
            }

            const btn = document.createElement('button');
            btn.id = 'link-device-btn';
            btn.innerHTML = '📱 Войти с телефона';
            btn.style.cssText = `
                display: inline-flex; align-items: center; gap: 8px;
                padding: 12px 22px;
                margin: 10px 0;
                border-radius: 30px;
                border: 2px solid #6C63FF;
                background: transparent;
                color: #6C63FF;
                font-size: 0.9rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.25s;
                font-family: inherit;
            `;
            btn.onmouseenter = () => {
                btn.style.background = '#6C63FF';
                btn.style.color = '#fff';
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 8px 20px rgba(108,99,255,0.4)';
            };
            btn.onmouseleave = () => {
                btn.style.background = 'transparent';
                btn.style.color = '#6C63FF';
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
            };
            btn.onclick = () => openQRModal(session.user.email);

            // Вставляем после quick-grid если есть, иначе просто в контейнер
            const quickGrid = document.querySelector('.pf-quick-grid');
            if (quickGrid && quickGrid.parentNode) {
                quickGrid.parentNode.insertBefore(btn, quickGrid.nextSibling);
            } else {
                hero.appendChild(btn);
            }

            clearInterval(tryAdd);
        }, 500);

        // Таймаут — перестаём искать через 10 сек
        setTimeout(() => clearInterval(tryAdd), 10000);
    }

    // Запуск
    waitForClient(addButtonToProfile);
})();
