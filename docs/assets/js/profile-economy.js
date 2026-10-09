// ═══════════════════════════════════════════════════════════
// profile-economy.js v2
// Экономика профиля: кошелёк, ежедневка, промокод, гильдия
// v2: мгновенный инжект + кэш + MutationObserver
// ═══════════════════════════════════════════════════════════
(function(){
'use strict';
if (window.__pfEconomyLoaded) return;
window.__pfEconomyLoaded = true;

var COIN = '/assets/images/guild-coin.jpg';
var CACHE_KEY = 'mars-wallet-cache-v1';

/* ═══ ХЕЛПЕРЫ ═══ */
function sb(){ return window.supabaseClient; }
function sess(){ return window.marsSession || {}; }
function uid(){ var u = sess().user; return u && u.id; }
function toast(m, t){ if (window.pfToast) return window.pfToast(m, t || 'info'); console.log('['+t+']', m); }
function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
function fmtDate(iso){
  if (!iso) return '';
  return new Date(iso).toLocaleString('ru-RU', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'});
}
function fmtTxType(t){
  return { earn:'💰 Начисление', spend:'💸 Списание', promo:'🎁 Промокод',
    purchase:'🛒 Покупка', refund:'↩️ Возврат', admin:'⚙️ Админ' }[t] || t;
}
function fmtTxSource(s){
  return { daily:'Ежедневка', quest:'Квест', guild:'Гильдия',
    shop:'Магазин', promo:'Промокод', read:'Чтение' }[s] || (s || '');
}

/* ═══ КЭШ ═══ */
function readCache(){
  try {
    var raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    var c = JSON.parse(raw);
    if (!c || !c.uid || c.uid !== uid()) return null;
    if (Date.now() - c.ts > 5 * 60 * 1000) return null;
    return c;
  } catch(e){ return null; }
}
function writeCache(){
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      uid: uid(), balance: wallet.balance, total_earned: wallet.total_earned, ts: Date.now()
    }));
  } catch(e){}
}

/* ═══ СОСТОЯНИЕ ═══ */
var wallet = { balance: 0, total_earned: 0 };
var txs = [];
var shopItems = [];
var loadedOnce = false;

/* ═══ ЗАГРУЗКА ═══ */
async function loadWallet(){
  var id = uid(); if (!id) return;
  try {
    var r = await sb().from('user_currency')
      .select('clay_talents,total_earned,updated_at')
      .eq('user_id', id).maybeSingle();
    if (r.data){
      wallet.balance = r.data.clay_talents || 0;
      wallet.total_earned = r.data.total_earned || 0;
    }
  } catch(e){ console.warn('[wallet]', e.message); }
}
async function loadTx(){
  var id = uid(); if (!id) return;
  try {
    var r = await sb().from('transactions')
      .select('id,amount,balance_after,type,source,meta,created_at')
      .eq('user_id', id).order('created_at', {ascending:false}).limit(30);
    txs = r.data || [];
  } catch(e){ txs = []; }
}
async function loadShop(){
  if (shopItems.length) return;
  try {
    var r = await sb().from('shop_items')
      .select('slug,name,description,category,price_talents,payload,icon')
      .eq('is_active', true).order('sort_order', {ascending:true});
    shopItems = r.data || [];
  } catch(e){ shopItems = []; }
}

/* ═══ ЕЖЕДНЕВКА ═══ */
window.pfClaimDaily = async function(){
  var btn = document.getElementById('pf-daily-btn');
  var orig = btn ? btn.innerHTML : '';
  if (btn){ btn.disabled = true; btn.innerHTML = '⏳ Проверяем...'; }
  try {
    var r = await sb().rpc('claim_daily_reward');
    if (r.error) throw r.error;
    var d = r.data || {};
    if (!d.ok){
      toast('⚠️ ' + (d.error || 'Не удалось'), 'info');
      if (btn){ btn.disabled = false; btn.innerHTML = orig; }
      return;
    }
    if (btn) btn.innerHTML = '🎁 +' + d.reward + ' талантов!';
    toast('🎁 +' + d.reward + ' талантов · серия ' + d.streak + ' 🔥', 'vip');
    try { if (window.marsSoundSynth && window.marsSoundSynth.play) window.marsSoundSynth.play('reward'); } catch(e){}
    spawnConfetti();
    setTimeout(async function(){
      await loadWallet(); writeCache(); updateBalanceUI(); await loadTx(); renderWalletTab();
    }, 900);
  } catch(e){
    toast('Ошибка: ' + e.message, 'error');
    if (btn){ btn.disabled = false; btn.innerHTML = orig; }
  }
};

