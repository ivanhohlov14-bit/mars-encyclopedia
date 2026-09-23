// ============================================================
// article-tools.js — v2 VIP
// Лайки + закладки статей. Единый клиент, оптимистичный UI.
// ============================================================
(function() {
    'use strict';

    // ============================================================
    // 🚫 Исключения
    // ============================================================
    var EXCLUDED_PATHS = [
        '/', '/index/', '/profile/', '/login/', '/register/',
        '/stats/', '/game/', '/profile-view/', '/moderator/',
        '/license/', '/support/', '/start-here/', '/globe-map/',
        '/interactive/exodus/', '/music/constructor/', '/interactive/',
        '/translator/', '/bookmarks/', '/top/', '/quest-map/',
        '/achievements/', '/feed/', '/guilds/', '/quests/',
        '/horoscope/', '/scrolls/', '/forum/', '/link-device/',
        '/en/', '/en/index/'
    ];

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var CACHE_PREFIX = 'mars-article-tools-';
    var CACHE_TTL = 60 * 1000; // 1 минута

    function getFullPath() {
        return window.location.pathname.replace(/^\/|\/$/g, '');
    }

    function isExcluded() {
        return EXCLUDED_PATHS.indexOf(window.location.pathname) !== -1;
    }

    function getArticleTitle() {
        var h1 = document.querySelector('.rst-content h1, .wy-nav-content h1, h1');
        if (h1) return h1.textContent.trim().substring(0, 200);
        return (document.title.split(' - ')[0] || getFullPath()).substring(0, 200);
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        return window.innerWidth <= 768;
    }

    // ============================================================
    // 🌉 Единый клиент (или fallback)
    // ============================================================
    function getClient() {
        if (window.supabaseClient && window.supabaseClient.auth) return window.supabaseClient;
        if (window.getSupabase) {
            try {
                var c = window.getSupabase();
                if (c && c.auth) return c;
            } catch(e) {}
        }
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            try {
                window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
                    auth: {
                        storageKey: 'sb-ncytbgbzfjfoqmmgfygz-auth-token',
                        persistSession: true,
                        autoRefreshToken: true,
                        detectSessionInUrl: false
                    }
                });
                return window.supabaseClient;
            } catch(e) {}
        }
        return null;
    }

    // ============================================================
    // 📖 Сессия пользователя
    // ============================================================
    var currentUser = null;
    var userReady = null;

    function waitForUser(maxMs) {
        maxMs = maxMs || 5000;
        if (userReady) return userReady;
        userReady = new Promise(function(resolve) {
            var client = getClient();
            if (!client) { resolve(null); return; }

            // Если есть готовый кэш
            if (window.marsSession && window.marsSession.user) {
                currentUser = window.marsSession.user;
                resolve(currentUser);
                return;
            }

            var start = Date.now();
            var iv = setInterval(function() {
                if (window.marsSession && window.marsSession.user) {
                    currentUser = window.marsSession.user;
                    clearInterval(iv);
                    resolve(currentUser);
                    return;
                }
                if (Date.now() - start > maxMs) {
                    clearInterval(iv);
                    client.auth.getSession().then(function(r) {
                        currentUser = (r && r.data && r.data.session && r.data.session.user) || null;
                        resolve(currentUser);
                    }).catch(function() { resolve(null); });
                }
            }, 150);
        });
        return userReady;
    }

    // ============================================================
    // 🌐 Fetch с ретраями
    // ============================================================
    async function withRetry(fn, retries) {
        retries = retries == null ? 2 : retries;
        var lastErr;
        for (var i = 0; i <= retries; i++) {
            try {
                return await fn();
            } catch (e) {
                lastErr = e;
                if (i < retries) await new Promise(function(r) { setTimeout(r, 500 * (i + 1)); });
            }
        }
        throw lastErr;
    }

    // ============================================================
    // 💾 Кэш
    // ============================================================
    function cacheKey(slug) { return CACHE_PREFIX + slug; }

    function readCache(slug) {
        try {
            var raw = localStorage.getItem(cacheKey(slug));
            if (!raw) return null;
            var c = JSON.parse(raw);
            if (!c || Date.now() - c.ts > CACHE_TTL) return null;
            return c;
        } catch(e) { return null; }
    }

    function writeCache(slug, data) {
        try {
            localStorage.setItem(cacheKey(slug), JSON.stringify({
                data: data,
                ts: Date.now()
            }));
        } catch(e) {}
    }

    function invalidateCache(slug) {
        try { localStorage.removeItem(cacheKey(slug)); } catch(e) {}
    }

    // ============================================================
    // 📊 Данные
    // ============================================================
    async function getStats(slug) {
        var client = getClient();
        if (!client) return { likes: 0, dislikes: 0 };
        var res = await withRetry(function() {
            return client.from('article_ratings').select('rating').eq('article_slug', slug);
        }, 1);
        var rows = (res && res.data) || [];
        var likes = 0, dislikes = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].rating === 1) likes++;
            else if (rows[i].rating === -1) dislikes++;
        }
        return { likes: likes, dislikes: dislikes };
    }

    async function getUserRating(slug, userId) {
        if (!userId) return 0;
        var client = getClient();
        if (!client) return 0;
        var res = await withRetry(function() {
            return client.from('article_ratings').select('rating')
                .eq('user_id', userId).eq('article_slug', slug).maybeSingle();
        }, 1);
        return (res && res.data && res.data.rating) || 0;
    }

    async function isBookmarked(slug, userId) {
        if (!userId) return false;
        var client = getClient();
        if (!client) return false;
        var res = await withRetry(function() {
            return client.from('bookmarks').select('id')
                .eq('user_id', userId).eq('article_slug', slug).maybeSingle();
        }, 1);
        return !!(res && res.data);
    }

    // Параллельная загрузка всех данных сразу
    async function loadAllData(slug, userId) {
        var tasks = [getStats(slug)];
        if (userId) {
            tasks.push(getUserRating(slug, userId));
            tasks.push(isBookmarked(slug, userId));
        }
        var results = await Promise.all(tasks.map(function(p) {
            return p.catch(function() { return null; });
        }));
        return {
            stats: results[0] || { likes: 0, dislikes: 0 },
            userRating: results[1] || 0,
            bookmarked: results[2] || false
        };
    }

    // ============================================================
    // 🎨 Стили (один раз)
    // ============================================================
    function injectStyles() {
        if (document.getElementById('article-tools-style')) return;
        var s = document.createElement('style');
        s.id = 'article-tools-style';
        s.textContent = `
            #article-tools-widget {
                margin: 32px 0 20px 0;
                padding: 12px 16px;
                background: rgba(255,255,255,0.92);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 14px;
                border: 1px solid rgba(108, 99, 255, 0.25);
                box-shadow: 0 4px 16px rgba(0,0,0,0.05);
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
                font-size: 0.85rem;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
                animation: atFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
            }
            @keyframes atFadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            #article-tools-widget .at-label {
                color: #666;
                margin-right: 4px;
                font-weight: 600;
                font-size: 0.82rem;
            }
            #article-tools-widget .at-btn {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 6px 14px;
                border-radius: 22px;
                border: 1.5px solid rgba(0,0,0,0.1);
                background: transparent;
                color: #555;
                font-weight: 700;
                font-size: 0.82rem;
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                font-family: inherit;
                -webkit-tap-highlight-color: transparent;
                user-select: none;
            }
            #article-tools-widget .at-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px -4px rgba(0,0,0,0.15);
            }
            #article-tools-widget .at-btn:active {
                transform: translateY(0) scale(0.97);
            }
            #article-tools-widget .at-btn:disabled {
                opacity: 0.55;
                cursor: not-allowed;
                transform: none;
            }
            #article-tools-widget .at-btn.like.active {
                background: linear-gradient(135deg, #27ae60, #16a085);
                border-color: #27ae60;
                color: #fff;
                box-shadow: 0 4px 14px -2px rgba(39, 174, 96, 0.5);
            }
            #article-tools-widget .at-btn.dislike.active {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                border-color: #e74c3c;
                color: #fff;
                box-shadow: 0 4px 14px -2px rgba(231, 76, 60, 0.5);
            }
            #article-tools-widget .at-btn.bookmark {
                margin-left: auto;
                border-color: var(--kc, #6C63FF);
                color: var(--kc, #6C63FF);
            }
            #article-tools-widget .at-btn.bookmark.active {
                background: var(--kc, #6C63FF);
                color: #fff;
                box-shadow: 0 4px 14px -2px rgba(108, 99, 255, 0.5);
            }
            #article-tools-widget .at-count {
                font-variant-numeric: tabular-nums;
                font-size: 0.78rem;
                opacity: 0.9;
            }
            #article-tools-widget .at-pop {
                animation: atPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            @keyframes atPop {
                0% { transform: scale(1); }
                50% { transform: scale(1.15); }
                100% { transform: scale(1); }
            }
            @media (max-width: 600px) {
                #article-tools-widget {
                    padding: 10px 12px;
                    gap: 6px;
                }
                #article-tools-widget .at-label { display: none; }
                #article-tools-widget .at-btn {
                    padding: 6px 12px;
                    font-size: 0.78rem;
                }
                #article-tools-widget .at-btn.bookmark {
                    margin-left: 0;
                    flex: 1 1 100%;
                    justify-content: center;
                    margin-top: 4px;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🔔 Тост
    // ============================================================
    function showToast(message, type) {
        type = type || 'info';
        var colors = {
            success: 'linear-gradient(135deg, #27ae60, #16a085)',
            info: 'linear-gradient(135deg, #3498db, #2980b9)',
            warning: 'linear-gradient(135deg, #e67e22, #d35400)',
            error: 'linear-gradient(135deg, #e74c3c, #c0392b)'
        };
        var t = document.createElement('div');
        t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:' + (colors[type] || colors.info) + ';color:#fff;padding:10px 22px;border-radius:30px;font-weight:700;font-size:0.85rem;box-shadow:0 12px 32px rgba(0,0,0,0.3);z-index:99999;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;max-width:90vw;font-family:-apple-system,sans-serif;';
        t.textContent = message;
        document.body.appendChild(t);
        requestAnimationFrame(function() { t.style.transform = 'translateX(-50%) translateY(0)'; });
        setTimeout(function() {
            t.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(function() { t.remove(); }, 400);
        }, 2200);
    }

    // ============================================================
    // 🎯 Действия (оптимистичный UI)
    // ============================================================
    async function rateArticle(slug, rating) {
        if (!currentUser) {
            showToast('Войдите, чтобы оценивать', 'warning');
            return;
        }
        var client = getClient();
        if (!client) return;

        var widget = document.getElementById('article-tools-widget');
        if (!widget) return;
        var likeBtn = widget.querySelector('#at-like');
        var dislikeBtn = widget.querySelector('#at-dislike');
        if (likeBtn) likeBtn.disabled = true;
        if (dislikeBtn) dislikeBtn.disabled = true;

        try {
            var existing = await getUserRating(slug, currentUser.id);
            if (existing === rating) {
                // Убираем оценку
                await client.from('article_ratings').delete()
                    .eq('user_id', currentUser.id).eq('article_slug', slug);
            } else {
                await client.from('article_ratings').upsert({
                    user_id: currentUser.id,
                    article_slug: slug,
                    rating: rating
                }, { onConflict: 'user_id,article_slug' });
            }
            invalidateCache(slug);
            // Оптимистично анимируем
            if (rating === 1 && likeBtn) likeBtn.classList.add('at-pop');
            if (rating === -1 && dislikeBtn) dislikeBtn.classList.add('at-pop');
            setTimeout(function() {
                if (likeBtn) likeBtn.classList.remove('at-pop');
                if (dislikeBtn) dislikeBtn.classList.remove('at-pop');
            }, 400);
            renderWidget(slug, widget._container);
        } catch(e) {
            showToast('Ошибка: ' + e.message, 'error');
            if (likeBtn) likeBtn.disabled = false;
            if (dislikeBtn) dislikeBtn.disabled = false;
        }
    }

    async function toggleBookmark(slug, title) {
        if (!currentUser) {
            showToast('Войдите, чтобы добавлять в закладки', 'warning');
            return;
        }
        var client = getClient();
        if (!client) return;
        var widget = document.getElementById('article-tools-widget');
        if (!widget) return;
        var bookmarkBtn = widget.querySelector('#at-bookmark');
        if (bookmarkBtn) bookmarkBtn.disabled = true;

        try {
            var exists = await isBookmarked(slug, currentUser.id);
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
                if (bookmarkBtn) bookmarkBtn.classList.add('at-pop');
                setTimeout(function() {
                    if (bookmarkBtn) bookmarkBtn.classList.remove('at-pop');
                }, 400);
            }
            invalidateCache(slug);
            renderWidget(slug, widget._container);
        } catch(e) {
            showToast('Ошибка: ' + e.message, 'error');
            if (bookmarkBtn) bookmarkBtn.disabled = false;
        }
    }

    // ============================================================
    // 🎨 Рендер виджета
    // ============================================================
    async function renderWidget(slug, commentsContainer) {
        var old = document.getElementById('article-tools-widget');
        if (old) old.remove();

        var data = await loadAllData(slug, currentUser && currentUser.id);
        var stats = data.stats;
        var userRating = data.userRating;
        var bookmarked = data.bookmarked;
        var title = getArticleTitle();

        var widget = document.createElement('div');
        widget.id = 'article-tools-widget';
        widget._container = commentsContainer;

        var likeClass = 'at-btn like' + (userRating === 1 ? ' active' : '');
        var dislikeClass = 'at-btn dislike' + (userRating === -1 ? ' active' : '');
        var bookmarkClass = 'at-btn bookmark' + (bookmarked ? ' active' : '');

        widget.innerHTML =
            '<span class="at-label">Оцените статью:</span>' +
            '<button type="button" id="at-like" class="' + likeClass + '">👍 <span class="at-count">' + stats.likes + '</span></button>' +
            '<button type="button" id="at-dislike" class="' + dislikeClass + '">👎 <span class="at-count">' + stats.dislikes + '</span></button>' +
            '<button type="button" id="at-bookmark" class="' + bookmarkClass + '">' + (bookmarked ? '✓ В закладках' : '🔖 В закладки') + '</button>';

        // Вставляем ПЕРЕД комментариями
        if (commentsContainer && commentsContainer.parentNode) {
            insertBeforeComments(widget, commentsContainer);
        } else {
            var content = document.querySelector('.wy-nav-content');
            if (content) content.appendChild(widget);
            else document.body.appendChild(widget);
        }

        // Обработчики
        widget.querySelector('#at-like').onclick = function() { rateArticle(slug, 1); };
        widget.querySelector('#at-dislike').onclick = function() { rateArticle(slug, -1); };
        widget.querySelector('#at-bookmark').onclick = function() { toggleBookmark(slug, title); };
    }

    // ============================================================
    // 📌 Вставка перед комментариями
    // ============================================================
    function insertBeforeComments(widget, commentsContainer) {
        var target = commentsContainer;
        var node = commentsContainer.previousElementSibling;
        while (node) {
            if (node.tagName === 'HR' || node.tagName === 'H2') {
                target = node;
                break;
            }
            node = node.previousElementSibling;
        }
        if (target.parentNode) {
            target.parentNode.insertBefore(widget, target);
        }
    }

    // ============================================================
    // ⏳ Ожидание комментариев
    // ============================================================
    function waitForCommentsContainer(maxWait) {
        maxWait = maxWait || 8000;
        return new Promise(function(resolve) {
            var existing = document.getElementById('comments-container');
            if (existing) { resolve(existing); return; }

            var observer = new MutationObserver(function() {
                var el = document.getElementById('comments-container');
                if (el) {
                    observer.disconnect();
                    resolve(el);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });

            setTimeout(function() {
                observer.disconnect();
                resolve(document.getElementById('comments-container'));
            }, maxWait);
        });
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    async function init() {
        if (isExcluded()) {
            console.log('ℹ️ article-tools: страница исключена');
            return;
        }

        injectStyles();

        var client = getClient();
        if (!client) {
            console.log('ℹ️ article-tools: клиент не готов');
            return;
        }

        var user = await waitForUser(4000);
        currentUser = user;
        var slug = getFullPath();

        // Параллельно ждём контейнер и грузим данные
        var container = await waitForCommentsContainer(8000);

        if (!container) {
            console.log('ℹ️ article-tools: комментарии не появились');
            return;
        }

        console.log('✅ article-tools: комментарии найдены, вставляем виджет');
        await renderWidget(slug, container);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
