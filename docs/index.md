---
title: Марсианская энциклопедия
comments: false
---

<link rel="preload" as="image" href="assets/images/header-banner.png" fetchpriority="high">
<link rel="preconnect" href="https://raw.githubusercontent.com" crossorigin>

<div class="vip-banner">
  <img src="assets/images/header-banner.png" alt="" fetchpriority="high" decoding="async" width="1200" height="220">
  <div class="vip-banner-overlay"></div>
  <div class="vip-banner-content">
    <h1>Марсианская энциклопедия</h1>
    <p>Свободный справочник о мире «Письмо из Красной пыли»</p>
  </div>
</div>

<style>
/* ============================================================
   VIP STYLES + MOBILE OPTIMIZATION
   ============================================================ */
:root {
  --vip-border: #c8ccd1;
  --vip-bg: var(--block-bg, #f8f9fa);
  --vip-accent: #6C63FF;
  --vip-accent-2: #A29BFE;
  --vip-shadow: 0 1px 4px rgba(0,0,0,.08);
  --vip-shadow-hover: 0 12px 32px -8px rgba(108,99,255,.25);
}

/* ============ BANNER ============ */
.vip-banner {
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px -8px rgba(0,0,0,.4);
  contain: layout paint;
  animation: vipFadeIn .6s cubic-bezier(.16,1,.3,1) both;
}
.vip-banner img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transform: translateZ(0);
}
.vip-banner-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 100%),
    radial-gradient(circle at 20% 30%, rgba(108,99,255,.2), transparent 60%);
}
.vip-banner-content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 20px;
  color: #fff; font-family: 'Georgia', serif;
}
.vip-banner-content h1 {
  font-size: 2.8rem; font-weight: normal; margin: 0;
  color: #fff !important;
  border: none !important; padding: 0 !important;
  text-shadow: 0 2px 12px rgba(0,0,0,.85);
  letter-spacing: -.5px;
}
.vip-banner-content p {
  color: #f0e6d0; font-size: 1.2rem; margin: 10px 0 0;
  text-shadow: 0 2px 8px rgba(0,0,0,.85);
}

/* ============ VIP CARDS ============ */
.vip-card {
  border: 2px solid var(--vip-border);
  border-radius: 14px;
  padding: 20px 24px;
  margin-bottom: 20px;
  background: var(--vip-bg);
  box-shadow: var(--vip-shadow);
  transition: transform .3s cubic-bezier(.16,1,.3,1),
              box-shadow .3s cubic-bezier(.16,1,.3,1),
              border-color .3s;
  position: relative;
  overflow: hidden;
  animation: vipSlideUp .5s cubic-bezier(.16,1,.3,1) both;
}
.vip-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--vip-accent), var(--vip-accent-2), transparent);
  opacity: 0; transition: opacity .35s;
}
.vip-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--vip-shadow-hover);
  border-color: var(--vip-accent);
}
.vip-card:hover::before { opacity: 1; }

/* Заголовки в карточках */
.vip-card h3, .vip-card h4 {
  margin-top: 0;
  display: flex; align-items: center; gap: 8px;
  color: #1a1a2e;
}
.vip-card h3 { font-size: 1.15rem; margin-bottom: 16px; }
.vip-card h4 { font-size: 1rem; margin-bottom: 12px; }

/* Стикеры */
.vip-sticker {
  width: 24px !important;
  height: 24px !important;
  display: inline !important;
  vertical-align: middle;
  margin-right: 6px;
  transition: transform .3s cubic-bezier(.16,1,.3,1);
}
.vip-card:hover .vip-sticker { transform: scale(1.15) rotate(-6deg); }

/* Кнопки */
.vip-btn {
  background: linear-gradient(135deg, #6C63FF, #A29BFE) !important;
  color: #fff !important;
  border: none !important;
  padding: 12px 28px !important;
  font-size: 1rem !important;
  font-family: inherit !important;
  border-radius: 24px !important;
  cursor: pointer !important;
  box-shadow: 0 8px 20px -4px rgba(108,99,255,.45) !important;
  transition: all .28s cubic-bezier(.16,1,.3,1) !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  -webkit-tap-highlight-color: transparent;
}
.vip-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 14px 32px -4px rgba(108,99,255,.55) !important;
}
.vip-btn:active { transform: translateY(0) scale(.98) !important; }