function spawnConfetti(){
  var colors = ['#f5d76e','#f39c12','#6C63FF','#e74c3c','#27ae60','#e67e22'];
  for (var i = 0; i < 40; i++){
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;top:-20px;width:10px;height:14px;z-index:999999;pointer-events:none;border-radius:2px;';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.left = (Math.random() * 100) + 'vw';
    document.body.appendChild(el);
    var dur = 1800 + Math.random() * 1200;
    var drift = (Math.random() - 0.5) * 200;
    el.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: 'translate(' + drift + 'px,110vh) rotate(' + (720 + Math.random()*360) + 'deg)', opacity: 0.3 }
    ], { duration: dur, easing: 'cubic-bezier(.3,.7,.6,1)' }).onfinish = function(){ el.remove(); };
  }
}

/* ═══ ПОКУПКА ═══ */
window.pfBuyWithTalents = function(slug, price){
  var bg = document.createElement('div'); bg.className = 'pf-modal-bg';
  var m = document.createElement('div'); m.className = 'pf-modal';
  m.innerHTML = '<h3>🛒 Подтверждение</h3><p>Списать <b>' + price + ' 🪙 талантов</b>?</p>' +
    '<p style="font-size:.85rem;color:#888;">Баланс: <b>' + wallet.balance + '</b> талантов</p>' +
    '<div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" id="buy-c">Отмена</button>' +
    '<button class="pf-btn" id="buy-o">✅ Купить</button></div>';
  bg.appendChild(m); document.body.appendChild(bg);
  bg.addEventListener('click', function(e){ if (e.target === bg) bg.remove(); });
  m.querySelector('#buy-c').onclick = function(){ bg.remove(); };
  m.querySelector('#buy-o').onclick = async function(){
    var btn = m.querySelector('#buy-o'); btn.disabled = true; btn.textContent = '⏳...';
    try {
      var r = await sb().rpc('purchase_shop_item', { p_slug: slug });
      if (r.error) throw r.error;
      var d = r.data || {};
      if (!d.ok){ toast('⚠️ ' + (d.error || 'Не удалось'), 'error'); bg.remove(); return; }
      toast('✅ ' + d.product, 'vip'); spawnConfetti(); bg.remove();
      setTimeout(async function(){
        await loadWallet(); writeCache(); await loadTx(); updateBalanceUI(); renderWalletTab();
      }, 700);
    } catch(e){ toast('Ошибка: ' + e.message, 'error'); btn.disabled = false; btn.textContent = '✅ Купить'; }
  };
};

/* ═══ ВКЛАД В ГИЛЬДИЮ ═══ */
window.pfDonateGuild = function(guildId){
  var bg = document.createElement('div'); bg.className = 'pf-modal-bg';
  var m = document.createElement('div'); m.className = 'pf-modal';
  var max = Math.max(10, wallet.balance);
  var quick = [10, 50, 100, 500].filter(function(x){ return x <= wallet.balance; });
  if (wallet.balance >= 10 && quick.indexOf(wallet.balance) === -1) quick.push(wallet.balance);
  m.innerHTML = '<h3>💎 Вклад в гильдию</h3><p>У тебя <b>' + wallet.balance + '</b> талантов</p>' +
    '<input id="don-in" type="number" class="pf-modal-input" min="1" max="' + max + '" value="' + Math.min(50, max) + '">' +
    '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">' +
    quick.map(function(v){ return '<button type="button" class="pf-title-preset" data-don="' + v + '">' + v + ' 🪙</button>'; }).join('') +
    '</div><div class="pf-modal-actions"><button class="pf-btn pf-btn-outline" id="don-c">Отмена</button>' +
    '<button class="pf-btn" id="don-o">💎 Вложить</button></div>';
  bg.appendChild(m); document.body.appendChild(bg);
  bg.addEventListener('click', function(e){ if (e.target === bg) bg.remove(); });
  m.querySelector('#don-c').onclick = function(){ bg.remove(); };
  m.querySelectorAll('[data-don]').forEach(function(b){ b.onclick = function(){ m.querySelector('#don-in').value = b.dataset.don; }; });
  m.querySelector('#don-o').onclick = async function(){
    var amount = parseInt(m.querySelector('#don-in').value, 10);
    if (!amount || amount <= 0){ toast('Введите сумму', 'error'); return; }
    if (amount > wallet.balance){ toast('Недостаточно талантов', 'error'); return; }
    var btn = m.querySelector('#don-o'); btn.disabled = true; btn.textContent = '⏳...';
    try {
      var r = await sb().rpc('donate_to_guild', { p_guild_id: guildId, p_amount: amount });
      if (r.error) throw r.error;
      var d = r.data || {};
      if (!d.ok){ toast('⚠️ ' + (d.error || 'Не удалось'), 'error'); bg.remove(); return; }
      toast('💎 +' + amount + ' в банк гильдии!', 'vip'); spawnConfetti(); bg.remove();
      setTimeout(async function(){
        await loadWallet(); writeCache(); await loadTx(); updateBalanceUI(); renderWalletTab();
      }, 700);
    } catch(e){ toast('Ошибка: ' + e.message, 'error'); btn.disabled = false; btn.textContent = '💎 Вложить'; }
  };
};

