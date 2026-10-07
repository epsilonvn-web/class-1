/* Epsilon Edu - Bé dạy AI nhận hình
 * Module lazy-load cho AI Lab (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "teachAI";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\n\n/* ---------- đọc to (tự chuyển sang cầu nối của trang mẹ nếu có) ---------- */\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){\n  if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\n/* ---------- dữ liệu ---------- */\nconst PRESETS={\n  objects:{label:'☀️ Đồ vật quen thuộc',classes:[['☀️','Mặt trời'],['🐟','Con cá'],['🏠','Ngôi nhà']]},\n  shapes:{label:'🔺 Hình học',classes:[['⭕','Hình tròn'],['🔺','Hình tam giác'],['⬛','Hình vuông']]},\n  digits:{label:'🔢 Chữ số',classes:[['1️⃣','Số 1'],['2️⃣','Số 2'],['3️⃣','Số 3']]},\n  faces:{label:'😊 Cảm xúc',classes:[['😊','Mặt vui'],['😢','Mặt buồn']]}};\nconst EMOJIS=['☀️','🐟','🏠','🌳','⭐','❤️','🌙','🍎','🐱','🚗','⭕','🔺','⬛','😊','😢','✏️','🌸','⚽'];\nlet pendingPreset=null,classes=[],sel=0,mode='teach',trainedVersion=-1,dataVersion=0,editingEmoji=-1;\nfunction loadPreset(k){classes=PRESETS[k].classes.map(([e,n])=>({emoji:e,name:n,samples:[]}));sel=0;dataVersion++;trainedVersion=-1;renderSide();}\n\n/* ---------- bảng vẽ ---------- */\nconst pad=$('pad'),ctx=pad.getContext('2d');\nlet strokes=[],cur=null;\nfunction padPoint(e){const r=pad.getBoundingClientRect();return[(e.clientX-r.left)*pad.width/r.width,(e.clientY-r.top)*pad.height/r.height];}\nfunction redraw(){ctx.clearRect(0,0,pad.width,pad.height);ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=10;ctx.strokeStyle='#3b2a5c';\n  for(const s of strokes){ctx.beginPath();s.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));if(s.length===1)ctx.lineTo(s[0][0]+.1,s[0][1]);ctx.stroke();}\n  $('padHint').classList.toggle('hidden',strokes.length>0);}\npad.addEventListener('pointerdown',e=>{e.preventDefault();pad.setPointerCapture(e.pointerId);cur=[padPoint(e)];strokes.push(cur);redraw();});\npad.addEventListener('pointermove',e=>{if(!cur)return;const p=padPoint(e),l=cur[cur.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])>2){cur.push(p);redraw();}});\nconst endStroke=()=>{if(!cur)return;cur=null;if(mode==='guess')schedulePredict();};\npad.addEventListener('pointerup',endStroke);pad.addEventListener('pointercancel',endStroke);\nfunction clearPad(){strokes=[];redraw();if(mode==='guess')renderGuess(null);}\n$('clear').onclick=clearPad;\n$('undo').onclick=()=>{strokes.pop();redraw();if(mode==='guess')schedulePredict();};\n\n/* ---------- đặc trưng hình vẽ: chuẩn hóa về lưới 32x32 rồi làm mờ ---------- */\nconst N=32,off=document.createElement('canvas');off.width=off.height=N;const octx=off.getContext('2d',{willReadFrequently:true});\nfunction features(strk){const pts=strk.flat();if(!pts.length)return null;\n  let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;for(const[x,y]of pts){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}\n  const w=x1-x0,h=y1-y0,size=Math.max(w,h);if(size<12)return null;\n  const sc=(N-8)/size,ox=(N-w*sc)/2,oy=(N-h*sc)/2;\n  octx.clearRect(0,0,N,N);octx.lineCap='round';octx.lineJoin='round';octx.lineWidth=2.4;octx.strokeStyle='#000';\n  for(const s of strk){octx.beginPath();s.forEach(([x,y],i)=>{const X=ox+(x-x0)*sc,Y=oy+(y-y0)*sc;i?octx.lineTo(X,Y):octx.moveTo(X,Y);});if(s.length===1)octx.lineTo(ox+(s[0][0]-x0)*sc+.2,oy+(s[0][1]-y0)*sc);octx.stroke();}\n  const img=octx.getImageData(0,0,N,N).data;let v=new Float32Array(N*N);for(let i=0;i<N*N;i++)v[i]=img[i*4+3]/255;\n  for(let pass=0;pass<2;pass++){const o=new Float32Array(N*N);\n    for(let y=0;y<N;y++)for(let x=0;x<N;x++){let s=0,c=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<N&&Y<N){s+=v[Y*N+X];c++;}}o[y*N+x]=s/c;}v=o;}\n  const aspect=Math.max(-1,Math.min(1,Math.log((w+1)/(h+1))));\n  let norm=0;for(const a of v)norm+=a*a;norm=Math.sqrt(norm)||1;for(let i=0;i<v.length;i++)v[i]/=norm;\n  return{v,aspect};}\nfunction similarity(a,b){let s=0;for(let i=0;i<a.v.length;i++)s+=a.v[i]*b.v[i];return s-0.12*Math.abs(a.aspect-b.aspect);}\nfunction predict(f){const scores=classes.map((c,ci)=>{const sims=c.samples.map(s=>({s:similarity(f,s.f),sample:s,ci})).sort((a,b)=>b.s-a.s);\n    const k=Math.min(3,sims.length);const sc=k?sims.slice(0,k).reduce((t,x)=>t+x.s,0)/k:-1;return{sc,sims};});\n  const T=14,mx=Math.max(...scores.map(s=>s.sc));const ex=scores.map(s=>Math.exp((s.sc-mx)*T));const tot=ex.reduce((a,b)=>a+b,0);\n  const probs=ex.map(e=>e/tot);const all=scores.flatMap(s=>s.sims).sort((a,b)=>b.s-a.s).slice(0,3);\n  return{probs,best:probs.indexOf(Math.max(...probs)),nearest:all,raw:mx};}\n\n/* ---------- ảnh thu nhỏ ---------- */\nfunction thumbCanvas(strk,size){const c=document.createElement('canvas');c.width=c.height=size*2;const g=c.getContext('2d');const pts=strk.flat();\n  let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;for(const[x,y]of pts){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}\n  const S=Math.max(x1-x0,y1-y0)||1,sc=(c.width-16)/S,ox=(c.width-(x1-x0)*sc)/2,oy=(c.height-(y1-y0)*sc)/2;\n  g.lineCap='round';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#3b2a5c';\n  for(const s of strk){g.beginPath();s.forEach(([x,y],i)=>{const X=ox+(x-x0)*sc,Y=oy+(y-y0)*sc;i?g.lineTo(X,Y):g.moveTo(X,Y);});g.stroke();}return c;}\n\n/* ---------- BƯỚC 1: DẠY ---------- */\nconst side=$('side');\nconst minPer=()=>Math.min(...classes.map(c=>c.samples.length));\nfunction renderSide(){if(mode==='teach')renderTeach();else renderGuess(lastPred);updateTabs();}\nfunction updateTabs(){$('guessTab').disabled=trainedVersion<0;\n  $('padTitle').textContent=mode==='teach'?'Vẽ hình mẫu':'Vẽ hình mới cho máy đoán';\n  $('padLead').innerHTML=mode==='teach'?`Đang vẽ cho nhóm: <b>${classes[sel].emoji} ${classes[sel].name}</b>. Vẽ xong bấm \"Lưu vào nhóm\".`:'Vẽ một hình bất kỳ. Mỗi lần con nhấc tay lên, máy sẽ đoán ngay.';\n  $('save').classList.toggle('hidden',mode!=='teach');}\nfunction renderTeach(){\n  side.innerHTML=`<h2>Các nhóm hình</h2><p class=\"lead\">Chọn chủ đề có sẵn, hoặc tự đổi tên và biểu tượng của từng nhóm.</p>\n    <div class=\"presets\">${Object.entries(PRESETS).map(([k,p])=>`<button class=\"preset\" data-preset=\"${k}\">${p.label}</button>`).join('')}</div>\n    <div class=\"classes\" id=\"cls\"></div>\n    <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn\" id=\"addCls\" ${classes.length>=4?'disabled':''}>➕ Thêm nhóm</button></div>\n    <div class=\"train\"><p id=\"trainMsg\"></p><div class=\"progress\"><i id=\"trainBar\"></i></div>\n      <button class=\"btn main\" id=\"trainBtn\">🧠 Dạy máy học</button></div>`;\n  const box=$('cls');\n  classes.forEach((c,i)=>{const d=document.createElement('div');d.className='cls'+(i===sel?' sel':'');\n    d.innerHTML=`<div class=\"cls-head\"><button class=\"cls-emoji\" data-emo=\"${i}\" aria-label=\"Đổi biểu tượng\">${c.emoji}</button>\n      <input class=\"cls-name\" value=\"${c.name.replace(/\"/g,'&quot;')}\" maxlength=\"20\" aria-label=\"Tên nhóm\">\n      <span class=\"count ${c.samples.length>=5?'ok':''}\">${c.samples.length} hình</span>\n      ${classes.length>2?`<button class=\"icon-btn\" data-del=\"${i}\" aria-label=\"Xóa nhóm\">🗑️</button>`:''}</div>\n      ${editingEmoji===i?`<div class=\"emoji-pop\">${EMOJIS.map(e=>`<button data-pick=\"${e}\">${e}</button>`).join('')}</div>`:''}\n      <div class=\"thumbs\"></div>`;\n    d.addEventListener('click',ev=>{if(ev.target.closest('button,input'))return;if(sel!==i){sel=i;renderSide();}});\n    d.querySelector('.cls-name').addEventListener('focus',()=>{if(sel!==i){sel=i;document.querySelectorAll('.cls').forEach((x,j)=>x.classList.toggle('sel',j===i));updateTabs();}});\n    d.querySelector('.cls-name').addEventListener('input',ev=>{c.name=ev.target.value||'Nhóm '+(i+1);updateTabs();});\n    d.querySelector('[data-emo]').onclick=()=>{editingEmoji=editingEmoji===i?-1:i;sel=i;renderSide();};\n    d.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{c.emoji=b.dataset.pick;editingEmoji=-1;renderSide();});\n    const del=d.querySelector('[data-del]');if(del)del.onclick=()=>{classes.splice(i,1);sel=0;dataVersion++;renderSide();};\n    const th=d.querySelector('.thumbs');\n    c.samples.forEach((s,si)=>{const t=document.createElement('div');t.className='thumb';t.appendChild(thumbCanvas(s.strokes,27));\n      const x=document.createElement('button');x.textContent='✕';x.setAttribute('aria-label','Xóa hình này');x.onclick=()=>{c.samples.splice(si,1);dataVersion++;renderSide();};t.appendChild(x);th.appendChild(t);});\n    box.appendChild(d);});\n  side.querySelectorAll('[data-preset]').forEach(b=>b.onclick=()=>{const k=b.dataset.preset;if(classes.some(c=>c.samples.length)&&pendingPreset!==k){pendingPreset=k;b.textContent='⚠️ Bấm lần nữa để đổi (xóa hình đã vẽ)';setTimeout(()=>{if(pendingPreset===k){pendingPreset=null;b.textContent=PRESETS[k].label;}},3500);return;}pendingPreset=null;loadPreset(k);});\n  $('addCls').onclick=()=>{if(classes.length>=4)return;const used=new Set(classes.map(c=>c.emoji));classes.push({emoji:EMOJIS.find(e=>!used.has(e)),name:'Nhóm '+(classes.length+1),samples:[]});sel=classes.length-1;dataVersion++;renderSide();};\n  const m=minPer(),msg=$('trainMsg'),btn=$('trainBtn');\n  if(m<2){msg.textContent=`Mỗi nhóm cần ít nhất 2 hình mẫu (nên có 5 hình trở lên). Nhóm ít nhất đang có ${m} hình.`;btn.disabled=true;}\n  else if(trainedVersion===dataVersion){msg.textContent='✅ Máy đã học xong. Sang Bước 2 để thử nhé!';btn.textContent='🔮 Sang Bước 2';btn.onclick=()=>setMode('guess');return;}\n  else{msg.textContent=m<5?`Đã đủ để dạy máy. Mẹo: vẽ thêm cho đủ 5 hình mỗi nhóm thì máy sẽ đoán giỏi hơn.`:`Tuyệt! Mỗi nhóm có từ ${m} hình trở lên. Bấm để máy bắt đầu học.`;btn.disabled=false;}\n  btn.onclick=train;}\n$('save').onclick=()=>{const f=features(strokes);if(!f){flashHint('Hãy vẽ to hơn một chút nhé!');return;}\n  classes[sel].samples.push({strokes:strokes.map(s=>s.slice()),f});dataVersion++;strokes=[];redraw();renderSide();\n  const c=classes[sel];if(c.samples.length===1)speak(`Đã lưu hình đầu tiên cho nhóm ${c.name}`);};\nfunction flashHint(t){const h=$('padHint');h.textContent=t;h.classList.remove('hidden');setTimeout(()=>{h.textContent='Dùng chuột hoặc ngón tay để vẽ vào đây';redraw();},1500);}\nfunction train(){const btn=$('trainBtn'),bar=$('trainBar'),msg=$('trainMsg');btn.disabled=true;const total=classes.reduce((t,c)=>t+c.samples.length,0);\n  const lines=[`Máy đang xem ${total} hình con đã vẽ...`,'Máy đang tìm đặc điểm của từng nhóm...','Máy đang ghi nhớ...'];let p=0;\n  const tick=()=>{p+=4;bar.style.width=p+'%';msg.textContent=lines[Math.min(2,Math.floor(p/34))];\n    if(p<100)setTimeout(tick,45);else{trainedVersion=dataVersion;speak('Máy đã học xong. Bây giờ con vẽ hình mới để máy đoán nhé!');setMode('guess');}};tick();}\n\n/* ---------- BƯỚC 2: ĐOÁN ---------- */\nlet lastPred=null,predTimer=0,guessCount=0;\nfunction schedulePredict(){clearTimeout(predTimer);predTimer=setTimeout(()=>{const f=features(strokes);lastPred=f?{f,...predict(f)}:null;renderGuess(lastPred);},250);}\nfunction renderGuess(pr){lastPred=pr;\n  const stale=trainedVersion!==dataVersion;\n  let html=`<h2>Máy đoán gì?</h2>`;\n  if(!pr){html+=`<div class=\"guess\"><div class=\"emo\">🤔</div><div class=\"sub\">${strokes.length?'Hãy vẽ to hơn một chút nhé!':'Máy đang chờ con vẽ...'}</div></div>`;\n    html+=`<div class=\"tip\"><b>Thử thách:</b> Vẽ một thứ máy chưa từng được dạy, ví dụ con mèo. Máy sẽ đoán thế nào? Máy chỉ biết chọn trong các nhóm con đã dạy, nên có thể đoán sai. Đó là lý do AI cũng có lúc nhầm!</div>`;}\n  else{const c=classes[pr.best],pct=Math.round(pr.probs[pr.best]*100),unsure=pct<55;\n    html+=`<div class=\"guess\"><div class=\"emo\">${c.emoji}</div><div class=\"name\">${unsure?'Có lẽ là ':''}${c.name}</div><div class=\"sub\">Máy chắc chắn ${pct}%</div></div>\n      <div class=\"bars\">${classes.map((k,i)=>{const p=Math.round(pr.probs[i]*100);return`<div class=\"barrow\"><span class=\"lab\">${k.emoji} ${k.name}</span><span class=\"track\"><i class=\"${i===pr.best?'top':''}\" style=\"width:${p}%\"></i></span><span>${p}%</span></div>`}).join('')}</div>\n      <p class=\"lead\" style=\"text-align:center;margin:8px 0 2px\">Máy thấy hình con vẽ giống nhất với:</p><div class=\"similar\" id=\"similar\"></div>\n      ${unsure?'<div class=\"warn\">🤔 Máy chưa chắc chắn lắm. Có thể hình này khác với các hình mẫu, hoặc máy cần được dạy thêm.</div>':''}\n      <div class=\"feedback\"><p class=\"lead\" style=\"margin:0 0 8px\">Máy đoán đúng không con?</p>\n      <div class=\"row\"><button class=\"btn green\" id=\"yes\">✅ Đúng rồi</button>${classes.map((k,i)=>i===pr.best?'':`<button class=\"btn\" data-fix=\"${i}\">❌ Không, đây là ${k.emoji} ${k.name}</button>`).join('')}</div>\n      <p class=\"fbmsg\" id=\"fbmsg\"></p></div>`;}\n  if(stale&&trainedVersion>=0)html+=`<div class=\"warn\">Con vừa thay đổi hình mẫu. Hãy quay lại Bước 1 và bấm \"Dạy máy học\" để máy học lại nhé.</div>`;\n  side.innerHTML=html;\n  if(pr){const sim=$('similar');pr.nearest.forEach(n=>{const d=document.createElement('div');d.className='sim';const t=document.createElement('div');t.className='thumb';\n      t.appendChild(thumbCanvas(n.sample.strokes,33));d.appendChild(t);d.append(`${classes[n.ci].emoji} ${Math.round(Math.max(0,n.s)*100)}%`);sim.appendChild(d);});\n    const done=(ci,ok)=>{classes[ci].samples.push({strokes:strokes.map(s=>s.slice()),f:pr.f});dataVersion++;trainedVersion=dataVersion;guessCount++;\n      const m=$('fbmsg');m.className='fbmsg ok';m.textContent=ok?`Tuyệt! Máy được thêm 1 ví dụ cho nhóm ${classes[ci].name} để nhớ lâu hơn.`:`Cảm ơn con! Máy đã học thêm: hình này thuộc nhóm ${classes[ci].name}. Lần sau máy sẽ đoán giỏi hơn.`;\n      speak(ok?'Máy đoán đúng rồi!':'Cảm ơn con, máy đã học thêm một hình.');\n      side.querySelectorAll('#yes,[data-fix]').forEach(b=>b.disabled=true);setTimeout(()=>{strokes=[];redraw();renderGuess(null);},1800);};\n    $('yes').onclick=()=>done(pr.best,true);side.querySelectorAll('[data-fix]').forEach(b=>b.onclick=()=>done(+b.dataset.fix,false));\n    if(!speakGuard){speakGuard=true;speak(`Máy đoán đây là ${classes[pr.best].name}`);setTimeout(()=>speakGuard=false,1500);}}}\nlet speakGuard=false;\n\n/* ---------- chuyển bước ---------- */\nfunction setMode(m){if(m==='guess'&&trainedVersion<0)return;mode=m;document.querySelectorAll('.mode').forEach(b=>b.setAttribute('aria-selected',b.dataset.mode===m));\n  strokes=[];redraw();lastPred=null;renderSide();}\ndocument.querySelectorAll('.mode').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));\n\nloadPreset('objects');redraw();\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --pink:#ec4899;--pink-soft:#fdf2f8;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#f0fdf4;--blue:#1d4ed8;--blue-soft:#eff6ff;\n  --orange:#c2410c;--orange-soft:#fff7ed;--red:#e11d48;--red-soft:#fff1f2;\n  --paper:#ffffff;\n  box-sizing:border-box;\n  padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--orange-soft:#4a3420;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--orange:#ffb05c;--red:#ff7482;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--orange-soft:#4a3420;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--orange:#ffb05c;--red:#ff7482;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.modes{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}\n.mode{min-height:56px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-size:1.1rem;font-weight:900}\n.mode small{display:block;font-size:.82rem;font-weight:700;color:var(--muted)}\n.mode[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.mode[aria-selected=\"true\"] small{color:#fdf2ff}\n.mode:disabled{opacity:.5;cursor:not-allowed}\n.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:14px;align-items:start}\n@media (max-width:860px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px}\n.card h2{margin:0 0 8px;font-size:1.4rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.padwrap{position:relative;max-width:440px;margin:0 auto}\ncanvas.pad{display:block;width:100%;aspect-ratio:1;border:3px dashed #c4b5fd;border-radius:20px;background:var(--paper);touch-action:none;cursor:crosshair}\n.pad-hint{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none;color:#a99bc7;font-weight:800;font-size:1.1rem;text-align:center;padding:20px}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900;font-size:1rem}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.green{border-color:transparent;color:#fff;background:var(--green)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.classes{display:grid;gap:10px}\n.cls{border:2px solid var(--line);border-radius:18px;padding:10px 12px;background:var(--card)}\n.cls.sel{border-color:var(--purple);background:var(--purple-soft)}\n.cls-head{display:flex;align-items:center;gap:8px}\n.cls-emoji{width:44px;height:44px;border-radius:12px;border:2px solid var(--line);background:var(--card);font-size:1.5rem;display:grid;place-items:center;flex:none}\n.cls-name{flex:1;min-width:0;border:2px solid transparent;border-radius:10px;padding:4px 8px;background:transparent;font-family:\"Baloo 2\",sans-serif;font-size:1.25rem;font-weight:800}\n.cls-name:hover,.cls-name:focus{border-color:var(--line);background:var(--card)}\n.count{font-weight:900;font-size:.9rem;padding:3px 10px;border-radius:999px;background:var(--orange-soft);color:var(--orange);white-space:nowrap}\n.count.ok{background:var(--green-soft);color:var(--green)}\n.icon-btn{width:36px;height:36px;border-radius:10px;border:2px solid var(--line);background:var(--card);font-size:1rem;flex:none}\n.thumbs{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;min-height:10px}\n.thumb{position:relative;width:54px;height:54px;border-radius:10px;border:2px solid var(--line);background:#fff}\n.thumb canvas{width:100%;height:100%;display:block;border-radius:8px}\n.thumb button{position:absolute;top:-8px;right:-8px;width:22px;height:22px;border-radius:50%;border:none;background:var(--red);color:#fff;font-size:.75rem;font-weight:900;display:none;padding:0}\n.thumb:hover button,.thumb:focus-within button{display:block}\n.presets{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}\n.preset{border:2px solid var(--line);border-radius:999px;background:var(--card);padding:5px 12px;font-weight:800;font-size:.92rem}\n.emoji-pop{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}\n.emoji-pop button{width:38px;height:38px;border-radius:10px;border:2px solid var(--line);background:var(--card);font-size:1.3rem}\n.train{margin-top:12px;border-radius:18px;padding:14px;background:var(--purple-soft)}\n.train p{margin:0 0 8px;font-weight:800}\n.progress{height:14px;border-radius:99px;background:var(--card);overflow:hidden;margin:8px 0}\n.progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);transition:width .2s}\n.guess{text-align:center;padding:6px 0 10px}\n.guess .emo{font-size:3.4rem;line-height:1}\n.guess .name{font-family:\"Baloo 2\",sans-serif;font-size:1.9rem;font-weight:800;color:var(--purple)}\n.guess .sub{color:var(--muted);font-weight:800}\n.bars{display:grid;gap:8px;margin:10px 0}\n.barrow{display:grid;grid-template-columns:150px 1fr 54px;gap:8px;align-items:center;font-weight:800}\n.barrow .lab{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.track{height:20px;border-radius:99px;background:var(--purple-soft);overflow:hidden}\n.track i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#f9a8d4,#a78bfa);transition:width .35s}\n.track i.top{background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.similar{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px}\n.sim{text-align:center;font-weight:800;font-size:.85rem;color:var(--muted)}\n.sim .thumb{width:66px;height:66px;margin:0 auto 2px}\n.feedback{border-top:2px dashed var(--line);margin-top:12px;padding-top:12px}\n.fbmsg{min-height:1.5em;font-weight:900;margin:8px 0 0}\n.fbmsg.ok{color:var(--green)}\n.tip{border-radius:16px;padding:12px 14px;font-weight:700;background:var(--blue-soft);margin-top:12px}\n.tip b{color:var(--blue)}\n.warn{border-radius:16px;padding:12px 14px;font-weight:800;background:var(--orange-soft);color:var(--orange);margin-top:12px}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}\n@media (max-width:600px){.steps{grid-template-columns:1fr}.barrow{grid-template-columns:110px 1fr 48px}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.privacy{color:var(--muted);font-weight:700;font-size:.88rem;margin:12px 4px 0}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important}}";
  const CLASS1_AI_LAB_THEME = `
:root{
  --bg:#ffffff !important;
  --card:#ffffff !important;
  --ink:#344054 !important;
  --muted:#667085 !important;
  --line:#EDE9FE !important;
  --purple:#7C3AED !important;
  --purple-soft:#F5F3FF !important;
  --green:#059669 !important;
  --green-soft:#ECFDF5 !important;
  --blue:#2563EB !important;
  --blue-soft:#EFF8FF !important;
  --orange:#C2410C !important;
  --orange-soft:#FFF7ED !important;
  --red:#E11D48 !important;
  --red-soft:#FFF1F2 !important;
  --kind:#059669 !important;
  --kind-soft:#ECFDF5 !important;
  --sad:#2563EB !important;
  --sad-soft:#EFF6FF !important;
  --paper:#ffffff !important;
}
html,body{background:#ffffff !important;color:var(--ink) !important;}
body{color:#344054 !important;}
.hero{
  background:linear-gradient(135deg,#FFF7FB 0%,#FAF5FF 50%,#EFF8FF 100%) !important;
  border:1px solid #E9D5FF !important;
  box-shadow:0 6px 16px rgba(76,29,149,.06) !important;
}
.hero-icon{
  background:#ffffff !important;
  border:1px solid #E9D5FF !important;
  box-shadow:0 4px 10px rgba(76,29,149,.07) !important;
}
.hero h1{color:#6D28D9 !important;}
.ai{
  color:#ffffff !important;
  background:linear-gradient(90deg,#EC4899 0%,#8B5CF6 55%,#3B82F6 100%) !important;
  box-shadow:0 4px 12px rgba(124,58,237,.18) !important;
}
.card,.step{
  background:#ffffff !important;
  border-width:1px !important;
  border-color:#E9D5FF !important;
  box-shadow:0 4px 12px rgba(15,23,42,.045) !important;
}
.mode,.btn,.chip,.preset,.samp,.icon-btn,input.txt,.cls,.emoji-pop button{
  border-width:1px !important;
}
.mode{background:#ffffff !important;border-color:#E9D5FF !important;}
.mode[aria-selected="true"],.btn.main{
  color:#ffffff !important;
  border-color:transparent !important;
  background:linear-gradient(90deg,#EC4899,#8B5CF6) !important;
}
.btn:not(.main):not(.green),.chip,.preset,.samp,.icon-btn,input.txt,.cls,.emoji-pop button{
  background:#ffffff !important;
  border-color:#E9D5FF !important;
}
.btn.green{background:linear-gradient(90deg,#14B8A6,#10B981) !important;border-color:transparent !important;color:#ffffff !important;}
.train,.stat,.rules li,.sentence,.track,svg.chart{background:var(--purple-soft) !important;}
.tip{background:var(--blue-soft) !important;}
.warn{background:var(--orange-soft) !important;}
button:focus-visible,input:focus-visible{outline-color:#8B5CF6 !important;}
`;
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🤖</div>\n    <div>\n      <h1>Bé dạy AI nhận hình <span class=\"ai\">✨ AI</span></h1>\n      <p>Con vẽ hình để dạy máy, rồi xem máy có tự đoán đúng hình mới không. Đây là cách trí tuệ nhân tạo học từ dữ liệu.</p>\n    </div>\n  </header>\n\n  <div class=\"modes\" role=\"tablist\">\n    <button class=\"mode\" role=\"tab\" aria-selected=\"true\" data-mode=\"teach\">✏️ Bước 1: Dạy máy<small>Vẽ hình mẫu cho từng nhóm</small></button>\n    <button class=\"mode\" role=\"tab\" aria-selected=\"false\" data-mode=\"guess\" id=\"guessTab\">🔮 Bước 2: Máy đoán<small>Vẽ hình mới để máy đoán</small></button>\n  </div>\n\n  <div class=\"grid\">\n    <section class=\"card\">\n      <h2 id=\"padTitle\">Vẽ hình mẫu</h2>\n      <p class=\"lead\" id=\"padLead\"></p>\n      <div class=\"padwrap\">\n        <canvas class=\"pad\" id=\"pad\" width=\"440\" height=\"440\" aria-label=\"Bảng vẽ\"></canvas>\n        <div class=\"pad-hint\" id=\"padHint\">Dùng chuột hoặc ngón tay để vẽ vào đây</div>\n      </div>\n      <div class=\"row\" style=\"margin-top:10px;justify-content:center\">\n        <button class=\"btn\" id=\"clear\">🧽 Xóa bảng</button>\n        <button class=\"btn\" id=\"undo\">↶ Xóa nét vừa vẽ</button>\n        <button class=\"btn main\" id=\"save\">💾 Lưu vào nhóm</button>\n      </div>\n      <p class=\"privacy\">🔒 Hình vẽ chỉ nằm trên máy của con, không gửi đi đâu cả.</p>\n    </section>\n\n    <section class=\"card\" id=\"side\"></section>\n  </div>\n\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Thu thập dữ liệu</b>Con vẽ nhiều hình mẫu cho mỗi nhóm. Mỗi hình là một \"ví dụ\" để máy học.</div>\n    <div class=\"step\"><b>2. Máy học</b>Máy ghi nhớ đặc điểm của các hình: nét vẽ nằm ở những chỗ nào, hình dáng ra sao.</div>\n    <div class=\"step\"><b>3. Máy đoán</b>Gặp hình mới, máy so với các hình đã học và chọn nhóm giống nhất.</div>\n  </div>\n</div>";
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
    return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer">${TOOL_HEAD}<style>${TOOL_CSS}</style><style>${CLASS1_AI_LAB_THEME}</style></head><body>${TOOL_BODY}${bridge}<script>${safeCore}<\/script></body></html>`;
  }

  function render(context = {}) {
    if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
    const host = context.host;
    if (!(host instanceof Element)) return;

    const instanceId = `${TOOL_ID}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    host.innerHTML = `<div style="width:100%;"><iframe title="Bé dạy AI nhận hình" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
