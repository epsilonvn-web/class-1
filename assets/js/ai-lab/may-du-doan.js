/* Epsilon Edu - Máy dự đoán
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiPrediction";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst SC=[\n {id:'bean',tab:'🌱 Cây đậu lớn lên',title:'Chiều cao cây đậu theo ngày',lead:'Bấm vào biểu đồ để thêm số đo: mỗi ngày cây đậu cao bao nhiêu xăng-ti-mét.',\n  xn:'Ngày thứ',yn:'Chiều cao (cm)',xu:'ngày',yu:'cm',xmin:0,xmax:30,ymin:0,ymax:40,\n  sample:()=>[1,2,3,4,5,6,7,8,9,10,11,12].map(d=>[d,Math.max(0,1.2*d+1+(Math.random()-.5)*2.2)]),\n  say:(x,y)=>`Ngày thứ ${x}, cây đậu cao khoảng ${y} cm`,far:'Thật ra cây đậu không thể cao mãi theo một đường thẳng: đến lúc nào đó cây sẽ ngừng lớn. Máy chỉ biết những gì có trong dữ liệu!'},\n {id:'ice',tab:'🍦 Trời nóng và que kem',title:'Nhiệt độ và số que kem bán được',lead:'Bấm vào biểu đồ để thêm dữ liệu: trời nóng bao nhiêu độ thì cửa hàng bán được bao nhiêu que kem.',\n  xn:'Nhiệt độ (°C)',yn:'Số que kem',xu:'°C',yu:'que kem',xmin:10,xmax:45,ymin:0,ymax:120,\n  sample:()=>[20,22,24,25,27,28,30,31,33,34,35,36].map(t=>[t,Math.max(0,3.2*t-55+(Math.random()-.5)*12)]),\n  say:(x,y)=>`Trời ${x} độ, cửa hàng bán được khoảng ${y} que kem`,far:'Trời quá lạnh hoặc quá nóng là những ngày máy chưa từng thấy. Ví dụ trời 45 độ có thể mọi người ở trong nhà, không ra mua kem!'},\n {id:'read',tab:'📚 Đọc sách',title:'Thời gian đọc và số trang sách',lead:'Bấm vào biểu đồ để thêm dữ liệu: đọc bao nhiêu phút thì được bao nhiêu trang.',\n  xn:'Thời gian (phút)',yn:'Số trang',xu:'phút',yu:'trang',xmin:0,xmax:90,ymin:0,ymax:60,\n  sample:()=>[5,10,12,15,20,25,30,35,40,45].map(m=>[m,Math.max(0,.62*m+(Math.random()-.5)*4)]),\n  say:(x,y)=>`Đọc ${x} phút thì được khoảng ${y} trang`,far:'Đọc quá lâu thì con sẽ mệt và đọc chậm lại, nên dự đoán xa có thể không đúng.'}];\nconst W=620,H=400,L=56,B=44,T=14,Rr=14;\nlet sc=SC[0],data=[],a=0,b=0,learned=false,anim=0,steps=0,dmin=0,dmax=0;\nconst X=v=>L+(v-sc.xmin)/(sc.xmax-sc.xmin)*(W-L-Rr),Y=v=>H-B-(v-sc.ymin)/(sc.ymax-sc.ymin)*(H-B-T);\nconst ix=px=>sc.xmin+(px-L)/(W-L-Rr)*(sc.xmax-sc.xmin),iy=py=>sc.ymin+(H-B-py)/(H-B-T)*(sc.ymax-sc.ymin);\nfunction renderTabs(){$('scen').innerHTML=SC.map(s=>`<button class=\"tab\" role=\"tab\" data-s=\"${s.id}\" aria-selected=\"${s===sc}\">${s.tab}</button>`).join('');\n  $('scen').querySelectorAll('[data-s]').forEach(t=>t.onclick=()=>{sc=SC.find(s=>s.id===t.dataset.s);setup(true);});}\nfunction setup(sample){renderTabs();$('cTitle').textContent=sc.title;$('cLead').textContent=sc.lead;data=sample?sc.sample().map(([x,y])=>[x,Math.round(y*10)/10]):[];\n  const xs=$('xs');xs.min=sc.xmin;xs.max=sc.xmax;xs.step=1;xs.value=Math.round((sc.xmin+sc.xmax)*.7);$('xLabel').textContent=sc.xn;forget();}\nfunction forget(){learned=false;cancelAnimationFrame(anim);a=0;b=data.length?data.reduce((s,d)=>s+d[1],0)/data.length:0;steps=0;$('sStep').textContent=0;$('sErr').textContent='–';\n  $('pred').textContent='Cho máy học trước đã nhé!';$('far').classList.add('hidden');draw();tbl();}\nfunction tbl(){$('tbl').innerHTML=data.slice().sort((p,q)=>p[0]-q[0]).map(d=>`<span>${d[0]} ${sc.xu} → ${d[1]} ${sc.yu}</span>`).join('');}\nfunction mse(){if(!data.length)return 0;return data.reduce((s,[x,y])=>s+Math.abs(a*x+b-y),0)/data.length;}\nfunction draw(px){let h='';const gx=6,gy=5;\n  for(let i=0;i<=gx;i++){const v=sc.xmin+(sc.xmax-sc.xmin)*i/gx,x=X(v);h+=`<line x1=\"${x}\" x2=\"${x}\" y1=\"${T}\" y2=\"${H-B}\" stroke=\"var(--line)\"/><text x=\"${x}\" y=\"${H-B+18}\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"800\" fill=\"var(--muted)\">${Math.round(v)}</text>`;}\n  for(let i=0;i<=gy;i++){const v=sc.ymin+(sc.ymax-sc.ymin)*i/gy,y=Y(v);h+=`<line x1=\"${L}\" x2=\"${W-Rr}\" y1=\"${y}\" y2=\"${y}\" stroke=\"var(--line)\"/><text x=\"${L-8}\" y=\"${y+4}\" text-anchor=\"end\" font-size=\"12\" font-weight=\"800\" fill=\"var(--muted)\">${Math.round(v)}</text>`;}\n  h+=`<text x=\"${(W+L)/2}\" y=\"${H-6}\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"900\" fill=\"var(--muted)\">${sc.xn}</text><text x=\"14\" y=\"${(H-B)/2}\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"900\" fill=\"var(--muted)\" transform=\"rotate(-90 14 ${(H-B)/2})\">${sc.yn}</text>`;\n  if(data.length){dmin=Math.min(...data.map(d=>d[0]));dmax=Math.max(...data.map(d=>d[0]));\n    h+=`<rect x=\"${X(dmin)}\" y=\"${T}\" width=\"${Math.max(2,X(dmax)-X(dmin))}\" height=\"${H-B-T}\" fill=\"#22c55e\" opacity=\".06\"/>`;}\n  if(learned||steps){const x1=sc.xmin,x2=sc.xmax;h+=`<defs><linearGradient id=\"lg\" x1=\"0\" x2=\"1\"><stop offset=\"0\" stop-color=\"#ec4899\"/><stop offset=\"1\" stop-color=\"#8b5cf6\"/></linearGradient><clipPath id=\"cp\"><rect x=\"${L}\" y=\"${T}\" width=\"${W-L-Rr}\" height=\"${H-B-T}\"/></clipPath></defs>\n    <line x1=\"${X(x1)}\" y1=\"${Y(a*x1+b)}\" x2=\"${X(x2)}\" y2=\"${Y(a*x2+b)}\" stroke=\"url(#lg)\" stroke-width=\"4\" stroke-linecap=\"round\" clip-path=\"url(#cp)\"/>`;\n    data.forEach(([x,y])=>{h+=`<line x1=\"${X(x)}\" x2=\"${X(x)}\" y1=\"${Y(y)}\" y2=\"${Y(a*x+b)}\" stroke=\"#ec4899\" stroke-dasharray=\"3 3\" stroke-width=\"1.3\" opacity=\".6\" clip-path=\"url(#cp)\"/>`;});}\n  data.forEach(([x,y])=>h+=`<circle cx=\"${X(x)}\" cy=\"${Y(y)}\" r=\"7\" fill=\"#3b82f6\" stroke=\"#fff\" stroke-width=\"2.5\"/>`);\n  if(px!=null&&learned){const py=a*px+b;h+=`<line x1=\"${X(px)}\" x2=\"${X(px)}\" y1=\"${H-B}\" y2=\"${Y(py)}\" stroke=\"#22c55e\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><line x1=\"${L}\" x2=\"${X(px)}\" y1=\"${Y(py)}\" y2=\"${Y(py)}\" stroke=\"#22c55e\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"${X(px)}\" cy=\"${Y(py)}\" r=\"9\" fill=\"#22c55e\" stroke=\"#fff\" stroke-width=\"3\"/>`;}\n  if(!data.length)h+=`<text x=\"${(W+L)/2}\" y=\"${H/2}\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"800\" fill=\"var(--muted)\">Bấm vào đây để thêm điểm dữ liệu</text>`;\n  $('ch').innerHTML=h;}\n$('ch').addEventListener('click',e=>{const s=$('ch'),p=s.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(s.getScreenCTM().inverse());\n  if(q.x<L||q.y>H-B||q.y<T)return;const x=Math.round(ix(q.x)),y=Math.round(iy(q.y)*10)/10;if(data.length>=40)return;data.push([x,Math.max(sc.ymin,y)]);forget();});\n$('sample').onclick=()=>setup(true);$('clear').onclick=()=>{data=[];forget();};\n$('learn').onclick=()=>{if(data.length<3){$('pred').textContent='Cần ít nhất 3 điểm dữ liệu để máy học.';return;}\n  cancelAnimationFrame(anim);learned=false;\n  // chuẩn hóa để chỉnh dần ổn định, rồi đổi về đơn vị thật\n  const xm=data.reduce((s,d)=>s+d[0],0)/data.length,xsd=Math.sqrt(data.reduce((s,d)=>s+(d[0]-xm)**2,0)/data.length)||1;\n  const ym=data.reduce((s,d)=>s+d[1],0)/data.length,ysd=Math.sqrt(data.reduce((s,d)=>s+(d[1]-ym)**2,0)/data.length)||1;\n  let w=-.6,c=.8;steps=0;const lr=.08;\n  const toReal=()=>{a=w*ysd/xsd;b=ym+c*ysd-a*xm;};\n  const tick=()=>{for(let k=0;k<2;k++){let gw=0,gc=0;data.forEach(([x,y])=>{const xn=(x-xm)/xsd,yn=(y-ym)/ysd,e=w*xn+c-yn;gw+=e*xn;gc+=e;});w-=lr*gw/data.length;c-=lr*gc/data.length;steps++;}\n    toReal();$('sStep').textContent=steps;$('sErr').textContent=mse().toFixed(1).replace('.',',')+' '+sc.yu;draw();\n    if(steps<120)anim=requestAnimationFrame(tick);else{learned=true;predict();speak('Máy đã học xong. Kéo thanh trượt để máy dự đoán.');}};\n  tick();};\nfunction predict(){if(!learned)return;const x=+$('xs').value,y=Math.max(0,a*x+b),yr=Math.round(y*10)/10;$('xv').textContent=x+' '+sc.xu;\n  $('pred').innerHTML=`Máy dự đoán: ${sc.say(x,`<b>${yr.toLocaleString('vi-VN')}</b>`)}`;draw(x);\n  const span=dmax-dmin||1,far=x<dmin-span*.25||x>dmax+span*.25;const f=$('far');f.classList.toggle('hidden',!far);if(far)f.innerHTML='⚠️ <b>Xa quá dữ liệu đã có!</b> '+sc.far;}\n$('xs').oninput=()=>{$('xv').textContent=$('xs').value+' '+sc.xu;predict();};\nsetup(true);$('xv').textContent=$('xs').value+' '+sc.xu;\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#ffffff;--card:#ffffff;--ink:#344054;--muted:#667085;--line:#e9d5ff;\n  --pink:#ec4899;--pink-soft:#fff1f7;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#ecfdf5;--blue:#2563eb;--blue-soft:#eff8ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px);background:#fff;color-scheme:light}\nbody{margin:0;background:#fff;color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid rgba(124,58,237,.22);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid #ddd6fe;border-radius:22px;background:linear-gradient(135deg,#fff7fb 0%,#faf5ff 55%,#eff8ff 100%);box-shadow:0 7px 18px rgba(76,29,149,.07)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:#fff;border:1px solid #e9d5ff;box-shadow:0 4px 10px rgba(76,29,149,.07)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.20)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:1px solid #e9d5ff;border-radius:16px;background:#faf5ff;font-weight:900;font-size:1.02rem;color:#6d28d9;box-shadow:0 3px 8px rgba(76,29,149,.04)}\n.tab:nth-child(2){background:#eff8ff;border-color:#bae6fd;color:#2563eb}.tab:nth-child(3){background:#f0fdf4;border-color:#bbf7d0;color:#047857}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff;box-shadow:0 5px 12px rgba(139,92,246,.18)}\n.tab[aria-selected=\"true\"] small{color:#fff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:linear-gradient(145deg,#fff 0%,#fcfaff 100%);border:1px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px;box-shadow:0 5px 14px rgba(15,23,42,.045)}\n.card h2{margin:0 0 6px;font-size:1.35rem;color:#5b216e}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:1px solid #ddd6fe;border-radius:14px;background:#faf5ff;font-weight:900;color:#6d28d9;box-shadow:0 3px 8px rgba(76,29,149,.05)}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 12px rgba(139,92,246,.18)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e);box-shadow:0 5px 12px rgba(59,130,246,.15)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:1px solid #ddd6fe;border-radius:14px;background:#faf5ff}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border:1px solid #bae6fd;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{border-color:#a7f3d0;background:var(--green-soft);color:#047857}.msg.no{border-color:#fbcfe8;background:var(--pink-soft);color:#be185d}\n.tip{border:1px solid #bae6fd;border-radius:16px;padding:12px 14px;background:linear-gradient(135deg,#eff8ff,#f0fdf4);font-weight:700;margin-top:12px;color:#475467}\n.tip b{color:var(--purple)}\n.warn{border:1px solid #fbcfe8;border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:#be185d;margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border:1px solid #ddd6fe;border-radius:14px;padding:8px 12px;background:#faf5ff;font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool{border-color:#bae6fd;background:linear-gradient(135deg,#eff8ff,#f0fdf4)}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text;color:transparent}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:#faf5ff;border:1px solid #e9d5ff;font-weight:700;font-size:.95rem;box-shadow:0 3px 9px rgba(76,29,149,.035)}\n.step:nth-child(2){background:#eff8ff;border-color:#bae6fd}.step:nth-child(3){background:#f0fdf4;border-color:#bbf7d0}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.step:nth-child(2) b{color:#2563eb}.step:nth-child(3) b{color:#047857}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0;padding:10px 12px;border:1px solid #e9d5ff;border-radius:14px;background:#faf5ff}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.chart{border-radius:18px;background:#fff;border:1px solid #ddd6fe;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(124,58,237,.02)}\nsvg.ch{display:block;width:100%;height:auto;cursor:crosshair;touch-action:manipulation;background:linear-gradient(180deg,#fff 0%,#fdfbff 100%)}\n.pred{font-family:\"Baloo 2\",sans-serif;font-size:1.35rem;font-weight:800;margin:8px 0;padding:10px 12px;border:1px solid #bae6fd;border-radius:14px;background:linear-gradient(135deg,#eff8ff,#f0fdf4);color:#475467}\n.pred b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:1.6rem}\n.tbl{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}\n.tbl span{border:1px solid #ddd6fe;background:#faf5ff;border-radius:10px;padding:3px 10px;font-weight:800;font-size:.9rem;color:#5b216e}\n.tbl span:nth-child(4n+2){background:#eff8ff;border-color:#bae6fd;color:#1d4ed8}.tbl span:nth-child(4n+3){background:#f0fdf4;border-color:#bbf7d0;color:#047857}.tbl span:nth-child(4n){background:#fff1f7;border-color:#fbcfe8;color:#be185d}\n:root[data-theme=\"dark\"],:root[data-theme=\"light\"]{color-scheme:light}\n"
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">📈</div>\n    <div>\n      <h1>Máy dự đoán <span class=\"ai\">✨ AI</span></h1>\n      <p>Cho máy xem dữ liệu thật, máy tìm ra quy luật rồi dự đoán điều chưa xảy ra. Đây là cách AI dự báo từ dữ liệu.</p>\n    </div>\n  </header>\n\n  <div class=\"tabs\" role=\"tablist\" id=\"scen\"></div>\n  <div class=\"grid\">\n    <section class=\"card\">\n      <h2 id=\"cTitle\"></h2>\n      <p class=\"lead\" id=\"cLead\"></p>\n      <div class=\"chart\"><svg class=\"ch\" id=\"ch\" viewBox=\"0 0 620 400\" aria-label=\"Biểu đồ dữ liệu\"></svg></div>\n      <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn\" id=\"sample\">📋 Dữ liệu mẫu</button><button class=\"btn\" id=\"clear\">🧽 Xóa hết điểm</button></div>\n      <div class=\"tbl\" id=\"tbl\"></div>\n    </section>\n    <section>\n      <div class=\"card\">\n        <h2>🧠 Bước 1: Máy học</h2>\n        <p class=\"lead\">Máy tìm một đường thẳng đi gần tất cả các điểm nhất. Lúc đầu máy đoán bừa, rồi chỉnh dần cho sai ít hơn.</p>\n        <div class=\"row\"><button class=\"btn main\" id=\"learn\">🧠 Cho máy học</button></div>\n        <div class=\"stats\"><div class=\"stat\">Lần chỉnh<b id=\"sStep\">0</b></div><div class=\"stat cool\">Sai trung bình<b id=\"sErr\">–</b></div></div>\n      </div>\n      <div class=\"card\">\n        <h2>🔮 Bước 2: Máy dự đoán</h2>\n        <label class=\"slider\"><span id=\"xLabel\"></span><input type=\"range\" id=\"xs\"><small id=\"xv\"></small></label>\n        <p class=\"pred\" id=\"pred\">Cho máy học trước đã nhé!</p>\n        <div class=\"warn hidden\" id=\"far\"></div>\n      </div>\n    </section>\n  </div>\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Thu thập dữ liệu</b>Mỗi điểm trên biểu đồ là một lần quan sát thật, ví dụ đo chiều cao cây đậu vào một ngày.</div>\n    <div class=\"step\"><b>2. Tìm quy luật</b>Máy vẽ một đường thẳng, đo xem đường đó sai bao nhiêu so với các điểm, rồi chỉnh dần cho sai ít nhất.</div>\n    <div class=\"step\"><b>3. Dự đoán</b>Dùng đường thẳng đã học để đoán những điều chưa xảy ra. Nhưng đoán càng xa dữ liệu đã có thì càng dễ sai!</div>\n  </div>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Máy dự đoán" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
