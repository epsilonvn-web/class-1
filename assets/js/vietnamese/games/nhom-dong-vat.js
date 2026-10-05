// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ============================================================
// MINI GAME TV1 - 7. PHAN NHOM DONG VAT
// 30 tranh dong vat. Dap an dung dung ten nhom/tranh Notebook da dat.
// Moi luot: 1 ten dung + 3 ten gay nhieu trong cung nhom lon neu co the.
// Layout: anh vuong ben trai, 4 dap an doc ben phai; mobile xep doc.
// ============================================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let agLifecycleToken_=0; const agLifecycleTimers_=new Set();
function agLater_(fn,ms){const token=agLifecycleToken_;const id=setTimeout(()=>{agLifecycleTimers_.delete(id);if(token!==agLifecycleToken_)return;fn();},ms);agLifecycleTimers_.add(id);return id;}
function agCancelTimers_(){agLifecycleToken_++;for(const id of agLifecycleTimers_)clearTimeout(id);agLifecycleTimers_.clear();}
const AG_SCENES = [
  {id:'gia_suc_nong_trai_1', title:'Gia súc nông trại 1', family:'domestic'},
  {id:'gia_suc_nong_trai_2', title:'Gia súc nông trại 2', family:'domestic'},
  {id:'thu_cung_trong_nha_1', title:'Thú cưng trong nhà 1', family:'domestic'},
  {id:'thu_cung_trong_nha_2', title:'Thú cưng trong nhà 2', family:'domestic'},

  {id:'hoang_da_dong_co_1', title:'Hoang dã đồng cỏ 1', family:'wild'},
  {id:'hoang_da_dong_co_2', title:'Hoang dã đồng cỏ 2', family:'wild'},
  {id:'hoang_da_rung_xanh_1', title:'Hoang dã rừng xanh 1', family:'wild'},
  {id:'hoang_da_rung_xanh_2', title:'Hoang dã rừng xanh 2', family:'wild'},
  {id:'dong_vat_rung_nhiet_doi', title:'Động vật rừng nhiệt đới', family:'wild'},
  {id:'dong_vat_vung_cuc', title:'Động vật vùng cực', family:'wild'},

  {id:'dai_duong_san_ho_1', title:'Đại dương san hô 1', family:'ocean'},
  {id:'dai_duong_san_ho_2', title:'Đại dương san hô 2', family:'ocean'},
  {id:'dai_duong_day_bien', title:'Đại dương đáy biển', family:'ocean'},
  {id:'sinh_vat_bien_xinh_dep', title:'Sinh vật biển xinh đẹp', family:'ocean'},
  {id:'dai_duong_cuc_nam', title:'Đại dương cực Nam', family:'ocean'},

  {id:'cac_loai_chim_khu_vuon', title:'Các loài chim khu vườn', family:'birds'},
  {id:'cac_loai_chim_nhiet_doi', title:'Các loài chim nhiệt đới', family:'birds'},
  {id:'cac_loai_chim_san_moi', title:'Các loài chim săn mồi', family:'birds'},
  {id:'gia_cam_nong_trai', title:'Gia cầm nông trại', family:'birds'},
  {id:'chim_nuoc_dam_lay', title:'Chim nước đầm lầy', family:'birds'},

  {id:'khung_long_rung_xanh_1', title:'Khủng long rừng xanh 1', family:'prehistoric'},
  {id:'khung_long_rung_xanh_2', title:'Khủng long rừng xanh 2', family:'prehistoric'},
  {id:'khung_long_dam_lay', title:'Khủng long đầm lầy', family:'prehistoric'},
  {id:'sinh_vat_tien_su', title:'Sinh vật tiền sử', family:'prehistoric'},
  {id:'the_gioi_khung_long_con', title:'Thế giới khủng long con', family:'prehistoric'},

  {id:'con_trung_khu_vuon_1', title:'Côn trùng khu vườn 1', family:'small'},
  {id:'con_trung_khu_vuon_2', title:'Côn trùng khu vườn 2', family:'small'},
  {id:'sinh_vat_ao_ho', title:'Sinh vật ao hồ', family:'small'},
  {id:'con_trung_sao_sang', title:'Côn trùng sao sáng', family:'small'},
  {id:'khu_vuon_con_trung', title:'Khu vườn côn trùng', family:'small'}
].map(s => ({...s, image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc(s.id) : '')}));

let agDeck=[], agRound=0, agScore=0, agStreak=0, agBest=0, agLocked=false, agCurrent=null;

