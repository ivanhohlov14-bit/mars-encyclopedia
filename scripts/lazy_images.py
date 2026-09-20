# scripts/lazy_images.py
# Добавляет loading="lazy" ко всем картинкам кроме первой на странице
# Также добавляет decoding="async" для асинхронного декодирования

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
        img_count = [0]

        def process_img(match):
            img_tag = match.group(0)
            img_count[0] += 1

            # Если уже есть loading — не трогаем
            has_loading = 'loading=' in img_tag
            has_decoding = 'decoding=' in img_tag

            # Собираем атрибуты для добавления
            additions = []

            # Первую картинку НЕ делаем lazy (она критична для LCP)
            if img_count[0] > 1 and not has_loading:
                additions.append('loading="lazy"')
                total_lazy_local[0] += 1

            # decoding="async" безопасен для всех
            if not has_decoding:
                additions.append('decoding="async"')
                total_async_local[0] += 1

            if not additions:
                return img_tag

            # Вставляем атрибуты перед >
            addition_str = ' ' + ' '.join(additions)
            if img_tag.endswith('/>'):
                return img_tag[:-2] + addition_str + '>'
            else:
                return img_tag[:-1] + addition_str + '>'

        # Счётчики для функции
        total_lazy_local = [0]
        total_async_local = [0]

        # Ищем все <img ...>
        content = re.sub(r'<img\s[^>]*>', process_img, content)

        total_lazy += total_lazy_local[0]
        total_async += total_async_local[0]

        if content != original:
            md_file.write_text(content, encoding='utf-8')
            count += 1

    print(f'\n📊 Итого:')
    print(f'   Файлов обновлено: {count}')
    print(f'   lazy loading добавлено: {total_lazy}')
    print(f'   decoding=async добавлено: {total_async}')

if __name__ == '__main__':
    main()
