// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ============================================================
// MINI GAME TV1 - DONG VAT DANG LAM GI?
// Nguon: 30 tranh nhom dong vat da doi chieu truc tiep tu anh nguon.
// Luat: quan sat tranh, chon dung hanh dong cua con vat duoc hoi.
// 60 cau hoi / 30 tranh, trung binh 2 cau moi tranh.
// Layout: anh vuong ben trai, 4 dap an doc ben phai; mobile xep doc.
// ============================================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let aaLifecycleToken_=0; const aaLifecycleTimers_=new Set();
function aaLater_(fn,ms){const token=aaLifecycleToken_;const id=setTimeout(()=>{aaLifecycleTimers_.delete(id);if(token!==aaLifecycleToken_)return;fn();},ms);aaLifecycleTimers_.add(id);return id;}
function aaCancelTimers_(){aaLifecycleToken_++;for(const id of aaLifecycleTimers_)clearTimeout(id);aaLifecycleTimers_.clear();}
const AA_SCENES = [
  {id:'cac_loai_chim_khu_vuon',qs:[
    ['Chim họa mi đang làm gì?','đang hót',['đang hót','đang bơi','đang chạy','đang đào đất']],
    ['Chim gõ kiến đang làm gì?','đang đậu trên cành cây',['đang đậu trên cành cây','đang bơi dưới nước','đang chạy trên cỏ','đang ngủ trong tổ']]
  ]},
  {id:'cac_loai_chim_nhiet_doi',qs:[
    ['Chim công đang làm gì?','đang xòe đuôi',['đang xòe đuôi','đang lặn dưới nước','đang mổ thóc','đang bay qua núi']],
    ['Chim hồng hạc đang làm gì?','đang đứng dưới nước',['đang đứng dưới nước','đang nằm trong tổ','đang đào hang','đang trèo cây']]
  ]},
  {id:'cac_loai_chim_san_moi',qs:[
    ['Chim đại bàng đang làm gì?','đang bay',['đang bay','đang bơi','đang bò','đang ngủ']],
    ['Cú mèo đang làm gì?','đang đậu trên cành cây',['đang đậu trên cành cây','đang lặn dưới ao','đang chạy trên đồng','đang đào hang']]
  ]},
  {id:'chim_nuoc_dam_lay',qs:[
    ['Chim thiên nga đang làm gì?','đang bơi trên mặt nước',['đang bơi trên mặt nước','đang leo cây','đang bay trên trời','đang đào đất']],
    ['Chim bồ nông đang làm gì?','đang đứng trên khúc gỗ',['đang đứng trên khúc gỗ','đang lặn dưới đáy hồ','đang tha cành làm tổ','đang chạy trên bờ']]
  ]},
  {id:'con_trung_khu_vuon_1',qs:[
    ['Con bướm đang làm gì?','đang bay',['đang bay','đang bơi','đang đào hang','đang ngủ']],
    ['Con kiến đang làm gì?','đang bò trên lá',['đang bò trên lá','đang bơi dưới ao','đang bay trên trời','đang ngủ trong tổ']]
  ]},
  {id:'con_trung_khu_vuon_2',qs:[
    ['Dế mèn đang làm gì?','đang chơi đàn',['đang chơi đàn','đang bơi','đang xây tổ','đang ngủ']],
    ['Đom đóm đang làm gì?','đang bay',['đang bay','đang lặn','đang kéo xe','đang ăn cỏ']]
  ]},
  {id:'con_trung_sao_sang',qs:[
    ['Bọ rùa đang làm gì?','đang bò trên lá',['đang bò trên lá','đang bơi','đang đào hang','đang nhảy xuống nước']],
    ['Ve sầu đang làm gì?','đang bám trên thân cây',['đang bám trên thân cây','đang bơi dưới ao','đang kéo xe','đang nằm trong tổ']]
  ]},
  {id:'dai_duong_cuc_nam',qs:[
    ['Cá voi sát thủ đang làm gì?','đang bơi',['đang bơi','đang trèo cây','đang đào hang','đang ăn cỏ']],
    ['Con moóc đang làm gì?','đang nằm nghỉ trên băng',['đang nằm nghỉ trên băng','đang bay trên trời','đang leo núi','đang đào tổ']]
  ]},
  {id:'dai_duong_day_bien',qs:[
    ['Cá voi đang làm gì?','đang bơi',['đang bơi','đang bay','đang chạy','đang leo cây']],
    ['Con mực đang làm gì?','đang bơi dưới biển',['đang bơi dưới biển','đang bò trên cạn','đang ngủ trên cây','đang ăn cỏ']]
  ]},
  {id:'dai_duong_san_ho_1',qs:[
    ['Cá heo đang làm gì?','đang bơi',['đang bơi','đang đào cát','đang leo cây','đang ngủ trên bờ']],
    ['Rùa biển đang làm gì?','đang bơi dưới biển',['đang bơi dưới biển','đang chạy trên cỏ','đang bay','đang trèo cây']]
  ]},
  {id:'dai_duong_san_ho_2',qs:[
    ['Cá mập đang làm gì?','đang bơi',['đang bơi','đang bay','đang đào hang','đang ngủ trên cây']],
    ['Cá đuối đang làm gì?','đang bơi dưới biển',['đang bơi dưới biển','đang chạy trên đồng','đang leo cây','đang mổ thóc']]
  ]},
  {id:'dong_vat_rung_nhiet_doi',qs:[
    ['Con lười đang làm gì?','đang treo mình trên cành cây',['đang treo mình trên cành cây','đang bơi dưới sông','đang chạy trên cỏ','đang đào hang']],
    ['Chim toucan đang làm gì?','đang đậu trên cành cây',['đang đậu trên cành cây','đang lặn dưới nước','đang bò dưới đất','đang kéo xe']]
  ]},
  {id:'dong_vat_vung_cuc',qs:[
    ['Cú tuyết đang làm gì?','đang đậu trên cành cây',['đang đậu trên cành cây','đang bơi dưới nước','đang đào hang','đang kéo xe']],
    ['Gấu Bắc Cực đang làm gì?','đang nằm trên băng',['đang nằm trên băng','đang bay','đang trèo cây','đang ăn hạt']]
  ]},
  {id:'gia_cam_nong_trai',qs:[
    ['Gà mái đang làm gì?','đang dẫn đàn gà con đi',['đang dẫn đàn gà con đi','đang bơi dưới ao','đang bay qua núi','đang đào hang']],
    ['Gà trống đang làm gì?','đang đứng trên bãi cỏ',['đang đứng trên bãi cỏ','đang lặn dưới nước','đang ngủ trên cây','đang kéo xe']]
  ]},
  {id:'gia_suc_nong_trai_1',qs:[
    ['Con bò đang làm gì?','đang đứng trên đồng cỏ',['đang đứng trên đồng cỏ','đang bay','đang bơi dưới biển','đang trèo cây']],
    ['Con dê đang làm gì?','đang đứng trên đồng cỏ',['đang đứng trên đồng cỏ','đang lặn dưới ao','đang bay trên trời','đang đào hang']]
  ]},
  {id:'gia_suc_nong_trai_2',qs:[
    ['Con vịt đang làm gì?','đang đứng giữa sân',['đang đứng giữa sân','đang trèo cây','đang bay qua núi','đang đào hang']],
    ['Con lừa đang làm gì?','đang đứng trên bãi cỏ',['đang đứng trên bãi cỏ','đang bơi dưới nước','đang bay','đang ngủ trong tổ']]
  ]},
  {id:'hoang_da_dong_co_1',qs:[
    ['Hươu cao cổ đang làm gì?','đang ăn lá cây',['đang ăn lá cây','đang bơi','đang đào hang','đang bay']],
    ['Sư tử đang làm gì?','đang ngồi trên bãi cỏ',['đang ngồi trên bãi cỏ','đang lặn dưới ao','đang leo cây','đang kéo xe']]
  ]},
  {id:'hoang_da_dong_co_2',qs:[
    ['Hà mã đang làm gì?','đang ngâm mình dưới nước',['đang ngâm mình dưới nước','đang bay','đang trèo cây','đang đào tổ']],
    ['Linh dương đang làm gì?','đang chạy trên đồng cỏ',['đang chạy trên đồng cỏ','đang bơi dưới nước','đang ngủ trên cây','đang đào hang']]
  ]},
  {id:'hoang_da_rung_xanh_1',qs:[
    ['Con khỉ đang làm gì?','đang đu trên dây leo',['đang đu trên dây leo','đang lặn dưới ao','đang đào hang','đang kéo xe']],
    ['Con sóc đang làm gì?','đang ngồi trên cành cây',['đang ngồi trên cành cây','đang bơi dưới nước','đang bay','đang đào đất']]
  ]},
  {id:'hoang_da_rung_xanh_2',qs:[
    ['Gấu trúc đang làm gì?','đang ăn lá tre',['đang ăn lá tre','đang bơi','đang bay','đang kéo xe']],
    ['Cáo đỏ đang làm gì?','đang ngồi trong rừng',['đang ngồi trong rừng','đang lặn dưới nước','đang bay','đang đào tổ trên cây']]
  ]},
  {id:'khu_vuon_con_trung',qs:[
    ['Con bướm vàng đang làm gì?','đang bay',['đang bay','đang bơi','đang đào hang','đang kéo xe']],
    ['Châu chấu đang làm gì?','đang đứng trên lá',['đang đứng trên lá','đang bơi dưới ao','đang bay qua núi','đang ngủ trong tổ']]
  ]},
  {id:'khung_long_dam_lay',qs:[
    ['Khủng long cổ dài dưới nước đang làm gì?','đang bơi',['đang bơi','đang bay','đang trèo cây','đang đào hang']],
    ['Khủng long bay đang làm gì?','đang bay',['đang bay','đang bơi','đang ăn cỏ dưới nước','đang ngủ trong hang']]
  ]},
  {id:'khung_long_rung_xanh_1',qs:[
    ['Khủng long bay đang làm gì?','đang bay',['đang bay','đang bơi','đang đào hang','đang ngủ']],
    ['T-Rex đang làm gì?','đang đứng và há miệng',['đang đứng và há miệng','đang bơi dưới hồ','đang bay trên trời','đang đào tổ']]
  ]},
  {id:'khung_long_rung_xanh_2',qs:[
    ['Khủng long con đang làm gì?','đang nở ra từ quả trứng',['đang nở ra từ quả trứng','đang bơi dưới hồ','đang bay','đang trèo cây']],
    ['Spinosaurus đang làm gì?','đang đứng trên mặt đất',['đang đứng trên mặt đất','đang bơi dưới biển','đang bay','đang ngủ trên cây']]
  ]},
  {id:'sinh_vat_ao_ho',qs:[
    ['Ếch xanh đang làm gì?','đang ngồi trên lá sen',['đang ngồi trên lá sen','đang bay trên trời','đang đào hang','đang kéo xe']],
    ['Nòng nọc đang làm gì?','đang bơi dưới nước',['đang bơi dưới nước','đang trèo cây','đang bay','đang ăn cỏ']]
  ]},
  {id:'sinh_vat_bien_xinh_dep',qs:[
    ['Cá thần tiên đang làm gì?','đang bơi',['đang bơi','đang bay','đang chạy trên cỏ','đang leo cây']],
    ['Sò biển đang làm gì?','đang mở vỏ để lộ viên ngọc',['đang mở vỏ để lộ viên ngọc','đang bơi','đang bay','đang đào cát']]
  ]},
  {id:'sinh_vat_tien_su',qs:[
    ['Voi ma mút đang làm gì?','đang bước đi trên tuyết',['đang bước đi trên tuyết','đang bơi dưới biển','đang bay','đang trèo cây']],
    ['Hổ răng kiếm đang làm gì?','đang bước đi',['đang bước đi','đang bay','đang bơi dưới nước','đang treo mình trên cây']]
  ]},
  {id:'the_gioi_khung_long_con',qs:[
    ['Khủng long bay con đang làm gì?','đang bay',['đang bay','đang bơi','đang đào hang','đang ngủ dưới nước']],
    ['Khủng long ba sừng con đang làm gì?','đang chui ra khỏi quả trứng',['đang chui ra khỏi quả trứng','đang bay','đang bơi','đang trèo cây']]
  ]},
  {id:'thu_cung_trong_nha_1',qs:[
    ['Con mèo đang làm gì?','đang ngủ trên ghế sofa',['đang ngủ trên ghế sofa','đang bơi','đang bay','đang đào hang']],
    ['Chuột hamster đang làm gì?','đang bò trong ống đồ chơi',['đang bò trong ống đồ chơi','đang bay','đang bơi dưới hồ','đang trèo cây']]
  ]},
  {id:'thu_cung_trong_nha_2',qs:[
    ['Con mèo xám đang làm gì?','đang chơi với cuộn len',['đang chơi với cuộn len','đang bơi','đang bay','đang kéo xe']],
    ['Thỏ trắng đang làm gì?','đang ôm cà rốt',['đang ôm cà rốt','đang bơi dưới nước','đang bay','đang leo cây']]
  ]}
].map(s=>({...s,image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc(s.id) : '')}));

