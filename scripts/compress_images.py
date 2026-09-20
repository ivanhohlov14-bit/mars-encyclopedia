# scripts/compress_images.py
# Автоматически сжимает картинки в WebP при деплое
# Работает в GitHub Actions — на компьютере ничего ставить не надо

from pathlib import Path
from PIL import Image
import os

DOCS_IMAGES = Path("docs/assets/images")

# Настройки
MAX_WIDTH = 1600          # Макс. ширина (для больших карт)
WEBP_QUALITY = 82         # Качество WebP (0-100, 82 = отличный баланс)
SKIP_SMALL = 50 * 1024    # Файлы <50 КБ не трогаем

def human_size(b):
    for unit in ['B', 'KB', 'MB']:
        if b < 1024: return f'{b:.1f} {unit}'
        b /= 1024
    return f'{b:.1f} GB'

def process_image(img_path):
    """Конвертирует PNG/JPEG в WebP с оптимизацией"""
    try:
        size_before = img_path.stat().st_size
        if size_before < SKIP_SMALL:
            return None

        # Пропускаем уже обработанные
        webp_path = img_path.with_suffix('.webp')
        if webp_path.exists():
            return None

        with Image.open(img_path) as img:
            # Конвертируем в RGB если нужно
            if img.mode in ('RGBA', 'LA', 'P'):
                # Для PNG с прозрачностью сохраняем альфу
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')

            # Уменьшаем если слишком большая
            w, h = img.size
            if w > MAX_WIDTH:
                ratio = MAX_WIDTH / w
                new_size = (MAX_WIDTH, int(h * ratio))
                img = img.resize(new_size, Image.LANCZOS)

            # Сохраняем как WebP
            img.save(webp_path, 'WEBP', quality=WEBP_QUALITY, method=6)

        size_after = webp_path.stat().st_size
        saved = size_before - size_after
        pct = (saved / size_before) * 100

        return (img_path.name, size_before, size_after, pct)

    except Exception as e:
        print(f'⚠️ Ошибка {img_path.name}: {e}')
        return None

def main():
    if not DOCS_IMAGES.exists():
        print(f'❌ Папка не найдена: {DOCS_IMAGES}')
        return

    total_before = 0
    total_after = 0
    processed = 0

    extensions = {'.png', '.jpg', '.jpeg'}

    for img_path in sorted(DOCS_IMAGES.rglob('*')):
        if img_path.suffix.lower() not in extensions:
            continue

        result = process_image(img_path)
        if result:
            name, before, after, pct = result
            total_before += before
            total_after += after
            processed += 1
            print(f'✅ {name}: {human_size(before)} → {human_size(after)} (−{pct:.0f}%)')

    if processed:
        total_saved = total_before - total_after
        pct = (total_saved / total_before) * 100
        print(f'\n📊 Итого:')
        print(f'   Обработано: {processed} картинок')
        print(f'   Было: {human_size(total_before)}')
        print(f'   Стало: {human_size(total_after)}')
        print(f'   Экономия: {human_size(total_saved)} ({pct:.0f}%)')
    else:
        print('ℹ️ Нет новых картинок для обработки')

if __name__ == '__main__':
    main()
