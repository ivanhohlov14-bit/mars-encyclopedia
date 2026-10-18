# main.py — темы инфобоксов и генератор
THEMES = {
    "state":     {"bg": "#f8f9fa", "header": "#f5f0e6", "border": "#a2a9b1", "text": "#1a3a4a"},
    "geo":       {"bg": "#dce8ef", "header": "#b8ced9", "border": "#8daebf", "text": "#1a3a4a"},
    "person":    {"bg": "#f5efe8", "header": "#d9c4b8", "border": "#bca08f", "text": "#4a2a1a"},
    "mythology": {"bg": "#f0e8f5", "header": "#c9b8d9", "border": "#a08fbc", "text": "#3a1a4a"},
    "artifact":  {"bg": "#f5f0e6", "header": "#e0d4b8", "border": "#bca88f", "text": "#4a3a1a"},
}

def define_env(env):
    @env.macro
    def infobox(theme, title, image=None, image_caption=None, sections=None):
        c = THEMES.get(theme, THEMES["state"])
        html = (f'<div class="infobox" style="float:right;width:280px;background:{c["bg"]};'
                f'border:1px solid {c["border"]};padding:10px;margin:0 0 1rem 1.5rem;font-size:0.9rem;">')
        html += (f'<div style="background:{c["header"]};padding:6px;margin:-10px -10px 8px -10px;'
                 f'border-bottom:1px solid {c["border"]};text-align:center;border-radius:0 0 4px 4px;">'
                 f'<h3 style="margin:0;font-size:1.2rem;color:{c["text"]};">{title}</h3></div>')
        if image:
            html += f'<div style="text-align:center;margin:8px 0;">'
            html += f'<img src="{image}" alt="{title}" style="max-width:100%;height:auto;border-radius:4px;border:1px solid {c["border"]};">'
            if image_caption:
                html += f'<div style="font-size:0.7rem;color:#555;margin-top:4px;">{image_caption}</div>'
            html += '</div>'
        if sections:
            for i, (sec_title, sec_html) in enumerate(sections):
                if i > 0:
                    html += '<hr style="margin:6px 0;">'
                html += (f'<div style="background:{c["header"]};padding:6px 8px;margin:0 -10px 8px -10px;'
                         f'border-bottom:1px solid {c["border"]};text-align:center;font-weight:bold;'
                         f'font-size:0.9rem;color:{c["text"]};">{sec_title}</div>')
                html += f'<div style="color:{c["text"]};">{sec_html}</div>'
        html += '</div>'
        return html
