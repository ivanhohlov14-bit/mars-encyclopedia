---
title: Тест — возьмут ли тебя на Марс?
description: 12 вопросов о здоровье, психологии и навыках. Узнай, прошёл бы ты отбор в первую марсианскую миссию.
comments: false
hide:
  - navigation
  - toc
---

<div id="test-app">

<!-- HERO -->
<div class="mt-hero mt-observe">
  <div class="mt-hero-bg"></div>
  <div class="mt-hero-stars">
    <div class="mt-star"></div><div class="mt-star"></div><div class="mt-star"></div>
    <div class="mt-star"></div><div class="mt-star"></div><div class="mt-star"></div>
    <div class="mt-star"></div><div class="mt-star"></div><div class="mt-star"></div>
    <div class="mt-star"></div><div class="mt-star"></div><div class="mt-star"></div>
  </div>
  <div class="mt-hero-content">
    <div class="mt-hero-tag">Тест · Отбор в миссию</div>
    <div class="mt-hero-icon">🚀</div>
    <h1 class="mt-hero-title">Возьмут ли тебя на Марс?</h1>
    <p class="mt-hero-sub">
      12 вопросов про здоровье, психику и навыки. Узнай,
      прошёл бы ты отбор NASA в первую марсианскую миссию.
    </p>
    <div class="mt-hero-meta">
      <span class="mt-meta-item">📝 12 вопросов</span>
      <span class="mt-meta-item">⏱️ 3 минуты</span>
      <span class="mt-meta-item">🏆 6 результатов</span>
    </div>
  </div>
</div>

<!-- ИНТРО -->
<div class="mt-intro mt-observe">
  <p>
    NASA и SpaceX уже готовят первую пилотируемую миссию на Марс.
    Из <strong>10 000 кандидатов</strong> отберут <strong>6 человек</strong>.
    У отбора 3 главных критерия — <strong>здоровье</strong>,
    <strong>психика</strong> и <strong>навыки</strong>.
  </p>
  <p>
    Пройди тест — узнай, попадёшь ли ты в финальный список.
  </p>
</div>

<!-- ТЕСТ -->
<div class="mt-test mt-observe" id="mt-test">

  <!-- Прогресс -->
  <div class="mt-progress">
    <div class="mt-progress-info">
      <span>Вопрос <b id="mt-q-num">1</b> из <b>12</b></span>
      <span id="mt-q-percent">8%</span>
    </div>
    <div class="mt-progress-bar">
      <div class="mt-progress-fill" id="mt-progress-fill"></div>
    </div>
  </div>

  <!-- Вопрос -->
  <div class="mt-question" id="mt-question">
    <div class="mt-q-icon" id="mt-q-icon">🌍</div>
    <div class="mt-q-text" id="mt-q-text">Загрузка...</div>
    <div class="mt-q-answers" id="mt-q-answers"></div>
  </div>

</div>

<!-- РЕЗУЛЬТАТ -->
<div class="mt-result mt-observe" id="mt-result" style="display:none;">
  <div class="mt-result-badge" id="mt-result-badge">🏆</div>
  <div class="mt-result-rank" id="mt-result-rank">Кандидат №1</div>
  <div class="mt-result-title" id="mt-result-title">Ты — идеальный колонист!</div>
  <div class="mt-result-score">
    <div class="mt-result-score-value" id="mt-result-score-value">0</div>
    <div class="mt-result-score-max">из 100 баллов</div>
  </div>
  <div class="mt-result-desc" id="mt-result-desc">
    Описание результата...
  </div>

  <!-- Разбивка по категориям -->
  <div class="mt-result-categories" id="mt-result-categories"></div>

  <!-- Кнопки -->
  <div class="mt-result-actions">
    <button class="mt-btn mt-btn-primary" id="mt-restart">🔄 Пройти заново</button>
    <button class="mt-btn mt-btn-secondary" id="mt-share">📤 Поделиться</button>
  </div>

  <!-- Лидерборд -->
  <div class="mt-leaderboard">
    <h3 class="mt-h3">🥇 Топ-10 результатов</h3>
    <div class="mt-leader-list" id="mt-leader">
      <div class="mt-leader-empty">Загрузка...</div>
    </div>
  </div>
</div>

</div>

