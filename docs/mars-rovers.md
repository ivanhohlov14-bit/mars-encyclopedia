---
title: Связь с Марсом — как поговорить через 400 млн км
description: Как работает связь с Марсом — задержка сигнала, Deep Space Network, лазерная связь DSOC, солнечная конъюнкция. Симулятор задержки и интерактивная карта антенн.
comments: false
---

<div id="comm-app">

<!-- HERO -->
<div class="cm-hero cm-observe">
  <div class="cm-hero-img" style="background-image:url('/assets/images/hero-deep-space-network.jpg')"></div>
  <div class="cm-hero-overlay"></div>
  <div class="cm-hero-stars">
    <div class="cm-star"></div><div class="cm-star"></div><div class="cm-star"></div>
    <div class="cm-star"></div><div class="cm-star"></div><div class="cm-star"></div>
    <div class="cm-star"></div><div class="cm-star"></div><div class="cm-star"></div>
    <div class="cm-star"></div><div class="cm-star"></div><div class="cm-star"></div>
  </div>
  <div class="cm-hero-beam"></div>
  <div class="cm-hero-content">
    <div class="cm-hero-tag">Спецпроект · Космическая связь</div>
    <div class="cm-hero-icon">📡</div>
    <h1 class="cm-hero-title">Связь с Марсом</h1>
    <p class="cm-hero-sub">
      Как передать сообщение через 400 миллионов километров, почему
      нельзя позвонить на Марс и как NASA держит связь с роверами
      уже 30 лет.
    </p>
    <div class="cm-hero-meta">
      <span class="cm-meta-item">⏱️ 5–22 мин задержка</span>
      <span class="cm-meta-item">📡 3 антенны</span>
      <span class="cm-meta-item">🧮 2 симулятора</span>
      <span class="cm-meta-item">📖 14 мин</span>
    </div>
  </div>
  <div class="cm-hero-scroll">
    <div class="cm-scroll-dot"></div>
    <span>Листайте вниз</span>
  </div>
</div>

<!-- CALLOUT -->
<div class="cm-callout cm-observe">
  <div class="cm-callout-icon">🎯</div>
  <div class="cm-callout-body">
    <strong>Главная проблема — не «передать сигнал».</strong>
    Проблема в том, что <strong>сигнал идёт со скоростью света</strong> — и это медленно.
    22 минуты в одну сторону — вот с чем работают инженеры NASA.
  </div>
</div>

<!-- FACTS -->
<div class="cm-facts cm-observe">
  <div class="cm-fact-card">
    <div class="cm-fact-icon">⏱️</div>
    <div class="cm-fact-value"><span class="cm-counter" data-target="22">0</span><span class="cm-fact-unit">мин</span></div>
    <div class="cm-fact-label">максимум<br>в одну сторону</div>
  </div>
  <div class="cm-fact-card">
    <div class="cm-fact-icon">📡</div>
    <div class="cm-fact-value"><span class="cm-counter" data-target="3">0</span></div>
    <div class="cm-fact-label">антенны DSN<br>по всему миру</div>
  </div>
  <div class="cm-fact-card">
    <div class="cm-fact-icon">🔭</div>
    <div class="cm-fact-value"><span class="cm-counter" data-target="70">0</span><span class="cm-fact-unit">м</span></div>
    <div class="cm-fact-label">диаметр<br>антенны</div>
  </div>
  <div class="cm-fact-card">
    <div class="cm-fact-icon">🚀</div>
    <div class="cm-fact-value"><span class="cm-counter" data-target="1960">0</span></div>
    <div class="cm-fact-label">год основания<br>сети DSN</div>
  </div>
</div>

<!-- INTRO -->
<div class="cm-intro cm-observe">
  <p>
    Марс — самая близкая к нам планета после Венеры. И самая
    сложная для связи. <strong>Расстояние меняется</strong>: от
    54.6 млн км в момент противостояния до 401 млн км в
    противостоянии с Солнцем между нами.
  </p>
  <p>
    Разберём всё: как летит сигнал, что такое Deep Space Network,
    зачем нужны три антенны по всему миру и что ждёт нас
    в будущем — от лазеров до интернета на Марсе.
  </p>
</div>

<!-- ═══ 01 ЗАДЕРЖКА ═══ -->
<h2 class="cm-h2 cm-observe">
  <span class="cm-h2-num">01</span>
  Задержка сигнала — 22 минуты в одну сторону
</h2>

<div class="cm-section cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-signal-path.jpeg"
         alt="Путь сигнала от Земли к Марсу" loading="lazy">
    <div class="cm-section-img-badge">📡 Путь сигнала</div>
  </div>
  <div class="cm-section-text">
    <p>
      Радиоволны летят со скоростью света — <strong>300 000 км/с</strong>.
      Но даже на такой скорости путь до Марса занимает
      <strong>от 5 до 22 минут</strong>.
    </p>
    <p>
      Расстояние между планетами меняется. Когда Марс и Земля
      находятся по одну сторону от Солнца — <strong>5 минут</strong>.
      Когда по разные — <strong>22 минуты</strong>.
    </p>
    <div class="cm-fact-box">
      <div class="cm-fact-box-icon">💡</div>
      <div class="cm-fact-box-body">
        <strong>Что это значит:</strong> нельзя «поговорить» с ровером
        в прямом эфире. Отправил команду → ждёшь 22 минуты → ровер
        отвечает → ещё 22 минуты. Полный цикл — <strong>44 минуты</strong>.
      </div>
    </div>
  </div>
</div>

<!-- СИМУЛЯТОР ЗАДЕРЖКИ -->
<h2 class="cm-h2 cm-observe">🧮 Симулятор: сколько ждать ответа?</h2>
<div class="cm-sim cm-observe">
  <div class="cm-sim-intro">
    📏 Сдвиньте слайдер — узнайте задержку в одну сторону
    и время полного «пинг-понга» с Марсом.
  </div>

  <div class="cm-sim-input">
    <label for="cm-dist">Расстояние до Марса</label>
    <div class="cm-slider-wrap">
      <input type="range" id="cm-dist" min="54.6" max="401" value="225" step="1">
      <div class="cm-slider-value">
        <span id="cm-dist-value">225</span><span>млн км</span>
      </div>
    </div>
    <div class="cm-slider-marks">
      <span>54.6</span><span>150</span><span>250</span><span>401</span>
    </div>
  </div>

  <div class="cm-sim-results">
    <div class="cm-sim-card">
      <div class="cm-sim-icon">➡️</div>
      <div class="cm-sim-value" id="cm-one-way">12.5</div>
      <div class="cm-sim-label">минут<br>в одну сторону</div>
    </div>
    <div class="cm-sim-card">
      <div class="cm-sim-icon">🔄</div>
      <div class="cm-sim-value" id="cm-round">25.0</div>
      <div class="cm-sim-label">минут<br>туда-обратно</div>
    </div>
    <div class="cm-sim-card">
      <div class="cm-sim-icon">💬</div>
      <div class="cm-sim-value" id="cm-msg">1</div>
      <div class="cm-sim-label">сообщений<br>за час</div>
    </div>
    <div class="cm-sim-card">
      <div class="cm-sim-icon">🚀</div>
      <div class="cm-sim-value" id="cm-travel">3.5</div>
      <div class="cm-sim-label">месяцев<br>корабля</div>
    </div>
  </div>

  <div class="cm-sim-note">
    💡 Расчёт: скорость света 299 792 км/с. Полный цикл = 2× пути ÷ скорость.
    «Сообщений за час» — сколько раз можно обменяться репликами за 60 минут.
  </div>
</div>

<!-- ═══ 02 DSN ═══ -->
<h2 class="cm-h2 cm-observe">
  <span class="cm-h2-num">02</span>
  Deep Space Network — три антенны на весь космос