/* ═══ ПРОМОКОД ═══ */
window.pfActivatePromo = async function(code){
  if (!code) return;
  var st = document.getElementById('vip-promo-st');
  var btn = document.getElementById('vip-promo-btn');
  if (st){ st.textContent = '⏳ Проверяем...'; st.style.color = '#999'; }
  if (btn) btn.disabled = true;
  try {
    var r = await sb().rpc('activate_promo', { p_code: String(code).trim().toUpperCase() });
    if (r.error) throw r.error;
    var d = r.data || {};
    if (!d.ok){ if (st){ st.textContent = '❌ ' + (d.error || 'Ошибка'); st.style.color = '#e74c3c'; } return; }
    if (st){ st.textContent = '✅ ' + d.product; st.style.color = '#27ae60'; }
    toast('👑 ' + d.product, 'vip'); spawnConfetti();
    setTimeout(async function(){
      await loadWallet(); writeCache(); await loadTx(); updateBalanceUI(); renderWalletTab();
      if (d.product && /VIP/i.test(d.product)) setTimeout(function(){ location.reload(); }, 1500);
    }, 700);
  } catch(e){ if (st){ st.textContent = '❌ ' + e.message; st.style.color = '#e74c3c'; } }
  finally { if (btn) btn.disabled = false; }
};

/* ═══ ОБНОВЛЕНИЕ БАЛАНСА В HERO ═══ */
function updateBalanceUI(){
  var el = document.querySelector('.pf-currency-click span');
  if (el) el.textContent = wallet.balance;
  var tabCount = document.querySelector('.pf-tab[data-tab="wallet"] .pf-tab-count');
  if (tabCount) tabCount.textContent = wallet.balance;
}

function isVIPActive(){
  var p = sess().profile;
  if (!p || !p.vip_until) return false;
  return new Date(p.vip_until).getTime() > Date.now();
}

