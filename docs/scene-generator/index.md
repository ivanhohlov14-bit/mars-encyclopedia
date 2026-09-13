---
title: Генератор сцен
comments: false
---

<div id="scene-app" style="max-width: 800px; margin: 0 auto; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align:center; margin-bottom:24px;">
    <h1 style="font-size:1.8rem; letter-spacing:2px; background:linear-gradient(135deg,#A29BFE,#6C63FF); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin:0 0 8px;">🎬 Генератор сцен</h1>
    <p style="color:#888; font-size:0.9rem; margin:0;">Собери сцену из персонажей, мест и событий мира</p>
</div>

<div style="background:linear-gradient(135deg,#f5f7fa,#e8ecf3); padding:24px; border-radius:16px; margin-bottom:24px; box-shadow:0 8px 24px rgba(0,0,0,0.06);">

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">ПЕРСОНАЖ 1</label>
            <select id="sc-p1" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
        <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">ПЕРСОНАЖ 2</label>
            <select id="sc-p2" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
        <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">МЕСТО</label>
            <select id="sc-place" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
        <div>
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">ВРЕМЯ</label>
            <select id="sc-time" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
        <div style="grid-column:1/-1;">
            <label style="display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:6px; letter-spacing:0.5px;">ТЕМА СЦЕНЫ</label>
            <select id="sc-theme" style="width:100%; padding:12px; border-radius:10px; border:2px solid #ccd7e6; font-size:0.95rem; font-family:inherit; background:#fff; outline:none;"></select>
        </div>
    </div>

    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
        <button id="sc-generate" style="padding:14px 32px; background:linear-gradient(135deg,#6C63FF,#A29BFE); color:#fff; border:none; border-radius:30px; font-size:1rem; font-weight:800; cursor:pointer; font-family:inherit; letter-spacing:0.5px; box-shadow:0 8px 24px rgba(108,99,255,0.4); touch-action:manipulation;">🎬 Сгенерировать</button>
        <button id="sc-random" style="padding:14px 24px; background:#fff; color:#6C63FF; border:2px solid #6C63FF; border-radius:30px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; touch-action:manipulation;">🎲 Случайно</button>
        <button id="sc-copy" style="padding:14px 24px; background:#fff; color:#666; border:2px solid #ccd7e6; border-radius:30px; font-size:0.95rem; font-weight:700; cursor:pointer; font-family:inherit; touch-action:manipulation;">📋 Скопировать</button>
    </div>
</div>

<div id="sc-output" style="display:none; background:linear-gradient(135deg,#1a1a2e,#252550); border-radius:16px; padding:32px 28px; color:#e0e0f0; box-shadow:0 20px 60px rgba(108,99,255,0.3); border:1px solid rgba(108,99,255,0.3);">
</div>

</div>

<style>
#scene-app select:focus { border-color: #6C63FF; box-shadow: 0 0 0 3px rgba(108,99,255,0.15); }
#sc-output .scene-header {
    font-family: Georgia, serif;
    color: #A29BFE;
    font-size: 0.8rem;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 8px;
    text-transform: uppercase;
}
#sc-output .scene-title {
    font-family: Georgia, serif;
    font-size: 1.5rem;
    font-weight: 900;
    text-align: center;
    color: #fff;
    margin-bottom: 24px;
    letter-spacing: 1px;
}
#sc-output .scene-meta {
    text-align: center;
    color: #9999bb;
    font-size: 0.85rem;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(108,99,255,0.3);
}
#sc-output .scene-body {
    font-family: Georgia, serif;
    font-size: 1.05rem;
    line-height: 1.9;
    color: #d4d4e4;
}
#sc-output .scene-body p {
    margin: 0 0 18px 0;
}
#sc-output .scene-body .speaker {
    color: #A29BFE;
    font-weight: 700;
}
#sc-output .scene-body .mars-line {
    color: #f39c12;
    font-style: italic;
    display: block;
    margin-top: 4px;
    font-size: 0.9em;
}
#sc-output .scene-body em {
    color: #A29BFE;
}
#sc-output .scene-end {
    text-align: center;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid rgba(108,99,255,0.3);
    color: #A29BFE;
    font-family: Georgia, serif;
    letter-spacing: 3px;
    font-size: 0.85rem;
}
@media (max-width: 600px) {
    #sc-output { padding: 24px 18px; }
    #sc-output .scene-body { font-size: 0.95rem; }
    #sc-output .scene-title { font-size: 1.2rem; }
}
</style>

