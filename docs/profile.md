<h1>Мой профиль</h1>

<div id="profile-container">
    <p>Загрузка...</p>
</div>

<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

// ===== ВАШИ АВАТАРКИ =====
const AVATARS = [
    '/assets/images/авотарка%20девушки.png',
    '/assets/images/мужчина.png',
    '/assets/images/мужчина2.png',
    '/assets/images/мужчина%203.png',
];

document.addEventListener('DOMContentLoaded', function() {
    if (typeof supabase === 'undefined') {
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки Supabase.</p>';
        return;
    }

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    client.auth.getSession().then(async ({ data }) => {
        const user = data?.session?.user;
        if (!user) {
            document.getElementById('profile-container').innerHTML = `
                <p>⚠️ Вы не авторизованы.</p>
                <a href="/login/">Войти</a>
            `;
            return;
        }

        // Получаем профиль
        const { data: profile, error } = await client
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Ошибка загрузки профиля:', error);
            document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля.</p>';
            return;
        }

        let currentProfile = profile;
        if (!profile) {
            const { data: newProfile, error: insertError } = await client
                .from('profiles')
                .insert([{ user_id: user.id, username: user.email.split('@')[0] }])
                .select()
                .single();
            if (insertError) {
                console.error('Ошибка создания профиля:', insertError);
                document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка создания профиля.</p>';
                return;
            }
            currentProfile = newProfile;
        }

        // --- Получаем достижения ---
        const { data: userAchievements, error: achError } = await client
            .from('user_achievements')
            .select('achievement_id, earned_at')
            .eq('user_id', user.id);

        let achievementsList = [];
        if (!achError && userAchievements && userAchievements.length > 0) {
            const achIds = userAchievements.map(item => item.achievement_id);
            const { data: achievementsData, error: achInfoError } = await client
                .from('achievements')
                .select('*')
                .in('id', achIds);
            if (!achInfoError && achievementsData) {
                achievementsList = achievementsData;
            }
        }

        // --- Уровни и опыт ---
        const levelMap = [
            { level: 1, xp: 0, title: '🌱 Новый поселенец' },
            { level: 2, xp: 50, title: '🔭 Исследователь' },
            { level: 3, xp: 150, title: '🚀 Первопроходец' },
            { level: 4, xp: 350, title: '🏠 Колонизатор' },
            { level: 5, xp: 700, title: '⚡ Командир базы' },
            { level: 6, xp: 1200, title: '👑 Легенда Марса' }
        ];

        let userLevel = 1;
        let levelTitle = '🌱 Новый поселенец';
        let nextLevelXp = 50;
        let currentLevelXp = 0;
        let progressPercent = 0;

        for (let i = levelMap.length - 1; i >= 0; i--) {
            if (currentProfile.experience >= levelMap[i].xp) {
                userLevel = levelMap[i].level;
                levelTitle = levelMap[i].title;
                currentLevelXp = levelMap[i].xp;
                nextLevelXp = (i < levelMap.length - 1) ? levelMap[i + 1].xp : currentProfile.experience + 50;
                break;
            }
        }

        // Прогресс до следующего уровня (в %)
        if (nextLevelXp > currentLevelXp) {
            progressPercent = Math.min(
                ((currentProfile.experience - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100,
                100
            );
        } else {
            progressPercent = 100;
        }

        const username = currentProfile.username || user.email.split('@')[0];
        const avatar = currentProfile.avatar_url || AVATARS[0];
        const bio = currentProfile.bio || '✍️ Ещё ничего не рассказал о себе.';
        const notificationsEnabled = currentProfile.notifications_enabled !== false;

        // --- Рендерим профиль ---
        document.getElementById('profile-container').innerHTML = `
            <!-- Шапка профиля -->
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
                <div style="position: relative; flex-shrink: 0;">
                    <img src="${avatar}" alt="Avatar" 
                         style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid #6C63FF; object-fit: cover;">
                    <!-- Уровень — маленький и полупрозрачный, не перегораживает аватарку -->
                    <span style="position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%); 
                                 background: rgba(108, 99, 255, 0.85); color: #fff; 
                                 border-radius: 20px; padding: 2px 12px; 
                                 font-size: 10px; font-weight: 600; white-space: nowrap;
                                 backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.3);">
                        ${levelTitle}
                    </span>
                </div>
                <div style="flex: 1; min-width: 150px;">
                    <h2 style="margin: 0; font-size: 1.4rem;">${username}</h2>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">${user.email}</p>
                    <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: #555;">
                        ⭐ Уровень ${userLevel} • 📊 Опыт: ${currentProfile.experience}
                    </p>
                    <!-- Шкала опыта -->
                    <div style="margin-top: 6px; background: #e9ecef; border-radius: 10px; height: 8px; width: 100%; max-width: 300px; overflow: hidden;">
                        <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #6C63FF, #a29bfe); border-radius: 10px; transition: width 0.5s;"></div>
                    </div>
                    <p style="margin: 2px 0 0 0; font-size: 0.7rem; color: #999;">
                        до следующего уровня: ${nextLevelXp - currentProfile.experience} XP
                    </p>
                </div>
            </div>

            <!-- Биография -->
            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 8px 0; font-size: 1rem;">📝 О себе</h3>
                <p style="margin: 0; font-size: 0.95rem;" id="bio-text">${bio}</p>
                <button onclick="editBio()" style="margin-top: 8px; padding: 4px 16px; background: #6C63FF; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Редактировать</button>
            </div>

            <!-- Выбор аватарки -->
            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1rem;">🖼️ Выберите аватар</h3>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${AVATARS.map((url, index) => `
                        <img src="${url}" alt="Avatar ${index}" 
                             onclick="selectAvatar('${url}')"
                             style="width: 48px; height: 48px; border-radius: 50%; cursor: pointer; border: 2px solid ${avatar === url ? '#6C63FF' : '#ddd'}; object-fit: cover;">
                    `).join('')}
                </div>
            </div>

            <!-- Настройка уведомлений -->
            <div style="margin-bottom: 20px; padding: 12px 16px; background: #f0f4ff; border-radius: 8px; border: 1px solid #d0d9ff;">
                <label style="font-size: 0.9rem; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" id="notifications-checkbox" 
                           ${notificationsEnabled ? 'checked' : ''}
                           onchange="toggleNotifications()"
                           style="width: 18px; height: 18px; cursor: pointer;">
                    📧 Получать уведомления на email
                </label>
            </div>

            <hr>

            <!-- Достижения -->
            <div style="margin-top: 20px;">
                <h3 style="margin: 0 0 12px 0; font-size: 1rem;">🏅 Достижения</h3>
                ${achievementsList.length === 0 ? '<p style="color: #999; font-size: 0.9rem;">Пока нет достижений. Исследуйте Марс!</p>' : ''}
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${achievementsList.map(ach => `
                        <div style="background: #f0f0f0; padding: 6px 14px; border-radius: 20px; display: flex; align-items: center; gap: 6px; font-size: 0.85rem;">
                            <span>${ach.icon || '🏅'}</span>
                            <span>${ach.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <hr style="margin-top: 20px;">

            <!-- Опасная зона (компактно) -->
            <div style="margin-top: 20px; padding: 8px 12px; background: #fff5f5; border: 1px solid #f5c6cb; border-radius: 6px;">
                <details style="cursor: pointer;">
                    <summary style="font-size: 0.8rem; color: #c0392b; font-weight: 500;">⚠️ Опасная зона (удалить аккаунт)</summary>
                    <p style="font-size: 0.8rem; color: #666; margin: 8px 0 12px 0;">Удаление аккаунта — необратимое действие.</p>
                    <button onclick="deleteAccount()" 
                            style="padding: 4px 16px; background: #c0392b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                        🗑️ Удалить
                    </button>
                </details>
            </div>

            <hr>

            <p><a href="#" onclick="logoutUser(); return false;" style="color: #6C63FF; font-size: 0.9rem;">Выйти</a></p>
        `;

        // Сохраняем клиент и данные для функций
        window._profileClient = client;
        window._currentUser = user;
        window._currentProfile = currentProfile;

    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля.</p>';
    });
});

// ===== ФУНКЦИИ =====

function editBio() {
    const currentBio = document.getElementById('bio-text')?.innerText || '';
    const newBio = prompt('Введите вашу биографию:', currentBio);
    if (newBio === null) return;

    const client = window._profileClient;
    const user = window._currentUser;
    if (!client || !user) return;

    client
        .from('profiles')
        .update({ bio: newBio.trim() })
        .eq('user_id', user.id)
        .then(({ error }) => {
            if (error) {
                alert('❌ Ошибка сохранения: ' + error.message);
                return;
            }
            document.getElementById('bio-text').innerText = newBio.trim();
            alert('✅ Биография обновлена!');
        });
}

function selectAvatar(url) {
    const client = window._profileClient;
    const user = window._currentUser;
    if (!client || !user) return;

    client
        .from('profiles')
        .update({ avatar_url: url })
        .eq('user_id', user.id)
        .then(({ error }) => {
            if (error) {
                alert('❌ Ошибка: ' + error.message);
                return;
            }
            const avatarImg = document.querySelector('#profile-container img[style*="width: 100px;"]');
            if (avatarImg) avatarImg.src = url;
            alert('✅ Аватар обновлён!');
            location.reload(); // обновляем, чтобы подсветка выбранной аватарки обновилась
        });
}

function toggleNotifications() {
    const client = window._profileClient;
    const user = window._currentUser;
    const checked = document.getElementById('notifications-checkbox').checked;
    if (!client || !user) return;

    client
        .from('profiles')
        .update({ notifications_enabled: checked })
        .eq('user_id', user.id)
        .then(({ error }) => {
            if (error) {
                alert('❌ Ошибка: ' + error.message);
                return;
            }
            alert('✅ Настройка сохранена!');
        });
}

function deleteAccount() {
    if (!confirm('⚠️ Вы уверены, что хотите удалить аккаунт?')) return;
    const email = prompt('Введите ваш email для подтверждения:');
    if (!email) return;

    const client = window._profileClient;
    const user = window._currentUser;
    if (!client || !user) return;

    if (email !== user.email) {
        alert('❌ Email не совпадает.');
        return;
    }

    client.auth.getSession().then(({ data }) => {
        const accessToken = data?.session?.access_token;
        if (!accessToken) {
            alert('❌ Не удалось получить токен.');
            return;
        }

        fetch('https://ncytbgbzfjfoqmmgfygz.supabase.co/functions/v1/delete-user', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            alert('✅ Аккаунт удалён.');
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/';
        })
        .catch(err => {
            alert('❌ Ошибка: ' + err.message);
        });
    });
}

function logoutUser() {
    const client = window._profileClient;
    if (!client) return;
    client.auth.signOut().then(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    }).catch(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    });
}
</script>
