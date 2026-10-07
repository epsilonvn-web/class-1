/* Epsilon Edu - AI là gì? Dùng AI an toàn
 * Module lazy-load cho AI Lab (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiSafety";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;speechSynthesis.speak(u)}catch(e){}}\nconst shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);\n\n/* ---------- đồ vật nào có AI ---------- */\nconst THINGS=[\n ['🧮','Máy tính bỏ túi',0,'Máy tính bỏ túi chỉ làm đúng phép tính được cài sẵn, không tự học nên không phải AI.'],\n ['🗺️','Ứng dụng bản đồ chỉ đường',1,'Có AI! Ứng dụng tự tìm đường nhanh nhất và đoán chỗ nào sắp tắc đường.'],\n ['🌀','Quạt điện',0,'Quạt điện chỉ quay theo nút bấm, không có AI.'],\n ['🗣️','Trợ lý giọng nói trên điện thoại',1,'Có AI! Nó học cách hiểu giọng nói của rất nhiều người.'],\n ['🔦','Đèn pin',0,'Đèn pin chỉ bật tắt, không có AI.'],\n ['📺','Mục gợi ý video',1,'Có AI! Nó học từ những video người xem đã thích để gợi ý tiếp.'],\n ['🌐','Ứng dụng dịch tiếng Anh',1,'Có AI! Nó học từ rất nhiều câu đã được dịch sẵn.'],\n ['⏰','Đồng hồ báo thức',0,'Đồng hồ báo thức chỉ kêu đúng giờ đã cài, không có AI.'],\n ['📷','Điện thoại mở khóa bằng khuôn mặt',1,'Có AI! Máy học để nhận ra khuôn mặt chủ nhân.'],\n ['🚦','Đèn giao thông chạy theo giờ cố định',0,'Đèn chuyển màu theo giờ cài sẵn thì không có AI. (Một số đèn hiện đại có dùng AI để đo lượng xe đấy!)'],\n ['🖨️','Máy in',0,'Máy in chỉ in đúng thứ được gửi tới, không có AI.'],\n ['🤖','Chatbot trò chuyện',1,'Có AI! Chatbot học từ rất nhiều chữ viết để trả lời. Nhưng chatbot vẫn có thể trả lời sai.']];\nlet sq=[],si=0,sok=0;\nfunction sortStart(){sq=shuffle(THINGS).slice(0,8);si=0;sok=0;sortAsk();}\nfunction sortAsk(){const c=$('sortCard');if(si>=sq.length){c.innerHTML=`<div class=\"thing\">🏆</div><p class=\"thingname\">Con đúng ${sok} / ${sq.length} đồ vật!</p><p class=\"lead\">Nhớ nhé: thứ gì <b>tự học từ dữ liệu</b> để nhận ra, đoán hay gợi ý thì có AI. Thứ gì chỉ làm đúng việc được cài sẵn thì không phải AI.</p><div class=\"row\"><button class=\"btn main\" id=\"sAgain\">Chơi lại</button></div>`;$('sAgain').onclick=sortStart;return;}\n  const t=sq[si];let done=false;\n  c.innerHTML=`<p class=\"muted\">Câu ${si+1} / ${sq.length}</p><div class=\"prog\"><i style=\"width:${si/sq.length*100}%\"></i></div><div class=\"thing\">${t[0]}</div><p class=\"thingname\">${t[1]}</p>\n    <div class=\"yn\"><button class=\"y\" id=\"hasAI\">✨ Có AI</button><button class=\"n\" id=\"noAI\">Không có AI</button></div><div class=\"fb\" id=\"sfb\">Con nghĩ đồ vật này có dùng AI không?</div>`;\n  const ans=v=>{if(done)return;done=true;const ok=v===t[2];if(ok)sok++;const f=$('sfb');f.className='fb '+(ok?'ok':'no');f.textContent=(ok?'Đúng rồi! ':'Chưa đúng. ')+t[3];speak(t[3]);\n    const nx=document.createElement('button');nx.className='btn main';nx.style.marginTop='12px';nx.textContent='Tiếp theo ➜';nx.onclick=()=>{si++;sortAsk();};c.appendChild(nx);};\n  $('hasAI').onclick=()=>ans(1);$('noAI').onclick=()=>ans(0);}\n\n/* ---------- 6 quy tắc ---------- */\nconst RULES=[\n ['🔒','Giữ bí mật thông tin cá nhân','Không nói tên đầy đủ, địa chỉ nhà, tên trường, số điện thoại hay gửi ảnh của mình cho AI hoặc người lạ trên mạng.'],\n ['🤔','AI có thể sai','AI đôi khi trả lời sai mà vẫn nói rất tự tin. Hãy kiểm tra lại với sách, thầy cô và bố mẹ.'],\n ['👨‍👩‍👧','Hỏi bố mẹ trước','Trước khi dùng một ứng dụng hay trang web AI mới, con hãy hỏi ý kiến bố mẹ.'],\n ['✍️','AI là trợ thủ, không làm bài hộ','Con tự suy nghĩ và làm bài trước. AI chỉ giúp con hiểu bài, không làm thay con.'],\n ['🕵️','Cẩn thận với hình ảnh, video giả','AI có thể tạo ra ảnh, video, giọng nói trông như thật. Đừng vội tin và đừng chia sẻ tiếp.'],\n ['🆘','Thấy sợ thì nói ngay với người lớn','Nếu gặp điều gì làm con sợ, khó chịu hay bối rối, hãy dừng lại và kể ngay với bố mẹ, thầy cô.']];\n$('rules').innerHTML=RULES.map((r,i)=>`<button class=\"rule\" data-r=\"${i}\"><span class=\"ic\">${r[0]}</span><b>${r[1]}</b>${r[2]}</button>`).join('');\n$('rules').querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{const r=RULES[+b.dataset.r];speak(r[1]+'. '+r[2]);});\n\n/* ---------- tình huống ---------- */\nconst CASES=[\n {e:'🤖💬',q:'Một chatbot hỏi: \"Nhà bạn ở đâu? Bạn học trường nào?\" Con làm gì?',a:['Không trả lời, và kể với bố mẹ','Trả lời đầy đủ cho chatbot','Chỉ nói tên trường thôi','Gửi ảnh cổng trường cho nó'],w:'Địa chỉ nhà và tên trường là thông tin cá nhân, phải giữ bí mật.'},\n {e:'📚🤖',q:'Con nhờ AI giải bài toán và nhận được đáp số. Con nên làm gì?',a:['Tự giải lại để kiểm tra và hiểu cách làm','Chép ngay vào vở','Tin chắc chắn là đúng','Nhờ AI làm hết các bài còn lại'],w:'AI có thể sai. Tự làm lại giúp con kiểm tra và thực sự hiểu bài.'},\n {e:'📱🎥',q:'Con thấy video một người nổi tiếng nói điều rất lạ, các bạn đang chia sẻ khắp nơi. Con làm gì?',a:['Không chia sẻ tiếp, hỏi người lớn xem có thật không','Chia sẻ ngay cho mọi người','Tin luôn vì video trông rất thật','Bình luận chê bai người đó'],w:'Video có thể do AI làm giả. Hãy kiểm tra trước khi tin, và đừng chia sẻ khi chưa chắc.'},\n {e:'🎁📲',q:'Một ứng dụng nói: \"Gửi ảnh khuôn mặt để nhận quà miễn phí!\" Con làm gì?',a:['Không gửi, đóng ứng dụng và báo bố mẹ','Gửi ảnh ngay để nhận quà','Gửi ảnh của bạn khác','Gửi ảnh cả nhà'],w:'Ảnh khuôn mặt là thông tin riêng tư. Lời mời nhận quà như vậy thường là bẫy.'},\n {e:'🗺️🤔',q:'AI trả lời rằng \"Thủ đô của Việt Nam là TP. Hồ Chí Minh\". Con nghĩ sao?',a:['AI đã nói sai, thủ đô là Hà Nội','AI luôn đúng nên phải tin','Thủ đô có hai nơi','Không cần quan tâm'],w:'AI có thể nói sai mà vẫn rất tự tin. Thủ đô của Việt Nam là Hà Nội.'},\n {e:'😟💻',q:'Đang dùng một trang web, con thấy hình ảnh làm con sợ. Con làm gì?',a:['Tắt đi và kể ngay với bố mẹ hoặc thầy cô','Giữ bí mật một mình','Xem tiếp cho hết','Gửi cho bạn bè xem'],w:'Con không có lỗi khi gặp điều đáng sợ. Hãy dừng lại và nói với người lớn để được giúp đỡ.'},\n {e:'✍️🎨',q:'Cô giao vẽ tranh về gia đình. Bạn rủ con nhờ AI vẽ rồi nộp. Con làm gì?',a:['Tự vẽ tranh của mình, vì đó là bài của con','Nhờ AI vẽ rồi ghi tên mình','Lấy tranh AI vẽ của bạn','Không nộp bài'],w:'Bài tập là để con luyện tập. Nộp tranh do AI vẽ mà nói là của mình là không trung thực.'}];\nlet cq=[],ci=0,cok=0;\nfunction quizStart(){cq=shuffle(CASES);ci=0;cok=0;quizAsk();}\nfunction quizAsk(){const box=$('quizCard');\n  if(ci>=cq.length){const pass=cok>=cq.length-1;box.innerHTML=`<div class=\"badge\"><div class=\"medal\">${pass?'🏅':'⭐'}</div><h2>${pass?'Chúc mừng Nhà thám hiểm AI an toàn!':'Cố gắng thêm nhé!'}</h2>\n      <p class=\"big\">Con trả lời đúng ${cok} / ${cq.length} tình huống.</p><p class=\"lead\">${pass?'Con đã sẵn sàng khám phá AI Lab một cách an toàn!':'Con xem lại 6 quy tắc an toàn rồi thử lại nhé.'}</p><div class=\"row\"><button class=\"btn main\" id=\"qAgain\">Làm lại</button></div></div>`;$('qAgain').onclick=quizStart;speak(pass?'Chúc mừng! Con đã sẵn sàng khám phá AI Lab an toàn.':'Cố gắng thêm nhé!');return;}\n  const c=cq[ci];let done=false;\n  box.innerHTML=`<div class=\"row\" style=\"justify-content:space-between\"><span class=\"muted\">Tình huống ${ci+1} / ${cq.length}</span><span class=\"muted\">⭐ ${cok}</span></div><div class=\"prog\"><i style=\"width:${ci/cq.length*100}%\"></i></div>\n    <div class=\"scene\" aria-hidden=\"true\">${c.e}</div><p class=\"qtext\">${c.q}</p><div class=\"qopts\" id=\"qo\"></div><div class=\"fb hidden\" id=\"qfb\"></div>`;\n  shuffle(c.a.map((t,k)=>({t,k}))).forEach(o=>{const b=document.createElement('button');b.className='qopt';b.textContent=o.t;\n    b.onclick=()=>{if(done)return;done=true;const ok=o.k===0;if(ok)cok++;b.classList.add(ok?'ok':'no');if(!ok)[...$('qo').children].find(x=>x.textContent===c.a[0]).classList.add('ok');\n      const f=$('qfb');f.classList.remove('hidden');f.className='fb '+(ok?'ok':'no');f.textContent=(ok?'Đúng rồi! ':'Chưa đúng. ')+c.w;speak(c.w);\n      const nx=document.createElement('button');nx.className='btn main';nx.style.marginTop='12px';nx.textContent=ci+1<cq.length?'Tình huống tiếp ➜':'Xem kết quả';nx.onclick=()=>{ci++;quizAsk();};box.appendChild(nx);};\n    $('qo').appendChild(b);});speak(c.q);}\n\n/* ---------- tabs ---------- */\ndocument.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{const t=b.dataset.tab;document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===b));\n  $('pWhat').classList.toggle('hidden',t!=='what');$('pSort').classList.toggle('hidden',t!=='sort');$('pRules').classList.toggle('hidden',t!=='rules');$('pQuiz').classList.toggle('hidden',t!=='quiz');\n  if(t==='sort'&&!sq.length)sortStart();if(t==='quiz'&&!cq.length)quizStart();});\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;--red:#e11d48;--red-soft:#fff1f2;--orange:#c2410c;--orange-soft:#fff7ed;--blue-soft:#eff6ff;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--red:#ff7482;--red-soft:#4a2228;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--red:#ff7482;--red-soft:#4a2228;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.55}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1100px;margin:0 auto;padding:18px 14px 40px}\nbutton{font:inherit;color:inherit;cursor:pointer}\nbutton:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple)}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:14px 0}\n@media (max-width:760px){.tabs{grid-template-columns:repeat(2,minmax(0,1fr))}}\n.tab{min-height:56px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-weight:900;font-size:1rem}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:18px;margin-bottom:14px}\n.card h2{margin:0 0 8px;font-size:1.45rem}\n.lead{margin:0 0 12px;color:var(--muted);font-weight:700}\n.big{font-size:1.15rem;font-weight:700}\n.examples{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-top:12px}\n.ex{border-radius:16px;padding:12px;background:var(--purple-soft);font-weight:700}\n.ex b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem}\n.ex .ic{font-size:1.8rem}\n.kinds{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-top:12px}\n.kind{border-radius:16px;padding:12px;border:2px solid var(--line);font-weight:700}\n.kind b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.sortq{text-align:center}\n.thing{font-size:4rem;line-height:1.1}\n.thingname{font-family:\"Baloo 2\",sans-serif;font-size:1.6rem;font-weight:800;margin:6px 0 12px}\n.yn{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:520px;margin:0 auto}\n.yn button{min-height:60px;border-radius:16px;border:none;font-weight:900;font-size:1.05rem;color:#fff}\n.yn .y{background:linear-gradient(90deg,#ec4899,#8b5cf6)}.yn .n{background:#64748b}\n.fb{min-height:3.2em;margin-top:12px;padding:10px 14px;border-radius:14px;font-weight:800;background:var(--blue-soft);text-align:left}\n.fb.ok{background:var(--green-soft);color:var(--green)}.fb.no{background:var(--orange-soft);color:var(--orange)}\n.rules{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}\n.rule{border-radius:18px;padding:14px;font-weight:700;border:2px solid var(--line);background:var(--card);text-align:left;cursor:pointer}\n.rule .ic{font-size:2.2rem;line-height:1}\n.rule b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.2rem;margin:6px 0 4px;color:var(--purple)}\n.rule:nth-child(6n+1){background:#fdf2f8}.rule:nth-child(6n+2){background:#eff6ff}.rule:nth-child(6n+3){background:#f0fdf4}.rule:nth-child(6n+4){background:#fff7ed}.rule:nth-child(6n+5){background:#f5f3ff}.rule:nth-child(6n){background:#fefce8}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]) .rule{background:var(--card) !important}}\n:root[data-theme=\"dark\"] .rule{background:var(--card) !important}\n.qopts{display:grid;gap:8px;margin-top:10px}\n.qopt{min-height:52px;border:2px solid var(--line);border-radius:14px;background:var(--card);padding:8px 14px;font-weight:800;text-align:left}\n.qopt.ok{background:var(--green-soft);border-color:var(--green)}.qopt.no{background:var(--red-soft);border-color:var(--red)}\n.qtext{font-family:\"Baloo 2\",sans-serif;font-size:1.3rem;font-weight:800;margin:4px 0}\n.scene{font-size:3rem;text-align:center;line-height:1.2}\n.prog{height:10px;border-radius:99px;background:var(--purple-soft);overflow:hidden;margin:6px 0 10px}\n.prog i{display:block;height:100%;background:linear-gradient(90deg,#ec4899,#8b5cf6);transition:width .3s}\n.muted{color:var(--muted);font-weight:800}\n.btn{min-height:48px;padding:0 18px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center}\n.badge{text-align:center;padding:20px;border-radius:22px;background:linear-gradient(135deg,#fdf2f8,#eff6ff);border:3px dashed #c4b5fd}\n.badge .medal{font-size:4.5rem}\n.parent{border-radius:18px;padding:14px 16px;background:var(--blue-soft);font-weight:700}\n.parent b{color:var(--purple)}\n.hidden{display:none !important}";
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
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🛡️</div>\n    <div>\n      <h1>AI là gì? Dùng AI an toàn</h1>\n      <p>Cửa vào AI Lab: tìm hiểu AI là gì, AI ở quanh ta, và những quy tắc để dùng AI an toàn.</p>\n    </div>\n  </header>\n\n  <div class=\"tabs\" role=\"tablist\">\n    <button class=\"tab\" role=\"tab\" aria-selected=\"true\" data-tab=\"what\">🤖 AI là gì?</button>\n    <button class=\"tab\" role=\"tab\" aria-selected=\"false\" data-tab=\"sort\">🔎 Đồ vật nào có AI?</button>\n    <button class=\"tab\" role=\"tab\" aria-selected=\"false\" data-tab=\"rules\">🛡️ 6 quy tắc an toàn</button>\n    <button class=\"tab\" role=\"tab\" aria-selected=\"false\" data-tab=\"quiz\">❓ Con sẽ làm gì?</button>\n  </div>\n\n  <section id=\"pWhat\">\n    <div class=\"card\">\n      <h2>🤖 AI là gì?</h2>\n      <p class=\"big\">AI là viết tắt của <b>trí tuệ nhân tạo</b>. Đó là những chiếc máy tính được con người dạy để làm những việc cần sự thông minh, như nhận ra hình ảnh, hiểu lời nói, gợi ý, chơi cờ hay sáng tác.</p>\n      <p class=\"big\">Điều đặc biệt: AI không được dạy từng bước như máy tính bỏ túi. AI <b>học từ rất nhiều ví dụ</b> (gọi là dữ liệu), rồi tự tìm ra quy luật.</p>\n      <div class=\"examples\">\n        <div class=\"ex\"><span class=\"ic\">🗺️</span><b>Bản đồ chỉ đường</b>Tìm đường đi nhanh nhất, tránh chỗ tắc đường.</div>\n        <div class=\"ex\"><span class=\"ic\">🗣️</span><b>Trợ lý giọng nói</b>Nghe và hiểu khi người lớn nói chuyện với điện thoại.</div>\n        <div class=\"ex\"><span class=\"ic\">🌐</span><b>Dịch tiếng nước ngoài</b>Dịch câu tiếng Anh sang tiếng Việt và ngược lại.</div>\n        <div class=\"ex\"><span class=\"ic\">📺</span><b>Gợi ý video</b>Đoán xem con có thể thích xem gì tiếp theo.</div>\n        <div class=\"ex\"><span class=\"ic\">📷</span><b>Điện thoại nhận khuôn mặt</b>Mở khóa máy khi nhận ra mặt chủ nhân.</div>\n        <div class=\"ex\"><span class=\"ic\">🩺</span><b>Giúp bác sĩ</b>Xem ảnh chụp để tìm dấu hiệu bệnh.</div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <h2>🧪 Trong AI Lab, con sẽ được thử các kiểu AI</h2>\n      <div class=\"kinds\">\n        <div class=\"kind\"><b>🖍️ Học từ ví dụ</b>Bé dạy AI nhận hình, Dạy AI hiểu lời nói tử tế</div>\n        <div class=\"kind\"><b>🎵 Tạo ra cái mới</b>AI sáng tác nhạc</div>\n        <div class=\"kind\"><b>🐰 Học bằng thử và sai</b>Thỏ Hồng tự học tìm đường</div>\n        <div class=\"kind\"><b>🌳 Hỏi để ra quyết định</b>Máy đoán con vật</div>\n        <div class=\"kind\"><b>⭕ Suy tính trước</b>Cờ caro với AI</div>\n      </div>\n    </div>\n    <div class=\"parent\"><b>Dành cho phụ huynh và thầy cô:</b> Các hoạt động trong AI Lab chạy ngay trên máy, không cần tài khoản, không dùng camera hay micro, và không gửi dữ liệu của trẻ đi đâu. Mục tiêu là giúp trẻ hiểu AI học như thế nào, AI có thể sai ra sao, và dùng AI có trách nhiệm.</div>\n  </section>\n\n  <section id=\"pSort\" class=\"hidden\">\n    <div class=\"card sortq\" id=\"sortCard\"></div>\n  </section>\n\n  <section id=\"pRules\" class=\"hidden\">\n    <div class=\"card\">\n      <h2>🛡️ 6 quy tắc dùng AI an toàn</h2>\n      <p class=\"lead\">Bấm vào từng thẻ để nghe đọc to.</p>\n      <div class=\"rules\" id=\"rules\"></div>\n    </div>\n  </section>\n\n  <section id=\"pQuiz\" class=\"hidden\">\n    <div class=\"card\" id=\"quizCard\"></div>\n  </section>\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="AI là gì? Dùng AI an toàn" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
