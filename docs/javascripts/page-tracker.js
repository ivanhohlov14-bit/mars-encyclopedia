// docs/javascripts/page-tracker.js
// Автоматически начисляет опыт после прочтения любой статьи

console.log('✅ page-tracker.js загружен');

document.addEventListener('DOMContentLoaded', function() {
    // Исключаем служебные страницы, где опыт не нужен
    const excludePages = ['/profile/', '/login/', '/register/', '/stats/', '/profile-view/'];
    if (excludePages.includes(window.location.pathname)) {
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

        function checkScroll() {
            if (xpAwarded) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;

            if (maxScroll <= 50) return;

            const scrollPercent = (scrollY / maxScroll) * 100;

            if (scrollPercent >= 90) {
                xpAwarded = true;

                if (typeof window.addExperience === 'function') {
                    window.addExperience(user.id, 5);
                    localStorage.setItem(pageKey, 'true');
                    console.log('✅ +5 XP за прочтение статьи!');

                    // === ПОКАЗЫВАЕМ УВЕДОМЛЕНИЕ ===
                    if (typeof window.showExperienceToast === 'function') {
                        window.showExperienceToast(5);
                    } else {
                        // Fallback — встроенное уведомление
                        showFallbackToast(5);
                    }
                }

                window.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        }

        // Fallback-уведомление (если experience-toast.js не загружен)
        function showFallbackToast(xpAmount) {
            if (sessionStorage.getItem('xp_toast_shown')) return;

            const toast = document.createElement('div');
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

            setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3000);
            sessionStorage.setItem('xp_toast_shown', 'true');

            // Добавляем стили, если их нет
            if (!document.getElementById('xp-toast-styles-fallback')) {
                const style = document.createElement('style');
                style.id = 'xp-toast-styles-fallback';
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
            }
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        setTimeout(checkScroll, 500);
    });
});
