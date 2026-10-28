import json,shutil,os,sys
repo='/home/claude/aesly-media';stage='/tmp/gen/stage3'
meta=json.load(open('/tmp/gen/meta.json'))
items=json.load(open(f'{repo}/schedule/items.json'));car=json.load(open(f'{repo}/schedule/carousels.json'))
have={(i['d'],i.get('t',8)) for i in items}|{(c['d'],c.get('t',16)) for c in car}
added=0
for m in meta:
    key=(m['d'],m['t'])
    if key in have: print('bestaat al',key);continue
    if 'file' in m:
        src=f"{stage}/{m['file']}"
        if not os.path.exists(src) or os.path.getsize(src)<50000: print('MIST',src);continue
        shutil.copy(src,f"{repo}/{m['file']}")
        items.append({'d':m['d'],'t':m['t'],'typ':'reel','file':m['file'],'cap':m['cap'],'name':m['name'],'pillar':m['pillar'],'branche':m['branche'],'hook':m['hook']})
    else:
        ok=True
        for f in m['files']:
            if not os.path.exists(f'{stage}/{f}'): print('MIST',f);ok=False
        if not ok: continue
        for f in m['files']: shutil.copy(f'{stage}/{f}',f'{repo}/{f}')
        car.append({'d':m['d'],'t':m['t'],'files':m['files'],'cap':m['cap'],'name':m['name'],'pillar':m['pillar'],'branche':m['branche'],'hook':m['hook']})
    added+=1
items.sort(key=lambda x:(x['d'],x.get('t',8)));car.sort(key=lambda x:(x['d'],x.get('t',16)))
json.dump(items,open(f'{repo}/schedule/items.json','w'),ensure_ascii=False,indent=1)
json.dump(car,open(f'{repo}/schedule/carousels.json','w'),ensure_ascii=False,indent=1)
print('toegevoegd',added)
