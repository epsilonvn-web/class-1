/* Epsilon Edu - Dạy AI hiểu lời nói tử tế
 * Module lazy-load cho AI Lab (cùng định dạng với module Bản đồ Việt Nam).
 * Tự chứa HTML/CSS/JS, chạy trong iframe sandbox. Giọng đọc đi qua trang mẹ (Google TTS) như module bản đồ.
 */
(() => {
  "use strict";

  const TOOL_ID = "aiKindWords";
  let activeCleanup = null;
  const CORE_SOURCE = "(function(){\n'use strict';\nconst $=id=>document.getElementById(id);\nlet viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}\ntry{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}\nfunction speak(t){if(window.__CLASS1_TOOL_INSTANCE_ID__){try{parent.postMessage({type:'class1-tool-speak',id:window.__CLASS1_TOOL_INSTANCE_ID__,text:String(t||'')},'*')}catch(e){}return;}\n  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;speechSynthesis.speak(u)}catch(e){}}\nconst shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);\nconst esc=s=>s.replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));\n\nconst BANK=shuffle(['Cảm ơn bạn đã giúp mình','Bạn vẽ đẹp quá','Mình cùng chơi nhé','Xin lỗi bạn, mình không cố ý','Bạn giỏi quá','Bạn có sao không, để mình giúp','Chúc mừng bạn nhé','Mình cho bạn mượn bút nè','Bạn cố lên, lần sau sẽ làm được','Hôm nay bạn mặc áo đẹp ghê','Cảm ơn cô ạ','Bạn nói đúng đấy','Mình rất vui khi được chơi với bạn','Bạn kể chuyện hay quá','Để mình chỉ bạn cách làm nhé','Không sao đâu, ai cũng có lúc sai','Bạn thật tốt bụng','Mình xin lỗi vì đã làm bạn buồn','Bạn chạy nhanh thật đấy','Chào bạn, bạn có khỏe không',\n  'Cậu chậm chạp quá','Không ai muốn chơi với cậu đâu','Cậu vẽ xấu thế','Tránh ra, đồ phiền phức','Cậu chẳng biết gì cả','Đừng chơi với bạn ấy','Cậu thật ngốc','Ai cho cậu ngồi đây','Cậu làm hỏng hết rồi, đồ vụng về','Bọn mình không cho cậu chơi cùng','Áo cậu trông buồn cười quá','Cậu hát dở tệ','Im đi, cậu nói nhiều quá','Cậu thua là đáng lắm','Lại khóc nhè rồi à','Đồ ích kỷ']);\nconst SAMPLES=['Cậu học giỏi quá','Cậu vụng về thật','Cảm ơn cậu nhiều nhé','Không ai thích cậu cả','Bạn ơi, mình giúp bạn nhé','Cậu thật là phiền','Bạn hát hay quá','Cậu đâu có ngốc'];\nlet data=[],bi=0,mode='teach';\n\n/* ---------- tách từ: từ đơn + cặp từ liền nhau (vì tiếng Việt nhiều từ có 2 tiếng) ---------- */\nfunction words(s){return s.normalize('NFC').toLowerCase().replace(/[.,!?;:\"“”'()…\\-]/g,' ').split(/\\s+/).filter(Boolean);}\nfunction feats(s){const w=words(s),f=[...w];for(let i=0;i<w.length-1;i++)f.push(w[i]+' '+w[i+1]);return f;}\nlet model=null;\nfunction train(){const cnt={kind:{},sad:{}},tot={kind:0,sad:0},docs={kind:0,sad:0},vocab=new Set();\n  for(const d of data){docs[d.y]++;for(const f of feats(d.s)){cnt[d.y][f]=(cnt[d.y][f]||0)+1;tot[d.y]++;vocab.add(f);}}\n  model={cnt,tot,docs,V:vocab.size||1,vocab};}\nconst lp=(f,y)=>Math.log(((model.cnt[y][f]||0)+1)/(model.tot[y]+model.V));\nfunction classify(s){const fs=feats(s);let k=Math.log((model.docs.kind+1)/(data.length+2)),sd=Math.log((model.docs.sad+1)/(data.length+2));\n  const contrib={};let known=0;for(const f of fs){if(!model.vocab.has(f))continue;known++;const c=lp(f,'kind')-lp(f,'sad');k+=lp(f,'kind');sd+=lp(f,'sad');contrib[f]=c;}\n  const m=Math.max(k,sd),pk=Math.exp(k-m)/(Math.exp(k-m)+Math.exp(sd-m));return{pk,contrib,known};}\n\n/* ---------- BƯỚC 1 ---------- */\nfunction showSent(){$('sent').textContent=bi<BANK.length?BANK[bi]:'Con đã đánh dấu hết các câu có sẵn! Hãy tự viết thêm câu bên dưới nhé.';\n  $('bKind').disabled=$('bSad').disabled=bi>=BANK.length;}\nfunction add(s,y){s=s.trim();if(!s)return;data.push({s,y});train();renderData();}\nfunction renderData(){const k=data.filter(d=>d.y==='kind').length,s=data.length-k;$('nKind').textContent=k;$('nSad').textContent=s;\n  const ok=k>=3&&s>=3;$('testTab').disabled=!ok;\n  $('ready').textContent=ok?`✅ Đã đủ để thử máy. Dạy càng nhiều câu, máy đoán càng giỏi!`:`Cần ít nhất 3 câu mỗi loại để máy bắt đầu học (còn thiếu ${Math.max(0,3-k)} câu tử tế, ${Math.max(0,3-s)} câu làm buồn).`;\n  $('list').innerHTML=data.map((d,i)=>`<div class=\"item ${d.y}\"><span>${d.y==='kind'?'😊':'😢'} ${esc(d.s)}</span><button data-del=\"${i}\" aria-label=\"Xóa\">✕</button></div>`).reverse().join('');\n  $('list').querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{data.splice(+b.dataset.del,1);train();renderData();});}\n$('bKind').onclick=()=>{add(BANK[bi],'kind');bi++;showSent();};\n$('bSad').onclick=()=>{add(BANK[bi],'sad');bi++;showSent();};\n$('skip').onclick=()=>{if(bi<BANK.length){BANK.push(BANK.splice(bi,1)[0]);showSent();}};\n$('ownKind').onclick=()=>{add($('own').value,'kind');$('own').value='';};\n$('ownSad').onclick=()=>{add($('own').value,'sad');$('own').value='';};\n\n/* ---------- BƯỚC 2 ---------- */\nfunction topWords(){const score=y=>[...model.vocab].filter(f=>!f.includes(' ')||((model.cnt[y][f]||0)>=2)).map(f=>({f,c:lp(f,y)-lp(f,y==='kind'?'sad':'kind'),n:model.cnt[y][f]||0})).filter(x=>x.n>0&&x.c>0).sort((a,b)=>b.c-a.c||b.n-a.n).slice(0,10);\n  $('topKind').innerHTML=score('kind').map(x=>`<span style=\"background:var(--kind-soft)\">${esc(x.f)}</span>`).join('')||'<span class=\"lead\">Chưa có</span>';\n  $('topSad').innerHTML=score('sad').map(x=>`<span style=\"background:var(--sad-soft)\">${esc(x.f)}</span>`).join('')||'<span class=\"lead\">Chưa có</span>';}\nfunction guess(s){s=s.trim();if(!s)return;const r=classify(s),pk=Math.round(r.pk*100),kind=r.pk>=.5,unsure=Math.abs(r.pk-.5)<.15;\n  const ws=words(s);const wc=ws.map((w,i)=>{let c=r.contrib[w]||0;if(i>0&&r.contrib[ws[i-1]+' '+w])c+=r.contrib[ws[i-1]+' '+w]/2;if(i<ws.length-1&&r.contrib[w+' '+ws[i+1]])c+=r.contrib[w+' '+ws[i+1]]/2;\n    const known=model.vocab.has(w)||r.contrib[ws[i-1]+' '+w]!==undefined||r.contrib[w+' '+ws[i+1]]!==undefined;return{w,c,known};});\n  const mx=Math.max(.5,...wc.map(x=>Math.abs(x.c)));\n  let html=`<div class=\"emo\">${r.known===0?'🤔':kind?'😊':'😢'}</div><div class=\"name\" style=\"color:${r.known===0?'var(--muted)':kind?'var(--kind)':'var(--sad)'}\">${r.known===0?'Máy chưa gặp từ nào trong câu này':(unsure?'Có lẽ là ':'')+(kind?'Lời nói tử tế':'Lời nói làm bạn buồn')}</div>\n    <div class=\"meter\"><div class=\"k\" style=\"width:${pk}%\">${pk>12?'😊 '+pk+'%':''}</div><div class=\"s\" style=\"width:${100-pk}%\">${100-pk>12?'😢 '+(100-pk)+'%':''}</div></div>\n    <p class=\"lead\" style=\"margin:0\">Màu của từng từ cho biết từ đó kéo máy về phía nào:</p>\n    <div class=\"words\">${wc.map(x=>{if(!x.known)return`<span class=\"w unk\" title=\"Máy chưa gặp từ này\">${esc(x.w)}</span>`;const t=Math.min(1,Math.abs(x.c)/mx);\n      return`<span class=\"w\" style=\"background:${x.c>=0?`rgba(22,163,74,${.15+t*.55})`:`rgba(37,99,235,${.15+t*.55})`}\">${esc(x.w)}</span>`}).join('')}</div>`;\n  const NEUTRAL=['cậu','bạn','mình','tớ','ấy'];const strong=wc.filter(x=>x.known).sort((p,q)=>Math.abs(q.c)-Math.abs(p.c))[0];\n  const bias=strong&&NEUTRAL.includes(strong.w)&&Math.abs(strong.c)>.4;if(bias){html+=`<div class=\"tip\" style=\"text-align:left;background:var(--purple-soft)\"><b style=\"color:var(--purple)\">🧐 Phát hiện dữ liệu bị lệch!</b> Từ \"${esc(strong.w)}\" ảnh hưởng mạnh nhất đến kết quả, dù bản thân từ này không tốt cũng không xấu. Đó là vì trong các câu con đã dạy, từ \"${esc(strong.w)}\" hay xuất hiện ở ${strong.c<0?'câu làm buồn':'câu tử tế'} hơn. Máy học theo dữ liệu, nên dữ liệu lệch thì máy cũng hiểu lệch. Con hãy quay lại Bước 1, dạy thêm câu ${strong.c<0?'tử tế':'làm buồn'} có từ \"${esc(strong.w)}\" để sửa nhé!</div>`;}\n  if(r.known&&!kind&&!bias)html+=`<div class=\"tip\" style=\"text-align:left\"><b>💡 Thử nói lại tử tế hơn:</b> thay vì chê bạn, con có thể động viên hoặc rủ bạn cùng cố gắng, ví dụ \"Bạn cố lên, mình giúp bạn nhé!\"</div>`;\n  if(unsure&&r.known)html+=`<p class=\"lead\" style=\"margin-top:8px\">Máy chưa chắc chắn lắm. Hãy dạy thêm câu cho máy nhé!</p>`;\n  $('result').innerHTML=html;speak(r.known===0?'Máy chưa gặp từ nào trong câu này':kind?'Máy đoán đây là lời nói tử tế':'Máy đoán đây là lời nói làm bạn buồn');}\n$('guess').onclick=()=>guess($('probe').value);\n$('probe').addEventListener('keydown',e=>{if(e.key==='Enter')guess($('probe').value);});\n$('samples').innerHTML=SAMPLES.map(s=>`<button class=\"samp\">${esc(s)}</button>`).join('');\n$('samples').querySelectorAll('.samp').forEach(b=>b.onclick=()=>{$('probe').value=b.textContent;guess(b.textContent);});\n\n/* ---------- chuyển bước ---------- */\ndocument.querySelectorAll('.mode').forEach(b=>b.onclick=()=>{if(b.disabled)return;mode=b.dataset.mode;document.querySelectorAll('.mode').forEach(x=>x.setAttribute('aria-selected',x===b));\n  $('pTeach').classList.toggle('hidden',mode!=='teach');$('pTest').classList.toggle('hidden',mode!=='test');if(mode==='test'){topWords();$('result').innerHTML='';}});\ntrain();showSent();renderData();\n})();";
  const TOOL_CSS = ":root{\n  --bg:#fff9ec;--card:#ffffff;--ink:#3b2a5c;--muted:#6b5f80;--line:#eadff5;\n  --purple:#7c3aed;--purple-soft:#f5f3ff;--green:#16a34a;--green-soft:#f0fdf4;--blue:#2563eb;--blue-soft:#eff6ff;--orange:#c2410c;--orange-soft:#fff7ed;\n  --kind:#16a34a;--kind-soft:#dcfce7;--sad:#2563eb;--sad-soft:#dbeafe;\n  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);\n}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--blue:#6ab2ff;--blue-soft:#1d3450;--orange:#ffb05c;--orange-soft:#4a3420;\n  --kind:#3fd08f;--kind-soft:#1f3f33;--sad:#6ab2ff;--sad-soft:#1d3450;\n}}\n:root[data-theme=\"dark\"]{\n  --bg:#1d1730;--card:#2a2242;--ink:#f3ecff;--muted:#b9aed0;--line:#3d3360;--purple:#a58bff;--purple-soft:#362a5e;\n  --green:#3fd08f;--green-soft:#1f3f33;--blue:#6ab2ff;--blue-soft:#1d3450;--orange:#ffb05c;--orange-soft:#4a3420;\n  --kind:#3fd08f;--kind-soft:#1f3f33;--sad:#6ab2ff;--sad-soft:#1d3450;\n}\n*,*::before,*::after{box-sizing:inherit}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:\"Nunito\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;font-size:17px;line-height:1.5}\nh1,h2,h3{font-family:\"Baloo 2\",\"Nunito\",system-ui,sans-serif;line-height:1.2}\n.wrap{max-width:1150px;margin:0 auto;padding:18px 14px 40px}\nbutton,input{font:inherit;color:inherit}\nbutton{cursor:pointer}\nbutton:focus-visible,input:focus-visible{outline:3px solid var(--purple);outline-offset:2px}\n.hero{display:flex;align-items:center;gap:14px;padding:14px 18px;border:2px solid var(--line);border-radius:22px;background:var(--card)}\n.hero-icon{width:62px;height:62px;flex:none;border-radius:18px;display:grid;place-items:center;font-size:34px;background:var(--purple-soft)}\n.hero h1{margin:0;font-size:clamp(1.5rem,3.4vw,2.1rem);color:var(--purple);display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.hero p{margin:2px 0 0;color:var(--muted);font-weight:700}\n.ai{display:inline-flex;padding:2px 12px;border-radius:999px;font-family:\"Nunito\",sans-serif;font-size:.95rem;font-weight:900;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6,#38bdf8);box-shadow:0 4px 12px rgba(124,58,237,.3)}\n.modes{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}\n.mode{min-height:56px;border:2px solid var(--line);border-radius:16px;background:var(--card);font-size:1.08rem;font-weight:900}\n.mode small{display:block;font-size:.82rem;font-weight:700;color:var(--muted)}\n.mode[aria-selected=\"true\"]{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}\n.mode[aria-selected=\"true\"] small{color:#fdf2ff}\n.mode:disabled{opacity:.5;cursor:not-allowed}\n.grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:14px;align-items:start}\n@media (max-width:900px){.grid{grid-template-columns:1fr}}\n.card{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:16px;margin-bottom:14px}\n.card h2{margin:0 0 6px;font-size:1.35rem}\n.lead{margin:0 0 10px;color:var(--muted);font-weight:700}\n.sentence{font-family:\"Baloo 2\",sans-serif;font-size:clamp(1.4rem,3.4vw,1.9rem);font-weight:700;text-align:center;padding:22px 16px;border-radius:18px;background:var(--purple-soft);min-height:110px;display:grid;place-items:center;line-height:1.35}\n.choices{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}\n.big{min-height:64px;border-radius:16px;border:none;font-weight:900;font-size:1.1rem;color:#fff}\n.big.kind{background:#16a34a}.big.sad{background:#2563eb}\n.big:disabled{opacity:.45}\n.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.btn{min-height:46px;padding:0 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);font-weight:900}\n.btn.main{border-color:transparent;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6)}\n.btn:disabled{opacity:.45;cursor:not-allowed}\ninput.txt{flex:1;min-width:200px;min-height:48px;border:2px solid var(--line);border-radius:14px;padding:0 14px;background:var(--card);font-weight:700}\n.counts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px}\n.cbox{border-radius:16px;padding:10px 12px;font-weight:800}\n.cbox.kind{background:var(--kind-soft)}.cbox.sad{background:var(--sad-soft)}\n.cbox b{font-family:\"Baloo 2\",sans-serif;font-size:1.6rem;display:block}\n.cbox.kind b{color:var(--kind)}.cbox.sad b{color:var(--sad)}\n.list{max-height:240px;overflow:auto;display:grid;gap:6px;margin-top:10px}\n.item{display:flex;gap:8px;align-items:center;padding:6px 10px;border-radius:12px;font-weight:700;font-size:.95rem}\n.item.kind{background:var(--kind-soft)}.item.sad{background:var(--sad-soft)}\n.item span{flex:1}\n.item button{border:none;background:transparent;font-weight:900;color:var(--muted);width:28px;height:28px;border-radius:8px}\n.result{text-align:center;margin-top:14px}\n.result .emo{font-size:3.2rem;line-height:1}\n.result .name{font-family:\"Baloo 2\",sans-serif;font-size:1.7rem;font-weight:800}\n.meter{display:flex;height:26px;border-radius:99px;overflow:hidden;margin:10px 0;font-weight:900;font-size:.85rem;color:#fff}\n.meter .k{background:#16a34a;display:flex;align-items:center;justify-content:center}\n.meter .s{background:#2563eb;display:flex;align-items:center;justify-content:center}\n.words{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:8px}\n.w{padding:4px 10px;border-radius:10px;font-weight:800;border:2px solid transparent}\n.w.unk{border-color:var(--line);color:var(--muted)}\n.samples{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}\n.samp{border:2px solid var(--line);background:var(--card);border-radius:999px;padding:5px 12px;font-weight:800;font-size:.92rem}\n.tip{border-radius:16px;padding:12px 14px;background:var(--orange-soft);font-weight:700;margin-top:12px}\n.tip b{color:var(--orange)}\n.top{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.top h3{margin:0 0 6px;font-size:1rem}\n.top .tags{display:flex;flex-wrap:wrap;gap:5px}\n.top .tags span{border-radius:9px;padding:2px 9px;font-weight:800;font-size:.9rem}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n@media (max-width:640px){.steps{grid-template-columns:1fr}.choices{grid-template-columns:1fr}}\n.step{border-radius:16px;padding:12px;background:var(--card);border:2px solid var(--line);font-weight:700;font-size:.95rem}\n.step b{display:block;font-family:\"Baloo 2\",sans-serif;font-size:1.1rem;color:var(--purple)}\n.hidden{display:none !important}";
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
  const TOOL_BODY = "<div class=\"wrap\">\n  <header class=\"hero\">\n    <div class=\"hero-icon\" aria-hidden=\"true\">💬</div>\n    <div>\n      <h1>Dạy AI hiểu lời nói tử tế <span class=\"ai\">✨ AI</span></h1>\n      <p>Con đánh dấu câu nào là lời nói tử tế, câu nào làm bạn buồn. Máy học từ các từ ngữ, rồi tự đoán câu mới. Đây là cách AI hiểu ngôn ngữ.</p>\n    </div>\n  </header>\n\n  <div class=\"modes\" role=\"tablist\">\n    <button class=\"mode\" role=\"tab\" aria-selected=\"true\" data-mode=\"teach\">✏️ Bước 1: Dạy máy<small>Đánh dấu các câu nói</small></button>\n    <button class=\"mode\" role=\"tab\" aria-selected=\"false\" data-mode=\"test\" id=\"testTab\">🔮 Bước 2: Thử máy<small>Viết câu mới để máy đoán</small></button>\n  </div>\n\n  <section id=\"pTeach\" class=\"grid\">\n    <div class=\"card\">\n      <h2>Câu này là lời nói thế nào?</h2>\n      <div class=\"sentence\" id=\"sent\"></div>\n      <div class=\"choices\"><button class=\"big kind\" id=\"bKind\">😊 Lời nói tử tế</button><button class=\"big sad\" id=\"bSad\">😢 Làm bạn buồn</button></div>\n      <div class=\"row\" style=\"margin-top:10px;justify-content:center\"><button class=\"btn\" id=\"skip\">⏭ Câu khác</button></div>\n      <h2 style=\"margin-top:16px\">Hoặc con tự viết câu</h2>\n      <div class=\"row\"><input class=\"txt\" id=\"own\" maxlength=\"80\" placeholder=\"Ví dụ: Bạn ơi, mình chơi cùng nhé\"></div>\n      <div class=\"row\" style=\"margin-top:8px\"><button class=\"btn\" id=\"ownKind\">😊 Dạy là tử tế</button><button class=\"btn\" id=\"ownSad\">😢 Dạy là làm buồn</button></div>\n    </div>\n    <div class=\"card\">\n      <h2>Dữ liệu con đã dạy</h2>\n      <div class=\"counts\"><div class=\"cbox kind\">😊 Câu tử tế<b id=\"nKind\">0</b></div><div class=\"cbox sad\">😢 Câu làm buồn<b id=\"nSad\">0</b></div></div>\n      <p class=\"lead\" id=\"ready\" style=\"margin:10px 0 0\"></p>\n      <div class=\"list\" id=\"list\"></div>\n    </div>\n  </section>\n\n  <section id=\"pTest\" class=\"grid hidden\">\n    <div class=\"card\">\n      <h2>Viết một câu để máy đoán</h2>\n      <div class=\"row\"><input class=\"txt\" id=\"probe\" maxlength=\"80\" placeholder=\"Gõ một câu rồi bấm Đoán\"><button class=\"btn main\" id=\"guess\">🔮 Đoán</button></div>\n      <p class=\"lead\" style=\"margin:10px 0 0\">Hoặc thử các câu máy chưa gặp bao giờ:</p>\n      <div class=\"samples\" id=\"samples\"></div>\n      <div class=\"result\" id=\"result\"></div>\n    </div>\n    <div class=\"card\">\n      <h2>🔍 Máy đã học được gì?</h2>\n      <p class=\"lead\">Những từ máy thấy hay xuất hiện nhất trong mỗi loại câu:</p>\n      <div class=\"top\"><div><h3 style=\"color:var(--kind)\">😊 Từ của câu tử tế</h3><div class=\"tags\" id=\"topKind\"></div></div><div><h3 style=\"color:var(--sad)\">😢 Từ của câu làm buồn</h3><div class=\"tags\" id=\"topSad\"></div></div></div>\n      <div class=\"tip\"><b>Máy cũng có lúc hiểu sai!</b> Máy chỉ nhìn vào từng từ chứ không hiểu ý cả câu như con người. Thử gõ \"Cậu đâu có ngốc\" xem máy đoán thế nào. Vì vậy, AI cần con người kiểm tra lại.</div>\n    </div>\n  </section>\n\n  <div class=\"steps\">\n    <div class=\"step\"><b>1. Dạy bằng ví dụ</b>Mỗi câu con đánh dấu là một ví dụ cho máy học.</div>\n    <div class=\"step\"><b>2. Máy đếm từ</b>Máy đếm xem từ nào hay có trong câu tử tế (như \"cảm ơn\", \"giúp\"), từ nào hay có trong câu làm buồn.</div>\n    <div class=\"step\"><b>3. Máy đoán câu mới</b>Gặp câu mới, máy cộng điểm các từ trong câu để quyết định câu đó thuộc loại nào.</div>\n  </div>\n</div>";
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
    host.innerHTML = `<div style="width:100%;"><iframe title="Dạy AI hiểu lời nói tử tế" style="display:block;width:100%;height:900px;border:0;border-radius:24px;background:transparent;" referrerpolicy="no-referrer" sandbox="allow-scripts" loading="eager"></iframe></div>`;
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
