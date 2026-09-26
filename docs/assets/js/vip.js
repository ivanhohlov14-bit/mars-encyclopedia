/**
 * ═══════════════════════════════════════════════════════════
 *   VIP MODULE v6.0 — Production
 *   Бейджи, кастомный ник, рамки аватара, титулы
 *   Работает на всех страницах: профиль, форум, гильдии, комментарии
 * ═══════════════════════════════════════════════════════════
 */
(function(){
'use strict';

/* ═══ ЗАЩИТА ОТ ДВОЙНОЙ ЗАГРУЗКИ ═══ */
if (window.__vipLoaded) return;
window.__vipLoaded = true;

/* ═══ КОНСТАНТЫ ═══ */
var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';

var CACHE_TTL = 5 * 60 * 1000;      // 5 минут
var SCAN_DEBOUNCE = 400;            // мс
var RESCAN_INTERVAL = 2000;         // мс (fallback)

/* ═══ СЕЛЕКТОРЫ (упорядочены от точного к общему) ═══ */
var NICK_SELECTORS = [
  '.frm-post-author',
  '.frm-topic-author',
  '.frm-author-link',
  '.gld-chat-msg-author',
  '.gld-post-author',
  '.comment-author'
].join(',');

var AVATAR_SELECTORS = [
  '.frm-post-avatar',
  '.frm-topic-avatar',
  '.gld-chat-msg-avatar',
  '.gld-post-avatar',
  '.comment-avatar'
].join(',');

/* ═══ РАМКИ АВАТАРА ═══ */
var FRAMES = Object.freeze({
  none:      { css: '', animated: false },
  gold:      { css: 'linear-gradient(135deg,#f5d76e,#f39c12,#e67e22,#f5d76e)', animated: false },
  silver:    { css: 'linear-gradient(135deg,#ecf0f1,#95a5a6,#7f8c8d,#ecf0f1)', animated: false },
  fire:      { css: 'linear-gradient(135deg,#e74c3c,#f39c12,#e74c3c)', animated: false },
  ice:       { css: 'linear-gradient(135deg,#5dade2,#85c1e9,#3498db,#5dade2)', animated: false },
  emerald:   { css: 'linear-gradient(135deg,#27ae60,#16a085,#2ecc71)', animated: false },
  royal:     { css: 'linear-gradient(135deg,#9b59b6,#8e44ad,#d1a4e8)', animated: false },
  cherry:    { css: 'linear-gradient(135deg,#e91e63,#c2185b,#ff6090)', animated: false },
  cyber:     { css: 'linear-gradient(135deg,#00bcd4,#00e5ff,#00838f)', animated: false },
  sunset:    { css: 'linear-gradient(135deg,#ff6b6b,#feca57,#f39c12)', animated: false },
  ocean:     { css: 'linear-gradient(135deg,#0f3460,#16537e,#4a90e2)', animated: false },
  legendary: { css: 'conic-gradient(from 0deg,#f5d76e,#e74c3c,#9b59b6,#3498db,#27ae60,#f5d76e)', animated: true },
  rainbow:   { css: 'conic-gradient(from 0deg,#e74c3c,#f39c12,#f5d76e,#27ae60,#3498db,#9b59b6,#e74c3c)', animated: true }
});

/* ═══ SUPABASE CLIENT ═══ */
var sb = null;
try {
  if (window.supabaseClient) {
    sb = window.supabaseClient;
  } else if (window.supabase && window.supabase.createClient) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) {
  console.warn('[VIP] Supabase init failed:', e);
}

/* ═══ КЭШ ═══ */
var vipCache = {};
var pendingLoads = {};

/* ═══ УТИЛИТЫ ═══ */
function safeGet(obj, path, def) {
  try {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== 'object') return def;
      cur = cur[parts[i]];
    }
    return cur === undefined ? def : cur;
  } catch (e) { return def; }
}

function isValidUserId(uid) {
  return typeof uid === 'string' && uid.length > 10 && uid !== 'undefined' && uid !== 'null';
}

