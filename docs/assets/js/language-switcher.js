// ============================================================
// language-switcher.js — блок «Другие языки» в сайдбаре
// Как в Википедии: список языков → клик → перевод страницы
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 🔧 НАСТРОЙКИ
    // ============================================================
    var SOURCE_LANG = 'ru'; // язык оригинала

    var LANGUAGES = [
        { code: 'en',    flag: '🇬🇧', name: 'English' },
        { code: 'de',    flag: '🇩🇪', name: 'Deutsch' },
        { code: 'fr',    flag: '🇫🇷', name: 'Français' },
        { code: 'es',    flag: '🇪🇸', name: 'Español' },
        { code: 'it',    flag: '🇮🇹', name: 'Italiano' },
        { code: 'pl',    flag: '🇵🇱', name: 'Polski' },
        { code: 'pt',    flag: '🇵🇹', name: 'Português' },
        { code: 'tr',    flag: '🇹🇷', name: 'Türkçe' },
        { code: 'zh-CN', flag: '🇨🇳', name: '中文' },
        { code: 'ja',    flag: '🇯🇵', name: '日本語' },
        { code: 'ko',    flag: '🇰🇷', name: '한국어' },
        { code: 'ar',    flag: '🇸🇦', name: 'العربية' }
    ];

    // ============================================================
    // 🔗 ССЫЛКА НА GOOGLE TRANSLATE
    // ============================================================
    function makeTranslateUrl(targetLang) {
        var host = window.location.hostname;
        // mars-wiki.ru → mars-wiki-ru.translate.goog
        var proxyHost = host.replace(/\./g, '-') + '.translate.goog';
        var path = window.location.pathname + window.location.search;

        var params = '_x_tr_sl=' + SOURCE_LANG +
                     '&_x_tr_tl=' + targetLang +
                     '&_x_tr_hl=' + SOURCE_LANG +
                     '&_x_tr_pto=wapp';

        return window.location.protocol + '//' + proxyHost + path + '?' + params;
    }

    // ============================================================
    // 🏗️ СОЗДАНИЕ БЛОКА
    // ============================================================
    function createLanguageBlock() {
        var block = document.createElement('div');
        block.className = 'lang-switcher-block';

        var html = '<div class="lang-title">🌐 Другие языки</div>';
        html += '<ul class="lang-list">';

        LANGUAGES.forEach(function(lang) {
            html += '<li>';
            html += '<a href="' + makeTranslateUrl(lang.code) + '" ';
            html += 'target="_blank" rel="noopener" class="lang-link">';
            html += '<span class="lang-flag">' + lang.flag + '</span>';
            html += '<span class="lang-name">' + lang.name + '</span>';
            html += '</a>';
            html += '</li>';
        });

        html += '</ul>';
        block.innerHTML = html;
        return block;
    }

    // ============================================================
    // 📥 ВСТАВКА В САЙДБАР
    // ============================================================
    function insertIntoSidebar() {
        if (document.querySelector('.lang-switcher-block')) return;

        // Пробуем найти сайдбар (Material + Read the Docs)
        var navList = document.querySelector('.md-nav--primary .md-nav__list') ||
                      document.querySelector('.md-sidebar--primary .md-nav__list');
        var sidebar = document.querySelector('.wy-nav-side .wy-menu-vertical') ||
                      document.querySelector('.wy-menu-vertical');

        var block = createLanguageBlock();

        if (navList) {
            // Material
            var li = document.createElement('li');
            li.className = 'md-nav__item';
            li.style.listStyle = 'none';
            li.appendChild(block);
            navList.appendChild(li);
        } else if (sidebar) {
            // Read the Docs
            sidebar.appendChild(block);
        } else {
            // Ничего не нашли — попробуем ещё раз позже
            return false;
        }
        return true;
    }

    // ============================================================
    // 🎨 СТИЛИ
    // ============================================================
    function addStyles() {
        if (document.getElementById('lang-switcher-style')) return;
        var style = document.createElement('style');
        style.id = 'lang-switcher-style';
        style.textContent = `
            .lang-switcher-block {
                margin: 14px 0 8px 0;
                padding: 12px 0 0 0;
                border-top: 1px solid rgba(160, 160, 180, 0.2);
                list-style: none;
            }

            .lang-title {
                font-size: 0.72rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #6C63FF;
                padding: 0 12px 10px 12px;
                opacity: 0.9;
            }

            .lang-list {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .lang-list li {
                margin: 0;
                padding: 0;
                list-style: none;
            }

            .lang-link {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 7px 12px;
                color: #333 !important;
                text-decoration: none !important;
                border-bottom: none !important;
                font-size: 0.85rem;
                font-weight: 500;
                transition: all 0.2s ease;
                border-radius: 4px;
                line-height: 1.3;
            }

            .lang-link:hover {
                background: rgba(108, 99, 255, 0.1);
                color: #6C63FF !important;
                transform: translateX(2px);
            }

            .lang-flag {
                font-size: 1.05rem;
                line-height: 1;
                flex-shrink: 0;
            }

            .lang-name {
                flex: 1;
                line-height: 1.3;
            }

            /* ============================================================
               Тёмная тема (звёздное небо)
               ============================================================ */
            html body.mars-stars-on .lang-switcher-block {
                border-top-color: rgba(108, 99, 255, 0.25) !important;
            }

            html body.mars-stars-on .lang-title {
                color: #A29BFE !important;
            }

            html body.mars-stars-on .lang-link {
                color: #d4d4e4 !important;
            }

            html body.mars-stars-on .lang-link:hover {
                background: rgba(108, 99, 255, 0.25) !important;
                color: #A29BFE !important;
            }

            /* ============================================================
               Мобильный
               ============================================================ */
            @media (max-width: 1024px) {
                .lang-switcher-block {
                    margin: 12px 8px;
                    padding: 12px 0 0 0;
                }
                .lang-link {
                    padding: 10px 12px;
                    font-size: 0.9rem;
                }
                .lang-flag {
                    font-size: 1.15rem;
                }
                .lang-title {
                    font-size: 0.75rem;
                    padding: 0 12px 12px 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    function init() {
        addStyles();
        // Пробуем вставить несколько раз — DOM может отрисоваться позже
        var attempts = 0;
        var interval = setInterval(function() {
            attempts++;
            if (insertIntoSidebar() || attempts > 20) {
                clearInterval(interval);
            }
        }, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('🌐 Language switcher: активен');
})();
