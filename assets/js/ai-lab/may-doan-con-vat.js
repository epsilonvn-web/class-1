/* Epsilon Edu - Máy đoán con vật
 * Module lazy-load cho AI Lab (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiAnimalGuess";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;speechSynthesis.speak(u)}catch(e){}}\nconst esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));\n\nconst EMO={'mèo':'🐱','chó':'🐶','gà':'🐔','vịt':'🦆','lợn':'🐷','heo':'🐷','bò':'🐮','trâu':'🐃','ngựa':'🐴','dê':'🐐','cừu':'🐑','thỏ':'🐰','chuột':'🐭','hổ':'🐯','cọp':'🐯','sư tử':'🦁','voi':'🐘','khỉ':'🐵','gấu':'🐻','hươu cao cổ':'🦒','ngựa vằn':'🦓','cá voi':'🐋','cá heo':'🐬','cá mập':'🦈','cá':'🐟','ếch':'🐸','rùa':'🐢','rắn':'🐍','cá sấu':'🐊','chim cánh cụt':'🐧','chim':'🐦','đại bàng':'🦅','cú':'🦉','vẹt':'🦜','công':'🦚','bướm':'🦋','ong':'🐝','kiến':'🐜','muỗi':'🦟','nhện':'🕷️','bạch tuộc':'🐙','cua':'🦀','tôm':'🦐','ốc sên':'🐌','sóc':'🐿️','dơi':'🦇','cáo':'🦊','sói':'🐺','gấu trúc':'🐼','lạc đà':'🐫','tê giác':'🦏','hà mã':'🦛','chuột túi':'🦘','sứa':'🪼','khủng long':'🦖','gà tây':'🦃','thiên nga':'🦢','hồng hạc':'🦩'};\nfunction emojiOf(name){const n=name.toLowerCase().replace(/^con\\s+/,'').trim();let best='',e='🐾';for(const k in EMO)if((n===k||n.startsWith(k+' ')||n.endsWith(' '+k)||n.includes(k))&&k.length>best.length){best=k;e=EMO[k];}return e;}\nconst A=(n)=>({a:n.startsWith('con ')?n:'con '+n,e:emojiOf(n)});\nconst Qn=(q,yes,no)=>({q,yes,no});\nlet tree=Qn('Con vật đó sống dưới nước phải không?',\n  Qn('Nó có chân không?',A('ếch'),Qn('Nó to hơn con người không?',A('cá voi'),A('cá'))),\n  Qn('Nó bay được không?',Qn('Nó có 6 chân (là côn trùng) phải không?',A('bướm'),A('chim')),\n    Qn('Nó là vật nuôi trong nhà phải không?',Qn('Nó kêu meo meo phải không?',A('mèo'),A('chó')),Qn('Nó có vòi dài không?',A('voi'),A('hổ')))));\nlet node,path=[],parentRef=null,win=0,lose=0,state='start';\nconst count=t=>t.q?count(t.yes)+count(t.no):1;\n\nfunction start(){state='start';node=tree;path=[];parentRef=null;render();}\nfunction render(){const s=$('stage');$('sWin').textContent=win;$('sLose').textContent=lose;$('sKnow').textContent=count(tree)+' con';\n  if(state==='start'){s.innerHTML=`<div class=\"emo\">🤔</div><p class=\"q\">Con hãy nghĩ trong đầu một con vật, đừng nói ra nhé!</p><p class=\"lead\">Máy sẽ hỏi vài câu để đoán xem đó là con gì.</p><div class=\"row\"><button class=\"btn main\" id=\"go\">Con nghĩ xong rồi! 👍</button></div>`;$('go').onclick=()=>{state='ask';render();};}\n  else if(state==='ask'){if(!node.q){state='guess';return render();}\n    s.innerHTML=`<div class=\"emo\">🤖</div><p class=\"q\">${esc(node.q)}</p><div class=\"yn\"><button class=\"big y\" id=\"y\">✅ Có</button><button class=\"big n\" id=\"n\">❌ Không</button></div>`;\n    $('y').onclick=()=>answer(true);$('n').onclick=()=>answer(false);speak(node.q);}\n  else if(state==='guess'){s.innerHTML=`<div class=\"emo\">${node.e}</div><p class=\"q\">Có phải ${esc(node.a)} không?</p><div class=\"yn\"><button class=\"big y\" id=\"y\">✅ Đúng rồi</button><button class=\"big n\" id=\"n\">❌ Sai rồi</button></div>`;\n    $('y').onclick=()=>{win++;state='won';render();};$('n').onclick=()=>{lose++;state='teach';render();};speak('Có phải '+node.a+' không?');}\n  else if(state==='won'){s.innerHTML=`<div class=\"emo\">🎉</div><p class=\"q\">Máy đoán đúng rồi!</p><p class=\"lead\">Máy chỉ cần ${path.length} câu hỏi để đoán ra ${esc(node.a)}.</p><div class=\"row\"><button class=\"btn main\" id=\"again\">Chơi tiếp</button></div>`;$('again').onclick=start;speak('Máy đoán đúng rồi!');}\n  else if(state==='teach'){const old=node;\n    s.innerHTML=`<div class=\"emo\">🙈</div><p class=\"q\">Máy đoán sai rồi! Con dạy máy nhé.</p>\n      <div class=\"form\"><label>Con vật con nghĩ là gì?<input id=\"tName\" maxlength=\"24\" placeholder=\"Ví dụ: con thỏ\"></label>\n      <label>Viết một câu hỏi để phân biệt nó với ${esc(old.a)}<input id=\"tQ\" maxlength=\"60\" placeholder=\"Ví dụ: Nó có tai dài không?\"></label>\n      <div class=\"sugs\" id=\"sugs\"></div>\n      <div><span style=\"font-weight:800;color:var(--muted)\">Với con vật của con, câu trả lời là:</span><div class=\"seg\" style=\"margin-top:6px\"><button id=\"aY\" aria-pressed=\"true\">✅ Có</button><button id=\"aN\" aria-pressed=\"false\">❌ Không</button></div></div>\n      <p class=\"err\" id=\"tErr\"></p><div class=\"row\" style=\"justify-content:flex-start\"><button class=\"btn main\" id=\"learn\">🧠 Dạy máy</button><button class=\"btn\" id=\"skip\">Bỏ qua</button></div></div>`;\n    let ans=true;$('aY').onclick=()=>{ans=true;$('aY').setAttribute('aria-pressed','true');$('aN').setAttribute('aria-pressed','false');};\n    $('aN').onclick=()=>{ans=false;$('aN').setAttribute('aria-pressed','true');$('aY').setAttribute('aria-pressed','false');};\n    const S=['có sừng','có tai dài','có sọc','có mai','đẻ trứng','ăn cỏ','biết bơi','có cánh','có lông','sống trong rừng','to hơn con người','nhảy giỏi'];\n    $('sugs').innerHTML=S.map(x=>`<button class=\"sug\">${x}</button>`).join('');$('sugs').querySelectorAll('.sug').forEach(b=>b.onclick=()=>{$('tQ').value='Nó '+b.textContent+' không?';});\n    $('skip').onclick=start;\n    $('learn').onclick=()=>{let nm=$('tName').value.trim(),q=$('tQ').value.trim();const err=$('tErr');\n      if(!nm){err.textContent='Con hãy viết tên con vật.';return;}if(!q){err.textContent='Con hãy viết câu hỏi để máy phân biệt.';return;}\n      if(!/[?？]$/.test(q))q+='?';q=q[0].toUpperCase()+q.slice(1);\n      const neu=A(nm.toLowerCase());if(neu.a===old.a){err.textContent='Đó chính là con máy vừa đoán mà!';return;}\n      const replacement=ans?Qn(q,neu,old):Qn(q,old,neu);\n      if(!parentRef)tree=replacement;else parentRef.p[parentRef.k]=replacement;\n      state='learned';learnedMsg=`Cảm ơn con! Máy đã học thêm ${neu.e} ${neu.a} và câu hỏi \"${q}\". Bây giờ máy biết ${count(tree)} con vật.`;render();speak('Cảm ơn con! Máy đã học thêm '+neu.a);};}\n  else if(state==='learned'){s.innerHTML=`<div class=\"emo\">🧠</div><p class=\"q\">Máy đã khôn hơn!</p><p class=\"lead\">${esc(learnedMsg)}</p><div class=\"row\"><button class=\"btn main\" id=\"again\">Chơi tiếp</button></div>`;$('again').onclick=start;}\n  drawTree();}\nlet learnedMsg='';\nfunction answer(yes){path.push({n:node,yes});parentRef={p:node,k:yes?'yes':'no'};node=yes?node.yes:node.no;render();}\n\n/* ---------- vẽ cây ---------- */\nfunction drawTree(){const leafW=96,levH=92;let leaves=0;const pos=new Map();let maxD=0;\n  (function lay(t,d){maxD=Math.max(maxD,d);if(!t.q){pos.set(t,{x:leaves*leafW+leafW/2,y:d*levH+40});leaves++;return;}lay(t.yes,d+1);lay(t.no,d+1);\n    pos.set(t,{x:(pos.get(t.yes).x+pos.get(t.no).x)/2,y:d*levH+40});})(tree,0);\n  const W=Math.max(520,leaves*leafW),H=(maxD+1)*levH+30;const onPath=new Set(path.map(p=>p.n));if(state!=='start')onPath.add(node);\n  let h='';const edge=(a,b,lab,hot)=>{const p=pos.get(a),q=pos.get(b);h+=`<line x1=\"${p.x}\" y1=\"${p.y+16}\" x2=\"${q.x}\" y2=\"${q.y-18}\" stroke=\"${hot?'#ec4899':'#c4b5fd'}\" stroke-width=\"${hot?4:2}\"/>\n    <text x=\"${(p.x+q.x)/2+(lab==='Có'?-12:12)}\" y=\"${(p.y+q.y)/2}\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"900\" fill=\"${lab==='Có'?'#16a34a':'#e11d48'}\">${lab}</text>`;};\n  (function walk(t){if(!t.q)return;edge(t,t.yes,'Có',onPath.has(t)&&onPath.has(t.yes));edge(t,t.no,'Không',onPath.has(t)&&onPath.has(t.no));walk(t.yes);walk(t.no);})(tree);\n  for(const[t,p]of pos){const hot=onPath.has(t);\n    if(t.q){const lines=wrap(t.q,16);const bh=lines.length*14+12;h+=`<rect x=\"${p.x-74}\" y=\"${p.y-bh/2}\" width=\"148\" height=\"${bh}\" rx=\"10\" fill=\"${hot?'#fce7f3':'#f5f3ff'}\" stroke=\"${hot?'#ec4899':'#c4b5fd'}\" stroke-width=\"2\"/>`;\n      lines.forEach((l,i)=>h+=`<text x=\"${p.x}\" y=\"${p.y-bh/2+18+i*14}\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"800\" fill=\"#3b2a5c\">${esc(l)}</text>`);}\n    else h+=`<text x=\"${p.x}\" y=\"${p.y+4}\" text-anchor=\"middle\" font-size=\"28\">${t.e}</text><text x=\"${p.x}\" y=\"${p.y+26}\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"800\" fill=\"${hot?'#ec4899':'var(--ink)'}\">${esc(t.a.replace(/^con /,''))}</text>`;}\n  const svg=$('tree');svg.setAttribute('width',W);svg.setAttribute('height',H);svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.innerHTML=h;\n  const cur=pos.get(state==='start'?tree:node),box=svg.parentElement;if(cur&&box.clientWidth)box.scrollLeft=Math.max(0,cur.x-box.clientWidth/2);}\nfunction wrap(s,n){const w=s.split(' '),out=[];let cur='';for(const x of w){if((cur+' '+x).trim().length>n&&cur){out.push(cur);cur=x;}else cur=(cur+' '+x).trim();}if(cur)out.push(cur);return out.slice(0,4);}\nstart();\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;--red:#e11d48;--red-soft:#fff1f2;--orange:#c2410c;--orange-soft:#fff7ed;--blue-soft:#eff6ff;--paper:#fff;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--red:#ff7482;--red-soft:#4a2228;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;--paper:#231c3a;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--red:#ff7482;--red-soft:#4a2228;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;--paper:#231c3a;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.ai{display:inline-flex;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.stage{text-align:center;padding:10px 4px}\n.stage .emo{font-size:4rem;line-height:1.1}\n.stage .q{font-family:\"Baloo 2\",sans-serif;font-size:clamp(1.4rem,3.4vw,1.9rem);font-weight:800;margin:10px 0}\n.yn{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}\n.big{min-height:64px;border-radius:16px;border:none;font-weight:900;font-size:1.15rem;color:#fff}\n.big.y{background:#16a34a}.big.n{background:#e11d48}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center}\n.form{display:grid;gap:10px;text-align:left;margin-top:8px}\n.form label{display:flex;flex-direction:column;gap:4px;font-weight:800;color:var(--muted)}\n.form input{min-height:48px;border:2px solid var(--line);border-radius:12px;padding:0 12px;background:var(--card);font-weight:800;font-size:1.05rem}\n.sugs{display:flex;flex-wrap:wrap;gap:6px}\n.sug{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:3px 10px;font-weight:800;font-size:.88rem}\n.seg{display:inline-flex;gap:6px}\n.seg button{min-height:44px;padding:0 16px;border:2px solid var(--line);border-radius:12px;background:var(--card);font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:var(--purple);border-color:var(--purple);color:#fff}\n.err{color:var(--red);font-weight:800;min-height:1.3em;margin:0}\n.score{display:flex;gap:10px;justify-content:center;margin-top:12px}\n.sc{border-radius:14px;padding:8px 14px;background:var(--purple-soft);font-weight:800;text-align:center}\n.sc b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;color:var(--purple)}\n.treebox{overflow:auto;max-height:620px;border-radius:16px;background:var(--paper);border:2px solid var(--line)}\nsvg.tree{display:block}\n.tip{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--purple)}\n.hidden{display:none !important}";
  const CLASS1_AI_LAB_THEME = `
:root{
  --bg:#ffffff !important;
  --card:#ffffff !important;
  --ink:#344054 !important;
  --muted:#667085 !important;
  --line:#E9D5FF !important;
  --purple:#7C3AED !important;
  --purple-soft:#F5F3FF !important;
  --pink:#EC4899 !important;
  --pink-soft:#FFF1F7 !important;
  --green:#059669 !important;
  --green-soft:#ECFDF5 !important;
  --blue:#2563EB !important;
  --blue-soft:#EFF8FF !important;
  --orange:#C2410C !important;
  --orange-soft:#FFF7ED !important;
  --red:#E11D48 !important;
  --red-soft:#FFF1F2 !important;
  --paper:#ffffff !important;
}
html,body{background:#ffffff !important;color:#344054 !important;}
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
.card,.kind,.rule,.qopt,.treebox,.seg,.form input,.sug,.btn,.cell{
  border-width:1px !important;
}
.card{
  background:#ffffff !important;
  border-color:#E9D5FF !important;
  box-shadow:0 4px 12px rgba(15,23,42,.045) !important;
}
.btn:not(.main),.sug,.seg,.seg button,.form input,.qopt,.rule,.kind{
  background:#ffffff !important;
  border-color:#E9D5FF !important;
}
.btn.main,.tab[aria-selected="true"]{
  color:#ffffff !important;
  border-color:transparent !important;
  background:linear-gradient(90deg,#EC4899,#8B5CF6) !important;
}
.tab{
  border-width:1px !important;
  border-color:#E9D5FF !important;
  background:#ffffff !important;
}
.seg button[aria-pressed="true"]{
  color:#ffffff !important;
  background:linear-gradient(90deg,#8B5CF6,#7C3AED) !important;
}
.sc,.steps li,.ex{background:#F5F3FF !important;}
.counter,.tip,.fb{background:#EFF8FF !important;}
.parent{background:linear-gradient(135deg,#EFF8FF,#F5F3FF) !important;}
.treebox{background:#ffffff !important;border-color:#E9D5FF !important;}
.board{background:linear-gradient(135deg,#F9A8D4,#C4B5FD,#93C5FD) !important;}
.cell{background:#ffffff !important;color:#344054 !important;}
.cell.x{color:#EC4899 !important;}.cell.o{color:#2563EB !important;}
.rule:nth-child(6n+1){background:#FFF1F7 !important;}
.rule:nth-child(6n+2){background:#EFF8FF !important;}
.rule:nth-child(6n+3){background:#ECFDF5 !important;}
.rule:nth-child(6n+4){background:#FFF7ED !important;}
.rule:nth-child(6n+5){background:#F5F3FF !important;}
.rule:nth-child(6n){background:#FFFBEB !important;}
button:focus-visible,input:focus-visible{outline-color:#8B5CF6 !important;}
`;
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🐾</div>\n    <div>\n      <h1>Máy đoán con vật <span class=\"ai\">✨ AI</span></h1>\n      <p>Con nghĩ trong đầu một con vật, máy sẽ hỏi để đoán. Nếu máy đoán sai, con dạy máy, và máy sẽ nhớ để lần sau đoán giỏi hơn.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <div>\n      <section class=\"card\"><div class=\"stage\" id=\"stage\" aria-live=\"polite\"></div></section>\n      <div class=\"score\"><div class=\"sc\">Máy đoán đúng<b id=\"sWin\">0</b></div><div class=\"sc\">Con thắng máy<b id=\"sLose\">0</b></div><div class=\"sc\">Máy biết<b id=\"sKnow\">0</b></div></div>\n      <div class=\"tip\"><b>Máy học như thế nào?</b> Máy lưu kiến thức thành một <b>cây câu hỏi</b>. Mỗi câu hỏi chia các con vật thành hai nhánh Có và Không. Khi đoán sai, máy thêm một câu hỏi mới để phân biệt, nên cây cứ lớn dần. Nhiều AI thật cũng ra quyết định theo cách này!</div>\n    </div>\n    <section class=\"card\">\n      <h2>🌳 Cây câu hỏi của máy</h2>\n      <p class=\"lead\">Đường màu hồng là đường máy đang đi trong lượt chơi này.</p>\n      <div class=\"treebox\"><svg class=\"tree\" id=\"tree\" aria-label=\"Cây câu hỏi\"></svg></div>\n    </section>\n  </div>\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Máy đoán con vật" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
