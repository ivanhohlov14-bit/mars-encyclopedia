/ docs/javascripts/page-tracker.js
// ПОЛНАЯ АВТОНОМНАЯ ВЕРСИЯ — без внешних зависимостей

console.log('✅ page-tracker.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    // Исключаем служебные страницы
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
        if (!user) {
            console.log('👤 Пользователь не авторизован');
            return;
        }

        const pageKey = `read_${window.location.pathname}`;
        if (localStorage.getItem(pageKey)) {
            console.log('ℹ️ Опыт уже получен за эту страницу');
            return;
        }

        console.log('📄 Страница: ' + window.location.pathname);
        console.log('👤 Пользователь: ' + user.email);

        let xpAwarded = false;

        // === ФУНКЦИЯ ПОКАЗА УВЕДОМЛЕНИЯ (ВСТРОЕННАЯ) ===
        function showXpToast(xpAmount) {
            // Проверяем, не было ли уже показано уведомление на этой странице
            if (sessionStorage.getItem('xp_toast_shown')) {
                console.log('⏳ Уведомление уже было показано');
                return;
            }

            console.log('🎉 ПОКАЗЫВАЕМ УВЕДОМЛЕНИЕ +' + xpAmount + ' XP');

            // Создаём контейнер
            const toast = document.createElement('div');
            toast.id = 'xp-toast';

            // Содержимое
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

            // Позиционирование
            toast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 999999;
                pointer-events: none;
                animation: xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                           xpFadeOut 2.5s ease forwards;
            `;

            document.body.appendChild(toast);

            // Удаляем через 3 секунды
            setTimeout(function() {
                if (toast.parentNode) {
                    toast.remove();
                    console.log('🗑️ Уведомление удалено');
                }
            }, 3000);

            // Запоминаем, что уведомление показано
            sessionStorage.setItem('xp_toast_shown', 'true');
        }

        // === ДОБАВЛЯЕМ СТИЛИ АНИМАЦИИ (ОДИН РАЗ) ===
        function addAnimationStyles() {
            if (document.getElementById('xp-toast-styles-auto')) return;

            const style = document.createElement('style');
            style.id = 'xp-toast-styles-auto';
            style.textContent = `
                @keyframes xpPop {
                    0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
                @keyframes xpFadeOut {
                    0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -60%) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
            console.log('✅ Стили анимации добавлены');
        }

        // Добавляем стили сразу
        addAnimationStyles();

        // === ПРОВЕРКА ПРОКРУТКИ ===
        function checkScroll() {
            if (xpAwarded) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;

            // Если страница короткая — не даём опыт
            if (maxScroll < 100) {
                console.log('ℹ️ Страница короткая, опыт не начисляется');
                return;
            }

            const scrollPercent = Math.round((scrollY / maxScroll) * 100);
            console.log('📊 Прокручено: ' + scrollPercent + '%');

            if (scrollPercent >= 90) {
                xpAwarded = true;
                console.log('🎉 УСЛОВИЕ ВЫПОЛНЕНО! Начисляем опыт...');

                // Начисляем опыт
                if (typeof window.addExperience === 'function') {
                    window.addExperience(user.id, 5);
                    localStorage.setItem(pageKey, 'true');
                    console.log('✅ +5 XP начислено!');

                    // Показываем уведомление
                    showXpToast(5);
                } else {
                    console.warn('⚠️ window.addExperience не определена');
                }

                // Убираем обработчики
                window.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        }

        // Подписываемся на события
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        // Проверяем сразу (если страница уже прокручена)
        setTimeout(checkScroll, 1000);

        // Очистка
        window.addEventListener('beforeunload', function() {
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        });
    });
});
