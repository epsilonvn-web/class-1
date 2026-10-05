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

  const BG_RIVER = imageSrc_('number_bridge_river');

  const LEVELS = {
    l1: { label: 'Cấp 1 · Cầu đến 5', target: [4,5], mode: 'basic' },
    l2: { label: 'Cấp 2 · Cầu đến 10', target: [6,10], mode: 'basic' },
    l3: { label: 'Cấp 3 · Tìm cách khác', target: [6,10], mode: 'alternate' },
    l4: { label: 'Cấp 4 · Còn thiếu bao nhiêu?', target: [6,10], mode: 'missing' },
    l5: { label: 'Cấp 5 · Đúng số đoạn', target: [7,10], mode: 'exactPieces' },
    l6: { label: 'Cấp 6 · Thử thách cây cầu', target: [7,12], mode: 'challenge' }
  };

  const PALETTES = ['#f59e0b','#38bdf8','#8b5cf6','#10b981','#fb7185','#14b8a6'];
  const st = {
    level: 'l1', round: 0, score: 0, errors: 0,
    target: 5, pieces: [], fixed: [], inventory: [],
    exactCount: null, banned: null, mustUse: null,
    firstSolution: null, solved: false, lock: false
  };

  function rand_(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
  function shuffle_(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  function sum_(a){ return a.reduce((s,n)=>s+n,0); }
  function key_(a){ return a.slice().sort((x,y)=>x-y).join('+'); }
  function clamp_(n,a,b){ return Math.max(a,Math.min(b,n)); }

  function injectStyle_(){
    if(document.getElementById('number-bridge-style')) return;
    const s=document.createElement('style');
    s.id='number-bridge-style';
    s.textContent=`
      .nb-shell{width:100%;max-width:none;margin:0 auto;font-family:inherit;color:#0f172a}
      .nb-head{border:1px solid #bfdbfe;background:linear-gradient(135deg,#f0f9ff,#fdf4ff);border-radius:24px;padding:14px 16px;margin-bottom:12px}
      .nb-levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}.nb-level{min-height:56px;border:1px solid #c7d2fe;background:#fff;border-radius:16px;padding:8px 10px;font-weight:1000;color:#4338ca;transition:.16s}.nb-level.is-active{color:#fff;border-color:#c4b5fd;background:linear-gradient(135deg,#6366f1,#8b5cf6);box-shadow:0 5px 16px rgba(99,102,241,.22)}
      .nb-layout{display:grid;grid-template-columns:minmax(0,2.35fr) minmax(300px,.72fr);gap:12px;align-items:start}.nb-card,.nb-side{background:#fff;border:1px solid #c7d2fe;border-radius:24px;box-shadow:0 6px 18px rgba(15,23,42,.06)}.nb-card{padding:0!important;overflow:visible;border:0!important;background:transparent!important;box-shadow:none!important;min-width:0}.nb-side{min-width:0;font-size:16px;line-height:1.5}.nb-dock{margin-top:12px;padding:12px 14px 14px;border:1px solid #bae6fd;border-radius:22px;background:linear-gradient(135deg,#f0f9ff,#fdf4ff);box-shadow:0 6px 18px rgba(15,23,42,.06)}.nb-dock-title{text-align:center;font-weight:1000;color:#334155;margin-bottom:9px;font-size:17px}
      .nb-board{position:relative;width:100%;aspect-ratio:16/9;min-height:0;overflow:hidden;border-radius:22px;background-color:#7dd3fc;background-image:var(--nb-bg,none);background-position:center;background-size:cover;background-repeat:no-repeat;box-shadow:inset 0 0 0 1px rgba(255,255,255,.45)}
      .nb-board:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.03),transparent 45%,rgba(2,132,199,.05));z-index:1}
      .nb-water-shimmer{position:absolute;left:4%;right:4%;bottom:4%;height:36%;pointer-events:none;z-index:2;overflow:hidden;opacity:.72}
      .nb-ripple{position:absolute;width:76px;height:16px;border:3px solid rgba(255,255,255,.58);border-color:rgba(255,255,255,.58) transparent transparent transparent;border-radius:50%;animation:nb-ripple 3.2s ease-in-out infinite}.nb-ripple.r1{left:18%;top:24%;animation-delay:-1.3s}.nb-ripple.r2{right:16%;top:52%;animation-delay:-2.1s}.nb-ripple.r3{left:48%;top:72%;animation-delay:-.6s}
      .nb-fishes{position:absolute;left:7%;right:7%;top:64%;bottom:7%;pointer-events:none;z-index:3;overflow:hidden}
      .nb-fish{position:absolute;width:34px;height:18px;border-radius:55% 48% 48% 55%;background:var(--fc,#fb923c);box-shadow:inset -7px -4px 0 rgba(0,0,0,.08),inset 5px 4px 0 rgba(255,255,255,.28),0 3px 6px rgba(3,105,161,.18);animation:nb-swim var(--dur,9s) linear infinite;animation-delay:var(--delay,0s)}
      .nb-fish:before{content:'';position:absolute;right:-12px;top:3px;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:13px solid var(--fc,#fb923c);filter:brightness(.92)}.nb-fish:after{content:'';position:absolute;left:7px;top:4px;width:4px;height:4px;border-radius:50%;background:#0f172a;box-shadow:0 0 0 2px rgba(255,255,255,.9)}
      .nb-fish.f1{top:8%;--dur:10s;--delay:-1s;--fc:#fb923c}.nb-fish.f2{top:46%;--dur:12.5s;--delay:-5s;--fc:#f472b6;transform:scale(.86)}.nb-fish.f3{top:72%;--dur:9s;--delay:-2s;--fc:#22c55e;transform:scale(.72)}.nb-fish.f4{top:27%;--dur:14s;--delay:-8s;--fc:#38bdf8;transform:scale(.95)}
      .nb-goal{position:absolute;top:35%;right:3.2%;width:68px;height:82px;border-radius:38px 38px 12px 12px;background:rgba(255,255,255,.9);border:4px solid #f59e0b;display:flex;align-items:center;justify-content:center;font-size:36px;box-shadow:0 6px 18px rgba(146,64,14,.22);z-index:7}
      .nb-runner{position:absolute;left:4.8%;top:37%;font-size:40px;z-index:8;transition:left 1.2s ease,transform .4s ease;filter:drop-shadow(0 3px 3px rgba(0,0,0,.2))}.nb-runner.run{left:89%;transform:translateY(-3px) rotate(4deg)}
      .nb-bridge-zone{position:absolute;left:18.2%;right:18.2%;top:39.5%;height:118px;z-index:6}.nb-grid{position:absolute;left:0;right:0;top:0;height:74px;border:3px solid rgba(255,255,255,.88);border-radius:15px;background:rgba(255,255,255,.14);display:grid;align-items:stretch;overflow:visible;box-shadow:0 5px 18px rgba(30,64,175,.18)}.nb-cell{border-right:2px dashed rgba(255,255,255,.72);position:relative}.nb-cell:last-child{border-right:0}.nb-cell span{position:absolute;left:50%;top:100%;transform:translate(-50%,7px);font-size:12px;font-weight:1000;color:#fff;text-shadow:0 2px 4px rgba(2,48,71,.7)}
      .nb-built{position:absolute;left:0;right:0;top:7px;height:58px;display:flex;align-items:stretch;gap:2px;overflow:visible}.nb-piece{height:58px;border-radius:10px;border:3px solid rgba(255,255,255,.96);background:linear-gradient(180deg,color-mix(in srgb,var(--pc,#f59e0b) 72%,#fff 28%) 0%,var(--pc,#f59e0b) 46%,color-mix(in srgb,var(--pc,#f59e0b) 72%,#7c2d12 28%) 100%)!important;box-shadow:inset 0 8px 0 rgba(255,255,255,.38),inset 0 -8px 0 rgba(124,74,23,.22),0 0 0 2px rgba(255,255,255,.18),0 6px 14px rgba(15,23,42,.18);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:1000;font-size:22px;flex:none;position:relative;overflow:hidden}.nb-piece:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 14px,rgba(0,0,0,.06) 14px 28px)}.nb-piece small{font-size:11px;position:absolute;bottom:2px}.nb-piece.fixed{filter:saturate(.84)}.nb-piece.overflow{outline:4px solid #ef4444;animation:nb-shake .3s ease}
      .nb-target-tag{position:absolute;left:50%;top:-42px;transform:translateX(-50%);border-radius:999px;padding:7px 14px;background:#fff;border:2px solid #93c5fd;font-weight:1000;color:#1d4ed8;box-shadow:0 3px 10px rgba(15,23,42,.08);white-space:nowrap}
      .nb-progress{position:absolute;left:15%;right:15%;top:72%;height:13px;background:#e2e8f0;border-radius:999px;overflow:hidden}.nb-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#34d399,#22c55e);transition:.25s}.nb-sum{position:absolute;left:50%;top:77%;transform:translateX(-50%);font-size:clamp(21px,2.4vw,31px);font-weight:1000;color:#0f172a;background:rgba(255,255,255,.9);border:1px solid #bae6fd;border-radius:18px;padding:8px 14px;min-width:220px;text-align:center}.nb-sum.hidden-equation{color:#64748b;font-size:16px}
      .nb-pieces{display:grid;grid-template-columns:repeat(auto-fit,minmax(112px,1fr));gap:10px}.nb-piece-btn{min-height:64px;border:1px solid #bfdbfe;background:#fff;border-radius:16px;font-size:20px;font-weight:1000;color:#1e40af;transition:.15s;display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 3px 8px rgba(30,64,175,.08)}.nb-piece-btn:hover{transform:translateY(-2px);background:#eff6ff;box-shadow:0 6px 12px rgba(30,64,175,.14)}.nb-piece-btn:active{transform:translateY(0) scale(.98)}.nb-piece-btn:disabled{opacity:.38;cursor:not-allowed;transform:none;box-shadow:none}.nb-mini-bar{display:inline-block;height:18px;border-radius:6px;border:2px solid rgba(255,255,255,.95);box-shadow:0 2px 5px rgba(15,23,42,.14)}
      .nb-stat{border-radius:999px;padding:8px 11px;font-size:15px;font-weight:1000;border:1px solid #e2e8f0;background:#fff}.nb-feedback{min-height:62px;border-radius:16px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;font-size:16px;line-height:1.5;font-weight:850;color:#475569;text-align:center}.nb-action{min-height:46px;border-radius:14px;padding:10px 13px;font-weight:1000;font-size:16px}.nb-mission{border-radius:18px;padding:14px;background:#eef2ff;border:1px solid #c7d2fe;font-size:16px;line-height:1.5}.nb-mission strong{display:block;color:#4338ca;font-size:18px;margin-bottom:5px}.nb-condition{margin-top:7px;border-radius:12px;background:#fff;padding:9px 11px;border:1px solid #ddd6fe;font-size:15px;font-weight:900;color:#5b21b6}.nb-goal-lines{display:grid;gap:10px}.nb-goal-line{display:flex;align-items:center;gap:8px;font-size:22px;line-height:1.25;font-weight:1000;color:#1e3a8a}.nb-goal-line .nb-big-target{font-size:27px;color:#1d4ed8}.nb-goal-line .nb-exact-count{display:inline-flex;align-items:center;justify-content:center;min-width:34px;padding:1px 8px;border-radius:10px;background:#fee2e2;color:#dc2626;font-size:30px;line-height:1;font-weight:1100;border:2px solid #fecaca;box-shadow:0 2px 6px rgba(220,38,38,.12)}.nb-other{display:none;margin-top:8px}.nb-other.show{display:block}
      @keyframes nb-shake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
      @keyframes nb-swim{0%{translate:-18% 0}48%{translate:48% -6px}52%{translate:52% 2px}100%{translate:118% -2px}}
      @keyframes nb-ripple{0%,100%{transform:scale(.72);opacity:.16}50%{transform:scale(1.18);opacity:.8}}
      @media(max-width:980px){.nb-layout{grid-template-columns:1fr}.nb-card{padding:0!important}.nb-levels{grid-template-columns:repeat(2,minmax(0,1fr))}.nb-side{order:2}.nb-goal{width:58px;height:72px;font-size:31px}.nb-runner{font-size:34px}.nb-pieces{grid-template-columns:repeat(auto-fit,minmax(105px,1fr))}}
      @media(max-width:560px){.nb-levels{grid-template-columns:1fr}.nb-pieces{grid-template-columns:repeat(2,minmax(0,1fr))}.nb-dock{padding:10px}.nb-bridge-zone{left:16%;right:16%;top:40%}.nb-progress{left:12%;right:12%}.nb-target-tag{font-size:12px;padding:6px 10px}}
    `;
    document.head.appendChild(s);
  }

  function shell_(){
    injectStyle_();
    const root=document.getElementById('game-play-container'); if(!root) return;
    root.innerHTML=`<div class="nb-shell">
      <section class="nb-head">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div><div class="font-black text-lg md:text-xl text-indigo-700">🌉 Cây cầu số · Vượt sông</div><div class="text-sm font-bold text-slate-600">Ghép những đoạn cầu vừa khít. Bé đang làm toán ngay khi xây cầu.</div></div>
          <button type="button" onclick="numberBridgeSpeakRules()" class="nb-action bg-white border-2 border-pink-200 text-pink-600">🔊 Nghe luật chơi</button>
        </div>
        <div class="nb-levels">${Object.entries(LEVELS).map(([k,v])=>`<button type="button" id="nb-level-${k}" onclick="numberBridgeChooseLevel('${k}')" class="nb-level">${v.label}</button>`).join('')}</div>
      </section>
      <section class="nb-layout">
        <div class="nb-card">
          <div id="nb-board" class="nb-board" style="--nb-bg:url('${BG_RIVER}')"></div>
          <div class="nb-dock"><div class="nb-dock-title">Kho đoạn cầu</div><div id="nb-pieces" class="nb-pieces"></div></div>
        </div>
        <aside class="nb-side p-3 md:p-4 space-y-3">
          <div class="flex gap-2 flex-wrap justify-center"><span class="nb-stat">🎯 Lượt <b id="nb-round">0</b></span><span class="nb-stat">⭐ Đúng <b id="nb-score">0</b></span><span class="nb-stat">✏️ Sửa <b id="nb-errors">0</b></span></div>
          <div id="nb-mission" class="nb-mission"></div>
          <div id="nb-feedback" class="nb-feedback">Chọn một đoạn cầu để bắt đầu.</div>
          <div class="grid grid-cols-2 gap-2"><button type="button" onclick="numberBridgeUndo()" class="nb-action bg-white border-2 border-slate-200 text-slate-600">↶ Tháo đoạn cuối</button><button type="button" onclick="numberBridgeReset()" class="nb-action bg-white border-2 border-slate-200 text-slate-600">↻ Làm lại</button></div>
          <button id="nb-new" type="button" onclick="numberBridgeNewRound()" class="nb-action w-full bg-gradient-to-r from-sky-500 to-violet-500 text-white">Cầu mới</button>
        </aside>
      </section>
    </div>`;
  }

  function findSolution_(target, inv, exactCount, banned, mustUse, avoidKey){
    const vals=inv.filter(x=>x!==banned);
    const results=[];
    function rec(start,cur,total){
      if(total===target){
        if((exactCount==null||cur.length===exactCount) && (mustUse==null||cur.includes(mustUse))){
          const k=key_(cur); if(k!==avoidKey) results.push(cur.slice());
        }
        return;
      }
      if(total>target||cur.length>=5) return;
      for(let i=start;i<vals.length;i++) rec(i,cur.concat(vals[i]),total+vals[i]);
    }
    rec(0,[],0); return results[0]||null;
  }

  function makeRound_(){
    const cfg=LEVELS[st.level]; st.round++; st.solved=false; st.lock=false; st.pieces=[]; st.fixed=[]; st.firstSolution=null; st.exactCount=null; st.banned=null; st.mustUse=null;
    st.target=rand_(cfg.target[0],cfg.target[1]);
    st.inventory = st.target<=5 ? [1,2,3,4] : [1,2,3,4,5];
    if(cfg.mode==='missing'){
      const fixed=rand_(2,Math.max(2,st.target-2)); st.fixed=[fixed]; st.pieces=[];
    } else if(cfg.mode==='exactPieces'){
      st.exactCount=rand_(2,3); let sol=findSolution_(st.target,st.inventory,st.exactCount,null,null,null); if(!sol){st.exactCount=2; sol=findSolution_(st.target,st.inventory,2,null,null,null);} 
    } else if(cfg.mode==='challenge'){
      const variant=rand_(0,2);
      if(variant===0){ st.exactCount=rand_(2,3); if(!findSolution_(st.target,st.inventory,st.exactCount,null,null,null)) st.exactCount=2; }
      if(variant===1){ st.mustUse=rand_(2,Math.min(5,st.target-1)); if(!findSolution_(st.target,st.inventory,null,null,st.mustUse,null)) st.mustUse=null; }
      if(variant===2){ st.banned=rand_(1,Math.min(4,st.target-1)); if(!findSolution_(st.target,st.inventory,null,st.banned,null,null)) st.banned=null; }
    }
    render_();
  }

  function currentTotal_(){ return sum_(st.fixed)+sum_(st.pieces); }

  function missionText_(){
    const cfg=LEVELS[st.level];
    if(cfg.mode==='exactPieces') {
      return `<div class="nb-goal-lines"><div class="nb-goal-line">🎯 <span>Mục tiêu: <span class="nb-big-target">${st.target} ô</span></span></div><div class="nb-goal-line">🧩 <span>Chỉ dùng: <span class="nb-exact-count">${st.exactCount}</span> đoạn</span></div></div>`;
    }
    let title=`Xây cây cầu dài đúng ${st.target} ô.`; let cond='';
    if(cfg.mode==='alternate') title=`Xây cầu dài ${st.target} ô. Sau đó tìm một cách ghép khác.`;
    if(cfg.mode==='missing') title=`Cầu dài ${st.target} ô đã có sẵn ${sum_(st.fixed)} ô. Con xây nốt phần còn thiếu.`;
    if(st.exactCount!=null) cond=`Dùng đúng ${st.exactCount} đoạn cầu.`;
    if(st.mustUse!=null) cond=`Phải dùng ít nhất một đoạn dài ${st.mustUse} ô.`;
    if(st.banned!=null) cond=`Không được dùng đoạn dài ${st.banned} ô.`;
    return `<strong>${title}</strong><div>Chạm đoạn cầu trong kho. Mỗi đoạn dài đúng theo số ô ghi trên đó.</div>${cond?`<div class="nb-condition">🎯 ${cond}</div>`:''}`;
  }

  function render_(){
    const board=document.getElementById('nb-board'); if(!board) return;
    const total=currentTotal_(); const pct=clamp_(total/st.target*100,0,118); const unit=100/st.target;
    const all=st.fixed.concat(st.pieces); let offset=0;
    const piecesHtml=all.map((n,i)=>{const over=offset+n>st.target; const width=n*unit; const color=PALETTES[i%PALETTES.length]; offset+=n; return `<div class="nb-piece ${i<st.fixed.length?'fixed':''} ${over?'overflow':''}" style="width:calc(${width}% - 2px);--pc:${color}"><span>${n}</span><small>${n} ô</small></div>`;}).join('');
    board.innerHTML=`<div class="nb-water-shimmer"><i class="nb-ripple r1"></i><i class="nb-ripple r2"></i><i class="nb-ripple r3"></i></div><div class="nb-fishes"><i class="nb-fish f1"></i><i class="nb-fish f2"></i><i class="nb-fish f3"></i><i class="nb-fish f4"></i></div><div class="nb-goal">🏡</div><div id="nb-runner" class="nb-runner">🐰</div>
      <div class="nb-bridge-zone"><div class="nb-target-tag">Độ dài cần xây: ${st.target} ô</div><div class="nb-grid" style="grid-template-columns:repeat(${st.target},1fr)">${Array.from({length:st.target},(_,i)=>`<div class="nb-cell"><span>${i+1}</span></div>`).join('')}</div><div class="nb-built">${piecesHtml}</div></div>
      <div class="nb-progress"><i style="width:${pct}%"></i></div><div class="nb-sum ${st.solved?'':'hidden-equation'}" id="nb-equation">${st.solved ? equation_() : `Đã xây ${total}/${st.target} ô`}</div>`;
    document.getElementById('nb-round').textContent=st.round; document.getElementById('nb-score').textContent=st.score; document.getElementById('nb-errors').textContent=st.errors;
    document.getElementById('nb-mission').innerHTML=missionText_();
    const box=document.getElementById('nb-pieces'); box.innerHTML=st.inventory.map((n,i)=>`<button type="button" class="nb-piece-btn" ${st.solved||st.lock||st.banned===n?'disabled':''} onclick="numberBridgeAdd(${n})"><span class="nb-mini-bar" style="width:${20+n*9}px;background:${PALETTES[i%PALETTES.length]}"></span>${n} ô</button>`).join('');
    updateLevel_();
  }

  function equation_(){ const arr=st.fixed.concat(st.pieces); return `${arr.join(' + ')} = ${st.target}`; }
  function updateLevel_(){ Object.keys(LEVELS).forEach(k=>document.getElementById('nb-level-'+k)?.classList.toggle('is-active',k===st.level)); }
  function feedback_(t){ const el=document.getElementById('nb-feedback'); if(el) el.textContent=t; }

  function validateCondition_(){
    const arr=st.fixed.concat(st.pieces);
    if(st.exactCount!=null && arr.length!==st.exactCount) return `Cầu đủ dài nhưng con đang dùng ${arr.length} đoạn. Nhiệm vụ cần đúng ${st.exactCount} đoạn.`;
    if(st.mustUse!=null && !arr.includes(st.mustUse)) return `Cầu đủ dài rồi, nhưng còn thiếu điều kiện: phải có một đoạn ${st.mustUse} ô.`;
    if(st.banned!=null && arr.includes(st.banned)) return `Độ dài đúng nhưng nhiệm vụ không cho dùng đoạn ${st.banned} ô.`;
    return '';
  }

  function success_(){
    const cfg=LEVELS[st.level]; const arr=st.fixed.concat(st.pieces); const k=key_(arr);
    if(cfg.mode==='alternate' && !st.firstSolution){
      st.firstSolution=k; st.solved=true; render_(); feedback_(`Đúng! ${equation_()}. Bây giờ cô thử thách con tìm một cách ghép KHÁC cũng bằng ${st.target}.`);
      later_(()=>{ st.solved=false; st.pieces=[]; render_(); feedback_(`Cách trước là ${k.replaceAll('+',' + ')}. Hãy tìm một cách khác nhé!`); },900); return;
    }
    if(cfg.mode==='alternate' && k===st.firstSolution){ st.errors++; document.getElementById('nb-errors').textContent=st.errors; feedback_('Cách này giống cách trước rồi. Con thử đổi các đoạn khác nhé!'); return; }
    st.solved=true; st.score++; render_();
    const runner=document.getElementById('nb-runner'); if(runner) requestAnimationFrame(()=>runner.classList.add('run'));
    feedback_(cfg.mode==='exactPieces' ? `Đúng rồi! ${equation_()} — vừa đủ ${st.exactCount} đoạn.` : `Cầu vừa khít! ${equation_()}. Con đã biến các đoạn cầu thành một phép cộng thật.`);
    if(typeof speakVietnamese==='function') speakVietnamese(`Cầu vừa khít! ${equation_().replaceAll('+',' cộng ').replace('=',' bằng ')}`,.9);
    if(st.score>0 && st.score%10===0 && typeof rewardMiniGameStar_==='function') rewardMiniGameStar_('Bé đã hoàn thành 10 cây cầu số!');
  }

  window.numberBridgeAdd=function(n){
    if(st.solved||st.lock) return; if(st.banned===n){st.errors++;render_();feedback_(`Đoạn ${n} ô đang bị cấm ở lượt này. Con chọn đoạn khác nhé!`);return;}
    st.pieces.push(Number(n)); render_(); const total=currentTotal_();
    if(total>st.target){ st.errors++; document.getElementById('nb-errors').textContent=st.errors; feedback_(`Cầu dài hơn bờ ${total-st.target} ô. Con nhìn phần thò sang bờ và tháo đoạn cuối nhé!`); return; }
    if(total<st.target){ feedback_(`Đã xây ${total} ô. Còn thiếu ${st.target-total} ô nữa.`); return; }
    const problem=validateCondition_(); if(problem){ st.errors++; document.getElementById('nb-errors').textContent=st.errors; feedback_(problem); return; }
    success_();
  };

  window.numberBridgeUndo=function(){ if(st.solved||st.lock) return; if(st.pieces.length){st.pieces.pop();render_();feedback_('Đã tháo đoạn cuối. Con thử cách khác nhé!');} };
  window.numberBridgeReset=function(){ if(st.lock) return; st.pieces=[]; st.solved=false; render_(); feedback_('Cầu đã được làm lại từ đầu.'); };
  window.numberBridgeNewRound=function(){ makeRound_(); feedback_('Cây cầu mới đã sẵn sàng.'); };
  window.numberBridgeChooseLevel=function(level){ if(!LEVELS[level])return; st.level=level; st.round=0; st.score=0; st.errors=0; makeRound_(); };
  window.numberBridgeSpeakRules=function(){ if(typeof speakVietnamese==='function') speakVietnamese('Con hãy chọn các đoạn cầu để ghép vừa khít khoảng trống. Mỗi đoạn dài đúng số ô ghi trên đó. Cầu ngắn thì còn thiếu, cầu dài quá thì sẽ thò sang bờ. Có nhiều lượt có hơn một cách đúng.',.88); };
  window.stopNumberBridgeGame=function(){ gameActive_=false; clearGameTimers_(); stopGameAudio_(); };
  window.startNumberBridgeGame=function(){ clearGameTimers_(); gameActive_=true; shell_(); if(st.round===0) makeRound_(); else render_(); };
})();
