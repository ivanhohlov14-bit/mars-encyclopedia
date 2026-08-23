// docs/javascripts/page-tracker.js
// ВЕРСИЯ С ПРИНУДИТЕЛЬНЫМ ALERT ДЛЯ ДИАГНОСТИКИ

console.log('✅ page-tracker.js ЗАГРУЗИЛСЯ (v3)');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен');

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

                try {
                    if (typeof window.addExperience === 'function') {
                        window.addExperience(user.id, 5);
                        localStorage.setItem(pageKey, 'true');
                        console.log('✅ +5 XP начислено!');

                        // === ПРИНУДИТЕЛЬНЫЙ ALERT ДЛЯ ПРОВЕРКИ ===
                        console.log('📢 Пытаемся показать alert...');
                        alert('🎉 +5 XP! (Это тестовое сообщение)');

                        // === ПОКАЗЫВАЕМ КРАСИВОЕ УВЕДОМЛЕНИЕ ===
                        showXpToast(5);

                    } else {
                        console.warn('⚠️ addExperience не определена');
                    }
                } catch (e) {
                    console.error('❌ Ошибка в блоке начисления:', e);
                }

                window.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        }

        function showXpToast(xpAmount) {
            try {
                if (sessionStorage.getItem('xp_toast_shown')) return;
                console.log('🎨 СОЗДАЁМ УВЕДОМЛЕНИЕ +' + xpAmount);

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
                `;
                document.body.appendChild(toast);
                console.log('✅ Уведомление добавлено в DOM');

                setTimeout(() => {
                    if (toast.parentNode) toast.remove();
                    console.log('🗑️ Уведомление удалено');
                }, 3000);

                sessionStorage.setItem('xp_toast_shown', 'true');
            } catch (e) {
                console.error('❌ Ошибка в showXpToast:', e);
            }
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        setTimeout(checkScroll, 1000);
    });
});
