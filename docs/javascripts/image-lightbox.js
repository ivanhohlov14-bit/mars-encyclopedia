/* ═══════════════════════════════════════════════════════════
   Image Lightbox — Wikipedia-style для MkDocs
   Клик по картинке в статье → полноэкранный просмотр с описанием
   ═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
if (window.__imageLightboxLoaded) return;
window.__imageLightboxLoaded = true;

/* ═══ СОСТОЯНИЕ ═══ */
var state = {
  images: [],      // все картинки статьи
  currentIndex: 0,
  isOpen: false,
  zoomLevel: 1
};

var overlay = null;

/* ═══ ПРОВЕРКА: не трогаем иконки и лого ═══ */
function shouldSkip(img){
  if (!img || !img.src) return true;
  // Пропускаем маленькие иконки
  if (img.naturalWidth && img.naturalWidth < 80) return true;
  if (img.naturalHeight && img.naturalHeight < 80) return true;
  if (img.width && img.width < 80) return true;
  // Пропускаем лого, аватарки и служебные
  if (img.classList.contains('md-logo')) return true;
  if (img.classList.contains('md-avatar')) return true;
  if (img.classList.contains('no-lightbox')) return true;
  if (img.closest('.md-header')) return true;
  if (img.closest('.md-footer')) return true;
  if (img.closest('.md-nav')) return true;
  if (img.closest('.sp-hero, .cm-hero, .mt-hero, .mf-hero, .ml-hero, .md-hero')) return true;
  if (img.closest('.sc-hero')) return true;
  if (img.getAttribute('data-no-lightbox') === 'true') return true;
  return false;
}

/* ═══ СОБИРАЕМ КАРТИНКИ ИЗ СТАТЬИ ═══ */
function collectImages(){
  var content = document.querySelector('.md-content__inner') || document.querySelector('article') || document.body;
  var allImages = content.querySelectorAll('img');
  var result = [];

  allImages.forEach(function(img){
    if (shouldSkip(img)) return;
    result.push({
      src: img.src,
      alt: img.getAttribute('alt') || '',
      title: img.getAttribute('title') || '',
      caption: img.getAttribute('data-caption') || '',
      credit: img.getAttribute('data-credit') || '',
      element: img
    });
  });

  return result;
}

/* ═══ СОЗДАЁМ OVERLAY ═══ */
function createOverlay(){
  var el = document.createElement('div');
  el.className = 'ilb-overlay';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = [
    '<div class="ilb-backdrop"></div>',
    '<div class="ilb-header">',
      '<div class="ilb-counter"><span class="ilb-counter-current">1</span> / <span class="ilb-counter-total">1</span></div>',
      '<button class="ilb-btn ilb-zoom-in" type="button" aria-label="Приблизить" title="Приблизить">🔍+</button>',
      '<button class="ilb-btn ilb-zoom-out" type="button" aria-label="Отдалить" title="Отдалить">🔍−</button>',
      '<button class="ilb-btn ilb-zoom-reset" type="button" aria-label="Сбросить зум" title="Сбросить">↺</button>',
      '<button class="ilb-btn ilb-download" type="button" aria-label="Скачать" title="Скачать">⬇</button>',
      '<button class="ilb-btn ilb-close" type="button" aria-label="Закрыть" title="Закрыть (Esc)">✕</button>',
    '</div>',
    '<div class="ilb-stage">',
      '<button class="ilb-nav ilb-prev" type="button" aria-label="Предыдущее">‹</button>',
      '<div class="ilb-image-wrap">',
        '<img class="ilb-image" src="" alt="">',
      '</div>',
      '<button class="ilb-nav ilb-next" type="button" aria-label="Следующее">›</button>',
    '</div>',
    '<div class="ilb-caption">',
      '<div class="ilb-title"></div>',
      '<div class="ilb-desc"></div>',
      '<div class="ilb-credit"></div>',
    '</div>',
    '<div class="ilb-hint">🖱 Клик по фону — закрыть · ← → — навигация · Esc — выйти</div>'
  ].join('');

  document.body.appendChild(el);
  return el;
}

/* ═══ ОТКРЫТИЕ ═══ */
function openAt(index){
  state.images = collectImages();
  if (!state.images.length) return;
  if (index < 0 || index >= state.images.length) index = 0;
  state.currentIndex = index;
  state.isOpen = true;
  state.zoomLevel = 1;

  if (!overlay) overlay = createOverlay();

  document.body.style.overflow = 'hidden';
  overlay.classList.add('ilb-open');
  overlay.setAttribute('aria-hidden', 'false');

  renderImage();
}

