// docs/javascripts/page-tracker.js
// УБИРАЕМ sessionStorage — уведомление будет всегда

console.log('✅ page-tracker.js ЗАГРУЗИЛСЯ (v4)');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен');

    const excludePages = ['/profile/', '/login/', '/register/', '/stats/', '/profile-view/'];
    if (excludePages.includes(window.location.pathname)) {
        console.log('ℹ️ Страница исключена');
        return;
    }

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

        // === ФУНКЦИЯ УВЕДОМЛЕНИЯ (БЕЗ sessionStorage) ===
        function showXpToast(xpAmount) {
            console.log('🔥 ПОКАЗЫВАЕМ УВЕДОМЛЕНИЕ +' + xpAmount);

            // Создаём уведомление
            const toast = document.createElement('div');
            toast.textContent = '⭐ +' + xpAmount + ' XP';
            toast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 999999;
                background: #6C63FF;
                color: white;
                padding: 20px 40px;
                border-radius: 16px;
                font-size: 2rem;
                font-weight: bold;
                font-family: 'Segoe UI', Arial, sans-serif;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                pointer-events: none;
                animation: xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                           xpFadeOut 2.8s ease forwards 0.3s;
            `;

            // Добавляем стили анимации (один раз)
            if (!document.getElementById('xp-toast-styles-final-v4')) {
                const style = document.createElement('style');
                style.id = 'xp-toast-styles-final-v4';
                style.textContent = `
                    @keyframes xpPop {
                        0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
                        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    }
                    @keyframes xpFadeOut {
                        0% { opacity: 1; }
                        80% { opacity: 1; }
                        100% { opacity: 0; transform: translate(-50%, -60%); }
                    }
                `;
                document.head.appendChild(style);
                console.log('✅ Стили анимации добавлены');
            }

            document.body.appendChild(toast);
            console.log('✅ Уведомление добавлено в DOM');

            // Удаляем через 3 секунды
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
                console.log('🗑️ Уведомление удалено');
            }, 3000);
        }

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

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        setTimeout(checkScroll, 1000);
    });
});
