(function () {
  'use strict';

  function imageSrc_(imageId) {
    return typeof window.resolveClass1MathImageSrc === 'function' ? window.resolveClass1MathImageSrc(imageId) : '';
  }

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

  const BG_TOWER = imageSrc_('number_tower_valley');

  const LEVELS = {
    l1: { label: 'Cấp 1 · Có mốc số 1', mode: 'asc', type: 'oneToFive', count: 5, anchor: true },
    l2: { label: 'Cấp 2 · Tự xây bé → lớn', mode: 'asc', type: 'random1', range: [0, 20], count: 5, anchor: false },
    l3: { label: 'Cấp 3 · Xây ngược lớn → bé', mode: 'desc', type: 'random1', range: [0, 30], count: 5, anchor: false },
    l4: { label: 'Cấp 4 · Số hai chữ số', mode: 'asc', type: 'random2', range: [11, 99], count: 5, anchor: false },
    l5: { label: 'Cấp 5 · Bước nhảy 2 hoặc 5', mode: 'asc', type: 'step', steps: [2, 5], range: [10, 70], count: 5, anchor: false },
    l6: { label: 'Cấp 6 · Tháp quy luật', mode: 'mixed', type: 'step', steps: [2, 5, 10], range: [10, 99], count: 5, anchor: false }
  };

  const COLORS = ['#facc15','#38bdf8','#a78bfa','#4ade80','#fb7185','#fb923c'];
  const st = {
    level: 'l1', round: 0, score: 0, errors: 0,
    sequence: [], pool: [], placed: [], fixed: [], direction: 'asc',
    step: 1, solved: false, hinted: false
  };

  function rand_(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
  function shuffle_(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  function uniqueRandom_(min,max,count){
    const s=new Set(); while(s.size<count) s.add(rand_(min,max)); return Array.from(s);
  }

  function injectStyle_(){
    if(document.getElementById('number-tower-style')) return;
    const s=document.createElement('style');
    s.id='number-tower-style';
    s.textContent=`
      .nt-shell{width:100%;max-width:none;margin:0 auto;font-family:inherit;color:#172554}
      .nt-head{border:1px solid #fde68a;background:linear-gradient(135deg,#fff7ed,#fdf4ff);border-radius:24px;padding:14px 16px;margin-bottom:12px}
      .nt-levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}.nt-level{min-height:56px;border:1px solid #fed7aa;background:#fff;border-radius:16px;padding:8px 10px;font-weight:1000;color:#c2410c;transition:.16s}.nt-level.is-active{color:#fff;border-color:#f9a8d4;background:linear-gradient(135deg,#f97316,#ec4899,#8b5cf6);box-shadow:0 5px 16px rgba(236,72,153,.22)}
      .nt-layout{display:grid;grid-template-columns:minmax(0,2.35fr) minmax(310px,.72fr);gap:12px;align-items:start}.nt-card,.nt-side{background:#fff;border:1px solid #fde68a;border-radius:24px;box-shadow:0 8px 20px rgba(15,23,42,.07)}.nt-card{padding:0!important;overflow:visible;border:0!important;background:transparent!important;box-shadow:none!important;min-width:0}.nt-side{min-width:0;font-size:16px;line-height:1.5}.nt-dock{margin-top:12px;padding:12px 14px 14px;border:1px solid #fde68a;border-radius:22px;background:linear-gradient(135deg,#fff7ed,#fdf4ff);box-shadow:0 6px 18px rgba(15,23,42,.06)}.nt-dock-title{text-align:center;font-weight:1000;color:#334155;margin-bottom:9px;font-size:17px}
      .nt-board{position:relative;width:100%;aspect-ratio:16/9;min-height:0;overflow:hidden;border-radius:22px;background-color:#dff6ff;background-image:var(--nt-bg,none);background-position:center;background-size:cover;background-repeat:no-repeat;box-shadow:inset 0 0 0 1px rgba(255,255,255,.45)}
      .nt-board:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.02),transparent 35%,transparent 65%,rgba(255,255,255,.02));pointer-events:none}
      .nt-stack{position:absolute;left:42.7%;top:21.2%;width:14.6%;height:51.7%;display:flex;flex-direction:column-reverse;gap:1.45%;z-index:4}
      .nt-slot{position:relative;flex:1;border:3px dashed rgba(255,255,255,.98);border-radius:13px;background:rgba(255,248,235,.94);box-shadow:inset 0 0 0 2px rgba(107,78,44,.12),0 2px 8px rgba(15,23,42,.12);display:flex;align-items:center;justify-content:center;transition:.18s;overflow:hidden}
      .nt-slot.filled{border-style:solid;background:linear-gradient(180deg,var(--c,#facc15),color-mix(in srgb,var(--c,#facc15) 75%,#fff 25%));box-shadow:inset 0 7px 0 rgba(255,255,255,.28),inset 0 -7px 0 rgba(0,0,0,.09),0 4px 10px rgba(15,23,42,.16)}
      .nt-slot.filled:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 17px,rgba(90,52,20,.11) 17px 20px)}
      .nt-slot b{position:relative;z-index:1;font-size:clamp(28px,4vw,48px);line-height:1;color:#3f2a17;text-shadow:0 2px 0 rgba(255,255,255,.5)}
      .nt-slot.fixed{outline:4px solid #fbbf24;outline-offset:-4px}.nt-slot.bad{animation:nt-shake .3s ease;outline:4px solid #fb7185}.nt-slot.good{animation:nt-pop .35s ease;outline:4px solid #34d399}
      .nt-base-label{position:absolute;left:23%;bottom:17%;z-index:6;background:#fff;border:3px solid #fb7185;border-radius:18px;padding:8px 12px;font-weight:1000;color:#be123c;box-shadow:0 5px 12px rgba(15,23,42,.14);max-width:145px;text-align:center}.nt-base-label:after{content:'';position:absolute;right:-20px;top:50%;width:22px;height:5px;background:#fb7185;transform:translateY(-50%)}
      .nt-step-badge{position:absolute;right:3%;top:3%;z-index:5;border-radius:999px;background:rgba(255,255,255,.94);border:2px solid #fbbf24;padding:7px 12px;font-weight:1000;color:#92400e;box-shadow:0 3px 9px rgba(15,23,42,.1)}
      .nt-sparkle{position:absolute;z-index:3;width:9px;height:9px;border-radius:50%;background:#fff7ae;box-shadow:0 0 0 4px rgba(255,255,255,.22),0 0 18px #fde68a;animation:nt-twinkle 2.8s ease-in-out infinite;pointer-events:none}.nt-sparkle.s1{left:31%;top:28%}.nt-sparkle.s2{right:28%;top:39%;animation-delay:-1.2s}.nt-sparkle.s3{left:67%;top:16%;animation-delay:-2s}
      .nt-success-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 52% 30%,rgba(255,244,120,.5),transparent 42%);animation:nt-pulse 1.2s ease-in-out infinite alternate;z-index:2}
      .nt-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:8}.nt-confetti i{position:absolute;top:-8%;width:10px;height:18px;border-radius:3px;background:var(--cc);animation:nt-fall var(--dur) linear forwards;transform:rotate(var(--rot))}
      .nt-stat{border-radius:999px;padding:8px 11px;font-size:15px;font-weight:1000;border:1px solid #e2e8f0;background:#fff}.nt-mission{border-radius:18px;padding:14px;background:#fff7ed;border:1px solid #fed7aa;font-size:16px;line-height:1.5}.nt-mission strong{display:block;color:#c2410c;font-size:19px;margin-bottom:5px}.nt-mission .rule{margin-top:8px;border-radius:12px;background:#fff;padding:9px 11px;border:1px solid #fde68a;font-size:15px;font-weight:900;color:#92400e}
      .nt-blocks{display:grid;grid-template-columns:repeat(auto-fit,minmax(105px,1fr));gap:10px}.nt-block{min-height:66px;border:2px solid rgba(255,255,255,.95);border-radius:16px;font-size:26px;font-weight:1000;color:#3f2a17;box-shadow:inset 0 7px 0 rgba(255,255,255,.25),0 4px 10px rgba(15,23,42,.12);transition:.15s;position:relative;overflow:hidden}.nt-block:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 18px,rgba(80,50,10,.08) 18px 21px)}.nt-block span{position:relative;z-index:1}.nt-block:hover{transform:translateY(-2px) scale(1.025);box-shadow:inset 0 7px 0 rgba(255,255,255,.25),0 7px 14px rgba(15,23,42,.16)}.nt-block:active{transform:translateY(0) scale(.98)}.nt-block:disabled{opacity:.28;filter:grayscale(.6);transform:none;cursor:not-allowed;box-shadow:none}
      .nt-feedback{min-height:66px;border-radius:16px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;font-size:16px;line-height:1.5;font-weight:850;color:#475569;text-align:center}.nt-action{min-height:46px;border-radius:14px;padding:10px 13px;font-weight:1000;font-size:16px}
      @keyframes nt-shake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}@keyframes nt-pop{50%{transform:scale(1.05)}}@keyframes nt-twinkle{0%,100%{transform:scale(.65);opacity:.2}50%{transform:scale(1.35);opacity:1}}@keyframes nt-pulse{to{opacity:.3}}@keyframes nt-fall{to{transform:translateY(620px) rotate(520deg);opacity:.15}}
      @media(max-width:980px){.nt-levels{grid-template-columns:repeat(2,minmax(0,1fr))}.nt-layout{grid-template-columns:1fr}.nt-stack{left:42.7%;width:14.6%;top:21.2%;height:51.7%}.nt-base-label{left:8%;bottom:14%;font-size:12px;max-width:115px}.nt-side{order:2}.nt-blocks{grid-template-columns:repeat(auto-fit,minmax(100px,1fr))}}
      @media(max-width:520px){.nt-stack{left:42.4%;width:15.2%;top:21.2%;height:51.7%}.nt-slot b{font-size:24px}.nt-blocks{grid-template-columns:repeat(2,1fr)}.nt-block{min-height:56px;font-size:21px}.nt-dock{padding:10px}.nt-base-label{display:none}}
    `;
    document.head.appendChild(s);
  }

  function shell_(){
    injectStyle_();
    const root=document.getElementById('game-play-container'); if(!root) return;
    root.innerHTML=`<div class="nt-shell">
      <div class="nt-head">
        <div class="flex items-center justify-between gap-3 flex-wrap"><div><div class="font-black text-violet-700 text-xl">🏰 Tháp số vươn cao</div><div class="text-sm font-bold text-slate-600 mt-1">Xếp số để từng tầng tháp dẫn con tới đúng quy luật.</div></div><button type="button" onclick="numberTowerSpeakRules()" class="px-4 py-2 rounded-xl bg-pink-50 text-pink-600 border border-pink-200 font-black">🔊 Nghe luật chơi</button></div>
        <div class="nt-levels">${Object.entries(LEVELS).map(([k,v])=>`<button id="nt-level-${k}" type="button" onclick="numberTowerChooseLevel('${k}')" class="nt-level">${v.label}</button>`).join('')}</div>
      </div>
      <section class="nt-layout">
        <div class="nt-card">
          <div id="nt-board" class="nt-board" style="--nt-bg:url('${BG_TOWER}')"></div>
          <div class="nt-dock"><div class="nt-dock-title">Các tầng tháp</div><div id="nt-blocks" class="nt-blocks"></div></div>
        </div>
        <aside class="nt-side p-3 md:p-4 space-y-3">
          <div class="flex gap-2 flex-wrap justify-center"><span class="nt-stat">🎯 Lượt <b id="nt-round">0</b></span><span class="nt-stat">⭐ Đúng <b id="nt-score">0</b></span><span class="nt-stat">✏️ Sửa <b id="nt-errors">0</b></span></div>
          <div id="nt-mission" class="nt-mission"></div>
          <div id="nt-feedback" class="nt-feedback">Chạm một khối số để đặt lên tầng thấp nhất còn trống.</div>
          <div class="grid grid-cols-2 gap-2"><button type="button" onclick="numberTowerUndo()" class="nt-action bg-white border-2 border-slate-200 text-slate-600">↶ Tháo tầng cuối</button><button type="button" onclick="numberTowerHint()" class="nt-action bg-amber-50 border-2 border-amber-200 text-amber-700">💡 Gợi ý</button></div>
          <button type="button" onclick="numberTowerReset()" class="nt-action w-full bg-white border-2 border-slate-200 text-slate-600">↻ Làm lại</button>
          <button id="nt-new" type="button" onclick="numberTowerNewRound()" class="nt-action w-full bg-gradient-to-r from-sky-500 via-fuchsia-500 to-violet-500 text-white">Tháp mới</button>
        </aside>
      </section>
    </div>`;
  }

  function makeSequence_(){
    const cfg=LEVELS[st.level];
    st.direction=cfg.mode==='mixed' ? (Math.random()<.5?'asc':'desc') : cfg.mode;
    let seq=[]; st.step=1;
    if(cfg.type==='oneToFive'){
      seq=[1,2,3,4,5];
    } else if(cfg.type==='random1' || cfg.type==='random2'){
      seq=uniqueRandom_(cfg.range[0],cfg.range[1],cfg.count).sort((a,b)=>a-b);
    } else if(cfg.type==='step'){
      st.step=cfg.steps[rand_(0,cfg.steps.length-1)];
      const maxStart=cfg.range[1]-st.step*(cfg.count-1);
      const start=rand_(cfg.range[0],Math.max(cfg.range[0],maxStart));
      seq=Array.from({length:cfg.count},(_,i)=>start+i*st.step);
    }
    if(st.direction==='desc') seq.reverse();
    st.sequence=seq;
    st.fixed=[]; st.placed=[];
    if(cfg.anchor){ st.fixed=[seq[0]]; }
    st.pool=shuffle_(seq.slice(st.fixed.length));
  }

  function makeRound_(){
    st.round++; st.solved=false; st.hinted=false; makeSequence_(); render_();
  }

  function mission_(){
    const cfg=LEVELS[st.level];
    const dir=st.direction==='asc'?'từ bé đến lớn':'từ lớn đến bé';
    let title=`Xây tháp ${dir}.`;
    let rule='Mỗi lần chạm, khối số sẽ được đặt vào tầng thấp nhất còn trống.';
    if(cfg.type==='step') rule=`Các tầng phải đi ${dir} và cách nhau đều ${st.step}.`;
    if(cfg.type==='random2') rule='Đây là các số hai chữ số. Hãy so sánh hàng chục trước, rồi hàng đơn vị khi cần.';
    if(cfg.anchor) rule+=` Cô đặt sẵn số ${st.sequence[0]} ở tầng thấp nhất làm mốc. Con tự tìm các tầng còn lại.`;
    return `<strong>${title}</strong><div>${rule}</div>`;
  }

  function render_(){
    const board=document.getElementById('nt-board'); if(!board) return;
    const cfg=LEVELS[st.level];
    const total=st.sequence.length;
    const values=st.fixed.concat(st.placed);
    const slots=Array.from({length:total},(_,i)=>{
      const val=values[i]; const isFixed=i<st.fixed.length; const c=COLORS[i%COLORS.length];
      return `<button type="button" ${val==null?'disabled':''} class="nt-slot ${val!=null?'filled':''} ${isFixed?'fixed':''}" style="--c:${c}" aria-label="Tầng ${i+1}${val!=null?`, số ${val}`:''}" onclick="numberTowerRemoveAt(${i})">${val!=null?`<b>${val}</b>`:''}</button>`;
    }).join('');
    const bottomLabel=st.direction==='asc'?'Số bé nhất ở đây':'Số lớn nhất ở đây';
    const badge=cfg.type==='step'?`Mỗi tầng ${st.direction==='asc'?'+':'−'}${st.step}`:(cfg.type==='random2'?'Số hai chữ số':(st.direction==='asc'?'Bé → lớn':'Lớn → bé'));
    board.innerHTML=`${st.solved?'<div class="nt-success-glow"></div>':''}<i class="nt-sparkle s1"></i><i class="nt-sparkle s2"></i><i class="nt-sparkle s3"></i><div class="nt-step-badge">${badge}</div><div class="nt-base-label">${bottomLabel}</div><div class="nt-stack">${slots}</div><div id="nt-confetti" class="nt-confetti"></div>`;
    document.getElementById('nt-round').textContent=st.round; document.getElementById('nt-score').textContent=st.score; document.getElementById('nt-errors').textContent=st.errors;
    document.getElementById('nt-mission').innerHTML=mission_();
    const used=new Map(); values.forEach(v=>used.set(v,(used.get(v)||0)+1));
    const box=document.getElementById('nt-blocks');
    box.innerHTML=st.pool.map((n,i)=>{
      const usedCount=used.get(n)||0; const sequenceCount=st.sequence.filter(x=>x===n).length; const unavailable=usedCount>=sequenceCount || st.solved;
      const c=COLORS[(i+2)%COLORS.length];
      return `<button type="button" class="nt-block" style="background:${c}" ${unavailable?'disabled':''} onclick="numberTowerAdd(${n})"><span>${n}</span></button>`;
    }).join('');
    Object.keys(LEVELS).forEach(k=>document.getElementById('nt-level-'+k)?.classList.toggle('is-active',k===st.level));
  }

  function feedback_(t){ const el=document.getElementById('nt-feedback'); if(el) el.textContent=t; }
  function current_(){ return st.fixed.concat(st.placed); }
  function isComplete_(){ return current_().length===st.sequence.length; }

  function check_(){
    if(!isComplete_()) return;
    const cur=current_(); const bad=cur.findIndex((v,i)=>v!==st.sequence[i]);
    if(bad<0){
      st.solved=true; st.score++; render_(); feedback_(`Tháp hoàn chỉnh! ${st.sequence.join(' → ')}. Con đã xếp đúng quy luật.`); celebrate_();
      if(typeof speakVietnamese==='function') speakVietnamese(`Tháp hoàn chỉnh! Con đã xếp đúng ${st.direction==='asc'?'từ bé đến lớn':'từ lớn đến bé'}.`,.9);
      if(st.score>0 && st.score%10===0 && typeof rewardMiniGameStar_==='function') rewardMiniGameStar_('Bé đã xây đúng 10 tháp số!');
    } else {
      st.errors++; document.getElementById('nt-errors').textContent=st.errors;
      const slot=document.querySelectorAll('.nt-slot')[bad]; slot?.classList.add('bad');
      const prev=bad>0?cur[bad-1]:null;
      if(prev!=null){ feedback_(`Con xem lại tầng có số ${cur[bad]}. Nó cần ${st.direction==='asc'?'lớn hơn':'bé hơn'} tầng ngay dưới là ${prev}${(LEVELS[st.level].type==='step')?` đúng ${st.step} đơn vị`:''}.`); }
      else feedback_(`Tầng đầu tiên chưa đúng. Hãy tìm ${st.direction==='asc'?'số bé nhất':'số lớn nhất'} trước nhé.`);
    }
  }

  function celebrate_(){
    const box=document.getElementById('nt-confetti'); if(!box) return;
    box.innerHTML=Array.from({length:28},(_,i)=>`<i style="left:${rand_(2,96)}%;--cc:${COLORS[i%COLORS.length]};--dur:${(1.8+Math.random()*1.5).toFixed(2)}s;--rot:${rand_(0,180)}deg"></i>`).join('');
  }

  window.numberTowerAdd=function(n){
    if(st.solved) return;
    n=Number(n);
    const cur=current_();
    if(cur.length>=st.sequence.length) return;
    const already=cur.filter(x=>x===n).length;
    const allowed=st.sequence.filter(x=>x===n).length;
    if(already>=allowed) return;
    const expected=st.sequence[cur.length];
    if(n!==expected){
      st.errors++;
      document.getElementById('nt-errors').textContent=st.errors;
      const empty=document.querySelectorAll('.nt-slot')[cur.length];
      empty?.classList.add('bad');
      const prev=cur.length?cur[cur.length-1]:null;
      if(prev==null) feedback_(`Tầng đầu cần là ${st.direction==='asc'?'số bé nhất':'số lớn nhất'} trong các khối. Con thử nhìn lại nhé!`);
      else if(LEVELS[st.level].type==='step') feedback_(`Chưa khớp quy luật. Từ ${prev}, tầng tiếp theo phải cách đúng ${st.step} đơn vị.`);
      else feedback_(`Tầng này chưa đứng đúng chỗ. Con cần chọn một số ${st.direction==='asc'?'lớn hơn':'bé hơn'} ${prev}, rồi so với các khối còn lại.`);
      return;
    }
    st.placed.push(n);
    render_();
    const placedSlot=document.querySelectorAll('.nt-slot')[cur.length];
    placedSlot?.classList.add('good');
    if(isComplete_()) check_(); else feedback_(`Đúng vị trí! Con tiếp tục xây tầng kế tiếp.`);
  };
  window.numberTowerRemoveAt=function(i){
    if(st.solved || i<st.fixed.length) return;
    const rel=i-st.fixed.length; if(rel<0 || rel>=st.placed.length) return;
    st.placed.splice(rel,1); render_(); feedback_('Đã tháo tầng đó. Con xếp lại nhé!');
  };
  window.numberTowerUndo=function(){ if(st.solved)return; if(st.placed.length){st.placed.pop();render_();feedback_('Đã tháo tầng vừa đặt.');} };
  window.numberTowerReset=function(){ if(st.solved)return; st.placed=[]; render_(); feedback_('Tháp đã được làm lại từ đầu.'); };
  window.numberTowerHint=function(){
    if(st.solved)return; const idx=current_().length; if(idx>=st.sequence.length)return; const n=st.sequence[idx]; st.hinted=true;
    feedback_(`Gợi ý: tầng tiếp theo là ${n}. Hãy nhìn xem vì sao ${n} đứng sau tầng trước nhé.`);
    Array.from(document.querySelectorAll('.nt-block')).forEach(b=>{ if(Number(b.textContent.trim())===n){b.style.outline='4px solid #f59e0b';b.style.outlineOffset='2px';} });
  };
  window.numberTowerNewRound=function(){ makeRound_(); feedback_('Một tháp mới đã sẵn sàng.'); };
  window.numberTowerChooseLevel=function(level){ if(!LEVELS[level])return; st.level=level; st.round=0; st.score=0; st.errors=0; makeRound_(); };
  window.numberTowerSpeakRules=function(){ if(typeof speakVietnamese==='function') speakVietnamese('Con chạm các khối số để xây tháp từ tầng dưới lên. Có lượt cô cho sẵn số nhỏ nhất làm mốc, có lượt con phải tự tìm từ đầu. Các cấp sau có số hai chữ số và dãy cách đều hai, năm hoặc mười. Nếu cần, con có thể tháo tầng hoặc xin gợi ý.',.88); };
  window.stopNumberTowerGame=function(){ gameActive_=false; clearGameTimers_(); stopGameAudio_(); };
  window.startNumberTowerGame=function(){ clearGameTimers_(); gameActive_=true; shell_(); if(st.round===0) makeRound_(); else render_(); };
})();
