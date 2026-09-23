---
title: Свитки Хевсура
comments: false
---

<div id="scr-app" style="max-width: 1100px; margin: 0 auto; font-family: 'Georgia', 'Segoe UI', serif; padding: 0 8px;">
    <div style="text-align:center; padding: 60px 20px;">
        <div style="display:inline-block; width: 48px; height: 48px; border: 3px solid #b8860b; border-top-color: transparent; border-radius: 50%; animation: scrSpin 0.8s linear infinite;"></div>
        <p style="color: #a08040; margin-top: 16px; font-style: italic;">Разворачиваем свитки...</p>
    </div>
</div>

<style>
/* ============================================================
   СВИТКИ ХЕВСУРА — игровая версия
   ============================================================ */
:root {
    --kc: #6C63FF;
    --parchment: #f5ecd7;
    --parchment-dark: #e8dcb8;
    --parchment-deep: #d4c49a;
    --wood: #6b4f37;
    --wood-dark: #4a3728;
    --ink: #3d2817;
    --ink-light: #6b4f37;
    --gold: #b8860b;
    --gold-light: #f39c12;
    --gold-glow: rgba(243, 156, 18, 0.5);
}

@keyframes scrSpin { to { transform: rotate(360deg); } }
@keyframes scrFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scrPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes scrFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes scrFloatFast { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(3deg); } }
@keyframes scrSlide { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes scrUnroll { 0% { transform: scaleY(0); opacity: 0; } 100% { transform: scaleY(1); opacity: 1; } }
@keyframes scrInk { from { opacity: 0; letter-spacing: 5px; filter: blur(4px); } to { opacity: 1; letter-spacing: 0; filter: blur(0); } }
@keyframes scrGlow { 0%, 100% { box-shadow: 0 0 30px rgba(243, 156, 18, 0.3); } 50% { box-shadow: 0 0 60px rgba(243, 156, 18, 0.6); } }
@keyframes scrDust { 0% { transform: translateY(0) rotate(0deg); opacity: 0.7; } 100% { transform: translateY(-40px) rotate(360deg); opacity: 0; } }
@keyframes scrSparkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1); } }
@keyframes scrRuneRotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes scrLockPulse { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } }
@keyframes scrUnlockFlash { 0% { box-shadow: 0 0 0 0 rgba(243, 156, 18, 0.8); } 70% { box-shadow: 0 0 0 40px rgba(243, 156, 18, 0); } 100% { box-shadow: 0 0 0 0 rgba(243, 156, 18, 0); } }
@keyframes scrFlame { 0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.9; } 50% { transform: scaleY(1.15) scaleX(0.95); opacity: 1; } }
@keyframes scrStarTwinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
@keyframes scrProgressShine { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes scrCoin { 0% { transform: translateY(0) rotate(0); opacity: 1; } 100% { transform: translateY(-80px) rotate(720deg); opacity: 0; } }

.scr-fade { animation: scrFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#scr-app a { text-decoration: none !important; border-bottom: none !important; }

/* ============================================================
   HERO
   ============================================================ */
.scr-hero {
    position: relative;
    background:
        radial-gradient(circle at 20% 30%, rgba(243, 156, 18, 0.15), transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(243, 156, 18, 0.08), transparent 50%),
        linear-gradient(135deg, #2a1f14 0%, #4a3728 50%, #6b4f37 100%);
    border-radius: 24px;
    padding: 44px 36px 38px;
    color: var(--parchment);
    margin-bottom: 26px;
    overflow: hidden;
    box-shadow: 0 24px 60px -16px rgba(42, 31, 20, 0.6);
    border: 1px solid rgba(184, 134, 11, 0.3);
}
.scr-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.06), transparent 40%),
        radial-gradient(circle at 85% 80%, rgba(255, 200, 100, 0.08), transparent 40%);
    pointer-events: none;
}
.scr-hero-stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}
.scr-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}
.scr-hero-icon {
    font-size: 4.5rem;
    margin-bottom: 14px;
    filter: drop-shadow(0 8px 24px rgba(243, 156, 18, 0.6));
    animation: scrFloat 3.5s ease-in-out infinite;
    display: inline-block;
    line-height: 1;
}
.scr-hero-title {
    font-size: 2.1rem;
    font-weight: 800;
    margin: 0 0 10px;
    letter-spacing: -0.5px;
    color: var(--parchment);
    font-family: 'Georgia', serif;
    text-shadow: 0 2px 12px rgba(0,0,0,0.5);
}
.scr-hero-sub {
    font-size: 1rem;
    opacity: 0.88;
    margin: 0 0 24px;
    font-style: italic;
    letter-spacing: 0.3px;
}

/* СТАТИСТИКА */
.scr-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    max-width: 620px;
    margin: 0 auto 22px;
}
.scr-stat {
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(184, 134, 11, 0.35);
    border-radius: 12px;
    padding: 12px 14px;
    backdrop-filter: blur(8px);
    text-align: center;
    transition: all 0.3s;
}
.scr-stat:hover {
    background: rgba(0,0,0,0.4);
    border-color: var(--gold);
    transform: translateY(-2px);
}
.scr-stat-value {
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--gold-light);
    line-height: 1;
    text-shadow: 0 0 12px var(--gold-glow);
}
.scr-stat-label {
    font-size: 0.72rem;
    opacity: 0.75;
    margin-top: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

/* ПРОГРЕСС */
.scr-hero-progress { max-width: 560px; margin: 0 auto; }
.scr-progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    margin-bottom: 10px;
    opacity: 0.95;
    font-weight: 600;
    color: var(--parchment);
}
.scr-progress-bar {
    background: rgba(0,0,0,0.4);
    border-radius: 12px;
    height: 14px;
    overflow: hidden;
    border: 1px solid rgba(184, 134, 11, 0.35);
    position: relative;
}
.scr-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #f39c12, #e67e22, #d35400, #f39c12);
    background-size: 200% 100%;
    border-radius: 12px;
    transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 20px var(--gold-glow);
    animation: scrProgressShine 3s linear infinite;
}

/* ============================================================
   СЕТКА СВИТКОВ
   ============================================================ */
.scr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 22px;
    margin-bottom: 40px;
}

.scr-card {
    position: relative;
    background: linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%);
    border-radius: 14px;
    padding: 30px 26px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    animation: scrFadeIn 0.5s ease both;
    box-shadow:
        0 6px 16px rgba(74, 55, 40, 0.18),
        inset 0 0 60px rgba(184, 152, 88, 0.12);
    border: 1px solid rgba(139, 111, 74, 0.35);
    display: flex;
    flex-direction: column;
    min-height: 250px;
}
.scr-card::before,
.scr-card::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 14px;
    background: linear-gradient(180deg, #8b6f4a, #6b4f37 60%, #4a3728);
    z-index: 3;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.scr-card::before { top: 0; border-radius: 14px 14px 0 0; }
.scr-card::after { bottom: 0; border-radius: 0 0 14px 14px; }

.scr-card:hover {
    transform: translateY(-8px) rotate(-0.5deg);
    box-shadow:
        0 24px 52px -14px rgba(74, 55, 40, 0.45),
        inset 0 0 80px rgba(184, 152, 88, 0.18);
}
.scr-card.read {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border-color: rgba(39, 174, 96, 0.4);
}
.scr-card.read::before,
.scr-card.read::after {
    background: linear-gradient(180deg, #27ae60, #16a085 60%, #0e6e55);
}
.scr-card.locked {
    background: linear-gradient(135deg, #d8d4c8 0%, #c4bfb0 100%);
    cursor: not-allowed;
    opacity: 0.85;
}
.scr-card.locked::before,
.scr-card.locked::after {
    background: linear-gradient(180deg, #8a8578, #6b6760 60%, #4a4843);
}
.scr-card.locked:hover {
    transform: translateY(-2px);
}
.scr-card.locked .scr-card-icon,
.scr-card.locked .scr-card-title,
.scr-card.locked .scr-card-subtitle,
.scr-card.locked .scr-card-desc {
    filter: grayscale(0.7);
    opacity: 0.7;
}

.scr-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
    margin-top: 8px;
    position: relative;
    z-index: 2;
}
.scr-card-icon {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    background: linear-gradient(135deg, #8b6f4a, #6b4f37);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.9rem;
    color: var(--parchment);
    flex-shrink: 0;
    font-family: 'Georgia', serif;
    font-weight: 800;
    box-shadow: 0 6px 16px rgba(74, 55, 40, 0.35);
    transition: transform 0.3s;
    position: relative;
    overflow: hidden;
}
.scr-card-icon::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent 60%);
    pointer-events: none;
}
.scr-card.read .scr-card-icon {
    background: linear-gradient(135deg, #27ae60, #16a085);
}
.scr-card:hover .scr-card-icon {
    transform: scale(1.08) rotate(-4deg);
}

.scr-card-info { flex: 1; min-width: 0; }
.scr-card-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
    font-family: 'Georgia', serif;
}
.scr-card-subtitle {
    font-size: 0.78rem;
    color: var(--ink-light);
    font-style: italic;
}

.scr-card-desc {
    font-size: 0.88rem;
    color: #5a4530;
    line-height: 1.55;
    margin: 0 0 16px 0;
    position: relative;
    z-index: 2;
    flex: 1;
    font-style: italic;
}
.scr-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 14px;
    border-top: 1px dashed rgba(139, 111, 74, 0.35);
    position: relative;
    z-index: 2;
}
.scr-card-status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    background: rgba(139, 111, 74, 0.15);
    color: var(--ink-light);
}
.scr-card.read .scr-card-status {
    background: rgba(39, 174, 96, 0.15);
    color: #27ae60;
}
.scr-card.locked .scr-card-status {
    background: rgba(139, 111, 74, 0.2);
    color: #6b6760;
}
.scr-card-time {
    font-size: 0.72rem;
    color: #8b6f4a;
    display: flex;
    align-items: center;
    gap: 4px;
}
.scr-card-num {
    position: absolute;
    top: 22px;
    right: 22px;
    font-family: 'Georgia', serif;
    font-size: 2.4rem;
    font-weight: 900;
    color: rgba(74, 55, 40, 0.08);
    line-height: 1;
    z-index: 1;
    pointer-events: none;
}
.scr-card.read .scr-card-num { color: rgba(39, 174, 96, 0.12); }
.scr-card.locked .scr-card-num { color: rgba(74, 55, 40, 0.06); }

