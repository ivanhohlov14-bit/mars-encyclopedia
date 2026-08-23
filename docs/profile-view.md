<h1>Профиль пользователя</h1>

<div id="profile-container">
    <p style="text-align: center; color: #999;">Загрузка...</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    if (typeof supabase === 'undefined') {
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки Supabase.</p>';
        return;
    }

    const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    if (!userId) {
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Пользователь не найден.</p>';
        return;
    }

    // === ЦВЕТА КОРОЛЕВСТВ ===
    const KINGDOM_COLORS = {
        'Аркадия': '#D4A574',
        'Ксанф': '#3D3D3D',
        'Эдем': '#F4A460',
        'Эридания': '#F5D76E',
        'Кхонг': '#A9A9A9',
        'Авсония': '#87CEEB',
        'Кимерия': '#B19CD9',
        'Серпентида': '#E57373',
        'Эритрей': '#64B5F6',
        'Утопия': '#4DD0E1',
        'Эллада': '#FF8A65',
        'Аливасото': '#81C784'
    };

    client
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
        .then(async ({ data: profile, error }) => {
            if (error || !profile) {
                document.getElementById('profile-container').innerHTML = '<p>⚠️ Пользователь не найден.</p>';
                return;
            }

            const displayName = profile.display_name || profile.username || 'Аноним';
            const kingdom = profile.kingdom || 'Эдем';
            const kingdomColor = KINGDOM_COLORS[kingdom] || '#6C63FF';
            const avatar = profile.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(displayName) + '&background=' + kingdomColor.replace('#', '') + '&color=fff&size=128';

            // Получаем текущего пользователя
            const { data: session } = await client.auth.getSession();
            const currentUser = session?.session?.user;
            const isOwnProfile = currentUser && currentUser.id === userId;

            // Проверяем статус дружбы
            let friendStatus = null;
            let friendButton = '';

            if (currentUser && !isOwnProfile) {
                const { data: friendData } = await client
                    .from('friends')
                    .select('status')
                    .or(`user_id.eq.${currentUser.id},friend_id.eq.${currentUser.id}`)
                    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
                    .limit(1);

                if (friendData && friendData.length > 0) {
                    friendStatus = friendData[0].status;
                }

                if (friendStatus === 'pending') {
                    friendButton = `<button style="padding: 8px 20px; background: #f39c12; color: #fff; border: none; border-radius: 6px; cursor: default; font-size: 0.95rem;">⏳ Заявка отправлена</button>`;
                } else if (friendStatus === 'accepted') {
                    friendButton = `<button style="padding: 8px 20px; background: #27ae60; color: #fff; border: none; border-radius: 6px; cursor: default; font-size: 0.95rem;">✅ В друзьях</button>`;
                } else {
                    friendButton = `<button onclick="window.addFriend('${userId}')" 
                                          style="padding: 8px 20px; background: ${kingdomColor}; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.95rem; transition: all 0.2s;"
                                          onmouseover="this.style.opacity='0.8'"
                                          onmouseout="this.style.opacity='1'">
                                        ➕ Добавить в друзья
                                    </button>`;
                }
            } else if (isOwnProfile) {
                friendButton = `<p style="color: #999; font-size: 0.95rem;">👤 Это вы</p>`;
            }

            // Королевство с флагом
            const flagPath = `/assets/images/flag-of-${kingdom.toLowerCase()}.png`;
            const flagExists = await fetch(flagPath, { method: 'HEAD' }).then(r => r.ok).catch(() => false);

            document.getElementById('profile-container').innerHTML = `
                <div style="max-width: 500px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; border: 2px solid ${kingdomColor};">
                    <!-- Шапка с цветом королевства -->
                    <div style="height: 6px; background: ${kingdomColor};"></div>

                    <!-- Основной блок -->
                    <div style="padding: 30px 28px 24px 28px; text-align: center;">
                        <!-- Аватар -->
                        <div style="position: relative; display: inline-block;">
                            <img src="${avatar}" alt="Avatar" 
                                 style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid ${kingdomColor}; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <span style="position: absolute; bottom: 4px; right: 4px; background: ${kingdomColor}; color: #fff; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 2px solid #fff;">
                                ${profile.level || 1}
                            </span>
                        </div>

                        <!-- Имя -->
                        <h2 style="margin: 16px 0 4px 0; font-size: 1.6rem; color: #2c3e50;">${displayName}</h2>

                        <!-- Королевство -->
                        <div style="margin: 6px 0 12px 0;">
                            <span style="display: inline-flex; align-items: center; gap: 6px; background: ${kingdomColor}20; color: ${kingdomColor}; padding: 4px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                                ${flagExists ? `<img src="${flagPath}" style="width: 20px; height: 14px; border-radius: 2px; object-fit: cover;">` : '🏰'}
                                ${kingdom}
                            </span>
                        </div>

                        <!-- Статистика -->
                        <div style="display: flex; justify-content: center; gap: 30px; margin: 16px 0; padding: 12px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">
                            <div>
                                <div style="font-size: 1.2rem; font-weight: 600; color: #2c3e50;">${profile.level || 1}</div>
                                <div style="font-size: 0.75rem; color: #999;">Уровень</div>
                            </div>
                            <div>
                                <div style="font-size: 1.2rem; font-weight: 600; color: #2c3e50;">${profile.experience || 0}</div>
                                <div style="font-size: 0.75rem; color: #999;">Опыт</div>
                            </div>
                            <div>
                                <div style="font-size: 1.2rem; font-weight: 600; color: #2c3e50;">${new Date(profile.created_at || Date.now()).toLocaleDateString('ru-RU')}</div>
                                <div style="font-size: 0.75rem; color: #999;">На сайте с</div>
                            </div>
                        </div>

                        <!-- Биография -->
                        ${profile.bio ? `
                            <div style="background: #f8f9fa; padding: 12px 16px; border-radius: 8px; margin: 12px 0 16px 0; text-align: left; font-size: 0.95rem; color: #555;">
                                <span style="font-weight: 500; color: #333;">📝</span> ${profile.bio}
                            </div>
                        ` : ''}

                        <!-- Кнопка дружбы -->
                        <div style="margin: 16px 0;">
                            ${friendButton}
                        </div>

                        <!-- Ссылка назад -->
                        <p style="margin: 12px 0 0 0; font-size: 0.9rem;">
                            <a href="/profile/" style="color: ${kingdomColor}; text-decoration: none; opacity: 0.7; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                                ← Вернуться в свой профиль
                            </a>
                        </p>
                    </div>
                </div>
            `;
        })
        .catch((error) => {
            console.error('Ошибка загрузки профиля:', error);
            document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля.</p>';
        });
});
</script>