/* Таблица */
.vip-card table {
  width: 100%;
  border-collapse: collapse;
  font-size: .92rem;
}
.vip-card table th {
  text-align: left;
  padding: 8px 10px;
  color: #888;
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: .5px;
  border-bottom: 2px solid var(--vip-accent) !important;
}
.vip-card table td {
  padding: 10px;
  border-bottom: 1px solid rgba(0,0,0,.05);
}
.vip-card table tbody tr { transition: background .2s; }
.vip-card table tbody tr:hover { background: rgba(108,99,255,.05); }

/* Списки */
.vip-card ul { padding-left: 20px; margin: 0; }
.vip-card ul li { margin-bottom: 10px; line-height: 1.6; }

/* Анимации */
@keyframes vipFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes vipSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes vipPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

/* === Ленивая загрузка карточек ниже fold === */
.vip-lazy {
  content-visibility: auto;
  contain-intrinsic-size: 0 300px;
}

/* ============ MOBILE ============ */
@media (max-width: 768px) {
  .vip-banner { height: 160px; border-radius: 12px; }
  .vip-banner-content h1 { font-size: 1.5rem; }
  .vip-banner-content p { font-size: .85rem; margin-top: 6px; }

  .vip-card {
    padding: 16px 16px;
    border-radius: 12px;
    margin-bottom: 14px;
  }
  .vip-card h3 { font-size: 1rem; }
  .vip-card h4 { font-size: .92rem; }

  .vip-sticker { width: 20px !important; height: 20px !important; margin-right: 4px; }

  .vip-btn { padding: 11px 20px !important; font-size: .9rem !important; }

  .vip-card table { font-size: .82rem; }
  .vip-card table th, .vip-card table td { padding: 6px 6px; }
}

@media (max-width: 480px) {
  .vip-banner { height: 130px; }
  .vip-banner-content h1 { font-size: 1.2rem; }
  .vip-banner-content p { font-size: .75rem; }
}

/* Уменьшить анимации для слабых устройств */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
</style>

# Марсианская энциклопедия

**Марсианская энциклопедия** — научно-художественный справочный проект, посвящённый вселенной цикла романов **«Письмо из Красной пыли»** (автор — **Mnemis**). В основе проекта лежит реконструкция возможной истории Марса, выполненная с опорой на актуальные научные данные из областей геологии, климатологии, астробиологии и физики планет.

Материалы энциклопедии не являются чистым вымыслом. Они представляют собой **научно обоснованную гипотетическую модель** — экстраполяцию того, какой могла бы быть жизнь на Марсе, если бы она действительно существовала в его древнюю эпоху. Все гипотезы, представленные в проекте, находятся в рамках современных научных представлений и не противоречат известным фактам о Красной планете. Они не могут быть ни подтверждены, ни опровергнуты на текущем уровне развития науки, что оставляет пространство для размышлений и альтернативных интерпретаций.

Источниковедческая база энциклопедии строится на трёх уровнях:

1. **Реальные научные данные** — геологическая история Марса, климатические изменения, наличие жидкой воды в прошлом, обнаружение органических молекул, перхлоратов и метана в атмосфере.
2. **Художественная концепция** — расшифровка глиняных табличек, найденных историком **[Хевсуром](people/hevsur.md)** в подземном храме долины Ксанфа, описывающих историю марсианской цивилизации в Эпоху Умирания.
3. **Логическая реконструкция** — моделирование биологических, социальных и культурных процессов, которые могли бы иметь место в условиях низкой гравитации (0,38 g), разрежённой атмосферы и постепенного угасания планеты.

<div class="wiki-layout">
<div class="wiki-column-left">

<div class="vip-card vip-lazy">
<h3><img src="assets/images/stickers/sticker-tablet.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Избранная статья</h3>

<h4>Хевсур — последний хранитель глины</h4>