</h2>

<div class="cm-section cm-section-reverse cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-dsn-antenna.jpg"
         alt="Антенна Deep Space Network" loading="lazy">
    <div class="cm-section-img-badge">📡 DSN</div>
  </div>
  <div class="cm-section-text">
    <p>
      <strong>Deep Space Network (DSN)</strong> — это три гигантские
      антенны NASA, расположенные в разных точках Земли. Они
      работают <strong>24/7</strong> и держат связь со всеми
      дальними миссиями — от «Вояджеров» до Perseverance.
    </p>
    <p>
      Три антенны нужны, чтобы <strong>Земля не блокировала</strong>
      сигнал при вращении. Пока одна повёрнута в сторону Марса,
      другая подхватывает эстафету.
    </p>
  </div>
</div>

<!-- ИНТЕРАКТИВНАЯ КАРТА DSN -->
<div class="cm-dsn cm-observe">
  <div class="cm-dsn-head">
    <div class="cm-dsn-title">🌍 Три комплекса DSN</div>
    <div class="cm-dsn-sub">Кликните на точку — узнайте детали</div>
  </div>

  <div class="cm-dsn-map">
    <svg viewBox="0 0 800 400" class="cm-dsn-svg">
      <defs>
        <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#4a90e2" stop-opacity=".5"/>
          <stop offset="100%" stop-color="#4a90e2" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="400" cy="200" rx="380" ry="180" fill="none" stroke="rgba(135,206,235,.15)" stroke-width="1" stroke-dasharray="4,6"/>
      <ellipse cx="400" cy="200" rx="280" ry="130" fill="none" stroke="rgba(135,206,235,.2)" stroke-width="1"/>
      <circle cx="400" cy="200" r="120" fill="url(#earthGlow)"/>
      <circle cx="400" cy="200" r="80" fill="rgba(74,144,226,.35)" stroke="rgba(135,206,235,.5)" stroke-width="1.5"/>
      <text x="400" y="205" fill="#87ceeb" font-size="18" font-weight="900" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif">ЗЕМЛЯ</text>
    </svg>
    <div class="cm-dsn-points">
      <button class="cm-dsn-point" data-site="goldstone" style="top:38%;left:18%" type="button">
        <span class="cm-dsn-pulse"></span>
        <span class="cm-dsn-dot"></span>
        <span class="cm-dsn-label">🇺🇸 Голдстоун</span>
      </button>
      <button class="cm-dsn-point" data-site="madrid" style="top:32%;left:52%" type="button">
        <span class="cm-dsn-pulse"></span>
        <span class="cm-dsn-dot"></span>
        <span class="cm-dsn-label">🇪🇸 Мадрид</span>
      </button>
      <button class="cm-dsn-point" data-site="canberra" style="top:68%;left:78%" type="button">
        <span class="cm-dsn-pulse"></span>
        <span class="cm-dsn-dot"></span>
        <span class="cm-dsn-label">🇦🇺 Канберра</span>
      </button>
    </div>
  </div>

  <div class="cm-dsn-info" id="cm-dsn-info">
    <div class="cm-dsn-info-icon">👆</div>
    <div class="cm-dsn-info-text">Выберите антенну</div>
  </div>
</div>

<!-- ═══ 03 ПУТЬ СИГНАЛА ═══ -->
<h2 class="cm-h2 cm-observe">
  <span class="cm-h2-num">03</span>
  Как сигнал доходит до ровера
</h2>

<div class="cm-section cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-orbital-relay.jpeg"
         alt="Орбитальный ретранслятор Марса" loading="lazy">
    <div class="cm-section-img-badge">🛰️ Ретранслятор</div>
  </div>
  <div class="cm-section-text">
    <p>
      Напрямую с Земли до ровера сигнал не дойдёт — слишком слабый.
      Поэтому работают <strong>двумя путями</strong>:
    </p>
    <p>
      <strong>1. Напрямую</strong> — DSN ловит слабый сигнал от ровера.
      <strong>2. Через орбитальный ретранслятор</strong> — ровер
      отправляет на орбитальный аппарат (MRO, MAVEN, TGO), а тот
      уже передаёт на Землю <strong>мощным лучом</strong>.
    </p>
    <div class="cm-fact-box">
      <div class="cm-fact-box-icon">📶</div>
      <div class="cm-fact-box-body">
        <strong>Мощность сигнала от ровера:</strong> ~100 ватт —
        как лампочка. К моменту приёма на Земле сигнал слабее
        в <strong>триллионы раз</strong>. Его ловят сверхчувствительные
        антенны.
      </div>
    </div>
  </div>
</div>

<div class="cm-section cm-section-reverse cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-rover-antenna.jpeg"
         alt="Антенна на марсоходе" loading="lazy">
    <div class="cm-section-img-badge">📡 Ровер</div>
  </div>
  <div class="cm-section-text">
    <p>
      У каждого марсохода — <strong>две антенны</strong>:
    </p>
    <p>
      <strong>Low-Gain</strong> — слабая, всенаправленная. Для
      экстренной связи, когда ровер не знает где Земля.
      <strong>High-Gain</strong> — направленная тарелка, которую
      ровер поворачивает точно на Землю.
    </p>
    <p>
      Curiosity и Perseverance используют <strong>X-диапазон</strong>
      (8 ГГц). Это позволяет передавать до <strong>32 кбит/с</strong>
      напрямую — быстрее старого модема.
    </p>
  </div>
</div>

<!-- ═══ 04 ЛАЗЕР ═══ -->
<h2 class="cm-h2 cm-observe">
  <span class="cm-h2-num">04</span>
  Лазерная связь — будущее уже здесь
</h2>

<div class="cm-section cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-laser-communication.jpg"
         alt="Лазерная связь с Марсом" loading="lazy">
    <div class="cm-section-img-badge">⚡ DSOC</div>
  </div>
  <div class="cm-section-text">
    <p>
      В 2023 году NASA протестировало <strong>DSOC</strong> — Deep
      Space Optical Communications. Это <strong>лазерная связь</strong>
      вместо радиоволн.
    </p>
    <p>
      Вместо радиоволн — <strong>инфракрасный лазер</strong>.
      Он в <strong>10–100 раз быстрее</strong>: можно передавать
      видео в высоком качестве с Марса.
    </p>
    <div class="cm-fact-box">
      <div class="cm-fact-box-icon">🎯</div>
      <div class="cm-fact-box-body">
        <strong>Первая передача DSOC:</strong> декабрь 2023 года.
        NASA передало <strong>видео с котом</strong> Taters на расстояние
        31 млн км. Скорость — <strong>267 Мбит/с</strong>. Это быстрее,
        чем домашний интернет в большинстве стран.
      </div>
    </div>
  </div>
</div>

<!-- СРАВНЕНИЕ СКОРОСТЕЙ -->
<h2 class="cm-h2 cm-observe">📊 Сравнение скоростей связи</h2>
<div class="cm-compare cm-observe">
  <div class="cm-compare-row">
    <div class="cm-compare-label">Скорость передачи</div>
    <div class="cm-compare-bars">
      <div class="cm-compare-item">
        <span class="cm-compare-name">X-диапазон (радио)</span>
        <div class="cm-compare-bar"><div class="cm-compare-fill" style="--w:1%;--c:#f39c12"></div></div>
        <span class="cm-compare-value">32 кбит/с</span>
      </div>
      <div class="cm-compare-item">
        <span class="cm-compare-name">Ka-диапазон</span>
        <div class="cm-compare-bar"><div class="cm-compare-fill" style="--w:15%;--c:#3498db"></div></div>
        <span class="cm-compare-value">~500 кбит/с</span>
      </div>
      <div class="cm-compare-item">
        <span class="cm-compare-name">Лазер DSOC</span>
        <div class="cm-compare-bar"><div class="cm-compare-fill" style="--w:100%;--c:#9b59b6"></div></div>
        <span class="cm-compare-value">267 Мбит/с</span>
      </div>
      <div class="cm-compare-item">
        <span class="cm-compare-name">Домашний Wi-Fi</span>
        <div class="cm-compare-bar"><div class="cm-compare-fill" style="--w:75%;--c:#27ae60"></div></div>
        <span class="cm-compare-value">100 Мбит/с</span>
      </div>
    </div>
  </div>
