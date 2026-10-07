/* Epsilon Edu - Thật hay do máy tạo?
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiRealOrMachine";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\n// Câu do người viết: máy học từ những câu này\nconst CORPUS=['Buổi sáng em dậy sớm và chạy ra vườn tưới cây.','Con mèo nhà em thích nằm sưởi nắng trên bậu cửa.','Mẹ em nấu cơm rất ngon vào mỗi buổi tối.','Em thích đọc truyện cổ tích trước khi đi ngủ.','Trời mưa to nên em mặc áo mưa đi học.','Bạn Lan cho em mượn bút chì màu xanh.',\n 'Trong vườn nhà em có cây bưởi rất to.','Con chó nhà em chạy ra cổng đón em đi học về.','Buổi chiều em cùng các bạn đá bóng ở sân trường.','Cô giáo kể cho em nghe chuyện về chú thỏ con.','Em thích ăn bưởi vào ngày Tết Trung thu.','Bố đưa em đi học bằng xe đạp mỗi buổi sáng.',\n 'Con mèo nhà em thích bắt chuột vào ban đêm.','Em giúp mẹ tưới cây trong vườn mỗi ngày.','Trời nắng đẹp nên cả nhà em đi chơi công viên.','Chú thỏ con thích ăn cà rốt và rau xanh.','Em cùng các bạn đọc sách ở thư viện của trường.','Ông em trồng rất nhiều hoa trong vườn.'];\n// Câu người viết dùng để đố (máy không học các câu này)\nconst HUMAN=['Sáng nay em được cô giáo khen vì viết chữ đẹp.','Chiều nào em cũng ra đầu ngõ đợi bố đi làm về.','Bà em kể rằng hồi nhỏ bà phải đi bộ rất xa mới tới trường.','Cây hoa giấy trước nhà em nở đỏ rực cả một góc sân.','Hôm qua em bị ngã xe nhưng em không khóc.','Chú mèo con nằm cuộn tròn ngủ trên chiếc ghế của ông.','Em và chị cùng gói bánh chưng với mẹ vào dịp Tết.','Mùa hè năm nay cả nhà em về quê thăm ông bà ngoại.'];\nconst COLS=['#fbcfe8','#ddd6fe','#bfdbfe','#bbf7d0','#fde2f3','#e0e7ff'];\nconst toks=s=>s.split(' ');\nfunction buildModel(order){const m=new Map();CORPUS.forEach((s,si)=>{const w=['<s>','<s>',...toks(s),'</s>'];for(let i=2;i<w.length;i++){const k=order===2?w[i-2]+' '+w[i-1]:w[i-1];if(!m.has(k))m.set(k,[]);m.get(k).push({w:w[i],si});}});return m;}\nconst M1=buildModel(1),M2=buildModel(2);\nfunction generate(order){for(let tries=0;tries<200;tries++){const m=order===2?M2:M1;let p2='<s>',p1='<s>';const out=[];\n    while(out.length<20){const k=order===2?p2+' '+p1:p1;const c=m.get(k);if(!c)break;const pick=c[Math.floor(Math.random()*c.length)];if(pick.w==='</s>')break;out.push(pick);p2=p1;p1=pick.w;}\n    const text=out.map(o=>o.w).join(' ');const srcCount=new Set(out.map(o=>o.si)).size;\n    if(out.length>=7&&out.length<=18&&srcCount>=2&&!CORPUS.includes(text)&&/[.!?]$/.test(text))return{out,text};}\n  return{out:[],text:''};}\nfunction segments(out){const seg=[];out.forEach(o=>{const l=seg[seg.length-1];if(l&&l.si===o.si)l.w.push(o.w);else seg.push({si:o.si,w:[o.w]});});return seg;}\nconst shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);\n\n/* ---------- đoán thử ---------- */\nlet rounds=[],ri=0,ok=0;\nfunction newGame(){const hs=shuffle(HUMAN).slice(0,4).map(t=>({t,machine:false}));const ms=[1,1,2,2].map(o=>{const g=generate(o);return{t:g.text,machine:true,out:g.out,order:o};});\n  rounds=shuffle([...hs,...ms]);ri=0;ok=0;ask();}\nfunction ask(){const c=$('gameCard');if(ri>=rounds.length){const good=ok>=6;c.innerHTML=`<div class=\"result\"><div class=\"medal\">${good?'🏅':'🕵️'}</div><h2>Con đoán đúng ${ok} / ${rounds.length} đoạn!</h2>\n    <p class=\"lead\">${good?'Con là thám tử giỏi! Nhưng nhớ nhé: AI thật ngày nay viết hay hơn nhiều, nên luôn kiểm tra nguồn tin.':'Phân biệt không dễ đâu! Đó là lý do mình phải kiểm tra thông tin trước khi tin.'}</p>\n    <div class=\"row\" style=\"justify-content:center\"><button class=\"btn main\" id=\"again\">Chơi lại</button></div></div>`;$('again').onclick=newGame;speak('Con đoán đúng '+ok+' trên '+rounds.length+' đoạn.');return;}\n  const r=rounds[ri];let done=false;\n  c.innerHTML=`<div class=\"row\" style=\"justify-content:space-between\"><span class=\"lbl\">Đoạn ${ri+1} / ${rounds.length}</span><span class=\"lbl\">⭐ ${ok}</span></div><div class=\"prog\"><i style=\"width:${ri/rounds.length*100}%\"></i></div>\n    <div class=\"passage\" id=\"pass\">${r.t}</div><div class=\"choices\"><button class=\"big h\" id=\"bH\">🧑 Người viết</button><button class=\"big m\" id=\"bM\">🤖 Máy tạo</button></div><div id=\"fb\"></div>`;\n  const ans=g=>{if(done)return;done=true;const right=g===r.machine;if(right)ok++;$('bH').disabled=$('bM').disabled=true;\n    let h=`<div class=\"msg ${right?'ok':'no'}\">${right?'Đúng rồi! ':'Chưa đúng! '}${r.machine?`Đoạn này do <b>${r.order===1?'máy mới học':'máy giỏi hơn'}</b> tạo ra, bằng cách ghép các mẩu từ ${new Set(r.out.map(o=>o.si)).size} câu khác nhau.`:'Đoạn này do người viết.'}</div>`;\n    if(r.machine){const sg=segments(r.out);$('pass').innerHTML=sg.map(s=>`<span class=\"seg-src\" style=\"background:${COLS[s.si%COLS.length]}\">${s.w.join(' ')}</span>`).join(' ');\n      h+=`<div class=\"srcs\">${[...new Set(sg.map(s=>s.si))].map(si=>`<div class=\"src\" style=\"background:${COLS[si%COLS.length]}\">📄 Câu gốc: ${CORPUS[si]}</div>`).join('')}</div>`;}\n    h+=`<div class=\"row\" style=\"margin-top:10px\"><button class=\"btn main\" id=\"nx\">${ri+1<rounds.length?'Đoạn tiếp ➜':'Xem kết quả'}</button></div>`;$('fb').innerHTML=h;$('nx').onclick=()=>{ri++;ask();};\n    speak(right?'Đúng rồi!':'Chưa đúng!');};\n  $('bH').onclick=()=>ans(false);$('bM').onclick=()=>ans(true);}\n\n/* ---------- xem máy viết ---------- */\nlet order=1;\nfunction genShow(){const g=generate(order);if(!g.text){$('genOut').textContent='Máy chưa ghép được câu nào, bấm thử lại nhé!';return;}const sg=segments(g.out);\n  $('genOut').innerHTML=sg.map(s=>`<span class=\"seg-src\" style=\"background:${COLS[s.si%COLS.length]}\">${s.w.join(' ')}</span>`).join(' ');\n  $('srcs').innerHTML=[...new Set(sg.map(s=>s.si))].map(si=>`<div class=\"src\" style=\"background:${COLS[si%COLS.length]}\">📄 ${CORPUS[si]}</div>`).join('');}\n$('corpus').innerHTML=CORPUS.map((s,i)=>`<div>${i+1}. ${s}</div>`).join('');\n$('gen').onclick=genShow;\ndocument.querySelectorAll('#lvSeg [data-o]').forEach(b=>b.onclick=()=>{order=+b.dataset.o;document.querySelectorAll('#lvSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));genShow();});\n\ndocument.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{const t=b.dataset.tab;document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===b));\n  $('pGame').classList.toggle('hidden',t!=='game');$('pLab').classList.toggle('hidden',t!=='lab');$('pTips').classList.toggle('hidden',t!=='tips');if(t==='lab'&&!$('genOut').textContent)genShow();});\nnewGame();\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#ffffff;--card:#ffffff;--ink:#344054;--muted:#667085;--line:#EDE9FE;\n  --pink:#EC4899;--pink-soft:#FFF1F7;--purple:#7C3AED;--purple-soft:#F5F3FF;\n  --green:#16A34A;--green-soft:#F0FDF4;--blue:#2563EB;--blue-soft:#EFF8FF;\n  --red:#E11D48;--red-soft:#FFF1F2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:#fff;color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid #D8B4FE;border-radius:22px;background:linear-gradient(135deg,#FFF7FB 0%,#FAF5FF 52%,#EFF8FF 100%);box-shadow:0 7px 18px rgba(76,29,149,.07)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:#fff;border:1px solid #E9D5FF;box-shadow:0 4px 10px rgba(76,29,149,.06)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:1px solid var(--line);border-radius:16px;background:#fff;font-weight:900;font-size:1.02rem;box-shadow:0 3px 9px rgba(76,29,149,.045)}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.tab[aria-selected=\"true\"] small{color:#fdf2ff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:linear-gradient(145deg,#FFFFFF 0%,#FCFAFF 100%);border:1px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px;box-shadow:0 5px 14px rgba(15,23,42,.045)}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:1px solid var(--line);border-radius:14px;background:#fff;font-weight:900;box-shadow:0 3px 8px rgba(76,29,149,.04)}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:1px solid var(--line);border-radius:14px;background:#fff}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{background:var(--green-soft);color:var(--green)}.msg.no{background:var(--pink-soft);color:var(--pink)}\n.tip{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--purple)}\n.warn{border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:var(--pink);margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:#FAF5FF;border:1px solid #E9D5FF;font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.passage{font-family:\"Baloo 2\",sans-serif;font-size:clamp(1.3rem,3vw,1.7rem);font-weight:700;line-height:1.55;padding:20px;border:1px solid #DDD6FE;border-radius:18px;background:linear-gradient(135deg,#FAF5FF,#EFF8FF);min-height:120px}\n.choices{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}\n.big{min-height:64px;border-radius:16px;border:none;font-weight:900;font-size:1.1rem;color:#fff}\n.big.h{background:linear-gradient(90deg,#3b82f6,#22c55e)}.big.m{background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.big:disabled{opacity:.45}\n.seg-src{border-radius:6px;padding:1px 3px}\n.srcs{display:grid;gap:6px;margin-top:10px}\n.src{border-radius:12px;padding:6px 10px;font-weight:700;font-size:.95rem}\n.corpus{display:grid;gap:6px;max-height:330px;overflow:auto;margin-top:8px}\n.corpus div{border:1px solid #BAE6FD;border-radius:10px;padding:6px 10px;background:var(--blue-soft);font-weight:700;font-size:.95rem}\n.prog{height:10px;border-radius:99px;background:var(--purple-soft);overflow:hidden;margin:6px 0 10px}\n.prog i{display:block;height:100%;background:linear-gradient(90deg,#ec4899,#8b5cf6,#3b82f6,#22c55e);transition:width .3s}\n.result{text-align:center}.result .medal{font-size:4rem}\n.rules{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}\n.rl{border-radius:16px;padding:12px;border:1px solid var(--line);background:#fff;font-weight:700;box-shadow:0 3px 9px rgba(76,29,149,.035)}\n.rl b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n:root[data-theme=\"dark\"],:root[data-theme=\"light\"]{color-scheme:light}\n";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🕵️</div>\n    <div>\n      <h1>Thật hay do máy tạo? <span class=\"ai\">✨ AI</span></h1>\n      <p>Máy học các câu do người viết rồi tự ghép thành câu mới. Con thử làm thám tử: đoạn nào do người viết, đoạn nào do máy tạo?</p>\n    </div>\n  </header>\n\n  <div class=\"tabs\" role=\"tablist\">\n    <button class=\"tab\" role=\"tab\" aria-selected=\"true\" data-tab=\"game\">🕵️ Đoán thử<small>Người viết hay máy tạo?</small></button>\n    <button class=\"tab\" role=\"tab\" aria-selected=\"false\" data-tab=\"lab\">🧪 Xem máy viết<small>Máy ghép chữ như thế nào?</small></button>\n    <button class=\"tab\" role=\"tab\" aria-selected=\"false\" data-tab=\"tips\">🛡️ Bí kíp kiểm tra<small>Đừng vội tin!</small></button>\n  </div>\n\n  <section id=\"pGame\" class=\"grid\" style=\"margin-top:0\">\n    <div class=\"card\" id=\"gameCard\"></div>\n    <div>\n      <div class=\"card\"><h2>Gợi ý</h2><p class=\"lead\" style=\"margin:0\">Đọc thật kỹ: câu có hợp lý không? Ý có bị nhảy lung tung không? Có chỗ nào ghép hai câu khác nhau vào làm một không?</p></div>\n      <div class=\"tip\"><b>Máy viết như thế nào?</b> Máy đọc nhiều câu do người viết, nhớ xem từ nào hay đi sau từ nào, rồi ghép lại thành câu mới. Máy không thực sự hiểu câu chuyện, nên đôi khi câu nghe đúng ngữ pháp mà lại vô lý.</div>\n    </div>\n  </section>\n\n  <section id=\"pLab\" class=\"grid hidden\" style=\"margin-top:0\">\n    <div class=\"card\">\n      <h2>🤖 Máy đang viết</h2>\n      <div class=\"row\"><span class=\"lbl\">Máy</span><span class=\"seg\" id=\"lvSeg\"><button data-o=\"1\" aria-pressed=\"true\">🐣 Máy mới học</button><button data-o=\"2\" aria-pressed=\"false\">🦉 Máy giỏi hơn</button></span></div>\n      <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn main\" id=\"gen\">✨ Viết câu mới</button></div>\n      <div class=\"passage\" id=\"genOut\" style=\"margin-top:12px\"></div>\n      <p class=\"lead\" style=\"margin:10px 0 0\">Mỗi màu là một mẩu máy lấy từ một câu khác nhau do người viết:</p>\n      <div class=\"srcs\" id=\"srcs\"></div>\n    </div>\n    <div class=\"card\">\n      <h2>📚 Những câu máy đã đọc</h2>\n      <p class=\"lead\">Đây là dữ liệu máy được học. Máy chỉ biết ghép lại những từ có trong các câu này.</p>\n      <div class=\"corpus\" id=\"corpus\"></div>\n      <div class=\"tip\"><b>Máy mới học</b> chỉ nhớ một từ phía trước nên câu hay lủng củng. <b>Máy giỏi hơn</b> nhớ hai từ phía trước nên câu trôi chảy hơn, khó phát hiện hơn. AI ngày nay còn giỏi hơn rất nhiều, nên con không thể chỉ dựa vào \"câu nghe lạ\" để phát hiện!</div>\n    </div>\n  </section>\n\n  <section id=\"pTips\" class=\"hidden\">\n    <div class=\"card\">\n      <h2>🛡️ Bí kíp kiểm tra thông tin trên mạng</h2>\n      <div class=\"rules\">\n        <div class=\"rl\"><b>🤔 Dừng lại suy nghĩ</b>Thông tin có hợp lý không? Có điều gì quá lạ, quá đáng sợ hay quá tuyệt vời không?</div>\n        <div class=\"rl\"><b>🔍 Ai viết ra?</b>Xem thông tin đến từ đâu: báo chí, nhà trường, cơ quan nhà nước, hay một trang lạ không rõ ai làm?</div>\n        <div class=\"rl\"><b>📚 Kiểm tra thêm</b>So sánh với sách, với thầy cô, hoặc nhờ bố mẹ tìm thêm ở nơi đáng tin.</div>\n        <div class=\"rl\"><b>🖼️ Ảnh và video cũng có thể giả</b>AI có thể tạo ra ảnh, video, giọng nói giống hệt thật. Nhìn thấy chưa chắc đã là thật.</div>\n        <div class=\"rl\"><b>🚫 Chưa chắc thì không chia sẻ</b>Chia sẻ tin giả có thể làm người khác hiểu lầm hoặc buồn lòng.</div>\n        <div class=\"rl\"><b>👨‍👩‍👧 Hỏi người lớn</b>Khi không chắc, hãy hỏi bố mẹ hoặc thầy cô. Đó là cách làm thông minh nhất!</div>\n      </div>\n    </div>\n  </section>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Thật hay do máy tạo?" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
