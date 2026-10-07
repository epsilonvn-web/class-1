/* Epsilon Edu - AI gợi ý cho bạn
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiRecommend";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst T={cute:'dễ thương',fluffy:'có lông mềm',water:'ở dưới nước',big:'to lớn',fly:'biết bay',sweet:'vị ngọt',salty:'vị mặn',fruit:'trái cây',active:'vận động',outdoor:'ngoài trời',art:'sáng tạo',music:'âm nhạc',quiet:'yên tĩnh',team:'chơi cùng bạn'};\nconst KIND={animal:'🐾 Con vật',food:'🍽️ Món ăn',act:'🎨 Hoạt động'};\nconst ITEMS=[['🐱','Con mèo','animal',['cute','fluffy']],['🐶','Con chó','animal',['cute','fluffy','active']],['🐬','Cá heo','animal',['water','cute']],['🐘','Con voi','animal',['big']],['🦜','Con vẹt','animal',['fly','cute','music']],['🐢','Con rùa','animal',['water','quiet']],['🦁','Sư tử','animal',['big','fluffy']],['🐧','Chim cánh cụt','animal',['water','cute']],\n ['🍦','Kem','food',['sweet']],['🍉','Dưa hấu','food',['sweet','fruit']],['🍜','Phở','food',['salty']],['🥭','Xoài','food',['sweet','fruit']],['🍟','Khoai chiên','food',['salty']],['🍰','Bánh ngọt','food',['sweet']],['🍊','Cam','food',['fruit']],['🍙','Cơm nắm','food',['salty']],\n ['⚽','Đá bóng','act',['active','outdoor','team']],['🎨','Vẽ tranh','act',['art','quiet']],['🎹','Đánh đàn','act',['music','art']],['📚','Đọc sách','act',['quiet']],['🏊','Bơi lội','act',['water','active']],['🧩','Xếp hình','act',['quiet','art']],['🚲','Đạp xe','act',['active','outdoor']],['💃','Nhảy múa','act',['music','active','team']]];\nlet rate={};\nfunction prof(){const w={};for(const[i,v]of Object.entries(rate))ITEMS[i][3].forEach(t=>w[t]=(w[t]||0)+v);const kw={};for(const[i,v]of Object.entries(rate)){const k=ITEMS[i][2];kw[k]=(kw[k]||0)+v*.5;}return{w,kw};}\nfunction score(i,p){const it=ITEMS[i];return it[3].reduce((s,t)=>s+(p.w[t]||0),0)+(p.kw[it[2]]||0);}\nfunction recommend(exclude){const p=prof();return ITEMS.map((it,i)=>({i,s:score(i,p)})).filter(x=>!(x.i in exclude)).sort((a,b)=>b.s-a.s||Math.random()-.5);}\nfunction renderItems(){$('items').innerHTML=ITEMS.map((it,i)=>`<div class=\"it ${rate[i]>0?'like':rate[i]<0?'dis':''}\"><span class=\"em\">${it[0]}</span>${it[1]}<div class=\"vote\"><button class=\"up\" data-i=\"${i}\" data-v=\"1\" aria-label=\"Thích\">👍</button><button class=\"down\" data-i=\"${i}\" data-v=\"-1\" aria-label=\"Không thích\">👎</button></div></div>`).join('');\n  $('items').querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,v=+b.dataset.v;rate[i]===v?delete rate[i]:rate[i]=v;renderItems();renderRecs();});}\nfunction renderRecs(){const n=Object.keys(rate).length;if(n<2){$('recs').innerHTML='<p class=\"lead\" style=\"margin:0\">Con hãy chấm ít nhất 2 thứ để máy bắt đầu đoán sở thích nhé!</p>';$('prof').innerHTML='';return;}\n  const p=prof(),r=recommend(rate).slice(0,4);\n  $('recs').innerHTML=r.map(x=>{const it=ITEMS[x.i];const why=it[3].filter(t=>(p.w[t]||0)>0).map(t=>T[t]);\n    return`<div class=\"rc\"><span class=\"em\">${it[0]}</span><div>${it[1]}<small>${why.length?'Vì con thích những thứ '+why.join(', '):'Máy thử gợi ý một thứ mới'}</small></div><span class=\"score\">${x.s>0?'+':''}${x.s}</span></div>`;}).join('');\n  $('prof').innerHTML=Object.entries(p.w).filter(([,v])=>v!==0).sort((a,b)=>b[1]-a[1]).map(([t,v])=>`<span style=\"background:${v>0?'var(--green-soft)':'var(--pink-soft)'}\">${v>0?'👍':'👎'} ${T[t]}</span>`).join('');}\n\n/* ---------- bong bóng ---------- */\nlet seen=[],bRate={};\nfunction bReset(){seen=[];bRate={};const start=Math.floor(Math.random()*ITEMS.length);watch(start);}\nfunction watch(i){seen.push(i);bRate[i]=1;renderBubble();}\nfunction renderBubble(){$('feed').innerHTML=seen.map(i=>`<span title=\"${ITEMS[i][1]}\">${ITEMS[i][0]}</span>`).join('');\n  const last=seen.slice(-6),kinds=new Set(last.map(i=>ITEMS[i][2])),tags=new Set(last.flatMap(i=>ITEMS[i][3]));const d=Math.min(1,(kinds.size-1)/2*.5+tags.size/10);\n  $('dv').style.width=Math.round(d*100)+'%';$('dvTxt').textContent=`6 thứ gần nhất thuộc ${kinds.size} loại (${[...kinds].map(k=>KIND[k]).join(', ')})`;\n  const m=$('bMsg');if(seen.length>=6&&kinds.size===1){m.className='msg no';m.textContent='🫧 Con đã bị \"nhốt trong bong bóng\"! Máy chỉ cho con xem một loại nội dung. Bấm \"Khám phá điều mới\" để thoát ra nhé.';}\n  else{m.className='msg';m.textContent=seen.length<4?'Bấm \"Xem theo gợi ý\" vài lần xem sao...':'Để ý độ đa dạng nhé!';}}\n$('auto').onclick=()=>{const p={w:{},kw:{}};for(const i of Object.keys(bRate)){ITEMS[i][3].forEach(t=>p.w[t]=(p.w[t]||0)+1);p.kw[ITEMS[i][2]]=(p.kw[ITEMS[i][2]]||0)+.5;}\n  const cand=ITEMS.map((it,i)=>({i,s:score(i,p)-seen.filter(x=>x===i).length*.6})).sort((a,b)=>b.s-a.s);watch(cand[0].i);};\n$('explore').onclick=()=>{const lastK=ITEMS[seen[seen.length-1]][2];const pool=ITEMS.map((it,i)=>i).filter(i=>ITEMS[i][2]!==lastK);watch(pool[Math.floor(Math.random()*pool.length)]);\n  const m=$('bMsg');m.className='msg ok';m.textContent='🎲 Con đã tự khám phá một điều mới, ngoài những gì máy gợi ý!';};\n$('bReset').onclick=bReset;\ndocument.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===b));const t=b.dataset.tab;\n  $('pRate').classList.toggle('hidden',t!=='rate');$('pBubble').classList.toggle('hidden',t!=='bubble');if(t==='bubble'&&!seen.length)bReset();});\nrenderItems();renderRecs();\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --pink:#ec4899;--pink-soft:#fdf2f8;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#f0fdf4;--blue:#1d4ed8;--blue-soft:#eff6ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-weight:900;font-size:1.02rem}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.tab[aria-selected=\"true\"] small{color:#fdf2ff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:2px solid var(--line);border-radius:14px;background:var(--card)}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--pink-soft);color:var(--pink)}\n.tip{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--purple)}\n.warn{border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:var(--pink);margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.items{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px}\n.it{border:2px solid var(--line);border-radius:16px;background:var(--card);padding:8px;text-align:center;font-weight:800;font-size:.92rem}\n.it .em{font-size:2.2rem;line-height:1.2;display:block}\n.it .vote{display:flex;gap:4px;justify-content:center;margin-top:6px}\n.it .vote button{width:40px;height:34px;border-radius:10px;border:2px solid var(--line);background:var(--card);font-size:1rem}\n.it.like{border-color:#22c55e;background:var(--green-soft)}.it.dis{border-color:#f9a8d4;background:var(--pink-soft);opacity:.75}\n.it.like .vote .up{background:#22c55e;border-color:#22c55e}.it.dis .vote .down{background:#ec4899;border-color:#ec4899}\n.recs{display:grid;gap:8px}\n.rc{display:flex;gap:10px;align-items:center;border-radius:16px;padding:10px 12px;background:var(--purple-soft);font-weight:800}\n.rc .em{font-size:2rem}.rc small{display:block;color:var(--muted);font-weight:700}\n.rc .score{margin-left:auto;font-family:\"Baloo 2\",sans-serif;font-size:1.2rem;color:var(--purple)}\n.prof{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}\n.prof span{border-radius:999px;padding:3px 10px;font-weight:800;font-size:.88rem}\n.feed{display:flex;gap:6px;flex-wrap:wrap;min-height:46px;padding:8px;border-radius:14px;background:var(--blue-soft);margin-top:8px}\n.feed span{font-size:1.6rem}\n.dv{height:16px;border-radius:99px;background:var(--purple-soft);overflow:hidden;margin:6px 0}\n.dv i{display:block;height:100%;background:linear-gradient(90deg,#3b82f6,#22c55e);transition:width .3s}";
  const CLASS1_AI_LAB_THEME = ":root,\n:root[data-theme=\"dark\"]{\n  --bg:#ffffff!important;\n  --card:#ffffff!important;\n  --ink:#344054!important;\n  --muted:#667085!important;\n  --line:#EDE9FE!important;\n  --pink:#EC4899!important;\n  --pink-soft:#FFF1F7!important;\n  --purple:#7C3AED!important;\n  --purple-soft:#F5F3FF!important;\n  --green:#10B981!important;\n  --green-soft:#ECFDF3!important;\n  --blue:#3B82F6!important;\n  --blue-soft:#EFF8FF!important;\n  --red:#E11D48!important;\n  --red-soft:#FFF1F2!important;\n  --paper:#ffffff!important;\n  --c1:#EC4899!important;\n  --c2:#8B5CF6!important;\n  --c3:#3B82F6!important;\n  --c4:#10B981!important;\n}\nhtml,body{background:#fff!important;color:var(--ink)!important}\n.hero{\n  background:linear-gradient(135deg,#FFF7FB 0%,#FAF5FF 52%,#EFF8FF 100%)!important;\n  border:1px solid #E9D5FF!important;\n  box-shadow:0 6px 16px rgba(124,58,237,.08)!important;\n}\n.hero-icon{\n  background:#F5F3FF!important;\n  border:1px solid #DDD6FE!important;\n  box-shadow:0 4px 10px rgba(124,58,237,.07)!important;\n}\n.hero h1{color:#6D28D9!important}\n.card,.step{\n  border-width:1px!important;\n  border-color:#EDE9FE!important;\n  box-shadow:0 5px 14px rgba(76,29,149,.055)!important;\n}\n.card:nth-of-type(3n+1),.step:nth-child(3n+1){background:#FFF9FC!important}\n.card:nth-of-type(3n+2),.step:nth-child(3n+2){background:#FBF9FF!important}\n.card:nth-of-type(3n),.step:nth-child(3n){background:#F8FCFF!important}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.chart,.plane,.rl,.tl,.kidpick button,table.ex button{\n  border-width:1px!important;\n}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.tl,table.ex button,.kidpick button{\n  background:#fff!important;\n}\n.tab[aria-selected=\"true\"],.seg button[aria-pressed=\"true\"]{\n  background:linear-gradient(90deg,#EC4899,#8B5CF6)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n}\n.btn.main{\n  background:linear-gradient(90deg,#EC4899,#A855F7,#7C3AED)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(139,92,246,.16)!important;\n}\n.btn.cool{\n  background:linear-gradient(90deg,#3B82F6,#10B981)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(59,130,246,.13)!important;\n}\n.tip{\n  background:#EFF8FF!important;\n  border:1px solid #BFDBFE!important;\n  color:#344054!important;\n}\n.warn{\n  background:#FFF1F7!important;\n  border:1px solid #FBCFE8!important;\n  color:#BE185D!important;\n}\n.msg{\n  background:#EFF8FF!important;\n  border:1px solid #DBEAFE!important;\n  color:#344054!important;\n}\n.msg.ok{background:#ECFDF3!important;border-color:#BBF7D0!important;color:#047857!important}\n.msg.no{background:#FFF1F7!important;border-color:#FBCFE8!important;color:#BE185D!important}\n.stat,.sc,.rc,.gr,table.ex td{background:#F5F3FF!important}\n.feed,.use{background:#EFF8FF!important}\n.prof span{border:1px solid rgba(148,163,184,.18)!important}\n.it.like,.al.yes,.kidpick button.ok{background:#ECFDF3!important;border-color:#86EFAC!important}\n.it.dis,.al.no,.kidpick button.no{background:#FFF1F7!important;border-color:#F9A8D4!important}\n.snd.on,.sh:focus-visible,.sw[aria-pressed=\"true\"]{border-color:#C4B5FD!important}\n.track{background:#F5F3FF!important}\ninput[type=\"range\"]{accent-color:#8B5CF6}\n@media (max-width:640px){\n  .wrap{padding-left:10px;padding-right:10px}\n}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🎯</div>\n    <div>\n      <h1>AI gợi ý cho bạn <span class=\"ai\">✨ AI</span></h1>\n      <p>Con chấm điểm con vật, món ăn, hoạt động con thích. Máy học sở thích của con rồi gợi ý thêm, giống cách các ứng dụng xem video và mua sắm gợi ý cho người dùng.</p>\n    </div>\n  </header>\n\n  <div class=\"tabs\" role=\"tablist\">\n    <button class=\"tab\" role=\"tab\" aria-selected=\"true\" data-tab=\"rate\">👍 Chấm điểm và nhận gợi ý</button>\n    <button class=\"tab\" role=\"tab\" aria-selected=\"false\" data-tab=\"bubble\">🫧 Bẫy \"xem mãi không dừng\"</button>\n  </div>\n  <section id=\"pRate\" class=\"grid\" style=\"margin-top:0\">\n    <div class=\"card\">\n      <h2>Con thích hay không thích?</h2>\n      <p class=\"lead\">Bấm 👍 với thứ con thích, 👎 với thứ con không thích. Chấm càng nhiều, máy càng hiểu con.</p>\n      <div class=\"items\" id=\"items\"></div>\n    </div>\n    <div>\n      <div class=\"card\">\n        <h2>🎯 Máy gợi ý cho con</h2>\n        <div class=\"recs\" id=\"recs\"></div>\n        <p class=\"lead\" style=\"margin:12px 0 0\">Máy đoán con thích những đặc điểm này:</p>\n        <div class=\"prof\" id=\"prof\"></div>\n      </div>\n      <div class=\"tip\"><b>Máy gợi ý như thế nào?</b> Mỗi thứ đều có các đặc điểm, ví dụ con mèo: dễ thương, có lông, ở trong nhà. Khi con thích một thứ, máy cộng điểm cho các đặc điểm của nó. Rồi máy tìm những thứ con chưa chấm có nhiều đặc điểm được điểm cao nhất. YouTube, các trang mua sắm cũng gợi ý theo cách tương tự, nhưng dùng rất nhiều dữ liệu hơn.</div>\n    </div>\n  </section>\n  <section id=\"pBubble\" class=\"grid hidden\" style=\"margin-top:0\">\n    <div class=\"card\">\n      <h2>🫧 Nếu chỉ xem theo gợi ý thì sao?</h2>\n      <p class=\"lead\">Mỗi lần bấm, máy cho con xem thứ nó đoán con thích nhất, và con \"thích\" luôn thứ đó. Xem điều gì xảy ra nhé!</p>\n      <div class=\"row\"><button class=\"btn main\" id=\"auto\">▶ Xem theo gợi ý 1 lần</button><button class=\"btn cool\" id=\"explore\">🎲 Khám phá điều mới</button><button class=\"btn\" id=\"bReset\">↺ Bắt đầu lại</button></div>\n      <p class=\"lead\" style=\"margin:12px 0 0\">Những thứ con đã xem:</p>\n      <div class=\"feed\" id=\"feed\"></div>\n      <p class=\"lead\" style=\"margin:12px 0 0\">Độ đa dạng (con được xem bao nhiêu loại khác nhau):</p>\n      <div class=\"dv\"><i id=\"dv\"></i></div><p class=\"lead\" id=\"dvTxt\" style=\"margin:0\"></p>\n      <div class=\"msg\" id=\"bMsg\"></div>\n    </div>\n    <div>\n      <div class=\"warn\">⚠️ <b>Gợi ý được làm ra để con xem mãi không muốn dừng.</b> Càng xem theo gợi ý, con càng chỉ thấy một kiểu nội dung, giống như ở trong một bong bóng.</div>\n      <div class=\"tip\"><b>Bí kíp dùng gợi ý thông minh:</b><br>⏰ Hẹn giờ với bố mẹ trước khi xem.<br>🎲 Thỉnh thoảng tự tìm điều mới, đừng chỉ bấm theo gợi ý.<br>🤔 Tự hỏi: mình xem vì thích, hay vì máy cứ đưa ra?</div>\n    </div>\n  </section>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="AI gợi ý cho bạn" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
