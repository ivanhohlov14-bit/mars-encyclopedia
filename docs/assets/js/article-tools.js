// article-tools.js — лайки внизу, закладка наверху
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // Страницы, где НЕ показываем лайки/закладки
    const EXCLUDED = [
        '', 'index', 'profile', 'login', 'register', 'stats',
        'game', 'profile-view', 'moderator', 'license', 'support',
        'start-here', 'globe-map', 'interactive', 'translator',
        'bookmarks', 'top', 'quest-map'
    ];

    let client = null;
    let currentUser = null;

    // ============================================================
    // Получить полный путь (например, geography/acidalia-sea)
    // ============================================================
    function getFullPath() {
        return window.location.pathname.replace(/^\/|\/$/g, '');
    }

    function getLastSegment() {
        const path = getFullPath();
        const parts = path.split('/');
        return parts[parts.length - 1] || '';
    }

    function isExcluded() {
        const last = getLastSegment();
        const path = getFullPath();
        return EXCLUDED.includes(last) || EXCLUDED.includes(path);
    }

    // ============================================================
    // Заголовок статьи (с русского H1 или front matter)
    // ============================================================
    function getArticleTitle() {
        // 1. Пробуем H1
        const h1 = document.querySelector('.md-content h1, article h1, h1');
        if (h1 && h1.textContent.trim()) {
            return h1.textContent.trim().replace(/^#+\s*/, '').substring(0, 200);
        }
        // 2. Пробуем meta title
        const metaTitle = document.querySelector('meta[property="og:title"]');
        if (metaTitle) return metaTitle.content.substring(0, 200);
        // 3. Fallback
        return document.title.split(' - ')[0].substring(0, 200) || getLastSegment();
    }

    // ============================================================
    // Загрузка данных
    // ============================================================
    async function getRatingStats(slug) {
        const { data } = await client
            .from('article_ratings')
            .select('rating')
            .eq('article_slug', slug);
        const likes = (data || []).filter(r => r.rating === 1).length;
        const dislikes = (data || []).filter(r => r.rating === -1).length;
        return { likes, dislikes };
    }

    async function getUserRating(slug, userId) {
        const { data } = await client
            .from('article_ratings')
            .select('rating')
            .eq('user_id', userId)
            .eq('article_slug', slug)
            .maybeSingle();
        return data?.rating || 0;
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

    // ============================================================
    // Действия
    // ============================================================
    async function rateArticle(slug, rating) {
        if (!currentUser) {
            showToast('Войдите, чтобы оценивать статьи', 'warning');
            return;
        }
        const existing = await getUserRating(slug, currentUser.id);
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
        renderBottomWidget(slug);
    }

    async function toggleBookmark() {
        if (!currentUser) {
            showToast('Войдите, чтобы добавлять в закладки', 'warning');
            return;
        }
        const slug = getFullPath();
        const title = getArticleTitle();
        const exists = await isBookmarked(slug, currentUser.id);
        if (exists) {
            await client.from('bookmarks').delete()
                .eq('user_id', currentUser.id).eq('article_slug', slug);
            showToast('Удалено из закладок', 'info');
        } else {
            await client.from('bookmarks').insert({
                user_id: currentUser.id,
                article_slug: slug,
                article_title: title
            });
            showToast('✓ Добавлено в закладки', 'success');
        }
        renderTopWidget();
    }

    // ============================================================
    // Тост-уведомления
    // ============================================================
    function showToast(message, type = 'info') {
        const colors = {
            success: 'linear-gradient(135deg, #27ae60, #16a085)',
            info: 'linear-gradient(135deg, #3498db, #2980b9)',
            warning: 'linear-gradient(135deg, #e67e22, #d35400)',
            error: 'linear-gradient(135deg, #e74c3c, #c0392b)'
        };
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: ${colors[type] || colors.info};
            color: #fff;
            padding: 14px 28px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 0.95rem;
            box-shadow: 0 12px 32px rgba(0,0,0,0.3);
            z-index: 99999;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 400);
        }, 2200);
    }

    // ============================================================
    // Верхний виджет — закладка справа от H1
    // ============================================================
    async function renderTopWidget() {
        const h1 = document.querySelector('.md-content h1, article h1, h1');
        if (!h1) return;

        // Удаляем старый
        const old = document.getElementById('article-top-tools');
        if (old) old.remove();

        const slug = getFullPath();
        const bookmarked = currentUser ? await isBookmarked(slug, currentUser.id) : false;

        // Обернём H1 в flex-контейнер
        let wrapper = h1.parentNode.querySelector('.h1-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'h1-wrapper';
            wrapper.style.cssText = 'display: flex; align-items: center; gap: 16px; justify-content: space-between; flex-wrap: wrap;';
            h1.parentNode.insertBefore(wrapper, h1);
            wrapper.appendChild(h1);
        }

        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.id = 'article-top-tools';
        bookmarkBtn.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border-radius: 30px;
            border: 2px solid var(--kingdom-color, #6C63FF);
            background: ${bookmarked ? 'var(--kingdom-color, #6C63FF)' : 'rgba(255,255,255,0.9)'};
            color: ${bookmarked ? '#fff' : 'var(--kingdom-color, #6C63FF)'};
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            white-space: nowrap;
            box-shadow: 0 4px 12px ${bookmarked ? 'var(--kingdom-shadow, rgba(108,99,255,0.3))' : 'rgba(0,0,0,0.08)'};
        `;
        bookmarkBtn.innerHTML = bookmarked ? '✓ В закладках' : '🔖 В закладки';
        bookmarkBtn.onmouseenter = () => {
            bookmarkBtn.style.transform = 'translateY(-2px) scale(1.05)';
            bookmarkBtn.style.boxShadow = '0 8px 20px var(--kingdom-shadow, rgba(108,99,255,0.4))';
        };
        bookmarkBtn.onmouseleave = () => {
            bookmarkBtn.style.transform = 'translateY(0) scale(1)';
            bookmarkBtn.style.boxShadow = `0 4px 12px ${bookmarked ? 'var(--kingdom-shadow, rgba(108,99,255,0.3))' : 'rgba(0,0,0,0.08)'}`;
        };
        bookmarkBtn.onclick = toggleBookmark;

        wrapper.appendChild(bookmarkBtn);
    }

    // ============================================================
    // Нижний виджет — лайки/дизлайки рядом с комментариями
    // ============================================================
    async function renderBottomWidget(slug) {
        // Удаляем старый
        const old = document.getElementById('article-bottom-tools');
        if (old) old.remove();

        const stats = await getRatingStats(slug);
        const userRating = currentUser ? await getUserRating(slug, currentUser.id) : 0;

        const widget = document.createElement('div');
        widget.id = 'article-bottom-tools';
        widget.className = 'article-bottom-tools';
        widget.style.cssText = `
            margin: 40px 0 24px 0;
            padding: 24px 28px;
            background: rgba(255,255,255,0.85);
            backdrop-filter: blur(12px);
            border-radius: 16px;
            border: 2px solid var(--kingdom-color, #6C63FF);
            box-shadow: 0 8px 24px rgba(0,0,0,0.06);
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
        `;

        widget.innerHTML = `
            <div style="font-size: 1rem; font-weight: 700; color: #1a1a1a; margin-right: auto;">
                Понравилась статья?
            </div>
            <button id="like-btn" style="
                display: inline-flex; align-items: center; gap: 8px;
                padding: 12px 22px; border-radius: 30px;
                border: 2px solid ${userRating === 1 ? '#27ae60' : 'rgba(0,0,0,0.1)'};
                background: ${userRating === 1 ? 'linear-gradient(135deg, #27ae60, #16a085)' : 'rgba(255,255,255,0.9)'};
                color: ${userRating === 1 ? '#fff' : '#333'};
                font-weight: 700; font-size: 1rem; cursor: pointer;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            ">
                <span style="font-size: 1.3rem;">👍</span>
                <span>${stats.likes}</span>
            </button>
            <button id="dislike-btn" style="
                display: inline-flex; align-items: center; gap: 8px;
                padding: 12px 22px; border-radius: 30px;
                border: 2px solid ${userRating === -1 ? '#e74c3c' : 'rgba(0,0,0,0.1)'};
                background: ${userRating === -1 ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'rgba(255,255,255,0.9)'};
                color: ${userRating === -1 ? '#fff' : '#333'};
                font-weight: 700; font-size: 1rem; cursor: pointer;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            ">
                <span style="font-size: 1.3rem;">👎</span>
                <span>${stats.dislikes}</span>
            </button>
        `;

        // Вставляем перед комментариями (если есть) или в конец контента
        const comments = document.querySelector('#comments, .comments, #disqus_thread, .giscus, .md-comments');
        const content = document.querySelector('.md-content__inner, article, .md-content');

        if (comments && comments.parentNode) {
            comments.parentNode.insertBefore(widget, comments);
        } else if (content) {
            content.appendChild(widget);
        } else {
            document.body.appendChild(widget);
        }

        // Обработчики
        widget.querySelector('#like-btn').onclick = () => rateArticle(slug, 1);
        widget.querySelector('#dislike-btn').onclick = () => rateArticle(slug, -1);
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

        // Ждём H1 (Material иногда долго грузит)
        let attempts = 0;
        const waitH1 = setInterval(async () => {
            const h1 = document.querySelector('.md-content h1, article h1, h1');
            if (h1 || attempts > 20) {
                clearInterval(waitH1);
                await renderTopWidget();
                await renderBottomWidget(slug);
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
