---
title: 🔍 Сканер дат
comments: false
---

<div id="scanner" style="max-width: 1100px; margin: 0 auto; padding: 0 12px; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;">

<h1>🔍 Сканер марсианских дат</h1>

<p style="color:#666;">Страница читает индекс MkDocs, сканирует все статьи на даты и собирает черновик <code>this-day.json</code>.</p>

<button id="scan-btn" style="padding:14px 28px; font-size:1rem; font-weight:700; background:linear-gradient(135deg,#6C63FF,#A29BFE); color:#fff; border:none; border-radius:30px; cursor:pointer; box-shadow:0 6px 20px rgba(108,99,255,0.4);">▶ Запустить сканирование</button>

<div id="status" style="margin:20px 0; padding:14px; border-radius:10px; background:#f0f0ff; color:#333; display:none;"></div>

<div id="stats" style="display:none; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:12px; margin:20px 0;"></div>

<div id="results" style="display:none;">

  <h2 style="margin-top:32px;">📅 События по датам (для блока «В этот день»)</h2>
  <p style="color:#666; font-size:0.9rem;">Сгруппировано по месяцу и дню. Это пойдёт в <code>this-day.json</code>.</p>
  <div id="by-date"></div>

  <h2 style="margin-top:32px;">📄 Найдено в статьях</h2>
  <p style="color:#666; font-size:0.9rem;">Полный список совпадений — проверь, нет ли ложных.</p>
  <div id="by-article"></div>

  <div style="margin:32px 0; padding:20px; background:#f8f9ff; border:2px dashed #6C63FF; border-radius:12px; text-align:center;">
    <h3 style="margin:0 0 12px 0;">💾 Скачать черновик</h3>
    <button id="download-btn" style="padding:14px 28px; font-size:1rem; font-weight:700; background:linear-gradient(135deg,#27ae60,#2ecc71); color:#fff; border:none; border-radius:30px; cursor:pointer;">⬇ Скачать this-day-draft.json</button>
    <p style="font-size:0.85rem; color:#888; margin:12px 0 0 0;">Файл положи в <code>docs/data/this-day.json</code>. Потом отредактируешь вручную.</p>
  </div>

</div>

</div>