</div>

<!-- ═══ 05 ПОМЕХИ ═══ -->
<h2 class="cm-h2 cm-observe">
  <span class="cm-h2-num">05</span>
  Помехи: почему связь иногда пропадает
</h2>

<div class="cm-section cm-section-reverse cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-solar-conjunction.jpeg"
         alt="Солнечная конъюнкция" loading="lazy">
    <div class="cm-section-img-badge">☀️ Конъюнкция</div>
  </div>
  <div class="cm-section-text">
    <p>
      Раз в <strong>26 месяцев</strong> Марс оказывается за Солнцем —
      эта ситуация называется <strong>солнечной конъюнкцией</strong>.
    </p>
    <p>
      Солнце блокирует сигнал полностью. Даже если бы не блокировало,
      <strong>ионизированная корона</strong> так искажает данные,
      что они бесполезны. NASA <strong>прекращает все команды</strong>
      на 2–3 недели.
    </p>
    <div class="cm-fact-box">
      <div class="cm-fact-box-icon">⏸️</div>
      <div class="cm-fact-box-body">
        <strong>Что делают роверы в конъюнкцию:</strong> они получают
        «резервные» задания заранее и работают автономно. Curiosity
        в 2019 году 2 недели вел полностью самостоятельные наблюдения.
      </div>
    </div>
  </div>
</div>

<div class="cm-section cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-delay-clock.jpg"
         alt="Задержка сигнала" loading="lazy">
    <div class="cm-section-img-badge">⏱️ Задержка</div>
  </div>
  <div class="cm-section-text">
    <p>
      Помимо конъюнкции, есть ещё проблемы:
    </p>
    <p>
      <strong>Пылевые бури</strong> — пыль в атмосфере Марса мешает
      сигналу от ровера. <strong>Солнечная активность</strong> — вспышки
      создают помехи. <strong>Тепловые шумы</strong> — антенны
      нагреваются и «шумят».
    </p>
    <p>
      Поэтому NASA всегда использует <strong>помехоустойчивые коды</strong>
      — данные передаются с избыточностью, чтобы восстановить сигнал
      даже при 50% потере.
    </p>
  </div>
</div>

<!-- ═══ 06 БУДУЩЕЕ ═══ -->
<h2 class="cm-h2 cm-observe">
  <span class="cm-h2-num">06</span>
  Интернет на Марсе — будущее связи
</h2>

<div class="cm-section cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-mars-internet.jpg"
         alt="Интернет на Марсе" loading="lazy">
    <div class="cm-section-img-badge">🌐 Колония</div>
  </div>
  <div class="cm-section-text">
    <p>
      Когда на Марсе появится колония, понадобится <strong>полноценный
      интернет</strong>. Но обычный TCP/IP не работает: задержка в
      22 минуты убивает любые интерактивные протоколы.
    </p>
    <p>
      Уже разработан <strong>Delay-Tolerant Networking (DTN)</strong> —
      «межпланетный интернет». Данные хранятся на промежуточных
      узлах и передаются дальше <strong>когда связь есть</strong>.
    </p>
    <div class="cm-fact-box">
      <div class="cm-fact-box-icon">🌍</div>
      <div class="cm-fact-box-body">
        <strong>Идея:</strong> как email, а не как звонок. Ты отправил
        сообщение — оно летит по цепочке: Марс → орбита → Земля.
        Не важно, что задержка — главное, что дойдёт.
      </div>
    </div>
  </div>
</div>

<div class="cm-section cm-section-reverse cm-observe">
  <div class="cm-section-img">
    <img src="/assets/images/section-future-network.jpg"
         alt="Будущая сеть связи в Солнечной системе" loading="lazy">
    <div class="cm-section-img-badge">🚀 Будущее</div>
  </div>
  <div class="cm-section-text">
    <p>
      К 2050 году NASA планирует <strong>единую сеть связи</strong>
      по всей Солнечной системе. Не только Земля–Марс, но и
      <strong>Луна, Юпитер, спутники</strong>.
    </p>
    <p>
      Основа — <strong>лазерные ретрансляторы</strong> на орбитах
      планет. Это даст задержку меньше и скорость выше, чем
      сейчас.
    </p>
    <p>
      А когда-нибудь Марс будет <strong>в прямом эфире</strong> — с
      задержкой всего 3 минуты. Как между Нью-Йорком и Лондоном.
      Только через 100 лет технологий.
    </p>
  </div>
</div>

<!-- FAQ -->
<h2 class="cm-h2 cm-observe">❓ Частые вопросы</h2>
<div class="cm-faq cm-observe">
  <details class="cm-faq-item">
    <summary><span>Почему нельзя позвонить на Марс?</span><span class="cm-faq-icon">▸</span></summary>
    <div class="cm-faq-answer">
      Задержка <strong>5–22 минуты</strong> в одну сторону. Ты говоришь
      «Привет» — ждёшь 20 минут — слышишь «Привет». Ещё 20 минут —
      свой ответ. <strong>Разговор в 40 раз медленнее</strong>, чем
      на Земле. Живая беседа невозможна.
    </div>
  </details>

  <details class="cm-faq-item">
    <summary><span>Что такое солнечная конъюнкция?</span><span class="cm-faq-icon">▸</span></summary>
    <div class="cm-faq-answer">
      Момент, когда Марс и Земля находятся по <strong>разные стороны
      от Солнца</strong>. Раз в 26 месяцев. Сигнал либо блокируется,
      либо искажается ионизированной короной.
      <strong>NASA прекращает все команды на 2–3 недели</strong>.
    </div>
  </details>

  <details class="cm-faq-item">
    <summary><span>Сколько данных можно передать с Марса?</span><span class="cm-faq-icon">▸</span></summary>
    <div class="cm-faq-answer">
      Со старых роверов — <strong>до 32 кбит/с</strong> (через X-диапазон).
      Это медленнее, чем dial-up в 90-х. Perseverance может
      передавать <strong>до 2 Мбит/с</strong> через орбитальный
      ретранслятор. Лазер DSOC — до <strong>267 Мбит/с</strong>.
    </div>
  </details>

  <details class="cm-faq-item">
    <summary><span>Как NASA управляет ровером с задержкой?</span><span class="cm-faq-icon">▸</span></summary>
    <div class="cm-faq-answer">
      Ровер работает <strong>автономно</strong>. Утром команда
      отправляет «план на день»: проехать 20 метров, сделать
      снимки, собрать образец. Ровер выполняет сам, обходя
      препятствия. Вечером присылает отчёт. <strong>Как переписка,
      а не как игра.</strong>
    </div>
  </details>

  <details class="cm-faq-item">
    <summary><span>Можно ли взломать связь с Марсом?</span><span class="cm-faq-icon">▸</span></summary>
    <div class="cm-faq-answer">
      Технически — сложно, но не невозможно. NASA использует
      <strong>шифрование</strong> и <strong>проверку подлинности</strong>
      команд. В 2008 году был случай: китайский спутник случайно
      пересёк луч DSN. NASA временно потеряло сигнал, но
      <strong>данные не пострадали</strong>.
    </div>
  </details>

  <details class="cm-faq-item">
    <summary><span>Сколько стоит связь с Марсом?</span><span class="cm-faq-icon">▸</span></summary>
    <div class="cm-faq-answer">
      Точных цифр нет, но обслуживание <strong>DSN стоит ~$200 млн
      в год</strong>. Это ~5% от бюджета NASA на планетарные миссии.
      Стоимость лазерной связи пока <strong>выше в 10–20 раз</strong>,
      но падает с каждым годом.
    </div>
  </details>

  <details class="cm-faq-item">
    <summary><span>Как передают видео с Марса?</span><span class="cm-faq-icon">▸</span></summary>
    <div class="cm-faq-answer">
      <strong>Никак — пока.</strong> Видео требует огромной
      пропускной способности. Сейчас передают <strong>фото</strong>
      (медленно) и <strong>короткие видео</strong> для особых
      событий (посадка Perseverance — 3 минуты). С DSOC
      появится возможность стриминга.
    </div>
  </details>

  <details class="cm-faq-item">
    <summary><span>Когда Марс будет в прямом эфире?</span><span class="cm-faq-icon">▸</span></summary>
    <div class="cm-faq-answer">
      <strong>Никогда.</strong> Физика не позволит: сигнал всё равно
      идёт 5–22 минуты. Но можно <strong>уменьшить задержку</strong>
      — за счёт ретрансляторов на орбите Марса и лазерных
      линий. Реалистичный минимум — <strong>3–5 минут</strong>
      к 2050-м.
    </div>
  </details>
