---
title: Слова, которых нет в словаре
comments: false
---

<div style="max-width:1000px;margin:0 auto;font-family:-apple-system,'Segoe UI',Roboto,sans-serif;">

<h1>📋 Слова, которых нет в словаре</h1>

<p>Нажми кнопку — инструмент обойдёт все статьи сайта и покажет <b>полный список</b> неизвестных слов.</p>

<button id="start-btn" style="padding:16px 32px;background:linear-gradient(135deg,#6C63FF,#A29BFE);color:#fff;border:none;border-radius:12px;font-size:1.1rem;font-weight:800;cursor:pointer;box-shadow:0 8px 24px rgba(108,99,255,0.4);">🚀 Собрать все слова</button>

<div id="status" style="margin-top:16px;color:#666;font-size:0.95rem;"></div>

<div id="output" style="margin-top:24px;"></div>

</div>

<script>
(function() {
    'use strict';

    var lexicon = window.MARTIAN_LEXICON || {};
    var lemmas = window.MARTIAN_VERB_LEMMAS || {};

    function norm(w) { return w.toLowerCase().replace(/ё/g, 'е'); }

    function isKnown(word) {
        var n = norm(word);
        if (lexicon[n]) return true;
        if (lemmas[n] && lexicon[lemmas[n]]) return true;
        var ends = ['ами','ями','ах','ях','ой','ей','ые','ого','его','ому','ему','ыми','ими','ая','яя','ое','ее','ый','ий','ов','ев','ам','ям','ом','ем','ы','и','а','я','у','ю','е','о','ь'];
        for (var i = 0; i < ends.length; i++) {
            var e = ends[i];
            if (n.length > e.length + 2 && n.slice(-e.length) === e) {
                var stem = n.slice(0, -e.length);
                if (lexicon[stem] || lexicon[stem + 'а'] || lexicon[stem + 'я'] || lexicon[stem + 'о']) return true;
            }
        }
        return false;
    }

    async function run() {
        var status = document.getElementById('status');
        var output = document.getElementById('output');
        var btn = document.getElementById('start-btn');

        btn.disabled = true;
        btn.textContent = '⏳ Собираю...';
        output.innerHTML = '';
        status.textContent = 'Получаю карту сайта...';

        // Пытаемся получить sitemap
        var pages = [];
        try {
            var r = await fetch(window.location.origin + '/sitemap.xml');
            if (r.ok) {
                var t = await r.text();
                var urls = t.match(/<loc>([^<]+)<\/loc>/g) || [];
                pages = urls.map(function(u) { return u.replace(/<\/?loc>/g, ''); });
            }
        } catch (e) {}

        // Или вручную по ссылкам на главной
        if (pages.length === 0) {
            status.textContent = 'Sitemap не найден, собираю ссылки...';
            try {
                var mainRes = await fetch('/');
                var mainHtml = await mainRes.text();
                var doc = new DOMParser().parseFromString(mainHtml, 'text/html');
                doc.querySelectorAll('a[href]').forEach(function(a) {
                    var href = a.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                        pages.push(href);
                    }
                });
            } catch (e) {}
        }

        // Убираем дубликаты и служебное
        pages = Array.from(new Set(pages)).filter(function(p) {
            return !/\.(xml|json|png|jpg|jpeg|svg|css|js|pdf|ico)$/i.test(p)
                && p.indexOf('/secret') === -1
                && p.indexOf('/login') === -1;
        });

        status.textContent = 'Найдено страниц: ' + pages.length + '. Обхожу...';

        var allWords = {};
        var done = 0;

        for (var i = 0; i < pages.length; i++) {
            try {
                var res = await fetch(pages[i]);
                if (!res.ok) { done++; continue; }
                var html = await res.text();
                var d = new DOMParser().parseFromString(html, 'text/html');
                var content = d.querySelector('.md-content__inner, .rst-content, article, .document, main') || d.body;
                var text = (content.textContent || '').toLowerCase().replace(/ё/g, 'е');
                var words = text.match(/[а-я]{4,}/g) || [];
                for (var j = 0; j < words.length; j++) {
                    allWords[words[j]] = (allWords[words[j]] || 0) + 1;
                }
            } catch (e) {}
            done++;
            status.textContent = 'Обработано: ' + done + '/' + pages.length;
        }

        // Собираем неизвестные
        var unknown = [];
        for (var w in allWords) {
            if (!isKnown(w)) unknown.push([w, allWords[w]]);
        }
        unknown.sort(function(a, b) { return b[1] - a[1]; });

        status.textContent = '✅ Готово! Неизвестных слов: ' + unknown.length;

        // Показываем ВСЁ
        var textOnly = unknown.map(function(x) { return x[0]; }).join('\n');
        var withCounts = unknown.map(function(x) { return x[1] + '\t' + x[0]; }).join('\n');

        output.innerHTML =
            '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;">' +
                '<button id="copy-1" style="padding:10px 18px;background:#6C63FF;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;">📋 Скопировать (только слова)</button>' +
                '<button id="copy-2" style="padding:10px 18px;background:#e67e22;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;">📋 Скопировать (слово + частота)</button>' +
                '<button id="dl-1" style="padding:10px 18px;background:#27ae60;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;">💾 Скачать .txt</button>' +
            '</div>' +
            '<div style="background:#f8f9fa;border:1px solid #ddd;border-radius:12px;padding:16px;max-height:70vh;overflow:auto;font-family:monospace;font-size:13px;white-space:pre-wrap;line-height:1.6;">' +
                escapeHtml(withCounts) +
            '</div>';

        document.getElementById('copy-1').onclick = function() {
            copy(textOnly); this.textContent = '✅ Скопировано!';
        };
        document.getElementById('copy-2').onclick = function() {
            copy(withCounts); this.textContent = '✅ Скопировано!';
        };
        document.getElementById('dl-1').onclick = function() {
            download('mars-unknown-words.txt', textOnly);
        };

        btn.disabled = false;
        btn.textContent = '🔄 Запустить снова';
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function(m) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
        });
    }

    function copy(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            var ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
    }

    function download(name, text) {
        var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
    }

    document.getElementById('start-btn').onclick = run;
})();
</script>
