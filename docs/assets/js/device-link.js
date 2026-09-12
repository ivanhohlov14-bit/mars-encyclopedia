// device-link.js — QR-привязка второго устройства (с fallback CDN)
(function() {
    'use strict';

    console.log('📱 device-link.js загружается...');

    // ============================================================
    // Генерация случайного кода
    // ============================================================
    function generateCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 12; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    // ============================================================
    // ЗАГРУЗКА QR-БИБЛИОТЕКИ С FALLBACK
    // Пробуем несколько CDN по очереди
    // ============================================================
    const QR_CDNS = [
        'https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
        'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js',
        'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'
    ];

    let currentCdnIndex = 0;

    function loadQR(cb) {
        // Если уже загружено — сразу вызываем
        if (window.QRCode && window.QRCode.toCanvas) { cb(); return; }
        if (window.QRCode && window.QRCode.toDataURL) { cb(); return; }

        // Пробуем по очереди
        function tryNext() {
            if (currentCdnIndex >= QR_CDNS.length) {
                console.error('❌ Все CDN для QR недоступны');
                // Fallback: рисуем "ручной" QR с URL через простой генератор
                if (window.QRCodeGenerator) { cb(); return; }
                alert(
                    '⚠️ Не удалось загрузить библиотеку QR-кодов.\n\n' +
                    'Возможные причины:\n' +
                    '• Провайдер блокирует CDN\n' +
                    '• Нет доступа к интернету\n\n' +
                    'Попробуйте:\n' +
                    '1. Обновить страницу (Ctrl+Shift+R)\n' +
                    '2. Включить VPN\n' +
                    '3. Использовать ручную ссылку (она будет показана ниже)'
                );
                cb(true); // передаём флаг "ошибка"
                return;
            }

            const url = QR_CDNS[currentCdnIndex];
            currentCdnIndex++;
            console.log('🔄 Пробуем загрузить QR с:', url);

            const s = document.createElement('script');
            s.src = url;
            s.onload = () => {
                console.log('✅ QR-библиотека загружена:', url);
                cb();
            };
            s.onerror = () => {
                console.warn('⚠️ Не удалось:', url);
                tryNext();
            };
            // Таймаут на загрузку (10 секунд)
            setTimeout(() => {
                if (!window.QRCode && currentCdnIndex <= QR_CDNS.length) {
                    tryNext();
                }
            }, 10000);
            document.head.appendChild(s);
        }

        tryNext();
    }

    // ============================================================
    // Универсальная функция рисования QR
    // ============================================================
    function drawQR(container, url, size = 220) {
        container.innerHTML = '';

        // Вариант 1: qrcode (npm) — рисует в canvas
        if (window.QRCode && window.QRCode.toCanvas) {
            const canvas = document.createElement('canvas');
            container.appendChild(canvas);
            return new Promise((resolve, reject) => {
                window.QRCode.toCanvas(canvas, url, {
                    width: size,
                    margin: 2,
                    color: { dark: '#1a1a1a', light: '#ffffff' }
                }, (err) => {
                    if (err) { reject(err); } else { resolve(); }
                });
            });
        }

        // Вариант 2: qrcodejs (davidshimjs) — рисует в div
        if (window.QRCode && window.QRCode.CorrectLevel) {
            const div = document.createElement('div');
            div.style.cssText = `width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;`;
            container.appendChild(div);
            new window.QRCode(div, {
                text: url,
                width: size,
                height: size,
                colorDark: '#1a1a1a',
                colorLight: '#ffffff',
                correctLevel: window.QRCode.CorrectLevel.M
            });
            return Promise.resolve();
        }

        // Вариант 3: Ручной fallback — показываем ссылку
        container.innerHTML = `
            <div style="
                padding: 20px;
                background: #fff;
                border: 2px dashed #6C63FF;
                border-radius: 12px;
                text-align: center;
                max-width: 250px;
            ">
                <div style="font-size: 2rem; margin-bottom: 8px;">🔗</div>
                <div style="font-size: 0.8rem; color: #888; margin-bottom: 8px;">
                    Откройте эту ссылку на телефоне:
                </div>
                <div style="
                    font-family: 'Courier New', monospace;
                    font-size: 0.7rem;
                    color: #6C63FF;
                    font-weight: 700;
                    word-break: break-all;
                    background: #f0f4ff;
                    padding: 8px;
                    border-radius: 6px;
                ">${url}</div>
            </div>
        `;
        return Promise.resolve();
    }

    // ============================================================
    // Ожидание клиента
    // ============================================================
    function waitForClient(cb, attempts = 0) {
        if (window.supabaseClient && window.marsSession) {
            cb(window.supabaseClient, window.marsSession);
        } else if (attempts < 50) {
            setTimeout(() => waitForClient(cb, attempts + 1), 100);
        } else {
            console.error('❌ device-link: клиент не загрузился');
        }
    }

    // ============================================================
    // ОСНОВНАЯ ФУНКЦИЯ — открыть QR-модалку
    // ============================================================
    window.dlOpenQR = async function() {
        console.log('📱 Открываем QR-модалку...');

        const client = window.supabaseClient;
        if (!client) {
            alert('Клиент Supabase не загружен. Обновите страницу.');
            return;
        }

        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) {
            alert('Сначала войдите в аккаунт');
            return;
        }

        console.log('👤 Пользователь:', session.user.email);

        const code = generateCode();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

        const { error: insertError } = await client.from('device_links').insert({
            code: code,
            status: 'pending',
            user_id: session.user.id,
            expires_at: expiresAt
        });

        if (insertError) {
            console.error('❌ Ошибка создания ссылки:', insertError);
            alert('Ошибка: ' + insertError.message);
            return;
        }

        console.log('✅ Код создан:', code);

        // ============================================================
        // СОЗДАЁМ МОДАЛКУ СРАЗУ (без ожидания QR-библиотеки)
        // ============================================================
        const baseUrl = window.location.origin + '/link-device/';
        const url = baseUrl + '?code=' + code;

        const overlay = document.createElement('div');
        overlay.id = 'dl-overlay';
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 999999;
            background: rgba(0,0,0,0.75);
            backdrop-filter: blur(10px);
            display: flex; align-items: center; justify-content: center;
            padding: 20px;
            animation: dlFadeIn 0.3s ease;
            overflow-y: auto;
        `;
        overlay.innerHTML = `
            <style>
                @keyframes dlFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes dlSlideUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes dlSpin { to { transform: rotate(360deg); } }
            </style>
            <div style="
                background: #fff;
                max-width: 440px; width: 100%;
                padding: 32px 28px;
                border-radius: 24px;
                text-align: center;
                position: relative;
                box-shadow: 0 30px 80px rgba(0,0,0,0.5);
                animation: dlSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                max-height: 90vh;
                overflow-y: auto;
            ">
                <button id="dl-close-btn" style="
                    position:absolute;top:14px;right:16px;
                    width:34px;height:34px;border-radius:50%;
                    background:rgba(0,0,0,0.05);border:none;
                    font-size:18px;cursor:pointer;color:#666;
                    display:flex;align-items:center;justify-content:center;
                ">✕</button>

                <div style="font-size:3rem;margin-bottom:8px;">📱</div>
                <h2 style="margin:0 0 8px 0;color:#1a1a2e;font-size:1.4rem;font-weight:800;">
                    Привязать устройство
                </h2>
                <p style="margin:0 0 20px 0;color:#888;font-size:0.9rem;line-height:1.5;">
                    Откройте камеру на телефоне и наведите на QR-код
                </p>

                <!-- Контейнер QR (сначала спиннер) -->
                <div id="dl-qr-container" style="
                    padding: 20px;
                    background: linear-gradient(135deg, #f8f9fb, #eef0f5);
                    border-radius: 20px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 260px;
                    min-height: 260px;
                ">
                    <div style="text-align:center;color:#888;">
                        <div style="
                            width:40px;height:40px;margin:0 auto 12px auto;
                            border:3px solid #6C63FF;
                            border-top-color:transparent;
                            border-radius:50%;
                            animation:dlSpin 0.8s linear infinite;
                        "></div>
                        <div style="font-size:0.85rem;">Генерация QR...</div>
                    </div>
                </div>

                <!-- Код вручную -->
                <div style="
                    padding: 12px 16px;
                    background: #f0f4ff;
                    border-radius: 12px;
                    margin-bottom: 12px;
                    font-size: 0.85rem;
                    color: #4a5568;
                    font-family: 'Courier New', monospace;
                    font-weight: 700;
                    letter-spacing: 2px;
                ">
                    Код: <span style="color:#6C63FF;">${code}</span>
                </div>

                <div id="dl-status" style="
                    padding: 12px;
                    border-radius: 10px;
                    background: #fff8e1;
                    color: #856404;
                    font-size: 0.85rem;
                    font-weight: 600;
                    transition: all 0.3s;
                ">
                    ⏳ Ожидание сканирования...
                </div>

                <div style="margin-top:16px;font-size:0.78rem;color:#999;">
                    Ссылка действует 5 минут
                </div>

                <!-- Fallback: ручная ссылка -->
                <details style="margin-top:16px;text-align:left;font-size:0.82rem;color:#888;">
                    <summary style="cursor:pointer;user-select:none;">📝 Не работает камера?</summary>
                    <p style="margin:8px 0 0 0;line-height:1.6;">
                        Откройте на телефоне ссылку:
                        <code style="
                            background:#f0f4ff;padding:6px 10px;
                            border-radius:6px;font-size:0.75rem;
                            word-break:break-all;display:inline-block;
                            margin-top:6px;color:#6C63FF;font-weight:700;
                        ">${url}</code>
                    </p>
                </details>
            </div>
        `;
        document.body.appendChild(overlay);

        // ============================================================
        // Закрытие
        // ============================================================
        const closeModal = async () => {
            try {
                await client.from('device_links').delete().eq('code', code);
            } catch(e) {}
            if (window._dlChannel) {
                window._dlChannel.unsubscribe();
                window._dlChannel = null;
            }
            overlay.remove();
        };
        overlay.querySelector('#dl-close-btn').onclick = closeModal;
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // ============================================================
        // РИСУЕМ QR (с fallback)
        // ============================================================
        const qrContainer = overlay.querySelector('#dl-qr-container');

        loadQR(async (hasError) => {
            if (hasError) {
                // Не удалось загрузить библиотеку — показываем ссылку
                qrContainer.innerHTML = `
                    <div style="
                        padding: 16px;
                        text-align: center;
                        color: #c0392b;
                        font-size: 0.85rem;
                    ">
                        <div style="font-size:2rem;margin-bottom:8px;">⚠️</div>
                        <div>QR не загрузился</div>
                        <div style="color:#888;margin-top:8px;font-size:0.8rem;">
                            Скопируйте ссылку из блока ниже
                        </div>
                    </div>
                `;
                return;
            }

            try {
                await drawQR(qrContainer, url, 220);
                console.log('✅ QR нарисован');
            } catch (err) {
                console.error('❌ Ошибка рисования QR:', err);
                qrContainer.innerHTML = `
                    <div style="padding:16px;text-align:center;color:#c0392b;font-size:0.85rem;">
                        Ошибка генерации QR. Используйте ссылку ниже.
                    </div>
                `;
            }
        });

        // ============================================================
        // REALTIME-ПОДПИСКА
        // ============================================================
        const channel = client
            .channel('device-link-' + code)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'device_links',
                filter: `code=eq.${code}`
            }, async (payload) => {
                console.log('📡 Realtime:', payload.new.status);

                if (payload.new.status === 'approved' && payload.new.access_token) {
                    const statusEl = overlay.querySelector('#dl-status');
                    if (statusEl) {
                        statusEl.innerHTML = '✅ Устройство привязано!<br>Синхронизация...';
                        statusEl.style.background = '#e8f5e9';
                        statusEl.style.color = '#2e7d32';
                    }

                    try {
                        const { error } = await client.auth.setSession({
                            access_token: payload.new.access_token,
                            refresh_token: payload.new.refresh_token
                        });

                        if (error) {
                            console.error('❌ Ошибка setSession:', error);
                            return;
                        }

                        console.log('✅ Сессия синхронизирована');
                        await client.from('device_links').delete().eq('code', code);

                        setTimeout(() => window.location.reload(), 1200);
                    } catch (e) {
                        console.error('Ошибка синхронизации:', e);
                    }
                }
            })
            .subscribe((status) => {
                console.log('📡 Realtime статус:', status);
            });

        window._dlChannel = channel;

        // ============================================================
        // ТАЙМЕР НА 5 МИНУТ
        // ============================================================
        setTimeout(async () => {
            const statusEl = overlay.querySelector('#dl-status');
            if (statusEl && overlay.parentNode) {
                statusEl.textContent = '⏰ Ссылка истекла';
                statusEl.style.background = '#fff5f5';
                statusEl.style.color = '#991b1b';
                try {
                    await client.from('device_links').delete().eq('code', code);
                } catch(e) {}
            }
        }, 5 * 60 * 1000);
    };

    window.dlCancel = function() {
        if (window._dlChannel) {
            window._dlChannel.unsubscribe();
            window._dlChannel = null;
        }
    };

    // Экспорт
    window.pfOpenQR = window.dlOpenQR;

    waitForClient(() => {
        console.log('✅ device-link.js готов');
    });
})();
