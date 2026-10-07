/* Epsilon Edu - AI sáng tác nhạc
 * Module lazy-load cho AI Lab (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiMusicComposer";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;speechSynthesis.speak(u)}catch(e){}}\n\n/* ---------- âm thanh ---------- */\nlet ac=null,master=null;\nfunction audio(){if(!ac){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ac=new A();master=ac.createGain();master.gain.value=.6;master.connect(ac.destination);}if(ac.state==='suspended')ac.resume();return ac;}\nfunction tone(m,when){const a=audio();if(!a)return;const t=when||a.currentTime,f=440*Math.pow(2,(m-69)/12),g=a.createGain();g.connect(master);\n  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.45,t+.006);g.gain.exponentialRampToValueAtTime(.001,t+1.4);\n  [[f,'triangle',1],[f*2,'sine',.25],[f*3,'sine',.08]].forEach(([fr,ty,v])=>{const o=a.createOscillator(),og=a.createGain();o.type=ty;o.frequency.value=fr;og.gain.value=v;o.connect(og);og.connect(g);o.start(t);o.stop(t+1.5);});}\n\n/* ---------- dữ liệu học ---------- */\nconst VI={55:'Son',57:'La',59:'Si',60:'Đô',62:'Rê',64:'Mi',65:'Pha',67:'Son',69:'La',71:'Si',72:'Đô'};\nconst LOW=new Set([55,57,59]);const nm=m=>VI[m]+(LOW.has(m)?' thấp':m===72?' cao':'');\nconst COL={55:'#f472b6',57:'#fb923c',59:'#facc15',60:'#ef4444',62:'#f97316',64:'#eab308',65:'#22c55e',67:'#14b8a6',69:'#3b82f6',71:'#8b5cf6',72:'#d946ef'};\nconst SONGS=[\n {n:'⭐ Ngôi sao lấp lánh',notes:'60 60 67 67 69 69 67:2 65 65 64 64 62 62 60:2 67 67 65 65 64 64 62:2 67 67 65 65 64 64 62:2 60 60 67 67 69 69 67:2 65 65 64 64 62 62 60:2'},\n {n:'🦋 Kìa con bướm vàng',notes:'60 62 64 60 60 62 64 60 64 65 67:2 64 65 67:2 67:.5 69:.5 67:.5 65:.5 64 60 67:.5 69:.5 67:.5 65:.5 64 60 60 55 60:2 60 55 60:2'},\n {n:'🎂 Chúc mừng sinh nhật',notes:'55:.75 55:.25 57 55 60 59:2 55:.75 55:.25 57 55 62 60:2 55:.75 55:.25 67 64 60 59 57:2 65:.75 65:.25 64 60 62 60:2'},\n {n:'🐑 Chú cừu nhỏ',notes:'64 62 60 62 64 64 64:2 62 62 62:2 64 67 67:2 64 62 60 62 64 64 64 64 62 62 64 62 60:4'},\n {n:'🎼 Niềm vui (Beethoven)',notes:'64 64 65 67 67 65 64 62 60 60 62 64 64:1.5 62:.5 62:2 64 64 65 67 67 65 64 62 60 60 62 64 62:1.5 60:.5 60:2'}].map(s=>({n:s.n,seq:s.notes.split(' ').map(t=>{const[m,d]=t.split(':');return{m:+m,d:d?+d:1};}),on:true}));\nlet mine=[];// giai điệu bé dạy\nlet model=null;\nfunction train(){const data=[...SONGS.filter(s=>s.on).map(s=>s.seq),...mine.filter(x=>x.on).map(x=>x.seq)];\n  const trans={},starts={},pitchTrans={};let total=0;\n  for(const seq of data){if(!seq.length)continue;const st=seq[0].m+':'+seq[0].d;starts[st]=(starts[st]||0)+1;\n    for(let i=0;i<seq.length-1;i++){const a=seq[i].m+':'+seq[i].d,b=seq[i+1].m+':'+seq[i+1].d;(trans[a]=trans[a]||{})[b]=(trans[a][b]||0)+1;\n      (pitchTrans[seq[i].m]=pitchTrans[seq[i].m]||{})[seq[i+1].m]=(pitchTrans[seq[i].m][seq[i+1].m]||0)+1;}total+=seq.length;}\n  model={trans,starts,pitchTrans,total,songs:data.length,tokens:Object.keys(trans)};\n  $('count').textContent=model.songs?`🧠 Máy đã học ${model.total} nốt nhạc từ ${model.songs} giai điệu.`:'Máy chưa được học bài nào. Hãy chọn ít nhất một bài!';\n  $('compose').disabled=!model.songs;renderNoteChips();}\nfunction sample(counts,temp,eps){const keys=Object.keys(counts);if(!keys.length)return null;\n  if(Math.random()<eps)return model.tokens[Math.floor(Math.random()*model.tokens.length)]||keys[0];\n  const w=keys.map(k=>Math.pow(counts[k],1/temp));const tot=w.reduce((a,b)=>a+b,0);let r=Math.random()*tot;for(let i=0;i<keys.length;i++){r-=w[i];if(r<=0)return keys[i];}return keys[keys.length-1];}\nlet melody=[];\nfunction compose(){const c=+$('temp').value,temp=.2+c/100*2.8,eps=Math.max(0,(c-55)/180);let tok=sample(model.starts,temp,0);const out=[];let beats=0;\n  while(beats<22){const[m,d]=tok.split(':');out.push({m:+m,d:+d});beats+=+d;const nx=model.trans[tok];tok=nx?sample(nx,temp,eps):sample(model.starts,temp,0);}\n  out.push({m:60,d:2});melody=out;drawRoll(-1);$('play').disabled=false;\n  // so sánh với bài đã học\n  const key=s=>s.map(x=>x.m).join(',');const mk=key(melody);let best=null,bestLen=0;\n  for(const s of SONGS.filter(s=>s.on)){const sk=s.seq.map(x=>x.m);for(let L=Math.min(12,melody.length);L>=4;L--){let found=false;\n      for(let i=0;i+L<=melody.length&&!found;i++){const sub=melody.slice(i,i+L).map(x=>x.m).join(',');if((','+sk.join(',')+',').includes(','+sub+','))found=true;}\n      if(found){if(L>bestLen){bestLen=L;best=s.n;}break;}}}\n  $('verdict').textContent=bestLen>=8?`🔁 Có một đoạn ${bestLen} nốt giống hệt bài \"${best.replace(/^\\S+\\s/,'')}\". Độ sáng tạo thấp nên máy \"chép\" khá nhiều. Thử tăng độ sáng tạo xem!`\n    :bestLen>=5?`🎨 Giai điệu mới, có vài đoạn ngắn giống bài \"${best.replace(/^\\S+\\s/,'')}\" mà máy đã học.`:'🌟 Một giai điệu hoàn toàn mới! Máy ghép các bước nhạc đã học theo cách riêng.';\n  playMelody();}\nfunction drawRoll(cur){const beatW=34,pad=40,H=250,lo=55,hi=72,rowH=(H-30)/(hi-lo+1);const total=melody.reduce((a,b)=>a+b.d,0);const W=Math.max(500,pad+total*beatW+20);\n  const svg=$('roll');svg.setAttribute('width',W);svg.setAttribute('viewBox',`0 0 ${W} ${H}`);let h='';\n  [55,57,59,60,62,64,65,67,69,71,72].forEach(m=>{const y=10+(hi-m)*rowH;h+=`<line x1=\"${pad}\" x2=\"${W}\" y1=\"${y+rowH/2}\" y2=\"${y+rowH/2}\" stroke=\"var(--line)\"/><text x=\"4\" y=\"${y+rowH/2+4}\" font-size=\"10\" font-weight=\"800\" fill=\"var(--muted)\">${nm(m).replace(' thấp','↓').replace(' cao','↑')}</text>`;});\n  let x=pad;melody.forEach((n,i)=>{const y=10+(hi-n.m)*rowH;h+=`<rect x=\"${x+1}\" y=\"${y-3}\" width=\"${n.d*beatW-3}\" height=\"${rowH+6}\" rx=\"6\" fill=\"${COL[n.m]||'#8b5cf6'}\" opacity=\"${cur<0||i===cur?1:.45}\" ${i===cur?'stroke=\"#3b2a5c\" stroke-width=\"2.5\"':''}/>`;x+=n.d*beatW;});\n  if(!melody.length)h+=`<text x=\"${W/2}\" y=\"${H/2}\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"800\" fill=\"var(--muted)\">Bấm \"Sáng tác bài mới\" để máy sáng tác</text>`;\n  svg.innerHTML=h;}\nlet playTimers=[];\nfunction playMelody(){const a=audio();if(!a||!melody.length)return;playTimers.forEach(clearTimeout);playTimers=[];const beat=.36;let t=a.currentTime+.1,acc=0;\n  melody.forEach((n,i)=>{tone(n.m,t);playTimers.push(setTimeout(()=>drawRoll(i),acc*1000));t+=n.d*beat;acc+=n.d*beat;});playTimers.push(setTimeout(()=>drawRoll(-1),acc*1000+200));}\n\n/* ---------- bé tự đàn ---------- */\nconst WHITE=[55,57,59,60,62,64,65,67,69,71,72];let rec=[];\n$('mini').innerHTML=WHITE.map(m=>`<button data-m=\"${m}\" style=\"border-top:6px solid ${COL[m]}\">${nm(m).replace(' thấp','').replace(' cao','')}</button>`).join('');\n$('mini').querySelectorAll('[data-m]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();const m=+b.dataset.m;tone(m);b.classList.add('on');setTimeout(()=>b.classList.remove('on'),160);\n  if(rec.length<40){rec.push({m,d:1});renderRec();}}));\nfunction renderRec(){$('rec').innerHTML=rec.length?rec.map(n=>`<span style=\"border-bottom:3px solid ${COL[n.m]}\">${nm(n.m)}</span>`).join(''):'<span style=\"background:none;color:var(--muted)\">Giai điệu của con sẽ hiện ở đây</span>';$('recTeach').disabled=rec.length<6;}\n$('recClear').onclick=()=>{rec=[];renderRec();};\n$('recPlay').onclick=()=>{const a=audio();if(!a)return;let t=a.currentTime+.05;rec.forEach(n=>{tone(n.m,t);t+=.36;});};\n$('recTeach').onclick=()=>{mine.push({n:`🎹 Giai điệu của con ${mine.length+1}`,seq:rec.slice(),on:true});rec=[];renderRec();renderSongChips();train();speak('Máy đã học thêm giai điệu của con!');};\n\n/* ---------- giao diện ---------- */\nfunction renderSongChips(){const all=[...SONGS,...mine];$('songChips').innerHTML=all.map((s,i)=>`<button class=\"chip\" data-i=\"${i}\" aria-pressed=\"${s.on}\">${s.on?'✅ ':''}${s.n}</button>`).join('');\n  $('songChips').querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const s=all[+b.dataset.i];s.on=!s.on;renderSongChips();train();});}\nlet selNote=null;\nfunction renderNoteChips(){const ns=Object.keys(model.pitchTrans).map(Number).sort((a,b)=>a-b);if(!ns.includes(selNote))selNote=ns.includes(60)?60:ns[0];\n  $('noteChips').innerHTML=ns.map(m=>`<button class=\"chip\" data-n=\"${m}\" aria-pressed=\"${m===selNote}\" style=\"border-bottom:4px solid ${COL[m]}\">${nm(m)}</button>`).join('');\n  $('noteChips').querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{selNote=+b.dataset.n;tone(selNote);renderNoteChips();});\n  const c=model.pitchTrans[selNote]||{},tot=Object.values(c).reduce((a,b)=>a+b,0);\n  $('bars').innerHTML=selNote==null?'':`<p class=\"lead\" style=\"margin:0\">Sau nốt <b>${nm(selNote)}</b>, trong các bài đã học:</p>`+Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([m,k])=>{const p=Math.round(k/tot*100);\n    return`<div class=\"barrow\"><span>${nm(+m)}</span><span class=\"track\"><i style=\"width:${p}%;background:${COL[m]}\"></i></span><span>${p}%</span></div>`}).join('');}\nfunction tempTxt(){const c=+$('temp').value;$('tempTxt').textContent=c<25?'Rất quen thuộc':c<55?'Vừa phải':c<80?'Sáng tạo':'Rất liều lĩnh';}\n$('temp').oninput=tempTxt;$('compose').onclick=compose;$('play').onclick=playMelody;\nrenderSongChips();train();tempTxt();drawRoll(-1);\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;--orange:#c2410c;--orange-soft:#fff7ed;--blue-soft:#eff6ff;--roll:#faf7ff;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;--roll:#231c3a;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--orange:#ffb05c;--orange-soft:#4a3420;--blue-soft:#1d3450;--roll:#231c3a;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.ai{display:inline-flex;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:14px;align-items:start;margin-top:14px}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.chips{display:flex;flex-wrap:wrap;gap:8px}\n.chip{border:2px solid var(--line);background:var(--card);border-radius:14px;padding:8px 12px;font-weight:900}\n.chip[aria-pressed=\"true\"]{border-color:var(--purple);background:var(--purple-soft);color:var(--purple)}\n.count{margin:10px 0 0;font-weight:900;color:var(--green)}\n.mini{display:flex;gap:4px;margin:10px 0;user-select:none;-webkit-user-select:none}\n.mini button{flex:1;height:96px;border-radius:0 0 12px 12px;border:2px solid #d8cfee;background:linear-gradient(#fff,#f3eeff);color:#3b2a5c;font-weight:900;display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px;font-size:.85rem}\n.mini button.on{background:linear-gradient(#f5d0fe,#e9d5ff)}\n.rec{display:flex;flex-wrap:wrap;gap:4px;min-height:34px;padding:6px;border-radius:12px;background:var(--purple-soft);font-weight:800;font-size:.85rem}\n.rec span{background:var(--card);border-radius:8px;padding:1px 7px}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.slider{display:flex;align-items:center;gap:10px;font-weight:900;margin:10px 0}\n.slider input{flex:1;accent-color:#8b5cf6}\n.slider small{color:var(--muted);font-weight:800}\n.rollbox{overflow-x:auto;border-radius:16px;background:var(--roll);border:2px solid var(--line);margin-top:10px}\nsvg.roll{display:block;height:250px}\n.explain{border-radius:16px;padding:12px 14px;background:var(--blue-soft);font-weight:700;margin-top:12px}\n.explain b{color:var(--purple)}\n.bars{display:grid;gap:6px;margin-top:10px}\n.barrow{display:grid;grid-template-columns:70px 1fr 48px;gap:8px;align-items:center;font-weight:800}\n.track{height:18px;border-radius:99px;background:var(--purple-soft);overflow:hidden}\n.track i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.verdict{margin-top:10px;font-weight:800;color:var(--orange);min-height:1.5em}";
  const CLASS1_AI_LAB_THEME = `
:root{
  --bg:#ffffff !important;
  --card:#ffffff !important;
  --ink:#344054 !important;
  --muted:#667085 !important;
  --line:#EDE9FE !important;
  --purple:#7C3AED !important;
  --purple-soft:#F5F3FF !important;
  --green:#059669 !important;
  --green-soft:#ECFDF5 !important;
  --blue:#2563EB !important;
  --blue-soft:#EFF8FF !important;
  --orange:#C2410C !important;
  --orange-soft:#FFF7ED !important;
  --red:#E11D48 !important;
  --red-soft:#FFF1F2 !important;
  --kind:#059669 !important;
  --kind-soft:#ECFDF5 !important;
  --sad:#2563EB !important;
  --sad-soft:#EFF6FF !important;
  --paper:#ffffff !important;
}
html,body{background:#ffffff !important;color:var(--ink) !important;}
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
.card,.step{
  background:#ffffff !important;
  border-width:1px !important;
  border-color:#E9D5FF !important;
  box-shadow:0 4px 12px rgba(15,23,42,.045) !important;
}
.mode,.btn,.chip,.preset,.samp,.icon-btn,input.txt,.cls,.emoji-pop button{
  border-width:1px !important;
}
.mode{background:#ffffff !important;border-color:#E9D5FF !important;}
.mode[aria-selected="true"],.btn.main{
  color:#ffffff !important;
  border-color:transparent !important;
  background:linear-gradient(90deg,#EC4899,#8B5CF6) !important;
}
.btn:not(.main):not(.green),.chip,.preset,.samp,.icon-btn,input.txt,.cls,.emoji-pop button{
  background:#ffffff !important;
  border-color:#E9D5FF !important;
}
.btn.green{background:linear-gradient(90deg,#14B8A6,#10B981) !important;border-color:transparent !important;color:#ffffff !important;}
.train,.stat,.rules li,.sentence,.track,svg.chart{background:var(--purple-soft) !important;}
.tip{background:var(--blue-soft) !important;}
.warn{background:var(--orange-soft) !important;}
button:focus-visible,input:focus-visible{outline-color:#8B5CF6 !important;}
`;
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">🎵</div>\n    <div>\n      <h1>AI sáng tác nhạc <span class=\"ai\">✨ AI</span></h1>\n      <p>Máy nghe các bài hát để học xem nốt nào hay đi sau nốt nào, rồi tự sáng tác một giai điệu mới. Đây là cách AI tạo sinh hoạt động.</p>\n    </div>\n  </header>\n\n  <div class=\"grid\">\n    <div>\n      <section class=\"card\">\n        <h2>🎧 Bước 1: Cho máy nghe nhạc</h2>\n        <p class=\"lead\">Chọn những bài máy được học. Máy học bài nào thì giai điệu sáng tác sẽ mang \"phong cách\" bài đó.</p>\n        <div class=\"chips\" id=\"songChips\"></div>\n        <p class=\"count\" id=\"count\"></p>\n      </section>\n      <section class=\"card\">\n        <h2>🎹 Con tự đàn để dạy máy</h2>\n        <p class=\"lead\">Đàn một giai điệu ngắn (ít nhất 6 nốt), rồi bấm \"Dạy máy giai điệu này\".</p>\n        <div class=\"mini\" id=\"mini\"></div>\n        <div class=\"rec\" id=\"rec\"><span style=\"background:none;color:var(--muted)\">Giai điệu của con sẽ hiện ở đây</span></div>\n        <div class=\"row\" style=\"margin-top:8px\"><button class=\"btn\" id=\"recClear\">🧽 Xóa</button><button class=\"btn\" id=\"recPlay\">▶ Nghe lại</button><button class=\"btn main\" id=\"recTeach\" disabled>🧠 Dạy máy giai điệu này</button></div>\n      </section>\n    </div>\n    <div>\n      <section class=\"card\">\n        <h2>✨ Bước 2: Máy sáng tác</h2>\n        <label class=\"slider\">🎲 Độ sáng tạo <input type=\"range\" id=\"temp\" min=\"0\" max=\"100\" value=\"40\"><small id=\"tempTxt\"></small></label>\n        <div class=\"row\"><button class=\"btn main\" id=\"compose\">✨ Sáng tác bài mới</button><button class=\"btn\" id=\"play\" disabled>▶ Nghe bài máy sáng tác</button></div>\n        <div class=\"rollbox\"><svg class=\"roll\" id=\"roll\" aria-label=\"Giai điệu máy sáng tác\"></svg></div>\n        <p class=\"verdict\" id=\"verdict\"></p>\n      </section>\n      <section class=\"card\">\n        <h2>🔍 Máy đã học được gì?</h2>\n        <p class=\"lead\">Bấm vào một nốt để xem: sau nốt đó, máy nghĩ nốt nào hay xuất hiện tiếp theo.</p>\n        <div class=\"chips\" id=\"noteChips\"></div>\n        <div class=\"bars\" id=\"bars\"></div>\n      </section>\n    </div>\n  </div>\n\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Học từ dữ liệu</b>Máy đếm trong các bài: sau nốt Đô thường là nốt gì, sau nốt Mi thường là nốt gì...</div>\n    <div class=\"step\"><b>2. Đoán nốt tiếp theo</b>Khi sáng tác, máy chọn từng nốt dựa vào những gì đã đếm được, giống như gieo xúc xắc có thiên vị.</div>\n    <div class=\"step\"><b>3. Độ sáng tạo</b>Thấp: máy chọn nốt quen thuộc nhất, nghe giống bài cũ. Cao: máy chọn liều hơn, mới lạ nhưng có thể lộn xộn.</div>\n  </div>\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="AI sáng tác nhạc" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
