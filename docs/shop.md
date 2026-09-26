---
title: Магазин
description: Купить глиняные таланты и VIP-статус для Марсианской энциклопедии
comments: false
hide:
  - navigation
  - toc
---

<div id="shop-app">

<!-- HERO -->
<div class="sh-hero sh-observe">
  <div class="sh-hero-bg"></div>
  <div class="sh-hero-stars">
    <div class="sh-star"></div><div class="sh-star"></div><div class="sh-star"></div>
    <div class="sh-star"></div><div class="sh-star"></div><div class="sh-star"></div>
    <div class="sh-star"></div><div class="sh-star"></div><div class="sh-star"></div>
    <div class="sh-star"></div><div class="sh-star"></div><div class="sh-star"></div>
  </div>
  <div class="sh-hero-content">
    <div class="sh-hero-tag">Магазин · Марсианская энциклопедия</div>
    <div class="sh-hero-icon">🛒</div>
    <h1 class="sh-hero-title">Магазин</h1>
    <p class="sh-hero-sub">
      Поддержи проект и получи больше возможностей. Все платежи безопасны через ЮKassa.
    </p>
    <div class="sh-hero-meta">
      <span class="sh-meta-item">🔒 Безопасно</span>
      <span class="sh-meta-item">⚡ Мгновенно</span>
      <span class="sh-meta-item">💳 Карты · СБП · T-Pay</span>
    </div>
  </div>
</div>

<!-- ПРОФИЛЬ (если залогинен) -->
<div class="sh-profile sh-observe" id="sh-profile" style="display:none;">
  <div class="sh-profile-inner">
    <div class="sh-profile-avatar">
      <img id="sh-avatar" src="" alt="" onerror="this.style.display='none'">
    </div>
    <div class="sh-profile-info">
      <div class="sh-profile-name" id="sh-name">Загрузка...</div>
      <div class="sh-profile-balance">
        <img src="/assets/images/guild-coin.jpg" alt="🪙" class="sh-coin-icon" onerror="this.replaceWith(document.createTextNode('🪙'))">
        <span id="sh-talents">0</span> <span class="sh-balance-label">талантов</span>
      </div>
      <div class="sh-profile-vip" id="sh-vip-status" style="display:none;">
        👑 VIP активен · до <span id="sh-vip-until"></span>
      </div>
    </div>
  </div>
</div>

<!-- ПРЕДУПРЕЖДЕНИЕ (если НЕ залогинен) -->
<div class="sh-warning sh-observe" id="sh-warning" style="display:none;">
  <div class="sh-warning-icon">🔒</div>
  <div class="sh-warning-body">
    <div class="sh-warning-title">Войди, чтобы купить</div>
    <div class="sh-warning-text">
      Для покупки нужен аккаунт — так мы знаем, кому выдать товар.
    </div>
    <a href="/login/" class="sh-warning-btn">🔐 Войти</a>
  </div>
</div>

<!-- ВКЛАДКИ -->
<div class="sh-tabs sh-observe">
  <button class="sh-tab active" data-cat="all" type="button">🌐 Все товары</button>
  <button class="sh-tab" data-cat="talents" type="button">🪙 Таланты</button>
  <button class="sh-tab" data-cat="vip" type="button">👑 VIP-статус</button>
</div>

<!-- КАТАЛОГ -->
<div class="sh-catalog sh-observe">
  <div class="sh-grid" id="sh-grid"></div>
</div>

<!-- ПОДДЕРЖКА -->
<div class="sh-support sh-observe">
  <div class="sh-support-icon">💬</div>
  <div class="sh-support-body">
    <div class="sh-support-title">Возникли проблемы?</div>
    <div class="sh-support-text">
      Напиши на <a href="mailto:mars-wiki@yandex.ru">mars-wiki@yandex.ru</a> —
      поможем с оплатой, возвратом или выдачей.
    </div>
  </div>
</div>

<!-- МОДАЛКА ПОДТВЕРЖДЕНИЯ -->
<div class="sh-modal-bg" id="sh-modal" style="display:none;">
  <div class="sh-modal">
    <button class="sh-modal-close" type="button" onclick="shCloseModal()">✕</button>
    <div class="sh-modal-icon" id="sh-modal-icon">🪙</div>
    <div class="sh-modal-title" id="sh-modal-title">Товар</div>
    <div class="sh-modal-price" id="sh-modal-price">990 ₽</div>
    <div class="sh-modal-desc" id="sh-modal-desc">Описание</div>
    <div class="sh-modal-field">
      <label for="sh-modal-email">Email для чека</label>
      <input type="email" id="sh-modal-email" placeholder="your@email.com" autocomplete="email">
    </div>
    <div class="sh-modal-actions">
      <button class="sh-btn-secondary" type="button" onclick="shCloseModal()">Отмена</button>
      <button class="sh-btn-primary" type="button" id="sh-modal-buy">💳 Перейти к оплате</button>
    </div>
    <div class="sh-modal-note">🔒 Безопасная оплата через ЮKassa</div>
  </div>
</div>

