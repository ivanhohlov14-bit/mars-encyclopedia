/**
 * ═══════════════════════════════════════════════════════════
 *   track-visit.js v3 — Production
 *   Записывает посещения статей
 *
 *   Оптимизация против ERR_INSUFFICIENT_RESOURCES:
 *   - Single-flight flush (не запускается если уже идёт)
 *   - Cooldown 30 сек между flush
 *   - Проверка navigator.onLine
 *   - Пауза при document.hidden
 *   - waitForUser без polling (использует событие + 1 fetch)
 *   - 1 retry вместо 3
 *   - Dispatch события marsXpGained для анимаций
 *   - Dispatch события marsVisitRecorded
 * ═══════════════════════════════════════════════════════════
 */
(function() {
'use strict';

if (window.__trackVisitLoaded) return;
window.__trackVisitLoaded = true;

var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var SB_KEY = 'sb-ncytbgbzfjfoqmmgfygz-auth-token';

var PENDING_KEY = 'mars-pending-visits';
var VISITED_PREFIX = 'visited_';
var FLUSH_COOLDOWN = 30 * 1000;
var MAX_RETRIES = 1;

var XP_FOR_VISIT = 5;

var state = {
  flushing: false,
  lastFlushTs: 0,
  pendingFlush: null,
  cachedUser: null
};

/* ═══ MAPS ═══ */
var PLACE_TYPES = {
  'acidalia-sea':'sea','argida':'sea','hellas-sea':'sea','zephyria-sea':'sea','eritrea-sea':'sea','amazon-sea':'sea',
  'okhasen':'city','rogen-aria':'city','akkha-kor':'city','noviy-okhasen':'city',
  'ksanf-temple':'temple','podzemniy-khram':'temple','farsida-caves':'cave',
  'hevsur':'character','talin':'character','ella':'character','irayina':'character','yarra':'character','alira':'character','miran':'character','aratan-iii':'character','kharan':'character','sarum-ii':'character','sarum-velikiy':'character','soviya':'character','arash':'character','kan':'character',
  'periodization':'history','timeline':'history','myths':'myth','epokha-osnovaniya':'history','epokha-rascveta':'history','epokha-umiraniya':'history','iskhod':'history',
  'valles-marineris':'geography','olympus-mons':'geography','tarsis':'geography','farsida':'geography','water-on-mars':'geography',
  'kho':'religion','akha':'religion','araksis':'religion','prorochestvo-kharana':'religion','ksanf-monster':'myth',
  'phobos':'astronomy','deimos':'astronomy','phobos-deimos':'astronomy','mars-sky':'astronomy','marsian-calendar':'astronomy','mars':'astronomy','earth-as-target':'astronomy','earth':'astronomy',
  'lan-sur':'term','tablichki':'term','gemotsianin':'biology','silicon-life':'biology','carbon-vita':'biology'
};

var SECTION_TYPES = {
  'geography':'geography','history':'history','people':'character','culture':'culture','astronomy':'astronomy','mythology':'religion','religion':'religion','technology':'tech','biology':'biology','science':'science','books':'book','music':'music','terms':'term','interactive':'interactive','lists':'list'
};

var EXCLUDED_PATHS = [
  '/','/index/','/profile/','/login/','/register/','/stats/','/game/','/profile-view/','/moderator/','/license/','/support/','/start-here/','/globe-map/','/interactive/exodus/','/music/constructor/','/interactive/','/translator/','/bookmarks/','/top/','/quest-map/','/achievements/','/feed/','/guilds/','/quests/','/horoscope/','/scrolls/','/forum/','/link-device/','/en/','/en/index/'
];

/* ═══ UTILS ═══ */
function todayStr() { return new Date().toISOString().slice(0, 10); }
function isOnline() { return navigator.onLine !== false; }
function isExcluded() { return EXCLUDED_PATHS.indexOf(window.location.pathname) !== -1; }

function getPlaceInfo() {
  var path = window.location.pathname;
  var parts = path.replace(/^\/|\/$/g, '').split('/');
  var last = parts[parts.length - 1] || 'home';
  var parent = parts[parts.length - 2] || '';
  var meta = document.querySelector('meta[name="place-type"]');
  if (meta && meta.content) return { place_id: last, place_type: meta.content };
  if (PLACE_TYPES[last]) return { place_id: last, place_type: PLACE_TYPES[last] };
  if (SECTION_TYPES[parent]) return { place_id: last, place_type: SECTION_TYPES[parent] };
  return { place_id: last, place_type: 'other' };
}

/* ═══ CLIENT ═══ */
var client = null;
function getClient() {
  if (client && client.auth) return client;
  if (window.supabaseClient && window.supabaseClient.auth) { client = window.supabaseClient; return client; }
  if (window.getSupabase) { try { var c = window.getSupabase(); if (c && c.auth) { client = c; return client; } } catch(e){} }
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

/* ═══ RETRY ═══ */
async function withRetry(fn) {
  var lastErr;
  for (var i = 0; i <= MAX_RETRIES; i++) {
    try { return await fn(); }
    catch(e) {
      lastErr = e;
      if (i < MAX_RETRIES) await new Promise(function(r){ setTimeout(r, 2000); });
    }
  }
  throw lastErr;
}

/* ═══ WAIT USER ═══ */
function waitForUser(maxMs) {
  maxMs = maxMs || 4000;
  return new Promise(function(resolve) {
    // Уже есть в памяти
    if (state.cachedUser) { resolve(state.cachedUser); return; }
    if (window.marsSession && window.marsSession.user) {
      state.cachedUser = window.marsSession.user;
      resolve(state.cachedUser);
      return;
    }
    // Слушаем событие (быстрее polling)
    var done = false;
    function onSession(e) {
      if (done) return;
      if (e.detail && e.detail.user) {
        done = true;
        state.cachedUser = e.detail.user;
        window.removeEventListener('marsSessionReady', onSession);
        resolve(state.cachedUser);
      }
    }
    window.addEventListener('marsSessionReady', onSession);

    // Fallback — единственный getSession через 500мс если событие не пришло
    setTimeout(async function(){
      if (done) return;
      done = true;
      window.removeEventListener('marsSessionReady', onSession);
      var sb = getClient();
      if (!sb) { resolve(null); return; }
      try {
        var r = await sb.auth.getSession();
        var u = r && r.data && r.data.session && r.data.session.user;
        state.cachedUser = u || null;
        resolve(u || null);
      } catch(e) { resolve(null); }
    }, 500);

    // Абсолютный таймаут
    setTimeout(function(){ if (!done){ done = true; resolve(null); } }, maxMs);
  });
}

/* ═══ PENDING QUEUE ═══ */
function readPending() {
  try {
    var raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return [];
    var a = JSON.parse(raw);
    return Array.isArray(a) ? a : [];
  } catch(e){ return []; }
}
function writePending(arr) {
  try { localStorage.setItem(PENDING_KEY, JSON.stringify(arr.slice(-50))); } catch(e){}
}
function queueVisit(v) {
  var p = readPending();
  var key = v.user_id + '|' + v.place_id + '|' + v.visited_at.slice(0,10);
  var exists = p.some(function(x){
    return (x.user_id + '|' + x.place_id + '|' + x.visited_at.slice(0,10)) === key;
  });
  if (exists) return;
  p.push(v);
  writePending(p);
}

/* ═══ FLUSH (single-flight + cooldown) ═══ */
function flushPending(force) {
  if (!force && Date.now() - state.lastFlushTs < FLUSH_COOLDOWN) {
    return Promise.resolve();
  }
  if (state.flushing) return state.pendingFlush || Promise.resolve();
  if (!isOnline()) return Promise.resolve();
  var pending = readPending();
  if (!pending.length) { state.lastFlushTs = Date.now(); return Promise.resolve(); }

  state.flushing = true;
  state.pendingFlush = (async function(){
    var sb = getClient();
    if (!sb) { state.flushing = false; return; }
    var remaining = [];
    for (var i = 0; i < pending.length; i++) {
      try {
        var res = await sb.from('user_visits').insert(pending[i]);
        if (res && res.error) {
          if (res.error.code === '23505') continue;
          remaining.push(pending[i]);
        }
      } catch(e){ remaining.push(pending[i]); }
    }
    writePending(remaining);
    state.lastFlushTs = Date.now();
    state.flushing = false;
  })();
  return state.pendingFlush;
}

/* ═══ NOTIFY XP ═══ */
function notifyXP(amount, source, placeId) {
  try {
    window.dispatchEvent(new CustomEvent('marsXpGained', {
      detail: { amount: amount, source: source, place_id: placeId, ts: Date.now() }
    }));
  } catch(e){}
}

/* ═══ RECORD ═══ */
async function recordVisit() {
  if (isExcluded()) return;
  if (!isOnline()) return;

  var sb = getClient();
  if (!sb) return;

  var user = await waitForUser(4000);
  if (!user) return;

  var info = getPlaceInfo();
  var today = todayStr();
  var storageKey = VISITED_PREFIX + info.place_id + '_' + today;
  if (localStorage.getItem(storageKey)) return;

  localStorage.setItem(storageKey, '1');

  var visit = {
    user_id: user.id,
    place_id: info.place_id,
    place_type: info.place_type,
    visited_at: new Date().toISOString()
  };

  try {
    var res = await withRetry(function(){ return sb.from('user_visits').insert(visit); });
    if (res && res.error) {
      if (res.error.code === '23505') return;
      throw res.error;
    }
    // Событие о посещении
    try { window.dispatchEvent(new CustomEvent('marsVisitRecorded', {detail: visit})); } catch(e){}
    // Событие о +5 XP для анимации
    notifyXP(XP_FOR_VISIT, 'read_article', info.place_id);
  } catch(e) {
    queueVisit(visit);
    setTimeout(function(){ flushPending(true); }, 5000);
  }
}

/* ═══ EVENTS ═══ */
window.addEventListener('online', function(){ setTimeout(function(){ flushPending(true); }, 1000); });
document.addEventListener('visibilitychange', function(){
  if (!document.hidden) flushPending(false);
});

/* Очистка при уходе */
window.addEventListener('pagehide', function(){
  // ничего не делаем — фоновой работы нет
});

/* ═══ START ═══ */
function start() {
  // 800мс — чтобы всё загрузилось
  setTimeout(recordVisit, 800);
  // Один flush при старте (если была очередь)
  setTimeout(function(){ flushPending(false); }, 3000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();

/* ═══ API ═══ */
window.trackVisit = {
  record: recordVisit,
  flush: function(){ return flushPending(true); },
  getPendingCount: function(){ return readPending().length; }
};

console.log('✅ track-visit.js v3 Production загружен');
})();
