(function () {
  'use strict';

  let gameActive_ = false;
  const gameTimers_ = new Set();
  function later_(fn, ms) {
    const id = setTimeout(() => {
      gameTimers_.delete(id);
      if (gameActive_) fn();
    }, ms);
    gameTimers_.add(id);
    return id;
  }
  function clearGameTimers_() {
    gameTimers_.forEach(id => clearTimeout(id));
    gameTimers_.clear();
  }
  function stopGameAudio_() {
    if (typeof stopSpeaking === 'function') {
      try { stopSpeaking(); } catch (_) {}
    }
  }

  const LEVELS = {
    l1: { label:'Cấp 1 · Ghép thành đôi' },
    l2: { label:'Cấp 2 · Nhìn cặp đoán số' },
    l3: { label:'Cấp 3 · Hai cánh cổng' },
    l4: { label:'Cấp 4 · Hàng đơn vị bí mật' },
    l5: { label:'Cấp 5 · Tìm số khác nhóm' },
    l6: { label:'Cấp 6 · Phản xạ nhanh' }
  };
  const ICONS = ['🍎','⚽','🐥','⭐','🍓','🧸','🌼','🚗'];
  const st = { level:'l1', number:7, icon:'🍎', selected:[], paired:new Set(), score:0, errors:0, round:0, lock:false, speedLeft:10, oddSet:[] };

  function rand_(a,b){ return a+Math.floor(Math.random()*(b-a+1)); }
  function shuffle_(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  function parity_(n){ return n%2===0?'even':'odd'; }
  function vnParity_(n){ return parity_(n)==='even'?'chẵn':'lẻ'; }
  function injectStyle_(){
    if(document.getElementById('even-odd-style')) return;
    const s=document.createElement('style'); s.id='even-odd-style'; s.textContent=`
      .eo-shell{width:100%;max-width:none;margin:0 auto;font-family:inherit}.eo-levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.eo-level{border:1px solid #ddd6fe;background:#fff;border-radius:16px;padding:10px;font-weight:900;color:#6d28d9;transition:.15s}.eo-level.is-active{background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;border-color:#c084fc;box-shadow:0 6px 16px rgba(168,85,247,.2)}
      .eo-card{border-radius:25px;border:1px solid #e9d5ff;background:#fff;box-shadow:0 7px 22px rgba(76,29,149,.07)}.eo-play{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(300px,.75fr);gap:14px;align-items:start}.eo-stage{min-height:520px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px;background:linear-gradient(145deg,#fff,#faf5ff 55%,#eff6ff);border-radius:22px;position:relative;overflow:hidden}.eo-title{font-size:clamp(22px,2.5vw,32px);font-weight:1000;color:#312e81;text-align:center;line-height:1.25}.eo-sub{font-size:15px;font-weight:800;color:#64748b;text-align:center;margin-top:7px}.eo-items{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;max-width:640px;margin:22px auto 8px}.eo-item{width:70px;height:70px;border-radius:18px;border:1px solid #ddd6fe;background:#fff;display:flex;align-items:center;justify-content:center;font-size:38px;cursor:pointer;transition:.18s;box-shadow:0 4px 12px rgba(76,29,149,.06)}.eo-item:hover{transform:translateY(-2px)}.eo-item.is-first{box-shadow:0 0 0 4px #f9a8d4;background:#fdf2f8}.eo-item.is-paired{background:#ecfdf5;border-color:#6ee7b7;transform:scale(.94)}.eo-item.is-left{background:#fff7ed;border-color:#fdba74;animation:eo-pulse 1s infinite}.eo-pairbar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:44px;margin-top:8px}.eo-pair{padding:7px 10px;border-radius:14px;background:#dcfce7;border:1px solid #86efac;color:#166534;font-weight:900}.eo-choice{min-height:74px;border-radius:20px;border:2px solid transparent;font-size:24px;font-weight:1000;transition:.15s}.eo-even{background:#ecfeff;border-color:#67e8f9;color:#0e7490}.eo-odd{background:#fff1f2;border-color:#fda4af;color:#be123c}.eo-choice:hover{transform:translateY(-2px)}.eo-choice.ok{box-shadow:0 0 0 4px #86efac}.eo-choice.bad{animation:eo-shake .25s;background:#fff1f2!important;border-color:#fb7185!important}.eo-number{font-size:clamp(72px,12vw,150px);font-weight:1000;line-height:1;color:#4f46e5;text-shadow:0 8px 22px rgba(79,70,229,.12)}.eo-ones{display:inline-block;color:#ec4899;background:#fdf2f8;border-radius:18px;padding:0 .12em;box-shadow:inset 0 -5px 0 #fbcfe8}.eo-gates{display:grid;grid-template-columns:1fr 1fr;gap:14px;width:min(100%,600px);margin-top:22px}.eo-gate{min-height:150px;border-radius:28px;border:2px solid;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:1000;font-size:26px;cursor:pointer;transition:.16s}.eo-gate span{font-size:44px}.eo-gate:hover{transform:scale(1.02)}.eo-gate.even{background:#ecfeff;border-color:#22d3ee;color:#0e7490}.eo-gate.odd{background:#fff1f2;border-color:#fb7185;color:#be123c}.eo-numgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;width:min(100%,620px);margin-top:22px}.eo-numcard{min-height:92px;border:1px solid #c7d2fe;border-radius:20px;background:#fff;color:#4338ca;font-size:34px;font-weight:1000;transition:.15s}.eo-numcard:hover{transform:translateY(-2px);background:#eef2ff}.eo-side{padding:14px}.eo-chip{border-radius:999px;padding:7px 11px;font-size:13px;font-weight:900}.eo-feedback{min-height:72px;border-radius:18px;border:1px solid #e2e8f0;background:#f8fafc;padding:12px;font-size:15px;font-weight:800;line-height:1.5;color:#475569}.eo-rule{font-size:16px;font-weight:900;color:#475569;line-height:1.5}.eo-rule strong{color:#7c3aed}.eo-action{min-height:46px;border-radius:15px;padding:9px 12px;font-weight:900}.eo-speed{font-size:15px;font-weight:900;color:#64748b}.eo-progress{height:9px;border-radius:999px;background:#f1f5f9;overflow:hidden}.eo-progress i{display:block;height:100%;background:linear-gradient(90deg,#06b6d4,#8b5cf6);border-radius:999px;transition:width .2s}
      @keyframes eo-shake{0%,100%{transform:translateX(0)}35%{transform:translateX(-5px)}70%{transform:translateX(5px)}}@keyframes eo-pulse{50%{transform:scale(1.05)}}
      @media(max-width:900px){.eo-play{grid-template-columns:1fr}.eo-stage{min-height:430px}.eo-levels{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.eo-item{width:58px;height:58px;font-size:32px}.eo-gate{min-height:120px;font-size:21px}.eo-number{font-size:86px}.eo-numcard{font-size:28px;min-height:78px}.eo-level{font-size:13px}}
    `; document.head.appendChild(s);
  }
  function renderShell_(){
    const c=document.getElementById('game-play-container'); if(!c)return; injectStyle_();
    c.innerHTML=`<div class="eo-shell space-y-3">
      <section class="rounded-3xl border-2 border-purple-100 bg-gradient-to-br from-white via-purple-50/45 to-pink-50/50 p-3 md:p-4 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3"><div class="flex items-center gap-2"><span class="text-3xl">👯</span><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-black text-purple-800 text-lg md:text-xl">Ghép đôi – Chẵn hay lẻ</h3><span class="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-xs font-black">Nâng cao</span></div><p class="text-sm md:text-base font-bold text-slate-600">Hiểu số chẵn, số lẻ bằng cách ghép thành từng đôi.</p></div></div><button onclick="evenOddSpeakRules()" class="eo-action bg-pink-50 border-2 border-pink-200 text-pink-700"><i class="fa-solid fa-volume-high mr-1"></i> Nghe luật chơi</button></div>
        <div class="eo-levels mt-3">${Object.entries(LEVELS).map(([k,v])=>`<button id="eo-level-${k}" class="eo-level" onclick="evenOddChooseLevel('${k}')">${v.label}</button>`).join('')}</div>
      </section>
      <section class="eo-play">
        <div class="eo-card p-2.5 md:p-3"><div id="eo-stage" class="eo-stage"></div></div>
        <aside class="eo-card eo-side space-y-3">
          <div class="flex items-center justify-between gap-2"><span class="eo-chip bg-violet-50 border border-violet-200 text-violet-700">Lượt <span id="eo-round">1</span></span><span class="eo-chip bg-emerald-50 border border-emerald-200 text-emerald-700">⭐ <span id="eo-score">0</span></span><span class="eo-chip bg-rose-50 border border-rose-200 text-rose-700">Sai <span id="eo-errors">0</span></span></div>
          <div class="rounded-2xl bg-purple-50/70 border border-purple-100 p-3"><div class="font-black text-purple-700 mb-1">Mẹo của Cô Thỏ</div><div id="eo-rule" class="eo-rule"></div></div>
          <div id="eo-feedback" class="eo-feedback"></div>
          <button onclick="evenOddNewRound()" class="eo-action w-full bg-white border-2 border-slate-200 text-slate-600">↻ Câu mới</button>
        </aside>
      </section>
    </div>`;
  }
  function setMeta_(){
    Object.keys(LEVELS).forEach(k=>document.getElementById('eo-level-'+k)?.classList.toggle('is-active',k===st.level));
    const a=document.getElementById('eo-round'),b=document.getElementById('eo-score'),c=document.getElementById('eo-errors'); if(a)a.textContent=st.round;if(b)b.textContent=st.score;if(c)c.textContent=st.errors;
  }
  function feedback_(t){ const el=document.getElementById('eo-feedback'); if(el)el.textContent=t; }
  function rule_(html){ const el=document.getElementById('eo-rule'); if(el)el.innerHTML=html; }
  function newNumber_(){
    if(st.level==='l1'||st.level==='l2') st.number=rand_(0,9);
    else if(st.level==='l3') st.number=rand_(0,20);
    else if(st.level==='l4') st.number=rand_(10,99);
    st.icon=ICONS[rand_(0,ICONS.length-1)];
  }
  function render_(){
    st.lock=false;st.selected=[];st.paired=new Set();st.round++;setMeta_(); const stage=document.getElementById('eo-stage'); if(!stage)return;
    if(st.level==='l1') return renderPairing_(stage);
    if(st.level==='l2') return renderPairView_(stage);
    if(st.level==='l3') return renderGates_(stage,false);
    if(st.level==='l4') return renderGates_(stage,true);
    if(st.level==='l5') return renderOddOne_(stage);
    return renderSpeed_(stage);
  }
  function renderPairing_(stage){
    st.number=rand_(1,9);st.icon=ICONS[rand_(0,ICONS.length-1)];
    stage.innerHTML=`<div class="eo-title">Ghép ${st.number} ${st.icon} thành từng đôi</div><div class="eo-sub">Chạm 2 hình một lần để ghép thành một đôi.</div><div id="eo-items" class="eo-items">${Array.from({length:st.number},(_,i)=>`<button id="eo-item-${i}" class="eo-item" onclick="evenOddPairItem(${i})">${st.icon}</button>`).join('')}</div><div id="eo-pairbar" class="eo-pairbar"></div><div id="eo-final-choice" class="hidden w-full max-w-lg mt-4"><div class="text-center font-black text-slate-700 mb-2">Vậy ${st.number} là số chẵn hay số lẻ?</div><div class="grid grid-cols-2 gap-3"><button onclick="evenOddAnswer('even',this)" class="eo-choice eo-even">CHẴN<br><span class="text-sm">ai cũng có đôi</span></button><button onclick="evenOddAnswer('odd',this)" class="eo-choice eo-odd">LẺ<br><span class="text-sm">còn 1 bạn lẻ</span></button></div></div>`;
    rule_('<strong>Số chẵn</strong>: ghép đôi hết. <strong>Số lẻ</strong>: còn lại 1 vật chưa có đôi.'); feedback_('Con hãy tự ghép từng đôi trước khi chọn chẵn hay lẻ.');
    if(st.number===1) later_(checkPairingDone_,0);
  }
  window.evenOddPairItem=function(i){
    if(st.lock||st.paired.has(i))return; const el=document.getElementById('eo-item-'+i); if(!el)return;
    if(st.selected.includes(i)){st.selected=st.selected.filter(x=>x!==i);el.classList.remove('is-first');return;}
    st.selected.push(i);el.classList.add('is-first');
    if(st.selected.length===2){ const pair=st.selected.slice();st.selected=[]; pair.forEach(x=>{st.paired.add(x);document.getElementById('eo-item-'+x)?.classList.remove('is-first');document.getElementById('eo-item-'+x)?.classList.add('is-paired');}); const bar=document.getElementById('eo-pairbar'); if(bar){const p=document.createElement('span');p.className='eo-pair';p.textContent=st.icon+' '+st.icon;bar.appendChild(p);} checkPairingDone_(); }
  };
  function checkPairingDone_(){
    const remaining=[];for(let i=0;i<st.number;i++)if(!st.paired.has(i))remaining.push(i);
    if(remaining.length<=1){ if(remaining.length===1)document.getElementById('eo-item-'+remaining[0])?.classList.add('is-left'); document.getElementById('eo-final-choice')?.classList.remove('hidden'); feedback_(remaining.length?'Còn đúng 1 bạn chưa có đôi. Con suy nghĩ xem số này thuộc nhóm nào nhé!':'Tất cả đều đã có đôi. Con chọn nhóm phù hợp nhé!'); }
  }
  function renderPairView_(stage){
    newNumber_(); const pairs=Math.floor(st.number/2), leftover=st.number%2;
    stage.innerHTML=`<div class="eo-title">Quan sát các đôi ${st.icon}</div><div class="eo-items">${st.number===0?'<div class="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 font-black text-emerald-700">0 vật · không có vật nào bị lẻ ra</div>':Array.from({length:pairs},()=>`<div class="eo-pair text-2xl">${st.icon} ${st.icon}</div>`).join('')}${leftover?`<div class="eo-item is-left">${st.icon}</div>`:''}</div><div class="text-center font-black text-slate-700 mt-4 mb-2">${st.number} là số chẵn hay số lẻ?</div><div class="grid grid-cols-2 gap-3 w-full max-w-lg"><button onclick="evenOddAnswer('even',this)" class="eo-choice eo-even">CHẴN</button><button onclick="evenOddAnswer('odd',this)" class="eo-choice eo-odd">LẺ</button></div>`;
    rule_('Nhìn xem các vật có <strong>ghép đôi hết</strong> hay còn <strong>1 vật lẻ</strong>.');feedback_('Con chưa cần nhớ quy tắc chữ số. Hãy nhìn các đôi trước.');
  }
  function renderGates_(stage,highlightOnes){
    newNumber_(); const shown=highlightOnes?String(st.number).slice(0,-1)+`<span class="eo-ones">${String(st.number).slice(-1)}</span>`:String(st.number);
    stage.innerHTML=`<div class="eo-title">Đưa số vào đúng cánh cổng</div><div class="eo-number mt-5">${shown}</div>${highlightOnes?'<div class="eo-sub">Chữ số hàng đơn vị được tô hồng.</div>':''}<div class="eo-gates"><button class="eo-gate even" onclick="evenOddAnswer('even',this)"><span>🟦</span>CỔNG CHẴN</button><button class="eo-gate odd" onclick="evenOddAnswer('odd',this)"><span>🩷</span>CỔNG LẺ</button></div>`;
    rule_(highlightOnes?'<strong>0, 2, 4, 6, 8</strong> ở hàng đơn vị → chẵn. <strong>1, 3, 5, 7, 9</strong> → lẻ.':'Nếu chưa chắc, con có thể tưởng tượng ghép số lượng đó thành từng đôi.');feedback_(highlightOnes?'Chỉ cần nhìn chữ số hàng đơn vị, không cần ghép cả số lớn.':'Con chọn cổng phù hợp cho số đang hiện.');
  }
  function renderOddOne_(stage){
    const majorityEven=Math.random()<.5; const oddIndex=rand_(0,3); const nums=[];
    while(nums.length<4){let n=rand_(10,99);let shouldEven=(nums.length===oddIndex)?!majorityEven:majorityEven;if((n%2===0)===shouldEven&&!nums.includes(n))nums.push(n);}
    st.oddSet={oddIndex,nums,majorityEven};
    stage.innerHTML=`<div class="eo-title">Số nào khác nhóm?</div><div class="eo-sub">Ba số cùng chẵn/lẻ, chỉ có một số khác.</div><div class="eo-numgrid">${nums.map((n,i)=>`<button class="eo-numcard" onclick="evenOddChooseOddOne(${i},this)">${n}</button>`).join('')}</div>`;
    rule_('So sánh <strong>chữ số hàng đơn vị</strong> của bốn số để tìm số khác nhóm.');feedback_('Con không cần tính toán. Chỉ kiểm tra chẵn/lẻ của từng số.');
  }
  window.evenOddChooseOddOne=function(i,btn){
    if(st.lock)return;if(i!==st.oddSet.oddIndex){wrong_(btn,'Số này vẫn cùng nhóm với phần lớn các số. Con xem lại hàng đơn vị nhé!');return;}correct_(btn,`Đúng! ${st.oddSet.nums[i]} là số ${vnParity_(st.oddSet.nums[i])}, khác ba số còn lại.`);
  };
  function renderSpeed_(stage){
    if(st.speedLeft<=0)st.speedLeft=10; st.number=rand_(0,99);
    stage.innerHTML=`<div class="eo-title">Phản xạ nhanh</div><div class="eo-speed mt-2">Còn <strong>${st.speedLeft}</strong> số</div><div class="w-full max-w-lg mt-3"><div class="eo-progress"><i style="width:${(10-st.speedLeft)*10}%"></i></div></div><div class="eo-number mt-7">${st.number}</div><div class="grid grid-cols-2 gap-3 w-full max-w-lg mt-7"><button onclick="evenOddAnswer('even',this)" class="eo-choice eo-even">CHẴN</button><button onclick="evenOddAnswer('odd',this)" class="eo-choice eo-odd">LẺ</button></div>`;
    rule_('Phản xạ theo hàng đơn vị: <strong>0,2,4,6,8 chẵn</strong>; <strong>1,3,5,7,9 lẻ</strong>.');feedback_('10 số liên tiếp. Cố gắng đúng thật nhiều nhé!');
  }
  function wrong_(btn,msg){ st.errors++;setMeta_();btn?.classList.add('bad');later_(()=>btn?.classList.remove('bad'),420);feedback_(msg); }
  function correct_(btn,msg){
    if(st.lock)return;st.lock=true;st.score++;setMeta_();btn?.classList.add('ok');feedback_(msg);if(typeof speakVietnamese==='function')speakVietnamese(msg,.94);
    if(st.score>0&&st.score%10===0&&typeof rewardMiniGameStar_==='function')rewardMiniGameStar_('Bé đã chinh phục 10 lượt Chẵn – Lẻ!');
    later_(()=>{if(st.level==='l6'){st.speedLeft--;if(st.speedLeft<=0){if(typeof showAppNotice==='function')showAppNotice(`Bé đã hoàn thành 10 số phản xạ nhanh với ${st.errors} lần chưa đúng.`,{title:'Hoàn thành thử thách!',icon:'🏆',okText:'Chơi lại'});st.speedLeft=10;}}render_();},700);
  }
  window.evenOddAnswer=function(kind,btn){
    if(st.lock)return; const correctKind=parity_(st.number); if(kind!==correctKind){
      if(st.level==='l1'||st.level==='l2') wrong_(btn,`${st.number} là số ${vnParity_(st.number)}. Con nhìn lại xem có còn vật nào chưa có đôi không nhé!`);
      else wrong_(btn,`Chưa đúng. Hàng đơn vị của ${st.number} là ${String(st.number).slice(-1)}.`); return;
    }
    const msg=st.level==='l1'||st.level==='l2'?`${st.number} là số ${vnParity_(st.number)} vì ${correctKind==='even'?'ghép đôi hết':'còn 1 bạn chưa có đôi'}.`:`Đúng! ${st.number} là số ${vnParity_(st.number)}.`; correct_(btn,msg);
  };
  window.evenOddNewRound=function(){ if(st.level==='l6')st.speedLeft=10;render_(); };
  window.evenOddChooseLevel=function(level){ if(!LEVELS[level])return;st.level=level;st.score=0;st.errors=0;st.round=0;st.speedLeft=10;render_(); };
  window.evenOddSpeakRules=function(){ if(typeof speakVietnamese==='function')speakVietnamese('Số chẵn là số có thể ghép thành từng đôi mà không còn vật nào lẻ. Số lẻ khi ghép đôi sẽ còn lại một vật. Khi gặp số hai chữ số, con chỉ cần nhìn chữ số hàng đơn vị.',.9); };
  window.stopEvenOddGame=function(){ gameActive_=false; clearGameTimers_(); stopGameAudio_(); };
  window.startEvenOddGame=function(){ clearGameTimers_(); gameActive_=true; renderShell_();render_(); };
})();