<p><strong><a href="people/hevsur.md">Хевсур</a></strong> (2685 – ок. 2745 гг. Э.О.) — марсианский историк, писец и хранитель архива Академии Окхасена. Центральный персонаж эпопеи «Письмо из Красной пыли», посвятивший свою жизнь сбору, систематизации и сохранению знаний о гибнущем Марсе. Его главное наследие — «глиняная библиотека» — собрание тысяч табличек, которые пережили гибель планеты и легли в основу марсианской энциклопедии. В отличие от <a href="people/talin.md">Талина</a>, который улетел к Земле, Хевсур выбрал остаться на Марсе, чтобы записать его последние дни.</p>
<p><a href="people/hevsur.md">Читать полную статью о Хевсуре →</a></p>
</div>

<div class="vip-card vip-lazy">
<h3><img src="assets/images/stickers/sticker-pin.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Знаете ли вы?</h3>

<ul>
<li><img src="assets/images/stickers/sticker-rocket.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> <strong>Талин</strong> — главный астронавигатор Марса, впервые увидел Землю в телескоп в 2714 году. Его расчёты траектории стали основой для Исхода к Земле.</li>
<li><img src="assets/images/stickers/sticker-waves.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> <strong>Ацидалийское море</strong> — реально существующая равнина на Марсе, которая в книгах является крупнейшим водоёмом и символом уходящей жизни. В 2735 году море замёрзло впервые за тысячи лет.</li>
<li><img src="assets/images/stickers/sticker-tablet.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> <strong>Марсианская письменность</strong> — лого-силлабическая, содержит более 200 знаков. Она была создана в 890 году Э.О. и использовалась для записи всех знаний на глиняных табличках.</li>
<li><img src="assets/images/stickers/sticker-scales-no.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Слово <strong>«Lān sur»</strong> в переводе означает <strong>«Глина помнит»</strong>. Это сакральная фраза, которая стала девизом писцов и хранителей памяти на протяжении всей марсианской истории.</li>
</ul>
</div>

<div class="vip-card vip-lazy">
<h3><img src="assets/images/stickers/sticker-books.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> О цикле книг «Письмо из Красной пыли»</h3>

<p><strong>«Письмо из Красной пыли»</strong> — цикл романов в жанре твёрдой научной фантастики и планетарной драмы, созданный автором <strong>Mnemis</strong>. Действие происходит на Марсе в последние десятилетия перед гибелью планеты — в Эпоху Умирания. Цикл объединяет научную достоверность с глубокими философскими размышлениями о памяти, надежде и цене выживания.</p>

<h4>Вышедшие книги</h4>

<table>
<thead>
<tr><th>Название</th><th>Год</th><th>Краткое описание</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="books/acidalia-sea.md">«Ацидалийское море»</a></strong></td><td>2026</td><td>Первый роман. Знакомит с миром Эпохи Умирания и жизнью в Окхасене</td></tr>
</tbody>
</table>
</div>

<div class="vip-card vip-lazy">
<h3><img src="assets/images/stickers/sticker-galaxy.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> О проекте</h3>

<p>Проект адресован широкой аудитории, интересующейся вопросами происхождения жизни во Вселенной, эволюции планет и возможных форм разума за пределами Земли. Марсианская энциклопедия предлагает читателю не готовые ответы, а пространство для размышлений — модели того, какой могла бы быть история Марса, если бы на нём действительно существовала жизнь.</p>

<p>Все гипотезы, представленные в проекте, основаны на реальных научных данных и не противоречат современному знанию. По вопросам сотрудничества и уточнения материалов: mnemis.author@mail.ru.</p>
</div>

<div class="vip-card vip-lazy">
<h3><img src="assets/images/stickers/sticker-stars.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Интерактивные элементы</h3>

<h4><img src="assets/images/stickers/sticker-cube.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Случайная статья</h4>

<div style="text-align: center; margin: 1.2rem 0;">
  <button id="randomArticleBtn" class="vip-btn">🎲 Случайная статья</button>
</div>
</div>

</div>

<div class="wiki-column-right">

<div class="vip-card vip-lazy">
<h4><img src="assets/images/stickers/sticker-calendar.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Марсианский календарь</h4>
<div id="martianCalendar" style="text-align:center;font-family:'Georgia',serif;">
  <div id="martianDate" style="font-size:1.2rem;color:var(--text-color,#202122);">Загрузка...</div>
</div>
</div>

