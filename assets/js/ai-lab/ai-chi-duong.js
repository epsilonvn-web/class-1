/* Epsilon Edu - AI chỉ đường
 * Module lazy-load cho mục Tools (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiPathfinding";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.95;speechSynthesis.speak(u)}catch(e){}}\n\nconst C=18,R=12;let grid,start=[1,6],goal=[16,5],tool='wall',busy=false,drawing=false,cells=[];\nconst PRESETS={empty:()=>Array.from({length:R},()=>Array(C).fill(0)),\n city:()=>{const g=PRESETS.empty();for(let y=0;y<R;y++)for(let x=0;x<C;x++){if(x%4!==0&&y%3!==0&&!(x%4===2&&y%3===1))g[y][x]=1;}\n   for(let y=2;y<6;y++)for(let x=9;x<12;x++)g[y][x]=2;return g;},\n maze:()=>{const g=PRESETS.empty();for(let x=3;x<C;x+=4)for(let y=0;y<R;y++)g[y][x]=1;for(let x=3;x<C;x+=4){const gap=(x/4|0)%2?1:R-2;g[gap][x]=0;g[gap+(gap?1:-1)][x]=0;}return g;}};\nfunction load(p){if(busy)return;grid=PRESETS[p]();start=[0,R-3];goal=[C-1,2];grid[start[1]][start[0]]=0;grid[goal[1]][goal[0]]=0;build();clearRun();['bN','bL','aN','aL'].forEach(i=>$(i).textContent='–');}\nfunction build(){const g=$('grid');g.style.gridTemplateColumns=`repeat(${C},1fr)`;g.innerHTML='';cells=[];\n  for(let y=0;y<R;y++)for(let x=0;x<C;x++){const d=document.createElement('div');d.className='c';d.dataset.x=x;d.dataset.y=y;g.appendChild(d);cells.push(d);}paint();}\nfunction paint(){cells.forEach(d=>{const x=+d.dataset.x,y=+d.dataset.y,v=grid[y][x];d.className='c'+(v===1?' wall':v===2?' lake':'');\n  d.textContent=x===start[0]&&y===start[1]?'🏠':x===goal[0]&&y===goal[1]?'🏫':v===1?'🏢':'';});}\nconst cell=(x,y)=>cells[y*C+x];\nfunction clearRun(){cells.forEach(d=>d.classList.remove('seen','front','path'));}\nfunction apply(d){if(busy||!d)return;const x=+d.dataset.x,y=+d.dataset.y,isS=x===start[0]&&y===start[1],isG=x===goal[0]&&y===goal[1];\n  if(tool==='start'){if(!isG){start=[x,y];grid[y][x]=0;}}else if(tool==='goal'){if(!isS){goal=[x,y];grid[y][x]=0;}}\n  else if(!isS&&!isG)grid[y][x]=tool==='wall'?1:tool==='lake'?2:0;clearRun();paint();}\n$('grid').addEventListener('pointerdown',e=>{const d=e.target.closest('.c');if(!d)return;e.preventDefault();drawing=true;$('grid').setPointerCapture(e.pointerId);apply(d);});\n$('grid').addEventListener('pointermove',e=>{if(!drawing||tool==='start'||tool==='goal')return;const el=document.elementFromPoint(e.clientX,e.clientY);apply(el&&el.closest&&el.closest('.c'));});\nconst stop=()=>drawing=false;$('grid').addEventListener('pointerup',stop);$('grid').addEventListener('pointercancel',stop);\ndocument.querySelectorAll('#tools [data-t]').forEach(b=>b.onclick=()=>{tool=b.dataset.t;document.querySelectorAll('#tools button').forEach(x=>x.setAttribute('aria-pressed',x===b));});\ndocument.querySelectorAll('[data-preset]').forEach(b=>b.onclick=()=>load(b.dataset.preset));\nconst wait=ms=>new Promise(r=>setTimeout(r,ms));\nconst key=(x,y)=>x+','+y,h=(x,y)=>Math.abs(x-goal[0])+Math.abs(y-goal[1]);\nasync function run(smart){if(busy)return;busy=true;clearRun();setBtns(true);const m=$('msg');m.className='msg';m.textContent=smart?'✨ Máy đang tìm thông minh: ưu tiên những ô gần trường hơn...':'🔍 Máy đang tìm mò: dò đều ra mọi hướng...';\n  const delay=()=>Math.round(130/ +$('speed').value);\n  const open=[{x:start[0],y:start[1],g:0}],came=new Map(),gs=new Map([[key(...start),0]]),closed=new Set();let found=false,seen=0,order=0;\n  while(open.length){let bi=0;if(smart){for(let i=1;i<open.length;i++){const a=open[i],b=open[bi];const fa=a.g+h(a.x,a.y),fb=b.g+h(b.x,b.y);if(fa<fb||(fa===fb&&h(a.x,a.y)<h(b.x,b.y)))bi=i;}}\n    const cur=open.splice(bi,1)[0],k=key(cur.x,cur.y);if(closed.has(k))continue;closed.add(k);seen++;\n    if(!(cur.x===start[0]&&cur.y===start[1])){const d=cell(cur.x,cur.y);d.classList.remove('front');d.classList.add('seen');}\n    if(cur.x===goal[0]&&cur.y===goal[1]){found=true;break;}\n    for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=cur.x+dx,ny=cur.y+dy;if(nx<0||ny<0||nx>=C||ny>=R||grid[ny][nx])continue;const nk=key(nx,ny),ng=cur.g+1;\n      if(closed.has(nk)||(gs.has(nk)&&gs.get(nk)<=ng))continue;gs.set(nk,ng);came.set(nk,k);open.push({x:nx,y:ny,g:ng,o:order++});\n      if(!(nx===goal[0]&&ny===goal[1]))cell(nx,ny).classList.add('front');}\n    if(!smart)open.sort((a,b)=>a.g-b.g||a.o-b.o);\n    await wait(delay());}\n  let len=0;if(found){let k=key(...goal);const path=[];while(k&&k!==key(...start)){path.push(k);k=came.get(k);}path.reverse();len=path.length;\n    for(const p of path){const[x,y]=p.split(',').map(Number);if(!(x===goal[0]&&y===goal[1])){cell(x,y).classList.add('path');}await wait(40);}\n    m.className='msg ok';m.textContent=`${smart?'✨ Tìm thông minh':'🔍 Tìm mò'}: tìm được đường dài ${len} bước, phải dò ${seen} ô.`;speak(`Tìm được đường dài ${len} bước, máy đã dò ${seen} ô.`);}\n  else{m.className='msg no';m.textContent='Không có đường nào từ nhà đến trường! Con xóa bớt nhà hoặc hồ nhé.';seen='–';len='–';}\n  $(smart?'aN':'bN').textContent=seen;$(smart?'aL':'bL').textContent=len;\n  const bn=+$('bN').textContent,an=+$('aN').textContent;if(bn&&an&&found)m.textContent+=an<bn?` Tìm thông minh dò ít hơn ${bn-an} ô so với tìm mò!`:'';\n  busy=false;setBtns(false);}\nfunction setBtns(b){$('bfs').disabled=$('astar').disabled=b;}\n$('bfs').onclick=()=>run(false);$('astar').onclick=()=>run(true);\nload('city');\n\n})();";
  const TOOL_CSS = ":root{\n  --bg:#ffffff;--card:#ffffff;--ink:#344054;--muted:#667085;--line:#e9d5ff;\n  --pink:#ec4899;--pink-soft:#fff1f7;--purple:#7c3aed;--purple-soft:#f5f3ff;\n  --green:#16a34a;--green-soft:#ecfdf5;--blue:#2563eb;--blue-soft:#eff8ff;\n  --red:#e11d48;--red-soft:#fff1f2;--paper:#ffffff;\n  --c1:#ec4899;--c2:#8b5cf6;--c3:#3b82f6;--c4:#22c55e;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px);background:#fff}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid rgba(124,58,237,.22);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid #ddd6fe;border-radius:22px;background:linear-gradient(135deg,#fff7fb 0%,#faf5ff 55%,#eff8ff 100%);box-shadow:0 7px 18px rgba(76,29,149,.07)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:#fff;border:1px solid #e9d5ff;box-shadow:0 4px 10px rgba(76,29,149,.07)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700;font-size:1rem}\n.ai{display:inline-flex;align-items:center;gap:4px;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);letter-spacing:.05em;box-shadow:0 4px 12px rgba(124,58,237,.20)}\n.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:14px 0}\n.tab{min-height:54px;border:1px solid #e9d5ff;border-radius:16px;background:#faf5ff;font-weight:900;font-size:1.02rem}\n.tab small{display:block;font-size:.8rem;font-weight:700;color:var(--muted)}\n.tab[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff;box-shadow:0 5px 12px rgba(139,92,246,.18)}\n.tab[aria-selected=\"true\"] small{color:#fff}\n.grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px;box-shadow:0 5px 14px rgba(15,23,42,.045)}\n.card h2{margin:0 0 6px;font-size:1.35rem;color:#5b216e}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:1px solid #ddd6fe;border-radius:14px;background:#faf5ff;font-weight:900;color:#6d28d9;box-shadow:0 3px 8px rgba(76,29,149,.05)}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 12px rgba(139,92,246,.18)}\n.btn.cool{border-color:transparent;color:#fff;background:linear-gradient(90deg,#3b82f6,#22c55e);box-shadow:0 5px 12px rgba(59,130,246,.15)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;border:1px solid #ddd6fe;border-radius:14px;background:#faf5ff}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);color:#fff}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.msg{min-height:2.6em;margin:12px 0 0;padding:10px 14px;border:1px solid #bae6fd;border-radius:14px;font-weight:800;background:#f0f9ff;color:#0369a1}\n.msg.ok{border-color:#a7f3d0;background:var(--green-soft);color:#047857}.msg.no{border-color:#fecdd3;background:var(--red-soft);color:#be123c}\n.tip{border:1px solid #bae6fd;border-radius:16px;padding:12px 14px;background:linear-gradient(135deg,#eff8ff,#f0fdfa);font-weight:700;margin-top:12px;color:#475467}\n.tip b{color:var(--purple)}\n.warn{border:1px solid #f9a8d4;border-radius:16px;padding:12px 14px;background:var(--pink-soft);font-weight:800;color:#be185d;margin-top:12px}\n.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}\n.stat{flex:1;min-width:110px;border:1px solid #ddd6fe;border-radius:14px;padding:8px 12px;background:var(--purple-soft);font-weight:800}\n.stat b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;background:linear-gradient(90deg,#ec4899,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}\n.stat.cool b{background:linear-gradient(90deg,#3b82f6,#22c55e);-webkit-background-clip:text;background-clip:text}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:#fff;border:1px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0;color:#475467}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800;min-width:80px}\n.hidden{display:none !important}\n@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}\n\n.mapgrid{display:grid;gap:2px;padding:6px;border:1px solid #c4b5fd;border-radius:16px;background:#f5f3ff;user-select:none;-webkit-user-select:none;touch-action:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.65)}\n.c{aspect-ratio:1;border-radius:5px;background:#fff;display:grid;place-items:center;font-size:clamp(.7rem,2.6vw,1.25rem);line-height:1;transition:background .12s;box-shadow:inset 0 0 0 1px #f1f5f9}\n.c.wall{background:#e2e8f0}\n.c.lake{background:#bae6fd}\n.c.seen{background:#bbf7d0}\n.c.front{background:#bfdbfe}\n.c.path{background:linear-gradient(135deg,#f9a8d4,#c4b5fd)}\n.tools{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}\n.tl{border:1px solid #ddd6fe;background:#faf5ff;border-radius:12px;padding:6px 12px;font-weight:900;color:#6d28d9}\n.tl[aria-pressed=\"true\"]{border-color:#8b5cf6;background:linear-gradient(90deg,#fdf2f8,#f5f3ff);color:#7c3aed;box-shadow:0 3px 8px rgba(124,58,237,.10)}\n.cmp{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}\n.cmpb{border:1px solid;border-radius:16px;padding:10px 12px;font-weight:800}\n.cmpb.bfs{background:#eff8ff;border-color:#bae6fd;color:#0369a1}.cmpb.ast{background:#fff1f7;border-color:#f9a8d4;color:#be185d}\n.cmpb h3{margin:0 0 4px;font-size:1.05rem;color:currentColor}\n.cmpb b{font-family:\"Baloo 2\",sans-serif;font-size:1.3rem}\n.legend{display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;font-weight:800;font-size:.88rem;color:var(--muted)}\n.legend i{display:inline-block;width:14px;height:14px;border-radius:4px;vertical-align:-2px;margin-right:4px}\n";
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🗺️</div>\n    <div>\n      <h1>AI chỉ đường <span class=\"ai\">✨ AI</span></h1>\n      <p>Vẽ khu phố, đặt nhà và trường, rồi xem máy tìm đường đi ngắn nhất. So sánh cách tìm mò với cách tìm thông minh như ứng dụng bản đồ.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <section class=\"card\">\n      <h2>🗺️ Bản đồ khu phố</h2>\n      <div class=\"tools\" id=\"tools\">\n        <button class=\"tl\" data-t=\"wall\" aria-pressed=\"true\">🧱 Vẽ nhà</button>\n        <button class=\"tl\" data-t=\"lake\" aria-pressed=\"false\">🌊 Vẽ hồ</button>\n        <button class=\"tl\" data-t=\"erase\" aria-pressed=\"false\">🧽 Xóa</button>\n        <button class=\"tl\" data-t=\"start\" aria-pressed=\"false\">🏠 Đặt nhà con</button>\n        <button class=\"tl\" data-t=\"goal\" aria-pressed=\"false\">🏫 Đặt trường</button>\n      </div>\n      <div class=\"mapgrid\" id=\"grid\"></div>\n      <div class=\"legend\"><span><i style=\"background:#bfdbfe\"></i>Ô sắp dò</span><span><i style=\"background:#bbf7d0\"></i>Ô đã dò</span><span><i style=\"background:linear-gradient(135deg,#f9a8d4,#c4b5fd)\"></i>Đường đi tìm được</span></div>\n      <div class=\"row\" style=\"margin-top:10px\"><button class=\"btn\" data-preset=\"city\">🏙️ Khu phố</button><button class=\"btn\" data-preset=\"maze\">🌀 Mê cung</button><button class=\"btn\" data-preset=\"empty\">⬜ Bản đồ trống</button></div>\n    </section>\n    <section>\n      <div class=\"card\">\n        <h2>🤖 Tìm đường từ nhà đến trường</h2>\n        <div class=\"row\"><button class=\"btn cool\" id=\"bfs\">🔍 Tìm mò</button><button class=\"btn main\" id=\"astar\">✨ Tìm thông minh</button></div>\n        <label class=\"slider\">🐢 Tốc độ <input type=\"range\" id=\"speed\" min=\"1\" max=\"10\" value=\"6\"></label>\n        <div class=\"msg\" id=\"msg\" aria-live=\"polite\">Chọn một cách tìm đường để máy bắt đầu.</div>\n        <div class=\"cmp\"><div class=\"cmpb bfs\"><h3>🔍 Tìm mò</h3>Dò <b id=\"bN\">–</b> ô<br>Đường dài <b id=\"bL\">–</b> bước</div><div class=\"cmpb ast\"><h3>✨ Tìm thông minh</h3>Dò <b id=\"aN\">–</b> ô<br>Đường dài <b id=\"aL\">–</b> bước</div></div>\n      </div>\n      <div class=\"tip\"><b>Hai cách tìm đường:</b><br>🔍 <b>Tìm mò</b>: máy dò đều ra mọi hướng như vết mực loang, chắc chắn tìm được đường ngắn nhất nhưng phải dò rất nhiều ô.<br>✨ <b>Tìm thông minh</b>: máy luôn ưu tiên dò những ô gần trường hơn, giống như con biết trường ở hướng nào. Máy vẫn tìm được đường ngắn nhất mà dò ít ô hơn nhiều. Ứng dụng bản đồ trên điện thoại cũng dùng ý tưởng này!</div>\n    </section>\n  </div>\n\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="AI chỉ đường" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