/* Значок замка */
.scr-lock-badge {
    position: absolute;
    top: 22px;
    right: 22px;
    width: 38px;
    height: 38px;
    background: rgba(74, 55, 40, 0.85);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f5ecd7;
    font-size: 1rem;
    z-index: 4;
    animation: scrLockPulse 2.5s ease-in-out infinite;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

/* ============================================================
   МОДАЛКА
   ============================================================ */
.scr-reader-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(20, 15, 8, 0.88);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: scrFadeIn 0.3s ease;
    overflow-y: auto;
}
.scr-reader {
    background: linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%);
    border-radius: 18px;
    max-width: 820px;
    width: 100%;
    max-height: 92vh;
    position: relative;
    box-shadow:
        0 40px 100px rgba(0, 0, 0, 0.7),
        inset 0 0 100px rgba(184, 152, 88, 0.15);
    border: 2px solid #8b6f4a;
    animation: scrUnroll 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: top center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.scr-reader::before,
.scr-reader::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 22px;
    background: linear-gradient(180deg, #8b6f4a, #6b4f37 60%, #4a3728);
    z-index: 5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.scr-reader::before { top: 0; border-radius: 16px 16px 0 0; }
.scr-reader::after { bottom: 0; border-radius: 0 0 16px 16px; }

.scr-reader-header {
    padding: 36px 44px 22px;
    border-bottom: 2px solid rgba(139, 111, 74, 0.3);
    position: relative;
    z-index: 2;
}
.scr-reader-icon {
    font-size: 3.2rem;
    margin-bottom: 12px;
    filter: drop-shadow(0 4px 12px rgba(74, 55, 40, 0.35));
    line-height: 1;
}
.scr-reader-title {
    font-size: 1.9rem;
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 6px;
    font-family: 'Georgia', serif;
    letter-spacing: -0.5px;
}
.scr-reader-subtitle {
    font-size: 0.92rem;
    color: var(--ink-light);
    font-style: italic;
}
.scr-reader-close {
    position: absolute;
    top: 30px;
    right: 34px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(139, 111, 74, 0.15);
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--ink-light);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s;
    z-index: 10;
    font-family: inherit;
}
.scr-reader-close:hover {
    background: rgba(139, 111, 74, 0.3);
    transform: rotate(90deg);
}
.scr-reader-body {
    padding: 32px 44px;
    overflow-y: auto;
    flex: 1;
    position: relative;
    z-index: 2;
    scroll-behavior: smooth;
}
.scr-reader-body::-webkit-scrollbar { width: 10px; }
.scr-reader-body::-webkit-scrollbar-track {
    background: rgba(139, 111, 74, 0.1);
    border-radius: 5px;
}
.scr-reader-body::-webkit-scrollbar-thumb {
    background: rgba(139, 111, 74, 0.45);
    border-radius: 5px;
}
.scr-reader-body::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 111, 74, 0.65);
}

.scr-reader-text {
    font-size: 1.05rem;
    line-height: 1.95;
    color: var(--ink);
    font-family: 'Georgia', serif;
}
.scr-reader-text h2 {
    font-size: 1.3rem;
    color: var(--wood);
    border-bottom: 1px solid rgba(139, 111, 74, 0.4);
    padding-bottom: 8px;
    margin: 28px 0 16px;
    letter-spacing: -0.3px;
}
.scr-reader-text h2:first-child { margin-top: 0; }
.scr-reader-text h3 {
    font-size: 1.05rem;
    color: var(--wood);
    margin: 22px 0 10px;
    font-weight: 800;
}
.scr-reader-text p {
    margin: 0 0 16px;
    text-indent: 26px;
}
.scr-reader-text p:first-of-type { text-indent: 0; }
.scr-reader-text p:first-of-type::first-letter {
    font-size: 3.6rem;
    float: left;
    line-height: 0.9;
    margin: 6px 12px 0 0;
    color: #8b6f4a;
    font-weight: 800;
    font-family: 'Georgia', serif;
    text-shadow: 2px 2px 4px rgba(74, 55, 40, 0.3);
}
.scr-reader-text em { color: #8b6f4a; font-weight: 600; }
.scr-reader-text strong { color: var(--wood); font-weight: 800; }
.scr-reader-text ul, .scr-reader-text ol {
    margin: 0 0 16px;
    padding-left: 28px;
}
.scr-reader-text li {
    margin-bottom: 8px;
    line-height: 1.75;
}
.scr-reader-text blockquote {
    border-left: 4px solid var(--gold);
    background: rgba(243, 156, 18, 0.06);
    padding: 14px 20px;
    margin: 20px 0;
    font-style: italic;
    color: var(--wood);
    border-radius: 0 8px 8px 0;
}
.scr-reader-text table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 0.92rem;
}
.scr-reader-text table th {
    background: rgba(139, 111, 74, 0.15);
    padding: 10px;
    text-align: left;
    font-weight: 800;
    color: var(--wood);
    border-bottom: 2px solid rgba(139, 111, 74, 0.3);
}
.scr-reader-text table td {
    padding: 8px 10px;
    border-bottom: 1px solid rgba(139, 111, 74, 0.15);
}
.scr-reader-text .rune-box {
    text-align: center;
    font-size: 2.5rem;
    letter-spacing: 12px;
    color: var(--wood);
    padding: 20px;
    background: rgba(139, 111, 74, 0.08);
    border-radius: 10px;
    margin: 20px 0;
    font-family: 'Georgia', serif;
}

.scr-reader-footer {
    padding: 20px 44px 34px;
    border-top: 2px solid rgba(139, 111, 74, 0.3);
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    z-index: 2;
}
.scr-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 24px;
    border-radius: 30px;
    border: 2px solid #8b6f4a;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    font-family: inherit;
    background: transparent;
    color: var(--wood);
}
.scr-btn:hover {
    background: #8b6f4a;
    color: var(--parchment);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(74, 55, 40, 0.3);
}
.scr-btn.primary {
    background: linear-gradient(135deg, #8b6f4a, #6b4f37);
    color: var(--parchment);
}
.scr-btn.primary:hover {
    box-shadow: 0 8px 24px rgba(74, 55, 40, 0.5);
}
.scr-btn.success {
    background: linear-gradient(135deg, #27ae60, #16a085);
    border-color: #27ae60;
    color: #fff;
}
.scr-btn.locked {
    opacity: 0.6;
    cursor: not-allowed;
}

.scr-reader-progress {
    margin-left: auto;
    font-size: 0.82rem;
    color: var(--wood);
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
}
.scr-reader-progress-bar {
    width: 130px;
    height: 8px;
    background: rgba(139, 111, 74, 0.2);
    border-radius: 4px;
    overflow: hidden;
}
.scr-reader-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #8b6f4a, #6b4f37);
    border-radius: 4px;
    transition: width 0.3s;
}

/* Пылинки и искры */
.scr-dust {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #f39c12;
    border-radius: 50%;
    pointer-events: none;
    animation: scrDust 3.5s ease-out infinite;
    opacity: 0;
    box-shadow: 0 0 6px #f39c12;
}
.scr-sparkle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #fff 0%, #f39c12 60%, transparent 100%);
    border-radius: 50%;
    pointer-events: none;
    animation: scrSparkle 2s ease-in-out infinite;
}
.scr-coin {
    position: fixed;
    font-size: 1.5rem;
    pointer-events: none;
    z-index: 999999;
    animation: scrCoin 1.2s ease-out forwards;
}

/* ПУСТОЕ */
.scr-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, var(--parchment), var(--parchment-dark));
    border-radius: 16px;
    border: 2px dashed rgba(139, 111, 74, 0.3);
}
.scr-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.scr-empty-title { font-size: 1.1rem; font-weight: 700; color: var(--wood); }

