// ============================================================
// mobile-cache.js — v2 VIP
// Кэш публичных GET-запросов к Supabase на мобильном
// - Whitelist эндпоинтов + разный TTL по типу данных
// - Не кэширует запросы с Authorization (личные данные)
// - Безопасное кодирование ключа (без deprecated unescape/btoa)
// - Лимит записей + автоочистка при переполнении
// - Обработка quota exceeded (localStorage переполнен)
// - Публичное API: clear(), stats(), invalidate(pattern)
// ============================================================
(function() {
    'use strict';

    if (window.__marsMobileCacheLoaded) return;
    window.__marsMobileCacheLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var DEBUG = false;
    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['💾 cache:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        if (navigator.maxTouchPoints > 0 && window.innerWidth <= 768) return true;
        return window.innerWidth <= 768;
    }

    if (!isMobile()) {
        log('не мобильный — выход');
        return;
    }

    if (!window.fetch) {
        log('fetch не поддерживается');
        return;
    }

    var PREFIX = 'mars-fcache-v2_';
    var INDEX_KEY = PREFIX + '__index__';
    var MAX_ENTRIES = 40;                  // максимум записей
    var MAX_TOTAL_BYTES = 3 * 1024 * 1024; // 3 МБ мягкий лимит

    // ============================================================
    // 📋 Whitelist эндпоинтов с TTL
    // Порядок важен — первое совпадение выигрывает
    // ============================================================
    var RULES = [
        // Публичные списки профилей (лидеры, топы)
        {
            match: function(url) {
                return url.indexOf('/rest/v1/profiles?') !== -1
                    && url.indexOf('user_id=eq.') === -1;  // не личный профиль
            },
            ttl: 3 * 60 * 1000    // 3 минуты
        },
        // Справочник достижений (редко меняется)
        {
            match: function(url) { return url.indexOf('/rest/v1/achievements?') !== -1; },
            ttl: 60 * 60 * 1000   // 1 час
        },
        // Список гильдий
        {
            match: function(url) { return url.indexOf('/rest/v1/guilds?') !== -1; },
            ttl: 5 * 60 * 1000
        },
        // Публичные комментарии статьи
        {
            match: function(url) {
                return url.indexOf('/rest/v1/comments?') !== -1
                    && url.indexOf('article_slug=eq.') !== -1
                    && url.indexOf('user_id=eq.') === -1;
            },
            ttl: 60 * 1000        // 1 минута
        },
        // Рейтинги статей (публичные)
        {
            match: function(url) {
                return url.indexOf('/rest/v1/article_ratings?') !== -1
                    && url.indexOf('user_id=eq.') === -1;
            },
            ttl: 2 * 60 * 1000
        }
    ];

    // 🚫 Жёсткие исключения (личные данные)
    function isPrivate(url) {
        if (url.indexOf('/rest/v1/user_') !== -1) return true;       // user_notes, user_visits, user_quests, user_2fa
        if (url.indexOf('/rest/v1/notifications') !== -1) return true;
        if (url.indexOf('/rest/v1/daily_logins') !== -1) return true;
        if (url.indexOf('/rest/v1/trusted_devices') !== -1) return true;
        if (url.indexOf('/rest/v1/comment_likes') !== -1) return true;
        if (url.indexOf('/rest/v1/friends') !== -1) return true;
        if (url.indexOf('/rest/v1/guild_members') !== -1) return true;
        return false;
    }

    // ============================================================
    // 💾 Safe storage
    // ============================================================
    function lsGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch(e) { return false; } }
    function lsRemove(k) { try { localStorage.removeItem(k); } catch(e) {} }

    // ============================================================
    // 🔑 Безопасное кодирование ключа
    // Не btoa(unescape(...)) — падает на длинных URL и спецсимволах
    // ============================================================
    function hashString(str) {
        // FNV-1a 32-bit — быстрый и достаточно для ключа кэша
        var h = 0x811c9dc5;
        for (var i = 0; i < str.length; i++) {
            h ^= str.charCodeAt(i);
            h = (h * 0x01000193) >>> 0;
        }
        return h.toString(36);
    }

    function makeKey(url) {
        // Простой ключ — короткий хеш + длина для уникальности
        return PREFIX + hashString(url) + '_' + url.length;
    }

    // ============================================================
    // 📇 Индекс записей для контроля размера/очистки
    // ============================================================
    function readIndex() {
        try {
            var raw = lsGet(INDEX_KEY);
            if (!raw) return {};
            var idx = JSON.parse(raw);
            return (idx && typeof idx === 'object') ? idx : {};
        } catch(e) { return {}; }
    }

    function writeIndex(idx) {
        lsSet(INDEX_KEY, JSON.stringify(idx));
    }

    function trackEntry(key, url, sizeBytes) {
        var idx = readIndex();
        idx[key] = { url: url, ts: Date.now(), size: sizeBytes };
        writeIndex(idx);
    }

    function untrackEntry(key) {
        var idx = readIndex();
        if (idx[key]) {
            delete idx[key];
            writeIndex(idx);
        }
    }

    // ============================================================
    // 🧹 Очистка — самая старая запись удаляется
    // ============================================================
    function enforceLimits() {
        var idx = readIndex();
        var keys = Object.keys(idx);
        if (keys.length <= MAX_ENTRIES) {
            // Проверяем размер
            var total = 0;
            for (var i = 0; i < keys.length; i++) total += (idx[keys[i]].size || 0);
            if (total <= MAX_TOTAL_BYTES) return;
        }

        // Сортируем по времени — старые первыми
        keys.sort(function(a, b) {
            return (idx[a].ts || 0) - (idx[b].ts || 0);
        });

        var total = 0;
        for (var j = 0; j < keys.length; j++) total += (idx[keys[j]].size || 0);

        var removed = 0;
        while (keys.length && (keys.length > MAX_ENTRIES || total > MAX_TOTAL_BYTES)) {
            var k = keys.shift();
            total -= (idx[k].size || 0);
            lsRemove(k);
            delete idx[k];
            removed++;
        }

        if (removed > 0) {
            writeIndex(idx);
            log('очищено старых:', removed);
        }
    }

    // ============================================================
    // ✅ Проверка — надо ли кэшировать этот запрос
    // ============================================================
    function getRule(url) {
        if (!url || typeof url !== 'string') return null;
        if (url.indexOf('/rest/v1/') === -1) return null;
        if (isPrivate(url)) return null;

        for (var i = 0; i < RULES.length; i++) {
            if (RULES[i].match(url)) return RULES[i];
        }
        return null;
    }

    // ============================================================
    // 🎭 Мок-ответ из кэша
    // ============================================================
    function makeCachedResponse(data, url) {
        var headers = {
            'Content-Type': 'application/json',
            'X-Mars-Cache': 'HIT'
        };
        var body = JSON.stringify(data);

        // Пробуем нативный Response (Safari 10+, Chrome 42+)
        try {
            return new Response(body, {
                status: 200,
                statusText: 'OK',
                headers: headers
            });
        } catch(e) {
            // Fallback — минимальный mock объекта Response
            log('Response конструктор недоступен — fallback');
            return {
                ok: true,
                status: 200,
                statusText: 'OK',
                url: url,
                headers: {
                    get: function(name) { return headers[name] || null; }
                },
                json: function() { return Promise.resolve(data); },
                text: function() { return Promise.resolve(body); },
                clone: function() { return this; }
            };
        }
    }

    // ============================================================
    // 🌐 Перехват fetch
    // ============================================================
    var origFetch = window.fetch.bind(window);

    window.fetch = function(input, init) {
        // Извлекаем URL
        var url = '';
        try {
            url = (typeof input === 'string') ? input :
                  (input && input.url) ? input.url : String(input);
        } catch(e) { return origFetch(input, init); }

        // Проверяем метод
        var method = 'GET';
        if (init && init.method) method = String(init.method).toUpperCase();
        else if (input && input.method) method = String(input.method).toUpperCase();
        if (method !== 'GET') return origFetch(input, init);

        // Проверяем Authorization
        var hasAuth = false;
        if (init && init.headers) {
            var h = init.headers;
            if (typeof h.get === 'function') {
                hasAuth = !!h.get('Authorization');
            } else if (h['Authorization'] || h['authorization']) {
                hasAuth = true;
            }
        }
        if (hasAuth) return origFetch(input, init);

        // Проверяем правило
        var rule = getRule(url);
        if (!rule) return origFetch(input, init);

        var key = makeKey(url);

        // Пытаемся отдать из кэша
        try {
            var raw = lsGet(key);
            if (raw) {
                var c = JSON.parse(raw);
                if (c && (Date.now() - c.ts) < rule.ttl) {
                    log('HIT:', url.slice(0, 80));
                    return Promise.resolve(makeCachedResponse(c.data, url));
                }
                // Просрочен — удаляем
                lsRemove(key);
                untrackEntry(key);
            }
        } catch(e) {}

        // Идём в сеть
        log('MISS:', url.slice(0, 80));
        return origFetch(input, init).then(function(res) {
            if (!res || !res.ok) return res;

            // Клонируем и сохраняем
            try {
                var clone = res.clone();
                clone.json().then(function(data) {
                    var serialized = JSON.stringify({ data: data, ts: Date.now() });
                    // Проверка размера одной записи
                    if (serialized.length > MAX_TOTAL_BYTES / 2) return;
                    if (lsSet(key, serialized)) {
                        trackEntry(key, url, serialized.length);
                        enforceLimits();
                    }
                }).catch(function() {});
            } catch(e) {}

            return res;
        });
    };

    // ============================================================
    // 🚀 Init
    // ============================================================
    function init() {
        // Принудительная очистка просроченных при старте
        try {
            var idx = readIndex();
            var now = Date.now();
            var keys = Object.keys(idx);
            var removed = 0;

            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var raw = lsGet(k);
                if (!raw) {
                    delete idx[k];
                    removed++;
                    continue;
                }
                try {
                    var c = JSON.parse(raw);
                    // Если запись старше 2 часов — точно просрочена
                    if (!c || (now - c.ts) > 2 * 60 * 60 * 1000) {
                        lsRemove(k);
                        delete idx[k];
                        removed++;
                    }
                } catch(e) {
                    lsRemove(k);
                    delete idx[k];
                    removed++;
                }
            }
            if (removed) writeIndex(idx);
            if (removed) log('при старте очищено:', removed);
        } catch(e) {}

        log('v2 VIP активен');
    }

    init();

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsMobileCache = {
        // Очистить весь кэш
        clear: function() {
            try {
                var idx = readIndex();
                var keys = Object.keys(idx);
                for (var i = 0; i < keys.length; i++) lsRemove(keys[i]);
                lsRemove(INDEX_KEY);
                log('кэш очищен полностью');
                return keys.length;
            } catch(e) { return 0; }
        },

        // Удалить записи, где URL содержит подстроку
        invalidate: function(pattern) {
            if (!pattern) return 0;
            var idx = readIndex();
            var removed = 0;
            Object.keys(idx).forEach(function(k) {
                if ((idx[k].url || '').indexOf(pattern) !== -1) {
                    lsRemove(k);
                    delete idx[k];
                    removed++;
                }
            });
            writeIndex(idx);
            log('invalidate(', pattern, '):', removed);
            return removed;
        },

        // Статистика
        stats: function() {
            var idx = readIndex();
            var keys = Object.keys(idx);
            var total = 0;
            for (var i = 0; i < keys.length; i++) total += (idx[keys[i]].size || 0);
            return {
                entries: keys.length,
                bytes: total,
                maxEntries: MAX_ENTRIES,
                maxBytes: MAX_TOTAL_BYTES,
                entries_list: keys.map(function(k) {
                    return { url: idx[k].url, ts: idx[k].ts, size: idx[k].size };
                })
            };
        }
    };

    log('v2 VIP загружен');
})();
