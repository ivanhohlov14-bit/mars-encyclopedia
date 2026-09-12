// article-tools.js — компактный блок ПЕРЕД комментариями (с MutationObserver)
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    const EXCLUDED_PATHS = [
        '/', '/index/', '/profile/', '/login/', '/register/',
        '/stats/', '/game/', '/profile-view/', '/moderator/',
        '/license/', '/support/', '/start-here/', '/globe-map/',
        '/interactive/exodus/', '/music/constructor/', '/interactive/',
        '/translator/', '/bookmarks/', '/top/', '/quest-map/'
    ];

    let client = null;
    let currentUser = null;

    function getFullPath() {
        return window.location.pathname.replace(/^\/|\/$/g, '');
    }

    function isExcluded() {
        return EXCLUDED_PATHS.includes(window.location.pathname);
    }

    function getArticleTitle() {
        const h1 = document.querySelector('.md-content h1, article h1, h1');
        if (h1 && h1.textContent.trim()) return h1.textContent.trim().substring(0, 200);
        return document.title.split(' - ')[0].substring(0, 200) || getFullPath();
    }

    // ============================================================
    // Данные
    // ============================================================
    async function getStats(slug) {
        const { data } = await client.from('article_ratings').select('rating').eq('article_slug', slug);
        return {
            likes: (data || []).filter(r => r.rating === 1).length,
            dislikes: (data || []).filter(r => r.rating === -1).length
        };
    }

    async function getUserRating(slug, userId) {
        const { data } = await client.from('article_ratings')
            .select('rating').eq('user_id', userId).eq('article_slug', slug).maybeSingle();
        return data?.rating || 0;
    }

    async function isBookmarked(slug, userId) {
        const { data } = await client.from('bookmarks')
            .select('id').eq('user_id', userId).eq('article_slug', slug).maybeSingle();
        return !!data;
    }

    function showToast(message, type = 'info') {
        const colors = {
            success: 'linear-gradient(135deg, #27ae60, #16a085)',
            info: 'linear-gradient(135deg, #3498db, #2980b9)',
            warning: 'linear-gradient(135deg, #e67e22, #d35400)'
        };
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: ${colors[type] || colors.info};
            color: #fff; padding: 10px 22px; border-radius: 30px;
            font-weight: 600; font-size: 0.85rem;
            box-shadow: 0 12px 32px rgba(0,0,0,0.3);
            z-index: 99999;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => { toast.style.transform = 'translateX(-50%) translateY(0)'; });
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 400);
        }, 2000);
    }

    // ============================================================
    // Действия
    // ============================================================
    async function rateArticle(slug, rating) {
        if (!currentUser) { showToast('Войдите, чтобы оценивать', 'warning'); return; }
        const existing = await getUserRating(slug, currentUser.id);
        if (existing === rating) {
            await client.from('article_ratings').delete()
                .eq('user_id', currentUser.id).eq('article_slug', slug);
        } else {
            await client.from('article_ratings').upsert({
                user_id: currentUser.id, article_slug: slug, rating: rating
            }, { onConflict: 'user_id,article_slug' });
        }
        renderWidget(slug);
    }

    async function toggleBookmark(slug, title) {
        if (!currentUser) { showToast('Войдите, чтобы добавлять в закладки', 'warning'); return; }
        const exists = await isBookmarked(slug, currentUser.id);
        if (exists) {
            await client.from('bookmarks').delete()
                .eq('user_id', currentUser.id).eq('article_slug', slug);
            showToast('Удалено из закладок', 'info');
        } else {
            await client.from('bookmarks').insert({
                user_id: currentUser.id, article_slug: slug, article_title: title
            });
            showToast('✓ Добавлено в закладки', 'success');
        }
        renderWidget(slug);
    }

    // ============================================================
    // Виджет
    // ============================================================
    async function renderWidget(slug, commentsEl) {
        const old = document.getElementById('article-tools-widget');
        if (old) old.remove();

        const stats = await getStats(slug);
        const userRating = currentUser ? await getUserRating(slug, currentUser.id) : 0;
        const bookmarked = currentUser ? await isBookmarked(slug, currentUser.id) : false;
        const title = getArticleTitle();

        const widget = document.createElement('div');
        widget.id = 'article-tools-widget';
        widget.style.cssText = `
            margin: 32px 0 20px 0;
            padding: 12px 16px;
            background: rgba(255,255,255,0.85);
            backdrop-filter: blur(12px);
            border-radius: 12px;
            border: 1px solid var(--kingdom-color, #6C63FF);
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            font-size: 0.85rem;
        `;

        widget.innerHTML = `
            <span style="color: #666; margin-right: 4px;">Оцените:</span>
            <button id="like-btn" style="display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:20px;border:1px solid ${userRating===1?'#27ae60':'rgba(0,0,0,0.1)'};background:${userRating===1?'#27ae60':'transparent'};color:${userRating===1?'#fff':'#555'};font-weight:600;font-size:0.8rem;cursor:pointer;transition:all 0.2s;">👍 ${stats.likes}</button>
            <button id="dislike-btn" style="display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:20px;border:1px solid ${userRating===-1?'#e74c3c':'rgba(0,0,0,0.1)'};background:${userRating===-1?'#e74c3c':'transparent'};color:${userRating===-1?'#fff':'#555'};font-weight:600;font-size:0.8rem;cursor:pointer;transition:all 0.2s;">👎 ${stats.dislikes}</button>
            <button id="bookmark-btn" style="display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:20px;border:1px solid var(--kingdom-color,#6C63FF);background:${bookmarked?'var(--kingdom-color,#6C63FF)':'transparent'};color:${bookmarked?'#fff':'var(--kingdom-color,#6C63FF)'};font-weight:600;font-size:0.8rem;cursor:pointer;transition:all 0.2s;margin-left:auto;">${bookmarked?'✓ В закладках':'🔖 В закладки'}</button>
        `;

        // ============================================================
        // ВСТАВКА
        // ============================================================
        if (commentsEl && commentsEl.parentNode) {
            // Вставляем ПЕРЕД комментариями
            commentsEl.parentNode.insertBefore(widget, commentsEl);
            console.log('✅ article-tools: вставлен перед комментариями');
        } else {
            // Fallback: вставляем ПОСЛЕ .md-content__inner (не внутрь!)
            const content = document.querySelector('.md-content__inner');
            if (content && content.parentNode) {
                content.parentNode.insertBefore(widget, content.nextSibling);
                console.log('⚠️ article-tools: комментарии не найдены, вставлен после статьи');
            } else {
                document.body.appendChild(widget);
                console.log('⚠️ article-tools: вставлен в body');
            }
        }

        widget.querySelector('#like-btn').onclick = () => rateArticle(slug, 1);
        widget.querySelector('#dislike-btn').onclick = () => rateArticle(slug, -1);
        widget.querySelector('#bookmark-btn').onclick = () => toggleBookmark(slug, title);
    }

    // ============================================================
    // Поиск комментариев через MutationObserver
    // ============================================================
    function findComments() {
        const selectors = [
            '#comments', '.comments', '#disqus_thread',
            '.giscus', '.giscus-frame', '[class*="giscus"]',
            '.utterances', '.md-comments', '.article-comments',
            'iframe[src*="giscus"]', 'iframe[src*="disqus"]',
            '[id*="comments"]', '[class*="comment"]'
        ];
        for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el) return el;
        }
        return null;
    }

    function waitForCommentsAndRender(slug, maxWait = 6000) {
        // 1. Проверяем сразу
        const immediate = findComments();
        if (immediate) {
            renderWidget(slug, immediate);
            return;
        }

        // 2. MutationObserver — ждём появления
        let done = false;
        const observer = new MutationObserver(() => {
            if (done) return;
            const el = findComments();
            if (el) {
                done = true;
                observer.disconnect();
                clearTimeout(timeout);
                renderWidget(slug, el);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // 3. Таймаут — вставляем без комментариев
        const timeout = setTimeout(() => {
            if (done) return;
            done = true;
            observer.disconnect();
            renderWidget(slug, null);
        }, maxWait);
    }

    // ============================================================
    // Инициализация
    // ============================================================
    async function init() {
        if (isExcluded()) {
            console.log('ℹ️ article-tools: страница исключена');
            return;
        }
        if (typeof supabase === 'undefined') return;

        client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;

        const slug = getFullPath();

        // Ждём загрузки основного контента
        let attempts = 0;
        const waitContent = setInterval(() => {
            const content = document.querySelector('.md-content__inner');
            if (content || attempts > 25) {
                clearInterval(waitContent);
                waitForCommentsAndRender(slug);
            }
            attempts++;
        }, 200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