/* ═══ РЕНДЕР КАРТИНКИ ═══ */
function renderImage(){
  var img = state.images[state.currentIndex];
  if (!img || !overlay) return;

  var imgEl = overlay.querySelector('.ilb-image');
  imgEl.src = img.src;
  imgEl.alt = img.alt;
  imgEl.style.transform = 'scale(1)';
  state.zoomLevel = 1;

  // Счётчик
  overlay.querySelector('.ilb-counter-current').textContent = state.currentIndex + 1;
  overlay.querySelector('.ilb-counter-total').textContent = state.images.length;

  // Название и описание
  var titleEl = overlay.querySelector('.ilb-title');
  var descEl = overlay.querySelector('.ilb-desc');
  var creditEl = overlay.querySelector('.ilb-credit');

  // Заголовок: сначала data-caption, потом title, потом alt
  var title = img.caption || img.title || '';
  var desc = img.alt || '';

  if (title){
    titleEl.textContent = title;
    titleEl.style.display = 'block';
  } else {
    titleEl.style.display = 'none';
  }

  if (desc && desc !== title){
    descEl.textContent = desc;
    descEl.style.display = 'block';
  } else {
    descEl.style.display = 'none';
  }

  if (img.credit){
    creditEl.innerHTML = '📷 ' + img.credit;
    creditEl.style.display = 'block';
  } else {
    creditEl.style.display = 'none';
  }

  // Навигация — скрываем если одна картинка
  var prev = overlay.querySelector('.ilb-prev');
  var next = overlay.querySelector('.ilb-next');
  if (state.images.length <= 1){
    prev.style.display = 'none';
    next.style.display = 'none';
  } else {
    prev.style.display = 'flex';
    next.style.display = 'flex';
  }

  // Сброс зума и позиции
  var wrap = overlay.querySelector('.ilb-image-wrap');
  wrap.scrollTop = 0;
  wrap.scrollLeft = 0;
}

/* ═══ ЗАКРЫТИЕ ═══ */
function close(){
  if (!overlay) return;
  state.isOpen = false;
  overlay.classList.remove('ilb-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  state.zoomLevel = 1;
}

/* ═══ НАВИГАЦИЯ ═══ */
function next(){
  if (!state.images.length) return;
  state.currentIndex = (state.currentIndex + 1) % state.images.length;
  renderImage();
}
function prev(){
  if (!state.images.length) return;
  state.currentIndex = (state.currentIndex - 1 + state.images.length) % state.images.length;
  renderImage();
}

/* ═══ ЗУМ ═══ */
function zoomIn(){
  state.zoomLevel = Math.min(state.zoomLevel + 0.5, 5);
  applyZoom();
}
function zoomOut(){
  state.zoomLevel = Math.max(state.zoomLevel - 0.5, 1);
  applyZoom();
}
function zoomReset(){
  state.zoomLevel = 1;
  applyZoom();
}
function applyZoom(){
  if (!overlay) return;
  var imgEl = overlay.querySelector('.ilb-image');
  imgEl.style.transform = 'scale(' + state.zoomLevel + ')';
  imgEl.style.cursor = state.zoomLevel > 1 ? 'zoom-out' : 'zoom-in';
}

/* ═══ ОБРАБОТЧИКИ ═══ */
function bindEvents(){
  // Клик по любой картинке в статье
  document.addEventListener('click', function(e){
    var img = e.target.closest('img');
    if (!img) return;
    if (shouldSkip(img)) return;
    if (state.isOpen) return;

    // Находим индекс этой картинки среди всех
    var images = collectImages();
    var idx = 0;
    for (var i = 0; i < images.length; i++){
      if (images[i].element === img){
        idx = i;
        break;
      }
    }

    e.preventDefault();
    openAt(idx);
  });

  // Клики внутри overlay
  document.addEventListener('click', function(e){
    if (!state.isOpen) return;

    if (e.target.closest('.ilb-close') || e.target.classList.contains('ilb-backdrop')){
      close();
      return;
    }

    if (e.target.closest('.ilb-prev')){
      prev();
      return;
    }
    if (e.target.closest('.ilb-next')){
      next();
      return;
    }

    if (e.target.closest('.ilb-zoom-in')){
      zoomIn();
      return;
    }
    if (e.target.closest('.ilb-zoom-out')){
      zoomOut();
      return;
    }
    if (e.target.closest('.ilb-zoom-reset')){
      zoomReset();
      return;
    }

    if (e.target.closest('.ilb-download')){
      var img = state.images[state.currentIndex];
      if (img){
        var a = document.createElement('a');
        a.href = img.src;
        a.download = img.src.split('/').pop() || 'image';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){ a.remove(); }, 100);
      }
      return;
    }

    // Клик по самой картинке — зум
    if (e.target.classList.contains('ilb-image')){
      if (state.zoomLevel > 1) zoomReset();
      else zoomIn();
      return;
    }
  });

  // Клавиатура
  document.addEventListener('keydown', function(e){
    if (!state.isOpen) return;

    if (e.key === 'Escape'){
      close();
    } else if (e.key === 'ArrowRight'){
      next();
    } else if (e.key === 'ArrowLeft'){
      prev();
    } else if (e.key === '+' || e.key === '='){
      zoomIn();
    } else if (e.key === '-'){
      zoomOut();
    } else if (e.key === '0'){
      zoomReset();
    }
  });

  // Свайпы на мобильных
  var touchStartX = 0;
  var touchStartY = 0;
  var touchStartTime = 0;

  document.addEventListener('touchstart', function(e){
    if (!state.isOpen) return;
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });

  document.addEventListener('touchend', function(e){
    if (!state.isOpen) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    var dt = Date.now() - touchStartTime;

    // Только быстрые свайпы по горизонтали
    if (dt > 500) return;
    if (Math.abs(dx) < 50) return;
    if (Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0) next();
    else prev();
  }, { passive: true });
}

/* ═══ ИНИЦИАЛИЗАЦИЯ ═══ */
function init(){
  bindEvents();
  console.log('🖼️ Image Lightbox загружен');
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
