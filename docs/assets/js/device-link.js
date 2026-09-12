// device-link.js — QR-привязка второго устройства
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
    // Загрузка QR-библиотеки
    // ============================================================
    function loadQR(cb) {
        if (window.QRCode) { cb(); return; }
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
        s.onload = () => {
            console.log('✅ QR-библиотека загружена');
            cb();
        };
        s.onerror = () => {
            console.error('❌ Не удалось загрузить QR-библиотеку');
            alert('Ошибка загрузки QR-библиотеки. Проверьте интернет.');
        };
        document.head.appendChild(s);
    }

    // ============================================================
    // Ожидание готовности клиента
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
    // Показать модалку с QR (на ПК)
    // ============================================================
    window.dlOpenQR = async function() {
        console.log('📱 Открываем QR-модалку...');

        const client = window.supabaseClient;
        if (!client) {
            alert('Клиент Supabase не загружен. Обновите страницу.');
            return;
        }

        // Проверяем сессию
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) {
            alert('Сначала войдите в аккаунт');
            return;
        }

        console.log('👤 Пользователь:', session.user.email);

        // Генерируем код
        const code = generateCode();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

        // Создаём запись в БД
        const { error: insertError } = await client.from('device_links').insert({
            code: code,
            status: 'pending',
            user_id: session.user.id,
            expires_at: expiresAt
        });

        if (insertError) {
            console.error('❌ Ошибка создания ссылки:', insertError);
            alert('Ошибка: ' + insertError.message + '\n\nПроверьте, что таблица device_links создана в Supabase.');
            return;
        }

        console.log('✅ Код создан:', code);

        // Показываем модалку
        loadQR(() => {
            // Формируем URL для QR
            const baseUrl = window.location.origin + '/link-device/';
            const url = baseUrl + '?code=' + code;

            console.log('🔗 URL для QR:', url);

            // Создаём overlay
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
                    <button id="dl-close-btn"
                        style="position:absolute;top:14px;right:16px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,0.05);border:none;font-size:18px;cursor:pointer;color:#666;display:flex;align-items:center;justify-content:center;">✕</button>

                    <div style="font-size:3rem;margin-bottom:8px;">📱</div>
                    <h2 style="margin:0 0 8px 0;color:#1a1a2e;font-size:1.4rem;font-weight:800;">Привязать устройство</h2>
                    <p style="margin:0 0 20px 0;color:#888;font-size:0.9rem;line-height:1.5;">
                        Откройте камеру на телефоне и наведите на QR-код.<br>
                        <b>Важно:</b> на телефоне нужно быть залогиненным.
                    </p>

                    <div id="dl-qr-container" style="
                        padding: 20px;
                        background: linear-gradient(135deg, #f8f9fb, #eef0f5);
                        border-radius: 20px;
                        margin-bottom: 16px;
                        display: inline-block;
                        min-width: 240px;
                        min-height: 240px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <div style="color:#999;font-size:0.85rem;">Генерация QR...</div>
                    </div>

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

                    <!-- Ручной ввод кода как fallback -->
                    <details style="margin-top:16px;text-align:left;font-size:0.82rem;color:#888;">
                        <summary style="cursor:pointer;user-select:none;">📝 Не работает камера?</summary>
                        <p style="margin:8px 0 0 0;line-height:1.6;">
                            Откройте на телефоне ссылку:<br>
                            <code style="background:#f0f4ff;padding:6px 10px;border-radius:6px;font-size:0.75rem;word-break:break-all;display:inline-block;margin-top:6px;color:#6C63FF;font-weight:700;">${url}</code>
                        </p>
                    </details>
                </div>
            `;
            document.body.appendChild(overlay);

            // Закрытие
            const closeBtn = overlay.querySelector('#dl-close-btn');
            const closeModal = async () => {
                // Убираем запись
                try {
                    await client.from('device_links').delete().eq('code', code);
                } catch(e) {}
                // Отписываемся
                if (window._dlChannel) {
                    window._dlChannel.unsubscribe();
                    window._dlChannel = null;
                }
                overlay.remove();
            };
            closeBtn.onclick = closeModal;
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });

            // Рисуем QR
            const container = overlay.querySelector('#dl-qr-container');
            container.innerHTML = '';
            const canvas = document.createElement('canvas');
            container.appendChild(canvas);

            window.QRCode.toCanvas(canvas, url, {
                width: 220,
                margin: 2,
                color: { dark: '#1a1a1a', light: '#ffffff' }
            }, (err) => {
                if (err) {
                    console.error('❌ Ошибка рисования QR:', err);
                    container.innerHTML = '<div style="color:#c0392b;font-size:0.85rem;padding:20px;">Ошибка генерации QR</div>';
                } else {
                    console.log('✅ QR нарисован');
                }
            });

            // ============================================================
            // ПОДПИСКА НА REALTIME
            // ============================================================
            const channel = client
                .channel('device-link-' + code)
                .on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'device_links',
                    filter: `code=eq.${code}`
                }, async (payload) => {
                    console.log('📡 Realtime update:', payload.new);

                    if (payload.new.status === 'approved' && payload.new.access_token) {
                        const statusEl = overlay.querySelector('#dl-status');
                        if (statusEl) {
                            statusEl.innerHTML = '✅ Устройство привязано!<br>Синхронизация...';
                            statusEl.style.background = '#e8f5e9';
                            statusEl.style.color = '#2e7d32';
                        }

                        // Применяем сессию с телефона
                        try {
                            const { error } = await client.auth.setSession({
                                access_token: payload.new.access_token,
                                refresh_token: payload.new.refresh_token
                            });

                            if (error) {
                                console.error('❌ Не удалось применить сессию:', error);
                                return;
                            }

                            console.log('✅ Сессия синхронизирована');
                            await client.from('device_links').delete().eq('code', code);

                            setTimeout(() => {
                                window.location.reload();
                            }, 1200);
                        } catch (e) {
                            console.error('Ошибка синхронизации:', e);
                        }
                    }
                })
                .subscribe((status) => {
                    console.log('📡 Realtime статус:', status);
                    if (status === 'SUBSCRIBED') {
                        console.log('✅ Подписка активна');
                    }
                });

            window._dlChannel = channel;

            // Таймер на 5 минут
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
        });
    };

    window.dlCancel = function() {
        if (window._dlChannel) {
            window._dlChannel.unsubscribe();
            window._dlChannel = null;
        }
    };

    // ============================================================
    // ЭКСПОРТ ФУНКЦИЙ
    // ============================================================
    window.pfOpenQR = window.dlOpenQR;

    // Ждём клиента и логируем готовность
    waitForClient(() => {
        console.log('✅ device-link.js готов');
        console.log('   pfOpenQR доступна:', typeof window.pfOpenQR);
    });
})();
