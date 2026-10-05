// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ============================================================
// MINI GAME TV1 - AI TINH MAT HON
// Dung chung bo tranh cua game "Sap xep do vat"
// Luat: 4 dap an cung chu de, 3 do vat co trong tranh, 1 do vat khong co.
// Be chon do vat KHONG co trong tranh.
// ============================================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let seLifecycleToken_=0; const seLifecycleTimers_=new Set();
function seLater_(fn,ms){const token=seLifecycleToken_;const id=setTimeout(()=>{seLifecycleTimers_.delete(id);if(token!==seLifecycleToken_)return;fn();},ms);seLifecycleTimers_.add(id);return id;}
function seCancelTimers_(){seLifecycleToken_++;for(const id of seLifecycleTimers_)clearTimeout(id);seLifecycleTimers_.clear();}
const SHARP_EYES_SCENES = [
  {id:'bai_bien',name:'Bãi biển',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('bai_bien') : ''),present:['ô che nắng','xô cát','xẻng đồ chơi'],absent:'quả bóng biển'},
  {id:'ban_an',name:'Bàn ăn',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('ban_an') : ''),present:['cái đĩa','cái cốc','quả chuối'],absent:'ấm trà'},
  {id:'ban_hoc',name:'Bàn học',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('ban_hoc') : ''),present:['đèn học','quyển sách','bút chì'],absent:'cặp sách'},
  {id:'be_boi',name:'Bể bơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('be_boi') : ''),present:['phao vịt','phao tròn','ô che nắng'],absent:'ván nhảy'},
  {id:'chuong_trai',name:'Chuồng trại',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('chuong_trai') : ''),present:['con bò','con cừu','con gà'],absent:'con lợn'},
  {id:'cong_vien',name:'Công viên',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cong_vien') : ''),present:['ghế công viên','bồn hoa','lối đi'],absent:'đài phun nước'},
  {id:'cua_hang_tap_hoa',name:'Cửa hàng tạp hóa',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cua_hang_tap_hoa') : ''),present:['quả táo','quả chuối','chùm nho'],absent:'hộp trứng'},
  {id:'gara_xe',name:'Ga-ra xe',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gara_xe') : ''),present:['ô tô','lốp xe','cờ lê'],absent:'xe máy'},
  {id:'gia_sach',name:'Giá sách',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gia_sach') : ''),present:['gấu bông','vịt đồ chơi','khủng long đồ chơi'],absent:'ô tô đồ chơi'},
  {id:'giuong_ngu',name:'Giường ngủ',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('giuong_ngu') : ''),present:['gối','chăn','giường ngủ'],absent:'đèn ngủ'},
  {id:'goc_do_choi',name:'Góc đồ chơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('goc_do_choi') : ''),present:['gấu bông','ô tô đồ chơi','khối xếp hình'],absent:'búp bê'},
  {id:'lop_hoc',name:'Lớp học',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('lop_hoc') : ''),present:['bảng lớp','bàn học','quả địa cầu'],absent:'máy chiếu'},
  {id:'nha_bep',name:'Nhà bếp',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_bep') : ''),present:['tủ lạnh','bếp nấu','cái nồi'],absent:'lò vi sóng'},
  {id:'nha_ga',name:'Nhà ga',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_ga') : ''),present:['đoàn tàu','quầy vé','đồng hồ'],absent:'vali'},
  {id:'nha_tam',name:'Nhà tắm',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_tam') : ''),present:['bồn tắm','gương','khăn tắm'],absent:'vòi sen'},
  {id:'phong_am_nhac',name:'Phòng âm nhạc',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_am_nhac') : ''),present:['đàn piano','đàn ghi-ta','bộ trống'],absent:'đàn vĩ cầm'},
  {id:'phong_khach',name:'Phòng khách',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_khach') : ''),present:['ghế sofa','bàn trà','quả địa cầu'],absent:'tivi'},
  {id:'phong_my_thuat',name:'Phòng mỹ thuật',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_my_thuat') : ''),present:['giá vẽ','cọ vẽ','ghế đẩu'],absent:'kéo'},
  {id:'phong_ngu',name:'Phòng ngủ',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_ngu') : ''),present:['giường ngủ','đèn ngủ','gấu bông'],absent:'tủ quần áo'},
  {id:'phong_the_duc',name:'Phòng thể dục',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_the_duc') : ''),present:['thảm tập','quả bóng rổ','dây nhảy'],absent:'vợt cầu lông'},
  {id:'phong_y_te',name:'Phòng y tế',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_y_te') : ''),present:['giường bệnh','tủ thuốc','thước đo chiều cao'],absent:'ống nghe'},
  {id:'san_choi',name:'Sân chơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_choi') : ''),present:['cầu trượt','xích đu','bập bênh'],absent:'đu quay'},
  {id:'san_truong',name:'Sân trường',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_truong') : ''),present:['trường học','cột cờ','cầu trượt'],absent:'bập bênh'},
  {id:'san_van_dong',name:'Sân vận động',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_van_dong') : ''),present:['quả bóng','khung thành','bảng tỉ số'],absent:'cúp'},
  {id:'sieu_thi',name:'Siêu thị',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('sieu_thi') : ''),present:['quả táo','quả chuối','xe đẩy'],absent:'quả dưa hấu'},
  {id:'thu_vien',name:'Thư viện',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('thu_vien') : ''),present:['giá sách','quyển sách','bàn đọc sách'],absent:'máy tính'},
  {id:'tiem_banh',name:'Tiệm bánh',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tiem_banh') : ''),present:['bánh kem','bánh cupcake','máy tính tiền'],absent:'bánh donut'},
  {id:'tram_xe_buyt',name:'Trạm xe buýt',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tram_xe_buyt') : ''),present:['xe buýt','ghế băng','biển chỉ đường'],absent:'thùng rác'},
  {id:'tu_quan_ao',name:'Tủ quần áo',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tu_quan_ao') : ''),present:['áo','váy','quần yếm'],absent:'mũ'},
  {id:'vuon_nha',name:'Vườn nhà',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('vuon_nha') : ''),present:['hàng rào','hoa hướng dương','hoa tulip'],absent:'bình tưới cây'},
];

let seDeck = [];
let seRound = 0;
let seScore = 0;
let seStreak = 0;
let seBest = 0;
let seLocked = false;
let seCurrent = null;

function seShuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function seBuildDeck(){
  seDeck = seShuffle(SHARP_EYES_SCENES);
  if(seCurrent && seDeck.length>1 && seDeck[0].id===seCurrent.id){[seDeck[0],seDeck[1]]=[seDeck[1],seDeck[0]];}
}

function seNextScene(){
  if(!seDeck.length) seBuildDeck();
  seCurrent = seDeck.shift();
  seRound++;
  seLocked = false;
  seRenderScene();
}

function seEnsureStyles(){
  if(document.getElementById('sharp-eyes-style')) return;
  const style=document.createElement('style');
  style.id='sharp-eyes-style';
  style.textContent=`
    @keyframes sePop {0%{transform:scale(.84);opacity:.2}70%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}
    @keyframes seShake {0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
    @keyframes seGlow {0%,100%{box-shadow:0 0 0 rgba(16,185,129,0)}50%{box-shadow:0 0 26px rgba(16,185,129,.35)}}
    .se-pop{animation:sePop .42s ease both}
    .se-shake{animation:seShake .28s ease}
    .se-correct{animation:seGlow .65s ease}
    .se-main-layout{display:grid;grid-template-columns:410px minmax(0,1fr);gap:12px;align-items:stretch}
    #se-picture{display:block;width:100%;aspect-ratio:1/1;height:auto;object-fit:cover}
    #se-picture-wrap{background:transparent;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:hidden}
    .se-picture-fallback{width:100%;aspect-ratio:1/1;height:auto}
    .se-side{display:flex;flex-direction:column;justify-content:center;min-width:0}
    #se-options{display:grid;grid-template-columns:1fr;gap:10px}
    .se-option{min-height:58px}
    @media(max-width:900px){.se-main-layout{grid-template-columns:350px minmax(0,1fr);gap:10px}.se-option{min-height:52px}}
    @media(max-width:700px){.se-main-layout{grid-template-columns:1fr}#se-picture-wrap{max-width:420px;width:100%;justify-self:start}#se-options{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.se-option{min-height:44px}}
  `;
  document.head.appendChild(style);
}

function startSharpEyesGame(){seCancelTimers_();
  seEnsureStyles();
  seDeck=[];
  seRound=0;
  seScore=0;
  seStreak=0;
  seBest=0;
  seNextScene();
}

function seRenderScene(){
  const box=document.getElementById('game-play-container');
  if(!box || !seCurrent) return;

  const opts=seShuffle([
    ...seCurrent.present.map(x=>({text:x, absent:false})),
    {text:seCurrent.absent, absent:true}
  ]);

  box.innerHTML=`
    <div class="relative overflow-hidden rounded-[28px] border-2 border-pink-200 bg-gradient-to-b from-sky-50 via-pink-50/60 to-emerald-50/60 p-3 md:p-4">
      <div class="flex items-center justify-between gap-2 mb-2">
        <div class="px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-black text-xs md:text-sm shrink-0">🔎 Lượt ${seRound}</div>
        <div class="flex-1 text-center text-sm md:text-lg font-black text-teal-700 leading-tight px-1">Đồ vật nào <span class="text-rose-500">KHÔNG CÓ</span> trong bức tranh?</div>
        <div class="flex gap-2 shrink-0">
          <div class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${seScore}</div>
          <div class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${seStreak}</div>
          <div class="px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${seBest}</div>
        </div>
      </div>

      <div class="se-main-layout">
        <div id="se-picture-wrap" class="se-pop relative overflow-hidden">
          <img id="se-picture" src="${seCurrent.image}" alt="${seCurrent.name}"
            onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')">
          <div class="hidden se-picture-fallback flex items-center justify-center text-6xl">🖼️</div>
          <div class="absolute left-3 bottom-3 px-4 py-2 rounded-full bg-white/95 border border-pink-200 text-pink-600 text-base md:text-lg font-black shadow-sm">${seCurrent.name}</div>
        </div>
        <div class="se-side">
          <div id="se-options">
            ${opts.map((o,i)=>`
              <button onclick="seChoose(this,${o.absent})"
                class="se-option px-3 py-2 rounded-2xl border-2 ${[
                  'bg-pink-50 border-pink-200 hover:bg-pink-100',
                  'bg-sky-50 border-sky-200 hover:bg-sky-100',
                  'bg-amber-50 border-amber-200 hover:bg-amber-100',
                  'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                ][i]} text-slate-700 font-black text-sm md:text-base shadow-sm transition-all">
                ${o.text}
              </button>`).join('')}
          </div>
          <div id="se-feedback" class="min-h-[28px] mt-3 text-center text-xs md:text-sm font-black text-slate-500">
            👀 4 đáp án đều cùng chủ đề, bé nhìn thật kỹ nhé!
          </div>
        </div>
      </div>
    </div>`;

  if(typeof speakVietnamese==='function'){
    seLater_(()=>speakVietnamese(`Bé hãy quan sát bức tranh ${seCurrent.name}. Đồ vật nào không có trong bức tranh?`,0.96),180);
  }
}

function seChoose(btn,isAbsent){
  if(seLocked) return;
  if(isAbsent){
    seLocked=true;
    seScore+=10 + Math.min(seStreak,5)*2;
    seStreak++;
    seBest=Math.max(seBest,seStreak);
    btn.classList.remove('bg-pink-50','bg-sky-50','bg-amber-50','bg-emerald-50');
    btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800','se-correct');

    const fb=document.getElementById('se-feedback');
    if(fb) fb.innerHTML=`🎉 Chính xác! <span class="text-emerald-600">${btn.textContent.trim()}</span> không có trong tranh.`;

    if(typeof playAudio==='function') playAudio('correct');
    if(typeof confetti==='function') confetti({particleCount:60,spread:70,origin:{y:.72}});
    if(typeof speakVietnamese==='function') speakVietnamese(`${btn.textContent.trim()}. Chính xác!`,1.0);
    seLater_(seNextScene,1200);
  }else{
    seStreak=0;
    btn.classList.add('se-shake','border-rose-400','bg-rose-50');
    seLater_(()=>btn.classList.remove('se-shake','border-rose-400','bg-rose-50'),360);
    const fb=document.getElementById('se-feedback');
    if(fb) fb.innerHTML='🔔 Đồ vật này có trong tranh rồi. Bé nhìn lại nhé!';
    if(typeof playAudio==='function') playAudio('wrong');
  }
}

function stopSharpEyesGame(){seCancelTimers_(); try{ seLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopSharpEyesGame=stopSharpEyesGame;
