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

  const LEVELS = {
    l1: { label: 'Cấp 1 · Đếm 1–4', color: 'emerald' },
    l2: { label: 'Cấp 2 · Đếm đến 5', color: 'sky' },
    l3: { label: 'Cấp 3 · Đếm đến 7', color: 'violet' },
    l4: { label: 'Cấp 4 · Đếm theo nhóm', color: 'amber' },
    l5: { label: 'Cấp 5 · Quan sát kỹ', color: 'rose' },
    l6: { label: 'Cấp 6 · Siêu thám tử', color: 'fuchsia' }
  };

  const MISSIONS = [
    { level:'l1', imageId:'phong_y_te', target:'chiếc giường', plural:'chiếc giường', prompt:'Chạm vào từng chiếc giường trong phòng y tế.', pts:[[.27,.67],[.72,.67]] },
    { level:'l1', imageId:'ban_an', target:'chiếc cốc', plural:'chiếc cốc', prompt:'Chạm vào từng chiếc cốc trên bàn ăn.', pts:[[.34,.40],[.47,.51],[.66,.43]] },
    { level:'l1', imageId:'goc_do_choi', target:'thùng đồ chơi', plural:'thùng đồ chơi', prompt:'Chạm vào từng thùng đồ chơi lớn.', pts:[[.31,.64],[.55,.55],[.74,.55]] },
    { level:'l1', imageId:'ba_chau_ben_cua_so', target:'người', plural:'người', prompt:'Có mấy người trong phòng? Chạm vào từng người.', pts:[[.24,.53],[.50,.53],[.75,.52]] },

    { level:'l2', imageId:'ban_an', target:'chiếc ghế', plural:'chiếc ghế', prompt:'Chạm vào từng chiếc ghế quanh bàn ăn.', pts:[[.26,.24],[.73,.24],[.18,.68],[.78,.68]] },
    { level:'l2', imageId:'gia_sach', target:'đồ chơi', plural:'đồ chơi', prompt:'Trên giá có mấy món đồ chơi? Chạm vào từng món.', pts:[[.30,.25],[.48,.31],[.48,.57],[.43,.81]] },

    { level:'l3', imageId:'lop_hoc', target:'học sinh', plural:'học sinh', prompt:'Trong lớp có mấy bạn học sinh? Chạm vào từng bạn.', pts:[[.21,.55],[.72,.55],[.15,.78],[.42,.78],[.63,.78],[.84,.78]] },
    { level:'l3', imageId:'tu_quan_ao', target:'bộ quần áo', plural:'bộ quần áo', prompt:'Chạm vào từng bộ quần áo đang treo trong tủ.', pts:[[.30,.41],[.37,.41],[.44,.41],[.51,.43],[.58,.42],[.65,.43],[.72,.42]] },
    { level:'l3', imageId:'san_bong_tre_em', target:'bạn nhỏ', plural:'bạn nhỏ', prompt:'Trên sân có mấy bạn nhỏ? Chạm vào từng bạn.', pts:[[.17,.54],[.34,.41],[.49,.63],[.75,.42],[.84,.66]] },

    { level:'l4', imageId:'sieu_thi', target:'khay chuối', plural:'khay chuối', prompt:'Chạm vào từng khay có chuối.', pts:[[.39,.25],[.52,.52]] },
    { level:'l4', imageId:'sieu_thi', target:'khay cà chua', plural:'khay cà chua', prompt:'Chạm vào từng khay có cà chua.', pts:[[.19,.24],[.36,.53]] },
    { level:'l4', imageId:'sieu_thi', target:'khay nho xanh', plural:'khay nho xanh', prompt:'Chạm vào từng khay có nho xanh.', pts:[[.16,.68],[.67,.25],[.69,.49]] },
    { level:'l4', imageId:'sieu_thi', target:'khay cam', plural:'khay cam', prompt:'Chạm vào từng khay có cam.', pts:[[.87,.24],[.88,.48]] },

    { level:'l5', imageId:'goc_do_choi', target:'gấu bông', plural:'gấu bông', prompt:'Chạm vào từng chú gấu bông trong góc đồ chơi.', pts:[[.33,.57],[.54,.47],[.67,.45],[.77,.72]] },
    { level:'l5', imageId:'goc_do_choi', target:'xe đồ chơi', plural:'xe đồ chơi', prompt:'Chạm vào từng chiếc xe đồ chơi.', pts:[[.11,.36],[.25,.35],[.78,.53]] },
    { level:'l5', imageId:'phong_am_nhac', target:'đàn ghi-ta', plural:'đàn ghi-ta', prompt:'Chạm vào từng cây đàn ghi-ta trong phòng âm nhạc.', pts:[[.11,.17],[.52,.39],[.31,.76]] },
    { level:'l5', imageId:'lop_hoc', target:'chậu cây', plural:'chậu cây', prompt:'Chạm vào từng chậu cây trong lớp học.', pts:[[.18,.34],[.29,.34]] },

    { level:'l6', imageId:'lop_hoc', target:'bàn học sinh', plural:'bàn học sinh', prompt:'Chạm vào từng bàn học sinh trong lớp.', pts:[[.30,.61],[.69,.61],[.29,.83],[.70,.83]] },
    { level:'l6', imageId:'phong_y_te', target:'chiếc gối', plural:'chiếc gối', prompt:'Chạm vào từng chiếc gối trên giường.', pts:[[.24,.57],[.73,.57]] }
  ];

  const state = { level:'l1', mission:null, chosen:new Set(), errors:0, round:0, score:0, answered:false, missionOrder:[] };

  function shuffle_(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  function pool_(){ return MISSIONS.filter(m=>m.level===state.level); }
  function missionKey_(m){ return m.imageId+'|'+m.prompt; }
  function chooseMission_(){
    const pool=pool_();
    if (!state.missionOrder.length) state.missionOrder=shuffle_(pool);
    let m=state.missionOrder.shift();
    if (state.mission && pool.length>1 && missionKey_(m)===missionKey_(state.mission)) { state.missionOrder.push(m); m=state.missionOrder.shift(); }
    state.mission=m; state.chosen.clear(); state.answered=false; state.round++;
  }
  function distractors_(n){
    const vals=new Set([n]);
    const deltas=shuffle_([-3,-2,-1,1,2,3]);
    for(const d of deltas){ const v=n+d; if(v>=0&&v<=10) vals.add(v); if(vals.size===4) break; }
    for(let v=0;vals.size<4&&v<=10;v++) vals.add(v);
    return shuffle_([...vals]).slice(0,4);
  }
  function injectStyle_(){
    if(document.getElementById('counting-scene-style')) return;
    const s=document.createElement('style'); s.id='counting-scene-style'; s.textContent=`
      .cnt-shell{width:100%;max-width:none;margin:0 auto;font-family:inherit}.cnt-levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.cnt-level{border:1px solid #bae6fd;background:#fff;border-radius:16px;padding:9px;font-weight:900;color:#0369a1;transition:.15s}.cnt-level.is-active{background:linear-gradient(135deg,#06b6d4,#8b5cf6);color:#fff;border-color:#67e8f9;box-shadow:0 5px 14px rgba(8,145,178,.2)}
      .cnt-play{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr);gap:14px;align-items:start}.cnt-scene-card,.cnt-side{border-radius:24px;border:1px solid #dbeafe;background:#fff;box-shadow:0 6px 18px rgba(15,23,42,.06)}.cnt-scene-wrap{position:relative;width:100%;aspect-ratio:1/1;max-height:650px;overflow:hidden;border-radius:20px;background:#f8fafc}.cnt-scene{width:100%;height:100%;object-fit:contain;display:block}.cnt-hit-layer{position:absolute;inset:0}.cnt-mark{position:absolute;width:46px;height:46px;transform:translate(-50%,-50%);border-radius:999px;border:3px solid #fff;background:rgba(16,185,129,.92);color:#fff;font-weight:1000;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(5,150,105,.35);animation:cnt-pop .2s ease}.cnt-ripple{position:absolute;width:38px;height:38px;transform:translate(-50%,-50%);border:3px solid #fb7185;border-radius:999px;animation:cnt-ripple .5s ease forwards;pointer-events:none}.cnt-prompt{font-size:clamp(20px,2.2vw,30px);line-height:1.3;font-weight:1000;color:#0f172a;text-align:center}.cnt-answer{min-height:62px;border-radius:17px;border:1px solid #c7d2fe;background:#fff;color:#4338ca;font-size:26px;font-weight:1000;transition:.15s}.cnt-answer:hover{transform:translateY(-1px);background:#eef2ff}.cnt-answer.ok{background:#dcfce7;border-color:#4ade80;color:#15803d}.cnt-answer.bad{background:#fff1f2;border-color:#fb7185;color:#e11d48;animation:cnt-shake .25s ease}.cnt-action{min-height:44px;border-radius:14px;padding:9px 12px;font-weight:900}.cnt-chip{border-radius:999px;padding:7px 11px;font-size:13px;font-weight:900}.cnt-counter{font-size:40px;line-height:1;font-weight:1000;color:#0f766e}.cnt-feedback{min-height:44px;border-radius:14px;padding:10px 12px;font-weight:900;font-size:15px;line-height:1.45;background:#f8fafc;color:#475569;border:1px solid #e2e8f0}.cnt-tap-note{position:absolute;left:12px;bottom:12px;background:rgba(255,255,255,.92);backdrop-filter:blur(3px);border:1px solid #bae6fd;border-radius:999px;padding:7px 11px;font-size:13px;font-weight:900;color:#0369a1;box-shadow:0 2px 10px rgba(2,132,199,.12)}
      @keyframes cnt-pop{0%{transform:translate(-50%,-50%) scale(.6)}70%{transform:translate(-50%,-50%) scale(1.12)}100%{transform:translate(-50%,-50%) scale(1)}}@keyframes cnt-ripple{to{width:70px;height:70px;opacity:0}}@keyframes cnt-shake{0%,100%{transform:translateX(0)}35%{transform:translateX(-4px)}70%{transform:translateX(4px)}}
      @media(max-width:900px){.cnt-play{grid-template-columns:1fr}.cnt-scene-wrap{max-height:none}.cnt-levels{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.cnt-level{font-size:13px}.cnt-answer{min-height:54px;font-size:22px}.cnt-mark{width:38px;height:38px;font-size:15px}}
    `; document.head.appendChild(s);
  }
  function renderShell_(){
    const c=document.getElementById('game-play-container'); if(!c) return; injectStyle_();
    c.innerHTML=`<div class="cnt-shell space-y-3">
      <section class="rounded-3xl border-2 border-cyan-100 bg-gradient-to-br from-white via-cyan-50/50 to-violet-50/45 p-3 md:p-4 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3"><div><div class="flex items-center gap-2"><span class="text-3xl">🔎</span><div><h3 class="font-black text-cyan-800 text-lg md:text-xl">Thám tử đếm</h3><p class="text-xs md:text-sm font-bold text-slate-600">Chạm từng vật để không đếm thiếu, không đếm lặp.</p></div></div></div><button onclick="countingSpeakRules()" class="cnt-action bg-pink-50 border-2 border-pink-200 text-pink-700"><i class="fa-solid fa-volume-high mr-1"></i> Nghe luật chơi</button></div>
        <div class="cnt-levels mt-3">${Object.entries(LEVELS).map(([k,v])=>`<button id="cnt-level-${k}" class="cnt-level" onclick="countingChooseLevel('${k}')">${v.label}</button>`).join('')}</div>
      </section>
      <section class="cnt-play">
        <div class="cnt-scene-card p-2.5 md:p-3"><div class="cnt-scene-wrap" id="cnt-scene-wrap"><img id="cnt-scene-img" class="cnt-scene" alt="Tranh đếm"><div id="cnt-hit-layer" class="cnt-hit-layer"></div><div class="cnt-tap-note">👆 Chạm đúng từng vật</div></div></div>
        <aside class="cnt-side p-3 md:p-4 space-y-3">
          <div class="flex items-center justify-between gap-2"><span class="cnt-chip bg-cyan-50 border border-cyan-200 text-cyan-700">Lượt <span id="cnt-round">1</span></span><span class="cnt-chip bg-emerald-50 border border-emerald-200 text-emerald-700">⭐ <span id="cnt-score">0</span></span><span class="cnt-chip bg-rose-50 border border-rose-200 text-rose-700">Sai <span id="cnt-errors">0</span></span></div>
          <div id="cnt-prompt" class="cnt-prompt"></div>
          <div class="rounded-2xl bg-cyan-50/70 border border-cyan-100 p-3 text-center"><div class="text-xs font-black text-cyan-700 uppercase tracking-wide">Con đã đánh dấu</div><div class="cnt-counter mt-1"><span id="cnt-selected">0</span></div><div class="text-xs font-bold text-slate-500 mt-1">vật</div></div>
          <button id="cnt-done" onclick="countingDone()" class="cnt-action w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-sm disabled:opacity-50">Con đếm xong</button>
          <div id="cnt-answer-zone" class="hidden"><div class="text-center font-black text-slate-700 mb-2">Con đếm được bao nhiêu?</div><div id="cnt-answers" class="grid grid-cols-2 gap-2"></div></div>
          <div id="cnt-feedback" class="cnt-feedback">Cô gợi ý: chạm từng vật một, vật đã đếm sẽ có số đánh dấu.</div>
          <div class="grid grid-cols-2 gap-2"><button onclick="countingHint()" class="cnt-action bg-amber-50 border-2 border-amber-200 text-amber-700">💡 Gợi ý</button><button onclick="countingNewRound()" class="cnt-action bg-white border-2 border-slate-200 text-slate-600">↻ Câu mới</button></div>
        </aside>
      </section>
    </div>`;
  }
  function updateLevel_(){ Object.keys(LEVELS).forEach(k=>document.getElementById('cnt-level-'+k)?.classList.toggle('is-active',k===state.level)); }
  function renderMission_(){
    const m=state.mission; if(!m) return;
    const img=document.getElementById('cnt-scene-img'); if(img) img.src=imageSrc_(m.imageId);
    const p=document.getElementById('cnt-prompt'); if(p) p.textContent=m.prompt;
    const layer=document.getElementById('cnt-hit-layer'); if(layer){ layer.innerHTML=''; layer.onclick=countingSceneClick_; }
    document.getElementById('cnt-round').textContent=state.round;
    document.getElementById('cnt-score').textContent=state.score;
    document.getElementById('cnt-errors').textContent=state.errors;
    document.getElementById('cnt-selected').textContent=0;
    document.getElementById('cnt-answer-zone').classList.add('hidden');
    document.getElementById('cnt-done').disabled=false;
    document.getElementById('cnt-feedback').textContent='Cô gợi ý: chạm từng vật một, vật đã đếm sẽ có số đánh dấu.';
    updateLevel_();
  }
  function countingSceneClick_(ev){
    if(state.answered||!state.mission) return;
    const layer=ev.currentTarget; const r=layer.getBoundingClientRect(); const x=(ev.clientX-r.left)/r.width, y=(ev.clientY-r.top)/r.height;
    let best=-1,dist=999;
    state.mission.pts.forEach((p,i)=>{const d=Math.hypot(x-p[0],y-p[1]);if(d<dist){dist=d;best=i;}});
    if(best>=0 && dist<.095){
      if(state.chosen.has(best)) state.chosen.delete(best); else state.chosen.add(best);
      renderMarks_();
    } else {
      state.errors++; document.getElementById('cnt-errors').textContent=state.errors; ripple_(layer,x,y);
      const f=document.getElementById('cnt-feedback'); if(f) f.textContent='Chỗ đó chưa phải vật cô đang hỏi. Con nhìn lại tranh nhé!';
    }
  }
  function renderMarks_(){
    const layer=document.getElementById('cnt-hit-layer'); if(!layer) return;
    layer.querySelectorAll('.cnt-mark').forEach(x=>x.remove());
    [...state.chosen].forEach((idx,k)=>{const p=state.mission.pts[idx];const el=document.createElement('div');el.className='cnt-mark';el.style.left=(p[0]*100)+'%';el.style.top=(p[1]*100)+'%';el.textContent=String(k+1);layer.appendChild(el);});
    const n=document.getElementById('cnt-selected'); if(n) n.textContent=state.chosen.size;
  }
  function ripple_(layer,x,y){const el=document.createElement('div');el.className='cnt-ripple';el.style.left=(x*100)+'%';el.style.top=(y*100)+'%';layer.appendChild(el);later_(()=>el.remove(),520);}
  function showAnswers_(){
    const zone=document.getElementById('cnt-answer-zone'), box=document.getElementById('cnt-answers'); if(!zone||!box)return;
    zone.classList.remove('hidden'); const n=state.mission.pts.length;
    box.innerHTML=distractors_(n).map(v=>`<button class="cnt-answer" onclick="countingAnswer(${v},this)">${v}</button>`).join('');
  }
  window.countingDone=function(){ if(state.answered) return; showAnswers_(); document.getElementById('cnt-feedback').textContent='Bây giờ con chọn số lượng con vừa đếm được nhé.'; };
  window.countingAnswer=function(v,btn){
    if(state.answered) return; const correct=state.mission.pts.length;
    if(Number(v)!==correct){state.errors++;document.getElementById('cnt-errors').textContent=state.errors;btn.classList.add('bad');later_(()=>btn.classList.remove('bad'),500);document.getElementById('cnt-feedback').textContent='Chưa đúng. Con nhìn các dấu đã chạm và đếm lại nhé!';return;}
    if(state.chosen.size!==correct){ document.getElementById('cnt-feedback').textContent=`Con chọn đúng số ${correct}, nhưng hãy chạm đủ từng ${state.mission.target} trong tranh để chắc chắn mình không đếm đoán nhé.`; return; }
    state.answered=true;state.score++;btn.classList.add('ok');document.getElementById('cnt-score').textContent=state.score;document.getElementById('cnt-done').disabled=true;
    document.getElementById('cnt-feedback').textContent=`Đúng rồi! Có ${correct} ${state.mission.plural}. Con đã đếm từng vật rất cẩn thận.`;
    if(typeof speakVietnamese==='function') speakVietnamese(`Đúng rồi! Có ${correct} ${state.mission.plural}.`,.92);
    if(state.score>0 && state.score%10===0 && typeof rewardMiniGameStar_==='function') rewardMiniGameStar_('Bé đã hoàn thành 10 lượt Thám tử đếm!');
    later_(()=>window.countingNewRound(),850);
  };
  window.countingHint=function(){
    if(state.answered||!state.mission)return; const left=state.mission.pts.map((_,i)=>i).filter(i=>!state.chosen.has(i)); if(!left.length){showAnswers_();return;}
    const idx=left[0],p=state.mission.pts[idx],layer=document.getElementById('cnt-hit-layer'); if(!layer)return;
    const el=document.createElement('div');el.className='cnt-mark';el.style.left=(p[0]*100)+'%';el.style.top=(p[1]*100)+'%';el.style.background='rgba(245,158,11,.95)';el.textContent='?';layer.appendChild(el);later_(()=>el.remove(),950);
    document.getElementById('cnt-feedback').textContent='Cô vừa nháy một vật con chưa đánh dấu. Con chạm vào đúng vật đó nhé!';
  };
  window.countingNewRound=function(){ chooseMission_(); renderMission_(); };
  window.countingChooseLevel=function(level){ if(!LEVELS[level])return;state.level=level;state.missionOrder=[];state.round=0;state.score=0;state.errors=0;chooseMission_();renderMission_(); };
  window.countingSpeakRules=function(){ if(typeof speakVietnamese==='function') speakVietnamese('Con hãy quan sát tranh và chạm lần lượt vào từng vật cô hỏi. Vật đã chạm sẽ được đánh số để con không đếm lặp. Khi đếm xong, con chọn số lượng đúng.',.9); };
  window.stopCountingSceneGame=function(){ gameActive_=false; clearGameTimers_(); stopGameAudio_(); };
  window.startCountingSceneGame=function(){ clearGameTimers_(); gameActive_=true; renderShell_(); if(!state.mission) chooseMission_(); renderMission_(); };
})();
