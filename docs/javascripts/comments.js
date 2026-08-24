// docs/javascripts/comments.js
// ИСПРАВЛЕННАЯ ВЕРСИЯ

(function() {
    console.log('✅ comments.js загружен');

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // === ЗАГРУЗКА КОММЕНТАРИЕВ ===
    async function loadComments(articleSlug, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        // Получаем комментарии (только видимые, не скрытые модератором)
        const { data: comments, error } = await client
            .from('comments')
            .select('*, profiles!comments_user_id_fkey(username, display_name, avatar_url)')
            .eq('article_slug', articleSlug)
            .eq('is_hidden', false)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Ошибка загрузки комментариев:', error);
            container.innerHTML = '<p>⚠️ Ошибка загрузки комментариев</p>';
            return;
        }

        // Получаем текущего пользователя
        const { data: session } = await client.auth.getSession();
        const user = session?.session?.user;

        // Проверяем, не забанен ли пользователь
        let isBanned = false;
        if (user) {
            const { data: profile } = await client
                .from('profiles')
                .select('is_banned')
                .eq('user_id', user.id)
                .single();
            isBanned = profile?.is_banned || false;
        }

        // Строим дерево комментариев
        const topComments = comments.filter(c => !c.parent_id);
        const nestedComments = buildCommentTree(comments, user?.id);

        if (topComments.length === 0) {
            container.innerHTML = `
                <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center; color: #999;">
                    Пока нет комментариев. Будьте первым!
                </div>
                ${await renderCommentForm(articleSlug, containerId, isBanned)}
            `;
            return;
        }

        container.innerHTML = `
            <div style="margin-top: 30px; border-top: 2px solid #eaecf0; padding-top: 20px;">
                <h3 style="margin: 0 0 16px 0;">💬 Комментарии (${topComments.length})</h3>
                <div id="comments-list">
                    ${nestedComments}
                </div>
                ${await renderCommentForm(articleSlug, containerId, isBanned)}
            </div>
        `;
    }

    // === ПОСТРОЕНИЕ ДЕРЕВА КОММЕНТАРИЕВ ===
    function buildCommentTree(comments, userId) {
        const commentMap = {};
        comments.forEach(c => commentMap[c.id] = c);

        const roots = [];
        comments.forEach(c => {
            if (c.parent_id) {
                if (commentMap[c.parent_id]) {
                    if (!commentMap[c.parent_id].children) {
                        commentMap[c.parent_id].children = [];
                    }
                    commentMap[c.parent_id].children.push(c);
                }
            } else {
                roots.push(c);
            }
        });

        function renderComment(comment, depth = 0) {
            const profile = comment.profiles || {};
            const displayName = profile.display_name || profile.username || 'Аноним';
            const avatar = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6C63FF&color=fff&size=32`;
            const isOwn = userId === comment.user_id;
            const indent = depth * 20;

            let childrenHtml = '';
            if (comment.children && comment.children.length > 0) {
                childrenHtml = comment.children.map(child => renderComment(child, depth + 1)).join('');
            }

            return `
                <div style="margin-left: ${indent}px; padding: 12px 0; border-bottom: 1px solid #f0f0f0;" data-comment-id="${comment.id}">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                        <img src="${avatar}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%;">
                        <strong style="font-size: 0.9rem;">${displayName}</strong>
                        <span style="font-size: 0.75rem; color: #999;">${new Date(comment.created_at).toLocaleString('ru-RU')}</span>
                        ${isOwn ? `
                            <button onclick="deleteComment('${comment.id}')" style="background: none; border: none; color: #c0392b; cursor: pointer; font-size: 0.75rem;">🗑️</button>
                        ` : ''}
                    </div>
                    <div style="font-size: 0.95rem; line-height: 1.5; padding-left: 38px;">
                        ${comment.content}
                    </div>
                    <div style="padding-left: 38px; margin-top: 4px; display: flex; gap: 12px; align-items: center;">
                        <button onclick="likeComment('${comment.id}', 1)" class="comment-like-btn" style="background: none; border: none; cursor: pointer; font-size: 0.85rem; color: #555;">
                            👍 <span class="like-count">${comment.likes || 0}</span>
                        </button>
                        <button onclick="likeComment('${comment.id}', -1)" class="comment-like-btn" style="background: none; border: none; cursor: pointer; font-size: 0.85rem; color: #555;">
                            👎 <span class="dislike-count">${comment.dislikes || 0}</span>
                        </button>
                        <button onclick="showReplyForm('${comment.id}')" style="background: none; border: none; cursor: pointer; font-size: 0.8rem; color: #6C63FF;">
                            Ответить
                        </button>
                    </div>
                    <div id="reply-form-${comment.id}" style="display: none; padding-left: 38px; margin-top: 8px;"></div>
                    ${childrenHtml}
                </div>
            `;
        }

        return roots.map(c => renderComment(c)).join('');
    }

    // === ФОРМА ДОБАВЛЕНИЯ КОММЕНТАРИЯ ===
    async function renderCommentForm(articleSlug, containerId, isBanned) {
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data: session } = await client.auth.getSession();
        const user = session?.session?.user;

        if (!user) {
            return `
                <div style="margin: 16px 0; padding: 16px; background: #f8f9fa; border-radius: 8px; text-align: center;">
                    <a href="/login/" style="color: #6C63FF;">Войдите</a> или <a href="/register/" style="color: #6C63FF;">зарегистрируйтесь</a>, чтобы оставить комментарий.
                </div>
            `;
        }

        if (isBanned) {
            return `
                <div style="margin: 16px 0; padding: 16px; background: #fff5f5; border-radius: 8px; text-align: center; border: 1px solid #f5c6cb;">
                    ⛔ Вы забанены и не можете оставлять комментарии.
                </div>
            `;
        }

        return `
            <div style="margin: 16px 0;">
                <textarea id="comment-input-${containerId}" rows="3" placeholder="Напишите комментарий..." style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: inherit; font-size: 0.95rem; resize: vertical;"></textarea>
                <button onclick="submitComment('${articleSlug}', '${containerId}')" style="margin-top: 8px; padding: 8px 24px; background: #6C63FF; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
                    Отправить
                </button>
                <span id="comment-status-${containerId}" style="margin-left: 12px; font-size: 0.85rem; color: #999;"></span>
            </div>
        `;
    }

    // === ОТПРАВКА КОММЕНТАРИЯ ===
    async function submitComment(articleSlug, containerId) {
        const input = document.getElementById(`comment-input-${containerId}`);
        const status = document.getElementById(`comment-status-${containerId}`);
        const content = input.value.trim();

        if (!content) {
            status.textContent = '❌ Введите текст комментария.';
            status.style.color = '#c0392b';
            return;
        }

        status.textContent = '⏳ Отправка...';
        status.style.color = '#999';

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data: session } = await client.auth.getSession();
        const user = session?.session?.user;

        if (!user) {
            status.textContent = '❌ Войдите, чтобы оставить комментарий.';
            status.style.color = '#c0392b';
            return;
        }

        // Проверяем, не забанен ли пользователь
        const { data: profile } = await client
            .from('profiles')
            .select('is_banned')
            .eq('user_id', user.id)
            .single();

        if (profile?.is_banned) {
            status.textContent = '⛔ Вы забанены и не можете оставлять комментарии.';
            status.style.color = '#c0392b';
            return;
        }

        const { error } = await client
            .from('comments')
            .insert([{
                user_id: user.id,
                article_slug: articleSlug,
                content: content
            }]);

        if (error) {
            status.textContent = '❌ Ошибка: ' + error.message;
            status.style.color = '#c0392b';
            return;
        }

        status.textContent = '✅ Комментарий добавлен!';
        status.style.color = '#27ae60';
        input.value = '';

        if (typeof window.addExperience === 'function') {
            window.addExperience(user.id, 5);
        }

        setTimeout(() => loadComments(articleSlug, containerId), 500);
    }

    // === ЛАЙК КОММЕНТАРИЯ ===
    async function likeComment(commentId, likeType) {
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data: session } = await client.auth.getSession();
        const user = session?.session?.user;

        if (!user) {
            alert('Войдите, чтобы ставить лайки.');
            return;
        }

        const { data: existing } = await client
            .from('comment_likes')
            .select('like_type')
            .eq('user_id', user.id)
            .eq('comment_id', commentId)
            .single();

        if (existing) {
            if (existing.like_type === likeType) {
                alert('Вы уже оценили этот комментарий.');
                return;
            }
            const { error } = await client
                .from('comment_likes')
                .update({ like_type: likeType })
                .eq('user_id', user.id)
                .eq('comment_id', commentId);
            if (error) {
                console.error('Ошибка обновления лайка:', error);
                return;
            }
        } else {
            const { error } = await client
                .from('comment_likes')
                .insert([{
                    user_id: user.id,
                    comment_id: commentId,
                    like_type: likeType
                }]);
            if (error) {
                console.error('Ошибка добавления лайка:', error);
                return;
            }
        }

        const { data: likesData } = await client
            .from('comment_likes')
            .select('like_type')
            .eq('comment_id', commentId);

        const likes = likesData?.filter(l => l.like_type === 1).length || 0;
        const dislikes = likesData?.filter(l => l.like_type === -1).length || 0;

        await client
            .from('comments')
            .update({ likes, dislikes })
            .eq('id', commentId);

        const commentEl = document.querySelector(`[data-comment-id="${commentId}"]`);
        if (commentEl) {
            const likeSpan = commentEl.querySelector('.like-count');
            const dislikeSpan = commentEl.querySelector('.dislike-count');
            if (likeSpan) likeSpan.textContent = likes;
            if (dislikeSpan) dislikeSpan.textContent = dislikes;
        }
    }

    // === УДАЛЕНИЕ КОММЕНТАРИЯ ===
    async function deleteComment(commentId) {
        if (!confirm('Удалить комментарий?')) return;

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { error } = await client
            .from('comments')
            .delete()
            .eq('id', commentId);

        if (error) {
            alert('Ошибка удаления: ' + error.message);
            return;
        }

        const container = document.getElementById('comments-container');
        const articleSlug = container?.dataset?.articleSlug;
        if (articleSlug) {
            loadComments(articleSlug, 'comments-container');
        }
    }

    // === ПОКАЗАТЬ ФОРМУ ДЛЯ ОТВЕТА ===
    function showReplyForm(commentId) {
        const formContainer = document.getElementById(`reply-form-${commentId}`);
        if (!formContainer) return;

        if (formContainer.style.display === 'none') {
            const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            client.auth.getSession().then(({ data }) => {
                const user = data?.session?.user;
                if (!user) {
                    formContainer.innerHTML = `<p style="color: #999; font-size: 0.9rem;"><a href="/login/">Войдите</a>, чтобы ответить.</p>`;
                } else {
                    formContainer.innerHTML = `
                        <textarea id="reply-input-${commentId}" rows="2" placeholder="Напишите ответ..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px; font-family: inherit; font-size: 0.9rem; resize: vertical;"></textarea>
                        <button onclick="submitReply('${commentId}')" style="margin-top: 6px; padding: 6px 20px; background: #6C63FF; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
                            Ответить
                        </button>
                        <span id="reply-status-${commentId}" style="margin-left: 12px; font-size: 0.85rem; color: #999;"></span>
                    `;
                }
                formContainer.style.display = 'block';
            });
        } else {
            formContainer.style.display = 'none';
        }
    }

    // === ОТПРАВКА ОТВЕТА ===
    async function submitReply(parentId) {
        const input = document.getElementById(`reply-input-${parentId}`);
        const status = document.getElementById(`reply-status-${parentId}`);
        const content = input.value.trim();

        if (!content) {
            status.textContent = '❌ Введите текст ответа.';
            status.style.color = '#c0392b';
            return;
        }

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data: session } = await client.auth.getSession();
        const user = session?.session?.user;

        if (!user) {
            status.textContent = '❌ Войдите, чтобы ответить.';
            status.style.color = '#c0392b';
            return;
        }

        const { data: profile } = await client
            .from('profiles')
            .select('is_banned')
            .eq('user_id', user.id)
            .single();

        if (profile?.is_banned) {
            status.textContent = '⛔ Вы забанены.';
            status.style.color = '#c0392b';
            return;
        }

        const { data: parentComment } = await client
            .from('comments')
            .select('article_slug')
            .eq('id', parentId)
            .single();

        if (!parentComment) {
            status.textContent = '❌ Ошибка: комментарий не найден.';
            status.style.color = '#c0392b';
            return;
        }

        const { error } = await client
            .from('comments')
            .insert([{
                user_id: user.id,
                article_slug: parentComment.article_slug,
                content: content,
                parent_id: parentId
            }]);

        if (error) {
            status.textContent = '❌ Ошибка: ' + error.message;
            status.style.color = '#c0392b';
            return;
        }

        status.textContent = '✅ Ответ добавлен!';
        status.style.color = '#27ae60';
        input.value = '';

        if (typeof window.addExperience === 'function') {
            window.addExperience(user.id, 5);
        }

        const container = document.getElementById('comments-container');
        const articleSlug = container?.dataset?.articleSlug;
        if (articleSlug) {
            setTimeout(() => loadComments(articleSlug, 'comments-container'), 500);
        }
    }

    // === ДЕЛАЕМ ФУНКЦИИ ГЛОБАЛЬНЫМИ ===
    window.loadComments = loadComments;
    window.submitComment = submitComment;
    window.likeComment = likeComment;
    window.deleteComment = deleteComment;
    window.showReplyForm = showReplyForm;
    window.submitReply = submitReply;

    console.log('✅ comments.js готов');
})();
