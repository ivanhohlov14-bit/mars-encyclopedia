---
title: Предложить список
description: Отправьте свой список на рассмотрение Совету Академии Окхасена
---

<div class="submit-page">

<div class="submit-hero">
  <div class="submit-hero-content">
    <div class="submit-hero-badge">Совет Академии Окхасена</div>
    <h1>Предложить свой список</h1>
    <p>Если у вас есть список, который соответствует всем критериям избранного, отправьте его на рассмотрение. Лучшие работы пополнят раздел избранных списков</p>
  </div>
</div>

<!-- ============ ФОРМА ============ -->
<div id="submit-form-wrap" class="submit-form-wrap">

  <div class="submit-criteria">
    <h3>Критерии избранного списка</h3>
    <div class="criteria-row">
      <div class="criteria-chip"><strong>Полнота</strong> — все значимые элементы</div>
      <div class="criteria-chip"><strong>Точность</strong> — подтверждённые факты</div>
      <div class="criteria-chip"><strong>Структура</strong> — введение, группировка</div>
      <div class="criteria-chip"><strong>Оформление</strong> — единый стиль</div>
    </div>
  </div>

  <form id="submit-form" class="submit-form">

    <div class="field-row">
      <div class="field-group">
        <label for="f-author">Ваше имя <span class="req">*</span></label>
        <input type="text" id="f-author" required placeholder="Например: Хевсур, писец Академии">
      </div>
      <div class="field-group">
        <label for="f-email">Email для связи</label>
        <input type="email" id="f-email" placeholder="you@example.com">
      </div>
    </div>

    <div class="field-group">
      <label for="f-title">Название списка <span class="req">*</span></label>
      <input type="text" id="f-title" required placeholder="Например: Список королей Эдема">
    </div>

    <div class="field-group">
      <label for="f-dynasty">Династия / Тема</label>
      <input type="text" id="f-dynasty" placeholder="Например: Сарумиды">
    </div>

    <div class="field-group">
      <label for="f-summary">Краткое описание <span class="req">*</span></label>
      <textarea id="f-summary" required rows="3" placeholder="О чём этот список? Что в него входит? 1–3 предложения"></textarea>
      <div class="field-hint">Это описание появится в карточке списка на главной.</div>
    </div>

    <div class="field-group">
      <label for="f-content">Содержание списка <span class="req">*</span></label>
      <textarea id="f-content" required rows="14" placeholder="Вставьте таблицу с правителями или список с датами. Поддерживается Markdown — таблицы, списки, ссылки."></textarea>
      <div class="field-hint">
        Используйте Markdown-таблицы для структуры. Пример:
        <code>| № | Имя | Годы | Примечания |</code>
      </div>
    </div>

    <div class="field-group">
      <label for="f-image">URL изображения (герб, иллюстрация)</label>
      <input type="url" id="f-image" placeholder="https://raw.githubusercontent.com/.../image.jpg">
    </div>

    <div class="submit-actions">
      <button type="submit" id="submit-btn" class="btn-primary">
        Отправить на рассмотрение
      </button>
      <button type="button" id="reset-btn" class="btn-secondary">
        Очистить
      </button>
    </div>

    <div id="form-status" class="form-status"></div>

  </form>
</div>

<!-- ============ СПАСИБО ============ -->
<div id="submit-thanks" class="submit-thanks" style="display:none;">
  <div class="thanks-icon">✓</div>
  <h2>Заявка отправлена</h2>
  <p>Совет Академии рассмотрит ваш список в течение нескольких дней. Если он будет одобрен, вы увидите его в разделе избранных.</p>
  <div class="thanks-actions">
    <a href="https://mars-wiki.ru/lists/" class="btn-primary">← К избранным спискам</a>
    <button type="button" id="again-btn" class="btn-secondary">Отправить ещё</button>
  </div>
</div>

<!-- ============ МОИ ЗАЯВКИ ============ -->
<div id="my-submissions-wrap" class="my-subs" style="display:none;">
  <h2>Ваши заявки</h2>
  <div id="my-submissions-list"></div>
</div>

</div>

<style>
/* ========== Страница подачи заявок — VIP ========== */

.submit-page { max-width: 900px; margin: 0 auto; padding: 0 8px; }

