/* Epsilon Edu - AI nhìn bằng pixel
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiPixelVision";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst N=16;\nconst SHAPES=[\n {k:'circle',e:'⭕',n:'Hình tròn',f:(x,y)=>{const d=Math.hypot(x-7.5,y-7.5);return d>4.6&&d<6.6;}},\n {k:'square',e:'⬜',n:'Hình vuông',f:(x,y)=>(x>=2&&x<=13&&y>=2&&y<=13)&&(x<=3||x>=12||y<=3||y>=12)},\n {k:'tri',e:'🔺',n:'Tam giác',f:(x,y)=>{if(y<2||y>13)return false;const h=(y-2)/11*6;const l=7.5-h,r=7.5+h;return (Math.abs(x-l)<1.1||Math.abs(x-r)<1.1)||(y>=12&&x>=l-.5&&x<=r+.5);}},\n {k:'plus',e:'➕',n:'Dấu cộng',f:(x,y)=>(x>=6&&x<=9&&y>=2&&y<=13)||(y>=6&&y<=9&&x>=2&&x<=13)},\n {k:'cross',e:'✖️',n:'Dấu nhân',f:(x,y)=>x>=2&&x<=13&&y>=2&&y<=13&&(Math.abs(x-y)<=1||Math.abs(x+y-15)<=1)},\n {k:'heart',e:'❤️',n:'Trái tim',f:(x,y)=>{const X=(x-7.5)/6,Y=(7-y)/6;return Math.pow(X*X+Y*Y-.5,3)-X*X*Y*Y*Y*1.2<0;}},\n {k:'smile',e:'🙂',n:'Mặt cười',f:(x,y)=>{const d=Math.hypot(x-7.5,y-7.5);if(d>5.8&&d<7.4)return true;if((x===5||x===10)&&(y===5||y===6))return true;return d>2.6&&d<4.1&&y>=9&&y<=11;}}];\nSHAPES.forEach(s=>{s.g=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)s.g.push(s.f(x,y)?1:0);s.v=feat(s.g);});\nlet base=new Array(N*N).fill(0),noiseMask=[],coverRect=0,cells=[],drag=null;\nfunction feat(g){let v=new Float32Array(N*N);for(let i=0;i<N*N;i++)v[i]=g[i];for(let p=0;p<1;p++){const o=new Float32Array(N*N);for(let y=0;y<N;y++)for(let x=0;x<N;x++){let s=0,c=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<N&&Y<N){s+=v[Y*N+X]*(dx||dy?.5:1);c+=dx||dy?.5:1;}}o[y*N+x]=s/c;}v=o;}\n  let n=0;for(const a of v)n+=a*a;n=Math.sqrt(n)||1;return v.map(a=>a/n);}\nfunction current(){const g=base.slice();noiseMask.forEach(i=>g[i]=1-g[i]);if(coverRect>0){for(let y=0;y<N;y++)for(let x=N-coverRect;x<N;x++)g[y*N+x]=0;}return g;}\nfunction build(){const p=$('pix');p.style.gridTemplateColumns=`repeat(${N},1fr)`;p.innerHTML='';cells=[];for(let i=0;i<N*N;i++){const d=document.createElement('div');d.className='px';d.dataset.i=i;p.appendChild(d);cells.push(d);}}\nfunction render(){const g=current(),nums=$('nums').checked,ns=new Set(noiseMask);\n  cells.forEach((d,i)=>{const x=i%N;d.className='px'+(g[i]?' on':'')+(ns.has(i)?' noise':'')+(coverRect>0&&x>=N-coverRect?' cover':'');d.textContent=nums?g[i]:'';});guess(g);}\nfunction guess(g){const on=g.reduce((a,b)=>a+b,0);if(on<4){$('guess').innerHTML='<div class=\"emo\">🤔</div><p class=\"lead\">Tô vài pixel hoặc chọn một hình mẫu nhé!</p>';$('bars').innerHTML='';return;}\n  const v=feat(g);const sims=SHAPES.map(s=>{let d=0;for(let i=0;i<v.length;i++)d+=v[i]*s.v[i];return d;});\n  const T=18,mx=Math.max(...sims),ex=sims.map(s=>Math.exp((s-mx)*T)),tot=ex.reduce((a,b)=>a+b,0),pr=ex.map(e=>e/tot);\n  const bi=sims.indexOf(mx),conf=Math.round(pr[bi]*100),match=Math.round(Math.max(0,mx)*100);\n  const sure=conf>=70&&match>=55;\n  $('guess').innerHTML=`<div class=\"emo\">${sure?SHAPES[bi].e:'🤔'}</div><div class=\"name\">${sure?SHAPES[bi].n:'Có lẽ là '+SHAPES[bi].n+'?'}</div><p class=\"lead\" style=\"margin:2px 0 0\">Giống hình mẫu ${match}% · Máy chắc chắn ${conf}%</p>\n    ${sure?'':'<div class=\"warn\" style=\"text-align:left\">Máy không chắc chắn! Hình này khác các hình mẫu máy đã học.</div>'}`;\n  $('bars').innerHTML=SHAPES.map((s,i)=>{const p=Math.round(pr[i]*100);return`<div class=\"barrow\"><span>${s.e} ${s.n}</span><span class=\"track\"><i class=\"${i===bi?'top':''}\" style=\"width:${p}%\"></i></span><span>${p}%</span></div>`}).join('');}\nfunction setNoise(){const pct=+$('noise').value;$('noiseTxt').textContent=pct+'%';const n=Math.round(N*N*pct/100);const idx=[...Array(N*N).keys()].sort(()=>Math.random()-.5);noiseMask=idx.slice(0,n);render();}\n$('noise').oninput=setNoise;\n$('cover').oninput=()=>{coverRect=+$('cover').value;$('coverTxt').textContent=coverRect?`che ${coverRect} cột`:'không che';render();};\n$('nums').onchange=render;\n$('pix').addEventListener('pointerdown',e=>{const d=e.target.closest('.px');if(!d)return;e.preventDefault();$('pix').setPointerCapture(e.pointerId);const i=+d.dataset.i;drag=base[i]?0:1;base[i]=drag;render();});\n$('pix').addEventListener('pointermove',e=>{if(drag===null)return;const el=document.elementFromPoint(e.clientX,e.clientY);const d=el&&el.closest&&el.closest('.px');if(!d)return;const i=+d.dataset.i;if(base[i]!==drag){base[i]=drag;render();}});\nconst up=()=>drag=null;$('pix').addEventListener('pointerup',up);$('pix').addEventListener('pointercancel',up);\nfunction shift(dx){const nb=new Array(N*N).fill(0);for(let y=0;y<N;y++)for(let x=0;x<N;x++){const nx=x+dx;if(nx>=0&&nx<N)nb[y*N+nx]=base[y*N+x];}base=nb;render();}\n$('shiftL').onclick=()=>shift(-2);$('shiftR').onclick=()=>shift(2);\n$('clear').onclick=()=>{base.fill(0);noiseMask=[];$('noise').value=0;$('noiseTxt').textContent='0%';render();};\n$('shapes').innerHTML=SHAPES.map((s,i)=>`<button class=\"sh\" data-s=\"${i}\">${s.e} ${s.n}</button>`).join('');\n$('shapes').querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{base=SHAPES[+b.dataset.s].g.slice();setNoise();});\nbuild();base=SHAPES[0].g.slice();render();\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --pink:#ec4899;--pink-soft:#fdf2f8;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#f0fdf4;--blue:#1d4ed8;--blue-soft:#eff6ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-weight:900;font-size:1.02rem}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.tab[aria-selected=\"true\"] small{color:#fdf2ff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:2px solid var(--line);border-radius:14px;background:var(--card)}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--pink-soft);color:var(--pink)}\n.tip{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--purple)}\n.warn{border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:var(--pink);margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.pix{display:grid;gap:2px;padding:6px;border-radius:14px;background:#c4b5fd;max-width:440px;margin:0 auto;user-select:none;-webkit-user-select:none;touch-action:none}\n.px{aspect-ratio:1;border-radius:3px;background:#fff;font-size:.55rem;font-weight:900;display:grid;place-items:center;color:#c4b5fd;cursor:pointer}\n.px.on{background:#3b2a5c;color:#fff}\n.px.noise{box-shadow:inset 0 0 0 2px #ec4899}\n.px.cover{background:#94a3b8 !important;color:#94a3b8}\n.shapes{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}\n.sh{border:2px solid var(--line);background:var(--card);border-radius:12px;padding:6px 10px;font-weight:900}\n.guess{text-align:center}\n.guess .emo{font-size:3rem;line-height:1.1}\n.guess .name{font-family:\"Baloo 2\",sans-serif;font-size:1.7rem;font-weight:800;color:var(--purple)}\n.bars{display:grid;gap:6px;margin-top:8px}\n.barrow{display:grid;grid-template-columns:120px 1fr 48px;gap:8px;align-items:center;font-weight:800;font-size:.95rem}\n.track{height:18px;border-radius:99px;background:var(--purple-soft);overflow:hidden}\n.track i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#3b82f6,#22c55e);transition:width .3s}\n.track i.top{background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.toggle{display:flex;align-items:center;gap:8px;font-weight:900;margin-top:10px}\n.toggle input{width:20px;height:20px;accent-color:#8b5cf6}";
  const CLASS1_AI_LAB_THEME = ":root,\n:root[data-theme=\"dark\"]{\n  --bg:#ffffff!important;\n  --card:#ffffff!important;\n  --ink:#344054!important;\n  --muted:#667085!important;\n  --line:#EDE9FE!important;\n  --pink:#EC4899!important;\n  --pink-soft:#FFF1F7!important;\n  --purple:#7C3AED!important;\n  --purple-soft:#F5F3FF!important;\n  --green:#10B981!important;\n  --green-soft:#ECFDF3!important;\n  --blue:#3B82F6!important;\n  --blue-soft:#EFF8FF!important;\n  --red:#E11D48!important;\n  --red-soft:#FFF1F2!important;\n  --paper:#ffffff!important;\n  --c1:#EC4899!important;\n  --c2:#8B5CF6!important;\n  --c3:#3B82F6!important;\n  --c4:#10B981!important;\n}\nhtml,body{background:#fff!important;color:var(--ink)!important}\n.hero{\n  background:linear-gradient(135deg,#FFF7FB 0%,#FAF5FF 52%,#EFF8FF 100%)!important;\n  border:1px solid #E9D5FF!important;\n  box-shadow:0 6px 16px rgba(124,58,237,.08)!important;\n}\n.hero-icon{\n  background:#F5F3FF!important;\n  border:1px solid #DDD6FE!important;\n  box-shadow:0 4px 10px rgba(124,58,237,.07)!important;\n}\n.hero h1{color:#6D28D9!important}\n.card,.step{\n  border-width:1px!important;\n  border-color:#EDE9FE!important;\n  box-shadow:0 5px 14px rgba(76,29,149,.055)!important;\n}\n.card:nth-of-type(3n+1),.step:nth-child(3n+1){background:#FFF9FC!important}\n.card:nth-of-type(3n+2),.step:nth-child(3n+2){background:#FBF9FF!important}\n.card:nth-of-type(3n),.step:nth-child(3n){background:#F8FCFF!important}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.chart,.plane,.rl,.tl,.kidpick button,table.ex button{\n  border-width:1px!important;\n}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.tl,table.ex button,.kidpick button{\n  background:#fff!important;\n}\n.tab[aria-selected=\"true\"],.seg button[aria-pressed=\"true\"]{\n  background:linear-gradient(90deg,#EC4899,#8B5CF6)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n}\n.btn.main{\n  background:linear-gradient(90deg,#EC4899,#A855F7,#7C3AED)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(139,92,246,.16)!important;\n}\n.btn.cool{\n  background:linear-gradient(90deg,#3B82F6,#10B981)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(59,130,246,.13)!important;\n}\n.tip{\n  background:#EFF8FF!important;\n  border:1px solid #BFDBFE!important;\n  color:#344054!important;\n}\n.warn{\n  background:#FFF1F7!important;\n  border:1px solid #FBCFE8!important;\n  color:#BE185D!important;\n}\n.msg{\n  background:#EFF8FF!important;\n  border:1px solid #DBEAFE!important;\n  color:#344054!important;\n}\n.msg.ok{background:#ECFDF3!important;border-color:#BBF7D0!important;color:#047857!important}\n.msg.no{background:#FFF1F7!important;border-color:#FBCFE8!important;color:#BE185D!important}\n.stat,.sc,.rc,.gr,table.ex td{background:#F5F3FF!important}\n.feed,.use{background:#EFF8FF!important}\n.prof span{border:1px solid rgba(148,163,184,.18)!important}\n.it.like,.al.yes,.kidpick button.ok{background:#ECFDF3!important;border-color:#86EFAC!important}\n.it.dis,.al.no,.kidpick button.no{background:#FFF1F7!important;border-color:#F9A8D4!important}\n.snd.on,.sh:focus-visible,.sw[aria-pressed=\"true\"]{border-color:#C4B5FD!important}\n.track{background:#F5F3FF!important}\ninput[type=\"range\"]{accent-color:#8B5CF6}\n@media (max-width:640px){\n  .wrap{padding-left:10px;padding-right:10px}\n}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">👁️</div>\n    <div>\n      <h1>AI nhìn bằng pixel <span class=\"ai\">✨ AI</span></h1>\n      <p>Phóng to một bức hình thành từng ô vuông nhỏ để xem máy \"nhìn\" như thế nào. Thử thêm nhiễu, che bớt hoặc dịch hình để xem máy còn nhận ra không.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <section class=\"card\">\n      <h2>🔲 Bức hình 16 × 16 ô</h2>\n      <p class=\"lead\">Với máy tính, một bức hình chỉ là rất nhiều ô vuông nhỏ gọi là <b>pixel</b>. Bấm hoặc kéo trên lưới để tô, xóa từng pixel.</p>\n      <div class=\"shapes\" id=\"shapes\"></div>\n      <div class=\"pix\" id=\"pix\"></div>\n      <label class=\"toggle\"><input type=\"checkbox\" id=\"nums\"> 🔢 Xem bức hình dưới dạng con số (như máy nhìn thấy)</label>\n      <label class=\"slider\">🌫️ Thêm nhiễu <input type=\"range\" id=\"noise\" min=\"0\" max=\"40\" value=\"0\"><small id=\"noiseTxt\">0%</small></label>\n      <label class=\"slider\">🙈 Che bớt <input type=\"range\" id=\"cover\" min=\"0\" max=\"10\" value=\"0\"><small id=\"coverTxt\">không che</small></label>\n      <div class=\"row\"><button class=\"btn\" id=\"shiftL\">⬅️ Dịch trái</button><button class=\"btn\" id=\"shiftR\">Dịch phải ➡️</button><button class=\"btn\" id=\"clear\">🧽 Xóa hết</button></div>\n    </section>\n    <section>\n      <div class=\"card guess\" aria-live=\"polite\">\n        <h2>🤖 Máy nhìn thấy gì?</h2>\n        <div id=\"guess\"></div>\n        <div class=\"bars\" id=\"bars\" style=\"text-align:left\"></div>\n      </div>\n      <div class=\"tip\"><b>Máy nhìn khác con người!</b> Con nhìn là biết ngay hình gì. Còn máy chỉ thấy một bảng số: ô tô màu là 1, ô trắng là 0. Máy so bảng số đó với các hình mẫu đã học, xem giống hình nào nhất. Khi hình bị nhiễu, bị che hay bị dịch đi, bảng số thay đổi nhiều nên máy dễ nhầm, dù con vẫn nhận ra dễ dàng.</div>\n    </section>\n  </div>\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Hình thành con số</b>Mỗi pixel là một con số. Hình 16 × 16 có 256 con số.</div>\n    <div class=\"step\"><b>2. So sánh</b>Máy đặt bảng số chồng lên từng hình mẫu đã học, đếm xem trùng khớp bao nhiêu.</div>\n    <div class=\"step\"><b>3. Độ tin cậy</b>Càng giống hình mẫu, máy càng chắc chắn. Hình lạ thì máy kém chắc chắn hơn, và AI tốt phải biết nói \"tôi không chắc\".</div>\n  </div>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="AI nhìn bằng pixel" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
