/* Epsilon Edu - Mạch điện vui
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "circuitLab";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;speechSynthesis.speak(u)}catch(e){}}\n\n/* ---------- vẽ linh kiện ---------- */\n// mạch hình chữ nhật, 4 ô: trên, phải, dưới, trái\nconst SLOTS=[{x:300,y:90,v:false},{x:500,y:210,v:true},{x:300,y:330,v:false},{x:100,y:210,v:true}];\nconst LOOP='M100,90 H500 V330 H100 Z';\nfunction comp(type,state,glow){\n  switch(type){\n    case'battery':return`<rect x=\"-38\" y=\"-17\" width=\"68\" height=\"34\" rx=\"7\" fill=\"#22c55e\" stroke=\"#15803d\" stroke-width=\"3\"/><rect x=\"-38\" y=\"-17\" width=\"22\" height=\"34\" rx=\"6\" fill=\"#1f2937\"/>\n      <rect x=\"30\" y=\"-8\" width=\"8\" height=\"16\" rx=\"2\" fill=\"#94a3b8\"/><text x=\"10\" y=\"7\" text-anchor=\"middle\" font-size=\"20\" font-weight=\"900\" fill=\"#fff\">+</text><text x=\"-27\" y=\"7\" text-anchor=\"middle\" font-size=\"20\" font-weight=\"900\" fill=\"#fff\">−</text>`;\n    case'bulb':{const g=glow||0;return`${g?`<circle r=\"${46+g*20}\" fill=\"url(#glow)\" opacity=\"${Math.min(1,.45+g*.35)}\"/>`:''}\n      <rect x=\"-11\" y=\"10\" width=\"22\" height=\"16\" rx=\"3\" fill=\"#94a3b8\" stroke=\"#64748b\" stroke-width=\"2\"/><line x1=\"-38\" y1=\"0\" x2=\"-10\" y2=\"18\" stroke=\"var(--wire)\" stroke-width=\"4\"/><line x1=\"38\" y1=\"0\" x2=\"10\" y2=\"18\" stroke=\"var(--wire)\" stroke-width=\"4\"/>\n      <circle cy=\"-8\" r=\"22\" fill=\"${g?'#fde047':'#e2e8f0'}\" stroke=\"${g?'#f59e0b':'#94a3b8'}\" stroke-width=\"3\" opacity=\".95\"/>\n      <path d=\"M-7,10 L-7,-6 Q0,-18 7,-6 L7,10\" fill=\"none\" stroke=\"${g?'#b45309':'#64748b'}\" stroke-width=\"2.5\"/>`;}\n    case'switch':return`<rect x=\"-40\" y=\"-14\" width=\"80\" height=\"28\" rx=\"8\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"2\"/>\n      <circle cx=\"-26\" cy=\"0\" r=\"6\" fill=\"#475569\"/><circle cx=\"26\" cy=\"0\" r=\"6\" fill=\"#475569\"/>\n      <line x1=\"-26\" y1=\"0\" x2=\"${state?26:16}\" y2=\"${state?0:-24}\" stroke=\"#ef4444\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <text y=\"34\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"900\" fill=\"var(--ink)\">${state?'ĐÓNG':'MỞ'}</text>`;\n    case'wire':return`<line x1=\"-40\" y1=\"0\" x2=\"40\" y2=\"0\" stroke=\"var(--wire)\" stroke-width=\"5\" stroke-linecap=\"round\"/>`;\n    case'gap':return`<circle cx=\"-34\" cy=\"0\" r=\"7\" fill=\"#f97316\"/><circle cx=\"34\" cy=\"0\" r=\"7\" fill=\"#f97316\"/>`;\n  }return'';}\nfunction wires(open){// dây nối giữa các ô\n  return`<path d=\"M140,90 H260 M340,90 H460 Q500,90 500,130 V170 M500,250 V290 Q500,330 460,330 H340 M260,330 H140 Q100,330 100,290 V250 M100,170 V130 Q100,90 140,90\" fill=\"none\" stroke=\"var(--wire)\" stroke-width=\"5\" stroke-linecap=\"round\"/>`;}\nconst DEFS=`<defs><radialGradient id=\"glow\"><stop offset=\"0\" stop-color=\"#fef08a\" stop-opacity=\"1\"/><stop offset=\".55\" stop-color=\"#fde047\" stop-opacity=\".45\"/><stop offset=\"1\" stop-color=\"#fde047\" stop-opacity=\"0\"/></radialGradient></defs>`;\nfunction flowPath(on,danger){return on?`<path d=\"M100,90 H500 V330 H100 Z\" fill=\"none\" stroke=\"${danger?'#ef4444':'#facc15'}\" stroke-width=\"4\" stroke-dasharray=\"6 14\" class=\"flow\" stroke-linecap=\"round\" pointer-events=\"none\"/>`:'';}\n\n/* ---------- LẮP MẠCH ---------- */\nconst PAL=[['battery','🔋','Pin'],['bulb','💡','Bóng đèn'],['switch','🔘','Công tắc'],['wire','➖','Dây nối'],['remove','🧽','Gỡ ra']];\nlet tool='battery',slots=[null,null,null,null],done=new Set();\nconst TASKS=[['lit','Làm cho bóng đèn sáng'],['switch','Lắp công tắc, rồi dùng công tắc để tắt và bật đèn'],['bright','Làm cho bóng đèn sáng hơn'],['two','Thắp sáng 2 bóng đèn cùng lúc']];\nlet swToggles=0;\nfunction renderPalette(){$('palette').innerHTML=PAL.map(([k,ic,n])=>`<button class=\"pc\" data-tool=\"${k}\" aria-pressed=\"${tool===k}\"><span class=\"ic\">${ic}</span>${n}</button>`).join('');\n  $('palette').querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{tool=b.dataset.tool;renderPalette();});}\nfunction evaluate(){const n=t=>slots.filter(s=>s&&s.t===t).length;const pins=n('battery'),bulbs=n('bulb'),sw=slots.filter(s=>s&&s.t==='switch');\n  const empty=slots.some(s=>!s),openSw=sw.some(s=>!s.on);const closed=!empty&&!openSw;\n  if(empty)return{closed:false,txt:'Mạch đang hở: còn chỗ chưa nối. Dòng điện chỉ chạy được khi mạch kín, nối liền một vòng.',cls:''};\n  if(!pins)return{closed:false,txt:'Mạch kín rồi nhưng chưa có pin. Cần có nguồn điện thì mới có dòng điện.',cls:'no'};\n  if(openSw)return{closed:false,txt:'Công tắc đang MỞ nên mạch bị ngắt, dòng điện không chạy qua. Bấm vào công tắc để đóng lại.',cls:'no',pins,bulbs};\n  if(!bulbs)return{closed:true,short:true,txt:'⚠️ Đoản mạch! Pin bị nối thẳng bằng dây mà không có bóng đèn. Pin sẽ nóng lên rất nhanh và hỏng, có thể gây bỏng. Không bao giờ làm thế với pin thật nhé!',cls:'danger'};\n  const glow=Math.max(.35,Math.min(2,pins/bulbs));\n  let txt=`💡 Đèn sáng! Mạch kín: dòng điện đi từ pin, qua dây và bóng đèn, rồi quay về pin.`;\n  if(bulbs>1)txt+=` Có ${bulbs} bóng đèn cùng chia dòng điện${pins<bulbs?' nên mỗi bóng sáng yếu hơn':''}.`;\n  if(pins>bulbs)txt+=` Có ${pins} pin nên đèn sáng mạnh hơn.`;\n  return{closed:true,glow,txt,cls:'ok',pins,bulbs,sw:sw.length};}\nfunction renderBuild(){const r=evaluate();let h=DEFS+wires()+flowPath(r.closed,r.short);\n  slots.forEach((s,i)=>{const S=SLOTS[i];h+=`<g class=\"slot\" data-slot=\"${i}\" transform=\"translate(${S.x},${S.y}) rotate(${S.v?90:0})\">`;\n    h+=`<rect class=\"hit\" x=\"-46\" y=\"-40\" width=\"92\" height=\"80\"/>`;\n    if(!s)h+=`<circle class=\"ring\" r=\"26\" fill=\"var(--card)\" stroke=\"#c4b5fd\" stroke-width=\"3\" stroke-dasharray=\"6 5\"/><text y=\"9\" text-anchor=\"middle\" font-size=\"26\" font-weight=\"900\" fill=\"#a78bfa\" transform=\"rotate(${S.v?-90:0})\">+</text>`;\n    else h+=comp(s.t,s.on,r.closed&&!r.short?r.glow:0);h+='</g>';});\n  if(r.short)h+=`<text x=\"300\" y=\"215\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"900\" fill=\"#ef4444\">🔥 ĐOẢN MẠCH!</text>`;\n  $('bBoard').innerHTML=h;const m=$('bMsg');m.className='msg '+(r.cls||'');m.textContent=r.txt;\n  if(r.closed&&!r.short){done.add('lit');if(r.pins>r.bulbs)done.add('bright');if(r.bulbs>=2)done.add('two');}\n  $('tasks').innerHTML=TASKS.map(([k,t])=>`<li class=\"${done.has(k)?'done':''}\"><span class=\"ck\">${done.has(k)?'✓':''}</span>${t}</li>`).join('');}\n$('bBoard').addEventListener('click',e=>{const g=e.target.closest('[data-slot]');if(!g)return;const i=+g.dataset.slot,s=slots[i];\n  if(tool==='remove')slots[i]=null;\n  else if(s&&s.t==='switch'){s.on=!s.on;const n=t=>slots.filter(x=>x&&x.t===t).length;if(!slots.some(x=>!x)&&n('battery')&&n('bulb'))swToggles++;if(swToggles>=2)done.add('switch');}\n  else if(!s||s.t!==tool)slots[i]={t:tool,on:false};\n  renderBuild();const r=evaluate();if(r.closed&&!r.short)speak('Đèn sáng rồi!');else if(r.short)speak('Đoản mạch! Nguy hiểm!');});\n\n/* ---------- THỬ VẬT ---------- */\nconst OBJ=[['🔩','Đinh sắt',1],['🪙','Đồng xu',1],['🔑','Chìa khóa',1],['🥄','Thìa inox',1],['📎','Kẹp giấy sắt',1],['✨','Giấy bạc',1],\n  ['📏','Thước nhựa',0],['🥢','Đũa gỗ',0],['📄','Tờ giấy',0],['🎈','Bóng bay cao su',0],['🥛','Cốc thủy tinh',0],['🧦','Chiếc tất vải',0],['🖍️','Bút sáp màu',0],['🧶','Cuộn len',0]];\nlet tested={},current=null,guessOk=0,guessTot=0;\nfunction renderTest(lit,obj){let h=DEFS+wires()+flowPath(!!lit,false);\n  h+=`<g transform=\"translate(100,210) rotate(90)\">${comp('battery')}</g>`;\n  h+=`<g transform=\"translate(300,90)\">${comp('bulb',0,lit?1:0)}</g>`;\n  h+=`<g transform=\"translate(300,330)\">${comp('switch',true)}</g>`;\n  h+=`<g transform=\"translate(500,210) rotate(90)\">${comp('gap')}</g>`;\n  h+=obj?`<text x=\"500\" y=\"226\" text-anchor=\"middle\" font-size=\"44\">${obj[0]}</text><text x=\"560\" y=\"214\" font-size=\"14\" font-weight=\"900\" fill=\"var(--ink)\" text-anchor=\"middle\"> </text>`\n    :`<text x=\"535\" y=\"216\" font-size=\"14\" font-weight=\"900\" fill=\"var(--muted)\">chỗ hở</text>`;\n  $('tBoard').innerHTML=h;}\nfunction renderShelf(){$('shelf').innerHTML=OBJ.map((o,i)=>`<button class=\"obj\" data-o=\"${i}\" ${i in tested?'disabled':''} aria-pressed=\"${current===i}\"><span class=\"em\">${o[0]}</span>${o[1]}</button>`).join('');\n  $('shelf').querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>pickObj(+b.dataset.o));\n  const yes=[],no=[];for(const i in tested)(OBJ[i][2]?yes:no).push(OBJ[i]);\n  $('colYes').innerHTML=yes.map(o=>`<span class=\"it\">${o[0]} ${o[1]}</span>`).join('');$('colNo').innerHTML=no.map(o=>`<span class=\"it\">${o[0]} ${o[1]}</span>`).join('');\n  $('tScore').textContent=`Con đoán đúng ${guessOk} / ${guessTot} lần`;\n  $('tConclusion').textContent=Object.keys(tested).length>=6?'Con có thấy không? Các vật làm bằng kim loại (sắt, đồng, nhôm, inox) đều dẫn điện. Nhựa, gỗ, giấy, cao su, thủy tinh, vải không dẫn điện, nên người ta dùng chúng để bọc dây điện và làm tay cầm dụng cụ điện.':'Thử thêm nhiều đồ vật để tìm ra quy luật nhé!';}\nfunction pickObj(i){current=i;renderShelf();renderTest(false,OBJ[i]);const p=$('predict');p.classList.remove('hidden');\n  p.innerHTML=`Con đoán xem: đặt <b>${OBJ[i][1]}</b> vào mạch thì đèn sẽ thế nào?<div class=\"row\"><button class=\"btn y\" data-g=\"1\">💡 Đèn sáng</button><button class=\"btn n\" data-g=\"0\">⚫ Đèn không sáng</button></div>`;\n  $('tMsg').className='msg';$('tMsg').textContent='Hãy đoán trước, rồi xem kết quả nhé!';\n  p.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>test(i,+b.dataset.g));}\nfunction test(i,g){const o=OBJ[i],c=o[2];guessTot++;if(g===c)guessOk++;tested[i]=1;current=null;$('predict').classList.add('hidden');renderTest(!!c,o);\n  const m=$('tMsg');m.className='msg '+(g===c?'ok':'no');\n  m.textContent=(g===c?'🎉 Con đoán đúng! ':'Ồ, khác với con đoán! ')+(c?`Đèn sáng: ${o[1]} là vật dẫn điện.`:`Đèn không sáng: ${o[1]} là vật cách điện.`);\n  speak(c?`${o[1]} là vật dẫn điện`:`${o[1]} là vật cách điện`);renderShelf();}\n\n/* ---------- tabs ---------- */\ndocument.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===b));\n  $('pBuild').classList.toggle('hidden',b.dataset.tab!=='build');$('pTest').classList.toggle('hidden',b.dataset.tab!=='test');});\nrenderPalette();renderBuild();renderTest(false,null);renderShelf();$('tMsg').textContent='Chọn một đồ vật bên dưới để thử.';\n})();";
  const TOOL_CSS = ":root{\n  --bg:#ffffff;--card:#ffffff;--ink:#334155;--muted:#64748b;--line:#eadcff;\n  --purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;--red:#e11d48;--red-soft:#fff1f2;\n  --orange:#c2410c;--orange-soft:#fff7ed;--blue-soft:#eff6ff;--board:#f1f5f9;--wire:#475569;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:#ffffff;color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton{font:inherit;color:inherit;cursor:pointer}\nbutton:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid var(--line);border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple)}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}\n.tab{min-height:54px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-size:1.08rem;font-weight:900}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:14px;align-items:start}\n@media (max-width:880px){.grid{grid-template-columns:1fr}}\n.card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:16px;box-shadow:0 8px 22px rgba(76,29,149,.07)}\n.card h2{margin:0 0 6px;font-size:1.4rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\nsvg.board{display:block;width:100%;height:auto;border-radius:18px;background:var(--board);touch-action:manipulation}\n.slot{cursor:pointer}\n.slot .hit{fill:transparent}\n.slot:hover .ring{stroke:#8b5cf6}\n.palette{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 0}\n.pc{min-height:52px;padding:0 14px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900;display:inline-flex;align-items:center;gap:8px}\n.pc .ic{font-size:1.4rem}\n.pc[aria-pressed=\"true\"]{border-color:var(--purple);background:var(--purple-soft);color:var(--purple);box-shadow:0 0 0 3px rgba(124,58,237,.18)}\n.msg{min-height:3em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--orange-soft);color:var(--orange)}.msg.danger{background:var(--red-soft);color:var(--red)}\n.tasks{display:grid;gap:8px;margin:0;padding:0;list-style:none}\n.tasks li{display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:14px;background:var(--purple-soft);font-weight:800}\n.tasks li.done{background:var(--green-soft);color:var(--green)}\n.tasks .ck{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--card);border:2px solid var(--line);flex:none}\n.tasks li.done .ck{background:var(--green);border-color:var(--green);color:#fff}\n.safety{margin-top:14px;border-radius:18px;padding:14px;background:var(--red-soft)}\n.safety h3{margin:0 0 6px;color:var(--red);font-size:1.15rem}\n.safety ul{margin:0;padding-left:20px;font-weight:700}\n.safety li+li{margin-top:4px}\n.shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;margin-top:12px}\n.obj{border:2px solid var(--line);border-radius:16px;background:var(--card);padding:8px 6px;font-weight:800;font-size:.9rem;text-align:center}\n.obj .em{display:block;font-size:2rem;line-height:1.2}\n.obj:disabled{opacity:.4;cursor:default}\n.obj[aria-pressed=\"true\"]{border-color:var(--purple);background:var(--purple-soft)}\n.predict{margin-top:12px;border-radius:16px;padding:12px;background:var(--purple-soft);font-weight:800}\n.predict .row{margin-top:8px}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:48px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.y{background:#fde047;border-color:#facc15;color:#422006}\n.btn.n{background:#475569;border-color:#475569;color:#fff}\n.cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.col{border-radius:16px;padding:10px;min-height:120px}\n.col h3{margin:0 0 6px;font-size:1.05rem}\n.col.yes{background:#fef9c3;color:#713f12}.col.no{background:#e2e8f0;color:#1e293b}\n.col .items{display:flex;flex-wrap:wrap;gap:6px}\n.col .it{background:rgba(255,255,255,.75);border-radius:10px;padding:2px 8px;font-weight:800;font-size:.9rem}\n.score{font-weight:900;color:var(--muted)}\n.hidden{display:none !important}\n@keyframes flow{to{stroke-dashoffset:-40}}\n.flow{animation:flow .6s linear infinite}\n@media (prefers-reduced-motion:reduce){.flow{animation:none}}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">💡</div>\n    <div>\n      <h1>Mạch điện vui</h1>\n      <p>Lắp mạch điện đơn giản để thắp sáng bóng đèn, và tìm hiểu vật nào dẫn điện, vật nào cách điện. Khoa học lớp 5.</p>\n    </div>\n  </header>\n\n  <div class=\"tabs\" role=\"tablist\">\n    <button class=\"tab\" role=\"tab\" aria-selected=\"true\" data-tab=\"build\">🔧 Lắp mạch điện</button>\n    <button class=\"tab\" role=\"tab\" aria-selected=\"false\" data-tab=\"test\">🧪 Vật dẫn điện hay cách điện?</button>\n  </div>\n\n  <!-- LẮP MẠCH -->\n  <section id=\"pBuild\" class=\"grid\">\n    <div class=\"card\">\n      <h2>Bảng lắp mạch</h2>\n      <p class=\"lead\">Chọn một linh kiện bên dưới, rồi bấm vào ô trống trên mạch để lắp. Bấm vào công tắc để bật hoặc tắt.</p>\n      <svg class=\"board\" id=\"bBoard\" viewBox=\"0 0 600 400\" aria-label=\"Bảng mạch điện\"></svg>\n      <div class=\"palette\" id=\"palette\"></div>\n      <div class=\"msg\" id=\"bMsg\" aria-live=\"polite\"></div>\n    </div>\n    <div class=\"card\">\n      <h2>🎯 Thử thách</h2>\n      <ul class=\"tasks\" id=\"tasks\"></ul>\n      <div class=\"safety\">\n        <h3>⚠️ An toàn điện</h3>\n        <ul>\n          <li>Thí nghiệm này chỉ dùng pin nhỏ. Điện trong nhà (ổ cắm) rất mạnh, có thể gây chết người.</li>\n          <li>Không cắm que, đinh hay ngón tay vào ổ điện.</li>\n          <li>Không chạm vào đồ điện khi tay ướt.</li>\n          <li>Thấy dây điện bị đứt, hở thì tránh xa và báo ngay cho người lớn.</li>\n          <li>Không thả diều, trèo cây gần đường dây điện.</li>\n        </ul>\n      </div>\n    </div>\n  </section>\n\n  <!-- THỬ VẬT -->\n  <section id=\"pTest\" class=\"grid hidden\">\n    <div class=\"card\">\n      <h2>Thử từng đồ vật</h2>\n      <p class=\"lead\">Đặt đồ vật vào chỗ hở của mạch. Nếu đèn sáng, đồ vật đó cho dòng điện chạy qua: đó là vật dẫn điện.</p>\n      <svg class=\"board\" id=\"tBoard\" viewBox=\"0 0 600 400\" aria-label=\"Mạch thử vật\"></svg>\n      <div class=\"predict hidden\" id=\"predict\"></div>\n      <div class=\"msg\" id=\"tMsg\" aria-live=\"polite\"></div>\n      <div class=\"shelf\" id=\"shelf\"></div>\n    </div>\n    <div class=\"card\">\n      <h2>📋 Kết quả thí nghiệm</h2>\n      <p class=\"score\" id=\"tScore\">Con đoán đúng 0 / 0 lần</p>\n      <div class=\"cols\">\n        <div class=\"col yes\"><h3>💡 Vật dẫn điện</h3><div class=\"items\" id=\"colYes\"></div></div>\n        <div class=\"col no\"><h3>⚫ Vật cách điện</h3><div class=\"items\" id=\"colNo\"></div></div>\n      </div>\n      <p class=\"lead\" style=\"margin-top:12px\" id=\"tConclusion\"></p>\n    </div>\n  </section>\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Mạch điện vui" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
