#!/usr/bin/env python3
"""
generate_image_sitemap.py
Сканирует docs/*.md, вытаскивает все <img src> и ![](src),
генерирует docs/image-sitemap.xml для Google и Яндекс.Картинок.
Запускать перед `mkdocs build`.
"""

import re
import sys
from pathlib import Path
from urllib.parse import quote

# ══════════════════════════════════════════════════════════
# НАСТРОЙКИ
# ══════════════════════════════════════════════════════════
DOCS_DIR = Path("docs")
SITE_URL = "https://mars-wiki.ru"
OUTPUT   = DOCS_DIR / "image-sitemap.xml"

IMG_TAG_RE  = re.compile(r"<img\b[^>]*>", re.IGNORECASE | re.DOTALL)
SRC_ATTR_RE = re.compile(r'\bsrc=["\']([^"\']+)["\']', re.IGNORECASE)
ALT_ATTR_RE = re.compile(r'\balt=["\']([^"\']*)["\']', re.IGNORECASE)
MD_IMG_RE   = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+[\"'][^\"']*[\"'])?\)")


def normalize_src(src: str):
    """Возвращает абсолютный URL картинки или None (для внешних / data:)."""
    if not src:
        return None
    src = src.strip()
    if src.startswith(("http://", "https://", "//", "data:")):
        return None
    if src.startswith("/"):
        path = src
    else:
        path = "/" + src
    return SITE_URL.rstrip("/") + quote(path, safe="/%")


def page_url(md: Path) -> str:
    rel = md.relative_to(DOCS_DIR).with_suffix("")
    parts = list(rel.parts)
    if parts and parts[-1] == "index":
        parts = parts[:-1]
    path = "/" + "/".join(parts)
    if not path.endswith("/"):
        path += "/"
    return SITE_URL.rstrip("/") + quote(path, safe="/%")


def extract_images(text: str):
    items = []
    # <img src="..." alt="...">
    for tag in IMG_TAG_RE.finditer(text):
        tag_str = tag.group(0)
        src_m = SRC_ATTR_RE.search(tag_str)
        if not src_m:
            continue
        url = normalize_src(src_m.group(1))
        if not url:
            continue
        alt_m = ALT_ATTR_RE.search(tag_str)
        title = alt_m.group(1).strip() if alt_m else ""
        items.append((url, title))
    # ![alt](src)
    for m in MD_IMG_RE.finditer(text):
        alt, src = m.group(1), m.group(2)
        url = normalize_src(src)
        if not url:
            continue
        items.append((url, alt.strip()))
    return items


def esc(s: str) -> str:
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
             .replace('"', "&quot;").replace("'", "&apos;"))


def main():
    if not DOCS_DIR.exists():
        print(f"❌ Папка {DOCS_DIR} не найдена", file=sys.stderr)
        sys.exit(1)

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ]

    pages = 0
    images_total = 0

    for md in sorted(DOCS_DIR.rglob("*.md")):
        try:
            text = md.read_text(encoding="utf-8", errors="ignore")
        except Exception as e:
            print(f"⚠️  {md}: {e}")
            continue

        items = extract_images(text)
        if not items:
            continue

        # Уникальные URL
        seen = set()
        uniq = []
        for url, title in items:
            if url in seen:
                continue
            seen.add(url)
            uniq.append((url, title))

        if not uniq:
            continue

        pages += 1
        lines.append("  <url>")
        lines.append(f"    <loc>{esc(page_url(md))}</loc>")
        for url, title in uniq:
            lines.append("    <image:image>")
            lines.append(f"      <image:loc>{esc(url)}</image:loc>")
            if title:
                lines.append(f"      <image:title>{esc(title)}</image:title>")
            lines.append("    </image:image>")
            images_total += 1
        lines.append("  </url>")

    lines.append("</urlset>")

    OUTPUT.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"✅ Готово: {OUTPUT}")
    print(f"   Страниц с картинками: {pages}")
    print(f"   Всего изображений:    {images_total}")
    print(f"   Не забудьте отправить в Google/Яндекс: {SITE_URL}/image-sitemap.xml")


if __name__ == "__main__":
    main()