/* ═══ СТИЛИ ═══ */
var STYLE_ID = 'vip-module-styles';
if (!document.getElementById(STYLE_ID)) {
  var styleEl = document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.textContent = `
/* ─── VIP БЕЙДЖ ─── */
.vip-badge{
  display:inline-flex;align-items:center;justify-content:center;
  margin-left:5px;padding:2px 7px;border-radius:7px;
  background:linear-gradient(135deg,#f5d76e,#f39c12);
  font-size:.7em;line-height:1;vertical-align:middle;
  box-shadow:0 2px 8px rgba(243,156,18,.5);
  animation:vipBadgePulse 2.5s ease-in-out infinite;
  font-weight:900;cursor:help;color:#fff;
  position:relative;z-index:20;
  isolation:isolate;
}
@keyframes vipBadgePulse{
  0%,100%{filter:brightness(1)}
  50%{filter:brightness(1.2);box-shadow:0 2px 16px rgba(243,156,18,1)}
}

/* ─── ПЕРЕЛИВАЮЩИЙСЯ НИК ─── */
.vip-name{
  font-weight:900!important;
  background-size:200% auto!important;
  -webkit-background-clip:text!important;
  background-clip:text!important;
  -webkit-text-fill-color:transparent!important;
  animation:vipShimmer 8s linear infinite!important;
  position:relative;z-index:10;
}
@keyframes vipShimmer{
  0%{background-position:-200% center}
  100%{background-position:200% center}
}

/* ─── ТИТУЛ ─── */
.vip-title-tag{
  display:inline-block;margin-left:6px;padding:2px 9px;border-radius:11px;
  background:linear-gradient(135deg,rgba(243,156,18,.22),rgba(245,215,110,.1));
  border:1px solid rgba(243,156,18,.45);
  font-size:.62em;font-weight:900;color:#ffdf5e;
  letter-spacing:.4px;vertical-align:middle;text-transform:uppercase;
  position:relative;z-index:20;
  text-shadow:0 1px 3px rgba(0,0,0,.4);
  white-space:nowrap;
}

/* ─── РАМКА АВАТАРА ─── */
/* ВАЖНО: размеры НЕ задаём — img сохраняет свой размер, обёртка подстраивается */
.vip-avatar-frame{
  position:relative;
  display:inline-block;
  padding:3px;
  border-radius:50%;
  background-size:200% 200%;
  animation:vipFrameSpin 8s linear infinite;
  line-height:0;
  z-index:1;
  flex-shrink:0;
}
.vip-avatar-frame.animated{animation:vipFrameSpin 4s linear infinite}
@keyframes vipFrameSpin{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
.vip-avatar-frame::before{
  content:'';position:absolute;inset:0;border-radius:50%;
  background:inherit;filter:blur(8px);opacity:.5;z-index:-1;
}
/* Только декоративная обводка, БЕЗ width/height */
.vip-avatar-frame > img{
  border:3px solid #14142a!important;
  border-radius:50%!important;
  display:block!important;
}

/* ─── ВИДЖЕТЫ, КОТОРЫЕ НЕЛЬЗЯ ТРОГАТЬ ─── */
[data-vip-skip],
[data-vip-skip] *{pointer-events:auto!important}
  `;
  document.head.appendChild(styleEl);
}

/* ═══ ЗАГРУЗКА VIP-СТАТУСА ═══ */
async function loadVIP(ids) {
  if (!sb || !ids.length) return;

  // Фильтр: только новые и не в процессе загрузки
  var toLoad = ids.filter(function(id) {
    return !vipCache[id] && !pendingLoads[id];
  });

  if (!toLoad.length) return;

  // Помечаем как "в процессе"
  toLoad.forEach(function(id) { pendingLoads[id] = true; });

  try {
    var r = await sb.from('profiles')
      .select('user_id, vip_until, nick_color, vip_badge, avatar_frame, custom_title')
      .in('user_id', toLoad);

    // Обработка результата
    (r && r.data || []).forEach(function(p) {
      var until = p.vip_until ? new Date(p.vip_until) : null;
      var active = until && until.getTime() > Date.now();

      vipCache[p.user_id] = {
        active: !!active,
        color: active ? (p.nick_color || '#6C63FF') : null,
        badge: active ? (p.vip_badge || '👑') : null,
        frame: active ? (p.avatar_frame || 'none') : null,
        title: active ? p.custom_title : null,
        until: until
      };
    });

    // Если кого-то нет в ответе — помечаем как "не VIP"
    toLoad.forEach(function(id) {
      if (!vipCache[id]) {
        vipCache[id] = { active: false };
      }
    });
  } catch (e) {
    console.warn('[VIP] Load failed:', e);
    // Кэшируем "не VIP" чтобы не долбить сервер
    toLoad.forEach(function(id) {
      if (!vipCache[id]) vipCache[id] = { active: false };
    });
  } finally {
    // Снимаем блокировку
    toLoad.forEach(function(id) { delete pendingLoads[id]; });
  }
}

