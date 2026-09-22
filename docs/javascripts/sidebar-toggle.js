// docs/javascripts/sidebar-toggle.js
// v2 — надёжное определение ПК, сохранение состояния, без конфликтов

(function() {
    'use strict';

    console.log('✅ sidebar-toggle.js v2 загружен');

    // ============================================================
    // 📱 НАДЁЖНОЕ ОПРЕДЕЛЕНИЕ ПК (то же, что в auth-button.js)
    // ============================================================
    function isDesktop() {
        // UA говорит что мобильный → точно не ПК
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return false;
        }
        // matchMedia
        try {
            if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return false;
        } catch(e) {}
        return window.innerWidth > 768;
    }

    // ============================================================
    // 💾 Состояние в localStorage
    // ============================================================
    var STATE_KEY = 'mars-sidebar-hidden';

    function getSavedState() {
        try { return localStorage.getItem(STATE_KEY) === '1'; } catch(e) { return false; }
    }

    function saveState(hidden) {
        try { localStorage.setItem(STATE_KEY, hidden ? '1' : '0'); } catch(e) {}
    }

    // ============================================================
    // 🚀 INIT
    // ============================================================
    function init() {
        if (!isDesktop()) {
            console.log('📱 Не ПК — кнопка меню отключена');
            return;
        }

        var sidebar = document.querySelector('.wy-nav-side');
        if (!sidebar) {
            console.warn('⚠️ Меню не найдено');
            return;
        }

        // Уже создана?
        if (document.getElementById('sidebar-toggle-btn')) return;

        // ---------- Кнопка ----------
        var toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-btn';
        toggleBtn.type = 'button';
        toggleBtn.setAttribute('aria-label', 'Скрыть/показать меню');
        toggleBtn.style.cssText = [
            'position: fixed',
            'left: 14px',
            'top: 14px',
            'z-index: 9998',
            'background: linear-gradient(135deg, #6C63FF, #A29BFE)',
            'color: #fff',
            'border: none',
            'border-radius: 20px',
            'padding: 8px 16px',
            'font-size: 13px',
            'font-weight: 700',
            'font-family: inherit',
            'cursor: pointer',
            'box-shadow: 0 4px 16px rgba(108,99,255,0.35)',
            'transition: all 0.25s cubic-bezier(.16,1,.3,1)',
            'opacity: 0.35',
            '-webkit-tap-highlight-color: transparent'
        ].join(';');

        toggleBtn.onmouseenter = function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 24px rgba(108,99,255,0.5)';
        };
        toggleBtn.onmouseleave = function() {
            this.style.opacity = '0.35';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 16px rgba(108,99,255,0.35)';
        };

        // ---------- Состояние ----------
        var isHidden = getSavedState();

        function applyState(hidden) {
            isHidden = hidden;
            saveState(hidden);

            if (hidden) {
                document.body.classList.add('sidebar-hidden');
                sidebar.style.transition = 'margin-left 0.3s cubic-bezier(.16,1,.3,1)';
                sidebar.style.marginLeft = '-300px';
                toggleBtn.textContent = '☰ Меню';
                toggleBtn.style.left = '14px';
            } else {
                document.body.classList.remove('sidebar-hidden');
                sidebar.style.transition = 'margin-left 0.3s cubic-bezier(.16,1,.3,1)';
                sidebar.style.marginLeft = '0';
                toggleBtn.textContent = '◀ Скрыть';
                toggleBtn.style.left = '14px';
            }
        }

        // Применяем сохранённое состояние сразу
        // Небольшая задержка — чтобы тема успела отрисовать sidebar
        setTimeout(function() { applyState(isHidden); }, 100);

        toggleBtn.addEventListener('click', function() {
            applyState(!isHidden);
        });

        // Не ставим кнопку первой в body — вставляем перед auth-btn-container
        // или в конец body, чтобы не конфликтовать с другими prepend
        var authBtn = document.getElementById('auth-btn-container');
        if (authBtn && authBtn.parentElement === document.body) {
            document.body.insertBefore(toggleBtn, authBtn);
        } else {
            document.body.appendChild(toggleBtn);
        }

        // ---------- Ресайз ----------
        var resizeTimer = null;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (!isDesktop()) {
                    // Ушли на мобильный — убираем всё
                    toggleBtn.style.display = 'none';
                    document.body.classList.remove('sidebar-hidden');
                    sidebar.style.marginLeft = '';
                } else {
                    toggleBtn.style.display = 'block';
                    // Восстанавливаем сохранённое состояние
                    applyState(getSavedState());
                }
            }, 250);
        });

        console.log('✅ Кнопка меню создана (ПК), состояние:', isHidden ? 'свёрнуто' : 'развёрнуто');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
