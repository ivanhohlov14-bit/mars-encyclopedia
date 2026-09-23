// ============================================================
// comments.js — v4 VIP
// Комментарии: кэш, оптимистичный UI, единый клиент
// ============================================================
(function() {
    'use strict';

    if (window.__commentsLoaded) return;
    window.__commentsLoaded = true;

    var CACHE_PREFIX = 'mars-comments-cache-';
    var PROFILES_CACHE_KEY = 'mars-profiles-cache';
    var CACHE_TTL = 2 * 60 * 1000;
    var XP_PER_COMMENT = 5;
    var LIKE_DEBOUNCE_MS = 400;
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['💬 comments:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 🌉 Клиент
    // ============================================================
    function getClient() {
        if (window.supabaseClient && window.supabaseClient.auth) return window.supabaseClient;
        if (window.getSupabase) {
            try {
                var c = window.getSupabase();
                if (c && c.auth) return c;
            } catch(e) {}
        }
        return null;
    }

    // ============================================================
    // 👤 Пользователь — сначала marsSession, потом getSession
    // ============================================================
    async function getUser() {
        if (window.marsSession && window.marsSession.user) return window.marsSession.user;
        var client = getClient();
        if (!client) return null;
        try {
            var r = await client.auth.getSession();
            return (r && r.data && r.data.session && r.data.session.user) || null;
        } catch(e) { return null; }
    }

    // ============================================================
    // 💾 Кэш
    // ============================================================
    function getCacheKey(slug) { return CACHE_PREFIX + slug; }

    function readCache(slug) {
        try {
            var raw = localStorage.getItem(getCacheKey(slug));
            if (!raw) return null;
            var c = JSON.parse(raw);
            if (!c || Date.now() - c.ts > CACHE_TTL) return null;
            return c;
        } catch(e) { return null; }
    }

    function writeCache(slug, comments, profilesMap) {
        try {
            localStorage.setItem(getCacheKey(slug), JSON.stringify({
                comments: comments, profilesMap: profilesMap, ts: Date.now()
            }));
        } catch(e) {}
    }

    function clearCache(slug) {
        try { localStorage.removeItem(getCacheKey(slug)); } catch(e) {}
    }

    function readProfilesCache() {
        try {
            var raw = localStorage.getItem(PROFILES_CACHE_KEY);
            if (!raw) return {};
            var c = JSON.parse(raw);
            if (!c || Date.now() - c.ts > 5 * 60 * 1000) return {};
            return c.data || {};
        } catch(e) { return {}; }
    }

    function writeProfilesCache(data) {
        try {
            localStorage.setItem(PROFILES_CACHE_KEY, JSON.stringify({ data: data, ts: Date.now() }));
        } catch(e) {}
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('mars-comments-vip-styles')) return;
        var st = document.createElement('style');
        st.id = 'mars-comments-vip-styles';
        st.textContent = `
            @keyframes mcFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes mcSpin { to { transform: rotate(360deg); } }
            @keyframes mcShine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
            @keyframes mcPop { 0% { transform: scale(1); } 50% { transform: scale(1.25); } 100% { transform: scale(1); } }

            .mc-wrap { margin-top: 32px; }
            .mc-title {
                font-size: 1.5rem; font-weight: 800; margin: 0 0 20px 0;
                display: flex; align-items: center; gap: 10px;
                background: linear-gradient(90deg, #6C63FF, #A29BFE, #6C63FF);
                background-size: 200% auto;
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: mcShine 4s linear infinite;
            }
            .mc-title-count {
                font-size: 0.9rem; color: #888; font-weight: 700;
                -webkit-text-fill-color: #888;
                background: rgba(0,0,0,.05); padding: 3px 12px; border-radius: 14px;
            }
            .mc-comment {
                background: #fff; border-radius: 16px; padding: 16px 18px;
                margin-bottom: 12px; border-left: 4px solid #6C63FF;
                box-shadow: 0 4px 16px rgba(0,0,0,.05);
                transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s;
                animation: mcFadeIn .5s cubic-bezier(.16,1,.3,1) both;
                position: relative;
            }
            .mc-comment:hover { transform: translateY(-3px); box-shadow: 0 12px 32px -8px rgba(108,99,255,.25); }
            .mc-comment-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
            .mc-avatar {
                width: 40px; height: 40px; border-radius: 50%;
                border: 2.5px solid transparent;
                background-image: linear-gradient(#fff, #fff), linear-gradient(135deg, #6C63FF, #A29BFE);
                background-origin: border-box;
                background-clip: padding-box, border-box;
                object-fit: cover; flex-shrink: 0;
            }
            .mc-author { font-weight: 800; color: #1a1a2e; font-size: 0.95rem; }
            .mc-time { font-size: 0.72rem; color: #999; }
            .mc-delete {
                background: none; border: none; color: #c0392b; cursor: pointer;
                font-size: 0.8rem; padding: 4px 8px; border-radius: 6px; transition: background .2s;
            }
            .mc-delete:hover { background: rgba(231,76,60,.1); }
            .mc-text {
                font-size: 0.95rem; line-height: 1.6; color: #333;
                padding-left: 52px; margin-bottom: 10px;
                word-wrap: break-word; white-space: pre-wrap;
            }
            .mc-actions { padding-left: 52px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
            .mc-action {
                background: rgba(0,0,0,.04); border: none; padding: 5px 12px; border-radius: 14px;
                font-size: 0.78rem; font-weight: 700; color: #666; cursor: pointer; font-family: inherit;
                transition: all .25s cubic-bezier(.16,1,.3,1);
                display: inline-flex; align-items: center; gap: 4px;
                -webkit-tap-highlight-color: transparent;
            }
            .mc-action:hover { background: #6C63FF; color: #fff; transform: translateY(-2px); }
            .mc-action.liked { background: linear-gradient(135deg, #27ae60, #16a085); color: #fff; }
            .mc-action.disliked { background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; }
            .mc-action.reply { color: #6C63FF; }
            .mc-action.reply:hover { background: #6C63FF; color: #fff; }
            .mc-action.just-liked { animation: mcPop .4s cubic-bezier(.34,1.56,.64,1); }
            .mc-children { margin-left: 52px; margin-top: 12px; padding-left: 16px; border-left: 2px dashed rgba(108,99,255,.2); }
            .mc-form {
                background: linear-gradient(135deg, rgba(108,99,255,.04), rgba(162,155,254,.02));
                border: 2px solid rgba(108,99,255,.15); border-radius: 18px; padding: 18px;
                margin-top: 20px; transition: all .3s;
            }
            .mc-form:focus-within { border-color: #6C63FF; box-shadow: 0 8px 32px -8px rgba(108,99,255,.35); }
            .mc-textarea {
                width: 100%; padding: 14px 16px; border-radius: 12px;
                border: 2px solid #e8eaf0; font-family: inherit; font-size: 0.95rem;
                outline: none; resize: vertical; min-height: 80px;
                background: #fff; color: #1a1a2e; box-sizing: border-box;
                transition: border-color .25s;
            }
            .mc-textarea:focus { border-color: #6C63FF; }
            .mc-btn {
                display: inline-flex; align-items: center; gap: 8px;
                padding: 10px 22px; margin-top: 10px; border-radius: 24px; border: none;
                font-family: inherit; font-weight: 800; font-size: 0.88rem;
                background: linear-gradient(135deg, #6C63FF, #A29BFE); color: #fff; cursor: pointer;
                box-shadow: 0 6px 20px -4px rgba(108,99,255,.45);
                transition: all .28s cubic-bezier(.16,1,.3,1);
            }
            .mc-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px -4px rgba(108,99,255,.55); }
            .mc-btn:disabled { opacity: 0.6; cursor: not-allowed; }
            .mc-status { margin-left: 12px; font-size: 0.82rem; font-weight: 600; }
            .mc-login-box {
                background: linear-gradient(135deg, rgba(108,99,255,.08), rgba(162,155,254,.04));
                border: 2px dashed rgba(108,99,255,.3); border-radius: 16px; padding: 22px;
                text-align: center; font-size: 0.92rem; color: #555; margin-top: 20px;
            }
            .mc-login-box a { color: #6C63FF; font-weight: 800; text-decoration: none; }
            .mc-login-box a:hover { text-decoration: underline; }
            .mc-skeleton {
                background: linear-gradient(90deg, #f0f0f4 25%, #f8f8fc 50%, #f0f0f4 75%);
                background-size: 200% 100%; animation: mcShine 1.5s ease-in-out infinite;
                border-radius: 12px; padding: 16px 18px; margin-bottom: 12px; height: 90px;
            }
            .mc-spinner {
                display: inline-block; width: 36px; height: 36px;
                border: 3px solid rgba(108,99,255,.2); border-top-color: #6C63FF;
                border-radius: 50%; animation: mcSpin .8s linear infinite;
            }
            .mc-empty {
                text-align: center; padding: 40px 20px;
                background: linear-gradient(135deg, rgba(108,99,255,.04), rgba(162,155,254,.02));
                border-radius: 16px; color: #888; font-size: 0.95rem;
            }
            .mc-empty-icon { font-size: 3rem; margin-bottom: 8px; }

            @media (max-width: 600px) {
                .mc-comment { padding: 14px; border-radius: 14px; }
                .mc-avatar { width: 36px; height: 36px; }
                .mc-text { padding-left: 48px; font-size: 0.92rem; }
                .mc-actions { padding-left: 48px; }
                .mc-children { margin-left: 24px; padding-left: 10px; }
                .mc-title { font-size: 1.25rem; }
                .mc-btn { padding: 11px 20px; }
            }
            @media (prefers-reduced-motion: reduce) {
                .mc-comment, .mc-skeleton, .mc-title, .mc-action.just-liked {
                    animation: none !important; transition: none !important;
                }
            }
        `;
        document.head.appendChild(st);
    }

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function avatarFor(profile, name) {
        if (profile && profile.avatar_url) return profile.avatar_url;
        return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=6C63FF&color=fff&size=64&rounded=true';
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(m) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
        });
    }

    function escapeAttr(s) {
        return String(s || '').replace(/['"\\<>]/g, function(m) {
            return { "'":'\\\'','"':'\\"','\\':'\\\\','<':'\\u003c','>':'\\u003e' }[m];
        });
    }

    // ============================================================
    // 🌳 Дерево комментариев
    // ============================================================
    function buildCommentTree(comments, profilesMap, userId, userLikes) {
        var commentMap = {};
        comments.forEach(function(c) { commentMap[c.id] = c; });

        var roots = [];
        comments.forEach(function(c) {
            if (c.parent_id && commentMap[c.parent_id]) {
                if (!commentMap[c.parent_id].children) commentMap[c.parent_id].children = [];
                commentMap[c.parent_id].children.push(c);
            } else {
                roots.push(c);
            }
        });

        function renderOne(comment, depth) {
            depth = depth || 0;
            var profile = profilesMap[comment.user_id] || {};
            var displayName = profile.display_name || profile.username || 'Аноним';
            var avatar = avatarFor(profile, displayName);
            var isOwn = userId === comment.user_id;
            var liked = userLikes && userLikes[comment.id];

            var childrenHtml = '';
            if (comment.children && comment.children.length) {
                childrenHtml = '<div class="mc-children">' +
                    comment.children.map(function(ch) { return renderOne(ch, depth + 1); }).join('') +
                    '</div>';
            }

            return '<div class="mc-comment" data-comment-id="' + escapeAttr(comment.id) + '">' +
                '<div class="mc-comment-header">' +
                '  <img src="' + escapeAttr(avatar) + '" alt="" class="mc-avatar" loading="lazy">' +
                '  <div style="flex:1;min-width:0;">' +
                '    <div class="mc-author">' + escapeHtml(displayName) + '</div>' +
                '    <div class="mc-time">' + new Date(comment.created_at).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + '</div>' +
                '  </div>' +
                (isOwn ? '  <button class="mc-delete" type="button" data-action="delete" data-id="' + escapeAttr(comment.id) + '">🗑️</button>' : '') +
                '</div>' +
                '<div class="mc-text">' + escapeHtml(comment.content) + '</div>' +
                '<div class="mc-actions">' +
                '  <button type="button" class="mc-action' + (liked === 1 ? ' liked' : '') + '" data-action="like" data-id="' + escapeAttr(comment.id) + '" data-type="1">👍 <span class="mc-like-count">' + (comment.likes || 0) + '</span></button>' +
                '  <button type="button" class="mc-action' + (liked === -1 ? ' disliked' : '') + '" data-action="like" data-id="' + escapeAttr(comment.id) + '" data-type="-1">👎 <span class="mc-dislike-count">' + (comment.dislikes || 0) + '</span></button>' +
                '  <button type="button" class="mc-action reply" data-action="reply" data-id="' + escapeAttr(comment.id) + '">💬 Ответить</button>' +
                '</div>' +
                '<div id="reply-form-' + escapeAttr(comment.id) + '" style="display:none;padding-left:52px;margin-top:10px;"></div>' +
                childrenHtml +
                '</div>';
        }

        return roots.map(function(c) { return renderOne(c); }).join('');
    }

    // ============================================================
    // 📥 Загрузка
    // ============================================================
    async function loadComments(articleSlug, containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        injectStyles();

        var client = getClient();
        if (!client) {
            container.innerHTML = '<div class="mc-empty">⚠️ Клиент не готов</div>';
            return;
        }

        var cached = readCache(articleSlug);
        var cachedProfiles = readProfilesCache();

        var user = await getUser();
        var userId = user && user.id;

        if (cached && cached.comments) {
            var merged = Object.assign({}, cachedProfiles, cached.profilesMap || {});
            renderAll(container, articleSlug, cached.comments, merged, userId, null);
        } else {
            container.innerHTML =
                '<div class="mc-wrap">' +
                '  <h3 class="mc-title">💬 Комментарии</h3>' +
                '  <div class="mc-skeleton"></div>' +
                '  <div class="mc-skeleton"></div>' +
                '</div>';
        }

        try {
            var results = await Promise.all([
                client.from('comments').select('*')
                    .eq('article_slug', articleSlug).eq('is_hidden', false)
                    .order('created_at', { ascending: true }),
                user ? client.from('comment_likes').select('comment_id, like_type').eq('user_id', user.id) : Promise.resolve({ data: [] }),
                user ? client.from('profiles').select('is_banned').eq('user_id', user.id).maybeSingle() : Promise.resolve({ data: null })
            ]);

            var comments = (results[0] && results[0].data) || [];
            var userLikesArr = (results[1] && results[1].data) || [];
            var userProfile = results[2] && results[2].data;

            var userLikes = {};
            userLikesArr.forEach(function(l) { userLikes[l.comment_id] = l.like_type; });

            // Профили — только те, которых нет в кэше
            var userIds = [];
            var seen = {};
            comments.forEach(function(c) {
                if (c.user_id && !seen[c.user_id] && !cachedProfiles[c.user_id]) {
                    userIds.push(c.user_id);
                    seen[c.user_id] = true;
                }
            });

            var profilesMap = Object.assign({}, cachedProfiles);
            if (userIds.length) {
                var pr = await client.from('profiles')
                    .select('user_id, username, display_name, avatar_url')
                    .in('user_id', userIds);
                (pr.data || []).forEach(function(p) { profilesMap[p.user_id] = p; });
                writeProfilesCache(profilesMap);
            }

            writeCache(articleSlug, comments, profilesMap);

            var isBanned = userProfile && userProfile.is_banned;
            renderAll(container, articleSlug, comments, profilesMap, userId, {
                userLikes: userLikes, isBanned: isBanned
            });
        } catch(e) {
            log('load error:', e.message);
            if (!cached) {
                container.innerHTML = '<div class="mc-empty">⚠️ Ошибка загрузки</div>';
            }
        }
    }

    // ============================================================
    // 🎨 Рендер
    // ============================================================
    function renderAll(container, articleSlug, comments, profilesMap, userId, extra) {
        extra = extra || {};
        var topCount = comments.filter(function(c) { return !c.parent_id; }).length;

        var html = '<div class="mc-wrap">';
        html += '<h3 class="mc-title">💬 Комментарии <span class="mc-title-count">' + topCount + '</span></h3>';

        if (comments.length === 0) {
            html += '<div class="mc-empty"><div class="mc-empty-icon">💭</div><div>Пока нет комментариев. Будьте первым!</div></div>';
        } else {
            html += buildCommentTree(comments, profilesMap, userId, extra.userLikes);
        }

        html += renderForm(articleSlug, container.id, userId, extra.isBanned);
        html += '</div>';

        container.innerHTML = html;

        // Делегирование событий
        container.querySelectorAll('[data-action]').forEach(function(el) {
            el.addEventListener('click', onCommentAction);
        });
    }

    function renderForm(articleSlug, containerId, userId, isBanned) {
        if (!userId) {
            return '<div class="mc-login-box">🔒 <a href="/login/">Войдите</a> или <a href="/register/">зарегистрируйтесь</a>, чтобы оставить комментарий.</div>';
        }
        if (isBanned) {
            return '<div class="mc-login-box" style="border-color:rgba(231,76,60,.3);background:rgba(231,76,60,.05);">⛔ Вы забанены.</div>';
        }
        return '<div class="mc-form">' +
            '  <textarea class="mc-textarea" id="mc-input-' + containerId + '" placeholder="Напишите что-нибудь доброе..."></textarea>' +
            '  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
            '    <button type="button" class="mc-btn" id="mc-submit-' + containerId + '">📤 Отправить</button>' +
            '    <span class="mc-status" id="mc-status-' + containerId + '"></span>' +
            '  </div>' +
            '</div>';
    }

    // ============================================================
    // 🖱️ Делегированный обработчик
    // ============================================================
    function onCommentAction(e) {
        var el = e.currentTarget;
        if (!el || !el.dataset) return;
        var action = el.dataset.action;
        var id = el.dataset.id;
        var type = el.dataset.type;

        if (action === 'like') likeComment(id, parseInt(type, 10), el);
        else if (action === 'delete') deleteComment(id);
        else if (action === 'reply') showReplyForm(id);
    }

    // ============================================================
    // 📤 Отправка
    // ============================================================
    async function submitComment(articleSlug, containerId) {
        var input = document.getElementById('mc-input-' + containerId);
        var status = document.getElementById('mc-status-' + containerId);
        var btn = document.getElementById('mc-submit-' + containerId);
        if (!input || !status) return;

        var content = input.value.trim();
        if (!content) {
            status.textContent = '❌ Введите текст';
            status.style.color = '#c0392b';
            return;
        }

        if (btn) btn.disabled = true;
        status.textContent = '⏳ Отправка...';
        status.style.color = '#999';

        var client = getClient();
        var user = await getUser();
        if (!user) {
            status.textContent = '❌ Войдите';
            status.style.color = '#c0392b';
            if (btn) btn.disabled = false;
            return;
        }

        var res = await client.from('comments').insert([{
            user_id: user.id,
            article_slug: articleSlug,
            content: content
        }]);

        if (res.error) {
            status.textContent = '❌ ' + res.error.message;
            status.style.color = '#c0392b';
            if (btn) btn.disabled = false;
            return;
        }

        status.textContent = '✅ Отправлено!';
        status.style.color = '#27ae60';
        input.value = '';

        clearCache(articleSlug);

        if (typeof window.addExperience === 'function') {
            window.addExperience(user.id, XP_PER_COMMENT);
        }

        setTimeout(function() { loadComments(articleSlug, containerId); }, 400);
    }

    // ============================================================
    // 👍 Лайк — оптимистичный UI + debounce
    // ============================================================
    var likeLocks = {};

    async function likeComment(commentId, likeType, btnEl) {
        // Debounce
        if (likeLocks[commentId]) return;
        likeLocks[commentId] = true;
        setTimeout(function() { delete likeLocks[commentId]; }, LIKE_DEBOUNCE_MS);

        var client = getClient();
        var user = await getUser();
        if (!user) {
            if (typeof window.showExperienceToast === 'function') {
                window.showExperienceToast('Войдите, чтобы ставить лайки');
            } else {
                alert('Войдите, чтобы ставить лайки');
            }
            return;
        }

        // 🎯 Оптимистичный UI — мгновенно
        var wrapper = document.querySelector('[data-comment-id="' + commentId + '"]');
        if (!wrapper) return;

        var likeBtn = wrapper.querySelector('[data-action="like"][data-type="1"]');
        var dislikeBtn = wrapper.querySelector('[data-action="like"][data-type="-1"]');
        var likeCount = wrapper.querySelector('.mc-like-count');
        var dislikeCount = wrapper.querySelector('.mc-dislike-count');

        var wasLiked = likeBtn && likeBtn.classList.contains('liked');
        var wasDisliked = dislikeBtn && dislikeBtn.classList.contains('disliked');

        // Мгновенно переключаем
        if (likeBtn && dislikeBtn) {
            if (likeType === 1) {
                if (wasLiked) {
                    likeBtn.classList.remove('liked');
                    if (likeCount) likeCount.textContent = Math.max(0, parseInt(likeCount.textContent, 10) - 1);
                } else {
                    likeBtn.classList.add('liked');
                    likeBtn.classList.add('just-liked');
                    if (likeCount) likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
                    if (wasDisliked) {
                        dislikeBtn.classList.remove('disliked');
                        if (dislikeCount) dislikeCount.textContent = Math.max(0, parseInt(dislikeCount.textContent, 10) - 1);
                    }
                    setTimeout(function() { likeBtn.classList.remove('just-liked'); }, 450);
                }
            } else if (likeType === -1) {
                if (wasDisliked) {
                    dislikeBtn.classList.remove('disliked');
                    if (dislikeCount) dislikeCount.textContent = Math.max(0, parseInt(dislikeCount.textContent, 10) - 1);
                } else {
                    dislikeBtn.classList.add('disliked');
                    dislikeBtn.classList.add('just-liked');
                    if (dislikeCount) dislikeCount.textContent = parseInt(dislikeCount.textContent, 10) + 1;
                    if (wasLiked) {
                        likeBtn.classList.remove('liked');
                        if (likeCount) likeCount.textContent = Math.max(0, parseInt(likeCount.textContent, 10) - 1);
                    }
                    setTimeout(function() { dislikeBtn.classList.remove('just-liked'); }, 450);
                }
            }
        }

        // Запрос на сервер
        try {
            var existing = await client.from('comment_likes')
                .select('like_type')
                .eq('user_id', user.id).eq('comment_id', commentId)
                .maybeSingle();

            if (existing.data) {
                if (existing.data.like_type === likeType) {
                    await client.from('comment_likes')
                        .delete().eq('user_id', user.id).eq('comment_id', commentId);
                } else {
                    await client.from('comment_likes')
                        .update({ like_type: likeType })
                        .eq('user_id', user.id).eq('comment_id', commentId);
                }
            } else {
                await client.from('comment_likes')
                    .insert([{ user_id: user.id, comment_id: commentId, like_type: likeType }]);
            }

            // Пересчёт
            var likesData = await client.from('comment_likes')
                .select('like_type').eq('comment_id', commentId);
            var likes = (likesData.data || []).filter(function(l) { return l.like_type === 1; }).length;
            var dislikes = (likesData.data || []).filter(function(l) { return l.like_type === -1; }).length;

            await client.from('comments').update({ likes: likes, dislikes: dislikes }).eq('id', commentId);

            if (likeCount) likeCount.textContent = likes;
            if (dislikeCount) dislikeCount.textContent = dislikes;

        } catch(e) {
            log('like error:', e.message);
            // Откат — перезагружаем
            var container = document.getElementById('comments-container');
            var slug = container && container.dataset && container.dataset.articleSlug;
            if (slug) {
                clearCache(slug);
                loadComments(slug, 'comments-container');
            }
        }
    }

    // ============================================================
    // 🗑️ Удаление
    // ============================================================
    async function deleteComment(commentId) {
        if (!confirm('Удалить комментарий?')) return;
        var client = getClient();
        var res = await client.from('comments').delete().eq('id', commentId);
        if (res.error) {
            alert('Ошибка: ' + res.error.message);
            return;
        }

        var container = document.getElementById('comments-container');
        var slug = container && container.dataset && container.dataset.articleSlug;
        if (slug) {
            clearCache(slug);
            loadComments(slug, 'comments-container');
        }
    }

    // ============================================================
    // 💬 Ответ
    // ============================================================
    async function showReplyForm(commentId) {
        var box = document.getElementById('reply-form-' + commentId);
        if (!box) return;

        if (box.style.display === 'block') {
            box.style.display = 'none';
            return;
        }

        var user = await getUser();
        if (!user) {
            box.innerHTML = '<div class="mc-login-box" style="margin-top:8px;">🔒 <a href="/login/">Войдите</a>, чтобы ответить.</div>';
        } else {
            box.innerHTML =
                '<div class="mc-form" style="padding:12px;margin:0;">' +
                '  <textarea class="mc-textarea" id="mc-reply-' + commentId + '" placeholder="Ваш ответ..." style="min-height:60px;font-size:0.9rem;"></textarea>' +
                '  <div style="display:flex;align-items:center;gap:10px;">' +
                '    <button type="button" class="mc-btn" id="mc-reply-btn-' + commentId + '" style="padding:8px 18px;font-size:0.82rem;">📤 Ответить</button>' +
                '    <span class="mc-status" id="mc-reply-status-' + commentId + '"></span>' +
                '  </div>' +
                '</div>';

            var btn = document.getElementById('mc-reply-btn-' + commentId);
            if (btn) {
                btn.addEventListener('click', function() { submitReply(commentId); });
            }
        }
        box.style.display = 'block';
    }

    async function submitReply(parentId) {
        var input = document.getElementById('mc-reply-' + parentId);
        var status = document.getElementById('mc-reply-status-' + parentId);
        var btn = document.getElementById('mc-reply-btn-' + parentId);
        if (!input || !status) return;

        var content = input.value.trim();
        if (!content) {
            status.textContent = '❌ Введите текст';
            status.style.color = '#c0392b';
            return;
        }

        if (btn) btn.disabled = true;
        status.textContent = '⏳...';
        status.style.color = '#999';

        var client = getClient();
        var user = await getUser();
        if (!user) {
            status.textContent = '❌ Войдите';
            status.style.color = '#c0392b';
            if (btn) btn.disabled = false;
            return;
        }

        var parent = await client.from('comments').select('article_slug').eq('id', parentId).single();
        if (!parent.data) {
            status.textContent = '❌ Комментарий не найден';
            status.style.color = '#c0392b';
            if (btn) btn.disabled = false;
            return;
        }

        var res = await client.from('comments').insert([{
            user_id: user.id,
            article_slug: parent.data.article_slug,
            content: content,
            parent_id: parentId
        }]);

        if (res.error) {
            status.textContent = '❌ ' + res.error.message;
            status.style.color = '#c0392b';
            if (btn) btn.disabled = false;
            return;
        }

        status.textContent = '✅ Добавлено!';
        status.style.color = '#27ae60';
        input.value = '';

        clearCache(parent.data.article_slug);

        if (typeof window.addExperience === 'function') {
            window.addExperience(user.id, XP_PER_COMMENT);
        }

        var container = document.getElementById('comments-container');
        var slug = container && container.dataset && container.dataset.articleSlug;
        if (slug) setTimeout(function() { loadComments(slug, 'comments-container'); }, 400);
    }

    // ============================================================
    // 🌐 Экспорт
    // ============================================================
    window.loadComments = loadComments;
    window.submitComment = submitComment;
    window.likeComment = likeComment;
    window.deleteComment = deleteComment;
    window.showReplyForm = showReplyForm;
    window.submitReply = submitReply;

    // Авто-привязка кнопки "Отправить" (делегирование)
    document.addEventListener('click', function(e) {
        var btn = e.target.closest && e.target.closest('[id^="mc-submit-"]');
        if (!btn) return;
        var containerId = btn.id.replace('mc-submit-', '');
        var container = document.getElementById(containerId);
        if (!container) return;
        var slug = container.dataset && container.dataset.articleSlug;
        if (slug) submitComment(slug, containerId);
    });

    log('v4 загружен');
})();
