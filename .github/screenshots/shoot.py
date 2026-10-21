import os, sys
from playwright.sync_api import sync_playwright
sites = [l.strip() for l in open(".github/screenshots/sites.txt") if l.strip()]
out = "screenshots"; os.makedirs(out, exist_ok=True)
ACCEPT = ["Alles accepteren", "Accepteren", "Accepteer", "Akkoord", "Accept all", "Accept", "Alle cookies accepteren", "Ik ga akkoord", "OK", "Toestaan", "Alle akzeptieren"]
def dismiss(pg):
    for txt in ACCEPT:
        try:
            b = pg.get_by_role("button", name=txt, exact=False)
            if b.count() > 0 and b.first.is_visible():
                b.first.click(timeout=1500); pg.wait_for_timeout(600); return
        except Exception: pass
with sync_playwright() as p:
    br = p.chromium.launch()
    for s in sites:
        for kind, vp, dpr, mobile in [("desktop", {"width": 1440, "height": 900}, 1.5, False), ("mobile", {"width": 390, "height": 844}, 2.5, True)]:
            try:
                ctx = br.new_context(viewport=vp, device_scale_factor=dpr, is_mobile=mobile, has_touch=mobile, locale="nl-NL",
                    user_agent=None if not mobile else "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1")
                pg = ctx.new_page()
                pg.goto("https://" + s, wait_until="networkidle", timeout=45000)
                pg.wait_for_timeout(3500); dismiss(pg); pg.wait_for_timeout(800)
                pg.screenshot(path=f"{out}/{s}_{kind}.jpg", type="jpeg", quality=88)
                # scroll through page to trigger lazy/reveal animations, then full page (capped)
                h = pg.evaluate("document.body.scrollHeight")
                for y in range(0, min(h, 9000), 500):
                    pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(120)
                pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(800)
                pg.screenshot(path=f"{out}/{s}_{kind}_full.jpg", type="jpeg", quality=80, full_page=True)
                ctx.close(); print("ok", s, kind)
            except Exception as e:
                print("FAIL", s, kind, e)
    br.close()
