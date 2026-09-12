---
title: 🏆 Топ статей
comments: false
---

<h1 id="top-title" style="text-align:center;">🏆 Топ-20 статей</h1>
<p style="text-align:center; color:#888; margin-top: -12px;">Самые популярные статьи по мнению читателей</p>

<div id="top-container" style="max-width: 900px; margin: 20px auto; font-family: 'Segoe UI', sans-serif;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #6C63FF; border-top-color: transparent; border-radius: 50%; animation: topSpin 0.8s linear infinite;"></div>
        <p style="color: #999; margin-top: 16px;">Загрузка...</p>
    </div>
</div>

<style>
@keyframes topSpin { to { transform: rotate(360deg); } }
@keyframes topFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

#top-container a { text-decoration: none !important; border-bottom: none !important; }

.top-item {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 20px 24px;
    margin-bottom: 12px;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 2px solid var(--kingdom-color, #6C63FF);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    animation: topFadeIn 0.5s ease both;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.top-item:hover {
    transform: translateX(8px) scale(1.01);
    box-shadow: 0 16px 36px -8px var(--kingdom-shadow, rgba(108,99,255,0.4));
}

.top-item .top-rank {
    font-size: 1.8rem;
    min-width: 50px;
    text-align: center;
    font-weight: 800;
    color: var(--kingdom-color, #6C63FF);
}

.top-item .top-info { flex: 1; min-width: 0; }
.top-item .top-name {
    font-weight: 700;
    color: #1a1a1a;
    font-size: 1.05rem;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.top-item .top-count {
    font-size: 0.82rem;
    color: #888;
    display: flex;
    align-items: center;
    gap: 12px;
}
.top-item .top-bar {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(90deg, var(--kingdom-color, #6C63FF), var(--kingdom-light, #A29BFE));
    margin-top: 8px;
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.top-item .top-icon {
    font-size: 1.8rem;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
}

.top-empty {
    text-align: center;
    padding: 60px 20px;
    color: #888;
}
.top-empty .top-empty-icon { font-size: 4rem; margin-bottom: 16px; opacity: 0.5; }

@media (prefers-color-scheme: dark) {
    .top-item { background: rgba(30, 30, 46, 0.85); }
    .top-item .top-name { color: #e0e0e0; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(async function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = {
        'Эдем': { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' },
        'Кимерия': { color: '#B19CD9', bg: '#F8F4FF', light: '#D1C4E9' },
        'Утопия': { color: '#4DD0E1', bg: '#F0FDFF', light: '#80DEEA' },
        'Эллада': { color: '#FF8A65', bg: '#FFF5F0', light: '#FFAB91' },
        'Аркадия': { color: '#D4A574', bg: '#FDF8F0', light: '#E8C9A0' }
    };

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const container = document.getElementById('top-container');

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

    // Загружаем все рейтинги
    const { data: ratings } = await client.from('article_ratings').select('article_slug, rating');

    // Группируем
    const counts = {};
    (ratings || []).forEach(r => {
        if (!counts[r.article_slug]) counts[r.article_slug] = { likes: 0, dislikes: 0 };
        if (r.rating === 1) counts[r.article_slug].likes++;
        else counts[r.article_slug].dislikes++;
    });

    // Сортируем по лайкам
    const sorted = Object.entries(counts)
        .filter(([_, c]) => c.likes > 0)
        .sort((a, b) => b[1].likes - a[1].likes)
        .slice(0, 20);

    if (sorted.length === 0) {
        container.innerHTML = `
            <div class="top-empty">
                <div class="top-empty-icon">📊</div>
                <p>Пока нет оценок</p>
                <p style="font-size: 0.9rem;">Открывайте статьи и ставьте 👍 внизу страницы</p>
            </div>
        `;
        return;
    }

    const max = sorted[0][1].likes;
    const medals = ['🥇', '🥈', '🥉'];

    container.innerHTML = sorted.map(([slug, c], i) => {
        // Красивое русское название: превращаем slug в читаемый текст
        // Если в slug есть русские буквы — оставляем
        // Иначе — транслитерация не нужна, потому что slug часто английский
        // Пробуем взять title из sitemap
        let displayName = slug
            .split('/').pop()
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, ch => ch.toUpperCase());

        // Если slug содержит русские символы — оставляем
        if (/[а-яА-ЯёЁ]/.test(slug)) {
            displayName = slug.split('/').pop().replace(/-/g, ' ').replace(/_/g, ' ');
        }

        const link = '/' + slug + '/';
        const barWidth = (c.likes / max) * 100;

        return `
            <a href="${link}" class="top-item" style="animation-delay: ${i * 0.04}s;">
                <div class="top-rank">${medals[i] || (i + 1)}</div>
                <div class="top-info">
                    <div class="top-name">${displayName}</div>
                    <div class="top-count">
                        <span>👍 ${c.likes}</span>
                        ${c.dislikes > 0 ? `<span>👎 ${c.dislikes}</span>` : ''}
                    </div>
                    <div class="top-bar" style="width: ${barWidth}%"></div>
                </div>
            </a>
        `;
    }).join('');
})();
</script>
