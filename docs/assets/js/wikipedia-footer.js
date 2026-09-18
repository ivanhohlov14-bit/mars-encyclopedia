// ============================================================
// wikipedia-footer.js — VIP-футер всегда в самом низу статьи
// ============================================================

(function() {
    'use strict';

    var CONFIG = {
        siteName: 'Марсианская энциклопедия',

        licenseNote:
            'Материалы «Марсианской энциклопедии» доступны по лицензии ' +
            '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru" target="_blank" rel="noopener">' +
            'Creative Commons «Attribution-NonCommercial-NoDerivs» (BY-NC-ND) 4.0</a>. ' +
            'Отдельные элементы могут иметь собственные условия использования — ' +
            'подробнее см. <a href="/license/">Условия использования</a>.',

        brandNote:
            '<strong>Марсианская энциклопедия</strong>® — научно-художественный справочный проект ' +
            'по вселенной цикла романов <em>«Письмо из Красной пыли»</em>. ' +
            'Реконструкция истории Марса в Эпоху Умирания, основанная на научных данных ' +
            'и художественной концепции автора.',

        links: [
            { text: 'Политика конфиденциальности', href: '/privacy/' },
            { text: 'Описание проекта', href: '/about/' },
            { text: 'Связаться с нами', href: '/contact/' },
            { text: 'Кодекс поведения', href: '/code-of-conduct/' },
            { text: 'Статистика', href: '/statistics/' }
        ],

        // ⚠️ ВАЖНО: контейнер, внутри которого будет футер
        // Футер всегда ставится в КОНЕЦ этого контейнера
        contentSelectors: [
            '.md-content__inner',
            '.rst-content',
            '.wy-nav-content',
            'article',
            '.document',
            'main'
        ],

        skipPages: ['/secret/', '/secret-2/', '/login/', '/profile/', '/moderation/'],

        showBackToTop: true
    };

    var path = window.location.pathname;
    for (var i = 0; i < CONFIG.skipPages.length; i++) {
        if (path.indexOf(CONFIG.skipPages[i]) === 0) return;
    }

    var STYLES = [
        '.wiki-footer {',
        '  position: relative;',
        '  margin: 64px 0 32px 0;',
        '  padding: 32px 36px 28px;',
        '  background: linear-gradient(135deg, #f8f8fc 0%, #eef0ff 50%, #f8f4ff 100%);',
        '  border: 1px solid #e0e0f0;',
        '  border-radius: 20px;',
        '  font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
        '  font-size: 0.88rem;',
        '  line-height: 1.7;',
        '  color: #555;',
        '  box-shadow: 0 4px 24px rgba(108, 99, 255, 0.06);',
        '  overflow: hidden;',
        '  animation: wikiFooterIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;',
        '  clear: both;',
        '  width: 100%;',
        '  box-sizing: border-box;',
        '}',

        '.wiki-footer::before {',
        '  content: "";',
        '  position: absolute;',
        '  top: 0; left: 0; right: 0;',
        '  height: 4px;',
        '  background: linear-gradient(90deg, #6C63FF 0%, #A29BFE 50%, #f39c12 100%);',
        '  border-radius: 20px 20px 0 0;',
        '}',

        '.wiki-footer::after {',
        '  content: "";',
        '  position: absolute;',
        '  top: -50%; right: -10%;',
        '  width: 400px; height: 400px;',
        '  background: radial-gradient(circle, rgba(108,99,255,0.08), transparent 70%);',
        '  pointer-events: none;',
        '}',

        '@keyframes wikiFooterIn {',
        '  from { opacity: 0; transform: translateY(24px); }',
        '  to { opacity: 1; transform: translateY(0); }',
        '}',

        '.wiki-footer p {',
        '  position: relative;',
        '  z-index: 1;',
        '  margin: 0 0 14px 0;',
        '  color: #666;',
        '  line-height: 1.75;',
        '}',

        '.wiki-footer-brand {',
        '  padding-bottom: 16px;',
        '  margin-bottom: 18px !important;',
        '  border-bottom: 1px dashed #d8d8e8;',
        '  color: #444 !important;',
        '}',

        '.wiki-footer-brand strong { color: #1a1a2e; font-weight: 800; }',
        '.wiki-footer-brand em { color: #6C63FF; font-style: italic; font-weight: 600; }',

        '.wiki-footer a {',
        '  color: #6C63FF;',
        '  text-decoration: none;',
        '  font-weight: 600;',
        '  border-bottom: 1px solid transparent;',
        '  transition: all 0.2s;',
        '}',

        '.wiki-footer a:hover {',
        '  border-bottom-color: #6C63FF;',
        '  color: #4a3fd9;',
        '}',

        '.wiki-footer-links {',
        '  position: relative;',
        '  z-index: 1;',
        '  display: flex;',
        '  flex-wrap: wrap;',
        '  gap: 8px;',
        '  align-items: center;',
        '  padding-top: 18px;',
        '  margin-top: 4px;',
        '  border-top: 1px dashed #d8d8e8;',
        '}',

        '.wiki-footer-links a {',
        '  display: inline-block;',
        '  padding: 8px 16px;',
        '  background: rgba(108, 99, 255, 0.06);',
        '  border: 1px solid rgba(108, 99, 255, 0.15);',
        '  border-radius: 20px;',
        '  color: #4a3fd9 !important;',
        '  font-size: 0.85rem;',
        '  font-weight: 600;',
        '  text-decoration: none;',
        '  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);',
        '  border-bottom: none !important;',
        '}',

        '.wiki-footer-links a:hover {',
        '  background: rgba(108, 99, 255, 0.18);',
        '  border-color: #6C63FF;',
        '  color: #2a1fb9 !important;',
        '  transform: translateY(-2px);',
        '  box-shadow: 0 6px 16px -4px rgba(108, 99, 255, 0.35);',
        '}',

        '.wiki-back-to-top {',
        '  position: fixed;',
        '  bottom: 30px;',
        '  right: 30px;',
        '  width: 52px; height: 52px;',
        '  background: linear-gradient(135deg, #6C63FF, #A29BFE);',
        '  color: #fff;',
        '  border: none;',
        '  border-radius: 50%;',
        '  font-size: 1.4rem;',
        '  cursor: pointer;',
        '  box-shadow: 0 12px 32px -8px rgba(108, 99, 255, 0.5);',
        '  z-index: 9999;',
        '  opacity: 0;',
        '  visibility: hidden;',
        '  transform: translateY(20px);',
        '  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);',
        '  display: flex;',
        '  align-items: center;',
        '  justify-content: center;',
        '  font-family: inherit;',
        '}',

        '.wiki-back-to-top.visible {',
        '  opacity: 1;',
        '  visibility: visible;',
        '  transform: translateY(0);',
        '}',

        '.wiki-back-to-top:hover {',
        '  transform: translateY(-4px) scale(1.08);',
        '  box-shadow: 0 16px 40px -8px rgba(108, 99, 255, 0.7);',
        '}',

        'html body.mars-stars-on .wiki-footer {',
        '  background: rgba(20, 15, 35, 0.6) !important;',
        '  border-color: rgba(162, 155, 254, 0.25) !important;',
        '  color: #b8b8d4 !important;',
        '  backdrop-filter: blur(12px);',
        '  -webkit-backdrop-filter: blur(12px);',
        '  box-shadow: 0 4px 32px rgba(108, 99, 255, 0.15);',
        '}',

        'html body.mars-stars-on .wiki-footer p { color: #b8b8d4 !important; }',
        'html body.mars-stars-on .wiki-footer-brand { color: #d4d4e8 !important; border-bottom-color: rgba(162,155,254,0.2) !important; }',
        'html body.mars-stars-on .wiki-footer-brand strong { color: #fff !important; }',
        'html body.mars-stars-on .wiki-footer-brand em { color: #A29BFE !important; }',
        'html body.mars-stars-on .wiki-footer a { color: #A29BFE !important; }',
        'html body.mars-stars-on .wiki-footer a:hover { border-bottom-color: #A29BFE !important; color: #fff !important; }',
        'html body.mars-stars-on .wiki-footer-links { border-top-color: rgba(162,155,254,0.2) !important; }',
        'html body.mars-stars-on .wiki-footer-links a {',
        '  background: rgba(108, 99, 255, 0.15) !important;',
        '  border-color: rgba(162, 155, 254, 0.35) !important;',
        '  color: #d0cfff !important;',
        '}',
        'html body.mars-stars-on .wiki-footer-links a:hover {',
        '  background: rgba(108, 99, 255, 0.3) !important;',
        '  border-color: #A29BFE !important;',
        '  color: #fff !important;',
        '  box-shadow: 0 6px 20px -4px rgba(162, 155, 254, 0.5);',
        '}',
        'html body.mars-stars-on .wiki-back-to-top {',
        '  background: linear-gradient(135deg, #A29BFE, #6C63FF);',
        '  box-shadow: 0 12px 32px -8px rgba(162, 155, 254, 0.6);',
        '}',

        '@media (max-width: 600px) {',
        '  .wiki-footer { padding: 24px 20px 20px; margin: 40px 0 24px 0; border-radius: 14px; }',
        '  .wiki-footer-links a { padding: 6px 12px; font-size: 0.78rem; }',
        '  .wiki-back-to-top { width: 46px; height: 46px; bottom: 20px; right: 20px; font-size: 1.2rem; }',
        '}'
    ].join('\n');

    // ============================================================
    // СОЗДАНИЕ ФУТЕРА
    // ============================================================
    function createFooter() {
        var footer = document.createElement('div');
        footer.className = 'wiki-footer';
        footer.id = 'wiki-footer-block';
        footer.setAttribute('role', 'contentinfo');

        var html = '';

        if (CONFIG.licenseNote) {
            html += '<p>' + CONFIG.licenseNote + '</p>';
        }

        if (CONFIG.brandNote) {
            html += '<p class="wiki-footer-brand">' + CONFIG.brandNote + '</p>';
        }

        if (CONFIG.links && CONFIG.links.length) {
            html += '<div class="wiki-footer-links">';
            CONFIG.links.forEach(function(link) {
                html += '<a href="' + link.href + '">' + link.text + '</a>';
            });
            html += '</div>';
        }

        footer.innerHTML = html;
        return footer;
    }

    // ============================================================
    // КНОПКА "НАВЕРХ"
    // ============================================================
    function createBackToTop() {
        if (!CONFIG.showBackToTop) return;
        if (document.getElementById('wiki-back-to-top')) return;

        var btn = document.createElement('button');
        btn.id = 'wiki-back-to-top';
        btn.className = 'wiki-back-to-top';
        btn.setAttribute('aria-label', 'Наверх');
        btn.setAttribute('title', 'Наверх');
        btn.innerHTML = '↑';

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.body.appendChild(btn);

        var lastVisible = false;
        function checkScroll() {
            var visible = window.scrollY > 400;
            if (visible !== lastVisible) {
                lastVisible = visible;
                btn.classList.toggle('visible', visible);
            }
        }
        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
    }

    // ============================================================
    // ИНЖЕКЦИЯ СТИЛЕЙ
    // ============================================================
    function injectStyles() {
        if (document.getElementById('wiki-footer-styles')) return;
        var style = document.createElement('style');
        style.id = 'wiki-footer-styles';
        style.textContent = STYLES;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🔑 НАЙТИ КОНТЕЙНЕР КОНТЕНТА
    // ============================================================
    function findContentContainer() {
        for (var i = 0; i < CONFIG.contentSelectors.length; i++) {
            var el = document.querySelector(CONFIG.contentSelectors[i]);
            if (el) return el;
        }
        return document.body;
    }

    // ============================================================
    // 🔑 ВСТАВИТЬ/ПЕРЕНЕСТИ ФУТЕР В КОНЕЦ КОНТЕЙНЕРА
    // ============================================================
    function placeFooterAtBottom() {
        var container = findContentContainer();
        if (!container) return;

        var footer = document.getElementById('wiki-footer-block');

        // Нет футера — создать и вставить
        if (!footer) {
            footer = createFooter();
            container.appendChild(footer);
            return;
        }

        // Есть футер, но он не последний ребёнок контейнера — переносим в конец
        var lastChild = container.lastElementChild;
        if (lastChild !== footer) {
            // Убираем из старого места
            if (footer.parentNode) footer.parentNode.removeChild(footer);
            // Вставляем в самый конец
            container.appendChild(footer);
        }
    }

    // ============================================================
    // 🔑 MUTATION OBSERVER — следит за изменениями и держит футер внизу
    // ============================================================
    function watchForChanges() {
        var container = findContentContainer();
        if (!container) return;

        var observer = new MutationObserver(function(mutations) {
            // Игнорируем изменения самого футера
            var onlyFooterChanged = true;
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];
                // Если добавили/удалили что-то не связанное с футером — реагируем
                for (var j = 0; j < m.addedNodes.length; j++) {
                    var node = m.addedNodes[j];
                    if (node.nodeType === 1 && !node.classList.contains('wiki-footer')) {
                        onlyFooterChanged = false;
                        break;
                    }
                }
                if (!onlyFooterChanged) break;
            }

            if (!onlyFooterChanged) {
                // Небольшая задержка — чтобы всё догрузилось
                setTimeout(placeFooterAtBottom, 50);
            }
        });

        observer.observe(container, {
            childList: true,
            subtree: false
        });
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        injectStyles();

        // Мгновенная вставка
        placeFooterAtBottom();

        // Через 300 мс
        setTimeout(placeFooterAtBottom, 300);

        // Через 1 сек
        setTimeout(placeFooterAtBottom, 1000);

        // Через 2.5 сек (когда всё догрузилось)
        setTimeout(placeFooterAtBottom, 2500);

        // Через 5 сек (финальная страховка)
        setTimeout(placeFooterAtBottom, 5000);

        // MutationObserver
        setTimeout(watchForChanges, 500);

        // Кнопка "Наверх"
        setTimeout(createBackToTop, 600);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // SPA
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function() {
            setTimeout(function() {
                var old = document.getElementById('wiki-footer-block');
                if (old) old.remove();
                placeFooterAtBottom();
            }, 300);
            setTimeout(placeFooterAtBottom, 1500);
        });
    }

    console.log('📄 wikipedia-footer: активен');
})();
