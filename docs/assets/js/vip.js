/**
 * VIP — бейдж, цвет ника, кастомный статус
 * Работает на всех страницах: форум, комментарии, профиль
 */
(function(){
  'use strict';
  if (window.__vipLoaded) return;
  window.__vipLoaded = true;

  var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
  var sb = null;

  try {
    if (window.supabase && window.supabase.createClient){
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
  } catch(e){}

  // ─── Кэш ───
  var vipCache = {}; // { userId: { until: Date, color: string, badge: string } }
  var currentUser = null;

  // ─── Загрузка статуса ───
  async function loadVIPStatus(userIds){
    if (!sb || !userIds.length) return;
    // Уже в кэше
    var toLoad = userIds.filter(function(id){ return !vipCache[id]; });
    if (!toLoad.length) return;

    try {
      var r = await sb.from('profiles')
        .select('user_id, vip_until, nick_color, vip_badge')
        .in('user_id', toLoad);
      (r && r.data || []).forEach(function(p){
        var until = p.vip_until ? new Date(p.vip_until) : null;
        var isActive = until && until.getTime() > Date.now();
        vipCache[p.user_id] = {
          active: isActive,
          until: until,
          color: isActive ? (p.nick_color || '#6C63FF') : null,
          badge: isActive ? (p.vip_badge || '👑') : null
        };
      });
    } catch(e){}
  }

  // ─── Добавление бейджа ───
  function decorateName(el, userId){
    if (!el || !userId) return;
    var v = vipCache[userId];
    if (!v || !v.active) return;

    // Уже декорировано?
    if (el.dataset.vipDone === '1') return;
    el.dataset.vipDone = '1';

    // Добавляем бейдж
    var badge = document.createElement('span');
    badge.className = 'vip-badge';
    badge.textContent = v.badge || '👑';
    badge.title = 'VIP до ' + v.until.toLocaleDateString('ru-RU');
    el.appendChild(badge);

    // Красим ник
    if (v.color) el.style.color = v.color;
  }

  // ─── Сканирование DOM ───
  function scanPage(){
    // Ищем элементы с data-user-id
    var els = document.querySelectorAll('[data-user-id]');
    if (!els.length) return;

    var userIds = [];
    els.forEach(function(el){
      var id = el.dataset.userId;
      if (id && userIds.indexOf(id) === -1) userIds.push(id);
    });

    loadVIPStatus(userIds).then(function(){
      els.forEach(function(el){
        var nameEl = el.querySelector('.author-name, .nickname, .username, .frm-post-author, .gld-post-author, .gld-chat-msg-author') || el;
        decorateName(nameEl, el.dataset.userId);
      });
    });
  }

  // ─── Стили бейджа ───
  var css = document.createElement('style');
  css.textContent = `
    .vip-badge{
      display: inline-block;
      margin-left: 5px;
      padding: 1px 5px;
      border-radius: 6px;
      background: linear-gradient(135deg, #f5d76e, #f39c12);
      font-size: .65em;
      line-height: 1;
      vertical-align: middle;
      box-shadow: 0 2px 6px rgba(243,156,18,.4);
      animation: vipShine 3s ease-in-out infinite;
      cursor: help;
    }
    @keyframes vipShine{
      0%, 100% { filter: brightness(1); box-shadow: 0 2px 6px rgba(243,156,18,.4); }
      50% { filter: brightness(1.2); box-shadow: 0 2px 12px rgba(243,156,18,.8); }
    }
  `;
  document.head.appendChild(css);

  // ─── Наблюдаем за динамическими элементами ───
  function initObserver(){
    if (!('MutationObserver' in window)) return;
    var pending = null;
    var observer = new MutationObserver(function(){
      clearTimeout(pending);
      pending = setTimeout(scanPage, 400);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ─── Инициализация ───
  async function init(){
    if (!sb) return;
    try {
      var s = await sb.auth.getSession();
      currentUser = s && s.data && s.data.session ? s.data.session.user : null;
    } catch(e){}

    scanPage();
    initObserver();
    console.log('⭐ VIP-модуль загружен');
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
