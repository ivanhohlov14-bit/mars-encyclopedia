# ============================================================
# collect_unknown.py — находит слова в статьях,
# которых нет в марсианском словаре
# ============================================================
# Запуск:
#   python collect_unknown.py
# ============================================================

import os
import re
import sys

# ============================================================
# 🔧 НАСТРОЙКИ — поменяй под свой проект
# ============================================================
LEXICON_FILE = 'docs/assets/js/martian-lexicon.js'
DOCS_DIR = 'docs'
OUTPUT_FILE = 'unknown_words.txt'

# Минимальная длина слова (короче — игнорировать)
MIN_WORD_LENGTH = 4

# Игнорировать эти слова (имена, служебные)
IGNORE = {
    'этот', 'эта', 'это', 'эти', 'этих', 'этим',
    'который', 'которая', 'которое', 'которые',
    'такой', 'такая', 'такое', 'такие',
    'свой', 'своя', 'своё', 'свои',
    'весь', 'вся', 'всё', 'все',
    'самый', 'самая', 'самое', 'самые',
    'какой', 'какая', 'какое', 'какие',
    'мой', 'моя', 'моё', 'мои',
    'твой', 'твоя', 'твоё', 'твои',
    'наш', 'наша', 'наше', 'наши',
    'ваш', 'ваша', 'ваше', 'ваши',
}

# ============================================================
# 📖 ЧТЕНИЕ СЛОВАРЯ
# ============================================================
def load_lexicon(path):
    """Читает martian-lexicon.js и возвращает множество известных слов."""
    print(f'📖 Читаю словарь: {path}')

    if not os.path.exists(path):
        print(f'❌ Файл не найден: {path}')
        print('   Проверь путь LEXICON_FILE в начале скрипта.')
        sys.exit(1)

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ищем ключи вида: "слово": { root: ... }
    # Слова могут быть: русские буквы, дефисы, пробелы
    pattern = r'"([а-яёА-ЯЁ][а-яёА-ЯЁ\- ]*)":\s*\{'
    matches = re.findall(pattern, content, re.UNICODE)

    # Нормализуем: нижний регистр, ё → е
    known = {m.lower().replace('ё', 'е').strip() for m in matches}

    print(f'✅ Найдено слов в словаре: {len(known)}')
    return known


# ============================================================
# 📚 ЧТЕНИЕ СТАТЕЙ
# ============================================================
def clean_markdown(text):
    """Убирает служебные элементы Markdown/HTML."""
    # Front matter (между --- в начале)
    text = re.sub(r'^---\s*\n.*?\n---\s*\n', '', text, flags=re.DOTALL)

    # HTML-теги
    text = re.sub(r'<[^>]+>', ' ', text)

    # Код в блоках ```
    text = re.sub(r'```.*?```', ' ', text, flags=re.DOTALL)

    # Inline-код `code`
    text = re.sub(r'`[^`]+`', ' ', text)

    # Ссылки [текст](url) → текст
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)

    # Markdown-заголовки, списки, выделения
    text = re.sub(r'^[#>\-*+]\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)  # жирный
    text = re.sub(r'\*([^*]+)\*', r'\1', text)      # курсив
    text = re.sub(r'_([^_]+)_', r'\1', text)

    return text


def collect_words_from_docs(docs_dir, min_length=4):
    """Проходит по всем .md файлам и собирает русские слова."""
    print(f'\n📚 Читаю статьи: {docs_dir}/')

    if not os.path.exists(docs_dir):
        print(f'❌ Папка не найдена: {docs_dir}')
        sys.exit(1)

    all_words = {}   # слово → сколько раз встретилось
    file_count = 0

    for root, dirs, files in os.walk(docs_dir):
        # Пропускаем служебные папки
        dirs[:] = [d for d in dirs if d not in ('assets', '.git', '__pycache__')]

        for fname in files:
            if not fname.endswith('.md'):
                continue

            filepath = os.path.join(root, fname)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    text = f.read()
            except Exception as e:
                print(f'⚠️ Не могу прочитать {filepath}: {e}')
                continue

            text = clean_markdown(text).lower().replace('ё', 'е')

            # Ищем русские слова нужной длины
            words = re.findall(r'\b[а-я]{' + str(min_length) + r',}\b', text)
            for w in words:
                all_words[w] = all_words.get(w, 0) + 1

            file_count += 1

    print(f'✅ Обработано файлов: {file_count}')
    print(f'✅ Уникальных слов найдено: {len(all_words)}')
    return all_words


# ============================================================
# 🔍 ПОИСК НЕИЗВЕСТНЫХ СЛОВ
# ============================================================
def find_unknown(all_words, known, ignore):
    """Возвращает слова, которых нет в словаре."""
    unknown = {}
    for word, count in all_words.items():
        if word in known:
            continue
        if word in ignore:
            continue
        unknown[word] = count
    return unknown


# ============================================================
# 💾 СОХРАНЕНИЕ РЕЗУЛЬТАТА
# ============================================================
def save_result(unknown, output_file):
    """Сохраняет неизвестные слова в файл — по частоте."""
    # Сортируем по частоте (самые частые сверху)
    sorted_words = sorted(unknown.items(), key=lambda x: -x[1])

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('СЛОВА, КОТОРЫХ НЕТ В СЛОВАРЕ\n')
        f.write('=' * 50 + '\n')
        f.write(f'Всего: {len(sorted_words)}\n\n')
        f.write('ТОП-100 самых частых:\n')
        f.write('-' * 50 + '\n')

        for word, count in sorted_words[:100]:
            f.write(f'{count:5d}  {word}\n')

        f.write('\n\nВСЕ СЛОВА (по алфавиту):\n')
        f.write('-' * 50 + '\n')
        for word in sorted([w for w, _ in sorted_words]):
            f.write(f'{word}\n')

    print(f'\n💾 Результат сохранён: {output_file}')


# ============================================================
# 🎯 ОСНОВНАЯ ФУНКЦИЯ
# ============================================================
def main():
    print('=' * 50)
    print('🪐 Поиск неизвестных слов в статьях')
    print('=' * 50)

    known = load_lexicon(LEXICON_FILE)
    all_words = collect_words_from_docs(DOCS_DIR, MIN_WORD_LENGTH)
    unknown = find_unknown(all_words, known, IGNORE)

    print(f'\n🔍 Найдено неизвестных слов: {len(unknown)}')

    # Показываем ТОП-20 в консоли
    print('\n📊 ТОП-20 самых частых неизвестных слов:')
    print('-' * 30)
    sorted_unknown = sorted(unknown.items(), key=lambda x: -x[1])
    for word, count in sorted_unknown[:20]:
        print(f'  {count:4d} раз  →  {word}')

    save_result(unknown, OUTPUT_FILE)

    print('\n' + '=' * 50)
    print('✅ Готово!')
    print(f'📄 Полный список: {OUTPUT_FILE}')
    print('=' * 50)


if __name__ == '__main__':
    main()
