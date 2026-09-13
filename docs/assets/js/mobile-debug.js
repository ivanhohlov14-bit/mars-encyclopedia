// mobile-debug.js — ЛЁГКИЙ дебаг: показывает ТОЛЬКО ошибки
// Молчит, пока всё ок. Не тормозит.
(function() {
    'use strict';

    var IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);
    if (!IS_MOBILE) return;
    if (localStorage.getItem('mars_debug_off') === 'true') return;

    var errors = [];
    var box = null;
    var fab = null; // плавающая кнопка
    var isVisible = false;

    // ============================================================
    // СОЗДАНИЕ UI (ленивое — только когда есть ошибка)
    // ============================================================
    function ensureUI() {
        if (box) return;

        // Плавающая кнопка 🐛 (всегда видна если есть ошибки)
        fab = document.createElement('button');
        fab.id = 'mob-debug-fab';
        fab.textContent = '🐛';
        fab.style.cssText =
            'position:fixed;top:50%;left:0;transform:translateY(-50%);' +
            'width:34px;height:34px;background:#e74c3c;color:#fff;' +
            'border:none;border-radius:0 10px 10px 0;' +
            'z-index:2147483646;font-size:1rem;cursor:pointer;' +
            'box-shadow:0 4px 12px rgba(231,76,60,0.5);' +
            'display:none;align-items:center;justify-content:center;padding:0;';
        fab.onclick = toggleBox;
        document.body.appendChild(fab);

        // Бокс с ошибками
        box = document.createElement('div');
        box.id = 'mob-debug-box';
        box.style.cssText =
            'position:fixed;bottom:0;left:0;right:0;max-height:45vh;overflow:auto;' +
            'background:rgba(0,0,0,0.94);color:#ff6b6b;font-family:Menlo,Consolas,monospace;' +
            'font-size:11px;padding:10px;z-index:2147483647;' +
            'border-top:2px solid #e74c3c;line-height:1.5;word-break:break-word;' +
            'display:none;padding-bottom:calc(10px + env(safe-area-inset-bottom,0px));' +
            '-webkit-overflow-scrolling:touch;';

        var header = document.createElement('div');
        header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #333;position:sticky;top:0;background:rgba(0,0,0,0.94);';
        header.innerHTML =
            '<span style="color:#fff;font-weight:bold;font-size:12px;">🐛 Ошибки (<span id="mob-err-count">0</span>)</span>' +
            '<span>' +
            '<button id="mob-copy" style="background:#6C63FF;color:#fff;border:none;border-radius:4px;padding:5px 10px;font-size:10px;margin-right:6px;font-weight:bold;">📋 Копировать</button>' +
            '<button id="mob-close" style="background:#e74c3c;color:#fff;border:none;border-radius:4px;padding:5px 10px;font-size:10px;font-weight:bold;">✕</button>' +
            '</span>';
        box.appendChild(header);

        var list = document.createElement('div');
        list.id = 'mob-err-list';
        box.appendChild(list);

        document.body.appendChild(box);

        document.getElementById('mob-close').onclick = function() {
            box.style.display = 'none';
            fab.style.display = 'flex';
            isVisible = false;
        };

        document.getElementById('mob-copy').onclick = function() {
            var text = errors.join('\n\n');
            copyText(text);
        };

        // Рендер уже накопленных ошибок
        renderAll();
    }

    function renderAll() {
        var list = document.getElementById('mob-err-list');
        if (!list) return;
        list.innerHTML = '';
        errors.forEach(function(err) {
            var div = document.createElement('div');
            div.style.cssText = 'padding:6px 0;border-bottom:1px solid #1a1a1a;white-space:pre-wrap;';
            div.textContent = err;
            list.appendChild(div);
        });
        var cnt = document.getElementById('mob-err-count');
        if (cnt) cnt.textContent = errors.length;
    }

    function addError(text) {
        errors.push('[' + new Date().toLocaleTimeString() + '] ' + text);
        if (errors.length > 30) errors.shift(); // храним только 30 последних

        if (!box) {
            ensureUI();
            // Показываем FAB (мигающий красный)
            fab.style.display = 'flex';
            fab.style.animation = 'mobDebugPulse 1.5s ease-in-out infinite';
            // Добавляем keyframes один раз
            if (!document.getElementById('mob-debug-anim')) {
                var st = document.createElement('style');
                st.id = 'mob-debug-anim';
                st.textContent = '@keyframes mobDebugPulse{0%,100%{transform:translateY(-50%) scale(1)}50%{transform:translateY(-50%) scale(1.15)}}';
                document.head.appendChild(st);
            }
            // Автоматически показываем бокс при ПЕРВОЙ ошибке
            showBox();
        } else {
            // Обновляем список если открыт
            if (isVisible) {
                var list = document.getElementById('mob-err-list');
                if (list) {
                    var div = document.createElement('div');
                    div.style.cssText = 'padding:6px 0;border-bottom:1px solid #1a1a1a;white-space:pre-wrap;';
                    div.textContent = errors[errors.length - 1];
                    list.appendChild(div);
                    box.scrollTop = box.scrollHeight;
                }
                var cnt = document.getElementById('mob-err-count');
                if (cnt) cnt.textContent = errors.length;
            }
        }
    }

    function showBox() {
        if (!box) ensureUI();
        box.style.display = 'block';
        if (fab) fab.style.display = 'none';
        isVisible = true;
        setTimeout(function() { box.scrollTop = box.scrollHeight; }, 50);
    }

    function toggleBox() {
        if (!box) { showBox(); return; }
        if (isVisible) {
            box.style.display = 'none';
            if (fab) fab.style.display = 'flex';
            isVisible = false;
        } else {
            showBox();
        }
    }

    function copyText(text) {
        var doCopy = function() {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                return navigator.clipboard.writeText(text).then(function() {
                    flashBtn('📋 Копировать', '✅ Готово!');
                }).catch(function() { fallbackCopy(text); });
            }
            fallbackCopy(text);
        };
        doCopy();
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, text.length);
        try { document.execCommand('copy'); flashBtn('📋 Копировать', '✅ Готово!'); }
        catch(e) { flashBtn('📋 Копировать', '❌ Ошибка'); }
        ta.remove();
    }

    function flashBtn(orig, temp) {
        var btn = document.getElementById('mob-copy');
        if (!btn) return;
        btn.textContent = temp;
        setTimeout(function() { btn.textContent = orig; }, 1800);
    }

    // ============================================================
    // ЛОВИМ ТОЛЬКО ОШИБКИ — НИЧЕГО БОЛЬШЕ
    // ============================================================

    // 1. JavaScript-ошибки
    window.addEventListener('error', function(e) {
        var loc = '';
        if (e.filename) {
            var parts = e.filename.split('/');
            loc = ' @ ' + parts[parts.length - 1] + ':' + (e.lineno || '?');
        }
        addError('❌ ' + (e.message || 'Unknown error') + loc);
    });

    // 2. Promise-ошибки
    window.addEventListener('unhandledrejection', function(e) {
        var r = e.reason;
        var msg = r && r.message ? r.message : String(r || 'Unknown promise rejection');
        addError('⚠️ Promise: ' + msg);
    });

    // 3. СЕТЕВЫЕ ОШИБКИ — только 4xx и 5xx, не всё подряд
    var origFetch = window.fetch;
    if (origFetch) {
        window.fetch = function() {
            var args = arguments;
            var url = args[0];
            var urlStr = typeof url === 'string' ? url : (url && url.url) || '';
            return origFetch.apply(this, args).then(function(response) {
                // ✅ Логируем ТОЛЬКО ошибки
                if (!response.ok) {
                    var short = urlStr.length > 70 ? urlStr.substring(0, 70) + '…' : urlStr;
                    addError('🌐 ' + response.status + ' ' + response.statusText + '\n   ' + short);
                }
                return response;
            }).catch(function(err) {
                var short = urlStr.length > 70 ? urlStr.substring(0, 70) + '…' : urlStr;
                addError('🌐 Сеть не отвечает:\n   ' + short + '\n   ' + err.message);
                throw err;
            });
        };
    }

    // 4. XHR (используется Supabase-js)
    var origOpen = XMLHttpRequest.prototype.open;
    var origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url) {
        this.__mob_url = url;
        return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
        var xhr = this;
        var url = xhr.__mob_url || '';
        xhr.addEventListener('loadend', function() {
            if (xhr.status >= 400 || xhr.status === 0) {
                var short = url.length > 70 ? url.substring(0, 70) + '…' : url;
                var statusText = xhr.status === 0 ? 'не отвечает' : xhr.status;
                addError('🔴 XHR ' + statusText + '\n   ' + short);
            }
        });
        return origSend.apply(this, arguments);
    };

    // ============================================================
    // ИНФО ПРИ ЗАПУСКЕ (без бокса — только если что-то не так)
    // ============================================================
    setTimeout(function() {
        // Проверим, загрузился ли Supabase
        var client = window.supabaseClient || (typeof supabase !== 'undefined' ? supabase : null);
        if (!client) {
            addError('⚠️ Supabase не загружен на этой странице');
        }
    }, 3000);

    console.log('🐛 mobile-debug: активен (только ошибки)');
})();
