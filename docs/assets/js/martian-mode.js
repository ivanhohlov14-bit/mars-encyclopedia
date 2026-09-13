// ============================================================
// martian-mode.js — марсианский язык для сайта
// Использует общий словарь из martian-lexicon.js
// ============================================================

(function() {
    'use strict';

    var MARTIAN_KEY = 'mars_lang_mode';
    var INTRO_KEY = 'mars_intro_shown';
    var isMartian = localStorage.getItem(MARTIAN_KEY) === 'mr';

    var originals = new WeakMap();

    // ============================================================
    // 📚 ПОЛУЧЕНИЕ СЛОВАРЯ
    // ============================================================
    function getLexicon() {
        return window.MARTIAN_LEXICON || {};
    }

    function getVerbLemmas() {
        return window.MARTIAN_VERB_LEMMAS || {};
    }

    function getPrepositions() {
        return window.MARTIAN_PREPOSITIONS || [];
    }

    function getPluralWords() {
        return window.MARTIAN_PLURAL_WORDS || [];
    }

    // ============================================================
    // 🔤 НОРМАЛИЗАЦИЯ СЛОВА
    // ============================================================
    function normalize(word) {
        return word.toLowerCase().replace(/ё/g, 'е');
    }

    // ============================================================
    // 🔍 ПОИСК В СЛОВАРЕ
    // ============================================================
    function findInLexicon(word) {
        var lexicon = getLexicon();
        var verbLemmas = getVerbLemmas();
        var norm = normalize(word);

        // 1. Прямое совпадение
        if (lexicon[norm]) {
            return { found: true, entry: lexicon[norm] };
        }

        // 2. Через леммы глаголов
        if (verbLemmas[norm]) {
            var inf = verbLemmas[norm];
            if (lexicon[inf]) {
                return { found: true, entry: lexicon[inf] };
            }
        }

        // 3. Отрезаем типичные окончания существительных
        var endings = ['ами', 'ями', 'ах', 'ях', 'ой', 'ей', 'ые', 'ого', 'его',
                       'ому', 'ему', 'ыми', 'ими', 'ая', 'яя', 'ое', 'ее',
                       'ый', 'ий', 'ов', 'ев', 'ам', 'ям', 'ом', 'ем',
                       'ы', 'и', 'а', 'я', 'у', 'ю', 'е', 'о', 'ь'];
        for (var i = 0; i < endings.length; i++) {
            var end = endings[i];
            if (norm.length > end.length + 2 && norm.slice(-end.length) === end) {
                var stem = norm.slice(0, -end.length);
                if (lexicon[stem]) return { found: true, entry: lexicon[stem] };

                // + женский род с -а/-я в конце
                if (lexicon[stem + 'а']) return { found: true, entry: lexicon[stem + 'а'] };
                if (lexicon[stem + 'я']) return { found: true, entry: lexicon[stem + 'я'] };
                if (lexicon[stem + 'о']) return { found: true, entry: lexicon[stem + 'о'] };
            }
        }

        return { found: false };
    }

    // ============================================================
    // 🔤 ПЕРЕВОД ОДНОГО СЛОВА (с сохранением регистра)
    // ============================================================
    function translateWord(word) {
        var result = findInLexicon(word);
        if (!result.found) return word;

        var root = result.entry.root;

        // Регистр первой буквы
        if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
            return root.charAt(0).toUpperCase() + root.slice(1);
        }
        return root;
    }

    // ============================================================
    // 📖 ПЕРЕВОД ТЕКСТА
    // ============================================================
    function translateText(text) {
        if (!text) return text;

        // Заменяем только русские слова
        return text.replace(/[А-Яа-яЁё]+/g, function(word) {
            var preps = getPrepositions();
            var norm = normalize(word);
            if (preps.indexOf(norm) !== -1) return ''; // предлоги убираем
            return translateWord(word);
        }).replace(/\s+/g, ' ').trim();
    }

    // ============================================================
    // 📖 ПЕРЕВОД СТРАНИЦЫ
    // ============================================================
    function translatePage() {
        if (!getLexicon() || Object.keys(getLexicon()).length === 0) {
            console.warn('🪐 Словарь пуст или не загружен — перевод невозможен');
            return;
        }
        var root = document.querySelector('.md-content__inner, .rst-content, article, .document') || document.body;
        walkAndTranslate(root);
        document.documentElement.setAttribute('data-martian', 'on');
    }

    function walkAndTranslate(node) {
        if (node.nodeType === 1) {
            var tag = node.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' ||
                tag === 'PRE' || tag === 'INPUT' || tag === 'TEXTAREA') {
                return;
            }
            if (node.classList && (
                node.classList.contains('lang-switcher-block') ||
                node.classList.contains('martian-toggle') ||
                node.id === 'martian-intro'
            )) {
                return;
            }
        }

        if (node.nodeType === 3) {
            var original = node.nodeValue;
            if (!original || !original.trim()) return;

            if (!originals.has(node)) originals.set(node, original);

            var source = originals.get(node);
            node.nodeValue = isMartian ? translateText(source) : source;
            return;
        }

        for (var i = 0; i < node.childNodes.length; i++) {
            walkAndTranslate(node.childNodes[i]);
        }
    }

    function restorePage() {
        var root = document.querySelector('.md-content__inner, .rst-content, article, .document') || document.body;
        walkAndTranslate(root);
        document.documentElement.removeAttribute('data-martian');
    }

    // ============================================================
    // 🎬 ИНТРО
    // ============================================================
    function showIntro() {
        if (localStorage.getItem(INTRO_KEY) === 'true') return;

        var overlay = document.createElement('div');
        overlay.id = 'martian-intro';
        overlay.style.cssText = [
            'position:fixed;inset:0;z-index:999999;',
            'background:radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a14 100%);',
            'display:flex;align-items:center;justify-content:center;flex-direction:column;',
            'padding:24px;text-align:center;color:#fff;',
            'font-family:Georgia,serif;'
        ].join('');

        overlay.innerHTML = `
            <div style="font-size:4rem;margin-bottom:20px;">🪐</div>
            <div style="font-size:0.85rem;letter-spacing:6px;color:#A29BFE;margin-bottom:16px;">KŌL MARZĀN · ĀKHA DZEN</div>
            <div style="font-size:2rem;font-weight:900;letter-spacing:4px;color:#fff;text-shadow:0 0 20px #6C63FF;margin-bottom:8px;">LĀN SUR</div>
            <div style="font-size:1.1rem;color:#A29BFE;font-style:italic;margin-bottom:24px;">— глина помнит —</div>
            <div style="font-size:0.95rem;color:#b0b0c8;max-width:480px;line-height:1.7;margin-bottom:32px;">
                Ты входишь в мир Марса. Текст статей теперь на древнем языке.
                Слова заменены по мере возможности, имена и названия остаются как есть.
            </div>
            <button id="martian-intro-ok" style="padding:14px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:30px;font-size:1rem;font-weight:800;cursor:pointer;font-family:inherit;letter-spacing:1px;box-shadow:0 12px 32px rgba(108,99,255,0.5);">Войти в мир →</button>
            <button id="martian-intro-skip" style="margin-top:14px;padding:8px 18px;background:transparent;color:#8888a8;border:none;font-size:0.82rem;cursor:pointer;font-family:inherit;">Пропустить настройку</button>
        `;
        document.body.appendChild(overlay);

        document.getElementById('martian-intro-ok').onclick = function() {
            localStorage.setItem(INTRO_KEY, 'true');
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.4s';
            setTimeout(function() { overlay.remove(); }, 400);
        };
        document.getElementById('martian-intro-skip').onclick = function() {
            localStorage.setItem(INTRO_KEY, 'true');
            overlay.remove();
        };
    }

    // ============================================================
    // 🎚️ ПЕРЕКЛЮЧЕНИЕ
    // ============================================================
    function setLanguage(lang) {
        isMartian = (lang === 'mr');
        localStorage.setItem(MARTIAN_KEY, lang);

        if (isMartian) {
            showIntro();
            translatePage();
            updateButton('🪐');
        } else {
            restorePage();
            updateButton('📖');
        }
    }

    function toggleLanguage() {
        setLanguage(isMartian ? 'ru' : 'mr');
    }

    // ============================================================
    // 🔘 КНОПКА
    // ============================================================
    function createToggleButton() {
        if (document.getElementById('martian-toggle')) return;

        var btn = document.createElement('button');
        btn.id = 'martian-toggle';
        btn.setAttribute('aria-label', 'Марсианский язык');
        btn.innerHTML = isMartian ? '🪐' : '📖';

        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var size = isMobile ? 56 : 52;
        var bottom = isMobile ? 'calc(148px + env(safe-area-inset-bottom,0px))' : '148px';
        var right = isMobile ? 'calc(16px + env(safe-area-inset-right,0px))' : '20px';

        btn.style.cssText = [
            'position:fixed',
            'bottom:' + bottom,
            'right:' + right,
            'width:' + size + 'px',
            'height:' + size + 'px',
            'border-radius:50%',
            'background:linear-gradient(135deg,#4a1010,#7f1d1d)',
            'border:2px solid #e74c3c',
            'color:#fff',
            'font-size:' + (isMobile ? '1.6' : '1.5') + 'rem',
            'cursor:pointer',
            'z-index:99999',
            'box-shadow:0 8px 24px rgba(231,76,60,0.5)',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'padding:0',
            'touch-action:manipulation',
            '-webkit-tap-highlight-color:transparent'
        ].join(';');

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            try { if (navigator.vibrate) navigator.vibrate(20); } catch(err) {}
            toggleLanguage();
        });

        document.body.appendChild(btn);
    }

    function updateButton(symbol) {
        var btn = document.getElementById('martian-toggle');
        if (btn) btn.innerHTML = symbol;
    }

    // ============================================================
    // 🚀 ЗАПУСК
    // ============================================================
    function init() {
        createToggleButton();

        if (isMartian) {
            setTimeout(function() {
                translatePage();
                updateButton('🪐');
            }, 400);
        }

        document.addEventListener('DOMContentLoaded', function() {
            if (isMartian) setTimeout(translatePage, 300);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.martianMode = {
        on: function() { setLanguage('mr'); },
        off: function() { setLanguage('ru'); },
        toggle: toggleLanguage
    };
})();
