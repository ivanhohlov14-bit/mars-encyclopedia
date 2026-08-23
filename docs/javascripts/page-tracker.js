// docs/javascripts/page-tracker.js
// Начисляет опыт только после полного прочтения статьи (90% прокрутки)

console.log('✅ page-tracker.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    // Исключаем служебные страницы
    const excludePages = ['/profile/', '/login/', '/register/', '/stats/', '/profile-view/'];
    if (excludePages.includes(window.location.pathname)) {
        console.log('ℹ️ Страница исключена: ' + window.location.pathname);
        return;
    }

    // Проверяем авторизацию
    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );

    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        if (!user) {
            console.log('👤 Пользователь не авторизован');
            return;
        }

        const pageKey = `read_${window.location.pathname}`;
        if (localStorage.getItem(pageKey)) {
            console.log('ℹ️ Опыт за эту страницу уже получен');
            return;
        }

        console.log('📄 Страница: ' + window.location.pathname);
        console.log('👤 Пользователь: ' + user.email);

        let xpAwarded = false;

        function checkScroll() {
            if (xpAwarded) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;

            // Если страница слишком короткая (< 100px скролла) — не даём опыт
            if (maxScroll < 100) {
                console.log('ℹ️ Страница слишком короткая, опыт не начисляется');
                return;
            }

            const scrollPercent = Math.round((scrollY / maxScroll) * 100);
            console.log('📊 Прокручено: ' + scrollPercent + '%');

            if (scrollPercent >= 90) {
                awardXP();
            }
        }

        function awardXP() {
            if (xpAwarded) return;
            xpAwarded = true;

            console.log('🎉 НАЧИСЛЯЕМ ОПЫТ!');
            
            if (typeof window.addExperience === 'function') {
                window.addExperience(user.id, 5);
                localStorage.setItem(pageKey, 'true');
                console.log('✅ +5 XP за полное прочтение статьи!');

                // === ПОКАЗЫВАЕМ УВЕДОМЛЕНИЕ ===
                if (typeof window.showExperienceToast === 'function') {
                    console.log('📢 Вызываем showExperienceToast(5)');
                    window.showExperienceToast(5);
                } else {
                    console.warn('⚠️ window.showExperienceToast не определена!');
                    // Создаём простое уведомление как fallback
                    showFallbackToast(5);
                }
            } else {
                console.warn('⚠️ window.addExperience не определена');
            }

            // Убираем обработчики
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        }

        // Fallback-уведомление, если showExperienceToast не загружена
        function showFallbackToast(xpAmount) {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 999999;
                background: rgba(108, 99, 255, 0.95);
                color: #fff;
                padding: 20px 40px;
                border-radius: 16px;
                font-size: 2rem;
                font-weight: bold;
                font-family: 'Segoe UI', Arial, sans-serif;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                pointer-events: none;
                animation: xpFadeOut 2.5s ease forwards;
            `;
            toast.textContent = '⭐ +' + xpAmount + ' XP';
            document.body.appendChild(toast);
            setTimeout(function() { if (toast.parentNode) toast.remove(); }, 3000);
        }

        // Подписываемся на события
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        // Проверяем сразу, если страница уже прокручена (например, с якорем)
        setTimeout(checkScroll, 1000);

        // Очистка при уходе
        window.addEventListener('beforeunload', function() {
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        });
    }).catch(function(err) {
        console.error('❌ Ошибка сессии:', err);
    });
});
