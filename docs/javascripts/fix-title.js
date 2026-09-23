// ============================================================
// fix-title.js — v2 VIP
// Цвет названия сайта в шапке/сайдбаре (белый)
// - CSS через <style> вместо inline !important
// - Покрытие: RTD, Material, кастомный хедер
// - Retry — ждёт пока сайдбар отрисуется
// - SPA через document$ + MutationObserver
// - Публичное API: window.marsFixTitle.*
// ============================================================
(function() {
    'use strict';

    if (window.__marsFixTitleLoaded) return;
    window.__marsFixTitleLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var COLOR = '#ffffff';
    var STYLE_ID = 'mars-fix-title-style';
    var DEBUG = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🏷️ fix-title:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 🎨 CSS — лучше inline, т.к. переживает перерисовку DOM
    // ============================================================
    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var s = document.createElement('style');
        s.id = STYLE_ID;
        s.textContent = `
            /* Read the Docs — название сайта в сайдбаре */
            .wy-side-nav-search > a,
            .wy-side-nav-search > a:hover,
            .wy-side-nav-search > a:focus,
            .wy-side-nav-search .icon-home,
            a.icon-home,
            a.icon-home:hover,
            a.icon-home:focus {
                color: ${COLOR} !important;
                text-shadow: 0 0 12px rgba(255,255,255,0.3);
            }

            /* MkDocs Material — название в шапке */
            .md-header__title,
            .md-header__topic,
            .md-header-nav__title,
            .md-header__title .md-header__topic {
                color: ${COLOR} !important;
            }

            /* Кастомный мобильный хедер (если есть) */
            #custom-mobile-header .site-title,
            #custom-mobile-header .title,
            #custom-mobile-header a:not(#auth-btn-container):not(#mobile-register-btn) {
                color: ${COLOR} !important;
            }

            /* Только на светлой теме — на тёмной может быть свой цвет */
            html[data-theme="light"] .wy-side-nav-search > a,
            html[data-theme="light"] .md-header__title {
                color: ${COLOR} !important;
            }
        `;
        document.head.appendChild(s);
        log('стили добавлены');
    }

    // ============================================================
    // 🔍 Проверка, что сайдбар уже есть
    // ============================================================
    function sidebarExists() {
        return !!(document.querySelector('.wy-side-nav-search') ||
                  document.querySelector('.md-header__title') ||
                  document.querySelector('#custom-mobile-header'));
    }

    // ============================================================
    // 🚀 Init
    // ============================================================
    function init() {
        injectStyles();
        // Retry — если сайдбар отрисовался позже
        if (!sidebarExists()) {
            var tries = 0;
            var iv = setInterval(function() {
                tries++;
                if (sidebarExists() || tries > 20) {
                    clearInterval(iv);
                    log('сайдбар найден на попытке', tries);
                }
            }, 300);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Подстраховка — если контент подгрузился позже
    setTimeout(init, 800);
    setTimeout(init, 2500);

    // ============================================================
    // 🔄 SPA-переходы
    // ============================================================
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        try {
            document$.subscribe(function() {
                // CSS уже вставлен — просто перепроверяем что не удалился
                if (!document.getElementById(STYLE_ID)) {
                    injectStyles();
                }
            });
        } catch(e) {}
    } else if (typeof MutationObserver !== 'undefined') {
        // Fallback — если кто-то пересоздаёт шапку
        var mo = new MutationObserver(function() {
            if (!document.getElementById(STYLE_ID)) {
                injectStyles();
            }
        });
        try {
            mo.observe(document.documentElement, { childList: true, subtree: false });
            setTimeout(function() { try { mo.disconnect(); } catch(e) {} }, 30000);
        } catch(e) {}
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsFixTitle = {
        apply: injectStyles,
        setColor: function(color) {
            var s = document.getElementById(STYLE_ID);
            if (s) s.remove();
            COLOR = color;
            injectStyles();
        }
    };

    log('v2 VIP загружен');
})();