<!-- 4 СКРЫТЫЕ ФОРМЫ ЮKASSA -->
<link rel="stylesheet" href="https://yookassa.ru/integration/simplepay/css/yookassa_construct_form.css?v=1.35.0">
<div id="sh-forms" style="position:absolute;left:-9999px;top:-9999px;">

  <!-- ФОРМА 1: 100 ТАЛАНТОВ (90 ₽) -->
  <form target="_blank" class="yoomoney-payment-form sh-ym-form" id="sh-form-100" action="https://yookassa.ru/integration/simplepay/payment" method="post" accept-charset="utf-8">
    <div class="ym-products"><div class="ym-product">
      <input type="hidden" name="text" value="100 глиняных талантов">
      <input type="hidden" name="price" value="90">
      <input type="hidden" name="quantity" value="1">
      <input type="hidden" name="paymentSubjectType" value="service">
      <input type="hidden" name="paymentMethodType" value="full_prepayment">
      <input type="hidden" name="tax" value="1">
    </div></div>
    <input type="hidden" name="ym_merchant_receipt" value="">
    <input name="cps_email" type="hidden" value="">
    <input name="shopSuccessURL" type="hidden" value="https://mars-wiki.ru/payment-success/">
    <input name="shopFailURL" type="hidden" value="https://mars-wiki.ru/payment-error/">
    <input name="customerNumber" type="hidden" value="">
    <input name="sum" type="hidden" value="90">
    <input name="shopId" type="hidden" value="1474664">
  </form>

  <!-- ФОРМА 2: 500 ТАЛАНТОВ (290 ₽) -->
  <form target="_blank" class="yoomoney-payment-form sh-ym-form" id="sh-form-500" action="https://yookassa.ru/integration/simplepay/payment" method="post" accept-charset="utf-8">
    <div class="ym-products"><div class="ym-product">
      <input type="hidden" name="text" value="500 глиняных талантов">
      <input type="hidden" name="price" value="290">
      <input type="hidden" name="quantity" value="1">
      <input type="hidden" name="paymentSubjectType" value="service">
      <input type="hidden" name="paymentMethodType" value="full_prepayment">
      <input type="hidden" name="tax" value="1">
    </div></div>
    <input type="hidden" name="ym_merchant_receipt" value="">
    <input name="cps_email" type="hidden" value="">
    <input name="shopSuccessURL" type="hidden" value="https://mars-wiki.ru/payment-success/">
    <input name="shopFailURL" type="hidden" value="https://mars-wiki.ru/payment-error/">
    <input name="customerNumber" type="hidden" value="">
    <input name="sum" type="hidden" value="290">
    <input name="shopId" type="hidden" value="1474664">
  </form>

  <!-- ФОРМА 3: 1000 ТАЛАНТОВ (490 ₽) -->
  <form target="_blank" class="yoomoney-payment-form sh-ym-form" id="sh-form-1000" action="https://yookassa.ru/integration/simplepay/payment" method="post" accept-charset="utf-8">
    <div class="ym-products"><div class="ym-product">
      <input type="hidden" name="text" value="1000 глиняных талантов">
      <input type="hidden" name="price" value="490">
      <input type="hidden" name="quantity" value="1">
      <input type="hidden" name="paymentSubjectType" value="service">
      <input type="hidden" name="paymentMethodType" value="full_prepayment">
      <input type="hidden" name="tax" value="1">
    </div></div>
    <input type="hidden" name="ym_merchant_receipt" value="">
    <input name="cps_email" type="hidden" value="">
    <input name="shopSuccessURL" type="hidden" value="https://mars-wiki.ru/payment-success/">
    <input name="shopFailURL" type="hidden" value="https://mars-wiki.ru/payment-error/">
    <input name="customerNumber" type="hidden" value="">
    <input name="sum" type="hidden" value="490">
    <input name="shopId" type="hidden" value="1474664">
  </form>

  <!-- ФОРМА 4: VIP 12 МЕСЯЦЕВ (990 ₽) -->
  <form target="_blank" class="yoomoney-payment-form sh-ym-form" id="sh-form-vip" action="https://yookassa.ru/integration/simplepay/payment" method="post" accept-charset="utf-8">
    <div class="ym-products"><div class="ym-product">
      <input type="hidden" name="text" value="VIP-подписка на 12 месяцев">
      <input type="hidden" name="price" value="990">
      <input type="hidden" name="quantity" value="1">
      <input type="hidden" name="paymentSubjectType" value="service">
      <input type="hidden" name="paymentMethodType" value="full_prepayment">
      <input type="hidden" name="tax" value="1">
    </div></div>
    <input type="hidden" name="ym_merchant_receipt" value="">
    <input name="cps_email" type="hidden" value="">
    <input name="shopSuccessURL" type="hidden" value="https://mars-wiki.ru/payment-success/">
    <input name="shopFailURL" type="hidden" value="https://mars-wiki.ru/payment-error/">
    <input name="customerNumber" type="hidden" value="">
    <input name="sum" type="hidden" value="990">
    <input name="shopId" type="hidden" value="1474664">
  </form>

</div>

</div>

