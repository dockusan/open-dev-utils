
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:4173/'
OUT = Path('assets/screenshots')
OUT.mkdir(parents=True, exist_ok=True)

SCREENS = [
    ('landing-dark', '#/landing', 'dark'),
    ('landing-light', '#/landing', 'light'),
    ('workspace-dark', '#/', 'dark'),
    ('workspace-light', '#/', 'light'),
    ('settings-dark', '#/settings', 'dark'),
    ('settings-light', '#/settings', 'light'),
    ('json-formatter-dark', '#/json-formatter', 'dark'),
    ('text-diff-light', '#/text-diff', 'light'),
    ('regexp-tester-dark', '#/regexp-tester', 'dark'),
    ('qr-generator-light', '#/qr-code-generator', 'light'),
]


def set_theme(page, theme: str):
    page.evaluate(
        """
        ([theme]) => {
          localStorage.setItem('devutils-theme', theme);
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
        }
        """,
        [theme],
    )


with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1600, 'height': 1000}, device_scale_factor=1)
    page.goto(BASE, wait_until='networkidle')

    for name, route, theme in SCREENS:
        page.goto(f'{BASE}{route}', wait_until='networkidle')
        set_theme(page, theme)
        page.goto(f'{BASE}{route}', wait_until='networkidle')
        page.screenshot(path=str(OUT / f'{name}.png'), full_page=True)
        print(f'saved {name}.png')

    browser.close()
