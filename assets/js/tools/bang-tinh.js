(() => {
  "use strict";

  const MODULE_KEY = 'mathTables';
  const STYLE_ID = 'class1-tool-math-tables-style-v1';
  const ROOT_ID = 'class1-tool-math-tables';

  const timers = new Set();
  let active = false;
  let ctx = null;
  let keyCleanup = null;
  // One cancelable Google TTS audio player for both Vietnamese and English.
  let googleAudio = null;
  let playbackVersion = 0;
  let lastSpeech = null;

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
    // Invalidate all pending audio callbacks and cancel audio from the old context.
    playbackVersion += 1;
    lastSpeech = null;
    if (googleAudio) {
      try {
        googleAudio.onerror = null;
        googleAudio.onplaying = null;
        googleAudio.onended = null;
        googleAudio.pause();
        googleAudio.currentTime = 0;
        googleAudio.removeAttribute('src');
        googleAudio.load();
      } catch (_) {}
    }
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

    /* Language control: same Blue-to-Green selected state as the approved tool. */
    #class1-tool-math-tables .tool-head>div:first-child{min-width:0;flex:1 1 330px}
    #class1-tool-math-tables .tool-actions{display:flex;align-items:center;gap:9px;justify-content:flex-end;margin-left:auto;flex-wrap:wrap}
    #class1-tool-math-tables .lang-switch{display:inline-flex;align-items:center;gap:4px;padding:3px;background:#fff;border:1px solid #bfdbfe;border-radius:14px;box-shadow:0 3px 9px rgba(59,130,246,.08)}
    #class1-tool-math-tables .lang-switch button{font-size:14px;font-weight:900;min-height:36px;padding:0 13px;background:transparent;border:0;border-radius:10px;color:#475569;white-space:nowrap;box-shadow:none}
    #class1-tool-math-tables .lang-switch button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
    #class1-tool-math-tables .lang-switch button:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
    #class1-tool-math-tables .tts-status{margin:0;color:#b45309;font-weight:750;font-size:14px}
    #class1-tool-math-tables .tts-status:empty{display:none}
    @media(max-width:760px){#class1-tool-math-tables .tool-head{flex-wrap:wrap}#class1-tool-math-tables .tool-actions{width:100%}#class1-tool-math-tables .lang-switch button{font-size:13px}}
    @media(max-width:380px){#class1-tool-math-tables .tool-actions{justify-content:space-between}#class1-tool-math-tables .back-btn{padding:8px 10px}#class1-tool-math-tables .lang-switch button{padding:0 9px}}

`;
    window.document.head.appendChild(style);
  }

  function toolHtml() { return `<div class="tool-shell" id="class1-tool-math-tables">
<div class="tool-head"><div><h2 data-en="🔢 Addition, subtraction, multiplication &amp; division tables">🔢 Bảng cộng trừ nhân chia</h2><p data-en="Explore visual math tables and practise at your own pace.">Xem bảng tính trực quan và luyện tập theo mức phù hợp.</p></div><div class="tool-actions"><button class="back-btn" data-tool-back="" type="button">← Tools</button><div class="lang-switch" role="group" aria-label="Language / Ngôn ngữ"><button type="button" data-lang="vi" aria-pressed="true">Ti\u1ebfng Vi\u1ec7t</button><button type="button" data-lang="en" aria-pressed="false">English</button></div></div></div>
<p id="ttsStatus" class="tts-status" role="status" aria-live="polite"></p><div class="tabs"><button aria-selected="true" class="tab" data-en="📘 View tables" data-mode="view" type="button">📘 Xem bảng</button><button aria-selected="false" class="tab" data-en="✏️ Practice" data-mode="practice" type="button">✏️ Luyện tập</button></div>
<section class="panel" id="view"><div class="controls"><div class="control-group" id="opRow"><strong data-en="Operation">Phép tính</strong><button aria-pressed="true" class="chip" data-en="Add +" data-op="add" type="button">Cộng +</button><button aria-pressed="false" class="chip" data-en="Subtract −" data-op="sub" type="button">Trừ −</button><button aria-pressed="false" class="chip" data-en="Multiply ×" data-op="mul" type="button">Nhân ×</button><button aria-pressed="false" class="chip" data-en="Divide :" data-op="div" type="button">Chia :</button></div><div class="control-group"><strong data-en="Choose a number">Chọn số</strong><div class="row" id="numRow"></div></div><label class="row"><input id="hideAns" type="checkbox"/><span data-en="Hide answers for mental practice">Ẩn đáp án để tự nhẩm</span></label></div><div class="grid2" style="margin-top:12px"><div class="card"><h3 id="tableTitle"></h3><div class="facts" id="facts"></div></div><div class="card viz" id="viz"></div></div></section>
<section class="panel hidden" id="practice"><div class="practice-setup" id="setup"><div class="card"><h3 data-en="Choose what to practise">Chọn nội dung luyện tập</h3><div class="control-group" id="pOps"><strong data-en="Operations">Phép tính</strong><button aria-pressed="true" class="chip" data-en="Addition" data-op="add" type="button">Cộng</button><button aria-pressed="true" class="chip" data-en="Subtraction" data-op="sub" type="button">Trừ</button><button aria-pressed="true" class="chip" data-en="Multiplication" data-op="mul" type="button">Nhân</button><button aria-pressed="true" class="chip" data-en="Division" data-op="div" type="button">Chia</button></div><div class="control-group" id="pRange"><strong data-en="Addition and subtraction range">Phạm vi cộng trừ</strong><button aria-pressed="false" class="chip" data-r="10" type="button">10</button><button aria-pressed="true" class="chip" data-r="20" type="button">20</button><button aria-pressed="false" class="chip" data-r="100" type="button">100</button></div><div class="control-group"><strong data-en="Multiplication and division tables">Bảng nhân chia</strong><div class="row" id="pTables"></div></div><div class="control-group" id="pCount"><strong data-en="Number of questions">Số câu</strong><button aria-pressed="true" class="chip" data-c="10" data-en="10 questions" type="button">10 câu</button><button aria-pressed="false" class="chip" data-c="20" data-en="20 questions" type="button">20 câu</button></div><p class="fb no" id="setupNote" style="background:transparent!important;border:0!important"></p><button class="btn main" data-en="Start practice →" id="start" type="button">Bắt đầu luyện tập →</button></div></div><div class="card quiz-card hidden" id="quiz"><div class="row" style="justify-content:space-between"><strong id="qNum"></strong><strong id="qScore"></strong></div><div class="progress"><span id="qBar"></span></div><div class="qtext" id="qText"></div><div class="keypad" id="keypad"></div><div class="feedback" id="fb"></div></div><div class="card result-card hidden" id="result"><div class="stars" id="stars"></div><h3 id="finalScore"></h3><p class="big" id="praise"></p><div class="wrongs" id="wrongs"></div><div class="row" style="justify-content:center"><button class="btn hidden" data-en="Retry missed questions" id="retryWrong" type="button">Luyện lại câu sai</button><button class="btn main" data-en="Choose another practice" id="again" type="button">Chọn bài khác</button></div></div></section>
</div>`; }

  function initTool(host) {
    const document = scopedDocument(host);
    const setTimeoutLocal = schedule;
    /* ---------- đọc số tiếng Việt ---------- */
    const DG=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
    function two(n){const t=Math.floor(n/10),u=n%10;if(n<10)return DG[n];
      let s=t===1?'mười':DG[t]+' mươi';if(u===0)return s;
      if(u===5)return s+' lăm';if(u===1&&t>1)return s+' mốt';if(u===4&&t>1)return s+' tư';return s+' '+DG[u];}
    function readNum(n){if(n<100)return two(n);const h=Math.floor(n/100),r=n%100;let s=DG[h]+' trăm';
      if(r===0)return s;if(r<10)return s+' linh '+DG[r];return s+' '+two(r);}
    let lang='vi';
    const staticLabels=[...document.querySelectorAll('[data-en]')];
    staticLabels.forEach(el=>{el.dataset.vi=el.textContent;});
    const speechStatus=document.getElementById('ttsStatus');
    // Same Google Translate TTS audio source as the Class 1 welcome greeting.
    // "en" requests English pronunciation; Google Translate does not expose a
    // fixed, verifiable American-female voice ID on this endpoint.
    const googleTtsUrl = (text, language) =>
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${language==='en'?'en':'vi'}&client=tw-ob&q=${encodeURIComponent(text)}`;
    function speak(t){
      const text=String(t||'').replace(/\s+/g,' ').trim();
      if(!text||!active)return;
      const now=Date.now();
      if(lastSpeech&&lastSpeech.text===text&&lastSpeech.lang===lang&&now-lastSpeech.time<250)return;
      stopSpeech();
      const version=playbackVersion, language=lang;
      lastSpeech={text,lang:language,time:now};
      speechStatus.textContent='';
      if(typeof window.Audio!=='function'){
        speechStatus.textContent=language==='en'
          ?'Audio is unavailable in this browser.'
          :'Trình duyệt này chưa hỗ trợ phát âm thanh.';
        lastSpeech=null;
        return;
      }
      const current=()=>active&&version===playbackVersion&&lang===language;
      const failed=()=>{
        if(!current())return;
        lastSpeech=null;
        speechStatus.textContent=language==='en'
          ?'Google English audio is unavailable. Please try listening again.'
          :'Chưa phát được Google TTS tiếng Việt. Bé hãy bấm nghe lại nhé!';
      };
      try{
        const audio=googleAudio||(googleAudio=new window.Audio());
        audio.referrerPolicy='no-referrer';
        audio.preload='none';
        audio.onerror=failed;
        audio.onplaying=()=>{if(current())speechStatus.textContent='';};
        audio.onended=()=>{if(current())speechStatus.textContent='';};
        audio.src=googleTtsUrl(text,language);
        audio.playbackRate=language==='en'?1:.96;
        speechStatus.textContent=language==='en'?'Loading Google voice…':'Đang tải giọng đọc…';
        const playing=audio.play();
        if(playing&&typeof playing.catch==='function')playing.catch(failed);
      }catch(_){failed();}
    }

    const SYM={add:'+',sub:'−',mul:'×',div:':'};
    const WORD={add:'cộng',sub:'trừ',mul:'nhân',div:'chia'};
    const NAME={add:'Bảng cộng',sub:'Bảng trừ',mul:'Bảng nhân',div:'Bảng chia'};
    const EN_WORD={add:'plus',sub:'minus',mul:'times',div:'divided by'};
    const EN_NAME={add:'Addition table',sub:'Subtraction table',mul:'Multiplication table',div:'Division table'};
    const PRAISE_EN=['Well done!','Correct!','Excellent!','You got it!'];
    function t(vi,en){return lang==='en'?en:vi;}

    /* ---------- XEM BẢNG ---------- */
    let op='add',n=2,sel=null;
    const numRow=document.getElementById('numRow');
    for(let i=1;i<=10;i++){const b=document.createElement('button');b.className='chip num';b.textContent=i;b.dataset.n=i;b.setAttribute('aria-pressed',i===n);numRow.appendChild(b);}
    numRow.addEventListener('click',e=>{const b=e.target.closest('[data-n]');if(!b)return;stopSpeech();n=+b.dataset.n;
      numRow.querySelectorAll('[data-n]').forEach(x=>x.setAttribute('aria-pressed',x===b));sel=null;render();});
    document.getElementById('opRow').addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(!b)return;stopSpeech();op=b.dataset.op;
      document.querySelectorAll('#opRow [data-op]').forEach(x=>x.setAttribute('aria-pressed',x===b));sel=null;render();});
    document.getElementById('hideAns').addEventListener('change',e=>{document.getElementById('view').classList.toggle('hide-ans',e.target.checked)});

    function facts(){const out=[];for(let k=1;k<=10;k++){
      if(op==='add')out.push([n,k,n+k]);else if(op==='sub')out.push([n+k,n,k]);
      else if(op==='mul')out.push([n,k,n*k]);else out.push([n*k,n,k]);}return out;}

    function render(){
      document.getElementById('tableTitle').textContent=(lang==='en'?EN_NAME[op]:NAME[op])+' '+n;
      const box=document.getElementById('facts');box.innerHTML='';
      facts().forEach((f,i)=>{const b=document.createElement('button');b.className='fact'+(sel===i?' on':'');
        b.innerHTML=`<span>${f[0]} ${SYM[op]} ${f[1]} = <span class="ans">${f[2]}</span></span><span class="spk" aria-hidden="true">🔊</span>`;
        b.setAttribute('aria-label',`${f[0]} ${lang==='en'?EN_WORD[op]:WORD[op]} ${f[1]}`);
        b.onclick=()=>{sel=i;render();(lang==='en'?speak(`${f[0]} ${EN_WORD[op]} ${f[1]} equals ${f[2]}`):speak(`${readNum(f[0])} ${WORD[op]} ${readNum(f[1])} bằng ${readNum(f[2])}`))};
        box.appendChild(b);});
      renderViz();
    }
    function dots(cls,count){return Array.from({length:count},()=>`<span class="d ${cls}"></span>`).join('')}
    function tenFrames(list){ // list: array of classes, length ≤ 20
      const total=Math.max(10,Math.ceil(list.length/10)*10);let html='<div class="frames">';
      for(let f=0;f<total;f+=10){html+='<div class="frame">';for(let i=f;i<f+10;i++)html+=`<span class="d ${list[i]||''}"></span>`;html+='</div>';}
      return html+'</div>';}
    function renderViz(){
      if(lang==='en'){renderVizEnglish();return;}
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

    function renderVizEnglish(){
      const v=document.getElementById('viz');
      if(sel===null){v.innerHTML='<h3>Choose a calculation</h3><p>Select a row in the table to see a visual model and hear it spoken.</p>';return;}
      const [a,b,c]=facts()[sel];
      let html=`<h3>${a} ${SYM[op]} ${b} = ${c}</h3>`;
      if(op==='add'){
        html+=`<p>There are ${a} pink dots. Add ${b} blue dots. Together there are ${c} dots.</p>`;
        html+=tenFrames([...Array(a).fill('a'),...Array(b).fill('b')]);
        if(c>10&&a<10)html+=`<div class="sum-line">Fill a ten-frame first: ${a} + ${10-a} = 10. Add the remaining ${b-(10-a)} dots: 10 + ${c-10} = ${c}.</div>`;
      }else if(op==='sub'){
        html+=`<p>Start with ${a} dots and cross out ${b}. There are ${c} dots left.</p>`;
        html+=tenFrames([...Array(c).fill('b'),...Array(b).fill('a x')]);
        html+=`<div class="sum-line">Because ${c} + ${b} = ${a}, we know ${a} ${SYM.sub} ${b} = ${c}.</div>`;
      }else if(op==='mul'){
        html+=`<p>${a} taken ${b} times means ${b} groups with ${a} dots in each group.</p><div class="groups">`;
        for(let g=0;g<b;g++)html+=`<div class="group">${dots('g',a)}</div>`;
        html+=`</div><div class="sum-line">${Array(b).fill(a).join(' + ')} = ${c}</div>`;
      }else{
        html+=`<p>Share ${a} dots into groups of ${b}. This makes ${c} groups.</p><div class="groups">`;
        for(let g=0;g<c;g++)html+=`<div class="group o">${dots('o',b)}</div>`;
        html+=`</div><div class="sum-line">Because ${b} ${SYM.mul} ${c} = ${a}, we know ${a} ${SYM.div} ${b} = ${c}.</div>`;
      }
      v.innerHTML=html;
    }
    render();

    /* ---------- tabs ---------- */
    document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{stopSpeech();speechStatus.textContent='';
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
      if(!ops.length)msg=lang==='en'?'Choose at least one operation.':'Hãy chọn ít nhất một phép tính.';
      else if((ops.includes('mul')||ops.includes('div'))&&!tabs.length)msg=lang==='en'?'Choose at least one multiplication or division table.':'Hãy chọn ít nhất một bảng nhân chia.';
      document.getElementById('setupNote').textContent=msg;document.getElementById('start').disabled=!!msg;return !msg;}
    const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
    function makeQ(ops,R,tabs){const o=ops[rnd(0,ops.length-1)];let a,b,c;
      if(o==='add'){a=rnd(1,R-1);b=rnd(1,R-a);c=a+b;}
      else if(o==='sub'){a=rnd(2,R);b=rnd(1,a);c=a-b;}
      else{const t=+tabs[rnd(0,tabs.length-1)],k=rnd(1,10);if(o==='mul'){a=t;b=k;c=t*k}else{a=t*k;b=t;c=k}}
      return{o,a,b,c};}
    let qs=[],qi=0,score=0,input='',wrong=[],locked=false,latestFeedback=null;
    function startQuiz(list){qs=list;qi=0;score=0;wrong=[];
      ['setup','result'].forEach(id=>document.getElementById(id).classList.add('hidden'));
      document.getElementById('quiz').classList.remove('hidden');showQ();}
    document.getElementById('start').onclick=()=>{if(!checkSetup())return;
      const ops=pressed('#pOps','op'),R=+pressed('#pRange','r')[0],tabs=pressed('#pTables','t'),N=+pressed('#pCount','c')[0];
      const list=[],seen=new Set();let guard=0;
      while(list.length<N&&guard++<500){const q=makeQ(ops,R,tabs),key=q.o+q.a+'_'+q.b;if(seen.has(key)&&guard<300)continue;seen.add(key);list.push(q);}
      startQuiz(list);};
    function showQ(){stopSpeech();input='';locked=false;latestFeedback=null;const q=qs[qi];
      document.getElementById('qNum').textContent=lang==='en'?`Question ${qi+1} / ${qs.length}`:`Câu ${qi+1} / ${qs.length}`;
      document.getElementById('qScore').textContent=`⭐ ${score}`;
      document.getElementById('qBar').style.width=(qi/qs.length*100)+'%';
      document.getElementById('fb').textContent='';document.getElementById('fb').className='feedback';drawQ();}
    function drawQ(){const q=qs[qi];document.getElementById('qText').innerHTML=`${q.a} ${SYM[q.o]} ${q.b} = <span class="answer">${input||'?'}</span>`;}
    const kp=document.getElementById('keypad');
    ['1','2','3','4','5','6','7','8','9','⌫','0','✓'].forEach(k=>{const b=document.createElement('button');b.textContent=k;
      if(k==='✓'){b.className='ok';b.setAttribute('aria-label','Kiểm tra')}if(k==='⌫'){b.className='del';b.setAttribute('aria-label','Xóa')}
      b.onclick=()=>press(k);kp.appendChild(b);});
    function press(k){if(locked)return;if(k==='⌫')input=input.slice(0,-1);else if(k==='✓')return check();else if(input.length<3)input+=k;drawQ();}
    const onKeyDown=e=>{if(document.getElementById('quiz').classList.contains('hidden'))return;
      if(/^[0-9]$/.test(e.key))press(e.key);else if(e.key==='Backspace')press('⌫');else if(e.key==='Enter'){e.preventDefault();press('✓');}};
    document.addEventListener('keydown',onKeyDown);
    keyCleanup=()=>document.removeEventListener('keydown',onKeyDown);
    const PRAISE=['Giỏi quá! 🎉','Chính xác! 🌟','Tuyệt vời! 👏','Đúng rồi! 💯'];
    function check(){if(input==='')return;locked=true;const q=qs[qi],fb=document.getElementById('fb');
      if(+input===q.c){score++;latestFeedback={correct:true,praiseIndex:rnd(0,3)};fb.textContent=lang==='en'?PRAISE_EN[latestFeedback.praiseIndex]:PRAISE[latestFeedback.praiseIndex];fb.className='feedback ok';setTimeoutLocal(next,900);}
      else{wrong.push(q);latestFeedback={correct:false,q};fb.textContent=lang==='en'?`Not quite. ${q.a} ${SYM[q.o]} ${q.b} = ${q.c}`:`Chưa đúng. ${q.a} ${SYM[q.o]} ${q.b} = ${q.c}`;fb.className='feedback no';
        (lang==='en'?speak(`${q.a} ${EN_WORD[q.o]} ${q.b} equals ${q.c}`):speak(`${readNum(q.a)} ${WORD[q.o]} ${readNum(q.b)} bằng ${readNum(q.c)}`));setTimeoutLocal(next,2200);}}
    function next(){qi++;if(qi<qs.length)showQ();else finish();}
    function finish(){document.getElementById('quiz').classList.add('hidden');document.getElementById('result').classList.remove('hidden');
      const p=score/qs.length,st=p>=.9?3:p>=.7?2:p>=.5?1:0;
      document.getElementById('stars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st);
      document.getElementById('finalScore').textContent=lang==='en'?`${score} / ${qs.length} correct answers`:`${score} / ${qs.length} câu đúng`;
      document.getElementById('praise').textContent=lang==='en'?(st===3?'Outstanding! You did an excellent job!':st===2?'Great work! Keep it up!':st===1?'Good start! A little more practice will help.':'No worries! Let us try again!'):(st===3?'Xuất sắc! Con làm rất giỏi!':st===2?'Làm tốt lắm! Cố thêm chút nữa nhé!':st===1?'Khá rồi! Luyện thêm sẽ giỏi hơn.':'Không sao, mình luyện lại nhé!');
      document.getElementById('wrongs').innerHTML=wrong.map(q=>`<span>${q.a} ${SYM[q.o]} ${q.b} = <b>${q.c}</b></span>`).join('');
      document.getElementById('retryWrong').classList.toggle('hidden',!wrong.length);}
    document.getElementById('retryWrong').onclick=()=>startQuiz(wrong.slice().sort(()=>Math.random()-.5));
    document.getElementById('again').onclick=()=>{document.getElementById('result').classList.add('hidden');document.getElementById('setup').classList.remove('hidden');};

    function applyLanguage(){
      stopSpeech();speechStatus.textContent='';
      host.setAttribute('lang',lang==='en'?'en-US':'vi-VN');
      staticLabels.forEach(el=>{el.textContent=lang==='en'?el.dataset.en:el.dataset.vi;});
      document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
      const checkKey=document.querySelector('#keypad button.ok');
      const deleteKey=document.querySelector('#keypad button.del');
      if(checkKey)checkKey.setAttribute('aria-label',lang==='en'?'Check':'');
      if(deleteKey)deleteKey.setAttribute('aria-label',lang==='en'?'Delete':'');
      render();checkSetup();
      if(qs.length){
        document.getElementById('qNum').textContent=lang==='en'?`Question ${qi+1} / ${qs.length}`:`C\u00e2u ${qi+1} / ${qs.length}`;
        if(latestFeedback){
          const fb=document.getElementById('fb');
          fb.textContent=latestFeedback.correct?(lang==='en'?PRAISE_EN[latestFeedback.praiseIndex]:PRAISE[latestFeedback.praiseIndex]):
            (lang==='en'?`Not quite. ${latestFeedback.q.a} ${SYM[latestFeedback.q.o]} ${latestFeedback.q.b} = ${latestFeedback.q.c}`:`Ch\u01b0a \u0111\u00fang. ${latestFeedback.q.a} ${SYM[latestFeedback.q.o]} ${latestFeedback.q.b} = ${latestFeedback.q.c}`);
        }
      }
      if(!document.getElementById('result').classList.contains('hidden') && qs.length)finish();
    }
    document.querySelectorAll('[data-lang]').forEach(b=>{
      b.onclick=()=>{if(lang===b.dataset.lang)return;lang=b.dataset.lang;applyLanguage();};
    });
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
    try {if(keyCleanup) keyCleanup();}catch(_){}
    keyCleanup=null;
    ctx = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
