<div class="categories-page">

<div class="categories-hero">
  <div class="categories-hero-content">
    <h1>Категории статей</h1>
    <p>Все материалы Марсианской энциклопедии, собранные по разделам</p>
  </div>
  <div class="categories-hero-stats" id="cat-stats">
    <div class="stat-item">
      <span class="stat-value" id="stat-articles">—</span>
      <span class="stat-label">статей</span>
    </div>
    <div class="stat-item">
      <span class="stat-value" id="stat-categories">—</span>
      <span class="stat-label">категорий</span>
    </div>
  </div>
</div>

<div id="categories-container">
  <div class="categories-loading">
    <div class="loading-spinner"></div>
    <p>Загрузка категорий...</p>
  </div>
</div>

</div>

<style>
/* ============================================
   СТРАНИЦА КАТЕГОРИЙ — VIP-ДИЗАЙН
   ============================================ */

.categories-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 8px;
}

/* --- Hero --- */
.categories-hero {
  position: relative;
  padding: 48px 40px;
  margin: 0 0 48px 0;
  border-radius: 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 40%, #4a2a3a 100%);
  box-shadow: 0 20px 60px -20px rgba(108, 99, 255, 0.4);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
}

.categories-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(162, 155, 254, 0.25) 0%, transparent 70%);
  pointer-events: none;
}

.categories-hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(231, 76, 60, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.categories-hero-content {
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 240px;
}

.categories-hero-content h1 {
  margin: 0 0 12px 0;
  font-family: 'Georgia', serif;
  font-size: 2.4rem;
  font-weight: 400;
  color: #ffffff !important;
  letter-spacing: 1px;
  line-height: 1.15;
  border: none;
  padding: 0;
}

.categories-hero-content p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7) !important;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

.categories-hero-stats {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 40px;
}

.stat-item {
  text-align: center;
  min-width: 80px;
}

.stat-value {
  display: block;
  font-family: 'Georgia', serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: #A29BFE;
  line-height: 1;
  letter-spacing: -1px;
}

.stat-label {
  display: block;
  margin-top: 6px;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* --- Загрузка --- */
.categories-loading {
  text-align: center;
  padding: 80px 20px;
}

.loading-spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid rgba(108, 99, 255, 0.15);
  border-top-color: #6C63FF;
  border-radius: 50%;
  animation: catSpin 0.8s linear infinite;
}

@keyframes catSpin {
  to { transform: rotate(360deg); }
}

.categories-loading p {
  margin-top: 16px;
  color: #888;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* --- Сетка категорий --- */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* --- Карточка категории --- */
.category-card {
  position: relative;
  padding: 24px 26px;
  background: #ffffff;
  border: 1px solid #e5e5ec;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  opacity: 0;
  transform: translateY(16px);
  animation: catCardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #6C63FF, #A29BFE);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: #c8c2ff;
  box-shadow: 0 16px 40px -12px rgba(108, 99, 255, 0.25);
}

.category-card:hover::before {
  transform: scaleY(1);
}

@keyframes catCardIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-card-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px dashed #e5e5ec;
  gap: 12px;
}

.category-card-title {
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e !important;
  margin: 0;
  letter-spacing: 0.3px;
  line-height: 1.2;
}

.category-card-count {
  flex-shrink: 0;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: #6C63FF;
  background: rgba(108, 99, 255, 0.08);
  padding: 4px 10px;
  border-radius: 12px;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.category-card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.category-card-list li {
  margin: 0;
  padding: 0;
}

.category-card-list a {
  display: block;
  padding: 7px 10px 7px 14px;
  color: #333 !important;
  text-decoration: none !important;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.92rem;
  line-height: 1.4;
  border-radius: 8px;
  position: relative;
  transition: all 0.2s;
  border-left: 2px solid transparent;
}

.category-card-list a::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background: #c8c2ff;
  border-radius: 50%;
  transition: all 0.25s;
}

.category-card-list a:hover {
  background: rgba(108, 99, 255, 0.06);
  color: #6C63FF !important;
  border-left-color: #6C63FF;
  padding-left: 18px;
}

.category-card-list a:hover::before {
  background: #6C63FF;
  transform: translateY(-50%) scale(1.5);
}