function agShuffle(arr){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function agBuildDeck(){agDeck=agShuffle(AG_SCENES);if(agCurrent&&agDeck.length>1&&agDeck[0].id===agCurrent.id){[agDeck[0],agDeck[1]]=[agDeck[1],agDeck[0]];}}
function agNext(){
  if(!agDeck.length) agBuildDeck();
  agCurrent=agDeck.shift(); agRound++; agLocked=false; agRender();
}
function agOptions(){
  const sameFamily=agShuffle(AG_SCENES.filter(s=>s.family===agCurrent.family && s.id!==agCurrent.id));
  let wrong=sameFamily.slice(0,3);
  if(wrong.length<3){
    const extra=agShuffle(AG_SCENES.filter(s=>s.family!==agCurrent.family));
    wrong=wrong.concat(extra.slice(0,3-wrong.length));
  }
  return agShuffle([agCurrent,...wrong]);
}
function agEnsureStyles(){
  if(document.getElementById('animal-group-style')) return;
  const s=document.createElement('style'); s.id='animal-group-style';
  s.textContent=`
    @keyframes agShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
    @keyframes agGlow{0%,100%{box-shadow:none}50%{box-shadow:0 0 28px rgba(16,185,129,.28)}}
    .ag-shake{animation:agShake .3s ease}.ag-correct{animation:agGlow .65s ease}
    .ag-main-layout{display:grid;grid-template-columns:minmax(300px,410px) minmax(0,1fr);gap:14px;align-items:stretch}
    .ag-picture-wrap{position:relative;aspect-ratio:1/1;width:100%;overflow:hidden}
    #ag-picture{width:100%;height:100%;object-fit:cover;display:block}
    .ag-options{display:grid;grid-template-columns:1fr;gap:10px;align-content:center}
    .ag-option{min-height:58px}
    @media(max-width:900px){.ag-main-layout{grid-template-columns:minmax(260px,350px) minmax(0,1fr);gap:10px}.ag-option{min-height:54px}}
    @media(max-width:700px){.ag-main-layout{grid-template-columns:1fr}.ag-picture-wrap{max-width:430px;margin:0 auto}.ag-options{grid-template-columns:1fr 1fr}.ag-option{min-height:50px}}
  `;
  document.head.appendChild(s);
}
function startAnimalGroupGame(){agCancelTimers_();
  agEnsureStyles(); agDeck=[]; agRound=0; agScore=0; agStreak=0; agBest=0; agLocked=false; agCurrent=null; agNext();
}
function agRender(){
  const box=document.getElementById('game-play-container'); if(!box||!agCurrent) return;
  const options=agOptions();
  const palettes=[
    'bg-pink-50 border-pink-200 hover:bg-pink-100',
    'bg-sky-50 border-sky-200 hover:bg-sky-100',
    'bg-amber-50 border-amber-200 hover:bg-amber-100',
    'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
  ];
  box.innerHTML=`
    <div class="rounded-[28px] border-2 border-pink-100 bg-gradient-to-b from-sky-50/70 via-pink-50/50 to-emerald-50/60 p-2.5 md:p-3">
      <div class="flex items-center justify-between gap-2 mb-2">
        <div class="flex items-center gap-2 min-w-0">
          <span class="px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-black text-xs md:text-sm shrink-0">🐾 Lượt ${agRound}</span>
          <div class="font-black text-teal-700 text-sm md:text-lg leading-tight truncate">Bức tranh thuộc nhóm nào?</div>
        </div>
        <div class="flex gap-1.5 shrink-0">
          <span class="px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${agScore}</span>
          <span class="px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${agStreak}</span>
          <span class="px-2.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${agBest}</span>
        </div>
      </div>
      <div class="ag-main-layout">
        <div class="ag-picture-wrap">
          <img id="ag-picture" src="${agCurrent.image}" alt="Tranh nhóm động vật" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')">
          <div class="hidden absolute inset-0 flex items-center justify-center text-7xl">🖼️</div>
        </div>
        <div class="ag-options">
          ${options.map((s,i)=>`<button class="ag-option px-4 py-2.5 rounded-2xl border-2 ${palettes[i]} text-slate-700 font-black text-sm md:text-base shadow-sm transition-all" onclick="agChoose(this,'${s.id}')">${s.title}</button>`).join('')}
          <div id="ag-feedback" class="min-h-[28px] flex items-center justify-center text-center text-xs md:text-sm font-black text-slate-500">Tên đáp án bám đúng tên nhóm tranh Notebook đã đặt. Bé quan sát thật kỹ nhé!</div>
        </div>
      </div>
    </div>`;
  if(typeof speakVietnamese==='function') agLater_(()=>speakVietnamese('Bức tranh thuộc nhóm nào?',0.96),150);
}
function agChoose(btn,sceneId){
  if(agLocked) return;
  if(sceneId===agCurrent.id){
    agLocked=true; agScore+=10+Math.min(agStreak,5)*2; agStreak++; agBest=Math.max(agBest,agStreak);
    btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800','ag-correct');
    const fb=document.getElementById('ag-feedback');
    if(fb) fb.innerHTML=`🎉 Chính xác! Đây là <span class="text-emerald-700 ml-1">${agCurrent.title}</span>.`;
    if(typeof playAudio==='function') playAudio('correct');
    if(typeof confetti==='function') confetti({particleCount:55,spread:68,origin:{y:.72}});
    if(typeof speakVietnamese==='function') speakVietnamese(`${agCurrent.title}. Chính xác!`,1.0);
    agLater_(agNext,1150);
  }else{
    agStreak=0; btn.classList.add('ag-shake','border-rose-400','bg-rose-50');
    agLater_(()=>btn.classList.remove('ag-shake','border-rose-400','bg-rose-50'),360);
    const fb=document.getElementById('ag-feedback'); if(fb) fb.textContent='🔔 Chưa đúng rồi. Bé nhìn lại đặc điểm các con vật trong tranh nhé!';
    if(typeof playAudio==='function') playAudio('wrong');
  }
}
window.startAnimalGroupGame=startAnimalGroupGame;
window.agChoose=agChoose;

function stopAnimalGroupGame(){agCancelTimers_(); try{ agLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopAnimalGroupGame=stopAnimalGroupGame;
