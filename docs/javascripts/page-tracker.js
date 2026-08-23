// docs/javascripts/page-tracker.js
// Начисляет опыт ТОЛЬКО после того, как пользователь прокрутит 90% статьи

document.addEventListener('DOMContentLoaded', function() {
    // Исключаем служебные страницы
    const excludePages = ['/profile/', '/login/', '/register/', '/stats/', '/profile-view/'];
    if (excludePages.includes(window.location.pathname)) return;

    // Проверяем авторизацию
    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );

    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        if (!user) return;

        const pageKey = `read_${window.location.pathname}`;
        if (localStorage.getItem(pageKey)) return; // Уже получил опыт

        let xpAwarded = false;

        function checkScroll() {
            if (xpAwarded) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;

            // Если страница слишком короткая (не нужно прокручивать) — не даём опыт автоматически
            if (maxScroll <= 50) {
                // Можно либо давать опыт за короткую страницу, либо нет — я решил не давать
                return;
            }

            const scrollPercent = (scrollY / maxScroll) * 100;

            // Только если прокрутили 90% и более
            if (scrollPercent >= 90) {
                awardXP();
            }
        }

        function awardXP() {
            if (xpAwarded) return;
            xpAwarded = true;

            if (typeof window.addExperience === 'function') {
                window.addExperience(user.id, 5);
                localStorage.setItem(pageKey, 'true');
                console.log('✅ +5 XP за полное прочтение статьи!');

                if (typeof showExperienceToast === 'function') {
                    showExperienceToast(5);
                }
            }

            // Убираем обработчики
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        }

        // Подписываемся только на события прокрутки и изменения размера
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        // Также проверяем, если пользователь уже прокрутил страницу до низа при загрузке (например, переход с якорем)
        // Но делаем это с задержкой, чтобы дать время на прокрутку
        setTimeout(function() {
            checkScroll();
        }, 500);

        // Очистка при уходе
        window.addEventListener('beforeunload', function() {
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        });
    });
});
