// Автоматически начисляет опыт за просмотр любой страницы
document.addEventListener('DOMContentLoaded', function() {
    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );
    
    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        if (!user) return;
        
        // Исключаем страницы, которые не должны давать опыт
        const excludePages = ['/profile/', '/login/', '/register/', '/'];
        if (excludePages.includes(window.location.pathname)) return;
        
        const pageKey = `read_${window.location.pathname}`;
        if (!localStorage.getItem(pageKey)) {
            if (typeof window.addExperience === 'function') {
                window.addExperience(user.id, 5);
                localStorage.setItem(pageKey, 'true');
            }
        }
    });
});
