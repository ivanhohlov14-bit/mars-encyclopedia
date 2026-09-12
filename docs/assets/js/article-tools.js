// article-tools.js — лайки + закладки на каждой статье
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // Исключённые страницы (главная, служебные)
    const EXCLUDED = ['/', '/index', '/login/', '/register/', '/profile/', '/stats/', '/interactive/', '/bookmarks/', '/top/'];

    let client = null;
    let currentUser = null;

    function getArticleSlug() {
        const path = window.location.pathname.replace(/^\/|\/$/g, '');
        if (EXCLUDED.some(e => path === e.replace(/^\/|\/$/g, ''))) return null;
        const parts = path.split('/');
        return parts[parts.length - 1] || null;
    }

    function getArticleTitle() {
        const h1 = document.querySelector('h1');
        if (h1) return h1.textContent.trim().substring(0, 200);
        return document.title.split(' - ')[0] || '';
    }

    async function getCurrentRating(slug, userId) {
        const { data } = await client
            .from('article_ratings')
            .select('rating')
            .eq('user_id', userId)
            .eq('article_slug', slug)
            .maybeSingle();
        return data?.rating || 0;
    }

    async function getRatingStats(slug) {
        const { data } = await client
            .from('article_ratings')
            .select('rating')
            .eq('article_slug', slug);
        const likes = (data || []).filter(r => r.rating === 1).length;
        const dislikes = (data || []).filter(r => r.rating === -1).length;
        return { likes, dislikes };
    }

    async function isBookmarked(slug, userId) {
        const { data } = await client
            .from('bookmarks')
            .select('id')
            .eq('user_id', userId)
            .eq('article_slug', slug)
            .maybeSingle();
        return !!data;
    }

    async function rateArticle(slug, rating) {
        if (!currentUser) { alert('Войдите, чтобы оценивать статьи'); return; }
        const existing = await getCurrentRating(slug, currentUser.id);
        if (existing === rating) {
            await client.from('article_ratings').delete()
                .eq('user_id', currentUser.id).eq('article_slug', slug);
        } else {
            await client.from('article_ratings').upsert({
                user_id: currentUser.id,
                article_slug: slug,
                rating: rating
            }, { onConflict: 'user_id,article_slug' });
        }
        renderWidget(slug);
    }

    async function toggleBookmark(slug, title) {
        if (!currentUser) { alert('Войдите, чтобы добавлять в закладки'); return; }
        const exists = await isBookmarked(slug, currentUser.id);
        if (exists) {
            await client.from('bookmarks').delete()
                .eq('user_id', currentUser.id).eq('article_slug', slug);
        } else {
            await client.from('bookmarks').insert({
                user_id: currentUser.id,
                article_slug: slug,
                article_title: title
            });
        }
        renderWidget(slug);
    }

    async function renderWidget(slug) {
        const widget = document.getElementById('article-tools-widget');
        if (!widget) return;

        const stats = await getRatingStats(slug);
        const userRating = currentUser ? await getCurrentRating(slug, currentUser.id) : 0;
        const bookmarked = currentUser ? await isBookmarked(slug, currentUser.id) : false;

        widget.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin: 24px 0; padding: 16px 20px; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); border-radius: 14px; border: 2px solid var(--kingdom-color, #6C63FF);">
                <button onclick="window._articleTools.rate(1)" style="display: flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 10px; border: 2px solid ${userRating === 1 ? '#27ae60' : '#ddd'}; background: ${userRating === 1 ? '#27ae60' : '#fff'}; color: ${userRating === 1 ? '#fff' : '#333'}; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s;">
                    👍 <span>${stats.likes}</span>
                </button>
                <button onclick="window._articleTools.rate(-1)" style="display: flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 10px; border: 2px solid ${userRating === -1 ? '#e74c3c' : '#ddd'}; background: ${userRating === -1 ? '#e74c3c' : '#fff'}; color: ${userRating === -1 ? '#fff' : '#333'}; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s;">
                    👎 <span>${stats.dislikes}</span>
                </button>
                <button onclick="window._articleTools.bookmark()" style="display: flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 10px; border: 2px solid var(--kingdom-color, #6C63FF); background: ${bookmarked ? 'var(--kingdom-color, #6C63FF)' : '#fff'}; color: ${bookmarked ? '#fff' : 'var(--kingdom-color, #6C63FF)'}; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s; margin-left: auto;">
                    ${bookmarked ? '✓ В закладках' : '🔖 В закладки'}
                </button>
            </div>
        `;
    }

    async function init() {
        const slug = getArticleSlug();
        if (!slug) return;
        if (typeof supabase === 'undefined') return;

        client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        // Вставляем виджет после H1
        const h1 = document.querySelector('h1');
        if (!h1) return;
        const widget = document.createElement('div');
        widget.id = 'article-tools-widget';
        h1.parentNode.insertBefore(widget, h1.nextSibling);

        const title = getArticleTitle();
        window._articleTools = {
            rate: (r) => rateArticle(slug, r),
            bookmark: () => toggleBookmark(slug, title)
        };

        await renderWidget(slug);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