let aaDeck=[],aaRound=0,aaScore=0,aaStreak=0,aaBest=0,aaLocked=false,aaCurrent=null;

function aaShuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function aaBuildDeck(){aaDeck=aaShuffle(AA_SCENES);if(aaCurrent&&aaDeck.length>1&&aaDeck[0].id===aaCurrent.scene.id){[aaDeck[0],aaDeck[1]]=[aaDeck[1],aaDeck[0]];}}
function aaNext(){if(!aaDeck.length) aaBuildDeck();const scene=aaDeck.shift();const q=aaShuffle(scene.qs)[0];aaCurrent={scene,q};aaRound++;aaLocked=false;aaRender();}
function aaEnsureStyles(){
  if(document.getElementById('animal-action-style')) return;
  const s=document.createElement('style');s.id='animal-action-style';s.textContent=`
    @keyframes aaShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
    @keyframes aaGlow{0%,100%{box-shadow:none}50%{box-shadow:0 0 28px rgba(16,185,129,.3)}}
    .aa-shake{animation:aaShake .3s ease}.aa-correct{animation:aaGlow .65s ease}
    .aa-main-layout{display:grid;grid-template-columns:minmax(300px,410px) minmax(0,1fr);gap:14px;align-items:stretch}
    .aa-picture-wrap{position:relative;aspect-ratio:1/1;width:100%;overflow:hidden}
    #aa-picture{width:100%;height:100%;object-fit:cover;display:block}
    .aa-options{display:grid;grid-template-columns:1fr;gap:10px;align-content:center}
    .aa-option{min-height:58px}
    @media(max-width:900px){.aa-main-layout{grid-template-columns:minmax(260px,350px) minmax(0,1fr);gap:10px}.aa-option{min-height:54px}}
    @media(max-width:700px){.aa-main-layout{grid-template-columns:1fr}.aa-picture-wrap{max-width:430px;margin:0 auto}.aa-options{grid-template-columns:1fr 1fr}.aa-option{min-height:50px}}
    @media(max-width:460px){.aa-options{grid-template-columns:1fr}}
  `;document.head.appendChild(s);
}
function startAnimalActionGame(){aaCancelTimers_();aaEnsureStyles();aaDeck=[];aaRound=0;aaScore=0;aaStreak=0;aaBest=0;aaLocked=false;aaCurrent=null;aaNext();}
function aaRender(){
  const box=document.getElementById('game-play-container');if(!box||!aaCurrent)return;
  const [question,correct,rawOptions]=aaCurrent.q;const options=aaShuffle(rawOptions);
  const palettes=['bg-pink-50 border-pink-200 hover:bg-pink-100','bg-sky-50 border-sky-200 hover:bg-sky-100','bg-amber-50 border-amber-200 hover:bg-amber-100','bg-emerald-50 border-emerald-200 hover:bg-emerald-100'];
  box.innerHTML=`
    <div class="rounded-[28px] border-2 border-pink-100 bg-gradient-to-b from-sky-50/70 via-pink-50/50 to-emerald-50/60 p-2.5 md:p-3">
      <div class="flex items-center justify-between gap-2 mb-2">
        <div class="flex items-center gap-2 min-w-0">
          <span class="px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-black text-xs md:text-sm shrink-0">🏃 Lượt ${aaRound}</span>
          <div class="font-black text-teal-700 text-sm md:text-lg leading-tight">${question}</div>
        </div>
        <div class="flex gap-1.5 shrink-0">
          <span class="px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${aaScore}</span>
          <span class="px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${aaStreak}</span>
          <span class="px-2.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${aaBest}</span>
        </div>
      </div>
      <div class="aa-main-layout">
        <div class="aa-picture-wrap"><img id="aa-picture" src="${aaCurrent.scene.image}" alt="Tranh động vật"><div class="hidden absolute inset-0 flex items-center justify-center text-7xl">🖼️</div></div>
        <div class="aa-options">
          ${options.map((op,i)=>`<button class="aa-option px-4 py-2.5 rounded-2xl border-2 ${palettes[i]} text-slate-700 font-black text-sm md:text-base shadow-sm transition-all" data-answer="${op.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" onclick="aaChoose(this)">${op}</button>`).join('')}
          <div id="aa-feedback" class="min-h-[28px] flex items-center justify-center text-center text-xs md:text-sm font-black text-slate-500">👀 Bé quan sát thật kỹ hành động của con vật nhé!</div>
        </div>
      </div>
    </div>`;
  if(typeof speakVietnamese==='function')aaLater_(()=>speakVietnamese(question,0.96),150);
}
function aaChoose(btn){
  if(aaLocked||!aaCurrent)return;const answer=btn.dataset.answer;const correct=aaCurrent.q[1];
  if(answer===correct){
    aaLocked=true;aaScore+=10+Math.min(aaStreak,5)*2;aaStreak++;aaBest=Math.max(aaBest,aaStreak);
    btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800','aa-correct');
    const fb=document.getElementById('aa-feedback');if(fb)fb.innerHTML=`🎉 Chính xác! <span class="text-emerald-700 ml-1">${correct}</span>`;
    if(typeof playAudio==='function')playAudio('correct');if(typeof confetti==='function')confetti({particleCount:50,spread:65,origin:{y:.72}});if(typeof speakVietnamese==='function')speakVietnamese(`${correct}. Chính xác!`,1.0);aaLater_(aaNext,1200);
  }else{
    aaStreak=0;btn.classList.add('aa-shake','border-rose-400','bg-rose-50');aaLater_(()=>btn.classList.remove('aa-shake','border-rose-400','bg-rose-50'),360);
    const fb=document.getElementById('aa-feedback');if(fb)fb.textContent='🔎 Chưa đúng rồi. Bé nhìn lại xem con vật đang làm gì nhé!';if(typeof playAudio==='function')playAudio('wrong');
  }
}
window.startAnimalActionGame=startAnimalActionGame;
window.aaChoose=aaChoose;

function stopAnimalActionGame(){aaCancelTimers_(); try{ aaLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopAnimalActionGame=stopAnimalActionGame;