<style>
/* ═══ ROOT ═══ */
#shop-app{
  --sh-gold:#f5d76e; --sh-gold-dark:#d4af37; --sh-orange:#f39c12;
  --sh-purple:#6C63FF; --sh-dark:#1a1a2e;
  max-width:1080px; margin:0 auto; padding:0 8px 60px;
  font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
  color:#1a1a2e; line-height:1.6;
  -webkit-tap-highlight-color:transparent;
}
#shop-app *{box-sizing:border-box}
#shop-app a{text-decoration:none!important;border-bottom:none!important}

@keyframes shSpin{to{transform:rotate(360deg)}}
@keyframes shFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes shFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes shStar{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
@keyframes shShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes shPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes shCoinSpin{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}
@keyframes shModalIn{from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}

.sh-observe{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1)}
.sh-observe.sh-visible{opacity:1;transform:translateY(0)}

/* ═══ HERO ═══ */
.sh-hero{
  position:relative; border-radius:26px; padding:56px 32px; color:#fff;
  margin-bottom:24px; overflow:hidden; text-align:center; min-height:340px;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 30px 90px -20px rgba(0,0,0,.55); isolation:isolate;
}
.sh-hero-bg{
  position:absolute; inset:0; z-index:0;
  background:
    radial-gradient(circle at 20% 30%,rgba(245,215,110,.25),transparent 55%),
    radial-gradient(circle at 80% 70%,rgba(108,99,255,.25),transparent 55%),
    linear-gradient(135deg,#0a0f1e 0%,#1a1a2e 40%,#2d1b3d 70%,#4a2a1a 100%);
}
.sh-hero-stars{position:absolute; inset:0; pointer-events:none; z-index:2}
.sh-star{position:absolute; width:2px; height:2px; background:#fff; border-radius:50%; box-shadow:0 0 6px #fff; animation:shStar 3.5s ease-in-out infinite}
.sh-star:nth-child(1){top:12%;left:8%}
.sh-star:nth-child(2){top:22%;left:18%;animation-delay:.4s;width:1.5px;height:1.5px}
.sh-star:nth-child(3){top:68%;left:12%;animation-delay:.9s}
.sh-star:nth-child(4){top:32%;left:82%;animation-delay:1.4s}
.sh-star:nth-child(5){top:78%;left:88%;animation-delay:.6s;width:1.5px;height:1.5px}
.sh-star:nth-child(6){top:18%;left:62%;animation-delay:1.1s}
.sh-star:nth-child(7){top:52%;left:44%;animation-delay:.3s}
.sh-star:nth-child(8){top:42%;left:94%;animation-delay:1.8s}
.sh-star:nth-child(9){top:84%;left:28%;animation-delay:2.1s}
.sh-star:nth-child(10){top:8%;left:38%;animation-delay:1.5s}
.sh-star:nth-child(11){top:64%;left:66%;animation-delay:.7s}
.sh-star:nth-child(12){top:28%;left:22%;animation-delay:1.9s;width:1.5px;height:1.5px}

.sh-hero-content{position:relative; z-index:3; max-width:640px}
.sh-hero-tag{
  display:inline-block; padding:7px 18px; border-radius:22px;
  background:rgba(245,215,110,.18); border:1px solid rgba(245,215,110,.5);
  color:#ffdf5e; font-size:.75rem; font-weight:800;
  letter-spacing:1.5px; text-transform:uppercase; margin-bottom:16px;
  backdrop-filter:blur(10px);
}
.sh-hero-icon{
  display:inline-block; font-size:4rem; margin-bottom:12px;
  animation:shFloat 4s ease-in-out infinite;
  filter:drop-shadow(0 8px 32px rgba(245,215,110,.6)); line-height:1;
}
.sh-hero-title{
  font-size:2.4rem; font-weight:900; margin:0 0 14px; letter-spacing:-.6px;
  background:linear-gradient(90deg,#fff,#ffdf5e,#fff,#ffdf5e,#fff);
  background-size:200% auto;
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  animation:shShine 5s linear infinite;
  text-shadow:0 4px 20px rgba(0,0,0,.5);
}
.sh-hero-sub{font-size:1rem; opacity:.92; margin:0 0 22px; line-height:1.6}
.sh-hero-meta{display:flex; justify-content:center; gap:10px; flex-wrap:wrap}
.sh-meta-item{
  display:inline-flex; align-items:center; gap:6px;
  padding:8px 16px; border-radius:22px;
  background:rgba(255,255,255,.1); backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.2);
  font-size:.8rem; font-weight:700; color:#fff;
}

/* ═══ PROFILE ═══ */
.sh-profile{
  margin-bottom:20px; padding:16px 20px;
  background:linear-gradient(135deg,#fff 0%,#fafbfd 100%);
  border-radius:18px; border:2px solid rgba(245,215,110,.3);
  box-shadow:0 8px 24px rgba(245,215,110,.15);
}
.sh-profile-inner{display:flex; align-items:center; gap:16px; flex-wrap:wrap}
.sh-profile-avatar{
  width:56px; height:56px; border-radius:50%; flex-shrink:0; overflow:hidden;
  background:linear-gradient(135deg,#f5d76e,#f39c12);
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 4px 12px rgba(243,156,18,.4);
}
.sh-profile-avatar img{width:100%; height:100%; object-fit:cover; display:block}
.sh-profile-info{flex:1; min-width:180px}
.sh-profile-name{font-size:1.05rem; font-weight:900; color:#1a1a2e; margin-bottom:4px}
.sh-profile-balance{display:flex; align-items:center; gap:6px; font-size:.95rem; font-weight:800; color:#e67e22}
.sh-coin-icon{width:22px; height:22px; border-radius:50%; object-fit:cover; box-shadow:0 0 0 2px #f5d76e; animation:shCoinSpin 3s linear infinite}
.sh-balance-label{font-size:.82rem; color:#888; font-weight:700}
.sh-profile-vip{
  margin-top:4px; font-size:.82rem; font-weight:800; color:#e67e22;
  display:inline-block; padding:3px 12px; border-radius:20px;
  background:linear-gradient(135deg,rgba(245,215,110,.2),rgba(243,156,18,.1));
  border:1px solid rgba(245,215,110,.5);
}

/* ═══ WARNING ═══ */
.sh-warning{
  display:flex; gap:14px; align-items:center;
  padding:18px 22px; margin-bottom:20px;
  background:linear-gradient(135deg,rgba(108,99,255,.08),rgba(162,155,254,.04));
  border-left:4px solid #6C63FF; border-radius:14px;
}
.sh-warning-icon{font-size:2rem; flex-shrink:0; line-height:1}
.sh-warning-body{flex:1; min-width:180px}
.sh-warning-title{font-size:1rem; font-weight:900; color:#333; margin-bottom:4px}
.sh-warning-text{font-size:.85rem; color:#666; margin-bottom:10px}
.sh-warning-btn{
  display:inline-block; padding:10px 22px; border-radius:30px;
  background:linear-gradient(135deg,#6C63FF,#A29BFE);
  color:#fff; font-weight:900; font-size:.85rem;
  text-decoration:none;
  box-shadow:0 8px 20px -4px rgba(108,99,255,.4);
}

/* ═══ TABS ═══ */
.sh-tabs{display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px}
.sh-tab{
  padding:12px 22px; border-radius:14px;
  border:2px solid rgba(0,0,0,.06);
  background:#fff; color:#666; font-size:.9rem; font-weight:800;
  cursor:pointer; font-family:inherit;
  transition:all .25s cubic-bezier(.16,1,.3,1);
}
.sh-tab:hover{background:rgba(245,215,110,.1); color:#333}
.sh-tab.active{
  background:linear-gradient(135deg,#f5d76e,#f39c12);
  color:#1a1a2e; border-color:transparent;
  box-shadow:0 8px 20px -4px rgba(243,156,18,.5);
}

/* ═══ CATALOG ═══ */
.sh-catalog{margin-bottom:40px}
.sh-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
  gap:16px;
}

/* ═══ CARD ═══ */
.sh-card{
  position:relative; background:#fff; border-radius:22px;
  border:2px solid rgba(0,0,0,.06); padding:24px 20px 20px;
  display:flex; flex-direction:column;
  transition:all .35s cubic-bezier(.16,1,.3,1);
  overflow:hidden;
  animation:shFadeIn .4s ease both;
}
.sh-card::before{
  content:''; position:absolute; top:0; left:0; right:0; height:5px;
  background:var(--card-color,#f39c12);
  opacity:.85; transition:opacity .3s;
}
.sh-card:hover{
  transform:translateY(-6px);
  box-shadow:0 24px 56px -16px var(--card-color,rgba(243,156,18,.5));
  border-color:var(--card-color,#f39c12);
}
.sh-card:hover::before{opacity:1}
.sh-card.sh-card-vip{border-color:rgba(245,215,110,.5)}
.sh-card.sh-card-vip::before{background:linear-gradient(90deg,#f5d76e,#e67e22,#f5d76e); background-size:200% auto; animation:shShine 3s linear infinite}

.sh-card-badge{
  position:absolute; top:14px; right:14px;
  padding:4px 12px; border-radius:14px;
  font-size:.68rem; font-weight:900; letter-spacing:.5px;
  text-transform:uppercase; z-index:2;
}
.sh-card-badge.hit{background:linear-gradient(135deg,#e74c3c,#c0392b); color:#fff}
.sh-card-badge.best{background:linear-gradient(135deg,#27ae60,#16a085); color:#fff}
.sh-card-badge.max{background:linear-gradient(135deg,#9b59b6,#8e44ad); color:#fff}
.sh-card-badge.vip{background:linear-gradient(135deg,#f5d76e,#f39c12); color:#1a1a2e}

.sh-card-icon{
  font-size:4rem; text-align:center; margin:8px 0 12px;
  line-height:1; filter:drop-shadow(0 8px 20px rgba(0,0,0,.15));
  animation:shFloat 3.5s ease-in-out infinite;
}
.sh-card-icon img{
  width:80px; height:80px; border-radius:50%; object-fit:cover;
  box-shadow:0 0 0 4px #f5d76e,0 8px 24px rgba(245,215,110,.5);
  animation:shCoinSpin 3s linear infinite;
  display:inline-block;
}

.sh-card-title{
  font-size:1.05rem; font-weight:900; color:#1a1a2e;
  text-align:center; margin-bottom:6px; letter-spacing:-.2px;
}
.sh-card-desc{
  font-size:.85rem; color:#666; text-align:center;
  line-height:1.5; margin-bottom:14px; min-height:48px;
}

.sh-card-features{
  list-style:none; padding:0; margin:0 0 16px;
  border-top:1px dashed rgba(0,0,0,.08); padding-top:12px;
  flex:1;
}
.sh-card-features li{
  display:flex; gap:8px; align-items:flex-start;
  font-size:.82rem; color:#555; line-height:1.5;
  margin-bottom:6px;
}
.sh-card-features li::before{
  content:'✓'; color:#27ae60; font-weight:900; flex-shrink:0;
}

.sh-card-price{
  display:flex; align-items:center; justify-content:center; gap:8px;
  margin-bottom:14px; flex-wrap:wrap;
}
.sh-price-current{
  font-size:1.8rem; font-weight:900;
  background:linear-gradient(135deg,#e67e22,#f39c12);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text; line-height:1;
}
.sh-price-old{
  font-size:.95rem; color:#999; text-decoration:line-through;
  font-weight:700;
}
.sh-price-save{
  font-size:.72rem; padding:3px 10px; border-radius:12px;
  background:linear-gradient(135deg,#e74c3c,#c0392b);
  color:#fff; font-weight:900;
}

.sh-card-btn{
  display:flex; align-items:center; justify-content:center; gap:8px;
  padding:14px 20px; border-radius:40px;
  border:none; cursor:pointer; font-family:inherit;
  font-weight:900; font-size:.95rem;
  background:linear-gradient(135deg,#f5d76e,#f39c12);
  color:#1a1a2e;
  box-shadow:0 10px 24px -4px rgba(243,156,18,.5);
  transition:all .3s cubic-bezier(.16,1,.3,1);
  position:relative; overflow:hidden;
}
.sh-card-btn::before{
  content:''; position:absolute; inset:0;
  background:linear-gradient(120deg,transparent,rgba(255,255,255,.5),transparent);
  transform:translateX(-100%); transition:transform .6s;
}
.sh-card-btn:hover::before{transform:translateX(100%)}
.sh-card-btn:hover{transform:translateY(-3px); box-shadow:0 16px 32px -6px rgba(243,156,18,.7)}
.sh-card-btn:active{transform:translateY(0) scale(.98)}
.sh-card-btn:disabled{
  opacity:.5; cursor:not-allowed; transform:none!important;
  background:#ccc; color:#666; box-shadow:none;
}

/* ═══ SUPPORT ═══ */
.sh-support{
  display:flex; gap:14px; align-items:center;
  padding:18px 22px; margin-top:40px;
  background:linear-gradient(135deg,rgba(108,99,255,.08),rgba(162,155,254,.04));
  border-left:4px solid #6C63FF; border-radius:14px;
}
.sh-support-icon{font-size:2rem; flex-shrink:0}
.sh-support-body{flex:1}
.sh-support-title{font-weight:900; margin-bottom:4px; color:#333}
.sh-support-text{font-size:.88rem; color:#666; line-height:1.55}
.sh-support-text a{color:#6C63FF; font-weight:800; text-decoration:underline!important}

/* ═══ MODAL ═══ */
.sh-modal-bg{
  position:fixed; inset:0; z-index:2147483644;
  background:rgba(10,10,26,.75);
  backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
  display:flex; align-items:center; justify-content:center;
  padding:20px; animation:shFadeIn .3s ease;
}
.sh-modal{
  position:relative; background:#fff; border-radius:24px;
  padding:34px 28px 26px; max-width:440px; width:100%;
  text-align:center;
  box-shadow:0 30px 80px rgba(0,0,0,.5),0 0 0 2px rgba(245,215,110,.4) inset;
  animation:shModalIn .4s cubic-bezier(.16,1,.3,1);
}
.sh-modal-close{
  position:absolute; top:12px; right:14px;
  width:34px; height:34px; border-radius:50%;
  background:rgba(0,0,0,.06); border:none; cursor:pointer;
  font-family:inherit; font-size:1rem; color:#666;
  display:flex; align-items:center; justify-content:center;
  transition:all .2s;
}
.sh-modal-close:hover{background:rgba(0,0,0,.12); transform:rotate(90deg)}
.sh-modal-icon{
  font-size:3.5rem; margin-bottom:10px; line-height:1;
  animation:shPulse 2s ease-in-out infinite;
}
.sh-modal-icon img{
  width:80px; height:80px; border-radius:50%; object-fit:cover;
  box-shadow:0 0 0 4px #f5d76e,0 8px 24px rgba(245,215,110,.5);
  animation:shCoinSpin 3s linear infinite;
  display:inline-block;
}
.sh-modal-title{font-size:1.3rem; font-weight:900; color:#1a1a2e; margin-bottom:6px; letter-spacing:-.3px}
.sh-modal-price{
  font-size:2rem; font-weight:900; margin-bottom:12px;
  background:linear-gradient(135deg,#e67e22,#f39c12);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
}
.sh-modal-desc{font-size:.88rem; color:#666; line-height:1.5; margin-bottom:18px}
.sh-modal-field{text-align:left; margin-bottom:16px}
.sh-modal-field label{
  display:block; font-size:.78rem; font-weight:800;
  color:#555; margin-bottom:6px;
  text-transform:uppercase; letter-spacing:.5px;
}
.sh-modal-field input{
  width:100%; padding:12px 16px; border-radius:12px;
  border:2px solid #e8eaf0; font-family:inherit; font-size:.95rem;
  outline:none; background:#fafafa;
  transition:all .2s;
}
.sh-modal-field input:focus{border-color:#f39c12; background:#fff; box-shadow:0 0 0 4px rgba(243,156,18,.15)}
.sh-modal-actions{display:flex; gap:10px; margin-bottom:14px}
.sh-btn-secondary{
  flex:1; padding:13px 18px; border-radius:14px;
  border:2px solid rgba(0,0,0,.08); background:#fff;
  color:#666; font-weight:900; font-size:.9rem;
  cursor:pointer; font-family:inherit;
  transition:all .2s;
}
.sh-btn-secondary:hover{background:#f5f5f5}
.sh-btn-primary{
  flex:2; padding:13px 18px; border-radius:14px;
  border:none; background:linear-gradient(135deg,#f5d76e,#f39c12);
  color:#1a1a2e; font-weight:900; font-size:.9rem;
  cursor:pointer; font-family:inherit;
  box-shadow:0 8px 20px -4px rgba(243,156,18,.5);
  transition:all .25s;
}
.sh-btn-primary:hover{transform:translateY(-2px); box-shadow:0 12px 26px -4px rgba(243,156,18,.7)}
.sh-btn-primary:active{transform:translateY(0) scale(.98)}
.sh-btn-primary:disabled{opacity:.5; cursor:wait; transform:none}
.sh-modal-note{font-size:.72rem; color:#999; font-weight:700}

/* ═══ MOBILE ═══ */
@media (max-width:600px){
  .sh-hero{padding:40px 20px; border-radius:20px; min-height:280px}
  .sh-hero-title{font-size:1.7rem}
  .sh-hero-sub{font-size:.92rem}
  .sh-hero-icon{font-size:3rem}
  .sh-meta-item{padding:6px 12px; font-size:.72rem}
  .sh-grid{grid-template-columns:1fr; gap:12px}
  .sh-card{padding:20px 16px 16px; border-radius:18px}
  .sh-card-icon{font-size:3.2rem}
  .sh-card-icon img{width:64px; height:64px}
  .sh-card-title{font-size:.95rem}
  .sh-card-desc{font-size:.8rem; min-height:auto}
  .sh-price-current{font-size:1.6rem}
  .sh-tab{padding:10px 16px; font-size:.82rem}
  .sh-modal{padding:28px 20px 22px; border-radius:20px}
  .sh-modal-title{font-size:1.15rem}
  .sh-modal-price{font-size:1.7rem}
  .sh-modal-icon{font-size:3rem}
  .sh-modal-icon img{width:64px; height:64px}
}

@media (prefers-reduced-motion: reduce){
  #shop-app *,#shop-app *::before,#shop-app *::after{
    animation-duration:.01ms!important; animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
  .sh-observe{opacity:1; transform:none}
}

/* Скрываем дефолтные стили ЮKassa на нашей странице */
#sh-forms .yoomoney-payment-form,
#sh-forms .ym-products,
#sh-forms .ym-customer-info,
#sh-forms .ym-payment-btn-block{display:none!important}
</style>

<script>
(function(){
'use strict';
if (window.__shopLoaded) return;
window.__shopLoaded = true;

/* ═══════════════════ SUPABASE ═══════════════════ */
var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var sb = null;
try {
  if (window.supabaseClient && window.supabaseClient.auth) sb = window.supabaseClient;
  else if (window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch(e){ console.warn('[shop] Supabase init', e); }

/* ═══════════════════ ТОВАРЫ ═══════════════════ */
var PRODUCTS = [
  {
    id: 'sh-form-100',
    formId: 'sh-form-100',
    category: 'talents',
    icon: '🪙',
    iconImg: '/assets/images/guild-coin.jpg',
    title: '100 глиняных талантов',
    desc: 'Стартовый набор валюты для покупки функций на сайте',
    features: [
      'Мгновенное зачисление',
      'Используется на сайте',
      'Не обменивается обратно'
    ],
    price: 90,
    oldPrice: 150,
    discount: '−40%',
    badge: null,
    color: '#f39c12'
  },
  {
    id: 'sh-form-500',
    formId: 'sh-form-500',
    category: 'talents',
    icon: '🪙',
    iconImg: '/assets/images/guild-coin.jpg',
    title: '500 глиняных талантов',
    desc: 'Оптимальный набор валюты. Выгоднее в 3 раза, чем одиночные покупки',
    features: [
      'Мгновенное зачисление',
      'Бонус +50 талантов',
      'Экономия 210 ₽'
    ],
    price: 290,
    oldPrice: 500,
    discount: '−42%',
    badge: { type: 'hit', text: '🔥 Хит' },
    color: '#f39c12'
  },
  {
    id: 'sh-form-1000',
    formId: 'sh-form-1000',
    category: 'talents',
    icon: '🪙',
    iconImg: '/assets/images/guild-coin.jpg',
    title: '1000 глиняных талантов',
    desc: 'Максимальный набор. Лучшая цена за талант',
    features: [
      'Мгновенное зачисление',
      'Бонус +100 талантов',
      'Экономия 510 ₽'
    ],
    price: 490,
    oldPrice: 1000,
    discount: '−51%',
    badge: { type: 'max', text: '🏆 Максимум' },
    color: '#e67e22'
  },
  {
    id: 'sh-form-vip',
    formId: 'sh-form-vip',
    category: 'vip',
    icon: '👑',
    title: 'VIP-статус на 12 месяцев',
    desc: 'Полный набор привилегий на год по специальной цене',
    features: [
      '👑 Золотой бейдж в профиле',
      '🎨 Кастомный цвет ника',
      '📚 Ранний доступ к статьям',
      '💬 Приоритетная поддержка',
      '⭐ Спецстатус на форуме'
    ],
    price: 990,
    oldPrice: 2400,
    discount: '−59%',
    badge: { type: 'vip', text: 'VIP' },
    color: '#f5d76e',
    isVip: true
  }
];

/* ═══════════════════ СОСТОЯНИЕ ═══════════════════ */
var state = {
  user: null,
  profile: null,
  activeCategory: 'all',
  pendingProduct: null,
  email: ''
};

var container = document.getElementById('shop-app');
if (!container) return;

/* ═══════════════════ УТИЛИТЫ ═══════════════════ */
function esc(s){
  return String(s||'').replace(/[&<>"']/g,function(m){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}
function toast(msg, type){
  type = type || 'info';
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);' +
    'padding:12px 26px;border-radius:30px;color:#fff;font-weight:800;font-size:.9rem;' +
    'box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:2147483647;pointer-events:none;' +
    'max-width:90vw;text-align:center;transition:transform .4s cubic-bezier(.16,1,.3,1);' +
    'background:' + (type==='error' ? 'linear-gradient(135deg,#e74c3c,#c0392b)' :
                     type==='success' ? 'linear-gradient(135deg,#27ae60,#16a085)' :
                     'linear-gradient(135deg,#3498db,#2980b9)') + ';';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(function(){ t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(function(){
    t.style.transform = 'translateX(-50%) translateY(120px)';
    setTimeout(function(){ t.remove(); }, 400);
  }, 2600);
}

/* ═══════════════════ SCROLL OBSERVE ═══════════════════ */
function initObserve(){
  var items = document.querySelectorAll('.sh-observe');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('sh-visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('sh-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function(el){ io.observe(el); });
}

/* ═══════════════════ ФИЛЬТР ПО КАТЕГОРИИ ═══════════════════ */
function getFilteredProducts(){
  if (state.activeCategory === 'all') return PRODUCTS;
  return PRODUCTS.filter(function(p){ return p.category === state.activeCategory; });
}

/* ═══════════════════ РЕНДЕР КАТАЛОГА ═══════════════════ */
function renderCatalog(){
  var grid = document.getElementById('sh-grid');
  if (!grid) return;
  var items = getFilteredProducts();

  grid.innerHTML = items.map(function(p, i){
    var iconHtml = p.iconImg
      ? '<img src="' + p.iconImg + '" alt="" onerror="this.replaceWith(document.createTextNode(\'' + p.icon + '\'))">'
      : p.icon;

    var badgeHtml = p.badge
      ? '<span class="sh-card-badge ' + p.badge.type + '">' + esc(p.badge.text) + '</span>'
      : '';

    var featuresHtml = p.features.map(function(f){ return '<li>' + esc(f) + '</li>'; }).join('');

    var saveHtml = p.oldPrice
      ? '<span class="sh-price-save">' + p.discount + '</span>'
      : '';

    var oldHtml = p.oldPrice ? '<span class="sh-price-old">' + p.oldPrice + ' ₽</span>' : '';

    return '<div class="sh-card' + (p.isVip ? ' sh-card-vip' : '') + '" ' +
      'style="--card-color:' + p.color + ';animation-delay:' + Math.min(i*.05, .3) + 's;">' +
      badgeHtml +
      '<div class="sh-card-icon">' + iconHtml + '</div>' +
      '<div class="sh-card-title">' + esc(p.title) + '</div>' +
      '<div class="sh-card-desc">' + esc(p.desc) + '</div>' +
      '<ul class="sh-card-features">' + featuresHtml + '</ul>' +
      '<div class="sh-card-price">' +
        '<span class="sh-price-current">' + p.price + ' ₽</span>' +
        oldHtml + saveHtml +
      '</div>' +
      '<button class="sh-card-btn" type="button" ' +
        'onclick="shOpenModal(\'' + p.id + '\')">' +
        '🛒 Купить' +
      '</button>' +
    '</div>';
  }).join('');
}

/* ═══════════════════ МОДАЛКА ═══════════════════ */
window.shOpenModal = function(productId){
  var p = PRODUCTS.filter(function(x){ return x.id === productId; })[0];
  if (!p) return;

  if (!state.user){
    toast('Войдите, чтобы купить', 'error');
    setTimeout(function(){ window.location.href = '/login/'; }, 1500);
    return;
  }

  state.pendingProduct = p;

  var modal = document.getElementById('sh-modal');
  var iconEl = document.getElementById('sh-modal-icon');
  iconEl.innerHTML = p.iconImg
    ? '<img src="' + p.iconImg + '" alt="" onerror="this.replaceWith(document.createTextNode(\'' + p.icon + '\'))">'
    : p.icon;

  document.getElementById('sh-modal-title').textContent = p.title;
  document.getElementById('sh-modal-price').textContent = p.price + ' ₽';
  document.getElementById('sh-modal-desc').textContent = p.desc;

  var emailInput = document.getElementById('sh-modal-email');
  emailInput.value = state.email || '';

  modal.style.display = 'flex';
};

window.shCloseModal = function(){
  document.getElementById('sh-modal').style.display = 'none';
  state.pendingProduct = null;
};

/* ═══════════════════ ОПЛАТА ═══════════════════ */
function shPay(){
  var p = state.pendingProduct;
  if (!p || !state.user) return;

  var emailInput = document.getElementById('sh-modal-email');
  var email = (emailInput.value || '').trim();

  if (!email || email.indexOf('@') === -1){
    toast('Введите корректный email', 'error');
    emailInput.focus();
    return;
  }

  var form = document.getElementById(p.formId);
  if (!form){
    toast('Форма не найдена', 'error');
    return;
  }

  // Заполняем форму
  form.querySelector('[name="cps_email"]').value = email;
  form.querySelector('[name="customerNumber"]').value = state.user.id;

  state.email = email;

  // Отправляем форму (target="_blank" → откроется в новой вкладке)
  try {
    form.submit();
    shCloseModal();
    toast('Открываем страницу оплаты...', 'info');
  } catch(e){
    toast('Ошибка отправки: ' + e.message, 'error');
  }
}

/* ═══════════════════ ЗАГРУЗКА ПРОФИЛЯ ═══════════════════ */
async function loadProfile(){
  if (!sb) return;
  try {
    var s = await sb.auth.getSession();
    var user = s && s.data && s.data.session ? s.data.session.user : null;
    state.user = user;

    if (!user){
      document.getElementById('sh-warning').style.display = 'flex';
      document.getElementById('sh-profile').style.display = 'none';
      return;
    }

    state.email = user.email || '';

    var pr = await sb.from('profiles').select('display_name,username,avatar_url,vip_until').eq('user_id', user.id).single();
    var profile = pr && pr.data;

    var currency = 0;
    try {
      var cur = await sb.from('user_currency').select('clay_talents').eq('user_id', user.id).maybeSingle();
      currency = (cur && cur.data && cur.data.clay_talents) || 0;
    } catch(e){}

    // Имя
    var name = (profile && (profile.display_name || profile.username)) || user.email.split('@')[0];
    document.getElementById('sh-name').textContent = name;
    document.getElementById('sh-talents').textContent = currency;

    // Аватар
    var av = profile && profile.avatar_url;
    var img = document.getElementById('sh-avatar');
    if (av){
      img.src = av;
      img.style.display = 'block';
    } else {
      img.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=f39c12&color=fff&size=128&rounded=true';
      img.style.display = 'block';
    }

    // VIP
    var vip = profile && profile.vip_until ? new Date(profile.vip_until) : null;
    if (vip && vip.getTime() > Date.now()){
      document.getElementById('sh-vip-until').textContent = vip.toLocaleDateString('ru-RU');
      document.getElementById('sh-vip-status').style.display = 'inline-block';
    } else {
      document.getElementById('sh-vip-status').style.display = 'none';
    }

    document.getElementById('sh-profile').style.display = 'block';
    document.getElementById('sh-warning').style.display = 'none';
  } catch(e){
    console.warn('[shop] loadProfile error:', e);
    document.getElementById('sh-warning').style.display = 'flex';
  }
}

/* ═══════════════════ ВКЛАДКИ ═══════════════════ */
function initTabs(){
  document.querySelectorAll('.sh-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      document.querySelectorAll('.sh-tab').forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      state.activeCategory = tab.dataset.cat;
      renderCatalog();
    });
  });
}

/* ═══════════════════ INIT ═══════════════════ */
function init(){
  initObserve();
  initTabs();
  renderCatalog();
  loadProfile();

  // Модалка: клик по фону
  document.getElementById('sh-modal').addEventListener('click', function(e){
    if (e.target === this) shCloseModal();
  });

  // Кнопка "Перейти к оплате"
  document.getElementById('sh-modal-buy').addEventListener('click', shPay);

  // Enter в email
  document.getElementById('sh-modal-email').addEventListener('keypress', function(e){
    if (e.key === 'Enter') shPay();
  });

  // Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') shCloseModal();
  });

  console.log('🛒 Магазин v1 загружен. Товаров:', PRODUCTS.length);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
</script>
