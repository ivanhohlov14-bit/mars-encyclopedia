// ============================================================
// comments-loader.js — v3 VIP
// Автоматически добавляет комментарии на страницы
// - document$ для MkDocs Material + fallback setInterval
// - Поддержка RTD и Material
// - Красивый скелетон + retry
// - requestIdleCallback — не блокирует рендер
// ============================================================
(function() {
    'use strict';

    if (window.__commentsLoaderLoaded) return;
    window.__commentsLoaderLoaded = true;

    var DEBUG = false;
    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['📄 loader:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 🚫 Исключения
    // ============================================================
    var EXCLUDE_PATHS = [
        '/', '/index/', '/profile/', '/login/', '/register/', '/profile-view/',
        '/stats/', '/game/', '/moderator/', '/license/', '/support/',
        '/privacy/', '/about/', '/contact/', '/code-of-conduct/', '/statistics/',
        '/start-here/', '/globe-map/', '/interactive/', '/interactive/exodus/',
        '/music/constructor/', '/translator/', '/achievements/', '/quest-map/',
        '/quests/', '/top/', '/bookmarks/', '/feed/', '/horoscope/', '/scrolls/',
        '/forum/', '/guilds/', '/names/', '/sky/', '/scene-generator/', '/duel/',
        '/museum/', '/weather/', '/scan-dates/', '/categories/', '/lists/',
        '/lists/moderation/', '/lists/eden-kings/', '/lists/ksanf-pirates/',
        '/lists/arkadia-princes/', '/lists/serpentida-kings/', '/lists/hellas-rulers/',
        '/lists/utopia-admirals/', '/lists/khong-masters/', '/lists/great-scribes/',
        '/terms/akademiya-okhasena/', '/en/', '/en/index/'
    ];

    function normalizePath(p) {
        return (p || '/').replace(/\/$/, '') || '/';
    }

    function isExcluded() {
        var cur = normalizePath(window.location.pathname);
        for (var i = 0; i < EXCLUDE_PATHS.length; i++) {
            if (cur === normalizePath(EXCLUDE_PATHS[i])) return true;
        }
        return false;
    }

    // ============================================================
    // 🔍 Определение slug и контентной области
    // ============================================================
    function getSlug() {
        var path = window.location.pathname.replace(/\/$/, '');
        var parts = path.split('/').filter(Boolean);
        // Пропускаем языковой префикс
        var slug = parts[parts.length - 1] || 'index';
        if (slug === '' || slug === 'index') slug = 'home';
        return slug;
    }

    function getContentArea() {
        return document.querySelector('.wy-nav-content') ||
               document.querySelector('.md-content__inner') ||
               document.querySelector('.rst-content') ||
               document.querySelector('article') ||
               null;
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('comments-loader-style')) return;
        var s = document.createElement('style');
        s.id = 'comments-loader-style';
        s.textContent = `
            #comments-loader-heading {
                font-size: 1.6rem; font-weight: 800;
                margin: 0 0 18px 0; display: flex; align-items: center; gap: 10px;
                color: #1a1a2e; letter-spacing: -0.3px;
                animation: clFadeIn .5s cubic-bezier(.16,1,.3,1) both;
            }
            #comments-loader-heading .cl-icon {
                font-size: 1.5rem; display: inline-block;
                animation: clBounce 2.5s ease-in-out infinite;
            }
            #comments-loader-heading .cl-count {
                font-size: 0.75rem; color: #888; font-weight: 700;
                background: rgba(0,0,0,.05); padding: 3px 12px;
                border-radius: 14px; margin-left: 4px;
            }
            #comments-loader-hr {
                margin: 40px 0 24px 0; border: none; height: 2px;
                background: linear-gradient(90deg, transparent, rgba(108,99,255,.3), transparent);
                animation: clFadeIn .6s ease both;
            }
            .cl-skeleton {
                margin: 24px 0; padding: 20px;
                background: #fff; border-radius: 16px;
                border-left: 4px solid rgba(108,99,255,.3);
                box-shadow: 0 4px 16px rgba(0,0,0,.04);
                animation: clFadeIn .4s ease both;
            }
            .cl-skel-row { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }
            .cl-skel-circle {
                width: 40px; height: 40px; border-radius: 50%;
                background: linear-gradient(90deg,#f0f0f4 25%,#f8f8fc 50%,#f0f0f4 75%);
                background-size: 200% 100%; animation: clShimmer 1.5s ease-in-out infinite;
                flex-shrink: 0;
            }
            .cl-skel-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
            .cl-skel-line {
                height: 12px; border-radius: 6px;
                background: linear-gradient(90deg,#f0f0f4 25%,#f8f8fc 50%,#f0f0f4 75%);
                background-size: 200% 100%; animation: clShimmer 1.5s ease-in-out infinite;
            }
            .cl-skel-line.short { width: 40%; }
            .cl-skel-line.medium { width: 70%; }
            .cl-skel-line.body { height: 10px; margin-left: 52px; width: 85%; }
            .cl-skel-line.body-2 { height: 10px; margin-left: 52px; width: 60%; }
            @keyframes clShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
            @keyframes clFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes clBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
            .cl-error {
                text-align: center; padding: 30px 20px; color: #999;
                font-size: 0.92rem; background: rgba(0,0,0,.02); border-radius: 12px;
            }
            .cl-error-icon { font-size: 2.5rem; margin-bottom: 8px; opacity: 0.4; }
            .cl-retry {
                display: inline-block; margin-top: 10px; padding: 8px 20px;
                background: #6C63FF; color: #fff; border: none; border-radius: 20px;
                font-weight: 700; font-size: 0.85rem; cursor: pointer; font-family: inherit;
                transition: all .25s;
            }
            .cl-retry:hover { background: #5a52d5; transform: translateY(-2px); }
            @media (max-width: 600px) {
                #comments-loader-heading { font-size: 1.3rem; margin-bottom: 14px; }
                #comments-loader-heading .cl-icon { font-size: 1.2rem; }
                .cl-skeleton { padding: 16px; }
                .cl-skel-circle { width: 34px; height: 34px; }
                .cl-skel-line.body, .cl-skel-line.body-2 { margin-left: 46px; }
            }
            @media (prefers-reduced-motion: reduce) {
                .cl-skeleton, .cl-skel-circle, .cl-skel-line,
                #comments-loader-heading, #comments-loader-heading .cl-icon {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🦴 Скелетон
    // ============================================================
    function renderSkeleton(container) {
        var one = function(delay) {
            return '<div class="cl-skeleton"' + (delay ? ' style="animation-delay:' + delay + 's;"' : '') + '>' +
                '  <div class="cl-skel-row">' +
                '    <div class="cl-skel-circle"></div>' +
                '    <div class="cl-skel-lines">' +
                '      <div class="cl-skel-line short"></div>' +
                '      <div class="cl-skel-line medium"></div>' +
                '    </div>' +
                '  </div>' +
                '  <div class="cl-skel-line body"></div>' +
                '  <div class="cl-skel-line body-2"></div>' +
                '</div>';
        };
        container.innerHTML = one(0) + one(0.15);
    }

    // ============================================================
    // ⏳ Ожидание loadComments
    // ============================================================
    function waitForLoadComments(maxMs) {
        maxMs = maxMs || 8000;
        return new Promise(function(resolve) {
            if (typeof window.loadComments === 'function') {
                resolve(window.loadComments);
                return;
            }
            var start = Date.now();
            var iv = setInterval(function() {
                if (typeof window.loadComments === 'function') {
                    clearInterval(iv);
                    resolve(window.loadComments);
                    return;
                }
                if (Date.now() - start > maxMs) {
                    clearInterval(iv);
                    resolve(null);
                }
            }, 150);
        });
    }

    function renderError(container, message) {
        container.innerHTML =
            '<div class="cl-error">' +
            '  <div class="cl-error-icon">💬</div>' +
            '  <div>' + (message || 'Не удалось загрузить комментарии') + '</div>' +
            '  <button class="cl-retry" type="button" data-action="reload">Обновить</button>' +
            '</div>';
        var btn = container.querySelector('[data-action="reload"]');
        if (btn) btn.addEventListener('click', function() { location.reload(); });
    }

    // ============================================================
    // 🚀 Основная логика
    // ============================================================
    var _initInProgress = false;

    async function init() {
        if (_initInProgress) return;
        if (isExcluded()) { log('исключено'); return; }

        var contentArea = getContentArea();
        if (!contentArea) { log('нет контентной области'); return; }

        if (document.getElementById('comments-container')) {
            log('контейнер уже есть');
            return;
        }

        _initInProgress = true;
        injectStyles();

        var slug = getSlug();

        try {
            var hr = document.createElement('hr');
            hr.id = 'comments-loader-hr';
            contentArea.appendChild(hr);

            var heading = document.createElement('h2');
            heading.id = 'comments-loader-heading';
            heading.innerHTML =
                '<span class="cl-icon">💬</span>' +
                '<span>Комментарии</span>' +
                '<span class="cl-count" id="comments-loader-count" style="display:none;"></span>';
            contentArea.appendChild(heading);

            var container = document.createElement('div');
            container.id = 'comments-container';
            container.dataset.articleSlug = slug;
            container.style.cssText = 'margin-top: 20px;';
            renderSkeleton(container);
            contentArea.appendChild(container);
        } catch(e) {
            console.error('❌ comments-loader: создание DOM', e);
            _initInProgress = false;
            return;
        }

        var loadComments = await waitForLoadComments(8000);

        if (!loadComments) {
            renderError(container, 'Комментарии временно недоступны');
            _initInProgress = false;
            return;
        }

        try {
            await loadComments(slug, 'comments-container');
            log('загружено для', slug);
        } catch(e) {
            console.error('❌ comments-loader:', e);
            renderError(container, 'Ошибка загрузки комментариев');
        } finally {
            _initInProgress = false;
        }
    }

    // ============================================================
    // 🚀 Старт с requestIdleCallback
    // ============================================================
    function start() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(init, { timeout: 2000 });
        } else {
            setTimeout(init, 300);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    // ============================================================
    // 🔄 SPA-переходы: document$ или fallback
    // ============================================================
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                // Сносим старый контейнер и инициализируемся заново
                setTimeout(function() {
                    var old = document.getElementById('comments-container');
                    if (old) old.remove();
                    var oldHr = document.getElementById('comments-loader-hr');
                    if (oldHr) oldHr.remove();
                    var oldH = document.getElementById('comments-loader-heading');
                    if (oldH) oldH.remove();
                    init();
                }, 300);
            });
        } catch(e) {}
    } else {
        // Fallback — setInterval с проверкой URL
        var lastUrl = location.href;
        setInterval(function() {
            if (location.href === lastUrl) return;
            lastUrl = location.href;
            setTimeout(function() {
                var old = document.getElementById('comments-container');
                if (old) old.remove();
                init();
            }, 400);
        }, 1500);
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.commentsLoader = {
        reload: init,
        isExcluded: isExcluded
    };

    log('v3 загружен');
})();