</div>

<!-- CONCLUSION -->
<div class="cm-conclusion cm-observe">
  <div class="cm-conclusion-icon">📡</div>
  <div class="cm-conclusion-body">
    <div class="cm-conclusion-title">Что это значит для будущего</div>
    <p>
      Связь с Марсом — <strong>не «техническая мелочь»</strong>, а
      фундамент всей марсианской эпохи. Без неё нет управления
      роверами, нет научных открытий, не будет колонии.
    </p>
    <p style="margin-top:12px;">
      Уже сегодня NASA передаёт данные через <strong>400 млн км</strong>
      с точностью до секунды. Лазеры DSOC ускоряют связь
      в <strong>тысячи раз</strong>.
    </p>
    <p style="margin-top:12px;">
      И когда первый человек ступит на Марс — <strong>он сможет
      позвонить домой</strong>. С задержкой 20 минут, но сможет.
      Это будет самый длинный телефонный звонок в истории
      человечества.
    </p>
  </div>
</div>

<!-- RELATED -->
<h2 class="cm-h2 cm-observe">📚 Читайте также</h2>
<div class="cm-related cm-observe">
  <a href="/mars-rovers/" class="cm-related-card">
    <div class="cm-related-icon">🤖</div>
    <div class="cm-related-info">
      <div class="cm-related-title">Марсоходы: 30 лет</div>
      <div class="cm-related-sub">История пяти роверов NASA</div>
    </div>
  </a>
  <a href="/road-to-mars/" class="cm-related-card">
    <div class="cm-related-icon">🚀</div>
    <div class="cm-related-info">
      <div class="cm-related-title">Дорога на Марс</div>
      <div class="cm-related-sub">Как долететь за 7 месяцев</div>
    </div>
  </a>
  <a href="/horoscope/" class="cm-related-card">
    <div class="cm-related-icon">🔮</div>
    <div class="cm-related-info">
      <div class="cm-related-title">Марсианский гороскоп</div>
      <div class="cm-related-sub">8 знаков зодиака Марса</div>
    </div>
  </a>
  <a href="/human-on-mars/" class="cm-related-card">
    <div class="cm-related-icon">⚕️</div>
    <div class="cm-related-info">
      <div class="cm-related-title">Человек на Марсе</div>
      <div class="cm-related-sub">Что будет с телом</div>
    </div>
  </a>
</div>

</div>

<style>
/* ═══ ROOT ═══ */
#comm-app{
  max-width:940px;margin:0 auto;padding:0 8px 60px;
  font-family:-apple-system,'Segoe UI',Roboto,sans-serif;
  color:#1a1a2e;line-height:1.7;
  -webkit-tap-highlight-color:transparent;
}
#comm-app *{box-sizing:border-box}
#comm-app a{text-decoration:none!important;border-bottom:none!important}

@keyframes cmSpin{to{transform:rotate(360deg)}}
@keyframes cmFadeIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes cmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes cmPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.6}}
@keyframes cmShine{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes cmStar{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
@keyframes cmRing{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.8);opacity:0}}
@keyframes cmBarGrow{from{width:0}}
@keyframes cmScrollDot{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(8px);opacity:.4}}
@keyframes cmBeam{
  0%,100%{transform:translateX(-100%);opacity:0}
  50%{opacity:1}
  100%{transform:translateX(100%);opacity:0}
}
@keyframes cmRipple{
  0%{transform:scale(.8);opacity:1}
  100%{transform:scale(2.2);opacity:0}
}

.cm-observe{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1)}
.cm-observe.cm-visible{opacity:1;transform:translateY(0)}

/* ═══ HERO ═══ */
.cm-hero{
  position:relative;border-radius:26px;
  padding:60px 36px 60px;
  color:#fff;margin-bottom:26px;overflow:hidden;text-align:center;
  box-shadow:0 30px 90px -20px rgba(0,0,0,.7);
  min-height:520px;
  display:flex;align-items:center;justify-content:center;
  isolation:isolate;
}
.cm-hero-img{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
  z-index:0;transform:scale(1.05);
}
.cm-hero-overlay{
  position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(10,15,30,.82) 0%,rgba(20,30,60,.75) 50%,rgba(15,52,96,.82) 100%);
  z-index:1;
}
.cm-hero-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:2}
.cm-star{
  position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;
  box-shadow:0 0 6px #fff;animation:cmStar 3.5s ease-in-out infinite;
}
.cm-star:nth-child(1){top:12%;left:8%;animation-delay:0s}
.cm-star:nth-child(2){top:22%;left:18%;animation-delay:.4s;width:1.5px;height:1.5px}
.cm-star:nth-child(3){top:68%;left:12%;animation-delay:.9s}
.cm-star:nth-child(4){top:32%;left:82%;animation-delay:1.4s}
.cm-star:nth-child(5){top:78%;left:88%;animation-delay:.6s;width:1.5px;height:1.5px}
.cm-star:nth-child(6){top:18%;left:62%;animation-delay:1.1s}
.cm-star:nth-child(7){top:52%;left:44%;animation-delay:.3s}
.cm-star:nth-child(8){top:42%;left:94%;animation-delay:1.8s}
.cm-star:nth-child(9){top:84%;left:28%;animation-delay:2.1s}
.cm-star:nth-child(10){top:8%;left:38%;animation-delay:1.5s}
.cm-star:nth-child(11){top:64%;left:66%;animation-delay:.7s}
.cm-star:nth-child(12){top:28%;left:22%;animation-delay:1.9s;width:1.5px;height:1.5px}

.cm-hero-beam{
  position:absolute;top:0;bottom:0;left:0;width:40%;
  background:linear-gradient(90deg,transparent,rgba(135,206,235,.15),transparent);
  z-index:2;pointer-events:none;
  animation:cmBeam 6s ease-in-out infinite;
  filter:blur(20px);
}

