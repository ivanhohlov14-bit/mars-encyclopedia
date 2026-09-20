# scripts/optimize_urls.py
# Заменяет raw.githubusercontent.com на cdn.jsdelivr.net во всех .md файлах
# Запускается автоматически в GitHub Actions перед сборкой

import os
from pathlib import Path

DOCS = Path("docs")

OLD = "https://raw.githubusercontent.com/ivanhohlov14-bit/mars-encyclopedia/main/"
NEW = "https://cdn.jsdelivr.net/gh/ivanhohlov14-bit/mars-encyclopedia@main/"

def main():
    count = 0
    replaced_total = 0
    for md_file in DOCS.rglob("*.md"):
        try:
            content = md_file.read_text(encoding='utf-8')
        except Exception as e:
            print(f'⚠️ Ошибка чтения {md_file}: {e}')
            continue

        if OLD in content:
            occurrences = content.count(OLD)
            new_content = content.replace(OLD, NEW)
            md_file.write_text(new_content, encoding='utf-8')
            count += 1
            replaced_total += occurrences
            print(f'✅ {md_file.relative_to(DOCS)} — {occurrences} замен')

    print(f'\n📊 Итого: обновлено {count} файлов, {replaced_total} ссылок')

if __name__ == '__main__':
    main()
