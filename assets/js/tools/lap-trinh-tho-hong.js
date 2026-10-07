/* Epsilon Edu - Lập trình cùng Thỏ Hồng
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "bunnyCoding";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\n\n/* ---------- đọc to ---------- */\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){\n  if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\n/* ---------- màn chơi ---------- */\n// T: bụi cây, . : đường, S: Thỏ Hồng, C: cà rốt. dir: hướng ban đầu (N, E, S, W)\nconst LEVELS=[\n {type:'abs',dir:'E',map:['TTTTT','S...C','TTTTT'],intro:'Mỗi khối mũi tên đưa Thỏ Hồng đi 1 ô theo hướng mũi tên. Xếp khối rồi bấm Chạy nhé!'},\n {type:'abs',dir:'E',map:['S..TT','TT.TT','TT..C'],intro:'Đường có chỗ rẽ. Con đếm số ô trước khi xếp lệnh nhé.'},\n {type:'abs',dir:'E',map:['TTTTTT','T...TT','T.T.TT','S.T..C'],intro:'Có bụi cây chắn đường. Hãy tìm đường đi vòng qua.'},\n {type:'abs',dir:'E',map:['C.TTTT','T..TTT','TT..TT','TTT..S'],intro:'Đường ngoằn ngoèo! Máy chạy lệnh lần lượt từ trên xuống dưới.'},\n {type:'rel',dir:'E',map:['TTTTT','S...C','TTTTT'],intro:'Khối mới \"Đi tới\": Thỏ Hồng đi 1 ô theo hướng đang nhìn. Mũi tên tím cho biết Thỏ Hồng đang nhìn hướng nào.'},\n {type:'rel',dir:'E',map:['S..T','TT.T','TT.C'],intro:'\"Quay phải\" và \"Quay trái\" làm Thỏ Hồng đổi hướng nhìn nhưng không bước đi. Con thử tưởng tượng mình là Thỏ Hồng nhé.'},\n {type:'rel',dir:'N',map:['C..TT','TT.TT','TT..S'],intro:'Thỏ Hồng đang nhìn lên trên. Phải quay đúng hướng rồi mới đi.'},\n {type:'rel',dir:'N',map:['TTTTT','T...T','T.T.T','T.TCT','TSTTT'],intro:'Đường vòng hai lần. Mỗi chỗ rẽ cần một khối Quay.'},\n {type:'loop',dir:'E',par:2,map:['TTTTTTTTT','S.......C','TTTTTTTTT'],intro:'Khối mới \"Lặp lại\": làm một việc nhiều lần mà không cần xếp nhiều khối. Thêm khối Lặp lại, rồi bấm vào ô trắng bên trong để thêm \"Đi tới\".'},\n {type:'loop',dir:'E',par:5,map:['TTTT.C','TTT..T','TT..TT','T..TTT','S.TTTT'],intro:'Đường đi là những bậc thang giống hệt nhau. Phần nào được lặp lại?'},\n {type:'loop',dir:'E',par:5,map:['S...','TTT.','TTT.','TC..'],intro:'Đi vòng quanh bụi cây. Mỗi cạnh đều giống nhau: đi 3 bước rồi quay.'},\n {type:'loop',dir:'E',par:7,map:['TTTTTTC','TTTTTT.','TTTT...','TTTT.TT','TT...TT','TT.TTTT','S..TTTT'],intro:'Thử thách cuối: bậc thang dài. Con tìm mẫu lặp lại nhé!'}];\nconst DX=[0,1,0,-1],DY=[-1,0,1,0],DIRS='NESW',ARW=['↑','→','↓','←'];\nLEVELS.forEach(L=>{L.h=L.map.length;L.w=L.map[0].length;L.map.forEach((row,y)=>[...row].forEach((ch,x)=>{if(ch==='S')L.start=[x,y];if(ch==='C')L.goal=[x,y];}));L.d0=DIRS.indexOf(L.dir);\n  if(!L.par)L.par=bfsPar(L);});\nfunction free(L,x,y){return x>=0&&y>=0&&x<L.w&&y<L.h&&L.map[y][x]!=='T';}\nfunction bfsPar(L){const key=(x,y,d)=>x+','+y+','+d;const q=[[...L.start,L.d0,0]],seen=new Set([key(...L.start,L.d0)]);\n  while(q.length){const[x,y,d,c]=q.shift();if(x===L.goal[0]&&y===L.goal[1])return c;\n    const nx=[];if(L.type==='abs'){for(let k=0;k<4;k++)nx.push([x+DX[k],y+DY[k],k]);}else{nx.push([x+DX[d],y+DY[d],d],[x,y,(d+3)%4],[x,y,(d+1)%4]);}\n    for(const[a,b,e]of nx){if(!free(L,a,b))continue;const k=L.type==='abs'?key(a,b,0):key(a,b,e);if(seen.has(k))continue;seen.add(k);q.push([a,b,e,c+1]);}}return 99;}\n\nconst BLOCKS={\n  up:{label:'Đi lên',ic:'⬆️',cls:'c-move'},down:{label:'Đi xuống',ic:'⬇️',cls:'c-move'},left:{label:'Sang trái',ic:'⬅️',cls:'c-move'},right:{label:'Sang phải',ic:'➡️',cls:'c-move'},\n  fwd:{label:'Đi tới',ic:'🐾',cls:'c-move'},tl:{label:'Quay trái',ic:'↺',cls:'c-turn'},tr:{label:'Quay phải',ic:'↻',cls:'c-turn'},loop:{label:'Lặp lại',ic:'🔁',cls:'c-loop'}};\nconst PAL={abs:['up','down','left','right'],rel:['fwd','tl','tr'],loop:['fwd','tl','tr','loop']};\nconst MAXB=24;\n\nlet best={};try{best=JSON.parse(localStorage.getItem('thohong-stars')||'{}')}catch(e){}\nfunction saveBest(){try{localStorage.setItem('thohong-stars',JSON.stringify(best))}catch(e){}}\n\nlet li=0,prog=[],target=null,uid=1,running=false,slow=false,pos,dir,trail;\n\n/* ---------- chọn màn ---------- */\nfunction renderLevels(){const groups=[['Lớp 1: Đi theo mũi tên',0,4],['Lớp 2: Đi tới và quay',4,8],['Lớp 3: Vòng lặp',8,12]];\n  $('levels').innerHTML=groups.map(([t,a,b])=>`<div class=\"lvgroup\"><h3>${t}</h3><div class=\"lvbtns\">${LEVELS.slice(a,b).map((_,k)=>{const i=a+k,s=best[i]||0;\n    return`<button class=\"lv\" data-lv=\"${i}\" aria-current=\"${i===li}\" aria-label=\"Màn ${i+1}\">${i+1}<small>${s?'⭐'.repeat(s):'·'}</small></button>`}).join('')}</div></div>`).join('');\n  document.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{if(!running)loadLevel(+b.dataset.lv)});}\nfunction loadLevel(i){li=i;prog=[];target=null;renderLevels();const L=LEVELS[i];\n  $('lvTitle').textContent=`Màn ${i+1}`;$('lvIntro').textContent=L.intro;\n  $('palette').innerHTML=PAL[L.type].map(k=>`<button class=\"blk ${BLOCKS[k].cls}\" data-add=\"${k}\"><span class=\"ic\">${BLOCKS[k].ic}</span>${BLOCKS[k].label}</button>`).join('');\n  $('palette').querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>addBlock(b.dataset.add));\n  $('tips').innerHTML=L.type==='abs'?'<b>Mẹo:</b> Đặt ngón tay lên bàn cờ và đi thử từng ô, mỗi ô là một khối.'\n    :L.type==='rel'?'<b>Mẹo:</b> \"Quay\" chỉ đổi hướng nhìn, không bước đi. Nhìn mũi tên tím để biết Thỏ Hồng đang hướng về đâu.'\n    :'<b>Mẹo:</b> Bấm vào ô trắng trong khối Lặp lại để thêm khối vào bên trong. Bấm vào vùng tím của chương trình để thêm khối ra ngoài vòng lặp.';\n  resetBunny();renderProgram();setMsg('Xếp các khối lệnh rồi bấm ▶ Chạy.');}\n\n/* ---------- bàn cờ ---------- */\nfunction renderBoard(){const L=LEVELS[li],b=$('board');b.style.gridTemplateColumns=`repeat(${L.w},1fr)`;b.style.maxWidth=Math.min(460,L.w*82)+'px';\n  let html='';for(let y=0;y<L.h;y++)for(let x=0;x<L.w;x++){const ch=L.map[y][x],t=ch==='T';const tr=trail.has(x+','+y);\n    html+=`<div class=\"cell ${t?'tree':'path'}${tr&&!t?' trail':''}\">${t?(((x*7+y*3)%3)?'🌳':'🌷'):ch==='C'&&!(pos[0]===x&&pos[1]===y)?'🥕':''}</div>`;}\n  html+=`<div class=\"bunny\" id=\"bunny\"><span class=\"b\">🐰</span>${L.type==='abs'?'':'<span class=\"arrow\" id=\"arrow\">↑</span>'}</div>`;b.innerHTML=html;placeBunny();}\nfunction placeBunny(){const L=LEVELS[li],b=$('board'),bn=$('bunny');if(!bn)return;const cs=b.querySelector('.cell');const w=cs.offsetWidth,gap=4,pad=8;\n  bn.style.width=bn.style.height=w+'px';bn.style.left=(pad+pos[0]*(w+gap))+'px';bn.style.top=(pad+pos[1]*(w+gap))+'px';\n  const a=$('arrow');if(a){a.style.transform=`translate(${DX[dir]*w*.36}px,${DY[dir]*w*.36}px) rotate(${dir*90}deg)`;}}\nfunction resetBunny(){const L=LEVELS[li];pos=[...L.start];dir=L.d0;trail=new Set([pos.join(',')]);renderBoard();}\nwindow.addEventListener('resize',()=>placeBunny());\n\n/* ---------- chương trình ---------- */\nconst countBlocks=list=>list.reduce((t,b)=>t+1+(b.body?countBlocks(b.body):0),0);\nfunction addBlock(k){if(running)return;if(countBlocks(prog)>=MAXB){setMsg(`Chương trình tối đa ${MAXB} khối thôi nhé.`,'no');return;}\n  const blk={id:uid++,t:k};if(k==='loop'){if(target){setMsg('Không đặt vòng lặp trong vòng lặp nhé. Bấm vào vùng tím để thêm ra ngoài.','no');return;}blk.n=Math.min(8,Math.max(2,LEVELS[li].w-1));blk.body=[];}\n  const list=target?target.body:prog;list.push(blk);if(k==='loop')target=blk;renderProgram();resetIfDirty();}\nfunction findParent(id,list=prog){for(const b of list){if(b.id===id)return list;if(b.body){const r=findParent(id,b.body);if(r)return r;}}return null;}\nfunction removeBlock(id){const list=findParent(id);const i=list.findIndex(b=>b.id===id);const[r]=list.splice(i,1);if(target&&(r===target))target=null;renderProgram();resetIfDirty();}\nfunction resetIfDirty(){const L=LEVELS[li];if(pos[0]!==L.start[0]||pos[1]!==L.start[1]||dir!==L.d0||trail.size>1)resetBunny();}\nfunction renderProgram(){const p=$('program');p.innerHTML='';p.classList.toggle('target',!target);\n  if(!prog.length)p.innerHTML='<div class=\"empty\">Chưa có khối nào. Bấm vào các khối lệnh ở trên để bắt đầu!</div>';\n  let n=0;const make=(b,parent)=>{const B=BLOCKS[b.t];\n    if(b.t==='loop'){const d=document.createElement('div');d.className='loop';d.id='b'+b.id;n++;\n      d.innerHTML=`<div class=\"loop-head\"><span>🔁 Lặp lại</span><button class=\"step\" data-m=\"-1\" aria-label=\"Bớt\">−</button><span class=\"n\">${b.n}</span><button class=\"step\" data-m=\"1\" aria-label=\"Thêm\">+</button><span>lần</span><button class=\"x\" aria-label=\"Xóa\">✕</button></div>`;\n      const body=document.createElement('div');body.className='loop-body'+(target===b?' target':'');\n      if(!b.body.length)body.innerHTML='<span class=\"hint\">Bấm vào đây rồi chọn khối để thêm vào trong vòng lặp</span>';\n      b.body.forEach(c=>body.appendChild(make(c,b)));\n      body.onclick=e=>{if(e.target.closest('button'))return;target=b;renderProgram();};\n      d.appendChild(body);\n      d.querySelectorAll('[data-m]').forEach(s=>s.onclick=()=>{if(running)return;b.n=Math.max(2,Math.min(10,b.n+ +s.dataset.m));renderProgram();});\n      d.querySelector('.loop-head .x').onclick=()=>{if(!running)removeBlock(b.id)};return d;}\n    const d=document.createElement('div');d.className='pb '+B.cls;d.id='b'+b.id;n++;\n    d.innerHTML=`<span class=\"num\">${parent?'':n+'.'}</span><span>${B.ic}</span><span>${B.label}</span><button class=\"x\" aria-label=\"Xóa\">✕</button>`;\n    d.querySelector('.x').onclick=()=>{if(!running)removeBlock(b.id)};return d;};\n  prog.forEach(b=>p.appendChild(make(b,null)));\n  p.onclick=e=>{if(e.target===p||e.target.classList.contains('empty')){target=null;renderProgram();}};\n  $('count').textContent=`${countBlocks(prog)} khối`;\n  $('where').textContent=LEVELS[li].type==='loop'?(target?'➜ Khối mới sẽ được thêm vào TRONG vòng lặp':'➜ Khối mới sẽ được thêm vào chương trình chính'):'';}\n$('undo').onclick=()=>{if(running)return;const list=target&&target.body.length?target.body:prog;if(!list.length)return;removeBlock(list[list.length-1].id);};\n$('clearAll').onclick=()=>{if(running)return;prog=[];target=null;renderProgram();resetBunny();setMsg('Đã xóa hết. Xếp lại từ đầu nhé!');};\n\n/* ---------- chạy ---------- */\nfunction flatten(list,out=[],loopId=null){for(const b of list){if(b.t==='loop'){for(let i=0;i<b.n;i++)flatten(b.body,out,b.id);}else out.push({t:b.t,id:b.id,loop:loopId});}return out;}\nconst wait=ms=>new Promise(r=>setTimeout(r,ms));\nfunction setMsg(t,cls){const m=$('msg');m.className='msg'+(cls?' '+cls:'');m.textContent=t;}\nasync function run(){if(running)return;if(!prog.length){setMsg('Con chưa xếp khối nào cả!','no');return;}\n  const L=LEVELS[li];resetBunny();running=true;$('run').disabled=true;const steps=flatten(prog);const delay=slow?750:380;setMsg('Thỏ Hồng đang đi...');\n  for(const s of steps){document.querySelectorAll('.active').forEach(e=>e.classList.remove('active'));\n    const be=$('b'+s.id);if(be)be.classList.add('active');if(s.loop){const le=$('b'+s.loop);if(le)le.classList.add('active');}\n    await wait(delay*.4);\n    let move=null;\n    if(s.t==='tl'){dir=(dir+3)%4;placeBunny();}else if(s.t==='tr'){dir=(dir+1)%4;placeBunny();}\n    else{const k=s.t==='fwd'?dir:{up:0,right:1,down:2,left:3}[s.t];move=[pos[0]+DX[k],pos[1]+DY[k]];}\n    if(move){if(!free(L,move[0],move[1])){const bn=$('bunny');bn.classList.add('bump');await wait(420);bn.classList.remove('bump');\n        return finish(false,move[0]<0||move[1]<0||move[0]>=L.w||move[1]>=L.h?'Ôi! Thỏ Hồng suýt đi ra ngoài bàn cờ.':'Ôi! Thỏ Hồng va vào bụi cây rồi.');}\n      pos=move;trail.add(pos.join(','));renderBoard();\n      if(pos[0]===L.goal[0]&&pos[1]===L.goal[1]){await wait(250);return finish(true);}}\n    await wait(delay*.6);}\n  finish(false,'Chương trình chạy xong nhưng Thỏ Hồng chưa tới cà rốt.');}\nfunction finish(ok,why){running=false;$('run').disabled=false;document.querySelectorAll('.active').forEach(e=>e.classList.remove('active'));\n  const L=LEVELS[li];\n  if(ok){const n=countBlocks(prog),st=n<=L.par?3:n<=L.par+2?2:1;if((best[li]||0)<st){best[li]=st;saveBest();}renderLevels();\n    $('bunny').classList.add('win');\n    const m=$('msg');m.className='msg ok win';\n    m.innerHTML=`<div class=\"stars\">${'⭐'.repeat(st)}${'☆'.repeat(3-st)}</div>🎉 Thỏ Hồng đã ăn được cà rốt! Con dùng ${n} khối${st<3?`. Có cách chỉ cần ${L.par} khối, con thử tìm xem!`:'. Quá giỏi!'}\n      <div class=\"controls\">${li<LEVELS.length-1?'<button class=\"btn main\" id=\"next\">Màn tiếp theo ➜</button>':'<span>🏆 Con đã hoàn thành tất cả các màn!</span>'}</div>`;\n    const nx=$('next');if(nx)nx.onclick=()=>loadLevel(li+1);speak('Giỏi quá! Thỏ Hồng đã ăn được cà rốt!');}\n  else{setMsg(why+' Bấm \"Về chỗ cũ\", sửa lại khối rồi chạy lại nhé.','no');speak(why);}}\n$('run').onclick=run;\n$('reset').onclick=()=>{if(!running){resetBunny();setMsg('Thỏ Hồng đã về chỗ cũ.');}};\n$('speed').onclick=()=>{slow=!slow;$('speed').textContent=slow?'🐇 Nhanh':'🐢 Chậm';};\n$('say').onclick=()=>speak(LEVELS[li].intro);\n\nloadLevel(0);\n})();";
  const TOOL_CSS = ":root{\n  --bg:#ffffff;--card:#ffffff;--ink:#334155;--muted:#64748b;--line:#eadcff;\n  --pink:#ec4899;--purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;\n  --red:#e11d48;--red-soft:#fff1f2;--orange:#c2410c;--orange-soft:#fff7ed;--blue-soft:#eff6ff;\n  --grass:#d9f5c9;--grass2:#c8edb5;\n  box-sizing:border-box;\n  padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:#ffffff;color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton{font:inherit;color:inherit;cursor:pointer}\nbutton:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid var(--line);border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple)}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.levels{margin:14px 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n@media (max-width:760px){.levels{grid-template-columns:1fr}}\n.lvgroup{background:#fff;border:1px solid var(--line);border-radius:18px;padding:10px 12px}\n.lvgroup h3{margin:0 0 6px;font-size:1rem;color:var(--muted)}\n.lvbtns{display:flex;gap:6px;flex-wrap:wrap}\n.lv{width:56px;height:56px;border-radius:14px;border:2px solid var(--line);background:var(--card);font-family:\"Baloo 2\",sans-serif;font-size:1.3rem;font-weight:800;line-height:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}\n.lv small{font-size:.62rem;letter-spacing:-1px}\n.lv[aria-current=\"true\"]{background:linear-gradient(135deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;align-items:start}\n@media (max-width:860px){.grid{grid-template-columns:1fr}}\n.card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:16px;box-shadow:0 8px 22px rgba(76,29,149,.07)}\n.card h2{margin:0 0 4px;font-size:1.45rem}\n.intro{margin:0 0 12px;font-weight:700;color:var(--muted)}\n.board{position:relative;display:grid;gap:4px;padding:8px;border-radius:18px;background:#a7d98f;max-width:460px;margin:0 auto}\n.cell{aspect-ratio:1;border-radius:10px;display:grid;place-items:center;font-size:clamp(1.2rem,5vw,2rem)}\n.cell.path{background:#fff8e1}\n.cell.path.trail{background:#ffe7a3}\n.cell.tree{background:var(--grass2)}\n.bunny{position:absolute;display:grid;place-items:center;transition:left .32s ease,top .32s ease;pointer-events:none}\n.bunny .b{font-size:clamp(1.6rem,6vw,2.5rem);line-height:1;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))}\n.bunny .arrow{position:absolute;width:26px;height:26px;border-radius:50%;background:#7c3aed;color:#fff;display:grid;place-items:center;font-size:.9rem;font-weight:900;transition:transform .25s;box-shadow:0 2px 4px rgba(0,0,0,.25)}\n.bunny.bump .b{animation:bump .4s}\n@keyframes bump{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}\n.bunny.win .b{animation:hop .5s 3}\n@keyframes hop{50%{transform:translateY(-12px) scale(1.15)}}\n.controls{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}\n.btn{min-height:48px;padding:0 18px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900;font-size:1.02rem}\n.btn.run{border-color:transparent;color:#fff;background:var(--green);min-width:130px}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.msg{min-height:3em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}\n.msg.no{background:var(--red-soft);color:var(--red)}\n.palette{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}\n.blk{display:inline-flex;align-items:center;gap:8px;min-height:50px;padding:0 16px;border:none;border-radius:14px;color:#fff;font-weight:900;font-size:1.05rem;box-shadow:0 3px 0 rgba(0,0,0,.18)}\n.blk:active{transform:translateY(2px);box-shadow:none}\n.blk .ic{font-size:1.3rem}\n.c-move{background:#3b82f6}.c-turn{background:#a855f7}.c-loop{background:#f59e0b}\n.blk:disabled{opacity:.4;cursor:not-allowed}\n.prog-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px}\n.prog-head .count{font-weight:900;color:var(--muted)}\n.program{min-height:180px;border:3px dashed var(--line);border-radius:18px;padding:10px;display:flex;flex-direction:column;gap:6px;background:var(--purple-soft)}\n.program.target{border-color:var(--purple)}\n.empty{color:var(--muted);font-weight:800;text-align:center;margin:auto;padding:20px}\n.pb{display:flex;align-items:center;gap:8px;min-height:44px;padding:0 6px 0 14px;border-radius:12px;color:#fff;font-weight:900}\n.pb .num{opacity:.75;font-size:.85rem;min-width:18px}\n.pb .x{margin-left:auto;width:32px;height:32px;border-radius:9px;border:none;background:rgba(255,255,255,.25);color:#fff;font-weight:900}\n.pb.active{outline:4px solid #facc15;outline-offset:1px}\n.loop{border-radius:14px;background:#f59e0b;padding:6px;color:#fff}\n.loop.active{outline:4px solid #facc15}\n.loop-head{display:flex;align-items:center;gap:6px;font-weight:900;padding:2px 2px 6px 8px;flex-wrap:wrap}\n.loop-head .step{width:34px;height:34px;border-radius:9px;border:none;background:rgba(255,255,255,.3);color:#fff;font-weight:900;font-size:1.1rem}\n.loop-head .n{min-width:30px;text-align:center;font-family:\"Baloo 2\",sans-serif;font-size:1.35rem;background:#fff;color:#b45309;border-radius:9px;padding:0 6px}\n.loop-head .x{margin-left:auto;width:32px;height:32px;border-radius:9px;border:none;background:rgba(255,255,255,.25);color:#fff;font-weight:900}\n.loop-body{display:flex;flex-direction:column;gap:6px;min-height:52px;padding:8px;border-radius:10px;background:rgba(255,255,255,.85);border:3px dashed transparent;cursor:pointer}\n.loop-body.target{border-color:#7c3aed;background:#fff}\n.loop-body .hint{color:#92400e;font-weight:800;font-size:.92rem;text-align:center;margin:auto}\n.where{margin:8px 0 0;font-weight:800;color:var(--purple);font-size:.95rem}\n.tips{margin-top:12px;border-radius:16px;padding:12px 14px;background:var(--orange-soft);font-weight:700}\n.tips b{color:var(--orange)}\n.win{text-align:center}\n.win .stars{font-size:2.6rem;letter-spacing:4px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🐰</div>\n    <div>\n      <h1>Lập trình cùng Thỏ Hồng</h1>\n      <p>Xếp các khối lệnh để đưa Thỏ Hồng tới củ cà rốt. Làm quen với lập trình trước khi học Scratch.</p>\n    </div>\n  </header>\n\n  <div class=\"levels\" id=\"levels\"></div>\n\n  <div class=\"grid\">\n    <section class=\"card\">\n      <h2 id=\"lvTitle\"></h2>\n      <p class=\"intro\" id=\"lvIntro\"></p>\n      <div class=\"board\" id=\"board\"></div>\n      <div class=\"controls\">\n        <button class=\"btn run\" id=\"run\">▶ Chạy</button>\n        <button class=\"btn\" id=\"reset\">↺ Về chỗ cũ</button>\n        <button class=\"btn\" id=\"speed\">🐢 Chậm</button>\n        <button class=\"btn\" id=\"say\" aria-label=\"Nghe hướng dẫn\">🔊</button>\n      </div>\n      <div class=\"msg\" id=\"msg\" aria-live=\"polite\"></div>\n    </section>\n\n    <section class=\"card\">\n      <h2>Khối lệnh</h2>\n      <p class=\"intro\" style=\"margin-bottom:8px\">Bấm vào khối để thêm vào chương trình.</p>\n      <div class=\"palette\" id=\"palette\"></div>\n      <div class=\"prog-head\"><h2 style=\"margin:0\">Chương trình</h2><span class=\"count\" id=\"count\"></span></div>\n      <div class=\"program\" id=\"program\"></div>\n      <p class=\"where\" id=\"where\"></p>\n      <div class=\"controls\" style=\"justify-content:flex-start\"><button class=\"btn\" id=\"undo\">↶ Bỏ khối cuối</button><button class=\"btn\" id=\"clearAll\">🗑️ Xóa hết</button></div>\n      <div class=\"tips\" id=\"tips\"></div>\n    </section>\n  </div>\n</div>";
  const TOOL_HEAD = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">';

  function ttsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text)}`;
  }

  function splitTtsText(text, maxLen = 170) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return [];
    const sentences = clean.split(/(?<=[.!?…])\s+/).filter(Boolean);
    const out = [];
    for (const sentence of sentences.length ? sentences : [clean]) {
      if (sentence.length <= maxLen) { out.push(sentence); continue; }
      const words = sentence.split(" ");
      let current = "";
      for (const word of words) {
        const next = current ? `${current} ${word}` : word;
        if (next.length > maxLen && current) { out.push(current); current = word; }
        else current = next;
      }
      if (current) out.push(current);
    }
    return out;
  }

  function buildDocument(instanceId) {
    const safeCore = CORE_SOURCE.replace(/<\/script/gi, "<\\/script");
    const bridge = `
