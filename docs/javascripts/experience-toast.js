// ============================================================
// experience-toast.js — v2 VIP
// Красивое уведомление о получении XP
// - Очередь тостов (не спамит)
// - Правильная дедупликация
// - VIP-анимация с частицами
// - Мобильная адаптация
// - prefers-reduced-motion
// ============================================================
(function() {
    'use strict';

    if (window.__xpToastLoaded) return;
    window.__xpToastLoaded = true;

    // ============================================================
    // ⚙️ Настройки
    // ============================================================
    var TOAST_DURATION = 2600;        // Сколько держится на экране
    var MIN_INTERVAL = 3000;          // Минимум 3 сек между тостами
    var MAX_TOASTS_PER_MINUTE = 4;    // Не больше 4 тостов в минуту
    var HISTORY_KEY = 'xp_toast_history';

    // ============================================================
    // 🎛️ Состояние
    // ============================================================
    var queue = [];
    var isShowing = false;
    var lastShownAt = 0;

    function getHistory() {
        try {
            var raw = sessionStorage.getItem(HISTORY_KEY);
            if (!raw) return [];
            var arr = JSON.parse(raw);
            if (!Array.isArray(arr)) return [];
            // Оставляем только за последнюю минуту
            var cutoff = Date.now() - 60 * 1000;
            return arr.filter(function(t) { return t > cutoff; });
        } catch(e) { return []; }
    }

    function saveHistory(arr) {
        try {
            sessionStorage.setItem(HISTORY_KEY, JSON.stringify(arr.slice(-20)));
        } catch(e) {}
    }

    function canShowNow() {
        var history = getHistory();
        if (history.length >= MAX_TOASTS_PER_MINUTE) return false;
        if (Date.now() - lastShownAt < MIN_INTERVAL) return false;
        return true;
    }

    // ============================================================
    // 🎨 Стили (один раз)
    // ============================================================
    function injectStyles() {
        if (document.getElementById('xp-toast-style')) return;
        var s = document.createElement('style');
        s.id = 'xp-toast-style';
        s.textContent = `
            #xp-toast-layer {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 999998;
                pointer-events: none;
                overflow: hidden;
            }
            .xp-toast {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.4);
                background: linear-gradient(135deg, #6C63FF 0%, #A29BFE 100%);
                color: #fff;
                padding: 18px 34px;
                border-radius: 20px;
                font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
                font-weight: 800;
                font-size: 1.9rem;
                display: flex;
                align-items: center;
                gap: 14px;
                box-shadow:
                    0 20px 60px rgba(108, 99, 255, 0.55),
                    0 0 0 4px rgba(255, 255, 255, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.4);
                pointer-events: none;
                opacity: 0;
                letter-spacing: -0.3px;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                animation: xpToastIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                will-change: transform, opacity;
            }
            .xp-toast .xp-icon {
                font-size: 2.4rem;
                line-height: 1;
                display: inline-block;
                animation: xpSpin 1s ease-out;
            }
            .xp-toast .xp-amount {
                display: inline-block;
            }
            .xp-toast.fadeout {
                animation: xpToastOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .xp-toast.plus {
                background: linear-gradient(135deg, #27ae60 0%, #16a085 100%);
                box-shadow:
                    0 20px 60px rgba(39, 174, 96, 0.5),
                    0 0 0 4px rgba(255, 255, 255, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.4);
            }
            .xp-toast.level-up {
                background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
                box-shadow:
                    0 20px 60px rgba(243, 156, 18, 0.6),
                    0 0 0 4px rgba(255, 255, 255, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.5);
            }
            .xp-toast.achievement {
                background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
                box-shadow:
                    0 20px 60px rgba(155, 89, 182, 0.55),
                    0 0 0 4px rgba(255, 255, 255, 0.18),
                    inset 0 1px 0 rgba(255, 255, 255, 0.4);
            }

            /* Частицы */
            .xp-particle {
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 999997;
                will-change: transform, opacity;
            }

            @keyframes xpToastIn {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4) rotate(-8deg); }
                60% { opacity: 1; transform: translate(-50%, -50%) scale(1.08) rotate(2deg); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            }
            @keyframes xpToastOut {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -80%) scale(0.85); }
            }
            @keyframes xpSpin {
                0% { transform: rotate(0deg) scale(0.5); }
                50% { transform: rotate(180deg) scale(1.2); }
                100% { transform: rotate(360deg) scale(1); }
            }
            @keyframes xpParticleFly {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--dx), var(--dy)) scale(0.3);
                    opacity: 0;
                }
            }

            /* Мобильная адаптация */
            @media (max-width: 600px) {
                .xp-toast {
                    font-size: 1.4rem;
                    padding: 14px 24px;
                    border-radius: 16px;
                    gap: 10px;
                    max-width: calc(100vw - 40px);
                }
                .xp-toast .xp-icon {
                    font-size: 1.8rem;
                }
            }

            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                .xp-toast {
                    animation: none !important;
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                .xp-toast.fadeout {
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .xp-particle {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(s);
    }

    // ============================================================
    // ✨ Частицы при появлении
    // ============================================================
    function spawnParticles(rect, type) {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var colors = {
            plus: ['#27ae60', '#16a085', '#2ecc71', '#1abc9c'],
            'level-up': ['#f39c12', '#e67e22', '#f1c40f', '#ffd97a'],
            achievement: ['#9b59b6', '#8e44ad', '#a569bd', '#d7bde2'],
            default: ['#6C63FF', '#A29BFE', '#8a7fff', '#ffffff']
        };
        var palette = colors[type] || colors.default;

        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;

        var count = window.innerWidth <= 600 ? 12 : 22;

        for (var i = 0; i < count; i++) {
            (function(idx) {
                setTimeout(function() {
                    var p = document.createElement('div');
                    p.className = 'xp-particle';
                    var angle = (Math.PI * 2 * idx) / count + Math.random() * 0.3;
                    var dist = 80 + Math.random() * 200;
                    var dx = Math.cos(angle) * dist;
                    var dy = Math.sin(angle) * dist;
                    var size = 6 + Math.random() * 8;
                    var color = palette[Math.floor(Math.random() * palette.length)];

                    p.style.left = cx + 'px';
                    p.style.top = cy + 'px';
                    p.style.width = size + 'px';
                    p.style.height = size + 'px';
                    p.style.background = color;
                    p.style.boxShadow = '0 0 12px ' + color;
                    p.style.setProperty('--dx', dx + 'px');
                    p.style.setProperty('--dy', dy + 'px');
                    p.style.animation = 'xpParticleFly 1s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                    p.style.animationDelay = (Math.random() * 0.15) + 's';

                    document.body.appendChild(p);
                    setTimeout(function() { p.remove(); }, 1400);
                }, idx * 30);
            })(i);
        }
    }

    // ============================================================
    // 🎯 Показ одного тоста
    // ============================================================
    function showToast(item) {
        isShowing = true;
        lastShownAt = Date.now();

        var history = getHistory();
        history.push(lastShownAt);
        saveHistory(history);

        // Слой для тоста
        var layer = document.getElementById('xp-toast-layer');
        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'xp-toast-layer';
            document.body.appendChild(layer);
        }

        // Тип тоста
        var type = item.type || 'default';
        var icon = item.icon || '⭐';
        var text = item.text;

        // Классы
        var toastClass = 'xp-toast';
        if (type === 'plus') toastClass += ' plus';
        else if (type === 'level-up') toastClass += ' level-up';
        else if (type === 'achievement') toastClass += ' achievement';

        var toast = document.createElement('div');
        toast.className = toastClass;
        toast.innerHTML =
            '<span class="xp-icon">' + icon + '</span>' +
            '<span class="xp-amount">' + text + '</span>';

        document.body.appendChild(toast);

        // Частицы
        var rect = toast.getBoundingClientRect();
        spawnParticles(rect, type);

        // Авто-скрытие
        setTimeout(function() {
            toast.classList.add('fadeout');
            setTimeout(function() {
                toast.remove();
                isShowing = false;
                // Следующий из очереди
                if (queue.length > 0) {
                    var next = queue.shift();
                    showToast(next);
                }
            }, 650);
        }, TOAST_DURATION);
    }

    // ============================================================
    // 📥 Публичное API
    // ============================================================
    function enqueue(item) {
        // Если уже показывается — в очередь
        if (isShowing) {
            queue.push(item);
            return;
        }

        // Проверяем лимит
        if (!canShowNow()) {
            // Не сбрасываем совсем, а ставим в очередь с задержкой
            setTimeout(function() {
                if (!isShowing && canShowNow()) {
                    showToast(item);
                }
            }, MIN_INTERVAL);
            return;
        }

        showToast(item);
    }

    // 🔹 Основная функция — показать опыт
    window.showExperienceToast = function(xpAmount) {
        xpAmount = parseInt(xpAmount, 10) || 0;
        if (xpAmount <= 0) return;

        enqueue({
            type: 'plus',
            icon: '⭐',
            text: '+' + xpAmount + ' XP'
        });
        console.log('🎉 XP toast: +' + xpAmount);
    };

    // 🔹 Показать повышение уровня
    window.showLevelUpToast = function(level, title) {
        enqueue({
            type: 'level-up',
            icon: '👑',
            text: 'Уровень ' + level + ' — ' + (title || '')
        });
    };

    // 🔹 Показать достижение
    window.showAchievementToast = function(icon, name) {
        enqueue({
            type: 'achievement',
            icon: icon || '🏅',
            text: name || 'Достижение'
        });
    };

    // 🔹 Совместимость со старым API
    window.showToastXP = window.showExperienceToast;

    // ============================================================
    // 🚀 Старт
    // ============================================================
    injectStyles();

    console.log('✅ experience-toast.js v2 VIP готов');
})();
