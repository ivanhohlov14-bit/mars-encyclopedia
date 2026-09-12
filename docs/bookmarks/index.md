---
title: 📚 Мои закладки
comments: false
---

<h1 id="bm-title" style="text-align:center;">📚 Мои закладки</h1>
<p style="text-align:center; color:#888; margin-top: -12px;">Все статьи, которые ты сохранил</p>

<div id="bookmarks-container" style="max-width: 800px; margin: 20px auto; font-family: 'Segoe UI', sans-serif;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: bmSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка...</p>
    </div>
</div>

<style>
@keyframes bmSpin { to { transform: rotate(360deg); } }
@keyframes bmFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

#bookmarks-container a { text-decoration: none !important; border-bottom: none !important; }

.bm-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    margin-bottom: 12px;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 2px solid var(--kingdom-color, #6C63FF);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    animation: bmFadeIn 0.5s ease both;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.bm-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px -8px var(--kingdom-shadow, rgba(108,99,255,0.4));
    border-color: var(--kingdom-color, #6C63FF);
}

.bm-item .bm-icon {
    font-size: 2rem;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
    transition: transform 0.3s;
}

.bm-item:hover .bm-icon { transform: scale(1.2) rotate(-8deg); }

.bm-item .bm-body { flex: 1; min-width: 0; }
.bm-item .bm-title {
    font-weight: 700;
    color: #1a1a1a;
    font-size: 1.05rem;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.bm-item .bm-date {
    font-size: 0.78rem;
    color: #888;
}

.bm-item .bm-del {
    background: rgba(0,0,0,0.05);
    border: none;
    cursor: pointer;
    color: #888;
    font-size: 1.1rem;
    padding: 8px 12px;
    border-radius: 50%;
    transition: all 0.25s;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.bm-item .bm-del:hover {
    background: #fee;
    color: #e74c3c;
    transform: rotate(90deg);
}

.bm-empty {
    text-align: center;
    padding: 60px 20px;
    color: #888;
}
.bm-empty .bm-empty-icon {
    font-size: 4rem;
    margin-bottom: 16px;
    opacity: 0.5;
}
.bm-empty p { font-size: 1rem; margin: 8px 0; }
.bm-empty a {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 28px;
    background: var(--kingdom-color, #6C63FF);
    color: #fff !important;
    border-radius: 30px;
    font-weight: 700;
    transition: all 0.3s;
}
.bm-empty a:hover { transform: translateY(-2px); box-shadow: 0 8px 20px var(--kingdom-shadow); }

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
    .bm-item { background: rgba(30, 30, 46, 0.85); }
    .bm-item .bm-title { color: #e0e0e0; }
    .bm-item .bm-del { background: rgba(255,255,255,0.05); }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(async function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
        'Аркадия':    { color: '#D4A574', bg: '#FDF8F0', light: '#E8C9A0' },
        'Ксанф':      { color: '#3D3D3D', bg: '#F5F5F5', light: '#6B6B6B' },
        'Эдем':       { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' },
        'Эридания':   { color: '#F5D76E', bg: '#FFFDF5', light: '#FAE9A0' },
        'Кхонг':      { color: '#A9A9A9', bg: '#F8F8F8', light: '#C8C8C8' },
        'Авсония':    { color: '#87CEEB', bg: '#F0F8FF', light: '#B0D8EB' },
        'Кимерия':    { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9' },
        'Серпентида': { color: '#E57373', bg: '#FFF5F5', light: '#F5A0A0' },
        'Эритрей':    { color: '#64B5F6', bg: '#F0F8FF', light: '#90CAF9' },
        'Утопия':     { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' },
        'Эллада':     { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91' },
        'Аливасото':  { color: '#81C784', bg: '#F0FFF0', light: '#A5D6A7' }
    };

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const container = document.getElementById('bookmarks-container');

    const { data: { session } } = await client.auth.getSession();

    let kingdom = KINGDOMS['Эдем'];
    if (session?.user) {
        const { data: profile } = await client.from('profiles').select('kingdom').eq('user_id', session.user.id).single();
        if (profile?.kingdom && KINGDOMS[profile.kingdom]) kingdom = KINGDOMS[profile.kingdom];
    }

    document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
    document.documentElement.style.setProperty('--kingdom-light', kingdom.light);
    document.documentElement.style.setProperty('--kingdom-shadow', kingdom.color + '40');
    document.body.style.background = kingdom.bg;
    document.body.style.backgroundAttachment = 'fixed';

    if (!session?.user) {
        container.innerHTML = `
            <div class="bm-empty">
                <div class="bm-empty-icon">🔒</div>
                <p>Войдите, чтобы видеть свои закладки</p>
                <a href="/login/">Войти</a>
            </div>
        `;
        return;
    }

    const { data: bookmarks } = await client
        .from('bookmarks')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

    if (!bookmarks || bookmarks.length === 0) {
        container.innerHTML = `
            <div class="bm-empty">
                <div class="bm-empty-icon">📚</div>
                <p>Пока нет закладок</p>
                <p style="font-size: 0.9rem;">Открывайте статьи и нажимайте «🔖 В закладки»</p>
                <a href="/">На главную</a>
            </div>
        `;
        return;
    }

    container.innerHTML = bookmarks.map((b, i) => {
        // Правильная ссылка с полным путём
        const path = b.article_slug.startsWith('/') ? b.article_slug : '/' + b.article_slug;
        const link = path + (path.endsWith('/') ? '' : '/');
        return `
            <div class="bm-item" style="animation-delay: ${i * 0.05}s;">
                <span class="bm-icon">📖</span>
                <a href="${link}" class="bm-body" style="text-decoration:none; color:inherit;">
                    <div class="bm-title">${b.article_title || b.article_slug}</div>
                    <div class="bm-date">Сохранено: ${new Date(b.created_at).toLocaleDateString('ru-RU')}</div>
                </a>
                <button class="bm-del" onclick="window._removeBm('${b.article_slug}', this)">✕</button>
            </div>
        `;
    }).join('');

    window._removeBm = async (slug, btn) => {
        btn.style.transform = 'scale(0)';
        btn.style.opacity = '0';
        setTimeout(async () => {
            await client.from('bookmarks').delete()
                .eq('user_id', session.user.id).eq('article_slug', slug);
            location.reload();
        }, 250);
    };
})();
</script>
