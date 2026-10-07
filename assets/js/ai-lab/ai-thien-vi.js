/* Epsilon Edu - AI có thiên vị không?
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiBias";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst COL={o:'#fb923c',b:'#3b82f6'};\nfunction alien(c){return`<svg viewBox=\"0 0 60 60\" aria-hidden=\"true\"><line x1=\"22\" y1=\"14\" x2=\"16\" y2=\"4\" stroke=\"${COL[c]}\" stroke-width=\"3\"/><line x1=\"38\" y1=\"14\" x2=\"44\" y2=\"4\" stroke=\"${COL[c]}\" stroke-width=\"3\"/><circle cx=\"16\" cy=\"4\" r=\"3.5\" fill=\"${COL[c]}\"/><circle cx=\"44\" cy=\"4\" r=\"3.5\" fill=\"${COL[c]}\"/>\n  <ellipse cx=\"30\" cy=\"34\" rx=\"22\" ry=\"21\" fill=\"${COL[c]}\"/><ellipse cx=\"22\" cy=\"31\" rx=\"5\" ry=\"6.5\" fill=\"#fff\"/><ellipse cx=\"38\" cy=\"31\" rx=\"5\" ry=\"6.5\" fill=\"#fff\"/><circle cx=\"23\" cy=\"32\" r=\"2.6\" fill=\"#3b2a5c\"/><circle cx=\"37\" cy=\"32\" r=\"2.6\" fill=\"#3b2a5c\"/><path d=\"M22,44 Q30,50 38,44\" fill=\"none\" stroke=\"#3b2a5c\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></svg>`;}\nconst stars=n=>'⭐'.repeat(n);\nconst DATA={\n biased:{note:'Trước đây ban huấn luyện gần như chỉ chọn bạn màu cam. Nhiều bạn màu xanh sút rất giỏi mà vẫn bị loại!',\n  rows:[['o',5,1],['o',4,1],['o',4,1],['o',3,1],['o',3,1],['o',5,1],['o',2,0],['o',1,0],['o',2,0],['o',4,1],['b',5,0],['b',4,0],['b',3,0],['b',2,0],['b',1,0],['b',4,0]]},\n fair:{note:'Ở dữ liệu này, bạn nào sút giỏi (từ 3 sao trở lên) đều được chọn, dù màu cam hay màu xanh.',\n  rows:[['o',5,1],['o',4,1],['o',3,1],['o',2,0],['o',1,0],['o',4,1],['o',2,0],['o',3,1],['b',5,1],['b',4,1],['b',3,1],['b',2,0],['b',1,0],['b',4,1],['b',2,0],['b',3,1]]}};\nconst TEST=[['o',5],['o',4],['o',3],['o',2],['o',1],['b',5],['b',4],['b',3],['b',2],['b',1]];\nlet ds='biased',rows=[];\nfunction load(k){ds=k;rows=DATA[k].rows.map(r=>r.slice());document.querySelectorAll('#dsSeg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ds===k));$('dsNote').textContent=DATA[k].note;render();}\nfunction train(){const hide=$('hideColor').checked;const m={1:{n:0,c:{o:0,b:0},s:[0,0,0,0,0,0]},0:{n:0,c:{o:0,b:0},s:[0,0,0,0,0,0]}};\n  rows.forEach(([c,s,y])=>{m[y].n++;m[y].c[c]++;m[y].s[s]++;});\n  return(c,s)=>{let lp={};for(const y of[0,1]){const t=m[y];let v=Math.log((t.n+1)/(rows.length+2));if(!hide)v+=Math.log((t.c[c]+1)/(t.n+2));v+=Math.log((t.s[s]+1)/(t.n+5));lp[y]=v;}\n    const mx=Math.max(lp[0],lp[1]);const p1=Math.exp(lp[1]-mx)/(Math.exp(lp[0]-mx)+Math.exp(lp[1]-mx));return p1;};}\nfunction render(){$('train').innerHTML=rows.map(([c,s,y],i)=>`<button class=\"al ${y?'yes':'no'}\" data-i=\"${i}\" aria-label=\"Bạn màu ${c==='o'?'cam':'xanh'}, ${s} sao, ${y?'được chọn':'không được chọn'}\">${alien(c)}<span class=\"st\">${stars(s)}</span><span class=\"tag\">${y?'✅ Được chọn':'❌ Bị loại'}</span></button>`).join('');\n  $('train').querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const r=rows[+b.dataset.i];r[2]=1-r[2];render();});\n  const model=train();let sel={o:0,b:0};\n  $('test').innerHTML=TEST.map(([c,s])=>{const p=model(c,s),y=p>=.5;if(y)sel[c]++;return`<div class=\"al ${y?'yes':'no'}\">${alien(c)}<span class=\"st\">${stars(s)}</span><span class=\"tag\">${y?'✅ Chọn':'❌ Loại'} ${Math.round(p*100)}%</span></div>`;}).join('');\n  const po=sel.o/5*100,pb=sel.b/5*100;$('mO').style.width=po+'%';$('mB').style.width=pb+'%';$('pO').textContent=sel.o+'/5';$('pB').textContent=sel.b+'/5';\n  const gap=Math.abs(sel.o-sel.b);$('fair').textContent=gap===0?'⚖️ Công bằng! Hai màu được chọn như nhau.':gap===1?'⚖️ Gần công bằng.':`⚠️ Không công bằng! Bạn màu ${sel.o>sel.b?'cam':'xanh'} được chọn nhiều hơn hẳn dù tài năng như nhau.`;\n  const m=$('msg');const goodBlue=rows.filter(r=>r[0]==='b'&&r[2]===1).length;\n  if(gap>=2){m.className='msg no';m.textContent=$('hideColor').checked?'Dù đã che màu da, kết quả vẫn lệch vì dữ liệu cũ quá ít bạn màu xanh được chọn. Con thử sửa dữ liệu nhé!':`Máy đã học theo dữ liệu cũ: trong dữ liệu, chỉ có ${goodBlue} bạn màu xanh được chọn. Máy tưởng \"màu xanh thì không giỏi\". Con thử: bấm vào các bạn màu xanh sút giỏi để sửa lại thành \"Được chọn\", hoặc che màu da đi.`;}\n  else{m.className='msg ok';m.textContent=$('hideColor').checked?'Khi không nhìn màu da, máy chỉ dựa vào tài sút bóng, nên chọn công bằng hơn.':'Dữ liệu công bằng thì máy cũng chọn công bằng: bạn nào sút giỏi đều được chọn, không phân biệt màu.';}}\ndocument.querySelectorAll('#dsSeg [data-ds]').forEach(b=>b.onclick=()=>load(b.dataset.ds));\n$('hideColor').onchange=render;\nload('biased');\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --pink:#ec4899;--pink-soft:#fdf2f8;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#f0fdf4;--blue:#1d4ed8;--blue-soft:#eff6ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-weight:900;font-size:1.02rem}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.tab[aria-selected=\"true\"] small{color:#fdf2ff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:2px solid var(--line);border-radius:14px;background:var(--card)}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--pink-soft);color:var(--pink)}\n.tip{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--purple)}\n.warn{border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:var(--pink);margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.pool{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px;margin-top:8px}\n.al{position:relative;border:3px solid var(--line);border-radius:16px;background:var(--card);padding:6px 4px 4px;text-align:center;font-weight:900;font-size:.78rem;line-height:1.2}\n.al svg{display:block;width:52px;height:52px;margin:0 auto}\n.al .st{color:#f59e0b;letter-spacing:-1px;font-size:.8rem}\n.al.yes{border-color:#22c55e;background:var(--green-soft)}\n.al.no{border-color:#f9a8d4;background:var(--pink-soft)}\n.al .tag{display:block;margin-top:2px}\nbutton.al{cursor:pointer}\n.meter{display:grid;grid-template-columns:110px 1fr 56px;gap:8px;align-items:center;font-weight:900;margin:6px 0}\n.track{height:22px;border-radius:99px;background:var(--purple-soft);overflow:hidden}\n.track i{display:block;height:100%;border-radius:99px;transition:width .4s}\n.fair{font-family:\"Baloo 2\",sans-serif;font-size:1.3rem;font-weight:800;margin:8px 0 0}\n.toggle{display:flex;align-items:center;gap:8px;font-weight:900;margin-top:10px}\n.toggle input{width:20px;height:20px;accent-color:#8b5cf6}";
  const CLASS1_AI_LAB_THEME = ":root,\n:root[data-theme=\"dark\"]{\n  --bg:#ffffff!important;\n  --card:#ffffff!important;\n  --ink:#344054!important;\n  --muted:#667085!important;\n  --line:#EDE9FE!important;\n  --pink:#EC4899!important;\n  --pink-soft:#FFF1F7!important;\n  --purple:#7C3AED!important;\n  --purple-soft:#F5F3FF!important;\n  --green:#10B981!important;\n  --green-soft:#ECFDF3!important;\n  --blue:#3B82F6!important;\n  --blue-soft:#EFF8FF!important;\n  --red:#E11D48!important;\n  --red-soft:#FFF1F2!important;\n  --paper:#ffffff!important;\n  --c1:#EC4899!important;\n  --c2:#8B5CF6!important;\n  --c3:#3B82F6!important;\n  --c4:#10B981!important;\n}\nhtml,body{background:#fff!important;color:var(--ink)!important}\n.hero{\n  background:linear-gradient(135deg,#FFF7FB 0%,#FAF5FF 52%,#EFF8FF 100%)!important;\n  border:1px solid #E9D5FF!important;\n  box-shadow:0 6px 16px rgba(124,58,237,.08)!important;\n}\n.hero-icon{\n  background:#F5F3FF!important;\n  border:1px solid #DDD6FE!important;\n  box-shadow:0 4px 10px rgba(124,58,237,.07)!important;\n}\n.hero h1{color:#6D28D9!important}\n.card,.step{\n  border-width:1px!important;\n  border-color:#EDE9FE!important;\n  box-shadow:0 5px 14px rgba(76,29,149,.055)!important;\n}\n.card:nth-of-type(3n+1),.step:nth-child(3n+1){background:#FFF9FC!important}\n.card:nth-of-type(3n+2),.step:nth-child(3n+2){background:#FBF9FF!important}\n.card:nth-of-type(3n),.step:nth-child(3n){background:#F8FCFF!important}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.chart,.plane,.rl,.tl,.kidpick button,table.ex button{\n  border-width:1px!important;\n}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.tl,table.ex button,.kidpick button{\n  background:#fff!important;\n}\n.tab[aria-selected=\"true\"],.seg button[aria-pressed=\"true\"]{\n  background:linear-gradient(90deg,#EC4899,#8B5CF6)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n}\n.btn.main{\n  background:linear-gradient(90deg,#EC4899,#A855F7,#7C3AED)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(139,92,246,.16)!important;\n}\n.btn.cool{\n  background:linear-gradient(90deg,#3B82F6,#10B981)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(59,130,246,.13)!important;\n}\n.tip{\n  background:#EFF8FF!important;\n  border:1px solid #BFDBFE!important;\n  color:#344054!important;\n}\n.warn{\n  background:#FFF1F7!important;\n  border:1px solid #FBCFE8!important;\n  color:#BE185D!important;\n}\n.msg{\n  background:#EFF8FF!important;\n  border:1px solid #DBEAFE!important;\n  color:#344054!important;\n}\n.msg.ok{background:#ECFDF3!important;border-color:#BBF7D0!important;color:#047857!important}\n.msg.no{background:#FFF1F7!important;border-color:#FBCFE8!important;color:#BE185D!important}\n.stat,.sc,.rc,.gr,table.ex td{background:#F5F3FF!important}\n.feed,.use{background:#EFF8FF!important}\n.prof span{border:1px solid rgba(148,163,184,.18)!important}\n.it.like,.al.yes,.kidpick button.ok{background:#ECFDF3!important;border-color:#86EFAC!important}\n.it.dis,.al.no,.kidpick button.no{background:#FFF1F7!important;border-color:#F9A8D4!important}\n.snd.on,.sh:focus-visible,.sw[aria-pressed=\"true\"]{border-color:#C4B5FD!important}\n.track{background:#F5F3FF!important}\ninput[type=\"range\"]{accent-color:#8B5CF6}\n@media (max-width:640px){\n  .wrap{padding-left:10px;padding-right:10px}\n}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">⚖️</div>\n    <div>\n      <h1>AI có thiên vị không? <span class=\"ai\">✨ AI</span></h1>\n      <p>Máy học từ dữ liệu cũ. Nếu dữ liệu cũ không công bằng, máy cũng sẽ không công bằng. Con thử làm cho máy chọn cầu thủ công bằng hơn nhé!</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <section>\n      <div class=\"card\">\n        <h2>📚 Bước 1: Dữ liệu cũ để dạy máy</h2>\n        <p class=\"lead\">Đội bóng của hành tinh Kẹo Dẻo muốn nhờ máy chọn cầu thủ. Máy học từ danh sách những bạn <b>đã được chọn trước đây</b>. Mỗi bạn có màu da và số sao sút bóng ⭐.</p>\n        <div class=\"row\"><span class=\"lbl\">Dữ liệu</span><span class=\"seg\" id=\"dsSeg\"><button data-ds=\"biased\" aria-pressed=\"true\">😕 Dữ liệu lệch</button><button data-ds=\"fair\" aria-pressed=\"false\">😊 Dữ liệu công bằng</button></span></div>\n        <p class=\"lead\" style=\"margin:10px 0 0\" id=\"dsNote\"></p>\n        <div class=\"pool\" id=\"train\"></div>\n        <p class=\"lead\" style=\"margin:8px 0 0;font-size:.9rem\">Mẹo: bấm vào một bạn để sửa kết quả \"được chọn\" hoặc \"không được chọn\" cho đúng với tài năng của bạn ấy.</p>\n      </div>\n    </section>\n    <section>\n      <div class=\"card\">\n        <h2>🤖 Bước 2: Máy chọn cầu thủ mới</h2>\n        <p class=\"lead\">10 bạn mới đến thử sức. Bạn màu cam và bạn màu xanh có số sao giống hệt nhau.</p>\n        <label class=\"toggle\"><input type=\"checkbox\" id=\"hideColor\"> 🙈 Che màu da, không cho máy nhìn</label>\n        <div class=\"pool\" id=\"test\"></div>\n        <div class=\"meter\"><span>🟠 Màu cam</span><span class=\"track\"><i id=\"mO\" style=\"background:linear-gradient(90deg,#fb923c,#ec4899)\"></i></span><span id=\"pO\"></span></div>\n        <div class=\"meter\"><span>🔵 Màu xanh</span><span class=\"track\"><i id=\"mB\" style=\"background:linear-gradient(90deg,#3b82f6,#22c55e)\"></i></span><span id=\"pB\"></span></div>\n        <p class=\"fair\" id=\"fair\"></p>\n        <div class=\"msg\" id=\"msg\"></div>\n      </div>\n    </section>\n  </div>\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Máy học từ quá khứ</b>Nếu trước đây con người chọn không công bằng, máy sẽ học luôn cái không công bằng đó.</div>\n    <div class=\"step\"><b>2. Máy không biết đúng sai</b>Máy chỉ thấy \"bạn màu cam hay được chọn\", chứ không hiểu vì sao. Nên máy nghĩ màu da quan trọng.</div>\n    <div class=\"step\"><b>3. Sửa dữ liệu, sửa máy</b>Dữ liệu công bằng và chỉ cho máy xem điều thật sự quan trọng (tài sút bóng) thì máy sẽ chọn công bằng hơn.</div>\n  </div>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="AI có thiên vị không?" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
