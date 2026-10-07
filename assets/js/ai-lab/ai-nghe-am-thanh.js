/* Epsilon Edu - AI nghe âm thanh
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiSoundListen";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst SR=16000,LEN=Math.round(SR*.75);\nconst R=(a,b)=>a+Math.random()*(b-a);\nconst CLS=[\n {k:'bell',e:'🔔',n:'Tiếng chuông',gen:b=>{const f=R(600,1300);const parts=[[1,1],[2.76,.5],[5.4,.3]];for(let i=0;i<LEN;i++){const t=i/SR;let v=0;parts.forEach(([m,a])=>v+=a*Math.sin(2*Math.PI*f*m*t));b[i]+=v*.35*Math.exp(-t*R(3,5));}}},\n {k:'drum',e:'🥁',n:'Tiếng trống',gen:b=>{const hits=Math.random()<.5?1:2;for(let h=0;h<hits;h++){const off=Math.round(h*SR*R(.3,.38));const f0=R(120,170);let ph=0;for(let i=0;i+off<LEN;i++){const t=i/SR;const f=f0*(1+1.5*Math.exp(-t*30));ph+=2*Math.PI*f/SR;b[i+off]+=.9*Math.sin(ph)*Math.exp(-t*R(8,12))+.15*(Math.random()*2-1)*Math.exp(-t*60);}}}},\n {k:'clap',e:'👏',n:'Tiếng vỗ tay',gen:b=>{const n=Math.floor(R(2,4));for(let h=0;h<n;h++){const off=Math.round(h*SR*R(.17,.24));for(let i=0;i+off<LEN&&i<SR*.12;i++){const t=i/SR;b[i+off]+=(Math.random()*2-1)*.8*Math.exp(-t*40);}}}},\n {k:'flute',e:'🎶',n:'Tiếng sáo',gen:b=>{const f=R(450,950);let ph=0;for(let i=0;i<LEN;i++){const t=i/SR;const fv=f*(1+.012*Math.sin(2*Math.PI*5.5*t));ph+=2*Math.PI*fv/SR;const env=Math.min(1,t*12)*Math.min(1,(LEN/SR-t)*10);b[i]+=.5*env*(Math.sin(ph)+.15*Math.sin(2*ph))+.02*(Math.random()*2-1)*env;}}},\n {k:'horn',e:'🎺',n:'Tiếng kèn',gen:b=>{const f=R(260,520);let ph=0;for(let i=0;i<LEN;i++){const t=i/SR;ph+=2*Math.PI*f/SR;const env=Math.min(1,t*20)*Math.min(1,(LEN/SR-t)*8);let v=0;for(let h=1;h<=6;h++)v+=Math.sin(h*ph)/h;b[i]+=.4*env*v;}}},\n {k:'bird',e:'🐦',n:'Tiếng chim hót',gen:b=>{const n=Math.floor(R(3,5));for(let h=0;h<n;h++){const off=Math.round(h*SR*R(.13,.17));const f1=R(2400,3000),f2=f1+R(1200,1800),d=R(.06,.09);let ph=0;for(let i=0;i<SR*d&&i+off<LEN;i++){const t=i/SR,f=f1+(f2-f1)*t/d;ph+=2*Math.PI*f/SR;b[i+off]+=.45*Math.sin(ph)*Math.sin(Math.PI*t/d);}}}}];\nfunction make(ci,noise=0){const b=new Float32Array(LEN);CLS[ci].gen(b);const s=noise/100;if(s>0)for(let i=0;i<LEN;i++)b[i]+=s*1.1*(Math.random()*2-1);let m=0;for(const v of b)m=Math.max(m,Math.abs(v));if(m>0)for(let i=0;i<LEN;i++)b[i]*=.8/m;return b;}\n// FFT\nfunction fft(re,im){const n=re.length;for(let i=1,j=0;i<n;i++){let bit=n>>1;for(;j&bit;bit>>=1)j^=bit;j^=bit;if(i<j){[re[i],re[j]]=[re[j],re[i]];[im[i],im[j]]=[im[j],im[i]];}}\n  for(let len=2;len<=n;len<<=1){const a=-2*Math.PI/len,wr=Math.cos(a),wi=Math.sin(a);for(let i=0;i<n;i+=len){let cr=1,ci=0;for(let j=0;j<len/2;j++){const ur=re[i+j],ui=im[i+j],vr=re[i+j+len/2]*cr-im[i+j+len/2]*ci,vi=re[i+j+len/2]*ci+im[i+j+len/2]*cr;re[i+j]=ur+vr;im[i+j]=ui+vi;re[i+j+len/2]=ur-vr;im[i+j+len/2]=ui-vi;const t=cr*wr-ci*wi;ci=cr*wi+ci*wr;cr=t;}}}}\nconst FR=512,TB=32,FB=32;\nfunction spectro(b){const out=[];const hop=Math.floor((LEN-FR)/(TB-1));for(let t=0;t<TB;t++){const re=new Float32Array(FR),im=new Float32Array(FR);for(let i=0;i<FR;i++)re[i]=b[t*hop+i]*(.5-.5*Math.cos(2*Math.PI*i/(FR-1)));fft(re,im);\n    const col=[];for(let f=0;f<FB;f++){const lo=Math.floor(Math.pow(256,f/FB)),hi=Math.max(lo+1,Math.floor(Math.pow(256,(f+1)/FB)));let s=0;for(let k=lo;k<hi;k++)s+=Math.hypot(re[k],im[k]);col.push(Math.log(1+s/(hi-lo)));}out.push(col);}return out;}\nfunction feat(sp){const v=[];for(let t=0;t<TB;t+=2)for(let f=0;f<FB;f+=2)v.push((sp[t][f]+sp[t][f+1]+sp[t+1][f]+sp[t+1][f+1])/4);\n  // thêm \"hình dạng trung bình theo tần số\" để bớt phụ thuộc thời điểm\n  for(let f=0;f<FB;f++){let s=0;for(let t=0;t<TB;t++)s+=sp[t][f];v.push(s/TB*2);}\n  let m=0;for(const a of v)m+=a;m/=v.length;let n=0;const o=v.map(a=>a-m);for(const a of o)n+=a*a;n=Math.sqrt(n)||1;return o.map(a=>a/n);}\nfunction drawSpec(cv,sp){const g=cv.getContext('2d'),W=cv.width,H=cv.height;let mx=0;sp.forEach(c=>c.forEach(v=>mx=Math.max(mx,v)));\n  for(let t=0;t<TB;t++)for(let f=0;f<FB;f++){const v=sp[t][f]/(mx||1);g.fillStyle=`hsl(${300-v*120},85%,${10+v*58}%)`;g.fillRect(t*W/TB,H-(f+1)*H/FB,W/TB+1,H/FB+1);}}\nlet ac=null;function play(b){try{if(!ac)ac=new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();const buf=ac.createBuffer(1,b.length,SR);buf.copyToChannel?buf.copyToChannel(b,0):buf.getChannelData(0).set(b);const s=ac.createBufferSource();s.buffer=buf;const g=ac.createGain();g.gain.value=.6;s.connect(g);g.connect(ac.destination);s.start();}catch(e){}}\n/* bước 1 */\n$('sounds').innerHTML=CLS.map((c,i)=>`<button class=\"snd\" data-c=\"${i}\"><span class=\"em\">${c.e}</span>${c.n}<canvas width=\"160\" height=\"60\"></canvas></button>`).join('');\n$('sounds').querySelectorAll('[data-c]').forEach(b=>{const draw=()=>{const s=make(+b.dataset.c);drawSpec(b.querySelector('canvas'),spectro(s));return s;};draw();\n  b.onclick=()=>{const s=draw();play(s);document.querySelectorAll('.snd').forEach(x=>x.classList.toggle('on',x===b));};});\n/* bước 2 */\nlet per=3,mem=[];\ndocument.querySelectorAll('#nSeg [data-n]').forEach(b=>b.onclick=()=>{per=+b.dataset.n;document.querySelectorAll('#nSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));});\n$('train').onclick=()=>{$('trainTxt').textContent='Máy đang nghe...';setTimeout(()=>{mem=[];CLS.forEach((c,ci)=>{for(let k=0;k<per;k++)mem.push({ci,f:feat(spectro(make(ci)))});});\n  $('trainTxt').textContent=`✅ Máy đã nghe ${mem.length} âm thanh (${per} lần mỗi loại).`;['ask','exam'].forEach(id=>$(id).disabled=false);speak('Máy đã học xong. Bấm phát âm thanh bí ẩn để đố máy nhé!');},50);};\nfunction classify(f){const sc=CLS.map((c,ci)=>{const s=mem.filter(m=>m.ci===ci).map(m=>{let d=0;for(let i=0;i<f.length;i++)d+=f[i]*m.f[i];return d;}).sort((a,b)=>b-a);const k=Math.min(2,s.length);return s.slice(0,k).reduce((a,b)=>a+b,0)/k;});\n  const T=10,mx=Math.max(...sc),ex=sc.map(s=>Math.exp((s-mx)*T)),tot=ex.reduce((a,b)=>a+b,0);return ex.map(e=>e/tot);}\n/* bước 3 */\nlet cur=null,curBuf=null,kidDone=false;\n$('noise').oninput=()=>{const v=+$('noise').value;$('noiseTxt').textContent=v===0?'yên tĩnh':v<35?'hơi ồn':v<70?'ồn':'rất ồn';};\n$('ask').onclick=()=>{cur=Math.floor(Math.random()*CLS.length);curBuf=make(cur,+$('noise').value);const sp=spectro(curBuf);drawSpec($('spec'),sp);play(curBuf);$('replay').disabled=false;kidDone=false;\n  const pr=classify(feat(sp));$('ai').innerHTML='';$('bars').innerHTML='';\n  $('kid').innerHTML=CLS.map((c,i)=>`<button data-k=\"${i}\">${c.e} ${c.n}</button>`).join('');\n  $('kid').querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(kidDone)return;kidDone=true;const k=+b.dataset.k;b.classList.add(k===cur?'ok':'no');if(k!==cur)$('kid').querySelector(`[data-k=\"${cur}\"]`).classList.add('ok');reveal(pr);});};\nfunction reveal(pr){const bi=pr.indexOf(Math.max(...pr)),ok=bi===cur;\n  $('ai').innerHTML=`<div class=\"msg ${ok?'ok':'no'}\">${ok?'🤖 Máy đoán đúng':'🤖 Máy đoán nhầm'}: máy nghĩ đây là ${CLS[bi].e} ${CLS[bi].n} (chắc chắn ${Math.round(pr[bi]*100)}%). Đáp án: ${CLS[cur].e} ${CLS[cur].n}.</div>`;\n  $('bars').innerHTML=CLS.map((c,i)=>{const p=Math.round(pr[i]*100);return`<div class=\"barrow\"><span>${c.e} ${c.n}</span><span class=\"track\"><i class=\"${i===bi?'top':''}\" style=\"width:${p}%\"></i></span><span>${p}%</span></div>`}).join('');}\n$('replay').onclick=()=>{if(curBuf)play(curBuf);};\n$('exam').onclick=()=>{$('examTxt').textContent='Đang kiểm tra...';setTimeout(()=>{let ok=0;for(let i=0;i<20;i++){const ci=i%CLS.length;const pr=classify(feat(spectro(make(ci,+$('noise').value))));if(pr.indexOf(Math.max(...pr))===ci)ok++;}\n  $('examTxt').textContent=`Máy đúng ${ok} / 20 âm thanh${+$('noise').value>0?' (có tiếng ồn)':''}. ${ok<16?'Thử cho máy học nhiều hơn hoặc giảm tiếng ồn xem!':'Giỏi quá!'}`;},50);};\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --pink:#ec4899;--pink-soft:#fdf2f8;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#f0fdf4;--blue:#1d4ed8;--blue-soft:#eff6ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-weight:900;font-size:1.02rem}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.tab[aria-selected=\"true\"] small{color:#fdf2ff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:2px solid var(--line);border-radius:14px;background:var(--card)}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--pink-soft);color:var(--pink)}\n.tip{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--purple)}\n.warn{border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:var(--pink);margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.sounds{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}\n.snd{border:2px solid var(--line);border-radius:16px;background:var(--card);padding:10px;text-align:center;font-weight:900}\n.snd .em{font-size:2rem;display:block;line-height:1.2}\n.snd canvas{display:block;width:100%;height:60px;border-radius:8px;margin-top:6px;background:#1e1b3a}\n.snd.on{border-color:#8b5cf6;background:var(--purple-soft)}\ncanvas.spec{display:block;width:100%;height:150px;border-radius:12px;background:#1e1b3a}\n.mystery{text-align:center}\n.mystery .big{font-size:3.4rem;line-height:1.1}\n.bars{display:grid;gap:6px;margin-top:8px}\n.barrow{display:grid;grid-template-columns:120px 1fr 48px;gap:8px;align-items:center;font-weight:800;font-size:.95rem}\n.track{height:18px;border-radius:99px;background:var(--purple-soft);overflow:hidden}\n.track i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#3b82f6,#22c55e);transition:width .3s}\n.track i.top{background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.kidpick{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:8px}\n.kidpick button{border:2px solid var(--line);background:var(--card);border-radius:12px;padding:6px 10px;font-weight:900}\n.kidpick button.ok{border-color:#22c55e;background:var(--green-soft)}.kidpick button.no{border-color:#ec4899;background:var(--pink-soft)}";
  const CLASS1_AI_LAB_THEME = ":root,\n:root[data-theme=\"dark\"]{\n  --bg:#ffffff!important;\n  --card:#ffffff!important;\n  --ink:#344054!important;\n  --muted:#667085!important;\n  --line:#EDE9FE!important;\n  --pink:#EC4899!important;\n  --pink-soft:#FFF1F7!important;\n  --purple:#7C3AED!important;\n  --purple-soft:#F5F3FF!important;\n  --green:#10B981!important;\n  --green-soft:#ECFDF3!important;\n  --blue:#3B82F6!important;\n  --blue-soft:#EFF8FF!important;\n  --red:#E11D48!important;\n  --red-soft:#FFF1F2!important;\n  --paper:#ffffff!important;\n  --c1:#EC4899!important;\n  --c2:#8B5CF6!important;\n  --c3:#3B82F6!important;\n  --c4:#10B981!important;\n}\nhtml,body{background:#fff!important;color:var(--ink)!important}\n.hero{\n  background:linear-gradient(135deg,#FFF7FB 0%,#FAF5FF 52%,#EFF8FF 100%)!important;\n  border:1px solid #E9D5FF!important;\n  box-shadow:0 6px 16px rgba(124,58,237,.08)!important;\n}\n.hero-icon{\n  background:#F5F3FF!important;\n  border:1px solid #DDD6FE!important;\n  box-shadow:0 4px 10px rgba(124,58,237,.07)!important;\n}\n.hero h1{color:#6D28D9!important}\n.card,.step{\n  border-width:1px!important;\n  border-color:#EDE9FE!important;\n  box-shadow:0 5px 14px rgba(76,29,149,.055)!important;\n}\n.card:nth-of-type(3n+1),.step:nth-child(3n+1){background:#FFF9FC!important}\n.card:nth-of-type(3n+2),.step:nth-child(3n+2){background:#FBF9FF!important}\n.card:nth-of-type(3n),.step:nth-child(3n){background:#F8FCFF!important}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.chart,.plane,.rl,.tl,.kidpick button,table.ex button{\n  border-width:1px!important;\n}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.tl,table.ex button,.kidpick button{\n  background:#fff!important;\n}\n.tab[aria-selected=\"true\"],.seg button[aria-pressed=\"true\"]{\n  background:linear-gradient(90deg,#EC4899,#8B5CF6)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n}\n.btn.main{\n  background:linear-gradient(90deg,#EC4899,#A855F7,#7C3AED)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(139,92,246,.16)!important;\n}\n.btn.cool{\n  background:linear-gradient(90deg,#3B82F6,#10B981)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(59,130,246,.13)!important;\n}\n.tip{\n  background:#EFF8FF!important;\n  border:1px solid #BFDBFE!important;\n  color:#344054!important;\n}\n.warn{\n  background:#FFF1F7!important;\n  border:1px solid #FBCFE8!important;\n  color:#BE185D!important;\n}\n.msg{\n  background:#EFF8FF!important;\n  border:1px solid #DBEAFE!important;\n  color:#344054!important;\n}\n.msg.ok{background:#ECFDF3!important;border-color:#BBF7D0!important;color:#047857!important}\n.msg.no{background:#FFF1F7!important;border-color:#FBCFE8!important;color:#BE185D!important}\n.stat,.sc,.rc,.gr,table.ex td{background:#F5F3FF!important}\n.feed,.use{background:#EFF8FF!important}\n.prof span{border:1px solid rgba(148,163,184,.18)!important}\n.it.like,.al.yes,.kidpick button.ok{background:#ECFDF3!important;border-color:#86EFAC!important}\n.it.dis,.al.no,.kidpick button.no{background:#FFF1F7!important;border-color:#F9A8D4!important}\n.snd.on,.sh:focus-visible,.sw[aria-pressed=\"true\"]{border-color:#C4B5FD!important}\n.track{background:#F5F3FF!important}\ninput[type=\"range\"]{accent-color:#8B5CF6}\n@media (max-width:640px){\n  .wrap{padding-left:10px;padding-right:10px}\n}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🎧</div>\n    <div>\n      <h1>AI nghe âm thanh <span class=\"ai\">✨ AI</span></h1>\n      <p>Máy biến âm thanh thành hình \"dấu vân tay\" để nhận ra tiếng chuông, tiếng trống, tiếng vỗ tay, tiếng sáo và tiếng chim. Không cần dùng micro.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <section>\n      <div class=\"card\">\n        <h2>🎧 Bước 1: Nghe và xem \"dấu vân tay âm thanh\"</h2>\n        <p class=\"lead\">Bấm để nghe. Hình bên dưới mỗi âm thanh cho biết âm cao hay trầm (dưới lên trên) thay đổi thế nào theo thời gian (trái sang phải). Mỗi loại âm thanh có một hình dạng riêng!</p>\n        <div class=\"sounds\" id=\"sounds\"></div>\n      </div>\n      <div class=\"card\">\n        <h2>🧠 Bước 2: Dạy máy</h2>\n        <p class=\"lead\">Mỗi lần tiếng chuông, tiếng trống... đều hơi khác nhau. Máy cần nghe nhiều ví dụ để nhận ra.</p>\n        <div class=\"row\"><span class=\"lbl\">Mỗi loại cho máy nghe</span><span class=\"seg\" id=\"nSeg\"><button data-n=\"1\" aria-pressed=\"false\">1 lần</button><button data-n=\"3\" aria-pressed=\"true\">3 lần</button><button data-n=\"10\" aria-pressed=\"false\">10 lần</button></span></div>\n        <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn main\" id=\"train\">🧠 Cho máy học</button><span class=\"lbl\" id=\"trainTxt\"></span></div>\n      </div>\n    </section>\n    <section>\n      <div class=\"card mystery\">\n        <h2>🔮 Bước 3: Đố máy</h2>\n        <label class=\"slider\">🌫️ Tiếng ồn xung quanh <input type=\"range\" id=\"noise\" min=\"0\" max=\"100\" value=\"0\"><small id=\"noiseTxt\">yên tĩnh</small></label>\n        <div class=\"row\" style=\"justify-content:center\"><button class=\"btn cool\" id=\"ask\" disabled>🎲 Phát âm thanh bí ẩn</button><button class=\"btn\" id=\"replay\" disabled>🔁 Nghe lại</button></div>\n        <canvas class=\"spec\" id=\"spec\" width=\"600\" height=\"150\" style=\"margin-top:10px\"></canvas>\n        <p class=\"lead\" style=\"margin:10px 0 0\">Con đoán là gì?</p><div class=\"kidpick\" id=\"kid\"></div>\n        <div id=\"ai\"></div>\n        <div class=\"bars\" id=\"bars\" style=\"text-align:left\"></div>\n      </div>\n      <div class=\"card\"><h2>📊 Kiểm tra máy</h2><p class=\"lead\">Cho máy nghe 20 âm thanh mới để xem máy đúng bao nhiêu.</p><div class=\"row\"><button class=\"btn\" id=\"exam\" disabled>🧪 Kiểm tra 20 âm thanh</button><span class=\"lbl\" id=\"examTxt\"></span></div></div>\n    </section>\n  </div>\n  <div class=\"tip\"><b>Máy nghe như thế nào?</b> Máy không \"nghe\" như tai người. Máy biến âm thanh thành hình \"dấu vân tay\" như con thấy ở trên, rồi so với dấu vân tay của các âm thanh đã học. Trợ lý giọng nói trên điện thoại cũng bắt đầu bằng cách biến giọng nói thành những hình như thế này. Ở đây, các âm thanh đều do máy tự tạo ra, không cần dùng micro.</div>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="AI nghe âm thanh" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
      } else if (data.type === "class1-tool-download") {
        const url = String(data.dataUrl || "");
        if (!/^data:image\/png;base64,/.test(url)) return;
        const a = document.createElement("a");
        a.href = url;
        a.download = String(data.filename || "epsilon-edu.png").replace(/[^\w.\-]/g, "_");
        document.body.appendChild(a);
        a.click();
        a.remove();
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
