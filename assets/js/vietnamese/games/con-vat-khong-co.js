// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ============================================================
// MINI GAME TV1 - 8. TRUY TIM DONG VAT
// 30 tranh. Moi luot: 3 con co trong tranh + 1 con KHONG co.
// Dap an gay nhieu duoc chon theo CHU DE HEP cua tung buc tranh,
// tranh truong hop nhu anh day bien lai chen gau Bac Cuc.
// Layout: anh vuong ben trai, dap an doc ben phai; mobile xep doc.
// ============================================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let maLifecycleToken_=0; const maLifecycleTimers_=new Set();
function maLater_(fn,ms){const token=maLifecycleToken_;const id=setTimeout(()=>{maLifecycleTimers_.delete(id);if(token!==maLifecycleToken_)return;fn();},ms);maLifecycleTimers_.add(id);return id;}
function maCancelTimers_(){maLifecycleToken_++;for(const id of maLifecycleTimers_)clearTimeout(id);maLifecycleTimers_.clear();}
const MA_SCENES = [
  {id:'gia_suc_nong_trai_1', animals:['bò','trâu','lợn','cừu','dê','ngựa'], distractors:['lừa','thỏ','vịt','gà','ngỗng']},
  {id:'gia_suc_nong_trai_2', animals:['lừa','thỏ','vịt','gà','ngỗng'], distractors:['bò','trâu','lợn','cừu','dê','ngựa']},
  {id:'thu_cung_trong_nha_1', animals:['chó','mèo','chim yến phụng','chuột hamster','rùa'], distractors:['thỏ','cá vàng','nhím']},
  {id:'thu_cung_trong_nha_2', animals:['mèo','chó','thỏ','cá vàng','nhím'], distractors:['rùa','chuột hamster','chim yến phụng']},

  {id:'hoang_da_dong_co_1', animals:['sư tử','hươu cao cổ','ngựa vằn','voi','tê giác'], distractors:['linh dương','đà điểu','hà mã','linh cẩu','thỏ rừng']},
  {id:'hoang_da_dong_co_2', animals:['linh dương','đà điểu','hà mã','linh cẩu','thỏ rừng'], distractors:['sư tử','hươu cao cổ','ngựa vằn','voi','tê giác']},
  {id:'hoang_da_rung_xanh_1', animals:['hổ','báo hoa mai','khỉ','gấu','sóc'], distractors:['cáo đỏ','nai','gấu trúc','gấu mèo','nhím']},
  {id:'hoang_da_rung_xanh_2', animals:['cáo đỏ','nai','gấu trúc','gấu mèo','nhím'], distractors:['hổ','báo hoa mai','khỉ','gấu','sóc']},
  {id:'dong_vat_rung_nhiet_doi', animals:['tắc kè hoa','con lười','chim toucan','ếch cây','báo đốm'], distractors:['khỉ','hổ','rắn','vẹt đỏ','kiến ăn lá']},
  {id:'dong_vat_vung_cuc', animals:['cáo Bắc Cực','thỏ Bắc Cực','cú tuyết','gấu Bắc Cực','tuần lộc'], distractors:['hải cẩu','chim cánh cụt','hải mã','cá voi sát thủ']},

  {id:'dai_duong_san_ho_1', animals:['cá heo','rùa biển','cá hề','sao biển','bạch tuộc'], distractors:['cá mập','cá đuối','cua biển','tôm hùm','cá ngừ']},
  {id:'dai_duong_san_ho_2', animals:['cá mập','cá đuối','cua biển','tôm hùm','cá ngừ'], distractors:['cá heo','rùa biển','cá hề','sao biển','bạch tuộc']},
  {id:'dai_duong_day_bien', animals:['mực','sứa biển','cá ngựa','ốc biển','cá voi'], distractors:['bạch tuộc','cá mập','cá đuối','cua biển','tôm hùm']},
  {id:'sinh_vat_bien_xinh_dep', animals:['cá thần tiên','cá nóc','sò biển','hải sâm','cá bống'], distractors:['cá hề','sao biển','cá ngựa','sứa biển','rùa biển']},
  {id:'dai_duong_cuc_nam', animals:['chim cánh cụt','hải cẩu','cá voi sát thủ','gấu Bắc Cực','hải mã'], distractors:['cáo Bắc Cực','thỏ Bắc Cực','cú tuyết','tuần lộc']},

  {id:'cac_loai_chim_khu_vuon', animals:['chim sẻ','chim bồ câu','chim họa mi','chim gõ kiến','chim hút mật'], distractors:['chim vẹt','chim bói cá','chim công','chim hồng hạc','chim toucan']},
  {id:'cac_loai_chim_nhiet_doi', animals:['chim vẹt','chim hồng hạc','chim toucan','chim công','chim bói cá'], distractors:['chim sẻ','chim bồ câu','chim họa mi','chim gõ kiến','chim hút mật']},
  {id:'cac_loai_chim_san_moi', animals:['đại bàng','chim cú mèo','chim diều hâu','chim cò','chim ưng'], distractors:['chim kền kền','đại bàng biển','chim cắt','chim diều đỏ']},
  {id:'gia_cam_nong_trai', animals:['gà trống','gà mái','gà con','vịt xiêm','ngỗng','gà tây'], distractors:['thiên nga','vịt trời','chim bồ nông','chim bồ câu']},
  {id:'chim_nuoc_dam_lay', animals:['thiên nga','cò trắng','chim bồ nông','chim bói cá','vịt trời'], distractors:['chim hồng hạc','chim sếu','chim mòng biển','chim cốc']},

  {id:'khung_long_rung_xanh_1', animals:['khủng long bạo chúa','khủng long cổ dài','khủng long ba sừng','khủng long bay','khủng long giáp'], distractors:['khủng long gai','khủng long phiến sừng','khủng long săn mồi','khủng long mỏ vịt']},
  {id:'khung_long_rung_xanh_2', animals:['khủng long gai','khủng long phiến sừng','khủng long săn mồi','khủng long mỏ vịt','khủng long con'], distractors:['khủng long bạo chúa','khủng long cổ dài','khủng long ba sừng','khủng long giáp']},
  {id:'khung_long_dam_lay', animals:['khủng long cổ dài dưới nước','khủng long cổ dài','khủng long bay','khủng long mào','khủng long nhỏ'], distractors:['khủng long bạo chúa','khủng long ba sừng','khủng long giáp','khủng long gai']},
  {id:'sinh_vat_tien_su', animals:['voi ma mút','hổ răng kiếm','chim dodo','tê tê cổ đại','hươu thời băng hà'], distractors:['tê giác lông dài','gấu hang động','sói tiền sử','bò rừng cổ đại']},
  {id:'the_gioi_khung_long_con', animals:['khủng long bạo chúa con','khủng long cổ dài con','khủng long bay con','khủng long ba sừng con','khủng long phiến sừng con'], distractors:['khủng long giáp con','khủng long mỏ vịt con','khủng long gai con','khủng long mào con']},

  {id:'con_trung_khu_vuon_1', animals:['bướm','ong mật','chuồn chuồn','bọ rùa','kiến'], distractors:['châu chấu','bọ ngựa','dế mèn','đom đóm','bọ cánh cứng']},
  {id:'con_trung_khu_vuon_2', animals:['châu chấu','bọ ngựa','dế mèn','đom đóm','bọ cánh cứng'], distractors:['bướm','ong mật','chuồn chuồn','bọ rùa','kiến']},
  {id:'sinh_vat_ao_ho', animals:['ếch xanh','nòng nọc','cua đồng','ốc nhồi','cá rô'], distractors:['cá chép','tôm đồng','ốc bươu','cá trê','rắn nước']},
  {id:'con_trung_sao_sang', animals:['bọ rùa','sâu đo','thạch sùng','cuốn chiếu','ve sầu'], distractors:['đom đóm','dế mèn','bọ ngựa','kiến','chuồn chuồn']},
  {id:'khu_vuon_con_trung', animals:['bướm','ong mật','bọ rùa','ốc sên','châu chấu'], distractors:['chuồn chuồn','kiến','bọ ngựa','dế mèn','đom đóm']}
].map(s=>({...s,image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc(s.id) : '')}));