<style>
/* ═══ ROOT ═══ */
#test-app{
  max-width:820px;margin:0 auto;padding:0 8px 60px;
  font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
  color:#1a1a2e;line-height:1.7;
  -webkit-tap-highlight-color:transparent;
}
#test-app *{box-sizing:border-box}
#test-app a{text-decoration:none!important;border-bottom:none!important}

@keyframes mtFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes mtFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes mtStar{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
@keyframes mtShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes mtPop{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes mtPulse{0%,100%{box-shadow:0 0 0 0 rgba(192,57,43,.7)}50%{box-shadow:0 0 0 15px rgba(192,57,43,0)}}
@keyframes mtRocket{0%{transform:translateY(0) rotate(-45deg)}50%{transform:translateY(-15px) rotate(-45deg)}100%{transform:translateY(0) rotate(-45deg)}}

.mt-observe{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1)}
.mt-observe.mt-visible{opacity:1;transform:translateY(0)}

/* ═══ HERO ═══ */
.mt-hero{
  position:relative;border-radius:26px;padding:60px 36px;color:#fff;
  margin-bottom:26px;overflow:hidden;text-align:center;
  box-shadow:0 30px 90px -20px rgba(0,0,0,.7);
  min-height:480px;display:flex;align-items:center;justify-content:center;
}
.mt-hero-bg{
  position:absolute;inset:0;
  background:
    radial-gradient(circle at 20% 30%, rgba(192,57,43,.35), transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(108,99,255,.3), transparent 55%),
    linear-gradient(135deg,#0a0a14 0%,#16213e 40%,#2d1b3d 70%,#0f3460 100%);
  z-index:0;
}
.mt-hero-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:2}
.mt-star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;box-shadow:0 0 6px #fff;animation:mtStar 3.5s ease-in-out infinite}
.mt-star:nth-child(1){top:12%;left:8%}
.mt-star:nth-child(2){top:22%;left:18%;animation-delay:.4s;width:1.5px;height:1.5px}
.mt-star:nth-child(3){top:68%;left:12%;animation-delay:.9s}
.mt-star:nth-child(4){top:32%;left:82%;animation-delay:1.4s}
.mt-star:nth-child(5){top:78%;left:88%;animation-delay:.6s;width:1.5px;height:1.5px}
.mt-star:nth-child(6){top:18%;left:62%;animation-delay:1.1s}
.mt-star:nth-child(7){top:52%;left:44%;animation-delay:.3s}
.mt-star:nth-child(8){top:42%;left:94%;animation-delay:1.8s}
.mt-star:nth-child(9){top:84%;left:28%;animation-delay:2.1s}
.mt-star:nth-child(10){top:8%;left:38%;animation-delay:1.5s}
.mt-star:nth-child(11){top:62%;left:72%;animation-delay:.2s}
.mt-star:nth-child(12){top:28%;left:52%;animation-delay:1.9s;width:1.5px;height:1.5px}

.mt-hero-content{position:relative;z-index:3;max-width:680px;margin:0 auto}
.mt-hero-tag{
  display:inline-block;padding:7px 18px;border-radius:22px;
  background:rgba(192,57,43,.2);border:1px solid rgba(192,57,43,.5);
  color:#ff8a80;font-size:.75rem;font-weight:800;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;
  backdrop-filter:blur(10px);
}
.mt-hero-icon{
  display:inline-block;font-size:4.5rem;margin-bottom:10px;
  animation:mtRocket 3s ease-in-out infinite;
  filter:drop-shadow(0 8px 32px rgba(192,57,43,.7));
  line-height:1;
}
.mt-hero-title{
  font-size:2.6rem;font-weight:900;margin:0 0 16px;
  letter-spacing:-.6px;line-height:1.15;
  background:linear-gradient(90deg,#fff 0%,#f5d76e 25%,#fff 50%,#f5d76e 75%,#fff 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:mtShine 6s linear infinite;
}
.mt-hero-sub{font-size:1.05rem;opacity:.92;margin:0 0 24px;line-height:1.65}
.mt-hero-meta{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.mt-meta-item{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 16px;border-radius:22px;
  background:rgba(255,255,255,.1);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.2);
  font-size:.8rem;font-weight:700;color:#fff;
}

/* ═══ INTRO ═══ */
.mt-intro{
  padding:0 4px;margin-bottom:32px;
  font-size:1.05rem;line-height:1.85;color:#333;
}
.mt-intro p{margin:0 0 16px}
.mt-intro strong{color:#c0392b;font-weight:900}

/* ═══ TEST ═══ */
.mt-test{
  background:#fff;border-radius:24px;padding:32px 28px;
  box-shadow:0 20px 60px -20px rgba(0,0,0,.15);
  border:2px solid rgba(192,57,43,.1);
  margin-bottom:24px;
}

/* Progress */
.mt-progress{margin-bottom:28px}
.mt-progress-info{
  display:flex;justify-content:space-between;
  font-size:.78rem;color:#888;font-weight:800;
  text-transform:uppercase;letter-spacing:.8px;
  margin-bottom:10px;
}
.mt-progress-info b{color:#c0392b;font-variant-numeric:tabular-nums}
.mt-progress-bar{
  height:8px;border-radius:4px;
  background:rgba(192,57,43,.1);overflow:hidden;
}
.mt-progress-fill{
  height:100%;width:0;
  background:linear-gradient(90deg,#c0392b,#f39c12,#f5d76e);
  background-size:200% auto;
  border-radius:4px;
  transition:width .5s cubic-bezier(.16,1,.3,1);
  animation:mtShine 3s linear infinite;
}

/* Question */
.mt-question{
  animation:mtFadeIn .4s ease;
}
.mt-q-icon{
  font-size:3rem;text-align:center;
  margin-bottom:12px;line-height:1;
  animation:mtFloat 3s ease-in-out infinite;
}
.mt-q-text{
  font-size:1.25rem;font-weight:900;color:#1a1a2e;
  text-align:center;line-height:1.4;
  margin-bottom:24px;letter-spacing:-.2px;
}
.mt-q-answers{
  display:flex;flex-direction:column;gap:10px;
}
.mt-answer{
  display:flex;align-items:center;gap:14px;
  padding:16px 20px;
  background:#f8f9fb;border:2px solid #e8eaf0;
  border-radius:14px;cursor:pointer;
  font-family:inherit;font-size:.95rem;font-weight:700;
  color:#1a1a2e;text-align:left;
  transition:all .25s cubic-bezier(.16,1,.3,1);
}
.mt-answer:hover{
  background:linear-gradient(135deg,#fff8e1,#fff5f5);
  border-color:#f39c12;
  transform:translateX(6px);
  box-shadow:0 8px 24px -8px rgba(243,156,18,.4);
}
.mt-answer-emoji{
  font-size:1.4rem;flex-shrink:0;
  width:32px;height:32px;
  display:flex;align-items:center;justify-content:center;
}
.mt-answer-text{flex:1}

/* ═══ RESULT ═══ */
.mt-result{
  background:#fff;border-radius:24px;padding:40px 32px;
  box-shadow:0 20px 60px -20px rgba(0,0,0,.15);
  border:2px solid rgba(243,156,18,.3);
  text-align:center;
  animation:mtFadeIn .5s ease;
}
.mt-result-badge{
  font-size:5rem;line-height:1;
  margin-bottom:16px;
  animation:mtPop .8s cubic-bezier(.34,1.56,.64,1);
}
.mt-result-rank{
  display:inline-block;
  padding:6px 16px;border-radius:20px;
  background:rgba(192,57,43,.12);
  color:#c0392b;
  font-size:.75rem;font-weight:900;
  text-transform:uppercase;letter-spacing:1.5px;
  margin-bottom:14px;
}
.mt-result-title{
  font-size:1.8rem;font-weight:900;color:#1a1a2e;
  margin-bottom:16px;letter-spacing:-.4px;line-height:1.2;
}
.mt-result-score{
  display:flex;flex-direction:column;align-items:center;
  margin-bottom:24px;
}
.mt-result-score-value{
  font-size:4.5rem;font-weight:900;line-height:1;
  background:linear-gradient(135deg,#f39c12,#c0392b);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  font-variant-numeric:tabular-nums;
  animation:mtPop .6s ease;
}
.mt-result-score-max{
  font-size:.8rem;color:#888;font-weight:800;
  text-transform:uppercase;letter-spacing:1px;
  margin-top:6px;
}
.mt-result-desc{
  font-size:1rem;color:#4a4a5e;line-height:1.75;
  max-width:560px;margin:0 auto 28px;
  padding:20px 24px;
  background:linear-gradient(135deg,#f8f9fb,#fff);
  border-left:4px solid #f39c12;
  border-radius:14px;text-align:left;
}

/* Categories */
.mt-result-categories{
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:12px;margin-bottom:28px;
}
.mt-cat{
  padding:16px 12px;text-align:center;
  background:#f8f9fb;border-radius:14px;
  border:2px solid #e8eaf0;
}
.mt-cat-icon{font-size:1.6rem;line-height:1;margin-bottom:8px}
.mt-cat-name{
  font-size:.7rem;color:#888;font-weight:800;
  text-transform:uppercase;letter-spacing:.5px;
  margin-bottom:8px;
}
.mt-cat-score{
  font-size:1.4rem;font-weight:900;
  color:#c0392b;line-height:1;
  font-variant-numeric:tabular-nums;
}
.mt-cat-bar{
  height:6px;border-radius:3px;
  background:rgba(192,57,43,.1);
  margin-top:8px;overflow:hidden;
}
.mt-cat-bar-fill{
  height:100%;border-radius:3px;
  background:linear-gradient(90deg,#c0392b,#f39c12);
  transition:width 1s cubic-bezier(.16,1,.3,1);
}

/* Buttons */
.mt-result-actions{
  display:flex;gap:10px;justify-content:center;
  flex-wrap:wrap;margin-bottom:32px;
}
.mt-btn{
  padding:14px 28px;border-radius:14px;border:none;
  font-family:inherit;font-size:.95rem;font-weight:900;
  cursor:pointer;transition:all .25s cubic-bezier(.16,1,.3,1);
}
.mt-btn-primary{
  background:linear-gradient(135deg,#c0392b,#e74c3c);
  color:#fff;
  box-shadow:0 10px 28px -6px rgba(192,57,43,.6);
}
.mt-btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 36px -6px rgba(192,57,43,.8)}
.mt-btn-secondary{
  background:rgba(0,0,0,.05);
  color:#4a4a5e;
}
.mt-btn-secondary:hover{background:rgba(0,0,0,.1);transform:translateY(-2px)}

/* Leaderboard */
.mt-leaderboard{
  padding-top:28px;
  border-top:2px dashed rgba(0,0,0,.08);
}
.mt-h3{
  font-size:1.1rem;font-weight:900;color:#1a1a2e;
  margin:0 0 16px;letter-spacing:-.2px;
}
.mt-leader-list{display:flex;flex-direction:column;gap:6px}
.mt-leader-item{
  display:flex;align-items:center;gap:12px;
  padding:10px 14px;border-radius:12px;
  background:#f8f9fb;font-size:.9rem;
}
.mt-leader-item.mt-me{
  background:linear-gradient(135deg,#fff8e1,#fff5f5);
  border:2px solid #f39c12;
  font-weight:800;
}
.mt-leader-rank{
  font-size:1rem;font-weight:900;color:#c0392b;
  min-width:32px;text-align:center;
}
.mt-leader-name{
  flex:1;color:#4a4a5e;font-weight:700;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.mt-leader-score{
  font-weight:900;color:#f39c12;
  font-variant-numeric:tabular-nums;
}
.mt-leader-empty{
  text-align:center;padding:24px;color:#aaa;font-size:.9rem;
}

/* ═══ MOBILE ═══ */
@media (max-width:640px){
  .mt-hero{padding:44px 20px;border-radius:20px;min-height:420px}
  .mt-hero-title{font-size:1.7rem}
  .mt-hero-sub{font-size:.92rem}
  .mt-hero-icon{font-size:3.2rem}
  .mt-meta-item{padding:6px 12px;font-size:.72rem}

  .mt-test{padding:24px 18px;border-radius:20px}
  .mt-q-icon{font-size:2.4rem}
  .mt-q-text{font-size:1.05rem;margin-bottom:18px}
  .mt-answer{padding:14px 16px;font-size:.88rem;gap:10px}
  .mt-answer-emoji{font-size:1.2rem;width:28px;height:28px}

  .mt-result{padding:28px 18px;border-radius:20px}
  .mt-result-badge{font-size:3.5rem}
  .mt-result-title{font-size:1.35rem}
  .mt-result-score-value{font-size:3.5rem}
  .mt-result-desc{font-size:.9rem;padding:16px 18px;margin-bottom:20px}
  .mt-result-categories{grid-template-columns:1fr;gap:8px}
  .mt-cat{padding:12px 10px}
  .mt-btn{padding:12px 20px;font-size:.88rem}
  .mt-h3{font-size:1rem}
  .mt-leader-item{font-size:.82rem;padding:8px 12px}
}

@media (prefers-reduced-motion: reduce){
  #test-app *,#test-app *::before,#test-app *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
  .mt-observe{opacity:1;transform:none}
}
</style>

<script>
(function(){
'use strict';
if (window.__marsTestLoaded) return;
window.__marsTestLoaded = true;

/* ═══ SUPABASE ═══ */
var SUPABASE_URL = 'https://ncytbgbzfjfoqmmgfygz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
var sb = null;

function tryGetSb(){
  if (sb && sb.auth) return sb;
  if (window.supabaseClient && window.supabaseClient.auth){ sb = window.supabaseClient; return sb; }
  if (window.getSupabase){ try { var c = window.getSupabase(); if (c && c.auth){ sb = c; return sb; } } catch(e){} }
  if (window.supabase && typeof window.supabase.createClient === 'function'){
    try { sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY); return sb; } catch(e){}
  }
  return null;
}
function waitForSb(attempts){
  attempts = attempts || 0;
  return new Promise(function(resolve){
    var c = tryGetSb();
    if (c && c.auth) return resolve(c);
    if (attempts > 60) return resolve(null);
    setTimeout(function(){ waitForSb(attempts + 1).then(resolve); }, 100);
  });
}

/* ═══ ВОПРОСЫ ═══ */
// score — баллы (0..10), cat — категория
var QUESTIONS = [
  {
    icon:'🩺',
    text:'Какое у тебя здоровье в целом?',
    cat:'health',
    answers:[
      { emoji:'💪', text:'Идеальное. Спортивные достижения, никаких болезней', score:10 },
      { emoji:'👍', text:'Хорошее. Иногда простужаюсь, но в целом здоров', score:7 },
      { emoji:'🤔', text:'Среднее. Есть пара хронических болячек', score:4 },
      { emoji:'😔', text:'Слабое. Часто болею, есть ограничения', score:0 }
    ]
  },
  {
    icon:'🧠',
    text:'Как ты переносишь стресс и изоляцию?',
    cat:'psyche',
    answers:[
      { emoji:'🧘', text:'Отлично. Медитирую, работаю в одиночестве', score:10 },
      { emoji:'💼', text:'Нормально. Могу работать под давлением', score:7 },
      { emoji:'😰', text:'Плохо. Мне нужны люди вокруг', score:3 },
      { emoji:'😱', text:'Очень плохо. Один день без общения — катастрофа', score:0 }
    ]
  },
  {
    icon:'🎓',
    text:'Какое у тебя образование / профессия?',
    cat:'skills',
    answers:[
      { emoji:'🚀', text:'Инженер, врач, биолог или пилот', score:10 },
      { emoji:'💻', text:'IT, программирование, техника', score:8 },
      { emoji:'📚', text:'Гуманитарное, творческое', score:4 },
      { emoji:'🎮', text:'Пока никакого, всё впереди', score:1 }
    ]
  },
  {
    icon:'🏃',
    text:'Сколько ты двигаешься каждый день?',
    cat:'health',
    answers:[
      { emoji:'🏋️', text:'Час спорта или больше', score:10 },
      { emoji:'🚶', text:'30-60 минут (прогулка, зал)', score:7 },
      { emoji:'🛋️', text:'15-30 минут, в основном ходьба', score:4 },
      { emoji:'🛌', text:'Почти не двигаюсь', score:0 }
    ]
  },
  {
    icon:'😴',
    text:'Как у тебя со сном?',
    cat:'health',
    answers:[
      { emoji:'😴', text:'7-8 часов, сплю как убитый', score:10 },
      { emoji:'🙂', text:'6-7 часов, в целом норм', score:7 },
      { emoji:'😐', text:'5-6 часов, часто встаю разбитым', score:3 },
      { emoji:'💀', text:'Меньше 5 часов или бессонница', score:0 }
    ]
  },
  {
    icon:'🤝',
    text:'Как ты ладишь с людьми в команде?',
    cat:'psyche',
    answers:[
      { emoji:'🤝', text:'Легко. Всегда нахожу общий язык', score:10 },
      { emoji:'👍', text:'Хорошо, если люди адекватные', score:7 },
      { emoji:'😕', text:'Так себе. Часто конфликтую', score:3 },
      { emoji:'🙅', text:'Плохо. Предпочитаю работать один', score:1 }
    ]
  },
  {
    icon:'🛠️',
    text:'Что ты умеешь делать руками?',
    cat:'skills',
    answers:[
      { emoji:'🔧', text:'Многое: починить, построить, починить электронику', score:10 },
      { emoji:'🎨', text:'Что-то могу, но не профи', score:6 },
      { emoji:'📱', text:'Только смартфон и компьютер', score:3 },
      { emoji:'🤷', text:'Ничего, всё делают другие', score:0 }
    ]
  },
  {
    icon:'🍽️',
    text:'Как ты относишься к однообразной еде?',
    cat:'psyche',
    answers:[
      { emoji:'😋', text:'Могу есть одно и то же месяцами', score:10 },
      { emoji:'🙂', text:'Нормально, но люблю разнообразие', score:7 },
      { emoji:'😕', text:'Быстро надоедает, нужно новое', score:3 },
      { emoji:'😩', text:'Обязательно разное каждый день', score:0 }
    ]
  },
  {
    icon:'💉',
    text:'Есть ли у тебя хронические болезни?',
    cat:'health',
    answers:[
      { emoji:'✨', text:'Нет, полностью здоров', score:10 },
      { emoji:'🙂', text:'Мелкие (аллергия, миопия)', score:7 },
      { emoji:'😐', text:'Есть одна, требующая лекарств', score:3 },
      { emoji:'⚠️', text:'Несколько или серьёзные', score:0 }
    ]
  },
  {
    icon:'🌍',
    text:'Готов ли ты покинуть Землю навсегда?',
    cat:'psyche',
    answers:[
      { emoji:'🚀', text:'Да, без колебаний. Земля мне не так важна', score:10 },
      { emoji:'💭', text:'Скорее да, но буду скучать по близким', score:7 },
      { emoji:'😢', text:'Тяжело. Родные и дом держат', score:3 },
      { emoji:'❌', text:'Нет, не готов', score:0 }
    ]
  },
  {
    icon:'📖',
    text:'Как ты учишься новому?',
    cat:'skills',
    answers:[
      { emoji:'🚀', text:'Быстро, самостоятельно, с интересом', score:10 },
      { emoji:'📚', text:'Хорошо, если есть наставник', score:7 },
      { emoji:'🐢', text:'Медленно, нужен план', score:4 },
      { emoji:'😑', text:'Тяжело, предпочитаю знакомое', score:1 }
    ]
  },
  {
    icon:'🎯',
    text:'Зачем тебе Марс?',
    cat:'psyche',
    answers:[
      { emoji:'🌟', text:'Хочу внести вклад в будущее человечества', score:10 },
      { emoji:'💡', text:'Интересно, хочу увидеть своими глазами', score:7 },
      { emoji:'🏆', text:'Ради славы и статуса', score:4 },
      { emoji:'🤷', text:'Не знаю, просто прикольно', score:0 }
    ]
  }
];

/* ═══ РЕЗУЛЬТАТЫ ═══ */
var RESULTS = [
  { min:90, badge:'🏆', rank:'Кандидат №1', title:'Ты — идеальный колонист!',
    desc:'Ты в топ-1%. NASA уже должен был позвонить тебе. Здоровье, психика, навыки — всё в норме. Если серьёзно решишь полететь — конкуренцию ты пройдёшь.' },
  { min:75, badge:'🥇', rank:'Топ-5%', title:'Тебя возьмут!',
    desc:'Отличный кандидат. У тебя есть всё, чтобы пройти отбор. Пара тренировок и подтянуть одну-две слабые области — и ты в первой миссии.' },
  { min:60, badge:'🥈', rank:'Топ-15%', title:'Есть шансы',
    desc:'Ты в верхней половине списка. Правда, конкуренция жёсткая — из 10 000 человек отбирают 6. Но если поработаешь над слабыми местами, шансы появятся.' },
  { min:40, badge:'🥉', rank:'Средний уровень', title:'Надо подтянуться',
    desc:'Базовые качества есть, но пока недостаточно для миссии. Здоровье, психология или навыки — что-то хромает. Хорошая новость: большинство критериев можно развить за 2-3 года.' },
  { min:20, badge:'🌍', rank:'Пока рано', title:'Марс не для тебя (пока)',
    desc:'Ты — обычный землянин. Это не плохо, но для Марса нужно стать исключением. Много работы над собой, и, возможно, через 5-10 лет ты пересмотришь результат.' },
  { min:0,  badge:'🛋️', rank:'Дома лучше', title:'Оставайся на Земле',
    desc:'Марс тебя, скорее всего, убьёт. Ты — счастливый житель Земли. И это нормально: полететь могут единицы, а наслаждаться жизнью на голубой планете — все.' }
];

/* ═══ СОСТОЯНИЕ ═══ */
var state = {
  user: null,
  current: 0,
  answers: [],
  scores: { health: [], psyche: [], skills: [] }
};

var container = document.getElementById('test-app');
if (!container) return;

/* ═══ РЕНДЕР ═══ */
function renderQuestion(){
  var q = QUESTIONS[state.current];
  var total = QUESTIONS.length;

  // Прогресс
  document.getElementById('mt-q-num').textContent = state.current + 1;
  var percent = Math.round((state.current / total) * 100);
  document.getElementById('mt-q-percent').textContent = percent + '%';
  document.getElementById('mt-progress-fill').style.width = percent + '%';

  // Вопрос
  document.getElementById('mt-q-icon').textContent = q.icon;
  document.getElementById('mt-q-text').textContent = q.text;

  // Ответы
  var wrap = document.getElementById('mt-q-answers');
  wrap.innerHTML = q.answers.map(function(a, i){
    return '<button type="button" class="mt-answer" data-index="' + i + '">' +
      '<span class="mt-answer-emoji">' + a.emoji + '</span>' +
      '<span class="mt-answer-text">' + a.text + '</span>' +
    '</button>';
  }).join('');

  wrap.querySelectorAll('.mt-answer').forEach(function(btn){
    btn.addEventListener('click', function(){
      selectAnswer(parseInt(btn.dataset.index, 10));
    });
  });
}

function selectAnswer(index){
  var q = QUESTIONS[state.current];
  var a = q.answers[index];

  state.answers.push(index);
  state.scores[q.cat].push(a.score);

  state.current++;

  if (state.current >= QUESTIONS.length){
    showResult();
  } else {
    // Анимация смены
    var qEl = document.getElementById('mt-question');
    qEl.style.animation = 'none';
    void qEl.offsetWidth;
    qEl.style.animation = 'mtFadeIn .4s ease';
    renderQuestion();
  }
}

function calcTotalScore(){
  var total = 0;
  var count = 0;
  Object.keys(state.scores).forEach(function(cat){
    state.scores[cat].forEach(function(s){
      total += s;
      count++;
    });
  });
  return Math.round((total / (count * 10)) * 100);
}

function calcCategoryScore(cat){
  var arr = state.scores[cat] || [];
  if (!arr.length) return 0;
  var sum = 0;
  arr.forEach(function(s){ sum += s; });
  return Math.round((sum / (arr.length * 10)) * 100);
}

function getResult(score){
  for (var i = 0; i < RESULTS.length; i++){
    if (score >= RESULTS[i].min) return RESULTS[i];
  }
  return RESULTS[RESULTS.length - 1];
}

async function showResult(){
  var score = calcTotalScore();
  var result = getResult(score);

  document.getElementById('mt-test').style.display = 'none';
  var rEl = document.getElementById('mt-result');
  rEl.style.display = 'block';

  document.getElementById('mt-result-badge').textContent = result.badge;
  document.getElementById('mt-result-rank').textContent = result.rank;
  document.getElementById('mt-result-title').textContent = result.title;
  document.getElementById('mt-result-score-value').textContent = score;
  document.getElementById('mt-result-desc').textContent = result.desc;

  // Категории
  var cats = [
    { key:'health', icon:'🩺', name:'Здоровье' },
    { key:'psyche', icon:'🧠', name:'Психика' },
    { key:'skills', icon:'🛠️', name:'Навыки' }
  ];
  document.getElementById('mt-result-categories').innerHTML = cats.map(function(c){
    var s = calcCategoryScore(c.key);
    return '<div class="mt-cat">' +
      '<div class="mt-cat-icon">' + c.icon + '</div>' +
      '<div class="mt-cat-name">' + c.name + '</div>' +
      '<div class="mt-cat-score">' + s + '</div>' +
      '<div class="mt-cat-bar"><div class="mt-cat-bar-fill" style="width:' + s + '%"></div></div>' +
    '</div>';
  }).join('');

  // Сохранить результат
  await saveScore(score, result.rank);
  loadLeaderboard();
}

/* ═══ SHARE ═══ */
function shareResult(){
  var score = calcTotalScore();
  var result = getResult(score);
  var text = 'Я прошёл тест «Возьмут ли меня на Марс?» — ' + score + ' из 100. Результат: ' + result.title + ' 🚀';
  var url = window.location.href;

  if (navigator.share){
    navigator.share({ title: 'Тест: возьмут ли тебя на Марс?', text: text, url: url }).catch(function(){});
  } else {
    // Fallback — копируем в буфер
    var fullText = text + '\n' + url;
    if (navigator.clipboard){
      navigator.clipboard.writeText(fullText).then(function(){
        showToast('✅ Скопировано! Вставь в соцсети');
      });
    } else {
      showToast('Скопируй ссылку: ' + url);
    }
  }
}

function showToast(msg){
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);' +
    'padding:12px 24px;border-radius:30px;color:#fff;font-weight:800;font-size:.9rem;' +
    'background:linear-gradient(135deg,#f39c12,#c0392b);z-index:9999;pointer-events:none;' +
    'box-shadow:0 12px 32px rgba(243,156,18,.5);transition:transform .4s cubic-bezier(.16,1,.3,1);' +
    'max-width:90vw;text-align:center;';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(function(){ t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(function(){
    t.style.transform = 'translateX(-50%) translateY(120px)';
    setTimeout(function(){ t.remove(); }, 400);
  }, 3000);
}

/* ═══ SUPABASE ═══ */
async function loadProfile(){
  var client = await waitForSb();
  if (!client) return;
  try {
    var s = await client.auth.getSession();
    state.user = s && s.data && s.data.session ? s.data.session.user : null;
  } catch(e){}
}

async function saveScore(score, rank){
  if (!state.user) return;
  var client = await waitForSb();
  if (!client) return;
  try {
    await client.from('game_mars_test').insert({
      user_id: state.user.id,
      score: score,
      rank: rank,
      created_at: new Date().toISOString()
    });
  } catch(e){ console.warn('[test] saveScore:', e); }
}

async function loadLeaderboard(){
  var client = await waitForSb();
  if (!client) return;
  try {
    var r = await client.from('game_mars_test')
      .select('user_id, score, rank')
      .order('score', { ascending: false })
      .limit(10);
    if (!r.data || !r.data.length){
      document.getElementById('mt-leader').innerHTML =
        '<div class="mt-leader-empty">Пока никто не проходил. Будь первым!</div>';
      return;
    }
    var html = r.data.map(function(row, i){
      var isMe = state.user && state.user.id === row.user_id;
      var name = isMe ? 'Ты' : ('Игрок ' + row.user_id.slice(0, 6));
      return '<div class="mt-leader-item' + (isMe ? ' mt-me' : '') + '">' +
        '<div class="mt-leader-rank">' + (i+1) + '</div>' +
        '<div class="mt-leader-name">' + name + '</div>' +
        '<div class="mt-leader-score">' + row.score + '</div>' +
      '</div>';
    }).join('');
    document.getElementById('mt-leader').innerHTML = html;
  } catch(e){
    document.getElementById('mt-leader').innerHTML =
      '<div class="mt-leader-empty">Рейтинг временно недоступен</div>';
  }
}

/* ═══ INIT ═══ */
function init(){
  initObserve();
  renderQuestion();
  loadProfile();

  document.getElementById('mt-restart').addEventListener('click', function(){
    state.current = 0;
    state.answers = [];
    state.scores = { health: [], psyche: [], skills: [] };
    document.getElementById('mt-result').style.display = 'none';
    document.getElementById('mt-test').style.display = 'block';
    renderQuestion();
    window.scrollTo({ top: document.getElementById('mt-test').offsetTop - 20, behavior: 'smooth' });
  });

  document.getElementById('mt-share').addEventListener('click', shareResult);

  console.log('🚀 Тест Марс загружен. Вопросов: ' + QUESTIONS.length);
}

function initObserve(){
  var items = document.querySelectorAll('.mt-observe');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('mt-visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add('mt-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function(el){ io.observe(el); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
</script>
