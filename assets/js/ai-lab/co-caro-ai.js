/* Epsilon Edu - Cờ caro với AI
 * Module lazy-load cho AI Lab (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiTicTacToe";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;speechSynthesis.speak(u)}catch(e){}}\nconst LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];\nlet b=Array(9).fill(''),turn='X',over=false,lv='mid',first='kid',busy=false,think=null,score={kid:0,ai:0,draw:0},nodes=0;\nfunction winner(s){for(const l of LINES){const[a,c,d]=l;if(s[a]&&s[a]===s[c]&&s[a]===s[d])return{p:s[a],l};}return s.every(x=>x)?{p:'draw'}:null;}\n// minimax: điểm theo góc nhìn của máy (O). Thắng sớm được ưu tiên hơn.\nfunction minimax(s,player,depth){nodes++;const w=winner(s);if(w)return w.p==='O'?10-depth:w.p==='X'?depth-10:0;\n  let best=player==='O'?-Infinity:Infinity;for(let i=0;i<9;i++)if(!s[i]){s[i]=player;const v=minimax(s,player==='O'?'X':'O',depth+1);s[i]='';best=player==='O'?Math.max(best,v):Math.min(best,v);}return best;}\nfunction evaluate(){nodes=0;const res=[];for(let i=0;i<9;i++)if(!b[i]){b[i]='O';res.push({i,v:minimax(b,'X',1)});b[i]='';}return res;}\nfunction aiPick(res){const best=Math.max(...res.map(r=>r.v));const bestOnes=res.filter(r=>r.v===best);\n  if(lv==='hard')return bestOnes[Math.floor(Math.random()*bestOnes.length)].i;\n  if(lv==='easy')return Math.random()<.75?res[Math.floor(Math.random()*res.length)].i:bestOnes[0].i;\n  // vừa: luôn thắng nếu thắng ngay được, luôn chặn khi con sắp thắng, còn lại 50% chọn ngẫu nhiên\n  for(const r of res){const t=b.slice();t[r.i]='O';if(winner(t)&&winner(t).p==='O')return r.i;}\n  for(let i=0;i<9;i++)if(!b[i]){const t=b.slice();t[i]='X';if(winner(t)&&winner(t).p==='X')return i;}\n  return Math.random()<.5?res[Math.floor(Math.random()*res.length)].i:bestOnes[Math.floor(Math.random()*bestOnes.length)].i;}\nfunction render(winLine){const bd=$('board');bd.innerHTML='';\n  b.forEach((v,i)=>{const c=document.createElement('button');c.className='cell'+(v==='X'?' x':v==='O'?' o':'')+(winLine&&winLine.includes(i)?' win':'');c.textContent=v==='X'?'✖':v==='O'?'⭕':'';\n    c.setAttribute('aria-label',v?(v==='X'?'Ô của con':'Ô của máy'):'Ô trống');\n    if(think&&!v){const t=think.res.find(r=>r.i===i);if(t){const k=t.v>0?'w':t.v<0?'l':'d';const d=document.createElement('span');d.className='think '+k+(think.pick===i?' pick':'');d.textContent=k==='w'?'Thắng':k==='l'?'Thua':'Hòa';c.appendChild(d);}}\n    c.onclick=()=>play(i);bd.appendChild(c);});\n  $('sKid').textContent=score.kid;$('sAi').textContent=score.ai;$('sDraw').textContent=score.draw;}\nfunction setStatus(t){$('status').textContent=t;}\nfunction check(){const w=winner(b);if(!w)return false;over=true;\n  if(w.p==='X'){score.kid++;setStatus('🎉 Con thắng rồi! Giỏi quá!');speak('Con thắng rồi!');}\n  else if(w.p==='O'){score.ai++;setStatus('🤖 Máy thắng ván này!');speak('Máy thắng ván này!');}\n  else{score.draw++;setStatus('🤝 Hòa! Cả hai đều chơi giỏi.');speak('Hòa!');}\n  render(w.l);return true;}\nfunction play(i){if(over||busy||turn!=='X'||b[i])return;think=null;b[i]='X';turn='O';render();if(check())return;aiTurn();}\nasync function aiTurn(){busy=true;setStatus('🤖 Máy đang suy nghĩ...');const res=evaluate();const pick=aiPick(res);\n  $('counter').innerHTML=`Để chọn nước này, máy đã tưởng tượng <b>${nodes.toLocaleString('vi-VN')}</b> thế cờ có thể xảy ra.`;\n  if($('showThink').checked){think={res,pick};render();await new Promise(r=>setTimeout(r,1400));}else await new Promise(r=>setTimeout(r,400));\n  think=null;b[pick]='O';turn='X';busy=false;render();if(!check())setStatus('Đến lượt con (✖)');}\nfunction newGame(){b=Array(9).fill('');over=false;think=null;busy=false;turn=first==='kid'?'X':'O';render();setStatus(first==='kid'?'Con đi trước (✖). Bấm vào một ô!':'');if(first==='ai')aiTurn();}\ndocument.querySelectorAll('#lvSeg [data-lv]').forEach(x=>x.onclick=()=>{lv=x.dataset.lv;document.querySelectorAll('#lvSeg button').forEach(y=>y.setAttribute('aria-pressed',y===x));newGame();});\ndocument.querySelectorAll('#firstSeg [data-f]').forEach(x=>x.onclick=()=>{first=x.dataset.f;document.querySelectorAll('#firstSeg button').forEach(y=>y.setAttribute('aria-pressed',y===x));newGame();});\n$('newG').onclick=newGame;\nnewGame();\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;--red:#e11d48;--red-soft:#fff1f2;--orange:#c2410c;--orange-soft:#fff7ed;--blue-soft:#eff6ff;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--red:#ff7482;--red-soft:#4a2228;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--red:#ff7482;--red-soft:#4a2228;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1100px;margin:0 auto;padding:18px 14px 40px}\nbutton,input{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.ai{display:inline-flex;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:860px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.opts{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;margin-bottom:12px}\n.lbl{font-weight:900;color:var(--muted);font-size:.95rem;margin-right:4px}\n.seg{display:inline-flex;gap:4px;padding:3px;border:2px solid var(--line);border-radius:14px}\n.seg button{border:none;background:transparent;border-radius:10px;padding:7px 12px;font-weight:900}\n.seg button[aria-pressed=\"true\"]{background:var(--purple);color:#fff}\n.board{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:390px;margin:0 auto;padding:10px;border-radius:20px;background:#c4b5fd}\n.cell{aspect-ratio:1;border:none;border-radius:14px;background:#fff;font-family:\"Baloo 2\",sans-serif;font-size:clamp(2.4rem,9vw,3.6rem);font-weight:800;display:grid;place-items:center;position:relative;color:#3b2a5c}\n.cell.x{color:#ec4899}.cell.o{color:#3b82f6}\n.cell.win{background:#fef08a}\n.cell .think{position:absolute;inset:6px;border-radius:10px;display:grid;place-items:center;font-size:1rem;font-weight:900;font-family:\"Nunito\",sans-serif;line-height:1.2;text-align:center}\n.think.w{background:#dcfce7;color:#166534}.think.d{background:#fef9c3;color:#854d0e}.think.l{background:#fee2e2;color:#991b1b}\n.think.pick{outline:4px solid #7c3aed}\n.status{text-align:center;font-family:\"Baloo 2\",sans-serif;font-size:1.5rem;font-weight:800;margin:12px 0 6px;min-height:2.2rem}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.toggle{display:flex;align-items:center;gap:8px;font-weight:900;justify-content:center;margin-top:10px}\n.toggle input{width:20px;height:20px;accent-color:#8b5cf6}\n.score{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px}\n.sc{border-radius:14px;padding:8px;background:var(--purple-soft);font-weight:800;text-align:center}\n.sc b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.6rem;color:var(--purple)}\n.legend{display:grid;gap:6px;margin-top:10px}\n.legend div{display:flex;gap:10px;align-items:center;font-weight:700}\n.legend span{width:60px;flex:none;border-radius:8px;text-align:center;font-weight:900;padding:2px 0}\n.counter{border-radius:14px;padding:10px 14px;background:var(--blue-soft);font-weight:800;margin-top:12px}\n.counter b{color:var(--purple);font-family:\"Baloo 2\",sans-serif;font-size:1.3rem}\n.steps{display:grid;gap:8px;margin:0;padding:0;list-style:none}\n.steps li{padding:10px 12px;border-radius:14px;background:var(--purple-soft);font-weight:700}\n.steps b{color:var(--purple)}";
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
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">⭕</div>\n    <div>\n      <h1>Cờ caro với AI <span class=\"ai\">✨ AI</span></h1>\n      <p>Đấu cờ caro 3×3 với máy. Bật \"Xem máy suy nghĩ\" để thấy máy tính trước các nước đi như thế nào.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <section class=\"card\">\n      <div class=\"opts\">\n        <span><span class=\"lbl\">Mức độ</span><span class=\"seg\" id=\"lvSeg\"><button data-lv=\"easy\" aria-pressed=\"false\">😊 Dễ</button><button data-lv=\"mid\" aria-pressed=\"true\">🤔 Vừa</button><button data-lv=\"hard\" aria-pressed=\"false\">🧠 Khó</button></span></span>\n        <span><span class=\"lbl\">Đi trước</span><span class=\"seg\" id=\"firstSeg\"><button data-f=\"kid\" aria-pressed=\"true\">Con</button><button data-f=\"ai\" aria-pressed=\"false\">Máy</button></span></span>\n      </div>\n      <div class=\"board\" id=\"board\"></div>\n      <p class=\"status\" id=\"status\" aria-live=\"polite\"></p>\n      <div class=\"row\"><button class=\"btn main\" id=\"newG\">↺ Ván mới</button></div>\n      <label class=\"toggle\"><input type=\"checkbox\" id=\"showThink\" checked> 🔍 Xem máy suy nghĩ</label>\n    </section>\n\n    <section>\n      <div class=\"card\">\n        <h2>Tỉ số</h2>\n        <div class=\"score\"><div class=\"sc\">Con (✖)<b id=\"sKid\">0</b></div><div class=\"sc\">Hòa<b id=\"sDraw\">0</b></div><div class=\"sc\">Máy (⭕)<b id=\"sAi\">0</b></div></div>\n        <div class=\"counter\" id=\"counter\">Máy chưa suy nghĩ nước nào.</div>\n        <div class=\"legend\">\n          <div><span class=\"think w\" style=\"position:static\">Thắng</span>Nếu đi ô này, máy chắc chắn thắng được.</div>\n          <div><span class=\"think d\" style=\"position:static\">Hòa</span>Đi ô này thì cả hai chơi giỏi sẽ hòa.</div>\n          <div><span class=\"think l\" style=\"position:static\">Thua</span>Đi ô này, con có thể thắng máy.</div>\n        </div>\n      </div>\n      <div class=\"card\">\n        <h2>Máy suy nghĩ như thế nào?</h2>\n        <ul class=\"steps\">\n          <li><b>1. Tưởng tượng:</b> Với mỗi ô còn trống, máy tưởng tượng mình đi vào đó.</li>\n          <li><b>2. Đoán con đi:</b> Máy tưởng tượng tiếp con sẽ đi nước tốt nhất cho con, rồi máy đi, rồi con đi... cho đến hết ván.</li>\n          <li><b>3. Chọn nước tốt nhất:</b> Máy chọn ô dẫn tới kết quả tốt nhất cho máy. Ở mức Khó, máy tính hết mọi khả năng nên không bao giờ thua!</li>\n        </ul>\n      </div>\n    </section>\n  </div>\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Cờ caro với AI" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
