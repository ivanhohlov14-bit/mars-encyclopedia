---
title: Привязка устройства
comments: false
---

<div id="ld-app" style="max-width: 100%; margin: 0 auto; font-family: 'Segoe UI', sans-serif; padding: 20px 16px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: ldSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка...</p>
    </div>
</div>

<style>
@keyframes ldSpin { to { transform: rotate(360deg); } }
@keyframes ldFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ldCheck {
    0% { stroke-dashoffset: 50; }
    100% { stroke-dashoffset: 0; }
}
@keyframes ldCircle {
    0% { stroke-dashoffset: 166; }
    100% { stroke-dashoffset: 0; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";
    const container = document.getElementById('ld-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
        container.innerHTML = `
            <div style="text-align:center;padding:60px 20px;">
                <div style="font-size:4rem;margin-bottom:16px;">❌</div>
                <h2 style="color:#1a1a2e;">Неверная ссылка</h2>
                <p style="color:#888;">В QR-коде отсутствует код привязки</p>
            </div>
        `;
        return;
    }

    (async () => {
        const { data: { session } } = await client.auth.getSession();
        const user = session?.user;

        if (!user) {
            container.innerHTML = `
                <div style="max-width:440px;margin:0 auto;text-align:center;padding:40px 20px;background:#fff;border-radius:20px;box-shadow:0 20px 60px -12px rgba(0,0,0,0.15);">
                    <div style="font-size:4rem;margin-bottom:16px;">🔐</div>
                    <h2 style="color:#1a1a2e;margin:0 0 12px 0;">Требуется вход</h2>
                    <p style="color:#888;margin:0 0 24px 0;line-height:1.6;">
                        Чтобы привязать этот телефон к аккаунту на компьютере,<br>
                        сначала войдите под своим аккаунтом.
                    </p>
                    <a href="/login/?redirect=/link-device/?code=${code}" 
                       style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;box-shadow:0 8px 24px rgba(108,99,255,0.4);">
                        🔐 Войти и привязать
                    </a>
                </div>
            `;
            return;
        }

        // Проверяем, что запись существует и валидна
        const { data: link } = await client
            .from('device_links')
            .select('*')
            .eq('code', code)
            .maybeSingle();

        if (!link) {
            container.innerHTML = `
                <div style="text-align:center;padding:60px 20px;background:#fff;border-radius:20px;max-width:440px;margin:0 auto;">
                    <div style="font-size:4rem;margin-bottom:16px;">⏰</div>
                    <h2 style="color:#1a1a2e;">Ссылка истекла</h2>
                    <p style="color:#888;">Попросите новый QR на компьютере</p>
                </div>
            `;
            return;
        }

        if (link.status === 'approved') {
            container.innerHTML = `
                <div style="text-align:center;padding:60px 20px;background:#fff;border-radius:20px;max-width:440px;margin:0 auto;">
                    <div style="font-size:4rem;margin-bottom:16px;">✅</div>
                    <h2 style="color:#2e7d32;">Уже привязано</h2>
                </div>
            `;
            return;
        }

        // Показываем кнопку подтверждения
        container.innerHTML = `
            <div style="max-width:440px;margin:0 auto;background:#fff;border-radius:24px;box-shadow:0 20px 60px -12px rgba(0,0,0,0.15);overflow:hidden;animation:ldFadeIn 0.5s ease;">
                <div style="background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);padding:40px 32px;text-align:center;color:#fff;">
                    <div style="font-size:3rem;margin-bottom:12px;">📱</div>
                    <h2 style="margin:0 0 6px 0;color:#fff;font-size:1.3rem;">Привязка телефона</h2>
                    <p style="margin:0;opacity:0.85;font-size:0.88rem;">Код: <b style="color:#A29BFE;letter-spacing:2px;">${code}</b></p>
                </div>
                <div style="padding:32px 24px;">
                    <div style="background:#f0f4ff;padding:16px;border-radius:12px;margin-bottom:20px;font-size:0.88rem;color:#4a5568;line-height:1.6;">
                        <b>Что произойдёт:</b><br>
                        ✅ Ваш аккаунт <b style="color:#6C63FF;">${user.email}</b> будет привязан к устройству на компьютере<br>
                        ✅ Вы сможете заходить без пароля с обоих устройств<br>
                        ✅ Сессия на компьютере останется активной
                    </div>

                    <button id="ld-confirm-btn" style="
                        width:100%;
                        padding:16px;
                        background:linear-gradient(135deg,#6C63FF,#A29BFE);
                        color:#fff;
                        border:none;
                        border-radius:12px;
                        font-size:1rem;
                        font-weight:800;
                        cursor:pointer;
                        font-family:inherit;
                        box-shadow:0 10px 28px -4px rgba(108,99,255,0.5);
                        transition:all 0.25s;
                    ">
                        ✅ Подтвердить привязку
                    </button>

                    <button onclick="location.href='/profile/'" style="
                        width:100%;margin-top:10px;padding:14px;
                        background:transparent;color:#888;
                        border:2px solid #eee;border-radius:12px;
                        font-size:0.9rem;font-weight:600;
                        cursor:pointer;font-family:inherit;
                    ">
                        Отмена
                    </button>
                </div>
            </div>
        `;

        document.getElementById('ld-confirm-btn').onclick = async () => {
            const btn = document.getElementById('ld-confirm-btn');
            btn.disabled = true;
            btn.innerHTML = '⏳ Привязка...';

            try {
                // Получаем свою сессию
                const { data: { session: mySession } } = await client.auth.getSession();

                if (!mySession) {
                    btn.innerHTML = '❌ Ошибка сессии';
                    return;
                }

                // Отправляем токены в БД
                const { error } = await client
                    .from('device_links')
                    .update({
                        status: 'approved',
                        user_id: mySession.user.id,
                        access_token: mySession.access_token,
                        refresh_token: mySession.refresh_token
                    })
                    .eq('code', code);

                if (error) {
                    btn.innerHTML = '❌ ' + error.message;
                    return;
                }

                // Успех
                container.innerHTML = `
                    <div style="max-width:440px;margin:0 auto;text-align:center;background:#fff;border-radius:24px;padding:60px 32px;box-shadow:0 20px 60px -12px rgba(0,0,0,0.15);">
                        <svg viewBox="0 0 100 100" style="width:120px;height:120px;margin:0 auto 20px auto;">
                            <circle cx="50" cy="50" r="26" fill="none" stroke="#27ae60" stroke-width="4"
                                stroke-dasharray="166" stroke-dashoffset="166"
                                style="animation:ldCircle 0.8s cubic-bezier(0.65,0,0.45,1) forwards;"/>
                            <path d="M 32 52 L 45 65 L 70 38" fill="none" stroke="#27ae60" stroke-width="5"
                                stroke-linecap="round" stroke-linejoin="round"
                                stroke-dasharray="50" stroke-dashoffset="50"
                                style="animation:ldCheck 0.5s cubic-bezier(0.65,0,0.45,1) 0.6s forwards;"/>
                        </svg>
                        <h2 style="color:#1a1a2e;margin:0 0 8px 0;">Телефон привязан!</h2>
                        <p style="color:#888;margin:0 0 24px 0;line-height:1.6;">
                            Ваш компьютер получил доступ к аккаунту.
                        </p>
                        <a href="/profile/" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:12px;text-decoration:none;font-weight:700;">
                            👤 В профиль
                        </a>
                    </div>
                `;
            } catch (e) {
                btn.innerHTML = '❌ ' + e.message;
            }
        };
    })();
})();
</script>
