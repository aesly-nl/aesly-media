const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');const path=require('path');
const [,, specFile, id, outDir]=process.argv;
const specs=JSON.parse(fs.readFileSync(specFile,'utf8'));
const spec=specs.find(x=>x.id===id);if(!spec){console.error('geen spec',id);process.exit(1)}
const FPS=30;
(async()=>{
 const b=await chromium.launch({args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu']});
 const car=spec.kind==='carousel';
 const ctx=await b.newContext({viewport:{width:1080,height:car?1350:1920},deviceScaleFactor:1});
 const page=await ctx.newPage();
 await page.goto('file:///tmp/gen/engine.html');
 await page.evaluate(()=>document.fonts.ready);
 if(car){
  for(let i=0;i<spec.slides.length;i++){
    await page.reload();await page.evaluate(()=>document.fonts.ready);
    const sl=spec.slides[i];await page.evaluate(([k,s])=>window.buildSlide(k,s),[sl.k,sl]);
    await page.waitForTimeout(150);
    await page.screenshot({path:path.join(outDir,`${spec.out}-${i+1}.png`),type:'png'});
  }
  await b.close();console.log('ok',id);return}
 const dur=await page.evaluate(s=>window.buildReel(s),spec);
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
 const frames=Math.round(dur*FPS);
 const out=path.join(outDir,spec.out+'.mp4');
 const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-r',String(FPS),'-movflags','+faststart','-an',out],{stdio:['pipe','inherit','inherit']});
 const shot=async t=>{await page.evaluate(t=>{window.tl.seek(t,false)},t);return page.screenshot({type:'jpeg',quality:92})};
 const cov=spec.cover??2.2;
 const w=buf=>new Promise(r=>{if(!ff.stdin.write(buf))ff.stdin.once('drain',r);else r()});
 await w(await shot(cov));
 for(let i=1;i<frames;i++){await w(await shot(i/FPS))}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('ok',id,dur.toFixed(1)+'s');
})();
