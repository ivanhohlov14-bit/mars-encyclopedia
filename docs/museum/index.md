---
title: Виртуальный музей
comments: false
---

<div id="museum-app" style="max-width: 1200px; margin: 0 auto; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;">

<h1 style="text-align:center; font-size: 2.4rem; letter-spacing: 3px; background: linear-gradient(135deg, #8b4a0e, #d4a552, #8b4a0e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 900;">🏛️ Виртуальный музей</h1>

<p style="text-align:center; color:#666; font-size:0.95rem; margin-bottom:32px;">Собрание артефактов, глиняных табличек и реликвий марсианской цивилизации</p>

<div id="filters" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-bottom:28px;"></div>

<div id="gallery" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:20px;"></div>

<div id="modal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(20,10,0,0.9); backdrop-filter:blur(8px); padding:20px; overflow:auto;"></div>

</div>

<style>
.artifact-card {
    background: linear-gradient(135deg, #f5f0e6, #e8dcc0);
    border: 2px solid #a88858;
    border-radius: 12px;
    padding: 20px 18px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: center;
    box-shadow: 0 4px 12px rgba(60, 30, 5, 0.15);
    position: relative;
    overflow: hidden;
}
.artifact-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #8b4a0e, #d4a552);
}
.artifact-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 32px rgba(60, 30, 5, 0.3);
    border-color: #6b4a20;
}
.artifact-emoji {
    font-size: 3.5rem;
    margin-bottom: 12px;
    display: block;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}
