/* Epsilon Edu - Máy tự chia nhóm
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiClustering";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst COLS=['#ec4899','#8b5cf6','#3b82f6','#22c55e'],NAMES=['hồng','tím','xanh dương','xanh lá'];\nconst W=600,H=420,PAD=40;\nlet pts=[],cent=[],K=3,phase='idle',iter=0,timer=0,changed=true;\nconst rnd=(a,b)=>a+Math.random()*(b-a);\nfunction gauss(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}\nfunction sprinkle(){const n=K;const centers=[];for(let i=0;i<n;i++){let c,tries=0;do{c=[rnd(PAD+50,W-PAD-50),rnd(PAD+50,H-PAD-50)];tries++;}while(centers.some(d=>Math.hypot(d[0]-c[0],d[1]-c[1])<170)&&tries<200);centers.push(c);}\n  pts=[];centers.forEach(c=>{for(let i=0;i<14;i++)pts.push({x:clampX(c[0]+gauss()*34),y:clampY(c[1]+gauss()*30),g:-1});});reset();}\nconst clampX=x=>Math.max(PAD+8,Math.min(W-12,x)),clampY=y=>Math.max(12,Math.min(H-PAD-8,y));\nfunction randomPts(){pts=[];for(let i=0;i<40;i++)pts.push({x:rnd(PAD+10,W-14),y:rnd(14,H-PAD-10),g:-1});reset();}\nfunction reset(){cent=[];phase='idle';iter=0;clearInterval(timer);pts.forEach(p=>p.g=-1);ui();draw();\n  msg(pts.length<K*2?'Thêm kẹo lên bàn rồi bấm \"Đặt tâm nhóm\" nhé!':'Bấm \"Đặt tâm nhóm\" để máy bắt đầu.');}\nfunction msg(t,c){const m=$('msg');m.className='msg'+(c?' '+c:'');m.textContent=t;}\nfunction draw(){let h=`<rect width=\"${W}\" height=\"${H}\" fill=\"var(--paper)\"/>`;\n  for(let i=1;i<6;i++)h+=`<line x1=\"${PAD}\" x2=\"${W}\" y1=\"${(H-PAD)*i/6}\" y2=\"${(H-PAD)*i/6}\" stroke=\"var(--line)\"/><line y1=\"0\" y2=\"${H-PAD}\" x1=\"${PAD+(W-PAD)*i/6}\" x2=\"${PAD+(W-PAD)*i/6}\" stroke=\"var(--line)\"/>`;\n  h+=`<line x1=\"${PAD}\" y1=\"${H-PAD}\" x2=\"${W-6}\" y2=\"${H-PAD}\" stroke=\"var(--muted)\" stroke-width=\"2\"/><line x1=\"${PAD}\" y1=\"${H-PAD}\" x2=\"${PAD}\" y2=\"6\" stroke=\"var(--muted)\" stroke-width=\"2\"/>\n    <text x=\"${(W+PAD)/2}\" y=\"${H-12}\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"800\" fill=\"var(--muted)\">Kích cỡ: nhỏ → to</text>\n    <text x=\"16\" y=\"${(H-PAD)/2}\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"800\" fill=\"var(--muted)\" transform=\"rotate(-90 16 ${(H-PAD)/2})\">Độ ngọt: ít → nhiều</text>`;\n  if(phase!=='idle')pts.forEach(p=>{if(p.g>=0){const c=cent[p.g];h+=`<line x1=\"${p.x}\" y1=\"${p.y}\" x2=\"${c.x}\" y2=\"${c.y}\" stroke=\"${COLS[p.g]}\" stroke-opacity=\".22\" stroke-width=\"1.5\"/>`;}});\n  pts.forEach(p=>{const col=p.g>=0?COLS[p.g]:'#b8afc9';h+=`<circle cx=\"${p.x}\" cy=\"${p.y}\" r=\"9\" fill=\"${col}\" stroke=\"#fff\" stroke-width=\"2.5\"/><circle cx=\"${p.x-3}\" cy=\"${p.y-3}\" r=\"2.5\" fill=\"#fff\" opacity=\".7\"/>`;});\n  cent.forEach((c,i)=>{h+=`<g transform=\"translate(${c.x},${c.y})\"><path d=\"${star(17)}\" fill=\"${COLS[i]}\" stroke=\"#fff\" stroke-width=\"3\"/></g>`;});\n  $('pl').innerHTML=h;}\nfunction star(r){let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;d+=(i?'L':'M')+(rr*Math.cos(a)).toFixed(1)+','+(rr*Math.sin(a)).toFixed(1);}return d+'Z';}\n$('pl').addEventListener('click',e=>{const s=$('pl'),p=s.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(s.getScreenCTM().inverse());\n  if(q.x<PAD||q.y>H-PAD)return;pts.push({x:q.x,y:q.y,g:-1});if(phase!=='idle'){assign();updGroups();}draw();ui();});\nfunction startCenters(){if(pts.length<K*2){msg('Cần ít nhất '+K*2+' viên kẹo trên bàn.','no');return;}clearInterval(timer);\n  const pool=pts.slice().sort(()=>Math.random()-.5);cent=pool.slice(0,K).map(p=>({x:p.x+rnd(-20,20),y:p.y+rnd(-20,20)}));pts.forEach(p=>p.g=-1);\n  phase='assign';iter=0;ui();draw();msg('Máy đã đặt '+K+' ngôi sao ngẫu nhiên. Bấm \"Bước tiếp\" để mỗi viên kẹo chạy về ngôi sao gần nhất.');}\nfunction assign(){changed=false;pts.forEach(p=>{let b=0,bd=1e9;cent.forEach((c,i)=>{const d=Math.hypot(p.x-c.x,p.y-c.y);if(d<bd){bd=d;b=i;}});if(p.g!==b){p.g=b;changed=true;}});}\nfunction move(){cent.forEach((c,i)=>{const g=pts.filter(p=>p.g===i);if(g.length){c.x=g.reduce((a,p)=>a+p.x,0)/g.length;c.y=g.reduce((a,p)=>a+p.y,0)/g.length;}});}\nfunction step(){if(phase==='assign'){assign();iter++;draw();updGroups();\n    if(!changed&&iter>1){phase='done';clearInterval(timer);msg('🎉 Không còn viên kẹo nào đổi nhóm. Máy đã tự chia xong!','ok');speak('Máy đã tự chia nhóm xong!');ui();return false;}\n    msg('Vòng '+iter+': mỗi viên kẹo đã chạy về ngôi sao gần nhất. Tiếp theo, các ngôi sao sẽ dời vào giữa nhóm của mình.');phase='move';}\n  else if(phase==='move'){move();draw();phase='assign';msg('Các ngôi sao đã dời vào giữa nhóm. Bấm tiếp để kẹo chọn lại nhóm.');}\n  ui();return true;}\nfunction updGroups(){$('groups').innerHTML=cent.map((c,i)=>{const g=pts.filter(p=>p.g===i);if(!g.length)return`<div class=\"gr\"><i style=\"background:${COLS[i]}\"></i>Nhóm ${NAMES[i]}: chưa có kẹo</div>`;\n  const sz=(c.x-PAD)/(W-PAD),sw=1-c.y/(H-PAD);const d=(sz<.35?'kẹo nhỏ':sz>.65?'kẹo to':'kẹo vừa')+', '+(sw<.35?'ít ngọt':sw>.65?'rất ngọt':'ngọt vừa');\n  return`<div class=\"gr\"><i style=\"background:${COLS[i]}\"></i>Nhóm ${NAMES[i]}: ${g.length} viên, phần lớn là ${d}</div>`;}).join('');}\nfunction ui(){$('sN').textContent=pts.length;$('sIt').textContent=iter;$('stepB').disabled=$('autoB').disabled=phase==='idle'||phase==='done';if(phase==='idle')$('groups').innerHTML='';}\n$('startB').onclick=startCenters;$('stepB').onclick=step;\n$('autoB').onclick=()=>{clearInterval(timer);timer=setInterval(()=>{if(!step())clearInterval(timer);},600);};\n$('sprinkle').onclick=sprinkle;$('random').onclick=randomPts;$('clear').onclick=()=>{pts=[];reset();};\ndocument.querySelectorAll('#kSeg [data-k]').forEach(b=>b.onclick=()=>{K=+b.dataset.k;document.querySelectorAll('#kSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));reset();});\nsprinkle();\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#ffffff;--card:#ffffff;--ink:#344054;--muted:#667085;--line:#e9d5ff;\n  --pink:#ec4899;--pink-soft:#fff1f7;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#ecfdf5;--blue:#2563eb;--blue-soft:#eff8ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px);background:#fff;color-scheme:light}\nbody{margin:0;background:#fff;color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid rgba(124,58,237,.22);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid #ddd6fe;border-radius:22px;background:linear-gradient(135deg,#fff7fb 0%,#faf5ff 55%,#eff8ff 100%);box-shadow:0 7px 18px rgba(76,29,149,.07)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:#fff;border:1px solid #e9d5ff;box-shadow:0 4px 10px rgba(76,29,149,.07)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.20)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:1px solid #e9d5ff;border-radius:16px;background:#faf5ff;font-weight:900;font-size:1.02rem}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff;box-shadow:0 5px 12px rgba(139,92,246,.18)}\n.tab[aria-selected=\"true\"] small{color:#fff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:linear-gradient(145deg,#fff 0%,#fcfaff 100%);border:1px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px;box-shadow:0 5px 14px rgba(15,23,42,.045)}\n.card h2{margin:0 0 6px;font-size:1.35rem;color:#5b216e}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:1px solid #ddd6fe;border-radius:14px;background:#faf5ff;font-weight:900;color:#6d28d9;box-shadow:0 3px 8px rgba(76,29,149,.05)}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 12px rgba(139,92,246,.18)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e);box-shadow:0 5px 12px rgba(59,130,246,.15)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:1px solid #ddd6fe;border-radius:14px;background:#faf5ff}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border:1px solid #bae6fd;border-radius:14px;font-weight:800;background:var(--blue-soft)}\n.msg.ok{border-color:#a7f3d0;background:var(--green-soft);color:#047857}.msg.no{border-color:#fbcfe8;background:var(--pink-soft);color:#be185d}\n.tip{border:1px solid #bae6fd;border-radius:16px;padding:12px 14px;background:linear-gradient(135deg,#eff8ff,#f0fdf4);font-weight:700;margin-top:12px;color:#475467}\n.tip b{color:var(--purple)}\n.warn{border:1px solid #fbcfe8;border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:#be185d;margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border:1px solid #ddd6fe;border-radius:14px;padding:8px 12px;background:#faf5ff;font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool{border-color:#bae6fd;background:linear-gradient(135deg,#eff8ff,#f0fdf4)}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text;color:transparent}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:#faf5ff;border:1px solid #e9d5ff;font-weight:700;font-size:.95rem;box-shadow:0 3px 9px rgba(76,29,149,.035)}\n.step:nth-child(2){background:#eff8ff;border-color:#bae6fd}.step:nth-child(3){background:#f0fdf4;border-color:#bbf7d0}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.step:nth-child(2) b{color:#2563eb}.step:nth-child(3) b{color:#047857}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.plane{border-radius:18px;background:#fff;border:1px solid #ddd6fe;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(124,58,237,.02)}\nsvg.pl{display:block;width:100%;height:auto;touch-action:manipulation;cursor:crosshair}\n.groups{display:grid;gap:8px;margin-top:10px}\n.gr{display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid #ddd6fe;border-radius:14px;background:linear-gradient(135deg,#faf5ff,#fff7fb);font-weight:800;color:#475467}\n.gr i{width:18px;height:18px;border-radius:50%;flex:none;border:1px solid rgba(255,255,255,.9);box-shadow:0 1px 4px rgba(15,23,42,.10)}\n:root[data-theme=\"dark\"],:root[data-theme=\"light\"]{color-scheme:light}\n";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🍬</div>\n    <div>\n      <h1>Máy tự chia nhóm <span class=\"ai\">✨ AI</span></h1>\n      <p>Rắc kẹo lên bàn rồi xem máy tự gom những viên kẹo giống nhau thành nhóm, mà không cần ai dạy trước.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <section class=\"card\">\n      <h2>🍬 Bàn kẹo</h2>\n      <p class=\"lead\">Mỗi viên kẹo có kích cỡ (trái sang phải) và độ ngọt (dưới lên trên). Bấm vào bàn để thêm kẹo, hoặc rắc kẹo có sẵn.</p>\n      <div class=\"plane\"><svg class=\"pl\" id=\"pl\" viewBox=\"0 0 600 420\" aria-label=\"Bàn kẹo\"></svg></div>\n      <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn\" id=\"sprinkle\">🍬 Rắc kẹo thành đống</button><button class=\"btn\" id=\"random\">🎲 Rắc lung tung</button><button class=\"btn\" id=\"clear\">🧽 Dọn bàn</button></div>\n    </section>\n    <section>\n      <div class=\"card\">\n        <h2>🤖 Máy tự chia nhóm</h2>\n        <p class=\"lead\">Không ai nói cho máy biết viên kẹo nào thuộc nhóm nào. Máy tự tìm ra!</p>\n        <div class=\"row\"><span class=\"lbl\">Chia thành</span><span class=\"seg\" id=\"kSeg\"><button data-k=\"2\" aria-pressed=\"false\">2 nhóm</button><button data-k=\"3\" aria-pressed=\"true\">3 nhóm</button><button data-k=\"4\" aria-pressed=\"false\">4 nhóm</button></span></div>\n        <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn main\" id=\"startB\">⭐ Đặt tâm nhóm</button><button class=\"btn\" id=\"stepB\" disabled>👣 Bước tiếp</button><button class=\"btn cool\" id=\"autoB\" disabled>▶ Tự chạy đến hết</button></div>\n        <div class=\"msg\" id=\"msg\" aria-live=\"polite\"></div>\n        <div class=\"stats\"><div class=\"stat\">Số viên kẹo<b id=\"sN\">0</b></div><div class=\"stat cool\">Số vòng máy đã làm<b id=\"sIt\">0</b></div></div>\n        <div class=\"groups\" id=\"groups\"></div>\n      </div>\n      <div class=\"tip\"><b>Khác gì với \"Bé dạy AI\"?</b> Ở \"Bé dạy AI\", con phải dạy máy từng hình thuộc nhóm nào. Ở đây, máy tự gom những viên kẹo giống nhau lại mà không cần ai dạy. Người ta gọi là <b>học không giám sát</b>. Các cửa hàng dùng cách này để tự chia khách hàng thành những nhóm có sở thích giống nhau.</div>\n    </section>\n  </div>\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Đặt tâm</b>Máy đặt ngẫu nhiên vài ngôi sao. Mỗi ngôi sao là tâm của một nhóm.</div>\n    <div class=\"step\"><b>2. Gom kẹo</b>Mỗi viên kẹo chạy về nhóm có ngôi sao gần nó nhất.</div>\n    <div class=\"step\"><b>3. Dời tâm</b>Mỗi ngôi sao dời vào giữa nhóm của nó. Lặp lại cho đến khi không còn viên kẹo nào đổi nhóm.</div>\n  </div>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Máy tự chia nhóm" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
