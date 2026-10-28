const fs=require('fs');const {spawn}=require('child_process');
const items=require(process.argv[2]);const outDir=process.argv[3];const only=process.argv[4];
fs.mkdirSync(outDir+'/reels',{recursive:true});fs.mkdirSync(outDir+'/carousels',{recursive:true});
const specs=[];const meta=[];
for(const it of items){const id=`${it.d}-${it.t}`;
 if(it.kind==='carousel'){specs.push({id,kind:'carousel',out:id,slides:it.slides});meta.push({...it,id,files:it.slides.map((_,i)=>`carousels/${id}-${i+1}.png`)})}
 else{specs.push({id,out:id,...it.spec});meta.push({...it,id,file:`reels/${id}.mp4`})}}
fs.writeFileSync('specs.json',JSON.stringify(specs));fs.writeFileSync('meta.json',JSON.stringify(meta));
const todo=specs.filter(s=>!only||only.split(',').includes(s.id));
let running=0,i=0,fails=[];
function next(){while(running<6&&i<todo.length){const s=todo[i++];running++;
 const dir=s.kind==='carousel'?outDir+'/carousels':outDir+'/reels';
 const p=spawn('node',['render.js','specs.json',s.id,dir],{stdio:['ignore','pipe','pipe']});let o='';p.stdout.on('data',d=>o+=d);p.stderr.on('data',d=>o+=d);
 p.on('close',c=>{running--;console.log(c?'FAIL':'done',s.id,o.trim().slice(0,200));if(c)fails.push(s.id);next()})}
 if(running===0&&i>=todo.length){console.log('klaar, fails:',fails)}}
next();
