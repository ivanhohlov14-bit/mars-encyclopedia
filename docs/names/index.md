---
title: Марсианское имя
comments: false
---

<div id="names-app" style="max-width: 700px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; padding: 0 8px;">
    <div style="text-align:center; padding: 40px 20px;">
        <div style="font-size: 4rem; margin-bottom: 8px;">🔤</div>
        <h1 style="margin: 0 0 8px 0; font-size: 2rem; font-weight: 800; color: #1a1a2e;">Твоё марсианское имя</h1>
        <p style="color: #888; font-size: 1rem; margin: 0;">Введи своё имя — узнай, как тебя звали бы на Марсе</p>
    </div>

    <div style="background: rgba(255,255,255,0.95); border-radius: 24px; padding: 32px 28px; box-shadow: 0 20px 60px -12px rgba(108,99,255,0.3); border: 2px solid #6C63FF;">
        <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #333; margin-bottom: 8px;">Твоё земное имя</label>
            <input type="text" id="earthName" placeholder="Например: Иван, Мария, Александр..." maxlength="30"
                style="width: 100%; padding: 16px 20px; border-radius: 12px; border: 2px solid rgba(0,0,0,0.1); font-size: 1.1rem; font-family: inherit; outline: none; box-sizing: border-box; background: #fafafa; transition: border-color 0.2s;">
        </div>

        <button id="generateBtn" style="
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #6C63FF, #A29BFE);
            color: #fff;
            border: none;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 800;
            cursor: pointer;
            font-family: inherit;
            box-shadow: 0 12px 32px -8px rgba(108,99,255,0.5);
            transition: all 0.3s;
        ">
            ✨ Перевести на марсианский
        </button>
    </div>

    <div id="result" style="margin-top: 24px; display: none;"></div>
</div>

<style>
@keyframes nmFadeIn {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes nmGlow {
    0%, 100% { box-shadow: 0 0 30px rgba(108,99,255,0.3); }
    50% { box-shadow: 0 0 60px rgba(108,99,255,0.6); }
}
#earthName:focus { border-color: #6C63FF !important; background: #fff !important; }
#generateBtn:hover { transform: translateY(-2px); box-shadow: 0 16px 40px -8px rgba(108,99,255,0.6); }
#generateBtn:active { transform: translateY(0); }
.nm-result-card {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border-radius: 24px;
    padding: 40px 32px;
    color: #fff;
    text-align: center;
    animation: nmFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: both;
    border: 2px solid #6C63FF;
    position: relative;
    overflow: hidden;
}
.nm-result-card::before {
    content: '';
    position: absolute;
    top: -50%; right: -30%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(108,99,255,0.3), transparent 70%);
    border-radius: 50%;
    animation: nmGlow 3s ease-in-out infinite;
}
.nm-result-name {
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #A29BFE, #6C63FF, #e74c3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 12px 0;
    position: relative;
    z-index: 2;
    animation: nmFadeIn 1s ease 0.3s both;
}
.nm-martian-title {
    font-size: 1rem;
    color: #A29BFE;
    font-style: italic;
    margin-bottom: 8px;
    position: relative;
    z-index: 2;
}
.nm-desc {
    font-size: 0.95rem;
    opacity: 0.9;
    line-height: 1.6;
    margin-top: 16px;
    position: relative;
    z-index: 2;
}
.nm-copy-btn {
    margin-top: 20px;
    padding: 12px 28px;
    background: rgba(255,255,255,0.15);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 30px;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
    position: relative;
    z-index: 2;
}
.nm-copy-btn:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); }
</style>

