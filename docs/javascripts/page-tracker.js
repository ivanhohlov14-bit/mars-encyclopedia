// docs/javascripts/page-tracker.js
// ВЕРСИЯ С ПРОСТЫМ ГАРАНТИРОВАННЫМ УВЕДОМЛЕНИЕМ (без анимации)

console.log('✅ page-tracker.js загружен');

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

                    // === ПОКАЗЫВАЕМ ПРОСТОЕ УВЕДОМЛЕНИЕ ===
                    showSimpleToast(5);

                } else {
                    console.warn('⚠️ addExperience не определена');
                }

                window.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        }

        // === ПРОСТОЕ УВЕДОМЛЕНИЕ (БЕЗ АНИМАЦИИ) ===
        function showSimpleToast(xpAmount) {
            if (sessionStorage.getItem('xp_toast_shown')) return;

            console.log('🎨 СОЗДАЁМ ПРОСТОЕ УВЕДОМЛЕНИЕ');

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
                border-radius: 12px;
                font-size: 2rem;
                font-weight: bold;
                font-family: 'Segoe UI', Arial, sans-serif;
                box-shadow: 0 8px 30px rgba(0,0,0,0.3);
                pointer-events: none;
                opacity: 1;
                transition: opacity 0.5s;
            `;

            document.body.appendChild(toast);
            console.log('✅ Простое уведомление добавлено в DOM');

            // Через 3 секунды скрываем
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    if (toast.parentNode) toast.remove();
                    console.log('🗑️ Уведомление удалено');
                }, 500);
            }, 2500);

            sessionStorage.setItem('xp_toast_shown', 'true');
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        setTimeout(checkScroll, 1000);
    });
});
