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
   СВИТКИ ХЕВСУРА — финальная версия
   ============================================================ */
:root {
    --parchment: #f5ecd7;
    --parchment-dark: #e8dcb8;
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
@keyframes scrFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes scrUnroll { 0% { transform: scaleY(0); opacity: 0; } 100% { transform: scaleY(1); opacity: 1; } }
@keyframes scrDust { 0% { transform: translateY(0) rotate(0deg); opacity: 0.7; } 100% { transform: translateY(-40px) rotate(360deg); opacity: 0; } }
@keyframes scrSparkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1); } }
@keyframes scrLockPulse { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } }
@keyframes scrStarTwinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
@keyframes scrProgressShine { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes scrCoin { 0% { transform: translateY(0) rotate(0); opacity: 1; } 100% { transform: translateY(-100px) rotate(720deg); opacity: 0; } }

/* Финальные анимации */
@keyframes scrCrownFloat { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-15px) rotate(3deg); } }
@keyframes scrCrownGlow { 0%, 100% { filter: drop-shadow(0 0 20px rgba(243, 156, 18, 0.6)); } 50% { filter: drop-shadow(0 0 50px rgba(243, 156, 18, 1)); } }
@keyframes scrFirework { 0% { transform: translate(0, 0) scale(0); opacity: 1; } 100% { transform: translate(var(--fx), var(--fy)) scale(1.2); opacity: 0; } }
@keyframes scrRiseUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scrTitleGlow {
    0%, 100% { text-shadow: 0 0 20px rgba(243, 156, 18, 0.6), 0 2px 4px rgba(0,0,0,0.4); }
    50% { text-shadow: 0 0 40px rgba(243, 156, 18, 1), 0 0 80px rgba(243, 156, 18, 0.5), 0 2px 4px rgba(0,0,0,0.4); }
}
@keyframes scrSealRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes scrShine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
@keyframes scrBreathe { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.08); opacity: 1; } }

