# scripts/use_webp.py
# Заменяет .png и .jpg на .webp в ссылках на картинки
# Работает ПОСЛЕ compress_images.py

from pathlib import Path

DOCS = Path("docs")

def main():
    count = 0
    replaced = 0

    for md_file in DOCS.rglob("*.md"):
        try:
            content = md_file.read_text(encoding='utf-8')
        except Exception:
            continue

        original = content

        # Заменяем только в путях к папке images
        # PNG → WebP (только если есть .webp файл рядом)
        for ext in ['.png', '.jpg', '.jpeg']:
            # Ищем ссылки вида docs/assets/images/...
            import re
            pattern = re.compile(
                r'(docs/assets/images/[^"\'\s]+)' + re.escape(ext) + r'(?=["\'\s>])'
            )
            def repl(m):
                img_path = Path(m.group(1) + '.webp')
                if img_path.exists():
                    return m.group(1) + '.webp'
                return m.group(0)
            content = pattern.sub(repl, content)

        if content != original:
            md_file.write_text(content, encoding='utf-8')
            count += 1
            # считаем примерное количество
            diff = original.count('.png') + original.count('.jpg') - content.count('.png') - content.count('.jpg')
            replaced += max(0, diff)

    print(f'📊 Обновлено {count} файлов, заменено ссылок: ~{replaced}')

if __name__ == '__main__':
    main()
