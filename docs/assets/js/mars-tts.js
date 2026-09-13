// mars-tts.js — озвучка марсианских слов через Web Speech API
(function() {
    'use strict';

    if (!('speechSynthesis' in window)) {
        console.warn('TTS не поддерживается');
        return;
    }

    // ============================================================
    // 🔤 ТРАНСЛИТЕРАЦИЯ ДЛЯ ГОЛОСА
    // Марсианские слова читаются русским голосом через кириллицу
    // ============================================================
    function toSpeechText(text) {
        return text
            .replace(/ā/g, 'аа')
            .replace(/ō/g, 'оо')
            .replace(/ū/g, 'уу')
            .replace(/ē/g, 'ее')
            .replace(/ī/g, 'ии')
            .replace(/kh/g, 'х')
            .replace(/gh/g, 'г')
            .replace(/dz/g, 'дз')
            .replace(/ts/g, 'ц')
            .replace(/th/g, 'т')
            .replace(/sh/g, 'ш')
            .replace(/ch/g, 'ч')
            .replace(/zh/g, 'ж')
            .replace(/r/g, 'р')
            .replace(/l/g, 'л')
            .replace(/m/g, 'м')
            .replace(/n/g, 'н')
            .replace(/p/g, 'п')
            .replace(/b/g, 'б')
            .replace(/v/g, 'в')
            .replace(/f/g, 'ф')
            .replace(/s/g, 'с')
            .replace(/z/g, 'з')
            .replace(/d/g, 'д')
            .replace(/t/g, 'т')
            .replace(/g/g, 'г')
            .replace(/k/g, 'к')
            .replace(/x/g, 'кс')
            .replace(/a/g, 'а')
            .replace(/o/g, 'о')
            .replace(/u/g, 'у')
            .replace(/e/g, 'е')
            .replace(/i/g, 'и')
            .replace(/y/g, 'й');
    }

    // ============================================================
    // 🔊 ПРОИЗНОШЕНИЕ
    // ============================================================
    let voices = [];
    function loadVoices() {
        voices = speechSynthesis.getVoices();
    }
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    function speak(text) {
        if (!text) return;
        speechSynthesis.cancel();

        const cleanText = toSpeechText(text);
        const utter = new SpeechSynthesisUtterance(cleanText);

        // Ищем русский голос
        const ruVoice = voices.find(v => v.lang && v.lang.indexOf('ru') === 0);
        if (ruVoice) utter.voice = ruVoice;

        utter.lang = 'ru-RU';
        utter.rate = 0.85;
        utter.pitch = 0.9;
        utter.volume = 1;

        speechSynthesis.speak(utter);
    }

    // ============================================================
    // 🎯 АВТО-ДОБАВЛЕНИЕ 🔊 К МАРСИАНСКИМ СЛОВАМ
    // ============================================================
    const MARTIAN_REGEX = /[āōūēī]/;

    function attachSpeakers(root) {
        // Находим все элементы с марсианским текстом
        const selectors = '.martian-word, [data-martian], code, em';

        root.querySelectorAll(selectors).forEach(el => {
            if (el.dataset.ttsAttached) return;
            if (!MARTIAN_REGEX.test(el.textContent)) return;
            el.dataset.ttsAttached = '1';

            // Клик по элементу → озвучка
            el.style.cursor = 'pointer';
            el.title = 'Нажми, чтобы услышать';
            el.addEventListener('click', () => speak(el.textContent));

            // Добавляем маленькую иконку
            const icon = document.createElement('span');
            icon.textContent = ' 🔊';
            icon.style.cssText = 'font-size:0.8em;opacity:0.5;margin-left:2px;';
            el.appendChild(icon);
        });
    }

    // ============================================================
    // 🖱️ ПРАВЫЙ КЛИК ПО ЛЮБОМУ ВЫДЕЛЕННОМУ ТЕКСТУ → ОЗВУЧКА
    // ============================================================
    document.addEventListener('contextmenu', function(e) {
        const sel = window.getSelection().toString().trim();
        if (sel) {
            e.preventDefault();
            speak(sel);
        }
    });

    // ============================================================
    // 🎯 ЗАПУСК
    // ============================================================
    function init() {
        attachSpeakers(document.body);

        // Наблюдаем за новыми элементами (например, переводчик)
        const observer = new MutationObserver(() => attachSpeakers(document.body));
        observer.observe(document.body, { childList: true, subtree: true });

        console.log('🔊 TTS: озвучка марсианских слов активна');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Экспорт
    window.marsSpeak = speak;
})();
