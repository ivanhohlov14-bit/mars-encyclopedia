// docs/javascripts/page-tracker.js
// ВЕРСИЯ С ПРИНУДИТЕЛЬНЫМИ ЛОГАМИ

console.log('✅ page-tracker.js ЗАГРУЗИЛСЯ (v2)');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен, запускаем скрипт...');

    const excludePages = ['/profile/', '/login/', '/register/', '/stats/', '/profile-view/'];
    const currentPath = window.location.pathname;
    console.log('📍 Текущий путь:', currentPath);

    if (excludePages.includes(currentPath)) {
        console.log('ℹ️ Страница исключена');
        return;
    }

    console.log('✅ Страница не исключена, продолжаем...');

    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );

    console.log('📡 Запрашиваем сессию...');

    client.auth.getSession().then(({ data }) => {
        console.log('✅ Сессия получена');
        const user = data?.session?.user;
        if (!user) {
            console.log('👤 Пользователь не авторизован');
            return;
        }

        console.log('👤 Пользователь:', user.email);
        const pageKey = `read_${currentPath}`;
        if (localStorage.getItem(pageKey)) {
            console.log('ℹ️ Опыт уже получен за эту страницу');
            return;
        }

        console.log('📄 Опыт ещё не получен, ждём прокрутку...');

        let xpAwarded = false;

        function showXpToast(xpAmount) {
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
                animation: xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                           xpFadeOut 2.8s ease forwards 0.3s;
            `;

            if (!document.getElementById('xp-toast-styles-test2')) {
                const style = document.createElement('style');
                style.id = 'xp-toast-styles-test2';
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
                console.log('✅ Стили добавлены');
            }

            document.body.appendChild(toast);
            console.log('✅ Уведомление добавлено в DOM');

            setTimeout(() => {
                if (toast.parentNode) toast.remove();
                console.log('🗑️ Уведомление удалено');
            }, 3000);

            sessionStorage.setItem('xp_toast_shown', 'true');
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
    }).catch((error) => {
        console.error('❌ Ошибка получения сессии:', error);
    });
});
