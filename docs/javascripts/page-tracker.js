// ============================================================
// page-tracker.js — v4 VIP (Innovation Update)
// - Порог чтения снижен до 70%
// - Добавлен визуальный Progress Bar (полоса чтения)
// - Защита от накрутки: минимум 15 секунд на странице
// - Проверка видимости вкладки (не дает опыт, если вкладка скрыта)
// - Оптимизация через requestAnimationFrame
// ============================================================
(function() {
    'use strict';

    if (window.__marsPageTrackerLoaded) return;
    window.__marsPageTrackerLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var XP_PER_ARTICLE = 5;
    var THRESHOLD_PERCENT = 70;           // 🔥 ИЗМЕНЕНО НА 70%
    var MIN_TIME_ON_PAGE_SEC = 15;        // 🔥 НОВОЕ: Минимум 15 секунд на странице
    var PAGE_KEY_VERSION = 'v4_';         
    var MIN_DOC_HEIGHT = 800;             
    var MIN_SCROLL_RANGE = 150;           
    var MAX_SESSION_WAIT_MS = 5000;
    var DEBUG = false;

    var pageLoadTime = Date.now();
    var awarded = false;
    var scrollScheduled = false;
    var currentUser = null;
    var progressBar = null;

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
    // 🚫 Исключения и проверки
    // ============================================================
    var EXCLUDED_PATHS = [
        '/', '/index/', '/profile/', '/login/', '/register/', '/profile-view/',
        '/stats/', '/game/', '/moderator/', '/license/', '/support/', '/start-here/',
        '/globe-map/', '/interactive/', '/interactive/exodus/', '/music/constructor/',
        '/translator/', '/achievements/', '/quest-map/', '/quests/', '/top/',
        '/bookmarks/', '/feed/', '/horoscope/', '/scrolls/', '/forum/', '/guilds/',
        '/names/', '/sky/', '/scene-generator/', '/duel/', '/museum/', '/weather/',
        '/scan-dates/', '/categories/', '/lists/', '/terms/', '/en/', '/en/index/'
    ];

    function isExcluded() {
        var path = window.location.pathname;
        var norm = path.replace(/\/$/, '') || '/';
        for (var i = 0; i < EXCLUDED_PATHS.length; i++) {
            var exNorm = EXCLUDED_PATHS[i].replace(/\/$/, '') || '/';
            if (norm === exNorm) return true;
        }
        return false;
    }

    function isArticlePage() {
        var content = document.querySelector('.md-content__inner') ||
                      document.querySelector('.rst-content') ||
                      document.querySelector('article') ||
                      document.querySelector('.document');
        if (!content) return false;
        if (!content.querySelector('h1')) return false;
        if ((content.textContent || '').length < 300) return false;
        return true;
    }

    // ============================================================
    // 🎨 Создание Progress Bar (Нововведение)
    // ============================================================
    function createProgressBar() {
        if (document.getElementById('mars-read-progress')) return;
        
        var style = document.createElement('style');
        style.innerHTML = `
            #mars-read-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #6C63FF, #A29BFE);
                width: 0%;
                z-index: 999999;
                transition: width 0.1s ease-out;
                box-shadow: 0 0 8px rgba(108, 99, 255, 0.6);
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);

        progressBar = document.createElement('div');
        progressBar.id = 'mars-read-progress';
        document.body.appendChild(progressBar);
    }

    // ============================================================
    // ⏳ Ожидание сессии
    // ============================================================
    function waitForUser(maxMs) {
        maxMs = maxMs || MAX_SESSION_WAIT_MS;
        return new Promise(function(resolve) {
            if (window.marsSession && window.marsSession.user) {
                resolve(window.marsSession.user); return;
            }
            var start = Date.now();
            var iv = setInterval(function() {
                if (window.marsSession && window.marsSession.user) {
                    clearInterval(iv); resolve(window.marsSession.user); return;
                }
                if (Date.now() - start > maxMs) {
                    clearInterval(iv);
                    var client = window.supabaseClient || (window.getSupabase && window.getSupabase());
                    if (!client || !client.auth) { resolve(null); return; }
                    client.auth.getSession().then(function(r) {
                        resolve((r && r.data && r.data.session && r.data.session.user) || null);
                    }).catch(function() { resolve(null); });
                }
            }, 200);
        });
    }

    // ============================================================
    // 📜 Основная логика скролла
    // ============================================================
    function checkScroll(user) {
        if (awarded) return;

        var scrollY = window.scrollY || window.pageYOffset || 0;
        var windowHeight = window.innerHeight || 0;
        var documentHeight = document.documentElement.scrollHeight || 0;

        if (documentHeight < MIN_DOC_HEIGHT) return;

        var maxScroll = documentHeight - windowHeight;
        if (maxScroll < MIN_SCROLL_RANGE) return;

        var percent = (scrollY / maxScroll) * 100;

        // Обновляем Progress Bar
        if (progressBar) {
            progressBar.style.width = Math.min(percent, 100) + '%';
        }

        if (percent < THRESHOLD_PERCENT) return;

        // 🔥 Проверка 1: Минимальное время на странице
        var timeSpent = (Date.now() - pageLoadTime) / 1000;
        if (timeSpent < MIN_TIME_ON_PAGE_SEC) {
            // Если проскроллил быстро, ждем оставшееся время
            var timeLeft = (MIN_TIME_ON_PAGE_SEC * 1000) - (Date.now() - pageLoadTime);
            setTimeout(function() { checkScroll(user); }, timeLeft + 100);
            return;
        }

        // 🔥 Проверка 2: Вкладка должна быть активна
        if (document.hidden) {
            return; // Ждем, пока пользователь вернется на вкладку
        }

        // ✅ Все проверки пройдены — начисляем!
        awarded = true;
        var pageKey = PAGE_KEY_VERSION + 'read_' + window.location.pathname;
        lsSet(pageKey, '1');

        if (progressBar) {
            progressBar.style.background = '#4CAF50'; // Зеленеет при получении
            setTimeout(function() {
                progressBar.style.opacity = '0';
                setTimeout(function() { progressBar.remove(); }, 500);
            }, 2000);
        }

        if (typeof window.addExperience === 'function') {
            window.addExperience(user.id, XP_PER_ARTICLE).catch(function(e) {
                log('addExperience err:', e && e.message);
            });
        } else {
            log('addExperience недоступен');
            if (typeof window.showExperienceToast === 'function') {
                window.showExperienceToast(XP_PER_ARTICLE);
            }
        }

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
        if (!awarded && currentUser) checkScroll(currentUser);
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    async function init() {
        awarded = false;
        currentUser = null;
        pageLoadTime = Date.now(); // Сбрасываем таймер при SPA-переходе

        if (isExcluded() || !isArticlePage()) return;

        var pageKey = PAGE_KEY_VERSION + 'read_' + window.location.pathname;
        if (lsGet(pageKey)) return; // Уже читал

        var user = await waitForUser(MAX_SESSION_WAIT_MS);
        if (!user) return;

        currentUser = user;
        createProgressBar(); // Включаем полосу прогресса

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        // Первичная проверка
        setTimeout(function() { checkScroll(user); }, 800);
        setTimeout(function() { checkScroll(user); }, 2500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // SPA-переходы
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                setTimeout(init, 200);
            });
        } catch(e) {}
    }

    // 🌐 Публичное API
    window.marsPageTracker = {
        XP_PER_ARTICLE: XP_PER_ARTICLE,
        THRESHOLD_PERCENT: THRESHOLD_PERCENT,
        refresh: init,
        isAwarded: function() { return awarded; },
        clearMemory: function() {
            var pageKey = PAGE_KEY_VERSION + 'read_' + window.location.pathname;
            try { localStorage.removeItem(pageKey); } catch(e) {}
        }
    };
})();