/* Пустое состояние */
.categories-empty {
  text-align: center;
  padding: 60px 20px;
  background: #f8f8fc;
  border-radius: 16px;
  border: 2px dashed #e5e5ec;
  color: #888;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* ============================================
   ТЁМНАЯ ТЕМА
   ============================================ */
html body.mars-stars-on .categories-hero {
  background: linear-gradient(135deg, #0f0f1e 0%, #1e1030 40%, #2a1525 100%);
  box-shadow: 0 20px 60px -20px rgba(162, 155, 254, 0.35);
}

html body.mars-stars-on .category-card {
  background: rgba(20, 15, 35, 0.55);
  border-color: rgba(162, 155, 254, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

html body.mars-stars-on .category-card:hover {
  border-color: rgba(162, 155, 254, 0.6);
  box-shadow: 0 16px 40px -12px rgba(162, 155, 254, 0.35);
}

html body.mars-stars-on .category-card-header {
  border-bottom-color: rgba(162, 155, 254, 0.2);
}

html body.mars-stars-on .category-card-title {
  color: #ffffff !important;
}

html body.mars-stars-on .category-card-count {
  color: #A29BFE;
  background: rgba(162, 155, 254, 0.15);
}

html body.mars-stars-on .category-card-list a {
  color: #d0cfff !important;
}

html body.mars-stars-on .category-card-list a:hover {
  background: rgba(162, 155, 254, 0.15);
  color: #ffffff !important;
  border-left-color: #A29BFE;
}

html body.mars-stars-on .category-card-list a::before {
  background: rgba(162, 155, 254, 0.5);
}

html body.mars-stars-on .category-card-list a:hover::before {
  background: #A29BFE;
}

html body.mars-stars-on .categories-empty {
  background: rgba(20, 15, 35, 0.4);
  border-color: rgba(162, 155, 254, 0.3);
  color: #a0a0c0;
}

/* ============================================
   МОБИЛЬНЫЙ
   ============================================ */
@media (max-width: 700px) {
  .categories-hero {
    padding: 32px 24px;
    border-radius: 14px;
    margin-bottom: 32px;
  }
  .categories-hero-content h1 {
    font-size: 1.7rem;
  }
  .categories-hero-content p {
    font-size: 0.9rem;
  }
  .categories-hero-stats {
    gap: 28px;
  }
  .stat-value {
    font-size: 2rem;
  }
  .stat-label {
    font-size: 0.7rem;
  }
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .category-card {
    padding: 20px 20px;
    border-radius: 14px;
  }
  .category-card-title {
    font-size: 1.1rem;
  }
}
</style>

<script>
(function() {
  var CATEGORY_MAP = {
    'history': 'История', 'geography': 'География', 'astronomy': 'Астрономия',
    'people': 'Персоналии', 'mythology': 'Мифология', 'biology': 'Биология',
    'terms': 'Термины', 'books': 'Книги', 'lists': 'Избранные списки',
    'science': 'Наука', 'game': 'Игра',
    'periodization': 'Периодизация', 'timeline': 'Хронология',
    'epokha-osnovaniya': 'Эпоха Основания', 'epokha-rascveta': 'Эпоха Расцвета',
    'epokha-umiraniya': 'Эпоха Умирания', 'iskhod': 'Исход',
    'pirate-kingdom': 'Пиратское королевство', 'myths': 'Мифы и легенды',
    'edem': 'Эдем', 'arkadia-history': 'Аркадия', 'serpentida-history': 'Серпентида',
    'hellas-history': 'Эллада', 'kimeria-history': 'Кимерия',
    'eritrea-history': 'Эритрея', 'utopia-history': 'Утопия',
    'eridania-history': 'Эридания', 'khong-history': 'Кхонг', 'avsonia-history': 'Авсония',
    'acidalia-sea': 'Ацидалийское море', 'okhasen': 'Окхасен',
    'rogen-aria': 'Роген-Ария', 'farsida': 'Фарсида', 'farsida-caves': 'Пещеры Фарсиды',
    'ksanf-river': 'Река Ксанф', 'eritreya': 'Эритрея', 'utopiya': 'Утопия',
    'tarsis': 'Тарсис', 'noviy-okhasen': 'Новый Окхасен',
    'akademiya-okhasena': 'Академия Окхасена',
    'mars-sky': 'Небо Марса', 'phobos-deimos': 'Фобос и Деймос',
    'earth': 'Земля', 'earth-as-target': 'Земля как цель',
    'hevsur': 'Хевсур', 'talin': 'Талин', 'ella': 'Элла', 'yarra': 'Йарра',
    'alira': 'Алира', 'aratan-iii': 'Аратан III', 'irayina': 'Ирайна',
    'miran': 'Миран', 'kharan': 'Харан', 'soviya': 'Совия', 'arash': 'Араш', 'kan': 'Кан',
    'eden-kings': 'Короли Эдема', 'ksanf-pirates': 'Пиратские короли Ксанфа',
    'serpentida-kings': 'Короли Серпентиды', 'hellas-rulers': 'Правители Эллады',
    'arkadia-princes': 'Держатели ветра', 'utopia-admirals': 'Адмиралы Утопии',
    'khong-masters': 'Мастера Кхонга', 'great-scribes': 'Великие писцы',
    'lan-sur': 'Lān sur', 'tablichki': 'Таблички', 'gemotsianin': 'Гемоцианин',
    'geology': 'Геология', 'kho': 'Кхо', 'akha': 'Акха',
    'araksis': 'Араксис', 'prorochestvo-kharana': 'Пророчество Харана'
  };

  var SKIP_TITLES = ['Примечания', 'См. также', 'Ссылки', 'Литература',
                     'Источники', 'Комментарии', 'Библиография', 'Gallery',
                     'Галерея', 'Сноски', 'Приложение'];

  var TOP_ORDER = ['История', 'География', 'Астрономия', 'Персоналии',
                   'Мифология', 'Биология', 'Наука', 'Термины',
                   'Книги', 'Избранные списки', 'Игра'];

  function fetchIndex() {
    var paths = ['search/search_index.json', '../search/search_index.json',
                 '../../search/search_index.json', '/search/search_index.json'];
    var i = 0;
    function tryNext() {
      if (i >= paths.length) return Promise.reject(new Error('Не найден search_index.json'));
      return fetch(paths[i++]).then(function(r) {
        if (r.ok) return r.json();
        return tryNext();
      }).catch(tryNext);
    }
    return tryNext();
  }

  function normalizeLocation(loc) {
    return (loc || '').split('#')[0].replace(/^\//, '').replace(/\/$/, '');
  }

  function isSkipTitle(title) {
    if (!title) return true;
    var t = title.trim();
    for (var i = 0; i < SKIP_TITLES.length; i++) {
      if (t === SKIP_TITLES[i]) return true;
    }
    if (/^#?_?\d+$/.test(t)) return true;
    return false;
  }

  function dedupeDocs(docs) {
    var seen = {};
    var result = [];
    docs.forEach(function(doc) {
      var base = normalizeLocation(doc.location);
      if (!base) return;
      if (seen[base]) return;
      seen[base] = true;
      result.push({ title: doc.title || 'Без названия', location: base });
    });
    return result;
  }

  function groupDocs(docs) {
    var groups = {};
    docs.forEach(function(doc) {
      if (isSkipTitle(doc.title)) return;
      var segments = doc.location.split('/').filter(Boolean);
      var addedTo = {};
      segments.forEach(function(seg) {
        var catName = CATEGORY_MAP[seg];
        if (!catName) return;
        if (addedTo[catName]) return;
        addedTo[catName] = true;
        if (!groups[catName]) groups[catName] = [];
        groups[catName].push({ title: doc.title, location: doc.location });
      });
    });
    return groups;
  }

  function render(groups) {
    var container = document.getElementById('categories-container');
    if (!container) return;

    var names = Object.keys(groups);
    names.sort(function(a, b) {
      var ia = TOP_ORDER.indexOf(a);
      var ib = TOP_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });

    var totalArticles = 0;
    var html = '<div class="categories-grid">';

    names.forEach(function(name, idx) {
      var articles = groups[name];
      if (!articles.length) return;

      // Дедупликация по названию
      var seenTitles = {};
      var unique = [];
      articles.forEach(function(a) {
        if (seenTitles[a.title]) return;
        seenTitles[a.title] = true;
        unique.push(a);
      });
      unique.sort(function(a, b) { return a.title.localeCompare(b.title); });
      totalArticles += unique.length;

      html += '<div class="category-card" style="animation-delay:' + (idx * 0.06) + 's;">';
      html += '<div class="category-card-header">';
      html += '<h3 class="category-card-title">' + name + '</h3>';
      html += '<span class="category-card-count">' + unique.length + '</span>';
      html += '</div>';
      html += '<ul class="category-card-list">';
      unique.forEach(function(art) {
        var href = 'https://mars-wiki.ru/' + art.location + '/';
        html += '<li><a href="' + href + '">' + art.title + '</a></li>';
      });
      html += '</ul></div>';
    });

    html += '</div>';

    if (totalArticles === 0) {
      html = '<div class="categories-empty">Пока нет статей с категориями.</div>';
    }

    container.innerHTML = html;

    // Обновляем статистику в hero
    var statArticles = document.getElementById('stat-articles');
    var statCategories = document.getElementById('stat-categories');
    if (statArticles) statArticles.textContent = totalArticles;
    if (statCategories) statCategories.textContent = names.length;
  }

  function run() {
    fetchIndex()
      .then(function(data) {
        var docs = dedupeDocs(data.docs || []);
        var groups = groupDocs(docs);
        render(groups);
      })
      .catch(function(err) {
        var container = document.getElementById('categories-container');
        if (container) {
          container.innerHTML = '<div class="categories-empty">Не удалось загрузить категории. ' + err.message + '</div>';
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
</script>
