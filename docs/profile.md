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

    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        if (!user) {
            document.getElementById('profile-container').innerHTML = `
                <p>⚠️ Вы не авторизованы.</p>
                <a href="/login/">Войти</a>
            `;
            return;
        }

        const username = user.user_metadata?.username || user.email.split('@')[0];
        document.getElementById('profile-container').innerHTML = `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6C63FF&color=fff&size=80&rounded=true" 
                     alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #6C63FF;">
                <div>
                    <h2 style="margin: 0;">${username}</h2>
                    <p style="margin: 0; color: #666;">${user.email}</p>
                    <p style="margin: 0; color: #666; font-size: 0.85rem;">Зарегистрирован: ${new Date(user.created_at).toLocaleDateString('ru-RU')}</p>
                </div>
            </div>
            
            <hr>
            
            <div style="margin-top: 20px; padding: 20px; background: #fff5f5; border: 1px solid #f5c6cb; border-radius: 8px;">
                <h3 style="color: #c0392b; margin-top: 0;">⚠️ Опасная зона</h3>
                <p style="font-size: 0.9rem; color: #666;">Удаление аккаунта — необратимое действие. Все ваши данные будут потеряны.</p>
                <button onclick="deleteAccount()" 
                        style="padding: 10px 24px; background: #c0392b; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">
                    🗑️ Удалить аккаунт
                </button>
            </div>
            
            <hr>
            
            <p><a href="#" onclick="client.auth.signOut(); location.href='/'; return false;" style="color: #6C63FF;">Выйти</a></p>
        `;
    }).catch((error) => {
        console.error('❌ Ошибка:', error);
        document.getElementById('profile-container').innerHTML = '<p>⚠️ Ошибка загрузки профиля.</p>';
    });
});

// --- БЕЗОПАСНАЯ функция удаления аккаунта через Edge Function ---
function deleteAccount() {
    // Подтверждение
    if (!confirm('⚠️ Вы уверены, что хотите удалить свой аккаунт?\n\nЭто действие НЕОБРАТИМО. Все ваши данные будут потеряны.')) {
        return;
    }
    
    const email = prompt('Введите ваш email для подтверждения:');
    if (!email) {
        alert('❌ Удаление отменено.');
        return;
    }
    
    const client = supabase.createClient(
        'https://ncytbgbzfjfoqmmgfygz.supabase.co',
        'sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D'
    );
    
    // Получаем текущего пользователя и токен
    client.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        const accessToken = data?.session?.access_token;
        
        if (!user || !accessToken) {
            alert('❌ Пользователь не найден.');
            return;
        }
        
        // Проверяем email
        if (email !== user.email) {
            alert('❌ Email не совпадает. Удаление отменено.');
            return;
        }
        
        // Вызываем Edge Function с токеном пользователя
        fetch('https://ncytbgbzfjfoqmmgfygz.supabase.co/functions/v1/delete-user', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'Ошибка удаления');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            alert('✅ Ваш аккаунт успешно удалён.');
            // Очищаем локальные данные
            localStorage.clear();
            sessionStorage.clear();
            // Перенаправляем на главную
            window.location.href = '/';
        })
        .catch(error => {
            console.error('❌ Ошибка удаления:', error);
            alert('❌ Не удалось удалить аккаунт: ' + error.message);
        });
    }).catch(error => {
        console.error('❌ Ошибка:', error);
        alert('❌ Ошибка при удалении аккаунта.');
    });
}
</script>
