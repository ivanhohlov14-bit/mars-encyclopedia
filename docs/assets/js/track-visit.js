// ============================================================
// track-visit.js — v2 VIP
// Записывает посещения статей (для daily-reward: «прочитал статью», «посетил место»)
// - Единый клиент (window.supabaseClient)
// - Правильное ожидание сессии (window.marsSession)
// - Дедупликация (1 раз на статью в день)
// - Ретраи при ошибках
// - Авто-очередь для офлайн (запишет когда вернётся интернет)
// ============================================================
(function() {
    'use strict';

    if (window.__trackVisitLoaded) return;
    window.__trackVisitLoaded = true;

    // ============================================================
    // ⚙️ Конфигурация
    // ============================================================
    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';

    var PENDING_KEY = 'mars-pending-visits';  // очередь для офлайн
    var VISITED_PREFIX = 'visited_';          // префикс ключа "уже посещено"
    var RETRY_DELAYS = [2000, 5000, 10000];   // ретраи: 2с, 5с, 10с

    // ============================================================
    // 📍 Карта: точный ID → тип
    // ============================================================
    var PLACE_TYPES = {
        // Моря
        'acidalia-sea': 'sea',
        'argida': 'sea',
        'hellas-sea': 'sea',
        'zephyria-sea': 'sea',
        'eritrea-sea': 'sea',
        'amazon-sea': 'sea',

        // Города
        'okhasen': 'city',
        'rogen-aria': 'city',
        'akkha-kor': 'city',
        'noviy-okhasen': 'city',

        // Храмы / святыни
        'ksanf-temple': 'temple',
        'podzemniy-khram': 'temple',

        // Пещеры
        'farsida-caves': 'cave',

        // Персонажи
        'hevsur': 'character',
        'talin': 'character',
        'ella': 'character',
        'irayina': 'character',
        'yarra': 'character',
        'alira': 'character',
        'miran': 'character',
        'aratan-iii': 'character',
        'kharan': 'character',
        'sarum-ii': 'character',
        'sarum-velikiy': 'character',
        'soviya': 'character',
        'arash': 'character',
        'kan': 'character',
        'kharan': 'character',

        // История / хроники
        'periodization': 'history',
        'timeline': 'history',
        'myths': 'myth',
        'epokha-osnovaniya': 'history',
        'epokha-rascveta': 'history',
        'epokha-umiraniya': 'history',
        'iskhod': 'history',
        'kingdoms-history': 'history',

        // География
        'valles-marineris': 'geography',
        'olympus-mons': 'geography',
        'tarsis': 'geography',
        'farsida': 'geography',
        'water-on-mars': 'geography',

        // Религия
        'kho': 'religion',
        'akha': 'religion',
        'araksis': 'religion',
        'prorochestvo-kharana': 'religion',
        'ksanf-monster': 'myth',

        // Астрономия
        'phobos': 'astronomy',
        'deimos': 'astronomy',
        'phobos-deimos': 'astronomy',
        'mars-sky': 'astronomy',
        'marsian-calendar': 'astronomy',
        'mars': 'astronomy',
        'earth-as-target': 'astronomy',
        'earth': 'astronomy',

        // Термины / язык
        'lan-sur': 'term',
        'tablichki': 'term',

        // Наука / биология
        'gemotsianin': 'biology',
        'silicon-life': 'biology',
        'carbon-vita': 'biology'
    };

    // ============================================================
    // 📍 Запасная карта: раздел → тип
    // ============================================================
    var SECTION_TYPES = {
        'geography': 'geography',
        'history': 'history',
        'people': 'character',
        'culture': 'culture',
        'astronomy': 'astronomy',
        'mythology': 'religion',
        'religion': 'religion',
        'technology': 'tech',
        'biology': 'biology',
        'science': 'science',
        'books': 'book',
        'music': 'music',
        'terms': 'term',
        'interactive': 'interactive',
        'lists': 'list'
    };

    // ============================================================
    // 🚫 Исключения — не записываем
    // ============================================================
    var EXCLUDED_PATHS = [
        '/', '/index/',
        '/profile/', '/login/', '/register/',
        '/stats/', '/game/', '/profile-view/', '/moderator/',
        '/license/', '/support/', '/start-here/',
        '/globe-map/', '/interactive/exodus/',
        '/music/constructor/', '/interactive/',
        '/translator/', '/bookmarks/', '/top/',
        '/quest-map/', '/achievements/', '/feed/',
        '/guilds/', '/quests/', '/horoscope/',
        '/scrolls/', '/forum/', '/link-device/',
        '/en/', '/en/index/'
    ];

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function todayStr() {
        return new Date().toISOString().slice(0, 10);
    }

    function isExcluded() {
        return EXCLUDED_PATHS.indexOf(window.location.pathname) !== -1;
    }

    function getPlaceInfo() {
        var path = window.location.pathname;
        var parts = path.replace(/^\/|\/$/g, '').split('/');
        var last = parts[parts.length - 1] || 'home';
        var parent = parts[parts.length - 2] || '';

        // Приоритет 1: meta-тег на странице
        var metaType = document.querySelector('meta[name="place-type"]');
        if (metaType && metaType.content) {
            return { place_id: last, place_type: metaType.content };
        }

        // Приоритет 2: точная карта
        if (PLACE_TYPES[last]) {
            return { place_id: last, place_type: PLACE_TYPES[last] };
        }

        // Приоритет 3: карта по разделу
        if (SECTION_TYPES[parent]) {
            return { place_id: last, place_type: SECTION_TYPES[parent] };
        }

        // Fallback
        return { place_id: last, place_type: 'other' };
    }

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
                        storageKey: SB_KEY,
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

    async function withRetry(fn, delays) {
        delays = delays || RETRY_DELAYS;
        var lastErr;
        for (var i = 0; i <= delays.length; i++) {
            try {
                return await fn();
            } catch(e) {
                lastErr = e;
                if (i < delays.length) {
                    await new Promise(function(r) { setTimeout(r, delays[i]); });
                }
            }
        }
        throw lastErr;
    }

    // ============================================================
    // ⏳ Ожидание пользователя
    // ============================================================
    function waitForUser(maxMs) {
        maxMs = maxMs || 6000;
        return new Promise(function(resolve) {
            // Если уже есть в marsSession
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
                    // Fallback: getSession напрямую
                    var client = getClient();
                    if (!client) { resolve(null); return; }
                    client.auth.getSession().then(function(r) {
                        var u = r && r.data && r.data.session && r.data.session.user;
                        resolve(u || null);
                    }).catch(function() { resolve(null); });
                }
            }, 150);
        });
    }

    // ============================================================
    // 📥 Очередь офлайн
    // ============================================================
    function readPending() {
        try {
            var raw = localStorage.getItem(PENDING_KEY);
            if (!raw) return [];
            var arr = JSON.parse(raw);
            return Array.isArray(arr) ? arr : [];
        } catch(e) { return []; }
    }

    function writePending(arr) {
        try {
            localStorage.setItem(PENDING_KEY, JSON.stringify(arr.slice(-50)));
        } catch(e) {}
    }

    function queueVisit(visit) {
        var pending = readPending();
        // Уже в очереди?
        var key = visit.user_id + '|' + visit.place_id + '|' + visit.visited_at.slice(0, 10);
        var exists = pending.some(function(v) {
            return (v.user_id + '|' + v.place_id + '|' + v.visited_at.slice(0, 10)) === key;
        });
        if (exists) return;
        pending.push(visit);
        writePending(pending);
    }

    async function flushPending() {
        var client = getClient();
        if (!client) return;

        var pending = readPending();
        if (!pending.length) return;

        var remaining = [];
        for (var i = 0; i < pending.length; i++) {
            try {
                var v = pending[i];
                var res = await client.from('user_visits').insert({
                    user_id: v.user_id,
                    place_id: v.place_id,
                    place_type: v.place_type,
                    visited_at: v.visited_at
                });
                if (res && res.error) {
                    // Если дубликат — просто убираем из очереди
                    if (res.error.code === '23505') continue;
                    remaining.push(v);
                }
            } catch(e) {
                remaining.push(pending[i]);
            }
        }
        writePending(remaining);
    }

    // ============================================================
    // 📝 Запись посещения
    // ============================================================
    async function recordVisit() {
        if (isExcluded()) {
            return;
        }

        var client = getClient();
        if (!client) {
            return;
        }

        var user = await waitForUser(6000);
        if (!user) {
            return;
        }

        var info = getPlaceInfo();
        var today = todayStr();
        var storageKey = VISITED_PREFIX + info.place_id + '_' + today;

        // Дедупликация — уже записывали сегодня?
        if (localStorage.getItem(storageKey)) {
            return;
        }

        // Ставим флаг ДО запроса — защита от повторов
        localStorage.setItem(storageKey, '1');

        var visit = {
            user_id: user.id,
            place_id: info.place_id,
            place_type: info.place_type,
            visited_at: new Date().toISOString()
        };

        try {
            var res = await withRetry(function() {
                return client.from('user_visits').insert(visit);
            });

            if (res && res.error) {
                // Дубликат — не ошибка
                if (res.error.code === '23505') {
                    console.log('📍 Посещение уже было записано');
                    return;
                }
                throw res.error;
            }

            console.log('✅ Посещение записано:', info.place_id, '→', info.place_type);

            // Уведомляем другие скрипты
            try {
                window.dispatchEvent(new CustomEvent('marsVisitRecorded', {
                    detail: visit
                }));
            } catch(e) {}
        } catch(e) {
            console.warn('⚠️ Не удалось записать посещение, ставлю в очередь:', e.message);
            // В очередь — запишем позже
            queueVisit(visit);
            // Возможно у нас проблемы с сетью — пробуем слить очередь
            setTimeout(flushPending, 5000);
        }
    }

    // ============================================================
    // 🔄 Слив очереди при возврате сети
    // ============================================================
    window.addEventListener('online', function() {
        console.log('🌐 Онлайн — сливаю очередь посещений');
        setTimeout(flushPending, 1000);
    });

    // При каждой загрузке страницы — если есть очередь, сливаем
    setTimeout(flushPending, 3000);

    // И периодически
    setInterval(flushPending, 60000);

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function start() {
        // Небольшая задержка — чтобы страница прогрузилась
        setTimeout(recordVisit, 800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.trackVisit = {
        record: recordVisit,
        flush: flushPending,
        getPendingCount: function() { return readPending().length; }
    };

    console.log('✅ track-visit.js v2 VIP загружен');
})();