<script>
(function() {
    'use strict';

    // Правила транслитерации
    var TRANSLIT = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'gh', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'Gh', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
        'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
        'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
        'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
        'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };

    // Марсианские корни для "перевода"
    var ROOTS = [
        { from: 'a', to: 'ā' },
        { from: 'e', to: 'ē' },
        { from: 'o', to: 'ō' },
        { from: 'u', to: 'ū' },
        { from: 'i', to: 'ī' },
        { from: 'sh', to: 'sh' },
        { from: 'ch', to: 'ts' },
        { from: 'kh', to: 'gh' },
        { from: 'y', to: 'i' }
    ];

    // Марсианские титулы (по первой букве)
    var TITLES = [
        { letters: ['А', 'Ā'], title: 'Dzen-thal', meaning: 'Смотрящий на звёзды' },
        { letters: ['Б', 'B'], title: 'Kōl-ghar', meaning: 'Каменный страж' },
        { letters: ['В', 'V'], title: 'Khō-sen', meaning: 'Хранитель огня' },
        { letters: ['Г', 'Gh'], title: 'Ākha-lān', meaning: 'Помнящий воду' },
        { letters: ['Д', 'D'], title: 'Rōg-ari', meaning: 'Избранный король' },
        { letters: ['Е', 'E'], title: 'Lān-sur', meaning: 'Глина помнит' },
        { letters: ['Ж', 'Zh'], title: 'Zal-mar', meaning: 'Дыхание жизни' },
        { letters: ['З', 'Z'], title: 'Mōr-khō', meaning: 'Смерть огня' },
        { letters: ['И', 'I'], title: 'Ariya-mar', meaning: 'Священная жизнь' },
        { letters: ['К', 'K'], title: 'Kōl-suf', meaning: 'Великая земля' },
        { letters: ['Л', 'L'], title: 'Lān-mar', meaning: 'Память жизни' },
        { letters: ['М', 'M'], title: 'Mar-dzen', meaning: 'Жизнь-звезда' },
        { letters: ['Н', 'N'], title: 'Nur-ākha', meaning: 'Идущий к воде' },
        { letters: ['О', 'O'], title: 'Okh-sen', meaning: 'Дом-место' },
        { letters: ['П', 'P'], title: 'Suf-ari', meaning: 'Великий избранный' },
        { letters: ['Р', 'R'], title: 'Rōg-lān', meaning: 'Король памяти' },
        { letters: ['С', 'S'], title: 'Suf-dzen', meaning: 'Великая звезда' },
        { letters: ['Т', 'T'], title: 'Tal-dzen', meaning: 'Смотрящий с высоты' },
        { letters: ['У', 'U'], title: 'Ull-ākha', meaning: 'Глубина вод' },
        { letters: ['Ф', 'F'], title: 'Khan-suf', meaning: 'Великая река' },
        { letters: ['Х', 'Kh', 'X'], title: 'Xal-mar', meaning: 'Древняя жизнь' },
        { letters: ['Ц', 'Ts'], title: 'Tsan-lān', meaning: 'Знание памяти' },
        { letters: ['Ч', 'Ch'], title: 'Chal-dzen', meaning: 'Пыль звёзд' },
        { letters: ['Ш', 'Sh'], title: 'Shal-ghar', meaning: 'Тень камня' },
        { letters: ['Щ', 'Shch'], title: 'Shchur-okh', meaning: 'Первый дом' },
        { letters: ['Э', 'E'], title: 'Ell-ari', meaning: 'Эллада избранных' },
        { letters: ['Ю', 'Yu'], title: 'Yur-dzen', meaning: 'Южный ветер звёзд' },
        { letters: ['Я', 'Ya'], title: 'Yar-rōg', meaning: 'Мудрый правитель' }
    ];

    function translit(name) {
        var result = '';
        for (var i = 0; i < name.length; i++) {
            var ch = name[i];
            result += TRANSLIT[ch] !== undefined ? TRANSLIT[ch] : ch;
        }
        return result;
    }

    function toMartian(name) {
        var translitName = translit(name);
        // Применяем марсианские корни
        var martian = translitName;
        ROOTS.forEach(function(r) {
            martian = martian.split(r.from).join(r.to);
        });
        // Делаем первую букву заглавной
        return martian.charAt(0).toUpperCase() + martian.slice(1);
    }

    function getTitle(name) {
        if (!name) return TITLES[0];
        var firstLetter = name.charAt(0).toUpperCase();
        // Ищем по первой букве
        for (var i = 0; i < TITLES.length; i++) {
            if (TITLES[i].letters.indexOf(firstLetter) !== -1) {
                return TITLES[i];
            }
        }
        // Если не нашли — случайный
        return TITLES[Math.floor(Math.random() * TITLES.length)];
    }

    var generateBtn = document.getElementById('generateBtn');
    var earthNameInput = document.getElementById('earthName');
    var result = document.getElementById('result');

    generateBtn.addEventListener('click', function() {
        var name = earthNameInput.value.trim();
        if (!name) {
            earthNameInput.focus();
            earthNameInput.style.borderColor = '#e74c3c';
            setTimeout(function() { earthNameInput.style.borderColor = ''; }, 1000);
            return;
        }

        var martianName = toMartian(name);
        var title = getTitle(name);

        result.style.display = 'block';
        result.innerHTML = '<div class="nm-result-card">'
            + '<div class="nm-martian-title">Твоё имя на марсианском</div>'
            + '<div class="nm-result-name">' + martianName + '</div>'
            + '<div style="font-size: 1.2rem; font-weight: 700; color: #A29BFE; margin-top: 8px; position: relative; z-index: 2;">' + title.title + '</div>'
            + '<div class="nm-desc">' + title.meaning + '</div>'
            + '<button class="nm-copy-btn" id="copyNameBtn">📋 Скопировать</button>'
            + '</div>';

        document.getElementById('copyNameBtn').addEventListener('click', function() {
            navigator.clipboard.writeText(martianName + ' · ' + title.title).then(function() {
                var btn = document.getElementById('copyNameBtn');
                btn.textContent = '✅ Скопировано!';
                setTimeout(function() { btn.textContent = '📋 Скопировать'; }, 2000);
            });
        });

        // Прокручиваем к результату
        setTimeout(function() {
            result.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });

    // Enter — тоже генерирует
    earthNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') generateBtn.click();
    });
})();
</script>
