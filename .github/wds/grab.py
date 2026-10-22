import os, json, urllib.request, urllib.parse
from playwright.sync_api import sync_playwright
out = "wds"; os.makedirs(out, exist_ok=True)
PAGES = ["", "diensten/", "grafisch-ontwerp/", "ons-werk/", "over-ons/", "online-marketing/", "webdesign/", "diensten/social-media/", "google-ads-uitbesteden/", "seo-uitbesteden/", "website-onderhoud/", "offerte/"]
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
ACCEPT = ["Alles accepteren", "Accepteren", "Accepteer", "Akkoord", "Accept all", "Accept", "Alle cookies accepteren", "Ik ga akkoord", "OK", "Toestaan"]
def dismiss(pg):
    for txt in ACCEPT:
        try:
            b = pg.get_by_role("button", name=txt, exact=False)
            if b.count() > 0 and b.first.is_visible():
                b.first.click(timeout=1500); pg.wait_for_timeout(600); return
        except Exception: pass
STYLE_JS = r"""() => {
  const out = {vars:{}, fonts:{}, colors:{}, bgs:{}, imgs:[], texts:[]};
  for (const ss of document.styleSheets) { try { for (const r of ss.cssRules) { if (r.selectorText && /:root|\.elementor-kit/.test(r.selectorText)) { for (const p of r.style) if (p.startsWith('--')) out.vars[p] = r.style.getPropertyValue(p).trim(); } } } catch(e) {} }
  const cs = el => getComputedStyle(el);
  for (const sel of ['body','h1','h2','h3','p','a','button','.elementor-button','header','footer','nav a']) { const el = document.querySelector(sel); if (el) { const c = cs(el); out.fonts[sel] = c.fontFamily + ' | ' + c.fontWeight + ' | ' + c.fontSize + ' | color ' + c.color + ' | bg ' + c.backgroundColor + ' | bgimg ' + c.backgroundImage.slice(0,200); } }
  const cnt = (m,k) => m[k] = (m[k]||0)+1;
  for (const el of document.querySelectorAll('body *')) { const c = cs(el); if (el.offsetWidth*el.offsetHeight < 400) continue; cnt(out.colors, c.color); if (c.backgroundColor !== 'rgba(0, 0, 0, 0)') cnt(out.bgs, c.backgroundColor); if (c.backgroundImage !== 'none' && c.backgroundImage.includes('gradient')) cnt(out.bgs, c.backgroundImage.slice(0,220)); }
  for (const im of document.images) if (im.naturalWidth > 150) out.imgs.push([im.currentSrc || im.src, im.naturalWidth, im.naturalHeight, im.alt]);
  for (const h of document.querySelectorAll('h1,h2,h3,h4')) out.texts.push(h.tagName + ': ' + h.innerText.trim().slice(0,160));
  return out; }"""
res = {}
with sync_playwright() as p:
    br = p.chromium.launch(args=["--disable-blink-features=AutomationControlled"])
    for path in PAGES:
        name = path.strip("/").replace("/", "_") or "home"
        for kind, vp, dpr, mobile in [("desktop", {"width": 1440, "height": 900}, 1.5, False), ("mobile", {"width": 390, "height": 844}, 2.5, True)]:
            if kind == "mobile" and path not in ("", "grafisch-ontwerp/", "diensten/"): continue
            try:
                ctx = br.new_context(viewport=vp, device_scale_factor=dpr, is_mobile=mobile, has_touch=mobile, locale="nl-NL", user_agent=UA)
                pg = ctx.new_page()
                pg.goto("https://webdezignstudio.nl/" + path, wait_until="domcontentloaded", timeout=60000)
                pg.wait_for_timeout(4000); dismiss(pg)
                h = pg.evaluate("document.body.scrollHeight")
                for y in range(0, min(h, 14000), 400):
                    pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(140)
                pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(1500)
                pg.screenshot(path=f"{out}/{name}_{kind}.jpg", type="jpeg", quality=88)
                pg.screenshot(path=f"{out}/{name}_{kind}_full.jpg", type="jpeg", quality=80, full_page=True)
                if kind == "desktop": res[name] = pg.evaluate(STYLE_JS)
                ctx.close(); print("ok", name, kind)
            except Exception as e:
                print("FAIL", name, kind, str(e)[:200])
    br.close()
json.dump(res, open(f"{out}/style.json", "w"), indent=1, ensure_ascii=False)
# download images used on design / work pages + logo
os.makedirs(f"{out}/img", exist_ok=True)
seen = set()
srcs = ["https://webdezignstudio.nl/wp-content/uploads/2021/05/wds-new-embleem.png"]
for k in ("home", "grafisch-ontwerp", "ons-werk", "diensten", "over-ons", "diensten_social-media"):
    for im in res.get(k, {}).get("imgs", []): srcs.append(im[0])
for u in srcs:
    if u in seen or not u.startswith("http"): continue
    seen.add(u)
    try:
        fn = urllib.parse.urlparse(u).path.split("/")[-1][:90]
        data = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=30).read()
        if len(data) > 8000: open(f"{out}/img/{fn}", "wb").write(data)
    except Exception as e: print("img fail", u, e)
print("klaar", len(seen), "afbeeldingen")