<div class="vip-card vip-lazy">
<h4><img src="assets/images/stickers/sticker-calendar.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> В этот день на Марсе</h4>
<div id="thisDayBlock" style="font-family:'Georgia',serif;text-align:center;font-size:1rem;">
  <div style="font-weight:bold;margin-bottom:10px;">
    <img src="assets/images/stickers/sticker-calendar.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24">
    <span id="thisDayDate">загрузка...</span>
  </div>
  <div id="thisDayEvents" style="text-align:left;font-size:.95rem;line-height:1.55;">загрузка...</div>
  <div id="thisDayQuote" style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border-color,#eaecf0);font-style:italic;font-size:.9rem;color:var(--text-muted,#555);"></div>
</div>
</div>

<div class="vip-card vip-lazy">
<h4><img src="assets/images/stickers/sticker-stars.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Изображение дня</h4>
<div id="pictureOfDayBlock" style="font-family:'Georgia',serif;text-align:center;">
  <div id="podWrap" style="min-height:200px;display:flex;align-items:center;justify-content:center;">
    <div style="color:var(--text-muted,#888);font-style:italic;">загрузка...</div>
  </div>
  <div id="podCaption" style="margin-top:12px;font-size:.95rem;font-style:italic;color:var(--text-muted,#555);"></div>
  <div id="podCounter" style="margin-top:6px;font-size:.75rem;color:var(--text-muted,#888);border-top:1px solid var(--border-color,#eaecf0);padding-top:6px;"></div>
</div>
</div>

<div class="vip-card vip-lazy">
<h4><img src="assets/images/stickers/sticker-stars.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Цитата дня</h4>
<div id="quoteOfTheDay" style="border-left:4px solid #6C63FF;padding:12px 20px;font-style:italic;font-family:'Georgia',serif;font-size:1.05rem;">
  <span id="quoteText">Загрузка...</span>
</div>
</div>

<div class="vip-card vip-lazy">
<h4><img src="assets/images/stickers/sticker-stars.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Спутники Марса</h4>
<div id="moonPhase" style="font-family:'Georgia',serif;text-align:center;font-size:1rem;">
  <div><span style="font-weight:bold;">
    <img src="assets/images/stickers/sticker-phobos.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Фобос:
  </span> <span id="phobosStatus">загрузка...</span></div>
  <div><span style="font-weight:bold;">
    <img src="assets/images/stickers/sticker-deimos.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Деймос:
  </span> <span id="deimosStatus">загрузка...</span></div>
  <div style="margin-top:8px;font-size:.8rem;color:var(--text-muted,#555);">
    <div id="phobosTimer"></div>
    <div id="deimosTimer"></div>
  </div>
  <div style="margin-top:10px;font-size:.7rem;color:var(--text-muted,#888);border-top:1px solid var(--border-color,#eaecf0);padding-top:6px;">
    Данные: NASA Horizons (28 июня 2026, 14:34 UT)
  </div>
</div>
</div>

<div class="vip-card vip-lazy">
<h3><img src="assets/images/stickers/sticker-stars.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Избранные списки</h3>

<div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid #eaecf0;">
  <div style="flex:0 0 100px;text-align:center;">
    <a href="lists/eden-kings/">
      <img src="assets/images/lucid-origin_Ancient_heraldic_coat_of_arms_for_the_Kingdom_of_Eden_Mars._Shield_shape_traditi-0.jpg" alt="Эдем" loading="lazy" decoding="async" width="100" height="100" style="width:100px;height:100px;object-fit:cover;border-radius:8px;border:1px solid #c8ccd1;display:block;transition:transform .3s;">
    </a>
    <div style="font-size:.62rem;color:#888;margin-top:5px;line-height:1.15;">Герб династии<br>королей Эдема</div>
  </div>
  <div style="flex:1;min-width:0;">
    <div style="font-size:.72rem;color:#6C63FF;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;">Последний избранный</div>
    <div style="font-size:1.05rem;line-height:1.3;"><a href="lists/eden-kings/">Список королей Эдема</a></div>
  </div>
</div>