/* Hero */
.submit-hero {
  position: relative;
  padding: 44px 36px;
  margin: 0 0 32px 0;
  border-radius: 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 40%, #4a2a3a 100%);
  box-shadow: 0 20px 60px -20px rgba(108, 99, 255, 0.4);
  overflow: hidden;
}
.submit-hero::before {
  content: '';
  position: absolute;
  top: -50%; right: -10%;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(162, 155, 254, 0.25) 0%, transparent 70%);
  pointer-events: none;
}
.submit-hero-content { position: relative; z-index: 1; }
.submit-hero-badge {
  display: inline-block; padding: 5px 12px; margin-bottom: 12px;
  background: rgba(162, 155, 254, 0.15);
  border: 1px solid rgba(162, 155, 254, 0.4);
  border-radius: 20px;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.7rem; font-weight: 700; color: #A29BFE;
  text-transform: uppercase; letter-spacing: 1.5px;
}
.submit-hero-content h1 {
  margin: 0 0 10px 0;
  font-family: 'Georgia', serif;
  font-size: 2.2rem; font-weight: 400; color: #fff !important;
  letter-spacing: 1px; line-height: 1.15; border: none; padding: 0;
}
.submit-hero-content p {
  margin: 0; max-width: 640px;
  color: rgba(255, 255, 255, 0.75) !important;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem; line-height: 1.55;
}

