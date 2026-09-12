---
title: 📚 Мои закладки
---

<h1 id="bm-title" style="text-align:center;">📚 Мои закладки</h1>

<div id="bookmarks-container" style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', sans-serif;">
    <p style="text-align:center; color:#999; padding: 40px;">Загрузка...</p>
</div>

<style>
.bm-item {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 20px; margin-bottom: 10px;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    border: 2px solid var(--kingdom-color, #6C63FF);
    text-decoration: none; color: inherit;
    transition: all 0.25s;
}
.bm-item:hover {
    transform: translateX(6px);
    box-shadow: 0 8px 20px -6px var(--kingdom-color, #6C63FF) 40;
}
.bm-item .bm-icon { font-size: 1.6rem; }
.bm-item .bm-title { flex: 1; font-weight: 700; color: #1a1a1a; }
.bm-item .bm-date { font-size: 0.75rem; color: #999; }
.bm-item .bm-del {
    background: none; border: none; cursor: pointer;
    color: #999; font-size: 1.2rem; padding: 4px 10px;
    border-radius: 6px; transition: all 0.2s;
}
.bm-item .bm-del:hover { background: #fee; color: #e74c3c; }
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
        'Аркадия': { color: '#D4A574', bg: '#FDF8F0', light: '#E8C9A0' },
        'Ксанф': { color: '#3D3D3D', bg: '#F5F5F5', light: '#6B6B6B' },
        'Эдем': { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' },
        'Кимерия': { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9' },
        'Утопия': { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' },
        'Эллада': { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91' }
    };

    (async function() {
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const container = document.getElementById('bookmarks-container');

        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) {
            container.innerHTML = '<p style="text-align:center; padding: 40px;">Войдите, чтобы видеть закладки. <a href="/login/">Войти →</a></p>';
            return;
        }

        // Тема
        const { data: profile } = await client.from('profiles').select('kingdom').eq('user_id', session.user.id).single();
        const kingdom = KINGDOMS[profile?.kingdom] || KINGDOMS['Эдем'];
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.body.style.background = kingdom.bg;
        document.body.style.backgroundAttachment = 'fixed';

        // Загружаем закладки
        const { data: bookmarks } = await client
            .from('bookmarks')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });

        if (!bookmarks || bookmarks.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding: 40px; color:#888;">Пока нет закладок. Открывайте статьи и нажимайте «🔖 В закладки».</p>';
            return;
        }

        container.innerHTML = bookmarks.map(b => `
            <div class="bm-item">
                <span class="bm-icon">📖</span>
                <a href="/${b.article_slug}/" class="bm-title" style="text-decoration:none; color:inherit; flex:1;">${b.article_title || b.article_slug}</a>
                <span class="bm-date">${new Date(b.created_at).toLocaleDateString('ru-RU')}</span>
                <button class="bm-del" onclick="window._removeBm('${b.article_slug}')">✕</button>
            </div>
        `).join('');

        window._removeBm = async (slug) => {
            await client.from('bookmarks').delete()
                .eq('user_id', session.user.id).eq('article_slug', slug);
            location.reload();
        };
    })();
})();
</script>