<style>
.sd-table { width:100%; border-collapse:collapse; margin:12px 0; font-size:0.9rem; }
.sd-table th { background:#6C63FF; color:#fff; padding:10px; text-align:left; font-weight:700; }
.sd-table td { padding:9px 10px; border-bottom:1px solid #e5e5e5; vertical-align:top; }
.sd-table tr:hover { background:#f8f9ff; }
.sd-table .date { font-weight:800; color:#6C63FF; white-space:nowrap; }
.sd-table .year { font-weight:700; color:#e74c3c; white-space:nowrap; }
.sd-table .art { font-size:0.8rem; color:#888; }
.sd-table .ctx { color:#333; font-style:italic; }
.sd-group { background:linear-gradient(135deg,#fff,#f8f9ff); border:1px solid #e0e0f0; border-radius:10px; padding:14px 18px; margin-bottom:12px; }
.sd-group-title { font-size:1.05rem; font-weight:800; color:#1a1a2e; margin-bottom:8px; }
.sd-group-title .count { font-size:0.8rem; color:#6C63FF; font-weight:600; margin-left:8px; }
.sd-item { padding:8px 0; border-bottom:1px dashed #e0e0f0; }
.sd-item:last-child { border-bottom:none; }
.sd-item .year { color:#e74c3c; font-weight:800; margin-right:8px; }
.sd-item a { color:#6C63FF; text-decoration:none; }
.sd-item a:hover { text-decoration:underline; }
.sd-item .text { font-size:0.9rem; color:#555; margin-top:2px; }
</style>

<script>
(function() {
  'use strict';

  // ============================================================
  // Месяцы из твоего календаря
  // ============================================================
  const MONTHS = [
    'Ākha-dzen','Kōl-khan','Dzen-ākha','Khōsen','Mar-dzen','Ariya-mar',
    'Zal-ākha','Thal-khō','Kōl-ghar','Mōr-ākha','Dzen-kōl','Xal-mar',
    'Lān-sen','Khō-mōr','Ākha-mōr','Kōl-suf','Dzen-thal','Ghōl-ākha',
    'Rōg-ari','Mar-lān','Ksanf-suf','Yar-okh'
  ];

  // Экранируем для regex
  const M_ESC = MONTHS.map(m => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

  // Форматы дат
  const PATTERNS = [
    // "11-й день Kōl-ghar"
    new RegExp('(\\d{1,2})[\\-\\s]?й?\\s+день\\s+(' + M_ESC + ')', 'giu'),
    // "Kōl-ghar, 11" или "Kōl-ghar 11"
    new RegExp('(' + M_ESC + ')[\\s,]+(\\d{1,2})\\b', 'giu'),
    // "11 Kōl-ghar"
    new RegExp('(\\d{1,2})[\\s,]+(' + M_ESC + ')\\b', 'giu'),
  ];

  // Год
  const YEAR_PAT = /(?:год[ауе]?\s+)?(\d{1,10})\s*(?:г\.|год[ауе]?|Э\.О\.)/giu;

  // ============================================================
  // Загрузка индекса
  // ============================================================
  async function loadIndex() {
    // Пробуем разные пути (работает для любого site_url)
    const paths = [
      '/search/search_index.json',
      '../search/search_index.json',
      '../../search/search_index.json',
      'search/search_index.json',
    ];
    for (const p of paths) {
      try {
        const r = await fetch(p);
        if (r.ok) {
          const j = await r.json();
          if (j && j.docs) return j;
        }
      } catch(e) {}
    }
    throw new Error('Не нашёл search_index.json. Проверь, что сайт собран (search включён в mkdocs.yml).');
  }

  // ============================================================
  // Нормализация месяца (регистр)
  // ============================================================
  function normMonth(m) {
    for (const name of MONTHS) {
      if (name.toLowerCase() === m.toLowerCase()) return name;
    }
    return m;
  }

  // ============================================================
  // Извлечь контекст вокруг совпадения
  // ============================================================
  function context(text, index, len) {
    const start = Math.max(0, index - 80);
    const end = Math.min(text.length, index + len + 80);
    let ctx = text.substring(start, end).replace(/\s+/g, ' ').trim();
    if (start > 0) ctx = '…' + ctx;
    if (end < text.length) ctx = ctx + '…';
    return ctx;
  }

  // ============================================================
  // Сканирование одной статьи
  // ============================================================
  function scanArticle(doc) {
    const text = (doc.text || '') + ' ' + (doc.title || '');
    const results = [];

    PATTERNS.forEach((pat, patIdx) => {
      pat.lastIndex = 0;
      let m;
      while ((m = pat.exec(text)) !== null) {
        let day, month;
        if (patIdx === 0) {          // "11-й день Kōl-ghar"
          day = parseInt(m[1], 10);
          month = normMonth(m[2]);
        } else if (patIdx === 1) {   // "Kōl-ghar 11"
          month = normMonth(m[1]);
          day = parseInt(m[2], 10);
        } else {                     // "11 Kōl-ghar"
          day = parseInt(m[1], 10);
          month = normMonth(m[2]);
        }

        // Проверка на разумность
        if (day < 1 || day > 33) continue;

        // Ищем год рядом (в радиусе 150 символов)
        const near = text.substring(Math.max(0, m.index - 150), Math.min(text.length, m.index + 200));
        YEAR_PAT.lastIndex = 0;
        const ym = YEAR_PAT.exec(near);
        const year = ym ? parseInt(ym[1], 10) : null;

        results.push({
          month, day, year,
          title: doc.title || '',
          location: doc.location || '',
          context: context(text, m.index, m[0].length),
        });
      }
    });

    // Убираем дубли (одна дата — несколько паттернов)
    const seen = new Set();
    return results.filter(r => {
      const k = r.month + '|' + r.day + '|' + r.year + '|' + r.location;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  // ============================================================
  // Главный обработчик
  // ============================================================
  async function run() {
    const status = document.getElementById('status');
    const stats = document.getElementById('stats');
    const results = document.getElementById('results');

    status.style.display = 'block';
    status.textContent = '⏳ Загружаю индекс статей…';
    results.style.display = 'none';

    try {
      const index = await loadIndex();
      status.textContent = '📚 Найдено статей: ' + index.docs.length + '. Сканирую…';

      const allMatches = [];
      const byDate = {};

      index.docs.forEach(doc => {
        const found = scanArticle(doc);
        found.forEach(f => {
          allMatches.push(f);
          const key = f.month + '|' + f.day;
          if (!byDate[key]) byDate[key] = [];
          byDate[key].push(f);
        });
      });

      // === Статистика ===
      stats.style.display = 'grid';
      stats.innerHTML = `
        <div style="padding:14px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border-radius:10px;text-align:center;">
          <div style="font-size:0.8rem;opacity:0.8;">Статей</div>
          <div style="font-size:1.8rem;font-weight:900;">${index.docs.length}</div>
        </div>
        <div style="padding:14px;background:linear-gradient(135deg,#27ae60,#2ecc71);color:#fff;border-radius:10px;text-align:center;">
          <div style="font-size:0.8rem;opacity:0.8;">Найдено дат</div>
          <div style="font-size:1.8rem;font-weight:900;">${allMatches.length}</div>
        </div>
        <div style="padding:14px;background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;border-radius:10px;text-align:center;">
          <div style="font-size:0.8rem;opacity:0.8;">Уникальных дней</div>
          <div style="font-size:1.8rem;font-weight:900;">${Object.keys(byDate).length}</div>
        </div>
        <div style="padding:14px;background:linear-gradient(135deg,#f39c12,#e67e22);color:#fff;border-radius:10px;text-align:center;">
          <div style="font-size:0.8rem;opacity:0.8;">С годом</div>
          <div style="font-size:1.8rem;font-weight:900;">${allMatches.filter(m=>m.year).length}</div>
        </div>
      `;

      // === По датам ===
      const byDateEl = document.getElementById('by-date');
      if (Object.keys(byDate).length === 0) {
        byDateEl.innerHTML = '<p style="color:#999;">Ничего не найдено. Проверь формат дат в статьях.</p>';
      } else {
        const sorted = Object.keys(byDate).sort((a, b) => {
          const [ma, da] = a.split('|');
          const [mb, db] = b.split('|');
          const ia = MONTHS.indexOf(ma), ib = MONTHS.indexOf(mb);
          if (ia !== ib) return ia - ib;
          return parseInt(da) - parseInt(db);
        });

        let html = '';
        sorted.forEach(key => {
          const [month, day] = key.split('|');
          const events = byDate[key].sort((a,b) => (a.year||0)-(b.year||0));
          html += `<div class="sd-group">
            <div class="sd-group-title">${day}‑й день ${month}<span class="count">${events.length} соб.</span></div>`;
          events.forEach(ev => {
            html += `<div class="sd-item">
              ${ev.year ? '<span class="year">' + ev.year + ' г.</span>' : '<span class="year">год ?</span>'}
              <a href="/${ev.location.replace(/\/$/, '')}/">${ev.title}</a>
              <div class="text">${ev.context}</div>
            </div>`;
          });
          html += '</div>';
        });
        byDateEl.innerHTML = html;
      }

      // === По статьям ===
      const byArt = {};
      allMatches.forEach(m => {
        const k = m.location;
        if (!byArt[k]) byArt[k] = { title: m.title, location: m.location, items: [] };
        byArt[k].items.push(m);
      });

      const byArtEl = document.getElementById('by-article');
      let artHtml = '<table class="sd-table"><thead><tr><th>Дата</th><th>Год</th><th>Статья</th><th>Контекст</th></tr></thead><tbody>';
      allMatches
        .sort((a,b) => (a.year||0)-(b.year||0))
        .forEach(m => {
          artHtml += `<tr>
            <td class="date">${m.day} ${m.month}</td>
            <td class="year">${m.year || '?'}</td>
            <td><a href="/${m.location.replace(/\/$/,'')}/">${m.title}</a><div class="art">${m.location}</div></td>
            <td class="ctx">${m.context}</td>
          </tr>`;
        });
      artHtml += '</tbody></table>';
      byArtEl.innerHTML = artHtml;

      // === Сохраняем для скачивания ===
      window.__scanResult = { allMatches, byDate, byArt };

      results.style.display = 'block';
      status.style.background = '#e8f5e9';
      status.innerHTML = '✅ Готово! Найдено <strong>' + allMatches.length + '</strong> дат в <strong>' + Object.keys(byArt).length + '</strong> статьях.';

    } catch (err) {
      status.style.background = '#fdecea';
      status.innerHTML = '❌ Ошибка: ' + err.message;
      console.error(err);
    }
  }

  // ============================================================
  // Скачивание JSON для this-day.json
  // ============================================================
  function download() {
    const r = window.__scanResult;
    if (!r) return;

    // Формируем JSON в формате this-day.json
    const out = [];
    Object.keys(r.byDate).forEach(key => {
      const [month, day] = key.split('|');
      r.byDate[key].forEach(ev => {
        out.push({
          month: month,
          day: parseInt(day, 10),
          year: ev.year || null,
          title: ev.title,
          text: ev.context,  // ← черновой текст, потом отредактируешь
          link: '/' + ev.location.replace(/\/$/, '') + '/',
          _source: ev.location,   // подсказка, откуда взято (потом удалишь)
        });
      });
    });

    out.sort((a,b) => {
      const ia = MONTHS.indexOf(a.month), ib = MONTHS.indexOf(b.month);
      if (ia !== ib) return ia - ib;
      if (a.day !== b.day) return a.day - b.day;
      return (a.year||0)-(b.year||0);
    });

    const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'this-day-draft.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  document.getElementById('scan-btn').onclick = run;
  document.getElementById('download-btn').onclick = download;
})();
</script>