.cm-hero-content{position:relative;z-index:3;max-width:720px;margin:0 auto}
.cm-hero-tag{
  display:inline-block;padding:7px 18px;border-radius:22px;
  background:rgba(135,206,235,.2);border:1px solid rgba(135,206,235,.5);
  color:#87ceeb;font-size:.75rem;font-weight:800;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;
  backdrop-filter:blur(10px);
}
.cm-hero-icon{
  display:inline-block;font-size:4rem;margin-bottom:10px;
  animation:cmFloat 4s ease-in-out infinite;
  filter:drop-shadow(0 8px 32px rgba(135,206,235,.8));
  line-height:1;
}
.cm-hero-title{
  font-size:2.6rem;font-weight:900;margin:0 0 16px;
  letter-spacing:-.6px;line-height:1.15;
  background:linear-gradient(90deg,#fff 0%,#87ceeb 25%,#a29bfe 50%,#87ceeb 75%,#fff 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;animation:cmShine 6s linear infinite;
  text-shadow:0 4px 20px rgba(0,0,0,.5);
}
.cm-hero-sub{font-size:1.08rem;opacity:.92;margin:0 0 24px;line-height:1.65;text-shadow:0 2px 8px rgba(0,0,0,.5)}
.cm-hero-meta{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.cm-meta-item{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 16px;border-radius:22px;
  background:rgba(255,255,255,.1);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.2);
  font-size:.8rem;font-weight:700;color:#fff;
}
.cm-hero-scroll{
  position:absolute;bottom:20px;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:8px;
  color:rgba(255,255,255,.55);font-size:.7rem;letter-spacing:1px;
  text-transform:uppercase;font-weight:700;z-index:3;
}
.cm-scroll-dot{
  width:22px;height:36px;border-radius:12px;
  border:2px solid rgba(255,255,255,.35);position:relative;
}
.cm-scroll-dot::before{
  content:'';position:absolute;top:6px;left:50%;transform:translateX(-50%);
  width:4px;height:6px;border-radius:2px;
  background:rgba(255,255,255,.65);
  animation:cmScrollDot 1.8s ease-in-out infinite;
}

/* ═══ CALLOUT ═══ */
.cm-callout{
  display:flex;gap:16px;align-items:flex-start;
  padding:22px 26px;margin-bottom:32px;
  background:linear-gradient(135deg,rgba(135,206,235,.08),rgba(162,155,254,.04));
  border-left:5px solid #87ceeb;border-radius:16px;
  font-size:.98rem;line-height:1.75;
  box-shadow:0 8px 24px -8px rgba(135,206,235,.2);
}
.cm-callout-icon{font-size:2rem;flex-shrink:0;line-height:1;animation:cmFloat 3s ease-in-out infinite}
.cm-callout-body{color:#333}
.cm-callout-body strong{color:#2980b9;font-weight:900}

/* ═══ FACTS ═══ */
.cm-facts{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  gap:14px;margin-bottom:40px;
}
.cm-fact-card{
  padding:22px 18px;text-align:center;
  background:#fff;border-radius:18px;
  border:2px solid rgba(135,206,235,.15);
  box-shadow:0 8px 24px rgba(0,0,0,.05);
  transition:all .35s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
}
.cm-fact-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,#87ceeb,#a29bfe);
  background-size:200% auto;animation:cmShine 4s linear infinite;
}
.cm-fact-card:hover{
  transform:translateY(-6px);
  box-shadow:0 20px 50px -10px rgba(135,206,235,.35);
  border-color:#87ceeb;
}
.cm-fact-icon{font-size:2rem;margin-bottom:10px;line-height:1}
.cm-fact-value{
  display:flex;align-items:baseline;justify-content:center;gap:4px;
  font-size:2rem;font-weight:900;line-height:1;
  background:linear-gradient(135deg,#2980b9,#87ceeb);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;font-variant-numeric:tabular-nums;
}
.cm-fact-unit{font-size:.9rem;font-weight:900;opacity:.85}
.cm-fact-label{
  font-size:.72rem;color:#888;font-weight:800;
  text-transform:uppercase;letter-spacing:.8px;margin-top:8px;
  line-height:1.3;
}

/* ═══ INTRO ═══ */
.cm-intro{
  padding:0 4px;margin-bottom:40px;
  font-size:1.05rem;line-height:1.85;color:#333;
}
.cm-intro p{margin:0 0 16px}
.cm-intro strong{color:#2980b9;font-weight:900}

/* ═══ H2 ═══ */
.cm-h2{
  position:relative;font-size:1.55rem;font-weight:900;color:#1a1a2e;
  margin:56px 0 26px;padding:0 0 14px 0;
  border-bottom:3px solid transparent;
  border-image:linear-gradient(90deg,#87ceeb,#a29bfe,transparent) 1;
  letter-spacing:-.3px;line-height:1.3;
  display:flex;align-items:center;gap:14px;flex-wrap:wrap;
}
.cm-h2-num{
  display:inline-flex;align-items:center;justify-content:center;
  width:48px;height:48px;border-radius:14px;
  background:linear-gradient(135deg,#2980b9,#87ceeb);
  color:#fff;font-size:1.2rem;font-weight:900;
  box-shadow:0 8px 20px -4px rgba(135,206,235,.5);
  flex-shrink:0;font-variant-numeric:tabular-nums;
}

/* ═══ SECTION (image + text) ═══ */
.cm-section{
  display:grid;grid-template-columns:1fr;gap:24px;
  margin-bottom:40px;background:#fff;border-radius:22px;
  padding:26px;border:1px solid rgba(0,0,0,.05);
  box-shadow:0 10px 30px rgba(0,0,0,.06);
  transition:all .4s cubic-bezier(.16,1,.3,1);
}
.cm-section:hover{box-shadow:0 20px 50px -14px rgba(135,206,235,.3)}
@media(min-width:720px){
  .cm-section{grid-template-columns:1fr 1fr;gap:30px;padding:32px}
  .cm-section-reverse{direction:rtl}
  .cm-section-reverse > *{direction:ltr}
}
.cm-section-img{
  position:relative;border-radius:18px;overflow:hidden;
  background:#1a1a2e;align-self:start;
}
.cm-section-img img{
  display:block;width:100%;height:auto;
  transition:transform 6s ease-in-out,filter .4s;
  filter:brightness(1.05) contrast(1.05) saturate(1.15);
}
.cm-section:hover .cm-section-img img{
  transform:scale(1.05);
  filter:brightness(1.15) contrast(1.1) saturate(1.2);
}
.cm-section-img-badge{
  position:absolute;top:12px;left:12px;
  padding:6px 12px;border-radius:20px;
  background:rgba(10,10,26,.75);color:#fff;
  font-size:.7rem;font-weight:800;letter-spacing:.5px;
  backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15);
  z-index:2;
}
.cm-section-text p{
  font-size:.98rem;color:#444;line-height:1.8;margin:0 0 14px;
}
.cm-section-text p:last-child{margin-bottom:0}
.cm-section-text strong{color:#2980b9;font-weight:900}

.cm-fact-box{
  display:flex;gap:14px;align-items:flex-start;
  padding:16px 18px;margin-top:16px;
  background:linear-gradient(135deg,rgba(135,206,235,.08),rgba(162,155,254,.04));
  border-left:4px solid #87ceeb;border-radius:12px;
}
.cm-fact-box-icon{font-size:1.6rem;flex-shrink:0;line-height:1}
.cm-fact-box-body{font-size:.88rem;line-height:1.65;color:#444}
.cm-fact-box-body strong{color:#2980b9;font-weight:900}

/* ═══ SIMULATOR ═══ */
.cm-sim{
  background:linear-gradient(135deg,#0a1a2e,#0f1f3a);
  border-radius:22px;padding:32px 28px;
  color:#fff;margin-bottom:40px;
  box-shadow:0 24px 70px -16px rgba(0,0,0,.5),0 0 60px rgba(135,206,235,.15) inset;
  position:relative;overflow:hidden;
}
.cm-sim::before{
  content:'';position:absolute;top:-50%;right:-20%;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(135,206,235,.25),transparent 70%);
  animation:cmFloat 10s ease-in-out infinite;
}
.cm-sim-intro{
  position:relative;z-index:2;font-size:.95rem;opacity:.9;
  margin-bottom:24px;line-height:1.6;padding-left:16px;
  border-left:3px solid #87ceeb;
}
.cm-sim-input{position:relative;z-index:2;margin-bottom:26px}
.cm-sim-input label{
  display:block;font-size:.82rem;font-weight:800;
  color:rgba(255,255,255,.7);
  text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;
}
.cm-slider-wrap{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
#cm-dist{
  flex:1;min-width:200px;height:8px;border-radius:4px;
  background:rgba(255,255,255,.1);outline:none;cursor:pointer;
  -webkit-appearance:none;appearance:none;
}
#cm-dist::-webkit-slider-thumb{
  -webkit-appearance:none;appearance:none;
  width:24px;height:24px;border-radius:50%;
  background:linear-gradient(135deg,#87ceeb,#2980b9);
  cursor:pointer;
  box-shadow:0 0 0 6px rgba(135,206,235,.25),0 4px 16px rgba(135,206,235,.6);
  transition:transform .2s;
}
#cm-dist::-webkit-slider-thumb:hover{transform:scale(1.15)}
#cm-dist::-moz-range-thumb{
  width:24px;height:24px;border-radius:50%;
  background:linear-gradient(135deg,#87ceeb,#2980b9);
  cursor:pointer;border:none;
  box-shadow:0 0 0 6px rgba(135,206,235,.25),0 4px 16px rgba(135,206,235,.6);
}
.cm-slider-value{display:flex;align-items:baseline;gap:6px;font-weight:900}
#cm-dist-value{
  font-size:2rem;
  background:linear-gradient(135deg,#fff,#87ceeb);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;font-variant-numeric:tabular-nums;
  min-width:70px;text-align:right;
}
.cm-slider-value span:last-child{font-size:.85rem;opacity:.7;font-weight:700}
.cm-slider-marks{
  display:flex;justify-content:space-between;
  margin-top:10px;padding:0 4px;
  font-size:.7rem;color:rgba(255,255,255,.4);font-weight:700;
}
.cm-sim-results{
  position:relative;z-index:2;
  display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
  gap:12px;margin-bottom:20px;
}
.cm-sim-card{
  padding:20px 16px;text-align:center;
  background:rgba(255,255,255,.05);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.12);border-radius:16px;
  transition:all .3s cubic-bezier(.16,1,.3,1);
}
.cm-sim-card:hover{
  background:rgba(255,255,255,.1);
  transform:translateY(-4px);
  border-color:rgba(135,206,235,.5);
}
.cm-sim-icon{font-size:1.8rem;margin-bottom:10px;line-height:1}
.cm-sim-value{
  font-size:1.5rem;font-weight:900;line-height:1;
  background:linear-gradient(135deg,#fff,#87ceeb);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;font-variant-numeric:tabular-nums;
  margin-bottom:8px;transition:all .3s;
}
.cm-sim-label{
  font-size:.68rem;color:rgba(255,255,255,.65);
  font-weight:700;line-height:1.35;letter-spacing:.3px;
}
.cm-sim-note{
  position:relative;z-index:2;
  padding:14px 18px;
  background:rgba(243,156,18,.1);
  border-left:3px solid #f39c12;
  border-radius:10px;font-size:.82rem;
  color:rgba(255,255,255,.85);line-height:1.6;
}
.cm-sim-note strong{color:#f5d76e;font-weight:900}

/* ═══ DSN MAP ═══ */
.cm-dsn{
  background:linear-gradient(135deg,#0a1a2e,#0f1f3a);
  border-radius:22px;padding:24px;margin-bottom:40px;
  color:#fff;
  box-shadow:0 24px 70px -16px rgba(0,0,0,.5),0 0 60px rgba(135,206,235,.15) inset;
}
.cm-dsn-head{text-align:center;margin-bottom:18px}
.cm-dsn-title{font-size:1.1rem;font-weight:900;margin-bottom:6px;letter-spacing:-.2px}
.cm-dsn-sub{font-size:.82rem;color:rgba(255,255,255,.6);font-weight:600}
.cm-dsn-map{
  position:relative;width:100%;aspect-ratio:2/1;
  border-radius:14px;overflow:hidden;
  background:radial-gradient(circle at 50% 50%,rgba(74,144,226,.15),transparent 70%),#0a0a1e;
}
.cm-dsn-svg{position:absolute;inset:0;width:100%;height:100%}
.cm-dsn-points{position:absolute;inset:0}
.cm-dsn-point{
  position:absolute;width:36px;height:36px;
  transform:translate(-50%,-50%);
  background:none;border:none;padding:0;cursor:pointer;
  font-family:inherit;
  transition:transform .25s;
  z-index:5;
}
.cm-dsn-point:hover{transform:translate(-50%,-50%) scale(1.2);z-index:10}
.cm-dsn-pulse{
  position:absolute;inset:0;border-radius:50%;
  background:rgba(135,206,235,.4);
  animation:cmRing 2.2s ease-out infinite;
}
.cm-dsn-dot{
  position:absolute;top:50%;left:50%;
  transform:translate(-50%,-50%);
  width:14px;height:14px;border-radius:50%;
  background:#87ceeb;
  box-shadow:0 0 18px #87ceeb,0 0 0 2px rgba(255,255,255,.8);
  z-index:2;
}
.cm-dsn-label{
  position:absolute;top:28px;left:50%;
  transform:translateX(-50%);
  white-space:nowrap;font-size:.68rem;font-weight:800;
  padding:4px 10px;border-radius:8px;
  background:rgba(10,10,26,.92);color:#fff;
  border:1px solid rgba(135,206,235,.4);
  opacity:0;transition:opacity .25s,transform .25s;
  pointer-events:none;line-height:1;
  backdrop-filter:blur(8px);
}
.cm-dsn-point:hover .cm-dsn-label,
.cm-dsn-point.active .cm-dsn-label{
  opacity:1;transform:translateX(-50%) translateY(-4px);
}
.cm-dsn-info{
  margin-top:18px;padding:18px 20px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(135,206,235,.2);
  border-radius:14px;
  display:flex;gap:14px;align-items:flex-start;
  min-height:80px;
  transition:all .3s;
}
.cm-dsn-info.active{
  background:rgba(135,206,235,.1);
  border-color:rgba(135,206,235,.5);
  box-shadow:0 8px 24px -8px rgba(135,206,235,.4);
}
.cm-dsn-info-icon{font-size:2rem;flex-shrink:0;line-height:1}
.cm-dsn-info-text{font-size:.9rem;line-height:1.6;color:rgba(255,255,255,.9)}
.cm-dsn-info-text strong{color:#87ceeb;font-weight:900;display:block;margin-bottom:4px;font-size:1rem}
.cm-dsn-info-text span{color:rgba(255,255,255,.7)}

/* ═══ COMPARE ═══ */
.cm-compare{
  display:flex;flex-direction:column;gap:20px;
  margin-bottom:40px;
}
.cm-compare-row{
  padding:22px 24px;
  background:#fff;border-radius:18px;
  border:2px solid rgba(0,0,0,.05);
  box-shadow:0 8px 24px rgba(0,0,0,.05);
  transition:all .3s;
}
.cm-compare-row:hover{
  transform:translateY(-3px);
  border-color:rgba(135,206,235,.4);
  box-shadow:0 16px 40px -10px rgba(135,206,235,.3);
}
.cm-compare-label{
  font-size:.95rem;font-weight:900;color:#1a1a2e;
  margin-bottom:16px;letter-spacing:-.2px;
}
.cm-compare-bars{display:flex;flex-direction:column;gap:10px}
.cm-compare-item{
  display:grid;
  grid-template-columns:140px 1fr 100px;
  gap:12px;align-items:center;font-size:.82rem;
}
.cm-compare-name{font-weight:800;color:#555}
.cm-compare-bar{
  height:10px;border-radius:5px;
  background:rgba(0,0,0,.06);overflow:hidden;
}
.cm-compare-fill{
  height:100%;border-radius:5px;
  width:var(--w,50%);
  background:linear-gradient(90deg,var(--c,#87ceeb),var(--c,#87ceeb));
  animation:cmBarGrow 1.5s cubic-bezier(.16,1,.3,1) both;
  box-shadow:0 0 10px var(--c,rgba(135,206,235,.5));
}
.cm-compare-value{
  font-weight:900;color:#1a1a2e;
  text-align:right;font-variant-numeric:tabular-nums;
  font-size:.78rem;
}

/* ═══ FAQ ═══ */
.cm-faq{
  display:flex;flex-direction:column;gap:10px;margin-bottom:40px;
}
.cm-faq-item{
  background:#fff;border-radius:14px;
  border:2px solid rgba(0,0,0,.05);overflow:hidden;
  transition:all .3s cubic-bezier(.16,1,.3,1);
}
.cm-faq-item:hover{
  border-color:rgba(135,206,235,.4);
  box-shadow:0 8px 24px -6px rgba(135,206,235,.25);
}
.cm-faq-item[open]{
  border-color:#87ceeb;
  box-shadow:0 12px 32px -8px rgba(135,206,235,.35);
}
.cm-faq-item summary{
  display:flex;justify-content:space-between;
  align-items:center;gap:14px;
  padding:18px 22px;cursor:pointer;
  font-size:.95rem;font-weight:800;color:#1a1a2e;
  list-style:none;transition:all .25s;user-select:none;
}
.cm-faq-item summary::-webkit-details-marker{display:none}
.cm-faq-item summary:hover{color:#2980b9;background:rgba(135,206,235,.05)}
.cm-faq-icon{
  flex-shrink:0;color:#2980b9;font-size:1.2rem;font-weight:900;
  transition:transform .3s;width:24px;height:24px;
  display:flex;align-items:center;justify-content:center;
}
.cm-faq-item[open] .cm-faq-icon{transform:rotate(90deg)}
.cm-faq-answer{
  padding:0 22px 20px;
  font-size:.9rem;color:#555;line-height:1.75;
  animation:cmFadeIn .35s ease;
}
.cm-faq-answer strong{color:#2980b9;font-weight:900}

/* ═══ CONCLUSION ═══ */
.cm-conclusion{
  display:flex;gap:22px;align-items:flex-start;
  padding:34px 32px;margin-bottom:44px;
  background:linear-gradient(135deg,#0a1a2e,#1a1a3e);
  border-radius:22px;color:#fff;
  box-shadow:0 30px 70px -20px rgba(135,206,235,.4);
  position:relative;overflow:hidden;
}
.cm-conclusion::before{
  content:'';position:absolute;top:-50%;right:-30%;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(135,206,235,.22),transparent 70%);
  animation:cmFloat 10s ease-in-out infinite;
}
.cm-conclusion-icon{
  font-size:3.2rem;flex-shrink:0;line-height:1;
  position:relative;z-index:2;
  filter:drop-shadow(0 8px 24px rgba(135,206,235,.6));
  animation:cmFloat 4s ease-in-out infinite;
}
.cm-conclusion-body{position:relative;z-index:2}
.cm-conclusion-title{
  font-size:1.25rem;font-weight:900;margin-bottom:12px;
  letter-spacing:-.2px;
}
.cm-conclusion-body p{
  font-size:.98rem;line-height:1.8;opacity:.92;margin:0 0 12px;
}
.cm-conclusion-body p:last-child{margin-bottom:0}
.cm-conclusion-body strong{color:#87ceeb;font-weight:900}

/* ═══ RELATED ═══ */
.cm-related{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:12px;
}
.cm-related-card{
  display:flex;gap:14px;align-items:center;
  padding:18px 20px;background:#fff;border-radius:16px;
  border:2px solid rgba(0,0,0,.05);
  transition:all .3s cubic-bezier(.16,1,.3,1);
  text-decoration:none!important;color:inherit;
}
.cm-related-card:hover{
  transform:translateY(-4px);border-color:#87ceeb;
  box-shadow:0 16px 40px -10px rgba(135,206,235,.35);
}
.cm-related-icon{
  width:48px;height:48px;border-radius:14px;
  background:linear-gradient(135deg,#2980b9,#87ceeb);
  color:#fff;display:flex;align-items:center;justify-content:center;
  font-size:1.4rem;flex-shrink:0;
  box-shadow:0 6px 16px -4px rgba(135,206,235,.5);
  transition:transform .3s;
}
.cm-related-card:hover .cm-related-icon{transform:scale(1.1) rotate(-6deg)}
.cm-related-info{flex:1;min-width:0}
.cm-related-title{
  font-size:.95rem;font-weight:900;color:#1a1a2e;
  margin-bottom:3px;letter-spacing:-.2px;
}
.cm-related-sub{font-size:.78rem;color:#888;font-weight:600}

/* ═══ DARK MODE ═══ */
@media (prefers-color-scheme: dark){
  html body.mars-stars-on #comm-app{color:#e0e0f0}
  html body.mars-stars-on #comm-app .cm-fact-card,
  html body.mars-stars-on #comm-app .cm-section,
  html body.mars-stars-on #comm-app .cm-compare-row,
  html body.mars-stars-on #comm-app .cm-faq-item,
  html body.mars-stars-on #comm-app .cm-related-card{
    background:rgba(20,20,42,.92);
    border-color:rgba(135,206,235,.25);
    color:#e0e0f0;
  }
  html body.mars-stars-on #comm-app .cm-h2,
  html body.mars-stars-on #comm-app .cm-compare-label,
  html body.mars-stars-on #comm-app .cm-compare-value,
  html body.mars-stars-on #comm-app .cm-related-title,
  html body.mars-stars-on #comm-app .cm-faq-item summary{color:#e0e0f0}
  html body.mars-stars-on #comm-app .cm-intro,
  html body.mars-stars-on #comm-app .cm-section-text p,
  html body.mars-stars-on #comm-app .cm-faq-answer{color:#c0c0d0}
  html body.mars-stars-on #comm-app .cm-callout-body{color:#d0d0e0}
  html body.mars-stars-on #comm-app .cm-fact-box{background:rgba(135,206,235,.1)}
  html body.mars-stars-on #comm-app .cm-fact-box-body{color:#c0c0d0}
  html body.mars-stars-on #comm-app .cm-compare-bar{background:rgba(255,255,255,.08)}
  html body.mars-stars-on #comm-app .cm-related-sub{color:#8888a0}
}

/* ═══ MOBILE ═══ */
@media (max-width:640px){
  .cm-hero{padding:44px 20px 80px;border-radius:20px;min-height:480px}
  .cm-hero-title{font-size:1.7rem}
  .cm-hero-sub{font-size:.95rem}
  .cm-hero-icon{font-size:3rem}
  .cm-meta-item{padding:6px 12px;font-size:.72rem}
  .cm-h2{font-size:1.2rem;margin:40px 0 18px;gap:10px}
  .cm-h2-num{width:40px;height:40px;font-size:1rem;border-radius:12px}
  .cm-facts{grid-template-columns:repeat(2,1fr)}
  .cm-fact-card{padding:16px 12px}
  .cm-fact-value{font-size:1.5rem}
  .cm-fact-label{font-size:.62rem}
  .cm-callout{padding:18px 20px;font-size:.9rem;gap:12px}
  .cm-callout-icon{font-size:1.6rem}
  .cm-section{padding:20px 18px;border-radius:18px;gap:18px}
  .cm-section-text p{font-size:.92rem}
  .cm-sim{padding:24px 20px}
  .cm-sim-value{font-size:1.3rem}
  .cm-sim-results{grid-template-columns:repeat(2,1fr)}
  .cm-compare-item{grid-template-columns:100px 1fr 80px;gap:8px;font-size:.75rem}
  .cm-conclusion{flex-direction:column;padding:24px 22px;gap:14px}
  .cm-conclusion-icon{font-size:2.6rem}
  .cm-conclusion-title{font-size:1.05rem}
  .cm-conclusion-body p{font-size:.9rem}
  .cm-related{grid-template-columns:1fr}
  .cm-faq-item summary{padding:15px 18px;font-size:.88rem}
  .cm-faq-answer{padding:0 18px 16px;font-size:.85rem}
  .cm-intro{font-size:.98rem}
  .cm-dsn{padding:18px}
  .cm-dsn-map{aspect-ratio:1.6/1}
  .cm-dsn-label{font-size:.6rem}
}

@media (prefers-reduced-motion: reduce){
  #comm-app *,#comm-app *::before,#comm-app *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
  .cm-observe{opacity:1;transform:none}
}
</style>

<script>
(function(){
'use strict';
if (window.__commLoaded) return;
window.__commLoaded = true;

/* ═══════════════════ КОНСТАНТЫ ═══════════════════ */
var C = 299792;  /* скорость света, км/с */

var DSN_SITES = {
  goldstone: {
    icon: '🇺🇸',
    name: 'Goldstone',
    country: 'США, Калифорния',
    year: 1958,
    antenna: 'DSS-14 · 70 м',
    power: '400 кВт',
    fact: 'Первая антенна DSN. Участвовала в миссиях «Аполлон», «Вояджер», сейчас держит связь с Perseverance.'
  },
  madrid: {
    icon: '🇪🇸',
    name: 'Madrid',
    country: 'Испания, Робледо-де-Чавела',
    year: 1965,
    antenna: 'DSS-63 · 70 м',
    power: '400 кВт',
    fact: 'Европейский узел DSN. Принимала первые снимки с Марса и первой посадки на Титан (Гюйгенс, 2005).'
  },
  canberra: {
    icon: '🇦🇺',
    name: 'Canberra',
    country: 'Австралия, Тидинбинбилла',
    year: 1965,
    antenna: 'DSS-43 · 70 м',
    power: '400 кВт',
    fact: 'Южный узел. Ключевая станция для миссий в южном полушарии неба. Принимала сигнал «Вояджера-1» после выхода в межзвёздное пространство.'
  }
};

/* ═══════════════════ SCROLL OBSERVE ═══════════════════ */
function initObserve(){
  var items = document.querySelectorAll('.cm-observe');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('cm-visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add('cm-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function(el){ io.observe(el); });
}

/* ═══════════════════ СЧЁТЧИКИ ═══════════════════ */
function animateCounter(el){
  var target = parseFloat(el.dataset.target || '0');
  var duration = 1800;
  var start = performance.now();
  function tick(now){
    var p = Math.min((now - start) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    var val = target * eased;
    el.textContent = Math.round(val).toLocaleString('ru-RU');
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = Math.round(target).toLocaleString('ru-RU');
  }
  requestAnimationFrame(tick);
}
function initCounters(){
  var counters = document.querySelectorAll('.cm-counter');
  if (!counters.length) return;
  if (!('IntersectionObserver' in window)){
    counters.forEach(animateCounter);
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        animateCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function(el){ io.observe(el); });
}

/* ═══════════════════ СИМУЛЯТОР ЗАДЕРЖКИ ═══════════════════ */
function initSimulator(){
  var slider = document.getElementById('cm-dist');
  if (!slider) return;

  var distEl = document.getElementById('cm-dist-value');
  var oneWayEl = document.getElementById('cm-one-way');
  var roundEl = document.getElementById('cm-round');
  var msgEl = document.getElementById('cm-msg');
  var travelEl = document.getElementById('cm-travel');

  function fmtMin(minutes){
    if (minutes < 1) return (minutes * 60).toFixed(0) + ' сек';
    if (minutes >= 60){
      var h = Math.floor(minutes / 60);
      var m = Math.round(minutes - h * 60);
      return h + 'ч ' + m + 'м';
    }
    return minutes.toFixed(1);
  }

  function update(){
    var distMln = parseFloat(slider.value) || 225;  /* млн км */
    var distKm = distMln * 1000000;

    /* Время в одну сторону, секунды */
    var oneWaySec = distKm / C;
    var oneWayMin = oneWaySec / 60;

    /* Полный цикл */
    var roundMin = oneWayMin * 2;

    /* Сколько сообщений за час (туда-обратно) */
    var perHour = Math.max(1, Math.floor(60 / roundMin));

    /* Сколько месяцев летит корабль (при 20 000 км/ч) */
    var travelMonths = (distKm / 20000) / (24 * 30);

    distEl.textContent = distMln;
    oneWayEl.textContent = fmtMin(oneWayMin);
    roundEl.textContent = fmtMin(roundMin);
    msgEl.textContent = perHour;
    travelEl.textContent = travelMonths.toFixed(1);
  }

  slider.addEventListener('input', update);
  update();
}

/* ═══════════════════ DSN КАРТА ═══════════════════ */
function initDSN(){
  var infoBox = document.getElementById('cm-dsn-info');
  if (!infoBox) return;

  var points = document.querySelectorAll('.cm-dsn-point');

  points.forEach(function(btn){
    btn.addEventListener('click', function(){
      /* Убираем active со всех */
      points.forEach(function(p){ p.classList.remove('active'); });
      btn.classList.add('active');

      var siteKey = btn.dataset.site;
      var site = DSN_SITES[siteKey];
      if (!site) return;

      infoBox.classList.add('active');
      infoBox.innerHTML =
        '<div class="cm-dsn-info-icon">' + site.icon + '</div>' +
        '<div class="cm-dsn-info-text">' +
          '<strong>' + site.name + ' · ' + site.country + '</strong>' +
          '<span>📡 ' + site.antenna + ' · ⚡ ' + site.power + ' · 🗓️ с ' + site.year + '</span>' +
          '<div style="margin-top:8px">' + site.fact + '</div>' +
        '</div>';
    });
  });

  /* Клик по карте вне точек — сброс */
  document.querySelector('.cm-dsn-map').addEventListener('click', function(e){
    if (!e.target.closest('.cm-dsn-point')){
      points.forEach(function(p){ p.classList.remove('active'); });
      infoBox.classList.remove('active');
      infoBox.innerHTML =
        '<div class="cm-dsn-info-icon">👆</div>' +
        '<div class="cm-dsn-info-text">Выберите антенну</div>';
    }
  });
}

/* ═══════════════════ COMPARE BARS — АНИМАЦИЯ ПРИ ПОЯВЛЕНИИ ═══════════════════ */
function initCompareBars(){
  var rows = document.querySelectorAll('.cm-compare-fill');
  if (!rows.length) return;
  if (!('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.style.animationPlayState = 'running';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  rows.forEach(function(el){
    el.style.animationPlayState = 'paused';
    io.observe(el);
  });
}

/* ═══════════════════ ЗАПУСК ═══════════════════ */
function init(){
  try {
    initObserve();
    initCounters();
    initSimulator();
    initDSN();
    initCompareBars();
    console.log('📡 Статья «Связь с Марсом» загружена');
  } catch(e){
    console.error('[comm] init error:', e);
  }
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
</script>
