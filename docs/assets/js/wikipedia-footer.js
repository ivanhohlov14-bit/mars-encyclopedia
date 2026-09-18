// ============================================================
// wikipedia-footer.js — VIP-футер на всех страницах
// ============================================================

(function() {
    'use strict';

    var CONFIG = {
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

        contentSelectors: [
            '.md-content__inner',
            '.rst-content .section',
            '.rst-content',
            '.wy-nav-content',
            'article',
            '.document',
            'main'
        ],

        // ✅ Оставляем только реально служебные страницы
        // /profile/ УБРАН — футер теперь и там
        skipPages: ['/secret/', '/secret-2/', '/login/', '/signup/']
    };

    var DEFAULT_COLOR = '#3498db'; // голубой по умолчанию
    var STORAGE_KEY = 'mars_kingdom_color';

    // Кэш всех королевств (дублирует данные из профиля)
    var KINGDOM_COLORS = {
        'Аркадия':    '#D4A574',
        'Ксанф':      '#3D3D3D',
        'Эдем':       '#F4A460',
        'Эридания':   '#F5D76E',
        'Кхонг':      '#A9A9A9',
        'Авсония':    '#87CEEB',
        'Кимерия':    '#B19CD9',
        'Серпентида': '#E57373',
        'Эритрей':    '#64B5F6',
        'Утопия':     '#4DD0E1',
        'Эллада':     '#FF8A65',
        'Аливасото':  '#81C784'
    };

    var path = window.location.pathname;
    for (var i = 0; i < CONFIG.skipPages.length; i++) {
        if (path.indexOf(CONFIG.skipPages[i]) === 0) return;
    }

    // ============================================================
    // СТИЛИ
    // ============================================================
    var STYLES = [
        '.wiki-footer {',
        '  position: relative;',
        '  margin: 64px 0 32px 0;',
        '  padding: 32px 36px 28px;',
        // Прозрачный градиент через цвет профиля
        '  background: linear-gradient(135deg,',
        '    rgba(255, 255, 255, 0.55) 0%,',
        '    color-mix(in srgb, var(--kingdom-color, #3498db) 6%, transparent) 40%,',
        '    color-mix(in srgb, var(--kingdom-color, #3498db) 12%, transparent) 100%);',
        '  border: 1px solid color-mix(in srgb, var(--kingdom-color, #3498db) 20%, transparent);',
        '  border-radius: 20px;',
        '  font-family: -apple-system, "Segoe UI", Roboto, sans-serif;',
        '  font-size: 0.88rem;',
        '  line-height: 1.7;',
        '  color: #555;',
        '  box-shadow: 0 4px 24px color-mix(in srgb, var(--kingdom-color, #3498db) 8%, transparent);',
        '  overflow: hidden;',
        '  clear: both;',
        '  width: 100%;',
        '  box-sizing: border-box;',
        '  backdrop-filter: blur(8px);',
        '  -webkit-backdrop-filter: blur(8px);',
        '}',

        '.wiki-footer::before {',
        '  content: "";',
        '  position: absolute;',
        '  top: 0; left: 0; right: 0;',
        '  height: 4px;',
        '  background: linear-gradient(90deg,',
        '    var(--kingdom-color, #3498db) 0%,',
        '    color-mix(in srgb, var(--kingdom-color, #3498db) 50%, #ffffff) 50%,',
        '    var(--kingdom-color, #3498db) 100%);',
        '  border-radius: 20px 20px 0 0;',
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
        '  border-bottom: 1px dashed color-mix(in srgb, var(--kingdom-color, #3498db) 20%, transparent);',
        '  color: #444 !important;',
        '}',

        '.wiki-footer-brand strong { color: #1a1a2e; font-weight: 800; }',
        '.wiki-footer-brand em {',
        '  color: var(--kingdom-color, #3498db);',
        '  font-style: italic;',
        '  font-weight: 600;',
        '}',

        '.wiki-footer a {',
        '  color: var(--kingdom-color, #3498db);',
        '  text-decoration: none;',
        '  font-weight: 600;',
        '  border-bottom: 1px solid transparent;',
        '  transition: all 0.2s;',
        '}',

        '.wiki-footer a:hover {',
        '  border-bottom-color: var(--kingdom-color, #3498db);',
        '  filter: brightness(0.85);',
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
        '  border-top: 1px dashed color-mix(in srgb, var(--kingdom-color, #3498db) 20%, transparent);',
        '}',

        '.wiki-footer-links a {',
        '  display: inline-block;',
        '  padding: 8px 16px;',
        '  background: color-mix(in srgb, var(--kingdom-color, #3498db) 8%, transparent);',
        '  border: 1px solid color-mix(in srgb, var(--kingdom-color, #3498db) 20%, transparent);',
        '  border-radius: 20px;',
        '  color: var(--kingdom-color, #3498db) !important;',
        '  font-size: 0.85rem;',
        '  font-weight: 600;',
        '  text-decoration: none;',
        '  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);',
        '  border-bottom: none !important;',
        '}',

        '.wiki-footer-links a:hover {',
        '  background: color-mix(in srgb, var(--kingdom-color, #3498db) 18%, transparent);',
        '  border-color: var(--kingdom-color, #3498db);',
        '  transform: translateY(-2px);',
        '  box-shadow: 0 6px 16px -4px color-mix(in srgb, var(--kingdom-color, #3498db) 35%, transparent);',
        '}',

        // Тёмная тема
        'html body.mars-stars-on .wiki-footer {',
        '  background: linear-gradient(135deg,',
        '    rgba(20, 15, 35, 0.5) 0%,',
        '    color-mix(in srgb, var(--kingdom-color, #3498db) 10%, rgba(20, 15, 35, 0.5)) 50%,',
        '    color-mix(in srgb, var(--kingdom-color, #3498db) 18%, rgba(20, 15, 35, 0.5)) 100%) !important;',
        '  border-color: color-mix(in srgb, var(--kingdom-color, #3498db) 35%, transparent) !important;',
        '  color: #b8b8d4 !important;',
        '  backdrop-filter: blur(12px);',
        '  -webkit-backdrop-filter: blur(12px);',
        '}',

        'html body.mars-stars-on .wiki-footer p { color: #b8b8d4 !important; }',
        'html body.mars-stars-on .wiki-footer-brand {',
        '  color: #d4d4e8 !important;',
        '  border-bottom-color: color-mix(in srgb, var(--kingdom-color, #3498db) 30%, transparent) !important;',
        '}',
        'html body.mars-stars-on .wiki-footer-brand strong { color: #fff !important; }',
        'html body.mars-stars-on .wiki-footer-brand em {',
        '  color: color-mix(in srgb, var(--kingdom-color, #3498db) 80%, #ffffff) !important;',
        '}',
        'html body.mars-stars-on .wiki-footer a {',
        '  color: color-mix(in srgb, var(--kingdom-color, #3498db) 80%, #ffffff) !important;',
        '}',
        'html body.mars-stars-on .wiki-footer-links {',
        '  border-top-color: color-mix(in srgb, var(--kingdom-color, #3498db) 30%, transparent) !important;',
        '}',
        'html body.mars-stars-on .wiki-footer-links a {',
        '  background: color-mix(in srgb, var(--kingdom-color, #3498db) 15%, transparent) !important;',
        '  border-color: color-mix(in srgb, var(--kingdom-color, #3498db) 35%, transparent) !important;',
        '  color: color-mix(in srgb, var(--kingdom-color, #3498db) 70%, #ffffff) !important;',
        '}',
        'html body.mars-stars-on .wiki-footer-links a:hover {',
        '  background: color-mix(in srgb, var(--kingdom-color, #3498db) 30%, transparent) !important;',
        '  border-color: color-mix(in srgb, var(--kingdom-color, #3498db) 80%, #ffffff) !important;',
        '  color: #ffffff !important;',
        '}',

        '@media (max-width: 600px) {',
        '  .wiki-footer { padding: 24px 20px 20px; margin: 40px 0 24px 0; border-radius: 14px; }',
        '  .wiki-footer-links a { padding: 6px 12px; font-size: 0.78rem; }',
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

        var html = '<p>' + CONFIG.licenseNote + '</p>';
        html += '<p class="wiki-footer-brand">' + CONFIG.brandNote + '</p>';
        html += '<div class="wiki-footer-links">';
        CONFIG.links.forEach(function(link) {
            html += '<a href="' + link.href + '">' + link.text + '</a>';
        });
        html += '</div>';

        footer.innerHTML = html;
        return footer;
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
    // 🎨 ПОЛУЧИТЬ ЦВЕТ ПРОФИЛЯ (с каскадным поиском)
    // ============================================================
    function getKingdomColor() {
        // 1) Прямая переменная localStorage
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved && /^#[0-9a-fA-F]{3,8}$/.test(saved)) {
                return saved;
            }
        } catch(e) {}

        // 2) Ищем в кэше профиля
        try {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key && key.indexOf('pf_cache_') === 0) {
                    try {
                        var cached = JSON.parse(localStorage.getItem(key));
                        if (cached && cached.currentProfile && cached.currentProfile.kingdom) {
                            var k = cached.currentProfile.kingdom;
                            if (KINGDOM_COLORS[k]) {
                                // Кэшируем глобально
                                try { localStorage.setItem(STORAGE_KEY, KINGDOM_COLORS[k]); } catch(e) {}
                                return KINGDOM_COLORS[k];
                            }
                        }
                    } catch(e) {}
                }
            }
        } catch(e) {}

        // 3) Фолбэк — читаем CSS-переменную (уже установлена профилем)
        try {
            var fromCSS = getComputedStyle(document.documentElement)
                .getPropertyValue('--kingdom-color').trim();
            // Если это голубой/фиолетовый дефолт — считаем что пользователь не авторизован
            if (fromCSS && fromCSS !== '#6C63FF' && fromCSS !== '#3498db') {
                return fromCSS;
            }
        } catch(e) {}

        return DEFAULT_COLOR;
    }

    // ============================================================
    // 🎨 ПРИМЕНИТЬ ЦВЕТ КО ВСЕМУ
    // ============================================================
    function applyKingdomColor(color) {
        if (!color) color = DEFAULT_COLOR;

        // Устанавливаем на html и body
        document.documentElement.style.setProperty('--kingdom-color', color);
        document.body.style.setProperty('--kingdom-color', color);

        // Флаг для диагностики
        document.documentElement.setAttribute('data-kingdom-color', color);

        // Применяем ко ВСЕМ элементам с этим цветом
        var footer = document.getElementById('wiki-footer-block');
        if (footer) {
            footer.style.setProperty('--kingdom-color', color);
        }
    }

    // ============================================================
    // 🔑 ПОИСК КОНТЕЙНЕРА
    // ============================================================
    function findContentContainer() {
        // Если .rst-content есть — вставляем в его РОДИТЕЛЯ,
        // чтобы футер был ПОСЛЕ комментариев и лайков
        var rst = document.querySelector('.rst-content');
        if (rst && rst.parentElement) {
            return rst.parentElement;
        }

        for (var i = 0; i < CONFIG.contentSelectors.length; i++) {
            var el = document.querySelector(CONFIG.contentSelectors[i]);
            if (el && el.children.length > 0) return el;
        }
        return document.body;
    }

    // ============================================================
    // 🔑 ДЕРЖИМ ФУТЕР В САМОМ НИЗУ
    // ============================================================
    function enforceFooterAtBottom() {
        var footer = document.getElementById('wiki-footer-block');
        var container = findContentContainer();

        if (!footer) {
            footer = createFooter();
            container.appendChild(footer);
            // Применяем цвет сразу
            var color = getKingdomColor();
            applyKingdomColor(color);
            return;
        }

        if (footer.parentElement !== container) {
            if (footer.parentNode) footer.parentNode.removeChild(footer);
            container.appendChild(footer);
            return;
        }

        if (container.lastElementChild !== footer) {
            container.appendChild(footer);
        }
    }

    // ============================================================
    // MUTATION OBSERVER
    // ============================================================
    var observer = null;
    var lastRun = 0;
    var DEBOUNCE_MS = 100;

    function startObserver() {
        if (observer) observer.disconnect();

        observer = new MutationObserver(function(mutations) {
            var onlyFooterChanges = true;
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];
                var target = m.target;
                if (target && target.closest && target.closest('.wiki-footer')) continue;
                onlyFooterChanges = false;
                break;
            }
            if (onlyFooterChanges) return;

            var now = Date.now();
            if (now - lastRun < DEBOUNCE_MS) return;
            lastRun = now;

            enforceFooterAtBottom();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // ============================================================
    // 🎧 СЛУШАЕМ ИЗМЕНЕНИЯ localStorage В ДРУГИХ ВКЛАДКАХ
    // ============================================================
    function watchColorChanges() {
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
                applyKingdomColor(e.newValue || DEFAULT_COLOR);
            }
        });

        // Проверяем каждую секунду — если цвет изменился в текущей вкладке
        var lastColor = getKingdomColor();
        setInterval(function() {
            var current = getKingdomColor();
            if (current !== lastColor) {
                lastColor = current;
                applyKingdomColor(current);
            }
        }, 1000);
    }

    // ============================================================
    // ЗАПУСК
    // ============================================================
    function init() {
        injectStyles();

        // 🎨 Сразу применяем цвет (до вставки футера)
        applyKingdomColor(getKingdomColor());

        enforceFooterAtBottom();

        // Повторные попытки при загрузке
        setTimeout(function() {
            applyKingdomColor(getKingdomColor());
            enforceFooterAtBottom();
        }, 100);
        setTimeout(function() {
            applyKingdomColor(getKingdomColor());
            enforceFooterAtBottom();
        }, 300);
        setTimeout(function() {
            applyKingdomColor(getKingdomColor());
            enforceFooterAtBottom();
        }, 800);
        setTimeout(function() {
            applyKingdomColor(getKingdomColor());
            enforceFooterAtBottom();
        }, 1500);
        setTimeout(function() {
            applyKingdomColor(getKingdomColor());
            enforceFooterAtBottom();
        }, 3000);

        startObserver();
        watchColorChanges();
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
                applyKingdomColor(getKingdomColor());
                var old = document.getElementById('wiki-footer-block');
                if (old) old.remove();
                enforceFooterAtBottom();
                startObserver();
            }, 300);
        });
    }

    // Для отладки
    window.forceFooterBottom = enforceFooterAtBottom;
    window.getKingdomColor = getKingdomColor;
    window.applyKingdomColor = applyKingdomColor;

    console.log('📄 wikipedia-footer v5: активен | цвет:', getKingdomColor());
})();
