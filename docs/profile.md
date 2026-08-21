<h1>Мой профиль</h1>

<div id="profile-container">
    <p>Загрузка...</p>
</div>

<script>
const SUPABASE_URL = "https://ncytbgbzfjfoqmmgfygz.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D";

document.addEventListener('DOMContentLoaded', function() {
    if (typeof supabase === 'undefined') {
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки Supabase.</p>';
        return;
    }

    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Получаем текущего пользователя
    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        if (!user) {
            document.getElementById('profile-container').innerHTML = `
                <p>⚠️ Вы не авторизованы.</p>
                <a href="/login/">Войти</a>
            `;
            return;
        }

        // Загружаем профиль из таблицы profiles
        client.from('profiles').select('*').eq('id', user.id).then(({ data: profileData, error }) => {
            const profile = profileData?.[0] || {};
            const username = profile.username || user.user_metadata?.username || user.email.split('@')[0];
            const avatarUrl = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6C63FF&color=fff&size=200&rounded=true`;
            const bio = profile.bio || '';

            document.getElementById('profile-container').innerHTML = `
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                    <div style="position: relative;">
                        <img src="${avatarUrl}" 
                             alt="Avatar" id="profile-avatar"
                             style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid #6C63FF; object-fit: cover;">
                        <button onclick="document.getElementById('avatar-input').click()" 
                                style="position: absolute; bottom: 0; right: 0; background: #6C63FF; color: #fff; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 16px;">
                            ✏️
                        </button>
                        <input type="file" id="avatar-input" accept="image/*" style="display: none;" onchange="uploadAvatar(event)">
                    </div>
                    <div>
                        <h2 style="margin: 0;" id="profile-username">${username}</h2>
                        <p style="margin: 0; color: #666;">${user.email}</p>
                        <p style="margin: 0; color: #666; font-size: 0.85rem;">Зарегистрирован: ${new Date(user.created_at).toLocaleDateString('ru-RU')}</p>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <label for="bio-input">Описание профиля</label>
                    <textarea id="bio-input" rows="3" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit;">${bio}</textarea>
                </div>
                <button onclick="updateProfile()" style="padding: 10px 20px; background: #6C63FF; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
                    Сохранить изменения
                </button>
                <hr>
                <a href="#" onclick="client.auth.signOut(); location.href='/'; return false;" style="color: #c0392b;">Выйти</a>
            `;

            // Сохраняем данные для обновления
            window._profileData = { user, profile, username, avatarUrl };
        });
    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля.</p>';
    });
});

// --- Загрузка аватара ---
function uploadAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;

    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );

    // Загружаем файл в Storage
    const filePath = `avatars/${Date.now()}_${file.name}`;
    client.storage.from('avatars').upload(filePath, file).then(({ data, error }) => {
        if (error) {
            alert('Ошибка загрузки аватара: ' + error.message);
            return;
        }

        // Получаем публичную ссылку
        const { data: urlData } = client.storage.from('avatars').getPublicUrl(filePath);
        const avatarUrl = urlData.publicUrl;

        // Обновляем профиль
        const profile = window._profileData?.profile || {};
        client.from('profiles').upsert({
            id: window._profileData.user.id,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString()
        }).then(() => {
            document.getElementById('profile-avatar').src = avatarUrl;
            alert('✅ Аватар обновлён!');
        });
    });
}

// --- Обновление профиля ---
function updateProfile() {
    const bio = document.getElementById('bio-input').value;
    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );

    const user = window._profileData?.user;
    if (!user) return;

    client.from('profiles').upsert({
        id: user.id,
        bio: bio,
        updated_at: new Date().toISOString()
    }).then(({ error }) => {
        if (error) {
            alert('Ошибка сохранения: ' + error.message);
            return;
        }
        alert('✅ Профиль обновлён!');
    });
}
</script>
