// ============================================================
// page-tracker.js — v3 VIP
// Начисление XP за дочитывание статьи до конца (90%)
// - Не дублирует showXpToast — использует experience-toast.js
// - Не дублирует ожидание сессии — использует window.marsSession
// - Единый источник XP-суммы (XP_PER_ARTICLE)
// - rAF-троттлинг scroll (было на каждый пиксель)
// - Проверка что это статья (а не служебная страница)
// - document$ для MkDocs SPA
// - Safe storage + версионирование ключа
// - Reduced-motion: тост не показывается
// - Публичное API: window.marsPageTracker.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsPageTrackerLoaded) return;
    window.__marsPageTrackerLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var XP_PER_ARTICLE = 5;
    var THRESHOLD_PERCENT = 90;
    var PAGE_KEY_VERSION = 'v3_';         // если формула изменится — старые ключи не сработают
    var MIN_DOC_HEIGHT = 800;             // если статья короче — не считаем
    var MIN_SCROLL_RANGE = 150;           // если maxScroll меньше — не считаем
    var MAX_SESSION_WAIT_MS = 5000;
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['📍 tracker:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function lsGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }

    // ============================================================
    // 🚫 Исключения
    // ============================================================
    var EXCLUDED_PATHS = [
        '/', '/index/',
        '/profile/', '/login/', '/register/', '/profile-view/',
        '/stats/', '/game/', '/moderator/',
        '/license/', '/support/', '/start-here/',
        '/globe-map/', '/interactive/', '/interactive/exodus/',
        '/music/constructor/', '/translator/',
        '/achievements/', '/quest-map/', '/quests/', '/top/',
        '/bookmarks/', '/feed/', '/horoscope/', '/scrolls/',
        '/forum/', '/guilds/', '/names/', '/sky/',
        '/scene-generator/', '/duel/', '/museum/', '/weather/',
        '/scan-dates/', '/categories/',
        '/lists/', '/terms/',
        '/en/', '/en/index/'
    ];

    function isExcluded() {
        var path = window.location.pathname;
        // Нормализуем: убираем trailing slash
        var norm = path.replace(/\/$/, '') || '/';
        for (var i = 0; i < EXCLUDED_PATHS.length; i++) {
            var ex = EXCLUDED_PATHS[i];
            var exNorm = ex.replace(/\/$/, '') || '/';
            if (norm === exNorm) return true;
        }
        return false;
    }

    // ============================================================
    // 🔍 Проверка что это статья
    // ============================================================
    function isArticlePage() {
        // Есть контент-область
        var content = document.querySelector('.md-content__inner') ||
                      document.querySelector('.rst-content') ||
                      document.querySelector('article') ||
                      document.querySelector('.document');
        if (!content) return false;

        // В контенте есть заголовок
        var h1 = content.querySelector('h1');
        if (!h1) return false;

        // Достаточно длинный контент (не 404, не заглушка)
        var text = content.textContent || '';
        if (text.length < 300) return false;

        return true;
    }

    // ============================================================
    // ⏳ Ожидание сессии
    // ============================================================
    function waitForUser(maxMs) {
        maxMs = maxMs || MAX_SESSION_WAIT_MS;

        return new Promise(function(resolve) {
            // 1. Уже есть в marsSession
            if (window.marsSession && window.marsSession.user) {
                resolve(window.marsSession.user);
                return;
            }

            var start = Date.now();
            var iv = setInterval(function() {
                if (window.marsSession && window.marsSession.user) {
                    clearInterval(iv);
                    resolve(window.marsSession.user);
                    return;
                }
                if (Date.now() - start > maxMs) {
                    clearInterval(iv);
                    // Fallback — напрямую
                    var client = window.supabaseClient ||
                                 (window.getSupabase && window.getSupabase());
                    if (!client || !client.auth) { resolve(null); return; }
                    client.auth.getSession().then(function(r) {
                        var u = r && r.data && r.data.session && r.data.session.user;
                        resolve(u || null);
                    }).catch(function() { resolve(null); });
                }
            }, 200);
        });
    }

    // ============================================================
    // 📜 Основная логика скролла
    // ============================================================
    var awarded = false;
    var scrollScheduled = false;

    function checkScroll(user) {
        if (awarded) return;

        var scrollY = window.scrollY || window.pageYOffset || 0;
        var windowHeight = window.innerHeight || 0;
        var documentHeight = document.documentElement.scrollHeight || 0;

        // Слишком короткий документ
        if (documentHeight < MIN_DOC_HEIGHT) return;

        var maxScroll = documentHeight - windowHeight;
        if (maxScroll < MIN_SCROLL_RANGE) return;

        var percent = (scrollY / maxScroll) * 100;
        if (percent < THRESHOLD_PERCENT) return;

        // ✅ Дочитал
        awarded = true;

        // Ставим флаг СРАЗУ — защита от повторных триггеров
        var pageKey = PAGE_KEY_VERSION + 'read_' + window.location.pathname;
        lsSet(pageKey, '1');

        // Начисляем опыт
        if (typeof window.addExperience === 'function') {
            // addExperience сам покажет тост (experience.js v3)
            window.addExperience(user.id, XP_PER_ARTICLE).catch(function(e) {
                log('addExperience err:', e && e.message);
            });
        } else {
            // Fallback — если experience.js не загрузился
            log('addExperience недоступен');
            if (typeof window.showExperienceToast === 'function') {
                window.showExperienceToast(XP_PER_ARTICLE);
            }
        }

        // Снимаем листенеры
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
    }

    function onScroll() {
        if (scrollScheduled || awarded) return;
        scrollScheduled = true;
        requestAnimationFrame(function() {
            scrollScheduled = false;
            if (currentUser) checkScroll(currentUser);
        });
    }

    function onResize() {
        if (awarded) return;
        if (currentUser) checkScroll(currentUser);
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    var currentUser = null;

    async function init() {
        if (isExcluded()) {
            log('страница исключена');
            return;
        }
        if (!isArticlePage()) {
            log('не статья');
            return;
        }

        // Уже читал эту страницу?
        var pageKey = PAGE_KEY_VERSION + 'read_' + window.location.pathname;
        if (lsGet(pageKey)) {
            log('уже прочитано ранее');
            return;
        }

        var user = await waitForUser(MAX_SESSION_WAIT_MS);
        if (!user) {
            log('нет пользователя');
            return;
        }

        currentUser = user;

        // Листенеры
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        // Проверка сразу — вдруг уже внизу (например, deep-link на анкор)
        setTimeout(function() { checkScroll(user); }, 800);
        setTimeout(function() { checkScroll(user); }, 2500);

        log('слушаем скролл для', window.location.pathname);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // MkDocs Material SPA-переходы
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                awarded = false;
                currentUser = null;
                setTimeout(init, 200);
            });
        } catch(e) {}
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsPageTracker = {
        XP_PER_ARTICLE: XP_PER_ARTICLE,
        THRESHOLD_PERCENT: THRESHOLD_PERCENT,
        refresh: init,
        isAwarded: function() { return awarded; },
        clearMemory: function() {
            // Сброс флага для текущей страницы
            var pageKey = PAGE_KEY_VERSION + 'read_' + window.location.pathname;
            try { localStorage.removeItem(pageKey); } catch(e) {}
        }
    };

    log('загружен');
})();
