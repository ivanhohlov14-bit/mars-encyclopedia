/**
 * ═══════════════════════════════════════════════════════════
 *   streak-widget.js v3 — Production
 *   Стрик-плашка в шапке
 *
 *   Оптимизация против ERR_INSUFFICIENT_RESOURCES:
 *   - Single-flight (один запрос за раз, все вызовы получают тот же promise)
 *   - Cooldown 30с (антиспам даже если кто-то вызывает в цикле)
 *   - Debounce storage events 1с
 *   - Пауза когда вкладка скрыта (document.hidden)
 *   - Cache-first: показываем из кэша, не дёргаем сервер <10 мин
 *   - Лёгкий запрос (single() через user_id)
 *   - 1 retry вместо 3
 *   - Проверка онлайн (navigator.onLine)
 *   - Reuse session user_id в памяти
 * ═══════════════════════════════════════════════════════════
 */
(function() {
'use strict';

if (window.__streakWidgetLoaded) return;
window.__streakWidgetLoaded = true;

var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';
var WIDGET_ID = 'streak-widget';
var CACHE_KEY = 'mars-streak-cache-v3';

/* ═══ ТАЙМИНГИ ═══ */
var CACHE_TTL = 6 * 60 * 60 * 1000;        // 6 часов — сколько живёт кэш
var MIN_FETCH_GAP = 30 * 1000;             // 30 сек — минимум между запросами
var STORAGE_DEBOUNCE = 1000;               // 1 сек — debounce для storage events
var PING_INTERVAL = 5 * 60 * 1000;         // 5 мин — периодическая проверка смены дня
var MAX_RETRIES = 1;                       // 1 retry вместо 3
var RETRY_DELAY = 2000;                    // 2 сек между retry

/* ═══ СОСТОЯНИЕ ═══ */
var state = {
  streak: 0,
  lastLoginDate: null,
  loadingPromise: null,        // single-flight
  lastFetchTs: 0,              // cooldown
  cachedUserId: null,          // reuse сессии
  storageTimer: null,
  pingTimer: null,
  isOffline: false
};

/* ═══════════════════════════════════════════════════════════
   КЛИЕНТ SUPABASE
   ═══════════════════════════════════════════════════════════ */
var client = null;
function getClient() {
  if (client && client.auth) return client;
  if (window.supabaseClient && window.supabaseClient.auth) {
    client = window.supabaseClient;
    return client;
  }
  if (window.getSupabase) {
    try { var c = window.getSupabase(); if (c && c.auth) { client = c; return client; } } catch(e){}
  }
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { storageKey: SB_KEY, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
      });
      return client;
    } catch(e){}
  }
  return null;
}

/* ═══════════════════════════════════════════════════════════
   УТИЛИТЫ
   ═══════════════════════════════════════════════════════════ */
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function getDayWord(n) {
  if (n === 1) return 'день';
  if (n >= 2 && n <= 4) return 'дня';
  return 'дней';
}
function isOnline() {
  return navigator.onLine !== false;
}

/* ═══════════════════════════════════════════════════════════
   КЭШ
   ═══════════════════════════════════════════════════════════ */
function readCache() {
  try {
    var raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    var c = JSON.parse(raw);
    if (!c || !c.ts) return null;
    if (Date.now() - c.ts > CACHE_TTL) return null;
    return c;
  } catch(e){ return null; }
}
function writeCache(streak, date, userId) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      streak: streak, date: date, userId: userId, ts: Date.now()
    }));
  } catch(e){}
}
function isCacheFresh(maxAge) {
  try {
    var raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    var c = JSON.parse(raw);
    return c && c.ts && (Date.now() - c.ts < (maxAge || MIN_FETCH_GAP));
  } catch(e){ return false; }
}

/* ═══════════════════════════════════════════════════════════
   СТИЛИ
   ═══════════════════════════════════════════════════════════ */
