// docs/javascripts/xp-toast.js
// ОТДЕЛЬНЫЙ ФАЙЛ ДЛЯ УВЕДОМЛЕНИЙ ОБ ОПЫТЕ

console.log('✅ xp-toast.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    const excludePages = ['/profile/', '/login/', '/register/', '/stats/', '/profile-view/'];
    if (excludePages.includes(window.location.pathname)) return;

    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );

    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        if (!user) return;

        const pageKey = `read_${window.location.pathname}`;
        if (localStorage.getItem(pageKey)) return;

        let xpAwarded = false;

        function checkScroll() {
            if (xpAwarded) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;

            if (maxScroll < 100) return;

            const scrollPercent = (scrollY / maxScroll) * 100;
            console.log('📊 Прокручено: ' + Math.round(scrollPercent) + '%');

            if (scrollPercent >= 90) {
                xpAwarded = true;
                console.log('🎉 УСЛОВИЕ ВЫПОЛНЕНО! Начисляем опыт...');

                if (typeof window.addExperience === 'function') {
                    window.addExperience(user.id, 5);
                    localStorage.setItem(pageKey, 'true');
                    console.log('✅ +5 XP начислено!');

                    // === ПОКАЗЫВАЕМ УВЕДОМЛЕНИЕ ===
                    showXpToast(5);

                } else {
                    console.warn('⚠️ addExperience не определена');
                }

                window.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        }

        // === ФУНКЦИЯ УВЕДОМЛЕНИЯ (с анимацией) ===
        function showXpToast(xpAmount) {
            if (sessionStorage.getItem('xp_toast_shown')) return;

            console.log('🎨 СОЗДАЁМ УВЕДОМЛЕНИЕ');

            const toast = document.createElement('div');
            toast.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #6C63FF, #a29bfe);
                    color: #fff;
                    padding: 20px 40px;
                    border-radius: 16px;
                    font-size: 2rem;
                    font-weight: bold;
                    font-family: 'Segoe UI', Arial, sans-serif;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    gap: 16px;
                ">
                    <span style="font-size: 2.8rem;">⭐</span>
                    <span>+${xpAmount} XP</span>
                </div>
            `;

            toast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 999999;
                pointer-events: none;
                animation: xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                           xpFadeOut 2.8s ease forwards 0.3s;
            `;

            document.body.appendChild(toast);
            console.log('✅ Уведомление добавлено в DOM');

            if (!document.getElementById('xp-toast-styles-inline')) {
                const style = document.createElement('style');
                style.id = 'xp-toast-styles-inline';
                style.textContent = `
                    @keyframes xpPop {
                        0% { transform: scale(0.3) rotate(-5deg); opacity: 0; }
                        100% { transform: scale(1) rotate(0deg); opacity: 1; }
                    }
                    @keyframes xpFadeOut {
                        0% { opacity: 1; transform: scale(1); }
                        80% { opacity: 1; transform: scale(1); }
                        100% { opacity: 0; transform: scale(0.9) translateY(-10px); }
                    }
                `;
                document.head.appendChild(style);
                console.log('✅ Стили анимации добавлены');
            }

            setTimeout(() => {
                if (toast.parentNode) toast.remove();
                console.log('🗑️ Уведомление удалено');
            }, 3200);

            sessionStorage.setItem('xp_toast_shown', 'true');
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        setTimeout(checkScroll, 1000);
    });
});
