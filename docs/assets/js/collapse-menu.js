// accordion-menu.js — меню-аккордеон: только разделы, статьи по клику
(function() {
    'use strict';

    var STORAGE_KEY = 'mars_menu_open_sections';
    var IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);

    // Какие разделы открыты (сохраняется)
    var openSections = {};
    try {
        openSections = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch(e) { openSections = {}; }

    // ============================================================
    // 🔍 ПОИСК NAV В ЛЮБОЙ ТЕМЕ
    // ============================================================
    function findNav() {
        // Material
        var nav = document.querySelector('.md-sidebar--primary .md-nav--primary');
        if (nav) return { el: nav, type: 'material' };

        // Read the Docs
        var menu = document.querySelector('.wy-menu-vertical');
        if (menu) return { el: menu, type: 'readthedocs' };

        return null;
    }

    // ============================================================
    // 🎯 ОБРАБОТКА МЕНЮ MATERIAL
    // ============================================================
    function processMaterial(nav) {
        var topItems = nav.querySelectorAll(':scope > .md-nav__list > .md-nav__item');

        topItems.forEach(function(item) {
            // Только разделы с вложениями
            var nested = item.querySelector('.md-nav');
            if (!nested) return;

            item.classList.add('mars-accordion-section');

            var label = item.querySelector(':scope > .md-nav__link');
            if (!label) return;

            var sectionTitle = label.textContent.trim();
            var sectionId = label.getAttribute('for') || sectionTitle;

            // Проверяем, открыт ли
            var isOpen = openSections[sectionId] === true;
            item.classList.toggle('mars-open', isOpen);

            // Перехватываем клик по label
            label.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSection(item, sectionId);
            };

            // Скрываем input-чекбокс
            var toggle = item.querySelector(':scope > input.md-nav__toggle');
            if (toggle) {
                toggle.style.display = 'none';
                // Синхронизируем открытие
                if (isOpen) toggle.checked = true;
            }
        });
    }

    // ============================================================
    // 🎯 ОБРАБОТКА МЕНЮ READ THE DOCS
    // ============================================================
    function processReadTheDocs(nav) {
        var topItems = nav.querySelectorAll(':scope > ul > li.toctree-l1');

        topItems.forEach(function(item) {
            var sublist = item.querySelector(':scope > ul');
            if (!sublist) return;

            item.classList.add('mars-accordion-section');

            var label = item.querySelector(':scope > a');
            if (!label) return;

            var sectionTitle = label.textContent.trim();
            var sectionId = sectionTitle;

            var isOpen = openSections[sectionId] === true;
            item.classList.toggle('mars-open', isOpen);

            label.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSection(item, sectionId);
            };
        });
    }

    // ============================================================
    // 🔄 ПЕРЕКЛЮЧЕНИЕ РАЗДЕЛА
    // ============================================================
    function toggleSection(item, sectionId) {
        var isOpen = item.classList.contains('mars-open');
        item.classList.toggle('mars-open', !isOpen);

        openSections[sectionId] = !isOpen;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(openSections));
        } catch(e) {}

        try { if (navigator.vibrate) navigator.vibrate(12); } catch(e) {}
    }

    // ============================================================
    // 🎨 СТИЛИ
    // ============================================================
    function addStyles() {
        if (document.getElementById('accordion-menu-style')) return;
        var style = document.createElement('style');
        style.id = 'accordion-menu-style';
        style.textContent = `
            /* ============================================================
               🎯 МЕНЮ-АККОРДЕОН
               ============================================================ */

            /* --- Каждый раздел --- */
            .mars-accordion-section {
                position: relative !important;
                margin: 6px 0 !important;
                border-radius: 12px !important;
                overflow: hidden !important;
                transition: background 0.25s, box-shadow 0.25s !important;
            }

            .mars-accordion-section.mars-open {
                background: linear-gradient(135deg, rgba(108, 99, 255, 0.08), rgba(162, 155, 254, 0.04)) !important;
                box-shadow: inset 0 0 0 1px rgba(108, 99, 255, 0.2) !important;
            }

            /* --- Заголовок раздела --- */
            .mars-accordion-section > .md-nav__link,
            .mars-accordion-section > a.md-nav__link,
            .mars-accordion-section > label.md-nav__link,
            .mars-accordion-section > a.reference,
            .mars-accordion-section > a {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 12px 14px !important;
                margin: 0 !important;
                font-size: 0.95rem !important;
                font-weight: 800 !important;
                color: #1a1a2e !important;
                cursor: pointer !important;
                border-radius: 12px !important;
                background: transparent !important;
                transition: all 0.25s !important;
                text-decoration: none !important;
                position: relative !important;
                min-height: 44px !important;
                user-select: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }

            /* Полоса слева */
            .mars-accordion-section > .md-nav__link::before,
            .mars-accordion-section > a.md-nav__link::before,
            .mars-accordion-section > label.md-nav__link::before,
            .mars-accordion-section > a.reference::before,
            .mars-accordion-section > a::before {
                content: '' !important;
                position: absolute !important;
                left: 0 !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                width: 4px !important;
                height: 0 !important;
                background: linear-gradient(180deg, #6C63FF, #A29BFE) !important;
                border-radius: 0 4px 4px 0 !important;
                transition: height 0.25s !important;
            }

            .mars-accordion-section.mars-open > .md-nav__link::before,
            .mars-accordion-section.mars-open > a.md-nav__link::before,
            .mars-accordion-section.mars-open > label.md-nav__link::before,
            .mars-accordion-section.mars-open > a.reference::before,
            .mars-accordion-section.mars-open > a::before {
                height: 60% !important;
            }

            /* Наведение */
            .mars-accordion-section > .md-nav__link:hover,
            .mars-accordion-section > a.md-nav__link:hover,
            .mars-accordion-section > label.md-nav__link:hover,
            .mars-accordion-section > a.reference:hover,
            .mars-accordion-section > a:hover {
                background: rgba(108, 99, 255, 0.1) !important;
                color: #6C63FF !important;
            }

            /* Стрелка-индикатор */
            .mars-accordion-section > .md-nav__link::after,
            .mars-accordion-section > a.md-nav__link::after,
            .mars-accordion-section > label.md-nav__link::after,
            .mars-accordion-section > a.reference::after,
            .mars-accordion-section > a::after {
                content: '▸' !important;
                font-size: 1rem !important;
                color: #6C63FF !important;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
                display: inline-block !important;
                margin-left: 8px !important;
                flex-shrink: 0 !important;
                font-weight: 900 !important;
            }

            .mars-accordion-section.mars-open > .md-nav__link::after,
            .mars-accordion-section.mars-open > a.md-nav__link::after,
            .mars-accordion-section.mars-open > label.md-nav__link::after,
            .mars-accordion-section.mars-open > a.reference::after,
            .mars-accordion-section.mars-open > a::after {
                transform: rotate(90deg) !important;
            }

            /* --- Подменю (статьи) --- */
            .mars-accordion-section > .md-nav,
            .mars-accordion-section > nav.md-nav,
            .mars-accordion-section > ul {
                max-height: 0 !important;
                overflow: hidden !important;
                transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s !important;
                opacity: 0 !important;
                padding: 0 !important;
                margin: 0 !important;
                background: transparent !important;
            }

            .mars-accordion-section.mars-open > .md-nav,
            .mars-accordion-section.mars-open > nav.md-nav,
            .mars-accordion-section.mars-open > ul {
                max-height: 2000px !important;
                opacity: 1 !important;
                padding: 4px 0 8px 0 !important;
                overflow: visible !important;
            }

            /* --- Ссылки статей внутри раздела --- */
            .mars-accordion-section .md-nav .md-nav__link,
            .mars-accordion-section ul li a {
                display: block !important;
                padding: 9px 14px 9px 30px !important;
                margin: 2px 0 !important;
                font-size: 0.88rem !important;
                font-weight: 600 !important;
                color: #555 !important;
                background: transparent !important;
                border-radius: 8px !important;
                transition: all 0.2s !important;
                text-decoration: none !important;
                position: relative !important;
                min-height: 38px !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                border-left: 2px solid transparent !important;
            }

            /* Линия слева для вложенных */
            .mars-accordion-section .md-nav .md-nav__link::before,
            .mars-accordion-section ul li a::before {
                content: '·' !important;
                position: absolute !important;
                left: 14px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                color: #6C63FF !important;
                font-size: 1.4rem !important;
                font-weight: 900 !important;
                line-height: 1 !important;
                opacity: 0.5 !important;
            }

            .mars-accordion-section .md-nav .md-nav__link:hover,
            .mars-accordion-section ul li a:hover {
                background: rgba(108, 99, 255, 0.12) !important;
                color: #6C63FF !important;
                padding-left: 34px !important;
            }

            /* Активная статья */
            .mars-accordion-section .md-nav .md-nav__link--active,
            .mars-accordion-section ul li.current > a,
            .mars-accordion-section ul li a.active {
                background: linear-gradient(135deg, rgba(108, 99, 255, 0.18), rgba(162, 155, 254, 0.08)) !important;
                color: #6C63FF !important;
                font-weight: 800 !important;
                border-left-color: #6C63FF !important;
            }

            .mars-accordion-section .md-nav .md-nav__link--active::before,
            .mars-accordion-section ul li.current > a::before,
            .mars-accordion-section ul li a.active::before {
                content: '◆' !important;
                color: #f39c12 !important;
                font-size: 0.9rem !important;
                opacity: 1 !important;
            }

            /* Автооткрытие раздела с активной статьёй */
            .mars-accordion-section:has(.md-nav__link--active),
            .mars-accordion-section:has(li.current) {
                background: linear-gradient(135deg, rgba(108, 99, 255, 0.06), rgba(162, 155, 254, 0.03)) !important;
                box-shadow: inset 0 0 0 1px rgba(108, 99, 255, 0.15) !important;
            }

            /* Скрываем ненужные элементы */
            .mars-accordion-section > input.md-nav__toggle {
                display: none !important;
            }

            /* Заголовки-категории (caption) — не трогаем */
            .wy-menu-vertical p.caption {
                padding: 14px 12px 8px 12px !important;
                font-size: 0.72rem !important;
                font-weight: 900 !important;
                color: #6C63FF !important;
                text-transform: uppercase !important;
                letter-spacing: 1.5px !important;
                border-bottom: 1px solid rgba(108, 99, 255, 0.2) !important;
                margin: 12px 0 6px 0 !important;
            }

            /* ============================================================
               🌌 ТЁМНАЯ ТЕМА
               ============================================================ */
            html body.mars-stars-on .mars-accordion-section > .md-nav__link,
            html body.mars-stars-on .mars-accordion-section > a.md-nav__link,
            html body.mars-stars-on .mars-accordion-section > label.md-nav__link,
            html body.mars-stars-on .mars-accordion-section > a.reference,
            html body.mars-stars-on .mars-accordion-section > a {
                color: #ffffff !important;
            }

            html body.mars-stars-on .mars-accordion-section > .md-nav__link:hover,
            html body.mars-stars-on .mars-accordion-section > a:hover {
                background: rgba(108, 99, 255, 0.2) !important;
                color: #A29BFE !important;
            }

            html body.mars-stars-on .mars-accordion-section.mars-open {
                background: rgba(108, 99, 255, 0.08) !important;
                box-shadow: inset 0 0 0 1px rgba(108, 99, 255, 0.3) !important;
            }

            html body.mars-stars-on .mars-accordion-section .md-nav .md-nav__link,
            html body.mars-stars-on .mars-accordion-section ul li a {
                color: #b0b0c8 !important;
            }

            html body.mars-stars-on .mars-accordion-section .md-nav .md-nav__link:hover,
            html body.mars-stars-on .mars-accordion-section ul li a:hover {
                background: rgba(108, 99, 255, 0.2) !important;
                color: #A29BFE !important;
            }

            html body.mars-stars-on .mars-accordion-section .md-nav .md-nav__link--active,
            html body.mars-stars-on .mars-accordion-section ul li.current > a {
                background: rgba(108, 99, 255, 0.25) !important;
                color: #A29BFE !important;
            }

            /* ============================================================
               📱 МОБИЛЬНЫЙ
               ============================================================ */
            @media (max-width: 768px) {
                .mars-accordion-section {
                    margin: 4px 0 !important;
                }
                .mars-accordion-section > .md-nav__link,
                .mars-accordion-section > a {
                    padding: 14px 12px !important;
                    font-size: 1rem !important;
                    min-height: 48px !important;
                }
                .mars-accordion-section .md-nav .md-nav__link,
                .mars-accordion-section ul li a {
                    padding: 12px 14px 12px 32px !important;
                    min-height: 44px !important;
                    font-size: 0.92rem !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 🔄 ОБНОВЛЕНИЕ ПРИ ПЕРЕХОДЕ (MkDocs SPA-режим)
    // ============================================================
    function setupObserver() {
        var lastNav = null;
        setInterval(function() {
            var nav = findNav();
            if (nav && nav.el !== lastNav) {
                lastNav = nav.el;
                if (nav.type === 'material') processMaterial(nav.el);
                else if (nav.type === 'readthedocs') processReadTheDocs(nav.el);
            }
        }, 500);
    }

    // ============================================================
    // 🚀 СТАРТ
    // ============================================================
    function init() {
        addStyles();

        setTimeout(function() {
            var nav = findNav();
            if (nav) {
                if (nav.type === 'material') processMaterial(nav.el);
                else if (nav.type === 'readthedocs') processReadTheDocs(nav.el);
                console.log('📋 Аккордеон-меню: активно (' + nav.type + ')');
            } else {
                setTimeout(init, 800);
                return;
            }
            setupObserver();
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
