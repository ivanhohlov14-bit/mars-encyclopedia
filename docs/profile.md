<h1>Мой профиль</h1>

<style>
.help-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #e0e0e0;
    color: #555;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    margin-left: 6px;
    user-select: none;
    transition: background 0.2s, transform 0.2s;
    border: none;
    padding: 0;
    line-height: 1;
}
.help-trigger:hover { background: #bdbdbd; transform: scale(1.1); }
.help-trigger:active { transform: scale(0.95); }

.help-modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.2s ease;
}
.help-modal {
    background: #fff;
    max-width: 400px;
    width: 90%;
    padding: 24px 28px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    position: relative;
    animation: slideUp 0.25s ease;
}
.help-modal h4 { margin: 0 0 8px 0; color: #2c3e50; }
.help-modal p { margin: 0 0 12px 0; font-size: 0.95rem; line-height: 1.5; color: #444; }
.help-modal .close-btn {
    position: absolute;
    top: 12px;
    right: 16px;
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
    color: #999;
}
.help-modal .close-btn:hover { color: #333; }

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.chat-container {
    background: var(--kingdom-bg, #f8f9fa);
    border: 1px solid var(--kingdom-color, #6C63FF)40;
    border-radius: 8px;
    padding: 12px;
    max-height: 300px;
    overflow-y: auto;
    margin: 12px 0;
}
.chat-message {
    margin: 6px 0;
    padding: 8px 12px;
    border-radius: 12px;
    max-width: 80%;
    word-wrap: break-word;
}
.chat-message.user {
    background: var(--kingdom-color, #6C63FF);
    color: #fff;
    margin-left: auto;
}
.chat-message.bot {
    background: #e9ecef;
    color: #333;
    margin-right: auto;
}
.chat-input-row {
    display: flex;
    gap: 8px;
    margin-top: 8px;
}
.chat-input-row input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 0.9rem;
}
.chat-input-row button {
    padding: 8px 16px;
    background: var(--kingdom-color, #6C63FF);
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.leaderboard-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
}
.leaderboard-table th {
    background: var(--kingdom-color, #6C63FF);
    color: #fff;
    padding: 8px 12px;
    text-align: left;
}
.leaderboard-table td {
    padding: 6px 12px;
    border-bottom: 1px solid #eaecf0;
}
.leaderboard-table tr:hover {
    background: #f0f0f0;
}

:root {
    --kingdom-color: #6C63FF;
    --kingdom-bg: #f0f4ff;
    --kingdom-gradient: linear-gradient(135deg, #6C63FF, #a29bfe);
}
</style>

<div id="profile-container">
    <p>Загрузка...</p>
</div>

<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

const KINGDOMS = {
    'Аркадия': { color: '#D4A574', bg: '#FDF8F0', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-arcadia.png', gradient: 'linear-gradient(135deg, #D4A574, #E8C9A0)' },
    'Ксанф': { color: '#3D3D3D', bg: '#F5F5F5', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-ksanf.png', gradient: 'linear-gradient(135deg, #3D3D3D, #6B6B6B)' },
    'Эдем': { color: '#F4A460', bg: '#FFF8F0', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eden.jpg', gradient: 'linear-gradient(135deg, #F4A460, #F7C98A)' },
    'Эридания': { color: '#F5D76E', bg: '#FFFDF5', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eridania.png', gradient: 'linear-gradient(135deg, #F5D76E, #FAE9A0)' },
    'Кхонг': { color: '#A9A9A9', bg: '#F8F8F8', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-khong.png', gradient: 'linear-gradient(135deg, #A9A9A9, #C8C8C8)' },
    'Авсония': { color: '#87CEEB', bg: '#F0F8FF', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-avsonia.png', gradient: 'linear-gradient(135deg, #87CEEB, #B0D8EB)' },
    'Кимерия': { color: '#B19CD9', bg: '#F8F4FF', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-kimeria.png', gradient: 'linear-gradient(135deg, #B19CD9, #D1C4E9)' },
    'Серпентида': { color: '#E57373', bg: '#FFF5F5', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-serpentida.png', gradient: 'linear-gradient(135deg, #E57373, #F5A0A0)' },
    'Эритрей': { color: '#64B5F6', bg: '#F0F8FF', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-eritrea.png', gradient: 'linear-gradient(135deg, #64B5F6, #90CAF9)' },
    'Утопия': { color: '#4DD0E1', bg: '#F0FDFF', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-utopia.png', gradient: 'linear-gradient(135deg, #4DD0E1, #80DEEA)' },
    'Эллада': { color: '#FF8A65', bg: '#FFF5F0', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-hellas.png', gradient: 'linear-gradient(135deg, #FF8A65, #FFAB91)' },
    'Аливасото': { color: '#81C784', bg: '#F0FFF0', flag: 'https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/flag-of-alivasoto.png', gradient: 'linear-gradient(135deg, #81C784, #A5D6A7)' }
};

const AVATARS = [
    '/assets/images/авотарка%20девушки.png',
    '/assets/images/мужчина.png',
    '/assets/images/мужчина2.png',
    '/assets/images/мужчина%203.png'
];

const BAD_WORDS = [
    'хуй', 'пизда', 'хуе', 'ебал', 'ебать', 'бля', 'сука',
    'нахуй', 'пиздец', 'залупа', 'мудила', 'гандон', 'блядь',
    'пидор', 'гей', 'лох', 'дебил', 'идиот', 'кретин',
    'секс', 'порно', 'эротика', 'трахать', 'член',
    'жид', 'ниггер', 'чурка', 'хач',
    'fuck', 'shit', 'asshole', 'bitch', 'cunt', 'dick', 'pussy',
    'хуйло', 'еблан', 'мудак', 'урод', 'сволочь', 'тварь'
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

        // Получаем достижения
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

        // Получаем уведомления
        const { data: notifications, error: notifError } = await client
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);

        // Получаем лидеров
        const { data: leaders, error: leadersError } = await client
            .from('profiles')
            .select('username, display_name, experience, level, avatar_url')
            .order('experience', { ascending: false })
            .limit(10);

        if (leadersError) {
            console.error('Ошибка загрузки лидеров:', leadersError);
        }

        // Уровни
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

        if (nextLevelXp > currentLevelXp) {
            progressPercent = Math.min(
                ((currentProfile.experience - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100,
                100
            );
        } else {
            progressPercent = 100;
        }

        const username = currentProfile.username || user.email.split('@')[0];
        const displayName = currentProfile.display_name || username;
        const avatar = currentProfile.avatar_url || AVATARS[0];
        const bio = currentProfile.bio || '✍️ Ещё ничего не рассказал о себе.';
        const notificationsEnabled = currentProfile.notifications_enabled !== false;
        const kingdomName = currentProfile.kingdom || 'Эдем';
        const kingdom = KINGDOMS[kingdomName] || KINGDOMS['Эдем'];

        // Применяем тему
        document.documentElement.style.setProperty('--kingdom-color', kingdom.color);
        document.documentElement.style.setProperty('--kingdom-bg', kingdom.bg);
        document.documentElement.style.setProperty('--kingdom-gradient', kingdom.gradient);

        // Статистика статей по королевствам
        const articlesPerKingdom = {
            'Аркадия': 8, 'Ксанф': 10, 'Эдем': 12, 'Эридания': 9,
            'Кхонг': 11, 'Авсония': 7, 'Кимерия': 6, 'Серпентида': 5,
            'Эритрей': 13, 'Утопия': 8, 'Эллада': 4, 'Аливасото': 5,
            'Общие': 8
        };
        const totalArticles = Object.values(articlesPerKingdom).reduce((a, b) => a + b, 0);
        const readArticles = 0;

        // --- Рендерим профиль ---
        document.getElementById('profile-container').innerHTML = `
            <!-- Шапка -->
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
                <div style="position: relative; flex-shrink: 0;">
                    <img src="${avatar}" alt="Avatar" 
                         style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid ${kingdom.color}; object-fit: cover;">
                    <span style="position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%); 
                                 background: ${kingdom.color}; color: #fff; 
                                 border-radius: 20px; padding: 2px 12px; 
                                 font-size: 10px; font-weight: 600; white-space: nowrap;
                                 backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.3);">
                        ${levelTitle}
                    </span>
                </div>
                <div style="flex: 1; min-width: 150px;">
                    <h2 style="margin: 0; font-size: 1.4rem;">
                        ${displayName}
                        <button class="help-trigger" onclick="showHelp('Имя пользователя', 'Ваше уникальное имя.')">?</button>
                    </h2>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">${user.email}</p>
                    <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: #555;">
                        ⭐ Уровень ${userLevel}
                        <button class="help-trigger" onclick="showHelp('Уровень', 'Ваш ранг на сайте.')">?</button>
                        • 📊 Опыт: ${currentProfile.experience}
                        <button class="help-trigger" onclick="showHelp('Опыт', 'Очки за чтение статей (+5 XP).')">?</button>
                    </p>
                    <div style="margin-top: 6px; background: #e9ecef; border-radius: 10px; height: 8px; width: 100%; max-width: 300px; overflow: hidden; position: relative;">
                        <div style="width: ${progressPercent}%; height: 100%; background: ${kingdom.gradient}; border-radius: 10px; transition: width 0.5s;"></div>
                        <button class="help-trigger" onclick="showHelp('Шкала опыта', 'Прогресс до следующего уровня.')" 
                                style="position: absolute; right: -6px; top: -6px; width: 20px; height: 20px; font-size: 13px;">?</button>
                    </div>
                    <p style="margin: 2px 0 0 0; font-size: 0.7rem; color: #999;">
                        до следующего уровня: ${nextLevelXp - currentProfile.experience} XP
                    </p>
                </div>
            </div>

            <!-- Статистика -->
            <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; background: ${kingdom.bg}; border: 1px solid ${kingdom.color}40; padding: 12px 16px; border-radius: 8px;">
                <div><strong>📚 Всего статей:</strong> ${totalArticles}</div>
                <div><strong>📖 Прочитано:</strong> ${readArticles}</div>
                <div><strong>📅 Регистрация:</strong> ${new Date(user.created_at).toLocaleDateString('ru-RU')}</div>
            </div>

            <!-- Марсианский календарь -->
            <div id="martianCalendar" style="background: ${kingdom.bg}; border: 1px solid ${kingdom.color}40; padding: 16px; border-radius: 8px; max-width: 400px; margin: 20px auto; font-family: 'Georgia', serif; text-align: center;">
                <h3 style="margin:0 0 8px 0; color: #202122;">
                    <img src="https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/docs/assets/images/stickers/sticker-calendar.png"
                         style="width: 24px; height: 24px; display: inline; vertical-align: middle; margin-right: 6px;">
                    Марсианский календарь
                    <button class="help-trigger" onclick="showHelp('Марсианский календарь', 'Календарь Марса.')">?</button>
                </h3>
                <div id="martianDate" style="font-size:1.2rem; color: #202122;">Загрузка...</div>
            </div>

            <!-- Редактирование имени -->
            <div style="background: ${kingdom.bg}; border: 1px solid ${kingdom.color}40; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 8px 0; font-size: 1rem;">👤 Имя пользователя</h3>
                <p style="margin: 0 0 8px 0; font-size: 0.95rem;">Текущее: <strong id="display-name-text">${displayName}</strong></p>
                <button onclick="editDisplayName()" style="padding: 4px 16px; background: ${kingdom.color}; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Изменить имя</button>
            </div>

            <!-- Биография -->
            <div style="background: ${kingdom.bg}; border: 1px solid ${kingdom.color}40; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 8px 0; font-size: 1rem;">📝 О себе</h3>
                <p style="margin: 0; font-size: 0.95rem;" id="bio-text">${bio}</p>
                <button onclick="editBio()" style="margin-top: 8px; padding: 4px 16px; background: ${kingdom.color}; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Редактировать</button>
            </div>

            <!-- Выбор аватарки -->
            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1rem;">🖼️ Выберите аватар</h3>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${AVATARS.map((url, index) => `
                        <img src="${url}" alt="Avatar ${index}" 
                             onclick="selectAvatar('${url}')"
                             style="width: 48px; height: 48px; border-radius: 50%; cursor: pointer; border: 2px solid ${avatar === url ? kingdom.color : '#ddd'}; object-fit: cover;">
                    `).join('')}
                </div>
            </div>

            <!-- Выбор королевства -->
            <div style="margin-bottom: 20px; padding: 16px; background: ${kingdom.bg}; border-radius: 8px; border: 2px solid ${kingdom.color};">
                <h3 style="margin: 0 0 12px 0; font-size: 1rem;">🏰 Выберите королевство</h3>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${Object.keys(KINGDOMS).map(name => {
                        const k = KINGDOMS[name];
                        return `
                            <button onclick="selectKingdom('${name}')" 
                                    style="padding: 6px 12px; border: 2px solid ${currentProfile.kingdom === name ? k.color : '#ddd'}; 
                                           border-radius: 6px; background: ${currentProfile.kingdom === name ? k.color : '#fff'}; 
                                           color: ${currentProfile.kingdom === name ? '#fff' : '#333'}; 
                                           cursor: pointer; font-size: 0.75rem;">
                                ${name}
                            </button>
                        `;
                    }).join('')}
                </div>
                <div style="margin-top: 12px; text-align: center;">
                    <img src="${kingdom.flag}" alt="Флаг ${kingdomName}" style="width: 80px; height: auto; border-radius: 4px; border: 1px solid #a2a9b1;">
                    <div style="font-size: 0.7rem; color: #555; margin-top: 2px;">Флаг ${kingdomName}</div>
                </div>
            </div>

            <!-- Статьи по королевствам -->
            <div style="background: ${kingdom.bg}; border: 1px solid ${kingdom.color}40; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 12px 0; font-size: 1rem;">📚 Статьи по королевствам</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${Object.entries(articlesPerKingdom).map(([name, count]) => `
                        <span style="background: ${KINGDOMS[name] ? KINGDOMS[name].color : '#999'}; color: #fff; padding: 2px 10px; border-radius: 12px; font-size: 0.75rem;">
                            ${name}: ${count}
                        </span>
                    `).join('')}
                </div>
            </div>

            <!-- Уведомления -->
            <div style="margin-bottom: 20px; padding: 12px 16px; background: ${kingdom.bg}; border-radius: 8px; border: 1px solid ${kingdom.color}40;">
                <label style="font-size: 0.9rem; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" id="notifications-checkbox" 
                           ${notificationsEnabled ? 'checked' : ''}
                           onchange="toggleNotifications()"
                           style="width: 18px; height: 18px; cursor: pointer; accent-color: ${kingdom.color};">
                    📧 Получать уведомления на email
                </label>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1rem;">🔔 Последние уведомления</h3>
                ${notifications && notifications.length > 0 ? `
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${notifications.map(n => `
                            <li style="padding: 6px 0; border-bottom: 1px solid #eaecf0; font-size: 0.9rem; display: flex; justify-content: space-between;">
                                <span>${n.message}</span>
                                <span style="color: #999; font-size: 0.75rem;">${new Date(n.created_at).toLocaleDateString('ru-RU')}</span>
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p style="color: #999; font-size: 0.9rem;">Уведомлений пока нет.</p>'}
            </div>

            <hr>

            <!-- Достижения -->
            <div style="margin-top: 20px;">
                <h3 style="margin: 0 0 12px 0; font-size: 1rem;">🏅 Достижения</h3>
                ${achievementsList.length === 0 ? '<p style="color: #999; font-size: 0.9rem;">Пока нет достижений.</p>' : ''}
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${achievementsList.map(ach => `
                        <div style="background: #f0f0f0; padding: 6px 14px; border-radius: 20px; display: flex; align-items: center; gap: 6px; font-size: 0.85rem;">
                            <span>${ach.icon || '🏅'}</span>
                            <span>${ach.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <hr>

            <!-- ИИ-помощник -->
            <div style="margin-top: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1rem;">🤖 Марсианский ИИ-помощник</h3>
                <div class="chat-container" id="chatContainer">
                    <div class="chat-message bot">Привет! Спрашивай о Марсе! 🪐</div>
                </div>
                <div class="chat-input-row">
                    <input type="text" id="chatInput" placeholder="Спросите о Марсе..." onkeypress="if(event.key==='Enter') sendChatMessage()">
                    <button onclick="sendChatMessage()" style="background: ${kingdom.color};">Отправить</button>
                </div>
            </div>

            <hr>

            <!-- Таблица лидеров -->
            <div style="margin-top: 20px;">
                <details>
                    <summary style="cursor: pointer; font-size: 1.1rem; font-weight: bold; color: ${kingdom.color};">🏆 Таблица лидеров</summary>
                    ${leaders && leaders.length > 0 ? `
                        <table class="leaderboard-table" style="margin-top: 12px;">
                            <thead><tr><th>#</th><th>Участник</th><th>Уровень</th><th>Опыт</th></tr></thead>
                            <tbody>
                                ${leaders.map((leader, index) => {
                                    const leaderName = leader.display_name || leader.username;
                                    return `
                                        <tr>
                                            <td>${index + 1}</td>
                                            <td>
                                                <img src="${leader.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(leaderName) + '&background=6C63FF&color=fff&size=32'}" 
                                                     style="width: 24px; height: 24px; border-radius: 50%; vertical-align: middle; margin-right: 6px;">
                                                ${leaderName}
                                            </td>
                                            <td>${leader.level}</td>
                                            <td>${leader.experience}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    ` : '<p style="color: #999; font-size: 0.9rem;">Пока нет данных.</p>'}
                </details>
            </div>

            <hr>

            <!-- Опасная зона -->
            <div style="margin-top: 20px; padding: 8px 12px; background: #fff5f5; border: 1px solid #f5c6cb; border-radius: 6px;">
                <details>
                    <summary style="cursor: pointer; font-size: 0.8rem; color: #c0392b; font-weight: 500;">⚠️ Опасная зона (удалить аккаунт)</summary>
                    <p style="font-size: 0.8rem; color: #666; margin: 8px 0 12px 0;">Удаление аккаунта — необратимое действие.</p>
                    <button onclick="deleteAccount()" 
                            style="padding: 4px 16px; background: #c0392b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                        🗑️ Удалить
                    </button>
                </details>
            </div>

            <hr>

            <p><a href="/stats/" style="color: ${kingdom.color};">📊 Моя статистика</a> | <a href="#" onclick="logoutUser(); return false;" style="color: ${kingdom.color};">Выйти</a></p>
        `;

        window._profileClient = client;
        window._currentUser = user;
        window._currentProfile = currentProfile;

        // Марсианский календарь
        (function() {
            const months = [
                { name: 'Ākha-dzen', days: 31 }, { name: 'Kōl-khan', days: 30 },
                { name: 'Dzen-ākha', days: 32 }, { name: 'Khōsen', days: 31 },
                { name: 'Mar-dzen', days: 33 }, { name: 'Ariya-mar', days: 30 },
                { name: 'Zal-ākha', days: 31 }, { name: 'Thal-khō', days: 32 },
                { name: 'Kōl-ghar', days: 29 }, { name: 'Mōr-ākha', days: 31 },
                { name: 'Dzen-kōl', days: 30 }, { name: 'Xal-mar', days: 28 },
                { name: 'Lān-sen', days: 29 }, { name: 'Khō-mōr', days: 31 },
                { name: 'Ākha-mōr', days: 32 }, { name: 'Kōl-suf', days: 33 },
                { name: 'Dzen-thal', days: 31 }, { name: 'Ghōl-ākha', days: 30 },
                { name: 'Rōg-ari', days: 29 }, { name: 'Mar-lān', days: 31 },
                { name: 'Ksanf-suf', days: 32 }, { name: 'Yar-okh', days: 33 }
            ];
            const MARTIAN_YEAR_DAYS = months.reduce((sum, m) => sum + m.days, 0);
            const EARTH_DAYS_IN_MARTIAN_YEAR = 668.6;
            const BOOK_REF_YEAR = 2740;
            const BOOK_REF_DAYS_AGO = 3798000000;

            function getMartianDate() {
                const now = new Date();
                const earthDaysFromStart = (now.getTime() - new Date(2026, 0, 1).getTime()) / (1000 * 60 * 60 * 24);
                const martianYearsOffset = earthDaysFromStart / EARTH_DAYS_IN_MARTIAN_YEAR;
                const baseYear = BOOK_REF_DAYS_AGO + BOOK_REF_YEAR;
                const year = Math.floor(baseYear + martianYearsOffset);
                const dayOfYear = Math.floor((earthDaysFromStart * (MARTIAN_YEAR_DAYS / EARTH_DAYS_IN_MARTIAN_YEAR)) % MARTIAN_YEAR_DAYS);
                let remaining = dayOfYear;
                let monthIndex = 0;
                for (let i = 0; i < months.length; i++) {
                    if (remaining < months[i].days) {
                        monthIndex = i;
                        break;
                    }
                    remaining -= months[i].days;
                }
                const day = remaining + 1;
                const seasonNames = ['Пробуждение', 'Цветение', 'Зной', 'Ветры', 'Угасание', 'Заморозки', 'Тьма', 'Ледяной покров'];
                const season = seasonNames[Math.floor(monthIndex / 2) % seasonNames.length];
                return { year: year.toLocaleString(), month: months[monthIndex].name, day, season };
            }

            const date = getMartianDate();
            const el = document.getElementById('martianDate');
            if (el) {
                el.innerHTML = `
                    <div><strong>${date.month}</strong> ${date.day}‑й день</div>
                    <div>Год ${date.year} Э.О.</div>
                    <div style="font-size:0.9rem; color:#555; margin-top:4px;">${date.season}</div>
                `;
            }
        })();

    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля.</p>';
    });
});

// ===== ФУНКЦИИ =====

function showHelp(title, description) {
    const oldOverlay = document.querySelector('.help-modal-overlay');
    if (oldOverlay) oldOverlay.remove();

    const overlay = document.createElement('div');
    overlay.className = 'help-modal-overlay';
    overlay.innerHTML = `
        <div class="help-modal">
            <button class="close-btn" onclick="this.closest('.help-modal-overlay').remove()">✕</button>
            <h4>${title}</h4>
            <p>${description}</p>
            <button onclick="this.closest('.help-modal-overlay').remove()" 
                    style="padding: 6px 20px; background: var(--kingdom-color, #6C63FF); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">
                Понятно
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.remove();
    });
}
window.showHelp = showHelp;

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
            location.reload();
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

function editDisplayName() {
    const client = window._profileClient;
    const user = window._currentUser;
    if (!client || !user) return;

    const currentName = document.getElementById('display-name-text')?.innerText || '';
    const newName = prompt('Введите новое имя (от 2 до 20 символов, только латиница):', currentName);
    if (!newName || newName === currentName) return;

    if (newName.length < 2 || newName.length > 20) {
        alert('❌ Имя должно быть от 2 до 20 символов.');
        return;
    }

    if (!/^[a-zA-Z0-9\s\-_]+$/.test(newName)) {
        alert('❌ Только латинские буквы, цифры, пробелы, дефис и подчёркивание.');
        return;
    }

    const lowerName = newName.toLowerCase();
    for (const badWord of BAD_WORDS) {
        if (lowerName.includes(badWord)) {
            alert('❌ Имя содержит недопустимое слово.');
            return;
        }
    }

    client
        .from('profiles')
        .update({ display_name: newName.trim() })
        .eq('user_id', user.id)
        .then(({ error }) => {
            if (error) {
                alert('❌ Ошибка: ' + error.message);
                return;
            }
            document.getElementById('display-name-text').innerText = newName.trim();
            alert('✅ Имя обновлено!');
            location.reload();
        });
}

function selectKingdom(name) {
    const client = window._profileClient;
    const user = window._currentUser;
    if (!client || !user) return;

    const kingdom = KINGDOMS[name];
    if (!kingdom) return;

    client
        .from('profiles')
        .update({ kingdom: name })
        .eq('user_id', user.id)
        .then(({ error }) => {
            if (error) {
                alert('❌ Ошибка: ' + error.message);
                return;
            }
            alert(`✅ Вы выбрали королевство ${name}!`);
            location.reload();
        });
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const container = document.getElementById('chatContainer');
    const question = input.value.trim();
    if (!question) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.textContent = question;
    container.appendChild(userMsg);
    container.scrollTop = container.scrollHeight;
    input.value = '';

    try {
        const response = await fetch(
            'https://ncytbgbzfjfoqmmgfygz.supabase.co/functions/v1/ai-chat',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question })
            }
        );
        const data = await response.json();
        const reply = data.reply || data.error || 'Не удалось получить ответ.';

        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.textContent = reply;
        container.appendChild(botMsg);
        container.scrollTop = container.scrollHeight;
    } catch (err) {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.textContent = '⚠️ Ошибка соединения с ИИ. Попробуйте позже.';
        container.appendChild(botMsg);
        container.scrollTop = container.scrollHeight;
    }
}
window.sendChatMessage = sendChatMessage;

function deleteAccount() {
    if (!confirm('⚠️ Вы уверены?')) return;
    const email = prompt('Введите ваш email:');
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