<div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid #eaecf0;">
  <div style="flex:0 0 100px;text-align:center;">
    <a href="lists/ksanf-pirates/">
      <img src="assets/images/lucid-origin_Heraldic_coat_of_arms_for_the_Pirate_Kingdom_of_Ksanf_Mars._Shield_shape_rough-h-0.jpg" alt="Ксанф" loading="lazy" decoding="async" width="100" height="100" style="width:100px;height:100px;object-fit:cover;border-radius:8px;border:1px solid #c8ccd1;display:block;transition:transform .3s;">
    </a>
    <div style="font-size:.62rem;color:#888;margin-top:5px;line-height:1.15;">Герб династии<br>Ксанфид</div>
  </div>
  <div style="flex:1;min-width:0;">
    <div style="font-size:.72rem;color:#6C63FF;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;">Предыдущий</div>
    <div style="font-size:1.05rem;line-height:1.3;"><a href="lists/ksanf-pirates/">Пиратские короли Ксанфа</a></div>
  </div>
</div>

<div style="text-align:center;margin-top:14px;padding-top:12px;border-top:1px solid #eaecf0;">
  <a href="lists/" style="font-size:.9rem;">Все избранные списки →</a>
</div>
</div>

<div class="vip-card vip-lazy">
<h4><img src="assets/images/stickers/sticker-sound.png" class="vip-sticker" alt="" loading="lazy" decoding="async" width="24" height="24"> Звук ветра на Марсе</h4>
<div style="text-align:center;margin:10px 0;">
  <button id="windSoundBtn" class="vip-btn">🎵 Включить звук ветра</button>
</div>
<audio id="windAudio" loop preload="none">
  <source src="assets/sounds/mars-wind.mp3" type="audio/mpeg">
</audio>
</div>

</div>
</div>

