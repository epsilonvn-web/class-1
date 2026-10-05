// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ============================================================
// MINI GAME TV1 - DONG VAT O DAU?
// Nguon: 30 tranh nhom dong vat da doi chieu truc tiep tu anh nguon.
// Luat: quan sat tranh, tra loi cau hoi ve vi tri con vat.
// Co 2 kieu cau hoi:
//   1) Con X dang o/dau? -> chon vi tri dung.
//   2) Con gi dang o vi tri...? -> chon con vat dung.
// Layout: anh vuong ben trai, 4 dap an doc ben phai; mobile xep doc.
// ============================================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let apLifecycleToken_=0; const apLifecycleTimers_=new Set();
function apLater_(fn,ms){const token=apLifecycleToken_;const id=setTimeout(()=>{apLifecycleTimers_.delete(id);if(token!==apLifecycleToken_)return;fn();},ms);apLifecycleTimers_.add(id);return id;}
function apCancelTimers_(){apLifecycleToken_++;for(const id of apLifecycleTimers_)clearTimeout(id);apLifecycleTimers_.clear();}
const AP_SCENES = [
  {
    id:'cac_loai_chim_khu_vuon',
    qs:[
      ['who','Con chim nào ở phía bên trái bức tranh?','chim sẻ',['chim sẻ','chim bồ câu','chim họa mi','chim gõ kiến']],
      ['where','Chim gõ kiến đang đậu ở đâu?','Trên cành cây, phía dưới bên phải',['Trên cành cây, phía dưới bên phải','Trên ngọn cây, phía trên bên trái','Dưới mặt đất, chính giữa','Trong tổ chim, phía trên bên phải']]
    ]
  },
  {
    id:'cac_loai_chim_nhiet_doi',
    qs:[
      ['who','Con chim nào đứng ở phía dưới bên phải bức tranh?','chim công',['chim công','chim vẹt','chim hồng hạc','chim bói cá']],
      ['where','Chim tào lao (toucan) đang đậu ở đâu?','Trên gốc cây, phía trên bên phải',['Trên gốc cây, phía trên bên phải','Dưới ao, phía bên trái','Trên cành thấp, phía dưới bên trái','Giữa bãi cỏ, phía dưới tranh']]
    ]
  },
  {
    id:'cac_loai_chim_san_moi',
    qs:[
      ['where','Con cú mèo đang đậu ở đâu?','Trên cành cây ở giữa bức tranh',['Trên cành cây ở giữa bức tranh','Trên đỉnh núi phía sau','Dưới ao ở góc trái','Trên mặt đất phía bên phải']],
      ['who','Con chim nào đang bay ở phía trên cùng bức tranh?','chim đại bàng',['chim đại bàng','chim cú mèo','chim cò','chim diều hâu']]
    ]
  },
  {
    id:'chim_nuoc_dam_lay',
    qs:[
      ['who','Con chim nào đứng trên khúc gỗ ở phía bên phải?','chim bồ nông',['chim bồ nông','chim thiên nga','chim bói cá','vịt trời']],
      ['where','Chim bói cá đang đậu ở đâu?','Trên cành cây thấp, phía dưới bên trái',['Trên cành cây thấp, phía dưới bên trái','Giữa hồ nước','Trên khúc gỗ phía bên phải','Trên bờ cỏ phía trên']]
    ]
  },
  {
    id:'con_trung_khu_vuon_1',
    qs:[
      ['who','Con vật nào ở phía trên bên phải bức tranh?','chuồn chuồn',['chuồn chuồn','bướm','ong mật','kiến']],
      ['where','Bọ rùa đang ở đâu?','Phía dưới bên trái bức tranh',['Phía dưới bên trái bức tranh','Phía trên bên phải bức tranh','Chính giữa phía trên','Phía dưới bên phải bức tranh']]
    ]
  },
  {
    id:'con_trung_khu_vuon_2',
    qs:[
      ['who','Con vật nào ở phía trên bên phải bức tranh?','bọ ngựa',['bọ ngựa','châu chấu','dế mèn','bọ cánh cứng']],
      ['where','Đom đóm đang bay ở đâu?','Gần giữa bức tranh',['Gần giữa bức tranh','Sát góc trên bên trái','Dưới cùng bên phải','Trên thân cây bên phải']]
    ]
  },
  {
    id:'con_trung_sao_sang',
    qs:[
      ['who','Con vật nào bám trên thân cây phía bên phải?','ve sầu',['ve sầu','bọ rùa','sâu đo','thạch sùng']],
      ['where','Thạch sùng đang ở đâu?','Bám trên hàng rào phía bên trái',['Bám trên hàng rào phía bên trái','Nằm trên cành cây phía trên','Ở gốc cây phía bên phải','Ở giữa bông hoa']]
    ]
  },
  {
    id:'dai_duong_cuc_nam',
    qs:[
      ['who','Con vật nào nằm trên tảng băng phía dưới bên phải?','con moóc',['con moóc','gấu Bắc Cực','hải cẩu','chim cánh cụt']],
      ['where','Cá voi sát thủ đang ở đâu?','Trong nước, phía trên bên phải',['Trong nước, phía trên bên phải','Trên băng, phía dưới bên trái','Ở giữa hai chú chim cánh cụt','Trên bờ tuyết, phía dưới bên phải']]
    ]
  },
  {
    id:'dai_duong_day_bien',
    qs:[
      ['who','Con vật nào ở phía trên bên phải bức tranh?','cá voi',['cá voi','mực','sứa biển','ốc biển']],
      ['where','Cá ngựa đang ở đâu?','Bên phải, gần giữa bức tranh',['Bên phải, gần giữa bức tranh','Góc trên bên trái','Dưới cùng bên trái','Chính giữa phía trên']]
    ]
  },
  {
    id:'dai_duong_san_ho_1',
    qs:[
      ['who','Con vật nào ở phía dưới bên phải bức tranh?','bạch tuộc',['bạch tuộc','cá heo','rùa biển','sao biển']],
      ['where','Cá hề đang bơi ở đâu?','Gần giữa bức tranh',['Gần giữa bức tranh','Sát góc trên bên trái','Dưới cùng bên phải','Trên rạn san hô phía trên']]
    ]
  },
  {
    id:'dai_duong_san_ho_2',
    qs:[
      ['who','Con vật nào nằm ở gần giữa bức tranh?','cá mập',['cá mập','cua biển','tôm hùm','cá đuối']],
      ['where','Cá đuối đang bơi ở đâu?','Phía dưới bên trái',['Phía dưới bên trái','Phía trên bên phải','Chính giữa phía trên','Sát góc dưới bên phải']]
    ]
  },
  {
    id:'dong_vat_rung_nhiet_doi',
    qs:[
      ['who','Con vật nào ở phía dưới bên phải bức tranh?','báo đốm',['báo đốm','tắc kè hoa','con lười','chim toucan']],
      ['where','Con lười đang ở đâu?','Treo trên cành cây phía bên trái',['Treo trên cành cây phía bên trái','Đứng trên mặt đất bên phải','Đậu trên cành cao bên phải','Nằm dưới bụi hoa ở giữa']]
    ]
  },
  {
    id:'dong_vat_vung_cuc',
    qs:[
      ['who','Con vật nào đứng ở phía dưới bên phải?','tuần lộc',['tuần lộc','cáo Bắc Cực','thỏ Bắc Cực','gấu Bắc Cực']],
      ['where','Cú tuyết đang đậu ở đâu?','Trên cành cây phía trên bên phải',['Trên cành cây phía trên bên phải','Trên mặt băng phía dưới bên trái','Giữa vũng nước','Sau lưng tuần lộc']]
    ]
  },
  {
    id:'gia_cam_nong_trai',
    qs:[
      ['who','Con vật nào đứng ở phía dưới bên phải bức tranh?','gà tây',['gà tây','gà trống','ngỗng','vịt xiêm']],
      ['where','Gà mái và đàn gà con đang ở đâu?','Phía dưới, gần giữa bức tranh',['Phía dưới, gần giữa bức tranh','Sát góc trên bên phải','Bên trái chuồng trại','Phía trên hàng rào']]
    ]
  },
  {
    id:'gia_suc_nong_trai_1',
    qs:[
      ['who','Con vật nào đứng ở phía dưới bên phải?','ngựa',['ngựa','bò','trâu','dê']],
      ['where','Con lợn đang ở đâu?','Gần giữa bức tranh',['Gần giữa bức tranh','Góc trên bên trái','Sát mép phải phía trên','Phía dưới bên trái']]
    ]
  },
  {
    id:'gia_suc_nong_trai_2',
    qs:[
      ['who','Con vật nào đứng ở giữa bức tranh?','vịt',['vịt','lừa','thỏ','ngỗng']],
      ['where','Con ngỗng đang ở đâu?','Phía dưới bên phải',['Phía dưới bên phải','Phía trên bên trái','Chính giữa bức tranh','Phía dưới bên trái']]
    ]
  },
  {
    id:'hoang_da_dong_co_1',
    qs:[
      ['who','Con vật nào đứng cao nhất, gần giữa phía trên bức tranh?','hươu cao cổ',['hươu cao cổ','sư tử','voi','tê giác']],
      ['where','Con voi đang đứng ở đâu?','Phía dưới bên trái',['Phía dưới bên trái','Phía trên bên phải','Chính giữa phía trên','Phía dưới bên phải']]
    ]
  },
  {
    id:'hoang_da_dong_co_2',
    qs:[
      ['who','Con vật nào đang ở trong hồ nước?','hà mã',['hà mã','linh dương','đà điểu','linh cẩu']],
      ['where','Con linh cẩu đang đứng ở đâu?','Phía dưới bên phải',['Phía dưới bên phải','Phía trên bên trái','Trong hồ nước','Góc dưới bên trái']]
    ]
  },
  {
    id:'hoang_da_rung_xanh_1',
    qs:[
      ['who','Con vật nào đang đu trên dây leo phía trên?','khỉ',['khỉ','hổ','báo hoa mai','gấu']],
      ['where','Con sóc đang ở đâu?','Trên cành cây phía dưới bên phải',['Trên cành cây phía dưới bên phải','Sát góc trên bên trái','Đứng giữa hổ và báo','Trên dây leo phía trên']]
    ]
  },
  {
    id:'hoang_da_rung_xanh_2',
    qs:[
      ['who','Con vật nào ngồi gần giữa bức tranh?','gấu trúc',['gấu trúc','cáo đỏ','nai','nhím']],
      ['where','Con gấu mèo đang ở đâu?','Phía dưới bên trái',['Phía dưới bên trái','Phía trên bên phải','Chính giữa phía trên','Phía dưới bên phải']]
    ]
  },
  {
    id:'khu_vuon_con_trung',
    qs:[
      ['who','Con vật nào ở phía dưới bên trái bức tranh?','ốc sên',['ốc sên','bướm vàng','ong','bọ rùa']],
      ['where','Châu chấu đang ở đâu?','Phía dưới bên phải',['Phía dưới bên phải','Phía trên bên trái','Chính giữa phía trên','Trên bông hoa bên trái']]
    ]
  },
  {
    id:'khung_long_dam_lay',
    qs:[
      ['who','Con vật nào đang bơi ở phía dưới bên trái?','khủng long cổ dài dưới nước',['khủng long cổ dài dưới nước','khủng long cổ dài','khủng long bay','khủng long mào']],
      ['where','Khủng long bay đang ở đâu?','Phía trên bên phải bức tranh',['Phía trên bên phải bức tranh','Dưới nước bên trái','Trên khúc gỗ phía dưới','Giữa hồ nước']]
    ]
  },
  {
    id:'khung_long_rung_xanh_1',
    qs:[
      ['who','Con khủng long nào đứng ở phía dưới bên phải?','khủng long giáp',['khủng long giáp','T-Rex','khủng long cổ dài','khủng long ba sừng']],
      ['where','Khủng long ba sừng đang đứng ở đâu?','Phía dưới bên trái',['Phía dưới bên trái','Phía trên bên phải','Chính giữa phía trên','Phía dưới bên phải']]
    ]
  },
  {
    id:'khung_long_rung_xanh_2',
    qs:[
      ['who','Con khủng long nào đứng ở phía trên bên trái?','Spinosaurus',['Spinosaurus','Stegosaurus','Velociraptor','Hadrosaur']],
      ['where','Khủng long con đang ở đâu?','Gần giữa phía dưới bức tranh',['Gần giữa phía dưới bức tranh','Góc trên bên trái','Góc trên bên phải','Sát mép dưới bên phải']]
    ]
  },
  {
    id:'sinh_vat_ao_ho',
    qs:[
      ['who','Con vật nào ngồi trên lá sen phía trên bên trái?','ếch xanh',['ếch xanh','nòng nọc','ốc nhồi','cá rô']],
      ['where','Con cua đồng đang ở đâu?','Phía dưới bên trái, trên tảng đá',['Phía dưới bên trái, trên tảng đá','Giữa hồ nước','Trên lá sen phía trên','Phía dưới bên phải, trên lá cây']]
    ]
  },
  {
    id:'sinh_vat_bien_xinh_dep',
    qs:[
      ['who','Con vật nào ở phía dưới bên trái bức tranh?','hải sâm',['hải sâm','cá thần tiên','cá nóc','cá bống']],
      ['where','Sò biển đang ở đâu?','Gần giữa bức tranh',['Gần giữa bức tranh','Sát góc trên bên trái','Sát góc trên bên phải','Dưới cùng bên phải']]
    ]
  },
  {
    id:'sinh_vat_tien_su',
    qs:[
      ['who','Con vật nào đứng ở phía bên trái bức tranh?','voi ma mút',['voi ma mút','hổ răng kiếm','chim dodo','hươu thời băng hà']],
      ['where','Hươu thời băng hà đang đứng ở đâu?','Phía trên bên phải',['Phía trên bên phải','Phía dưới bên trái','Giữa bức tranh','Phía dưới bên phải']]
    ]
  },
  {
    id:'the_gioi_khung_long_con',
    qs:[
      ['who','Con khủng long nào đang bay ở phía trên bên phải?','khủng long bay con',['khủng long bay con','T-Rex con','khủng long cổ dài con','khủng long ba sừng con']],
      ['where','Khủng long ba sừng con đang ở đâu?','Phía dưới bên trái',['Phía dưới bên trái','Phía trên bên phải','Chính giữa phía trên','Phía dưới bên phải']]
    ]
  },
  {
    id:'thu_cung_trong_nha_1',
    qs:[
      ['who','Con vật nào đang nằm trên ghế sofa?','mèo',['mèo','chó','chuột hamster','rùa']],
      ['where','Chim yến phụng đang ở đâu?','Trong lồng, phía trên gần giữa bức tranh',['Trong lồng, phía trên gần giữa bức tranh','Trên ghế sofa bên trái','Trong ống đồ chơi dưới sàn','Dưới sàn phía bên phải']]
    ]
  },
  {
    id:'thu_cung_trong_nha_2',
    qs:[
      ['who','Con vật nào ở ô ngoài cùng bên trái?','mèo xám',['mèo xám','chó con','thỏ trắng','nhím']],
      ['where','Cá vàng đang ở đâu?','Trong bể cá, ô thứ tư từ trái sang',['Trong bể cá, ô thứ tư từ trái sang','Ô ngoài cùng bên trái','Ô giữa bức tranh','Ô ngoài cùng bên phải']]
    ]
  }
].map(s=>({...s,image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc(s.id) : '')}));

