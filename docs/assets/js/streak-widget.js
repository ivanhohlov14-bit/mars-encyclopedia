// ============================================================
// streak-widget.js — v2 VIP
// Плашка стрика в шапке
// - Единый клиент (window.supabaseClient)
// - Множественный поиск контейнера (для readthedocs и mobile)
// - Ретраи + дедупликация
// - VIP-анимации (пульс, искры при обновлении)
// - Мобильная адаптация
// ============================================================
(function() {
    'use strict';

    if (window.__streakWidgetLoaded) return;
    window.__streakWidgetLoaded = true;

    var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';
    var WIDGET_ID = 'streak-widget';
    var CACHE_KEY = 'mars-streak-cache';

    var currentStreak = 0;
    var lastLoginDate = null;

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

    // ============================================================
    // 🔧 Утилиты
    // ============================================================
    function todayStr() {
        return new Date().toISOString().slice(0, 10);
    }

    function getDayWord(n) {
        if (n === 1) return 'день';
        if (n >= 2 && n <= 4) return 'дня';
        return 'дней';
    }

    function isMobile() {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
        return window.innerWidth <= 768;
    }

    async function withRetry(fn, retries) {
        retries = retries == null ? 2 : retries;
        var lastErr;
        for (var i = 0; i <= retries; i++) {
            try {
                return await fn();
            } catch(e) {
                lastErr = e;
                if (i < retries) await new Promise(function(r) { setTimeout(r, 500 * (i + 1)); });
            }
        }
        throw lastErr;
    }

    // ============================================================
    // 💾 Кэш
    // ============================================================
    function readCache() {
        try {
            var raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            var c = JSON.parse(raw);
            if (!c || !c.ts) return null;
            // Кэш актуален 12 часов
            if (Date.now() - c.ts > 12 * 60 * 60 * 1000) return null;
            return c;
        } catch(e) { return null; }
    }

    function writeCache(streak, date) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                streak: streak,
                date: date,
                ts: Date.now()
            }));
        } catch(e) {}
    }

    // ============================================================
    // 🎨 Стили
    // ============================================================
    function injectStyles() {
        if (document.getElementById('streak-style')) return;
        var s = document.createElement('style');
        s.id = 'streak-style';
        s.textContent = `
            #streak-widget {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 14px;
                margin-right: 12px;
                border-radius: 22px;
                background: linear-gradient(135deg, #e74c3c 0%, #f39c12 100%);
                color: #fff;
                font-size: 0.85rem;
                font-weight: 800;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
                box-shadow:
                    0 4px 12px rgba(231, 76, 60, 0.35),
                    0 0 0 1px rgba(255, 255, 255, 0.15) inset;
                cursor: pointer;
                text-decoration: none;
                transition: transform 0.25s, box-shadow 0.25s;
                -webkit-tap-highlight-color: transparent;
                position: relative;
                overflow: hidden;
                user-select: none;
                letter-spacing: 0.2px;
                animation: streakPulse 2.5s ease-in-out infinite;
            }
            #streak-widget::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transform: translateX(-100%);
                transition: transform 0.7s;
            }
            #streak-widget:hover {
                transform: translateY(-2px) scale(1.04);
                box-shadow:
                    0 8px 20px rgba(231, 76, 60, 0.5),
                    0 0 0 1px rgba(255, 255, 255, 0.25) inset;
            }
            #streak-widget:hover::before {
                transform: translateX(100%);
            }
            #streak-widget:active {
                transform: translateY(0) scale(1);
            }
            #streak-widget .streak-flame {
                font-size: 1.1rem;
                line-height: 1;
                display: inline-block;
                animation: streakFlame 1.8s ease-in-out infinite;
            }
            #streak-widget .streak-num {
                font-variant-numeric: tabular-nums;
            }
            #streak-widget.inactive {
                background: linear-gradient(135deg, #666 0%, #888 100%);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
                animation: none;
                opacity: 0.8;
            }
            #streak-widget.inactive .streak-flame {
                filter: grayscale(1);
                animation: none;
            }
            #streak-widget.just-updated {
                animation: streakCelebrate 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            @keyframes streakPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes streakFlame {
                0%, 100% { transform: scale(1) rotate(-3deg); }
                50% { transform: scale(1.15) rotate(3deg); }
            }
            @keyframes streakCelebrate {
                0% { transform: scale(1) rotate(0); }
                30% { transform: scale(1.2) rotate(-8deg); }
                60% { transform: scale(1.15) rotate(8deg); }
                100% { transform: scale(1) rotate(0); }
            }

            /* Мобильный */
            @media (max-width: 700px) {
                #streak-widget {
                    font-size: 0.75rem;
                    padding: 4px 10px;
                    margin-right: 6px;
                    gap: 4px;
                    animation: none;
                }
                #streak-widget .streak-flame {
                    font-size: 0.95rem;
                }
            }

            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                #streak-widget,
                #streak-widget .streak-flame {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // 🔍 Поиск контейнера для вставки
    // ============================================================
    function findHeaderContainer() {
        // Приоритет 1: readthedocs мобильная шапка (наш кастомный хедер)
        var custom = document.getElementById('custom-mobile-header');
        if (custom) return custom;

        // Приоритет 2: readthedocs .wy-nav-top
        var navTop = document.querySelector('.wy-nav-top');
        if (navTop) return navTop;

        // Приоритет 3: MkDocs Material
        var mdHeader = document.querySelector('.md-header__inner') || document.querySelector('.md-header');
        if (mdHeader) return mdHeader;

        // Приоритет 4: любой header
        var header = document.querySelector('header');
        if (header) return header;

        return null;
    }

    // ============================================================
    // 🎨 Рендер виджета
    // ============================================================
    function render() {
        if (currentStreak < 1) {
            var existing = document.getElementById(WIDGET_ID);
            if (existing) existing.remove();
            return;
        }

        var container = findHeaderContainer();
        if (!container) return;

        var isToday = lastLoginDate === todayStr();
        var old = document.getElementById(WIDGET_ID);
        if (old) old.remove();

        var widget = document.createElement('a');
        widget.id = WIDGET_ID;
        widget.href = '/stats/';
        widget.className = isToday ? '' : 'inactive';
        widget.title = isToday
            ? 'Стрик активен! Заходи каждый день'
            : 'Зайди сегодня, чтобы не потерять стрик!';

        widget.innerHTML =
            '<span class="streak-flame">🔥</span>' +
            '<span class="streak-num">' + currentStreak + '</span>' +
            '<span class="streak-word">' + getDayWord(currentStreak) + '</span>';

        // Вставляем в начало контейнера (перед auth-кнопкой если она там)
        if (container.id === 'custom-mobile-header') {
            // В кастомном хедере вставляем перед auth-btn-container
            var authBtn = document.getElementById('auth-btn-container');
            if (authBtn && authBtn.parentElement === container) {
                container.insertBefore(widget, authBtn);
            } else {
                container.appendChild(widget);
            }
        } else {
            // В других шапках — в начало
            if (container.firstChild) {
                container.insertBefore(widget, container.firstChild);
            } else {
                container.appendChild(widget);
            }
        }
    }

    // ============================================================
    // 🌐 Загрузка стрика
    // ============================================================
    async function loadStreak() {
        var client = getClient();
        if (!client) return false;

        var sessionRes;
        try {
            sessionRes = await withRetry(function() {
                return client.auth.getSession();
            }, 2);
        } catch(e) {
            return false;
        }

        var session = sessionRes && sessionRes.data && sessionRes.data.session;
        var user = session && session.user;
        if (!user) {
            var existing = document.getElementById(WIDGET_ID);
            if (existing) existing.remove();
            return false;
        }

        var lastLogin;
        try {
            var res = await withRetry(function() {
                return client.from('daily_logins')
                    .select('streak, login_date')
                    .eq('user_id', user.id)
                    .order('login_date', { ascending: false })
                    .limit(1)
                    .maybeSingle();
            }, 2);
            lastLogin = res && res.data;
        } catch(e) {
            console.warn('[streak] fetch:', e.message);
            // Используем кэш
            var cached = readCache();
            if (cached) {
                currentStreak = cached.streak;
                lastLoginDate = cached.date;
                render();
            }
            return false;
        }

        if (!lastLogin) {
            var ex = document.getElementById(WIDGET_ID);
            if (ex) ex.remove();
            return false;
        }

        var oldStreak = currentStreak;
        currentStreak = lastLogin.streak || 0;
        lastLoginDate = lastLogin.login_date;

        writeCache(currentStreak, lastLoginDate);
        render();

        // Анимация если стрик обновился
        if (oldStreak > 0 && currentStreak > oldStreak) {
            var w = document.getElementById(WIDGET_ID);
            if (w) {
                w.classList.add('just-updated');
                setTimeout(function() {
                    w.classList.remove('just-updated');
                }, 1000);
            }
        }

        return true;
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    async function init() {
        injectStyles();

        // Мгновенно из кэша (чтобы не было мигания)
        var cached = readCache();
        if (cached) {
            currentStreak = cached.streak;
            lastLoginDate = cached.date;
            render();
        }

        // Потом с сервера
        await loadStreak();

        // Если шапка не найдена — пробуем ещё раз позже
        if (!document.getElementById(WIDGET_ID)) {
            setTimeout(function() {
                if (findHeaderContainer()) render();
            }, 1500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(init, 300);
        });
    } else {
        setTimeout(init, 300);
    }

    // Реагируем на изменения сессии
    window.addEventListener('storage', function(e) {
        if (e.key === 'mars-streak-cache' || e.key === SB_KEY) {
            setTimeout(loadStreak, 300);
        }
    });

    // Периодически проверяем (на случай смены дня)
    setInterval(function() {
        var cached = readCache();
        if (cached && cached.date !== todayStr()) {
            // День сменился — обновляем
            loadStreak();
        }
    }, 5 * 60 * 1000);

    console.log('✅ streak-widget.js v2 VIP загружен');
})();