<script>
// ============================================================
// ЕДИНЫЙ СКРИПТ — все интерактивные элементы
// ============================================================
(function() {
    'use strict';

    // ============================================================
    // 📅 Общие константы марсианского календаря
    // ============================================================
    var MONTHS_DAYS = [31,30,32,31,33,30,31,32,29,31,30,28,29,31,32,33,31,30,29,31,32,33];
    var MONTHS_NAMES = ['Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar','Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar','Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha','Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'];
    var MARTIAN_YEAR_DAYS = MONTHS_DAYS.reduce(function(s,n){return s+n;},0);
    var EARTH_DAYS_IN_MARTIAN_YEAR = 668.6;
    var BOOK_REF_YEAR = 2740;
    var BOOK_REF_DAYS_AGO = 3798000000;
    var SEASON_NAMES = ['Пробуждение','Цветение','Зной','Ветры','Угасание','Заморозки','Тьма','Ледяной покров'];

    function getCurrentMartianDate() {
        var now = new Date();
        var start = new Date(2026, 0, 1).getTime();
        var earthDays = (now.getTime() - start) / 86400000;
        var dayOfYear = Math.floor((earthDays * (MARTIAN_YEAR_DAYS / EARTH_DAYS_IN_MARTIAN_YEAR)) % MARTIAN_YEAR_DAYS);
        var remaining = dayOfYear, mIdx = 0;
        for (var i = 0; i < MONTHS_DAYS.length; i++) {
            if (remaining < MONTHS_DAYS[i]) { mIdx = i; break; }
            remaining -= MONTHS_DAYS[i];
        }
        var martianYearsOffset = earthDays / EARTH_DAYS_IN_MARTIAN_YEAR;
        var year = Math.floor(BOOK_REF_DAYS_AGO + BOOK_REF_YEAR + martianYearsOffset);
        return {
            monthIndex: mIdx,
            monthName: MONTHS_NAMES[mIdx],
            day: remaining + 1,
            year: year,
            season: SEASON_NAMES[Math.floor(mIdx / 2) % SEASON_NAMES.length]
        };
    }

    // ============================================================
    // 📅 Календарь
    // ============================================================
    function initCalendar() {
        var el = document.getElementById('martianDate');
        if (!el) return;
        var d = getCurrentMartianDate();
        el.innerHTML =
            '<div><strong>' + d.monthName + '</strong> ' + d.day + '-й день</div>' +
            '<div>Год ' + d.year.toLocaleString() + ' Э.О.</div>' +
            '<div style="font-size:.9rem;color:var(--text-muted,#555);margin-top:4px;">' + d.season + '</div>';
    }

    // ============================================================
    // 📅 В этот день на Марсе
    // ============================================================
    async function fetchJSON(paths) {
        for (var i = 0; i < paths.length; i++) {
            try {
                var r = await fetch(paths[i]);
                if (r.ok) return await r.json();
            } catch(e) {}
        }
        throw new Error('JSON не найден');
    }

    async function initThisDay() {
        var dateEl = document.getElementById('thisDayDate');
        var eventsEl = document.getElementById('thisDayEvents');
        var quoteEl = document.getElementById('thisDayQuote');
        if (!dateEl || !eventsEl) return;

        try {
            var data = await fetchJSON(['data/this-day.json', '../data/this-day.json', '/data/this-day.json']);
            var cur = getCurrentMartianDate();
            var month = data.months[cur.monthIndex];

            dateEl.textContent = cur.day + '-й день ' + cur.monthName;

            var events = (data.events || []).filter(function(e) {
                return e.month === cur.monthName && e.day === cur.day;
            });

            var html = '<div style="text-align:center;font-size:.85rem;color:var(--text-muted,#666);margin-bottom:10px;">' +
                month.season + ' · «' + month.meaning + '»' + (month.note ? ' — ' + month.note : '') + '</div>';

            if (events.length) {
                events.sort(function(a,b){ return (a.year||0) - (b.year||0); });
                events.forEach(function(ev) {
                    html += '<div style="margin-bottom:10px;">';
                    if (ev.year) html += '<span style="font-weight:bold;color:#6C63FF;">' + ev.year + ' г.</span> — ';
                    html += '<span style="font-weight:bold;">' + ev.title + '</span>';
                    html += '<div style="font-size:.9rem;color:var(--text-color,#333);margin-top:2px;">' + ev.text + '</div>';
                    if (ev.link) html += '<a href="' + ev.link + '" style="font-size:.85rem;color:#6C63FF;">Читать подробнее →</a>';
                    html += '</div>';
                });
            } else {
                html += '<div style="text-align:center;color:var(--text-muted,#888);font-style:italic;">На этот день в хрониках событий пока не отмечено.</div>';
            }

            eventsEl.innerHTML = html;

            var quotes = data.quotes || [];
            if (quotes.length) {
                var idx = (cur.day + cur.monthIndex) % quotes.length;
                quoteEl.textContent = '«' + quotes[idx] + '»';
            }
        } catch(e) {
            eventsEl.innerHTML = '<div style="text-align:center;color:#999;">Не удалось загрузить события дня.</div>';
        }
    }

    // ============================================================
    // 🖼️ Изображение дня
    // ============================================================
    async function initPictureOfDay() {
        var wrap = document.getElementById('podWrap');
        if (!wrap) return;

        try {
            var data = await fetchJSON(['data/pictures.json', '../data/pictures.json', '../../data/pictures.json', '/data/pictures.json']);
            var pics = Array.isArray(data) ? data : (data.pictures || []);
            if (!pics.length) throw new Error('Список пуст');

            var now = new Date();
            var start = new Date(now.getFullYear(), 0, 0);
            var doy = Math.floor((now - start) / 86400000);
            var idx = doy % pics.length;
            var pic = pics[idx];

            var img = document.createElement('img');
            img.src = pic.src;
            img.alt = pic.caption || '';
            img.loading = 'lazy';
            img.decoding = 'async';
            img.style.cssText = 'max-width:100%;max-height:520px;border-radius:8px;display:block;margin:0 auto;';

            img.onerror = function() {
                wrap.innerHTML = '<div style="color:#999;font-style:italic;">Изображение недоступно</div>';
            };

            wrap.innerHTML = '';
            wrap.appendChild(img);

            var capEl = document.getElementById('podCaption');
            var cntEl = document.getElementById('podCounter');
            if (capEl) capEl.textContent = pic.caption || '';
            if (cntEl) cntEl.textContent = 'Картина ' + (idx + 1) + ' из ' + pics.length;
        } catch(e) {
            wrap.innerHTML = '<div style="color:#999;font-style:italic;">Не удалось загрузить Изображение дня.</div>';
        }
    }

    // ============================================================
    // 💬 Цитата дня
    // ============================================================
    var QUOTES = [
        { text: '«Khō mōr, dzen mōr, lān ān mōr» — Огонь умрёт, звезда умрёт, память не умрёт.', source: 'Хевсур' },
        { text: '«Глина помнит даже то, что мы сами забыли.»', source: 'Хевсур' },
        { text: '«Я всё записал. Теперь ваша очередь — помнить.»', source: 'Хевсур' },
        { text: '«Мы не победили время, но мы записали его. И это наша победа.»', source: 'Хевсур' },
        { text: '«Если я перестану писать, то кто расскажет о нас через тысячу лет?»', source: 'Хевсур' },
        { text: '«Глина не лжёт, и она не умирает. Она ждёт. И когда ты берёшь её в руки, ты берёшь в руки время.»', source: 'Хевсур' },
        { text: '«Смотри на звёзды и помни жизнь.»', source: 'Талин' },
        { text: '«Мы не бежим. Мы идём туда, где нас ждут. Даже если ждут только пустые скалы, мы высечем на них свои имена.»', source: 'Талин' },
        { text: '«Я, Талин, сын Эрдана, смотрел на звёзды и помнил жизнь. Теперь я забываю, но глина помнит за меня. Lān sur.»', source: 'Талин' },
        { text: '«Я правил камнями, но не сумел удержать воду. Пусть те, кто улетают, правят хотя бы памятью.»', source: 'Аратан III' },
        { text: '«Море уходит, но я остаюсь. Вода умирает, но глина помнит.»', source: 'Совия' },
        { text: '«Я не записываю имена. Я пою их. Когда я умру, мои песни будут жить в тех, кто их слышал.»', source: 'Совия' },
        { text: '«Lān sur. — Глина помнит.»', source: 'Древняя формула' },
        { text: '«Okh sen ākha, dzen thal marzān» — Город помнит море, смотри на звёзды, марсианин.', source: 'Древняя формула' },
        { text: '«Глина не лжёт, но она не говорит всего. Тот, кто умеет слушать, услышит и между строк.»', source: 'Харан' },
        { text: '«Вы не запоминаете звёзды. Звёзды запоминают вас.»', source: 'Йарра' },
        { text: '«Мы не спасаем мир. Мы спасаем мгновения. Один взгляд, одно слово, одна капля воды... Это и есть жизнь.»', source: 'Йарра' },
        { text: '«Мы не можем изменить планету, но мы можем изменить себя. Это проще и быстрее.»', source: 'Ирайна' },
        { text: '«Они умерли, чтобы дать жизнь другим. Это не жертва, это — круговорот.»', source: 'Ирайна' },
        { text: '«Машины честнее людей. Они не лгут, не предают, не надеются на чудо. Они просто работают — или ломаются.»', source: 'Миран' }
    ];

    function initQuote() {
        var el = document.getElementById('quoteText');
        if (!el) return;
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var doy = Math.floor((now - start) / 86400000);
        var q = QUOTES[doy % QUOTES.length];
        el.innerHTML = q.text + '<br><span style="font-style:normal;font-size:.9rem;color:var(--link-color,#0645ad);">— ' + q.source + '</span>';
    }

    // ============================================================
    // 🌑 Спутники
    // ============================================================
    var PHOBOS_PERIOD = 27540;
    var DEIMOS_PERIOD = 109080;
    var PHOBOS_INITIAL = 0.62;
    var DEIMOS_INITIAL = 0.62;
    var REF_DATE = Date.UTC(2026, 5, 28, 14, 34, 0);

    function getStatus(phase) {
        var p = ((phase % 1) + 1) % 1;
        if (p < 0.25) return '🌅 восходит';
        if (p < 0.50) return '☀️ в зените';
        if (p < 0.75) return '🌇 заходит';
        return '🌑 за горизонтом';
    }
    function getNextPhaseTime(phase, period) {
        var p = ((phase % 1) + 1) % 1;
        var next = Math.ceil(p / 0.25) * 0.25;
        var diff = next - p;
        if (diff <= 0) diff += 0.25;
        return diff * period;
    }
    function formatTime(s) {
        if (s < 0) s = 0;
        var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
        return h + 'ч ' + m + 'м ' + sec + 'с';
    }

    var moonsInterval = null;
    function updateMoons() {
        var phobosEl = document.getElementById('phobosStatus');
        var deimosEl = document.getElementById('deimosStatus');
        var pTimerEl = document.getElementById('phobosTimer');
        var dTimerEl = document.getElementById('deimosTimer');
        if (!phobosEl) return;

        var now = Date.now();
        var elapsed = (now - REF_DATE) / 1000;
        var pp = (PHOBOS_INITIAL + elapsed / PHOBOS_PERIOD) % 1;
        var dp = (DEIMOS_INITIAL + elapsed / DEIMOS_PERIOD) % 1;

        phobosEl.innerHTML = getStatus(pp);
        deimosEl.innerHTML = getStatus(dp);
        if (pTimerEl) pTimerEl.innerHTML = '⏱ Фобос: ' + formatTime(getNextPhaseTime(pp, PHOBOS_PERIOD)) + ' до смены';
        if (dTimerEl) dTimerEl.innerHTML = '⏱ Деймос: ' + formatTime(getNextPhaseTime(dp, DEIMOS_PERIOD)) + ' до смены';
    }

    function initMoons() {
        if (!document.getElementById('phobosStatus')) return;
        updateMoons();
        // Обновляем только когда вкладка активна
        moonsInterval = setInterval(function() {
            if (!document.hidden) updateMoons();
        }, 5000);
    }

    // ============================================================
    // 🎲 Случайная статья
    // ============================================================
    var RANDOM_PAGES = [
        'history/periodization/','history/timeline/','history/myths/','history/epokha-osnovaniya/',
        'history/epokha-rascveta/','history/epokha-umiraniya/','history/iskhod/','history/pirate-kingdom/',
        'geography/acidalia-sea/','geography/okhasen/','geography/rogen-aria/','geography/farsida/',
        'geography/farsida-caves/','geography/ksanf-river/','geography/eritreya/','geography/utopiya/',
        'geography/edem/','geography/tarsis/','geography/podzemniy-khram/','geography/kosmodrom-farsidy/',
        'geography/noviy-okhasen/','geography/akademiya-okhasena/','astronomy/mars-sky/','astronomy/phobos-deimos/',
        'astronomy/earth-as-target/','astronomy/earth/','terms/lan-sur/','terms/tablichki/','biology/gemotsianin/',
        'science/geology/','people/hevsur/','people/talin/','people/ella/','people/yarra/','people/alira/',
        'people/aratan-iii/','people/irayina/','people/miran/','people/kharan/','people/soviya/','people/arash/',
        'people/kan/','people/sarum-ii/','people/sarum-velikiy/','mythology/kho/','mythology/akha/','mythology/araksis/',
        'mythology/prorochestvo-kharana/','books/acidalia-sea/'
    ];

    function initRandom() {
        var btn = document.getElementById('randomArticleBtn');
        if (!btn) return;
        btn.addEventListener('click', function() {
            var p = RANDOM_PAGES[Math.floor(Math.random() * RANDOM_PAGES.length)];
            window.location.href = p;
        });
    }

    // ============================================================
    // 🎵 Звук ветра (lazy — грузим только при клике)
    // ============================================================
    function initWindSound() {
        var btn = document.getElementById('windSoundBtn');
        var audio = document.getElementById('windAudio');
        if (!btn || !audio) return;
        var playing = false;

        btn.addEventListener('click', function() {
            if (playing) {
                audio.pause();
                playing = false;
                btn.innerHTML = '🎵 Включить звук ветра';
            } else {
                audio.play().then(function() {
                    playing = true;
                    btn.innerHTML = '🔇 Выключить звук';
                }).catch(function(err) {
                    console.warn('Не удалось воспроизвести звук:', err);
                });
            }
        });
    }

    // ============================================================
    // 🚀 ИНИЦИАЛИЗАЦИЯ — синхронные мгновенно, async через IntersectionObserver
    // ============================================================
    function runSync() {
        initCalendar();
        initQuote();
        initRandom();
        initWindSound();
        initMoons();
    }

    function runAsync() {
        initThisDay();
        initPictureOfDay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            runSync();
            // Async запускаем после первого кадра — не блокируем рендер
            if ('requestIdleCallback' in window) {
                requestIdleCallback(runAsync, { timeout: 2000 });
            } else {
                setTimeout(runAsync, 300);
            }
        });
    } else {
        runSync();
        if ('requestIdleCallback' in window) {
            requestIdleCallback(runAsync, { timeout: 2000 });
        } else {
            setTimeout(runAsync, 300);
        }
    }
})();
</script>
