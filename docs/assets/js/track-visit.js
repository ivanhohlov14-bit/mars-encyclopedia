// docs/assets/js/track-visit.js
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // Ждём, пока Supabase загрузится (он подключён на страницах)
    function waitForSupabase(callback, attempts = 0) {
        if (window.supabase && window.supabase.createClient) {
            callback();
        } else if (attempts < 30) {
            setTimeout(() => waitForSupabase(callback, attempts + 1), 200);
        } else {
            console.warn('Supabase не загрузился — пропускаю запись посещения');
        }
    }

    // Определяем type по URL
    function getPlaceInfo(path) {
        // Пример пути: /mars-encyclopedia/geography/acidalia-sea/
        const parts = path.replace(/^\/|\/$/g, '').split('/');
        const last = parts[parts.length - 1] || 'home';
        const parent = parts[parts.length - 2] || '';

        // Маппинг разделов → типы
        const typeMap = {
            'geography': 'sea',
            'people': 'character',
            'history': 'history',
            'culture': 'culture',
            'astronomy': 'astronomy',
            'religion': 'temple',
            'technology': 'tech',
            'biology': 'biology'
        };

        return {
            place_id: last,
            place_type: typeMap[parent] || 'other'
        };
    }

    // Записываем посещение
    function recordVisit() {
        waitForSupabase(() => {
            const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            client.auth.getSession().then(({ data }) => {
                const user = data?.session?.user;
                if (!user) return; // неавторизованные не пишем

                const info = getPlaceInfo(window.location.pathname);

                // Проверяем, не записывали ли уже сегодня
                const today = new Date().toISOString().slice(0, 10);
                const storageKey = `visited_${info.place_id}_${today}`;

                if (localStorage.getItem(storageKey)) {
                    return; // уже посещали сегодня — не дублируем
                }

                client.from('user_visits').insert({
                    user_id: user.id,
                    place_id: info.place_id,
                    place_type: info.place_type,
                    visited_at: new Date().toISOString()
                }).then(({ error }) => {
                    if (error) {
                        console.error('Ошибка записи посещения:', error);
                    } else {
                        localStorage.setItem(storageKey, '1');
                        console.log('✅ Посещение записано:', info);
                    }
                });
            });
        });
    }

    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', recordVisit);
    } else {
        recordVisit();
    }

})();
