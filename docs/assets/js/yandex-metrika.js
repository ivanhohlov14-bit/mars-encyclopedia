// ============================================================
// yandex-metrika.js — v2 VIP
// Счётчик Яндекс.Метрики (ID: 110849579)
// - Пропуск на localhost / file:// / preview
// - Отложенный старт — не блокирует рендер
// - Защита от двойной загрузки
// - Публичное API: marsMetrika.hit / reachGoal / params
// ============================================================
(function() {
    'use strict';

    if (window.__marsMetrikaLoaded) return;
    window.__marsMetrikaLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var COUNTER_ID = 110849579;

    // Счётчики — вкл/выкл тяжёлые модули
    var CONFIG = {
        ssr: true,                 // Server-Side Rendering
        webvisor: true,            // Видеозапись сессий (тяжёлый)
        clickmap: true,            // Карта кликов
        ecommerce: 'dataLayer',    // E-commerce события
        accurateTrackBounce: true, // Точный показатель отказов
        trackLinks: true           // Отслеживание внешних ссылок
    };

    // ============================================================
    // 🚫 Пропуск на dev-окружении
    // ============================================================
    function shouldSkip() {
        var host = location.hostname;
        var proto = location.protocol;

        // Локальные
        if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0') return true;
        if (host === '' && proto === 'file:') return true;
        if (host.indexOf('192.168.') === 0) return true;
        if (host.indexOf('10.') === 0) return true;

        // GitHub Pages / Netlify / Vercel preview
        if (host.indexOf('netlify.app') !== -1) return true;
        if (host.indexOf('vercel.app') !== -1) return true;
        if (host.indexOf('github.io') !== -1 && host.indexOf('mars-wiki') === -1) return true;

        // Параметр в URL для отключения (?nometrika=1)
        try {
            if (location.search.indexOf('nometrika=1') !== -1) return true;
        } catch(e) {}

        return false;
    }

    if (shouldSkip()) {
        console.log('ℹ️ yandex-metrika: пропуск (dev/preview окружение)');
        // Заглушка API чтобы другие скрипты не падали
        window.marsMetrika = {
            hit: function() {},
            reachGoal: function() {},
            params: function() {},
            isEnabled: false
        };
        return;
    }

    // ============================================================
    // 📥 Загрузка счётчика
    // ============================================================
    function initMetrika() {
        // Инициализация очереди ym
        (function(m, e, t, r, i, k, a) {
            if (m[i]) return; // уже инициализировано
            m[i] = m[i] || function() {
                (m[i].a = m[i].a || []).push(arguments);
            };
            m[i].l = 1 * new Date();

            // Проверяем не загружен ли уже
            for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) return;
            }

            k = e.createElement(t);
            a = e.getElementsByTagName(t)[0];
            k.async = 1;
            k.src = r;

            // На случай если <head> ещё не готов
            if (a && a.parentNode) {
                a.parentNode.insertBefore(k, a);
            } else {
                (e.head || e.documentElement).appendChild(k);
            }
        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + COUNTER_ID, 'ym');

        // Init
        try {
            window.ym(COUNTER_ID, 'init', {
                ssr: CONFIG.ssr,
                webvisor: CONFIG.webvisor,
                clickmap: CONFIG.clickmap,
                ecommerce: CONFIG.ecommerce,
                referrer: document.referrer,
                url: location.href,
                accurateTrackBounce: CONFIG.accurateTrackBounce,
                trackLinks: CONFIG.trackLinks
            });
            console.log('📊 yandex-metrika: счётчик ' + COUNTER_ID + ' инициализирован');
        } catch(e) {
            console.warn('⚠️ yandex-metrika init:', e.message);
        }
    }

    // ============================================================
    // 🌐 Публичное API — для вызова из других скриптов
    // ============================================================
    function ensureYm() {
        if (typeof window.ym !== 'function') {
            // Ставим в очередь — выполнится когда ym загрузится
            return false;
        }
        return true;
    }

    window.marsMetrika = {
        isEnabled: true,
        counterId: COUNTER_ID,

        // Просмотр страницы (SPA-навигация)
        hit: function(url, options) {
            if (!ensureYm()) return;
            try {
                window.ym(COUNTER_ID, 'hit', url || location.href, options || {});
            } catch(e) {}
        },

        // Достижение цели
        reachGoal: function(goalName, params) {
            if (!ensureYm()) return;
            try {
                window.ym(COUNTER_ID, 'reachGoal', goalName, params || {});
            } catch(e) {}
        },

        // Параметры посетителя
        params: function(params) {
            if (!ensureYm()) return;
            try {
                window.ym(COUNTER_ID, 'params', params || {});
            } catch(e) {}
        },

        // Универсальный вызов
        call: function() {
            if (!ensureYm()) return;
            try {
                window.ym.apply(null, arguments);
            } catch(e) {}
        }
    };

    // ============================================================
    // 🚀 Старт — откладываем, чтобы не блокировать рендер
    // ============================================================
    function start() {
        // requestIdleCallback — грузим когда браузер свободен
        if ('requestIdleCallback' in window) {
            requestIdleCallback(initMetrika, { timeout: 2000 });
        } else {
            setTimeout(initMetrika, 1000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(start, 500);
        });
    } else {
        setTimeout(start, 500);
    }

    // ============================================================
    // 🔔 Авто-цели на клики по кнопкам
    // ============================================================
    function attachAutoGoals() {
        document.addEventListener('click', function(e) {
            var target = e.target.closest('[data-metrika-goal]');
            if (!target) return;
            var goal = target.getAttribute('data-metrika-goal');
            if (goal) {
                window.marsMetrika.reachGoal(goal);
            }
        }, true);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachAutoGoals);
    } else {
        attachAutoGoals();
    }

    console.log('✅ yandex-metrika.js v2 VIP загружен');
})();
