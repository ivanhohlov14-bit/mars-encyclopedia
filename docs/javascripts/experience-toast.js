// docs/javascripts/experience-toast.js
// Уведомление о получении опыта

(function() {
    console.log('✅ experience-toast.js загружен');

    function showExperienceToast(xpAmount) {
        console.log('🎉 Показываем уведомление о +' + xpAmount + ' XP');

        // Проверяем, не было ли уже показано уведомление на этой странице
        if (sessionStorage.getItem('xp_toast_shown')) {
            console.log('⏳ Уведомление уже было показано на этой странице');
            return;
        }

        // Создаём контейнер
        const toast = document.createElement('div');
        toast.id = 'xp-toast';

        // Содержимое уведомления
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
                animation: xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            ">
                <span style="font-size: 2.8rem;">⭐</span>
                <span>+${xpAmount} XP</span>
            </div>
        `;

        // Стили для позиционирования
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999999;
            pointer-events: none;
            animation: xpFadeOut 2.5s ease forwards;
        `;

        document.body.appendChild(toast);

        // Удаляем после анимации
        setTimeout(function() {
            if (toast.parentNode) toast.remove();
        }, 3000);

        // Запоминаем, что уведомление показано
        sessionStorage.setItem('xp_toast_shown', 'true');
    }

    // Добавляем ключевые кадры анимации, если их ещё нет
    if (!document.getElementById('xp-toast-styles')) {
        const style = document.createElement('style');
        style.id = 'xp-toast-styles';
        style.textContent = `
            @keyframes xpPop {
                0% { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes xpFadeOut {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -60%) scale(0.9); }
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Стили для уведомления добавлены');
    }

    // Делаем функцию глобальной
    window.showExperienceToast = showExperienceToast;

    console.log('✅ experience-toast.js готов');
})();
