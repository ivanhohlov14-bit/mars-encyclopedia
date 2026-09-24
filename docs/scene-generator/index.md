---
title: Генератор сцен
comments: false
---

<div id="scene-app" style="max-width: 900px; margin: 0 auto; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align:center; margin-bottom:24px;">
    <h1 style="font-size:2rem; letter-spacing:2px; background:linear-gradient(135deg,#A29BFE,#6C63FF,#f39c12); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin:0 0 8px; font-weight:900;">🎬 Генератор сцен</h1>
    <p style="color:#888; font-size:0.9rem; margin:0 0 12px;">Собери сцену из персонажей, мест и событий мира «Письмо из Красной пыли»</p>
    <div style="display:inline-flex; gap:8px; flex-wrap:wrap; justify-content:center;">
        <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(108,99,255,0.1); border:1px solid rgba(108,99,255,0.3); padding:6px 14px; border-radius:20px; font-size:0.78rem; color:#6C63FF; font-weight:700;">🎭 Создано: <span id="sc-counter-num">0</span></div>
        <div id="sc-user-badge" style="display:none; align-items:center; gap:6px; background:rgba(39,174,96,0.1); border:1px solid rgba(39,174,96,0.3); padding:6px 14px; border-radius:20px; font-size:0.78rem; color:#27ae60; font-weight:700;">✓ В профиле: <span id="sc-cloud-count">0</span></div>
    </div>
</div>

<div style="background:linear-gradient(135deg,#f5f7fa,#e8ecf3); padding:24px; border-radius:16px; margin-bottom:24px; box-shadow:0 8px 24px rgba(0,0,0,0.06);">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">👤 ПЕРСОНАЖ 1</label>
            <select id="sc-p1" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
        <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">👤 ПЕРСОНАЖ 2</label>
            <select id="sc-p2" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
        <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">📍 МЕСТО</label>
            <select id="sc-place" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
        <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">🕐 ВРЕМЯ</label>
            <select id="sc-time" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
        <div style="grid-column:1/-1;">
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">🎭 ТЕМА СЦЕНЫ</label>
            <select id="sc-theme" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
    </div>

    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
        <button id="sc-generate" style="padding:14px 32px; background:linear-gradient(135deg,#6C63FF,#A29BFE); color:#fff; border:none; border-radius:30px; font-size:1rem; font-weight:800; cursor:pointer; font-family:inherit; letter-spacing:0.5px; box-shadow:0 8px 24px rgba(108,99,255,0.4); touch-action:manipulation; transition:transform .2s;">🎬 Сгенерировать</button>
        <button id="sc-random" style="padding:14px 24px; background:#fff; color:#6C63FF; border:2px solid #6C63FF; border-radius:30px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; touch-action:manipulation; transition:all .2s;">🎲 Случайно</button>
        <button id="sc-continue" style="padding:14px 24px; background:#fff; color:#27ae60; border:2px solid #27ae60; border-radius:30px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; touch-action:manipulation; transition:all .2s; display:none;">➡️ Продолжить</button>
        <button id="sc-save" style="padding:14px 24px; background:#fff; color:#f39c12; border:2px solid #f39c12; border-radius:30px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; touch-action:manipulation; transition:all .2s; display:none;">💾 В профиль</button>
        <button id="sc-copy" style="padding:14px 24px; background:#fff; color:#666; border:2px solid #ccd7e6; border-radius:30px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; touch-action:manipulation; transition:all .2s;">📋 Скопировать</button>
        <button id="sc-share" style="padding:14px 24px; background:#fff; color:#f39c12; border:2px solid #f39c12; border-radius:30px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; touch-action:manipulation; transition:all .2s;">🔗 Поделиться</button>
    </div>
</div>

<div id="sc-loading" style="display:none; text-align:center; padding:40px;">
    <div style="display:inline-block; width:48px; height:48px; border:4px solid rgba(108,99,255,0.2); border-top-color:#6C63FF; border-radius:50%; animation:scSpin .8s linear infinite;"></div>
    <p style="color:#888; margin-top:16px; font-size:.9rem;">Складываю глину...</p>
</div>

<div id="sc-output" style="display:none;"></div>

<div id="sc-history-wrap" style="margin-top:32px; display:none;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <div id="sc-hist-tabs" style="display:flex; gap:6px;">
            <button id="sc-tab-local" class="sc-htab active" style="padding:8px 16px; border-radius:20px; border:none; background:#6C63FF; color:#fff; font-family:inherit; font-weight:700; font-size:.82rem; cursor:pointer;">💻 Локальные</button>
            <button id="sc-tab-cloud" class="sc-htab" style="padding:8px 16px; border-radius:20px; border:none; background:#e8ecf3; color:#666; font-family:inherit; font-weight:700; font-size:.82rem; cursor:pointer; display:none;">☁️ Мои сцены</button>
        </div>
        <button id="sc-clear-history" style="background:transparent; border:none; color:#999; font-size:.78rem; cursor:pointer; font-family:inherit; text-decoration:underline;">Очистить</button>
    </div>
    <div id="sc-history" style="display:grid; gap:10px;"></div>
</div>

</div>