let apDeck=[],apRound=0,apScore=0,apStreak=0,apBest=0,apLocked=false,apCurrent=null;

function apShuffle(arr){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function apBuildDeck(){
  apDeck=apShuffle(AP_SCENES);
  if(apCurrent&&apDeck.length>1&&apDeck[0].id===apCurrent.scene.id){[apDeck[0],apDeck[1]]=[apDeck[1],apDeck[0]];}
}
function apNext(){
  if(!apDeck.length) apBuildDeck();
  const scene=apDeck.shift();
  const q=apShuffle(scene.qs)[0];
  apCurrent={scene,q};
  apRound++;apLocked=false;
  apRender();
}
function apEnsureStyles(){
  if(document.getElementById('animal-position-style')) return;
  const s=document.createElement('style');
  s.id='animal-position-style';
  s.textContent=`
    @keyframes apShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
    @keyframes apGlow{0%,100%{box-shadow:none}50%{box-shadow:0 0 28px rgba(16,185,129,.3)}}
    .ap-shake{animation:apShake .3s ease}.ap-correct{animation:apGlow .65s ease}
    .ap-main-layout{display:grid;grid-template-columns:minmax(300px,410px) minmax(0,1fr);gap:14px;align-items:stretch}
    .ap-picture-wrap{position:relative;aspect-ratio:1/1;width:100%;overflow:hidden}
    #ap-picture{width:100%;height:100%;object-fit:cover;display:block}
    .ap-options{display:grid;grid-template-columns:1fr;gap:10px;align-content:center}
    .ap-option{min-height:58px}
    @media(max-width:900px){.ap-main-layout{grid-template-columns:minmax(260px,350px) minmax(0,1fr);gap:10px}.ap-option{min-height:54px}}
    @media(max-width:700px){.ap-main-layout{grid-template-columns:1fr}.ap-picture-wrap{max-width:430px;margin:0 auto}.ap-options{grid-template-columns:1fr 1fr}.ap-option{min-height:50px}}
    @media(max-width:460px){.ap-options{grid-template-columns:1fr}}
  `;
  document.head.appendChild(s);
}
function startAnimalPositionGame(){apCancelTimers_();
  apEnsureStyles();
  apDeck=[];apRound=0;apScore=0;apStreak=0;apBest=0;apLocked=false;apCurrent=null;
  apNext();
}
function apRender(){
  const box=document.getElementById('game-play-container'); if(!box||!apCurrent) return;
  const [type,question,correct,rawOptions]=apCurrent.q;
  const options=apShuffle(rawOptions);
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
          <span class="px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-black text-xs md:text-sm shrink-0">📍 Lượt ${apRound}</span>
          <div class="font-black text-teal-700 text-sm md:text-lg leading-tight">${question}</div>
        </div>
        <div class="flex gap-1.5 shrink-0">
          <span class="px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${apScore}</span>
          <span class="px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${apStreak}</span>
          <span class="px-2.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${apBest}</span>
        </div>
      </div>
      <div class="ap-main-layout">
        <div class="ap-picture-wrap">
          <img id="ap-picture" src="${apCurrent.scene.image}" alt="Tranh động vật" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')">
          <div class="hidden absolute inset-0 flex items-center justify-center text-7xl">🖼️</div>
        </div>
        <div class="ap-options">
          ${options.map((op,i)=>`<button class="ap-option px-4 py-2.5 rounded-2xl border-2 ${palettes[i]} text-slate-700 font-black text-sm md:text-base shadow-sm transition-all" onclick="apChoose(this,${JSON.stringify(op).replace(/"/g,'&quot;')})">${op}</button>`).join('')}
          <div id="ap-feedback" class="min-h-[28px] flex items-center justify-center text-center text-xs md:text-sm font-black text-slate-500">👀 Nhìn thật kỹ vị trí của từng con vật nhé!</div>
        </div>
      </div>
    </div>`;
  if(typeof speakVietnamese==='function') apLater_(()=>speakVietnamese(question,0.96),150);
}
function apChoose(btn,answer){
  if(apLocked||!apCurrent) return;
  const correct=apCurrent.q[2];
  if(answer===correct){
    apLocked=true;apScore+=10+Math.min(apStreak,5)*2;apStreak++;apBest=Math.max(apBest,apStreak);
    btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800','ap-correct');
    const fb=document.getElementById('ap-feedback');
    if(fb) fb.innerHTML=`🎉 Chính xác! <span class="text-emerald-700 ml-1">${correct}</span>`;
    if(typeof playAudio==='function') playAudio('correct');
    if(typeof confetti==='function') confetti({particleCount:50,spread:65,origin:{y:.72}});
    if(typeof speakVietnamese==='function') speakVietnamese(`${correct}. Chính xác!`,1.0);
    apLater_(apNext,1200);
  }else{
    apStreak=0;btn.classList.add('ap-shake','border-rose-400','bg-rose-50');
    apLater_(()=>btn.classList.remove('ap-shake','border-rose-400','bg-rose-50'),360);
    const fb=document.getElementById('ap-feedback'); if(fb) fb.textContent='🔎 Chưa đúng rồi. Bé nhìn lại vị trí trong tranh nhé!';
    if(typeof playAudio==='function') playAudio('wrong');
  }
}

window.startAnimalPositionGame=startAnimalPositionGame;
window.apChoose=apChoose;

function stopAnimalPositionGame(){apCancelTimers_(); try{ apLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopAnimalPositionGame=stopAnimalPositionGame;
