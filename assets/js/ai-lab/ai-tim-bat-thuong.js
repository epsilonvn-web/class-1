/* Epsilon Edu - AI tìm điều bất thường
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiAnomaly";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst R=(a,b)=>a+Math.random()*(b-a);function gauss(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}\nconst SC=[\n {id:'egg',tab:'🥚 Lồng ấp trứng',title:'Nhiệt độ lồng ấp trứng gà trong 24 giờ',lead:'Lồng ấp cần giữ khoảng 37,5°C. Mỗi giờ đo một lần. Có vài giờ nhiệt độ lạ, con tìm thử xem!',xn:'Giờ',yn:'°C',n:24,ymin:33,ymax:41,gen:()=>{const d=[];for(let i=0;i<24;i++)d.push(37.5+gauss()*.25);return d;},odd:[()=>R(34.5,35.6),()=>R(39.4,40.3)],fmt:v=>v.toFixed(1).replace('.',',')+'°C',why:i=>'Có thể cửa lồng bị mở hoặc máy sưởi trục trặc.'},\n {id:'steps',tab:'👟 Bước chân mỗi ngày',title:'Số bước chân của bạn Nam trong 30 ngày',lead:'Mỗi ngày Nam đi khoảng 6.000 bước. Có những ngày rất khác thường, con tìm thử nhé!',xn:'Ngày',yn:'bước',n:30,ymin:0,ymax:20000,gen:()=>{const d=[];for(let i=0;i<30;i++)d.push(Math.max(800,6000+gauss()*900));return d;},odd:[()=>R(600,1500),()=>R(15000,18500)],fmt:v=>Math.round(v).toLocaleString('vi-VN')+' bước',why:i=>'Có thể hôm đó Nam bị ốm nằm nghỉ, hoặc cả nhà đi du lịch.'},\n {id:'cookie',tab:'🍪 Máy làm bánh',title:'Cân nặng của 28 chiếc bánh quy',lead:'Mỗi chiếc bánh nặng khoảng 50 gam. Có chiếc nào bị lỗi không?',xn:'Chiếc bánh số',yn:'gam',n:28,ymin:38,ymax:62,gen:()=>{const d=[];for(let i=0;i<28;i++)d.push(50+gauss()*1.3);return d;},odd:[()=>R(40,43),()=>R(57.5,60)],fmt:v=>v.toFixed(1).replace('.',',')+' g',why:i=>'Có thể máy rót bột bị kẹt hoặc rót quá tay.'}];\nlet sc=SC[0],data=[],truth=new Set(),kid=new Set(),aiFlag=null;\nconst W=640,H=340,L=58,B=40,T=16,Rr=16;\nconst X=i=>L+(i+.5)*(W-L-Rr)/sc.n,Y=v=>H-B-(v-sc.ymin)/(sc.ymax-sc.ymin)*(H-B-T);\nfunction gen(){data=sc.gen();truth=new Set();const k=Math.random()<.5?2:3;while(truth.size<k){const i=Math.floor(R(1,sc.n-1));if(!truth.has(i)){truth.add(i);data[i]=sc.odd[truth.size%2]();}}\n  kid=new Set();aiFlag=null;$('kidOk').textContent='0';$('aiOk').textContent='–';$('aiBad').textContent='–';msg(`Có ${k} điểm bất thường. Con bấm vào những điểm con thấy lạ nhé!`);draw();}\nfunction msg(t,c){const m=$('msg');m.className='msg'+(c?' '+c:'');m.textContent=t;}\nfunction band(){const s=+$('sens').value/10;// vùng bình thường dựa trên trung vị và độ lệch trung vị (ít bị điểm lạ làm méo)\n  const srt=data.slice().sort((a,b)=>a-b),med=srt[Math.floor(srt.length/2)],dev=data.map(v=>Math.abs(v-med)).sort((a,b)=>a-b)[Math.floor(data.length/2)]*1.4826;const k=12/s;return[med-k*dev,med+k*dev,med];}\nfunction draw(){let h='';for(let i=0;i<=4;i++){const v=sc.ymin+(sc.ymax-sc.ymin)*i/4,y=Y(v);h+=`<line x1=\"${L}\" x2=\"${W-Rr}\" y1=\"${y}\" y2=\"${y}\" stroke=\"var(--line)\"/><text x=\"${L-6}\" y=\"${y+4}\" text-anchor=\"end\" font-size=\"11\" font-weight=\"800\" fill=\"var(--muted)\">${sc.fmt(v).replace(/ .*/,'')}</text>`;}\n  h+=`<text x=\"${(W+L)/2}\" y=\"${H-8}\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"900\" fill=\"var(--muted)\">${sc.xn}</text>`;\n  if(aiFlag){const[lo,hi]=band();h+=`<rect x=\"${L}\" y=\"${Y(hi)}\" width=\"${W-L-Rr}\" height=\"${Y(lo)-Y(hi)}\" fill=\"#22c55e\" opacity=\".15\"/><line x1=\"${L}\" x2=\"${W-Rr}\" y1=\"${Y(hi)}\" y2=\"${Y(hi)}\" stroke=\"#22c55e\" stroke-dasharray=\"5 4\"/><line x1=\"${L}\" x2=\"${W-Rr}\" y1=\"${Y(lo)}\" y2=\"${Y(lo)}\" stroke=\"#22c55e\" stroke-dasharray=\"5 4\"/>`;}\n  h+=`<polyline points=\"${data.map((v,i)=>X(i)+','+Y(v)).join(' ')}\" fill=\"none\" stroke=\"#c4b5fd\" stroke-width=\"2\"/>`;\n  data.forEach((v,i)=>{const k=kid.has(i),a=aiFlag&&aiFlag.has(i),t=aiFlag&&truth.has(i);\n    h+=`<g class=\"dot\" data-i=\"${i}\"><circle cx=\"${X(i)}\" cy=\"${Y(v)}\" r=\"14\" fill=\"transparent\"/><circle cx=\"${X(i)}\" cy=\"${Y(v)}\" r=\"${k?9:6.5}\" fill=\"${a?'#ec4899':k?'#8b5cf6':'#3b82f6'}\" stroke=\"#fff\" stroke-width=\"2.5\"/>${t?`<circle cx=\"${X(i)}\" cy=\"${Y(v)}\" r=\"15\" fill=\"none\" stroke=\"#ec4899\" stroke-width=\"2.5\" stroke-dasharray=\"4 3\"/>`:''}${k?`<text x=\"${X(i)}\" y=\"${Y(v)-15}\" text-anchor=\"middle\" font-size=\"13\">🔎</text>`:''}<title>${sc.xn} ${i+1}: ${sc.fmt(v)}</title></g>`;});\n  $('ch').innerHTML=h;$('ch').querySelectorAll('.dot').forEach(g=>g.onclick=()=>{if(aiFlag)return;const i=+g.dataset.i;kid.has(i)?kid.delete(i):kid.add(i);draw();\n    const ok=[...kid].filter(i=>truth.has(i)).length;$('kidOk').textContent=ok;});}\nfunction aiFind(){const[lo,hi]=band();aiFlag=new Set();data.forEach((v,i)=>{if(v<lo||v>hi)aiFlag.add(i);});draw();\n  const ok=[...aiFlag].filter(i=>truth.has(i)).length,bad=aiFlag.size-ok,miss=truth.size-ok,kok=[...kid].filter(i=>truth.has(i)).length;\n  $('aiOk').textContent=ok+'/'+truth.size;$('aiBad').textContent=bad;$('kidOk').textContent=kok+'/'+truth.size;\n  const first=[...truth][0];\n  if(bad>0)msg(`Máy báo nhầm ${bad} điểm vì độ nhạy quá cao: chỉ hơi khác một chút máy đã báo. Thử giảm độ nhạy xem!`,'no');\n  else if(miss>0)msg(`Máy bỏ sót ${miss} điểm vì độ nhạy quá thấp. Thử tăng độ nhạy xem!`,'no');\n  else{msg(`🎉 Máy tìm đúng cả ${ok} điểm bất thường, không báo nhầm! Ví dụ ${sc.xn.toLowerCase()} ${first+1}: ${sc.fmt(data[first])}. ${sc.why(first)}`,'ok');speak('Máy đã tìm đúng các điểm bất thường!');}}\n$('aiFind').onclick=aiFind;$('newData').onclick=gen;\nconst sensTxt=()=>{const s=+$('sens').value;$('sensTxt').textContent=s<18?'Kém nhạy':s<34?'Vừa phải':'Rất nhạy';};\n$('sens').oninput=()=>{sensTxt();if(aiFlag)aiFind();};\nfunction renderTabs(){$('scen').innerHTML=SC.map(s=>`<button class=\"tab\" role=\"tab\" data-s=\"${s.id}\" aria-selected=\"${s===sc}\">${s.tab}</button>`).join('');\n  $('scen').querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{sc=SC.find(s=>s.id===b.dataset.s);renderTabs();$('title').textContent=sc.title;$('lead').textContent=sc.lead;gen();});}\nrenderTabs();$('title').textContent=sc.title;$('lead').textContent=sc.lead;sensTxt();gen();\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --pink:#ec4899;--pink-soft:#fdf2f8;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#f0fdf4;--blue:#1d4ed8;--blue-soft:#eff6ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-weight:900;font-size:1.02rem}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.tab[aria-selected=\"true\"] small{color:#fdf2ff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:2px solid var(--line);border-radius:14px;background:var(--card)}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--pink-soft);color:var(--pink)}\n.tip{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--purple)}\n.warn{border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:var(--pink);margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.chart{border-radius:18px;background:var(--paper);border:2px solid var(--line);overflow:hidden}\nsvg.ch{display:block;width:100%;height:auto}\n.dot{cursor:pointer}\n.score{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}\n.sc{border-radius:14px;padding:8px;background:var(--purple-soft);font-weight:800;text-align:center;font-size:.92rem}\n.sc b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;color:var(--purple)}\n.uses{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin-top:8px}\n.use{border-radius:14px;padding:10px;background:var(--blue-soft);font-weight:700}\n.use b{display:block}";
  const CLASS1_AI_LAB_THEME = ":root,\n:root[data-theme=\"dark\"]{\n  --bg:#ffffff!important;\n  --card:#ffffff!important;\n  --ink:#344054!important;\n  --muted:#667085!important;\n  --line:#EDE9FE!important;\n  --pink:#EC4899!important;\n  --pink-soft:#FFF1F7!important;\n  --purple:#7C3AED!important;\n  --purple-soft:#F5F3FF!important;\n  --green:#10B981!important;\n  --green-soft:#ECFDF3!important;\n  --blue:#3B82F6!important;\n  --blue-soft:#EFF8FF!important;\n  --red:#E11D48!important;\n  --red-soft:#FFF1F2!important;\n  --paper:#ffffff!important;\n  --c1:#EC4899!important;\n  --c2:#8B5CF6!important;\n  --c3:#3B82F6!important;\n  --c4:#10B981!important;\n}\nhtml,body{background:#fff!important;color:var(--ink)!important}\n.hero{\n  background:linear-gradient(135deg,#FFF7FB 0%,#FAF5FF 52%,#EFF8FF 100%)!important;\n  border:1px solid #E9D5FF!important;\n  box-shadow:0 6px 16px rgba(124,58,237,.08)!important;\n}\n.hero-icon{\n  background:#F5F3FF!important;\n  border:1px solid #DDD6FE!important;\n  box-shadow:0 4px 10px rgba(124,58,237,.07)!important;\n}\n.hero h1{color:#6D28D9!important}\n.card,.step{\n  border-width:1px!important;\n  border-color:#EDE9FE!important;\n  box-shadow:0 5px 14px rgba(76,29,149,.055)!important;\n}\n.card:nth-of-type(3n+1),.step:nth-child(3n+1){background:#FFF9FC!important}\n.card:nth-of-type(3n+2),.step:nth-child(3n+2){background:#FBF9FF!important}\n.card:nth-of-type(3n),.step:nth-child(3n){background:#F8FCFF!important}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.chart,.plane,.rl,.tl,.kidpick button,table.ex button{\n  border-width:1px!important;\n}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.tl,table.ex button,.kidpick button{\n  background:#fff!important;\n}\n.tab[aria-selected=\"true\"],.seg button[aria-pressed=\"true\"]{\n  background:linear-gradient(90deg,#EC4899,#8B5CF6)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n}\n.btn.main{\n  background:linear-gradient(90deg,#EC4899,#A855F7,#7C3AED)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(139,92,246,.16)!important;\n}\n.btn.cool{\n  background:linear-gradient(90deg,#3B82F6,#10B981)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(59,130,246,.13)!important;\n}\n.tip{\n  background:#EFF8FF!important;\n  border:1px solid #BFDBFE!important;\n  color:#344054!important;\n}\n.warn{\n  background:#FFF1F7!important;\n  border:1px solid #FBCFE8!important;\n  color:#BE185D!important;\n}\n.msg{\n  background:#EFF8FF!important;\n  border:1px solid #DBEAFE!important;\n  color:#344054!important;\n}\n.msg.ok{background:#ECFDF3!important;border-color:#BBF7D0!important;color:#047857!important}\n.msg.no{background:#FFF1F7!important;border-color:#FBCFE8!important;color:#BE185D!important}\n.stat,.sc,.rc,.gr,table.ex td{background:#F5F3FF!important}\n.feed,.use{background:#EFF8FF!important}\n.prof span{border:1px solid rgba(148,163,184,.18)!important}\n.it.like,.al.yes,.kidpick button.ok{background:#ECFDF3!important;border-color:#86EFAC!important}\n.it.dis,.al.no,.kidpick button.no{background:#FFF1F7!important;border-color:#F9A8D4!important}\n.snd.on,.sh:focus-visible,.sw[aria-pressed=\"true\"]{border-color:#C4B5FD!important}\n.track{background:#F5F3FF!important}\ninput[type=\"range\"]{accent-color:#8B5CF6}\n@media (max-width:640px){\n  .wrap{padding-left:10px;padding-right:10px}\n}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🔍</div>\n    <div>\n      <h1>AI tìm điều bất thường <span class=\"ai\">✨ AI</span></h1>\n      <p>Máy học thế nào là \"bình thường\", rồi tìm ra những điểm khác thường. Con thử thi tài tìm điểm lạ với máy nhé!</p>\n    </div>\n  </header>\n\n  <div class=\"tabs\" role=\"tablist\" id=\"scen\"></div>\n  <div class=\"grid\" style=\"margin-top:0\">\n    <section class=\"card\">\n      <h2 id=\"title\"></h2>\n      <p class=\"lead\" id=\"lead\"></p>\n      <div class=\"chart\"><svg class=\"ch\" id=\"ch\" viewBox=\"0 0 640 340\" aria-label=\"Biểu đồ dữ liệu\"></svg></div>\n      <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn main\" id=\"aiFind\">🤖 Để máy tìm</button><button class=\"btn\" id=\"newData\">🎲 Dữ liệu mới</button></div>\n      <div class=\"msg\" id=\"msg\"></div>\n    </section>\n    <section>\n      <div class=\"card\">\n        <h2>🎯 Ai tìm giỏi hơn?</h2>\n        <p class=\"lead\">Con bấm vào những điểm con thấy \"lạ\" trước, rồi mới để máy tìm.</p>\n        <div class=\"score\"><div class=\"sc\">Con tìm đúng<b id=\"kidOk\">0</b></div><div class=\"sc\">Máy tìm đúng<b id=\"aiOk\">–</b></div><div class=\"sc\">Máy báo nhầm<b id=\"aiBad\">–</b></div></div>\n        <label class=\"slider\">🎚️ Độ nhạy của máy <input type=\"range\" id=\"sens\" min=\"10\" max=\"50\" value=\"25\"><small id=\"sensTxt\"></small></label>\n        <p class=\"lead\" style=\"margin:0\">Máy coi những điểm nằm ngoài <b>vùng bình thường</b> (dải màu xanh) là bất thường. Độ nhạy càng cao, vùng bình thường càng hẹp.</p>\n      </div>\n      <div class=\"card\"><h2>🌍 AI tìm bất thường ở đâu?</h2>\n        <div class=\"uses\"><div class=\"use\"><b>🏭 Nhà máy</b>Phát hiện máy móc kêu lạ, nóng bất thường để sửa trước khi hỏng.</div><div class=\"use\"><b>💳 Ngân hàng</b>Phát hiện thẻ bị kẻ gian dùng trộm vì cách chi tiêu khác hẳn mọi khi.</div><div class=\"use\"><b>🩺 Sức khỏe</b>Đồng hồ thông minh báo khi nhịp tim bất thường.</div></div></div>\n    </section>\n  </div>\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Học cái bình thường</b>Máy xem rất nhiều dữ liệu để biết thế nào là \"bình thường\".</div>\n    <div class=\"step\"><b>2. Vẽ vùng bình thường</b>Máy tính giá trị trung bình và mức dao động thường gặp.</div>\n    <div class=\"step\"><b>3. Tìm điểm lạ</b>Điểm nào nằm quá xa vùng bình thường thì máy báo. Nhạy quá thì báo nhầm nhiều, kém nhạy thì bỏ sót.</div>\n  </div>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="AI tìm điều bất thường" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
