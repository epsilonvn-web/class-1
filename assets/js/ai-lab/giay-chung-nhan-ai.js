/* Epsilon Edu - Giấy chứng nhận Nhà khoa học AI nhí
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiCertificate";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst ACTS=[['🛡️','AI là gì? Dùng AI an toàn'],['🖍️','Bé dạy AI nhận hình'],\n  ['⚖️','AI có thiên vị không?'],['🍬','Máy tự chia nhóm'],['📈','Máy dự đoán'],['🐰','Thỏ Hồng tự học tìm đường'],['🧠','Mạng nơ-ron mini'],\n  ['👁️','AI nhìn bằng pixel'],['🎧','AI nghe âm thanh'],['💬','Dạy AI hiểu lời nói tử tế'],\n  ['🎯','AI gợi ý cho bạn'],['🗺️','AI chỉ đường'],['⭕','Cờ caro với AI'],['🐾','Máy đoán con vật'],['🎵','AI sáng tác nhạc'],['🔍','AI tìm điều bất thường'],\n  ['🕵️','Thật hay do máy tạo?']];\nconst QUIZ=[{q:'AI học từ đâu?',a:['Từ rất nhiều ví dụ, gọi là dữ liệu','Tự nhiên biết hết mọi thứ','Từ pin trong máy','Từ màn hình máy tính']},\n {q:'Nếu dữ liệu dạy máy bị lệch, máy sẽ thế nào?',a:['Máy cũng hiểu lệch, đoán sai','Máy tự sửa được hết','Máy chạy nhanh hơn','Không có gì thay đổi']},\n {q:'AI trả lời con một câu hỏi. Con nên làm gì?',a:['Kiểm tra lại với sách, thầy cô, bố mẹ','Tin ngay vì AI không bao giờ sai','Chép ngay vào vở','Chia sẻ cho mọi người']},\n {q:'Thỏ Hồng trong AI Lab tự học tìm đường bằng cách nào?',a:['Thử và sai, được thưởng khi đi đúng','Có người chỉ đường từng bước','Đoán bừa mãi không học','Nhìn bản đồ có sẵn']},\n {q:'Thông tin nào KHÔNG nên kể cho AI hay người lạ trên mạng?',a:['Địa chỉ nhà và tên trường của con','Con vật con thích','Màu con thích','Món ăn con thích']},\n {q:'Ở \"Máy tự chia nhóm\", máy chia nhóm kẹo thế nào?',a:['Tự gom kẹo giống nhau mà không cần ai dạy','Con phải dạy từng viên','Chia theo bảng chữ cái','Chia bừa không có quy luật']},\n {q:'Vì sao máy có thể chọn không công bằng?',a:['Vì máy học từ dữ liệu cũ không công bằng','Vì máy ghét một số người','Vì máy bị hết pin','Vì máy chạy quá nhanh']},\n {q:'Nếu chỉ xem theo gợi ý của máy mãi, điều gì có thể xảy ra?',a:['Con chỉ thấy toàn một kiểu nội dung','Con sẽ học giỏi hơn','Máy sẽ tự tắt','Không có gì xảy ra']},\n {q:'Với máy tính, một bức hình thực chất là gì?',a:['Rất nhiều ô nhỏ (pixel), mỗi ô là một con số','Một bức tranh vẽ tay','Một bài hát','Một câu chuyện']},\n {q:'Vì sao đoạn văn, ảnh hay video trên mạng có thể không thật?',a:['Vì AI có thể tạo ra chúng giống như thật','Vì máy tính bị hỏng','Vì mạng chậm','Vì màn hình nhỏ']}];\nlet picked=new Set(),qs=[],qi=0,qok=0;\nconst shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);\nfunction stepUI(n){[1,2,3].forEach(i=>{$('st'+i).className='st'+(i<n?' done':i===n?' on':'');$('p'+i).classList.toggle('hidden',i!==n);});}\nfunction renderActs(){$('acts').innerHTML=ACTS.map((a,i)=>`<button class=\"act\" data-a=\"${i}\" aria-pressed=\"${picked.has(i)}\"><span class=\"em\">${a[0]}</span>${a[1]}<span class=\"ck\">${picked.has(i)?'✓':''}</span></button>`).join('');\n  $('acts').querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const i=+b.dataset.a;picked.has(i)?picked.delete(i):picked.add(i);renderActs();});\n  $('to2').disabled=picked.size<3;$('actCount').textContent=`Đã chọn ${picked.size} hoạt động`;}\n$('to2').onclick=()=>{qs=shuffle(QUIZ).slice(0,5);qi=0;qok=0;stepUI(2);ask();};\nfunction ask(){const box=$('p2');if(qi>=qs.length){const pass=qok>=4;\n    box.innerHTML=`<h2>${pass?'🎉 Con đã vượt qua thử thách!':'💪 Gần được rồi!'}</h2><p class=\"lead\">Con trả lời đúng ${qok} / ${qs.length} câu. ${pass?'Con đã đủ điều kiện nhận giấy chứng nhận!':'Cần đúng ít nhất 4 câu. Con xem lại các hoạt động trong AI Lab rồi thử lại nhé.'}</p>\n      <div class=\"row\">${pass?'<button class=\"btn main\" id=\"to3\">🏅 Nhận giấy chứng nhận</button>':'<button class=\"btn main\" id=\"retry\">↺ Thử lại</button>'}</div>`;\n    if(pass){$('to3').onclick=()=>{stepUI(3);drawCert();};speak('Chúc mừng! Con đã vượt qua thử thách.');}else $('retry').onclick=$('to2').onclick;return;}\n  const q=qs[qi];let done=false;\n  box.innerHTML=`<h2>🧠 Thử thách nhỏ: câu ${qi+1} / ${qs.length}</h2><p class=\"qtext\">${q.q}</p><div class=\"qopts\" id=\"qo\"></div><div id=\"qfb\"></div>`;\n  shuffle(q.a.map((t,k)=>({t,k}))).forEach(o=>{const b=document.createElement('button');b.className='qopt';b.textContent=o.t;\n    b.onclick=()=>{if(done)return;done=true;const ok=o.k===0;if(ok)qok++;b.classList.add(ok?'ok':'no');if(!ok)[...$('qo').children].find(x=>x.textContent===q.a[0]).classList.add('ok');\n      $('qfb').innerHTML=`<div class=\"row\" style=\"margin-top:12px\"><button class=\"btn main\" id=\"nx\">${qi+1<qs.length?'Câu tiếp ➜':'Xem kết quả'}</button></div>`;$('nx').onclick=()=>{qi++;ask();};};$('qo').appendChild(b);});}\n\n/* ---------- vẽ giấy chứng nhận ---------- */\nasync function drawCert(){try{await document.fonts.ready}catch(e){}\n  const c=$('cert'),g=c.getContext('2d'),W=c.width,H=c.height;g.clearRect(0,0,W,H);\n  g.fillStyle='#ffffff';g.fillRect(0,0,W,H);\n  const grad=g.createLinearGradient(0,0,W,H);grad.addColorStop(0,'#ec4899');grad.addColorStop(.35,'#8b5cf6');grad.addColorStop(.7,'#3b82f6');grad.addColorStop(1,'#22c55e');\n  g.lineWidth=26;g.strokeStyle=grad;rr(g,30,30,W-60,H-60,40);g.stroke();\n  g.lineWidth=4;g.strokeStyle='#c4b5fd';g.setLineDash([14,10]);rr(g,64,64,W-128,H-128,28);g.stroke();g.setLineDash([]);\n  const emo=(t,x,y,s)=>{g.font=`${s}px \"Apple Color Emoji\",\"Segoe UI Emoji\",\"Noto Color Emoji\",sans-serif`;g.textAlign='center';g.fillText(t,x,y);};\n  emo('⭐',130,170,64);emo('✨',W-130,170,64);emo('🤖',130,H-110,70);emo('🐰',W-130,H-110,70);\n  const title='\"Baloo 2\",\"Nunito\",sans-serif',body='\"Nunito\",sans-serif';\n  g.textAlign='center';g.fillStyle='#7c3aed';g.font=`800 104px ${title}`;g.fillText('Giấy chứng nhận',W/2,230);\n  g.fillStyle='#ec4899';g.font=`800 56px ${title}`;g.fillText('Nhà khoa học AI nhí',W/2,310);\n  g.fillStyle='#6b5f80';g.font=`700 36px ${body}`;g.fillText('Trao cho',W/2,400);\n  const name=($('name').value.trim()||'Tên của con').slice(0,30);let fs=96;g.font=`800 ${fs}px ${title}`;while(g.measureText(name).width>W-360&&fs>50){fs-=4;g.font=`800 ${fs}px ${title}`;}\n  const ng=g.createLinearGradient(W/2-400,0,W/2+400,0);ng.addColorStop(0,'#ec4899');ng.addColorStop(.5,'#8b5cf6');ng.addColorStop(1,'#3b82f6');g.fillStyle=ng;g.fillText(name,W/2,500);\n  g.strokeStyle='#ddd6fe';g.lineWidth=3;g.beginPath();g.moveTo(W/2-420,530);g.lineTo(W/2+420,530);g.stroke();\n  const cls=$('cls').value.trim();g.fillStyle='#3b2a5c';g.font=`700 36px ${body}`;\n  let y=590;if(cls){g.fillText('Học sinh lớp '+cls.slice(0,10),W/2,y);y+=56;}\n  g.fillText(`Đã hoàn thành ${picked.size} hoạt động khám phá trí tuệ nhân tạo`,W/2,y);g.fillText('và vượt qua thử thách kiến thức tại AI Lab.',W/2,y+50);\n  const icons=[...picked].sort((a,b)=>a-b).map(i=>ACTS[i][0]);const per=9,gap=84;\n  icons.forEach((ic,i)=>{const row=Math.floor(i/per),inRow=Math.min(per,icons.length-row*per),x=W/2-(inRow-1)*gap/2+(i%per)*gap,cy=y+128+row*80;\n    g.fillStyle='#f5f3ff';g.beginPath();g.arc(x,cy,34,0,Math.PI*2);g.fill();emo(ic,x,cy+15,40);});\n  const d=new Date();g.fillStyle='#6b5f80';g.font=`700 30px ${body}`;g.textAlign='left';g.fillText(`Ngày ${d.getDate()} tháng ${d.getMonth()+1} năm ${d.getFullYear()}`,200,H-150);\n  g.textAlign='right';g.fillStyle='#7c3aed';g.font=`800 36px ${title}`;g.fillText('Epsilon Edu',W-200,H-160);g.fillStyle='#6b5f80';g.font=`700 26px ${body}`;g.fillText('Tiến bộ từng ngày',W-200,H-122);\n  // con dấu\n  g.save();g.translate(W-330,H-330);g.rotate(-.18);g.strokeStyle='#ec4899';g.lineWidth=6;g.beginPath();g.arc(0,0,74,0,Math.PI*2);g.stroke();g.lineWidth=2;g.beginPath();g.arc(0,0,62,0,Math.PI*2);g.stroke();\n  g.fillStyle='#ec4899';g.textAlign='center';g.font=`900 24px ${body}`;g.fillText('AI LAB',0,-12);emo('🏅',0,34,40);g.restore();}\nfunction rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();}\n$('name').oninput=drawCert;$('cls').oninput=drawCert;\n$('dl').onclick=()=>{if(!$('name').value.trim()){$('dlNote').textContent='Con nhập họ tên trước nhé!';$('name').focus();return;}drawCert().then(()=>{\n  const url=$('cert').toDataURL('image/png'),fn='giay-chung-nhan-ai-lab.png';\n  if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-download',id:window.__CLASS1_TOOL_INSTANCE_ID__,filename:fn,dataUrl:url},'*')}catch(e){}}\n  else{const a=document.createElement('a');a.href=url;a.download=fn;document.body.appendChild(a);a.click();a.remove();}\n  $('dlNote').textContent='Đã tạo ảnh giấy chứng nhận. Nếu máy không tự tải xuống, con nhờ bố mẹ chụp màn hình nhé.';speak('Chúc mừng nhà khoa học AI nhí!');});};\n$('restart').onclick=()=>{picked.clear();renderActs();stepUI(1);};\nrenderActs();stepUI(1);\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#ffffff;--card:#ffffff;--ink:#344054;--muted:#667085;--line:#e9d5ff;\n  --pink:#ec4899;--pink-strong:#be185d;--pink-soft:#fff1f7;\n  --purple:#7c3aed;--purple-strong:#6d28d9;--purple-soft:#faf5ff;\n  --blue:#2563eb;--blue-strong:#0369a1;--blue-soft:#eff8ff;\n  --green:#16a34a;--green-strong:#047857;--green-soft:#ecfdf5;\n  --amber:#d97706;--amber-soft:#fffbeb;--red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --shadow:0 6px 16px rgba(76,29,149,.07);\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px);background:#fff}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer;transition:transform .16s ease,filter .16s ease,box-shadow .16s ease,border-color .16s ease,background-color .16s ease}\nbutton:not(:disabled):hover{transform:translateY(-1px);filter:brightness(1.015)}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid rgba(59,130,246,.24);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:15px 18px;border:1px solid #ddd6fe;border-radius:22px;background:linear-gradient(135deg,#fff7fb 0%,#faf5ff 52%,#f0f9ff 100%);box-shadow:var(--shadow)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:#fff;border:1px solid #e9d5ff;box-shadow:0 4px 10px rgba(124,58,237,.08)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple-strong);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:3px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.20)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:1px solid var(--line);border-radius:16px;background:var(--card);font-weight:900;font-size:1.02rem;box-shadow:0 3px 9px rgba(15,23,42,.04)}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff;box-shadow:0 5px 12px rgba(139,92,246,.16)}\n.tab[aria-selected=\"true\"] small{color:#fff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:linear-gradient(145deg,#fff 0%,#fdfbff 100%);border:1px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px;box-shadow:0 5px 14px rgba(76,29,149,.05)}\n.card h2{margin:0 0 6px;font-size:1.35rem;color:#5b216e}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:1px solid #ddd6fe;border-radius:14px;background:#fff;color:var(--purple-strong);font-weight:900;box-shadow:0 3px 8px rgba(76,29,149,.05)}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 12px rgba(139,92,246,.18)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#38bdf8,#16a34a);box-shadow:0 5px 12px rgba(14,165,233,.14)}\n.btn:disabled{opacity:.45;cursor:not-allowed;transform:none;filter:none}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:1px solid var(--line);border-radius:14px;background:#fff}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border:1px solid #bae6fd;border-radius:14px;font-weight:800;background:var(--blue-soft);color:var(--blue-strong)}\n.msg.ok{background:var(--green-soft);border-color:#a7f3d0;color:var(--green-strong)}.msg.no{background:var(--pink-soft);border-color:#f9a8d4;color:var(--pink-strong)}\n.tip{border:1px solid #bae6fd;border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px;color:#475467}\n.tip b{color:var(--purple-strong)}\n.warn{border:1px solid #f9a8d4;border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:var(--pink-strong);margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border:1px solid #ddd6fe;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool{border-color:#a7f3d0;background:var(--green-soft)}\n.stat.cool b{background:linear-gradient(90deg,#2563eb,#16a34a);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:#fff;border:1px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple-strong)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.stepper{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0}\n.st{border-radius:16px;padding:10px 12px;border:1px solid var(--line);background:#fff;font-weight:900;text-align:center;color:#667085;box-shadow:0 3px 8px rgba(15,23,42,.035)}\n.st:nth-child(1){background:#fff1f7;border-color:#fbcfe8;color:#be185d}.st:nth-child(2){background:#faf5ff;border-color:#ddd6fe;color:#6d28d9}.st:nth-child(3){background:#eff8ff;border-color:#bae6fd;color:#0369a1}\n.st.on{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff;border-color:transparent;box-shadow:0 5px 12px rgba(139,92,246,.16)}\n.st.done{background:linear-gradient(90deg,#38bdf8,#16a34a);color:#fff;border-color:transparent;box-shadow:0 5px 12px rgba(14,165,233,.12)}\n.acts{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}\n.act{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;border:1px solid var(--line);background:#fff;font-weight:800;text-align:left;box-shadow:0 3px 8px rgba(15,23,42,.035)}\n.act:nth-child(6n+1){background:#fff7fb;border-color:#fbcfe8}.act:nth-child(6n+2){background:#faf5ff;border-color:#ddd6fe}.act:nth-child(6n+3){background:#f0f9ff;border-color:#bae6fd}.act:nth-child(6n+4){background:#ecfdf5;border-color:#a7f3d0}.act:nth-child(6n+5){background:#fffbeb;border-color:#fde68a}.act:nth-child(6n){background:#f0fdfa;border-color:#99f6e4}\n.act .em{font-size:1.6rem}\n.act[aria-pressed=\"true\"]{border-color:#22c55e;background:#ecfdf5;box-shadow:0 0 0 2px rgba(34,197,94,.08)}\n.act .ck{margin-left:auto;width:26px;height:26px;border-radius:50%;border:1px solid #cbd5e1;background:#fff;display:grid;place-items:center;flex:none;font-weight:900}\n.act[aria-pressed=\"true\"] .ck{background:#22c55e;border-color:#22c55e;color:#fff}\n.qtext{font-family:\"Baloo 2\",sans-serif;font-size:1.3rem;font-weight:800;margin:6px 0;color:#344054}\n.qopts{display:grid;gap:8px;margin-top:8px}\n.qopt{min-height:50px;border:1px solid var(--line);border-radius:14px;background:#fff;padding:8px 14px;font-weight:850;text-align:left;box-shadow:0 3px 8px rgba(15,23,42,.035)}\n.qopt:nth-child(4n+1){background:#fff7fb;border-color:#fbcfe8}.qopt:nth-child(4n+2){background:#eff8ff;border-color:#bae6fd}.qopt:nth-child(4n+3){background:#ecfdf5;border-color:#a7f3d0}.qopt:nth-child(4n){background:#fffbeb;border-color:#fde68a}\n.qopt.ok{background:var(--green-soft)!important;border-color:#86efac!important;color:var(--green-strong)}.qopt.no{background:var(--red-soft)!important;border-color:#fda4af!important;color:#be123c}\n.form{display:grid;grid-template-columns:2fr 1fr;gap:10px}\n@media (max-width:600px){.form{grid-template-columns:1fr}.stepper{grid-template-columns:1fr}}\n.form label{display:flex;flex-direction:column;gap:4px;font-weight:850;color:#475467}\n.form input{min-height:50px;border:1px solid #d8b4fe;border-radius:12px;padding:0 14px;background:#fff;font-weight:800;font-size:1.1rem;box-shadow:0 3px 8px rgba(76,29,149,.035)}\n.form input:focus{border-color:#8b5cf6;box-shadow:0 0 0 3px rgba(139,92,246,.10)}\n.certbox{border-radius:18px;overflow:hidden;border:1px solid #ddd6fe;margin-top:12px;background:#fff;box-shadow:0 6px 16px rgba(76,29,149,.06)}\ncanvas#cert{display:block;width:100%;height:auto;background:#fff}\n.note{color:var(--muted);font-weight:700;font-size:.92rem;margin:8px 0 0}";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🏅</div>\n    <div>\n      <h1>Giấy chứng nhận Nhà khoa học AI nhí</h1>\n      <p>Hoàn thành các hoạt động trong AI Lab và vượt qua thử thách nhỏ để nhận giấy chứng nhận có tên của con.</p>\n    </div>\n  </header>\n\n  <div class=\"stepper\"><div class=\"st\" id=\"st1\">1. Con đã thử gì?</div><div class=\"st\" id=\"st2\">2. Thử thách nhỏ</div><div class=\"st\" id=\"st3\">3. Nhận giấy chứng nhận</div></div>\n  <section class=\"card\" id=\"p1\">\n    <h2>🧪 Con đã khám phá những hoạt động nào trong AI Lab?</h2>\n    <p class=\"lead\">Bấm chọn những hoạt động con đã thử. Cần ít nhất 3 hoạt động nhé. Hãy trung thực, vì nhà khoa học luôn trung thực!</p>\n    <div class=\"acts\" id=\"acts\"></div>\n    <div class=\"row\" style=\"margin-top:12px\"><button class=\"btn main\" id=\"to2\" disabled>Tiếp tục ➜</button><span class=\"lbl\" id=\"actCount\"></span></div>\n  </section>\n  <section class=\"card hidden\" id=\"p2\"></section>\n  <section class=\"card hidden\" id=\"p3\">\n    <h2>🏅 Giấy chứng nhận của con</h2>\n    <div class=\"form\"><label>Họ và tên<input id=\"name\" maxlength=\"30\" placeholder=\"Ví dụ: Nguyễn Minh An\"></label><label>Lớp (không bắt buộc)<input id=\"cls\" maxlength=\"10\" placeholder=\"Ví dụ: 3A\"></label></div>\n    <div class=\"certbox\"><canvas id=\"cert\" width=\"1600\" height=\"1131\" aria-label=\"Giấy chứng nhận\"></canvas></div>\n    <div class=\"row\" style=\"margin-top:12px\"><button class=\"btn main\" id=\"dl\">⬇️ Tải giấy chứng nhận</button><button class=\"btn\" id=\"restart\">↺ Làm lại</button></div>\n    <p class=\"note\" id=\"dlNote\">Tên của con chỉ hiện trên giấy chứng nhận này, không được lưu hay gửi đi đâu. Nếu không tải được, con nhờ bố mẹ chụp màn hình nhé.</p>\n  </section>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Giấy chứng nhận Nhà khoa học AI nhí" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
