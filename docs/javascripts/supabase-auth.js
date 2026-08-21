// docs/javascripts/supabase-auth.js

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://mars-encyclopedia.supabase.co"; // Project URL
const supabaseKey = "sb_publishable_v5qJYCi85UdrUsz0tAOohQ_0wWdMR3D"; // Публичный ключ
const supabase = createClient(supabaseUrl, supabaseKey);

async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) console.error("Ошибка регистрации:", error.message);
  else console.log("Успешно!", data);
}

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) console.error("Ошибка входа:", error.message);
  else console.log("Добро пожаловать!", data);
}

// Делаем функции доступными глобально
window.register = register;
window.login = login;
