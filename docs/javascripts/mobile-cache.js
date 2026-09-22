// mobile-cache.js — кэш fetch-запросов к Supabase
(function() {
    'use strict';
    var isMobile = window.innerWidth <= 768 ||
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;

    var CACHE_PREFIX = 'mars-fetch-cache-';
    var DEFAULT_TTL = 5 * 60 * 1000; // 5 минут

    // Перехватываем fetch
    var origFetch = window.fetch;
    window.fetch = function(url, opts) {
        // Кэшируем только GET к Supabase REST
        var isGet = !opts || !opts.method || opts.method.toUpperCase() === 'GET';
        var isSupabase = typeof url === 'string' &&
            url.indexOf('supabase.co/rest/v1/') !== -1;
        var hasAuth = opts && opts.headers && opts.headers['Authorization'];

        // Не кэшируем запросы с авторизацией (сессии, приватные данные)
        // Кэшируем только публичные (лидеры, ачивки, гильдии)
        var isPublic = isSupabase && isGet && url.indexOf('profiles?select=') !== -1;

        if (!isPublic) return origFetch.apply(this, arguments);

        var key = CACHE_PREFIX + btoa(unescape(encodeURIComponent(url)));
        try {
            var cached = localStorage.getItem(key);
            if (cached) {
                var c = JSON.parse(cached);
                if (Date.now() - c.ts < DEFAULT_TTL) {
                    // Возвращаем из кэша
                    return Promise.resolve(new Response(JSON.stringify(c.data), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' }
                    }));
                }
            }
        } catch(e) {}

        // Идём в сеть
        return origFetch.apply(this, arguments).then(function(res) {
            if (!res.ok) return res;
            var clone = res.clone();
            clone.json().then(function(data) {
                try {
                    localStorage.setItem(key, JSON.stringify({ data: data, ts: Date.now() }));
                } catch(e) {}
            }).catch(function() {});
            return res;
        });
    };

    console.log('[mobile-cache] ✅ Кэш публичных запросов включён');
})();
