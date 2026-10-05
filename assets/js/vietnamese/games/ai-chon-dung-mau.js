// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// MINI GAME TV1 - AI CHON DUNG MAU?
// 1 dung = do vat co trong tranh + mau dung. Dap an chi co chu, khong icon.


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let rcLifecycleToken_=0; const rcLifecycleTimers_=new Set();
function rcLater_(fn,ms){const token=rcLifecycleToken_;const id=setTimeout(()=>{rcLifecycleTimers_.delete(id);if(token!==rcLifecycleToken_)return;fn();},ms);rcLifecycleTimers_.add(id);return id;}
function rcCancelTimers_(){rcLifecycleToken_++;for(const id of rcLifecycleTimers_)clearTimeout(id);rcLifecycleTimers_.clear();}
const RC_COLORS=['đỏ','xanh lá','xanh dương','vàng','cam','hồng','tím','nâu','trắng','đen','xám'];
const RC_SCENES=[
{id:'bai_bien',name:'Bãi biển',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('bai_bien') : ''),objects:[['ô che nắng','đỏ'],['xô cát','cam'],['xẻng đồ chơi','tím'],['mặt trời','vàng'],['lá cây dừa','xanh lá']],absent:['quả bóng biển','khăn tắm','ván lướt sóng']},
{id:'ban_an',name:'Bàn ăn',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('ban_an') : ''),objects:[['bàn ăn','nâu'],['cái đĩa bên trái','hồng'],['cái cốc bên trái','xanh dương'],['quả chuối','vàng'],['chùm nho','tím']],absent:['ấm trà','khăn ăn','bát canh']},
{id:'ban_hoc',name:'Bàn học',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('ban_hoc') : ''),objects:[['mặt bàn','nâu'],['mặt ghế','đỏ'],['hộp bút','vàng'],['đèn học','xanh dương'],['bút chì trên bàn','xanh lá']],absent:['cặp sách','thước kẻ','máy tính']},
{id:'be_boi',name:'Bể bơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('be_boi') : ''),objects:[['phao vịt','đỏ'],['phao tròn','hồng'],['ô che nắng','vàng'],['ghế nằm','xanh lá'],['nước hồ','xanh dương']],absent:['kính bơi','ván nhảy','quả bóng']},
{id:'chuong_trai',name:'Chuồng trại',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('chuong_trai') : ''),objects:[['chuồng','đỏ'],['đống rơm','vàng'],['con bò','trắng'],['hàng rào','nâu'],['bãi cỏ','xanh lá']],absent:['con lợn','con ngựa','máy kéo']},
{id:'cong_vien',name:'Công viên',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cong_vien') : ''),objects:[['ghế công viên','nâu'],['bãi cỏ','xanh lá'],['mặt trời','vàng'],['bông hoa hồng','hồng']],absent:['xích đu','cầu trượt','đài phun nước']},
{id:'cua_hang_tap_hoa',name:'Cửa hàng tạp hóa',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cua_hang_tap_hoa') : ''),objects:[['quả táo','đỏ'],['quả chuối','vàng'],['chùm nho','tím'],['giá hàng','nâu']],absent:['ổ bánh mì','hộp trứng','quả dưa hấu']},
{id:'gara_xe',name:'Ga-ra xe',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gara_xe') : ''),objects:[['thân ô tô','xanh dương'],['nắp capo ô tô','vàng'],['lốp xe','đen'],['bảng dụng cụ','đỏ'],['cờ lê','xám']],absent:['xe máy','mũ bảo hiểm','bơm xe']},
{id:'gia_sach',name:'Giá sách',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gia_sach') : ''),objects:[['gấu bông','xanh dương'],['tên lửa đồ chơi','đỏ'],['vịt đồ chơi','vàng'],['khủng long đồ chơi','xanh lá'],['giá sách','nâu']],absent:['búp bê','ô tô đồ chơi','quả bóng']},
{id:'giuong_ngu',name:'Giường ngủ',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('giuong_ngu') : ''),objects:[['khung giường','nâu'],['cái gối','xanh dương'],['ngôi sao trên chăn','vàng'],['ô vuông trên chăn','hồng']],absent:['đèn ngủ','tủ đầu giường','đồng hồ báo thức']},
{id:'goc_do_choi',name:'Góc đồ chơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('goc_do_choi') : ''),objects:[['khủng long đồ chơi','xanh lá'],['gấu bông','nâu'],['ô tô đồ chơi','đỏ'],['xe tải đồ chơi','xanh dương'],['thùng đồ chơi bên trái','xanh dương']],absent:['búp bê','máy bay đồ chơi','quả bóng']},
{id:'lop_hoc',name:'Lớp học',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('lop_hoc') : ''),objects:[['bảng lớp','đen'],['bàn học bên phải','xanh dương'],['bàn học bên trái','xanh lá'],['quả địa cầu','xanh dương'],['cây xanh','xanh lá']],absent:['máy tính','máy chiếu','cặp sách']},
{id:'nha_bep',name:'Nhà bếp',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_bep') : ''),objects:[['tủ lạnh','trắng'],['tủ bếp phía trên bên phải','vàng'],['tủ bếp phía trên bên trái','xanh dương'],['chậu cây','xanh lá']],absent:['chảo','ấm nước','bồn rửa bát']},
{id:'nha_ga',name:'Nhà ga',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_ga') : ''),objects:[['đầu tàu','đỏ'],['quầy vé','xanh dương'],['ghế băng','vàng'],['viền đồng hồ','xanh lá']],absent:['vali','loa thông báo','máy bán vé']},
{id:'nha_tam',name:'Nhà tắm',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_tam') : ''),objects:[['bồn tắm','xanh lá'],['khăn tắm','xanh dương'],['vịt đồ chơi','vàng'],['bồn rửa mặt','trắng']],absent:['vòi sen','bàn chải đánh răng','xà phòng']},
{id:'phong_am_nhac',name:'Phòng âm nhạc',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_am_nhac') : ''),objects:[['đàn piano','nâu'],['bộ trống','đỏ'],['đàn ghi-ta','nâu'],['ghế lười bên phải','xanh lá'],['ghế đàn piano','đỏ']],absent:['đàn vĩ cầm','sáo','kèn trumpet']},
{id:'phong_khach',name:'Phòng khách',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_khach') : ''),objects:[['ghế sofa','xanh dương'],['gối bên trái','hồng'],['cây xanh','xanh lá'],['quả địa cầu','xanh dương'],['bàn trà','nâu']],absent:['tivi','quạt điện','đèn bàn']},
{id:'phong_my_thuat',name:'Phòng mỹ thuật',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_my_thuat') : ''),objects:[['ghế đẩu','tím'],['xô đựng màu','đỏ'],['giá vẽ','vàng'],['mặt trời trong tranh','vàng']],absent:['kéo','hồ dán','đất nặn']},
{id:'phong_ngu',name:'Phòng ngủ',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_ngu') : ''),objects:[['đèn ngủ','vàng'],['tủ đầu giường','trắng'],['gấu bông','nâu'],['rèm cửa','xanh lá'],['khung giường','trắng']],absent:['tủ quần áo','đồng hồ báo thức','bàn học']},
{id:'phong_the_duc',name:'Phòng thể dục',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_the_duc') : ''),objects:[['thảm tập','xanh dương'],['quả bóng rổ','cam'],['dây nhảy','xanh lá'],['thang thể dục','vàng']],absent:['vợt cầu lông','quả bóng đá','cọc tiêu']},
{id:'phong_y_te',name:'Phòng y tế',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_y_te') : ''),objects:[['chăn trên giường','xanh dương'],['hộp thuốc','đỏ'],['cây xanh','xanh lá'],['giường bệnh','trắng']],absent:['ống nghe','nhiệt kế','băng cá nhân']},
{id:'san_choi',name:'Sân chơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_choi') : ''),objects:[['cầu trượt','hồng'],['bãi cỏ','xanh lá'],['mặt trời','vàng'],['xẻng trong hộp cát','xanh dương']],absent:['cầu leo','đu quay','quả bóng']},
{id:'san_truong',name:'Sân trường',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_truong') : ''),objects:[['tòa trường','đỏ'],['bãi cỏ','xanh lá'],['cầu trượt','đỏ'],['bầu trời','xanh dương']],absent:['bập bênh','sân bóng rổ','ghế đá']},
{id:'san_van_dong',name:'Sân vận động',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_van_dong') : ''),objects:[['sân cỏ','xanh lá'],['ghế dự bị','đỏ'],['quả bóng','trắng'],['bảng tỉ số','xanh dương']],absent:['còi trọng tài','cúp','áo cầu thủ']},
{id:'sieu_thi',name:'Siêu thị',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('sieu_thi') : ''),objects:[['quả táo','đỏ'],['quả chuối','vàng'],['chùm nho','xanh lá'],['xe đẩy','đỏ'],['giỏ hàng','vàng']],absent:['quả dưa hấu','hộp sữa','ổ bánh mì']},
{id:'thu_vien',name:'Thư viện',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('thu_vien') : ''),objects:[['tủ sách bên trái','xanh dương'],['tủ sách ở giữa','xanh lá'],['cái bàn','nâu'],['đệm ngồi','vàng']],absent:['máy tính','đèn bàn','quả địa cầu']},
{id:'tiem_banh',name:'Tiệm bánh',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tiem_banh') : ''),objects:[['quầy tính tiền','nâu'],['bánh kem','hồng'],['cái ghế','xanh lá'],['máy tính tiền','đỏ']],absent:['ổ bánh mì','bánh donut','khay bánh']},
{id:'tram_xe_buyt',name:'Trạm xe buýt',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tram_xe_buyt') : ''),objects:[['xe buýt','vàng'],['mái trạm chờ','xanh dương'],['ghế băng','đỏ'],['cây xanh','xanh lá']],absent:['thùng rác','bảng giờ xe','xe đạp']},
{id:'tu_quan_ao',name:'Tủ quần áo',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tu_quan_ao') : ''),objects:[['áo bên trái','đỏ'],['áo thứ hai','xanh dương'],['áo thứ ba','vàng'],['áo thứ tư','xanh lá'],['váy','hồng'],['quần yếm','cam']],absent:['mũ','giày','khăn quàng']},
{id:'vuon_nha',name:'Vườn nhà',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('vuon_nha') : ''),objects:[['mái nhà','đỏ'],['hàng rào','nâu'],['mặt trời','vàng'],['cây xanh','xanh lá'],['hoa cúc','trắng']],absent:['bình tưới cây','xẻng làm vườn','ghế đá']},
];

let rcDeck=[],rcRound=0,rcScore=0,rcStreak=0,rcBest=0,rcLocked=false,rcCurrent=null,rcQuestion=null;
function rcShuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function rcWrongColor(c){return rcShuffle(RC_COLORS.filter(x=>x!==c))[0];}
function rcBuildDeck(){rcDeck=rcShuffle(RC_SCENES);if(rcCurrent&&rcDeck.length>1&&rcDeck[0].id===rcCurrent.id){[rcDeck[0],rcDeck[1]]=[rcDeck[1],rcDeck[0]];}}
function rcMakeQuestion(s){
 const target=rcShuffle(s.objects)[0], other=rcShuffle(s.objects.filter(o=>o!==target))[0], absent=rcShuffle(s.absent)[0];
 return {options:rcShuffle([
  {text:`${target[0]} màu ${target[1]}`,correct:true},
  {text:`${target[0]} màu ${rcWrongColor(target[1])}`,correct:false},
  {text:`${other[0]} màu ${rcWrongColor(other[1])}`,correct:false},
  {text:`${absent} màu ${rcShuffle(RC_COLORS)[0]}`,correct:false}
 ])};
}
function rcEnsureStyles(){
 if(document.getElementById('right-color-style'))return;
 const s=document.createElement('style');s.id='right-color-style';
 s.textContent=`@keyframes rcShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}.rc-shake{animation:rcShake .3s ease}.rc-main-layout{display:grid;grid-template-columns:410px minmax(0,1fr);gap:12px;align-items:stretch}#rc-picture{display:block;width:100%;aspect-ratio:1/1;height:auto;object-fit:cover}.rc-picture-wrap{background:transparent;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:hidden}.rc-side{display:flex;flex-direction:column;justify-content:center;min-width:0}.rc-options{display:grid;grid-template-columns:1fr;gap:10px}.rc-option{min-height:58px}@media(max-width:900px){.rc-main-layout{grid-template-columns:350px minmax(0,1fr);gap:10px}#rc-picture{height:auto}.rc-option{min-height:52px}}@media(max-width:700px){.rc-main-layout{grid-template-columns:1fr}#rc-picture{height:auto}.rc-options{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.rc-option{min-height:44px}}`;
 document.head.appendChild(s);
}
function startRightColorGame(){rcCancelTimers_();rcEnsureStyles();rcDeck=[];rcRound=rcScore=rcStreak=rcBest=0;rcNext();}
function rcNext(){if(!rcDeck.length)rcBuildDeck();rcCurrent=rcDeck.shift();rcQuestion=rcMakeQuestion(rcCurrent);rcRound++;rcLocked=false;rcRender();}
function rcRender(){
 const box=document.getElementById('game-play-container');if(!box)return;
 const p=['bg-pink-50 border-pink-200 hover:bg-pink-100','bg-sky-50 border-sky-200 hover:bg-sky-100','bg-amber-50 border-amber-200 hover:bg-amber-100','bg-emerald-50 border-emerald-200 hover:bg-emerald-100'];
 box.innerHTML=`<div class="rounded-[28px] border-2 border-pink-200 bg-gradient-to-b from-sky-50 via-pink-50/60 to-emerald-50/60 p-3 md:p-4">
 <div class="flex items-center justify-between gap-2 mb-2"><span class="px-3 py-1.5 rounded-full bg-white border border-pink-200 text-pink-600 font-black text-xs md:text-sm">🎨 Lượt ${rcRound}</span><div class="flex-1 text-center text-sm md:text-base font-black text-slate-700">Bé chọn <span class="text-fuchsia-600">đồ vật + màu sắc</span> khớp với tranh nhé!</div><div class="flex gap-2"><span class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${rcScore}</span><span class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${rcStreak}</span><span class="px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${rcBest}</span></div></div>
 <div class="rc-main-layout">
 <div class="rc-picture-wrap relative"><img id="rc-picture" src="${rcCurrent.image}" alt="${rcCurrent.name}"><div class="absolute left-3 bottom-3 px-4 py-2 rounded-full bg-white/95 border border-pink-200 text-pink-600 text-base md:text-lg font-black">${rcCurrent.name}</div></div>
 <div class="rc-side">
 <div class="rc-options">${rcQuestion.options.map((o,i)=>`<button onclick="rcChoose(this,${o.correct})" class="rc-option px-3 py-2 rounded-2xl border-2 ${p[i]} text-slate-700 font-black text-sm md:text-base shadow-sm">${o.text}</button>`).join('')}</div>
 <div id="rc-feedback" class="min-h-[28px] mt-3 text-center text-xs md:text-sm font-black text-slate-500">👀 Có đáp án dùng đúng đồ vật nhưng cố tình đổi sai màu đấy nhé!</div>
 </div>
 </div></div>`;
 if(typeof speakVietnamese==='function')rcLater_(()=>speakVietnamese(`Bé hãy quan sát bức tranh ${rcCurrent.name}. Đồ vật nào có màu đúng như trong tranh?`,.96),180);
}
function rcChoose(btn,ok){
 if(rcLocked)return;
 if(ok){rcLocked=true;rcScore+=10+Math.min(rcStreak,5)*2;rcStreak++;rcBest=Math.max(rcBest,rcStreak);btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800');document.getElementById('rc-feedback').innerHTML=`🎉 Đúng rồi! <span class="text-emerald-600">${btn.textContent.trim()}</span>.`;if(typeof playAudio==='function')playAudio('correct');if(typeof confetti==='function')confetti({particleCount:65,spread:75,origin:{y:.72}});if(typeof speakVietnamese==='function')speakVietnamese(`${btn.textContent.trim()}. Chính xác!`,1);rcLater_(rcNext,1250);}
 else{rcStreak=0;btn.classList.add('rc-shake','border-rose-400');rcLater_(()=>btn.classList.remove('rc-shake','border-rose-400'),350);document.getElementById('rc-feedback').textContent='🔔 Chưa đúng màu rồi. Bé nhìn lại bức tranh nhé!';if(typeof playAudio==='function')playAudio('wrong');}
}

function stopRightColorGame(){rcCancelTimers_(); try{ rcLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopRightColorGame=stopRightColorGame;
