// docs/javascripts/page-tracker.js
// УЛЬТРА-НАДЁЖНАЯ ВЕРСИЯ — без внешних зависимощей

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

                // === 1. Начисляем опыт ===
                try {
                    if (typeof window.addExperience === 'function') {
                        window.addExperience(user.id, 5);
                        localStorage.setItem(pageKey, 'true');
                        console.log('✅ +5 XP начислено!');
                    } else {
                        console.warn('⚠️ addExperience не определена');
                    }
                } catch (e) {
                    console.error('❌ Ошибка при начислении опыта:', e);
                }

                // === 2. Показываем уведомление (максимально просто) ===
                try {
                    console.log('📢 ПЫТАЕМСЯ ПОКАЗАТЬ УВЕДОМЛЕНИЕ');
                    
                    // Вариант А: alert (если не сработает — перейдём к варианту Б)
                    alert('🎉 +5 XP за прочтение статьи!');
                    
                    // Вариант Б: простейшее DOM-уведомление
                    const toast = document.createElement('div');
                    toast.textContent = '⭐ +5 XP';
                    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999999;background:#6C63FF;color:white;padding:20px 40px;border-radius:10px;font-size:2rem;font-weight:bold;font-family:Arial;box-shadow:0 4px 20px rgba(0,0,0,0.3);';
                    document.body.appendChild(toast);
                    console.log('✅ DOM-уведомление добавлено');
                    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3000);
                    
                } catch (e) {
                    console.error('❌ Ошибка при показе уведомления:', e);
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
