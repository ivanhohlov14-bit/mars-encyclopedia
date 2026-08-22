<h1>Мой профиль</h1>

<div id="profile-container">
    <p>Загрузка...</p>
</div>

<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

// Предустановленные аватарки (ссылки на бесплатные иконки)
const AVATARS = [
    'https://ui-avatars.com/api/?name=Mars&background=6C63FF&color=fff&size=128',
    'https://ui-avatars.com/api/?name=Red&background=C0392B&color=fff&size=128',
    'https://ui-avatars.com/api/?name=Space&background=2C3E50&color=fff&size=128',
    'https://ui-avatars.com/api/?name=Rover&background=F39C12&color=fff&size=128',
    'https://ui-avatars.com/api/?name=Explorer&background=1ABC9C&color=fff&size=128'
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

        // Получаем профиль пользователя
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

        // Если профиля нет — создаём (на случай, если триггер не сработал)
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

        // Получаем достижения пользователя (исправленный запрос)
const { data: userAchievements, error: achError } = await client
    .from('user_achievements')
    .select('achievement_id, earned_at')
    .eq('user_id', user.id);

let achievementsList = [];
if (!achError && userAchievements && userAchievements.length > 0) {
    // Получаем ID достижений
    const achIds = userAchievements.map(item => item.achievement_id);
    
    // Загружаем информацию о достижениях
    const { data: achievementsData, error: achInfoError } = await client
        .from('achievements')
        .select('*')
        .in('id', achIds);
    
    if (!achInfoError && achievementsData) {
        achievementsList = achievementsData;
    }
}

        // Определяем уровень на основе опыта
        const levelMap = [
            { level: 1, xp: 0, title: 'Новый поселенец' },
            { level: 2, xp: 50, title: 'Исследователь' },
            { level: 3, xp: 150, title: 'Первопроходец' },
            { level: 4, xp: 350, title: 'Колонизатор' },
            { level: 5, xp: 700, title: 'Командир базы' },
            { level: 6, xp: 1200, title: 'Легенда Марса' }
        ];

        let userLevel = 1;
        let levelTitle = 'Новый поселенец';
        for (let i = levelMap.length - 1; i >= 0; i--) {
            if (currentProfile.experience >= levelMap[i].xp) {
                userLevel = levelMap[i].level;
                levelTitle = levelMap[i].title;
                break;
            }
        }

        const username = currentProfile.username || user.email.split('@')[0];
        const avatar = currentProfile.avatar_url || AVATARS[0];
        const bio = currentProfile.bio || '✍️ Ещё ничего не рассказал о себе.';

        // Рендерим профиль
        document.getElementById('profile-container').innerHTML = `
            <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 24px; flex-wrap: wrap;">
                <div style="position: relative;">
                    <img src="${avatar}" alt="Avatar" 
                         style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid #6C63FF; object-fit: cover;">
                    <span style="position: absolute; bottom: 0; right: 0; background: #6C63FF; color: #fff; border-radius: 12px; padding: 2px 10px; font-size: 12px; font-weight: bold;">
                        ${levelTitle}
                    </span>
                </div>
                <div>
                    <h2 style="margin: 0;">${username}</h2>
                    <p style="margin: 0; color: #666;">${user.email}</p>
                    <p style="margin: 4px 0 0 0; font-size: 0.9rem;">
                        ⭐ Уровень ${userLevel} • 📊 Опыт: ${currentProfile.experience}
                    </p>
                </div>
            </div>

            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 8px 0;">📝 О себе</h3>
                <p style="margin: 0;" id="bio-text">${bio}</p>
                <button onclick="editBio()" style="margin-top: 8px; padding: 4px 12px; background: #6C63FF; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Редактировать</button>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 12px 0;">🖼️ Выберите аватар</h3>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${AVATARS.map((url, index) => `
                        <img src="${url}" alt="Avatar ${index}" 
                             onclick="selectAvatar('${url}')"
                             style="width: 48px; height: 48px; border-radius: 50%; cursor: pointer; border: 2px solid ${avatar === url ? '#6C63FF' : '#ddd'}; object-fit: cover;">
                    `).join('')}
                </div>
            </div>

            <hr>

            <div style="margin-top: 20px;">
                <h3 style="margin: 0 0 12px 0;">🏅 Достижения</h3>
                ${achievementsList.length === 0 ? '<p style="color: #999;">Пока нет достижений. Исследуйте Марс!</p>' : ''}
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    ${achievementsList.map(ach => `
                        <div style="background: #f0f0f0; padding: 8px 16px; border-radius: 20px; display: flex; align-items: center; gap: 6px;">
                            <span>${ach.icon || '🏅'}</span>
                            <span>${ach.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <hr style="margin-top: 20px;">

            <div style="margin-top: 20px; padding: 20px; background: #fff5f5; border: 1px solid #f5c6cb; border-radius: 8px;">
                <h3 style="color: #c0392b; margin-top: 0;">⚠️ Опасная зона</h3>
                <p style="font-size: 0.9rem; color: #666;">Удаление аккаунта — необратимое действие.</p>
                <button onclick="deleteAccount()" 
                        style="padding: 8px 20px; background: #c0392b; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
                    🗑️ Удалить аккаунт
                </button>
            </div>

            <hr>

            <p><a href="#" onclick="logoutUser(); return false;" style="color: #6C63FF;">Выйти</a></p>
        `;

        // Делаем клиент и функции глобальными для использования в onclick
        window._profileClient = client;
        window._currentUser = user;
        window._currentProfile = currentProfile;
        window._achievementsList = achievementsList;

    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля.</p>';
    });
});

// --- Функция редактирования биографии ---
function editBio() {
    const currentBio = document.getElementById('bio-text')?.innerText || '';
    const newBio = prompt('Введите вашу биографию:', currentBio);
    if (newBio === null) return; // отмена

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

// --- Функция выбора аватара ---
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
            // Обновляем аватар на странице
            const avatarImg = document.querySelector('#profile-container img[style*="width: 100px;"]');
            if (avatarImg) avatarImg.src = url;
            alert('✅ Аватар обновлён!');
        });
}

// --- Функция удаления аккаунта (используем Edge Function, как настраивали ранее) ---
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

// --- Функция выхода (из auth-button.js, дублируем для надёжности) ---
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