/* ═══ ПРИМЕНИТЬ К НИКУ ═══ */
function applyNick(el, uid) {
  if (!el || !uid) return;
  if (el.dataset.vipNick === '1') return;

  var v = vipCache[uid];
  if (!v || !v.active) return;

  el.dataset.vipNick = '1';

  // Переливающийся градиент
  var color = v.color || '#6C63FF';
  el.classList.add('vip-name');
  el.style.background = 'linear-gradient(90deg,' +
    color + ' 0%,#f5d76e 25%,' + color + ' 50%,#f5d76e 75%,' + color + ' 100%)';
  el.style.backgroundSize = '200% auto';

  // Бейдж
  var nextEl = el.nextElementSibling;
  if (!nextEl || !nextEl.classList.contains('vip-badge')) {
    var badge = document.createElement('span');
    badge.className = 'vip-badge';
    badge.textContent = v.badge || '👑';
    badge.title = 'VIP до ' + (v.until ? v.until.toLocaleDateString('ru-RU') : '');
    el.insertAdjacentElement('afterend', badge);
  }

  // Титул
  if (v.title) {
    var afterBadge = el.nextElementSibling;
    var insertAfter = (afterBadge && afterBadge.classList.contains('vip-badge'))
      ? afterBadge : el;

    var nextAfter = insertAfter.nextElementSibling;
    if (!nextAfter || !nextAfter.classList.contains('vip-title-tag')) {
      var titleEl = document.createElement('span');
      titleEl.className = 'vip-title-tag';
      titleEl.textContent = v.title;
      insertAfter.insertAdjacentElement('afterend', titleEl);
    }
  }
}

/* ═══ ПРИМЕНИТЬ К АВАТАРУ ═══ */
function applyFrame(img, uid) {
  if (!img || !uid) return;
  if (img.dataset.vipFrame === '1') return;
  if (img.tagName !== 'IMG') return;

  var v = vipCache[uid];
  if (!v || !v.active || !v.frame || v.frame === 'none') return;

  var frame = FRAMES[v.frame];
  if (!frame || !frame.css) return;

  img.dataset.vipFrame = '1';

  var wrapper = document.createElement('span');
  wrapper.className = 'vip-avatar-frame' + (frame.animated ? ' animated' : '');
  wrapper.style.background = frame.css;
  wrapper.style.backgroundSize = '200% 200%';

  // Безопасная замена
  var parent = img.parentNode;
  if (!parent) return;
  parent.insertBefore(wrapper, img);
  wrapper.appendChild(img);
}

/* ═══ СКАНИРОВАНИЕ DOM ═══ */
function scan() {
  var nodes = document.querySelectorAll('[data-user-id]');
  if (!nodes.length) return;

  var ids = [];
  var idMap = {}; // uid → [elements]

  nodes.forEach(function(node) {
    var uid = node.dataset.userId;
    if (!isValidUserId(uid)) return;

    if (!idMap[uid]) {
      idMap[uid] = [];
      ids.push(uid);
    }
    idMap[uid].push(node);
  });

  if (!ids.length) return;

  loadVIP(ids).then(function() {
    Object.keys(idMap).forEach(function(uid) {
      var v = vipCache[uid];
      if (!v || !v.active) return;

      idMap[uid].forEach(function(node) {
        var nickEl = node.querySelector(NICK_SELECTORS);
        if (nickEl) applyNick(nickEl, uid);

        var avatarEl = node.querySelector(AVATAR_SELECTORS);
        if (avatarEl) applyFrame(avatarEl, uid);
      });
    });
  });
}

/* ═══ ДЕБАУНС ═══ */
var scanTimer = null;
function scheduleScan() {
  if (scanTimer) clearTimeout(scanTimer);
  scanTimer = setTimeout(scan, SCAN_DEBOUNCE);
}

/* ═══ НАБЛЮДЕНИЕ ═══ */
function observeChanges() {
  if (!window.MutationObserver) return;
  try {
    var observer = new MutationObserver(scheduleScan);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } catch (e) {
    console.warn('[VIP] Observer failed:', e);
  }
}

/* ═══ FALLBACK: периодический рескан ═══ */
function startFallback() {
  // На случай если MutationObserver пропустит что-то
  setInterval(function() {
    // Только если есть новые [data-user-id] без обработки
    var unprocessed = document.querySelectorAll('[data-user-id]:not([data-vip-scanned])');
    if (unprocessed.length) {
      unprocessed.forEach(function(el) { el.dataset.vipScanned = '1'; });
      scheduleScan();
    }
  }, RESCAN_INTERVAL);
}

/* ═══ ИНИЦИАЛИЗАЦИЯ ═══ */
function init() {
  if (!sb) {
    console.warn('[VIP] Supabase client not available');
    return;
  }

  // Первичное сканирование
  scan();

  // Подписка на изменения DOM
  observeChanges();

  // Резервный рескан
  startFallback();

  console.log('⭐ VIP v6.0 загружен');
}

/* ═══ ЗАПУСК ═══ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ═══ ЭКСПОРТ ═══ */
window.VIP_FRAMES = FRAMES;
window.VIP_getCache = function() { return vipCache; };

})();
