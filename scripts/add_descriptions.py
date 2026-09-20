# scripts/add_descriptions.py
# Автоматически добавляет description во frontmatter всех .md файлов
# Запускается в GitHub Actions перед сборкой

import os
import re
from pathlib import Path

DOCS = Path("docs")
MAX_LEN = 155

def clean_markdown(text):
    """Убирает markdown-разметку и HTML"""
    text = re.sub(r'<[^>]+>', '', text)          # HTML-теги
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)  # ссылки
    text = re.sub(r'!\[[^\]]*\]\([^)]+\)', '', text)      # картинки
    text = re.sub(r'[*_`#>]', '', text)          # символы разметки
    text = re.sub(r'\s+', ' ', text)             # лишние пробелы
    return text.strip()

def extract_description(filepath):
    """Берёт первый абзац и делает красивое описание"""
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception:
        return None

    # Пропускаем, если description уже есть
    if content.startswith('---') and 'description:' in content[:500]:
        return None

    lines = content.split('\n')
    paragraph = []
    started = False

    for line in lines:
        stripped = line.strip()

        # Пропускаем заголовки, пустые строки в начале, HTML
        if not started:
            if (not stripped or stripped.startswith('#')
                or stripped.startswith('<') or stripped.startswith('---')):
                continue
            started = True

        # Если началось — собираем до первой пустой строки
        if started:
            if not stripped:
                if paragraph:
                    break
                continue
            # Пропускаем таблицы, списки, картинки
            if (stripped.startswith('|') or stripped.startswith('-')
                or stripped.startswith('*') or stripped.startswith('!')):
                if paragraph:
                    break
                continue
            paragraph.append(stripped)

    if not paragraph:
        return None

    text = clean_markdown(' '.join(paragraph))

    # Обрезаем по границе предложения
    if len(text) > MAX_LEN:
        cut = text[:MAX_LEN]
        # Ищем последнюю точку/!/?
        last_dot = max(cut.rfind('.'), cut.rfind('!'), cut.rfind('?'))
        if last_dot > 80:
            text = cut[:last_dot + 1]
        else:
            text = cut.rsplit(' ', 1)[0] + '…'

    return text

def add_frontmatter(filepath, description):
    """Добавляет frontmatter в начало файла"""
    content = filepath.read_text(encoding='utf-8')
    # Экранируем кавычки в описании
    desc_escaped = description.replace('"', '\\"')
    frontmatter = f'---\ndescription: "{desc_escaped}"\n---\n\n'
    filepath.write_text(frontmatter + content, encoding='utf-8')

def main():
    count = 0
    skipped = 0

    for md_file in DOCS.rglob('*.md'):
        # Пропускаем index.md и служебные
        if md_file.name in ('index.md',):
            continue

        desc = extract_description(md_file)
        if desc:
            add_frontmatter(md_file, desc)
            count += 1
            print(f'✅ {md_file.relative_to(DOCS)}')
            print(f'   → {desc[:100]}...')
        else:
            skipped += 1

    print(f'\n📊 Итого: добавлено {count}, пропущено {skipped}')

if __name__ == '__main__':
    main()
