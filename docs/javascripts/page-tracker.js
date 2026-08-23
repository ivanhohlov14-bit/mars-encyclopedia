// docs/javascripts/page-tracker.js
// Начисляет опыт только после полного прочтения статьи (прокрутка до конца)

document.addEventListener('DOMContentLoaded', function() {
    // Исключаем служебные страницы
    const excludePages = ['/profile/', '/login/', '/register/', '/stats/', '/profile-view/'];
    if (excludePages.includes(window.location.pathname)) return;

    // Проверяем, авторизован ли пользователь
    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );

    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        if (!user) return;

        const pageKey = `read_${window.location.pathname}`;

        // Если уже получил опыт за эту статью — выходим
        if (localStorage.getItem(pageKey)) return;

        let xpAwarded = false;

        function checkScroll() {
            if (xpAwarded) return;

            // Вычисляем, сколько процентов страницы прокручено
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;

            // Если страница слишком короткая, считаем, что она прочитана
            if (maxScroll <= 0) {
                awardXP();
                return;
            }

            const scrollPercent = (scrollY / maxScroll) * 100;

            // Если прокручено 90% и более — начисляем опыт
            if (scrollPercent >= 90) {
                awardXP();
            }
        }

        function awardXP() {
            if (xpAwarded) return;
            xpAwarded = true;

            // Начисляем опыт
            if (typeof window.addExperience === 'function') {
                window.addExperience(user.id, 5);
                localStorage.setItem(pageKey, 'true');
                console.log('✅ +5 опыта за полное прочтение статьи!');

                // Показываем анимацию
                if (typeof showExperienceToast === 'function') {
                    showExperienceToast(5);
                }
            } else {
                console.warn('⚠️ addExperience не загружена');
            }

            // Убираем обработчики, чтобы не срабатывало повторно
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
            window.removeEventListener('load', checkScroll);
        }

        // Подписываемся на события прокрутки, изменения размера и загрузки (для коротких страниц)
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        window.addEventListener('load', checkScroll);

        // Дополнительная проверка через 3 секунды после загрузки (для коротких страниц, которые уже видны)
        setTimeout(checkScroll, 3000);

        // Если пользователь покидает страницу, очищаем обработчики
        window.addEventListener('beforeunload', function() {
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
            window.removeEventListener('load', checkScroll);
        });
    });
});