function injectStyles() {
  if (document.getElementById('streak-style')) return;
  var s = document.createElement('style');
  s.id = 'streak-style';
  s.textContent = `
    #streak-widget {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px; margin-right: 12px;
      border-radius: 22px;
      background: linear-gradient(135deg, #e74c3c 0%, #f39c12 100%);
      color: #fff; font-size: 0.85rem; font-weight: 800;
      font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 4px 12px rgba(231,76,60,.35), 0 0 0 1px rgba(255,255,255,.15) inset;
      cursor: pointer; text-decoration: none;
      transition: transform .25s, box-shadow .25s;
      -webkit-tap-highlight-color: transparent;
      position: relative; overflow: hidden; user-select: none;
      letter-spacing: .2px;
      animation: streakPulse 2.5s ease-in-out infinite;
    }
    #streak-widget::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,.3), transparent);
      transform: translateX(-100%); transition: transform .7s;
    }
    #streak-widget:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 8px 20px rgba(231,76,60,.5), 0 0 0 1px rgba(255,255,255,.25) inset; }
    #streak-widget:hover::before { transform: translateX(100%); }
    #streak-widget:active { transform: translateY(0) scale(1); }
    #streak-widget .streak-flame { font-size: 1.1rem; line-height: 1; display: inline-block; animation: streakFlame 1.8s ease-in-out infinite; }
    #streak-widget .streak-num { font-variant-numeric: tabular-nums; }
    #streak-widget.inactive { background: linear-gradient(135deg, #666 0%, #888 100%); box-shadow: 0 4px 12px rgba(0,0,0,.25); animation: none; opacity: .8; }
    #streak-widget.inactive .streak-flame { filter: grayscale(1); animation: none; }
    #streak-widget.just-updated { animation: streakCelebrate .8s cubic-bezier(.34,1.56,.64,1); }

    @keyframes streakPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
    @keyframes streakFlame { 0%,100%{transform:scale(1) rotate(-3deg)} 50%{transform:scale(1.15) rotate(3deg)} }
    @keyframes streakCelebrate {
      0%{transform:scale(1) rotate(0)} 30%{transform:scale(1.2) rotate(-8deg)}
      60%{transform:scale(1.15) rotate(8deg)} 100%{transform:scale(1) rotate(0)}
    }
    @media (max-width: 700px) {
      #streak-widget { font-size: .75rem; padding: 4px 10px; margin-right: 6px; gap: 4px; animation: none; }
      #streak-widget .streak-flame { font-size: .95rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      #streak-widget, #streak-widget .streak-flame { animation: none !important; }
    }
  `;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════════
   ПОИСК КОНТЕЙНЕРА
   ═══════════════════════════════════════════════════════════ */
function findHeaderContainer() {
  var custom = document.getElementById('custom-mobile-header');
  if (custom) return custom;
  var navTop = document.querySelector('.wy-nav-top');
  if (navTop) return navTop;
  var mdHeader = document.querySelector('.md-header__inner') || document.querySelector('.md-header');
  if (mdHeader) return mdHeader;
  var header = document.querySelector('header');
  if (header) return header;
  return null;
}

/* ═══════════════════════════════════════════════════════════
   РЕНДЕР
   ═══════════════════════════════════════════════════════════ */
function render() {
  if (state.streak < 1) {
    var old = document.getElementById(WIDGET_ID);
    if (old) old.remove();
    return;
  }
  var container = findHeaderContainer();
  if (!container) return;

  var isToday = state.lastLoginDate === todayStr();
  var existing = document.getElementById(WIDGET_ID);

  // Обновляем существующий вместо пересоздания (меньше reflow)
  if (existing && existing.parentElement === container) {
    existing.className = isToday ? '' : 'inactive';
    existing.title = isToday ? 'Стрик активен! Заходи каждый день' : 'Зайди сегодня, чтобы не потерять стрик!';
    var numEl = existing.querySelector('.streak-num');
    var wordEl = existing.querySelector('.streak-word');
    if (numEl) numEl.textContent = state.streak;
    if (wordEl) wordEl.textContent = getDayWord(state.streak);
    return;
  }

  if (existing) existing.remove();

  var widget = document.createElement('a');
  widget.id = WIDGET_ID;
  widget.href = '/stats/';
  widget.className = isToday ? '' : 'inactive';
  widget.title = isToday ? 'Стрик активен! Заходи каждый день' : 'Зайди сегодня, чтобы не потерять стрик!';
  widget.innerHTML = '<span class="streak-flame">🔥</span>' +
    '<span class="streak-num">' + state.streak + '</span>' +
    '<span class="streak-word">' + getDayWord(state.streak) + '</span>';

  if (container.id === 'custom-mobile-header') {
    var authBtn = document.getElementById('auth-btn-container');
    if (authBtn && authBtn.parentElement === container) {
      container.insertBefore(widget, authBtn);
    } else {
      container.appendChild(widget);
    }
  } else {
    if (container.firstChild) container.insertBefore(widget, container.firstChild);
    else container.appendChild(widget);
  }
}

/* ═══════════════════════════════════════════════════════════
   ЗАГРУЗКА СТРИКА (single-flight)
   ═══════════════════════════════════════════════════════════ */
async function fetchStreak() {
  if (!isOnline()) {
    var cached = readCache();
    if (cached) {
      state.streak = cached.streak;
      state.lastLoginDate = cached.date;
      render();
    }
    return false;
  }

  var sb = getClient();
  if (!sb) return false;

  // Получаем юзера (кэшируем в памяти)
  var userId = state.cachedUserId;
  if (!userId) {
    try {
      var sessRes = await sb.auth.getSession();
      var sess = sessRes && sessRes.data && sessRes.data.session;
      if (!sess || !sess.user) {
        var ex = document.getElementById(WIDGET_ID);
        if (ex) ex.remove();
        return false;
      }
      userId = sess.user.id;
      state.cachedUserId = userId;
    } catch(e) {
      return false;
    }
  }

  // Запрос — БЕЗ order, БЕЗ limit, БЕЗ maybeSingle (проще = легче)
  var data = null;
  var attempts = 0;
  while (attempts <= MAX_RETRIES) {
    try {
      var res = await sb.from('daily_logins')
        .select('streak,login_date')
        .eq('user_id', userId)
        .order('login_date', { ascending: false })
        .limit(1);
      if (res && res.data && res.data.length) {
        data = res.data[0];
      }
      break;
    } catch(e) {
      attempts++;
      if (attempts > MAX_RETRIES) {
        console.warn('[streak] fetch failed:', e.message);
        // Фолбэк на кэш
        var cached2 = readCache();
        if (cached2) {
          state.streak = cached2.streak;
          state.lastLoginDate = cached2.date;
          render();
        }
        return false;
      }
      await new Promise(function(r){ setTimeout(r, RETRY_DELAY); });
    }
  }

  if (!data) {
    var ex = document.getElementById(WIDGET_ID);
    if (ex) ex.remove();
    return false;
  }

  var oldStreak = state.streak;
  state.streak = data.streak || 0;
  state.lastLoginDate = data.login_date;
  state.lastFetchTs = Date.now();

  writeCache(state.streak, state.lastLoginDate, userId);
  render();

  if (oldStreak > 0 && state.streak > oldStreak) {
    var w = document.getElementById(WIDGET_ID);
    if (w) {
      w.classList.add('just-updated');
      setTimeout(function(){ w.classList.remove('just-updated'); }, 1000);
    }
  }
  return true;
}

/**
 * Single-flight: если уже грузится — возвращает тот же promise
 * Дополнительно cooldown 30 сек
 */
function loadStreak(force) {
  // Cooldown — не чаще MIN_FETCH_GAP, кроме force
  if (!force && Date.now() - state.lastFetchTs < MIN_FETCH_GAP) {
    return Promise.resolve(false);
  }
  // Single-flight — уже грузится
  if (state.loadingPromise) return state.loadingPromise;

  state.loadingPromise = fetchStreak().finally(function(){
    state.loadingPromise = null;
    state.lastFetchTs = Date.now();
  });
  return state.loadingPromise;
}

/* ═══════════════════════════════════════════════════════════
   СТАРТ
   ═══════════════════════════════════════════════════════════ */
async function init() {
  injectStyles();

  // Мгновенно из кэша
  var cached = readCache();
  if (cached) {
    state.streak = cached.streak;
    state.lastLoginDate = cached.date;
    state.cachedUserId = cached.userId || null;
    render();
  }

  // С сервера — но только если кэш старше 10 мин
  if (!isCacheFresh(10 * 60 * 1000)) {
    await loadStreak(true);
  }

  // Если шапка появилась позже — 1 попытка повторного рендера
  if (!document.getElementById(WIDGET_ID) && (state.streak > 0)) {
    setTimeout(function(){ if (findHeaderContainer()) render(); }, 1500);
  }
}

/* ═══════════════════════════════════════════════════════════
   ОБРАБОТЧИКИ СОБЫТИЙ
   ═══════════════════════════════════════════════════════════ */

/* Storage events — debounce 1 сек */
window.addEventListener('storage', function(e) {
  if (e.key !== SB_KEY && e.key !== CACHE_KEY) return;
  if (state.storageTimer) clearTimeout(state.storageTimer);
  state.storageTimer = setTimeout(function() {
    state.cachedUserId = null;      // сброс сессии — мог поменяться юзер
    state.lastFetchTs = 0;          // разрешить fetch
    loadStreak(true);
  }, STORAGE_DEBOUNCE);
});

/* Online/offline */
window.addEventListener('online', function(){ state.isOffline = false; loadStreak(true); });
window.addEventListener('offline', function(){ state.isOffline = true; });

/* Смена видимости — при возврате на вкладку проверить смену дня */
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    // Проверка смены дня при возврате
    if (state.lastLoginDate && state.lastLoginDate !== todayStr()) {
      loadStreak(true);
    }
  }
});

/* Периодическая проверка (только когда вкладка видна) */
state.pingTimer = setInterval(function() {
  if (document.hidden) return;
  if (!isOnline()) return;
  if (state.lastLoginDate && state.lastLoginDate !== todayStr()) {
    state.lastFetchTs = 0;
    loadStreak(true);
  }
}, PING_INTERVAL);

/* Очистка при уходе */
window.addEventListener('pagehide', function() {
  if (state.pingTimer) clearInterval(state.pingTimer);
  if (state.storageTimer) clearTimeout(state.storageTimer);
});

/* ═══════════════════════════════════════════════════════════
   ЗАПУСК
   ═══════════════════════════════════════════════════════════ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(init, 300); });
} else {
  setTimeout(init, 300);
}

console.log('✅ streak-widget.js v3 Production загружен');
})();
