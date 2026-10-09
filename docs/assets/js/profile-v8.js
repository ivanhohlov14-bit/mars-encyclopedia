// ═══════════════════════════════════════════════════════════
// profile-v8.js
// Безопасность (email, OAuth), гостевые профили, быстрые ссылки
// Подключается ПОСЛЕ profile.js и profile-economy.js
// ═══════════════════════════════════════════════════════════
(function(){
'use strict';
if (window.__profileV8Loaded) return;
window.__profileV8Loaded = true;

/* ═══ ХЕЛПЕРЫ ═══ */
function sb(){ return window.supabaseClient; }
function sess(){ return window.marsSession || {}; }
function cu(){ return sess().user; }
function cp(){ return sess().profile; }
function toast(m, t){ if (window.pfToast) return window.pfToast(m, t || 'info'); console.log('['+t+']', m); }
function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
function avFallback(n){
  if (!n) return 'https://ui-avatars.com/api/?name=?&background=6C63FF&color=fff&size=128';
  var p = n.trim().split(/[\s._-]+/);
  var ini = p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : n[0].toUpperCase();
  return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(ini) + '&background=6C63FF&color=fff&size=128';
}

/* ═══════════════════════════════════════════════════════════
   ЧАСТЬ 1: VIP АНИМАЦИИ (aurora-бордер, частицы, shimmer)
   ═══════════════════════════════════════════════════════════ */

function applyVIPEffects(){
  var profile = cp();
  if (!profile) return;
  var isVIP = profile.vip_until && new Date(profile.vip_until).getTime() > Date.now();

  var hero = document.querySelector('.pf-hero');
  if (!hero) return;

  if (isVIP){
    hero.classList.add('pf-hero-vip-v8');

    /* Частицы */
    if (!hero.querySelector('.pf-particles')){
      var particles = document.createElement('div');
      particles.className = 'pf-particles';
      for (var i = 0; i < 12; i++){
        var p = document.createElement('span');
        p.className = 'pf-particle';
        p.style.left = (Math.random() * 100) + '%';
        p.style.bottom = (Math.random() * 40) + '%';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        p.style.animationDelay = (Math.random() * 4) + 's';
        p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
        particles.appendChild(p);
      }
      hero.appendChild(particles);
    }

    /* Shimmer на нике */
    var nameEl = hero.querySelector('.pf-name');
    if (nameEl) nameEl.classList.add('vip-name-v8');
  } else {
    hero.classList.remove('pf-hero-vip-v8');
    var oldP = hero.querySelector('.pf-particles');
    if (oldP) oldP.remove();
  }

  /* Скрываем VIP-бейдж для не-VIP пользователей */
  if (!isVIP){
    document.querySelectorAll('.pf-vip-badge, .pf-vip-title, .pf-mypage-vip').forEach(function(el){
      el.style.display = 'none';
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   ЧАСТЬ 2: СКРОЛЛ-ТАБЫ С ПЕРЕТАСКИВАНИЕМ
   ═══════════════════════════════════════════════════════════ */

function setupDraggableTabs(){
  var tabs = document.getElementById('pf-tabs');
  if (!tabs || tabs.dataset.v8Drag === '1') return;
  tabs.dataset.v8Drag = '1';
  tabs.classList.add('pf-tabs-v8');

  var isDown = false, startX = 0, scrollStart = 0, moved = 0;

  tabs.addEventListener('mousedown', function(e){
    if (e.target.closest('.pf-tab')) return;
    isDown = true;
    moved = 0;
    startX = e.pageX;
    scrollStart = tabs.scrollLeft;
    tabs.classList.add('pf-dragging');
  });

  document.addEventListener('mousemove', function(e){
    if (!isDown) return;
    e.preventDefault();
    var dx = e.pageX - startX;
    moved = Math.abs(dx);
    tabs.scrollLeft = scrollStart - dx;
  });

  document.addEventListener('mouseup', function(){
    if (!isDown) return;
    isDown = false;
    tabs.classList.remove('pf-dragging');
    /* Если тащили больше 5px — блокируем клик по табам */
    if (moved > 5){
      var block = function(ev){ ev.stopPropagation(); ev.preventDefault(); };
      tabs.addEventListener('click', block, {capture: true, once: true});
      setTimeout(function(){ tabs.removeEventListener('click', block, {capture: true}); }, 50);
    }
  });

  /* Колёсико мыши тоже скроллит по горизонтали */
  tabs.addEventListener('wheel', function(e){
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      e.preventDefault();
      tabs.scrollLeft += e.deltaY * 1.2;
    }
  }, {passive: false});
}

/* ═══════════════════════════════════════════════════════════
   ЧАСТЬ 3: БЫСТРЫЕ ССЫЛКИ (раскрывающийся блок)
   ═══════════════════════════════════════════════════════════ */

var QUICK_LINKS = [
  { href: '/feedback/',                  icon: '📮', name: 'Обратная связь' },
  { href: '/interactive/mars-test/',     icon: '🧪', name: 'Тест «Возьмут ли на Марс»' },
  { href: '/interactive/scale-guess/',   icon: '📏', name: 'Космический глазомер' },
  { href: '/interactive/exodus/',        icon: '🚀', name: '«К Исходу»' },
  { href: '/globe-map/',                 icon: '🌍', name: 'Карта Марса' },
  { href: '/game/',                      icon: '👑', name: 'Марсианская империя' },
  { href: '/mars-city/',                 icon: '🏙️', name: 'Марсианский город' },
  { href: '/scan-dates/',                icon: '📅', name: 'Сканер дат' },
  { href: '/weather/',                   icon: '🌡️', name: 'Погода на Марсе' },
  { href: '/museum/',                    icon: '🏛️', name: 'Музей' },
  { href: '/duel/',                      icon: '⚔️', name: 'Дуэль переводчиков' },
  { href: '/scene-generator/',           icon: '🎬', name: 'Генератор сцен' },
  { href: '/sky/',                       icon: '🌠', name: 'Небо Марса' },
  { href: '/guilds/',                    icon: '🏰', name: 'Гильдии' },
  { href: '/names/',                     icon: '🔤', name: 'Марсианское имя' },
  { href: '/horoscope/',                 icon: '🔮', name: 'Гороскоп' },
  { href: '/top/',                       icon: '🏆', name: 'Топ статей' },
  { href: '/quests/',                    icon: '🗺️', name: 'Квесты' },
  { href: '/quest-map/',                 icon: '🧭', name: 'Квест-карта' },
  { href: '/shop/',                      icon: '🛒', name: 'Магазин' },
  { href: '/translator/',                icon: '🌐', name: 'Переводчик' },
  { href: '/music/constructor/',         icon: '🎵', name: 'Конструктор мелодий' },
  { href: '/feed/',                      icon: '📰', name: 'Лента активности' },
  { href: '/forum/',                     icon: '💬', name: 'Форум' }
];

function injectQuickLinks(){
  var container = document.getElementById('profile-app');
  if (!container || container.querySelector('.pf-quick-expand')) return;

  var quickGrid = container.querySelector('.pf-quick-grid');
  if (!quickGrid) return;

  var expand = document.createElement('div');
  expand.className = 'pf-quick-expand';

  var bodyHtml = QUICK_LINKS.map(function(l){
    return '<a href="' + l.href + '" class="pf-quick-link">' +
      '<span class="pf-quick-link-icon">' + l.icon + '</span>' +
      '<span>' + esc(l.name) + '</span>' +
    '</a>';
  }).join('');

  expand.innerHTML =
    '<div class="pf-quick-header">' +
      '<div class="pf-quick-header-title">⚡ Все разделы сайта <span style="font-size:.75rem;font-weight:600;color:#888;">(' + QUICK_LINKS.length + ')</span></div>' +
      '<div class="pf-quick-header-arrow">▼</div>' +
    '</div>' +
    '<div class="pf-quick-body">' +
      '<div class="pf-quick-body-inner">' + bodyHtml + '</div>' +
    '</div>';

  quickGrid.parentNode.insertBefore(expand, quickGrid.nextSibling);

  expand.querySelector('.pf-quick-header').addEventListener('click', function(){
    expand.classList.toggle('open');
  });
}

/* ═══════════════════════════════════════════════════════════
   ЧАСТЬ 4: ГОСТЕВОЙ ПРОФИЛЬ (полная информация)
   ═══════════════════════════════════════════════════════════ */

window.pfGuestFull = async function(uid){
  var myId = cu() && cu().id;
  if (uid === myId){ window.pfTab('overview'); return; }

  /* Модалка-загрузка */
  var bg = document.createElement('div');
  bg.className = 'pf-modal-bg';
  var m = document.createElement('div');
  m.className = 'pf-modal pf-guest-modal';
  m.innerHTML = '<div style="text-align:center;padding:40px 20px;">' +
    '<div style="display:inline-block;width:40px;height:40px;border:3px solid #6C63FF;border-top-color:transparent;border-radius:50%;animation:pfSpin .8s linear infinite;"></div>' +
    '<p style="color:#999;margin-top:14px;">Загрузка профиля...</p></div>';
  bg.appendChild(m);
  document.body.appendChild(bg);
  bg.addEventListener('click', function(e){ if (e.target === bg) bg.remove(); });

  try {
    /* Загружаем профиль + достижения + гильдию параллельно */
    var results = await Promise.all([
      sb().from('profiles').select('*').eq('user_id', uid).maybeSingle(),
      sb().from('user_achievements').select('achievement_id,earned_at').eq('user_id', uid),
      sb().from('guild_members').select('guild_id,role,rank').eq('user_id', uid).maybeSingle()
    ]);

    var p = results[0].data;
    var ua = results[1].data || [];
    var gm = results[2].data;

    if (!p){
      m.innerHTML = '<h3>😕 Профиль не найден</h3><p>Пользователь ещё не создал профиль.</p>' +
        '<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" onclick="this.closest(\'.pf-modal-bg\').remove()">Закрыть</button></div>';
      return;
    }

    /* Гильдия */
    var guild = null;
    if (gm && gm.guild_id){
      var gr = await sb().from('guilds').select('name,icon,color,rating,guild_level,bank').eq('id', gm.guild_id).maybeSingle();
      if (gr.data) guild = Object.assign({}, gr.data, {member_role: gm.role, member_rank: gm.rank});
    }

    var name = p.display_name || p.username || 'Аноним';
    var av = p.avatar_url || avFallback(name);
    var isVIP = p.vip_until && new Date(p.vip_until).getTime() > Date.now();
    var vCol = p.nick_color || '#6C63FF';

    /* Уровень */
    var exp = p.experience || 0;
    var lvl = 1;
    while (lvl < 100 && exp >= Math.floor(Math.pow(lvl + 1, 1.8) * 20)) lvl++;
    var curLvlMin = Math.floor(Math.pow(lvl, 1.8) * 20);
    var nextLvlMin = Math.floor(Math.pow(lvl + 1, 1.8) * 20);
    var pct = nextLvlMin > curLvlMin ? Math.min(((exp - curLvlMin) / (nextLvlMin - curLvlMin)) * 100, 100) : 100;

    /* Достижения */
    var ACH_TOTAL = 60; /* приблизительно */
    var achCount = ua.length;
    var achPct = Math.round(achCount / ACH_TOTAL * 100);

    /* Роли */
    var ROLES = [
      {l:1,n:'🌱 Поселенец'},{l:6,n:'🔭 Исследователь'},{l:11,n:'🚀 Первопроходец'},
      {l:16,n:'🏠 Колонизатор'},{l:21,n:'⚡ Командир'},{l:31,n:'🛡️ Хранитель'},
      {l:41,n:'🏛️ Сенатор'},{l:51,n:'⚔️ Мастер'},{l:61,n:'💎 Лорд'},
      {l:71,n:'🔥 Феникс'},{l:81,n:'🌟 Легенда'},{l:91,n:'👑 Полубог'},{l:100,n:'🐉 Бессмертный'}
    ];
    var role = ROLES[0].n;
    for (var i = 0; i < ROLES.length; i++) if (lvl >= ROLES[i].l) role = ROLES[i].n;

    /* Друзья? */
    var frCheck = await sb().from('friendships')
      .select('id,status')
      .or('and(user_id.eq.' + myId + ',friend_id.eq.' + uid + '),and(user_id.eq.' + uid + ',friend_id.eq.' + myId + ')')
      .maybeSingle();
    var isFriend = frCheck.data && frCheck.data.status === 'accepted';
    var isPending = frCheck.data && frCheck.data.status === 'pending';

    /* Цвет королевства */
    var KINGDOM_FLAGS = {
      'Эдем':'/assets/images/flag-of-eden.jpg','Аркадия':'/assets/images/map/flag-of-arkadia.png',
      'Эридания':'/assets/images/flag-of-eridania.png','Кхонг':'/assets/images/flag-of-khong.png',
      'Авсония':'/assets/images/flag-of-avsonia.png','Кимерия':'/assets/images/flag-of-kimeria.png',
      'Серпентида':'/assets/images/flag-of-serpentida.png','Эритрей':'/assets/images/flag-of-eritrea.png',
      'Утопия':'/assets/images/flag-of-utopia.png','Эллада':'/assets/images/flag-of-hellas.png',
      'Аливасото':'/assets/images/flag-of-alivasoto.png','Ксанф':'/assets/images/coat-of-arms-of-ksanf.png'
    };
    var KC = {'Аркадия':'#D4A574','Ксанф':'#3D3D3D','Эдем':'#F4A460','Эридания':'#F5D76E','Кхонг':'#A9A9A9','Авсония':'#87CEEB','Кимерия':'#B19CD9','Серпентида':'#E57373','Эритрей':'#64B5F6','Утопия':'#4DD0E1','Эллада':'#FF8A65','Аливасото':'#81C784'};
    var kc = KC[p.kingdom] || '#6C63FF';
    var flag = KINGDOM_FLAGS[p.kingdom];

    /* Hero фон */
    var heroBg = 'linear-gradient(135deg,' + kc + ' 0%,' + kc + 'aa 40%,#1a1a2e 100%)';
    if (isVIP && p.profile_bg){
      var BG_MAP = {
        cosmic:'radial-gradient(circle at 20% 30%,rgba(108,99,255,.3),transparent 60%),linear-gradient(135deg,#0a0a1e,#1a1a2e,#2d1b3d)',
        fire:'linear-gradient(135deg,#2c0a0a,#5c1a1a,#8b2a1a,#2c0a0a)',
        ice:'linear-gradient(135deg,#0a1a2c,#1a3a5c,#2c5a8b,#0a1a2c)',
        night:'linear-gradient(rgba(10,10,26,.6),rgba(45,27,61,.75)),url("/assets/images/night.jpg") center/cover',
        observatory:'linear-gradient(rgba(10,10,26,.65),rgba(45,27,61,.75)),url("/assets/images/scene-observatory.jpg") center/cover'
      };
      if (BG_MAP[p.profile_bg]) heroBg = BG_MAP[p.profile_bg];
    }

    /* Собираем HTML */
    var h = '';

    /* ── HERO ── */
    h += '<div class="pf-guest-hero" style="background:' + heroBg + ';">';
    if (isVIP) h += '<div class="pf-particles">';
    if (isVIP) for (var pi = 0; pi < 8; pi++){
      h += '<span class="pf-particle" style="left:' + (Math.random()*100) + '%;bottom:' + (Math.random()*40) + '%;animation-duration:' + (4+Math.random()*4) + 's;animation-delay:' + (Math.random()*4) + 's;"></span>';
    }
    if (isVIP) h += '</div>';

    h += '<img src="' + esc(av) + '" style="width:96px;height:96px;border-radius:50%;border:4px solid ' + (isVIP ? '#f5d76e' : 'rgba(255,255,255,.5)') + ';object-fit:cover;box-shadow:0 8px 32px rgba(0,0,0,.3);" onerror="this.onerror=null;this.src=\'' + avFallback(name) + '\';">';

    var nameStyle = isVIP
      ? 'background:linear-gradient(90deg,' + vCol + ' 0%,#f5d76e 25%,' + vCol + ' 50%,#f5d76e 75%,' + vCol + ' 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:vipShimmer 6s linear infinite;'
      : 'color:#fff;';
    h += '<h3 style="margin:12px 0 4px;font-size:1.5rem;font-weight:900;' + nameStyle + '">' + esc(name) + (isVIP ? ' 👑' : '') + '</h3>';

    if (isVIP && p.custom_title) h += '<div style="font-size:.78rem;color:#ffdf5e;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">' + esc(p.custom_title) + '</div>';

    h += '<div style="font-size:.85rem;opacity:.85;">' + esc(role) + '</div>';
    if (flag) h += '<div style="margin-top:10px;"><span style="background:rgba(0,0,0,.3);padding:4px 12px;border-radius:16px;font-size:.78rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;"><img src="' + flag + '" style="width:16px;border-radius:2px;"> ' + esc(p.kingdom) + '</span></div>';
    h += '</div>';

    /* ── STATS ── */
    h += '<div class="pf-guest-stats">';
    h += '<div class="pf-guest-stat" style="background:linear-gradient(135deg,' + kc + '22,' + kc + '08);border:1px solid ' + kc + '44;"><div class="pf-guest-stat-label" style="color:#666;">Уровень</div><div class="pf-guest-stat-value" style="color:' + kc + ';">⭐ ' + lvl + '</div></div>';
    h += '<div class="pf-guest-stat" style="background:linear-gradient(135deg,rgba(108,99,255,.1),rgba(108,99,255,.04));border:1px solid rgba(108,99,255,.2);"><div class="pf-guest-stat-label" style="color:#666;">Опыт</div><div class="pf-guest-stat-value" style="color:#6C63FF;">💎 ' + exp + '</div></div>';
    h += '<div class="pf-guest-stat" style="background:linear-gradient(135deg,rgba(243,156,18,.1),rgba(243,156,18,.04));border:1px solid rgba(243,156,18,.2);"><div class="pf-guest-stat-label" style="color:#666;">Награды</div><div class="pf-guest-stat-value" style="color:#e67e22;">🏆 ' + achCount + '</div></div>';
    h += '</div>';

    /* Прогресс-бар уровня */
    h += '<div style="height:8px;background:rgba(0,0,0,.08);border-radius:8px;overflow:hidden;margin-bottom:6px;">';
    h += '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,' + kc + ',#6C63FF);border-radius:8px;transition:width 1s;"></div></div>';
    h += '<div style="font-size:.72rem;color:#888;text-align:center;margin-bottom:16px;">До уровня ' + (lvl+1) + ': ' + Math.max(nextLvlMin - exp, 0) + ' XP</div>';

    /* ── БИО ── */
    if (p.bio){
      h += '<div style="background:#f8f9fb;border-radius:12px;padding:14px 16px;margin-bottom:14px;font-size:.88rem;color:#555;line-height:1.5;font-style:italic;">' + esc(p.bio) + '</div>';
    }

    /* ── ГИЛЬДИЯ ── */
    if (guild){
      h += '<div style="background:linear-gradient(135deg,' + (guild.color || kc) + '22,transparent);border:1px solid ' + (guild.color || kc) + '44;border-radius:14px;padding:14px 16px;margin-bottom:14px;cursor:pointer;" onclick="this.closest(\'.pf-modal-bg\').remove();window.location.href=\'/guilds/\'">';
      h += '<div style="display:flex;align-items:center;gap:12px;">';
      h += '<div style="width:44px;height:44px;border-radius:10px;background:' + (guild.color || kc) + ';display:flex;align-items:center;justify-content:center;font-size:1.5rem;">' + (guild.icon || '🏰') + '</div>';
      h += '<div style="flex:1;"><div style="font-weight:800;color:#1a1a2e;">' + esc(guild.name) + '</div>';
      h += '<div style="font-size:.75rem;color:#888;">Роль: ' + esc(guild.member_role || 'member') + ' · Ур. гильдии ' + (guild.guild_level || 1) + ' · 💰 ' + (guild.bank || 0) + '</div></div>';
      h += '</div></div>';
    }

    /* ── ДОСТИЖЕНИЯ (последние 6) ── */
    if (ua.length){
      h += '<div style="margin-bottom:14px;">';
      h += '<div style="font-size:.75rem;font-weight:800;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Последние достижения</div>';
      h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;">';
      ua.slice(-6).forEach(function(a){
        h += '<div style="padding:10px;background:linear-gradient(135deg,#fffbf0,#fff);border:1px solid rgba(243,156,18,.2);border-radius:10px;text-align:center;">';
        h += '<div style="font-size:1.4rem;">🏅</div>';
        h += '<div style="font-size:.7rem;font-weight:700;color:#555;margin-top:4px;">#' + a.achievement_id + '</div>';
        h += '</div>';
      });
      h += '</div></div>';
    }

    /* ── ДЕЙСТВИЯ ── */
    h += '<div class="pf-modal-actions" style="margin-top:8px;">';
    if (isFriend){
      h += '<button class="pf-btn pf-btn-danger" onclick="window.pfRmFriend(\'' + uid + '\');this.closest(\'.pf-modal-bg\').remove();">💔 Удалить из друзей</button>';
    } else if (isPending){
      h += '<button class="pf-btn pf-btn-outline" disabled>⏳ Заявка отправлена</button>';
    } else {
      h += '<button class="pf-btn" onclick="window.pfAddFriend(\'' + uid + '\');this.closest(\'.pf-modal-bg\').remove();">➕ Добавить в друзья</button>';
    }
    h += '<button class="pf-btn pf-btn-outline" onclick="this.closest(\'.pf-modal-bg\').remove()">Закрыть</button>';
    h += '</div>';

    m.innerHTML = h;

    /* Добавляем aurora-бордер для VIP гостя */
    if (isVIP){
      var heroEl = m.querySelector('.pf-guest-hero');
      if (heroEl){
        heroEl.classList.add('pf-hero-vip-v8');
        heroEl.style.isolation = 'isolate';
        heroEl.style.position = 'relative';
      }
    }

  } catch(e){
    m.innerHTML = '<h3>❌ Ошибка</h3><p>' + esc(e.message) + '</p>' +
      '<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" onclick="this.closest(\'.pf-modal-bg\').remove()">Закрыть</button></div>';
  }
};

/* Перехватываем старый pfGuest и все клики на него */
var origPfGuest = window.pfGuest;
window.pfGuest = function(uid){ return window.pfGuestFull(uid); };

/* ═══════════════════════════════════════════════════════════
   ЧАСТЬ 5: БЕЗОПАСНОСТЬ (email, OAuth, 2FA, пароль)
   ═══════════════════════════════════════════════════════════ */

/* Состояние 2FA из БД */
var sec2FA = { enabled: false, loading: false };

async function load2FAState(){
  var u = cu(); if (!u) return;
  try {
    var r = await sb().from('user_2fa').select('email_2fa_enabled').eq('user_id', u.id).maybeSingle();
    sec2FA.enabled = !!(r.data && r.data.email_2fa_enabled);
  } catch(e){ sec2FA.enabled = false; }
}

window.pfRenderSecurityV8 = function(){
  var u = cu();
  if (!u) return '';

  var email = u.email || '';
  var isEmailVerified = !!u.email_confirmed_at;
  var hasEmail = !!email;
  var isAnon = !hasEmail || u.is_anonymous;

  var h = '';

  /* ── Секция: Привязка email (если аноним) ── */
  if (isAnon){
    h += '<div class="pf-card pf-card-v8" style="border:2px solid rgba(243,156,18,.3);background:linear-gradient(135deg,#fffbf0,#fff);">';
    h += '<h3 class="pf-card-title" style="color:#e67e22;"><span class="pf-ct-icon">📧</span> Привязать почту</h3>';
    h += '<p style="color:#666;font-size:.88rem;margin:0 0 16px;line-height:1.5;">Ты зашёл анонимно. Привяжи email, чтобы сохранить аккаунт и не потерять прогресс.</p>';
    h += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
    h += '<input id="pf-bind-email" type="email" placeholder="your@email.com" style="flex:1;min-width:200px;padding:12px 16px;border:2px solid #e8eaf0;border-radius:12px;font-size:.9rem;font-family:inherit;outline:none;">';
    h += '<input id="pf-bind-pass" type="password" placeholder="Пароль (мин. 6)" style="flex:1;min-width:160px;padding:12px 16px;border:2px solid #e8eaf0;border-radius:12px;font-size:.9rem;font-family:inherit;outline:none;">';
    h += '<button type="button" class="pf-btn pf-btn-primary" onclick="pfBindEmail()" style="white-space:nowrap;">📎 Привязать</button>';
    h += '</div>';
    h += '<div id="pf-bind-status" style="margin-top:10px;font-size:.82rem;font-weight:600;min-height:18px;"></div>';
    h += '</div>';
  }

  /* ── Секция: Email и пароль ── */
  h += '<div class="pf-card pf-card-v8">';
  h += '<h3 class="pf-card-title"><span class="pf-ct-icon">🔐</span> Вход и безопасность</h3>';

  /* Email */
  h += '<div class="pf-sec-card">';
  h += '<div class="pf-sec-icon ' + (isEmailVerified ? 'ok' : 'warn') + '">' + (isEmailVerified ? '✅' : '📧') + '</div>';
  h += '<div class="pf-sec-body">';
  h += '<div class="pf-sec-title">Email-адрес ' + (isEmailVerified ? '<span class="pf-sec-badge ok">Подтверждён</span>' : (hasEmail ? '<span class="pf-sec-badge warn">Не подтверждён</span>' : '<span class="pf-sec-badge off">Не указан</span>')) + '</div>';
  h += '<div class="pf-sec-desc">' + (email ? esc(email) : 'Почта не привязана') + '</div>';
  h += '</div>';
  if (hasEmail && !isEmailVerified){
    h += '<button class="pf-sec-action" onclick="pfResendConfirm()">Отправить письмо</button>';
  } else if (hasEmail){
    h += '<button class="pf-sec-action" onclick="pfChangeEmail()">Сменить</button>';
  } else {
    h += '<button class="pf-sec-action primary" onclick="pfChangeEmail()">Добавить</button>';
  }
  h += '</div>';

  /* Пароль */
  h += '<div class="pf-sec-card">';
  h += '<div class="pf-sec-icon ' + (hasEmail ? 'ok' : 'off') + '">🔑</div>';
  h += '<div class="pf-sec-body">';
  h += '<div class="pf-sec-title">Пароль</div>';
  h += '<div class="pf-sec-desc">' + (hasEmail ? 'Пароль установлен. Можно сменить или сбросить.' : 'Установи пароль после привязки email.') + '</div>';
  h += '</div>';
  h += '<button class="pf-sec-action" onclick="pfChangePassword()" ' + (hasEmail ? '' : 'disabled style="opacity:.4;cursor:not-allowed;"') + '>Сменить</button>';
  h += '</div>';

  /* ── Секция: Способы входа (OAuth) ── */
  h += '<div class="pf-sec-card">';
  h += '<div class="pf-sec-icon">🔗</div>';
  h += '<div class="pf-sec-body">';
  h += '<div class="pf-sec-title">Вход через соцсети</div>';
  h += '<div class="pf-sec-desc">Привяжи аккаунт Google, VK, OK или MAX для быстрого входа</div>';
  h += '</div>';
  h += '<button class="pf-sec-action" onclick="pfLinkOAuth()">Привязать</button>';
  h += '</div>';

  /* ── Секция: Двухфакторная аутентификация ── */
  h += '<div class="pf-sec-card">';
  h += '<div class="pf-sec-icon ' + (sec2FA.enabled ? 'ok' : 'warn') + '">' + (sec2FA.enabled ? '✅' : '🛡️') + '</div>';
  h += '<div class="pf-sec-body">';
  h += '<div class="pf-sec-title">Email-2FA ' + (sec2FA.enabled ? '<span class="pf-sec-badge ok">Включена</span>' : '<span class="pf-sec-badge off">Выключена</span>') + '</div>';
  h += '<div class="pf-sec-desc">Запрашивать код на почту при входе с нового устройства</div>';
  h += '</div>';
  h += '<button class="pf-sec-action ' + (sec2FA.enabled ? '' : 'primary') + '" onclick="pfToggle2FAV8()">' + (sec2FA.enabled ? 'Выключить' : 'Включить') + '</button>';
  h += '</div>';

  /* ── Секция: Magic Link / OTP ── */
  h += '<div class="pf-sec-card">';
  h += '<div class="pf-sec-icon">✨</div>';
  h += '<div class="pf-sec-body">';
  h += '<div class="pf-sec-title">Вход по ссылке или коду</div>';
  h += '<div class="pf-sec-desc">Получить magic link или 6-значный код на почту — вход без пароля</div>';
  h += '</div>';
  h += '<button class="pf-sec-action" onclick="pfSendMagicLink()">Отправить</button>';
  h += '</div>';

  /* ── Секция: Reauthentication ── */
  h += '<div class="pf-sec-card">';
  h += '<div class="pf-sec-icon">🔒</div>';
  h += '<div class="pf-sec-body">';
  h += '<div class="pf-sec-title">Подтверждение личности</div>';
  h += '<div class="pf-sec-desc">Запрашивать повторный вход перед важными действиями (смена пароля, удаление аккаунта)</div>';
  h += '</div>';
  h += '<button class="pf-sec-action" onclick="pfReauthenticate()">Настроить</button>';
  h += '</div>';

  h += '</div>'; /* /card */

  /* ── Danger zone ── */
  h += '<button class="pf-danger-btn" onclick="pfDanger()">⚠️ Опасная зона</button>';

  return h;
};

/* ── Привязка email ── */
window.pfBindEmail = async function(){
  var emailEl = document.getElementById('pf-bind-email');
  var passEl = document.getElementById('pf-bind-pass');
  var st = document.getElementById('pf-bind-status');
  if (!emailEl || !passEl || !st) return;

  var email = emailEl.value.trim();
  var pass = passEl.value;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    st.textContent = '❌ Введите корректный email'; st.style.color = '#e74c3c'; return;
  }
  if (!pass || pass.length < 6){
    st.textContent = '❌ Пароль минимум 6 символов'; st.style.color = '#e74c3c'; return;
  }

  st.textContent = '⏳ Привязываем...'; st.style.color = '#999';

  try {
    var r = await sb().auth.updateUser({ email: email, password: pass });
    if (r.error) throw r.error;
    st.textContent = '✅ Письмо отправлено на ' + email + '. Подтверди, чтобы завершить.';
    st.style.color = '#27ae60';
    toast('📧 Проверь почту!', 'success');
  } catch(e){
    st.textContent = '❌ ' + e.message; st.style.color = '#e74c3c';
  }
};

/* ── Повторная отправка подтверждения ── */
window.pfResendConfirm = async function(){
  var u = cu(); if (!u || !u.email) return;
  try {
    var r = await sb().auth.resend({ type: 'signup', email: u.email });
    if (r.error) throw r.error;
    toast('📧 Письмо отправлено повторно', 'success');
  } catch(e){
    toast('Ошибка: ' + e.message, 'error');
  }
};

/* ── Смена email ── */
window.pfChangeEmail = function(){
  var u = cu();
  var bg = document.createElement('div'); bg.className = 'pf-modal-bg';
  var m = document.createElement('div'); m.className = 'pf-modal';
  m.innerHTML =
    '<h3>📧 ' + (u.email ? 'Смена email' : 'Добавить email') + '</h3>' +
    '<p style="color:#666;font-size:.85rem;">На новый адрес придёт письмо для подтверждения.</p>' +
    '<input id="ch-email" type="email" class="pf-modal-input" placeholder="new@email.com" value="' + esc(u.email || '') + '">' +
    '<div class="pf-modal-actions">' +
      '<button class="pf-btn pf-btn-outline" id="ch-c">Отмена</button>' +
      '<button class="pf-btn" id="ch-o">Отправить</button>' +
    '</div>';
  bg.appendChild(m); document.body.appendChild(bg);
  bg.addEventListener('click', function(e){ if (e.target === bg) bg.remove(); });
  m.querySelector('#ch-c').onclick = function(){ bg.remove(); };
  m.querySelector('#ch-o').onclick = async function(){
    var email = m.querySelector('#ch-email').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ toast('Некорректный email', 'error'); return; }
    var btn = m.querySelector('#ch-o'); btn.disabled = true; btn.textContent = '⏳...';
    try {
      var r = await sb().auth.updateUser({ email: email });
      if (r.error) throw r.error;
      toast('📧 Письмо отправлено на ' + email, 'success');
      bg.remove();
    } catch(e){
      toast('Ошибка: ' + e.message, 'error');
      btn.disabled = false; btn.textContent = 'Отправить';
    }
  };
};

/* ── Смена пароля ── */
window.pfChangePassword = async function(){
  var u = cu(); if (!u || !u.email){ toast('Сначала привяжи email', 'error'); return; }
  try {
    var r = await sb().auth.resetPasswordForEmail(u.email, { redirectTo: location.origin + '/profile/' });
    if (r.error) throw r.error;
    toast('📧 Ссылка для сброса пароля отправлена', 'success');
  } catch(e){
    toast('Ошибка: ' + e.message, 'error');
  }
};

/* ── OAuth привязка (Google, VK, OK, MAX) ── */
window.pfLinkOAuth = function(){
  var bg = document.createElement('div'); bg.className = 'pf-modal-bg';
  var m = document.createElement('div'); m.className = 'pf-modal';
  m.innerHTML =
    '<h3>🔗 Вход через соцсети</h3>' +
    '<p style="color:#666;font-size:.85rem;">Выбери сервис для привязки аккаунта. Если аккаунт уже есть — войдёшь сразу.</p>' +
    '<div style="display:flex;flex-direction:column;gap:10px;margin:16px 0;">' +
      '<button class="pf-btn" onclick="pfDoOAuth(\'google\')" style="width:100%;justify-content:center;background:#DB4437;border:none;color:#fff;">🔍 Google</button>' +
      '<button class="pf-btn" onclick="pfDoOAuth(\'vk\')" style="width:100%;justify-content:center;background:#4C75A3;border:none;color:#fff;">🔵 VKontakte</button>' +
      '<button class="pf-btn" onclick="pfDoOAuth(\'ok\')" style="width:100%;justify-content:center;background:#EE8208;border:none;color:#fff;">🟠 Одноклассники</button>' +
      '<button class="pf-btn" onclick="pfDoOAuth(\'max\')" style="width:100%;justify-content:center;background:linear-gradient(135deg,#6C63FF,#A29BFE);border:none;color:#fff;">🟣 MAX</button>' +
    '</div>' +
    '<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" onclick="this.closest(\'.pf-modal-bg\').remove()">Закрыть</button></div>';
  bg.appendChild(m); document.body.appendChild(bg);
  bg.addEventListener('click', function(e){ if (e.target === bg) bg.remove(); });
};

window.pfDoOAuth = async function(provider){
  try {
    var opts = { redirectTo: location.origin + '/profile/' };
    if (provider === 'max'){
      /* MAX пока не встроен в Supabase — заглушка */
      toast('🔮 MAX скоро появится!', 'info');
      return;
    }
    var r = await sb().auth.signInWithOAuth({ provider: provider, options: opts });
    if (r.error) throw r.error;
  } catch(e){
    toast('Ошибка: ' + e.message, 'error');
  }
};

/* ── Magic Link / OTP ── */
window.pfSendMagicLink = async function(){
  var u = cu(); if (!u || !u.email){ toast('Сначала привяжи email', 'error'); return; }
  try {
    var r = await sb().auth.signInWithOtp({ email: u.email, options: { shouldCreateUser: false } });
    if (r.error) throw r.error;
    toast('✨ Magic link отправлен на ' + u.email, 'success');
  } catch(e){
    toast('Ошибка: ' + e.message, 'error');
  }
};

/* ── Reauthentication ── */
window.pfReauthenticate = async function(){
  var u = cu();
  if (!u.email){ toast('Сначала привяжи email', 'error'); return; }
  var bg = document.createElement('div'); bg.className = 'pf-modal-bg';
  var m = document.createElement('div'); m.className = 'pf-modal';
  m.innerHTML =
    '<h3>🔒 Подтверждение личности</h3>' +
    '<p style="color:#666;font-size:.85rem;">Введи пароль, чтобы подтвердить, что это ты.</p>' +
    '<input id="reauth-pass" type="password" class="pf-modal-input" placeholder="Пароль">' +
    '<div id="reauth-status" style="font-size:.82rem;min-height:18px;margin-bottom:8px;"></div>' +
    '<div class="pf-modal-actions">' +
      '<button class="pf-btn pf-btn-outline" id="reauth-c">Отмена</button>' +
      '<button class="pf-btn" id="reauth-o">Подтвердить</button>' +
    '</div>';
  bg.appendChild(m); document.body.appendChild(bg);
  bg.addEventListener('click', function(e){ if (e.target === bg) bg.remove(); });
  m.querySelector('#reauth-c').onclick = function(){ bg.remove(); };
  m.querySelector('#reauth-o').onclick = async function(){
    var pass = m.querySelector('#reauth-pass').value;
    var st = m.querySelector('#reauth-status');
    if (!pass){ st.textContent = '❌ Введи пароль'; st.style.color = '#e74c3c'; return; }
    var btn = m.querySelector('#reauth-o'); btn.disabled = true; btn.textContent = '⏳...';
    try {
      var r = await sb().auth.signInWithPassword({ email: u.email, password: pass });
      if (r.error) throw r.error;
      toast('✅ Личность подтверждена', 'success');
      bg.remove();
    } catch(e){
      st.textContent = '❌ ' + e.message; st.style.color = '#e74c3c';
      btn.disabled = false; btn.textContent = 'Подтвердить';
    }
  };
};

/* ── Toggle 2FA ── */
window.pfToggle2FAV8 = async function(){
  var u = cu(); if (!u) return;
  var newVal = !sec2FA.enabled;
  try {
    var existing = await sb().from('user_2fa').select('user_id').eq('user_id', u.id).maybeSingle();
    if (existing.data){
      await sb().from('user_2fa').update({ email_2fa_enabled: newVal, updated_at: new Date().toISOString() }).eq('user_id', u.id);
    } else {
      await sb().from('user_2fa').insert({ user_id: u.id, email_2fa_enabled: newVal });
    }
    sec2FA.enabled = newVal;
    toast(newVal ? '🛡️ 2FA включена' : '2FA выключена', newVal ? 'success' : 'info');
    var secContent = document.querySelector('.pf-tab-content[data-content="security"]');
    if (secContent) secContent.innerHTML = pfRenderSecurityV8();
  } catch(e){
    toast('Ошибка: ' + e.message, 'error');
  }
};

/* ═══════════════════════════════════════════════════════════
   ЧАСТЬ 6: ЗАМЕНА ВКЛАДКИ БЕЗОПАСНОСТИ
   ═══════════════════════════════════════════════════════════ */

function patchSecurityTab(){
  var secContent = document.querySelector('.pf-tab-content[data-content="security"]');
  if (!secContent || secContent.dataset.v8 === '1') return;
  secContent.dataset.v8 = '1';

  load2FAState().then(function(){
    secContent.innerHTML = pfRenderSecurityV8();
  });
}

/* ═══════════════════════════════════════════════════════════
   ГЛАВНЫЙ ЦИКЛ
   ═══════════════════════════════════════════════════════════ */

function onProfileReady(){
  applyVIPEffects();
  setupDraggableTabs();
  injectQuickLinks();
  patchSecurityTab();
}

/* Слушаем событие от profile.js */
window.addEventListener('pfRendered', function(){ setTimeout(onProfileReady, 50); });

/* MutationObserver — на случай если pfRendered не сработал */
if (window.MutationObserver){
  var obs = new MutationObserver(function(){
    if (document.getElementById('pf-tabs')){
      onProfileReady();
    }
  });
  obs.observe(document.body, {childList: true, subtree: true});
  setTimeout(function(){ obs.disconnect(); }, 20000);
}

/* Fallback */
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
function boot(){
  setTimeout(function(){
    if (document.getElementById('pf-tabs')) onProfileReady();
  }, 600);
}

console.log('🎨 profile-v8.js загружен');
})();