/* ═══ РЕНДЕР КОШЕЛЬКА ═══ */
window.pfRenderWallet = function(){
  var isVIP = isVIPActive();
  var h = '';

  h += '<div class="pf-card' + (isVIP ? ' pf-card-vip' : '') + '" style="background:linear-gradient(135deg,#1a1a2e 0%,#2d1b3d 50%,#4a2a3a 100%);color:#fff;border:none;padding:32px 28px;text-align:center;">';
  h += '<div style="font-size:.75rem;letter-spacing:2px;text-transform:uppercase;opacity:.7;margin-bottom:8px;">Твой кошелёк</div>';
  h += '<div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:8px;">';
  h += '<img src="' + COIN + '" style="width:52px;height:52px;border-radius:50%;animation:pfCoin 3s ease-in-out infinite,pfCoinGlow 4s ease-in-out infinite;" onerror="this.style.display=\'none\'">';
  h += '<span id="pf-wallet-balance" style="font-size:3rem;font-weight:900;color:#ffdf5e;text-shadow:0 4px 20px rgba(243,156,18,.6);">' + wallet.balance + '</span>';
  h += '</div>';
  h += '<div style="font-size:.9rem;opacity:.75;margin-bottom:20px;">глиняных талантов</div>';
  h += '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">';
  h += '<a href="/shop/" class="pf-btn" style="background:linear-gradient(135deg,#f39c12,#e67e22);border:none;color:#fff;">🛒 Купить таланты</a>';
  h += '<button type="button" id="pf-daily-btn" class="pf-btn" style="background:linear-gradient(135deg,#27ae60,#16a085);border:none;color:#fff;" onclick="pfClaimDaily()">🎁 Ежедневка</button>';
  h += '</div>';
  h += '<div style="font-size:.78rem;opacity:.6;margin-top:14px;">Всего заработано: <b style="color:#ffdf5e;">' + wallet.total_earned + '</b> 🪙</div>';
  h += '</div>';

  var talentItems = shopItems.filter(function(i){ return i.price_talents && i.category !== 'vip'; });
  if (talentItems.length){
    h += '<div class="pf-card' + (isVIP ? ' pf-card-vip' : '') + '">';
    h += '<h3 class="pf-card-title"><span class="pf-ct-icon">🛍️</span> Потратить таланты</h3>';
    h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;">';
    talentItems.forEach(function(it){
      var canBuy = wallet.balance >= it.price_talents;
      h += '<div style="padding:14px;border:2px solid ' + (canBuy ? 'rgba(243,156,18,.4)' : 'rgba(0,0,0,.1)') + ';border-radius:14px;background:' + (canBuy ? 'linear-gradient(135deg,#fffbf0,#fff)' : '#f9f9fb') + ';">';
      h += '<div style="font-size:1.8rem;text-align:center;margin-bottom:6px;">' + (it.icon || '🎁') + '</div>';
      h += '<div style="font-weight:800;font-size:.9rem;text-align:center;margin-bottom:4px;">' + esc(it.name) + '</div>';
      h += '<div style="font-size:.72rem;color:#888;text-align:center;margin-bottom:10px;min-height:2.4em;">' + esc(it.description || '') + '</div>';
      h += '<div style="text-align:center;font-weight:900;color:#e67e22;font-size:1.1rem;margin-bottom:8px;">' + it.price_talents + ' 🪙</div>';
      if (canBuy){
        h += '<button class="pf-btn" style="width:100%;justify-content:center;background:linear-gradient(135deg,#f39c12,#e67e22);border:none;color:#fff;font-size:.8rem;padding:8px 12px;" onclick="pfBuyWithTalents(\'' + esc(it.slug) + '\',' + it.price_talents + ')">Купить</button>';
      } else {
        h += '<button class="pf-btn" style="width:100%;justify-content:center;font-size:.8rem;padding:8px 12px;" disabled>Не хватает</button>';
      }
      h += '</div>';
    });
    h += '</div></div>';
  }

  h += '<div class="pf-card' + (isVIP ? ' pf-card-vip' : '') + '">';
  h += '<h3 class="pf-card-title"><span class="pf-ct-icon">📜</span> Последние операции</h3>';
  if (!txs.length){
    h += '<p style="text-align:center;color:#888;padding:30px;">Пока нет операций</p>';
  } else {
    h += '<div style="display:flex;flex-direction:column;gap:6px;">';
    txs.forEach(function(t){
      var pos = t.amount > 0;
      h += '<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:' + (pos ? 'rgba(39,174,96,.06)' : 'rgba(231,76,60,.06)') + ';border-radius:10px;">';
      h += '<div style="width:34px;height:34px;border-radius:50%;background:' + (pos ? 'linear-gradient(135deg,#27ae60,#16a085)' : 'linear-gradient(135deg,#e74c3c,#c0392b)') + ';display:flex;align-items:center;justify-content:center;font-size:1rem;color:#fff;flex-shrink:0;">' + (pos ? '↓' : '↑') + '</div>';
      h += '<div style="flex:1;min-width:0;"><div style="font-weight:700;font-size:.86rem;color:#1a1a2e;">' + fmtTxType(t.type) + ' · ' + esc(fmtTxSource(t.source)) + '</div>';
      h += '<div style="font-size:.72rem;color:#888;">' + fmtDate(t.created_at) + ' · баланс: ' + t.balance_after + '</div></div>';
      h += '<div style="font-weight:900;font-size:1rem;color:' + (pos ? '#27ae60' : '#e74c3c') + ';flex-shrink:0;">' + (pos ? '+' : '') + t.amount + ' 🪙</div>';
      h += '</div>';
    });
    h += '</div>';
  }
  h += '</div>';
  return h;
};

/* ═══ ИНЖЕКТ ВКЛАДКИ ═══ */
function injectWalletTab(){
  var tabsWrap = document.getElementById('pf-tabs');
  if (!tabsWrap) return false;
  if (document.querySelector('.pf-tab[data-tab="wallet"]')) return true;

  var guildTab = tabsWrap.querySelector('.pf-tab[data-tab="guild"]');
  var btn = document.createElement('button');
  btn.className = 'pf-tab' + (isVIPActive() ? ' vip-tab' : '');
  btn.dataset.tab = 'wallet';
  btn.innerHTML = '💰 Кошелёк <span class="pf-tab-count">' + wallet.balance + '</span>';
  if (guildTab && guildTab.nextSibling) tabsWrap.insertBefore(btn, guildTab.nextSibling);
  else tabsWrap.appendChild(btn);

  var guildContent = document.querySelector('.pf-tab-content[data-content="guild"]');
  if (!guildContent) return false;
  var content = document.createElement('div');
  content.className = 'pf-tab-content';
  content.dataset.content = 'wallet';
  content.innerHTML = pfRenderWallet();
  if (guildContent.nextSibling) guildContent.parentNode.insertBefore(content, guildContent.nextSibling);
  else guildContent.parentNode.appendChild(content);

  btn.addEventListener('click', function(){
    document.querySelectorAll('.pf-tab').forEach(function(t){ t.classList.toggle('active', t === btn); });
    document.querySelectorAll('.pf-tab-content').forEach(function(c){
      c.classList.toggle('active', c.dataset.content === 'wallet');
    });
    try { localStorage.setItem('mars-profile-tab-v6', 'wallet'); } catch(e){}
  });
  return true;
}

