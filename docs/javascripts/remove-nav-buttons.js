// ============================================================
// remove-nav-buttons.js — v2 VIP
// Удаляет Previous/Next + .rst-versions
// - Debounce MutationObserver (было 100+ вызовов/сек → стало 1)
// - Auto-disconnect через 30 сек (страница устоялась)
// - Не спамит console.log
// - Не падает если элемент уже удалён
// - Ранний выход если всё уже убрано
// - Публичное API: window.marsRemoveNav.clean()
// ============================================================
(function() {
    'use strict';

    if (window.__removeNavLoaded) return;
    window.__removeNavLoaded = true;

    // ============================================================
    // ⚙️ Конфиг
    // ============================================================
    var DEBUG = false;                  // true → логи в консоль
    var OBSERVER_TIMEOUT = 30000;       // auto-disconnect через 30 сек
    var DEBOUNCE_MS = 150;              // пауза между проверками
    var MAX_RUNS = 50;                  // предохранитель от бесконечного цикла

    var runCount = 0;
    var _done = false;

    function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['🗑️ remove-nav:'].concat([].slice.call(arguments))); } catch(e) {}
    }

    // ============================================================
    // 🎯 Основная логика
    // ============================================================
    function hasSomethingToRemove() {
        // Быстрая проверка — есть ли вообще что удалять
        if (document.querySelector('.rst-footer-buttons')) return true;
        if (document.querySelector('.rst-versions')) return true;
        if (document.querySelector('.btn-neutral')) return true;
        return false;
    }

    function removeNavButtons() {
        if (_done) return;
        if (runCount++ > MAX_RUNS) {
            log('⚠️ достигнут лимит запусков — выход');
            _done = true;
            stopObserver();
            return;
        }

        try {
            // 1. Стандартные блоки
            document.querySelectorAll('.rst-footer-buttons, .btn-neutral').forEach(function(el) {
                if (el && el.parentNode) el.remove();
            });

            // 2. Кнопки внутри .rst-versions
            document.querySelectorAll('.rst-versions a').forEach(function(a) {
                if (!a || !a.parentNode) return;
                var text = (a.textContent || '').trim();
                if (text === 'Previous' || text === 'Next' ||
                    text.indexOf('‹') !== -1 || text.indexOf('›') !== -1) {
                    a.remove();
                    log('удалена ссылка:', text);
                }
            });

            // 3. Пустые спаны
            document.querySelectorAll('.rst-versions .rst-current-version span').forEach(function(span) {
                if (!span || !span.parentNode) return;
                if ((span.textContent || '').trim() === '' && span.children.length === 0) {
                    span.remove();
                }
            });

            // 4. Пустой .rst-versions — скрываем
            var versions = document.querySelector('.rst-versions');
            if (versions && (versions.textContent || '').trim() === '') {
                versions.style.display = 'none';
            }

            // Если ничего не нашли — считаем работу законченной
            if (!hasSomethingToRemove()) {
                log('✅ всё убрано — наблюдатель отключён');
                _done = true;
                stopObserver();
            }
        } catch(e) {
            console.warn('⚠️ remove-nav ошибка:', e.message);
        }
    }

    // ============================================================
    // 🔄 Debounce
    // ============================================================
    var debounceTimer = null;
    function scheduleRun() {
        if (_done) return;
        if (debounceTimer) return; // уже запланировано
        debounceTimer = setTimeout(function() {
            debounceTimer = null;
            removeNavButtons();
        }, DEBOUNCE_MS);
    }

    // ============================================================
    // 👀 MutationObserver — только по нужным селекторам
    // ============================================================
    var observer = null;

    function startObserver() {
        if (observer || _done) return;
        if (typeof MutationObserver === 'undefined') return;

        observer = new MutationObserver(function(mutations) {
            // Фильтруем — реагируем только если появились нужные классы
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];

                // Новые узлы
                if (m.addedNodes && m.addedNodes.length) {
                    for (var j = 0; j < m.addedNodes.length; j++) {
                        var node = m.addedNodes[j];
                        if (node.nodeType !== 1) continue;
                        if (node.classList && (
                            node.classList.contains('rst-footer-buttons') ||
                            node.classList.contains('rst-versions') ||
                            node.classList.contains('btn-neutral')
                        )) {
                            scheduleRun();
                            return;
                        }
                        if (node.querySelector && node.querySelector('.rst-footer-buttons, .rst-versions, .btn-neutral')) {
                            scheduleRun();
                            return;
                        }
                    }
                }
            }
        });

        try {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            log('🔭 observer запущен');

            // Auto-disconnect через 30 сек — страница уже устоялась
            setTimeout(function() {
                if (!_done) {
                    log('⏱️ таймаут observer (30с)');
                    _done = true;
                }
                stopObserver();
            }, OBSERVER_TIMEOUT);
        } catch(e) {
            console.warn('⚠️ observer не запустился:', e.message);
        }
    }

    function stopObserver() {
        if (observer) {
            try { observer.disconnect(); } catch(e) {}
            observer = null;
        }
        if (debounceTimer) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }
    }

    // ============================================================
    // 🚀 Старт
    // ============================================================
    function init() {
        removeNavButtons();
        // Повторные проверки — на случай поздней подгрузки
        setTimeout(removeNavButtons, 400);
        setTimeout(removeNavButtons, 1500);
        setTimeout(removeNavButtons, 3000);

        startObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // 🌐 Публичное API
    // ============================================================
    window.marsRemoveNav = {
        clean: removeNavButtons,
        stop: function() {
            _done = true;
            stopObserver();
            log('🛑 остановлен вручную');
        },
        isDone: function() { return _done; }
    };

    if (DEBUG) console.log('✅ remove-nav-buttons.js v2 VIP загружен');
})();
