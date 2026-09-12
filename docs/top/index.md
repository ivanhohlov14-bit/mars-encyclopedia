---
title: 🏆 Топ статей
---

<h1 id="top-title" style="text-align:center;">🏆 Топ-10 статей</h1>

<div id="top-container" style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', sans-serif;">
    <p style="text-align:center; color:#999; padding: 40px;">Загрузка...</p>
</div>

<style>
.top-item {
    display: flex; align-items: center; gap: 16px;
    padding: 18px 22px; margin-bottom: 12px;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    border: 2px solid var(--kingdom-color, #6C63FF);
    text-decoration: none; color: inherit;
    transition: all 0.25s;
}
.top-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px -8px var(--kingdom-color, #6C63FF) 60;
}
.top-item .top-rank { font-size: 1.8rem; min-width: 40px; text-align:center; }
.top-item .top-info { flex: 1; }
.top-item .top-name { font-weight: 700; color: #1a1a1a; font-size: 1rem; }
.top-item .top-count { font-size: 0.85rem; color: #888; margin-top: 2px; }
.top-item .top-bar {
    height: 6px; border-radius: 3px;
    background: var(--kingdom-color, #6C63FF);
    margin-top: 6px;
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(async function() {
    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const KINGDOMS = { 'Эдем': { color: '#F4A460', bg: '#FFF8F0', light: '#F7C98A' } };

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const container = document.getElementById('top-container');

    const { data: { session } } = await client.auth.getSession();
    let kingdom = KINGDOMS['Эдем'];
    if (session?.user) {
        const { data: profile } = await client.from('profiles').select('kingdom').eq('user_id', session.user.id).single();
        if (profile?.kingdom && KINGDOMS[profile.kingdom]) kingdom = KINGDOMS[profile.kingdom];
    }
    document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
    document.body.style.background = kingdom.bg;
    document.body.style.backgroundAttachment = 'fixed';

    // Считаем лайки
    const { data: ratings } = await client.from('article_ratings').select('article_slug, rating');
    const counts = {};
    (ratings || []).forEach(r => {
        if (r.rating === 1) counts[r.article_slug] = (counts[r.article_slug] || 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);

    if (sorted.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 40px; color:#888;">Пока нет оценок. Открывайте статьи и ставьте 👍!</p>';
        return;
    }

    const max = sorted[0][1];
    const medals = ['🥇', '🥈', '🥉'];

    container.innerHTML = sorted.map(([slug, count], i) => `
        <a href="/${slug}/" class="top-item">
            <div class="top-rank">${medals[i] || (i + 1)}</div>
            <div class="top-info">
                <div class="top-name">${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                <div class="top-count">👍 ${count} ${count === 1 ? 'лайк' : count < 5 ? 'лайка' : 'лайков'}</div>
                <div class="top-bar" style="width: ${(count / max) * 100}%"></div>
            </div>
        </a>
    `).join('');
})();
</script>