/* Критерии */
.submit-criteria {
  padding: 22px 26px; margin-bottom: 24px;
  background: #f8f8fc; border: 1px solid #e5e5ec;
  border-radius: 16px;
}
.submit-criteria h3 {
  margin: 0 0 14px 0;
  font-family: 'Georgia', serif; font-size: 1.1rem;
  color: #1a1a2e;
}
.criteria-row { display: flex; flex-wrap: wrap; gap: 10px; }
.criteria-chip {
  padding: 8px 14px;
  background: #fff;
  border: 1px solid #e5e5ec;
  border-radius: 20px;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.85rem; color: #555;
}
.criteria-chip strong { color: #6C63FF; }

/* Форма */
.submit-form-wrap {
  padding: 32px 36px;
  background: #fff;
  border: 1px solid #e5e5ec;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 32px;
}
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.field-group { margin-bottom: 20px; }
.field-group label {
  display: block; margin-bottom: 8px;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.88rem; font-weight: 700; color: #1a1a2e;
}
.field-group .req { color: #e74c3c; }
.field-group input,
.field-group textarea {
  width: 100%; padding: 12px 16px;
  border: 1px solid #d8d8e0;
  border-radius: 10px;
  font-family: 'Georgia', serif; font-size: 0.98rem;
  color: #1a1a2e; background: #fafafc;
  transition: all 0.2s;
  box-sizing: border-box;
}
.field-group input:focus,
.field-group textarea:focus {
  outline: none; background: #fff;
  border-color: #6C63FF;
  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.12);
}
.field-group textarea { resize: vertical; min-height: 80px; line-height: 1.55; }
.field-hint {
  margin-top: 6px; font-size: 0.78rem; color: #888;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
}
.field-hint code {
  background: #f0f0f8; padding: 1px 6px;
  border-radius: 4px; font-size: 0.85em;
  color: #4a3fd9;
}

/* Кнопки */
.submit-actions {
  display: flex; gap: 12px; flex-wrap: wrap;
  padding-top: 8px;
}
.btn-primary, .btn-secondary {
  padding: 13px 26px;
  border: none; border-radius: 30px;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem; font-weight: 800;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none !important;
  display: inline-block;
}
.btn-primary {
  background: linear-gradient(135deg, #6C63FF, #A29BFE);
  color: #fff !important;
  box-shadow: 0 8px 20px rgba(108, 99, 255, 0.35);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(108, 99, 255, 0.5);
}
.btn-primary:disabled {
  opacity: 0.5; cursor: not-allowed;
  transform: none; box-shadow: none;
}
.btn-secondary {
  background: #f0f0f5; color: #333 !important;
  border: 1px solid #e5e5ec;
}
.btn-secondary:hover { background: #e8e8f0; }

/* Статус */
.form-status {
  margin-top: 16px; padding: 12px 16px;
  border-radius: 10px; font-size: 0.9rem;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  display: none;
}
.form-status.success {
  display: block;
  background: #e8f7ee; color: #1a7a3d;
  border: 1px solid #a0d8b5;
}
.form-status.error {
  display: block;
  background: #fdecea; color: #c0392b;
  border: 1px solid #f5c0b8;
}

/* Спасибо */
.submit-thanks {
  padding: 48px 36px;
  text-align: center;
  background: #fff;
  border: 1px solid #e5e5ec;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 32px;
}
.thanks-icon {
  width: 72px; height: 72px; margin: 0 auto 20px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 2rem; font-weight: 900;
  box-shadow: 0 12px 32px rgba(39, 174, 96, 0.4);
}
.submit-thanks h2 {
  margin: 0 0 12px 0;
  font-family: 'Georgia', serif; font-size: 1.6rem;
  color: #1a1a2e;
}
.submit-thanks p {
  margin: 0 auto 24px auto; max-width: 480px;
  font-family: 'Georgia', serif; font-size: 1rem;
  line-height: 1.6; color: #555;
}
.thanks-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

/* Мои заявки */
.my-subs {
  padding: 28px 32px;
  background: #fff; border: 1px solid #e5e5ec;
  border-radius: 20px;
}
.my-subs h2 {
  margin: 0 0 20px 0;
  font-family: 'Georgia', serif; font-size: 1.4rem;
  color: #1a1a2e;
  padding-bottom: 10px; border-bottom: 2px solid #6C63FF;
  display: inline-block;
}
.my-sub-card {
  display: flex; justify-content: space-between;
  gap: 16px; padding: 16px 18px;
  background: #f8f8fc; border: 1px solid #e5e5ec;
  border-radius: 12px;
  margin-bottom: 12px; flex-wrap: wrap;
}
.my-sub-info { flex: 1; min-width: 220px; }
.my-sub-title {
  font-family: 'Georgia', serif; font-weight: 700;
  font-size: 1.02rem; color: #1a1a2e; margin-bottom: 4px;
}
.my-sub-date {
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.8rem; color: #888;
}
.my-sub-status {
  padding: 5px 12px;
  border-radius: 12px;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.72rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.8px;
  align-self: flex-start;
}
.status-pending { background: #fff4d6; color: #a06a00; }
.status-approved { background: #e8f7ee; color: #1a7a3d; }
.status-rejected { background: #fdecea; color: #c0392b; }

/* Тёмная тема */
html body.mars-stars-on .submit-criteria,
html body.mars-stars-on .submit-form-wrap,
html body.mars-stars-on .submit-thanks,
html body.mars-stars-on .my-subs {
  background: rgba(20, 15, 35, 0.55);
  border-color: rgba(162, 155, 254, 0.25);
  backdrop-filter: blur(10px);
}
html body.mars-stars-on .submit-criteria h3,
html body.mars-stars-on .submit-thanks h2,
html body.mars-stars-on .my-subs h2 { color: #fff; }
html body.mars-stars-on .criteria-chip {
  background: rgba(20, 15, 35, 0.6);
  border-color: rgba(162, 155, 254, 0.3);
  color: #d4d4e8;
}
html body.mars-stars-on .criteria-chip strong { color: #A29BFE; }
html body.mars-stars-on .field-group label { color: #fff; }
html body.mars-stars-on .field-group input,
html body.mars-stars-on .field-group textarea {
  background: rgba(20, 15, 35, 0.6);
  border-color: rgba(162, 155, 254, 0.3);
  color: #e8e8f0;
}
html body.mars-stars-on .field-group input:focus,
html body.mars-stars-on .field-group textarea:focus {
  background: rgba(20, 15, 35, 0.8);
  border-color: #A29BFE;
}
html body.mars-stars-on .field-hint { color: #a0a0c0; }
html body.mars-stars-on .field-hint code {
  background: rgba(162, 155, 254, 0.15); color: #A29BFE;
}
html body.mars-stars-on .btn-secondary {
  background: rgba(162, 155, 254, 0.15);
  color: #d4d4e8 !important;
  border-color: rgba(162, 155, 254, 0.3);
}
html body.mars-stars-on .submit-thanks p { color: #b8b8d4; }
html body.mars-stars-on .my-sub-card {
  background: rgba(20, 15, 35, 0.5);
  border-color: rgba(162, 155, 254, 0.25);
}
html body.mars-stars-on .my-sub-title { color: #fff; }

@media (max-width: 640px) {
  .submit-hero { padding: 32px 24px; }
  .submit-hero-content h1 { font-size: 1.6rem; }
  .submit-form-wrap { padding: 24px 20px; }
  .field-row { grid-template-columns: 1fr; gap: 0; }
  .submit-actions { flex-direction: column; }
  .submit-actions button { width: 100%; }
}
</style>

<script>
(function() {
  'use strict';

  // ============================================================
  // КЛИЕНТ SUPABASE (использует уже загруженный supabase-client.js)
  // ============================================================
  function getSupabase() {
    // supabase-client.js должен создать window.supabaseClient или window.db
    if (window.supabaseClient) return window.supabaseClient;
    if (window.db) return window.db;
    // Резерв — создаём свой клиент
    var url = window.SUPABASE_URL || 'https://YOUR-PROJECT.supabase.co';
    var key = window.SUPABASE_ANON_KEY || 'YOUR-ANON-KEY';
    if (window.supabase && window.supabase.createClient) {
      window.supabaseClient = window.supabase.createClient(url, key);
      return window.supabaseClient;
    }
    return null;
  }

  var form = document.getElementById('submit-form');
  var formWrap = document.getElementById('submit-form-wrap');
  var thanks = document.getElementById('submit-thanks');
  var status = document.getElementById('form-status');
  var btn = document.getElementById('submit-btn');
  var resetBtn = document.getElementById('reset-btn');
  var againBtn = document.getElementById('again-btn');
  var myWrap = document.getElementById('my-submissions-wrap');
  var myList = document.getElementById('my-submissions-list');

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className = 'form-status ' + (type || '');
  }

  // ============================================================
  // ОТПРАВКА ФОРМЫ
  // ============================================================
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    setStatus('', '');

    var sb = getSupabase();
    if (!sb) {
      setStatus('Ошибка: не удалось подключиться к базе. Обновите страницу.', 'error');
      return;
    }

    // Получаем текущего пользователя
    var userRes = await sb.auth.getUser();
    var user = userRes && userRes.data ? userRes.data.user : null;

    if (!user) {
      setStatus('Чтобы отправить заявку, войдите в аккаунт.', 'error');
      return;
    }

    var payload = {
      user_id: user.id,
      author_name: document.getElementById('f-author').value.trim(),
      author_email: document.getElementById('f-email').value.trim() || null,
      title: document.getElementById('f-title').value.trim(),
      dynasty: document.getElementById('f-dynasty').value.trim() || null,
      summary: document.getElementById('f-summary').value.trim(),
      content: document.getElementById('f-content').value.trim(),
      image_url: document.getElementById('f-image').value.trim() || null,
      status: 'pending'
    };

    if (!payload.title || !payload.summary || !payload.content) {
      setStatus('Заполните обязательные поля.', 'error');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Отправка...';

    var res = await sb.from('list_submissions').insert([payload]);
    btn.disabled = false;
    btn.textContent = 'Отправить на рассмотрение';

    if (res.error) {
      console.error(res.error);
      setStatus('Ошибка: ' + res.error.message, 'error');
      return;
    }

    formWrap.style.display = 'none';
    thanks.style.display = 'block';
  });

  // Сброс
  resetBtn.addEventListener('click', function() {
    form.reset();
    setStatus('', '');
  });

  // Отправить ещё
  againBtn.addEventListener('click', function() {
    form.reset();
    thanks.style.display = 'none';
    formWrap.style.display = 'block';
    setStatus('', '');
  });

  // ============================================================
  // МОИ ЗАЯВКИ
  // ============================================================
  async function loadMySubmissions() {
    var sb = getSupabase();
    if (!sb) return;
    var userRes = await sb.auth.getUser();
    var user = userRes && userRes.data ? userRes.data.user : null;
    if (!user) return;

    var res = await sb
      .from('list_submissions')
      .select('id, title, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (res.error || !res.data || !res.data.length) return;

    myWrap.style.display = 'block';
    var html = '';
    res.data.forEach(function(item) {
      var d = new Date(item.created_at);
      var date = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
      var statusText = item.status === 'approved' ? 'Одобрено'
                     : item.status === 'rejected' ? 'Отклонено'
                     : 'На рассмотрении';
      html +=
        '<div class="my-sub-card">' +
          '<div class="my-sub-info">' +
            '<div class="my-sub-title">' + escapeHtml(item.title) + '</div>' +
            '<div class="my-sub-date">Отправлено ' + date + '</div>' +
          '</div>' +
          '<div class="my-sub-status status-' + item.status + '">' + statusText + '</div>' +
        '</div>';
    });
    myList.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Запуск после загрузки
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(loadMySubmissions, 1200);
    });
  } else {
    setTimeout(loadMySubmissions, 1200);
  }
})();
</script>
