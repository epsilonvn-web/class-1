/* Epsilon Edu - Thỏ Hồng tự học tìm đường
 * Module lazy-load cho AI Lab (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiBunnyLearns";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;speechSynthesis.speak(u)}catch(e){}}\n\nconst MAPS=[\n {n:'🌱 Dễ',m:['S......','.TTT.T.','...T...','.T.T.T.','.T...T.','.TTTTT.','......C']},\n {n:'🌿 Vừa',m:['S..T...','.T.T.T.','.T...T.','.TTMTT.','...M...','TTT.TT.','C......']},\n {n:'🌳 Khó',m:['S.T....','..T.TT.','T...T..','..TTT.T','.T...M.','.T.T.TT','...T..C']}];\nconst DX=[0,1,0,-1],DY=[-1,0,1,0],ARR=['↑','→','↓','←'];\nlet mi=0,grid,W,H,start,goal,Q,episodes=0,history=[],busy=false,pos;\nconst ALPHA=.5,GAMMA=.92;\nfunction load(i){mi=i;grid=MAPS[i].m.map(r=>[...r]);H=grid.length;W=grid[0].length;\n  grid.forEach((r,y)=>r.forEach((c,x)=>{if(c==='S'){start=[x,y];grid[y][x]='.';}if(c==='C')goal=[x,y];}));forget();\n  $('maps').innerHTML=MAPS.map((m,k)=>`<button class=\"chip\" data-m=\"${k}\" aria-pressed=\"${k===mi}\">${m.n}</button>`).join('');\n  $('maps').querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{if(!busy)load(+b.dataset.m)});}\nfunction forget(){Q=Array.from({length:W*H},()=>[0,0,0,0]);episodes=0;history=[];pos=[...start];visited=new Set();\n  $('sEp').textContent='0';$('sSteps').textContent='–';$('sBest').textContent=bfs()??'Không có';render();chart();\n  msg('Thỏ Hồng chưa biết gì về khu vườn. Bấm \"Cho Thỏ tập 1 lượt\" để xem Thỏ đi thử nhé!');}\nfunction bfs(){const q=[[...start,0]],seen=new Set([start+'']);while(q.length){const[x,y,d]=q.shift();if(x===goal[0]&&y===goal[1])return d;\n  for(let a=0;a<4;a++){const nx=x+DX[a],ny=y+DY[a];if(nx<0||ny<0||nx>=W||ny>=H||grid[ny][nx]==='T'||seen.has([nx,ny]+''))continue;seen.add([nx,ny]+'');q.push([nx,ny,d+1]);}}return null;}\nfunction step(x,y,a){const nx=x+DX[a],ny=y+DY[a];\n  if(nx<0||ny<0||nx>=W||ny>=H||grid[ny][nx]==='T')return{x,y,r:-1,done:false,bump:true};\n  if(nx===goal[0]&&ny===goal[1])return{x:nx,y:ny,r:10,done:true};\n  return{x:nx,y:ny,r:grid[ny][nx]==='M'?-3:-.1,done:false};}\nconst idx=(x,y)=>y*W+x;\nfunction choose(x,y,eps){if(Math.random()<eps)return Math.floor(Math.random()*4);const q=Q[idx(x,y)],m=Math.max(...q);const best=[0,1,2,3].filter(a=>q[a]===m);return best[Math.floor(Math.random()*best.length)];}\nfunction learn(x,y,a,res){const qi=Q[idx(x,y)],next=res.done?0:Math.max(...Q[idx(res.x,res.y)]);qi[a]+=ALPHA*(res.r+GAMMA*next-qi[a]);}\nconst epsVal=()=>+$('eps').value/100;\nlet visited=new Set();\n/* ---------- vẽ ---------- */\nfunction render(){const b=$('board');b.style.gridTemplateColumns=`repeat(${W},1fr)`;const showB=$('brain').checked;\n  let maxV=.01;Q.forEach(q=>maxV=Math.max(maxV,Math.max(...q)));let h='';\n  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const c=grid[y][x],q=Q[idx(x,y)],v=Math.max(...q),known=q.some(t=>t!==0);\n    let inner='';if(c==='T')inner='<span class=\"em\">🌳</span>';else if(c==='C')inner='<span class=\"em\">🥕</span>';else if(c==='M')inner='<span class=\"em\">🟫</span>';\n    if(showB&&c!=='T'&&c!=='C'&&known){const t=Math.max(0,Math.min(1,v/maxV));inner=`<span class=\"heat\" style=\"background:rgba(${Math.round(250-t*120)},${Math.round(200+t*30)},${Math.round(120+t*60)},${.25+t*.55})\"></span>`+inner+`<span class=\"arr\">${ARR[q.indexOf(v)]}</span>`;}\n    h+=`<div class=\"cell ${c==='T'?'tree':c==='M'?'mud':''} ${visited.has(x+','+y)?'visit':''}\" data-x=\"${x}\" data-y=\"${y}\">${inner}</div>`;}\n  h+=`<div class=\"bunny\" id=\"bunny\">🐰</div>`;b.innerHTML=h;placeBunny();\n  b.querySelectorAll('.cell').forEach(c=>c.onclick=()=>editCell(+c.dataset.x,+c.dataset.y));}\nfunction placeBunny(){const b=$('board'),c=b.querySelector('.cell');if(!c)return;const w=c.offsetWidth,bn=$('bunny');bn.style.width=bn.style.height=w+'px';bn.style.left=(8+pos[0]*(w+4))+'px';bn.style.top=(8+pos[1]*(w+4))+'px';}\nwindow.addEventListener('resize',placeBunny);\nfunction chart(){const s=$('chart'),last=history.slice(-40);if(!last.length){s.innerHTML='<text x=\"200\" y=\"80\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"800\" fill=\"#8b7fa8\">Chưa có lượt tập nào</text>';return;}\n  const mx=Math.max(...last,10),bw=400/40;let h='';const best=bfs();\n  last.forEach((v,i)=>{const hh=(v/mx)*130;h+=`<rect x=\"${i*bw+1}\" y=\"${145-hh}\" width=\"${bw-2}\" height=\"${hh}\" rx=\"2\" fill=\"${v<=best*1.3?'#22c55e':v<=best*3?'#a78bfa':'#f9a8d4'}\"/>`;});\n  if(best){const y=145-(best/mx)*130;h+=`<line x1=\"0\" x2=\"400\" y1=\"${y}\" y2=\"${y}\" stroke=\"#16a34a\" stroke-dasharray=\"4 3\"/>`;}s.innerHTML=h;}\nfunction msg(t,c){const m=$('msg');m.className='msg'+(c?' '+c:'');m.textContent=t;}\nfunction editCell(x,y){if(busy)return;if((x===start[0]&&y===start[1])||(x===goal[0]&&y===goal[1]))return;const c=grid[y][x];grid[y][x]=c==='.'?'T':c==='T'?'M':'.';\n  if(bfs()==null){grid[y][x]=c;msg('Không đặt được: như vậy sẽ chắn hết đường tới cà rốt.','no');return;}forget();msg('Khu vườn đã thay đổi. Thỏ Hồng quên hết và phải học lại từ đầu.');}\n/* ---------- huấn luyện ---------- */\nconst wait=ms=>new Promise(r=>setTimeout(r,ms));\nfunction runEpisode(eps){let x=start[0],y=start[1],n=0,total=0;while(n<300){const a=choose(x,y,eps),r=step(x,y,a);learn(x,y,a,r);total+=r.r;n++;x=r.x;y=r.y;if(r.done)break;}return{n,total,reached:x===goal[0]&&y===goal[1]};}\nasync function animEpisode(eps,learnIt,label){busy=true;setBusy(true);pos=[...start];visited=new Set([start+'']);render();let n=0,bumps=0,muds=0;const delay=learnIt?(episodes<3?70:110):180;\n  while(n<300){const[x,y]=pos;const a=learnIt?choose(x,y,eps):choose(x,y,0),r=step(x,y,a);if(learnIt)learn(x,y,a,r);n++;if(r.bump)bumps++;if(grid[r.y][r.x]==='M')muds++;\n    pos=[r.x,r.y];visited.add(pos+'');if(n%3===0||r.done||!learnIt)render();else placeBunny();await wait(delay);if(r.done)break;\n    if(!learnIt&&n>W*H){busy=false;setBusy(false);return{n,fail:true};}}\n  busy=false;setBusy(false);return{n,bumps,muds,reached:pos[0]===goal[0]&&pos[1]===goal[1]};}\nfunction setBusy(b){['one','many','test','forget'].forEach(id=>$(id).disabled=b);}\n$('one').onclick=async()=>{msg('Thỏ Hồng đang đi thử...');const r=await animEpisode(epsVal(),true);episodes++;history.push(r.n);update(r.n);\n  msg(r.reached?`Lượt ${episodes}: Thỏ tìm thấy cà rốt sau ${r.n} bước (va bụi cây ${r.bumps} lần, lội bùn ${r.muds} lần). Thỏ đã ghi nhớ thêm!`:'Lượt này Thỏ đi lạc quá lâu nên dừng lại. Tập thêm nhé!',r.reached?'ok':'no');};\n$('many').onclick=async()=>{setBusy(true);for(let i=0;i<30;i++){const r=runEpisode(epsVal());episodes++;history.push(r.n);if(i%5===4){update(r.n);await wait(30);}}\n  setBusy(false);pos=[...start];visited=new Set();update(history[history.length-1]);msg(`Thỏ đã tập thêm 30 lượt. Nhìn biểu đồ xem số bước có giảm không nhé!`,'ok');};\n$('test').onclick=async()=>{msg('Thỏ Hồng thử tài: lần này không tò mò, chỉ đi theo trí nhớ...');const r=await animEpisode(0,false);const best=bfs();\n  if(r.fail||!r.reached){msg('Thỏ đi lòng vòng mà chưa tìm ra cà rốt. Thỏ cần tập thêm!','no');speak('Thỏ cần tập thêm.');}\n  else if(r.n===best){msg(`🎉 Tuyệt vời! Thỏ tìm đúng đường ngắn nhất: ${r.n} bước. Thỏ Hồng đã tự học được!`,'ok');speak('Tuyệt vời! Thỏ Hồng đã tự học được đường ngắn nhất.');}\n  else{msg(`Thỏ tới được cà rốt sau ${r.n} bước, nhưng đường ngắn nhất chỉ ${best} bước. Tập thêm để Thỏ giỏi hơn!`,'no');}};\n$('forget').onclick=()=>{if(!busy)forget();};\nfunction update(n){$('sEp').textContent=episodes;$('sSteps').textContent=n;render();chart();}\nfunction epsTxt(){const v=+$('eps').value;$('epsTxt').textContent=v===0?'Không tò mò':v<15?'Ít tò mò':v<35?'Vừa phải':'Rất tò mò';}\n$('eps').oninput=epsTxt;$('brain').onchange=render;\nepsTxt();load(0);\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;--red:#e11d48;--red-soft:#fff1f2;--orange:#c2410c;--orange-soft:#fff7ed;--blue-soft:#eff6ff;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--red:#ff7482;--red-soft:#4a2228;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--red:#ff7482;--red-soft:#4a2228;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.ai{display:inline-flex;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.maps{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}\n.chip{border:2px solid var(--line);background:var(--card);border-radius:14px;padding:7px 12px;font-weight:900}\n.chip[aria-pressed=\"true\"]{border-color:var(--purple);background:var(--purple-soft);color:var(--purple)}\n.board{position:relative;display:grid;gap:4px;padding:8px;border-radius:18px;background:#a7d98f;max-width:470px;margin:0 auto;user-select:none}\n.cell{position:relative;aspect-ratio:1;border-radius:9px;display:grid;place-items:center;font-size:clamp(1.1rem,4.4vw,1.8rem);cursor:pointer;background:#fff8e1;overflow:hidden}\n.cell.tree{background:#c8edb5}\n.cell.mud{background:#d6b38a}\n.cell .heat{position:absolute;inset:0;pointer-events:none}\n.cell .arr{position:absolute;font-size:.9em;font-weight:900;color:#5b21b6;opacity:.85;pointer-events:none}\n.cell .em{position:relative;z-index:2;pointer-events:none}\n.cell.visit{box-shadow:inset 0 0 0 3px #f9a8d4}\n.bunny{position:absolute;display:grid;place-items:center;font-size:clamp(1.4rem,5.4vw,2.2rem);transition:left .06s linear,top .06s linear;pointer-events:none;z-index:3}\n.legend{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:10px;font-weight:800;font-size:.9rem;color:var(--muted)}\n.btn{min-height:46px;padding:0 14px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.green{border-color:transparent;color:#fff;background:var(--green)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:12px 0 4px}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:90px}\n.toggle{display:flex;align-items:center;gap:8px;font-weight:900;margin-top:10px}\n.toggle input{width:20px;height:20px;accent-color:#8b5cf6}\n.msg{min-height:2.8em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--orange-soft);color:var(--orange)}\n.statrow{display:flex;gap:10px;flex-wrap:wrap}\n.stat{flex:1;min-width:110px;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;color:var(--purple)}\nsvg.chart{display:block;width:100%;height:150px;margin-top:10px;border-radius:12px;background:var(--purple-soft)}\n.rules{display:grid;gap:6px;margin:0;padding:0;list-style:none}\n.rules li{padding:8px 12px;border-radius:12px;background:var(--purple-soft);font-weight:800}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}";
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
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🐰</div>\n    <div>\n      <h1>Thỏ Hồng tự học tìm đường <span class=\"ai\">✨ AI</span></h1>\n      <p>Không ai chỉ đường cho Thỏ Hồng cả! Thỏ tự đi thử, được thưởng khi tìm thấy cà rốt và bị phạt khi đi sai, rồi dần dần tự khôn ra. Đây là cách AI học bằng thử và sai.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <section class=\"card\">\n      <h2>Khu vườn</h2>\n      <div class=\"maps\" id=\"maps\"></div>\n      <div class=\"board\" id=\"board\"></div>\n      <div class=\"legend\"><span>🌳 Bụi cây: đi vào bị phạt</span><span>🟫 Vũng bùn: đi được nhưng bị phạt</span><span>🥕 Cà rốt: được thưởng lớn</span></div>\n      <p class=\"lead\" style=\"margin:8px 0 0;text-align:center\">Mẹo: bấm vào ô trống để đặt bụi cây hoặc vũng bùn. Đổi bản đồ thì Thỏ phải học lại từ đầu.</p>\n      <label class=\"toggle\"><input type=\"checkbox\" id=\"brain\" checked> 🧠 Xem trí nhớ của Thỏ (mũi tên là hướng Thỏ nghĩ là tốt nhất)</label>\n    </section>\n\n    <section>\n      <div class=\"card\">\n        <h2>Huấn luyện</h2>\n        <div class=\"row\">\n          <button class=\"btn main\" id=\"one\">▶ Cho Thỏ tập 1 lượt</button>\n          <button class=\"btn\" id=\"many\">⏩ Tập nhanh 30 lượt</button>\n          <button class=\"btn green\" id=\"test\">🏁 Thử tài Thỏ</button>\n          <button class=\"btn\" id=\"forget\">🧽 Quên hết</button>\n        </div>\n        <label class=\"slider\">🔎 Độ tò mò <input type=\"range\" id=\"eps\" min=\"0\" max=\"60\" value=\"20\"><small id=\"epsTxt\"></small></label>\n        <div class=\"msg\" id=\"msg\" aria-live=\"polite\"></div>\n        <div class=\"statrow\" style=\"margin-top:10px\">\n          <div class=\"stat\">Số lượt đã tập<b id=\"sEp\">0</b></div>\n          <div class=\"stat\">Số bước lượt vừa rồi<b id=\"sSteps\">–</b></div>\n          <div class=\"stat\">Đường ngắn nhất<b id=\"sBest\">–</b></div>\n        </div>\n        <svg class=\"chart\" id=\"chart\" viewBox=\"0 0 400 150\" preserveAspectRatio=\"none\" aria-label=\"Số bước mỗi lượt\"></svg>\n        <p class=\"lead\" style=\"margin:6px 0 0;font-size:.9rem\">Biểu đồ: số bước Thỏ cần để tới cà rốt ở mỗi lượt. Cột càng thấp nghĩa là Thỏ càng khôn.</p>\n      </div>\n      <div class=\"card\">\n        <h2>Luật thưởng phạt</h2>\n        <ul class=\"rules\"><li>🥕 Tìm thấy cà rốt: +10 điểm</li><li>🌳 Va vào bụi cây hoặc ra ngoài vườn: −1 điểm</li><li>🟫 Lội vào vũng bùn: −3 điểm</li><li>👣 Mỗi bước đi: −0,1 điểm (để Thỏ thích đường ngắn)</li></ul>\n      </div>\n    </section>\n  </div>\n\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Thử</b>Lúc đầu Thỏ chưa biết gì nên đi lung tung, va bụi cây, lội bùn.</div>\n    <div class=\"step\"><b>2. Ghi nhớ</b>Sau mỗi bước, Thỏ nhớ lại: đi hướng này ở ô này được thưởng hay bị phạt. Điểm thưởng ở cà rốt lan dần ngược về các ô trước đó.</div>\n    <div class=\"step\"><b>3. Khôn dần</b>Sau nhiều lượt, Thỏ biết ô nào đi hướng nào thì tốt nhất. Độ tò mò giúp Thỏ thỉnh thoảng thử đường mới.</div>\n  </div>\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Thỏ Hồng tự học tìm đường" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
