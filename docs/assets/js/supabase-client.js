// ============================================================
// supabase-client.js v3 — стабильный
// Решает:
//   1. Аватарка не догружается (race condition)
//   2. Сессия теряется через час (правильный refresh)
//   3. Профиль мерцает 3 раза (дедупликация)
// ============================================================
(function() {
    'use strict';

    if (window.__marsSupabaseSetup) return;
    window.__marsSupabaseSetup = true;

    var SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    var SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";
    var PROJECT_REF = 'ncytbgbzfjfoqmmgfygz';
    var SB_KEY = 'sb-' + PROJECT_REF + '-auth-token';
    var MY_KEY = 'mars-auth-v1';
    var BACKUP_KEY = 'mars-auth-backup';
    var PROFILE_CACHE_KEY = 'mars-profile-cache-v2';

    // TTL кэша профиля — 5 минут
    var PROFILE_TTL = 5 * 60 * 1000;
    // Обновлять токен если осталось меньше 10 минут
    var REFRESH_THRESHOLD_MS = 10 * 60 * 1000;

    // ============================================================
    // 🍪 COOKIE
    // ============================================================
    function getCookie(name) {
        try {
            var cs = document.cookie.split(';');
            for (var i = 0; i < cs.length; i++) {
                var c = cs[i].trim();
                if (c.indexOf(name + '=') === 0) {
                    return decodeURIComponent(c.substring(name.length + 1));
                }
            }
        } catch(e) {}
        return null;
    }

    // ============================================================
    // 💾 Хранилище
    // ============================================================
    function getSafeStorage() {
        try {
            localStorage.setItem('__t', '1');
            localStorage.removeItem('__t');
            return window.localStorage;
        } catch (e) {
            try { return window.sessionStorage; } catch(e2) { return null; }
        }
    }

    // ============================================================
    // 📖 ПОИСК СЕССИИ (любой формат, любой ключ, cookie)
    // ============================================================
    function findSession() {
        var keys = [MY_KEY, SB_KEY, BACKUP_KEY];
        var raw = null, i;

        for (i = 0; i < keys.length; i++) {
            try { raw = localStorage.getItem(keys[i]); if (raw) break; } catch(e) {}
        }
        if (!raw) for (i = 0; i < keys.length; i++) {
            try { raw = sessionStorage.getItem(keys[i]); if (raw) break; } catch(e) {}
        }
        if (!raw) for (i = 0; i < keys.length; i++) {
            raw = getCookie(keys[i]);
            if (raw) break;
        }
        if (!raw) return null;

        try {
            var p = JSON.parse(raw);
            if (Array.isArray(p)) p = p[p.length - 1];
            if (!p || !p.access_token || !p.user) return null;
            if (p.expires_at && p.expires_at * 1000 < Date.now()) return null;
            return p;
        } catch(e) { return null; }
    }

    function writeSbKey(session) {
        var raw = JSON.stringify(session);
        try { localStorage.setItem(SB_KEY, raw); } catch(e) {}
        try { sessionStorage.setItem(SB_KEY, raw); } catch(e) {}
    }

    // ============================================================
    // 💾 КЭШ ПРОФИЛЯ (localStorage — для мгновенной загрузки)
    // ============================================================
    function readCachedProfile(userId) {
        try {
            var raw = localStorage.getItem(PROFILE_CACHE_KEY);
            if (!raw) return null;
            var c = JSON.parse(raw);
            if (!c || c.userId !== userId) return null;
            if (Date.now() - c.ts > PROFILE_TTL) return null;
            return c.profile;
        } catch(e) { return null; }
    }

    function writeCachedProfile(userId, profile) {
        try {
            localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify({
                userId: userId,
                profile: profile,
                ts: Date.now()
            }));
        } catch(e) {}
    }

    // ============================================================
    // ⏳ Ждём SDK
    // ============================================================
    function waitForSDK(cb, n) {
        n = n || 0;
        if (typeof supabase !== 'undefined' && supabase.createClient) cb();
        else if (n < 50) setTimeout(function() { waitForSDK(cb, n + 1); }, 100);
        else console.error('❌ Supabase SDK не загрузился');
    }

    waitForSDK(function() {
        var storage = getSafeStorage();

        // ============================================================
        // ⚡ Приведение сессии к формату объекта ДО создания клиента
        // ============================================================
        var foundSession = findSession();
        if (foundSession) {
            writeSbKey(foundSession);
            console.log('✅ Сессия найдена и приведена к формату supabase-js');
        }

        // ============================================================
        // Единый клиент
        // autoRefreshToken: true — supabase-js сам рефрешит за 30 сек до истечения
        // ============================================================
        var singleClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: false,
                storage: storage,
                storageKey: SB_KEY,
                flowType: 'implicit'
            }
        });

        // Перехват createClient
        var originalCreateClient = supabase.createClient;
        supabase.createClient = function(url, key, options) {
            if (url === SUPABASE_URL && key === SUPABASE_KEY) {
                if (!window.__marsClientLogged) {
                    window.__marsClientLogged = true;
                    console.log('🔒 createClient перехвачен');
                }
                return singleClient;
            }
            return originalCreateClient.call(this, url, key, options);
        };

        window.supabaseClient = singleClient;
        window.getSupabase = function() { return singleClient; };

        // ============================================================
        // Дедупликация установки сессии
        // ============================================================
        var _setSessionPromise = null;
        var _lastSetSessionToken = null;

        function ensureSessionSet(token) {
            if (!token) return Promise.resolve();
            if (_lastSetSessionToken === token && _setSessionPromise) {
                return _setSessionPromise;
            }
            _lastSetSessionToken = token;
            _setSessionPromise = singleClient.auth.setSession({
                access_token: foundSession.access_token,
                refresh_token: foundSession.refresh_token
            }).then(function(r) {
                if (r && r.error) {
                    console.warn('[supabase] setSession:', r.error.message);
                } else {
                    console.log('✅ Сессия установлена в supabase-js');
                }
                return r;
            }).catch(function(e) {
                console.warn('[supabase] setSession exception:', e.message);
            });
            return _setSessionPromise;
        }

        if (foundSession) {
            ensureSessionSet(foundSession.access_token);
        }

        // ============================================================
        // ГЛАВНОЕ: кэш пользователя и профиля
        // ============================================================
        var currentUser = null;
        var currentProfile = null;
        var profileFetchPromise = null;
        var lastKnownUserId = null;
        var loadedFromCache = false;

        // Загрузка профиля с дедупликацией
        function fetchProfile(userId) {
            // Если уже загружен для этого пользователя — возвращаем
            if (currentProfile && currentUser && currentUser.id === userId) {
                return Promise.resolve(currentProfile);
            }
            // Если в процессе — ждём
            if (profileFetchPromise && lastKnownUserId === userId) {
                return profileFetchPromise;
            }

            lastKnownUserId = userId;
            profileFetchPromise = singleClient
                .from('profiles')
                .select('*')
                .eq('user_id', userId)
                .maybeSingle()
                .then(function(pr) {
                    var profile = pr && pr.data || null;
                    if (profile) {
                        currentProfile = profile;
                        writeCachedProfile(userId, profile);
                    }
                    return profile;
                })
                .catch(function(e) {
                    console.warn('[supabase] profile fetch:', e.message);
                    return null;
                })
                .finally(function() {
                    profileFetchPromise = null;
                });

            return profileFetchPromise;
        }

        // ============================================================
        // marsSession — с дедупликацией событий
        // ============================================================
        window.marsSession = {
            user: null,
            profile: null,
            ready: false,
            listeners: [],

            init: function() {
                if (this._initPromise) return this._initPromise;

                this._initPromise = (async function(self) {
                    try {
                        // ⚡ Мгновенный показ из кэша
                        var r = await singleClient.auth.getSession();
                        var session = r && r.data && r.data.session;
                        var user = session && session.user || null;

                        if (user) {
                            self.user = user;
                            // Мгновенно из кэша
                            var cached = readCachedProfile(user.id);
                            if (cached) {
                                self.profile = cached;
                                loadedFromCache = true;
                            }
                        }

                        // Затем фоновое обновление с сервера
                        if (user) {
                            fetchProfile(user.id).then(function(fresh) {
                                if (fresh && JSON.stringify(fresh) !== JSON.stringify(self.profile)) {
                                    self.profile = fresh;
                                    notifyListeners(self);
                                }
                            });
                        }
                    } catch (e) {
                        console.warn('marsSession init:', e.message);
                    }
                    self.ready = true;
                    notifyListeners(self);
                    return self;
                })(this);

                return this._initPromise;
            },

            onChange: function(fn) {
                if (this.ready) fn(this);
                else this.listeners.push(fn);
            },

            refresh: async function() {
                try {
                    var r = await singleClient.auth.refreshSession();
                    if (r && r.data && r.data.session && r.data.session.user) {
                        this.user = r.data.session.user;
                    }
                } catch (e) {}
                return this.user;
            }
        };

        function notifyListeners(self) {
            self.listeners.forEach(function(fn) {
                try { fn(self); } catch(e) {}
            });
        }

        // ============================================================
        // ОБРАБОТКА AUTH-СОБЫТИЙ — дедупликация
        // ============================================================
        var lastEventKey = null;
        var lastUserId = null;

        singleClient.auth.onAuthStateChange(async function(event, session) {
            var user = session && session.user || null;
            var userId = user && user.id || null;

            // 🔑 Дедупликация: не обрабатываем одно и то же дважды
            var eventKey = event + ':' + (userId || 'null');
            if (eventKey === lastEventKey && event !== 'TOKEN_REFRESHED') {
                return;
            }
            // TOKEN_REFRESHED не должен менять пользователя
            if (event === 'TOKEN_REFRESHED' && userId === lastUserId) {
                return;
            }

            lastEventKey = eventKey;

            // Не логируем INITIAL_SESSION если пользователь тот же
            if (event !== 'INITIAL_SESSION' || userId !== lastUserId) {
                console.log('🔐 Auth event:', event, user && user.email || '');
            }

            // Обновляем пользователя
            window.marsSession.user = user;
            lastUserId = userId;

            if (!user) {
                window.marsSession.profile = null;
                currentUser = null;
                currentProfile = null;
                try { localStorage.removeItem(PROFILE_CACHE_KEY); } catch(e) {}
                notifyListeners(window.marsSession);
                return;
            }

            // Обновляем профиль ТОЛЬКО если пользователь новый или его нет в кэше
            if (currentProfile && currentUser && currentUser.id === user.id) {
                // Уже есть — не дёргаем
                return;
            }

            currentUser = user;

            // Мгновенно из кэша
            var cached = readCachedProfile(user.id);
            if (cached && !window.marsSession.profile) {
                window.marsSession.profile = cached;
                notifyListeners(window.marsSession);
            }

            // Фоновое обновление
            var fresh = await fetchProfile(user.id);
            if (fresh) {
                window.marsSession.profile = fresh;
                notifyListeners(window.marsSession);
            }
        });

        // ============================================================
        // 🛡️ ПРОВЕРКА ТОКЕНА при возврате на вкладку
        // (если вкладка была свёрнута долго — токен мог истечь)
        // ============================================================
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) return;
            // Вкладка снова видима — проверяем токен
            singleClient.auth.getSession().then(function(r) {
                var s = r && r.data && r.data.session;
                if (!s) return;
                var expiresAt = (s.expires_at || 0) * 1000;
                var left = expiresAt - Date.now();
                // Если истекает в ближайшие 10 минут — обновляем
                if (left < REFRESH_THRESHOLD_MS && left > 0) {
                    singleClient.auth.refreshSession().catch(function() {});
                }
                // Если уже истёк — пробуем восстановить
                if (left <= 0) {
                    singleClient.auth.refreshSession().catch(function(e) {
                        console.warn('[supabase] token expired, refresh failed:', e.message);
                    });
                }
            });
        });

        // Проверка каждые 3 минуты — на случай если autoRefreshToken не сработал
        setInterval(function() {
            singleClient.auth.getSession().then(function(r) {
                var s = r && r.data && r.data.session;
                if (!s) return;
                var expiresAt = (s.expires_at || 0) * 1000;
                var left = expiresAt - Date.now();
                if (left < REFRESH_THRESHOLD_MS) {
                    singleClient.auth.refreshSession().catch(function() {});
                }
            }).catch(function() {});
        }, 3 * 60 * 1000);

        // ============================================================
        // 🛡️ Восстановление из cookie, если storage пуст (cross-tab)
        // ============================================================
        window.addEventListener('storage', function(e) {
            if (e.key !== SB_KEY && e.key !== MY_KEY) return;
            if (!e.newValue) return;
            // Другая вкладка обновила сессию — синхронизируем
            singleClient.auth.getSession().catch(function() {});
        });

        // ============================================================
        // 🚀 Старт
        // ============================================================
        window.marsSession.init().then(function() {
            console.log('✅ Единый Supabase клиент готов');
            console.log('💾 Хранилище:', storage === window.localStorage ? 'localStorage' : 'sessionStorage');
            // Уведомляем другие скрипты
            try {
                window.dispatchEvent(new CustomEvent('marsSessionReady', {
                    detail: window.marsSession
                }));
            } catch(e) {}
        });
    });
})();
