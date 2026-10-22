import os, urllib.request
from playwright.sync_api import sync_playwright
out = "screenshots"; os.makedirs(out, exist_ok=True)
sites = ["floatgym.nl", "klimaatbeheerders.nl", "mpu-tura.de"]
# Fallback: shots die al op aesly.nl staan (portfolio)
FALLBACK = {
  "floatgym.nl": "https://www.aesly.nl/__l5e/assets-v1/db7d5a83-f5dd-4704-b967-833d27da7920/shot-floatgym.webp",
  "klimaatbeheerders.nl": "https://www.aesly.nl/__l5e/assets-v1/6c0d884e-b18f-47a3-9b8d-570245fa278f/shot-klimaatbeheerders.webp",
  "mpu-tura.de": "https://www.aesly.nl/__l5e/assets-v1/fa1d6cb6-36a0-4c52-80bc-84049c2ca669/shot-mputura.png",
}
for s, u in FALLBACK.items():
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=30).read()
        open(f"{out}/{s}_portfolio.webp", "wb").write(data); print("fallback ok", s, len(data))
    except Exception as e:
        print("fallback FAIL", s, e)
ACCEPT = ["Alles accepteren", "Alle akzeptieren", "Akzeptieren", "Accepteren", "Accepteer", "Akkoord", "Accept all", "Accept", "Alle cookies accepteren", "Ik ga akkoord", "Zustimmen", "OK", "Toestaan"]
def dismiss(pg):
    for txt in ACCEPT:
        try:
            b = pg.get_by_role("button", name=txt, exact=False)
            if b.count() > 0 and b.first.is_visible():
                b.first.click(timeout=1500); pg.wait_for_timeout(700); return
        except Exception: pass
UA_D = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
UA_M = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
with sync_playwright() as p:
    br = p.chromium.launch(args=["--disable-blink-features=AutomationControlled"])
    for s in sites:
        for kind, vp, dpr, mobile, ua in [("desktop", {"width": 1440, "height": 900}, 1.5, False, UA_D), ("mobile", {"width": 390, "height": 844}, 2.5, True, UA_M)]:
            for url in ["https://" + s, "https://www." + s, "http://" + s]:
                try:
                    ctx = br.new_context(viewport=vp, device_scale_factor=dpr, is_mobile=mobile, has_touch=mobile, locale="nl-NL", user_agent=ua, ignore_https_errors=True)
                    pg = ctx.new_page()
                    pg.goto(url, wait_until="domcontentloaded", timeout=60000)
                    pg.wait_for_timeout(6000); dismiss(pg); pg.wait_for_timeout(1200)
                    h = pg.evaluate("document.body ? document.body.scrollHeight : 0")
                    for y in range(0, min(h, 9000), 500):
                        pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(150)
                    pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(1500)
                    pg.screenshot(path=f"{out}/{s}_{kind}.jpg", type="jpeg", quality=88)
                    try: pg.screenshot(path=f"{out}/{s}_{kind}_full.jpg", type="jpeg", quality=80, full_page=True)
                    except Exception as e: print("full fail", s, kind, e)
                    ctx.close(); print("ok", s, kind, url); break
                except Exception as e:
                    print("FAIL", s, kind, url, str(e)[:200])
                    try: ctx.close()
                    except Exception: pass
    br.close()
