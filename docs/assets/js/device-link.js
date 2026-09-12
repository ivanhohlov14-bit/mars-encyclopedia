// device-link.js — QR-привязка второго устройства
(function() {
    'use strict';

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
        s.onload = cb;
        document.head.appendChild(s);
    }

    // ============================================================
    // Показать модалку с QR (на ПК)
    // ============================================================
    window.dlOpenQR = async function() {
        const client = window.supabaseClient;
        if (!client) return;

        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) {
            alert('Сначала войдите');
            return;
        }

        const code = generateCode();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

        // Создаём запись в БД
        const { error } = await client.from('device_links').insert({
            code: code,
            status: 'pending',
            user_id: session.user.id,
            expires_at: expiresAt
        });

        if (error) {
            console.error('Не удалось создать ссылку:', error);
            alert('Ошибка: ' + error.message);
            return;
        }

        // Показываем модалку
        loadQR(() => {
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
                animation: fadeIn 0.3s ease;
            `;
            overlay.innerHTML = `
                <div style="
                    background: #fff;
                    max-width: 440px; width: 100%;
                    padding: 32px 28px;
                    border-radius: 24px;
                    text-align: center;
                    position: relative;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.5);
                ">
                    <button onclick="this.closest('#dl-overlay').remove(); window.dlCancel && window.dlCancel();"
                        style="position:absolute;top:14px;right:16px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,0.05);border:none;font-size:18px;cursor:pointer;color:#666;">✕</button>

                    <div style="font-size:3rem;margin-bottom:8px;">📱</div>
                    <h2 style="margin:0 0 8px 0;color:#1a1a2e;font-size:1.4rem;font-weight:800;">Привязать устройство</h2>
                    <p style="margin:0 0 20px 0;color:#888;font-size:0.9rem;line-height:1.5;">
                        Откройте камеру на телефоне и наведите на QR-код<br>
                        (нужно быть залогиненным на телефоне под тем же аккаунтом)
                    </p>

                    <div id="dl-qr-container" style="
                        padding: 20px;
                        background: linear-gradient(135deg, #f8f9fb, #eef0f5);
                        border-radius: 20px;
                        margin-bottom: 16px;
                        display: inline-block;
                    "></div>

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
                    ">
                        ⏳ Ожидание сканирования...
                    </div>

                    <div style="margin-top:16px;font-size:0.78rem;color:#999;">
                        Ссылка действует 5 минут
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            // Рисуем QR
            const container = overlay.querySelector('#dl-qr-container');
            const canvas = document.createElement('canvas');
            container.appendChild(canvas);
            window.QRCode.toCanvas(canvas, url, {
                width: 220,
                margin: 2,
                color: { dark: '#1a1a1a', light: '#ffffff' }
            });

            // Подписываемся на изменения в БД
            const channel = client
                .channel('device-link-' + code)
                .on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'device_links',
                    filter: `code=eq.${code}`
                }, async (payload) => {
                    if (payload.new.status === 'approved' && payload.new.access_token) {
                        // Успех! Применяем токены
                        const statusEl = overlay.querySelector('#dl-status');
                        if (statusEl) {
                            statusEl.innerHTML = '✅ Устройство привязано!<br>Перезагрузка...';
                            statusEl.style.background = '#e8f5e9';
                            statusEl.style.color = '#2e7d32';
                        }
                        
                        // Удаляем запись
                        await client.from('device_links').delete().eq('code', code);
                        
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                })
                .subscribe();

            window._dlChannel = channel;

            // Таймер на 5 минут
            setTimeout(async () => {
                if (document.getElementById('dl-overlay')) {
                    const statusEl = overlay.querySelector('#dl-status');
                    if (statusEl) {
                        statusEl.textContent = '⏰ Ссылка истекла';
                        statusEl.style.background = '#fff5f5';
                        statusEl.style.color = '#991b1b';
                    }
                    await client.from('device_links').delete().eq('code', code);
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
// Экспорт функции для вызова из профиля
window.pfOpenQR = window.dlOpenQR;
})();
