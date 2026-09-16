# Категории статей

На этой странице собраны все статьи Марсианской энциклопедии, сгруппированные по категориям.

<div id="categories-container">
  <p style="color:#888;">Загрузка категорий...</p>
</div>

<script>
(function() {
  var CATEGORY_MAP = {
    'history': 'История',
    'geography': 'География',
    'astronomy': 'Астрономия',
    'people': 'Персоналии',
    'mythology': 'Мифология',
    'biology': 'Биология',
    'terms': 'Термины',
    'books': 'Книги',
    'lists': 'Избранные списки',
    'science': 'Наука',
    'game': 'Игра',
    'periodization': 'Периодизация',
    'timeline': 'Хронология',
    'epokha-osnovaniya': 'Эпоха Основания',
    'epokha-rascveta': 'Эпоха Расцвета',
    'epokha-umiraniya': 'Эпоха Умирания',
    'iskhod': 'Исход',
    'pirate-kingdom': 'Пиратское королевство',
    'myths': 'Мифы и легенды',
    'edem': 'Эдем',
    'arkadia-history': 'Аркадия',
    'serpentida-history': 'Серпентида',
    'hellas-history': 'Эллада',
    'kimeria-history': 'Кимерия',
    'eritrea-history': 'Эритрея',
    'utopia-history': 'Утопия',
    'eridania-history': 'Эридания',
    'khong-history': 'Кхонг',
    'avsonia-history': 'Авсония',
    'acidalia-sea': 'Ацидалийское море',
    'okhasen': 'Окхасен',
    'rogen-aria': 'Роген-Ария',
    'farsida': 'Фарсида',
    'farsida-caves': 'Пещеры Фарсиды',
    'ksanf-river': 'Река Ксанф',
    'eritreya': 'Эритрея',
    'utopiya': 'Утопия',
    'tarsis': 'Тарсис',
    'noviy-okhasen': 'Новый Окхасен',
    'akademiya-okhasena': 'Академия Окхасена',
    'mars-sky': 'Небо Марса',
    'phobos-deimos': 'Фобос и Деймос',
    'earth': 'Земля',
    'earth-as-target': 'Земля как цель',
    'hevsur': 'Хевсур',
    'talin': 'Талин',
    'ella': 'Элла',
    'yarra': 'Йарра',
    'alira': 'Алира',
    'aratan-iii': 'Аратан III',
    'irayina': 'Ирайна',
    'miran': 'Миран',
    'kharan': 'Харан',
    'soviya': 'Совия',
    'arash': 'Араш',
    'kan': 'Кан',
    'eden-kings': 'Короли Эдема',
    'ksanf-pirates': 'Пиратские короли Ксанфа',
    'serpentida-kings': 'Короли Серпентиды',
    'hellas-rulers': 'Правители Эллады',
    'arkadia-princes': 'Держатели ветра',
    'utopia-admirals': 'Адмиралы Утопии',
    'khong-masters': 'Мастера Кхонга',
    'great-scribes': 'Великие писцы',
    'lan-sur': 'Lān sur',
    'tablichki': 'Таблички',
    'gemotsianin': 'Гемоцианин',
    'geology': 'Геология',
    'kho': 'Кхо',
    'akha': 'Акха',
    'araksis': 'Араксис',
    'prorochestvo-kharana': 'Пророчество Харана'
  };

  // Заголовки-разделы, которые НЕ являются статьями
  var SKIP_TITLES = [
    'Примечания', 'См. также', 'Ссылки', 'Литература',
    'Источники', 'Комментарии', 'Библиография', 'Gallery',
    'Галерея', 'Сноски', 'Приложение'
  ];

  // Категории верхнего уровня (идут первыми, в этом порядке)
  var TOP_ORDER = [
    'История', 'География', 'Астрономия', 'Персоналии',
    'Мифология', 'Биология', 'Наука', 'Термины',
    'Книги', 'Избранные списки', 'Игра'
  ];

  // ============================================================
  // 1. Загрузка search_index.json
  // ============================================================
  function fetchIndex() {
    var paths = [
      'search/search_index.json',
      '../search/search_index.json',
      '../../search/search_index.json',
      '/search/search_index.json'
    ];
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

  // ============================================================
  // 2. Нормализация: убрать якорь, дедуплицировать
  // ============================================================
  function normalizeLocation(loc) {
    // Убираем всё, что идёт после # — это якорь внутри страницы
    return (loc || '').split('#')[0].replace(/^\//, '').replace(/\/$/, '');
  }

  function isSkipTitle(title) {
    if (!title) return true;
    var t = title.trim();
    for (var i = 0; i < SKIP_TITLES.length; i++) {
      if (t === SKIP_TITLES[i]) return true;
    }
    // Пропускаем заголовки вида "#_1", "#_2" и подобные
    if (/^#?_?\d+$/.test(t)) return true;
    return false;
  }

  // Оставляем только ОДНУ запись на каждую страницу (без якорей)
  function dedupeDocs(docs) {
    var seen = {};
    var result = [];
    docs.forEach(function(doc) {
      var base = normalizeLocation(doc.location);
      if (!base) return;
      if (seen[base]) return;   // уже добавили эту страницу
      seen[base] = true;
      result.push({
        title: doc.title || 'Без названия',
        location: base
      });
    });
    return result;
  }

  // ============================================================
  // 3. Группировка по категориям
  // ============================================================
  function groupDocs(docs) {
    var groups = {};

    docs.forEach(function(doc) {
      // Пропускаем служебные подразделы
      if (isSkipTitle(doc.title)) return;

      var segments = doc.location.split('/').filter(Boolean);
      var addedTo = {};

      segments.forEach(function(seg) {
        var catName = CATEGORY_MAP[seg];
        if (!catName) return;
        if (addedTo[catName]) return;   // не добавляем дважды в одну категорию
        addedTo[catName] = true;

        if (!groups[catName]) groups[catName] = [];
        groups[catName].push({
          title: doc.title,
          location: doc.location
        });
      });
    });

    return groups;
  }

  // ============================================================
  // 4. Отрисовка
  // ============================================================
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

    var html = '';
    names.forEach(function(name) {
      var articles = groups[name];
      if (!articles.length) return;

      // Ищем slug категории (для якоря)
      var slug = '';
      for (var key in CATEGORY_MAP) {
        if (CATEGORY_MAP[key] === name) { slug = key; break; }
      }

      html += '<h2 id="' + slug + '" style="margin-top:36px; padding-bottom:6px; border-bottom:1px solid #d0d0d0;">' + name + '</h2>';
      html += '<ul style="line-height:1.9;">';

      // Сортировка по названию
      articles.sort(function(a, b) { return a.title.localeCompare(b.title); });

      // Дедупликация по названию внутри категории
      var usedTitles = {};
      articles.forEach(function(art) {
        if (usedTitles[art.title]) return;
        usedTitles[art.title] = true;

        var href = 'https://mars-wiki.ru/' + art.location + '/';
        html += '<li><a href="' + href + '">' + art.title + '</a></li>';
      });

      html += '</ul>';
    });

    if (!html) {
      html = '<p style="color:#888;">Пока нет статей с категориями.</p>';
    }

    container.innerHTML = html;
  }

  // ============================================================
  // 5. Запуск
  // ============================================================
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
          container.innerHTML = '<p style="color:#888;">Не удалось загрузить категории. ' + err.message + '</p>';
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
