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

  // Категории верхнего уровня (идут первыми, в этом порядке)
  var TOP_ORDER = [
    'История', 'География', 'Астрономия', 'Персоналии',
    'Мифология', 'Биология', 'Наука', 'Термины',
    'Книги', 'Избранные списки', 'Игра'
  ];

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

  function groupDocs(docs) {
    var groups = {};
    docs.forEach(function(doc) {
      var loc = doc.location || '';
      var segments = loc.split('/').filter(Boolean);
      segments.forEach(function(seg) {
        var catName = CATEGORY_MAP[seg];
        if (!catName) return;
        if (!groups[catName]) groups[catName] = [];
        // Избегаем дублей
        var exists = groups[catName].some(function(d) { return d.location === loc; });
        if (!exists) {
          groups[catName].push({
            title: doc.title || 'Без названия',
            location: loc
          });
        }
      });
    });
    return groups;
  }

  function render(groups) {
    var container = document.getElementById('categories-container');
    if (!container) return;

    // Сортируем категории: сначала верхние, потом остальные по алфавиту
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
      // Якорь из slug — берём первый, который сработал в CATEGORY_MAP
      var slug = '';
      for (var key in CATEGORY_MAP) {
        if (CATEGORY_MAP[key] === name) { slug = key; break; }
      }

      html += '<h2 id="' + slug + '" style="margin-top:32px;">' + name + '</h2>';
      html += '<ul>';
      articles.sort(function(a, b) { return a.title.localeCompare(b.title); });
      articles.forEach(function(art) {
        var href = 'https://mars-wiki.ru/' + art.location.replace(/^\//, '');
        if (href.charAt(href.length - 1) !== '/') href += '/';
        html += '<li><a href="' + href + '">' + art.title + '</a></li>';
      });
      html += '</ul>';
    });

    if (!html) {
      html = '<p style="color:#888;">Пока нет статей с категориями.</p>';
    }

    container.innerHTML = html;
  }

  function run() {
    fetchIndex()
      .then(function(data) {
        var docs = data.docs || [];
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