.scr-fade { animation: scrFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

#scr-app a { text-decoration: none !important; border-bottom: none !important; }

/* Скрытие sidebar при открытой модалке */
body.scr-modal-open .wy-nav-side,
body.scr-modal-open .wy-side-nav-search,
body.scr-modal-open .rst-versions,
body.scr-modal-open aside,
body.scr-modal-open nav.wy-nav-side {
    display: none !important;
}
body.scr-modal-open .wy-nav-content-wrap,
body.scr-modal-open .wy-nav-content,
body.scr-modal-open .rst-content {
    margin-left: 0 !important;
    max-width: 100% !important;
}
body.scr-modal-open {
    overflow: hidden !important;
}

/* HERO */
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
.scr-hero-stars { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.scr-hero-content { position: relative; z-index: 2; text-align: center; }
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

/* GRID */
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
    box-shadow: 0 6px 16px rgba(74, 55, 40, 0.18), inset 0 0 60px rgba(184, 152, 88, 0.12);
    border: 1px solid rgba(139, 111, 74, 0.35);
    display: flex;
    flex-direction: column;
    min-height: 250px;
}
.scr-card::before, .scr-card::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 14px;
    background: linear-gradient(180deg, #8b6f4a, #6b4f37 60%, #4a3728);
    z-index: 3;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.scr-card::before { top: 0; border-radius: 14px 14px 0 0; }
.scr-card::after { bottom: 0; border-radius: 0 0 14px 14px; }
.scr-card:hover {
    transform: translateY(-8px) rotate(-0.5deg);
    box-shadow: 0 24px 52px -14px rgba(74, 55, 40, 0.45), inset 0 0 80px rgba(184, 152, 88, 0.18);
}
.scr-card.read {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border-color: rgba(39, 174, 96, 0.4);
}
.scr-card.read::before, .scr-card.read::after {
    background: linear-gradient(180deg, #27ae60, #16a085 60%, #0e6e55);
}
.scr-card.locked {
    background: linear-gradient(135deg, #d8d4c8 0%, #c4bfb0 100%);
    cursor: not-allowed;
    opacity: 0.85;
}
.scr-card.locked::before, .scr-card.locked::after {
    background: linear-gradient(180deg, #8a8578, #6b6760 60%, #4a4843);
}
.scr-card.locked:hover { transform: translateY(-2px); }
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
}
.scr-card.read .scr-card-icon { background: linear-gradient(135deg, #27ae60, #16a085); }
.scr-card:hover .scr-card-icon { transform: scale(1.08) rotate(-4deg); }
.scr-card-info { flex: 1; min-width: 0; }
.scr-card-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 4px 0;
    font-family: 'Georgia', serif;
}
.scr-card-subtitle { font-size: 0.78rem; color: var(--ink-light); font-style: italic; }
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
.scr-card.read .scr-card-status { background: rgba(39, 174, 96, 0.15); color: #27ae60; }
.scr-card.locked .scr-card-status { background: rgba(139, 111, 74, 0.2); color: #6b6760; }
.scr-card-time { font-size: 0.72rem; color: #8b6f4a; display: flex; align-items: center; gap: 4px; }
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

/* МОДАЛКА */
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
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.7), inset 0 0 100px rgba(184, 152, 88, 0.15);
    border: 2px solid #8b6f4a;
    animation: scrUnroll 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: top center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.scr-reader::before, .scr-reader::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
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
}
.scr-reader-subtitle { font-size: 0.92rem; color: var(--ink-light); font-style: italic; }
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
.scr-reader-close:hover { background: rgba(139, 111, 74, 0.3); transform: rotate(90deg); }
.scr-reader-body {
    padding: 32px 44px;
    overflow-y: auto;
    flex: 1;
    position: relative;
    z-index: 2;
    scroll-behavior: smooth;
}
.scr-reader-body::-webkit-scrollbar { width: 10px; }
.scr-reader-body::-webkit-scrollbar-track { background: rgba(139, 111, 74, 0.1); border-radius: 5px; }
.scr-reader-body::-webkit-scrollbar-thumb { background: rgba(139, 111, 74, 0.45); border-radius: 5px; }
.scr-reader-body::-webkit-scrollbar-thumb:hover { background: rgba(139, 111, 74, 0.65); }

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
.scr-reader-text ul, .scr-reader-text ol { margin: 0 0 16px; padding-left: 28px; }
.scr-reader-text li { margin-bottom: 8px; line-height: 1.75; }
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
.scr-btn.success {
    background: linear-gradient(135deg, #27ae60, #16a085);
    border-color: #27ae60;
    color: #fff;
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

/* Пылинки */
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
.scr-coin {
    position: fixed;
    font-size: 1.5rem;
    pointer-events: none;
    z-index: 999999;
    animation: scrCoin 1.2s ease-out forwards;
}

/* ============================================================
   ФИНАЛЬНЫЙ ЭКРАН — после всех свитков
   ============================================================ */
.scr-finale-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(circle at 50% 40%, rgba(74, 55, 40, 0.95) 0%, rgba(15, 10, 5, 0.98) 70%),
        linear-gradient(135deg, #1a0f05 0%, #0a0500 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow: hidden;
    animation: scrFadeIn 0.6s ease;
}
.scr-finale-fireworks {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}
.scr-finale-firework {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: radial-gradient(circle, #fff, #f39c12 60%, transparent 100%);
    animation: scrFirework 1.8s ease-out forwards;
}
.scr-finale-content {
    position: relative;
    z-index: 2;
    max-width: 640px;
    width: 100%;
    text-align: center;
    color: var(--parchment);
}
.scr-finale-crown {
    font-size: 6rem;
    line-height: 1;
    margin-bottom: 20px;
    display: inline-block;
    animation: scrCrownFloat 3s ease-in-out infinite, scrCrownGlow 2s ease-in-out infinite;
}
.scr-finale-seal {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    opacity: 0.4;
    animation: scrSealRotate 30s linear infinite;
}
.scr-finale-title {
    font-size: 2.4rem;
    font-weight: 900;
    margin: 0 0 16px;
    font-family: 'Georgia', serif;
    background: linear-gradient(90deg, #f39c12, #ffd97a, #f39c12, #ffd97a, #f39c12);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: scrShine 4s linear infinite, scrTitleGlow 3s ease-in-out infinite;
    letter-spacing: -0.5px;
}
.scr-finale-subtitle {
    font-size: 1.1rem;
    font-style: italic;
    opacity: 0.85;
    margin: 0 0 28px;
    letter-spacing: 0.3px;
}
.scr-finale-text {
    font-size: 1rem;
    line-height: 1.85;
    text-align: left;
    font-family: 'Georgia', serif;
    background: rgba(245, 236, 215, 0.08);
    border: 1px solid rgba(184, 134, 11, 0.35);
    border-radius: 16px;
    padding: 26px 30px;
    margin-bottom: 24px;
    backdrop-filter: blur(8px);
    animation: scrRiseUp 0.8s ease both;
    animation-delay: 0.3s;
}
.scr-finale-text p {
    margin: 0 0 14px;
    text-indent: 22px;
    color: #e8dcb8;
}
.scr-finale-text p:first-child { text-indent: 0; }
.scr-finale-text p:first-child::first-letter {
    font-size: 3rem;
    float: left;
    line-height: 0.9;
    margin: 4px 10px 0 0;
    color: var(--gold-light);
    font-weight: 800;
    text-shadow: 0 0 20px rgba(243, 156, 18, 0.7);
}
.scr-finale-text em { color: var(--gold-light); font-weight: 600; font-style: italic; }
.scr-finale-text strong { color: #ffd97a; font-weight: 800; }

.scr-finale-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 26px;
    animation: scrRiseUp 0.8s ease both;
    animation-delay: 0.5s;
}
.scr-finale-stat {
    background: rgba(184, 134, 11, 0.12);
    border: 1px solid rgba(184, 134, 11, 0.4);
    border-radius: 12px;
    padding: 14px 10px;
    text-align: center;
}
.scr-finale-stat-value {
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--gold-light);
    line-height: 1;
    text-shadow: 0 0 20px var(--gold-glow);
}
.scr-finale-stat-label {
    font-size: 0.7rem;
    opacity: 0.75;
    margin-top: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.scr-finale-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    animation: scrRiseUp 0.8s ease both;
    animation-delay: 0.7s;
}
.scr-finale-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 30px;
    font-size: 0.92rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
    text-decoration: none !important;
    border: 2px solid var(--gold);
    background: transparent;
    color: var(--gold-light);
}
.scr-finale-btn:hover {
    background: var(--gold);
    color: var(--wood-dark);
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(243, 156, 18, 0.4);
}
.scr-finale-btn.primary {
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--wood-dark);
    border-color: transparent;
    box-shadow: 0 8px 24px rgba(243, 156, 18, 0.4);
}
.scr-finale-btn.primary:hover {
    box-shadow: 0 14px 32px rgba(243, 156, 18, 0.6);
}

.scr-finale-seal-final {
    margin-top: 30px;
    opacity: 0.5;
    font-size: 0.8rem;
    font-style: italic;
    letter-spacing: 2px;
    color: var(--gold-light);
    animation: scrBreathe 4s ease-in-out infinite;
}

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
    z-index: 9999999;
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

/* Пустое */
.scr-empty {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, var(--parchment), var(--parchment-dark));
    border-radius: 16px;
    border: 2px dashed rgba(139, 111, 74, 0.3);
}
.scr-empty-icon { font-size: 4rem; margin-bottom: 12px; opacity: 0.5; }
.scr-empty-title { font-size: 1.1rem; font-weight: 700; color: var(--wood); }

/* ============================================================
   МОБИЛЬНАЯ
   ============================================================ */
@media (max-width: 700px) {
    .scr-hero { padding: 30px 20px 26px; border-radius: 18px; }
    .scr-hero-title { font-size: 1.5rem; }
    .scr-hero-icon { font-size: 3.2rem; }
    .scr-hero-sub { font-size: 0.88rem; }
    .scr-stats { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .scr-stat { padding: 10px 8px; }
    .scr-stat-value { font-size: 1.3rem; }
    .scr-stat-label { font-size: 0.65rem; }
    .scr-grid { grid-template-columns: 1fr; gap: 16px; }
    .scr-card { padding: 24px 20px; min-height: 220px; }
    .scr-card-icon { width: 52px; height: 52px; font-size: 1.6rem; }
    .scr-card-title { font-size: 1.05rem; }
    .scr-reader { max-height: 96vh; border-radius: 14px; }
    .scr-reader-header { padding: 26px 20px 16px; }
    .scr-reader-body { padding: 20px 20px; }
    .scr-reader-footer { padding: 16px 20px 24px; }
    .scr-reader-title { font-size: 1.35rem; }
    .scr-reader-text { font-size: 0.98rem; line-height: 1.8; }
    .scr-reader-text h2 { font-size: 1.15rem; }
    .scr-reader-close { top: 20px; right: 16px; width: 36px; height: 36px; }
    .scr-reader-progress { margin-left: 0; width: 100%; margin-top: 8px; }
    .scr-reader-progress-bar { width: 100%; flex: 1; }
    .scr-reader-text .rune-box { font-size: 1.8rem; letter-spacing: 8px; padding: 14px; }
    .scr-reader-text table { font-size: 0.82rem; }
    .scr-reader-text table th, .scr-reader-text table td { padding: 6px 8px; }

    /* Финал на мобильном */
    .scr-finale-crown { font-size: 4.5rem; }
    .scr-finale-title { font-size: 1.6rem; }
    .scr-finale-subtitle { font-size: 0.95rem; }
    .scr-finale-text { padding: 20px 22px; font-size: 0.94rem; line-height: 1.75; }
    .scr-finale-text p:first-child::first-letter { font-size: 2.4rem; }
    .scr-finale-stats { gap: 8px; }
    .scr-finale-stat { padding: 10px 6px; }
    .scr-finale-stat-value { font-size: 1.4rem; }
    .scr-finale-stat-label { font-size: 0.62rem; }
    .scr-finale-btn { padding: 11px 20px; font-size: 0.85rem; }
    .scr-finale-seal { width: 60px; height: 60px; top: 10px; right: 10px; }
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
    // 12 СВИТКОВ
    // ============================================================
    const SCROLLS = [
        { id:'a', letter:'А', num:1, title:'Свиток Начала', subtitle:'Периодизация истории Марса', icon:'🌌', time:'12 мин',
          preview:'От Нойской эпохи — до последних дней Эпохи Умирания. Три геологические эпохи, разделившие судьбу планеты.',
          content: `<h2>Периодизация истории Марса</h2>
<p>История Марса насчитывает 4,6 миллиарда лет. Её принято делить на три геологические эпохи — Нойскую, Гесперийскую и Амазонийскую. Названия даны в честь регионов планеты, но в марсианской культуре они получили мифологическое значение.</p>
<h3>Нойская эпоха (ок. 4,1–3,7 млрд лет назад)</h3>
<p>Время формирования древнейших кратеров и первых океанов. Тогда ещё не было ни жизни, ни даже глины, способной хранить память. Согласно легендам, именно в эту эпоху <strong>Кхо</strong> (Огонь) и <strong>Акха</strong> (Вода) впервые встретились, и из их союза родилась жизнь.</p>
<p>В табличках эта эпоха почти не отражена — сохранились лишь мифологические фрагменты. Однако в геологических слоях этого периода учёные Академии находили первые органические молекулы.</p>
<h3>Гесперийская эпоха (ок. 3,7–3,0 млрд лет назад)</h3>
<p>Эпоха активного вулканизма и эрозии, когда на Марсе ещё текли полноводные реки и существовали огромные озёра. В устных преданиях эта эпоха названа <em>«Временем горячей воды»</em>.</p>
<h3>Амазонийская эпоха (от 3,0 млрд лет назад до наших дней)</h3>
<p>Эпоха постепенного угасания геологической активности, иссушения и похолодания. Внутри неё выделяют три больших периода:</p>
<ul>
<li><strong>Ранний Амазоний</strong> (3,0–1,0 млрд лет) — расцвет первых многоклеточных организмов.</li>
<li><strong>Средний Амазоний</strong> (1,0 млрд – 500 тыс. лет) — когнитивная революция, возникновение языка.</li>
<li><strong>Поздний Амазоний</strong> (500 тыс. лет назад – 2740 г. Э.О.) — эпоха письменной истории.</li>
</ul>
<h3>Культурные эпохи Позднего Амазония</h3>
<ul>
<li><strong>Эпоха Основания</strong> (1–2500 гг. Э.О.) — постройка первых городов, прорытие каналов.</li>
<li><strong>Эпоха Расцвета</strong> (2500–2680 гг. Э.О.) — наивысшее могущество Королевства Эдема.</li>
<li><strong>Эпоха Умирания</strong> (2680–2740 гг. Э.О.) — последние шестьдесят лет. Море замерзает, вулканы просыпаются, люди строят корабли.</li>
</ul>
<blockquote>Мы строили города, когда планета остывала, и мы покинули их, когда она замёрзла. Мы не победили время, но мы записали его.<br>— Хевсур, «Летопись», книга III</blockquote>` },

        { id:'b', letter:'Б', num:2, title:'Свиток Королей', subtitle:'Сказание о держателях жезла', icon:'👑', time:'10 мин',
          preview:'Полная родословная династии Эдема — от Сарума I до Аратана III. Правители и последние слова.',
          content: `<h2>Сказание о держателях жезла</h2>
<p>Здесь перечислены те, кто правил Объединённым Королевством марсиан от его основания до последних дней. Полная родословная восстанавливается начиная с <strong>Сарума Основателя</strong>.</p>
<h3>Сарум I (1–47 Э.О.)</h3>
<p>Сын вождя кочевого племени, последнего из рода серпендидских царей. Привёл свой народ к берегам Ацидалийского моря. При Саруме I были прорыты первые каналы. Он взял в жёны Ирну из рода рыбаков. Сарум I погиб во время шторма; тело не было найдено, и по сей день моряки оставляют ему дары перед дальними плаваниями.</p>
<h3>Сарум II (47–112)</h3>
<p>Старший сын. При нём завершилось строительство дворца в Роген-Арии, а Академия Окхасена получила первые свитки. Женился на Мире из долины Эдема. После её смерти не вступал в повторный брак — знак особой преданности памяти.</p>
<h3>Акхара I (891–947)</h3>
<p>Первая женщина на престоле. Укрепила южные границы, ввела обычай записывать все законы на глине. Её дочь основала храм на острове посреди Ацидалийского моря.</p>
<h3>Сарум Великий (1544–1633)</h3>
<p>Объединил разрозненные города под единой короной. «Золотой век»: строились обсерватории, расцветала торговля. Семеро детей, из которых престол унаследовал младший — Терман.</p>
<h3>Терман I (1633–1690)</h3>
<p>Прозванный «Строителем каналов». Урожаи в Аравии были самыми высокими за всю историю. Взял в жёны дочь князя Утопии, что прекратило войны с югом.</p>
<h3>Аратан III (2703–2740)</h3>
<p>Последний король из дома Эдема. Взошёл на престол в год, когда впервые замерзли причалы Окхасена. Его жена, королева Элла, умерла за два года до старта кораблей. Сам Аратан не вступил в новый брак. У него не осталось наследников.</p>
<blockquote>Я правил камнями, но не сумел удержать воду. Пусть те, кто улетают, правят хотя бы памятью.<br>— Аратан III, последние слова</blockquote>
<h3>Прочие властители</h3>
<p><strong>Терман из Утопии</strong> (ок. 2680–2710) — последний из великих воинов. Погиб в битве с отрядом беженцев у входа в пещеры Фарсиды.</p>
<p><strong>Ирна из долины Аравия</strong> (2695–2735) — жрица Араксис, пытавшаяся возродить каналы. Хевсур записал её имя с припиской: <em>«Она пыталась напоить землю, когда земля уже умирала. Это ли не подвиг?»</em></p>
<p><strong>Ксанф из Эритреи</strong> (ок. 2610–2655) — морской конунг. Флот насчитывал более сотни кораблей. После его смерти пиратское королевство распалось на три клана.</p>
<p><strong>Великая Акхара</strong> (ок. 2390–2445) — правительница Серпентиды, «железная жрица». Отразила три вторжения эдемских армий.</p>
<p><strong>Ланой-Кузнец</strong> (ок. 2730–2738) — простой ремесленник, ставший неформальным лидером выживших. Перед смертью отравил трещину с серным газом, чтобы дать другим уйти.</p>` },

        { id:'c', letter:'В', num:3, title:'Свиток Времён', subtitle:'История в годах и событиях', icon:'📜', time:'14 мин',
          preview:'Хронология от глубочайшей древности до конца Эпохи Умирания. Даты, события, катастрофы.',
          content: `<h2>История в годах и событиях</h2>
<p>Хронология важнейших событий от глубочайшей древности до конца Эпохи Умирания. Даты до 1 года Э.О. указаны приблизительно.</p>
<h3>Первая эпоха</h3>
<p><strong>ок. 4,1–3,7 млрд лет назад</strong> — Нойская эпоха. Формирование кратеров и первых океанов. Встреча Кхо и Акхи.</p>
<p><strong>ок. 3,7–3,0 млрд лет назад</strong> — Гесперийская эпоха. Активный вулканизм, реки, озёра. Появляются первые протоклетки.</p>
<h3>Вторая эпоха (Ранний Амазоний)</h3>
<p><strong>ок. 3,0–1,0 млрд лет назад</strong> — Жизнь выходит на сушу. Пурпурные леса. Гигантские ракоскорпионы.</p>
<h3>Третья эпоха (Средний Амазоний)</h3>
<p><strong>ок. 1,0 млрд – 500 тыс. лет назад</strong> — Появление предков марсиан. Членораздельная речь. Ритуальные захоронения.</p>
<h3>Эпоха Основания (1–2500 гг. Э.О.)</h3>
<p><strong>ок. 500 г. до Э.О.</strong> — Основание Серпентиды.</p>
<p><strong>1 г. Э.О.</strong> — Основание Окхасена. Начало летоисчисления.</p>
<p><strong>47 г.</strong> — Гибель Сарума I в море.</p>
<p><strong>712 г.</strong> — Основание Академии Окхасена.</p>
<p><strong>891–947 гг.</strong> — Правление Акхары I.</p>
<p><strong>1544–1633 гг.</strong> — Правление Сарума Великого.</p>
<p><strong>1700 г.</strong> — Землетрясение разрушает дамбу Акха-Кора. Столица Серпентиды уходит под воду.</p>
<h3>Эпоха Расцвета (2500–2680 гг.)</h3>
<p><strong>2500–2600 гг.</strong> — Строительство обсерваторий Фарсида.</p>
<p><strong>2610–2655 гг.</strong> — Пиратское королевство Ксанфа.</p>
<p><strong>2622 г.</strong> — Первый неурожай в Аравии.</p>
<p><strong>2650 г.</strong> — Последний крупный ремонт каналов.</p>
<p><strong>2680 г.</strong> — Начало извержений Фарсиды. Начало Эпохи Умирания.</p>
<h3>Эпоха Умирания (2680–2740 гг.)</h3>
<p><strong>2690 г.</strong> — Глобальная пылевая буря длится год.</p>
<p><strong>2695 г.</strong> — Комиссия по изучению климата. Эртан представляет модели угасания.</p>
<p><strong>2703 г.</strong> — Коронация Аратана III.</p>
<p><strong>2705–2730 гг.</strong> — Поход Тар-Ары через пустыню.</p>
<p><strong>2714 г.</strong> — Талин впервые наблюдает Землю.</p>
<p><strong>2718 г.</strong> — Ацидалийское море впервые замерзает у Окхасена.</p>
<p><strong>2725 г.</strong> — Реки Ксанф, Лабей и Борл пересыхают.</p>
<p><strong>2734 г.</strong> — Экспедиция Хевсура в подземный храм.</p>
<p><strong>2735 г.</strong> — Море полностью замерзает.</p>
<p><strong>2735–2739 гг.</strong> — Строительство кораблей.</p>
<p><strong>2740 г., 15-й день Кхосен</strong> — Старт трёх кораблей к Земле. Гибель Аратана III.</p>
<p><strong>2740–2745 гг.</strong> — Гибель оставшихся марсиан в пещерах.</p>
<p><strong>2745 г.</strong> — Предположительная дата смерти Хевсура. Конец письменной истории Марса.</p>` },

        { id:'d', letter:'Г', num:4, title:'Свиток Крови', subtitle:'Родословные великих домов', icon:'🩸', time:'9 мин',
          preview:'Дом хранителей, род небесных счётчиков, кровь погонщиков. Линии, которые не прервались до Исхода.',
          content: `<h2>Кровь и глина</h2>
<p>Здесь собраны не все — только те, чьи имена удалось восстановить из рассыпающихся табличек.</p>
<h3>1. Дом хранителей (линия Хевсура)</h3>
<p>Этот дом вёл начало от <strong>Харана, сына Сарума</strong>, который жил три тысячи лет назад. Ни королей, ни военачальников в этом роду не было — только писцы и хранители. Хевсур стал последним.</p>
<ul>
<li><strong>Харан, сын Сарума</strong> (писец, ~3000 лет до Э.О.)</li>
<li>(многие поколения, имена стёрты)</li>
<li><strong>Ланой-старший</strong> (хранитель архива, ~2600 – ~2700)</li>
<li><strong>Ланой-младший</strong> (переписчик, ~2630 – ~2710)</li>
<li><strong>Хевсур</strong> (историк, 2685 – ~2745)</li>
</ul>
<p>Хевсур не оставил детей. Его дом пресёкся, но таблички, которые он спрятал, пережили его.</p>
<h3>2. Род небесных счётчиков (линия Талина)</h3>
<p>Талин родился в семье строителей лодок, но в детстве потянулся к звёздам. Его сестра Элла пошла по пути врачевания. Оба улетели на корабле «Надежда-2».</p>
<ul>
<li><strong>Эрдан</strong> (строитель лодок, ~2700 – 2738, погиб в море)</li>
<li><strong>Талин</strong> (астронавигатор, 2712 – ?)</li>
<li><strong>Элла</strong> (биолог, 2716 – ?)</li>
</ul>
<h3>3. Кровь погонщиков (линия Араша)</h3>
<ul>
<li><strong>Араш-старший</strong> (погонщик из Утопии, ~2680 – 2739)</li>
<li><strong>Кан</strong> (сын, помощник погонщика, пропал без вести)</li>
</ul>
<h3>4. Последний королевский дом Эдема</h3>
<ul>
<li><strong>Сарум Великий</strong> (1544–1633)</li>
<li><strong>Терман I</strong> (Строитель каналов, 1633–1690)</li>
<li>(многие поколения)</li>
<li><strong>Аратан III</strong> (последний король, 2703–2740)</li>
</ul>
<h3>5. Жрицы уходящей воды (линия Ирны)</h3>
<ul>
<li><strong>Ирна</strong> (жрица, 2695 – ~2735, погибла в пустыне)</li>
<li>— дочь (имя утрачено, улетела на «Надежде-3»)</li>
<li>— сын, умер младенцем</li>
</ul>
<blockquote>Этот свиток не полон. Хевсур жалел, что глина кончается, а памяти — бесконечность.</blockquote>` },

        { id:'e', letter:'Д', num:5, title:'Свиток Звёзд', subtitle:'Марсианское летоисчисление', icon:'🌙', time:'11 мин',
          preview:'22 месяца, 8 сезонов, звёздный год. Как марсиане считали время на умирающей планете.',
          content: `<h2>Марсианское летоисчисление и календарь</h2>
<p>Марсианский год продолжается 687 местных суток, которые называются <strong>солами</strong>. По земным меркам это примерно 669 земных суток.</p>
<h3>Двадцать два месяца</h3>
<p>В отличие от земного календаря, марсиане делили год на <strong>двадцать два месяца</strong>. Астрономические таблички из Эллады объясняют это так: за год Марс дважды проходит перигелий и афелий, а также совершает полный цикл восходов и заходов Фобоса, что даёт 22 лунных периода по 31,2 сола.</p>
<p>Длительность месяцев — от 28 до 33 солов. Год начинался в день весеннего равноденствия.</p>
<h3>Восемь сезонов</h3>
<p>Вместо четырёх сезонов марсиане различали <strong>восемь</strong>:</p>
<ol>
<li><strong>Пробуждение</strong> — таяние льдов</li>
<li><strong>Цветение</strong> — рост пурпурных растений</li>
<li><strong>Зной</strong> — максимальное тепло</li>
<li><strong>Ветры</strong> — пылевые бури, сезон дождей</li>
<li><strong>Угасание</strong> — похолодание, увядание</li>
<li><strong>Заморозки</strong> — первые льды</li>
<li><strong>Тьма</strong> — долгая ночь, три месяца тьмы</li>
<li><strong>Ледяной покров</strong> — семь месяцев зимы</li>
</ol>
<p>В Эпоху Умирания восьмой сезон становился всё длиннее, и к 2740 году зима поглотила все остальные.</p>
<h3>Особые дни</h3>
<ul>
<li><strong>Dzen Thal</strong> (1-й день Äkha-dzen) — Новый год. Король произносил пророчество на предстоящий год.</li>
<li><strong>Lān Mar</strong> (15-й день Mar-lān) — День памяти всех ушедших.</li>
<li><strong>Ariya-mar</strong> — священный месяц, когда запрещались войны и казни.</li>
<li><strong>Yar-okh</strong> — «возвращение домой».</li>
</ul>
<h3>Счёт лет</h3>
<p>Марсиане вели летосчисление от Основания Окхасена (1 год Э.О.). Старт кораблей состоялся <strong>15-го дня месяца Кхосен 2740 года Э.О.</strong></p>
<blockquote>Не все даты следует принимать как безусловную истину. В последние годы Эпохи Умирания многие таблички не успевали обжечь, и сырая глина давала усадку.</blockquote>` },

        { id:'f', letter:'Е', num:6, title:'Свиток Рун', subtitle:'Марсианские алфавиты и письмо', icon:'✍️', time:'13 мин',
          preview:'Силлабарий, диакритика, цифры. Как писали на глине те, кто хотел, чтобы их помнили.',
          content: `<h2>Марсианские алфавиты и письмо</h2>
<p>В подлинных табличках марсианская письменность предстаёт в двух формах: <strong>монументальной</strong> (для высекания на камне) и <strong>скорописной</strong> (для повседневных записей).</p>
<h3>Гласные</h3>
<ul>
<li><strong>A</strong> — всегда открытый, как в «там». Долгота: <em>ā</em>.</li>
<li><strong>O</strong> — как в «дом», <em>ō</em> — долгий.</li>
<li><strong>U</strong> — как в «тут», <em>ū</em> — долгий.</li>
<li><strong>I</strong> — как в «игла».</li>
</ul>
<p><strong>Ударение всегда падает на первый слог.</strong></p>
<h3>Согласные</h3>
<table>
<tr><th>Буква</th><th>Произношение</th><th>Пример</th></tr>
<tr><td>kh</td><td>гортанное, как х в нем. Bach</td><td>Khō — огонь</td></tr>
<tr><td>gh</td><td>звонкое, фрикативное г</td><td>Ghar — камень</td></tr>
<tr><td>x</td><td>сильное х, почти кх</td><td>Xal — древний</td></tr>
<tr><td>th</td><td>глухой межзубный, как в англ. think</td><td>Thal — смотреть</td></tr>
<tr><td>dz</td><td>слитное дз</td><td>Dzen — звезда</td></tr>
<tr><td>ts</td><td>слитное ц</td><td>Tsan — знание</td></tr>
<tr><td>r</td><td>раскатистое</td><td>Rōg — король</td></tr>
</table>
<p>В марсианском языке <strong>нет звуков в, ф, ч, щ, ж, ш</strong>. Заимствованные имена адаптировались: <em>Софья → Совия</em>.</p>
<h3>Письменность</h3>
<p>Марсиане писали на глиняных табличках. Орудие письма — <strong>стило</strong> из твёрдого дерева или кости. Направление — <strong>слева направо</strong>, строки сверху вниз.</p>
<h3>Названия знаков</h3>
<table>
<tr><th>Слог</th><th>Перевод</th></tr>
<tr><td>ma</td><td>mar — жизнь</td></tr>
<tr><td>la</td><td>lăn — память</td></tr>
<tr><td>ka</td><td>kəl — земля</td></tr>
<tr><td>kha</td><td>khan — река</td></tr>
<tr><td>ga</td><td>ghar — камень</td></tr>
<tr><td>ra</td><td>rəg — король</td></tr>
<tr><td>tha</td><td>thal — смотреть</td></tr>
<tr><td>da</td><td>dzen — звезда</td></tr>
<tr><td>ha</td><td>hal — светлый</td></tr>
<tr><td>tsa</td><td>tsan — знание</td></tr>
<tr><td>mo</td><td>mōr — смерть</td></tr>
<tr><td>ko</td><td>khō — огонь</td></tr>
</table>
<h3>Цифры и счёт</h3>
<p>Марсиане пользовались <strong>двадцатеричной системой</strong> (основание 20):</p>
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
<div class="rune-box">KHÖ · MÖR · DZEN · MÖR · LÄN · ÄN · MÖR</div>
<p><em>Khō mōr, dzen mōr, lān ān mōr.</em> — Огонь умрёт, звезда умрёт, память не умрёт.</p>` },

        { id:'g', letter:'Ж', num:7, title:'Свиток Языков', subtitle:'Языки и народы Эпохи Умирания', icon:'🗣️', time:'10 мин',
          preview:'Всеобщий язык Марса, три диалекта, личные имена и их тайные значения.',
          content: `<h2>Языки и народы Эпохи Умирания</h2>
<p>Вся история была записана на марсианском языке — точнее, на его разговорной форме, принятой в Окхасене и Роген-Арии. Самоназвание языка — <strong>Maržan</strong> («живущие»).</p>
<h3>Всеобщий язык Марса</h3>
<p>В Эпоху Умирания марсианский язык был понятен на большей части обитаемой территории. На нём говорили в портовых тавернах и в королевском дворце.</p>
<h3>Три ветви древних марсиан</h3>
<ul>
<li><strong>Тёмно-синие</strong> — южные моря, Эллада, Серпентида. Ремесленники и мореходы.</li>
<li><strong>Светло-синие</strong> — западные и северные равнины, Аркадия, Эдем. Хранители знаний. Жили до 150 лет.</li>
<li><strong>Смешанный тип</strong> — большинство населения Окхасена и Роген-Арии.</li>
</ul>
<h3>Классический язык Maržan xal</h3>
<p>Классический язык («древняя речь марсиан») был языком первых табличек. К Эпохе Умирания он использовался только в храмах и Академии. По своему положению он напоминал латынь в средневековой Европе.</p>
<h3>Диалекты</h3>
<ul>
<li><strong>Южный</strong> (Эллада, Серпентида). Смягчение гортанных: kh → k.</li>
<li><strong>Западный</strong> (Аркадия, Темпе). Согласные огрубляются, окончания отбрасываются.</li>
<li><strong>Центральный</strong> (Окхасен, Роген-Ария). Литературная норма.</li>
</ul>
<h3>Личные имена</h3>
<ul>
<li><strong>Талин</strong> — от thal («смотреть»). «Наблюдатель». Имя астрономов.</li>
<li><strong>Хевсур</strong> — от xal («древний») и sur («глина»). «Хранитель древней глины».</li>
<li><strong>Йарра</strong> — от yar («старый, мудрый»). «Мудрая».</li>
<li><strong>Элла</strong> — вероятно, от Äkha-ella («вода-свет»).</li>
<li><strong>Араш</strong> — от ara («путь»). «Путник».</li>
<li><strong>Кан</strong> — от kan («малый»). «Маленький», «сын».</li>
<li><strong>Кор</strong> — от kõr («острый»). Прозвище, ставшее именем.</li>
<li><strong>Мира</strong> — от mīr («дар»). «Драгоценная».</li>
<li><strong>Аратан III</strong> — от ara («путь») и tan («защитник»). «Защитник пути».</li>
<li><strong>Ирна</strong> — от ir («вода»). «Водная».</li>
<li><strong>Харан</strong> — от xar («старый»). «Древний человек».</li>
<li><strong>Сарум</strong> — от sar («основание»). «Великое основание».</li>
</ul>` },

        { id:'h', letter:'З', num:8, title:'Свиток Легенд', subtitle:'О Кхо и Акхе, о первой тишине', icon:'⚡', time:'12 мин',
          preview:'Прежде чем появились звёзды, была только Тьма и Тишина. Так родились Огонь и Вода.',
          content: `<h2>О начале мира, о Кхо и Акхе</h2>
<p>Прежде чем появились звёзды, прежде чем вода нашла свои берега, а огонь — свои недра, была только <strong>Тьма</strong> и <strong>Тишина</strong>. Тьма не имела глаз, Тишина не имела ушей.</p>
<p>Но в сердце Тишины родилось <em>Желание</em>. Чистое, первичное стремление — <em>быть</em>. Оно росло, набухало, и наконец из него вышли двое: <strong>Кхо</strong> (Огонь) и <strong>Акха</strong> (Вода).</p>
<p>Кхо метался во Тьме, ибо не мог стоять на месте. Акха ждала, растекаясь невидимыми струями. Каждый страшился встречи: Кхо знал, что от прикосновения Воды он остынет и станет камнем; Акха знала, что от прикосновения Огня она превратится в пар и улетит навсегда.</p>
<p>Но одиночество оказалось страшнее любой гибели.</p>
<p>И они двинулись навстречу друг другу — не спеша, как льды в океане, и неуклонно, как падающая звезда. Когда Кхо коснулся Акхи, вскипела вода, и пар поднялся к небу, рождая облака. Когда Акха коснулась Кхо, остыл огонь, и из его застывшего сердца родился камень. <strong>Так явились небо и земля.</strong></p>
<h3>Рождение первых тварей</h3>
<p>Акха сказала своё слово, и из воды родились тела. Кхо вдохнул свою суть, и в тела вселилась душа. Те, что остались в воде, стали рыбами и ракоскорпионами. Те, что выползли на сушу, стали ящерами и — позже — марсианами.</p>
<h3>Вечная вражда</h3>
<p>Кхо и Акха не могут быть вместе долго. Огонь жаждет сжигать, Вода — остужать. Их вечная вражда — это дыхание Марса. Когда они ссорятся, земля дрожит, вулканы дымятся, и моря выходят из берегов.</p>
<p>И сказано в древних табличках: однажды один из них победит. Если Кхо одолеет — Марс сгорит. Если Акха — замёрзнет. Но пока они спорят, пока их дыхание смешивается в облаках — <strong>до тех пор Марс жив</strong>.</p>
<h3>О первой войне</h3>
<p>Один из Арундов (Пламенных духов), по имени <strong>Мор-Кхо</strong>, возгордился. Он поднял восстание против Акхи. Началась война, которая длилась тысячу лет. Мор-Кхо был побеждён, но Акха не стала его уничтожать. Она превратила его в <strong>Фобос</strong> — луну, которая падает к планете, но никогда не упадёт. Его брата — в <strong>Деймос</strong> — луну, которая убегает, но никогда не скроется.</p>
<h3>О даре памяти</h3>
<p>Долгое время марсиане не знали смерти. Их память была бесконечной, как океан. Но однажды один из марсиан попросил Кхо забрать бессмертие. Кхо согласился, но с условием: «Вы будете умирать, но ваша память не умрёт. Вы будете записывать её на глине, и глина будет хранить её вечно».</p>
<p>Первый, кто записал свои мысли на глине, написал: <em>«Мы смертны, но память вечна. Lān sur»</em>.</p>` },

        { id:'i', letter:'И', num:9, title:'Свиток Битв', subtitle:'Войны и военные кампании', icon:'⚔️', time:'8 мин',
          preview:'Шесть великих сражений Эпохи Умирания. Полководцы, потери, память.',
          content: `<h2>Битвы и военные кампании</h2>
<p>Сведения о вооружённых конфликтах, которые потрясали Марс в последние века перед Исходом.</p>
<h3>1. Первая война с кочевниками (64–68 гг. Э.О.)</h3>
<p>Набеги кочевых племён из леса Тиррения. Сарум II лично возглавил контратаку. Потери: у Эдема — 300 воинов; у кочевников — 800.</p>
<h3>2. Битва при Ксанфской переправе (1643 г.)</h3>
<p>Попытка Утопии захватить реку Ксанф. Кан-Ут переправил 5000 воинов. Битва длилась два дня. Эдемская кавалерия обошла фланг. Кан-Ут погиб. Потери: Эдем — 1200; Утопия — 3000.</p>
<h3>3. Торговая война с Серпентидой (1670–1675 гг.)</h3>
<p>Спор о пошлинах. Эдем блокировал морские пути. Эта война запомнилась как «Война ржавых цепей».</p>
<h3>4. Вторжение Тар-Ары (2722 г.)</h3>
<p>Кочевники Эридании, спасаясь от засухи, двинулись на север. Тар-Ара трижды вступал в бой. В последнем сражении погиб, но его дочь Ара-младшая провела остатки каравана в пещеры.</p>
<blockquote>Здесь пал последний князь пустыни. Он не враг. Он просто искал воду.<br>— Хевсур о гибели Тар-Ары</blockquote>
<h3>5. Мятеж в Роген-Арии (2735 г.)</h3>
<p>Голод и отчаяние. Мятежники подожгли два склада. Аратан III лично возглавил отряд. Потери: 300 мятежников, 20 гвардейцев.</p>
<h3>6. Оборона космодрома (2739 г.)</h3>
<p>Саботаж — группа отчаявшихся попыталась уничтожить корабли. Охрана открыла огонь. Потери: 15 охранников, 10 добровольцев, все 50 диверсантов.</p>
<blockquote>Они защищали не корабли. Они защищали надежду.<br>— Хевсур</blockquote>` },

        { id:'j', letter:'К', num:10, title:'Свиток Земель', subtitle:'География Марса', icon:'🗺️', time:'11 мин',
          preview:'Моря, реки, города, каналы. Мир, ушедший под лёд.',
          content: `<h2>География Марса в Эпоху Умирания</h2>
<p>Описание поверхности Марса в том виде, в каком она существовала до последних извержений и замерзания морей.</p>
<h3>Ацидалийское море</h3>
<p>Один из самых больших водоёмов позднего Марса. Расположено в северном полушарии, площадь в период расцвета достигала <strong>1,5 млн км²</strong>. Море было солёным, но благодаря притоку пресных вод оставалось пригодным для жизни.</p>
<p>Название происходит от древнего слова <em>acidāli</em> — «солёная вода». Начиная с 2650 г. уровень моря начал падать. К 2738 г. лёд сковал прибрежные воды у Окхасена, а в 2740 г. море замёрзло почти полностью.</p>
<h3>Город Окхасен</h3>
<p>Основан в 47 г. Э.О. переселенцами из Серпентиды. Название происходит от слов «okh» (город) и «asen» (гавань). К 500 г. стал крупнейшим портом западной окраины Королевства.</p>
<p>В 712 г. была основана международная <strong>Академия Окхасена</strong> — главное научное учреждение Марса. В 2740 г. город был разрушен землетрясениями и пожарами.</p>
<h3>Столица Роген-Ария</h3>
<p>Находилась на северном берегу Ацидалийского моря. Название переводится как <em>«Врата солнца»</em>. Город был заложен Сарумом II в 1 г. Э.О. Славился базальтовыми дворцами, подземными хранилищами воды и пирамидами-обсерваториями.</p>
<h3>Долина Аравия</h3>
<p>Обширная низменность к востоку от Роген-Арии. В Эпоху Расцвета давала до <strong>70% зерна</strong> всего Королевства. К 2738 г. превратилась в выжженную пустыню.</p>
<h3>Горы Фарсида</h3>
<p>Вулканическое плато, возвышающееся на 10–12 км. Здесь расположены четыре гигантских вулкана: <strong>Олимп</strong> (21 км), <strong>Арсия</strong>, <strong>Павлина</strong> и <strong>Аскрийская гора</strong>.</p>
<p>Фарсида была местом последнего убежища для марсиан. В её недрах существовала система пещер и геотермальных источников. Хевсур провёл последние годы жизни в одной из таких пещер.</p>
<h3>Долина Маринера</h3>
<p>Гигантский каньон. Глубина достигает 7 км, ширина — до 200 км, длина — более 4000 км. В Эпоху Умирания в долине стали выделяться серные газы и пар, что сделало её практически непроходимой.</p>
<h3>Система каналов</h3>
<p>Прорыта в первые века Эпохи Основания. Общая протяжённость — <strong>10 000 км</strong>. Каналы были вырублены в базальте и облицованы водонепроницаемой глиной. С началом землетрясений каналы разрушались.</p>` },

        { id:'k', letter:'Л', num:11, title:'Свиток Письмён', subtitle:'Пиктограммы Среднего Амазония', icon:'🎨', time:'7 мин',
          preview:'Первые рисунки на глине. Круги, спирали, фигуры — язык до языка.',
          content: `<h2>Пиктограммы Среднего Амазония</h2>
<p>Краткое изложение свитка Хевсура <em>«Глина, не знавшая слов»</em>. Таблички относятся к Среднему Амазонию (1,0 млрд – 500 тыс. лет назад) — эпохе, когда письменности ещё не существовало.</p>
<h3>Что такое пиктограммы</h3>
<p>Пиктограммы — это рисунки на глине, которые не являются буквами. Каждый рисунок обозначал целое понятие: «солнце», «охота», «смерть», «вода». Древние марсиане выдавливали их на сырой глине острыми палочками, а затем обжигали.</p>
<h3>Где находили пиктограммы</h3>
<ul>
<li><strong>Пещеры Эллады</strong> — более 200 фрагментов. Сцены охоты на ракоскорпионов.</li>
<li><strong>Подземные убежища Аравии</strong> — сильно повреждены временем.</li>
<li><strong>Долина Ксанфа</strong> — изображения Фобоса, Деймоса и календари.</li>
<li><strong>Остров Утопия</strong> — загадочная спираль и шесть фигур в круге.</li>
</ul>
<h3>Словарь пиктограмм</h3>
<table>
<tr><th>Пиктограмма</th><th>Значение</th></tr>
<tr><td>Круг с точкой</td><td>солнце / жизнь</td></tr>
<tr><td>Волнистая линия</td><td>вода / море</td></tr>
<tr><td>Треугольник на вершине</td><td>гора / вулкан</td></tr>
<tr><td>Горизонтальная линия</td><td>земля / горизонт</td></tr>
<tr><td>Две переплетённые линии</td><td>союз / брак</td></tr>
<tr><td>Спираль внутрь</td><td>время / вечность</td></tr>
<tr><td>Фигура с поднятыми руками</td><td>человек / вождь / шаман</td></tr>
<tr><td>Лодка с шестью вёслами</td><td>путешествие</td></tr>
<tr><td>Звезда с лучами</td><td>Фобос и Деймос</td></tr>
</table>
<h3>Что рассказывают пиктограммы</h3>
<p><strong>Хозяйство.</strong> Охота на гигантских ракоскорпионов (2–3 метра) и собирательство.</p>
<p><strong>Ритуалы.</strong> Сцены танцев вокруг костра, фигуры с поднятыми руками, круги — священные места.</p>
<p><strong>Иерархия.</strong> Одна фигура выше остальных — вождь или шаман.</p>
<p><strong>Астрономия.</strong> 22 фазы Фобоса и Деймоса — по числу месяцев в году.</p>
<blockquote>Я не знаю, что это значит. Но я записываю даже то, что не понимаю.<br>— Хевсур</blockquote>` },

        { id:'l', letter:'М', num:12, title:'Свиток Слов', subtitle:'Словарь языка Marzān', icon:'📖', time:'9 мин',
          preview:'Термины, боги, устойчивые фразы. Язык умирающего Марса.',
          content: `<h2>Словарь языка Marzān</h2>
<p>Основные термины, имена богов, устойчивые фразы и грамматические особенности языка, на котором говорили марсиане в последние века Эпохи Умирания.</p>
<h3>Основные слова</h3>
<table>
<tr><th>Слово</th><th>Значение</th></tr>
<tr><td>Ākha</td><td>вода, море, жидкость; имя богини</td></tr>
<tr><td>Ān</td><td>отрицательная частица: «не», «без»</td></tr>
<tr><td>Ān-mōr</td><td>приют, убежище; «место, где нет смерти»</td></tr>
<tr><td>Dzen</td><td>звезда, небесное тело</td></tr>
<tr><td>Khō</td><td>огонь, тепло, энергия</td></tr>
<tr><td>Ksanf</td><td>река Ксанф</td></tr>
<tr><td>Lān</td><td>память; глина как носитель памяти</td></tr>
<tr><td>Mar</td><td>жизнь, живое существо</td></tr>
<tr><td>Marzān</td><td>марсианин</td></tr>
<tr><td>Mōr</td><td>смерть</td></tr>
<tr><td>Okh</td><td>город, поселение</td></tr>
<tr><td>Sur</td><td>глина, глиняная табличка</td></tr>
<tr><td>Thal</td><td>смотреть, глядеть</td></tr>
<tr><td>Tren</td><td>три, трое</td></tr>
<tr><td>Xalmar</td><td>древний, предок</td></tr>
</table>
<h3>Часто встречающиеся фразы</h3>
<table>
<tr><th>Фраза</th><th>Перевод</th></tr>
<tr><td>Lān sur</td><td>Глина помнит</td></tr>
<tr><td>Khō mōr, dzen mōr, lān ān mōr</td><td>Огонь умрёт, звезда умрёт, память не умрёт</td></tr>
<tr><td>Dzen thal mar, lān sur</td><td>Смотри на звёзды жизни, глина помнит</td></tr>
<tr><td>Ksanf lān, okh ākha thal</td><td>Ксанф помнит, Окхасен смотрит на море</td></tr>
<tr><td>Xalmar thal</td><td>Древние смотрят</td></tr>
</table>
<h3>Грамматические правила</h3>
<ol>
<li><strong>Порядок слов</strong> — строгий SOV.</li>
<li><strong>Отрицание</strong> — частица <em>ān</em> ставится после глагола.</li>
<li><strong>Сложные слова</strong> — главный корень стоит в конце.</li>
<li><strong>Притяжательность</strong> — выражается соположением: <em>Talīn okh</em> («дом Талина»).</li>
</ol>
<h3>Боги</h3>
<p><strong>Акха</strong> — богиня воды, моря. Второе имя Араксис.</p>
<p><strong>Араксис</strong> — полное имя богини воды. Её статуя в храме Окхасена была вырезана из обсидиана.</p>
<p><strong>Кхо</strong> — бог огня, вулканов. Его вечная вражда с Акхой объясняет землетрясения.</p>
<p><strong>Тишина</strong> (Mōr sen) — первоначальное состояние мира. В пророчествах имеет двойное значение: вечный покой или пустота, в которой можно начать заново.</p>` }
    ];

    const container = document.getElementById('scr-app');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let currentUser = null;
    let readScrolls = new Set();
    let unlockedScrolls = new Set();
    let finaleShown = false;

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
    // Загрузка
    // ============================================================
    async function loadData() {
        const { data: { session } } = await client.auth.getSession();
        currentUser = session?.user || null;
        if (!currentUser) return;

        try {
            const { data: read } = await client.from('user_scrolls_read')
                .select('scroll_id').eq('user_id', currentUser.id);
            readScrolls = new Set((read || []).map(r => r.scroll_id));

            // Разблокировка
            SCROLLS.forEach((s, i) => {
                if (i === 0) { unlockedScrolls.add(s.id); return; }
                if (readScrolls.has(SCROLLS[i - 1].id)) unlockedScrolls.add(s.id);
            });
        } catch (e) { console.warn(e); }
    }

    // ============================================================
    // Отметить как прочитанное (исправлено)
    // ============================================================
    async function markAsRead(scrollId) {
        if (!currentUser || readScrolls.has(scrollId)) return;

        // 🔒 Мгновенно — защита от повторов
        readScrolls.add(scrollId);

        try {
            await client.from('user_scrolls_read').upsert(
                [{ user_id: currentUser.id, scroll_id: scrollId }],
                { onConflict: 'user_id,scroll_id', ignoreDuplicates: true }
            );

            const idx = SCROLLS.findIndex(s => s.id === scrollId);
            if (idx >= 0 && SCROLLS[idx + 1]) {
                unlockedScrolls.add(SCROLLS[idx + 1].id);
            }

            // +15 XP
            try {
                const { data: p } = await client.from('profiles')
                    .select('experience').eq('user_id', currentUser.id).single();
                const newXP = (p?.experience || 0) + 15;
                await client.from('profiles').update({ experience: newXP }).eq('user_id', currentUser.id);
            } catch(e) {}

            showToast('📜 Свиток прочитан! +15 XP', 'success');
            spawnCoins();

            // Проверка на финал
            if (readScrolls.size === SCROLLS.length && !finaleShown) {
                finaleShown = true;
                setTimeout(() => showFinale(), 1500);
            }

            render();
        } catch (e) {
            console.warn('Ошибка:', e);
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
    // ФИНАЛЬНЫЙ ЭКРАН
    // ============================================================
    function showFinale() {
        document.body.classList.add('scr-modal-open');

        const overlay = document.createElement('div');
        overlay.className = 'scr-finale-overlay';
        overlay.id = 'scr-finale';

        overlay.innerHTML = `
            <div class="scr-finale-fireworks" id="scr-fireworks"></div>
            <div class="scr-finale-content">
                <div class="scr-finale-crown">👑</div>
                <h1 class="scr-finale-title">Хранитель памяти</h1>
                <p class="scr-finale-subtitle">Ты прочитал все двенадцать свитков Хевсура</p>

                <div class="scr-finale-text">
                    <p>Ты прошёл путь от Нойской эпохи до последних дней Эпохи Умирания. Ты видел, как рождались боги из Тишины, как короли сменяли друг друга на троне Роген-Арии, как умирали моря и замерзали города.</p>
                    <p>Ты знаешь теперь то, что знал <strong>Хевсур</strong> — последний историк Марса. Ты — <em>хранитель глины</em>. Ты — тот, кто помнит.</p>
                    <p>И пока ты помнишь — <strong>глина помнит вместе с тобой</strong>. Пока ты помнишь — Марс жив.</p>
                </div>

                <div class="scr-finale-stats">
                    <div class="scr-finale-stat">
                        <div class="scr-finale-stat-value">12</div>
                        <div class="scr-finale-stat-label">Свитков</div>
                    </div>
                    <div class="scr-finale-stat">
                        <div class="scr-finale-stat-value">180</div>
                        <div class="scr-finale-stat-label">XP</div>
                    </div>
                    <div class="scr-finale-stat">
                        <div class="scr-finale-stat-value">100%</div>
                        <div class="scr-finale-stat-label">Прогресс</div>
                    </div>
                </div>

                <div class="scr-finale-actions">
                    <a href="/profile/" class="scr-finale-btn primary">👤 В профиль</a>
                    <button class="scr-finale-btn" onclick="scrCloseFinale()">📖 Вернуться к свиткам</button>
                </div>

                <div class="scr-finale-seal-final">LĀN SUR · ГЛИНА ПОМНИТ</div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Фейерверк
        const fw = document.getElementById('scr-fireworks');
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const f = document.createElement('div');
                f.className = 'scr-finale-firework';
                f.style.left = (20 + Math.random() * 60) + '%';
                f.style.top = (20 + Math.random() * 60) + '%';
                const angle = Math.random() * Math.PI * 2;
                const dist = 100 + Math.random() * 300;
                f.style.setProperty('--fx', Math.cos(angle) * dist + 'px');
                f.style.setProperty('--fy', Math.sin(angle) * dist + 'px');
                f.style.background = `radial-gradient(circle, #fff, ${['#f39c12','#e67e22','#b8860b','#ffd97a','#6b4f37'][i % 5]} 60%, transparent 100%)`;
                fw.appendChild(f);
                setTimeout(() => f.remove(), 2000);
            }, i * 60);
        }
    }

    window.scrCloseFinale = function() {
        const o = document.getElementById('scr-finale');
        if (o) {
            o.style.transition = 'opacity 0.5s';
            o.style.opacity = '0';
            setTimeout(() => {
                o.remove();
                document.body.classList.remove('scr-modal-open');
            }, 500);
        }
    };

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

        document.body.classList.add('scr-modal-open');

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
        overlay.addEventListener('click', (e) => { if (e.target === overlay) scrClose(); });

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
        const isComplete = done === total;

        container.innerHTML = `
            <div class="scr-hero scr-fade">
                <div class="scr-hero-stars" id="scr-hero-stars"></div>
                <div class="scr-hero-content">
                    <div class="scr-hero-icon">${isComplete ? '👑' : '📜'}</div>
                    <h1 class="scr-hero-title">${isComplete ? 'Хранитель памяти' : 'Свитки Хевсура'}</h1>
                    <p class="scr-hero-sub">${isComplete ? 'Ты прошёл путь до конца. Lān sur — глина помнит.' : '«Lān sur» — глина помнит. Двенадцать свитков о мире, ушедшем под лёд.'}</p>

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

                    ${isComplete ? `
                        <button class="scr-finale-btn primary" onclick="scrShowFinale()" style="margin-top:22px;">
                            👑 Открыть финальный свиток
                        </button>
                    ` : ''}
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

    window.scrShowFinale = function() {
        showFinale();
    };

    window.scrClose = function() {
        const overlay = document.querySelector('.scr-reader-overlay');
        if (overlay) {
            overlay.style.animation = 'scrFadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
                document.body.classList.remove('scr-modal-open');
            }, 250);
        } else {
            document.body.classList.remove('scr-modal-open');
        }
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
        try { await loadData(); } catch (e) { console.warn(e); }
        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
