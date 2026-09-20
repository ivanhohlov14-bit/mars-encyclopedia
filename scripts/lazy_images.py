# scripts/lazy_images.py
# Добавляет loading="lazy" всем картинкам кроме первой
# Также добавляет decoding="async"

import re
from pathlib import Path

DOCS = Path("docs")

def main():
    count = 0
    total_lazy = 0
    total_async = 0

    for md_file in DOCS.rglob("*.md"):
        try:
            content = md_file.read_text(encoding='utf-8')
        except Exception:
            continue

        original = content
        img_count = {'n': 0, 'lazy': 0, 'async': 0}

        def process_img(match):
            img_tag = match.group(0)
            img_count['n'] += 1

            has_loading = 'loading=' in img_tag
            has_decoding = 'decoding=' in img_tag

            additions = []

            if img_count['n'] > 1 and not has_loading:
                additions.append('loading="lazy"')
                img_count['lazy'] += 1

            if not has_decoding:
                additions.append('decoding="async"')
                img_count['async'] += 1

            if not additions:
                return img_tag

            addition_str = ' ' + ' '.join(additions)
            if img_tag.endswith('/>'):
                return img_tag[:-2] + addition_str + '>'
            else:
                return img_tag[:-1] + addition_str + '>'

        content = re.sub(r'<img\s[^>]*>', process_img, content)

        total_lazy += img_count['lazy']
        total_async += img_count['async']

        if content != original:
            md_file.write_text(content, encoding='utf-8')
            count += 1

    print('\n📊 Итого:')
    print(f'   Файлов обновлено: {count}')
    print(f'   lazy loading добавлено: {total_lazy}')
    print(f'   decoding=async добавлено: {total_async}')

if __name__ == '__main__':
    main()