function renderWalletTab(){
  var c = document.querySelector('.pf-tab-content[data-content="wallet"]');
  if (!c) return;
  c.innerHTML = pfRenderWallet();
  var active = c.classList.contains('active');
  if (!active) c.classList.remove('active');  // сохраняем состояние
}

/* ═══ ВКЛАД В ГИЛЬДИЮ ═══ */
function injectGuildDonate(){
  var c = document.querySelector('.pf-tab-content[data-content="guild"]');
  if (!c || c.querySelector('.pf-guild-donate')) return;
  var id = uid(); if (!id) return;
  sb().from('guild_members').select('guild_id').eq('user_id', id).maybeSingle().then(function(r){
    if (!r.data || !r.data.guild_id) return;
    var donate = document.createElement('div');
    donate.className = 'pf-card pf-guild-donate' + (isVIPActive() ? ' pf-card-vip' : '');
    donate.innerHTML = '<h3 class="pf-card-title"><span class="pf-ct-icon">💎</span> Поддержать гильдию</h3>' +
      '<p style="color:#666;font-size:.88rem;margin:0 0 14px;">Вложи таланты в банк гильдии.</p>' +
      '<button type="button" class="pf-btn" style="width:100%;justify-content:center;background:linear-gradient(135deg,#f39c12,#e67e22);border:none;color:#fff;" onclick="pfDonateGuild(' + r.data.guild_id + ')">💎 Вложить таланты</button>' +
      '<div style="text-align:center;font-size:.78rem;color:#888;margin-top:10px;">Баланс: <b>' + wallet.balance + ' 🪙</b></div>';
    c.appendChild(donate);
  });
}

/* ═══ ПЕРЕХВАТ ПРОМОКОДА ═══ */
function hijackPromo(){
  var btn = document.getElementById('vip-promo-btn');
  var inp = document.getElementById('vip-promo-in');
  if (!btn || !inp || inp.dataset.pfHijacked === '1') return;
  inp.dataset.pfHijacked = '1';
  var newBtn = btn.cloneNode(true); btn.parentNode.replaceChild(newBtn, btn);
  var newInp = inp.cloneNode(true); inp.parentNode.replaceChild(newInp, inp);
  newInp.dataset.pfHijacked = '1';
  newBtn.addEventListener('click', function(){ window.pfActivatePromo(newInp.value); });
  newInp.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){ e.preventDefault(); window.pfActivatePromo(newInp.value); }
  });
}

/* ═══ ГЛАВНЫЙ ЦИКЛ ═══ */
var injected = false;

async function onProfileRendered(){
  if (!uid()) return;

  /* 1. Мгновенно — из кэша */
  if (!injected){
    var c = readCache();
    if (c){ wallet.balance = c.balance; wallet.total_earned = c.total_earned; }
    if (injectWalletTab()) injected = true;
    updateBalanceUI();
    injectGuildDonate();
    hijackPromo();
  }

  /* 2. Фоново — свежие данные */
  if (!loadedOnce){
    loadedOnce = true;
    await Promise.all([loadWallet(), loadTx(), loadShop()]);
  } else {
    await Promise.all([loadWallet(), loadTx()]);
  }
  writeCache();
  if (injected) renderWalletTab();
  updateBalanceUI();
  injectGuildDonate();
  hijackPromo();
}

/* ═══ ТРИГГЕРЫ ═══ */
window.addEventListener('pfRendered', function(){ onProfileRendered(); });

/* MutationObserver — ловим появление вкладок даже без события */
if (window.MutationObserver){
  var obs = new MutationObserver(function(){
    if (document.getElementById('pf-tabs')){
      obs.disconnect();
      onProfileRendered();
    }
  });
  obs.observe(document.body, {childList: true, subtree: true});
  setTimeout(function(){ obs.disconnect(); }, 15000);
}

/* Fallback */
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
function boot(){
  setTimeout(function(){
    if (document.getElementById('pf-tabs')) onProfileRendered();
  }, 400);
}

console.log('💰 profile-economy.js v2 загружен');
})();