let maDeck=[],maRound=0,maScore=0,maStreak=0,maBest=0,maLocked=false,maCurrent=null,maQuestion=null;
function maShuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function maBuildDeck(){maDeck=maShuffle(MA_SCENES);if(maCurrent&&maDeck.length>1&&maDeck[0].id===maCurrent.id){[maDeck[0],maDeck[1]]=[maDeck[1],maDeck[0]];}}
function maBuildQuestion(scene){
  const present=maShuffle(scene.animals).slice(0,3);
  const absentCandidates=scene.distractors.filter(a=>!scene.animals.includes(a));
  if(!absentCandidates.length) throw new Error(`Khong co dap an gay nhieu hop le cho ${scene.id}`);
  const absent=maShuffle(absentCandidates)[0];
  return {present,absent,options:maShuffle([...present,absent])};
}
function maNext(){
  if(!maDeck.length) maBuildDeck();
  maCurrent=maDeck.shift(); maQuestion=maBuildQuestion(maCurrent); maRound++; maLocked=false; maRender();
}
function maEnsureStyles(){
  if(document.getElementById('missing-animal-style'))return;
  const s=document.createElement('style');s.id='missing-animal-style';
  s.textContent=`
    @keyframes maShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
    @keyframes maGlow{0%,100%{box-shadow:none}50%{box-shadow:0 0 28px rgba(16,185,129,.28)}}
    .ma-shake{animation:maShake .3s ease}.ma-correct{animation:maGlow .65s ease}
    .ma-main-layout{display:grid;grid-template-columns:minmax(300px,410px) minmax(0,1fr);gap:14px;align-items:stretch}
    .ma-picture-wrap{position:relative;aspect-ratio:1/1;width:100%;overflow:hidden}
    #ma-picture{width:100%;height:100%;object-fit:cover;display:block}
    .ma-options{display:grid;grid-template-columns:1fr;gap:10px;align-content:center}
    .ma-option{min-height:58px}
    @media(max-width:900px){.ma-main-layout{grid-template-columns:minmax(260px,350px) minmax(0,1fr);gap:10px}.ma-option{min-height:54px}}
    @media(max-width:700px){.ma-main-layout{grid-template-columns:1fr}.ma-picture-wrap{max-width:430px;margin:0 auto}.ma-options{grid-template-columns:1fr 1fr}.ma-option{min-height:50px}}
  `;document.head.appendChild(s);
}
function startMissingAnimalGame(){maCancelTimers_();
  maEnsureStyles(); maDeck=[]; maRound=0; maScore=0; maStreak=0; maBest=0; maLocked=false; maCurrent=null; maQuestion=null; maNext();
}
function maRender(){
  const box=document.getElementById('game-play-container');if(!box||!maCurrent||!maQuestion)return;
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
          <span class="px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-black text-xs md:text-sm shrink-0">🔎 Lượt ${maRound}</span>
          <div class="font-black text-teal-700 text-sm md:text-lg leading-tight truncate">Con vật nào <span class="text-rose-500">KHÔNG CÓ</span> trong bức hình?</div>
        </div>
        <div class="flex gap-1.5 shrink-0">
          <span class="px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${maScore}</span>
          <span class="px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${maStreak}</span>
          <span class="px-2.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${maBest}</span>
        </div>
      </div>
      <div class="ma-main-layout">
        <div class="ma-picture-wrap">
          <img id="ma-picture" src="${maCurrent.image}" alt="Tranh động vật" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')">
          <div class="hidden absolute inset-0 flex items-center justify-center text-7xl">🖼️</div>
        </div>
        <div class="ma-options">
          ${maQuestion.options.map((a,i)=>`<button class="ma-option px-4 py-2.5 rounded-2xl border-2 ${palettes[i]} text-slate-700 font-black text-sm md:text-base shadow-sm transition-all" data-animal="${a.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" onclick="maChoose(this,this.dataset.animal)">${a}</button>`).join('')}
          <div id="ma-feedback" class="min-h-[28px] flex items-center justify-center text-center text-xs md:text-sm font-black text-slate-500">3 con có trong tranh + 1 con không có nhưng vẫn cùng chủ đề. Bé nhìn thật kỹ nhé!</div>
        </div>
      </div>
    </div>`;
  if(typeof speakVietnamese==='function') maLater_(()=>speakVietnamese('Con vật nào không có trong bức hình?',0.96),150);
}
function maChoose(btn,animal){
  if(maLocked)return;
  if(animal===maQuestion.absent){
    maLocked=true; maScore+=10+Math.min(maStreak,5)*2; maStreak++; maBest=Math.max(maBest,maStreak);
    btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800','ma-correct');
    const fb=document.getElementById('ma-feedback');if(fb)fb.innerHTML=`🎉 Chính xác! <span class="text-emerald-700 ml-1">${animal}</span> không có trong tranh.`;
    if(typeof playAudio==='function')playAudio('correct');
    if(typeof confetti==='function')confetti({particleCount:55,spread:68,origin:{y:.72}});
    if(typeof speakVietnamese==='function')speakVietnamese(`${animal}. Chính xác!`,1.0);
    maLater_(maNext,1150);
  }else{
    maStreak=0; btn.classList.add('ma-shake','border-rose-400','bg-rose-50');
    maLater_(()=>btn.classList.remove('ma-shake','border-rose-400','bg-rose-50'),360);
    const fb=document.getElementById('ma-feedback');if(fb)fb.textContent='🔔 Con vật này có trong tranh rồi. Bé tìm lại nhé!';
    if(typeof playAudio==='function')playAudio('wrong');
  }
}
window.startMissingAnimalGame=startMissingAnimalGame;
window.maChoose=maChoose;

function stopMissingAnimalGame(){maCancelTimers_(); try{ maLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopMissingAnimalGame=stopMissingAnimalGame;