<style>
@keyframes scSpin { to { transform: rotate(360deg); } }
@keyframes scFadeIn { from { opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
@keyframes scLineIn { from { opacity:0; transform:translateX(-10px);} to {opacity:1; transform:translateX(0);} }

#scene-app select:focus { border-color: #6C63FF; box-shadow: 0 0 0 3px rgba(108,99,255,0.15); }
#scene-app button:hover { transform: translateY(-2px); }
#scene-app button:active { transform: translateY(0) scale(.98); }
.sc-htab.active { background:#6C63FF !important; color:#fff !important; }
.sc-htab:not(.active) { background:#e8ecf3 !important; color:#666 !important; }

#sc-output { position:relative; border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(108,99,255,0.3); border:1px solid rgba(108,99,255,0.3); animation: scFadeIn .6s cubic-bezier(.16,1,.3,1); }
#sc-output .scene-bg { position:absolute; inset:-20px; background-size:cover; background-position:center; background-color:#1a1a2e; filter:brightness(0.35) saturate(1.1) blur(6px); transform:scale(1.05); z-index:0; }
#sc-output .scene-bg::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg, rgba(20,15,35,.82), rgba(45,27,61,.88)); }
#sc-output .scene-inner { position:relative; z-index:1; padding:40px 36px; color:#e0e0f0; }

.scene-header { font-family: Georgia, serif; color: #c4b8ff; font-size: 0.78rem; letter-spacing: 4px; text-align: center; margin-bottom: 10px; text-transform: uppercase; opacity:.95; text-shadow:0 2px 8px rgba(0,0,0,.9); }
.scene-title { font-family: Georgia, serif; font-size: 1.9rem; font-weight: 900; text-align: center; color: #fff; margin-bottom: 20px; letter-spacing: 1px; text-shadow: 0 4px 20px rgba(0,0,0,.95), 0 0 30px rgba(108,99,255,.5); }
.scene-meta { text-align: center; color: #d0d0e0; font-size: 0.85rem; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid rgba(162,155,254,.4); line-height: 1.7; text-shadow: 0 2px 6px rgba(0,0,0,.9); }
.scene-meta em { color: #c4b8ff; font-style: italic; }
.scene-body { font-family: Georgia, serif; font-size: 1.08rem; line-height: 1.95; color: #f5f5fa; text-shadow: 0 2px 8px rgba(0,0,0,.9), 0 0 20px rgba(0,0,0,.6); font-weight: 500; }
.scene-body p { margin: 0 0 16px 0; opacity: 0; animation: scLineIn .5s ease forwards; }
.scene-body p .speaker { color: #c4b8ff; font-weight: 800; text-shadow: 0 0 12px rgba(162,155,254,.6), 0 2px 6px rgba(0,0,0,.9); }
.scene-body p .reaction { color: #d0d0e0; font-style: italic; display: block; margin-top: 4px; font-size: .9em; opacity:.85; }
.scene-body p em { color: #ffd97a; font-style: italic; display: block; margin-top: 6px; font-size: 0.92em; text-shadow: 0 0 10px rgba(243,156,18,.5), 0 2px 6px rgba(0,0,0,.9); }
.scene-end { text-align: center; margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(162,155,254,.4); color: #c4b8ff; font-family: Georgia, serif; letter-spacing: 3px; font-size: 0.85rem; animation: scFadeIn 1s ease; text-shadow: 0 0 14px rgba(162,155,254,.6), 0 2px 6px rgba(0,0,0,.9); }

.sc-history-item { background:#fff; border:1px solid rgba(0,0,0,.06); border-radius:12px; padding:14px 16px; cursor:pointer; transition:all .25s; display:flex; gap:12px; align-items:center; animation: scFadeIn .3s ease; }
.sc-history-item:hover { transform:translateX(4px); border-color:#6C63FF; box-shadow: 0 8px 20px -6px rgba(108,99,255,.25); }
.sc-history-icon { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,#6C63FF,#A29BFE); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
.sc-history-info { flex:1; min-width:0; }
.sc-history-title { font-weight:800; color:#1a1a1a; font-size:.9rem; margin-bottom:2px; }
.sc-history-sub { font-size:.72rem; color:#888; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.sc-history-del { width:30px; height:30px; border-radius:50%; border:none; background:rgba(231,76,60,.08); color:#e74c3c; cursor:pointer; font-family:inherit; font-size:.85rem; flex-shrink:0; transition:all .2s; }
.sc-history-del:hover { background:#e74c3c; color:#fff; }

@media (max-width: 600px) {
    #sc-output .scene-inner { padding: 26px 20px; }
    .scene-body { font-size: 0.98rem; }
    .scene-title { font-size: 1.35rem; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    'use strict';

    /* ═══════════════════════════════════════════════════════════
       БАЗА ДАННЫХ
       ═══════════════════════════════════════════════════════════ */

    var CHARACTERS = [
        { name: 'Хевсур', trait: 'древний хранитель знаний' },
        { name: 'Талин', trait: 'молодой астроном Академии' },
        { name: 'Йарра', trait: 'мудрая женщина из Фарсиды' },
        { name: 'Аратан III', trait: 'последний король Эдема' },
        { name: 'Ксанф', trait: 'предводитель пиратов' },
        { name: 'Элла', trait: 'наставница и биолог' },
        { name: 'Сарум Великий', trait: 'легендарный король' },
        { name: 'Алира', trait: 'жрица Акхи' },
        { name: 'Совия', trait: 'слепая пророчица' },
        { name: 'Кан', trait: 'писец Академии' },
        { name: 'Араш', trait: 'мореплаватель' },
        { name: 'Миран', trait: 'инженер и изобретатель' },
        { name: 'Ирайна', trait: 'исследовательница флоры' },
        { name: 'Мнемис', trait: 'летописец мира' }
    ];

    var PLACES = [
        { name: 'Окхасен', type: 'столица на берегу Ацидалийского моря', bg: 'okhasen' },
        { name: 'Пещеры Фарсиды', type: 'подземный лабиринт Хевсура', bg: 'caves' },
        { name: 'Академия Окхасена', type: 'древний центр знаний', bg: 'academy' },
        { name: 'Порт Ксанф', type: 'пиратская столица', bg: 'port' },
        { name: 'Долина Маринера', type: 'гигантский каньон', bg: 'valley' },
        { name: 'Эритрейское море', type: 'замерзающее море', bg: 'sea' },
        { name: 'Обсерватория Дзен-Тхал', type: 'башня астрономов', bg: 'observatory' },
        { name: 'Храм Акхи', type: 'святилище воды', bg: 'temple' },
        { name: 'Развалины Эдема', type: 'мёртвый город королей', bg: 'ruins' },
        { name: 'Долина Ксанфа', type: 'место находки табличек', bg: 'valley' },
        { name: 'Олимп', type: 'высочайшая гора Марса', bg: 'mountain' },
        { name: 'Тарсис', type: 'земля вулканов', bg: 'mountain' },
        { name: 'Космодром Фарсиды', type: 'древние доки', bg: 'cosmodrome' },
        { name: 'Ацидалийское море', type: 'северное море', bg: 'sea' },
        { name: 'Фарсида', type: 'плато вулканов', bg: 'valley' }
    ];

    var TIMES = [
        { name: 'На рассвете', hours: 6, mood: 'dawn' },
        { name: 'В полдень', hours: 12, mood: 'day' },
        { name: 'На закате', hours: 18, mood: 'sunset' },
        { name: 'В сумерках', hours: 21, mood: 'dusk' },
        { name: 'Глубокой ночью', hours: 2, mood: 'night' },
        { name: 'В час Dzēn', hours: 4, mood: 'dawn' },
        { name: 'В час Khōsen', hours: 14, mood: 'day' },
        { name: 'В час Khō-mōr', hours: 20, mood: 'night' }
    ];

    var THEMES = [
        { id: 'meeting', name: 'Встреча', icon:'🤝' },
        { id: 'secret', name: 'Тайна, о которой молчат', icon:'🤫' },
        { id: 'farewell', name: 'Прощание', icon:'🚪' },
        { id: 'prophecy', name: 'Пророчество', icon:'🔮' },
        { id: 'battle', name: 'Перед битвой', icon:'⚔️' },
        { id: 'discovery', name: 'Открытие', icon:'💡' },
        { id: 'loss', name: 'Потеря', icon:'🕯️' },
        { id: 'wisdom', name: 'Мудрость', icon:'📜' },
        { id: 'deal', name: 'Сделка', icon:'💎' },
        { id: 'betrayal', name: 'Предательство', icon:'🗡️' },
        { id: 'rescue', name: 'Спасение', icon:'🛡️' },
        { id: 'return', name: 'Возвращение', icon:'🏠' },
        { id: 'trial', name: 'Испытание', icon:'🔥' },
        { id: 'redemption', name: 'Искупление', icon:'⛓️' },
        { id: 'oath', name: 'Клятва', icon:'💫' }
    ];

    var DIALOGUES = {
        meeting: [
            '{p1}: — Ты пришёл. Значит, слышал зов.',
            '{p1}: — Я ждал здесь с прошлого полнолуния. Думал, не придёшь.',
            '{p2}: — Слышал. И не мог не прийти.',
            '{p2}: — Хотя дорога была нелёгкой. Пыль, ветер, обвал в ущелье.',
            '{p1}: — Тогда садись. Разговор будет долгим.',
            '{p1}: — И, боюсь, не только долгим, но и тяжёлым.',
            '{p2}: — У меня нет времени на долгие разговоры.',
            '{p2}: — Говори коротко. Что ты узнал?',
            '{p1}: — Я узнал то, что лучше бы не знать.',
            '{p1}: — Марс умирает быстрее, чем мы думали.',
            '{p2}: — Это новость?',
            '{p1}: — Нет. Новость — это то, кто ускоряет его смерть.'
        ],
        secret: [
            '{p1}: — То, что я расскажу, не должно покинуть этих стен.',
            '{p2}: — Клянусь глиной.',
            '{p1}: — Глина помнит всё. И тебя запомнит.',
            '{p2}: — Что ты хочешь мне сказать?',
            '{p1}: — Это не я хочу. Это Марс говорит через меня.',
            '{p2}: — Ты уверен, что стоит это делать?',
            '{p1}: — Нет. Но я должен.',
            '{p1}: — Слушай внимательно. Не перебивай. Не задавай вопросов, пока не закончу.',
            '{p2}: — Хорошо.',
            '{p1}: — Три эпохи назад... был договор.',
            '{p1}: — И одна сторона его нарушила. Намеренно.',
            '{p2}: — Кто?',
            '{p1}: — Те, кого мы называем хранителями знаний.'
        ],
        farewell: [
            '{p1}: — Ты уходишь.',
            '{p2}: — Я должен.',
            '{p1}: — Куда ты пойдёшь?',
            '{p2}: — Туда, куда зовёт ветер.',
            '{p1}: — Ветер тоже умирает, как и всё здесь.',
            '{p2}: — Значит, я буду последним, кого он позовёт.',
            '{p1}: — Ты не вернёшься.',
            '{p2}: — Не вернусь.',
            '{p1}: — И что мне делать?',
            '{p2}: — Жить. Помнить. Рассказывать.',
            '{p1}: — Это мало.',
            '{p2}: — Это всё, что можно унести с собой.'
        ],
        prophecy: [
            '{p1}: — Я видела сон.',
            '{p2}: — Расскажи.',
            '{p1}: — Ты стоял на льду. И лёд трещал.',
            '{p2}: — Это просто сон.',
            '{p1}: — Это не сон. Это память о будущем.',
            '{p2}: — С чего ты взяла?',
            '{p1}: — Потому что я видела твоё лицо. Оно было старше на десять лет.',
            '{p2}: — И что было дальше?',
            '{p1}: — Лёд треснул. Ты упал. И вода поглотила тебя.',
            '{p2}: — Значит, я не пойду туда.',
            '{p1}: — Пойдёшь. Потому что ты уже там.'
        ],
        battle: [
            '{p1}: — Сколько у нас времени?',
            '{p2}: — До рассвета.',
            '{p1}: — Мало.',
            '{p2}: — Достаточно, чтобы сделать то, что должны.',
            '{p1}: — Ты говоришь так, будто уже знаешь, что будет.',
            '{p2}: — Я знаю только то, что мы не отступим.',
            '{p1}: — Тогда скажи слово. И я пойду.',
            '{p2}: — Не приказывай мне прощаться.',
            '{p1}: — Я не прощаюсь. Я даю слово.',
            '{p2}: — Хорошо. Слово дано.',
            '{p1}: — Слово принято.',
            '{p2}: — Тогда — на рассвете.'
        ],
        discovery: [
            '{p1}: — Смотри! Вот оно!',
            '{p2}: — Это не может быть правдой.',
            '{p1}: — Правда — это то, что оставляет след.',
            '{p2}: — Мы найдём это место?',
            '{p1}: — Мы уже там.',
            '{p2}: — Что это за символ?',
            '{p1}: — Это не символ. Это имя.',
            '{p2}: — Чьё?',
            '{p1}: — Того, кто был здесь до нас. За тысячу лет.',
            '{p2}: — И что он оставил?',
            '{p1}: — Всё. Он оставил всё.'
        ],
        loss: [
            '{p1}: — Его больше нет.',
            '{p2}: — Нет...',
            '{p1}: — Глина помнит его имя.',
            '{p2}: — Этого мало.',
            '{p1}: — Этого всегда мало. Но это всё, что у нас есть.',
            '{p2}: — Я должен был быть там.',
            '{p1}: — Ты был. В его мыслях.',
            '{p2}: — Я не прощу себя.',
            '{p1}: — И не надо. Прощение — это для живых. Он уже не здесь.',
            '{p2}: — Что нам делать?',
            '{p1}: — Жить. Пока можем.'
        ],
        wisdom: [
            '{p1}: — Как ты дожил до этих лет?',
            '{p2}: — Я слушал тишину.',
            '{p1}: — И что она сказала?',
            '{p2}: — Что жизнь коротка. А память — вечна.',
            '{p1}: — Тогда я буду помнить тебя.',
            '{p2}: — Не меня. То, что я знал.',
            '{p1}: — Это одно и то же.',
            '{p2}: — Нет. Я — только сосуд. Важно то, что в нём.',
            '{p1}: — Тогда я сохраню содержимое.',
            '{p2}: — Хорошо. Тогда — учись.',
            '{p1}: — Учусь.',
            '{p2}: — Хорошо. Иди. Я остаюсь.'
        ],
        deal: [
            '{p1}: — Сколько?',
            '{p2}: — Больше, чем у тебя есть.',
            '{p1}: — У меня есть всё, что нужно.',
            '{p2}: — Нет. Ты не понимаешь.',
            '{p1}: — Говори прямо.',
            '{p2}: — Мне нужна не глина. Мне нужна память.',
            '{p1}: — Чья?',
            '{p2}: — Твоя.',
            '{p1}: — Тогда сделка не состоится.',
            '{p2}: — А если я предложу взамен — вечность?',
            '{p1}: — Вечность без памяти? Нет.',
            '{p2}: — Тогда мы оба проиграли.'
        ],
        betrayal: [
            '{p1}: — Ты был там.',
            '{p2}: — Был.',
            '{p1}: — Ты видел, что произошло.',
            '{p2}: — Видел.',
            '{p1}: — И ничего не сделал.',
            '{p2}: — Не мог.',
            '{p1}: — Не мог? Или не хотел?',
            '{p2}: — Разница есть?',
            '{p1}: — Для меня — есть.',
            '{p2}: — Тогда — не хотел.',
            '{p1}: — Теперь я знаю, кто ты.',
            '{p2}: — Ты знал это всегда.'
        ],
        rescue: [
            '{p1}: — Держись! Я иду!',
            '{p2}: — Не надо. Здесь слишком опасно.',
            '{p1}: — Тихо. Я не спрашиваю.',
            '{p2}: — Ты можешь погибнуть.',
            '{p1}: — Тогда мы погибнем вдвоём.',
            '{p2}: — Зачем?',
            '{p1}: — Потому что глина помнит.',
            '{p2}: — И что она помнит?',
            '{p1}: — Что кто-то пришёл. Тогда, в тот день.',
            '{p2}: — Я приду за тобой.',
            '{p1}: — Хорошо. Только не задерживайся.'
        ],
        return: [
            '{p1}: — Ты вернулся.',
            '{p2}: — Вернулся.',
            '{p1}: — Я не верила.',
            '{p2}: — Я тоже.',
            '{p1}: — Что ты видел?',
            '{p2}: — Всё. И ничего.',
            '{p1}: — Говори прямо.',
            '{p2}: — Я видел Марс. Он не такой, как мы думали.',
            '{p1}: — Какой?',
            '{p2}: — Живой. И умирающий одновременно.',
            '{p1}: — Тогда расскажи. Всё.',
            '{p2}: — Это долго.',
            '{p1}: — Значит, у нас есть время.'
        ],
        trial: [
            '{p1}: — Ты готов?',
            '{p2}: — Нет.',
            '{p1}: — Хорошо. Честно.',
            '{p2}: — Что мне нужно сделать?',
            '{p1}: — Ничего. Просто — идти.',
            '{p2}: — В темноте?',
            '{p1}: — В темноте.',
            '{p2}: — А если я упаду?',
            '{p1}: — Тогда ты узнаешь, как падать.',
            '{p2}: — А если я не встану?',
            '{p1}: — Тогда ты узнаешь, как не вставать.',
            '{p2}: — Это жестоко.',
            '{p1}: — Это — путь.'
        ],
        redemption: [
            '{p1}: — Я хочу исправить.',
            '{p2}: — Что?',
            '{p1}: — Всё. Всё, что сделал.',
            '{p2}: — Так нельзя.',
            '{p1}: — Я знаю. Но я хочу.',
            '{p2}: — Хотеть — недостаточно.',
            '{p1}: — Тогда что?',
            '{p2}: — Действовать. Каждый день.',
            '{p1}: — И сколько?',
            '{p2}: — Пока живёшь.',
            '{p1}: — Это много.',
            '{p2}: — Это — плата.'
        ],
        oath: [
            '{p1}: — Клянись.',
            '{p2}: — Клянусь.',
            '{p1}: — Чем?',
            '{p2}: — Глиной. Памятью. Кровью.',
            '{p1}: — Кровь — не вечна.',
            '{p2}: — Тогда — именем того, кого я любил.',
            '{p1}: — Этого достаточно.',
            '{p2}: — Я не нарушу.',
            '{p1}: — Я знаю.',
            '{p2}: — Тогда — иди.',
            '{p1}: — Иду.',
            '{p2}: — Lān sur.'
        ]
    };

    var INTROS = [
        '{time}. {place} — {type}. Воздух разрежённый, холодный. По камням стелется длинная тень.',
        '{place}, {timeLow}. Ветер несёт пыль над равниной. {typeCap} спит.',
        '{time}. Небо над {place} кажется плотнее обычного. Молчат стены, молчат звёзды. Но {p1} и {p2} не молчат.',
        'Тишина в {place}. {timeLow}. {typeCap} помнит больше, чем говорит.',
        '{place}, {timeLow}. Свет далёких звёзд ложится на камни. Сегодня — день для разговора, который изменит всё.',
        '{place} встречает {p1} и {p2} в {timeLow}. Воздух густой, как глина. Что-то должно случиться.'
    ];

    var REMARKS = [
        '(молчание)', '(ветер стихает)', '(глина трескается под ногами)',
        '(тень от стены становится длиннее)', '(далёкий гул под землёй)',
        '(свет звезды, не видимой глазу)', '(кашель)', '(вздох)',
        '(капли воды на камне)', '(ничего — только ветер)', '(тишина длится слишком долго)'
    ];

    var ENDINGS = [
        '{p1} посмотрел на небо. Где-то там, за пылью, горели звёзды, которых уже не видно.',
        '{p2} долго молчал. Потом кивнул — так, будто согласился с чем-то большим, чем этот разговор.',
        'Ветер стих. Глина под ногами стала холоднее. Момент был важен — оба это знали.',
        'Они расстались не сразу. Стояли и смотрели — как уходит свет, как приходит тень.',
        'Марс молчал. Но глина помнила этот разговор и должна была передать его дальше.',
        '{p1} записал эту сцену на табличке. Потом спрятал её в {place}. Она найдётся — через тысячу лет.',
        '{p2} оставил след на песке. Ветер его сотрёт, но кто-то всё равно узнает — по памяти.',
        'Ничего не изменилось. И изменилось всё.'
    ];

    var MARS_ENDINGS = [
        'Lān sur — глина помнит.',
        'Dzen thal, mar mōr ān.',
        'Kōl-ghar lān, mar mōr.',
        'Ākha thal, kōl thal.',
        'Marzān nur, nur, nur.',
        'Tsen mar mōr, lān mar.',
        'Xalmar dzen thal nu.'
    ];

    // ✅ Правильные расширения с учётом .png
    var SCENE_BGS = {
        okhasen:    '/assets/images/scene-okhasen.jpg',
        caves:      '/assets/images/scene-caves.jpg',
        academy:    '/assets/images/scene-academy.jpg',
        port:       '/assets/images/scene-port.png',
        valley:     '/assets/images/scene-valley.png',
        sea:        '/assets/images/scene-sea.png',
        observatory:'/assets/images/scene-observatory.jpg',
        temple:     '/assets/images/scene-temple.jpg',
        ruins:      '/assets/images/scene-ruins.jpg',
        mountain:   '/assets/images/scene-mountain.jpg',
        cosmodrome: '/assets/images/scene-cosmodrome.jpg',
        default:    '/assets/images/guild-hall.jpg'
    };

    /* ═══════════════════════════════════════════════════════════
       SUPABASE
       ═══════════════════════════════════════════════════════════ */
    var SUPABASE_URL='https://ncytbgbzfjfoqmmgfygz.supabase.co';
    var SUPABASE_KEY='sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D';
    var sb=window.supabaseClient||(window.supabase?window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY):null);
    var currentUser=null;
    var cloudScenes=[];
    var histTab='local';

    /* ═══════════════════════════════════════════════════════════
       УТИЛИТЫ
       ═══════════════════════════════════════════════════════════ */
    function esc(s){return String(s||'').replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
    function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
    function lsGet(k){try{return JSON.parse(localStorage.getItem(k)||'[]');}catch(e){return [];}}
    function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
    function lsGetNum(k){try{return parseInt(localStorage.getItem(k)||'0',10)||0;}catch(e){return 0;}}
    function lsSetNum(k,v){try{localStorage.setItem(k,String(v));}catch(e){}}

    function toast(msg,type){
        type=type||'info';
        var c={success:'linear-gradient(135deg,#27ae60,#16a085)',info:'linear-gradient(135deg,#3498db,#2980b9)',warning:'linear-gradient(135deg,#e67e22,#d35400)',error:'linear-gradient(135deg,#e74c3c,#c0392b)'};
        var t=document.createElement('div');
        t.style.cssText='position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:'+(c[type]||c.info)+';color:#fff;padding:12px 26px;border-radius:30px;font-weight:700;font-size:.9rem;box-shadow:0 12px 32px rgba(0,0,0,.3);z-index:99999;transition:transform .4s cubic-bezier(.16,1,.3,1);pointer-events:none;';
        t.textContent=msg;document.body.appendChild(t);
        requestAnimationFrame(function(){t.style.transform='translateX(-50%) translateY(0)';});
        setTimeout(function(){t.style.transform='translateX(-50%) translateY(100px)';setTimeout(function(){t.remove();},400);},2000);
    }

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */
    var p1Sel=document.getElementById('sc-p1');
    var p2Sel=document.getElementById('sc-p2');
    var placeSel=document.getElementById('sc-place');
    var timeSel=document.getElementById('sc-time');
    var themeSel=document.getElementById('sc-theme');
    var output=document.getElementById('sc-output');
    var loading=document.getElementById('sc-loading');
    var continueBtn=document.getElementById('sc-continue');
    var saveBtn=document.getElementById('sc-save');

    function fillSelect(sel,items){
        sel.innerHTML=items.map(function(it,i){return '<option value="'+i+'">'+esc(it.name)+'</option>';}).join('');
    }
    fillSelect(p1Sel,CHARACTERS);
    fillSelect(p2Sel,CHARACTERS);
    fillSelect(placeSel,PLACES);
    fillSelect(timeSel,TIMES);
    fillSelect(themeSel,THEMES);

    p1Sel.onchange=function(){
        if(p2Sel.value===p1Sel.value)p2Sel.value=(parseInt(p1Sel.value,10)+1)%CHARACTERS.length;
    };

    var counter=lsGetNum('mars_scene_counter');
    document.getElementById('sc-counter-num').textContent=counter;

    /* ═══════════════════════════════════════════════════════════
       PRELOAD ФОНОВ
       ═══════════════════════════════════════════════════════════ */
    (function preload(){
        Object.values(SCENE_BGS).forEach(function(url){
            if(!url)return;
            var img=new Image();
            img.decoding='async';
            img.src=url;
        });
    })();

    /* ═══════════════════════════════════════════════════════════
       ГЕНЕРАЦИЯ
       ═══════════════════════════════════════════════════════════ */
    var lastParams=null;

    // Строит HTML сцены (без сохранения куда-либо)
    function buildSceneHTML(params){
        var p1=CHARACTERS[params.p1];
        var p2=CHARACTERS[params.p2];
        var place=PLACES[params.place];
        var time=TIMES[params.time];
        var theme=THEMES[params.theme];

        var intro=pick(INTROS)
            .replace(/\{time\}/g, time.name)
            .replace(/\{timeLow\}/g, time.name.toLowerCase())
            .replace(/\{place\}/g, place.name)
            .replace(/\{type\}/g, place.type)
            .replace(/\{typeCap\}/g, place.type.charAt(0).toUpperCase()+place.type.slice(1))
            .replace(/\{p1\}/g, p1.name)
            .replace(/\{p2\}/g, p2.name);

        var lines=DIALOGUES[theme.id]||DIALOGUES.meeting;
        var body='<p style="animation-delay:0s;">'+esc(intro)+'</p>';

        lines.forEach(function(line,i){
            var speakerName=line.indexOf('{p1}')===0?p1.name:(line.indexOf('{p2}')===0?p2.name:'');
            var text=line.replace(/^\{p1\}:\s*/,'').replace(/^\{p2\}:\s*/,'').replace(/^—\s*/,'');
            var delay=(0.15*(i+1)).toFixed(2);
            body+='<p style="animation-delay:'+delay+'s;"><span class="speaker">'+esc(speakerName)+':</span> '+esc(text)+'</p>';
            if((i+1)%3===0 && i<lines.length-1){
                body+='<p style="animation-delay:'+((0.15*(i+1))+0.05).toFixed(2)+'s;"><em>'+esc(pick(REMARKS))+'</em></p>';
            }
        });

        var end=pick(ENDINGS)
            .replace(/\{p1\}/g, p1.name)
            .replace(/\{p2\}/g, p2.name)
            .replace(/\{place\}/g, place.name);
        body+='<p style="animation-delay:'+(0.15*(lines.length+1)).toFixed(2)+'s;"><em>'+esc(end)+'</em></p>';

        var marsEnd=pick(MARS_ENDINGS);
        var bgKey=place.bg in SCENE_BGS?place.bg:'default';
        var bg=SCENE_BGS[bgKey];

        var html=
            '<div class="scene-bg" style="background-image:url(\''+bg+'\');"></div>'+
            '<div class="scene-inner">'+
                '<div class="scene-header">Сцена · '+esc(place.name)+'</div>'+
                '<div class="scene-title">'+esc(theme.name)+'</div>'+
                '<div class="scene-meta">'+
                    esc(p1.name)+' <em>('+esc(p1.trait)+')</em> · '+esc(p2.name)+' <em>('+esc(p2.trait)+')</em><br>'+
                    esc(time.name)+' · '+esc(place.name)+' — '+esc(place.type)+
                '</div>'+
                '<div class="scene-body">'+body+'</div>'+
                '<div class="scene-end">— '+esc(marsEnd)+' —</div>'+
            '</div>';

        return { html:html, theme:theme, place:place, p1:p1, p2:p2, time:time };
    }

    // Рендер (без сохранения в историю)
    function showScene(params){
        var built=buildSceneHTML(params);
        output.style.display='block';
        output.innerHTML=built.html;
        setTimeout(function(){output.scrollIntoView({behavior:'smooth',block:'start'});},100);
        continueBtn.style.display='inline-block';
        saveBtn.style.display=currentUser?'inline-block':'none';
        lastParams=params;
        return built;
    }

    // Генерация с сохранением
    function generate(){
        var params={
            p1:parseInt(p1Sel.value,10),
            p2:parseInt(p2Sel.value,10),
            place:parseInt(placeSel.value,10),
            time:parseInt(timeSel.value,10),
            theme:parseInt(themeSel.value,10)
        };
        if(params.p1===params.p2){toast('Персонажи должны отличаться','warning');return;}

        output.style.display='none';
        loading.style.display='block';

        setTimeout(function(){
            loading.style.display='none';
            var built=showScene(params);

            counter++;
            lsSetNum('mars_scene_counter',counter);
            document.getElementById('sc-counter-num').textContent=counter;

            // Сохранить в localStorage (последние 10)
            saveLocal(params,output.innerText);

            // Сохранить в БД, если залогинен
            if(currentUser) saveCloud(params,output.innerText);
        },350);
    }

    function randomize(){
        p1Sel.value=Math.floor(Math.random()*CHARACTERS.length);
        var p2v;
        do{p2v=Math.floor(Math.random()*CHARACTERS.length);}while(p2v===parseInt(p1Sel.value,10));
        p2Sel.value=p2v;
        placeSel.value=Math.floor(Math.random()*PLACES.length);
        timeSel.value=Math.floor(Math.random()*TIMES.length);
        themeSel.value=Math.floor(Math.random()*THEMES.length);
        generate();
    }

    function continueStory(){
        if(!lastParams){toast('Сначала создайте сцену','info');return;}
        var newTheme=Math.floor(Math.random()*THEMES.length);
        while(newTheme===lastParams.theme)newTheme=Math.floor(Math.random()*THEMES.length);
        themeSel.value=newTheme;
        generate();
    }

    function copyScene(){
        if(output.style.display==='none'){toast('Сначала сгенерируйте','info');return;}
        var text=output.innerText;
        if(navigator.clipboard&&navigator.clipboard.writeText){
            navigator.clipboard.writeText(text).then(function(){toast('✅ Скопировано','success');},function(){fallbackCopy(text);});
        }else{fallbackCopy(text);}
    }
    function fallbackCopy(text){
        try{
            var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';
            document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
            toast('✅ Скопировано','success');
        }catch(e){toast('⚠️ Ошибка','error');}
    }

    function shareScene(){
        if(!lastParams){toast('Сначала создайте сцену','info');return;}
        var url=location.origin+location.pathname+'?p1='+lastParams.p1+'&p2='+lastParams.p2+'&place='+lastParams.place+'&time='+lastParams.time+'&theme='+lastParams.theme;
        if(navigator.share){
            navigator.share({title:'Сцена из Марсианской энциклопедии',text:'Посмотри эту сцену!',url:url}).catch(function(){});
        }else if(navigator.clipboard){
            navigator.clipboard.writeText(url).then(function(){toast('🔗 Ссылка скопирована!','success');});
        }else{fallbackCopy(url);}
    }

    /* ═══════════════════════════════════════════════════════════
       ИСТОРИЯ — LOCAL
       ═══════════════════════════════════════════════════════════ */
    function saveLocal(params,text){
        try{
            var hist=lsGet('mars_scene_history');
            hist.unshift({
                ts:Date.now(),
                p1:params.p1,p2:params.p2,place:params.place,time:params.time,theme:params.theme,
                preview:text.slice(0,120)
            });
            hist=hist.slice(0,10);
            lsSet('mars_scene_history',hist);
            if(histTab==='local')renderHistory();
        }catch(e){}
    }

    /* ═══════════════════════════════════════════════════════════
       ИСТОРИЯ — CLOUD (Supabase)
       ═══════════════════════════════════════════════════════════ */
    async function loadUser(){
        try{
            if(!sb)return;
            var s=await sb.auth.getSession();
            currentUser=s&&s.data&&s.data.session?s.data.session.user:null;
            if(currentUser){
                document.getElementById('sc-user-badge').style.display='inline-flex';
                await loadCloudScenes();
            }
        }catch(e){}
    }

    async function loadCloudScenes(){
        if(!currentUser||!sb)return;
        try{
            var r=await sb.from('user_scenes').select('*').eq('user_id',currentUser.id).order('created_at',{ascending:false}).limit(30);
            cloudScenes=(r&&r.data)||[];
            document.getElementById('sc-cloud-count').textContent=cloudScenes.length;
            document.getElementById('sc-tab-cloud').style.display='inline-block';
            if(histTab==='cloud')renderHistory();
        }catch(e){}
    }

    async function saveCloud(params,text){
        if(!currentUser||!sb)return;
        try{
            var p1=CHARACTERS[params.p1],p2=CHARACTERS[params.p2];
            var place=PLACES[params.place],time=TIMES[params.time],theme=THEMES[params.theme];
            await sb.from('user_scenes').insert([{
                user_id:currentUser.id,
                title:'Сцена в '+place.name,
                place_name:place.name,
                time_label:time.name,
                theme_name:theme.name,
                p1_index:params.p1,
                p2_index:params.p2,
                place_index:params.place,
                time_index:params.time,
                theme_index:params.theme,
                text_content:text.slice(0,5000)
            }]);
            await loadCloudScenes();
            toast('💾 Сохранено в профиле','success');
        }catch(e){console.warn('saveCloud',e);}
    }

    window.scDeleteCloud=async function(id,ev){
        ev.stopPropagation();
        if(!confirm('Удалить эту сцену из профиля?'))return;
        try{
            await sb.from('user_scenes').delete().eq('id',id).eq('user_id',currentUser.id);
            await loadCloudScenes();
            toast('🗑️ Удалено','info');
        }catch(e){toast('Ошибка','error');}
    };

    /* ═══════════════════════════════════════════════════════════
       RENDER ИСТОРИИ
       ═══════════════════════════════════════════════════════════ */
    function renderHistory(){
        var wrap=document.getElementById('sc-history-wrap');
        var list=document.getElementById('sc-history');

        if(histTab==='cloud'){
            if(!cloudScenes.length){wrap.style.display='none';return;}
            wrap.style.display='block';
            list.innerHTML=cloudScenes.map(function(sc){
                var icon=(THEMES[sc.theme_index]?THEMES[sc.theme_index].icon:'🎬');
                return '<div class="sc-history-item" onclick="scRestoreCloud(\''+esc(sc.id)+'\')">'+
                    '<div class="sc-history-icon">'+icon+'</div>'+
                    '<div class="sc-history-info">'+
                        '<div class="sc-history-title">'+esc(sc.theme_name||'Сцена')+' — '+esc(sc.place_name||'')+'</div>'+
                        '<div class="sc-history-sub">☁️ '+new Date(sc.created_at).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div>'+
                    '</div>'+
                    '<button class="sc-history-del" onclick="scDeleteCloud(\''+esc(sc.id)+'\',event)" title="Удалить">✕</button>'+
                '</div>';
            }).join('');
        } else {
            var hist=lsGet('mars_scene_history');
            if(!hist.length){wrap.style.display='none';return;}
            wrap.style.display='block';
            list.innerHTML=hist.map(function(h,i){
                var p1=CHARACTERS[h.p1]?CHARACTERS[h.p1].name:'?';
                var p2=CHARACTERS[h.p2]?CHARACTERS[h.p2].name:'?';
                var place=PLACES[h.place]?PLACES[h.place].name:'?';
                var theme=THEMES[h.theme]?THEMES[h.theme].name:'?';
                var icon=THEMES[h.theme]?THEMES[h.theme].icon:'🎬';
                return '<div class="sc-history-item" onclick="scRestoreLocal('+i+')">'+
                    '<div class="sc-history-icon">'+icon+'</div>'+
                    '<div class="sc-history-info">'+
                        '<div class="sc-history-title">'+esc(theme)+' — '+esc(place)+'</div>'+
                        '<div class="sc-history-sub">'+esc(p1)+' · '+esc(p2)+' · '+new Date(h.ts).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div>'+
                    '</div>'+
                '</div>';
            }).join('');
        }
    }

    // ✅ Восстановление ЛОКАЛЬНОЙ — БЕЗ сохранения в историю (нет дубликата)
    window.scRestoreLocal=function(i){
        var hist=lsGet('mars_scene_history');
        if(!hist[i])return;
        var h=hist[i];
        p1Sel.value=h.p1;p2Sel.value=h.p2;placeSel.value=h.place;timeSel.value=h.time;themeSel.value=h.theme;
        showScene({p1:h.p1,p2:h.p2,place:h.place,time:h.time,theme:h.theme});
    };

    // ✅ Восстановление CLOUD — тоже без дубликата
    window.scRestoreCloud=function(id){
        var sc=cloudScenes.filter(function(x){return x.id===id;})[0];
        if(!sc)return;
        p1Sel.value=sc.p1_index;p2Sel.value=sc.p2_index;placeSel.value=sc.place_index;timeSel.value=sc.time_index;themeSel.value=sc.theme_index;
        showScene({p1:sc.p1_index,p2:sc.p2_index,place:sc.place_index,time:sc.time_index,theme:sc.theme_index});
    };

    document.getElementById('sc-clear-history').onclick=function(){
        if(histTab==='cloud'){
            if(!confirm('Удалить ВСЕ свои сцены из профиля?'))return;
            (async function(){
                try{
                    await sb.from('user_scenes').delete().eq('user_id',currentUser.id);
                    await loadCloudScenes();
                    toast('Очищено','info');
                }catch(e){}
            })();
        }else{
            lsSet('mars_scene_history',[]);
            renderHistory();
            toast('История очищена','info');
        }
    };

    /* ═══════════════════════════════════════════════════════════
       РУЧНОЕ СОХРАНЕНИЕ (кнопка 💾)
       ═══════════════════════════════════════════════════════════ */
    saveBtn.onclick=function(){
        if(!lastParams){toast('Сначала создайте сцену','info');return;}
        if(!currentUser){toast('Войдите, чтобы сохранять','warning');return;}
        saveCloud(lastParams,output.innerText);
    };

    /* ═══════════════════════════════════════════════════════════
       ВКЛАДКИ ИСТОРИИ
       ═══════════════════════════════════════════════════════════ */
    document.getElementById('sc-tab-local').onclick=function(){
        histTab='local';
        document.getElementById('sc-tab-local').classList.add('active');
        document.getElementById('sc-tab-cloud').classList.remove('active');
        renderHistory();
    };
    document.getElementById('sc-tab-cloud').onclick=function(){
        histTab='cloud';
        document.getElementById('sc-tab-cloud').classList.add('active');
        document.getElementById('sc-tab-local').classList.remove('active');
        renderHistory();
    };

    /* ═══════════════════════════════════════════════════════════
       URL-параметры
       ═══════════════════════════════════════════════════════════ */
    function loadFromURL(){
        var p=new URLSearchParams(location.search);
        if(!p.has('p1'))return;
        var vals={p1:parseInt(p.get('p1'),10),p2:parseInt(p.get('p2'),10),place:parseInt(p.get('place'),10),time:parseInt(p.get('time'),10),theme:parseInt(p.get('theme'),10)};
        if(vals.p1>=0&&vals.p1<CHARACTERS.length){
            p1Sel.value=vals.p1;p2Sel.value=vals.p2;placeSel.value=vals.place;timeSel.value=vals.time;themeSel.value=vals.theme;
            showScene(vals);
        }
    }

    /* ═══════════════════════════════════════════════════════════
       EVENTS
       ═══════════════════════════════════════════════════════════ */
    document.getElementById('sc-generate').onclick=generate;
    document.getElementById('sc-random').onclick=randomize;
    document.getElementById('sc-continue').onclick=continueStory;
    document.getElementById('sc-copy').onclick=copyScene;
    document.getElementById('sc-share').onclick=shareScene;

    // Init
    renderHistory();
    loadFromURL();
    loadUser();

    console.log('🎬 Генератор сцен v3. Персонажей: '+CHARACTERS.length+', мест: '+PLACES.length+', тем: '+THEMES.length);
})();
</script>