/* Тост */
.scr-toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    padding: 14px 28px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: 0 16px 40px rgba(0,0,0,0.35);
    z-index: 999999;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    color: #fff;
    max-width: 90vw;
}
.scr-toast.show { transform: translateX(-50%) translateY(0); }
.scr-toast.success { background: linear-gradient(135deg, #27ae60, #16a085); }
.scr-toast.info { background: linear-gradient(135deg, #8b6f4a, #6b4f37); }
.scr-toast.warning { background: linear-gradient(135deg, #e67e22, #d35400); }
.scr-toast.gold { background: linear-gradient(135deg, #b8860b, #f39c12); }

/* ============================================================
   МОБИЛЬНАЯ АДАПТАЦИЯ
   ============================================================ */
@media (max-width: 700px) {
    .scr-hero { padding: 30px 20px 26px; border-radius: 18px; }
    .scr-hero-title { font-size: 1.5rem; }
    .scr-hero-icon { font-size: 3.2rem; }
    .scr-hero-sub { font-size: 0.88rem; margin-bottom: 20px; }
    .scr-stats { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .scr-stat { padding: 10px 8px; }
    .scr-stat-value { font-size: 1.3rem; }
    .scr-stat-label { font-size: 0.65rem; }

    .scr-grid { grid-template-columns: 1fr; gap: 16px; }
    .scr-card { padding: 24px 20px; min-height: 220px; }
    .scr-card-icon { width: 52px; height: 52px; font-size: 1.6rem; }
    .scr-card-title { font-size: 1.05rem; }
    .scr-card-desc { font-size: 0.85rem; }

    .scr-reader { max-height: 96vh; border-radius: 14px; }
    .scr-reader::before, .scr-reader::after { height: 16px; }
    .scr-reader-header { padding: 26px 20px 16px; }
    .scr-reader-body { padding: 20px 20px; }
    .scr-reader-footer { padding: 16px 20px 24px; }
    .scr-reader-title { font-size: 1.35rem; }
    .scr-reader-text { font-size: 0.98rem; line-height: 1.8; }
    .scr-reader-text h2 { font-size: 1.15rem; }
    .scr-reader-text p:first-of-type::first-letter { font-size: 2.8rem; margin: 4px 8px 0 0; }
    .scr-reader-close { top: 20px; right: 16px; width: 36px; height: 36px; }
    .scr-reader-progress { margin-left: 0; width: 100%; margin-top: 8px; }
    .scr-reader-progress-bar { width: 100%; flex: 1; }
    .scr-reader-text .rune-box { font-size: 1.8rem; letter-spacing: 8px; padding: 14px; }
    .scr-reader-text table { font-size: 0.82rem; }
    .scr-reader-text table th, .scr-reader-text table td { padding: 6px 8px; }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // ============================================================
    // СВИТКИ — содержание из документа
    // ============================================================
    const SCROLLS = [
        {
            id: 'a', letter: 'А', num: 1,
            title: 'Свиток Начала',
            subtitle: 'Периодизация истории Марса',
            icon: '🌌', time: '12 мин',
            preview: 'От Нойской эпохи — до последних дней Эпохи Умирания. Три геологические эпохи, разделившие судьбу планеты.',
            content: `
                <h2>Периодизация истории Марса</h2>
                <p>История Марса насчитывает 4,6 миллиарда лет. Её принято делить на три геологические эпохи — Нойскую, Гесперийскую и Амазонийскую. Названия даны в честь регионов планеты, но в марсианской культуре они получили мифологическое значение.</p>

                <h3>Нойская эпоха (ок. 4,1–3,7 млрд лет назад)</h3>
                <p>Время формирования древнейших кратеров и первых океанов. Тогда ещё не было ни жизни, ни даже глины, способной хранить память. Согласно легендам, именно в эту эпоху <strong>Кхо</strong> (Огонь) и <strong>Акха</strong> (Вода) впервые встретились, и из их союза родилась жизнь.</p>
                <p>В табличках эта эпоха почти не отражена — сохранились лишь мифологические фрагменты, пересказывающие историю сотворения мира. Однако в геологических слоях этого периода учёные Академии находили первые органические молекулы.</p>

                <h3>Гесперийская эпоха (ок. 3,7–3,0 млрд лет назад)</h3>
                <p>Эпоха активного вулканизма и эрозии, когда на Марсе ещё текли полноводные реки и существовали огромные озёра. К этому периоду относятся древнейшие известные окаменелости и первые протоклетки. В устных преданиях эта эпоха названа <em>«Временем горячей воды»</em>.</p>

                <h3>Амазонийская эпоха (от 3,0 млрд лет назад до наших дней)</h3>
                <p>Эпоха постепенного угасания геологической активности, иссушения и похолодания. Внутри неё выделяют три больших периода:</p>
                <ul>
                    <li><strong>Ранний Амазоний</strong> (3,0–1,0 млрд лет) — расцвет первых многоклеточных организмов, выход жизни на сушу.</li>
                    <li><strong>Средний Амазоний</strong> (1,0 млрд – 500 тыс. лет) — когнитивная революция, возникновение языка и первых ритуальных захоронений.</li>
                    <li><strong>Поздний Амазоний</strong> (500 тыс. лет назад – 2740 г. Э.О.) — эпоха письменной истории, к которой относятся все сохранившиеся таблички.</li>
                </ul>

                <h3>Внутри Позднего Амазония выделяются три культурные эпохи:</h3>
                <ul>
                    <li><strong>Эпоха Основания</strong> (1–2500 гг. Э.О.) — постройка первых городов, прорытие каналов, основание Академии Окхасена.</li>
                    <li><strong>Эпоха Расцвета</strong> (2500–2680 гг. Э.О.) — наивысшее могущество Королевства Эдема. Обсерватории, звёздные карты, торговые корабли.</li>
                    <li><strong>Эпоха Умирания</strong> (2680–2740 гг. Э.О.) — последние шестьдесят лет, описанные в книге. Море замерзает, вулканы просыпаются, люди строят корабли.</li>
                </ul>

                <p><em>Примечание о датировке:</em> все даты приведены в марсианских годах (от основания Роген-Арии) и в миллиардах лет — в соответствии с геологической шкалой Академии Окхасена. Расхождения между системами неизбежны, но не превышают допустимой погрешности.</p>
            `
        },
        {
            id: 'b', letter: 'Б', num: 2,
            title: 'Свиток Королей',
            subtitle: 'Сказание о держателях жезла',
            icon: '👑', time: '10 мин',
            preview: 'Полная родословная династии Эдема — от Сарума I до Аратана III. Правители, их деяния и последние слова.',
            content: `
                <h2>Сказание о держателях жезла</h2>
                <p>Здесь перечислены те, кто правил Объединённым Королевством марсиан от его основания до последних дней. Имена и деяния древнейших властителей сохранились лишь в отрывках; полная же родословная восстанавливается начиная с <strong>Сарума Основателя</strong>, который первым возвёл столицу в долине Эдем и дал имя Королевству.</p>

                <h3>Династия Сарума</h3>
                <p><strong>Сарум I</strong> (1–47 Э.О.) — сын вождя кочевого племени, последнего из рода серпендидских царей. Привёл свой народ к берегам Ацидалийского моря. При Саруме I были прорыты первые каналы, соединившие море с пресными озёрами в долине Аравия. Он взял в жёны Ирну из рода рыбаков, от которой родились трое детей. Сарум I погиб во время шторма; тело не было найдено, и по сей день моряки оставляют ему дары перед дальними плаваниями.</p>

                <p><strong>Сарум II</strong> (47–112) — старший сын. При нём завершилось строительство дворца в Роген-Арии, а Академия Окхасена получила первые свитки и таблички. Он женился на Мире из долины Эдема, которая родила ему четырёх сыновей и двух дочерей. После смерти Миры он не вступал в повторный брак, что было сочтено жрецами знаком особой преданности памяти.</p>

                <p><strong>Акхара I</strong> (891–947) — первая женщина на престоле. Она укрепила южные границы и ввела обычай записывать все законы на глине, чтобы ни один судья не мог их исказить. Её дочь, также Акхара, стала жрицей Араксис и основала храм на острове посреди Ацидалийского моря.</p>

                <p><strong>Сарум Великий</strong> (1544–1633) — объединил разрозненные города под единой короной. Его правление считалось «золотым веком»: строились обсерватории, расцветала торговля. У него было семеро детей, из которых престол унаследовал младший сын — Терман, ибо старшие погибли в эпидемии неизвестной болезни.</p>

                <p><strong>Терман I</strong> (1633–1690) — прозванный «Строителем каналов». При нём система орошения достигла совершенства, и урожаи в Аравии были самыми высокими за всю историю. Взял в жёны дочь князя Утопии, что на несколько поколений прекратило войны с югом.</p>

                <p><strong>Аратан III</strong> (2703–2740) — последний король из дома Эдема. Взошёл на престол в год, когда впервые замерзли причалы Окхасена. Его жена, королева Элла, умерла за два года до старта кораблей. Сам Аратан не вступил в новый брак. У него не осталось наследников; после его гибели жезл власти перешёл к Совету Академии, а затем — к командирам кораблей.</p>

                <blockquote>Я правил камнями, но не сумел удержать воду. Пусть те, кто улетают, правят хотя бы памятью.<br>— Аратан III, последние слова</blockquote>

                <h3>Прочие властители</h3>
                <p><strong>Терман из Утопии</strong> (ок. 2680–2710) — объединил племена южных пустынь. В его жилах текла кровь эдемских королей по материнской линии. Терман погиб в битве с отрядом беженцев, которых пытался остановить у входа в пещеры Фарсиды. Тело так и не нашли.</p>

                <p><strong>Ирна из долины Аравия</strong> (2695–2735) — жрица Араксис, возглавившая отчаянную попытку возродить оросительные каналы. Её имя выцарапано на многих пограничных камнях, но судьба после 2735 года неизвестна. Хевсур записал её имя с припиской: <em>«Она пыталась напоить землю, когда земля уже умирала. Это ли не подвиг?»</em></p>

                <p><strong>Ксанф из Эритреи</strong> (ок. 2610–2655) — морской конунг, контролировавший проливы между Ацидалийским и Эритрейским морями. Его флот насчитывал более сотни кораблей. После смерти Ксанфа его пиратское королевство распалось на три враждующих клана.</p>

                <p><strong>Великая Акхара</strong> (ок. 2390–2445) — правительница Серпендиды, последней независимой области на юге. Отразила три вторжения эдемских армий. В табличках её называют «железной жрицей».</p>

                <p><strong>Ланой-Кузнец</strong> (ок. 2730–2738) — не князь и не военачальник, но в последние годы Эпохи Умирания стал неформальным лидером общины выживших в пещерах Утопии. Организовал оборону от мародёров, наладил распределение воды и еды. Перед смертью отравил трещину с серным газом, чтобы дать остальным возможность уйти на юг.</p>
            `
        },
        {
            id: 'c', letter: 'В', num: 3,
            title: 'Свиток Времён',
            subtitle: 'История в годах и событиях',
            icon: '📜', time: '14 мин',
            preview: 'Хронология от глубочайшей древности до конца Эпохи Умирания. Даты, события, катастрофы.',
            content: `
                <h2>История в годах и событиях</h2>
                <p>Ниже приведена хронология важнейших событий от глубочайшей древности до конца Эпохи Умирания. Даты до 1 года Э.О. указаны приблизительно, начиная с 1 года Э.О. — в марсианском летоисчислении от основания Роген-Арии.</p>

                <h3>Первая эпоха (Нойская и Гесперийская)</h3>
                <p><strong>ок. 4,1–3,7 млрд лет назад</strong> — Нойская эпоха. Формирование древнейших кратеров и первых океанов. Согласно легендам, встреча Кхо (Огня) и Акхи (Воды) и рождение жизни.</p>
                <p><strong>ок. 3,7–3,0 млрд лет назад</strong> — Гесперийская эпоха. Активный вулканизм, текут реки, существуют озёра. Появляются первые протоклетки. Письменных табличек нет — только геологические слои.</p>

                <h3>Вторая эпоха (Ранний Амазоний)</h3>
                <p><strong>ок. 3,0–1,0 млрд лет назад</strong> — Жизнь выходит на сушу. Формируются леса из пурпурных растений. Появляются гигантские ракоскорпионы и медузы.</p>

                <h3>Третья эпоха (Средний Амазоний)</h3>
                <p><strong>ок. 1,0 млрд – 500 тыс. лет назад</strong> — Появление первых разумных существ, предков марсиан. Возникновение членораздельной речи. Начало ритуальных захоронений.</p>
                <p><strong>ок. 500 тыс. лет назад</strong> — Начало Позднего Амазония — эпохи письменной истории.</p>

                <h3>Эпоха Основания (1–2500 гг. Э.О.)</h3>
                <p><strong>ок. 500 г. до Э.О.</strong> — Легендарное основание Серпендиды. Серп, первый морской король, приводит свой народ к берегам моря Эллады.</p>
                <p><strong>1 г. Э.О.</strong> — Основание Окхасена переселенцами из Серпендиды. Начало марсианского летоисчисления.</p>
                <p><strong>47 г.</strong> — Гибель Сарума I в море. Воцарение Сарума II.</p>
                <p><strong>712 г.</strong> — Официальное основание Академии Окхасена.</p>
                <p><strong>891–947 гг.</strong> — Правление Акхары I, первой женщины на престоле Эдема.</p>
                <p><strong>1544–1633 гг.</strong> — Правление Сарума Великого, «золотой век» Эдема.</p>
                <p><strong>1700 г.</strong> — Землетрясение разрушает дамбу Акха-Кора; столица Серпендиды уходит под воду. Гибель царя и большей части табличек.</p>
                <p><strong>2390–2445 гг.</strong> — Правление Великой Акхары, последней независимой правительницы Серпендиды.</p>

                <h3>Эпоха Расцвета (2500–2680 гг.)</h3>
                <p><strong>2500–2600 гг.</strong> — Строительство обсерваторий в горах Фарсида. Расцвет торговли.</p>
                <p><strong>2610–2655 гг.</strong> — Деятельность Ксанфа из Эритреи, морского конунга.</p>
                <p><strong>2622 г.</strong> — Первый задокументированный неурожай в долине Аравия.</p>
                <p><strong>2650 г.</strong> — Последний крупный ремонт каналов при короле Термане.</p>
                <p><strong>2680 г.</strong> — Начало активизации вулканов Фарсиды. Первые извержения Олимпа. Начало Эпохи Умирания.</p>

                <h3>Эпоха Умирания (2680–2740 гг.)</h3>
                <p><strong>2690 г.</strong> — Глобальная пылевая буря длится почти год.</p>
                <p><strong>2695 г.</strong> — Создание комиссии по изучению климата. Геолог Эртан представляет первые модели угасания.</p>
                <p><strong>2703 г.</strong> — Коронация Аратана III, последнего короля Эдема.</p>
                <p><strong>2705–2730 гг.</strong> — Деятельность Тар-Ары, «князя пустыни» Эридании.</p>
                <p><strong>2714 г.</strong> — Постройка первого телескопа в Академии. Талин впервые наблюдает Землю.</p>
                <p><strong>2718 г.</strong> — Ацидалийское море впервые замерзает у берегов Окхасена.</p>
                <p><strong>2725 г.</strong> — Реки Ксанф, Лабей и Борл пересыхают полностью.</p>
                <p><strong>2734 г.</strong> — Экспедиция Хевсура в подземный храм долины Ксанфа. Возвращение с табличками и пророчествами.</p>
                <p><strong>2735 г.</strong> — Ацидалийское море полностью замерзает.</p>
                <p><strong>2735–2739 гг.</strong> — Строительство кораблей «Надежда», «Память» и «Прощание».</p>
                <p><strong>2740 г., 15-й день месяца Кхосен</strong> — Старт трёх кораблей к Земле. Начало «эпохи прощания». Гибель короля Аратана III.</p>
                <p><strong>2740–2745 гг.</strong> — Гибель оставшихся марсиан в пещерах под Фарсидой. Смерть Йарры (2742). Последние записи Хевсура (ок. 2745).</p>
            `
        },
        {
            id: 'd', letter: 'Г', num: 4,
            title: 'Свиток Крови',
            subtitle: 'Родословные великих домов',
            icon: '🩸', time: '9 мин',
            preview: 'Дом хранителей, род небесных счётчиков, кровь погонщиков. Линии, которые не прервались до Исхода.',
            content: `
                <h2>Кровь и глина</h2>
                <p>Здесь собраны не все — только те, чьи имена удалось восстановить из рассыпающихся табличек и чьи голоса не утонули в шуме последних лет. Отмечены те, кто собрался на закате перед самым Исходом в Зале Совета Окхасена.</p>

                <h3>1. Дом хранителей (линия Хевсура)</h3>
                <p>Этот дом вёл начало от <strong>Харана, сына Сарума</strong>, который жил три тысячи лет назад и оставил таблички в подземном храме. Ни королей, ни военачальников в этом роду не было — только писцы, переписчики и хранители. Хевсур стал последним.</p>
                <div class="rune-box">📜 → 📖 → 📜</div>
                <ul>
                    <li><strong>Харан, сын Сарума</strong> (писец, ~3000 лет до Э.О.)</li>
                    <li>(многие поколения, имена стёрты)</li>
                    <li><strong>Ланой-старший</strong> (хранитель архива, ~2600 – ~2700)</li>
                    <li><strong>Ланой-младший</strong> (переписчик, ~2630 – ~2710)</li>
                    <li><strong>Хевсур</strong> (историк, 2685 – ~2745)</li>
                </ul>
                <p>Хевсур не взял в жёны никого и не оставил детей. Его дом пресёкся, но таблички, которые он спрятал, пережили его.</p>

                <h3>2. Род небесных счётчиков (линия Талина)</h3>
                <p>Талин родился в семье строителей лодок, но ещё в детстве потянулся к звёздам. Его сестра Элла пошла по пути врачевания и биологии. Оба улетели на корабле «Надежда-2».</p>
                <ul>
                    <li><strong>Эрдан</strong> (строитель лодок, ~2700 – 2738, погиб в море)</li>
                    <li><strong>Талин</strong> (астронавигатор, 2712 – ?)</li>
                    <li><strong>Элла</strong> (биолог, 2716 – ?)</li>
                </ul>
                <p>Мать Талина и Эллы осталась на Марсе и, вероятно, умерла в пещерах. Имя её таблички не сохранили.</p>

                <h3>3. Кровь погонщиков (линия Араша)</h3>
                <p>Араш и его сын Кан были наняты Хевсуром для экспедиции в подземный храм. Араш погиб при попытке запустить четвёртый корабль; Кан пропал без вести.</p>
                <ul>
                    <li><strong>Араш-старший</strong> (погонщик из Утопии, ~2680 – 2739)</li>
                    <li>Жена Араша осталась в пещерах Утопии</li>
                    <li><strong>Кан</strong> (сын, помощник погонщика, пропал после гибели отца)</li>
                </ul>

                <h3>4. Последний королевский дом Эдема</h3>
                <p>Сокращённая линия от Сарума Великого до Аратана III:</p>
                <ul>
                    <li><strong>Сарум Великий</strong> (1544–1633)</li>
                    <li><strong>Терман I</strong> (Строитель каналов, 1633–1690)</li>
                    <li>(многие поколения)</li>
                    <li><strong>Аратан III</strong> (последний король, 2703–2740)</li>
                </ul>
                <p>Аратан III не оставил наследников. С его смертью королевская кровь Эдема пресеклась.</p>

                <h3>5. Жрицы уходящей воды (линия Ирны)</h3>
                <p>Ирна была жрицей Араксис и пыталась спасти каналы долины Аравия. Её дочь (имя не сохранилось) улетела на корабле.</p>
                <ul>
                    <li><strong>Ирна</strong> (жрица, 2695 – ~2735, погибла в пустыне)</li>
                    <li>— дочь (имя утрачено, улетела на «Надежде-3»)</li>
                    <li>— сын, умер младенцем</li>
                </ul>

                <p><em>Этот свиток не полон. Хевсур жалел, что глина кончается, а памяти — бесконечность. Он успел записать лишь тех, кого помнил сам или о ком рассказали другие.</em></p>
            `
        },
        {
            id: 'e', letter: 'Д', num: 5,
            title: 'Свиток Звёзд',
            subtitle: 'Марсианское летоисчисление',
            icon: '🌙', time: '11 мин',
            preview: '22 месяца, 8 сезонов, звёздный год. Как марсиане считали время на умирающей планете.',
            content: `
                <h2>Марсианское летоисчисление и календарь</h2>
                <p>Марсианский год продолжается 687 местных суток, которые называются <strong>солами</strong>. По земным меркам это примерно 669 земных суток. Но для самих марсиан это был естественный ритм — смена сезонов, движение звёзд, поведение Фобоса и Деймоса.</p>

                <h3>Двадцать два месяца</h3>
                <p>В отличие от земного календаря, разделённого на двенадцать месяцев, марсиане с глубокой древности делили год на <strong>двадцать два месяца</strong>. Почему именно двадцать два? Астрономические таблички из Эллады объясняют это так: за год Марс дважды проходит перигелий и афелий, а также совершает полный цикл восходов и заходов Фобоса, что даёт 22 лунных периода по 31,2 сола.</p>

                <p>Марсианские месяцы имели переменную длительность — от 28 до 33 солов. Средняя продолжительность месяца — 31,2 сола. Год начинался в день весеннего равноденствия, когда солнце вставало точно над Великим каналом Окхасена.</p>

                <h3>Восемь сезонов</h3>
                <p>Вместо четырёх сезонов марсиане различали <strong>восемь</strong>, каждый из которых включал два или три месяца:</p>
                <ol>
                    <li><strong>Пробуждение</strong> — таяние льдов, начало каналов</li>
                    <li><strong>Цветение</strong> — рост пурпурных растений</li>
                    <li><strong>Зной</strong> — максимальное тепло, звёздные ночи</li>
                    <li><strong>Ветры</strong> — пылевые бури, сезон дождей</li>
                    <li><strong>Угасание</strong> — похолодание, увядание</li>
                    <li><strong>Заморозки</strong> — первые льды, память предков</li>
                    <li><strong>Тьма</strong> — долгая ночь, три месяца тьмы</li>
                    <li><strong>Ледяной покров</strong> — семь месяцев зимы, в которые море замерзало и жизнь теплилась лишь под землёй</li>
                </ol>
                <p>В Эпоху Умирания последний, восьмой сезон становился всё длиннее, и к 2740 году зима фактически поглотила все остальные сезоны.</p>

                <h3>Особые дни и праздники</h3>
                <p>У марсиан не было недель. Вместо этого использовали <strong>декадные циклы</strong> по десять дней, связанные с фазами Фобоса. Десятидневка начиналась с главного рыночного дня, а завершалась днём поминовения предков.</p>
                <ul>
                    <li><strong>Dzen Thal</strong> (1-й день Äkha-dzen) — Новый год, праздник смотрения на звёзды. Король выходил на балкон дворца в Роген-Арии и произносил пророчество на предстоящий год.</li>
                    <li><strong>Lān Mar</strong> (15-й день Mar-lān) — День памяти всех ушедших. Таблички с именами умерших выставлялись в храмах.</li>
                    <li><strong>Ariya-mar</strong> (весь шестой месяц) — священный месяц, когда запрещались войны и казни.</li>
                    <li><strong>Yar-okh</strong> (последний месяц года) — «возвращение домой». Марсиане, ушедшие в дальние путешествия, старались вернуться к родным очагам.</li>
                </ul>

                <h3>Счёт лет</h3>
                <p>Марсиане вели летосчисление от Основания Окхасена (1 год Э.О.). До этого они пользовались эпохами правления царей или счётом по сезонам. Первым историческим годом считается год, когда переселенцы из Серпендиды заложили порт на южном берегу Ацидалийского моря.</p>
                <p>Например, старт кораблей состоялся <strong>15-го дня месяца Кхосен 2740 года Э.О.</strong></p>

                <blockquote>Не все даты следует принимать как безусловную истину. В последние годы Эпохи Умирания многие таблички не успевали обжечь, и сырая глина давала усадку, из-за чего знаки смещались. Хевсур признавался, что иногда записывал по памяти, ибо чернила кончались.<br>— из примечаний к Свитку Д</blockquote>
            `
        },
        {
            id: 'f', letter: 'Е', num: 6,
            title: 'Свиток Рун',
            subtitle: 'Марсианские алфавиты и письмо',
            icon: '✍️', time: '13 мин',
            preview: 'Силлабарий, диакритика, цифры. Как писали на глине те, кто хотел, чтобы их помнили.',
            content: `
                <h2>Марсианские алфавиты и письмо</h2>
                <p>В подлинных табличках марсианская письменность предстаёт в двух основных формах: <strong>монументальной</strong> (для высекания на камне и обожжённой глине) и <strong>скорописной</strong> (для повседневных записей на сырой глине).</p>

                <h3>Произношение имён и названий</h3>
                <p>Все марсианские слова даны в транслитерации, приближённой к звучанию классического языка Marzān.</p>

                <h3>Гласные</h3>
                <ul>
                    <li><strong>A</strong> — всегда открытый, как в русском «там». Долгота обозначается чертой: <em>ā</em>.</li>
                    <li><strong>O</strong> — как в «дом», <em>ō</em> — долгий, более закрытый.</li>
                    <li><strong>U</strong> — как в «тут», <em>ū</em> — долгий.</li>
                    <li><strong>I</strong> — как в «игла».</li>
                </ul>
                <p><strong>Ударение всегда падает на первый слог</strong> (исключений нет).</p>

                <h3>Согласные</h3>
                <table>
                    <tr><th>Буква</th><th>Произношение</th><th>Пример</th></tr>
                    <tr><td>kh</td><td>гортанное, как х в немецком Bach</td><td>Khō — огонь</td></tr>
                    <tr><td>gh</td><td>звонкое, фрикативное г</td><td>Ghar — камень</td></tr>
                    <tr><td>x</td><td>сильное х, почти кх</td><td>Xal — древний</td></tr>
                    <tr><td>th</td><td>глухой межзубный, как в англ. think</td><td>Thal — смотреть</td></tr>
                    <tr><td>dz</td><td>слитное дз</td><td>Dzen — звезда</td></tr>
                    <tr><td>ts</td><td>слитное ц</td><td>Tsan — знание</td></tr>
                    <tr><td>r</td><td>раскатистое, как в русском «ррр»</td><td>Rōg — король</td></tr>
                    <tr><td>l</td><td>мягкое перед i и e, в остальных случаях твёрдое</td><td>Lān — память</td></tr>
                </table>

                <p>В марсианском языке <strong>нет звуков в, ф, ч, щ, ж, ш</strong>. Заимствованные имена адаптировались: <em>Софья → Совия</em>.</p>

                <h3>Письменность</h3>
                <p>Марсиане писали на глиняных табличках, реже — на базальтовых плитах (монументальные надписи). Орудием письма служило <strong>стило</strong> — заострённая палочка из твёрдого дерева или кости. На сырой глине стило оставляло углублённые знаки; после обжига табличка становилась твёрдой, и письмо сохранялось тысячелетиями.</p>
                <p>Направление письма — <strong>слева направо</strong>, строки сверху вниз. Знаки не соединяются, между ними оставляется небольшой промежуток.</p>

                <h3>Названия знаков</h3>
                <p>Каждый знак имел имя, начинающееся с того слога, который он передавал. Имена были смысловыми:</p>
                <table>
                    <tr><th>Слог</th><th>Название</th><th>Перевод</th></tr>
                    <tr><td>ma</td><td>mar</td><td>жизнь</td></tr>
                    <tr><td>la</td><td>lăn</td><td>память</td></tr>
                    <tr><td>ka</td><td>kəl</td><td>земля</td></tr>
                    <tr><td>kha</td><td>khan</td><td>река</td></tr>
                    <tr><td>ga</td><td>ghar</td><td>камень</td></tr>
                    <tr><td>ra</td><td>rəg</td><td>король</td></tr>
                    <tr><td>tha</td><td>thal</td><td>смотреть</td></tr>
                    <tr><td>da</td><td>dzen</td><td>звезда</td></tr>
                    <tr><td>ha</td><td>hal</td><td>светлый</td></tr>
                    <tr><td>tsa</td><td>tsan</td><td>знание</td></tr>
                    <tr><td>mo</td><td>mōr</td><td>смерть</td></tr>
                    <tr><td>ko</td><td>khō</td><td>огонь</td></tr>
                </table>

                <h3>Цифры и счёт</h3>
                <p>Марсиане пользовались <strong>двадцатеричной системой</strong> (основание 20). Цифры записывались как комбинации вертикальных и горизонтальных черт.</p>
                <ul>
                    <li><strong>1</strong> — On</li>
                    <li><strong>2</strong> — Dön</li>
                    <li><strong>3</strong> — Tren</li>
                    <li><strong>4</strong> — Khen</li>
                    <li><strong>5</strong> — Phin</li>
                    <li><strong>10</strong> — dzen-on</li>
                    <li><strong>20</strong> — dzen-dön</li>
                    <li><strong>400</strong> — dzen-phin</li>
                </ul>

                <h3>Образец письма</h3>
                <p>Классическая фраза, часто встречающаяся на табличках:</p>
                <div class="rune-box">KHÖ · MÖR · DZEN · MÖR · LÄN · ÄN · MÖR</div>
                <p><em>Khō mōr, dzen mōr, lān ān mōr.</em> — Огонь умрёт, звезда умрёт, память не умрёт.</p>
            `
        },
        {
            id: 'g', letter: 'Ж', num: 7,
            title: 'Свиток Языков',
            subtitle: 'Языки и народы Эпохи Умирания',
            icon: '🗣️', time: '10 мин',
            preview: 'Всеобщий язык Марса, три диалекта, личные имена и их тайные значения.',
            content: `
                <h2>Языки и народы Эпохи Умирания</h2>
                <p>Вся история, переданная на русском языке, в подлиннике была записана на марсианском языке — точнее, на его разговорной форме, принятой в Окхасене и Роген-Арии в последние столетия перед Исходом. Этот язык (самоназвание <strong>Maržan</strong>, «живущие») был родным для большинства марсиан.</p>

                <h3>Всеобщий язык Марса</h3>
                <p>В Эпоху Умирания марсианский язык в его окхасенском изводе был понятен на большей части обитаемой территории — от гор Фарсида до пустынь Эридании. На нём говорили в портовых тавернах и в королевском дворце, на нём составляли учёные трактаты и вырезали пророчества на глине.</p>

                <h3>Три ветви древних марсиан</h3>
                <p>В незапамятные времена племя марсиан разделилось на три основные ветви, различавшиеся по цвету крови и оттенку кожи:</p>
                <ul>
                    <li><strong>Тёмно-синие</strong> — южные моря, Эллада, Серпендида. Искусные ремесленники и мореходы.</li>
                    <li><strong>Светло-синие</strong> — западные и северные равнины, Аркадия, Эдем. Хранители древних знаний, жрецы и учёные. Жили дольше других (иногда до 150 лет).</li>
                    <li><strong>Смешанный тип</strong> — центральные области, долина Аравия. Большинство населения Окхасена и Роген-Арии.</li>
                </ul>

                <h3>Классический язык Maržan xal</h3>
                <p>Классический язык («древняя речь марсиан») был языком первых табличек, найденных в подземном храме долины Ксанфа. На нём написаны пророчества Харана. К Эпохе Умирания он уже вышел из повседневного употребления и использовался только в храмах, в Академии и при составлении важнейших документов. По своему положению он напоминал латынь в средневековой Европе.</p>

                <h3>Диалекты</h3>
                <ul>
                    <li><strong>Южный</strong> (Эллада, Серпендида). Смягчение гортанных: kh → k, gh → g. Äkha звучит как Äka, khan как kan.</li>
                    <li><strong>Западный</strong> (Аркадия, Темпе). Согласные огрубляются, окончания отбрасываются. Вместо dzen — ze, вместо okh — ok.</li>
                    <li><strong>Центральный</strong> (Окхасен, Роген-Ария). Литературная норма. На нём говорили Талин, Хевсур, большинство персонажей.</li>
                </ul>

                <h3>Личные имена</h3>
                <p>Марсианские имена — не случайный набор звуков. За каждым стоит своя история.</p>
                <ul>
                    <li><strong>Талин</strong> (Talîn) — от thal («смотреть») и суффикса -în. Буквально: «наблюдатель». Имя часто давали астрономам.</li>
                    <li><strong>Хевсур</strong> (Khevsur) — от xal («древний») и sur («глина»). Буквально: «хранитель древней глины».</li>
                    <li><strong>Йарра</strong> (Yarra) — от yar («старый, мудрый») и женского суффикса -а. «Мудрая», «старейшина».</li>
                    <li><strong>Элла</strong> (Ella) — вероятно, от Äkha-ella («вода-свет»). Имя давали девочкам, родившимся во время весеннего половодья.</li>
                    <li><strong>Араш</strong> (Arash) — от ara («путь») и суффикса -sh. «Путник», «проводник».</li>
                    <li><strong>Кан</strong> (Kan) — от kan («малый»). «Маленький», «сын». Давалось вторым сыновьям.</li>
                    <li><strong>Кор</strong> (Kor) — от kõr («острый»). Прозвище, ставшее именем.</li>
                    <li><strong>Мира</strong> (Mira) — от mīr («дар»). «Драгоценная».</li>
                    <li><strong>Аратан III</strong> (Aratan) — от ara («путь») и tan («защитник»). «Защитник пути».</li>
                    <li><strong>Ирна</strong> (Irna) — от ir («вода») и суффикса -на. «Водная».</li>
                    <li><strong>Харан</strong> (Haran) — от xar («старый») и суффикса -an. «Древний человек».</li>
                    <li><strong>Сарум</strong> (Sarūm) — от sar («основание») и суффикса -ūm. «Великое основание».</li>
                </ul>
            `
        },
        {
            id: 'h', letter: 'З', num: 8,
            title: 'Свиток Легенд',
            subtitle: 'О Кхо и Акхе, о первой тишине',
            icon: '⚡', time: '12 мин',
            preview: 'Прежде чем появились звёзды, была только Тьма и Тишина. Так родились Огонь и Вода.',
            content: `
                <h2>О начале мира, о Кхо и Акхе, и о первой тишине</h2>
                <p>Прежде чем появились звёзды, прежде чем вода нашла свои берега, а огонь — свои недра, была только <strong>Тьма</strong> — древняя, как само безвременье, и <strong>Тишина</strong> — глубже падения камня в бездонный колодец. Тьма не имела глаз, Тишина не имела ушей. Им не было дела друг до друга.</p>
                <p>Но в сердце Тишины родилось <em>Желание</em>. Не то, что люди называют любовью или голодом, а чистое, первичное стремление — <em>быть</em>. Оно росло, набухало, и наконец из него вышли двое: <strong>Кхо</strong> (Огонь) и <strong>Акха</strong> (Вода).</p>
                <p>Кхо метался во Тьме, ибо не мог стоять на месте. Он искал, что сжечь, но не находил. Акха ждала, растекаясь невидимыми струями, ибо не к чему было прикоснуться. Каждый страшился встречи: Кхо знал, что от прикосновения Воды он остынет и станет камнем; Акха знала, что от прикосновения Огня она превратится в пар и улетит навсегда.</p>
                <p>Но одиночество оказалось страшнее любой гибели.</p>
                <p>И они двинулись навстречу друг другу — не спеша, как льды в океане, и неуклонно, как падающая звезда. Когда Кхо коснулся Акхи, вскипела вода, и пар поднялся к небу, рождая облака. Когда Акха коснулась Кхо, остыл огонь, и из его застывшего сердца родился камень. <strong>Так явились небо и земля.</strong></p>

                <h3>Рождение первых тварей</h3>
                <p>Увидев, что сотворённое пусто, они обратились к новому делу. Акха сказала своё слово, и из воды родились тела. Кхо вдохнул свою суть, и в тела вселилась душа. Так появились первые твари. Те, что остались в воде, стали рыбами и ракоскорпионами. Те, что выползли на сушу, стали ящерами и — позже — марсианами. Те, что поднялись в небо, стали птицами и ветрами.</p>

                <h3>Вечная вражда</h3>
                <p>Но Кхо и Акха не могут быть вместе долго. Огонь жаждет сжигать, Вода — остужать. Их вечная вражда — это дыхание Марса. Когда они ссорятся, земля дрожит, вулканы дымятся, и моря выходят из берегов. Когда мирятся, наступает покой — но ненадолго.</p>
                <p>И сказано в древних табличках: однажды один из них победит. Если Кхо одолеет — Марс сгорит. Если Акха — замёрзнет и станет глыбой льда. Но пока они спорят, пока их дыхание смешивается в облаках, пока они рождают гейзеры — <strong>до тех пор Марс жив</strong>.</p>

                <h3>О первой войне и о рождении Фобоса и Деймоса</h3>
                <p>После сотворения мира Кхо и Акха удалились в свои чертоги. У Кхо были <strong>Арунды</strong> (Пламенные) — духи вулканов и лавовых потоков. У Акхи были <strong>Нараи</strong> (Влажные) — духи дождей, течений и приливов.</p>
                <p>Но один из Арундов, по имени <strong>Мор-Кхо</strong> («Смерть-огонь»), возгордился. Он сказал: «Мы, огненные, сильнее воды. Мы можем испарить все моря, если захотим». И он поднял восстание против Акхи.</p>
                <p>Началась война, которая длилась тысячу лет. Наконец Мор-Кхо был побеждён. Но Акха не стала его уничтожать. Она сказала: «Ты будешь вечно кружить над миром, никогда не касаясь ни воды, ни земли». И она превратила его в <strong>Фобос</strong> — маленькую, быструю луну, которая падает к планете, но никогда не упадёт. Его брата, <strong>Кхо-Деймоса</strong>, Акха превратила в <strong>Деймос</strong> — луну, которая убегает от Марса, но никогда не скроется.</p>
                <p>С тех пор Фобос и Деймос кружат над Марсом, напоминая о древней войне. Говорят, что, когда Фобос упадёт, война начнётся снова.</p>

                <h3>О даре памяти</h3>
                <p>Долгое время марсиане не знали смерти. Они умирали, но возрождались в новых телах, помня всё, что было раньше. Их память была бесконечной, как океан. Но однажды один из марсиан, по имени Ланой, возжелал власти. Он попросил Кхо забрать у марсиан бессмертие.</p>
                <p>Кхо согласился, но с условием: «Вы будете умирать, но ваша память не умрёт. Вы будете записывать её на глине, и глина будет хранить её вечно». Акха добавила: «А вода будет помнить ваши голоса».</p>
                <p>Первый, кто записал свои мысли на глине, был Ланой. Он написал: <em>«Мы смертны, но память вечна. Lān sur»</em>.</p>
            `
        },
        {
            id: 'i', letter: 'И', num: 9,
            title: 'Свиток Битв',
            subtitle: 'Войны и военные кампании',
            icon: '⚔️', time: '8 мин',
            preview: 'Шесть великих сражений Эпохи Умирания. Полководцы, потери, память.',
            content: `
                <h2>Битвы и военные кампании Эпохи Умирания</h2>
                <p>Здесь собраны сведения о вооружённых конфликтах, которые потрясали Марс в последние века перед Исходом. Хевсур не стремился прославлять войну, но считал, что память о битвах не менее важна, чем память о мире.</p>

                <h3>1. Первая война с кочевниками (64–68 гг. Э.О.)</h3>
                <p><strong>Причина:</strong> Набеги кочевых племён из леса Тиррения на восточные границы молодого Королевства.</p>
                <p><strong>Ход:</strong> Кочевники, используя быстроногих ящеров, прорвали пограничные заставы и разграбили несколько деревень. Сарум II лично возглавил контратаку, применив тяжёлую кавалерию.</p>
                <p><strong>Потери:</strong> У Эдема — около 300 воинов; у кочевников — более 800.</p>

                <h3>2. Битва при Ксанфской переправе (1643 г.)</h3>
                <p><strong>Причина:</strong> Попытка Утопии захватить контроль над рекой Ксанф — главной водной артерией.</p>
                <p><strong>Ход:</strong> Кан-Ут переправил через реку 5000 воинов. Битва длилась два дня. На второй день эдемская кавалерия обошла фланг противника и ударила с тыла. Кан-Ут погиб в схватке.</p>
                <p><strong>Потери:</strong> Эдем — 1200; Утопия — более 3000.</p>
                <p><strong>Память:</strong> На месте переправы воздвигнут памятный камень с именами павших. Место стало проклятым: местные верили, что по ночам там бродят тени убитых.</p>

                <h3>3. Торговая война с Серпендидой (1670–1675 гг.)</h3>
                <p><strong>Причина:</strong> Спор о пошлинах за проход купеческих кораблей через проливы.</p>
                <p><strong>Ход:</strong> Эдем блокировал морские пути, захватив несколько ключевых островов. Серпендида ответила пиратскими рейдами.</p>
                <p><strong>Исход:</strong> Политическая победа Эдема. Эта война запомнилась как «Война ржавых цепей».</p>

                <h3>4. Вторжение Тар-Ары в Эдем (2722 г.)</h3>
                <p><strong>Причина:</strong> Кочевники Эридании, спасаясь от засухи, двинулись на север, в плодородные земли долины Аравия.</p>
                <p><strong>Ход:</strong> Тар-Ара трижды вступал в бой. В последнем сражении он погиб, но его дочь Ара-младшая провела остатки каравана в пещеры.</p>
                <p><strong>Потери:</strong> Караван Тар-Ары — около 2000 человек; со стороны Эдема — около 500.</p>
                <blockquote>Здесь пал последний князь пустыни. Он не враг. Он просто искал воду.<br>— Хевсур о гибели Тар-Ары</blockquote>

                <h3>5. Мятеж в Роген-Арии (2735 г.)</h3>
                <p><strong>Причина:</strong> Голод и отчаяние среди жителей столицы, которых не включили в списки отлетающих.</p>
                <p><strong>Ход:</strong> Мятежники подожгли два склада. Король Аратан III лично возглавил отряд и заблокировал выходы из порта.</p>
                <p><strong>Потери:</strong> 300 мятежников, 20 гвардейцев.</p>

                <h3>6. Оборона космодрома (2739 г.)</h3>
                <p><strong>Причина:</strong> Саботаж — группа отчаявшихся людей, не попавших в списки, попыталась уничтожить корабли.</p>
                <p><strong>Ход:</strong> Диверсанты взорвали топливный бак у беспилотника. Охрана открыла огонь.</p>
                <p><strong>Потери:</strong> 15 охранников, 10 добровольцев, все 50 диверсантов.</p>
                <blockquote>Они защищали не корабли. Они защищали надежду.<br>— Хевсур об обороне космодрома</blockquote>
            `
        },
        {
            id: 'j', letter: 'К', num: 10,
            title: 'Свиток Земель',
            subtitle: 'География Марса в Эпоху Умирания',
            icon: '🗺️', time: '11 мин',
            preview: 'Моря, реки, города, каналы. Мир, ушедший под лёд.',
            content: `
                <h2>География Марса в Эпоху Умирания</h2>
                <p>Этот раздел описывает поверхность Марса в том виде, в каком она существовала до последних извержений и замерзания морей. Описание основано на табличках, картах, найденных в подземном храме, а также на геологических данных Хевсура.</p>

                <h3>Ацидалийское море</h3>
                <p>Один из самых больших водоёмов позднего Марса. Расположено в северном полушарии, площадь в период расцвета достигала <strong>1,5 млн км²</strong> (сравнимо со Средиземным морем). Море было солёным (солёность около 35‰), но благодаря притоку пресных вод оставалось пригодным для жизни.</p>
                <p>Название происходит от древнего слова <em>acidāli</em> — «солёная вода» (по другой версии — от имени богини Ацидалии, местного варианта Араксис). В табличках из Серпентиды море упоминается как «Великая солёная лужа».</p>
                <p>Начиная с 2650 г. уровень моря начал падать. К 2738 г. лёд сковал прибрежные воды у Окхасена, а в 2740 г. море замёрзло почти полностью. Остались лишь небольшие полыньи над геотермальными источниками.</p>

                <h3>Город Окхасен</h3>
                <p>Основан в 47 г. Э.О. переселенцами из Серпентиды. Название происходит от слов «okh» (город) и «asen» (гавань). Первоначально — рыбацкая деревня из десятка хижин. К 500 г. стал крупнейшим портом западной окраины Королевства.</p>
                <p>В 712 г. была основана международная <strong>Академия Окхасена</strong> — главное научное учреждение Марса. В ней хранились тысячи табличек, велись астрономические наблюдения, готовились инженеры и врачи.</p>
                <p>С началом Эпохи Умирания Окхасен потерял своё значение. К 2739 г. в городе оставалось около трёх тысяч человек. В 2740 г. город был разрушен землетрясениями и пожарами. Академия сгорела, архив — разграблен.</p>

                <h3>Столица Роген-Ария</h3>
                <p>Находилась на северном берегу Ацидалийского моря, в долине Эдем, у подножия гор Фарсида. Название переводится как <em>«Врата солнца»</em> (от слов «rogen» — врата, и «aria» — солнце).</p>
                <p>Город был заложен Сарумом II в 1 г. Э.О. К 200 г. стал столицей Королевства — здесь находился дворец королей, храм Араксис, Совет старейшин. Славился базальтовыми дворцами, подземными хранилищами воды и пирамидами-обсерваториями.</p>
                <p>Роген-Ария пострадала от землетрясений раньше Окхасена, так как была ближе к вулканам Фарсиды. Уже в 2720 г. часть зданий рухнула. К 2735 г. город был практически покинут.</p>

                <h3>Долина Аравия</h3>
                <p>Обширная низменность к востоку от Роген-Арии, между горами Фарсида и Ацидалийским морем. Почвы, богатые оксидами железа и марганца, были плодородны при условии орошения.</p>
                <p>В Эпоху Расцвета долина давала до <strong>70% зерна</strong> всего Королевства. Здесь выращивали ячмень, полбу, фиолетовые бобовые и масличные растения. Урожаи дважды в год позволяли кормить всё Королевство.</p>
                <p>С 2600 г. урожаи стали падать. К 2730-м годам поля отравлялись сернистым газом. К 2738 г. долина превратилась в выжженную пустыню.</p>

                <h3>Горы Фарсида</h3>
                <p>Обширное вулканическое плато, возвышающееся на 10–12 км над средним уровнем. На нём расположены четыре гигантских вулкана: <strong>Олимп</strong> (21 км), <strong>Арсия</strong>, <strong>Павлина</strong> и <strong>Аскрийская гора</strong>.</p>
                <p>Фарсида была местом последнего убежища для марсиан. В её недрах существовала система пещер и геотермальных источников. Хевсур провёл последние годы жизни в одной из таких пещер.</p>
                <p>Активизация вулканов началась в 2680 г. К 2730 г. все четыре вулкана извергались почти непрерывно.</p>

                <h3>Долина Маринера</h3>
                <p>Гигантский каньон, образованный в Гесперийскую эпоху. Глубина достигает 7 км, ширина — до 200 км, длина — более 4000 км. В Эпоху Основания в долине текли реки, но к началу письменной истории они пересохли.</p>
                <p>В Эпоху Умирания в долине стали выделяться серные газы и пар, что сделало её практически непроходимой.</p>

                <h3>Система каналов</h3>
                <p>Прорыта в первые века Эпохи Основания. Главный канал назывался <em>«каналом Сарума»</em>. Общая протяжённость каналов достигала <strong>10 000 км</strong>. Каналы были вырублены в базальте и облицованы водонепроницаемой глиной.</p>
                <p>С началом землетрясений каналы разрушались. Последний крупный ремонт был произведён в 2650 г. при короле Термане.</p>
            `
        },
        {
            id: 'k', letter: 'Л', num: 11,
            title: 'Свиток Письмён',
            subtitle: 'Пиктограммы Среднего Амазония',
            icon: '🎨', time: '7 мин',
            preview: 'Первые рисунки на глине. Круги, спирали, фигуры — язык до языка.',
            content: `
                <h2>Пиктограммы Среднего Амазония</h2>
                <p>Ниже приведено краткое изложение отдельного свитка Хевсура, который он назвал <em>«Глина, не знавшая слов»</em>. В нём историк собрал и подробно разобрал все таблички с пиктограммами, найденные в пещерах Эллады, Аравии, острова Утопии и долины Ксанфа.</p>
                <p>Эти таблички относятся к Среднему Амазонию (1,0 млрд – 500 тыс. лет назад) — эпохе, когда письменности ещё не существовало, но первые попытки запечатлеть мысль уже появились.</p>

                <h3>Что такое пиктограммы</h3>
                <p>Пиктограммы — это рисунки на глине, которые не являются буквами или словами в нашем понимании. Каждый такой рисунок обозначал целое понятие: «солнце», «охота», «смерть», «вода».</p>
                <p>Древние марсиане выдавливали или выцарапывали их на сырой глине острыми палочками, а затем обжигали таблички на солнце или в примитивных печах.</p>

                <h3>Где находили пиктограммы</h3>
                <ul>
                    <li><strong>Пещеры Эллады</strong> (южное побережье) — более 200 фрагментов. Сцены охоты на ракоскорпионов, ритуальные танцы.</li>
                    <li><strong>Подземные убежища Аравии</strong> (северные равнины) — сильно повреждены временем.</li>
                    <li><strong>Долина Ксанфа</strong> (близ Окхасена) — отличное состояние. Изображения Фобоса, Деймоса и схематичные календари.</li>
                    <li><strong>Остров Утопия</strong> — загадочная спираль и шесть фигур в круге.</li>
                </ul>

                <h3>Словарь пиктограмм (по Хевсуру)</h3>
                <table>
                    <tr><th>Пиктограмма</th><th>Значение</th></tr>
                    <tr><td>Круг с точкой в центре</td><td>солнце / жизнь</td></tr>
                    <tr><td>Волнистая линия</td><td>вода / море / река</td></tr>
                    <tr><td>Треугольник на вершине</td><td>гора / вулкан</td></tr>
                    <tr><td>Горизонтальная линия</td><td>земля / горизонт</td></tr>
                    <tr><td>Две переплетённые линии</td><td>союз / брак / договор</td></tr>
                    <tr><td>Спираль, закрученная внутрь</td><td>время / вечность / цикл</td></tr>
                    <tr><td>Фигура с поднятыми руками</td><td>человек / вождь / шаман</td></tr>
                    <tr><td>Лодка с шестью вёслами</td><td>путешествие / переселение</td></tr>
                    <tr><td>Звезда с лучами</td><td>Фобос и Деймос</td></tr>
                </table>

                <h3>Что рассказывают пиктограммы</h3>
                <p><strong>Хозяйство.</strong> Основными занятиями были охота на гигантских ракоскорпионов (длина некоторых достигала 2–3 метров) и собирательство. На табличках из Эллады изображены сети и ловушки.</p>
                <p><strong>Ритуалы.</strong> Часто встречаются сцены танцев вокруг костра, фигуры с поднятыми руками, а также круги, которые, вероятно, обозначали священные места.</p>
                <p><strong>Социальная иерархия.</strong> На нескольких табличках одна фигура заметно выше остальных, с более длинными руками и детально прорисованными пальцами. Хевсур предположил, что это вождь или шаман.</p>
                <p><strong>Астрономия.</strong> Таблички из Утопии содержат схематичные изображения Фобоса и Деймоса в разных фазах. Хевсур насчитал 22 различных фазы, что соответствует числу месяцев в марсианском году.</p>

                <blockquote>Я не знаю, что это значит. Но я записываю даже то, что не понимаю. Ибо понимание придёт потом, а табличка может рассыпаться.<br>— Хевсур, приписка к Свитку пиктограмм</blockquote>
            `
        },
        {
            id: 'l', letter: 'М', num: 12,
            title: 'Свиток Слов',
            subtitle: 'Словарь языка Marzān',
            icon: '📖', time: '9 мин',
            preview: 'Термины, боги, устойчивые фразы. Язык, на котором говорили жители умирающего Марса.',
            content: `
                <h2>Словарь языка Marzān</h2>
                <p>В глиняных табличках встречается множество слов и выражений, которые не всегда можно понять из контекста. Ниже собраны основные термины, имена богов, устойчивые фразы и грамматические особенности языка, на котором говорили марсиане в последние века Эпохи Умирания.</p>

                <h3>Основные слова</h3>
                <table>
                    <tr><th>Слово</th><th>Значение</th></tr>
                    <tr><td>Ākha</td><td>вода, море, жидкость; имя богини</td></tr>
                    <tr><td>Ān</td><td>отрицательная частица: «не», «без»</td></tr>
                    <tr><td>Ān-mōr</td><td>приют, убежище; буквально «место, где нет смерти»</td></tr>
                    <tr><td>Araxis</td><td>имя богини воды и моря</td></tr>
                    <tr><td>Dzen</td><td>звезда, небесное тело; свет, сияние</td></tr>
                    <tr><td>Hesperia</td><td>древнее название западных земель Марса</td></tr>
                    <tr><td>Khō</td><td>огонь, тепло, энергия; вулканическая активность</td></tr>
                    <tr><td>Ksanf</td><td>река Ксанф</td></tr>
                    <tr><td>Lān</td><td>память, воспоминание; глина как носитель памяти</td></tr>
                    <tr><td>Mar</td><td>жизнь, живое существо</td></tr>
                    <tr><td>Marzān</td><td>марсианин</td></tr>
                    <tr><td>Mōr</td><td>смерть; в поэтическом смысле — «угасающая звезда»</td></tr>
                    <tr><td>Okh</td><td>город, поселение</td></tr>
                    <tr><td>San</td><td>земля, почва, твердь</td></tr>
                    <tr><td>Sur</td><td>глина, глиняная табличка</td></tr>
                    <tr><td>Thal</td><td>смотреть, глядеть, созерцать</td></tr>
                    <tr><td>Tren</td><td>три, трое; приставка тройственности</td></tr>
                    <tr><td>Xalmar</td><td>древний, предок, старейшина</td></tr>
                </table>

                <h3>Часто встречающиеся фразы</h3>
                <table>
                    <tr><th>Фраза</th><th>Перевод</th></tr>
                    <tr><td>Lān sur</td><td>Глина помнит</td></tr>
                    <tr><td>Khō mōr, dzen mōr, lān ān mōr</td><td>Огонь умрёт, звезда умрёт, память не умрёт</td></tr>
                    <tr><td>Dzen thal mar, lān sur</td><td>Смотри на звёзды жизни, глина помнит</td></tr>
                    <tr><td>Ksanf lān, okh ākha thal</td><td>Ксанф помнит, Окхасен смотрит на море</td></tr>
                    <tr><td>Xalmar thal</td><td>Древние смотрят (формула уважения к предкам)</td></tr>
                    <tr><td>Okh sen ākha, dzen thal marzān</td><td>Окхасен смотрит на море, марсиане смотрят на звёзды</td></tr>
                </table>

                <h3>Грамматические правила</h3>
                <ol>
                    <li><strong>Порядок слов</strong> — строгий SOV (подлежащее — дополнение — сказуемое).</li>
                    <li><strong>Отрицание</strong> — частица <em>ān</em> ставится после глагола. Пример: <em>lān ān mōr</em> («память не умирает»).</li>
                    <li><strong>Имена богов</strong> — употребляются без артикля, часто как прямое обращение.</li>
                    <li><strong>Сложные слова</strong> — образуются соединением корней, причём главный корень стоит в конце.</li>
                    <li><strong>Глагольные формы</strong> — различают императив (<em>thal</em> — «смотри!») и индикатив (<em>thal-an</em> — «смотрит»).</li>
                    <li><strong>Притяжательность</strong> — выражается соположением: <em>Talīn okh</em> («дом Талина»).</li>
                </ol>

                <h3>Боги и мифологические существа</h3>
                <p><strong>Акха</strong> (Äkha) — богиня воды, моря, влаги. Второе имя богини Араксис. Согласно легендам, она родилась из желания Тишины и вместе с Кхо создала мир.</p>
                <p><strong>Араксис</strong> (Araksis) — полное имя богини воды, покровительницы морей и рек. Её статуя в храме Окхасена была вырезана из обсидиана. Жертвы ей приносили ракушками, кусками обсидиана и засушенными морскими звёздами.</p>
                <p><strong>Кхо</strong> (Khō) — бог огня, вулканов, энергии. Согласно мифу, он метал копьё, и на месте падения возникали вулканы. Его вечная вражда с Акхой объясняет землетрясения и извержения.</p>
                <p><strong>Тишина</strong> (Mōr sen) — в мифологии первоначальное состояние мира, из которого родились Кхо и Акха. В пророчествах слово «тишина» имеет двойное значение: либо вечный покой после смерти, либо пустота, в которой можно начать заново.</p>
            `
        }
    ];

    const container = document.getElementById('scr-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let profile = null;
    let readScrolls = new Set();
    let activeScroll = null;
    let unlockedScrolls = new Set();

    // ============================================================
    // Тост
    // ============================================================
    function showToast(msg, type = 'info') {
        const t = document.createElement('div');
        t.className = 'scr-toast ' + type;
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(() => { t.classList.add('show'); });
        setTimeout(() => {
            t.classList.remove('show');
            setTimeout(() => t.remove(), 400);
        }, 2800);
    }

    // ============================================================
    // Загрузка прогресса
    // ============================================================
    async function loadData() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;
        if (!currentUser) return;

        try {
            const { data: p } = await client.from('profiles').select('*').eq('user_id', currentUser.id).single();
            profile = p;

            const { data: read } = await client.from('user_scrolls_read')
                .select('scroll_id').eq('user_id', currentUser.id);
            readScrolls = new Set((read || []).map(r => r.scroll_id));

            // Разблокировка: первый всегда доступен, остальные — после прочтения предыдущего
            SCROLLS.forEach((s, i) => {
                if (i === 0) { unlockedScrolls.add(s.id); return; }
                if (readScrolls.has(SCROLLS[i - 1].id)) unlockedScrolls.add(s.id);
            });
        } catch (e) {
            console.warn('Supabase error:', e);
        }
    }

    // ============================================================
    // Читать свиток
    // ============================================================
    async function markAsRead(scrollId) {
        if (!currentUser || readScrolls.has(scrollId)) return;

        try {
            await client.from('user_scrolls_read').insert([{
                user_id: currentUser.id,
                scroll_id: scrollId
            }]);
            readScrolls.add(scrollId);

            // Разблокировать следующий
            const idx = SCROLLS.findIndex(s => s.id === scrollId);
            if (idx >= 0 && SCROLLS[idx + 1]) {
                unlockedScrolls.add(SCROLLS[idx + 1].id);
            }

            // +15 XP
            const { data: p } = await client.from('profiles')
                .select('experience').eq('user_id', currentUser.id).single();
            const newXP = (p?.experience || 0) + 15;
            await client.from('profiles').update({ experience: newXP }).eq('user_id', currentUser.id);

            showToast('📜 Свиток прочитан! +15 XP', 'success');

            // Разлёт монеток
            spawnCoins();

            render();
        } catch (e) {
            console.warn('Ошибка сохранения:', e);
        }
    }

    // ============================================================
    // Монетки
    // ============================================================
    function spawnCoins() {
        const emojis = ['⭐', '✨', '💰', '📜'];
        for (let i = 0; i < 8; i++) {
            const coin = document.createElement('div');
            coin.className = 'scr-coin';
            coin.textContent = emojis[i % emojis.length];
            coin.style.left = (window.innerWidth / 2 + (Math.random() - 0.5) * 200) + 'px';
            coin.style.top = (window.innerHeight / 2 + (Math.random() - 0.5) * 100) + 'px';
            coin.style.animationDelay = (Math.random() * 0.3) + 's';
            document.body.appendChild(coin);
            setTimeout(() => coin.remove(), 1500);
        }
    }

    // ============================================================
    // Открыть свиток
    // ============================================================
    function openScroll(scroll) {
        if (!currentUser) {
            showToast('Войдите, чтобы читать свитки', 'warning');
            setTimeout(() => { window.location.href = '/login/'; }, 1200);
            return;
        }
        if (!unlockedScrolls.has(scroll.id)) {
            showToast('🔒 Сначала прочитайте предыдущий свиток', 'warning');
            return;
        }

        activeScroll = scroll;

        const overlay = document.createElement('div');
        overlay.className = 'scr-reader-overlay';
        overlay.innerHTML = `
            <div class="scr-reader">
                <button class="scr-reader-close" onclick="scrClose()">✕</button>
                <div class="scr-reader-header">
                    <div class="scr-reader-icon">${scroll.icon}</div>
                    <h2 class="scr-reader-title">Свиток ${scroll.letter} · ${scroll.title}</h2>
                    <p class="scr-reader-subtitle">${scroll.subtitle}</p>
                </div>
                <div class="scr-reader-body" id="scr-reader-body">
                    <div class="scr-reader-text">${scroll.content}</div>
                </div>
                <div class="scr-reader-footer">
                    <button class="scr-btn" onclick="scrClose()">← Закрыть</button>
                    <button class="scr-btn success" onclick="scrMarkRead('${scroll.id}')" id="scr-mark-btn">
                        ${readScrolls.has(scroll.id) ? '✓ Прочитано' : '📖 Отметить как прочитанное'}
                    </button>
                    <div class="scr-reader-progress">
                        <span id="scr-progress-text">0%</span>
                        <div class="scr-reader-progress-bar">
                            <div class="scr-reader-progress-fill" id="scr-progress-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const body = overlay.querySelector('#scr-reader-body');
        const fill = overlay.querySelector('#scr-progress-fill');
        const text = overlay.querySelector('#scr-progress-text');
        let alreadyMarked = readScrolls.has(scroll.id);

        function updateProgress() {
            const total = body.scrollHeight - body.clientHeight;
            const current = body.scrollTop;
            const percent = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 100;
            fill.style.width = percent + '%';
            text.textContent = percent + '%';

            if (percent > 75 && !alreadyMarked && currentUser) {
                alreadyMarked = true;
                markAsRead(scroll.id);
                const btn = overlay.querySelector('#scr-mark-btn');
                if (btn) {
                    btn.textContent = '✓ Прочитано';
                    btn.classList.add('success');
                }
            }
        }

        body.addEventListener('scroll', updateProgress, { passive: true });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) scrClose();
        });

        // Пылинки
        for (let i = 0; i < 12; i++) {
            const dust = document.createElement('div');
            dust.className = 'scr-dust';
            dust.style.left = Math.random() * 100 + '%';
            dust.style.top = Math.random() * 100 + '%';
            dust.style.animationDelay = Math.random() * 3 + 's';
            overlay.appendChild(dust);
        }

        setTimeout(updateProgress, 150);
    }

    // ============================================================
    // Рендер
    // ============================================================
    function render() {
        const total = SCROLLS.length;
        const done = readScrolls.size;
        const percent = total > 0 ? Math.round((done / total) * 100) : 0;

        container.innerHTML = `
            <div class="scr-hero scr-fade">
                <div class="scr-hero-stars" id="scr-hero-stars"></div>
                <div class="scr-hero-content">
                    <div class="scr-hero-icon">📜</div>
                    <h1 class="scr-hero-title">Свитки Хевсура</h1>
                    <p class="scr-hero-sub">«Lān sur» — глина помнит. Двенадцать свитков о мире, ушедшем под лёд.</p>

                    <div class="scr-stats">
                        <div class="scr-stat">
                            <div class="scr-stat-value">${done}</div>
                            <div class="scr-stat-label">Прочитано</div>
                        </div>
                        <div class="scr-stat">
                            <div class="scr-stat-value">${total}</div>
                            <div class="scr-stat-label">Всего свитков</div>
                        </div>
                        <div class="scr-stat">
                            <div class="scr-stat-value">${done * 15}</div>
                            <div class="scr-stat-label">XP получено</div>
                        </div>
                        <div class="scr-stat">
                            <div class="scr-stat-value">${percent}%</div>
                            <div class="scr-stat-label">Прогресс</div>
                        </div>
                    </div>

                    <div class="scr-hero-progress">
                        <div class="scr-progress-info">
                            <span>📖 Путь Хранителя</span>
                            <span>${percent}%</span>
                        </div>
                        <div class="scr-progress-bar">
                            <div class="scr-progress-fill" style="width: ${percent}%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="scr-grid">
                ${SCROLLS.map((s, i) => {
                    const isRead = readScrolls.has(s.id);
                    const isLocked = !unlockedScrolls.has(s.id) && currentUser;
                    const cls = `scr-card ${isRead ? 'read' : ''} ${isLocked ? 'locked' : ''}`;
                    return `
                        <div class="${cls} scr-fade" style="animation-delay: ${i * 0.05}s;" onclick="scrOpen('${s.id}')">
                            <div class="scr-card-num">${String(s.num).padStart(2, '0')}</div>
                            ${isLocked ? '<div class="scr-lock-badge">🔒</div>' : ''}
                            <div class="scr-card-header">
                                <div class="scr-card-icon">${isLocked ? '🔒' : s.letter}</div>
                                <div class="scr-card-info">
                                    <h3 class="scr-card-title">${s.title}</h3>
                                    <div class="scr-card-subtitle">${s.subtitle}</div>
                                </div>
                            </div>
                            <p class="scr-card-desc">${isLocked ? 'Прочитайте предыдущий свиток, чтобы разблокировать' : s.preview}</p>
                            <div class="scr-card-footer">
                                <span class="scr-card-status">
                                    ${isRead ? '✓ Прочитано' : (isLocked ? '🔒 Закрыто' : '📖 Доступно')}
                                </span>
                                <span class="scr-card-time">⏱️ ${s.time}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            ${!currentUser ? `
                <div class="scr-empty">
                    <div class="scr-empty-icon">🔐</div>
                    <div class="scr-empty-title">Войдите, чтобы открыть свитки и сохранить прогресс</div>
                    <a href="/login/" class="scr-btn primary" style="margin-top:18px; display:inline-block; text-decoration:none;">Войти</a>
                </div>
            ` : ''}
        `;

        // Звёзды в hero
        const starsBox = document.getElementById('scr-hero-stars');
        if (starsBox) {
            for (let i = 0; i < 25; i++) {
                const s = document.createElement('div');
                s.style.cssText = `position:absolute; width:${1 + Math.random()*2}px; height:${1 + Math.random()*2}px; background:#fff; border-radius:50%; left:${Math.random()*100}%; top:${Math.random()*100}%; opacity:0.5; animation:scrStarTwinkle ${2 + Math.random()*3}s ease-in-out infinite; animation-delay:${Math.random()*3}s;`;
                starsBox.appendChild(s);
            }
        }
    }

    // ============================================================
    // Экспорт
    // ============================================================
    window.scrOpen = function(id) {
        const scroll = SCROLLS.find(s => s.id === id);
        if (scroll) openScroll(scroll);
    };

    window.scrClose = function() {
        const overlay = document.querySelector('.scr-reader-overlay');
        if (overlay) {
            overlay.style.animation = 'scrFadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 250);
        }
        activeScroll = null;
    };

    window.scrMarkRead = async function(id) {
        await markAsRead(id);
        const btn = document.getElementById('scr-mark-btn');
        if (btn) {
            btn.textContent = '✓ Прочитано';
            btn.classList.add('success');
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.scrClose();
    });

    // ============================================================
    // Старт
    // ============================================================
    async function init() {
        try {
            await loadData();
        } catch (e) {
            console.warn('Init error:', e);
        }
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
