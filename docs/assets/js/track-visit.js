// docs/assets/js/track-visit.js
(function() {
    'use strict';

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

    // ============================================================
    // 1. ТОЧНАЯ КАРТА: конкретный ID статьи → её тип
    // ============================================================
    // Здесь перечислите все статьи, для которых нужен точный тип
    const PLACE_TYPES = {
        // --- Моря ---
        'acidalia-sea': 'sea',
        'argida': 'sea',
        
        // --- Города ---
        'okhasen': 'city',
        'rogen-aria': 'city',
        'akkha-kor': 'city',
        
        // --- Храмы ---
        'ksanf-temple': 'temple',
        
        // --- Пещеры ---
        'farsida-caves': 'cave',
        
        // --- Персонажи ---
        'hevsur': 'character',
        'talin': 'character',
        'ella': 'character',
        'aratan-iii': 'character',
        'yarra': 'character',
        'alira': 'character',
        'miran': 'character',
        'irayna': 'character',
        
        // --- История ---
        'periodization': 'history',
        'timeline': 'history',
        'myths': 'myth',
        'dying-era': 'history',
        'kingdoms-history': 'history',   // ← добавь свой ID
        
        // --- География ---
        'valles-marineris': 'geography',
        'water-on-mars': 'geography',
        
        // --- Религия ---
        'pantheon': 'religion',
        'prophecies': 'religion',
        
        // --- Астрономия ---
        'phobos-deimos': 'astronomy',
        'mars-sky': 'astronomy',
        'earth-as-target': 'astronomy',
        
        // --- Прочее ---
        'svitok-e': 'writing'
    };

    // ============================================================
    // 2. ЗАПАСНАЯ КАРТА: раздел (папка) → тип
    // ============================================================
    // Если ID нет в точной карте, определяем по родительской папке
    const SECTION_TYPES = {
        'geography': 'geography',   // ← теперь не "sea", а нейтрально
        'history': 'history',
        'people': 'character',
        'culture': 'culture',
        'astronomy': 'astronomy',
        'religion': 'religion',
        'technology': 'tech',
        'biology': 'biology',
        'books': 'book',
        'music': 'music'
    };

    // ============================================================
    // 3. ОПРЕДЕЛЕНИЕ ТИПА
    // ============================================================
    function getPlaceInfo() {
        const path = window.location.pathname;
        const parts = path.replace(/^\/|\/$/g, '').split('/');
        const last = parts[parts.length - 1] || 'home';
        const parent = parts[parts.length - 2] || '';

        // 3.1. Приоритет 1: тип задан вручную в <meta> статьи
        const metaType = document.querySelector('meta[name="place-type"]');
        if (metaType && metaType.content) {
            return { place_id: last, place_type: metaType.content };
        }

        // 3.2. Приоритет 2: точная карта по ID
        if (PLACE_TYPES[last]) {
            return { place_id: last, place_type: PLACE_TYPES[last] };
        }

        // 3.3. Приоритет 3: карта по разделу
        if (SECTION_TYPES[parent]) {
            return { place_id: last, place_type: SECTION_TYPES[parent] };
        }

        // 3.4. Fallback
        return { place_id: last, place_type: 'other' };
    }

    // ============================================================
    // 4. ЗАПИСЬ ПОСЕЩЕНИЯ
    // ============================================================
    function waitForSupabase(callback, attempts = 0) {
        if (window.supabase && window.supabase.createClient) {
            callback();
        } else if (attempts < 30) {
            setTimeout(() => waitForSupabase(callback, attempts + 1), 200);
        } else {
            console.warn('Supabase не загрузился — пропускаю запись');
        }
    }

    function recordVisit() {
        waitForSupabase(() => {
            const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            client.auth.getSession().then(({ data }) => {
                const user = data?.session?.user;
                if (!user) return;

                const info = getPlaceInfo();

                // Не дублируем в один день
                const today = new Date().toISOString().slice(0, 10);
                const storageKey = `visited_${info.place_id}_${today}`;
                if (localStorage.getItem(storageKey)) return;

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', recordVisit);
    } else {
        recordVisit();
    }

})();
