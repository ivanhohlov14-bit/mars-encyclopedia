// mobile-debug.js — показывает ошибки на экране телефона
(function() {
    'use strict';

    var IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);
    if (!IS_MOBILE) return;

    // Проверяем — может, отладка отключена вручную
    if (localStorage.getItem('mars_debug_off') === 'true') return;

    var box = null;
    var toggle = null;
    var messages = [];

    function ensureBox() {
        if (box && document.body.contains(box)) return;

        box = document.createElement('div');
        box.id = 'mob-debug-box';
        box.style.cssText =
            'position:fixed;bottom:0;left:0;right:0;max-height:40vh;overflow:auto;' +
            'background:rgba(0,0,0,0.92);color:#0f0;font-family:Menlo,Consolas,monospace;' +
            'font-size:11px;padding:8px 10px;z-index:2147483647;' +
            'border-top:2px solid #e74c3c;line-height:1.4;word-break:break-word;' +
            'padding-bottom:calc(8px + env(safe-area-inset-bottom,0px));';

        // Заголовок с кнопками
        var header = document.createElement('div');
        header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;padding-bottom:6px;border-bottom:1px solid #333;';
        header.innerHTML =
            '<span style="color:#fff;font-weight:bold;">🐛 Отладка</span>' +
            '<span>' +
            '<button id="mob-debug-copy" style="background:#6C63FF;color:#fff;border:none;border-radius:4px;padding:4px 8px;font-size:10px;margin-right:4px;">📋 Скопировать</button>' +
            '<button id="mob-debug-close" style="background:#e74c3c;color:#fff;border:none;border-radius:4px;padding:4px 8px;font-size:10px;">✕</button>' +
            '</span>';
        box.appendChild(header);

        var log = document.createElement('div');
        log.id = 'mob-debug-log';
        box.appendChild(log);

        document.body.appendChild(box);

        // Выводим накопленные сообщения
        messages.forEach(function(m) { appendToLog(m); });

        // Обработчики
        document.getElementById('mob-debug-close').onclick = function() {
            box.style.display = 'none';
            if (toggle) toggle.style.display = 'flex';
        };

        document.getElementById('mob-debug-copy').onclick = function() {
            var text = messages.join('\n');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function() {
                    document.getElementById('mob-debug-copy').textContent = '✅ Скопировано';
                    setTimeout(function() { document.getElementById('mob-debug-copy').textContent = '📋 Скопировать'; }, 1500);
                }).catch(function() {
                    fallbackCopy(text);
                });
            } else {
                fallbackCopy(text);
            }
        };

        function fallbackCopy(text) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch(e) {}
            ta.remove();
            document.getElementById('mob-debug-copy').textContent = '✅ Готово';
            setTimeout(function() { document.getElementById('mob-debug-copy').textContent = '📋 Скопировать'; }, 1500);
        }
    }

    function appendToLog(msg) {
        var log = document.getElementById('mob-debug-log');
        if (!log) return;
        var line = document.createElement('div');
        line.style.cssText = 'padding:2px 0;border-bottom:1px solid #1a1a1a;';
        line.textContent = msg;
        log.appendChild(line);
        box.scrollTop = box.scrollHeight;
    }

    function showError(msg, color) {
        var line = '[' + new Date().toLocaleTimeString() + '] ' + msg;
        messages.push(line);
        if (messages.length > 50) messages.shift();
        if (box && box.style.display !== 'none') {
            ensureBox();
            appendToLog(line);
        } else {
            ensureBox();
        }
    }

    function createToggle() {
        if (toggle && document.body.contains(toggle)) return;
        toggle = document.createElement('button');
        toggle.textContent = '🐛';
        toggle.style.cssText =
            'position:fixed;top:50%;left:0;transform:translateY(-50%);' +
            'width:36px;height:36px;background:#e74c3c;color:#fff;border:none;' +
            'border-radius:0 10px 10px 0;z-index:2147483646;font-size:1.2rem;' +
            'display:none;align-items:center;justify-content:center;' +
            'box-shadow:0 4px 12px rgba(231,76,60,0.5);cursor:pointer;';
        toggle.onclick = function() {
            if (box) box.style.display = 'block';
            toggle.style.display = 'none';
        };
        document.body.appendChild(toggle);
    }

    // Перехват ошибок
    window.addEventListener('error', function(e) {
        showError('❌ JS: ' + (e.message || e.error || 'unknown') + ' @ ' + (e.filename || '').split('/').pop() + ':' + (e.lineno || '?'));
    });

    window.addEventListener('unhandledrejection', function(e) {
        var reason = e.reason;
        var msg = reason && reason.message ? reason.message : String(reason);
        showError('⚠️ Promise: ' + msg);
    });

    // Перехват console
    var origLog = console.log;
    var origErr = console.error;
    var origWarn = console.warn;

    console.log = function() {
        origLog.apply(console, arguments);
        var text = Array.prototype.slice.call(arguments).map(function(a) {
            if (typeof a === 'string') return a;
            try { return JSON.stringify(a); } catch(e) { return String(a); }
        }).join(' ');
        showError('ℹ️ ' + text);
    };
    console.error = function() {
        origErr.apply(console, arguments);
        var text = Array.prototype.slice.call(arguments).map(function(a) {
            if (typeof a === 'string') return a;
            try { return JSON.stringify(a); } catch(e) { return String(a); }
        }).join(' ');
        showError('❌ ' + text);
    };
    console.warn = function() {
        origWarn.apply(console, arguments);
        var text = Array.prototype.slice.call(arguments).map(function(a) {
            if (typeof a === 'string') return a;
            try { return JSON.stringify(a); } catch(e) { return String(a); }
        }).join(' ');
        showError('⚠️ ' + text);
    };

    // Перехват fetch — показывает все сетевые запросы
    var origFetch = window.fetch;
    window.fetch = function() {
        var url = arguments[0];
        var urlStr = typeof url === 'string' ? url : (url && url.url) || '';
        var short = urlStr.length > 60 ? urlStr.substring(0, 60) + '…' : urlStr;
        showError('🌐 → ' + short);

        return origFetch.apply(this, arguments).then(function(response) {
            var status = response.status;
            var icon = status >= 200 && status < 300 ? '✅' : '⚠️';
            showError(icon + ' ← ' + status + ' ' + short);
            return response;
        }).catch(function(err) {
            showError('❌ fetch: ' + short + ' → ' + err.message);
            throw err;
        });
    };

    // Создаём бокс и переключатель
    function init() {
        ensureBox();
        createToggle();
        showError('📱 Отладка активна');
        showError('URL: ' + window.location.pathname);
        showError('UA: ' + navigator.userAgent.substring(0, 60));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Глобальная функция для ручного сбора логов
    window.__marsDebug = {
        clear: function() { messages = []; if (box) box.remove(); box = null; ensureBox(); },
        off: function() { localStorage.setItem('mars_debug_off', 'true'); if (box) box.remove(); if (toggle) toggle.remove(); },
        on: function() { localStorage.removeItem('mars_debug_off'); location.reload(); }
    };
})();
