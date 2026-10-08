/* Epsilon Edu - Mạch điện vui
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "circuitLab";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet lang='vi';\nconst L=(vi,en)=>lang==='en'?en:vi;\nconst esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]));\nconst STATIC={\n heroTitle:['Mạch điện vui','Fun Electric Circuits'],\n heroDesc:['Lắp mạch điện đơn giản để thắp sáng bóng đèn, và tìm hiểu vật nào dẫn điện, vật nào cách điện. Khoa học lớp 5.',\n           'Build a simple circuit to light a bulb, and explore electrical conductors and insulators. Grade 5 Science.'],\n tabBuild:['🔧 Lắp mạch điện','🔧 Build a Circuit'],\n tabTest:['🧪 Vật dẫn điện hay cách điện?','🧪 Conductor or Insulator?'],\n buildTitle:['Bảng lắp mạch','Circuit Workbench'],\n buildLead:['Chọn một linh kiện bên dưới, rồi bấm vào ô trống trên mạch để lắp. Bấm vào công tắc để bật hoặc tắt.',\n            'Select a component below, then tap an empty slot in the circuit to place it. Tap the switch to turn it on or off.'],\n tasksTitle:['🎯 Thử thách','🎯 Challenges'],\n safetyTitle:['⚠️ An toàn điện','⚠️ Electrical Safety'],\n safety1:['Thí nghiệm này chỉ dùng pin nhỏ. Điện trong nhà (ổ cắm) rất mạnh, có thể gây chết người.',\n          'This simulation uses small batteries only. Electricity from wall outlets is extremely dangerous and can be deadly.'],\n safety2:['Không cắm que, đinh hay ngón tay vào ổ điện.','Never put sticks, nails, or fingers into an electrical outlet.'],\n safety3:['Không chạm vào đồ điện khi tay ướt.','Never touch electrical equipment with wet hands.'],\n safety4:['Thấy dây điện bị đứt, hở thì tránh xa và báo ngay cho người lớn.',\n          'If you see a damaged or exposed wire, stay away and tell an adult right away.'],\n safety5:['Không thả diều, trèo cây gần đường dây điện.','Never fly kites or climb trees near power lines.'],\n testTitle:['Thử từng đồ vật','Test Different Objects'],\n testLead:['Đặt đồ vật vào chỗ hở của mạch. Nếu đèn sáng, đồ vật đó cho dòng điện chạy qua: đó là vật dẫn điện.',\n           'Place an object in the gap. If the bulb lights up, current can flow through it: the object is a conductor.'],\n resultsTitle:['📋 Kết quả thí nghiệm','📋 Experiment Results'],\n colYesTitle:['💡 Vật dẫn điện','💡 Conductors'],\n colNoTitle:['⚫ Vật cách điện','⚫ Insulators'],\n bBoardAria:['Bảng mạch điện','Electric circuit workbench'],\n tBoardAria:['Mạch thử vật','Object-testing circuit']\n};\nfunction applyStatic(){\n  document.documentElement.lang=lang==='en'?'en':'vi';\n  document.querySelectorAll('[data-i18n]').forEach(el=>{const v=STATIC[el.dataset.i18n];if(v)el.textContent=v[lang==='en'?1:0];});\n  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{const v=STATIC[el.dataset.i18nAria];if(v)el.setAttribute('aria-label',v[lang==='en'?1:0]);});\n  document.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===lang)));\n}\nfunction stopSpeech(){\n  try{if(window.speechSynthesis)window.speechSynthesis.cancel()}catch(e){}\n  if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-stop-speech',id:window.__CLASS1_TOOL_INSTANCE_ID__},'*')}catch(e){}}\n}\nconst FEMALE_EN_US=/(?:Samantha|Ava|Allison|Susan|Zira|Jenny|Aria|Joanna|Salli|Kimberly|Kendra|Ivy|Emma|Michelle|Ana|Jane|Sarah|Monica|Shelley)/i;\nfunction speechNotice(message){\n  let el=$('speechNotice');if(!el){el=document.createElement('div');el.id='speechNotice';el.className='speech-notice';el.setAttribute('role','status');document.body.appendChild(el);}\n  el.textContent=message;el.classList.add('visible');\n}\nfunction speak(t){\n  const text=String(t||'').trim();if(!text)return;\n  if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text,lang:lang==='en'?'en-US':'vi-VN'},'*')}catch(e){}return;}\n  try{\n    if(!window.speechSynthesis)return;\n    window.speechSynthesis.cancel();\n    const u=new SpeechSynthesisUtterance(text);u.lang=lang==='en'?'en-US':'vi-VN';u.rate=.95;\n    const voices=window.speechSynthesis.getVoices();\n    if(lang==='en'){\n      const female=voices.find(v=>/^en-US$/i.test(String(v.lang||''))&&FEMALE_EN_US.test(String(v.name||'')));\n      if(!female){speechNotice('This device does not have a suitable US female English voice.');return;}\n      u.voice=female;\n    }else{const viVoice=voices.find(v=>/^vi/i.test(v.lang));if(viVoice)u.voice=viVoice;}\n    window.speechSynthesis.speak(u);\n  }catch(e){speechNotice(L('Chưa thể phát giọng đọc.','Voice playback is unavailable.'));}\n}\nwindow.addEventListener('message',e=>{\n  if(!window.__CLASS1_TOOL_INSTANCE_ID__||e.source!==parent||!e.data||e.data.id!==window.__CLASS1_TOOL_INSTANCE_ID__)return;\n  if(e.data.type==='class1-tool-tts-notice')speechNotice(String(e.data.message||''));\n});\n/* ---------- vẽ linh kiện ---------- */\n// mạch hình chữ nhật, 4 ô: trên, phải, dưới, trái\nconst SLOTS=[{x:300,y:90,v:false},{x:500,y:210,v:true},{x:300,y:330,v:false},{x:100,y:210,v:true}];\nconst LOOP='M100,90 H500 V330 H100 Z';\nfunction comp(type,state,glow){\n  switch(type){\n    case'battery':return`<rect x=\"-38\" y=\"-17\" width=\"68\" height=\"34\" rx=\"7\" fill=\"#22c55e\" stroke=\"#15803d\" stroke-width=\"3\"/><rect x=\"-38\" y=\"-17\" width=\"22\" height=\"34\" rx=\"6\" fill=\"#1f2937\"/>\n      <rect x=\"30\" y=\"-8\" width=\"8\" height=\"16\" rx=\"2\" fill=\"#94a3b8\"/><text x=\"10\" y=\"7\" text-anchor=\"middle\" font-size=\"20\" font-weight=\"900\" fill=\"#fff\">+</text><text x=\"-27\" y=\"7\" text-anchor=\"middle\" font-size=\"20\" font-weight=\"900\" fill=\"#fff\">−</text>`;\n    case'bulb':{const g=glow||0;return`${g?`<circle r=\"${46+g*20}\" fill=\"url(#glow)\" opacity=\"${Math.min(1,.45+g*.35)}\"/>`:''}\n      <rect x=\"-11\" y=\"10\" width=\"22\" height=\"16\" rx=\"3\" fill=\"#94a3b8\" stroke=\"#64748b\" stroke-width=\"2\"/><line x1=\"-38\" y1=\"0\" x2=\"-10\" y2=\"18\" stroke=\"var(--wire)\" stroke-width=\"4\"/><line x1=\"38\" y1=\"0\" x2=\"10\" y2=\"18\" stroke=\"var(--wire)\" stroke-width=\"4\"/>\n      <circle cy=\"-8\" r=\"22\" fill=\"${g?'#fde047':'#e2e8f0'}\" stroke=\"${g?'#f59e0b':'#94a3b8'}\" stroke-width=\"3\" opacity=\".95\"/>\n      <path d=\"M-7,10 L-7,-6 Q0,-18 7,-6 L7,10\" fill=\"none\" stroke=\"${g?'#b45309':'#64748b'}\" stroke-width=\"2.5\"/>`;}\n    case'switch':return`<rect x=\"-40\" y=\"-14\" width=\"80\" height=\"28\" rx=\"8\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"2\"/>\n      <circle cx=\"-26\" cy=\"0\" r=\"6\" fill=\"#475569\"/><circle cx=\"26\" cy=\"0\" r=\"6\" fill=\"#475569\"/>\n      <line x1=\"-26\" y1=\"0\" x2=\"${state?26:16}\" y2=\"${state?0:-24}\" stroke=\"#ef4444\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <text y=\"34\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"900\" fill=\"var(--ink)\">${state?L('ĐÓNG','CLOSED'):L('MỞ','OPEN')}</text>`;\n    case'wire':return`<line x1=\"-40\" y1=\"0\" x2=\"40\" y2=\"0\" stroke=\"var(--wire)\" stroke-width=\"5\" stroke-linecap=\"round\"/>`;\n    case'gap':return`<circle cx=\"-34\" cy=\"0\" r=\"7\" fill=\"#f97316\"/><circle cx=\"34\" cy=\"0\" r=\"7\" fill=\"#f97316\"/>`;\n  }return'';}\nfunction wires(open){// dây nối giữa các ô\n  return`<path d=\"M140,90 H260 M340,90 H460 Q500,90 500,130 V170 M500,250 V290 Q500,330 460,330 H340 M260,330 H140 Q100,330 100,290 V250 M100,170 V130 Q100,90 140,90\" fill=\"none\" stroke=\"var(--wire)\" stroke-width=\"5\" stroke-linecap=\"round\"/>`;}\nconst DEFS=`<defs><radialGradient id=\"glow\"><stop offset=\"0\" stop-color=\"#fef08a\" stop-opacity=\"1\"/><stop offset=\".55\" stop-color=\"#fde047\" stop-opacity=\".45\"/><stop offset=\"1\" stop-color=\"#fde047\" stop-opacity=\"0\"/></radialGradient></defs>`;\nfunction flowPath(on,danger){return on?`<path d=\"M100,90 H500 V330 H100 Z\" fill=\"none\" stroke=\"${danger?'#ef4444':'#facc15'}\" stroke-width=\"4\" stroke-dasharray=\"6 14\" class=\"flow\" stroke-linecap=\"round\" pointer-events=\"none\"/>`:'';}\n\n/* ---------- LẮP MẠCH ---------- */\nconst PAL=[['battery','🔋','Pin'],['bulb','💡','Bóng đèn'],['switch','🔘','Công tắc'],['wire','➖','Dây nối'],['remove','🧽','Gỡ ra']];\nconst PAL_EN={battery:'Battery',bulb:'Light bulb',switch:'Switch',wire:'Wire',remove:'Remove'};\nlet tool='battery',slots=[null,null,null,null],done=new Set();\nconst TASKS=[['lit','Làm cho bóng đèn sáng'],['switch','Lắp công tắc, rồi dùng công tắc để tắt và bật đèn'],['bright','Làm cho bóng đèn sáng hơn'],['two','Thắp sáng 2 bóng đèn cùng lúc']];\nconst TASK_EN={lit:'Light up a bulb',switch:'Add a switch, then use it to turn the bulb off and on',bright:'Make the bulb shine brighter',two:'Light up 2 bulbs at the same time'};\nlet swToggles=0;\nfunction renderPalette(){$('palette').innerHTML=PAL.map(([k,ic,n])=>`<button class=\"pc\" data-tool=\"${k}\" aria-pressed=\"${tool===k}\"><span class=\"ic\">${ic}</span>${esc(L(n,PAL_EN[k]))}</button>`).join('');\n  $('palette').querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{tool=b.dataset.tool;renderPalette();});}\nfunction evaluate(){const n=t=>slots.filter(s=>s&&s.t===t).length;const pins=n('battery'),bulbs=n('bulb'),sw=slots.filter(s=>s&&s.t==='switch');\n  const empty=slots.some(s=>!s),openSw=sw.some(s=>!s.on);const closed=!empty&&!openSw;\n  if(empty)return{closed:false,txt:L('Mạch đang hở: còn chỗ chưa nối. Dòng điện chỉ chạy được khi mạch kín, nối liền một vòng.',\n    'The circuit is open: some positions are not connected. Electric current can only flow around a complete, closed loop.'),cls:''};\n  if(!pins)return{closed:false,txt:L('Mạch kín rồi nhưng chưa có pin. Cần có nguồn điện thì mới có dòng điện.',\n    'The loop is closed, but there is no battery. A circuit needs a power source for electric current to flow.'),cls:'no'};\n  if(openSw)return{closed:false,txt:L('Công tắc đang MỞ nên mạch bị ngắt, dòng điện không chạy qua. Bấm vào công tắc để đóng lại.',\n    'The switch is OPEN, so the circuit is broken and current cannot flow. Tap the switch to close it.'),cls:'no',pins,bulbs};\n  if(!bulbs)return{closed:true,short:true,txt:L('⚠️ Đoản mạch! Pin bị nối thẳng bằng dây mà không có bóng đèn. Pin sẽ nóng lên rất nhanh và hỏng, có thể gây bỏng. Không bao giờ làm thế với pin thật nhé!',\n    '⚠️ Short circuit! The battery is connected directly by wires without a bulb. A real battery can quickly heat up, fail, and cause burns. Never try this with real batteries!'),cls:'danger'};\n  const glow=Math.max(.35,Math.min(2,pins/bulbs));\n  let txt=L('💡 Đèn sáng! Mạch kín: dòng điện đi từ pin, qua dây và bóng đèn, rồi quay về pin.',\n    '💡 The bulb is on! The loop is closed: current flows from the battery, through the wires and the bulb, and back to the battery.');\n  if(bulbs>1)txt+=L(` Có ${bulbs} bóng đèn cùng chia dòng điện${pins<bulbs?' nên mỗi bóng sáng yếu hơn':''}.`,\n    ` There are ${bulbs} bulbs sharing the current${pins<bulbs?', so each one is dimmer':''}.`);\n  if(pins>bulbs)txt+=L(` Có ${pins} pin nên đèn sáng mạnh hơn.`, ` There are ${pins} batteries, so the bulb glows brighter.`);\n  return{closed:true,glow,txt,cls:'ok',pins,bulbs,sw:sw.length};}\nfunction renderBuild(){const r=evaluate();let h=DEFS+wires()+flowPath(r.closed,r.short);\n  slots.forEach((s,i)=>{const S=SLOTS[i];h+=`<g class=\"slot\" data-slot=\"${i}\" transform=\"translate(${S.x},${S.y}) rotate(${S.v?90:0})\">`;\n    h+=`<rect class=\"hit\" x=\"-46\" y=\"-40\" width=\"92\" height=\"80\"/>`;\n    if(!s)h+=`<circle class=\"ring\" r=\"26\" fill=\"var(--card)\" stroke=\"#c4b5fd\" stroke-width=\"3\" stroke-dasharray=\"6 5\"/><text y=\"9\" text-anchor=\"middle\" font-size=\"26\" font-weight=\"900\" fill=\"#a78bfa\" transform=\"rotate(${S.v?-90:0})\">+</text>`;\n    else h+=comp(s.t,s.on,r.closed&&!r.short?r.glow:0);h+='</g>';});\n  if(r.short)h+=`<text x=\"300\" y=\"215\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"900\" fill=\"#ef4444\">🔥 ${L('ĐOẢN MẠCH!','SHORT CIRCUIT!')}</text>`;\n  $('bBoard').innerHTML=h;const m=$('bMsg');m.className='msg '+(r.cls||'');m.textContent=r.txt;\n  if(r.closed&&!r.short){done.add('lit');if(r.pins>r.bulbs)done.add('bright');if(r.bulbs>=2)done.add('two');}\n  $('tasks').innerHTML=TASKS.map(([k,t])=>`<li class=\"${done.has(k)?'done':''}\"><span class=\"ck\">${done.has(k)?'✓':''}</span>${esc(L(t,TASK_EN[k]))}</li>`).join('');}\n$('bBoard').addEventListener('click',e=>{const g=e.target.closest('[data-slot]');if(!g)return;const i=+g.dataset.slot,s=slots[i];\n  if(tool==='remove')slots[i]=null;\n  else if(s&&s.t==='switch'){s.on=!s.on;const n=t=>slots.filter(x=>x&&x.t===t).length;if(!slots.some(x=>!x)&&n('battery')&&n('bulb'))swToggles++;if(swToggles>=2)done.add('switch');}\n  else if(!s||s.t!==tool)slots[i]={t:tool,on:false};\n  renderBuild();const r=evaluate();if(r.closed&&!r.short)speak(L('Đèn sáng rồi!','The bulb is on!'));else if(r.short)speak(L('Đoản mạch! Nguy hiểm!','Short circuit! Danger!'));});\n\n/* ---------- THỬ VẬT ---------- */\nconst OBJ=[['🔩','Đinh sắt',1],['🪙','Đồng xu',1],['🔑','Chìa khóa',1],['🥄','Thìa inox',1],['📎','Kẹp giấy sắt',1],['✨','Giấy bạc',1],\n  ['📏','Thước nhựa',0],['🥢','Đũa gỗ',0],['📄','Tờ giấy',0],['🎈','Bóng bay cao su',0],['🥛','Cốc thủy tinh',0],['🧦','Chiếc tất vải',0],['🖍️','Bút sáp màu',0],['🧶','Cuộn len',0]];\nconst OBJ_EN=['Iron nail','Coin','Key','Stainless steel spoon','Steel paper clip','Aluminum foil',\n  'Plastic ruler','Wooden chopsticks','Sheet of paper','Rubber balloon','Glass cup','Fabric sock','Crayon','Ball of yarn'];\nconst objName=i=>L(OBJ[i][1],OBJ_EN[i]);\nlet tested={},current=null,lastTest=null,guessOk=0,guessTot=0;\nfunction renderTest(lit,obj){let h=DEFS+wires()+flowPath(!!lit,false);\n  h+=`<g transform=\"translate(100,210) rotate(90)\">${comp('battery')}</g>`;\n  h+=`<g transform=\"translate(300,90)\">${comp('bulb',0,lit?1:0)}</g>`;\n  h+=`<g transform=\"translate(300,330)\">${comp('switch',true)}</g>`;\n  h+=`<g transform=\"translate(500,210) rotate(90)\">${comp('gap')}</g>`;\n  h+=obj?`<text x=\"500\" y=\"226\" text-anchor=\"middle\" font-size=\"44\">${obj[0]}</text><text x=\"560\" y=\"214\" font-size=\"14\" font-weight=\"900\" fill=\"var(--ink)\" text-anchor=\"middle\"> </text>`\n    :`<text x=\"535\" y=\"216\" font-size=\"14\" font-weight=\"900\" fill=\"var(--muted)\">${L('chỗ hở','gap')}</text>`;\n  $('tBoard').innerHTML=h;}\nfunction renderShelf(){\n  $('shelf').innerHTML=OBJ.map((o,i)=>`<button class=\"obj\" data-o=\"${i}\" ${i in tested?'disabled':''} aria-pressed=\"${current===i}\"><span class=\"em\">${o[0]}</span>${esc(objName(i))}</button>`).join('');\n  $('shelf').querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>pickObj(+b.dataset.o));\n  const yes=[],no=[];for(const i in tested)(OBJ[i][2]?yes:no).push(Number(i));\n  $('colYes').innerHTML=yes.map(i=>`<span class=\"it\">${OBJ[i][0]} ${esc(objName(i))}</span>`).join('');\n  $('colNo').innerHTML=no.map(i=>`<span class=\"it\">${OBJ[i][0]} ${esc(objName(i))}</span>`).join('');\n  $('tScore').textContent=L(`Con đoán đúng ${guessOk} / ${guessTot} lần`, `Correct guesses: ${guessOk} / ${guessTot}`);\n  $('tConclusion').textContent=Object.keys(tested).length>=6?\n    L('Con có thấy không? Các vật làm bằng kim loại (sắt, đồng, nhôm, inox) đều dẫn điện. Nhựa, gỗ, giấy, cao su, thủy tinh, vải không dẫn điện, nên người ta dùng chúng để bọc dây điện và làm tay cầm dụng cụ điện.',\n      'Notice the pattern? Metals (such as iron, copper, aluminum, and stainless steel) conduct electricity. Plastic, wood, paper, rubber, glass, and fabric are insulators, so they are often used to cover wires and make safe handles.'):\n    L('Thử thêm nhiều đồ vật để tìm ra quy luật nhé!', 'Try more objects to discover the pattern!');\n}\nfunction renderPrediction(i){\n  const p=$('predict');p.classList.remove('hidden');\n  p.innerHTML=`${L('Con đoán xem: đặt','What do you predict? If you place')} <b>${esc(objName(i))}</b> ${L('vào mạch thì đèn sẽ thế nào?','in the circuit, what will happen to the bulb?')}<div class=\"row\"><button class=\"btn y\" data-g=\"1\">${L('💡 Đèn sáng','💡 Bulb lights up')}</button><button class=\"btn n\" data-g=\"0\">${L('⚫ Đèn không sáng','⚫ Bulb stays off')}</button></div>`;\n  $('tMsg').className='msg';$('tMsg').textContent=L('Hãy đoán trước, rồi xem kết quả nhé!', 'Make your prediction, then see the result!');\n  p.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>test(i,+b.dataset.g));\n}\nfunction pickObj(i){\n  if(!Number.isInteger(i)||i<0||i>=OBJ.length||Object.prototype.hasOwnProperty.call(tested,i))return;\n  stopSpeech();current=i;lastTest=null;renderShelf();renderTest(false,OBJ[i]);renderPrediction(i);\n}\nfunction renderFeedback(i,g){\n  const o=OBJ[i],c=o[2],m=$('tMsg');m.className='msg '+(g===c?'ok':'no');\n  m.textContent=L(\n    (g===c?'🎉 Con đoán đúng! ':'Ồ, khác với con đoán! ')+(c?`Đèn sáng: ${o[1]} là vật dẫn điện.`:`Đèn không sáng: ${o[1]} là vật cách điện.`),\n    (g===c?'🎉 Correct prediction! ':'Not quite! ')+(c?`The bulb lights up: ${objName(i)} is a conductor.`:`The bulb stays off: ${objName(i)} is an insulator.`)\n  );\n}\nfunction test(i,g){\n  if(current!==i||Object.prototype.hasOwnProperty.call(tested,i)||![0,1].includes(g))return;\n  const o=OBJ[i],c=o[2];guessTot++;if(g===c)guessOk++;\n  tested[i]=1;current=null;lastTest={i,g};$('predict').classList.add('hidden');renderTest(!!c,o);\n  renderFeedback(i,g);speak(L(c?`${o[1]} là vật dẫn điện`:`${o[1]} là vật cách điện`,\n    c?`${objName(i)} is a conductor.`:`${objName(i)} is an insulator.`));renderShelf();\n}\nfunction refreshLanguage(){\n  applyStatic();renderPalette();renderBuild();renderShelf();\n  if(current!==null){renderTest(false,OBJ[current]);renderPrediction(current);}\n  else if(lastTest){renderTest(!!OBJ[lastTest.i][2],OBJ[lastTest.i]);renderFeedback(lastTest.i,lastTest.g);}\n  else{renderTest(false,null);$('tMsg').className='msg';$('tMsg').textContent=L('Chọn một đồ vật bên dưới để thử.', 'Choose an object below to test.');}\n  $('predict').classList.toggle('hidden',current===null);\n}\n/* ---------- tabs ---------- */\ndocument.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{\n  const next=b.dataset.lang==='en'?'en':'vi';if(next===lang)return;\n  stopSpeech();lang=next;refreshLanguage();\n}));\ndocument.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{\n  stopSpeech();document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',String(x===b)));\n  $('pBuild').classList.toggle('hidden',b.dataset.tab!=='build');$('pTest').classList.toggle('hidden',b.dataset.tab!=='test');\n}));\nrefreshLanguage();\n})();";
  const TOOL_CSS = ":root{\n  --bg:#ffffff;--card:#ffffff;--ink:#334155;--muted:#64748b;--line:#eadcff;\n  --purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;--red:#e11d48;--red-soft:#fff1f2;\n  --orange:#c2410c;--orange-soft:#fff7ed;--blue-soft:#eff6ff;--board:#f1f5f9;--wire:#475569;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:#ffffff;color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton{font:inherit;color:inherit;cursor:pointer}\nbutton:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid var(--line);border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple)}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}\n.tab{min-height:54px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-size:1.08rem;font-weight:900}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:14px;align-items:start}\n@media (max-width:880px){.grid{grid-template-columns:1fr}}\n.card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:16px;box-shadow:0 8px 22px rgba(76,29,149,.07)}\n.card h2{margin:0 0 6px;font-size:1.4rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\nsvg.board{display:block;width:100%;height:auto;border-radius:18px;background:var(--board);touch-action:manipulation}\n.slot{cursor:pointer}\n.slot .hit{fill:transparent}\n.slot:hover .ring{stroke:#8b5cf6}\n.palette{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 0}\n.pc{min-height:52px;padding:0 14px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900;display:inline-flex;align-items:center;gap:8px}\n.pc .ic{font-size:1.4rem}\n.pc[aria-pressed=\"true\"]{border-color:var(--purple);background:var(--purple-soft);color:var(--purple);box-shadow:0 0 0 3px rgba(124,58,237,.18)}\n.msg{min-height:3em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--orange-soft);color:var(--orange)}.msg.danger{background:var(--red-soft);color:var(--red)}\n.tasks{display:grid;gap:8px;margin:0;padding:0;list-style:none}\n.tasks li{display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:14px;background:var(--purple-soft);font-weight:800}\n.tasks li.done{background:var(--green-soft);color:var(--green)}\n.tasks .ck{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--card);border:2px solid var(--line);flex:none}\n.tasks li.done .ck{background:var(--green);border-color:var(--green);color:#fff}\n.safety{margin-top:14px;border-radius:18px;padding:14px;background:var(--red-soft)}\n.safety h3{margin:0 0 6px;color:var(--red);font-size:1.15rem}\n.safety ul{margin:0;padding-left:20px;font-weight:700}\n.safety li+li{margin-top:4px}\n.shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;margin-top:12px}\n.obj{border:2px solid var(--line);border-radius:16px;background:var(--card);padding:8px 6px;font-weight:800;font-size:.9rem;text-align:center}\n.obj .em{display:block;font-size:2rem;line-height:1.2}\n.obj:disabled{opacity:.4;cursor:default}\n.obj[aria-pressed=\"true\"]{border-color:var(--purple);background:var(--purple-soft)}\n.predict{margin-top:12px;border-radius:16px;padding:12px;background:var(--purple-soft);font-weight:800}\n.predict .row{margin-top:8px}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:48px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.y{background:#fde047;border-color:#facc15;color:#422006}\n.btn.n{background:#475569;border-color:#475569;color:#fff}\n.cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.col{border-radius:16px;padding:10px;min-height:120px}\n.col h3{margin:0 0 6px;font-size:1.05rem}\n.col.yes{background:#fef9c3;color:#713f12}.col.no{background:#e2e8f0;color:#1e293b}\n.col .items{display:flex;flex-wrap:wrap;gap:6px}\n.col .it{background:rgba(255,255,255,.75);border-radius:10px;padding:2px 8px;font-weight:800;font-size:.9rem}\n.score{font-weight:900;color:var(--muted)}\n.hidden{display:none !important}\n@keyframes flow{to{stroke-dashoffset:-40}}\n.flow{animation:flow .6s linear infinite}\n@media (prefers-reduced-motion:reduce){.flow{animation:none}}\n/* Song ngu Epsilon Edu: cung mau voi So do doan thang */\n.hero-copy{flex:1 1 auto;min-width:0}\n.lang-switch{margin-left:auto;display:inline-flex;align-self:flex-start;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:0 0 auto}\n.lang-switch button{min-height:38px;padding:0 13px;border:0;border-radius:10px;background:transparent;color:#475569;font-weight:900;white-space:nowrap}\n.lang-switch button[aria-pressed=\"true\"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}\n.lang-switch button:focus-visible{outline:3px solid #3b82f6;outline-offset:2px}\n.speech-notice{position:fixed;z-index:100;bottom:12px;left:12px;right:12px;max-width:540px;margin:auto;background:#fff7ed;border:1px solid #fdba74;border-radius:14px;padding:10px 14px;color:#9a3412;box-shadow:0 8px 24px rgba(76,29,149,.12);font-weight:800;display:none}\n.speech-notice.visible{display:block}\n@media(max-width:760px){.hero{flex-wrap:wrap;gap:10px}.hero-icon{width:52px;height:52px}.hero-copy{flex:1 1 calc(100% - 66px)}.lang-switch{width:100%;margin-left:0;justify-content:flex-end}}\n@media(max-width:390px){.lang-switch{justify-content:stretch}.lang-switch button{flex:1;padding:0 8px}.hero h1{font-size:1.5rem}}\n";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">💡</div>\n    <div class=\"hero-copy\">\n      <h1 data-i18n=\"heroTitle\">Mạch điện vui</h1>\n      <p data-i18n=\"heroDesc\">Lắp mạch điện đơn giản để thắp sáng bóng đèn, và tìm hiểu vật nào dẫn điện, vật nào cách điện. Khoa học lớp 5.</p>\n    </div>\n    <div class=\"lang-switch\" role=\"group\" aria-label=\"Language / Ngôn ngữ\">\n      <button type=\"button\" data-lang=\"vi\" aria-pressed=\"true\">Tiếng Việt</button>\n      <button type=\"button\" data-lang=\"en\" aria-pressed=\"false\">English</button>\n    </div>\n  </header>\n\n  <div class=\"tabs\" role=\"tablist\">\n    <button class=\"tab\" role=\"tab\" aria-selected=\"true\" data-tab=\"build\" data-i18n=\"tabBuild\">🔧 Lắp mạch điện</button>\n    <button class=\"tab\" role=\"tab\" aria-selected=\"false\" data-tab=\"test\" data-i18n=\"tabTest\">🧪 Vật dẫn điện hay cách điện?</button>\n  </div>\n\n  <!-- LẮP MẠCH -->\n  <section id=\"pBuild\" class=\"grid\">\n    <div class=\"card\">\n      <h2 data-i18n=\"buildTitle\">Bảng lắp mạch</h2>\n      <p class=\"lead\" data-i18n=\"buildLead\">Chọn một linh kiện bên dưới, rồi bấm vào ô trống trên mạch để lắp. Bấm vào công tắc để bật hoặc tắt.</p>\n      <svg class=\"board\" id=\"bBoard\" viewBox=\"0 0 600 400\" aria-label=\"Bảng mạch điện\" data-i18n-aria=\"bBoardAria\"></svg>\n      <div class=\"palette\" id=\"palette\"></div>\n      <div class=\"msg\" id=\"bMsg\" aria-live=\"polite\"></div>\n    </div>\n    <div class=\"card\">\n      <h2 data-i18n=\"tasksTitle\">🎯 Thử thách</h2>\n      <ul class=\"tasks\" id=\"tasks\"></ul>\n      <div class=\"safety\">\n        <h3 data-i18n=\"safetyTitle\">⚠️ An toàn điện</h3>\n        <ul>\n          <li data-i18n=\"safety1\">Thí nghiệm này chỉ dùng pin nhỏ. Điện trong nhà (ổ cắm) rất mạnh, có thể gây chết người.</li>\n          <li data-i18n=\"safety2\">Không cắm que, đinh hay ngón tay vào ổ điện.</li>\n          <li data-i18n=\"safety3\">Không chạm vào đồ điện khi tay ướt.</li>\n          <li data-i18n=\"safety4\">Thấy dây điện bị đứt, hở thì tránh xa và báo ngay cho người lớn.</li>\n          <li data-i18n=\"safety5\">Không thả diều, trèo cây gần đường dây điện.</li>\n        </ul>\n      </div>\n    </div>\n  </section>\n\n  <!-- THỬ VẬT -->\n  <section id=\"pTest\" class=\"grid hidden\">\n    <div class=\"card\">\n      <h2 data-i18n=\"testTitle\">Thử từng đồ vật</h2>\n      <p class=\"lead\" data-i18n=\"testLead\">Đặt đồ vật vào chỗ hở của mạch. Nếu đèn sáng, đồ vật đó cho dòng điện chạy qua: đó là vật dẫn điện.</p>\n      <svg class=\"board\" id=\"tBoard\" viewBox=\"0 0 600 400\" aria-label=\"Mạch thử vật\" data-i18n-aria=\"tBoardAria\"></svg>\n      <div class=\"predict hidden\" id=\"predict\"></div>\n      <div class=\"msg\" id=\"tMsg\" aria-live=\"polite\"></div>\n      <div class=\"shelf\" id=\"shelf\"></div>\n    </div>\n    <div class=\"card\">\n      <h2 data-i18n=\"resultsTitle\">📋 Kết quả thí nghiệm</h2>\n      <p class=\"score\" id=\"tScore\">Con đoán đúng 0 / 0 lần</p>\n      <div class=\"cols\">\n        <div class=\"col yes\"><h3 data-i18n=\"colYesTitle\">💡 Vật dẫn điện</h3><div class=\"items\" id=\"colYes\"></div></div>\n        <div class=\"col no\"><h3 data-i18n=\"colNoTitle\">⚫ Vật cách điện</h3><div class=\"items\" id=\"colNo\"></div></div>\n      </div>\n      <p class=\"lead\" style=\"margin-top:12px\" id=\"tConclusion\"></p>\n    </div>\n  </section>\n</div>";
  const TOOL_HEAD = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">';

  function ttsUrl(text, lang = "vi-VN") {
    const tl = String(lang || "vi-VN").toLowerCase().startsWith("en") ? "en" : "vi";
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encodeURIComponent(text)}`;
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
    let finishAudio = null;
    let finishUtterance = null;

    const stopTts = () => {
      ttsNonce += 1;
      if (finishAudio) { const done = finishAudio; finishAudio = null; done(); }
      if (finishUtterance) { const done = finishUtterance; finishUtterance = null; done(); }
      try { audio.pause(); audio.currentTime = 0; audio.removeAttribute("src"); audio.load(); } catch (_) {}
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_) {}
    };

    const englishFemaleVoiceNames = /(?:Samantha|Ava|Allison|Susan|Zira|Jenny|Aria|Joanna|Salli|Kimberly|Kendra|Ivy|Emma|Michelle|Ana|Jane|Sarah|Monica|Shelley)/i;
    const getEnglishFemaleVoice = () => {
      try {
        const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
        return voices.find((voice) => /^en-US$/i.test(String(voice.lang || "")) && englishFemaleVoiceNames.test(String(voice.name || ""))) || null;
      } catch (_) { return null; }
    };
    const waitEnglishFemaleVoice = () => new Promise((resolve) => {
      const immediate = getEnglishFemaleVoice();
      if (immediate) return resolve(immediate);
      if (!window.speechSynthesis) return resolve(null);
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        try { window.speechSynthesis.removeEventListener("voiceschanged", onVoices); } catch (_) {}
        resolve(getEnglishFemaleVoice());
      };
      const onVoices = () => finish();
      try { window.speechSynthesis.addEventListener("voiceschanged", onVoices, { once: true }); } catch (_) {}
      window.setTimeout(finish, 700);
    });
    const speakEnglishUsFemale = async (chunks, nonce) => {
      const voice = await waitEnglishFemaleVoice();
      if (nonce !== ttsNonce) return;
      if (!voice) {
        const notice = "Thiết bị này chưa có giọng nữ Mỹ en-US phù hợp. Vui lòng cài/thêm giọng English (United States) rồi thử lại.";
        if (context.hooks && typeof context.hooks.showToast === "function") context.hooks.showToast(notice);
        else try { iframe.contentWindow?.postMessage({type:"class1-tool-tts-notice",id:instanceId,message:"This device does not have a suitable US female English voice."}, "*"); } catch (_) {}
        return;
      }
      for (const chunk of chunks) {
        if (nonce !== ttsNonce) return;
        await new Promise((resolve) => {
          try {
            const utterance = new SpeechSynthesisUtterance(chunk);
            utterance.lang = "en-US";
            utterance.voice = voice;
            utterance.rate = 0.94;
            const done = () => { if (finishUtterance === done) finishUtterance = null; resolve(); };
            finishUtterance = done;
            utterance.onend = done;
            utterance.onerror = done;
            window.speechSynthesis.speak(utterance);
          } catch (_) { resolve(); }
        });
      }
    };
    const playTts = async (text, lang = "vi-VN") => {
      const chunks = splitTtsText(text);
      if (!chunks.length) return;
      stopTts();
      const nonce = ttsNonce;
      const isEnglish = String(lang || "").toLowerCase().startsWith("en");
      try {
        if (isEnglish) {
          try { audio.pause(); audio.currentTime = 0; audio.removeAttribute("src"); } catch (_) {}
          try { window.speechSynthesis.cancel(); } catch (_) {}
          await speakEnglishUsFemale(chunks, nonce);
          return;
        }
        try { window.speechSynthesis.cancel(); } catch (_) {}
        for (const chunk of chunks) {
          if (nonce !== ttsNonce) return;
          audio.pause();
          audio.currentTime = 0;
          audio.src = ttsUrl(chunk, lang);
          audio.playbackRate = 0.96;
          await audio.play();
          await new Promise((resolve) => {
            const done = () => { cleanup(); if (finishAudio === done) finishAudio = null; resolve(); };
            const cleanup = () => { for (const name of ["ended","error","abort"]) audio.removeEventListener(name,done); };
            finishAudio = done;
            for (const name of ["ended","error","abort"]) audio.addEventListener(name,done, {once:true});
          });
        }
      } catch (_) {
        if (nonce === ttsNonce && context.hooks && typeof context.hooks.showToast === "function") {
          context.hooks.showToast(isEnglish ? "Chưa phát được giọng nữ Mỹ. Bé có thể bấm lại nút nghe." : "Chưa phát được giọng đọc. Bé có thể bấm lại nút nghe.");
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
        void playTts(data.text, data.lang || "vi-VN");
      } else if (data.type === "class1-tool-stop-speech") {
        stopTts();
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
