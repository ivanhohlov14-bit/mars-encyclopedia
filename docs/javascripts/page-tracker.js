// docs/javascripts/page-tracker.js
// ФИНАЛЬНАЯ ВЕРСИЯ — с красивым уведомлением

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

        // === ФУНКЦИЯ КРАСИВОГО УВЕДОМЛЕНИЯ ===
        function showXpToast(xpAmount) {
            // Не показываем повторно на одной странице
            if (sessionStorage.getItem('xp_toast_shown')) return;

            console.log('🎨 СОЗДАЁМ КРАСИВОЕ УВЕДОМЛЕНИЕ +' + xpAmount + ' XP');

            // Создаём контейнер
            const toast = document.createElement('div');
            toast.id = 'xp-toast';

            // Содержимое с анимацией
            toast.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #6C63FF, #a29bfe);
                    color: #fff;
                    padding: 24px 48px;
                    border-radius: 20px;
                    font-size: 2.2rem;
                    font-weight: bold;
                    font-family: 'Segoe UI', Arial, sans-serif;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.4);
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    border: 2px solid rgba(255,255,255,0.2);
                ">
                    <span style="font-size: 3rem; animation: xpStar 1s ease infinite alternate;">⭐</span>
                    <span>+${xpAmount} XP</span>
                </div>
            `;

            // Позиционирование — по центру экрана
            toast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 999999;
                pointer-events: none;
                animation: xpPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                           xpFadeOut 2.8s ease forwards 0.3s;
            `;

            document.body.appendChild(toast);
            console.log('✅ Уведомление добавлено в DOM');

            // Удаляем через 3 секунды
            setTimeout(function() {
                if (toast.parentNode) {
                    toast.remove();
                    console.log('🗑️ Уведомление удалено');
                }
            }, 3200);

            // Запоминаем, что уведомление показано
            sessionStorage.setItem('xp_toast_shown', 'true');
        }

        // === ДОБАВЛЯЕМ СТИЛИ АНИМАЦИИ (один раз) ===
        function addAnimationStyles() {
            if (document.getElementById('xp-toast-styles-final')) return;

            const style = document.createElement('style');
            style.id = 'xp-toast-styles-final';
            style.textContent = `
                @keyframes xpPop {
                    0% { transform: translate(-50%, -50%) scale(0.3) rotate(-5deg); opacity: 0; }
                    100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
                }
                @keyframes xpFadeOut {
                    0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -60%) scale(0.9); }
                }
                @keyframes xpStar {
                    0% { transform: scale(1) rotate(0deg); }
                    100% { transform: scale(1.2) rotate(15deg); }
                }
            `;
            document.head.appendChild(style);
            console.log('✅ Стили анимации добавлены');
        }

        addAnimationStyles();

        // === ПРОВЕРКА ПРОКРУТКИ ===
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

                    // === ПОКАЗЫВАЕМ КРАСИВОЕ УВЕДОМЛЕНИЕ ===
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
