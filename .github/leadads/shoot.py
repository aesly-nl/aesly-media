import os, glob, shutil
from playwright.sync_api import sync_playwright
SITES = ["sa-mondhygienist.nl","stressnaarsucces.nl","rijschoolurbanflow.nl","premiumbelts.nl","klimaatbeheerders.nl",
         "restartfinance.nl","yilmazkledingreparatie.nl","fastfixcleaning.nl","nfcmakers.nl","gooiserookwinkel.nl"]
out = "leadads/sites"; os.makedirs(out, exist_ok=True); tmp = "/tmp/vid"; os.makedirs(tmp, exist_ok=True)
ACCEPT = ["Alles accepteren","Alle cookies accepteren","Accepteren","Accepteer","Akkoord","Accept all","Accept","Ik ga akkoord","Toestaan","OK","Sluiten"]
HIDE = """
[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],[class*=cmplz],[id*=cmplz],#CybotCookiebotDialog,
.cky-consent-container,.cky-overlay,#moove_gdpr_cookie_info_bar,.borlabs-cookie,#BorlabsCookieBox,[class*=gdpr i],
#onetrust-banner-sdk,.pum-overlay,.elementor-popup-modal,[class*=newsletter-popup i],#joinchat,.joinchat,
[class*=whatsapp i][class*=float i],.grecaptcha-badge,#tidio-chat,#chat-widget-container{display:none!important}
html,body{overflow:auto!important}
"""
def clean(pg):
    for t in ACCEPT:
        try:
            b = pg.get_by_role("button", name=t, exact=False)
            if b.count() and b.first.is_visible(): b.first.click(timeout=1200); pg.wait_for_timeout(500); break
        except Exception: pass
    try: pg.add_style_tag(content=HIDE)
    except Exception: pass
UA_D="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
UA_M="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
with sync_playwright() as p:
    br = p.chromium.launch(args=["--disable-blink-features=AutomationControlled"])
    for s in SITES:
        for kind, vp, dpr, mob, ua in [("desktop",{"width":1440,"height":900},1.5,False,UA_D),("mobile",{"width":390,"height":844},2.5,True,UA_M)]:
            for url in ["https://"+s, "https://www."+s]:
                try:
                    ctx = br.new_context(viewport=vp, device_scale_factor=dpr, is_mobile=mob, has_touch=mob, locale="nl-NL", user_agent=ua, ignore_https_errors=True)
                    pg = ctx.new_page(); pg.goto(url, wait_until="domcontentloaded", timeout=60000)
                    pg.wait_for_timeout(5000); clean(pg); pg.wait_for_timeout(800)
                    h = pg.evaluate("document.body?document.body.scrollHeight:0")
                    for y in range(0, min(h, 9000), 450): pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(140)
                    pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(1500); clean(pg)
                    pg.screenshot(path=f"{out}/{s}_{kind}.jpg", type="jpeg", quality=90)
                    try: pg.screenshot(path=f"{out}/{s}_{kind}_full.jpg", type="jpeg", quality=82, full_page=True)
                    except Exception as e: print("full fail", s, kind, e)
                    ctx.close(); print("ok", s, kind, url); break
                except Exception as e:
                    print("FAIL", s, kind, url, str(e)[:160])
                    try: ctx.close()
                    except Exception: pass
        # scroll-video desktop (smooth, 9s)
        try:
            vd = f"{tmp}/{s}"; os.makedirs(vd, exist_ok=True)
            ctx = br.new_context(viewport={"width":1280,"height":800}, locale="nl-NL", user_agent=UA_D, ignore_https_errors=True,
                                 record_video_dir=vd, record_video_size={"width":1280,"height":800})
            pg = ctx.new_page(); pg.goto("https://"+s, wait_until="domcontentloaded", timeout=60000)
            pg.wait_for_timeout(4500); clean(pg); pg.wait_for_timeout(1200)
            h = min(pg.evaluate("document.body.scrollHeight") - 800, 3200)
            for i in range(0, 220):
                pg.evaluate(f"window.scrollTo(0,{int(h*(0.5-0.5*__import__('math').cos(3.14159*i/219)))})"); pg.wait_for_timeout(40)
            pg.wait_for_timeout(600); ctx.close()
            f = glob.glob(vd + "/*.webm")[0]; shutil.move(f, f"{out}/{s}_scroll.webm"); print("video ok", s)
        except Exception as e:
            print("video FAIL", s, str(e)[:160])
    br.close()