<script>
  window.__CLASS1_TOOL_INSTANCE_ID__ = ${JSON.stringify(instanceId)};
  (() => {
    const id = window.__CLASS1_TOOL_INSTANCE_ID__;
    let timer = 0;
    const report = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const height = Math.ceil(document.body ? document.body.getBoundingClientRect().height : 0);
        if (height) parent.postMessage({ type: 'class1-tool-height', id, height }, '*');
      }, 30);
    };
    window.addEventListener('load', report);
    window.addEventListener('resize', report);
    try { new ResizeObserver(report).observe(document.body); } catch (_) {}
    setTimeout(report, 0);
    setTimeout(report, 150);
  })();
<\/script>`;
    return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer">${TOOL_HEAD}<style>${TOOL_CSS}</style></head><body>${TOOL_BODY}${bridge}<script>${safeCore}<\/script></body></html>`;
  }

  function render(context = {}) {
    if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
    const host = context.host;
    if (!(host instanceof Element)) return;

    const instanceId = `${TOOL_ID}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    host.innerHTML = `<div style="width:100%;"><iframe title="Lập trình cùng Thỏ Hồng" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
    const iframe = host.querySelector("iframe");
    if (!iframe) return;

    const audio = new Audio();
    audio.referrerPolicy = "no-referrer";
    audio.preload = "none";
    let ttsNonce = 0;

    const stopTts = () => {
      ttsNonce += 1;
      try { audio.pause(); audio.currentTime = 0; audio.removeAttribute("src"); audio.load(); } catch (_) {}
    };

    const playTts = async (text) => {
      const chunks = splitTtsText(text);
      if (!chunks.length) return;
      const nonce = ++ttsNonce;
      try {
        for (const chunk of chunks) {
          if (nonce !== ttsNonce) return;
          audio.pause();
          audio.currentTime = 0;
          audio.src = ttsUrl(chunk);
          audio.playbackRate = 0.96;
          await audio.play();
          await new Promise((resolve) => {
            const done = () => { cleanup(); resolve(); };
            const cleanup = () => { audio.removeEventListener("ended", done); audio.removeEventListener("error", done); };
            audio.addEventListener("ended", done, { once: true });
            audio.addEventListener("error", done, { once: true });
          });
        }
      } catch (_) {
        if (nonce === ttsNonce && context.hooks && typeof context.hooks.showToast === "function") {
          context.hooks.showToast("Chưa phát được giọng đọc. Bé có thể bấm lại nút nghe.");
        }
      }
    };

    const onMessage = (event) => {
      if (!iframe.contentWindow || event.source !== iframe.contentWindow) return;
      const data = event.data || {};
      if (data.id !== instanceId) return;
      if (data.type === "class1-tool-height") {
        const height = Math.max(640, Math.min(2600, Number(data.height) || 900));
        iframe.style.height = `${height}px`;
      } else if (data.type === "class1-tool-speak") {
        void playTts(data.text);
      }
    };

    window.addEventListener("message", onMessage);
    iframe.srcdoc = buildDocument(instanceId);

    activeCleanup = () => {
      window.removeEventListener("message", onMessage);
      stopTts();
      try { iframe.removeAttribute("srcdoc"); } catch (_) {}
    };
  }

  function destroy() {
    if (!activeCleanup) return;
    try { activeCleanup(); } catch (_) {}
    activeCleanup = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[TOOL_ID] = Object.freeze({ render, destroy });
})();