<script>
(function() {
    'use strict';

    // ============================================================
    // 📚 БАЗА ДАННЫХ ДЛЯ ГЕНЕРАЦИИ
    // ============================================================
    const CHARACTERS = [
        { name: 'Хевсур', trait: 'древний хранитель знаний', mars: 'Khevsur' },
        { name: 'Талин', trait: 'молодой астроном Академии', mars: 'Talīn' },
        { name: 'Йарра', trait: 'мудрая женщина из Фарсиды', mars: 'Yarra' },
        { name: 'Аратан III', trait: 'последний король Эдема', mars: 'Aratan III' },
        { name: 'Ксанф', trait: 'предводитель пиратов', mars: 'Ksanf' },
        { name: 'Элла', trait: 'наставница Талина', mars: 'Ella' },
        { name: 'Сарум Великий', trait: 'легендарный король', mars: 'Sarum' },
        { name: 'Алира', trait: 'жрица Акхи', mars: 'Alira' },
        { name: 'Совия', trait: 'слепая пророчица', mars: 'Soviya' },
        { name: 'Кан', trait: 'писец Академии', mars: 'Kan' },
        { name: 'Араш', trait: 'мореплаватель', mars: 'Arash' },
        { name: 'Мнемис', trait: 'летописец мира', mars: 'Lānsur' }
    ];

    const PLACES = [
        { name: 'Окхасен', type: 'столица на берегу Ацидалийского моря' },
        { name: 'Пещеры Фарсиды', type: 'подземный лабиринт Хевсура' },
        { name: 'Академия', type: 'древний центр знаний' },
        { name: 'Порт Ксанф', type: 'пиратская столица' },
        { name: 'Долина Маринера', type: 'гигантский каньон' },
        { name: 'Эритрейское море', type: 'замерзающее море' },
        { name: 'Обсерватория Дзен-Тхал', type: 'башня астрономов' },
        { name: 'Храм Акхи', type: 'святилище воды' },
        { name: 'Развалины Эдема', type: 'мёртвый город королей' },
        { name: 'Долина Ксанфа', type: 'место находки табличек' }
    ];

    const TIMES = [
        { name: 'На рассвете', hours: 6 },
        { name: 'В полдень', hours: 12 },
        { name: 'На закате', hours: 18 },
        { name: 'В сумерках', hours: 21 },
        { name: 'Глубокой ночью', hours: 2 },
        { name: 'В час Dzēn', hours: 4 },
        { name: 'В час Khōsen', hours: 14 },
        { name: 'В час Khō-mōr', hours: 20 }
    ];

    const THEMES = [
        { id: 'meeting', name: 'Встреча', lines: [
            '— Ты пришёл. Значит, слышал зов.',
            '— Слышал. И не мог не прийти.',
            '— Тогда садись. Разговор будет долгим.',
            '— У меня нет времени на долгие разговоры.',
            '— У всех нас нет времени. Марс умирает.'
        ]},
        { id: 'secret', name: 'Тайна', lines: [
            '— То, что я расскажу, не должно покинуть этих стен.',
            '— Клянусь глиной.',
            '— Глина помнит всё. И тебя запомнит.',
            '— Что ты хочешь мне сказать?',
            '— Это не я хочу. Это Марс говорит через меня.'
        ]},
        { id: 'farewell', name: 'Прощание', lines: [
            '— Ты уходишь.',
            '— Я должен.',
            '— Куда ты пойдёшь?',
            '— Туда, куда зовёт ветер.',
            '— Ветер тоже умирает, как и всё здесь.'
        ]},
        { id: 'prophecy', name: 'Пророчество', lines: [
            '— Я видела сон.',
            '— Расскажи.',
            '— Ты стоял на льду. И лёд трещал.',
            '— Это просто сон.',
            '— Это не сон. Это память о будущем.'
        ]},
        { id: 'battle', name: 'Перед битвой', lines: [
            '— Сколько у нас времени?',
            '— До рассвета.',
            '— Мало.',
            '— Достаточно, чтобы сделать то, что должны.',
            '— Тогда скажи слово. И я пойду.'
        ]},
        { id: 'discovery', name: 'Открытие', lines: [
            '— Смотри! Вот оно!',
            '— Это не может быть правдой.',
            '— Правда — это то, что оставляет след.',
            '— Мы найдём это место?',
            '— Мы уже там.'
        ]},
        { id: 'loss', name: 'Потеря', lines: [
            '— Его больше нет.',
            '— Нет...',
            '— Глина помнит его имя.',
            '— Этого мало.',
            '— Этого всегда мало. Но это всё, что у нас есть.'
        ]},
        { id: 'wisdom', name: 'Мудрость', lines: [
            '— Как ты дожил до этих лет?',
            '— Я слушал тишину.',
            '— И что она сказала?',
            '— Что жизнь — коротка. А память — вечна.',
            '— Тогда я буду помнить тебя.'
        ]}
    ];

    // ============================================================
    // ИНИЦИАЛИЗАЦИЯ SELECT
    // ============================================================
    function fillSelect(id, items, placeholder) {
        const sel = document.getElementById(id);
        sel.innerHTML = items.map((it, i) =>
            `<option value="${i}">${it.name}</option>`
        ).join('');
    }

    fillSelect('sc-p1', CHARACTERS);
    fillSelect('sc-p2', CHARACTERS);
    fillSelect('sc-place', PLACES);
    fillSelect('sc-time', TIMES);
    fillSelect('sc-theme', THEMES);

    // p2 = не тот же, что p1
    const p2 = document.getElementById('sc-p2');
    const p1 = document.getElementById('sc-p1');
    p1.onchange = function() {
        if (p2.value === p1.value) {
            p2.value = (parseInt(p1.value, 10) + 1) % CHARACTERS.length;
        }
    };

    // ============================================================
    // ГЕНЕРАЦИЯ
    // ============================================================
    function generate() {
        const p1c = CHARACTERS[parseInt(p1.value, 10)];
        const p2c = CHARACTERS[parseInt(p2.value, 10)];
        const place = PLACES[parseInt(document.getElementById('sc-place').value, 10)];
        const time = TIMES[parseInt(document.getElementById('sc-time').value, 10)];
        const theme = THEMES[parseInt(document.getElementById('sc-theme').value, 10)];

        // Случайный интро-абзац
        const introTemplates = [
            `${time.name}. ${place.name} — ${place.type}. Воздух разрежённый, холодный. По камням стелется длинная тень.`,
            `${place.name}, ${time.name.toLowerCase()}. Ветер несёт пыль над равниной. ${place.type.charAt(0).toUpperCase() + place.type.slice(1)} спит.`,
            `${time.name}. Небо над ${place.name} кажется плотнее обычного. Молчат стены, молчат звёзды, но ${p1c.name} и ${p2c.name} не молчат.`,
            `Тишина в ${place.name}. ${time.name.toLowerCase()}. ${place.type.charAt(0).toUpperCase() + place.type.slice(1)} помнит больше, чем говорит.`,
            `${place.name}, ${time.name.toLowerCase()}. Свет далёких звёзд ложится на камни. Сегодня — день для разговора, который изменит всё.`
        ];

        // Диалог
        const lines = theme.lines;

        // Собираем сцену
        const intro = introTemplates[Math.floor(Math.random() * introTemplates.length)];

        let bodyHtml = `<p>${intro}</p>`;

        lines.forEach((line, i) => {
            // Определяем, кто говорит — чётные p1, нечётные p2
            const speaker = (i % 2 === 0) ? p1c : p2c;
            // Берём первую реплику без тире
            const cleanLine = line.replace(/^—\s*/, '');
            bodyHtml += `<p><span class="speaker">${speaker.name}:</span> ${cleanLine}</p>`;
        });

        // Финальная строка — реакция или мысль
        const endings = [
            `${p1c.name} посмотрел на небо. Где-то там, за пылью, горели звёзды, которых уже не видно.`,
            `${p2c.name} долго молчал. Потом кивнул — так, будто согласился с чем-то большим, чем этот разговор.`,
            `Ветер стих. Глина под ногами стала холоднее. Момент был важен — оба это знали.`,
            `Они расстались не сразу. Стояли и смотрели — как уходит свет, как приходит тень.`,
            `Марс молчал. Но глина помнила этот разговор и должна была передать его дальше.`,
            `${p1c.name} записал эту сцену на табличке. Потом спрятал её в ${place.name}. Она найдётся — через тысячу лет.`
        ];
        bodyHtml += `<p><em>${endings[Math.floor(Math.random() * endings.length)]}</em></p>`;

        // Финальная строка — марсианская
        const marsEnding = [
            'Lān sur — глина помнит.',
            'Dzen thal, mar mōr ān.',
            'Kōl-ghar lān, mar mōr.',
            'Ākha thal, kōl thal.',
            'Marzān nur, nur, nur.'
        ][Math.floor(Math.random() * 5)];

        // Заголовок
        const titles = {
            'meeting': 'Встреча',
            'secret': 'Тайна, о которой молчат',
            'farewell': 'Прощание',
            'prophecy': 'Пророчество',
            'battle': 'Перед битвой',
            'discovery': 'Открытие',
            'loss': 'Потеря',
            'wisdom': 'Мудрость'
        };

        const output = document.getElementById('sc-output');
        output.style.display = 'block';
        output.innerHTML = `
            <div class="scene-header">Сцена · ${place.name}</div>
            <div class="scene-title">${titles[theme.id] || theme.name}</div>
            <div class="scene-meta">
                ${p1c.name} <em>(${p1c.trait})</em> · ${p2c.name} <em>(${p2c.trait})</em><br>
                ${time.name.toLowerCase()} · ${place.name}
            </div>
            <div class="scene-body">${bodyHtml}</div>
            <div class="scene-end">— ${marsEnding} —</div>
        `;

        // Прокрутка к результату
        output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function randomize() {
        p1.value = Math.floor(Math.random() * CHARACTERS.length);
        p2.value = Math.floor(Math.random() * CHARACTERS.length);
        while (p2.value === p1.value) {
            p2.value = Math.floor(Math.random() * CHARACTERS.length);
        }
        document.getElementById('sc-place').value = Math.floor(Math.random() * PLACES.length);
        document.getElementById('sc-time').value = Math.floor(Math.random() * TIMES.length);
        document.getElementById('sc-theme').value = Math.floor(Math.random() * THEMES.length);
        generate();
    }

    function copyScene() {
        const output = document.getElementById('sc-output');
        if (!output || output.style.display === 'none') return;
        const text = output.innerText;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => flashCopy('✅ Скопировано'));
        } else {
            flashCopy('⚠️ Не поддерживается');
        }
    }

    function flashCopy(msg) {
        const btn = document.getElementById('sc-copy');
        const orig = btn.textContent;
        btn.textContent = msg;
        setTimeout(() => { btn.textContent = orig; }, 1500);
    }

    // ============================================================
    // ОБРАБОТЧИКИ
    // ============================================================
    document.getElementById('sc-generate').onclick = generate;
    document.getElementById('sc-random').onclick = randomize;
    document.getElementById('sc-copy').onclick = copyScene;

    console.log('🎬 Генератор сцен готов. Персонажей: ' + CHARACTERS.length +
                ', мест: ' + PLACES.length +
                ', тем: ' + THEMES.length);
})();
</script>
