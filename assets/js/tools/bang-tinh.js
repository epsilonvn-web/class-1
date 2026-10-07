(() => {
  "use strict";

  const MODULE_KEY = 'mathTables';
  const STYLE_ID = 'class1-tool-math-tables-style-v1';
  const ROOT_ID = 'class1-tool-math-tables';

  const timers = new Set();
  let active = false;
  let ctx = null;

  function scopedDocument(host) {
    const real = window.document;
    return {
      getElementById(id) { return host.querySelector(`[id="${String(id).replace(/"/g, '\"')}"]`); },
      querySelector(sel) { return host.querySelector(sel); },
      querySelectorAll(sel) { return host.querySelectorAll(sel); },
      createElement(tag) { return real.createElement(tag); },
      createElementNS(ns, tag) { return real.createElementNS(ns, tag); },
      addEventListener(type, fn, opts) { host.addEventListener(type, fn, opts); },
      removeEventListener(type, fn, opts) { host.removeEventListener(type, fn, opts); }
    };
  }

  function schedule(fn, ms) {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (active) fn();
    }, ms);
    timers.add(id);
    return id;
  }

  function clearTimers() {
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
  }

  function stopSpeech() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_) {}
  }

  function ensureStyle() {
    if (window.document.getElementById(STYLE_ID)) return;
    const style = window.document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
    #class1-tool-math-tables{--tool-ink:#344054;--tool-muted:#667085;--tool-pink:#ec4899;--tool-purple:#8b5cf6;--tool-blue:#3b82f6;--tool-green:#10b981;--tool-amber:#f59e0b;color:var(--tool-ink);font-size:16px;line-height:1.45;width:100%;display:grid;gap:14px}
    #class1-tool-math-tables *{box-sizing:border-box}
    #class1-tool-math-tables button,#class1-tool-math-tables input{font:inherit}
    #class1-tool-math-tables button{cursor:pointer}
    #class1-tool-math-tables .tool-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
    #class1-tool-math-tables .tool-head h2{margin:0;color:#5b217a;font-size:21px;line-height:1.2;font-weight:950}
    #class1-tool-math-tables .tool-head p{margin:3px 0 0;color:var(--tool-muted);font-size:15px}
    #class1-tool-math-tables .back-btn,#class1-tool-math-tables .btn,#class1-tool-math-tables .chip,#class1-tool-math-tables .tab,#class1-tool-math-tables .qopt,#class1-tool-math-tables .opt{border:1px solid #e9d5ff;border-radius:14px;background:#fff;color:#475467;font-weight:850;transition:transform .15s ease,filter .15s ease,box-shadow .15s ease}
    #class1-tool-math-tables button:hover{filter:brightness(1.055);transform:translateY(-1px);box-shadow:0 6px 14px rgba(76,29,149,.12)}
    #class1-tool-math-tables button:active{transform:translateY(0)}
    #class1-tool-math-tables button:disabled{cursor:not-allowed;opacity:.55;transform:none;box-shadow:none}
    #class1-tool-math-tables .back-btn{padding:9px 13px;color:#fff;border:0;background:linear-gradient(90deg,#ec4899,#8b5cf6)}
    #class1-tool-math-tables .main{color:#fff!important;border-color:transparent!important;background:linear-gradient(90deg,#ec4899,#8b5cf6)!important;box-shadow:0 6px 14px rgba(139,92,246,.16)}
    #class1-tool-math-tables .tabs{display:flex;gap:8px;flex-wrap:wrap}
    #class1-tool-math-tables .tab{padding:9px 14px}
    #class1-tool-math-tables .tab[aria-selected="true"],#class1-tool-math-tables .chip[aria-pressed="true"]{color:#fff;border-color:transparent;background:linear-gradient(90deg,#ec4899,#8b5cf6)}
    #class1-tool-math-tables .panel,#class1-tool-math-tables .card{border:1px solid #e9d5ff;border-radius:20px;background:linear-gradient(145deg,#fff,#faf5ff);padding:14px;box-shadow:0 6px 16px rgba(76,29,149,.06)}
    #class1-tool-math-tables .muted{color:var(--tool-muted)}
    #class1-tool-math-tables .big{font-size:19px;font-weight:950;color:#6d28d9}
    #class1-tool-math-tables .hidden{display:none!important}
    #class1-tool-math-tables input{min-height:42px;border:1px solid #d8b4fe;border-radius:12px;padding:8px 10px;background:#fff;color:#344054}
    #class1-tool-math-tables .chip{padding:8px 11px}
    #class1-tool-math-tables .row{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
    #class1-tool-math-tables .grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    #class1-tool-math-tables .grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    #class1-tool-math-tables .feedback,#class1-tool-math-tables .fb{min-height:28px;font-weight:900}
    #class1-tool-math-tables .ok{color:#047857!important;border-color:#86efac!important;background:#ecfdf5!important}
    #class1-tool-math-tables .no{color:#be123c!important;border-color:#fecdd3!important;background:#fff1f2!important}
    @media(max-width:760px){#class1-tool-math-tables{font-size:15px}#class1-tool-math-tables .tool-head{align-items:flex-start}#class1-tool-math-tables .tool-head h2{font-size:19px}#class1-tool-math-tables .grid2,#class1-tool-math-tables .grid3{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){#class1-tool-math-tables *{transition:none!important;scroll-behavior:auto!important}}

    #class1-tool-math-tables .controls{display:grid;gap:10px}
    #class1-tool-math-tables .control-group{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
    #class1-tool-math-tables .control-group strong{min-width:120px}
    #class1-tool-math-tables .facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:9px}
    #class1-tool-math-tables .fact{min-height:46px;border:1px solid #e9d5ff;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:8px 11px;font-weight:950;color:#5b217a}
    #class1-tool-math-tables .fact.on{border-color:#8b5cf6;background:#faf5ff;box-shadow:inset 0 0 0 1px #c4b5fd}
    #class1-tool-math-tables .hide-ans .ans{filter:blur(6px);user-select:none}
    #class1-tool-math-tables .viz{min-height:150px;text-align:center;overflow:auto}
    #class1-tool-math-tables .frames{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px}
    #class1-tool-math-tables .frame{display:grid;grid-template-columns:repeat(5,18px);grid-template-rows:repeat(2,18px);gap:4px;padding:7px;border:2px solid #cbd5e1;border-radius:12px;background:#fff}
    #class1-tool-math-tables .d{width:18px;height:18px;border-radius:50%;background:#e2e8f0}#class1-tool-math-tables .d.a{background:#f472b6}#class1-tool-math-tables .d.b{background:#38bdf8}#class1-tool-math-tables .d.g{background:#10b981}#class1-tool-math-tables .d.o{background:#f59e0b}#class1-tool-math-tables .d.x{position:relative}#class1-tool-math-tables .d.x:after{content:"×";position:absolute;inset:-3px 0 0;color:#e11d48;font-size:21px;font-weight:950}
    #class1-tool-math-tables .groups{display:flex;gap:7px;justify-content:center;flex-wrap:wrap}#class1-tool-math-tables .group{display:flex;gap:3px;flex-wrap:wrap;max-width:120px;padding:7px;border:1px solid #a7f3d0;border-radius:11px;background:#ecfdf5}#class1-tool-math-tables .group.o{border-color:#fde68a;background:#fffbeb}
    #class1-tool-math-tables .sum-line{margin-top:9px;font-weight:900;color:#475467}
    #class1-tool-math-tables .practice-setup{display:grid;gap:12px}
    #class1-tool-math-tables .quiz-card{text-align:center;max-width:650px;margin:0 auto}
    #class1-tool-math-tables .qtext{font-size:34px;font-weight:950;color:#6d28d9;margin:14px 0}#class1-tool-math-tables .answer{display:inline-block;min-width:50px;color:#e11d48}
    #class1-tool-math-tables .progress{height:9px;border-radius:999px;background:#ede9fe;overflow:hidden}#class1-tool-math-tables .progress>span{display:block;height:100%;background:linear-gradient(90deg,#ec4899,#8b5cf6);width:0}
    #class1-tool-math-tables .keypad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;max-width:340px;margin:12px auto}#class1-tool-math-tables .keypad button{min-height:48px;border:1px solid #e9d5ff;border-radius:13px;background:#fff;font-weight:950;font-size:18px}#class1-tool-math-tables .keypad button.ok{background:#ecfdf5!important}#class1-tool-math-tables .keypad button.del{background:#fff7ed!important;color:#c2410c}
    #class1-tool-math-tables .result-card{text-align:center}#class1-tool-math-tables .stars{font-size:34px}#class1-tool-math-tables .wrongs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:9px 0}#class1-tool-math-tables .wrongs span{padding:6px 9px;border-radius:10px;background:#fff1f2;border:1px solid #fecdd3}
    @media(max-width:760px){#class1-tool-math-tables .facts{grid-template-columns:1fr}#class1-tool-math-tables .control-group strong{min-width:100%}#class1-tool-math-tables .qtext{font-size:28px}}
`;
    window.document.head.appendChild(style);
  }

  function toolHtml() { return `<div id="class1-tool-math-tables" class="tool-shell">
  <div class="tool-head"><div><h2>🔢 Bảng cộng trừ nhân chia</h2><p>Xem bảng tính trực quan và luyện tập theo mức phù hợp.</p></div><button class="back-btn" data-tool-back type="button">← Tools</button></div>
  <div class="tabs"><button class="tab" data-mode="view" aria-selected="true" type="button">📘 Xem bảng</button><button class="tab" data-mode="practice" aria-selected="false" type="button">✏️ Luyện tập</button></div>
  <section id="view" class="panel"><div class="controls"><div id="opRow" class="control-group"><strong>Phép tính</strong><button class="chip" data-op="add" aria-pressed="true" type="button">Cộng +</button><button class="chip" data-op="sub" aria-pressed="false" type="button">Trừ −</button><button class="chip" data-op="mul" aria-pressed="false" type="button">Nhân ×</button><button class="chip" data-op="div" aria-pressed="false" type="button">Chia :</button></div><div class="control-group"><strong>Chọn số</strong><div id="numRow" class="row"></div></div><label class="row"><input id="hideAns" type="checkbox"> Ẩn đáp án để tự nhẩm</label></div><div class="grid2" style="margin-top:12px"><div class="card"><h3 id="tableTitle"></h3><div id="facts" class="facts"></div></div><div id="viz" class="card viz"></div></div></section>
  <section id="practice" class="panel hidden"><div id="setup" class="practice-setup"><div class="card"><h3>Chọn nội dung luyện tập</h3><div class="control-group" id="pOps"><strong>Phép tính</strong><button class="chip" data-op="add" aria-pressed="true" type="button">Cộng</button><button class="chip" data-op="sub" aria-pressed="true" type="button">Trừ</button><button class="chip" data-op="mul" aria-pressed="true" type="button">Nhân</button><button class="chip" data-op="div" aria-pressed="true" type="button">Chia</button></div><div class="control-group" id="pRange"><strong>Phạm vi cộng trừ</strong><button class="chip" data-r="10" aria-pressed="false" type="button">10</button><button class="chip" data-r="20" aria-pressed="true" type="button">20</button><button class="chip" data-r="100" aria-pressed="false" type="button">100</button></div><div class="control-group"><strong>Bảng nhân chia</strong><div id="pTables" class="row"></div></div><div class="control-group" id="pCount"><strong>Số câu</strong><button class="chip" data-c="10" aria-pressed="true" type="button">10 câu</button><button class="chip" data-c="20" aria-pressed="false" type="button">20 câu</button></div><p id="setupNote" class="fb no" style="background:transparent!important;border:0!important"></p><button id="start" class="btn main" type="button">Bắt đầu luyện tập →</button></div></div><div id="quiz" class="card quiz-card hidden"><div class="row" style="justify-content:space-between"><strong id="qNum"></strong><strong id="qScore"></strong></div><div class="progress"><span id="qBar"></span></div><div id="qText" class="qtext"></div><div id="keypad" class="keypad"></div><div id="fb" class="feedback"></div></div><div id="result" class="card result-card hidden"><div id="stars" class="stars"></div><h3 id="finalScore"></h3><p id="praise" class="big"></p><div id="wrongs" class="wrongs"></div><div class="row" style="justify-content:center"><button id="retryWrong" class="btn hidden" type="button">Luyện lại câu sai</button><button id="again" class="btn main" type="button">Chọn bài khác</button></div></div></section>
</div>`; }

  function initTool(host) {
    const document = scopedDocument(host);
    const speechSynthesis = window.speechSynthesis;
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
    const setTimeoutLocal = schedule;
    /* ---------- đọc số tiếng Việt ---------- */
    const DG=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
    function two(n){const t=Math.floor(n/10),u=n%10;if(n<10)return DG[n];
      let s=t===1?'mười':DG[t]+' mươi';if(u===0)return s;
      if(u===5)return s+' lăm';if(u===1&&t>1)return s+' mốt';if(u===4&&t>1)return s+' tư';return s+' '+DG[u];}
    function readNum(n){if(n<100)return two(n);const h=Math.floor(n/100),r=n%100;let s=DG[h]+' trăm';
      if(r===0)return s;if(r<10)return s+' linh '+DG[r];return s+' '+two(r);}
    let viVoice=null;
    function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}
    try{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}
    function speak(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.9;speechSynthesis.speak(u)}catch(e){}}

    const SYM={add:'+',sub:'−',mul:'×',div:':'};
    const WORD={add:'cộng',sub:'trừ',mul:'nhân',div:'chia'};
    const NAME={add:'Bảng cộng',sub:'Bảng trừ',mul:'Bảng nhân',div:'Bảng chia'};

    /* ---------- XEM BẢNG ---------- */
    let op='add',n=2,sel=null;
    const numRow=document.getElementById('numRow');
    for(let i=1;i<=10;i++){const b=document.createElement('button');b.className='chip num';b.textContent=i;b.dataset.n=i;b.setAttribute('aria-pressed',i===n);numRow.appendChild(b);}
    numRow.addEventListener('click',e=>{const b=e.target.closest('[data-n]');if(!b)return;n=+b.dataset.n;
      numRow.querySelectorAll('[data-n]').forEach(x=>x.setAttribute('aria-pressed',x===b));sel=null;render();});
    document.getElementById('opRow').addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(!b)return;op=b.dataset.op;
      document.querySelectorAll('#opRow [data-op]').forEach(x=>x.setAttribute('aria-pressed',x===b));sel=null;render();});
    document.getElementById('hideAns').addEventListener('change',e=>{document.getElementById('view').classList.toggle('hide-ans',e.target.checked)});

    function facts(){const out=[];for(let k=1;k<=10;k++){
      if(op==='add')out.push([n,k,n+k]);else if(op==='sub')out.push([n+k,n,k]);
      else if(op==='mul')out.push([n,k,n*k]);else out.push([n*k,n,k]);}return out;}

    function render(){
      document.getElementById('tableTitle').textContent=NAME[op]+' '+n;
      const box=document.getElementById('facts');box.innerHTML='';
      facts().forEach((f,i)=>{const b=document.createElement('button');b.className='fact'+(sel===i?' on':'');
        b.innerHTML=`<span>${f[0]} ${SYM[op]} ${f[1]} = <span class="ans">${f[2]}</span></span><span class="spk" aria-hidden="true">🔊</span>`;
        b.setAttribute('aria-label',`${f[0]} ${WORD[op]} ${f[1]}`);
        b.onclick=()=>{sel=i;render();speak(`${readNum(f[0])} ${WORD[op]} ${readNum(f[1])} bằng ${readNum(f[2])}`)};
        box.appendChild(b);});
      renderViz();
    }
    function dots(cls,count){return Array.from({length:count},()=>`<span class="d ${cls}"></span>`).join('')}
    function tenFrames(list){ // list: array of classes, length ≤ 20
      const total=Math.max(10,Math.ceil(list.length/10)*10);let html='<div class="frames">';
      for(let f=0;f<total;f+=10){html+='<div class="frame">';for(let i=f;i<f+10;i++)html+=`<span class="d ${list[i]||''}"></span>`;html+='</div>';}
      return html+'</div>';}
    function renderViz(){
      const v=document.getElementById('viz');
      if(sel===null){v.innerHTML=`<h3>👈 Chọn một phép tính</h3><p>Bấm vào một dòng trong bảng để xem hình minh họa và nghe đọc to.</p>`;return;}
      const [a,b,c]=facts()[sel];let html=`<h3>${a} ${SYM[op]} ${b} = ${c}</h3>`;
      if(op==='add'){
        html+=`<p>Có ${a} chấm hồng, thêm ${b} chấm xanh. Đếm tất cả được ${c} chấm.</p>`;
        html+=tenFrames([...Array(a).fill('a'),...Array(b).fill('b')]);
        if(c>10&&a<10)html+=`<div class="sum-line">💡 Lấp đầy khung 10 trước: ${a} + ${10-a} = 10, còn thêm ${b-(10-a)}, được 10 + ${c-10} = ${c}.</div>`;
      }else if(op==='sub'){
        html+=`<p>Có ${a} chấm, bớt đi ${b} chấm (gạch chéo). Còn lại ${c} chấm.</p>`;
        html+=tenFrames([...Array(c).fill('b'),...Array(b).fill('a x')]);
        html+=`<div class="sum-line">💡 Vì ${c} + ${b} = ${a} nên ${a} − ${b} = ${c}.</div>`;
      }else if(op==='mul'){
        html+=`<p>${a} được lấy ${b} lần: ${b} nhóm, mỗi nhóm ${a} chấm.</p><div class="groups">`;
        for(let g=0;g<b;g++)html+=`<div class="group">${dots('g',a)}</div>`;
        html+=`</div><div class="sum-line">${Array(b).fill(a).join(' + ')} = ${c}</div>`;
      }else{
        html+=`<p>Có ${a} chấm, chia thành các nhóm, mỗi nhóm ${b} chấm. Được ${c} nhóm.</p><div class="groups">`;
        for(let g=0;g<c;g++)html+=`<div class="group o">${dots('o',b)}</div>`;
        html+=`</div><div class="sum-line">💡 Vì ${b} × ${c} = ${a} nên ${a} : ${b} = ${c}.</div>`;
      }
      v.innerHTML=html;
    }
    render();

    /* ---------- tabs ---------- */
    document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
      document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===t));
      document.getElementById('view').classList.toggle('hidden',t.dataset.mode!=='view');
      document.getElementById('practice').classList.toggle('hidden',t.dataset.mode!=='practice');});

    /* ---------- LUYỆN TẬP ---------- */
    const pTables=document.getElementById('pTables');
    for(let i=2;i<=9;i++){const b=document.createElement('button');b.className='chip num';b.textContent=i;b.dataset.t=i;b.setAttribute('aria-pressed',i===2||i===5);pTables.appendChild(b);}
    function multiToggle(container,attr){container.addEventListener('click',e=>{const b=e.target.closest(`[data-${attr}]`);if(!b)return;
      b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');checkSetup();});}
    function singleToggle(container,attr){container.addEventListener('click',e=>{const b=e.target.closest(`[data-${attr}]`);if(!b)return;
      container.querySelectorAll(`[data-${attr}]`).forEach(x=>x.setAttribute('aria-pressed',x===b));});}
    multiToggle(document.getElementById('pOps'),'op');multiToggle(pTables,'t');
    singleToggle(document.getElementById('pRange'),'r');singleToggle(document.getElementById('pCount'),'c');
    const pressed=(sel,attr)=>[...document.querySelectorAll(sel+' [aria-pressed="true"]')].map(b=>b.dataset[attr]);
    function checkSetup(){const ops=pressed('#pOps','op'),tabs=pressed('#pTables','t');let msg='';
      if(!ops.length)msg='Hãy chọn ít nhất một phép tính.';
      else if((ops.includes('mul')||ops.includes('div'))&&!tabs.length)msg='Hãy chọn ít nhất một bảng nhân chia.';
      document.getElementById('setupNote').textContent=msg;document.getElementById('start').disabled=!!msg;return !msg;}
    const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
    function makeQ(ops,R,tabs){const o=ops[rnd(0,ops.length-1)];let a,b,c;
      if(o==='add'){a=rnd(1,R-1);b=rnd(1,R-a);c=a+b;}
      else if(o==='sub'){a=rnd(2,R);b=rnd(1,a);c=a-b;}
      else{const t=+tabs[rnd(0,tabs.length-1)],k=rnd(1,10);if(o==='mul'){a=t;b=k;c=t*k}else{a=t*k;b=t;c=k}}
      return{o,a,b,c};}
    let qs=[],qi=0,score=0,input='',wrong=[],locked=false;
    function startQuiz(list){qs=list;qi=0;score=0;wrong=[];
      ['setup','result'].forEach(id=>document.getElementById(id).classList.add('hidden'));
      document.getElementById('quiz').classList.remove('hidden');showQ();}
    document.getElementById('start').onclick=()=>{if(!checkSetup())return;
      const ops=pressed('#pOps','op'),R=+pressed('#pRange','r')[0],tabs=pressed('#pTables','t'),N=+pressed('#pCount','c')[0];
      const list=[],seen=new Set();let guard=0;
      while(list.length<N&&guard++<500){const q=makeQ(ops,R,tabs),key=q.o+q.a+'_'+q.b;if(seen.has(key)&&guard<300)continue;seen.add(key);list.push(q);}
      startQuiz(list);};
    function showQ(){input='';locked=false;const q=qs[qi];
      document.getElementById('qNum').textContent=`Câu ${qi+1} / ${qs.length}`;
      document.getElementById('qScore').textContent=`⭐ ${score}`;
      document.getElementById('qBar').style.width=(qi/qs.length*100)+'%';
      document.getElementById('fb').textContent='';document.getElementById('fb').className='feedback';drawQ();}
    function drawQ(){const q=qs[qi];document.getElementById('qText').innerHTML=`${q.a} ${SYM[q.o]} ${q.b} = <span class="answer">${input||'?'}</span>`;}
    const kp=document.getElementById('keypad');
    ['1','2','3','4','5','6','7','8','9','⌫','0','✓'].forEach(k=>{const b=document.createElement('button');b.textContent=k;
      if(k==='✓'){b.className='ok';b.setAttribute('aria-label','Kiểm tra')}if(k==='⌫'){b.className='del';b.setAttribute('aria-label','Xóa')}
      b.onclick=()=>press(k);kp.appendChild(b);});
    function press(k){if(locked)return;if(k==='⌫')input=input.slice(0,-1);else if(k==='✓')return check();else if(input.length<3)input+=k;drawQ();}
    document.addEventListener('keydown',e=>{if(document.getElementById('quiz').classList.contains('hidden'))return;
      if(/^[0-9]$/.test(e.key))press(e.key);else if(e.key==='Backspace')press('⌫');else if(e.key==='Enter'){e.preventDefault();press('✓');}});
    const PRAISE=['Giỏi quá! 🎉','Chính xác! 🌟','Tuyệt vời! 👏','Đúng rồi! 💯'];
    function check(){if(input==='')return;locked=true;const q=qs[qi],fb=document.getElementById('fb');
      if(+input===q.c){score++;fb.textContent=PRAISE[rnd(0,3)];fb.className='feedback ok';setTimeoutLocal(next,900);}
      else{wrong.push(q);fb.textContent=`Chưa đúng. ${q.a} ${SYM[q.o]} ${q.b} = ${q.c}`;fb.className='feedback no';
        speak(`${readNum(q.a)} ${WORD[q.o]} ${readNum(q.b)} bằng ${readNum(q.c)}`);setTimeoutLocal(next,2200);}}
    function next(){qi++;if(qi<qs.length)showQ();else finish();}
    function finish(){document.getElementById('quiz').classList.add('hidden');document.getElementById('result').classList.remove('hidden');
      const p=score/qs.length,st=p>=.9?3:p>=.7?2:p>=.5?1:0;
      document.getElementById('stars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st);
      document.getElementById('finalScore').textContent=`${score} / ${qs.length} câu đúng`;
      document.getElementById('praise').textContent=st===3?'Xuất sắc! Con làm rất giỏi!':st===2?'Làm tốt lắm! Cố thêm chút nữa nhé!':st===1?'Khá rồi! Luyện thêm sẽ giỏi hơn.':'Không sao, mình luyện lại nhé!';
      document.getElementById('wrongs').innerHTML=wrong.map(q=>`<span>${q.a} ${SYM[q.o]} ${q.b} = <b>${q.c}</b></span>`).join('');
      document.getElementById('retryWrong').classList.toggle('hidden',!wrong.length);}
    document.getElementById('retryWrong').onclick=()=>startQuiz(wrong.slice().sort(()=>Math.random()-.5));
    document.getElementById('again').onclick=()=>{document.getElementById('result').classList.add('hidden');document.getElementById('setup').classList.remove('hidden');};
    checkSetup();
  }

  function render(context) {
    destroy();
    ctx = context || null;
    const host = ctx && ctx.host;
    if (!host) return;
    active = true;
    ensureStyle();
    host.innerHTML = toolHtml();
    host.setAttribute("tabindex", "0");
    host.querySelector("[data-tool-back]")?.addEventListener("click", () => ctx && typeof ctx.back === "function" && ctx.back());
    initTool(host);
    try { host.focus({preventScroll:true}); } catch (_) {}
  }

  function destroy() {
    active = false;
    clearTimers();
    stopSpeech();
    try { if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null; } catch (_) {}
    ctx = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
