// streak-widget.js — плашка стрика в шапке
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    async function init() {
        if (typeof supabase === 'undefined') return;

        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) return;

        const { data: lastLogin } = await client
            .from('daily_logins')
            .select('streak, login_date')
            .eq('user_id', session.user.id)
            .order('login_date', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (!lastLogin) return;

        const today = new Date().toISOString().slice(0, 10);
        const isToday = lastLogin.login_date === today;
        const streak = lastLogin.streak || 0;
        if (streak < 1) return;

        // Ищем шапку
        const header = document.querySelector('.md-header__inner') || document.querySelector('.md-header');
        if (!header) return;

        // Удаляем старый виджет
        const old = document.getElementById('streak-widget');
        if (old) old.remove();

        const widget = document.createElement('div');
        widget.id = 'streak-widget';
        widget.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            margin-right: 12px;
            border-radius: 20px;
            background: linear-gradient(135deg, #e74c3c, #f39c12);
            color: #fff;
            font-size: 0.85rem;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.35);
            animation: streakPulse 2s ease-in-out infinite;
            cursor: pointer;
        `;
        widget.innerHTML = `🔥 ${streak} ${streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'}`;
        widget.title = isToday ? 'Стрик активен!' : 'Зайди сегодня, чтобы не потерять!';
        widget.onclick = () => window.location.href = '/stats/';

        // Вставляем в шапку
        const nav = header.querySelector('nav') || header;
        if (nav) nav.insertBefore(widget, nav.firstChild);

        // Стиль анимации
        if (!document.getElementById('streak-style')) {
            const style = document.createElement('style');
            style.id = 'streak-style';
            style.textContent = `
                @keyframes streakPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @media (max-width: 600px) {
                    #streak-widget { font-size: 0.75rem !important; padding: 4px 10px !important; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
    } else {
        setTimeout(init, 500);
    }
})();
