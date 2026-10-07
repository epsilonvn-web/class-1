/* Epsilon Edu - Mạng nơ-ron mini
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiNeuron";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst IN=[['☀️','Trời nắng'],['👫','Có bạn đi cùng'],['📚','Làm xong bài']];\nlet x=[1,1,0],w=[1.5,1,1.5],bias=-1;\nconst RULES={and:{n:'☀️ Nắng VÀ 📚 xong bài',f:a=>a[0]&&a[2]},or:{n:'☀️ Nắng HOẶC 👫 có bạn',f:a=>a[0]||a[1]},hw:{n:'Chỉ cần 📚 xong bài',f:a=>a[2]},two:{n:'Ít nhất 2 điều tốt',f:a=>a[0]+a[1]+a[2]>=2},xor:{n:'🤯 Nắng hoặc có bạn, nhưng không cả hai',f:a=>a[0]!==a[1]}};\nlet rule='and',target=[];const COMBOS=[];for(let i=0;i<8;i++)COMBOS.push([(i>>2)&1,(i>>1)&1,i&1]);\nconst sig=z=>1/(1+Math.exp(-z));const out=a=>sig(a.reduce((s,v,i)=>s+v*w[i],0)+bias);\nfunction setRule(k){rule=k;target=COMBOS.map(a=>RULES[k].f(a)?1:0);renderRules();renderEx();}\nfunction renderRules(){$('rules').innerHTML=Object.entries(RULES).map(([k,r])=>`<button class=\"sw\" data-r=\"${k}\" aria-pressed=\"${k===rule}\">${r.n}</button>`).join('');\n  $('rules').querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>setRule(b.dataset.r));}\nfunction renderEx(){let ok=0;const rowsH=COMBOS.map((a,i)=>{const p=out(a),y=p>=.5?1:0,good=y===target[i];if(good)ok++;\n    return`<tr><td>${a[0]?'☀️':'☁️'}</td><td>${a[1]?'👫':'🧍'}</td><td>${a[2]?'📚':'📖'}</td><td><button class=\"${target[i]?'go':''}\" data-t=\"${i}\">${target[i]?'Đi chơi':'Ở nhà'}</button></td><td class=\"${good?'ok':'bad'}\">${y?'🌳':'🏠'} ${good?'✓':'✗'}</td></tr>`;}).join('');\n  $('ex').innerHTML=`<tr><th>Trời</th><th>Bạn</th><th>Bài</th><th>Nên làm gì</th><th>Nơ-ron</th></tr>`+rowsH;\n  $('ex').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const i=+b.dataset.t;target[i]=1-target[i];rule='';renderRules();renderEx();});return ok;}\nfunction renderIns(){$('ins').innerHTML=IN.map((t,i)=>`<div class=\"inp\"><button class=\"sw\" data-x=\"${i}\" aria-pressed=\"${!!x[i]}\">${t[0]} ${t[1]}</button><input type=\"range\" min=\"-30\" max=\"30\" value=\"${Math.round(w[i]*10)}\" data-w=\"${i}\" aria-label=\"Độ quan trọng của ${t[1]}\"><span>${w[i]>0?'+':''}${w[i].toFixed(1).replace('.',',')}</span></div>`).join('');\n  $('ins').querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{x[+b.dataset.x]^=1;draw();});\n  $('ins').querySelectorAll('[data-w]').forEach(r=>r.oninput=()=>{w[+r.dataset.w]=+r.value/10;r.nextElementSibling.textContent=(w[+r.dataset.w]>0?'+':'')+w[+r.dataset.w].toFixed(1).replace('.',',');draw(true);});\n  $('bias').value=Math.round(bias*10);$('biasV').textContent=(bias>0?'+':'')+bias.toFixed(1).replace('.',',');}\n$('bias').oninput=()=>{bias=+$('bias').value/10;$('biasV').textContent=(bias>0?'+':'')+bias.toFixed(1).replace('.',',');draw(true);};\nfunction draw(keepIns){if(!keepIns)renderIns();document.querySelectorAll('[data-x]').forEach(b=>b.setAttribute('aria-pressed',!!x[+b.dataset.x]));\n  const p=out(x);let h='';const ys=[60,150,240],ox=520,oy=150;\n  IN.forEach((t,i)=>{const v=x[i]*w[i],col=w[i]>=0?'#22c55e':'#ec4899',wd=1+Math.abs(w[i])*2.4;\n    h+=`<line x1=\"140\" y1=\"${ys[i]}\" x2=\"${ox-46}\" y2=\"${oy}\" stroke=\"${col}\" stroke-width=\"${wd}\" opacity=\"${x[i]?.95:.25}\" stroke-linecap=\"round\"/>`;\n    h+=`<text x=\"${(140+ox-46)/2}\" y=\"${(ys[i]+oy)/2-8}\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"900\" fill=\"${col}\">× ${w[i].toFixed(1).replace('.',',')}</text>`;\n    h+=`<circle cx=\"100\" cy=\"${ys[i]}\" r=\"38\" fill=\"${x[i]?'#dbeafe':'#f1f5f9'}\" stroke=\"${x[i]?'#3b82f6':'#cbd5e1'}\" stroke-width=\"3\"/><text x=\"100\" y=\"${ys[i]+4}\" text-anchor=\"middle\" font-size=\"26\">${t[0]}</text><text x=\"100\" y=\"${ys[i]+26}\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"900\" fill=\"#3b2a5c\">${x[i]}</text>`;});\n  const glow=Math.round(p*100);h+=`<defs><radialGradient id=\"og\"><stop offset=\"0\" stop-color=\"#f9a8d4\"/><stop offset=\"1\" stop-color=\"#8b5cf6\"/></radialGradient></defs>\n    <circle cx=\"${ox}\" cy=\"${oy}\" r=\"${46+p*10}\" fill=\"url(#og)\" opacity=\"${.35+p*.65}\"/><circle cx=\"${ox}\" cy=\"${oy}\" r=\"46\" fill=\"none\" stroke=\"#7c3aed\" stroke-width=\"3\"/>\n    <text x=\"${ox}\" y=\"${oy+8}\" text-anchor=\"middle\" font-size=\"24\" font-weight=\"900\" fill=\"#fff\">${glow}%</text><text x=\"${ox}\" y=\"${oy+78}\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"900\" fill=\"var(--muted)\">Nơ-ron</text>`;\n  $('net').innerHTML=h;\n  $('out').innerHTML=`<div class=\"em\">${p>=.5?'🌳':'🏠'}</div><div class=\"name\" style=\"color:${p>=.5?'var(--green)':'var(--pink)'}\">${p>=.5?'Đi công viên thôi!':'Ở nhà hôm nay'}</div><p class=\"lead\" style=\"margin:0\">Nơ-ron chắc chắn ${Math.round((p>=.5?p:1-p)*100)}%</p>`;\n  renderEx();}\nlet anim=0;\n$('learn').onclick=()=>{clearTimeout(anim);let ep=0;const lr=.35;const step=()=>{for(let k=0;k<1;k++){COMBOS.forEach((a,i)=>{const e=target[i]-out(a);a.forEach((v,j)=>w[j]+=lr*e*v);bias+=lr*e;});ep++;}\n    w=w.map(v=>Math.max(-3,Math.min(3,v)));bias=Math.max(-3,Math.min(3,bias));draw();const ok=renderEx();const m=$('msg');\n    if(ok===8){m.className='msg ok';m.textContent=`🎉 Nơ-ron đã học xong sau ${ep} lần luyện: trả lời đúng cả 8 tình huống!`;speak('Nơ-ron đã học xong!');return;}\n    if(ep>=120){m.className='msg no';m.textContent=rule==='xor'?`🤯 Nơ-ron chỉ đúng ${ok}/8 dù đã cố rất nhiều! Quy tắc \"hoặc cái này hoặc cái kia, nhưng không cả hai\" quá khó cho MỘT nơ-ron. Cần ghép nhiều nơ-ron lại với nhau mới học được. Vì vậy AI thật cần rất nhiều nơ-ron!`:`Nơ-ron đúng ${ok}/8 tình huống. Thử học thêm lần nữa nhé!`;return;}\n    m.className='msg';m.textContent=`Đang luyện... lần ${ep}, đúng ${ok}/8 tình huống`;anim=setTimeout(step,70);};step();};\n$('rand').onclick=()=>{w=w.map(()=>Math.round((Math.random()*4-2)*10)/10);bias=Math.round((Math.random()*4-2)*10)/10;draw();$('msg').className='msg';$('msg').textContent='Độ quan trọng đã bị xáo trộn. Cho nơ-ron tự học lại xem!';};\nsetRule('and');draw();$('msg').textContent='Thử bật tắt các thông tin và kéo độ quan trọng để xem nơ-ron quyết định thế nào.';\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --pink:#ec4899;--pink-soft:#fdf2f8;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#f0fdf4;--blue:#1d4ed8;--blue-soft:#eff6ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;\n  --pink-soft:#4a2540;--purple-soft:#362a5e;--green-soft:#1f3f33;--blue-soft:#1d3450;--red-soft:#4a2228;\n  --pink:#ff7aab;--purple:#a58bff;--green:#3fd08f;--blue:#6ab2ff;--red:#ff7482;--paper:#231c3a;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-weight:900;font-size:1.02rem}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.tab[aria-selected=\"true\"] small{color:#fdf2ff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:2px solid var(--line);border-radius:14px;background:var(--card)}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--pink-soft);color:var(--pink)}\n.tip{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--purple)}\n.warn{border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:var(--pink);margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\nsvg.net{display:block;width:100%;height:auto}\n.ins{display:grid;gap:8px;margin-top:10px}\n.inp{display:grid;grid-template-columns:150px 1fr 54px;gap:10px;align-items:center;font-weight:800}\n.inp input[type=range]{accent-color:#8b5cf6;width:100%}\n.sw{min-height:40px;border:2px solid var(--line);border-radius:12px;background:var(--card);font-weight:900;padding:0 10px}\n.sw[aria-pressed=\"true\"]{background:linear-gradient(90deg,#3b82f6,#22c55e);color:#fff;border-color:transparent}\n.out{text-align:center;margin-top:10px}\n.out .em{font-size:3rem;line-height:1.1}\n.out .name{font-family:\"Baloo 2\",sans-serif;font-size:1.6rem;font-weight:800}\ntable.ex{width:100%;border-collapse:separate;border-spacing:0 6px;font-weight:800}\ntable.ex th{font-size:.85rem;color:var(--muted);text-align:center}\ntable.ex td{text-align:center;background:var(--purple-soft);padding:6px 4px}\ntable.ex td:first-child{border-radius:10px 0 0 10px}table.ex td:last-child{border-radius:0 10px 10px 0}\ntable.ex button{min-width:84px;min-height:36px;border-radius:10px;border:2px solid var(--line);background:var(--card);font-weight:900}\ntable.ex button.go{background:linear-gradient(90deg,#3b82f6,#22c55e);color:#fff;border-color:transparent}\ntable.ex td.ok{color:var(--green)}table.ex td.bad{color:var(--pink)}\n.rules{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}";
  const CLASS1_AI_LAB_THEME = ":root,\n:root[data-theme=\"dark\"]{\n  --bg:#ffffff!important;\n  --card:#ffffff!important;\n  --ink:#344054!important;\n  --muted:#667085!important;\n  --line:#EDE9FE!important;\n  --pink:#EC4899!important;\n  --pink-soft:#FFF1F7!important;\n  --purple:#7C3AED!important;\n  --purple-soft:#F5F3FF!important;\n  --green:#10B981!important;\n  --green-soft:#ECFDF3!important;\n  --blue:#3B82F6!important;\n  --blue-soft:#EFF8FF!important;\n  --red:#E11D48!important;\n  --red-soft:#FFF1F2!important;\n  --paper:#ffffff!important;\n  --c1:#EC4899!important;\n  --c2:#8B5CF6!important;\n  --c3:#3B82F6!important;\n  --c4:#10B981!important;\n}\nhtml,body{background:#fff!important;color:var(--ink)!important}\n.hero{\n  background:linear-gradient(135deg,#FFF7FB 0%,#FAF5FF 52%,#EFF8FF 100%)!important;\n  border:1px solid #E9D5FF!important;\n  box-shadow:0 6px 16px rgba(124,58,237,.08)!important;\n}\n.hero-icon{\n  background:#F5F3FF!important;\n  border:1px solid #DDD6FE!important;\n  box-shadow:0 4px 10px rgba(124,58,237,.07)!important;\n}\n.hero h1{color:#6D28D9!important}\n.card,.step{\n  border-width:1px!important;\n  border-color:#EDE9FE!important;\n  box-shadow:0 5px 14px rgba(76,29,149,.055)!important;\n}\n.card:nth-of-type(3n+1),.step:nth-child(3n+1){background:#FFF9FC!important}\n.card:nth-of-type(3n+2),.step:nth-child(3n+2){background:#FBF9FF!important}\n.card:nth-of-type(3n),.step:nth-child(3n){background:#F8FCFF!important}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.chart,.plane,.rl,.tl,.kidpick button,table.ex button{\n  border-width:1px!important;\n}\n.btn,.tab,.seg,.sw,.sh,.it,.snd,.al,.tl,table.ex button,.kidpick button{\n  background:#fff!important;\n}\n.tab[aria-selected=\"true\"],.seg button[aria-pressed=\"true\"]{\n  background:linear-gradient(90deg,#EC4899,#8B5CF6)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n}\n.btn.main{\n  background:linear-gradient(90deg,#EC4899,#A855F7,#7C3AED)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(139,92,246,.16)!important;\n}\n.btn.cool{\n  background:linear-gradient(90deg,#3B82F6,#10B981)!important;\n  color:#fff!important;\n  border-color:transparent!important;\n  box-shadow:0 5px 12px rgba(59,130,246,.13)!important;\n}\n.tip{\n  background:#EFF8FF!important;\n  border:1px solid #BFDBFE!important;\n  color:#344054!important;\n}\n.warn{\n  background:#FFF1F7!important;\n  border:1px solid #FBCFE8!important;\n  color:#BE185D!important;\n}\n.msg{\n  background:#EFF8FF!important;\n  border:1px solid #DBEAFE!important;\n  color:#344054!important;\n}\n.msg.ok{background:#ECFDF3!important;border-color:#BBF7D0!important;color:#047857!important}\n.msg.no{background:#FFF1F7!important;border-color:#FBCFE8!important;color:#BE185D!important}\n.stat,.sc,.rc,.gr,table.ex td{background:#F5F3FF!important}\n.feed,.use{background:#EFF8FF!important}\n.prof span{border:1px solid rgba(148,163,184,.18)!important}\n.it.like,.al.yes,.kidpick button.ok{background:#ECFDF3!important;border-color:#86EFAC!important}\n.it.dis,.al.no,.kidpick button.no{background:#FFF1F7!important;border-color:#F9A8D4!important}\n.snd.on,.sh:focus-visible,.sw[aria-pressed=\"true\"]{border-color:#C4B5FD!important}\n.track{background:#F5F3FF!important}\ninput[type=\"range\"]{accent-color:#8B5CF6}\n@media (max-width:640px){\n  .wrap{padding-left:10px;padding-right:10px}\n}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🧠</div>\n    <div>\n      <h1>Mạng nơ-ron mini <span class=\"ai\">✨ AI</span></h1>\n      <p>Khám phá \"viên gạch\" nhỏ nhất của bộ não AI: một nơ-ron nhân tạo. Kéo độ quan trọng để thấy quyết định thay đổi, rồi xem nơ-ron tự học.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <section class=\"card\">\n      <h2>🧠 Một nơ-ron nhân tạo</h2>\n      <p class=\"lead\">Câu hỏi của nơ-ron: <b>\"Hôm nay có nên đi công viên không?\"</b> Nơ-ron nhận 3 thông tin, nhân mỗi thông tin với <b>độ quan trọng</b> của nó, cộng lại rồi quyết định.</p>\n      <svg class=\"net\" id=\"net\" viewBox=\"0 0 640 300\" aria-label=\"Sơ đồ nơ-ron\"></svg>\n      <div class=\"ins\" id=\"ins\"></div>\n      <div class=\"inp\"><span>🎚️ Độ dễ tính</span><input type=\"range\" id=\"bias\" min=\"-30\" max=\"30\" value=\"-10\"><span id=\"biasV\"></span></div>\n      <div class=\"out\" id=\"out\"></div>\n    </section>\n    <section>\n      <div class=\"card\">\n        <h2>🏫 Dạy nơ-ron tự học</h2>\n        <p class=\"lead\">Chọn một quy tắc, hoặc tự bấm vào cột \"Nên làm gì\" để đặt đáp án. Rồi cho nơ-ron tự chỉnh độ quan trọng cho khớp.</p>\n        <div class=\"rules\" id=\"rules\"></div>\n        <table class=\"ex\" id=\"ex\"></table>\n        <div class=\"row\" style=\"margin-top:8px\"><button class=\"btn main\" id=\"learn\">🧠 Cho nơ-ron tự học</button><button class=\"btn\" id=\"rand\">🎲 Xáo trộn độ quan trọng</button></div>\n        <div class=\"msg\" id=\"msg\"></div>\n      </div>\n      <div class=\"tip\"><b>Bộ não của AI</b> được ghép từ rất nhiều nơ-ron như thế này, có khi tới hàng tỉ cái. Mỗi nơ-ron chỉ làm việc đơn giản: nhân, cộng rồi quyết định. Khi \"học\", máy tự chỉnh độ quan trọng của từng nơ-ron cho đến khi trả lời đúng các ví dụ.</div>\n    </section>\n  </div>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Mạng nơ-ron mini" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