.artifact-name {
    font-size: 1.05rem;
    font-weight: 800;
    color: #3a1f05;
    margin: 0 0 6px;
    font-family: Georgia, serif;
}
.artifact-origin {
    font-size: 0.78rem;
    color: #8b4a0e;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}
.artifact-era {
    font-size: 0.75rem;
    color: #888;
    margin-top: 8px;
    font-style: italic;
}
.filter-btn {
    padding: 8px 18px;
    background: rgba(139, 74, 14, 0.1);
    border: 2px solid #a88858;
    border-radius: 24px;
    color: #5c2a09;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
}
.filter-btn:hover, .filter-btn.active {
    background: linear-gradient(135deg, #8b4a0e, #b88a3a);
    color: #fff;
    border-color: #5c2a09;
}
.artifact-detail {
    max-width: 700px;
    margin: 60px auto;
    background: linear-gradient(135deg, #f5f0e6, #e8dcc0);
    border: 3px solid #6b4a20;
    border-radius: 16px;
    padding: 40px;
    position: relative;
    box-shadow: 0 30px 80px rgba(0,0,0,0.7);
}
.artifact-detail-close {
    position: absolute;
    top: 12px; right: 16px;
    background: none;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    color: #8b4a0e;
    padding: 4px 12px;
}
.artifact-detail h2 {
    font-family: Georgia, serif;
    color: #3a1f05;
    margin: 0 0 8px;
    font-size: 1.8rem;
}
.artifact-detail .detail-origin {
    color: #8b4a0e;
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 0.85rem;
    text-transform: uppercase;
    margin-bottom: 20px;
}
.artifact-detail .detail-emoji {
    font-size: 5rem;
    text-align: center;
    margin: 24px 0;
    display: block;
}
.artifact-detail .detail-text {
    font-family: Georgia, serif;
    font-size: 1.05rem;
    line-height: 1.85;
    color: #2b1f0f;
}
.artifact-detail .detail-meta {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #a88858;
    font-size: 0.85rem;
    color: #6b4a20;
    font-style: italic;
}
html body.mars-stars-on .artifact-card {
    background: linear-gradient(135deg, #1a1a2e, #252550);
    border-color: rgba(108,99,255,0.5);
}
html body.mars-stars-on .artifact-name { color: #f0f0ff; }
html body.mars-stars-on .artifact-origin { color: #A29BFE; }
html body.mars-stars-on .artifact-detail {
    background: linear-gradient(135deg, #1a1a2e, #252550);
    border-color: rgba(108,99,255,0.6);
}
html body.mars-stars-on .artifact-detail h2 { color: #f0f0ff; }
html body.mars-stars-on .artifact-detail .detail-text { color: #d4d4e4; }
html body.mars-stars-on .filter-btn {
    background: rgba(108,99,255,0.15);
    border-color: rgba(108,99,255,0.5);
    color: #A29BFE;
}
@media (max-width: 600px) {
    .artifact-detail { padding: 24px; margin: 20px auto; }
    .artifact-detail h2 { font-size: 1.4rem; }
    .artifact-detail .detail-emoji { font-size: 3.5rem; }
    .artifact-detail .detail-text { font-size: 0.95rem; }
}
</style>

<script>
(function() {
    'use strict';

    // ============================================================
    // 📚 КАТАЛОГ АРТЕФАКТОВ — добавь свои
    // ============================================================
    const ARTIFACTS = [
        {
            id: 'tablet-hevsur',
            name: 'Табличка Хевсура',
            origin: 'Пещеры Фарсиды',
            era: 'ок. 2700 г. Э.О.',
            emoji: '📜',
            category: 'Таблички',
            description: 'Главный артефакт энциклопедии. Глиняная табличка, найденная в подземном храме долины Ксанфа. Содержит расшифровку «Lān sur» и считается первой записью о падении Эритрея.'
        },
        {
            id: 'obsidian-dagger',
            name: 'Обсидиановый кинжал',
            origin: 'Киммерия',
            era: 'ок. 800 г. Э.О.',
            emoji: '🗡️',
            category: 'Оружие',
            description: 'Оружие жрецов Араксиса. Обсидиан добывали у подножия Олимпа. Клинок украшен гравировкой с именами первых королей.'
        },
        {
            id: 'akanth-crown',
            name: 'Коралловая корона',
            origin: 'Королевство Ксанф',
            era: '2700 г. Э.О.',
            emoji: '👑',
            category: 'Регалии',
            description: 'Корона короля Ксанфа, изготовленная из кораллов Эритрейского моря. Символ власти над морем. Пропала при замерзании моря в 2740 г.'
        },
        {
            id: 'amulets',
            name: 'Амулеты Акхи',
            origin: 'Окхасен',
            era: 'ок. 1500 г. Э.О.',
            emoji: '🔮',
            category: 'Религия',
            description: 'Набор оберегов, посвящённых богине воды Акхе. Носились мореплавателями перед выходом в море. Каждый амулет — миниатюрная фигурка волны.'
        },
        {
            id: 'abacus',
            name: 'Счётная доска',
            origin: 'Академия Окхасена',
            era: 'ок. 2000 г. Э.О.',
            emoji: '🧮',
            category: 'Наука',
            description: 'Двадцатеричная счётная доска астрономов. Использовалась для расчёта траекторий Фобоса и Деймоса. Найдена в архиве Академии.'
        },
        {
            id: 'telescope',
            name: 'Бронзовый телескоп',
            origin: 'Обсерватория Дзен-Тхал',
            era: 'ок. 2600 г. Э.О.',
            emoji: '🔭',
            category: 'Наука',
            description: 'Один из первых телескопов Марса. Использовался для наблюдения за Деймосом. Найден в развалинах обсерватории с застывшими линзами.'
        },
        {
            id: 'scroll-kings',
            name: 'Свиток королей',
            origin: 'Архив Тиррении',
            era: 'ок. 1900 г. Э.О.',
            emoji: '📖',
            category: 'Тексты',
            description: 'Пергаментный свиток с именами всех правителей Эдема. Содержит записи о 47 королях и 3 царицах, включая последнего — Аратана III.'
        },
        {
            id: 'sky-chart',
            name: 'Звёздная карта',
            origin: 'Фарсида',
            era: 'ок. 2400 г. Э.О.',
            emoji: '🌌',
            category: 'Астрономия',
            description: 'Карта ночного неба Марса, вырезанная на каменной плите. Обозначены все 22 месяца, положение Деймоса и Фобоса, а также путь кометы Ярра.'
        },
        {
            id: 'obsidian-mask',
            name: 'Маска жреца',
            origin: 'Храм Хевсура',
            era: 'ок. 2600 г. Э.О.',
            emoji: '🎭',
            category: 'Религия',
            description: 'Церемониальная маска верховного жреца. Обсидиан с инкрустацией серебром. Использовалась в ритуалах "омовения" в день Dzen-thal.'
        },
        {
            id: 'clay-stylus',
            name: 'Стилос писца',
            origin: 'Долина Ксанфа',
            era: 'ок. 2500 г. Э.О.',
            emoji: '✍️',
            category: 'Инструменты',
            description: 'Инструмент для письма по глине. Заострённый с одной стороны, с ластиком на другой. Принадлежал писцу Халдану, автору «Книги Ксанфа».'
        },
        {
            id: 'coral-idol',
            name: 'Коралловый идол',
            origin: 'Эритрейское море',
            era: 'ок. 1400 г. Э.О.',
            emoji: '🐚',
            category: 'Религия',
            description: 'Фигурка богини Акхи, вырезанная из крупного коралла. Пираты верили, что она приносит удачу в морских набегах. Найдена на затонувшем корабле.'
        },
        {
            id: 'copper-ingot',
            name: 'Медный слиток',
            origin: 'Рудники Киммерии',
            era: 'ок. 1000 г. Э.О.',
            emoji: '🟫',
            category: 'Экономика',
            description: 'Стандартный слиток меди — валюта древнего Марса. Использовался как платёжное средство до введения таланта в 2700 г. Э.О.'
        }
    ];

    // ============================================================
    // 🎨 РЕНДЕР
    // ============================================================
    const gallery = document.getElementById('gallery');
    const filtersEl = document.getElementById('filters');
    const modal = document.getElementById('modal');

    const categories = ['Все', ...new Set(ARTIFACTS.map(a => a.category))];
    let activeCat = 'Все';

    function renderFilters() {
        filtersEl.innerHTML = categories.map(c =>
            `<button class="filter-btn ${c === activeCat ? 'active' : ''}" data-cat="${c}">${c}</button>`
        ).join('');
        filtersEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.onclick = () => {
                activeCat = btn.dataset.cat;
                renderFilters();
                renderGallery();
            };
        });
    }

    function renderGallery() {
        const list = activeCat === 'Все'
            ? ARTIFACTS
            : ARTIFACTS.filter(a => a.category === activeCat);

        gallery.innerHTML = list.map(a => `
            <div class="artifact-card" data-id="${a.id}">
                <span class="artifact-emoji">${a.emoji}</span>
                <h3 class="artifact-name">${a.name}</h3>
                <div class="artifact-origin">${a.origin}</div>
                <div class="artifact-era">${a.era}</div>
            </div>
        `).join('');

        gallery.querySelectorAll('.artifact-card').forEach(card => {
            card.onclick = () => openDetail(card.dataset.id);
        });
    }

    function openDetail(id) {
        const a = ARTIFACTS.find(x => x.id === id);
        if (!a) return;

        modal.innerHTML = `
            <div class="artifact-detail">
                <button class="artifact-detail-close" aria-label="Закрыть">✕</button>
                <h2>${a.name}</h2>
                <div class="detail-origin">${a.origin}</div>
                <span class="detail-emoji">${a.emoji}</span>
                <div class="detail-text">${a.description}</div>
                <div class="detail-meta">
                    <strong>Категория:</strong> ${a.category} &nbsp;·&nbsp;
                    <strong>Датировка:</strong> ${a.era}
                </div>
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        modal.querySelector('.artifact-detail-close').onclick = closeDetail;
        modal.onclick = (e) => { if (e.target === modal) closeDetail(); };
        document.addEventListener('keydown', onEsc, { once: true });
    }

    function onEsc(e) {
        if (e.key === 'Escape') closeDetail();
    }

    function closeDetail() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    renderFilters();
    renderGallery();

    console.log('🏛️ Музей загружен. Артефактов: ' + ARTIFACTS.length);
})();
</script>
