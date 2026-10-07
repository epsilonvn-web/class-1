(() => {
  "use strict";

  const MODULE_KEY = 'learningClock';
  const STYLE_ID = 'class1-tool-learning-clock-style-v1';
  const ROOT_ID = 'class1-tool-learning-clock';

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
    #class1-tool-learning-clock{--tool-ink:#344054;--tool-muted:#667085;--tool-pink:#ec4899;--tool-purple:#8b5cf6;--tool-blue:#3b82f6;--tool-green:#10b981;--tool-amber:#f59e0b;color:var(--tool-ink);font-size:16px;line-height:1.45;width:100%;display:grid;gap:14px}
    #class1-tool-learning-clock *{box-sizing:border-box}
    #class1-tool-learning-clock button,#class1-tool-learning-clock input{font:inherit}
    #class1-tool-learning-clock button{cursor:pointer}
    #class1-tool-learning-clock .tool-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
    #class1-tool-learning-clock .tool-head h2{margin:0;color:#5b217a;font-size:21px;line-height:1.2;font-weight:950}
    #class1-tool-learning-clock .tool-head p{margin:3px 0 0;color:var(--tool-muted);font-size:15px}
    #class1-tool-learning-clock .back-btn,#class1-tool-learning-clock .btn,#class1-tool-learning-clock .chip,#class1-tool-learning-clock .tab,#class1-tool-learning-clock .qopt,#class1-tool-learning-clock .opt{border:1px solid #e9d5ff;border-radius:14px;background:#fff;color:#475467;font-weight:850;transition:transform .15s ease,filter .15s ease,box-shadow .15s ease}
    #class1-tool-learning-clock button:hover{filter:brightness(1.055);transform:translateY(-1px);box-shadow:0 6px 14px rgba(76,29,149,.12)}
    #class1-tool-learning-clock button:active{transform:translateY(0)}
    #class1-tool-learning-clock button:disabled{cursor:not-allowed;opacity:.55;transform:none;box-shadow:none}
    #class1-tool-learning-clock .back-btn{padding:9px 13px;color:#fff;border:0;background:linear-gradient(90deg,#ec4899,#8b5cf6)}
    #class1-tool-learning-clock .main{color:#fff!important;border-color:transparent!important;background:linear-gradient(90deg,#ec4899,#8b5cf6)!important;box-shadow:0 6px 14px rgba(139,92,246,.16)}
    #class1-tool-learning-clock .tabs{display:flex;gap:8px;flex-wrap:wrap}
    #class1-tool-learning-clock .tab{padding:9px 14px}
    #class1-tool-learning-clock .tab[aria-selected="true"],#class1-tool-learning-clock .chip[aria-pressed="true"]{color:#fff;border-color:transparent;background:linear-gradient(90deg,#ec4899,#8b5cf6)}
    #class1-tool-learning-clock .panel,#class1-tool-learning-clock .card{border:1px solid #e9d5ff;border-radius:20px;background:linear-gradient(145deg,#fff,#faf5ff);padding:14px;box-shadow:0 6px 16px rgba(76,29,149,.06)}
    #class1-tool-learning-clock .muted{color:var(--tool-muted)}
    #class1-tool-learning-clock .big{font-size:19px;font-weight:950;color:#6d28d9}
    #class1-tool-learning-clock .hidden{display:none!important}
    #class1-tool-learning-clock input{min-height:42px;border:1px solid #d8b4fe;border-radius:12px;padding:8px 10px;background:#fff;color:#344054}
    #class1-tool-learning-clock .chip{padding:8px 11px}
    #class1-tool-learning-clock .row{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
    #class1-tool-learning-clock .grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    #class1-tool-learning-clock .grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    #class1-tool-learning-clock .feedback,#class1-tool-learning-clock .fb{min-height:28px;font-weight:900}
    #class1-tool-learning-clock .ok{color:#047857!important;border-color:#86efac!important;background:#ecfdf5!important}
    #class1-tool-learning-clock .no{color:#be123c!important;border-color:#fecdd3!important;background:#fff1f2!important}
    @media(max-width:760px){#class1-tool-learning-clock{font-size:15px}#class1-tool-learning-clock .tool-head{align-items:flex-start}#class1-tool-learning-clock .tool-head h2{font-size:19px}#class1-tool-learning-clock .grid2,#class1-tool-learning-clock .grid3{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){#class1-tool-learning-clock *{transition:none!important;scroll-behavior:auto!important}}

    #class1-tool-learning-clock .clock-layout{display:grid;grid-template-columns:minmax(300px,.9fr) minmax(300px,1.1fr);gap:14px;align-items:start}
    #class1-tool-learning-clock .clock-wrap{text-align:center}#class1-tool-learning-clock .clock-svg{width:min(100%,390px);touch-action:none;user-select:none}#class1-tool-learning-clock .clock-svg.locked{cursor:default}#class1-tool-learning-clock .clock-face{fill:#fff;stroke:#c4b5fd;stroke-width:6}#class1-tool-learning-clock .clock-center{fill:#7c3aed}#class1-tool-learning-clock .clock-hour{stroke:#ec4899;stroke-width:11;stroke-linecap:round}#class1-tool-learning-clock .clock-min{stroke:#3b82f6;stroke-width:7;stroke-linecap:round}
    #class1-tool-learning-clock .digital{font-size:34px;font-weight:950;color:#6d28d9;letter-spacing:.04em}#class1-tool-learning-clock .period{display:inline-block;margin-left:7px;padding:3px 8px;border-radius:999px;background:#ecfdf5;color:#047857;font-weight:900}#class1-tool-learning-clock .reading{font-size:18px;font-weight:900;color:#344054}#class1-tool-learning-clock .reading2{color:#667085}
    #class1-tool-learning-clock .level-row{display:flex;gap:7px;flex-wrap:wrap}#class1-tool-learning-clock .explore-controls{display:grid;gap:9px}#class1-tool-learning-clock .step-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}#class1-tool-learning-clock .step-row button{padding:9px}#class1-tool-learning-clock .options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}#class1-tool-learning-clock .opt{min-height:48px;padding:9px}#class1-tool-learning-clock .prompt{font-size:20px;font-weight:950;color:#5b217a}#class1-tool-learning-clock .score-row{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-weight:900}#class1-tool-learning-clock .set-controls{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
    @media(max-width:820px){#class1-tool-learning-clock .clock-layout{grid-template-columns:1fr}#class1-tool-learning-clock .clock-svg{max-width:330px}}
    @media(max-width:520px){#class1-tool-learning-clock .options{grid-template-columns:1fr}}
`;
    window.document.head.appendChild(style);
  }

  function toolHtml() { return `<div id="class1-tool-learning-clock" class="tool-shell">
  <div class="tool-head"><div><h2>🕐 Đồng hồ học xem giờ</h2><p>Quay kim, đọc giờ và luyện tập theo từng mức.</p></div><button class="back-btn" data-tool-back type="button">← Tools</button></div>
  <div class="tabs"><button class="tab" data-mode="explore" aria-selected="true" type="button">🧭 Khám phá</button><button class="tab" data-mode="read" aria-selected="false" type="button">👀 Đọc giờ</button><button class="tab" data-mode="set" aria-selected="false" type="button">🖐️ Quay kim</button></div>
  <div class="clock-layout"><div class="panel clock-wrap"><svg id="clock" class="clock-svg" viewBox="0 0 320 320" aria-label="Đồng hồ kim"><circle class="clock-face" cx="160" cy="160" r="145"></circle><g id="minLabels"></g><g id="ticks"></g><g id="numbers"></g><line id="hourHand" class="clock-hour" x1="160" y1="160" x2="160" y2="88"></line><line id="minHand" class="clock-min" x1="160" y1="160" x2="160" y2="52"></line><circle class="clock-center" cx="160" cy="160" r="9"></circle></svg><div><span id="digital" class="digital"></span><span id="period" class="period"></span></div><div id="reading" class="reading"></div><div id="reading2" class="reading2"></div></div><div class="panel"><div id="levels" class="level-row"><button class="chip" data-step="60" aria-pressed="true" type="button">Tròn giờ</button><button class="chip" data-step="30" aria-pressed="false" type="button">30 phút</button><button class="chip" data-step="15" aria-pressed="false" type="button">15 phút</button><button class="chip" data-step="5" aria-pressed="false" type="button">5 phút</button></div><p id="hint" class="muted"></p><section id="explorePanel" class="explore-controls"><div class="step-row"><button id="minusStep" class="btn" data-add="-step" type="button"></button><button id="plusStep" class="btn" data-add="step" type="button"></button></div><div class="row"><button class="btn" data-add="-60" type="button">− 1 giờ</button><button class="btn" data-add="60" type="button">+ 1 giờ</button><button id="ampm" class="btn" type="button">+ 12 giờ</button><button id="now" class="btn" type="button">Giờ hiện tại</button><button id="say" class="btn main" type="button">🔊 Đọc giờ</button></div><label class="row"><input id="showMin" type="checkbox"> Hiện số phút quanh mặt đồng hồ</label></section><section id="practicePanel" class="hidden"><div class="score-row"><span id="pScore">Đúng 0 / 0</span><span id="pStreak"></span></div><p id="pPrompt" class="prompt"></p><div id="setControls" class="set-controls hidden"><button id="checkBtn" class="btn main" type="button">✓ Kiểm tra</button><button id="skipBtn" class="btn" type="button">Bỏ qua</button></div><div id="options" class="options"></div><div id="fb" class="feedback"></div></section></div></div>
</div>`; }

  function initTool(host) {
    const document = scopedDocument(host);
    const speechSynthesis = window.speechSynthesis;
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
    const setTimeoutLocal = schedule;
    const DG=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
    function readNum(n){const t=Math.floor(n/10),u=n%10;if(n<10)return DG[n];let s=t===1?'mười':DG[t]+' mươi';if(u===0)return s;
      if(u===5)return s+' lăm';if(u===1&&t>1)return s+' mốt';if(u===4&&t>1)return s+' tư';return s+' '+DG[u];}
    let viVoice=null;function loadVoice(){try{viVoice=speechSynthesis.getVoices().find(v=>/^vi/i.test(v.lang))||null}catch(e){}}
    try{loadVoice();speechSynthesis.onvoiceschanged=loadVoice}catch(e){}
    function speak(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='vi-VN';if(viVoice)u.voice=viVoice;u.rate=.9;speechSynthesis.speak(u)}catch(e){}}

    const NS='http://www.w3.org/2000/svg',C=160;
    const el=(tag,attrs,txt)=>{const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(txt!=null)e.textContent=txt;return e;};
    const pt=(deg,r)=>{const a=(deg-90)*Math.PI/180;return[C+r*Math.cos(a),C+r*Math.sin(a)]};
    /* build face */
    const ticks=document.getElementById('ticks'),nums=document.getElementById('numbers'),mins=document.getElementById('minLabels');
    for(let i=0;i<60;i++){const big=i%5===0,[x1,y1]=pt(i*6,134),[x2,y2]=pt(i*6,big?122:128);
      ticks.appendChild(el('line',{x1,y1,x2,y2,stroke:'var(--muted)','stroke-width':big?3:1.5,'stroke-linecap':'round'}));}
    for(let h=1;h<=12;h++){const[x,y]=pt(h*30,104);nums.appendChild(el('text',{x,y,'text-anchor':'middle','dominant-baseline':'central','font-family':'Baloo 2, Nunito, sans-serif','font-size':26,'font-weight':800,fill:'var(--ink)'},h));}
    for(let m=0;m<60;m+=5){const[x,y]=pt(m*6,145);mins.appendChild(el('text',{x,y,'text-anchor':'middle','dominant-baseline':'central','font-family':'Nunito, sans-serif','font-size':10,'font-weight':800,fill:'#fff'},m===0?'00':m));}
    mins.style.display='none';

    /* state: t = minutes of the day 0..1439 */
    let t=7*60,step=60,mode='explore',target=null,correct=0,total=0,streak=0,answered=false;
    const svg=document.getElementById('clock');
    function draw(){
      document.getElementById('hourHand').setAttribute('transform',`rotate(${(t%720)/2} ${C} ${C})`);
      document.getElementById('minHand').setAttribute('transform',`rotate(${(t%60)*6} ${C} ${C})`);
      if(mode==='explore')updateText();}
    const h12=x=>Math.floor(x/60)%12||12;
    function buoi(H){return H<4?'đêm':H<11?'sáng':H<13?'trưa':H<18?'chiều':H<22?'tối':'đêm';}
    function reading(x,withMore=true){const h=h12(x),m=x%60;
      if(m===0)return `${h} giờ`;
      if(m===30&&withMore)return `${h} giờ 30 phút (${h} giờ rưỡi)`;
      return `${h} giờ ${m} phút`;}
    function reading2(x){const h=h12(x),m=x%60;return m>30?`hay ${h%12+1} giờ kém ${60-m} phút`:'';}
    function updateText(){const H=Math.floor(t/60),m=t%60;
      document.getElementById('digital').textContent=String(H).padStart(2,'0')+':'+String(m).padStart(2,'0');
      document.getElementById('period').textContent=buoi(H);
      document.getElementById('reading').textContent=reading(t)+' '+buoi(H);
      const extra=[];const r2=reading2(t);if(r2)extra.push(r2);
      if(H>=13)extra.push(`Cách nói khác: ${H} giờ${m?' '+m+' phút':''}`);
      if(H===0)extra.push('Cách nói khác: 0 giờ (nửa đêm)');
      document.getElementById('reading2').textContent=extra.join(' · ');}
    function speakTime(){const h=h12(t),m=t%60;let s=readNum(h)+' giờ';if(m)s+=' '+readNum(m)+' phút';s+=' '+buoi(Math.floor(t/60));speak(s);}

    /* dragging */
    let drag=null,startT=0;
    function angleOf(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(svg.getScreenCTM().inverse());
      const dx=q.x-C,dy=q.y-C;let a=Math.atan2(dx,-dy)*180/Math.PI;if(a<0)a+=360;return{a,d:Math.hypot(dx,dy)};}
    const locked=()=>mode==='read';
    svg.addEventListener('pointerdown',e=>{if(locked())return;const{d}=angleOf(e);if(d<18)return;
      drag=(step===60||d<78)?'hour':'min';svg.setPointerCapture(e.pointerId);move(e);e.preventDefault();});
    svg.addEventListener('pointermove',e=>{if(drag)move(e)});
    const end=()=>{if(!drag)return;drag=null;t=snap(t);draw();if(mode==='explore')speakTime();};
    svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);
    function snap(x){const s=step;return((Math.round(x/s)*s)%1440+1440)%1440;}
    function move(e){const{a}=angleOf(e);
      if(drag==='min'){let m=Math.round(a/6)%60;m=Math.round(m/step)*step%60;let delta=m-t%60;if(delta>30)delta-=60;if(delta<-30)delta+=60;t=(t+delta+1440)%1440;}
      else{let n12=Math.round(a*2)%720;if(step===60)n12=Math.round(n12/60)*60%720;else n12=Math.floor(n12/60)*60+t%60;
        let delta=n12-t%720;if(delta>360)delta-=720;if(delta<-360)delta+=720;t=(t+delta+1440)%1440;}
      draw();}

    /* explore controls */
    document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const v=b.dataset.add;
      const add=v==='step'?Math.max(step,1)===60?60:step:v==='-step'?-(step===60?60:step):+v;t=snap((t+add+1440)%1440);draw();});
    document.getElementById('ampm').onclick=()=>{t=(t+720)%1440;draw();};
    document.getElementById('now').onclick=()=>{const d=new Date();t=snap(d.getHours()*60+d.getMinutes());draw();speakTime();};
    document.getElementById('say').onclick=speakTime;
    document.getElementById('showMin').onchange=e=>{mins.style.display=e.target.checked?'':'none'};
    function updStepButtons(){const s=step===60?'1 giờ':step+' phút';
      document.getElementById('minusStep').textContent='− '+s;document.getElementById('plusStep').textContent='+ '+s;
      document.getElementById('hint').innerHTML=locked()?'Nhìn kim đồng hồ rồi chọn cách đọc đúng.':step===60
        ?'Kéo <span style="color:var(--pink)">kim ngắn (kim giờ)</span> để đổi giờ.'
        :'Kéo <span style="color:var(--blue)">kim dài (kim phút)</span> ở vòng ngoài, <span style="color:var(--pink)">kim ngắn</span> ở vòng trong.';}
    document.getElementById('levels').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(!b)return;step=+b.dataset.step;
      document.querySelectorAll('#levels [data-step]').forEach(x=>x.setAttribute('aria-pressed',x===b));t=snap(t);updStepButtons();
      if(mode!=='explore'){correct=total=streak=0;newQ();}draw();});

    /* practice */
    const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
    function randTime(){const h=rnd(0,11);const m=step===60?0:step===5?rnd(0,11)*5:rnd(0,59);return h*60+m;}
    function setMode(m){mode=m;svg.classList.toggle('locked',locked());
      document.getElementById('explorePanel').classList.toggle('hidden',m!=='explore');
      document.getElementById('practicePanel').classList.toggle('hidden',m==='explore');
      correct=total=streak=0;updStepButtons();if(m==='explore'){t=snap(t);draw();}else newQ();}
    document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x===b));setMode(b.dataset.mode);});
    function updScore(){document.getElementById('pScore').textContent=`Đúng ${correct} / ${total}`;
      document.getElementById('pStreak').textContent=streak>=2?`🔥 ${streak} câu liên tiếp`:'';}
    function newQ(){answered=false;const fb=document.getElementById('fb');fb.textContent='';fb.className='feedback';
      let tg;do{tg=randTime()}while((target!==null&&tg===target)||(mode==="set"&&tg===0));target=tg;
      const opts=document.getElementById('options');opts.innerHTML='';
      if(mode==='set'){t=0;draw();document.getElementById('setControls').classList.remove('hidden');
        document.getElementById('pPrompt').textContent='Hãy quay kim chỉ: '+reading(target,false);}
      else{t=target;draw();document.getElementById('setControls').classList.add('hidden');
        document.getElementById('pPrompt').textContent='Đồng hồ đang chỉ mấy giờ?';
        const set=new Set([target]);const h=Math.floor(target/60),m=target%60;
        const cands=[((h+1)%12)*60+m,((h+11)%12)*60+m];
        if(m!==0){const swapH=Math.round(m/5)%12,swapM=(h===0?12:h)*5%60;cands.push(swapH*60+swapM);cands.push(h*60+(60-m)%60);}
        else{cands.push(h*60+30,((h+6)%12)*60);}
        for(const c of cands){if(set.size>=4)break;if(step===60&&c%60)continue;set.add((c+720)%720);}
        while(set.size<4)set.add(randTime());
        [...set].sort(()=>Math.random()-.5).forEach(v=>{const b=document.createElement('button');b.className='opt';b.textContent=reading(v,false);
          b.onclick=()=>answerRead(b,v);opts.appendChild(b);});}
      updScore();}
    function result(ok){const fb=document.getElementById('fb');total++;
      if(ok){correct++;streak++;fb.textContent=['Giỏi quá! 🎉','Chính xác! 🌟','Tuyệt vời! 👏'][rnd(0,2)];fb.className='feedback ok';}
      else{streak=0;fb.textContent='Chưa đúng. Đáp án: '+reading(target,false);fb.className='feedback no';}
      updScore();answered=true;setTimeoutLocal(newQ,ok?1200:2600);}
    document.getElementById('checkBtn').onclick=()=>{if(answered)return;const ok=t%720===target%720;if(!ok){t=target;draw();}result(ok);};
    document.getElementById('skipBtn').onclick=()=>{if(!answered)newQ();};
    function answerRead(btn,v){if(answered)return;const ok=v===target;btn.classList.add(ok?'ok':'no');
      if(!ok)[...document.querySelectorAll('.opt')].find(b=>b.textContent===reading(target,false))?.classList.add('ok');result(ok);}

    updStepButtons();draw();
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
